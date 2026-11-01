import React, { useState } from 'react';
import { GraduationCap, Compass, Wrench, CheckCircle2, ChevronRight, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { TRAJECTORY_MILESTONES } from '../data/portfolioData.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal.tsx';

export const TrajectorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { accentTheme } = useTheme();

  const isCrimson = accentTheme === 'crimson';
  const textAccent = isCrimson ? 'text-red-400' : 'text-cyan-400';
  const borderActive = isCrimson ? 'border-red-500/50 shadow-red-500/10' : 'border-cyan-500/50 shadow-cyan-500/10';
  const iconBg = isCrimson ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';

  const pillars = [
    {
      icon: GraduationCap,
      tag: '01. Formación Académica',
      title: 'Ingeniería de Software con IA en SENATI',
      badge: 'Quinto Ciclo Activo',
      description:
        'Capacitación técnica rigurosa en desarrollo full-stack, ingeniería de requerimientos, diseño de bases de datos relacionales y no relacionales, redes neuronales, visión por computadora y automatización industrial.',
      highlights: [
        'Modelado relacional y bases vectoriales (PostgreSQL, Qdrant)',
        'Pipelines de Computer Vision con OpenCV y YOLO',
        'Arquitecturas de microservicios e inferencia de modelos en FastAPI/Node.js',
        'Metodologías ágiles y control de versiones distribuido'
      ]
    },
    {
      icon: Compass,
      tag: '02. Filosofía de Desarrollo',
      title: 'Evolución hacia la Programación Autónoma',
      badge: 'From-Scratch Mastery',
      description:
        'Equilibrio estratégico: utilizar modelos de IA de frontera como copilotos de alta velocidad sin delegar la comprensión profunda. Fuerte compromiso con escribir algoritmos desde cero, dominar estructuras de datos y entender cada capa de abstracción del sistema.',
      highlights: [
        'Desarrollo y depuración sin dependencias opacas',
        'Auditoría minuciosa de código generado y optimización de rendimiento',
        'Comprensión matemática de transformadas, tensores y embeddings',
        'Mentalidad de aprendizaje continuo e investigación independiente'
      ]
    },
    {
      icon: Wrench,
      tag: '03. Competencias Prácticas',
      title: 'Resolución de Problemas y Gestión Tecnológica',
      badge: 'Enfoque Orientado a Resultados',
      description:
        'Experiencia directa en la identificación rápida de incidencias técnicas en software y sistemas distribuidos, soporte estructurado con alta empatía para usuarios y administración eficiente de recursos tecnológicos.',
      highlights: [
        'Diagnóstico metódico de aplicaciones, bases de datos y redes',
        'Atención personalizada orientada a soluciones efectivas',
        'Mantenimiento preventivo y configuración de entornos de desarrollo',
        'Coordinación técnica de equipos y gestión de proyectos'
      ]
    }
  ];

  return (
    <section id="trayectoria" className="py-20 lg:py-28 relative border-t border-red-950/40 bg-[#060407]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Fade-up */}
        <ScrollReveal direction="up" distance={24} duration={0.65} className="mb-14">
          <div className={`text-xs font-mono ${textAccent} mb-2 uppercase tracking-wider`}>
            Perfil Profesional & Academia
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Trayectoria, Formación y Filosofía
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
            La convergencia entre la formación técnica universitaria en SENATI, el rigor autodidacta hacia la programación desde cero y la experiencia práctica en resolución de problemas tecnológicos.
          </p>
        </ScrollReveal>

        {/* 3 Pillars Grid with Staggered Fade-up Glassmorphism */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" staggerDelay={0.12}>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === idx;
            return (
              <StaggerItem key={pillar.tag} className="h-full">
                <div
                  onClick={() => setActiveTab(idx)}
                  className={`group relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-md h-full overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#16080d]/95 via-[#0e0509]/95 to-[#060305]/98 border-red-500/70 shadow-[0_0_25px_rgba(239,68,68,0.25)]'
                      : 'bg-gradient-to-b from-[#11070a]/80 via-[#090507]/80 to-[#050305]/90 border-red-950/60 hover:border-red-500/50 hover:bg-[#16080d]/90 shadow-lg'
                  }`}
                >
                  {/* Cyber red relief top micro-glow */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/30 group-hover:via-red-500/90 to-transparent transition-all duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono ${textAccent}`}>{pillar.tag}</span>
                      <span className="text-[11px] font-mono text-red-200 border border-red-500/40 bg-red-950/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className={`w-11 h-11 rounded-2xl ${iconBg} border border-white/10 flex items-center justify-center mb-4 shadow-inner`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2.5">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/8">
                    <div className="space-y-2">
                      {pillar.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${textAccent} shrink-0 mt-0.5`} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Timeline Roadmap & Milestones with Gentle Slide-in / Fade-up */}
        <ScrollReveal direction="up" distance={30} duration={0.7} delay={0.15}>
          <div className="bg-gradient-to-b from-[#12070a]/90 via-[#0a0507]/90 to-[#050305]/95 backdrop-blur-md border border-red-950/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-950/60">
              <div>
                <span className={`text-xs font-mono ${textAccent} uppercase`}>Línea de Evolución</span>
                <h3 className="text-xl font-bold font-display text-white mt-1">Hitos Formativos y Metas Técnicas</h3>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <Award className={`w-4 h-4 ${textAccent}`} />
                <span>SENATI · 5to Ciclo</span>
              </div>
            </div>

            <div className="space-y-6">
              {TRAJECTORY_MILESTONES.map((milestone, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl bg-[#0e0609]/70 backdrop-blur-xs border border-red-950/50 hover:border-red-500/40 hover:bg-[#16080d]/80 transition-all shadow-sm"
                >
                  <div className="md:col-span-3 flex flex-col justify-start">
                    <span className={`text-xs font-mono ${textAccent} font-semibold`}>{milestone.period}</span>
                    <span className="text-xs text-slate-400 mt-1">{milestone.institution}</span>
                    <span className="text-[11px] font-mono text-slate-500 mt-0.5">{milestone.type}</span>
                  </div>

                  <div className="md:col-span-6">
                    <h4 className="text-sm font-semibold text-white mb-1.5">{milestone.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="md:col-span-3 flex flex-wrap content-start gap-1.5 pt-1">
                    {milestone.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
