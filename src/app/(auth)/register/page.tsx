import type { Metadata } from "next";

import { RegisterView } from "@/features/auth/register/components/register-view";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RegisterPage() {
  return <RegisterView />;
}
