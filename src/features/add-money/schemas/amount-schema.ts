import { z } from "zod";

export const MIN_ADD_MONEY_AMOUNT = 10;
export const MAX_ADD_MONEY_AMOUNT = 10_000;
export const QUICK_AMOUNTS = [100, 250, 500, 1000, 2500] as const;

export const addMoneyAmountSchema = z
  .string()
  .trim()
  .min(1, "Enter an amount")
  .transform((value) => Number(value.replace(/[$,\s]/g, "")))
  .refine((value) => Number.isFinite(value) && value > 0, {
    message: "Enter a valid amount",
  })
  .refine((value) => value >= MIN_ADD_MONEY_AMOUNT, {
    message: "Minimum amount is $10.00",
  })
  .refine((value) => value <= MAX_ADD_MONEY_AMOUNT, {
    message: "Maximum amount is $10,000.00",
  });

export type ParsedAddMoneyAmount = z.infer<typeof addMoneyAmountSchema>;
