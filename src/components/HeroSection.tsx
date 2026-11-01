import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas.tsx';
import { ArrowRight, Mail, Github, Linkedin, Shield, Sparkles, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { ScrollReveal } from './ScrollReveal.tsx';

export const HeroSection: React.FC = () => {
  const { accentTheme, wallpaperEnabled } = useTheme();

  const getAccentText = () => {
    if (accentTheme === 'crimson') return 'text-red-400';
    if (accentTheme === 'emerald') return 'text-emerald-400';
    return 'text-cyan-400';
  };

  const getGradientTitle = () => {
    if (accentTheme === 'crimson') {
      return 'from-red-500 via-rose-400 to-amber-300';
    }
    if (accentTheme === 'emerald') {
      return 'from-emerald-400 via-teal-300 to-cyan-300';
    }
    return 'from-cyan-400 via-sky-300 to-indigo-400';
  };

  const getPrimaryBtn = () => {
    if (accentTheme === 'crimson') {
      return 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 hover:shadow-red-600/50 pulse-red-button';
    }
    if (accentTheme === 'emerald') {
      return 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25';
    }
    return 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-400/25';
  };

  return (
    <section id="presentacion" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle ambient background glow */}
      {accentTheme === 'crimson' ? (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Split: Typographic Column + 3D Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic & Profile Info with gentle slide-in and fade-up */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal direction="up" distance={28} duration={0.7} delay={0.1}>
              {/* Clean unboxed metadata lead (No pill badges) */}
              <div className={`flex items-center gap-2 text-xs font-mono ${getAccentText()} mb-4 tracking-wider uppercase`}>
                <span>SENATI</span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span>5to Ciclo</span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="text-slate-300">Ingeniería de Software con IA</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-display font-extrabold tracking-tight text-white mb-5 text-balance leading-[1.12]">
                Zenón Luciano <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getGradientTitle()}`}>
                  Acuña Chuquihuanca
                </span>
              </h1>

              {/* Professional Subtitle */}
              <h2 className={`text-base sm:text-lg font-medium ${accentTheme === 'crimson' ? 'text-rose-200/95' : 'text-cyan-300/90'} mb-4`}>
                Estudiante de Quinto Ciclo de Ingeniería de Software con Inteligencia Artificial en SENATI.
              </h2>

              {/* Profile Description */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-8 max-w-xl">
                Apasionado por el desarrollo de software, la inteligencia artificial, la arquitectura de sistemas y la creación de soluciones inteligentes innovadoras. En constante aprendizaje y evolución hacia la programación autónoma y el dominio de algoritmos desde sus cimientos.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <a
                  href="#habilidades"
                  className={`px-5 py-2.5 text-xs font-semibold ${getPrimaryBtn()} rounded-lg transition-all shadow-lg flex items-center gap-2 cursor-pointer`}
                >
                  <span>Explorar Stack & IA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#trayectoria"
                  className="px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                >
                  <span>Ver Trayectoria</span>
                </a>
                <a
                  href="#contacto"
                  className={`px-4 py-2.5 text-xs font-mono ${getAccentText()} hover:opacity-80 transition-colors flex items-center gap-1.5`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>luciano37017@gmail.com</span>
                </a>
              </div>

              {/* Quick Social & Connect Links */}
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="font-mono text-[11px] text-slate-500">Perfiles:</span>
                <a
                  href="https://github.com/ZLUCK4270"
                  target="_blank"
                  rel="noreferrer"
                  className={`hover:${getAccentText()} transition-colors flex items-center gap-1.5`}
                  title="GitHub @ZLUCK4270"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <span className="text-slate-700">·</span>
                <a
                  href="https://www.linkedin.com/in/lucianoac25"
                  target="_blank"
                  rel="noreferrer"
                  className={`hover:${getAccentText()} transition-colors flex items-center gap-1.5`}
                  title="LinkedIn @lucianoac25"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive 3D Canvas with gentle reveal */}
          <div className="lg:col-span-6 w-full h-[460px] sm:h-[520px] lg:h-[560px]">
            <ScrollReveal direction="left" distance={30} duration={0.8} delay={0.2} className="w-full h-full">
              <Hero3DCanvas />
            </ScrollReveal>
          </div>
        </div>

        {/* Full-width highlights strip below the hero split with fade-up */}
        <ScrollReveal direction="up" distance={20} duration={0.65} delay={0.25} className="mt-14">
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#0c101c]/55 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex flex-col">
              <span className={`text-2xl font-bold font-mono ${getAccentText()} tabular-nums`}>5to Ciclo</span>
              <span className="text-xs text-slate-400 mt-1">SENATI · Especialidad de Software & IA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">40+ Techs</span>
              <span className="text-xs text-slate-400 mt-1">Python, PyTorch, YOLO, TypeScript, Docker</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold font-mono ${accentTheme === 'crimson' ? 'text-rose-400' : 'text-indigo-400'} tabular-nums`}>
                Deep Learning & NLP
              </span>
              <span className="text-xs text-slate-400 mt-1">PyTorch, Transformers, YOLO, Qdrant Vectorial</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold font-mono ${accentTheme === 'crimson' ? 'text-amber-400' : 'text-purple-400'} tabular-nums`}>
                Cisco & Red Hat
              </span>
              <span className="text-xs text-slate-400 mt-1">Certificaciones en Redes, Linux & Ciberseguridad</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
