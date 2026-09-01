"use client";

import { useMutation } from "@tanstack/react-query";

import { validateTransfer } from "../services/transfer-service";
import type { TransferRequest } from "../types/transfer";

export function useValidateTransferMutation() {
  return useMutation({
    mutationKey: ["transfers", "validate"],
    mutationFn: (request: TransferRequest) => validateTransfer(request),
  });
}
