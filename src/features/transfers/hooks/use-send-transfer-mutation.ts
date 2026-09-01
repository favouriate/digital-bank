"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKey } from "@/features/dashboard/hooks/use-dashboard-query";
import { transactionsQueryKey } from "@/features/search/hooks/use-transactions-query";
import type { DashboardData } from "@/features/dashboard/types/dashboard";

import { addRecipient, sendTransfer } from "../services/transfer-service";
import type { AddRecipientInput, TransferRequest } from "../types/transfer";
import { transferQueryKey } from "./use-transfer-query";

export function useSendTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["transfers", "send"],
    mutationFn: (request: TransferRequest) => sendTransfer(request),
    onSuccess: (result) => {
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
        };
      });
      void queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
      void queryClient.invalidateQueries({ queryKey: transferQueryKey });
      void queryClient.invalidateQueries({ queryKey: transactionsQueryKey });
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
