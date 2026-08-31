import { Skeleton } from "@/components/ui/skeleton";

export function AddMoneySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="hidden h-12 w-full rounded-lg lg:block" />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Skeleton className="h-52 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-lg lg:hidden" />
      <Skeleton className="h-56 w-full rounded-xl" />
    </div>
  );
}
