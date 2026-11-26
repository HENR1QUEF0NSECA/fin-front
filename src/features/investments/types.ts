export type InvestmentType = "RENDA_FIXA" | "RENDA_VARIAVEL" | "OUTROS";

export const INVESTMENT_TYPE_LABELS: Record<InvestmentType, string> = {
  RENDA_FIXA: "Renda fixa",
  RENDA_VARIAVEL: "Renda variável",
  OUTROS: "Outros",
};

export type Investment = {
  id: number;
  descricao: string;
  tipo: InvestmentType;
  valor: number;
  data: string;
};

export type InvestmentInput = {
  descricao: string;
  tipo: InvestmentType;
  valor: number;
  data: string;
};
