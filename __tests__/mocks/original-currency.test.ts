import { createElement } from "react";
import { act, cleanup, render, renderHook } from "@testing-library/react";
import { mockSendTransfer, resetTransferMocks } from "@/features/transfers/mocks/mock-transfer-service";
import { getAvailableBalanceMinor } from "@/features/dashboard/mocks/mock-account";
import { mockTransactions } from "@/mocks/transactions";
import { mockGetTransactionById } from "@/features/transactions/mocks/mock-transaction-service";
import { RecentTransactions } from "@/features/dashboard/components/recent-transactions";
import { TransactionHistoryTable } from "@/features/transactions/components/transaction-history-table";
import { TransactionHistoryList } from "@/features/transactions/components/transaction-history-list";
import { TransactionDetailsSummary } from "@/features/transactions/components/transaction-details-summary";
import { useDisplayCurrency } from "@/features/dashboard/hooks/use-display-currency";
import { formatMoney } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";
import type { TransferRequest } from "@/features/transfers/types/transfer";

const cases: [CurrencyCode, number, number][] = [
  ["NGN", 50000, 3226], ["USD", 100, 10000], ["GBP", 50, 6494],
  ["CAD", 136, 10000], ["GHS", 1550, 10000], ["ZAR", 1820, 10000],
];
const request = (currency: CurrencyCode, amount: number): TransferRequest => ({
  transferId: crypto.randomUUID(), recipientId: "currency-test", recipientName: "Test Recipient",
  amount, currency, note: "Currency regression",
});
async function send(input: TransferRequest) {
  const pending = mockSendTransfer(input);
  await jest.advanceTimersByTimeAsync(450);
  return pending;
}
beforeEach(() => { jest.useFakeTimers(); resetTransferMocks(); });
afterEach(() => { cleanup(); resetTransferMocks(); sessionStorage.clear(); jest.useRealTimers(); });

it.each(cases)("preserves %s %s while settling %s USD cents", async (currency, amount, debit) => {
  const input = request(currency, amount);
  const result = await send(input);
  expect(result).toMatchObject({ amount, currency, transaction: { amount: -amount, currency } });
  expect(getAvailableBalanceMinor()).toBe(1068000 - debit);
  const detail = mockGetTransactionById(input.transferId);
  await jest.advanceTimersByTimeAsync(450);
  expect(await detail).toEqual(result.transaction);
  expect(await send(input)).toEqual(result);
  expect(getAvailableBalanceMinor()).toBe(1068000 - debit);
});

it("renders a mixed list consistently regardless of dashboard display preference", async () => {
  for (const [currency, amount] of cases.slice(0, 3)) await send(request(currency, amount));
  const transactions = mockTransactions.slice(0, 3);
  const { result } = renderHook(() => useDisplayCurrency("USD"));
  act(() => result.current.setDisplayCurrency("CAD"));
  expect(result.current.displayCurrency).toBe("CAD");
  for (const Component of [RecentTransactions, TransactionHistoryTable, TransactionHistoryList]) {
    const view = render(createElement(Component, { transactions }));
    for (const transaction of transactions) {
      expect(view.getByText(`-${formatMoney(Math.abs(transaction.amount), transaction.currency)}`)).toBeInTheDocument();
      expect(view.getByText(transaction.currency)).toBeInTheDocument();
    }
    view.unmount();
  }
  for (const transaction of transactions) {
    const view = render(createElement(TransactionDetailsSummary, { transaction }));
    expect(view.getByText(`-${formatMoney(Math.abs(transaction.amount), transaction.currency)}`)).toBeInTheDocument();
    expect(view.getByText(transaction.currency)).toBeInTheDocument();
    view.unmount();
  }
});

it("rejects reused IDs with different currency or equal USD equivalent", async () => {
  const input = request("USD", 100);
  await send(input);
  for (const amount of [100, 155000]) {
    const promise = mockSendTransfer({ ...input, currency: "NGN", amount });
    const assertion = expect(promise).rejects.toThrow("different details");
    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  }
  expect(getAvailableBalanceMinor()).toBe(1058000);
});

it.each([undefined, "EUR"])("rejects unsupported currency %s without settlement", async (currency) => {
  const input = { ...request("USD", 100), currency } as unknown as TransferRequest;
  const promise = mockSendTransfer(input);
  const assertion = expect(promise).rejects.toThrow("supported currency");
  await jest.advanceTimersByTimeAsync(450);
  await assertion;
  expect(getAvailableBalanceMinor()).toBe(1068000);
});

it("keeps NGN pending and failed outcomes tied to USD settlement amounts", async () => {
  const failed = mockSendTransfer(request("NGN", 20150));
  const assertion = expect(failed).rejects.toThrow();
  await jest.advanceTimersByTimeAsync(450);
  await assertion;
  const result = await send(request("NGN", 26350));
  expect(result).toMatchObject({ outcome: "pending", amount: 26350, currency: "NGN" });
  expect(getAvailableBalanceMinor()).toBe(1068000);
});
