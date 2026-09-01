import type { CurrencyCode } from "@/types/currency";

import { mockGetExchangeRate } from "../mocks/mock-exchange-rate-service";
import type { ExchangeRateQuote } from "../types/exchange-rate";

export async function getExchangeRate(
  baseCurrency: CurrencyCode,
  quoteCurrency: CurrencyCode,
): Promise<ExchangeRateQuote> {
  return mockGetExchangeRate(baseCurrency, quoteCurrency);
}
