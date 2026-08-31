import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/types/transaction";

const STATUS_COPY: Record<TransactionStatus, string> = {
  completed: "Success",
  pending: "Pending",
  failed: "Failed",
};

const STATUS_CLASS: Record<TransactionStatus, string> = {
  completed: "border-transparent bg-success/10 text-success",
  pending: "border-transparent bg-warning/10 text-warning",
  failed: "border-transparent bg-destructive/10 text-destructive",
};

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
  className?: string;
};

export function TransactionStatusBadge({
  status,
  className,
}: TransactionStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", STATUS_CLASS[status], className)}
    >
      {STATUS_COPY[status]}
    </Badge>
  );
}
