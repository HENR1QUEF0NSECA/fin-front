"use client";

import { Trash2, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/format";

import { INVESTMENT_TYPE_LABELS, type Investment } from "../types";

type InvestmentListProps = {
  data?: Investment[];
  isLoading: boolean;
  error?: Error | null;
  onDelete: (investment: Investment) => void;
  onRetry?: () => void;
};

export function InvestmentList({ data, isLoading, error, onDelete, onRetry }: InvestmentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2" aria-busy="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="Não foi possível carregar os investimentos"
        description={error.message}
        action={
          onRetry ? (
            <Button variant="outline" onClick={onRetry}>
              Tentar novamente
            </Button>
          ) : undefined
        }
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="Nenhum investimento ainda"
        description="Registre seu primeiro investimento para vê-lo aqui e no painel."
      />
    );
  }

  return (
    <Card className="divide-y divide-border">
      {data.map((i) => (
        <div key={i.id} className="flex items-center gap-4 px-5 py-4">
          <span className="grid place-items-center rounded-full bg-info/15 p-2.5 text-info" aria-hidden>
            <TrendingUp className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{i.descricao}</p>
            <p className="text-xs text-muted-foreground">
              {INVESTMENT_TYPE_LABELS[i.tipo]} · {formatDate(`${i.data}T00:00:00`)}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-info">
            {formatCurrency(i.valor)}
          </p>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Excluir ${i.descricao}`}
            onClick={() => onDelete(i)}
            className="shrink-0 text-muted-foreground hover:text-danger"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      ))}
    </Card>
  );
}
