import { formatMoney as formatCurrency } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

export function formatSignedAmount(amount: number, currency: CurrencyCode = "USD") {
  const formatted = formatCurrency(Math.abs(amount), currency);

  if (amount > 0) {
    return `+${formatted}`;
  }

  if (amount < 0) {
    return `-${formatted}`;
  }

  return formatted;
}

export function formatMoney(amount: number, currency: CurrencyCode = "USD") {
  return formatCurrency(Math.abs(amount), currency);
}

export function formatCurrencyAmount(amount: number, currency: CurrencyCode = "USD") {
  return `${formatMoney(amount, currency)} ${currency}`;
}

export function formatAccountHint(bankName: string, accountMask: string) {
  const digits = accountMask.replace(/\D/g, "");
  const last4 = digits.slice(-4);

  if (!last4) {
    return bankName;
  }

  return `${bankName} •••• ${last4}`;
}
