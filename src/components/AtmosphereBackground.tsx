import React from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

export const AtmosphereBackground: React.FC = () => {
  const { accentTheme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic ambient gradient lighting */}
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full blur-[150px] transition-all duration-700 ${
          accentTheme === 'cobalt'
            ? 'bg-blue-600/12'
            : accentTheme === 'emerald'
            ? 'bg-emerald-600/10'
            : 'bg-cyan-600/12'
        }`}
      />

      <div
        className={`absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full blur-[160px] transition-all duration-700 ${
          accentTheme === 'cobalt'
            ? 'bg-indigo-600/10'
            : accentTheme === 'emerald'
            ? 'bg-teal-600/8'
            : 'bg-sky-600/10'
        }`}
      />

      <div
        className={`absolute bottom-20 -left-20 w-[420px] h-[420px] rounded-full blur-[160px] transition-all duration-700 ${
          accentTheme === 'cobalt'
            ? 'bg-blue-900/12'
            : accentTheme === 'emerald'
            ? 'bg-emerald-950/15'
            : 'bg-cyan-950/15'
        }`}
      />

      {/* Tech architectural grid overlay */}
      <div className="absolute inset-0 bg-grid-tech opacity-40" />

      {/* Radial vignette scrim for contrast and legibility */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
};
