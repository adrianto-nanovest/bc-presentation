# Section G — Tools Ecosystem · Catalogue Spec (G.1 – G.6)

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Draft 2026-05-12
**Parent meta-spec:** `docs/specs/2026-05-06-process-and-design-meta.md`
**Sibling specs:** `2026-05-12-slides-application-G7-G11-synthesis.md` · `2026-05-12-slides-application-H-discipline.md`

## 0. Scope

This spec covers **Section G slides 1–6** — the foundational catalogue of the AI tools ecosystem (Claude / Google / OpenAI). It establishes shared conventions used by sibling specs B and C.

In scope:
- G.1 Ecosystem overview · G.2 Claude Platforms · G.3 Claude Capabilities · G.4 Claude Built-in Tools & Commands · G.5 Google · G.6 OpenAI brief
- Shared interaction conventions for the entire Application arc (G + H)
- New shared components introduced here: `VideoOverlay`, `CompareOverlay`, `AnimatedGlyph` system

Out of scope (covered in sibling specs):
- G.7 Head-to-head, G.8 Matrix, G.9 Workflow, G.10 Beyond the Big Three, G.11 Bridge → Spec B
- H.1 Trap, H.2 Discipline, H.3 Bridge → Spec C

## 1. Inputs

| Source | Used for |
|---|---|
| `docs/references/tools-context.md` | Adri's section framing (Claude deep, Google deep, OpenAI brief) |
| `docs/references/tools-capabilities-assets.md` | Video URL list (cross-checked against `assets/videos/`) |
| `docs/researches/topic-ai-tools-ecosystem.md` | Capability descriptions, model specs |
| `docs/researches/internal-claude-tooling.md` | Comparison data, dual-tool insights |
| `docs/researches/2026-05-11-section-g-tooling-gaps.md` | OpenClaw/Hermes/n8n + under-researched surfaces |
| `docs/researches/2026-05-11-claude-builtin-tools-commands.md` | Built-in agents, slash commands, deferred tools, hooks |
| Reference slides | E.3, E.5, E.6, E.8, E.10 (entry-animation + hover patterns); D.3 (per-card glyph pattern); E.11 (bridge pattern — for G.11 only, in Spec B) |

## 2. Conventions (shared across G + H)

### 2.1 Stage + content area
- Stage: 1280×720 (`.stage-wrap`)
- Content insets: `left:48 · right:48 · top:156 · bottom:80` (matches `.slide-content` rule)
- FigLabel: top-left, `top:36 · left:48` (always present, no Reveal wrapper)
- Headline row: `top:80` (always present, no Reveal wrapper)

### 2.2 Entry animation (every content slide)
The "entry animation" is the step 0 reveal — what plays when a slide first mounts.

**Always-present (no Reveal wrapper):**
- `<FigLabel>`
- `<h1 className="slide-headline small">` headline
- Section labels (mono 11px, copper-300/400, uppercase)

**Animated on entry (step 0):**
- Structural CopperRules: `<CopperRule on width="40%" />` (unconditional `on=true`, animates width 0→target)
- Card stagger: `<Reveal on={showXxx} delay={120 + i * 80}>` where `i` is card index
  - Initial delay: **120ms** (canonical first-element delay)
  - Inter-card stagger: **80–90ms** per item
- Footer copper rules / final reveals: `delay={400}` typical (after card stagger settles)

**Per-step reveals** use the same `<Reveal on={showStepK}>` pattern with appropriate delays (typically 120–200ms).

### 2.3 Hover convention (universal)
All interactive cards (G + H) follow the same hover treatment:
- Default: `border: 1px solid var(--copper-700)` (or copper-800 for low-emphasis), `background: transparent` or `rgba(10,10,10,0.5)`
- Hover: `border: 1px solid var(--copper-200)`, `background: rgba(184,110,61,0.06)`, optional `box-shadow: 0 4px 12px rgba(184,110,61,0.08)`
- Transition: `border-color 0.2s var(--ease), background 0.2s var(--ease)`
- **No dimming of other cards** — keeps catalogue scannable

Exceptions:
- G.7 has a "pinned" state (copper-300 border + small mono "pinned" indicator) — Spec B
- H.2 cross-highlight (hover practice → glow resolved pitfall pills) — Spec C

### 2.4 Click + advance contract
Per `src/deck/Slide.tsx:45-51`, click anywhere on the stage advances one step UNLESS the click target is inside `button`, `a`, `input`, `textarea`, `select`, or `[data-no-advance]`.

**For all G + H slides with interactive cards:** wrap the cards container in `<div data-no-advance>`. This makes the cards region click-safe (clicks within do not advance). Background-area clicks still advance.

**Buttons within cards** (`▶ Play`, `⊙ Compare`, `× Close`): always `<button>` elements → automatically exempt.

### 2.5 Color palette (deck-wide, from meta-spec §6.5)
- `--copper-200` / `--copper-300`: active, hover, keyword highlight
- `--copper-400` / `--copper-500`: mono labels, secondary UI
- `--copper-700` / `--copper-800`: default borders, dot separators
- `--neutral-50` / `--neutral-100`: primary text on dark
- `--neutral-300` / `--neutral-400`: secondary text, captions
- `--neutral-900`: surface (matte near-black)
- Background tints: `rgba(184,110,61,0.06)` (hover bg), `rgba(10,10,10,0.5)` (card bg), `rgba(20,12,6,0.85)` (popover bg)

### 2.6 Typography tokens
- `--display`: Instrument Serif (headlines, beats)
- `--serif`: Source Serif 4 (body)
- `--mono`: JetBrains Mono / IBM Plex Mono (labels, captions, code)
- `--ease`: shared ease curve (cubic-bezier; check `globals.css`)

### 2.7 New shared components introduced in this spec

#### `<VideoOverlay>`
Fullscreen modal overlay for playing capability videos. Used by G.3 (8 cards) · G.5 (7 cards) · G.6 (2 cards). Total 17 instances; component handles the actual video element.

```tsx
<VideoOverlay
  open={boolean}
  onClose={() => void}
  videoSrc="/videos/Claude Cowork - Schedules.mp4"
  caption="Claude Cowork · Schedules"
/>
```

Behavior:
- Backdrop: `rgba(0,0,0,0.85)` covers the entire stage; `position: fixed; inset: 0; z-index: 100`
- Video player: `<video controls autoPlay>` at ~85% stage width, centered
- Top-right close: `<button>` with X icon, copper-300
- Bottom-right caption: video filename in mono small
- Close paths: Esc key (`useEffect` listener) · backdrop click · X button click
- While open: parent suspends `useDeck().advance()` calls (overlay blocks click events anyway)
- File location: `src/components/VideoOverlay.tsx`

#### `<CompareOverlay>`
Modal overlay for the Schedules and Artifacts feature comparisons in G.3. Same modal mechanics as `VideoOverlay` but content is a tabular comparison.

```tsx
<CompareOverlay
  open={boolean}
  onClose={() => void}
  title="Schedules vs Routines vs /loop"
  rows={ComparisonRow[]}
  footer={ReactNode}
/>
```

- Same backdrop + close mechanics as VideoOverlay
- Inner content: 3-column or 2-column matrix (configurable), copper-700 row separators, mono headers, serif body, optional footer note
- File location: `src/components/CompareOverlay.tsx`

#### `<AnimatedGlyph>`
The per-card animated motif system (matches D.3 per-discipline pattern). Each glyph is a small SVG/CSS animation in a fixed container (typically 48×48 or 64×64).

```tsx
<AnimatedGlyph kind="connectors" size={48} />
```

- `kind` enumerates each unique glyph (e.g., `connectors`, `schedules`, `artifacts`, `clear`, `compact`, `loop`, etc.)
- File location: `src/components/AnimatedGlyph/` with subfiles per kind
- Default size: 48 (per-card), 64 (per-stage in G.9)
- Loop behavior: continuous CSS keyframe; typically 4–8s duration; `animation-iteration-count: infinite`

### 2.8 Visual tier table (this section)

| Slide | Tier | Notes |
|---|---|---|
| G.1 | Composition-level animation loop | 3-vendor convergence motif |
| G.2 | Diagrammatic table (step-reveal only) | Platform comparison rows |
| G.3 | Per-card animated glyphs (8) + 2 compare buttons + 8 video buttons | Universal hover, scoped click |
| G.4 | Per-item animated glyphs (~8 within ~30) | 4-quadrant catalogue |
| G.5 | Per-card animated glyphs (7) + 7 video buttons | Same pattern as G.3 |
| G.6 | Per-card animated glyphs (3) + 2 video buttons | Same pattern, briefer |

## 3. Per-slide deep dives

### G.1 — Ecosystem overview

**FigLabel:** `FIG. G.1 · ECOSYSTEM`
**Headline:** "Three vendors. Specialization, not single winners."
**Headline kw:** `["Specialization", "single winners"]`
**Steps:** 3 · **Canonical pose:** 2 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel (always) + headline (always)
- Center stage (~480px tall): 3 vendor "orbs" arranged horizontally, each ~340px wide × 480px tall
  - Left: Claude orb (copper-200 ring, "reasoning trails" loop)
  - Center: Google orb (copper-300 ring, "integration network" loop)
  - Right: OpenAI orb (copper-400 ring, "accessibility ripples" loop)
- Below orbs: closing line band (~80px), revealed at step 2

**Step structure:**
- Step 0 (entry): All 3 orbs fade in with stagger (120ms / 200ms / 280ms); ambient loops start immediately
- Step 1: Per-vendor specialization label appears beneath each orb (mono 11px, copper-300):
  - Claude: "Deep reasoning + agentic workflows"
  - Google: "Integration + research"
  - OpenAI: "Accessibility + ecosystem"
  - Stagger: 100ms each
- Step 2: Closing line reveals at bottom (italic display 22px, copper-200): "Pick the right tool for each task — never the right vendor for every task."

**Composition-level animation loop:**
- File: `src/slides/application-section-g/components/EcosystemMotif.tsx`
- Three orbs, each an SVG circle (`r=120`) with vendor-specific particle/trail animation:
  - Claude: 6 reasoning trails curving outward then returning (deep-thought motif), 6s loop
  - Google: hub-and-spoke network with 8 satellite nodes, particles flowing inward, 8s loop
  - OpenAI: concentric ripples expanding outward (3 rings), 5s loop
- Subtle particle bridges between orbs (copper-700, low opacity 0.15) suggesting MCP interoperability
- Loops continuously regardless of step

**Hover:** None on this slide.

**Click + advance:** Standard. No `data-no-advance` needed (no interactive elements).

---

### G.2 — Claude Platforms

**FigLabel:** `FIG. G.2 · CLAUDE PLATFORMS`
**Headline:** "Five surfaces. One Claude."
**Headline kw:** `["Five surfaces", "One Claude"]`
**Steps:** 3 · **Canonical pose:** 2 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): comparison table, 5 rows × 4 columns

**Table columns:**
1. Platform (mono 14px, copper-300 — name)
2. Surface (serif 14px — where it lives: "Web app", "Desktop app", "CLI", etc.)
3. Audience (serif 14px — who uses it)
4. Killer feature (serif 14px italic, copper-200 — single distinguishing capability)

**Table rows:** (in this order)
1. Chat — Web/Mobile — Anyone — *"Conversational AI with file upload + web search"*
2. Cowork — Desktop/Web — Knowledge workers — *"Autonomous task execution for non-engineers"*
3. Code — Desktop — Developers — *"Multi-pane IDE with parallel agent workflows"*
4. CLI — Terminal — Developers + power users — *"Fully scriptable Claude Code in your shell"*
5. Web (Design + Code + Artifacts) — Web — Designers + builders — *"Browser-based design-system extraction → production handoff"*

**Step structure:**
- Step 0 (entry):
  - Mono header row appears unconditionally (no Reveal — column titles are structural)
  - First 5 rows stagger in: `delay={120 + i * 80}` per row
  - Each row's CopperRule beneath (1px copper-800) animates in with the row
- Step 1: Right column ("Killer feature") highlights — italic copper-200 styling intensifies (copper-100 + slight glow). Adds emphasis on what makes each platform unique.
- Step 2: Footer line reveals (italic display 18px, copper-200): "Same Claude. Different shape for the surface you live in."

**Hover:** Hover any row → row gets active treatment (bg `rgba(184,110,61,0.06)`, copper-200 left border accent). Optional, additive.

**Click + advance:** Wrap the table in `<div data-no-advance>`.

---

### G.3 — Claude Capabilities

**FigLabel:** `FIG. G.3 · CLAUDE CAPABILITIES`
**Headline:** "Eight surfaces. Pick the ones you'll use."
**Headline kw:** `["Eight surfaces"]`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): 4×2 grid of capability cards
  - Each card: ~290px wide × ~250px tall, gap 18px
  - Container wrapped in `<div data-no-advance>`

**8 capability cards:**

| Position | Capability | Video file | Compare? | Glyph kind |
|---|---|---|---|---|
| 1,1 | Connectors | `Claude Connectors - Introduction.mp4` | — | `connectors` (network handshake) |
| 1,2 | Plugins | `Claude Cowork - Plugins.mp4` | — | `plugins` (puzzle-fit) |
| 1,3 | Projects | `Claude Cowork - Projects.mp4` | — | `projects` (folder-stack) |
| 1,4 | Dispatch | `Claude Cowork - Dispatch.mp4` | — | `dispatch` (signal-send) |
| 2,1 | Schedules ✦ | `Claude Cowork - Schedules.mp4` | ✓ | `schedules` (cron-tick) |
| 2,2 | Web Artifacts ✦ | `Claude Web - Artifacts.mp4` | ✓ | `artifacts` (canvas-render) |
| 2,3 | Diagrams | `Claude Web - Interactive Diagrams.mp4` | — | `diagrams` (node-graph drawing) |
| 2,4 | Design | `Claude Design - Introduction.mp4` | — | `design` (layout-grid forming) |

**Card structure:**
```
┌─ [glyph 48×48]                       ─┐
│  Capability Name (display 22px)        │
│  1-line description (serif 14px)       │
│                                        │
│  [▶ Play video]  [⊙ Compare] (compare- │
│                                only on  │
│                              Schedules + │
│                              Artifacts) │
└────────────────────────────────────────┘
```

- Card border: `1px solid var(--copper-700)` default; hover → `var(--copper-200)`
- Background: `rgba(10,10,10,0.5)` default; hover → `rgba(184,110,61,0.06)`
- Padding: 16px
- Glyph anchored top-left
- Buttons anchored bottom-left, mono 11px, copper-300, with copper-700 border (hover → copper-300 border)

**Step structure:**
- Step 0 (entry):
  - 8 cards stagger in: `delay={120 + i * 80}` (where `i` is row-major index 0–7)
  - Glyphs start their loop immediately on card mount
  - Subhead beneath headline (mono 11px copper-400): "All 8 cards have video walkthroughs. Two have feature comparisons."
- Step 1: Footer line reveals beneath grid (italic serif 16px, copper-200): "Each is a different shape of help. Pick by need, not novelty."

**Hover (universal across all 8 cards):**
- Card border → copper-200, bg → copper-glow, transition 200ms
- No popover, no dimming

**Click [▶ Play video]:**
- Opens `<VideoOverlay>` with the corresponding video file
- Esc / backdrop / X to close
- Returns to slide in current step + hover state

**Click [⊙ Compare]** (Schedules and Artifacts only):
- Opens `<CompareOverlay>` with the corresponding comparison content (see §3.G.3.compare below)
- Same close mechanics

**G.3 Schedules compare content:**

```
Title: "Schedules vs Routines vs /loop"
Columns: ["Cowork Schedules", "Code Routines", "/loop command"]

Rows:
  WHAT             | Scheduled autonomous task | Scheduled local task    | Recurring in-session prompt
  WHERE            | Anthropic cloud            | Your machine            | Your active Code session
  WHO              | Knowledge worker           | Power user / dev        | Active worker iterating
  Needs machine on | No                         | Yes                     | Yes
  Needs open sess. | No                         | No                      | Yes
  Survives restart | Yes                        | Yes                     | No
  Local file access| No (fresh clone)           | Yes                     | Yes
  Permissions      | None (fully autonomous)    | Configurable            | Inherits session
  Min interval     | 1 hour                     | 1 minute                | 1 minute

Footer: "Why this is the n8n / Zapier killer: native LLM brain + cloud infra. 
Traditional automation platforms bolt LLM nodes onto a workflow engine. 
These features ARE the workflow engine, with the LLM as the brain."
```

**G.3 Artifacts compare content:**

```
Title: "Web Artifacts vs Live Artifacts"
Columns: ["Web Artifacts", "Live Artifacts (Cowork)"]

Rows:
  WHAT     | Inline interactive output     | Connector-backed auto-refresh interactive output
  WHERE    | Claude.ai chat sidebar        | Cowork workspace surface
  WHO      | Anyone in chat (demo, share)  | Team operations, dashboards, ops
  Refresh  | On request                    | Auto on every open
  Source   | In-chat code                  | Connector-backed (Asana, Slack, Jira, Salesforce)
  Use case | Demo, share, one-off tools    | Live KPI dashboard, project tracker
```

**Click + advance:** Container wrapped in `<div data-no-advance>`. Only background-area clicks advance.

---

### G.4 — Claude Built-in Tools & Commands

**FigLabel:** `FIG. G.4 · BUILT-IN TOOLS & COMMANDS`
**Headline:** "You don't need to write code to use these."
**Headline kw:** `["don't need to write code"]`
**Steps:** 5 · **Canonical pose:** 4 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below: 2×2 quadrant grid (each quadrant ~580px × 250px, gap 24px)

**Quadrants:**

```
┌─── AGENTS ─────────────┬─── SLASH COMMANDS ──────┐
│  Q1 (top-left)          │  Q2 (top-right)         │
├────────────────────────┼─────────────────────────┤
│  Q3 (bottom-left)       │  Q4 (bottom-right)      │
│  BUILT-IN TOOLS         │  HOOKS                  │
└────────────────────────┴─────────────────────────┘
```

**Q1 — Agents (5 items):** Explore · Plan · Task · general-purpose · claude-code-guide
**Q2 — Slash Commands (8 hero items):** /clear · /rewind · /compact · /loop · /init · /agents · /resume · /help
**Q3 — Built-in Tools (10 hero items):** Read · Write · Edit · Bash · Grep · Glob · WebFetch · WebSearch · Task · Skill
**Q4 — Hooks (6 hero events):** SessionStart · UserPromptSubmit · PreToolUse · PostToolUse · PreCompact · Stop

**Per-item rendering:**
- Item row: 24px mono icon/glyph + name (mono 12px, copper-100) + 1-line essence (serif italic 12px, neutral-300)
- Hero items get `<AnimatedGlyph kind="..." size={20}>`; non-hero items (or items beyond the cap) get static SVG icons

**Animated glyphs (8 total across the slide):**
- Q1: `explore` (scanning sweep)
- Q2: `clear` (text fade-out) · `rewind` (time-reverse arrow) · `compact` (text condense) · `loop` (circular tick) · `init` (scaffold build) · `agents` (parallel spawn)
- Q4: `pretool` (tick pulse)

**Step structure:**
- Step 0 (entry): All 4 quadrant frames + headers appear instantly (structural). Q1 items stagger in (`delay={120 + i * 80}`)
- Step 1: Q2 items stagger in
- Step 2: Q3 items stagger in
- Step 3: Q4 items stagger in
- Step 4: Closing line reveals beneath grid (italic serif 16px, copper-200): "Skills are recipes. MCP is the kitchen. Plugins are the meal kits." [from claude-builtin research file]

**Hover:** Per-item hover → item gets copper-200 background + copper-100 text. No popover.

**Click + advance:** Wrap the quadrant grid in `<div data-no-advance>`.

---

### G.5 — Google

**FigLabel:** `FIG. G.5 · GOOGLE`
**Headline:** "Seven surfaces. NotebookLM is the standout."
**Headline kw:** `["NotebookLM", "standout"]`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): 7 cards in a hero+grid layout
  - Hero card (NotebookLM): top-left, larger (~580px × 250px)
  - 6 supporting cards: 3×2 grid on right (each ~290px × 250px, gap 18px)
- Container wrapped in `<div data-no-advance>`

**Card layout:**

```
┌── NOTEBOOKLM ────────┬── Workspace Studio ──┐
│  (hero, ~580×250)     │  (~290×120)          │
│                       ├──────────────────────┤
│                       │  AI Studio · (~290×120)
├──── Canvas ──────────┼── Flow ──────────────┤
│                       │                      │
├──── Stitch ──────────┼── Gems ──────────────┤
└──────────────────────┴──────────────────────┘
```

(Note: layout sketch above is illustrative; the implementer should use a CSS grid with `grid-template-areas` for clarity.)

**7 cards:**

| Position | Capability | Video file | Glyph kind |
|---|---|---|---|
| Hero | NotebookLM | `NotebookLM - Introduction.mp4` | `notebooklm` (source-grounded answer flow) |
| Card | Workspace Studio | `Google Workspace Studio - Introduction.mp4` | `workspace-studio` (multi-app integration) |
| Card | AI Studio | `Google AI Studio - Introduction.mp4` | `ai-studio` (playground / build) |
| Card | Canvas | `Gemini - Canvas.mp4` | `canvas` (doc-to-app morph) |
| Card | Flow | `Google Flow - Introduction.mp4` | `flow` (frame-by-frame video) |
| Card | Stitch | `Google Stitch - Introduction.mp4` | `stitch` (visual-design layout) |
| Card | Gems | `Gemini - Gems.mp4` | `gems` (faceted persona) |

**Card structure:** Same as G.3 (glyph + name + 1-line description + `[▶ Play video]` button). NotebookLM hero card has a longer description (3-line max) and a slightly larger glyph (64×64 vs 48×48).

**Step structure:**
- Step 0 (entry):
  - Hero NotebookLM card animates in first (delay 120ms)
  - 6 supporting cards stagger after: `delay={200 + i * 80}`
  - Glyphs loop immediately
  - Subhead beneath headline (mono 11px copper-400): "Source-grounded research. Native to your workspace. The integration play."
- Step 1: Footer line reveals (italic serif 16px, copper-200): "Already in Google Workspace? Half of this is one click away."

**Hover:** Universal — copper-200 border + copper-glow bg.

**Click [▶ Play video]:** Opens `<VideoOverlay>` with corresponding file.

**Click + advance:** Container wrapped in `<div data-no-advance>`.

---

### G.6 — OpenAI brief

**FigLabel:** `FIG. G.6 · OPENAI`
**Headline:** "Three surfaces. Brief by design."
**Headline kw:** `["Brief by design"]`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): 3 cards horizontal (each ~410px × 320px, gap 24px)
- Container wrapped in `<div data-no-advance>`

**3 cards:**

| Capability | Video file? | Glyph kind | Description |
|---|---|---|---|
| ChatGPT | — (no video — covered widely) | `chatgpt` (chat bubble pulse) | Web search + ecosystem; the most accessible AI for the public. |
| Codex App | `Codex App - Introduction.mp4` | `codex` (terminal cursor + code stream) | Coding-focused desktop GUI; parallel git worktrees; macOS GA. |
| Workspace Agents | `ChatGPT - Workspace Agents.mp4` | `workspace-agents` (24/7 cloud agent loop) | Cloud-running autonomous agents; scheduled triggers; Slack/Salesforce/Workspace integration. |

**Card structure:** Same as G.3. ChatGPT card has no `[▶ Play video]` button (no video).

**Step structure:**
- Step 0 (entry):
  - 3 cards stagger in: `delay={120 + i * 100}`
  - Glyphs loop immediately
  - Subhead beneath headline (mono 11px copper-400): "Brief because OpenAI overlaps the others; deep where they don't."
- Step 1: Footer line reveals (italic serif 16px, copper-200): "Workspace Agents is the most underrated of these three — autonomous + cloud + integration-rich."

**Hover:** Universal pattern.

**Click [▶ Play video]:** Opens `<VideoOverlay>`. (Only on Codex App + Workspace Agents.)

**Click + advance:** Container wrapped in `<div data-no-advance>`.

---

## 4. Open questions / assumptions

1. **Glyph SVG sources:** Implementer will need to design or commission the per-glyph SVG art. Recommended: hand-built simple SVGs with copper-only stroke/fill, animated via CSS keyframes (matches D.3 implementation pattern).
2. **NotebookLM hero treatment:** The hero positioning gives NotebookLM ~2× the visual weight of other cards. If projection testing shows this is too much, fall back to equal-sized 4×2 grid (Gems moves to position 2,4).
3. **G.4 hero-item curation:** The hero items list is pulled from the claude-builtin-tools research file — implementer should re-verify currentness against latest Claude Code docs at implementation time.
4. **Video poster frames:** Each `.mp4` file should have a corresponding `_poster.jpg` extracted (first frame or hand-selected) for the video card preview before play. Add a build script or manual extraction pass.

## 5. Acceptance

When implemented, this spec is satisfied if:
- All 6 slides render at 1280×720 without layout overflow
- Entry animations match the canonical pattern (FigLabel + headline instant; cards stagger 120ms / 80–90ms)
- All 17 video buttons across G.3/G.5/G.6 open `<VideoOverlay>` correctly with corresponding `.mp4` files
- G.3 Schedules + Artifacts compare buttons open `<CompareOverlay>` with correct content
- All hover states use universal copper-200 + copper-glow; transitions 200ms
- All clickable card containers are wrapped in `data-no-advance`
- All animated glyphs loop continuously (CSS-only, no JS RAF unless required)
- `canonicalPose` for each slide matches PDF/PPTX-export expectations
- All slides registered in `src/deck/registry.tsx` between Section F and Section H

## 6. Self-review notes

- **Placeholder scan:** No TBDs. Glyph SVG art is acknowledged as implementation-time work, not a deferred design decision.
- **Internal consistency:** Hover convention is consistent across G.2/G.3/G.4/G.5/G.6 (universal copper-200 treatment). Click contract consistent (data-no-advance + button-exempt).
- **Scope check:** 6 slides + shared conventions = focused spec. Sibling specs (B + C) reference back without re-litigating.
- **Ambiguity check:** Step structures explicit (n steps numbered with reveal points). Each compare/video overlay's content fully specified, not "TBD."
