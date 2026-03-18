import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

import { useAuth } from "./auth-provider";

export function AuthGuard() {
  const location = useLocation();
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return (
      <div className="page-stack">
        <Card className="border-border/60 bg-card/85">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Restoring your session...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
