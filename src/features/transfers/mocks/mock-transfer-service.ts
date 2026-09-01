import { mockAccountSummary } from "@/features/dashboard/mocks/mock-account";
import { mockTransactions } from "@/mocks/transactions";
import type { Transaction } from "@/types/transaction";

import { recipientInitials } from "../lib/format";
import {
  MAX_TRANSFER_AMOUNT,
  MIN_TRANSFER_AMOUNT,
} from "../schemas/amount-schema";
import { MOCK_TRANSFER_PIN } from "../schemas/transfer-schema";
import type {
  AddRecipientInput,
  Recipient,
  TransferPageData,
  TransferRequest,
  TransferResult,
} from "../types/transfer";
import { PinError, TransferError } from "../types/transfer";
import {
  addMockRecipient,
  getMockRecipients,
  resetTransferRecipientMocks,
} from "./mock-recipients";

export { PinError, TransferError };

const INITIAL_TRANSACTIONS: Transaction[] = mockTransactions.map(
  (transaction) => ({ ...transaction }),
);

let demoPin = MOCK_TRANSFER_PIN;

export function getDemoPin() {
  return demoPin;
}

export function setDemoPin(pin: string) {
  demoPin = pin;
}

export function resetDemoPin() {
  demoPin = MOCK_TRANSFER_PIN;
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Demo amount that fails, similar to Add Money $13. */
export const DEMO_FAILURE_AMOUNT = 13;

/** Demo amount that stays pending. */
export const DEMO_PENDING_AMOUNT = 17;

export async function mockGetTransferPage(): Promise<TransferPageData> {
  await wait(450);

  return {
    recipients: getMockRecipients(),
    availableBalance: mockAccountSummary.availableBalance,
    minAmount: MIN_TRANSFER_AMOUNT,
    maxAmount: MAX_TRANSFER_AMOUNT,
  };
}

export async function mockAddRecipient(
  input: AddRecipientInput,
): Promise<Recipient> {
  await wait(450);

  const recipient: Recipient = {
    id: `contact-${Date.now()}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    initials: recipientInitials(input.name),
    avatarUrl: null,
    frequent: false,
  };

  return addMockRecipient(recipient);
}

export async function mockValidateTransfer(
  request: TransferRequest,
): Promise<void> {
  await wait(450);

  const recipient = getMockRecipients().find(
    (item) => item.id === request.recipientId,
  );

  if (!recipient) {
    throw new TransferError("That recipient is not available.");
  }

  if (request.amount > mockAccountSummary.availableBalance) {
    throw new TransferError("Amount exceeds available balance.");
  }
}

export async function mockVerifyPin(pin: string): Promise<void> {
  await wait(450);

  if (pin !== demoPin) {
    throw new PinError();
  }
}

export async function mockSendTransfer(
  request: TransferRequest,
): Promise<TransferResult> {
  await wait(450);

  const recipient = getMockRecipients().find(
    (item) => item.id === request.recipientId,
  );

  if (!recipient) {
    throw new TransferError("That recipient is not available.");
  }

  if (request.amount === DEMO_FAILURE_AMOUNT) {
    throw new TransferError();
  }

  const transferId = `txn-send-${Date.now()}`;
  const note = request.note.trim();
  const created: Omit<Transaction, "status"> = {
    id: transferId,
    description: `Send to ${recipient.name}`,
    counterparty: recipient.name,
    reference: `OP-${String(Date.now()).slice(-6)}`,
    accountMask: "**** 54215",
    amount: -request.amount,
    currency: "USD",
    occurredAt: new Date().toISOString(),
    type: "transfer",
    direction: "outgoing",
    bankName: "OpenPay",
    category: "transfer",
    note: note || undefined,
    counterpartyEmail: recipient.email,
  };

  if (request.amount === DEMO_PENDING_AMOUNT) {
    prependMockTransfer({
      ...created,
      status: "pending",
    });

    return {
      transferId,
      recipientId: request.recipientId,
      amount: request.amount,
      availableBalance: mockAccountSummary.availableBalance,
      outcome: "pending",
      note,
    };
  }

  if (request.amount > mockAccountSummary.availableBalance) {
    throw new TransferError("Amount exceeds available balance.");
  }

  mockAccountSummary.availableBalance -= request.amount;

  prependMockTransfer({
    ...created,
    status: "completed",
  });

  return {
    transferId,
    recipientId: request.recipientId,
    amount: request.amount,
    availableBalance: mockAccountSummary.availableBalance,
    outcome: "success",
    note,
  };
}

export function prependMockTransfer(transaction: Transaction) {
  mockTransactions.unshift(transaction);
}

export function resetTransferMocks() {
  resetTransferRecipientMocks();
  resetDemoPin();
  mockTransactions.splice(
    0,
    mockTransactions.length,
    ...INITIAL_TRANSACTIONS.map((transaction) => ({ ...transaction })),
  );
}
