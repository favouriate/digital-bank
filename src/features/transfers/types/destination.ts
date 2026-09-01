export type DestinationCountryCode = "NG" | "US" | "GB";

export type DestinationCurrencyCode = "NGN" | "USD" | "GBP";

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

export class RecipientLookupError extends Error {
  constructor(
    message = "We couldn't find this account. Check the account number and try again.",
  ) {
    super(message);
    this.name = "RecipientLookupError";
  }
}
