export type TransactionType = "R" | "D";

export type Transaction = {
  id: number;
  tipo: TransactionType;
  valor: number;
  categoriaId: number;
  nomeCategoria: string;
  descricao: string | null;
  dataHoraTransacao: string;
  alertaOrcamento?: boolean;
};

export type TransactionInput = {
  tipo: TransactionType;
  valor: number;
  categoriaId: number;
  descricao: string;
  data: string;
};

export type TransactionFilters = {
  descricao: string;
  tipo: TransactionType | "TODOS";
  categoriaId: number | "TODAS";
};
