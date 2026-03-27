import { useState } from "react";
import { workspace, dailySpend, employeeSpend, invoices } from "@/lib/data";
import { EmployeeAvatar } from "@/components/StateBadge";
import { DollarSign, Plus, Receipt, TrendingUp, X, CreditCard, ChevronDown, Check, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const dateRanges = ["This week", "Last 7 days", "Last 30 days", "This month", "Last month"];
const fundAmounts = [50, 100, 250, 500, 1000];

export default function BillingPage() {
  const [dateRange, setDateRange] = useState("This week");
  const [employeeFilter, setEmployeeFilter] = useState<string | null>(null);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [fundStep, setFundStep] = useState<"amount" | "payment" | "success">("amount");
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const filteredSpend = employeeFilter
    ? employeeSpend.filter(e => e.name === employeeFilter)
    : employeeSpend;

  const weeklyTotal = dailySpend.reduce((s, d) => s + d.amount, 0);
  const maxSpend = Math.max(...dailySpend.map(d => d.amount));
  const filteredTotal = filteredSpend.reduce((s, e) => s + e.amount, 0);

  const handleAddFunds = () => {
    setFundStep("amount");
    setFundAmount(100);
    setCustomAmount("");
    setShowAddFunds(true);
  };

  const handlePayment = () => {
    setFundStep("payment");
  };

  const handleConfirmPayment = () => {
    setFundStep("success");
    toast.success(`$${fundAmount.toFixed(2)} added to your balance`);
  };

  const selectedAmount = customAmount ? parseFloat(customAmount) || 0 : fundAmount;

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Your workspace balance and usage</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-3 gap-3 animate-stagger">
        {/* Balance */}
        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <p className="section-label">Balance</p>
            </div>
            <p className="text-[28px] font-bold text-foreground tracking-tight">${workspace.balance.toFixed(2)}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-state-working/[0.08] text-state-working ring-1 ring-inset ring-state-working/20">
              <span className="w-1.5 h-1.5 rounded-full bg-state-working" />
              {workspace.balanceStatus}
            </span>
          </div>
        </div>

        {/* This week */}
        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="section-label">This week</p>
            </div>
            <p className="text-[28px] font-bold text-foreground tracking-tight">${weeklyTotal.toFixed(2)}</p>
            <p className="text-[12px] text-muted-foreground mt-1">${(weeklyTotal / 7).toFixed(2)}/day avg</p>
          </div>
        </div>

        {/* Add funds */}
        <div className="card-premium rounded-xl border border-border p-5 flex flex-col items-center justify-center text-center">
          <button
            onClick={handleAddFunds}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-foreground text-background shadow-sm hover:bg-foreground/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add funds
          </button>
          <p className="text-[11px] text-muted-foreground mt-2">Auto-refill is enabled</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-3 opacity-0 animate-fade-in relative z-30" style={{ animationDelay: "0.1s" }}>
        {/* Date range dropdown */}
        <div className="relative z-30">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-[12px] font-medium text-foreground hover:bg-muted/40 transition-colors"
          >
            {dateRange}
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          {showDateDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDateDropdown(false)} />
              <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-xl shadow-lg py-1 min-w-[160px]">
                {dateRanges.map(r => (
                  <button
                    key={r}
                    onClick={() => { setDateRange(r); setShowDateDropdown(false); }}
                    className={`w-full text-left px-3.5 py-2 text-[12px] hover:bg-muted/40 transition-colors ${r === dateRange ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Employee filter pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setEmployeeFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${!employeeFilter ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            All employees
          </button>
          {employeeSpend.map(e => (
            <button
              key={e.name}
              onClick={() => setEmployeeFilter(employeeFilter === e.name ? null : e.name)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${employeeFilter === e.name ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              {e.name}
            </button>
          ))}
        </div>
      </div>

      {/* Spend chart */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.15s" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold text-foreground">Daily spend — {dateRange.toLowerCase()}</h2>
          <span className="text-[12px] font-medium text-muted-foreground">${weeklyTotal.toFixed(2)} total</span>
        </div>
        <div className="flex items-end gap-2 h-[140px]">
          {dailySpend.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 group cursor-default">
              <span className="text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">${d.amount.toFixed(2)}</span>
              <div
                className="w-full rounded-t-md bg-primary/[0.15] relative overflow-hidden group-hover:bg-primary/[0.25] transition-colors duration-200"
                style={{ height: `${(d.amount / maxSpend) * 100 + 8}px` }}
              >
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-primary/[0.1] rounded-t-md" />
              </div>
              <div className="text-center">
                <span className="text-[10px] font-medium text-muted-foreground block">{d.day}</span>
                <span className="text-[9px] text-muted-foreground/60">{d.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spend by employee */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.25s" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-foreground">
            Spend by employee {employeeFilter && <span className="text-muted-foreground font-normal">— {employeeFilter}</span>}
          </h2>
          <span className="text-[12px] font-medium text-muted-foreground">${filteredTotal.toFixed(2)}</span>
        </div>
        <div className="space-y-3">
          {filteredSpend.map((emp) => (
            <button
              key={emp.name}
              onClick={() => setEmployeeFilter(employeeFilter === emp.name ? null : emp.name)}
              className="flex items-center gap-3 w-full text-left group"
            >
              <EmployeeAvatar name={emp.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors">{emp.name}</span>
                  <span className="text-[12px] font-mono font-medium text-foreground">${emp.amount.toFixed(2)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors duration-200"
                    style={{ width: `${(emp.amount / employeeSpend[0].amount) * 100}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.35s" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-[13px] font-semibold text-foreground">Invoices</h2>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export all
          </button>
        </div>
        <div className="space-y-0">
          {invoices.map((inv, i) => (
            <div key={inv.id} className={`flex items-center justify-between py-3 ${i < invoices.length - 1 ? "border-b border-border/60" : ""}`}>
              <div>
                <p className="text-[13px] font-medium text-foreground">{inv.description}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[13px] font-mono font-medium text-foreground">${inv.amount.toFixed(2)}</p>
                  <span className="text-[10px] font-medium text-state-working capitalize">{inv.status}</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Funds Dialog */}
      <Dialog open={showAddFunds} onOpenChange={setShowAddFunds}>
        <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden">
          {fundStep === "amount" && (
            <div className="p-6">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-[18px] font-bold tracking-tight">Add funds</DialogTitle>
                <DialogDescription className="text-[13px] text-muted-foreground">
                  Choose an amount to add to your workspace balance.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {fundAmounts.map(amt => (
                  <button
                    key={amt}
                    onClick={() => { setFundAmount(amt); setCustomAmount(""); }}
                    className={`py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                      fundAmount === amt && !customAmount
                        ? "bg-foreground text-background shadow-sm"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-muted-foreground">$</span>
                  <Input
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); }}
                    placeholder="Other"
                    className="h-full pl-7 text-[14px] font-semibold text-center rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-muted-foreground">Current balance</span>
                  <span className="font-medium text-foreground">${workspace.balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-muted-foreground">Adding</span>
                  <span className="font-medium text-foreground">+ ${selectedAmount.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between text-[13px]">
                  <span className="font-semibold text-foreground">New balance</span>
                  <span className="font-bold text-foreground">${(workspace.balance + selectedAmount).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={selectedAmount <= 0}
                className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all shadow-md shadow-primary/20 disabled:opacity-40 disabled:pointer-events-none"
              >
                Continue to payment
              </button>
            </div>
          )}

          {fundStep === "payment" && (
            <div className="p-6">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-[18px] font-bold tracking-tight">Payment details</DialogTitle>
                <DialogDescription className="text-[13px] text-muted-foreground">
                  Enter your card information to add ${selectedAmount.toFixed(2)}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3.5 mb-6">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">Card number</label>
                  <div className="relative">
                    <Input defaultValue="4242 4242 4242 4242" className="h-10 text-[13px] font-mono pr-12" />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium text-muted-foreground">Expiry</label>
                    <Input defaultValue="12/26" className="h-10 text-[13px] font-mono" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium text-muted-foreground">CVC</label>
                    <Input defaultValue="123" className="h-10 text-[13px] font-mono" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">Name on card</label>
                  <Input defaultValue="Sarah Chen" className="h-10 text-[13px]" />
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <div className="flex justify-between text-[13px]">
                  <span className="text-muted-foreground">Total charge</span>
                  <span className="font-bold text-foreground">${selectedAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setFundStep("amount")}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-medium text-foreground border border-border hover:bg-muted/40 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all shadow-md shadow-primary/20"
                >
                  Pay ${selectedAmount.toFixed(2)}
                </button>
              </div>
            </div>
          )}

          {fundStep === "success" && (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-state-working/[0.08] flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-state-working" />
              </div>
              <h3 className="text-[18px] font-bold text-foreground tracking-tight mb-1">Payment successful</h3>
              <p className="text-[13px] text-muted-foreground mb-6">
                ${selectedAmount.toFixed(2)} has been added to your balance.
              </p>
              <button
                onClick={() => setShowAddFunds(false)}
                className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all shadow-md shadow-primary/20"
              >
                Done
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
