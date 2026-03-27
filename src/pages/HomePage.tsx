import { workspace, employees, attentionItems } from "@/lib/data";
import { StateBadge, StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { TrendingUp, AlertCircle, ArrowRight, Zap, ChevronRight } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const liveCount = employees.filter((e) => e.state === "working" || e.state === "warning").length;

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-8">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Here's what's happening in your workspace.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Credits */}
        <div className="card-premium rounded-xl border border-border p-5">
          <p className="section-label mb-3">Credits remaining</p>
          <p className="stat-number text-foreground">{workspace.creditsLeft.toLocaleString()}</p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span>{workspace.weeklySpend} this week · {workspace.burnPerDay}/day</span>
          </div>
          {workspace.autoRefillEnabled && (
            <span className="inline-flex items-center gap-1 mt-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-state-working/8 text-state-working ring-1 ring-inset ring-state-working/20">
              <span className="w-1 h-1 rounded-full bg-state-working" />
              Auto-refill
            </span>
          )}
        </div>

        {/* Employees */}
        <div className="card-premium rounded-xl border border-border p-5">
          <p className="section-label mb-3">Employees</p>
          <div className="flex items-baseline gap-2">
            <span className="stat-number text-foreground">{liveCount}</span>
            <span className="text-[13px] text-muted-foreground font-medium">live</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">{employees.length} total in workspace</p>
          {/* Mini avatars */}
          <div className="flex -space-x-1.5 mt-3">
            {employees.slice(0, 5).map((emp) => (
              <div key={emp.id} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/80 to-state-accent/80 flex items-center justify-center text-[9px] font-semibold text-primary-foreground ring-2 ring-card">
                {emp.name[0]}
              </div>
            ))}
            {employees.length > 5 && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-medium text-muted-foreground ring-2 ring-card">
                +{employees.length - 5}
              </div>
            )}
          </div>
        </div>

        {/* Skills & Connections */}
        <div className="card-premium rounded-xl border border-border p-5">
          <p className="section-label mb-3">Capabilities</p>
          <div className="flex items-baseline gap-2">
            <span className="stat-number text-foreground">{workspace.skillsInstalled}</span>
            <span className="text-[13px] text-muted-foreground font-medium">skills</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">{workspace.liveConnections} live connections</p>
          <div className="flex items-center gap-1 mt-3">
            <Zap className="w-3 h-3 text-state-working" />
            <span className="text-[10px] text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Needs your attention */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-3.5 h-3.5 text-state-warning" />
          <h2 className="text-[13px] font-semibold text-foreground">Needs your attention</h2>
          <span className="text-[11px] text-muted-foreground">· {attentionItems.length} items</span>
        </div>
        <div className="space-y-2">
          {attentionItems.map((item, i) => (
            <div key={i} className="card-interactive rounded-xl border border-border px-5 py-3.5 flex items-center gap-4 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-state-accent/80 flex items-center justify-center text-xs font-semibold text-primary-foreground flex-shrink-0">
                {item.title[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                  <StateDot state={item.tone} />
                </div>
                <p className="text-[12px] text-muted-foreground mt-0.5">{item.detail}</p>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10">
                {item.action}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Employee status */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-foreground">Employee status</h2>
          <button onClick={() => navigate("/preview/employees")} className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-0.5">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="card-premium rounded-xl border border-border overflow-hidden">
          {employees.map((emp, i) => (
            <button
              key={emp.id}
              onClick={() => navigate(`/preview/employees/${emp.id}`)}
              className={cn(
                "w-full flex items-center gap-3.5 px-5 py-3 text-left hover:bg-muted/40 transition-colors",
                i < employees.length - 1 && "border-b border-border"
              )}
            >
              <EmployeeAvatar name={emp.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-foreground">{emp.name}</span>
                  <span className="text-[11px] text-muted-foreground truncate">{emp.title}</span>
                </div>
              </div>
              <StateBadge state={emp.state} />
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}
