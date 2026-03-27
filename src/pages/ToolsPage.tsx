import { useState } from "react";
import { tools } from "@/lib/data";
import { Search, Globe, Monitor, Terminal, FileText, Table, Calendar, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
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

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Tools</h1>
        <p className="text-muted-foreground text-[13px] mt-1">External tools your employees can use to get work done</p>
      </div>

      <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..." className="pl-10 h-10 text-[13px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-stagger">
        {filtered.map((tool) => {
          const entry = iconMap[tool.icon] || { icon: Globe, color: "text-blue-600", bg: "bg-blue-50" };
          const Icon = entry.icon;
          return (
            <div key={tool.id} className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay">
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
    </div>
  );
}
