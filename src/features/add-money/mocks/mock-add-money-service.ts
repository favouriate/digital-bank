import {
  getAvailableBalance,
  toUsdMinor,
} from "@/features/dashboard/mocks/mock-account";
import { usdFromDest } from "@/features/transfers/lib/convert-amount";
import {
  commitDemoDeposit,
  hydrateDemoLedger,
} from "@/mocks/demo-ledger";
import { isCurrencyCode } from "@/lib/currency";
import type { Transaction } from "@/types/transaction";

import {
  MAX_ADD_MONEY_AMOUNT,
  MIN_ADD_MONEY_AMOUNT,
} from "../schemas/amount-schema";
import type {
  AddMoneyPageData,
  AddMoneyRequest,
  AddMoneyResult,
} from "../types/add-money";
import { AddMoneyError } from "../types/add-money";
import {
  getFundingMethods,
  getMockDeposits,
} from "./mock-funding";

export { AddMoneyError };

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Demo amount that fails, similar to the taken register email. */
export const DEMO_FAILURE_AMOUNT = 13;

export async function mockGetAddMoneyPage(): Promise<AddMoneyPageData> {
  hydrateDemoLedger();
  await wait(450);

  return {
    methods: getFundingMethods(),
    deposits: getMockDeposits(),
    minAmount: MIN_ADD_MONEY_AMOUNT,
    maxAmount: MAX_ADD_MONEY_AMOUNT,
  };
}

export async function mockAddMoney(
  request: AddMoneyRequest,
): Promise<AddMoneyResult> {
  hydrateDemoLedger();
  await wait(450);

  if (request.amount === DEMO_FAILURE_AMOUNT) {
    throw new AddMoneyError();
  }

  if (
    !Number.isFinite(request.amount) ||
    request.amount < MIN_ADD_MONEY_AMOUNT ||
    request.amount > MAX_ADD_MONEY_AMOUNT
  ) {
    throw new AddMoneyError("Amount is outside deposit limits.");
  }

  if (!isCurrencyCode(request.currency)) {
    throw new AddMoneyError("Select a supported currency.");
  }

  const method = getFundingMethods().find((item) => item.id === request.methodId);

  if (!method) {
    throw new AddMoneyError("That funding method is not available.");
  }

  const depositId = `dep-${Date.now()}`;
  const transaction: Transaction = {
    id: depositId,
    description: method.accountMask
      ? `Added money from ${method.label} ${method.accountMask}`
      : `Added money from ${method.label}`,
    counterparty: method.label,
    reference: `OP-${depositId}`,
    accountMask: method.accountMask ?? "External account",
    amount: request.amount,
    currency: request.currency,
    status: "completed",
    occurredAt: new Date().toISOString(),
    type: "deposit",
    direction: "incoming",
    bankName: method.label,
    category: "funding",
    fee: 0,
  };
  const usdCreditMinor = toUsdMinor(usdFromDest(request.amount, request.currency));
  commitDemoDeposit(transaction, usdCreditMinor);

  return {
    depositId,
    methodId: request.methodId,
    amount: request.amount,
    currency: request.currency,
    availableBalance: getAvailableBalance(),
    transaction,
  };
}
