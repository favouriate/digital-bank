"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle, Mail } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForgotPasswordMutation } from "../hooks/use-forgot-password-mutation";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgot-password-schema";
import { ForgotPasswordError } from "../types/forgot-password";

export function ForgotPasswordForm() {
  const errorId = useId();
  const [authError, setAuthError] = useState<string | null>(null);
  const [sentToEmail, setSentToEmail] = useState<string | null>(null);
  const forgotPasswordMutation = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const isSubmitting = forgotPasswordMutation.isPending;

  async function onSubmit(values: ForgotPasswordFormValues) {
    setAuthError(null);

    try {
      await forgotPasswordMutation.mutateAsync(values);
      setSentToEmail(values.email);
    } catch (error) {
      const message =
        error instanceof ForgotPasswordError
          ? error.message
          : "Unable to send a reset link. Please try again.";
      setAuthError(message);
    }
  }

  if (sentToEmail) {
    return (
      <div className="flex w-full flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If an account exists for {sentToEmail}, we sent a reset link.
          </p>
        </div>

        <Link
          href="/login"
          className={cn(
            buttonVariants(),
            "h-12 min-h-12 w-full rounded-lg text-base",
          )}
        >
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Forgot password?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the email for your OpenPay account
        </p>
      </div>

      {authError ? (
        <div
          id={errorId}
          role="alert"
          className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          {authError}
        </div>
      ) : null}

      <FieldGroup className="gap-5">
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="forgot-password-email">Email</FieldLabel>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="forgot-password-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              disabled={isSubmitting}
              className="h-12 min-h-11 rounded-lg pl-10"
              aria-invalid={!!form.formState.errors.email}
              aria-describedby={
                form.formState.errors.email
                  ? "forgot-password-email-error"
                  : undefined
              }
              {...form.register("email")}
            />
          </div>
          <FieldError
            id="forgot-password-email-error"
            errors={[form.formState.errors.email]}
          />
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="h-12 min-h-12 w-full rounded-lg text-base"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending reset link
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </FieldGroup>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
