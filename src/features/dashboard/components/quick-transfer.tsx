"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CountryFlag } from "@/features/transfers/components/country-flag";
import type { ResolvedRecipient } from "@/features/transfers/types/destination";
import { cn } from "@/lib/utils";

import { useStartTransfer } from "../hooks/use-start-transfer";

type QuickTransferProps = {
  recipients: ResolvedRecipient[];
};

const itemClassName =
  "flex min-h-11 w-[6.25rem] flex-col items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card lg:w-24";

const avatarClassName = "size-14 after:hidden lg:size-12";

export function QuickTransfer({ recipients }: QuickTransferProps) {
  const startTransfer = useStartTransfer();

  return (
    <Card className="rounded-2xl">
      <CardHeader className="gap-1">
        <CardTitle className="text-base font-semibold lg:text-lg">
          Quick Transfer
        </CardTitle>
        <CardAction>
          <Link
            href="/transfers"
            className="rounded-sm text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            View all
          </Link>
        </CardAction>
        <CardDescription className="text-xs lg:text-sm">
          Send money to your recent contacts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recipients.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent recipients yet.
          </p>
        ) : (
          <ul className="flex gap-6 overflow-x-auto pb-1 lg:justify-between lg:gap-4 lg:overflow-x-visible">
            {recipients.map((recipient) => (
              <li key={recipient.id} className="shrink-0">
                <button
                  type="button"
                  className={itemClassName}
                  aria-label={`Send money to ${recipient.name}`}
                  onClick={() =>
                    startTransfer({ resolvedRecipient: recipient })
                  }
                >
                  <span className="relative">
                    <Avatar size="lg" className={avatarClassName}>
                      {recipient.avatarUrl ? (
                        <AvatarImage src={recipient.avatarUrl} alt="" />
                      ) : null}
                      <AvatarFallback>{recipient.initials}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -right-0.5 -bottom-0.5 rounded-full bg-card p-0.5">
                      <CountryFlag
                        countryCode={recipient.countryCode}
                        className="size-4 lg:size-[1.125rem]"
                        size={18}
                      />
                    </span>
                  </span>
                  <span className="w-full space-y-0.5 text-center">
                    <span className="block truncate text-[13px] font-semibold text-foreground lg:text-sm">
                      {recipient.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {recipient.bankName}
                    </span>
                  </span>
                </button>
              </li>
            ))}
            <li className="shrink-0">
              <button
                type="button"
                className={itemClassName}
                aria-label="Add a new recipient"
                onClick={() => startTransfer({ resolvedRecipient: null })}
              >
                <span
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 border-dashed border-primary text-primary",
                    avatarClassName,
                  )}
                >
                  <Plus className="size-5" aria-hidden="true" />
                </span>
                <span className="text-[13px] font-semibold text-primary lg:text-sm">
                  Add New
                </span>
              </button>
            </li>
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
