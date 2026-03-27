import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Check, ArrowRight, Plug, Search, Megaphone, ClipboardList, TrendingUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { roleTemplates } from "@/lib/data";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

type Step = "describe" | "review" | "activated";

const templateIcons: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  clipboard: ClipboardList,
  trending: TrendingUp,
  search: Search,
};

const mockDraft = {
  name: "Maya",
  title: "Competitive intelligence lead",
  summary: "Monitors competitor pricing, feature releases, and market positioning across your tracked companies. Delivers weekly briefs and real-time alerts when something changes.",
  skills: ["Market Watch", "Research Briefs"],
  tools: ["Web Search", "PDF Reader"],
};

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("describe");
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!description && !selectedTemplate) {
      toast.error("Describe what you need or pick a template");
      return;
    }
    setStep("review");
  };

  const handleActivate = () => {
    setStep("activated");
    toast.success("Employee created and activated!");
  };

  if (step === "activated") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-state-working/[0.04] blur-[100px]" />
        </div>
        <div className="max-w-md text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-state-working/[0.08] flex items-center justify-center mx-auto mb-6 opacity-0 animate-scale-in">
            <Check className="w-8 h-8 text-state-working" />
          </div>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight mb-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            {mockDraft.name} is now working
          </h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            She's getting familiar with your workspace. You'll see her first work results soon.
          </p>
          <div className="flex flex-col gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <button
              onClick={() => navigate("/app/employees/maya-competitive-intel")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all"
            >
              Go see {mockDraft.name} <ArrowRight className="w-4 h-4" />
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

  if (step === "review") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-8 py-10">
          <button onClick={() => setStep("describe")} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6 opacity-0 animate-fade-in">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>

          <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-[24px] font-bold text-foreground tracking-tight mb-1">Review your new employee</h1>
            <p className="text-[13px] text-muted-foreground">Here's what we've put together. Adjust anything before activating.</p>
          </div>

          <div className="card-premium rounded-xl border border-border p-6 space-y-5 mb-6 relative noise-overlay opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative space-y-5">
              <div>
                <p className="section-label mb-1">Name</p>
                <p className="text-[17px] font-semibold text-foreground">{mockDraft.name}</p>
              </div>
              <div>
                <p className="section-label mb-1">Role</p>
                <p className="text-[14px] text-foreground">{mockDraft.title}</p>
              </div>
              <div>
                <p className="section-label mb-1">What they'll do</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{mockDraft.summary}</p>
              </div>
              <div>
                <p className="section-label mb-2">Auto-equipped skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {mockDraft.skills.map(s => (
                    <span key={s} className="px-2.5 py-1 text-[11px] font-medium bg-primary/[0.06] text-primary rounded-lg ring-1 ring-inset ring-primary/10">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="section-label mb-2">Auto-equipped tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {mockDraft.tools.map(t => (
                    <span key={t} className="px-2.5 py-1 text-[11px] font-medium bg-muted rounded-lg text-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <button onClick={() => setStep("describe")} className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-foreground border border-border hover:bg-muted/40 transition-colors duration-200">
              Let me adjust
            </button>
            <button onClick={handleActivate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all">
              Looks good, activate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6 opacity-0 animate-fade-in">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight mb-1">Create a new employee</h1>
          <p className="text-[13px] text-muted-foreground">Pick a template or describe what you need in your own words.</p>
        </div>

        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="section-label mb-3">Start from a template</p>
          <div className="grid grid-cols-2 gap-3">
            {roleTemplates.map((tpl) => {
              const Icon = templateIcons[tpl.icon] || Search;
              return (
                <button
                  key={tpl.id}
                  onClick={() => { setSelectedTemplate(tpl.id); setDescription(""); }}
                  className={`text-left rounded-xl border p-4 transition-all duration-200 group ${
                    selectedTemplate === tpl.id
                      ? "border-primary/30 bg-primary/[0.03] ring-1 ring-primary/15 shadow-sm"
                      : "border-border hover:border-border/80 card-interactive"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center mb-2.5 group-hover:bg-primary/[0.08] transition-colors duration-200">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
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
          <span className="text-[11px] text-muted-foreground">or describe what you need</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <Textarea
            value={description}
            onChange={e => { setDescription(e.target.value); setSelectedTemplate(null); }}
            placeholder="e.g. I need someone to monitor our competitors' pricing pages and alert me when anything changes..."
            className="text-[13px] min-h-[120px] resize-none"
          />
        </div>

        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all"
          >
            <Send className="w-4 h-4" />
            Generate employee
          </button>
        </div>
      </div>
    </div>
  );
}
