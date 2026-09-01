export type TransactionStatus = "completed" | "pending" | "failed";

export type TransactionType =
  | "transfer"
  | "deposit"
  | "bill-payment"
  | "receive";

export type TransactionDirection = "incoming" | "outgoing";

export type Transaction = {
  id: string;
  description: string;
  counterparty: string;
  reference: string;
  accountMask: string;
  amount: number;
  currency: "USD";
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
