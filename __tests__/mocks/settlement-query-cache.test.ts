import { createElement, type ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSendTransferMutation } from "@/features/transfers/hooks/use-send-transfer-mutation";
import { dashboardQueryKey } from "@/features/dashboard/hooks/use-dashboard-query";
import { transferQueryKey } from "@/features/transfers/hooks/use-transfer-query";
import { transactionsQueryKey } from "@/features/search/hooks/use-transactions-query";
import { transactionQueryKey } from "@/features/transactions/hooks/use-transaction-query";
import { transactionListQueryKey } from "@/features/transactions/hooks/use-transactions-query";
import { getDashboard } from "@/features/dashboard/services/dashboard-service";
import { getTransferPage } from "@/features/transfers/services/transfer-service";
import { getTransactions, getTransactionById, listTransactions } from "@/features/transactions/services/transaction-service";
import { resetTransferMocks } from "@/features/transfers/mocks/mock-transfer-service";
import type { DashboardData } from "@/features/dashboard/types/dashboard";
import type { TransferPageData } from "@/features/transfers/types/transfer";
import type { Transaction } from "@/types/transaction";

it("refreshes inactive dashboard, amount, search, history and cached missing details before success", async () => {
  jest.useFakeTimers();
  resetTransferMocks();
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
  const input = { transferId: "cache-transfer", recipientId: "john", recipientName: "John Carter", amount: 775000, currency: "NGN" as const, note: "" };
  const params = { search: "", status: "all" as const, type: "all" as const, startDate: "", endDate: "", page: 1, pageSize: 10 };
  const load = Promise.all([
    client.fetchQuery({ queryKey: dashboardQueryKey, queryFn: getDashboard }),
    client.fetchQuery({ queryKey: transferQueryKey, queryFn: getTransferPage }),
    client.fetchQuery({ queryKey: transactionsQueryKey, queryFn: getTransactions }),
    client.fetchQuery({ queryKey: transactionListQueryKey(params), queryFn: () => listTransactions(params) }),
    client.fetchQuery({ queryKey: transactionQueryKey(input.transferId), queryFn: () => getTransactionById(input.transferId) }),
  ]);
  await jest.advanceTimersByTimeAsync(450);
  await load;
  const { result, unmount } = renderHook(() => useSendTransferMutation(), {
    wrapper: ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children),
  });
  try {
    await act(async () => {
      const send = result.current.mutateAsync(input);
      await jest.advanceTimersByTimeAsync(1000);
      await send;
    });
    expect(client.getQueryData<DashboardData>(dashboardQueryKey)?.account.availableBalance).toBe(10180);
    expect(client.getQueryData<TransferPageData>(transferQueryKey)?.availableBalance).toBe(10180);
    expect(client.getQueryData<Transaction[]>(transactionsQueryKey)?.[0].id).toBe(input.transferId);
    expect(client.getQueryData(transactionListQueryKey(params))).toMatchObject({ items: [expect.objectContaining({ id: input.transferId }), ...Array(9).fill(expect.anything())] });
    expect(client.getQueryData(transactionQueryKey(input.transferId))).toMatchObject({ id: input.transferId, amount: -775000, currency: "NGN" });
  } finally {
    unmount(); client.clear(); resetTransferMocks(); jest.useRealTimers();
  }
});
