import { z } from "zod";

export const MIN_TRANSFER_AMOUNT = 1;
export const MAX_TRANSFER_AMOUNT = 10_000;
export const DEFAULT_TRANSFER_AMOUNT = 1250;

export function createTransferAmountSchema(availableBalance: number) {
  return z
    .string()
    .trim()
    .min(1, "Enter an amount")
    .transform((value) => Number(value.replace(/[$,\s]/g, "")))
    .refine((value) => Number.isFinite(value) && value > 0, {
      message: "Enter a valid amount",
    })
    .refine((value) => value >= MIN_TRANSFER_AMOUNT, {
      message: "Minimum amount is $1.00",
    })
    .refine((value) => value <= MAX_TRANSFER_AMOUNT, {
      message: "Maximum amount is $10,000.00",
    })
    .refine((value) => value <= availableBalance, {
      message: "Amount exceeds available balance",
    });
}

export const transferAmountSchema = createTransferAmountSchema(
  Number.POSITIVE_INFINITY,
);
