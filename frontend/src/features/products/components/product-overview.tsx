import { Card, CardContent } from "@/components/ui/card";

type ProductOverviewProps = {
  total: number;
  activeCount: number;
  inactiveCount: number;
};

export function ProductOverview({ total, activeCount, inactiveCount }: ProductOverviewProps) {
  return (
    <section className="overview-grid">
      {[
        { label: "Total products", value: total },
        { label: "Active", value: activeCount },
        { label: "Archived", value: inactiveCount },
      ].map((metric) => (
        <Card key={metric.label} className="bg-card/85 backdrop-blur">
          <CardContent className="grid gap-3 p-6">
            <p className="section-label">{metric.label}</p>
            <strong className="text-4xl font-semibold tracking-tight">{metric.value}</strong>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
