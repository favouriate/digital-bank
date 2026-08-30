"use client";

import { Button } from "@/components/ui/button";

type RouteErrorProps = {
  title?: string;
  message?: string;
  reset: () => void;
};

export function RouteError({
  title = "Something went wrong",
  message = "Please try again. If the problem continues, come back later.",
  reset,
}: RouteErrorProps) {
  return (
    <section
      role="alert"
      className="flex max-w-md flex-col gap-3 rounded-xl border border-border bg-card p-6"
    >
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button type="button" onClick={reset} className="w-fit">
        Try again
      </Button>
    </section>
  );
}
