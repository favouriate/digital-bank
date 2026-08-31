"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSocialButtons } from "@/features/auth/login/components/login-social-buttons";

import { useRegisterMutation } from "../hooks/use-register-mutation";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register-schema";
import { RegisterError } from "../types/register";

export function RegisterForm() {
  const router = useRouter();
  const errorId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const registerMutation = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      acceptedTerms: false,
    },
    mode: "onTouched",
  });

  const isSubmitting = registerMutation.isPending;

  function handleUnavailableSocial() {
    setAuthError("Social sign-up is not available yet.");
  }

  async function onSubmit(values: RegisterFormValues) {
    setAuthError(null);

    try {
      await registerMutation.mutateAsync(values);
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof RegisterError
          ? error.message
          : "Unable to create your account. Please try again.";
      setAuthError(message);
    }
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your OpenPay account
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
          <FieldLabel htmlFor="register-email">Email</FieldLabel>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              disabled={isSubmitting}
              className="h-12 min-h-11 rounded-lg pl-10"
              aria-invalid={!!form.formState.errors.email}
              aria-describedby={
                form.formState.errors.email ? "register-email-error" : undefined
              }
              {...form.register("email")}
            />
          </div>
          <FieldError
            id="register-email-error"
            errors={[form.formState.errors.email]}
          />
        </Field>

        <Field data-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="register-password">Password</FieldLabel>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter your password"
              disabled={isSubmitting}
              className="h-12 min-h-11 rounded-lg pr-11 pl-10"
              aria-invalid={!!form.formState.errors.password}
              aria-describedby={
                form.formState.errors.password
                  ? "register-password-error"
                  : undefined
              }
              {...form.register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((current) => !current)}
              className="absolute top-1/2 right-1 size-11 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          <FieldError
            id="register-password-error"
            errors={[form.formState.errors.password]}
          />
        </Field>

        <Controller
          name="acceptedTerms"
          control={form.control}
          render={({ field }) => (
            <Field data-invalid={!!form.formState.errors.acceptedTerms}>
              <Label className="flex min-h-11 items-start gap-2 font-normal">
                <Checkbox
                  checked={field.value}
                  disabled={isSubmitting}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  aria-invalid={!!form.formState.errors.acceptedTerms}
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>
                </span>
              </Label>
              <FieldError
                id="register-terms-error"
                errors={[form.formState.errors.acceptedTerms]}
              />
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="h-12 min-h-12 w-full rounded-lg text-base"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Creating account
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </FieldGroup>

      <FieldSeparator className="my-6">or continue with</FieldSeparator>

      <LoginSocialButtons
        disabled={isSubmitting}
        onUnavailable={handleUnavailableSocial}
      />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
