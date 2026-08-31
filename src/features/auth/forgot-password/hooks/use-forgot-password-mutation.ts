"use client";

import { useMutation } from "@tanstack/react-query";

import { requestPasswordReset } from "../services/forgot-password-service";
import type { ForgotPasswordRequest } from "../types/forgot-password";

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: ["auth", "forgot-password"],
    mutationFn: (request: ForgotPasswordRequest) => requestPasswordReset(request),
  });
}
