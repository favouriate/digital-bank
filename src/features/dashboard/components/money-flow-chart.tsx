"use client";

import { ChevronDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { formatSignedChange } from "../lib/format-balance";
import type { MoneyFlowSeries } from "../types/dashboard";

const chartConfig = {
  savings: {
    label: "Savings",
    color: "var(--color-primary)",
  },
  income: {
    label: "Income",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

type MoneyFlowChartProps = {
  series: MoneyFlowSeries;
  compact?: boolean;
};

export function MoneyFlowChart({ series, compact = false }: MoneyFlowChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Money Flow</CardTitle>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {series.seriesLabel}
            </span>
            <span className="text-success">{formatSignedChange(series.changePercent)}</span>
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="min-h-11 gap-1" />
            }
          >
            {series.periodLabel}
            <ChevronDown className="size-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{series.periodLabel}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          role="region"
          className={cn(compact ? "aspect-[16/9] max-h-48" : "aspect-[16/8] max-h-64")}
          aria-label={`${series.seriesLabel} money flow for this ${series.periodLabel.toLowerCase()}`}
        >
          <LineChart data={series.points} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={compact ? 1 : 0}
            />
            {!compact ? (
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: number) => `${value / 1000}k`}
                width={32}
              />
            ) : null}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="label"
                  formatter={(value, name) => (
                    <div className="flex min-w-28 justify-between gap-4">
                      <span className="text-muted-foreground">
                        {name === "income" ? "Income" : "Savings"}
                      </span>
                      <span className="font-medium">
                        {typeof value === "number"
                          ? `$${value.toLocaleString("en-US")}`
                          : value}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Line
              dataKey="savings"
              type="monotone"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 0, fill: "var(--color-primary)" }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
