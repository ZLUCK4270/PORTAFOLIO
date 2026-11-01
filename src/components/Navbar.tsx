import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { accentTheme, wallpaperEnabled } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAccentColor = () => {
    if (accentTheme === 'crimson') return 'text-red-400';
    if (accentTheme === 'emerald') return 'text-emerald-400';
    return 'text-cyan-400';
  };

  const getHoverColor = () => {
    if (accentTheme === 'crimson') return 'hover:text-red-400';
    if (accentTheme === 'emerald') return 'hover:text-emerald-400';
    return 'hover:text-cyan-400';
  };

  const getButtonBg = () => {
    if (accentTheme === 'crimson') return 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 pulse-red-button';
    if (accentTheme === 'emerald') return 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25';
    return 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-500/25';
  };

  const getDotBg = () => {
    if (accentTheme === 'crimson') return 'bg-red-500';
    if (accentTheme === 'emerald') return 'bg-emerald-400';
    return 'bg-cyan-400';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080b11]/92 border-b border-slate-800/80 backdrop-blur-md shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element, no badges) */}
          <a
            href="#"
            className={`text-lg font-bold font-display tracking-tight text-white ${getHoverColor()} transition-colors whitespace-nowrap shrink-0 flex items-center gap-2`}
          >
            <span className={`w-2 h-2 rounded-xs ${getDotBg()} transition-colors`} />
            <span>Zenón Luciano Acuña</span>
          </a>

          {/* Zone 2: 4-5 Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#presentacion"
              className={`${getHoverColor()} transition-colors whitespace-nowrap shrink-0`}
            >
              Inicio
            </a>
            <a
              href="#trayectoria"
              className={`${getHoverColor()} transition-colors whitespace-nowrap shrink-0`}
            >
              Trayectoria
            </a>
            <a
              href="#habilidades"
              className={`${getHoverColor()} transition-colors whitespace-nowrap shrink-0`}
            >
              Habilidades
            </a>
            <a
              href="#proyectos"
              className={`${getHoverColor()} transition-colors whitespace-nowrap shrink-0`}
            >
              Proyectos IA
            </a>
            <a
              href="#contacto"
              className={`${getHoverColor()} transition-colors whitespace-nowrap shrink-0`}
            >
              Contacto
            </a>
          </nav>

          {/* Zone 3: 1 Primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#contacto"
              className={`px-4 py-2 text-xs font-semibold ${getButtonBg()} rounded-lg transition-all duration-200 shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer`}
            >
              <span>Conectar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-800 bg-[#0c101a] rounded-xl px-4 flex flex-col gap-3 text-sm">
            <a
              href="#presentacion"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getHoverColor()} transition-colors`}
            >
              Inicio
            </a>
            <a
              href="#trayectoria"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getHoverColor()} transition-colors`}
            >
              Trayectoria
            </a>
            <a
              href="#habilidades"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getHoverColor()} transition-colors`}
            >
              Habilidades
            </a>
            <a
              href="#proyectos"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getHoverColor()} transition-colors`}
            >
              Proyectos IA
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 text-slate-200 ${getHoverColor()} transition-colors`}
            >
              Contacto
            </a>
            <div className="pt-2 border-t border-slate-800">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-2 text-xs font-semibold ${getButtonBg()} rounded-lg block`}
              >
                Conectar
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
