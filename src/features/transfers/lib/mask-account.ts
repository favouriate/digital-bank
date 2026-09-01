export function maskAccountNumber(accountNumber: string) {
  const digits = accountNumber.replace(/\D/g, "");
  const last4 = digits.slice(-4).padStart(Math.min(4, digits.length), "•");

  return `•••• ${last4}`;
}
