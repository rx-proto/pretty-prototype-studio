// Synthetic data for the Agens.run workspace prototype

export type EmployeeState = "working" | "warning" | "blocked" | "idle" | "ready" | "accent";

export interface WorkspacePreview {
  name: string;
  employeesWorking: number;
  totalEmployees: number;
  balance: number;
  balanceStatus: string;
  connectorsActive: number;
}

export interface EmployeePreview {
  id: string;
  name: string;
  title: string;
  summary: string;
  state: EmployeeState;
  statusMessage: string;
  lastWork: string;
  skills: string[];
  tools: string[];
  connectors: string[];
}

export interface SkillPreview {
  id: string;
  name: string;
  summary: string;
  usedBy: number;
  icon: string;
}

export interface ToolPreview {
  id: string;
  name: string;
  summary: string;
  usedBy: number;
  icon: string;
}

export interface ConnectorPreview {
  id: string;
  name: string;
  summary: string;
  connected: boolean;
  employeesUsing: number;
}

export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AttentionItem {
  title: string;
  detail: string;
  tone: EmployeeState;
  action: string;
  suggestion: string;
}

export interface SettingsGroupPreview {
  id: string;
  name: string;
  summary: string;
  items: Array<{ label: string; value: string }>;
}

export interface InvoicePreview {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending";
  description: string;
}

export interface DailySpend {
  day: string;
  date: string;
  amount: number;
}

// --- Data ---

export const workspace: WorkspacePreview = {
  name: "Acme AI Workforce",
  employeesWorking: 6,
  totalEmployees: 10,
  balance: 1247.60,
  balanceStatus: "Healthy",
  connectorsActive: 4,
};

export const employees: EmployeePreview[] = [
  {
    id: "maya-competitive-intel",
    name: "Maya",
    title: "Competitive intelligence lead",
    summary: "Monitors competitor pricing, feature releases, and market positioning.",
    state: "working",
    statusMessage: "Tracking 3 competitors' spring campaign launches",
    lastWork: "Completed Q1 competitor pricing analysis",
    skills: ["Market Watch", "Research Briefs"],
    tools: ["Web Search", "PDF Reader"],
    connectors: ["Slack", "Email"],
  },
  {
    id: "sora-support-triage",
    name: "Sora",
    title: "Support triage coordinator",
    summary: "Categorizes and routes incoming support tickets based on urgency and topic.",
    state: "warning",
    statusMessage: "Handling elevated ticket volume — approaching spend limit",
    lastWork: "Triaged 47 tickets in the last 24h",
    skills: ["Escalation Triage"],
    tools: ["Web Search"],
    connectors: ["Slack", "Webhook"],
  },
  {
    id: "niko-launch-ops",
    name: "Niko",
    title: "Launch operations partner",
    summary: "Coordinates cross-functional launch readiness and tracks blockers.",
    state: "working",
    statusMessage: "Preparing Feature X launch checklist — all items green",
    lastWork: "Sent launch readiness brief for Feature X",
    skills: ["Launch Checklist", "Follow-through"],
    tools: ["Spreadsheet", "Calendar"],
    connectors: ["Slack", "Lark", "Email"],
  },
  {
    id: "iris-deal-risk",
    name: "Iris",
    title: "Deal risk monitor",
    summary: "Scans deal pipelines for risk signals like stalled deals or declining engagement.",
    state: "blocked",
    statusMessage: "Waiting for Salesforce connection to resume work",
    lastWork: "Flagged 3 at-risk deals in Enterprise pipeline",
    skills: ["Deal Risk Radar"],
    tools: ["Web Search", "Spreadsheet"],
    connectors: ["Email"],
  },
  {
    id: "jun-research-editor",
    name: "Jun",
    title: "Research editor",
    summary: "Reviews and refines research drafts, checks citations, and formats deliverables.",
    state: "idle",
    statusMessage: "Waiting for new research assignments",
    lastWork: "Edited market landscape report",
    skills: ["Market Watch", "Research Briefs"],
    tools: ["PDF Reader", "Web Search"],
    connectors: ["Slack"],
  },
  {
    id: "lina-onboarding",
    name: "Lina",
    title: "Customer onboarding watcher",
    summary: "Tracks new customer onboarding milestones and flags accounts falling behind.",
    state: "ready",
    statusMessage: "Monitoring 8 active onboarding journeys",
    lastWork: "Onboarding summary sent for 5 new accounts",
    skills: ["Follow-through"],
    tools: ["Spreadsheet", "Calendar"],
    connectors: ["Slack", "Email"],
  },
  {
    id: "alex-gtm",
    name: "Alex",
    title: "Go-to-market content operator",
    summary: "Runs a full content-to-distribution loop: discovers actionable topics, produces channel-adapted content, publishes within defined guardrails, reads early engagement signals, and follows up — not just reporting, but actually shipping and iterating.",
    state: "working",
    statusMessage: "Drafting a LinkedIn post on Q1 competitive landscape — awaiting approval to publish",
    lastWork: "Published 3 channel-adapted posts across LinkedIn & blog, drove 2.4k impressions in 48h",
    skills: ["Market Watch", "Content Generation", "Channel Publishing"],
    tools: ["Web Search", "Browser", "Spreadsheet"],
    connectors: ["Slack", "Email", "Webhook"],
  },
  {
    id: "kai-ai-pm",
    name: "Kai",
    title: "Issue driver & blocker resolver",
    summary: "Continuously reads docs, issue trackers, and chat threads to identify which problems are worth pushing forward. Finds the right owner, sends follow-ups, escalates on timeout, and persists state across runs — not stopping at analysis, but driving issues to resolution.",
    state: "working",
    statusMessage: "Following up with backend team on auth migration blocker — 2nd ping sent, awaiting response",
    lastWork: "Resolved 4 stalled issues this week by identifying owners and escalating 2 to leads",
    skills: ["Follow-through", "Escalation Triage"],
    tools: ["Web Search", "Spreadsheet"],
    connectors: ["Slack", "Lark", "GitHub"],
  },
  {
    id: "vera-analyst",
    name: "Vera",
    title: "Investment research analyst",
    summary: "Maintains and refreshes investment memos for portfolio companies and prospects. Continuously scans for new signals, updates evidence maps, highlights gaps, and surfaces next-step actions — a persistent analyst, not a one-off research assistant.",
    state: "working",
    statusMessage: "Refreshing Series B prospect memo — new revenue data surfaced from 10-K filing",
    lastWork: "Updated 3 portfolio memos with Q4 earnings data, flagged 2 evidence gaps for follow-up",
    skills: ["Market Watch", "Research Briefs", "Data Summarization"],
    tools: ["Web Search", "PDF Reader", "Spreadsheet"],
    connectors: ["Email", "Slack"],
  },
  {
    id: "reo-devops",
    name: "Reo",
    title: "Infrastructure & incident monitor",
    summary: "Watches deployment pipelines, uptime dashboards, and alert channels. Correlates incidents with recent changes, drafts postmortems, and pings on-call engineers when thresholds are breached.",
    state: "ready",
    statusMessage: "All systems green — last incident was 4 days ago",
    lastWork: "Drafted postmortem for API latency spike, linked root cause to DB migration",
    skills: ["Escalation Triage", "Follow-through"],
    tools: ["Web Search", "Code Interpreter"],
    connectors: ["Slack", "GitHub", "Webhook"],
  },
];

export const skills: SkillPreview[] = [
  { id: "skill-1", name: "Market Watch", summary: "Continuously scans competitive landscape, pricing changes, and market signals.", usedBy: 4, icon: "eye" },
  { id: "skill-2", name: "Research Briefs", summary: "Generates structured research summaries with citations and key takeaways.", usedBy: 3, icon: "file-text" },
  { id: "skill-3", name: "Escalation Triage", summary: "Classifies incoming tickets by urgency and routes to the right team.", usedBy: 3, icon: "alert-triangle" },
  { id: "skill-4", name: "Launch Checklist", summary: "Tracks cross-functional launch readiness and sends go/no-go status.", usedBy: 1, icon: "clipboard-check" },
  { id: "skill-5", name: "Deal Risk Radar", summary: "Scans deal pipelines for risk signals like stalled engagement.", usedBy: 1, icon: "shield-alert" },
  { id: "skill-6", name: "Follow-through", summary: "Monitors task completion and flags items that fall behind schedule.", usedBy: 4, icon: "refresh-cw" },
  { id: "skill-7", name: "Sentiment Analysis", summary: "Analyzes customer communications to detect sentiment trends.", usedBy: 0, icon: "heart" },
  { id: "skill-8", name: "Data Summarization", summary: "Condenses large datasets into actionable insights and visual summaries.", usedBy: 1, icon: "bar-chart-3" },
  { id: "skill-9", name: "Content Generation", summary: "Produces channel-adapted content from topics and briefs for publishing.", usedBy: 1, icon: "pen-tool" },
  { id: "skill-10", name: "Channel Publishing", summary: "Publishes content to configured channels within defined guardrails.", usedBy: 1, icon: "send" },
];

export const tools: ToolPreview[] = [
  { id: "tool-1", name: "Web Search", summary: "Search the web for real-time information, news, and data.", usedBy: 7, icon: "globe" },
  { id: "tool-2", name: "Browser", summary: "Navigate and interact with web pages to extract or verify information.", usedBy: 1, icon: "monitor" },
  { id: "tool-3", name: "Code Interpreter", summary: "Run code to analyze data, create charts, and process files.", usedBy: 1, icon: "terminal" },
  { id: "tool-4", name: "PDF Reader", summary: "Extract and analyze content from PDF documents.", usedBy: 3, icon: "file-text" },
  { id: "tool-5", name: "Spreadsheet", summary: "Read, write, and analyze spreadsheet data.", usedBy: 5, icon: "table" },
  { id: "tool-6", name: "Calendar", summary: "Check schedules, create events, and manage time-based triggers.", usedBy: 2, icon: "calendar" },
  { id: "tool-7", name: "Image Generation", summary: "Create images and visual assets from text descriptions.", usedBy: 0, icon: "image" },
];

export const connectors: ConnectorPreview[] = [
  { id: "conn-slack", name: "Slack", summary: "Send and receive messages across your Slack workspace.", connected: true, employeesUsing: 8 },
  { id: "conn-lark", name: "Lark", summary: "Connect to Lark for team messaging and updates.", connected: true, employeesUsing: 2 },
  { id: "conn-email", name: "Email", summary: "Send digests, reports, and notifications via email.", connected: true, employeesUsing: 6 },
  { id: "conn-webhook", name: "Webhook", summary: "Receive events from external systems and services.", connected: true, employeesUsing: 3 },
  { id: "conn-github", name: "GitHub", summary: "Monitor repositories, PRs, and issues.", connected: true, employeesUsing: 2 },
  { id: "conn-salesforce", name: "Salesforce", summary: "Connect to your CRM for deal and pipeline data.", connected: false, employeesUsing: 0 },
  { id: "conn-notion", name: "Notion", summary: "Read and write pages in your Notion workspace.", connected: false, employeesUsing: 0 },
];

export const roleTemplates: RoleTemplate[] = [
  { id: "tpl-gtm", name: "GTM Content Operator", description: "Discovers trending topics, produces channel-adapted content, publishes within guardrails, reads early engagement signals, and follows up — a full content-to-distribution loop.", icon: "megaphone" },
  { id: "tpl-aipm", name: "AI Project Manager", description: "Continuously triages docs and issue queues, identifies blockers worth pushing, locates the right owner, sends follow-ups or escalations, and persists state across runs until resolution.", icon: "clipboard" },
  { id: "tpl-analyst", name: "Investment Analyst", description: "Surfaces new market signals, refreshes memo views with latest evidence, highlights gaps in your thesis, and queues next-step follow-ups — a persistent research loop for PE, VC, or family offices.", icon: "trending" },
  { id: "tpl-competitive", name: "Competitive Intelligence", description: "Monitors competitor pricing, feature launches, and positioning changes across your tracked companies. Delivers weekly briefs and real-time alerts.", icon: "search" },
];

export const attentionItems: AttentionItem[] = [
  { title: "Sora", detail: "Approaching weekly spend limit due to high ticket volume.", tone: "warning", action: "Review", suggestion: "Consider raising Sora's weekly budget cap in Settings → Billing, or pause non-critical ticket processing until next week's cycle resets." },
  { title: "Iris", detail: "Salesforce connector needs to be set up to resume work.", tone: "blocked", action: "Connect", suggestion: "Go to Connectors and set up the Salesforce integration. Iris needs read access to Opportunities and Contacts to continue prospecting." },
  { title: "Maya", detail: "New pricing brief is ready for your review.", tone: "accent", action: "Review", suggestion: "Open Maya's latest output to review the competitive pricing brief. Approve or leave feedback so she can iterate." },
  { title: "Kai", detail: "Auth migration blocker — awaiting backend team response for 24h.", tone: "warning", action: "Check", suggestion: "The backend team hasn't responded to the auth migration ticket in 24 hours. Consider pinging them directly or reassigning the blocker." },
];

export const settingsGroups: SettingsGroupPreview[] = [
  {
    id: "settings-identity",
    name: "Workspace",
    summary: "Basic workspace configuration.",
    items: [
      { label: "Workspace name", value: "Acme AI Workforce" },
      { label: "Default language", value: "English" },
      { label: "Output tone", value: "Professional, concise" },
    ],
  },
  {
    id: "settings-ai",
    name: "AI defaults",
    summary: "Default model providers and behavior.",
    items: [
      { label: "Default provider", value: "GPT-4o" },
      { label: "Fallback", value: "Auto-switch to Claude 3.5" },
      { label: "Creation mode", value: "Suggest, don't auto-create" },
    ],
  },
  {
    id: "settings-notifications",
    name: "Notifications",
    summary: "Alert preferences and delivery schedules.",
    items: [
      { label: "Spend warnings", value: "Enabled — Slack + Email" },
      { label: "Blocked deliveries", value: "Enabled — Slack only" },
      { label: "Weekly summary", value: "Every Monday 9:00 AM" },
    ],
  },
];

export const invoices: InvoicePreview[] = [
  { id: "inv-1", date: "Mar 1, 2025", amount: 489.40, status: "paid", description: "March usage" },
  { id: "inv-2", date: "Feb 1, 2025", amount: 524.20, status: "paid", description: "February usage" },
  { id: "inv-3", date: "Jan 1, 2025", amount: 367.80, status: "paid", description: "January usage" },
  { id: "inv-4", date: "Dec 1, 2024", amount: 298.60, status: "paid", description: "December usage" },
  { id: "inv-5", date: "Nov 1, 2024", amount: 412.50, status: "paid", description: "November usage" },
];

export const dailySpend: DailySpend[] = [
  { day: "Mon", date: "Mar 17", amount: 42.40 },
  { day: "Tue", date: "Mar 18", amount: 58.60 },
  { day: "Wed", date: "Mar 19", amount: 45.20 },
  { day: "Thu", date: "Mar 20", amount: 62.10 },
  { day: "Fri", date: "Mar 21", amount: 39.80 },
  { day: "Sat", date: "Mar 22", amount: 14.20 },
  { day: "Sun", date: "Mar 23", amount: 8.50 },
];

export const employeeSpend: { name: string; amount: number }[] = [
  { name: "Vera", amount: 64.80 },
  { name: "Maya", amount: 44.80 },
  { name: "Kai", amount: 41.40 },
  { name: "Niko", amount: 31.40 },
  { name: "Alex", amount: 28.60 },
  { name: "Sora", amount: 22.60 },
  { name: "Lina", amount: 16.20 },
  { name: "Reo", amount: 8.40 },
  { name: "Iris", amount: 6.40 },
  { name: "Jun", amount: 5.40 },
];

export const weeklySpend = dailySpend.reduce((sum, d) => sum + d.amount, 0);
export const todaySpend = dailySpend[dailySpend.length - 1]?.amount ?? 0;

export interface RecentActivity {
  employeeId: string;
  employeeName: string;
  summary: string;
  timeAgo: string;
}

export const recentActivity: RecentActivity[] = [
  { employeeId: "maya-competitive-intel", employeeName: "Maya", summary: "Completed Q1 competitor pricing analysis", timeAgo: "2h ago" },
  { employeeId: "kai-ai-pm", employeeName: "Kai", summary: "Resolved 4 stalled issues by identifying owners and escalating 2 to leads", timeAgo: "3h ago" },
  { employeeId: "vera-analyst", employeeName: "Vera", summary: "Updated 3 portfolio memos with Q4 earnings data", timeAgo: "5h ago" },
  { employeeId: "alex-gtm", employeeName: "Alex", summary: "Published 3 channel-adapted posts across LinkedIn & blog", timeAgo: "6h ago" },
  { employeeId: "niko-launch-ops", employeeName: "Niko", summary: "Sent launch readiness brief for Feature X", timeAgo: "8h ago" },
  { employeeId: "reo-devops", employeeName: "Reo", summary: "Drafted postmortem for API latency spike", timeAgo: "1d ago" },
];

// Helpers
export function getEmployeeById(id: string): EmployeePreview | undefined {
  return employees.find((e) => e.id === id);
}
