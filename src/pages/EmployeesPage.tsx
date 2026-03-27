import { employees } from "@/lib/data";
import { StateBadge } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function EmployeesPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Employees</h1>
        <p className="text-muted-foreground text-sm mt-1">{employees.length} AI employees in your workspace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map((emp) => (
          <button
            key={emp.id}
            onClick={() => navigate(`/preview/employees/${emp.id}`)}
            className="bg-card rounded-xl border border-border p-5 text-left hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-foreground">{emp.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.title}</p>
                </div>
              </div>
              <StateBadge state={emp.state} />
            </div>

            {/* Summary */}
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{emp.summary}</p>

            {/* Latest work */}
            <div className="bg-surface-sunken rounded-lg px-3 py-2 mb-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">Latest work</p>
              <p className="text-xs text-foreground">{emp.lastWork}</p>
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">{emp.weeklySpend}</span> credits/wk
                </span>
                <span className="text-muted-foreground">{emp.channels.length} channels</span>
                <span className="text-muted-foreground">{emp.skills.length} skills</span>
              </div>
            </div>

            {/* Budget bar */}
            <div className="mt-3">
              <Progress value={emp.budgetUsedPercent} className="h-1" />
              <p className="text-[10px] text-muted-foreground mt-1">{emp.budgetUsedPercent}% of weekly budget</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
