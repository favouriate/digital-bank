export type TransactionStatus = "completed" | "pending" | "failed";

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
};
