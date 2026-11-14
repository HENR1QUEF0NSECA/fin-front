import { apiFetch } from "@/lib/api-fetch";
import { BACKEND_ROUTES } from "@/lib/api-routes";
import { asNumber, asString, isRecord } from "@/lib/parse";

import type {
  DashboardEvolucao,
  DashboardResumo,
  EvolucaoMes,
  ResumoCategoria,
} from "./types";

function num(value: unknown): number {
  return asNumber(value) ?? 0;
}

function normalizeResumo(payload: unknown): DashboardResumo {
  const obj = isRecord(payload) ? payload : {};
  const categorias: ResumoCategoria[] = Array.isArray(obj.despesasPorCategoria)
    ? obj.despesasPorCategoria.flatMap((entry) => {
        if (!isRecord(entry)) return [];
        const nome = asString(entry.categoria);
        return nome ? [{ nome, total: num(entry.total) }] : [];
      })
    : [];
  return {
    totalReceitas: num(obj.totalReceitas),
    totalDespesas: num(obj.totalDespesas),
    saldo: num(obj.saldo),
    categorias,
  };
}

function normalizeEvolucao(payload: unknown, ano: number): DashboardEvolucao {
  const obj = isRecord(payload) ? payload : {};
  const byMonth = new Map<number, EvolucaoMes>();

  const add = (entries: unknown, key: "receitas" | "despesas") => {
    if (!Array.isArray(entries)) return;
    for (const entry of entries) {
      if (!isRecord(entry)) continue;
      const mes = asNumber(entry.mes);
      if (mes === null || mes < 1 || mes > 12) continue;
      const current = byMonth.get(mes) ?? { mes, receitas: 0, despesas: 0 };
      current[key] = num(entry.total);
      byMonth.set(mes, current);
    }
  };

  add(obj.receitas, "receitas");
  add(obj.despesas, "despesas");

  return {
    ano: asNumber(obj.ano) ?? ano,
    meses: Array.from(byMonth.values()).sort((a, b) => a.mes - b.mes),
  };
}

export async function fetchResumo(
  mes: number,
  ano: number,
): Promise<DashboardResumo> {
  const raw = await apiFetch<unknown>(BACKEND_ROUTES.dashboard.resumo, {
    searchParams: { mes: String(mes), ano: String(ano) },
  });
  return normalizeResumo(raw);
}

export async function fetchEvolucao(ano: number): Promise<DashboardEvolucao> {
  const raw = await apiFetch<unknown>(BACKEND_ROUTES.dashboard.evolucao, {
    searchParams: { ano: String(ano) },
  });
  return normalizeEvolucao(raw, ano);
}
