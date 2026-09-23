"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransferPage } from "../services/transfer-service";

export const transferQueryKey = ["transfers"] as const;

export function useTransferQuery() {
  return useQuery({
    queryKey: transferQueryKey,
    queryFn: getTransferPage,
    refetchOnMount: "always",
  });
}
