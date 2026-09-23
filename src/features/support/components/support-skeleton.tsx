import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SupportSkeleton() {
  return (
    <div
      className="flex min-w-0 flex-col gap-6 overflow-x-hidden"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-11 w-full rounded-lg" />
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-32 rounded-xl" />
            ))}
          </div>
          <Card className="gap-3 p-6">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-lg" />
            ))}
          </Card>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
