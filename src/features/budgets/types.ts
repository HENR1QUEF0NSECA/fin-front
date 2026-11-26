export type BudgetPriority = "ESSENCIAL" | "FACULTATIVO";

export const PRIORITY_LABELS: Record<BudgetPriority, string> = {
  ESSENCIAL: "Essencial",
  FACULTATIVO: "Facultativo",
};

export type Budget = {
  id: number;
  categoriaId: number;
  nomeCategoria: string;
  mes: number;
  ano: number;
  limite: number;
  prioridade: BudgetPriority;
  consumido: number;
};

export type BudgetInput = {
  categoriaId: number;
  mes: number;
  ano: number;
  limite: number;
  prioridade: BudgetPriority;
};
