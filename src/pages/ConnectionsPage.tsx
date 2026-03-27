import { connections } from "@/lib/data";
import { StateBadge } from "@/components/StateBadge";

export default function ConnectionsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Connections</h1>
        <p className="text-muted-foreground text-sm mt-1">Where your employees receive and deliver work</p>
      </div>

      <div className="space-y-3">
        {connections.map((conn) => (
          <div key={conn.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-foreground">{conn.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{conn.name}</p>
                  <p className="text-xs text-muted-foreground">{conn.type} · {conn.routeLabel}</p>
                </div>
              </div>
              <StateBadge state={conn.state} />
            </div>
            <p className="text-xs text-muted-foreground mb-3">{conn.summary}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex flex-wrap gap-1.5">
                {conn.employees.map((name) => (
                  <span key={name} className="px-2 py-0.5 text-[10px] font-medium bg-muted rounded-full text-foreground">{name}</span>
                ))}
              </div>
              <span>Last delivery: {conn.lastDelivery}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
