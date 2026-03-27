import { cn } from "@/lib/utils";
import type { EmployeeState } from "@/lib/data";

const stateConfig: Record<EmployeeState, { label: string; dotClass: string; bgClass: string; textClass: string; ringClass: string }> = {
  working: { label: "Working", dotClass: "bg-state-working", bgClass: "bg-state-working/8", textClass: "text-state-working", ringClass: "ring-state-working/20" },
  warning: { label: "Warning", dotClass: "bg-state-warning", bgClass: "bg-state-warning/8", textClass: "text-state-warning", ringClass: "ring-state-warning/20" },
  blocked: { label: "Blocked", dotClass: "bg-state-blocked", bgClass: "bg-state-blocked/8", textClass: "text-state-blocked", ringClass: "ring-state-blocked/20" },
  quiet: { label: "Quiet", dotClass: "bg-state-quiet", bgClass: "bg-state-quiet/8", textClass: "text-state-quiet", ringClass: "ring-state-quiet/20" },
  ready: { label: "Ready", dotClass: "bg-state-ready", bgClass: "bg-state-ready/8", textClass: "text-state-ready", ringClass: "ring-state-ready/20" },
  accent: { label: "Review", dotClass: "bg-state-accent", bgClass: "bg-state-accent/8", textClass: "text-state-accent", ringClass: "ring-state-accent/20" },
};

export function StateBadge({ state, className }: { state: EmployeeState; className?: string }) {
  const config = stateConfig[state];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ring-1 ring-inset",
      config.bgClass, config.textClass, config.ringClass, className
    )}>
      <span className={cn("w-[5px] h-[5px] rounded-full", config.dotClass, state === "working" && "animate-pulse-dot")} />
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

const avatarColors: Record<string, string> = {
  M: "from-primary to-state-accent",
  S: "from-state-warning to-state-blocked",
  N: "from-state-working to-state-ready",
  I: "from-state-blocked to-state-warning",
  J: "from-state-quiet to-primary",
  L: "from-state-ready to-state-working",
};

export function EmployeeAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  const gradient = avatarColors[name[0]] || "from-primary to-state-accent";
  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 font-semibold text-primary-foreground shadow-sm",
      gradient, sizeClasses[size]
    )}>
      {name[0]}
    </div>
  );
}
