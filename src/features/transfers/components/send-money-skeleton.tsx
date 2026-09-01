import { Skeleton } from "@/components/ui/skeleton";

export function SendMoneySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-80" />
      </div>
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <Skeleton className="h-44 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="hidden h-12 w-full rounded-lg lg:block" />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Skeleton className="h-56 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-lg lg:hidden" />
    </div>
  );
}
