import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Globe, Users, Layers } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-state-accent/[0.03] blur-3xl" />
      </div>

      {/* Nav */}
      <header className="relative flex items-center justify-between px-8 py-5 max-w-[1120px] mx-auto animate-fade-in">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <Layers className="w-4 h-4 text-background" />
          </div>
          <span className="text-[15px] font-bold text-foreground tracking-tight">Agens.run</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/auth")} className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            Login
          </button>
          <button onClick={() => navigate("/auth?tab=signup")} className="text-[13px] font-semibold text-background bg-foreground hover:bg-foreground/90 transition-all px-5 py-2 rounded-lg">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-[1120px] mx-auto px-8 pt-24 pb-28 text-center">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-[12px] font-medium mb-8 ring-1 ring-inset ring-border">
            AI-powered workforce automation
          </div>
        </div>
        <h1 className="text-[52px] font-bold text-foreground tracking-tight leading-[1.08] max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Your AI workforce,
          <br />
          <span className="font-display italic font-normal text-muted-foreground">always on</span>
        </h1>
        <p className="text-[17px] text-muted-foreground mt-6 max-w-md mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          Hire AI employees that monitor, analyze, and act across your tools — so your team can focus on what matters.
        </p>
        <div className="flex items-center justify-center gap-3 mt-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <button onClick={() => navigate("/auth?tab=signup")} className="text-[14px] font-semibold text-background bg-foreground hover:bg-foreground/90 transition-all px-7 py-3 rounded-xl flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => navigate("/auth")} className="text-[14px] font-medium text-foreground bg-card hover:bg-accent transition-colors px-7 py-3 rounded-xl border border-border shadow-sm">
            Login
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="relative max-w-[1120px] mx-auto px-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-stagger">
          <div className="card-premium rounded-2xl border border-border p-8 relative noise-overlay group">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-5 group-hover:bg-state-working/[0.08] transition-colors duration-300">
              <Users className="w-5 h-5 text-muted-foreground group-hover:text-state-working transition-colors duration-300" />
            </div>
            <h3 className="text-[16px] font-semibold text-foreground mb-2">Durable employees</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Employees that persist, learn, and improve over time — not one-off prompts that forget everything.
            </p>
          </div>
          <div className="card-premium rounded-2xl border border-border p-8 relative noise-overlay group">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-5 group-hover:bg-primary/[0.08] transition-colors duration-300">
              <Zap className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <h3 className="text-[16px] font-semibold text-foreground mb-2">Event-driven</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Employees wake up when something happens — a message, a webhook, a schedule — and act autonomously.
            </p>
          </div>
          <div className="card-premium rounded-2xl border border-border p-8 relative noise-overlay group">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-5 group-hover:bg-state-accent/[0.08] transition-colors duration-300">
              <Globe className="w-5 h-5 text-muted-foreground group-hover:text-state-accent transition-colors duration-300" />
            </div>
            <h3 className="text-[16px] font-semibold text-foreground mb-2">Connected to your tools</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Slack, Lark, Email, Salesforce — your employees work where your team already works.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border py-8 text-center">
        <p className="text-[11px] text-muted-foreground">© 2025 Agens.run</p>
      </footer>
    </div>
  );
}
