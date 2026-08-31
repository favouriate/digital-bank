import { mockAccountSummary } from "@/features/dashboard/mocks/mock-account";

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
  prependMockDeposit,
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
  await wait(450);

  if (request.amount === DEMO_FAILURE_AMOUNT) {
    throw new AddMoneyError();
  }

  const method = getFundingMethods().find((item) => item.id === request.methodId);

  if (!method) {
    throw new AddMoneyError("That funding method is not available.");
  }

  mockAccountSummary.availableBalance += request.amount;

  const depositId = `dep-${Date.now()}`;
  prependMockDeposit({
    id: depositId,
    sourceLabel: method.label,
    sourceDetail: method.accountMask
      ? `From ${method.label} ${method.accountMask}`
      : `From ${method.label}`,
    amount: request.amount,
    currency: "USD",
    status: "completed",
    occurredAt: new Date().toISOString(),
  });

  return {
    depositId,
    methodId: request.methodId,
    amount: request.amount,
    availableBalance: mockAccountSummary.availableBalance,
  };
}
