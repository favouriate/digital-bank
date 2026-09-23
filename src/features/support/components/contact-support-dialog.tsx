"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { SUPPORT_CATEGORIES } from "../lib/categories";
import {
  contactSupportSchema,
  type ContactSupportValues,
} from "../schemas/contact-schema";

const selectClassName =
  "h-11 min-h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30";

type ContactSupportDialogProps = {
  open: boolean;
  isPending: boolean;
  error: string | null;
  resultReference: string | null;
  defaultCategory?: ContactSupportValues["category"];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContactSupportValues) => Promise<void>;
};

export function ContactSupportDialog({
  open,
  isPending,
  error,
  resultReference,
  defaultCategory = "account",
  onOpenChange,
  onSubmit,
}: ContactSupportDialogProps) {
  const form = useForm<ContactSupportValues>({
    resolver: zodResolver(contactSupportSchema),
    defaultValues: {
      category: defaultCategory,
      subject: "",
      message: "",
      transactionReference: "",
    },
    mode: "onTouched",
  });

  const category = form.watch("category");

  useEffect(() => {
    if (open) {
      form.reset({
        category: defaultCategory,
        subject: "",
        message: "",
        transactionReference: "",
      });
    }
  }, [defaultCategory, form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
            Tell us what you need help with. Never include your password, PIN,
            OTP, or card security code.
          </DialogDescription>
        </DialogHeader>
        {resultReference ? (
          <div className="flex flex-col gap-4">
            <p role="status" className="text-sm font-medium text-success">
              Your support request has been submitted.
            </p>
            <p className="text-sm text-muted-foreground">
              Demo reference{" "}
              <span className="font-medium text-foreground">
                {resultReference}
              </span>
              . Nothing was sent outside this app.
            </p>
            <DialogFooter>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit((values) => void onSubmit(values))}
          >
            <FieldGroup>
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="support-category">Category</FieldLabel>
                    <select
                      id="support-category"
                      className={cn(selectClassName)}
                      disabled={isPending}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {SUPPORT_CATEGORIES.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="subject"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="support-subject">Subject</FieldLabel>
                    <Input
                      id="support-subject"
                      className="h-11 min-h-11"
                      disabled={isPending}
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              {category === "payments" ? (
                <Controller
                  name="transactionReference"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="support-reference">
                        Transaction reference (optional)
                      </FieldLabel>
                      <Input
                        id="support-reference"
                        className="h-11 min-h-11"
                        disabled={isPending}
                        {...field}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              ) : null}
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="support-message">Message</FieldLabel>
                    <Textarea
                      id="support-message"
                      rows={5}
                      disabled={isPending}
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </FieldGroup>
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} aria-busy={isPending}>
                {isPending ? (
                  <>
                    <LoaderCircle
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                    Sending
                  </>
                ) : (
                  "Submit request"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
