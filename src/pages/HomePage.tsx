import { workspace, employees, attentionItems } from "@/lib/data";
import { StateBadge, StateDot } from "@/components/StateBadge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { CreditCard, TrendingUp, AlertCircle, ArrowRight, Zap, Users } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const liveCount = employees.filter((e) => e.state === "working" || e.state === "warning").length;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's what's happening in your workspace.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Credits left</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{workspace.creditsLeft.toLocaleString()}</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span>{workspace.weeklySpend} spent this week · {workspace.burnPerDay}/day</span>
          </div>
          {workspace.autoRefillEnabled && (
            <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-state-working/10 text-state-working">
              Auto-refill on
            </span>
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Employees</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{liveCount} <span className="text-lg font-normal text-muted-foreground">live</span></p>
          <p className="text-xs text-muted-foreground mt-1">{employees.length} total</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Skills & Connections</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{workspace.skillsInstalled}</p>
          <p className="text-xs text-muted-foreground mt-1">{workspace.liveConnections} live connections</p>
        </div>
      </div>

      {/* AIE alive */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Employee status</h2>
        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {employees.map((emp) => (
            <button
              key={emp.id}
              onClick={() => navigate(`/preview/employees/${emp.id}`)}
              className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-muted/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-foreground">{emp.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{emp.name}</span>
                  <span className="text-xs text-muted-foreground">· {emp.title}</span>
                </div>
              </div>
              <StateBadge state={emp.state} />
            </button>
          ))}
        </div>
      </div>

      {/* Needs your attention */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-state-warning" />
          <h2 className="text-sm font-semibold text-foreground">Needs your attention</h2>
        </div>
        <div className="space-y-2">
          {attentionItems.map((item, i) => (
            <div key={i} className="bg-card rounded-xl border border-border px-5 py-4 flex items-center gap-4">
              <StateDot state={item.tone} className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
              </div>
              <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex-shrink-0">
                {item.action}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
