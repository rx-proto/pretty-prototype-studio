import { useState } from "react";
import { tools, employees, type ToolPreview } from "@/lib/data";
import { Search, Plus, Globe, Monitor, Terminal, FileText, Table, Calendar, Image, Users } from "lucide-react";
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
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  "globe": { icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
  "monitor": { icon: Monitor, color: "text-slate-600", bg: "bg-slate-100" },
  "terminal": { icon: Terminal, color: "text-emerald-600", bg: "bg-emerald-50" },
  "file-text": { icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
  "table": { icon: Table, color: "text-violet-600", bg: "bg-violet-50" },
  "calendar": { icon: Calendar, color: "text-rose-600", bg: "bg-rose-50" },
  "image": { icon: Image, color: "text-cyan-600", bg: "bg-cyan-50" },
};

const iconOptions = Object.keys(iconMap);

const toolMeta: Record<string, { createdAt: string; lastUsed: string; avgDuration: string; totalUses: number }> = {
  "Web Search": { createdAt: "Jan 5, 2025", lastUsed: "1m ago", avgDuration: "3s", totalUses: 8920 },
  "Browser": { createdAt: "Jan 10, 2025", lastUsed: "25m ago", avgDuration: "12s", totalUses: 1450 },
  "Code Interpreter": { createdAt: "Feb 1, 2025", lastUsed: "40m ago", avgDuration: "8s", totalUses: 2100 },
  "PDF Reader": { createdAt: "Jan 15, 2025", lastUsed: "15m ago", avgDuration: "5s", totalUses: 3680 },
  "Spreadsheet": { createdAt: "Jan 8, 2025", lastUsed: "10m ago", avgDuration: "4s", totalUses: 5200 },
  "Calendar": { createdAt: "Feb 15, 2025", lastUsed: "2h ago", avgDuration: "2s", totalUses: 980 },
  "Image Generation": { createdAt: "Mar 1, 2025", lastUsed: "Never", avgDuration: "—", totalUses: 0 },
};

const defaultMeta = { createdAt: "—", lastUsed: "Never", avgDuration: "—", totalUses: 0 };

function getEmployeesUsingTool(toolName: string) {
  return employees.filter(e => !e.archived && e.tools.includes(toolName));
}

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ToolPreview | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const [createName, setCreateName] = useState("");
  const [createSummary, setCreateSummary] = useState("");
  const [createIcon, setCreateIcon] = useState("globe");

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.summary.toLowerCase().includes(search.toLowerCase())
  );

  const selectedEntry = selected ? iconMap[selected.icon] || iconMap["globe"] : null;
  const selectedEmployees = selected ? getEmployeesUsingTool(selected.name) : [];
  const selectedMeta = selected ? toolMeta[selected.name] || defaultMeta : defaultMeta;

  const handleCreate = () => {
    if (!createName.trim()) return;
    toast.success(`Tool "${createName}" created`);
    setShowCreate(false);
    setCreateName("");
    setCreateSummary("");
    setCreateIcon("globe");
  };

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight">Tools</h1>
          <p className="text-muted-foreground text-[13px] mt-1">External tools your employees can use to get work done</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold bg-foreground text-background shadow-sm hover:bg-foreground/90 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Add tool
        </button>
      </div>

      <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..." className="pl-10 h-10 text-[13px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-stagger">
        {filtered.map((tool) => {
          const entry = iconMap[tool.icon] || iconMap["globe"];
          const Icon = entry.icon;
          return (
            <div
              key={tool.id}
              onClick={() => setSelected(tool)}
              className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay"
            >
              <div className="relative">
                <div className={`w-9 h-9 rounded-lg ${entry.bg} flex items-center justify-center mb-3 transition-colors duration-200`}>
                  <Icon className={`w-4 h-4 ${entry.color} transition-colors duration-200`} />
                </div>
                <h3 className="text-[14px] font-semibold text-foreground mb-1">{tool.name}</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{tool.summary}</p>
                <p className="text-[11px] text-muted-foreground">
                  {tool.usedBy > 0 ? `${tool.usedBy} employee${tool.usedBy > 1 ? "s" : ""} using` : "Not in use yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-12">No tools match your search.</p>
      )}

      {/* ===== Create Tool Dialog ===== */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-[440px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-[16px]">Add Tool</DialogTitle>
            <DialogDescription className="text-[13px]">
              Register a new external tool for employees to use.
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
                placeholder="e.g. Notion API"
                className="h-9 text-[13px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Description</label>
              <Textarea
                value={createSummary}
                onChange={e => setCreateSummary(e.target.value)}
                placeholder="What does this tool do?"
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
              Add
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== Tool Detail Dialog ===== */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            {selected && selectedEntry && (
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 rounded-lg ${selectedEntry.bg} flex items-center justify-center flex-shrink-0`}>
                  <selectedEntry.icon className={`w-5 h-5 ${selectedEntry.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-[16px]">{selected.name}</DialogTitle>
                </div>
              </div>
            )}
            <DialogDescription className="text-[13px] leading-relaxed pt-1">
              {selected?.summary}
            </DialogDescription>
          </DialogHeader>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 py-3 border-y border-border">
            <div>
              <p className="text-[10px] text-muted-foreground">Added</p>
              <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.createdAt}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Last used</p>
              <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.lastUsed}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Avg time</p>
              <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.avgDuration}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Total uses</p>
              <p className="text-[12px] font-medium text-foreground tabular-nums mt-0.5">{selectedMeta.totalUses.toLocaleString()}</p>
            </div>
          </div>

          {/* Employees using this tool */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Employees using this tool
              </p>
            </div>
            {selectedEmployees.length === 0 ? (
              <p className="text-[12px] text-muted-foreground py-2">No employees are using this tool yet.</p>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
