import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { CreatorStep, ChatMessage, EmployeeDraft } from "@/components/create-employee/types";
import { syntheticChat, draftSnapshots, finalDraft } from "@/components/create-employee/syntheticSession";
import TemplateSelect from "@/components/create-employee/TemplateSelect";
import CreatorChat from "@/components/create-employee/CreatorChat";
import EmployeePreviewPanel from "@/components/create-employee/EmployeePreviewPanel";
import ActivatedView from "@/components/create-employee/ActivatedView";

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<CreatorStep>("templates");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentDraft, setCurrentDraft] = useState<Partial<EmployeeDraft>>({});
  const [chatIndex, setChatIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const advanceChat = useCallback((fromIndex: number) => {
    const idx = fromIndex;
    if (idx < syntheticChat.length && syntheticChat[idx].role === "assistant") {
      setIsTyping(true);
      setTimeout(() => {
        const msg = syntheticChat[idx];
        setMessages((prev) => [...prev, msg]);
        setIsTyping(false);
        const snapshot = draftSnapshots.find((s) => s.afterMessageId === msg.id);
        if (snapshot) setCurrentDraft(snapshot.draft);
        setChatIndex(idx + 1);
      }, 1200);
    }
  }, []);

  const startSession = useCallback((initialMessage?: string) => {
    setStep("session");
    setMessages([]);
    setChatIndex(0);
    setCurrentDraft({});
    setIsTyping(true);
    setTimeout(() => {
      const firstMsg = syntheticChat[0];
      setMessages([firstMsg]);
      setIsTyping(false);
      setChatIndex(1);

      // If user typed a message on the template page, auto-send it
      if (initialMessage) {
        setTimeout(() => handleSendMessage(initialMessage), 400);
      }
    }, 800);
  }, []);

  const handleSendMessage = useCallback((text: string) => {
    const nextUserIdx = chatIndex;
    if (nextUserIdx < syntheticChat.length && syntheticChat[nextUserIdx].role === "user") {
      const userMsg: ChatMessage = { ...syntheticChat[nextUserIdx], content: text };
      setMessages((prev) => [...prev, userMsg]);
      const snapshot = draftSnapshots.find((s) => s.afterMessageId === userMsg.id);
      if (snapshot) setCurrentDraft(snapshot.draft);
      setChatIndex(nextUserIdx + 1);
      setTimeout(() => advanceChat(nextUserIdx + 1), 300);
    } else {
      setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: "user", content: text }]);
    }
  }, [chatIndex, advanceChat]);

  const handleConfirm = () => {
    setStep("activated");
    toast.success("Employee created and activated!");
  };

  const isSessionComplete = chatIndex >= syntheticChat.length && !isTyping;
  const hasDraft = !!(currentDraft.name || currentDraft.jobDescription);

  if (step === "activated") return <ActivatedView draft={finalDraft} />;
  if (step === "templates") {
    return (
      <TemplateSelect
        onSelectTemplate={(id) => startSession()}
        onStartWithMessage={(text) => startSession(text)}
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-background">
        <button onClick={() => setStep("templates")} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <div className="w-px h-4 bg-border" />
        <h2 className="text-[13px] font-semibold text-foreground">Creator session</h2>
      </div>

      {/* Split pane — preview only appears when draft exists */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 min-w-0">
          <CreatorChat messages={messages} onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
        {hasDraft && (
          <div className="w-[320px] flex-shrink-0 animate-fade-in">
            <EmployeePreviewPanel draft={currentDraft} onConfirm={handleConfirm} showConfirm={isSessionComplete} />
          </div>
        )}
      </div>
    </div>
  );
}
