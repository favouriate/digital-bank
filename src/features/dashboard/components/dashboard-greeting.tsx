import { getTimeOfDayGreeting } from "@/lib/greeting";

type DashboardGreetingProps = {
  firstName: string;
};

export function DashboardGreeting({ firstName }: DashboardGreetingProps) {
  const greeting = getTimeOfDayGreeting();

  return (
    <section aria-labelledby="dashboard-greeting">
      <h1
        id="dashboard-greeting"
        className="text-lg font-semibold leading-none tracking-tight text-foreground lg:text-2xl lg:leading-tight"
        suppressHydrationWarning
      >
        {greeting} {firstName}{" "}
        <span aria-hidden="true">👋</span>
      </h1>
      <p className="mt-0 text-sm leading-snug text-muted-foreground lg:mt-0.5">
        Here&apos;s what&apos;s happening with your money today.
      </p>
    </section>
  );
}
