import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// 🔸 Configuração de CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://www.trilhoacademico.edu.mz",
    "https://trilhoacademico.edu.mz"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 🔸 Mantém o rawBody para validação HMAC

app.use(express.json({ verify: (req, res, buf) => (req.rawBody = buf) }));


// 🔹 Constantes principais
const PAYSUITE_API = "https://paysuite.tech/api/v1/payments";
const API_KEY = process.env.PAYSUITE_API_KEY;
const CALLBACK_URL = process.env.CALLBACK_URL || "https://trilhoacademico.edu.mz/api/payments/webhook";
// const CALLBACK_URL = process.env.CALLBACK_URL || "https://unhistorically-telsonic-brittany.ngrok-free.dev/api/payments/webhook";
const RETURN_URL = process.env.RETURN_URL || "https://trilhoacademico.edu.mz/known-course";
// const RETURN_URL = process.env.RETURN_URL || "http://localhost:5173/known-course";
const WEBHOOK_SECRET = process.env.PAYSUITE_WEBHOOK_SECRET;

// ⚠️ Verificação de variáveis obrigatórias
if (!API_KEY) console.warn("⚠️ AVISO: API_KEY não definida!");
if (!WEBHOOK_SECRET) console.warn("⚠️ AVISO: PAYSUITE_WEBHOOK_SECRET não definida! O webhook vai falhar.");

// 🔹 Simulação de base de dados
const pagamentos = {};


// 🔹 Criar pagamento
app.post("/api/payments/create", async (req, res) => {
  try {
    const { amount, reference, description,return_url } = req.body;

    const response = await fetch(PAYSUITE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        amount,
        reference,
        description,
        return_url,
        callback_url: CALLBACK_URL,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      pagamentos[reference] = { status: "pending", data: null };
    }

    console.log("✅ Payment created:", data);
    return res.status(response.status).json(data);

  } catch (error) {
    console.error("❌ Payment creation failed:", error);
    res.status(500).json({ status: "error", message: "Payment creation failed" });
  }
});

app.use("/api/payments/webhook", (req, res, next) => {
  console.log("=== WEBHOOK DEBUG ===");
  console.log("Headers:", req.headers);
  console.log("Body (raw):", req.rawBody?.toString());
  next();
});


// 🔹 Webhook endpoint
app.post("/api/payments/webhook", (req, res) => {
  try {
    // const signature = req.headers["x-webhook-signature"];
    const signature = req.headers["x-signature"];
    const secret = WEBHOOK_SECRET;

    if (!secret) {
      console.error("❌ Webhook secret missing");
      return res.status(500).send("Webhook secret not set");
    }

    if (!signature) {
      console.error("❌ Missing x-webhook-signature header");
      return res.status(403).send("Missing signature");
    }

    // 🔸 Calcula o HMAC com o body original
    const calculated = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("hex");

    if (calculated !== signature) {
      console.warn("⚠️ Invalid webhook signature");
      console.log("Esperado:", calculated);
      console.log("Recebido:", signature);
      return res.status(403).send("Invalid signature");
    }

    const payload = req.body;
    console.log("✅ Webhook recebido:", payload);

    const reference = payload?.data?.reference;
    pagamentos[reference] = {
      status: payload.event,
      data: payload.data
    };

    return res.status(200).send("ok");
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return res.status(500).send("Internal error");
  }
});

app.post("/api/payments/webhook", (req, res) => {
  console.log("✅ Webhook recebido");
  console.log("Headers:", req.headers);
  console.log("Body:", req.rawBody.toString());

  // const signature = req.headers["x-webhook-signature"];
  const signature = req.headers["x-signature"];
  if (!signature) {
    console.warn("❌ Missing x-webhook-signature header");
    return res.status(400).send("Missing signature header");
  }

  const secret = process.env.PAYSUITE_WEBHOOK_SECRET;
  const calculated = crypto.createHmac("sha256", secret).update(req.rawBody).digest("hex");

  if (calculated !== signature) {
    console.warn("❌ Invalid signature");
    return res.status(403).send("Invalid signature");
  }

  res.status(200).send("ok");
});


// 🔹 Endpoint para consultar status
// app.get("/api/payments/status/:reference", (req, res) => {
//   const reference = req.params.reference;
//   const pagamento = pagamentos[reference];
//   const falha = request.params.event
//   if (!pagamento) return res.status(404).json({ status: "not_found" });
//   res.json(pagamento);
// });

// 🔹 Endpoint para consultar status do pagamento
app.get("/api/payments/status/:reference", (req, res) => {
  const reference = req.params.reference;
  const pagamento = pagamentos[reference];

  // 🔸 Caso não exista pagamento com esta referência
  if (!pagamento) {
    return res.status(404).json({
      status: "not_found",
      message: "Pagamento não encontrado.",
    });
  }

  // 🔸 Caso o pagamento tenha falhado
  if (pagamento.status === "failed" || pagamento.status === "error") {
    return res.status(400).json({
      status: "failed",
      message: "O pagamento falhou. Por favor, tenta novamente.",
    });
  }

  // 🔸 Caso o pagamento esteja pendente
  if (pagamento.status === "pending") {
    return res.status(200).json({
      status: "pending",
      message: "O pagamento ainda está a ser processado.",
    });
  }

  // 🔸 Caso o pagamento tenha sido concluído
  if (pagamento.status === "success") {
    return res.status(200).json({
      status: "success",
      message: "Pagamento concluído com sucesso!",
    });
  }

  // 🔸 Caso o status seja desconhecido
  return res.status(500).json({
    status: "unknown",
    message: "Status de pagamento desconhecido.",
  });
});


// 🔹 Rota de retorno após pagamento
app.get("/return", (req, res) => {
  const reference = req.query.reference;
  if (!reference) return res.status(400).send("Referência inválida");

  const pagamento = pagamentos[reference];
  if (!pagamento)
    return res.send("<h1>Pagamento pendente. Atualize em alguns segundos.</h1>");

  if (pagamento.status === "payment.success") {
    return res.redirect("/suces");
  } else if (pagamento.status === "payment.failed") {
    return res.redirect("/erro.html");
  } else {
    return res.send("<h1>Pagamento pendente. Aguarde a confirmação.</h1>");
  }
});

// 🔹 Inicia o servidor
app.listen(5003, () => console.log("✅ PaySuite backend a correr na porta 5003"));
