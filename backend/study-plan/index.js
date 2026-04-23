// index.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5002;

app.use(cors({ origin: "*" }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

app.post("/study-plan", async (req, res) => {
  const { personal, vocational, knownCourse } = req.body;

  if (!vocational || !knownCourse) {
    return res.status(400).json({ error: "Missing vocational or knownCourse data" });
  }

  try {
    const prompt = `
Analisa cuidadosamente os dados seguintes e cria um plano de estudo detalhado e personalizado para o utilizador, em português (pt-PT).

🎯 **OBJETIVO**:
Gerar **recomendações de cursos, universidades e bolsas** baseadas no perfil do utilizador — os seus interesses, personalidades, vocação, notas e dados pessoais.

💡 **INSTRUÇÕES IMPORTANTES**:

- Responde **apenas com um JSON válido e estrito** (sem texto fora do JSON).
- O JSON deve conter exatamente 3 campos: **"courses"**, **"scholarships"**, **"userReport"**.
- **Garante que a resposta NÃO contém texto antes nem depois do JSON.**

### Estrutura:
{
"courses": [
{
"title": "Nome do curso",
"university": "Universidade que melhor se adequa (explica brevemente no campo whyThisFits)",
"country": "País",
"city": "Cidade",
"description": "Descrição detalhada do curso e o que o aluno aprenderá",
"pricePerYear": "Valor estimado / 'N/A'",
"requirements": ["lista", "de", "requisitos"],
"accommodation": {
"needed": true,
"details": "Descrição sobre opções de alojamento"
},
"visaAndLegal": "Informações sobre vistos e documentação necessária",
"whyThisFits": "Explicação clara de por que este curso, universidade e país são os mais adequados com base no perfil do utilizador"
}
],
"scholarships": [
{
"title": "Nome da bolsa",
"provider": "Organização / entidade",
"description": "Descrição detalhada da bolsa",
"amount": "Quantia (ex: '10,000€ / ano') ou 'Valor não disponível'",
"eligibility": ["criterio1", "criterio2"],
"deadline": "YYYY-MM-DD ou 'desconhecido'",
"url": "https://link-para-candidatura-ou-info",
"howToApply": "Resumo do processo de candidatura",
"whyMatchesUser": "Porquê que esta bolsa é adequada ao perfil e curso do utilizador"
}
],
"userReport": "Um texto organizado, motivador e empático (com títulos, emojis e parágrafos). Deve explicar:
- o curso ideal e porquê
- a universidade mais alinhada com o perfil
- o país mais vantajoso para estudar
- as oportunidades de bolsa
- recomendações de próximos passos.
Usar tom inspirador e personalizado, em português (pt-PT)."
}

### DADOS DO UTILIZADOR:
🧍‍♂️ **Informação Pessoal:**
${JSON.stringify(personal || {}, null, 2)}

🧠 **Resultados do Teste Vocacional (respostas completas):**
${JSON.stringify(vocational || {}, null, 2)}

🎓 **Curso Conhecido / Interesses Atuais:**
${JSON.stringify(knownCourse || {}, null, 2)}

Analisa o perfil como um orientador vocacional experiente, destacando paixões, pontos fortes, áreas de interesse, oportunidades adequadas e caminhos futuros.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-2025-04-14", //  gpt-4.1-2025-04-14
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 2500,
    });

    const result = completion.choices?.[0]?.message?.content || "";
    res.status(200).json({ result });

  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({
      error: error.message || "Failed to process data.",
    });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Study Plan API running on port ${PORT}`)
);
