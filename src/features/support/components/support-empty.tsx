import { Button } from "@/components/ui/button";

type SupportEmptyProps = {
  onClear: () => void;
  onContact: () => void;
  canClear: boolean;
};

export function SupportEmpty({
  onClear,
  onContact,
  canClear,
}: SupportEmptyProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">
        No help topics found.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try another search or contact support.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        {canClear ? (
          <Button
            type="button"
            variant="outline"
            className="h-11 min-h-11"
            onClick={onClear}
          >
            Clear search
          </Button>
        ) : null}
        <Button type="button" className="h-11 min-h-11" onClick={onContact}>
          Contact Support
        </Button>
      </div>
    </section>
  );
}
