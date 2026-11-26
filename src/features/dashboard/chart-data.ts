import { MONTH_SHORT_LABELS } from "@/lib/format";

import type { DashboardEvolucao, TotalPorCategoria } from "./types";

export type MonthlyPoint = {
  monthKey: string;
  label: string;
  receita: number;
  despesa: number;
};

export type FlowPoint = MonthlyPoint & { economia: number };

export type CategorySlice = {
  categoria: string;
  total: number;
  share: number;
};

export function toMonthlySeries(evolucao: DashboardEvolucao): MonthlyPoint[] {
  return MONTH_SHORT_LABELS.map((label, idx) => {
    const mes = idx + 1;
    return {
      monthKey: `${evolucao.ano}-${String(mes).padStart(2, "0")}`,
      label: `${label}/${String(evolucao.ano).slice(-2)}`,
      receita: evolucao.receitas.find((r) => r.mes === mes)?.total ?? 0,
      despesa: evolucao.despesas.find((d) => d.mes === mes)?.total ?? 0,
    };
  });
}

export function toFlowSeries(evolucao: DashboardEvolucao): FlowPoint[] {
  return toMonthlySeries(evolucao).map((p) => ({
    ...p,
    economia: Math.max(0, p.receita - p.despesa),
  }));
}

export function toCategorySlices(categorias: TotalPorCategoria[]): CategorySlice[] {
  const grand = categorias.reduce((sum, c) => sum + c.total, 0);
  if (grand === 0) return [];
  return categorias
    .map((c) => ({ categoria: c.categoria, total: c.total, share: c.total / grand }))
    .sort((a, b) => b.total - a.total);
}
