import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, getActivitiesByEmployee, getSkillsByEmployee, getConnectionsByEmployee } from "@/lib/data";
import { StateBadge, StateDot } from "@/components/StateBadge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Zap, Link2, CreditCard, Target } from "lucide-react";

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
    <div className="p-8 max-w-5xl mx-auto">
      {/* Back */}
      <button onClick={() => navigate("/preview/employees")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-3.5 h-3.5" />
        Employees
      </button>

      {/* Hero */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-foreground">{emp.name[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{emp.team}</span>
              <StateBadge state={emp.state} />
            </div>
            <h1 className="text-xl font-bold text-foreground">{emp.name}</h1>
            <p className="text-sm text-muted-foreground">{emp.title}</p>
            <p className="text-sm text-muted-foreground mt-2">{emp.summary}</p>

            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
              <span><span className="font-semibold text-foreground">{emp.weeklySpend}</span> credits/wk</span>
              <span>{emp.skills.length} skills</span>
              <span>{emp.channels.length} channels</span>
              <span>Owner: {emp.owner}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main column */}
        <div className="col-span-2 space-y-6">
          {/* Current focus */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Current focus</h2>
            </div>
            <p className="text-sm text-muted-foreground">{emp.currentFocus}</p>
          </div>

          {/* Latest work */}
          {activities.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-5">
              <h2 className="text-sm font-semibold text-foreground mb-1">Latest work</h2>
              <p className="text-sm font-medium text-foreground">{activities[0].headline}</p>
              <p className="text-xs text-muted-foreground mt-1">{activities[0].summary}</p>
            </div>
          )}

          {/* Activity stream */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Activity</h2>
            <div className="space-y-2">
              {activities.map((act) => (
                <div key={act.id} className="bg-card rounded-xl border border-border px-5 py-4 flex items-start gap-3">
                  <StateDot state={act.state} className="mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{act.headline}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{act.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                      <span>{act.timeLabel}</span>
                      <span>·</span>
                      <span>{act.cost} credits</span>
                      <span>·</span>
                      <span>{act.channel}</span>
                    </div>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <div className="bg-card rounded-xl border border-border px-5 py-4">
                  <p className="text-xs text-muted-foreground">No recent activity. Last work: {emp.lastWork}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-4">
          {/* Budget */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Budget</h3>
            </div>
            <Progress value={emp.budgetUsedPercent} className="h-1.5 mb-2" />
            <p className="text-xs text-muted-foreground">{emp.budgetUsedPercent}% used · {emp.weeklySpend} / {emp.weeklyBudget} credits</p>
            <p className="text-xs text-muted-foreground mt-1">Owner: {emp.owner}</p>
          </div>

          {/* Routes */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Routes</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Default: {emp.defaultRoute}</p>
            <div className="flex flex-wrap gap-1.5">
              {emp.channels.map((ch) => (
                <span key={ch} className="px-2 py-0.5 text-[10px] font-medium bg-muted rounded-full text-foreground">{ch}</span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Skills</h3>
            </div>
            <div className="space-y-2">
              {relatedSkills.map((sk) => (
                <div key={sk.id} className="flex items-center gap-2">
                  <StateDot state={sk.state} />
                  <span className="text-xs text-foreground">{sk.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connections */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Connections</h3>
            </div>
            <div className="space-y-2">
              {relatedConnections.map((conn) => (
                <div key={conn.id} className="flex items-center gap-2">
                  <StateDot state={conn.state} />
                  <span className="text-xs text-foreground">{conn.name}</span>
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
