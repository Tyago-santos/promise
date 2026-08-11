const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";
const TOKEN_STORAGE_KEY = "promise_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export class ApiRequestError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & { body?: unknown };

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;
  const isFormData = body instanceof FormData;

  const finalHeaders = new Headers(headers);
  if (!isFormData) finalHeaders.set("Content-Type", "application/json");
  const token = getToken();
  if (token) finalHeaders.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: isFormData ? (body as FormData) : body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) return undefined as T;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && token) {
      clearToken();
      window.location.href = "/login";
    }

    const message =
      data && typeof data === "object" && typeof data.message === "string"
        ? data.message
        : "Ocorreu um erro. Tente novamente.";
    throw new ApiRequestError(response.status, message, data?.details);
  }

  return data as T;
}
