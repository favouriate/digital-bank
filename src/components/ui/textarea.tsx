import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none ring-0 ring-offset-0 placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus:border-destructive aria-invalid:focus:ring-1 aria-invalid:focus:ring-destructive/20 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-1 aria-invalid:focus-visible:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
