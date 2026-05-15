# Practice Lab Facilitator Runbook — BCE AI Catalyst Vol-2, Session 2

> Covers both Day 1 (Section Head, Analyst persona) and Day 2 (Team Leader, Booster persona). The lab uses the same scenario, same starter pack, same 4-stage flow, same tools both days; only the persona prompts, Skill, and Artifact deliverable shape differ.

---

## Overview

| Item | Value |
|---|---|
| Total duration | 90 min |
| Headcount | ~40 attendees, 8 groups × 5 people |
| Equipment | 1 laptop per group |
| Tools | Claude Web (Project + Artifacts + Design tab), NotebookLM, Google Drive |
| Take-homes per team | 8 (Report doc · Slide Deck · Video · Artifact · HTML design system · provided Skill · authored Skill · Claude Project) |
| Day 1 persona | Section Head — Analyst (insight + decision support) |
| Day 2 persona | Team Leader — Booster (execution + comms drafting) |

---

## Pre-flight (T−30 min)

Run `runbook/preflight-checklist.md` against all 8 group laptops. Every laptop must be green before T+0. Facilitator carries 2 spare Claude Web logins (see Spare logins section in the checklist). Do not start the session until all 8 sign-off rows are filled.

---

## T+0 to T+5 — Frame + form teams

**T+0** — Call the room to attention.

Say: *"Each group is a competition team. You have 90 min to build an AI-augmented monthly review workflow. Drivers, claim a laptop. Strategists, take the printed handouts."*

**T+1** — While drivers sit down, briefly orient:

*"Your team represents an operational unit that just closed May 2026 with a 12% output miss. The data, the incident record, the vendor notice, and the SOP are all in your starter pack. You have 90 min to build the workflow that makes sense of what happened — and sets up next month. Judges see your outputs after today. Your goal is complete and grounded work, not speed."*

**T+2–3** — Teams decide a team name. Driver opens the browser; strategists read the Process Manual on paper.

**T+4** — Announce stage sequence: *"Four stages: GROUND in NotebookLM, REASON in Claude Project, VISUALIZE with Claude Design + Artifacts, AUTHOR with skill-creator. Each stage has a printed card. Drivers follow the card. Strategists coach."*

**T+5** — Cue Stage 1 start.

---

## T+5 to T+25 — Stage 1 · GROUND (NotebookLM)

*Goal: ingest all 7 starter files, run 3 guided Q&As, download the Report, verify the Slide Deck + Video are generating.*

**T+5–8 (Phase 1a · Upload)**

Driver opens `notebooklm.google.com`, creates a new notebook named `[Team Name] — Monthly Review May 2026`.

Uploads all 7 starter files from the shared Drive folder:
- Monthly Ops Workbook (Google Sheets or CSV)
- Process Manual (`02-process-manual.md`)
- Incident Brief (`03-incident-brief.md`)
- Vendor Notice PDF (`04-vendor-notice.pdf`)
- Report Template (`05-report-template.md`)
- Slide Template (`06-slide-template.md` or screenshot)
- Site Snapshots (`07-site-snapshots/` — 2–3 PNGs)

While indexing runs (~2 min), strategists read the printed Process Manual handout.

**T+8–9 (Phase 1b · Background generations)**

Driver goes to **NotebookLM Studio**, kicks off two background jobs:
- **Slide Deck** → Start generating
- **Video Podcast** → Start generating

These run in the background during Q&A. Do not wait for them now.

Facilitator sweep: check that all 8 groups have the Studio background jobs running. If any group's NotebookLM is blocked, direct them to the pre-built fallback workbook (URL in preflight).

**T+9–17 (Phase 1c · Guided Q&A)**

Teams use the printed seed-question card:
- Day 1: `cards/seed-questions-day1.md`
- Day 2: `cards/seed-questions-day2.md`

Driver types each of the 3 questions into NotebookLM. After each answer, click **Save to notes** (the save-to-panel button). Strategists verify the cited sources look right.

**T+15** — 2-minute warning before 1d. *"Two minutes — finish your third question and save it to notes."*

**T+17–22 (Phase 1d · Generate Report)**

Driver: NotebookLM Studio → **Generate Report** (this is a foreground action — wait ~2 min for it to complete).

While waiting: strategist team reviews the 3 saved note answers; begin sketching what the Stage 2 persona prompt should say.

**T+22–25 (Phase 1e · Handoff prep)**

Driver: when Report is ready, click **Download** → save as Google Doc (or copy the text to a new Google Doc in the shared Drive folder).

Verify: Slide Deck + Video background jobs show "Done" or progress indicator. If either shows an error, note it — mark as bonus, only Report is mandatory for Stage 2.

Driver Slack/Drive-shares the Report doc link with the team.

**T+25** — Announce Stage 2: *"Drivers, download complete? Great. Open Claude Web in a new tab — you're moving into Stage 2."*

**Escape-hatch (Stage 1):** If NotebookLM is fully blocked, direct team to pre-built fallback workbook (shared link in preflight). They can still query it, run the 3 seed questions, and save answers to notes. The Report from the fallback counts for Stage 2.

---

## T+25 to T+50 — Stage 2 · REASON (Claude Project)

*Goal: create a persona-grounded Claude Project with the provided Skill and two seed validations completed.*

**T+25–28 (Phase 2a · Create Project)**

Driver opens Claude Web → **New Project** → names it `Monthly Review [Analyst or Booster] — [Team Name]`.

**T+28–31 (Phase 2b · Upload sources)**

Upload to Project files (drag into the Project instructions panel or file upload):
- Stage 1 Report doc (downloaded in 1e) — mandatory
- `03-incident-brief.md` — optional but recommended
- `02-process-manual.md` — optional

**T+31–36 (Phase 2c · Persona setup)**

Driver pastes the persona system prompt from the printed system-prompt card:
- Day 1: `cards/system-prompt-analyst.md`
- Day 2: `cards/system-prompt-booster.md`

Paste into **Project custom instructions** (not a chat message). Replace the `[…]` placeholders with the team's unit name.

Then upload the provided Skill markdown to Project files:
- Day 1: `skills/root-cause-investigator.md`
- Day 2: `skills/ops-comms-drafter.md`

Strategists read the Skill file while the driver uploads.

**T+36–38 (Phase 2d · Drive Connector — optional)**

If Drive Connector is enabled on this laptop (from preflight check 6): in the Project, add the Drive folder via Connector. This gives Claude live access to all 7 starter files.

If blocked (preflight marked 🔴): skip 2d — the manually uploaded files are sufficient.

**T+38–43 (Phase 2e · Seed validation)**

Driver runs 2 seed validations in a new chat within the Project:

- Day 1: *"Investigate why May 2026 output deviated from target. Use the root-cause-investigator structure."*
- Day 2: *"Draft a shift handover note for May's last week using Template A from ops-comms-drafter."*

Team checks: does Claude cite sources? Does the Skill's structure appear in the output? Is the persona voice right?

**T+43–50 (Phase 2f · Iterate prompt)**

Based on seed validation, team revises one element of the system prompt (e.g., tighten the role statement, add a refusal rule, adjust the output format). Driver re-runs one question to confirm improvement.

**T+50** — *"Stage 2 closes. Drivers, leave your Project open — you're going to build the Artifact inside this same Project. Stage 3 starts now."*

**Escape-hatch (Stage 2):** If a team is behind on prompt iteration, hand them the `cards/system-prompt-analyst.md` or `system-prompt-booster.md` "known-good" version and tell them to use it verbatim — skip iteration. This recovers ~5 min.

---

## T+50 to T+80 — Stage 3 · VISUALIZE

*Goal: inline diagram → HTML design system from Claude Design → full Artifact dashboard.*

### T+50 to T+55 — Phase 3a · Inline diagram (5 min)

Driver stays in the Claude Project chat. Pastes the persona-specific diagram prompt:

- Day 1: *"Render an interactive diagram of the 3 most likely root causes for the May 2026 deviation with evidence chains. Use Mermaid or SVG."*
- Day 2: *"Render a workflow board of all pending tasks grouped by status (Todo / In Progress / Done). Use Mermaid or an inline SVG."*

Team confirms shape with driver: is the structure right? Does it match their analysis? If not, iterate once with a correction.

**T+54** — *"One minute — confirm the diagram shape. We move to Claude Design next."*

### T+55 to T+65 — Phase 3b · Claude Design HTML design system (10 min)

One strategist takes a screenshot of Slide Template file #6 from the Drive folder (or the printed slide template if available).

Driver opens a new browser tab → **Claude Design** (claude.ai/design or the Design tab).

Drop the screenshot into Claude Design. Paste the prompt from `cards/design-system-prompt.md`:

> *"Generate a full HTML design system based on this brand: extract the color palette, typography scale, spacing scale, and a component library (cards, tables, charts, badges, buttons, headers, status pills) plus motion guidelines. Output as a single self-contained HTML page that renders an interactive style-guide reference, with each component shown live next to the code snippet I can copy. Use only the colors and fonts visible in the screenshot — no extras."*

Expected wait: ~3 min. While waiting, driver does not leave the Design tab — watch for completion. Strategists review the diagram from 3a and prepare the Artifact build prompt (next phase).

When Claude Design completes: driver clicks **Download** → save as a single `.html` file.

**Escape-hatch (Stage 3b):** If Claude Design is blocked or too slow, use the pre-generated fallback design system file (committee has this ready; give the team the file directly). Do not spend more than 10 min on this phase.

### T+65 to T+80 — Phase 3c · Build Artifact (15 min)

Driver switches back to the Claude Project chat (the same Project from Stage 2).

Use the printed Artifact build card:
- Day 1: `cards/artifact-prompt-day1.md`
- Day 2: `cards/artifact-prompt-day2.md`

Copy the design system tokens (color variables and component patterns) from the downloaded HTML file and paste them into the Artifact prompt where indicated. Paste the full prompt into the Project chat.

First render: review structure with the team. Iterate 2–3 times on layout only — content comes from the Skill's analysis, not from layout iteration requests. Use the prompt from `cards/diagram-to-artifact.md` to incorporate the Stage 3a diagram.

**T+78** — *"Two minutes. Last layout iteration — do not start a new one after this."*

**T+80** — *"Stage 3 closes. Drivers: copy the Artifact shareable link now. Strategists: download the HTML design system file if not already saved. Moving to Stage 4."*

**Escape-hatch (Stage 3c):** If the team fell behind in 3b or the design system step ran long, skip the design system paste — use the Artifact prompt as a single paste without the custom tokens. Output will look generic but is structurally complete.

---

## T+80 to T+85 — Stage 4 · AUTHOR (skill-creator)

*Goal: package the Artifact-build method as a personally authored Dashboard Maker Skill.*

**T+80–81 (Phase 4a — check parallel pre-work)**

During Stage 3c, two strategists should have sketched: *"If we could ship a Skill that lets us rebuild this dashboard next month with new data, what should it tell Claude to do?"* — 3–5 sentences.

If the sketch wasn't done, give the team 1 min to write 3 bullet answers to: (1) What does the Skill produce? (2) What structure must it follow? (3) What does it refuse to do?

**T+81–82 (Phase 4b · Invoke skill-creator)**

Driver, in the Claude Project chat: *"Use the skill-creator skill to help us package what we built. Our new Skill should be called `monthly-review-[analyst or booster]-dashboard`."*

**T+82–85 (Phase 4c · Answer interview)**

skill-creator asks 3–5 questions. Team uses the printed `cards/skill-creator-coaching.md` card — the pre-written answers are there for each persona. Driver reads answers from the card; strategist who did the sketch adds any team-specific adjustments.

When skill-creator outputs the drafted SKILL.md: driver copies it to a file. Name it `monthly-review-analyst-dashboard.md` (Day 1) or `monthly-review-booster-dashboard.md` (Day 2).

**T+85** — *"Stage 4 closes. Drivers: save the SKILL.md. You have 5 min to submit."*

---

## T+85 to T+90 — Wrap + submit

**T+85–88** — Each team opens the submission form (link in the Drive folder or on the screen). Fill in:
1. Team name
2. Persona (Day 1 or Day 2)
3. Artifact shareable link (from Stage 3c)
4. NotebookLM workbook share link (from Stage 1)
5. HTML design system file upload (from Stage 3b)
6. 2-sentence reflection: which handoff felt most useful and why
7. Upload authored SKILL.md (from Stage 4)
8. Skill name (matches the `name:` field in the SKILL.md)

**T+88–89** — Brief: *"You just built eight take-home artifacts in 90 minutes — a Report, a Slide Deck, a Video, an interactive Artifact, an HTML design system, a provided Skill you can use immediately, a Skill you authored yourself, and a fully configured Claude Project. Next month's review takes 10 minutes with this setup."*

**T+89–90** — Optional 1-min Gem mention: *"Another portable form is a Gemini Gem — same persona, different shape, lives in your Google account. Ask any facilitator after the session if you want to see it."*

---

## Persona swap (Day 1 vs Day 2)

The scenario, starter pack, timing, and stage structure are **identical** both days. Only these items swap:

| Item | Day 1 — Section Head Analyst | Day 2 — Team Leader Booster |
|---|---|---|
| Provided Skill (uploaded in 2c) | `skills/root-cause-investigator.md` | `skills/ops-comms-drafter.md` |
| Seed-question card (used in 1c) | `cards/seed-questions-day1.md` | `cards/seed-questions-day2.md` |
| System-prompt card (pasted in 2c) | `cards/system-prompt-analyst.md` | `cards/system-prompt-booster.md` |
| Artifact build card (used in 3c) | `cards/artifact-prompt-day1.md` | `cards/artifact-prompt-day2.md` |
| Skill-creator coaching answers | Day 1 block in `cards/skill-creator-coaching.md` | Day 2 block in `cards/skill-creator-coaching.md` |
| Authored Skill name | `monthly-review-analyst-dashboard` | `monthly-review-booster-dashboard` |
| Example skeleton (facilitator ref) | `skills/examples/monthly-review-analyst-dashboard.md` | `skills/examples/monthly-review-booster-dashboard.md` |
| Stage 3a diagram prompt | Root-cause tree (3 hypotheses + evidence) | Workflow board (tasks by status) |
| Artifact focus | Insight + KPI scorecard + cause-effect tree | Execution + kanban + comms drafts |

Everything else — Drive folder URL, NotebookLM fallback URL, Claude Design tab, submission form, timing — is unchanged.

---

## Troubleshoot triage

| Symptom | When it fires | What to do |
|---|---|---|
| NotebookLM can't be opened or files can't upload | Stage 1 start | Give group the pre-built fallback workbook URL (from preflight). They query it directly — same Q&A, same Note-saving. Mark upload as skipped. |
| Claude Web account fails for a group | Stage 2 start or any point | Swap to a spare login (facilitator's printed slip). Takes ~2 min. Group re-opens Project setup from 2a. |
| Drive Connector blocked in Claude | Stage 2d | Skip 2d entirely. The manually uploaded Report doc + Process Manual + Incident Brief in 2b are sufficient. Note on preflight log. |
| Claude Design HTML output too slow (> 8 min) | Stage 3b | Hand group the pre-generated fallback design system `.html` file (committee-prepared). Skip 3b; proceed directly to 3c using fallback file tokens. |
| NotebookLM Studio Slide Deck or Video fails to generate | Stage 1b or 1e | Mark Slide Deck and Video as bonus deliverables — only the Report is mandatory for Stage 2 handoff. Proceed. Both still count in judging if they generate later. |
| Team falls behind on Stage 2 prompt iteration (still in 2f at T+48) | Stage 2 end | Hand them the "known-good" system prompt verbatim from `cards/system-prompt-analyst.md` or `system-prompt-booster.md`. Tell them to paste and move on — skip iteration. |
| Stage 3c runs over (driver still building Artifact at T+78) | Stage 3c end | Skip design-system paste if not done. Use the Artifact prompt as a single-paste without custom tokens. Proceed to Stage 4 at T+80 regardless. |

---

## Time-keeping cues

| Time | Call |
|---|---|
| T+0 | *"Drivers, claim a laptop. Strategists, take the printed handouts."* |
| T+5 | *"Stage 1 starts — open NotebookLM."* |
| T+23 | *"Two minutes — finish downloading your Report doc."* |
| T+25 | *"Stage 2 starts — open Claude Web."* |
| T+48 | *"Two minutes — last chance to iterate the prompt. Wrap up Stage 2."* |
| T+50 | *"Stage 3 starts — stay in your Project, run the diagram prompt."* |
| T+54 | *"One minute — confirm the diagram. Moving to Claude Design."* |
| T+63 | *"Two minutes — Claude Design should be finishing. Prepare Artifact prompt."* |
| T+65 | *"Phase 3c starts — build the Artifact in your Project."* |
| T+78 | *"Two minutes — last Artifact iteration. No new requests after this."* |
| T+80 | *"Stage 4 starts — invoke skill-creator in your Project."* |
| T+84 | *"One minute — save your SKILL.md file."* |
| T+85 | *"Submit time — open the submission form."* |
| T+88 | *"Two minutes — finish your reflection sentence."* |
| T+90 | *"Time. Drivers, submit now even if incomplete."* |

30-second sweep at each stage transition: *"Drivers, save your work. Strategists, prep the next stage's card."*
