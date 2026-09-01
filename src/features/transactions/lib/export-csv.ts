import type { Transaction } from "@/types/transaction";

import { formatAccountHint, formatSignedAmount } from "./format-amount";
import { formatTransactionDateTime } from "./format-date";

function csvCell(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll("\"", "\"\"")}"`;
  }

  return value;
}

export function buildTransactionsCsv(transactions: Transaction[]) {
  const header = [
    "Description",
    "Counterparty",
    "Bank",
    "Reference",
    "Status",
    "Amount",
    "Currency",
    "Date",
  ];

  const rows = transactions.map((transaction) => [
    csvCell(transaction.description),
    csvCell(transaction.counterparty),
    csvCell(formatAccountHint(transaction.bankName, transaction.accountMask)),
    csvCell(transaction.reference),
    csvCell(transaction.status),
    csvCell(formatSignedAmount(transaction.amount, transaction.currency)),
    csvCell(transaction.currency),
    csvCell(formatTransactionDateTime(transaction.occurredAt)),
  ]);

  return [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

export function downloadCsv(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
