import { settingsGroups } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[680px] mx-auto space-y-6">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Workspace configuration and preferences</p>
      </div>

      <div className="space-y-3 animate-stagger">
        {settingsGroups.map((group) => (
          <div key={group.id} className="card-premium rounded-xl border border-border p-5">
            <h2 className="text-[13px] font-semibold text-foreground mb-0.5">{group.name}</h2>
            <p className="text-[11px] text-muted-foreground mb-4">{group.summary}</p>
            <div className="space-y-0">
              {group.items.map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-2.5 ${i < group.items.length - 1 ? "border-b border-border/60" : ""}`}>
                  <span className="text-[12px] text-muted-foreground">{item.label}</span>
                  <span className="text-[12px] font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
