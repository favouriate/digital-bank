"use client";

import { useRouter } from "next/navigation";

import {
  setTransferDraft,
  type TransferStartDraft,
} from "@/features/transfers/store/transfer-draft-store";

export function useStartTransfer() {
  const router = useRouter();

  return (draft: TransferStartDraft = { resolvedRecipient: null }) => {
    setTransferDraft(draft);
    router.push("/transfers");
  };
}
