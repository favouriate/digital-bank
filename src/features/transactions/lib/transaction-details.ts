import type { Transaction } from "@/types/transaction";

import {
  formatAccountHint,
  formatCurrencyAmount,
  formatMoney,
  formatSignedAmount,
} from "./format-amount";
import { formatTransactionDateTime } from "./format-date";

export const TRANSACTION_CHANNEL = "OpenPay App";
export const TRANSACTION_LOCATION = "Lagos, Nigeria";

const STATUS_LABEL: Record<Transaction["status"], string> = {
  completed: "Successful",
  pending: "Pending",
  failed: "Failed",
};

export type TransactionPartyKind = "sender" | "recipient" | "provider";

export function fictionalIpFromId(id: string) {
  let hash = 2166136261;

  for (const character of id) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  const unsigned = hash >>> 0;
  const third = unsigned % 256;
  const fourth = (unsigned >>> 8) % 256;

  return `197.210.${third}.${fourth}`;
}

export function partyKind(transaction: Transaction): TransactionPartyKind {
  if (transaction.type === "bill-payment") {
    return "provider";
  }

  if (transaction.direction === "incoming") {
    return "sender";
  }

  return "recipient";
}

export function partyCardTitle(kind: TransactionPartyKind) {
  if (kind === "provider") {
    return "Provider Details";
  }

  if (kind === "sender") {
    return "Sender Details";
  }

  return "Recipient Details";
}

export function partyRowLabel(kind: TransactionPartyKind) {
  if (kind === "provider") {
    return "Provider";
  }

  if (kind === "sender") {
    return "Sender";
  }

  return "Recipient";
}

export function summaryTitle(transaction: Transaction) {
  if (transaction.type === "bill-payment") {
    return "Bill payment";
  }

  if (transaction.direction === "incoming") {
    return "Money received";
  }

  return "Money sent";
}

export function statusSentence(transaction: Transaction) {
  if (transaction.status === "pending") {
    return "This transaction is still processing.";
  }

  if (transaction.status === "failed") {
    return "This transaction could not be completed.";
  }

  if (transaction.direction === "incoming") {
    return "The money has been credited to your account.";
  }

  if (transaction.type === "bill-payment") {
    return "The bill payment has been completed.";
  }

  return "The money has been sent.";
}

export function formatCategoryLabel(category?: string) {
  if (!category) {
    return "Transfer";
  }

  return category
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function transactionAmountClassName(transaction: Transaction) {
  return transaction.direction === "incoming"
    ? "text-success"
    : "text-foreground";
}

export function buildReceiptText(transaction: Transaction) {
  const kind = partyKind(transaction);
  const lines = [
    "OpenPay Transaction Receipt",
    "",
    `Title: ${summaryTitle(transaction)}`,
    `Status: ${STATUS_LABEL[transaction.status]}`,
    `Amount: ${formatSignedAmount(transaction.amount, transaction.currency)}`,
    `Transaction ID: ${transaction.id}`,
    `Date & Time: ${formatTransactionDateTime(transaction.occurredAt)}`,
    `${partyRowLabel(kind)}: ${transaction.counterparty}`,
    `Account: ${formatAccountHint(transaction.bankName, transaction.accountMask)}`,
    `Reference: ${transaction.reference}`,
    `Description: ${transaction.note?.trim() || "—"}`,
    `Fees: ${formatMoney(transaction.fee ?? 0, transaction.currency)}`,
    `Category: ${formatCategoryLabel(transaction.category)}`,
    `Channel: ${TRANSACTION_CHANNEL}`,
    `Location: ${TRANSACTION_LOCATION}`,
    `IP Address: ${fictionalIpFromId(transaction.id)}`,
    `Amount (unsigned): ${formatCurrencyAmount(transaction.amount, transaction.currency)}`,
  ];

  if (transaction.counterpartyEmail) {
    lines.push(`Email: ${transaction.counterpartyEmail}`);
  }

  if (transaction.counterpartyPhone) {
    lines.push(`Phone: ${transaction.counterpartyPhone}`);
  }

  return `${lines.join("\n")}\n`;
}

export function downloadTransactionReceipt(transaction: Transaction) {
  const contents = buildReceiptText(transaction);
  const blob = new Blob([contents], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `openpay-receipt-${transaction.id}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
