"use client";

import { useMemo } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { toFlowSeries, toMonthlySeries } from "@/features/dashboard/chart-data";
import { useDashboardEvolucao } from "@/features/dashboard/hooks";

import { FlowTrendChart } from "./flow-trend-chart";
import { MonthlyComparisonChart } from "./monthly-comparison-chart";

export function ReportsView() {
  const ano = new Date().getFullYear();
  const evolucao = useDashboardEvolucao(ano);

  const flow = useMemo(
    () => (evolucao.data ? toFlowSeries(evolucao.data) : []),
    [evolucao.data],
  );
  const monthly = useMemo(
    () => (evolucao.data ? toMonthlySeries(evolucao.data) : []),
    [evolucao.data],
  );

  return (
    <>
      <PageHeader
        title="Relatórios"
        description="Tendências e comparativos das suas finanças."
      />

      <section className="grid gap-4">
        <FlowTrendChart data={flow} isLoading={evolucao.isLoading} />
        <MonthlyComparisonChart data={monthly} isLoading={evolucao.isLoading} />
      </section>
    </>
  );
}
