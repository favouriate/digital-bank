"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../services/profile-service";

export const profileQueryKey = ["profile"] as const;

export function useProfileQuery() {
  const searchParams = useSearchParams();
  const failLoad = searchParams.has("fail-load");

  return useQuery({
    queryKey: [...profileQueryKey, failLoad] as const,
    queryFn: () => getProfile({ failLoad }),
  });
}
