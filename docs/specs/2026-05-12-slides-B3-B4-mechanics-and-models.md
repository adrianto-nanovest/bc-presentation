# Slides B.3 & B.4 — Rework: Mechanics, Parameters, and Model Landscape Spec

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Draft 2026-05-12
**Supersedes:** Sections 4.2.3 (B.3) and 4.2.4 (B.4) of `docs/specs/2026-05-11-slides-opening-title-A-B-C.md`
**Research inputs:**
- `docs/researches/2026-05-11-foundation-model-landscape.md`
- `docs/researches/2026-05-12-llm-mechanics-and-parameters.md`
- `docs/researches/2026-06-08-llm-benchmarks-june-2026.md`
**Reference images:** `docs/examples/B3-how-llm-works.png` (pipeline structure), `docs/examples/section-A-B-C-current/B3.png` and `B4.png` (current implementations being replaced)

## 0. Scope

This spec replaces the existing B.3 and B.4 slide designs in the opening arc with a refocused pair:

- **B.3 (new) — *How LLMs work — the pipeline and its dials.*** Demystifies the LLM pipeline (tokenize → embed → attend → predict-and-sample) and presents six core parameters as small looping animations.
- **B.4 (new) — *Models by category — frontier vs open-weight.*** Walks through six categories of model competition with charts driven by Artificial Analysis benchmark data, ending in a heatmap summary.

In scope:
- Per-slide layout, content slots, animation choreography, step-reveal pacing, color & typography
- Component-level architecture (new and reused)
- Data sources and verify-before-delivery guidance
- Hover detail-layer behavior

Explicitly NOT in scope:
- Slides B.1, B.2, B.5 (unchanged from prior spec)
- Implementation plan and task breakdown (separate deliverable via `writing-plans` skill)
- Final hex ladder for copper accents (handled at implementation via projection testing)

## 1. Narrative continuity

B.3 and B.4 sit in the middle of the Section B arc (history → vocabulary → **mechanics** → **landscape** → today). The pair's job is to take an audience that just learned vocabulary in B.2 and give them enough mental model to (a) understand how an LLM generates text, (b) understand which knobs they can turn, and (c) know which models exist and how to choose between them.

**Two-slide arc:**
- **B.3 answers "how does this thing work, and how do I steer it?"** — pipeline + 6 parameter tiles. Footer caption sets up B.4 by promising that mechanics are universal but model choice matters.
- **B.4 answers "which model, for what?"** — left-rail category list + right-pane swap. Footer caption distills the open-weight-vs-frontier insight.

Both slides use a calm, single-composition layout with looping ambient animations rather than dense step-reveals. The audience reads each as one mental object.

## 2. Slide B.3 — How LLMs work — the pipeline and its dials

### 2.1 Identity

- **FIG label:** `— FIG. B.3 · HOW LLMs WORK — THE PIPELINE AND ITS DIALS`
- **Goal:** Show the audience how an LLM predicts text (top half) and the dials that change what it predicts (bottom half).
- **Surface:** dark (existing convention).
- **Step count:** 3 steps (mount-driven pipeline reveal + parameter tile reveal + footer caption fade).
- **Canonical pose:** Step 2 (footer caption visible; pipeline and tiles loop continuously).

### 2.2 Layout

1280×720 stage, single vertical composition, no horizontal divider. Three zones separated by whitespace:

- **Header strip** (top ~50px): FIG label, mono-caption caps, copper-500.
- **Pipeline zone** (~55% of body height, roughly 370px tall): always-looping pipeline illustration centered horizontally.
- **Parameter tiles zone** (~45% of body height, roughly 290px tall): 6 tiles in a single row, equal width (~190px each, 16px gap between tiles).
- **Footer caption** (~32px above bottom edge): closing line, italic.

No 1px copper rule between pipeline and tile zones — the spatial gap (~36px) carries the boundary alone.

### 2.3 Pipeline detail

**Example sentence:** *"The report needs to be …"* (universal knowledge-work phrasing; predicts a past-participle verb with a genuinely distributed set of high-probability completions).

**Four visible stages, rendered left to right with copper-700 arrow connectors:**

| Stage | Label | Visual | Animation contribution |
|---|---|---|---|
| 1 | TOKENIZE | 5 stroked boxes containing the tokens `The`, `report`, `needs`, `to`, `be` | Boxes light up sequentially (~600ms total) |
| 2 | EMBED | 5 diamond glyphs, one per token, arranged vertically in a column | Each box morphs into its diamond as it appears (~400ms total, staggered) |
| 3 | ATTEND | A rounded rectangle labeled `ATTEND` | SVG SMIL particles flow from each diamond into the rectangle along curved Bezier paths (D3-IPA-style, ~1200ms). The block emits a single "output vector" particle on its right edge after particles converge |
| 4 | PREDICT & SAMPLE | Vertical bar chart, 4 bars descending in height, labeled `completed`, `reviewed`, `submitted`, `finished`, with a trailing `…` mark | Bars rise into place (~500ms). A copper-300 highlight ring pulses top-down through the bars and settles on one (~700ms). The selected token's label briefly increases in weight. 800ms pause. Loop restarts. |

**Loop cycle:** ~4 seconds total. Selected token cycles each iteration (cycle 1 → `completed`, cycle 2 → `reviewed`, cycle 3 → `submitted`, cycle 4 → `finished`, then back to cycle 1). Over a 12-second observation Adri can say "see, the same input can produce different outputs — that's what the dials below control."

**Composition:** The pipeline lives in a horizontally centered band roughly 900px wide, leaving ~190px of margin on each side. Stages are separated by 32px gaps; arrow connectors are 1px copper-700 with small triangle terminators.

### 2.4 Parameter tiles

Six tiles in a single row, equal width (~190×260px). Each tile uses the existing D3-anim shell pattern:
- **Label** (mono-caption caps, 11px, copper-500) — top
- **Animation shell** (108px tall) — middle
- **Description** (Source Serif 4, 13px, neutral-200 with copper-300 italics on 1–2 keywords) — bottom

Tiles, in order left to right:

| # | Label | Animation loop | Description (copper-300 italic keywords *like_this*) |
|---|---|---|---|
| 1 | EFFORT | Three pulse rings of increasing intensity (low → med → high), cycling | "How long it *thinks* before answering. More effort = deeper reasoning, slower output." |
| 2 | MAX TOKENS | A horizontal bar fills left-to-right, then snaps short, then snaps long, looping | "Hard *ceiling* on output length. Stops mid-sentence if hit." |
| 3 | CONTEXT WINDOW | A stacked bar (input + output budget) where the input segment grows and shrinks while total stays fixed | "Total *memory* for one turn. Input + output share this budget." |
| 4 | TEMPERATURE | A bell curve sharpens (low temp) and flattens (high temp) on loop | "*Creativity* knob. Low = predictable. High = inventive." |
| 5 | TOP-P | A row of probability bars with a moving threshold line cutting off the tail | "Keeps only the *likely* candidates. Lowers wildness without going boring." |
| 6 | SYSTEM PROMPT | A small persistent box at top with cycling user messages below; the persistent box stays put | "Standing *rules*. What it should always remember." |

**Animation loops are always-on.** No step-reveal gating on the animations themselves — once a tile is mounted, its loop runs forever.

### 2.5 Step-reveal choreography

| Step | Trigger | What happens | Duration |
|---|---|---|---|
| Mount | Slide enters | FIG label fades in. Title area renders. Pipeline zone empty. Parameter tile zone empty. | 700ms |
| Step 0 | Space-press | Pipeline reveals: stages render left-to-right in a one-time build-up (~1.5s — tokens 600ms, embed morph 400ms, attend block + distribution 500ms). Loop starts immediately after, repeating every ~4s. | 1500ms initial build + continuous 4s loop |
| Step 1 | Space-press | 6 parameter tiles fade up in sequence with 80ms stagger. Each tile's animation loop starts immediately upon visible. | 600ms |
| Step 2 (canonical) | Space-press | Footer caption fades in italic with copper-300 keyword styling. | 500ms |

### 2.6 Footer caption

> *"The mechanics are universal. **Which model** — and how you tune it — is yours to choose."*

- **Typography:** Instrument Serif italic, 22px, neutral-200.
- **Keyword styling:** `mechanics` and `which model` in copper-300, italic, with an extra +1px letter-spacing for emphasis.
- **Position:** ~32px above bottom edge, horizontally centered.

### 2.7 Hover & detail layer

Each parameter tile has a hover state per the deck-wide convention:
- **Tile border:** copper-800 → copper-300 (transition 200ms ease-out)
- **Tile scale:** 1.0 → 1.06
- **Drop-shadow glow:** subtle copper-300 spread (8px blur, 30% opacity)
- **Detail-layer pop-card:** floating card anchored 8px below the hovered tile, copper-900 background with copper-700 border, ~280px wide. Contains:
  - API-level parameter name in mono (e.g., `reasoning_effort: "medium"` for EFFORT, `temperature: 0.7` for TEMPERATURE)
  - One-line technical note (e.g., for TOP-P: *"top-k is a related dial that limits how many candidates the model considers. Most APIs default to top-p; top-k is rarely tuned by non-engineers."*)

Hover state is mouse-driven (not step-driven). The detail-layer card does not displace surrounding tiles — it floats above them with z-index elevation.

### 2.8 Color and typography summary

- **Surface:** dark (existing dark background asset)
- **Pipeline accents:** copper-700 (strokes, arrows, bar fill)
- **Pipeline highlight ring:** copper-300 (the sampling indicator)
- **Parameter tile borders:** copper-800 (resting), copper-300 (hover)
- **Tile animations:** copper-700 (primary motion elements), copper-300 (highlight/secondary)
- **Token boxes:** 1px copper-800 stroke, neutral-200 text, Source Serif 4 body
- **Distribution bars:** copper-700 fill, with the selected bar pulsing to copper-300
- **FIG label:** mono-caption 11px copper-500
- **Body text on tiles:** Source Serif 4 13px neutral-200, copper-300 italic on keywords
- **Footer caption:** Instrument Serif italic 22px neutral-200, copper-300 on `mechanics` and `which model`

## 3. Slide B.4 — Models by category — frontier vs open-weight

### 3.1 Identity

- **FIG label:** `— FIG. B.4 · MODELS BY CATEGORY — FRONTIER vs OPEN-WEIGHT`
- **Goal:** Walk through six categories of model competition. Show where frontier dominates, where open-weight stays close, and where cost flips the story.
- **Surface:** dark (existing convention).
- **Step count:** 7 steps (6 category reveals + footer caption fade).
- **Canonical pose:** Step 6 (heatmap summary visible on right pane, footer caption + freshness date in footer band).

### 3.2 Layout

1280×720 stage, two columns:

- **Header strip** (top ~50px): FIG label, mono-caption caps, copper-500.
- **Left rail** (~35% width, ~445px wide × ~560px tall body): vertical stack of 6 category rows.
- **Right pane** (~65% width, ~835px wide × ~560px tall body): renders one of four layouts (R1 chart / R2 chips / R3 scatter / R4 heatmap) depending on active step.
- **Footer band** (~40px above bottom edge): caption left-aligned, freshness date right-aligned.

A faint 1px copper-900 hairline vertical rule may divide the left rail from the right pane (subtle, ~10% opacity); this is a styling refinement decided at implementation time.

### 3.3 Left rail — category list

Six category rows, vertically stacked with equal height (~90px each) plus 8px gaps. Each row has:

- **Bullet indicator** on the left (10px diameter): filled copper-300 dot when active; copper-800 1px ring (empty) when inactive
- **Category label** (Inter caps, neutral-200): 14px when inactive, 16px when active
- **Sub-label** (mono-caption, 10px copper-500): names the benchmark or framing for the active row; hidden when inactive
- **Active row accent:** 4px copper-700 left-border bar, full row height; absent when inactive

**Category order and labels:**

| # | Label | Sub-label (active only) | Right-pane layout |
|---|---|---|---|
| 1 | WRITE & REASON | AA Intelligence Index | R1 (benchmark chart) |
| 2 | CODE | SWE-bench Verified | R1 (benchmark chart) |
| 3 | AGENTIC | Tau-bench / Agentic | R1 (benchmark chart) |
| 4 | MULTIMODAL | MMMU | R1 (benchmark chart) |
| 5 | CREATIVE TOOLS | Different model class | R2 (chip cluster) |
| 6 | COST × INTELLIGENCE | Open-weight punchline | R3 (scatter) |

**Step 6 special case:** When the slide enters its canonical pose (step 6), the active highlight moves *off* any single row and instead all 6 rows render in a "summary mode" — the bullet indicators all turn copper-300 (no longer empty rings), and the right pane swaps to R4 (the heatmap summary). The visual reads as "we've covered all six; here's the recap."

### 3.4 Right pane — four layouts

#### R1 — Benchmark chart (used for steps 0–3: WRITE & REASON, CODE, AGENTIC, MULTIMODAL)

```
┌─────────────────────────────────────────┐
│  FRONTIER                               │
│   GPT-5.5      ▮▮▮▮▮▮▮▮▮▮▮▮▮▮  60     │
│   Opus 4.7    ▮▮▮▮▮▮▮▮▮▮▮▮▮   58     │
│   Gemini 3.1  ▮▮▮▮▮▮▮▮▮▮▮▮    56     │
│  ─────────────── 32px gap ─────────    │
│  OPEN-WEIGHT (best)                     │
│   Kimi K2.5   ▮▮▮▮▮▮▮▮▮▮▮     54     │
│   within 6 pts of leader                │
└─────────────────────────────────────────┘
```

- 4 horizontal bars, 28px tall each, 8px gap within group, 32px gap between FRONTIER group and OPEN-WEIGHT group
- **FRONTIER bars:** copper-700 fill, neutral-100 score label on right edge
- **OPEN-WEIGHT bar:** copper-300 fill (visually distinct from frontier), with italic tagline below in 11px Source Serif 4
- **Section labels** (FRONTIER / OPEN-WEIGHT): mono-caption 11px copper-500
- **Y-axis:** model names in Source Serif 4 16px, left-aligned, vertically centered to bars
- **X-axis:** implicit (bars are relative); raw scores displayed at bar end in mono 12px

#### R2 — Chip cluster (used for step 4: CREATIVE TOOLS)

```
┌─────────────────────────────────────────┐
│  DRAW                                   │
│   ▢ Flux 2 Pro   ▢ Midjourney v8       │
│                                         │
│  VIDEO                                  │
│   ▢ Veo 3.1   ▢ Kling 3.0   ▢ Runway   │
│                                         │
│  VOICE                                  │
│   ▢ ElevenLabs   ▢ Suno v5             │
│                                         │
│   Different model class — different     │
│   leaderboards. None of the named 8    │
│   above compete here.                   │
└─────────────────────────────────────────┘
```

- Three sub-labeled groups (DRAW, VIDEO, VOICE), stacked vertically with 24px gaps
- **Sub-labels:** mono-caption 11px copper-500
- **Chips:** copper-700 1px border, neutral-100 text, ~24px tall, padding 8px×12px, Inter 14px
- **Italic footnote** at bottom (Source Serif 4, 13px, copper-500): contextualizes why this category has no chart

#### R3 — Cost × Intelligence scatter (used for step 5)

```
┌─────────────────────────────────────────┐
│  ▲ Intelligence (AA Index)              │
│  │                                      │
│ 60│              ● GPT-5.5              │
│ 58│        ● Opus 4.7                   │
│ 56│   ● Gemini 3.1                      │
│ 54│       ◇ Kimi K2.5                   │
│ 53│     ● Grok 4.3                      │
│ 52│       ◇ DeepSeek V4                 │
│ 50│  ◇ Qwen   ◇ GLM                    │
│  │                                      │
│  └────────────────────────► Cost / M tok│
│   $1   $2   $3   $5   $8  $15          │
│                                         │
│   ● Frontier   ◇ Open-weight            │
└─────────────────────────────────────────┘
```

- Scatter plot, x-axis log-scaled cost per M tokens ($0.50–$15), y-axis AA Intelligence Index (50–62)
- **Frontier models:** filled copper-700 dots, ~10px diameter
- **Open-weight models:** hollow copper-300 diamonds, ~10px diameter
- Each point labeled with model name in Source Serif 4 12px, neutral-200, anchored 8px to the right
- **Annotation arrow:** dashed copper-300 arrow from `GPT-5.5` (top-right region) to `Kimi K2.5` (mid-left region), with mid-arrow label "**90% the intelligence, ⅕ the cost**" in Source Serif 4 italic 13px
- **Axes labels:** mono-caption 11px copper-500
- **Legend:** bottom-right corner, mono-caption 11px copper-500
- **Arrow draw animation:** stroke-dashoffset 0 → 1 over 700ms on step 5 entry

#### R4 — Heatmap summary (used for step 6 / canonical pose)

```
┌─────────────────────────────────────────┐
│  HOW THEY COMPARE — AT A GLANCE         │
│                                         │
│              WRITE  CODE  AGENT  MULTI  COST│
│  GPT-5.5     ▮▮▮▮  ▮▮▮▮  ▮▮▮▮  ▮▮▮   ▮    │
│  Opus 4.7    ▮▮▮▮  ▮▮▮▮  ▮▮▮▮  ▮▮▮▮  ▮    │
│  Gemini 3.1  ▮▮▮▮  ▮▮▮   ▮▮▮▮  ▮▮▮▮  ▮▮   │
│ ─────────────────────────────────────────── │
│  Kimi K2.5   ▮▮▮▮  ▮▮▮▮  ▮▮▮▮  ▮▮▮▮  ▮▮▮▮▮│
│                                         │
│  Frontier leads 4/5. Kimi leads cost    │
│  by 5×. The gap is fine-tunable.        │
└─────────────────────────────────────────┘
```

- **4 rows × 5 columns** matrix
- **Rows:** `GPT-5.5`, `Opus 4.7`, `Gemini 3.1 Pro` (top 3 frontier, copper-700 row group); separator hairline; `Kimi K2.5` (top open-weight champion, copper-300 row)
- **Columns:** WRITE & REASON, CODE, AGENTIC, MULTIMODAL, COST. **CREATIVE TOOLS excluded** (no numeric data).
- **Cells:** mini-bars, 4 visible segments at a glance, normalized per-column (longest bar in each column = column max)
  - **Frontier rows:** copper-700 bar fill
  - **Open-weight row:** copper-300 bar fill
  - **Best-in-column highlight:** 1px copper-300 ring around the cell
  - **COST column inverted** (longer bar = cheaper = better), making it visually obvious that the open-weight row dominates this column while frontier dominates the other four
- **Section header** (HOW THEY COMPARE — AT A GLANCE): mono-caption 11px copper-500, above matrix
- **Italic descriptor** below matrix (Source Serif 4 italic 13px copper-300): names the pattern in plain language

**Bar rise animation** on step 6 entry: bars fill from left to right with 60ms per-cell stagger across rows and columns (total ~1.2s).

### 3.5 Step-reveal choreography

| Step | Trigger | Left rail | Right pane | Duration |
|---|---|---|---|---|
| Mount | Slide enters | All 6 rows visible, first one active (copper-300 bullet, accent bar) | Empty placeholder | 700ms |
| Step 0 | Space-press | (no change) | R1 chart: WRITE & REASON renders; bars rise with 100ms stagger | 600ms |
| Step 1 | Space-press | Highlight shifts from row 1 to row 2 (CODE); old row's bullet/bar return to inactive state | R1 chart cross-fades to CODE (out 150ms, in 150ms with 50ms overlap); bars rise | 600ms |
| Step 2 | Space-press | Highlight shifts to row 3 (AGENTIC) | R1 chart cross-fades to AGENTIC | 600ms |
| Step 3 | Space-press | Highlight shifts to row 4 (MULTIMODAL) | R1 chart cross-fades to MULTIMODAL | 600ms |
| Step 4 | Space-press | Highlight shifts to row 5 (CREATIVE TOOLS) | Right pane cross-fades to R2 chip cluster; chips fade in with 80ms stagger | 700ms |
| Step 5 | Space-press | Highlight shifts to row 6 (COST × INTELLIGENCE) | Right pane cross-fades to R3 scatter; dots appear with 60ms stagger; annotation arrow draws via stroke-dashoffset | 1100ms |
| Step 6 (canonical) | Space-press | All 6 rows transition to summary mode: bullets all copper-300, accent bars retract, sub-labels hidden | Right pane cross-fades to R4 heatmap; matrix bars rise with 60ms per-cell stagger; descriptor fades in. Footer caption + freshness date fade in. | 1500ms |

### 3.6 Footer band

Two elements, horizontally opposed at ~32px above the bottom edge:

- **Left (caption):** *"**Frontier** wins on average. **Fine-tuned open-weight** wins on **your work**."*
  - Instrument Serif italic 22px neutral-200, with copper-300 italic on `Frontier`, `Fine-tuned open-weight`, and `your work`
  - Left-aligned starting at ~80px from left edge
- **Right (freshness date):** `Benchmark data: Artificial Analysis · May 2026`
  - Mono-caption 10px copper-500
  - Right-aligned ending at ~80px from right edge
  - Vertically centered against the caption

Both fade in at step 6 (canonical pose) with 500ms duration, 200ms offset between them.

### 3.7 Hover & detail layer

**Left-rail rows:** hover state per deck convention — bullet enlarges slightly (10px → 11px), row background lightens to copper-950 with 10% opacity. Click is not supported (slides are step-driven; hover is informational only).

**R1 chart bars:** hover on any bar reveals a pop-card with:
- Model name + version
- Raw score on this benchmark
- Score on the AA Intelligence Index (for cross-reference)
- One-line note (e.g., "Best at reasoning chains; strong system-prompt adherence")

**R3 scatter dots:** hover on any dot reveals a pop-card with:
- Model name + version
- Cost per M input/output tokens (separately)
- AA Intelligence Index score
- One-line note

**R4 heatmap cells:** hover on any cell reveals a pop-card with:
- Model + category
- Raw score on the relevant benchmark
- Delta vs leader in that column (e.g., "−6 vs GPT-5.5" for Kimi in CODE)
- Source (e.g., "SWE-bench Verified, May 2026")

Pop-cards: copper-900 background, copper-700 1px border, copper-300 left accent rule, ~300px wide, 200ms ease-out fade-in.

### 3.8 Color and typography summary

- **Surface:** dark
- **Frontier accents:** copper-700 (primary)
- **Open-weight accents:** copper-300 (distinct, mid-warmth)
- **Highlight rings (best-in-column):** copper-300, 1px
- **Hairlines and separators:** copper-900 (very subtle)
- **FIG label, axis labels, sub-labels:** mono-caption 11px copper-500
- **Category labels:** Inter caps, 14px inactive / 16px active, neutral-200
- **Bar score labels:** mono 12px neutral-100
- **Scatter point labels:** Source Serif 4 12px neutral-200
- **Annotation arrow label:** Source Serif 4 italic 13px copper-300
- **Heatmap descriptor:** Source Serif 4 italic 13px copper-300
- **Footer caption:** Instrument Serif italic 22px neutral-200, copper-300 on keywords
- **Freshness date:** mono-caption 10px copper-500

## 4. Data sources and verify-before-delivery

### 4.1 Source files

| Slide | Data source | Path |
|---|---|---|
| B.3 (parameter copy) | LLM mechanics & parameters research | `docs/researches/2026-05-12-llm-mechanics-and-parameters.md` |
| B.4 (benchmark scores) | Artificial Analysis benchmarks 8 June 2026 | `docs/researches/2026-06-08-llm-benchmarks-june-2026.md` |
| B.4 (open-weight framing) | Foundation model landscape | `docs/researches/2026-05-11-foundation-model-landscape.md` |

### 4.2 Benchmark numbers per category

Pulled from research file (`2026-06-08-llm-benchmarks-june-2026.md`). Where the research marks data `[verify]`, implementation phase must either confirm against the current artificialanalysis.ai snapshot or substitute the nearest verified data point.

| Category | Frontier top 3 | Open-weight champion | Benchmark |
|---|---|---|---|
| WRITE & REASON | GPT-5.5 (60) · Opus 4.7 (~58 [verify]) · Gemini 3.1 Pro (~56 [verify]) | Kimi K2.5 (54) | AA Intelligence Index |
| CODE | GPT-5.5 · Opus 4.7 · Grok 4.3 | DeepSeek V4 Pro | SWE-bench Verified |
| AGENTIC | GPT-5.5 · Gemini 3.1 Pro · Opus 4.7 | Kimi K2.5 | Tau-bench / Agentic composite |
| MULTIMODAL | Gemini 3.1 Pro · GPT-5.5 · Opus 4.7 | Kimi K2.5 | MMMU |
| COST × INTELLIGENCE | (scatter, all 8 named models) | (scatter, all 8 named models) | AA Intelligence Index × $/M tokens |

**Canonical model naming** (use these strings exactly in content):
- `GPT-5.5`
- `Claude Opus 4.7` (display as `Opus 4.7` in narrow contexts)
- `Gemini 3.1 Pro` (display as `Gemini 3.1` in narrow contexts)
- `Grok 4.3`
- `Kimi K2.5`
- `DeepSeek V4` (display as `DeepSeek` in narrow contexts; research file uses both K2.5 and K2.6 for Moonshot — spec standardizes on K2.5 for Kimi)
- `Qwen 3.x` (latest available at delivery)
- `GLM` (latest available at delivery)

**Heatmap normalization:** Per column, the longest bar = that column's max. Bars are visually comparable WITHIN a column, not ACROSS columns. Raw numbers exposed via hover detail-layer pop-cards.

### 4.3 Verify-before-delivery checklist

Before workshop delivery, run through:

- [ ] Confirm all benchmark numbers against artificialanalysis.ai snapshot ≤14 days before delivery
- [ ] Replace any `[verify]` data points
- [ ] Confirm model names against vendor announcements (model versions shift monthly)
- [ ] Update freshness date string to match the snapshot date

## 5. Implementation summary

### 5.1 Files affected

**Modified:**
- `src/slides/landscape-section-b/b3-mechanics-landscape.tsx` — full rewrite (new pipeline + new parameter tiles)
- `src/slides/landscape-section-b/b4-tiers-deployment.tsx` — full rewrite (new left-rail + right-pane swap mechanism)
- `src/slides/landscape-section-b/content.ts` — new content blocks for B.3 (pipeline stages, 6 parameter tiles with copy) and B.4 (6 categories with benchmark data, freshness date)
- `src/slides/landscape-section-b/index.ts` — export updates if file renames apply

**Optional renames** (recommended for clarity but not required):
- `b3-mechanics-landscape.tsx` → `b3-llm-mechanics.tsx`
- `b4-tiers-deployment.tsx` → `b4-models-by-category.tsx`

**New components:**
- `src/slides/landscape-section-b/components/B3Pipeline.tsx` — always-looping pipeline (tokens → embed → attend → predict-and-sample), adapted from D3-IPA particle-flow technique
- `src/slides/landscape-section-b/components/B3ParamTile.tsx` — single tile shell (label + animation slot + caption + hover state)
- `src/slides/landscape-section-b/components/B3ParamAnims.tsx` — 6 looping animations co-located like `D3Anims.tsx` (one component per parameter)
- `src/slides/landscape-section-b/components/B4CategoryRail.tsx` — left vertical stack with active-row mechanic and step-6 summary-mode override
- `src/slides/landscape-section-b/components/B4BenchmarkChart.tsx` — R1 layout (4 horizontal bars: 3 frontier + 1 open-weight)
- `src/slides/landscape-section-b/components/B4CreativeChips.tsx` — R2 layout (3 sub-labeled chip groups)
- `src/slides/landscape-section-b/components/B4CostScatter.tsx` — R3 layout (cost × intelligence scatter with annotation arrow)
- `src/slides/landscape-section-b/components/B4Heatmap.tsx` — R4 summary matrix (4 rows × 5 columns)
- `src/slides/landscape-section-b/components/B4DetailPopcard.tsx` — shared hover pop-card for chart elements, scatter dots, and heatmap cells

### 5.2 Component reuse

- **Step-reveal machinery:** Existing `SlideDef.steps` + step-counter infrastructure from `src/deck/registry.tsx` and `src/deck/types.ts`. No changes.
- **D3-IPA particle pattern:** Adapt the SVG SMIL `animateMotion` + path technique from `src/slides/foundation-core/components/D3Anims.tsx` (lines 84–177) for the B.3 pipeline's embed → attend stage.
- **D3-anim shell:** Reuse the 108px shell pattern (`.d3-anim` class with caption slot) for B.3 parameter tiles — same height, same caption mechanic, same `--accent` CSS variable injection.
- **Hover convention:** Existing deck-wide hover pattern (border lift + scale + glow + pop-card) applied uniformly to B.3 tiles and B.4 chart elements.
- **Typography tokens:** Existing Instrument Serif, Source Serif 4, Inter, mono-caption — no new font loads.

### 5.3 Animation budget per slide

**B.3:**
- 1 always-looping SVG SMIL pipeline animation (~4s cycle, ~12 elements)
- 6 always-looping CSS/SVG parameter tile animations (~2–3s cycles each)
- 1 staggered tile-reveal CSS keyframe (step 1, 600ms total)
- 1 footer caption fade (step 2, 500ms)

**B.4:**
- 1 cross-fade transition per step (250ms each, 6 transitions)
- 1 scatter arrow draw (step 5, 700ms)
- 1 heatmap bar rise (step 6, ~1.2s with stagger)
- 1 footer caption + date fade (step 6, 500ms with 200ms offset)

Both slides are within performance envelope demonstrated by D3 (which runs 4 simultaneous looping glyphs without issue). SVG SMIL + CSS keyframes are GPU-accelerated.

### 5.4 Content schema additions

`content.ts` gains structured exports for the shapes below. Concrete copy strings, parameter descriptions, and benchmark numbers are not duplicated here — they are defined in §2.4 (parameter tiles), §3.3 (category labels and sub-labels), §3.6 (footer caption + freshness date), and §4.2 (benchmark numbers). The schemas here describe *structure only*.

```ts
// B.3 content
export const B3_PIPELINE = {
  sentence: ["The", "report", "needs", "to", "be"],
  candidates: ["completed", "reviewed", "submitted", "finished"],
  stages: [
    { id: "tokenize", label: "TOKENIZE" },
    { id: "embed",    label: "EMBED" },
    { id: "attend",   label: "ATTEND" },
    { id: "predict",  label: "PREDICT & SAMPLE" },
  ],
};

export const B3_PARAM_TILES = [
  { id: "effort",    label: "EFFORT",         api: "reasoning_effort", description: ..., detail: ... },
  { id: "max-tok",   label: "MAX TOKENS",     api: "max_tokens",       description: ..., detail: ... },
  { id: "context",   label: "CONTEXT WINDOW", api: "context_window",   description: ..., detail: ... },
  { id: "temp",      label: "TEMPERATURE",    api: "temperature",      description: ..., detail: ... },
  { id: "top-p",     label: "TOP-P",          api: "top_p",            description: ..., detail: "top-k is a related dial..." },
  { id: "sys-prompt",label: "SYSTEM PROMPT",  api: "system",           description: ..., detail: ... },
];

export const B3_FOOTER = "The mechanics are universal. Which model — and how you tune it — is yours to choose.";

// B.4 content
export const B4_CATEGORIES = [
  { id: "write-reason", label: "WRITE & REASON", subLabel: "AA Intelligence Index", layout: "R1", data: {...} },
  { id: "code",         label: "CODE",           subLabel: "SWE-bench Verified",    layout: "R1", data: {...} },
  { id: "agentic",      label: "AGENTIC",        subLabel: "Tau-bench / Agentic",   layout: "R1", data: {...} },
  { id: "multimodal",   label: "MULTIMODAL",     subLabel: "MMMU",                  layout: "R1", data: {...} },
  { id: "creative",     label: "CREATIVE TOOLS", subLabel: "Different model class", layout: "R2", data: {...} },
  { id: "cost-intel",   label: "COST × INTELLIGENCE", subLabel: "Open-weight punchline", layout: "R3", data: {...} },
];

export const B4_HEATMAP = {
  rows: [...],     // 4 models
  columns: [...],  // 5 categories
  scores: [...],   // 4x5 matrix
};

export const B4_FOOTER = "Frontier wins on average. Fine-tuned open-weight wins on your work.";
export const B4_FRESHNESS = "Benchmark data: Artificial Analysis · May 2026";
```

## 6. Open items

- **Benchmark number `[verify]` flags** — research file marks some data points as needing confirmation. Implementation phase should re-fetch artificialanalysis.ai at build time.
- **Model name version drift** — `Kimi K2.5` vs `K2.6`, `Qwen 3.x` exact version, `GLM` latest — verify ≤14 days before workshop.
- **Hairline rule between left rail and right pane** — final styling decision (visible faint copper-900 rule, or pure whitespace separation) to be made at implementation via projection testing.
- **R3 scatter annotation arrow text exact wording** — "90% the intelligence, ⅕ the cost" is the proposed phrasing; should be confirmed against actual numbers before delivery.

## 7. References

- Process and design meta: `docs/specs/2026-05-06-process-and-design-meta.md`
- Original opening arc spec (B.3 / B.4 sections being replaced): `docs/specs/2026-05-11-slides-opening-title-A-B-C.md` §4.2.3, §4.2.4
- D3 animation patterns (reuse reference): `src/slides/foundation-core/components/D3Anims.tsx`
- Reference image (pipeline structure): `docs/examples/B3-how-llm-works.png`
- Current B.3 and B.4 screenshots: `docs/examples/section-A-B-C-current/B3.png`, `B4.png`
