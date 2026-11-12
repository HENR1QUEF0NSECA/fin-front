/**
 * Tipo interno (UI) — usa palavras por extenso pra legibilidade.
 * Wire-format do backend usa "D"|"R" — conversão em services.ts.
 */
export type TransactionType = "RECEITA" | "DESPESA";

/** Wire type aceito pelo backend. */
export type BackendTransactionType = "D" | "R";

/**
 * Transação no formato da UI. Vem do TransacaoResponseDTO do backend
 * (idTransacao, dataHoraTransacao, ...), convertido em services.ts.
 */
export type Transaction = {
  id: number;
  tipo: BackendTransactionType;
  valor: number;
  idCategoria: number;
  nomeCategoria?: string;
  descricao: string;
  data?: string; // data e hora ISO sem fuso, definida pelo backend na criação
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
