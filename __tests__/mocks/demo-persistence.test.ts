import { DEMO_LEDGER_KEY, DEMO_LEDGER_VERSION } from "@/mocks/demo-ledger";

beforeEach(() => { sessionStorage.clear(); jest.resetModules(); });
afterEach(() => { sessionStorage.clear(); jest.useRealTimers(); });

it("restores cents and idempotency records after a full module reload", async () => {
  jest.useFakeTimers();
  const input = { transferId: "persisted-transfer", recipientId: "john", recipientName: "John Carter", amount: 50000, currency: "NGN" as const, note: "" };
  const service = await import("@/features/transfers/mocks/mock-transfer-service");
  const send = service.mockSendTransfer(input);
  await jest.advanceTimersByTimeAsync(450);
  const first = await send;
  expect(first.transaction).toMatchObject({ amount: -50000, currency: "NGN" });
  jest.resetModules();
  const freshService = await import("@/features/transfers/mocks/mock-transfer-service");
  const repeat = freshService.mockSendTransfer(input);
  await jest.advanceTimersByTimeAsync(450);
  expect(await repeat).toEqual(first);
  const { mockTransactions } = await import("@/mocks/transactions");
  expect(mockTransactions.filter((item) => item.id === input.transferId)).toHaveLength(1);
});

it("resets the legacy ledger once without touching preferences", async () => {
  sessionStorage.setItem("openpay.display-currency", "GBP");
  sessionStorage.setItem(DEMO_LEDGER_KEY, JSON.stringify({ availableBalance: 10180.25, transactions: [] }));
  const ledger = await import("@/mocks/demo-ledger");
  ledger.hydrateDemoLedger();
  const account = await import("@/features/dashboard/mocks/mock-account");
  expect(account.getAvailableBalanceMinor()).toBe(1068000);
  expect(JSON.parse(sessionStorage.getItem(DEMO_LEDGER_KEY)!).version).toBe(DEMO_LEDGER_VERSION);
  expect(sessionStorage.getItem("openpay.display-currency")).toBe("GBP");
  account.mockAccountSummary.availableBalance = 10000;
  ledger.persistDemoLedger();
  jest.resetModules();
  const fresh = await import("@/mocks/demo-ledger");
  fresh.hydrateDemoLedger();
  const freshAccount = await import("@/features/dashboard/mocks/mock-account");
  expect(freshAccount.getAvailableBalanceMinor()).toBe(1000000);
  ledger.resetDemoLedger();
  expect(account.getAvailableBalanceMinor()).toBe(1068000);
  expect(sessionStorage.getItem(DEMO_LEDGER_KEY)).toBeNull();
});

it("rejects malformed stored data as a whole", async () => {
  sessionStorage.setItem(DEMO_LEDGER_KEY, JSON.stringify({ availableBalance: -500, transactions: [{}] }));
  const ledger = await import("@/mocks/demo-ledger");
  ledger.hydrateDemoLedger();
  const account = await import("@/features/dashboard/mocks/mock-account");
  expect(account.getAvailableBalanceMinor()).toBe(1068000);
  expect(JSON.parse(sessionStorage.getItem(DEMO_LEDGER_KEY)!).version).toBe(DEMO_LEDGER_VERSION);
});
