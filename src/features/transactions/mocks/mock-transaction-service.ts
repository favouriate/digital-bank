import { mockTransactions } from "@/mocks/transactions";
import type { Transaction } from "@/types/transaction";

import {
  TRANSACTION_DETAIL_LOAD_ERROR_ID,
  TRANSACTION_LOAD_ERROR_QUERY,
  type TransactionListParams,
  type TransactionListResult,
} from "../types/transaction-list";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function occurredDay(isoDate: string) {
  return isoDate.slice(0, 10);
}

export function filterMockTransactions(
  params: Pick<TransactionListParams, "search" | "status" | "startDate" | "endDate">,
): Transaction[] {
  const search = params.search.trim().toLowerCase();

  return mockTransactions
    .filter((transaction) => {
      if (params.status !== "all" && transaction.status !== params.status) {
        return false;
      }

      const day = occurredDay(transaction.occurredAt);
      if (params.startDate && day < params.startDate) {
        return false;
      }
      if (params.endDate && day > params.endDate) {
        return false;
      }

      if (!search) {
        return true;
      }

      return [
        transaction.description,
        transaction.counterparty,
        transaction.bankName,
        transaction.reference,
      ].some((value) => value.toLowerCase().includes(search));
    })
    .slice()
    .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt));
}

export async function mockGetTransactions(): Promise<Transaction[]> {
  return mockTransactions;
}

export async function mockListTransactions(
  params: TransactionListParams,
): Promise<TransactionListResult> {
  await wait(450);

  if (params.search.trim().toLowerCase() === TRANSACTION_LOAD_ERROR_QUERY) {
    throw new Error("Unable to load transactions.");
  }

  const filtered = filterMockTransactions(params);
  const pageSize = Math.max(1, params.pageSize);
  const totalItems = filtered.length;
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);
  const page =
    totalPages === 0 ? 1 : Math.min(Math.max(params.page, 1), totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    page,
    pageSize,
    totalItems,
    totalPages,
  };
}

export async function mockGetTransactionById(
  id: string,
): Promise<Transaction | null> {
  await wait(450);

  if (id.trim().toLowerCase() === TRANSACTION_DETAIL_LOAD_ERROR_ID) {
    throw new Error("Unable to load transaction.");
  }

  return mockTransactions.find((transaction) => transaction.id === id) ?? null;
}
