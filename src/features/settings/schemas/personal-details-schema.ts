import { z } from "zod";

const PHONE_PATTERN = /^\+234\s\d{3}\s\d{3}\s\d{4}$/;

export const personalDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your full name")
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .pipe(z.email("Enter a valid email")),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number")
    .regex(PHONE_PATTERN, "Use a number like +234 803 555 0142"),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Enter your date of birth")
    .refine((value) => Number.isFinite(Date.parse(value)), "Enter a valid date")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return date.getTime() < Date.now();
    }, "Date of birth cannot be in the future"),
  nationality: z
    .string()
    .trim()
    .min(1, "Enter your nationality")
    .max(60, "Nationality is too long"),
  address: z
    .string()
    .trim()
    .min(1, "Enter your address")
    .max(160, "Address is too long"),
});

export type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>;
