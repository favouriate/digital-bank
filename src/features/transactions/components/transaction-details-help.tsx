import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function TransactionDetailsHelp() {
  return (
    <Card className="bg-primary/5 ring-primary/10">
      <CardContent className="flex items-start gap-3">
        <ShieldAlert
          className="mt-0.5 size-5 shrink-0 text-primary"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="font-semibold text-foreground">Need Help?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            If you didn&apos;t recognize this transaction, please contact our
            support team immediately.
          </p>
          <Link
            href="/support"
            className="mt-2 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Contact Support →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
