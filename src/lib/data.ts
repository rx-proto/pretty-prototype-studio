// Synthetic data for the Agens.run workspace prototype

export type EmployeeState = "working" | "warning" | "blocked" | "idle" | "ready" | "accent";

export interface WorkspacePreview {
  name: string;
  employeesWorking: number;
  totalEmployees: number;
  creditsLeft: number;
  creditStatus: string;
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
}

export interface SettingsGroupPreview {
  id: string;
  name: string;
  summary: string;
  items: Array<{ label: string; value: string }>;
}

// --- Data ---

export const workspace: WorkspacePreview = {
  name: "Acme AI Workforce",
  employeesWorking: 4,
  totalEmployees: 6,
  creditsLeft: 12840,
  creditStatus: "Healthy",
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
    statusMessage: "Handling elevated ticket volume — approaching budget limit",
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
];

export const skills: SkillPreview[] = [
  { id: "skill-1", name: "Market Watch", summary: "Continuously scans competitive landscape, pricing changes, and market signals.", usedBy: 3, icon: "📡" },
  { id: "skill-2", name: "Research Briefs", summary: "Generates structured research summaries with citations and key takeaways.", usedBy: 2, icon: "📝" },
  { id: "skill-3", name: "Escalation Triage", summary: "Classifies incoming tickets by urgency and routes to the right team.", usedBy: 1, icon: "🚨" },
  { id: "skill-4", name: "Launch Checklist", summary: "Tracks cross-functional launch readiness and sends go/no-go status.", usedBy: 1, icon: "🚀" },
  { id: "skill-5", name: "Deal Risk Radar", summary: "Scans deal pipelines for risk signals like stalled engagement.", usedBy: 1, icon: "🎯" },
  { id: "skill-6", name: "Follow-through", summary: "Monitors task completion and flags items that fall behind schedule.", usedBy: 2, icon: "✅" },
  { id: "skill-7", name: "Sentiment Analysis", summary: "Analyzes customer communications to detect sentiment trends.", usedBy: 0, icon: "💬" },
  { id: "skill-8", name: "Data Summarization", summary: "Condenses large datasets into actionable insights and visual summaries.", usedBy: 0, icon: "📊" },
];

export const tools: ToolPreview[] = [
  { id: "tool-1", name: "Web Search", summary: "Search the web for real-time information, news, and data.", usedBy: 4, icon: "🔍" },
  { id: "tool-2", name: "Image Generation", summary: "Create images and visual assets from text descriptions.", usedBy: 0, icon: "🎨" },
  { id: "tool-3", name: "Code Interpreter", summary: "Run code to analyze data, create charts, and process files.", usedBy: 0, icon: "💻" },
  { id: "tool-4", name: "PDF Reader", summary: "Extract and analyze content from PDF documents.", usedBy: 2, icon: "📄" },
  { id: "tool-5", name: "Spreadsheet", summary: "Read, write, and analyze spreadsheet data.", usedBy: 3, icon: "📊" },
  { id: "tool-6", name: "Calendar", summary: "Check schedules, create events, and manage time-based triggers.", usedBy: 2, icon: "📅" },
];

export const connectors: ConnectorPreview[] = [
  { id: "conn-slack", name: "Slack", summary: "Send and receive messages across your Slack workspace.", connected: true, employeesUsing: 5 },
  { id: "conn-lark", name: "Lark", summary: "Connect to Lark for team messaging and updates.", connected: true, employeesUsing: 1 },
  { id: "conn-email", name: "Email", summary: "Send digests, reports, and notifications via email.", connected: true, employeesUsing: 4 },
  { id: "conn-webhook", name: "Webhook", summary: "Receive events from external systems and services.", connected: true, employeesUsing: 1 },
  { id: "conn-salesforce", name: "Salesforce", summary: "Connect to your CRM for deal and pipeline data.", connected: false, employeesUsing: 0 },
  { id: "conn-notion", name: "Notion", summary: "Read and write pages in your Notion workspace.", connected: false, employeesUsing: 0 },
  { id: "conn-github", name: "GitHub", summary: "Monitor repositories, PRs, and issues.", connected: false, employeesUsing: 0 },
];

export const roleTemplates: RoleTemplate[] = [
  { id: "tpl-1", name: "Competitive Analyst", description: "Monitors competitors, tracks pricing changes, and delivers market briefs.", icon: "📡" },
  { id: "tpl-2", name: "Support Triage Agent", description: "Categorizes and routes support tickets to the right team automatically.", icon: "🎫" },
  { id: "tpl-3", name: "Launch Coordinator", description: "Tracks launch readiness across teams and sends go/no-go summaries.", icon: "🚀" },
  { id: "tpl-4", name: "Deal Risk Monitor", description: "Watches your sales pipeline and flags deals that need attention.", icon: "📉" },
];

export const attentionItems: AttentionItem[] = [
  { title: "Sora", detail: "Approaching weekly budget limit due to high ticket volume.", tone: "warning", action: "Review" },
  { title: "Iris", detail: "Salesforce connector needs to be set up to resume work.", tone: "blocked", action: "Connect" },
  { title: "Maya", detail: "New pricing brief is ready for your review.", tone: "accent", action: "Review" },
];

export const settingsGroups: SettingsGroupPreview[] = [
  {
    id: "settings-identity",
    name: "Workspace identity",
    summary: "Basic workspace configuration and branding.",
    items: [
      { label: "Workspace name", value: "Acme AI Workforce" },
      { label: "Default language", value: "English" },
      { label: "Output posture", value: "Professional, concise" },
    ],
  },
  {
    id: "settings-people",
    name: "People & access",
    summary: "Who can manage and interact with employees.",
    items: [
      { label: "Owners", value: "Sarah Chen, Mike Torres" },
      { label: "Editors", value: "Lisa Park, David Kim" },
      { label: "Approvers", value: "Sarah Chen" },
    ],
  },
  {
    id: "settings-ai",
    name: "AI defaults",
    summary: "Default providers and behavior policies.",
    items: [
      { label: "Default provider", value: "GPT-4o" },
      { label: "Fallback policy", value: "Auto-switch to Claude 3.5" },
      { label: "Creation posture", value: "Suggest, don't auto-create" },
    ],
  },
  {
    id: "settings-notifications",
    name: "Notifications",
    summary: "Alert preferences and delivery schedules.",
    items: [
      { label: "Budget warnings", value: "Enabled — Slack + Email" },
      { label: "Blocked deliveries", value: "Enabled — Slack only" },
      { label: "Weekly summary", value: "Every Monday 9am" },
    ],
  },
];

// Helpers
export function getEmployeeById(id: string): EmployeePreview | undefined {
  return employees.find((e) => e.id === id);
}
