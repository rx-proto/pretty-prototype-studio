export type CreatorStep = "templates" | "session" | "confirm" | "activated";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface EmployeeDraft {
  name: string;
  avatar: string;
  jobDescription: string;
  channel: string;
  intelligence: string;
  skills: string[];
  tools: string[];
  budget: { daily: number; weekly: number; warnAt: number };
  triggers: string[];
  restricted: string[];
}
