import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Paperclip, Bot, User, FileText, CheckCircle2 } from "lucide-react";
import { EmployeeAvatar } from "@/components/StateBadge";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "task-card" | "file";
  taskCard?: { title: string; status: "completed" | "in-progress" | "pending"; detail: string };
}

// Synthetic conversation data per employee
const syntheticChats: Record<string, ChatMessage[]> = {
  "maya-competitive-intel": [
    { id: "m1", role: "assistant", content: "I've finished scanning Competitor A's pricing page. They've introduced a new Enterprise tier at $899/mo — that's 15% below our equivalent plan.", timestamp: new Date(Date.now() - 3 * 3600000), type: "text" },
    { id: "m2", role: "user", content: "Can you compile a full comparison across all three competitors?", timestamp: new Date(Date.now() - 2.5 * 3600000), type: "text" },
    { id: "m3", role: "assistant", content: "Sure! I'll compare pricing tiers, feature sets, and any recent changes. Give me about 20 minutes.", timestamp: new Date(Date.now() - 2.4 * 3600000), type: "text" },
    { id: "m4", role: "assistant", content: "", timestamp: new Date(Date.now() - 2 * 3600000), type: "task-card", taskCard: { title: "Q1 Competitor Pricing Matrix", status: "completed", detail: "3 competitors × 12 tiers analyzed. Report shared to #competitive-intel." } },
    { id: "m5", role: "assistant", content: "The comparison is ready. Key findings:\n\n- **Competitor A** dropped Enterprise pricing by 15%\n- **Competitor B** launched an AI add-on at $49/seat\n- **Competitor C** removed their free tier entirely\n\nWant me to draft talking points for the sales team?", timestamp: new Date(Date.now() - 1.9 * 3600000), type: "text" },
    { id: "m6", role: "user", content: "Yes, please draft those talking points and also flag if any of our customers might be at risk.", timestamp: new Date(Date.now() - 1.5 * 3600000), type: "text" },
    { id: "m7", role: "assistant", content: "On it. I'll cross-reference the pricing changes with our customer segments and identify high-risk accounts. Should have this ready within the hour.", timestamp: new Date(Date.now() - 1.4 * 3600000), type: "text" },
  ],
  "kai-ai-pm": [
    { id: "m1", role: "assistant", content: "Good morning! I've triaged 12 new issues overnight. 4 need immediate attention — I've flagged them as P0.", timestamp: new Date(Date.now() - 5 * 3600000), type: "text" },
    { id: "m2", role: "user", content: "Which ones are P0? Give me a quick summary.", timestamp: new Date(Date.now() - 4.5 * 3600000), type: "text" },
    { id: "m3", role: "assistant", content: "Here's the rundown:\n\n1. **API latency spike** — 95th percentile up 3x since last deploy\n2. **Auth flow broken** on Safari 17.4\n3. **Billing webhook** failing silently for Stripe EU\n4. **Dashboard crash** when loading >500 rows\n\nI've already assigned owners for #1 and #2. Want me to escalate #3 to the payments team?", timestamp: new Date(Date.now() - 4.3 * 3600000), type: "text" },
    { id: "m4", role: "user", content: "Yes, escalate #3 and add me as a watcher.", timestamp: new Date(Date.now() - 4 * 3600000), type: "text" },
    { id: "m5", role: "assistant", content: "", timestamp: new Date(Date.now() - 3.8 * 3600000), type: "task-card", taskCard: { title: "Escalate Stripe EU webhook issue", status: "completed", detail: "Assigned to payments team. You've been added as watcher." } },
  ],
  "vera-analyst": [
    { id: "m1", role: "assistant", content: "I've updated the portfolio memos with Q4 earnings data. Three companies had significant revisions:\n\n- **ACME Corp**: Revenue beat by 8%, raised guidance\n- **TechFlow**: Missed EPS by $0.12, stock down 6%\n- **GreenPower**: Record quarter, expanding into APAC", timestamp: new Date(Date.now() - 5 * 3600000), type: "text" },
    { id: "m2", role: "user", content: "Pull the full financial breakdown for TechFlow. What happened?", timestamp: new Date(Date.now() - 4 * 3600000), type: "text" },
    { id: "m3", role: "assistant", content: "TechFlow's miss was driven by:\n\n1. **R&D spending** up 34% YoY (AI infrastructure build-out)\n2. **Customer churn** in SMB segment: 4.2% vs 2.8% prior quarter\n3. **FX headwinds** from EUR weakness\n\nManagement reiterated full-year targets, citing expected H2 enterprise deals. Should I update the risk assessment?", timestamp: new Date(Date.now() - 3.5 * 3600000), type: "text" },
  ],
};

function getDefaultChat(employeeName: string): ChatMessage[] {
  return [
    { id: "default-1", role: "assistant", content: `Hi! I'm ${employeeName}. How can I help you today?`, timestamp: new Date(Date.now() - 60000), type: "text" },
  ];
}

function formatMsgTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Simple markdown-like rendering (bold, inline code, lists, line breaks)
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, li) => {
    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s\*\*(.*?)\*\*\s*[—–-]\s*(.*)/);
    if (numMatch) {
      elements.push(
        <div key={li} className="flex gap-2 py-0.5">
          <span className="text-muted-foreground flex-shrink-0">{numMatch[1]}.</span>
          <span><strong className="text-foreground">{numMatch[2]}</strong> <span className="text-muted-foreground">— {numMatch[3]}</span></span>
        </div>
      );
      return;
    }
    // Bullet with bold
    const bulletBold = line.match(/^-\s\*\*(.*?)\*\*[:\s]*(.*)/);
    if (bulletBold) {
      elements.push(
        <div key={li} className="flex gap-2 py-0.5 pl-1">
          <span className="text-muted-foreground">•</span>
          <span><strong className="text-foreground">{bulletBold[1]}</strong>{bulletBold[2] ? `: ${bulletBold[2]}` : ""}</span>
        </div>
      );
      return;
    }
    // Simple bullet
    if (line.startsWith("- ")) {
      elements.push(
        <div key={li} className="flex gap-2 py-0.5 pl-1">
          <span className="text-muted-foreground">•</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
      return;
    }
    // Empty line
    if (line.trim() === "") {
      elements.push(<div key={li} className="h-2" />);
      return;
    }
    // Normal text
    elements.push(<p key={li} className="leading-relaxed">{renderInline(line)}</p>);
  });

  return elements;
}

function renderInline(text: string) {
  // Handle **bold** and `code`
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="px-1 py-0.5 rounded bg-muted text-[11px] font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

interface MessagesPanelProps {
  employeeId: string;
  employeeName: string;
}

export function MessagesPanel({ employeeId, employeeName }: MessagesPanelProps) {
  const initial = syntheticChats[employeeId] || getDefaultChat(employeeName);
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
      type: "text",
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AIE response
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: getSimulatedReply(text, employeeName),
        timestamp: new Date(),
        type: "text",
      };
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="card-premium rounded-xl border border-border overflow-hidden flex flex-col h-full">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}>
            {msg.role === "assistant" ? (
              <EmployeeAvatar name={employeeName} size="sm" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            )}
            <div className={cn("max-w-[80%] min-w-0", msg.role === "user" ? "items-end" : "")}>
              {msg.type === "task-card" && msg.taskCard ? (
                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-state-working flex-shrink-0" />
                    <span className="text-[12px] font-semibold text-foreground">{msg.taskCard.title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{msg.taskCard.detail}</p>
                  <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-state-working/10 text-state-working capitalize">
                    {msg.taskCard.status}
                  </span>
                </div>
              ) : (
                <div className={cn(
                  "rounded-2xl px-4 py-2.5 text-[13px]",
                  msg.role === "user"
                    ? "bg-foreground text-background rounded-br-lg"
                    : "bg-muted/50 text-foreground rounded-bl-lg"
                )}>
                  {renderContent(msg.content)}
                </div>
              )}
              <span className={cn(
                "text-[10px] text-muted-foreground/50 mt-1 block",
                msg.role === "user" ? "text-right" : ""
              )}>
                {formatMsgTime(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <EmployeeAvatar name={employeeName} size="sm" />
            <div className="rounded-2xl rounded-bl-lg bg-muted/50 px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${employeeName}…`}
            className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              "p-2 rounded-lg transition-all",
              input.trim()
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "text-muted-foreground/30"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function getSimulatedReply(userMessage: string, employeeName: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("status") || lower.includes("update")) {
    return `Everything's running smoothly. I'm currently working on the tasks from earlier today. No blockers at the moment — I'll ping you if anything comes up.`;
  }
  if (lower.includes("stop") || lower.includes("pause")) {
    return `Got it, I'll pause my current tasks. Let me know when you'd like me to resume.`;
  }
  if (lower.includes("report") || lower.includes("summary")) {
    return `I'll put together a summary for you. Give me a few minutes to compile the latest data.`;
  }
  if (lower.includes("help") || lower.includes("can you")) {
    return `Of course! I'm ready to help. Could you give me a bit more detail about what you need? The more context you share, the better I can assist.`;
  }
  return `Understood — I'll take care of that. Is there anything specific you'd like me to prioritize, or should I use my best judgment?`;
}
