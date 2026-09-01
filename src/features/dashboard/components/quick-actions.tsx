"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownToLine,
  BarChart3,
  Ellipsis,
  FileText,
  HelpCircle,
  MessageSquare,
  Plus,
  Send,
  Settings,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { useStartTransfer } from "../hooks/use-start-transfer";

const tileClassName =
  "flex min-h-11 w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-balance-foreground/15 px-1 py-3 text-balance-foreground transition-colors hover:bg-balance-foreground/25 focus-visible:ring-balance-foreground/80 focus-visible:ring-offset-0";

const moreRoutes = [
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/wallets", label: "Wallets", icon: Wallet },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/support", label: "Support", icon: HelpCircle },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function QuickActions() {
  const startTransfer = useStartTransfer();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav aria-label="Quick actions">
        <ul className="grid grid-cols-4 gap-2 sm:gap-3">
          <li>
            <button
              type="button"
              className={tileClassName}
              onClick={() => startTransfer({ resolvedRecipient: null })}
            >
              <Send className="size-5" aria-hidden="true" />
              <span className="text-center text-[0.7rem] leading-tight font-medium sm:text-xs">
                Send Money
              </span>
            </button>
          </li>
          <li>
            <Link href="/wallets" className={tileClassName}>
              <ArrowDownToLine className="size-5" aria-hidden="true" />
              <span className="text-center text-[0.7rem] leading-tight font-medium sm:text-xs">
                Receive
              </span>
            </Link>
          </li>
          <li>
            <Link href="/add-money" className={tileClassName}>
              <Plus className="size-5" aria-hidden="true" />
              <span className="text-center text-[0.7rem] leading-tight font-medium sm:text-xs">
                Add Money
              </span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className={cn(tileClassName)}
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(true)}
            >
              <Ellipsis className="size-5" aria-hidden="true" />
              <span className="text-center text-[0.7rem] leading-tight font-medium sm:text-xs">
                More
              </span>
            </button>
          </li>
        </ul>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-xl">
          <SheetHeader>
            <SheetTitle>More</SheetTitle>
            <SheetDescription>
              Open another area of your account.
            </SheetDescription>
          </SheetHeader>
          <nav aria-label="More account actions" className="px-4 pb-6">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {moreRoutes.map((route) => {
                const Icon = route.icon;

                return (
                  <li key={route.href}>
                    <Button
                      variant="outline"
                      nativeButton={false}
                      className="h-auto min-h-11 w-full justify-start gap-2 py-3"
                      render={<Link href={route.href} />}
                      onClick={() => setMoreOpen(false)}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {route.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
