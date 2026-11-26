"use client";

import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";

import { budgetsKey } from "@/features/budgets/hooks";

import {
  createTransaction,
  deleteTransaction,
  listTransactions,
  updateTransaction,
} from "./services";
import type { TransactionInput } from "./types";

export const transactionsKey = ["transactions"] as const;

export function useTransactions() {
  return useQuery({
    queryKey: transactionsKey,
    queryFn: listTransactions,
  });
}

function invalidateAfterTransactionChange(qc: QueryClient) {
  qc.invalidateQueries({ queryKey: transactionsKey });
  qc.invalidateQueries({ queryKey: ["dashboard"] });
  qc.invalidateQueries({ queryKey: budgetsKey });
}

export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: TransactionInput) => createTransaction(input),
    onSuccess: () => invalidateAfterTransactionChange(qc),
  });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: TransactionInput }) =>
      updateTransaction(id, input),
    onSuccess: () => invalidateAfterTransactionChange(qc),
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
    onSuccess: () => invalidateAfterTransactionChange(qc),
  });
}
