"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

import { useInvestments } from "../hooks";
import type { Investment } from "../types";
import { DeleteInvestmentDialog } from "./delete-investment-dialog";
import { InvestmentFormDialog } from "./investment-form-dialog";
import { InvestmentList } from "./investment-list";

export function InvestmentsView() {
  const [formOpen, setFormOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Investment | null>(null);

  const query = useInvestments();
  const total = (query.data ?? []).reduce((sum, i) => sum + i.valor, 0);

  return (
    <>
      <PageHeader
        title="Investimentos"
        description="Registre o que você investiu e acompanhe o total aplicado."
        actions={
          <Button onClick={() => setFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden />
            Novo Investimento
          </Button>
        }
      />

      {query.data && query.data.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          Total investido:{" "}
          <span className="font-semibold tabular-nums text-foreground">{formatCurrency(total)}</span>
        </p>
      ) : null}

      <InvestmentList
        data={query.data}
        isLoading={query.isLoading}
        error={query.error as Error | null}
        onDelete={setToDelete}
        onRetry={() => query.refetch()}
      />

      <InvestmentFormDialog open={formOpen} onClose={() => setFormOpen(false)} />
      <DeleteInvestmentDialog investment={toDelete} onClose={() => setToDelete(null)} />
    </>
  );
}
