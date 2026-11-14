import "server-only";

import { BACKEND_ROUTES } from "./api-routes";
import { backendFetch } from "./backend";
import { getSessionToken } from "./session";

export type SessionUser = {
  nome: string;
};

type MeResponse = {
  id?: number;
  nome?: string;
  email?: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const me = await backendFetch<MeResponse>(BACKEND_ROUTES.users.me, { token });
    return { nome: me.nome?.trim() || "Usuário" };
  } catch {
    return null;
  }
}
