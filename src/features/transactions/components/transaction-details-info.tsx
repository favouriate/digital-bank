import type { ReactNode } from "react";
import { Layers2, Smartphone } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { recipientInitials } from "@/features/transfers/lib/format";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

import {
  formatAccountHint,
  formatCurrencyAmount,
  formatMoney,
  formatSignedAmount,
} from "../lib/format-amount";
import { formatTransactionDateTime } from "../lib/format-date";
import {
  formatCategoryLabel,
  partyKind,
  partyRowLabel,
  TRANSACTION_CHANNEL,
  transactionAmountClassName,
} from "../lib/transaction-details";

import { TransactionStatusBadge } from "./transaction-status-badge";
import {
  TransactionTypeIcon,
  transactionIconClassName,
} from "./transaction-type-icon";

type TransactionDetailsInfoProps = {
  transaction: Transaction;
};

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-right text-sm font-medium text-foreground">
        {children}
      </dd>
    </div>
  );
}

export function TransactionDetailsInfo({
  transaction,
}: TransactionDetailsInfoProps) {
  const kind = partyKind(transaction);
  const accountHint = formatAccountHint(
    transaction.bankName,
    transaction.accountMask,
  );
  const incoming = transaction.direction === "incoming";

  return (
    <Card className="gap-0 py-0">
      <div className="hidden items-center gap-3 px-4 py-4 lg:flex">
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full",
            transactionIconClassName(transaction),
          )}
        >
          <TransactionTypeIcon transaction={transaction} className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-semibold text-foreground">
              {transaction.description}
            </p>
            <TransactionStatusBadge status={transaction.status} />
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {accountHint}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={cn(
              "text-lg font-semibold",
              transactionAmountClassName(transaction),
            )}
          >
            {formatSignedAmount(transaction.amount, transaction.currency)}{" "}
            <span className="text-sm font-medium text-muted-foreground">
              {transaction.currency}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-4 lg:hidden">
        <Avatar size="lg" className="shrink-0">
          <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
            {recipientInitials(transaction.counterparty)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">
            {transaction.description}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {accountHint}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {formatTransactionDateTime(transaction.occurredAt)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={cn(
              "text-sm font-semibold",
              incoming ? "text-success" : "text-foreground",
            )}
          >
            {formatSignedAmount(transaction.amount, transaction.currency)}
          </p>
          <p className="text-xs text-muted-foreground">{transaction.currency}</p>
        </div>
      </div>

      <Separator />

      <dl className="divide-y divide-border px-4">
        <DetailRow label="Transaction ID">{transaction.id}</DetailRow>
        <DetailRow label="Date & Time">
          {formatTransactionDateTime(transaction.occurredAt)}
        </DetailRow>
        <DetailRow label="Amount">
          {formatCurrencyAmount(transaction.amount, transaction.currency)}
        </DetailRow>
        <DetailRow label={partyRowLabel(kind)}>
          <span className="inline-flex items-center justify-end gap-2">
            <Avatar size="sm" className="hidden lg:inline-flex">
              <AvatarFallback className="bg-primary text-[0.65rem] font-medium text-primary-foreground">
                {recipientInitials(transaction.counterparty)}
              </AvatarFallback>
            </Avatar>
            <span className="min-w-0">
              <span className="block truncate">{transaction.counterparty}</span>
              <span className="block truncate text-xs font-normal text-muted-foreground">
                {accountHint}
              </span>
            </span>
          </span>
        </DetailRow>
        <DetailRow label="Reference">{transaction.reference}</DetailRow>
        <DetailRow label="Description">
          {transaction.note?.trim() || "—"}
        </DetailRow>
        <DetailRow label="Fees">
          {formatMoney(transaction.fee ?? 0, transaction.currency)}
        </DetailRow>
        <DetailRow label="Status">
          <TransactionStatusBadge status={transaction.status} />
        </DetailRow>
        <DetailRow label="Category">
          <span className="inline-flex items-center justify-end gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Layers2 className="size-3.5" aria-hidden="true" />
            </span>
            {formatCategoryLabel(transaction.category)}
          </span>
        </DetailRow>
        <DetailRow label="Channel">
          <span className="inline-flex items-center justify-end gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-success/10 text-success">
              <Smartphone className="size-3.5" aria-hidden="true" />
            </span>
            {TRANSACTION_CHANNEL}
          </span>
        </DetailRow>
      </dl>
    </Card>
  );
}
