import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// --- CORS ---
app.use(
cors({
origin: [
process.env.FRONTEND_URL || "https://trilhoacademico.edu.mz",
"http://localhost:3000", "https://www.trilhoacademico.edu.mz",
],
credentials: true,
})
);

// --- MongoDB Connection ---
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conectado ao MongoDB"))
.catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// --- Models ---
const newsSchema = new mongoose.Schema(
{
title: { type: String, required: true },
excerpt: String,
content: String,
image: String,
date: { type: Date, default: Date.now },
source: { type: String, default: "SyncTechX" },
country: String,
link: String,
status: {
type: String,
enum: ["Aberta", "Fechada", "Lotada", "Cancelada"],
default: "Aberta",
},
},
{ timestamps: true }
);

const scholarshipSchema = new mongoose.Schema(
{
title: { type: String, required: true },
description: String,
provider: String,
link: String,
image: String,
country: String,
openingDate: Date,
deadline: Date,
eligibility: { type: [String], default: [] },
steps: { type: [String], default: [] },
requirements: { type: [String], default: [] },
specifications: { type: [String], default: [] },
status: {
type: String,
enum: ["Aberta", "Fechada", "Lotada", "Cancelada"],
default: "Aberta",
},
},
{ timestamps: true }
);

const News = mongoose.model("News", newsSchema);
const Scholarship = mongoose.model("Scholarship", scholarshipSchema);


// --- Helpers ---
const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return { ...obj, id: obj._id?.toString() };
};

// --- NEWS ROUTES ---
app.get("/api/news", async (req, res) => {
try {
const docs = await News.find().sort({ date: -1 }).lean();
res.json(docs.map(formatDoc));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao carregar notícias" });
}
});

app.get("/api/news/:id", async (req, res) => {
try {
const doc = await News.findById(req.params.id).lean();
if (!doc) return res.status(404).json({ erro: "Notícia não encontrada" });
res.json(formatDoc(doc));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao carregar notícia" });
}
});

app.post("/api/news", async (req, res) => {
try {
const newItem = new News(req.body);
const saved = await newItem.save();
res.json(formatDoc(saved.toObject()));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao criar notícia" });
}
});

app.put("/api/news/:id", async (req, res) => {
try {
const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
new: true,
});
if (!updated) return res.status(404).json({ erro: "Notícia não encontrada" });
res.json(formatDoc(updated.toObject()));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao atualizar notícia" });
}
});

app.delete("/api/news/:id", async (req, res) => {
try {
await News.findByIdAndDelete(req.params.id);
res.json({ sucesso: true });
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao apagar notícia" });
}
});

// --- SCHOLARSHIP ROUTES ---
app.get("/api/scholarships", async (req, res) => {
try {
const docs = await Scholarship.find().sort({ openingDate: -1 }).lean();
res.json(docs.map(formatDoc));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao carregar bolsas" });
}
});

app.get("/api/scholarships/:id", async (req, res) => {
try {
const doc = await Scholarship.findById(req.params.id).lean();
if (!doc) return res.status(404).json({ erro: "Bolsa não encontrada" });
res.json(formatDoc(doc));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao carregar bolsa" });
}
});

app.post("/api/scholarships", async (req, res) => {
try {
const newItem = new Scholarship({
...req.body,
openingDate: req.body.openingDate ? new Date(req.body.openingDate) : null,
deadline: req.body.deadline ? new Date(req.body.deadline) : null,
eligibility: req.body.eligibility || [],
steps: req.body.steps || [],
requirements: req.body.requirements || [],
specifications: req.body.specifications || [],
});
const saved = await newItem.save();
res.json(formatDoc(saved.toObject()));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao criar bolsa" });
}
});

app.put("/api/scholarships/:id", async (req, res) => {
try {
const updated = await Scholarship.findByIdAndUpdate(
req.params.id,
{
...req.body,
openingDate: req.body.openingDate ? new Date(req.body.openingDate) : null,
deadline: req.body.deadline ? new Date(req.body.deadline) : null,
eligibility: req.body.eligibility || [],
steps: req.body.steps || [],
requirements: req.body.requirements || [],
specifications: req.body.specifications || [],
},
{ new: true }
);
if (!updated) return res.status(404).json({ erro: "Bolsa não encontrada" });
res.json(formatDoc(updated.toObject()));
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao atualizar bolsa" });
}
});

app.delete("/api/scholarships/:id", async (req, res) => {
try {
await Scholarship.findByIdAndDelete(req.params.id);
res.json({ sucesso: true });
} catch (err) {
console.error(err);
res.status(500).json({ erro: "Erro ao apagar bolsa" });
}
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor a correr na PORTA: ${PORT}`));
