import { mockGetTransactions } from "../mocks/mock-transaction-service";
import type { Transaction } from "@/types/transaction";

export async function getTransactions(): Promise<Transaction[]> {
  return mockGetTransactions();
}
