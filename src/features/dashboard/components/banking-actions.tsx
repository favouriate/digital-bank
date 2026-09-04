import Link from "next/link";
import { FileText, LayoutGrid, ArrowDownLeft, Send } from "lucide-react";

import { cn } from "@/lib/utils";

const actions = [
  {
    href: "/transfers",
    label: "Send Money",
    icon: Send,
    tone: "bg-primary/10 text-primary",
  },
  {
    href: "/transactions?type=receive",
    label: "Receive",
    icon: ArrowDownLeft,
    tone: "bg-success/10 text-success",
  },
  {
    href: "/invoices",
    label: "Invoices",
    icon: FileText,
    tone: "bg-warning/10 text-warning",
  },
  {
    href: "/activity",
    label: "More",
    icon: LayoutGrid,
    tone: "bg-secondary text-secondary-foreground",
  },
] as const;

export function BankingActions() {
  return (
    <nav aria-label="Banking actions">
      <ul className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <li key={action.href}>
              <Link
                href={action.href}
                className="flex min-h-11 flex-col items-center gap-2 text-center"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-xl",
                    action.tone,
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium text-foreground">
                  {action.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
