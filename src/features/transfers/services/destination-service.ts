import { mockGetTransferBanks, mockGetTransferDestinations } from "../mocks/mock-destination-service";
import type {
  DestinationCountryCode,
  TransferBank,
  TransferDestination,
} from "../types/destination";

export async function getTransferDestinations(): Promise<TransferDestination[]> {
  return mockGetTransferDestinations();
}

export async function getTransferBanks(
  countryCode: DestinationCountryCode,
): Promise<TransferBank[]> {
  return mockGetTransferBanks(countryCode);
}
