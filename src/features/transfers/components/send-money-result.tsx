import Link from "next/link";
import { CircleAlert, CircleCheck, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatTransferAmount } from "../lib/format";
import type { Recipient } from "../types/transfer";

type SendMoneyResultProps =
  | {
      status: "success";
      recipient: Recipient;
      amount: number;
      onDone: () => void;
    }
  | {
      status: "pending";
      recipient: Recipient;
      amount: number;
      onDone: () => void;
    }
  | {
      status: "failure";
      message: string;
      onRetry: () => void;
      onChangeDetails: () => void;
    };

export function SendMoneyResult(props: SendMoneyResultProps) {
  if (props.status === "success") {
    return (
      <Card className="mx-auto w-full max-w-lg py-8">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <CircleCheck className="size-12 text-success" aria-hidden="true" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Money sent
          </h1>
          <p className="text-sm text-muted-foreground">
            {formatTransferAmount(props.amount)} is on its way to{" "}
            {props.recipient.name}.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              className="h-12 min-h-12 flex-1 rounded-lg"
              render={<Link href="/" onClick={props.onDone} />}
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

  if (props.status === "pending") {
    return (
      <Card className="mx-auto w-full max-w-lg py-8">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <Clock className="size-12 text-primary" aria-hidden="true" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Transfer pending
          </h1>
          <p className="text-sm text-muted-foreground">
            {formatTransferAmount(props.amount)} to {props.recipient.name} is
            still processing. You can check it later in transactions.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              className="h-12 min-h-12 flex-1 rounded-lg"
              render={<Link href="/" onClick={props.onDone} />}
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
          Couldn&apos;t send money
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
