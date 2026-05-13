# F.8 — YOUR AGENTIC OS · COMMAND CENTER (Monitor Mockup Rework)

**Status:** approved 2026-05-14 — ready for implementation plan
**Slide:** `src/slides/foundation-techniques-section-f/f8-your-agentic-os.tsx`
**Replaces:** the current 9-layer stack + 4-output-card diagrammatic layout
**Reference visuals:** `docs/examples/slide-F8-references/{agentic-os-1,agentic-os-2,agentic-os-architecture,current-F8-slide}.png`

---

## 1 · Purpose & Rhetorical Shift

The current F.8 is **conceptual** — a typographic 9-layer stack with abstract output cards and SVG connection lines. Audience leaves with a tidy diagram.

The new F.8 is **product-fictional** — a high-fidelity monitor mockup of a working-looking Agentic OS dashboard. Audience leaves with a vivid mental image of "what does my command center actually look like?"

This shift matters because F.8 is the coronation of Section F and the bridge into Section J (adoption — INDIVIDUAL track). Adoption follows imagination; product fiction accelerates imagination.

What survives from the current F.8:
- The closing tagline **"this is yours — wherever you go, you carry it."** (appears EXACTLY ONCE in the entire deck — load-bearing constraint).
- Step-reveal as the canonical drive (count drops from 14 → 6).
- Hover-popover micro-interaction pattern (now applied to tiles/agents/connectors).
- Keyword highlighting via `highlight()` on key strings.

What retires:
- `FacetStrip` component on this slide.
- Centered italic display headline.
- `AgenticOSStack` component (concept absorbed into the dashboard's component identity, not a literal stack).
- 4-card `OutputCard` right pane (concept absorbed into Dashboard tiles).
- SVG connection lines from stack → cards.

---

## 2 · Stage Layout (1280×720)

```
┌───────────────────────────────────────────────────────────────────┐
│ — FIG. F.8 · YOUR AGENTIC OS                  (FigLabel, top-left)│
│                                                                   │
│  Your Agentic OS                          (slide-headline small,  │
│                                            left-aligned)          │
│                                                                   │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │ ╔══════════════════ MONITOR BEZEL ═══════════════════╗   │    │
│   │ ║ AGENTICOS  ◐ claude-opus-4-7 ▾   ⏱ 09:14  ⚙ │      ║   │    │
│   │ ╠═══╦══════════════════════════════════════════╦══════╣   │    │
│   │ ║   ║                                          ║      ║   │    │
│   │ ║ N ║              MAIN CANVAS                 ║ CHAT ║   │    │
│   │ ║ A ║       (panel for active tab)             ║ RAIL ║   │    │
│   │ ║ V ║                                          ║      ║   │    │
│   │ ║   ║                                          ║      ║   │    │
│   │ ╚═══╩══════════════════════════════════════════╩══════╝   │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│        this is yours — wherever you go, you carry it.             │
└───────────────────────────────────────────────────────────────────┘
```

### 2.1 · Header

- `<FigLabel section="F" num={8} label="YOUR AGENTIC OS" />`
- `<div className="slide-headline-row"><h1 className="slide-headline small">{highlight("Your Agentic OS", ["Agentic OS"])}</h1></div>`
- Headline: 40px, left-aligned, neutral-50 base with copper highlight on "Agentic OS".
- **No FacetStrip, no copper rule, no centered display headline.**

### 2.2 · Monitor frame

- Container: `position: absolute; top: 156; left: 48; right: 48; bottom: 80;` (`.slide-content` band).
- Inside that, the bezel is centered with a small margin so the outer container reads as "desk surface."
- Bezel: ~1180×484, rounded corners (`borderRadius: 14`), border `1px solid var(--copper-700)` with an inner highlight `inset 0 0 0 1px rgba(184,110,61,0.18)` to read as a 3D frame, dark inner fill (`var(--neutral-950)` or `#0a0a0a`).
- Subtle drop shadow: `0 16px 48px rgba(0,0,0,0.55)`.
- A 1-pixel-wide copper-700 inset bottom shadow simulates the monitor's screen edge.

### 2.3 · Closing tagline

- `position: absolute; left: 48; right: 48; bottom: 28;` centered.
- Italic serif, 28px (smaller than current 36px — left-aligned heading is now carrying display weight up top, so the tagline shrinks to fit between bezel-bottom and stage-bottom).
- Reveals on step 5 with copper glow on bezel pulsing once.

---

## 3 · Monitor Internals

### 3.1 · Top status bar (~36px tall)

Inside the bezel, full width, dark fill with a 1px copper-800 bottom border.

- **Left:** "AGENTICOS" wordmark (mono, copper-200, fontSize 14, letterSpacing 0.22em, fontWeight 600).
- **Center-left, after a 24px gap:** model picker pill — rounded chip showing "claude-opus-4-7 ▾" in mono 12px. On hover, dropdown opens listing 3 options (claude-opus-4-7, claude-sonnet-4-6, claude-haiku-4-5).
- **Right:** clock "09:14" (mono 12px, neutral-400) + a `Settings` Lucide icon (14px, copper-300, hover-darken).

### 3.2 · Left nav rail (~56px wide)

Icon-only navigation, dark fill with 1px copper-800 right border. 8 items, each ~56×52, stacked vertically. Active item has a copper-200 left border (3px wide) and copper-100 icon; inactive items have copper-400 icon.

| Index | Tab ID       | Icon (Lucide)  | Tooltip label    |
|-------|--------------|----------------|------------------|
| 0     | `dashboard`  | `LayoutGrid`   | "Dashboard"      |
| 1     | `skills`     | `Wand2`        | "Skills"         |
| 2     | `agents`     | `Bot`          | "Agents"         |
| 3     | `vault`      | `FolderLock`   | "Vault"          |
| 4     | `memory`     | `Brain`        | "Memory"         |
| 5     | `connectors` | `Plug`         | "Connectors"     |
| 6     | `people`     | `Users`        | "People"         |
| 7     | `settings`   | `Settings`     | "Settings"       |

Tooltip: appears on hover, anchored to the right edge of the rail, dark popover with copper-700 border.

Click any nav item → swaps `activeTab` state, overriding the step-driven default. Step-reveal does NOT walk through these tabs; clicking does.

### 3.3 · Main canvas

Bounded by the top bar, nav rail (left), chat rail (right), and bezel-bottom. Inner padding 16px. Content swaps based on `activeTab`. See §4 for each panel spec.

### 3.4 · Right chat rail (~210px wide)

Dark fill, 1px copper-800 left border, vertical 12px padding. Always visible regardless of active tab — this is the "command" in Command Center.

Content top → bottom:
1. **Heading:** "RUN A SKILL TO BEGIN" (mono 11px, copper-200, letterSpacing 0.18em).
2. **Prompt box:** rounded 6px, dark fill, 1px copper-800 border, ~64px tall. Placeholder: *"Type any prompt, or pick a skill below to load a template…"* (italic serif, 11px, neutral-500). On focus: border copper-400.
3. **Two buttons** below prompt: `RUN →` (filled copper-700 bg, neutral-50 text) and `CLEAR` (outlined copper-700 border). Each ~32px tall.
4. **Section label:** "QUICK SKILLS" (mono 10px, copper-300).
5. **6 quick-pick chips** in a 2-col grid (~32px tall each): "Morning Brief", "Inbox Triage", "Deep Research", "YT Titles", "Outline", "Carousel" — universal knowledge-work labels per the *no mining-specific in F section* memory.
6. **Section label:** "RECENT RUNS" (mono 10px, copper-300).
7. **Scrollable list** of ~12 recent runs, each row: time (mono 10px) + label + status pill. Visible: ~6, the rest scroll. Each row ~28px tall. `overflow-y: auto` with thin copper-styled scrollbar.

---

## 4 · Panel Specifications

Each panel is its own component file under `components/panels/`. Each panel receives `isHighlightActive?: {tileId: string} | null` from the monitor (driven by step-reveal beats) so individual tiles/cards can light up on cue. Panels handle their own scroll.

### 4.1 · DashboardPanel (default `activeTab` at step 1+)

4-tile grid, 2 columns × 2 rows. Each tile ~360×210 with 16px gap. Each tile has:
- Header strip (~28px): mono 11px title + Lucide icon top-right.
- Body content (see below).
- Hover: copper-700 → copper-200 border transition.

| Tile           | Header              | Body content                                                                 |
|----------------|---------------------|------------------------------------------------------------------------------|
| `digest`       | "DAILY DIGEST"      | List of 5 bullets, mono 11px, with timestamps "06:00 · …". E.g. "06:00 · 5 emails awaiting reply" |
| `brief`        | "MORNING BRIEF"     | "3 meetings today" + 2 priority lines (italic serif 12px)                    |
| `calendar`     | "CALENDAR"          | Today's 4 timeslots: "09:30 budget review", "11:00 1:1", "13:00 review draft", "15:00 conflict ⚠" |
| `activity`     | "ACTIVITY · 14 DAYS"| Dummy SVG area chart (copper-300 fill at 0.35 opacity, copper-200 line). Static data points; see §5.1 |

Step-reveal effects:
- Step 2: `digest` + `brief` tiles get copper-200 border + soft glow (`box-shadow: 0 0 0 1px var(--copper-200), 0 0 24px rgba(184,110,61,0.25)`) for ~1500ms then settle.
- Step 3: same effect on `calendar` + `activity` tiles.

### 4.2 · SkillsPanel

Vertically scrollable grid of skill chips, 4 columns × ~6 rows = ~24 chips visible-or-scroll.

- Chip: ~190×56, dark fill, 1px copper-800 border, padding 10px 14px. Layout: 2-line content — top line mono 11px label, bottom line italic serif 10px micro-description (neutral-400).
- Hover: border copper-200; tooltip popover anchored top-right showing 1 sentence on what the skill does.

Sample labels (universal, not mining-specific):
- "Vault Cleanup" · *"sweep stale docs"*
- "Morning Brief" · *"compile today's brief"*
- "Inbox Triage" · *"rank + draft replies"*
- "Deep Research" · *"long-form synthesis"*
- "YT Titles" · *"viral title variants"*
- "Outline" · *"doc structure draft"*
- "KB Query" · *"answer from your docs"*
- "Carousel" · *"slide carousel from doc"*
- "Short-form" · *"60-second cut-down"*
- "Lightrag Upload" · *"index new docs"*
- "Reply Drafter" · *"context-aware replies"*
- "Meeting Notes" · *"transcribe + extract"*
- "Calendar Optimizer" · *"defrag your week"*
- "PRD Drafter" · *"product spec scaffold"*

`overflow-y: auto` on the panel container. Scrollbar styled thin copper.

### 4.3 · AgentsPanel

3-column × 2-row grid of agent cards (6 total). Card ~250×130:
- Header: avatar dot (32×32, copper-700 fill, single-letter mono initial) + name (mono 12px) + "READY" pill (copper-200 bg, neutral-950 text, 9px).
- Body: 2 lines italic serif 11px: role + recent activity (e.g. *"finance specialist — last run: 3h ago, drafted Q2 budget summary"*).

Agents:
1. **Finn** — Finance Analyst
2. **Sched** — Scheduler
3. **Draft** — Drafter
4. **Rex** — Researcher
5. **QA** — QA Reviewer
6. **Reply** — Customer Reply Specialist

Hover: copper-200 border + tooltip with 1-sentence "use me when…" string.

### 4.4 · VaultPanel

Two-column layout: left = folder list (~30% width, scrollable), right = preview pane (~70%, fixed).

Left list (~8 folders, only 6 visible):
- "Notes" · 142 items
- "Reports" · 38 items
- "Drafts" · 22 items
- "Archive" · 511 items
- "Inbox Snapshots" · 67 items
- "Meeting Transcripts" · 94 items
- "Research Library" · 213 items
- "Workshops" · 18 items

Each row ~36px tall, hover: copper-700 highlight bg. Click: marks selected and updates preview pane.

Right preview pane (default selected: "Drafts"):
- Top: doc title (italic serif 14px) + last-edited timestamp (mono 10px neutral-400).
- Body: 4-paragraph dummy text excerpt (italic serif 11px, neutral-300), max ~12 lines. Reads as a draft document.

Left list has `overflow-y: auto`. Preview pane content is short enough to not scroll.

### 4.5 · MemoryPanel

Single column, 3 stacked sections, vertically scrollable.

| Section            | Heading (mono 11px copper-200) | Body (italic serif 12px neutral-200) |
|--------------------|--------------------------------|---------------------------------------|
| Identity           | "WHO YOU ARE"                  | Name, role, team, escalation chain (~4 lines) |
| Preferences        | "HOW YOU WORK"                 | Tone, style preferences, common abbreviations, recurring patterns (~5 lines) |
| Recurring context  | "WHAT YOU'RE WORKING ON"       | Active projects, key contacts by project, recent decisions (~6 lines) |

Each section ~180–240px tall → total ~600px content in ~470px viewport → vertical scroll. `overflow-y: auto`.

Content uses generic knowledge-worker placeholders (no real personal info; matches the *generic body examples* memory).

### 4.6 · ConnectorsPanel

4-column × 2-row grid of connector tiles (8 total). Each tile ~210×120:
- Top-right: status pill — "✓ CONNECTED" (copper-200 bg) or "+ ADD" (copper-700 outlined).
- Center: brand glyph (use Lucide proxies or simple text logos — no third-party brand SVGs needed; we control the aesthetic).
- Bottom: name (mono 11px) + sub-label (italic serif 10px, e.g. *"last sync: 2m ago"*).

Tiles (all "connected" by default except one):
- Gmail · ✓
- Google Calendar · ✓
- Google Drive · ✓
- Slack · ✓
- Notion · ✓
- GitHub · ✓
- Stripe · ✓
- Linear · + ADD

Hover: copper-200 border + tooltip showing what actions are permitted.

### 4.7 · PeoplePanel

Single column, 5 expanded person cards stacked, vertically scrollable.

Each card ~720×120:
- Left: avatar (48×48 circular, neutral-700 fill, mono initials).
- Middle: name (mono 13px) + role (italic serif 11px neutral-400) + persona one-liner (italic serif 11px neutral-300, e.g. *"prefers Loom over docs; oncall Tue/Thu"*).
- Right: "LAST INTERACTION" label + 2-line summary (italic serif 10px).

5 cards = ~600px content in ~470px viewport → scroll. `overflow-y: auto`.

People are generic knowledge-work personas (no mining-specific names per memory).

### 4.8 · SettingsPanel

Minimal placeholder — single centered icon + label "System settings · coming soon." Not load-bearing; included so the nav rail isn't dead.

---

## 5 · Step Axis

6 steps; `canonicalPose = 5`. The slide-def at the bottom of `f8-your-agentic-os.tsx` updates to `{ steps: 6, canonicalPose: 5, animationMode: "step-reveal", surface: "dark", section: "F" }`.

| Step | Reveal                                                                  |
|------|-------------------------------------------------------------------------|
| 0    | FigLabel + headline; empty monitor bezel draws in (~600ms ease)         |
| 1    | Top bar + nav rail + chat rail + Dashboard panel all materialize (~800ms staggered) |
| 2    | `digest` + `brief` tiles pulse-highlight                                |
| 3    | `calendar` + `activity` tiles pulse-highlight                           |
| 4    | Chat rail highlights; model picker pill pulses once                     |
| 5    | Closing tagline reveals; bezel gets a slow copper glow; nav rail icons shimmer once (left-to-right wave) inviting click exploration (canonical pose) |

All non-dashboard tabs (SKILLS / AGENTS / VAULT / MEMORY / CONNECTORS / PEOPLE / SETTINGS) are explored by **clicking the nav rail during the talk** — not by step-reveal.

---

## 6 · Interactivity

### 6.1 · Click

- Nav rail icons → swap `activeTab`. Overrides step-driven default.
- Skill chips, agent cards, connector tiles → micro-highlight + tooltip popover.
- Folder list rows (Vault) → marks selected, updates preview.
- Model picker pill → opens dropdown with 3 options.
- Chat `RUN →` / `CLEAR` buttons → visual press feedback only; no real action wired.

### 6.2 · Hover

- Nav rail items → tooltip with full tab name (anchored right).
- All tiles/cards/chips → copper border highlight + tooltip popover (~250ms fade).

### 6.3 · Scroll

Per §4 panel specs. Inside the monitor, `onWheel` is captured and stopped from propagating to the deck navigation handler. Scroll only operates within the panel-local containers that opt in with `overflow-y: auto`.

The deck's keyboard step navigation (←/→) is not affected by mouse position inside the monitor.

### 6.4 · Hover-popover pattern reuse

The CSS-only hover popover pattern from `AgenticOSStack` and `OutputCard` is reused. Each interactive element has a sibling popover element with `opacity: 0 → 1` transition on parent hover.

---

## 7 · Visual System

### 7.1 · Colors

All colors come from existing CSS variables. No new tokens.
- Bezel fill: `var(--neutral-950)`
- Panel fill: `var(--neutral-900)`
- Borders default: `var(--copper-800)`
- Borders active: `var(--copper-200)`
- Headings: `var(--copper-100)` / `var(--copper-200)` / `var(--copper-300)` (descending hierarchy)
- Body italic: `var(--neutral-200)` / `var(--neutral-300)`
- Glow: `rgba(184,110,61,0.25)` (copper-700 at 25%)
- Status "READY" pill: copper-200 bg + neutral-950 text
- Activity chart area fill: `rgba(184,110,61,0.35)`; line: `var(--copper-200)`

### 7.2 · Typography

- Mono labels: `var(--mono)`, letterSpacing 0.18em, fontWeight 500
- Display headline: `slide-headline small` (font-family `var(--display)`, 40px, italic on highlighted span)
- Body italic: `var(--serif)`, fontStyle italic
- Highlight: `<em class="kw">` via `highlight()` helper — keywords in copper-300 italic

### 7.3 · Activity sparkline (§5.1)

Dummy 14-point area chart. Hardcoded data array in `content.tsx`:
```ts
activity: [22, 28, 24, 31, 35, 30, 42, 38, 47, 52, 48, 56, 61, 68]
```
Rendered as SVG inside `ActivitySparkline.tsx`: linear gradient fill under the polyline, single copper-200 stroke on top. No interactivity beyond hover-tooltip showing "319 total · 68 last day" in the tile's top-right corner.

### 7.4 · Motion

- Bezel entry (step 0): scale 0.96 → 1, opacity 0 → 1, 600ms `var(--ease)`.
- Panel entry (step 1): all panel children stagger-fade 80ms apart, 250ms each.
- Tile highlight pulse (steps 2–4): outline + glow ramp-in 200ms, hold 1100ms, ramp-out 200ms.
- Tab swap (click): old panel opacity 1 → 0 (120ms), new panel opacity 0 → 1 (180ms) with 4px translateY.
- Nav-rail shimmer (step 5): copper-200 highlight sweeps left-to-right across the 8 icons, 80ms per icon.

All motion respects `prefers-reduced-motion`: pulses become instant border-color swaps; bezel entry becomes opacity-only.

---

## 8 · Component Decomposition

```
src/slides/foundation-techniques-section-f/
  f8-your-agentic-os.tsx                  ← rewritten; slim, orchestrates child components
  content.tsx                              ← f8Content rewritten (see §9)
  components/
    AgenticOSMonitor.tsx                  ← bezel + activeTab state + step→tile-highlight mapping
    AgenticOSTopBar.tsx                   ← logo, model picker, clock
    AgenticOSNavRail.tsx                  ← icon nav with hover tooltips and click handlers
    AgenticOSChatRail.tsx                 ← prompt, quick-pick chips, scrollable recent runs
    panels/
      DashboardPanel.tsx                  ← 4-tile grid
      SkillsPanel.tsx                     ← scrollable skill-chip grid
      AgentsPanel.tsx                     ← 6 agent cards
      VaultPanel.tsx                      ← folder list + preview pane
      MemoryPanel.tsx                     ← 3 stacked sections, scrollable
      ConnectorsPanel.tsx                 ← 8 connector tiles
      PeoplePanel.tsx                     ← 5 person cards, scrollable
      SettingsPanel.tsx                   ← placeholder
    tiles/
      DigestTile.tsx
      BriefTile.tsx
      CalendarTile.tsx
      ActivitySparkline.tsx
```

**Files to delete (concept absorbed elsewhere; verify no other slide imports them):**
- `components/AgenticOSStack.tsx` — only used by F.8
- `components/OutputCard.tsx` — only used by F.8

(Verify with a `grep -rn "AgenticOSStack\|OutputCard" src/slides` before deletion in the plan.)

### 8.1 · Interface boundary: `AgenticOSMonitor`

```ts
interface AgenticOSMonitorProps {
  stepIndex: number;
  initialTab?: TabId;  // defaults to "dashboard"
}
```

Internally:
- `useState<TabId>("dashboard")` for activeTab
- Derived `highlightedRegions: string[]` from `stepIndex`:
  - step 2 → `["digest", "brief"]` (Dashboard tile ids)
  - step 3 → `["calendar", "activity"]` (Dashboard tile ids)
  - step 4 → `["chat-rail"]` (the right rail as a whole; ChatRail reads this directly)
  - else → `[]`
- Highlight ids are passed to DashboardPanel as `highlighted: string[]`; ChatRail reads `highlighted` separately. Other panels currently don't react to step-driven highlights (they have no scripted beats).
- Renders TopBar + NavRail + active panel + ChatRail in a CSS grid layout.

### 8.2 · Tab-content contract

Each panel accepts:
```ts
interface PanelProps {
  highlighted?: string[];  // ids of sub-elements to light up; default empty
}
```

Currently only `DashboardPanel` consumes `highlighted` (matches tile ids `"digest"`, `"brief"`, `"calendar"`, `"activity"`). Other panels ignore it. Panels are self-contained — own their styles, own their data via `content.tsx`. The monitor doesn't reach inside them.

---

## 9 · Content Schema (replaces `f8Content` in `content.tsx`)

Top-level shape (TypeScript):

```ts
export const f8Content = {
  headline: "Your Agentic OS",
  headlineKw: ["Agentic OS"],
  tagline: "this is yours — wherever you go, you carry it.",
  taglineKw: ["this is yours", "wherever you go, you carry it"],
  topBar: {
    wordmark: "AGENTICOS",
    models: ["claude-opus-4-7", "claude-sonnet-4-6", "claude-haiku-4-5"],
    activeModel: "claude-opus-4-7",
    clock: "09:14",
  },
  navRail: [
    { id: "dashboard", icon: "LayoutGrid", label: "Dashboard" },
    { id: "skills",    icon: "Wand2",      label: "Skills" },
    { id: "agents",    icon: "Bot",        label: "Agents" },
    { id: "vault",     icon: "FolderLock", label: "Vault" },
    { id: "memory",    icon: "Brain",      label: "Memory" },
    { id: "connectors",icon: "Plug",       label: "Connectors" },
    { id: "people",    icon: "Users",      label: "People" },
    { id: "settings",  icon: "Settings",   label: "Settings" },
  ],
  chatRail: {
    heading: "RUN A SKILL TO BEGIN",
    placeholder: "Type any prompt, or pick a skill below to load a template…",
    quickSkills: ["Morning Brief", "Inbox Triage", "Deep Research", "YT Titles", "Outline", "Carousel"],
    recentRuns: [
      { time: "09:12", label: "Morning Brief", status: "OK" },
      { time: "09:05", label: "Inbox Triage", status: "OK" },
      { time: "08:48", label: "YT Titles", status: "OK" },
      { time: "08:31", label: "Vault Cleanup", status: "OK" },
      { time: "07:55", label: "Deep Research", status: "OK" },
      { time: "07:10", label: "Outline", status: "OK" },
      // …12 total for scroll
    ],
  },
  dashboard: {
    digest: { /* 5 bullet items */ },
    brief:  { /* 3 meetings + 2 priorities */ },
    calendar: { /* 4 timeslots */ },
    activity: { points: [22, 28, ...], total: 319, lastDay: 68 },
  },
  skills: [ /* 14 entries: { id, label, micro, popover } */ ],
  agents: [ /* 6 entries: { id, initial, name, role, lastActivity, popover } */ ],
  vault: {
    folders: [ /* 8 entries: { id, name, count } */ ],
    selectedFolder: "drafts",
    preview: { title, lastEdited, body },
  },
  memory: {
    identity: { heading, lines: [...] },
    preferences: { heading, lines: [...] },
    recurring: { heading, lines: [...] },
  },
  connectors: [ /* 8 entries: { id, name, sublabel, connected: boolean, popover } */ ],
  people: [ /* 5 entries: { id, initials, name, role, persona, lastInteraction } */ ],
} as const;
```

All copy is reviewed against the *generic body examples* memory — universal knowledge-work content, no mining-specific terms. Keyword highlighting is applied via the `highlight()` helper at render-time (chip/card/tile components accept `kw?: string[]`).

---

## 10 · Testing

Update `tests/unit/f8-your-agentic-os.test.tsx`:

1. **Smoke** — renders at each canonical pose (step 0 and step 5) without crashing.
2. **Header** — FigLabel renders with "F · 8 · YOUR AGENTIC OS"; headline matches "Your Agentic OS" with the keyword span.
3. **Step 0** — bezel data-testid present; no panel content yet (`queryByTestId("dashboard-panel")` returns null).
4. **Step 1** — Dashboard panel visible by default; all 4 tiles present (`getByTestId("tile-digest")`, etc.); chat rail visible.
5. **Step 2** — `digest` and `brief` tiles have `data-highlighted="true"`; others false.
6. **Step 3** — `calendar` and `activity` tiles highlighted.
7. **Step 4** — chat rail has `data-highlighted="true"`.
8. **Step 5** — tagline visible, exact text match: `"this is yours — wherever you go, you carry it."`
9. **Click nav** — clicking the SKILLS nav button swaps panel: `getByTestId("skills-panel")` becomes visible, `dashboard-panel` is unmounted.
10. **Click each nav item** — table-driven test verifying each of the 8 tabs renders its panel after click.
11. **Click model picker** — opens dropdown with 3 model options.
12. **Click Vault folder** — switching folders updates the preview pane title.
13. **Tagline exclusivity** — no other slide in the deck contains the exact tagline string (grep-based test or static assertion; reuse existing test if one exists).
14. **Accessibility** — nav rail buttons have `aria-label`; tab panels have `role="tabpanel"`; tooltips use `role="tooltip"`.
15. **Reduced motion** — render with media query stub; verify no transitions where motion-reduce-disabled.

---

## 11 · Open Questions & Notes

- **Icon library:** Section F already uses `LucideIcon.tsx`. We reuse it. No new icon dependencies.
- **Bundle size:** new components add ~5–7 KB gzipped. No new third-party libraries.
- **Mining-specific content:** strictly **excluded** from F.8 (per audience-respect and generic-examples memory). All sample data is universal knowledge-work.
- **BCE transition framing:** F.8 carries the "portable adaptability" subtext via the closing tagline only. The product fiction reinforces the message without speaking it: "this is *yours*, you carry it wherever you go" lands harder when the audience has just seen a vivid command center.
- **Hooks-into-Section-J:** the nav-rail shimmer at step 5 plus the *click to explore* affordance pre-figures Section J's "BUILD INCREMENTAL" theme without needing an explicit facet label.

---

## 12 · Risks

1. **UI surface sprawl** — 8 panels × multiple sub-elements is a lot of code. Mitigation: strict component boundaries (§8), each panel ≤ 200 LOC.
2. **Looks too "demo-y"** — risk of audience reading the slide as a real product to evaluate rather than as a metaphor. Mitigation: keep copy abstract enough ("Drafts · 22 items") that no audience member tries to "click to log in." The closing tagline reframes back to the personal/portable message.
3. **Step-reveal feels thin (only 6 steps for the coronation slide)** — mitigation: the slide is now interactive; presenter time is spent on click exploration rather than scripted reveals. Section F notes for the presenter will explicitly call out "spend 2 minutes here clicking through tabs."
4. **Test surface** — 15 test cases is a lot for one slide. Mitigation: table-driven tests where possible (item 10).

---

## 13 · Out of Scope (explicitly)

- Real API wiring (no actual model calls, no real connectors, no real auth)
- Search / filter inside Vault / Memory / People
- Drag-and-drop reordering
- Theming / light mode
- Mobile or smaller-viewport layout
- Animation timeline visualization in Settings panel
- Voice / audio interaction
