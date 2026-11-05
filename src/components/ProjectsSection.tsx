import React, { useState } from 'react';
import { AI_PROJECTS_DATA, AIProjectItem } from '../data/portfolioData.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { Eye, Database, Cpu, Layers, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem, MotionCard } from './ScrollReveal.tsx';

export const ProjectsSection: React.FC = () => {
  const { accentTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<AIProjectItem | null>(null);

  const getAccentText = () => {
    if (accentTheme === 'emerald') return 'text-emerald-400';
    if (accentTheme === 'cyan') return 'text-cyan-400';
    return 'text-blue-400';
  };

  const getPrimaryButton = () => {
    if (accentTheme === 'emerald') return 'bg-emerald-600 hover:bg-emerald-500 text-white';
    if (accentTheme === 'cyan') return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950';
    return 'bg-blue-600 hover:bg-blue-500 text-white';
  };

  const renderProjectIcon = (icon: string) => {
    switch (icon) {
      case 'eye':
        return <Eye className="w-5 h-5 text-blue-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'layers':
      default:
        return <Layers className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <section id="proyectos" className="py-20 lg:py-24 relative bg-[#080c16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} duration={0.65} className="mb-12">
          <div className={`text-xs font-mono ${getAccentText()} mb-2 uppercase tracking-wider`}>
            Desarrollo Aplicado & Soluciones de Producción
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Proyectos de Ingeniería de Software con IA
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Casos de estudio técnicos orientados al rendimiento real: visión artificial acelerada por hardware, búsqueda semántica vectorial (RAG), inferencia en FastAPI y microservicios.
          </p>
        </ScrollReveal>

        {/* 4 Professional AI Project Cards in Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
          {AI_PROJECTS_DATA.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <MotionCard
                hoverY={-5}
                onClick={() => setSelectedProject(project)}
                className="group relative p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-[#0b101d]/85 backdrop-blur-md hover:border-blue-500/50 hover:bg-[#0f172a] transition-colors flex flex-col justify-between cursor-pointer shadow-lg h-full overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border border-slate-700 bg-slate-800/80 text-slate-300">
                      {project.category}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#0e1424] border border-slate-800 group-hover:border-slate-700 transition-colors">
                      {renderProjectIcon(project.icon)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-blue-300 transition-colors mb-1.5">
                    {project.title}
                  </h3>

                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {project.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Quantitative Benchmark Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">{metric.label}</div>
                        <div className="text-xs font-mono font-bold mt-0.5 text-blue-400 tabular-nums">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className={`text-xs font-medium flex items-center gap-1 ${getAccentText()} group-hover:translate-x-1 transition-transform`}>
                      <span>Ver Detalles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Detailed Modal for Project Breakdown with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Animated Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Animated Modal Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0b101d] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto z-10"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-3.5 rounded-xl bg-[#0e1424] border border-slate-800">
                    {renderProjectIcon(selectedProject.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border border-slate-700 bg-slate-800/80 text-slate-300">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-5 text-xs sm:text-sm text-slate-300">
                  <div>
                    <h4 className={`text-xs font-mono ${getAccentText()} uppercase mb-1 font-semibold`}>
                      Alcance de la Solución Técnica
                    </h4>
                    <p className="leading-relaxed text-slate-300">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className={`text-xs font-mono ${getAccentText()} uppercase mb-1 font-semibold`}>
                      Arquitectura & Flujo de Datos
                    </h4>
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                      {selectedProject.architecture}
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <h4 className={`text-xs font-mono ${getAccentText()} uppercase mb-2 font-semibold`}>
                      Métricas de Eficiencia & Benchmark
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.metrics.map((m, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#0e1424] border border-slate-800 text-center">
                          <div className="text-[11px] font-mono text-slate-400">{m.label}</div>
                          <div className={`text-sm font-bold font-mono mt-0.5 ${getAccentText()}`}>
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className={`text-xs font-mono ${getAccentText()} uppercase mb-2 font-semibold`}>
                      Ecosistema y Librerías Implementadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0e1424] text-slate-200 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    Desarrollado por Zenón Luciano Acuña · SENATI Quinto Ciclo
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${getPrimaryButton()}`}
                  >
                    Cerrar Ficha
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
