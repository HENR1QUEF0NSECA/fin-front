import "server-only";

import { BACKEND_ROUTES } from "./api-routes";
import { backendFetch } from "./backend";
import { getSessionToken } from "./session";

export type SessionUser = {
  nome: string;
};

/** GET /users/me devolve os dados do token: { userId, nome, mensagem }. */
type MeResponse = {
  userId?: number;
  nome?: string;
};

/**
 * Busca o usuário autenticado via GET /users/me usando o token do cookie.
 * Retorna null se não há sessão ou o token foi rejeitado.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const me = await backendFetch<MeResponse>(BACKEND_ROUTES.users.me, { token });
    return { nome: me.nome?.trim() || "Usuário" };
  } catch {
    // Token inválido/expirado ou backend offline — tratamos como sem sessão.
    return null;
  }
}
