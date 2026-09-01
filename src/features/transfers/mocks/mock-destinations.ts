import type {
  DestinationCountryCode,
  TransferBank,
  TransferDestination,
} from "../types/destination";

export const mockTransferDestinations: TransferDestination[] = [
  {
    countryCode: "NG",
    countryName: "Nigeria",
    currencyCode: "NGN",
    currencyName: "Nigerian Naira",
  },
  {
    countryCode: "US",
    countryName: "United States",
    currencyCode: "USD",
    currencyName: "US Dollar",
  },
  {
    countryCode: "GB",
    countryName: "United Kingdom",
    currencyCode: "GBP",
    currencyName: "British Pound",
  },
];

export const mockTransferBanks: TransferBank[] = [
  { id: "access", name: "Access Bank", countryCode: "NG" },
  { id: "first-bank", name: "First Bank", countryCode: "NG" },
  { id: "gtbank", name: "GTBank", countryCode: "NG" },
  { id: "uba", name: "UBA", countryCode: "NG" },
  { id: "zenith", name: "Zenith", countryCode: "NG" },
  { id: "chase", name: "Chase", countryCode: "US" },
  { id: "bank-of-america", name: "Bank of America", countryCode: "US" },
  { id: "wells-fargo", name: "Wells Fargo", countryCode: "US" },
  { id: "hsbc", name: "HSBC", countryCode: "GB" },
  { id: "barclays", name: "Barclays", countryCode: "GB" },
  { id: "lloyds", name: "Lloyds", countryCode: "GB" },
];

export function getMockBanksByCountry(countryCode: DestinationCountryCode) {
  return mockTransferBanks.filter((bank) => bank.countryCode === countryCode);
}

export function getMockDestination(countryCode: DestinationCountryCode) {
  return (
    mockTransferDestinations.find(
      (destination) => destination.countryCode === countryCode,
    ) ?? null
  );
}

export function getMockBank(bankId: string) {
  return mockTransferBanks.find((bank) => bank.id === bankId) ?? null;
}
