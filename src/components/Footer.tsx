import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050306] border-t border-red-950/40 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-sm font-bold font-display text-white">
              Zenón Luciano Acuña Chuquihuanca
            </span>
            <span className="text-xs text-slate-500 mt-1">
              Ingeniería de Software con Inteligencia Artificial · SENATI
            </span>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#presentacion" className="hover:text-red-400 transition-colors">
              Inicio
            </a>
            <a href="#trayectoria" className="hover:text-red-400 transition-colors">
              Trayectoria
            </a>
            <a href="#habilidades" className="hover:text-red-400 transition-colors">
              Habilidades
            </a>
            <a href="#proyectos" className="hover:text-red-400 transition-colors">
              Proyectos IA
            </a>
            <a href="#contacto" className="hover:text-red-400 transition-colors">
              Contacto
            </a>
          </div>

          {/* Social Links & Back to top button */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ZLUCK4270"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#0d070a] hover:bg-[#18090f] text-slate-400 hover:text-red-400 transition-colors cursor-pointer border border-red-950/60"
              title="GitHub: ZLUCK4270"
              aria-label="Perfil de GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/lucianoac25"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#0d070a] hover:bg-[#18090f] text-slate-400 hover:text-red-400 transition-colors cursor-pointer border border-red-950/60"
              title="LinkedIn: lucianoac25"
              aria-label="Conexión LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 px-3 rounded-lg bg-[#0d070a] hover:bg-[#18090f] text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer border border-red-950/60 ml-1"
              aria-label="Volver arriba"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <div>
            © {new Date().getFullYear()} Zenón Luciano Acuña Chuquihuanca. Todos los derechos reservados.
          </div>
          <div className="font-mono text-slate-500">
            Desarrollado con Three.js, React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
