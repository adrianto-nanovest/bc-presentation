# Slides — Foundation Techniques — Section F — Spec

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Sub-spec:** Foundation Techniques arc — **Section F** (RAG · Plugins umbrella · Agent orchestration)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Approved 2026-05-11 (in-context brainstorm 2026-05-11; two-pillar architecture; E.8-style left-menu pattern adopted; Agentic OS coronation slide)
**Source brainstorm:** in-context 2026-05-11
**Parent meta-spec:** [`docs/specs/2026-05-06-process-and-design-meta.md`](2026-05-06-process-and-design-meta.md)
**Sibling specs:**
- [`docs/specs/2026-05-08-slides-foundation-core.md`](2026-05-08-slides-foundation-core.md) — Section D (process improvement; tonal precedent)
- [`docs/specs/2026-05-08-slides-foundation-core-section-e.md`](2026-05-08-slides-foundation-core-section-e.md) — Section E (engineering fundamentals; **F directly extends E's harness vocabulary**)
- [`docs/specs/2026-05-07-slides-reveal-and-closing.md`](2026-05-07-slides-reveal-and-closing.md) — Sections I, J, K. **Houses the cross-spec dependency on F's vocabulary (I.3 portfolio simulations).**

**Research consumed without re-litigation:**
- [`docs/researches/topic-ai-techniques.md`](../researches/topic-ai-techniques.md) — full research on MCP / RAG / Plugins / Agent orchestration with 2026 ecosystem state, layered architecture diagram
- [`docs/researches/internal-pilot-workshop.md`](../researches/internal-pilot-workshop.md) — slides 32–33 RAG/MCP architectural patterns
- [`docs/researches/internal-ai-sdlc-foundation.md`](../researches/internal-ai-sdlc-foundation.md) — slides 10–13 plugins/skills/hooks (progressive disclosure)
- [`docs/researches/2026-05-11-emerging-techniques-and-tools.md`](../researches/2026-05-11-emerging-techniques-and-tools.md) — placement decisions for LLM Wiki, Agentic OS, openClaw, Hermes
- [`docs/examples/bridge-artifact.png`](../examples/bridge-artifact.png) — silver-platter illustration (canonical RAG visual)
- [`docs/examples/agentic-os-illustration.png`](../examples/agentic-os-illustration.png) — layer-cake illustration (canonical capability-pillar visual)

## 0. Scope

This spec covers per-slide design for **Section F — Foundation Techniques** of the workshop deck. It is intentionally a **separate file from Section D and Section E sub-specs** so that downstream agents can work on Section F with a focused context window.

- **Section F** — RAG / Plugins umbrella (Skills · MCP · Hooks · Sub-agents) / Agentic OS coronation. **9 slides, ~50 logical advances.**

Explicitly NOT in scope (each has its own spec):
- Section D (process improvement) — `2026-05-08-slides-foundation-core.md`
- Section E (engineering fundamentals) — `2026-05-08-slides-foundation-core-section-e.md`
- Sections A, B, C — separate sub-specs
- Section G (tools ecosystem — Claude/Google/OpenAI; covers NotebookLM as a tool; brief mention of openClaw/Hermes under "wider ecosystem") — separate sub-spec
- Section H — separate sub-spec
- Sections I, J, K — `2026-05-07-slides-reveal-and-closing.md`
- Practice-lab curriculum
- Final copper hex ladder (settled at implementation per meta-spec §6.5)
- Projection-scale font calibration (refined at implementation per meta-spec §7.2)

## 1. Section structure (locked)

| # | FIG label | Slide title | Beat | Animation mode | Background tier |
|---|-----------|-------------|------|----------------|-----------------|
| **F.1** | `TWO PILLARS` | **Two Pillars** | Section opener · split-stage map (knowledge × capability) with bridge-artifact + layer-cake both dim, brightening per pillar | Step-reveal | Diagrammatic |
| **F.2** | `GROUND TRUTH` | **RAG · Grounding in your facts** | Knowledge pillar · 5-facet menu (left) + bridge-artifact canvas (right) cycling 4 RAG types (vector / graph / file / hybrid) with LLM Wiki as canonical file-based example | Step-reveal + hover-canvas-swap | Diagrammatic |
| **F.3** | `THE PACKAGE` | **Plugins · The expertise package** | Capability umbrella opener · 5-facet menu + layer-cake canvas with copper "PLUGIN" ribbon wrapping; introduces F.4–F.7 as cake layers | Step-reveal + hover-canvas-swap | Diagrammatic |
| **F.4** | `WRITE ONCE` | **Skills · Write expertise once** | Plugin component · 5-facet menu + 3-level progressive-disclosure flagship right canvas (METADATA · INSTRUCTIONS · RESOURCES with token costs + when-loaded) | Step-reveal + hover-canvas-swap + click-modal | Diagrammatic |
| **F.5** | `THE ADAPTER` | **MCP · The universal adapter** | Plugin component · 5-facet menu + USB analogy default canvas; hover swaps to dual-role split, API-vs-MCP-vs-CLI compare (with per-column click-modal), what-MCP-exposes (Resources/Tools/Prompts) | Step-reveal + hover-canvas-swap + click-modal | Diagrammatic |
| **F.6** | `THE UNSEXY WORK` | **Hooks · Doing the unsexy work** | Plugin component · 4-facet menu + 3-column "Three hooks doing the unsexy work" canvas (SessionStart · PostToolUse · Stop) with sketch-style illustrations | Step-reveal + hover-canvas-swap | Diagrammatic |
| **F.7** | `SPECIALISTS` | **Sub-agents · Specialist departments** | Plugin component · 5-facet menu + 4-pattern orchestration grid canvas (centralized · decentralized · chain · parallel) with per-pattern micro-svg animations | Step-reveal + hover-canvas-swap | Diagrammatic |
| **F.8** | `YOUR AGENTIC OS` | **Your Agentic OS** | Section coronation · enriched 8-layer stack (left half) + 4 output cards (right half) with connection lines; horizontal facet strip across the top; closes with portability tagline | Step-reveal + hover-popover | Diagrammatic |
| **F.9** | `NEXT` | *(no title — photographic exhale)* | Bridge to G · 3 reveal beats: headline → copper rule → subline ("Techniques covered. Tools next.") | Step-reveal (no ambient) | **Photographic** |

**Section F total: 9 slides · ~50 logical advances.** Sits between D=22 and E=47 in density. Justified by per-technique depth (5 facets each) and the synthesis F.8.

### 1.1 Click-driven motion discipline

All Section F slides use **click-driven advance pacing** — one Space press per speaker beat. Internal motion within an advance auto-completes (typewriter, ring draws, layer slides, etc.) but advances to the *next* beat require explicit Space press. Speaker has full control over pacing.

This continues Section E's pattern.

### 1.2 Visual pillar mapping

| Pillar | Slides | Flagship visual |
|--------|--------|-----------------|
| **Knowledge** ("what AI knows") | F.2 only | bridge-artifact silver platter |
| **Capability — Plugins umbrella** ("what AI does") | F.3 (umbrella), F.4 (Skills), F.5 (MCP), F.6 (Hooks), F.7 (Sub-agents) | layer-cake (CLAUDE.md → Hooks → Skills → Agents + MCP connectors) |
| **Synthesis** | F.8 only | enriched stack (8 layers) + 4 user-facing output cards |

F.1 opens with both flagship visuals dim side-by-side; F.8 closes with the enriched synthesis. F.9 is photographic exhale.

## 2. Deck-wide conventions (referenced; not redefined)

Apply across every slide. Locked in memory; this spec consumes them.

| Convention | Reference |
|---|---|
| Background tiering (photo for hero / plain-dark for diagrammatic) | `feedback_slide_visual_conventions.md` |
| FIG label `— FIG. <SECTION>.<NUM> · <LABEL>` top-left | `feedback_slide_visual_conventions.md` |
| Image source: `gemini-image-gen` MCP (primary), Unsplash (backup) | `feedback_slide_visual_conventions.md` |
| Static photographic backgrounds — no animated motion behind content | `feedback_slide_visual_conventions.md` |
| Keyword highlight pattern (copper italic on 1–3 keywords per chunk) | `feedback_keyword_highlighting.md` |
| Hover micro-interactions as presenter-controlled detail layer | `feedback_slide_interaction_conventions.md` |
| Audience-respect framing (no commit counts, no "solo" repeats, plain-language) | `feedback_audience_framing.md` |
| **Generic body examples** (universal knowledge-work scenarios — NEVER mining-specific in body) | `feedback_generic_examples.md` |
| Free-only stack (no paid components/fonts/libraries) | `feedback_no_paid_components.md` |

Substrate: shadcn UI + Tailwind + CSS-only motion (matching Section E dialect, not Framer Motion). Typography: Instrument Serif (display), Source Serif 4 (body), Inter (sans), JetBrains Mono (mono) — all per meta-spec §7. Single accent: deep copper `#b86e3d` and derived stops + grayscale (per meta-spec §6.5).

### 2.1 Section F interaction grammar (additional discipline)

Section F adopts **E.8's left-menu/right-canvas pattern** as the primary mode for F.2 through F.7 — adapted for documentation-style facet teaching. F.1 (opener), F.8 (coronation), and F.9 (bridge) use different layouts.

| Interaction | Use case | F slides |
|---|---|---|
| **Hover** | Quick reference / preview-highlight | F.1 pillars, F.3 cake layers (forward-pointer) |
| **Hover-popover** | Quick-reference depth (~6 lines per popover) | F.8 stack layers + output cards |
| **Hover-canvas-swap** (extends E.8 hover-canvas-morph) | Left-menu facet hover swaps right-canvas illustration; default canvas = slide flagship | **F.2, F.3, F.4, F.5, F.6, F.7** (primary mode) |
| **Click-to-expand modal** | Real teaching depth with bulleted content + close button | F.4 Skills (full SKILL.md modal), F.5 MCP (per-column tradeoff modal) |
| **No interaction** | Photographic exhale | F.9 |

### 2.2 Standardized facet menu (vocabulary spine)

F.2–F.7 all use a **5-facet left menu** as their cognitive scaffold. The five default facets:

| Facet | Purpose |
|-------|---------|
| **WHAT IT IS** | Plain-language analogy (1–2 lines) |
| **HOW IT WORKS** | Mechanism, in mostly-non-technical terms |
| **STRUCTURE / TYPES** | The taxonomy or internal architecture (e.g., RAG types, MCP exposed elements) |
| **WHEN TO REACH FOR IT** | The problem this solves; when NOT to use |
| **EXAMPLE** | One concrete generic-knowledge-work scenario |

Per-slide facet variations:
- **F.2 RAG**: facets are WHAT IT IS · HOW IT WORKS · THE TYPES · WHEN TO REACH · EXAMPLE
- **F.3 Plugins**: WHAT IT IS · WHAT'S INSIDE · WHY PACKAGE · HOW IT LOADS · EXAMPLE (5 facets, swaps STRUCTURE for WHAT'S INSIDE + adds WHY PACKAGE)
- **F.4 Skills**: WHAT IT IS · PROGRESSIVE DISCLOSURE · HOW CLAUDE PICKS · LEAN CONTEXT + RICH KNOWLEDGE · EXAMPLE (5 facets — PROGRESSIVE DISCLOSURE replaces STRUCTURE)
- **F.5 MCP**: WHAT IT IS · DUAL ROLE · API vs MCP vs CLI · WHAT MCP EXPOSES · EXAMPLE (5 facets)
- **F.6 Hooks**: WHAT IT IS · LIFECYCLE EVENTS · THREE HOOKS DOING THE UNSEXY WORK · EXAMPLE (4 facets — collapsed, since 3-column visual is dense)
- **F.7 Sub-agents**: WHAT IT IS · HOW SUB-AGENTS WORK · ORCHESTRATION PATTERNS · WHEN TO USE WHICH · EXAMPLE (5 facets)

Pattern visible by F.4: audience expects 5 facets. By F.5 they're skim-reading the left menu before the speaker introduces it. This is **pedagogical compression** — the deck teaches its own structure.

### 2.3 Generic examples constraint (cross-cutting)

Per `feedback_generic_examples.md`: **all examples in F slides are universal knowledge-work scenarios, never mining-specific.** Default scenario library:

- **Weekly project report** (extends Section E's anchor task — natural cross-section continuity)
- **Document audit** (legal contract review, research paper synthesis, audit report)
- **Email triage** (inbox processing, action-item extraction)
- **Meeting summarization** (notes → digest → tasks)
- **Customer support routing** (FAQ resolution, tier-1 escalation)
- **Spreadsheet analysis** (financial reconciliation, data cleanup)
- **Calendar / scheduling** (multi-stakeholder availability)
- **Knowledge base lookup** (company wiki, SOP retrieval)

Each F slide picks ONE primary example, explained briefly on the slide and in a hover popover. Across F.2–F.7, examples should diversify (not all use weekly-report) to demonstrate technique versatility.

## 3. Cross-cutting primitives

### 3.1 Reused from sibling specs

These primitives are specified elsewhere and consumed unchanged here.

| Primitive | Used on (Section F) | Source |
|---|---|---|
| `<FigLabel section, num, label>` | All 9 slides | meta primitives |
| `<KeywordHighlight>` (highlight helper) | All 9 slides | meta primitives |
| `<HeroPhoto src, vignetteSide>` | F.9 | E.11 / D.5 |
| `<DisplayPhrase staggerType, words>` | F.9 | E.11 |
| `<Reveal on, delay, as?, children>` | All 9 slides | E section |
| `<CopperRule on, delay?, width?>` | All 9 slides | E section |
| `<Typewriter>` | F.4 (SKILL.md content reveal) | E.2 / E.4 |
| `<HoverPopover trigger, payload>` | F.8 only | E.3 / E.6 / E.7 |

### 3.2 New primitives introduced by Section F

Build during Section F implementation; reusable across the deck thereafter.

| Primitive | Purpose | Used on |
|---|---|---|
| `<FacetMenu items, activeFacet, revealStep, onHover>` | Left-side vertical-stacked menu (480px wide) with mono-uppercase header + copper rule + clickable items. Each item: LucideIcon + uppercase mono title + italic serif essence. Step-reveal cascade per item. Hover sets `activeFacet`. Border + bg shift on hover (copper-200 / copper-800 + rgba copper bg). Mirrors E.8 PitfallList structure. | F.2, F.3, F.4, F.5, F.6, F.7 |
| `<DetailCanvas activeFacet, defaultState, states>` | Right-side detail pane (660px wide) that swaps content via CSS opacity crossfade based on `activeFacet`. Default state shown when no facet hovered. Each state is a self-contained illustration component. | F.2, F.3, F.4, F.5, F.6, F.7 |
| `<BridgeArtifact mode>` | Silver-platter illustration (`mode ∈ {default, vector, graph, file, hybrid}`). Default = file/.md state (LLM Wiki canonical). Other modes morph platter content via CSS opacity + scale. Uses dot-grid (vector), node-edge graph (graph), .md file stack (file), keyword-highlights + dot-grid (hybrid). | F.2 (right canvas), F.1 (dim half) |
| `<RAGTypesCarousel activeType>` | Wraps `<BridgeArtifact>` with cycling step-reveal advance. Hover bypasses cycle and locks to hovered type. | F.2 (when ◉ THE TYPES facet active) |
| `<LayerCake layers, ribbon, lit, mode>` | Layer-cake illustration. `layers` = ordered list (default: `[CLAUDE.md, HOOKS, SKILLS, AGENTS]`). `ribbon` = boolean (copper PLUGIN wrapper). `lit` = list of layer names highlighted in copper. `mode ∈ {compact, exploded, enriched}`: compact = stacked tight; exploded = layers spread vertically with labels; enriched = 8-layer extended stack for F.8. Layer assembly is bottom-up via CSS translateY + opacity stagger (250ms each). | F.1 (dim, compact), F.3 (compact + ribbon), F.4–F.7 (compact, lit progressively), F.8 (enriched) |
| `<MCPConnectors logos, on>` | External MCP server connector dots (Notion / GitHub / Slack / GDrive / Mongo / etc.) with thin lines connecting to the layer cake's right side. Used as cake adjunct in F.3, F.5. | F.3, F.5 |
| `<SkillProgressiveDisclosure level>` | Three-level disclosure visual. `level ∈ {1, 2, 3, all}`. Level 1 = METADATA (copper-700, "always loaded", ~100 tokens). Level 2 = INSTRUCTIONS (copper-500, "when triggered", <5K tokens). Level 3 = RESOURCES (copper-200, "as needed", unlimited). Each level is a horizontal bar with icon, label, % heading, badge, and detail row. Bottom callout: "LEAN CONTEXT + RICH KNOWLEDGE — Model-invoked: Claude uses skills when relevant". | F.4 (default canvas) |
| `<MCPCompare highlight>` | Three-column compare (API · MCP · CLI). Each column has icon + name + tradeoff bullets. `highlight = "MCP"` puts copper star ★ + underline on MCP column. Hover any column → click-to-expand modal with detailed tradeoff breakdown. | F.5 (when ◉ API vs MCP vs CLI facet active) |
| `<HookColumn type, illustration, tagline>` | Single column for Hooks slide. `type ∈ {SessionStart, PostToolUse, Stop}`. Shows hook name + sketch-style illustration + 1-line tagline below. Three composed in a row form the canonical "unsexy work" view. | F.6 (default canvas) |
| `<OrchestrationPattern variant, on, animateOnReveal>` | Self-contained `<svg>` micro-diagram (~280×180px). `variant ∈ {centralized, decentralized, chain, parallel}`. Node circles fade in via CSS opacity; connection arrows animate via `stroke-dashoffset` (200ms each). Per-variant motion: centralized = round-trip pulses from planner top; decentralized = bidirectional pulses across mesh; chain = sequential pulse left-to-right; parallel = synchronized burst from planner top, fan-out to workers, fan-in to merge. Hover any pattern → DetailCanvas swaps to zoomed pattern with timing/dataflow callouts. | F.7 (default 2×2 grid; hover triggers zoom) |
| `<AgenticOSStack layers, lit, animateAssembly>` | Coronation slide enriched stack. `layers` = full 9-element list (CLAUDE.md → TOOLS · PEOPLE · DATA · HOOKS · SKILLS · AGENTS · HUMAN-IN-LOOP · ORCHESTRATION). `animateAssembly` = bottom-up build with 250ms per-layer stagger. Each layer hoverable with popover. | F.8 |
| `<OutputCard kind, on>` | User-facing output card. `kind ∈ {daily-digest, tasks, schedule, memories}`. Displays icon + title + 1-line subtitle. Fades in as a unit (CSS group). Connection lines from cake to card use clip-path inset-draw. | F.8 |
| `<FacetStrip items, activeStep>` | Horizontal mono-uppercase facet strip (top of slide) used as F.8 step-reveal scaffold instead of left-menu. Each facet underlined in copper as it activates. | F.8 only |

### 3.3 Motion timing reference

- **Reveal cascade per item**: 120ms initial + (i × 90ms) stagger — matches E.8 pattern.
- **Layer-cake assembly**: 250ms per layer translateY(20px → 0) + opacity 0 → 1.
- **Canvas crossfade**: 700ms CSS opacity crossfade between right-canvas states (matches platter content morph in F.2).
- **Connection arrow draw**: 200ms `stroke-dashoffset` per arrow, sequential in orchestration patterns.
- **Easing**: All transitions use `var(--ease) = cubic-bezier(0.16, 1, 0.3, 1)` — section-wide.

## 4. F.1 — TWO PILLARS (opener)

### 4.1 Purpose
Open Section F by introducing the two-pillar map (knowledge × capability) without committing to either. Audience leaves F.1 knowing the section's shape: what AI knows × what AI does, with two flagship visuals previewed.

### 4.2 Layout
1280×720 stage, centered title block above two equal-width visual panels.

```
─ FIG. F.1 · TWO PILLARS ────────────────────────────────────────
  (top-left, mono uppercase, copper-300)

         Two Pillars                           (display, 64px)
         ───                                   (copper rule, 40% width)
         what AI knows · what AI does         (italic serif, copper-200)

  ┌──── 480 ────┐         ┌──── 480 ────┐
  │  KNOWLEDGE  │  ◯←→◯   │ CAPABILITY  │     (mono uppercase labels above)
  │             │         │             │
  │  bridge-    │         │  layer cake │     (illustrations, dim 0.15→0.4)
  │  artifact   │         │             │
  │  (mono dim) │         │  (mono dim) │
  │             │         │             │
  │ AI gets to  │         │ AI gets to  │     (italic serif, copper-200)
  │ facts       │         │ act         │
  └─────────────┘         └─────────────┘
```

### 4.3 Steps (4 reveals)

| Step | Beat |
|------|------|
| 0 | Title + subtitle visible; both pillars present at low opacity (0.15) |
| 1 | LEFT pillar (KNOWLEDGE) brightens to 0.4; copper underline animates 0→100% on label; tagline fades in |
| 2 | RIGHT pillar (CAPABILITY) brightens to 0.4; copper underline; tagline fades in |
| 3 | Faint copper connecting lines (◯←→◯) animate between the two pillar centers |

### 4.4 Hover
- Hover LEFT pillar → small tooltip "F.2 · grounding"
- Hover RIGHT pillar → small tooltip "F.3 – F.7 · the package"

### 4.5 Canonical pose
**3** — both pillars labeled, lines visible, before deep-dive begins.

### 4.6 Dependencies
- `<BridgeArtifact mode="default">` — dim, mono-rendered
- `<LayerCake mode="compact" lit={[]}>` — dim, mono-rendered
- `<Reveal>`, `<CopperRule>`

## 5. F.2 — GROUND TRUTH (RAG)

### 5.1 Purpose
Teach RAG as the *bridge artifact* between raw data and AI consumption. Audience leaves with: the silver-platter mental model, four RAG flavors (vector / graph / file / hybrid), the LLM Wiki as canonical file-based pattern, and "agents read summaries, not raw chaos" as the take-home phrase.

### 5.2 Layout — E.8-style split (480 / 660)

LEFT pane (`top: 156, left: 48, width: 480, bottom: 80`): facet menu.
RIGHT pane (`top: 156, right: 48, width: 660, bottom: 80`): bridge-artifact canvas.

### 5.3 Slide headline (top, full width above panes)
`RAG · Grounding in your facts` (display 40px) + section header above facet menu: `FIVE FACETS · RAG` (mono caps, copper-300).

### 5.4 Left facet menu

| # | Facet | Essence (italic serif) |
|---|-------|------------------------|
| 1 | **WHAT IT IS** | a fact-checker reading the actual manual |
| 2 | **HOW IT WORKS** | retrieve → augment → generate |
| 3 | **THE TYPES** | vector · graph · file · hybrid |
| 4 | **WHEN TO REACH** | large data, fact-sensitive, fresh |
| 5 | **EXAMPLE** | "answer from the company handbook" |

Footer (italic, copper-200): *"agents read summaries, not raw chaos"*.

### 5.5 Right canvas states

Default (and `WHAT IT IS` hover): bridge-artifact in **file/.md state** (LLM Wiki canonical) — chaotic data on left (csv/xlsx/pdf/docx with squiggles), silver platter middle holds 4 .md files (`weekly_report.md`, `meeting_notes.md`, `inbox_summary.md`, `decisions.md`), agents on right (🔍 🤖 ⚙️).

Per-facet hover swaps:
- **HOW IT WORKS**: 3-step pipe diagram — Retrieval (search bar + top-K docs) → Augmentation (docs into context) → Generation (Claude composes answer)
- **THE TYPES**: `<RAGTypesCarousel>` cycles vector → graph → file → hybrid; mini-label updates per state. Active type lights up copper.
- **WHEN TO REACH**: 4-row matrix: scenario × RAG-fits / long-context-fits / either; cells show ✓ or — in copper.
- **EXAMPLE**: "answer from the company handbook" — query bar, retrieved snippets shown, Claude's grounded answer below with citation links.

### 5.6 Steps (6 reveals)
0: title + facet header + copper rule visible; facet items hidden; canvas at 0.5 opacity (dim default).
1–5: facet items 1–5 reveal cascade (120ms + i×90ms).
6: footer italic reveals.

### 5.7 Hover behavior
After step 5, hovering any facet item:
- Card border shifts to copper-200, bg to rgba(184,110,61,0.06)
- Right canvas crossfades (700ms) to the matching state
- Mouse-leave → canvas crossfades back to default

### 5.8 Canonical pose
**5** — all facets revealed, canvas in default file/LLM-Wiki state.

### 5.9 Dependencies
- `<FacetMenu items={fivefacets}>`, `<DetailCanvas>`
- `<BridgeArtifact mode="default|vector|graph|file|hybrid">`
- `<RAGTypesCarousel>` (extends BridgeArtifact)

## 6. F.3 — THE PACKAGE (Plugins overview)

### 6.1 Purpose
Introduce Plugins as the umbrella that bundles Skills + MCP + Hooks + Sub-agents. Audience leaves understanding: a plugin is a folder; you install once, distribute, version, update, and the cake assembled here previews F.4–F.7 deep dives.

### 6.2 Slide headline
`Plugins · The expertise package` (display 40px) + facet header: `FIVE FACETS · PLUGIN`.

### 6.3 Left facet menu

| # | Facet | Essence |
|---|-------|---------|
| 1 | **WHAT IT IS** | your expertise, in a folder anyone can install |
| 2 | **WHAT'S INSIDE** | Skills · Hooks · MCP · Sub-agents · CLAUDE.md |
| 3 | **WHY PACKAGE** | install once, distribute, version, update everywhere |
| 4 | **HOW IT LOADS** | discover → load → context-budget |
| 5 | **EXAMPLE** | a "weekly-report" plugin shipped to the team |

Footer: *"expertise, packaged"*.

### 6.4 Right canvas states

Default (and `WHAT IT IS` hover): layer cake compact (4 layers: CLAUDE.md → HOOKS → SKILLS → AGENTS) wrapped in copper "PLUGIN" ribbon, with 5 MCP connector dots fanning to the right (Notion · GitHub · Slack · GDrive · Mongo).

Per-facet hover swaps:
- **WHAT'S INSIDE**: cake exploded vertically; each layer separated with a label arrow pointing to forward-pointer ("F.4", "F.5", "F.6", "F.7")
- **WHY PACKAGE**: install diagram — single SKILL.md folder → distributed to 50 user laptops via single command (`plugins install …`)
- **HOW IT LOADS**: 3-step flow — discover (Claude scans `~/.claude/plugins/`) → load (per-session metadata only) → context-budget (instructions on demand). Tiny token-counter widget visualizes load-only-what's-needed.
- **EXAMPLE**: file tree of `weekly-report-plugin/` folder showing SKILL.md + hooks/ + mcp_servers.json + agents/

### 6.5 Steps (6 reveals)
0: title + facet header visible; default canvas dim
1–5: facet items 1–5 cascade
6: footer reveals; default canvas brightens; cake assembly animation auto-plays bottom→top (CLAUDE.md → HOOKS → SKILLS → AGENTS, 250ms each); ribbon wraps; MCP connectors fan in

### 6.6 Hover
Same pattern as F.2 — facet hover swaps right canvas; mouse-leave returns to default.

### 6.7 Canonical pose
**6** — full cake + ribbon + MCP connectors + all facets revealed.

### 6.8 Dependencies
- `<FacetMenu>`, `<DetailCanvas>`
- `<LayerCake mode="compact" ribbon={true} lit={[]}>` for default
- `<LayerCake mode="exploded">` for WHAT'S INSIDE state
- `<MCPConnectors>`

## 7. F.4 — WRITE ONCE (Skills, with progressive disclosure)

### 7.1 Purpose
Teach Skills as packaged expertise that uses **progressive disclosure** to stay context-efficient. Audience leaves with the 3-level mental model (METADATA / INSTRUCTIONS / RESOURCES), the "lean context, rich knowledge" payoff, and SKILL.md as the canonical artifact.

### 7.2 Slide headline
`Skills · Write expertise once` (display 40px) + facet header: `FIVE FACETS · SKILLS`.

### 7.3 Left facet menu

| # | Facet | Essence |
|---|-------|---------|
| 1 | **WHAT IT IS** | a job description Claude follows perfectly |
| 2 | **PROGRESSIVE DISCLOSURE** | metadata first, instructions when triggered, resources as needed |
| 3 | **HOW CLAUDE PICKS** | model-invoked, name + description match user intent |
| 4 | **LEAN CONTEXT, RICH KNOWLEDGE** | the payoff: context budget protected, expertise unlimited |
| 5 | **EXAMPLE** | a "weekly-report-author" skill |

Footer: *"write once. update once. everyone gets the new standard."*

### 7.4 Right canvas — progressive disclosure flagship

Default canvas = **3-level disclosure visual** (the slide's flagship — mirrors the user-supplied reference image, copper-monochromatic).

```
PROGRESSIVE DISCLOSURE
Load only what's needed, when it's needed

┌─ METADATA · LEVEL 1 · 30% · always loaded ──────┐  (copper-700)
│ ⓘ ~100 tokens                                    │
│ name + description (YAML frontmatter)            │
└──────────────────────────────────────────────────┘
                    ↓ when triggered
┌─ INSTRUCTIONS · LEVEL 2 · 55% · when triggered ─┐  (copper-500)
│ ⓘ <5K tokens                                     │
│ SKILL.md content loaded                          │
└──────────────────────────────────────────────────┘
                    ↓ as needed
┌─ RESOURCES · LEVEL 3 · 80% · as needed ─────────┐  (copper-200)
│ ⓘ unlimited                                      │
│ Reference files, scripts, examples               │
└──────────────────────────────────────────────────┘

──────────────────────────────────────────────────
LEAN CONTEXT + RICH KNOWLEDGE
Model-invoked: Claude uses skills when relevant
```

Three levels = three copper stops on same hue: copper-700, copper-500, copper-200. NOT teal/green/orange (deck is single-hue copper).

Per-facet hover swaps:
- **WHAT IT IS**: SKILL.md preview — typewriter-reveals first ~10 lines of `weekly-report-author/SKILL.md`. Click → modal expands to full SKILL.md content.
- **PROGRESSIVE DISCLOSURE**: default canvas (above)
- **HOW CLAUDE PICKS**: a user query bar at top, Claude's matching-engine dropdown showing 3 skills with match-score (top match in copper)
- **LEAN CONTEXT, RICH KNOWLEDGE**: token-budget visualization — context window pie with "skill metadata = 0.5%" + "active skill content = 4%" + "rest = available context"
- **EXAMPLE**: SKILL.md L1/L2/L3 breakdown for `weekly-report-author`:
  - L1: `name: weekly-report-author / description: drafts weekly status reports from project notes`
  - L2: full SKILL.md (role: senior PM, sections: progress / blockers / next-week, tone: factual)
  - L3: `examples/2026-Q1-weekly-template.md`, `examples/escalation-template.md`

### 7.5 Steps (7 reveals)
0: title + facet header visible; canvas at default but only L1 visible (METADATA only)
1: facet 1 reveals; L2 fades in canvas
2: facet 2 reveals; L3 + LEAN CONTEXT callout fade in canvas
3: facet 3 reveals
4: facet 4 reveals
5: facet 5 reveals
6: footer reveals

This staggers the disclosure-visual building alongside the facet menu — audience sees the progressive disclosure ladder build in tandem with the conceptual menu, reinforcing the model.

### 7.6 Hover behavior
After step 5, normal facet hover → canvas swap. WHAT IT IS hover → SKILL.md preview supports click-modal expansion (E.4 pattern).

### 7.7 Canonical pose
**5** — all 3 disclosure levels visible + LEAN CONTEXT callout + all facets revealed.

### 7.8 Dependencies
- `<FacetMenu>`, `<DetailCanvas>`
- `<SkillProgressiveDisclosure level="all">` (default canvas)
- `<Typewriter>` (WHAT IT IS state)
- Click-modal primitive (reused from E.4)

## 8. F.5 — THE ADAPTER (MCP)

### 8.1 Purpose
Teach MCP as the universal connector ("USB for AI"). Audience leaves understanding: MCP is a single protocol that connects Claude to data and tools, it serves *both* pillars (knowledge-side and capability-side), and it sits between rigid APIs and free-form CLIs as the portable middle ground.

### 8.2 Slide headline
`MCP · The universal adapter` (display 40px) + facet header: `FIVE FACETS · MCP`.

### 8.3 Left facet menu

| # | Facet | Essence |
|---|-------|---------|
| 1 | **WHAT IT IS** | USB for AI |
| 2 | **DUAL ROLE** | data side · tool side · same protocol |
| 3 | **API vs MCP vs CLI** | three ways AI talks to your systems |
| 4 | **WHAT MCP EXPOSES** | resources · tools · prompts |
| 5 | **EXAMPLE** | "summarize my inbox at 5pm daily" |

Footer: *"one protocol, two pillars"*.

### 8.4 Right canvas states

Default (and `WHAT IT IS` hover): USB-analogy flow.
```
"USB for AI"

[USB icon] ──► [Claude] ──► ┌─Calendar─┐ ┌─DB─┐ ┌─Files─┐
                            ┌─Email────┐ ┌─Slack─┐ ┌─...─┐
```

Per-facet hover swaps:
- **DUAL ROLE**: split visual — LEFT half labeled "knowledge connectors" (Confluence, GDrive, company DB icons) ; RIGHT half labeled "tool connectors" (send-email, update-sheet, post-message icons). Center: shared MCP protocol.
- **API vs MCP vs CLI**: `<MCPCompare highlight="MCP">` — 3 columns. API = rigid contract / devs lift each one. MCP = standard / portable / install once (★ copper star + underline). CLI = flexible / powerful / but local. Below MCP column: italic *"best for AI agents"*.
- **WHAT MCP EXPOSES**: 3 cards (Resources / Tools / Prompts). Resources = "data + context (documents, meeting notes, records)". Tools = "functions the AI can call (send email, update sheet, fetch report)". Prompts = "templated workflows".
- **EXAMPLE**: "summarize my inbox at 5pm daily" — Claude's MCP-call sequence visualized: Email-MCP fetch → filter (last 24hr) → summarize via Skill → return to user. 4-step animated arrow flow.

### 8.5 Steps (6 reveals)
0: title + facet header visible; default canvas dim
1–5: facet items cascade
6: footer reveals; default canvas brightens

### 8.6 Hover
After step 5, facet hover → canvas swap. The `API vs MCP vs CLI` state supports per-column click-modal: click any of API / MCP / CLI columns → modal opens with detailed tradeoff bullets (rigidity, portability, security, dev-effort, runtime-cost).

### 8.7 Canonical pose
**5** — all facets revealed, canvas in DUAL ROLE state (most teaching-loaded — explains why MCP serves both pillars; resolves the umbrella tension).

### 8.8 Dependencies
- `<FacetMenu>`, `<DetailCanvas>`
- `<MCPCompare highlight="MCP">`
- Click-modal primitive

## 9. F.6 — THE UNSEXY WORK (Hooks)

### 9.1 Purpose
Teach Hooks as event-driven reflexes that handle infrastructure work. Audience leaves with the 3-column "Three hooks doing the unsexy work" mental model (per the user-supplied illustration), the lifecycle event map, and "AI quietly doing its homework" as the take-home phrase.

### 9.2 Slide headline
`Hooks · Doing the unsexy work` (display 40px) + facet header: `FOUR FACETS · HOOKS`.

### 9.3 Left facet menu

| # | Facet | Essence |
|---|-------|---------|
| 1 | **WHAT IT IS** | reflexes on events |
| 2 | **LIFECYCLE EVENTS** | SessionStart · PreToolUse · PostToolUse · Stop · etc. |
| 3 | **THREE HOOKS DOING THE UNSEXY WORK** | the canonical 3-column |
| 4 | **EXAMPLE** | auto-audit on every weekly-report save |

Footer: *"reflexes on events. AI quietly doing its homework."*

Note: 4 facets (not 5) since the 3-column visual is dense and STRUCTURE/TYPES is fused with THREE HOOKS DOING THE UNSEXY WORK.

### 9.4 Right canvas states

Default (and `THREE HOOKS DOING THE UNSEXY WORK` hover): the 3-column canonical visual (per user's reference image).

```
─── Three hooks doing the unsexy work ───

┌─ COL 1 · SessionStart ─┐ ┌─ COL 2 · PostToolUse ─┐ ┌─ COL 3 · Stop ─┐
│                         │ │   Edit | Write        │ │                 │
│  [hand drops PDF/DOCX/  │ │                       │ │  [owl 🦉 with   │
│   XLSX into bucket]     │ │  [clipboard with      │ │   thought:      │
│         ↓               │ │   audit log lines]    │ │   "wait — did   │
│  [.md  .md  .md]        │ │                       │ │   anyone ack    │
│                         │ │                       │ │   the report?"] │
│                         │ │                       │ │                 │
│  auto-convert what      │ │  every action         │ │  human gate     │
│  Claude can't read      │ │  recorded             │ │  at session end │
└─────────────────────────┘ └───────────────────────┘ └─────────────────┘
```

Per-facet hover swaps:
- **WHAT IT IS**: simple analogy diagram — event icon (bell) → reflex action (✓ check or transform). 3 example pairs.
- **LIFECYCLE EVENTS**: full session timeline strip — session start → ... → tool use cycles ... → session end. ~8 events labeled along the timeline. Speaker can show breadth without dwelling.
- **THREE HOOKS DOING THE UNSEXY WORK**: the canonical 3-column (default state above)
- **EXAMPLE**: auto-audit workflow diagram — user saves weekly-report.md → PostToolUse hook fires → audit-script runs → adds compliance-check timestamp to file. Generic knowledge-work scenario, no mining.

### 9.5 Steps (5 reveals)
0: title + facet header visible; default 3-column canvas at 0.5 opacity
1–4: facet items 1–4 cascade
5: footer reveals; default canvas brightens; 3 columns assemble left-to-right (300ms stagger)

### 9.6 Hover
After step 4, facet hover → canvas swap.

### 9.7 Canonical pose
**4** — all facets revealed, default 3-column canvas at full state.

### 9.8 Dependencies
- `<FacetMenu>`, `<DetailCanvas>`
- `<HookColumn type="SessionStart|PostToolUse|Stop">` × 3

## 10. F.7 — SPECIALISTS (Sub-agents + orchestration)

### 10.1 Purpose
Teach sub-agents and the four orchestration patterns. Audience leaves understanding: specialists outperform generalists, four standard composition patterns exist (centralized · decentralized · chain · parallel), and the planner agent picks the right pattern per task.

### 10.2 Slide headline
`Sub-agents · Specialist departments` (display 40px) + facet header: `FIVE FACETS · AGENTS`.

### 10.3 Left facet menu

| # | Facet | Essence |
|---|-------|---------|
| 1 | **WHAT IT IS** | specialists, not generalists |
| 2 | **HOW SUB-AGENTS WORK** | isolated context · specific role · own permissions |
| 3 | **ORCHESTRATION PATTERNS** | centralized · decentralized · chain · parallel |
| 4 | **WHEN TO USE WHICH** | tradeoff matrix |
| 5 | **EXAMPLE** | a "monthly board pack" multi-agent workflow |

Footer: *"the planner picks the pattern"*.

### 10.4 Right canvas states

Default (and `ORCHESTRATION PATTERNS` hover): 2×2 grid of 4 patterns. Each pattern is a self-contained `<svg>` micro-diagram.

```
┌─ CENTRALIZED ──────┐    ┌─ DECENTRALIZED ────┐
│       [P]          │    │   [A]──[B]         │
│      ╱ │ ╲         │    │    │  X │          │
│   [a][b][c]        │    │   [C]──[D]         │
│   planner top      │    │   peer mesh        │
└────────────────────┘    └────────────────────┘
┌─ CHAIN ────────────┐    ┌─ PARALLEL ─────────┐
│  [A] → [B] → [C]   │    │       [P]          │
│   sequential       │    │      ╱ │ ╲         │
│                    │    │   [a][b][c]        │
│                    │    │      ╲ │ ╱         │
│                    │    │       [P]          │
│                    │    │   fan-out / merge  │
└────────────────────┘    └────────────────────┘
```

Per-pattern motion (auto-plays when revealed; loops subtly during hover):
- **Centralized**: planner pulses copper, then sequential round-trip pulses to each worker (planner → a → planner → b → planner → c → planner)
- **Decentralized**: bidirectional pulses across mesh edges (peer-to-peer)
- **Chain**: single sequential pulse left-to-right A → B → C, no return
- **Parallel**: planner pulses, three simultaneous fan-out pulses, three simultaneous fan-in pulses to merge

Per-facet hover swaps:
- **WHAT IT IS**: visual analogy — one generalist worker overloaded vs. team of 4 specialists each doing one job efficiently
- **HOW SUB-AGENTS WORK**: anatomy of a sub-agent — isolated context box, role label, permission scope, return value
- **ORCHESTRATION PATTERNS**: default 2×2 (above). Hover any individual pattern in the grid → DetailCanvas zooms to that pattern with timing/dataflow callouts.
- **WHEN TO USE WHICH**: 4-row tradeoff matrix (rows: pattern; columns: latency, accountability, parallelism-gain, complexity)
- **EXAMPLE**: "monthly board pack" workflow — planner agent splits into: financials-agent, milestones-agent, risks-agent, summary-agent → parallel pattern → planner merges → reviewer agent checks → output. Generic, knowledge-work-universal.

### 10.5 Steps (6 reveals)
0: title + facet header visible; default 2×2 grid at 0.5 opacity
1–5: facet items 1–5 cascade
6: footer reveals; 2×2 grid brightens; each pattern's motion auto-plays in 400ms stagger

### 10.6 Hover
After step 5, facet hover → canvas swap. ORCHESTRATION PATTERNS state additionally supports hovering any individual pattern card to zoom-and-detail.

### 10.7 Canonical pose
**5** — all facets revealed, 2×2 grid at full state.

### 10.8 Dependencies
- `<FacetMenu>`, `<DetailCanvas>`
- `<OrchestrationPattern variant="centralized|decentralized|chain|parallel">` × 4

## 11. F.8 — YOUR AGENTIC OS (coronation)

### 11.1 Purpose
Synthesize Section F into the audience's *personal Agentic OS* — a portable system they own. Audience leaves understanding: this is yours, you carry it wherever you go, and the components covered in F.2–F.7 plus surrounding pieces (memories, people, data, human-in-loop) compose into a daily-use stack with user-facing outputs (digest, tasks, schedule, memories).

This is the section's structural payoff and the highest-value teaching moment. It pre-figures Section J (adoption — INDIVIDUAL track) and Section I (Hook 2 reveal — Adri's own Agentic OS). The closing tagline carries the deck's most-loaded private context (per parent meta-spec §2 — AI as portable adaptability).

### 11.2 Slide headline
`Your Agentic OS` (display 56px, copper-200) + horizontal facet strip below.

### 11.3 Layout — full-stage (NOT 480/660 split)

This slide breaks the standard split because the synthesis visual needs the full stage.

```
─ FIG. F.8 · YOUR AGENTIC OS ────────────────────────────────────

  Your Agentic OS                    (display 56px)

  COMPONENTS · OUTPUTS · PORTABLE · BUILD INCREMENTAL    (mono caps)
  ──── copper rule ────                                  (40% width)

  [LEFT half: enriched stack]      [RIGHT half: outputs]

  ╔═══════════════════════════╗   ┌─ DAILY DIGEST ─┐
  ║ ORCHESTRATION             ║   │ today's brief  │
  ╠═══════════════════════════╣──►└────────────────┘
  ║ HUMAN IN LOOP             ║   ┌─ TASKS ────────┐
  ╠═══════════════════════════╣──►│ from email +   │
  ║ AGENTS                    ║   │ chats          │
  ╠═══════════════════════════╣   └────────────────┘
  ║ SKILLS                    ║   ┌─ SCHEDULE ─────┐
  ╠═══════════════════════════╣──►│ calendar synced│
  ║ HOOKS                     ║   └────────────────┘
  ╠═══════════════════════════╣   ┌─ MEMORIES ─────┐
  ║ DATA                      ║──►│ never re-      │
  ╠═══════════════════════════╣   │ explain        │
  ║ PEOPLE                    ║   └────────────────┘
  ╠═══════════════════════════╣
  ║ TOOLS (MCP)               ║
  ╠═══════════════════════════╣
  ║ CLAUDE.md                 ║◄ foundation
  ╚═══════════════════════════╝

  "this is yours — wherever you go, you carry it."  (italic, copper-200)
```

### 11.4 Stack layers (LEFT, bottom-to-top, 9 layers)

| Layer | Caption (mono) | Hover popover (~6 lines) |
|-------|---------------|---------------------------|
| CLAUDE.md | the foundation | "your default instructions, persona, tone preferences. Loaded on every session." |
| TOOLS (MCP) | your connections | "live links to Gmail, calendar, files, knowledge base. AI can read and act safely." |
| PEOPLE | your context | "your role, your team, your escalation chain — so AI knows who matters." |
| DATA | your sources | "your owned documents, reports, notes — RAG-grounding for accuracy." |
| HOOKS | your reflexes | "auto-checks at every save, audit logs, human gates at session end." |
| SKILLS | your playbooks | "packaged expertise: a skill per task you do repeatedly." |
| AGENTS | your specialists | "sub-agents trained on specific roles — finance, scheduling, drafting." |
| HUMAN IN LOOP | your approval gates | "for high-stakes decisions, AI proposes, you decide. Always." |
| ORCHESTRATION | your conductor | "the pattern binding agents together — centralized, parallel, etc." |

### 11.5 Output cards (RIGHT, 4 cards)

| Card | Title | Subtitle | Hover popover |
|------|-------|----------|----------------|
| DAILY DIGEST | today's brief | one-page summary of inbox + calendar + open tasks | "5am: 'today: 2 docs to review, 3 meetings, weather, news bullets'" |
| TASKS | from email + chats | extracted action items, ranked by urgency | "from your inbox: 'reply to Pak A re: Q2 budget review'" |
| SCHEDULE | calendar synced | proposed shifts, conflicts flagged | "11:00 conflict: budget review vs. team 1:1 — propose reschedule?" |
| MEMORIES | never re-explain | persistent context across sessions | "remembers: your tone preferences, frequent contacts, recurring projects" |

### 11.6 Steps (~13 reveals — section's longest slide)

| Step | Beat |
|------|------|
| 0 | Title + facet strip + copper rule visible; stack and outputs both empty |
| 1 | Facet strip · "COMPONENTS" lights up copper underline; CLAUDE.md foundation appears at base |
| 2 | TOOLS (MCP) layer slides in (translateY 20px → 0 + opacity) |
| 3 | PEOPLE layer slides in |
| 4 | DATA layer slides in |
| 5 | HOOKS layer slides in |
| 6 | SKILLS layer slides in |
| 7 | AGENTS layer slides in |
| 8 | HUMAN IN LOOP layer slides in |
| 9 | ORCHESTRATION layer slides in (full cake assembled) |
| 10 | Facet strip · "OUTPUTS" lights up; 4 output cards fade in as a group |
| 11 | Connection lines from cake to output cards draw in (clip-path inset, 600ms total) |
| 12 | Facet strip · "PORTABLE" lights up; closing italic tagline reveals: *"this is yours — wherever you go, you carry it."* |

(Optional 13: Facet strip · "BUILD INCREMENTAL" lights up — speaker improvises a 1-line nod that this is built progressively, not all at once. Used to soft-bridge into Section J.)

Pacing: ~3–5 minutes on this slide. Speaker pauses on each layer addition. Audience watches their potential AI stack assemble in front of them.

### 11.7 Hover behavior
After step 12, every stack layer + every output card supports hover popover with the captions in §11.4 / §11.5. No click-modal here — popovers are sufficient depth.

### 11.8 Canonical pose
**12** — full stack + outputs + connections + tagline visible.

### 11.9 Dependencies
- `<AgenticOSStack layers={9layers} animateAssembly>`
- `<OutputCard kind="daily-digest|tasks|schedule|memories">` × 4
- `<FacetStrip items={[COMPONENTS, OUTPUTS, PORTABLE, BUILD INCREMENTAL]}>`
- `<HoverPopover>` per layer/card
- Connection-line draw primitive (CSS clip-path inset)

### 11.10 Cross-section references
- F.8 closing line "*this is yours — wherever you go, you carry it.*" appears EXACTLY ONCE in the deck. Section C (mindset) and Section J (adoption) may echo the *theme* but MUST NOT repeat the *phrase*.
- F.8 stack visual will be referenced (verbally) in Section J: "build this incrementally — week 1 add a skill, month 1 add an agent…"
- F.8 stack visual will be referenced (visually) in Section I.3 if Adri's Hook 2 portfolio includes a personal-Agentic-OS demo.

## 12. F.9 — NEXT (bridge to G)

### 12.1 Purpose
Photographic exhale closing Section F. Mirrors E.11 / D.5 template: hero photo, copper-light vignette, headline + copper rule + subline.

### 12.2 Layout

Full-bleed hero photo. Bottom-left vignette-protected text block.

### 12.3 Hero photo prompt (for nanobanana MCP)
*"Pre-dawn light over a cinematic landscape, copper sun catching distant horizon, editorial-serious tone, no people, wide angle, single light source from horizon. 16:9. Suggests 'dawn of new tools.'"*

(Final prompt drafted at implementation; not in this spec per meta-spec §6.5 / §11.)

### 12.4 Steps (3 reveals)
0: photo + vignette only
1: headline reveals — *"Techniques covered."*
2: copper rule animates 0 → 40% width
3: subline reveals — *"Tools next."*

### 12.5 Hover
None.

### 12.6 Canonical pose
**3** — all reveals visible.

### 12.7 Dependencies
- `<HeroPhoto src vignetteSide="bottom-left">`
- `<DisplayPhrase>`
- `<CopperRule>`

## 13. Cross-references

### 13.1 F vocabulary lock (for I.3 callbacks)

Section I.3 (Adri's portfolio simulations in Hook 2) will callback to Section F's vocabulary by name. The following phrases are LOCKED — they appear in I.3's content and must match exactly:

| F slide | Locked phrase | I.3 callback usage |
|---------|--------------|---------------------|
| F.2 | "RAG / grounding / fact-checker" | "this prototype uses RAG to ground answers in our SOP set" |
| F.3 | "plugin / the package" | "I packaged it as a plugin so the team can install in one command" |
| F.4 | "skill / SKILL.md" | "here's the skill — a single SKILL.md file" |
| F.5 | "MCP / the adapter / USB for AI" | "the MCP server lets Claude reach the calendar safely" |
| F.6 | "hooks / unsexy work" | "hooks do the unsexy work — auto-audit on every save" |
| F.7 | "sub-agents / specialists / orchestration patterns" | "the planner sub-agent uses the parallel pattern to dispatch four specialists" |
| F.8 | "Agentic OS" | (only verbal callback; never a slide-level repeat — the phrase is loaded) |

### 13.2 F dependency on E

| E vocabulary | F slide | Dependency |
|---|---|---|
| "harness" (E.1, E.9, E.10) | F.3, F.8 | F.8's enriched stack IS the named harness from E |
| "context engineering" (E.6, E.7) | F.2 | RAG is one strategy of E.7's "Select" beat |
| "anchor task: weekly project report" (E.2, E.6, E.7, E.9, E.10) | F.4 (EXAMPLE) | F.4's "weekly-report-author" skill is the natural extension of E's anchor task |

### 13.3 F preview of Section G

| F slide | G dependency |
|---|---|
| F.2 (file-based RAG / LLM Wiki) | G covers NotebookLM as the Google ecosystem implementation |
| F.5 (MCP) | G enumerates MCP servers (Notion / GDrive / Slack / etc.) per tool |
| F.7 (orchestration) | G mentions Anthropic Agent SDK, LangGraph, CrewAI |
| F.8 (Agentic OS) | G is implicitly "tools that fit into your Agentic OS" |
| F.9 (bridge) | direct hand-off to G.1 opener |

Section G should reference (verbally) F's vocabulary so attendees feel continuity, not repetition.

### 13.4 openClaw / Hermes Agent placement

Per `docs/researches/2026-05-11-emerging-techniques-and-tools.md`: NOT in F. Mentioned briefly in Section G under "wider open-source ecosystem" as ecosystem awareness, not teaching content. F treats them as out-of-scope.

## 14. Implementation phasing

This spec accepts a **2-plan implementation split** (matching Section E's plan-A / plan-B precedent):

- **Plan A** — substrate + flagship slides (F.1, F.2, F.3, F.8) — get the bookends + knowledge pillar + plugins umbrella visible end-to-end
- **Plan B** — capability deep-dives (F.4, F.5, F.6, F.7) + bridge (F.9) — fill in the umbrella's components

Plans drafted separately in `docs/plans/2026-05-12-…` series.

## 15. Open questions (resolved or deferred)

| Question | Resolution |
|---|---|
| Plugins as umbrella vs. parallel-to-MCP? | UMBRELLA — confirmed 2026-05-11 brainstorm |
| LLM Wiki — separate slide or RAG sub-state? | Sub-state in F.2 (canonical file-based example) — confirmed 2026-05-11 |
| Agentic OS — sub-beat in F.7 or own slide? | Own slide F.8, enriched coronation — confirmed 2026-05-11 |
| Progress micro-indicator across F.3–F.7? | Skipped — layer cake animates as the spine (no separate widget) — confirmed 2026-05-11 |
| Mining-specific examples in F? | NEVER — universal knowledge-work only — confirmed 2026-05-11 |
| F.1 opener subtitle — "what AI knows · what AI does" | LOCKED — confirmed 2026-05-11 |
| F.6 Hooks analogy — reflexes vs auto-checks vs guardrails? | "reflexes on events" (verbal); "the unsexy work" (slide chrome) — confirmed 2026-05-11 |
| Hero photo F.9 — final prompt | DEFERRED to implementation per meta-spec §6.5 |
| Final copper hex ladder for 3 disclosure-level stops on F.4 | DEFERRED to implementation projection-test per meta-spec §6.5 |

## 16. Acceptance — locked decisions

Approved by Adri (locked 2026-05-11). Downstream plan + implementation must consume this spec without re-litigating:

- **9 slides, ~50 logical advances** (F.1 opener · F.2 RAG · F.3 Plugins · F.4 Skills · F.5 MCP · F.6 Hooks · F.7 Sub-agents · F.8 Agentic OS · F.9 bridge)
- **Two-pillar architecture** (knowledge × capability) with capability as Plugins-umbrella
- **E.8-style left-menu/right-canvas** as primary layout for F.2–F.7
- **Standardized 5-facet menu** (with per-slide variations) — WHAT IT IS · HOW IT WORKS · STRUCTURE/TYPES · WHEN TO REACH · EXAMPLE
- **Two flagship visuals**: bridge-artifact (knowledge) + layer cake (capability), both previewed dim in F.1
- **F.4 Skills uses 3-level progressive disclosure** as flagship right canvas, copper-monochromatic (copper-700 / copper-500 / copper-200 stops)
- **F.8 Agentic OS coronation** — enriched 9-layer stack + 4 output cards + closing portability tagline
- **CSS-only motion** (Section E dialect, not Framer Motion)
- **Generic body examples** — universal knowledge-work scenarios only; never mining-specific
- **F.9 photographic exhale** mirrors E.11 / D.5 template

Next step: invoke `writing-plans` skill to produce the implementation plan(s) for Section F (likely split into Plan A — substrate + bookends, Plan B — capability deep dives).
