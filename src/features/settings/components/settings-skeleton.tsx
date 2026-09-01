import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SettingsSkeleton() {
  return (
    <div
      className="flex min-w-0 flex-col gap-6 overflow-x-hidden"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="hidden h-4 w-80 lg:block" />
      </div>
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
        <div className="hidden flex-col gap-2 lg:col-span-3 lg:flex">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="h-11 w-full rounded-lg" />
          ))}
        </div>
        <div className="flex gap-2 overflow-hidden lg:hidden">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-11 w-24 shrink-0 rounded-lg" />
          ))}
        </div>
        <div className="flex flex-col gap-4 lg:col-span-9">
          <Card className="gap-4 p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="size-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
          </Card>
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
