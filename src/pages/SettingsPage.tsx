import { settingsGroups } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Workspace configuration and preferences</p>
      </div>

      <div className="space-y-4">
        {settingsGroups.map((group) => (
          <div key={group.id} className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-1">{group.name}</h2>
            <p className="text-xs text-muted-foreground mb-4">{group.summary}</p>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
