# Next Sub-Spec Brainstorm Handoffs

**Created:** 2026-05-07
**Updated:** 2026-05-08 — Foundation Core split into per-section handoffs (D done; E + F as separate fresh-session prompts).
**Purpose:** Paste-into-fresh-session prompts for the remaining slide-content brainstorms (Foundation Core E, Foundation Core F, Opening, Application).

## Section mapping (locked by parent meta-spec §9 + 2026-05-06 brainstorm)

The slide-content brainstorm was decomposed into 4 sub-specs by narrative arc:

| Sub-spec | Sections | Status |
|---|---|---|
| **Reveal + Closing** | I (Showcase + Hook 2) · J (Adoption) · K (Lab handoff) | ✅ Done — `docs/specs/2026-05-07-slides-reveal-and-closing.md` |
| **Foundation Core — D** | D (Process improvement) | ✅ Done — `docs/specs/2026-05-08-slides-foundation-core.md` (§4.1–§4.5) |
| **Foundation Core — E** | E (Engineering fundamentals) | ⏳ NEXT (fresh session) |
| **Foundation Core — F** | F (Techniques) | ⏳ Pending (fresh session after E) |
| **Opening** | Title · B (AI evolution + landscape) · C (Mindset) | ⏳ Pending |
| **Application** | G (Tools ecosystem) · H (Pitfalls + best practices) | ⏳ Pending |

**Out of scope (separate spec, pending external input):** Section A (Hook 1 — BCE Vol-1 Winner) and Practice-lab curriculum.

---

## 1. Foundation Core — split into per-section handoffs

The Foundation Core sub-spec was originally a single brainstorm. It has been split into per-section sessions because of design depth required per slide. Section D was completed in a 2026-05-08 session; Sections E and F are scoped as separate fresh-session brainstorms.

### 1a. Section D — DONE

Section D is fully specified at:

- **Spec:** `docs/specs/2026-05-08-slides-foundation-core.md` §4.1–§4.5 (5 slides, 22 logical advances)
- **Slides:** D.1 (THE TRAP, consolidated 73% + amplification + fix-the-spec) · D.2 (THE CONVERGENCE, 5-card synthesis diagram) · D.3 (ONE PROCESS, FOUR LEVELS, cinematic unfolding) · D.4 (DECISION PATTERN, horizontal ladder-rise) · D.5 (BRIDGE TO E, photographic close)
- **Locked terminology:** BPM / RPA / IPA / Agentic Automation (per Adri's correction — *no* "BPA" or "APA" in the audience-facing taxonomy). AI shows up as a feeder discipline (capability set), not as an automation level.
- **New primitives introduced:** `<CountUp>`, `<AmplificationBar>`, `<ConvergenceCard>`, `<LevelCard>` (with focal/filed/converged morph via Framer `layoutId`), `<LadderRise>` family, plus 4 motion-design vignette glyphs (`<BpmCompressionGlyph>`, `<RpaAccelerationGlyph>`, `<IpaSynthesisGlyph>`, `<AgenticInversionGlyph>`).

The Section D spec is the **tonal precedent** for E and F brainstorms — read it for register, depth, and motion grammar.

---

### 1b. Section E — handoff prompt (NEXT — start here)

> Paste the block below into a fresh Claude Code session in this same project directory.

```
You are joining a multi-spec slide-content brainstorm for the Berau Coal Energy AI Workshop deck (Vol 2, Session 2). The deck's Foundation Core sub-spec was originally one session; it has been split into per-section sessions because of design depth required per slide. Section D is DONE. This session is for Section E only.

**Project location:** /Users/macbook/Projects/_web_presentation/berau-presentation

**Parent meta-spec:** docs/specs/2026-05-06-process-and-design-meta.md — locks the substrate (skill stack, design system, interaction model, section structure A through K).

**Prior sub-specs (already done — read for cumulative tonal precedent + cross-spec dependencies):**
- docs/specs/2026-05-07-slides-reveal-and-closing.md — Sections I, J, K. Houses the cross-spec dependency on harness vocabulary (I.3 portfolio simulations).
- docs/specs/2026-05-08-slides-foundation-core.md — Sections D fully specified (§4.1–§4.5); Sections E and F have TBD placeholders. **Your job is to fill in Section E in this same file**, mirroring the depth and structure of Section D.

# Scope of this session — Section E only

**Section E — Engineering fundamentals** (prompt / context / harness — the Russian doll).

The audience needs to leave Section E understanding:
1. **Prompt** = the instructions you give the model (clarity).
2. **Context** = what information the model can see when answering (relevance).
3. **Harness** = the entire system around the model that lets it act in the world — tools, memory, hooks, orchestration, observability, error recovery (execution).
4. The three layers stack like a Russian doll. Each solves a different problem. Each layer's value compounds the previous. *"A decent model with a great harness beats a great model with a bad harness"* — Anthropic.

# CRITICAL cross-spec dependency

I.3's portfolio simulations (already shipped in the Reveal+Closing spec) heavily reference the **"harness"** vocabulary:

- I.3 left-rail categorization uses **HARNESSES** as a top-level category (containing Workflows + Plugins).
- I.3 default-state diagram shows: `MAIN AGENT (orchestrator) | chains, tools | sub-agents, [tools]` — and labels this *"the harness pattern."*
- I.3 simulations show concrete harnesses: orchestrator → sub-agents → tools, hub-and-spoke with 50+ MCP tools, etc.

Section E MUST define "harness" clearly enough that when the audience reaches I.3, those diagrams read as *"this is the harness you just learned about, instantiated"* rather than *"novel jargon."*

# Inputs

**Research file (consume without re-litigating):**
- docs/researches/topic-ai-engineering-fundamentals.md — full research on the three-layer trichotomy with the 60% / 85% / 95% impact ladder, ReAct loop, harness components.

**Reference PDFs (additional inputs — Adri has presented prompt + context engineering before; read for tonal precedent and existing visual approaches Adri has used internally):**
- docs/references/nanovest-pilot-workshop.pdf — **slides 20–31** (prompt + context engineering deep dive). Use the Read tool with the `pages` parameter to extract these specific slides.
- docs/references/nanovest-ai-sdlc-foundation.pdf — **slide 9** (prompt - context - harness engineering evolution). Use the Read tool with `pages: "9"`.

These are internal Nanovest decks Adri has delivered to engineers. The BCE workshop has a different audience (mining industry, not engineers), so the *exact content* should not transfer wholesale — but the *conceptual approach* and any successful explanatory frames should inform the E brainstorm. Treat as "how Adri has previously explained these concepts," not "what to copy."

**Cross-reference for harness vocabulary alignment:**
- docs/specs/2026-05-07-slides-reveal-and-closing.md §4.3 (I.3 portfolio simulations) — confirm Section E's harness definition resolves cleanly to the simulations described there.
- docs/researches/portfolio-*.md and docs/researches/workflow-*.md — for any concrete harness examples worth referencing in E.

**Memory files (deck-wide conventions — apply automatically):**
- feedback_keyword_highlighting.md — copper-italic on 1–3 keywords per chunk
- feedback_slide_visual_conventions.md — background tiering, FIG label, gemini-image-gen MCP for hero imagery
- feedback_slide_interaction_conventions.md — hover micro-interactions
- feedback_audience_framing.md — no commit counts, no "solo" repeats, plain-language
- feedback_no_paid_components.md — free stack only

# Process

1. Use the superpowers:brainstorming skill.
2. Do NOT re-litigate decisions already locked in the parent meta-spec, the Reveal+Closing spec, or the Foundation Core spec's Section D.
3. Brainstorm Section E:
   a. Decide narrative architecture (what's the section's emotional shape?)
   b. Decide slide count + per-slide breakdown
   c. Per-slide deep dive: layout / components / content / motion / hover / canonical pose
   d. Lock harness vocabulary so I.3 callbacks resolve cleanly
   e. Match Section D's design depth (motion-design vignettes where appropriate; editorial-serious tone; copper-only palette; 0px corner)
4. Update docs/specs/2026-05-08-slides-foundation-core.md by replacing the §4.6 TBD placeholder for Section E with full per-slide specs. Update §1.1 section structure table, §3.2 new primitives table, §6 animation budget, and §10 acceptance criteria to reflect E.
5. Self-review for placeholders / contradictions / scope drift.
6. Hand back to me for review before moving on to Section F.

# Constraints

- Stay within the substrate locked by the parent meta-spec (shadcn + Tailwind + Framer Motion; copper-only palette; 0px corner; static photographic backgrounds for hero slides).
- Honor cross-spec dependency: I.3's harness vocabulary must resolve to E's definitions.
- Free-stack only.
- Mining-audience plain-language framing — even though the reference PDFs were for an engineering audience, the BCE deck stays generic-but-accessible per the deck-wide "generic body, concentrated hooks" rule.
- Editorial-serious tone (no playful, no consumer-luxury, no tech-bro).
- The Russian-doll metaphor needs deliberate step-reveal pacing — each layer earns its reveal.
- Match Section D's pacing: slow, deliberate, design-each-slide-right. Multi-sitting if needed.

# Estimated scope

- Section E: ~5–8 slides (Russian doll requires deliberate step-reveal pacing).

# First step

Begin by reading, in this order:
1. The parent meta-spec (docs/specs/2026-05-06-process-and-design-meta.md) — substrate.
2. The Reveal+Closing spec (docs/specs/2026-05-07-slides-reveal-and-closing.md) — tonal precedent + I.3 cross-spec dependency.
3. The Foundation Core spec as it stands today (docs/specs/2026-05-08-slides-foundation-core.md) — Section D is the immediate tonal precedent + the section E will sit alongside.
4. The topic research file (docs/researches/topic-ai-engineering-fundamentals.md) — content scope.
5. The reference PDFs at the specified slide ranges (Nanovest pilot workshop slides 20–31; AI-SDLC foundation slide 9) — Adri's prior framings.

Then present your understanding of the scope and ask the first clarifying question (typically: narrative shape — Russian-doll-led versus impact-ladder-led versus example-led; or whether to start by sketching the harness diagram visual that I.3 already references).
```

---

### 1c. Section F — handoff prompt (after E)

> Paste this block when ready to brainstorm Section F (after E is done).

```
Let's discuss on section F based on **Parent meta-spec:** docs/specs/2026-05-06-process-and-design-meta.md 

**Section F — Techniques** (MCP / RAG / Plugins / Agent orchestration).

Each technique gets a plain-language framing and a non-engineer-graspable example. The audience needs to leave Section F understanding:
1. **MCP** — universal adapter / "USB for AI." Lets AI safely access existing business systems (calendar, email, databases) via a standard protocol.
2. **RAG** — retrieval-augmented generation. AI grounds answers in the actual relevant documents you provide, not on guesswork. Stops hallucinations.
3. **Plugins** — reusable expertise packages. Write expertise once (a SKILL.md); use it across chat, code, APIs. Update once → everyone gets the new standard. The package also cover hooks, MCPs, sub-agents, while on skills it can leverage references, scripts, examples.
4. **Agent orchestration** — specialists > generalists. Planner agent + specialist sub-agents (cost / safety / scheduling) + reviewer agent → faster, more reliable, less drift than one agent doing everything. Includes the supervisor-worker pattern, parallel sub-agents, ReAct loops.

Then a "how they fit together" closer that ties the four techniques into the layered architecture that maps onto Section E's harness.

# Inputs

**Research file (consume without re-litigating):**
- docs/researches/topic-ai-techniques.md — full research on MCP / RAG / Plugins / Agent orchestration with 2026 ecosystem state, mining-relevant examples, layered architecture diagram.
- docs/references/nanovest-pilot-workshop.pdf — **slides 32–33** on RAG and MCP. (or from docs/researches/internal-pilot-workshop.md)
- docs/references/nanovest-ai-sdlc-foundation.pdf — **slides 10–13** on plugins, skills, hooks (also from docs/researches/internal-ai-sdlc-foundation.md)
Use either explore agent or Read tool with `pages` parameter to extract these specific slides (no unnecessary context bloat)

# Process

1. Explore current codebase on sections D + E to understand existing visual language and design depth (also the content). May a bit different from parent meta-spec, existing implementation is proper reference.
2. Brainstorm Section F:
   a. Decide narrative architecture (parallel-structure-per-technique versus storytelling-led versus problem-led arc?).
   b. Decide slide count + per-slide breakdown (4 techniques × 1 slide each)? Or some techniques get more depth than others (especially on Plugins which contains skills, hooks, MCPs, sub-agents)
   c. Per-slide deep dive: layout / components / content / motion / hover / canonical pose.
   d. Lock MCP and agent orchestration vocabulary so I.3 callbacks resolve cleanly.
   e. Decide whether F gets a "how it all fits together" closer slide that ties the four techniques into Section E's harness.
   f. Match Sections D + E's design depth (motion-design vignettes where appropriate; editorial-serious tone; copper-only palette; 0px corner).
3. Create a new dedicated specs in docs/specs.
4. Self-review for placeholders / contradictions / scope drift across all of D + E + F together.
5. Hand back to me for review.

# Constraints

- Stay within the substrate locked by the parent meta-spec.
- Free-stack only.
- Mining-audience plain-language framing (do not very technical).
- Editorial-serious tone.
- Each technique's plain-language analogy MUST land for non-engineer attendees ("USB for AI" for MCP, "fact-checker's toolkit" for RAG, etc.).
- Match Sections D + E's pacing: slow, deliberate, design-each-slide-right.

Use haiku model for any explore agents used.
```

---

## 2. Opening — handoff prompt

> Paste this block when ready to brainstorm the deck opener.

```
Let's discuss on title slide & section A,B,C based on **Parent meta-spec:** docs/specs/2026-05-06-process-and-design-meta.md 

# Scope — Opening

The deck opener. Sets tone. Four pieces:

- **Title slide** — workshop name, date, audience. Per meta-spec: small bottom-corner attribution `Adri • Nanovest`. NO dedicated speaker-intro slide (verbal intro happens during Hook 1 setup).
- **Section A — Hook 1: BCE Vol-1 Winner**. All what winner delivered is good, the goal is to give questions of the improvement can be made, and the answer is by having proper foundational knowledge, as explained further in the deck (check first current implementation, find the gap, but NOT in the tone to do "correction", just make it as the "bridge" WHY we need this workshop.
- **Section B — AI evolution + landscape**. The "B" Hook 1 gestures toward — what's possible right now. Use Indonesia 92%-adoption stat + "79% adopted, 11% in production, 40% risk cancellation by 2027" as inverse hooks (per meta-spec §9).
- **Section C — Mindset**. AI as bridge / multiplier / portable adaptability. Throughline: *"AI is the bridge from where you are to wherever you need to be."* NEVER name as transition.

# Inputs

**Research files:**
- Section A - docs/references/ai-catalyst-berau-vol1-winner-project-material.pdf
- Section B - docs/researches/topic-ai-evolution.md as synthesis from docs/references/nanovest-pilot-workshop.pdf (slide 9-13)
- Section C - docs/references/nanovest-pilot-workshop.pdf (slide 3-7) & docs/researches/internal-hr-group.md for mindset research and framing inspiration.
We can dispatch explore agents to understand from above material, do web research based on section topics as needed, and store the analysis on docs/researches/ then use it as input. Use haiku model for any explore agents used.
For PDF, use Read tool with `pages` parameter to extract these specific slides (no unnecessary context bloat)

# Special considerations

- **Section C must seed the late-deck Hook 2 reveal** without telegraphing it. The mindset throughline ("bridge") supports the eventual "what could you build?" pivot in I.4.
- **Tone calibration is the most important task here** — Opening sets the editorial register the audience receives for the next 90 minutes.

# Process

1. Explore current codebase on sections D + E to understand existing visual language and design depth (also the content). May a bit different from parent meta-spec, existing implementation is proper reference.
2. Brainstorm All sections in the Opening arc (Title + A + B + C):
   a. Decide narrative architecture
   b. Decide slide count + per-slide breakdown
   c. Per-slide deep dive: layout / components / content / motion / hover / canonical pose.
   f. Match Sections D + E's design depth (motion-design vignettes where appropriate; editorial-serious tone; copper-only palette; 0px corner).
3. Create a new dedicated specs in docs/specs.
4. Self-review for placeholders / contradictions / scope drift
5. Hand back to me for review.

# Constraints

- Free-stack only.
- Mining-audience plain-language framing (do not very technical).

Use haiku model for any explore agents used.

# Estimated scope

- Title: 1 slide
- Section A: ~1-2 slides
- Section B: ~4–6 slides
- Section C: ~3–5 slides
- Total: ~8–13 slides, ~20–30 logical advances
```

---

## 3. Application — handoff prompt

> Paste this block when ready to brainstorm the practical close.

```
Let's discuss on section G & H based on **Parent meta-spec:** docs/specs/2026-05-06-process-and-design-meta.md 

# Scope — Application

The practical-close arc. Sections G + H. Bridges from foundation chapters to the late-deck Hook 2 reveal (Section I).

- **Section G — Tools ecosystem** (Claude (deep) / Google (deep) / OpenAI (brief)). Capability matrix slide; decision-tree slide; NotebookLM emphasized (per meta-spec §9). 
- **Section H — Pitfalls + best practices**. Catalog + answers; including fear-of-replacement reframe. Pair pitfalls with practices that solve them.

# Inputs

**Main context files (MUST READ)**
- docs/references/tools-context.md - how we should frame it for section G
- docs/references/pitfalls-and-best-practices.md - some of my thinking to be covered on section H, but need to be refined
- docs/references/tools-capabilities-assets.md - for the video assets to be used on section G (current video assets in assets/videos folder), we need to define whether we want to use it in our deck, embed videos directly, or just using youtube iframe

**Research files:**
- docs/researches/topic-ai-tools-ecosystem.md (Section G)
- docs/researches/topic-pitfalls-and-best-practices.md (Section H)
- docs/researches/internal-claude-tooling.md (Claude-specific tooling context)
We can dispatch explore agents to understand the research material, or do web research on non-covered research topics, and store the analysis on docs/researches/ then use it as input. Use haiku model for any explore agents used.

# Special considerations

- **Section H must NOT be doom-and-gloom** — the meta-spec specifies "fear-of-replacement reframe" and "pair pitfalls with practices." Each pitfall needs its corresponding practice on the same slide or adjacent.
- **Application is the LAST conceptual section before Section I** — its closing slide should leave the audience curious about "who is this guy?" — seeding the Hook 2 reveal that follows.

# Process

1. Explore current codebase on sections D + E to understand existing visual language and design depth. May a bit different from parent meta-spec, but existing implementation is proper reference.
2. Brainstorm topic: 
   a. Decide narrative architecture
   b. Decide slide count + per-slide breakdown
   c. Per-slide deep dive: layout / components / content / motion / illustration / hover / canonical pose.
   f. Match Sections D + E's design depth (motion-design vignettes where appropriate; editorial-serious tone; copper-only palette; 0px corner).
   e. Display tools capabilities approach, content plus videos? iframve or direct asset embedding? or no videos?
3. Create a new dedicated specs in docs/specs.
4. Self-review for placeholders / contradictions / scope drift
5. Hand back to me for review.

# Constraints

- Free-stack only.
- Mining-audience plain-language framing (do not very technical).
```

---

## Order recommendation (for reference)

Foundation Core Section D is complete. Recommended remaining order:

1. **Foundation Core — Section E** (next; fresh session) — engineering fundamentals (Russian doll). Locks the harness vocabulary that I.3 already references; uses the Nanovest pilot-workshop and AI-SDLC-foundation reference PDFs for prompt + context engineering precedent.
2. **Foundation Core — Section F** (after E; fresh session) — techniques (MCP / RAG / Skills / Agent orchestration). Depends on E's harness definition; locks the MCP and orchestration vocabulary I.3 references.
3. **Application** (sub-spec #3 of 4) — Sections G + H. Depends on Foundation Core's full definitions; sets up Hook 2.
4. **Opening** (sub-spec #4 of 4) — Title + Sections B + C. Last; Title-slide tone is informed by everything else; opener calibrates against the now-defined whole.

This order optimizes for *fewer revisits* — each session consumes the prior sessions' outputs without re-litigating.

Alternative valid orders:
- E → F → Opening → Application (cosmetic preference; Application benefits more from Hook 2 calibration than Opening does)
- Opening → F → Application (chronological / matching delivery flow); only viable once E is done since F depends on E

## Done state

All sections locked across all 4 sub-specs → all implementation plans written → execute. Then projection-test, rehearse, deliver.
