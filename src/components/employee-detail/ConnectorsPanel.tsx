import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plug, ChevronRight, Plus, X, MessageSquare, Mail, MessageCircle, Globe, Code, Database, Monitor } from "lucide-react";
import type { ConnectorDetail } from "@/lib/employee-detail-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { connectors as allConnectors } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  "message-square": MessageSquare,
  "mail": Mail,
  "message-circle": MessageCircle,
  "globe": Globe,
  "code": Code,
  "database": Database,
  "monitor": Monitor,
  "plug": Plug,
};

const statusConfig = {
  connected: { label: "Connected", className: "bg-state-working/10 text-state-working" },
  error: { label: "Error", className: "bg-state-blocked/10 text-state-blocked" },
  disconnected: { label: "Not connected", className: "bg-muted text-muted-foreground" },
};

interface ConnectorsPanelProps {
  details: ConnectorDetail[];
  employeeName: string;
}

export function ConnectorsPanel({ details: initialDetails, employeeName }: ConnectorsPanelProps) {
  const [details, setDetails] = useState(initialDetails);
  const [selectedConnector, setSelectedConnector] = useState<ConnectorDetail | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const currentNames = details.map(d => d.name);
  const availableConnectors = allConnectors.filter(c => !currentNames.includes(c.name));

  const handleRemove = (name: string) => {
    setDetails(details.filter(d => d.name !== name));
    setSelectedConnector(null);
  };

  const handleAdd = (name: string) => {
    const connector = allConnectors.find(c => c.name === name);
    if (connector) {
      setDetails([...details, {
        id: connector.id,
        name: connector.name,
        icon: "plug",
        status: "connected",
        lastSync: "just now",
        detail: connector.summary,
      }]);
    }
    setShowAddDialog(false);
  };

  return (
    <>
      <div className="card-premium rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Plug className="w-3.5 h-3.5 text-muted-foreground" />
            <h3 className="section-label">Connectors</h3>
          </div>
          <button
            onClick={() => setShowAddDialog(true)}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-1">
          {details.map(connector => {
            const Icon = iconMap[connector.icon] || Plug;
            const status = statusConfig[connector.status];
            return (
              <button
                key={connector.id}
                onClick={() => setSelectedConnector(connector)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-muted/40 transition-colors duration-150 group"
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-[12px] font-medium text-foreground flex-1">{connector.name}</span>
                <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", status.className)}>
                  {status.label}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground/20 group-hover:text-muted-foreground transition-colors" />
              </button>
            );
          })}
          {details.length === 0 && (
            <p className="text-[12px] text-muted-foreground py-1">No connectors configured</p>
          )}
        </div>
      </div>

      {/* Connector detail dialog */}
      <Dialog open={!!selectedConnector} onOpenChange={(open) => !open && setSelectedConnector(null)}>
        <DialogContent className="sm:max-w-[400px]">
          {selectedConnector && (() => {
            const Icon = iconMap[selectedConnector.icon] || Plug;
            const status = statusConfig[selectedConnector.status];
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <DialogTitle className="text-[15px]">{selectedConnector.name}</DialogTitle>
                      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", status.className)}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <DialogDescription className="text-[13px] pt-2">
                    {selectedConnector.detail}
                  </DialogDescription>
                </DialogHeader>

                {selectedConnector.lastSync && (
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-muted-foreground">Last sync</span>
                    <span className="text-foreground font-medium">{selectedConnector.lastSync}</span>
                  </div>
                )}

                {selectedConnector.permissions && selectedConnector.permissions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Permissions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedConnector.permissions.map(p => (
                        <span key={p} className="px-2.5 py-1 text-[11px] font-medium bg-muted rounded-lg text-foreground">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleRemove(selectedConnector.name)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-destructive hover:bg-destructive/5 transition-colors mt-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Disconnect from {employeeName}
                </button>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Add connector dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[15px]">Add connector</DialogTitle>
            <DialogDescription className="text-[13px]">
              Connect a service to {employeeName}.
            </DialogDescription>
          </DialogHeader>
          {availableConnectors.length === 0 ? (
            <p className="text-[12px] text-muted-foreground py-4 text-center">All available connectors are already added.</p>
          ) : (
            <div className="space-y-1 max-h-[250px] overflow-y-auto">
              {availableConnectors.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleAdd(c.name)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-muted/50 transition-colors duration-150 group"
                >
                  <Plus className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-foreground">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{c.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
