

## Home Page Redesign

### Current Issues
- "Working" label conflicts with future runtime states; should be "Active"
- "xx total in workspace" is redundant
- Balance card doesn't surface what users care about (spend trend, burn rate)
- Connectors card doesn't deserve top-level placement
- "Needs your attention" section language is off; items should focus on failures and budget warnings
- "Your employees" list at the bottom duplicates the Employees tab

### Proposed Layout

**Top row: 2 cards (not 3)**

1. **Active Employees** — show count of active employees, clickable → navigates to `/app/employees`. Drop "total in workspace" line.

2. **Spend today** — replace the static balance card with today's spend amount (e.g. "$42.40 today") plus a subtle 7-day sparkline or mini bar chart using `dailySpend` data. Below it, show "$270.80 this week" as secondary context. This answers what users actually care about: "how much am I burning?" Clickable → navigates to `/app/billing`.

**Middle section: Action items**

- Rename from "Needs your attention" to simply **"Action required"** or no header at all — just show the items.
- Filter `attentionItems` to only `warning` and `blocked` tones (failures, budget issues). Drop `accent` items (like "brief ready for review" — that's not urgent).
- Remove distinct CTA labels ("Review", "Connect", "Check"). Each item is just a clickable row that opens a detail dialog or navigates to the employee.
- Clicking an item → navigate to `/app/employees/:id`.

**Bottom section: Recent activity feed (replaces "Your employees")**

Instead of duplicating the employee list, show a **recent activity** feed — the last few things employees did. Use `lastWork` and `statusMessage` from employee data to synthesize entries like:
- "Maya completed Q1 competitor pricing analysis"
- "Kai resolved 4 stalled issues this week"
- "Vera updated 3 portfolio memos with Q4 earnings data"

This gives users a pulse of what's happening without duplicating the employees tab.

### Data Changes

- Add a `recentActivity` array to `data.ts` with synthetic entries (employee name, action summary, relative time).
- Add `weeklySpend` computed from `dailySpend` sum.
- Update `WorkspacePreview` type if needed (or compute values inline).

### Files to modify
- `src/lib/data.ts` — add `recentActivity` data, possibly a `todaySpend` helper
- `src/pages/HomePage.tsx` — full rewrite of the card layout, attention section, and bottom section
- `src/index.css` — add any needed animation keyframes (if not already present)

