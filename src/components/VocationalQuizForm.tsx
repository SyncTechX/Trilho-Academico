import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormData } from "./FormDataContext";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../data/questions";
import {
  User,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  BookOpen,
  CheckCircle2,
  Info,
  Loader2,
  CalendarDays,
} from "lucide-react";

const API_URL = "https://trilhoacademico.edu.mz";

const professors = [
  {
    name: "Dra. Marcia Martins Banze",
    email: "Mestre em Psicologia",
    picture: "/marcia.jpg",
  },
  {
    name: "Alicio Lino",
    email: "Estudante de Psicologia na USTM",
    picture: "/farley.jpg",
  },
];

const countryOptions = [
  "Moçambique",
  "África do Sul",
  "Portugal",
  "Alemanha",
  "Chipre",
  "Malásia",
  "Polónia",
  "Estados Unidos da América",
  "Espanha",
  "Brasil",
  "Reino Unido",
  "Índia",
];

const provinceOptions = [
  "Maputo Cidade",
  "Maputo Província",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Niassa",
  "Cabo Delgado",
];

type AllAnswers = Record<number, string | string[]>;

const chunk = <T,>(arr: T[], size = 3) => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const VocationalTestForm: React.FC = () => {
  const navigate = useNavigate();
  const { setVocationalQuizData } = useFormData();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    highestEducation: "",
    highSchool: "",
    country: "",
    province: "",
    curriculum: "",
    finalAverage: "",
  });

  const defaultAnswers: AllAnswers = Object.fromEntries(
    QUESTIONS.map((q) => [q.id, q.type === "multi" ? [] : ""])
  );

  const [answers, setAnswers] = useState<AllAnswers>(defaultAnswers);
  const steps = useMemo(() => chunk(QUESTIONS, 3), []);
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalQuestions = QUESTIONS.length;

  const answeredCount = useMemo(() => {
    let count = 0;
    Object.values(answers).forEach((value) => {
      if (Array.isArray(value)) {
        if (value.length) count++;
      } else if (value) {
        count++;
      }
    });
    return count;
  }, [answers]);

  const overallProgress = useMemo(() => {
    if (currentStep === 0) return 8;
    return Math.round(((currentStep + 1) / (totalSteps + 1)) * 100);
  }, [currentStep, totalSteps]);

  const personalCompletion = useMemo(() => {
    const requiredFields = [
      formData.name,
      formData.dateOfBirth,
      formData.country,
      formData.curriculum,
    ];
    const filled = requiredFields.filter(Boolean).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [formData]);

  const stepTitle =
    currentStep === 0
      ? "Informação Pessoal"
      : `Bloco ${currentStep} de ${totalSteps}`;

  const handleAnswer = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const toggleMulti = (id: number, opt: string) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[id]) ? [...(prev[id] as string[])] : [];
      if (arr.includes(opt)) {
        return { ...prev, [id]: arr.filter((o) => o !== opt) };
      }
      if (arr.length >= 3) return prev;
      return { ...prev, [id]: [...arr, opt] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setVocationalQuizData({ answers });

    try {
      const knownCourse = JSON.parse(
        localStorage.getItem("knownCourseData") || "{}"
      );

      const response = await fetch(`${API_URL}/study-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personal: formData,
          vocational: answers,
          knownCourse,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("studyPlan", JSON.stringify(data.result));
      navigate("/results");
    } catch (err) {
      console.error("Failed to send data:", err);
      alert("Ocorreu um erro ao enviar os dados. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isSelected = (id: number, opt: string) => {
    const value = answers[id];
    if (Array.isArray(value)) return value.includes(opt);
    return value === opt;
  };

  const optionButtonClass = (selected = false) =>
    `group relative overflow-hidden rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
      selected
        ? "border-transparent bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20"
        : "border-gray-200 bg-white text-gray-700 hover:border-cyan-200 hover:bg-cyan-50/60 hover:text-cyan-700"
    }`;

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100";

  const sectionCardClass =
    "rounded-[2rem] border border-gray-200/80 bg-white/95 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-indigo-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-60px] h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute right-[-140px] top-1/4 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row"
      >
        {/* Sidebar */}
        <aside className={`lg:w-[340px] ${sectionCardClass} p-5 sm:p-6`}>
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                  TA
                </div>

                <div>
                  <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
                    Teste Vocacional
                  </h1>
                  <p className="text-sm text-gray-500">
                    Um passo de cada vez, com mais clareza.
                  </p>
                </div>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
                <Sparkles className="h-3.5 w-3.5" />
                Trilho Académico
              </div>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                  Passo atual
                </p>
                <h2 className="mt-2 text-lg font-bold text-gray-900">
                  {stepTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {currentStep === 0
                    ? "Começa com os teus dados pessoais antes de iniciares o teste."
                    : `Perguntas respondidas: ${answeredCount} de ${totalQuestions}.`}
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span>Progresso</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Perfil
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Informação pessoal
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Completo: {personalCompletion}%
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Estado
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Respostas guardadas
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    {answeredCount} bloco{answeredCount !== 1 ? "s" : ""} já
                    respondido{answeredCount !== 1 ? "s" : ""}.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-indigo-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Dica importante
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Responde com sinceridade. Quanto mais autênticas forem as tuas
                    respostas, mais útil será o resultado final.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <motion.div
          key={currentStep}
          initial={{ x: 36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className={`flex-1 ${sectionCardClass} p-5 sm:p-7 lg:p-8`}
        >
          {/* Step 0 */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                    <BookOpen className="h-3.5 w-3.5" />
                    Etapa inicial
                  </div>

                  <h2 className="flex items-center gap-2 text-2xl font-black text-gray-900 sm:text-3xl">
                    <User className="h-6 w-6 text-indigo-600" />
                    Informação Pessoal
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                    Preenche os teus dados básicos antes de avançares para o
                    teste vocacional.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ex: Nilton Novele"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Data de Nascimento *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({ ...formData, dateOfBirth: e.target.value })
                      }
                      required
                      className={`${inputClass} pr-11`}
                    />
                    <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nível Académico Mais Elevado
                  </label>
                  <select
                    value={formData.highestEducation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        highestEducation: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="">Selecionar</option>
                    <option value="ensino-medio">Ensino Médio</option>
                    <option value="licenciatura">Licenciatura</option>
                    <option value="mestrado">Mestrado</option>
                    <option value="doutoramento">Doutoramento</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Escola Secundária
                  </label>
                  <input
                    type="text"
                    value={formData.highSchool}
                    onChange={(e) =>
                      setFormData({ ...formData, highSchool: e.target.value })
                    }
                    placeholder="Ex: Escola Secundária Josina Machel"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    País
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Selecionar</option>
                    {countryOptions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {formData.country === "Moçambique" ? (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Província
                    </label>
                    <div className="relative">
                      <select
                        value={formData.province}
                        onChange={(e) =>
                          setFormData({ ...formData, province: e.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="">Selecionar</option>
                        {provinceOptions.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                      <MapPin className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/70 p-4 text-sm leading-6 text-gray-500">
                    Seleciona <span className="font-semibold">Moçambique</span>{" "}
                    para escolheres a província.
                  </div>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Currículo
                  </label>
                  <select
                    value={formData.curriculum}
                    onChange={(e) =>
                      setFormData({ ...formData, curriculum: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Selecionar</option>
                    <option value="mozambicano">Nacional (Moçambicano)</option>
                    <option value="americano">Americano</option>
                    <option value="britanico">Cambridge</option>
                    <option value="ieb">IEB</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Média Final
                  </label>
                  <input
                    type="text"
                    value={formData.finalAverage}
                    onChange={(e) =>
                      setFormData({ ...formData, finalAverage: e.target.value })
                    }
                    placeholder={
                      formData.curriculum === "americano"
                        ? "Ex: 3.7 GPA"
                        : formData.curriculum === "mozambicano"
                        ? "Ex: 15/20"
                        : "Ex: 85%"
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quiz steps */}
          {currentStep > 0 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Teste vocacional
                </div>

                <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
                  {stepTitle}
                </h2>
                <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                  Responde às perguntas abaixo com honestidade.
                </p>
              </div>

              {steps[currentStep - 1].map((q, index) => (
                <div
                  key={q.id}
                  className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                      {index + 1}
                    </div>
                    <label className="pt-1 text-base font-semibold leading-7 text-gray-800">
                      {q.text}
                    </label>
                  </div>

                  {(q.type === "likert" ||
                    q.type === "scale" ||
                    q.type === "single" ||
                    q.type === "ab") && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {q.options?.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAnswer(q.id, opt)}
                          className={optionButtonClass(answers[q.id] === opt)}
                        >
                          <span className="relative z-10">{opt}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "multi" && (
                    <>
                      <div className="mb-3 text-xs font-medium text-gray-500">
                        Podes selecionar até 3 opções.
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {q.options?.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleMulti(q.id, opt)}
                            className={optionButtonClass(
                              (answers[q.id] as string[]).includes(opt)
                            )}
                          >
                            <span className="relative z-10">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Voltar
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {currentStep === 0 ? "Começar Teste" : "Próximo"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:-translate-y-0.5 hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Submeter Teste
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </form>

      {/* Floating info button */}
      <div className="relative">
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-2xl transition-transform hover:scale-105"
          aria-label="Abrir informações"
        >
          <Info className="h-6 w-6" />
        </button>

        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 z-40 bg-black"
              />
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="relative w-full max-w-xl rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl sm:p-8">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  >
                    ×
                  </button>

                  <div className="mb-6">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Responsáveis
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Equipa de Apoio
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Estes são os responsáveis ligados ao acompanhamento deste
                      processo.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {professors.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-gray-50/80 p-4 transition hover:shadow-md"
                      >
                        <img
                          src={p.picture}
                          alt={p.name}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{p.name}</p>
                          <p className="text-sm text-gray-600">{p.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-3xl bg-gray-50/80 p-4 text-center">
                    <p className="text-sm leading-6 text-gray-500">
                      Em caso de dúvidas, contacta a equipa do Trilho Académico.
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VocationalTestForm;