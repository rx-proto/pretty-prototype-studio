import { useState, useMemo } from "react";
import { format } from "date-fns";
import type { ActivityLogEntry } from "@/lib/employee-detail-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Info, AlertTriangle, XCircle, Clock, Search, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TimeFilter = "5m" | "1h" | "24h" | "7d" | "all" | "custom";

const timeFilters: { label: string; value: TimeFilter }[] = [
  { label: "5m", value: "5m" },
  { label: "1h", value: "1h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "All", value: "all" },
];

const filterMs: Record<string, number> = {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [customDate, setCustomDate] = useState<Date | undefined>();

  const filtered = useMemo(() => {
    let result = entries;

    // Time filter
    if (activeFilter === "custom" && customDate) {
      const dayStart = new Date(customDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(customDate);
      dayEnd.setHours(23, 59, 59, 999);
      result = result.filter(e => e.timestamp >= dayStart && e.timestamp <= dayEnd);
    } else if (activeFilter !== "custom") {
      const cutoff = Date.now() - filterMs[activeFilter];
      result = result.filter(e => e.timestamp.getTime() >= cutoff);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.message.toLowerCase().includes(q) ||
        (e.detail && e.detail.toLowerCase().includes(q))
      );
    }

    return result;
  }, [entries, activeFilter, searchQuery, customDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setCustomDate(date);
    if (date) setActiveFilter("custom");
  };

  return (
    <div className="card-premium rounded-xl border border-border overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <h2 className="text-[13px] font-semibold text-foreground">Activity</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 p-0.5 rounded-lg bg-muted">
            {timeFilters.map(f => (
              <button
                key={f.value}
                onClick={() => { setActiveFilter(f.value); setCustomDate(undefined); }}
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

          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border",
                  activeFilter === "custom"
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <CalendarIcon className="w-3 h-3" />
                {activeFilter === "custom" && customDate
                  ? format(customDate, "MMM d")
                  : "Date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={customDate}
                onSelect={handleDateSelect}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-5 py-2.5 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search activity..."
            className="pl-8 h-8 text-[12px] border-0 bg-muted/40 focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-[12px] text-muted-foreground">
              {searchQuery ? "No matching activity." : "No activity in this time range."}
            </p>
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
