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
    // Find next assistant message to show
    const nextMessages: ChatMessage[] = [];
    let idx = fromIndex;

    // Add the next assistant message(s) with typing delay
    if (idx < syntheticChat.length && syntheticChat[idx].role === "assistant") {
      setIsTyping(true);
      setTimeout(() => {
        const msg = syntheticChat[idx];
        nextMessages.push(msg);
        setMessages((prev) => [...prev, msg]);
        setIsTyping(false);

        // Update draft based on snapshots
        const snapshot = draftSnapshots.find((s) => s.afterMessageId === msg.id);
        if (snapshot) setCurrentDraft(snapshot.draft);

        setChatIndex(idx + 1);
      }, 1200);
    }
  }, []);

  const startSession = useCallback((templateId?: string) => {
    setStep("session");
    setMessages([]);
    setChatIndex(0);
    setCurrentDraft({});

    // Show first assistant message after a beat
    setIsTyping(true);
    setTimeout(() => {
      const firstMsg = syntheticChat[0];
      setMessages([firstMsg]);
      setIsTyping(false);
      setChatIndex(1);
    }, 800);
  }, []);

  const handleSendMessage = useCallback((text: string) => {
    // Find the next user message in synthetic chat to match
    const nextUserIdx = chatIndex;
    if (nextUserIdx < syntheticChat.length && syntheticChat[nextUserIdx].role === "user") {
      const userMsg: ChatMessage = {
        ...syntheticChat[nextUserIdx],
        content: text, // Use actual user text but advance synthetic flow
      };
      setMessages((prev) => [...prev, userMsg]);

      // Update draft if snapshot exists for this message
      const snapshot = draftSnapshots.find((s) => s.afterMessageId === userMsg.id);
      if (snapshot) setCurrentDraft(snapshot.draft);

      setChatIndex(nextUserIdx + 1);
      // Trigger assistant response
      setTimeout(() => advanceChat(nextUserIdx + 1), 300);
    } else {
      // Past synthetic data — just echo
      const echoMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      };
      setMessages((prev) => [...prev, echoMsg]);
    }
  }, [chatIndex, advanceChat]);

  const handleConfirm = () => {
    setStep("activated");
    toast.success("Employee created and activated!");
  };

  // Check if chat has reached the final state (all synthetic messages shown)
  const isSessionComplete = chatIndex >= syntheticChat.length && !isTyping;

  if (step === "activated") {
    return <ActivatedView draft={finalDraft} />;
  }

  if (step === "templates") {
    return (
      <TemplateSelect
        onSelectTemplate={(id) => startSession(id)}
        onStartBlank={() => startSession()}
        onBack={() => navigate(-1)}
      />
    );
  }

  // Session step — split view: chat left, preview right
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

      {/* Split pane */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 min-w-0 border-r border-border">
          <CreatorChat messages={messages} onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
        <div className="w-[340px] flex-shrink-0">
          <EmployeePreviewPanel
            draft={currentDraft}
            onConfirm={handleConfirm}
            showConfirm={isSessionComplete}
          />
        </div>
      </div>
    </div>
  );
}
