/**
 * Conversões tolerantes usadas pelos normalizadores das respostas da API.
 */

/** Número finito, aceitando também string numérica; senão null. */
export function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/** String não vazia; senão undefined. */
export function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
