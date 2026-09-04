"use client";

import { useMutation } from "@tanstack/react-query";

import { createSupportRequest } from "../services/support-service";
import type { CreateSupportRequestInput } from "../types/support";

export function useCreateSupportRequestMutation() {
  return useMutation({
    mutationKey: ["support", "create-request"],
    mutationFn: (input: CreateSupportRequestInput) =>
      createSupportRequest(input),
  });
}
