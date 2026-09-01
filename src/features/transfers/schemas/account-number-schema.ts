import { z } from "zod";

import type { DestinationCountryCode } from "../types/destination";

const ACCOUNT_NUMBER_RULES: Record<
  DestinationCountryCode,
  { pattern: RegExp; message: string }
> = {
  NG: {
    pattern: /^\d{10}$/,
    message: "Enter a 10-digit Nigerian account number",
  },
  US: {
    pattern: /^\d{6,17}$/,
    message: "Enter a valid US account number",
  },
  GB: {
    pattern: /^\d{8}$/,
    message: "Enter an 8-digit UK account number",
  },
};

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
