import type { AccountSummary, MoneyFlowSeries } from "../types/dashboard";

export const INITIAL_AVAILABLE_BALANCE = 10680;
let availableBalanceMinor = INITIAL_AVAILABLE_BALANCE * 100;

export function toUsdMinor(amount: number) {
  const minor = Math.round(amount * 100);
  if (!Number.isFinite(amount) || !Number.isSafeInteger(minor) || amount < 0) {
    throw new Error("Invalid money amount.");
  }
  return minor;
}

export function getAvailableBalanceMinor() {
  return availableBalanceMinor;
}

export function roundUsd(amount: number) {
  return Math.round(amount * 100) / 100;
}

export const mockAccountSummary: AccountSummary = {
  card: {
    holderName: "Carla Rosser",
    maskedNumber: "1200  ••••  54215",
    expiryLabel: "08/23",
    brand: "visa",
  },
  get availableBalance() {
    return availableBalanceMinor / 100;
  },
  set availableBalance(amount: number) {
    availableBalanceMinor = toUsdMinor(amount);
  },
  currency: "USD",
  monthlyChangePercent: 4.8,
  sourceLabel: "Debit",
};

export function getAvailableBalance() {
  return mockAccountSummary.availableBalance;
}

export function debitAvailableBalance(usdAmount: number) {
  const debit = toUsdMinor(usdAmount);
  if (debit > availableBalanceMinor) throw new Error("Insufficient balance.");
  availableBalanceMinor -= debit;
  return mockAccountSummary.availableBalance;
}

export function resetAvailableBalance() {
  mockAccountSummary.availableBalance = INITIAL_AVAILABLE_BALANCE;
}

export const mockBalanceTrend = [
  9200, 9450, 9100, 9800, 10120, 9980, 10340, 10680,
];

export const mockMoneyFlow: MoneyFlowSeries = {
  periodLabel: "Week",
  changePercent: 6.79,
  seriesLabel: "Savings",
  points: [
    { label: "Dec 2", income: 400, savings: 900 },
    { label: "Dec 3", income: 1100, savings: 1500 },
    { label: "Dec 4", income: 800, savings: 1200 },
    { label: "Dec 5", income: 2600, savings: 2100 },
    { label: "Dec 6", income: 1700, savings: 1800 },
    { label: "Dec 7", income: 1900, savings: 2300 },
    { label: "Dec 8", income: 1400, savings: 2000 },
  ],
};
