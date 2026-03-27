import { useState, useMemo } from "react";
import { workspace, dailySpend, employeeSpend, employeeColors, invoices } from "@/lib/data";
import { EmployeeAvatar } from "@/components/StateBadge";
import { DollarSign, Plus, Receipt, TrendingUp, X, CreditCard, ChevronDown, Check, Download, CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, isWithinInterval } from "date-fns";
import { toast } from "sonner";
import type { DateRange } from "react-day-picker";

const presetRanges = [
  { label: "This week", getRange: () => ({ from: startOfWeek(new Date(2026, 2, 27), { weekStartsOn: 1 }), to: new Date(2026, 2, 27) }) },
  { label: "Last 7 days", getRange: () => ({ from: subDays(new Date(2026, 2, 27), 6), to: new Date(2026, 2, 27) }) },
  { label: "Last 30 days", getRange: () => ({ from: subDays(new Date(2026, 2, 27), 29), to: new Date(2026, 2, 27) }) },
  { label: "This month", getRange: () => ({ from: startOfMonth(new Date(2026, 2, 27)), to: new Date(2026, 2, 27) }) },
  { label: "Last month", getRange: () => ({ from: startOfMonth(subMonths(new Date(2026, 2, 27), 1)), to: endOfMonth(subMonths(new Date(2026, 2, 27), 1)) }) },
];

const fundAmounts = [50, 100, 250, 500, 1000];

export default function BillingPage() {
  const [dateLabel, setDateLabel] = useState("This week");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(presetRanges[0].getRange());
  const [employeeFilter, setEmployeeFilter] = useState<string | null>(null);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [fundStep, setFundStep] = useState<"amount" | "payment" | "success">("amount");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const VISIBLE_COUNT = 5;

  // Filter daily data by date range
  const filteredDays = useMemo(() => {
    if (!dateRange?.from) return dailySpend;
    return dailySpend.filter(d => {
      const to = dateRange.to || dateRange.from!;
      return isWithinInterval(d.dateObj, { start: dateRange.from!, end: to });
    });
  }, [dateRange]);

  // Compute employee totals for the selected date range
  const rangeEmployeeSpend = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const d of filteredDays) {
      for (const [name, amt] of Object.entries(d.byEmployee)) {
        totals[name] = (totals[name] || 0) + amt;
      }
    }
    return Object.entries(totals)
      .map(([name, amount]) => ({ name, amount: parseFloat(amount.toFixed(2)) }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredDays]);

  // If employee filter active, further filter
  const displayEmployees = employeeFilter
    ? rangeEmployeeSpend.filter(e => e.name === employeeFilter)
    : rangeEmployeeSpend;

  const rangeTotal = useMemo(() => {
    if (employeeFilter) {
      return filteredDays.reduce((s, d) => s + (d.byEmployee[employeeFilter] || 0), 0);
    }
    return filteredDays.reduce((s, d) => s + d.amount, 0);
  }, [filteredDays, employeeFilter]);

  const dailyAvg = filteredDays.length > 0 ? rangeTotal / filteredDays.length : 0;

  // Chart data: get per-employee breakdown for each day, filtered by employee
  const chartData = useMemo(() => {
    const activeEmployees = employeeFilter
      ? [employeeFilter]
      : rangeEmployeeSpend.map(e => e.name);
    
    return filteredDays.map(d => {
      const segments: { name: string; value: number; color: string }[] = [];
      for (const name of activeEmployees) {
        const val = d.byEmployee[name] || 0;
        if (val > 0) segments.push({ name, value: val, color: employeeColors[name] || "hsl(0,0%,70%)" });
      }
      const total = segments.reduce((s, seg) => s + seg.value, 0);
      return { ...d, segments, total };
    });
  }, [filteredDays, employeeFilter, rangeEmployeeSpend]);

  const maxSpend = Math.max(...chartData.map(d => d.total), 1);

  const handlePreset = (preset: typeof presetRanges[0]) => {
    setDateRange(preset.getRange());
    setDateLabel(preset.label);
    setShowDateDropdown(false);
  };

  const handleCustomDate = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setDateLabel(`${format(range.from, "MMM d")} – ${format(range.to, "MMM d")}`);
    } else if (range?.from) {
      setDateLabel(format(range.from, "MMM d"));
    }
  };

  const handleAddFunds = () => {
    setFundStep("amount");
    setFundAmount(100);
    setCustomAmount("");
    setShowAddFunds(true);
  };
  const handlePayment = () => setFundStep("payment");
  const handleConfirmPayment = () => {
    setFundStep("success");
    toast.success(`$${fundAmount.toFixed(2)} added to your balance`);
  };
  const selectedAmount = customAmount ? parseFloat(customAmount) || 0 : fundAmount;

  // Date range display label
  const dateRangeDisplay = dateLabel;

  return (
    <div className="p-8 max-w-[960px] mx-auto space-y-6">
      <div className="pt-2 opacity-0 animate-fade-in">
        <h1 className="text-[24px] font-bold text-foreground tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Your workspace balance and usage</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-3 gap-3 animate-stagger">
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

        <div className="card-premium rounded-xl border border-border p-5 relative noise-overlay">
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="section-label">{dateRangeDisplay}</p>
            </div>
            <p className="text-[28px] font-bold text-foreground tracking-tight">${rangeTotal.toFixed(2)}</p>
            <p className="text-[12px] text-muted-foreground mt-1">${dailyAvg.toFixed(2)}/day avg</p>
          </div>
        </div>

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
        {/* Date range dropdown with presets + calendar */}
        <div className="relative z-30">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-[12px] font-medium text-foreground hover:bg-muted/40 transition-colors"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
            {dateRangeDisplay}
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          {showDateDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => { setShowDateDropdown(false); setShowCalendar(false); }} />
              <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-xl shadow-lg py-1 min-w-[200px]">
                {presetRanges.map(r => (
                  <button
                    key={r.label}
                    onClick={() => handlePreset(r)}
                    className={`w-full text-left px-3.5 py-2 text-[12px] hover:bg-muted/40 transition-colors ${r.label === dateLabel ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {r.label}
                  </button>
                ))}
                <div className="h-px bg-border mx-2 my-1" />
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <button className="w-full text-left px-3.5 py-2 text-[12px] text-muted-foreground hover:bg-muted/40 transition-colors flex items-center gap-2">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      Custom range…
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start" side="right" sideOffset={8}>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                        handleCustomDate(range);
                        if (range?.from && range?.to) {
                          setShowCalendar(false);
                          setShowDateDropdown(false);
                        }
                      }}
                      numberOfMonths={2}
                      defaultMonth={new Date(2026, 1)}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
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
          {(showAllEmployees ? rangeEmployeeSpend : rangeEmployeeSpend.slice(0, VISIBLE_COUNT)).map(e => (
            <button
              key={e.name}
              onClick={() => setEmployeeFilter(employeeFilter === e.name ? null : e.name)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 ${employeeFilter === e.name ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: employeeColors[e.name] }} />
              {e.name}
            </button>
          ))}
          {rangeEmployeeSpend.length > VISIBLE_COUNT && (
            <button
              onClick={() => setShowAllEmployees(!showAllEmployees)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              {showAllEmployees ? "Show less" : `+${rangeEmployeeSpend.length - VISIBLE_COUNT} more`}
            </button>
          )}
        </div>
      </div>

      {/* Unified spend chart + employee breakdown */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.15s" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold text-foreground">
            Daily spend — {dateRangeDisplay.toLowerCase()}
            {employeeFilter && <span className="text-muted-foreground font-normal ml-1">· {employeeFilter}</span>}
          </h2>
          <span className="text-[12px] font-medium text-muted-foreground">${rangeTotal.toFixed(2)} total</span>
        </div>

        {/* Stacked bar chart */}
        <div className="flex items-end gap-[3px] h-[160px] mb-6">
          {chartData.map((d, i) => {
            const totalH = (d.total / maxSpend) * 140 + 8;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-default min-w-0">
                <span className="text-[9px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  ${d.total.toFixed(0)}
                </span>
                <div className="w-full flex flex-col rounded-t-[4px] overflow-hidden" style={{ height: `${totalH}px` }}>
                  {d.segments.map((seg, j) => (
                    <div
                      key={j}
                      className="w-full transition-opacity duration-200 group-hover:opacity-80"
                      style={{
                        height: `${(seg.value / d.total) * 100}%`,
                        background: seg.color,
                        opacity: 0.55,
                      }}
                    />
                  ))}
                </div>
                {/* Show date label for first, last, and every ~7th */}
                {(i === 0 || i === chartData.length - 1 || (chartData.length <= 14) || (i % Math.ceil(chartData.length / 7) === 0)) ? (
                  <div className="text-center">
                    <span className="text-[8px] text-muted-foreground/60 block truncate">{d.date}</span>
                  </div>
                ) : (
                  <div className="h-[12px]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend (top employees) */}
        <div className="flex items-center gap-3 flex-wrap mb-5 pb-5 border-b border-border/60">
          {(employeeFilter ? displayEmployees : rangeEmployeeSpend.slice(0, 6)).map(e => (
            <span key={e.name} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-[3px] flex-shrink-0" style={{ background: employeeColors[e.name], opacity: 0.7 }} />
              {e.name}
            </span>
          ))}
          {!employeeFilter && rangeEmployeeSpend.length > 6 && (
            <span className="text-[10px] text-muted-foreground/60">+{rangeEmployeeSpend.length - 6} more</span>
          )}
        </div>

        {/* Employee breakdown rows */}
        <div className="space-y-2.5">
          {displayEmployees.map((emp) => {
            const maxEmp = rangeEmployeeSpend[0]?.amount || 1;
            return (
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
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(emp.amount / maxEmp) * 100}%`,
                        background: employeeColors[emp.name],
                        opacity: 0.5,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Invoices */}
      <div className="card-premium rounded-xl border border-border p-5 opacity-0 animate-fade-in" style={{ animationDelay: "0.25s" }}>
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
                    onChange={e => setCustomAmount(e.target.value)}
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
