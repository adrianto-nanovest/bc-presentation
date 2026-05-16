# Practice Lab Design — BCE AI Catalyst Vol-2, Session 2

**Created:** 2026-05-16
**Author:** Adri (Nanovest) + Claude (brainstorming session)
**Status:** Locked design — ready for materials build + facilitator runbook
**Companion docs:** `docs/references/deck-full-content-analysis.md` (lab catalog source), memory files (audience framing, tooling conventions)

---

## 1. Purpose

Practice lab for the **Berau Coal Energy AI Catalyst Vol-2 Session 2** workshop. Designed to produce tangible, portable AI artifacts that attendees take home and reuse — not concept demonstrations. Sits immediately after Adri's 120-min lecture (which uses 90 min of the 120 for content + Q&A; this lab uses the remaining 90 min).

The lab teaches **tool-stitching across the Claude + Google ecosystems** through one shared end-to-end scenario, with two persona variants on alternating days.

## 2. Audience and format

| Dimension | Value |
|---|---|
| Headcount per session | ~40 attendees |
| Group size | 8 groups × 5 people |
| Equipment per group | 1 laptop only (likely no admin access) |
| Day cadence | Day 1 = Section Heads · Day 2 = Team Leaders (alternating; same workshop format) |
| Total time | 90 min (per BCE PIC doc, authoritative) |
| Tool environment | Claude Web only (Desktop / CLI unavailable). Google ecosystem: NotebookLM, Gemini, Gems, Drive, Docs, Sheets, Slides. **No** OpenAI/Codex, **no** n8n, **no** MCP install on attendee laptops. |
| Competition | Each group is a competition team; judging happens later (not inside the 90 min). |

### 2.1 Persona dichotomy

Per BCE PIC document, attendees split into two roles that receive the same workshop on different days:

| Persona | Mission | GenAI emphasis |
|---|---|---|
| **Section Head** (Day 1) | Insight & analysis maker — better control and decision | Structuring problems before AI · validating outputs · integrating GenAI into reporting & review |
| **Team Leader** (Day 2) | Execution booster — faster, more efficient daily tasks | Accelerating drafting · standardizing repeatable tasks · embedding GenAI into daily routines |

The lab uses the same scenario, same starter pack, same 4-stage flow, same tools both days — only the persona prompt, Skill, and Artifact deliverable shape differ.

## 3. Spine scenario — "Monthly Performance Review"

**Setup (told to all teams):**

> A mid-sized operational unit has just closed May 2026. Output deviated 12% from target. Last month's data lives in a shared workbook; incident reports, vendor notices, the process SOP, and visual briefing template are in the team's Drive folder. The unit's Section Head and Team Leader need GenAI-augmented artifacts to make sense of what happened (Section Head) and drive next-month execution (Team Leader). Your team has 90 min to build a complete AI-augmented workflow for one of the two personas.

**Persona-specific outcomes:**

- **Day 1 — Section Head:** Build an "AI Analyst" workflow that produces a written **Report doc** (analytical briefing), a **slide deck** (visual exec summary), a **video** (audio-visual overview), and an **interactive Artifact dashboard** focused on *big-picture insight and decision support* (KPI scorecards, deviation trend, cause-effect diagram, evidence matrix).

- **Day 2 — Team Leader:** Build an "AI Booster" workflow that produces a **Report doc** (action plan + assignments), a **slide deck** (visual progress brief), a **video** (status update), and an **interactive Artifact dashboard** focused on *operational execution* (kanban task board, owner matrix, status timeline, drafted comms templates).

## 4. The 4-stage flow

```
   STAGE 1 (20m)              STAGE 2 (25m)              STAGE 3 (30m)              STAGE 4 (5m)
   ───────────                ───────────                ───────────                ───────────
   GROUND (NotebookLM)        REASON (Claude Project)    VISUALIZE                  AUTHOR
   • upload 7 files           • upload Report doc        • 3a inline diagram (5m)   • invoke skill-creator
   • kickoff parallel:          (handoff from Stage 1)   • 3b Claude Design         • answer interview
     Report + Slide Deck      • paste persona system       → HTML design system     • download personally
     + Video                    prompt                     (10m)                      authored Dashboard
   • 3 guided Q&As            • add provided Skill .md   • 3c build Artifact          Maker Skill .md
   • download Report          • 2 seed validations         using design system +
   • handoff to Stage 2       • iterate prompt             persona-specific          (Gem mentioned 1 min
                                                          charts/tracker (15m)       at wrap, demo on ask)
```

**Three explicit handoffs** (because no native MCP/integration on locked-down laptops):

- **Handoff A:** Stage 1 → Stage 2. Download NotebookLM Report → upload to Claude Project as source file.
- **Handoff B:** Within Stage 3. Inline diagram in chat → "convert to a full Artifact dashboard."
- **Handoff C:** Within Stage 3. Slide Template screenshot → Claude Design generates HTML design system → paste tokens/components into Artifact prompt.

These handoffs are pedagogically valuable: they teach the real-world workflow of working across un-integrated AI tools.

### 4.1 Stage 1 · GROUND (20 min)

**Tool:** NotebookLM (browser, free)

| Phase | Time | Action |
|---|---|---|
| 1a · Upload | 3 min | Driver creates new notebook → uploads all 7 starter files. Team reads Process Manual on paper handout while indexing runs. |
| 1b · Background generations | 1 min | Driver kicks off NotebookLM Studio: **Slide Deck** + **Video Podcast** as background jobs (they cook while team works). |
| 1c · Guided Q&A | 8 min | Run 3 provided persona-specific seed questions; save each cited answer to notebook Notes panel. |
| 1d · Generate Report | 5 min | NotebookLM Studio → **Generate Report** (foreground). Wait ~2 min. Report is the structured handoff to Stage 2. |
| 1e · Handoff prep | 3 min | Download Report as Google Doc (or copy text). Verify Slide Deck + Video have generated. Slack/Drive the links for retrieval at wrap. |

**Deliverable from Stage 1:** Report doc + Slide Deck + Video — three NotebookLM outputs.

### 4.2 Stage 2 · REASON (25 min)

**Tool:** Claude Web Project + provided Skill markdown + Drive Connector (if working)

| Phase | Time | Action |
|---|---|---|
| 2a · Create Project | 3 min | New Claude Project named `Monthly Review [Persona] — [Team Name]`. |
| 2b · Upload sources | 3 min | Upload Stage 1's Report doc + (optionally) the Process Manual + Incident Brief directly. |
| 2c · Persona setup | 5 min | Paste provided system-prompt template (Role/Task/Context/Examples/Output). Add provided Skill `.md` to Project files. |
| 2d · Drive Connector (optional) | 2 min | If Connectors work, add Drive folder so Claude can pull source docs live. Skip if blocked. |
| 2e · Seed validation | 5 min | Run 2 provided seed questions, check that grounding holds and persona voice fits. |
| 2f · Iterate prompt | 7 min | Team revises persona spec based on output; driver re-runs. |

**Deliverable from Stage 2:** A persona-grounded Claude Project, ready to drive Artifact build.

### 4.3 Stage 3 · VISUALIZE (30 min)

**Tools:** Claude Project (chat + Artifacts) + Claude Design (separate browser tab)

| Phase | Time | Action |
|---|---|---|
| 3a · Inline diagram | 5 min | In Project chat: *"Render an interactive diagram of \[Day 1: the 3 most likely root causes with evidence chains / Day 2: the workflow board of pending tasks by status\]."* Claude renders Mermaid/SVG inline. Team confirms shape is right. |
| 3b · Claude Design — HTML design system | 10 min | Take screenshot of Slide Template (file #6). Open Claude Design new tab. Provided prompt: *"Generate a full HTML design system based on this brand: color palette, typography scale, component library (cards, tables, charts, badges, buttons), motion guidelines. Output as a single self-contained HTML page."* Wait ~3 min. Download HTML design system file. |
| 3c · Build Artifact | 15 min | Back in Project chat: *"Build an interactive dashboard Artifact. Use this design system: \[paste tokens or excerpt\]. Persona target: \[persona-specific spec — see §4.3.1\]. Pull data from the Report doc. Include the diagram from earlier."* Iterate 2–3 times on layout. |

#### 4.3.1 Persona-specific Artifact requirements

**Day 1 — Section Head Analyst Artifact (chart-heavy, big-picture):**

- KPI scorecard row (cards with target vs actual, deviation %)
- Daily output trend chart (line or area)
- Cause-effect tree diagram (refined from 3a)
- Evidence-strength matrix (table: claim × source × confidence)
- Executive headline at top: *"Output deviated by N% due to X; Y is the recommended decision."*

**Day 2 — Team Leader Booster Artifact (progress-tracker, execution):**

- Kanban-style task board (todo / in-progress / done columns)
- Owner matrix (people × open items)
- Status timeline / Gantt strip
- Drafted comms preview pane (handover note, status update, action email)
- Templated download links (drafted docs ready to send)

Both share: design system from Claude Design, consistent visual language, the diagram element from Stage 3a, and a "view source" link back to the Stage 2 Report doc.

### 4.4 Stage 4 · AUTHOR (5 min)

**Tool:** Claude Project + Anthropic's pre-built `skill-creator` Skill (invoked from within the team's Project)

**Goal:** Teams package the Artifact-build approach they just executed in Stage 3 as a reusable **Dashboard Maker Skill** — so future monthly reviews can rebuild a similar dashboard in a fraction of the time. They are not refining the persona Skill we provided (`root-cause-investigator` or `ops-comms-drafter`); they are authoring a *new* Skill that calls the persona Skill underneath.

The Skill captures:
1. Component structure (the §4.3.1 required components from their persona)
2. Design system reference (HTML output from Stage 3b)
3. Data source pattern (which sources fed which components)
4. Persona pairing (which provided Skill it calls)

| Phase | Time | Action |
|---|---|---|
| 4a · Parallel pre-work (in Stage 3) | (overlapped) | While Stage 3 driver builds the Artifact, two strategists sketch on paper: *"If we could ship a Skill that lets us rebuild this dashboard next month with new data, what should it tell Claude to do?"* They prepare 3–5 sentences. |
| 4b · Invoke skill-creator | 1 min | In Claude Project chat: *"Use the skill-creator skill to help us package what we built. Our new Skill should be called `monthly-review-[persona]-dashboard`."* |
| 4c · Answer skill-creator's interview | 3 min | skill-creator asks 3–5 questions (purpose, when to activate, structure, design system, refusal rules). Team responds using their pre-written sketch + Stage 3 outputs. |
| 4d · Receive + download | 1 min | skill-creator drafts a SKILL.md. Team downloads it. Personal authored take-home. |

**Take-home from Stage 4:** Each team owns a personally authored Dashboard Maker SKILL.md they can ship to teammates and reuse next month.

**Gem note:** Gemini Gem is demoted from a 5-min facilitator stage to a 1-min mention at wrap: *"Another portable form is a Gemini Gem — same persona, different shape, lives in your Google account. Ask any facilitator after the session if you want to see it."*

### 4.5 Wrap + submit (5 min)

Each team submits:
- Artifact shareable link
- NotebookLM workbook share link (so judges see Report + Slide Deck + Video)
- HTML design system file
- 2-sentence reflection on which handoff felt most useful

## 5. The 5-people-1-laptop choreography

| Stage | Driver task | Strategist tasks |
|---|---|---|
| Setup | Login + open Drive folder | Read Process Manual on paper handout; decide team name |
| Stage 1 | NotebookLM upload + Q&A driver | Others: read printed seed-question card; sketch persona spec |
| Stage 2 | Claude Project setup + prompt iteration | Others: refine persona spec; draft refusal rules; pick seed questions |
| Stage 3a | Run diagram prompt | Others: sketch desired diagram on paper (alignment check) |
| Stage 3b | Claude Design driver | Others: choose which slide to screenshot; review extracted tokens |
| Stage 3c | Artifact build driver | Others: critique layout, suggest iterations, write the headline copy |
| Stage 4 | Skill-creator driver answers interview | Strategists who pre-wrote the sketch in Stage 3 feed the driver answers; others verify the draft SKILL.md captures their intent |
| Wrap | Submit links | All write the 2-sentence reflection together |

Every stage has a clear team decision → driver executes → team reviews loop. Nobody disengages.

## 6. Starter pack — 7 files to prepare

### 6.1 File specifications

| # | File | Format | Specs |
|---|---|---|---|
| 1 | **Monthly Ops Workbook — May 2026** | Google Sheets (1 file, 5 tabs) | Tab 1: Daily Output Log (30 rows × 6 metrics — Volume, Downtime hrs, Defects, Yield %, Energy, Headcount). Tab 2: Shift Schedule (3 shifts × teams × hrs across the month). Tab 3: Incidents Log (~25 rows × Date / Type / Severity / Resolution / Root Cause). Tab 4: Vendor Deliveries (~40 rows × Date / Vendor / Item / Status / Lag). Tab 5: KPI Targets (8 KPIs × target / actual / variance). Numbers must be **traceable**: the 12% drop should correlate across Tabs 1+3+4 (incident spike + vendor delivery delay in week 3). |
| 2 | **Monthly Review Process Manual v2.1** | Google Doc | 2-page SOP: who runs the review, what data is needed, escalation rules, expected outputs |
| 3 | **Incident Brief — Apr 28 Critical Event** | Google Doc | 1-page narrative writeup of one critical incident, partial data, ambiguous causes |
| 4 | **Vendor Notice — Delivery Delay** | PDF | 1-page vendor letterhead explaining partial delivery miss in week 3 |
| 5 | **Monthly Briefing — REPORT TEMPLATE** | Google Doc | Empty/skeleton template defining the analytical report structure (Executive Summary / Findings / Evidence / Recommendations / Appendix). Used by Claude in Stage 2 to format the report deliverable, and as a design reference. |
| 6 | **Monthly Briefing — SLIDE TEMPLATE** | Google Slides (8 slides) | Empty visual template: cover · headline metric · driver analysis · incidents recap · vendor status · KPI scorecard · action items · sign-off. **Primary visual reference for Claude Design** in Stage 3b. |
| 7 | **Site Snapshots** | 2–3 PNG | Operational area photos with labels (illustrative, can be stock-like). Multimodal grounding. |

### 6.2 Distribution

- All 7 files live in one **Drive folder**: `BCE Lab — Starter Pack` (shareable link, view + copy)
- Backup: same files zipped on a USB drive (for if Drive access is blocked)
- One pre-built NotebookLM workbook (with all 7 files already ingested) as fallback: shareable link
- Each group receives: Drive folder link + printed handouts (Process Manual + prompt cards + seed questions)

## 7. Provided materials (everything we ship)

| Asset | Form | Used in | Notes |
|---|---|---|---|
| 7-file starter pack | Drive folder + zip backup | Stage 1 onward | §6 |
| Pre-built NotebookLM workbook | Shareable link | Stage 1 fallback | Teams fork it if their upload fails |
| Printed seed-question card | Card (2 versions: Day 1 / Day 2) | Stage 1 | 3 questions per persona |
| System-prompt template | Markdown + copy-paste card | Stage 2 | Two persona variants: Analyst / Booster |
| `root-cause-investigator.md` Skill | Markdown file | Stage 2, Day 1 | Persona-specific Skill |
| `ops-comms-drafter.md` Skill | Markdown file | Stage 2, Day 2 | Persona-specific Skill |
| Naive-vs-proper prompt-pair handout | One pager | Stage 2 warm-up | Optional if time allows |
| Diagram-to-Artifact upgrade prompt | Copy-paste card | Stage 3b | "Convert this diagram into..." |
| Claude Design HTML system prompt | Copy-paste card | Stage 3b | "Generate a full HTML design system based on..." |
| Artifact build prompt (per persona) | Copy-paste card | Stage 3c | Two persona variants |
| Skill-creator coaching card | One pager | Stage 4 | Pre-written sketch prompts so teams answer skill-creator's interview quickly |
| Example authored Skill skeleton (per persona) | Markdown reference | Stage 4 | Reference shape for what a team's authored Dashboard Maker Skill should look like (see §13.3) |
| Gem build sheet (optional, on-request) | One pager | Wrap mention | For facilitators to demo Gem one-on-one to interested teams |
| Facilitator runbook | Markdown doc | Lead-facing | Covers both days; minute-by-minute |

## 8. Take-home artifacts (per team)

After 90 min, each team owns:

1. **Report doc** — NotebookLM Report output (Google Doc), follows Report Template structure
2. **Slide Deck** — NotebookLM Studio output, visual briefing
3. **Video Podcast** — NotebookLM Studio output, audio-visual summary
4. **Interactive Artifact** — Claude shareable link, persona-specific (Section Head insight dashboard or Team Leader progress tracker)
5. **HTML design system file** — Claude Design output, reusable for any future Artifact
6. **Provided persona Skill markdown** — `root-cause-investigator.md` (Day 1) or `ops-comms-drafter.md` (Day 2); lives on disk
7. **Personally authored Dashboard Maker Skill markdown** — from Stage 4 skill-creator; their own composition; lives on disk
8. **Claude Project** — lives in their account, fully configured

**Eight tangible take-homes per team in 90 min.** Two are Skills the team authored or owns. The Project + the authored Skill mean the team can re-run a similar workflow next month in well under 30 min.

## 9. Judging hooks (for the post-lab competition)

Suggested rubric (judging happens later, outside the 90 min):

| Dimension | Weight | Section Head | Team Leader |
|---|---|---|---|
| Groundedness | 25% | Claims trace to sources | Drafts cite specific data |
| Persona discipline | 20% | Analyst voice + refusal rules respected | Booster tone + template fidelity |
| Visual quality | 20% | Charts informative + clear | Tracker usable + scannable |
| Design system fit | 15% | Artifact matches template tokens | Same |
| Stitch coverage | 20% | All 4 take-homes present + linked | Same |

## 10. The Stage 4 narrative — "you authored AI capability"

The lab's ending lands the deck's `F.4 — Skills: Write Once` slide as lived experience:

> *"You built an Artifact in 30 minutes. The Skill you just authored means next month's Artifact takes you 10 minutes. Build once, reuse forever — your AI capability compounds."*

The provided Skill (`root-cause-investigator` or `ops-comms-drafter`) showed them what a Skill looks like as a *consumer*. The authored Dashboard Maker Skill puts them in the *author* seat in 5 min. The arc — ground → reason → visualize → **author** — closes thematically: they leave as people who *make* AI capabilities, not just *use* them.

**Optional Gemini Gem comparison (1-min wrap mention):**

| | Claude Project + Skill version | Gem version |
|---|---|---|
| Sources | Drive Connector pulls live; uploaded Report doc; Skill structure | Static: GDrive files + NotebookLM workbook attached at setup |
| Custom logic | Skills + persona prompt + memory + iterative refinement | System instructions only |
| Output shape | Live Artifact (interactive, downloadable, iterable) | Chat-only response |
| **Where it wins** | Power, depth, full reasoning toolkit | Portability — lives in Gmail/Docs/Drive, daily-flow access |

Mentioned at wrap. Facilitators offer to demo the Gem version one-on-one for any team that asks.

## 11. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Locked-down laptops block NotebookLM | Low | Fallback to pre-built NLM workbook (shared link, view-only — they can still query) |
| Claude Web account access fails for a group | Low | Committee provides accounts; facilitator has 2 spare logins |
| Drive Connector blocked in Claude | Medium | Skip 2d; manually upload Report doc in 2b |
| Claude Design HTML output too slow | Low | Pre-generate a fallback design system file teams can copy if Design tab fails |
| NotebookLM Studio outputs (Slide/Video) fail to generate | Medium | Mark as bonus — only Report is mandatory for Stage 2 handoff |
| Team falls behind on Stage 2 prompt iteration | High | Provide a "known-good" system prompt as escape hatch (skip iteration if needed) |
| 90 min is tight — Stage 3c runs over | High | Pre-loaded design-system file allows skipping 3b if 3a runs long; provide 1-paste Artifact prompt as fallback |

## 12. Conventions (deck-wide rules carried in)

- **Audience framing:** no commit counts, no "solo" callouts, plain language (per memory `feedback_audience_framing.md`)
- **Generic examples:** body of the lab uses universal knowledge-work framing; nothing mining-specific (per memory `feedback_generic_examples.md`)
- **Portability priority:** every deliverable must survive past the workshop and across employers (per memory `project_bce_transition_context.md` — private context)
- **Free-stack only:** all tools/assets used must be free, no paid components (per memory `feedback_no_paid_components.md`)

## 13. Provided Skill markdowns (LOCKED — copy into facilitator runbook)

### 13.1 `root-cause-investigator.md` (Day 1, Section Head Analyst)

```markdown
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
```

### 13.2 `ops-comms-drafter.md` (Day 2, Team Leader Booster)

```markdown
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
```

### 13.3 Authored Dashboard Maker Skill — example skeleton (Day 1)

Provided as a reference for facilitators when they coach teams through skill-creator. Each team produces a personalized variant.

```markdown
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
```

Day 2 parallel: `monthly-review-booster-dashboard` — pairs with `ops-comms-drafter`, renders kanban + owner matrix + drafted-comms preview pane instead.

## 14. Open items for facilitator runbook (next sub-spec)

- Exact wording of the 3 seed questions per persona
- Full text of system-prompt templates (Analyst + Booster)
- Exact wording of the Claude Design HTML generation prompt
- Exact wording of the Artifact build prompts (per persona)
- Naive-vs-proper prompt pair examples (one per persona)
- Minute-by-minute facilitator script (warm-up, transitions, time calls, troubleshoot triage)
- Pre-flight checklist (8 laptop preflights, login verifications, Drive folder permissions)
- skill-creator coaching cards (what answers to give to its interview questions)
- Wrap-up submission form (Google Form for team artifact submissions + reflections)

## 15. Out of scope

- Deck slides referencing the practice lab (handled in K.1)
- The competition judging session itself (separate process)
- Any Section A hook content (already specified in deck)
- Any post-lab follow-up materials or graduation certificates

---

## Appendix A — Why this design

**Why one shared scenario, two persona variants:**
- Same facilitator runbook works both days with persona-text swaps
- Same starter pack across days = half the prep work
- Section Head and Team Leader audiences see the same scenario differently → reinforces the "AI shape vs vendor" mental model from G.7

**Why handoffs over integrations:**
- IT-locked laptops can't install MCP, so handoffs are the only realistic workflow
- Handoffs teach a transferable skill: how to work *across* un-integrated AI tools (true for 95% of real workplaces)
- Each handoff produces a downloadable file, which doubles as a take-home artifact

**Why Claude Design produces a full design system (not just polish):**
- Adri's specific request: the Artifact should look like a real company artifact
- A full HTML design system is itself a tangible take-home
- Teaches "extract the brand from existing artifacts" — generalizable pattern

**Why NotebookLM Report over Audio Overview:**
- Audio is consume-only; Report is handoff-able
- Report doubles as one of the four take-home deliverables
- Adri's stated preference: Report / Slide Deck / Video > Audio Overview

**Why Stage 4 became AUTHOR (skill-creator), not a Gem demo:**
- Hands-on team activity > watch-the-facilitator
- Take-home is a personally authored Skill, the most empowering possible artifact
- Reinforces *"AI is the bridge"* — they're now building the bridge, not just crossing it
- Lands deck slide F.4 (Skills: Write Once) as lived experience, not concept
- Gem becomes a 1-min wrap mention; demo available to interested teams on request
