import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Award,
  Megaphone,
  Search,
  X,
  Edit3,
  Trash2,
  PlusCircle,
  Settings,
  Calendar,
  Globe2,
  ExternalLink,
  Lock,
  ShieldCheck,
  Loader2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertTriangle,
} from "lucide-react";

type StatusType = "Aberta" | "Fechada" | "Lotada" | "Cancelada";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  country?: string;
  link?: string;
  image?: string;
  status?: StatusType;
};

type Scholarship = {
  id: string;
  title: string;
  provider: string;
  country: string;
  deadline?: string;
  openingDate?: string;
  eligibility: string[];
  steps: string[];
  description?: string;
  requirements?: string[];
  specifications?: string[];
  link?: string;
  image?: string;
  status?: StatusType;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5003/api";

const statusOptions: StatusType[] = ["Aberta", "Fechada", "Lotada", "Cancelada"];

const getStatusStyles = (status?: StatusType) => {
  switch (status) {
    case "Aberta":
      return {
        badge:
          "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      };
    case "Fechada":
      return {
        badge:
          "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-white/10 dark:text-gray-300 dark:ring-white/10",
        icon: <XCircle className="h-3.5 w-3.5" />,
      };
    case "Lotada":
      return {
        badge:
          "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
        icon: <Clock3 className="h-3.5 w-3.5" />,
      };
    case "Cancelada":
      return {
        badge:
          "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
        icon: <AlertTriangle className="h-3.5 w-3.5" />,
      };
    default:
      return {
        badge:
          "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      };
  }
};

const formatDate = (value?: string) => {
  if (!value) return "Sem data";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Sem data";
  return parsed.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const toInputDateTime = (value?: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  const offset = parsed.getTimezoneOffset();
  const local = new Date(parsed.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};

const fromInputDateTime = (value: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString();
};

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const joinCsv = (value?: string[]) => (value && value.length ? value.join(", ") : "");

const opportunitiesStats = (
  scholarships: Scholarship[],
  news: NewsItem[]
) => {
  const openScholarships = scholarships.filter((s) => s.status === "Aberta").length;
  const openNews = news.filter((n) => n.status === "Aberta").length;
  return [
    {
      label: "Bolsas",
      value: scholarships.length,
      accent: "from-blue-500 to-cyan-500",
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: "Notícias",
      value: news.length,
      accent: "from-violet-500 to-indigo-500",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Abertas",
      value: openScholarships + openNews,
      accent: "from-emerald-500 to-green-500",
      icon: <Sparkles className="h-5 w-5" />,
    },
  ];
};

const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}> = ({ title, subtitle, icon }) => (
  <div className="mb-6 flex items-start gap-4">
    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
      {icon}
    </div>
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
  </div>
);

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
  />
);

const Textarea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) => (
  <textarea
    rows={rows}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
  />
);

const Select = ({
  value,
  onChange,
  options,
}: {
  value?: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <select
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Opportunities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"news" | "scholarships">("scholarships");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [query, setQuery] = useState("");
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingScholarships, setLoadingScholarships] = useState(true);
  const [saving, setSaving] = useState(false);

  const toggleAdmin = () => setAdminView((prev) => !prev);

  useEffect(() => {
    fetchNews();
    fetchScholarships();
  }, []);

  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const res = await fetch(`${API_URL}/news`);
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar notícias:", err);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchScholarships = async () => {
    try {
      setLoadingScholarships(true);
      const res = await fetch(`${API_URL}/scholarships`);
      const data = await res.json();
      setScholarships(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar bolsas:", err);
      setScholarships([]);
    } finally {
      setLoadingScholarships(false);
    }
  };

  const saveNews = async (item: Partial<NewsItem>, id?: string) => {
    try {
      setSaving(true);
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/news/${id}` : `${API_URL}/news`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          source: item.source || "SyncTechX",
          status: item.status || "Aberta",
        }),
      });

      const updated = await res.json();

      if (id) {
        setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
      } else {
        setNews((prev) => [updated, ...prev]);
      }

      setEditingNews(null);
    } catch (err) {
      console.error("Erro ao guardar notícia:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await fetch(`${API_URL}/news/${id}`, { method: "DELETE" });
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Erro ao eliminar notícia:", err);
    }
  };

  const saveScholarship = async (item: Partial<Scholarship>, id?: string) => {
    try {
      setSaving(true);
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/scholarships/${id}` : `${API_URL}/scholarships`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          status: item.status || "Aberta",
        }),
      });

      const updated = await res.json();

      if (id) {
        setScholarships((prev) => prev.map((s) => (s.id === id ? updated : s)));
      } else {
        setScholarships((prev) => [updated, ...prev]);
      }

      setEditingScholarship(null);
    } catch (err) {
      console.error("Erro ao guardar bolsa:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteScholarship = async (id: string) => {
    try {
      await fetch(`${API_URL}/scholarships/${id}`, { method: "DELETE" });
      setScholarships((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro ao eliminar bolsa:", err);
    }
  };

  const filteredNews = useMemo(() => {
    const search = query.toLowerCase().trim();
    return news.filter((n) => {
      const title = (n?.title ?? "").toString().toLowerCase();
      const excerpt = (n?.excerpt ?? "").toString().toLowerCase();
      const source = (n?.source ?? "").toString().toLowerCase();
      return (
        title.includes(search) || excerpt.includes(search) || source.includes(search)
      );
    });
  }, [news, query]);

  const filteredSch = useMemo(() => {
    const search = query.toLowerCase().trim();
    return scholarships.filter((s) => {
      const title = (s?.title ?? "").toString().toLowerCase();
      const provider = (s?.provider ?? "").toString().toLowerCase();
      const country = (s?.country ?? "").toString().toLowerCase();
      const description = (s?.description ?? "").toString().toLowerCase();
      return (
        title.includes(search) ||
        provider.includes(search) ||
        country.includes(search) ||
        description.includes(search)
      );
    });
  }, [scholarships, query]);

  const handlePinSubmit = () => {
    if (pinInput === "2307") {
      setIsAdmin(true);
      setAdminView(true);
      setShowPinModal(false);
      setPinInput("");
    } else {
      alert("PIN incorreto. Tente novamente.");
    }
  };

  const stats = opportunitiesStats(scholarships, news);
  const publicLoading =
    (activeTab === "news" && loadingNews) ||
    (activeTab === "scholarships" && loadingScholarships);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-[-60px] h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute right-[-80px] top-32 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_35%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-blue-300">
            <Megaphone className="h-4 w-4" />
            Oportunidades, notícias e bolsas num só lugar
          </div>

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-600 text-white shadow-[0_20px_50px_-20px_rgba(37,99,235,0.55)]">
            <Megaphone className="h-9 w-9" />
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Notícias &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">
              Bolsas de Estudo
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-300">
            Descobre oportunidades académicas, atualizações importantes e anúncios
            relevantes numa experiência moderna, simples e responsiva.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-gray-200/70 bg-white/85 p-5 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin button */}
        <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
          {!isAdmin ? (
            <button
              onClick={() => setShowPinModal(true)}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-xl transition hover:scale-105 dark:border-white/10 dark:bg-gray-900"
              title="Acesso administrativo"
            >
              <Lock className="h-4 w-4 text-gray-600 transition group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400" />
            </button>
          ) : (
            <button
              onClick={toggleAdmin}
              className="group flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 text-white shadow-xl transition hover:scale-[1.02]"
              title="Alternar painel administrativo"
            >
              {adminView ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
              <span className="hidden sm:inline text-sm font-semibold">
                {adminView ? "Fechar painel" : "Painel admin"}
              </span>
            </button>
          )}
        </div>

        {!adminView && (
          <div className="mt-10">
            {/* Tabs + Search */}
            <div className="rounded-[32px] border border-gray-200/70 bg-white/85 p-4 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="inline-flex w-full sm:w-auto rounded-2xl bg-gray-100 p-1 dark:bg-white/5">
                    <button
                      onClick={() => setActiveTab("scholarships")}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all sm:flex-none ${
                        activeTab === "scholarships"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-white/10"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Bolsas
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("news")}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all sm:flex-none ${
                        activeTab === "news"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-white/10"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Notícias
                      </span>
                    </button>
                  </div>
                </div>

                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    placeholder="Pesquisar oportunidades..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mt-8">
              {publicLoading ? (
                <div className="flex min-h-[260px] items-center justify-center rounded-[32px] border border-gray-200/70 bg-white/80 p-10 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      A carregar conteúdos...
                    </p>
                  </div>
                </div>
              ) : activeTab === "news" ? (
                filteredNews.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredNews.map((n) => {
                      const status = getStatusStyles(n.status);
                      return (
                        <article
                          key={n.id}
                          className="group overflow-hidden rounded-[28px] border border-gray-200/70 bg-white/90 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-white/[0.05]"
                        >
                          <div className="relative">
                            {n.image ? (
                              <img
                                src={n.image}
                                alt={n.title}
                                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-violet-100 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-violet-500/10">
                                <Megaphone className="h-12 w-12 text-blue-500/70" />
                              </div>
                            )}

                            <div className="absolute left-4 top-4">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}
                              >
                                {status.icon}
                                {n.status || "Aberta"}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 sm:p-6">
                            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4" />
                              {formatDate(n.date)}
                              {n.source && (
                                <>
                                  <span className="opacity-40">•</span>
                                  <span className="truncate">{n.source}</span>
                                </>
                              )}
                            </div>

                            <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
                              {n.title}
                            </h3>

                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                              {n.excerpt}
                            </p>

                            <div className="mt-5 flex items-center justify-between gap-3">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {n.country || "Internacional"}
                              </div>
                              <a
                                href={`/news/${n.id}`}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                              >
                                Ver mais
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center rounded-[32px] border border-dashed border-gray-300 bg-white/70 p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
                    <div>
                      <BookOpen className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Nenhuma notícia encontrada
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Tenta ajustar a pesquisa ou adiciona novos conteúdos.
                      </p>
                    </div>
                  </div>
                )
              ) : filteredSch.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredSch.map((s) => {
                    const status = getStatusStyles(s.status);
                    return (
                      <article
                        key={s.id}
                        className="group overflow-hidden rounded-[28px] border border-gray-200/70 bg-white/90 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-white/[0.05]"
                      >
                        <div className="relative">
                          {s.image ? (
                            <img
                              src={s.image}
                              alt={s.title}
                              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-violet-100 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-violet-500/10">
                              <Award className="h-12 w-12 text-blue-500/70" />
                            </div>
                          )}

                          <div className="absolute left-4 top-4">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}
                            >
                              {status.icon}
                              {s.status || "Aberta"}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 sm:p-6">
                          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span className="inline-flex items-center gap-1">
                              <Globe2 className="h-4 w-4" />
                              {s.country || "Internacional"}
                            </span>
                            {s.provider && (
                              <>
                                <span className="opacity-40">•</span>
                                <span>{s.provider}</span>
                              </>
                            )}
                          </div>

                          <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
                            {s.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {s.description || "Sem descrição disponível."}
                          </p>

                          <div className="mt-5 flex items-center justify-between gap-3">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {s.deadline ? `Prazo: ${formatDate(s.deadline)}` : "Sem prazo"}
                            </div>
                            <a
                              href={`/scholarships/${s.id}`}
                              className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                            >
                              Ver mais
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="flex min-h-[260px] items-center justify-center rounded-[32px] border border-dashed border-gray-300 bg-white/70 p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
                  <div>
                    <Award className="mx-auto h-10 w-10 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Nenhuma bolsa encontrada
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Tenta outra pesquisa ou adiciona novas oportunidades.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Admin */}
        {adminView && (
          <div className="mt-10 rounded-[32px] border border-gray-200/70 bg-white/90 p-5 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-white/[0.05]">
            <SectionHeader
              title="Painel de Administração"
              subtitle="Gerir notícias e bolsas de estudo de forma organizada e responsiva."
              icon={<ShieldCheck className="h-6 w-6" />}
            />

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              {/* Notícias admin */}
              <div className="rounded-[28px] border border-gray-200 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Notícias
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Criar, editar e remover notícias.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setEditingNews({
                        id: "",
                        title: "",
                        excerpt: "",
                        date: new Date().toISOString(),
                        source: "SyncTechX",
                        country: "",
                        link: "",
                        image: "",
                        status: "Aberta",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Adicionar
                  </button>
                </div>

                {editingNews && (
                  <div className="mb-5 rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-900">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {editingNews.id ? "Editar notícia" : "Nova notícia"}
                      </h4>
                      <button
                        onClick={() => setEditingNews(null)}
                        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <Input
                        placeholder="Título"
                        value={editingNews.title}
                        onChange={(value) =>
                          setEditingNews({ ...editingNews, title: value })
                        }
                      />
                      <Textarea
                        placeholder="Resumo"
                        value={editingNews.excerpt}
                        onChange={(value) =>
                          setEditingNews({ ...editingNews, excerpt: value })
                        }
                      />
                      <Input
                        placeholder="Imagem URL"
                        value={editingNews.image || ""}
                        onChange={(value) =>
                          setEditingNews({ ...editingNews, image: value })
                        }
                      />
                      <Input
                        placeholder="Link"
                        value={editingNews.link || ""}
                        onChange={(value) =>
                          setEditingNews({ ...editingNews, link: value })
                        }
                      />
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Input
                          placeholder="Fonte"
                          value={editingNews.source || ""}
                          onChange={(value) =>
                            setEditingNews({ ...editingNews, source: value })
                          }
                        />
                        <Input
                          placeholder="País"
                          value={editingNews.country || ""}
                          onChange={(value) =>
                            setEditingNews({ ...editingNews, country: value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Input
                          type="datetime-local"
                          placeholder="Data"
                          value={toInputDateTime(editingNews.date)}
                          onChange={(value) =>
                            setEditingNews({
                              ...editingNews,
                              date: fromInputDateTime(value),
                            })
                          }
                        />
                        <Select
                          value={editingNews.status}
                          onChange={(value) =>
                            setEditingNews({
                              ...editingNews,
                              status: value as StatusType,
                            })
                          }
                          options={statusOptions}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <button
                        onClick={() => setEditingNews(null)}
                        className="rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() =>
                          saveNews(editingNews, editingNews.id || undefined)
                        }
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
                      >
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                        Guardar
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {news.length > 0 ? (
                    news.map((n) => (
                      <div
                        key={n.id}
                        className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-gray-900"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900 dark:text-white">
                            {n.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(n.date)} • {n.source || "Sem fonte"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingNews(n)}
                            className="rounded-xl bg-blue-50 p-2.5 text-blue-700 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteNews(n.id)}
                            className="rounded-xl bg-rose-50 p-2.5 text-rose-700 transition hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-white/10">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ainda não existem notícias.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bolsas admin */}
              <div className="rounded-[28px] border border-gray-200 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Bolsas de Estudo
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Gerir oportunidades e respetivos detalhes.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setEditingScholarship({
                        id: "",
                        title: "",
                        provider: "",
                        country: "",
                        eligibility: [],
                        steps: [],
                        requirements: [],
                        specifications: [],
                        description: "",
                        link: "",
                        image: "",
                        openingDate: "",
                        deadline: "",
                        status: "Aberta",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Adicionar
                  </button>
                </div>

                {editingScholarship && (
                  <div className="mb-5 rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-900">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {editingScholarship.id ? "Editar bolsa" : "Nova bolsa"}
                      </h4>
                      <button
                        onClick={() => setEditingScholarship(null)}
                        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <Input
                        placeholder="Título"
                        value={editingScholarship.title}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            title: value,
                          })
                        }
                      />
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Input
                          placeholder="Fornecedor"
                          value={editingScholarship.provider}
                          onChange={(value) =>
                            setEditingScholarship({
                              ...editingScholarship,
                              provider: value,
                            })
                          }
                        />
                        <Input
                          placeholder="País"
                          value={editingScholarship.country}
                          onChange={(value) =>
                            setEditingScholarship({
                              ...editingScholarship,
                              country: value,
                            })
                          }
                        />
                      </div>
                      <Textarea
                        placeholder="Descrição"
                        value={editingScholarship.description || ""}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            description: value,
                          })
                        }
                      />
                      <Input
                        placeholder="Link"
                        value={editingScholarship.link || ""}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            link: value,
                          })
                        }
                      />
                      <Input
                        placeholder="Imagem URL"
                        value={editingScholarship.image || ""}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            image: value,
                          })
                        }
                      />
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Input
                          type="datetime-local"
                          placeholder="Data de Abertura"
                          value={toInputDateTime(editingScholarship.openingDate)}
                          onChange={(value) =>
                            setEditingScholarship({
                              ...editingScholarship,
                              openingDate: fromInputDateTime(value),
                            })
                          }
                        />
                        <Input
                          type="datetime-local"
                          placeholder="Data Limite"
                          value={toInputDateTime(editingScholarship.deadline)}
                          onChange={(value) =>
                            setEditingScholarship({
                              ...editingScholarship,
                              deadline: fromInputDateTime(value),
                            })
                          }
                        />
                      </div>
                      <Input
                        placeholder="Elegibilidade (separar por vírgula)"
                        value={joinCsv(editingScholarship.eligibility)}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            eligibility: splitCsv(value),
                          })
                        }
                      />
                      <Input
                        placeholder="Passos (separar por vírgula)"
                        value={joinCsv(editingScholarship.steps)}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            steps: splitCsv(value),
                          })
                        }
                      />
                      <Input
                        placeholder="Requisitos (separar por vírgula)"
                        value={joinCsv(editingScholarship.requirements)}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            requirements: splitCsv(value),
                          })
                        }
                      />
                      <Input
                        placeholder="Especificações (separar por vírgula)"
                        value={joinCsv(editingScholarship.specifications)}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            specifications: splitCsv(value),
                          })
                        }
                      />
                      <Select
                        value={editingScholarship.status}
                        onChange={(value) =>
                          setEditingScholarship({
                            ...editingScholarship,
                            status: value as StatusType,
                          })
                        }
                        options={statusOptions}
                      />
                    </div>

                    <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <button
                        onClick={() => setEditingScholarship(null)}
                        className="rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() =>
                          saveScholarship(
                            editingScholarship,
                            editingScholarship.id || undefined
                          )
                        }
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
                      >
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                        Guardar
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {scholarships.length > 0 ? (
                    scholarships.map((s) => (
                      <div
                        key={s.id}
                        className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-gray-900"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900 dark:text-white">
                            {s.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {s.country || "Sem país"} • {s.provider || "Sem fornecedor"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingScholarship(s)}
                            className="rounded-xl bg-blue-50 p-2.5 text-blue-700 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteScholarship(s.id)}
                            className="rounded-xl bg-rose-50 p-2.5 text-rose-700 transition hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-white/10">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ainda não existem bolsas.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PIN modal */}
        {showPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-md">
            <div className="w-full max-w-sm rounded-[32px] border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-gray-900 sm:p-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                Acesso Administrativo
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Introduz o PIN para abrir o painel de gestão.
              </p>

              <div className="mt-6">
                <input
                  type="password"
                  placeholder="Digite o PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePinSubmit();
                  }}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center text-lg tracking-[0.25em] text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
                />
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePinSubmit}
                  className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;