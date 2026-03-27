// Synthetic data for the AIE workspace prototype

export type EmployeeState = "working" | "warning" | "blocked" | "quiet" | "ready" | "accent";

export interface WorkspacePreview {
  name: string;
  description: string;
  workspaceCountLabel: string;
  peopleAtWork: number;
  itemsNeedingAttention: number;
  creditsLeft: number;
  weeklySpend: number;
  burnPerDay: number;
  autoRefillEnabled: boolean;
  skillsInstalled: number;
  liveConnections: number;
}

export interface EmployeePreview {
  id: string;
  name: string;
  title: string;
  team: string;
  summary: string;
  state: EmployeeState;
  lastWork: string;
  budgetLabel: string;
  budgetUsedPercent: number;
  channels: string[];
  skills: string[];
  weeklySpend: number;
  weeklyBudget: number;
  currentFocus: string;
  owner: string;
  defaultRoute: string;
}

export interface ActivityPreview {
  id: string;
  employeeId: string;
  employeeName: string;
  trigger: string;
  channel: string;
  headline: string;
  summary: string;
  outcome: string;
  state: EmployeeState;
  cost: number;
  timeLabel: string;
  nextStep: string;
}

export interface SkillPreview {
  id: string;
  name: string;
  category: string;
  summary: string;
  state: EmployeeState;
  adoptionLabel: string;
  employeeNames: string[];
  source: "Core" | "Custom";
}

export interface ConnectionPreview {
  id: string;
  name: string;
  type: string;
  state: EmployeeState;
  summary: string;
  routeLabel: string;
  employees: string[];
  lastDelivery: string;
  note: string;
}

export interface SettingsGroupPreview {
  id: string;
  name: string;
  summary: string;
  items: Array<{ label: string; value: string }>;
}

export interface AttentionItem {
  title: string;
  detail: string;
  tone: EmployeeState;
  action: string;
}

// --- Data ---

export const workspace: WorkspacePreview = {
  name: "Acme AI Workforce",
  description: "Central workspace for managing AI employees across teams",
  workspaceCountLabel: "6 employees",
  peopleAtWork: 4,
  itemsNeedingAttention: 3,
  creditsLeft: 12840,
  weeklySpend: 418,
  burnPerDay: 1240,
  autoRefillEnabled: true,
  skillsInstalled: 6,
  liveConnections: 4,
};

export const employees: EmployeePreview[] = [
  {
    id: "maya-competitive-intel",
    name: "Maya",
    title: "Competitive intelligence lead",
    team: "Growth",
    summary: "Monitors competitor pricing, feature releases, and market positioning across 12 tracked companies.",
    state: "working",
    lastWork: "Completed Q1 competitor pricing analysis",
    budgetLabel: "On track",
    budgetUsedPercent: 62,
    channels: ["Slack", "Email"],
    skills: ["Market Watch", "Research Briefs"],
    weeklySpend: 96,
    weeklyBudget: 155,
    currentFocus: "Tracking competitor spring campaign launches",
    owner: "Sarah Chen",
    defaultRoute: "Slack #intel-updates",
  },
  {
    id: "sora-support-triage",
    name: "Sora",
    title: "Support triage coordinator",
    team: "Support Ops",
    summary: "Categorizes and routes incoming support tickets based on urgency, topic, and team capacity.",
    state: "warning",
    lastWork: "Triaged 47 tickets in the last 24h",
    budgetLabel: "Near limit",
    budgetUsedPercent: 83,
    channels: ["Slack", "Webhook"],
    skills: ["Escalation Triage"],
    weeklySpend: 72,
    weeklyBudget: 87,
    currentFocus: "Handling elevated ticket volume from product update",
    owner: "Mike Torres",
    defaultRoute: "Slack #support-triage",
  },
  {
    id: "niko-launch-ops",
    name: "Niko",
    title: "Launch operations partner",
    team: "Operations",
    summary: "Coordinates cross-functional launch readiness, tracks blockers, and sends go/no-go summaries.",
    state: "working",
    lastWork: "Sent launch readiness brief for Feature X",
    budgetLabel: "Healthy",
    budgetUsedPercent: 55,
    channels: ["Slack", "Lark", "Email"],
    skills: ["Launch Checklist", "Follow-through"],
    weeklySpend: 88,
    weeklyBudget: 160,
    currentFocus: "Preparing Feature X launch checklist",
    owner: "Sarah Chen",
    defaultRoute: "Slack #launch-room",
  },
  {
    id: "iris-deal-risk",
    name: "Iris",
    title: "Deal risk monitor",
    team: "Revenue",
    summary: "Scans deal pipelines for risk signals — stalled deals, missing contacts, declining engagement.",
    state: "blocked",
    lastWork: "Flagged 3 at-risk deals in Enterprise pipeline",
    budgetLabel: "Under budget",
    budgetUsedPercent: 29,
    channels: ["Email"],
    skills: ["Deal Risk Radar"],
    weeklySpend: 54,
    weeklyBudget: 185,
    currentFocus: "Waiting for Salesforce connection",
    owner: "Lisa Park",
    defaultRoute: "Email digest",
  },
  {
    id: "jun-research-editor",
    name: "Jun",
    title: "Research editor",
    team: "Research",
    summary: "Reviews and refines research drafts, checks citations, and formats final deliverables.",
    state: "quiet",
    lastWork: "Edited market landscape report",
    budgetLabel: "Low usage",
    budgetUsedPercent: 31,
    channels: ["Slack"],
    skills: ["Market Watch", "Research Briefs"],
    weeklySpend: 48,
    weeklyBudget: 155,
    currentFocus: "Idle — waiting for new research assignments",
    owner: "Sarah Chen",
    defaultRoute: "Slack #research",
  },
  {
    id: "lina-onboarding",
    name: "Lina",
    title: "Customer onboarding watcher",
    team: "Customer Success",
    summary: "Tracks new customer onboarding milestones and flags accounts falling behind schedule.",
    state: "ready",
    lastWork: "Onboarding summary sent for 5 new accounts",
    budgetLabel: "On track",
    budgetUsedPercent: 44,
    channels: ["Slack", "Email"],
    skills: ["Follow-through"],
    weeklySpend: 60,
    weeklyBudget: 136,
    currentFocus: "Monitoring 8 active onboarding journeys",
    owner: "Mike Torres",
    defaultRoute: "Slack #cs-updates",
  },
];

export const activities: ActivityPreview[] = [
  {
    id: "act-1",
    employeeId: "maya-competitive-intel",
    employeeName: "Maya",
    trigger: "Scheduled scan",
    channel: "Slack",
    headline: "Competitor pricing update detected",
    summary: "Acme Corp reduced their Pro plan pricing by 15%. Updated comparison matrix and notified Growth team.",
    outcome: "Brief delivered",
    state: "working",
    cost: 12,
    timeLabel: "2 hours ago",
    nextStep: "Review pricing brief",
  },
  {
    id: "act-2",
    employeeId: "maya-competitive-intel",
    employeeName: "Maya",
    trigger: "News alert",
    channel: "Email",
    headline: "New feature launch by CompetitorB",
    summary: "CompetitorB announced AI-powered analytics. Drafted impact analysis for product team.",
    outcome: "Analysis sent",
    state: "working",
    cost: 18,
    timeLabel: "Yesterday",
    nextStep: "Product team review",
  },
  {
    id: "act-3",
    employeeId: "sora-support-triage",
    employeeName: "Sora",
    trigger: "Webhook event",
    channel: "Slack",
    headline: "Escalation: billing dispute from Enterprise client",
    summary: "Auto-escalated to finance team. Customer sentiment flagged as negative.",
    outcome: "Escalated",
    state: "warning",
    cost: 4,
    timeLabel: "30 min ago",
    nextStep: "Finance review",
  },
  {
    id: "act-4",
    employeeId: "niko-launch-ops",
    employeeName: "Niko",
    trigger: "Checklist timer",
    channel: "Lark",
    headline: "Feature X readiness check completed",
    summary: "All 8 checklist items green. Marketing assets confirmed. QA sign-off received.",
    outcome: "Go status confirmed",
    state: "working",
    cost: 22,
    timeLabel: "4 hours ago",
    nextStep: "Final launch approval",
  },
  {
    id: "act-5",
    employeeId: "iris-deal-risk",
    employeeName: "Iris",
    trigger: "Pipeline scan",
    channel: "Email",
    headline: "3 deals flagged as at-risk",
    summary: "Enterprise pipeline shows stalled engagement on Deals #1042, #1088, #1103.",
    outcome: "Alert sent",
    state: "blocked",
    cost: 8,
    timeLabel: "Yesterday",
    nextStep: "Sales team follow-up",
  },
];

export const skills: SkillPreview[] = [
  {
    id: "skill-market-watch",
    name: "Market Watch",
    category: "Research",
    summary: "Continuously scans competitive landscape, pricing changes, and market signals.",
    state: "working",
    adoptionLabel: "Used by 3 employees",
    employeeNames: ["Maya", "Jun", "Niko"],
    source: "Core",
  },
  {
    id: "skill-research-briefs",
    name: "Research Briefs",
    category: "Writing",
    summary: "Generates structured research summaries with citations and key takeaways.",
    state: "working",
    adoptionLabel: "Used by 2 employees",
    employeeNames: ["Maya", "Jun"],
    source: "Core",
  },
  {
    id: "skill-escalation-triage",
    name: "Escalation Triage",
    category: "Support",
    summary: "Classifies incoming tickets by urgency and routes to the right team.",
    state: "warning",
    adoptionLabel: "Used by 1 employee",
    employeeNames: ["Sora"],
    source: "Custom",
  },
  {
    id: "skill-launch-checklist",
    name: "Launch Checklist",
    category: "Operations",
    summary: "Tracks cross-functional launch readiness and sends go/no-go status.",
    state: "working",
    adoptionLabel: "Used by 1 employee",
    employeeNames: ["Niko"],
    source: "Core",
  },
  {
    id: "skill-deal-risk-radar",
    name: "Deal Risk Radar",
    category: "Revenue",
    summary: "Scans deal pipelines for risk signals like stalled engagement or missing contacts.",
    state: "blocked",
    adoptionLabel: "Used by 1 employee",
    employeeNames: ["Iris"],
    source: "Custom",
  },
  {
    id: "skill-follow-through",
    name: "Follow-through",
    category: "Operations",
    summary: "Monitors task completion and flags items that fall behind schedule.",
    state: "ready",
    adoptionLabel: "Used by 2 employees",
    employeeNames: ["Niko", "Lina"],
    source: "Core",
  },
];

export const connections: ConnectionPreview[] = [
  {
    id: "conn-slack",
    name: "Slack",
    type: "Messaging",
    state: "working",
    summary: "Primary communication channel for most employees.",
    routeLabel: "Inbound mentions and outbound digests",
    employees: ["Maya", "Sora", "Niko", "Jun", "Lina"],
    lastDelivery: "2 min ago",
    note: "All channels healthy",
  },
  {
    id: "conn-lark",
    name: "Lark",
    type: "Messaging",
    state: "ready",
    summary: "Secondary messaging for operations updates.",
    routeLabel: "Outbound room updates",
    employees: ["Niko"],
    lastDelivery: "4 hours ago",
    note: "Connected and ready",
  },
  {
    id: "conn-email",
    name: "Email",
    type: "Delivery",
    state: "working",
    summary: "Outbound delivery for digests and reports.",
    routeLabel: "Outbound digests only",
    employees: ["Maya", "Iris", "Niko", "Lina"],
    lastDelivery: "1 hour ago",
    note: "Delivery rate 99.2%",
  },
  {
    id: "conn-webhook",
    name: "Webhook",
    type: "Intake",
    state: "warning",
    summary: "Receives events from product and support systems.",
    routeLabel: "Inbound events from product and support systems",
    employees: ["Sora"],
    lastDelivery: "30 min ago",
    note: "Intermittent delays on support webhook",
  },
  {
    id: "conn-salesforce",
    name: "Salesforce",
    type: "CRM",
    state: "blocked",
    summary: "CRM integration for deal pipeline data.",
    routeLabel: "Not active yet",
    employees: ["Iris"],
    lastDelivery: "Never",
    note: "Awaiting admin authorization",
  },
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

export const attentionItems: AttentionItem[] = [
  {
    title: "Sora",
    detail: "Budget is close to the weekly guardrail.",
    tone: "warning",
    action: "Budget",
  },
  {
    title: "Iris",
    detail: "Salesforce route is still missing.",
    tone: "blocked",
    action: "Connection",
  },
  {
    title: "Maya",
    detail: "Pricing brief is ready for review.",
    tone: "accent",
    action: "Review",
  },
];

// Helpers
export function getEmployeeById(id: string): EmployeePreview | undefined {
  return employees.find((e) => e.id === id);
}

export function getActivitiesByEmployee(employeeId: string): ActivityPreview[] {
  return activities.filter((a) => a.employeeId === employeeId);
}

export function getSkillsByEmployee(employeeName: string): SkillPreview[] {
  return skills.filter((s) => s.employeeNames.includes(employeeName));
}

export function getConnectionsByEmployee(employeeName: string): ConnectionPreview[] {
  return connections.filter((c) => c.employees.includes(employeeName));
}
