import { LoaderCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { FlowStepper } from "./flow-stepper";

export function SendMoneyValidating() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Validating transfer
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;re checking the details before you continue.
        </p>
      </div>
      <FlowStepper currentStep={3} />
      <Card className="mx-auto w-full max-w-lg py-8">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <LoaderCircle
            className="size-10 animate-spin text-primary"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Validating recipient and amount…
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
