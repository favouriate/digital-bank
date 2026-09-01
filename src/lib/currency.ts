import {
  CURRENCY_CODES,
  type CurrencyCode,
  type CurrencyMeta,
} from "@/types/currency";

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    locale: "en-US",
    countryCode: "US",
  },
  NGN: {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    locale: "en-NG",
    countryCode: "NG",
  },
  GBP: {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    locale: "en-GB",
    countryCode: "GB",
  },
  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "$",
    locale: "en-CA",
    countryCode: "CA",
  },
  GHS: {
    code: "GHS",
    name: "Ghanaian Cedi",
    symbol: "GH₵",
    locale: "en-GH",
    countryCode: "GH",
  },
  ZAR: {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    locale: "en-ZA",
    countryCode: "ZA",
  },
};

export const DISPLAY_CURRENCIES: CurrencyMeta[] = CURRENCY_CODES.map(
  (code) => CURRENCIES[code],
);

const formatters = new Map<CurrencyCode, Intl.NumberFormat>();

export function isCurrencyCode(value: string | null | undefined): value is CurrencyCode {
  return CURRENCY_CODES.some((code) => code === value);
}

export function formatMoney(amount: number, currency: CurrencyCode) {
  let formatter = formatters.get(currency);

  if (!formatter) {
    const meta = CURRENCIES[currency];
    formatter = new Intl.NumberFormat(meta.locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    formatters.set(currency, formatter);
  }

  return formatter.format(amount);
}
