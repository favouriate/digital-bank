import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function FilterSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Skeleton className="h-11 flex-1 rounded-lg" />
        <Skeleton className="h-11 w-24 rounded-lg" />
      </div>
      <div className="hidden gap-2 lg:flex">
        <Skeleton className="h-11 w-48 rounded-lg" />
        <Skeleton className="h-11 w-32 rounded-lg" />
      </div>
      <Skeleton className="h-11 w-full rounded-none" />
    </div>
  );
}

export function TransactionHistorySkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="hidden h-4 w-72 lg:block" />
        </div>
        <Skeleton className="h-11 w-24 rounded-lg" />
      </div>
      <FilterSkeleton />
      <div className="hidden lg:block">
        <div className="space-y-0 rounded-xl border border-border">
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
            >
              <Skeleton className="size-10 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>
      <Card className="gap-0 py-0 lg:hidden">
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
          >
            <Skeleton className="size-10 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </Card>
    </div>
  );
}
