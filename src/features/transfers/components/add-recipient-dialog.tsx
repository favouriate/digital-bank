"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addRecipientSchema } from "../schemas/transfer-schema";

type AddRecipientDialogProps = {
  open: boolean;
  isPending: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onAdd: (input: { name: string; email: string }) => Promise<void>;
};

export function AddRecipientTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="flex min-h-[9.5rem] w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-card px-3 py-4 text-center text-primary"
      onClick={onClick}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
        <Plus className="size-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold">Add New Recipient</span>
    </button>
  );
}

export function AddRecipientDialog({
  open,
  isPending,
  error,
  onOpenChange,
  onAdd,
}: AddRecipientDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = addRecipientSchema.safeParse({ name, email });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Check the details");
      return;
    }

    setFieldError(null);
    void onAdd(parsed.data).then(() => {
      handleOpenChange(false);
    });
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setName("");
      setEmail("");
      setFieldError(null);
    }
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new recipient</DialogTitle>
          <DialogDescription>
            Save someone you send money to often. You can select them on the
            next transfer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="recipient-name">Name</FieldLabel>
              <Input
                id="recipient-name"
                value={name}
                autoComplete="name"
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="recipient-email">Email</FieldLabel>
              <Input
                id="recipient-email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>
          </FieldGroup>
          {fieldError || error ? (
            <FieldError>{fieldError ?? error}</FieldError>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving" : "Save recipient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
