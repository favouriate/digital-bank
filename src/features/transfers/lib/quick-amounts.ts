import type { CurrencyCode } from "@/types/currency";

const QUICK_AMOUNTS: Record<CurrencyCode, readonly number[]> = {
  USD: [50, 100, 500, 1_000],
  NGN: [5_000, 10_000, 50_000, 100_000],
  GBP: [50, 100, 500, 1_000],
  CAD: [50, 100, 500, 1_000],
  GHS: [500, 1_000, 5_000, 10_000],
  ZAR: [500, 1_000, 5_000, 10_000],
};

export function getQuickAmounts(currency: CurrencyCode) {
  return QUICK_AMOUNTS[currency];
}
