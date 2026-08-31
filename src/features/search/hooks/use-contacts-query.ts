"use client";

import { useQuery } from "@tanstack/react-query";

import { getContacts } from "../services/contact-service";

export const contactsQueryKey = ["contacts"] as const;

export function useContactsQuery() {
  return useQuery({
    queryKey: contactsQueryKey,
    queryFn: getContacts,
  });
}
