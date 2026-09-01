import Link from "next/link";
import { Hexagon } from "lucide-react";

import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  href?: string | null;
};

export function AppLogo({ className, href = "/" }: AppLogoProps) {
  const content = (
    <>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Hexagon className="size-4" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight group-data-[collapsible=icon]:sr-only">
        OpenPay
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-2.5 rounded-lg text-foreground",
    className,
  );

  if (!href) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
