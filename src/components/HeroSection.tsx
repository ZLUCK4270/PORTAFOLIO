import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas.tsx';
import { ArrowRight, Mail, Github, Linkedin, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { ScrollReveal, MotionCard, StaggerContainer, StaggerItem } from './ScrollReveal.tsx';

export const HeroSection: React.FC = () => {
  const { accentTheme } = useTheme();

  const getAccentText = () => {
    if (accentTheme === 'emerald') return 'text-emerald-400';
    if (accentTheme === 'cyan') return 'text-cyan-400';
    return 'text-blue-400';
  };

  const getGradientTitle = () => {
    if (accentTheme === 'emerald') {
      return 'from-emerald-400 via-teal-300 to-cyan-300';
    }
    if (accentTheme === 'cyan') {
      return 'from-cyan-400 via-sky-300 to-indigo-400';
    }
    return 'from-blue-400 via-indigo-300 to-sky-300';
  };

  const getPrimaryBtn = () => {
    if (accentTheme === 'emerald') {
      return 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40';
    }
    if (accentTheme === 'cyan') {
      return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-950/40';
    }
    return 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/40';
  };

  return (
    <section id="presentacion" className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Split: Typographic Column + 3D Interactive Architecture Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic & Profile Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal direction="up" distance={20} duration={0.65} delay={0.05}>
              {/* Clean unboxed metadata lead (Zero-pill discipline) */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4 tracking-wider uppercase">
                <span className={getAccentText()}>SENATI</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300">Quinto Ciclo</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Ingeniería de Software con IA</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-display font-extrabold tracking-tight text-white mb-4 text-balance leading-[1.14]">
                Zenón Luciano <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getGradientTitle()}`}>
                  Acuña Chuquihuanca
                </span>
              </h1>

              {/* Professional Subtitle */}
              <h2 className="text-base sm:text-lg font-medium text-slate-300 mb-4 text-balance">
                Estudiante de Quinto Ciclo en SENATI especializado en Arquitectura de Software, Visión Artificial y Sistemas de Inteligencia Artificial.
              </h2>

              {/* Profile Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-7 max-w-xl">
                Enfocado en el diseño de microservicios robustos, pipelines de inferencia en tiempo real (YOLO, OpenCV), bases vectoriales para sistemas RAG y desarrollo full-stack. Con una sólida filosofía de comprensión algorítmica desde los fundamentos y compromiso con la calidad en producción.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a
                  href="#proyectos"
                  className={`px-5 py-2.5 text-xs font-semibold ${getPrimaryBtn()} rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <span>Explorar Proyectos IA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#certificados"
                  className="px-4 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ver Certificaciones</span>
                </a>

                <a
                  href="#contacto"
                  className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Contacto Directo</span>
                </a>
              </div>

              {/* Verified Contact & Profiles */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 pt-5 border-t border-slate-800/80">
                <a
                  href="mailto:luciano37017@gmail.com"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-mono text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>luciano37017@gmail.com</span>
                </a>
                <span className="text-slate-700 hidden sm:inline">·</span>
                <a
                  href="https://github.com/ZLUCK4270"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <span className="text-slate-700 hidden sm:inline">·</span>
                <a
                  href="https://www.linkedin.com/in/lucianoac25"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-6 w-full h-[450px] sm:h-[500px] lg:h-[540px]">
            <ScrollReveal direction="left" distance={24} duration={0.7} delay={0.15} className="w-full h-full">
              <Hero3DCanvas />
            </ScrollReveal>
          </div>
        </div>

        {/* Highlights strip below the hero split with interactive cards and staggered entry */}
        <div className="mt-12">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
            <StaggerItem>
              <MotionCard
                hoverY={-3}
                className="flex flex-col p-5 rounded-2xl bg-[#0c1220]/80 backdrop-blur-md border border-slate-800/80 shadow-md hover:border-slate-700 h-full"
              >
                <span className={`text-2xl font-bold font-mono ${getAccentText()} tabular-nums`}>5to Ciclo</span>
                <span className="text-xs text-slate-300 font-medium mt-1">SENATI · Formación Técnica</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Ingeniería de Software con IA</span>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard
                hoverY={-3}
                className="flex flex-col p-5 rounded-2xl bg-[#0c1220]/80 backdrop-blur-md border border-slate-800/80 shadow-md hover:border-slate-700 h-full"
              >
                <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">40+ Techs</span>
                <span className="text-xs text-slate-300 font-medium mt-1">Stack Tecnológico</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Python, PyTorch, YOLO, TypeScript, Docker</span>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard
                hoverY={-3}
                className="flex flex-col p-5 rounded-2xl bg-[#0c1220]/80 backdrop-blur-md border border-slate-800/80 shadow-md hover:border-slate-700 h-full"
              >
                <span className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">Vision & DL</span>
                <span className="text-xs text-slate-300 font-medium mt-1">Inferencia en Tiempo Real</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Pipelines a 45+ FPS & RAG Vectorial</span>
              </MotionCard>
            </StaggerItem>

            <StaggerItem>
              <MotionCard
                hoverY={-3}
                className="flex flex-col p-5 rounded-2xl bg-[#0c1220]/80 backdrop-blur-md border border-slate-800/80 shadow-md hover:border-slate-700 h-full"
              >
                <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">Cisco & Red Hat</span>
                <span className="text-xs text-slate-300 font-medium mt-1">Certificaciones Oficiales</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Redes, Linux Enterprise & Seguridad</span>
              </MotionCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
