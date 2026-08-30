"use client";

import { useMutation } from "@tanstack/react-query";

import { login } from "../services/login-service";
import type { LoginCredentials } from "../types/login";

export function useLoginMutation() {
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (credentials: LoginCredentials) => login(credentials),
  });
}
