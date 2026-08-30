import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-content flex-1 flex-col px-page-mobile md:px-page-tablet lg:px-page-desktop",
        "pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
