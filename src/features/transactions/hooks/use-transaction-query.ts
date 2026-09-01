"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransactionById } from "../services/transaction-service";

export function transactionQueryKey(transactionId: string) {
  return ["transactions", transactionId] as const;
}

export function useTransactionQuery(transactionId: string) {
  return useQuery({
    queryKey: transactionQueryKey(transactionId),
    queryFn: () => getTransactionById(transactionId),
    enabled: Boolean(transactionId),
  });
}
