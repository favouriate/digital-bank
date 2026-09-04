import { Suspense } from "react";
import type { Metadata } from "next";

import { TransactionHistorySkeleton } from "@/features/transactions/components/transaction-history-skeleton";
import { TransactionHistoryView } from "@/features/transactions/components/transaction-history-view";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function TransactionsPage() {
  return (
    <Suspense fallback={<TransactionHistorySkeleton />}>
      <TransactionHistoryView />
    </Suspense>
  );
}
