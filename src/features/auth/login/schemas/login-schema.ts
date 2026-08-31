import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .pipe(z.email("Enter a valid email")),
  password: z
    .string()
    .min(1, "Enter your password")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
