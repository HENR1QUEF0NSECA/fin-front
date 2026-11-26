"use client";

import { AlertTriangle, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/features/transactions/hooks";
import type {
  Transaction,
  TransactionFilters,
} from "@/features/transactions/types";

import { DeleteTransactionDialog } from "./delete-transaction-dialog";
import { TransactionFiltersBar } from "./transaction-filters";
import { TransactionFormDialog } from "./transaction-form-dialog";
import { TransactionList } from "./transaction-list";

const INITIAL_FILTERS: TransactionFilters = {
  descricao: "",
  tipo: "TODOS",
  categoriaId: "TODAS",
};

function hasActive(filters: TransactionFilters): boolean {
  return filters.descricao.trim() !== "" || filters.tipo !== "TODOS" || filters.categoriaId !== "TODAS";
}

export function TransactionsView() {
  const [filters, setFilters] = useState<TransactionFilters>(INITIAL_FILTERS);
  const [form, setForm] = useState<{ open: boolean; transaction: Transaction | null }>({
    open: false,
    transaction: null,
  });
  const [toDelete, setToDelete] = useState<Transaction | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const query = useTransactions();

  const items = useMemo(() => {
    const term = filters.descricao.trim().toLowerCase();
    return (query.data ?? []).filter(
      (t) =>
        (filters.tipo === "TODOS" || t.tipo === filters.tipo) &&
        (filters.categoriaId === "TODAS" || t.categoriaId === filters.categoriaId) &&
        (t.descricao ?? "").toLowerCase().includes(term),
    );
  }, [query.data, filters]);

  return (
    <>
      <PageHeader
        title="Transações"
        description="Cadastre e acompanhe suas receitas e despesas."
        actions={
          <Button onClick={() => setForm({ open: true, transaction: null })} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden />
            Nova Transação
          </Button>
        }
      />

      {alert ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p className="flex-1">{alert}</p>
          <button
            type="button"
            onClick={() => setAlert(null)}
            aria-label="Dispensar aviso"
            className="rounded p-1 hover:bg-warning/20"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : null}

      <TransactionFiltersBar value={filters} onChange={setFilters} />

      <TransactionList
        data={items}
        isLoading={query.isLoading}
        error={query.error as Error | null}
        hasActiveFilters={hasActive(filters)}
        onEdit={(transaction) => setForm({ open: true, transaction })}
        onDelete={setToDelete}
        onRetry={() => query.refetch()}
        onClearFilters={() => setFilters(INITIAL_FILTERS)}
      />

      <TransactionFormDialog
        open={form.open}
        transaction={form.transaction}
        onClose={() => setForm((current) => ({ ...current, open: false }))}
        onSaved={(res) => {
          if (res.alertaOrcamento) {
            setAlert(
              "Atenção: com esta transação, você já usou 80% ou mais do orçamento desta categoria no mês.",
            );
          }
        }}
      />
      <DeleteTransactionDialog
        transaction={toDelete}
        onClose={() => setToDelete(null)}
      />
    </>
  );
}
