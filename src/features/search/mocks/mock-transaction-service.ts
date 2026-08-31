import { mockTransactions } from "@/mocks/transactions";
import type { Transaction } from "@/types/transaction";

export async function mockGetTransactions(): Promise<Transaction[]> {
  return mockTransactions;
}
