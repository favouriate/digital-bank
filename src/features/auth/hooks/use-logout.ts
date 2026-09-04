"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { resetDemoLedger } from "@/mocks/demo-ledger";

import { clearDemoSession } from "../lib/demo-session";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return function logout() {
    clearDemoSession();
    resetDemoLedger();
    queryClient.clear();
    router.replace("/login");
  };
}
