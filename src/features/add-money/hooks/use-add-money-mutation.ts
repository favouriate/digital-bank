"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKey } from "@/features/dashboard/hooks/use-dashboard-query";
import type { DashboardData } from "@/features/dashboard/types/dashboard";
import { transactionsQueryKey } from "@/features/search/hooks/use-transactions-query";
import { transferQueryKey } from "@/features/transfers/hooks/use-transfer-query";
import type { TransferPageData } from "@/features/transfers/types/transfer";

import { addMoney } from "../services/add-money-service";
import type { AddMoneyRequest } from "../types/add-money";
import { addMoneyQueryKey } from "./use-add-money-query";

export function useAddMoneyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-money", "submit"],
    mutationFn: (request: AddMoneyRequest) => addMoney(request),
    onSuccess: async (result) => {
      await Promise.all(
        [dashboardQueryKey, addMoneyQueryKey, transferQueryKey, transactionsQueryKey].map(
          (queryKey) => queryClient.cancelQueries({ queryKey }),
        ),
      );
      queryClient.setQueryData<DashboardData>(dashboardQueryKey, (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          account: {
            ...current.account,
            availableBalance: result.availableBalance,
          },
          recentTransactions: [
            result.transaction,
            ...current.recentTransactions.filter(
              (transaction) => transaction.id !== result.transaction.id,
            ),
          ].slice(0, 3),
        };
      });
      queryClient.setQueryData<TransferPageData>(transferQueryKey, (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          availableBalance: result.availableBalance,
        };
      });
      await Promise.all(
        [dashboardQueryKey, addMoneyQueryKey, transferQueryKey, transactionsQueryKey].map(
          (queryKey) =>
            queryClient.invalidateQueries({ queryKey, refetchType: "all" }),
        ),
      );
    },
  });
}
