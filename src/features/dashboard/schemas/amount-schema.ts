import { z } from "zod";

export const amountSchema = z
  .string()
  .trim()
  .min(1, "Enter an amount")
  .transform((value) => Number(value.replace(/[$,\s]/g, "")))
  .refine((value) => Number.isFinite(value) && value > 0, {
    message: "Enter a valid amount",
  });

export type ParsedAmount = z.infer<typeof amountSchema>;
