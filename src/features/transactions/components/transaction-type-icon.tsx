import {
  ArrowDownToLine,
  CircleX,
  Clock,
  Landmark,
  Send,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

type TransactionTypeIconProps = {
  transaction: Transaction;
  className?: string;
};

export function transactionIconClassName(transaction: Transaction) {
  if (transaction.status === "failed") {
    return "bg-destructive/10 text-destructive";
  }

  if (transaction.status === "pending") {
    return "bg-warning/10 text-warning";
  }

  if (transaction.type === "bill-payment") {
    return "bg-savings/10 text-savings";
  }

  if (transaction.direction === "incoming") {
    return "bg-success/10 text-success";
  }

  return "bg-primary/10 text-primary";
}

export function TransactionTypeIcon({
  transaction,
  className,
}: TransactionTypeIconProps) {
  const iconClassName = cn("size-4", className);

  if (transaction.status === "failed") {
    return <CircleX className={iconClassName} aria-hidden="true" />;
  }

  if (transaction.status === "pending") {
    return <Clock className={iconClassName} aria-hidden="true" />;
  }

  if (transaction.type === "bill-payment") {
    return <Landmark className={iconClassName} aria-hidden="true" />;
  }

  if (transaction.direction === "incoming") {
    return <ArrowDownToLine className={iconClassName} aria-hidden="true" />;
  }

  return <Send className={iconClassName} aria-hidden="true" />;
}
