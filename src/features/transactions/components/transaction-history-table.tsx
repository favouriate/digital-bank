import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

import { formatAccountHint, formatSignedAmount } from "../lib/format-amount";
import { formatTransactionDateParts } from "../lib/format-date";

import { TransactionStatusBadge } from "./transaction-status-badge";
import {
  TransactionTypeIcon,
  transactionIconClassName,
} from "./transaction-type-icon";

type TransactionHistoryTableProps = {
  transactions: Transaction[];
};

function RowLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "flex min-h-11 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function TransactionHistoryTable({
  transactions,
}: TransactionHistoryTableProps) {
  return (
    <Table className="min-w-0">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="px-4">Transaction</TableHead>
          <TableHead className="px-4">Date</TableHead>
          <TableHead className="px-4">Status</TableHead>
          <TableHead className="px-4 text-right">Amount</TableHead>
          <TableHead className="w-10 px-2">
            <span className="sr-only">View</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const href = `/transactions/${transaction.id}`;
          const parts = formatTransactionDateParts(transaction.occurredAt);
          const incoming = transaction.direction === "incoming";

          return (
            <TableRow key={transaction.id} className="hover:bg-muted/40">
              <TableCell className="px-4 py-3">
                <RowLink href={href} className="gap-3">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full",
                      transactionIconClassName(transaction),
                    )}
                  >
                    <TransactionTypeIcon transaction={transaction} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">
                      {transaction.description}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {formatAccountHint(
                        transaction.bankName,
                        transaction.accountMask,
                      )}
                    </span>
                  </span>
                </RowLink>
              </TableCell>
              <TableCell className="px-4 py-3">
                <RowLink href={href} className="flex-col items-start gap-0.5">
                  <span className="text-sm text-foreground">{parts.date}</span>
                  <span className="text-xs text-muted-foreground">
                    {parts.time}
                  </span>
                </RowLink>
              </TableCell>
              <TableCell className="px-4 py-3">
                <RowLink href={href}>
                  <TransactionStatusBadge status={transaction.status} />
                </RowLink>
              </TableCell>
              <TableCell className="px-4 py-3">
                <RowLink href={href} className="flex-col items-end gap-0.5">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      incoming ? "text-success" : "text-foreground",
                    )}
                  >
                    {formatSignedAmount(
                      transaction.amount,
                      transaction.currency,
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {transaction.currency}
                  </span>
                </RowLink>
              </TableCell>
              <TableCell className="px-2 py-3">
                <RowLink
                  href={href}
                  className="justify-center"
                  aria-label={`View ${transaction.description}`}
                >
                  <ChevronRight
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </RowLink>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
