import { apiFetch } from "@/lib/api-fetch";
import { API_ROUTES } from "@/lib/api-routes";

import type { Budget, BudgetInput } from "./types";

export function listBudgets(): Promise<Budget[]> {
  return apiFetch<Budget[]>(API_ROUTES.budgets.list);
}

export function createBudget(input: BudgetInput): Promise<Budget> {
  return apiFetch<Budget>(API_ROUTES.budgets.create, { method: "POST", body: input });
}

export function updateBudget(id: number, input: BudgetInput): Promise<Budget> {
  return apiFetch<Budget>(API_ROUTES.budgets.update(id), { method: "PUT", body: input });
}

export function deleteBudget(id: number): Promise<void> {
  return apiFetch<void>(API_ROUTES.budgets.delete(id), { method: "DELETE" });
}
