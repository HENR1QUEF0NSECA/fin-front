import { z } from "zod";

import { toIsoDate } from "@/lib/format";

export const MIN_INVESTMENT_DATE = "2000-01-01";

function isRealDate(value: string): boolean {
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && toIsoDate(date) === value;
}

export const investmentFormSchema = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "Informe uma descrição")
    .max(100, "A descrição deve ter no máximo 100 caracteres"),
  tipo: z.enum(["RENDA_FIXA", "RENDA_VARIAVEL", "OUTROS"], {
    error: "Selecione o tipo",
  }),
  valor: z
    .number({ error: "Informe um valor" })
    .positive("O valor deve ser maior que zero"),
  data: z
    .string()
    .min(1, "Informe a data")
    .refine(isRealDate, "Data inválida")
    .refine((value) => value >= MIN_INVESTMENT_DATE, "A data deve ser a partir de 01/01/2000")
    .refine((value) => value <= toIsoDate(new Date()), "A data não pode ser no futuro"),
});

export type InvestmentFormValues = z.infer<typeof investmentFormSchema>;
