"use client";

import { ArrowDownCircle, ArrowUpCircle, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { useTransactions } from "@/features/transactions/hooks";
import { formatLongDate } from "@/lib/format";

import { toCategorySlices, toMonthlySeries } from "../chart-data";
import { useDashboardEvolucao, useDashboardResumo } from "../hooks";
import { CategoryChart } from "./category-chart";
import { IncomeExpenseChart } from "./income-expense-chart";
import { RecentActivity } from "./recent-activity";
import { StatCard } from "./stat-card";

export function DashboardView() {
  const now = new Date();
  const mes = now.getMonth() + 1;
  const ano = now.getFullYear();

  const resumo = useDashboardResumo(mes, ano);
  const evolucao = useDashboardEvolucao(ano);
  const transactions = useTransactions();

  const summary = resumo.data ?? { totalReceitas: 0, totalDespesas: 0, saldo: 0, totalInvestido: 0 };

  const monthly = useMemo(
    () =>
      evolucao.data
        ? toMonthlySeries(evolucao.data)
        : [],
    [evolucao.data],
  );

  const categorySlices = useMemo(
    () => (resumo.data ? toCategorySlices(resumo.data.despesasPorCategoria) : []),
    [resumo.data],
  );

  const recents = (transactions.data ?? []).slice(0, 5);

  const economia = Math.max(0, summary.saldo);
  const saldoTotal = useMemo(
    () =>
      (transactions.data ?? []).reduce(
        (sum, t) => sum + (t.tipo === "R" ? t.valor : -t.valor),
        0,
      ),
    [transactions.data],
  );

  return (
    <>
      <PageHeader
        title="Painel"
        description={`Bem-vindo ao seu controle financeiro · ${formatLongDate(now)}`}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Receita"
          value={resumo.isLoading ? null : summary.totalReceitas}
          icon={ArrowUpCircle}
          tone="success"
          hint="Neste mês"
          isLoading={resumo.isLoading}
        />
        <StatCard
          label="Despesas"
          value={resumo.isLoading ? null : summary.totalDespesas}
          icon={ArrowDownCircle}
          tone="danger"
          hint="Neste mês"
          isLoading={resumo.isLoading}
        />
        <StatCard
          label="Investido"
          value={resumo.isLoading ? null : summary.totalInvestido}
          icon={TrendingUp}
          tone="info"
          hint="Neste mês"
          isLoading={resumo.isLoading}
        />
        <StatCard
          label="Economia"
          value={resumo.isLoading ? null : economia}
          icon={PiggyBank}
          tone="info"
          hint="Quanto sobrou neste mês"
          isLoading={resumo.isLoading}
        />
        <div className="sm:col-span-2">
          <StatCard
            label="Saldo Total"
            value={transactions.isLoading ? null : saldoTotal}
            icon={Wallet}
            tone="primary"
            hint="Todas as transações"
            isLoading={transactions.isLoading}
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <IncomeExpenseChart data={monthly} isLoading={evolucao.isLoading} />
        <CategoryChart data={categorySlices} isLoading={resumo.isLoading} />
      </section>

      <section>
        <RecentActivity data={recents} isLoading={transactions.isLoading} />
      </section>
    </>
  );
}
