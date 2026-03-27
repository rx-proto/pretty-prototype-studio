import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Users, Zap, Link2, CreditCard, Settings } from "lucide-react";
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-sidebar flex flex-col border-r border-sidebar-border">
        {/* Workspace header */}
        <div className="px-4 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sidebar-primary truncate">{workspace.name}</p>
              <p className="text-xs text-sidebar-muted">{workspace.workspaceCountLabel}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-[10px] font-medium text-sidebar-accent-foreground">SC</span>
            </div>
            <span className="text-xs text-sidebar-foreground truncate">Sarah Chen</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <Outlet />
      </main>
    </div>
  );
}
