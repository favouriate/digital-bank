import {
  INITIAL_AVAILABLE_BALANCE,
  mockAccountSummary,
} from "@/features/dashboard/mocks/mock-account";
import { mockTransactions } from "@/mocks/transactions";
import {
  DEMO_FAILURE_AMOUNT,
  DEMO_PENDING_AMOUNT,
  mockSendTransfer,
  mockVerifyPin,
  PinError,
  resetTransferMocks,
  TransferError,
} from "@/features/transfers/mocks/mock-transfer-service";
import { MOCK_TRANSFER_PIN } from "@/features/transfers/schemas/transfer-schema";

describe("mockSendTransfer", () => {
  const originalBalance = INITIAL_AVAILABLE_BALANCE;
  const originalCount = mockTransactions.length;

  beforeEach(() => {
    jest.useFakeTimers();
    mockAccountSummary.availableBalance = originalBalance;
    resetTransferMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    mockAccountSummary.availableBalance = originalBalance;
    resetTransferMocks();
  });

  it("debits the account for a valid transfer", async () => {
    const promise = mockSendTransfer({
      transferId: crypto.randomUUID(),
      currency: "USD",
      recipientId: "contact-astrid-hayes",
      amount: 100,
      note: "Lunch",
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toMatchObject({
      recipientId: "contact-astrid-hayes",
      amount: 100,
      outcome: "success",
      availableBalance: originalBalance - 100,
    });
    expect(mockAccountSummary.availableBalance).toBe(originalBalance - 100);
    expect(mockTransactions[0]?.counterparty).toBe("Astrid Hayes");
    expect(mockTransactions[0]?.note).toBe("Lunch");
    expect(mockTransactions[0]?.counterpartyEmail).toBe(
      "astrid.hayes@example.com",
    );
  });

  it("rejects the demo failure amount without changing the balance", async () => {
    const promise = mockSendTransfer({
      transferId: crypto.randomUUID(),
      currency: "USD",
      recipientId: "contact-astrid-hayes",
      amount: DEMO_FAILURE_AMOUNT,
      note: "",
    });
    const assertion = expect(promise).rejects.toBeInstanceOf(TransferError);

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
    expect(mockAccountSummary.availableBalance).toBe(originalBalance);
    expect(mockTransactions).toHaveLength(originalCount);
  });

  it("debits the account again from the remaining balance", async () => {
    const first = mockSendTransfer({
      transferId: crypto.randomUUID(),
      currency: "USD",
      recipientId: "contact-astrid-hayes",
      amount: 100,
      note: "",
    });
    await jest.advanceTimersByTimeAsync(450);
    await first;

    const promise = mockSendTransfer({
      transferId: crypto.randomUUID(),
      currency: "USD",
      recipientId: "contact-astrid-hayes",
      amount: 50,
      note: "",
    });
    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toMatchObject({
      amount: 50,
      outcome: "success",
      availableBalance: originalBalance - 150,
    });
    expect(mockAccountSummary.availableBalance).toBe(originalBalance - 150);
  });

  it("rejects an amount above the remaining balance", async () => {
    mockAccountSummary.availableBalance = 40;
    const promise = mockSendTransfer({
      transferId: crypto.randomUUID(),
      currency: "USD",
      recipientId: "contact-astrid-hayes",
      amount: 40.01,
      note: "",
    });
    const assertion = expect(promise).rejects.toBeInstanceOf(TransferError);
    await jest.advanceTimersByTimeAsync(450);
    await assertion;
    expect(mockAccountSummary.availableBalance).toBe(40);
  });

  it("returns pending for the demo pending amount", async () => {
    const promise = mockSendTransfer({
      transferId: crypto.randomUUID(),
      currency: "USD",
      recipientId: "contact-astrid-hayes",
      amount: DEMO_PENDING_AMOUNT,
      note: "",
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toMatchObject({
      outcome: "pending",
      availableBalance: originalBalance,
    });
    expect(mockAccountSummary.availableBalance).toBe(originalBalance);
  });
});

describe("mockVerifyPin", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("accepts the demo PIN", async () => {
    const promise = mockVerifyPin(MOCK_TRANSFER_PIN);
    await jest.advanceTimersByTimeAsync(450);
    await expect(promise).resolves.toBeUndefined();
  });

  it("accepts any 4-digit PIN", async () => {
    const promise = mockVerifyPin("9090");
    await jest.advanceTimersByTimeAsync(450);
    await expect(promise).resolves.toBeUndefined();
  });

  it("rejects a malformed PIN at the service boundary", async () => {
    const promise = mockVerifyPin("12ab");
    const assertion = expect(promise).rejects.toBeInstanceOf(PinError);

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });
});
