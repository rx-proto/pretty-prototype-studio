import { skills } from "@/lib/data";
import { StateBadge } from "@/components/StateBadge";

export default function SkillsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Skills</h1>
        <p className="text-muted-foreground text-sm mt-1">{skills.length} skills configured in your workspace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                <p className="text-xs text-muted-foreground">{skill.category}</p>
              </div>
              <StateBadge state={skill.state} />
            </div>
            <p className="text-xs text-muted-foreground mb-3">{skill.summary}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {skill.employeeNames.map((name) => (
                  <span key={name} className="px-2 py-0.5 text-[10px] font-medium bg-muted rounded-full text-foreground">{name}</span>
                ))}
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{skill.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
