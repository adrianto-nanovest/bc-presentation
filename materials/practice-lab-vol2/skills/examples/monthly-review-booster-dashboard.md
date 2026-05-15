---
name: monthly-review-booster-dashboard
description: Use when building an interactive execution dashboard for monthly operational review. Produces kanban + owner + comms-preview trackers following our company design system. Pairs with ops-comms-drafter for drafting fidelity.
---

# Monthly Review Booster Dashboard

When asked to build an execution dashboard for monthly ops review, produce an
interactive Artifact with:

## Required components
1. Headline status (one sentence: what's done, what's in flight, what's blocked)
2. Kanban-style task board (Todo / In progress / Done columns)
3. Owner matrix (people × open items)
4. Status timeline / Gantt strip for the next 7 days
5. Drafted comms preview pane (handover · status update · action list) — tabbed
6. Templated download links (drafted docs as downloadable .md or .txt files)

## Design system
Apply tokens from company design system HTML: [team injects palette,
typography, component patterns from Stage 3b output].

## Data sources
- NotebookLM Report — headline + status summary
- Monthly Ops Workbook Tab 1 — output signals informing priority
- Monthly Ops Workbook Tab 3 — incidents → open items
- Monthly Ops Workbook Tab 4 — vendor follow-ups
- Process Manual — owner role mapping
- Incident Brief — items needing communication

## Persona pairing
Comms preview content must be generated through ops-comms-drafter Skill.
Do not bypass its template structures. The dashboard renders the drafted
comms; it does not replace them.

## Output
A single self-contained HTML Artifact, responsive, with a "view source
report" link back to the Google Doc.
