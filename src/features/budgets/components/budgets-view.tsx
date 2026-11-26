"use client";

import { Plus, Target } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useBudgets } from "@/features/budgets/hooks";

import type { Budget } from "../types";
import { BudgetCard } from "./budget-card";
import { BudgetFormDialog } from "./budget-form-dialog";
import { DeleteBudgetDialog } from "./delete-budget-dialog";

export function BudgetsView() {
  const budgets = useBudgets();

  const [form, setForm] = useState<{ open: boolean; budget: Budget | null }>({
    open: false,
    budget: null,
  });
  const openNew = () => setForm({ open: true, budget: null });
  const [toDelete, setToDelete] = useState<Budget | null>(null);

  const items = useMemo(() => {
    const list = budgets.data ?? [];
    return [...list].sort((a, b) => {
      if (a.ano !== b.ano) return b.ano - a.ano;
      return b.mes - a.mes;
    });
  }, [budgets.data]);

  return (
    <>
      <PageHeader
        title="Orçamentos"
        description="Defina limites de gastos por categoria e mês."
        actions={
          <Button onClick={openNew} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden />
            Novo Orçamento
          </Button>
        }
      />

      {budgets.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      ) : budgets.error ? (
        <EmptyState
          icon={Target}
          title="Não foi possível carregar seus orçamentos"
          description={(budgets.error as Error).message}
          action={
            <Button variant="outline" onClick={() => budgets.refetch()}>
              Tentar novamente
            </Button>
          }
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Target}
          title="Nenhum orçamento cadastrado"
          description="Crie um orçamento por categoria e mês para acompanhar seus limites de gasto."
          action={
            <Button onClick={openNew} className="gap-2">
              <Plus className="h-4 w-4" aria-hidden />
              Novo Orçamento
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((b) => (
            <BudgetCard
              key={b.id}
              budget={b}
              onRequestEdit={(budget) => setForm({ open: true, budget })}
              onRequestDelete={setToDelete}
            />
          ))}
        </div>
      )}

      <BudgetFormDialog
        open={form.open}
        budget={form.budget}
        onClose={() => setForm((current) => ({ ...current, open: false }))}
      />
      <DeleteBudgetDialog
        budget={toDelete}
        onClose={() => setToDelete(null)}
      />
    </>
  );
}
