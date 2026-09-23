import { Button } from "@/components/ui/button";

type AddMoneyErrorStateProps = {
  onRetry: () => void;
};

export function AddMoneyErrorState({ onRetry }: AddMoneyErrorStateProps) {
  return (
    <section role="alert" className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">
        Unable to load Add Money
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Check your connection and try again. Your account navigation is still
        available.
      </p>
      <Button className="mt-4 min-h-11" type="button" onClick={onRetry}>
        Retry
      </Button>
    </section>
  );
}
