import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layers, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const features = [
  "Hire AI employees that work 24/7",
  "Connected to Slack, Lark, Email & more",
  "Skills marketplace — equip any capability",
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<"login" | "signup">(searchParams.get("tab") === "signup" ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(tab === "login" ? "Welcome back!" : "Account created!");
    navigate("/app/home");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-[480px] flex-shrink-0 sidebar-gradient flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-state-accent/[0.04] blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-20 animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-sidebar-accent flex items-center justify-center">
              <Layers className="w-4 h-4 text-sidebar-primary" />
            </div>
            <span className="text-[16px] font-bold text-sidebar-primary tracking-tight">Agens.run</span>
          </div>
          <h2 className="text-[30px] font-bold text-sidebar-primary leading-[1.15] tracking-tight mb-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Hire AI employees
            <br />
            <span className="font-display italic font-normal text-sidebar-muted">that actually work</span>
          </h2>
          <p className="text-[14px] text-sidebar-muted leading-relaxed mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            Build your AI workforce in minutes. No training, no babysitting — just results.
          </p>
          <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-sidebar-accent-foreground" />
                </div>
                <span className="text-[13px] text-sidebar-accent-foreground">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-[11px] text-sidebar-muted">© 2025 Agens.run</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[380px] relative z-10">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Layers className="w-4 h-4 text-background" />
            </div>
            <span className="text-[15px] font-bold text-foreground tracking-tight">Agens.run</span>
          </div>

          <div className="flex gap-1 p-1 rounded-xl bg-muted mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <button onClick={() => setTab("login")} className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${tab === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              Login
            </button>
            <button onClick={() => setTab("signup")} className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${tab === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              Sign up
            </button>
          </div>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-[24px] font-bold text-foreground tracking-tight mb-1">
              {tab === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-[13px] text-muted-foreground mb-7">
              {tab === "login" ? "Sign in to your workspace" : "Start building your AI workforce"}
            </p>

            <button className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-card text-[13px] font-medium text-foreground hover:bg-muted/50 hover:border-border/80 transition-all duration-200 mb-5 shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {tab === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">Name</label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="h-10 text-[13px]" />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-muted-foreground">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="h-10 text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-muted-foreground">Password</label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="h-10 text-[13px]" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all shadow-md shadow-primary/20 mt-2">
                {tab === "login" ? "Sign in" : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
