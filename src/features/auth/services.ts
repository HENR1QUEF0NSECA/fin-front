import { apiFetch } from "@/lib/api-fetch";
import { API_ROUTES } from "@/lib/api-routes";
import { clearToken, setToken } from "@/lib/auth-token";

import type { LoginFormValues, RegisterFormValues } from "./schemas";

export type UsuarioLogado = {
  id: number;
  nome: string;
  email: string;
};

export async function login(values: LoginFormValues): Promise<void> {
  const resposta = await apiFetch<{ token: string }>(API_ROUTES.auth.login, {
    method: "POST",
    body: values,
  });
  setToken(resposta.token);
}

export async function register(values: RegisterFormValues): Promise<void> {
  await apiFetch(API_ROUTES.auth.register, {
    method: "POST",
    body: { nome: values.nome, email: values.email, senha: values.senha },
  });
}

export function logout(): void {
  clearToken();
}

export function fetchUsuarioLogado(): Promise<UsuarioLogado> {
  return apiFetch<UsuarioLogado>(API_ROUTES.users.me);
}
