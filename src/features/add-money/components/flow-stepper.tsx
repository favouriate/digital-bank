import { cn } from "@/lib/utils";

const STEPS = [
  "Funding Method",
  "Amount",
  "Review",
  "Confirmation",
] as const;

type FlowStepperProps = {
  currentStep: 1 | 2 | 3 | 4;
};

export function FlowStepper({ currentStep }: FlowStepperProps) {
  return (
    <ol className="flex items-start justify-between gap-2" aria-label="Add money steps">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const active = stepNumber === currentStep;
        const complete = stepNumber < currentStep;

        return (
          <li
            key={label}
            className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center"
            aria-current={active ? "step" : undefined}
          >
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-semibold",
                active || complete
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {stepNumber}
            </span>
            <span
              className={cn(
                "max-w-full truncate text-xs font-medium sm:text-sm",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
