import { useState } from "react";
import {
  connectionInstances,
  connectorCatalog,
  employees,
  type ConnectionInstance,
  type ConnectorCatalogEntry,
} from "@/lib/data";
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Users,
  Plus,
  MessageSquare,
  MessageCircle,
  Mail,
  Webhook,
  Database,
  BookOpen,
  Github,
  Send,
} from "lucide-react";
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

/* ─── icon registry ─── */
const connectorIcons: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  slack: { icon: MessageSquare, color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/10" },
  lark: { icon: MessageCircle, color: "text-[#3370FF]", bg: "bg-[#3370FF]/10" },
  email: { icon: Mail, color: "text-amber-600", bg: "bg-amber-50" },
  webhook: { icon: Webhook, color: "text-emerald-600", bg: "bg-emerald-50" },
  salesforce: { icon: Database, color: "text-[#00A1E0]", bg: "bg-[#00A1E0]/10" },
  notion: { icon: BookOpen, color: "text-foreground", bg: "bg-muted" },
  github: { icon: Github, color: "text-foreground", bg: "bg-muted" },
  telegram: { icon: Send, color: "text-[#2AABEE]", bg: "bg-[#2AABEE]/10" },
  database: { icon: Database, color: "text-violet-600", bg: "bg-violet-50" },
};

const defaultIcon = { icon: MessageSquare, color: "text-muted-foreground", bg: "bg-muted" };

/* ─── verification UI ─── */
const verificationBadge = {
  provider_verified: { label: "Verified", icon: CheckCircle2, className: "text-state-working bg-state-working/10" },
  config_saved: { label: "Config saved", icon: AlertTriangle, className: "text-amber-600 bg-amber-500/10" },
  unconfigured: { label: "Not configured", icon: XCircle, className: "text-muted-foreground bg-muted" },
} as const;

function getEmployeesUsingConnector(connectorDisplayName: string) {
  return employees.filter(e => !e.archived && e.connectors.includes(connectorDisplayName));
}

function timeAgo(iso?: string) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ConnectionsPage() {
  const [search, setSearch] = useState("");
  const [selectedInstance, setSelectedInstance] = useState<ConnectionInstance | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<ConnectorCatalogEntry | null>(null);
  const navigate = useNavigate();

  const filteredInstances = connectionInstances.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.displayName.toLowerCase().includes(search.toLowerCase())
  );

  const configuredTypes = new Set(connectionInstances.map(c => c.type));
  const availableCatalog = connectorCatalog.filter(c =>
    !configuredTypes.has(c.type) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.summary.toLowerCase().includes(search.toLowerCase()))
  );

  /* ─── Instance detail ─── */
  const selEntry = selectedInstance ? connectorIcons[selectedInstance.type] || defaultIcon : null;
  const selEmployees = selectedInstance ? getEmployeesUsingConnector(selectedInstance.displayName) : [];
  const selBadge = selectedInstance ? verificationBadge[selectedInstance.verificationStage] : null;

  const handleVerify = () => {
    if (selectedInstance) {
      toast.success(`Verification started for ${selectedInstance.name}`);
      setSelectedInstance(null);
    }
  };

  const handleDelete = () => {
    if (selectedInstance) {
      toast.success(`${selectedInstance.name} removed`);
      setSelectedInstance(null);
    }
  };

  const handleAddFromCatalog = () => {
    if (selectedCatalog) {
      toast.success(`${selectedCatalog.name} connection created — configure credentials to continue`);
      setSelectedCatalog(null);
    }
  };

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-8">
      {/* Header */}
      <div className="pt-2 flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-[24px] font-bold text-foreground tracking-tight">Connectors</h1>
          <p className="text-muted-foreground text-[13px] mt-1">Workspace connections to external systems</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search connectors..." className="pl-10 h-10 text-[13px]" />
      </div>

      {/* ═══ Active Connections ═══ */}
      <section className="space-y-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.15s" }}>
        <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Connections</h2>
        {filteredInstances.length === 0 ? (
          <p className="text-[13px] text-muted-foreground py-6 text-center">No connections match your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredInstances.map(conn => {
              const entry = connectorIcons[conn.type] || defaultIcon;
              const Icon = entry.icon;
              const badge = verificationBadge[conn.verificationStage];
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={conn.id}
                  onClick={() => setSelectedInstance(conn)}
                  className="card-interactive rounded-xl border border-border p-5 cursor-pointer group relative noise-overlay"
                >
                  <div className="relative flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${entry.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className={`w-[18px] h-[18px] ${entry.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-semibold text-foreground">{conn.name}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <BadgeIcon className={`w-2.5 h-2.5 ${badge.className.split(" ")[0]}`} />
                        <span className="text-[11px] text-muted-foreground">{badge.label}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mb-2">{conn.summary}</p>
                  <div className="flex items-center justify-between">
                    {conn.employeesUsing > 0 && (
                      <p className="text-[11px] text-muted-foreground">{conn.employeesUsing} employee{conn.employeesUsing > 1 ? "s" : ""}</p>
                    )}
                    {conn.lastVerifiedAt && (
                      <p className="text-[10px] text-muted-foreground/60 ml-auto">verified {timeAgo(conn.lastVerifiedAt)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══ Available Catalog ═══ */}
      {availableCatalog.length > 0 && (
        <section className="space-y-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Available connectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableCatalog.map(cat => {
              const entry = connectorIcons[cat.type] || defaultIcon;
              const Icon = entry.icon;
              return (
                <div
                  key={cat.type}
                  onClick={() => setSelectedCatalog(cat)}
                  className="card-interactive rounded-xl border border-dashed border-border p-5 cursor-pointer group relative opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="relative flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${entry.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-[18px] h-[18px] ${entry.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-foreground">{cat.name}</h3>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{cat.category}</span>
                    </div>
                    <Plus className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{cat.summary}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══ Instance Detail Dialog ═══ */}
      <Dialog open={!!selectedInstance} onOpenChange={open => { if (!open) setSelectedInstance(null); }}>
        <DialogContent className="sm:max-w-[480px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            {selectedInstance && selEntry && selBadge && (
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 rounded-xl ${selEntry.bg} flex items-center justify-center flex-shrink-0`}>
                  <selEntry.icon className={`w-5 h-5 ${selEntry.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-[16px]">{selectedInstance.name}</DialogTitle>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${selBadge.className}`}>
                      <selBadge.icon className="w-2.5 h-2.5" />
                      {selBadge.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Type: {selectedInstance.type}</p>
                </div>
              </div>
            )}
            <DialogDescription className="text-[13px] leading-relaxed pt-1">
              {selectedInstance?.summary}
            </DialogDescription>
          </DialogHeader>

          {selectedInstance && (
            <>
              {/* Verification info */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Stage</p>
                  <p className="text-[12px] font-medium text-foreground mt-0.5 capitalize">{selectedInstance.verificationStage.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Last verified</p>
                  <p className="text-[12px] font-medium text-foreground mt-0.5">{timeAgo(selectedInstance.lastVerifiedAt)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Employees</p>
                  <p className="text-[12px] font-medium text-foreground tabular-nums mt-0.5">{selectedInstance.employeesUsing}</p>
                </div>
              </div>

              {selectedInstance.lastError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-destructive">{selectedInstance.lastError}</p>
                </div>
              )}

              {selectedInstance.externalInstanceId && (
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-muted-foreground">External instance</span>
                  <span className="text-foreground font-mono text-[11px]">{selectedInstance.externalInstanceId}</span>
                </div>
              )}

              {/* Employees using */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Employees using this connection</p>
                </div>
                {selEmployees.length === 0 ? (
                  <p className="text-[12px] text-muted-foreground py-2">No employees are using this connection.</p>
                ) : (
                  <div className="space-y-0.5 max-h-[200px] overflow-y-auto">
                    {selEmployees.map(emp => (
                      <button
                        key={emp.id}
                        onClick={() => { setSelectedInstance(null); navigate(`/app/employees/${emp.id}`); }}
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

              {/* Actions */}
              <div className="flex gap-2 mt-1">
                {selectedInstance.verificationStage !== "provider_verified" && (
                  <button
                    onClick={handleVerify}
                    className="flex-1 px-4 py-2 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Verify now
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 rounded-lg text-[12px] font-medium border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-colors"
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ Catalog Add Dialog ═══ */}
      <Dialog open={!!selectedCatalog} onOpenChange={open => { if (!open) setSelectedCatalog(null); }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            {selectedCatalog && (() => {
              const entry = connectorIcons[selectedCatalog.type] || defaultIcon;
              return (
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-10 h-10 rounded-xl ${entry.bg} flex items-center justify-center`}>
                    <entry.icon className={`w-5 h-5 ${entry.color}`} />
                  </div>
                  <div>
                    <DialogTitle className="text-[16px]">{selectedCatalog.name}</DialogTitle>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{selectedCatalog.category} connector</span>
                  </div>
                </div>
              );
            })()}
            <DialogDescription className="text-[13px] leading-relaxed pt-1">
              {selectedCatalog?.summary}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center space-y-4">
            <p className="text-[12px] text-muted-foreground">
              Add a {selectedCatalog?.name} connection to your workspace. You'll configure credentials after creation.
            </p>
            <button
              onClick={handleAddFromCatalog}
              className="px-6 py-2 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Add {selectedCatalog?.name}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
