"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ApiError } from "@/lib/api-fetch";

import { useDeleteInvestment } from "../hooks";
import type { Investment } from "../types";

type DeleteInvestmentDialogProps = {
  investment: Investment | null;
  onClose: () => void;
};

export function DeleteInvestmentDialog({ investment, onClose }: DeleteInvestmentDialogProps) {
  const remove = useDeleteInvestment();
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    if (!investment) return;
    setError(null);
    try {
      await remove.mutateAsync(investment.id);
      onClose();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Não foi possível excluir.");
    }
  }

  return (
    <Dialog open={investment !== null} onClose={onClose} title="Confirmar Exclusão" size="sm">
      <p className="text-sm text-muted-foreground">
        Tem certeza que deseja excluir o investimento{" "}
        <span className="text-foreground">{investment?.descricao}</span>? Esta operação não pode
        ser desfeita.
      </p>
      {error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={remove.isPending}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={handleConfirm} disabled={remove.isPending}>
          {remove.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Excluir
        </Button>
      </div>
    </Dialog>
  );
}
