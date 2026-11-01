import React, { useState } from 'react';
import { AI_PROJECTS_DATA, AIProjectItem } from '../data/portfolioData.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { Eye, Database, Cpu, Layers, ExternalLink, Code2, CheckCircle2, X, Terminal, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal.tsx';

export const ProjectsSection: React.FC = () => {
  const { accentTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<AIProjectItem | null>(null);

  const isCrimson = accentTheme === 'crimson';
  const textAccent = isCrimson ? 'text-red-400' : 'text-cyan-400';
  const borderHover = isCrimson
    ? 'hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]'
    : 'hover:border-cyan-500/50 hover:shadow-cyan-500/5';
  const badgeAccent = isCrimson
    ? 'text-red-300 border-red-500/50 bg-red-950/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
    : 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10';
  const buttonPrimary = isCrimson
    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] pulse-red-button'
    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900';

  const renderProjectIcon = (icon: string) => {
    switch (icon) {
      case 'eye':
        return <Eye className={`w-5 h-5 ${textAccent}`} />;
      case 'database':
        return <Database className={`w-5 h-5 ${textAccent}`} />;
      case 'cpu':
        return <Cpu className={`w-5 h-5 ${textAccent}`} />;
      case 'layers':
      default:
        return <Layers className={`w-5 h-5 ${textAccent}`} />;
    }
  };

  return (
    <section id="proyectos" className="py-20 lg:py-28 relative bg-[#060407] border-t border-red-950/40 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-700/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Fade-up */}
        <ScrollReveal direction="up" distance={24} duration={0.65} className="mb-14">
          <div className={`text-xs font-mono ${textAccent} mb-2 uppercase tracking-wider`}>
            Desarrollo Aplicado & Soluciones
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Proyectos de Ingeniería de Software con IA
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
            Arquitecturas completas orientadas al impacto real: visión artificial de alto rendimiento, motores vectoriales RAG, modelos de lenguaje (NLP) y pipelines de deep learning.
          </p>
        </ScrollReveal>

        {/* 4 Professional AI Project Cards in Bento Grid with Staggered Fade-up and Living Red Pulse */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {AI_PROJECTS_DATA.map((project, idx) => (
            <StaggerItem key={project.id} className="h-full">
              <div
                onClick={() => setSelectedProject(project)}
                className={`group relative p-6 sm:p-7 rounded-3xl border border-red-950/60 bg-gradient-to-b from-[#12070a]/90 via-[#0a0507]/90 to-[#050305]/95 backdrop-blur-md hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:bg-[#17080d]/95 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl shadow-black/60 hover:-translate-y-1 h-full overflow-hidden pulse-red-card pulse-delay-${idx % 4}`}
              >
                {/* Cyber red relief top micro-glow with rhythmic breathing pulse */}
                <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/40 group-hover:via-red-500/90 to-transparent transition-all duration-300 pulse-red-relief pulse-delay-${idx % 4}`} />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md backdrop-blur-xs border ${badgeAccent}`}>
                      {project.category}
                    </span>
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-950/60 to-black/80 backdrop-blur-xs border border-red-500/30 group-hover:border-red-400/60 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all shadow-inner">
                      {renderProjectIcon(project.icon)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-red-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {project.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technical Metrics Strip with Frosted Glass */}
                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-950/50 backdrop-blur-sm border border-white/8 mb-6 shadow-inner">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">{metric.label}</div>
                        <div className={`text-xs font-mono font-bold mt-0.5 ${textAccent}`}>
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/8 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900/60 backdrop-blur-xs text-slate-300 border border-white/8"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className={`text-xs font-mono flex items-center gap-1 ${textAccent} group-hover:translate-x-1 transition-transform`}>
                      <span>Ver Detalles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Detailed Modal for Project Breakdown with Frosted Glassmorphism in Crimson & Obsidian */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0e0508]/95 backdrop-blur-2xl border border-red-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.25)] relative max-h-[90vh] overflow-y-auto shadow-black/90">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-red-950/50 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-red-950/60 to-black/80 backdrop-blur-xs border border-red-500/30 shadow-inner">
                  {renderProjectIcon(selectedProject.icon)}
                </div>
                <div>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md backdrop-blur-xs border ${badgeAccent}`}>
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-5 text-sm text-slate-300">
                <div>
                  <h4 className={`text-xs font-mono ${textAccent} uppercase mb-1`}>
                    Alcance del Proyecto & Solución
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className={`text-xs font-mono ${textAccent} uppercase mb-1`}>
                    Arquitectura Técnica & Flujo de Datos
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-200 leading-relaxed shadow-inner">
                    {selectedProject.architecture}
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <h4 className={`text-xs font-mono ${textAccent} uppercase mb-2`}>
                    Métricas de Eficiencia & Rendimiento
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/8 text-center shadow-inner">
                        <div className="text-[11px] font-mono text-slate-400">{m.label}</div>
                        <div className={`text-sm font-bold font-mono mt-0.5 ${textAccent}`}>
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className={`text-xs font-mono ${textAccent} uppercase mb-2`}>
                    Stack y Librerías Implementadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-xs text-slate-200 border border-white/10 shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Desarrollado por Zenón Luciano Acuña · SENATI
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${buttonPrimary}`}
                >
                  Cerrar Ficha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
