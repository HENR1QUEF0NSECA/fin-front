export type Budget = {
  id: number;
  idCategoria: number;
  nomeCategoria?: string;
  mes: number;
  ano: number;
  limite: number;
  gasto: number;
};

export type CreateBudgetInput = {
  idCategoria: number;
  mes: number;
  ano: number;
  limite: number;
};
