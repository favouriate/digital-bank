"use client";

import { useQuery } from "@tanstack/react-query";

import { isValidAccountNumber } from "../schemas/account-number-schema";
import { lookupRecipient } from "../services/lookup-service";
import type {
  DestinationCountryCode,
  RecipientLookupInput,
} from "../types/destination";

export function recipientLookupQueryKey(input: RecipientLookupInput) {
  return ["recipient-lookup", input] as const;
}

type UseRecipientLookupQueryArgs = {
  countryCode: DestinationCountryCode | null;
  bankId: string | null;
  accountNumber: string;
};

export function useRecipientLookupQuery({
  countryCode,
  bankId,
  accountNumber,
}: UseRecipientLookupQueryArgs) {
  const trimmed = accountNumber.trim();
  const enabled =
    countryCode !== null &&
    Boolean(bankId) &&
    isValidAccountNumber(countryCode, trimmed);

  const input: RecipientLookupInput = {
    countryCode: countryCode ?? "NG",
    bankId: bankId ?? "",
    accountNumber: trimmed,
  };

  return useQuery({
    queryKey: recipientLookupQueryKey(input),
    queryFn: () => lookupRecipient(input),
    enabled,
    retry: false,
  });
}
