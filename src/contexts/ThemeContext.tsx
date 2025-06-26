import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useThemeStore } from '../store/themeStore';

interface ThemeContextType {
  theme: 'dark' | 'light' | 'system';
  toggleTheme: (theme: 'dark' | 'light' | 'system') => void;
  currentTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  const getCurrentTheme = (): 'dark' | 'light' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  const currentTheme = getCurrentTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    // Apply current theme
    const appliedTheme = getCurrentTheme();
    root.classList.add(appliedTheme);
    body.classList.add(appliedTheme);

    // Update CSS custom properties for theme
    if (appliedTheme === 'light') {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--text-primary', '#1f2937');
      root.style.setProperty('--text-secondary', '#6b7280');
    } else {
      root.style.setProperty('--bg-primary', '#111827');
      root.style.setProperty('--bg-secondary', '#1f2937');
      root.style.setProperty('--text-primary', '#f9fafb');
      root.style.setProperty('--text-secondary', '#d1d5db');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        body.classList.add(newTheme);
      }
    };

    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      if (theme === 'system') {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, [theme]);

  const toggleTheme = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};