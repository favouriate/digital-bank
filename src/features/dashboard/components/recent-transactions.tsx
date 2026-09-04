import Link from "next/link";
import {
  ArrowDownToLine,
  Landmark,
  Send,
} from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatAmount } from "@/features/search/lib/format";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

import { formatDashboardTimestamp } from "../lib/format-activity-time";

type RecentTransactionsProps = {
  transactions: Transaction[];
};

function TransactionTypeIcon({ transaction }: { transaction: Transaction }) {
  const className = "size-4";

  if (transaction.amount > 0) {
    return <ArrowDownToLine className={className} aria-hidden="true" />;
  }

  if (
    transaction.counterparty.toLowerCase().includes("electric") ||
    transaction.description.toLowerCase().includes("bill")
  ) {
    return <Landmark className={className} aria-hidden="true" />;
  }

  return <Send className={className} aria-hidden="true" />;
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isCredit = transaction.amount > 0;
  const amountClass = isCredit ? "text-success" : "text-foreground";

  return (
    <Link
      href={`/transactions/${transaction.id}`}
      className="grid min-h-11 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-muted/60 focus-visible:ring-offset-0"
    >
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-full",
          isCredit ? "bg-success/10 text-success" : "bg-primary/10 text-primary",
        )}
      >
        <TransactionTypeIcon transaction={transaction} />
      </span>
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">
          {transaction.description}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {formatDashboardTimestamp(transaction.occurredAt)}
        </p>
      </div>
      <div className="text-right">
        <p className={cn("text-sm font-semibold", amountClass)}>
          {formatAmount(transaction.amount, transaction.currency)}
        </p>
        <p className="text-xs text-muted-foreground">{transaction.currency}</p>
      </div>
    </Link>
  );
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
        <CardAction>
          <Link
            href="/transactions"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent transactions yet.
          </p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="border-b border-border last:border-b-0"
              >
                <TransactionRow transaction={transaction} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      {transactions.length > 0 ? (
        <CardFooter className="justify-center border-0 bg-transparent">
          <Link
            href="/transactions"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all transactions →
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
}
