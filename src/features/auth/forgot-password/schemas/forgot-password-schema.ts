import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .pipe(z.email("Enter a valid email")),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
