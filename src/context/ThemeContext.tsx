import React, { createContext, useContext, useState } from 'react';

export type AccentTheme = 'cobalt' | 'cyan' | 'emerald';

interface ThemeContextType {
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentTheme, setAccentTheme] = useState<AccentTheme>('cobalt');

  return (
    <ThemeContext.Provider
      value={{
        accentTheme,
        setAccentTheme,
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
