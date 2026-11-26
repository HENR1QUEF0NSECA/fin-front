"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ApiError } from "@/lib/api-fetch";
import { toIsoDate } from "@/lib/format";

import { useCreateInvestment } from "../hooks";
import {
  MIN_INVESTMENT_DATE,
  investmentFormSchema,
  type InvestmentFormValues,
} from "../schemas";
import { INVESTMENT_TYPE_LABELS } from "../types";

type InvestmentFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

function emptyValues(): Partial<InvestmentFormValues> {
  return {
    descricao: "",
    tipo: "RENDA_FIXA",
    data: toIsoDate(new Date()),
  };
}

export function InvestmentFormDialog({ open, onClose }: InvestmentFormDialogProps) {
  const create = useCreateInvestment();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: emptyValues(),
  });

  useEffect(() => {
    if (open) reset(emptyValues());
  }, [open, reset]);

  async function onSubmit(values: InvestmentFormValues) {
    try {
      await create.mutateAsync(values);
      onClose();
    } catch (e) {
      setError("root", {
        message: e instanceof ApiError ? e.message : "Não foi possível salvar o investimento.",
      });
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Novo Investimento"
      description="Registre um valor que você aplicou."
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField label="Descrição" error={errors.descricao?.message}>
          {(p) => <Input placeholder="Ex.: Tesouro Selic" {...p} {...register("descricao")} />}
        </FormField>

        <FormField label="Tipo" error={errors.tipo?.message}>
          {(p) => (
            <Select {...p} {...register("tipo")}>
              <option value="RENDA_FIXA">{INVESTMENT_TYPE_LABELS.RENDA_FIXA}</option>
              <option value="RENDA_VARIAVEL">{INVESTMENT_TYPE_LABELS.RENDA_VARIAVEL}</option>
              <option value="OUTROS">{INVESTMENT_TYPE_LABELS.OUTROS}</option>
            </Select>
          )}
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Valor (R$)" error={errors.valor?.message}>
            {(p) => (
              <Input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="0,00"
                {...p}
                {...register("valor", { valueAsNumber: true })}
              />
            )}
          </FormField>
          <FormField label="Data" error={errors.data?.message}>
            {(p) => (
              <Input
                type="date"
                min={MIN_INVESTMENT_DATE}
                max={toIsoDate(new Date())}
                {...p}
                {...register("data")}
              />
            )}
          </FormField>
        </div>

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
            Salvar Investimento
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
