import Link from "next/link";
import { Shield } from "lucide-react";

import { AppLogo } from "@/components/layout/app-logo";
import { LoginHero } from "@/features/auth/login/components/login-hero";
import { ThemeToggle } from "@/features/auth/login/components/theme-toggle";

import { ForgotPasswordForm } from "./forgot-password-form";

export function ForgotPasswordView() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-svh flex-col bg-background lg:h-svh lg:overflow-hidden">
      <div className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
        <aside className="hidden min-h-0 flex-col justify-between bg-muted px-8 py-8 lg:flex lg:w-1/2 xl:px-14 xl:py-10">
          <AppLogo href="/forgot-password" />
          <LoginHero />
          <div />
        </aside>

        <section className="flex flex-1 flex-col px-6 py-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <div className="lg:hidden">
              <AppLogo href="/forgot-password" />
            </div>
            <ThemeToggle />
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 lg:py-10">
            <div className="lg:hidden">
              <LoginHero compact />
            </div>
            <ForgotPasswordForm />
          </div>

          <p className="mt-auto flex items-center justify-center gap-2 pt-4 text-sm font-medium text-primary lg:hidden">
            <Shield className="size-3.5" aria-hidden="true" />
            Secure. Simple. Smart.
          </p>
        </section>
      </div>

      <footer className="hidden items-center justify-between border-t border-border px-8 py-4 text-xs text-muted-foreground lg:flex">
        <p>© {year} OpenPay. All rights reserved.</p>
        <nav aria-label="Legal" className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-foreground">
            Help
          </Link>
        </nav>
      </footer>
    </div>
  );
}
