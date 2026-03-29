import type { EmployeePreview } from "./data";

export type LogLevel = "info" | "success" | "warning" | "error";

export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  detail?: string;
}

export type ReadinessState = "ready" | "needs_config" | "needs_verify" | "not_available";

export interface ConnectionReadiness {
  type: string;
  required: boolean;
  state: ReadinessState;
  connectionId?: string;
  connectionName?: string;
  lastVerifiedAt?: string;
  lastError?: string;
}

// Generate synthetic activity logs per employee
const logTemplates: Record<string, ActivityLogEntry[]> = {
  "maya-competitive-intel": [
    { id: "l1", timestamp: new Date(Date.now() - 2 * 60000), level: "info", message: "Scanning competitor pricing pages", detail: "Checking Competitor A, B, C spring campaign pages" },
    { id: "l2", timestamp: new Date(Date.now() - 18 * 60000), level: "success", message: "Completed pricing comparison matrix", detail: "3 competitors × 12 product tiers analyzed" },
    { id: "l3", timestamp: new Date(Date.now() - 45 * 60000), level: "info", message: "Detected new feature launch by Competitor B", detail: "New AI assistant feature announced on their blog" },
    { id: "l4", timestamp: new Date(Date.now() - 2 * 3600000), level: "success", message: "Q1 competitor pricing analysis completed", detail: "Report saved and shared to #competitive-intel Slack channel" },
    { id: "l5", timestamp: new Date(Date.now() - 6 * 3600000), level: "info", message: "Started monitoring spring campaign launches" },
    { id: "l6", timestamp: new Date(Date.now() - 24 * 3600000), level: "info", message: "Weekly competitive brief drafted", detail: "Covers pricing, positioning, and feature changes" },
    { id: "l7", timestamp: new Date(Date.now() - 48 * 3600000), level: "warning", message: "Competitor C website structure changed", detail: "Pricing page DOM updated — scraper config may need adjustment" },
  ],
  "sora-support-triage": [
    { id: "l1", timestamp: new Date(Date.now() - 1 * 60000), level: "info", message: "Triaging incoming ticket #4892", detail: "Customer reports login issues after password reset" },
    { id: "l2", timestamp: new Date(Date.now() - 8 * 60000), level: "warning", message: "Spend limit approaching", detail: "Current run cost at 87% of weekly budget cap" },
    { id: "l3", timestamp: new Date(Date.now() - 22 * 60000), level: "success", message: "Escalated ticket #4889 to Engineering", detail: "Critical: payment processing timeout affecting 12 accounts" },
    { id: "l4", timestamp: new Date(Date.now() - 1 * 3600000), level: "error", message: "Failed to classify ticket #4885", detail: "Ambiguous customer description — needs manual review" },
    { id: "l5", timestamp: new Date(Date.now() - 3 * 3600000), level: "success", message: "Batch triaged 15 tickets", detail: "8 → Support L1, 5 → Support L2, 2 → Engineering" },
    { id: "l6", timestamp: new Date(Date.now() - 12 * 3600000), level: "info", message: "Ticket volume spike detected", detail: "3× normal volume in billing category" },
  ],
  "niko-launch-ops": [
    { id: "l1", timestamp: new Date(Date.now() - 5 * 60000), level: "success", message: "All Feature X checklist items green", detail: "Marketing, Engineering, Support, Legal — all confirmed" },
    { id: "l2", timestamp: new Date(Date.now() - 30 * 60000), level: "info", message: "Sent launch readiness ping to stakeholders" },
    { id: "l3", timestamp: new Date(Date.now() - 2 * 3600000), level: "info", message: "Updated launch timeline in shared doc" },
    { id: "l4", timestamp: new Date(Date.now() - 8 * 3600000), level: "warning", message: "Legal review pending", detail: "Terms update not yet signed off — following up" },
    { id: "l5", timestamp: new Date(Date.now() - 24 * 3600000), level: "success", message: "Launch readiness brief sent for Feature X" },
  ],
  "iris-deal-risk": [
    { id: "l1", timestamp: new Date(Date.now() - 4 * 3600000), level: "error", message: "Salesforce connection unavailable", detail: "Cannot pull pipeline data — connector needs setup" },
    { id: "l2", timestamp: new Date(Date.now() - 24 * 3600000), level: "success", message: "Flagged 3 at-risk deals in Enterprise pipeline" },
    { id: "l3", timestamp: new Date(Date.now() - 48 * 3600000), level: "info", message: "Analyzed engagement scores for 28 active deals" },
  ],
  "alex-gtm": [
    { id: "l1", timestamp: new Date(Date.now() - 3 * 60000), level: "info", message: "Drafting LinkedIn post on Q1 landscape", detail: "Awaiting approval to publish" },
    { id: "l2", timestamp: new Date(Date.now() - 1 * 3600000), level: "success", message: "Blog post published: 'AI Workforce Trends Q1'", detail: "Auto-adapted from competitive brief" },
    { id: "l3", timestamp: new Date(Date.now() - 6 * 3600000), level: "success", message: "Published 3 channel-adapted posts", detail: "LinkedIn & blog — 2.4k impressions in 48h" },
    { id: "l4", timestamp: new Date(Date.now() - 24 * 3600000), level: "info", message: "Identified 5 trending topics for content pipeline" },
    { id: "l5", timestamp: new Date(Date.now() - 48 * 3600000), level: "info", message: "Engagement report: top post hit 1.2k views" },
  ],
  "kai-ai-pm": [
    { id: "l1", timestamp: new Date(Date.now() - 10 * 60000), level: "warning", message: "2nd follow-up sent to backend team", detail: "Auth migration blocker — no response in 24h" },
    { id: "l2", timestamp: new Date(Date.now() - 3 * 3600000), level: "success", message: "Resolved stalled issue #342", detail: "Identified owner (Jake) and escalated to lead" },
    { id: "l3", timestamp: new Date(Date.now() - 6 * 3600000), level: "success", message: "4 stalled issues resolved this week" },
    { id: "l4", timestamp: new Date(Date.now() - 24 * 3600000), level: "info", message: "Scanned 18 open issues for staleness" },
  ],
  "vera-analyst": [
    { id: "l1", timestamp: new Date(Date.now() - 15 * 60000), level: "info", message: "Refreshing Series B prospect memo", detail: "New revenue data from 10-K filing" },
    { id: "l2", timestamp: new Date(Date.now() - 2 * 3600000), level: "success", message: "Updated 3 portfolio memos with Q4 earnings" },
    { id: "l3", timestamp: new Date(Date.now() - 5 * 3600000), level: "warning", message: "2 evidence gaps flagged for follow-up", detail: "Missing: TAM sizing for prospect memo, updated cap table for PortCo #3" },
    { id: "l4", timestamp: new Date(Date.now() - 24 * 3600000), level: "info", message: "Scanned 42 new SEC filings for signals" },
  ],
};

export function getActivityLogs(employeeId: string): ActivityLogEntry[] {
  return logTemplates[employeeId] || [
    { id: "l1", timestamp: new Date(Date.now() - 24 * 3600000), level: "info", message: "No recent activity recorded" },
  ];
}

export function getConnectionReadiness(connectorNames: string[]): ConnectionReadiness[] {
  const readinessMap: Record<string, ConnectionReadiness> = {
    Slack: {
      type: "slack",
      required: true,
      state: "ready",
      connectionId: "conn-slack",
      connectionName: "Main Slack",
      lastVerifiedAt: "2026-03-28T12:00:00Z",
    },
    Email: {
      type: "email",
      required: true,
      state: "ready",
      connectionId: "conn-email",
      connectionName: "Workspace Email",
      lastVerifiedAt: "2026-03-28T08:15:00Z",
    },
    Lark: {
      type: "lark",
      required: true,
      state: "ready",
      connectionId: "conn-lark",
      connectionName: "Lark Workspace",
      lastVerifiedAt: "2026-03-27T09:30:00Z",
    },
    Webhook: {
      type: "webhook",
      required: true,
      state: "needs_verify",
      connectionId: "conn-webhook",
      connectionName: "Inbound Webhook",
      lastVerifiedAt: "2026-03-25T14:00:00Z",
    },
    GitHub: {
      type: "github",
      required: true,
      state: "ready",
      connectionId: "conn-github",
      connectionName: "GitHub Org",
      lastVerifiedAt: "2026-03-28T10:45:00Z",
    },
    Salesforce: {
      type: "salesforce",
      required: true,
      state: "not_available",
      lastError: "Connection not configured",
    },
    Browser: {
      type: "browser",
      required: false,
      state: "ready",
    },
  };

  return connectorNames.map(name => readinessMap[name] || {
    type: name.toLowerCase(),
    required: true,
    state: "not_available" as const,
  });
}
