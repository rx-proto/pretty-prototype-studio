import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Send, Check, ArrowRight, Plug } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { roleTemplates } from "@/lib/data";
import { toast } from "sonner";

type Step = "describe" | "review" | "activated";

// Simulated generated draft
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
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-state-working/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-state-working" />
          </div>
          <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-2">{mockDraft.name} is now working</h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-8">
            She's getting familiar with your workspace. You'll see her first work results soon.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/preview/employees/maya-competitive-intel")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all"
            >
              Go see {mockDraft.name} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-foreground border border-border hover:bg-muted/50 transition-colors"
            >
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
          <button onClick={() => setStep("describe")} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>

          <div className="mb-6">
            <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-1">Review your new employee</h1>
            <p className="text-[13px] text-muted-foreground">Here's what we've put together. You can adjust anything before activating.</p>
          </div>

          <div className="card-premium rounded-xl border border-border p-6 space-y-5 mb-6">
            <div>
              <p className="section-label mb-1">Name</p>
              <p className="text-[16px] font-semibold text-foreground">{mockDraft.name}</p>
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
                  <span key={s} className="px-2.5 py-1 text-[11px] font-medium bg-primary/6 text-primary rounded-lg ring-1 ring-inset ring-primary/10">{s}</span>
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

          <div className="flex items-center gap-3">
            <button onClick={() => setStep("describe")} className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-foreground border border-border hover:bg-muted/50 transition-colors">
              Let me adjust
            </button>
            <button onClick={handleActivate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all">
              <Sparkles className="w-4 h-4" />
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
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-1">Create a new employee</h1>
          <p className="text-[13px] text-muted-foreground">Pick a template or describe what you need in your own words.</p>
        </div>

        {/* Templates */}
        <div className="mb-8">
          <p className="section-label mb-3">Start from a template</p>
          <div className="grid grid-cols-2 gap-3">
            {roleTemplates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => { setSelectedTemplate(tpl.id); setDescription(""); }}
                className={`text-left rounded-xl border p-4 transition-all ${
                  selectedTemplate === tpl.id
                    ? "border-primary/40 bg-primary/4 ring-1 ring-primary/20"
                    : "border-border hover:border-border/80 card-interactive"
                }`}
              >
                <div className="text-xl mb-2">{tpl.icon}</div>
                <h3 className="text-[13px] font-semibold text-foreground mb-0.5">{tpl.name}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{tpl.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-muted-foreground">or describe what you need</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Free-form description */}
        <div className="mb-6">
          <Textarea
            value={description}
            onChange={e => { setDescription(e.target.value); setSelectedTemplate(null); }}
            placeholder="e.g. I need someone to monitor our competitors' pricing pages and alert me when anything changes..."
            className="text-[13px] min-h-[120px] resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all"
        >
          <Send className="w-4 h-4" />
          Generate employee
        </button>
      </div>
    </div>
  );
}
