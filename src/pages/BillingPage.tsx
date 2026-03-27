import { workspace } from "@/lib/data";
import { Wallet, Plus } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="p-8 max-w-[680px] mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Your workspace credits and usage</p>
      </div>

      {/* Balance card */}
      <div className="card-premium rounded-xl border border-border p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        <p className="section-label mb-2">Credits remaining</p>
        <p className="text-[42px] font-bold text-foreground tracking-tight">{workspace.creditsLeft.toLocaleString()}</p>
        <span className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-medium px-3 py-1 rounded-full bg-state-working/8 text-state-working ring-1 ring-inset ring-state-working/20">
          <span className="w-1.5 h-1.5 rounded-full bg-state-working" />
          {workspace.creditStatus}
        </span>
        <div className="mt-6">
          <button className="flex items-center gap-1.5 mx-auto px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all">
            <Plus className="w-4 h-4" />
            Add credits
          </button>
        </div>
      </div>

      {/* Simple usage info */}
      <div className="card-premium rounded-xl border border-border p-5">
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
