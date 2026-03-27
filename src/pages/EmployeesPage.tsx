import { useState } from "react";
import { employees } from "@/lib/data";
import type { EmployeeState } from "@/lib/data";
import { StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const filters: { label: string; filter: (s: EmployeeState) => boolean }[] = [
  { label: "All", filter: () => true },
  { label: "Working", filter: (s) => s === "working" },
  { label: "Needs attention", filter: (s) => s === "warning" || s === "blocked" },
  { label: "Idle", filter: (s) => s === "idle" || s === "ready" },
];

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);
  const filtered = employees.filter(e => filters[activeFilter].filter(e.state));

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Employees</h1>
        <p className="text-muted-foreground text-[13px] mt-1">{employees.length} AI employees in your workspace</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted w-fit">
        {filters.map((f, i) => (
          <button
            key={f.label}
            onClick={() => setActiveFilter(i)}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              i === activeFilter ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Employee cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((emp) => (
          <button
            key={emp.id}
            onClick={() => navigate(`/preview/employees/${emp.id}`)}
            className="card-interactive rounded-xl border border-border p-5 text-left group"
          >
            <div className="flex items-center gap-3 mb-3">
              <EmployeeAvatar name={emp.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-semibold text-foreground">{emp.name}</p>
                  <StateDot state={emp.state} />
                </div>
                <p className="text-[12px] text-muted-foreground">{emp.title}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{emp.statusMessage}</p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-12">No employees match this filter.</p>
      )}
    </div>
  );
}
