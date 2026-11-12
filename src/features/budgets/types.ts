/**
 * Orçamento mensal por categoria (RF06), a partir do OrcamentoResponseDTO do
 * backend. `gasto` é o `consumido` calculado pelo backend: soma das despesas da
 * categoria no mês/ano do orçamento.
 */
export type Budget = {
  id: number;
  idCategoria: number;
  nomeCategoria?: string;
  mes: number; // 1..12
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
