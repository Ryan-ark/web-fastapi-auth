export type AccentPresetId = "amber" | "blue" | "emerald" | "rose" | "violet";

export type AccentPreset = {
  id: AccentPresetId;
  label: string;
  light: Record<string, string>;
  dark: Record<string, string>;
};

export const accentPresets: AccentPreset[] = [
  {
    id: "amber",
    label: "Amber",
    light: {
      "--primary": "36 92% 52%",
      "--primary-foreground": "26 30% 10%",
      "--accent": "36 100% 94%",
      "--accent-foreground": "164 36% 18%",
      "--ring": "36 92% 52%",
      "--chart-1": "36 92% 52%",
      "--chart-4": "22 90% 60%",
    },
    dark: {
      "--primary": "36 92% 58%",
      "--primary-foreground": "24 30% 8%",
      "--accent": "36 42% 18%",
      "--accent-foreground": "35 45% 95%",
      "--ring": "36 92% 58%",
      "--chart-1": "36 92% 58%",
      "--chart-4": "24 88% 68%",
    },
  },
  {
    id: "blue",
    label: "Blue",
    light: {
      "--primary": "220 88% 54%",
      "--primary-foreground": "210 40% 98%",
      "--accent": "214 100% 95%",
      "--accent-foreground": "222 47% 20%",
      "--ring": "220 88% 54%",
      "--chart-1": "220 88% 54%",
      "--chart-2": "193 88% 48%",
    },
    dark: {
      "--primary": "217 91% 60%",
      "--primary-foreground": "222 47% 11%",
      "--accent": "217 35% 18%",
      "--accent-foreground": "210 40% 98%",
      "--ring": "217 91% 60%",
      "--chart-1": "217 91% 60%",
      "--chart-2": "193 88% 58%",
    },
  },
  {
    id: "emerald",
    label: "Emerald",
    light: {
      "--primary": "158 70% 38%",
      "--primary-foreground": "0 0% 100%",
      "--accent": "152 62% 93%",
      "--accent-foreground": "158 64% 18%",
      "--ring": "158 70% 38%",
      "--chart-1": "158 70% 38%",
      "--chart-3": "144 60% 35%",
    },
    dark: {
      "--primary": "160 84% 45%",
      "--primary-foreground": "165 60% 8%",
      "--accent": "160 28% 18%",
      "--accent-foreground": "155 60% 96%",
      "--ring": "160 84% 45%",
      "--chart-1": "160 84% 45%",
      "--chart-3": "148 62% 52%",
    },
  },
  {
    id: "rose",
    label: "Rose",
    light: {
      "--primary": "346 84% 56%",
      "--primary-foreground": "355 100% 97%",
      "--accent": "340 100% 96%",
      "--accent-foreground": "343 48% 24%",
      "--ring": "346 84% 56%",
      "--chart-1": "346 84% 56%",
      "--chart-4": "20 88% 58%",
    },
    dark: {
      "--primary": "346 84% 62%",
      "--primary-foreground": "343 52% 10%",
      "--accent": "343 28% 18%",
      "--accent-foreground": "355 100% 97%",
      "--ring": "346 84% 62%",
      "--chart-1": "346 84% 62%",
      "--chart-4": "24 88% 68%",
    },
  },
  {
    id: "violet",
    label: "Violet",
    light: {
      "--primary": "262 83% 58%",
      "--primary-foreground": "0 0% 100%",
      "--accent": "270 100% 97%",
      "--accent-foreground": "264 44% 24%",
      "--ring": "262 83% 58%",
      "--chart-1": "262 83% 58%",
      "--chart-5": "286 70% 62%",
    },
    dark: {
      "--primary": "263 89% 66%",
      "--primary-foreground": "263 44% 12%",
      "--accent": "264 28% 18%",
      "--accent-foreground": "270 100% 97%",
      "--ring": "263 89% 66%",
      "--chart-1": "263 89% 66%",
      "--chart-5": "286 78% 72%",
    },
  },
];

export const defaultAccentPreset = accentPresets[0];
