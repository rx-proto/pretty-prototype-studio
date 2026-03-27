import { useState } from "react";
import { skills, employees, type SkillPreview } from "@/lib/data";
import { Search, Plus, Eye, FileText, AlertTriangle, ClipboardCheck, ShieldAlert, RefreshCw, Heart, BarChart3, PenTool, Send, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmployeeAvatar, StateDot } from "@/components/StateBadge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  "eye": { icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
  "file-text": { icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
  "alert-triangle": { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
  "clipboard-check": { icon: ClipboardCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  "shield-alert": { icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
  "refresh-cw": { icon: RefreshCw, color: "text-cyan-600", bg: "bg-cyan-50" },
  "heart": { icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
  "bar-chart-3": { icon: BarChart3, color: "text-violet-600", bg: "bg-violet-50" },
  "pen-tool": { icon: PenTool, color: "text-indigo-600", bg: "bg-indigo-50" },
  "send": { icon: Send, color: "text-teal-600", bg: "bg-teal-50" },
};

const iconOptions = Object.keys(iconMap);

// Synthetic metadata for skill details
const skillMeta: Record<string, { createdAt: string; lastTriggered: string; avgDuration: string; totalRuns: number }> = {
  "Market Watch": { createdAt: "Jan 12, 2025", lastTriggered: "2m ago", avgDuration: "45s", totalRuns: 1240 },
  "Research Briefs": { createdAt: "Jan 15, 2025", lastTriggered: "18m ago", avgDuration: "2m 10s", totalRuns: 890 },
  "Escalation Triage": { createdAt: "Feb 3, 2025", lastTriggered: "5m ago", avgDuration: "12s", totalRuns: 3420 },
  "Launch Checklist": { createdAt: "Feb 20, 2025", lastTriggered: "1h ago", avgDuration: "1m 30s", totalRuns: 210 },
  "Deal Risk Radar": { createdAt: "Mar 1, 2025", lastTriggered: "3h ago", avgDuration: "55s", totalRuns: 380 },
  "Follow-through": { createdAt: "Jan 8, 2025", lastTriggered: "10m ago", avgDuration: "20s", totalRuns: 2100 },
  "Sentiment Analysis": { createdAt: "Mar 5, 2025", lastTriggered: "Never", avgDuration: "—", totalRuns: 0 },
  "Data Summarization": { createdAt: "Feb 10, 2025", lastTriggered: "4h ago", avgDuration: "3m 20s", totalRuns: 560 },
  "Content Generation": { createdAt: "Feb 25, 2025", lastTriggered: "45m ago", avgDuration: "1m 50s", totalRuns: 720 },
  "Channel Publishing": { createdAt: "Feb 28, 2025", lastTriggered: "1h ago", avgDuration: "8s", totalRuns: 680 },
};

const defaultMeta = { createdAt: "—", lastTriggered: "Never", avgDuration: "—", totalRuns: 0 };

function getEmployeesUsingSkill(skillName: string) {
  return employees.filter(e => !e.archived && e.skills.includes(skillName));
}

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SkillPreview | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  // Create form state
  const [createName, setCreateName] = useState("");
  const [createSummary, setCreateSummary] = useState("");
  const [createIcon, setCreateIcon] = useState("eye");

  const filtered = skills.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.summary.toLowerCase().includes(search.toLowerCase())
  );

  const selectedEntry = selected ? iconMap[selected.icon] || iconMap["eye"] : null;
  const selectedEmployees = selected ? getEmployeesUsingSkill(selected.name) : [];
  const selectedMeta = selected ? skillMeta[selected.name] || defaultMeta : defaultMeta;

  const handleCreate = () => {
    if (!createName.trim()) return;
    toast.success(`Skill "${createName}" created`);
    setShowCreate(false);
    setCreateName("");
    setCreateSummary("");
    setCreateIcon("eye");
  };

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight">Skills</h1>
          <p className="text-muted-foreground text-[13px] mt-1">Capabilities your employees can use</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold bg-foreground text-background shadow-sm hover:bg-foreground/90 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Create skill
        </button>
      </div>

      <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills..." className="pl-10 h-10 text-[13px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-stagger">
        {filtered.map((skill) => {
          const entry = iconMap[skill.icon] || iconMap["eye"];
          const Icon = entry.icon;
          return (
            <div
              key={skill.id}
              onClick={() => setSelected(skill)}
              className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay"
            >
              <div className="relative">
                <div className={`w-9 h-9 rounded-lg ${entry.bg} flex items-center justify-center mb-3 transition-colors duration-200`}>
                  <Icon className={`w-4 h-4 ${entry.color} transition-colors duration-200`} />
                </div>
                <h3 className="text-[14px] font-semibold text-foreground mb-1">{skill.name}</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{skill.summary}</p>
                <p className="text-[11px] text-muted-foreground">
                  {skill.usedBy > 0 ? `${skill.usedBy} employee${skill.usedBy > 1 ? "s" : ""} using` : "Not in use yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-12">No skills match your search.</p>
      )}

      {/* ===== Create Skill Dialog ===== */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-[440px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-[16px]">Create Skill</DialogTitle>
            <DialogDescription className="text-[13px]">
              Define a new capability that employees can use.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-1">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Icon</label>
              <div className="flex flex-wrap gap-1.5">
                {iconOptions.map(key => {
                  const opt = iconMap[key];
                  const OptIcon = opt.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setCreateIcon(key)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        createIcon === key
                          ? `${opt.bg} ring-2 ring-primary/30`
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <OptIcon className={`w-4 h-4 ${createIcon === key ? opt.color : "text-muted-foreground"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Name</label>
              <Input
                value={createName}
                onChange={e => setCreateName(e.target.value)}
                placeholder="e.g. Trend Analysis"
                className="h-9 text-[13px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Description</label>
              <Textarea
                value={createSummary}
                onChange={e => setCreateSummary(e.target.value)}
                placeholder="What does this skill do?"
                className="text-[13px] min-h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setShowCreate(false)}
              className="flex-1 px-4 py-2 rounded-lg text-[12px] font-medium border border-border text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!createName.trim()}
              className="flex-1 px-4 py-2 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              Create
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== Skill Detail Dialog ===== */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) { setSelected(null); setIsEditing(false); } }}>
        <DialogContent className="sm:max-w-[480px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            {selected && selectedEntry && (
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 rounded-lg ${selectedEntry.bg} flex items-center justify-center flex-shrink-0`}>
                  <selectedEntry.icon className={`w-5 h-5 ${selectedEntry.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <Input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="h-8 text-[15px] font-semibold"
                      autoFocus
                    />
                  ) : (
                    <DialogTitle className="text-[16px]">{selected.name}</DialogTitle>
                  )}
                </div>
                {!isEditing && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={startEdit}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShowDelete(true)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {isEditing ? (
              <Textarea
                value={editSummary}
                onChange={e => setEditSummary(e.target.value)}
                className="text-[13px] min-h-[60px] resize-none mt-1"
              />
            ) : (
              <DialogDescription className="text-[13px] leading-relaxed pt-1">
                {selected?.summary}
              </DialogDescription>
            )}
          </DialogHeader>

          {isEditing ? (
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 rounded-lg text-[12px] font-medium border border-border text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!editName.trim()}
                className="flex-1 px-4 py-2 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 py-3 border-y border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Created</p>
                  <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.createdAt}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Last run</p>
                  <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.lastTriggered}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Avg time</p>
                  <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.avgDuration}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Total runs</p>
                  <p className="text-[12px] font-medium text-foreground tabular-nums mt-0.5">{selectedMeta.totalRuns.toLocaleString()}</p>
                </div>
              </div>

              {/* Employees using this skill */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Employees using this skill
                  </p>
                </div>
                {selectedEmployees.length === 0 ? (
                  <p className="text-[12px] text-muted-foreground py-2">No employees are using this skill yet.</p>
                ) : (
                  <div className="space-y-0.5">
                    {selectedEmployees.map(emp => (
                      <button
                        key={emp.id}
                        onClick={() => { setSelected(null); navigate(`/app/employees/${emp.id}`); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors duration-150 group/emp text-left"
                      >
                        <EmployeeAvatar name={emp.name} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[13px] font-medium text-foreground">{emp.name}</p>
                            <StateDot state={emp.state} />
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">{emp.title}</p>
                        </div>
                        <span className="text-[11px] text-muted-foreground/40 group-hover/emp:text-primary transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== Delete Confirmation ===== */}
      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[15px]">Delete {selected?.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[13px]">
              This will permanently remove this skill. {selectedEmployees.length > 0
                ? `${selectedEmployees.length} employee${selectedEmployees.length > 1 ? "s" : ""} currently using it will lose access.`
                : "No employees are currently using it."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-[12px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[12px]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
