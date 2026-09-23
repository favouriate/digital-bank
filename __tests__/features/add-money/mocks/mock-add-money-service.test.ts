import { mockAccountSummary } from "@/features/dashboard/mocks/mock-account";
import {
  AddMoneyError,
  DEMO_FAILURE_AMOUNT,
  mockAddMoney,
} from "@/features/add-money/mocks/mock-add-money-service";
import { resetAddMoneyMocks } from "@/features/add-money/mocks/mock-funding";
import { resetDemoLedger } from "@/mocks/demo-ledger";
import { mockTransactions } from "@/mocks/transactions";

describe("mockAddMoney", () => {
  const originalBalance = mockAccountSummary.availableBalance;

  beforeEach(() => {
    jest.useFakeTimers();
    resetDemoLedger();
    resetAddMoneyMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    resetDemoLedger();
    resetAddMoneyMocks();
  });

  it("credits the account for a valid amount", async () => {
    const promise = mockAddMoney({
      methodId: "debit-card",
      amount: 1000,
      currency: "USD",
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toMatchObject({
      methodId: "debit-card",
      amount: 1000,
      currency: "USD",
      availableBalance: originalBalance + 1000,
    });
    expect(mockAccountSummary.availableBalance).toBe(originalBalance + 1000);
    expect(mockTransactions[0]).toMatchObject({
      type: "deposit",
      amount: 1000,
      currency: "USD",
      direction: "incoming",
      status: "completed",
    });
  });

  it("preserves the original currency while crediting the USD wallet", async () => {
    const promise = mockAddMoney({
      methodId: "bank-transfer",
      amount: 77,
      currency: "GBP",
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toMatchObject({
      amount: 77,
      currency: "GBP",
      availableBalance: originalBalance + 100,
    });
    expect(mockTransactions[0]).toMatchObject({
      type: "deposit",
      amount: 77,
      currency: "GBP",
    });
  });

  it("rejects the demo failure amount", async () => {
    const promise = mockAddMoney({
      methodId: "debit-card",
      amount: DEMO_FAILURE_AMOUNT,
      currency: "USD",
    });
    const assertion = expect(promise).rejects.toBeInstanceOf(AddMoneyError);

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
    expect(mockAccountSummary.availableBalance).toBe(originalBalance);
  });
});
