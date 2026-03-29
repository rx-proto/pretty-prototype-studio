import { cn } from "@/lib/utils";
import { Plug, ChevronRight, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import type { ConnectionReadiness, ReadinessState } from "@/lib/employee-detail-data";
import { useNavigate } from "react-router-dom";

const stateConfig: Record<ReadinessState, { label: string; className: string; icon: React.ElementType }> = {
  ready: { label: "Ready", className: "bg-state-working/10 text-state-working", icon: CheckCircle2 },
  needs_verify: { label: "Needs verify", className: "bg-amber-500/10 text-amber-600", icon: AlertTriangle },
  needs_config: { label: "Needs config", className: "bg-amber-500/10 text-amber-600", icon: Clock },
  not_available: { label: "Not connected", className: "bg-muted text-muted-foreground", icon: XCircle },
};

interface ConnectorsPanelProps {
  readiness: ConnectionReadiness[];
  employeeName: string;
}

export function ConnectorsPanel({ readiness, employeeName }: ConnectorsPanelProps) {
  const navigate = useNavigate();

  const readyCount = readiness.filter(r => r.state === "ready").length;
  const totalRequired = readiness.filter(r => r.required).length;

  return (
    <div className="card-premium rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Plug className="w-3.5 h-3.5 text-muted-foreground" />
          <h3 className="section-label">Connections</h3>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
          {readyCount}/{totalRequired} ready
        </span>
      </div>
      <div className="space-y-1">
        {readiness.map((item) => {
          const config = stateConfig[item.state];
          const StateIcon = config.icon;
          return (
            <button
              key={item.type}
              onClick={() => navigate("/app/connectors")}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-muted/40 transition-colors duration-150 group"
            >
              <StateIcon className={cn("w-3.5 h-3.5 flex-shrink-0", config.className.split(" ").pop())} />
              <div className="flex-1 min-w-0">
                <span className="text-[12px] font-medium text-foreground capitalize">{item.type}</span>
                {item.connectionName && (
                  <span className="text-[10px] text-muted-foreground ml-1.5">{item.connectionName}</span>
                )}
              </div>
              <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", config.className)}>
                {config.label}
              </span>
              <ChevronRight className="w-3 h-3 text-muted-foreground/20 group-hover:text-muted-foreground transition-colors" />
            </button>
          );
        })}
        {readiness.length === 0 && (
          <p className="text-[12px] text-muted-foreground py-1">No connections required</p>
        )}
      </div>
      {readiness.some(r => r.state === "not_available") && (
        <button
          onClick={() => navigate("/app/connectors")}
          className="mt-3 w-full text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Set up missing connections →
        </button>
      )}
    </div>
  );
}
