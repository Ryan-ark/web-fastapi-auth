import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ShowcaseNav } from "@/features/showcase/components/showcase-nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const chartData = [
  { week: "W1", items: 24 },
  { week: "W2", items: 31 },
  { week: "W3", items: 28 },
  { week: "W4", items: 42 },
  { week: "W5", items: 48 },
];

export function ShowcaseDataPage() {
  return (
    <section className="showcase-page">
      <Card>
        <CardHeader className="gap-4">
          <div>
            <p className="section-label">Showcase</p>
            <CardTitle className="mt-2 text-3xl">Data display and loading states</CardTitle>
          </div>
          <CardDescription>
            Theme tokens flow through cards, badges, separators, skeletons, and chart surfaces.
          </CardDescription>
          <ShowcaseNav />
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Catalog throughput</CardTitle>
            <CardDescription>Recharts inherits the tokenized accent palette through CSS variables.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="itemsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="items"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#itemsFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Surface samples</CardTitle>
            <CardDescription>Compact data-display blocks built from the shared UI layer.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <Separator />
            <div className="grid gap-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Separator />
            <div className="rounded-xl border border-dashed p-4">
              <p className="text-sm font-medium">Empty state shell</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use this block as a starting point for future Empty, Table, and Data Table routes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
