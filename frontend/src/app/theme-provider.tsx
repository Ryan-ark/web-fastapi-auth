"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { AccentPresetId, accentPresets, defaultAccentPreset } from "./theme-config";

const ACCENT_STORAGE_KEY = "product-control-center-accent";

type AccentThemeContextValue = {
  accent: AccentPresetId;
  setAccent: (accent: AccentPresetId) => void;
};

const AccentThemeContext = createContext<AccentThemeContextValue | null>(null);

function AccentThemeBridge({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  const [accent, setAccent] = useState<AccentPresetId>(defaultAccentPreset.id);

  useEffect(() => {
    const storedAccent = window.localStorage.getItem(ACCENT_STORAGE_KEY) as AccentPresetId | null;
    if (storedAccent && accentPresets.some((preset) => preset.id === storedAccent)) {
      setAccent(storedAccent);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const preset = accentPresets.find((item) => item.id === accent) ?? defaultAccentPreset;
    const palette = resolvedTheme === "dark" ? preset.dark : preset.light;

    Object.entries(palette).forEach(([token, value]) => {
      root.style.setProperty(token, value);
    });

    root.dataset.accent = accent;
    window.localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  }, [accent, resolvedTheme]);

  const value = useMemo(
    () => ({
      accent,
      setAccent,
    }),
    [accent],
  );

  return <AccentThemeContext.Provider value={value}>{children}</AccentThemeContext.Provider>;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AccentThemeBridge>{children}</AccentThemeBridge>
    </NextThemesProvider>
  );
}

export function useAccentTheme() {
  const context = useContext(AccentThemeContext);

  if (!context) {
    throw new Error("useAccentTheme must be used within ThemeProvider.");
  }

  return context;
}
