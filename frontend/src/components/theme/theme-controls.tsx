import { Moon, Palette, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { accentPresets } from "@/app/theme-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccentTheme } from "@/app/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeControls() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { accent, setAccent } = useAccentTheme();

  return (
    <Card className="border-primary/20 bg-card/80 backdrop-blur">
      <CardHeader className="gap-3">
        <Badge variant="secondary" className="w-fit gap-1">
          <Palette className="h-3.5 w-3.5" />
          Theme lab
        </Badge>
        <div className="space-y-1">
          <CardTitle className="text-xl">Accent and mode controls</CardTitle>
          <CardDescription>
            Accent presets update primary, accent, ring, and chart tokens at runtime.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            className="gap-2"
          >
            <SunMedium className="h-4 w-4" />
            Light
          </Button>
          <Button
            type="button"
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            className="gap-2"
          >
            <Moon className="h-4 w-4" />
            Dark
          </Button>
          <Badge variant="outline" className="px-3 py-2 text-xs">
            Active mode: {resolvedTheme ?? theme ?? "system"}
          </Badge>
        </div>

        <div className="theme-preset-grid">
          {accentPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setAccent(preset.id)}
              className={cn(
                "flex min-w-[120px] items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors hover:border-primary hover:bg-accent",
                accent === preset.id && "border-primary bg-accent shadow-sm",
              )}
            >
              <span className="text-sm font-medium">{preset.label}</span>
              <span
                className="h-4 w-4 rounded-full border border-white/50"
                style={{ backgroundColor: `hsl(${preset.light["--primary"]})` }}
              />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
