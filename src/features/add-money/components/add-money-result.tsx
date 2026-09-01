import Link from "next/link";
import { CircleAlert, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CurrencyCode } from "@/types/currency";
import type { FundingMethod } from "../types/add-money";
import { formatAddMoneyAmount } from "../lib/format";

type AddMoneyResultProps =
  | {
      status: "success";
      method: FundingMethod;
      amount: number;
      currency: CurrencyCode;
      onDone: () => void;
    }
  | {
      status: "failure";
      message: string;
      onRetry: () => void;
      onChangeDetails: () => void;
    };

export function AddMoneyResult(props: AddMoneyResultProps) {
  if (props.status === "success") {
    return (
      <Card className="mx-auto w-full max-w-lg py-8">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <CircleCheck className="size-12 text-success" aria-hidden="true" />
          <h1 className="text-2xl font-semibold tracking-tight">Money added</h1>
          <p className="text-sm text-muted-foreground">
            {formatAddMoneyAmount(props.amount, props.currency)} from {props.method.label} is now
            available in your account.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              className="h-12 min-h-12 flex-1 rounded-lg"
              onClick={props.onDone}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              className="h-12 min-h-12 flex-1 rounded-lg"
              render={<Link href="/transactions" />}
            >
              View transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-lg py-8">
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <CircleAlert className="size-12 text-destructive" aria-hidden="true" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Couldn&apos;t add money
        </h1>
        <p role="alert" className="text-sm text-muted-foreground">
          {props.message}
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            className="h-12 min-h-12 flex-1 rounded-lg"
            onClick={props.onRetry}
          >
            Retry
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 min-h-12 flex-1 rounded-lg"
            onClick={props.onChangeDetails}
          >
            Change details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
