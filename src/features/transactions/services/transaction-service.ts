import {
  mockGetTransactionById,
  mockGetTransactions,
  mockListTransactions,
} from "../mocks/mock-transaction-service";
import type {
  TransactionListParams,
  TransactionListResult,
} from "../types/transaction-list";
import type { Transaction } from "@/types/transaction";

export async function getTransactions(): Promise<Transaction[]> {
  return mockGetTransactions();
}

export async function listTransactions(
  params: TransactionListParams,
): Promise<TransactionListResult> {
  return mockListTransactions(params);
}

export async function getTransactionById(
  id: string,
): Promise<Transaction | null> {
  return mockGetTransactionById(id);
}
