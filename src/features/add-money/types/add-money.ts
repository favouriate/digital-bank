import type { CurrencyCode } from "@/types/currency";
import type { Transaction, TransactionStatus } from "@/types/transaction";

export type FundingMethodId =
  | "debit-card"
  | "bank-transfer"
  | "credit-card"
  | "paypal";

export type FundingBrand = "visa" | "paypal";

export type FundingMethod = {
  id: FundingMethodId;
  label: string;
  description: string;
  brand: FundingBrand | null;
  accountMask: string | null;
  recommended: boolean;
};

export type AddMoneyDeposit = {
  id: string;
  sourceLabel: string;
  sourceDetail: string;
  amount: number;
  currency: CurrencyCode;
  status: TransactionStatus;
  occurredAt: string;
};

export type AddMoneyPageData = {
  methods: FundingMethod[];
  deposits: AddMoneyDeposit[];
  minAmount: number;
  maxAmount: number;
};

export type AddMoneyRequest = {
  methodId: FundingMethodId;
  amount: number;
  currency: CurrencyCode;
};

export type AddMoneyResult = {
  depositId: string;
  methodId: FundingMethodId;
  amount: number;
  currency: CurrencyCode;
  availableBalance: number;
  transaction: Transaction;
};

export class AddMoneyError extends Error {
  constructor(
    message = "We couldn't add money right now. Please try again.",
  ) {
    super(message);
    this.name = "AddMoneyError";
  }
}

export type AddMoneyStep = "compose" | "confirm" | "success" | "failure";
