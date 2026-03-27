import { Zap, Wrench, Radio, Brain, DollarSign, Sparkles } from "lucide-react";
import type { EmployeeDraft } from "./types";

interface Props {
  draft: Partial<EmployeeDraft>;
  onConfirm: () => void;
  showConfirm: boolean;
}

export default function EmployeePreviewPanel({ draft, onConfirm, showConfirm }: Props) {
  const hasMeaningfulDraft = draft.name || draft.jobDescription;

  return (
    <div className="h-full flex flex-col bg-surface-sunken">
      <div className="px-6 py-5 border-b border-border">
        <p className="section-label">Employee preview</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
        {!hasMeaningfulDraft ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-[13px] text-muted-foreground">Employee details will appear here as you describe the role.</p>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Identity */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-[15px] font-bold text-primary">
                {draft.avatar || draft.name?.[0] || "?"}
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-foreground">{draft.name || "Unnamed"}</h3>
                {draft.channel && <p className="text-[11px] text-muted-foreground">{draft.channel}</p>}
              </div>
            </div>

            {/* Job Description */}
            {draft.jobDescription && (
              <div>
                <p className="section-label mb-1.5">Job description</p>
                <p className="text-[13px] text-foreground leading-relaxed">{draft.jobDescription}</p>
              </div>
            )}

            {/* Intelligence */}
            {draft.intelligence && (
              <div className="flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[12px] text-muted-foreground">Intelligence:</span>
                <span className="text-[12px] font-medium text-foreground">{draft.intelligence}</span>
              </div>
            )}

            {/* Skills */}
            {draft.skills && draft.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="section-label">Skills</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {draft.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 text-[11px] font-medium bg-primary/[0.06] text-primary rounded-lg ring-1 ring-inset ring-primary/10">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {draft.tools && draft.tools.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="section-label">Tools</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {draft.tools.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[11px] font-medium bg-muted rounded-lg text-foreground">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Triggers */}
            {draft.triggers && draft.triggers.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Radio className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="section-label">Triggers</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {draft.triggers.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[11px] font-medium bg-muted rounded-lg text-foreground font-mono">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Budget */}
            {draft.budget && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="section-label">Budget</p>
                </div>
                <div className="text-[12px] text-foreground space-y-0.5">
                  <p>${draft.budget.daily}/day · ${draft.budget.weekly}/week max</p>
                  <p className="text-muted-foreground">Warning at {draft.budget.warnAt}% usage</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showConfirm && hasMeaningfulDraft && (
        <div className="px-6 py-4 border-t border-border opacity-0 animate-fade-in-up">
          <button
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-foreground text-background shadow-sm hover:bg-foreground/90 transition-all"
          >
            Looks good, activate
          </button>
        </div>
      )}
    </div>
  );
}
