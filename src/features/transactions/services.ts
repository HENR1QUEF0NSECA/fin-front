import { apiFetch } from "@/lib/api-fetch";
import { BACKEND_ROUTES } from "@/lib/api-routes";
import { asNumber, asString, isRecord } from "@/lib/parse";

import type {
  BackendTransactionType,
  SavedTransaction,
  Transaction,
  TransactionInput,
  TransactionType,
} from "./types";

function toBackendType(tipo: TransactionType): BackendTransactionType {
  return tipo === "RECEITA" ? "R" : "D";
}

function toBackendBody(input: TransactionInput) {
  return {
    tipo: toBackendType(input.tipo),
    valor: input.valor,
    categoriaId: input.idCategoria,
    descricao: input.descricao,
    data: input.data,
  };
}

function normalizeTransaction(raw: unknown): Transaction | null {
  if (!isRecord(raw)) return null;

  const id = asNumber(raw.id);
  const idCategoria = asNumber(raw.categoriaId);
  const valor = asNumber(raw.valor);
  const tipo = raw.tipo;
  if (id === null || idCategoria === null || valor === null) return null;
  if (tipo !== "R" && tipo !== "D") return null;

  return {
    id,
    tipo,
    valor,
    idCategoria,
    nomeCategoria: asString(raw.nomeCategoria),
    descricao: asString(raw.descricao) ?? "",
    data: asString(raw.dataHoraTransacao),
  };
}

function toSavedTransaction(raw: unknown): SavedTransaction {
  const normalized = normalizeTransaction(raw);
  if (!normalized) {
    throw new Error("Resposta do servidor em formato inesperado");
  }
  const alerta = isRecord(raw) && raw.alertaOrcamento === true;
  return { ...normalized, alertaOrcamento: alerta };
}

export async function listTransactions(): Promise<Transaction[]> {
  const data = await apiFetch<unknown>(BACKEND_ROUTES.transactions.list);
  if (!Array.isArray(data)) return [];
  return data
    .map(normalizeTransaction)
    .filter((t): t is Transaction => t !== null);
}

export async function createTransaction(input: TransactionInput): Promise<SavedTransaction> {
  const raw = await apiFetch<unknown>(BACKEND_ROUTES.transactions.create, {
    method: "POST",
    body: toBackendBody(input),
  });
  return toSavedTransaction(raw);
}

export async function updateTransaction(
  id: number | string,
  input: TransactionInput,
): Promise<SavedTransaction> {
  const raw = await apiFetch<unknown>(BACKEND_ROUTES.transactions.update(id), {
    method: "PUT",
    body: toBackendBody(input),
  });
  return toSavedTransaction(raw);
}

export async function deleteTransaction(id: number | string): Promise<void> {
  await apiFetch<unknown>(BACKEND_ROUTES.transactions.delete(id), {
    method: "DELETE",
  });
}
