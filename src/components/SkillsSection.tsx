import React, { useState, useMemo } from 'react';
import {
  SKILLS_DATA,
  SKILL_CATEGORIES,
  SkillItem,
} from '../data/portfolioData.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { Search, X, Info } from 'lucide-react';
import { SkillLogo } from './SkillLogo.tsx';
import { ScrollReveal, StaggerContainer, StaggerItem, MotionCard } from './ScrollReveal.tsx';
import { motion, AnimatePresence } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const { accentTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const getAccentText = () => {
    if (accentTheme === 'emerald') return 'text-emerald-400';
    if (accentTheme === 'cyan') return 'text-cyan-400';
    return 'text-blue-400';
  };

  const getButtonPrimary = () => {
    if (accentTheme === 'emerald') return 'bg-emerald-600 hover:bg-emerald-500 text-white';
    if (accentTheme === 'cyan') return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950';
    return 'bg-blue-600 hover:bg-blue-500 text-white';
  };

  // Filter skills based on category and query
  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.highlight &&
          skill.highlight.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Especializado':
        return 'text-purple-300 border-purple-500/30 bg-purple-950/40';
      case 'Avanzado':
        return 'text-blue-300 border-blue-500/30 bg-blue-950/40';
      case 'Certificado':
        return 'text-amber-300 border-amber-500/30 bg-amber-950/40';
      default:
        return 'text-slate-300 border-slate-700 bg-slate-800/60';
    }
  };

  return (
    <section id="habilidades" className="py-20 lg:py-24 relative bg-[#070a12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with smooth entrance */}
        <ScrollReveal direction="up" distance={28} duration={0.7}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className={`text-xs font-mono ${getAccentText()} mb-2 uppercase tracking-wider`}>
                Inventario Tecnológico
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Stack Tecnológico y Herramientas
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                Dominio técnico integral en desarrollo backend, frameworks modernos, visión por computadora, bases de datos relacionales y vectoriales.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tecnología o librería..."
                className="w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c1220] text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal direction="up" distance={20} duration={0.6} delay={0.08}>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {SKILL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white bg-[#0e1424] border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] font-mono opacity-80">
                    ({cat.id === 'all' ? SKILLS_DATA.length : SKILLS_DATA.filter((s) => s.category === cat.id).length})
                  </span>
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skills Cards Grid with Staggered Cascading Reveal and Hover Elevation */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" staggerDelay={0.025}>
          {filteredSkills.map((skill, index) => (
            <StaggerItem key={`${skill.name}-${index}`} className="h-full">
              <MotionCard
                onClick={() => setSelectedSkill(skill)}
                hoverY={-4}
                className="group relative p-5 rounded-xl bg-[#0b101d]/85 backdrop-blur-md border border-slate-800/90 hover:border-blue-500/50 hover:bg-[#0f172a] transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-md h-full overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-[#0e1424] border border-slate-800 group-hover:border-slate-700 transition-colors">
                      <SkillLogo name={skill.name} className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getLevelBadge(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors mb-1.5">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {skill.description}
                  </p>
                </div>

                {skill.highlight && (
                  <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 group-hover:text-slate-300 flex items-center justify-between transition-colors">
                    <span className="truncate">{skill.highlight}</span>
                    <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1 transition-colors" />
                  </div>
                )}
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredSkills.length === 0 && (
          <ScrollReveal direction="up" distance={16} duration={0.5}>
            <div className="text-center py-16 bg-[#0b101d]/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl">
              <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <p className="text-sm text-slate-300">
                No se encontraron tecnologías que coincidan con "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs font-mono text-blue-400 hover:underline cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          </ScrollReveal>
        )}

        {/* Skill Details Modal with AnimatePresence */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0b101d] border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-3 rounded-xl bg-[#0e1424] border border-slate-800">
                    <SkillLogo name={selectedSkill.name} className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      {selectedSkill.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getLevelBadge(
                          selectedSkill.level
                        )}`}
                      >
                        {selectedSkill.level}
                      </span>
                      <span className="text-xs text-slate-400 capitalize">
                        {selectedSkill.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div>
                    <h4 className={`text-xs font-mono ${getAccentText()} uppercase mb-1`}>
                      Aplicación en Proyectos
                    </h4>
                    <p className="leading-relaxed text-slate-300">
                      {selectedSkill.description}
                    </p>
                  </div>

                  {selectedSkill.highlight && (
                    <div>
                      <h4 className={`text-xs font-mono ${getAccentText()} uppercase mb-1`}>
                        Especialización & Ecosistema
                      </h4>
                      <p className="font-mono text-blue-200 bg-[#0e1424] p-3 rounded-lg border border-slate-800">
                        {selectedSkill.highlight}
                      </p>
                    </div>
                  )}

                  <div className="pt-3 text-xs text-slate-500 border-t border-slate-800 flex items-center justify-between">
                    <span>Portafolio de Zenón Luciano Acuña</span>
                    <span className={`font-mono ${getAccentText()}`}>SENATI · 5to Ciclo</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  {selectedSkill.category === 'certifications' ? (
                    <a
                      href="#certificados"
                      onClick={() => setSelectedSkill(null)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline flex items-center gap-1"
                    >
                      <span>Ver Insignias y Certificados Oficiales ➔</span>
                    </a>
                  ) : <div />}
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${getButtonPrimary()}`}
                  >
                    Entendido
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
