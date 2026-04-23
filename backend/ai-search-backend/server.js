require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(
  cors({
    origin: [
      "https://trilhoacademico.edu.mz",
      "http://localhost:3000",
      "https://www.trilhoacademico.edu.mz",
    ],
    methods: ["GET", "POST"],
    credentials: false,
  })
);

app.use(express.json({ limit: "2mb" }));

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GOOGLE_KEY = process.env.GOOGLE_MAPS_API_KEY ;

if (!OPENAI_KEY || !GOOGLE_KEY) {
  console.warn("⚠️ Missing keys: check OPENAI_API_KEY and GOOGLE_MAPS_API_KEY in your .env");
}

// Cache
const cache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 10;
const setCache = (key, value) => cache.set(key, { value, timestamp: Date.now() });
const getCache = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.value;
};

// Default image fallback
const getDefaultImage = (tipo, tab) => {
  if (tab === "Acomodações")
    return "https://i.postimg.cc/Y0sz2QrQ/placeholder.png";
  switch (tipo) {
    case "Desporto":
      return "https://i.postimg.cc/X7Fb5bmb/team-celebrating-win-silver-cup.png";
    case "Café":
      return "https://i.postimg.cc/tJm7kXS8/people-having-coffee-meeting.png";
    case "Ginásio":
      return "https://i.postimg.cc/VvzHgw0c/front-view-fit-people-training-outdoors.png";
    case "Igreja":
      return "https://i.postimg.cc/SsccszKV/132759-w-450-300.png";
    case "Cinema":
      return "https://i.postimg.cc/zDMx3Tpn/african-couple-cinema.png";
    case "Shopping":
      return "https://i.postimg.cc/HW2pgs2C/L111-3-1523502859021621.png";
    case "Museu":
      return "https://i.postimg.cc/5tnHyq52/content-Art-Mate-C-C.jpg";
    default:
      return "https://i.postimg.cc/Y0sz2QrQ/placeholder.png";
  }
};

// JSON parser
function parseAIJSON(text) {
  text = text.replace(/```json|```/gi, "").trim();
  const match = text.match(/\[.*\]/s);
  if (!match) throw new Error("No JSON array found in AI response");

  try {
    const parsed = JSON.parse(match[0]);
    if (!Array.isArray(parsed)) throw new Error("Parsed JSON is not an array");
    return parsed;
  } catch (err) {
    console.error("Failed to parse AI JSON:", err, "\nOriginal text:", text);
    throw err;
  }
}

// ✅ Alias: allow both /search and /api/search
app.post("/search", (req, res, next) => {
  req.url = "/api/search";
  next();
});

// Main AI search endpoint
app.post("/api/search", async (req, res) => {
  try {
    const { query, tab, limit = 10 } = req.body;
    if (!query || !query.trim()) return res.status(400).json({ error: "query missing" });

    const cacheKey = `${tab || "all"}::${query}::${limit}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json({ items: cached, cached: true });

    const systemPrompt = `És um assistente que deve retornar SOMENTE um array JSON de ${limit} objetos representando acomodações ou atividades.
Cada objeto deve conter:
- id: string única
- nome
- descricao
- pais
- universidade
- tipo
- preco: null
- imagem: (default if missing)
- lat
- lng
Deve responder apenas em PT-PT e fornecer informação relevante baseada no query.
O campo 'imagem' pode ser nulo se não houver imagem.
RESPONDA SOMENTE COM UM JSON VÁLIDO, SEM TEXTO ADICIONAL.
`;

    const userPrompt = `Query: "${query}"\nTab: "${tab}"`;

    // OpenAI request
    let text = "";
    try {
      const openaiResp = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_completion_tokens: 1500,
        },
        { headers: { Authorization: `Bearer ${OPENAI_KEY}` } }
      );
      text = openaiResp.data?.choices?.[0]?.message?.content || "";
    } catch (err) {
      console.error("OpenAI request failed:", err.response?.data || err.message || err);
      return res.status(500).json({ error: "Erro ao comunicar com a OpenAI" });
    }

    let items = [];
    try {
      items = parseAIJSON(text);
    } catch (err) {
      console.error("AI response parsing failed, returning empty array. AI text:", text);
      items = [];
    }

    // Fill defaults & geocode
    await Promise.all(
      items.map(async (it) => {
        it.id = it.id || uuidv4();
        it.preco = null;
        it.imagem = it.imagem && it.imagem !== "default"
          ? it.imagem
          : getDefaultImage(it.tipo, tab);

        if ((!it.lat || !it.lng) && (it.nome || it.pais)) {
          try {
            const geo = await axios.get(
              "https://maps.googleapis.com/maps/api/geocode/json",
              {
                params: {
                  address: `${it.nome} ${it.pais}`.trim(),
                  key: GOOGLE_KEY,
                },
                timeout: 5000,
              }
            );
            const loc = geo.data.results?.[0]?.geometry?.location;
            it.lat = loc?.lat || null;
            it.lng = loc?.lng || null;
          } catch {
            it.lat = null;
            it.lng = null;
          }
        }
      })
    );

    setCache(cacheKey, items);
    res.json({ items, cached: false });
  } catch (err) {
    console.error("Unexpected server error:", err);
    res.status(500).json({ error: "Erro ao gerar resultados" });
  }
});

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Backend AI search listening on port ${PORT}`));
