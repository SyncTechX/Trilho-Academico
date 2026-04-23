// src/pages/ResultsPage.tsx
import React, { useEffect, useState } from "react";
import { useFormData } from "./FormDataContext";
import StudyPlanCard, { CourseCardData } from "../components/StudyPlanCard";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

const API_URL = "https://trilhoacademico.edu.mz";

// --- Status messages for loading ---
const statusMessages = [
  "A analisar respostas…",
  "A verificar universidades…",
  "A procurar bolsas de estudo…",
  "A compilar o plano perfeito…",
  "A preparar recomendações personalizadas…",
];

// --- Types ---
type Scholarship = {
  title: string;
  provider?: string;
  description?: string;
  amount?: string;
  eligibility?: string[] | string;
  deadline?: string;
  url?: string;
  howToApply?: string;
  whyMatchesUser?: string;
};

interface AIResponse {
  courses: CourseCardData[];
  scholarships: Scholarship[];
  userReport: string;
}

// --- Safe parsing of AI JSON ---
const safeParse = (raw: any): AIResponse => {
  try {
    let obj = typeof raw === "string" ? JSON.parse(raw) : raw;

    if (typeof obj.courses === "string") obj.courses = JSON.parse(obj.courses);
    if (typeof obj.scholarships === "string") obj.scholarships = JSON.parse(obj.scholarships);

    return {
      courses: Array.isArray(obj.courses) ? obj.courses : [],
      scholarships: Array.isArray(obj.scholarships) ? obj.scholarships : [],
      userReport: typeof obj.userReport === "string"
        ? obj.userReport
        : JSON.stringify(obj.userReport || "", null, 2),
    };
  } catch {
    return {
      courses: [],
      scholarships: [],
      userReport: typeof raw === "string" ? raw : "Sem relatório disponível.",
    };
  }
};

// --- Format user report to HTML ---
const formatReportToHTML = (text: string) => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => `<p>${p.trim().replace(/\n/g, "<br/>")}</p>`)
    .join("");
  return paragraphs;
};

// --- Scholarship Card ---
const ScholarshipCard: React.FC<{ sch: Scholarship }> = ({ sch }) => {
  const {
    title,
    provider,
    description,
    amount,
    eligibility,
    deadline,
    url,
    howToApply,
    whyMatchesUser,
  } = sch;

  const eligibilityList = Array.isArray(eligibility)
    ? eligibility
    : typeof eligibility === "string" && eligibility
    ? [eligibility]
    : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
          <p className="text-sm text-gray-500">{provider || "Fornecedor desconhecido"}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <span className="font-semibold">Prazo:</span> {deadline || "Desconhecido"}
        </div>
      </div>

      <p className="text-gray-700 mb-3">{description || "Sem descrição disponível."}</p>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div>
          <p className="font-semibold text-gray-800">Montante</p>
          <p>{amount || "Valor não disponível"}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Elegibilidade</p>
          {eligibilityList.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {eligibilityList.map((el, i) => (
                <li key={i}>{el}</li>
              ))}
            </ul>
          ) : (
            <p>Critérios não especificados</p>
          )}
        </div>
      </div>

      {howToApply && (
        <div className="mt-3">
          <p className="font-semibold text-gray-800">Como candidatar</p>
          <p className="text-gray-700">{howToApply}</p>
        </div>
      )}

      {whyMatchesUser && (
        <div className="mt-3 bg-indigo-50 p-3 rounded-lg">
          <p className="font-semibold text-gray-800">Por que se adequa a ti</p>
          <p className="text-gray-700">{whyMatchesUser}</p>
        </div>
      )}

      <div className="mt-4 flex gap-3">
        {url ? (
          <>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-semibold shadow hover:opacity-90"
            >
              Ver detalhes
            </a>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 font-semibold hover:bg-gray-50"
            >
              Candidatar
            </a>
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-500 bg-gray-50"
            disabled
          >
            Link indisponível
          </button>
        )}
      </div>
    </div>
  );
};

// --- Loading Screen ---
const LoadingScreen: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % statusMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating background circles */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 top-1/4 left-1/3"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -25, 25, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute w-56 h-56 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 bottom-1/4 right-1/4"
      />

      <div className="text-center relative z-10">
        {/* Circular spinner */}
        <motion.div
          className="w-24 h-24 rounded-full border-8 border-t-8 border-gray-200 border-t-transparent mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        {/* Animated status message */}
        <AnimatePresence exitBeforeEnter>
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-gray-700 text-lg sm:text-xl font-semibold"
          >
            {statusMessages[currentMessage]}
          </motion.p>
        </AnimatePresence>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Por favor, aguarde enquanto geramos o seu plano de estudo personalizado.
        </p>
      </div>
    </div>
  );
};

// --- Results Page ---
const ResultsPage: React.FC = () => {
  const { knownCourseData, vocationalData } = useFormData();
  const [aiData, setAiData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  if (!aiData) {
    const stored = localStorage.getItem("studyPlan");
    if (stored) {
      const parsed = safeParse(JSON.parse(stored));
      setAiData(parsed);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
}, []);

  useEffect(() => {
    const fetchAI = async () => {
      if (!knownCourseData) return;

      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/study-plan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            knownCourse: knownCourseData,
            vocational: vocationalData || {},
          }),
        });

        const data = await res.json();
        const parsed = safeParse(data.result || data);
        setAiData(parsed);
      } catch (err) {
        console.error("Erro ao buscar dados da AI:", err);
        setAiData({
          courses: [],
          scholarships: [],
          userReport: "⚠️ Não foi possível gerar recomendações. Tenta novamente mais tarde.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAI();
  }, [knownCourseData, vocationalData]);

  const handleDownloadDocx = async () => {
    if (!aiData) return;

    const { userReport, courses, scholarships } = aiData;

    const paragraphs: Paragraph[] = [];

    // Title
    paragraphs.push(
      new Paragraph({
        text: "Plano de Estudos Personalizado",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ text: "" })
    );

    // User Report
    paragraphs.push(
      new Paragraph({ text: "📄 Relatório Pessoal", heading: HeadingLevel.HEADING_1 })
    );
    userReport.split("\n").forEach((line) => {
      if (line.trim() !== "") paragraphs.push(new Paragraph(line.trim()));
    });

    // Courses
    if (courses.length > 0) {
      paragraphs.push(
        new Paragraph({ text: "🎯 Cursos Recomendados", heading: HeadingLevel.HEADING_1 })
      );
      courses.forEach((c, idx) => {
        paragraphs.push(
          new Paragraph({ text: `${idx + 1}. ${c.title || c.name}`, heading: HeadingLevel.HEADING_2 }),
          new Paragraph(`Universidade: ${c.university || "N/A"}`),
          new Paragraph(`País: ${c.country || "N/A"}`),
          new Paragraph(`Cidade: ${c.city || "N/A"}`),
          new Paragraph(`Preço por ano: ${c.pricePerYear || "N/A"}`),
          new Paragraph(`Requisitos: ${Array.isArray(c.requirements) ? c.requirements.join(", ") : c.requirements || "N/A"}`),
          new Paragraph(`Alojamento: ${c.accommodation?.needed ? c.accommodation.details || "Necessário" : "Não necessário"}`),
          new Paragraph(`Vistos & Legalidades: ${c.visaAndLegal || "Não especificado"}`),
          new Paragraph(`Por que se adequa a ti: ${c.whyThisFits || "Não especificado"}`),
          new Paragraph(`Descrição: ${c.description || "Sem descrição"}`),
          new Paragraph({ text: "" })
        );
      });
    }

    // Scholarships
    if (scholarships.length > 0) {
      paragraphs.push(
        new Paragraph({ text: "💰 Bolsas Sugeridas", heading: HeadingLevel.HEADING_1 })
      );
      scholarships.forEach((s, i) => {
        paragraphs.push(
          new Paragraph({ text: `${i + 1}. ${s.title}`, heading: HeadingLevel.HEADING_2 }),
          new Paragraph(`Fornecedor: ${s.provider || "Desconhecido"}`),
          new Paragraph(`Montante: ${s.amount || "Não disponível"}`),
          new Paragraph(`Critérios de elegibilidade: ${Array.isArray(s.eligibility) ? s.eligibility.join(", ") : s.eligibility || "Não especificado"}`),
          new Paragraph(`Prazo: ${s.deadline || "Desconhecido"}`),
          new Paragraph(`Link: ${s.url || "Não disponível"}`),
          new Paragraph(`Como candidatar: ${s.howToApply || "N/A"}`),
          new Paragraph(`Porquê que se adequa a ti: ${s.whyMatchesUser || "Não especificado"}`),
          new Paragraph(`Descrição: ${s.description || "Sem descrição"}`),
          new Paragraph({ text: "" })
        );
      });
    }

    const doc = new Document({ sections: [{ children: paragraphs }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "meu_trilho_academico.docx");
  };

  if (loading) return <LoadingScreen />;
  if (!aiData)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <p className="text-gray-700 text-lg">Sem dados disponíveis.</p>
      </div>
    );

    
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            🎓 O teu <span className="text-indigo-600">Plano de Estudos</span> Personalizado
          </h1>
          <button
            onClick={handleDownloadDocx}
            className="mt-4 px-5 py-2.5 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700"
          >
            📥 Descarregar .DOCX
          </button>
        </header>

        <section className="bg-white rounded-3xl border border-gray-100 p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">📄 Relatório Pessoal</h2>
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatReportToHTML(aiData.userReport) }}
          />
        </section>

        {aiData.courses?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Cursos Recomendados</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {aiData.courses.map((course, idx) => (
                <StudyPlanCard key={idx} data={course} />
              ))}
            </div>
          </section>
        )}

        {aiData.scholarships?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Bolsas Sugeridas</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {aiData.scholarships.map((sch, i) => (
                <ScholarshipCard key={i} sch={sch} />
              ))}
            </div>
            <button
      onClick={() => navigate("/recursos")}
      className="mt-4 px-5 py-2.5 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700"
    >
      Ver mais bolsas para ti
    </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
