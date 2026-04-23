import React, { useState, useEffect, useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { accommodations } from "../data/accommodations";
import { activities } from "../data/activities";
import {
  FaMapMarkerAlt,
  FaBed,
  FaRunning,
  FaCoffee,
  FaChurch,
  FaFilm,
  FaShoppingBag,
  FaLandmark,
} from "react-icons/fa";
import {
  Search,
  Sparkles,
  Building2,
  Compass,
  SlidersHorizontal,
  Globe2,
  GraduationCap,
  ArrowRight,
  RefreshCw,
  Loader2,
} from "lucide-react";

const API_URL = "http://localhost:5001"; //http://localhost:3000

const AccommodationExplorer: React.FC = () => {
  const [paisSelecionado, setPaisSelecionado] = useState("");
  const [universidadeSelecionada, setUniversidadeSelecionada] = useState("");
  const [tipoAtividadeSelecionada, setTipoAtividadeSelecionada] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Acomodações" | "Atividades">(
    "Acomodações"
  );
  const [mapViewOnly] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_KEY",
  });

  const [userLocation, setUserLocation] = useState({
    lat: -33.9249,
    lng: 18.4241,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => console.warn("Geolocation not available or denied")
      );
    }
  }, []);

  const filteredAccommodations = useMemo(
    () =>
      accommodations.filter(
        (acc) =>
          acc.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!paisSelecionado || acc.pais === paisSelecionado) &&
          (!universidadeSelecionada ||
            acc.universidade === universidadeSelecionada)
      ),
    [searchQuery, paisSelecionado, universidadeSelecionada]
  );

  const filteredActivities = useMemo(
    () =>
      activities.filter(
        (act) =>
          act.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!paisSelecionado || act.pais === paisSelecionado) &&
          (!tipoAtividadeSelecionada || act.tipo === tipoAtividadeSelecionada)
      ),
    [searchQuery, paisSelecionado, tipoAtividadeSelecionada]
  );

  const [externalItems, setExternalItems] = useState<any[] | null>(null);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiPage, setAiPage] = useState(1);

  const itemsToDisplay =
    externalItems ??
    (activeTab === "Acomodações"
      ? filteredAccommodations
      : filteredActivities);

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "Desporto":
        return <FaRunning className="text-green-500" />;
      case "Café":
        return <FaCoffee className="text-orange-500" />;
      case "Ginásio":
        return <FaBed className="text-purple-500" />;
      case "Igreja":
        return <FaChurch className="text-indigo-500" />;
      case "Cinema":
        return <FaFilm className="text-red-500" />;
      case "Shopping":
        return <FaShoppingBag className="text-pink-500" />;
      case "Museu":
        return <FaLandmark className="text-yellow-500" />;
      default:
        return <FaMapMarkerAlt className="text-blue-500" />;
    }
  };

  async function handleAISearch(loadMore = false) {
    if (!searchQuery.trim()) return;
    setIsSearchingAI(true);
    setAiError(null);

    const nextPage = loadMore ? aiPage + 1 : 1;

    try {
      const resp = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, tab: activeTab, limit: 10 }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || "Erro desconhecido");
      }

      const data = await resp.json();

      const items = (data.items || []).map((it: any, idx: number) => ({
        id: it.id || `external-${idx}`,
        nome: it.nome || "Sem nome",
        descricao: it.descricao || "",
        pais: it.pais || "",
        universidade: it.universidade || "",
        tipo: it.tipo || "",
        preco: it.preco ?? null,
        imagem: it.imagem || null,
        lat:
          typeof it.lat === "number"
            ? it.lat
            : it.lat
            ? Number(it.lat)
            : null,
        lng:
          typeof it.lng === "number"
            ? it.lng
            : it.lng
            ? Number(it.lng)
            : null,
      }));

      setExternalItems(loadMore ? [...(externalItems || []), ...items] : items);
      setAiPage(nextPage);
    } catch (err: any) {
      console.error("AI search error", err);
      setAiError(err.message || "Erro ao pesquisar com IA");
    } finally {
      setIsSearchingAI(false);
    }
  }

  const resetLocalFilters = () => {
    setPaisSelecionado("");
    setUniversidadeSelecionada("");
    setTipoAtividadeSelecionada("");
    setSearchQuery("");
    setExternalItems(null);
    setAiPage(1);
    setAiError(null);
  };

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

  const activityOptions = [
    "Desporto",
    "Igreja",
    "Café",
    "Ginásio",
    "Cinema",
    "Shopping",
    "Museu",
  ];

  const universities = [
    ...new Set(
      accommodations
        .filter((acc) => (paisSelecionado ? acc.pais === paisSelecionado : true))
        .map((acc) => acc.universidade)
    ),
  ];

  const resultsCount = itemsToDisplay.length;

  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/85 backdrop-blur-md">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-2xl">
        <Loader2 className="h-9 w-9 animate-spin" />
      </div>
      <p className="text-lg font-semibold text-gray-800">
        A pesquisar com IA, por favor aguarda...
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Estamos a procurar os melhores resultados para ti.
      </p>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      {isSearchingAI && <LoadingScreen />}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute right-[-60px] top-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/90 p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                <Sparkles className="h-4 w-4" />
                Exploração inteligente
              </div>

              <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Explorar{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {externalItems ? "Resultados com IA" : activeTab}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                Descobre acomodações e atividades alinhadas com os teus
                interesses, com filtros locais ou pesquisa inteligente por IA.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {resultsCount} resultado{resultsCount !== 1 ? "s" : ""}
                </div>
                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  {activeTab}
                </div>
                {externalItems && (
                  <div className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                    Fonte: IA
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Acomodações</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Explora opções perto de universidades e zonas académicas.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Atividades</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Encontra espaços e experiências para o teu dia a dia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-6 rounded-[2rem] border border-gray-200/70 bg-white/90 p-4 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <SlidersHorizontal className="h-4 w-4" />
            Filtros e pesquisa
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            {/* Search */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition hover:shadow-md">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder='Ex: "Acomodação de estudantes no Chipre"'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Country */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:ring-2 focus:ring-purple-400"
                  value={paisSelecionado}
                  onChange={(e) => setPaisSelecionado(e.target.value)}
                >
                  <option value="">Todos os Países</option>
                  {countryOptions.map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* University or Activity */}
            {externalItems === null && activeTab === "Acomodações" && (
              <div className="lg:col-span-3">
                <div className="relative">
                  <GraduationCap className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:ring-2 focus:ring-purple-400"
                    value={universidadeSelecionada}
                    onChange={(e) =>
                      setUniversidadeSelecionada(e.target.value)
                    }
                  >
                    <option value="">Todas as Universidades</option>
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {externalItems === null && activeTab === "Atividades" && (
              <div className="lg:col-span-3">
                <div className="relative">
                  <Compass className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:ring-2 focus:ring-purple-400"
                    value={tipoAtividadeSelecionada}
                    onChange={(e) =>
                      setTipoAtividadeSelecionada(e.target.value)
                    }
                  >
                    <option value="">Todos os Tipos</option>
                    {activityOptions.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="lg:col-span-2 flex gap-3">
              <button
                onClick={() => handleAISearch(false)}
                disabled={isSearchingAI}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.01] disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />
                Pesquisar IA
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {externalItems && (
              <button
                onClick={() => {
                  setExternalItems(null);
                  setAiPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:shadow-md"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Voltar aos resultados locais
              </button>
            )}

            <button
              onClick={resetLocalFilters}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:shadow-md"
            >
              <RefreshCw className="h-4 w-4" />
              Limpar filtros
            </button>
          </div>

          {aiError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {aiError}
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1.5 shadow-sm">
            {["Acomodações", "Atividades"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as "Acomodações" | "Atividades");
                  setExternalItems(null);
                  setAiPage(1);
                  setAiError(null);
                }}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS */}
        {!mapViewOnly ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {itemsToDisplay.length === 0 ? (
              <div className="col-span-full rounded-[2rem] border border-dashed border-gray-300 bg-white/80 px-6 py-16 text-center shadow-sm">
                <FaMapMarkerAlt className="mx-auto mb-4 text-6xl text-gray-300" />
                <h3 className="text-xl font-bold text-gray-900">
                  Nenhum resultado encontrado
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-gray-500 text-base leading-7">
                  Tenta outros filtros, muda o separador atual ou faz uma
                  pesquisa com IA para obter sugestões mais amplas.
                </p>
              </div>
            ) : (
              itemsToDisplay.map((item: any) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/95 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-35px_rgba(0,0,0,0.22)]"
                >
                  <div className="flex h-full flex-col">
                    {activeTab === "Atividades" && item.imagem && (
                      <div className="relative overflow-hidden">
                        <img
                          src={item.imagem || "/placeholder.png"}
                          alt={item.nome}
                          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500">
                        {activeTab === "Atividades" ? (
                          <>
                            {getIcon(item.tipo)}
                            <span>{item.tipo || "Atividade"}</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="h-4 w-4 text-indigo-500" />
                            <span>{item.universidade || "Universidade"}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900">
                        {item.nome}
                      </h3>

                      {item.pais && (
                        <div className="mt-2 inline-flex items-center gap-2 text-sm text-gray-500">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <span>{item.pais}</span>
                        </div>
                      )}

                      <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600">
                        {item.descricao || "Sem descrição disponível."}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                          {externalItems ? "Resultado IA" : "Resultado local"}
                        </div>

                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/search?q=${encodeURIComponent(
                                item.nome + " " + item.pais
                              )}`,
                              "_blank"
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02]"
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          isLoaded && (
            <div className="mt-4 overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
              {/* Map placeholder area if re-enabled later */}
            </div>
          )
        )}

        {/* LOAD MORE */}
        {externalItems && externalItems.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => handleAISearch(true)}
              disabled={isSearchingAI}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg transition hover:scale-105 disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" />
              Carregar mais resultados
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationExplorer;