"use client";

import { useQuery } from "@tanstack/react-query";

import { isCurrencyCode } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

import { getExchangeRate } from "../services/exchange-rate-service";

export function exchangeRateQueryKey(
  baseCurrency: CurrencyCode,
  quoteCurrency: CurrencyCode,
) {
  return ["exchange-rate", baseCurrency, quoteCurrency] as const;
}

export function useExchangeRateQuery(
  baseCurrency: CurrencyCode,
  quoteCurrency: CurrencyCode,
) {
  const isIdentity = baseCurrency === quoteCurrency;
  const enabled =
    !isIdentity && isCurrencyCode(baseCurrency) && isCurrencyCode(quoteCurrency);

  const query = useQuery({
    queryKey: exchangeRateQueryKey(baseCurrency, quoteCurrency),
    queryFn: () => getExchangeRate(baseCurrency, quoteCurrency),
    enabled,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    ...query,
    rate: isIdentity ? 1 : query.data?.rate,
    isIdentity,
    isRateLoading: enabled && query.isPending,
    isRateError: enabled && query.isError,
  };
}
