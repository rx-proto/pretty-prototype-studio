import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import type { ChatMessage } from "./types";

interface Props {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
}

export default function CreatorChat({ messages, onSendMessage, isTyping }: Props) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-[640px] mx-auto px-6 py-8 space-y-6">
          {messages.length === 0 && !isTyping && (
            <div className="flex flex-col items-center justify-center pt-24 text-center">
              <h2 className="text-[20px] font-semibold text-foreground mb-1">What role are you looking to fill?</h2>
              <p className="text-[13px] text-muted-foreground">Describe the employee you need and I'll help shape the role.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <span className="text-[10px] font-bold text-background">A</span>
                </div>
              )}
              <div
                className={`${
                  msg.role === "user"
                    ? "max-w-[75%] bg-foreground text-background rounded-[20px] rounded-br-sm px-4 py-2.5"
                    : "max-w-[85%] text-foreground"
                } text-[13.5px] leading-[1.65]`}
              >
                {msg.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                <span className="text-[10px] font-bold text-background">A</span>
              </div>
              <div className="flex items-center gap-1 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-6 py-4">
        <div className="max-w-[640px] mx-auto">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Describe the role you need…"
              rows={1}
              className="w-full bg-muted/60 border border-border rounded-2xl pl-4 pr-12 py-3 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/20 focus:bg-muted/80 transition-all resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors disabled:opacity-30 disabled:hover:bg-foreground"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
