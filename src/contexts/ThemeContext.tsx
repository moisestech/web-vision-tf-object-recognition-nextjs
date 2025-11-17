'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { getMunicipality, getDefaultMunicipality, type Municipality } from '@/lib/constants';

interface ThemeContextType {
  municipality: Municipality;
  theme: Municipality['theme'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const municipalityId = searchParams?.get('m') || getDefaultMunicipality().id;
  const municipality = getMunicipality(municipalityId) || getDefaultMunicipality();

  // Apply theme CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    const theme = municipality.theme;

    root.style.setProperty('--municipality-primary', theme.primary);
    root.style.setProperty('--municipality-primary-hover', theme.primaryHover);
    root.style.setProperty('--municipality-accent', theme.accent);
    root.style.setProperty('--municipality-card-bg', theme.cardBg);
    root.style.setProperty('--municipality-border', theme.border);
    root.style.setProperty('--municipality-text-accent', theme.textAccent);

    // Add transition for smooth theme changes
    root.style.setProperty('transition', 'background-color 0.3s ease, border-color 0.3s ease');

    return () => {
      // Cleanup on unmount
      root.style.removeProperty('--municipality-primary');
      root.style.removeProperty('--municipality-primary-hover');
      root.style.removeProperty('--municipality-accent');
      root.style.removeProperty('--municipality-card-bg');
      root.style.removeProperty('--municipality-border');
      root.style.removeProperty('--municipality-text-accent');
    };
  }, [municipality]);

  return (
    <ThemeContext.Provider value={{ municipality, theme: municipality.theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useMunicipalityTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback to default municipality if context not available
    const defaultMunicipality = getDefaultMunicipality();
    return {
      municipality: defaultMunicipality,
      theme: defaultMunicipality.theme,
    };
  }
  return context;
}

