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
  {
    countryCode: "CA",
    countryName: "Canada",
    currencyCode: "CAD",
    currencyName: "Canadian Dollar",
  },
  {
    countryCode: "GH",
    countryName: "Ghana",
    currencyCode: "GHS",
    currencyName: "Ghanaian Cedi",
  },
  {
    countryCode: "ZA",
    countryName: "South Africa",
    currencyCode: "ZAR",
    currencyName: "South African Rand",
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
  { id: "rbc", name: "RBC", countryCode: "CA" },
  { id: "td", name: "TD", countryCode: "CA" },
  { id: "scotiabank", name: "Scotiabank", countryCode: "CA" },
  { id: "gcb", name: "GCB", countryCode: "GH" },
  { id: "ecobank-gh", name: "Ecobank Ghana", countryCode: "GH" },
  { id: "absa-gh", name: "Absa Ghana", countryCode: "GH" },
  { id: "standard-bank", name: "Standard Bank", countryCode: "ZA" },
  { id: "fnb", name: "FNB", countryCode: "ZA" },
  { id: "absa-za", name: "Absa", countryCode: "ZA" },
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
