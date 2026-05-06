# Berau Coal Energy AI Workshop — Deck

React + Tailwind + Framer Motion presentation deck for the BCE Vol-2 Session-2 workshop. See `docs/specs/2026-05-06-process-and-design-meta.md` for the design substrate decisions; see `docs/plans/2026-05-06-design-system-implementation.md` for the build plan that produced this scaffolding.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
```

Navigation:
- `→` next slide
- `←` previous slide
- `Space` next animation step within the current slide

## Test

```bash
npm test             # vitest unit + integration
npm run e2e          # playwright e2e (viewport, keyboard, exports)
```

## Export

```bash
npm run export:pdf   # exports/smoke-deck.pdf  (multipage, canonical-pose-paused)
npm run export:pptx  # exports/smoke-deck.pptx (screenshot-stitched, static)
```

## Calibrate the palette against a projector

```bash
npm run projection-test
```

Opens the HexLadder slide. See `docs/runbooks/projection-test.md` for the full procedure.

## Layout

- `src/design-system/` — Color, typography, spacing, shadow tokens. The single source of truth for both Tailwind theme and CSS variables.
- `src/deck/` — Deck shell: state, keyboard nav, slide wrapper, slide registry.
- `src/motion/` — Framer-Motion-backed primitives: StepReveal, LoopingAmbient, Interactive, Static.
- `src/primitives/` — Layout primitives: Hero, SectionDivider, ContentSlide, QuoteSlide, HexLadder.
- `scripts/` — Export and calibration scripts.
- `tests/unit/` — Vitest + Testing Library.
- `tests/e2e/` — Playwright (3 projection viewports).
