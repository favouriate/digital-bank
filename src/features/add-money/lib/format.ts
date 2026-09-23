import { formatMoney } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatAddMoneyAmount(
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

export function formatDepositDate(isoDate: string) {
  return dateTimeFormatter.format(new Date(isoDate));
}

export function toShortCardMask(maskedNumber: string) {
  const [, trailing] = maskedNumber.split("••••");
  const last = (trailing ?? maskedNumber).replace(/\s/g, "");
  return `•••• ${last}`;
}
