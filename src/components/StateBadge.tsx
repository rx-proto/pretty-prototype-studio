import { cn } from "@/lib/utils";
import type { EmployeeState } from "@/lib/data";

const stateConfig: Record<EmployeeState, { label: string; dotClass: string; bgClass: string; textClass: string }> = {
  working: { label: "Working", dotClass: "bg-state-working", bgClass: "bg-state-working/10", textClass: "text-state-working" },
  warning: { label: "Warning", dotClass: "bg-state-warning", bgClass: "bg-state-warning/10", textClass: "text-state-warning" },
  blocked: { label: "Blocked", dotClass: "bg-state-blocked", bgClass: "bg-state-blocked/10", textClass: "text-state-blocked" },
  quiet: { label: "Quiet", dotClass: "bg-state-quiet", bgClass: "bg-state-quiet/10", textClass: "text-state-quiet" },
  ready: { label: "Ready", dotClass: "bg-state-ready", bgClass: "bg-state-ready/10", textClass: "text-state-ready" },
  accent: { label: "Review", dotClass: "bg-state-accent", bgClass: "bg-state-accent/10", textClass: "text-state-accent" },
};

export function StateBadge({ state, className }: { state: EmployeeState; className?: string }) {
  const config = stateConfig[state];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium", config.bgClass, config.textClass, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass, state === "working" && "animate-pulse-dot")} />
      {config.label}
    </span>
  );
}

export function StateDot({ state, className }: { state: EmployeeState; className?: string }) {
  const config = stateConfig[state];
  return (
    <span className={cn("w-2 h-2 rounded-full", config.dotClass, state === "working" && "animate-pulse-dot", className)} />
  );
}
