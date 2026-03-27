import { useState } from "react";
import { tools } from "@/lib/data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        <p className="text-muted-foreground text-[13px] mt-1">External tools your AI employees can use to get work done</p>
      </div>

      <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="pl-10 h-10 text-[13px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-stagger">
        {filtered.map((tool) => (
          <div key={tool.id} className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay">
            <div className="relative">
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{tool.icon}</div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1">{tool.name}</h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{tool.summary}</p>
              <p className="text-[11px] text-muted-foreground">
                {tool.usedBy > 0 ? `${tool.usedBy} employee${tool.usedBy > 1 ? "s" : ""} using` : "Not in use yet"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-12">No tools match your search.</p>
      )}
    </div>
  );
}
