/**
 * Tipos do dashboard, a partir de GET /transacoes/dashboard/resumo?mes&ano
 * (ResumoMensalDTO) e GET /transacoes/dashboard/evolucao?ano (EvolucaoMensalDTO).
 * A conversão fica em services.ts.
 */

export type ResumoCategoria = {
  nome: string;
  total: number;
};

export type DashboardResumo = {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  categorias: ResumoCategoria[]; // despesas do mês por categoria
};

export type EvolucaoMes = {
  mes: number; // 1..12
  receitas: number;
  despesas: number;
};

export type DashboardEvolucao = {
  ano: number;
  meses: EvolucaoMes[];
};
