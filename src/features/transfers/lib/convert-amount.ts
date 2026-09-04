import { convertFromBase } from "@/features/dashboard/lib/convert-balance";
import { getMockRate } from "@/features/dashboard/mocks/mock-exchange-rates";
import { isCurrencyCode } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

export function resolveTransferCurrency(
  value: string | null | undefined,
): CurrencyCode {
  return isCurrencyCode(value) ? value : "USD";
}

export function destFromUsd(usdAmount: number, currency: CurrencyCode) {
  return convertFromBase(usdAmount, getMockRate("USD", currency));
}

export function usdFromDest(destAmount: number, currency: CurrencyCode) {
  const rate = getMockRate("USD", currency);

  if (rate === 0) {
    return destAmount;
  }

  return destAmount / rate;
}

export function roundTransferMoney(value: number) {
  return Math.round(value * 100) / 100;
}
