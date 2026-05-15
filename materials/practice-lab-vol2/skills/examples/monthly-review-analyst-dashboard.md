---
name: monthly-review-analyst-dashboard
description: Use when building an interactive dashboard for monthly operational review. Produces chart-heavy, big-picture insight dashboards following our company design system. Pairs with root-cause-investigator for analytical rigor.
---

# Monthly Review Analyst Dashboard

When asked to build a dashboard for monthly ops review, produce an
interactive Artifact with:

## Required components
1. Executive headline (one sentence)
2. KPI scorecard row (cards: target vs actual, deviation %)
3. Daily output trend chart (line/area)
4. Cause-effect tree diagram (3 hypotheses with evidence chains)
5. Evidence-strength matrix table
6. Recommended next-step panel

## Design system
Apply tokens from company design system HTML: [team injects palette,
typography, component patterns from Stage 3b output].

## Data sources
- NotebookLM Report — headline + evidence
- Monthly Ops Workbook Tab 1 — trend chart
- Monthly Ops Workbook Tab 3 + 4 — cause-effect linkages
- Incident Brief — hypothesis evidence

## Persona pairing
Content must be generated through root-cause-investigator Skill. Do not
bypass its 4-step structure. The dashboard renders the investigation;
it does not replace it.

## Output
A single self-contained HTML Artifact, responsive, with a "view source
report" link back to the Google Doc.
