import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Zap, Globe, Users } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 max-w-[1120px] mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-state-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-[15px] font-bold text-foreground tracking-tight">Agens.run</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/auth")} className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            Login
          </button>
          <button onClick={() => navigate("/auth?tab=signup")} className="text-[13px] font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all px-5 py-2 rounded-lg shadow-md shadow-primary/20">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-8 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/6 text-primary text-[12px] font-medium mb-6 ring-1 ring-inset ring-primary/10">
          <Sparkles className="w-3.5 h-3.5" />
          AI Employees for your team
        </div>
        <h1 className="text-[48px] font-bold text-foreground tracking-tight leading-[1.1] max-w-2xl mx-auto">
          Your AI workforce,<br />always on
        </h1>
        <p className="text-[17px] text-muted-foreground mt-5 max-w-lg mx-auto leading-relaxed">
          Hire AI employees that monitor, analyze, and act across your tools — so your team can focus on what matters.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => navigate("/auth?tab=signup")} className="text-[14px] font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all px-7 py-3 rounded-xl shadow-lg shadow-primary/25 flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => navigate("/auth")} className="text-[14px] font-medium text-foreground bg-secondary hover:bg-accent transition-colors px-7 py-3 rounded-xl border border-border">
            Login
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1120px] mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card-premium rounded-2xl border border-border p-7">
            <div className="w-11 h-11 rounded-xl bg-state-working/10 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-state-working" />
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-2">Durable employees</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              AI employees that persist, learn, and improve over time — not one-off prompts.
            </p>
          </div>
          <div className="card-premium rounded-2xl border border-border p-7">
            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-2">Event-driven</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Employees wake up when something happens — a message, a webhook, a schedule — and act.
            </p>
          </div>
          <div className="card-premium rounded-2xl border border-border p-7">
            <div className="w-11 h-11 rounded-xl bg-state-accent/10 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-state-accent" />
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-2">Connected to your tools</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Slack, Lark, Email, Salesforce — your AI employees work where you work.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-[12px] text-muted-foreground">© 2025 Agens.run · AI employees for modern teams</p>
      </footer>
    </div>
  );
}
