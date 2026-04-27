import {useState, useRef} from "react"; //useffect
import {Link, useLocation} from "react-router-dom";
import {useTheme} from "../contexts/ThemeContext";
import {
  Menu,
  X,
  Moon,
  Sun,

} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  const navItems = [
    {path: "/", label: "Início"},
    {path: "/escolher-teste", label: "Orientação"},
    {path: "/Paralelas", label: "Acomodação"},
    {path: "/legal", label: "Requisitos"},
    {path: "/recursos", label: "Bolsas de Estudo"},
    {path: "/contact", label: "Contacto"},
  ];

  return (
    <>
      <audio ref={audioRef} src="/helio.mp3" loop />

      {/* NAVBAR */}
      <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img src="/public/logo-oficial.png" alt="logo" width={35} />
              </div>
              <div>
                <span className="text-xl font-bold text-blue-600">
                  Trilho Académico
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  De moçambique para o mundo
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(({path, label}) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === path
                      ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/25"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="hidden xl:block">{label}</span>
                </Link>
              ))}
            </div>

            {/* Theme + Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              {navItems.map(({path, label}) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === path
                      ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Donation Modal (now below navbar) */}
      {isModalOpen && (
        <div className="w-full flex justify-center bg-gray-100 dark:bg-gray-900 py-10 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-white dark:bg-gray-800 w-11/12 md:w-3/4 lg:w-2/3 rounded-2xl shadow-lg relative overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;