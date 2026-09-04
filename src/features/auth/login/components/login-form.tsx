"use client";

import { useEffect, useId, useState } from "react";
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

import { setDemoSession } from "@/features/auth/lib/demo-session";

import { useLoginMutation } from "../hooks/use-login-mutation";
import { LoginError } from "../types/login";
import {
  loginSchema,
  type LoginFormValues,
} from "../schemas/login-schema";
import { LoginSocialButtons } from "./login-social-buttons";

const REMEMBERED_EMAIL_KEY = "openpay.remembered-email";

export function LoginForm() {
  const router = useRouter();
  const errorId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    const remembered = window.localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (remembered) {
      form.setValue("email", remembered);
      form.setValue("rememberMe", true);
    }
  }, [form]);

  const isSubmitting = loginMutation.isPending;

  function handleUnavailableSocial() {
    setAuthError("Social sign-in is not available yet.");
  }

  async function onSubmit(values: LoginFormValues) {
    setAuthError(null);

    try {
      await loginMutation.mutateAsync(values);

      if (values.rememberMe) {
        window.localStorage.setItem(REMEMBERED_EMAIL_KEY, values.email);
      } else {
        window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      setDemoSession();
      router.push("/");
    } catch (error) {
      const message =
        error instanceof LoginError
          ? error.message
          : "Unable to log in. Please try again.";
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
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Log in to your OpenPay account
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
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              disabled={isSubmitting}
              className="h-12 min-h-11 rounded-lg pl-10"
              aria-invalid={!!form.formState.errors.email}
              aria-describedby={
                form.formState.errors.email ? "email-error" : undefined
              }
              {...form.register("email")}
            />
          </div>
          <FieldError id="email-error" errors={[form.formState.errors.email]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              disabled={isSubmitting}
              className="h-12 min-h-11 rounded-lg pr-11 pl-10"
              aria-invalid={!!form.formState.errors.password}
              aria-describedby={
                form.formState.errors.password ? "password-error" : undefined
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
            id="password-error"
            errors={[form.formState.errors.password]}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </Field>

        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal" className="min-h-11 items-center">
              <Label className="flex min-h-11 items-center gap-2 font-normal">
                <Checkbox
                  checked={field.value}
                  disabled={isSubmitting}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
                Remember me
              </Label>
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
              Logging in
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </FieldGroup>

      <FieldSeparator className="my-6">or continue with</FieldSeparator>

      <LoginSocialButtons
        disabled={isSubmitting}
        onUnavailable={handleUnavailableSocial}
      />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
