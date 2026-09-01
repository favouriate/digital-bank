import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SettingRowProps = {
  icon?: LucideIcon;
  label: string;
  value?: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
};

export function SettingRow({
  icon: Icon,
  label,
  value,
  action,
  onClick,
}: SettingRowProps) {
  const content = (
    <>
      {Icon ? (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-muted-foreground">{label}</span>
        {value ? (
          <span className="mt-0.5 block text-sm font-medium text-foreground">
            {value}
          </span>
        ) : null}
      </span>
      {action}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full min-h-14 items-center gap-3 rounded-lg px-1 py-3 text-left outline-none hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cn("flex min-h-14 items-center gap-3 px-1 py-3")}>
      {content}
    </div>
  );
}
