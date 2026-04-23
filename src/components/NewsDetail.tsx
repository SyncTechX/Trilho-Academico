import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  Globe,
  Loader2,
  X,
  Newspaper,
  Sparkles,
  Clock3,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type NewsItem = {
  id?: string;
  title?: string;
  country?: string;
  date?: string;
  source?: string;
  image?: string;
  status?: "Aberta" | "Fechada" | "Cancelada" | string;
  excerpt?: string;
  description?: string;
  link?: string;
};

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setNews(items.find((n: NewsItem) => n.id === id) || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!news?.date) return null;
    const parsed = new Date(news.date);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, [news?.date]);

  const statusStyles = useMemo(() => {
    switch (news?.status) {
      case "Aberta":
        return "bg-emerald-100/90 text-emerald-800";
      case "Fechada":
        return "bg-rose-100/90 text-rose-700";
      case "Cancelada":
        return "bg-gray-200/90 text-gray-700";
      default:
        return "bg-white/90 text-gray-800";
    }
  }, [news?.status]);

  const handleCloseModal = () => {
    setShowModal(false);
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
      setRedirectUrl(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
        <div className="rounded-[2rem] border border-gray-200/70 bg-white/90 dark:bg-gray-900/80 dark:border-white/10 px-8 py-10 shadow-xl backdrop-blur-xl text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600 dark:text-cyan-400" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            A carregar notícia...
          </p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-[2rem] border border-gray-200/70 bg-white/90 dark:bg-gray-900/80 dark:border-white/10 p-8 shadow-xl backdrop-blur-xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/10">
            <Newspaper className="w-7 h-7 text-gray-500 dark:text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notícia não encontrada
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-7">
            Não foi possível localizar esta notícia. Ela pode ter sido removida
            ou o link já não está disponível.
          </p>
          <Link
            to="/recursos"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos recursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-70px] top-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[-40px] top-28 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-500/10" />
      </div>

      <div className="max-w-5xl mx-auto">
        <Link
          to="/recursos"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 mb-6 text-sm font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos recursos
        </Link>

        <article className="overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/90 dark:bg-gray-900/80 dark:border-white/10 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          {/* Hero */}
          <div className="relative">
            {news.image ? (
              <img
                src={news.image}
                alt={news.title || "Notícia"}
                className="w-full h-64 sm:h-80 lg:h-[27rem] object-cover"
              />
            ) : (
              <div className="w-full h-64 sm:h-80 lg:h-[27rem] bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-indigo-500/10 flex items-center justify-center">
                <Sparkles className="w-14 h-14 text-blue-500/70 dark:text-cyan-400/70" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 flex flex-wrap gap-2">
              {news.status && (
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-sm ${statusStyles}`}
                >
                  {news.status}
                </span>
              )}

              {news.country && (
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold bg-white/90 text-gray-800 shadow-sm backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  {news.country}
                </span>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8">
              <div className="max-w-4xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  <Newspaper className="w-4 h-4" />
                  Notícia em destaque
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                  {news.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 lg:p-10">
            {/* Meta blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              {news.country && (
                <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    Localização
                  </div>
                  <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {news.country}
                  </p>
                </div>
              )}

              {formattedDate && (
                <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Data
                  </div>
                  <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {formattedDate}
                  </p>
                </div>
              )}

              {news.source && (
                <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                    <Globe className="w-4 h-4" />
                    Fonte
                  </div>
                  <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {news.source}
                  </p>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {news.excerpt && (
              <section className="mb-8">
                <div className="rounded-[1.75rem] border border-blue-100 dark:border-cyan-500/10 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/5 p-5 sm:p-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-cyan-300">
                    <Clock3 className="w-3.5 h-3.5" />
                    Resumo rápido
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-8">
                    {news.excerpt}
                  </p>
                </div>
              </section>
            )}

            {/* Description */}
            {news.description && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Descrição completa
                  </h2>
                </div>

                <div className="rounded-[1.75rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 sm:p-6 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 leading-8 whitespace-pre-line">
                    {news.description}
                  </p>
                </div>
              </section>
            )}

            {/* CTA */}
            {news.link && (
              <div className="mt-8 rounded-[1.75rem] border border-blue-100 dark:border-cyan-500/10 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/5 p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-cyan-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Aceder à fonte
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Queres ler a notícia completa?
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-7">
                      Continua para a fonte original e consulta o conteúdo completo.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setRedirectUrl(news.link || null);
                      setShowModal(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ler notícia completa
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] w-full max-w-5xl h-[82vh] shadow-2xl overflow-hidden animate-in fade-in duration-200 border border-gray-200 dark:border-white/10">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 transition"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <iframe
              src="https://refres.co/trilho.academico"
              className="w-full h-full"
              title="Candidatura Trilho Académico"
            />
          </div>
        </div>
      )}
    </div>
  );
}