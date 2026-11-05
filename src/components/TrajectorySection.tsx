import React, { useState, useMemo } from 'react';
import { GraduationCap, Compass, Wrench, CheckCircle2, Award, X, ShieldCheck, Calendar, ExternalLink, Filter } from 'lucide-react';
import { TRAJECTORY_MILESTONES, CREDENTIALS_DATA, CredentialItem } from '../data/portfolioData.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { ScrollReveal, StaggerContainer, StaggerItem, MotionCard } from './ScrollReveal.tsx';
import { CredentialBadgeCard } from './CredentialBadgeCard.tsx';
import { motion, AnimatePresence } from 'motion/react';

export const TrajectorySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'badge' | 'certificate' | 'cisco' | 'redhat'>('all');
  const [selectedCredential, setSelectedCredential] = useState<CredentialItem | null>(null);
  const { accentTheme } = useTheme();

  const getAccentText = () => {
    if (accentTheme === 'emerald') return 'text-emerald-400';
    if (accentTheme === 'cyan') return 'text-cyan-400';
    return 'text-blue-400';
  };

  const getAccentBg = () => {
    if (accentTheme === 'emerald') return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    if (accentTheme === 'cyan') return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';
    return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
  };

  const getPrimaryButton = () => {
    if (accentTheme === 'emerald') return 'bg-emerald-600 hover:bg-emerald-500 text-white';
    if (accentTheme === 'cyan') return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950';
    return 'bg-blue-600 hover:bg-blue-500 text-white';
  };

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
        'Pipelines de Computer Vision con OpenCV y YOLOv8/v11',
        'Arquitecturas de microservicios e inferencia de modelos en FastAPI/Node.js',
        'Control de versiones distribuido y metodologías ágiles de trabajo'
      ]
    },
    {
      icon: Compass,
      tag: '02. Filosofía de Desarrollo',
      title: 'Comprensión Algorítmica y Programación Autónoma',
      badge: 'From-Scratch Mastery',
      description:
        'Enfoque metodológico: utilizar modelos de IA de frontera como aceleradores de productividad sin renunciar a la comprensión profunda. Compromiso con escribir algoritmos desde cero, dominar estructuras de datos y entender cada capa de abstracción del sistema.',
      highlights: [
        'Desarrollo y depuración sin dependencias opacas',
        'Auditoría minuciosa de código generado y optimización de rendimiento',
        'Comprensión matemática de transformadas, tensores y embeddings',
        'Mentalidad de investigación independiente y resolución lógica'
      ]
    },
    {
      icon: Wrench,
      tag: '03. Competencias Prácticas',
      title: 'Resolución de Problemas y Gestión Tecnológica',
      badge: 'Orientado a Resultados',
      description:
        'Capacidad comprobada en la identificación rápida de incidencias técnicas en software y entornos de producción, soporte estructurado con alta empatía para usuarios y administración eficiente de recursos tecnológicos.',
      highlights: [
        'Diagnóstico metódico de aplicaciones, bases de datos y redes',
        'Atención personalizada orientada a soluciones efectivas',
        'Mantenimiento preventivo y configuración de entornos Linux/Docker',
        'Coordinación técnica de proyectos y documentación clara'
      ]
    }
  ];

  // Filtering credentials
  const filteredCredentials = useMemo(() => {
    return CREDENTIALS_DATA.filter((item) => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'badge') return item.type === 'badge';
      if (selectedFilter === 'certificate') return item.type === 'certificate';
      if (selectedFilter === 'cisco') return item.issuer === 'Cisco';
      if (selectedFilter === 'redhat') return item.issuer === 'Red Hat';
      return true;
    });
  }, [selectedFilter]);

  const filterTabs = [
    { id: 'all', label: 'Todas las Acreditaciones', count: CREDENTIALS_DATA.length },
    { id: 'badge', label: 'Insignias Digitales', count: CREDENTIALS_DATA.filter((c) => c.type === 'badge').length },
    { id: 'certificate', label: 'Certificados de Curso', count: CREDENTIALS_DATA.filter((c) => c.type === 'certificate').length },
    { id: 'cisco', label: 'Cisco NetAcad', count: CREDENTIALS_DATA.filter((c) => c.issuer === 'Cisco').length },
    { id: 'redhat', label: 'Red Hat', count: CREDENTIALS_DATA.filter((c) => c.issuer === 'Red Hat').length },
  ];

  return (
    <section id="trayectoria" className="py-20 lg:py-24 relative border-t border-slate-800/80 bg-[#080c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={28} duration={0.7} className="mb-12">
          <div className={`text-xs font-mono ${getAccentText()} mb-2 uppercase tracking-wider`}>
            Acreditación Académica & Certificaciones Oficiales
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Trayectoria, Insignias y Certificados
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Formación técnica en SENATI complementada con insignias digitales verificadas y certificados emitidos por Cisco Networking Academy y Red Hat Academy.
          </p>
        </ScrollReveal>

        {/* 3 Pillars Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" staggerDelay={0.1}>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === idx;
            return (
              <StaggerItem key={pillar.tag} className="h-full">
                <MotionCard
                  onClick={() => setActivePillar(idx)}
                  hoverY={-5}
                  className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer backdrop-blur-md h-full overflow-hidden ${
                    isSelected
                      ? 'bg-[#0f172a]/95 border-blue-500/60 shadow-xl shadow-blue-950/25 ring-1 ring-blue-500/30'
                      : 'bg-[#0b101d]/85 border-slate-800/90 hover:border-slate-700 hover:bg-[#0f172a]/70 shadow-lg'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono ${getAccentText()}`}>{pillar.tag}</span>
                      <span className="text-[11px] font-mono text-slate-300 border border-slate-700 bg-slate-800/80 px-2 py-0.5 rounded-md">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className={`w-10 h-10 rounded-xl ${getAccentBg()} border flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-200`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2.5 group-hover:text-blue-200 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="space-y-2">
                      {pillar.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${getAccentText()} shrink-0 mt-0.5`} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* =========================================================================
            CERTIFICACIONES E INSIGNIAS OFICIALES (CISCO & RED HAT)
           ========================================================================= */}
        <div id="certificados" className="mb-16 pt-4">
          <ScrollReveal direction="up" distance={24} duration={0.65} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className={`text-xs font-mono ${getAccentText()} uppercase tracking-wider`}>
                    Insignias Digitales & Certificados de Curso
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Acreditaciones Verificadas
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Insignias emitidas por Cisco Networking Academy y Red Hat Academy acreditando habilidades en redes, ciberseguridad, IoT, Python, hardware y Linux empresarial.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg shrink-0">
                <ShieldCheck className="w-4 h-4" />
                <span>15 Acreditaciones Registradas</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-6">
              {filterTabs.map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? `${getAccentBg()} border font-semibold text-white shadow-md`
                        : 'bg-[#0e1424] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Grid of Credentials with Framer Motion Stagger */}
          <StaggerContainer
            key={selectedFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.06}
          >
            {filteredCredentials.map((cred) => (
              <StaggerItem key={cred.id}>
                <CredentialBadgeCard
                  credential={cred}
                  onClick={() => setSelectedCredential(cred)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* =========================================================================
            LÍNEA DE EVOLUCIÓN ACADÉMICA Y HITOS TÉCNICOS
           ========================================================================= */}
        <ScrollReveal direction="up" distance={24} duration={0.7} className="mt-12">
          <div className="bg-[#0b101d]/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className={`text-xs font-mono ${getAccentText()} uppercase tracking-wider`}>
                  Línea de Evolución
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1">
                  Hitos Académicos & Formación Técnica
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>SENATI · Quinto Ciclo en Curso</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TRAJECTORY_MILESTONES.map((milestone, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0e1424]/80 border border-slate-800/80 hover:border-slate-700 hover:bg-[#121a30] transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-blue-400 font-semibold">{milestone.period}</span>
                      <span className="text-[11px] font-mono text-slate-400 truncate">{milestone.institution}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2 leading-snug">{milestone.title}</h4>
                    <p className="text-xs text-slate-300/85 leading-relaxed mb-4">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                    {milestone.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
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

        {/* Modal Detallado de Credencial / Insignia / Certificado */}
        <AnimatePresence>
          {selectedCredential && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCredential(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0b101d] border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto z-10"
              >
                <button
                  onClick={() => setSelectedCredential(null)}
                  className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {selectedCredential.issuer}
                  </span>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md border ${
                    selectedCredential.type === 'certificate'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                  }`}>
                    {selectedCredential.type === 'certificate' ? 'Certificado Oficial de Curso' : 'Insignia Digital Verificada'}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2 leading-snug">
                  {selectedCredential.title}
                </h3>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Emitido: {selectedCredential.issuedDate}</span>
                  </div>
                  <span>·</span>
                  <span className="text-slate-300">{selectedCredential.category}</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                    <h4 className="text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                      Descripción de la Acreditación
                    </h4>
                    <p className="leading-relaxed text-slate-300">
                      {selectedCredential.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                      Habilidades y Competencias Validadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCredential.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0e1424] text-slate-200 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Acreditado a: <strong>Zenón Luciano Acuña Chuquihuanca</strong></span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">SENATI · Quinto Ciclo</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    {selectedCredential.issuer === 'Red Hat' ? 'Red Hat Academy' : 'Cisco Networking Academy'}
                  </span>
                  <button
                    onClick={() => setSelectedCredential(null)}
                    className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${getPrimaryButton()}`}
                  >
                    Entendido
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
