import { workspace } from "@/lib/data";
import { Wallet, Plus } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="p-8 max-w-[680px] mx-auto space-y-6">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Your workspace credits and usage</p>
      </div>

      {/* Balance card */}
      <div className="card-premium rounded-xl border border-border p-8 text-center relative noise-overlay opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-primary/[0.06] flex items-center justify-center mx-auto mb-5">
            <Wallet className="w-7 h-7 text-primary" />
          </div>
          <p className="section-label mb-2">Credits remaining</p>
          <p className="text-[48px] font-bold text-foreground tracking-tight leading-none">{workspace.creditsLeft.toLocaleString()}</p>
          <span className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-medium px-3 py-1 rounded-full bg-state-working/[0.08] text-state-working ring-1 ring-inset ring-state-working/20">
            <span className="w-1.5 h-1.5 rounded-full bg-state-working animate-pulse-dot" />
            {workspace.creditStatus}
          </span>
          <div className="mt-7">
            <button className="flex items-center gap-1.5 mx-auto px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all">
              <Plus className="w-4 h-4" />
              Add credits
            </button>
          </div>
        </div>
      </div>

      {/* Simple usage info */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-[13px] font-semibold text-foreground mb-3">This week</h2>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Employees active</span>
            <span className="font-medium text-foreground">{workspace.employeesWorking}</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Credits used</span>
            <span className="font-medium text-foreground">418</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Auto-refill</span>
            <span className="font-medium text-state-working">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
