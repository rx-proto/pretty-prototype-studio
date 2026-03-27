import { workspace, employees } from "@/lib/data";
import { StateBadge } from "@/components/StateBadge";
import { Progress } from "@/components/ui/progress";

export default function BillingPage() {
  const sortedBySpend = [...employees].sort((a, b) => b.weeklySpend - a.weeklySpend);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground text-sm mt-1">Workspace budget and employee spend</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Credits remaining</p>
          <p className="text-3xl font-bold text-foreground">{workspace.creditsLeft.toLocaleString()}</p>
          {workspace.autoRefillEnabled && (
            <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-state-working/10 text-state-working">
              Auto-refill enabled
            </span>
          )}
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Weekly spend</p>
          <p className="text-3xl font-bold text-foreground">{workspace.weeklySpend}</p>
          <p className="text-xs text-muted-foreground mt-1">{workspace.burnPerDay} credits/day average</p>
        </div>
      </div>

      {/* Per-employee spend */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Spend by employee</h2>
        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {sortedBySpend.map((emp) => (
            <div key={emp.id} className="px-5 py-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-foreground">{emp.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">{emp.name}</span>
                  <StateBadge state={emp.state} />
                </div>
                <Progress value={emp.budgetUsedPercent} className="h-1 mb-1" />
                <p className="text-[10px] text-muted-foreground">{emp.weeklySpend} / {emp.weeklyBudget} credits · {emp.budgetUsedPercent}% used</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
