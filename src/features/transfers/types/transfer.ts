import type { Transaction } from "@/types/transaction";
import type { CurrencyCode } from "@/types/currency";

export type TransferStep =
  | "compose"
  | "amount"
  | "details"
  | "validating"
  | "review"
  | "pin"
  | "processing"
  | "success"
  | "pending"
  | "failure";

export type Recipient = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarUrl: string | null;
  frequent: boolean;
};

export type TransferPageData = {
  recipients: Recipient[];
  availableBalance: number;
  minAmount: number;
  maxAmount: number;
};

export type TransferRequest = {
  currency: CurrencyCode;
  transferId: string;
  recipientId: string;
  /** Original positive major-unit amount; USD settlement is derived by the service. */
  amount: number;
  note: string;
  recipientName?: string;
  bankName?: string;
  accountMask?: string;
};

export type TransferOutcome = "success" | "pending" | "failure";

export type TransferResult = {
  currency: CurrencyCode;
  transferId: string;
  recipientId: string;
  amount: number;
  availableBalance: number;
  outcome: TransferOutcome;
  note: string;
  transaction?: Transaction;
};

export class TransferError extends Error {
  constructor(
    message = "We couldn't send money right now. Please try again.",
  ) {
    super(message);
    this.name = "TransferError";
  }
}

export class PinError extends Error {
  constructor(message = "That PIN is incorrect. Please try again.") {
    super(message);
    this.name = "PinError";
  }
}

export type AddRecipientInput = {
  name: string;
  email: string;
};
