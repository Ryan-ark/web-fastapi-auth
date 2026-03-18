import { Link, Outlet } from "react-router-dom";

import { ThemeControls } from "@/components/theme/theme-controls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AppLayout() {
  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="hero">
          <div className="hero__content">
            <Badge variant="secondary" className="w-fit">
              Vite + React + FastAPI + PostgreSQL
            </Badge>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="eyebrow">Design-system migration</p>
                  <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                    Product Control Center
                  </h1>
                </div>
                <p className="hero__summary">
                  Shared shadcn-compatible primitives, runtime accent theming, and a routed showcase
                  now live alongside the sample CRUD workspace.
                </p>
              </div>
              <Card className="w-full max-w-sm border-primary/20 bg-background/70">
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Explore the new component surface</p>
                    <p className="text-sm text-muted-foreground">
                      Use the showcase routes to validate behavior and theming.
                    </p>
                  </div>
                  <Button asChild variant="outline">
                    <Link to="/showcase">Showcase</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </header>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <main className="page-content">
            <Outlet />
          </main>
          <aside className="h-fit xl:sticky xl:top-6">
            <ThemeControls />
          </aside>
        </div>
      </div>
    </div>
  );
}
