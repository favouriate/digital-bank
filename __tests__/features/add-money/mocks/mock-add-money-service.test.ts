import { mockAccountSummary } from "@/features/dashboard/mocks/mock-account";
import {
  AddMoneyError,
  DEMO_FAILURE_AMOUNT,
  mockAddMoney,
} from "@/features/add-money/mocks/mock-add-money-service";
import { resetAddMoneyMocks } from "@/features/add-money/mocks/mock-funding";

describe("mockAddMoney", () => {
  const originalBalance = mockAccountSummary.availableBalance;

  beforeEach(() => {
    jest.useFakeTimers();
    mockAccountSummary.availableBalance = originalBalance;
    resetAddMoneyMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    mockAccountSummary.availableBalance = originalBalance;
    resetAddMoneyMocks();
  });

  it("credits the account for a valid amount", async () => {
    const promise = mockAddMoney({
      methodId: "debit-card",
      amount: 1000,
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toMatchObject({
      methodId: "debit-card",
      amount: 1000,
      availableBalance: originalBalance + 1000,
    });
    expect(mockAccountSummary.availableBalance).toBe(originalBalance + 1000);
  });

  it("rejects the demo failure amount", async () => {
    const promise = mockAddMoney({
      methodId: "debit-card",
      amount: DEMO_FAILURE_AMOUNT,
    });
    const assertion = expect(promise).rejects.toBeInstanceOf(AddMoneyError);

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
    expect(mockAccountSummary.availableBalance).toBe(originalBalance);
  });
});
