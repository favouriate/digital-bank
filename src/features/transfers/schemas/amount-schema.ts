import { z } from "zod";

import { formatMoney } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

import {
  destFromUsd,
  usdFromDest,
  roundTransferMoney,
} from "../lib/convert-amount";

export const MIN_TRANSFER_AMOUNT = 1;
export const MAX_TRANSFER_AMOUNT = 10_000;
export const DEFAULT_TRANSFER_AMOUNT = 1250;

export function createTransferAmountSchema(
  usdAvailableBalance: number,
  currency: CurrencyCode = "USD",
) {
  const destMin = destFromUsd(MIN_TRANSFER_AMOUNT, currency);
  const destMax = destFromUsd(MAX_TRANSFER_AMOUNT, currency);

  return z
    .string()
    .trim()
    .min(1, "Enter an amount")
    .transform((value) => Number(value.replace(/[^\d.]/g, "")))
    .refine((value) => Number.isFinite(value) && value > 0, {
      message: "Enter a valid amount",
    })
    .transform(roundTransferMoney)
    .refine((value) => usdFromDest(value, currency) >= MIN_TRANSFER_AMOUNT, {
      message: `Minimum amount is ${formatMoney(destMin, currency)}`,
    })
    .refine((value) => usdFromDest(value, currency) <= usdAvailableBalance, {
      message: "Insufficient balance.",
    })
    .refine((value) => usdFromDest(value, currency) <= MAX_TRANSFER_AMOUNT, {
      message: `Maximum amount is ${formatMoney(destMax, currency)}`,
    });
}

export const transferAmountSchema = createTransferAmountSchema(
  Number.POSITIVE_INFINITY,
);
