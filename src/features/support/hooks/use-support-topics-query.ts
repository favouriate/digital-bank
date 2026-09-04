"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getSupportTopics } from "../services/support-service";

export const supportTopicsQueryKey = ["support", "topics"] as const;

export function useSupportTopicsQuery() {
  const searchParams = useSearchParams();
  const failLoad = searchParams.has("fail-load");

  return useQuery({
    queryKey: [...supportTopicsQueryKey, failLoad] as const,
    queryFn: () => getSupportTopics({ failLoad }),
  });
}
