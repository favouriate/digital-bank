"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendMoneyRecipientForm } from "@/features/transfers/components/send-money-recipient-form";

import { useStartTransfer } from "../hooks/use-start-transfer";

export function SendMoneyCard() {
  const startTransfer = useStartTransfer();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
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
