import { z } from "zod";

export const budgetFormSchema = z.object({
  categoriaId: z
    .number({ error: "Selecione uma categoria" })
    .int()
    .positive("Selecione uma categoria"),
  mes: z
    .number({ error: "Selecione um mês" })
    .int()
    .min(1, "Mês inválido")
    .max(12, "Mês inválido"),
  ano: z
    .number({ error: "Informe o ano" })
    .int()
    .min(2000, "Ano inválido")
    .max(2100, "Ano inválido"),
  limite: z
    .number({ error: "Informe o limite" })
    .positive("O limite deve ser maior que zero"),
  prioridade: z.enum(["ESSENCIAL", "FACULTATIVO"], {
    error: "Selecione a prioridade",
  }),
});

export type BudgetFormValues = z.infer<typeof budgetFormSchema>;
