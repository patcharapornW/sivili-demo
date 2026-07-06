'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LayoutSectionConfig, ThemeSettings, defaultLayoutConfig, defaultThemeSettings } from '@/lib/layoutConfig';

interface ThemeContextType {
  layout: LayoutSectionConfig[];
  setLayout: (layout: LayoutSectionConfig[]) => void;
  themeSettings: ThemeSettings;
  setThemeSettings: (settings: ThemeSettings) => void;
  updateSectionData: (id: string, data: any) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState<LayoutSectionConfig[]>(defaultLayoutConfig);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultThemeSettings);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLayout = localStorage.getItem('sivili_theme_layout');
    const savedTheme = localStorage.getItem('sivili_theme_settings');
    
    if (savedLayout) {
      try { 
        const parsedLayout = JSON.parse(savedLayout);
        // Ensure it's the new format (has type). If not, fallback to default.
        if (parsedLayout.length > 0 && parsedLayout[0].type) {
          setLayout(parsedLayout); 
        } else {
          setLayout(defaultLayoutConfig);
        }
      } catch (e) {}
    }
    
    if (savedTheme) {
      try { setThemeSettings(JSON.parse(savedTheme)); } catch (e) {}
    }
  }, []);

  const updateSectionData = (id: string, data: any) => {
    setLayout(prev => prev.map(section => 
      section.id === id ? { ...section, data: { ...section.data, ...data } } : section
    ));
  };

  return (
    <ThemeContext.Provider value={{ layout, setLayout, themeSettings, setThemeSettings, updateSectionData }}>
      {/* We apply CSS variables to the root container so they can be used across the app easily */}
      <div 
        style={{ 
          '--color-primary': themeSettings.primaryColor,
          '--color-secondary': themeSettings.secondaryColor,
          '--bg-color': themeSettings.backgroundColor,
        } as React.CSSProperties}
        className="contents" // "contents" prevents this div from affecting layout
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
