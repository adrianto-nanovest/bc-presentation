# Presentation codebase brief

## 1. Deck structure

### Registry behavior

`deckSlides` concatenates section arrays in this order: **A → B → C → D → E → F → G → H → I/J/K** (`src/deck/registry.tsx:28-40`).

Important: `SlideDef` has `steps`, animation metadata, `section`, and `render`; it has **no `id` or `title` fields** (`src/deck/types.ts:12-18`). IDs below come from rendered `FigLabel` conventions; titles come from visible headline copy.

Audience totals:

- Berau: **64 slides**.
- General: **62 slides**; it removes Berau K.1/K.2 and renumbers the thank-you slide to K.1 (`src/slides/reveal-and-closing/index.ts:15-30`, `k3-thank-you.tsx:19-21`).
- `HexLadder` is developer-only via `?dev=hexladder`, outside audience navigation (`src/deck/registry.tsx:13-26`, `src/deck/Deck.tsx:43-61`).

### Full ordered list

#### Section A — opening

Order: `src/slides/opening-section-a/index.ts:7-14`.

- `Title` → **From AI Curiosity to AI Capability** → `src/slides/opening-section-a/title.tsx:187` (copy: `content.ts:27-35`)
- `A.1` Berau → **The capabilities you brought to the room.** → `src/slides/opening-section-a/a1-what-youve-seen.tsx:606` (copy: `content.ts:86-94`)
- `A.1` general alternative → **The AI most of us already know.** → `src/slides/opening-section-a/a1-general.tsx:9` (copy: `content.ts:166-174`)

#### Section B — landscape

Order: `src/slides/landscape-section-b/index.ts:8-15`.

- `B.1` → **Seventy-five years of AI, in one glance.** → `b1-evolution-journey.tsx:693` (copy: `content.ts:46-49`)
- `B.2` → **Five rings, one nested family.** → `b2-fields-terminology.tsx:458` (copy: `content.ts:164-167`)
- `B.3` → **How LLMs work — the pipeline and its dials.** → `b3-mechanics-landscape.tsx:273` (copy: `content.ts:324-329`)
- `B.4` → **Six categories, one map of what wins where.** → `b4-tiers-deployment.tsx:334` (copy: `content.ts:563-570`)
- `B.5` → **88% of organizations have adopted AI / Adoption is not outcome.** → `b5-todays-landscape.tsx:567` (copy: `content.ts:819-828`)

#### Section C — mindset

Order: `src/slides/mindset-section-c/index.ts:9-18`.

- `C.1` → **From Tool to Bridge.** → `c1-tool-to-bridge.tsx:322` (copy: `content.ts:36-39`)
- `C.2` → **From Fear to Leverage.** → `c2-replacement-multiplier.tsx:558` (copy: `content.ts:83-85`)
- `C.3` → **From Executor to Orchestrator.** → `c3-executor-orchestrator.tsx:744` (copy: `content.ts:155-157`)
- `C.4` → **The Shape of the New Work.** → `c4-v-bounce-workflow.tsx:374` (copy: `content.ts:218-220`)
- `C.5` → **From Role to Trajectory.** → `c5-role-trajectory.tsx:420` (copy: `content.ts:265-267`)
- `C.6` → **From Mindset to Mechanics** / Kofi Annan epigraph → `c6-bridge-to-d.tsx:270` (copy: `content.ts:321-337`)

#### Section D — foundation core

Order: `src/slides/foundation-core/index.ts:8-15`.

- `D.1` → **73% of automation projects fail.** → `d1-the-trap.tsx:255` (copy: `content.ts:45-51`)
- `D.2` → **Three disciplines converge. One evolves.** → `d2-the-convergence.tsx:217` (copy: `content.ts:95-96`)
- `D.3` → **One process. Four levels.** → `d3-one-process-four-levels.tsx:158` (copy: `content.ts:211-212`)
- `D.4` → **Each level builds on the previous. You can't skip.** → `d4-decision-pattern.tsx:180` (copy: `content.ts:310-311`)
- `D.5` → **Process is the spec. Engineering is the system around it.** → `d5-bridge-to-e.tsx:154` (copy: `content.ts:346-351`)

#### Section E — engineering fundamentals

Order: `src/slides/foundation-core-section-e/index.ts:15-29`.

- `E.1` → **Three layers. Each one contains the last.** → `e1-three-layers.tsx:355` (`content.tsx:17-18`)
- `E.2` → **Layer 1: Prompt — clarity.** → `e2-prompt-what-why.tsx:377` (`content.tsx:48-49`)
- `E.3` → **One skeleton. Many names.** → `e3-prompt-structure.tsx:548` (`content.tsx:67-68`)
- `E.4` → **Eight techniques. Three tiers.** → `e4-prompt-methodologies.tsx:515` (`content.tsx:145-146`)
- `E.5` → **The recipe, in real prompts.** → `e5-prompt-examples.tsx:652` (`content.tsx:221-223`)
- `E.6` → **A great prompt still has limits.** → `e6-prompt-the-wall.tsx:291` (`content.tsx:350-351`)
- `E.7` → **Layer 2: Context — relevance.** → `e7-context-what-why.tsx:350` (`content.tsx:369-370`)
- `E.8` → **Four strategies. Each one solves a context problem.** → `e8-context-strategies.tsx:238` (`content.tsx:443-444`)
- `E.9` → **Context works. But you're orchestrating it every session.** → `e9-context-the-wall.tsx:236` (`content.tsx:456-468`)
- `E.10` → **Layer 3: Harness — execution.** → `e10-harness-what-why.tsx:335` (`content.tsx:472-497`)
- `E.11` → **What good harness teams do: eight practices.** → `e11-harness-practices.tsx:252` (`content.tsx:500-585`)
- `E.12` → **Three layers. The fundamentals are built.** → `e12-bridge-to-f.tsx:163` (`content.tsx:589-594`)

#### Section F — foundation techniques

Order: `src/slides/foundation-techniques-section-f/index.ts:12-23`.

- `F.1` → **Two Pillars** → `f1-two-pillars.tsx:577` (`content.tsx:18-19`)
- `F.2` → **RAG · Grounding in your facts** → `f2-rag-ground-truth.tsx:1380` (`content.tsx:47-48`)
- `F.3` → **Plugins · The expertise package** → `f3-plugins-the-package.tsx:1289` (`content.tsx:96-97`)
- `F.4` → **Skills · Write expertise once** → `f4-skills-write-once.tsx:1161` (`content.tsx:149-150`)
- `F.5` → **MCP · The universal adapter** → `f5-mcp-the-adapter.tsx:1164` (`content.tsx:265-266`)
- `F.6` → **Hooks · Doing the unsexy work** → `f6-hooks-unsexy-work.tsx:612` (`content.tsx:388-389`)
- `F.7` → **Sub-agents · Specialist departments** → `f7-subagents-specialists.tsx:1189` (`content.tsx:461-462`)
- `F.8` → **The command center you carry.** → `f8-your-agentic-os.tsx:79` (`content.tsx:544-545`)
- `F.9` → **Seven techniques. The toolkit is open.** → `f9-bridge-to-g.tsx:158` (`content.tsx:893-903`)

#### Section G — tools ecosystem

Order: `src/slides/application-section-g/index.ts:14-29`.

- `G.1` → **Three vendors. Specialization, not single winners.** → `g1-ecosystem-overview.tsx:138` (`content.tsx:12-13`)
- `G.2` → **Four platforms. One Claude.** → `g2-claude-platforms.tsx:149` (`content.tsx:69-70`)
- `G.3` → **Eight surfaces. Pick the ones you'll use.** → `g3-claude-capabilities.tsx:223` (`content.tsx:164-165`)
- `G.4` → **You don't need to write code to use these.** → `g4-builtin-tools.tsx:221` (`content.tsx:334-335`)
- `G.5` → **Seven surfaces. NotebookLM is the standout.** → `g5-google.tsx:253` (`content.tsx:531-532`)
- `G.6` → **Three surfaces. Brief by design.** → `g6-openai.tsx:127` (`content.tsx:600-601`)
- `G.7` → **Easily confused. Pick by shape, not vendor.** → `g7-head-to-head.tsx:377` (`content.tsx:652-653`)
- `G.8` → **Vendor × use case. The decoder.** → `g8-capability-matrix.tsx:366` (`content.tsx:960-961`)
- `G.9` → **Building a production-grade website, end to end.** → `g9-workflow.tsx:203` (`content.tsx:1021-1022`)
- `G.10` → **Three more worth knowing — for when the giants don't fit.** → `g10-beyond-big-three.tsx:192` (`content.tsx:1084-1085`)
- `G.11` → **You have the tools. The toolkit is built.** → `g11-bridge-to-h.tsx:164` (`content.tsx:1133-1143`)

#### Section H — pitfalls and discipline

Order: `src/slides/application-section-h/index.ts:6-14`.

- `H.1` → **What untrained use looks like.** → `h1-pitfall-wall.tsx:78` (`content.tsx:11-13`)
- `H.2` → **What discipline looks like.** → `h2-discipline-wall.tsx:101` (`content.tsx:95-97`)
- `H.3` → **The competition is not AI. It's someone learning the discipline first.** → `h3-bridge-to-i.tsx:169` (`content.tsx:185-195`)

#### Section I — process/profile/portfolio reveal

Order: `src/slides/reveal-and-closing/index.ts:21-25`.

- `I.1` → **What you've been watching so far. It was built entirely by AI.** → `i1-meta-process.tsx:425` (`content.ts:5-16`)
- `I.2` → **Introduction. Who am I.** → `i2-profile-journey.tsx:172` (rendered at `:62-67`)
- `I.3` → **Built. Taught. In production.** → `i3-portfolio.tsx:80` (`content.ts:161-164`)
- `I.4` → **Foundation before velocity. A Project Manager built this in a year.** → `i4-key-message-bridge.tsx:165` (`content.ts:290-300`)

#### Section J — recipe

Order: `src/slides/reveal-and-closing/index.ts:26-29`.

- `J.1` → **Still a beginner. A lot left to learn.** → `j1-humility-intro.tsx:78` (`content.ts:303-306`)
- `J.2` → **Mindset before tools.** → `j2-five-principles.tsx:310` (`content.ts:308-314`)
- `J.3` → **Habits before output.** → `j3-recipe-buildup.tsx:298` (`content.ts:394-400`)
- `J.4` → **Build before broadcast.** → `j4-recipe-ship.tsx:299` (`content.ts:450-456`)

#### Section K — practice lab and closing

Berau order: `src/slides/reveal-and-closing/index.ts:18-30`.

- `K.1` → **From watching to building. The recipe is yours now.** → `k1-challenge-handoff.tsx:166` (`content.ts:506-516`)
- `K.2` → **The Practice Lab, end to end.** → `k2-practice-lab-overview.tsx:439` (`content.ts:519-525`)
- `K.3` → **Thank you. The recipe travels with you.** → `k3-thank-you.tsx:163` (`content.ts:608-618`)

General order:

- `K.1` → the same thank-you component, internally named `k3Slide`, with `FIG_NUM` changed to `1` (`k3-thank-you.tsx:19-21`).

The comment at `src/deck/registry.tsx:39` says “K1 is the final audience slide,” but the actual Berau registry ends with K.3.

---

## 2. Variant mechanism

### Middleware does not pass a variant into React

There are two independent resolvers:

1. **Middleware/server resolver**
   - Exact hostname `bc-presentation.vercel.app` → Berau.
   - Every other hostname → general.
   - Evidence: `middleware.ts:43`, `middleware.ts:69-79`.

2. **React/client resolver**
   - `?variant=berau` or `?variant=general` overrides hostname.
   - Otherwise Berau for `bc-presentation.vercel.app`, `localhost`, and `127.0.0.1`; general for every other hostname.
   - Non-browser execution defaults to Berau.
   - Evidence: `src/variant.ts:1-21`.

`middleware.ts` is not imported by Vite or React (`middleware.ts:4-8`). React therefore renders `a1-general.tsx` versus `a1-what-youve-seen.tsx` because `src/variant.ts` exports `VARIANT`, and the opening registry evaluates:

```tsx
VARIANT === "general" ? a1GeneralSlide : a1Slide
```

Evidence: `src/slides/opening-section-a/index.ts:1-14`.

Middleware ignores `?variant=`. A query override can therefore make the authenticated login brand and rendered deck disagree.

### Existing local/query variants

Yes, but only two values exist:

- `?variant=berau`
- `?variant=general`

Evidence: `src/variant.ts:3-12`.

Other query parameters are unrelated:

- `?slide=N` selects the initial slide (`src/deck/Deck.tsx:17-27`).
- `?dev=hexladder` renders the calibration slide (`src/deck/Deck.tsx:43-61`).

### Current touchpoints for another deck variant

The binary implementation currently spreads variant behavior across these locations:

| Concern | Current touchpoint |
|---|---|
| Variant names, query allowlist, client hostname map | `src/variant.ts:7-18` |
| Server hostname map | `middleware.ts:43`, `middleware.ts:69-72` |
| Login cookie, page title, eyebrow | `middleware.ts:45-61` |
| Per-variant password/env selection | `middleware.ts:74-80` |
| Login hero/preload/shared visual branding | `middleware.ts:185-203`, `middleware.ts:223-245`, `middleware.ts:374-384` |
| Middleware asset exemption for the login hero | `middleware.ts:28-35` |
| Base page title and Berau favicon | `index.html:6-7` |
| Client page-title/favicon replacement | `src/main.tsx:7-15` |
| Vite public asset root | `vite.config.ts:5-9` |
| Logo/image files | `assets/` |
| Title-slide workshop chip | `src/slides/opening-section-a/title.tsx:15-16`, `:147`; copy at `content.ts:27-41` |
| A.1 slide selection | `src/slides/opening-section-a/index.ts:2-14` |
| Variant A.1 wrapper/content | `a1-general.tsx:1-16`, `content.ts:159-212` |
| K-slide inclusion/removal | `src/slides/reveal-and-closing/index.ts:15-30` |
| Closing figure number | `src/slides/reveal-and-closing/k3-thank-you.tsx:17-21` |

There is no centralized variant configuration object shared between middleware and React. `vercel.json` only configures Vite build/output (`vercel.json:1-6`); custom domains and environment values are external deployment state.

The GEMS variants are described only as future requirements in `docs/prompts/gems-catalyst.md:35-43`. Neither `gems-middle-mgmt` nor `gems-leader` exists in `DeckVariant` or runtime branching today.

---

## 3. Current content summaries

### A.1 — both variants

#### Shared component and steps

`A1WhatYouveSeen` is content-driven; the general wrapper passes `a1GeneralContent`, while Berau uses the default `a1Content` (`a1-what-youve-seen.tsx:52-55`, `a1-general.tsx:3-15`).

Both declare three steps:

- **Step 0:** headline, tagline, rule header, and five centered capability chips. Mount timers reveal tagline at 220 ms, rule at 460 ms, chips at 680 ms (`a1-what-youve-seen.tsx:57-74`, `:89-115`).
- **Step 1:** chips morph into five left-column cards using shared Framer Motion `layoutId`; five agenda questions appear in the right column after a 650 ms delay (`:39-48`, `:76-124`, `:296-343`, `:470-520`).
- **Step 2:** footer caption appears (`:92`, `:126-149`).

Slide definitions: Berau `:606-613`; general `a1-general.tsx:9-16`.

#### Berau content

Title: **The capabilities you brought to the room.**

Five capabilities:

1. AI Chatbot
2. Summarization
3. Document Analysis
4. Prompt Engineering
5. Geospatial AI

Evidence: `src/slides/opening-section-a/content.ts:86-126`.

The right column contains five questions pointing to Sections D–H: process audit, standing context/memory, tool interoperability, real end-to-end workflows, and reusable skills (`content.ts:127-154`).

#### General content

Title: **The AI most of us already know.**

Five capabilities:

1. AI Chatbot
2. Summarization
3. Document Analysis
4. Drafting & Writing
5. Prompt Engineering

Evidence: `content.ts:166-206`.

It shares the exact Berau questions by reference, because D–H are currently identical (`content.ts:207-210`).

#### Data source

No API or external dataset. All copy is static in `src/slides/opening-section-a/content.ts`; the slide renders that object directly.

### K.2 — Practice Lab overview

#### Structure and steps

Two-step slide (`k2-practice-lab-overview.tsx:9-16`, `:439-446`):

- **Step 0:** four interactive cards on the left; right detail panel is empty until hover/click.
- **Step 1:** same interaction plus footer caption.

The four parts are:

1. **The Case** — manufacturing, May 2026, 12% volume miss.
2. **Two Tracks** — same dataset, two personas.
3. **Four Stages** — Ground → Reason → Visualize → Author.
4. **The Outputs** — operational data becomes reports, slides, dashboard, design system, and reusable skill.

Evidence: `src/slides/reveal-and-closing/content.ts:526-604`.

Hover previews a part; clicking pins it. Pin wins over hover (`k2-practice-lab-overview.tsx:34-46`, `:113-135`).

#### Two tracks

The current content explicitly has two tracks (`content.ts:543-570`):

- **Section Head · Analyst**
  - Question: “Why did this happen?”
  - Skill: `root-cause-investigator`
  - Discipline: `evidence-tracing`

- **Team Leader · Comms Booster**
  - Question: “What do we communicate now?”
  - Skill: `ops-comms-drafter`
  - Discipline: `template-fidelity`

#### External links

Only the Two Tracks rows contain links; the renderer creates real `<a target="_blank" rel="noopener noreferrer">` elements (`k2-practice-lab-overview.tsx:246-255`, `:348-355`, `:397-434`).

Analyst:

- [Runbook](https://docs.google.com/document/d/1tLBJMYK-Sj7Cl-yhLH0Sk7Z2mPTp9LRn/edit?usp=drive_link&ouid=111800124012810515564&rtpof=true&sd=true)
- [Main folder](https://drive.google.com/drive/folders/1n2vi3_kG-3wISHv9EhdwwCZz_G4vhR0n?usp=drive_link)
- [Starter pack](https://drive.google.com/drive/folders/1hECVKmwLLl84e1dOaworgkhU5cGzI8ns?usp=drive_link)

Team Leader:

- [Runbook](https://docs.google.com/document/d/1tmKDFOEHiq789xXohxYMxBkngl94APL-/edit?usp=drive_link&ouid=111800124012810515564&rtpof=true&sd=true)
- [Main folder](https://drive.google.com/drive/folders/18Uwk89jClcWa7XrhPp9sQfvnYvmWJyPM?usp=drive_link)
- [Starter pack](https://drive.google.com/drive/folders/1CV5BB8rrkjd7uhW9RQaAsd--kEhhDRqT?usp=drive_link)

#### Data source

All case, track, stage, output, and URL data is hardcoded in `src/slides/reveal-and-closing/content.ts:519-606`.

### B.4 — models by category

#### Structure and steps

Two steps (`b4-tiers-deployment.tsx:14-22`, `:334-341`):

- **Step 0:** six category cards. Hover or pin drives a right-side detail panel; pinned category wins over hover (`:55-72`, `:153-164`, `:218-235`).
- **Step 1:** right pane becomes a static 4×5 qualitative matrix; hover no longer changes it, and the footer appears (`:185-216`, `:241-269`).

Categories and layouts (`content.ts:571-643`):

- R1 numeric bars: Write & Reason, Code, Agentic, Multimodal.
- R2 chips: Creative Tools.
- R3 scatter: Cost × Intelligence.

#### Hardcoded benchmark models and scores

All values live in `src/slides/landscape-section-b/content.ts:644-789`.

| Category | Frontier | Open-weight |
|---|---|---|
| Write & Reason | Claude Opus 4.8 **61.4**; GPT-5.5 **60.2**; Gemini 3.1 Pro **57.2** | MiniMax-M3 **54.7** |
| Code | GPT-5.5 **59.1**; Claude Opus 4.8 **56.7**; Gemini 3.1 Pro **55.5** | DeepSeek V4 Pro **47.5** |
| Agentic | Claude Opus 4.8 **77.8**; GPT-5.5 **74.1**; Gemini 3.5 Flash **70.4** | MiniMax-M3 **68.6** |
| Multimodal | Gemini 3.5 Flash **84%**; GPT-5.5 **80%**; Claude Opus 4.7 **79%** | MiniMax-M3 **80%** |

Creative chips (`content.ts:712-718`):

- Image: Flux 2 Pro, Midjourney v8, Nanobanana Pro
- Video: Veo 3.1, Kling 3.0, Runway Gen-4
- Voice: ElevenLabs, Suno v5

Cost/intelligence scatter (`content.ts:719-736`):

- Claude Opus 4.8 — intelligence 61, cost 4685.85
- GPT-5.5 — 60, 3357.00
- Gemini 3.1 Pro — 57, 892.28
- Grok 4.3 — 53, 395.17
- MiniMax-M3 — 55, 308.34
- Kimi K2.6 — 54, 947.87
- DeepSeek V4 Pro — 52, 267.82
- MiMo-V2.5-Pro — 54, 160.82

Annotation: **“90% the intelligence, 1/15th the cost”**, Claude Opus 4.8 → MiniMax-M3 (`content.ts:732-736`).

The qualitative matrix is also hardcoded, not calculated at runtime (`content.ts:759-783`). A deprecated quantitative heatmap remains hardcoded but is not rendered (`content.ts:737-758`).

#### B4 component responsibilities

- `B4CategoryCard.tsx` receives categories and interaction state; it contains no benchmark data (`:33-80`).
- `B4ModelDetailPanel.tsx` imports `b4Content` directly and selects:
  - `C.benchmarks[categoryId]`
  - `C.creativeChips`
  - `C.scatter`
  - `C.scatterAnnotation`
  
  Evidence: `:18-25`, `:31-76`, `:138-190`.

- `B4CostScatter.tsx` receives points as props. Plot bounds/ticks and two label offsets are separately hardcoded (`:25-49`, `:68-85`).
- `B4QualitativeSummary.tsx` renders pre-derived `rows`, `columns`, and `cells`; it explicitly does no runtime derivation (`:1-5`, `:37-48`, `:109-145`).

The repository research source names Artificial Analysis and a fetched date of 8 June 2026 (`docs/researches/2026-06-08-llm-benchmarks-june-2026.md:1-16`). Components do not load that Markdown or fetch live data.

### Section E and Harness Engineering

The full E.1–E.12 list is in §1 above; registry evidence is `src/slides/foundation-core-section-e/index.ts:1-29`.

“Harness Engineering” currently appears in three places:

- **E.1 layer:** content names the third layer “Harness Engineering” (`content.tsx:35-40`). E.1 steps are Prompt focal → Context focal → Harness focal → Summary (`e1-three-layers.tsx:1-5`, `:22-35`).
- **E.10 dedicated harness slide:** five steps:
  1. Definition and four why-points.
  2. Six context mitigations.
  3. `Agent = Model + Harness` and quote.
  4. Four-line stanza.
  5. “Build once. Use forever.”
  
  Evidence: `e10-harness-what-why.tsx:5-10`, `:25-32`; copy: `content.tsx:472-497`.

- **E.11 practices:** two steps:
  1. Eight static practice cards stagger in.
  2. Footer appears.
  
  Evidence: `e11-harness-practices.tsx:5-13`, `:28-60`.

The eight practices are Orchestration, Plugins, Memory, Observability, Triggers, Spec-driven, HITL, and Ralph Wiggum (`content.tsx:503-583`).

The header comments in `e10-harness-what-why.tsx:1` and `e11-harness-practices.tsx:1` still call them E.9/E.10, but their `FigLabel`, exports, and registry positions are E.10/E.11.

### E.9 — current animation

Two deck steps (`e9-context-the-wall.tsx:5-13`, `:236-243`):

- **Step 0:** four left cards are visible; the right canvas is blank until interaction.
- **Step 1:** only the footer is added.

The four pitfalls are Context Conflict, Context Confusion, Context Poisoning, and Context Distraction (`content.tsx:456-464`).

Interaction:

- Hover sets the active animation.
- Click pins an animation.
- Pin wins over hover.
- No active/pinned kind means `PitfallCanvas` returns `null`.

Evidence: `e9-context-the-wall.tsx:31-40`, `:105-127`, `:215-229`; `components/PitfallCanvas.tsx:20-50`.

Animations:

- **Conflict:** two circles converge; “FROZEN” appears (`PitfallAnims.tsx:53-79`).
- **Confusion:** signal triangle above a moving block of irrelevant information/tool/cognitive overload (`:82-102`).
- **Poisoning:** dots descend from Clean to Corrupted and change color in a repeating sequence (`:104-123`).
- **Distraction:** a token/progress bar fills while a degradation curve draws; “DEGRADED” appears afterward (`:125-158`).

Each animation also shows explanatory text, mitigation, and example from `PIT_DETAIL` (`PitfallAnims.tsx:22-51`, `:164-229`). The current distraction visual does **not** show a multi-turn prompt/response compounding sequence.

### I.1 — Meta Process

Four steps (`i1-meta-process.tsx:15-37`, `:425-432`):

1. Two centered lines.
2. Second line morphs into the header; middle process line appears.
3. Middle line moves above a four-card grid; cards appear.
4. Footer appears.

The four cards are Research & Preparation, Brainstorm & Plan, Prototype, and Implementation. Their task/result copy lives in `src/slides/reveal-and-closing/content.ts:17-84`.

Exact initial states:

- **Step 0 / `stepIndex === 0`:**
  - “What you've been watching so far.” centered around `top:300`.
  - “It was built entirely by AI.” centered around `top:400`.
  - Lines use a 0/250 ms mount stagger.
  - Middle line is opacity-zero.
  - Card grid is opacity-zero/non-interactive.
  - Footer is hidden.
  
  Evidence: `i1-meta-process.tsx:152-173`, `:181-265`, `:267-315`, `:321-339`.

- **Step 1 / `stepIndex === 1`:**
  - First line fades out.
  - Second line moves to `top:80,left:48` and shrinks from 52 px to 40 px.
  - “And here's the process that made it possible.” appears centered at `top:330`.
  - Cards and footer remain hidden.
  
  Evidence: `i1-meta-process.tsx:168-173`, `:217-315`.

---

## 4. Favicon and login

### Favicon

- Base HTML defines `/bc-logo.png` and title **Berau Coal AI Workshop** (`index.html:6-7`).
- General boot changes the title to **AI Catalyst Workshop** and favicon to `/general-ai-logo.png` (`src/main.tsx:7-15`).
- `assets/` is Vite’s public root (`vite.config.ts:8`).

Confirmed filesystem state:

- `assets/general-ai-logo.png` exists.
- `assets/bce-logo.png` exists.
- `assets/gems-logo.svg` exists (`assets/gems-logo.svg:1-14`).
- No `assets/bc-logo.png` was found. The declared Berau favicon filename does not match `bce-logo.png`.
- `gems-logo.svg` is currently unreferenced by runtime code.

### Login branding

Yes: the pre-auth login-page implementation and branding live only in `middleware.ts`.

- Variant fields: cookie, page title, eyebrow (`middleware.ts:45-61`).
- Login HTML/CSS/head: `middleware.ts:185-384`.
- Form and password UI: `middleware.ts:389-432`.
- Failure page: `middleware.ts:434-440`.

Only the `<title>` and eyebrow are variant-specific. The login headline, facilitator credit, copper styling, and `/heroes/title-data-topology.jpg` background are shared and hardcoded (`middleware.ts:190-203`, `:223-245`, `:374-384`).

The middleware login head currently contains no favicon `<link>` (`middleware.ts:190-203`).

---

## 5. Other existing per-variant switches

Runtime deck-brand variants are limited to these references:

- Resolver/type/query/hostname: `src/variant.ts:1-21`
- Client title/favicon: `src/main.tsx:4-15`
- Opening A.1 selection: `src/slides/opening-section-a/index.ts:2-14`
- Title workshop chip: `src/slides/opening-section-a/title.tsx:15-16`, `:147`
- General A.1 content/wrapper: `content.ts:159-212`, `a1-general.tsx:1-16`
- K slide removal: `src/slides/reveal-and-closing/index.ts:2`, `:15-30`
- Closing figure renumbering: `k3-thank-you.tsx:17-21`
- Middleware hostname/auth/login brand: `middleware.ts:37-80`

No other runtime `VARIANT`, `isBerau`, or deck-level `"general"` condition was found.

Other uses of the word `variant`—for example `MindsetSilhouette`, orchestration diagrams, bar styling, or prompt-example cards—are component presentation modes, not hostname/deck variants.

`docs/prompts/gems-catalyst.md:35-43` documents intended GEMS variants and local parameters, but no GEMS runtime switch exists today.

Inspection only; no files changed and no tests run.