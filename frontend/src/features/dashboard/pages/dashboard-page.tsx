import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/components/auth-provider";
import { useProducts } from "@/features/products/hooks/use-products";

export function DashboardPage() {
  const { user } = useAuth();
  const productsQuery = useProducts("");
  const totalProducts = productsQuery.data?.total ?? 0;

  return (
    <div className="page-stack">
      <Card className="border-border/60 bg-card/90">
        <CardHeader className="panel-header">
          <div>
            <p className="section-label">Dashboard</p>
            <CardTitle className="mt-2 text-3xl">Welcome back, {user?.full_name}</CardTitle>
          </div>
          <Badge variant="secondary" className="capitalize">
            {user?.role}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-6">
          <CardDescription className="max-w-2xl text-sm">
            The protected workspace restores sessions from secure cookies and enforces role checks in
            both the UI and the FastAPI backend.
          </CardDescription>
          <div className="dashboard-grid">
            <Card className="border-border/60 bg-background/70">
              <CardContent className="grid gap-2 p-5">
                <p className="section-label">Catalog</p>
                <strong className="text-3xl">{totalProducts}</strong>
                <p className="text-sm text-muted-foreground">Protected product records currently available.</p>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-background/70">
              <CardContent className="grid gap-2 p-5">
                <p className="section-label">Role scope</p>
                <strong className="text-3xl capitalize">{user?.role}</strong>
                <p className="text-sm text-muted-foreground">
                  {user?.role === "admin"
                    ? "Full access to products, users, and admin settings."
                    : user?.role === "manager"
                      ? "Operational access to protected product management."
                      : "Read-only access to the protected workspace."}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-background/70">
              <CardContent className="grid gap-3 p-5">
                <p className="section-label">Next step</p>
                <p className="text-sm text-muted-foreground">
                  Move between the protected pages to validate role-aware navigation and API
                  authorization end to end.
                </p>
                <Button asChild variant="outline" className="w-fit">
                  <Link to="/app/products">Open products</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
