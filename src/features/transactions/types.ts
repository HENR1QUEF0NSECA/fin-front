export type TransactionType = "RECEITA" | "DESPESA";

export type BackendTransactionType = "D" | "R";

export type Transaction = {
  id: number;
  tipo: BackendTransactionType;
  valor: number;
  idCategoria: number;
  nomeCategoria?: string;
  descricao: string;
  data?: string;
};

export type TransactionFilters = {
  descricao?: string;
  tipo?: TransactionType | "TODOS";
  idCategoria?: number | "TODAS";
};

export type CreateTransactionInput = {
  tipo: TransactionType;
  valor: number;
  idCategoria: number;
  descricao: string;
};

export type CreateTransactionResponse = Transaction & {
  alertaOrcamento?: boolean;
};
