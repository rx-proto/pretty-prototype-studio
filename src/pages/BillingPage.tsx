import { workspace, dailySpend, employeeSpend, invoices } from "@/lib/data";
import { EmployeeAvatar } from "@/components/StateBadge";
import { DollarSign, Plus, Receipt, TrendingUp } from "lucide-react";

export default function BillingPage() {
  const weeklyTotal = dailySpend.reduce((s, d) => s + d.amount, 0);
  const maxSpend = Math.max(...dailySpend.map(d => d.amount));

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Your workspace balance and usage</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-3 gap-3 animate-stagger">
        {/* Balance */}
        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <p className="section-label">Balance</p>
            </div>
            <p className="text-[28px] font-bold text-foreground tracking-tight">${workspace.balance.toFixed(2)}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-state-working/[0.08] text-state-working ring-1 ring-inset ring-state-working/20">
              <span className="w-1.5 h-1.5 rounded-full bg-state-working" />
              {workspace.balanceStatus}
            </span>
          </div>
        </div>

        {/* This week */}
        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="section-label">This week</p>
            </div>
            <p className="text-[28px] font-bold text-foreground tracking-tight">${weeklyTotal.toFixed(2)}</p>
            <p className="text-[12px] text-muted-foreground mt-1">${(weeklyTotal / 7).toFixed(2)}/day avg</p>
          </div>
        </div>

        {/* Add funds */}
        <div className="card-premium rounded-xl border border-border p-5 flex flex-col items-center justify-center text-center">
          <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all">
            <Plus className="w-4 h-4" />
            Add funds
          </button>
          <p className="text-[11px] text-muted-foreground mt-2">Auto-refill is enabled</p>
        </div>
      </div>

      {/* Spend chart */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.15s" }}>
        <h2 className="text-[13px] font-semibold text-foreground mb-4">Daily spend this week</h2>
        <div className="flex items-end gap-2 h-[120px]">
          {dailySpend.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-medium text-muted-foreground">${d.amount.toFixed(0)}</span>
              <div className="w-full rounded-t-md bg-primary/[0.12] relative overflow-hidden" style={{ height: `${(d.amount / maxSpend) * 80 + 8}px` }}>
                <div className="absolute inset-0 bg-primary/20 rounded-t-md" />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spend by employee */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.25s" }}>
        <h2 className="text-[13px] font-semibold text-foreground mb-3">Spend by employee</h2>
        <div className="space-y-3">
          {employeeSpend.map((emp) => (
            <div key={emp.name} className="flex items-center gap-3">
              <EmployeeAvatar name={emp.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-medium text-foreground">{emp.name}</span>
                  <span className="text-[12px] font-medium text-foreground">${emp.amount.toFixed(2)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/30"
                    style={{ width: `${(emp.amount / employeeSpend[0].amount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.35s" }}>
        <div className="flex items-center gap-2 mb-3">
          <Receipt className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-[13px] font-semibold text-foreground">Invoices</h2>
        </div>
        <div className="space-y-0">
          {invoices.map((inv, i) => (
            <div key={inv.id} className={`flex items-center justify-between py-3 ${i < invoices.length - 1 ? "border-b border-border/60" : ""}`}>
              <div>
                <p className="text-[13px] font-medium text-foreground">{inv.description}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{inv.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-medium text-foreground">${inv.amount.toFixed(2)}</p>
                <span className="text-[10px] font-medium text-state-working capitalize">{inv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
