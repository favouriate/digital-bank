import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionStatusBadge } from "@/features/transactions/components/transaction-status-badge";
import type { AddMoneyDeposit } from "../types/add-money";

import { formatAddMoneyAmount, formatDepositDate } from "../lib/format";

type RecentDepositsProps = {
  deposits: AddMoneyDeposit[];
};

export function RecentDeposits({ deposits }: RecentDepositsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>Recent deposits</CardTitle>
        <Link
          href="/transactions"
          className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline"
        >
          View all
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent>
        {deposits.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No deposits yet. Completed funding will appear here.
          </p>
        ) : (
          <ul>
            {deposits.map((deposit) => (
              <li
                key={deposit.id}
                className="flex min-h-11 items-center gap-3 border-b border-border py-3 last:border-b-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">
                    {deposit.sourceLabel}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {deposit.sourceDetail} · {formatDepositDate(deposit.occurredAt)}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {formatAddMoneyAmount(deposit.amount)}
                </p>
                <TransactionStatusBadge status={deposit.status} />
                <ChevronRight
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
