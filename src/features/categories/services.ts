import { apiFetch } from "@/lib/api-fetch";
import { BACKEND_ROUTES } from "@/lib/api-routes";
import { asNumber, asString, isRecord } from "@/lib/parse";

import type { Category } from "./types";

/** GET /categoria devolve [{ id, nome }]; itens incompletos são descartados. */
function normalize(payload: unknown): Category[] {
  if (!Array.isArray(payload)) return [];
  return payload.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    const id = asNumber(entry.id);
    const nome = asString(entry.nome);
    return id !== null && nome ? [{ id, nome }] : [];
  });
}

export async function listCategories(): Promise<Category[]> {
  const raw = await apiFetch<unknown>(BACKEND_ROUTES.categories.list);
  return normalize(raw);
}
