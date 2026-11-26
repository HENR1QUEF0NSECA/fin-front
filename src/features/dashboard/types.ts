export type TotalPorCategoria = {
  categoria: string;
  total: number;
};

export type DashboardResumo = {
  mes: number;
  ano: number;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalInvestido: number;
  despesasPorCategoria: TotalPorCategoria[];
  receitasPorCategoria: TotalPorCategoria[];
};

export type TotalPorMes = {
  mes: number;
  total: number;
};

export type DashboardEvolucao = {
  ano: number;
  receitas: TotalPorMes[];
  despesas: TotalPorMes[];
  investimentos: TotalPorMes[];
};
