import { z } from "zod";

import { SUPPORT_CATEGORY_IDS } from "../types/support";

export const contactSupportSchema = z
  .object({
    category: z.enum(SUPPORT_CATEGORY_IDS, {
      error: "Choose a help category",
    }),
    subject: z
      .string()
      .trim()
      .min(1, "Enter a subject")
      .max(80, "Subject is too long"),
    message: z
      .string()
      .trim()
      .min(1, "Enter a message")
      .min(20, "Message must be at least 20 characters")
      .max(1000, "Message is too long"),
    transactionReference: z
      .string()
      .trim()
      .max(40, "Reference is too long")
      .optional()
      .or(z.literal("")),
  })
  .transform((value) => ({
    ...value,
    transactionReference: value.transactionReference?.trim() || undefined,
  }));

export type ContactSupportValues = z.input<typeof contactSupportSchema>;
export type ContactSupportParsed = z.output<typeof contactSupportSchema>;
