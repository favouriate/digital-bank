import type { Metadata } from "next";

import { TransactionDetailsView } from "@/features/transactions/components/transaction-details-view";

export const metadata: Metadata = {
  title: "Transaction Details",
};

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <TransactionDetailsView transactionId={id} />;
}
