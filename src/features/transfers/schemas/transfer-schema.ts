import { z } from "zod";

export const TRANSFER_PIN_LENGTH = 4;
export const MOCK_TRANSFER_PIN = "1234";

export const transferPinSchema = z
  .string()
  .regex(/^\d{4}$/, "Enter a 4-digit PIN");

export const transferNoteSchema = z
  .string()
  .trim()
  .max(140, "Note must be 140 characters or fewer");

export const addRecipientSchema = z.object({
  name: z.string().trim().min(1, "Enter a name").max(80, "Name is too long"),
  email: z.email("Enter a valid email"),
});

export type AddRecipientValues = z.infer<typeof addRecipientSchema>;
