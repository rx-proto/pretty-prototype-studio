import { useState } from "react";
import { connectors, employees, type ConnectorPreview } from "@/lib/data";
import { Plus, MessageSquare, MessageCircle, Mail, Webhook, Database, BookOpen, Github, Users, Search, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const connectorIcons: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  Slack: { icon: MessageSquare, color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/10" },
  Lark: { icon: MessageCircle, color: "text-[#3370FF]", bg: "bg-[#3370FF]/10" },
  Email: { icon: Mail, color: "text-amber-600", bg: "bg-amber-50" },
  Webhook: { icon: Webhook, color: "text-emerald-600", bg: "bg-emerald-50" },
  Salesforce: { icon: Database, color: "text-[#00A1E0]", bg: "bg-[#00A1E0]/10" },
  Notion: { icon: BookOpen, color: "text-foreground", bg: "bg-muted" },
  GitHub: { icon: Github, color: "text-foreground", bg: "bg-muted" },
};

const connectorMeta: Record<string, { connectedAt: string; lastSync: string; permissions: string[]; totalMessages: number }> = {
  Slack: { connectedAt: "Jan 5, 2025", lastSync: "2m ago", permissions: ["Read channels", "Post messages", "Upload files"], totalMessages: 4820 },
  Lark: { connectedAt: "Feb 10, 2025", lastSync: "15m ago", permissions: ["Read groups", "Send messages"], totalMessages: 1240 },
  Email: { connectedAt: "Jan 3, 2025", lastSync: "5m ago", permissions: ["Send email", "Read inbox"], totalMessages: 3100 },
  Webhook: { connectedAt: "Jan 20, 2025", lastSync: "1m ago", permissions: ["Receive events", "Custom headers"], totalMessages: 8900 },
  GitHub: { connectedAt: "Feb 1, 2025", lastSync: "30m ago", permissions: ["Read repos", "Read issues", "Read PRs"], totalMessages: 2300 },
  Salesforce: { connectedAt: "—", lastSync: "—", permissions: [], totalMessages: 0 },
  Notion: { connectedAt: "—", lastSync: "—", permissions: [], totalMessages: 0 },
};

const defaultMeta = { connectedAt: "—", lastSync: "—", permissions: [], totalMessages: 0 };

function getEmployeesUsingConnector(connectorName: string) {
  return employees.filter(e => !e.archived && e.connectors.includes(connectorName));
}

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ConnectorPreview | null>(null);
  const navigate = useNavigate();

  const filtered = connectors.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.summary.toLowerCase().includes(search.toLowerCase())
  );

  const selectedEntry = selected ? connectorIcons[selected.name] || { icon: MessageSquare, color: "text-muted-foreground", bg: "bg-muted" } : null;
  const selectedEmployees = selected ? getEmployeesUsingConnector(selected.name) : [];
  const selectedMeta = selected ? connectorMeta[selected.name] || defaultMeta : defaultMeta;

  const handleConnect = () => {
    if (selected) {
      toast.success(`${selected.name} connected`);
      setSelected(null);
    }
  };

  const handleDisconnect = () => {
    if (selected) {
      toast.success(`${selected.name} disconnected`);
      setSelected(null);
    }
  };

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight">Connectors</h1>
          <p className="text-muted-foreground text-[13px] mt-1">Connect your AI employees to the tools you use</p>
        </div>
      </div>

      <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search connectors..." className="pl-10 h-10 text-[13px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-stagger">
        {filtered.map((conn) => {
          const entry = connectorIcons[conn.name] || { icon: MessageSquare, color: "text-muted-foreground", bg: "bg-muted" };
          const Icon = entry.icon;
          return (
            <div
              key={conn.id}
              onClick={() => setSelected(conn)}
              className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay"
            >
              <div className="relative flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${entry.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className={`w-[18px] h-[18px] ${entry.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-semibold text-foreground">{conn.name}</h3>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${conn.connected ? "bg-state-working" : "bg-muted-foreground/25"}`} />
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
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-12">No connectors match your search.</p>
      )}

      {/* ===== Connector Detail Dialog ===== */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            {selected && selectedEntry && (
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 rounded-xl ${selectedEntry.bg} flex items-center justify-center flex-shrink-0`}>
                  <selectedEntry.icon className={`w-5 h-5 ${selectedEntry.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-[16px]">{selected.name}</DialogTitle>
                    {selected.connected ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-state-working bg-state-working/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        <XCircle className="w-2.5 h-2.5" />
                        Not connected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <DialogDescription className="text-[13px] leading-relaxed pt-1">
              {selected?.summary}
            </DialogDescription>
          </DialogHeader>

          {selected?.connected ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Connected</p>
                  <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.connectedAt}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Last sync</p>
                  <p className="text-[12px] font-medium text-foreground mt-0.5">{selectedMeta.lastSync}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Total events</p>
                  <p className="text-[12px] font-medium text-foreground tabular-nums mt-0.5">{selectedMeta.totalMessages.toLocaleString()}</p>
                </div>
              </div>

              {/* Permissions */}
              {selectedMeta.permissions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Permissions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMeta.permissions.map(p => (
                      <span key={p} className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-muted text-foreground">{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Employees */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Employees using this connector
                  </p>
                </div>
                {selectedEmployees.length === 0 ? (
                  <p className="text-[12px] text-muted-foreground py-2">No employees are using this connector.</p>
                ) : (
                  <div className="space-y-0.5 max-h-[200px] overflow-y-auto">
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

              {/* Disconnect */}
              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-2 rounded-lg text-[12px] font-medium border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-colors mt-1"
              >
                Disconnect
              </button>
            </>
          ) : (
            <div className="py-4 text-center space-y-4">
              <p className="text-[12px] text-muted-foreground">
                Connect {selected?.name} to let your employees interact with it.
              </p>
              <button
                onClick={handleConnect}
                className="px-6 py-2 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Connect {selected?.name}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
