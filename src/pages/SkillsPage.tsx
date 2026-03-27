import { useState } from "react";
import { skills } from "@/lib/data";
import { Search, Plus, Eye, FileText, AlertTriangle, ClipboardCheck, ShieldAlert, RefreshCw, Heart, BarChart3, PenTool, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
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

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const filtered = skills.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight">Skills</h1>
          <p className="text-muted-foreground text-[13px] mt-1">Capabilities your employees can use</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all">
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
          const entry = iconMap[skill.icon] || { icon: Eye, color: "text-blue-600", bg: "bg-blue-50" };
          const Icon = entry.icon;
          return (
            <div key={skill.id} className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay">
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
    </div>
  );
}
