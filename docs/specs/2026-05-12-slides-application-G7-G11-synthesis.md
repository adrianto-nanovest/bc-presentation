# Section G — Tools Ecosystem · Synthesis Spec (G.7 – G.11)

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Draft 2026-05-12
**Parent meta-spec:** `docs/specs/2026-05-06-process-and-design-meta.md`
**Dependent on:** `2026-05-12-slides-application-G1-G6-catalogue.md` (shared conventions, components)

## 0. Scope

This spec covers **Section G slides 7–11** — the synthesis arc that follows the catalogue:
- G.7 Head-to-head pairs
- G.8 Capability matrix
- G.9 The Workflow (E2E recipe)
- G.10 Beyond the Big Three
- G.11 Bridge to H

Conventions (entry animation, hover, click, palette, typography, shared components `<VideoOverlay>` / `<CompareOverlay>` / `<AnimatedGlyph>`) are defined in **Spec A §2** and referenced here without restatement.

## 1. New shared components introduced in this spec

### `<DetailPanel>` (G.7)
Right-side detail surface that renders a comparison matrix based on hovered/pinned left-card state. Replaces `<CompareOverlay>`'s overlay model with an inline always-visible panel.

```tsx
<DetailPanel
  comparison={ComparisonDef | null}   // null → blank state
  fallback={ReactNode}                  // step-1 summary panel
/>
```

- File: `src/components/DetailPanel.tsx`
- Border: `1px solid var(--copper-300)` when content present; transparent when blank
- Background: `rgba(20,12,6,0.85)`
- Padding: 24px

### `<WorkflowStage>` (G.9)
Single stage card in the 7-stage workflow pipeline. Used by `WorkflowPipeline`.

```tsx
<WorkflowStage
  num={1..7}
  name="RESEARCH"
  purpose="Understand the problem"
  tools={string[]}
  active={boolean}                       // for flow-loop pulse
  glyphKind={GlyphKind}
/>
```

- File: `src/slides/application-section-g/components/WorkflowStage.tsx`
- Width: ~165px; height: full content area
- Animated glyph anchored top
- Mono number, display name, serif purpose, mono tool chips

### `<WorkflowPipeline>` (G.9)
Composition-level animation loop that wraps 7 `<WorkflowStage>` cards and runs the flow-particle loop across them.

- File: `src/slides/application-section-g/components/WorkflowPipeline.tsx`
- Loop: copper-200 particle traverses left-to-right across all 7 stages, each stage briefly pulses copper-200 as the particle passes; ~12s loop

### `<HeroPhoto>` (G.11 + H.3)
Already exists per the codebase survey — used by D.5 / E.11 bridges. Reuse as-is.

## 2. Per-slide deep dives

### G.7 — Head-to-head

**FigLabel:** `FIG. G.7 · HEAD-TO-HEAD`
**Headline:** "Easily confused. Pick by shape, not vendor."
**Headline kw:** `["shape", "vendor"]`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): 2-column grid
  - Left column (~360px wide): 5 stacked comparison cards, each ~100px tall + 8px gap
  - Right column (~840px wide): `<DetailPanel>` filling full content height
- Container wrapped in `<div data-no-advance>`

**5 left-side cards:**

| # | Title | Items | Default visible (step 1) summary |
|---|---|---|---|
| 1 | Persistent AI config | Gems · Projects · Workspace Agents | "Persona / container / autonomous task. Three shapes of the same idea." |
| 2 | Design-to-code | Stitch · Claude Design | "Visual-first vs prompt-first. Sketch in your favorite tool." |
| 3 | Interactive output | Canvas · Live Artifacts | "Doc-mode vs app-mode. One edits, the other ships." |
| 4 | Developer IDE | Claude Desktop · Codex App | "Both real IDEs. Different shapes — chat-canvas vs GUI-worktrees." |
| 5 | CLI | Claude Code CLI · Codex CLI · Gemini CLI | "All three are real CLIs. Pick by your team's tool-calling needs." |

**Card structure (left side):**
```
┌── Card title (mono 11px copper-300) ──┐
│  TOOL · TOOL · TOOL (display 16px)     │
└────────────────────────────────────────┘
```
- Border: copper-700 default; hover → copper-200 + copper-glow; pinned → copper-300 + 1px inset shadow + small mono "⊙ pinned" indicator (corner)
- Click handler: toggles pinned state
- onMouseEnter / onMouseLeave: drives non-pinned hover

**Detail panel content (per comparison):**

#### Comparison 1 — Persistent AI config (3-way)
```
              Gems          Projects        Workspace Agents
              (Google)      (Anthropic)     (OpenAI)

SHAPE         Persona       Container       Autonomous task
WHAT          Custom        Knowledge       Continuously-
              Gemini        container with  running cloud
              with instr.   files + chat    agent
              + knowledge   history
WHERE         Gemini app    Claude.ai web   ChatGPT cloud
WHO           Personal +    Project teams,  Enterprise +
              team          knowledge       ops automation
              productivity  workers
TRIGGER       Manual call   Manual chat     Schedule, GitHub,
                                            webhook, API
PERSISTENCE   Instructions  Files + memory  Task definition +
              + KB          across chats    integrations
PICK WHEN     You want a    You want one    You want a job
              named expert  shared work-    that runs without
              for repeat    space for       you (24/7)
              tasks         a project
```

#### Comparison 2 — Design-to-code
```
              Stitch                Claude Design
              (Google)              (Anthropic)

ENTRY         Drag visual           Describe in plain
              components            language
DESIGN SYS    Built-in templates    Extracted from your
                                    codebase / Figma
EXPORT        React / Next.js       Design intent bundle
                                    → Claude Code
HANDOFF       AI Studio /           Claude Code
              Antigravity           (production)
PICK WHEN     Visual-thinking       Codebase-aware,
              designers             system-extracted
```

#### Comparison 3 — Interactive output
```
              Canvas                Live Artifacts
              (Google Gemini)       (Anthropic Cowork)

MODE          Doc-style edit        App-style render
SOURCE        Inline doc/code       Connector-backed
REFRESH       Manual                Auto on every open
EDIT          In-place text edit    Code regeneration
USE CASE      Collaborative draft   Live KPI dashboard,
              + iteration           project tracker
```

#### Comparison 4 — Developer IDE
```
              Claude Desktop        Codex App
              (Anthropic)           (OpenAI)

UI MODEL      Multi-pane            VS Code base
              chat + canvas         (familiar)
PARALLELISM   Per-thread agents     Native git worktrees
COMPUTER USE  Permission rules      Visual + background
                                    (macOS GA)
MOBILE        /remote-control       Not available
              dispatch
PICK WHEN     Mobile-first async    Desktop-heavy IDE
              + tool-calling lead   workflow
```

#### Comparison 5 — CLI
```
              Claude Code   Codex            Gemini
              CLI           CLI              CLI

CONTEXT WINDOW 1M (Opus 4.7) 400K + 35% infl ~1M (Gemini 3 Pro)
DEFAULT MODEL  Sonnet 4.6   GPT-5.4          Gemini 3 Pro
TOOL-CALLING   77.3% MCP-At  68.1%           Mid-pack
PARALLEL WT    Manual setup  Native          Manual
SANDBOX        Permission    Starlark policy Permission
               rules         engine          rules
SUBAGENTS      Yes (Explore, Yes              Yes
               Plan, Task)
HOOKS          ~21 events    6 events        Limited
PLUGINS        Mature        Maturing        Early
PRICE          Capped (Pro/  Capped (Plus/   Generous free
               Max/Team)     Business)       + paid
```

**Step structure:**
- Step 0 (entry):
  - Left-side cards stagger in: `delay={120 + i * 80}` for i = 0..4
  - Right side: `<DetailPanel>` renders nothing (blank); shows no border, just empty space
  - Hover any left card → `<DetailPanel>` fills with that comparison's matrix; on mouseleave (and not pinned) → blank
  - Click any left card → pin (locks the comparison visible); click again to unpin
- Step 1 (final):
  - Footer line appears beneath left column (italic serif 16px, copper-200): "Pick by shape, not vendor."
  - `<DetailPanel>` default state changes: instead of blank, renders 5 small summary tiles (one per comparison's "PICK WHEN" line)
  - Hover/pin behavior STILL ACTIVE — hovering a left card temporarily replaces the summary tiles with the full matrix; mouseleave restores summaries (unless pinned)

**Step-1 summary tile rendering (in DetailPanel):**
- 5 tiles, vertical stack or 2-column grid
- Each tile: title (mono 11px, copper-300) + the "PICK WHEN" line (serif italic 14px, neutral-200)
- Border: copper-800; bg: rgba(10,10,10,0.5)

**Hover:** Universal copper-200 + copper-glow (consistent with G.3/G.4/G.5/G.6).

**Pin state visual:**
- Border: copper-300
- Inset shadow: `inset 0 0 0 1px rgba(217,158,108,0.3)`
- Corner indicator: small mono "⊙ pinned" text (10px, copper-300, top-right of card)

**Click + advance:** Container wrapped in `<div data-no-advance>`. Buttons (none here) are exempt; click on a card body triggers pin toggle (handled by onClick on the card div, NOT advance).

---

### G.8 — Capability matrix

**FigLabel:** `FIG. G.8 · CAPABILITY MATRIX`
**Headline:** "Vendor × use case. The decoder."
**Headline kw:** `["decoder"]`
**Steps:** 6 · **Canonical pose:** 5 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): two-region split
  - Main region (left ~960px): 6×5 matrix (6 use-case rows × 5 columns: Use Case + Claude + Google + OpenAI + Best fit)
  - Right gutter (~280px): "Start here?" decision prompts (one per row), copper-200 italic serif

**Matrix rows (6 use cases):**

| Use case | Claude | Google | OpenAI | Best fit |
|---|---|---|---|---|
| Chat Q&A | ●●● Sonnet 4.6 | ●●● Gemini 3 Pro | ●●● GPT-5.5 | Choose by ecosystem |
| Document analysis | ●●● Opus 4.7 vision | ●●●● NotebookLM (grounded) | ●●● GPT-5.4 Thinking | NotebookLM (private docs) |
| Code generation | ●●●● Sonnet 4.6 / Code | ●● Antigravity | ●●● GPT-5.3 Codex | Claude (CursorBench lead) |
| Prototype/Design | ●●●● Claude Design | ●●● Stitch + AI Studio | — | Claude Design (sys extraction) |
| Agentic workflow | ●●●● Cowork | ●●● Workspace Studio | ●●● Workspace Agents | Cowork (knowledge work) |
| Real-time dashboards | ●●●● Live Artifacts | ●● Sheets + Gemini | ●● ChatGPT | Live Artifacts |

(Cell intensity = number of dots, copper-200 to copper-700 graded; ●●●● = 4-tier strongest)

**Right gutter "Start here?" prompts (one per row):**
- Chat Q&A: "Already using Workspace? → Gemini. Otherwise → Sonnet 4.6."
- Document analysis: "Private docs? → NotebookLM. Otherwise → Opus 4.7."
- Code generation: "Solo? → Sonnet 4.6. Long-horizon async? → Codex CLI."
- Prototype/Design: "Visual-first? → Stitch. Codebase-aware? → Claude Design."
- Agentic workflow: "Knowledge work? → Cowork. Schedule-driven? → Workspace Agents."
- Real-time dashboards: "Connector-backed? → Live Artifacts. Spreadsheet-native? → Sheets + Gemini."

**Step structure:**
- Step 0 (entry):
  - Header row appears (column titles: "Use case · Claude · Google · OpenAI · Best fit")
  - Right-gutter header appears: mono "START HERE?" (copper-300, 11px)
- Step 1: Row 1 (Chat Q&A) reveals — left matrix row + right gutter prompt together (`delay={120}`)
- Step 2: Row 2 (Document analysis) reveals (`delay={120}`)
- Step 3: Row 3 (Code generation) reveals
- Step 4: Row 4 (Prototype/Design) reveals
- Step 5: Final two rows reveal together (Agentic workflow + Real-time dashboards), plus footer line: "Six use cases. Three vendors. The matrix is the map." (italic display 18px, copper-200)

**Hover:** Hover any row → row gets `bg: rgba(184,110,61,0.06)`, copper-200 left border accent on the leftmost cell. Hover the matching G.7 head-to-head pair card link (if rendered) → cross-highlight.

**Click + advance:** Wrap the matrix + gutter in `<div data-no-advance>`.

**Implementation note:** This is a **diagrammatic step-reveal slide** — no composition-level animation loop, no per-card glyphs. Step-reveal builds the matrix row by row.

---

### G.9 — The Workflow (E2E recipe)

**FigLabel:** `FIG. G.9 · THE WORKFLOW`
**Headline:** "Building a production-grade website, end to end."
**Headline kw:** `["end to end"]`
**Steps:** 3 · **Canonical pose:** 2 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Center (top:156, bottom:160): 7-stage horizontal pipeline (~7 cards × ~165px wide, gap 8px)
- Bottom band (~80px tall, above the bottom:80 inset): "Keep orchestrator LEAN" maxim band with copper rule

**7 stages (left to right):**

| # | Name | Purpose | Tools (mono chips) | Glyph kind |
|---|---|---|---|---|
| 01 | RESEARCH | Understand the problem | NotebookLM · Drive MCP · web | `magnifier-scan` |
| 02 | BRAINSTORM | Explore approaches | Claude chat · multi-option trade-offs | `lightbulb-pulse` |
| 03 | PLAN | Design the solution | Claude chat · Architect subagent · spec doc | `map-fold` |
| 04 | PROTOTYPE | Sketch + design system | Stitch OR Claude Design · image gen (nano) | `pencil-grid` |
| 05 | IMPLEMENT | Build with AI | Claude Code · Plugins · Skills · MCP | `hammer-strike` |
| 06 | TEST | Verify quality | Claude evals · subagent tests | `flask-bubble` |
| 07 | SHIP | Deploy with confidence | Codex review · Routines · PR auto-merge | `rocket-launch` |

**Stage card structure:**
```
┌── 01 ──── (mono number, copper-300)──┐
│  [glyph 64×64 — animated]              │
│  RESEARCH (display 18px)               │
│  Understand the problem (serif 13px)   │
│  ─── (1px copper-700) ───              │
│  • NotebookLM (mono 10px chip)         │
│  • Drive MCP                            │
│  • web                                  │
└────────────────────────────────────────┘
```
- Card border: copper-700 default; copper-200 momentarily (200ms) when flow particle passes
- Padding: 12px

**Composition-level animation loop:**
- File: `src/slides/application-section-g/components/WorkflowPipeline.tsx`
- A copper-200 particle (3px diameter, soft glow) travels left-to-right across the bottom edge of the pipeline (just above the maxim band)
- As the particle reaches each stage, that stage's border pulses copper-200 (200ms in, 400ms out), and the stage's tool chips briefly highlight (copper-300)
- Loop duration: ~12s (particle takes ~10s to traverse + 2s pause at end before re-spawning at left)
- Loops continuously regardless of step

**Bottom band — "Keep orchestrator LEAN" maxim:**
- Layout: full-width strip, ~80px tall
- Top: copper rule (40% width, centered)
- Center: mono 11px "KEEP ORCHESTRATOR LEAN" (copper-200)
- Beneath: serif italic 14px "Claude conducts; specialists do the work in their stage." (neutral-300)

**Step structure:**
- Step 0 (entry):
  - All 7 stage cards stagger in: `delay={120 + i * 80}` (left-to-right)
  - Glyphs start their loops on mount
  - Pipeline flow particle starts immediately (visible across all steps)
  - Subhead beneath headline (mono 11px copper-400): "Same recipe. Different deliverable. Pick the use case that fits your work."
- Step 1: "Keep orchestrator LEAN" maxim band reveals (band fades in 600ms; copper rule animates width 0→40%)
- Step 2: Footer line beneath the maxim reveals (italic display 18px, copper-200): "Screenshot this slide. It's the recipe — for whatever you're building."

**Hover:** Per-stage hover → stage card border → copper-200 (overrides flow-pulse momentarily); tool chips for that stage highlight (copper-300). Optional per-tool-chip hover → small tooltip describing what that tool contributes (deferred — implementer's call).

**Click + advance:** Wrap the pipeline + maxim band in `<div data-no-advance>`.

---

### G.10 — Beyond the Big Three

**FigLabel:** `FIG. G.10 · BEYOND THE BIG THREE`
**Headline:** "Three more worth knowing — for when the giants don't fit."
**Headline kw:** `["the giants don't fit"]`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): 3 cards horizontal (each ~410px × 480px, gap 24px)
- Container wrapped in `<div data-no-advance>`

**3 cards:**

| Card | Tool | Differentiator | Description | Use case | Footnote | Glyph kind |
|---|---|---|---|---|---|---|
| 1 | OpenClaw | Open-source AI agent | Messaging-first interface; self-host friendly. | Privacy-sensitive deploys, enterprises, gov. | ~350K stars, MIT license. | `openclaw` (open chat-flow) |
| 2 | Hermes Agent | Self-improving + persistent memory | Learns from prior runs; persistent context across sessions. | Tasks where context across sessions matters more than raw capability. | ~64K stars. | `hermes` (memory-spiral) |
| 3 | n8n | LLM-native workflow automation | Workflow automation that turned LLM-native in 2026 (MCP integration). | Cross-app workflows, no-code AI orchestration for ops + IT teams. | ~80K stars; self-host or SaaS. | `n8n` (workflow-graph nodes) |

**Card structure:**
```
┌── [glyph 64×64] ───────────┐
│  OPENCLAW (display 28px)    │
│                              │
│  Open-source AI agent.       │
│  Messaging-first interface;  │
│  self-host friendly.         │
│  (serif 16px, neutral-100)   │
│                              │
│  ─── (1px copper-700) ───    │
│                              │
│  FOR (mono 10px copper-400)  │
│  Privacy-sensitive deploys,  │
│  enterprises, gov.           │
│  (serif 14px, neutral-300)   │
│                              │
│                              │
│  ~350K stars, MIT.           │
│  (mono 10px copper-500)      │
└──────────────────────────────┘
```
- No `[▶ Play video]` button (no videos available)
- No `[⊙ Compare]` button (these aren't compared against the Big Three — they're complementary)
- Border: copper-700 default; hover → copper-200 + copper-glow

**Step structure:**
- Step 0 (entry):
  - 3 cards stagger in: `delay={120 + i * 100}`
  - Glyphs start loops immediately
  - Subhead beneath headline (mono 11px copper-400): "Open-source. Self-improving memory. LLM-native automation. Three moats the giants haven't filled."
- Step 1: Footer line reveals (italic serif 16px, copper-200): "Privacy moats, memory moats, integration moats — the three things the Big Three are still figuring out."

**Hover:** Universal pattern.

**Click + advance:** Container wrapped in `<div data-no-advance>`.

---

### G.11 — Bridge to H

**FigLabel:** `FIG. G.11 · BRIDGE · WIELD`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal` · **Surface:** dark
**Pattern lineage:** Follows D.5 / E.11 bridge convention.

**Hero photo:**
- File: `/heroes/g11-bridge.jpg` (NEW nanobanana generation)
- Subject: a calibrated instrument or heavy tool laid down on a craftsman's workbench — copper-warm tones; industrial dignity; never AI-cyber cliché
- Examples for the prompt: a tradesman's planimeter on weathered wood; a calibrated set of dividers and a draftsman's ruler; a heavy press-brake handle at rest; a goldsmith's loupe and pliers
- Size: full-bleed; `background-size: cover; background-position: center`

**Layered overlays (matches E.11 pattern):**
- Bottom-left vignette: `linear-gradient(to top right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 35%, rgba(10,10,10,0.0) 70%)`
- Top-left ellipse: `radial-gradient(ellipse 520px 280px at top left, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0) 100%)` (protects FigLabel readability)
- Top-edge gloom: `linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)`

**Bottom-left anchored beats:**
- Position: `left: 48; bottom: 110; max-width: 760; gap: 24; z-index: 20`

**Beat 1** (display, 56px, neutral-50, line-height 1.05, letter-spacing -0.01em):
> "You have the tools."
- kw: `["the tools"]` (italicized via highlight)

**Copper rule:** width 30%, delay 400ms

**Beat 2** (display italic, 40px, copper-200, line-height 1.1):
> "Now the question becomes: how do you wield them?"
- kw: `["how do you wield them"]`

**Mono attribution** (10px, copper-400, letter-spacing 0.18em, uppercase):
> "— Section H · Pitfalls + Discipline"

**Step structure:**
- Step 0 (entry): Hero photo + overlays + FigLabel mount instantly. Beat 1 reveals (`<Reveal on={true}>`); copper rule animates width 0→30% (delay 400ms).
- Step 1: Beat 2 reveals (`<Reveal on={showBeat2} delay={150}>`).

**Hover:** None.

**Click + advance:** Standard. No interactive zones.

**Implementation:** Mirror the structure of `e11-bridge-to-f.tsx` exactly — only swap the hero file, beat text, attribution, and FIG label. Component file: `src/slides/application-section-g/g11-bridge-to-h.tsx`.

---

## 3. Open questions / assumptions

1. **Hero photo for G.11:** nanobanana prompt to be drafted at implementation time. Suggested motif: "calibrated instrument laid down on a craftsman's workbench, copper-warm tones, photographic, dignified, no AI/tech imagery."
2. **DetailPanel pin behavior on step 1:** A pinned card overrides the summary tiles with the full matrix. If user hovers another card while pinned, hover wins temporarily (visual feedback) but mouseleave restores the pinned matrix (not the summaries). Implementer should confirm this UX choice during build.
3. **G.8 cell intensity rendering:** Use 4-tier dot system (●●●● strongest → ● weakest); copper-200 → copper-700 graded. Alternative: filled bar segments. Choose during projection-test.
4. **G.9 flow particle physics:** The particle should feel deliberate, not frantic. ~10s traversal across 7 stages = ~1.4s per stage. If projection testing shows it's too fast or too distracting, implementer can extend to 16-20s.
5. **G.7 detail-panel sizing:** With 5 comparison categories at 7-9 rows each, the detail panel needs to fit ~8 rows + headers in ~520px tall. Mono 11px headers + serif 13px body should fit; verify at projection scale.

## 4. Acceptance

When implemented, this spec is satisfied if:
- All 5 slides render at 1280×720 without overflow
- G.7 left-cards drive the right `<DetailPanel>` correctly (hover + pin + step-1 fallback)
- G.8 matrix builds row-by-row across 5 reveal steps + final footer
- G.9 pipeline animates flow particle continuously; stages pulse on pass
- G.10 cards present the 3 alternative tools without compare/video buttons
- G.11 bridge matches D.5/E.11 visual pattern with new hero
- All hover states use universal copper-200 + copper-glow (G.10)
- All clickable card containers wrapped in `data-no-advance`
- All slides registered in `src/deck/registry.tsx` after G.6 and before H.1
- Bridge slide uses same components as `e11-bridge-to-f.tsx`

## 5. Self-review notes

- **Placeholder scan:** No TBDs in slide content. Hero-photo prompt + `DetailPanel` pin-edge UX flagged as implementer-time decisions, not deferred design.
- **Internal consistency:** G.7 uses universal hover convention (consistent with G.3-G.6); pin state is the only G-specific addition. G.11 explicitly mirrors E.11 — no divergence.
- **Scope check:** 5 slides + 3 new shared components = focused. Spec C (H) will reuse `<HeroPhoto>` and the shared conventions; no further G components needed.
- **Ambiguity check:** Step structures explicit; comparison content fully specified per matrix; flow-particle behavior described.
