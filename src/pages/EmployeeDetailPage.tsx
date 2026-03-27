import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "@/lib/data";
import { StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { ArrowLeft, Zap, Wrench, Plug, Plus } from "lucide-react";

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const emp = getEmployeeById(id || "");

  if (!emp) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[960px] mx-auto">
      {/* Back */}
      <button onClick={() => navigate("/preview/employees")} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6 opacity-0 animate-fade-in">
        <ArrowLeft className="w-3.5 h-3.5" />
        Employees
      </button>

      {/* Hero */}
      <div className="card-premium rounded-xl border border-border p-6 mb-6 relative noise-overlay opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative flex items-start gap-4">
          <EmployeeAvatar name={emp.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-xl font-bold text-foreground tracking-tight">{emp.name}</h1>
              <StateDot state={emp.state} />
            </div>
            <p className="text-[13px] text-muted-foreground">{emp.title}</p>
            <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed max-w-lg">{emp.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Main column */}
        <div className="col-span-2 space-y-5 animate-stagger">
          {/* Current status */}
          <div className="card-premium rounded-xl border border-border p-5">
            <h2 className="text-[13px] font-semibold text-foreground mb-2">What they're doing now</h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{emp.statusMessage}</p>
          </div>

          {/* Recent work */}
          <div className="card-premium rounded-xl border border-border p-5">
            <h2 className="text-[13px] font-semibold text-foreground mb-2">Recent work</h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{emp.lastWork}</p>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-4 animate-stagger">
          {/* Skills */}
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

          {/* Tools */}
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

          {/* Connectors */}
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
        </div>
      </div>
    </div>
  );
}
