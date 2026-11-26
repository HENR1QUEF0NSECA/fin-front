"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCategories } from "@/features/categories/hooks";
import { useCreateTransaction, useUpdateTransaction } from "@/features/transactions/hooks";
import {
  MIN_TRANSACTION_DATE,
  transactionFormSchema,
  type TransactionFormValues,
} from "@/features/transactions/schemas";
import type { SavedTransaction, Transaction } from "@/features/transactions/types";
import { ApiError } from "@/lib/api-fetch";
import { toIsoDate } from "@/lib/format";

import { TypeToggle } from "./type-toggle";

type TransactionFormDialogProps = {
  open: boolean;
  transaction?: Transaction | null;
  onClose: () => void;
  onSaved?: (response: SavedTransaction) => void;
};

function getFormValues(transaction?: Transaction | null): Partial<TransactionFormValues> {
  if (!transaction) {
    return {
      tipo: "DESPESA",
      idCategoria: 0,
      descricao: "",
      data: toIsoDate(new Date()),
    };
  }
  return {
    tipo: transaction.tipo === "R" ? "RECEITA" : "DESPESA",
    valor: transaction.valor,
    idCategoria: transaction.idCategoria,
    descricao: transaction.descricao,
    data: transaction.data ? transaction.data.slice(0, 10) : toIsoDate(new Date()),
  };
}

export function TransactionFormDialog({
  open,
  transaction,
  onClose,
  onSaved,
}: TransactionFormDialogProps) {
  const categories = useCategories();
  const create = useCreateTransaction();
  const update = useUpdateTransaction();
  const isEditing = Boolean(transaction);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: getFormValues(transaction),
  });

  useEffect(() => {
    if (open) reset(getFormValues(transaction));
  }, [open, transaction, reset]);

  async function onSubmit(values: TransactionFormValues) {
    try {
      const response = transaction
        ? await update.mutateAsync({ id: transaction.id, input: values })
        : await create.mutateAsync(values);
      onSaved?.(response);
      onClose();
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError ? error.message : "Não foi possível salvar a transação.",
      });
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar Transação" : "Nova Transação"}
      description={
        isEditing
          ? "Altere os dados desta receita ou despesa."
          : "Registre uma nova receita ou despesa."
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          control={control}
          name="tipo"
          render={({ field }) => (
            <TypeToggle value={field.value} onChange={field.onChange} disabled={isSubmitting} />
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Valor (R$)" error={errors.valor?.message}>
            {(p) => (
              <Input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="0,00"
                onFocus={(e) => e.currentTarget.select()}
                {...p}
                {...register("valor", { valueAsNumber: true })}
              />
            )}
          </FormField>

          <FormField label="Data" error={errors.data?.message}>
            {(p) => (
              <Input
                type="date"
                min={MIN_TRANSACTION_DATE}
                max={toIsoDate(new Date())}
                {...p}
                {...register("data")}
              />
            )}
          </FormField>
        </div>

        <FormField
          label="Categoria"
          error={errors.idCategoria?.message}
          hint={categories.isLoading ? "Carregando categorias..." : undefined}
        >
          {(p) => (
            <Select
              disabled={categories.isLoading}
              {...p}
              {...register("idCategoria", { valueAsNumber: true })}
            >
              <option value={0}>Selecione...</option>
              {(categories.data ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </Select>
          )}
        </FormField>

        <FormField label="Descrição" error={errors.descricao?.message}>
          {(p) => (
            <Input placeholder="Ex.: Supermercado" {...p} {...register("descricao")} />
          )}
        </FormField>

        {errors.root?.message ? (
          <p className="text-sm text-danger" role="alert">
            {errors.root.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isEditing ? "Salvar Alterações" : "Salvar Transação"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
