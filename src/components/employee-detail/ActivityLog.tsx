import { useState, useMemo } from "react";
import type { ActivityLogEntry } from "@/lib/employee-detail-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Info, AlertTriangle, XCircle, Clock } from "lucide-react";

type TimeFilter = "5m" | "1h" | "24h" | "7d" | "all";

const timeFilters: { label: string; value: TimeFilter }[] = [
  { label: "5m", value: "5m" },
  { label: "1h", value: "1h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "All", value: "all" },
];

const filterMs: Record<TimeFilter, number> = {
  "5m": 5 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "all": Infinity,
};

const levelConfig = {
  info: { icon: Info, className: "text-muted-foreground", dotClass: "bg-muted-foreground/40" },
  success: { icon: CheckCircle2, className: "text-state-working", dotClass: "bg-state-working" },
  warning: { icon: AlertTriangle, className: "text-state-warning", dotClass: "bg-state-warning" },
  error: { icon: XCircle, className: "text-state-blocked", dotClass: "bg-state-blocked" },
};

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export function ActivityLog({ entries }: { entries: ActivityLogEntry[] }) {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("all");

  const filtered = useMemo(() => {
    const cutoff = Date.now() - filterMs[activeFilter];
    return entries.filter(e => e.timestamp.getTime() >= cutoff);
  }, [entries, activeFilter]);

  return (
    <div className="card-premium rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <h2 className="text-[13px] font-semibold text-foreground">Activity</h2>
        </div>
        <div className="flex gap-0.5 p-0.5 rounded-lg bg-muted">
          {timeFilters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200",
                f.value === activeFilter
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {filtered.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-[12px] text-muted-foreground">No activity in this time range.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((entry, i) => {
              const config = levelConfig[entry.level];
              const Icon = config.icon;
              return (
                <div key={entry.id} className="flex gap-3 px-5 py-3 hover:bg-muted/20 transition-colors duration-150">
                  <div className="flex flex-col items-center pt-0.5">
                    <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", config.className)} />
                    {i < filtered.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[13px] text-foreground leading-snug">{entry.message}</p>
                      <span className="text-[11px] text-muted-foreground/60 flex-shrink-0 tabular-nums">
                        {formatTimeAgo(entry.timestamp)}
                      </span>
                    </div>
                    {entry.detail && (
                      <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">{entry.detail}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
