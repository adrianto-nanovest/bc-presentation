# Slides — Foundation Core — Section E — Spec

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Sub-spec:** Foundation Core arc — **Section E** (Engineering Fundamentals — Prompt / Context / Harness Russian doll)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Revised 2026-05-09 (E.8 caption+sub-line restructure · E.9 thesis-slide v2 · E.10 eight-practices grid v4 with expand-shrink · E.11 two-beat photographic exhale · E.1 per-pattern connector motion specs · plan-split into Plan A + Plan B)
**Source brainstorm:** in-context 2026-05-08, 2026-05-09
**Parent meta-spec:** [`docs/specs/2026-05-06-process-and-design-meta.md`](2026-05-06-process-and-design-meta.md)
**Sibling specs:**
- [`docs/specs/2026-05-08-slides-foundation-core.md`](2026-05-08-slides-foundation-core.md) — Section D (process improvement; tonal precedent)
- [`docs/specs/2026-05-07-slides-reveal-and-closing.md`](2026-05-07-slides-reveal-and-closing.md) — Sections I, J, K. **Houses the cross-spec dependency on harness vocabulary (I.3 portfolio simulations).**

## 0. Scope

This spec covers per-slide design for **Section E — Engineering fundamentals** of the Foundation Core arc. It is intentionally a **separate file from the Foundation Core sub-spec** so that downstream agents (planner, implementer) can work on Section E with a focused context window.

- **Section E** — Prompt / Context / Harness Russian doll. **11 slides, 47 logical advances.**

Explicitly NOT in scope (each has its own spec):
- Section D (process improvement) — `2026-05-08-slides-foundation-core.md`
- Section F (techniques: MCP, RAG, Skills, Agent Orchestration) — pending separate brainstorm
- Sections A (Hook 1), B, C — separate sub-specs
- Sections G, H — separate sub-specs
- Sections I, J, K — `2026-05-07-slides-reveal-and-closing.md`
- Practice-lab curriculum
- Final copper hex ladder (settled at implementation per meta-spec §6.5)
- Projection-scale font calibration (refined at implementation per meta-spec §7.2)

## 1. Section structure (locked)

| # | Slide | Beat | Animation mode | Background tier |
|---|-------|------|----------------|-----------------|
| **E.1** | THE THREE LAYERS | Russian-doll opener with expand-shrink-reveal across 3 concentric circles + multi-agent orchestration loop on Space 6 + Anthropic quote | Step-reveal | Diagrammatic (plain dark + dot grid) |
| **E.2** | PROMPT — what & why | Layer 1 definition + naive-vs-proper case study (anchor task: weekly project report) + impact ladder rung 1 | Step-reveal + hover | Diagrammatic |
| **E.3** | PROMPT — structure | 6-element canonical structure spine + 10-framework hover orbit (RACE/CARE/APE/etc) | Step-reveal + hover popover | Diagrammatic |
| **E.4** | PROMPT — methodologies | 8 techniques in 3 tiers (Basic/Intermediate/Advanced) + click-to-expand modals with bulleted content + foreshadow pulse on RAG/ART/ReAct | Step-reveal + click-modal | Diagrammatic |
| **E.5** | PROMPT — the wall | Best Practices + Common Mistakes (top split) + WHERE PROMPT ENDS section with 6 constraint bullets (bottom) | Step-reveal (no ambient) | Diagrammatic |
| **E.6** | CONTEXT — what & why | Hub-and-spoke with CONTEXT at center + 6 peer satellites (icons + labels) + inward-flow + clockwise highlight ambient + impact ladder rung 2 | Step-reveal + hover popover + ambient | Diagrammatic |
| **E.7** | CONTEXT — strategies | 4-ring funnel (Write/Select/Compress/Isolate) + continuous left-to-right particle flow with per-ring kinetic behavior | Step-reveal + hover popover + ambient | Diagrammatic |
| **E.8** | CONTEXT — the wall | 30/70 split: 4 pitfalls (Conflict/Confusion/Poisoning/Distraction) on left + morphing animated illustration canvas on right + chaos-arrows ambient on default canvas + Mitigated-by tags | Step-reveal + hover-canvas-morph + ambient | Diagrammatic |
| **E.9** | HARNESS — what & why | Compression sequence (network folds into harness package) + 6-mitigation Includes row + thesis (`Agent = Model + Harness` equation + Cursor quote + 4-line stanza) + impact ladder rung 3 (full ladder lit) | Step-reveal | Diagrammatic |
| **E.10** | HARNESS PRACTICES | 2×4 grid of 8 practices (Orchestration · Plugins · Memory · Observability · Triggers · Spec-driven · HITL · Ralph Wiggum) + click-to-expand-shrink (1+7 reflow with close button); Orchestration card hosts the pattern diagram | Step-reveal + click-to-expand-shrink | Diagrammatic |
| **E.11** | BRIDGE TO F | Photographic close (analogue to D.5) — *"Three layers. The fundamentals are built. Next: the techniques that matter most."* | Step-reveal (no ambient) | **Photographic** |

**Section E total: 11 slides · 47 logical advances.** Largest section in the deck — appropriate for the conceptual heart.

### 1.1 Click-driven motion discipline

All Section E slides use **click-driven advance pacing** — one Space press per speaker beat. Internal motion within an advance auto-completes (typing animations, ring draws, etc.) but advances to the *next* beat require explicit Space press. Speaker has full control over pacing.

This contrasts with Section D's existing approved pattern (which has more auto-timed phases per advance). Section D click-granularity revisit is **flagged as a separate open question** for after Section E ships — not litigated here.

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
| Free-only stack (no paid components/fonts/libraries) | `feedback_no_paid_components.md` |

Substrate: shadcn UI + Tailwind + Framer Motion (per meta-spec §8.1). Typography: Instrument Serif (display), Source Serif 4 (body), Inter (sans), JetBrains Mono (mono) — all per meta-spec §7. Single accent: deep copper `#b86e3d` and derived stops + grayscale (per meta-spec §6.5).

### 2.1 Section E interaction grammar (additional discipline)

Section E introduces a **deliberate two-tier interaction grammar** for cards and items:

| Interaction | Use case | Example slides |
|---|---|---|
| **Hover** | Quick reference / preview / preview-highlight (gestural-safe) | E.3 spine elements, E.3 framework tiles, E.6 satellites, E.7 strategy rings |
| **Hover-popover** | Quick-reference depth (~6 lines per popover) | E.3, E.6, E.7 |
| **Click-to-expand modal** | Real teaching depth with bulleted content + close button | **E.4 technique cards only** |
| **Click-to-expand-shrink (1+7 reflow)** | Grid of equal cards reflows to 1 expanded + 7 compact siblings on click; close button + click-outside + click-same to dismiss | **E.10 only** (practices grid) |
| **Hover-canvas-morph** | Split-screen left list + morphing right canvas | **E.8 only** (and primes I.3 portfolio interaction) |

This distinction is observed throughout Section E. Cards with *real teaching depth* (E.4 techniques) use click-to-expand modals; cards with *quick reference info* use hover-popover. E.8's hover-canvas-morph is its own pattern — and a structural rhyme with I.3's split-screen.

### 2.2 Anchor task (locked)

Section E uses **"this Friday's weekly project report"** as the threaded anchor task across:

- E.2 — naive-vs-proper case study (the prompt itself)
- E.6 — what-info-the-model-needs (context components)
- E.7 — hover popover examples for each strategy ring
- E.9 — implicit (the harness automates this recurring task)
- E.10 — implicit (the practices wrap the same recurring task)

The task is generic, knowledge-work-universal, demonstrates all three layers cleanly, and has natural cadence pressure (recurring weekly → justifies harness's "build once, use forever").

## 3. Cross-cutting primitives

### 3.1 Reused from sibling specs

These primitives were specified in [Reveal + Closing §3](2026-05-07-slides-reveal-and-closing.md#3-cross-cutting-primitives) and/or the Foundation Core sub-spec, and are consumed unchanged here.

| Primitive | Used on (Section E) |
|---|---|
| `<FigLabel section, num, label>` | All 11 slides |
| `<KeywordHighlight>` | All 11 slides |
| `<HeroPhoto src, vignetteSide>` | E.11 |
| `<HoverReveal trigger, payload>` | Most slides (deprecated — superseded by `<HoverPopover>` for richer payloads) |
| `<DisplayPhrase staggerType, words>` | E.11 |

### 3.2 New primitives introduced by Section E

Build during foundation-core implementation; reusable across the deck thereafter.

| Primitive | Purpose | Used on |
|---|---|---|
| `<LayerCard layer, mode>` with `layoutId={\`layer-${name}\`}` and `mode ∈ {focal, nested}` | Concentric Russian-doll layer card. `mode="focal"` = full-stage with internal demonstration; `mode="nested"` = sized + positioned for final composition. Framer Motion `layoutId` auto-tweens between modes. Analogous to D.3's `<LevelCard>` morph machinery. | E.1 |
| `<LayerDemo kind>` with `kind ∈ {prompt-typing, context-network, multi-agent-orchestration}` | Renders the focal-mode internal demonstration; one variant per layer in E.1 | E.1 |
| `<MultiAgentOrchestration agents, patterns, loopDuration>` | Renders agent cluster (`MAIN AGENT` + `AGENT A` · `AGENT B` · `AGENT C`) + cycling 4-pattern loop (centralized · decentralized · chain · parallel). Each pattern has a distinct connector-motion signature: round-trip pulses (centralized), bidirectional pulses (decentralized), single sequential pulse (chain — agents only, no orchestrator), synchronized burst (parallel). Reusable in F (agent orchestration technique) and potentially I.3 | E.1 (Space 6 ambient loop) |
| `<NaiveVsProper naivePrompt, properPrompt, naiveResult, properResult>` | Split-pane case-study primitive. Top: NAIVE prompt + truncated naive result. Bottom: PROPER prompt with inline element labels + structured result preview. Result previews fade-truncate to ~6 lines. Configurable element list (4 or 5 labels supported). | E.2 |
| `<StructureSpine elements>` | Vertical 6-element spine (Role · Instruction · Output Format · Context · Examples · Input) with thin copper-rule connectors and numeric badges. Supports compact default state + rich hover popovers per element. | E.3 |
| `<FrameworkOrbit tiles, positions>` | Loose 5+5 orbit positioning of framework acronym tiles around a center stage. On hover any tile, tooltip shows breakdown + the spine elements that the framework maps to glow copper-300. | E.3 |
| `<HoverPopover trigger, content>` | Anchored, rich-content version of `<HoverReveal>`. Popover anchored to the hovered element, positions to whichever side has more breathing room. Supports ~6 lines of content per popover. Replaces `<HoverReveal>` in Section E. | E.3, E.6, E.7 |
| `<TechniqueCard kind, onExpand>` + `<TechniqueModal kind, content, onClose>` | Click-to-expand modal pattern. Default state: card with name + 1-line essence. Hover: border copper-glow + slight scale (no content reveal — gestural-safe). Click: card expands into centered modal (~60% slide width × ~70% slide height) with bulleted Best-for / Example / Trade-off content + close button `×`. | E.4 |
| `<TieredTechniqueGrid tiers>` | 3 horizontal tier bands stacked vertically (BASIC / INTERMEDIATE / ADVANCED) with cards inline within each tier. Progressive copper saturation per tier (copper-700 → copper-300). | E.4 |
| `<NodeNetwork variant, state, centerNode, satellites, icons>` | **Section E's signature primitive.** Hub-and-spoke renderer. `variant="context-hub"` = CONTEXT at center, 6 peer satellites with thin-line copper Lucide icons. Three states drive cross-slide transformation: `activated` (E.6: bright + clean inward flow), `stamped` (E.8: dimmed + STILL MANUAL stamp + chaos arrows), `compressed` (E.9: nodes fold inward into harness package silhouette). Framer Motion `layoutId` per node tweens satellite positions smoothly between states. | E.6, E.8 (default canvas), E.9 |
| `<ImpactLadder rungs, currentRung, mode="number-free">` | Qualitative 3-rung ladder shown in slide footer. Rungs labeled (Layer 1: prompt-only · Layer 2: prompt + context · Layer 3: prompt + context + harness). Lit rungs render copper-400; unlit copper-800. **`mode="number-free"` is locked** — no 60/85/95 figures (research-decision per brainstorm). Hover any rung reveals 1-line description. | E.2 (rung 1), E.6 (rung 2), E.9 (rung 3) |
| `<StrategyRings rings, particleFlow>` | 4 horizontal flat ring tiles (Write/Select/Compress/Isolate) with progressive copper saturation + arrow connectors. Continuous particle-flow ambient: dots spawn from left edge, traverse all 4 rings with per-ring kinetic behavior (pause/filter/merge/split), exit right edge. | E.7 |
| `<PitfallCanvas activeKind defaultIllustration>` | 30/70 split-screen primitive with morphing right canvas. Hover left item → right canvas morphs to that item's animated illustration via cross-fade. Releasing hover returns to default illustration. **Structural rhyme with I.3's `<HarnessCanvas>`.** | E.8 |
| `<PitfallIllustration kind>` with `kind ∈ {default, conflict, confusion, poisoning, distraction}` | Per-pitfall animated illustration component. Each variant is a self-contained SVG + Framer Motion piece (~340×280px). The `default` variant renders the `<NodeNetwork state="stamped">` with STILL MANUAL stamp + chaos arrows. | E.8 |
| `<HarnessPackage label, subLabel, includes>` | Flat 0px-corner box with thin copper border. Interior: HARNESS label + sub-label `Automates context engineering` + Includes row collecting 6 mitigation names from E.8 (per-name copper-glow on stagger-reveal) + input/output arrows `request →` / `→ result`. **Note:** E.9 v2 dropped the 5-component row that was previously inside this primitive — they're now redundant with E.10's anatomy (visualized inside the Orchestration practice card). | E.9 |
| `<ThesisPanel equation, quote, stanza, attribution>` | Right-side anchor for E.9's thesis. Renders the `Agent = Model + Harness` equation in Instrument Serif large + Cursor quote with attribution + 4-line stanza in 4-beat rhythm. Equation builds word-by-word with deliberate pause before `Harness`. | E.9 |
| `<PracticeGrid practices>` + `<PracticeCard practice, expanded>` | **2×4 grid → 1+7 reflow** primitive for E.10. Default state: 8 equal-size cards. Click any card → selected expands to ~50% of practices area, others compress into a vertical strip on the side as icon + name only. Three close behaviors: × button on expanded card · click outside · click selected card again. Framer Motion `layoutId` per card drives smooth grid-to-strip reflow. The Orchestration practice card hosts an embedded `<HarnessPattern>` instead of bullet content. Reusable for any future "menu of disciplines" slide. | E.10 |
| `<HarnessPattern orchestrator, subAgents, tools>` | **Critical cross-spec primitive.** The Main Agent + delegate-branch (sub-agents) + tools-branch diagram. In E.10 it lives inside the Orchestration practice card's expanded view; in I.3 it lives as the `<HarnessCanvas>` default state. Visually identical across both surfaces — same component, single source of truth. Build once, reuse on both. | E.10 (inside Orchestration practice), I.3 |

All primitives are flat (0px corner radius), single-shadow recipe, copper-only color, free-stack-compatible.

### 3.3 Icon library (free)

Lucide (formerly Feather) — MIT-licensed, thin-stroke aesthetic — is the icon library for Section E. All icons are 1.5px stroke, copper-300 color, no fill.

| Slide | Lucide icons used |
|---|---|
| E.6 satellites | `MessageSquare` (User Prompt) · `Shield` (System Instructions) · `History` (Conversation Memory) · `BookOpen` (RAG Knowledge Base) · `Wrench` (Tools & APIs) · `Archive` (Persistent Memory) |
| E.8 pitfalls | `GitMerge` (Conflict) · `Triangle` (Confusion / iceberg) · `Droplets` (Poisoning) · `TrendingDown` (Distraction) |
| E.10 practices (8 cards) | `Network` (Orchestration) · `Package` (Plugins) · `Brain` (Memory) · `Activity` (Observability) · `Zap` (Triggers) · `FileText` (Spec-driven) · `Users` (HITL) · `Repeat` (Ralph Wiggum) |

## 4. Per-slide specs

### 4.1 — E.1 — THE THREE LAYERS

**FIG label:** `— FIG. E.1 · THE THREE LAYERS`

**Goal:** Open Section E by naming all three layers and planting the Russian-doll metaphor as both *visual* and *causal* — each layer encloses the previous because the previous would fail without it. Bridge cleanly from D.5's `Engineering is the system around it. Next: how that system gets built.`

**Background:** plain dark (copper-950) + 4–6% opacity dot grid texture.

**Layout:** single-stage expand-shrink-reveal. Each layer takes the full center stage during its focal moment with an internal demonstration, then shrinks to its concentric position. Final state: three concentric labeled circles + Anthropic quote.

**Geometry decision (one-time exception to 0px-corner discipline):** **concentric circles** (not squares). E.1 is the section's establishing diagram; the circles are an *explanatory diagram* of an abstract concept, in the same category as D.2's connector arrows and D.4's staircase shape. All other E slides keep 0px-corner discipline. Inner circle ~25% area; middle ~55%; outer ~85%. Each ring's border is 1px copper-stop (inner=copper-700 → outer=copper-300, progressive lightening).

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `Three layers. 〔Each one contains the last〕.` | Instrument Serif ~64px projected, white + copper-italic on `Each one contains the last` |
| Inner circle — label | `PROMPT` | Inter mono ~22px, copper-400 |
| Inner circle — essence | `the 〔instructions〕` | Source Serif 4 italic ~28px, white + copper-italic on `instructions` |
| Middle circle — label | `CONTEXT` | Inter mono ~22px, copper-300 |
| Middle circle — essence | `the 〔information〕` | Source Serif 4 italic ~28px, white + copper-italic on `information` |
| Outer circle — label | `HARNESS` | Inter mono ~22px, copper-200 |
| Outer circle — essence | `the 〔system〕` | Source Serif 4 italic ~28px, white + copper-italic on `system` |
| Footer quote | `〔A decent model with a great harness beats a great model with a bad harness〕. — Anthropic` | Source Serif 4 italic ~28px, neutral-300 + copper-italic on the quote, centered |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<LayerCard>` × 3, `<LayerDemo>` × 3 (one per layer), `<MultiAgentOrchestration>` (Space 6 loop only).

**Motion (7 advances, click-driven, no post-Space-7 ambient):**

| Space | Trigger | What happens (after click) | Speaker beat |
|---|---|---|---|
| **1** | Click | PROMPT circle outline draws (~600ms) + label fades in. Inside: caret blinks, ready to type. | *"Let's start with the inner core: prompt."* |
| **2** | Click | Structured prompt builds line-by-line in monospace inside the PROMPT circle, with inline copper-300 element tags `Role:` / `Task:` / `Context:` / `Examples:` / `Output:`. Total ~6 seconds typing. After completion: brief copper-glow on the whole block. | *"What's a proper prompt? Not 'write me this week's report' — it's structured: Role, Task, Context, Examples, Output. Like this..."* |
| **3** | Click | PROMPT circle shrinks to inner-ring position (~700ms) ⟂ CONTEXT circle simultaneously expands around it (~700ms parallel) + label `CONTEXT — the information` fades in. | *"But that's just the inner core. Around it: context."* |
| **4** | Click | Inside CONTEXT ring: 6 satellite nodes appear with connector lines from PROMPT center, stagger reveal (~1500ms total). Labels: `system instructions` · `user memory` · `RAG knowledge` · `tools & APIs` · `state` · `output`. | *"Context is everything else the model can see — tools, memory, knowledge, output format."* |
| **5** | Click | CONTEXT composition shrinks to middle-ring position (~700ms). Satellites become small dim dots within the CONTEXT ring. ⟂ HARNESS circle simultaneously expands around the whole thing (~700ms parallel) + label `HARNESS — the system` fades in. | *"And around context: the harness."* |
| **6** | Click | Inside HARNESS ring: cluster of 3 agent boxes (`AGENT A` · `AGENT B` · `AGENT C`) appears, each containing miniature `ctx + prompt` labels. A `MAIN AGENT` box sits at top inside HARNESS. **Orchestration loop begins** — cycles through 4 patterns (centralized · decentralized · chain · parallel) at ~1.5s each, ~6s full loop. Each pattern labeled inline. Loop continues until next click. | *"The harness orchestrates multiple agents — each with their own context and prompt — working together. Could be centralized, decentralized, chained, or parallel."* |
| **7** | Click | Orchestration loop ends, HARNESS demo composition shrinks to outer-ring position (~700ms). Final state: three concentric labeled rings. Anthropic quote fades in below (~600ms). | *"All three matter together. As Anthropic puts it: a decent model with a great harness beats a great model with a bad harness."* |

**Multi-agent orchestration loop (Space 6 ambient):** while on Space 6, the loop cycles through 4 patterns continuously. Each pattern carries a **distinct connector-motion signature** so the audience reads it at a 1.5s glance:

**Common motion framework:**
- **Particle visual:** copper-300 dot, ~6px diameter, soft copper-200 glow halo (~12px), traveling along the connector line
- **Animation engine:** Framer Motion + SVG `<animateMotion>` along path (or `motion.div` with `offsetPath`)
- **Per-pattern cycle:** ~1.5s = ~200ms fade-in (lines materialize) + ~1100ms active flow + ~200ms fade-out
- **Inactive lines/agents:** drop to ~30% opacity (or 0% for Chain) during patterns where they're not wired

| Pattern | Lines + topology | Flow direction | Connector motion (the signature) | Inline label |
|---|---|---|---|---|
| **Centralized** | 3 lines: MAIN AGENT→A, MAIN AGENT→B, MAIN AGENT→C | **Round-trip** — outbound + return | Outbound pulses depart MAIN AGENT with **~80ms stagger** (Main Agent dispatches one-by-one); each pulse ~400ms `easeOut` to its agent; brief copper-flash at agent on receipt (~150ms); return pulse spawns at agent, travels back to MAIN AGENT in ~400ms `easeIn`. All 3 round-trips complete within the 1.1s active window. **Mental impression:** Main Agent as conductor. | `Pattern: centralized` |
| **Decentralized (A2A)** | 3 lines: A↔B, B↔C, A↔C; **MAIN AGENT dims to ~30%** (not active) | **Bidirectional simultaneously** on every line | Each peer line carries **2 pulses traveling in opposite directions** (e.g., on A↔B: one dot A→B + one dot B→A traveling at the same time, **passing each other mid-line**). 6 simultaneous pulses across the 3 peer lines. Each ~600ms `linear` (peers as equals — no acceleration). Brief glow at each receiving agent (~100ms). | `Pattern: decentralized (A2A)` |
| **Chain** | 2 segments: A→B, B→C — **agents only**, no MAIN AGENT involvement; **MAIN AGENT dims to ~30%** | **Sequential single pulse** along the path | One copper-300 pulse spawns at AGENT A. **Segment 1** (A→B): ~400ms `easeOut`. Brief glow + ~100ms hold at B (the baton-pass beat). **Segment 2** (B→C): ~400ms `easeOut`. Final glow at C (~150ms). Total ~1.05s — fits the active window. Other peer/spoke lines hidden (0% opacity). **Mental impression:** baton pass, relay race. | `Pattern: chain` |
| **Parallel** | 3 lines: MAIN AGENT→A, MAIN AGENT→B, MAIN AGENT→C *(same topology as Centralized)* | **Synchronized burst — all-at-once** | **3 outbound pulses depart simultaneously** (~0ms stagger; within 20ms tolerance). All 3 arrive at agents at the exact same instant (~400ms travel). **All 3 agents copper-glow brightly and simultaneously** for ~600ms — showing "all active in parallel." 3 return pulses depart simultaneously, arrive at MAIN AGENT simultaneously (~400ms). **Mental impression:** starting gun — fire and wait for all to return. | `Pattern: parallel` |

**How Centralized vs Parallel differ visually** (the hardest distinction — same line topology):

| | Centralized | Parallel |
|---|---|---|
| Outbound stagger | ~80ms between agents | **~0ms — simultaneous** |
| Agent glow | Sequential, brief on receipt | **All 3 glow brightly together for ~600ms** |
| Return stagger | ~80ms between agents | **~0ms — simultaneous** |
| Mental impression | Main Agent *coordinates* one-by-one | Main Agent *fires* and *waits* for all |

Each pattern displays for ~1.5s with ~300ms morph between patterns. **The 4 patterns plant seeds for F (agent orchestration technique) and I.3 (portfolio simulation orchestration variants) — not just the topologies but the *signature motions*. Recognition payoff is automatic when patterns reappear.**

**Hover (post-Space 7, each ring):** subtle copper-glow on the hovered ring + 1-line teaser:
- PROMPT → "How clearly you ask. We'll unpack this next."
- CONTEXT → "What the model can see. Comes after prompt."
- HARNESS → "The system around the model. The outer shell of the doll."

**Canonical pose:** post-Space 7. All three concentric labeled rings + Anthropic quote visible.

**Cross-slide hooks:**
- D.5 → E.1: D.5's `Engineering is the system around it.` resolves to E.1's outer-ring `HARNESS · the system`. Phrase rhyme: *"the system."*
- E.1 → E.2: structured prompt typed in Space 2 is the same as the PROPER prompt fully unpacked in E.2's case study
- E.1 → E.5/E.6: 6 satellite nodes in Space 4 plant visual seeds for the dim/activated nodes the audience encounters later
- E.1 → E.10: orchestrator silhouette in Space 6 is the static form of E.10's harness pattern

---

### 4.2 — E.2 — PROMPT — what & why

**FIG label:** `— FIG. E.2 · PROMPT`

**Goal:** Layer 1 deep dive. Define prompt in plain language. Pay off E.1's structured-prompt seed by explicitly contrasting it with a naive version + showing the result-quality difference. Light impact ladder rung 1.

**Background:** plain dark + dot grid texture.

**Layout:** split-pane. **Left (~40%):** definition + 3 outcome bullets + bridge caption (WHY-not-WHAT framing). **Right (~60%):** naive-vs-proper case study (top half = naive prompt + naive result; bottom half = proper prompt + proper result). **Footer:** qualitative impact ladder.

**Anchor task content:**

```
Role: You are a project lead preparing the Friday status report.
Task: Draft a concise weekly status — (1) what shipped, (2) what's at risk,
      (3) what's planned for next week.
Context: For the EOD Friday team standup. Audience: 8 cross-functional
         stakeholders. Last week we missed a milestone on Module B.
Examples: See last week's report (attached) — match structure, tone,
          and focus areas.
Output: Markdown, H2 sections, ~250 words. Lead with the at-risk item.
```

**Naive prompt:** `Write me this week's project report.`

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `Layer 1: 〔Prompt〕 — clarity.` | Instrument Serif ~56px, white + copper-italic on `Prompt` |
| Left — definition | `The 〔instructions〕 you give the model.` | Source Serif 4 ~32px, white + copper-italic on `instructions` |
| Left — outcome bullet 1 | `〔Vague in〕 → vague out.` | Source Serif 4 italic ~22px, copper-italic on `Vague in` |
| Left — outcome bullet 2 | `〔Structured in〕 → structured out.` | Source Serif 4 italic ~22px, copper-italic on `Structured in` |
| Left — outcome bullet 3 | `〔Show what good looks like〕 → fewer iterations, more useful results.` | Source Serif 4 italic ~22px, copper-italic on `Show what good looks like` |
| Left — bridge caption | `Next: the 〔canonical structure〕 behind every good prompt.` | Source Serif 4 italic ~20px, neutral-300 + copper-italic on `canonical structure` |
| Right top — header | `〔NAIVE〕` | Inter mono ~16px, copper-400, all caps |
| Right top — naive prompt | `Write me this week's project report.` | JetBrains Mono ~22px in copper-700-bordered code block |
| Right top — naive result | Generic boilerplate preview (~4 lines), `…` fade truncation | JetBrains Mono ~14px, neutral-400 italic, faded code block |
| Right bottom — header | `〔PROPER〕` | Inter mono ~16px, copper-300, all caps |
| Right bottom — proper prompt | Anchor task content above (5 inline labels in copper-300) | JetBrains Mono ~18px in copper-300-bordered code block |
| Right bottom — proper result | Structured Markdown report preview (`## At Risk: Module B...`) with H2 markers | JetBrains Mono ~14px in brighter code block, with bold copper-300 H2 markers |
| Footer | Qualitative impact ladder — rung 1 lit | `<ImpactLadder rungs={3} currentRung={1}>` |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<NaiveVsProper>` (with 5-element configuration for proper prompt), `<ImpactLadder>`, `<HoverReveal>` on result lines for side-by-side line-position highlighting.

**Motion (5 advances, click-driven):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline + left-pane definition fade in. 3 outcome bullets stagger-fade-in. Bridge caption fades in last. | *"Prompt — clarity. Vague in, vague out. Structured in, structured out. Examples make the biggest difference. We'll see the canonical structure next."* |
| **2** | NAIVE card slides up from below + naive prompt code block fades in. | *"The naive version: 'Write me this week's report.'"* |
| **3** | Naive result reveals via cumulative opacity left-to-right (~600ms — typewriter feel mimicking *"the model is making this up as it goes"*). | *"And here's what you get: generic boilerplate. The model has to guess what you want."* |
| **4** | PROPER card slides up below NAIVE + proper prompt builds (medium-pace typing, ~3–4s). The 5 inline labels (`Role:` `Task:` `Context:` `Examples:` `Output:`) pulse copper-300 sequentially as they type in — visual rhyme with E.1's structured prompt. | *"The proper version. Same task, structured. Notice the Examples line — pointing to a sample transmits structure, tone, and focus areas all at once."* |
| **5** | Proper result reveals (cumulative opacity, ~700ms). Footer impact ladder rung 1 lights (~400ms tween copper-800 → copper-400). | *"Now you get something useful. That's Layer 1: prompt clarity."* |

**Steady-state:** no ambient.

**Hover (NAIVE result vs PROPER result side-by-side):** hovering one result subtly highlights the same line position in the other — a copper-300 underline lets the speaker point to specific contrasts.

**Hover (impact ladder rung 1):** "Layer 1 = informed by clear instructions, but limited by what the model already knows."

**Canonical pose:** post-Space 5. Both case-study cards visible (NAIVE top, PROPER bottom), all 4 result lines settled, impact ladder rung 1 lit.

---

### 4.3 — E.3 — PROMPT — structure

**FIG label:** `— FIG. E.3 · STRUCTURE`

**Goal:** Formalize the canonical 6-element common structure as a clean visual reference. Show that 10+ named frameworks all map to the same skeleton. Compact default state; rich content lives in hover popovers.

**Background:** plain dark + dot grid texture.

**Layout:** center-stage vertical 6-element spine + loose orbit of 10 framework-acronym tiles (5 left, 5 right) around the spine.

**Default-state spine content (compact):**

| # | Element | Default-state essence (1 line) |
|---|---|---|
| ① | **Role** | *Who AI should be* |
| ② | **Instruction** | *Action to perform + how* |
| ③ | **Output Format** | *Shape of the result* |
| ④ | **Context** | *Background + audience* |
| ⑤ | **Examples** | *Show good output* |
| ⑥ | **Input** | *Specific data* |

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `〔One skeleton〕. Many names.` | Instrument Serif ~52px, white + copper-italic on `One skeleton` |
| Spine elements (×6) | Numeric badge `①–⑥` + element name + 1-line essence | Numeric badge Inter mono ~28px copper-300; element name Inst Serif ~24px white; essence Source Serif italic ~14px neutral-200 |
| Spine connectors | Thin 1px copper-700 vertical rules between consecutive elements | — |
| Framework orbit (10 tiles) | `RACE` · `CARE` · `APE` · `ROSES` · `CREATE` · `COAST` · `TAG` · `PAIN` · `RISE` · `CREO` | Inter mono ~16px acronym, ~64×40px tile, 0px corner, 1px copper-800 border, neutral-200 fill at ~40% opacity |
| Footer caption | `Different mnemonics. 〔Same six ingredients〕.` | Source Serif 4 italic ~24px, neutral-300 + copper-italic on `Same six ingredients` |

**Spine geometry:** vertical stack at slide visual center, ~30% width. Each element is a horizontal pill-card with: numeric badge (left) + element name (large) + essence (small italic). Stack height ~60% of slide.

**Framework orbit:** 10 acronym tiles in a *loose orbit* around the spine — 5 on each side at varying distances (~280–480px from spine center) and slight vertical offsets so they feel organic, not gridded.

**Spine-hover rich popover (the hover layer carries the depth):**

| # | Hover popover content |
|---|---|
| ① **Role** | Define who the AI should be · `"You are ... with N years exp specialized in ..."` · examples: project lead, ops analyst, geology reviewer |
| ② **Instruction** | Clear action + constraints. Triggers: `"Analyze ..."` · `"Please exclude ..."` · `"Ultrathink on ..."` · also covers: style, tone, process detail, control |
| ③ **Output Format** | Specify how the response is structured. Formats: `Markdown · Tables · YAML · JSON · CSV · PDF` |
| ④ **Context** | Essential additional information. Categories: `Background · Objectives · Goal · Audience · Constraints` |
| ⑤ **Examples** | Show what good output looks like. Forms: `Attached example docs · sample input/output pairs` |
| ⑥ **Input** | The specific data to work with. Forms: `Attached file · specific request` · note: `User prompt; if instructions are generic → system prompt` |

When a spine element is hovered, other spine elements + frameworks dim slightly (~60% opacity) — keeps focus on the hovered element's popover.

**Note:** no forward-bridge note on Context. Layer 1's `Context` element and Layer 2's `Context` engineering share a name but operate at different scopes — conflating them blurs the layer distinction (per brainstorm decision).

**Framework-hover (each tile):** tile expands ~10% + tooltip with breakdown + the spine elements that the framework maps to glow copper-300; other spine elements dim to ~50%.

| Tile | Hover tooltip | Spine elements lit |
|---|---|---|
| `RACE` | `Role · Action · Context · Explanation` | ① ② ④ + ③ partial |
| `CARE` | `Context · Action · Result · Example` | ④ ② ③ ⑤ |
| `APE` | `Action · Purpose · Execution` | ② |
| `ROSES` | `Role · Objective · Scenario · Expected output · Solution` | ① ② ④ ③ ② |
| `CREATE` | `Character · Request · Examples · Adjustments · Type · Extras` | ① ② ⑤ ③ ④ |
| `COAST` | `Context · Objective · Actions · Scenario · Task` | ④ ② ② ④ ② |
| `TAG` | `Task · Action · Goal` | ② ② ② |
| `PAIN` | `Problem · Action · Information · Next steps` | ④ ② ⑥ ② |
| `RISE` | `Role · Input · Steps · Execution` | ① ⑥ ② ② |
| `CREO` | `Context · Request · Explanation · Outcome` | ④ ② ③ ② |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<StructureSpine>`, `<FrameworkOrbit>`, `<HoverPopover>` per spine element + per framework tile.

**Motion (4 advances, click-driven):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline + FIG label visible. Spine elements ① + ② + ③ (top half) reveal — stagger fade-in + slide-up 4px (~80ms stagger ~400ms total). Connector rules between them draw via `pathLength` 0→1. | *"There's a canonical structure. The first three: who the AI is, the action it should take, and how the answer should be shaped."* |
| **2** | Spine elements ④ + ⑤ + ⑥ (bottom half) reveal beneath ①–③. | *"The next three: the context — background and audience, examples of what good looks like, and the actual input data."* |
| **3** | Framework cluster fades in around the spine — 10 tiles with 30ms random-offset stagger (~400ms total) + slight scale-up (0.9 → 1.0). | *"Many frameworks have many names — RACE, CARE, APE, ROSES, CREATE — but they all map back to these six."* |
| **4** | Footer caption fades in (~400ms). | *"Different mnemonics. Same six ingredients."* |

**Steady-state:** no ambient.

**Speaker workflow modes:**
- **Quick mode (~45s):** press through 4 advances, read headline + caption. Compact spine + framework orbit do the visual teaching.
- **Deep mode (~3 min):** after Space 4, hover each spine element to walk through concrete examples; hover one or two frameworks to demonstrate the mapping.

**Canonical pose:** post-Space 4. Spine + 10 framework tiles + footer caption, no hover state active.

---

### 4.4 — E.4 — PROMPT — methodologies

**FIG label:** `— FIG. E.4 · METHODOLOGIES`

**Goal:** Lay out the 8 prompt techniques in 3 tiers. Land the foreshadow that the **Advanced tier already reaches into Context and Harness** — RAG/ART/ReAct *aren't really pure prompt engineering anymore*; they're prompt engineering reaching toward the next layers. Click-to-expand modals carry per-technique depth.

**Background:** plain dark + dot grid texture.

**Layout:** 3 horizontal tier bands stacked vertically. Each tier has cards horizontally arranged inside it. Tier label on the left of each tier band.

**Default-state card content (compact):**

| Tier | Card | 1-line essence |
|---|---|---|
| BASIC | Zero-Shot | *Ask once, no examples* |
| BASIC | Few-Shot | *Show 2–3 examples* |
| BASIC | Chain-of-Thought | *Think step by step* |
| INTERMEDIATE | Self-Consistency | *Multiple paths, consensus* |
| INTERMEDIATE | Tree of Thoughts | *Branch decision paths* |
| ADVANCED | RAG | *Retrieve + ground in docs* |
| ADVANCED | ART | *Reason + use tools* |
| ADVANCED | ReAct | *Think → Act → Observe → repeat* |

**Tier color treatment:** progressive copper saturation maps to capability ascent. BASIC=copper-700 (deepest), INTERMEDIATE=copper-500, ADVANCED=copper-300 (lightest).

**Foreshadow gesture:** the ADVANCED tier band has a small `↘ context · harness` annotation at top-right. On Space 4 (footer caption appearance), the RAG/ART/ReAct card labels pulse-glow once (copper-300, ~600ms) — visual reinforcement of the foreshadow. RAG/ART/ReAct modals carry an inline `↘ Layer N` annotation in the modal title bar (RAG → Layer 2 Context; ART, ReAct → Layer 3 Harness).

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `Eight techniques. 〔Three tiers〕.` | Instrument Serif ~52px, white + copper-italic |
| Tier 1 label | `BASIC` | Inter mono ~22px, copper-700 |
| Tier 2 label | `INTERMEDIATE` | Inter mono ~22px, copper-500 |
| Tier 3 label | `ADVANCED` | Inter mono ~22px, copper-300 |
| Tier 3 annotation | `↘ context · harness` | Inter mono ~14px, copper-200 italic |
| Card title | Technique name | Instrument Serif ~28px, white |
| Card essence | 1-line italic | Source Serif italic ~16px, neutral-200 |
| Footer caption | `〔Higher tiers〕 borrow from later layers. ART · RAG · ReAct already point to 〔context〕 and 〔harness〕.` | Source Serif 4 italic ~22px, neutral-300 + copper-italic highlights |

**Interaction model:**

| Interaction | Effect |
|---|---|
| Default | Card shows name + 1-line essence |
| Hover | Border copper-300 glow + slight scale (1.0 → 1.02), ~150ms. Pure visual feedback — no content reveal. |
| Click | Card expands into centered modal panel (~60% slide width × ~70% slide height). Other content dims to ~30% opacity. Modal has bulleted detailed content + close button `×` top-right. |
| Click `×` or outside modal | Modal collapses back into card; other content restores. |

**Modal content per technique (bulleted Best-for / Example / Trade-off):**

| Card | Modal content |
|---|---|
| **Zero-Shot** | **Best for:** well-defined tasks · quick single-pass requests **· Example:** *"Analyze the financial risks in our Q3 report and provide recommendations."* **· Trade-off:** simplest path; relies entirely on training |
| **Few-Shot** | **Best for:** classification · formatting · style mimicking **· Example:** *"Classify these emails by department: Example 1: 'I need help with my account balance' → Finance · Example 2: 'The app keeps crashing' → Tech Support · Now classify: 'I found an error in my invoice'"* **· Trade-off:** examples consume tokens; pattern transfers reliably |
| **Chain-of-Thought** | **Best for:** math · logic · multi-step reasoning **· Example:** *"Calculate customer acquisition cost. Think step-by-step: 1. List marketing expenses · 2. Count new customers · 3. Divide. Show your reasoning."* **· Trade-off:** longer outputs; more accurate on hard problems |
| **Self-Consistency** | **Best for:** high-stakes decisions · accuracy-critical work **· Example:** *"Generate 3 different approaches to reduce costs by 15%. For each: list steps, estimate time, calculate savings. Identify elements common to all three."* **· Trade-off:** 3× compute cost; substantially more reliable |
| **Tree of Thoughts** | **Best for:** strategic decisions · multi-option evaluation **· Example:** *"Path A: Singapore vs Thailand. Path B: Germany vs Netherlands. For each: market size, regulations, competition. Recommend best."* **· Trade-off:** heavier reasoning; explores trade-offs systematically |
| **RAG** *↘ Layer 2* | **Best for:** questions about your data · recent events · specific knowledge **· Example:** *"Using our knowledge base: search for 'remote work policy'. Create updated FAQ addressing top 5 questions."* **· Trade-off:** needs retrieval setup; grounds answers in real sources |
| **ART** *↘ Layer 3* | **Best for:** multi-step workflows requiring different capabilities **· Example:** *"For quarterly financials: calculator for growth %, search web for benchmarks, access CRM, generate charts. Select tools automatically."* **· Trade-off:** needs tool wiring; massively expands what's possible |
| **ReAct** *↘ Layer 3* | **Best for:** investigation · debugging · adaptive workflows **· Example:** *"Debug churn: Thought (check support tickets) → Action (search Oct DB) → Observation (45% billing complaints) → Thought (billing issue?) → Action (check logs) → continue."* **· Trade-off:** agent loop; the heart of how modern AI agents work |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<TieredTechniqueGrid>`, `<TechniqueCard>`, `<TechniqueModal>`.

**Motion (4 advances, click-driven):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | BASIC tier band reveals — tier label fades in, then 3 cards stagger-fade-in left-to-right (~500ms). | *"Eight techniques, three tiers. Basic: Zero-Shot, Few-Shot, Chain-of-Thought."* |
| **2** | INTERMEDIATE tier band reveals (2 cards). | *"Intermediate: Self-Consistency, Tree of Thoughts."* |
| **3** | ADVANCED tier band reveals (3 cards). `↘ context · harness` annotation appears top-right of band. | *"Advanced: RAG, ART, ReAct. These already reach into context and harness."* |
| **4** | Footer caption fades in. The RAG/ART/ReAct card labels pulse-glow once (copper-300, ~600ms). | *"By the time you're using ART, RAG, or ReAct, you're already doing context and harness engineering."* |

**Steady-state:** no ambient. Modal expansion is on speaker click only.

**Speaker workflow:**
1. Press through 4 advances (~30s quick mode)
2. Click any card to expand modal with bulleted content; speak to Best-for / Example / Trade-off
3. Click `×` to close; click another card to dive into a different technique

**Canonical pose:** post-Space 4. 3 tier bands with all 8 cards visible, footer caption visible.

---

### 4.5 — E.5 — PROMPT — the wall

**FIG label:** `— FIG. E.5 · THE WALL`

**Goal:** Land prompt's limits in three editorial bullet sections. The bottom Constraints section is the bridge — each bullet specifies a job the next layers will do. No dim-node visual here (E.6 owns that reveal cleanly).

**Background:** plain dark + dot grid texture.

**Layout:** asymmetric two-tier. **Top:** Best Practices (left ~50%) + Common Mistakes (right ~50%) side-by-side. **Bottom:** Constraints — full-width, visually prominent. **Closing caption** below.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `〔A great prompt〕 still has 〔limits〕.` | Instrument Serif ~52px, white + copper-italic |
| Top-left sub-header | `BEST PRACTICES` | Inter mono ~18px, copper-300, all caps |
| Top-left items (5) | `Be clear and concise` · `Iterate and test` · `Steer with detail` · `Evaluate the output` · `Set success metrics` | Source Serif 4 ~22px, neutral-200, copper-300 inline icon prefix `•` |
| Top-right sub-header | `COMMON MISTAKES` | Inter mono ~18px, copper-400, all caps |
| Top-right items (5) | `Vague instructions` · `Overcomplicated prompts` · `Lack of context` · `Ignoring AI limitations` · `Failing to iterate` | Source Serif 4 ~22px, neutral-300 (slightly dimmer), copper-400 inline icon prefix `•` |
| Bottom — section header | `〔WHERE PROMPT ENDS〕` | Instrument Serif ~36px, white + copper-italic on whole phrase, all caps |
| Bottom — sub-line | `Even a perfect prompt 〔can't〕:` | Source Serif 4 italic ~26px, white + copper-italic on `can't` |
| Bottom — items (6) | `Provide knowledge the model wasn't trained on` · `Pull current or proprietary data` · `Use tools, call APIs, or take actions` · `Persist memory across sessions` · `Verify its own output against reality` · `Run autonomously on schedule or trigger` | Source Serif 4 ~22px, neutral-100, copper-300 inline `▸` prefix |
| Closing caption | `〔That's where the next layers begin〕.` | Source Serif 4 italic ~26px, neutral-200 + copper-italic on whole phrase |

**Visual hierarchy:** top sections (BP + CM) are smaller text (~22px), neutral-toned, table-stakes. Bottom section (CONSTRAINTS) has larger header (~36px), full-width, visually weightier — the slide's punch. The `▸` chevron prefix signals "list of forward-pointers." Closing caption is italicized, smaller, centered — a quiet thesis line.

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<DisplayPhrase>` (for the closing caption stagger). **No new primitives.** No `<NodeNetwork>` here.

**Interaction discipline:**
- All three sections: **static bullet lists, no hover, no click.** They're editorial content, not teaching depth.
- Constraint bullets implicitly map to later layers (RAG, Tools, Memory, Verification, Automation) — but mapping is not surfaced via hover; the speaker can vocalize it on demand.

**Motion (4 advances, click-driven, no ambient):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline + FIG label visible. Top-left sub-header `BEST PRACTICES` fades in + 5 best-practice items stagger-fade-in (~80ms stagger ~500ms total). | *"A great prompt still has limits. First, the best practices: be clear, iterate, steer with detail, evaluate, set metrics."* |
| **2** | Top-right sub-header `COMMON MISTAKES` fades in + 5 mistake items stagger-fade-in. | *"And the common mistakes: vague instructions, overcomplicated prompts, lack of context, ignoring limitations, failing to iterate."* |
| **3** | Bottom section reveals: section header `〔WHERE PROMPT ENDS〕` fades in (~400ms) + sub-line `Even a perfect prompt can't:` (~300ms) + 6 constraint items stagger-fade-in left-to-right (100ms stagger ~700ms total). | *"But here's where prompt engineering ends. Even a perfect prompt can't provide knowledge the model wasn't trained on, can't pull current data, can't use tools or call APIs, can't persist memory, can't verify its own output, can't run autonomously."* |
| **4** | Closing caption fades in (~600ms ease-out). | *"That's where the next layers begin."* |

**Steady-state:** **no ambient.** E.5 is calm-but-pointed. Dramatic wall ambient is reserved for E.8.

**Constraint-bullet → satellite mapping (implicit, not surfaced):**

| E.5 constraint | Maps to (E.6 satellite or E.10 component) |
|---|---|
| *"Provide knowledge / pull current data"* | RAG Knowledge Base (E.6 satellite) |
| *"Use tools, call APIs"* | Tools & APIs (E.6 satellite) |
| *"Persist memory across sessions"* | Conversation Memory + Persistent Memory (E.6 satellites) |
| *"Verify its own output against reality"* | hooks / observability (E.10 annotations) |
| *"Run autonomously on schedule or trigger"* | orchestration (E.9 / E.10 / F) |

**Canonical pose:** post-Space 4. All three sections + closing caption visible.

---

### 4.6 — E.6 — CONTEXT — what & why

**FIG label:** `— FIG. E.6 · CONTEXT`

**Goal:** Layer 2 reveal. Hub-and-spoke with **CONTEXT at center as the gathering**, 6 peer satellites (User Prompt is one of six) including thin-line copper Lucide icons. Inward-flow + clockwise highlight ambient. Light impact ladder rung 2.

**Background:** plain dark + dot grid texture.

**Layout:** center-stage hub-and-spoke dominates. Definition + analogy in left gutter (~25% width). Impact ladder in footer.

**Hub-and-spoke geometry:** central CONTEXT hub (larger 0px-corner box ~140×80px, copper-200 fill, copper-100 border, subtle glow halo). 6 peer satellites in hexagonal arrangement at 60° intervals around the hub.

**Satellite layout (hexagonal, clockwise from 12 o'clock):**

| Position | Satellite | Lucide icon |
|---|---|---|
| 12 o'clock | `User Prompt` | `MessageSquare` |
| 2 o'clock | `Conversation Memory` | `History` |
| 4 o'clock | `RAG Knowledge Base` | `BookOpen` |
| 6 o'clock | `Tools & APIs` | `Wrench` |
| 8 o'clock | `Persistent Memory` | `Archive` |
| 10 o'clock | `System Instructions` | `Shield` |

User Prompt's hover popover gets a small annotation: *"Includes the output format spec — that lives inside the prompt itself."* This preserves the conceptual completeness without adding visual clutter (Output Format folded into User Prompt per locked decision).

**Default state per satellite (vertical stack — icon top, label below):**

```
┌─────────────────┐
│        ◉        │   ← thin-line copper icon (~32×32px)
│                 │
│  User Prompt    │   ← label
└─────────────────┘
```

Satellite size ~90×90px to accommodate icon-on-top vertical stack.

**Hover state per satellite (icon collapses, popover content appears):**

Hover triggers:
1. Icon scales 32px → 20px and moves to left of label (Framer Motion `layoutId` smooth tween, ~250ms)
2. Card expands ~3× larger (Framer Motion `layout` prop, ~250ms)
3. Popover content fades in below label

**CONTEXT hub treatment:** **text-only** (no icon). Absence of icon visually marks the hub as a destination, distinct from the iconified satellites that converge toward it.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `Layer 2: 〔Context〕 — relevance.` | Instrument Serif ~56px, white + copper-italic |
| Sub-headline | `〔6 components〕 — the full context the model can see.` | Source Serif 4 ~26px, white + copper-italic on `6 components` |
| Center hub | `CONTEXT` (sub-line: *the gathering*) | Box ~140×80px copper-200 fill, copper-100 border. `CONTEXT` Inst Serif ~24px, sub-line Source Serif italic ~14px |
| Connector lines | 6 lines from each satellite to CONTEXT hub. 1.5px copper-700 base. | — |
| Left gutter — definition | `Context = filling the model's window with just the 〔right information〕 — for each step.` | Source Serif 4 ~22px, white + copper-italic |
| Left gutter — analogy | `Like hiring an expert with 〔amnesia〕 — capable, but useless without context.` | Source Serif 4 italic ~18px, neutral-300 + copper-italic on `amnesia` |
| Footer | Impact ladder — rungs 1 + 2 lit | `<ImpactLadder rungs={3} currentRung={2}>` |

**Hover popover content per satellite (with memory-type tags):**

| Satellite | Hover popover content |
|---|---|
| `User Prompt` | The instructions you just spent four slides on. *Includes the output format spec — that lives inside the prompt itself.* One of six components — not the only one. |
| `System Instructions` | The persistent rules — who the model is, what it can or can't do, what tone to use. *Procedural memory*. |
| `Conversation Memory` | Short-term — what was said earlier in this session. *Episodic memory*. Resets when session ends. |
| `RAG Knowledge Base` | Retrieved documents pulled in for this specific question. *Retrieval-Augmented Generation*. |
| `Tools & APIs` | Actions the model can take in the world — call a function, query a database, fetch live data. |
| `Persistent Memory` | Long-term — what the model remembers across sessions. *Semantic + Episodic memory*. Last week's conversation informs this week's. |

Hover ladder rung 2: *"Layer 2 adds the **full context** — what the model should see when it answers."*

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<NodeNetwork variant="context-hub" state="activated" centerNode="CONTEXT" satellites=[6] icons={MessageSquare, History, BookOpen, Wrench, Archive, Shield}>`, `<ImpactLadder>`, `<HoverPopover>` per satellite.

**Motion (4 advances + continuous ambient, click-driven):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline + sub-headline visible. CONTEXT hub appears at center — scale 0→1 + opacity 0→1 + brief copper-glow halo (~500ms). User Prompt satellite reveals at the top position with a brief brighter highlight (signaling "this is what we covered on E.2–E.5"). Connector line from User Prompt to CONTEXT draws via `pathLength` 0→1. | *"Layer 2: Context — relevance. At the center, context itself. User Prompt — what we covered — is just one of six components feeding in."* |
| **2** | 5 more satellites reveal in clockwise stagger from User Prompt (top): Conversation Memory → RAG Knowledge → Tools & APIs → Persistent Memory → System Instructions. Each fades in + connector line to CONTEXT draws (~1500ms total, ~300ms per satellite). Each satellite renders with its icon on top (default state). | *"Five more flow in too — Conversation Memory, RAG Knowledge, Tools and APIs, Persistent Memory, System Instructions."* |
| **3** | Left gutter — definition + analogy fade in (~400ms each, 200ms stagger). | *"Context equals filling the model's window with just the right information for each step. Like hiring an expert with amnesia — capable, but useless without context."* |
| **4** | Impact ladder rung 2 lights up (~400ms tween). **Inward-flow ambient + clockwise highlight begin.** | *"That's Layer 2. And context is alive — components feed in continuously."* |

**Steady-state ambient (continuous after Space 4):**

| Motion | Behavior |
|---|---|
| **Inward flow** | Small copper-300 dots travel along each connector line *from satellite toward CONTEXT* — continuous loop, ~3–4s per traversal per connector. All 6 connectors flow simultaneously but slightly out of phase per connector (offset 200–500ms each). As particles arrive at CONTEXT hub, hub's glow halo pulses subtly. |
| **Clockwise highlight** | A copper-300 glow ring rotates around the satellites in clockwise order, dwelling on each for ~1s before moving to the next. ~6s full cycle. Adds spotlight on currently-highlighted component without overwhelming the inward flow. |

When a speaker hovers any satellite, the icon-collapses-to-popover pattern triggers. Hovering pauses the clockwise rotation while hovered (rotation resumes on hover release).

**Cross-section signature visual:** `<NodeNetwork>` reused on E.8 (`stamped`) and E.9 (`compressed`). Icons + satellite arrangement carry through to both.

**Canonical pose:** post-Space 4. Bright network with full names + definition + analogy + ladder rungs 1+2 lit.

---

### 4.7 — E.7 — CONTEXT — strategies

**FIG label:** `— FIG. E.7 · STRATEGIES`

**Goal:** Show the four operational strategies of context engineering — Write · Select · Compress · Isolate — as the operational toolkit. Continuous left-to-right particle-flow ambient with per-ring kinetic behavior visualizes each strategy's nature.

**Background:** plain dark + dot grid texture.

**Layout:** 4 horizontal flat ring tiles arranged left-to-right with arrow connectors between them. Below each ring: a sub-list of micro-strategies.

**Ring geometry:** each ring is a flat 0px-corner rectangular tile (~140×120px) with thin copper-stop border. Inside each tile: a small annulus (~80px outer diameter, 6px stroke) with progressive copper saturation (copper-700 → copper-400). Between consecutive tiles: 1.5px copper-700 arrow connector.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `Four strategies. 〔Each one solves a context problem〕.` | Instrument Serif ~48px, white + copper-italic |
| Ring 1 — label | `WRITE` | Inter mono ~24px, copper-700, all caps |
| Ring 1 — sub-headline | *Store data for future use* | Source Serif 4 italic ~18px, neutral-300 |
| Ring 1 — sub-list | `Long-term memory` · `Scratchpad` · `Session state` | Inter mono ~13px, copper-300 |
| Ring 2 — label | `SELECT` | Inter mono ~24px, copper-600 |
| Ring 2 — sub-headline | *Choose data needed for the task* | (same style) |
| Ring 2 — sub-list | `Retrieve tools` · `Retrieve scratchpad` · `Retrieve memory` · `Retrieve knowledge` | (same style) |
| Ring 3 — label | `COMPRESS` | Inter mono ~24px, copper-500 |
| Ring 3 — sub-headline | *Summarize past events efficiently* | (same style) |
| Ring 3 — sub-list | `Summarize` · `Trim irrelevant tokens` | (same style) |
| Ring 4 — label | `ISOLATE` | Inter mono ~24px, copper-400 |
| Ring 4 — sub-headline | *Separate tasks to avoid interference* | (same style) |
| Ring 4 — sub-list | `Partition state` · `Sandbox` · `Multi-agent` | (same style) |
| Footer caption | `When context grows, these four 〔keep it useful〕.` | Source Serif 4 italic ~24px, neutral-300 + copper-italic on `keep it useful` |

**Hover popover per ring (with anchor-task examples):**

| Ring | Hover popover content |
|---|---|
| `WRITE` | Save what you'll need later. *For your weekly report: this week's draft saves into long-term memory so next week's task can reference it.* |
| `SELECT` | Pull only what's relevant now. *For 'this Friday's report' fetch the last 7 days of activity, not the last year.* |
| `COMPRESS` | Summarize the past so it fits. *Replace 12 prior weekly reports with a single trend-summary that fits the context window.* |
| `ISOLATE` | Keep tasks from polluting each other. *The drafting task and the verification task each get their own context — no cross-contamination.* |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<StrategyRings>`, `<HoverPopover>` per ring.

**Motion (5 advances + continuous particle-flow ambient, click-driven):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline + FIG label visible. WRITE ring tile reveals (annulus draws + scales 0.8→1.0, ~500ms). Label fades in above; sub-headline + sub-list fade in below. | *"Four strategies. First: WRITE — store data for future use. Long-term memory, scratchpad, session state."* |
| **2** | Connector arrow WRITE→SELECT draws (~300ms). SELECT ring + label + sub-list reveal (~600ms). | *"SELECT — choose what you need for the current task. Retrieve tools, scratchpad, memory, or knowledge."* |
| **3** | Connector + COMPRESS ring reveal. | *"COMPRESS — summarize past events efficiently. Summarize old conversations, trim irrelevant tokens."* |
| **4** | Connector + ISOLATE ring reveal. | *"ISOLATE — separate tasks to avoid interference. Partition state, sandbox, or multi-agent setups."* |
| **5** | Footer caption fades in. **Continuous particle-flow ambient begins** — spawn rate ramps up over ~2s from 0 to steady state. | *"When context grows, these four keep it useful. Watch how data flows through them."* |

**Steady-state ambient (continuous after Space 5) — particle flow with per-ring kinetic behavior:**

| Ring | Particle behavior | Strategy made kinetic |
|---|---|---|
| **WRITE** | Particle enters, pauses briefly inside the ring (copper-700 glow halo expands then contracts), exits other side. | *Saving* — pauses to commit to memory before continuing. |
| **SELECT** | Particle enters; ~70% of particles continue, ~30% are filtered (dim → disappear inside ring with brief `×` mark). | *Filtering* — not all data is relevant; the unselected fade away. |
| **COMPRESS** | When 2+ particles arrive at this ring within ~500ms, they merge into a single slightly larger particle. When particles arrive alone, they pass through unchanged. | *Merging* — multiple inputs become a single compressed output. |
| **ISOLATE** | Particle enters; splits into 2–3 smaller particles that diverge slightly along separate exit angles. | *Splitting* — one task's context becomes multiple isolated streams. |

**Spawning + flow rate:**

| Parameter | Value |
|---|---|
| Spawn rate | ~1–2 particles/second from left edge |
| Particle size | ~6px diameter, copper-300 |
| Traversal time per particle | ~5–8s end-to-end across all 4 rings |
| Multiple particles in flight | 8–12 active simultaneously |
| Exit | Particles fade out at right edge of slide |

**Hover override:** when a speaker hovers a specific ring, the particle flow continues but the hovered ring's behavior is emphasized (brief copper-300 highlight on its annulus + popover with the anchor-task example).

**Canonical pose:** post-Space 5. 4 ring tiles + 3 connectors + sub-lists + footer caption + 8–12 particles in flight (typical).

---

### 4.8 — E.8 — CONTEXT — the wall

**FIG label:** `— FIG. E.8 · STILL MANUAL`

**Goal:** Land context engineering's wall via 4 named pitfalls, each with its own animated illustration on hover. Each illustration ends with a "Mitigated by →" tag previewing the harness layer. Default canvas: network from E.6 + STILL MANUAL stamp + chaos arrows.

**Background:** plain dark + dot grid texture.

**Layout:** **30/70 split.** Left (~30%) = vertical stack of 4 pitfall items with thin-line copper Lucide icons. Right (~70%) = animated illustration canvas that morphs based on hover.

**4 pitfalls (with research-validated mitigations):**

| # | Pitfall (icon) | Cause + effect | Mitigated by → |
|---|---|---|---|
| **1** | `GitMerge` **CONTEXT CONFLICT** | *Sources contradict → cognitive gridlock.* | `Context Isolation` · `Versioned Context` |
| **2** | `Triangle` **CONTEXT CONFUSION** | *Tools + noise + cognitive overload.* | `Tool Loadout` · `Context Pruning` |
| **3** | `Droplets` **CONTEXT POISONING** | *Wrong or vague info spreads silently.* | `Subagent Verification` · `Context Quarantine` |
| **4** | `TrendingDown` **CONTEXT DISTRACTION** | *Token overload → the "〔dumb zone〕"* (a.k.a. context rot in literature). | `Summarization` · `Context Offloading` |

> **Research integration notes:**
> - Each pitfall uses a **caption + example sub-line** structure (symmetric across all 4). Caption = mechanism in plain language with 1–2 copper-italic keywords. Sub-line = audience-relatable example, *not* a proof point. (Proof points live in Facilitator notes below — speaker reaches for them on demand if the room asks.)
> - Pitfall 3 mitigation: `Subagent Verification · Context Quarantine` (Quarantine is the canonical industry term for the poisoning-specific mitigation).
> - Pitfall 4 caption uses Adri's accessible "dumb zone" framing; Anthropic's "context rot" / Liu et al.'s "Lost in the Middle" are speaker-only references.
> - Consolidated research: `docs/researches/context-engineering-pitfalls.md` (synthesis of all 4 pitfalls + cited primary sources).

**Right-canvas animated illustrations:**

**Default (no hover):** Network from E.6 returns (carry-over via `layoutId`), dimmed to 70%. STILL MANUAL stamp lands on CONTEXT hub with overshoot bounce on entry. Chaos arrows ambient flying randomly across.

**Hover: CONTEXT CONFLICT — Venn collision with freeze**
- Two overlapping circles: left = `Source A` (copper-700), right = `Source B` (copper-300)
- In the overlap region: small `❄ FROZEN` indicator with cross-hatch dim pattern
- Conflicting arrows from both circles point inward and *cancel* in the overlap (collide → fade)
- Caption: *"Sources contradict. Model 〔commits early〕 — and can't recover."*
- Sub-line (italic, neutral-300): *"Example: pasting Q3 and Q4 figures into the same chat — model averages them, picks neither cleanly."*
- Tag: `Mitigated by → Context Isolation · Versioned Context`

**Hover: CONTEXT CONFUSION — iceberg**
- Iceberg visualization (above-water tip + below-water mass)
- Above waterline: small visible tip labeled `What you wanted`
- Below waterline: large hidden mass with 3 layered segments (`Irrelevant Information` · `Tool Overload` · `Cognitive Overload`)
- Animation: small particles slowly drift down to the iceberg, accumulating in the below-water mass; iceberg sinks deeper as mass grows
- Caption: *"Most of the context isn't 〔what you wanted〕."*
- Sub-line (italic, neutral-300): *"Example: pasting a 50-page report 'just in case' — model misses the 3 things that mattered."*
- Tag: `Mitigated by → Tool Loadout · Context Pruning`

**Hover: CONTEXT POISONING — infection spread**
- Clean context container (top half, copper-200, calm dots inside, glowing softly)
- An error particle (red-tinged copper, marked with `?`) enters from the side
- Spreads: error particle replicates, infecting nearby dots one by one (chain reaction)
- Bottom half: corrupted container (copper-700 dim, distorted dot pattern)
- Vertical "infection drip" animation showing spread over time
- Caption: *"Wrong or vague info 〔compounds〕 silently."*
- Sub-line (italic, neutral-300): *"Example: pasted last quarter's budget by mistake — AI keeps using it through edits; final memo ships off by 30%."*
- Tag: `Mitigated by → Subagent Verification · Context Quarantine`

**Hover: CONTEXT DISTRACTION — the dumb zone**
- Time-axis horizontal bar at bottom
- Tokens accumulate as small dots filling a "context window" rectangle that grows over time
- Performance line graph above: starts high (green-copper) → curves downward as tokens accumulate
- A red zone labeled `〔THE DUMB ZONE〕` appears once tokens cross a threshold; performance line dives into it
- Animation: tokens fill, performance line descends, threshold-cross moment glows briefly
- Caption: *"Tokens compound. Performance degrades into the 〔dumb zone〕."*
- Sub-line (italic, neutral-300): *"Example: after ~20 rounds of edits in one chat — answers start repeating, recent corrections get missed."*
- Tag: `Mitigated by → Summarization · Context Offloading`

**Content slot table (left pane):**

| Slot | Content |
|---|---|
| Headline | `Context works. But 〔you're orchestrating it〕 every session.` |
| Pitfall 1 | Icon `Lucide:GitMerge` · `CONTEXT CONFLICT` · *Sources contradict → cognitive gridlock* |
| Pitfall 2 | Icon `Lucide:Triangle` · `CONTEXT CONFUSION` · *Tools + noise + cognitive overload* |
| Pitfall 3 | Icon `Lucide:Droplets` · `CONTEXT POISONING` · *Wrong info spreads silently* |
| Pitfall 4 | Icon `Lucide:TrendingDown` · `CONTEXT DISTRACTION` · *Token overload → the "dumb zone"* |
| Footer | `Each session, 〔you〕 fight all of this. There's a 〔better way〕.` |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<PitfallCanvas>`, `<PitfallIllustration kind>` (5 variants), `<NodeNetwork variant="context-hub" state="stamped">` (for default canvas).

**Motion (4 advances + chaos-arrows ambient + hover-canvas-morph, click-driven):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline + FIG label visible. Right canvas: network returns from E.6 (`layoutId` carry-over), dims 100%→70%. **STILL MANUAL stamp lands** at CONTEXT hub with overshoot bounce + brief copper-glow. **Chaos arrows ambient begins.** | *"Context works. But you're orchestrating it manually every session."* |
| **2** | Left pane: pitfalls 1–2 reveal (Conflict + Confusion), stagger fade-in + slide-up 4px (~150ms stagger). | *"Two cognitive pitfalls: Context Conflict — when sources contradict and the model freezes. Context Confusion — when noise, tools, and overload pile up below the surface."* |
| **3** | Left pane: pitfalls 3–4 reveal (Poisoning + Distraction). | *"Two operational pitfalls: Context Poisoning — wrong or vague info spreads silently. Context Distraction — token overload pushes performance into the dumb zone."* |
| **4** | Footer caption fades in. | *"Each session, YOU fight all of this. There's a better way."* |

**Hover-canvas-morph (post-Space 4):**

| Action | Effect |
|---|---|
| Hover left pitfall item | Item highlights copper-300; right canvas morphs from default (or current illustration) to that pitfall's animated illustration via cross-fade (~500ms `easeInOutCubic`) |
| Release hover | Right canvas returns to default (network + STILL MANUAL + chaos arrows) |
| Hover different pitfall | Right canvas morphs directly to the new illustration (no return-to-default in between) |

**Steady-state ambient (chaos arrows on default canvas):**

| Parameter | Value |
|---|---|
| Arrow count active | ~6 in rotation, ~3 per second avg |
| Arrow appearance | Small copper-300 arrows (~14px), random direction (8 cardinal + diagonal) |
| Origin/destination | Random edges of network bounding box → traverse to opposite edge → fade |
| Lifecycle per arrow | ~1s (fade-in 200ms → traverse 600ms → fade-out 200ms) |
| Cycle | Continuous; new arrows spawn at randomized intervals (1–3s) |

When a pitfall is being hovered, the chaos arrows pause (only the pitfall illustration's own ambient runs). Hover release resumes chaos arrows.

**Facilitator notes (proof points — speaker-only ammunition, not on slide):**

When the room asks for evidence, the speaker has these data points to reach for:

| Pitfall | Speaker-only proof point |
|---|---|
| **Conflict** | Microsoft + Salesforce sharded-context study: OpenAI's o3 model dropped from 98.1 → 64.1 (a 34-point performance collapse) when information arrived sharded across multi-turn dialogue rather than all at once. |
| **Confusion** | Quantized Llama 3.1 8B failed a benchmark when given **46 tools** but succeeded at the same task when given **19 tools**. Beyond ~30 tools, descriptions overlap and produce confusion; beyond 100, failure approaches certainty. |
| **Poisoning** | Compounds across reasoning chains; a hallucination embedded early gets re-referenced silently and can stay load-bearing for 6+ rounds of revision. |
| **Distraction** | Liu et al. (2023), "Lost in the Middle" — models attend reliably to the start and end of the context window; middle content is systematically under-used. Anthropic / Gemini research observes degradation past ~100k tokens. |

Source synthesis: `docs/researches/context-engineering-pitfalls.md`.

**Cross-section signature visual:** the `<NodeNetwork variant="context-hub" state="stamped">` is the signature primitive's second appearance (after E.6) and continuity bridge to E.9's `compressed` state.

**Canonical pose:** post-Space 4. Network mid-chaos-cycle (one or two arrows in flight) + STILL MANUAL stamp + 4 pitfall items on left + footer caption.

---

### 4.9 — E.9 — HARNESS — what & why

**FIG label:** `— FIG. E.9 · HARNESS`

**Goal:** Reveal Layer 3. Compression sequence (network from E.8 folds inward into the harness package). Includes row collects the 6 mitigations from E.8 (direct payoff). Right-side **thesis** — `Agent = Model + Harness` equation + Cursor quote + 4-line plain-language stanza about what the harness does. Light impact ladder rung 3 (full ladder lit).

**Background:** plain dark + dot grid texture.

**Layout:** 55/45 split. **Left (~55%):** compression visualization → harness package (with Includes row + arrows). **Right (~45%):** thesis anchor — equation, quote, stanza, tagline.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `Layer 3: 〔Harness〕 — execution.` | Instrument Serif ~56px, white + copper-italic |
| Left — package label | `HARNESS` | Inter mono ~28px, copper-200, top of package |
| Left — package sub-label | `Automates context engineering` | Source Serif 4 italic ~22px, neutral-200 |
| Left — Includes row | `Includes:` (label) + 6 mitigation names from E.8: `Context Isolation` · `Tool Loadout` · `Subagent Verification` · `Pruning` · `Summarization` · `Offloading` | Source Serif 4 italic ~14px, neutral-300; mitigation names in copper-300 inline |
| Left — input arrow | `request →` | Inter mono ~14px, copper-300 |
| Left — output arrow | `→ result` | (same style) |
| Right — equation | `〔Agent〕 = Model + 〔Harness〕` | Instrument Serif ~52px, white + copper-italic on `Agent` and `Harness` |
| Right — divider | thin copper-700 horizontal rule | 1px |
| Right — quote | `"A 〔decent model with a great harness〕 beats a 〔great model with a bad harness〕."` | Source Serif 4 italic ~22px, neutral-200 + copper-italic on the two phrases |
| Right — attribution | `— Cursor engineering` | Inter mono ~14px, neutral-400, right-aligned |
| Right — divider | thin copper-700 horizontal rule | 1px |
| Right — stanza (4 lines) | `It picks what to load.` / `It cleans up.` / `It verifies its work.` / `It remembers.` | Source Serif 4 ~20px, white, 4-line stack |
| Right — tagline | `〔Build once〕. 〔Use forever〕.` | Instrument Serif italic ~32px, white + copper-italic on both phrases |
| Footer | Impact ladder — all 3 rungs lit | `<ImpactLadder rungs={3} currentRung={3}>` |

**Note:** the previous spec's 5-component row (`Context Orchestration` · `Component Lifecycle` · `State Persistence` · `Tool Execution` · `Output Formatting`) and 4 usage-modes block (`Spec-driven` · `HITL` · `Plugins/Skills` · `Ralph Wiggum`) are **dropped from E.9** in v2. Reason: the 5 components are abstract descriptions of capabilities the audience sees concretely on E.10 (anatomy diagram + practices grid). Re-stating them on E.9 was redundant. The 4 usage modes relocate to E.10 as 4 of the 8 practices in the unified grid.

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<NodeNetwork variant="context-hub" state="compressed">` (signature primitive — third and final appearance), `<HarnessPackage>`, `<ThesisPanel>`, `<ImpactLadder>`.

**Motion (5 advances, click-driven, no ambient):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline visible. Network from E.8 returns at center via `layoutId` carry-over. STILL MANUAL stamp dissolves with copper-glow fade (~400ms). Chaos arrows ambient stops. Network nodes brighten back. | *"Layer 3: Harness — execution. Watch what happens..."* |
| **2** | **Compression sequence:** 6 satellites pull inward toward CONTEXT hub, scaling to ~30%, merge into a single point at center, point expands horizontally into a flat box silhouette. Box label `HARNESS` + sub-label `Automates context engineering` fade in. (~2200ms total) | *"...the network gets packaged. The harness automates context engineering."* |
| **3** | Includes row stagger-fades-in inside the package — 6 mitigation names with **per-name copper-glow on each** (~120ms each, ~750ms total). Input arrow `request →` and output arrow `→ result` draw via `pathLength` 0→1. | *"It includes everything you saw on E.7 and E.8 — Isolation, Loadout, Verification, Pruning, Summarization, Offloading. Six manual disciplines. One automated package."* |
| **4** | **Thesis reveal (right pane):** equation builds word-by-word — `Agent` (~250ms) → `=` (~150ms) → `Model +` (~250ms) → **deliberate ~400ms pause** → `Harness` lands with brief copper-glow halo (~600ms). Cursor quote fades in below (~600ms) with attribution. 4-line stanza stagger-fades in 4-beat rhythm: *"It picks what to load."* (~200ms) → *"It cleans up."* (~200ms) → *"It verifies its work."* (~200ms) → *"It remembers."* (~200ms). | *"Here's the mental model. [equation reveals] Agent equals Model plus Harness. As Cursor's engineering team puts it — a decent model with a great harness beats a great model with a bad harness. [stanza] It picks what to load. It cleans up. It verifies its work. It remembers."* |
| **5** | Right pane: `〔Build once〕. 〔Use forever〕.` tagline fades in with deliberate gap between sentences (`Build once.` ~300ms hold ~ `Use forever.`). Footer impact ladder rung 3 lights up — full ladder lit. Brief one-time copper-glow on the now-complete ladder. | *"Build once. Use forever. That's Layer 3."* |

**Steady-state:** no ambient. Stillness post-Space 5 — the harness is the answer.

**Canonical pose:** post-Space 5. Compression complete. Harness package with Includes row + request/result arrows on left. Equation + quote + stanza + tagline on right. Impact ladder fully lit.

---

### 4.10 — E.10 — HARNESS PRACTICES

**FIG label:** `— FIG. E.10 · PRACTICES`

**Goal:** Reframe the harness as a set of **eight practices** a team adopts. Unified 2×4 grid; every practice is a peer card. Click any card → 1+7 reflow with the selected card expanded for in-place deep-dive. **Orchestration** is one of the eight — its expanded view hosts the `<HarnessPattern>` diagram (the cross-spec primitive shared with I.3).

**Background:** plain dark + dot grid texture.

**Layout:** centered 2×4 grid of equal-size practice cards. No side annotations, no usage-modes strip, no forward pointer. The slide is self-contained — E.11 carries the F-bridge.

**Eight practices (2×4 grid):**

| # | Practice (icon) | Compact essence | Type |
|---|---|---|---|
| **1** | 🎯 **Orchestration** (`Network`) | *pattern + agents + tools* | Capability |
| **2** | 📦 **Plugins** (`Package`) | *packaged: subagents, skills, hooks, MCP* | Capability |
| **3** | 🧠 **Memory** (`Brain`) | *self-learning — gotchas stay* | Capability |
| **4** | 📊 **Observability** (`Activity`) | *every decision auditable* | Capability |
| **5** | ⚡ **Triggers** (`Zap`) | *manual, schedule, or event* | Capability |
| **6** | 📄 **Spec-driven** (`FileText`) | *spec = source of truth* | Mode |
| **7** | 👥 **HITL** (`Users`) | *approval at key steps* | Mode |
| **8** | 🔁 **Ralph Wiggum** (`Repeat`) | *autonomous loop until done* | Mode |

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `What good harness teams do: 〔eight practices〕.` | Instrument Serif ~52px, white + copper-italic on `eight practices` |
| Each practice card (compact) | Icon (Lucide, 1.5px stroke, copper-300) · name (Inter mono ~22px, white) · 1-line essence (Source Serif italic ~14px, neutral-300) | Card ~22% slide width × ~28% slide height, 0px corner, 1px copper-700 border, neutral-900 fill |
| Each practice card (expanded) | Icon + name (top) · close button `×` (top-right) · expanded content (bullets or embedded diagram) | Card grows to ~50% slide width × ~62% slide height; other 7 cards compress into a vertical strip on the right (icon + name only) |

**Expanded content per practice (brief, bulleted, no wall text):**

| Card | Expanded view |
|---|---|
| 🎯 **Orchestration** | **Embedded `<HarnessPattern>` diagram** plays inside the expanded card area (Main Agent + delegate-branch with 2 sub-agents + tools-branch with 2 direct tools). Below diagram, 3 short bullets:<br>• Main Agent dispatches<br>• Delegate to sub-agents OR call tools direct<br>• Pattern: centralized<br>Internal animation total ~2200ms (see Motion below). |
| 📦 **Plugins** | • Subagents — specialized workers<br>• Skills — domain modules<br>• Hooks — lifecycle guardrails<br>• MCP — external integrations<br>• One bundle, install everywhere |
| 🧠 **Memory** | • Captures gotchas during work<br>• Records what broke, what worked<br>• Stores decisions + rationale<br>• Next session inherits |
| 📊 **Observability** | • Tool calls + results<br>• Context state per step<br>• Permission decisions<br>• Token usage trends |
| ⚡ **Triggers** | • Manual — you ask<br>• Schedule — cron, daily, recurring<br>• Event — webhook, file change, message |
| 📄 **Spec-driven** | • Spec is the contract<br>• Progress measured against spec<br>• No work outside the spec<br>• Verification = spec compliance |
| 👥 **HITL** | • Approval gates on critical actions<br>• Human pauses on ambiguity<br>• Human signs off on dangerous commands<br>• Human checkpoints on long runs |
| 🔁 **Ralph Wiggum** | • Loops until spec is satisfied<br>• Failure feeds back as input<br>• Survives across context limits<br>• "I'm helping!" persistence |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, **`<PracticeGrid>`** + **`<PracticeCard>`** (new primitives — 2×4 grid → 1+7 reflow expand-shrink), **`<HarnessPattern>`** (embedded inside Orchestration practice card; cross-spec primitive shared with I.3), thin-line copper Lucide icons.

**Click-to-expand-shrink interaction (the new primitive):**

| Action | Effect |
|---|---|
| Default state (post-reveal) | 8 cards in 2×4 grid, equal size, compact essence visible |
| Click any card N | N expands to ~50% slide width × ~62% slide height (LEFT half of practices area). Other 7 cards compress into a vertical strip on the RIGHT half (~24% slide width), each ~13% height with **icon + name only** (essence fades out). Layout reflow ~500ms `easeInOutCubic` (Framer Motion `layoutId` per card). Expanded card content fades in ~300ms after layout settles. |
| Click any of 7 mini-cards | Layout swaps — that card expands, previous expansion shrinks back into the strip. Single transition (~500ms). |
| Click `×` close button (top-right of expanded card) | Returns to default 2×4 grid (~500ms). |
| Click outside the expanded card | Same as `×` close — returns to default 2×4 grid. |
| Click selected card again | Same as `×` close. |

**Special case — Orchestration expanded:** instead of bullets, the embedded `<HarnessPattern>` diagram plays as an internal animation:

| Internal phase | What happens |
|---|---|
| Phase A | Main Agent box reveals — fade-in + scale 0.9→1.0 + brief copper-glow halo (~400ms) |
| Phase B | Two branches `delegate` (left) / `tools` (right) draw via `pathLength` 0→1 (~400ms parallel). Two sub-agent boxes reveal below `delegate` branch (~500ms stagger) |
| Phase C | Two direct `[tool]` markers below `tools` branch reveal (~300ms stagger). Each sub-agent's own `[tool]` markers fade in below them (~300ms parallel) |
| Phase D | `Pattern: centralized` annotation fades in below diagram. 3 bullets reveal to the right of diagram (stagger ~150ms) |

Total internal animation: ~2200ms. Plays once on first expansion of Orchestration; subsequent expansions show the canonical pose immediately.

**Motion (3 advances, click-driven, no ambient):**

| Space | What happens | Speaker beat |
|---|---|---|
| **1** | Headline + FIG label visible. *"What good harness teams do: 〔eight practices〕."* | *"What good harness teams do — eight practices."* |
| **2** | Top row of 4 cards (Orchestration · Plugins · Memory · Observability) stagger-reveal — slide-up 4px + fade-in (~150ms stagger ~700ms total). | *"Four capabilities: Orchestration, Plugins, Memory, Observability."* |
| **3** | Bottom row of 4 cards (Triggers · Spec-driven · HITL · Ralph Wiggum) stagger-reveal. | *"Four operating disciplines: Triggers, Spec-driven, Human-in-the-loop, Ralph Wiggum — the autonomous loop."* |

**Post-Space 3 (interactive):** speaker clicks any card to demo expand-shrink. Orchestration card reveals the pattern diagram animation; the other 7 reveal bullet content. Three close behaviors (× / click-outside / click-same).

**Steady-state:** no ambient. Slide goes calm post-Space 3. Interactive depth available on demand.

**Cross-spec critical dependency:**

> **`<HarnessPattern>` (the Main Agent + delegate + tools diagram inside Orchestration's expanded card) MUST visually match I.3's `<HarnessCanvas>` default state EXACTLY.** Single source of truth across both surfaces. Same component, same geometry, same labels (`MAIN AGENT` + `AGENT A/B` style). When the audience reaches I.3 ~75 minutes later, the harness pattern is *recognized*, not introduced.

**Canonical pose:** post-Space 3. 2×4 grid of 8 practice cards in default state, no card expanded.

---

### 4.11 — E.11 — BRIDGE TO F

**FIG label:** `— FIG. E.11 · BUILT`

**Goal:** Photographic exhale (analogue to D.5). After ten diagrammatic-deep slides, give the audience a quiet photographic moment that signals section close and primes F's *selective* deep-dive into techniques. The visual register echoes D.5 (industrial workspace) but shifts subject to *three concentric piles of papers* — visualizing the three-layer structure the audience just absorbed.

**Background:** photographic.

**Image-gen prompt (for `gemini-image-gen` MCP) — locked:**

> Editorial photograph at golden afternoon hour, shot from a low overhead angle. A wooden desk surface with documents arranged in **three** concentric layered piles — a single sheet at the center, surrounded by a ring of supporting papers, surrounded by a wider arc of folders and binders. Warm copper-amber afternoon light streaming low across the surface, casting long shadows that emphasize the layered geometry. Deep matte shadows at the corners. Mood: orchestration, depth-in-layers, the relationship between core and surrounding apparatus. No people visible. Copper-amber accent palette throughout. 16:9 widescreen. Suitable for slide background — top-right region intentionally darker for text overlay.

**Layout:** photo full-bleed + editorial overlay (top-right, vignette mask on that region for legibility). Different overlay corner from D.5 (which was bottom-left) — gives variety across the photographic-bridge slides in the deck.

**Content slot table (2 beats only — no third bridge line):**

| Slot | Content | Style |
|---|---|---|
| Beat 1 | `〔Three layers〕. The 〔fundamentals〕 are built.` | Instrument Serif ~80px projected, white + copper-italic on `Three layers` and `fundamentals` |
| Beat 2 | `〔Next〕: the techniques 〔that matter most〕.` | Instrument Serif ~52px, white + copper-italic on `Next` and `that matter most` |

**Why 2 beats not 3:** the previous Beat 2 (*"Now: the pieces inside it"*) and Beat 3 (*"Next: how MCP, RAG, Skills, and orchestration fit together"*) said similar things and re-enumerated practices E.10 had already named. Two beats is symmetric (one looks back, one looks forward) and acknowledges F's selectivity (*"techniques that matter most"* — F is curated, not exhaustive). Stillness IS the design.

**Components:** `<HeroPhoto src="e11-bridge.jpg" vignetteSide="top-right">`, `<FigLabel>`, `<DisplayPhrase>`, `<KeywordHighlight>`.

**Motion (2 advances, no ambient — stillness is the design):**

| Space | What happens |
|---|---|
| **1** | Photo + FIG label visible. Beat 1 stagger-fades in word-by-word (~500ms total). |
| **2** | Beat 2 fades in as a single phrase (~600ms ease-out). |

**Steady-state:** **no ambient.** Slide goes still after Space 2. Like D.5 and J.1, stillness IS the design — the section's exhale.

**Canonical pose:** post-Space 2, both lines visible over photo, no motion.

## 5. Cross-section narrative flow

### 5.1 Within Section E

| Transition | How it reads |
|---|---|
| (Section D closes via D.5) → E.1 | D.5's `Engineering is the system around it. Next: how that system gets built.` resolves on E.1's outer-ring `HARNESS · the system`. Phrase rhyme: *"the system."* |
| E.1 → E.2 | Russian-doll preview → Layer 1 unpack. E.1's structured prompt typed in Space 2 = E.2's PROPER prompt unpacked. |
| E.2 → E.3 | Naive-vs-proper experience → formal canonical structure. E.2's bridge caption *"Next: the canonical structure behind every good prompt"* hands off explicitly. |
| E.3 → E.4 | Structure (grammar of one prompt) → genres (8 techniques operate on top of that structure). Caption *"Different mnemonics. Same six ingredients"* → *"Eight techniques. Three tiers."* |
| E.4 → E.5 | ADVANCED tier annotation `↘ context · harness` already foreshadowed prompt's wall; E.5 makes it explicit via the Constraints section. |
| E.5 → E.6 | Closing caption *"That's where the next layers begin"* hands off to E.6's `Layer 2: Context — relevance.` Each constraint bullet on E.5 maps to a satellite on E.6. |
| E.6 → E.7 | 6 components introduced (what context contains) → 4 strategies (what to do with it). |
| E.7 → E.8 | Clean particle flow through 4 strategy rings → chaos arrows on the network. *Strategies exist; YOU still apply them every session.* |
| E.8 → E.9 | Footer *"there's a better way"* hands off; E.9 IS the better way. The 6 mitigations from E.8's "Mitigated by →" tags get collected in E.9's Includes row. |
| E.9 → E.10 | Harness defined (thesis: `Agent = Model + Harness`) → opened as eight practices a team adopts. The slide-level shift is from *idea* (E.9's mental model) to *catalog* (E.10's practices grid). |
| E.10 → E.11 | Eight practices catalog (clicked + explored) → photographic exhale. *"Three layers. The fundamentals are built."* |

### 5.2 E → F (cross-section bridge)

E.11's bridge `Next: the techniques that matter most` primes F's *selective* deep-dive. F is **curated, not exhaustive** — the bridge line acknowledges this so the audience doesn't expect every E.10 practice to get equal treatment in F. F will deliver each chosen technique as a *thing that lives inside the harness pattern* — the audience already has the pattern (Orchestration practice) and the practices catalog (E.10 grid).

### 5.3 E ↔ I.3 (cross-spec dependency, primary)

> **`<HarnessPattern>` (embedded inside E.10's Orchestration practice card) = `<HarnessCanvas>` default state on I.3.** Same component, two surfaces. Built once, reused.

When the audience reaches I.3 (~75 minutes after E.10) and sees:
- Left rail: `HARNESSES → Workflows + Plugins`
- Default-state diagram: Main Agent + delegate-branch + tools-branch

…they recognize *"this is the Orchestration practice from E.10, instantiated."* No novel jargon. The triggered n8n workflows in I.3 also recognize against E.10's Triggers practice card (schedule + event); the plugin instances recognize against E.10's Plugins practice card.

### 5.4 Meta-callbacks (cross-slide structural payoffs)

| Callback | Delivery |
|---|---|
| **E.1 → E.5/E.6** | 6 satellite nodes shown in E.1 Space 4 = 6 dim/activated satellites in E.5/E.6. Recognition payoff. |
| **E.1 → E.10 (Orchestration practice)** | MAIN AGENT silhouette in E.1 Space 6 = static form of the diagram inside E.10's Orchestration practice card. Recognition payoff. |
| **E.1 (Centralized pattern) → E.10 Orchestration card** | E.10's diagram explicitly identifies as `Pattern: centralized` — paying off the centralized one of the 4 patterns previewed in E.1 Space 6. |
| **E.1 → F (agent orchestration), I.3 (portfolio)** | 4 orchestration patterns previewed in E.1 Space 6 loop (with distinct connector-motion signatures: round-trip / bidirectional / sequential / synchronized burst) = full deep-dive in F + concrete instances in I.3. |
| **E.5 → E.6** | 6 constraint bullets on E.5 (`pull current data` · `use tools` · etc) = 6 satellite components on E.6 (RAG, Tools & APIs, etc). Each constraint has a named answer. |
| **E.6 ↔ E.8** | Same network, two ambient registers. Orderly inward flow → chaotic arrows. |
| **E.7 → E.10 (Plugins, Memory, Observability practices)** | The 4 strategies (Write/Select/Compress/Isolate) = automated by E.10's practices — Memory absorbs Write; Plugins absorb Select via Tool Loadout; Memory + Observability automate Compress/Isolate at lifecycle level. |
| **E.8 → E.9** | 6 mitigations from "Mitigated by →" tags = E.9's Includes row. Each mitigation copper-glows on stagger-reveal — earned structural payoff. |
| **E.6 (Persistent Memory) → E.10 Memory practice** | E.10's Memory practice (reframed as self-learning — gotchas, what-broke-last-time) extends E.6's Persistent Memory satellite. Within-section loop closure. |
| **E.9 thesis → E.1 Anthropic quote** | E.9's `Agent = Model + Harness` equation + Cursor variant of the quote pays off the Anthropic quote on E.1. Same idea, two registers — opening hint, closing thesis. |

## 6. Animation budget

Section E total logical advances: **47**.

| Slide | Advances |
|---|---|
| E.1 | 7 |
| E.2 | 5 |
| E.3 | 4 |
| E.4 | 4 |
| E.5 | 4 |
| E.6 | 4 |
| E.7 | 5 |
| E.8 | 4 |
| E.9 | 5 |
| E.10 | 3 |
| E.11 | 2 |
| **Total** | **47** |

At ~30s per advance baseline (per meta-spec §5.4), Section E occupies **~24 minutes** of pure advance-delivery time. Plus dwell time on E.4 modal expansions, E.6 ambient observation, E.7 particle-flow viewing, E.8 hover-canvas-morph exploration, **E.10 expand-shrink practice exploration**: realistic budget **~28–35 minutes total** for Section E.

E.10's 3-advance count is intentional — the slide's load is in the *interactive* expand-shrink (post-Space 3), not the reveal sequence. Speaker dwell on Orchestration (which plays an internal ~2.2s diagram animation) and any other 1–2 practices typically adds ~3–5 minutes of dwell time without consuming advance budget.

In context of the meta-spec's overall budget (~170–200 advances for 90–100 minutes of pure delivery), Section E consumes ~26% of the advance budget — appropriate for the section that establishes the deck's engineering-fundamentals spine and locks the harness vocabulary for I.3.

## 7. Content references

For implementation, pull canonical content from:

| Source | What's there |
|---|---|
| `docs/researches/topic-ai-engineering-fundamentals.md` | Prompt/context/harness three-layer stack, ReAct loop, harness components. **Primary research source for Section E.** |
| `docs/researches/context-engineering-pitfalls.md` | **Consolidated synthesis** of all 4 context pitfalls (Conflict / Confusion / Poisoning / Distraction). Adds Liu et al. 2023 "Lost in the Middle", Microsoft/Salesforce sharded-context study (o3 98.1→64.1), Anthropic 90.2% multi-agent finding. **Primary reference for E.8** — captions, sub-line examples, and Facilitator notes (proof points). |
| `docs/researches/harness-engineering.md` | **Harness engineering synthesis** — definition, anatomy, operating modes (Spec-driven / HITL / Ralph Wiggum), Plugins (subagents+skills+hooks+MCP), Memory (self-learning), Observability, Triggers. Cross-implementation comparison (Claude Code / Cursor / Codex / Devin / Aider). **Primary reference for E.9 thesis + E.10 eight practices.** Cursor "decent model + great harness" quote sourced here. |
| `docs/specs/2026-05-06-process-and-design-meta.md` | Substrate, design system, palette, typography. Consumed throughout. |
| `docs/specs/2026-05-08-slides-foundation-core.md` | Section D — tonal precedent, primitive specifications. |
| `docs/specs/2026-05-07-slides-reveal-and-closing.md` | Reveal + Closing tonal precedent + I.3 cross-spec dependency for `<HarnessPattern>` / `<HarnessCanvas>`. |
| `docs/references/nanovest-pilot-workshop.pdf` (slides 20–31) | Adri's prior framings of prompt + context engineering. Inform E.3 (structure spine + frameworks), E.4 (8 techniques + tiers), E.6 (memory taxonomy), E.7 (4 strategies), E.8 (4 challenges). |
| `docs/references/nanovest-ai-sdlc-foundation.pdf` (slide 9) | "Engineering Evolution" — prompt → context → harness progression. Informs E.6 satellite naming + E.9 thesis framing. |

## 8. Implementation notes

### 8.1 Suggested file structure

```
src/slides/foundation-core-section-e/
  e1-three-layers.tsx
  e2-prompt-what-why.tsx
  e3-prompt-structure.tsx
  e4-prompt-methodologies.tsx
  e5-prompt-the-wall.tsx
  e6-context-what-why.tsx
  e7-context-strategies.tsx
  e8-context-the-wall.tsx
  e9-harness-what-why.tsx
  e10-harness-practices.tsx
  e11-bridge-to-f.tsx
  components/
    LayerCard.tsx              // E.1 morphing layer card with focal | nested modes
    LayerDemo.tsx              // E.1 internal demonstrations
    MultiAgentOrchestration.tsx // E.1 Space 6 4-pattern loop (also reusable in F + I.3)
    NaiveVsProper.tsx          // E.2 case-study primitive
    StructureSpine.tsx         // E.3 6-element vertical spine
    FrameworkOrbit.tsx         // E.3 10-tile loose orbit
    HoverPopover.tsx           // E.3, E.6, E.7 anchored rich-content popover
    TechniqueCard.tsx          // E.4 click-to-expand card
    TechniqueModal.tsx         // E.4 centered modal with bulleted content
    TieredTechniqueGrid.tsx    // E.4 3-tier band layout
    NodeNetwork.tsx            // SIGNATURE PRIMITIVE — variant + state props (E.6, E.8, E.9)
    ImpactLadder.tsx           // E.2, E.6, E.9 qualitative 3-rung ladder
    StrategyRings.tsx          // E.7 4-ring funnel + particle-flow ambient
    PitfallCanvas.tsx          // E.8 30/70 split with morphing right canvas
    PitfallIllustration.tsx    // E.8 5-variant illustration component
    HarnessPackage.tsx         // E.9 packaged box with Includes row + arrows (5-component row dropped in v2)
    ThesisPanel.tsx            // E.9 right-side thesis (equation + Cursor quote + 4-line stanza)
    PracticeGrid.tsx           // E.10 NEW PRIMITIVE — 2×4 grid → 1+7 reflow expand-shrink
    PracticeCard.tsx           // E.10 NEW PRIMITIVE — single card (compact + expanded states)
    HarnessPattern.tsx         // CRITICAL CROSS-SPEC PRIMITIVE (embedded in E.10's Orchestration practice + I.3)
```

### 8.2 Substrate dependencies

- shadcn UI (Card, Button — adapted to 0px radius and single-shadow recipe)
- Tailwind CSS (design tokens)
- Framer Motion (all motion, including `layoutId` for `<NodeNetwork>` state transitions, `<LayerCard>` mode morphs, `<TechniqueCard>` modal expansions, **`<PracticeGrid>` 2×4 → 1+7 reflow**)
- **Lucide icons** (MIT-licensed, thin-stroke aesthetic) for E.6 satellites, E.8 pitfalls, **E.10 practices (8 cards)**
- No paid components / fonts / libraries (per memory rule)

### 8.3 Build order recommendation (lowest-risk first)

**Plan A scope (E.1–E.5):** steps 1–6, 12.
**Plan B scope (E.6–E.11):** steps 7–11, 13.

1. **`<HoverPopover>`** — universal primitive used on E.3 / E.6 / E.7; simplest. Build first; validate positioning logic across slide regions.
2. **`<ImpactLadder>`** — 3-rung qualitative footer; used on E.2, E.6, E.9. Simple state transitions.
3. **`<StructureSpine>` + `<FrameworkOrbit>`** — E.3 ready after this.
4. **`<NaiveVsProper>`** — E.2 ready after this.
5. **`<TechniqueCard>` + `<TechniqueModal>` + `<TieredTechniqueGrid>`** — E.4 ready after this. Validate click-to-expand modal pattern.
6. **`<LayerCard>` + `<LayerDemo>` + `<MultiAgentOrchestration>`** — E.1 ready after this. Most complex cinematic motion in Plan A; **note the 4-pattern connector-motion signatures** (round-trip / bidirectional / sequential / synchronized burst) per §4.1.
7. **`<NodeNetwork>` (signature primitive)** — most complex Plan B primitive. Build with all 3 states (`activated`, `stamped`, `compressed`) + Framer `layoutId` per node. E.6 ready after this.
8. **`<StrategyRings>` + particle-flow ambient** — E.7 ready after this. Validate continuous particle spawning + per-ring conditional behavior.
9. **`<PitfallCanvas>` + `<PitfallIllustration>` × 5 variants** — E.8 ready after this. Build the 4 named pitfall illustrations as separate self-contained motion pieces.
10. **`<HarnessPackage>` + `<ThesisPanel>`** — E.9 ready after this. ThesisPanel handles the equation word-by-word build with deliberate pause before "Harness."
11. **`<PracticeGrid>` + `<PracticeCard>` (NEW PRIMITIVES) + `<HarnessPattern>` (CRITICAL CROSS-SPEC)** — E.10 ready after this. PracticeGrid handles 2×4 → 1+7 reflow with three close behaviors (× / click-outside / click-same). HarnessPattern matches I.3's `<HarnessCanvas>` default state exactly. Embed HarnessPattern inside PracticeCard kind="orchestration".
12. **E.5** — last in Plan A; uses primitives from steps 1–6 + plain typography; minimal new component work.
13. **E.11** — last in Plan B; uses only existing primitives (`<HeroPhoto>`, `<DisplayPhrase>`, etc.); ship last.

### 8.4 `<NodeNetwork>` state-transition design notes

The signature primitive of Section E. State transitions:

| Transition | Visual change | Mechanism |
|---|---|---|
| (initial appearance) → `activated` | Network reveals on E.6: hub + 6 satellites + connector lines + clean inward-flow ambient + clockwise highlight | `<NodeNetwork variant="context-hub" state="activated">` |
| `activated` → `stamped` | E.8 Space 1: nodes dim 100%→70%, STILL MANUAL stamp lands at hub, chaos arrows ambient begins. **Inward flow stops; clockwise highlight stops.** | `<NodeNetwork state="stamped">` with `state` prop change. Framer `layoutId` per node ensures position continuity. |
| `stamped` → `compressed` | E.9 Space 1–2: STILL MANUAL stamp dissolves, network nodes brighten, then compression sequence runs (satellites pull inward, scale to ~30%, merge into single point, point expands into harness package box). | `<NodeNetwork state="compressed">` triggers compression animation sequence (~2200ms). |

`<NodeNetwork>` accepts:
- `variant` (`"context-hub"` is the only Section E variant; future sections may add more)
- `state` (`"activated"` | `"stamped"` | `"compressed"`)
- `centerNode` (`"CONTEXT"` for E)
- `satellites` (array of 6 satellite definitions: name, icon)
- `icons` (Lucide icon names per satellite)
- `play` (boolean — controls whether ambient runs)

### 8.5 `<HarnessPattern>` cross-spec sharing

`<HarnessPattern>` lives in `src/components/HarnessPattern.tsx` and is imported by:

- `src/slides/foundation-core-section-e/components/PracticeCard.tsx` (rendered inside `kind="orchestration"` expanded view, per this spec §4.10)
- `src/slides/reveal-and-closing/components/HarnessCanvas.tsx` (per Reveal + Closing spec §3, used as the default-state diagram in I.3)

Single source of truth. Any change to `<HarnessPattern>` affects both surfaces. Branch labels use `delegate` (left) and `tools` (right). Agent labels use `MAIN AGENT` (top) + `AGENT A` / `AGENT B` (sub-agents). The `Pattern: centralized` annotation appears below the diagram in E.10's Orchestration card.

### 8.5.1 `<PracticeGrid>` + `<PracticeCard>` implementation notes (E.10 NEW)

The 2×4 → 1+7 reflow is the key new interaction in Section E.

**State management:**
- `<PracticeGrid>` parent holds `expandedPractice: PracticeName | null` state
- Default state: `expandedPractice = null` → renders 8 equal cards in 2×4 layout
- Click any card → `setExpandedPractice(practiceName)` → reflows
- × button / click-outside / click-same → `setExpandedPractice(null)` → returns to grid

**Layout reflow mechanism:**
- Each `<PracticeCard>` uses Framer Motion `layoutId={\`practice-${name}\`}` for smooth grid-to-strip morph
- AnimatePresence handles the appearance/disappearance of expanded content within the selected card
- ~500ms `easeInOutCubic` for layout reflow + ~300ms content fade-in (after layout settles)

**Expanded content:**
- For 7 of 8 practices: bullet list (Source Serif italic ~16px, neutral-200, ~6 bullets max)
- For Orchestration practice: embedded `<HarnessPattern>` component + 3 short bullets to the right
- Close button `×` always rendered top-right of expanded card, ~24px Inter mono, copper-300, hover→copper-200

**Accessibility:**
- Tab navigation between cards in default state
- Enter/Space on focused card → expand
- Escape → close (matches × close button)

### 8.5.2 E.1 `<MultiAgentOrchestration>` connector motion

The 4-pattern loop (Centralized · Decentralized · Chain · Parallel) requires per-pattern connector-motion signatures (per §4.1 spec). Implementation:

- **Particle:** copper-300 dot + soft halo, traveling along SVG path via Framer Motion `motion.circle` with `offsetPath` or `<animateMotion>`
- **Centralized:** 3 outbound pulses (orch→agent) with 80ms stagger; agent flash on receipt; 3 return pulses with 80ms stagger
- **Decentralized:** 6 simultaneous pulses (2 per peer line, opposing directions); MAIN AGENT dimmed to 30%
- **Chain:** single pulse traversing A→B→C (no MAIN AGENT involvement); 100ms baton-pass holds at intermediate nodes; MAIN AGENT dimmed to 30%
- **Parallel:** 3 outbound pulses synchronized (~0ms stagger); all 3 agents glow brightly together for ~600ms; 3 return pulses synchronized
- **Pattern transitions:** ~200ms fade-out (active lines/glows release) + ~200ms fade-in (new pattern's lines materialize)

This primitive is reusable in F's agent orchestration deep-dive and I.3's portfolio simulation orchestration variants.

### 8.6 Particle-flow ambient implementation (E.7)

The continuous left-to-right particle flow through the 4 strategy rings is implemented via:
- A controlled spawning loop (Framer Motion `motionValue` + `useEffect`-based interval)
- Per-particle motion components with sequenced animations (ring 1 → ring 2 → ring 3 → ring 4 → exit)
- Custom variants for each ring's behavior:
  - WRITE: `pause-and-pass` (variant with delay + glow)
  - SELECT: `filter-or-pass` (variant with conditional disappear)
  - COMPRESS: `merge-if-multiple` (variant with merge logic when ≥2 particles arrive within window)
  - ISOLATE: `split-into-multiple` (variant with split into 2–3 child particles)
- All implemented with Framer Motion + SVG; no canvas, no WebGL

### 8.7 Hover-canvas-morph implementation (E.8)

The split-screen left list + morphing right canvas is implemented via:
- `<PitfallCanvas>` parent component holds `activePitfall` state (default: `null`)
- Left items dispatch hover events to update `activePitfall`
- Right canvas conditionally renders `<PitfallIllustration kind={activePitfall ?? "default"}>`
- Cross-fade transition (~500ms `easeInOutCubic`) between illustrations
- Each `<PitfallIllustration>` variant is its own self-contained motion piece (~340×280px)

This pattern is structurally identical to I.3's `<HarnessCanvas>` (which holds `activeHarness` state and renders `<HarnessSimulation kind={activeHarness}>`). Common pattern, two surfaces — primitive could be abstracted into `<MorphingCanvas>` if generalization is worth the effort, but separate implementations are also fine for now.

## 9. Open items (TBD at implementation or follow-up)

| Item | Owner | Why open |
|---|---|---|
| **Section D click-granularity revisit** | Adri (separate discussion) | Section E adopts click-driven motion granularity (one click per speaker beat). Section D currently uses auto-timed phases per advance. After Section E ships and user evaluates, decide whether to retrofit D's pacing. **Not litigated in this brainstorm.** |
| ~~Tool Loadout audience-gloss~~ | ~~Implementation~~ | **RESOLVED 2026-05-09:** Tool Loadout proof point (Llama 3.1 8B failed at 46 tools, passed at 19) moved to E.8 Facilitator notes — speaker-only ammunition; not on slide. Term retained in mitigation tag without on-slide gloss. |
| `nanobanana` icon library option | Implementation | Lucide is locked for Section E. If implementation finds an icon that doesn't exist in Lucide, fall back to thin-line SVG hand-drawn or check Phosphor (also free). Note: E.10 needs `Network` and `Brain` icons — verify Lucide has both at 1.5px stroke. |
| ~~Final image-gen prompt for E.11 hero photo~~ | ~~Implementation~~ | **RESOLVED 2026-05-09:** prompt locked in §4.11 — "three concentric layered piles" framing. Refine via gemini-image-gen iterations only if visual delivery falls short. |
| Final copper hex ladder | Implementation | Settled at projection-test time per meta-spec §6.5 |
| Final projection-scale font sizes (px) | Implementation | Calibrated during projection testing per meta-spec §7.2 |
| Cross-slide advance pacing | Implementation | ~30s/advance baseline; speaker rehearsal will tune |
| Canonical-pose freeze frames | Implementation | Defined per slide above; capture during PDF/PPTX export pipeline (per meta-spec §4.1) |
| E.4 modal close affordance — escape key | Implementation | Specifying click `×` only above; consider also closing on Escape key for keyboard accessibility. |
| E.10 expand-shrink close affordance — escape key | Implementation | Three close behaviors specified (× / click-outside / click-same). Consider Escape key as a fourth for keyboard accessibility — match E.4's eventual convention. |
| Particle-flow performance on E.7 | Implementation | 8–12 active particles + per-ring conditional behavior may be expensive. Profile during implementation; reduce particle count or simplify per-ring behavior if frame rate drops below 60fps at projection scale. |
| Hover-canvas-morph cross-fade timing on E.8 | Implementation | 500ms `easeInOutCubic` is starting point; tune via speaker rehearsal. |
| E.10 PracticeGrid reflow timing | Implementation | 500ms `easeInOutCubic` for grid→1+7 reflow + 300ms content fade. Tune via speaker rehearsal — if it feels sluggish for live demo, reduce reflow to ~400ms. |
| E.1 connector-motion frame budget | Implementation | 4 patterns × ~6 simultaneous particles (Decentralized peak) = ~24 active SVG motion components. Profile at projection scale. If frame rate drops, simplify to single-pulse-per-line with directional arrows instead of full bidirectional flow. |

## 10. Acceptance criteria

A given Section E slide is "done" when:

- All content slot-table values are present in the slide
- All keyword highlights appear in copper-italic per memory rule
- FIG label appears top-left with correct `section.num` and label
- All declared logical advances trigger correctly via Space (click-driven discipline observed)
- Hover interactions (where applicable) reveal the specified payload
- Click-to-expand modals (E.4) open and close correctly
- Hover-canvas-morph (E.8) transitions correctly between pitfall illustrations
- **Click-to-expand-shrink (E.10) reflows from 2×4 grid to 1+7 layout correctly with all three close behaviors (× / click-outside / click-same)**
- **E.10 Orchestration practice card embeds `<HarnessPattern>` and plays its internal animation correctly on first expansion**
- **E.1 multi-agent orchestration loop displays distinct connector-motion signatures per pattern (round-trip / bidirectional / sequential / synchronized burst) — each pattern visually recognizable at 1.5s glance**
- Targeted ambient (E.6 inward flow + clockwise highlight, E.7 particle flow, E.8 chaos arrows) runs at the specified period and behavior
- Canonical pose can be captured cleanly for PDF/PPTX export
- No paid dependencies introduced
- Visual matches the spec at projection scale (validated via real-slide projection test per meta-spec §6.5)
- Lucide icons render at correct stroke + color

Section E as a whole is "done" when:

- All 11 slides individually pass acceptance
- Inter-slide narrative flow holds (per §5.1)
- Cross-section bridges land cleanly:
  - D.5 → E.1 (`the system` rhyme)
  - E.11 → F (techniques that matter most — selective deep-dive)
- Cross-spec dependency satisfied:
  - **`<HarnessPattern>` (embedded in E.10's Orchestration practice card) visually matches `<HarnessCanvas>` default state on I.3 EXACTLY** (same component, single source of truth)
  - I.3 left-rail vocabulary (`HARNESSES → Workflows + Plugins`) reads as recognized after E.10's Plugins practice card + Triggers practice card
- Meta-callbacks land:
  - E.1 → E.5/E.6 (6 satellites recognition)
  - E.1 → E.10 (MAIN AGENT silhouette → full pattern recognition inside Orchestration practice)
  - E.1 (centralized pattern) → E.10 (`Pattern: centralized` annotation)
  - E.5 → E.6 (constraint bullets → satellite mapping)
  - E.6 ↔ E.8 (same network, two ambient registers)
  - E.7 → E.10 (4 strategies → automated by Plugins / Memory / Observability practices)
  - E.8 → E.9 (mitigations → Includes row, with per-name copper-glow recognition payoff)
  - E.6 (Persistent Memory) ↔ E.10 (Memory practice — extended as self-learning)
  - E.9 (Cursor quote) ↔ E.1 (Anthropic quote — same idea, two registers)
- Total logical advances match §6 budget (47 ± 2)
- Click-driven motion discipline observed (one click per speaker beat across all 11 slides)
- Both implementation plans (Plan A: E.1–E.5 + Plan B: E.6–E.11) have been validated against this spec

## 11. Next step

This spec is ready for review on Section E. Order of operations:

1. **User reviews this spec** for Section E accuracy + completeness; revisions inline.
2. **Self-review pass** on the full spec (placeholder scan, internal consistency, scope check).
3. **Generate TWO implementation plans** (the spec is large; a single plan would be too long to manage well):
   - **Plan A — Section E first half:** E.1 (THE THREE LAYERS) + E.2–E.5 (PROMPT layer arc). Includes foundational primitives shared across both halves: `<HoverPopover>`, `<ImpactLadder>`, `<StructureSpine>` + `<FrameworkOrbit>`, `<NaiveVsProper>`, `<TechniqueCard>` + `<TechniqueModal>` + `<TieredTechniqueGrid>`, `<LayerCard>` + `<LayerDemo>` + `<MultiAgentOrchestration>` (with per-pattern connector motion).
   - **Plan B — Section E second half:** E.6 (CONTEXT) + E.7 (strategies) + E.8 (pitfalls) + E.9 (HARNESS thesis) + E.10 (HARNESS PRACTICES) + E.11 (BRIDGE TO F). Includes Plan-B-specific primitives: `<NodeNetwork>` (signature primitive), `<StrategyRings>`, `<PitfallCanvas>` + `<PitfallIllustration>`, `<HarnessPackage>`, `<ThesisPanel>`, **`<PracticeGrid>` + `<PracticeCard>` (NEW)**, **`<HarnessPattern>` (cross-spec critical primitive)**.
4. **Invoke `superpowers:writing-plans` twice** — once per plan — with each plan independently review-gated against this spec.
   - Plan A produces ~5 review checkpoints (one per slide cluster within E.1–E.5).
   - Plan B produces ~6 review checkpoints, with **explicit checkpoint at `<HarnessPattern>` build** (cross-spec critical) and **explicit checkpoint at `<PracticeGrid>` interaction** (new primitive, highest implementation risk).
5. **Section F brainstorm** (separate session) — uses E.10's eight practices catalog as the structural anchor: F covers a *selective* subset (per E.11 bridge) — the techniques that matter most, not exhaustive coverage.

**Why two plans (rationale):** the spec covers 11 slides, ~14 new primitives, multiple new interaction patterns, and a critical cross-spec dependency. Splitting at the natural narrative break (end of PROMPT layer / start of CONTEXT layer) keeps each plan's scope tight enough that review checkpoints stay meaningful. Plan A's primitives serve as foundation; Plan B builds on them while introducing the most complex new primitives (`<NodeNetwork>` state machine, `<PracticeGrid>` reflow, `<HarnessPattern>` cross-spec).
