import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TransactionDetailsSkeleton() {
  return (
    <div
      className="flex min-w-0 flex-col gap-6 overflow-x-hidden"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-between lg:hidden">
        <Skeleton className="size-11 rounded-lg" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="size-11 rounded-lg" />
      </div>

      <div className="hidden gap-3 lg:block">
        <Skeleton className="h-4 w-56" />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-11 w-44 rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
        <Card className="order-2 gap-0 py-0 lg:order-none lg:col-span-7">
          <div className="flex items-center gap-3 px-4 py-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-0 border-t border-border px-4 py-2">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </Card>

        <div className="order-1 flex flex-col gap-6 lg:order-none lg:col-span-5">
          <Card className="items-center gap-3 px-6 py-6">
            <Skeleton className="size-14 rounded-full" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-3 w-48" />
          </Card>
          <Card className="hidden gap-3 lg:flex">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-44" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
