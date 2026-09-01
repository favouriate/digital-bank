import { create } from "zustand";

import type { CurrencyCode } from "@/types/currency";

import { formatAmountInput } from "../lib/format";
import type { AddMoneyStep, FundingMethodId } from "../types/add-money";

const DEFAULT_AMOUNT = 1000;

type AddMoneyDraftStore = {
  methodId: FundingMethodId;
  amount: number | null;
  amountInput: string;
  currency: CurrencyCode;
  step: AddMoneyStep;
  setMethodId: (methodId: FundingMethodId) => void;
  setAmountInput: (amountInput: string) => void;
  setParsedAmount: (amount: number) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setStep: (step: AddMoneyStep) => void;
  reset: () => void;
};

const emptyDraft = {
  methodId: "debit-card" as const,
  amount: DEFAULT_AMOUNT,
  amountInput: formatAmountInput(DEFAULT_AMOUNT),
  currency: "USD" as const,
  step: "compose" as const,
};

export const useAddMoneyDraftStore = create<AddMoneyDraftStore>((set) => ({
  ...emptyDraft,
  setMethodId: (methodId) => {
    set({ methodId });
  },
  setAmountInput: (amountInput) => {
    set({ amountInput });
  },
  setParsedAmount: (amount) => {
    set({ amount, amountInput: formatAmountInput(amount) });
  },
  setCurrency: (currency) => {
    set({ currency });
  },
  setStep: (step) => {
    set({ step });
  },
  reset: () => {
    set(emptyDraft);
  },
}));
