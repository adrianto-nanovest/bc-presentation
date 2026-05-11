# Slides — Opening Arc (Title + A + B + C + C→D Bridge) Spec

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Draft 2026-05-11
**Spec consumes:** `docs/specs/2026-05-06-process-and-design-meta.md` (process & design meta), `docs/specs/2026-05-08-slides-foundation-core.md` (Section D), `docs/specs/2026-05-08-slides-foundation-core-section-e.md` (Section E), `docs/specs/2026-05-11-slides-foundation-techniques-section-f.md` (Section F)
**Research inputs:** `docs/researches/topic-ai-evolution.md`, `docs/researches/section-a-vol1-winner-analysis.md`, `docs/researches/internal-hr-group.md`, `docs/researches/2026-05-11-ai-evolution-stages-refresh.md`, `docs/researches/2026-05-11-foundation-model-landscape.md`, `docs/references/nanovest-pilot-workshop.pdf` (slides 3-7), `docs/references/ai-catalyst-berau-vol1-winner-project-material.pdf`

## 0. Scope

This spec covers the opening arc of the workshop deck: **13 slides** spanning Title, Section A (Hook 1), Section B (AI evolution + landscape), Section C (Mindset, the heart of the deck), and the dedicated C→D bridge slide.

In scope:
- Narrative architecture across the four blocks (Title + A + B + C + Bridge)
- Per-slide specs (FIG label, goal, background, layout, content slots, components, motion, hover, canonical pose, implementation notes)
- Cross-section visual rhymes and motion vocabulary
- Audience-respect rules specific to the opener
- Hook 2 (Section I.4) seed mechanics planted in Section C

Explicitly NOT in scope:
- Sections D-K (covered by their own specs)
- Practice-lab curriculum
- Implementation plan (separate spec downstream via `writing-plans` skill)
- Final hex ladder for copper accents (refined at implementation via projection testing)

## 1. Narrative architecture

The opening arc executes a deliberate emotional arc across 13 slides:

```
Title           →  open quietly; set editorial register
A.1             →  acknowledge Session 1 winners' work as capability classes; pose 4 open questions
B.1–B.5         →  expand the audience's world (history → vocabulary → mechanics → tiers → landscape)
C.1–C.5         →  contract back to the audience's interior; reframe mindset; seed Hook 2
Bridge          →  pause; honor; hand off cleanly to D.1's diagnostic open
```

The arc rhythm is **quiet → curious → broad → narrow → reflective**. Title is the slowest start; B's evolution and landscape slides build energy; C's mindset slides do the heaviest emotional work; the bridge slide is the deepest breath in the deck before D.1's "73% fail" diagnostic punch.

### 1.1 Three load-bearing decisions

1. **Section A is a single slide.** The Vol-1 winners present their own work in Session 1 immediately before Adri's Session 2 — so Section A does not redescribe individual winners' projects. Instead, A.1 acknowledges the *capability classes* the winners broadly used (AI chatbot, summarization, document analysis, prompt engineering, geospatial AI) and poses 4 open questions that the rest of the deck answers. A.1 functions as Hook 1 *and* a curiosity-driven table-of-contents.

2. **Section C is the heart of the deck.** Five mindset slides plus the bridge. Without proper mindset shift, no AI adoption can occur. The five reframes are:
   - C.1 Tool → Bridge (central metaphor; the throughline)
   - C.2 Replacement → Multiplier (fear-flip; psychological safety)
   - C.3 Executor → Orchestrator (new self-image)
   - C.4 V-Bounce Workflow (what the new self does — Specify/Generate/Verify)
   - C.5 Role → Trajectory (portability; Hook 2 seed)

3. **Only one dedicated bridge slide in the opener (C→D).** Other transitions handled by content-driven handoffs. The C→D bridge carries the Kofi Annan epigraph + a small handoff line, with photographic hero treatment.

### 1.2 Hook 2 (Section I.4) seeding mechanics

Section I.4 is the late-deck reveal: *"I'm a TPM, not an engineer. No formal AI training. 1 year, autodidact. Here's what I built."* For this reveal to land emotionally rather than intellectually, the audience must have already absorbed three things in Section C:

- **(a) AI is a bridge, not a tool** (C.1) — anyone crossing it can become more
- **(b) Fear of replacement is misplaced; AI is a multiplier** (C.2) — the new role is open
- **(c) Trajectory > role; AI fluency is portable** (C.5, closing line: *"wherever you need to be"*) — the deck literally tells you you can go where you want

The closing copper underline pulse on `wherever you need to be` in C.5 is the planted memory cue. When I.4 fires 90 minutes later, audiences who registered that pulse experience recognition; audiences who didn't experience surprise. Either way, the reveal lands.

## 2. Section structure summary (13 slides)

| # | Slide | Section | Mode | Slides |
|---|---|---|---|---|
| 1 | Title — *From AI Curiosity to AI Capability* | Title | Static + load animation | 1 |
| 2 | A.1 — *What you've already seen* | A (Hook 1) | Step-reveal (4 steps) | 1 |
| 3 | B.1 — *The AI Evolution Journey* | B | Step-reveal (6 steps) + ambient pulse | 1 |
| 4 | B.2 — *AI Fields & Terminology* | B | Step-reveal (5 steps) + ambient glow | 1 |
| 5 | B.3 — *Model Mechanics & Landscape Map* | B | Step-reveal (5 steps) + interactive hover | 1 |
| 6 | B.4 — *Tiers & Deployment* | B | Step-reveal (5 steps) | 1 |
| 7 | B.5 — *Today's Landscape + Inverse Hook* | B | Step-reveal (6 steps) + counter-up | 1 |
| 8 | C.1 — *Tool → Bridge* | C | Step-reveal (5 steps) + strikethrough + pulse | 1 |
| 9 | C.2 — *Replacement → Multiplier* | C | Step-reveal (5 steps) + strikethrough | 1 |
| 10 | C.3 — *Executor → Orchestrator* | C | Step-reveal (5 steps) + layout morph | 1 |
| 11 | C.4 — *V-Bounce Workflow* | C | Step-reveal (6 steps) + bar growth | 1 |
| 12 | C.5 — *Role → Trajectory* | C | Step-reveal (5 steps) + strikethrough + Hook 2 pulse | 1 |
| 13 | Bridge — *From mindset to mechanics* | C→D Bridge | Step-reveal (2 steps); reverent | 1 |

**Total: 13 slides · ~38-44 logical advances · ~22-25 minutes of presenter time** at conversational pace (30-35s per advance per meta-spec §5.4).

## 3. Per-section design rationale

### 3.1 Title

A *quiet* opener. Photographic hero treatment per meta-spec §6.3. The headline functions as a 1-sentence summary of the entire deck: *"From AI Curiosity to AI Capability."* "Curiosity" welcomes everyone (no prerequisite); "Capability" feels practically achievable (not "Mastery," which carries competitive connotation).

The workshop name (`BCE AI Catalyst · Vol 2, Session 2`) is demoted to subtitle. Attribution chip (`Adri · Nanovest`) sits in bottom-right corner per meta-spec §9. **No date line** — the deck runs across 18-21 May, 26 May, 2-5 June, and one more JKT day; a single dateless asset deploys to every session.

The background is **futuristic-modern**, not the bridge image (the bridge metaphor is reserved for Section C). This frees Title to feel forward-energy without telegraphing the throughline.

### 3.2 Section A — Hook 1

**Single slide, by design.** The Vol-1 winners present their own work in Session 1 the same day. Section A does NOT redescribe individual projects (Rayhan / Sutami / Jimmi). Instead, it acknowledges the *capability classes* the winners broadly used (AI chatbot, summarization, document analysis, prompt engineering, geospatial AI) — capability classes the rest of the deck builds on.

The slide then pivots to **4 open questions** in italic Source Serif 4 with copper-italic keywords. Each question points implicitly to a later section:

- Q1 → Section F (techniques): "What if these tools could *talk to each other*?"
- Q2 → Section E (engineering fundamentals): "What if context wasn't a one-shot prompt but a *standing memory*?"
- Q3 → Section D (process improvement): "What if the *upstream process* was audited before automation?"
- Q4 → Section F+H (techniques, best practices): "What if every solution became a *skill others could fork*?"

This question-list functions as a curiosity-driven table of contents. Each later section answers a planted question.

**Critical audience-respect rule:** The questions are *invitations*, not *gaps* or *corrections*. The verbs are "what if" (open), not "they failed to" (closed). Capability chips name *categories*, never individuals. This protects the winners (who are present in the room or represented by colleagues) from feeling diagnosed.

### 3.3 Section B — Evolution + Landscape

**5 slides forming a primer staircase: history → vocabulary → mechanics → tiers → state.** B is the *outside world*: what's true *out there* about AI. C will be the *inside world*: what's true *in here* about the audience's mindset.

**B.1** (Evolution Journey) compresses 75 years of AI history into a single motion-vignette — six anchor nodes on a horizontal timeline. The taxonomy is refreshed from the pilot deck's 7-stage version (which had Context Awareness mislabeled and Reasoning Machines mis-defined) to a May-2026-accurate 6-stage version:

1. Rule-Based (1970s–80s)
2. Statistical Learning (1990s–2010s)
3. Deep Learning & Perception (2012–2022)
4. Large Language Models (2022–2024)
5. **Agentic Reasoning (2024–2026) ← WE ARE HERE**
6. AGI (2026–27+, emerging — explicitly NOT YET achieved; Anthropic forecasts late 2026 / early 2027)

The honest framing of AGI ("not yet, but coming") is load-bearing for credibility. Over-claiming destroys trust for the rest of the deck.

**B.2** (Fields & Terminology) uses nested rectangles (0px corners) for the taxonomic nest: AI ⊃ ML ⊃ Deep Learning ⊃ GenAI ⊃ LLMs. **Geometry distinction:** rectangles here, NOT circles — circles are reserved for E.1's Russian-doll Prompt/Context/Harness metaphor. Different concept, different shape, preserves visual vocabulary discipline across the deck.

**B.3** (Mechanics & Landscape Map) is the only vertical-split slide in the opener. Left half: 3 model dials (Temperature = creativity, Context Window = working memory, System Prompt = standing rules). Right half: 5-axis task map (Write/Think · Draw · Video · Voice · Automate) with current May-2026 frontier models per axis. This is the densest slide in the opener; hover provides depth on demand.

**B.4** (Tiers & Deployment) carries three layered concepts: cost-vs-capability tier ladder (Haiku → Sonnet → Opus), competitors beside the three giants (Qwen 3.6 — Bahasa fluent · DeepSeek V4 · Kimi K2.6 · SEA-LION), and the cloud-vs-local fine-tuned insight (*"a smaller fine-tuned model can outperform frontier on **your** specific work"*).

**B.5** (Today's Landscape + Inverse Hook) echoes D.1's grammar — opens enormous with the Indonesia 92% adoption stat (counter-up animation), pivots through *"And yet..."* to the Gartner inverse hook (79% adopted / 11% in production / 40% cancelled by 2027). Ends with the cliffhanger question that hands off to C: *"What makes the difference?"*

### 3.4 Section C — Mindset, the heart of the deck

**5 mindset slides** doing the emotional arc:

1. **C.1 (Tool → Bridge):** The central metaphor lands. Strikethrough on `tool` is the visual hinge. Photographic hero — first photo moment of C.
2. **C.2 (Replacement → Multiplier):** Defuses fear of replacement. Empathetic recognition line (*"Most of us start with AI the way we started with Google — type, read, move on. That's a reasonable place to start."*) absorbs and reframes the pilot's "Current Reality Check" content without diagnosis.
3. **C.3 (Executor → Orchestrator):** New self-image. BEFORE/AFTER silhouettes — left silhouette hunched, right silhouette taller and more expansive. Punchline: *"AI handles the typing. You handle the thinking."*
4. **C.4 (V-Bounce Workflow):** What the Orchestrator actually does — Specify → Generate → Verify → Ship, with time-distribution shift (10/80/10 → 30/20/50). Operational concreteness for the abstract role-name in C.3.
5. **C.5 (Role → Trajectory):** Lifts to portability. 4 "why now" beats absorb the pilot's "Strategic Imperative" content reframed as personal-level. Closing line *"The bridge from where you are to wherever you need to be"* with ambient copper pulse — the Hook 2 detonator.

**Bookend structure:** C.1 and C.5 are deliberate twins. Both photographic hero. Both open with strikethrough on the old noun (`tool` / `role`). Both close with copper-italic keyword pulse. Both photos suggest movement *toward* something distant (bridge into fog / path into fog).

**Audience-respect linchpin:** C.2's recognition line. Acknowledges the pilot's diagnostic "Reality Check" content empathetically — no judgment, no diagnosis. The word *"reasonable"* does all the work.

### 3.5 C→D Bridge

The deck's deepest breath. **One dedicated slide** marking the pivot from mindset (C) to engineering primer (D). Photographic hero + Kofi Annan epigraph.

The Kofi Annan quote was chosen over Aristotle because it carries *family-level resonance* — *"in every society, in every family."* For a BCE audience who are parents thinking about their kids' generation, this lands with unusual weight. Aristotle's "more you know" is held as a speaker note for verbal use only.

The bridge slide is the **only true breath** in 13 slides of forward motion. The longest single fade (1.5s photo). The slowest stagger (~2.4s quote reveal). The strongest darken overlay (0.30). Every detail calibrated to slow the room down before D.1's "73% fail" diagnostic punch.

## 4. Per-slide specs

### 4.0 Title — *From AI Curiosity to AI Capability*

**FIG label:** *(none — title slides skip FIG per D+E convention)*

**Goal:** Open quietly. Set editorial register (dignity + forward motion). Name the workshop and facilitator without spectacle.

**Background:** Photographic hero. Recommended gemini-image-gen prompt:
> *"abstract data-flow topology, fine copper threads converging across deep near-black space, soft glow at intersection nodes, sophisticated editorial photography style, subtle depth-of-field, minimal, no text, no logos, no people, cinematic 16:9, restrained palette."*

Apply `<DarkenOverlay strength={0.10}>` — background already dark, less overlay needed.

**Layout:**
- Headline centered horizontally, vertically anchored at ~38-40% from top (slight visual lift)
- Workshop subtitle directly below at ~55%
- Attribution chip in bottom-right corner

**Content slots:**

| Slot | Content | Style |
|---|---|---|
| Display headline | `From AI Curiosity to AI Capability` | Instrument Serif ~92px, neutral-100, line-height 1.0, tracking -0.01em |
| Workshop subtitle | `BCE AI Catalyst · Vol 2, Session 2` | Source Serif 4 ~28px, neutral-300 |
| Attribution chip | `Adri · Nanovest` | Inter ~12px caps, 0.22em letter-spacing, copper-400, bottom-right fixed |

**Components:** `<HeroPhoto>` (futuristic-modern) · `<DarkenOverlay strength={0.10}>` · `<DisplayTitle>` · `<WorkshopSubtitle>` · `<AttributionChip>` (fixed corner)

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | Photo cross-fades in (800ms easeOut) → headline reveals translate-y 16px → 0 (600ms easeOutExpo) → workshop subtitle 200ms later → attribution chip 300ms later | ~1.5s total |
| — | Static after load — no Space-advances on Title | — |

**Hover:** None. Stillness is the design intent.

**Canonical pose:** End of load animation, everything settled.

**Implementation notes:**
- Workshop date deliberately omitted — keeps Title evergreen across multiple delivery dates (18-21 May, 26 May, 2-5 June, +1 JKT day).
- The background image MUST differ from C.1's bridge image — Title is futuristic-modern; C.1 is the bridge moment.

---

### 4.1 A.1 — *What you've already seen*

**FIG label:** `— FIG. A.1 · WHAT YOU'VE ALREADY SEEN`

**Goal:** Acknowledge the capability classes Session 1 covered (without redescribing individual winners' work). Pose 4 open questions pointing into later sections. Function as Hook 1 AND a curiosity-driven table-of-contents.

**Background:** Plain dark (`neutral-950`) + subtle dot-grid texture. Diagrammatic.

**Layout:**
- TOP STRIP: FIG label (top-left), horizontal row of 5 capability chips
- MIDDLE: Single italic bridging line
- BOTTOM TWO-THIRDS: Vertical stack of 4 open questions

**Content slots:**

| Slot | Content | Style |
|---|---|---|
| FIG label | `— FIG. A.1 · WHAT YOU'VE ALREADY SEEN` | Inter mono ~12px caps, copper-200, 0.22em tracking |
| Capability chip 1 | `AI CHATBOT` | Inter ~14px caps, neutral-300, copper-700 1px left-edge stop |
| Capability chip 2 | `SUMMARIZATION` | same |
| Capability chip 3 | `DOCUMENT ANALYSIS` | same |
| Capability chip 4 | `PROMPT ENGINEERING` | same |
| Capability chip 5 | `GEOSPATIAL AI` | same |
| Bridge line | "What you saw is real. And it opens these *questions*." | Source Serif 4 italic ~32px, neutral-200, `questions` copper-400 italic |
| Q1 (→ Section F) | "What if these tools could *talk to each other*?" | Source Serif 4 italic ~28px, neutral-200, copper-400 keyword |
| Q2 (→ Section E) | "What if context wasn't a one-shot prompt but a *standing memory*?" | same |
| Q3 (→ Section D) | "What if the *upstream process* was audited before automation?" | same |
| Q4 (→ Section F+H) | "What if every solution became a *skill others could fork*?" | same |

**Components:** `<FigLabel>` · `<CapabilityChip>` ×5 (horizontal flex) · `<BridgeLine>` (centered italic) · `<QuestionRow>` ×4 (vertical stack) · `<SectionPointerHover>` (hover reveals tiny `→ Section X` chip)

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG label fades in (200ms) → capability chips fade-in left-to-right with 80ms stagger (5 × 80 = 400ms) → bridge line fades in italic, 200ms after chips settle | ~1s |
| 1 | Q1 reveals (italic fade + translate-y 8px → 0, 400ms easeOutExpo) | 400ms |
| 2 | Q2 reveals (same) | 400ms |
| 3 | Q3 reveals (same) | 400ms |
| 4 | Q4 reveals + faint copper underline pulse on `questions` in bridge line | 400ms + 600ms pulse |

**Hover (presenter-controlled detail layer):** Hover any question → small `→ Section X` chip slides in (~150ms). Mouse-leave → chip slides back out. Optional; presenter can use as "we'll answer this here" tease or skip entirely.

**Canonical pose:** End of step 4 — all questions visible, capability chips settled, copper underline pulse caught mid-cycle.

**Implementation notes:**
- Capability chip nouns are deliberately *generic*. NEVER reference a winner's specific project — the question framing is what protects the audience-respect rule.
- Question copy preserves the "What if..." opener (invitation, not correction) and one *italic-copper keyword* per question per deck-wide keyword highlighting rule.
- 4 questions, not 5 — five would push vertical rhythm into the safe zone at projection scale. If a strong 5th question emerges, *swap* rather than add.

---

### 4.2.1 B.1 — *The AI Evolution Journey*

**FIG label:** `— FIG. B.1 · THE JOURNEY HERE`

**Goal:** Compress 75 years of AI history into one motion-vignette so the audience walks away with a *defensible* mental model. Plain-language captions, no jargon.

**Background:** Plain dark + dot-grid.

**Layout:**
- Horizontal timeline spanning ~80% of viewport width, vertically centered at ~55% from top
- 6 nodes evenly spaced left-to-right, connected by a thin copper-300 line that draws in stage-by-stage
- Each node = circle (~80px diameter) with signature SVG glyph, era label above, year range and plain caption below
- "WE ARE HERE" pointer marker hovers below stage 5 with a slow copper pulse
- Stage 6 (AGI) rendered dimmer + dashed circle border to signal *not yet*

**Content slots:**

| Stage | Glyph | Era label | Year range | Plain caption |
|---|---|---|---|---|
| 1 | `IF→THEN` flowchart | `RULE-BASED` | 1970s–80s | "Tell it exactly what to do. No learning." |
| 2 | scatter dots + line | `STATISTICAL LEARNING` | 1990s–2010s | "Learns patterns from data. Spam filters, recommendations." |
| 3 | layered grid → eye | `DEEP LEARNING & PERCEPTION` | 2012–2022 | "Sees and hears. ImageNet, voice assistants, the *Transformer paper* (2017)." |
| 4 | chat bubble | `LARGE LANGUAGE MODELS` | 2022–2024 | "Conversational. *ChatGPT* — 100M users in 2 months." |
| 5 | orchestrated cluster | `AGENTIC REASONING` | 2024–2026 | "Thinks, plans, uses tools, works for minutes. *o1, Claude computer use, Sonnet 4.5*." |
| 6 | dashed outline figure | `AGI (emerging)` | 2026–27+ | "Expert-level reasoning across domains. *Not yet — Anthropic forecasts late 2026 / early 2027.*" |
| WE ARE HERE marker | downward arrow with label | — | — | Sits below stage 5; copper-400; pulses 4s ambient loop |

**Components:** `<FigLabel>` · `<TimelineRail>` (connecting copper line, pathLength animator) · `<EraNode>` ×6 (glyph + label + caption) · `<WeAreHereMarker>` (pulse on stage 5) · `<DimmedNode>` (variant for stage 6) · `<NodeHoverPopover>`

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG label + bare timeline rail fade in (rail not yet drawn) | 400ms |
| 1 | Node 1 fades in; rail draws to node 1 with `pathLength 0→1` | 600ms |
| 2 | Node 2 + rail extends | 600ms |
| 3 | Node 3 + rail extends | 600ms |
| 4 | Node 4 + rail extends | 600ms |
| 5 | Node 5 reveals (slightly brighter); rail extends; **WE ARE HERE marker** appears below with slow copper pulse (4s ambient loop) | 800ms + ambient |
| 6 | Node 6 reveals dimmed with dashed outline; rail extends in dashed style | 600ms |

**Hover:** Hover any node → caption expands to 3-line popover with extra detail (e.g., Stage 3 hover: *"Transformer paper has 173,000+ citations — among the 10 most-cited papers of the 21st century."*). Presenter detail layer.

**Canonical pose:** End of step 6 — all 6 nodes visible, stage 5 marker pulsing, stage 6 dashed.

**Implementation notes:**
- The "WE ARE HERE" marker is the deck's first deliberate *ambient loop* (per the D.4 STOP↻ idiom from Section D). Slow, intentional, draws eye back during dwell.
- AGI stage MUST stay dimmer/dashed — honest framing is critical for credibility.

---

### 4.2.2 B.2 — *AI Fields & Terminology*

**FIG label:** `— FIG. B.2 · THE MAP`

**Goal:** Give the audience a defensible vocabulary nest. When someone says "GenAI" vs "ML" vs "LLM," they now know how those relate.

**Background:** Plain dark + dot-grid.

**Layout:**
- 5 nested rectangles (0px corners), each centered on the slide
- Outermost = AI (largest, dimmest); innermost = LLMs (smallest, brightest copper accent)
- Each nesting tier has a label hanging off the top-right corner with a thin copper rule connecting label to box
- Bottom italic line: "Everything inside the box belongs to the box outside it."

**Content slots:**

| Tier (outer → inner) | Label | Plain caption (on hover) |
|---|---|---|
| 1 (outermost) | `ARTIFICIAL INTELLIGENCE` | "Any system that mimics human intelligence." |
| 2 | `MACHINE LEARNING` | "AI that learns from examples instead of rules." |
| 3 | `DEEP LEARNING` | "ML using neural networks with many layers." |
| 4 | `GENERATIVE AI` | "Deep Learning that *creates* — text, images, video, audio." |
| 5 (innermost) | `LARGE LANGUAGE MODELS` | "GenAI for text and language. Claude, GPT, Gemini, Llama." |
| Bottom line | "Everything inside the box belongs to the box outside it." | Source Serif 4 italic ~22px, neutral-300 |

**Components:** `<FigLabel>` · `<NestedRect>` ×5 (with layout-morph via `layoutId`) · `<TierLabel>` ×5 (hangs off top-right with copper rule) · `<HoverCaption>` · `<BottomItalicAnchor>`

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG label + bottom italic line fade in | 400ms |
| 1 | Outermost AI rectangle draws in (stroke pathLength 0→1) + label fades | 600ms |
| 2 | ML rectangle nests inside + label | 500ms |
| 3 | Deep Learning rectangle + label | 500ms |
| 4 | Generative AI rectangle + label (slight copper brighten) | 500ms |
| 5 | LLMs rectangle (innermost, brightest copper-400 stroke) + label; faint copper glow halo (4s ambient loop) | 600ms + ambient |

**Hover:** Hover any rectangle → tier caption appears as 1-line popover.

**Canonical pose:** End of step 5 — all 5 tiers nested, LLM core glowing.

**Implementation notes:**
- Geometry: **rectangles, NOT circles** (circles are reserved for E.1's Russian-doll Prompt/Context/Harness — different metaphor, different shape, preserves visual vocabulary discipline).
- Stroke widths: outer = 1px copper-700; inner = 2px copper-400. Visual emphasis pulls eye inward.

---

### 4.2.3 B.3 — *Model Mechanics & Landscape Map*

**FIG label:** `— FIG. B.3 · DIALS AND DOMAINS`

**Goal:** Demystify *how you talk to a model* (3 dials) and *which model for what* (5-axis task map). Plain-language; technical names on hover.

**Background:** Plain dark + dot-grid.

**Layout:**
- Vertical split (50/50) with 1px copper-700 divider
- LEFT HALF: 3 horizontal "dial" rows stacked vertically — each row has labeled dial (knob graphic) + plain-language explanation
- RIGHT HALF: 5 horizontal "task" rows, each with task label + 2-3 model name chips

**Content slots — LEFT (Dials):**

| Dial | Plain caption | Technical name (hover) |
|---|---|---|
| Temperature | "Creativity knob. Low = predictable. High = inventive." | `temperature: 0.0 - 1.5+` |
| Context Window | "Working memory size. How much it can hold at once." | `context_window` (Claude Opus 4.7: 1M+ tokens) |
| System Prompt | "Standing rules. What it should always remember." | `system: "..."` |

**Content slots — RIGHT (Tasks):**

| Task | Model chips | "Best for" (hover per chip) |
|---|---|---|
| Write / Think | `Claude Opus 4.7` `GPT-5.5` `Gemini 3.1 Pro` | Opus: deepest reasoning + safest enterprise · GPT-5.5: fastest code · Gemini: long context |
| Draw | `Flux 2 Pro` `Midjourney v8` | Flux: realism + text-in-image · MJ: aesthetics king |
| Video | `Veo 3.1` `Kling 3.0` `Runway Gen-4.5` | Veo: all-rounder + 4K · Kling: cinematic multi-shot · Runway: granular camera control |
| Voice / Music | `ElevenLabs` `Suno v5` | ElevenLabs: realistic voices · Suno: full songs |
| Automate | `Claude Computer Use` `OpenAI Operator` | Computer Use: desktop · Operator: web |

**Components:** `<FigLabel>` · `<DialRow>` ×3 (knob + label + plain caption + hover-tech-name) · `<TaskRow>` ×5 (task label + chip list) · `<ModelChip>` (hover reveals "best for") · `<VerticalDivider>` (copper-700 1px)

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG label + vertical divider draw in (divider via pathLength) | 400ms |
| 1 | Dial 1 (Temperature) slides in from left; knob rotates 0→45° as final settle | 500ms |
| 2 | Dial 2 (Context Window) | 500ms |
| 3 | Dial 3 (System Prompt) | 500ms |
| 4 | Right half: all 5 task rows fade in with stagger (5 × 100ms = 500ms total) | 500ms |
| 5 | Faint copper glow on all model chips (1s pulse, then settles) — signals "you can hover these" | 1s |

**Hover:** Dials reveal technical name on hover. Model chips lift 2px + copper-700 stroke + reveal "best for X" caption. Hover is the *teacher* on this slide — surface clean, depth on demand.

**Canonical pose:** End of step 5 — both halves filled, glow caught mid-pulse.

**Implementation notes:**
- Knob graphic: SVG rotary dial with 3 marked positions (Low / Mid / High). Settles at "Mid" by default.
- This is the densest slide in the opener; consider implementing first as a layout-stress test before locking final copy.
- Model names should be verified at delivery time — frontier model versions shift monthly.

---

### 4.2.4 B.4 — *Tiers & Deployment*

**FIG label:** `— FIG. B.4 · TIERS, COMPETITORS, AND WHERE THE WORK RUNS`

**Goal:** Pricing intuition (tier ladder), viable non-Western alternatives (Asia-frontier), and the critical insight that *a smaller fine-tuned model can beat a frontier raw model on YOUR specific work.*

**Background:** Plain dark + dot-grid.

**Layout:** Three horizontal bands stacked vertically:
- **Top band (~30%):** Tier ladder — 3 stacked rows (Haiku → Sonnet → Opus)
- **Middle band (~25%):** Competitors strip — 4 horizontal chips
- **Bottom band (~40%):** Cloud-vs-Local split (left half = frontier; right half = local + fine-tuned) with connecting copper arrow + insight line

**Content slots:**

| Slot | Content |
|---|---|
| Tier 1 (top) | `Claude Haiku 4.5` · `~$0.80/M tok` · "Fast + cheap. High-volume work." |
| Tier 2 (mid) | `Claude Sonnet 4.6` · `~$3/M tok` · "Default workhorse. Most everyday work." |
| Tier 3 (apex) | `Claude Opus 4.7` · `~$15/M tok` · "Deepest reasoning. Hard problems, long thinking." |
| Competitor chip 1 | `Qwen 3.6 — Bahasa fluent · open-weight` |
| Competitor chip 2 | `DeepSeek V4 — 1M context, R1 reasoning` |
| Competitor chip 3 | `Moonshot Kimi K2.6 — multi-agent swarm` |
| Competitor chip 4 | `SEA-LION — 11 SEA languages` |
| Cloud-Frontier side | "Opus 4.7 · GPT-5.5 · Gemini 3.1" — best **raw capability** |
| Local + Fine-Tuned side | "Ollama + Llama 4 / Mistral / Qwen open-weight" — best **for your domain** |
| Key insight line | "A smaller fine-tuned model can outperform frontier on *your* specific work." | Source Serif 4 italic ~26px, copper-400 keyword |

**Components:** `<FigLabel>` · `<TierRow>` ×3 (stacked ladder) · `<CompetitorChip>` ×4 (horizontal flex) · `<CloudLocalSplit>` (two-half panel with connecting arrow) · `<KeyInsightLine>`

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG label fades in | 200ms |
| 1 | Tier ladder builds bottom-up: Haiku slides up → Sonnet → Opus. Each row 300ms, 150ms stagger | ~750ms |
| 2 | Competitor strip slides in horizontally (4 chips, 100ms stagger) | 500ms |
| 3 | Cloud-Frontier side reveals (left half) | 500ms |
| 4 | Local + Fine-Tuned side reveals (right half) | 500ms |
| 5 | Connecting copper arrow draws via pathLength + Key Insight line fades in italic | 600ms |

**Hover:** Hover any tier row → "best for what" expands to 2-line popover. Hover any competitor chip → 1-line specialty caption. Hover Cloud or Local side → corresponding side glows copper-300.

**Canonical pose:** End of step 5 — everything visible, copper arrow drawn, italic insight line lit.

**Implementation notes:**
- The bottom split is the *load-bearing concept* on this slide. The arrow is decorative; the italic insight line is what they should remember.
- Prices approximate (May 2026) — verify at time of delivery.

---

### 4.2.5 B.5 — *Today's Landscape + the Inverse Hook*

**FIG label:** `— FIG. B.5 · THE PARADOX`

**Goal:** Land the *urgency* of Section C. Open with the empowering stat (Indonesia 92% — you're already in motion). Pivot to the paradox (most adoption stalls). End with the cliffhanger Section C answers.

**Background:** Plain dark + dot-grid.

**Layout:** Echoes D.1's grammar — open enormous with a single dominant stat, then mechanism, then bars, then pivot.

- TOP (~40%): Huge stat `92%` centered + 2-line caption beneath
- MIDDLE: Single italic mechanism line: "And yet..."
- LOWER MIDDLE: Three horizontal bars stacked
- BOTTOM: Closing italic cliffhanger

**Content slots:**

| Slot | Content | Style |
|---|---|---|
| Big stat | `92%` | Instrument Serif ~280px, copper-400, line-height 0.85 |
| Stat caption | "Indonesia. Knowledge workers using GenAI. Highest in the world." | Source Serif 4 ~24px, neutral-200 |
| Mechanism line | "And yet..." | Source Serif 4 italic ~32px, neutral-400 |
| Bar 1 (full copper) | `79%` "adopted AI agents" *(Gartner, 2025)* | bar fill copper-400, ~70% width |
| Bar 2 (dim) | `11%` "actually in production" *(Gartner)* | bar fill copper-300 dim, ~11% width |
| Bar 3 (dashed dim) | `40%` "will be cancelled by 2027" *(Gartner)* | bar with dashed copper-200 outline, ~40% width |
| Cliffhanger | "*What makes the difference?*" | Source Serif 4 italic ~32px, neutral-200, `difference` copper-400 italic with underline pulse |

**Components:** `<FigLabel>` · `<BigStat>` (counter-up animation) · `<StatCaption>` · `<MechanismLine>` (italic) · `<InverseBar>` ×3 · `<CliffhangerLine>`

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG label + big stat counts up `0 → 92` (1500ms easeOutExpo) | 1.5s |
| 1 | Stat caption fades in beneath | 400ms |
| 2 | Mechanism line "And yet..." slides in italic | 400ms |
| 3 | Bar 1 (79%) grows from left, fill animates | 600ms |
| 4 | Bar 2 (11%) grows; visual contrast against Bar 1 emphasizes the drop | 600ms |
| 5 | Bar 3 (40%) grows in dashed-dim style | 600ms |
| 6 | Cliffhanger line fades in italic with copper underline pulse on `difference` (4s ambient — ties to Section C's pickup) | 600ms + ambient |

**Hover:** Hover any bar → 3-line Gartner-source citation popover (presenter detail).

**Canonical pose:** End of step 6 — full composition, copper underline pulse on `difference` caught mid-cycle.

**Implementation notes:**
- The 92% counter-up mirrors D.1's "73%" counter-up exactly — same component, same easing. Visual rhyme across the deck.
- Bar widths emotionally calibrated: bar 1 wide and bright (the *illusion* of adoption), bar 2 shockingly narrow (the *reality*). Visual storytelling does the work; speaker doesn't over-narrate.

---

### 4.3.1 C.1 — *Tool → Bridge*

**FIG label:** `— FIG. C.1 · FROM TOOL TO BRIDGE`

**Goal:** Land the central metaphor. Reframe AI from "occasional tool" → "bridge crossed daily." This throughline carries through to Hook 2 (Section I.4).

**Background:** Photographic hero. Recommended gemini-image-gen prompt:
> *"abstract photograph of a long modern bridge dissolving into deep copper fog, near-black sky, no people, no text, cinematic 16:9, editorial restraint, sophisticated, soft glow at the far end suggesting destination."*

Apply `<DarkenOverlay strength={0.20}>`.

**Layout:** Photo full-bleed. Left third blank for breathing. Right two-thirds:
- FIG label (top-right)
- Display headline at ~45% from top
- Italic clarifier beneath
- "From/To" pair at lower right

**Content slots:**

| Slot | Content | Style |
|---|---|---|
| FIG label | `— FIG. C.1 · FROM TOOL TO BRIDGE` | Inter mono ~12px caps, copper-200, top-right |
| Display headline | "AI is not a *tool*." | Instrument Serif ~88px, neutral-100, line-height 0.95 |
| Clarifier line | "It's a *bridge*." | Source Serif 4 italic ~52px, copper-400 |
| From line | "From: occasional use, narrow tasks, single sessions." | Source Serif 4 ~22px, neutral-400 |
| To line | "To: daily fluency, broad reach, *standing capability*." | Source Serif 4 italic ~22px, neutral-200, `standing capability` copper-400 italic |

**Components:** `<HeroPhoto>` · `<DarkenOverlay>` · `<FigLabel>` · `<DisplayTitle>` · `<StrikethroughAnimator>` (cancels `tool`) · `<ClarifierItalic>` · `<FromToBlock>`

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | Photo cross-fades in slowly (1200ms) — slower than other backgrounds, this is C's quiet moment | 1.2s |
| 1 | FIG label fades in | 200ms |
| 2 | Headline reveals "AI is not a tool." → copper-700 strikethrough draws across `tool` (400ms easeOutExpo) | 800ms |
| 3 | Clarifier reveals: "It's a bridge." italic copper-400 | 600ms |
| 4 | "From: ..." line slides in | 500ms |
| 5 | "To: ..." line slides in; copper pulse on `standing capability` (4s ambient) | 500ms + ambient |

**Hover:** `standing capability` italic → popover: *"Something you carry daily, not something you reach for occasionally."*

**Canonical pose:** End of step 5 — full composition, strikethrough drawn, pulse mid-cycle.

**Implementation notes:**
- The strikethrough on `tool` is the visual hinge of C. Sharp easing (400ms) so it lands as a deliberate cancellation, not hesitation.
- This photo MUST differ from Title (Title is data-flow topology) and from C.5 (C.5 is path into fog). All three are distinct images.

---

### 4.3.2 C.2 — *Replacement → Multiplier* (absorbs "Current Reality Check," reframed)

**FIG label:** `— FIG. C.2 · FROM FEAR TO LEVERAGE`

**Goal:** Defuse the biggest psychological blocker — fear of replacement. Acknowledge common starting patterns empathetically (not diagnostically) so the rest of C can land.

**Background:** Plain dark + dot-grid.

**Layout:** Top — empathetic recognition line. Middle — Fear panel ⨯ → Leverage panel. Bottom — 3-card row showing what "leverage" looks like.

**Content slots:**

| Slot | Content | Style |
|---|---|---|
| FIG label | `— FIG. C.2 · FROM FEAR TO LEVERAGE` | Inter mono ~12px caps, copper-200 |
| Recognition line | "Most of us start with AI the way we started with Google — type, read, move on. *That's a reasonable place to start.*" | Source Serif 4 ~24px, neutral-300, italic clause copper-300 |
| Fear panel (left) | `AI will replace me.` | Instrument Serif ~44px, neutral-400, struck-through with copper-700 |
| Arrow | `→` | copper-400, ~64px |
| Leverage panel (right) | `Someone using AI will.` / `So I learn to use it.` | Instrument Serif ~44px neutral-100; second line ~32px italic copper-400 |
| Card 1 | `MULTIPLIER` · "10× your existing output on what you already do well." | copper-700 left edge, Inter caps title, Source Serif body |
| Card 2 | `CO-PILOT` · "AI drafts, you decide. AI types, you think." | same |
| Card 3 | `FORCE-MULTIPLIER` · "Your team's reach expands without headcount change." | same |

**Components:** `<FigLabel>` · `<RecognitionLine>` · `<FearPanel>` (with strikethrough animator) · `<CopperArrow>` · `<LeveragePanel>` · `<MindsetCard>` ×3

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG + recognition line fade in | 400ms |
| 1 | Fear panel text reveals (no strikethrough yet) | 400ms |
| 2 | Strikethrough draws across fear panel — copper-700, 500ms easeOutExpo. Speaker beat here. | 500ms |
| 3 | Copper arrow pathLength 0→1 | 400ms |
| 4 | Leverage panel reveals — first line, then second line italic | 800ms |
| 5 | 3 cards fade-in from below with 120ms stagger, faint copper glow that settles | 600ms |

**Hover:** Cards lift 2px on hover, copper-700 left edge brightens, optional 1-line expansion.

**Canonical pose:** End of step 5 — strikethrough drawn, cards settled.

**Implementation notes:**
- The recognition line is the audience-respect linchpin — *"reasonable"* is doing all the work.
- The strikethrough on `AI will replace me` is slower than C.1's (500ms vs 400ms) — emotional rather than declarative; speaker should be able to pause on it.

---

### 4.3.3 C.3 — *Executor → Orchestrator*

**FIG label:** `— FIG. C.3 · A NEW ROLE`

**Goal:** Introduce the new self-image. Mirror the pilot's "Mindset Shift" content but with copper-only palette and editorial typography.

**Background:** Plain dark + dot-grid.

**Layout:** Vertical 50/50 split (1px copper-700 divider). LEFT — BEFORE (Executor silhouette + 5 attribute bullets, neutral-500). RIGHT — AFTER (Orchestrator silhouette + 5 attribute bullets, copper-400). BOTTOM CENTER — one-line punchline.

**Content slots:**

| Side | Title | Silhouette | Bullets |
|---|---|---|---|
| LEFT (BEFORE) | `EXECUTOR` (Inter caps, neutral-400) | Person hunched over keyboard — SVG vector, neutral-500 | • Write the work line by line · • Debug manually · • Document everything · • Repetitive sub-tasks · • Time → typing |
| RIGHT (AFTER) | `ORCHESTRATOR` (Inter caps, copper-400) | Person standing, arm directing — SVG vector, copper-400, slightly taller/wider | • Design and architect · • Specify intent · • Verify and review · • Decide and innovate · • Time → *thinking* |
| Punchline | "AI handles the typing. **You handle the *thinking*.**" | Source Serif 4 italic ~32px, neutral-200, `thinking` copper-400 italic |

**Components:** `<FigLabel>` · `<MindsetSilhouette>` ×2 (neutral vs copper) · `<MindsetBullets>` ×5 each side · `<VerticalDivider>` · `<PunchlineLine>`

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG + vertical divider (copper-700) draw in | 400ms |
| 1 | LEFT silhouette + title `EXECUTOR` reveal | 500ms |
| 2 | LEFT bullets stagger-fade (5 × 80ms) | 400ms |
| 3 | RIGHT silhouette + title `ORCHESTRATOR` reveal — silhouette animates to expansive pose (subtle layout-morph from hunched template, 700ms easeOutExpo) | 700ms |
| 4 | RIGHT bullets stagger-fade | 400ms |
| 5 | Punchline fades in italic; copper underline pulse on `thinking` (4s ambient) | 600ms + ambient |

**Hover:** Hover any bullet → 1-line elaboration beside it. Presenter detail layer.

**Canonical pose:** End of step 5 — both silhouettes visible, bullets settled, punchline italic.

**Implementation notes:**
- Silhouettes are vector SVG, not photos — stylized icons. Right silhouette literally taller/wider than left — visual storytelling: the new role expands you.
- Take-home line: "AI handles the typing. You handle the thinking." — quotable and stickable.

---

### 4.3.4 C.4 — *The V-Bounce Workflow*

**FIG label:** `— FIG. C.4 · THE NEW WORK SHAPE`

**Goal:** Make C.3's "Orchestrator" identity *concrete*. Show exactly what the new work looks like — Specify → Generate → Verify → Ship. Plus the time-distribution shift.

**Background:** Plain dark + dot-grid.

**Layout:** TOP HALF — V-workflow diagram (Specify on left peak → Generate at bottom of V → Verify at right peak → Ship arrow). BOTTOM HALF — Two stacked horizontal bars (BEFORE 10/80/10 vs AFTER 30/20/50). Bottom-right anchor line.

**Content slots:**

| Slot | Content |
|---|---|
| V node 1 (top-left) | `SPECIFY` "what to build, why it's right" — copper-700 border |
| V node 2 (bottom) | `GENERATE` "bulk work — AI does this" — copper-400 dimmer border |
| V node 3 (top-right) | `VERIFY` "review, validate, polish" — copper-700 border |
| Ship arrow | `→ SHIP` |
| Caption left of V | `HUMAN WORK: SPECIFY + VERIFY` — Inter caps ~14px, copper-300 |
| Caption below Generate | `AI WORK: GENERATE (bulk)` — Inter caps ~14px, neutral-400 |
| BEFORE bar | `Specify 10%` · `Generate 80%` (dominant copper-700) · `Verify 10%` |
| AFTER bar | `Specify 30%` · `Generate 20%` (small now) · `Verify 50%` (dominant copper-400) |
| Punchline | "More time on **what** and **why**. Less time on *how to type it*." | Source Serif 4 italic ~24px, neutral-200 |
| Anchor line | "This is the *productivity multiplier*." | Source Serif 4 italic ~22px, copper-400 italic |

**Components:** `<FigLabel>` · `<VWorkflowDiagram>` (3 nodes + connecting arrows) · `<HumanAILabel>` ×2 · `<TimeDistributionBar>` ×2 (before/after) · `<PunchlineLine>` · `<AnchorLine>`

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | FIG fades in | 200ms |
| 1 | V node Specify + Human→AI arrow draws to Generate | 600ms |
| 2 | V node Generate + AI→Human arrow draws to Verify | 600ms |
| 3 | V node Verify + Ship arrow draws | 600ms |
| 4 | BEFORE bar grows: Specify 10% → Generate 80% (dominant) → Verify 10% | 800ms |
| 5 | AFTER bar grows: Specify 30% → Generate 20% (visibly small now) → Verify 50% (dominant). Visual contrast against BEFORE is the slide's emotional payoff | 800ms |
| 6 | Punchline + anchor line fade in italic | 600ms |

**Hover:** Hover V node → 2-line caption expands what that step looks like. Hover bars → percentage labels glow.

**Canonical pose:** End of step 6 — full V workflow + both bars + punchline visible.

**Implementation notes:**
- The V-shape carries meaning: work *descends* into Generate (AI takes over), then *ascends* back into Verify (human resumes). Visual rhyme with the concept.
- The BEFORE bar's dominant 80% copper-700 Generate segment creates emotional contrast against AFTER's distributed bar — the contrast should be *seen* before words explain it.

---

### 4.3.5 C.5 — *Role → Trajectory* (Hook 2 seed; absorbs Strategic Imperative reframed)

**FIG label:** `— FIG. C.5 · WHEREVER YOU GO`

**Goal:** Lift "I have a new role" → "I have a new trajectory." Plant the Hook 2 seed (portability, lifelong capability) without naming transition. Close C with quiet empowerment.

**Background:** Photographic hero (second photo moment in C, echoes C.1). Recommended gemini-image-gen prompt:
> *"abstract photograph of a path winding into deep copper fog at sunrise, single faint footprint in foreground, near-black sky with soft copper horizon, no people visible, cinematic 16:9, editorial, restrained, forward motion suggested."*

Apply `<DarkenOverlay strength={0.25}>`.

**Layout:** Photo full-bleed. Center-left: display headline at ~35% from top. Beneath: italic clarifier. Lower-left: 4 small "why now" beats stacked vertically. Bottom: closing italic line.

**Content slots:**

| Slot | Content | Style |
|---|---|---|
| FIG label | `— FIG. C.5 · WHEREVER YOU GO` | Inter mono ~12px caps, copper-200, top-right |
| Display headline | "It's not a *role* you take." | Instrument Serif ~84px, neutral-100, line-height 0.95 |
| Clarifier | "It's a *trajectory* you build." | Source Serif 4 italic ~44px, copper-400 |
| Beat 1 | `COMPETITIVE` "Roles without AI fluency fall behind." | Inter caps ~12px copper-300 + Source Serif ~18px neutral-300 |
| Beat 2 | `CAPACITY` "AI fluency multiplies what one person can do." | same |
| Beat 3 | `CULTURAL` "Modern teams default to AI-augmented work." | same |
| Beat 4 | `PERSONAL` "From repetitive execution to *creative judgment*." | same, with italic-copper keyword |
| Closing line | "The bridge from where you are to *wherever you need to be*." | Source Serif 4 italic ~28px, neutral-100, italic phrase copper-400 |

**Components:** `<HeroPhoto>` (path into fog) · `<DarkenOverlay strength={0.25}>` · `<FigLabel>` · `<DisplayTitle>` (with strikethrough animator on `role`) · `<ClarifierItalic>` · `<WhyNowBeat>` ×4 · `<ClosingLine>` (italic with pulse)

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | Photo cross-fades in slowly (1500ms) — slowest fade in C, intentional gravity for the closing slide | 1.5s |
| 1 | FIG label fades in | 200ms |
| 2 | Headline reveals "It's not a role you take." → copper strikethrough draws on `role` (echoes C.1's strikethrough on `tool`) | 800ms |
| 3 | Clarifier reveals: "It's a trajectory you build." italic copper-400 | 600ms |
| 4 | 4 beats stagger-fade in from below (4 × 120ms) | 500ms |
| 5 | Closing line fades in italic; copper underline pulse on `wherever you need to be` (4s ambient — the Hook 2 seed pulse) | 800ms + ambient |

**Hover:** Hover any of the 4 beats → expanded 2-line caption appears beside it.

**Canonical pose:** End of step 5 — full composition visible, copper pulse on closing line mid-cycle.

**Implementation notes:**
- The 4 beats are the *absorbed* Strategic Imperative pilot content (Competitive Positioning · Untapped Potential · Culture Evolution · Strategic Value Shift), **reframed as personal-level** (not org-level).
- The closing line is THE Hook 2 detonator — when I.4 reveals "I'm a TPM, not an engineer," it lands because the audience already absorbed *"wherever you need to be"* in C.5. The ambient pulse is a deliberately planted memory cue.

---

### 4.4 Bridge — *From mindset to mechanics*

**FIG label:** `— BRIDGE · FROM MINDSET TO MECHANICS`

**Goal:** Provide the deck's deepest reflective breath. Honor the Kofi Annan epigraph with editorial dignity. Visually invoke the *crossing-completed* moment. Hand off cleanly to D.1.

**Background:** Photographic hero. Recommended gemini-image-gen prompt:
> *"abstract photograph of a path emerging from copper fog onto solid stone foundation, soft pre-dawn light, structured architectural geometry at far edge, near-black sky, no people, no text, cinematic 16:9, editorial restraint, contemplative."*

Apply `<DarkenOverlay strength={0.30}>` — strongest darken in the opener; the foreground text (long quote) needs the most legibility space.

**Layout:**
- Photo full-bleed
- TOP-RIGHT: FIG label
- CENTER: Kofi Annan quote stacked as 3 sentence-lines, vertically centered ~40%-55%
- BELOW QUOTE: Attribution chip (right-aligned)
- LOWER-CENTER: small italic handoff line + copper pulse

**Content slots:**

| Slot | Content | Style |
|---|---|---|
| FIG label | `— BRIDGE · FROM MINDSET TO MECHANICS` | Inter mono ~12px caps, copper-200, 0.22em, top-right |
| Quote line 1 | "Knowledge is *power*." | Instrument Serif italic ~52px, neutral-100, `power` copper-400 italic |
| Quote line 2 | "Information is *liberating*." | Instrument Serif italic ~52px, neutral-100, `liberating` copper-400 italic |
| Quote line 3 | "Education is the premise of progress, in every society, in every *family*." | Instrument Serif italic ~44px, neutral-100, `family` copper-400 italic |
| Attribution | `— Kofi Annan` | Inter ~14px caps, copper-300, 0.22em letter-spacing, right-aligned beneath quote |
| Handoff line | "From here, the *how*." | Source Serif 4 italic ~24px, neutral-300, `how` copper-400 italic with copper underline pulse |

**Components:** `<HeroPhoto>` (path onto foundation) · `<DarkenOverlay strength={0.30}>` · `<FigLabel>` · `<QuoteStack>` (3 sentence-lines, italic, keyword-highlighted) · `<AttributionChip>` · `<HandoffLine>` (italic with ambient pulse on copper keyword)

**Motion:**

| Step | What happens | Duration |
|---|---|---|
| 0 (load) | Photo cross-fades in slowly (1500ms — slowest fade in the deck, deliberate breath) | 1.5s |
| 1 | FIG label fades in (200ms) → quote sentence 1 fades in italic (600ms) → sentence 2 (400ms after) → sentence 3 (400ms after) → attribution fades in (300ms after) | ~2.4s continuous |
| 2 | Handoff line `"From here, the how."` fades in italic; copper underline pulse on `how` (4s ambient loop — ties to D.1's diagnostic open) | 600ms + ambient |

**Hover:** None. This slide is reverent and still. No detail layer.

**Canonical pose:** End of step 2 — quote fully visible, attribution settled, handoff line with copper pulse caught mid-cycle.

**Implementation notes:**
- This is the **longest single-fade in the entire deck** (1.5s photo + 2.4s quote stagger). Honor the breath.
- The 3 italic keywords (`power` / `liberating` / `family`) follow the deck-wide keyword highlighting rule. Family-level resonance is the slide's emotional payload — that one word does unusual work for a BCE audience who are parents.
- `"From here, the how."` is deliberately small — a *whispered* transition, not an announcement.
- **Skip-tolerance:** If a session runs short, this slide can be held at step 0 and never advanced past. The deck continues; the breath is just shallower.
- Aristotle quote (*"The more you know, the more you realize you don't know."*) is held as a speaker note for verbal use only — not on slide.

## 5. Audience-respect rules

Reminders specific to the opener:

1. **NEVER name a Vol-1 winner or their specific project in Section A.** Use *capability classes* (chatbot, summarization, document analysis, prompt engineering, geospatial AI). The winners are in the room or represented by colleagues; specific call-outs risk making them feel diagnosed.

2. **Pose questions, never name gaps.** The verb in A.1 is *"What if..."* (invitation), never *"They missed..."* or *"What's missing..."* (correction).

3. **C.2's recognition line is the audience-respect linchpin.** *"Most of us start with AI the way we started with Google — type, read, move on. That's a reasonable place to start."* — Acknowledges current behavior empathetically. NEVER diagnose attendees as "stuck in basic prompting" (the pilot's diagnostic framing).

4. **NEVER mention BCE transition / sunset / redeployment.** Per meta-spec §2 private context, the entire deck radiates portable capability as personal empowerment, never as preparation-for-leaving. C.5's closing line *"wherever you need to be"* is the empowerment frame; never named as transition.

5. **Body slides use generic knowledge-work examples** (per memory `feedback_generic_examples.md`) — Sections B and C draw on universal examples (document review, scheduling, drafting, decision support). Mining-specific framings live only in Hook moments (A and I), and even there as capability-class references, not winner-specific.

## 6. Cross-section visual rhymes + motion vocabulary

Patterns intentionally repeated across the opener to make the 13 slides feel of-a-piece:

### 6.1 Strikethrough idiom (C.1 + C.5 + C.2)

Three slides use animated strikethrough on a load-bearing noun to *cancel* an old framing:
- **C.1:** `tool` → struck through with copper-700 (400ms, sharp)
- **C.2:** `AI will replace me.` → struck through (500ms, slower, more emotional)
- **C.5:** `role` → struck through (400ms, mirrors C.1 — visual rhyme)

The strikethrough is the deck's idiom for "the old framing is over." Reserved for C; appears nowhere else.

### 6.2 Photographic hero moments

Five photographic hero moments in the opener, each visually distinct:
- **Title:** futuristic-modern data topology (forward-energy)
- **C.1:** bridge in copper fog (the central metaphor lands)
- **C.5:** path into copper fog with footprint (forward motion, departure)
- **Bridge slide:** path onto solid foundation (arrival)

Three of the four photos echo each other thematically (bridge → path → foundation) — a quiet narrative of *crossing* told through imagery without naming it.

### 6.3 Counter-up animation (B.5 mirrors D.1)

B.5's big stat (`92%`) uses the same counter-up component, easing curve, and duration as D.1's "73%" counter-up. Visual rhyme across sections — when D.1 fires moments later, the audience already saw the same animation idiom in B.5.

### 6.4 Ambient pulse (6 instances)

Slow 4-second copper-glow pulses signal slow attention moments. Used sparingly:
- **B.1:** "WE ARE HERE" marker on stage 5
- **B.5:** `difference` keyword in cliffhanger
- **C.1:** `standing capability` keyword
- **C.3:** `thinking` keyword
- **C.5:** `wherever you need to be` (Hook 2 detonator)
- **Bridge:** `how` keyword (D.1 handoff cue)

Each ambient pulse marks a phrase the audience should *carry forward*. Pulse is the deck's idiom for "remember this."

### 6.5 Keyword highlighting (deck-wide rule)

Per memory `feedback_keyword_highlighting.md`: in all body content, 1-3 keywords per chunk emphasized with copper-accent + italic. Applied mechanically across the opener via the deck's `highlight(text, kwArray)` function. Keywords selected by *operative weight* — the nouns/phrases that carry the chunk's meaning.

### 6.6 Geometry discipline

- **Rectangles (0px corners)** are the default — used for all cards, panels, dividers
- **Circles** are reserved for E.1's Russian-doll Prompt/Context/Harness metaphor — preserves visual vocabulary discipline
- **B.1's timeline nodes** are circles ONLY because they're discrete time-points on a rail (different metaphor from E.1's nesting circles)
- **B.2's taxonomic nest** uses rectangles, NOT circles — explicit choice to differ from E.1

### 6.7 FIG label convention

Every content slide has a FIG label in Inter mono, copper-200, 0.22em tracking, top-left or top-right. Format: `— FIG. X.N · CAPITALIZED NAME` or for the bridge: `— BRIDGE · CAPITALIZED NAME`. Title slide has no FIG label.

## 7. Implementation notes

### 7.1 Build order recommendation

1. Build the **content layer** first across all 13 slides — text in `content.ts` files with sibling `*Kw` keyword arrays. This lets you stress-test the copy at projection scale before motion work.
2. Build **B.3 (Mechanics & Landscape Map)** next as a layout-stress test — densest slide; if it works at projection, the rest will.
3. Build **C.1 and C.5** (photographic hero with strikethrough) — these are template moments that the bridge slide can derive from.
4. Build **Bridge slide last** as polish — the deck ships without it (worse, but functional); polish honors the breath when time permits.

### 7.2 Gemini-image-gen prompt patterns

All photo backgrounds use consistent prompt vocabulary for visual cohesion:
- "near-black sky" / "deep near-black space"
- "copper-tinted" / "copper fog" / "copper threads"
- "soft glow" / "subtle depth-of-field"
- "no people, no text, no logos"
- "cinematic 16:9"
- "editorial restraint, sophisticated"

Reuse these patterns across all 4 photo slides for tone consistency.

### 7.3 Pacing notes for presenter

- B.5 → C.1 is the strongest pivot in the opener. The cliffhanger question hands off; C.1's photo fade is slow (1.2s) to give the room a moment to *settle* into mindset territory.
- C.5 → Bridge is the deck's deepest breath. Presenter should pause before advancing. The bridge slide's fade is even slower (1.5s).
- Bridge → D.1 is the moment the deck's tone *re-energizes*. D.1 opens enormous with "73%" — speaker can lean into this contrast.

## 8. Risks + mitigations

| Risk | Mitigation |
|---|---|
| Section A feels too thin (only 1 slide for "Hook 1") | A.1 is dense — 5 capability chips + 4 italic questions + bridge line + hover pointers. At projection scale with proper pacing, 1 slide carries 3-4 minutes of speaker time. |
| Audience reads C.2's recognition line as patronizing despite reframing | Test copy at the podium. The word "reasonable" is doing all the work — if it lands wrong, drop the recognition line entirely and lead with the fear-flip directly. |
| Strikethrough animation looks gimmicky | Sharp ease-out (400ms), copper-700 stroke, completed before clarifier line reveals. Test on real projection — if it feels gimmicky in person, slow it down OR replace with a fade-out on the struck-through word. |
| Frontier model names are out of date by delivery | Verify B.3 and B.4 model names within 7 days of delivery. Update `/docs/researches/2026-05-11-foundation-model-landscape.md` if needed; this spec's model names can be patched without restructuring. |
| Bridge slide skipped under time pressure dilutes D.1's impact | Bridge slide is designed to be skip-tolerant (hold at step 0). D.1 still works without it, just with less tonal contrast. |
| Hook 2 fails to land in Section I because attendees don't remember C.5's pulse | The pulse is *seen* unconsciously; recognition is not required for I.4 to land. Even attendees who didn't track the pulse will experience the reveal as surprise — which also works. The pulse rewards close attendees; the reveal works for everyone. |

## 9. Open questions

1. **Final hex ladder for copper accents** — settled at implementation via real-slide projection testing per meta-spec §6.5. This spec uses copper-200/300/400/700 as semantic stops without committing to exact hex values.

2. **Workshop date display on Title** — currently DROPPED per Adri's instruction. If a specific session needs date-stamped PDFs distributed, we can add a date as a corner caption on a session-specific build rather than the canonical slide.

3. **Capability chip nouns in A.1** — placeholder list (AI Chatbot · Summarization · Document Analysis · Prompt Engineering · Geospatial AI) reflects winners' generic categories. Final list should be confirmed against BCE PIC's session-1 materials when delivered.

4. **Q1-Q4 wording in A.1** — placeholder questions are aimed at the right *shape* (open invitation, copper-italic keyword, section pointer). Adri's final wording should preserve "What if..." opener and one italic-copper keyword per question.

5. **Aristotle quote final disposition** — currently held as speaker note only. If a future session calls for it, it can be promoted to a quote-card moment (not on a dedicated slide; possibly a hover-popover on the bridge slide).

6. **Section indicator chrome (deck-wide)** — flagged as a potential cross-deck decision: a small section-progress indicator in the corner of every slide. Out of scope for this spec; decide separately if/when D + E + F want to adopt it.

## 10. Acceptance — locked decisions

Approved by Adri (locked 2026-05-11). Downstream implementation plan must consume this spec without re-litigating:

- **13 slides total** in the opening arc: Title (1) + A (1) + B (5) + C (5) + Bridge (1)
- **Title headline:** "From AI Curiosity to AI Capability"
- **Section A is 1 slide** — capability classes (not individuals) + 4 open questions pointing to D/E/F/H
- **Section B is 5 slides** — Evolution / Fields / Mechanics+Map / Tiers+Deployment / Today+Inverse
- **AI Evolution Journey uses the refreshed 6-stage taxonomy** with "we are here" on Agentic Reasoning and AGI explicitly NOT YET (per `/docs/researches/2026-05-11-ai-evolution-stages-refresh.md`)
- **Section C is 5 mindset slides:** Tool→Bridge / Replacement→Multiplier / Executor→Orchestrator / V-Bounce / Role→Trajectory
- **One dedicated bridge slide (C→D)** with Kofi Annan epigraph + handoff line
- **Aristotle held as speaker note only** (no slide)
- **No dedicated agenda slide** — A.1's question list functions as a curiosity-driven table of contents
- **All photo backgrounds use copper-tinted, near-black, editorial restraint** prompt vocabulary
- **Strikethrough idiom reserved for C** (C.1 `tool`, C.2 `AI will replace me`, C.5 `role`)
- **Ambient copper pulse reserved for memory cues** the audience should carry forward
- **C.5 closing line pulse is the Hook 2 (Section I.4) detonator** — implement carefully

**Next step:** invoke `writing-plans` skill to produce the implementation plan for this opening arc (likely: scaffolding the 13 slide React components matching D + E architecture, building the new motion components — `<StrikethroughAnimator>`, `<VWorkflowDiagram>`, `<TimeDistributionBar>`, `<QuoteStack>` — and porting the gemini-image-gen prompts).
