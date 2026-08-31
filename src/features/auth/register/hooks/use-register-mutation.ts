"use client";

import { useMutation } from "@tanstack/react-query";

import { register } from "../services/register-service";
import type { RegisterCredentials } from "../types/register";

export function useRegisterMutation() {
  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (credentials: RegisterCredentials) => register(credentials),
  });
}
