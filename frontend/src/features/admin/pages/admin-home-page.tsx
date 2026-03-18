import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminHomePage() {
  return (
    <div className="page-stack">
      <Card className="border-border/60 bg-card/90">
        <CardHeader className="panel-header">
          <div>
            <p className="section-label">Admin</p>
            <CardTitle className="mt-2 text-3xl">Administrative controls</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="dashboard-grid">
          <Card className="border-border/60 bg-background/70">
            <CardContent className="grid gap-3 p-5">
              <p className="section-label">User management</p>
              <p className="text-sm text-muted-foreground">
                Create users and assign roles without leaving the protected admin workspace.
              </p>
              <Button asChild variant="outline" className="w-fit">
                <Link to="/app/admin/users">Manage users</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-background/70">
            <CardContent className="grid gap-3 p-5">
              <p className="section-label">Settings</p>
              <p className="text-sm text-muted-foreground">
                Reserved for global controls, environment notes, and operational defaults.
              </p>
              <Button asChild variant="outline" className="w-fit">
                <Link to="/app/admin/settings">Open settings</Link>
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
