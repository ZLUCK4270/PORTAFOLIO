import React, { useState } from 'react';
import { useTheme, WallpaperColorMode, WallpaperBrightness, WallpaperScope } from '../context/ThemeContext.tsx';
import { Sliders, Flame, Sparkles, Sun, Palette, Layout, ShieldCheck, Check, MousePointer } from 'lucide-react';

export const AtmosphereBackground: React.FC = () => {
  const {
    wallpaperEnabled,
    setWallpaperEnabled,
    wallpaperColorMode,
    setWallpaperColorMode,
    wallpaperBrightness,
    setWallpaperBrightness,
    wallpaperScope,
    setWallpaperScope,
    accentTheme,
    setAccentTheme,
    customCursorEnabled,
    setCustomCursorEnabled,
  } = useTheme();

  const [panelOpen, setPanelOpen] = useState(false);

  // Filter styles for changing the artwork color tone and illumination
  const getColorFilterStyle = () => {
    let brightness = 'brightness(1.15) contrast(1.15)';
    if (wallpaperBrightness === 'medium') brightness = 'brightness(1.0) contrast(1.1)';
    if (wallpaperBrightness === 'cinematic') brightness = 'brightness(0.85) contrast(1.2)';

    switch (wallpaperColorMode) {
      case 'cyan':
        return `${brightness} hue-rotate(165deg) saturate(1.35)`;
      case 'violet':
        return `${brightness} hue-rotate(240deg) saturate(1.35)`;
      case 'crimson':
        return `${brightness} sepia(0.15) hue-rotate(335deg) saturate(1.45)`;
      case 'natural':
      default:
        return `${brightness} saturate(1.1)`;
    }
  };

  const getOpacity = () => {
    if (wallpaperBrightness === 'high') return 'opacity-90';
    if (wallpaperBrightness === 'medium') return 'opacity-70';
    return 'opacity-50';
  };

  return (
    <>
      {/* Wallpaper Layer */}
      <div
        className={`pointer-events-none z-0 overflow-hidden ${
          wallpaperScope === 'hero_only'
            ? 'absolute top-0 left-0 right-0 h-[880px] lg:h-[940px]'
            : 'fixed inset-0'
        }`}
      >
        {wallpaperEnabled && (
          <div className="relative w-full h-full">
            {/* The Wallpaper Image with dynamic color filter and high illumination */}
            <img
              src="/assets/aistudio/image_16410ee8.png"
              alt="Guerrero y Luna Carmesí"
              style={{ filter: getColorFilterStyle() }}
              className={`w-full h-full object-cover object-[50%_32%] lg:object-[55%_35%] scale-102 transition-all duration-700 ease-out ${getOpacity()}`}
            />

            {/* Non-muddy, clean scrims: left side allows text readability while center-right warrior shines through */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080b11]/90 via-[#080b11]/50 to-transparent lg:w-[65%]" />

            {/* Header top subtle scrim */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#080b11]/85 to-transparent" />

            {/* Bottom fade: guarantees smooth transition to pure clean dark canvas for subsequent sections */}
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#080b11] via-[#080b11]/85 to-transparent" />
          </div>
        )}

        {/* Ambient subtle cyber-grid overlay */}
        <div className="absolute inset-0 bg-grid-cyber opacity-35" />
      </div>

      {/* Floating Atmosphere & Color Control Pill */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="relative">
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-xl bg-slate-950/95 hover:bg-slate-900 text-slate-200 border border-slate-700/80 shadow-2xl backdrop-blur-md transition-all cursor-pointer group hover:border-red-500/50"
            title="Ajustar Iluminación, Color y Ubicación del Fondo"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                wallpaperEnabled
                  ? wallpaperColorMode === 'cyan'
                    ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                    : wallpaperColorMode === 'violet'
                    ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]'
                    : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                  : 'bg-slate-600'
              }`}
            />
            <span className="hidden sm:inline">
              {wallpaperEnabled ? `Fondo: ${wallpaperColorMode.toUpperCase()} (Iluminado)` : 'Fondo: Desactivado'}
            </span>
            <span className="sm:hidden">Ajustes Fondo</span>
            <Sliders className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400" />
          </button>

          {/* Expanded Configuration Modal */}
          {panelOpen && (
            <div className="absolute bottom-12 left-0 w-84 p-4 rounded-2xl bg-[#090d16]/98 border border-slate-700 shadow-2xl backdrop-blur-xl text-xs space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-mono text-slate-200 font-semibold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>Ajustes de Fondo & Iluminación</span>
                </span>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="text-slate-400 hover:text-white text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Wallpaper toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">Fondo de Guerrero</div>
                  <div className="text-[10px] text-slate-400">Arte épico en alta resolución</div>
                </div>
                <button
                  onClick={() => setWallpaperEnabled(!wallpaperEnabled)}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                    wallpaperEnabled
                      ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {wallpaperEnabled ? 'Visible' : 'Oculto'}
                </button>
              </div>

              {wallpaperEnabled && (
                <>
                  {/* Scope: Hero Only vs Full Project */}
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                      <Layout className="w-3.5 h-3.5 text-cyan-400" />
                      <span>UBICACIÓN DEL FONDO</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setWallpaperScope('hero_only')}
                        className={`py-1.5 text-[11px] font-mono rounded cursor-pointer transition-all ${
                          wallpaperScope === 'hero_only'
                            ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Solo en Hero (Limpio)
                      </button>
                      <button
                        onClick={() => setWallpaperScope('full')}
                        className={`py-1.5 text-[11px] font-mono rounded cursor-pointer transition-all ${
                          wallpaperScope === 'full'
                            ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Todo el Proyecto
                      </button>
                    </div>
                  </div>

                  {/* Illumination Level */}
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>ILUMINACIÓN / BRILLO</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setWallpaperBrightness('high')}
                        className={`py-1 text-[11px] font-mono rounded cursor-pointer transition-all ${
                          wallpaperBrightness === 'high'
                            ? 'bg-slate-800 text-amber-300 font-semibold border border-amber-500/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Alta (Vívido)
                      </button>
                      <button
                        onClick={() => setWallpaperBrightness('medium')}
                        className={`py-1 text-[11px] font-mono rounded cursor-pointer transition-all ${
                          wallpaperBrightness === 'medium'
                            ? 'bg-slate-800 text-slate-200 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Equilibrada
                      </button>
                      <button
                        onClick={() => setWallpaperBrightness('cinematic')}
                        className={`py-1 text-[11px] font-mono rounded cursor-pointer transition-all ${
                          wallpaperBrightness === 'cinematic'
                            ? 'bg-slate-800 text-slate-200 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Cinemática
                      </button>
                    </div>
                  </div>

                  {/* Color Variety: Crimson, Cyan, Violet, Natural */}
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                      <Palette className="w-3.5 h-3.5 text-purple-400" />
                      <span>TONALIDAD / COLOR DE ARTE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          setWallpaperColorMode('crimson');
                          setAccentTheme('crimson');
                        }}
                        className={`py-1.5 px-2 rounded-lg border transition-all flex items-center justify-between text-[11px] font-mono cursor-pointer ${
                          wallpaperColorMode === 'crimson'
                            ? 'bg-red-500/20 text-red-300 border-red-500/60 shadow-sm'
                            : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span>Carmesí Furia</span>
                        </div>
                        {wallpaperColorMode === 'crimson' && <Check className="w-3 h-3 text-red-400" />}
                      </button>

                      <button
                        onClick={() => {
                          setWallpaperColorMode('cyan');
                          setAccentTheme('cyan');
                        }}
                        className={`py-1.5 px-2 rounded-lg border transition-all flex items-center justify-between text-[11px] font-mono cursor-pointer ${
                          wallpaperColorMode === 'cyan'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm'
                            : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                          <span>Cian Neón</span>
                        </div>
                        {wallpaperColorMode === 'cyan' && <Check className="w-3 h-3 text-cyan-400" />}
                      </button>

                      <button
                        onClick={() => {
                          setWallpaperColorMode('violet');
                          setAccentTheme('crimson');
                        }}
                        className={`py-1.5 px-2 rounded-lg border transition-all flex items-center justify-between text-[11px] font-mono cursor-pointer ${
                          wallpaperColorMode === 'violet'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-sm'
                            : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                          <span>Violeta Sombra</span>
                        </div>
                        {wallpaperColorMode === 'violet' && <Check className="w-3 h-3 text-purple-400" />}
                      </button>

                      <button
                        onClick={() => {
                          setWallpaperColorMode('natural');
                        }}
                        className={`py-1.5 px-2 rounded-lg border transition-all flex items-center justify-between text-[11px] font-mono cursor-pointer ${
                          wallpaperColorMode === 'natural'
                            ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 shadow-sm'
                            : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span>Arte Original</span>
                        </div>
                        {wallpaperColorMode === 'natural' && <Check className="w-3 h-3 text-amber-400" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Cursor Style Toggle */}
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>DISEÑO DE CURSOR</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Desktop</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setCustomCursorEnabled(true)}
                    className={`py-1.5 text-[11px] font-mono rounded cursor-pointer transition-all ${
                      customCursorEnabled
                        ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Cyber Flecha
                  </button>
                  <button
                    onClick={() => setCustomCursorEnabled(false)}
                    className={`py-1.5 text-[11px] font-mono rounded cursor-pointer transition-all ${
                      !customCursorEnabled
                        ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Cursor Sistema
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Personalización instantánea</span>
                <span className="text-red-400/80 font-mono">Portafolio Zenón L.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
