import { formatMoney } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

export function formatTransferAmount(
  amount: number,
  currency: CurrencyCode = "USD",
) {
  return formatMoney(amount, currency);
}

export function formatAmountInput(amount: number) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function recipientInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "NA";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
