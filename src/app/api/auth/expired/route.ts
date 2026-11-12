import { NextResponse, type NextRequest } from "next/server";

import { clearSessionCookie } from "@/lib/session";

/**
 * Destino do layout autenticado quando a sessão não vale mais (token expirado,
 * inválido ou backend fora do ar).
 *
 * Server Components não podem apagar cookies, então o layout redireciona para cá:
 * o cookie é apagado e o usuário segue para o login. Se o layout fosse direto
 * para /login com o cookie ainda presente, o proxy.ts mandaria de volta para
 * /painel, num loop infinito de redirecionamentos.
 */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  clearSessionCookie(response);
  return response;
}
