import React, { createContext, useContext, useState } from 'react';

export type AccentTheme = 'crimson' | 'cyan' | 'emerald';
export type WallpaperColorMode = 'crimson' | 'cyan' | 'violet' | 'natural';
export type WallpaperBrightness = 'high' | 'medium' | 'cinematic';
export type WallpaperScope = 'hero_only' | 'full';

interface ThemeContextType {
  wallpaperEnabled: boolean;
  setWallpaperEnabled: (enabled: boolean) => void;
  wallpaperColorMode: WallpaperColorMode;
  setWallpaperColorMode: (mode: WallpaperColorMode) => void;
  wallpaperBrightness: WallpaperBrightness;
  setWallpaperBrightness: (b: WallpaperBrightness) => void;
  wallpaperScope: WallpaperScope;
  setWallpaperScope: (scope: WallpaperScope) => void;
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
  customCursorEnabled: boolean;
  setCustomCursorEnabled: (enabled: boolean) => void;
  toggleWallpaper: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to wallpaper enabled in the Hero section, high illumination, and customizable color tint
  const [wallpaperEnabled, setWallpaperEnabled] = useState<boolean>(true);
  const [wallpaperColorMode, setWallpaperColorMode] = useState<WallpaperColorMode>('crimson');
  const [wallpaperBrightness, setWallpaperBrightness] = useState<WallpaperBrightness>('high');
  const [wallpaperScope, setWallpaperScope] = useState<WallpaperScope>('hero_only');
  const [accentTheme, setAccentTheme] = useState<AccentTheme>('crimson');
  const [customCursorEnabled, setCustomCursorEnabled] = useState<boolean>(true);

  const toggleWallpaper = () => {
    setWallpaperEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
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
        toggleWallpaper,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
