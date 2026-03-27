import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "@/lib/data";
import { getActivityLogs, getConnectorDetails } from "@/lib/employee-detail-data";
import { StateDot, EmployeeAvatar } from "@/components/StateBadge";
import { ActivityLog } from "@/components/employee-detail/ActivityLog";
import { EditableTagList } from "@/components/employee-detail/EditableTagList";
import { ConnectorsPanel } from "@/components/employee-detail/ConnectorsPanel";
import { CostPanel } from "@/components/employee-detail/CostPanel";
import { ArrowLeft, Zap, Wrench, Archive, RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const emp = getEmployeeById(id || "");
  const [isArchived, setIsArchived] = useState(emp?.archived ?? false);

  if (!emp) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Employee not found.</p>
      </div>
    );
  }

  const logs = getActivityLogs(emp.id);
  const connectorDetails = getConnectorDetails(emp.connectors);

  const handleArchive = () => {
    setIsArchived(true);
    toast.success(`${emp.name} has been archived`);
  };

  const handleRestore = () => {
    setIsArchived(false);
    toast.success(`${emp.name} has been restored`);
  };

  return (
    <div className="p-8 max-w-[960px] mx-auto">
      <button onClick={() => navigate("/app/employees")} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6 opacity-0 animate-fade-in">
        <ArrowLeft className="w-3.5 h-3.5" />
        Employees
      </button>

      {/* Header card */}
      <div className={`card-premium rounded-xl border border-border p-6 mb-6 relative noise-overlay opacity-0 animate-fade-in-up ${isArchived ? "opacity-60" : ""}`} style={{ animationDelay: "0.1s" }}>
        <div className="relative flex items-start gap-4">
          <EmployeeAvatar name={emp.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-xl font-bold text-foreground tracking-tight">{emp.name}</h1>
              {isArchived ? (
                <span className="text-[11px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full font-medium">Archived</span>
              ) : (
                <>
                  <StateDot state={emp.state} />
                  {emp.lastRunFailed && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-state-warning bg-state-warning/8 px-2 py-0.5 rounded-full font-medium ring-1 ring-inset ring-state-warning/20">
                      <AlertTriangle className="w-3 h-3" />
                      Last run failed
                    </span>
                  )}
                </>
              )}
            </div>
            <p className="text-[13px] text-muted-foreground">{emp.title}</p>
            <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed max-w-lg">{emp.summary}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-5 items-start">
        {/* Left: Activity log */}
        <div className="col-span-2 animate-stagger">
          <ActivityLog entries={logs} />
        </div>

        {/* Right sidebar */}
        <div className="space-y-4 animate-stagger">
          <CostPanel employeeId={emp.id} />

          <EditableTagList
            items={emp.skills}
            type="skills"
            icon={<Zap className="w-3.5 h-3.5 text-muted-foreground" />}
            label="Skills"
          />

          <EditableTagList
            items={emp.tools}
            type="tools"
            icon={<Wrench className="w-3.5 h-3.5 text-muted-foreground" />}
            label="Tools"
          />

          <ConnectorsPanel details={connectorDetails} employeeName={emp.name} />

          {/* Archive / Restore */}
          {isArchived ? (
            <button
              onClick={handleRestore}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 border border-border text-foreground hover:bg-muted"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore
            </button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 border border-transparent text-muted-foreground/60 hover:text-destructive hover:bg-destructive/5">
                  <Archive className="w-3.5 h-3.5" />
                  Archive
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Archive {emp.name}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will deactivate {emp.name} and stop all running tasks. Archived employees won't process new events or incur costs. You can restore them anytime.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-[12px]">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleArchive}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[12px]"
                  >
                    Archive
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
