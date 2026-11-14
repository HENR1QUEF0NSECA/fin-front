export type ResumoCategoria = {
  nome: string;
  total: number;
};

export type DashboardResumo = {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  categorias: ResumoCategoria[];
};

export type EvolucaoMes = {
  mes: number;
  receitas: number;
  despesas: number;
};

export type DashboardEvolucao = {
  ano: number;
  meses: EvolucaoMes[];
};
