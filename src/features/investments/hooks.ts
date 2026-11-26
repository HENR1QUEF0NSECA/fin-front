"use client";

import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";

import { createInvestment, deleteInvestment, listInvestments } from "./services";
import type { InvestmentInput } from "./types";

export const investmentsKey = ["investments"] as const;

export function useInvestments() {
  return useQuery({
    queryKey: investmentsKey,
    queryFn: listInvestments,
  });
}

function invalidateAfterInvestmentChange(qc: QueryClient) {
  qc.invalidateQueries({ queryKey: investmentsKey });
  qc.invalidateQueries({ queryKey: ["dashboard"] });
}

export function useCreateInvestment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: InvestmentInput) => createInvestment(input),
    onSuccess: () => invalidateAfterInvestmentChange(qc),
  });
}

export function useDeleteInvestment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteInvestment(id),
    onSuccess: () => invalidateAfterInvestmentChange(qc),
  });
}
