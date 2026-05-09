# Handoff Prompt — Reveal+Closing Slides Plan (Phase 7 onwards)

Continuing execution of `docs/plans/2026-05-07-reveal-and-closing-slides.md`

## State at handoff

- Branch: `main`, HEAD: `bfa4ab2` (post-Task 6.5 I.4)
- Phases 0, 1, 2, 3, 4, 5, 6 are COMPLETE (14 commits since prior handoff `69755ad`, 23/36 plan tasks)
- 86/86 unit tests green; `npx tsc --noEmit` clean
- Working tree has untracked user files (`docs/brainstorms/`, `docs/researches/`, `docs/specs/`, `docs/plans/`, `docs/prompts/`, `assets/`, modified `.gitignore`) — DO NOT stage or commit these. Use targeted `git add <specific files>` always; never `git add -A` or `git add .`.
- 8 real slides built + 1 dev hex-ladder. Slide order: `[i1Slide, i2Slide, i4Slide, j1Slide, j2Slide, j3Slide, j4Slide, k1Slide]`. Runtime `window.__DECK_SLIDE_COUNT__` reports 9.

## What is built since prior handoff (Phases 3–6)

**Phase 3 (asset prep, 1 task):**
- `assets/heroes/{i2-night-workspace,i4-dusk-horizon,j1-notebook-study,k1-morning-workspace}.jpg` — generated via `gemini-multimedia-gen` MCP using `gemini-3-pro-image` model (Imagen 4 rejected `negative_prompt`/`person_generation` params)
- `docs/runbooks/image-gen-prompts.md` — re-render runbook
- `vite.config.ts` — added `publicDir: "assets"`. Side-effect: `assets/n8n-workflows/` is now also reachable at `/n8n-workflows/*`. Internal-only deck so likely fine; mention in case it matters.

**Phase 4 (content + 2 hero slides, 3 tasks):**
- `src/slides/reveal-and-closing/content.ts` — frozen content module for all 9 slides, 9 `export const` blocks
- `src/slides/reveal-and-closing/components/highlight.tsx` — shared keyword-highlighting helper (longest-match-first, splits text on each keyword and wraps in `<KeywordHighlight>`)
- `j1-humility-intro.tsx` — J.1 (HUMILITY INTRO, hero+3 lines step-revealed)
- `k1-challenge-handoff.tsx` — K.1 (CHALLENGE HANDOFF, hero+headline+body+PulseGlow tagline)

**Phase 5 (card-grid slides, 3 tasks + 1 fix commit):**
- `j2-five-principles.tsx` — J.2 (5 RecipeStepCards horizontal, single-Space stagger reveal)
- `j3-recipe-buildup.tsx` — J.3 (3 RecipeStepCards vertical, 2 down StepConnectors, Space-by-Space build)
- `j4-recipe-ship.tsx` — J.4 (3 horizontal RecipeStepCards + 2 forward StepConnectors + 2 loop-back StepConnectors with `ambient="backward"`)
- `fix(reveal): StepConnector scales responsively via SVG viewBox` (commit `60fdda4`) — primitive-level fix flagged by quality review of J.4: SVG previously used literal pixel `width`/`height`, causing loop-back arrows (width=500 / 1000) to overflow their percentage-constrained parents on sub-1500px projector resolutions. Now uses `viewBox` + `width="100%"`, with outer div retaining pixel sizing as default + `maxWidth: "100%"` clamp. Path math unchanged.

**Phase 6 (diagrammatic slides, 5 tasks):**
- `components/HorizontalFlow.tsx` — primitive (6 stage tiles + 5 chevron connectors with optional ambient pulse)
- `i1-meta-process.tsx` — I.1 (META + PROCESS, headline + sub-line + copper rule + 6-stage HorizontalFlow + tagline). **NOTE:** `i1Content.headlineParts` was rewritten in Task 4.1 to remove "I built this. Solo." (per audience-framing memory rule); plan's verbatim test was adjusted to assert `/facilitated with AI/` instead of `/I built this/`. Component code unchanged.
- `components/Timeline.tsx` — primitive (horizontal axis + N anchor points + optional mid-segment label + ambient pulse, with optional HoverReveal per anchor)
- `i2-profile-journey.tsx` — I.2 (HeroPhoto + 4 profile lines + Timeline with hover anchors + inline HoverReveal on "Computer Vision")
- `i4-key-message-bridge.tsx` — I.4 (HeroPhoto + DisplayPhrase word-by-word + copper rule + 2 italic beats + inline PulseGlow on "you")

## Reusable conventions established (carry forward verbatim)

- **Color tokens:** `text-copper-{300|400}`, `text-neutral-{50|100|300}`, `border-copper-{500|700}`, `bg-neutral-{900|950}`. SVG strokes use literal hex `#7a4626` (copper-700) and `#d99e6c` (copper-300) because Tailwind classes can't apply to `stroke=`.
- **Typography:** `font-display` headlines, `font-serif italic` body, `font-mono` accents, `font-sans` chrome — all sized with `clamp(min, vw, max)` for projection scale
- **Animation:** framer-motion declarative `animate`/`transition` props; default 200–250ms reveals (some 300–400ms for slower beats), 4–5s loops; easeOut or cubic-bezier `[0.16, 1, 0.3, 1]`
- **Step-reveal pattern:** consumer slide reads `useDeck().stepIndex` and derives boolean reveal flags (e.g., `revealed = stepIndex >= 1`); primitives are owner-controlled (no DeckContext access). Most slides use opacity/y gating; I.4 uniquely uses conditional-render gating because `<DisplayPhrase>` has internal timing logic that shouldn't run pre-step.
- **Dot-grid background pattern (4 instances so far — see Open advisories):** `aria-hidden` div with `radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)`, `backgroundSize: "24px 24px"`, `opacity-[0.05]`
- **Tests:** behavioral (DOM + data-attr assertions), co-located in `tests/unit/` matching component path, no snapshots, no visual regression
- **Each animated primitive** carries `data-testid` + a behavior-marking data-attr (`data-revealed`, `data-period`, `data-direction`, `data-ambient`, `data-cards-revealed`)
- **Slide registration:** `src/slides/reveal-and-closing/index.ts` exports `revealAndClosingSlides: SlideDef[]`. Order matches spec §1: I → J → K. The deck registry composes `[...revealAndClosingSlides, hexLadderDevSlide]`.

## Open advisories from cumulative + per-task reviews (forward-pointing, NOT blockers)

These were noted across 12 task reviews and 1 cumulative review. Address opportunistically; none block Phase 7.

1. **Dot-grid extraction past rule-of-three (4 instances).** J.2, J.3, J.4, I.1 each inline the same `<div aria-hidden ... radial-gradient ...>` markup. The reviewer recommended extracting `<DotGridSurface>` "before Task 6.5" but we deferred because I.4 uses HeroPhoto (so the count stayed at 4). Phase 7's I.3 portfolio slide may add a 5th instance — when scoping Task 7.9, decide whether to extract first. The extraction is small: ~15-line component + ~5-line test + 4 site retrofits.

2. **`captionKeywords` inline literals (3 instances).** J.2's `highlight(C.caption, ["Hover any card"])`, J.3 and J.4's `highlight(C.caption, ["Hover any step"])` hardcode the keyword tuple in component code instead of `content.ts`. Each is a substring of `C.caption`, so single-source-of-truth holds, but a copy edit on `caption` won't auto-update the keyword. Migrate to `j2Content.captionKeywords` etc. when convenient (or defer — it's a 3-instance pattern, low pain).

3. **`i4Content.firstBeat[i].keyword` lacks `as const`** — currently infers `boolean` instead of literal `true`. Doesn't bite I.4 (uses truthiness `w.keyword ? ... : ...`) but would block any future code that wants discriminant narrowing on `{ keyword: true }`. One-line fix per element if/when needed.

4. **`StepConnector` aspect-ratio**: the responsive fix uses default `preserveAspectRatio="xMidYMid meet"`. On parents whose CSS aspect ratio differs from the SVG viewBox (notably J.4's loop-back at 7.25:1 vs viewBox 7.81:1), there's ~6% letterboxing — visually negligible but worth knowing if you tune projector layouts.

5. **Audience-framing memory rule was strengthened** (`feedback_audience_framing.md`) with concrete trigger phrases ("I built this", "Solo", "I made") after the Task 4.1 rewrite. Future content edits should grep for these.

6. **`TimelineAnchor` interface doesn't include `captionKeywords`** but `i2-profile-journey.tsx:50` reads `a.captionKeywords` via duck-typing. TypeScript doesn't catch typos because `i2Content.timeline.anchors` lacks an explicit type annotation. Before Phase 7 adds more timeline anchors (or if I.2 gets edited), consider: (a) add `captionKeywords?: readonly string[]` to `TimelineAnchor` in `Timeline.tsx`, or (b) resolve `highlight()` inside `content.ts` itself.

7. **StepConnector strokes use `#b86e3d` (copper-500); HorizontalFlow + Timeline use `#7a4626` (copper-700).** This produces a visible weight difference between J.4's forward arrows and J.3's down arrows, and between J.4's connectors and I.1/I.2's primitives. Could be intentional (lighter = forward motion) or accidental drift — undocumented either way. Decide before any future visual review; if unintentional, change `StepConnector.tsx` stroke to `#7a4626`.

8. **J.4's `StepConnector width={500}` and `width={1000}` are undocumented magic numbers.** They're SVG viewBox coordinates (so responsive after the StepConnector fix), but a future dev tweaking I.3-related layout could break the loop-back arcs. Consider naming them (`LOOPBACK_SHORT_SPAN = 500`, `LOOPBACK_LONG_SPAN = 1000`) inside `j4-recipe-ship.tsx`.

9. **`i3Content` is declared but unregistered.** Phase 7's I.3 portfolio task will need a matching interface for the discriminated union (`kind: "header" | "subheader" | "item"`). Define it when scoping Task 7.9 — likely lives in either `Timeline.tsx`'s neighbor file or a new `CategoryList.tsx` from Task 7.1.

## Newly discovered DeckContext API (use in Phase 7+8 testing)

`useDeck()` returns `{ stepIndex, slideIndex, goTo(slideIdx, stepIdx?), ... }`. The `goTo` method is a public, typed API (`DeckContext.tsx:16`). Use it in tests that need to advance the deck before asserting (Task 6.5's I.4 test established the `AdvanceTo` helper pattern: an inline `<button onClick={() => goTo(0, N)}>` clicked inside `act()`). Phase 7's I.3 portfolio (interactive list+canvas) and Phase 8's keyboard-nav e2e will both need this.

## Remaining tasks (13)

**Phase 7 — I.3 PORTFOLIO (9 tasks, plan lines 3406–4889):**
- 7.1 `<CategoryList>` primitive (split-screen left rail with categories + items)
- 7.2 `<HarnessCanvas>` shell + `<DefaultHarness>` (right-side simulation container with default state)
- 7.3 `<LightPanel>` primitive (small-card panel for "light" portfolio items)
- 7.4 Simulation — `stocks intel` (linear funnel SVG)
- 7.5 Simulation — `legal docs` (branching with feedback loops)
- 7.6 Simulation — `exchange alerts` (efficiency funnel)
- 7.7 Simulation — `nanovest-product` (orchestration tree)
- 7.8 Simulation — `NotebookLM` (hub-and-spoke)
- 7.9 Slide I.3 — PORTFOLIO assembly (combines CategoryList + HarnessCanvas + 5 simulations + 7 LightPanels + "see it real" speaker toggle)

**Phase 8 — Wire-up + verification (4 tasks, plan lines 4892–5087):**
- 8.1 e2e keyboard nav across all 9 slides (restore comprehensive coverage)
- 8.2 PDF + PPTX export of the full arc (verify exports work end-to-end)
- 8.3 Acceptance audit against spec §10
- 8.4 Final type-check + full test sweep

After all 13 tasks complete, dispatch a final cumulative reviewer (Phases 7–8), then `superpowers:finishing-a-development-branch`.

## How to continue

1. **Verify state:** `git log --oneline 69755ad..HEAD` should show 14 commits ending `bfa4ab2`. `npm test` should be **86/86** green. `npx tsc --noEmit` clean.

2. **Optional pre-Phase-7 cleanup** (skip unless you want it now):
   - Extract `<DotGridSurface>` and refactor J.2/J.3/J.4/I.1 (advisory #1)
   - Move caption keywords to `content.ts` (advisory #2)

3. **Resume SDD with Task 7.1.** Each task: dispatch implementer subagent with verbatim plan task text + scene-setting context, wait for DONE, then dispatch a **combined spec+quality reviewer** (the consolidated pattern proven across Tasks 6.3–6.5; cuts review latency in half for primitives and small slides). Sequential implementers (no parallel implementer dispatches — file conflicts). For Task 7.9 (the largest single task in the plan), use the two-stage spec-then-quality pattern instead of combined.

4. **Use TaskCreate / TaskUpdate to track progress** through tasks 24–36.

5. **Phase 7 specific:** Task 7.1–7.8 are independent enough that you could batch their dispatches sequentially with confidence. Task 7.9 is the integration point — leave it for last and budget extra context for it (it's ~340 plan lines, much larger than any prior slide task).

6. **Phase 8 specific:** Task 8.1's e2e keyboard nav was simplified in Phase 0 (`tests/e2e/keyboard-nav.spec.ts:3` — "no-throw assertions"). 8.1 restores comprehensive coverage. 8.2 verifies the PDF/PPTX exports work for all 9 slides — these were exercised on the smoke deck pre-Phase 0 and should still work with the runtime slide-count queries from the pre-Phase-3 fix.

## Phase 3–6 commit log (reference)

```
bfa4ab2 feat(reveal): I.4 key message → bridge slide with PulseGlow on you
9032191 feat(reveal): I.2 profile + journey slide with hover-anchor Timeline
8f8d9a9 feat(reveal): add Timeline primitive (used on I.2)
27262bb feat(reveal): I.1 meta + process slide with 6-stage horizontal flow
0ebf405 feat(reveal): add HorizontalFlow primitive (I.1 process diagram)
60fdda4 fix(reveal): StepConnector scales responsively via SVG viewBox
31c5a50 feat(reveal): J.4 recipe ship horizontal flow with backward loop-back ambient
60f0f7c feat(reveal): J.3 recipe buildup vertical stack
7811471 feat(reveal): J.2 five mindset principles slide
0f55f29 feat(reveal): K.1 challenge handoff slide with foreground PulseGlow ambient
e0b1816 feat(reveal): J.1 humility intro slide + shared highlight helper
3468246 feat(reveal): add frozen content module for all 9 slides
f8c58e3 feat(reveal): add hero photography assets + image-gen runbook
f083bb9 test(e2e): query runtime slide count in pptx-export and viewport-fit specs
```

**Plan file:** `/Users/macbook/Projects/_web_presentation/berau-presentation/docs/plans/2026-05-07-reveal-and-closing-slides.md`
