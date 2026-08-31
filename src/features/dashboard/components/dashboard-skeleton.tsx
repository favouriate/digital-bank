import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton({ className }: { className?: string }) {
  return <Skeleton className={className ?? "h-40 w-full rounded-xl"} />;
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-6 lg:hidden">
        <CardSkeleton className="h-44 rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
        <CardSkeleton className="h-52" />
        <CardSkeleton className="h-64" />
      </div>

      <div className="hidden gap-6 lg:grid lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <CardSkeleton className="h-44 rounded-2xl" />
          <CardSkeleton className="h-72" />
          <CardSkeleton className="h-56" />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-8 xl:col-span-5">
          <CardSkeleton className="h-72" />
          <CardSkeleton className="h-80" />
          <div className="xl:hidden">
            <CardSkeleton className="h-40" />
          </div>
        </div>
        <div className="hidden xl:col-span-3 xl:block">
          <CardSkeleton className="h-48" />
        </div>
      </div>
    </>
  );
}
