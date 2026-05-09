# Slides — Foundation Core — Spec

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Sub-spec:** Foundation Core arc (Sections D, E, F) — the deck's conceptual heart
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Section D approved 2026-05-08; Sections E + F pending separate brainstorm
**Source brainstorm:** in-context 2026-05-08 (Section D)
**Parent meta-spec:** [`docs/specs/2026-05-06-process-and-design-meta.md`](2026-05-06-process-and-design-meta.md)
**Prior sub-spec (tonal precedent + cross-spec dependencies):** [`docs/specs/2026-05-07-slides-reveal-and-closing.md`](2026-05-07-slides-reveal-and-closing.md)

## 0. Scope

This spec covers per-slide design for the **Foundation Core arc** — the deck's conceptual heart between the relevance hooks (B / C) and the application chapters (G / H), feeding into the climactic Reveal (I).

- **Section D** — Process improvement (BPM / RPA / IPA / Agentic Automation; the *fix-the-spec* hook)
- **Section E** — Engineering fundamentals (prompt / context / harness Russian doll) — **pending separate brainstorm**
- **Section F** — Techniques (MCP / RAG / Skills / Agent orchestration) — **pending separate brainstorm**

Section D is fully specified below. Sections E and F are scaffolded with TBD markers and will be filled in via a follow-up brainstorm session.

Explicitly NOT in scope:

- Section A (Hook 1 — BCE Vol-1 Winner; material pending from BCE PIC; separate spec later)
- Sections B, C (Opening sub-spec)
- Sections G, H (Application sub-spec)
- Sections I, J, K (already specified in [Reveal + Closing sub-spec](2026-05-07-slides-reveal-and-closing.md))
- Practice-lab curriculum
- Final copper hex ladder (settled at implementation per meta-spec §6.5)
- Projection-scale font calibration (refined at implementation per meta-spec §7.2)

## 1. Section structure

### 1.1 Section D — locked

| # | Slide | Beat | Animation mode | Background tier |
|---|-------|------|----------------|-----------------|
| **D.1** | THE TRAP | Consolidated diagnostic + prescription (73% → amplification → fix-the-spec) | Step-reveal | Diagrammatic (plain dark + dot grid) |
| **D.2** | THE CONVERGENCE | 5-card convergence diagram (BPM + RPA + AI → IPA → AGENTIC) | Step-reveal + hover | Diagrammatic |
| **D.3** | ONE PROCESS, FOUR LEVELS | Cinematic unfolding — monthly operations report walks the levels and reassembles into D.2 geometry | Step-reveal + hover | Diagrammatic |
| **D.4** | DECISION PATTERN | Horizontal ladder-rise — Q gates along bottom rail, terminal levels rising on a staircase | Step-reveal + hover + targeted ambient (STOP↻ only) | Diagrammatic |
| **D.5** | BRIDGE TO E | Photographic close — *"Process is the spec. Engineering is the system around it."* | Step-reveal (no ambient) | **Photographic** |

**Section D total:** 5 slides · **22 logical advances**.

### 1.2 Sections E + F — TBD

Per-slide structure pending follow-up brainstorm. Estimated:

- **Section E** — engineering fundamentals — ~5–8 slides (Russian-doll requires deliberate step-reveal pacing). Must lock the *harness* vocabulary so I.3's portfolio simulations resolve.
- **Section F** — techniques — ~6–10 slides (4+ techniques each with non-engineer-graspable example). Must define *MCP* and *agent orchestration* clearly enough that I.3's portfolio reads as "concepts you just learned, instantiated."

## 2. Deck-wide conventions (referenced; not redefined here)

Apply across every slide. Locked in memory; this spec consumes them.

| Convention | Reference |
|---|---|
| Background tiering (photo for hero / plain-dark for diagrammatic) | `feedback_slide_visual_conventions.md` |
| FIG label `— FIG. <SECTION>.<NUM> · <LABEL>` top-left | `feedback_slide_visual_conventions.md` |
| Image source: `gemini-image-gen` MCP (primary), Unsplash (backup) | `feedback_slide_visual_conventions.md` |
| Static backgrounds — no animated motion behind content | `feedback_slide_visual_conventions.md` |
| Keyword highlight pattern (copper italic on 1–3 keywords per chunk) | `feedback_keyword_highlighting.md` |
| Hover micro-interactions as presenter-controlled detail layer | `feedback_slide_interaction_conventions.md` |
| Audience-respect framing (no commit counts, no "solo" repeats, plain-language) | `feedback_audience_framing.md` |
| Free-only stack (no paid components/fonts/libraries) | `feedback_no_paid_components.md` |

Substrate: shadcn UI + Tailwind + Framer Motion (per meta-spec §8.1). Typography: Instrument Serif (display), Source Serif 4 (body), Inter (sans), JetBrains Mono (mono) — all per meta-spec §7. Single accent: deep copper `#b86e3d` and derived stops + grayscale (per meta-spec §6.5).

## 3. Cross-cutting primitives

### 3.1 Reused from Reveal + Closing sub-spec

These primitives were specified in [Reveal + Closing §3](2026-05-07-slides-reveal-and-closing.md#3-cross-cutting-primitives) and are consumed unchanged here.

| Primitive | Used on |
|---|---|
| `<FigLabel section, num, label>` | All 5 slides |
| `<KeywordHighlight>` | All 5 slides |
| `<HeroPhoto src, vignetteSide>` | D.5 |
| `<HoverReveal trigger, payload>` | D.2, D.3, D.4 |
| `<PulseGlow target, period>` | D.4 (STOP↻ loopback only) |
| `<DisplayPhrase staggerType, words>` | D.5 |

### 3.2 New primitives introduced by Section D

Build during foundation-core implementation; reusable across the deck thereafter.

| Primitive | Purpose | Used on |
|---|---|---|
| `<AmplificationBar from, to, counterTo, offFrame, label>` | Animated from-zero horizontal bar with optional integer counter and optional off-frame copper-glow fade | D.1 |
| `<ConvergenceCard tagline, bullets, copperStop, position>` | Synthesis-diagram node with tagline + 3-bullet body, positioned at one of 5 slots (bpm-tl · rpa-tr · ai-bc · ipa-c · agentic-r). Used directly for cards that don't morph (AI in D.3); used internally by `<LevelCard mode="converged">` for the visual rendering of converged-mode level cards. | D.2 (×5), D.3 (×1, AI only) |
| `<LevelCard mode, position, content>` with `layoutId={\`level-${abbrev}\`}` | Morphing card with three modes — `focal` (center stage, full content), `filed` (compact summary), `converged` (renders the same visual content as `<ConvergenceCard>`, occupying a slot in D.2 geometry). Framer Motion `layoutId` auto-tweens between modes. Internally composes `<ConvergenceCard>` in `converged` mode. | D.3 (×4 — BPM, RPA, IPA, AGENTIC) |
| `<LadderRise questions, terminals, loopBack>` | Parent component composing 5 `<LadderQuestion>` gates along a bottom rail + 4 `<LadderTerminal>` cards rising on a staircase + 1 `<LadderLoopBack>` (STOP↻) with subtle copper-glow ambient | D.4 |
| `<CountUp from, to, duration, ease>` | Integer counter using Framer Motion `useMotionValue` + `useTransform`; rounds to nearest integer for display. Used by `<AmplificationBar>` and standalone (D.1 73% number) | D.1 |

All primitives are flat (0px corner radius), single-shadow recipe, copper-only color, free-stack-compatible.

## 4. Per-slide specs

### 4.1 — D.1 — THE TRAP

**FIG label:** `— FIG. D.1 · THE TRAP`

**Goal:** consolidate the section's three load-bearing beats (statistic → mechanism → prescription) into a single editorial tableau. Establish the deck-wide motion grammar of *"measurement assembling itself in front of you."*

**Background:** plain dark (copper-950) + 4–6% opacity dot grid texture.

**Layout:** editorial single-column, vertical center. Three rhetorical movements stacked, separated by thin copper-rule dividers (~30% slide width, centered).

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| **Beat 1** — number (dominant) | `〔73〕%` | Instrument Serif ~280px projected, copper-400; the `%` glyph is static, only the digits animate via `<CountUp>` |
| Beat 1 — underline | thin 1px copper-700, scales 0 → ~width-of-`73%`-glyph in sync with the counter | — |
| Beat 1 — sub-line | `of automation projects 〔fail〕.` | Source Serif 4 ~44px, white + copper-italic on `fail` |
| Beat 1 — caption | `— widely cited across automation industry research, 2024–2026` | Inter ~18px, neutral-400 |
| First beat-divider rule | thin 1px copper-700, ~30% slide width, centered | — |
| **Beat 2** — mechanism | `〔Automation〕 amplifies what's already there. 〔Broken〕 or 〔excellent〕.` | Instrument Serif ~52px, white + copper-italic on `Automation`, `Broken`, `excellent` |
| Beat 2 — manual bar | `<AmplificationBar from=0% to=18% counterTo=1 offFrame=false label="manual pace">` | Bar: copper-700 fill, 8px height. Counter: Inter mono ~22px, copper-300, suffixed with static `×` |
| Beat 2 — machine bar | `<AmplificationBar from=0% to=140% counterTo=1000 offFrame=true label="machine pace">` | Bar: copper-500 fill (slightly brighter than manual), 8px height. Counter: Inter mono ~22px, copper-300, suffixed with static `×`. Off-frame copper-glow gradient at right edge (opacity 0→100% over the last 300ms of bar growth) |
| Second beat-divider rule | thin 1px copper-700, ~30% slide width, centered | — |
| **Beat 3** — prescription | `Fix the 〔spec〕 first. Then automate.` | Instrument Serif ~52px, white + copper-italic on `spec` |
| Beat 3 — sub-prescription | `Process improvement is a 〔prerequisite〕, not a phase.` | Source Serif 4 italic ~32px, neutral-300 + copper-italic on `prerequisite` |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<CountUp>`, `<AmplificationBar>`.

**Motion (4 advances, no ambient — stillness is the design):**

| Space | What happens | Duration |
|---|---|---|
| 1 | `<CountUp 0 → 73>` runs over 1500ms with `cubic-bezier(0.16, 1, 0.3, 1)` ease-out. Underline copper rule scales from `width: 0%` to `width: 100%` (of `73%` glyph width) in sync. After counter settles, sub-line fades in (300ms delay) + caption fades in (200ms after sub-line). | ~2200ms total |
| 2 | First beat-divider rule draws via `pathLength` 0 → 1 (400ms). Beat 2 typography (`Automation amplifies. Broken or excellent.`) word-by-word stagger-reveals (~600ms total). | ~1000ms |
| 3 | Manual `<AmplificationBar>` grows from `width: 0%` to `width: 18%` over 500ms `easeOutExpo`. `<CountUp 0 → 1>` runs in sync. Pause 200ms. Machine `<AmplificationBar>` grows from `width: 0%` to `width: 140%` over 1200ms `easeOutExpo`. `<CountUp 0 → 1000>` runs in sync. Off-frame copper-glow gradient intensifies (opacity 0 → 100%) during the final 300ms of bar growth. | ~1900ms |
| 4 | Second beat-divider rule draws (400ms). Beat 3 prescription (`Fix the spec first. Then automate.`) word-by-word stagger-reveals (~500ms). Sub-prescription (`Process improvement is a prerequisite, not a phase.`) fades in (~300ms). | ~1200ms |

**Hover:** none (the slide is editorial, no hover affordances).

**Canonical pose:** post-Space 4. Full editorial tableau visible: number + mechanism + prescription. Both beat-divider rules drawn. Off-frame copper-glow on machine bar's right edge at full opacity. All counters at final values (`73%`, `1×`, `1000×`).

---

### 4.2 — D.2 — THE CONVERGENCE

**FIG label:** `— FIG. D.2 · THE CONVERGENCE`

**Goal:** introduce the four levels of automation maturity as a *synthesis* — three feeder disciplines (BPM, RPA, AI) converging into IPA, which evolves into Agentic Automation. The shape of the diagram encodes the causal relationship.

**Background:** plain dark + dot grid texture.

**Headline (top, persistent):** `Three disciplines 〔converge〕. One 〔evolves〕.`

**Layout:** 5-card convergence geometry.

```
   [BPM]                    [RPA]
        ↘                ↙
              [IPA] ──→ [AGENTIC AUTOMATION]
              ↑
            [AI]
```

- **BPM** — top-left
- **RPA** — top-right
- **AI** — bottom-center
- **IPA** — center (the convergence)
- **AGENTIC AUTOMATION** — right of IPA (the evolution)

All cards: 0px corner radius, copper-stop left rule (progressive: BPM=copper-700, RPA=copper-500, AI=copper-400, IPA=copper-300, AGENTIC=copper-200), white text on dark surface, single-shadow recipe per meta-spec §6.

**Per-card content:**

| Card | Tagline | 3 bullets |
|---|---|---|
| **BPM** — Business Process Management | *The 〔GPS〕 for operations* | Holistic workflow optimization · Identifies bottlenecks and waste · Redesigns end-to-end flow |
| **RPA** — Robotic Process Automation | *〔Deterministic〕 digital workers* | Rule-based task execution · Fast, reliable, no intelligence needed · Scales repetitive operations |
| **AI** — Artificial Intelligence | *〔Core strengths〕* | Summarization & analysis · Generation & NLU · Multimodal & adaptive learning |
| **IPA** — Intelligent Process Automation | *End-to-end 〔intelligent〕 workflow* | Combines process, automation, and AI · Context-aware and adaptive · End-to-end orchestration |
| **AGENTIC AUTOMATION** — Autonomous Agents | *〔Goals〕, not just steps* | Self-directed orchestration toward outcomes · Multi-agent collaboration · Continuous learning and adaptation |

**Card typography:**

| Slot | Style |
|---|---|
| Card title (`BPM` / `RPA` / etc.) | Instrument Serif ~32px projected, white |
| Card sub-name | Source Serif 4 italic ~22px, neutral-300 |
| Tagline | Source Serif 4 ~24px, white + copper-italic on the operative noun |
| 3 bullets | Inter ~18px, neutral-200 |

**Connector arrows:** copper-700 stroke, 1.5px weight, with arrowhead. Three convergence arrows point inward to IPA from BPM (top-left), RPA (top-right), AI (bottom-center). One evolution arrow points right from IPA to AGENTIC AUTOMATION.

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<ConvergenceCard>` × 5, `<HoverReveal>` per card.

**Motion (5 advances):**

| Space | What happens |
|---|---|
| 1 | Headline + FIG label visible. BPM card reveals at top-left (fade-in + 8px translate from upper-left, ~400ms). |
| 2 | RPA card reveals at top-right (mirror motion, ~400ms). |
| 3 | AI card reveals at bottom-center (~400ms). |
| 4 | Three convergence arrows draw via `pathLength` 0 → 1, sequential (BPM→IPA, RPA→IPA, AI→IPA, ~200ms each, ~600ms total). IPA card reveals at center (~400ms) immediately after final arrow lands. |
| 5 | Evolution arrow draws right from IPA (~300ms). AGENTIC AUTOMATION card reveals at right (~400ms). |

**Steady-state:** no ambient. All five cards remain still post-Space 5; speaker walks through hover details at conversational pace.

**Hover (each card):** reveals a copper-bordered detail panel below the card with a 1-line plain-language analogy:

| Card | Hover analogy |
|---|---|
| BPM | "Like asking *'where's the waste?'* before you ask *'how do we go faster?'*." |
| RPA | "Like a digital worker following a checklist exactly — fast, never tired, never improvises." |
| AI | "What AI does well — quickly, at scale, on text/image/audio simultaneously." |
| IPA | "Process discipline + deterministic automation + AI strengths, in one workflow." |
| AGENTIC AUTOMATION | "An agent that pursues a goal — *'ensure zero unplanned downtime'* — and adapts as conditions change." |

**Canonical pose:** post-Space 5, all 5 cards + 4 connector arrows visible, baseline state.

---

### 4.3 — D.3 — ONE PROCESS, FOUR LEVELS

**FIG label:** `— FIG. D.3 · ONE PROCESS · FOUR LEVELS`

**Goal:** make the convergence diagram (D.2) come alive by walking a real process — *monthly operations report* — through each level, with each level getting full focal attention before being filed, then reassembling into D.2's geometry populated with worked-example content. The reassembly is the *teach-back* moment.

**Background:** plain dark + dot grid texture.

**Headline (top, persistent):** `Monthly operations report — the same process at 〔every level〕.`

**Stage zones:**

- **Center stage** (~70% width, vertical center of slide): the *focal* slot where the current level expands fully — large abbreviation, full sub-name, `Ask`, `Do`, illustration of impact, `Outcome`.
- **Left rail** (~30% width, top-aligned): the *filed* slot — completed levels stack here as compact summary cards.
- **Final reassembly:** all four `<LevelCard>` components tween into D.2's convergence geometry positions. The AI feeder card (which doesn't get a focal scene because it's a capability, not a level) appears at the synthesis moment as the "missing piece" that makes IPA possible.

**Per-level focal content (when expanded in center stage):**

| Level | Ask | Do (monthly-report instance) | Illustration glyph | Outcome |
|---|---|---|---|---|
| **BPM** | *"Where's the 〔waste〕?"* | Redesign report scope; consolidate three duplicate reports into one; integrate data sources end-to-end. | `<BpmCompressionGlyph>` — see §4.3.1 | *Fewer reports; clearer signal.* |
| **RPA** | *"What 〔repeats〕?"* | Bot pulls KPIs each Monday; populates the template; distributes to stakeholders. | `<RpaAccelerationGlyph>` — see §4.3.1 | *Hours reclaimed; zero copy-paste.* |
| **IPA** | *"Which steps need AI's 〔core strengths〕?"* | Layer AI's core strengths: 〔summarization〕 (compress raw data), 〔analysis〕 (spot anomalies), 〔generation〕 (draft narrative), 〔NLU〕 (interpret stakeholder comments). | `<IpaSynthesisGlyph>` — see §4.3.1 | *Insight, not just data.* |
| **AGENTIC** | *"Can this 〔run itself〕?"* | Agent monitors continuously; generates report on demand; escalates to leadership without being asked. | `<AgenticInversionGlyph>` — see §4.3.1 | *Earlier risk detection; report becomes ambient.* |

#### 4.3.1 — Illustration glyphs (motion-design vignettes)

These glyphs are **living motion-design vignettes** in the spirit of `c3-motion-design-en.html` (see `.claude/skills/huashu-design/demos/`) — animated SVG + CSS + Framer Motion components that demonstrate each level's transformation kinetically, not symbolically. Each plays its entry animation once when its level enters focal stage (~2–3 seconds), then settles into a static end-state. When the card files left or reaches converged mode, only the settled end-state renders (at reduced scale; no animation replay).

Reference register: `viz-clock` (rotating clock hands), `viz-morph` (size/color/radius interpolation), `viz-easing` (progressively-drawn SVG curves), `viz-sprites` (rippling grid of squares with stagger). Our glyphs occupy the same conceptual slot — small, self-contained, palette-restrained, kinetically demonstrative.

##### `<BpmCompressionGlyph />` — BPM transformation = **compression**

**Story:** 20 process steps merge into 8.

**Visual structure:**
- Top: row of **20 small squares** (~10×10px each, copper-700 fill, 0px corner, 4px gaps).
- Bottom: row of **8 larger squares** (~14×14px each, copper-400 fill, 6px gaps), positioned to align with merger points above.
- During merger phase: thin copper-300 vertical connectors briefly link top→bottom.
- Counter label below: `STEPS · 〔20〕 → 〔8〕` (Inter mono ~16px, copper-300; `<CountUp>` rolls 20→8 synced to merger).

**Animation (~2.4s total):**

| Phase | Duration | What happens |
|---|---|---|
| A | 0–600ms | Top row: 20 squares cascade left-to-right (30ms stagger, scale 0→1 + fade). Counter shows `20`. |
| B | 600–800ms | Pause; full top row visible. |
| C | 800–2000ms | Top squares animate `translateY` downward toward merger points. Pairs/triples converge → cross-fade out, while the corresponding bottom-row larger square fades+scales in at each merger point. Connectors draw via `pathLength` 0→1 (200ms each). Counter rolls 20→8, ease-out. |
| D | 2000–2400ms | Top row fades out completely; bottom row settles. Counter reads `8`. |

**End state:** 8 copper-400 squares + counter `STEPS · 8`. No ambient.
**Size:** ~280×140px.
**Implementation:** SVG `<g>` with 20 + 8 `<rect>` elements; Framer Motion controls; `<CountUp>` for counter.

##### `<RpaAccelerationGlyph />` — RPA transformation = **acceleration**

**Story:** A week of manual hours collapses into a single bot strike.

**Visual structure:**
- Top half: horizontal **time-bar** (~260px wide, 2px copper-hairline) with **6 manual tick-dots** along it, labeled with weekday monograms (M · T · W · T · F · S — or 6 hour markers).
- Bottom half: a **single copper bolt glyph** (3-segment lightning SVG `<path>`, copper-400), initially invisible.
- Counter labels: top `MANUAL · 〔6 hours / week〕`; bottom `BOT · 〔instant〕` (Inter mono ~16px).

**Animation (~2.6s total):**

| Phase | Duration | What happens |
|---|---|---|
| A | 0–800ms | Time-bar draws via `pathLength` 0→1 (300ms). 6 tick-dots cascade left-to-right (80ms stagger, slow copper-glow fill on each, ~60ms per dot). Top counter `MANUAL · 6 hours / week` fades in. |
| B | 800–1400ms | Pause; manual state visible. |
| C | 1400–2000ms | Time-bar contracts horizontally — width 260px → 16px over 400ms `easeInExpo`. 6 tick-dots compress along with it, converging on the center point. |
| D | 2000–2400ms | At contraction endpoint, copper bolt strikes — SVG path draws via `pathLength` 0→1 in 200ms with sharp `cubic-bezier(0.7, 0, 0.3, 1)`, copper-glow burst. Tick-dots fade into bolt. Bottom counter `BOT · instant` fades in. |
| E | 2400–2600ms | Bolt static; ambient settles. |

**End state:** static copper bolt + counter `BOT · instant`. Time-bar and tick-dots are gone (consumed into the strike).
**Size:** ~280×140px.
**Implementation:** SVG with `<line>` time-bar, `<circle>` ticks, `<path>` bolt; Framer Motion for contraction + strike timing.

##### `<IpaSynthesisGlyph />` — IPA transformation = **synthesis**

**Story:** Raw stacks of data converge through AI core strengths into a single insight pulse.

**Visual structure:**
- Left: **8 horizontal bars** of varying widths (~40–120px range, 4px height each, stacked vertically, 6px gaps), copper-700 fill — represents raw data heterogeneity.
- Middle: 2×2 grid of **AI core-strength labels** — `summarization · analysis · generation · NLU` (Inter mono ~12px, copper-300).
- Right: a **single insight glyph** — copper-400 filled `<circle>` (~28px diameter) with copper-glow halo (SVG `<feGaussianBlur>` filter), initially invisible.
- Counter labels: left `RAW DATA`; right `INSIGHT` (Inter mono ~16px).

**Animation (~2.8s total):**

| Phase | Duration | What happens |
|---|---|---|
| A | 0–800ms | 8 raw-data bars cascade left-to-right (60ms stagger, `width: 0 → target` over 400ms each, copper-700 fill). Left counter `RAW DATA` fades in. |
| B | 800–1400ms | Pause; raw stack visible. 4 core-strength labels (`summarization`, `analysis`, `generation`, `NLU`) fade in sequentially (120ms stagger). |
| C | 1400–2400ms | Bars compress horizontally — each bar's width → 0 over 600ms (left-edge anchored). As bars retract, a copper-300 collapse trail flows rightward from each bar's right-edge, converging on the insight position. Trail lines fade as they reach center. |
| D | 2400–2800ms | Insight glyph appears at center-right via scale 0→1 + opacity 0→1 (~300ms `easeOutExpo`), copper-glow halo expands outward (one cycle, then settles). Right counter `INSIGHT` fades in. |

**End state:** static copper-400 insight glyph + halo (settled, no continuous pulse) + 4 core-strength labels + counter `INSIGHT`. Raw bars gone.
**Size:** ~320×160px (slightly wider — needs room for 2×2 labels).
**Implementation:** SVG `<rect>` bars (Framer Motion `width`), `<circle>` insight, copper-glow via `<filter>` with `<feGaussianBlur>`.

##### `<AgenticInversionGlyph />` — AGENTIC transformation = **inversion**

**Story:** The you-report relationship flips. *You-pull → report-push.* A loopback indicator signals continuous autonomous operation.

**Visual structure:**
- Top row: **YOU** label (left, Inter mono ~14px, white) — **arrow** (right-pointing, copper-400 SVG `<path>` with arrowhead, ~120px length) — **REPORT** label (right).
- Bottom: small **loopback indicator** `↻` (Inter mono ~18px, copper-400), initially invisible.
- Counter label: `〔reactive〕 → 〔proactive〕` (Source Serif 4 italic ~16px, copper-italic).

**Animation (~2.4s total):**

| Phase | Duration | What happens |
|---|---|---|
| A | 0–600ms | YOU label fades in (left). Arrow draws via `pathLength` 0→1 left-to-right (400ms). REPORT label fades in (right). Reading: *YOU → REPORT*. |
| B | 600–1000ms | Pause; reactive state visible. |
| C | 1000–1700ms | Arrow rotates 180° around its midpoint (~700ms ease-in-out, `transform-origin: center`). Simultaneously, YOU and REPORT labels cross-fade and swap positions via translateX exchange + opacity dip. Arrow now points opposite direction. |
| D | 1700–2100ms | Reading: *REPORT → YOU*. Brief pause. |
| E | 2100–2400ms | Loopback indicator `↻` fades in below arrow with a one-time copper-glow pulse (signals continuous autonomous operation). Counter `reactive → proactive` fades in. |

**End state:** static `REPORT → YOU` reading + `↻` indicator + counter. No continuous animation.
**Size:** ~280×120px.
**Implementation:** SVG `<path>` arrow with `transform-origin: center`; HTML labels with Framer Motion translateX exchange.

##### Glyph lifecycle (orchestration)

Each glyph component accepts a `play` boolean prop:

```tsx
<BpmCompressionGlyph play={levelMode === 'focal'} />
```

- `play={true}` triggers the entry animation sequence (one-shot).
- After the sequence completes, the glyph remains in its end-state.
- When the parent `<LevelCard>` transitions to `mode="filed"`, the glyph is rendered at ~30% scale (within the filed compact card) showing only the end-state — no animation replay.
- When the parent reaches `mode="converged"` (D.3 reassembly), the glyph is rendered at ~25% scale within the converged-mode card — only the end-state visible.

**Why no replay on filed/converged modes:** the deck's editorial-serious tone treats motion as *meaningful, not decorative*. A glyph that re-plays each time the level appears at a smaller size would feel chattery. The settled end-state alone preserves the kinetic memory of what was demonstrated, without re-stating it.

**Filed left-rail compact card content:** number badge + abbreviation (Instrument Serif ~24px) + one-line `Outcome` (Source Serif 4 italic ~16px) + downward chevron connector to next-filed card.

**Final reassembly content (at end of Space 5):** all five `<ConvergenceCard>` slots from D.2 populated:

| Slot | Populated content |
|---|---|
| BPM (top-left) | "Redesigned report scope · 3 reports → 1 · sources integrated end-to-end" |
| RPA (top-right) | "Bot pulls KPIs Monday · auto-fills template · auto-distributes" |
| AI (bottom-center) | "Summarization · generation · analysis · NLU on the source data" |
| IPA (center) | "Bot reads sources → summarizes anomalies → drafts narrative → flags risks" |
| AGENTIC (right) | "Agent monitors continuously · generates on demand · escalates without being asked" |

**Result capstone (footer, fades in last):** `〔~80% time saved〕 · 〔risks surfaced earlier〕`

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<LevelCard>` × 4 — BPM, RPA, IPA, AGENTIC — (with `layoutId={\`level-${abbrev}\`}`, `mode` prop transitioning between `focal` / `filed` / `converged`, `position` prop for converged geometry), `<ConvergenceCard>` × 1 (AI only — appears in Space 3 directly at `position="ai-bc"`; AI never has a focal mode, so it doesn't need the `<LevelCard>` wrapper), `<HoverReveal>` per converged card.

> **Final reassembly composition (post-Space 5):** the slide visually shows 5 cards in D.2's convergence geometry — 4 of them rendered via `<LevelCard mode="converged">` (which internally composes `<ConvergenceCard>`) and 1 of them rendered as a standalone `<ConvergenceCard>` (AI). Visually indistinguishable; conceptually distinct because only 4 morph from focal poses.

**Motion (5 advances):**

| Space | What happens |
|---|---|
| 1 | Headline + FIG label visible. BPM `<LevelCard mode="focal">` enters center stage — abbreviation, sub-name, Ask, Do, illustration glyph (20→8 compression animates), Outcome stagger-fade in (~700ms total). |
| 2 | BPM `<LevelCard>` tweens to upper-left position (its D.2 slot — `position="bpm-tl"`) and `mode` transitions to `filed`. Tween is auto-handled via Framer `layoutId`. **Simultaneously** RPA `<LevelCard mode="focal">` enters center stage with its full content + hourglass→bolt glyph animation. |
| 3 | RPA tweens to upper-right (`position="rpa-tr"`, `mode="filed"`). **Simultaneously** IPA `<LevelCard mode="focal">` enters center stage with full content + data→insight glyph animation. **Also simultaneously** the AI feeder card appears at bottom-center (`position="ai-bc"`) — this is its only entrance because AI is a capability, not a level, so it doesn't get a focal scene. AI card fades in over ~600ms with a subtle copper-glow that signals "this is what makes IPA possible." |
| 4 | IPA tweens to D.2 center slot (`position="ipa-c"`, `mode="converged"`). Three convergence arrows draw simultaneously (BPM→IPA, RPA→IPA, AI→IPA, ~200ms each). **Simultaneously** AGENTIC `<LevelCard mode="focal">` enters center stage with full content + arrow-flip glyph animation. |
| 5 | AGENTIC tweens to D.2 right slot (`position="agentic-r"`, `mode="converged"`). Evolution arrow draws right from IPA→AGENTIC (~300ms). The full D.2 convergence diagram is now populated with monthly-report content. Result capstone (`~80% time saved · risks surfaced earlier`) fades in (~500ms). |

**Hover (post-Space 5, on the reassembled converged cards):** each card hover reveals the *Ask*-to-*Outcome* expanded view from its focal pose (one-line summary + the illustration glyph as a small inline static glyph).

**Canonical pose:** post-Space 5. Full convergence diagram (mirroring D.2's geometry exactly) populated with monthly-report content. AI feeder card visible. Result capstone visible. All cards still.

---

### 4.4 — D.4 — DECISION PATTERN

**FIG label:** `— FIG. D.4 · WHICH LEVEL, WHEN`

**Goal:** the section's *useful artifact* — a decision diagram an attendee photographs and applies on Tuesday. Encode capability ascent as visible altitude (staircase shape); reserve the only ambient motion for the STOP↻ loopback as a callback to D.1's trap.

**Background:** plain dark + dot grid texture.

**Layout:** horizontal ladder-rise.

```
                                                                [AGENTIC]
                                                  [IPA]              ↑
                                       [RPA]         ↑               │
                            [BPM]         ↑          │               │
                              ↑           │          │               │
                              │           │          │               │
  [Start] ──→ [Q1] ──→ [Q2] ──→ [Q3] ──→ [Q4] ──→ [Q5]
                ↓
              [STOP ↻]
              redesign first
```

**Geometry:**

- Bottom rail (~1/3 from bottom of slide): start node + 5 question gates left-to-right, evenly spaced.
- Terminal level cards rise on a staircase — BPM at center-of-slide altitude, RPA slightly higher, IPA higher still, AGENTIC topmost (just below the headline).
- Connector arrows go *upward* from each YES branch to its level card; the staircase shape encodes capability ascent.
- Q1's NO branch drops *below* the bottom rail to a STOP↻ loopback card.
- Each Q-to-Q connector along the bottom rail is the implicit "NO, continue checking" path.

**Headline (top-left):** `Each level builds on the 〔previous〕. You can't skip.`

**Footer caption (bottom-right):** `Skip a level, and the level above 〔fails harder〕.`

**Per-question content:**

| Q# | Question | YES branch | NO branch |
|---|---|---|---|
| Q1 | `Does the process 〔work today〕?` | continues right (to Q2) | drops to STOP↻ loopback |
| Q2 | `Have you removed 〔waste〕 + bottlenecks?` | continues right (to Q3) | rises to BPM (you need BPM) |
| Q3 | `Are there 〔repetitive〕, rule-based steps?` | rises to RPA | continues right (to Q4) |
| Q4 | `Do steps need 〔AI's core strengths〕?` | rises to IPA | continues right (to Q5) |
| Q5 | `Should it pursue a 〔goal autonomously〕?` | rises to AGENTIC | stays at IPA (terminal exit) |

> **Note:** Q2 is intentionally framed inversely (NO → BPM) so that the YES branches consistently mean "you've done that; move to the next level." This preserves the staircase metaphor where rising = adding capability. Implementation note: visually mark Q2's NO branch with a small copper "↑ apply BPM first" label to make the inversion legible.

**Per-terminal-level card content:**

| Card | Sub-line | Hover example |
|---|---|---|
| **BPM** | *Redesign + integrate. The foundation everything else stands on.* | "Example: cut a 20-step approval flow to 8 steps before automating any of it." |
| **RPA** | *Automate the rule-based parts. Reclaim hours.* | "Example: bot pulls 6 reports each Monday, fills the template, distributes." |
| **IPA** | *Layer AI's core strengths. Insight, not just data.* | "Example: bot reads source data, summarizes anomalies, flags risks for human review." |
| **AGENTIC** | *Autonomous orchestration. The process pursues the goal.* | "Example: agent monitors operations continuously, generates report on demand, escalates without being asked." |
| **STOP ↻** | *Fix it first. Don't automate broken processes.* | (no hover; the loopback is the message) |

**Typography:**

| Slot | Style |
|---|---|
| Headline | Instrument Serif ~52px projected, white + copper-italic on `previous` |
| Q gate question text | Source Serif 4 ~22px, white + copper-italic on the operative noun |
| Q gate Q# | Inter mono ~16px, copper-300 |
| Branch label (`YES` / `NO`) | Inter mono ~14px, copper-200 |
| Terminal-level abbreviation | Instrument Serif ~36px, white |
| Terminal-level sub-line | Source Serif 4 italic ~22px, neutral-300 |
| STOP↻ card | Inter ~24px, copper-300 (loopback symbol `↻` Inter mono ~28px, copper-400) |
| Footer caption | Source Serif 4 italic ~24px, neutral-300 + copper-italic on `fails harder` |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<LadderRise>` (parent), with `<LadderQuestion>` × 5, `<LadderTerminal>` × 4, `<LadderLoopBack>` × 1 (with `<PulseGlow period={4000}>`), `<HoverReveal>` per terminal.

**Motion (5 advances + targeted ambient):**

| Space | What happens |
|---|---|
| 1 | Headline + FIG label visible. Start node fades in at left of bottom rail. Q1 reveals (~400ms). NO branch drops downward + STOP↻ card slides down with subtle entrance (~500ms). Targeted copper-glow ambient begins on STOP↻ only (the only ambient on this slide — recalls D.1's trap). |
| 2 | Bottom-rail connector Q1→Q2 draws (~300ms) + Q2 reveals (~400ms). Q2's NO branch rises upward (~300ms) + BPM terminal card slides in from below-left at center-of-slide altitude (~500ms). |
| 3 | Bottom-rail connector Q2→Q3 + Q3 reveals. Q3's YES branch rises (slightly higher altitude than BPM's connector) + RPA terminal card slides in. |
| 4 | Bottom-rail connector Q3→Q4 + Q4 reveals. Q4's YES branch rises (higher still) + IPA terminal card slides in. |
| 5 | Bottom-rail connector Q4→Q5 + Q5 reveals. Q5's YES branch rises (topmost altitude) + AGENTIC terminal card slides in. Footer caption fades in last (~400ms after AGENTIC lands). |

**Steady-state ambient:** copper-glow pulse on STOP↻ card only, opacity 60% → 100% → 60% over 4–5s cycle. All other elements static.

**Hover (each terminal-level card, post-Space 5):** reveals a 1-line plain-language example as specified in the per-terminal content table.

**Canonical pose:** post-Space 5. Full ladder-rise visible — bottom rail with start + 5 Qs, staircase of 4 terminal cards (BPM lowest, AGENTIC topmost), STOP↻ below Q1 with mid-glow ambient, all connector arrows drawn, footer caption visible.

---

### 4.5 — D.5 — BRIDGE TO E

**FIG label:** `— FIG. D.5 · THE NEXT QUESTION`

**Goal:** the section's *exhalation*. After four diagrammatic-deep slides (D.1–D.4), give the audience a quiet photographic moment that signals section close and primes E's conceptual register without naming it directly.

**Background:** photographic.

**Image-gen prompt (for `gemini-image-gen` MCP):**

> Editorial photograph at first light or dawn. An industrial workspace inside a high-ceilinged room with tall windows. Warm copper-amber morning light streaming through, casting deep shadows. In middle distance: a wooden desk scattered with technical diagrams, hand-sketched flowcharts, and a closed laptop. The room feels like a war room mid-thinking — the strategic work is done, but the engineering work hasn't begun. No people visible. Mood: threshold, momentum, transition between planning and building. Copper-amber accent palette throughout. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

**Layout:** photo full-bleed + editorial overlay (bottom-left, vignette mask on that region for legibility).

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Beat 1 | `Process is the 〔spec〕.` | Instrument Serif ~80px projected, white + copper-italic on `spec` |
| Beat 2 | `Engineering is the 〔system〕 around it.` | Instrument Serif ~72px, white + copper-italic on `system` |
| Bridge line (italic, smaller) | `〔Next〕: how that system gets built.` | Source Serif 4 italic ~40px, neutral-200 + copper-italic on `Next` |

**Components:** `<HeroPhoto src="d5-bridge.jpg" vignetteSide="bottom-left">`, `<FigLabel>`, `<DisplayPhrase>`, `<KeywordHighlight>`.

**Motion (3 advances, no ambient — stillness is the design):**

| Space | What happens |
|---|---|
| 1 | Photo + FIG label visible. Beat 1 stagger-fades in word-by-word (~400ms total). |
| 2 | Beat 2 stagger-fades in word-by-word (~500ms). |
| 3 | Bridge line fades in as a single phrase (~600ms ease-out). |

**Steady-state:** **no ambient.** Slide goes still after Space 3. Like J.1, stillness IS the design.

**Canonical pose:** post-Space 3, all three lines visible over photo, no motion.

---

### 4.6 — Sections E + F — TBD

Per-slide specs pending follow-up brainstorm session. To be filled in when E + F are designed.

**Section E (engineering fundamentals)** placeholder:
- E must lock the *harness* vocabulary (tools, memory, hooks, orchestration, observability, error recovery) so I.3's "HARNESSES" category and the harness-pattern default-state diagram resolve to clear definitions.
- The Russian-doll metaphor (prompt → context → harness) requires deliberate step-reveal pacing.
- Estimated ~5–8 slides.

**Section F (techniques)** placeholder:
- F must define *MCP* and *agent orchestration* clearly enough that I.3's portfolio reads as "concepts you just learned, instantiated."
- Four techniques (MCP / RAG / Skills / Agent orchestration) each get a non-engineer-graspable example.
- Estimated ~6–10 slides.


## 5. Cross-section narrative flow

### 5.1 Within Section D

| Transition | How it reads |
|---|---|
| (Section C closes) → D.1 | C's mindset throughline meets D.1's diagnostic punch — *"AI is the bridge"* lands on *"73% of automation projects fail."* The optimism of C is grounded by D.1's reality check. |
| D.1 → D.2 | D.1's trap → D.2's solution architecture. *"Fix the spec"* (D.1 prescription) becomes *"here are the four levels of automation maturity"* (D.2 toolkit). The audience exits D.1 with a warning and enters D.2 with a framework. |
| D.2 → D.3 | D.2's abstract convergence diagram → D.3's same diagram populated with worked-example content. Tell-then-show; structure-then-embodiment. |
| D.3 → D.4 | D.3's worked example ("here's how it climbs the levels") → D.4's decision pattern ("which level, when, for which problem"). Story-then-rule. |
| D.4 → D.5 | D.4's dense decision diagram → D.5's quiet photographic close. Diagrammatic-then-photographic. The audience exhales. |

### 5.2 D → E (cross-section bridge)

D.5's closing beat (`Engineering is the system around it. Next: how that system gets built.`) primes E without naming the term *harness*. E.1 will name the harness as the system, completing the bridge.

### 5.3 Meta-callbacks (cross-slide structural payoffs)

- **D.1 ↔ D.4:** D.1's amplification statistic (the trap) returns as D.4's STOP↻ loopback (the trap's visual presence). The only ambient motion in D.4 is on STOP↻ — a structural reminder that the trap exists.
- **D.2 ↔ D.3:** D.3's reassembly *recreates D.2's exact geometry* but populated with monthly-report content. The audience watches the abstract diagram come alive with reality.
- **D motion grammar:** every visualization on D.1 grows from zero (counter-up + scaling rule + animated bars). D.2's connector arrows draw via `pathLength` 0→1. D.3's bars and cards tween into position. D.4's terminal-level cards rise from below. The deck-wide grammar is *"things assemble in front of you."*

## 6. Animation budget

Section D total logical advances: **22**.

| Slide | Advances |
|---|---|
| D.1 | 4 |
| D.2 | 5 |
| D.3 | 5 |
| D.4 | 5 |
| D.5 | 3 |
| **Total** | **22** |

At ~30s per advance baseline (per meta-spec §5.4), Section D occupies **~11 minutes** of pure advance-delivery time. Plus dwell time on D.2 / D.3 hover layers and D.5's photographic exhale: realistic budget **~13–16 minutes total** for Section D.

In context of the meta-spec's overall budget (~170–200 advances for 90–100 minutes of pure delivery), Section D consumes ~12% of the advance budget — appropriate for the section that establishes the deck's process-improvement spine.

E and F advance budgets pending separate brainstorm.

## 7. Content references

For implementation, pull canonical content from:

| Source | What's there |
|---|---|
| `docs/researches/topic-process-improvement.md` | BPM/RPA/IPA/Agentic taxonomy, 73% statistic, decision framework, mining and generic examples, anti-patterns. Used for D.1, D.2, D.3, D.4. |
| `docs/researches/topic-ai-engineering-fundamentals.md` | Prompt/context/harness three-layer stack, ReAct loop, harness components. **Will be used for Section E** when brainstormed. |
| `docs/researches/topic-ai-techniques.md` | MCP, RAG, Skills, Agent orchestration. **Will be used for Section F** when brainstormed. |
| `docs/specs/2026-05-06-process-and-design-meta.md` | Substrate, design system, palette, typography. Consumed throughout. |
| `docs/specs/2026-05-07-slides-reveal-and-closing.md` | Tonal precedent, primitive specifications (FigLabel, KeywordHighlight, HeroPhoto, etc.), animation patterns. Consumed throughout. |

## 8. Implementation notes

### 8.1 Suggested file structure

```
src/slides/foundation-core/
  d1-the-trap.tsx
  d2-the-convergence.tsx
  d3-one-process-four-levels.tsx
  d4-decision-pattern.tsx
  d5-bridge-to-e.tsx
  components/
    AmplificationBar.tsx
    ConvergenceCard.tsx
    LevelCard.tsx           // morphs across focal | filed | converged via layoutId
    LadderRise.tsx          // parent
    LadderQuestion.tsx
    LadderTerminal.tsx
    LadderLoopBack.tsx
    CountUp.tsx
  glyphs/                       // motion-design vignettes for D.3 (per §4.3.1)
    BpmCompressionGlyph.tsx     // 20 squares merge into 8 (compression vignette)
    RpaAccelerationGlyph.tsx    // 6 weekday tick-dots collapse into a bolt strike
    IpaSynthesisGlyph.tsx       // 8 raw-data bars synthesize into an insight pulse
    AgenticInversionGlyph.tsx   // arrow flips 180°; YOU↔REPORT swap; ↻ loopback
  // Sections E + F will add additional sub-folders
```

### 8.2 Substrate dependencies

- shadcn UI (Card, Button — adapted to 0px radius and single-shadow recipe)
- Tailwind CSS (design tokens)
- Framer Motion (all motion, including `layoutId` for `<LevelCard>` morph and `useMotionValue` + `useTransform` for `<CountUp>`)
- No paid components / fonts / libraries (per memory rule)

### 8.3 Build order recommendation (lowest-risk first)

1. **`<CountUp>`** — simplest primitive; needed by D.1, by D.3 glyphs (BPM counter), and reusable across the deck.
2. **`<AmplificationBar>`** — composes `<CountUp>`; D.1 ready after this.
3. **`<ConvergenceCard>`** — static synthesis card; D.2 ready after this.
4. **D.3 motion-design glyphs** — build the four vignette components (`<BpmCompressionGlyph>`, `<RpaAccelerationGlyph>`, `<IpaSynthesisGlyph>`, `<AgenticInversionGlyph>`) as standalone components first, with a dev-only "play loop" wrapper for visual verification. Each glyph is a self-contained ~280×140px motion piece; verify each independently against the §4.3.1 timing tables before composing into `<LevelCard>`.
5. **`<LevelCard>` with `layoutId` morphing** — most complex new primitive; D.3 ready after this. Validate `mode` transitions between `focal` / `filed` / `converged` independently. Glyphs accept `play={mode === 'focal'}` so animation runs only on focal entry; `filed` and `converged` modes render glyph end-states statically at reduced scale.
6. **`<LadderRise>` family** — D.4 specific; uses `<PulseGlow>` (existing) for STOP↻ ambient.
7. **D.5** — uses only existing primitives (`<HeroPhoto>`, `<DisplayPhrase>`, etc.); ship last.

### 8.4 Glyph implementation notes

Each glyph in `glyphs/` follows a shared pattern:

- **Pure SVG + Framer Motion.** No canvas, no WebGL, no external animation libraries. Keeps the bundle light and fits the free-stack constraint.
- **One-shot orchestration.** Each glyph exports a single component accepting `{ play: boolean }`. When `play` flips `false → true`, the entry sequence runs once via Framer Motion `useAnimate` or a sequence of `motion` components with `animate` props keyed off `play`. After the sequence completes, the component holds its end-state until `play` flips back to `false`.
- **Phase tables in §4.3.1 are authoritative.** Implement the timings exactly as specified; if a phase feels off in motion testing, adjust *and update the spec*, not just the code.
- **Counter integration.** `<BpmCompressionGlyph>` and `<RpaAccelerationGlyph>` use `<CountUp>` for inline numeric values (20→8 for BPM, manual hours stat for RPA). Use the same instance type — don't re-implement counting logic per glyph.
- **Copper-glow halos.** `<IpaSynthesisGlyph>` and `<AgenticInversionGlyph>` use copper-glow halos via SVG `<filter>` with `<feGaussianBlur stdDeviation="3" />` + a copper-300 fill on the duplicated path. Avoid CSS `filter: drop-shadow()` for the halos — SVG filter gives sharper control over the glow falloff.
- **End-state previewable.** Each glyph component should render its end-state when `play={false}` and the component has not yet animated. This makes filed/converged-mode rendering trivially correct and lets storybook-style previews show the static result without triggering the full sequence.

### 8.5 `<LevelCard>` mode-transition design notes

`<LevelCard>` is the single most reusable primitive Section D produces. Future deck slides that walk through stages or levels can lean on it. Specification:

- **Props:** `level` (`bpm` | `rpa` | `ipa` | `agentic`), `mode` (`focal` | `filed` | `converged`), `position` (`center` | `bpm-tl` | `rpa-tr` | `ipa-c` | `agentic-r`), `content` (Ask / Do / glyph / Outcome).
- **`layoutId`:** stable across mode changes, keyed by `level-${abbrev}`. Framer Motion auto-tweens between modes.
- **Mode `focal`:** full content visible, large composition (~70% slide width, vertical center).
- **Mode `filed`:** compact summary (number + abbreviation + 1-line outcome + chevron), positioned at upper-left of slide.
- **Mode `converged`:** matches `<ConvergenceCard>` slot dimensions and content shape; populated with `position` prop's geometry.
- **Tween defaults:** Framer's auto-tween via `layoutId` with `transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}` (`easeOutExpo`).

## 9. Open items (TBD at implementation or follow-up brainstorm)

| Item | Owner | Why open |
|---|---|---|
| **Sections E + F per-slide specs** | Adri (follow-up brainstorm) | Pending separate brainstorm session — depth required matches Section D |
| Final image-gen prompt for D.5 hero photo | Implementation | Drafted prompt above; will refine via gemini-image-gen iterations |
| Lock specific citation for 73% statistic | Adri | The 73% number is the load-bearing data point on D.1. Research draws on multiple sources ("70–85% of automation projects fail" attributed to McKinsey; "73% try to automate broken processes" cited across multiple automation industry sources without a single canonical publisher). Current caption uses generic "automation industry research, 2024–2026" attribution. Lock a single defensible source at implementation — either confirm McKinsey's specific framing supports the 73% number, or attribute to the strongest specific source available. |
| Final copper hex ladder | Implementation | Settled at projection-test time per meta-spec §6.5 |
| Final projection-scale font sizes (px) | Implementation | Calibrated during projection testing per meta-spec §7.2 |
| Cross-slide advance pacing | Implementation | ~30s/advance baseline; speaker rehearsal will tune |
| Canonical-pose freeze frames | Implementation | Defined per slide above; capture during PDF/PPTX export pipeline (per meta-spec §4.1) |
| D.4 Q2 inversion legibility | Implementation | Q2's NO → BPM (vs. YES branches everywhere else going to terminal levels) is intentional but slightly counter-intuitive. Implementation should validate the visual labeling makes the inversion legible at projection scale; if it confuses, consider re-framing Q2's wording. |

## 10. Acceptance criteria

A given Section D slide is "done" when:

- All content slot-table values are present in the slide
- All keyword highlights appear in copper-italic per memory rule
- FIG label appears top-left with correct `section.num` and label
- All declared logical advances trigger correctly via Space
- Hover interactions (where applicable) reveal the specified payload
- Targeted ambient (D.4 STOP↻ only) runs at the specified period; no other ambient on D
- Canonical pose can be captured cleanly for PDF/PPTX export
- No paid dependencies introduced
- Visual matches the spec at projection scale (validated via real-slide projection test per meta-spec §6.5)

Section D as a whole is "done" when:

- All 5 slides individually pass acceptance
- Inter-slide narrative flow holds (per §5.1)
- D.1 → D.4 trap callback (STOP↻ ambient) is visible
- D.2 → D.3 geometry rhyme (D.3 reassembles into D.2's shape) lands cleanly
- Total logical advances match §6 budget (22 ± 1)
- Implementation plan (next step) has been validated against this spec

The Foundation Core sub-spec as a whole is "done" when:

- Section D is shipped per the criteria above
- Sections E + F are brainstormed, specified, and shipped per their own acceptance criteria (to be added in this spec when E + F are designed)
- Cross-spec dependencies with I.3 (harness vocabulary, MCP, agent orchestration) resolve — i.e., when an attendee reaches I.3, the terms used there were all defined in E + F

## 11. Next step

This spec is ready for review on the Section D portion. Sections E and F require a follow-up brainstorm session — recommended as a fresh session (not continuation), per the depth required to match Section D's design fidelity.

Order of operations:

1. **User reviews this spec** for Section D accuracy + completeness; revisions inline.
2. **Fresh brainstorm session** for Sections E + F → spec gets Sections E.1 → E.N and F.1 → F.N filled in.
3. **Self-review pass** on the full spec (D + E + F).
4. **Invoke `superpowers:writing-plans`** (per parent meta-spec §13) to produce the implementation plan for the full Foundation Core sub-spec — sequencing component primitives → static slides → diagrammatic slides → cinematic slides, with review checkpoints between each phase.
