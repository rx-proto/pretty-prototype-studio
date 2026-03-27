import { workspace, employees, attentionItems } from "@/lib/data";
import { StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { Users, Plug, ChevronRight, AlertCircle, ArrowRight, DollarSign } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const workingCount = employees.filter(e => e.state === "working" || e.state === "warning").length;

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-8">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Here's what's happening in your workspace.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 animate-stagger">
        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <p className="section-label">Employees</p>
          </div>
          <p className="text-[22px] font-bold text-foreground tracking-tight">{workingCount} <span className="text-[13px] font-medium text-muted-foreground">working</span></p>
          <p className="text-[12px] text-muted-foreground mt-1">{workspace.totalEmployees} total in workspace</p>
        </div>

        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <p className="section-label">Balance</p>
          </div>
          <p className="text-[22px] font-bold text-foreground tracking-tight">${workspace.balance.toFixed(2)}</p>
          <p className="text-[12px] text-state-working font-medium mt-1">{workspace.balanceStatus}</p>
        </div>

        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="flex items-center gap-2 mb-3">
            <Plug className="w-4 h-4 text-muted-foreground" />
            <p className="section-label">Connectors</p>
          </div>
          <p className="text-[22px] font-bold text-foreground tracking-tight">{workspace.connectorsActive} <span className="text-[13px] font-medium text-muted-foreground">active</span></p>
          <p className="text-[12px] text-muted-foreground mt-1">All systems operational</p>
        </div>
      </div>

      {attentionItems.length > 0 && (
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-state-warning" />
            <h2 className="text-[13px] font-semibold text-foreground">Needs your attention</h2>
          </div>
          <div className="space-y-2">
            {attentionItems.map((item, i) => (
              <div key={i} className="card-interactive rounded-xl border border-border px-5 py-3.5 flex items-center gap-4 cursor-pointer">
                <EmployeeAvatar name={item.title} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                    <StateDot state={item.tone} />
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
                <button className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/[0.05] hover:bg-primary/[0.08]">
                  {item.action} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-foreground">Your employees</h2>
          <button onClick={() => navigate("/app/employees")} className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-0.5">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="card-premium rounded-xl border border-border overflow-hidden">
          {employees.map((emp, i) => (
            <button
              key={emp.id}
              onClick={() => navigate(`/app/employees/${emp.id}`)}
              className={`w-full flex items-center gap-3.5 px-5 py-3.5 text-left hover:bg-muted/30 transition-colors duration-200 ${
                i < employees.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <EmployeeAvatar name={emp.name} size="sm" />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-foreground">{emp.name}</span>
                <p className="text-[12px] text-muted-foreground truncate">{emp.statusMessage}</p>
              </div>
              <StateDot state={emp.state} />
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
