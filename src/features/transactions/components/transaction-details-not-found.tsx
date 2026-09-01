import Link from "next/link";

import { Button } from "@/components/ui/button";

export function TransactionDetailsNotFound() {
  return (
    <section className="rounded-xl border border-border bg-card p-8 text-center">
      <h1 className="text-lg font-semibold text-foreground">
        Transaction not found
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This transaction is not in your history, or the link may be incorrect.
      </p>
      <Button
        nativeButton={false}
        className="mt-4 h-11 min-h-11"
        render={<Link href="/transactions" />}
      >
        Back to transactions
      </Button>
    </section>
  );
}
