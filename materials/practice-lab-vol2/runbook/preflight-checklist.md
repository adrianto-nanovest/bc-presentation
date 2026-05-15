# Practice Lab Pre-flight Checklist

> Run at T−30 min. Mark each laptop green before T+0. Do not start the session until all 8 sign-off rows in the table below are filled.

---

## Per-laptop checks (run on all 8 group laptops)

Run each check in sequence on every laptop. Use 🟢 / 🟡 / 🔴 in the sign-off table.

---

### Check 1 — Browser + Claude Web login

- Open browser (Chrome preferred).
- Log into the committee-provided Claude Web account at `claude.ai`.
- Confirm: a new Project can be created (click **New Project** — it opens without error).
- Status: 🟢 (works) · 🔴 (fails → swap to spare login, see Spare logins below).

---

### Check 2 — NotebookLM access

- Open `notebooklm.google.com` using the same Google account.
- Confirm: a new notebook can be created (click **New notebook** — it opens).
- Status: 🟢 (works) · 🔴 (blocked → direct group to pre-built fallback workbook in Check 4).

---

### Check 3 — Drive folder share

- Open the Drive folder share URL: `<stub — fill at deployment>`.
- Confirm: the folder opens, files are visible, and a file can be copied to the group's Drive.
- Status: 🟢 (view + copy works) · 🟡 (view only — group can still upload manually) · 🔴 (blocked → switch to USB zip backup).

---

### Check 4 — NotebookLM fallback workbook

- Open the pre-built NotebookLM fallback URL: `<stub — fill at deployment>`.
- Confirm: the workbook opens and at least one source is visible in the panel.
- Status: 🟢 (read access confirmed) · 🔴 (blocked — note; group must use full upload path in Check 2).

---

### Check 5 — Claude Design tab

- Open Claude Design at `claude.ai/design` (or the Design tab within claude.ai) in a new browser tab.
- Confirm: the page loads without an auth wall or "upgrade required" prompt.
- Status: 🟢 (loads) · 🔴 (blocked → committee-prepared fallback design system file will be handed to group directly at T+55).

---

### Check 6 — Drive Connector in Claude

- Open the test Claude Project (or create a throwaway one).
- Attempt to add the Drive folder via **Connectors** (Project settings → Connections → Google Drive).
- Record result: 🟢 (connector added and Drive folder visible — Stage 2d is go) · 🟡 (connector UI appears but link fails — attempt 2d, skip if it stalls) · 🔴 (Connector option not available — skip 2d entirely, note in sign-off table).

---

### Check 7 — Printed handouts delivered to driver

Verify all physical handouts are at the laptop station before the session starts. Check each:

- [ ] Process Manual (paper printout of `02-process-manual.md`)
- [ ] Seed-question card — **Day 1** (`cards/seed-questions-day1.md`) **OR Day 2** (`cards/seed-questions-day2.md`) — circle which day
- [ ] System-prompt card — **Analyst** (`cards/system-prompt-analyst.md`) **OR Booster** (`cards/system-prompt-booster.md`)
- [ ] Naive-vs-proper handout (`cards/naive-vs-proper.md`)
- [ ] Diagram-to-Artifact upgrade prompt (`cards/diagram-to-artifact.md`)
- [ ] Claude Design HTML system prompt (`cards/design-system-prompt.md`)
- [ ] Artifact build prompt — **Day 1** (`cards/artifact-prompt-day1.md`) **OR Day 2** (`cards/artifact-prompt-day2.md`)
- [ ] Skill-creator coaching card (`cards/skill-creator-coaching.md`)

All 8 handout items present: 🟢 · Any missing: 🔴 (retrieve before T+0).

---

### Check 8 — Driver signs preflight log

Driver reviews the sign-off table, confirms their laptop's status in each check, and prints their name in the sign-off log below.

---

## Spare logins (risk mitigation — spec §11 row 2)

Facilitator carries **2 spare Claude Web logins** on a printed slip (committee-provisioned accounts). If a group's account fails at any point:

1. Direct driver to log out of the current account.
2. Hand the driver one spare login credential from the printed slip.
3. Driver logs in → proceeds from where the failure occurred (re-open the Project from 2a if needed).
4. Note which group used which spare login in the sign-off table.

Spare login #1: `<stub — fill at deployment>`
Spare login #2: `<stub — fill at deployment>`

---

## Preflight sign-off log

Fill one row per group laptop at T−30 min. Use 🟢 / 🟡 / 🔴 per check. Facilitator countersigns the row when satisfied.

| Group # | Driver name | Check 1 | Check 2 | Check 3 | Check 4 | Check 5 | Check 6 | Check 7 | Check 8 | Time signed off | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | | |
| 2 | | | | | | | | | | | |
| 3 | | | | | | | | | | | |
| 4 | | | | | | | | | | | |
| 5 | | | | | | | | | | | |
| 6 | | | | | | | | | | | |
| 7 | | | | | | | | | | | |
| 8 | | | | | | | | | | | |

**Session is a go when:** all 8 rows signed off, no 🔴 in Check 1 or Check 2 without a confirmed backup in place, and facilitator has the spare-login slip in hand.
