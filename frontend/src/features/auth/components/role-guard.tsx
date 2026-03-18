import { Navigate, Outlet } from "react-router-dom";

import { UserRole } from "../types/auth";
import { useAuth } from "./auth-provider";

type RoleGuardProps = {
  roles: UserRole[];
};

export function RoleGuard({ roles }: RoleGuardProps) {
  const { hasRole } = useAuth();

  if (!hasRole(...roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
