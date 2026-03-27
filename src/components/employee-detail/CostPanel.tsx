import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface CostData {
  today: number;
  week: number;
  month: number;
  avgPerRun: number;
  dailyTrend: { day: string; cost: number }[];
  totalRuns: number;
  weekOverWeekChange: number; // percentage
}

// Synthetic cost data per employee
const costDatabase: Record<string, CostData> = {
  "maya-competitive-intel": {
    today: 2.40, week: 14.80, month: 52.30, avgPerRun: 0.18, totalRuns: 291,
    weekOverWeekChange: -8.2,
    dailyTrend: [
      { day: "Mon", cost: 1.90 }, { day: "Tue", cost: 2.60 }, { day: "Wed", cost: 1.80 },
      { day: "Thu", cost: 2.30 }, { day: "Fri", cost: 2.10 }, { day: "Sat", cost: 1.70 }, { day: "Sun", cost: 2.40 },
    ],
  },
  "sora-support-triage": {
    today: 5.10, week: 31.60, month: 118.40, avgPerRun: 0.08, totalRuns: 1480,
    weekOverWeekChange: 12.4,
    dailyTrend: [
      { day: "Mon", cost: 4.20 }, { day: "Tue", cost: 4.80 }, { day: "Wed", cost: 5.40 },
      { day: "Thu", cost: 4.60 }, { day: "Fri", cost: 3.90 }, { day: "Sat", cost: 3.60 }, { day: "Sun", cost: 5.10 },
    ],
  },
  "niko-launch-ops": {
    today: 0.60, week: 4.20, month: 16.50, avgPerRun: 0.22, totalRuns: 75,
    weekOverWeekChange: -22.0,
    dailyTrend: [
      { day: "Mon", cost: 0.80 }, { day: "Tue", cost: 0.90 }, { day: "Wed", cost: 0.40 },
      { day: "Thu", cost: 0.70 }, { day: "Fri", cost: 0.50 }, { day: "Sat", cost: 0.30 }, { day: "Sun", cost: 0.60 },
    ],
  },
  "iris-deal-risk": {
    today: 0, week: 1.80, month: 8.90, avgPerRun: 0.35, totalRuns: 25,
    weekOverWeekChange: -45.0,
    dailyTrend: [
      { day: "Mon", cost: 0.40 }, { day: "Tue", cost: 0.50 }, { day: "Wed", cost: 0.30 },
      { day: "Thu", cost: 0.60 }, { day: "Fri", cost: 0 }, { day: "Sat", cost: 0 }, { day: "Sun", cost: 0 },
    ],
  },
  "alex-gtm": {
    today: 1.90, week: 12.40, month: 45.20, avgPerRun: 0.15, totalRuns: 301,
    weekOverWeekChange: 5.1,
    dailyTrend: [
      { day: "Mon", cost: 1.60 }, { day: "Tue", cost: 2.10 }, { day: "Wed", cost: 1.80 },
      { day: "Thu", cost: 1.50 }, { day: "Fri", cost: 1.90 }, { day: "Sat", cost: 1.60 }, { day: "Sun", cost: 1.90 },
    ],
  },
  "kai-ai-pm": {
    today: 0.80, week: 6.30, month: 22.10, avgPerRun: 0.12, totalRuns: 184,
    weekOverWeekChange: 0,
    dailyTrend: [
      { day: "Mon", cost: 0.90 }, { day: "Tue", cost: 1.00 }, { day: "Wed", cost: 0.80 },
      { day: "Thu", cost: 0.90 }, { day: "Fri", cost: 0.80 }, { day: "Sat", cost: 1.00 }, { day: "Sun", cost: 0.80 },
    ],
  },
  "vera-analyst": {
    today: 3.20, week: 18.90, month: 71.60, avgPerRun: 0.42, totalRuns: 170,
    weekOverWeekChange: 15.6,
    dailyTrend: [
      { day: "Mon", cost: 2.40 }, { day: "Tue", cost: 2.80 }, { day: "Wed", cost: 3.10 },
      { day: "Thu", cost: 2.60 }, { day: "Fri", cost: 2.20 }, { day: "Sat", cost: 2.60 }, { day: "Sun", cost: 3.20 },
    ],
  },
};

const defaultCost: CostData = {
  today: 0, week: 0, month: 0, avgPerRun: 0, totalRuns: 0, weekOverWeekChange: 0,
  dailyTrend: [
    { day: "Mon", cost: 0 }, { day: "Tue", cost: 0 }, { day: "Wed", cost: 0 },
    { day: "Thu", cost: 0 }, { day: "Fri", cost: 0 }, { day: "Sat", cost: 0 }, { day: "Sun", cost: 0 },
  ],
};

function TrendBadge({ change }: { change: number }) {
  if (change === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
        <Minus className="w-2.5 h-2.5" /> flat
      </span>
    );
  }
  const isUp = change > 0;
  return (
    <span className={cn(
      "inline-flex items-center gap-0.5 text-[10px] font-medium",
      isUp ? "text-state-warning" : "text-state-working"
    )}>
      {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
      {Math.abs(change).toFixed(1)}%
    </span>
  );
}

export function CostPanel({ employeeId }: { employeeId: string }) {
  const cost = costDatabase[employeeId] || defaultCost;
  const [period, setPeriod] = useState<"week" | "month">("week");

  const displayAmount = period === "week" ? cost.week : cost.month;

  return (
    <div className="card-premium rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
          <h3 className="section-label">Cost</h3>
        </div>
        <div className="flex gap-0.5 p-0.5 rounded-md bg-muted">
          {(["week", "month"] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-medium transition-all",
                p === period ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              {p === "week" ? "7d" : "30d"}
            </button>
          ))}
        </div>
      </div>

      {/* Main figure */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[22px] font-bold text-foreground tabular-nums">${displayAmount.toFixed(2)}</span>
        <TrendBadge change={cost.weekOverWeekChange} />
      </div>
      <p className="text-[11px] text-muted-foreground mb-3">vs previous {period}</p>

      {/* Sparkline */}
      <div className="h-[48px] -mx-1 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cost.dailyTrend}>
            <defs>
              <linearGradient id={`costGrad-${employeeId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" hide />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-popover border border-border rounded-lg px-2.5 py-1.5 shadow-md">
                    <p className="text-[11px] text-muted-foreground">{payload[0].payload.day}</p>
                    <p className="text-[12px] font-semibold text-foreground">${Number(payload[0].value).toFixed(2)}</p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              fill={`url(#costGrad-${employeeId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
        <div>
          <p className="text-[10px] text-muted-foreground">Today</p>
          <p className="text-[13px] font-semibold text-foreground tabular-nums">${cost.today.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Avg / run</p>
          <p className="text-[13px] font-semibold text-foreground tabular-nums">${cost.avgPerRun.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Total runs</p>
          <p className="text-[13px] font-semibold text-foreground tabular-nums">{cost.totalRuns.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
