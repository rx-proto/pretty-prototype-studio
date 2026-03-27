import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Plug } from "lucide-react";
import type { EmployeeDraft } from "./types";
import mayaAvatar from "@/assets/avatars/maya.jpg";

interface Props {
  draft: EmployeeDraft;
}

export default function ActivatedView({ draft }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-state-working/[0.04] blur-[100px]" />
      </div>
      <div className="max-w-md text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6 opacity-0 animate-scale-in">
          <img src={mayaAvatar} alt={draft.name} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-[24px] font-bold text-foreground tracking-tight mb-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          {draft.name} is now active
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          She's getting familiar with your workspace. You'll see her first work results soon.
        </p>
        <div className="text-[12px] text-muted-foreground mb-8 space-y-1 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <p>Channel: {draft.channel} · Intelligence: {draft.intelligence}</p>
          <p>Budget: ${draft.budget.daily}/day · ${draft.budget.weekly}/week</p>
          <p>Memory initialized — <span className="font-mono text-[11px]">MEMORY.md</span> created</p>
        </div>
        <div className="flex flex-col gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={() => navigate("/app/employees/maya-competitive-intel")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-foreground text-background shadow-sm hover:bg-foreground/90 transition-all"
          >
            Go see {draft.name} <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-foreground border border-border hover:bg-muted/40 transition-colors duration-200">
            <Plug className="w-4 h-4" />
            Connect Slack (optional)
          </button>
        </div>
      </div>
    </div>
  );
}
