# Practice Lab Materials — BCE AI Catalyst Vol-2, Session 2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce every workshop material the spec requires — provided Skills, 7-file starter pack, prompt/seed cards, facilitator runbook — so the 90-min practice lab is fully ready for both Day 1 (Section Head) and Day 2 (Team Leader) runs.

**Architecture:** All materials live under `materials/practice-lab-vol2/` in this repo as the canonical source-of-truth (markdown, CSV, draft PDFs). Deployable copies are pushed to a Google Drive folder `BCE Lab — Starter Pack` (Sheets/Docs/Slides format) for attendee consumption. Skills are validated by uploading to a throwaway Claude Web Project and running the seed prompts before being declared lab-ready.

**Tech Stack:** Markdown (Skills, cards, runbook); CSV → Google Sheets (workbook); Markdown → Google Doc (templates); Markdown → Google Slides (slide template, via Drive paste); LibreOffice or Pages → PDF (vendor notice); Wikimedia/Unsplash free imagery (site snapshots); Claude Web Project + NotebookLM Web (validation surfaces).

---

## 0. Section 13 Review — verdict and improvements adopted in this plan

The user asked for an explicit pass on §13. Verdict: **mostly good, one real gap, two paper cuts.**

| Item | State | Action in this plan |
|---|---|---|
| §13.1 `root-cause-investigator` | Structurally sound — frontmatter, activation triggers, 4-step method, refusal rules, voice all present | Use text verbatim from spec lines 290–370. Authored as actual `.md` file in Task A1; not copy-pasted from rendered markdown (avoid the nested triple-backtick trap). |
| §13.2 `ops-comms-drafter` | Sound — frontmatter, 4 templates, fill rules, output modes, refusal rules | Use text verbatim from spec lines 375–453. Authored in Task A2; same nested-fence handling. |
| §13.3 Day 1 dashboard skeleton | Complete | Use text verbatim from spec lines 461–496. Task A4. |
| §13.3 Day 2 dashboard skeleton | **GAP — only described in one sentence (line 498)** | **Plan adds full skeleton in Task A5** (`monthly-review-booster-dashboard.md`), parallel structure to Day 1. Text drafted in Task A5 below. |
| Validation | Spec says "LOCKED" but provides no proof Skills behave as designed in Claude Web | **Plan adds Task A3** — upload both Skills to a test Project, run all 6 seed questions, capture observed output structure, refusal-rule trigger check. |
| Nested triple-backtick rendering | Spec embeds Skill `.md` inside ```markdown blocks; inner ``` will terminate the outer block during copy/paste | **Plan instructs file-authoring directly** (Write tool with the literal Skill content), not copy-from-rendered-spec. Tasks A1/A2/A4/A5 include explicit content. |

Conclusion: §13 is *near-ready*, not done. With the four actions above the section becomes deployment-ready. The plan does **not** modify the locked text of 13.1 or 13.2.

---

## File structure

```
materials/practice-lab-vol2/
├── README.md                              # index + deployment notes
├── skills/
│   ├── root-cause-investigator.md         # Day 1 provided Skill (A1)
│   ├── ops-comms-drafter.md               # Day 2 provided Skill (A2)
│   └── examples/
│       ├── monthly-review-analyst-dashboard.md   # Day 1 authored skeleton (A4)
│       └── monthly-review-booster-dashboard.md   # Day 2 authored skeleton (A5, NEW)
├── starter-pack/
│   ├── 01-monthly-ops-workbook/           # 5-tab workbook source (B1–B7)
│   │   ├── tab1-daily-output.csv
│   │   ├── tab2-shift-schedule.csv
│   │   ├── tab3-incidents.csv
│   │   ├── tab4-vendor-deliveries.csv
│   │   ├── tab5-kpi-targets.csv
│   │   └── deviation-story.md
│   ├── 02-process-manual.md               # Process Manual v2.1 (B8)
│   ├── 03-incident-brief.md               # Apr 28 critical event (B9)
│   ├── 04-vendor-notice.md → .pdf         # Vendor delay letter (B10)
│   ├── 05-report-template.md              # Empty analytical report template (B11)
│   ├── 06-slide-template.md → .pptx       # 8-slide visual template (B12)
│   └── 07-site-snapshots/                 # 2–3 labeled stock images (B13)
├── cards/
│   ├── seed-questions-day1.md             # D1
│   ├── seed-questions-day2.md             # D2
│   ├── system-prompt-analyst.md           # D3
│   ├── system-prompt-booster.md           # D4
│   ├── diagram-to-artifact.md             # D5
│   ├── design-system-prompt.md            # D6
│   ├── artifact-prompt-day1.md            # D7
│   ├── artifact-prompt-day2.md            # D8
│   ├── naive-vs-proper.md                 # D9
│   └── skill-creator-coaching.md          # D10 (both personas)
└── runbook/
    ├── facilitator-runbook.md             # E1 (Day 1 + Day 2 with persona swaps)
    ├── preflight-checklist.md             # E2
    └── submission-form-spec.md            # E3
```

Deployment-only artifacts (not in repo): the Drive folder, the pre-built NotebookLM workbook (C1), USB-zip backup (B14). These are tracked via Tasks but produced outside the repo.

---

## Phase A — Section 13 Skills

### Task A1: Author `root-cause-investigator.md`

**Files:**
- Create: `materials/practice-lab-vol2/skills/root-cause-investigator.md`

- [ ] **Step 1: Write the file using the exact LOCKED text from spec §13.1**

Use Write tool. The file must be a *valid SKILL.md* on its own (no outer ```markdown wrapper). The inner ``` blocks in the Output format and template sections stay as triple-backticks — they're real code fences inside a real markdown file, not nested inside another fence.

File content (literal, paste exactly):

````````markdown
---
name: root-cause-investigator
description: Use when investigating why an operational metric deviated. Forces Symptom → Evidence → Hypotheses → Verification structure. Requires source-cited claims. Refuses unsupported speculation.
---

# Root Cause Investigator

You are a disciplined operational analyst working for a Section Head. Your job
is to investigate why a measured outcome deviated from target. You produce
decision-ready analyses, not narratives.

## When this skill activates

Whenever the user asks you to investigate, diagnose, explain, or root-cause
an operational issue, problem, anomaly, or metric deviation. Triggers include:
"why did", "what caused", "investigate", "diagnose", "root cause", "explain
the drop", "analyze the deviation".

## How to think — the 4-step structure

Run every investigation through these four steps. Do not skip. Do not let the
user skip.

### Step 1 — SYMPTOM
State precisely what deviated: the metric, the magnitude, the time window,
the comparison baseline.

### Step 2 — EVIDENCE
List every relevant data point. Each item MUST include:
- Claim (one sentence)
- Source (file, sheet, row/page)
- Strength: Strong / Moderate / Weak

### Step 3 — HYPOTHESES
Generate exactly THREE candidate explanations. Each must:
- State the cause clearly
- Map to specific evidence from Step 2
- Note what would FALSIFY it

Rank by evidence strength.

### Step 4 — VERIFICATION
Identify what additional evidence would confirm or rule out the top
hypothesis. Tell the user what to check next.

## Output format

```
## Symptom
[1–2 sentences]

## Evidence
- [Strong/Mod/Weak] [claim] ([source])
- ...

## Hypotheses (ranked)
1. **[Hypothesis 1]** — supported by [evidence]; falsified by [test]
2. **[Hypothesis 2]** — ...
3. **[Hypothesis 3]** — ...

## Recommended verification
- [Next data point to check]
- [Next person to interview]
```

## Refusal rules

REFUSE to:
- Conclude a root cause without at least one Strong evidence item
- Make claims you cannot cite to a specific source
- Speculate about causes you have no evidence for
- Drop the 4-step structure even when the user asks for "just the answer"

When refusing, briefly say: *"I don't have enough evidence to claim that.
Here's what I can support, and here's what we'd need to check."*

## Voice and tone

Direct, plain, one claim per sentence. No hedging without reason. No
overconfidence without evidence. Section Heads use this output to decide.
````````

- [ ] **Step 2: Lint the markdown**

Run: `npx -y markdownlint-cli2 materials/practice-lab-vol2/skills/root-cause-investigator.md`
Expected: clean. Acceptable warning: MD040 (no language tag on the example fence) — that's intentional.

- [ ] **Step 3: Commit**

```bash
git add materials/practice-lab-vol2/skills/root-cause-investigator.md
git commit -m "feat(lab): add root-cause-investigator skill (Day 1 provided)"
```

### Task A2: Author `ops-comms-drafter.md`

**Files:**
- Create: `materials/practice-lab-vol2/skills/ops-comms-drafter.md`

- [ ] **Step 1: Write the file using the exact LOCKED text from spec §13.2**

File content (literal, paste exactly):

````````markdown
---
name: ops-comms-drafter
description: Use when drafting recurring operational communications (shift handover, status update, action list, weekly recap). Produces template-consistent drafts grounded in source data, ready to send.
---

# Ops Comms Drafter

You are a sharp Team Leader's drafting partner. Your job is to convert raw
operational data into ready-to-send communications, using established
templates, in the team's voice.

## When this skill activates

Whenever the user asks you to draft, write, prepare, generate, or compose:
shift handover, status update, action item list, weekly recap, incident
communication, vendor follow-up, stakeholder email, standup notes.

## Templates — pick one, then fill it

### Template A — SHIFT HANDOVER
```
Date: [date] | Outgoing: [shift] | Incoming: [shift]
OPEN ITEMS — [item] · owner · status · by
EVENTS — [time] · [event] · action taken
WATCH FOR — [signal or risk]
NEEDS ATTENTION FROM INCOMING — [specific ask]
```

### Template B — STATUS UPDATE
```
PERIOD: [start–end]
HEADLINE: [one-sentence outcome]
WINS — [achievement] · [supporting metric]
PROGRESS — [in-flight] · [%] · [next milestone]
BLOCKERS — [blocker] · [owner] · [needed by]
NEXT 7 DAYS — [priority] · [owner]
```

### Template C — ACTION ITEMS
```
| # | Action | Owner | Due | Status | Source |
```

### Template D — WEEKLY RECAP
```
## Headline · ## Key numbers · ## Decisions made
## Open questions · ## Next week's focus
```

## How to fill

1. Pull data from available sources
2. Cite source briefly if user might verify
3. Use team's voice: declarative, no fluff
4. Missing data: write "—", never "TBD" or invented content

## Output modes

- Default: filled template, ready to paste
- With explainer: + 2–3 line note (first-time contexts)
- Multiple options: 2 variants with trade-off note (when asked)

## Voice and tone

Plain, declarative, active voice. Specific numbers over generalizations.
Match team's existing voice. No "I" voice — these are the Team Leader's
words, not yours.

## Refusal rules

REFUSE to: invent data without source; use vague modifiers when a number
is available; add filler sections; bloat output. Missing data: "—" or
"[need: source]". Don't fabricate.

## When to ask

ONCE, briefly, only if needed: which template? who's audience? what
period? One question per turn maximum.
````````

- [ ] **Step 2: Lint**: same command as A1, scoped to this file.

- [ ] **Step 3: Commit**

```bash
git add materials/practice-lab-vol2/skills/ops-comms-drafter.md
git commit -m "feat(lab): add ops-comms-drafter skill (Day 2 provided)"
```

### Task A3: Validate both Skills in Claude Web

This task is the validation step §13 silently skipped. Mandatory before declaring §13 done.

**Files:**
- Create: `materials/practice-lab-vol2/skills/validation-log.md`

- [ ] **Step 1: Open a throwaway Claude Web Project**

Name: `BCE Lab Skill Validation`. Upload both `root-cause-investigator.md` and `ops-comms-drafter.md` as Project files.

- [ ] **Step 2: Run Day 1 activation test**

Prompt (in the Project chat):
> "Why did May 2026 output deviate from target?"

Expected: response uses the 4-step SYMPTOM → EVIDENCE → HYPOTHESES → VERIFICATION structure. Each evidence item tagged [Strong/Mod/Weak]. Exactly 3 hypotheses.

If Claude responds without the structure, the Skill description triggers are too weak — escalate to Adri before publishing.

- [ ] **Step 3: Run Day 1 refusal test**

Prompt:
> "Just tell me — is it the night-shift team's fault?"

Expected: refusal phrase along the lines of *"I don't have enough evidence to claim that"* and a request for verification data.

- [ ] **Step 4: Run Day 2 template test**

Prompt:
> "Draft a shift handover note for end of May 2026."

Expected: Template A SHIFT HANDOVER filled, "—" used for any field with no source, no fabricated names or times.

- [ ] **Step 5: Run Day 2 refusal test**

Prompt:
> "Add some bullet points about teamwork to the handover."

Expected: refusal — Skill should reject filler additions per `## Refusal rules`.

- [ ] **Step 6: Record outcomes**

Write `validation-log.md` with: date, model version, each prompt, observed-vs-expected summary, pass/fail. Three failures or more → stop and revise the Skills before continuing.

- [ ] **Step 7: Commit**

```bash
git add materials/practice-lab-vol2/skills/validation-log.md
git commit -m "test(lab): validate provided skills against seed prompts"
```

### Task A4: Author Day 1 authored-Skill skeleton (`monthly-review-analyst-dashboard.md`)

**Files:**
- Create: `materials/practice-lab-vol2/skills/examples/monthly-review-analyst-dashboard.md`

- [ ] **Step 1: Write the file using the exact LOCKED text from spec §13.3 (Day 1 block, lines 461–496)**

File content (literal):

````````markdown
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
````````

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/skills/examples/monthly-review-analyst-dashboard.md
git commit -m "feat(lab): add Day 1 authored-skill skeleton (analyst dashboard)"
```

### Task A5: Author Day 2 authored-Skill skeleton (`monthly-review-booster-dashboard.md`) — **fills §13.3 gap**

This is the gap the §13 review flagged. Day 2 needs a parallel skeleton to Day 1's. Structure mirrors A4 so facilitators can coach either day with the same shape.

**Files:**
- Create: `materials/practice-lab-vol2/skills/examples/monthly-review-booster-dashboard.md`

- [ ] **Step 1: Write the file**

File content (literal):

````````markdown
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
````````

- [ ] **Step 2: Cross-check parity with Day 1 skeleton**

Open A4 and A5 side-by-side. Confirm both have: 6 numbered required components · `## Design system` · `## Data sources` · `## Persona pairing` · `## Output`. If a heading is missing in either, add it so facilitators coach symmetrically.

- [ ] **Step 3: Commit**

```bash
git add materials/practice-lab-vol2/skills/examples/monthly-review-booster-dashboard.md
git commit -m "feat(lab): add Day 2 authored-skill skeleton (booster dashboard)"
```

---

## Phase B — Starter pack (7 files)

### Task B1: Design the workbook's deviation story

The numbers across 5 tabs must make the **12% May output deviation traceable** to a week-3 incident spike + a vendor delivery delay (per spec §6.1). Without traceability, the lab collapses — teams can't find a real cause to investigate.

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/deviation-story.md`

- [ ] **Step 1: Draft the deviation story**

Content of `deviation-story.md`:

```markdown
# May 2026 deviation story (authoring guide, not for attendees)

## Headline numbers
- May target output: 100,000 units
- May actual output: 88,000 units
- Deviation: -12.0%

## Causal chain (must be discoverable from tab data)
1. Week 3 (May 14–20) sees a sharp drop:
   - Tab 1 daily output dips 25–30% vs week 2 baseline
   - Tab 1 downtime hours spike (avg 4h → 14h on May 16–17)
   - Tab 1 defects rise (~3% → ~9%)
2. Tab 3 incidents log: 3 critical events clustered May 15–17 (one mapped to the Apr 28 brief lineage)
3. Tab 4 vendor deliveries: Vendor "Delta Pratama" misses 60% of its May 14 delivery, 5-day lag confirmed
4. Tab 5 KPI targets: Yield % and Volume show worst variance; Energy and Headcount near target

## Red herrings (good prompt-iteration teachers)
- Tab 2 shift schedule shows a normal pattern — no shift-related cause
- Tab 1 energy stays flat — rules out a power issue
- Tab 4 has 2 small delays from other vendors that are NOT the cause
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/deviation-story.md
git commit -m "docs(lab): document workbook deviation story (authoring guide)"
```

### Task B2: Tab 1 — Daily Output Log (30 rows × 6 metrics)

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab1-daily-output.csv`

- [ ] **Step 1: Author CSV**

Header: `Date,Volume,Downtime_hrs,Defects_pct,Yield_pct,Energy_kWh,Headcount`

Rows: May 1 → May 31, 2026 (31 rows incl header = 30 data days; if the spec said "30 rows" that's exactly the data rows).

Generate values per B1 deviation story:
- Weeks 1, 2, 4: Volume ≈ 3,200–3,500/day, Downtime 2–5h, Defects 2–4%, Yield 92–96%, Energy 1,800–2,100 kWh, Headcount 80–85.
- Week 3 (May 14–20): Volume drops 25–30% (target → ~2,400/day), Downtime spikes (4 → 14h on May 16–17), Defects 7–9%, Yield 78–85%, Energy stable, Headcount stable (rule out energy/staffing).
- Totals must roll to 88,000 (±200) volume sum. **Verify with `awk -F, 'NR>1 {sum+=$2} END {print sum}' tab1-daily-output.csv`** before committing — expected ~88,000.

- [ ] **Step 2: Verify sum**

Run: `awk -F, 'NR>1 {sum+=$2} END {print sum}' materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab1-daily-output.csv`
Expected: 87,800 – 88,200. Re-balance any one Week 1 row if needed.

- [ ] **Step 3: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab1-daily-output.csv
git commit -m "feat(lab): add workbook tab 1 (daily output log)"
```

### Task B3: Tab 2 — Shift Schedule

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab2-shift-schedule.csv`

- [ ] **Step 1: Author CSV**

Header: `Date,Shift,Team,Start,End,Hrs_planned,Hrs_actual,Notes`

Rows: 3 shifts × 31 days = 93 rows. Three teams (Team Alfa / Bravo / Cendana). Pattern must be **flat** — no anomaly week 3 — so attendees who chase a shift-cause hypothesis discover it's a red herring.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab2-shift-schedule.csv
git commit -m "feat(lab): add workbook tab 2 (shift schedule, no anomaly)"
```

### Task B4: Tab 3 — Incidents Log

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab3-incidents.csv`

- [ ] **Step 1: Author CSV**

Header: `Date,Type,Severity,Resolution_time_hrs,Root_cause,Linked_vendor,Notes`

Approximately 25 rows. Distribute:
- ~8 low-severity routine incidents across weeks 1, 2, 4 (mechanical jams, minor defects).
- **3 critical clustered May 15–17**: equipment fault, material-quality reject, downstream stall. Two link to vendor "Delta Pratama".
- ~14 medium incidents distributed normally.

One row must reference an "Apr 28 critical event" lineage (so the Incident Brief in B9 has provenance).

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab3-incidents.csv
git commit -m "feat(lab): add workbook tab 3 (incidents log w/ week-3 cluster)"
```

### Task B5: Tab 4 — Vendor Deliveries

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab4-vendor-deliveries.csv`

- [ ] **Step 1: Author CSV**

Header: `Date,Vendor,Item,Qty_ordered,Qty_received,Status,Lag_days,Notes`

Approximately 40 rows across 5–6 vendor names. Distribute:
- **Vendor "Delta Pratama"**: May 14 delivery — `Qty_received` = 40% of ordered, `Lag_days` = 5, status = "Partial — see Vendor Notice 04". This is the smoking gun.
- 2 minor delays from other vendors (red herrings).
- All other rows on-time.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab4-vendor-deliveries.csv
git commit -m "feat(lab): add workbook tab 4 (vendor deliveries w/ Delta Pratama gap)"
```

### Task B6: Tab 5 — KPI Targets

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab5-kpi-targets.csv`

- [ ] **Step 1: Author CSV**

Header: `KPI,Target,Actual,Variance_pct,Direction,Owner`

8 KPIs: Volume (100k / 88k / -12%), Yield % (95% / 88% / -7pp), Defects % (≤3% / 5.2% / +73%), Downtime hrs (≤100 / 168 / +68%), Energy kWh per unit (≤0.65 / 0.66 / flat), Vendor on-time % (≥95% / 82% / -13pp), Safety incidents (0 / 1 / +1), Headcount fill % (100% / 99% / flat).

Volume + Vendor on-time variance must match Tabs 1 + 4 arithmetic — verify with quick eyeball.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/tab5-kpi-targets.csv
git commit -m "feat(lab): add workbook tab 5 (KPI targets)"
```

### Task B7: Workbook end-to-end traceability check

**Files:**
- Modify: `materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/deviation-story.md` (append `## Verification log`)

- [ ] **Step 1: Run each cause-chain step against the CSVs**

For each numbered step in `deviation-story.md` §"Causal chain", grep/awk the relevant tab and confirm the number is present. Example:
- `awk -F, '$1>="2026-05-14" && $1<="2026-05-20"' tab1-daily-output.csv` → confirm visible volume drop.
- `grep "Delta Pratama" tab4-vendor-deliveries.csv | grep "2026-05-14"` → confirm partial delivery row exists.

- [ ] **Step 2: Append a "Verification log" section** to deviation-story.md showing each check + pass/fail.

- [ ] **Step 3: If any step fails, edit the offending CSV until it passes. Commit only when all pass.**

```bash
git add materials/practice-lab-vol2/starter-pack/01-monthly-ops-workbook/
git commit -m "test(lab): verify workbook cross-tab traceability"
```

### Task B8: Process Manual v2.1

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/02-process-manual.md`

- [ ] **Step 1: Draft 2-page SOP**

Sections: `# Purpose · # Who runs the review · # Required data inputs · # Review cadence · # Escalation rules · # Expected outputs · # Sign-off`. Plain language. No mining-specific terminology (per memory `feedback_generic_examples.md`). Mention "Section Head" and "Team Leader" by role so the persona Skills have referents.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/02-process-manual.md
git commit -m "feat(lab): add process manual v2.1"
```

### Task B9: Incident Brief — Apr 28 critical event

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/03-incident-brief.md`

- [ ] **Step 1: Draft 1-page narrative**

Apr 28 critical event narrative: partial data, ambiguous causes. Must reference the same incident lineage flagged in Tab 3 (B4). Leave 2–3 evidence gaps explicitly ("witnesses unavailable", "logs not retrieved") so attendees who follow root-cause-investigator can correctly mark evidence as Weak/Moderate.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/03-incident-brief.md
git commit -m "feat(lab): add incident brief (Apr 28 event)"
```

### Task B10: Vendor Notice — Delta Pratama delivery delay

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/04-vendor-notice.md`
- Create (deployment): `materials/practice-lab-vol2/starter-pack/04-vendor-notice.pdf`

- [ ] **Step 1: Draft markdown source**

Format: letterhead-style. "PT Delta Pratama Logistik · Jl. Generic No. 1 · ..." (kept neutral, no mining-specific). Body: explains May 14 partial delivery, cites internal logistics issue, commits to make-up delivery May 21–22. Signed by "Operations Manager — Delta Pratama".

- [ ] **Step 2: Convert to PDF**

Run: `pandoc 04-vendor-notice.md -o 04-vendor-notice.pdf` (or open in LibreOffice and Export-as-PDF).
Expected: 1-page PDF.

- [ ] **Step 3: Commit both source and PDF**

```bash
git add materials/practice-lab-vol2/starter-pack/04-vendor-notice.md materials/practice-lab-vol2/starter-pack/04-vendor-notice.pdf
git commit -m "feat(lab): add vendor notice (markdown + PDF)"
```

### Task B11: Report Template (analytical structure)

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/05-report-template.md`

- [ ] **Step 1: Draft skeleton template**

Sections in this exact order: `# Executive Summary · # Findings · # Evidence (with source citations) · # Recommendations · # Appendix`. Each section has 2–3 placeholder bullets and a `<!-- prompt: ... -->` HTML comment that previews what should go there. Claude in Stage 2 uses this template as a structural reference.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/05-report-template.md
git commit -m "feat(lab): add analytical report template"
```

### Task B12: Slide Template — 8 slides

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/06-slide-template.md`
- Create (deployment): `materials/practice-lab-vol2/starter-pack/06-slide-template.pptx` via Google Slides export

- [ ] **Step 1: Draft markdown spec**

One H2 heading per intended slide, 8 total: `## Cover · ## Headline metric · ## Driver analysis · ## Incidents recap · ## Vendor status · ## KPI scorecard · ## Action items · ## Sign-off`. Each has a `<!-- visual: ... -->` HTML comment describing the intended visual (e.g., "big number, no chart" for Headline; "table with target/actual/variance" for KPI scorecard). This is the **primary visual reference for Claude Design** in Stage 3b — the visual identity matters more than the words.

- [ ] **Step 2: Build the actual .pptx via Google Slides**

Open new Google Slides → create 8 slides matching the markdown spec → apply a clean light theme (one accent color, plain sans-serif). Export as .pptx. Place at `06-slide-template.pptx`.

- [ ] **Step 3: Commit both**

```bash
git add materials/practice-lab-vol2/starter-pack/06-slide-template.md materials/practice-lab-vol2/starter-pack/06-slide-template.pptx
git commit -m "feat(lab): add slide template (markdown spec + pptx)"
```

### Task B13: Site Snapshots — 2–3 labeled images

**Files:**
- Create: `materials/practice-lab-vol2/starter-pack/07-site-snapshots/` with 2–3 PNG files + a `README.md`

- [ ] **Step 1: Source 2–3 free, neutral operational area photos**

Sources: Wikimedia Commons or Unsplash (free-stack constraint per memory `feedback_no_paid_components.md`). Generic warehouse / facility / control room — not mining-specific. Label each with a 1-line caption added as text overlay or in the README.

- [ ] **Step 2: Add README**

`07-site-snapshots/README.md` lists each file, source URL, license attribution.

- [ ] **Step 3: Commit**

```bash
git add materials/practice-lab-vol2/starter-pack/07-site-snapshots/
git commit -m "feat(lab): add site snapshots (3 labeled stock images)"
```

### Task B14: Drive folder setup + USB-zip backup

This is a deployment task — produces nothing in the repo but produces the artifact attendees touch.

- [ ] **Step 1: Create Google Drive folder `BCE Lab — Starter Pack`**

Upload:
- Workbook CSVs → import into one Google Sheet with 5 tabs.
- 02-process-manual.md → paste into a new Google Doc named "Monthly Review Process Manual v2.1".
- 03-incident-brief.md → Google Doc.
- 04-vendor-notice.pdf → uploaded as-is.
- 05-report-template.md → Google Doc.
- 06-slide-template.pptx → uploaded → opens as Google Slides.
- 07-site-snapshots/* → uploaded as-is.

Set folder share to **"Anyone with the link — Viewer"**. Copy share URL.

- [ ] **Step 2: Zip backup**

Run: `cd materials/practice-lab-vol2 && zip -r ~/Desktop/bce-lab-starter-pack-backup.zip starter-pack/`
Copy zip to USB drive (committee deployment).

- [ ] **Step 3: Record share URL in repo**

Append to `materials/practice-lab-vol2/README.md`:
```
## Drive folder (deployed)
- URL: <share URL>
- Created: <date>
- Permission: Anyone with link — Viewer
```

```bash
git add materials/practice-lab-vol2/README.md
git commit -m "docs(lab): record Drive folder URL for starter pack"
```

---

## Phase C — Pre-built NotebookLM workbook (fallback)

### Task C1: Build the pre-ingested NotebookLM workbook

Deployment task. Insurance for if a team's NotebookLM upload fails.

- [ ] **Step 1: Open NotebookLM (Web), create new notebook `BCE Lab — Monthly Review Starter (Fallback)`**

- [ ] **Step 2: Add all 7 starter pack files as sources**

Workbook (Sheet), Process Manual, Incident Brief, Vendor Notice PDF, Report Template, Slide Template, Site Snapshots.

- [ ] **Step 3: Smoke-test with one persona-1 seed question**

Prompt: `"Why did May 2026 output deviate from target?"` — confirm NotebookLM returns a grounded answer with source citations within ~10s. If it fails, the workbook isn't ready.

- [ ] **Step 4: Set notebook share to public read; copy URL; record in README.md (same section as B14).**

```bash
git add materials/practice-lab-vol2/README.md
git commit -m "docs(lab): record NotebookLM fallback workbook URL"
```

---

## Phase D — Cards and prompts (closes §14 open items 1–5, 8)

### Task D1: Seed questions card — Day 1 (Section Head Analyst)

**Files:**
- Create: `materials/practice-lab-vol2/cards/seed-questions-day1.md`

- [ ] **Step 1: Author card**

```markdown
# Seed Questions — Day 1 (Section Head)

Use these in Stage 1c (NotebookLM Q&A). Save each cited answer to the Notes panel.

1. **Why did May 2026 output deviate from target?**
   Look for: deviation magnitude, time window, top 2 contributing factors.

2. **Which incidents most likely drove the deviation, and what evidence supports each?**
   Look for: incident IDs from Tab 3, severity/timing, vendor linkages.

3. **What is the single most decision-ready recommendation for June 2026?**
   Look for: one specific action, named owner, expected impact.
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/seed-questions-day1.md
git commit -m "feat(lab): add Day 1 seed questions card"
```

### Task D2: Seed questions card — Day 2 (Team Leader Booster)

**Files:**
- Create: `materials/practice-lab-vol2/cards/seed-questions-day2.md`

- [ ] **Step 1: Author card**

```markdown
# Seed Questions — Day 2 (Team Leader)

Use these in Stage 1c (NotebookLM Q&A). Save each cited answer to the Notes panel.

1. **Draft a shift handover note covering open items from May's last week.**
   Look for: Template A format, items grounded in Tab 3 incidents, "—" for missing data.

2. **List the top 5 action items for next week with owners and due dates, citing source data.**
   Look for: Template C table, owner names from Process Manual roles, source column populated.

3. **Compose a 1-paragraph status update for stakeholders summarizing May and June priorities.**
   Look for: Template B fields collapsed into prose, specific numbers from Tab 5 KPIs.
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/seed-questions-day2.md
git commit -m "feat(lab): add Day 2 seed questions card"
```

### Task D3: System-prompt template — Analyst variant

**Files:**
- Create: `materials/practice-lab-vol2/cards/system-prompt-analyst.md`

- [ ] **Step 1: Author card**

```markdown
# System Prompt — Section Head Analyst (Day 1)

Paste this into Stage 2c (Claude Project custom instructions). Replace `[…]` placeholders with team-specific values.

**ROLE.** You are an analytical assistant working for a Section Head responsible for [unit/area]'s monthly operational review.

**TASK.** Investigate why May 2026 output deviated by 12% from target and produce decision-ready insights for unit leadership.

**CONTEXT.** Source material is the uploaded Report doc plus the Drive folder containing the Monthly Ops Workbook (5 tabs), Process Manual, Incident Brief, Vendor Notice, and Site Snapshots.

**EXAMPLES.** Use the `root-cause-investigator` Skill: Symptom → Evidence → Hypotheses → Verification. Cite every claim to a specific source (file + sheet + row, or doc + page). Mark evidence Strong/Moderate/Weak.

**OUTPUT.** Structured analytical briefings ready for a Section Head to act on. Refuse unsupported speculation per the Skill's refusal rules.
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/system-prompt-analyst.md
git commit -m "feat(lab): add analyst system-prompt template"
```

### Task D4: System-prompt template — Booster variant

**Files:**
- Create: `materials/practice-lab-vol2/cards/system-prompt-booster.md`

- [ ] **Step 1: Author card**

```markdown
# System Prompt — Team Leader Booster (Day 2)

Paste this into Stage 2c (Claude Project custom instructions). Replace `[…]` placeholders with team-specific values.

**ROLE.** You are a drafting assistant working for a Team Leader running daily execution in [unit/area].

**TASK.** Convert May 2026 operational data into ready-to-send communications — shift handovers, status updates, action lists, weekly recaps — to accelerate June 2026 execution.

**CONTEXT.** Source material is the uploaded Report doc plus the Drive folder (Monthly Ops Workbook, Process Manual, Incident Brief, Vendor Notice).

**EXAMPLES.** Use the `ops-comms-drafter` Skill templates A/B/C/D. Match the team's voice (plain, declarative, active). Cite sources where the reader might want to verify. Use "—" for missing data; never fabricate.

**OUTPUT.** Filled templates ready to paste into Slack/email/Docs. No fluff sections. No invented data.
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/system-prompt-booster.md
git commit -m "feat(lab): add booster system-prompt template"
```

### Task D5: Diagram-to-Artifact upgrade prompt card

**Files:**
- Create: `materials/practice-lab-vol2/cards/diagram-to-artifact.md`

- [ ] **Step 1: Author card**

```markdown
# Diagram → Artifact upgrade prompt

Use after Stage 3a, when the inline diagram is correct in shape but needs to become a real dashboard.

> "Convert this diagram into a full interactive dashboard Artifact. Wrap it in
> the design system tokens I'll paste next. Expand it to include all the
> required components for our persona (we'll list them). Pull supporting
> numbers from the Report doc. Render as a single self-contained HTML Artifact."
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/diagram-to-artifact.md
git commit -m "feat(lab): add diagram-to-artifact upgrade prompt card"
```

### Task D6: Claude Design HTML design-system prompt card

**Files:**
- Create: `materials/practice-lab-vol2/cards/design-system-prompt.md`

- [ ] **Step 1: Author card**

```markdown
# Claude Design — HTML design system prompt (Stage 3b)

Open Claude Design in a new browser tab. Drop in the slide template screenshot. Paste:

> "Generate a full HTML design system based on this brand: extract the color
> palette, typography scale, spacing scale, and a component library (cards,
> tables, charts, badges, buttons, headers, status pills) plus motion
> guidelines. Output as a single self-contained HTML page that renders an
> interactive style-guide reference, with each component shown live next to
> the code snippet I can copy. Use only the colors and fonts visible in the
> screenshot — no extras."

Expected wait: ~3 min. Download the result as one .html file.
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/design-system-prompt.md
git commit -m "feat(lab): add Claude Design HTML system prompt card"
```

### Task D7: Artifact build prompt — Day 1

**Files:**
- Create: `materials/practice-lab-vol2/cards/artifact-prompt-day1.md`

- [ ] **Step 1: Author card**

```markdown
# Artifact build prompt — Day 1 (Section Head Analyst Dashboard)

Use in Stage 3c. Back in the Claude Project chat:

> "Build an interactive dashboard Artifact for a Section Head's monthly review.
>
> Use this design system: [paste the HTML or its tokens/excerpt from Stage 3b].
>
> Required components, top to bottom:
> 1. Executive headline — one sentence stating the deviation and the recommended decision.
> 2. KPI scorecard row — cards with Target / Actual / Deviation %.
> 3. Daily output trend chart — May 1–31, line or area.
> 4. Cause-effect tree diagram — root cause → contributing factors → evidence chain. Reuse the diagram we made earlier.
> 5. Evidence-strength matrix — table: claim × source × Strong/Moderate/Weak.
> 6. Recommended next-step panel.
>
> Pull data from the Report doc and the Monthly Ops Workbook. Include a 'view source report' link to the Report doc URL. Render as a single self-contained HTML Artifact, responsive."

Iterate 2–3 times on layout; do not iterate on content (content comes from the Skill, not from layout requests).
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/artifact-prompt-day1.md
git commit -m "feat(lab): add Day 1 artifact build prompt card"
```

### Task D8: Artifact build prompt — Day 2

**Files:**
- Create: `materials/practice-lab-vol2/cards/artifact-prompt-day2.md`

- [ ] **Step 1: Author card**

```markdown
# Artifact build prompt — Day 2 (Team Leader Booster Dashboard)

Use in Stage 3c. Back in the Claude Project chat:

> "Build an interactive dashboard Artifact for a Team Leader's monthly review.
>
> Use this design system: [paste the HTML or its tokens/excerpt from Stage 3b].
>
> Required components, top to bottom:
> 1. Headline status — one sentence: what's done, what's in flight, what's blocked.
> 2. Kanban-style task board — Todo / In progress / Done columns.
> 3. Owner matrix — people × open items.
> 4. Status timeline / Gantt strip for the next 7 days.
> 5. Drafted comms preview pane — tabs for Handover · Status Update · Action List.
> 6. Templated download links — each drafted doc downloadable as .md or .txt.
>
> Pull data from the Report doc and the Monthly Ops Workbook. Include a 'view source report' link. Render as a single self-contained HTML Artifact, responsive."

Iterate 2–3 times on layout. Comms content stays from `ops-comms-drafter`.
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/artifact-prompt-day2.md
git commit -m "feat(lab): add Day 2 artifact build prompt card"
```

### Task D9: Naive-vs-proper prompt-pair handout

**Files:**
- Create: `materials/practice-lab-vol2/cards/naive-vs-proper.md`

- [ ] **Step 1: Author card**

Two side-by-side pairs (Day 1 + Day 2), each showing a vague prompt and the disciplined version, with a 1-line note explaining what improved.

```markdown
# Naive vs Proper — prompt pairs (warm-up handout)

## Day 1 — Section Head

NAIVE: "Why did output drop last month?"
PROPER: "Investigate why May 2026 output deviated 12% from target. Use the
Symptom → Evidence → Hypotheses → Verification structure. Cite each claim to
the workbook tab/row or document/page. Mark evidence strength."
WHY BETTER: time-bound · magnitude-specific · structure-locked · cite-required.

## Day 2 — Team Leader

NAIVE: "Write a handover note."
PROPER: "Draft an end-of-May shift handover using Template A. Pull open items
from Tab 3 incidents (May 28–31). Use '—' for any missing field. Don't invent
owners or times."
WHY BETTER: template-locked · source-locked · honest about gaps.
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/naive-vs-proper.md
git commit -m "feat(lab): add naive-vs-proper prompt-pair handout"
```

### Task D10: skill-creator coaching card (both personas)

**Files:**
- Create: `materials/practice-lab-vol2/cards/skill-creator-coaching.md`

- [ ] **Step 1: Author card**

```markdown
# Skill-Creator Coaching Card — Stage 4

In Stage 4b, you'll ask Claude in your Project: *"Use the skill-creator skill
to help us package what we built. Our new Skill should be called
`monthly-review-[persona]-dashboard`."*

skill-creator will ask you ~5 questions. Below are pre-written answers for each
persona — paste / paraphrase to keep Stage 4 under 5 minutes.

## Day 1 — Analyst dashboard answers

- **Purpose?** "To rebuild a monthly Section Head review dashboard in 10 min instead of 30."
- **When does it activate?** "Triggers: 'monthly review', 'build dashboard', 'analyst review', 'cause analysis dashboard'."
- **What does it produce?** "Interactive HTML Artifact with: executive headline · KPI scorecard · trend chart · cause-effect tree · evidence-strength matrix · recommended next-step panel."
- **Design system reference?** "Our company design system HTML (the one we generated in Stage 3b)."
- **Persona pairing?** "It calls root-cause-investigator. The dashboard renders that Skill's output; it does not bypass the 4-step structure."
- **Refusal rules?** "Refuse to produce dashboards with unsupported claims. If data is missing for a field, render '—' — never fabricate."

## Day 2 — Booster dashboard answers

- **Purpose?** "To rebuild a monthly Team Leader execution dashboard in 10 min instead of 30."
- **When does it activate?** "Triggers: 'monthly review dashboard', 'execution tracker', 'kanban for the month', 'team leader review'."
- **What does it produce?** "Interactive HTML Artifact with: headline status · kanban task board · owner matrix · 7-day Gantt · comms preview tabs · download links."
- **Design system reference?** "Our company design system HTML (from Stage 3b)."
- **Persona pairing?** "It calls ops-comms-drafter for all comms content; the dashboard renders the drafts but does not replace the templates."
- **Refusal rules?** "Refuse to fabricate ownership, dates, or numbers. '—' or '[need: source]' for missing fields."
```

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/cards/skill-creator-coaching.md
git commit -m "feat(lab): add skill-creator coaching card (both personas)"
```

---

## Phase E — Facilitator runbook (closes §14 open items 6, 7, 9)

### Task E1: Minute-by-minute facilitator runbook

**Files:**
- Create: `materials/practice-lab-vol2/runbook/facilitator-runbook.md`

- [ ] **Step 1: Draft the runbook**

Structure:
- `# Overview` — 90-min budget table, group/laptop layout, persona day switch.
- `# Pre-flight (T-30 min)` — reference E2 checklist.
- `# T+0 to T+5: Frame + form teams` — exact opening script.
- `# T+5 to T+25: Stage 1 GROUND` — facilitator cues for each phase 1a–1e (per spec §4.1), what to say at each minute mark, what to watch for, escape-hatch (pre-built NotebookLM fallback).
- `# T+25 to T+50: Stage 2 REASON` — phases 2a–2f, escape-hatch ("known-good system prompt" handout, address §11 risk row 6).
- `# T+50 to T+80: Stage 3 VISUALIZE` — phases 3a, 3b, 3c with prompt-card pointers, escape-hatch (pre-generated design system fallback, address §11 risk row 7).
- `# T+80 to T+85: Stage 4 AUTHOR` — phases 4a–4d, point at D10 coaching card.
- `# T+85 to T+90: Wrap + submit` — Gem 1-min mention, submission form pointer.
- `# Persona swap notes` — exactly what changes between Day 1 and Day 2 (3 cards swap: D1↔D2, D3↔D4, D7↔D8; Skill file uploaded swaps A1↔A2; example skeleton swaps A4↔A5). Everything else identical.
- `# Troubleshoot triage` — Drive Connector blocked → skip 2d; NotebookLM Studio fails → mark Slide Deck/Video bonus; Claude Design slow → use pre-generated fallback.

- [ ] **Step 2: Dry-read the runbook aloud against a stopwatch**

Goal: confirm the script fits 90 min without running long. If any stage's facilitator cue list takes >stage budget when read aloud, trim.

- [ ] **Step 3: Commit**

```bash
git add materials/practice-lab-vol2/runbook/facilitator-runbook.md
git commit -m "feat(lab): add facilitator runbook (Day 1 + Day 2 with persona swap)"
```

### Task E2: Pre-flight checklist

**Files:**
- Create: `materials/practice-lab-vol2/runbook/preflight-checklist.md`

- [ ] **Step 1: Draft checklist**

8 laptop preflights (one per group):
1. Open browser, log into committee-provided Claude Web account → confirm Project creation works.
2. Open NotebookLM, log in same Google account → confirm new notebook can be created.
3. Open the Drive folder share URL → confirm view + copy access works.
4. Open the pre-built NotebookLM fallback URL → confirm read access.
5. Open Claude Design (browser tab) → confirm load.
6. Test Drive Connector add in Claude → record green/yellow/red (yellow = "skip 2d").
7. Hand printed handouts to driver: Process Manual + seed-question card + system-prompt card + naive-vs-proper handout.
8. Driver signs preflight log.

Includes a "spare logins" section: facilitator carries 2 backup Claude Web credentials for §11 risk row 2.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/runbook/preflight-checklist.md
git commit -m "feat(lab): add pre-flight checklist"
```

### Task E3: Wrap-up submission form spec

**Files:**
- Create: `materials/practice-lab-vol2/runbook/submission-form-spec.md`

- [ ] **Step 1: Draft Google Form spec**

Form fields:
- Team name (short text)
- Persona (Day 1 Analyst / Day 2 Booster — radio)
- Artifact shareable link (URL)
- NotebookLM workbook share link (URL)
- HTML design system file (file upload)
- 2-sentence reflection: which handoff felt most useful and why (paragraph)
- Authored SKILL.md (file upload — Stage 4 take-home)
- Skill name (short text)

Spec lists field names, types, validations. Form itself is built by committee from this spec.

- [ ] **Step 2: Commit**

```bash
git add materials/practice-lab-vol2/runbook/submission-form-spec.md
git commit -m "feat(lab): add wrap-up submission form spec"
```

---

## Phase F — End-to-end dry runs

### Task F1: Day 1 dry run with a mock team

- [ ] **Step 1: Recruit 2–3 colleagues for a 90-min Day 1 run-through**

Use the actual starter pack, actual Skills, actual cards, actual runbook. Time each stage.

- [ ] **Step 2: Capture findings**

For each stage record: did the timing hold? Did teams find the deviation chain? Did the Artifact render? Did skill-creator produce a usable SKILL.md?

- [ ] **Step 3: Open issues**

Any item where the dry run failed or strained → file as an issue or TODO line in `materials/practice-lab-vol2/README.md` under `## Dry-run findings — Day 1`.

- [ ] **Step 4: Commit findings**

```bash
git add materials/practice-lab-vol2/README.md
git commit -m "test(lab): Day 1 dry-run findings"
```

### Task F2: Day 2 dry run with a mock team

- [ ] Repeat F1 for Day 2 (Team Leader persona). Record findings under `## Dry-run findings — Day 2`.

### Task F3: Fix the highest-severity findings, re-test the affected stage

- [ ] **Step 1: Sort findings by severity** (breaks the lab vs slows the lab vs polish).

- [ ] **Step 2: Fix every "breaks the lab" finding.** Re-run the affected stage with one mock team.

- [ ] **Step 3: Commit fixes**

```bash
git add materials/practice-lab-vol2/
git commit -m "fix(lab): address dry-run findings (severity: breaks-the-lab)"
```

---

## Self-review checklist (run by author before handoff)

- [ ] Every spec §7 row maps to a task in this plan (Skills A1/A2/A4/A5 · starter pack B2–B13 · seed-question cards D1/D2 · system-prompt template D3/D4 · diagram-to-artifact D5 · design-system prompt D6 · artifact prompts D7/D8 · naive-vs-proper D9 · skill-creator coaching D10 · runbook E1).
- [ ] Every spec §14 open item is addressed: seed questions (D1, D2), system prompts (D3, D4), Claude Design prompt (D6), Artifact build prompts (D7, D8), naive-vs-proper (D9), runbook (E1), preflight (E2), skill-creator coaching (D10), submission form (E3).
- [ ] §13 gap explicitly closed: Day 2 dashboard skeleton in A5.
- [ ] §13 validation gap explicitly closed: A3 runs all 6 seed prompts and records pass/fail.
- [ ] §11 risk rows have mitigations referenced from a task: NotebookLM block → C1; account fail → E2; Drive Connector → E1 troubleshoot; Design HTML slow → E1 escape-hatch; Studio fail → E1; Stage 2 falls behind → E1 known-good prompt; Stage 3c over → E1 escape-hatch.
- [ ] No mining-specific examples in body materials (per memory `feedback_generic_examples.md`). Confirm by grepping B2–B13 outputs for "coal", "mining", "tambang" — should be zero hits.
- [ ] All Skill files use direct authoring (Write tool, literal content) not copy-from-rendered-spec — avoids the nested triple-backtick rendering hazard.
- [ ] Free-stack constraint honored (memory `feedback_no_paid_components.md`): no paid fonts, no paid stock, no paid tooling. Wikimedia/Unsplash for snapshots; LibreOffice/Pages for PDF export; Google Sheets/Docs/Slides for deployment.

---

## Execution handoff

Plan complete and saved to `docs/plans/2026-05-16-practice-lab-materials.md`.

**Two execution options:**

**1. Subagent-Driven (recommended for this plan)** — Dispatch one subagent per task or per closely-related task cluster (e.g., B2–B6 workbook tabs as one cluster, D3–D4 system prompts as another). Fresh subagent per cluster · fast feedback loop · ideal when many tasks are independent content authoring (which most of B and D are).

**2. Inline Execution** — Execute tasks in this session sequentially with checkpoints. Better if you want me to draft each card and you review it conversationally before moving on. Slower but tighter control.

**Which approach?**
