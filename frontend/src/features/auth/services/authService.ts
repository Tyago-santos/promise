import { apiFetch, clearToken, getToken, setToken } from "@/shared/lib/httpClient";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type AuthResponse = { user: AuthUser; token: string };

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function logout(): void {
  clearToken();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const result = await apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(result.token);
  return result;
}

export async function register(input: { name: string; email: string; password: string }): Promise<AuthResponse> {
  const result = await apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: input,
  });
  setToken(result.token);
  return result;
}
