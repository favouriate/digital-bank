import Link from "next/link";
import { ExternalLink, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SettingsSecurityBanner() {
  return (
    <Card className="bg-primary/5 ring-primary/10">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Shield
            className="mt-0.5 size-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Your security is our priority.{" "}
            </span>
            We use bank-level security to keep your account and data safe.
          </p>
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          className="h-11 min-h-11 shrink-0 gap-2"
          render={<Link href="/support" />}
        >
          Learn more
          <ExternalLink className="size-4" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}
