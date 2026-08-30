import type { Transaction } from "@/types/transaction";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatAmount(amount: number) {
  const formatted = currencyFormatter.format(Math.abs(amount));
  if (amount > 0) {
    return `+${formatted}`;
  }
  if (amount < 0) {
    return `-${formatted}`;
  }
  return formatted;
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
