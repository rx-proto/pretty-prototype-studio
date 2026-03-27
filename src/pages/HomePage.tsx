import { useState } from "react";
import { employees, attentionItems, dailySpend, weeklySpend, todaySpend, recentActivity, AttentionItem } from "@/lib/data";
import { StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, ChevronRight, AlertTriangle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function HomePage() {
  const navigate = useNavigate();
  const activeCount = employees.filter(e => e.state === "working" || e.state === "warning" || e.state === "ready").length;
  const actionItems = attentionItems.filter(item => item.tone === "warning" || item.tone === "blocked");
  const [selectedItem, setSelectedItem] = useState<AttentionItem | null>(null);

  const maxSpend = Math.max(...dailySpend.map(d => d.amount));

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-8">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Here's what's happening in your workspace.</p>
      </div>

      {/* Top row: 2 cards */}
      <div className="grid grid-cols-2 gap-3 animate-stagger">
        <button
          onClick={() => navigate("/app/employees")}
          className="card-interactive rounded-xl border border-border p-5 text-left relative noise-overlay"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-blue-500" />
            <p className="section-label">Employees</p>
          </div>
          <p className="text-[22px] font-bold text-foreground tracking-tight">
            {activeCount} <span className="text-[13px] font-medium text-muted-foreground">active</span>
          </p>
          <div className="flex items-center gap-1 mt-2">
            {employees.slice(0, 5).map(emp => (
              <EmployeeAvatar key={emp.id} name={emp.name} size="sm" />
            ))}
            {employees.length > 5 && (
              <span className="text-[11px] text-muted-foreground ml-1">+{employees.length - 5}</span>
            )}
          </div>
        </button>

        <button
          onClick={() => navigate("/app/billing")}
          className="card-interactive rounded-xl border border-border p-5 text-left relative noise-overlay"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <p className="section-label">Spend</p>
          </div>
          <p className="text-[22px] font-bold text-foreground tracking-tight">
            ${todaySpend.toFixed(2)} <span className="text-[13px] font-medium text-muted-foreground">today</span>
          </p>
          <div className="flex items-end gap-[3px] mt-2 h-[24px]">
            {dailySpend.map((d, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-emerald-500/60"
                style={{ height: `${Math.max((d.amount / maxSpend) * 100, 8)}%` }}
                title={`${d.day}: $${d.amount.toFixed(2)}`}
              />
            ))}
          </div>
          <p className="text-[12px] text-muted-foreground mt-1.5">${weeklySpend.toFixed(2)} this week</p>
        </button>
      </div>

      {/* Action required */}
      {actionItems.length > 0 && (
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-state-warning" />
            <h2 className="text-[13px] font-semibold text-foreground">Action required</h2>
          </div>
          <div className="space-y-2">
            {actionItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedItem(item)}
                className="w-full card-interactive rounded-xl border border-border px-5 py-3.5 flex items-center gap-4 text-left"
              >
                <EmployeeAvatar name={item.title} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                    <StateDot state={item.tone} />
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action detail dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[420px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <EmployeeAvatar name={selectedItem.title} size="sm" />
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-[15px]">{selectedItem.title}</DialogTitle>
                    <StateDot state={selectedItem.tone} />
                  </div>
                </div>
                <DialogDescription className="text-[13px] pt-1">
                  {selectedItem.detail}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 rounded-lg bg-muted/50 border border-border px-4 py-3">
                <p className="text-[12px] font-medium text-muted-foreground mb-1.5">Suggested action</p>
                <p className="text-[13px] text-foreground leading-relaxed">{selectedItem.suggestion}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Recent activity */}
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <h2 className="text-[13px] font-semibold text-foreground">Recent activity</h2>
        </div>
        <div className="card-premium rounded-xl border border-border overflow-hidden">
          {recentActivity.map((activity, i) => (
            <button
              key={i}
              onClick={() => navigate(`/app/employees/${activity.employeeId}`)}
              className={`w-full flex items-center gap-3.5 px-5 py-3.5 text-left hover:bg-muted/30 transition-colors duration-200 ${
                i < recentActivity.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <EmployeeAvatar name={activity.employeeName} size="sm" />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-foreground">{activity.employeeName}</span>
                <p className="text-[12px] text-muted-foreground truncate">{activity.summary}</p>
              </div>
              <span className="text-[11px] text-muted-foreground/60 flex-shrink-0">{activity.timeAgo}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}