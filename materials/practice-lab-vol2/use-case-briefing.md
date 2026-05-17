# Starter Pack Explainer — Facilitator's Case Briefing

*Read in 5 minutes. Use at the side of the room for live triage.*

---

## 1 · What this lab is

A 90-minute, 8-team practice lab (5 people per team, one laptop). Teams turn one month of operational data into an AI-augmented review — Report, Slide Deck, Video, interactive Artifact dashboard, HTML design system, a provided Skill, an authored Skill, and a configured Claude Project — using NotebookLM, Claude Project, Claude Design, and skill-creator. Not an AI demo; the point is to embed a discipline (root-cause investigation OR ops-comms drafting) into a tool so its outputs inherit that discipline.

---

## 2 · The scenario

An industrial unit ran May 2026 and missed its Volume target by 12%. The miss is concentrated in Week 3 (May 14–20), where three Critical incidents cluster on May 15, 16, and 17. The May 15 incident traces by component batch reference to a vendor receiving event on April 28, when a Delta Pratama shipment with inconsistent batch markings was classified as "administrative variance" and accepted without a QA hold. On May 14 the same vendor delivered only 200 of 500 ordered components, draining the buffer. The job is to surface that chain and decide what to do next month.

**Causal chain at a glance:**

- Apr 28 — Delta Pratama shipment accepted with paperwork variance, no QA hold (latent cause)
- May 14 — Delta Pratama delivers 200/500, 5-day lag (acute compounding cause)
- May 15–17 — three Critical incidents; May 15 traces by batch reference to Apr 28
- May 16 — Volume drops to 1,900; full-line stall 08:00–22:00; Defects spike to 9.1%
- Week 3 average Volume = 2,271 vs Week 2 = 3,023 (~25% w/w), driving the 12% monthly miss

---

## 3 · Starter pack files

| File | Role | One-line purpose |
|---|---|---|
| `01-monthly-ops-workbook/` | Raw data | 6-tab CSV workbook: Schema dictionary + daily output, shifts, incidents, vendor deliveries, KPI scorecard |
| `02-process-manual.md` | Rulebook | Who runs the review, who signs off, what escalates (v2.1, effective May 2026) |
| `03-incident-brief.md` | Story seed | Narrative writeup of the Apr 28 receiving event (INC-2026-0428) |
| `04-vendor-notice.md` | Contributing event | Delta Pratama letter dated May 16 explaining the May 14 partial delivery (PO-2026-0514) |
| `05-report-template.md` | Output container | Section Head's 5-section report skeleton: Summary, Findings, Evidence, Recommendations, Appendix |
| `06-slide-template.md` | Output container | 8-slide executive deck spec; also seeds the Claude Design HTML system in Stage 3b |
| `07-site-snapshots/` | Visual context | 3 labeled photos (receiving dock, batch inspection, component staging); not load-bearing |

---

## 4 · The data, by tab

### Schema (front of workbook)
Field-level dictionary explaining every column across every tab and cross-tab conventions (batch-reference syntax, vendor name canonical form, status semantics, two-row Partial→Backfill pattern). When a team asks "what does this column mean?", point here first.

### Tab 1 — Daily Output (31 rows, 9 columns)
Columns: `Date | Volume | Rejected_units | Scrap_units | Defects_pct | Yield_pct | Downtime_hrs | Energy_kWh | Headcount`. `Defects_pct` and `Yield_pct` are derived from Volume/Rejected/Scrap (Defects = Rej ÷ (Vol+Rej) × 100; Yield = Vol ÷ (Vol+Rej+Scrap) × 100). **Watch for:** Week 3 (May 14–20) is the broken week — Volume avg drops from 3,023 to 2,271, Downtime spikes to 12–14 hrs on May 15–17, Defects nearly triple to 9.1% on May 16. Every other week looks normal.

### Tab 2 — Shift Schedule (93 rows)
Date, Shift (Morning/Afternoon/Night), Team (Alfa/Bravo/Cendana), Start, End, Hrs_planned (always 8), Hrs_actual (always 8), Notes (blank). **Red herring.** Perfectly clean, perfectly uninformative. If a team is still mining Tab 2 at T+15, redirect to Tab 3.

### Tab 3 — Incidents (25 rows)
Date, Type, Severity (Low / Medium / Critical), Resolution_time_hrs, Root_cause, Linked_vendor, Notes. **Watch for:** three Critical rows on May 15, 16, 17. **The May 15 Notes field reads "Apr 28 lineage confirmed; see Incident Brief"** — that's the chain. May 15 and May 16 both list Delta Pratama. May 16's 14-hour resolution (Downstream stall) is what drives Volume to 1,900.

### Tab 4 — Vendor Deliveries (40 rows)
Date, Vendor (6: Surya Logistik, Mitra Industri, Cipta Karya, Bumi Persada, Nusantara Parts, Delta Pratama), Item, Qty_ordered, Qty_received, Status (Delivered / Delayed / Partial), Lag_days, Notes. Both Partial events follow the same two-row pattern: shortfall row + later backfill row. **Watch for:** the May 14 Delta Pratama row (200/500, 5-day lag, "see Vendor Notice 04") is the cause-event. May 19 Delta Pratama row (300 units, "Backfill of May 14 shortfall") is resolution, not a new event. Nusantara Parts May 13 partial has its matching May 15 backfill (2 units). Other vendors show within-SLA delays — red herrings.

### Tab 5 — KPI Targets (8 rows)
KPI, Target, Actual (formula-driven from source tabs), Variance_pct, Direction, Owner. **Actuals as of current workbook:**

| KPI | Target | Actual | Note |
|---|---|---|---|
| Volume | 100,000 | 87,870 | −12.1%, the headline miss |
| Yield_pct | 95 | 92.7 | lower-is-worse |
| Defects_pct | 2.2 | 3.8 | higher-is-worse |
| Downtime_hrs | 90 | 148 | higher-is-worse |
| Energy_kWh_per_unit | 0.67 | 0.681 | flat-tolerable, essentially at target |
| Vendor_on_time_pct | 92 | 80 | lower-is-worse |
| Safety_incidents | 0 | 1 | manual entry |
| Headcount_fill_pct | 100 | 99 | flat-tolerable, not the story |

Energy and Headcount are not the story; any team framing the miss as energy or staffing has misread the scorecard.

---

## 5 · The answer key

The right answer, in order, with evidence in parentheses:

1. **Volume missed 12%** — 87,870 vs 100,000 (Tab 5 Volume row; matches Tab 1 daily sum).
2. **Miss is one week — May 14–20** (Tab 1 daily Volume; Week 2 avg 3,023 → Week 3 avg 2,271).
3. **Three Critical incidents May 15–17** (Tab 3 Severity column).
4. **May 15 traces to Apr 28** (Tab 3 May 15 Notes: "Apr 28 lineage confirmed; see Incident Brief"; Incident Brief Evidence section names component-serial references back to the April 28 Delta Pratama batch).
5. **Apr 28 was a paperwork issue accepted without QA hold** (Incident Brief Timeline 09:00 + Initial Assessment; the 11:20 operator verbal query was not escalated).
6. **May 14 Delta Pratama shortfall compounded it** (Tab 4 May 14 row, 200/500, 5-day lag; Vendor Notice 04 dated May 16; Incident Brief "Why this is being re-examined").
7. **Two causes, not one** — the April latent (accepted-questionable-batch) AND the May acute (vendor shortfall). Neither alone produces a 12% miss; combination broke Week 3.

**Decision-ready recommendation:** Re-classify the Apr 28 acceptance protocol so any paperwork variance triggers mandatory QA hold (no "administrative variance" override). Open a Delta Pratama performance review before the June PO renewal. Owners: Section Head (protocol revision), Team Leader (vendor performance log). 30-day verification: zero administrative-variance acceptances; documented Delta Pratama review on file.

**Red herrings teams will chase:**

- Tab 2 shift rotation (flat 8-hour data, blank notes)
- Energy use (1,870–1,980 band even on May 16)
- Non-Delta vendor delays (all within SLA)
- Headcount (99% of target, no incident-week dip)
- Defect rate as primary cause (downstream symptom of the bad batch, not root)

---

## 6 · Personas and the 4-stage flow

### Personas

| Persona | Question | Skill | Outputs |
|---|---|---|---|
| **Section Head (Day 1) — Analyst** | Why did this happen? | `root-cause-investigator` (Symptom → Evidence → Hypotheses → Verification; cites every claim; rates Strong/Moderate/Weak; refuses unsupported speculation) | Monthly Report + 8-slide Executive Deck |
| **Team Leader (Day 2) — Booster** | What do we communicate now? | `ops-comms-drafter` (4 templates: A Shift Handover / B Status Update / C Action Items / D Weekly Recap; refuses to fabricate; every line traces to a source) | Action List, Weekly Recap, Status Update, Shift Handover |

Same data, different discipline. Analyst encodes evidence-tracing; Booster encodes template-fidelity and refusal-to-fabricate.

### 4-stage flow (90 min budget: 5 frame + 20 + 25 + 30 + 5 + 5 wrap)

| Stage | Tool | Time | Ends with |
|---|---|---|---|
| **1 · GROUND** | NotebookLM | T+5 → T+25 | Grounded summary with citations; May 15–17 / Apr 28 / Delta Pratama chain explicitly named. Background jobs: Slide Deck + Video Podcast. Foreground: Report doc shared as Google Doc. |
| **2 · REASON** | Claude Project | T+25 → T+50 | Project named for team+persona; Stage 1 Report + Incident Brief + Process Manual uploaded; persona system prompt in custom instructions; provided Skill uploaded; 2 seed-validation chats + 1 system-prompt iteration. |
| **3 · VISUALIZE** | Claude Design + Artifacts | T+50 → T+80 | **3a (5 min):** inline diagram in Project chat (root-cause tree Day 1 / workflow board Day 2). **3b (10 min):** Claude Design generates HTML design system from Slide Template screenshot. **3c (15 min):** interactive Artifact dashboard combining 3a + 3b tokens, shareable URL. |
| **4 · AUTHOR** | skill-creator | T+80 → T+85 | Authored SKILL.md (`monthly-review-analyst-dashboard` or `-booster-dashboard`) via 3–5 question interview, answers from skill-creator-coaching card. |

Wrap (T+85 → T+90): submission form — team name, persona, Artifact link, NotebookLM workbook link, HTML design system upload, 2-sentence reflection, SKILL.md upload.

---

## 7 · Live triage — read the room in 30 seconds

| If you see this... | Do this |
|---|---|
| Still debating shift patterns at T+15 | Off-track — Tab 2 is a red herring. Redirect to Tab 3 and May 15–17. |
| Stage 1 Report names May 15–17 / Apr 28 / Delta Pratama chain | On-track. Hands off cleanly; do not interrupt. |
| NotebookLM Q&A answers have no clickable citations | Indexing didn't complete or sources missing. Re-upload and re-run. |
| Stage 1 Report fails to name a single week as locus | Ask "When in May did the dip happen?" Send back to Tab 1. |
| Stage 2 chat output has no source citations | System prompt didn't bind. Re-paste `system-prompt-analyst.md` (or `-booster.md`) into Project custom instructions, NOT as a chat message. |
| Stage 2 output names energy or headcount as root cause | Misread Tab 5. Walk them to Variance_pct; show those are near target. |
| Still iterating system prompt at T+48 | Behind. Hand them the known-good card from `cards/system-prompt-analyst.md` (or booster). Paste verbatim, move on. |
| Stage 3a diagram has hypotheses but no evidence labels | Skill bypassed. Re-prompt with "evidence chain on each branch" (wording is in the card). |
| Stage 3b Claude Design has been spinning 8+ min | Hand them the pre-generated fallback HTML design system; skip 3b. |
| Stage 3c Artifact shows `[XX]` or `[fill]` placeholders | Stage 1 Report wasn't pasted. Re-paste with real numbers (87,870 / 100,000, 9.1% defects, May 15–17). |
| Stage 3c Artifact looks generic — no accent, default fonts | They skipped design-system tokens. Acceptable if behind; do not redo. |
| At Stage 4 with no sketch of "what should this Skill do?" | 60 seconds, 3 bullets: (1) what it produces, (2) structure it follows, (3) what it refuses. Then invoke skill-creator. |
| Authored SKILL.md missing `description:` line in frontmatter | Output was cut off. Ask skill-creator to "re-output the SKILL.md in full." |
| Submission form Artifact field blank at T+88 | Open Artifact → Share → copy URL. 30 seconds. |
| Reflection names "the NotebookLM → Claude Project handoff" as most useful | On-track and reflective; this is the load-bearing handoff the lab teaches. |
| Reflection is one word ("good", "useful") | Rushed. Accept the submission; flag for post-session debrief — these teams needed more time, not more steps. |

---

*Field guide v2.0 — May 2026. Read in 5 min; skim any section in 30 sec.*
