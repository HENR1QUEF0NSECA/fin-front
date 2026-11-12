/**
 * Extrai a mensagem de erro de um corpo de resposta JSON, ou null se não houver.
 *
 * Formatos tratados:
 * - backend Spring (handler global): { status, erro, campos?, timestamp }. Em erro
 *   de validação, `erro` é genérico ("Dados inválidos") e `campos` traz a mensagem
 *   de cada campo, que é o que o usuário precisa ler;
 * - rotas do próprio Next (BFF): { error };
 * - resposta padrão do Spring fora do handler global: { error, message }.
 */
export function extractErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;

  if (obj.campos && typeof obj.campos === "object") {
    const fieldMessages = Object.values(obj.campos as Record<string, unknown>).filter(
      (m): m is string => typeof m === "string" && m.trim().length > 0,
    );
    if (fieldMessages.length > 0) return fieldMessages.join(". ");
  }

  for (const key of ["erro", "message", "error"]) {
    const value = obj[key];
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return null;
}
