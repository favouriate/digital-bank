import { mockAccountSummary, getAvailableBalanceMinor } from "@/features/dashboard/mocks/mock-account";
import { mockSendTransfer, mockValidateTransfer, resetTransferMocks } from "@/features/transfers/mocks/mock-transfer-service";
import { mockGetDashboard } from "@/features/dashboard/mocks/mock-dashboard-service";
import { mockGetTransferPage } from "@/features/transfers/mocks/mock-transfer-service";
import { mockGetTransactionById, mockGetTransactions } from "@/features/transactions/mocks/mock-transaction-service";
import { destFromUsd } from "@/features/transfers/lib/convert-amount";
import { createTransferAmountSchema } from "@/features/transfers/schemas/amount-schema";
import { DEMO_LEDGER_KEY } from "@/mocks/demo-ledger";
import { mockTransactions } from "@/mocks/transactions";
import type { TransferRequest } from "@/features/transfers/types/transfer";

const request = (amount: number, transferId = crypto.randomUUID()): TransferRequest => ({
  currency: "USD",
  transferId, amount, recipientId: "john-carter", recipientName: "John Carter", note: "",
  bankName: "Bank of America", accountMask: "**** 6789",
});
async function settle(input: TransferRequest) {
  const result = mockSendTransfer(input);
  const assertion = result.catch((error: unknown) => error);
  await jest.advanceTimersByTimeAsync(450);
  return assertion;
}

beforeEach(() => { jest.useFakeTimers(); resetTransferMocks(); });
afterEach(() => { jest.restoreAllMocks(); resetTransferMocks(); jest.useRealTimers(); });

it("shares 10680 -> 10180 -> 10000 across dashboard, transfer validation, history and details", async () => {
  const input = request(500);
  await settle(input);
  expect(getAvailableBalanceMinor()).toBe(1018000);
  const dashboard = mockGetDashboard();
  const transferPage = mockGetTransferPage();
  const details = mockGetTransactionById(input.transferId);
  await jest.advanceTimersByTimeAsync(450);
  expect((await dashboard).account.availableBalance).toBe(10180);
  expect((await transferPage).availableBalance).toBe(10180);
  const transaction = (await mockGetTransactions())[0];
  expect(await details).toEqual(transaction);
  expect(transaction).toMatchObject({ id: input.transferId, counterparty: "John Carter", amount: -500,
    status: "completed", bankName: "Bank of America", accountMask: "**** 6789" });
  expect(destFromUsd(10180, "NGN")).toBe(15779000);
  await settle(request(180));
  expect(getAvailableBalanceMinor()).toBe(1000000);
  expect(createTransferAmountSchema(10000).safeParse("10000.01").success).toBe(false);
});

it("deduplicates concurrent and later confirmations and preserves the reference", async () => {
  mockAccountSummary.availableBalance = 10000;
  const count = mockTransactions.length;
  const input = request(500);
  const first = mockSendTransfer(input);
  const duplicate = mockSendTransfer(input);
  await jest.advanceTimersByTimeAsync(450);
  expect(await duplicate).toEqual(await first);
  await settle(request(100));
  const repeated = await settle(input);
  expect(repeated).toMatchObject({ availableBalance: 9400, transaction: (await first).transaction });
  expect(getAvailableBalanceMinor()).toBe(940000);
  expect(mockTransactions).toHaveLength(count + 2);
  expect(await settle({ ...input, amount: 600 })).toBeInstanceOf(Error);
  expect(getAvailableBalanceMinor()).toBe(940000);
});

it("keeps failed and pending funds unchanged and deduplicates pending records", async () => {
  const count = mockTransactions.length;
  expect(await settle(request(13))).toBeInstanceOf(Error);
  expect(mockTransactions).toHaveLength(count);
  const input = request(17);
  await settle(input);
  await settle(input);
  expect(mockTransactions).toHaveLength(count + 1);
  expect(mockTransactions[0].status).toBe("pending");
  expect(getAvailableBalanceMinor()).toBe(1068000);
});

it.each([0, -100, NaN, Infinity, 20000])("rejects invalid or unaffordable amount %s without side effects", async (amount) => {
  const count = mockTransactions.length;
  expect(await settle(request(amount))).toBeInstanceOf(Error);
  expect(getAvailableBalanceMinor()).toBe(1068000);
  expect(mockTransactions).toHaveLength(count);
});

it("revalidates balance at settlement and blocks pending when unaffordable", async () => {
  mockAccountSummary.availableBalance = 500;
  const input = request(500);
  const validation = mockValidateTransfer(input);
  await jest.advanceTimersByTimeAsync(450);
  await validation;
  await settle(request(490));
  expect(await settle(input)).toEqual(new Error("Insufficient balance."));
  expect(await settle(request(17))).toEqual(new Error("Insufficient balance."));
  expect(getAvailableBalanceMinor()).toBe(1000);
});

it("serializes competing transfers against current funds", async () => {
  mockAccountSummary.availableBalance = 500;
  const results = Promise.allSettled([mockSendTransfer(request(400)), mockSendTransfer(request(400))]);
  await jest.advanceTimersByTimeAsync(450);
  expect((await results).map((item) => item.status)).toEqual(["fulfilled", "rejected"]);
  expect(getAvailableBalanceMinor()).toBe(10000);
});

it("rolls back a failed storage write and allows retry with the same ID", async () => {
  const input = request(500);
  const count = mockTransactions.length;
  const write = jest.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => { throw new Error("Quota exceeded"); });
  expect(await settle(input)).toBeInstanceOf(Error);
  expect(mockTransactions).toHaveLength(count);
  expect(getAvailableBalanceMinor()).toBe(1068000);
  write.mockRestore();
  await settle(input);
  expect(getAvailableBalanceMinor()).toBe(1018000);
  const stored = JSON.parse(sessionStorage.getItem(DEMO_LEDGER_KEY)!);
  expect(stored.availableBalanceMinor).toBe(1018000);
  expect(stored.transactions[0].id).toBe(input.transferId);
  expect(JSON.stringify(stored)).not.toContain('"pin"');
});

it("subtracts cents exactly and can spend the full balance", async () => {
  mockAccountSummary.availableBalance = 2.30;
  await settle(request(1.10));
  expect(getAvailableBalanceMinor()).toBe(120);
  await settle(request(1.20));
  expect(getAvailableBalanceMinor()).toBe(0);
});
