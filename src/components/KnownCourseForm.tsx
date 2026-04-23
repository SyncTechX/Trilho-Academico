import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  DollarSign,
  Heart,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  GraduationCap,
  BookOpen,
  Sparkles,
  Globe2,
  School,
  CalendarDays,
  Wallet,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { useFormData, KnownCourseData } from "./FormDataContext";

const steps = [
  "Informação Pessoal",
  "Curso e Preferências",
  "Localização",
  "Orçamento & Idiomas",
  "Interesses & Observações",
];

const countryOptions = [
  "Moçambique",
  "África do Sul",
  "Polónia",
  "Brasil",
  "Índia",
  "Reino Unido",
  "Estados Unidos da América",
  "Chipre",
  "Portugal",
  "Malásia",
  "Alemanha",
  "Espanha",
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
  "Cabo Delgado",
  "Niassa",
];

const accommodationOptions = [
  "Apartamento / Flat",
  "Residência Estudantil",
  "Studio",
  "Casa Partilhada",
];

const KnownCourseForm: React.FC = () => {
  const navigate = useNavigate();
  const { setKnownCourseData } = useFormData();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<
    KnownCourseData & {
      name?: string;
      dateOfBirth?: string;
      highestEducation?: string;
      highSchool?: string;
      country?: string;
      province?: string;
      curriculum?: string;
      finalAverage?: string;
      hasAccommodation?: string;
      accommodationType?: string;
      studyMode?: string;
      startDate?: string;
      startMonthYear?: string;
      duration?: string;
      visaConcerns?: string;
    }
  >({
    name: "",
    dateOfBirth: "",
    highestEducation: "",
    highSchool: "",
    country: "",
    province: "",
    curriculum: "",
    finalAverage: "",
    course: "",
    alternativeCourses: [""],
    targetUniversities: "",
    preferredRegions: "",
    desiredCountries: [],
    startDate: "",
    duration: "",
    budget: "",
    currency: "MZN",
    livingPreference: "",
    studyMode: "",
    fundingType: "",
    visaConcerns: "",
    hasAccommodation: "no",
    accommodationType: "",
    languages: [""],
    interests: "",
    notes: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const progress = useMemo(() => (step / steps.length) * 100, [step]);
  const currentStepLabel = steps[step - 1];

  const handleArrayChange = (
    field: "alternativeCourses" | "languages",
    index: number,
    value: string
  ) => {
    const updated = [...(formData[field] as string[])];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addField = (field: "alternativeCourses" | "languages") => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ""],
    });
  };

  const handleLanguageChange = (index: number, value: string) =>
    handleArrayChange("languages", index, value);

  const handleAlternativeCourseChange = (index: number, value: string) =>
    handleArrayChange("alternativeCourses", index, value);

  const addAlternativeCourse = () => addField("alternativeCourses");
  const addLanguage = () => addField("languages");

  const handleCountrySelection = (value: string) => {
    let updated = [...(formData.desiredCountries || [])];
    if (updated.includes(value)) {
      updated = updated.filter((c) => c !== value);
    } else {
      if (updated.length >= 3) {
        alert("Só podes selecionar até 3 países preferidos.");
        return;
      }
      updated.push(value);
    }
    setFormData({ ...formData, desiredCountries: updated });
  };

  const nextStep = () => {
    if (step < steps.length) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== steps.length) return;
    setKnownCourseData(formData);
    navigate("/results");
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const sectionTitleClass =
    "text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2";
  const cardClass =
    "rounded-[2rem] border border-gray-200/80 bg-white/95 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Plano detalhado e personalizado
          </div>

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-xl">
            <GraduationCap className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Plano de Estudos{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Detalhado
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Preenche o formulário com atenção. Quanto mais detalhes forneceres,
            melhores serão as recomendações e os resultados apresentados.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className={`${cardClass} p-5 sm:p-6 h-fit lg:sticky lg:top-6`}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
                <School className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                  Trilho Académico
                </p>
                <h2 className="text-lg font-bold text-gray-900">Formulário Guiado</h2>
              </div>
            </div>

            <div className="mb-5 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
                Passo atual
              </p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">
                {currentStepLabel}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Etapa {step} de {steps.length}
              </p>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>Progresso</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((item, index) => {
                const isActive = index + 1 === step;
                const isCompleted = index + 1 < step;

                return (
                  <div
                    key={item}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition ${
                      isActive
                        ? "bg-indigo-50 border border-indigo-100"
                        : "bg-gray-50/70"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-bold ${
                        isCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                          : isActive
                          ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
                          : "bg-white text-gray-500 border border-gray-200"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-indigo-700"
                          : isCompleted
                          ? "text-emerald-700"
                          : "text-gray-600"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50/80 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Dica</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Sê o mais específico possível. Isso ajuda a melhorar a
                    qualidade das recomendações finais.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && step !== steps.length) e.preventDefault();
            }}
            className={`${cardClass} p-6 sm:p-8 lg:p-10`}
          >
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className={sectionTitleClass}>
                    <User className="h-5 w-5 text-indigo-600" />
                    Informação Pessoal
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                    Começa por preencher os teus dados pessoais e académicos.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Nome Completo *</label>
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
                    <label className={labelClass}>Data de Nascimento *</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dateOfBirth: e.target.value,
                          })
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
                    <label className={labelClass}>Nível Académico Mais Elevado</label>
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
                    <label className={labelClass}>
                      Escola Secundária (Ensino Médio)
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
                    <label className={labelClass}>País</label>
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
                      <label className={labelClass}>Província</label>
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
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm leading-6 text-gray-500">
                      Seleciona <span className="font-semibold">Moçambique</span>{" "}
                      para escolheres a província.
                    </div>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Currículo</label>
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
                    <label className={labelClass}>Média Final</label>
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

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className={sectionTitleClass}>
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    Curso e Preferências
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                    Diz-nos qual é o teu foco principal e as tuas preferências de estudo.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Curso Principal</label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    placeholder="Ex: Engenharia Informática"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Cursos Alternativos</label>
                  <div className="space-y-3">
                    {formData.alternativeCourses.map((course, index) => (
                      <input
                        key={index}
                        type="text"
                        value={course}
                        onChange={(e) =>
                          handleAlternativeCourseChange(index, e.target.value)
                        }
                        placeholder={`Curso alternativo #${index + 1}`}
                        className={inputClass}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addAlternativeCourse}
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:underline"
                  >
                    + Adicionar curso alternativo
                  </button>
                </div>

                <div>
                  <label className={labelClass}>Já tens alojamento?</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "yes", label: "Sim" },
                      { value: "no", label: "Não" },
                    ].map((option) => {
                      const selected = formData.hasAccommodation === option.value;
                      return (
                        <label
                          key={option.value}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                            selected
                              ? "border-indigo-500 bg-indigo-50 shadow-sm"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasAccommodation"
                            value={option.value}
                            checked={selected}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                hasAccommodation: e.target.value,
                              })
                            }
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span
                            className={`text-sm font-medium ${
                              selected ? "text-indigo-700" : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {formData.hasAccommodation === "no" && (
                  <div>
                    <label className={labelClass}>
                      Que tipo de alojamento preferes?
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {accommodationOptions.map((option) => {
                        const selected =
                          formData.accommodationType?.split(",").includes(option) ||
                          false;

                        return (
                          <label
                            key={option}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                              selected
                                ? "border-indigo-500 bg-indigo-50 shadow-sm"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={(e) => {
                                let updated = formData.accommodationType
                                  ? formData.accommodationType.split(",")
                                  : [];
                                if (e.target.checked) {
                                  updated.push(option);
                                } else {
                                  updated = updated.filter((o) => o !== option);
                                }
                                setFormData({
                                  ...formData,
                                  accommodationType: updated.join(","),
                                });
                              }}
                              className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span
                              className={`text-sm font-medium ${
                                selected ? "text-indigo-700" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Modo de Estudo</label>
                    <select
                      value={formData.studyMode}
                      onChange={(e) =>
                        setFormData({ ...formData, studyMode: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="">Selecionar</option>
                      <option value="full-time">Presencial</option>
                      <option value="part-time">Online</option>
                      <option value="hybrid">Híbrido</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Mês e Ano de Início Desejado</label>
                    <input
                      type="month"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Duração do Curso</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="Ex: 3 anos, 6 semestres..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Observações</label>
                    <textarea
                      value={formData.visaConcerns}
                      onChange={(e) =>
                        setFormData({ ...formData, visaConcerns: e.target.value })
                      }
                      placeholder="Conta-nos algo importante (ex.: perdi o meu certificado)"
                      className={`${inputClass} min-h-[110px] resize-none`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className={sectionTitleClass}>
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    Localização Preferida
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                    Indica onde gostarias de estudar e quais são os teus destinos de interesse.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Onde gostarias de estudar?</label>
                  <textarea
                    value={formData.preferredRegions}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredRegions: e.target.value })
                    }
                    placeholder="Ex: Maputo, Lisboa, Cidade do Cabo..."
                    className={`${inputClass} min-h-[110px] resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Países de Interesse (máx. 3)</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {countryOptions.map((country) => {
                      const selected =
                        formData.desiredCountries?.includes(country) || false;

                      return (
                        <label
                          key={country}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                            selected
                              ? "border-indigo-500 bg-indigo-50 shadow-sm"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => handleCountrySelection(country)}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span
                            className={`text-sm font-medium ${
                              selected ? "text-indigo-700" : "text-gray-700"
                            }`}
                          >
                            {country}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {formData.desiredCountries?.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                      <span className="font-semibold">Selecionados:</span>{" "}
                      {formData.desiredCountries.join(", ")}
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Universidades de Interesse</label>
                  <input
                    type="text"
                    value={formData.targetUniversities}
                    onChange={(e) =>
                      setFormData({ ...formData, targetUniversities: e.target.value })
                    }
                    placeholder="Ex: UEM, UCT, Wits, Harvard..."
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className={sectionTitleClass}>
                    <Wallet className="h-5 w-5 text-indigo-600" />
                    Orçamento & Idiomas
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                    Ajuda-nos a compreender melhor as tuas possibilidades financeiras e linguísticas.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Orçamento Estimado (por ano)</label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        placeholder="Ex: 500000"
                        className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      />
                      <select
                        value={formData.currency}
                        onChange={(e) =>
                          setFormData({ ...formData, currency: e.target.value })
                        }
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      >
                        <option value="MZN">MZN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="ZAR">ZAR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Como pretendes financiar os estudos?
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        "Recursos próprios",
                        "Bolsa de estudo",
                        "Empréstimo bancário",
                        "Apoio familiar",
                        "Outros",
                      ].map((option) => {
                        const selected =
                          formData.fundingType?.split(",").includes(option) || false;

                        return (
                          <label
                            key={option}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                              selected
                                ? "border-indigo-500 bg-indigo-50 shadow-sm"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={(e) => {
                                let updated = formData.fundingType
                                  ? formData.fundingType.split(",")
                                  : [];
                                if (e.target.checked) {
                                  updated.push(option);
                                } else {
                                  updated = updated.filter((o) => o !== option);
                                }
                                setFormData({
                                  ...formData,
                                  fundingType: updated.join(","),
                                });
                              }}
                              className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span
                              className={`text-sm font-medium ${
                                selected ? "text-indigo-700" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Idiomas Preferidos</label>
                  <div className="space-y-3">
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="relative">
                        <input
                          type="text"
                          value={lang}
                          onChange={(e) =>
                            handleLanguageChange(index, e.target.value)
                          }
                          placeholder="Ex: Inglês, Português..."
                          className={`${inputClass} pl-11`}
                        />
                        <Languages className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addLanguage}
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:underline"
                  >
                    + Adicionar idioma
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className={sectionTitleClass}>
                    <Heart className="h-5 w-5 text-indigo-600" />
                    Interesses & Observações
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                    Partilha mais detalhes sobre os teus interesses, motivações e qualquer nota importante.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Interesses e Motivações</label>
                  <textarea
                    value={formData.interests}
                    onChange={(e) =>
                      setFormData({ ...formData, interests: e.target.value })
                    }
                    placeholder="Fala-nos sobre as tuas paixões, objetivos e áreas de interesse..."
                    className={`${inputClass} min-h-[140px] resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Observações Finais</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Qualquer informação adicional relevante..."
                    className={`${inputClass} min-h-[140px] resize-none`}
                  />
                </div>

                <div className="rounded-[1.75rem] border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Quase terminado
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Revê as tuas respostas e submete o formulário para receberes
                        o teu plano de estudos personalizado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
              ) : (
                <div />
              )}

              {step < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Avançar
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Submeter Formulário
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KnownCourseForm;