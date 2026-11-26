import { apiFetch } from "@/lib/api-fetch";
import { API_ROUTES } from "@/lib/api-routes";

import type { Investment, InvestmentInput } from "./types";

export function listInvestments(): Promise<Investment[]> {
  return apiFetch<Investment[]>(API_ROUTES.investments.list);
}

export function createInvestment(input: InvestmentInput): Promise<Investment> {
  return apiFetch<Investment>(API_ROUTES.investments.create, { method: "POST", body: input });
}

export function deleteInvestment(id: number): Promise<void> {
  return apiFetch<void>(API_ROUTES.investments.delete(id), { method: "DELETE" });
}
