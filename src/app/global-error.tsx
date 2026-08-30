"use client";

import { RouteError } from "@/components/layout/route-error";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-svh items-center justify-center p-6">
          <RouteError
            title="The application could not load"
            reset={reset}
          />
        </div>
      </body>
    </html>
  );
}
