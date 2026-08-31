"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKey } from "@/features/dashboard/hooks/use-dashboard-query";
import type { DashboardData } from "@/features/dashboard/types/dashboard";

import { addMoney } from "../services/add-money-service";
import type { AddMoneyRequest } from "../types/add-money";
import { addMoneyQueryKey } from "./use-add-money-query";

export function useAddMoneyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-money", "submit"],
    mutationFn: (request: AddMoneyRequest) => addMoney(request),
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
      void queryClient.invalidateQueries({ queryKey: addMoneyQueryKey });
    },
  });
}
