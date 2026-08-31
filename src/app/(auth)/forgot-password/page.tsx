import type { Metadata } from "next";

import { ForgotPasswordView } from "@/features/auth/forgot-password/components/forgot-password-view";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
