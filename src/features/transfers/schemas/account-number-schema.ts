import { z } from "zod";

import type { DestinationCountryCode } from "../types/destination";

const ACCOUNT_NUMBER_RULES: Record<
  DestinationCountryCode,
  { pattern: RegExp; message: string; maxLength: number }
> = {
  NG: {
    pattern: /^\d{10}$/,
    message: "Enter a 10-digit Nigerian account number",
    maxLength: 10,
  },
  US: {
    pattern: /^\d{6,17}$/,
    message: "Enter a valid US account number",
    maxLength: 17,
  },
  GB: {
    pattern: /^\d{8}$/,
    message: "Enter an 8-digit UK account number",
    maxLength: 8,
  },
  CA: {
    pattern: /^\d{7,12}$/,
    message: "Enter a valid Canadian account number",
    maxLength: 12,
  },
  GH: {
    pattern: /^\d{13}$/,
    message: "Enter a 13-digit Ghanaian account number",
    maxLength: 13,
  },
  ZA: {
    pattern: /^\d{9,11}$/,
    message: "Enter a valid South African account number",
    maxLength: 11,
  },
};

export function getAccountNumberMaxLength(countryCode: DestinationCountryCode) {
  return ACCOUNT_NUMBER_RULES[countryCode].maxLength;
}

export function createAccountNumberSchema(countryCode: DestinationCountryCode) {
  const rule = ACCOUNT_NUMBER_RULES[countryCode];

  return z
    .string()
    .trim()
    .regex(rule.pattern, rule.message);
}

export function isValidAccountNumber(
  countryCode: DestinationCountryCode,
  accountNumber: string,
) {
  return createAccountNumberSchema(countryCode).safeParse(accountNumber)
    .success;
}
