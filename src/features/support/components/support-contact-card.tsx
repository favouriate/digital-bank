import { Headphones, Mail, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { SUPPORT_MAILTO } from "../lib/categories";

type SupportContactCardProps = {
  onContact: () => void;
};

export function SupportContactCard({ onContact }: SupportContactCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 px-6 py-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Headphones className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Need more help?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Our support team is ready to assist you.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Button
            type="button"
            className="h-11 min-h-11 w-full gap-2"
            onClick={onContact}
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Contact Support
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            className="h-11 min-h-11 w-full gap-2"
            render={<a href={SUPPORT_MAILTO} />}
          >
            <Mail className="size-4" aria-hidden="true" />
            Send us an Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
