import { Button } from "@/components/ui/button";

type TransactionHistoryErrorProps = {
  onRetry: () => void;
};

export function TransactionHistoryError({
  onRetry,
}: TransactionHistoryErrorProps) {
  return (
    <section
      role="alert"
      className="rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-lg font-semibold text-foreground">
        Unable to load transactions
      </h2>
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
