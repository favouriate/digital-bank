import {
  mockAddRecipient,
  mockGetTransferPage,
  mockSendTransfer,
  mockValidateTransfer,
  mockVerifyPin,
} from "../mocks/mock-transfer-service";
import type {
  AddRecipientInput,
  Recipient,
  TransferPageData,
  TransferRequest,
  TransferResult,
} from "../types/transfer";

export async function getTransferPage(): Promise<TransferPageData> {
  return mockGetTransferPage();
}

export async function addRecipient(
  input: AddRecipientInput,
): Promise<Recipient> {
  return mockAddRecipient(input);
}

export async function validateTransfer(
  request: TransferRequest,
): Promise<void> {
  return mockValidateTransfer(request);
}

export async function verifyPin(pin: string): Promise<void> {
  return mockVerifyPin(pin);
}

export async function sendTransfer(
  request: TransferRequest,
): Promise<TransferResult> {
  return mockSendTransfer(request);
}
