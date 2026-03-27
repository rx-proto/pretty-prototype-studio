import { employees } from "@/lib/data";
import { StateBadge, EmployeeAvatar } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function EmployeesPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Employees</h1>
        <p className="text-muted-foreground text-[13px] mt-1">{employees.length} AI employees in your workspace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {employees.map((emp) => (
          <button
            key={emp.id}
            onClick={() => navigate(`/preview/employees/${emp.id}`)}
            className="card-interactive rounded-xl border border-border p-5 text-left group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <EmployeeAvatar name={emp.name} size="md" />
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{emp.name}</p>
                  <p className="text-[11px] text-muted-foreground">{emp.title}</p>
                </div>
              </div>
              <StateBadge state={emp.state} />
            </div>

            {/* Summary */}
            <p className="text-[12px] text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{emp.summary}</p>

            {/* Latest work */}
            <div className="gradient-mesh rounded-lg px-3.5 py-2.5 mb-4 border border-border/50">
              <p className="section-label mb-1">Latest work</p>
              <p className="text-[12px] text-foreground leading-relaxed">{emp.lastWork}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span><span className="font-semibold text-foreground">{emp.weeklySpend}</span> credits/wk</span>
                <span className="w-px h-3 bg-border" />
                <span>{emp.channels.length} channels</span>
                <span className="w-px h-3 bg-border" />
                <span>{emp.skills.length} skills</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>

            {/* Budget bar */}
            <div className="mt-3">
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${emp.budgetUsedPercent}%`,
                    background: emp.budgetUsedPercent > 75
                      ? `hsl(var(--state-warning))`
                      : `hsl(var(--primary))`,
                  }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">{emp.budgetUsedPercent}% of weekly budget used</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
