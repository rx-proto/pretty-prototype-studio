import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, Users, Zap, Wrench, Plug, CreditCard, Settings, Layers, UserPlus, Check, Pencil } from "lucide-react";
import { workspace } from "@/lib/data";
import sarahAvatar from "@/assets/avatars/sarah-chen.jpg";

const mainNav = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/employees", label: "Employees", icon: Users },
];

const catalogNav = [
  { to: "/app/skills", label: "Skills", icon: Zap },
  { to: "/app/tools", label: "Tools", icon: Wrench },
  { to: "/app/connectors", label: "Connectors", icon: Plug },
];

const manageNav = [
  { to: "/app/billing", label: "Billing", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [wsName, setWsName] = useState(workspace.name);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(wsName);

  const handleRename = () => {
    if (editValue.trim()) {
      setWsName(editValue.trim());
    }
    setIsEditing(false);
  };

  const renderNavItem = ({ to, label, icon: Icon }: { to: string; label: string; icon: typeof Home }) => {
    const isActive = location.pathname === to || (to !== "/app/home" && location.pathname.startsWith(to));
    return (
      <NavLink
        key={to}
        to={to}
        className={cn(
          "flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] font-medium transition-all duration-200",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
            : "text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className={cn("w-[15px] h-[15px] flex-shrink-0 transition-colors duration-200", isActive && "text-primary")} />
        {label}
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-[220px] flex-shrink-0 sidebar-gradient flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none" />

        <div className="relative px-4 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div onClick={() => navigate("/app/home")} className="w-9 h-9 rounded-xl bg-sidebar-accent flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-sidebar-accent/80 transition-colors">
              <Layers className="w-4 h-4 text-sidebar-primary" />
            </div>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleRename()}
                    onBlur={handleRename}
                    autoFocus
                    className="text-[13px] font-semibold text-sidebar-primary bg-transparent border-b border-sidebar-muted/40 outline-none w-full"
                  />
                  <button onClick={handleRename} className="text-sidebar-muted hover:text-sidebar-primary transition-colors">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditValue(wsName); setIsEditing(true); }}
                  className="flex items-center gap-1.5 group text-left w-full"
                >
                  <p className="text-[13px] font-semibold text-sidebar-primary truncate">{wsName}</p>
                  <Pencil className="w-2.5 h-2.5 text-sidebar-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              )}
              <p className="text-[11px] text-sidebar-muted">{workspace.totalEmployees} employees</p>
            </div>
          </div>
        </div>

        <div className="mx-4 h-px bg-sidebar-border/60" />

        <div className="relative px-3 pt-4 pb-2">
          <button
            onClick={() => navigate("/app/create-employee")}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:brightness-110 transition-all duration-200"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Create Employee
          </button>
        </div>

        <nav className="relative flex-1 px-3 py-3 overflow-y-auto scrollbar-thin space-y-4">
          <div className="space-y-0.5">
            {mainNav.map(renderNavItem)}
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-muted px-3 mb-1.5">Catalog</p>
            <div className="space-y-0.5">
              {catalogNav.map(renderNavItem)}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-muted px-3 mb-1.5">Manage</p>
            <div className="space-y-0.5">
              {manageNav.map(renderNavItem)}
            </div>
          </div>
        </nav>

        <div className="relative px-4 py-3 border-t border-sidebar-border/60">
          <div className="flex items-center gap-2.5">
            <img src={sarahAvatar} alt="Sarah Chen" className="w-7 h-7 rounded-full object-cover" />
            <div className="min-w-0">
              <span className="text-[12px] font-medium text-sidebar-accent-foreground truncate block">Sarah Chen</span>
              <span className="text-[10px] text-sidebar-muted">Owner</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto scrollbar-thin bg-background">
        <Outlet />
      </main>
    </div>
  );
}
