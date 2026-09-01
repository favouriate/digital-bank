import { Check } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Recipient } from "../types/transfer";

type RecipientCardProps = {
  recipient: Recipient;
  selected: boolean;
  onSelect: (recipientId: string) => void;
};

export function RecipientCard({
  recipient,
  selected,
  onSelect,
}: RecipientCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "relative flex min-h-[9.5rem] w-40 shrink-0 flex-col items-center gap-2 rounded-xl border border-border bg-card px-3 py-4 text-center",
        selected && "border-primary bg-primary/5",
      )}
      onClick={() => onSelect(recipient.id)}
    >
      {selected ? (
        <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" aria-hidden="true" />
          <span className="sr-only">Selected</span>
        </span>
      ) : null}
      <Avatar size="lg" className="size-12">
        {recipient.avatarUrl ? (
          <AvatarImage src={recipient.avatarUrl} alt="" />
        ) : null}
        <AvatarFallback>{recipient.initials}</AvatarFallback>
      </Avatar>
      <span className="w-full truncate text-sm font-semibold text-foreground">
        {recipient.name}
      </span>
      <span className="w-full truncate text-xs text-muted-foreground">
        {recipient.email}
      </span>
      {recipient.frequent ? (
        <span className="text-xs font-medium text-muted-foreground">
          Frequent
        </span>
      ) : (
        <span className="h-4" aria-hidden="true" />
      )}
    </button>
  );
}
