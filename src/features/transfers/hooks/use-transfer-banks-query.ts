"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransferBanks } from "../services/destination-service";
import type { DestinationCountryCode } from "../types/destination";

export function transferBanksQueryKey(countryCode: DestinationCountryCode) {
  return ["transfer-banks", countryCode] as const;
}

export function useTransferBanksQuery(countryCode: DestinationCountryCode | null) {
  return useQuery({
    queryKey: transferBanksQueryKey(countryCode ?? "NG"),
    queryFn: () => getTransferBanks(countryCode as DestinationCountryCode),
    enabled: countryCode !== null,
  });
}
