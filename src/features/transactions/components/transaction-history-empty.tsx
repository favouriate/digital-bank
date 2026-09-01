import { Button } from "@/components/ui/button";

type TransactionHistoryEmptyProps = {
  filtered: boolean;
  onReset?: () => void;
};

export function TransactionHistoryEmpty({
  filtered,
  onReset,
}: TransactionHistoryEmptyProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-8 text-center">
      <h2 className="text-lg font-semibold text-foreground">
        {filtered ? "No matching transactions" : "No transactions yet"}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {filtered
          ? "Try a different search, status, or date range."
          : "When you send or receive money, your activity will show up here."}
      </p>
      {filtered && onReset ? (
        <Button
          type="button"
          variant="outline"
          className="mt-4 h-11 min-h-11"
          onClick={onReset}
        >
          Reset filters
        </Button>
      ) : null}
    </section>
  );
}
