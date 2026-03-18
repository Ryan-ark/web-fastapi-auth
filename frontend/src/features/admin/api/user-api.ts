import { apiRequest } from "@/lib/api-client";
import { env } from "@/lib/env";
import { AuthUser, UserRole } from "@/features/auth/types/auth";

type CreateUserPayload = {
  email: string;
  full_name: string;
  password: string;
  role: UserRole;
  is_active: boolean;
};

const usersBaseUrl = `${env.apiBaseUrl}/v1/users`;

export function fetchUsers(): Promise<AuthUser[]> {
  return apiRequest<AuthUser[]>(usersBaseUrl);
}

export function createUser(payload: CreateUserPayload): Promise<AuthUser> {
  return apiRequest<AuthUser>(usersBaseUrl, {
    method: "POST",
    body: payload,
  });
}

export function updateUserRole(userId: string, role: UserRole): Promise<AuthUser> {
  return apiRequest<AuthUser>(`${usersBaseUrl}/${userId}/role`, {
    method: "PATCH",
    body: { role },
  });
}

export function updateUserStatus(userId: string, isActive: boolean): Promise<AuthUser> {
  return apiRequest<AuthUser>(`${usersBaseUrl}/${userId}/status`, {
    method: "PATCH",
    body: { is_active: isActive },
  });
}
