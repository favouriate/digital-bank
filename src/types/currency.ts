export const CURRENCY_CODES = [
  "USD",
  "NGN",
  "GBP",
  "CAD",
  "GHS",
  "ZAR",
] as const;

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export const COUNTRY_CODES = ["US", "NG", "GB", "CA", "GH", "ZA"] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

export type CurrencyMeta = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  locale: string;
  countryCode: CountryCode;
};
