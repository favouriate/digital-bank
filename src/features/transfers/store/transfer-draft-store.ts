import { create } from "zustand";

import { formatAmountInput } from "../lib/format";
import type { ResolvedRecipient } from "../types/destination";
import type { TransferStep } from "../types/transfer";

export type TransferDraft = {
  transferId: string | null;
  recipientId: string | null;
  amount: number | null;
  amountInput: string;
  note: string;
  step: TransferStep;
  destinationCountryCode: string | null;
  destinationCurrencyCode: string | null;
  bankId: string | null;
  accountNumber: string | null;
  resolvedRecipient: ResolvedRecipient | null;
};

export type TransferStartDraft = Partial<
  Pick<
    TransferDraft,
    | "recipientId"
    | "amount"
    | "destinationCountryCode"
    | "destinationCurrencyCode"
    | "bankId"
    | "accountNumber"
    | "resolvedRecipient"
  >
>;

type TransferDraftStore = TransferDraft & {
  setDraft: (draft: TransferStartDraft) => void;
  setRecipientId: (recipientId: string | null) => void;
  setAmountInput: (amountInput: string) => void;
  setParsedAmount: (amount: number) => void;
  setNote: (note: string) => void;
  setStep: (step: TransferStep) => void;
  setResolvedRecipient: (
    recipient: ResolvedRecipient | null,
    accountNumber?: string | null,
  ) => void;
  clearDraft: () => void;
  reset: () => void;
};

const emptyDraft: TransferDraft = {
  transferId: null,
  recipientId: null,
  amount: null,
  amountInput: "",
  note: "",
  step: "compose",
  destinationCountryCode: null,
  destinationCurrencyCode: null,
  bankId: null,
  accountNumber: null,
  resolvedRecipient: null,
};

function fromResolvedRecipient(
  recipient: ResolvedRecipient | null,
  accountNumber?: string | null,
): Partial<TransferDraft> {
  if (!recipient) {
    return {
      recipientId: null,
      resolvedRecipient: null,
      destinationCountryCode: null,
      destinationCurrencyCode: null,
      bankId: null,
      accountNumber: null,
    };
  }

  return {
    recipientId: recipient.id,
    resolvedRecipient: recipient,
    destinationCountryCode: recipient.countryCode,
    destinationCurrencyCode: recipient.currencyCode,
    bankId: recipient.bankId,
    accountNumber: accountNumber ?? null,
  };
}

function draftFromStart(draft: TransferStartDraft): Partial<TransferDraft> {
  const patch: Partial<TransferDraft> = {
    step: draft.resolvedRecipient ? "amount" : "compose",
  };

  if (draft.resolvedRecipient !== undefined) {
    Object.assign(
      patch,
      fromResolvedRecipient(draft.resolvedRecipient, draft.accountNumber),
    );
  } else {
    if (draft.recipientId !== undefined) {
      patch.recipientId = draft.recipientId;
    }

    if (draft.destinationCountryCode !== undefined) {
      patch.destinationCountryCode = draft.destinationCountryCode;
    }

    if (draft.destinationCurrencyCode !== undefined) {
      patch.destinationCurrencyCode = draft.destinationCurrencyCode;
    }

    if (draft.bankId !== undefined) {
      patch.bankId = draft.bankId;
    }

    if (draft.accountNumber !== undefined) {
      patch.accountNumber = draft.accountNumber;
    }
  }

  if (typeof draft.amount === "number") {
    patch.amount = draft.amount;
    patch.amountInput = formatAmountInput(draft.amount);
  }

  return patch;
}

export const useTransferDraftStore = create<TransferDraftStore>((set) => ({
  ...emptyDraft,
  setDraft: (draft) => {
    set(draftFromStart(draft));
  },
  setRecipientId: (recipientId) => {
    set({ recipientId });
  },
  setAmountInput: (amountInput) => {
    set({ amountInput });
  },
  setParsedAmount: (amount) => {
    set({ amount, amountInput: formatAmountInput(amount) });
  },
  setNote: (note) => {
    set({ note });
  },
  setStep: (step) => {
    set({ step });
  },
  setResolvedRecipient: (recipient, accountNumber) => {
    set({
      step: recipient ? "amount" : "compose",
      ...fromResolvedRecipient(recipient, accountNumber),
    });
  },
  clearDraft: () => {
    set({ ...emptyDraft });
  },
  reset: () => {
    set({ ...emptyDraft });
  },
}));

/** Store API updates — safe even if HMR dropped action functions off state. */
export function setTransferDraft(draft: TransferStartDraft) {
  useTransferDraftStore.setState(draftFromStart(draft));
}

export function setTransferRecipientId(recipientId: string | null) {
  useTransferDraftStore.setState({ recipientId });
}

export function setTransferAmountInput(amountInput: string) {
  useTransferDraftStore.setState({ amountInput });
}

export function setTransferParsedAmount(amount: number) {
  useTransferDraftStore.setState({
    amount,
    amountInput: formatAmountInput(amount),
  });
}

export function setTransferNote(note: string) {
  useTransferDraftStore.setState({ note });
}

export function setTransferStep(step: TransferStep) {
  useTransferDraftStore.setState({ step });
}

export function setResolvedTransferRecipient(
  recipient: ResolvedRecipient | null,
  accountNumber?: string | null,
) {
  useTransferDraftStore.setState({
    step: recipient ? "amount" : "compose",
    ...fromResolvedRecipient(recipient, accountNumber),
  });
}

export function clearResolvedTransferRecipient() {
  useTransferDraftStore.setState({
    recipientId: null,
    resolvedRecipient: null,
    step: "compose",
  });
}

export function resetTransferDraft() {
  useTransferDraftStore.setState({ ...emptyDraft });
}

/** Keep one ID across confirmation retries; reviewing starts a new operation. */
export function beginTransferOperation() {
  const transferId = `txn-send-${crypto.randomUUID()}`;
  useTransferDraftStore.setState({ transferId });
  return transferId;
}
