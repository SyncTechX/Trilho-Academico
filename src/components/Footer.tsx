import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const quickLinks = [
    { path: "/", label: "Início" },
    { path: "/escolher-teste", label: "Explorar" },
    { path: "/paralelas", label: "Paralelas" },
    { path: "/legal", label: "Documentação Legal" },
    { path: "/recursos", label: "Recursos" },
    { path: "/contact", label: "Contacto" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src="/logo-oficial.png" alt="logo" width={40} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trilho Académico
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Desenvolvido pela <b>SyncTechX</b>, o
              <span className="font-semibold text-cyan-600">Trilho Académico</span> foi criado para ajudar estudantes a explorar países, cursos e universidades,
              guiando-os em todas as etapas do processo de estudo no estrangeiro. O nosso objetivo é
              simplificar e modernizar a experiência de estudantes da diáspora através da
              tecnologia.
            </p>
          </div>

          {/* Ligações rápidas */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Navegação Rápida</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contactos e redes sociais */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Contactos</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>info@trilhoacademico.edu.mz</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-500" />
                <span>+258 84 752 9665</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>Maputo, Moçambique</span>
              </li>
            </ul>

            {/* Redes Sociais */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61574813828863"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/synctechx"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/synctechx.mz"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/synctechx/?viewAsMember=true"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Subscreve a Nossa Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Recebe atualizações sobre eventos, oportunidades, noticias e dicas para estudantes.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                type="email"
                placeholder="Insere o teu email"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium shadow hover:shadow-lg transition-all duration-200"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Trilho Académico. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Desenvolvido pela{" "}
            <a
              href="https://www.synctechx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-600 hover:underline"
            >
              SyncTechX
            </a>
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;