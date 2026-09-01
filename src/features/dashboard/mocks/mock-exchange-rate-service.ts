import type { CurrencyCode } from "@/types/currency";
import { isCurrencyCode } from "@/lib/currency";

import {
  ExchangeRateError,
  type ExchangeRateQuote,
} from "../types/exchange-rate";
import { getMockRate } from "./mock-exchange-rates";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockGetExchangeRate(
  baseCurrency: CurrencyCode,
  quoteCurrency: CurrencyCode,
): Promise<ExchangeRateQuote> {
  await wait(180);

  if (!isCurrencyCode(baseCurrency) || !isCurrencyCode(quoteCurrency)) {
    throw new ExchangeRateError();
  }

  return {
    baseCurrency,
    quoteCurrency,
    rate: getMockRate(baseCurrency, quoteCurrency),
  };
}
