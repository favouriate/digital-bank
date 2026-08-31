const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatAddMoneyAmount(amount: number) {
  return currencyFormatter.format(amount);
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
