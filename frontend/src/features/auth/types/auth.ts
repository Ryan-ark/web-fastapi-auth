export type UserRole = "admin" | "manager" | "viewer";

export type AuthUser = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AuthSession = {
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};
