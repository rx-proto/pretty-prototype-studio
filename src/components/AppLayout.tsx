import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Users, Zap, Link2, CreditCard, Settings, Sparkles, UserPlus } from "lucide-react";
import { workspace } from "@/lib/data";

const navItems = [
  { to: "/preview/workspace", label: "Home", icon: Home },
  { to: "/preview/employees", label: "Employees", icon: Users },
  { to: "/preview/skills", label: "Skills", icon: Zap },
  { to: "/preview/connections", label: "Connections", icon: Link2 },
  { to: "/preview/billing", label: "Billing", icon: CreditCard },
  { to: "/preview/settings", label: "Settings", icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 sidebar-gradient flex flex-col">
        {/* Workspace header */}
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-state-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-sidebar-primary truncate">{workspace.name}</p>
              <p className="text-[11px] text-sidebar-muted">{workspace.workspaceCountLabel}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-sidebar-border/60" />

        {/* CTA Button */}
        <div className="px-3 pt-4 pb-1">
          <button
            onClick={() => navigate("/preview/create-employee")}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:brightness-110 transition-all duration-150"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Create Employee
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to || (to !== "/preview/workspace" && location.pathname.startsWith(to));
            return (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] font-medium transition-all duration-150",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className={cn("w-[15px] h-[15px] flex-shrink-0", isActive && "text-primary")} />
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-sidebar-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sidebar-accent to-sidebar-border flex items-center justify-center">
              <span className="text-[10px] font-semibold text-sidebar-accent-foreground">SC</span>
            </div>
            <div className="min-w-0">
              <span className="text-[12px] font-medium text-sidebar-accent-foreground truncate block">Sarah Chen</span>
              <span className="text-[10px] text-sidebar-muted">Owner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin bg-background">
        <Outlet />
      </main>
    </div>
  );
}
