import { BFF_ROUTES } from "@/lib/api-routes";

import type { LoginFormValues, RegisterFormValues } from "./schemas";

export class AuthApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

async function parseError(response: Response): Promise<AuthApiError> {
  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    // ignore
  }
  const message =
    (data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string"
      ? (data as { error: string }).error
      : null) ?? "Não foi possível concluir a operação";
  return new AuthApiError(response.status, message);
}

export async function login(values: LoginFormValues): Promise<void> {
  const res = await fetch(BFF_ROUTES.auth.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!res.ok) throw await parseError(res);
}

export async function register(values: RegisterFormValues): Promise<void> {
  const res = await fetch(BFF_ROUTES.auth.register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!res.ok) throw await parseError(res);
}

export async function logout(): Promise<void> {
  await fetch(BFF_ROUTES.auth.logout, { method: "POST" });
}
