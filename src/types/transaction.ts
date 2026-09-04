import type { CurrencyCode } from "./currency";

export type TransactionStatus = "completed" | "pending" | "failed";

export type TransactionType =
  | "transfer"
  | "deposit"
  | "bill-payment"
  | "receive";

export type TransactionDirection = "incoming" | "outgoing";

export type Transaction = {
  transferId?: string;
  recipientId?: string;
  id: string;
  description: string;
  counterparty: string;
  reference: string;
  accountMask: string;
  /** Signed major-unit amount in currency, never the account settlement amount. */
  amount: number;
  /** The original currency in which this transaction was denominated. */
  currency: CurrencyCode;
  status: TransactionStatus;
  occurredAt: string;
  type: TransactionType;
  direction: TransactionDirection;
  bankName: string;
  category?: string;
  note?: string;
  fee?: number;
  counterpartyEmail?: string;
  counterpartyPhone?: string;
};
