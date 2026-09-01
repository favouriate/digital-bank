import { ChevronRight, Eye, FileText, Lock } from "lucide-react";

type LaterStep = {
  id: "details" | "review" | "pin";
  number: number;
  title: string;
  description: string;
  icon: typeof FileText;
  enabled: boolean;
};

type LaterStepsListProps = {
  canContinue: boolean;
  onSelect: (step: LaterStep["id"]) => void;
};

export function LaterStepsList({ canContinue, onSelect }: LaterStepsListProps) {
  const steps: LaterStep[] = [
    {
      id: "details",
      number: 3,
      title: "Transfer Details",
      description: "Add transfer reason and note (optional).",
      icon: FileText,
      enabled: canContinue,
    },
    {
      id: "review",
      number: 4,
      title: "Review Screen",
      description: "We'll validate the details, then you can review.",
      icon: Eye,
      enabled: canContinue,
    },
    {
      id: "pin",
      number: 5,
      title: "Transaction PIN",
      description: "Enter your PIN to authorize the transfer.",
      icon: Lock,
      enabled: false,
    },
  ];

  return (
    <ul className="flex flex-col gap-2">
      {steps.map((step) => {
        const Icon = step.icon;

        return (
          <li key={step.id}>
            <button
              type="button"
              disabled={!step.enabled}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-left disabled:opacity-60"
              onClick={() => onSelect(step.id)}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  {step.number}. {step.title}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {step.description}
                </span>
              </span>
              <ChevronRight
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
