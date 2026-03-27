import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, getActivitiesByEmployee, getSkillsByEmployee, getConnectionsByEmployee } from "@/lib/data";
import { StateBadge, StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { ArrowLeft, Zap, Link2, CreditCard, Target, ChevronRight } from "lucide-react";

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

  const activities = getActivitiesByEmployee(emp.id);
  const relatedSkills = getSkillsByEmployee(emp.name);
  const relatedConnections = getConnectionsByEmployee(emp.name);

  return (
    <div className="p-8 max-w-[960px] mx-auto">
      {/* Back */}
      <button onClick={() => navigate("/preview/employees")} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-3.5 h-3.5" />
        Employees
      </button>

      {/* Hero */}
      <div className="card-premium rounded-xl border border-border p-6 mb-6">
        <div className="flex items-start gap-4">
          <EmployeeAvatar name={emp.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="section-label">{emp.team}</span>
              <StateBadge state={emp.state} />
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">{emp.name}</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">{emp.title}</p>
            <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed max-w-lg">{emp.summary}</p>

            {/* Quick stats */}
            <div className="flex items-center gap-4 mt-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> <span className="font-semibold text-foreground">{emp.weeklySpend}</span> credits/wk</span>
              <span className="w-px h-3 bg-border" />
              <span>{emp.skills.length} skills</span>
              <span className="w-px h-3 bg-border" />
              <span>{emp.channels.length} channels</span>
              <span className="w-px h-3 bg-border" />
              <span>Owner: {emp.owner}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Main column */}
        <div className="col-span-2 space-y-5">
          {/* Current focus */}
          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-lg bg-primary/8 flex items-center justify-center">
                <Target className="w-3.5 h-3.5 text-primary" />
              </div>
              <h2 className="text-[13px] font-semibold text-foreground">Current focus</h2>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{emp.currentFocus}</p>
          </div>

          {/* Latest work */}
          {activities.length > 0 && (
            <div className="card-premium rounded-xl border border-border p-5">
              <p className="section-label mb-2">Latest work</p>
              <p className="text-[13px] font-medium text-foreground">{activities[0].headline}</p>
              <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{activities[0].summary}</p>
              <div className="flex items-center gap-2.5 mt-3 text-[10px] text-muted-foreground">
                <span>{activities[0].timeLabel}</span>
                <span>·</span>
                <span>{activities[0].cost} credits</span>
              </div>
            </div>
          )}

          {/* Activity stream */}
          <div>
            <h2 className="text-[13px] font-semibold text-foreground mb-3">Activity</h2>
            <div className="space-y-2">
              {activities.map((act) => (
                <div key={act.id} className="card-premium rounded-xl border border-border px-5 py-4 flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <StateDot state={act.state} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground">{act.headline}</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">{act.summary}</p>
                    <div className="flex items-center gap-2.5 mt-2 text-[10px] text-muted-foreground">
                      <span>{act.timeLabel}</span>
                      <span className="w-px h-2.5 bg-border" />
                      <span>{act.cost} credits</span>
                      <span className="w-px h-2.5 bg-border" />
                      <span>{act.channel}</span>
                    </div>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <div className="card-premium rounded-xl border border-border px-5 py-4">
                  <p className="text-[12px] text-muted-foreground">No recent activity. Last work: {emp.lastWork}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-4">
          {/* Budget */}
          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="section-label">Budget</h3>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${emp.budgetUsedPercent}%`,
                  background: emp.budgetUsedPercent > 75 ? `hsl(var(--state-warning))` : `hsl(var(--primary))`,
                }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">{emp.budgetUsedPercent}% used · {emp.weeklySpend} / {emp.weeklyBudget}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Owner: {emp.owner}</p>
          </div>

          {/* Routes */}
          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="section-label">Routes</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2.5">Default: {emp.defaultRoute}</p>
            <div className="flex flex-wrap gap-1.5">
              {emp.channels.map((ch) => (
                <span key={ch} className="px-2 py-0.5 text-[10px] font-medium bg-muted rounded-full text-foreground">{ch}</span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="section-label">Skills</h3>
            </div>
            <div className="space-y-2">
              {relatedSkills.map((sk) => (
                <div key={sk.id} className="flex items-center gap-2">
                  <StateDot state={sk.state} />
                  <span className="text-[12px] text-foreground">{sk.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connections */}
          <div className="card-premium rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="section-label">Connections</h3>
            </div>
            <div className="space-y-2">
              {relatedConnections.map((conn) => (
                <div key={conn.id} className="flex items-center gap-2">
                  <StateDot state={conn.state} />
                  <span className="text-[12px] text-foreground">{conn.name}</span>
                  <span className="text-[10px] text-muted-foreground">· {conn.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
