import { Button } from "@/components/ui/button";

type DashboardErrorProps = {
  onRetry: () => void;
};

export function DashboardError({ onRetry }: DashboardErrorProps) {
  return (
    <section
      role="alert"
      className="rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-lg font-semibold text-foreground">
        Unable to load your dashboard
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
