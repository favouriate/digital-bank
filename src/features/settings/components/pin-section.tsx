"use client";

import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { maskSecret } from "../lib/display";

type TransactionPinSectionProps = {
  onChange: () => void;
  onReset: () => void;
};

export function TransactionPinSection({
  onChange,
  onReset,
}: TransactionPinSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <KeyRound className="size-5 text-primary" aria-hidden="true" />
          Transaction PIN
        </CardTitle>
        <CardDescription>
          Manage your transaction PIN settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Current PIN {maskSecret(4)}. Changing it updates the demo PIN used
          when you send money. It is never stored in your browser.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            className="h-11 min-h-11"
            onClick={onChange}
          >
            Change PIN
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 min-h-11"
            onClick={onReset}
          >
            Reset PIN
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
