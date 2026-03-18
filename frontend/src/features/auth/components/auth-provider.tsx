import { ReactNode, createContext, startTransition, useContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe, login, logout } from "../api/auth-api";
import { AuthUser, LoginPayload, UserRole } from "../types/auth";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
  hasRole: (...roles: UserRole[]) => boolean;
};

const authQueryKey = ["auth", "me"];
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const sessionQuery = useQuery({
    queryKey: authQueryKey,
    queryFn: getMe,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (session) => {
      startTransition(() => {
        queryClient.setQueryData(authQueryKey, session.user);
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      startTransition(() => {
        queryClient.setQueryData(authQueryKey, null);
      });
      await queryClient.invalidateQueries();
    },
  });

  const value = useMemo<AuthContextValue>(() => {
    const user = sessionQuery.data ?? null;
    return {
      user,
      isAuthenticated: Boolean(user),
      isBootstrapping: sessionQuery.isLoading,
      login: async (payload) => {
        const session = await loginMutation.mutateAsync(payload);
        return session.user;
      },
      logout: async () => {
        await logoutMutation.mutateAsync();
      },
      hasRole: (...roles) => Boolean(user && roles.includes(user.role)),
    };
  }, [loginMutation, logoutMutation, sessionQuery.data, sessionQuery.isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return value;
}
