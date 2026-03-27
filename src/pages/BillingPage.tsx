import { workspace, employees } from "@/lib/data";
import { StateBadge, EmployeeAvatar } from "@/components/StateBadge";

export default function BillingPage() {
  const sortedBySpend = [...employees].sort((a, b) => b.weeklySpend - a.weeklySpend);

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Workspace budget and employee spend</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="card-premium rounded-xl border border-border p-5">
          <p className="section-label mb-2">Credits remaining</p>
          <p className="stat-number text-foreground">{workspace.creditsLeft.toLocaleString()}</p>
          {workspace.autoRefillEnabled && (
            <span className="inline-flex items-center gap-1 mt-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-state-working/8 text-state-working ring-1 ring-inset ring-state-working/20">
              <span className="w-1 h-1 rounded-full bg-state-working" />
              Auto-refill
            </span>
          )}
        </div>
        <div className="card-premium rounded-xl border border-border p-5">
          <p className="section-label mb-2">Weekly spend</p>
          <p className="stat-number text-foreground">{workspace.weeklySpend}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{workspace.burnPerDay} credits/day avg</p>
        </div>
      </div>

      <div>
        <h2 className="text-[13px] font-semibold text-foreground mb-3">Spend by employee</h2>
        <div className="card-premium rounded-xl border border-border overflow-hidden">
          {sortedBySpend.map((emp, i) => (
            <div key={emp.id} className={`px-5 py-4 flex items-center gap-3.5 ${i < sortedBySpend.length - 1 ? "border-b border-border" : ""}`}>
              <EmployeeAvatar name={emp.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[13px] font-medium text-foreground">{emp.name}</span>
                  <StateBadge state={emp.state} />
                </div>
                <div className="h-1 rounded-full bg-muted overflow-hidden mb-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${emp.budgetUsedPercent}%`,
                      background: emp.budgetUsedPercent > 75 ? `hsl(var(--state-warning))` : `hsl(var(--primary))`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">{emp.weeklySpend} / {emp.weeklyBudget} credits · {emp.budgetUsedPercent}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
