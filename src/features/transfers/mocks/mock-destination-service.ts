import {
  getMockBanksByCountry,
  mockTransferDestinations,
} from "../mocks/mock-destinations";
import type {
  DestinationCountryCode,
  TransferBank,
  TransferDestination,
} from "../types/destination";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockGetTransferDestinations(): Promise<
  TransferDestination[]
> {
  await wait(450);
  return mockTransferDestinations;
}

export async function mockGetTransferBanks(
  countryCode: DestinationCountryCode,
): Promise<TransferBank[]> {
  await wait(450);
  return getMockBanksByCountry(countryCode);
}
