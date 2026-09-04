import { z } from "zod";

import {
  debitAvailableBalance,
  getAvailableBalanceMinor,
  mockAccountSummary,
  resetAvailableBalance,
} from "@/features/dashboard/mocks/mock-account";
import type { Transaction } from "@/types/transaction";
import { CURRENCY_CODES } from "@/types/currency";

import { getSeedTransactions, mockTransactions } from "./transactions";

export const DEMO_LEDGER_KEY = "openpay.demo-ledger";
export const DEMO_LEDGER_VERSION = 1;

const transactionSchema = z.object({
  id: z.string(), description: z.string(), counterparty: z.string(),
  reference: z.string(), accountMask: z.string(), amount: z.number().finite(),
  currency: z.enum(CURRENCY_CODES), status: z.enum(["completed", "pending", "failed"]),
  occurredAt: z.iso.datetime(), type: z.enum(["transfer", "deposit", "bill-payment", "receive"]),
  direction: z.enum(["incoming", "outgoing"]), bankName: z.string(),
  transferId: z.string().optional(), recipientId: z.string().optional(),
  category: z.string().optional(), note: z.string().optional(),
  fee: z.number().nonnegative().optional(), counterpartyEmail: z.string().optional(),
  counterpartyPhone: z.string().optional(),
});
const ledgerSchema = z.object({
  version: z.literal(DEMO_LEDGER_VERSION),
  availableBalanceMinor: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
  transactions: z.array(transactionSchema),
});

let hydrated = false;

function canUseSessionStorage() {
  return typeof window !== "undefined";
}

function replaceTransactions(next: Transaction[]) {
  mockTransactions.splice(0, mockTransactions.length, ...next);
}

export function persistDemoLedger() {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.setItem(DEMO_LEDGER_KEY, JSON.stringify({
    version: DEMO_LEDGER_VERSION,
    availableBalanceMinor: getAvailableBalanceMinor(),
    transactions: mockTransactions,
  }));
}

export function hydrateDemoLedger() {
  if (hydrated || !canUseSessionStorage()) return;
  // Storage access errors remain visible to the query's error state.
  const raw = window.sessionStorage.getItem(DEMO_LEDGER_KEY);
  if (raw) {
    let parsed;
    try {
      parsed = ledgerSchema.safeParse(JSON.parse(raw));
    } catch {
      parsed = null;
    }
    if (parsed?.success) {
      mockAccountSummary.availableBalance = parsed.data.availableBalanceMinor / 100;
      replaceTransactions(parsed.data.transactions);
    } else {
      // Legacy records discarded the original currency and cannot be recovered.
      resetAvailableBalance();
      replaceTransactions(getSeedTransactions());
      persistDemoLedger();
    }
  }
  hydrated = true;
}

/** One synchronous mock operation; persistence failure rolls back both changes. */
export function commitDemoTransfer(transaction: Transaction, totalDebitMinor: number) {
  const balance = mockAccountSummary.availableBalance;
  const transactions = [...mockTransactions];
  try {
    debitAvailableBalance(totalDebitMinor / 100);
    mockTransactions.unshift(transaction);
    persistDemoLedger();
  } catch (error) {
    mockAccountSummary.availableBalance = balance;
    replaceTransactions(transactions);
    throw error;
  }
}

export function resetDemoLedger() {
  if (canUseSessionStorage()) window.sessionStorage.removeItem(DEMO_LEDGER_KEY);
  resetAvailableBalance();
  replaceTransactions(getSeedTransactions());
  hydrated = true;
}
