"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { hasDemoSession } from "@/features/auth/lib/demo-session";

type AppAuthGateProps = {
  children: ReactNode;
};

export function AppAuthGate({ children }: AppAuthGateProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!hasDemoSession()) {
      router.replace("/login");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return null;
  }

  return children;
}
