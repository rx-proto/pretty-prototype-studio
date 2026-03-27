import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "@/lib/data";
import { StateDot, StateBadge, EmployeeAvatar } from "@/components/StateBadge";
import { ArrowLeft, Zap, Wrench, Plug, Plus, Archive, RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const emp = getEmployeeById(id || "");
  const [isArchived, setIsArchived] = useState(emp?.archived ?? false);

  if (!emp) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Employee not found.</p>
      </div>
    );
  }

  const handleToggleArchive = () => {
    setIsArchived(!isArchived);
    toast.success(isArchived ? `${emp.name} has been restored` : `${emp.name} has been archived`);
  };

  return (
    <div className="p-8 max-w-[960px] mx-auto">
      <button onClick={() => navigate("/app/employees")} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6 opacity-0 animate-fade-in">
        <ArrowLeft className="w-3.5 h-3.5" />
        Employees
      </button>

      <div className={`card-premium rounded-xl border border-border p-6 mb-6 relative noise-overlay opacity-0 animate-fade-in-up ${isArchived ? "opacity-70" : ""}`} style={{ animationDelay: "0.1s" }}>
        <div className="relative flex items-start gap-4">
          <EmployeeAvatar name={emp.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-xl font-bold text-foreground tracking-tight">{emp.name}</h1>
              {isArchived ? (
                <span className="text-[11px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full font-medium">Archived</span>
              ) : (
                <>
                  <StateDot state={emp.state} />
                  {emp.lastRunFailed && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-state-warning bg-state-warning/8 px-2 py-0.5 rounded-full font-medium ring-1 ring-inset ring-state-warning/20">
                      <AlertTriangle className="w-3 h-3" />
                      Last run failed
                    </span>
                  )}
                </>
              )}
            </div>
            <p className="text-[13px] text-muted-foreground">{emp.title}</p>
            <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed max-w-lg">{emp.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5 animate-stagger">
          <div className="card-premium rounded-xl border border-border p-5">
            <h2 className="text-[13px] font-semibold text-foreground mb-2">What they're doing now</h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{emp.statusMessage}</p>
          </div>
          <div className="card-premium rounded-xl border border-border p-5">
            <h2 className="text-[13px] font-semibold text-foreground mb-2">Recent work</h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{emp.lastWork}</p>
          </div>
        </div>

        <div className="space-y-4 animate-stagger">
          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                <h3 className="section-label">Skills</h3>
              </div>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {emp.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 text-[11px] font-medium bg-primary/[0.06] text-primary rounded-lg ring-1 ring-inset ring-primary/10">{s}</span>
              ))}
            </div>
          </div>

          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
                <h3 className="section-label">Tools</h3>
              </div>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {emp.tools.map((t) => (
                <span key={t} className="px-2.5 py-1 text-[11px] font-medium bg-muted rounded-lg text-foreground">{t}</span>
              ))}
            </div>
          </div>

          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Plug className="w-3.5 h-3.5 text-muted-foreground" />
                <h3 className="section-label">Connectors</h3>
              </div>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {emp.connectors.map((c) => (
                <span key={c} className="px-2.5 py-1 text-[11px] font-medium bg-muted rounded-lg text-foreground">{c}</span>
              ))}
            </div>
          </div>

          {/* Archive / Restore action */}
          <button
            onClick={handleToggleArchive}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 border ${
              isArchived
                ? "border-border text-foreground hover:bg-muted"
                : "border-transparent text-muted-foreground/60 hover:text-destructive hover:bg-destructive/5"
            }`}
          >
            {isArchived ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                Restore employee
              </>
            ) : (
              <>
                <Archive className="w-3.5 h-3.5" />
                Archive employee
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
