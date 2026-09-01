import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton({ className }: { className?: string }) {
  return <Skeleton className={className ?? "h-40 w-full rounded-2xl"} />;
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-6">
      <CardSkeleton className="h-64 lg:col-span-7 lg:col-start-1 lg:row-start-1" />
      <CardSkeleton className="h-80 lg:col-span-7 lg:col-start-1 lg:row-start-2" />
      <CardSkeleton className="h-44 lg:col-span-5 lg:col-start-8 lg:row-start-1" />
      <CardSkeleton className="h-80 lg:col-span-5 lg:col-start-8 lg:row-start-2" />
    </div>
  );
}
