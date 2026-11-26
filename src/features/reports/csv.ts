import { formatDate, toIsoDate } from "@/lib/format";

export type TransactionCsvRow = {
  data?: string;
  tipo: "RECEITA" | "DESPESA";
  categoria: string;
  descricao: string;
  valor: number;
};

function escape(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function transactionsToCsv(rows: TransactionCsvRow[]): string {
  const header = ["Data", "Tipo", "Categoria", "Descrição", "Valor"];
  const data = rows.map((r) => [
    r.data ? formatDate(r.data) : "",
    r.tipo === "RECEITA" ? "Receita" : "Despesa",
    r.categoria,
    r.descricao,
    r.valor.toFixed(2).replace(".", ","),
  ]);
  return [header, ...data].map((row) => row.map(escape).join(";")).join("\r\n");
}

export function downloadTransactionsCsv(rows: TransactionCsvRow[]): void {
  const csv = transactionsToCsv(rows);
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `finplan-transacoes-${toIsoDate(new Date())}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
