import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionStatusBadge } from "@/features/transactions/components/transaction-status-badge";
import { formatAmount, formatTransactionDate } from "@/features/search/lib/format";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

type RecentTransactionsProps = {
  transactions: Transaction[];
  variant: "desktop" | "mobile";
};

function TransactionIcon({ transaction }: { transaction: Transaction }) {
  return (
    <Avatar>
      <AvatarFallback
        className={cn(
          transaction.counterparty === "Bitcoin" && "bg-warning/15 text-warning",
          transaction.counterparty === "PayPal" && "bg-primary/10 text-primary",
        )}
      >
        {transaction.counterparty.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

function TransactionRow({
  transaction,
  variant,
}: {
  transaction: Transaction;
  variant: "desktop" | "mobile";
}) {
  const amountClass =
    transaction.amount < 0 ? "text-destructive" : "text-success";

  return (
    <Link
      href={`/transactions/${transaction.id}`}
      className={cn(
        "grid min-h-11 items-center gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20",
        variant === "desktop"
          ? "grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1fr)_auto_auto]"
          : "grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto]",
      )}
    >
      <div className={variant === "mobile" ? "row-span-2 self-center" : undefined}>
        <TransactionIcon transaction={transaction} />
      </div>
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">
          {transaction.description}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {formatTransactionDate(transaction.occurredAt)}
          {variant === "mobile" ? ` · ${transaction.accountMask}` : null}
        </p>
      </div>
      {variant === "desktop" ? (
        <p className="hidden truncate text-sm text-muted-foreground lg:block">
          {transaction.accountMask}
        </p>
      ) : null}
      <p className={cn("text-right text-sm font-semibold", amountClass)}>
        {formatAmount(transaction.amount)}
      </p>
      <div
        className={cn(
          variant === "mobile" && "col-start-3 row-start-2 justify-self-end",
        )}
      >
        <TransactionStatusBadge status={transaction.status} />
      </div>
    </Link>
  );
}

export function RecentTransactions({
  transactions,
  variant,
}: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>Recent Transactions</CardTitle>
        <Link
          href="/transactions"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent transactions yet. Your recent activity will appear here.
          </p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="border-b border-border last:border-b-0"
              >
                <TransactionRow transaction={transaction} variant={variant} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
