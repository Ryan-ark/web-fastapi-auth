import { Navigate, createBrowserRouter } from "react-router-dom";

import { ProtectedLayout } from "../components/layout/protected-layout";
import { AdminHomePage } from "../features/admin/pages/admin-home-page";
import { AdminSettingsPage } from "../features/admin/pages/admin-settings-page";
import { AdminUsersPage } from "../features/admin/pages/admin-users-page";
import { AuthGuard } from "../features/auth/components/auth-guard";
import { RoleGuard } from "../features/auth/components/role-guard";
import { LoginPage } from "../features/auth/pages/login-page";
import { UnauthorizedPage } from "../features/auth/pages/unauthorized-page";
import { DashboardPage } from "../features/dashboard/pages/dashboard-page";
import { ProductsPage } from "../features/products/pages/products-page";
import { ProfilePage } from "../features/profile/pages/profile-page";
import { NotFoundPage } from "../pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/",
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/app",
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/app/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            element: <RoleGuard roles={["admin"]} />,
            children: [
              {
                path: "admin",
                element: <AdminHomePage />,
              },
              {
                path: "admin/users",
                element: <AdminUsersPage />,
              },
              {
                path: "admin/settings",
                element: <AdminSettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
