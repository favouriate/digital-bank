"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Recipient } from "../types/transfer";

import {
  AddRecipientDialog,
  AddRecipientTrigger,
} from "./add-recipient-dialog";
import { RecipientCard } from "./recipient-card";

type RecipientPickerProps = {
  recipients: Recipient[];
  selectedId: string | null;
  addError: string | null;
  isAdding: boolean;
  onSelect: (recipientId: string) => void;
  onAdd: (input: { name: string; email: string }) => Promise<void> | void;
};

function matchesRecipient(recipient: Recipient, query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  return (
    recipient.name.toLowerCase().includes(normalized) ||
    recipient.email.toLowerCase().includes(normalized)
  );
}

export function RecipientPicker({
  recipients,
  selectedId,
  addError,
  isAdding,
  onSelect,
  onAdd,
}: RecipientPickerProps) {
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const visible = useMemo(
    () => recipients.filter((recipient) => matchesRecipient(recipient, query)),
    [recipients, query],
  );

  return (
    <section>
      <h2 className="text-base font-semibold text-foreground">
        1. Recipient Selection
      </h2>
      <p className="mt-0.5 text-sm text-muted-foreground">
        Choose a recipient or add a new one.
      </p>
      <div className="relative mt-3">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Label htmlFor="recipient-search" className="sr-only">
          Search recipients
        </Label>
        <Input
          id="recipient-search"
          value={query}
          placeholder="Search by name, email, phone or account"
          className="h-11 min-h-11 pl-9"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {visible.map((recipient) => (
          <RecipientCard
            key={recipient.id}
            recipient={recipient}
            selected={recipient.id === selectedId}
            onSelect={onSelect}
          />
        ))}
        <AddRecipientTrigger onClick={() => setDialogOpen(true)} />
      </div>
      {visible.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          No recipients match that search.
        </p>
      ) : null}
      <AddRecipientDialog
        open={dialogOpen}
        isPending={isAdding}
        error={addError}
        onOpenChange={setDialogOpen}
        onAdd={async (input) => {
          await onAdd(input);
        }}
      />
    </section>
  );
}
