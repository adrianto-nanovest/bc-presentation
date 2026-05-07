# Next Sub-Spec Brainstorm Handoffs

**Created:** 2026-05-07
**Purpose:** Paste-into-fresh-session prompts for the remaining 3 slide-content sub-specs.

## Section mapping (locked by parent meta-spec §9 + 2026-05-06 brainstorm)

The slide-content brainstorm was decomposed into 4 sub-specs by narrative arc:

| Sub-spec | Sections | Status |
|---|---|---|
| **Reveal + Closing** | I (Showcase + Hook 2) · J (Adoption) · K (Lab handoff) | ✅ Done — `docs/specs/2026-05-07-slides-reveal-and-closing.md` |
| **Foundation Core** | D (Process improvement) · E (Engineering fundamentals) · F (Techniques) | ⏳ NEXT (priority) |
| **Opening** | Title · B (AI evolution + landscape) · C (Mindset) | ⏳ Pending |
| **Application** | G (Tools ecosystem) · H (Pitfalls + best practices) | ⏳ Pending |

**Out of scope (separate spec, pending external input):** Section A (Hook 1 — BCE Vol-1 Winner) and Practice-lab curriculum.

---

## 1. Foundation Core — handoff prompt (priority — start here)

> Paste the block below into a fresh Claude Code session in this same project directory.

```
You are joining a multi-spec slide-content brainstorm for the Berau Coal Energy AI Workshop deck (Vol 2, Session 2). The deck has been decomposed into 4 sub-specs by narrative arc; this is sub-spec #2 of 4.

**Project location:** /Users/macbook/Projects/_web_presentation/berau-presentation

**Parent meta-spec:** docs/specs/2026-05-06-process-and-design-meta.md — locks the substrate (skill stack, design system, interaction model, section structure A through K).

**Prior sub-spec (already done — read for tonal precedent + cross-spec dependencies):** docs/specs/2026-05-07-slides-reveal-and-closing.md — Sections I, J, K.

# Scope of this sub-spec — Foundation Core

This is the deck's conceptual heart. Sections D + E + F.

- **Section D — Process improvement** (BPA / RPA / IPA / agentic). Use the *"73% of automation projects fail because broken processes get automated unchanged"* fix-the-spec hook from meta-spec §9.
- **Section E — Engineering fundamentals** (prompt / context / harness Russian doll). Step-reveal animation builds the layers piece by piece. **CRITICAL CROSS-SPEC DEPENDENCY:** the "harness" vocabulary is heavily referenced in I.3's portfolio simulations. Section E must define harness clearly enough that I.3's callbacks land.
- **Section F — Techniques** (MCP / RAG / skills / agent orchestration). Plain-language framing — each technique gets a non-engineer-graspable example. **CRITICAL CROSS-SPEC DEPENDENCY:** MCPs and agent orchestration are also referenced in I.3. Section F must define these clearly enough that I.3's portfolio reads as "concepts you just learned, instantiated."

# Inputs

**Research files (consume without re-litigating):**
- docs/researches/topic-process-improvement.md (Section D)
- docs/researches/topic-ai-engineering-fundamentals.md (Section E)
- docs/researches/topic-ai-techniques.md (Section F)
- docs/researches/portfolio-*.md and workflow-*.md — for harness vocabulary alignment with I.3

**Memory files (deck-wide conventions — apply automatically):**
- feedback_keyword_highlighting.md — copper-italic on 1–3 keywords per chunk
- feedback_slide_visual_conventions.md — background tiering, FIG label, gemini-image-gen MCP for hero imagery
- feedback_slide_interaction_conventions.md — hover micro-interactions
- feedback_audience_framing.md — no commit counts, no "solo" repeats, plain-language
- feedback_no_paid_components.md — free stack only

# Process

1. Use the superpowers:brainstorming skill.
2. Do NOT re-litigate decisions already locked in the parent meta-spec or the prior sub-spec.
3. For each section (D → E → F, in that order):
   a. Decide narrative architecture (what's the section's emotional shape?)
   b. Decide slide count + per-slide breakdown
   c. Per-slide deep dive: layout / components / content / motion / hover / canonical pose
   d. Reference the harness vocabulary from I.3 where relevant — keep terminology consistent
4. Write the spec to docs/specs/YYYY-MM-DD-slides-foundation-core.md following the structure of the prior sub-spec (sections 0–11).
5. Self-review for placeholders / contradictions / scope drift.
6. Hand back to me for review before invoking writing-plans.

# Constraints

- Stay within the substrate locked by the parent meta-spec (shadcn + Tailwind + Framer Motion; copper-only palette; 0px corner; static photographic backgrounds for hero slides; etc.)
- Honor cross-spec dependencies (Section I.3's harness/MCP/orchestration callbacks must resolve to clear definitions in E + F)
- Free-stack only
- Mining-audience plain-language framing
- Editorial-serious tone (no playful, no consumer-luxury, no tech-bro)
- Topic D in particular needs to land for *broken-process* awareness — many mining-engineer attendees will resonate with "we automated a broken process and it failed harder"

# Estimated scope

- Section D: ~5–8 slides (process improvement is conceptually rich and has a strong opening hook)
- Section E: ~5–8 slides (Russian doll requires deliberate step-reveal pacing)
- Section F: ~6–10 slides (4+ techniques, each with an example)
- Total: ~16–26 slides, ~30–60 logical advances

This is the LARGEST sub-spec by content volume. Plan for a long brainstorm session — possibly multiple sittings.

# First step

Begin by reading:
1. The parent meta-spec
2. The prior sub-spec (Reveal + Closing) for tonal precedent + cross-spec callbacks
3. The 3 topic research files (D, E, F)

Then present your understanding of the scope and ask the first clarifying question (typically: which of D/E/F to brainstorm first, given that E + F are downstream of D conceptually but Cross-spec dependencies pull E forward).
```

---

## 2. Opening — handoff prompt

> Paste this block when ready to brainstorm the deck opener.

```
You are joining the multi-spec slide-content brainstorm for the Berau Coal Energy AI Workshop deck. This is sub-spec #3 of 4.

**Project location:** /Users/macbook/Projects/_web_presentation/berau-presentation

**Parent meta-spec:** docs/specs/2026-05-06-process-and-design-meta.md
**Prior sub-specs (read both for cumulative tonal precedent):**
- docs/specs/2026-05-07-slides-reveal-and-closing.md (Sections I, J, K)
- docs/specs/<date>-slides-foundation-core.md (Sections D, E, F)

# Scope — Opening

The deck opener. Sets tone. Three pieces:

- **Title slide** — workshop name, date, audience. Per meta-spec: small bottom-corner attribution `Adri • Nanovest`. NO dedicated speaker-intro slide (verbal intro happens during Hook 1 setup).
- **Section B — AI evolution + landscape**. The "B" Hook 1 gestures toward — what's possible right now. Use Indonesia 92%-adoption stat + "79% adopted, 11% in production, 40% risk cancellation by 2027" as inverse hooks (per meta-spec §9).
- **Section C — Mindset**. AI as bridge / multiplier / portable adaptability. Throughline: *"AI is the bridge from where you are to wherever you need to be."* NEVER name as transition.

# Inputs

**Research files:**
- docs/researches/topic-ai-evolution.md (Section B)
- docs/references/* — internal-deck PDFs for tonal precedent

**Memory files:** all 5 deck-wide conventions (apply automatically).

# Special considerations

- **Hook 1 (Section A) is OUT OF SCOPE** — material pending from BCE PIC. The Title slide must hand off cleanly to Hook 1 without committing to specific Hook 1 content.
- **Section C must seed the late-deck Hook 2 reveal** without telegraphing it. The mindset throughline ("bridge") supports the eventual "what could you build?" pivot in I.4.
- **Tone calibration is the most important task here** — Opening sets the editorial register the audience receives for the next 90 minutes.

# Process

Same as Foundation Core: superpowers:brainstorming skill, per-section narrative architecture → slide count → per-slide deep dive. Output to docs/specs/YYYY-MM-DD-slides-opening.md.

# Estimated scope

- Title: 1 slide
- Section B: ~4–6 slides
- Section C: ~3–5 slides
- Total: ~8–12 slides, ~15–25 logical advances
```

---

## 3. Application — handoff prompt

> Paste this block when ready to brainstorm the practical close.

```
You are joining the multi-spec slide-content brainstorm for the Berau Coal Energy AI Workshop deck. This is sub-spec #4 of 4 — the LAST one before implementation.

**Project location:** /Users/macbook/Projects/_web_presentation/berau-presentation

**Parent meta-spec:** docs/specs/2026-05-06-process-and-design-meta.md
**All prior sub-specs (read for cumulative tonal precedent):**
- docs/specs/2026-05-07-slides-reveal-and-closing.md (Sections I, J, K)
- docs/specs/<date>-slides-foundation-core.md (Sections D, E, F)
- docs/specs/<date>-slides-opening.md (Title, B, C)

# Scope — Application

The practical-close arc. Sections G + H. Bridges from foundation chapters to the late-deck Hook 2 reveal (Section I).

- **Section G — Tools ecosystem** (Claude (deep) / Google (deep) / OpenAI (brief)). Capability matrix slide; decision-tree slide; NotebookLM emphasized (per meta-spec §9). NOTE: NotebookLM appears in I.3 portfolio (as one of Adri's plugins) — Section G's NotebookLM coverage should set up the I.3 callback.
- **Section H — Pitfalls + best practices**. Catalog + answers; fear-of-replacement reframe. Pair pitfalls with practices that solve them.

# Inputs

**Research files:**
- docs/researches/topic-ai-tools-ecosystem.md (Section G)
- docs/researches/topic-pitfalls-and-best-practices.md (Section H)
- docs/researches/internal-claude-tooling.md (Claude-specific tooling context)

**Memory files:** all 5 deck-wide conventions (apply automatically).

# Special considerations

- **Section G's NotebookLM coverage is load-bearing** — sets up the audience to recognize NotebookLM when it appears in I.3 portfolio (Adri built a NotebookLM plugin). Subtle continuity payoff.
- **Section H must NOT be doom-and-gloom** — the meta-spec specifies "fear-of-replacement reframe" and "pair pitfalls with practices." Each pitfall needs its corresponding practice on the same slide or adjacent.
- **Application is the LAST conceptual section before Section I** — its closing slide should leave the audience curious about "who is this guy?" — seeding the Hook 2 reveal that follows.

# Process

Same as prior sub-specs: superpowers:brainstorming skill, narrative arch → slide count → per-slide deep dive. Output to docs/specs/YYYY-MM-DD-slides-application.md.

# Estimated scope

- Section G: ~5–7 slides
- Section H: ~4–6 slides
- Total: ~9–13 slides, ~18–28 logical advances

# After this sub-spec

All 4 sub-specs are complete. Next step: invoke superpowers:writing-plans for each sub-spec to produce the implementation plan, then superpowers:executing-plans (or subagent-driven-development) to build the slides.
```

---

## Order recommendation (for reference)

The user is starting with Foundation Core. After Foundation Core, the recommended remaining order is:

1. **Foundation Core** (current priority) — biggest sub-spec; conceptual heart; defines harness vocabulary that I.3 already references.
2. **Application** — second; depends on Foundation Core's definitions; sets up Hook 2.
3. **Opening** — last; Title-slide tone is informed by everything else; opener calibrates against the now-defined whole.

This order optimizes for *fewer revisits* — each spec consumes the prior sub-specs' outputs without re-litigating.

Alternative valid order: Opening → Foundation Core → Application (chronological / matching delivery flow). Trade-off: Opening's tone calibration is harder without Foundation Core defined yet.

## Done state

All 4 sub-specs locked → all 4 implementation plans written → execute. Then projection-test, rehearse, deliver.
