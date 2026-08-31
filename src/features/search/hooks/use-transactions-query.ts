"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "../services/transaction-service";

export const transactionsQueryKey = ["transactions"] as const;

export function useTransactionsQuery() {
  return useQuery({
    queryKey: transactionsQueryKey,
    queryFn: getTransactions,
  });
}
