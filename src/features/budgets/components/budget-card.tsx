"use client";

import { AlertTriangle, CheckCircle2, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, MONTH_SHORT_LABELS } from "@/lib/format";
import { cn } from "@/lib/utils";

import type { Budget } from "../types";

type BudgetCardProps = {
  budget: Budget;
  onRequestEdit: (budget: Budget) => void;
  onRequestDelete: (budget: Budget) => void;
};

export function BudgetCard({
  budget,
  onRequestEdit,
  onRequestDelete,
}: BudgetCardProps) {
  const spent = budget.consumido;
  const categoryName = budget.nomeCategoria;

  const limit = Math.max(budget.limite, 0.0001);
  const pct = (spent / limit) * 100;
  const isOver = spent > budget.limite;
  const isNear = !isOver && pct >= 80;

  const tone = isOver ? "danger" : isNear ? "warning" : "success";
  const statusBadge = isOver ? (
    <Badge tone="danger">Estourado</Badge>
  ) : isNear ? (
    <Badge tone="warning">Atenção</Badge>
  ) : (
    <Badge tone="success">Dentro do limite</Badge>
  );
  const StatusIcon = isOver ? AlertTriangle : isNear ? AlertTriangle : CheckCircle2;
  const statusTone = isOver
    ? "bg-danger/15 text-danger"
    : isNear
      ? "bg-warning/15 text-warning"
      : "bg-success/15 text-success";

  const monthLabel = MONTH_SHORT_LABELS[Math.min(11, Math.max(0, budget.mes - 1))];

  return (
    <Card className={cn(isOver && "ring-2 ring-danger/60 ring-offset-2 ring-offset-background")}>
      <CardContent className="space-y-4 p-5">
        <header className="flex items-start gap-3">
          <span className={cn("grid place-items-center rounded-full p-2", statusTone)} aria-hidden>
            <StatusIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="max-w-full truncate font-semibold">{categoryName}</h3>
              {statusBadge}
            </div>
            <p className="text-xs text-muted-foreground">
              {monthLabel}/{budget.ano} · Orçamento mensal
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Editar orçamento de ${categoryName}`}
              onClick={() => onRequestEdit(budget)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Excluir orçamento de ${categoryName}`}
              onClick={() => onRequestDelete(budget)}
              className="text-muted-foreground hover:text-danger"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </header>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm tabular-nums">
              <span className="font-semibold">{formatCurrency(spent)}</span>
              <span className="text-muted-foreground"> / {formatCurrency(budget.limite)}</span>
            </span>
            <span
              className={cn(
                "text-xs font-medium tabular-nums",
                isOver ? "text-danger" : isNear ? "text-warning" : "text-muted-foreground",
              )}
            >
              {Math.round(pct)}% usado
            </span>
          </div>
          <Progress
            value={pct}
            tone={tone}
            label={`Uso: ${Math.round(pct)} por cento`}
          />
          {isOver ? (
            <p className="text-xs text-danger">
              Excedeu em {formatCurrency(spent - budget.limite)}.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
