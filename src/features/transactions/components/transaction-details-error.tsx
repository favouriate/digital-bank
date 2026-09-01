import { Button } from "@/components/ui/button";

type TransactionDetailsErrorProps = {
  onRetry: () => void;
};

export function TransactionDetailsError({
  onRetry,
}: TransactionDetailsErrorProps) {
  return (
    <section
      role="alert"
      className="rounded-xl border border-border bg-card p-6"
    >
      <h1 className="text-lg font-semibold text-foreground">
        Unable to load transaction
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Check your connection and try again. Your other account pages are still
        available.
      </p>
      <Button className="mt-4 min-h-11" type="button" onClick={onRetry}>
        Retry
      </Button>
    </section>
  );
}
