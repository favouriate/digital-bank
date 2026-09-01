import Link from "next/link";
import { Headphones, Shield, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WhyOpenPay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Why use OpenPay?</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <p className="flex items-start gap-2">
          <Shield className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-medium">Secure Transfers. </span>
            Bank-level encryption on every send.
          </span>
        </p>
        <p className="flex items-start gap-2">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-medium">Fast &amp; Reliable. </span>
            Most transfers arrive instantly.
          </span>
        </p>
        <p className="flex items-start gap-2">
          <Headphones className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-medium">24/7 Support. </span>
            Help is available whenever you need it.
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export function NeedHelp() {
  return (
    <aside className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
      <Headphones className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <p>
        <span className="font-semibold">Need Help? </span>
        Visit the{" "}
        <Link href="/support" className="font-medium text-primary hover:underline">
          Help Center
        </Link>
        .
      </p>
    </aside>
  );
}
