import React, { useState, useEffect } from "react";
import { NavigationPage } from "../types";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Globe,
  BookOpen,
  FileText,
  Users,
  Newspaper,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Rocket,
  MapPin,
  Zap,
  AlertTriangle,
  // Gift
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

interface HomeProps {
  onNavigate: (page: NavigationPage) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [featuredScholarships, setFeaturedScholarships] = useState<any[]>([]);
  const [loadingScholarships, setLoadingScholarships] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "https://trilhoacademico.edu.mz/api"
          }/scholarships`
        );
        const data = await res.json();
        // Optional: filter to get only "Aberta" and limit to 5
        const featured = data
          .filter((s: any) => s.status === "Aberta")
          .slice(0, 5);
        setFeaturedScholarships(featured);
      } catch (err) {
        console.error("Erro ao carregar bolsas:", err);
      } finally {
        setLoadingScholarships(false);
      }
    };

    fetchScholarships();
  }, []);

  const features = [
    {
      img: <img src="/public/cards/course.png" alt="" />,
      title: "Seleciona o Curso Perfeito",
      description:
        "Ao completar o nosso teste vocacional, recebe sugestões de cursos que melhor se alinham consigo, com a sua personalidade e interesses.",
      route: "/explorar",
      color: "from-purple-500 to-pink-600",
      badge: "Educação",
    },
    {
      img: <img src="/public/cards/world.png" alt="" />,
      title: "Escolhe o País Ideal",
      description:
        "Com a nossa inteligência artificial, descobre qual o país (incluindo Moçambique), cidade e região que melhor se adapta aos teus sonhos e possibilidades.",
      route: "/escolher-teste",
      color: "from-cyan-500 to-blue-600",
      badge: "AI",
    },
    {
      img: <img src="/public/cards/documents.png" alt="" />,
      title: "Documentação e Vistos",
      description:
        "Recebe orientações passo a passo para preparar toda a documentação necessária, incluindo vistos de estudante.",
      route: "/legal",
      color: "from-green-500 to-emerald-600",
      badge: "Guias",
    },
    {
      img: <img src="/public/cards/financas.png" alt="" />,
      title: "Planeamento Financeiro",
      description:
        "Calcula custos de vida, propinas e encontra bolsas de estudo e oportunidades de financiamento para identificar o melhor plano para si.",
      route: "/financeiro",
      color: "from-orange-500 to-red-600",
      badge: "Finanças",
    },
    {
      img: <img src="/public/cards/comunity.png" alt="" />,
      title: "Comunidade de Estudantes",
      description:
        "Liga-te a outros estudantes moçambicanos que já estão a estudar no estrangeiro e aprende com a experiência deles.",
      route: "/community",
      color: "from-indigo-500 to-purple-600",
      badge: "Rede",
    },
    {
      img: <img src="/public/cards/suport.png" alt="" />,
      title: "Suporte Personalizado",
      description:
        "Aproveite o apoio das comunidades e associações de estudantes em diferentes países, que querem orientar-te em todas as etapas.",
      route: "/contact",
      color: "from-teal-500 to-cyan-600",
      badge: "Mentoria",
    },
  ];

  const stats = [
    {
      label: "Países Disponíveis",
      value: 10,
      suffix: "+",
      icon: Globe,
      color: "text-cyan-600",
    },
    {
      label: "Estudantes Ajudados",
      value: 32,
      suffix: "+",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Testes Realizados",
      value: 40,
      suffix: "+",
      icon: Newspaper,
      color: "text-green-600",
    },
  ];

  const associations = [
    {
      src: "/partners/amecc.webp",
      alt: "AMECC",
      description:
        "Associação de Estudantes Moçambicanos na Cidade do Cabo.",
    },
    {
      src: "/partners/india.png",
      alt: "APU Moz Community",
      description:
        "Uma communidade juvenil de estudantes na Asia Pacific University.",
    },
    {
      src: "/partners/coimbra.png",
      alt: "AEMOPCoimbra",
      description:
        "Associação dos Estudantes Moçambicanos em Portugal - Coimbra.",
    },
    {
      src: "/partners/lisboa.png",
      alt: "AEMOP-NL",
      description:
        "Associação dos Estudantes Moçambicanos em Portugal - Núcleo de Lisboa.",
    },
    {
      src: "/partners/porto.png",
      alt: "AEMOPorto",
      description: "Associação dos Estudantes Moçambicanos no Porto, Portugal.",
    },
    {
      src: "/partners/mz-india.png",
      alt: "India",
      description: "Associação dos Estudantes Moçambicanos na India.",
    },
    {
      src: "/partners/mz-cp.png",
      alt: "Chipre",
      description: "Associação dos Estudantes Moçambicanos no Chipre.",
    },
  ];

  const partners = [
    {
      src: "/partners/kinesis.png",
      alt: "KinesisMz",
    },
    {
      src: "/partners/jeffito.webp",
      alt: "Jeffito",
    },
    {
      src: "/partners/chairman.png",
      alt: "ChairmanMediaHouse",
    },
    {
      src: "/partners/jeffito.webp",
      alt: "Jeffito",
    },
    {
      src: "/partners/kinesis.png",
      alt: "KinesisMz",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-200">
      <div className=" relative overflow-hidden bg-gradient-to-r from-[#000205] to-[#5638A2]  md:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto md:mx-0  px-6  sm:px-6 lg:px-8 pt-16 pb-24 text-left text-white ">
          <div className="flex flex-col gap-6  md:max-w-[580px]">
            <h1 className="text-4xl md:text-6xl font-bold  leading-tight">
              Há quem siga mapas. Tu vais seguir um trilho.
            </h1>

            <p className="text-lg md:text-xm text-gray-200 max-w-3xl mx-auto md:mx-0 md:mb-0 md:text-left  leading-relaxed">
              Com o{" "}
              <span className="font-semibold text-white">Trilho Académico</span>
              , cada passo aproxima-te do curso certo, da universidade certa e,
              quem sabe, da vida certa...
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full">
              <Link to="/escolher-teste" className="">
                <button className=" bg-gradient-to-r from-[#0075FE] to-[#4E3EAB]  text-white px-8 md:px-0 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-[#0075FE] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-transparent [border-image:linear-gradient(to_right,#21C45B,#2384FA)_1] md:min-w-[560px] w-full ">
                  <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Começar agora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
          <div className=" hidden md:block">

            <img src="/public/logo-oficial.png" alt="hero logo" width={349} className="hidden md:block" />
          </div>
        </div>
      </div>

      <div className="bg-[#221643] dark:bg-[#221643] py-16 border-y border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>

                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {stat.suffix}
                  </div>

                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className=" flex flex-col items-center py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className=" text-center mb-16 lg:mx-60">


            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center dark:text-white mb-4">
              O Trilho Académico guia-te pelo labirinto académico

            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Descobre o curso que combina contigo, a universidade que te acolhe e até a bolsa que te abre portas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const img = feature.img;
              return (

                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800  px-4 py-4 shadow-sm shadow-[#0075FE] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointe dark:border-gray-700 relative overflow-hidden border-2 border-transparent [border-image:linear-gradient(to_right,#2384FA,#21C45B)_1]"

                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>
                  <div className="flex  justify-end py-2">
                    <span className="px-3 py-1  text-[#22944B] dark:text-[#22944B]0 r text-xs font-semibold">
                      {feature.badge}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4  items-center">
                    <div className=' bg-cover overflow-hidden w[328px] h-[185px]'>
                      {img}
                    </div>


                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white  group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed ">
                        {feature.description}
                      </p>
                      <div className="flex items-center py-2 text-cyan-600 dark:text-cyan-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>Ver mais</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                </div>


              );
            })}
          </div>
        </div>
        <Link to="/escolher-teste" className="py-6">
          <button className=" bg-gradient-to-r from-[#0075FE] to-[#4E3EAB]  text-white px-8 md:px-0 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-[#0075FE] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-transparent [border-image:linear-gradient(to_right,#21C45B,#2384FA)_1] md:min-w-[560px] w-full ">

            <span>Descobrir o meu Trilho</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

      </div>
      <div className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tudo o que precisas de saber antes de começares a tua jornada
              académica internacional.
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
              >
                <span>O que é a plataforma Trilho Académico?</span>
                <span
                  className={`transform transition-transform ${openFAQ === 1 ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>
              </button>
              {openFAQ === 1 && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  O Trilho Académico é uma plataforma desenvolvida para guiar
                  estudantes moçambicanos que desejam estudar no estrangeiro.
                  Ajudamos-te a escolher o país, curso e universidade ideais,
                  além de fornecer suporte durante todo o processo.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
              >
                <span>Como funciona o teste de orientação vocacional?</span>
                <span
                  className={`transform transition-transform ${openFAQ === 2 ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>
              </button>
              {openFAQ === 2 && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  O teste de orientação vocacional analisa as tuas preferências,
                  habilidades e objetivos académicos, sugerindo cursos e países
                  que se alinham ao teu perfil e sonhos.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
              >
                <span>Quais são os custos envolvidos?</span>
                <span
                  className={`transform transition-transform ${openFAQ === 3 ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>
              </button>
              {openFAQ === 3 && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  A plataforma Trilho Académico cobra 50MZN por teste normal e
                  200MZN pelo teste vocacional. No entanto, existem custos
                  associados à candidatura em universidades, emissão de vistos,
                  viagens e acomodação, que variam conforme o país escolhido.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
              >
                <span>A vossa esquipe está pronta para ajudar?</span>
                <span
                  className={`transform transition-transform ${openFAQ === 4 ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>
              </button>
              {openFAQ === 4 && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  Sim! Alguém da nossa equipa está pronto para te ajudar com
                  qualquer dúvida, e pode contactar diretamente diferentes
                  associações e comunidades estudantis de diferentes países.
                  Estamos aqui para ajudar!
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
              >
                <span>
                  Como fazer para fazer parte da equipa do Trilho Académico?
                </span>
                <span
                  className={`transform transition-transform ${openFAQ === 5 ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>
              </button>
              {openFAQ === 5 && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  Bem, somos uma equipa jovem e estamos mais do que felizes por
                  receber ajuda extra. Envie-nos uma mensagem com as suas
                  competências e como pode contribuir para o nosso projeto.
                  Estamos à espera!
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20">
              <h4 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 tracking-wide">
                Associações Estudantis
              </h4>

              <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="pb-10"
              >
                {associations.map((assoc, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center w-full">
                      <div className="p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-sm transform hover:-translate-y-1 hover:scale-105">
                        <img
                          src={assoc.src}
                          alt={assoc.alt}
                          className="h-20 mx-auto mb-4 object-contain rounded-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                          {assoc.alt}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                          {assoc.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <h4 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 tracking-wide mt-20">
                Parceiros
              </h4>

              <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
                }}
                className="pb-10"
              >
                {partners.map((partner, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative group w-full max-w-[180px] mx-auto p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-100 dark:border-gray-700">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-400/20 via-orange-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-pulse"></div>

                      <div className="relative z-10 flex items-center justify-center">
                        <img
                          src={partner.src}
                          alt={partner.alt}
                          className="h-16 object-contain grayscale group-hover:grayscale-0 transition duration-300 transform group-hover:scale-110"
                        />
                      </div>

                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-xs text-gray-700 dark:text-gray-300 font-medium transition-all duration-300">
                        {partner.alt}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;