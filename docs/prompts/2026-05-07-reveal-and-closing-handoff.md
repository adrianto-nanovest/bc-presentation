# Handoff Prompt — Reveal+Closing Slides Plan (Phase 3 onwards)

Continuing execution of `docs/plans/2026-05-07-reveal-and-closing-slides.md`

## State at handoff

- Branch: `main`, HEAD: `bcdf39b` (post-Task 2.2 StepConnector)
- Phases 0, 1, 2 are COMPLETE (11 commits, 11/36 tasks)
- All tasks were verified via implementer + spec review + code-quality review per the SDD workflow; final cumulative review APPROVED with one pre-Phase-3 fix recommended (see below).
- Working tree has untracked user files (`docs/brainstorms`, `docs/researches`, `docs/specs`, `docs/plans`, `assets/`, modified `docs/references/reference-context.md`) — DO NOT stage or commit these. Use targeted `git add <specific files>` always; never `git add -A` or `git add .`.

## What is built

**Phase 0 (registry refactor):**
- `src/deck/types.ts` — `SlideDef` interface (`steps`, `animationMode`, `canonicalPose`, `surface?`, `render: () => JSX.Element`)
- `src/deck/registry.tsx` — composes `[...revealAndClosingSlides, hexLadderDevSlide]`. HexLadder is always last (projection-test resolves it as `slideCount-1`)
- `src/slides/reveal-and-closing/index.ts` — empty `revealAndClosingSlides: SlideDef[] = []` placeholder
- Smoke-deck files deleted; `tests/e2e/pdf-export.spec.ts` + `scripts/projection-test.mjs` migrated to query `window.__DECK_SLIDE_COUNT__` at runtime
- `tests/e2e/keyboard-nav.spec.ts` simplified to no-throw assertions; comprehensive tests restored in Task 8.1

**Phase 1 primitives** (each in `src/slides/reveal-and-closing/components/`, tests in `tests/unit/`):
- `FigLabel` — top-left "— FIG. <S>.<N> · <LABEL>" small-caps copper-400
- `KeywordHighlight` — `<em>` copper-400 italic. Note: contains a marker class `not-italic-fallback` that is intentionally non-existent (grep marker per plan)
- `HeroPhoto` — img + vignette overlay (radial bottom-left | linear bottom 180° | linear right 270°). Uses explicit `role="img"` to keep `getByRole("img")` working when `alt=""`
- `PulseGlow` — framer-motion looping ambient with `intensity` (`"subtle"|"strong"`) and `periodSeconds` (default 5)
- `HoverReveal` — useState-driven hover-fade with `position` (`"below"|"above"|"right"`); `data-revealed` flips on mouseEnter/mouseLeave; `pointer-events-none` on payload
- `DisplayPhrase` — word/phrase staggered reveal; `WordSpec` union (`string | { text, durationMs?, pauseAfterMs? }`); cumulative delay tracking; ease `[0.16, 1, 0.3, 1]`

**Phase 2 card-family primitives:**
- `RecipeStepCard` — number badge (zero-padded mono copper-400), Instrument Serif headline, copper rule, italic sub-text, optional `hoverExample` wrapped in HoverReveal. `orientation` prop (`"vertical"|"horizontal"`, default `"vertical"`)
- `StepConnector` — animated SVG arrow, `direction` `"down"|"forward"|"loopBack"`, optional `ambient="backward"` (J.4 traveling pulse via `strokeDashoffset`). Uses literal copper hex (`#b86e3d`, `#d99e6c`) because SVG markers can't take Tailwind classes — these match `design-system/colors.ts` copper-500/300

## Reusable conventions established (carry forward verbatim)

- **Color tokens:** `text-copper-{300|400}`, `text-neutral-{50|100|300}`, `border-copper-{500|700}`, `bg-neutral-{900|950}`
- **Typography:** `font-display` for headlines, `font-serif italic` for body, `font-mono` for accents, `font-sans` for chrome — all sized with `clamp(min, vw, max)` for projection scale
- **Animation:** framer-motion declarative `animate`/`transition` props; default 200–250 ms reveals, 4–5s loops; easeOut or cubic-bezier `[0.16, 1, 0.3, 1]`
- **Tests:** behavioral (DOM + data-attr assertions), co-located in `tests/unit/` matching component path, no snapshots, no visual regression
- **Each animated primitive** carries `data-testid` + a behavior-marking data-attr (`data-revealed`, `data-period`, `data-direction`, `data-ambient`, `data-duration-ms`)

## Remaining tasks (25)

**Phase 3 (1 task):**
- 3.1 Hero photos + image-gen runbook + vite.config publicDir update — REQUIRES `gemini-image-gen` MCP if registered (`claude mcp list | grep gemini`), else manual Unsplash fallback per `docs/runbooks/image-gen-prompts.md` template. Likely a USER-IN-LOOP task.

**Phase 4 (3 tasks):**
- 4.1 `content.ts` (frozen copy module)
- 4.2 J.1 humility intro slide + shared `highlight()` helper
- 4.3 K.1 challenge handoff slide

**Phase 5 (3 tasks):** J.2 / J.3 / J.4 card-grid slides

**Phase 6 (5 tasks):** HorizontalFlow primitive, I.1 slide, Timeline primitive, I.2 slide, I.4 slide

**Phase 7 (9 tasks):** CategoryList, HarnessCanvas+DefaultHarness, LightPanel, 5 simulations (StocksIntel, LegalDocs, ExchangeAlerts, NanovestProduct, NotebookLM), I.3 portfolio assembly

**Phase 8 (4 tasks):** e2e keyboard nav, PDF/PPTX export verification, acceptance audit, final type-check + test sweep

## Pre-Phase-3 fix recommended (5-minute task — do this first)

`tests/e2e/pptx-export.spec.ts:23` and `tests/e2e/viewport-fit.spec.ts:3` still hardcode `7` slides. Migrate both to query `__DECK_SLIDE_COUNT__` at runtime, mirroring `tests/e2e/pdf-export.spec.ts:14-19`. Plan §0.3 missed these. They will fail `npm run e2e` once Phases 4–7 land real slides.

## Known plan gaps already reconciled (do NOT re-flag in reviews)

- KeywordHighlight test regex includes `/italic|not-italic/` because the `<em>` marker class is grep-bait per plan
- HeroPhoto test regex `/linear-gradient|radial-gradient/` — bottom-left uses radial-gradient (vignette), other directions linear; the plan's original `/linear-gradient/` regex was a plan-internal inconsistency
- HeroPhoto `<img role="img">` explicit because `alt=""` implies `role=presentation`, breaking `getByRole("img")`
- StepConnector `data-ambient` defaults to empty string `""`

## How to continue

1. Verify state: `git log --oneline 6c3bccef..HEAD` should show 11 commits ending `bcdf39b`. `npm test` should be 60/60 green.
2. Apply the pre-Phase-3 e2e fix (above).
3. Resume SDD with Task 3.1. Note that 3.1 likely requires user collaboration for image generation.
4. Use TaskCreate / TaskUpdate to track progress through tasks 12–36.
5. Each task: dispatch implementer subagent with verbatim plan task text + scene-setting context, wait for DONE, then dispatch a **combined spec+quality reviewer** (efficient pattern proven in Phase 1–2). Sequential implementers (no parallel implementer dispatches — file conflicts).
6. After all 36 tasks complete, dispatch a final cumulative reviewer covering Phases 3–8, then use `superpowers:finishing-a-development-branch`.

**Plan file:** `/Users/macbook/Projects/_web_presentation/berau-presentation/docs/plans/2026-05-07-reveal-and-closing-slides.md`
**Working dir:** `/Users/macbook/Projects/_web_presentation/berau-presentation`

## Phase 0–2 commit log (reference)

```
bcdf39b feat(reveal): add StepConnector primitive (down/forward/loopBack arrows)
1a4217d feat(reveal): add RecipeStepCard primitive (used on J.2/J.3/J.4)
0d0f5ac feat(reveal): add DisplayPhrase word/phrase staggered reveal primitive
fdfa97f feat(reveal): add HoverReveal speaker-detail-layer primitive
918e34d feat(reveal): add PulseGlow per-element ambient primitive
f0cbfd3 feat(reveal): add HeroPhoto primitive with vignette mask
43200e0 feat(reveal): add KeywordHighlight primitive (copper-italic accent)
ac1335f feat(reveal): add FigLabel primitive
b271efe refactor(deck): retire smoke-deck; e2e + projection-test query runtime slide count
210bdc6 refactor(deck): replace smoke-deck import with composed registry
83242e0 refactor(deck): promote SmokeSlide to shared SlideDef interface
```
