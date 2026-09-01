import type { CountryCode, CurrencyCode } from "@/types/currency";
import { COUNTRY_CODES } from "@/types/currency";

export type DestinationCountryCode = CountryCode;

export type DestinationCurrencyCode = CurrencyCode;

export type TransferDestination = {
  countryCode: DestinationCountryCode;
  countryName: string;
  currencyCode: DestinationCurrencyCode;
  currencyName: string;
};

export type TransferBank = {
  id: string;
  name: string;
  countryCode: DestinationCountryCode;
};

export type ResolvedRecipient = {
  id: string;
  name: string;
  initials: string;
  avatarUrl: string | null;
  bankId: string;
  bankName: string;
  countryCode: DestinationCountryCode;
  currencyCode: DestinationCurrencyCode;
  accountNumberMasked: string;
};

export type RecipientLookupInput = {
  countryCode: DestinationCountryCode;
  bankId: string;
  accountNumber: string;
};

export function isDestinationCountryCode(
  value: string | null | undefined,
): value is DestinationCountryCode {
  return COUNTRY_CODES.some((code) => code === value);
}

export class RecipientLookupError extends Error {
  constructor(
    message = "We couldn't find this account. Check the account number and try again.",
  ) {
    super(message);
    this.name = "RecipientLookupError";
  }
}
