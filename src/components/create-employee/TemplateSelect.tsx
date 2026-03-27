import { useState } from "react";
import { roleTemplates } from "@/lib/data";
import { ArrowLeft, ArrowUp, Megaphone, ClipboardList, TrendingUp, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const templateIcons: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  megaphone: { icon: Megaphone, color: "text-orange-600", bg: "bg-orange-50" },
  clipboard: { icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50" },
  trending: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  search: { icon: Search, color: "text-violet-600", bg: "bg-violet-50" },
};

interface Props {
  onSelectTemplate: (id: string) => void;
  onStartWithMessage: (text: string) => void;
  onBack: () => void;
}

export default function TemplateSelect({ onSelectTemplate, onStartWithMessage, onBack }: Props) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onStartWithMessage(input.trim());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-10">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6 opacity-0 animate-fade-in">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight mb-1">Create a new employee</h1>
          <p className="text-[13px] text-muted-foreground">Pick a template or describe the role you need.</p>
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

        <div className="flex items-center gap-3 mb-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-muted-foreground">or describe from scratch</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="e.g. I need someone to monitor our competitors' pricing pages and alert me when anything changes…"
              rows={2}
              className="w-full bg-muted/60 border border-border rounded-2xl pl-4 pr-12 py-3 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/20 focus:bg-muted/80 transition-all resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2.5 bottom-2.5 w-8 h-8 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors disabled:opacity-30"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
