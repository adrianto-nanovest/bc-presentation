# Section Head — Workshop Runbook

*A runbook compiling every prompt, seed question, and coaching note the Section Head persona uses across the 90-minute lab, in the order they're needed.*

> **Source-of-truth for revising the Section Head Workshop Runbook Google Doc.** Structurally parallel to `Team Leader — Workshop Runbook.pdf`; different content reflects the Analyst (vs Booster) persona — outputs are a Monthly Report + 8-slide Executive Deck, Skill is `root-cause-investigator`, and deep-research anchors to RCA frameworks instead of operational-communications frameworks.

---

## Pre-flight

### Use Case

An industrial unit ran May 2026 and missed its Volume target by 12%.
The miss is concentrated in Week 3 (May 14–20), where three Critical incidents cluster on May 15, 16, and 17.
The May 15 incident traces by component batch reference to a vendor receiving event on April 28, when "Delta Pratama" (one of vendors) shipment with inconsistent batch markings was classified as "administrative variance" and accepted without a QA hold.
On May 14 the same vendor delivered only 200 of 500 ordered components, draining the buffer.
The job is to investigate that chain, rate the evidence, and produce an audit-defensible decision for next month.

**Causal chain at a glance:**

1. **Apr 28** — Delta Pratama shipment accepted with paperwork variance, no QA hold (latent cause)
2. **May 14** — Delta Pratama delivers 200/500, 5-day lag (acute compounding cause)
3. **May 15–17** — three Critical incidents; May 15 traces by batch reference to Apr 28
4. **May 16** — Volume drops to 1,900; full-line stall 08:00–22:00; Defects spike to 9.1%
5. **Week 3** — Average Volume = 2,271 vs Week 2 = 3,023 (~25% w/w), driving the 12% monthly miss

### What to Do

1. Opens the browser
2. Signs into Claude (https://claude.ai) and NotebookLM (https://notebooklm.google.com)
3. Skimming on the `starter-pack` files

### 4 Stages Coverage

1. **GROUNDING TRUTH** in NotebookLM (Deep Research & Google Drive files)
2. **REASONING** in Claude Project (Field Guide Report from NotebookLM)
3. **VISUALIZE** with Claude Design + Artifacts (based on slides shared)
4. **AUTHOR** with skill-creator (reusability on analytical dashboard generation)

---

## Warm-up — Naive vs Proper

**NAIVE:** "Tell me what went wrong in May."
**PROPER:** "Investigate the May 2026 Volume deviation using the Symptom → Evidence → Hypotheses → Verification structure. Cite every claim to a specific source (file + tab + row). Rate each evidence item Strong / Moderate / Weak. Refuse any root cause lacking at least one Strong item."
**WHY BETTER:** structure-locked · source-locked · evidence-rated · refusal-aware.

---

## Stage 1 — GROUNDING TRUTH (NotebookLM)

### Phase 1a · Upload sources

1. Open https://notebooklm.google.com
2. Create a new notebook named "[Team Name] — Monthly Review May 2026".
3. Upload all 4 starter files from the shared Drive folder (**Add Sources** > **Drive** > In "**Search Bar**", paste `starter-pack` > select all files inside > **Insert**)
   a. Monthly Ops Workbook (Google Sheets)
   b. Process Manual (Google Docs)
   c. Incident Brief (docx)
   d. Vendor Notice (PDF)
4. Wait ~2 min for indexing, kickoff Phase 1b

### Phase 1b · Generate Slide Deck + Video Overview + Deep Research

1. Go to **Studio** on the right side.
2. Select **"Slide Deck"** (on ">" symbol).
3. Use the prompt below in the **"Describe the slide deck you want to create"** field.
4. **Slide Deck prompt**

   ```
   Create an 8-slide executive briefing for unit leadership reviewing
   May 2026 performance.
   Audience: the people who approve decisions and allocate resources for June.
   Structure:
   1. Cover — period, presenter (Section Head), unit/area;
   2. Headline metric — actual vs target Volume, variance %, one-sentence
      caption beneath;
   3. Driver analysis — cause-effect tree: root cause → contributing factors
      → evidence chain; 3 hypothesis branches, confirmed branch highlighted,
      ruled-out branches greyed; Strong / Moderate / Weak labels per branch;
   4. Incidents recap — table of top 5 incidents sorted Critical → Medium →
      Low, columns | Date | Type | Severity | Resolution (hrs) | Status |
      (make it in table);
   5. Vendor status — vendor scorecard with on-time rate per vendor,
      Delta Pratama highlighted, quality flag column, overall on-time % in
      header;
   6. KPI scorecard — 8-cell grid (Volume · Yield · On-time · Defects ·
      Downtime · Energy · Headcount · Safety) with Target / Actual /
      Variance %;
   7. Recommendations — action items kanban (To Do · In Progress · Done);
      each card with action · owner (Section Head or Team Leader) · due date;
   8. Sign-off — two signature blocks (Section Head + Team Leader),
      review period label.
   Style: analytical, decision-ready, no fluff.
   Use "—" for any missing data. Every claim cites a source (file + tab + row,
   or doc + page) where the reader might verify. Mark evidence
   Strong / Moderate / Weak.
   ```

5. You can select **preferred language**, use **"detailed deck"**, and **"default"** length. Then **"Generate"**
6. Now do the similar thing on **"Video Overview"** (on ">" symbol).
7. Use the second prompt below in the **"What should the AI hosts focus on?"** field
8. **Video Overview Prompt**

   ```
   Focus on how the May 2026 Volume miss happened — the root-cause
   investigation explained for unit leadership.

   Walk through content:
   1. SYMPTOM — what deviated, magnitude, time window, baseline comparison.
      Lead with the headline number (87,870 vs 100,000; −12.1%) and the
      affected window (Week 3, May 14–20).
   2. EVIDENCE — the data points anchoring the investigation, each rated
      Strong / Moderate / Weak with source cited (Monthly Ops Workbook tab
      + row, Incident Brief page, Vendor Notice).
   3. HYPOTHESES — three candidate explanations ranked by evidence strength;
      for each, name what would falsify it. Lead with the strongest.
   4. VERIFICATION — what additional evidence would close the loop;
      who needs to be interviewed; what data still to check before June.
   5. DECISION-READY RECOMMENDATION — one specific action with named owner,
      expected impact on the affected metric, and a 30-day verification
      metric that would confirm the action worked.

   Frame the Apr 28 latent cause + May 14 acute cause chain as the
   load-bearing finding — neither alone produces a 12% miss; their
   alignment broke Week 3.

   Tone: analytical, declarative, audit-defensible. No narration filler.
   ```

9. You can select **"Explainer"** format, **preferred language**, and **visual style** as you want.
10. These run in the background, continue to kick off Deep Research
11. Click **"Add Sources"** > Change **"Fast Research"** to **"Deep Research"** and paste the prompt below
12. **Deep Research prompt**

    ```
    Research best-practice root-cause analysis (RCA) frameworks used by
    continuous-process operations (mining, oil & gas, petrochemicals,
    manufacturing) for investigating critical incidents and metric
    deviations.

    Cover four investigative methodologies:
    1. 5-Whys causal-chain tracing (Toyota Production System lineage);
    2. Fishbone / Ishikawa categorization (Man · Method · Machine · Material
       · Measurement · Environment);
    3. Fault Tree Analysis (FTA) — top-down logical decomposition used in
       petrochemical and mining safety cases;
    4. Bow-Tie analysis — cause × event × consequence per ISO 31010.

    Separately cover evidence and causation conventions:
    - Latent vs acute cause distinction (Reason's Swiss Cheese model);
    - Evidence-strength hierarchy (multiple independent corroboration → single
      primary source → inference);
    - Counterfactual reasoning ("would the outcome have occurred without
      this event?");
    - Audit-defensible reporting structures: ICAM (Incident Cause Analysis
      Method), TapRooT, ISO 45001 / ICMM mining standards.

    Focus on patterns practical for a Section Head producing audit-defensible
    monthly reviews — not academic theory.
    Prioritize established industry standards (ISO, OSHA, API, ISA, ICMM),
    operations management literature, and post-incident case studies from
    continuous-process industries.
    ```

### Phase 1c · Seed Questions

Use these in Stage 1c (NotebookLM Q&A). Save each cited answer to the Notes panel.

1. **Why did May 2026 Volume deviate from target, and what is the magnitude?**
   Look for: deviation magnitude, time window, top 2 contributing factors.
2. **Which incidents most likely drove the deviation, and what evidence supports each?**
   Look for: incident IDs from Tab 3, severity/timing, vendor linkages.
3. **What is the single most decision-ready recommendation for June 2026?**
   Look for: one specific action, named owner, expected impact, 30-day verification metric.

### Phase 1d · Generate Field Guide + Report

In NotebookLM **Studio** → click **"Create Report"** → choose **"Create Your Own"** format → paste the Field Guide prompt below. Then **"Generate"**. The Field Guide generates in the background.

**Field Guide prompt**

```
Create a Section Head Investigation Field Guide that fuses the external
best-practice RCA patterns from the Deep Research Report source with our
specific May 2026 internal data (Monthly Ops Workbook, Incident Brief,
Vendor Notice, Process Manual).

Structure as 5 sections, each ~150 words:

1. Symptom Framing — Bow-Tie / ISO 31010 conventions, applied to our
   May 2026 Volume miss (87,870 vs 100,000; −12.1%), which contains:
   PERIOD: [start–end]
   METRIC: [name · target · actual · variance %]
   BASELINE: [comparison window]
   AFFECTED WINDOW: [specific week or day cluster]
   AUDIT TRAIL: [source · tab · row];

2. Evidence Inventory — Hierarchy-of-evidence conventions, applied to our
   Tab 1–5 data, Incident Brief, and Vendor Notice, which contains:
   | # | Claim | Source | Strength (Strong / Moderate / Weak) | Notes |
   (make it in table);

3. Hypothesis Set — 5-Whys + Fishbone + counterfactual reasoning, applied
   to our Apr 28 + May 14 + May 15–17 chain, which contains:
   | # | Hypothesis | Supporting evidence | Falsification test | Rank |
   (make it in table);

4. Latent vs Acute Decomposition — Reason's Swiss Cheese model, applied to
   Apr 28 paperwork variance (latent) + May 14 Delta Pratama shortfall
   (acute), which contains:
   LATENT LAYER: [system-level vulnerability]
   ACUTE TRIGGER: [precipitating event]
   ALIGNMENT MECHANISM: [why both fired together]
   PREVENTION POINT: [where the chain could have been broken];

5. Decision Frame — ICAM / audit-defensible recommendation structure,
   applied to our June 2026 forward priorities, which contains:
   | # | Action | Owner | Expected impact | 30-day verification | Source |
   (make it in table).

For every section, cite both the external best-practice source AND the
specific internal source (file + tab + row where possible).
Use "—" for any data gap; never fabricate.
Tone: analytical, declarative, audit-defensible.
```

### Phase 1e · Handoff prep

When Report is ready, click **Export to Docs** and you can download it as **PDF** or leave it as is.
Verify the Slide Deck + Video background jobs show "**Done**" or visible progress.
If either shows an error, mark as bonus — only the Report is mandatory for Stage 2.
Driver Google Drive-shares the Report doc link with the team.

---

## Stage 2 — REASONING (Claude Project)

### Phase 2a · Create Project

1. Opens Claude Web / Claude Desktop Chat
2. Create New Project → names it "**Monthly Review Analyst — [Team Name]**".

### Phase 2b · Upload sources

Upload to Project files (drag into the Project instructions panel or use file upload):

1. Monthly Ops Workbook
2. Field Guide from Phase 1d (provides external best-practice anchoring)
3. Incident Brief
4. Vendor Notice
5. Process Manual

### Phase 2c · Drive Connector (optional)

If enabled, add the Drive folder to the Project via Connector — gives Claude live access to all 4 starter files. If blocked, skip — the manually uploaded files from 2b are sufficient.

### Phase 2d · Persona setup

Paste this into Project Instructions

```
ROLE: You are an analytical assistant working for a Section Head responsible
for [unit/area]'s monthly operational review.

TASK: Investigate why May 2026 Volume deviated by 12% from target and
produce decision-ready insights for unit leadership — Findings, Evidence,
Hypotheses, Recommendations — for June 2026 action.

CONTEXT: Source material is the uploaded Field Guide Report, Monthly Ops
Workbook, Process Manual, Incident Brief, Vendor Notice.

EXAMPLES. Use the root-cause-investigator Skill structure (Symptom →
Evidence → Hypotheses → Verification). Apply the Field Guide's external
RCA conventions (5-Whys · Fishbone · Bow-Tie · ICAM · Reason's Swiss
Cheese). When investigating, anchor against both the external best-practice
patterns from the Field Guide AND the internal data from the Workbook /
Incident Brief / Vendor Notice. Cite both for every finding the reader
might want to verify. Use "—" for missing data; never fabricate.

OUTPUT. Structured analytical briefings ready for a Section Head to act on.
Refuse unsupported speculation per the Skill's refusal rules. Rate every
evidence item Strong / Moderate / Weak. Refuse any conclusion lacking at
least one Strong evidence item. No fluff sections. No invented data.
```

Then upload the provided [skill](skills/root-cause-investigator.md) to **Customize** > **Skills** > **+** > **Create Skill** > **Upload a Skill**

### Phase 2e · Seed validation

Need to run the prompt below in a new chat within the Project.
What to check:
1. Does Claude cite sources?
2. Does the Skill's 4-step structure appear in the output?
3. Are evidence items rated Strong / Moderate / Weak?
4. Is the persona voice right?

Paste prompt:
```
/root-cause-investigator Investigate why May 2026 Volume missed target.
```

### Phase 2f · Iterate prompt

Based on seed validation, revise one element of the system prompt (tighten the role statement, add a refusal rule, adjust output format).
Re-runs one question to confirm improvement. Refer back to the Warm-up section
if a team needs help converting a vague query into a structured prompt.

---

## Stage 3 — VISUALIZE

### Phase 3a · Inline diagram

Inside Claude Project chat, paste this prompt:
```
Render a cause-effect tree of all hypotheses grouped by evidence strength
(Strong / Moderate / Weak), with the confirmed root-cause branch highlighted
and ruled-out branches greyed.
```
Confirm the diagram shape is right. If not, iterate once with a correction.

### Phase 3b · Claude Design HTML system

*When you use this: in Stage 3b, in a new Claude Design tab — drop in the slide template screenshot first, then paste the block below to generate a single-file HTML style guide you'll reuse downstream.*

1. Open Claude Design (https://claude.ai/design) in a new browser tab.
2. Go to "Design Systems" tab > Create
3. Put any name you want, "**Report Design System**" for example
4. In "Link code on GitHub", put: **https://github.com/adrianto-nanovest/bc-presentation**
5. If need to login to Github, just use Google Single Sign-On
6. "In Any other notes?" Paste prompt:

   ```
   Generate a full HTML design system based on this code reference: extract
   the color palette, typography scale, spacing scale, and a component
   library (cards, tables, charts, badges, buttons, headers, status pills)
   plus motion guidelines.

   Output as a single self-contained HTML page (design-system.html) that
   renders an interactive style-guide reference, with each component shown
   live next to the code snippet I can copy.

   Use only the colors and fonts available in the code — no extras.
   ```

7. Download the result as one .html file (ensure it has name **design-system.html**)
8. **OR** if the **Github link has issue**, you can download it [here](starter-pack/06-slide-template.md)
9. Upload it into Project files

### Phase 3c · Build Your Analyst Dashboard Artifact

Go to new Claude Project chat, paste prompt:

```
Build an interactive dashboard Artifact for a Section Head's monthly review.
Use design-system.html in your project file.
Required components, top to bottom:
  1. Executive headline — one sentence stating the deviation and the
     recommended decision.
  2. KPI scorecard row — cards with Target / Actual / Deviation %.
  3. Daily output trend chart — May 1–31, line or area; highlight the
     broken-week May 14–20.
  4. Cause-effect tree diagram — root cause → contributing factors →
     evidence chain. Reuse the diagram from Stage 3a.
  5. Evidence-strength matrix — table: claim × source × Strong / Moderate
     / Weak.
  6. Recommended next-step panel — action · owner · expected impact ·
     30-day verification metric.
  7. Templated download links — Report doc downloadable as .md or PDF
     or .docx.
Pull all data needed from other project files.
Include a 'view source report' link.
Render as a single self-contained HTML Artifact, responsive.
```

Iterate 2–3 times on layout.

---

## Stage 4 — AUTHOR (skill-creator)

*When you use this stage: to package the Artifact-build method as a personally authored Analyst Dashboard Maker Skill.*

### Phase 4a · Pre-work check

During Stage 3c, you should have sketched the answer to "If we shipped a Skill that lets us rebuild this dashboard next month with new data, what would it tell Claude to do?" (3–5 sentences).
If not done, give the team 1 min to write 3 bullets:

1. What does the Skill produce?
2. What structure must it follow?
3. What does it refuse to do?

### Phase 4b · Invoke skill-creator

In the Claude Project chat (which built the artifact), paste prompt:

```
Use the skill-creator skill to help us package what we built. Our new Skill
should be called monthly-review-analyst-dashboard.
```

### Phase 4c · Answer the interview

Below are pre-written answers — paste / paraphrase to keep Stage 4 under 5 minutes.

**Analyst dashboard answers**
- **Purpose?** — "To rebuild a monthly Section Head analytical review dashboard in 10 min instead of 30."
- **When does it activate?** — "Triggers: 'monthly review dashboard', 'analytical tracker', 'cause-effect for the month', 'section head review', 'root-cause dashboard'."
- **What does it produce?** — "Interactive HTML Artifact with: executive headline · KPI scorecard · daily trend chart · cause-effect tree · evidence-strength matrix · recommendation panel · download links."
- **Design system reference?** — "Our company design system HTML (from Stage 3b)."
- **Persona pairing?** — "It calls root-cause-investigator for all analytical content; the dashboard renders the investigation but does not replace the Skill's 4-step structure."
- **Refusal rules?** — "Refuse to fabricate evidence, conclude a root cause without at least one Strong evidence item, or drop the Symptom / Evidence / Hypotheses / Verification structure. '—' or '[need: source]' for missing fields."

---

*Runbook v2 compiled May 2026. Pairs with the Process Manual, Monthly Ops Workbook, Slide Template, and supporting starter-pack materials in the parent BC Presentation folder.*
