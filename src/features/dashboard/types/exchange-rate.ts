import type { CurrencyCode } from "@/types/currency";

export type ExchangeRateQuote = {
  baseCurrency: CurrencyCode;
  quoteCurrency: CurrencyCode;
  rate: number;
};

export class ExchangeRateError extends Error {
  constructor(message = "Couldn't load exchange rate. Showing USD balance.") {
    super(message);
    this.name = "ExchangeRateError";
  }
}
