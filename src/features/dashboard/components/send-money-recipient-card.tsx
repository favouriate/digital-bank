"use client";

import Link from "next/link";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SendMoneyRecipientForm } from "@/features/transfers/components/send-money-recipient-form";

import { useStartTransfer } from "../hooks/use-start-transfer";

export function SendMoneyRecipientCard() {
  const startTransfer = useStartTransfer();

  return (
    <Card className="rounded-2xl">
      <CardHeader className="gap-1">
        <CardTitle className="text-lg font-semibold">Send Money</CardTitle>
        <CardAction>
          <Link
            href="/transfers"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </CardAction>
        <CardDescription>
          Send to any bank account in your preferred country.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SendMoneyRecipientForm
          onContinue={({ resolvedRecipient, accountNumber }) => {
            startTransfer({ resolvedRecipient, accountNumber });
          }}
        />
      </CardContent>
    </Card>
  );
}
