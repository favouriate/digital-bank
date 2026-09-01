import type { CurrencyCode } from "@/types/currency";

/**
 * Deterministic USD-quoted mock rates for the portfolio demo.
 * Conversion always uses canonical base × this table — never chained display amounts.
 */
export const mockUsdRates: Record<CurrencyCode, number> = {
  USD: 1,
  NGN: 1550,
  GBP: 0.77,
  CAD: 1.36,
  GHS: 15.5,
  ZAR: 18.2,
};

export function getMockRate(base: CurrencyCode, quote: CurrencyCode) {
  if (base === quote) {
    return 1;
  }

  return mockUsdRates[quote] / mockUsdRates[base];
}
