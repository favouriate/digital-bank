import type { Metadata } from "next";

import { TransactionHistoryView } from "@/features/transactions/components/transaction-history-view";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function TransactionsPage() {
  return <TransactionHistoryView />;
}
