import { formatMoney } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

export function formatBalance(
  amount: number,
  visible: boolean,
  currency: CurrencyCode = "USD",
) {
  if (!visible) {
    return "••••••";
  }

  return formatMoney(amount, currency);
}

export function formatSignedChange(percent: number) {
  const formatted = Math.abs(percent).toFixed(2).replace(".", ",");
  return percent >= 0 ? `+${formatted}%` : `-${formatted}%`;
}
