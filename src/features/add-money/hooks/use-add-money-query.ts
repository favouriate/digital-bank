"use client";

import { useQuery } from "@tanstack/react-query";

import { getAddMoneyPage } from "../services/add-money-service";

export const addMoneyQueryKey = ["add-money"] as const;

export function useAddMoneyQuery() {
  return useQuery({
    queryKey: addMoneyQueryKey,
    queryFn: getAddMoneyPage,
  });
}
