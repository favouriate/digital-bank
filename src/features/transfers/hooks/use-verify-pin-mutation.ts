"use client";

import { useMutation } from "@tanstack/react-query";

import { verifyPin } from "../services/transfer-service";

export function useVerifyPinMutation() {
  return useMutation({
    mutationKey: ["transfers", "verify-pin"],
    mutationFn: (pin: string) => verifyPin(pin),
  });
}
