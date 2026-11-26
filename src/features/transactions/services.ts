import { apiFetch } from "@/lib/api-fetch";
import { API_ROUTES } from "@/lib/api-routes";

import type { Transaction, TransactionInput } from "./types";

export function listTransactions(): Promise<Transaction[]> {
  return apiFetch<Transaction[]>(API_ROUTES.transactions.list);
}

export function createTransaction(input: TransactionInput): Promise<Transaction> {
  return apiFetch<Transaction>(API_ROUTES.transactions.create, { method: "POST", body: input });
}

export function updateTransaction(id: number, input: TransactionInput): Promise<Transaction> {
  return apiFetch<Transaction>(API_ROUTES.transactions.update(id), { method: "PUT", body: input });
}

export function deleteTransaction(id: number): Promise<void> {
  return apiFetch<void>(API_ROUTES.transactions.delete(id), { method: "DELETE" });
}
