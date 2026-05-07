# Huashu-Design Demos — Ideation for Berau Deck

**Source:** `/Users/macbook/.claude/skills/huashu-design/demos` (English-suffix `-en` demos only)
**Purpose:** Mine the huashu-design demo collection for design ideation — visual aesthetic, motion patterns, and interaction models — to inform the Berau workshop deck. Specific focus: the I.3 PORTFOLIO slide (left-list + right-canvas with harness simulations).
**Last researched:** 2026-05-07

## Demos by relevance to portfolio slide

### HIGH relevance (directly informs I.3 portfolio design)

#### 1. `c4-tweaks-en.html` — Split-screen with slider-driven state mutations

**Pattern:** Left panel of controls (sliders, knobs) drives a right canvas that smoothly morphs in response. The same pattern as our proposed I.3 layout — left list of items, right canvas that swaps based on selection.

**What to steal:**
- Smooth state-mutation transitions on the canvas (CSS variable tweens, not hard cuts)
- Active-state visual feedback on the controlling panel item
- Silky responsiveness — interaction feels "live," not stepped

**Direct application:** This is the *closest precedent* to our I.3 design. When user clicks a list item, the right canvas should morph (not hard-swap) to that item's simulation. Borrow the easing curves and transition durations.

#### 2. `c3-motion-design-en.html` — Timeline-driven animation with playhead

**Pattern:** Top section shows a timeline; bottom section is the "stage" where multiple visualizations animate in parallel, all synchronized to a playhead position.

**What to steal:**
- Orchestrated parallel animations within a single canvas
- Playhead-synced opacity (different elements peak in/out as time progresses)
- Multiple viz types coexisting in the same stage without competing

**Direct application:** Each "heavy" simulation in our right canvas (legal-nanoearn, exchanger-news, stocks-hot, nanovest-product, NotebookLM) needs to show *parallel orchestration* — sub-agents activating simultaneously, tools firing at staggered moments. The playhead pattern is exactly the conceptual model. We don't need a visible playhead; we just need the underlying *orchestration timing* this demo demonstrates.

#### 3. `hero-animation-v10-en.html` — Terminal + GUI glyph choreography

**Pattern:** Layered abstract system interfaces — terminal output, file icons, sliders, folders — animate in with staggered reveal timing. Each glyph has a brief moment of attention.

**What to steal:**
- Stagger choreography (glyphs appear with rhythmic delay, not all at once)
- Mixing icon types (terminal text + UI controls + file glyphs) in the same composition
- Deliberate negative space — not every region has a glyph at every time

**Direct application:** Our "light" portfolio items (MCPs, workshops) get simple panels — but those panels could *animate in* with this kind of glyph choreography rather than being plain text. Adds craft to slides that would otherwise feel flat.

### MEDIUM relevance (useful for other slides in the deck)

#### 4. `c1-ios-prototype-en.html` — Mobile mockup with tap-feedback + screen transitions

**Pattern:** A phone mockup where tapping triggers screen transitions with feedback ripples and tab-bar underline animations.

**What to steal:**
- Tap-feedback ripples (could apply to tile clicks in I.3)
- Multi-screen navigation pattern (could inform K.1's "your next 2 hours" handoff if it benefits from a step-through)
- Tab bar with underline indicator (could inform left-list active state)

#### 5. `c2-slides-pptx-en.html` — Split-screen workflow with cursor flight-paths

**Pattern:** Two side-by-side surfaces (HTML and PowerPoint), with an animated cursor flying between them and editing text in real-time.

**What to steal:**
- Cursor flight-path animation (could be repurposed in I.1 META + PROCESS to show data flowing between stages)
- Side-by-side comparison layout
- Real-time edit visualizations

### LOWER relevance (interesting but tangential)

- **`c5-*-en`** — scale + blur push-in transitions
- **`c6-*-en`** — light sweep effects
- **`w1-*-en`** — card chain with active state
- **`w3-*-en`** — wall grid with selected cell, transform3d depth

These are tactical references for specific micro-effects rather than overall layout templates.

## Pattern inventory (cross-demo)

### Interaction patterns

- **Knob-drag with overshoot** (`c4`) — for any draggable control
- **Cursor flight-paths** (`c2`) — for showing data movement between zones
- **Tap-feedback ripples** (`c1`) — for click affordance
- **Light sweeps** (`c6`) — for highlight moments

### Motion techniques

- **ExpoOut easing for entrance** — punchy, decelerating arrivals
- **CubicOut for exits** — gentler departures
- **Staggered ripple delays** — multiple elements arrive in rhythm
- **Playhead-synced opacity** — elements peak in/out as time progresses

### List / sidebar patterns

- **Card chains with active state highlighting** (`w1`) — sidebar list with one item visually elevated
- **Wall grids with selected cell** (`w3`) — gallery with one tile in focus
- **Tab bars with underline indicators** (`c1`) — horizontal tab navigation

### Canvas transitions

- **Hard opacity swaps** (`c1`) — instant on/off
- **Scale + blur push-ins** (`c5`) — incoming content scales up + de-blurs
- **Transform3d depth effects** (`w3`) — tiles move in z-axis

## Top 3 patterns to steal for I.3 PORTFOLIO

### Pattern 1 — `c4-tweaks-en` split-screen state-mutation

**Apply to:** the entire I.3 layout (left-list + right-canvas).

**How:** When the user clicks any list item, the right canvas should *morph* to that item's simulation, not hard-cut. Use the easing + duration from c4. Active-state styling on the clicked item mirrors c4's slider-active visual.

**Why this is the strongest steal:** c4 IS the exact pattern we're building. The demo proves the interaction model is buildable and feels alive.

### Pattern 2 — `c3-motion-design-en` parallel orchestration timing

**Apply to:** the heavy simulations (5 plugins/workflows) inside the right canvas.

**How:** Each simulation isn't a single linear animation — it's multiple sub-elements (sub-agents, tools, data flows) animating in parallel with carefully orchestrated timing offsets. Use a single conceptual "playhead" per simulation: at t=0 main agent activates, at t=200ms first sub-agent fires, at t=400ms tools cascade, etc. All running in a continuous loop.

**Why this matters:** the harness pattern *is* parallel orchestration. Showing it as a single linear flow misrepresents the architecture. The c3 pattern lets us be honest visually.

### Pattern 3 — `hero-animation-v10-en` glyph choreography for light panels

**Apply to:** the "light" portfolio items (MCPs, workshops) inside the right canvas.

**How:** Instead of a static text panel, each light item's panel has its content (text + icons + small visual cues) animate in with staggered glyph timing. Brief, restrained — completes in <1 second — but adds visual texture.

**Why this matters:** light panels are the *most* of the slide's clicks (7 of 12 items). Without animated arrival, half the clicks land on dead surfaces. The hero-animation pattern keeps even the light items alive without making them compete with the heavy simulations.

## Implementation notes for the substrate

- All easing curves used by huashu demos are standard CSS / Framer Motion presets. No exotic dependencies.
- The split-screen c4 pattern is implementable in shadcn + Tailwind + Framer Motion (our locked stack per meta-spec §8.1).
- Glyph choreography (hero-v10) is just `Stagger` with custom delay offsets — Framer Motion supports natively.
- No paid components or proprietary effects. Free-stack compatible.
