import { apiFetch } from "@/lib/api-fetch";
import { BACKEND_ROUTES } from "@/lib/api-routes";
import { asNumber, asString, isRecord } from "@/lib/parse";

import type { Budget, CreateBudgetInput } from "./types";

/**
 * Converte o OrcamentoResponseDTO do backend
 * ({ id, categoriaId, nomeCategoria, mes, ano, limite, consumido, ... })
 * para o formato da UI. Descarta itens sem os campos obrigatórios.
 */
function normalizeBudget(raw: unknown): Budget | null {
  if (!isRecord(raw)) return null;

  const id = asNumber(raw.id);
  const idCategoria = asNumber(raw.categoriaId);
  const mes = asNumber(raw.mes);
  const ano = asNumber(raw.ano);
  const limite = asNumber(raw.limite);

  if (id === null || idCategoria === null || mes === null || ano === null || limite === null) {
    return null;
  }

  return {
    id,
    idCategoria,
    nomeCategoria: asString(raw.nomeCategoria),
    mes,
    ano,
    limite,
    gasto: asNumber(raw.consumido) ?? 0,
  };
}

export async function listBudgets(): Promise<Budget[]> {
  const data = await apiFetch<unknown>(BACKEND_ROUTES.budgets.list);
  if (!Array.isArray(data)) return [];
  return data.map(normalizeBudget).filter((b): b is Budget => b !== null);
}

export async function createBudget(input: CreateBudgetInput): Promise<Budget> {
  const raw = await apiFetch<unknown>(BACKEND_ROUTES.budgets.create, {
    method: "POST",
    body: {
      categoriaId: input.idCategoria,
      mes: input.mes,
      ano: input.ano,
      limite: input.limite,
    },
  });
  const normalized = normalizeBudget(raw);
  if (!normalized) throw new Error("Resposta do servidor em formato inesperado");
  return normalized;
}

export async function deleteBudget(id: number | string): Promise<void> {
  await apiFetch<unknown>(BACKEND_ROUTES.budgets.delete(id), {
    method: "DELETE",
  });
}
