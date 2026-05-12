# Slides — Section C (Mindset) Rework Spec

## 0. Scope

This spec re-works the **5 mindset slides + bridge** (slides 8–13) of the workshop deck, building on the foundation laid in `2026-05-11-slides-opening-title-A-B-C.md`. The narrative arc is unchanged — *Tool→Bridge*, *Replacement→Multiplier*, *Executor→Orchestrator*, *V-Bounce Workflow*, *Role→Trajectory*, *Bridge to Mechanics* — but the **headers, layouts, step-reveals, illustrations, and content framing** are revised to address four problems surfaced in review:

1. **Header inconsistency** — C currently has two competing FIG-label patterns (hand-rolled top-right on photographic slides; component-based top-left on diagrammatic slides). Both diverge from the canonical pattern used in B2–B5 and D2–D4.
2. **Under-rendered illustrations on C3 and C4** — stick-figure silhouettes that won't project; a V-diagram with thin connectors and no node iconography; flat 3-card row on C2.
3. **Inconsistent and awkward step reveals** — C4's `Math.min(stepIndex, 2)` clamp, C2's recognition line revealing on mount, C1's 5-step pacing for a 2-declaration slide.
4. **Photographic background discipline** — Section C is the deck's cognitive interior; photography should be reserved for the Bridge as the singular "we've arrived" moment.

Section C lands the deck's central mindset. Hook 2 (Section I.4) depends on three things absorbed here:

- *AI is a bridge, not a tool* (C1)
- *Fear of replacement is misplaced; AI is a multiplier* (C2)
- *Trajectory > role; AI fluency is portable* (C5, ambient pulse on `wherever you need to be`)

Content additions are grounded in `docs/researches/2026-05-12-ai-mindset-mental-models.md`, with the most-cited 2025–2026 mindset shifts feeding into C2 (3-card reframe), C3 (Orchestrator triad), C4 (iterative loop + verification anchor), and C5 (Chief Question Officer framing).

---

## 1. Cross-section conventions

### 1.1 Canonical header pattern (adopted from B2–B4 / D2–D4 / E9)

Every Section C slide except the **Bridge** uses the canonical pattern:

```
— FIG. C.{n} · MINDSET {n} / 5            ← FigLabel component, top:36 left:48
{Slide Title}                              ← .slide-headline.small, top:80 left:48
```

CSS already exists in `src/styles/globals.css`:

```css
.slide-headline-row { position: absolute; top: 80px; left: 48px; right: 48px; }
.slide-headline      { font-family: var(--display); font-weight: 400; font-size: 46px; line-height: 1.05; letter-spacing: -0.01em; color: var(--neutral-50); margin: 0; }
.slide-headline.small { font-size: 40px; }
```

| Slide | FIG label | Slide title |
|---|---|---|
| **C1** | `— FIG. C.1 · MINDSET 1 / 5` | *From Tool to Bridge.* |
| **C2** | `— FIG. C.2 · MINDSET 2 / 5` | *From Fear to Leverage.* |
| **C3** | `— FIG. C.3 · MINDSET 3 / 5` | *From Executor to Orchestrator.* |
| **C4** | `— FIG. C.4 · MINDSET 4 / 5` | *The Shape of the New Work.* |
| **C5** | `— FIG. C.5 · MINDSET 5 / 5` | *From Role to Trajectory.* |
| **Bridge** | `— BRIDGE · FROM MINDSET TO MECHANICS` | *(none — Bridge keeps its hand-rolled FIG-label-only header, photographic surface)* |

The "MINDSET n/5" suffix on FIG labels gives the audience a deck-wide *progress beacon* and the slide title carries the conceptual handle. Together they replace the previous practice of overloading the FIG label with both ID and concept.

**Implementation:** Remove all hand-rolled FIG labels in `c1-tool-to-bridge.tsx`, `c5-role-trajectory.tsx`. Use the existing `<FigLabel section="C" num={n} label={...} />` component everywhere except Bridge. The component's default `top:36 left:48` position is correct; no positioning prop is added.

### 1.2 Photographic surface discipline

**All five mindset slides (C1–C5) render on the deck's standard dark surface** — `var(--neutral-950)` base + 24px radial dot-grid at 0.05 opacity. No hero photographs.

This is a deliberate reversal of the original C1/C5 spec which called for photographic heroes. Rationale: Section C is the deck's *cognitive interior* — five slides happening "in the head," not in the physical world. A uniform dark canvas reinforces this read. Then the **Bridge slide alone breaks the pattern** with a hero photograph, becoming the narrative punctuation that says "we have arrived in the world."

**Hardcoded `HERO_SRC = undefined` in C1 and C5 is removed**, along with `<HeroPhoto>` and `<DarkenOverlay>` usage. C1 and C5 get redesigned layouts that earn the empty canvas rather than apologize for a missing photo.

### 1.3 Canonical 5-step rhythm

Every C mindset slide (C1 excepted — see §3.1) follows a uniform 5-step reveal shape:

| Step | Role |
|---|---|
| 0 (load) | Background, FIG label, slide title fade in together (mount-driven, 400ms) |
| 1 | First content layer reveals (silhouette, headline, recognition line, first V-node, left pane) |
| 2 | Second content layer reveals (clarifier, strikethrough, bullets, second V-node, right pane top) |
| 3 | Third content layer reveals (cards, bars, beats, closing buildup) |
| 4 (canonical pose) | Closing element + 4s ambient pulse on the keyword that carries to Hook 2 |

**C1 is intentionally collapsed to 2 steps** because its narrative is two declarations, not five. See §3.1.

**C4 collapses to 5 steps** by chunking the V-diagram's three nodes into a single step with internal stagger, rather than spreading the V-draw across 3 separate Space presses. See §3.4.

**Bridge stays at 2 steps** (quote → handoff) per original spec — already minimal and contextually correct.

### 1.4 Content sharpening from research

Three frames from `2026-05-12-ai-mindset-mental-models.md` were elevated where current Section C only touched them:

- **Verification as the new core skill** (MIT Sloan, Karpathy verifiability thesis) — promoted to C4's anchor line.
- **Iteration as the workflow primitive** (Mollick, Willison context engineering) — added as a recursive loop-back to C4's V-diagram.
- **Chief Question Officer / Author → Editor** (HBR, McKinsey 2025–2026) — sharpens C5's PERSONAL beat.

Plus two smaller research-anchored swaps:

- **C2's 3 cards** reframed from three variations of "multiplier" to three distinct benefits (LEVERAGE / VELOCITY / JUDGMENT) — covers output multiplication, cheaper iteration, and verification-value respectively.
- **C5's COMPETITIVE beat** sharpened to emphasize economic obsolescence rather than vague "falling behind."

---

## 2. Header consistency — per-slide adjustments

Section C currently uses three different header treatments. Each becomes the canonical pattern from §1.1.

| Slide | Before | After |
|---|---|---|
| C1 | Hand-rolled FIG top-right; no slide title; 88px display headline center | `<FigLabel>` top-left; `.slide-headline.small` "From Tool to Bridge."; 88px headline drops to ~y=300 |
| C2 | `<FigLabel>` top-left; no slide title; recognition line ~y=80 | `<FigLabel>` top-left; `.slide-headline.small` "From Fear to Leverage."; recognition line moves to ~y=156 |
| C3 | `<FigLabel>` top-left; no slide title; BEFORE/AFTER labels ~y=80 | `<FigLabel>` top-left; `.slide-headline.small` "From Executor to Orchestrator."; BEFORE/AFTER labels move to ~y=156 |
| C4 | `<FigLabel>` top-left; no slide title; V-diagram center-top | `<FigLabel>` top-left; `.slide-headline.small` "The Shape of the New Work."; V-diagram moves to y=156–400 |
| C5 | Hand-rolled FIG top-right; no slide title; 84px headline ~y=230 | `<FigLabel>` top-left; `.slide-headline.small` "From Role to Trajectory."; right-pane headline moves to ~y=156 (see §3.5) |
| Bridge | Hand-rolled FIG top-right (unchanged) | Hand-rolled FIG top-right (unchanged); photographic surface |

The hand-rolled `<FigLabel>` divs in C1/C5 are deleted. Bridge keeps its hand-rolled treatment because (a) it sits on a photograph, (b) it uses the special `— BRIDGE · …` prefix rather than `— FIG. C.n`, and (c) it's a one-off — generalizing the component for one slide isn't worth the surface-area cost.

---

## 3. Per-slide design

### 3.1 C1 — *Tool → Bridge* (2-step collapse)

**Surface:** Standard dark + dot-grid (no photo). `<HeroPhoto>` and `<DarkenOverlay>` removed.

**Layout (1280×720 stage, all coordinates absolute):**

```
— FIG. C.1 · MINDSET 1 / 5                          (top:36 left:48)
From Tool to Bridge.                                (top:80 left:48, .slide-headline.small)

                                                    
        AI is not a [t̶o̶o̶l̶].                          (top:280, centered, Instrument Serif 88px, neutral-50)
                                                    
            It's a *bridge*.                        (top:400, centered, Source Serif italic 52px, copper-400)
                                                    
                                                    
                              FROM:                  (bottom-right, y≈580)
                              occasional use, narrow tasks, single sessions.
                              TO:
                              daily fluency, broad reach, *standing capability*.
```

**Step reveal (2 steps; canonical pose: 2):**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG + slide title + bg fade in together (400ms) | 400ms |
| 1 | **Declaration 1.** "AI is not a tool." reveals (300ms fade) → copper-700 strikethrough draws across `tool` (400ms easeOutExpo) → "It's a bridge." italic copper-400 reveals 200ms after strikethrough completes | ~1100ms total |
| 2 (canonical) | **Declaration 2.** "From: …" line slides up from 12px offset (400ms) → "To: …" line slides up 250ms after (400ms) → 4s ambient copper-glow pulse begins on `standing capability` | ~850ms total + ambient |

**Slide def update:** `steps: 2, canonicalPose: 2` (was `steps: 5, canonicalPose: 4`).

**Hover:** Hover on `bridge` (the clarifier word) shows a tiny popover: *"Something you cross daily, not something you reach for occasionally."* Hover on `standing capability` (the To line) shows: *"Fluency that travels with you across contexts."*

**Implementation notes:**
- The strikethrough remains the visual hinge of C; sharp 400ms easing.
- Internal stagger inside step 1 must feel like *one* presenter beat, not three — total step-1 duration ~1.1s so the presenter advances on a single Space press and lets the choreography play.

### 3.2 C2 — *Replacement → Multiplier* (B3-tile card upgrade + content reframe)

**Surface:** Standard dark + dot-grid (unchanged).

**Layout:**

```
— FIG. C.2 · MINDSET 2 / 5                          (top:36 left:48)
From Fear to Leverage.                              (top:80 left:48, .slide-headline.small)

  "Most of us start with AI the way we started      (top:156, centered, Source Serif 22px italic, neutral-300)
   with Google — type, read, move on.
   *That's a reasonable place to start.*"           (italic clause copper-300)

       [AI will replace me.]  →  Someone using AI will.    (middle band y≈300–380)
       (struck through)          So I learn to use it.
                                                            
  ┌── LEVERAGE ──┐  ┌── VELOCITY ──┐  ┌── JUDGMENT ──┐    (bottom row, y≈500–705)
  │ {anim slot}  │  │ {anim slot}  │  │ {anim slot}  │
  │ → bullet 1   │  │ → bullet 1   │  │ → bullet 1   │
  │ → bullet 2   │  │ → bullet 2   │  │ → bullet 2   │
  │ → bullet 3   │  │ → bullet 3   │  │ → bullet 3   │
  └──────────────┘  └──────────────┘  └──────────────┘
```

**Card content (3 cards, B3-tile pattern, 180×205 each):**

| Card | Label | Animation (75px slot) | Bullets (3 × mono → glyph + serif body) |
|---|---|---|---|
| 1 | `LEVERAGE` | `LeverageAnim` — one short bar at left grows into a row of 10 progressively taller bars filling rightward over 2.4s | → 10× existing output<br>→ On work you already do well<br>→ Compound over time |
| 2 | `VELOCITY` | `VelocityAnim` — 5 small copper-700 squares appear sequentially at ~120ms intervals, all pulse together briefly, then reset | → 5 drafts in the time of 1<br>→ Cheaper to try, easier to discard<br>→ More shots, more learning |
| 3 | `JUDGMENT` | `JudgmentAnim` — 3 small candidate diamonds appear, a copper-300 magnifier glides across them, 2 fade to grey + 1 gets a copper-300 check overlay | → Your taste scales when typing doesn't<br>→ Verify is the new bottleneck<br>→ Domain expertise wins |

The animations adopt B3ParamAnims' vocabulary: copper-700 primary motion, copper-300 highlight, 2–2.4s loop, no internal captions (bullets do the explaining).

**Step reveal (5 steps; canonical pose: 4):**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG + slide title + recognition line fade in together (400ms) | 400ms |
| 1 | Fear panel reveals: "AI will replace me." (no strikethrough yet) | 400ms |
| 2 | Strikethrough draws across fear panel — copper-700, 500ms easeOutExpo (slower than C1's, emotional beat) | 500ms |
| 3 | Copper arrow pathLength 0→1 + leverage panel two-line reveal ("Someone using AI will." then italic "So I learn to use it.") | 800ms |
| 4 (canonical) | 3 cards fade-in from below with 120ms stagger; card animations begin looping immediately | 600ms + looping |

The recognition line moves from "fades in on mount" (current) to "fades in with FIG + title on step 0" — staying ambient but tied to the canonical step rhythm.

**Card component:** Reuse the existing `<B3ParamTile>` component verbatim from `src/slides/landscape-section-b/components/B3ParamTile.tsx` (or extract it to `src/components/ParamTile.tsx` if the import path becomes awkward). Card hover behavior already wired: scale 1.06, copper-300 border, copper-300 shadow glow.

**New animation components** live in `src/slides/mindset-section-c/components/C2CardAnims.tsx`:
- `LeverageAnim`
- `VelocityAnim`
- `JudgmentAnim`

Each implements `SHELL_STYLE` flex-centering like B3ParamAnims and uses `<animate>` for indefinite loops.

**Slide def update:** `steps: 5, canonicalPose: 4` (unchanged).

### 3.3 C3 — *Executor → Orchestrator* (silhouette upgrade + Orchestrator triad)

**Surface:** Standard dark + dot-grid (unchanged).

**Layout (50/50 vertical split with 1px copper-700 divider, unchanged):**

```
— FIG. C.3 · MINDSET 3 / 5                          (top:36 left:48)
From Executor to Orchestrator.                      (top:80 left:48, .slide-headline.small)

  ┌── LEFT (BEFORE) ─────────┬── RIGHT (AFTER) ─────────┐  (y:156–620)
  │                          │                          │
  │  BEFORE (mono caps)      │              AFTER       │
  │                          │                          │
  │  [filled silhouette]     │  [filled silhouette]     │
  │   hunched at desk        │   standing, arm directing│
  │                          │                          │
  │  EXECUTOR (Inter caps,   │  ORCHESTRATOR (Inter caps,│
  │   neutral-400 ~28px)     │   copper-400 ~28px)      │
  │                          │  Direct. Verify. Decide. │
  │                          │   (mono caps 11px        │
  │                          │    copper-300 0.22em)    │
  │                          │                          │
  │  • Write line by line    │  • Set direction         │
  │  • Debug manually        │  • Specify intent        │
  │  • Document everything   │  • Verify and review     │
  │  • Repetitive sub-tasks  │  • Decide and own it     │
  │  • Time → typing         │  • Time → *thinking*     │
  └──────────────────────────┴──────────────────────────┘

          AI handles the typing. You handle the *thinking*.      (y≈660, Source Serif italic 32px, neutral-200)
```

**Silhouettes:** Replace stick-figure SVGs with **solid filled silhouettes** (single closed-path SVG, no internal line work). Same poses:

- **Executor:** filled silhouette hunched at desk, head tilted forward, both arms reaching to keyboard. Color: neutral-500. Rendered size 160×220.
- **Orchestrator:** filled silhouette standing tall, head upright, right arm extended outward in directing posture. Color: copper-400. Rendered size 180×240 (intentionally larger — the new role expands you).

Filled-path silhouettes project robustly at 720p; stick-figure 1.6px strokes do not. Implementation lives in `src/slides/mindset-section-c/components/MindsetSilhouette.tsx` (replace existing).

**Per-bullet iconography:** Each bullet on both sides prefixes its text with a 14×14 SVG line glyph in copper-300 (left side) or copper-400 (right side). Vocabulary:

| Side | Bullet | Icon |
|---|---|---|
| Executor | Write line by line | keyboard glyph |
| Executor | Debug manually | magnifier glyph |
| Executor | Document everything | paper-stack glyph |
| Executor | Repetitive sub-tasks | repeat-arrows glyph |
| Executor | Time → typing | clock glyph |
| Orchestrator | Set direction | compass glyph |
| Orchestrator | Specify intent | pen-and-brief glyph |
| Orchestrator | Verify and review | shield-check glyph |
| Orchestrator | Decide and own it | flag glyph |
| Orchestrator | Time → *thinking* | lightbulb glyph |

Icons replace the current copper-circle bullet dots. They live in `src/slides/mindset-section-c/components/C3Icons.tsx` as a single export object `c3Icons` keyed by bullet id.

**Orchestrator triad caption** (new): Beneath the `ORCHESTRATOR` title, before the bullets, add a single line in mono caps:

```
Direct. Verify. Decide.
```

Mono 11px, copper-300, 0.22em letter-spacing, uppercase. Three-word mnemonic anchored in research (Direct = direction-setter, Verify = verification-as-core-skill, Decide = delegate-authority-not-accountability).

**Sharpened bullets:** "Decide and innovate" → **"Decide and own it"** (delegate authority, not accountability). Other Orchestrator bullets remain.

**Step reveal (5 steps; canonical pose: 4):** Unchanged from current — only the visual elements inside each step change.

| Step | What happens |
|---|---|
| 0 (load) | FIG + slide title + vertical copper-700 divider draw in |
| 1 | LEFT filled silhouette + `EXECUTOR` title reveal |
| 2 | LEFT bullets (with icons) stagger-fade (5 × 80ms) |
| 3 | RIGHT filled silhouette + `ORCHESTRATOR` title + triad caption reveal (silhouette layout-morphs from hunched template, 700ms easeOutExpo) |
| 4 (canonical) | RIGHT bullets stagger-fade + punchline italic reveal with 4s ambient pulse on `thinking` |

**Hover:** Hover any bullet → 1-line elaboration surfaces beside it (existing pattern, unchanged).

**Slide def update:** `steps: 5, canonicalPose: 4` (unchanged).

### 3.4 C4 — *V-Bounce Workflow* (recursive V + verification anchor + visual upgrades)

**Surface:** Standard dark + dot-grid (unchanged).

**Layout (V top, bars middle, anchor bottom):**

```
— FIG. C.4 · MINDSET 4 / 5                          (top:36 left:48)
The Shape of the New Work.                          (top:80 left:48, .slide-headline.small)

                  HUMAN WORK: SPECIFY + VERIFY           (y≈170, mono caps 12px copper-300)
                       ┊                                  
        ┌─[icon]──┐                ┌─[icon]──┐
        │ SPECIFY │  ─── arrow ──→ │ VERIFY  │  ──→ SHIP   (V peaks, y≈230)
        │ what &  │ ↗               ↘ review,│
        │  why    │ ↗               ↘ validate│
        └─────────┘                  └────────┘
              ↘                      ↗
               ↘                    ↗
                ↘  ┌─[icon]──┐    ↗
                 ↘ │GENERATE │  ↗                            (V trough, y≈360)
                   │  bulk   │
                   │ AI does │
                   └─────────┘
                                                                
              ⤺  ⋯ ⋯ iterate ⋯ ⋯ ⤻             (dotted loop from VERIFY back to SPECIFY, y≈410)
                                                                
  AI WORK: GENERATE (bulk)                              (y≈440, mono caps 12px neutral-400)

  BEFORE  ┃▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏┃  10% / 80% / 10%     (y≈480)
  AFTER   ┃▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏┃  30% / 20% / 50%     (y≈530)

       More time on what and why. Less time on how to type it.    (y≈610, Source Serif italic 24px, neutral-200)

                            *Verification is the new core skill.*  (y≈660, Source Serif italic 22px, copper-400)
```

**Four changes to the V-diagram:**

1. **Thicker, brighter connector arrows.** Replace 1.6px copper-300 line connectors with **2.5px copper-400** strokes terminated by **filled triangular arrowheads** (not bare lines). Same for the SHIP arrow leaving VERIFY.
2. **Icons in each V-node.** Add a 20×20 copper-300 line glyph centered above the node label:
   - SPECIFY: brief-and-pen glyph
   - GENERATE: gears glyph
   - VERIFY: shield-check glyph
   - SHIP: rocket glyph
3. **Dotted recursive loop-back arrow.** From VERIFY's bottom-right corner curving down and back to SPECIFY's bottom-left corner, drawn as a copper-700 dashed path (strokeDasharray "4 6") with a small arrowhead on the SPECIFY side. Labeled in tiny mono caps (11px, copper-300, 0.22em) **"iterate"** at the midpoint of the curve. Animates on step 3 — pathLength 0→1 over 500ms.
4. **Lane labels at the V midline.** A subtle horizontal copper-900 hairline at y≈295 (between the V peaks at y≈230 and the V trough at y≈360) separates "HUMAN WORK" (above the hairline, where SPECIFY and VERIFY live) from "AI WORK" (below the hairline, where GENERATE lives). The `HUMAN WORK: SPECIFY + VERIFY` caption sits above the hairline; `AI WORK: GENERATE (bulk)` sits below the trough at y≈440. If rehearsal shows the hairline competes visually with the dot-grid background, drop it — the V geometry alone communicates the lane split.

**Anchor line change:** Replace `"This is the *productivity multiplier*."` with **`"Verification is the new core skill."`** — directly anchored in MIT Sloan research (84% expert agreement) and Karpathy's verifiability thesis. The `verification` and `core skill` keywords get copper-400 italic + copper-500 underline. The 4s ambient pulse moves from `productivity multiplier` to `core skill`.

**Sharpened node caption:** VERIFY's caption changes from `"review, validate, polish"` to **`"review, validate, judge"`** — single-word swap that lands the judgment frame.

**Step reveal (5 steps; canonical pose: 4) — collapsed from 6 steps:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG + slide title + lane hairline fade in | 400ms |
| 1 | Both V-peak nodes reveal simultaneously (SPECIFY left, VERIFY right) + both diagonal arrows down to GENERATE position draw together | 700ms |
| 2 | GENERATE node + trough position reveal; SHIP arrow extends right from VERIFY | 600ms |
| 3 | Dotted recursive loop-back arrow draws (pathLength 0→1) with `iterate` label fade-in 200ms after path completes | 700ms |
| 4 (canonical) | BEFORE bar + AFTER bar grow simultaneously (each 800ms, segment scaleX 0→1 from left, 180ms stagger per segment). Punchline + anchor line fade in 200ms after bars complete; 4s ambient pulse on `core skill` | ~1200ms + ambient |

The `Math.min(stepIndex, 2)` clamp on `vStepIndex` is removed. V-diagram now respects the slide's stepIndex directly because the V is fully drawn by step 2 — no clamping needed.

**Hover:** Hover any V-node → 2-line caption expands beside the node. Hover any bar segment → percentage label glows + segment lifts 1px. (Currently in spec but not implemented; this rework adds them.)

**Slide def update:** `steps: 5, canonicalPose: 4` (was `steps: 6, canonicalPose: 5`).

**Implementation notes:**
- The recursive loop-back is the conceptual upgrade. It converts the V from a one-pass diagram into a recursive shape — matches the research's strong claim that AI work is iterative.
- The anchor line change is the single most important content edit in Section C. "Productivity multiplier" already lives on C2 (LEVERAGE card); repeating it here is redundant. "Verification is the new core skill" elevates the slide from "show me the new workflow" to "show me the new high-value skill."

### 3.5 C5 — *Role → Trajectory* (E9 two-pane structure + content sharpening)

**Surface:** Standard dark + dot-grid (no photo). `<HeroPhoto>` and `<DarkenOverlay>` removed.

**Layout (E9-derived two-pane skeleton):**

```
— FIG. C.5 · MINDSET 5 / 5                                                (top:36 left:48)
From Role to Trajectory.                                                  (top:80 left:48, .slide-headline.small)

┌─ LEFT pane ──────────────────────────────┐   ┌─ RIGHT pane ─────────────────────────────────┐
│ (left:48, top:156, width:500, bottom:80) │   │ (right:48, top:156, width:540, bottom:80)    │
│                                          │   │                                              │
│  WHY NOW                                 │   │  It's not a [r̶o̶l̶e̶] you take.                  │
│  ━━━━━━━━━ (40% copper-700 rule)         │   │  (display 72px, neutral-50)                  │
│                                          │   │                                              │
│  ▪ COMPETITIVE                           │   │  It's a *trajectory* you build.              │
│    Roles without AI fluency stop being   │   │  (Source Serif italic 44px, copper-400)      │
│    economical.                           │   │                                              │
│                                          │   │  ━━━━━━━━━━━━ (60% copper-700 rule)          │
│  ▪ CAPACITY                              │   │                                              │
│    AI fluency multiplies what one        │   │  (flex spacer pushes closing line to bottom) │
│    person can do.                        │   │                                              │
│                                          │   │                                              │
│  ▪ CULTURAL                              │   │  The bridge from where you are to            │
│    Modern teams default to AI-augmented  │   │  *wherever you need to be.*                  │
│    work.                                 │   │  (Source Serif italic 32px, neutral-100;     │
│                                          │   │   italic phrase copper-400 + 4s ambient pulse)│
│  ▪ PERSONAL                              │   │                                              │
│    From writing the answer to *choosing  │   │                                              │
│    the question*.                        │   │                                              │
│                                          │   │                                              │
└──────────────────────────────────────────┘   └──────────────────────────────────────────────┘
```

This layout mirrors E9's coordinate envelope verbatim — same `top:156`, same `bottom:80`, same 500/540 pane widths, same section-title-with-copper-rule pattern. The two-pane structure visually *enacts* the closing line: the 4 beats live on the "from-side," the closing italic line lives on the "to-side," and the implicit dividing line between panes IS the bridge.

**Beats (sharpened from current):**

| Label | Caption |
|---|---|
| `COMPETITIVE` | Roles without AI fluency stop being *economical*. |
| `CAPACITY` | AI fluency multiplies what one person can do. *(unchanged)* |
| `CULTURAL` | Modern teams default to AI-augmented work. *(unchanged)* |
| `PERSONAL` | From writing the answer to *choosing the question*. |

The PERSONAL beat picks up the Chief Question Officer framing (HBR, McKinsey, Time 2025–2026), which is the strongest single research-backed reframe for the "What is my new role?" question. The COMPETITIVE beat shifts from soft ("fall behind") to economic ("stop being economical") — sharper consequence framing.

**Beat formatting:**
- Label: mono caps 11px, copper-300, 0.22em letter-spacing
- Caption: Source Serif 16px, neutral-300, line-height 1.45, with italic-copper highlight on keyword
- Square copper-400 bullet glyph (6×6 box) before the label, matching E9's `whyPoints` pattern

**Right pane content:**
- "It's not a [r̶o̶l̶e̶] you take." — Instrument Serif 72px (slightly smaller than C1's 88px because this slide carries more text alongside), copper strikethrough on `role` (mirrors C1's strikethrough on `tool`)
- "It's a *trajectory* you build." — Source Serif italic 44px, copper-400
- 60% copper-700 horizontal rule
- (flex spacer)
- "The bridge from where you are to *wherever you need to be.*" — Source Serif italic 32px, neutral-100, italic phrase copper-400 + 4s ambient pulse

**Step reveal (5 steps; canonical pose: 4):**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG + slide title + LEFT pane "WHY NOW" title + 40% copper rule fade in | 400ms |
| 1 | LEFT pane: 4 beats stagger-fade (130ms apart, matches E9's whyPoints stagger) | ~700ms |
| 2 | RIGHT pane: "It's not a *role* you take." reveals → copper-700 strikethrough draws on `role` (400ms, mirrors C1) | ~800ms |
| 3 | RIGHT pane: "It's a *trajectory* you build." italic copper-400 reveals (300ms after strike completes) + 60% copper rule draws | ~700ms |
| 4 (canonical) | RIGHT pane bottom: "The bridge from where you are to *wherever you need to be.*" fades in italic + 4s ambient copper pulse begins on the italic phrase. **THE HOOK 2 DETONATOR.** | 800ms + ambient |

**Hover:** Hover any beat → 2-line expanded caption surfaces beside it (presenter detail layer, existing pattern adapted).

**Slide def update:** `steps: 5, canonicalPose: 4` (unchanged in count; semantic content changes throughout).

**Implementation notes:**
- The closing line's pulse is the planted memory cue for Hook 2 (Section I.4, "I'm a TPM, not an engineer"). When I.4 fires 90 minutes later, audiences who registered the pulse on `wherever you need to be` experience recognition.
- Beat-hover-elaboration component pattern: reuse `BeatWithHover` from current `c5-role-trajectory.tsx` but simplify — the new beat layout has tighter line spacing because the pane is narrower than the current full-width layout.

### 3.6 Bridge — *From Mindset to Mechanics* (photographic hero, unchanged content)

**Surface:** **Photographic hero** — gemini-image-gen photo loaded via `<HeroPhoto>` with `<DarkenOverlay strength={0.30}>`. This is now the **singular photographic moment in Section C** (C1 and C5 have given up their photos). The image must carry the full "we have arrived; here is solid ground" gravitas in one frame.

**Image-gen prompt (gemini-image-gen):**

```
Abstract editorial photograph, cinematic 16:9 aspect (1920×1080).

Scene: A faint, narrow path emerges from deep copper-toned fog in the lower
foreground and resolves onto a polished stone foundation in the middle
distance. Beyond the foundation, the soft suggestion of architectural geometry
— vertical columns, horizontal beams, structural lines — recedes into a
pre-dawn horizon. Above the architecture, near-black sky with the faintest
hint of a copper-orange glow at the horizon line, as if dawn is moments away.

Mood: contemplative arrival. The quiet moment after a long crossing. Solid
ground beneath travel-worn feet. Reverent. Still. No drama, no spectacle —
editorial restraint. The viewer should feel they have *just* completed a
journey, not that they are about to begin one.

Composition (priority order):
  1. Lower third — the path / foundation transition. Path texture soft, fog
     dissolving as it meets stone. Foundation should read as flat, polished,
     ancient.
  2. Middle third — architectural geometry. Implied not stated. Vertical lines
     and horizontal beams in deep shadow, just barely catching the dawn light.
  3. Upper third — near-black sky with a copper-orange horizon glow.

Color palette: deep neutral blacks (#0A0A0A), warm copper fog (#B86E3D at
low opacity, ~20-30% coverage), faint sunrise warmth at horizon line
(#E2A878, subtle). NO bright whites, NO saturated colors, NO blues. The
frame should read as monochromatic copper-on-black with one warm focal
point at the horizon.

Constraints:
  - NO people, no human figures, no silhouettes.
  - NO text, no signage, no readable surfaces.
  - NO sharp focus throughout — everything has soft atmospheric haze.
  - NO modern technology, no vehicles, no electrical lighting.
  - The architecture must read as *timeless* — could be ancient or
    contemporary, deliberately ambiguous. Stone columns, not steel beams.

Reference vocabulary: Andrei Tarkovsky's *Stalker* zone color grading;
Hiroshi Sugimoto's seascapes for tonal restraint; the foundation moment of
Roden Crater at dawn for the architectural geometry. NOT travel
photography. NOT inspirational landscape stock.
```

**Generated image path:** `/assets/heroes/bridge-foundation.jpg` (replace existing `HERO_SRC = undefined` in `bridge-mindset-to-mechanics.tsx`).

**Layout, content, motion, hover — all unchanged from `2026-05-11-slides-opening-title-A-B-C.md §4.4`.** The slide already implements the Kofi Annan three-line quote, attribution, and handoff line correctly. The only change is loading the actual hero photo.

**Slide def: unchanged.** `steps: 2, canonicalPose: 1`.

---

## 4. Component changes

### 4.1 New components

| Component | Path | Purpose |
|---|---|---|
| `C2CardAnims.tsx` | `src/slides/mindset-section-c/components/C2CardAnims.tsx` | `LeverageAnim`, `VelocityAnim`, `JudgmentAnim` — 75px looping SVG animations for the 3 C2 cards. Mirrors `B3ParamAnims.tsx` vocabulary. |
| `C3Icons.tsx` | `src/slides/mindset-section-c/components/C3Icons.tsx` | Single export `c3Icons` with 10 SVG line glyphs (14×14) keyed by bullet id. |
| `C4LoopBackArrow.tsx` | `src/slides/mindset-section-c/components/C4LoopBackArrow.tsx` | Dotted recursive arrow from VERIFY → SPECIFY with `iterate` label. Animates `pathLength` 0→1 on step 3. |
| `C5TwoPaneLayout.tsx` | `src/slides/mindset-section-c/components/C5TwoPaneLayout.tsx` | Two-pane skeleton matching E9's coordinate envelope; props for left-pane content and right-pane content. |

### 4.2 Modified components

| Component | Path | Change |
|---|---|---|
| `MindsetSilhouette.tsx` | `src/slides/mindset-section-c/components/MindsetSilhouette.tsx` | Replace stroke-based stick figures with single closed-path filled silhouettes. Orchestrator silhouette renders 20px taller and 20px wider than Executor. |
| `VWorkflowDiagram.tsx` | `src/slides/mindset-section-c/components/VWorkflowDiagram.tsx` | Thicker arrows (2.5px copper-400), filled triangular arrowheads, 20×20 node icons, lane hairline. Accept new prop `showLoopBack: boolean` controlled by step 3. |
| `B3ParamTile.tsx` | `src/slides/landscape-section-b/components/B3ParamTile.tsx` → optionally moved to `src/components/ParamTile.tsx` | If C2 imports it directly from B's folder, the cross-section import is acceptable but slightly awkward. Optionally extract to a shared component path. Either is acceptable. |
| `c1-tool-to-bridge.tsx` | `src/slides/mindset-section-c/c1-tool-to-bridge.tsx` | Remove hand-rolled FIG label; add `<FigLabel>` + `.slide-headline-row`. Collapse to 2 steps. Remove `<HeroPhoto>` and `<DarkenOverlay>`. Reflow layout. |
| `c2-replacement-multiplier.tsx` | `src/slides/mindset-section-c/c2-replacement-multiplier.tsx` | Add `<FigLabel>` + `.slide-headline-row`. Replace `MindsetCard` instances with `B3ParamTile` instances + the new C2 animations. Move recognition line from mount-reveal to step-0 reveal. Content: card labels & bullets reframed (LEVERAGE / VELOCITY / JUDGMENT). |
| `c3-executor-orchestrator.tsx` | `src/slides/mindset-section-c/c3-executor-orchestrator.tsx` | Add `<FigLabel>` + `.slide-headline-row`. Use new `MindsetSilhouette` filled variants. Add Orchestrator triad caption "Direct. Verify. Decide." Update bullet "Decide and innovate" → "Decide and own it". Replace dot bullets with `c3Icons` glyphs. |
| `c4-v-bounce-workflow.tsx` | `src/slides/mindset-section-c/c4-v-bounce-workflow.tsx` | Add `<FigLabel>` + `.slide-headline-row`. Use updated `VWorkflowDiagram` with icons + thicker arrows. Add `C4LoopBackArrow`. Update anchor line from "productivity multiplier" to "verification is the new core skill." Update VERIFY node caption "polish" → "judge". Collapse 6 steps to 5. Remove `Math.min(stepIndex, 2)` clamp. |
| `c5-role-trajectory.tsx` | `src/slides/mindset-section-c/c5-role-trajectory.tsx` | Add `<FigLabel>` + `.slide-headline-row`. Remove hand-rolled FIG. Remove `<HeroPhoto>` and `<DarkenOverlay>`. Replace single-canvas layout with `C5TwoPaneLayout`. Update beat captions (COMPETITIVE + PERSONAL sharpened). |
| `bridge-mindset-to-mechanics.tsx` | `src/slides/mindset-section-c/bridge-mindset-to-mechanics.tsx` | Replace `HERO_SRC = undefined` with `HERO_SRC = "/assets/heroes/bridge-foundation.jpg"`. No other changes. |
| `content.ts` | `src/slides/mindset-section-c/content.ts` | Update FIG labels (add MINDSET n/5 suffix), add slide titles, reframe C2 cards, sharpen C3 bullets + add triad, update C4 anchor + VERIFY caption, sharpen C5 beats. |

### 4.3 Deleted components

| Component | Path | Reason |
|---|---|---|
| `MindsetCard.tsx` | `src/slides/mindset-section-c/components/MindsetCard.tsx` | Replaced by `B3ParamTile` for C2's 3 cards. |
| Hand-rolled FIG label divs | inline in `c1-tool-to-bridge.tsx`, `c5-role-trajectory.tsx` | Replaced by `<FigLabel>` component usage. |

### 4.4 Asset additions

| Asset | Path | Source |
|---|---|---|
| Bridge hero photo | `assets/heroes/bridge-foundation.jpg` | gemini-image-gen using §3.6 prompt |

---

## 5. Content map (consolidated diff)

### 5.1 FIG labels (all changed)

| Slide | Before | After |
|---|---|---|
| C1 | `FROM TOOL TO BRIDGE` | `MINDSET 1 / 5` |
| C2 | `FROM FEAR TO LEVERAGE` | `MINDSET 2 / 5` |
| C3 | `A NEW ROLE` | `MINDSET 3 / 5` |
| C4 | `THE NEW WORK SHAPE` | `MINDSET 4 / 5` |
| C5 | `WHEREVER YOU GO` | `MINDSET 5 / 5` |
| Bridge | `FROM MINDSET TO MECHANICS` | *(unchanged)* |

### 5.2 Slide titles (all new)

| Slide | New `.slide-headline.small` |
|---|---|
| C1 | From Tool to Bridge. |
| C2 | From Fear to Leverage. |
| C3 | From Executor to Orchestrator. |
| C4 | The Shape of the New Work. |
| C5 | From Role to Trajectory. |
| Bridge | *(no slide title; FIG-only header)* |

### 5.3 C2 card reframe

| Before | After |
|---|---|
| MULTIPLIER · "10× your existing output on what you already do well." | **LEVERAGE** · 3 bullets: "10× existing output / On work you already do well / Compound over time" |
| CO-PILOT · "AI drafts, you decide. AI types, you think." | **VELOCITY** · 3 bullets: "5 drafts in the time of 1 / Cheaper to try, easier to discard / More shots, more learning" |
| FORCE-MULTIPLIER · "Your team's reach expands without headcount change." | **JUDGMENT** · 3 bullets: "Your taste scales when typing doesn't / Verify is the new bottleneck / Domain expertise wins" |

### 5.4 C3 small edits

- Add caption beneath ORCHESTRATOR title: `Direct. Verify. Decide.` (mono caps 11px copper-300)
- Bullet edit: "Decide and innovate" → "Decide and own it"
- Replace circle-dot bullets with `c3Icons` glyphs (both sides)

### 5.5 C4 small edits

- Anchor line: "This is the *productivity multiplier*." → "*Verification is the new core skill.*" (italic phrase moves)
- 4s ambient pulse target: `productivity multiplier` → `core skill`
- VERIFY node caption: "review, validate, polish" → "review, validate, judge"
- New element: dotted recursive arrow VERIFY → SPECIFY, labeled `iterate`

### 5.6 C5 beat captions

| Label | Before | After |
|---|---|---|
| COMPETITIVE | Roles without AI fluency fall behind. | Roles without AI fluency stop being *economical*. |
| CAPACITY | AI fluency multiplies what one person can do. | *(unchanged)* |
| CULTURAL | Modern teams default to AI-augmented work. | *(unchanged)* |
| PERSONAL | From repetitive execution to *creative judgment*. | From writing the answer to *choosing the question*. |

---

## 6. Step-reveal summary (after rework)

| Slide | Steps | Canonical pose | Notes |
|---|---|---|---|
| C1 | **2** | **2** | Collapsed from 5. Two declarations, one Space press each. |
| C2 | 5 | 4 | Unchanged count; recognition line moved from mount-reveal to step-0 reveal. |
| C3 | 5 | 4 | Unchanged. |
| C4 | **5** | **4** | Collapsed from 6. V-peaks chunked into step 1; loop-back arrow added at step 3. |
| C5 | 5 | 4 | Unchanged count; semantic content reflows across panes. |
| Bridge | 2 | 1 | Unchanged. |

---

## 7. Acceptance criteria

A reviewer should be able to confirm each of the following at the canonical pose of each slide, on a 1280×720 stage in Chrome:

**C1 (canonical pose: step 2):**
- ☐ FIG label reads `— FIG. C.1 · MINDSET 1 / 5` at top:36 left:48
- ☐ Slide title reads "From Tool to Bridge." at top:80 left:48 in 40px Instrument Serif neutral-50
- ☐ "AI is not a tool." sits ~y:280 with copper-700 strikethrough across `tool`
- ☐ "It's a bridge." sits ~y:400 in italic copper-400
- ☐ From/To pair sits bottom-right with `standing capability` pulsing copper
- ☐ Slide advances on exactly 2 Space presses (load → step 1 → step 2)

**C2 (canonical pose: step 4):**
- ☐ FIG label `— FIG. C.2 · MINDSET 2 / 5` and slide title "From Fear to Leverage." in canonical positions
- ☐ Recognition line visible from step 0; "reasonable place to start" in italic copper-300
- ☐ Fear panel struck through; arrow drawn; leverage panel visible
- ☐ 3 cards labeled `LEVERAGE` / `VELOCITY` / `JUDGMENT`, each with looping animation in 75px slot and 3 mono-arrow bullets
- ☐ Hovering any card scales it to 1.06 with copper-300 border + shadow
- ☐ Slide advances on exactly 4 Space presses

**C3 (canonical pose: step 4):**
- ☐ FIG label `— FIG. C.3 · MINDSET 3 / 5` and slide title "From Executor to Orchestrator." in canonical positions
- ☐ Filled silhouettes both visible; orchestrator visibly taller and wider than executor
- ☐ Beneath ORCHESTRATOR title: caption `Direct. Verify. Decide.` in mono caps copper-300
- ☐ Each bullet on both sides has a 14×14 icon glyph (no copper-circle dots)
- ☐ Orchestrator bullet 4 reads "Decide and own it" (not "Decide and innovate")
- ☐ Punchline italic at bottom with copper pulse on `thinking`
- ☐ Slide advances on exactly 4 Space presses

**C4 (canonical pose: step 4):**
- ☐ FIG label `— FIG. C.4 · MINDSET 4 / 5` and slide title "The Shape of the New Work." in canonical positions
- ☐ V-diagram nodes have 20×20 line icons (brief, gears, shield, rocket)
- ☐ Connectors are 2.5px copper-400 with filled triangular arrowheads
- ☐ Dotted recursive arrow from VERIFY → SPECIFY labeled `iterate`
- ☐ VERIFY node caption reads "review, validate, judge" (not "polish")
- ☐ Lane hairline separates "HUMAN WORK" (top) from "AI WORK" (bottom)
- ☐ BEFORE and AFTER bars both visible with their percentages glowing on hover
- ☐ Anchor line reads "*Verification is the new core skill.*" with pulse on `core skill`
- ☐ Slide advances on exactly 4 Space presses (collapsed from 5)
- ☐ No `Math.min` clamp in the code; stepIndex flows through directly

**C5 (canonical pose: step 4):**
- ☐ FIG label `— FIG. C.5 · MINDSET 5 / 5` and slide title "From Role to Trajectory." in canonical positions
- ☐ Two-pane layout: left pane width 500 at left:48, right pane width 540 at right:48
- ☐ Left pane: "WHY NOW" mono-caps section title + 40% copper-700 rule + 4 beats
- ☐ Beat captions match §5.6 (COMPETITIVE / CAPACITY / CULTURAL / PERSONAL)
- ☐ Right pane: strikethrough on `role` in 72px display + italic copper-400 clarifier + 60% copper rule + closing line at bottom
- ☐ Closing line italic phrase `wherever you need to be` has 4s ambient copper pulse
- ☐ Slide advances on exactly 4 Space presses

**Bridge (canonical pose: step 1):**
- ☐ Hero photo loaded from `/assets/heroes/bridge-foundation.jpg` with 0.30 darken overlay
- ☐ Three-line Kofi Annan quote visible with copper-400 italic on `power` / `liberating` / `family`
- ☐ Attribution "— Kofi Annan" right-aligned beneath
- ☐ Handoff line "From here, the *how*." with copper pulse on `how`
- ☐ Slide advances on exactly 1 Space press

---

## 8. Risks + mitigations

| Risk | Mitigation |
|---|---|
| Image-gen output for Bridge photo doesn't meet brief on first attempt | Generate 4–6 variants from the §3.6 prompt; pick the most editorial-restrained. Fallback: heavy darken (0.45+) on a less-than-ideal image, or strip to plain dark + subtle horizontal architectural hairlines if no variant works. |
| `B3ParamTile` import from a different section's folder feels architecturally off | Acceptable in the short term — code review can decide whether to extract to `src/components/ParamTile.tsx` as a post-rework cleanup. Either choice is valid; don't block on it. |
| Filled silhouettes on C3 lose readability at projection (too-similar shapes) | Test at full 1280×720 projection scale before the workshop. Adjust silhouette sizes if the orchestrator-bigger-than-executor metaphor isn't reading. Worst case, increase the size delta from 20px to 30px. |
| C1's 2-step rhythm feels rushed in rehearsal | The step-1 internal stagger (~1.1s) gives the presenter natural breathing room. If rehearsal flags it as too fast, split back into 3 steps (declare → strike → clarify); but try 2 first. |
| C4's lane hairline competes visually with the dot-grid background | Set the hairline at copper-900 with 40% opacity. If still too noisy, drop the hairline entirely and rely on caption positions to communicate the human/AI split. |
| Audience misreads C4's recursive loop-back as "back to start; you failed" rather than "iterate; that's normal" | The `iterate` label is small (mono 11px) but precise. Presenter cheat-sheet should include a one-line callout: "the V is a loop — most work goes around 3–5 times before shipping." |

---

## 9. Open questions

1. **C3 silhouette stylization.** Should the filled silhouettes have *any* internal detail (collar line, hint of a desk under the executor) or remain pure flat-color shapes? Recommend pure flat shapes for projection robustness; revisit if rehearsal feels too abstract.
2. **C5 right-pane closing line size.** 32px Source Serif italic is the proposed size. If it competes visually with the 72px "It's not a role you take." in the same pane, drop to 28px. Test in rehearsal.
3. **C2 animation loop duration.** 2.4s matches B3ParamAnims. If three simultaneously-looping animations feel busy at canonical pose, stagger their start-times by 600ms each so they're never all peaking at once.

---

## 10. Acceptance — locked decisions

These are locked unless a reviewer can articulate a concrete failure mode:

1. ✅ **Canonical header pattern** (`<FigLabel>` + `.slide-headline.small`) on C1–C5; Bridge keeps hand-rolled FIG-only header.
2. ✅ **No hero photos on C1–C5**; standard dark + dot-grid surface uniformly. Bridge is the singular photographic moment.
3. ✅ **C1 collapses to 2 steps**; canonical pose is step 2.
4. ✅ **C2 cards adopt B3ParamTile pattern** with new content (LEVERAGE / VELOCITY / JUDGMENT) and three new looping animations.
5. ✅ **C3 silhouettes go filled** (not stroked); per-bullet iconography replaces copper-circle dots; Orchestrator triad caption added; "Decide and innovate" → "Decide and own it."
6. ✅ **C4 V-diagram gets recursive loop-back arrow** + node icons + thicker arrows + lane hairline; anchor line changes to "Verification is the new core skill."; VERIFY caption "polish" → "judge"; collapse to 5 steps; remove `Math.min` clamp.
7. ✅ **C5 adopts E9 two-pane layout** verbatim coordinate envelope (top:156 / bottom:80 / 500w / 540w); COMPETITIVE and PERSONAL beats sharpened with research-anchored phrasing.
8. ✅ **Bridge loads hero photo** generated from the §3.6 prompt at `/assets/heroes/bridge-foundation.jpg`; no other changes.

---

**End of spec.**
