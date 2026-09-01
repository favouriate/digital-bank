import { formatSignedAmount } from "@/features/transactions/lib/format-amount";
import type { Transaction } from "@/types/transaction";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatAmount(amount: number, currency = "USD") {
  return formatSignedAmount(amount, currency);
}

export function formatTransactionDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}

export function formatTransactionStatus(status: Transaction["status"]) {
  if (status === "completed") {
    return "Completed";
  }
  if (status === "pending") {
    return "Pending";
  }
  return "Failed";
}
