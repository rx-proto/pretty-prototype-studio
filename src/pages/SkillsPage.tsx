import { useState } from "react";
import { skills } from "@/lib/data";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        {filtered.map((skill) => (
          <div key={skill.id} className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center mb-3 text-[11px] font-bold text-muted-foreground tracking-wide group-hover:bg-primary/[0.08] group-hover:text-primary transition-colors duration-200">
                {skill.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1">{skill.name}</h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{skill.summary}</p>
              <p className="text-[11px] text-muted-foreground">
                {skill.usedBy > 0 ? `${skill.usedBy} employee${skill.usedBy > 1 ? "s" : ""} using` : "Not in use yet"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-12">No skills match your search.</p>
      )}
    </div>
  );
}
