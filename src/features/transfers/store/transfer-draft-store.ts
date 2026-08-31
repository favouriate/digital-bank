import { create } from "zustand";

export type TransferDraft = {
  recipientId: string | null;
  amount: number | null;
};

type TransferDraftStore = TransferDraft & {
  setDraft: (draft: Partial<TransferDraft>) => void;
  clearDraft: () => void;
};

const emptyDraft: TransferDraft = {
  recipientId: null,
  amount: null,
};

export const useTransferDraftStore = create<TransferDraftStore>((set) => ({
  ...emptyDraft,
  setDraft: (draft) => {
    set((current) => ({ ...current, ...draft }));
  },
  clearDraft: () => {
    set(emptyDraft);
  },
}));
