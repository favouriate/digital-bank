import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { getTransactions } from "@/features/search/services/transaction-service";

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transactions = await getTransactions();
  const transaction = transactions.find((item) => item.id === id);

  return (
    <RoutePlaceholder title={transaction?.description ?? "Transaction"} />
  );
}
