import { apiRequest } from "@/lib/api-client";
import { env } from "@/lib/env";

import { AuthSession, AuthUser, LoginPayload } from "../types/auth";

const authBaseUrl = `${env.apiBaseUrl}/v1/auth`;

export function getMe(): Promise<AuthUser> {
  return apiRequest<AuthUser>(`${authBaseUrl}/me`);
}

export function login(payload: LoginPayload): Promise<AuthSession> {
  return apiRequest<AuthSession>(`${authBaseUrl}/login`, {
    method: "POST",
    body: payload,
  });
}

export function logout(): Promise<void> {
  return apiRequest<void>(`${authBaseUrl}/logout`, {
    method: "POST",
    skipAuthRetry: true,
  });
}
