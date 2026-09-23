import { Clock3 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SUPPORT_HOURS, SUPPORT_HOURS_NOTE } from "../lib/hours";

export function SupportHoursCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Support Hours</CardTitle>
        <CardDescription>When our team is available.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <dl className="space-y-2 text-sm">
          {SUPPORT_HOURS.map((row) => (
            <div
              key={row.days}
              className="flex items-start justify-between gap-4"
            >
              <dt className="text-muted-foreground">{row.days}</dt>
              <dd className="text-right font-medium text-foreground">
                {row.hours}
              </dd>
            </div>
          ))}
        </dl>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />
          {SUPPORT_HOURS_NOTE}
        </p>
      </CardContent>
    </Card>
  );
}
