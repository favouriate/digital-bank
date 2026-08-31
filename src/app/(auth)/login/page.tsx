import type { Metadata } from "next";

import { LoginView } from "@/features/auth/login/components/login-view";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return <LoginView />;
}
