import { AppLogo } from "@/components/layout/app-logo";

import { LoginForm } from "./login-form";
import { LoginHero } from "./login-hero";
import { ThemeToggle } from "./theme-toggle";

export function LoginView() {
  return (
    <main className="min-h-svh bg-background lg:grid lg:h-svh lg:min-h-0 lg:grid-cols-2 lg:overflow-hidden">
      <aside className="hidden h-svh min-h-0 flex-col justify-between overflow-hidden bg-muted px-8 py-7 lg:flex xl:px-14 xl:py-8">
        <AppLogo href="/login" />
        <LoginHero />
        <div aria-hidden="true" />
      </aside>

      <section className="flex min-h-svh min-w-0 flex-col overflow-x-clip px-6 py-4 sm:px-8 lg:h-svh lg:min-h-0 lg:overflow-hidden lg:px-12 xl:px-20">
        <header className="relative z-20 flex shrink-0 items-center justify-between gap-4 lg:justify-end">
          <div className="lg:hidden">
            <AppLogo href="/login" />
          </div>
          <ThemeToggle className="max-w-full shrink-0" />
        </header>

        <div className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col justify-center py-6 lg:py-8">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
