"use client";

import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";

import { budgetsKey } from "@/features/budgets/hooks";

import {
  createTransaction,
  deleteTransaction,
  listTransactions,
} from "./services";
import type { CreateTransactionInput } from "./types";

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
    mutationFn: (input: CreateTransactionInput) => createTransaction(input),
    onSuccess: () => invalidateAfterTransactionChange(qc),
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteTransaction(id),
    onSuccess: () => invalidateAfterTransactionChange(qc),
  });
}
