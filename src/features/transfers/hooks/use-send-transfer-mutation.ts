"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKey } from "@/features/dashboard/hooks/use-dashboard-query";
import type { DashboardData } from "@/features/dashboard/types/dashboard";
import { transactionsQueryKey } from "@/features/search/hooks/use-transactions-query";

import { addRecipient, sendTransfer } from "../services/transfer-service";
import type {
  AddRecipientInput,
  TransferPageData,
  TransferRequest,
} from "../types/transfer";
import { transferQueryKey } from "./use-transfer-query";

const RECENT_TRANSACTION_COUNT = 3;

export function useSendTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["transfers", "send"],
    mutationFn: (request: TransferRequest) => sendTransfer(request),
    onSuccess: async (result) => {
      await Promise.all([dashboardQueryKey, transferQueryKey, transactionsQueryKey].map(
        (queryKey) => queryClient.cancelQueries({ queryKey }),
      ));
      queryClient.setQueryData<DashboardData>(dashboardQueryKey, (current) => {
        if (!current) {
          return current;
        }

        const recentTransactions = result.transaction
          ? [
              result.transaction,
              ...current.recentTransactions.filter(
                (item) => item.id !== result.transaction?.id,
              ),
            ].slice(0, RECENT_TRANSACTION_COUNT)
          : current.recentTransactions;

        return {
          ...current,
          account: {
            ...current.account,
            availableBalance: result.availableBalance,
          },
          recentTransactions,
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

      await Promise.all([dashboardQueryKey, transferQueryKey, transactionsQueryKey].map(
        (queryKey) => queryClient.invalidateQueries({ queryKey, refetchType: "all" }),
      ));
    },
  });
}

export function useAddRecipientMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["transfers", "add-recipient"],
    mutationFn: (input: AddRecipientInput) => addRecipient(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: transferQueryKey });
    },
  });
}
