# Slides — Reveal + Closing — Spec

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Sub-spec:** Reveal + Closing arc (Sections I, J, K) — 9 slides
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Approved 2026-05-07
**Source brainstorm:** in-context 2026-05-07
**Parent meta-spec:** [`docs/specs/2026-05-06-process-and-design-meta.md`](2026-05-06-process-and-design-meta.md)

## 0. Scope

This spec covers per-slide design for the **Reveal + Closing arc** — the climax of the workshop deck:

- **Section I** — Showcase + Hook 2 (the deck's reveal of Adri's profile + portfolio)
- **Section J** — How to start adopting (mindset principles + recipe)
- **Section K** — Practice-lab handoff

Total: **9 slides**, ~17 logical advances (Space presses).

Explicitly NOT in scope:

- Section A (Hook 1 — BCE Vol-1 Winner; material pending from BCE PIC; separate spec later)
- Sections B–H (handled in separate sub-specs: Opening, Foundation Core, Application)
- Title slide (in Opening sub-spec)
- Practice-lab curriculum (lab content / skills / prompts / dummy data — Adri prepares separately)
- Final copper hex ladder (settled at implementation per meta-spec §6.5)
- Projection-scale font calibration (refined at implementation per meta-spec §7.2)

## 1. Section structure (locked)

| # | Slide | Beat | Animation mode | Background tier |
|---|-------|------|----------------|-----------------|
| **I.1** | META + PROCESS | The deck reveals its own assembly | Step-reveal + ambient | Diagrammatic (plain dark + texture) |
| **I.2** | PROFILE + JOURNEY | Adri intro + 14-month timeline | Step-reveal + ambient | **Photographic** (night workspace) |
| **I.3** | PORTFOLIO | 12-item gallery with harness simulations | **Interactive** + step-reveal + ambient | Diagrammatic |
| **I.4** | KEY MESSAGE → BRIDGE | Foundation principle + rhetorical pivot | Step-reveal + ambient | **Photographic** (dusk horizon) |
| **J.1** | HUMILITY INTRO | "Still beginner. Earned lessons. Here's advice." | Step-reveal (no ambient) | **Photographic** (notebook study) |
| **J.2** | 5 MINDSET PRINCIPLES | Five-card constellation | Step-reveal (no ambient) + hover | Diagrammatic |
| **J.3** | RECIPE — building yourself up | 3-step vertical stack with arrows | Step-reveal (no ambient) + hover | Diagrammatic |
| **J.4** | RECIPE — building something that ships | 3-step horizontal flow with loop-back arrows | Step-reveal + **backward** ambient + hover | Diagrammatic |
| **K.1** | CHALLENGE HANDOFF | Theory ends; lab begins | Step-reveal + foreground tagline ambient | **Photographic** (morning workspace) |

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

Build these once; consume across slides:

| Primitive | Purpose | Used on |
|---|---|---|
| `<FigLabel section, num, label>` | Top-left small-caps editorial label | All 9 slides |
| `<KeywordHighlight>` | Copper-italic styling wrapper for emphasized words | All slides with body content |
| `<HeroPhoto src, vignetteSide>` | Full-bleed image + gradient vignette mask | I.2, I.4, J.1, K.1 |
| `<HoverReveal trigger, payload>` | Wraps element with hoverable detail layer | I.3, J.2, J.3, J.4 |
| `<PulseGlow target, period>` | Looping ambient copper-glow pulse on a target | I.1, I.2, I.3, I.4, J.4, K.1 |
| `<DisplayPhrase staggerType, words>` | Word-by-word or phrase-by-phrase reveal motion | I.4, J.1, K.1 |
| `<RecipeStepCard num, headline, subText, hoverExample>` | Reusable card for principles + recipe steps | J.2, J.3, J.4 |
| `<HorizontalFlow stages>` | Process diagram with stages + connectors | I.1 |
| `<Timeline anchors, segments>` | Horizontal timeline with anchor points + labeled segments | I.2 |
| `<CategoryList items, onSelect, selectedId>` | Categorized clickable list (left pane) | I.3 |
| `<HarnessCanvas selectedId, defaultState>` | Right pane with morphing simulations | I.3 |
| `<HarnessSimulation kind, config>` | Per-item animated simulation (5 variants) | I.3 |
| `<LightPanel content>` | Glyph-choreographed simple text panel | I.3 |
| `<StepConnector direction, label, ambient?>` | Animated arrow between cards (forward or loop-back) | J.3, J.4 |

All primitives are flat (0px corner radius), single-shadow recipe, copper-only color, free-stack-compatible.

## 4. Per-slide specs

### 4.1 — I.1 — META + PROCESS

**FIG label:** `— FIG. I.1 · THE PROCESS`

**Goal:** the deck reveals its own assembly. Frame the meta-reveal as evidence-of-method, not just claim of authorship.

**Background:** plain dark (copper-950) + 4–6% opacity dot grid texture.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | "What you've been watching for the last 〔90 minutes〕 — I built this. 〔Solo〕. With 〔AI〕." | Instrument Serif large, white + copper-italic on `90 minutes`, `Solo`, `AI` |
| Sub-line | "And here's the 〔process〕 that made it possible." | Source Serif 4, copper-300, with `process` highlighted |
| Process diagram | 6 horizontal stages with chevron connectors (see below) | — |
| Tagline (footer) | "Built with 〔harnesses〕 = 〔production-grade result〕." | Source Serif 4 italic, smaller, neutral-300 with copper-italic highlights |

**Stage tiles (6, left → right):**

| # | Label | Sub-text |
|---|---|---|
| 1 | Research | "14 〔parallel agents〕 → topic deep-dives" |
| 2 | Per-slide brainstorm | "Structure → 〔beats〕 → content" |
| 3 | Design system | "〔Typography · color · motion · components〕" |
| 4 | Plugins + Skills | "〔frontend-slides〕 · 〔brainstorming〕 · 〔writing-plans〕" |
| 5 | MCP | "〔NotebookLM〕 · 〔gemini-image-gen〕" |
| 6 | Deck generation | "Scripted · 〔reviewed〕 · iterated" |

**Components used:** `<FigLabel>`, `<KeywordHighlight>`, `<HorizontalFlow>` (stages + connectors), `<PulseGlow>` on connectors.

**Motion (3 logical advances):**

- Initial state: headline visible (keywords styled inline, not animated).
- Space 1: sub-line fades in (200ms) + thin copper rule below it draws via `pathLength` 0→1 (400ms).
- Space 2: 6 stage tiles stagger-fade-in from below (8px translate, 50ms stagger → ~600ms) + connector chevrons animate sequentially (`pathLength` 0→1, 500ms total).
- Space 3: footer tagline fades in (200ms).
- Steady-state ambient: subtle copper-glow pulse travels along connectors every 4–6s (looping ambient mode per meta-spec §5.3).

**Canonical pose:** post-Space 3, one connector mid-pulse. All content visible.

### 4.2 — I.2 — PROFILE + JOURNEY

**FIG label:** `— FIG. I.2 · THE JOURNEY`

**Goal:** human moment. Adri shows up and earns the journey arc.

**Background:** photographic (atmospheric night workspace, no person visible).

**Image-gen prompt (for `gemini-image-gen` MCP):**

> Editorial photograph, late evening, atmospheric warm-amber lighting from a single brass desk lamp. A walnut-wood desk with an open laptop showing soft-focus code, a leather-bound notebook with a fountain pen, a ceramic coffee cup with steam catching the lamplight. Deep shadows in the background recede into matte near-black. Copper-amber accent palette throughout. No people visible. Mood: quiet craftsmanship, dignified focus, late-night solo work. Suitable for slide background — subject offset to upper-right; bottom-left region intentionally dim for text overlay. 16:9 widescreen.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Name | `ADRIANTO TEDJOKUSUMO` | Instrument Serif ~72px projected, all caps, white |
| Role | `Head of TPM @ 〔Nanovest〕 · 〔AI Steering Committee Lead〕` | Instrument Serif ~44px, white + copper-italic highlights |
| Delivery line | `13 years tech delivery. 〔Zero formal AI training〕.` | Source Serif 4 ~40px, white + copper-italic on `Zero formal AI training` |
| Credentials line | `ITB Electrical Eng · Chosun M.S. 〔Computer Vision〕 · 8+ yrs PM (Toppan Ecquaria · Blibli)` | Source Serif 4 italic ~28px, neutral-300 + subtle copper-italic on `Computer Vision` |
| Timeline | 3 anchors + labeled 6mo segment | See below |

**Timeline structure:**

- Anchor 1: `Mar 2025` — `start`
- Segment Mar→Sep: labeled `6mo foundation + experiment` (visually substantial, not just a date-range note)
- Anchor 2: `Sep 2025` — `first deliverables`
- Anchor 3: `Today` — `〔still beginner〕`

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<HeroPhoto>`, `<Timeline>`, `<HoverReveal>` on anchors + `Computer Vision`, `<PulseGlow>` on timeline.

**Motion (4 logical advances):**

- Initial: photo + FIG label visible.
- Space 1: Name → Role → Delivery → Credentials lines stagger-fade-in (200ms each, 100ms stagger).
- Space 2: Timeline axis line draws (`pathLength` 0→1, 600ms) + Mar 2025 anchor reveals.
- Space 3: 6mo segment grows Mar→Sep + Sep 2025 anchor reveals.
- Space 4: Today anchor + `〔still beginner〕` caption fade in.
- Steady-state ambient: copper-glow pulse travels along timeline axis Mar → Today, every 5–7s.

**Hover interactions** (presenter-controlled):

| Element | Tooltip |
|---|---|
| `Mar 2025` anchor | "Started reading papers, daily Claude/ChatGPT use, no goals." |
| `Sep 2025` anchor | "First MCPs + plugins shipped to internal team." |
| `Today` anchor | "Active builds, still learning. This deck is one of them." |
| `Computer Vision` (credentials) | "Master's thesis: image segmentation. Pre-LLM era." |

**Canonical pose:** post-Space 4, timeline mid-pulse, all content visible.

### 4.3 — I.3 — PORTFOLIO

**FIG label:** `— FIG. I.3 · THE PORTFOLIO`

**Goal:** show the body of work — 12 portfolio items in a left-list + right-canvas split-screen with hover/click interactions and animated harness simulations.

**Background:** plain dark + dot grid texture.

**Layout pattern:** c4-tweaks-en split-screen (per `huashu-design-demos-ideation.md` Pattern 1).

**Headline:** `〔Built. Taught. In production.〕`

**Caption:** `〔Click any item to see how it works〕` (italic copper, bottom of slide).

**Left pane (30% width) — categorized list:**

```
HARNESSES
  ─ Workflows (n8n)
  • stocks intel
  • legal docs
  • exchange alerts
  ─ Plugins (Claude)
  • nanovest-product
  • NotebookLM

TOOLS
  • gemini-image-gen
  • Sonarqube
  • Bitbucket

WORKSHOPS facilitated
  • HR Group AI · Sinarmas Group
  • Townhall AISC · Nanovest
  • AI-SDLC · Nanovest
  • Pilot Workshop · Nanovest
```

**Right pane (70% width) — Harness Canvas:**

#### Default state (on slide entry, before any click)

A generic harness diagram showing the vocabulary the audience just absorbed:

```
         ┌─────────────────────┐
         │   MAIN AGENT        │
         │   (orchestrator)    │
         └──┬───────────┬──────┘
            │           │
       chains          tools
            ↓           ↓
       ┌─────┐ ┌─────┐ [tool] [tool]
       │ sub │ │ sub │
       │agent│ │agent│
       └─────┘ └─────┘
```

Caption: `〔The harness pattern〕 / 〔Five expressions follow〕`. Connector lines pulse with slow ambient (copper-700 base, copper-400 pulse, ~5s cycle).

#### Per-item canvas behavior

**HEAVY simulations** (5 items — animated, continuous loop, c3-motion-design parallel-orchestration timing):

| Item | Shape | Source research |
|---|---|---|
| `stocks intel` | **Linear funnel.** 11 AM clock pulse → 10 RSS feed nodes (Investing.com, CNBC, Seeking Alpha, Nasdaq, FT, Yahoo Finance, MarketWatch, AlphaStreet, The Economist, Forbes) fan in → Crawl4AI scrape → 4 Gemini agents chained (Filter Relevance · News Analyzer · Ticker Analyzer · Summarizer) → Top 10 ranking → outputs to Slack `#stocks-trending-n8n` AND Nanovest Apps "Hot Now" `(still manual currently)`. Daily-loop indicator pulses. | `workflow-stocks-hot-automation.md` |
| `legal docs` | **Branching with feedback loops.** Dual entry (Slack `/nanoearn` Admin Portal OR webhook) → cache → folder structure → doc gen → Slack interactive bubble → Finance approval gate → ON DECLINE: arrow loops up to AI Revision Agent (Gemini 2.5 Pro pulses) → back to Finance. ON APPROVE: Legal gate → similar revision loop on decline → Dropbox Sign → completion webhook. | `workflow-legal-nanoearn-docs-generation.md` |
| `exchange alerts` | **Efficiency funnel.** Hourly cron → 6 exchange feeds (Binance, OKX, Tokocrypto, BitMart, Indodax, Alpaca) fan in → 3-layer dedup ladder (hash → fuzzy → AI-semantic) → SINGLE Gemini batch call (one big inference visualized with all items inside) → 5 priority categories emerge → per-group routing to Opsgenie teams → rate-limited delivery. | `workflow-exchanger-news-alerting-system.md` |
| `nanovest-product` | **Orchestration tree.** User input → main orchestrator → brainstorm sub-agent → research-agent fires → plan-reviewer evaluates (loops or proceeds) → draft-agent → draft-reviewer → optional parallel branch (Figma sub-agent + screen-analyzer × N parallel + flowchart-generator firing Mermaid · Excalidraw · Draw.io in parallel) → enrich → validate-agent → publish (Confluence + Jira + GDrive). | `portfolio-nanovest-product-plugin.md` |
| `NotebookLM` | **Hub-and-spoke.** User intent → main NotebookLM agent at center → routes to 6 sub-agents (deep-researcher · cross-notebook-query · youtube-curator · drive-scout · url-crawler · brain-compiler) on the perimeter → each sub-agent fires its needed MCP tools (50+ pool) → outputs: notebook CRUD / RAG queries / studio artifacts (audio/video/reports/quizzes) / second-brain operations. | `portfolio-notebooklm-plugin.md` |

**Each heavy simulation has a "see it real" speaker-toggle** at canvas top-right (small copper outline-button labeled `〔see it real〕`). Click → cross-fades simulation to a 3-up screenshot grid. Click again → back to simulation.

Screenshot grid sources:

| Item | Screenshots from `assets/n8n-workflows/` |
|---|---|
| `stocks intel` | `n8n-stocks-news-sentiment.png` + `slack-stocks-news-sentiment.png` + `apps-stocks-news-sentiment.jpg` |
| `legal docs` | `n8n-legal-docs-generation.png` + `slack-legal-docs-generation.png` + `gdocs-legal-docs-generation.png` |
| `exchange alerts` | `n8n-3rdparties-announcement-alert-system.png` + `slack-3rdparties-announcement-alert-system.png` + `opsgenie-3rdparties-announcement-alert-system.png` |
| `nanovest-product` | TBD — Adri to provide screenshots if desired (CLI output, generated PRD, Confluence page) |
| `NotebookLM` | TBD — Adri to provide screenshots if desired (CLI output, generated podcast/report, second-brain wiki) |

**LIGHT panels** (7 items — hero-animation-v10 glyph choreography on entry, then static):

| Item | Right-canvas content |
|---|---|
| `gemini-image-gen MCP` | "Visual generation in any agent. Main: 〔nano banana pro〕. Imagen 4 + Veo 3.1 supported." + 3 sample image thumbnails (one of which is from the deck's own hero imagery — meta-callback to I.1 stage 5) |
| `Sonarqube MCP` | "Code-quality APIs surfaced as MCP tools. Used in dev review flow." |
| `Bitbucket MCP` | "Repo-ops APIs surfaced as MCP tools. Daily team use." |
| `HR Group AI Workshop` | "〔Sinarmas Group cross-org〕 · agentic organization · selected for it." |
| `Townhall AISC` | "Nanovest internal · AI Steering Committee briefing." |
| `AI-SDLC` | "Nanovest internal · AI in software development lifecycle." |
| `Pilot Workshop` | "Nanovest internal · AI pilot kickoff." |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<CategoryList>`, `<HarnessCanvas>`, `<HarnessSimulation>` × 5, `<LightPanel>` × 7, `<HoverReveal>` on list items.

**Motion (4 logical advances + ambient + click-driven + hover):**

- Initial: FIG label + headline + caption + LEFT category headers visible. Right canvas hidden.
- Space 1: `HARNESSES` section items fade in (Workflows + Plugins, stagger 50ms each).
- Space 2: `TOOLS` + `WORKSHOPS` sections fade in.
- Space 3: Right canvas appears — default harness diagram nodes fade in, connectors animate via `pathLength` 0→1.
- Space 4: Default canvas connectors begin slow looping ambient pulse.
- Steady-state ambient: ambient pulse on default canvas. Awaits click.
- Click any list item → canvas morphs (c4-tweaks pattern, ~500ms transition) to that item's simulation. Heavy → continuous loop. Light → glyph-choreographed entry then static.
- Click `see it real` toggle (heavy items only) → cross-fades to screenshot grid; click again returns to simulation.
- Hover any list item → border glow + 1-line preview tooltip.

**Canonical pose:** post-Space 4. Default harness diagram visible, full categorized list on left, one connector mid-pulse. Static export captures the harness vocabulary (not item-specific simulations).

### 4.4 — I.4 — KEY MESSAGE → BRIDGE

**FIG label:** `— FIG. I.4 · THE BRIDGE`

**Goal:** name the principle (`Foundation before velocity`) + pivot the principle at the audience via parallel-cadence question.

**Background:** photographic (dusk horizon, minimal, copper-amber atmosphere — different photo subject from I.2).

**Image-gen prompt:**

> Editorial photograph at dusk or first dawn. Long quiet road or open horizon receding into distance, fading into copper-amber atmospheric haze. Deep shadows in foreground; misty depth in middle; warm horizon light at the vanishing point. Minimal subject — no people, no vehicles, no specific architecture. Mood: continuation, possibility, dignified onward motion. Copper-amber accent palette. 16:9 widescreen. Suitable for slide background — bottom region intentionally darker for text overlay.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| First beat | `〔Foundation〕 before 〔velocity〕.` | Instrument Serif ~120px projected, white + copper-italic on `Foundation` and `velocity` |
| Copper rule | thin 1px copper-700, ~30% slide width, centered | — |
| Second beat | `In a year, a 〔Project Manager〕 built this.` `— In a year, what could 〔you〕 build?` | Source Serif 4 italic ~56px, white + copper-italic on `Project Manager` and `you` |

**Components:** `<HeroPhoto>`, `<FigLabel>`, `<DisplayPhrase>`, `<KeywordHighlight>`, `<PulseGlow>` on `you`.

**Motion (3 logical advances):**

- Initial: photo + FIG label visible. Both phrases hidden.
- Space 1: First beat stagger-fade-in word-by-word (`Foundation` 250ms → pause → `before` 200ms → `velocity` 250ms → period). Brief pause (~300ms). Thin copper rule draws beneath via `pathLength` 0→1 (400ms).
- Space 2: `In a year, a Project Manager built this.` stagger-fade-in (~500ms total).
- Space 3: `— In a year, what could you build?` stagger-fade-in (~500ms total).
- Steady-state ambient: copper-glow pulse on `you`, opacity 60% → 100% → 60% over 4–5s cycle.

**Canonical pose:** post-Space 3, `you` at mid-glow peak. Both phrases visible, copper rule between them.

### 4.5 — J.1 — HUMILITY INTRO

**FIG label:** `— FIG. J.1 · THE RECIPE`

**Goal:** open Section J with humility-with-confidence frame. Admission → earned experience → offer.

**Background:** photographic (notebook study atmosphere — different register from I.2 night-workspace and I.4 dusk-horizon).

**Image-gen prompt:**

> Editorial photograph, dim warm interior lighting. An open leather-bound notebook with handwritten notes in dark fountain-pen ink, slightly out of focus on the upper portion of the page. A pen rests across the spine. Atmospheric copper-amber accent from an unseen warm light source (lamp out of frame). Deep shadows surround; background fades into matte near-black. Mood: study, learning, deliberate craft, quiet humility. No people. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Line 1 (admission) | `〔Still a beginner〕. A lot left to learn.` | Instrument Serif ~64px projected, white + copper-italic on `Still a beginner` |
| Line 2 (earned experience) | `But I've earned a few lessons — through 〔experiments〕, through 〔failures〕.` | Instrument Serif ~64px, white + copper-italic on `experiments` and `failures` |
| Line 3 (offer) | `Here's some advice. So you don't 〔repeat my mistakes〕.` | Source Serif 4 italic ~44px, white + copper-italic on `repeat my mistakes` |

**Components:** `<HeroPhoto>`, `<FigLabel>`, `<DisplayPhrase>`, `<KeywordHighlight>`.

**Motion (3 logical advances, NO ambient):**

- Initial: photo + FIG label visible.
- Space 1: Line 1 stagger-fade-in word-by-word (~400ms total).
- Space 2: Line 2 stagger-fade-in (~500ms).
- Space 3: Line 3 fade-in as a single phrase (~600ms ease-out).
- Steady-state: **no ambient.** Slide goes still after Space 3. Stillness IS the design.

**Canonical pose:** post-Space 3, all three lines visible, no motion.

### 4.6 — J.2 — 5 MINDSET PRINCIPLES

**FIG label:** `— FIG. J.2 · FIVE PRINCIPLES`

**Goal:** five-card constellation laying out the mindset before tooling.

**Background:** plain dark + dot grid texture.

**Headline above cards:** `〔Mindset before tools〕.`

**Caption below cards:** `〔Hover any card for an example〕`.

**Card structure (per card):**

| Element | Style |
|---|---|
| Number badge (top-left) | Inter mono, copper-400, ~24px |
| Principle headline | Instrument Serif ~36px, white + `〔keyword〕` highlights per card |
| Thin copper rule | 1px copper-700, ~70% card width |
| Sub-text (operationalization) | Source Serif 4 italic ~22px, neutral-300 |

**Per-card content:**

| # | Headline | Sub-text | Hover example |
|---|---|---|---|
| 01 | `〔Foundation〕 precedes velocity` | understand before you output | "Read the concept. Feel if it's relevant. Then experiment. Skip foundation — and you're just 〔vibe-coding〕." |
| 02 | `〔Reps〕 before sophistication` | daily use beats clever prompts | "Used Claude daily for months before trying to build anything." `[Adri to confirm or replace]` |
| 03 | `〔Stay〕 current, don't chase` | filter: *does this serve my work?* | "New AI features ship constantly. My filter: 〔does this serve my work?〕 Most don't." |
| 04 | Build the `〔smallest thing〕` that matters | a prompt template, a Skill, a snippet | "First build was a prompt template. Took 30 minutes." `[Adri to confirm or replace]` |
| 05 | `〔Failure is the next iteration's blueprint〕` | improve before you ship | "Most first builds didn't work. Each one rebuilt the next." `[Adri to confirm or replace]` |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<RecipeStepCard>` × 5, `<HoverReveal>` per card.

**Motion (1 logical advance + hover):**

- Initial: FIG label + headline + caption visible. Cards hidden.
- Space 1: All 5 cards stagger-fade-in left-to-right (250ms each, 100ms stagger between cards → ~750ms total). Each card slides up 8px as it fades in.
- Steady-state: **no ambient.** Speaker dwells and walks through principles at conversational pace.
- Hover: card lifts ~6px translate-up, border copper-700 → copper-400, hover example fades in below sub-text. Other cards in row tween-shift slightly.

**Canonical pose:** post-Space 1, all 5 cards in baseline state.

### 4.7 — J.3 — RECIPE: BUILDING YOURSELF UP

**FIG label:** `— FIG. J.3 · BUILDING YOURSELF UP`

**Goal:** 3-step vertical stack — read · use · focus. The personal-buildup half of the recipe.

**Background:** plain dark + dot grid texture.

**Headline above stack:** `〔Habits before output〕. Steps 1–3 of the recipe.`

**Caption below stack:** `〔Hover any step for an example〕`.

**Per-card content:**

| # | Headline | Sub-text | Hover example |
|---|---|---|---|
| 01 | Read `〔1 thing a week〕` about how AI works | paper · post · well-written thread — anything conceptual | "What I read mattered less than building the habit. The first months are about absorbing concepts." `[Adri to confirm or replace]` |
| 02 | Use AI `〔daily〕` for anything | drafting · summarizing · brainstorming · deciding — any task, any role | "Months of daily use before I tried to build anything. Reps make later sophistication land." `[Adri to confirm or replace]` |
| 03 | Pick `〔ONE tool〕`, go deep before adding others | skip the toolchain race — mastery beats sampling | "Went deep on Claude. Skipped the LLM-of-the-week parade." `[Adri to confirm or replace]` |

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<RecipeStepCard>` × 3, `<StepConnector direction="down">` × 2, `<HoverReveal>` per card.

**Motion (3 logical advances + hover):**

- Initial: FIG label + headline + caption visible. Cards + arrows hidden.
- Space 1: Card 01 reveals — fade-in + 8px translate-down.
- Space 2: Downward arrow between 01 and 02 draws (`pathLength` 0→1, 300ms) → Card 02 reveals.
- Space 3: Downward arrow between 02 and 03 draws → Card 03 reveals.
- Steady-state: **no ambient.** Stack settles after Space 3.
- Hover: card lift + border brighten + example reveal.

**Canonical pose:** post-Space 3, all 3 cards visible, both arrows drawn.

### 4.8 — J.4 — RECIPE: BUILDING SOMETHING THAT SHIPS

**FIG label:** `— FIG. J.4 · BUILDING SOMETHING THAT SHIPS`

**Goal:** 3-step horizontal flow + 2 loop-back arrows beneath. Build → evaluate → share, with iteration loops.

**Background:** plain dark + dot grid texture.

**Headline:** `〔Artifacts that travel〕. Steps 4–6 of the recipe.`

**Caption:** `〔Hover any step for an example〕`.

**Per-card content:**

| # | Headline | Sub-text | Hover example |
|---|---|---|---|
| 04 | Find one `〔recurring annoyance〕` — AI-assist it `〔20% better〕` | your first build · prompt · skill · workflow snippet | "First build was a prompt template for status updates. 30 min. Used it daily after." `[Adri to confirm or replace]` |
| 05 | `〔Evaluate ruthlessly〕` | what's better? what still breaks? embrace failure — iterate | "First MCP didn't work for two weeks of evenings. Each broken version informed the next." `[Adri to confirm or replace]` |
| 06 | Once solid, share with `〔many〕` who have the same pain | their feedback is what makes it reusable for anyone | "Shared `nanovest-product` plugin with PMs at Nanovest. Their feedback turned it into a reusable system." `[Adri to confirm or replace]` |

**Loop-back arrow labels:**

- 05 → 04: `〔refine, iterate〕`
- 06 → 04: `〔feedback from many〕`

**Components:** `<FigLabel>`, `<KeywordHighlight>`, `<RecipeStepCard>` × 3 (horizontal orientation), `<StepConnector direction="forward">` × 2, `<StepConnector direction="loopBack" ambient="backward">` × 2, `<HoverReveal>` per card.

**Motion (3 logical advances + signature backward ambient + hover):**

- Initial: FIG label + headline + caption visible. Cards + arrows hidden.
- Space 1: Card 04 reveals.
- Space 2: Forward chevron 04→05 draws → Card 05 reveals → first loop-back arrow draws beneath (05→04).
- Space 3: Forward chevron 05→06 draws → Card 06 reveals → second loop-back arrow draws (06→04).
- Steady-state ambient (UNIQUE to this slide): subtle copper-glow pulses travel **backward** along the two loop-back arrows. Pulse 1 (05→04) every ~4s. Pulse 2 (06→04) every ~6s. Slightly out of phase — slide always has *some* backward motion.
- Hover: card lift + border brighten + example reveal.

**Canonical pose:** post-Space 3, all cards + 2 forward arrows + 2 loop-back arrows visible, one loop-back caught mid-backward-pulse.

### 4.9 — K.1 — CHALLENGE HANDOFF

**FIG label:** `— FIG. K.1 · NOW FEEL IT`

**Goal:** the deck's last slide. Hand off from theory to felt experience. Set realistic expectations: materials are prepared; attendees run them on their laptops.

**Background:** photographic (industrial workspace at first light — the room is set up for someone to arrive).

**Image-gen prompt:**

> Editorial photograph at first light / dawn. Industrial-craft style workspace in a high-ceilinged room with tall windows. Warm copper-amber morning light streaming through windows, casting deep shadows. A pulled-out wooden chair beside a walnut desk. On the desk: a closed laptop, an open leather notebook with a clean page, a pen resting across the page. The room feels READY but EMPTY — set up for someone to arrive and begin work. No people visible. Mood: invitation, readiness, the threshold of a new task. Copper-amber accent palette. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

**Content slot table:**

| Slot | Content | Style |
|---|---|---|
| Headline | `〔Theory ends. Hands begin〕.` | Instrument Serif ~88px projected, white + copper-italic on the whole phrase |
| Body 1 (preparation inventory) | `Tools loaded. Skills ready. Dummy data set.` | Source Serif 4 ~44px, neutral white |
| Body 2 (action) | `Open your 〔laptop〕. Run the harnesses.` | Source Serif 4 ~44px, white + copper-italic on `laptop` |
| Body 3 (presence) | `I'll be here.` | Source Serif 4 italic ~36px, neutral white |
| Copper rule | thin 1px copper-700, ~30% slide width | — |
| Tagline | `〔After this, the recipe is no longer theory〕.` | Source Serif 4 italic ~40px, white + copper-italic on the whole phrase |

**Components:** `<HeroPhoto>`, `<FigLabel>`, `<DisplayPhrase>`, `<KeywordHighlight>`, `<PulseGlow>` on tagline.

**Motion (3 logical advances + foreground ambient on tagline):**

- Initial: photo + FIG label visible.
- Space 1: Headline `Theory ends. Hands begin.` stagger-fade-in word-by-word, with brief pause between the two beats (`Theory ends.` ~250ms → pause → `Hands begin.` ~250ms → period).
- Space 2: Three body lines stagger-fade-in in order (200ms each, 100ms stagger → ~700ms total).
- Space 3: Thin copper rule draws (`pathLength` 0→1, 400ms) + tagline `After this, the recipe is no longer theory.` fades in (~400ms).
- Steady-state ambient: **foreground-only ambient** — copper-glow pulse on the tagline `〔After this, the recipe is no longer theory〕`, opacity 60% → 100% → 60% over 4–5s cycle. Photo background stays static (per saved memory rule). The pulse gives the closer a quiet heartbeat without violating background-static rule.

**Canonical pose:** post-Space 3. All content visible, photo in background, tagline mid-pulse.

## 5. Cross-section narrative flow

| Transition | How it reads |
|---|---|
| (Section H closes) → I.1 | The deck's quality has been the implicit credibility for ~95 minutes. I.1 makes the implicit explicit: "I built this." |
| I.1 → I.2 | "I built this" → "Here's who I am." Process + person. |
| I.2 → I.3 | "Here's who I am" → "Here's what I've built." Person + portfolio. |
| I.3 → I.4 | "Here's what I've built" → "Here's the principle behind it." Portfolio + principle. |
| I.4 → J.1 | I.4's rhetorical question (`what could you build?`) is answered by J.1's humility frame (`Here's some advice...`). |
| J.1 → J.2 | Humility + earned offer → 5 mindset principles (the WHY). |
| J.2 → J.3 → J.4 | Mindset → personal habits (read · use · focus) → artifact lifecycle (build · evaluate · share). |
| J.4 → K.1 | Recipe ends → "Theory ends. Hands begin." — modality switch from listening to doing. |

**Meta-callbacks (cross-slide structural payoffs):**

- **I.1 ↔ I.3:** I.1 stage 5 names `gemini-image-gen` MCP. I.3's light panel for that MCP shows imagery from THE DECK ITSELF. Two-slide payoff: the imagery the audience has been looking at is from the MCP Adri built.
- **I.4 ↔ J.1:** I.4's rhetorical question ("what could you build?") is answered by J.1's humility intro ("here's some advice"). Question and answer span the I → J border.
- **I.3 ↔ J.4:** I.3's portfolio shows `nanovest-product` as one of the artifacts. J.4 step 6's hover example references that same artifact ("Shared `nanovest-product` with PMs..."). The recipe in action.
- **J.1 ↔ K.1:** Both hero photographic slides without ambient motion. They bookend Section J — quiet open, quiet close.

## 6. Animation budget

Total logical advances across the 9 slides: **27**.

| Slide | Advances |
|---|---|
| I.1 | 3 |
| I.2 | 4 |
| I.3 | 4 |
| I.4 | 3 |
| J.1 | 3 |
| J.2 | 1 |
| J.3 | 3 |
| J.4 | 3 |
| K.1 | 3 |
| **Total** | **27** (excluding click-driven canvas changes on I.3, which add 12+ optional state changes) |

At ~30s per advance baseline (per meta-spec §5.4), this arc occupies ~13.5 minutes of pure advance-delivery time. Plus dwell time on hero slides + I.3 click exploration: realistic budget **~15–20 minutes total** for Reveal + Closing.

In context of the meta-spec's overall budget (~170–200 advances for 90–100 minutes of pure delivery), this arc consumes ~14% of the advance budget — appropriate for the deck's climactic closing section.

## 7. Content references

For implementation, pull canonical content from:

| Source | What's there |
|---|---|
| `docs/researches/portfolio-nanovest-product-plugin.md` | nanovest-product plugin: 8-phase pipeline, 6 sub-agents, 12 skills, all tools (Confluence/Jira/Figma/Excalidraw/Draw.io/Mermaid/GDrive/Playwright), flowchart capability. Used for I.3 nanovest-product simulation. |
| `docs/researches/portfolio-notebooklm-plugin.md` | NotebookLM plugin: CLI + MCP server (50+ tools), 6 sub-agents, second-brain workflows. Used for I.3 NotebookLM simulation. |
| `docs/researches/portfolio-gemini-image-gen-mcp.md` | gemini-image-gen MCP: nano banana pro main, Imagen 4 + Veo 3.1 supported. Used for I.3 gemini-image-gen light panel + deck-wide image generation. |
| `docs/researches/workflow-stocks-hot-automation.md` | stocks-intel n8n workflow. Used for I.3 stocks-intel simulation. |
| `docs/researches/workflow-legal-nanoearn-docs-generation.md` | legal-nanoearn n8n workflow. Used for I.3 legal docs simulation. |
| `docs/researches/workflow-exchanger-news-alerting-system.md` | exchanger-news n8n workflow. Used for I.3 exchange alerts simulation. |
| `docs/researches/huashu-design-demos-ideation.md` | Design pattern references: c4-tweaks (split-screen state mutation), c3-motion-design (parallel orchestration timing), hero-animation-v10 (glyph choreography). |
| `docs/researches/toppan-presentation-profile-and-portfolio.md` | Adri's profile + portfolio inventory + corrections (workshops are "facilitated", nano banana pro main, etc). |
| `assets/n8n-workflows/*.png|.jpg` | 9 screenshots for I.3 "see it real" toggle (n8n graphs + Slack outputs + Opsgenie alerts + Google Docs + Stocks app UI). |

## 8. Implementation notes

**File structure suggestion:**

```
src/slides/reveal-and-closing/
  i1-meta-process.tsx
  i2-profile-journey.tsx
  i3-portfolio.tsx
  i4-key-message-bridge.tsx
  j1-humility-intro.tsx
  j2-five-principles.tsx
  j3-recipe-buildup.tsx
  j4-recipe-ship.tsx
  k1-challenge-handoff.tsx
  components/
    HarnessCanvas.tsx
    HarnessSimulation.tsx
    LightPanel.tsx
    CategoryList.tsx
    Timeline.tsx
    HorizontalFlow.tsx
    StepConnector.tsx
    DisplayPhrase.tsx
    HeroPhoto.tsx
    FigLabel.tsx
    KeywordHighlight.tsx
    HoverReveal.tsx
    PulseGlow.tsx
    RecipeStepCard.tsx
  simulations/
    stocks-intel.tsx
    legal-nanoearn.tsx
    exchanger-news.tsx
    nanovest-product.tsx
    notebooklm.tsx
```

**Substrate dependencies:**

- shadcn UI (Card, Button, etc — adapted to 0px radius and single-shadow recipe)
- Tailwind CSS (design tokens)
- Framer Motion (all motion)
- No paid components / fonts / libraries (per memory rule)

**Build order recommendation (lowest-risk first):**

1. Cross-cutting primitives (`<FigLabel>`, `<KeywordHighlight>`, `<HeroPhoto>`, `<HoverReveal>`, `<PulseGlow>`)
2. Card-family primitives (`<RecipeStepCard>`, `<StepConnector>`)
3. Static content slides (J.1, K.1) — no complex motion, validate primitives
4. Card-grid slides (J.2, J.3, J.4) — exercise step-reveals + hover
5. Diagrammatic slides (I.1, I.2, I.4) — exercise timelines + display phrases
6. **Last:** I.3 — most complex; depends on all primitives + 5 simulation components

## 9. Open items (TBD at implementation)

| Item | Owner | Why open |
|---|---|---|
| Hover example anecdotes on J.2, J.3, J.4 cards | Adri | Drafted but personal — Adri to confirm or replace with own anecdotes |
| Screenshots for I.3 nanovest-product + NotebookLM "see it real" | Adri | If desired; n8n workflows have screenshots already in `assets/n8n-workflows/` |
| Final image-gen prompts for I.2, I.4, J.1, K.1 hero photos | Implementation | Drafted prompts; will refine via gemini-image-gen iterations |
| Final copper hex ladder | Implementation | Settled at projection-test time per meta-spec §6.5 |
| Final projection-scale font sizes (px) | Implementation | Calibrated during projection testing per meta-spec §7.2 |
| Cross-section advance pacing | Implementation | ~30s/advance baseline; speaker rehearsal will tune |
| Canonical-pose freeze frames | Implementation | Defined per slide above; capture during PDF/PPTX export pipeline (per meta-spec §4.1) |

## 10. Acceptance criteria

A given slide is "done" when:

- All content slot-table values are present in the slide
- All keyword highlights appear in copper-italic per memory rule
- FIG label appears top-left with correct section.num and label
- All declared logical advances trigger correctly via Space
- Hover interactions (where applicable) reveal the specified payload
- Looping ambient (where applicable) runs at the specified period
- Canonical pose can be captured cleanly for PDF/PPTX export
- No paid dependencies introduced
- Visual matches the spec at projection scale (validated via real-slide projection test per meta-spec §6.5)

The arc as a whole is "done" when:

- All 9 slides individually pass acceptance
- Inter-slide narrative flow holds (per §5)
- Meta-callbacks (I.1↔I.3, I.4↔J.1, I.3↔J.4, J.1↔K.1) are visible/audible
- Total logical advances match §6 budget (±2)
- Implementation plan (next step) has been validated against this spec

## 11. Next step

Invoke `superpowers:writing-plans` skill (per parent meta-spec §13) to produce the implementation plan for this sub-spec. The plan will sequence component primitives → static slides → card-grid slides → diagrammatic slides → I.3, with review checkpoints between each phase.
