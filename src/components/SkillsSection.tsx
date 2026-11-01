import React, { useState, useMemo } from 'react';
import {
  SKILLS_DATA,
  SKILL_CATEGORIES,
  SkillItem,
} from '../data/portfolioData.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import {
  Search,
  Code2,
  Database,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Eye,
  Zap,
  Box,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  X,
  Info
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal.tsx';

export const SkillsSection: React.FC = () => {
  const { accentTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const isCrimson = accentTheme === 'crimson';
  const textAccent = isCrimson ? 'text-red-400' : 'text-cyan-400';
  const tabActive = isCrimson
    ? 'bg-gradient-to-r from-red-600/30 to-rose-600/30 text-red-200 border border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm';
  const hoverBorder = isCrimson
    ? 'hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]'
    : 'hover:border-cyan-500/40 hover:shadow-cyan-500/5';
  const buttonPrimary = isCrimson
    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] pulse-red-button'
    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900';

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

  // Icon mapping helper with striking crimson & high-contrast cyberpunk accents
  const renderSkillIcon = (iconType: string) => {
    switch (iconType) {
      case 'database':
        return <Database className="w-5 h-5 text-red-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-rose-400" />;
      case 'eye':
        return <Eye className="w-5 h-5 text-red-400" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'box':
        return <Box className="w-5 h-5 text-rose-300" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-red-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-red-400" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-amber-300" />;
      case 'layout':
      case 'react':
      case 'code':
      default:
        return <Code2 className="w-5 h-5 text-red-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Especializado':
        return 'text-rose-300 border-rose-500/50 bg-rose-950/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]';
      case 'Avanzado':
        return 'text-red-300 border-red-500/60 bg-red-950/50 shadow-[0_0_12px_rgba(239,68,68,0.3)]';
      case 'Certificado':
        return 'text-amber-300 border-amber-500/50 bg-amber-950/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]';
      default:
        return 'text-slate-300 border-red-900/30 bg-black/60';
    }
  };

  return (
    <section id="habilidades" className="py-20 lg:py-28 relative bg-[#060407] border-t border-red-950/40">
      {/* Background radial crimson glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[32rem] h-[32rem] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-rose-700/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Fade-up */}
        <ScrollReveal direction="up" distance={24} duration={0.65}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className={`text-xs font-mono ${textAccent} mb-2 uppercase tracking-wider`}>
                Arquitectura de Capacidades
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Stack Tecnológico y Herramientas
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
                Dominio distribuido en arquitectura de software, pipelines de inteligencia artificial, visión artificial, bases de datos relacionales y vectoriales.
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
                className="w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-[#0c0709]/80 backdrop-blur-md text-slate-100 placeholder-slate-500 border border-red-950/60 rounded-xl focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs with Fade-up */}
        <ScrollReveal direction="up" distance={16} duration={0.6} delay={0.1}>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {SKILL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600/30 to-rose-600/30 text-red-200 border border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                      : 'text-slate-400 hover:text-white bg-[#0e070a]/70 border border-red-950/40 hover:border-red-500/40 hover:bg-[#1a0a0f]/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] font-mono opacity-70">
                    ({cat.id === 'all' ? SKILLS_DATA.length : SKILLS_DATA.filter((s) => s.category === cat.id).length})
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skills Cards Grid with Staggered Fade-up and Glassmorphism in Striking Obsidian-Black & Crimson Relief */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" staggerDelay={0.035}>
          {filteredSkills.map((skill, index) => (
            <StaggerItem key={`${skill.name}-${index}`} className="h-full">
              <div
                onClick={() => setSelectedSkill(skill)}
                className="group relative p-5 rounded-2xl bg-gradient-to-b from-[#12070a]/90 via-[#0a0507]/90 to-[#050305]/95 backdrop-blur-md border border-red-950/60 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:bg-[#17080d]/95 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg shadow-black/60 hover:-translate-y-1 h-full overflow-hidden"
              >
                {/* Cyber red relief top micro-glow */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/25 group-hover:via-red-500/90 to-transparent transition-all duration-300" />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-950/50 to-black/80 backdrop-blur-xs border border-red-900/40 group-hover:border-red-500/50 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all shadow-inner">
                      {renderSkillIcon(skill.iconType)}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-xs border ${getLevelColor(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-red-300 transition-colors mb-1.5">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed mb-3">
                    {skill.description}
                  </p>
                </div>

                {skill.highlight && (
                  <div className="pt-3 border-t border-red-950/50 text-[11px] font-mono text-red-400/90 group-hover:text-red-300 flex items-center justify-between transition-colors">
                    <span className="truncate">{skill.highlight}</span>
                    <Info className="w-3.5 h-3.5 text-red-500/60 group-hover:text-red-400 shrink-0 ml-1 transition-colors" />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-[#0e0609]/70 backdrop-blur-md border border-red-950/60 rounded-2xl shadow-xl">
            <Search className="w-8 h-8 text-red-500/40 mx-auto mb-3" />
            <p className="text-sm text-slate-300">
              No se encontraron tecnologías que coincidan con "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-mono text-red-400 hover:text-red-300 hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {/* Skill Details Modal with Frosted Crimson & Obsidian Glassmorphism */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0e0508]/95 backdrop-blur-2xl border border-red-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.25)] relative shadow-black/90">
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-red-950/50 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-red-950/60 to-black/80 backdrop-blur-xs border border-red-500/30 shadow-inner">
                  {renderSkillIcon(selectedSkill.iconType)}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getLevelColor(
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

              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <h4 className={`text-xs font-mono ${textAccent} uppercase mb-1`}>
                    Aplicación en Proyectos
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    {selectedSkill.description}
                  </p>
                </div>

                {selectedSkill.highlight && (
                  <div>
                    <h4 className={`text-xs font-mono ${textAccent} uppercase mb-1`}>
                      Especialización & Ecosistema
                    </h4>
                    <p className="text-xs sm:text-sm font-mono text-red-200 bg-[#13070a]/90 p-2.5 rounded-lg border border-red-950/80 shadow-inner">
                      {selectedSkill.highlight}
                    </p>
                  </div>
                )}

                <div className="pt-2 text-xs text-slate-500 border-t border-red-950/60 flex items-center justify-between">
                  <span>Portafolio de Zenón Luciano Acuña</span>
                  <span className={`font-mono ${textAccent}`}>SENATI · 5to Ciclo</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${buttonPrimary}`}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
