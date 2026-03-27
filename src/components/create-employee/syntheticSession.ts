import type { ChatMessage, EmployeeDraft } from "./types";

// Simulated chat turns for a competitive intelligence employee
export const syntheticChat: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hey! Tell me about the role you're looking to fill. What problem should this employee solve for you?",
  },
  {
    id: "2",
    role: "user",
    content: "I need someone to keep tabs on our top 3 competitors — their pricing changes, new feature launches, and any positioning shifts. Ideally I'd get a weekly summary plus real-time alerts when something big happens.",
  },
  {
    id: "3",
    role: "assistant",
    content: "Got it — a dedicated competitive intelligence role. I'm picturing someone who continuously monitors pricing pages, changelogs, and press releases for your tracked competitors, then distills that into a weekly brief and pings you immediately for major moves.\n\nA few quick questions:\n1. How many competitors are we tracking initially?\n2. What channels should alerts go to — Slack, email, or here in the workbench?\n3. Any specific areas to prioritize — pricing, product features, hiring signals, or all of the above?",
  },
  {
    id: "4",
    role: "user",
    content: "3 competitors for now. Alerts via Slack for urgent stuff, weekly briefs here in the workbench. Focus on pricing and product features first — we can add hiring signals later.",
  },
  {
    id: "5",
    role: "assistant",
    content: "Perfect. Here's what I've put together — take a look at the preview on the right. The employee will:\n\n• Monitor 3 competitors' pricing pages and changelogs daily\n• Send real-time Slack alerts for significant pricing or feature changes\n• Deliver a structured weekly brief in the workbench every Monday\n• Focus on pricing and product features (hiring signals can be added later)\n\nI've named her **Maya** and auto-equipped the skills and tools she'll need. Feel free to adjust anything, or hit confirm when you're happy!",
  },
];

// Draft that "emerges" from the chat — shown progressively in preview
export const draftSnapshots: { afterMessageId: string; draft: Partial<EmployeeDraft> }[] = [
  {
    afterMessageId: "2",
    draft: {
      jobDescription: "Monitors competitor pricing, feature releases, and market positioning across tracked companies. Delivers weekly briefs and real-time alerts when something changes.",
    },
  },
  {
    afterMessageId: "3",
    draft: {
      name: "Maya",
      avatar: "M",
      jobDescription: "Monitors competitor pricing, feature releases, and market positioning across tracked companies. Delivers weekly briefs and real-time alerts when something changes.",
      skills: ["Market Watch", "Research Briefs"],
      tools: ["Web Search", "PDF Reader"],
    },
  },
  {
    afterMessageId: "5",
    draft: {
      name: "Maya",
      avatar: "M",
      jobDescription: "Monitors 3 competitors' pricing pages and changelogs daily. Sends real-time Slack alerts for significant pricing or feature changes. Delivers a structured weekly competitive brief in the workbench every Monday. Focuses on pricing and product features.",
      channel: "Workbench + Slack (alerts)",
      intelligence: "Claude Opus 4.6",
      skills: ["Market Watch", "Research Briefs", "Self-Improving Methods"],
      tools: ["Web Search", "PDF Reader", "Browser"],
      budget: { daily: 100, weekly: 700, warnAt: 80 },
      triggers: ["message", "cron:weekly:monday:9am"],
      restricted: [],
    },
  },
];

export const finalDraft: EmployeeDraft = {
  name: "Maya",
  avatar: "M",
  jobDescription: "Monitors 3 competitors' pricing pages and changelogs daily. Sends real-time Slack alerts for significant pricing or feature changes. Delivers a structured weekly competitive brief in the workbench every Monday. Focuses on pricing and product features.",
  channel: "Workbench + Slack (alerts)",
  intelligence: "Claude Opus 4.6",
  skills: ["Market Watch", "Research Briefs", "Self-Improving Methods"],
  tools: ["Web Search", "PDF Reader", "Browser"],
  budget: { daily: 100, weekly: 700, warnAt: 80 },
  triggers: ["message", "cron:weekly:monday:9am"],
  restricted: [],
};
