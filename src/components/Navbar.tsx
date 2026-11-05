import React, { useState, useEffect } from 'react';
import { Menu, X, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { accentTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAccentHover = () => {
    if (accentTheme === 'emerald') return 'hover:text-emerald-400';
    if (accentTheme === 'cyan') return 'hover:text-cyan-400';
    return 'hover:text-blue-400';
  };

  const getPrimaryButton = () => {
    if (accentTheme === 'emerald') {
      return 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40';
    }
    if (accentTheme === 'cyan') {
      return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-950/40';
    }
    return 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/40';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 print:hidden ${
        isScrolled
          ? 'bg-[#080b12]/92 border-b border-slate-800/90 backdrop-blur-md shadow-xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#"
            className={`text-lg font-bold font-display tracking-tight text-white ${getAccentHover()} transition-colors whitespace-nowrap shrink-0 flex items-center gap-2`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Zenón Luciano Acuña</span>
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#presentacion"
              className={`${getAccentHover()} transition-colors whitespace-nowrap shrink-0`}
            >
              Inicio
            </a>
            <a
              href="#trayectoria"
              className={`${getAccentHover()} transition-colors whitespace-nowrap shrink-0`}
            >
              Certificaciones & Trayectoria
            </a>
            <a
              href="#habilidades"
              className={`${getAccentHover()} transition-colors whitespace-nowrap shrink-0`}
            >
              Habilidades
            </a>
            <a
              href="#proyectos"
              className={`${getAccentHover()} transition-colors whitespace-nowrap shrink-0`}
            >
              Proyectos IA
            </a>
            <a
              href="#contacto"
              className={`${getAccentHover()} transition-colors whitespace-nowrap shrink-0`}
            >
              Contacto
            </a>
          </nav>

          {/* Zone 3: 1 Primary action */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contacto"
              className={`px-4 py-2 text-xs font-semibold ${getPrimaryButton()} rounded-lg transition-all shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contactar</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="#contacto"
              className="px-2.5 py-1 text-[11px] font-semibold bg-blue-600 text-white rounded-md flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Contacto</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-800 bg-[#0e1424] rounded-xl px-4 flex flex-col gap-3 text-sm shadow-2xl">
            <a
              href="#presentacion"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getAccentHover()} transition-colors`}
            >
              Inicio
            </a>
            <a
              href="#trayectoria"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getAccentHover()} transition-colors`}
            >
              Certificaciones & Trayectoria
            </a>
            <a
              href="#habilidades"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getAccentHover()} transition-colors`}
            >
              Habilidades
            </a>
            <a
              href="#proyectos"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getAccentHover()} transition-colors`}
            >
              Proyectos IA
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getAccentHover()} transition-colors`}
            >
              Contacto
            </a>
            <div className="pt-2 border-t border-slate-800">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-2 text-xs font-semibold ${getPrimaryButton()} rounded-lg flex items-center justify-center gap-1.5`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Iniciar Contacto Directo</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
