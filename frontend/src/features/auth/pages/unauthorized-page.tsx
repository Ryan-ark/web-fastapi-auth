import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UnauthorizedPage() {
  return (
    <main className="not-found">
      <Card className="border-border/60 bg-card/90">
        <CardContent className="grid gap-4 p-8 text-center">
          <p className="section-label">403</p>
          <h1 className="text-3xl font-semibold tracking-tight">Access denied</h1>
          <p className="text-muted-foreground">
            Your account is authenticated, but your role cannot access this page.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild>
              <Link to="/app/dashboard">Open dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/app/profile">View profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
