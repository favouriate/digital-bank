import {
  getAvailableBalanceMinor,
  toUsdMinor,
  getAvailableBalance,
} from "@/features/dashboard/mocks/mock-account";
import {
  hydrateDemoLedger,
  commitDemoTransfer,
  resetDemoLedger,
} from "@/mocks/demo-ledger";
import { mockTransactions } from "@/mocks/transactions";
import type { Transaction } from "@/types/transaction";
import { isCurrencyCode } from "@/lib/currency";

import { usdFromDest } from "../lib/convert-amount";
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

/** Demo amount that fails. */
export const DEMO_FAILURE_AMOUNT = 13;

/** Demo amount that stays pending. */
export const DEMO_PENDING_AMOUNT = 17;

export async function mockGetTransferPage(): Promise<TransferPageData> {
  hydrateDemoLedger();
  await wait(450);

  return {
    recipients: getMockRecipients(),
    availableBalance: getAvailableBalance(),
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

function resolveTransferRecipient(request: TransferRequest): Recipient | null {
  const catalogRecipient = getMockRecipients().find(
    (item) => item.id === request.recipientId,
  );

  if (catalogRecipient) {
    return catalogRecipient;
  }

  const name = request.recipientName?.trim();

  if (!request.recipientId.trim() || !name) {
    return null;
  }

  return {
    id: request.recipientId,
    name,
    email: "",
    initials: recipientInitials(name),
    avatarUrl: null,
    frequent: false,
  };
}

export async function mockValidateTransfer(
  request: TransferRequest,
): Promise<void> {
  hydrateDemoLedger();
  await wait(450);

  validateRequest(request);
}

function validateRequest(request: TransferRequest) {
  const recipient = resolveTransferRecipient(request);
  if (!recipient) throw new TransferError("That recipient is not available.");
  if (!request.transferId?.trim()) throw new TransferError("Missing transfer ID.");
  if (!Number.isFinite(request.amount) || request.amount <= 0) {
    throw new TransferError("Enter a valid amount.");
  }
  if (!isCurrencyCode(request.currency)) throw new TransferError("Select a supported currency.");
  const amountMinor = toUsdMinor(usdFromDest(request.amount, request.currency));
  if (amountMinor > getAvailableBalanceMinor()) {
    throw new TransferError("Insufficient balance.");
  }
  if (amountMinor < MIN_TRANSFER_AMOUNT * 100 || amountMinor > MAX_TRANSFER_AMOUNT * 100) {
    throw new TransferError("Amount is outside transfer limits.");
  }
  return { recipient, amountMinor };
}

export async function mockVerifyPin(pin: string): Promise<void> {
  await wait(450);

  if (!/^\d{4}$/.test(pin)) {
    throw new PinError("Enter a 4-digit PIN.");
  }
}

export async function mockSendTransfer(
  request: TransferRequest,
): Promise<TransferResult> {
  request = { ...request };
  hydrateDemoLedger();
  await wait(450);

  // The persisted transaction catalog doubles as the idempotency registry.
  // No await between this check and commit: concurrent calls cannot interleave.
  const existing = mockTransactions.find((item) => item.transferId === request.transferId);
  if (existing) {
    if (existing.recipientId !== request.recipientId || existing.amount !== -request.amount
      || existing.currency !== request.currency
      || (existing.note ?? "") !== request.note.trim()
      || existing.bankName !== (request.bankName ?? "OpenPay")
      || existing.accountMask !== (request.accountMask ?? "****")) {
      throw new TransferError("This transfer ID has already been used for different details.");
    }
    return resultFor(existing, request);
  }

  const { recipient, amountMinor } = validateRequest(request);
  const settlementAmount = amountMinor / 100;
  if (settlementAmount === DEMO_FAILURE_AMOUNT) throw new TransferError();

  // Current demo fee is zero. Pending records do not reserve or debit funds.
  const feeMinor = 0;
  const totalDebitMinor = amountMinor + feeMinor;
  if (totalDebitMinor > getAvailableBalanceMinor()) throw new TransferError("Insufficient balance.");
  const transaction: Transaction = {
    id: request.transferId,
    transferId: request.transferId,
    recipientId: request.recipientId,
    description: `Sent to ${recipient.name}`,
    counterparty: recipient.name,
    reference: `OP-${request.transferId}`,
    accountMask: request.accountMask ?? "****",
    amount: -request.amount,
    fee: feeMinor / 100,
    currency: request.currency,
    occurredAt: new Date().toISOString(),
    type: "transfer",
    direction: "outgoing",
    bankName: request.bankName ?? "OpenPay",
    category: "transfer",
    note: request.note.trim() || undefined,
    counterpartyEmail: recipient.email,
    status: settlementAmount === DEMO_PENDING_AMOUNT ? "pending" : "completed",
  };
  commitDemoTransfer(transaction, transaction.status === "completed" ? totalDebitMinor : 0);
  return resultFor(transaction, request);
}

function resultFor(transaction: Transaction, request: TransferRequest): TransferResult {
  return {
    transferId: transaction.id,
    recipientId: request.recipientId,
    amount: -transaction.amount,
    currency: transaction.currency,
    availableBalance: getAvailableBalance(),
    outcome: transaction.status === "pending" ? "pending" : "success",
    note: transaction.note ?? "",
    transaction: { ...transaction },
  };
}

export function resetTransferMocks() {
  resetTransferRecipientMocks();
  resetDemoPin();
  resetDemoLedger();
}
