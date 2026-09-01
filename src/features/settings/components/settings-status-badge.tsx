import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SettingsStatusBadgeProps = {
  label: string;
  className?: string;
};

export function SettingsStatusBadge({
  label,
  className,
}: SettingsStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-6 gap-1 border-transparent bg-success/10 px-2.5 font-medium text-success",
        className,
      )}
    >
      <Check className="size-3" aria-hidden="true" />
      {label}
    </Badge>
  );
}
