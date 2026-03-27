import { useState } from "react";
import { employees } from "@/lib/data";
import { StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { ChevronRight, AlertTriangle, Archive } from "lucide-react";

const filters = [
  { label: "All", filter: (archived: boolean) => !archived },
  { label: "Running", filter: (archived: boolean, state: string) => !archived && state === "running" },
  { label: "Sleeping", filter: (archived: boolean, state: string) => !archived && state === "sleeping" },
];

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);
  const [showArchived, setShowArchived] = useState(false);

  const filtered = showArchived
    ? employees.filter(e => e.archived)
    : employees.filter(e => filters[activeFilter].filter(e.archived, e.state));

  const archivedCount = employees.filter(e => e.archived).length;
  const activeEmployees = employees.filter(e => !e.archived);
  const runningCount = activeEmployees.filter(e => e.state === "running").length;
  const sleepingCount = activeEmployees.filter(e => e.state === "sleeping").length;

  const filterLabels = [
    `All (${activeEmployees.length})`,
    `Running (${runningCount})`,
    `Sleeping (${sleepingCount})`,
  ];

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Employees</h1>
        <p className="text-muted-foreground text-[13px] mt-1">{activeEmployees.length} AI employees in your workspace</p>
      </div>

      <div className="flex items-center justify-between opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex gap-1 p-1 rounded-xl bg-muted w-fit">
          {filters.map((f, i) => (
            <button
              key={f.label}
              onClick={() => { setActiveFilter(i); setShowArchived(false); }}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                !showArchived && i === activeFilter ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {archivedCount > 0 && (
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
              showArchived ? "bg-muted text-foreground" : "text-muted-foreground/60 hover:text-muted-foreground"
            }`}
          >
            <Archive className="w-3 h-3" />
            Archived ({archivedCount})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-stagger">
        {filtered.map((emp) => (
          <button
            key={emp.id}
            onClick={() => navigate(`/app/employees/${emp.id}`)}
            className={`card-interactive rounded-xl border border-border p-5 text-left group ${emp.archived ? "opacity-60" : ""}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <EmployeeAvatar name={emp.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-semibold text-foreground">{emp.name}</p>
                  {emp.archived ? (
                    <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Archived</span>
                  ) : (
                    <StateDot state={emp.state} />
                  )}
                  {emp.lastRunFailed && !emp.archived && (
                    <AlertTriangle className="w-3 h-3 text-state-warning" />
                  )}
                </div>
                <p className="text-[12px] text-muted-foreground">{emp.title}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{emp.statusMessage}</p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-12">
          {showArchived ? "No archived employees." : "No employees match this filter."}
        </p>
      )}
    </div>
  );
}
