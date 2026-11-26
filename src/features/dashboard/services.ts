import { apiFetch } from "@/lib/api-fetch";
import { API_ROUTES } from "@/lib/api-routes";

import type { DashboardEvolucao, DashboardResumo } from "./types";

export function fetchResumo(mes: number, ano: number): Promise<DashboardResumo> {
  return apiFetch<DashboardResumo>(API_ROUTES.dashboard.resumo, { searchParams: { mes, ano } });
}

export function fetchEvolucao(ano: number): Promise<DashboardEvolucao> {
  return apiFetch<DashboardEvolucao>(API_ROUTES.dashboard.evolucao, { searchParams: { ano } });
}
