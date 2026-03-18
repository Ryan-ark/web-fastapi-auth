import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="section-label">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">The route does not exist in this sample application.</p>
      <div className="flex items-center justify-center gap-3">
        <Button asChild>
          <Link to="/">Return home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/showcase">Open showcase</Link>
        </Button>
      </div>
    </main>
  );
}
