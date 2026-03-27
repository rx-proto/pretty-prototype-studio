import { roleTemplates } from "@/lib/data";
import { ArrowLeft, Megaphone, ClipboardList, TrendingUp, Search, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const templateIcons: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  megaphone: { icon: Megaphone, color: "text-orange-600", bg: "bg-orange-50" },
  clipboard: { icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50" },
  trending: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  search: { icon: Search, color: "text-violet-600", bg: "bg-violet-50" },
};

interface Props {
  onSelectTemplate: (id: string) => void;
  onStartBlank: () => void;
  onBack: () => void;
}

export default function TemplateSelect({ onSelectTemplate, onStartBlank, onBack }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-10">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6 opacity-0 animate-fade-in">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight mb-1">Create a new employee</h1>
          <p className="text-[13px] text-muted-foreground">Pick a template to get started, or describe the role from scratch.</p>
        </div>

        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="section-label mb-3">Start from a template</p>
          <div className="grid grid-cols-2 gap-3">
            {roleTemplates.map((tpl) => {
              const entry = templateIcons[tpl.icon] || { icon: Search, color: "text-violet-600", bg: "bg-violet-50" };
              const TplIcon = entry.icon;
              return (
                <button
                  key={tpl.id}
                  onClick={() => onSelectTemplate(tpl.id)}
                  className="text-left rounded-xl border border-border p-4 transition-all duration-200 hover:border-border/80 card-interactive"
                >
                  <div className={`w-8 h-8 rounded-lg ${entry.bg} flex items-center justify-center mb-2.5`}>
                    <TplIcon className={`w-4 h-4 ${entry.color}`} />
                  </div>
                  <h3 className="text-[13px] font-semibold text-foreground mb-0.5">{tpl.name}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{tpl.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <button
            onClick={onStartBlank}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-foreground text-background shadow-sm hover:bg-foreground/90 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Describe from scratch
          </button>
        </div>
      </div>
    </div>
  );
}
