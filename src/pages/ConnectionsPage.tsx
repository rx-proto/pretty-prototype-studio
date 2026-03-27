import { connectors } from "@/lib/data";
import { Plus } from "lucide-react";

export default function ConnectionsPage() {
  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-foreground tracking-tight">Connectors</h1>
          <p className="text-muted-foreground text-[13px] mt-1">Connect your AI employees to the tools you use</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all">
          <Plus className="w-3.5 h-3.5" />
          Add connector
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {connectors.map((conn) => (
          <div key={conn.id} className="card-interactive rounded-xl border border-border p-5 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-[15px] font-bold text-foreground">{conn.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] font-semibold text-foreground">{conn.name}</h3>
                  <span className={`w-2 h-2 rounded-full ${conn.connected ? "bg-state-working" : "bg-muted-foreground/30"}`} />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {conn.connected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed mb-2">{conn.summary}</p>
            {conn.employeesUsing > 0 && (
              <p className="text-[11px] text-muted-foreground">{conn.employeesUsing} employee{conn.employeesUsing > 1 ? "s" : ""} using</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
