import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

import { formatSignedAmount } from "../lib/format-amount";
import {
  statusSentence,
  summaryTitle,
  transactionAmountClassName,
} from "../lib/transaction-details";

import { TransactionStatusBadge } from "./transaction-status-badge";
import {
  TransactionTypeIcon,
  transactionIconClassName,
} from "./transaction-type-icon";

type TransactionDetailsSummaryProps = {
  transaction: Transaction;
};

export function TransactionDetailsSummary({
  transaction,
}: TransactionDetailsSummaryProps) {
  return (
    <Card className="items-center gap-3 px-6 py-6 text-center">
      <span
        className={cn(
          "flex size-14 items-center justify-center rounded-full",
          transactionIconClassName(transaction),
        )}
      >
        <TransactionTypeIcon transaction={transaction} className="size-6" />
      </span>
      <p className="text-sm text-muted-foreground">
        {summaryTitle(transaction)}
      </p>
      <div>
        <p
          className={cn(
            "text-3xl font-semibold tracking-tight",
            transactionAmountClassName(transaction),
          )}
        >
          {formatSignedAmount(transaction.amount, transaction.currency)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {transaction.currency}
        </p>
      </div>
      <TransactionStatusBadge status={transaction.status} />
      <p className="max-w-xs text-xs text-muted-foreground">
        {statusSentence(transaction)}
      </p>
    </Card>
  );
}
