import { useEffect } from 'react';
import { useFavicon } from 'react-use';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  inverse: () => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => ({
      theme: Theme.LIGHT,
      setTheme: (theme) => set({ theme }),
      inverse: () => {
        const newTheme = get().theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        set({ theme: newTheme });
      },
    }),
    { name: 'theme', storage: createJSONStorage(() => localStorage) },
  ),
);

export function useTheme() {
  const { theme, setTheme, inverse } = useThemeStore((state) => state);

  useFavicon(`/favicon-${theme === Theme.DARK ? Theme.LIGHT : Theme.DARK}.svg`);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').onchange = (event) => {
      const newColorScheme = event.matches ? Theme.DARK : Theme.LIGHT;
      setTheme(newColorScheme);
    };
  }, []);

  return { theme, setTheme, inverse };
}
