import "server-only";

import { BACKEND_ROUTES } from "./api-routes";
import { backendFetch } from "./backend";
import { getSessionToken } from "./session";

export type SessionUser = {
  nome: string;
};

/** GET /usuarios/me devolve o UsuarioResponseDTO: { id, nome, email, dataInclusao }. */
type MeResponse = {
  id?: number;
  nome?: string;
  email?: string;
};

/**
 * Busca o usuário autenticado via GET /usuarios/me usando o token do cookie.
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
