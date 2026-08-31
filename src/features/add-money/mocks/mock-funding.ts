import { mockAccountSummary } from "@/features/dashboard/mocks/mock-account";

import { toShortCardMask } from "../lib/format";
import type { AddMoneyDeposit, FundingMethod } from "../types/add-money";

export function getFundingMethods(): FundingMethod[] {
  return [
    {
      id: "debit-card",
      label: "Debit Card",
      description: `Visa ${toShortCardMask(mockAccountSummary.card.maskedNumber)}`,
      brand: "visa",
      accountMask: toShortCardMask(mockAccountSummary.card.maskedNumber),
      recommended: true,
    },
    {
      id: "bank-transfer",
      label: "Bank Transfer",
      description: "Add money from your bank.",
      brand: null,
      accountMask: null,
      recommended: false,
    },
    {
      id: "credit-card",
      label: "Credit Card",
      description: "Visa, Mastercard.",
      brand: null,
      accountMask: null,
      recommended: false,
    },
    {
      id: "paypal",
      label: "PayPal",
      description: "Add money via PayPal.",
      brand: "paypal",
      accountMask: null,
      recommended: false,
    },
  ];
}

const INITIAL_DEPOSITS: AddMoneyDeposit[] = [
  {
    id: "dep-visa-500",
    sourceLabel: "Visa Card",
    sourceDetail: "From Visa •••• 54215",
    amount: 500,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-28T14:22:00.000Z",
  },
  {
    id: "dep-chase-750",
    sourceLabel: "Bank",
    sourceDetail: "From Chase Bank",
    amount: 750,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-26T09:40:00.000Z",
  },
  {
    id: "dep-paypal-250",
    sourceLabel: "PayPal",
    sourceDetail: "From PayPal",
    amount: 250,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-22T16:05:00.000Z",
  },
];

let deposits: AddMoneyDeposit[] = INITIAL_DEPOSITS.map((deposit) => ({
  ...deposit,
}));

export function getMockDeposits() {
  return deposits;
}

export function prependMockDeposit(deposit: AddMoneyDeposit) {
  deposits = [deposit, ...deposits];
}

export function resetAddMoneyMocks() {
  deposits = INITIAL_DEPOSITS.map((deposit) => ({ ...deposit }));
}
