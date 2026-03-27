import { cn } from "@/lib/utils";
import type { EmployeeState, AttentionTone } from "@/lib/data";

import mayaAvatar from "@/assets/avatars/maya.jpg";
import soraAvatar from "@/assets/avatars/sora.jpg";
import nikoAvatar from "@/assets/avatars/niko.jpg";
import irisAvatar from "@/assets/avatars/iris.jpg";
import junAvatar from "@/assets/avatars/jun.jpg";
import linaAvatar from "@/assets/avatars/lina.jpg";
import alexAvatar from "@/assets/avatars/alex.jpg";
import kaiAvatar from "@/assets/avatars/kai.jpg";
import veraAvatar from "@/assets/avatars/vera.jpg";
import reoAvatar from "@/assets/avatars/reo.jpg";
import sarahAvatar from "@/assets/avatars/sarah-chen.jpg";

type DotState = EmployeeState | AttentionTone;

const stateConfig: Record<DotState, { label: string; dotClass: string; bgClass: string; textClass: string; ringClass: string }> = {
  running: { label: "Running", dotClass: "bg-state-working", bgClass: "bg-state-working/8", textClass: "text-state-working", ringClass: "ring-state-working/20" },
  sleeping: { label: "Sleeping", dotClass: "bg-state-quiet", bgClass: "bg-state-quiet/8", textClass: "text-state-quiet", ringClass: "ring-state-quiet/20" },
  accent: { label: "Review", dotClass: "bg-state-accent", bgClass: "bg-state-accent/8", textClass: "text-state-accent", ringClass: "ring-state-accent/20" },
  warning: { label: "Warning", dotClass: "bg-state-warning", bgClass: "bg-state-warning/8", textClass: "text-state-warning", ringClass: "ring-state-warning/20" },
  blocked: { label: "Blocked", dotClass: "bg-state-blocked", bgClass: "bg-state-blocked/8", textClass: "text-state-blocked", ringClass: "ring-state-blocked/20" },
};

export function StateBadge({ state, className }: { state: DotState; className?: string }) {
  const config = stateConfig[state];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ring-1 ring-inset",
      config.bgClass, config.textClass, config.ringClass, className
    )}>
      <span className={cn("w-[5px] h-[5px] rounded-full", config.dotClass, state === "running" && "animate-pulse-dot")} />
      {config.label}
    </span>
  );
}

export function StateDot({ state, className }: { state: DotState; className?: string }) {
  const config = stateConfig[state];
  return (
    <span className={cn("w-2 h-2 rounded-full", config.dotClass, state === "running" && "animate-pulse-dot", className)} />
  );
}

const avatarMap: Record<string, string> = {
  Maya: mayaAvatar,
  Sora: soraAvatar,
  Niko: nikoAvatar,
  Iris: irisAvatar,
  Jun: junAvatar,
  Lina: linaAvatar,
  Alex: alexAvatar,
  Kai: kaiAvatar,
  Vera: veraAvatar,
  Reo: reoAvatar,
  "Sarah Chen": sarahAvatar,
};

export { avatarMap };

export function EmployeeAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };
  const src = avatarMap[name];
  return (
    <img
      src={src || mayaAvatar}
      alt={name}
      loading="lazy"
      className={cn("rounded-full object-cover flex-shrink-0 shadow-sm", sizeClasses[size])}
    />
  );
}
