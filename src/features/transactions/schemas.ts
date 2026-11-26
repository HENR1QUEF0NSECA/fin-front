import { z } from "zod";

import { toIsoDate } from "@/lib/format";

export const MIN_TRANSACTION_DATE = "2000-01-01";

function isRealDate(value: string): boolean {
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && toIsoDate(date) === value;
}

export const transactionFormSchema = z.object({
  tipo: z.enum(["RECEITA", "DESPESA"]),
  valor: z
    .number({ error: "Informe um valor" })
    .positive("O valor deve ser maior que zero"),
  idCategoria: z
    .number({ error: "Selecione uma categoria" })
    .int()
    .positive("Selecione uma categoria"),
  descricao: z.string().trim().min(1, "Informe uma descrição").max(120),
  data: z
    .string()
    .min(1, "Informe a data")
    .refine(isRealDate, "Data inválida")
    .refine((value) => value >= MIN_TRANSACTION_DATE, "A data deve ser a partir de 01/01/2000")
    .refine((value) => value <= toIsoDate(new Date()), "A data não pode ser no futuro"),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
