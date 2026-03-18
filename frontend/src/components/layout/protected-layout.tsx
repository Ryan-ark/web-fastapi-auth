import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/components/auth-provider";

const baseNavItems = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/products", label: "Products" },
  { to: "/app/profile", label: "Profile" },
];

export function ProtectedLayout() {
  const navigate = useNavigate();
  const { user, logout, hasRole } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const navItems = hasRole("admin")
    ? [...baseNavItems, { to: "/app/admin", label: "Admin" }]
    : baseNavItems;

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="protected-header">
          <div className="grid gap-3">
            <Link to="/app/dashboard" className="space-y-1">
              <p className="section-label">Protected workspace</p>
              <h1 className="text-3xl font-semibold tracking-tight">Product Control Center</h1>
            </Link>
            <p className="text-sm text-muted-foreground">
              Authenticated pages, role-aware navigation, and secure backend authorization.
            </p>
          </div>
          <div className="account-panel">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.full_name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Badge variant="secondary" className="capitalize">
              {user?.role}
            </Badge>
            <Button type="button" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        <nav className="nav-strip">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-pill nav-pill--active" : "nav-pill")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
