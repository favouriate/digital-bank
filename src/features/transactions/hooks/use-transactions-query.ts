"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { listTransactions } from "../services/transaction-service";
import type { TransactionListParams } from "../types/transaction-list";

export function transactionListQueryKey(params: TransactionListParams) {
  return ["transactions", params] as const;
}

export function useTransactionsQuery(params: TransactionListParams) {
  return useQuery({
    queryKey: transactionListQueryKey(params),
    queryFn: () => listTransactions(params),
    placeholderData: keepPreviousData,
  });
}
