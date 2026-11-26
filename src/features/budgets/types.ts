export type Budget = {
  id: number;
  categoriaId: number;
  nomeCategoria: string;
  mes: number;
  ano: number;
  limite: number;
  consumido: number;
};

export type BudgetInput = {
  categoriaId: number;
  mes: number;
  ano: number;
  limite: number;
};
