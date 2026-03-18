type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

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

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return parseResponse<T>(response);
}
