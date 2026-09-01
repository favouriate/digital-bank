"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransferDestinations } from "../services/destination-service";

export const transferDestinationsQueryKey = ["transfer-destinations"] as const;

export function useTransferDestinationsQuery() {
  return useQuery({
    queryKey: transferDestinationsQueryKey,
    queryFn: getTransferDestinations,
  });
}
