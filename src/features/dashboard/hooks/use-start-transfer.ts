"use client";

import { useRouter } from "next/navigation";

import { useTransferDraftStore } from "@/features/transfers/store/transfer-draft-store";

export function useStartTransfer() {
  const router = useRouter();
  const setDraft = useTransferDraftStore((state) => state.setDraft);

  return (draft: { recipientId?: string | null; amount?: number | null }) => {
    setDraft(draft);
    router.push("/transfers");
  };
}
