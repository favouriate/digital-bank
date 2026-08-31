const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatBalance(amount: number, visible: boolean) {
  if (!visible) {
    return "••••••";
  }

  return currencyFormatter.format(amount);
}

export function formatSignedChange(percent: number) {
  const formatted = Math.abs(percent).toFixed(2).replace(".", ",");
  return percent >= 0 ? `+${formatted}%` : `-${formatted}%`;
}
