import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

import { formatAccountHint, formatSignedAmount } from "../lib/format-amount";
import { formatTransactionDateTime } from "../lib/format-date";

import { TransactionStatusBadge } from "./transaction-status-badge";
import {
  TransactionTypeIcon,
  transactionIconClassName,
} from "./transaction-type-icon";

type TransactionHistoryListProps = {
  transactions: Transaction[];
};

export function TransactionHistoryList({
  transactions,
}: TransactionHistoryListProps) {
  return (
    <Card className="gap-0 py-0">
      <ul className="divide-y divide-border">
        {transactions.map((transaction) => {
          const incoming = transaction.direction === "incoming";

          return (
            <li key={transaction.id}>
              <Link
                href={`/transactions/${transaction.id}`}
                className="flex min-h-16 items-center gap-3 px-4 py-3 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    transactionIconClassName(transaction),
                  )}
                >
                  <TransactionTypeIcon transaction={transaction} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-foreground">
                    {transaction.description}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {formatAccountHint(
                      transaction.bankName,
                      transaction.accountMask,
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {formatTransactionDateTime(transaction.occurredAt)}
                  </span>
                </span>
                <TransactionStatusBadge
                  status={transaction.status}
                  className="shrink-0"
                />
                <span className="shrink-0 text-right">
                  <span
                    className={cn(
                      "block text-sm font-semibold",
                      incoming ? "text-success" : "text-foreground",
                    )}
                  >
                    {formatSignedAmount(
                      transaction.amount,
                      transaction.currency,
                    )}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {transaction.currency}
                  </span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
