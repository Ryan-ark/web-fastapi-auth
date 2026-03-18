import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminSettingsPage() {
  return (
    <div className="page-stack">
      <Card className="border-border/60 bg-card/90">
        <CardHeader>
          <p className="section-label">Admin settings</p>
          <CardTitle className="text-3xl">Operational notes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm text-muted-foreground">
          <p>Default admin bootstrap is controlled from backend environment variables.</p>
          <p>Cookie names, token lifetimes, and the auth secret also live in backend config.</p>
          <p>This page stays intentionally light until real runtime settings exist.</p>
        </CardContent>
      </Card>
    </div>
  );
}
