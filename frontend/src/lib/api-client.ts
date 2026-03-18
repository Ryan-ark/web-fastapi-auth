import { env } from "./env";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  skipAuthRetry?: boolean;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Request failed.";

    try {
      const errorData = (await response.json()) as { detail?: string };
      if (errorData.detail) {
        message = errorData.detail;
      }
    } catch {
      message = response.statusText || message;
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

let refreshRequest: Promise<Response> | null = null;

async function refreshSession() {
  if (!refreshRequest) {
    refreshRequest = fetch(`${env.apiBaseUrl}/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      refreshRequest = null;
    }) as Promise<Response>;
  }

  const response = await refreshRequest;
  if (!response.ok) {
    throw new ApiError("Authentication required.", response.status);
  }
}

export async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(url, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (
    response.status === 401 &&
    !options.skipAuthRetry &&
    !url.includes("/auth/login") &&
    !url.includes("/auth/refresh") &&
    !url.includes("/auth/logout")
  ) {
    await refreshSession();
    return apiRequest<T>(url, { ...options, skipAuthRetry: true });
  }

  return parseResponse<T>(response);
}
