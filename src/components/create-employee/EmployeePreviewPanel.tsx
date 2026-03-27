import type { EmployeeDraft } from "./types";
import mayaAvatar from "@/assets/avatars/maya.jpg";

interface Props {
  draft: Partial<EmployeeDraft>;
  onConfirm: () => void;
  showConfirm: boolean;
}

export default function EmployeePreviewPanel({ draft, onConfirm, showConfirm }: Props) {
  const hasDraft = draft.name || draft.jobDescription;

  if (!hasDraft) return null;

  return (
    <div className="h-full flex flex-col border-l border-border bg-background">
      {/* Card */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
        <div className="opacity-0 animate-fade-in-up space-y-5">
          {/* Avatar + Name */}
          <div className="flex items-start gap-3.5">
            <img src={mayaAvatar} alt={draft.name || "Employee"} className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />
            <div className="pt-0.5">
              <h3 className="text-[18px] font-bold text-foreground tracking-tight">{draft.name || "Unnamed"}</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">Draft employee</p>
            </div>
          </div>

          {/* Job Description */}
          {draft.jobDescription && (
            <div>
              <p className="section-label mb-2">Job description</p>
              <p className="text-[13px] text-foreground/80 leading-[1.7]">{draft.jobDescription}</p>
            </div>
          )}

          {/* Skills — shown subtly */}
          {draft.skills && draft.skills.length > 0 && (
            <div>
              <p className="section-label mb-2">Skills</p>
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
              <p className="section-label mb-2">Tools</p>
              <div className="flex flex-wrap gap-1.5">
                {draft.tools.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[11px] font-medium bg-muted text-foreground rounded-lg">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm */}
      {showConfirm && (
        <div className="p-5 border-t border-border opacity-0 animate-fade-in-up">
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
