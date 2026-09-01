export function formatSignedAmount(amount: number, currency = "USD") {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  if (amount > 0) {
    return `+${formatted}`;
  }

  if (amount < 0) {
    return `-${formatted}`;
  }

  return formatted;
}

export function formatMoney(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
}

export function formatCurrencyAmount(amount: number, currency = "USD") {
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
