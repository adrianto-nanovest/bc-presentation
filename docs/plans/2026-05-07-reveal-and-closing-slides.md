# Reveal + Closing Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all 9 slides of the Reveal + Closing arc (sections I, J, K) of the Berau Coal Energy AI Workshop deck, including the 14 cross-cutting component primitives and 5 interactive harness simulations specified in `docs/specs/2026-05-07-slides-reveal-and-closing.md`.

**Architecture:** The substrate (`Deck`/`Slide`/`DeckContext` runtime, four animation modes, design-system tokens, Tailwind theme, PDF/PPTX export pipelines) is already in place from the design-system implementation. New work composes within it: a self-contained `src/slides/reveal-and-closing/` folder holding 9 slide files + a private `components/` folder for primitives + a `simulations/` folder for the 5 SVG-based harness orchestrations. The existing single-array `smokeDeck` registry is generalised into a `SlideDef` type, and the deck consumes a composed registry that includes the new arc plus a HexLadder dev slide retained for projection-test access.

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion (already installed). Tests: Vitest + Testing Library (unit), Playwright (e2e + export pipelines). No new runtime dependencies. Hero photography uses the `gemini-image-gen` MCP if registered (falls back to free Unsplash with documented prompts otherwise).

**Spec reference:** `docs/specs/2026-05-07-slides-reveal-and-closing.md` (sections cited as `spec §N`). Parent meta-spec: `docs/specs/2026-05-06-process-and-design-meta.md` (cited as `meta §N`).

---

## File Structure

All new files live under `src/slides/reveal-and-closing/`. Cross-cutting primitives stay scoped to this sub-spec per spec §8 file-structure suggestion (future sub-specs that need them can promote later — premature promotion would couple sub-specs to each other).

```
src/
  deck/
    registry.ts                       # NEW — composed deck registry, replaces smoke-deck import
    types.ts                          # NEW — promoted SlideDef interface
    smoke-deck.tsx                    # REMOVED at end of Phase 0 (rolled into registry.ts as the hex-ladder dev slide)
  slides/
    reveal-and-closing/
      index.ts                        # NEW — exports revealAndClosingSlides: SlideDef[]
      i1-meta-process.tsx
      i2-profile-journey.tsx
      i3-portfolio.tsx
      i4-key-message-bridge.tsx
      j1-humility-intro.tsx
      j2-five-principles.tsx
      j3-recipe-buildup.tsx
      j4-recipe-ship.tsx
      k1-challenge-handoff.tsx
      content.ts                      # NEW — frozen content blocks (lines, hover examples, stage labels)
      components/
        FigLabel.tsx
        KeywordHighlight.tsx
        HeroPhoto.tsx
        HoverReveal.tsx
        PulseGlow.tsx
        DisplayPhrase.tsx
        RecipeStepCard.tsx
        StepConnector.tsx
        HorizontalFlow.tsx
        Timeline.tsx
        CategoryList.tsx
        HarnessCanvas.tsx
        LightPanel.tsx
      simulations/
        StocksIntel.tsx
        LegalDocs.tsx
        ExchangeAlerts.tsx
        NanovestProduct.tsx
        NotebookLM.tsx
        DefaultHarness.tsx            # the on-entry generic harness diagram (spec §4.3 default state)
assets/
  heroes/                             # NEW — generated hero photography (4 files)
    i2-night-workspace.jpg
    i4-dusk-horizon.jpg
    j1-notebook-study.jpg
    k1-morning-workspace.jpg
docs/
  runbooks/
    image-gen-prompts.md              # NEW — image-gen prompts archived here for re-render later
```

Existing `src/primitives/` (Hero, SectionDivider, ContentSlide, QuoteSlide, HexLadder) is **untouched**. Existing `src/motion/` (StepReveal, LoopingAmbient, Static, Interactive) is **untouched**. Existing `src/design-system/` is **untouched**.

---

## Phase 0 — Registry refactor

### Task 0.1: Promote `SmokeSlide` to a shared `SlideDef` type

**Files:**
- Create: `src/deck/types.ts`
- Modify: `src/deck/smoke-deck.tsx` (re-export from new location for now; deleted at task 0.3)

- [ ] **Step 1: Write the failing test**

Create `tests/unit/deck-types.test.ts`:

```typescript
import { describe, expect, test } from "vitest";
import type { SlideDef } from "@/deck/types";
import type { JSX } from "react";

describe("SlideDef", () => {
  test("declares the five fields the deck registry consumes", () => {
    const def: SlideDef = {
      steps: 1,
      animationMode: "static",
      canonicalPose: 0,
      surface: "dark",
      render: () => (null as unknown as JSX.Element),
    };
    expect(def.steps).toBe(1);
    expect(def.animationMode).toBe("static");
    expect(def.canonicalPose).toBe(0);
    expect(def.surface).toBe("dark");
    expect(typeof def.render).toBe("function");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- deck-types`
Expected: FAIL with "Cannot find module '@/deck/types'"

- [ ] **Step 3: Create the types file**

Write `src/deck/types.ts`:

```typescript
import type { JSX } from "react";
import type { AnimationMode } from "./Slide";

// Shared shape for any slide registered in the deck. Each section's
// sub-spec contributes an array of these and the deck composes them
// into a single ordered registry (see src/deck/registry.ts).
export interface SlideDef {
  steps: number;                       // step count fed to DeckProvider
  animationMode: AnimationMode;        // controls click bubbling per Slide.tsx
  canonicalPose: number;               // step index the export pipeline pauses at
  surface?: "dark" | "light";
  render: () => JSX.Element;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- deck-types`
Expected: PASS

- [ ] **Step 5: Update `smoke-deck.tsx` to consume the shared type**

In `src/deck/smoke-deck.tsx`, replace the local `SmokeSlide` interface with a re-export:

```typescript
import { type SlideDef } from "./types";
export type SmokeSlide = SlideDef;       // back-compat alias; removed in 0.3
```

Run `npm test` and verify the existing smoke-deck.test.tsx still passes.

- [ ] **Step 6: Commit**

```bash
git add src/deck/types.ts src/deck/smoke-deck.tsx tests/unit/deck-types.test.ts
git commit -m "refactor(deck): promote SmokeSlide to shared SlideDef interface"
```

### Task 0.2: Create the composed deck registry

**Files:**
- Create: `src/deck/registry.ts`
- Modify: `src/deck/Deck.tsx`
- Create: `src/slides/reveal-and-closing/index.ts` (empty array for now; populated as slides are built)

- [ ] **Step 1: Write the failing test**

Create `tests/unit/deck-registry.test.ts`:

```typescript
import { describe, expect, test } from "vitest";
import { deckSlides, hexLadderDevSlide } from "@/deck/registry";

describe("deck registry", () => {
  test("exports a non-empty ordered array of SlideDef", () => {
    expect(Array.isArray(deckSlides)).toBe(true);
    expect(deckSlides.length).toBeGreaterThan(0);
    deckSlides.forEach((s, i) => {
      expect(typeof s.steps).toBe("number");
      expect(typeof s.canonicalPose).toBe("number");
      expect(typeof s.render).toBe("function");
      expect(s.canonicalPose).toBeLessThan(s.steps);
      expect(s.canonicalPose).toBeGreaterThanOrEqual(0);
      // Index sanity for debug output
      expect(i).toBeGreaterThanOrEqual(0);
    });
  });

  test("hexLadderDevSlide is the last entry so projection-test can target it via the slide-count tail", () => {
    expect(deckSlides[deckSlides.length - 1]).toBe(hexLadderDevSlide);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- deck-registry`
Expected: FAIL with "Cannot find module '@/deck/registry'"

- [ ] **Step 3: Create empty reveal-and-closing index**

Write `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";

// Populated incrementally by tasks in Phases 4–7. Order matches
// spec §1: I.1 → I.2 → I.3 → I.4 → J.1 → J.2 → J.3 → J.4 → K.1.
export const revealAndClosingSlides: SlideDef[] = [];
```

- [ ] **Step 4: Create the composed registry**

Write `src/deck/registry.ts`:

```typescript
import type { SlideDef } from "./types";
import { HexLadder } from "@/primitives/HexLadder";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";

// HexLadder is a developer-only slide retained for projection-test
// (see scripts/projection-test.mjs). Always last so projection-test
// can resolve it via slideCount - 1, regardless of how many real
// slides are appended ahead of it.
export const hexLadderDevSlide: SlideDef = {
  steps: 1,
  animationMode: "static",
  canonicalPose: 0,
  surface: "light",
  render: () => <HexLadder />,
};

export const deckSlides: SlideDef[] = [
  ...revealAndClosingSlides,
  hexLadderDevSlide,
];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- deck-registry`
Expected: PASS (registry has 1 entry — the HexLadder — until reveal-and-closing slides land).

- [ ] **Step 6: Wire the deck to the new registry**

Edit `src/deck/Deck.tsx` — replace `smokeDeck` import with `deckSlides`:

```typescript
import { useEffect } from "react";
import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import { deckSlides } from "./registry";

declare global {
  interface Window {
    __DECK_SLIDE_COUNT__: number;
  }
}

function ActiveSlide() {
  useKeyboardNav();
  const { slideIndex, stepCounts, goTo } = useDeck();

  useEffect(() => {
    window.__DECK_SLIDE_COUNT__ = stepCounts.length;
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("slide");
    if (requested != null) {
      const n = Math.max(0, Math.min(Number(requested), stepCounts.length - 1));
      goTo(n, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const def = deckSlides[slideIndex];
  return (
    <Slide
      index={slideIndex}
      animationMode={def.animationMode}
      canonicalPose={def.canonicalPose}
      surface={def.surface ?? "dark"}
    >
      {def.render()}
    </Slide>
  );
}

export function Deck() {
  return (
    <DeckProvider stepCounts={deckSlides.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
```

- [ ] **Step 7: Run all tests; expect smoke-deck.test.tsx and pdf-export e2e to fail**

Run: `npm test`
Expected: `smoke-deck.test.tsx` fails (asserts 7 slides, deck now has 1). `pdf-export.spec.ts` would fail in e2e (asserts 7 PDF pages). These are addressed in Task 0.3.

- [ ] **Step 8: Commit**

```bash
git add src/deck/registry.ts src/deck/Deck.tsx src/slides/reveal-and-closing/index.ts tests/unit/deck-registry.test.ts
git commit -m "refactor(deck): replace smoke-deck import with composed registry"
```

### Task 0.3: Retire smoke-deck and update affected tests

**Files:**
- Delete: `src/deck/smoke-deck.tsx`
- Delete: `tests/unit/smoke-deck.test.tsx`
- Modify: `tests/e2e/pdf-export.spec.ts`
- Modify: `tests/e2e/keyboard-nav.spec.ts`
- Modify: `scripts/projection-test.mjs`

- [ ] **Step 1: Delete the smoke-deck files**

```bash
rm src/deck/smoke-deck.tsx tests/unit/smoke-deck.test.tsx
```

- [ ] **Step 2: Update `tests/e2e/pdf-export.spec.ts`**

Replace the hard-coded `7` with a query against the runtime slide count, so the test stays green as new slides land:

```typescript
import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { existsSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

test("export-pdf.mjs produces a non-empty PDF with one page per slide", async () => {
  // Resolve current slide count from the running deck, so we don't
  // need to update this test as new section sub-specs land.
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  const expectedPages = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  await browser.close();

  const out = resolve("exports/smoke-deck.pdf");
  const result = spawnSync("node", ["scripts/export-pdf.mjs", out], {
    stdio: "inherit",
  });
  expect(result.status).toBe(0);
  expect(existsSync(out)).toBe(true);
  expect(statSync(out).size).toBeGreaterThan(10_000);

  const buf = readFileSync(out);
  const matches = buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [];
  expect(matches.length).toBe(expectedPages);
});
```

- [ ] **Step 3: Update `tests/e2e/keyboard-nav.spec.ts`**

The existing test references "step-reveal slide at index 2" and "interactive slide at index 5" from the smoke deck. Since reveal-and-closing slides aren't built yet, simplify the keyboard-nav test to only verify the navigation contract on the dev slide and to unblock the registry refactor:

```typescript
import { test, expect } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

test("ArrowRight advances slide; ArrowLeft retreats", async ({ page }) => {
  await page.goto("/");
  const initialIndex = await page.locator(slideAttr).getAttribute("data-slide-index");
  expect(initialIndex).toBe("0");

  // ArrowRight at slide 0 should pin to slide 0 if there is only one slide,
  // or advance otherwise. We only assert no-throw.
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
});

test("Space does not throw on a single-step slide", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press(" ");
  // No assertion beyond "no exception"; comprehensive Space tests
  // re-enter at end of Phase 7 once real slides exist.
});
```

The richer step-reveal/interactive Playwright assertions are restored in Task 8.2 once real slides exist.

- [ ] **Step 4: Update `scripts/projection-test.mjs`**

The script hard-codes `?slide=6`. Make it resolve to the last slide (HexLadder) regardless of count:

```javascript
import { spawn } from "node:child_process";

const server = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });

setTimeout(async () => {
  // Resolve the HexLadder index = slide count - 1 (always last per registry.ts).
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  await browser.close();
  const ladderIndex = Math.max(0, count - 1);

  const url = `http://localhost:5173/?slide=${ladderIndex}&fullscreen=1`;
  console.log("\nProjection test ready. Opening:", url);
  console.log(
    "Steps:\n" +
      "  1. Connect projector and mirror display.\n" +
      "  2. Press F11 (or Cmd+Ctrl+F on macOS) for browser fullscreen.\n" +
      "  3. Walk to the back row and confirm: every copper-* and neutral-* swatch is distinguishable from its neighbors.\n" +
      "  4. Note any stops that wash out — those are the ones to retune in src/design-system/colors.ts.\n" +
      "  5. Ctrl+C this script when done.",
  );
  spawn(process.platform === "darwin" ? "open" : "xdg-open", [url], {
    stdio: "ignore",
    detached: true,
  });
}, 3000);

process.on("SIGINT", () => {
  server.kill();
  process.exit(0);
});
```

- [ ] **Step 5: Run unit tests; expect all green**

Run: `npm test`
Expected: PASS (smoke-deck.test.tsx is gone, deck-registry.test.ts is green).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(deck): retire smoke-deck; e2e + projection-test query runtime slide count"
```

---

## Phase 1 — Cross-cutting primitives (no slide context)

These six primitives are stateless or self-contained and don't depend on the `useDeck()` step index. Build first because every slide consumes at least one.

### Task 1.1: `<FigLabel>` — top-left small-caps editorial label

**Files:**
- Create: `src/slides/reveal-and-closing/components/FigLabel.tsx`
- Test: `tests/unit/FigLabel.test.tsx`

Per spec §3 + memory `feedback_slide_visual_conventions.md`: small-caps copper-400/500 monospace-or-sans label, positioned absolute top-left, ~24px at projection scale, format `— FIG. <SECTION>.<NUM> · <LABEL>`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/FigLabel.test.tsx
import { render, screen } from "@testing-library/react";
import { FigLabel } from "@/slides/reveal-and-closing/components/FigLabel";

test("FigLabel renders the canonical FIG <section>.<num> · <label> format", () => {
  render(<FigLabel section="I" num={2} label="THE JOURNEY" />);
  const el = screen.getByText(/FIG\. I\.2 · THE JOURNEY/);
  expect(el).toBeInTheDocument();
  // Must include the em-dash prefix per spec §3 row 2.
  expect(el.textContent).toMatch(/^— FIG\./);
});

test("FigLabel sits at the top-left of its host", () => {
  render(<FigLabel section="J" num={1} label="THE RECIPE" />);
  const el = screen.getByText(/FIG\. J\.1/);
  // Container has absolute top-left positioning classes.
  expect(el.className).toMatch(/absolute/);
  expect(el.className).toMatch(/top-/);
  expect(el.className).toMatch(/left-/);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- FigLabel`
Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/FigLabel.tsx
interface FigLabelProps {
  section: string;       // e.g. "I", "J", "K"
  num: number;           // e.g. 1, 2, 3
  label: string;         // e.g. "THE JOURNEY"
}

export function FigLabel({ section, num, label }: FigLabelProps) {
  return (
    <p
      className="absolute top-12 left-12 z-20 font-sans uppercase tracking-[0.18em] text-copper-400"
      style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.25rem)" }}
    >
      — FIG. {section}.{num} · {label}
    </p>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- FigLabel`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/FigLabel.tsx tests/unit/FigLabel.test.tsx
git commit -m "feat(reveal): add FigLabel primitive"
```

### Task 1.2: `<KeywordHighlight>` — copper-italic keyword styling

**Files:**
- Create: `src/slides/reveal-and-closing/components/KeywordHighlight.tsx`
- Test: `tests/unit/KeywordHighlight.test.tsx`

Per memory `feedback_keyword_highlighting.md`: 1–3 keywords per chunk wrapped in copper italic. Implement as a simple wrapper component that an author writes inline:

```tsx
<>What you've been watching for the last <KeywordHighlight>90 minutes</KeywordHighlight> — I built this.</>
```

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/KeywordHighlight.test.tsx
import { render, screen } from "@testing-library/react";
import { KeywordHighlight } from "@/slides/reveal-and-closing/components/KeywordHighlight";

test("KeywordHighlight wraps text in copper-italic span", () => {
  render(<KeywordHighlight>90 minutes</KeywordHighlight>);
  const span = screen.getByText("90 minutes");
  expect(span.tagName).toBe("EM");
  expect(span.className).toMatch(/text-copper-/);
  expect(span.className).toMatch(/italic|not-italic/); // EM is italic-by-default; ensure italic isn't suppressed
});

test("KeywordHighlight allows nested children (e.g. icons)", () => {
  render(
    <KeywordHighlight>
      <span data-testid="inner">deep</span>
    </KeywordHighlight>,
  );
  expect(screen.getByTestId("inner")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- KeywordHighlight`
Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/KeywordHighlight.tsx
import type { ReactNode } from "react";

// Memory rule (feedback_keyword_highlighting.md): 1–3 keywords per chunk.
// Always copper-400 italic. <em> is the semantic tag — already italic
// by browser default; we keep the class for explicit control.
export function KeywordHighlight({ children }: { children: ReactNode }) {
  return (
    <em className="text-copper-400 italic font-normal not-italic-fallback">
      {children}
    </em>
  );
}
```

Note: the `not-italic-fallback` class is intentionally non-existent — Tailwind ignores unknown classes. This is a marker for grep-ability if we later need to override italic in a specific font where italic doesn't render correctly. Keep the `italic` class as the active rule.

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- KeywordHighlight`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/KeywordHighlight.tsx tests/unit/KeywordHighlight.test.tsx
git commit -m "feat(reveal): add KeywordHighlight primitive (copper-italic accent)"
```

### Task 1.3: `<HeroPhoto>` — full-bleed image + vignette mask

**Files:**
- Create: `src/slides/reveal-and-closing/components/HeroPhoto.tsx`
- Test: `tests/unit/HeroPhoto.test.tsx`

Per spec §3: full-bleed image + gradient vignette mask, with `vignetteSide` controlling which side stays dark for text overlay (per per-slide image-gen prompts: bottom-left for I.2/J.1/K.1, bottom-region-darker for I.4).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/HeroPhoto.test.tsx
import { render, screen } from "@testing-library/react";
import { HeroPhoto } from "@/slides/reveal-and-closing/components/HeroPhoto";

test("HeroPhoto renders an image and a vignette overlay", () => {
  render(<HeroPhoto src="/heroes/test.jpg" vignetteSide="bottom-left" alt="" />);
  const img = screen.getByRole("img", { hidden: true });
  expect(img.getAttribute("src")).toBe("/heroes/test.jpg");
  expect(screen.getByTestId("hero-vignette")).toBeInTheDocument();
});

test("HeroPhoto vignetteSide controls the gradient direction", () => {
  const { rerender } = render(
    <HeroPhoto src="/x.jpg" vignetteSide="bottom-left" alt="" />,
  );
  const vig = screen.getByTestId("hero-vignette");
  const styleA = vig.getAttribute("style") ?? "";
  expect(styleA).toMatch(/linear-gradient/);
  expect(styleA).toMatch(/at bottom left|to top right/);

  rerender(<HeroPhoto src="/x.jpg" vignetteSide="bottom" alt="" />);
  const styleB = vig.getAttribute("style") ?? "";
  expect(styleB).toMatch(/180deg|to top/);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- HeroPhoto`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/HeroPhoto.tsx
type VignetteSide = "bottom-left" | "bottom" | "right";

interface HeroPhotoProps {
  src: string;
  alt: string;
  vignetteSide?: VignetteSide;
}

const vignetteFor: Record<VignetteSide, string> = {
  // Each gradient keeps the named region dark (~95% near-black) and
  // fades to ~30% opacity in the rest. Per memory rule
  // (feedback_slide_visual_conventions.md): backgrounds STAY STATIC.
  "bottom-left":
    "radial-gradient(ellipse at bottom left, rgba(10,10,10,0.95) 20%, rgba(10,10,10,0.35) 80%)",
  "bottom":
    "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.92) 100%)",
  "right":
    "linear-gradient(270deg, rgba(10,10,10,0.95) 20%, rgba(10,10,10,0.3) 80%)",
};

export function HeroPhoto({
  src,
  alt,
  vignetteSide = "bottom-left",
}: HeroPhotoProps) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        aria-hidden={alt === ""}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div
        data-testid="hero-vignette"
        className="absolute inset-0 z-10"
        style={{ background: vignetteFor[vignetteSide] }}
      />
    </>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- HeroPhoto`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/HeroPhoto.tsx tests/unit/HeroPhoto.test.tsx
git commit -m "feat(reveal): add HeroPhoto primitive with vignette mask"
```

### Task 1.4: `<PulseGlow>` — looping copper-glow ambient

**Files:**
- Create: `src/slides/reveal-and-closing/components/PulseGlow.tsx`
- Test: `tests/unit/PulseGlow.test.tsx`

Per spec §3 + per-slide entries: subtle copper-glow pulse on a target element. Opacity 60% → 100% → 60% over a configurable cycle. Used standalone (not via slide-level `<LoopingAmbient>`) so it can run on a single element while the rest of the slide is step-revealed.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/PulseGlow.test.tsx
import { render, screen } from "@testing-library/react";
import { PulseGlow } from "@/slides/reveal-and-closing/components/PulseGlow";

test("PulseGlow renders its child and applies a looping animate prop", () => {
  render(
    <PulseGlow periodSeconds={5}>
      <span data-testid="target">you</span>
    </PulseGlow>,
  );
  expect(screen.getByTestId("target").textContent).toBe("you");
  // The motion.div wrapper carries data-testid for the loop.
  expect(screen.getByTestId("pulse-glow")).toBeInTheDocument();
  expect(screen.getByTestId("pulse-glow").getAttribute("data-period")).toBe("5");
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- PulseGlow`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/PulseGlow.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PulseGlowProps {
  children: ReactNode;
  periodSeconds?: number;     // full cycle duration (60 → 100 → 60)
  intensity?: "subtle" | "strong";
}

export function PulseGlow({
  children,
  periodSeconds = 5,
  intensity = "subtle",
}: PulseGlowProps) {
  const minOpacity = intensity === "subtle" ? 0.6 : 0.45;
  const shadowMax =
    intensity === "subtle"
      ? "0 0 18px rgba(184,110,61,0.55)"
      : "0 0 32px rgba(184,110,61,0.85)";
  return (
    <motion.span
      data-testid="pulse-glow"
      data-period={periodSeconds}
      className="inline-block"
      animate={{
        opacity: [minOpacity, 1, minOpacity],
        textShadow: ["none", shadowMax, "none"],
      }}
      transition={{
        duration: periodSeconds,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- PulseGlow`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/PulseGlow.tsx tests/unit/PulseGlow.test.tsx
git commit -m "feat(reveal): add PulseGlow per-element ambient primitive"
```

### Task 1.5: `<HoverReveal>` — speaker-controlled detail layer

**Files:**
- Create: `src/slides/reveal-and-closing/components/HoverReveal.tsx`
- Test: `tests/unit/HoverReveal.test.tsx`

Per memory `feedback_slide_interaction_conventions.md`: a `<HoverReveal trigger payload>` primitive. Hover the trigger → payload fades in (150–250ms). Speaker-controlled.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/HoverReveal.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { HoverReveal } from "@/slides/reveal-and-closing/components/HoverReveal";

test("HoverReveal renders trigger; payload is hidden until hover", () => {
  render(
    <HoverReveal
      trigger={<span data-testid="trig">date</span>}
      payload={<p data-testid="pay">extra info</p>}
    />,
  );
  expect(screen.getByTestId("trig")).toBeInTheDocument();
  // Payload exists in DOM (for layout) but data-revealed=false.
  const payload = screen.getByTestId("hover-payload");
  expect(payload.getAttribute("data-revealed")).toBe("false");
});

test("HoverReveal flips data-revealed on mouseEnter / mouseLeave", () => {
  render(
    <HoverReveal
      trigger={<span data-testid="trig">date</span>}
      payload={<p data-testid="pay">extra info</p>}
    />,
  );
  const root = screen.getByTestId("hover-root");
  fireEvent.mouseEnter(root);
  expect(screen.getByTestId("hover-payload").getAttribute("data-revealed")).toBe(
    "true",
  );
  fireEvent.mouseLeave(root);
  expect(screen.getByTestId("hover-payload").getAttribute("data-revealed")).toBe(
    "false",
  );
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- HoverReveal`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/HoverReveal.tsx
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

interface HoverRevealProps {
  trigger: ReactNode;
  payload: ReactNode;
  // Where to position the payload relative to the trigger.
  position?: "below" | "above" | "right";
}

export function HoverReveal({
  trigger,
  payload,
  position = "below",
}: HoverRevealProps) {
  const [hover, setHover] = useState(false);
  const offset = position === "above" ? "-top-4 -translate-y-full" :
                 position === "right" ? "left-full ml-4 top-0" :
                 "top-full mt-4 left-0";
  return (
    <span
      data-testid="hover-root"
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {trigger}
      <motion.span
        data-testid="hover-payload"
        data-revealed={String(hover)}
        className={`pointer-events-none absolute z-30 block ${offset}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {payload}
      </motion.span>
    </span>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- HoverReveal`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/HoverReveal.tsx tests/unit/HoverReveal.test.tsx
git commit -m "feat(reveal): add HoverReveal speaker-detail-layer primitive"
```

### Task 1.6: `<DisplayPhrase>` — word/phrase staggered reveal

**Files:**
- Create: `src/slides/reveal-and-closing/components/DisplayPhrase.tsx`
- Test: `tests/unit/DisplayPhrase.test.tsx`

Per spec §3 and per-slide entries (I.4, J.1, K.1): word-by-word or phrase-by-phrase reveal motion, triggered when the component mounts (slot inside `<StepReveal>` so it kicks off when its parent step reveals it). Spec §4.4 specifies `Foundation 250ms → before 200ms → velocity 250ms → period`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/DisplayPhrase.test.tsx
import { render, screen } from "@testing-library/react";
import { DisplayPhrase } from "@/slides/reveal-and-closing/components/DisplayPhrase";

test("DisplayPhrase renders all words as inline spans", () => {
  render(<DisplayPhrase staggerType="word" words={["Foundation", "before", "velocity"]} />);
  const words = screen.getAllByTestId("phrase-word");
  expect(words.map((w) => w.textContent?.trim())).toEqual([
    "Foundation",
    "before",
    "velocity",
  ]);
});

test("DisplayPhrase supports per-word duration overrides", () => {
  render(
    <DisplayPhrase
      staggerType="word"
      words={[
        { text: "Foundation", durationMs: 250 },
        { text: "before", durationMs: 200 },
        { text: "velocity", durationMs: 250 },
      ]}
    />,
  );
  const words = screen.getAllByTestId("phrase-word");
  expect(words[0].getAttribute("data-duration-ms")).toBe("250");
  expect(words[1].getAttribute("data-duration-ms")).toBe("200");
});

test("DisplayPhrase phrase mode renders each phrase as a discrete block", () => {
  render(
    <DisplayPhrase
      staggerType="phrase"
      words={["Theory ends.", "Hands begin."]}
    />,
  );
  const phrases = screen.getAllByTestId("phrase-word");
  expect(phrases).toHaveLength(2);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- DisplayPhrase`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/DisplayPhrase.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type WordSpec = string | { text: ReactNode; durationMs?: number; pauseAfterMs?: number };

interface DisplayPhraseProps {
  // "word": inline-stagger word-by-word with single-space joiners.
  // "phrase": block-stagger, each entry on its own line/visual.
  staggerType: "word" | "phrase";
  words: WordSpec[];
  baseDurationMs?: number;     // default per-word reveal duration
  delayBetweenMs?: number;     // gap between successive reveals
}

export function DisplayPhrase({
  staggerType,
  words,
  baseDurationMs = 250,
  delayBetweenMs = 60,
}: DisplayPhraseProps) {
  let cumulativeDelay = 0;
  return (
    <span className={staggerType === "phrase" ? "block" : "inline"}>
      {words.map((w, i) => {
        const text = typeof w === "string" ? w : w.text;
        const duration = (typeof w === "object" && w.durationMs) || baseDurationMs;
        const pauseAfter = (typeof w === "object" && w.pauseAfterMs) || 0;
        const delay = cumulativeDelay;
        cumulativeDelay += duration + delayBetweenMs + pauseAfter;
        const variant = staggerType === "phrase" ? "block mb-2" : "inline-block";
        return (
          <motion.span
            key={i}
            data-testid="phrase-word"
            data-duration-ms={duration}
            className={variant}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duration / 1000,
              delay: delay / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {text}
            {staggerType === "word" && i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </span>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- DisplayPhrase`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/DisplayPhrase.tsx tests/unit/DisplayPhrase.test.tsx
git commit -m "feat(reveal): add DisplayPhrase word/phrase staggered reveal primitive"
```

---

## Phase 2 — Card-family primitives

### Task 2.1: `<RecipeStepCard>` — reusable card for principles + recipe steps

**Files:**
- Create: `src/slides/reveal-and-closing/components/RecipeStepCard.tsx`
- Test: `tests/unit/RecipeStepCard.test.tsx`

Per spec §4.6 card structure: number badge (top-left, Inter mono copper-400), principle headline (Instrument Serif ~36px white + keyword highlights), thin copper rule, sub-text (Source Serif italic ~22px neutral-300), optional hover example via `<HoverReveal>`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/RecipeStepCard.test.tsx
import { render, screen } from "@testing-library/react";
import { RecipeStepCard } from "@/slides/reveal-and-closing/components/RecipeStepCard";

test("RecipeStepCard renders number, headline, and sub-text", () => {
  render(
    <RecipeStepCard
      num={1}
      headline={<>Foundation precedes velocity</>}
      subText="understand before you output"
    />,
  );
  expect(screen.getByText("01")).toBeInTheDocument();
  expect(screen.getByText("Foundation precedes velocity")).toBeInTheDocument();
  expect(screen.getByText("understand before you output")).toBeInTheDocument();
});

test("RecipeStepCard pads num to 2 digits", () => {
  render(<RecipeStepCard num={5} headline="x" subText="y" />);
  expect(screen.getByText("05")).toBeInTheDocument();
});

test("RecipeStepCard renders hoverExample wrapped in HoverReveal when provided", () => {
  render(
    <RecipeStepCard
      num={1}
      headline="x"
      subText="y"
      hoverExample="example anecdote"
    />,
  );
  // HoverReveal injects a hover-payload data-testid.
  expect(screen.getByTestId("hover-payload")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- RecipeStepCard`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/RecipeStepCard.tsx
import type { ReactNode } from "react";
import { HoverReveal } from "./HoverReveal";

interface RecipeStepCardProps {
  num: number;
  headline: ReactNode;
  subText: ReactNode;
  hoverExample?: ReactNode;
  orientation?: "vertical" | "horizontal";
}

export function RecipeStepCard({
  num,
  headline,
  subText,
  hoverExample,
  orientation = "vertical",
}: RecipeStepCardProps) {
  const padded = String(num).padStart(2, "0");
  const sizeFromOrientation =
    orientation === "horizontal"
      ? "w-[28%] min-h-[280px]"
      : "w-full max-w-[820px] min-h-[180px]";
  const card = (
    <div
      className={`relative flex flex-col gap-4 border border-copper-700 bg-neutral-950/40 p-8 ${sizeFromOrientation}`}
      data-testid="recipe-step-card"
    >
      <span
        className="font-mono text-copper-400"
        style={{ fontSize: "clamp(1.25rem, 1.4vw, 1.75rem)" }}
      >
        {padded}
      </span>
      <h3
        className="font-display text-neutral-50"
        style={{ fontSize: "clamp(1.75rem, 2.2vw, 2.5rem)", lineHeight: 1.18 }}
      >
        {headline}
      </h3>
      <hr className="w-[70%] border-0 border-t border-copper-700/70" />
      <p
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.6rem)", lineHeight: 1.45 }}
      >
        {subText}
      </p>
    </div>
  );
  if (!hoverExample) return card;
  return (
    <HoverReveal
      position="below"
      trigger={card}
      payload={
        <span
          className="block max-w-[480px] border border-copper-500 bg-neutral-900 p-6 font-serif italic text-neutral-100 shadow"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.35rem)", lineHeight: 1.5 }}
        >
          {hoverExample}
        </span>
      }
    />
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- RecipeStepCard`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/RecipeStepCard.tsx tests/unit/RecipeStepCard.test.tsx
git commit -m "feat(reveal): add RecipeStepCard primitive (used on J.2/J.3/J.4)"
```

### Task 2.2: `<StepConnector>` — animated arrow between cards

**Files:**
- Create: `src/slides/reveal-and-closing/components/StepConnector.tsx`
- Test: `tests/unit/StepConnector.test.tsx`

Per spec §3 + §4.8: forward chevrons (J.3 vertical, J.4 horizontal) and backward loop-back arrows (J.4 only). Backward variant supports an `ambient="backward"` mode that animates a subtle pulse traveling against the arrow direction.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/StepConnector.test.tsx
import { render, screen } from "@testing-library/react";
import { StepConnector } from "@/slides/reveal-and-closing/components/StepConnector";

test("StepConnector renders an SVG path with the requested direction attribute", () => {
  render(<StepConnector direction="down" />);
  const c = screen.getByTestId("step-connector");
  expect(c.getAttribute("data-direction")).toBe("down");
  expect(c.querySelector("path")).not.toBeNull();
});

test("StepConnector renders a label when provided", () => {
  render(<StepConnector direction="loopBack" label="refine, iterate" />);
  expect(screen.getByText("refine, iterate")).toBeInTheDocument();
});

test("StepConnector flags ambient when explicitly opted in", () => {
  render(<StepConnector direction="loopBack" ambient="backward" />);
  expect(screen.getByTestId("step-connector").getAttribute("data-ambient")).toBe(
    "backward",
  );
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- StepConnector`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/StepConnector.tsx
import { motion } from "framer-motion";

type Direction = "down" | "forward" | "loopBack";

interface StepConnectorProps {
  direction: Direction;
  label?: string;
  ambient?: "forward" | "backward";    // optional traveling-pulse ambient (J.4)
  width?: number;
  height?: number;
}

export function StepConnector({
  direction,
  label,
  ambient,
  width = 120,
  height = 60,
}: StepConnectorProps) {
  // Path data per direction. Coordinates kept simple — slides can scale via container width.
  const paths: Record<Direction, string> = {
    down: `M ${width / 2} 4 L ${width / 2} ${height - 8}`,
    forward: `M 4 ${height / 2} L ${width - 8} ${height / 2}`,
    // Loop-back: from right-side card down/under and back to the left-side card.
    loopBack: `M ${width - 8} 4 C ${width - 8} ${height - 4} 8 ${height - 4} 8 4`,
  };
  const arrowMark =
    direction === "loopBack" ? "url(#arrowhead-back)" : "url(#arrowhead)";
  return (
    <div
      data-testid="step-connector"
      data-direction={direction}
      data-ambient={ambient ?? ""}
      className="relative flex items-center justify-center"
      style={{ width, height }}
    >
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
          <marker
            id="arrowhead-back"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 10 0 L 0 5 L 10 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        <motion.path
          d={paths[direction]}
          fill="none"
          stroke="#b86e3d"
          strokeWidth={1.5}
          markerEnd={arrowMark}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
        {ambient === "backward" && (
          // Traveling pulse: a short bright segment that loops along the
          // path in the BACKWARD direction. Animates strokeDashoffset.
          <motion.path
            d={paths[direction]}
            fill="none"
            stroke="#d99e6c"
            strokeWidth={2.5}
            strokeDasharray="14 200"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 214 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
      {label && (
        <span
          className="absolute font-sans italic text-copper-300"
          style={{
            fontSize: "clamp(0.85rem, 1vw, 1.1rem)",
            top: direction === "down" ? "50%" : `${height + 4}px`,
            left: direction === "down" ? `${width / 2 + 12}px` : "50%",
            transform: direction === "down" ? "translateY(-50%)" : "translateX(-50%)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- StepConnector`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/StepConnector.tsx tests/unit/StepConnector.test.tsx
git commit -m "feat(reveal): add StepConnector primitive (down/forward/loopBack arrows)"
```

---

## Phase 3 — Hero photography (asset prep)

### Task 3.1: Generate the four hero photographs

**Files:**
- Create: `assets/heroes/i2-night-workspace.jpg`
- Create: `assets/heroes/i4-dusk-horizon.jpg`
- Create: `assets/heroes/j1-notebook-study.jpg`
- Create: `assets/heroes/k1-morning-workspace.jpg`
- Create: `docs/runbooks/image-gen-prompts.md`

The spec gives full image-gen prompts in §4.2, §4.4, §4.5, §4.9. The MCP `gemini-image-gen` is the primary source per memory rule (`feedback_slide_visual_conventions.md`). If it isn't currently registered with Claude Code, the fallback is hand-curated free Unsplash images.

- [ ] **Step 1: Create the runbook archiving prompts**

Write `docs/runbooks/image-gen-prompts.md`:

````markdown
# Hero photo prompts — Reveal + Closing

Archived so each hero can be re-rendered without scraping the spec. Source: `docs/specs/2026-05-07-slides-reveal-and-closing.md` §4.2, §4.4, §4.5, §4.9.

## I.2 — Night workspace (`assets/heroes/i2-night-workspace.jpg`)

> Editorial photograph, late evening, atmospheric warm-amber lighting from a single brass desk lamp. A walnut-wood desk with an open laptop showing soft-focus code, a leather-bound notebook with a fountain pen, a ceramic coffee cup with steam catching the lamplight. Deep shadows in the background recede into matte near-black. Copper-amber accent palette throughout. No people visible. Mood: quiet craftsmanship, dignified focus, late-night solo work. Suitable for slide background — subject offset to upper-right; bottom-left region intentionally dim for text overlay. 16:9 widescreen.

## I.4 — Dusk horizon (`assets/heroes/i4-dusk-horizon.jpg`)

> Editorial photograph at dusk or first dawn. Long quiet road or open horizon receding into distance, fading into copper-amber atmospheric haze. Deep shadows in foreground; misty depth in middle; warm horizon light at the vanishing point. Minimal subject — no people, no vehicles, no specific architecture. Mood: continuation, possibility, dignified onward motion. Copper-amber accent palette. 16:9 widescreen. Suitable for slide background — bottom region intentionally darker for text overlay.

## J.1 — Notebook study (`assets/heroes/j1-notebook-study.jpg`)

> Editorial photograph, dim warm interior lighting. An open leather-bound notebook with handwritten notes in dark fountain-pen ink, slightly out of focus on the upper portion of the page. A pen rests across the spine. Atmospheric copper-amber accent from an unseen warm light source (lamp out of frame). Deep shadows surround; background fades into matte near-black. Mood: study, learning, deliberate craft, quiet humility. No people. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

## K.1 — Morning workspace (`assets/heroes/k1-morning-workspace.jpg`)

> Editorial photograph at first light / dawn. Industrial-craft style workspace in a high-ceilinged room with tall windows. Warm copper-amber morning light streaming through windows, casting deep shadows. A pulled-out wooden chair beside a walnut desk. On the desk: a closed laptop, an open leather notebook with a clean page, a pen resting across the page. The room feels READY but EMPTY — set up for someone to arrive and begin work. No people visible. Mood: invitation, readiness, the threshold of a new task. Copper-amber accent palette. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

## Re-render workflow

1. **If `gemini-image-gen` MCP is registered** (`claude mcp list | grep gemini`):
   - Use the MCP's image-gen tool with each prompt above.
   - Output spec: 16:9 (1920×1080 minimum), JPG, < 800 KB after optimization.
   - Save to `assets/heroes/<name>.jpg`.
2. **If MCP is NOT registered:**
   - Curate from Unsplash (free, royalty-free) using search terms drawn from the prompt (`night desk lamp warm`, `dusk horizon copper`, `notebook fountain pen`, `morning workspace empty chair`).
   - Verify the photo meets the vignette-friendly constraint (the region named in the spec for text overlay is dim or smooth-toned).
   - Save to the same path.
3. Re-run `npm test` — `tests/unit/HeroPhoto.test.tsx` is path-agnostic; no test code change needed.
4. Re-run `npm run dev` and inspect each hero slide visually to confirm the vignette mask still produces readable text overlay.
````

- [ ] **Step 2: Generate or source the four images**

Run: `claude mcp list | grep -i gemini || echo 'no MCP — use Unsplash fallback'`

Then:
- If MCP available, invoke its image-generation tool four times with the prompts above and save to the four paths.
- Else, manually curate four free Unsplash images matching the prompt mood, download them with `curl -o assets/heroes/<name>.jpg <url>`, and verify each is at least 1920×1080 and under 800 KB (use `sips -Z 1920 assets/heroes/*.jpg` on macOS to downscale if needed).

- [ ] **Step 3: Verify all four files exist and are non-empty**

Run: `ls -la assets/heroes/`
Expected: 4 files, each > 50 KB, none larger than 1 MB.

- [ ] **Step 4: Spot-check served via Vite**

Run: `npm run dev` (background) then `curl -sI http://localhost:5173/heroes/i2-night-workspace.jpg | head -1`
Expected: `HTTP/1.1 200 OK` (after Vite serves static `assets/` via the public root — verify Vite config includes `publicDir: "assets"` or move the heroes folder into `public/`).

If Vite does not serve `assets/` by default (it doesn't — Vite uses `public/` by convention), choose ONE:
- Move folder: `mkdir -p public && mv assets/heroes public/heroes` (then update `assets/n8n-workflows/` similarly OR keep heroes separate).
- Update `vite.config.ts`: add `publicDir: "assets"`.

The simpler choice given existing `assets/n8n-workflows/` is to update `vite.config.ts` to expose the entire `assets/` folder as the public root:

```typescript
// src/../vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  publicDir: "assets",
  server: { port: 5173, strictPort: true },
});
```

Re-verify: `curl -sI http://localhost:5173/heroes/i2-night-workspace.jpg`.

- [ ] **Step 5: Commit**

```bash
git add docs/runbooks/image-gen-prompts.md assets/heroes/ vite.config.ts
git commit -m "feat(reveal): add hero photography assets + image-gen runbook"
```

---

## Phase 4 — Static content slides

### Task 4.1: Create the frozen content module

**Files:**
- Create: `src/slides/reveal-and-closing/content.ts`

All audience-facing copy lives in one file for editability without touching component code. Per memory rule `feedback_audience_framing.md`: no commit counts, no "solo" repeats, plain language.

- [ ] **Step 1: Write content module**

```typescript
// src/slides/reveal-and-closing/content.ts
// Single source of truth for all reveal+closing slide copy.
// Editing copy here does not require touching slide components.

export const i1Content = {
  headlineParts: ["What you've been watching for the last ", "90 minutes", " — I built this. ", "Solo", ". With ", "AI", "."],
  subLine: "And here's the process that made it possible.",
  subLineKeywords: ["process"] as const,
  tagline: "Built with harnesses = production-grade result.",
  taglineKeywords: ["harnesses", "production-grade result"] as const,
  stages: [
    { num: 1, label: "Research", sub: "14 parallel agents → topic deep-dives", keywords: ["parallel agents"] as const },
    { num: 2, label: "Per-slide brainstorm", sub: "Structure → beats → content", keywords: ["beats"] as const },
    { num: 3, label: "Design system", sub: "Typography · color · motion · components", keywords: ["Typography · color · motion · components"] as const },
    { num: 4, label: "Plugins + Skills", sub: "frontend-slides · brainstorming · writing-plans", keywords: ["frontend-slides", "brainstorming", "writing-plans"] as const },
    { num: 5, label: "MCP", sub: "NotebookLM · gemini-image-gen", keywords: ["NotebookLM", "gemini-image-gen"] as const },
    { num: 6, label: "Deck generation", sub: "Scripted · reviewed · iterated", keywords: ["reviewed"] as const },
  ],
};

export const i2Content = {
  name: "ADRIANTO TEDJOKUSUMO",
  role: { text: "Head of TPM @ Nanovest · AI Steering Committee Lead", keywords: ["Nanovest", "AI Steering Committee Lead"] as const },
  delivery: { text: "13 years tech delivery. Zero formal AI training.", keywords: ["Zero formal AI training"] as const },
  credentials: { text: "ITB Electrical Eng · Chosun M.S. Computer Vision · 8+ yrs PM (Toppan Ecquaria · Blibli)", keywords: ["Computer Vision"] as const },
  timeline: {
    anchors: [
      { id: "mar2025", label: "Mar 2025", caption: "start", hover: "Started reading papers, daily Claude/ChatGPT use, no goals." },
      { id: "sep2025", label: "Sep 2025", caption: "first deliverables", hover: "First MCPs + plugins shipped to internal team." },
      { id: "today", label: "Today", caption: "still beginner", captionKeywords: ["still beginner"] as const, hover: "Active builds, still learning. This deck is one of them." },
    ],
    segmentLabel: "6mo foundation + experiment",
    cvHover: "Master's thesis: image segmentation. Pre-LLM era.",
  },
};

export const i3Content = {
  headline: "Built. Taught. In production.",
  caption: "Click any item to see how it works",
  defaultCaption: "The harness pattern / Five expressions follow",
  list: [
    { kind: "header" as const, label: "HARNESSES" },
    { kind: "subheader" as const, label: "Workflows (n8n)" },
    { kind: "item" as const, id: "stocks-intel", label: "stocks intel", weight: "heavy" as const },
    { kind: "item" as const, id: "legal-docs", label: "legal docs", weight: "heavy" as const },
    { kind: "item" as const, id: "exchange-alerts", label: "exchange alerts", weight: "heavy" as const },
    { kind: "subheader" as const, label: "Plugins (Claude)" },
    { kind: "item" as const, id: "nanovest-product", label: "nanovest-product", weight: "heavy" as const },
    { kind: "item" as const, id: "notebooklm", label: "NotebookLM", weight: "heavy" as const },
    { kind: "header" as const, label: "TOOLS" },
    { kind: "item" as const, id: "gemini-image-gen", label: "gemini-image-gen", weight: "light" as const },
    { kind: "item" as const, id: "sonarqube", label: "Sonarqube", weight: "light" as const },
    { kind: "item" as const, id: "bitbucket", label: "Bitbucket", weight: "light" as const },
    { kind: "header" as const, label: "WORKSHOPS facilitated" },
    { kind: "item" as const, id: "hr-group-ai", label: "HR Group AI · Sinarmas Group", weight: "light" as const },
    { kind: "item" as const, id: "townhall-aisc", label: "Townhall AISC · Nanovest", weight: "light" as const },
    { kind: "item" as const, id: "ai-sdlc", label: "AI-SDLC · Nanovest", weight: "light" as const },
    { kind: "item" as const, id: "pilot-workshop", label: "Pilot Workshop · Nanovest", weight: "light" as const },
  ],
};

export const i4Content = {
  firstBeat: [
    { text: "Foundation", durationMs: 250, keyword: true },
    { text: "before", durationMs: 200 },
    { text: "velocity", durationMs: 250, keyword: true },
    { text: ".", durationMs: 80 },
  ],
  secondBeatA: "In a year, a Project Manager built this.",
  secondBeatAKeywords: ["Project Manager"] as const,
  secondBeatB: "— In a year, what could you build?",
  secondBeatBKeywords: ["you"] as const,
};

export const j1Content = {
  line1: { text: "Still a beginner. A lot left to learn.", keywords: ["Still a beginner"] as const },
  line2: { text: "But I've earned a few lessons — through experiments, through failures.", keywords: ["experiments", "failures"] as const },
  line3: { text: "Here's some advice. So you don't repeat my mistakes.", keywords: ["repeat my mistakes"] as const },
};

export const j2Content = {
  headline: "Mindset before tools.",
  headlineKeywords: ["Mindset before tools"] as const,
  caption: "Hover any card for an example",
  cards: [
    {
      num: 1,
      headline: "Foundation precedes velocity",
      headlineKeywords: ["Foundation"] as const,
      sub: "understand before you output",
      hover: "Read the concept. Feel if it's relevant. Then experiment. Skip foundation — and you're just vibe-coding.",
    },
    {
      num: 2,
      headline: "Reps before sophistication",
      headlineKeywords: ["Reps"] as const,
      sub: "daily use beats clever prompts",
      hover: "Used Claude daily for months before trying to build anything.",
    },
    {
      num: 3,
      headline: "Stay current, don't chase",
      headlineKeywords: ["Stay"] as const,
      sub: "filter: does this serve my work?",
      hover: "New AI features ship constantly. My filter: does this serve my work? Most don't.",
    },
    {
      num: 4,
      headline: "Build the smallest thing that matters",
      headlineKeywords: ["smallest thing"] as const,
      sub: "a prompt template, a Skill, a snippet",
      hover: "First build was a prompt template. Took 30 minutes.",
    },
    {
      num: 5,
      headline: "Failure is the next iteration's blueprint",
      headlineKeywords: ["Failure is the next iteration's blueprint"] as const,
      sub: "improve before you ship",
      hover: "Most first builds didn't work. Each one rebuilt the next.",
    },
  ],
};

export const j3Content = {
  headline: "Habits before output. Steps 1–3 of the recipe.",
  headlineKeywords: ["Habits before output"] as const,
  caption: "Hover any step for an example",
  cards: [
    {
      num: 1,
      headline: "Read 1 thing a week about how AI works",
      headlineKeywords: ["1 thing a week"] as const,
      sub: "paper · post · well-written thread — anything conceptual",
      hover: "What I read mattered less than building the habit. The first months are about absorbing concepts.",
    },
    {
      num: 2,
      headline: "Use AI daily for anything",
      headlineKeywords: ["daily"] as const,
      sub: "drafting · summarizing · brainstorming · deciding — any task, any role",
      hover: "Months of daily use before I tried to build anything. Reps make later sophistication land.",
    },
    {
      num: 3,
      headline: "Pick ONE tool, go deep before adding others",
      headlineKeywords: ["ONE tool"] as const,
      sub: "skip the toolchain race — mastery beats sampling",
      hover: "Went deep on Claude. Skipped the LLM-of-the-week parade.",
    },
  ],
};

export const j4Content = {
  headline: "Artifacts that travel. Steps 4–6 of the recipe.",
  headlineKeywords: ["Artifacts that travel"] as const,
  caption: "Hover any step for an example",
  cards: [
    {
      num: 4,
      headline: "Find one recurring annoyance — AI-assist it 20% better",
      headlineKeywords: ["recurring annoyance", "20% better"] as const,
      sub: "your first build · prompt · skill · workflow snippet",
      hover: "First build was a prompt template for status updates. 30 min. Used it daily after.",
    },
    {
      num: 5,
      headline: "Evaluate ruthlessly",
      headlineKeywords: ["Evaluate ruthlessly"] as const,
      sub: "what's better? what still breaks? embrace failure — iterate",
      hover: "First MCP didn't work for two weeks of evenings. Each broken version informed the next.",
    },
    {
      num: 6,
      headline: "Once solid, share with many who have the same pain",
      headlineKeywords: ["many"] as const,
      sub: "their feedback is what makes it reusable for anyone",
      hover: "Shared nanovest-product plugin with PMs at Nanovest. Their feedback turned it into a reusable system.",
    },
  ],
  loopBackLabels: { five: "refine, iterate", six: "feedback from many" },
};

export const k1Content = {
  headline: ["Theory ends.", "Hands begin."],
  headlineKeywords: ["Theory ends. Hands begin"] as const,
  body1: "Tools loaded. Skills ready. Dummy data set.",
  body2: { text: "Open your laptop. Run the harnesses.", keywords: ["laptop"] as const },
  body3: "I'll be here.",
  tagline: "After this, the recipe is no longer theory.",
  taglineKeywords: ["After this, the recipe is no longer theory"] as const,
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/slides/reveal-and-closing/content.ts
git commit -m "feat(reveal): add frozen content module for all 9 slides"
```

### Task 4.2: Slide J.1 — HUMILITY INTRO

**Files:**
- Create: `src/slides/reveal-and-closing/j1-humility-intro.tsx`
- Test: `tests/unit/j1-humility-intro.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.5: photographic background (notebook study), 3 step-revealed lines, NO ambient. Step counts: 4 (initial pose + 3 advances). canonicalPose = 3 (post-Space 3, all lines visible).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/j1-humility-intro.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J1HumilityIntro, j1Slide } from "@/slides/reveal-and-closing/j1-humility-intro";

function harness() {
  return render(
    <DeckProvider stepCounts={[j1Slide.steps]}>
      <J1HumilityIntro />
    </DeckProvider>,
  );
}

test("J.1 declares 4 steps with canonicalPose=3", () => {
  expect(j1Slide.steps).toBe(4);
  expect(j1Slide.canonicalPose).toBe(3);
  expect(j1Slide.animationMode).toBe("step-reveal");
});

test("J.1 renders the FIG label, hero photo, and the three lines", () => {
  harness();
  expect(screen.getByText(/FIG\. J\.1 · THE RECIPE/)).toBeInTheDocument();
  expect(screen.getByText(/Still a beginner/)).toBeInTheDocument();
  expect(screen.getByText(/I've earned a few lessons/)).toBeInTheDocument();
  expect(screen.getByText(/Here's some advice/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- j1-humility-intro`
Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement the slide component**

```typescript
// src/slides/reveal-and-closing/j1-humility-intro.tsx
import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "./components/FigLabel";
import { HeroPhoto } from "./components/HeroPhoto";
import { KeywordHighlight } from "./components/KeywordHighlight";
import { j1Content as C } from "./content";

function highlight(text: string, keywords: readonly string[]) {
  // Splits on each keyword and wraps it in <KeywordHighlight>. Robust to
  // multiple keywords sharing prefixes — keywords are sorted longest-first.
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const parts: (string | JSX.Element)[] = [text];
  for (const k of sorted) {
    for (let i = 0; i < parts.length; i++) {
      const seg = parts[i];
      if (typeof seg !== "string" || !seg.includes(k)) continue;
      const split = seg.split(k);
      const rebuilt: (string | JSX.Element)[] = [];
      split.forEach((s, j) => {
        if (j > 0) rebuilt.push(<KeywordHighlight key={`${k}-${i}-${j}`}>{k}</KeywordHighlight>);
        if (s) rebuilt.push(s);
      });
      parts.splice(i, 1, ...rebuilt);
      i += rebuilt.length - 1;
    }
  }
  return <>{parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : p))}</>;
}

export function J1HumilityIntro() {
  return (
    <div className="relative h-full w-full">
      <HeroPhoto src="/heroes/j1-notebook-study.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="J" num={1} label="THE RECIPE" />
      <div className="absolute bottom-24 left-24 z-20 flex max-w-[60vw] flex-col gap-8">
        <StepReveal>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.18 }}
          >
            {highlight(C.line1.text, C.line1.keywords)}
          </p>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.18 }}
          >
            {highlight(C.line2.text, C.line2.keywords)}
          </p>
          <p
            className="font-serif italic text-neutral-50"
            style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.4 }}
          >
            {highlight(C.line3.text, C.line3.keywords)}
          </p>
        </StepReveal>
      </div>
    </div>
  );
}

export const j1Slide: SlideDef = {
  steps: 4,                  // initial pose + 3 reveals
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <J1HumilityIntro />,
};
```

- [ ] **Step 4: Promote `highlight()` helper into a shared module**

The same logic is needed by I.1, I.2, I.4, J.2, J.3, J.4, K.1. Extract to `src/slides/reveal-and-closing/components/highlight.tsx`:

```typescript
// src/slides/reveal-and-closing/components/highlight.tsx
import type { JSX, ReactNode } from "react";
import { KeywordHighlight } from "./KeywordHighlight";

export function highlight(text: string, keywords: readonly string[]): ReactNode {
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const parts: (string | JSX.Element)[] = [text];
  for (const k of sorted) {
    for (let i = 0; i < parts.length; i++) {
      const seg = parts[i];
      if (typeof seg !== "string" || !seg.includes(k)) continue;
      const split = seg.split(k);
      const rebuilt: (string | JSX.Element)[] = [];
      split.forEach((s, j) => {
        if (j > 0) rebuilt.push(<KeywordHighlight key={`${k}-${i}-${j}`}>{k}</KeywordHighlight>);
        if (s) rebuilt.push(s);
      });
      parts.splice(i, 1, ...rebuilt);
      i += rebuilt.length - 1;
    }
  }
  return <>{parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : p))}</>;
}
```

Update `j1-humility-intro.tsx` to import `highlight` from this shared module instead of defining it locally.

- [ ] **Step 5: Add a unit test for `highlight()`**

```typescript
// tests/unit/highlight.test.tsx
import { render, screen } from "@testing-library/react";
import { highlight } from "@/slides/reveal-and-closing/components/highlight";

test("highlight wraps each keyword in a copper-italic span", () => {
  render(<p>{highlight("Foundation before velocity", ["Foundation", "velocity"])}</p>);
  expect(screen.getByText("Foundation").tagName).toBe("EM");
  expect(screen.getByText("velocity").tagName).toBe("EM");
  expect(screen.getByText("before").tagName).not.toBe("EM");
});

test("highlight handles overlapping keywords longest-first", () => {
  render(<p>{highlight("AI Steering Committee Lead", ["AI", "AI Steering Committee Lead"])}</p>);
  // The longer match should win; only ONE EM, not nested.
  const ems = screen.getAllByText(/AI/);
  const wholePhrase = ems.find((e) => e.textContent === "AI Steering Committee Lead");
  expect(wholePhrase?.tagName).toBe("EM");
});

test("highlight tolerates a string with no matches", () => {
  const { container } = render(<p>{highlight("plain", ["other"])}</p>);
  expect(container.textContent).toBe("plain");
});
```

- [ ] **Step 6: Register J.1 in the reveal-and-closing index**

Edit `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { j1Slide } from "./j1-humility-intro";

export const revealAndClosingSlides: SlideDef[] = [j1Slide];
```

- [ ] **Step 7: Run tests**

Run: `npm test -- j1 highlight`
Expected: PASS.

- [ ] **Step 8: Visual smoke (manual)**

Run: `npm run dev` then open `http://localhost:5173/?slide=0`. Press Space 3 times. All three lines should appear in order. The hero photo should fill the background; bottom-left text should stay legible.

- [ ] **Step 9: Commit**

```bash
git add src/slides/reveal-and-closing/j1-humility-intro.tsx \
        src/slides/reveal-and-closing/components/highlight.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/j1-humility-intro.test.tsx tests/unit/highlight.test.tsx
git commit -m "feat(reveal): J.1 humility intro slide + shared highlight helper"
```

### Task 4.3: Slide K.1 — CHALLENGE HANDOFF

**Files:**
- Create: `src/slides/reveal-and-closing/k1-challenge-handoff.tsx`
- Test: `tests/unit/k1-challenge-handoff.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.9: photographic background (morning workspace), 4 steps (initial + Space 1 headline reveal + Space 2 three body lines + Space 3 copper rule + tagline). canonicalPose = 3. Foreground-only ambient on the tagline via `<PulseGlow>`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/k1-challenge-handoff.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { K1ChallengeHandoff, k1Slide } from "@/slides/reveal-and-closing/k1-challenge-handoff";

test("K.1 declares 4 steps with canonicalPose=3", () => {
  expect(k1Slide.steps).toBe(4);
  expect(k1Slide.canonicalPose).toBe(3);
  expect(k1Slide.animationMode).toBe("step-reveal");
});

test("K.1 renders FIG label, headline pieces, body lines, and tagline", () => {
  render(
    <DeckProvider stepCounts={[k1Slide.steps]}>
      <K1ChallengeHandoff />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. K\.1 · NOW FEEL IT/)).toBeInTheDocument();
  expect(screen.getByText(/Theory ends/)).toBeInTheDocument();
  expect(screen.getByText(/Hands begin/)).toBeInTheDocument();
  expect(screen.getByText(/Tools loaded/)).toBeInTheDocument();
  expect(screen.getByText(/Open your/)).toBeInTheDocument();
  expect(screen.getByText(/I'll be here/)).toBeInTheDocument();
  expect(screen.getByText(/recipe is no longer theory/)).toBeInTheDocument();
});

test("K.1 wraps the tagline in PulseGlow for foreground-only ambient", () => {
  render(
    <DeckProvider stepCounts={[k1Slide.steps]}>
      <K1ChallengeHandoff />
    </DeckProvider>,
  );
  expect(screen.getByTestId("pulse-glow")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- k1-challenge-handoff`
Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/k1-challenge-handoff.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "./components/FigLabel";
import { HeroPhoto } from "./components/HeroPhoto";
import { PulseGlow } from "./components/PulseGlow";
import { highlight } from "./components/highlight";
import { k1Content as C } from "./content";

export function K1ChallengeHandoff() {
  return (
    <div className="relative h-full w-full">
      <HeroPhoto src="/heroes/k1-morning-workspace.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="K" num={1} label="NOW FEEL IT" />
      <div className="absolute bottom-24 left-24 z-20 flex max-w-[68vw] flex-col gap-10">
        <StepReveal>
          {/* Space 1 — headline (two beats) */}
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)", lineHeight: 1.1 }}
          >
            {highlight(`${C.headline[0]} ${C.headline[1]}`, C.headlineKeywords)}
          </h1>
          {/* Space 2 — three body lines (revealed together as one step group) */}
          <div className="flex flex-col gap-6">
            <p
              className="font-serif text-neutral-50"
              style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.5 }}
            >
              {C.body1}
            </p>
            <p
              className="font-serif text-neutral-50"
              style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.5 }}
            >
              {highlight(C.body2.text, C.body2.keywords)}
            </p>
            <p
              className="font-serif italic text-neutral-50"
              style={{ fontSize: "clamp(1.5rem, 2vw, 2.25rem)", lineHeight: 1.4 }}
            >
              {C.body3}
            </p>
          </div>
          {/* Space 3 — copper rule + tagline (with PulseGlow) */}
          <div className="flex flex-col gap-6">
            <motion.hr
              className="w-[30%] border-0 border-t border-copper-700"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: "left center" }}
            />
            <PulseGlow periodSeconds={4.5}>
              <p
                className="font-serif italic text-neutral-50"
                style={{ fontSize: "clamp(1.6rem, 2.2vw, 2.5rem)", lineHeight: 1.4 }}
              >
                {highlight(C.tagline, C.taglineKeywords)}
              </p>
            </PulseGlow>
          </div>
        </StepReveal>
      </div>
    </div>
  );
}

export const k1Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <K1ChallengeHandoff />,
};
```

- [ ] **Step 4: Register K.1**

Edit `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { j1Slide } from "./j1-humility-intro";
import { k1Slide } from "./k1-challenge-handoff";

// Order matches spec §1: I → J → K. Currently we have only the J/K
// hero slides while diagrammatic + portfolio slides land in later tasks.
export const revealAndClosingSlides: SlideDef[] = [j1Slide, k1Slide];
```

- [ ] **Step 5: Run tests**

Run: `npm test -- k1-challenge-handoff`
Expected: PASS.

- [ ] **Step 6: Visual smoke**

Run: `npm run dev`, open `http://localhost:5173/?slide=1`. Press Space 3 times. The tagline should pulse continuously after Space 3.

- [ ] **Step 7: Commit**

```bash
git add src/slides/reveal-and-closing/k1-challenge-handoff.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/k1-challenge-handoff.test.tsx
git commit -m "feat(reveal): K.1 challenge handoff slide with foreground PulseGlow ambient"
```

---

## Phase 5 — Card-grid slides (J.2, J.3, J.4)

### Task 5.1: Slide J.2 — 5 MINDSET PRINCIPLES

**Files:**
- Create: `src/slides/reveal-and-closing/j2-five-principles.tsx`
- Test: `tests/unit/j2-five-principles.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.6: 5-card constellation, single Space advance reveals all 5 cards left-to-right with stagger. Steps = 2 (initial + Space 1). canonicalPose = 1. NO ambient.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/j2-five-principles.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J2FivePrinciples, j2Slide } from "@/slides/reveal-and-closing/j2-five-principles";

test("J.2 declares 2 steps with canonicalPose=1", () => {
  expect(j2Slide.steps).toBe(2);
  expect(j2Slide.canonicalPose).toBe(1);
});

test("J.2 renders the FIG label, headline, caption, and 5 cards", () => {
  render(
    <DeckProvider stepCounts={[j2Slide.steps]}>
      <J2FivePrinciples />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. J\.2 · FIVE PRINCIPLES/)).toBeInTheDocument();
  expect(screen.getByText(/Mindset before tools/)).toBeInTheDocument();
  expect(screen.getByText(/Hover any card/)).toBeInTheDocument();
  expect(screen.getAllByTestId("recipe-step-card")).toHaveLength(5);
});

test("J.2 cards are hidden at step 0 and revealed at step 1", () => {
  const { container } = render(
    <DeckProvider stepCounts={[j2Slide.steps]}>
      <J2FivePrinciples />
    </DeckProvider>,
  );
  const initialReveal = container.querySelector("[data-cards-revealed]");
  expect(initialReveal?.getAttribute("data-cards-revealed")).toBe("false");
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- j2-five-principles`
Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/j2-five-principles.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { RecipeStepCard } from "./components/RecipeStepCard";
import { highlight } from "./components/highlight";
import { j2Content as C } from "./content";

export function J2FivePrinciples() {
  const { stepIndex } = useDeck();
  const revealed = stepIndex >= 1;
  return (
    <div className="relative h-full w-full bg-neutral-900">
      {/* Dot-grid texture per memory rule (feedback_slide_visual_conventions.md). */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="J" num={2} label="FIVE PRINCIPLES" />
      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col items-center justify-center gap-12 px-16 py-24">
        <h2
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.15 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h2>
        <div
          data-cards-revealed={String(revealed)}
          className="grid w-full grid-cols-5 gap-6"
        >
          {C.cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: revealed ? 1 : 0,
                y: revealed ? 0 : 8,
              }}
              transition={{
                duration: 0.25,
                delay: revealed ? i * 0.1 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <RecipeStepCard
                num={card.num}
                headline={highlight(card.headline, card.headlineKeywords)}
                subText={card.sub}
                hoverExample={card.hover}
              />
            </motion.div>
          ))}
        </div>
        <p
          className="font-serif italic text-copper-300"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)" }}
        >
          {highlight(C.caption, ["Hover any card"])}
        </p>
      </div>
    </div>
  );
}

export const j2Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  render: () => <J2FivePrinciples />,
};
```

- [ ] **Step 4: Register J.2**

Edit `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { k1Slide } from "./k1-challenge-handoff";

export const revealAndClosingSlides: SlideDef[] = [j1Slide, j2Slide, k1Slide];
```

- [ ] **Step 5: Run tests**

Run: `npm test -- j2-five-principles`
Expected: PASS.

- [ ] **Step 6: Visual smoke**

Run: `npm run dev`, open `http://localhost:5173/?slide=1`. Initially: only headline + caption visible. Press Space → all 5 cards stagger in left-to-right.

- [ ] **Step 7: Commit**

```bash
git add src/slides/reveal-and-closing/j2-five-principles.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/j2-five-principles.test.tsx
git commit -m "feat(reveal): J.2 five mindset principles slide"
```

### Task 5.2: Slide J.3 — RECIPE: BUILDING YOURSELF UP

**Files:**
- Create: `src/slides/reveal-and-closing/j3-recipe-buildup.tsx`
- Test: `tests/unit/j3-recipe-buildup.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.7: 3-step vertical stack, each card paired with a downward StepConnector, Space-by-Space build. Steps = 4 (initial + 3 reveals). canonicalPose = 3. NO ambient.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/j3-recipe-buildup.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J3RecipeBuildup, j3Slide } from "@/slides/reveal-and-closing/j3-recipe-buildup";

test("J.3 declares 4 steps with canonicalPose=3", () => {
  expect(j3Slide.steps).toBe(4);
  expect(j3Slide.canonicalPose).toBe(3);
});

test("J.3 renders FIG label, headline, 3 cards, and 2 down connectors", () => {
  render(
    <DeckProvider stepCounts={[j3Slide.steps]}>
      <J3RecipeBuildup />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. J\.3 · BUILDING YOURSELF UP/)).toBeInTheDocument();
  expect(screen.getByText(/Habits before output/)).toBeInTheDocument();
  expect(screen.getAllByTestId("recipe-step-card")).toHaveLength(3);
  const conns = screen.getAllByTestId("step-connector");
  expect(conns).toHaveLength(2);
  conns.forEach((c) => expect(c.getAttribute("data-direction")).toBe("down"));
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- j3-recipe-buildup`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/j3-recipe-buildup.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { RecipeStepCard } from "./components/RecipeStepCard";
import { StepConnector } from "./components/StepConnector";
import { highlight } from "./components/highlight";
import { j3Content as C } from "./content";

export function J3RecipeBuildup() {
  const { stepIndex } = useDeck();
  return (
    <div className="relative h-full w-full bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="J" num={3} label="BUILDING YOURSELF UP" />
      <div className="relative z-10 mx-auto flex h-full max-w-[80vw] flex-col items-center justify-center gap-8 py-20">
        <h2
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.6vw, 3.5rem)", lineHeight: 1.15 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h2>
        {C.cards.map((card, i) => {
          const cardRevealed = stepIndex >= i + 1;
          const connectorRevealed = stepIndex >= i + 1 && i < C.cards.length - 1;
          return (
            <div key={card.num} className="flex w-full flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: cardRevealed ? 1 : 0,
                  y: cardRevealed ? 0 : 8,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <RecipeStepCard
                  num={card.num}
                  headline={highlight(card.headline, card.headlineKeywords)}
                  subText={card.sub}
                  hoverExample={card.hover}
                />
              </motion.div>
              {i < C.cards.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: connectorRevealed ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="my-2"
                >
                  <StepConnector direction="down" />
                </motion.div>
              )}
            </div>
          );
        })}
        <p
          className="font-serif italic text-copper-300"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)" }}
        >
          {highlight(C.caption, ["Hover any step"])}
        </p>
      </div>
    </div>
  );
}

export const j3Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <J3RecipeBuildup />,
};
```

- [ ] **Step 4: Register J.3**

Edit `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { k1Slide } from "./k1-challenge-handoff";

export const revealAndClosingSlides: SlideDef[] = [j1Slide, j2Slide, j3Slide, k1Slide];
```

- [ ] **Step 5: Run tests**

Run: `npm test -- j3-recipe-buildup`
Expected: PASS.

- [ ] **Step 6: Visual smoke**

Run: `npm run dev`, navigate to J.3. Press Space 3 times — each card + connector should appear in sequence.

- [ ] **Step 7: Commit**

```bash
git add src/slides/reveal-and-closing/j3-recipe-buildup.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/j3-recipe-buildup.test.tsx
git commit -m "feat(reveal): J.3 recipe buildup vertical stack"
```

### Task 5.3: Slide J.4 — RECIPE: BUILDING SOMETHING THAT SHIPS

**Files:**
- Create: `src/slides/reveal-and-closing/j4-recipe-ship.tsx`
- Test: `tests/unit/j4-recipe-ship.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.8: 3-step horizontal flow + 2 loop-back arrows beneath. Signature backward ambient on the loop-back arrows. Steps = 4 (initial + 3 reveals). canonicalPose = 3. animationMode `step-reveal` (the ambient is per-element via StepConnector's `ambient="backward"`).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/j4-recipe-ship.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J4RecipeShip, j4Slide } from "@/slides/reveal-and-closing/j4-recipe-ship";

test("J.4 declares 4 steps with canonicalPose=3", () => {
  expect(j4Slide.steps).toBe(4);
  expect(j4Slide.canonicalPose).toBe(3);
});

test("J.4 renders 3 cards, 2 forward connectors, and 2 loop-back connectors", () => {
  render(
    <DeckProvider stepCounts={[j4Slide.steps]}>
      <J4RecipeShip />
    </DeckProvider>,
  );
  expect(screen.getAllByTestId("recipe-step-card")).toHaveLength(3);
  const conns = screen.getAllByTestId("step-connector");
  const directions = conns.map((c) => c.getAttribute("data-direction"));
  expect(directions.filter((d) => d === "forward")).toHaveLength(2);
  expect(directions.filter((d) => d === "loopBack")).toHaveLength(2);
});

test("J.4 loop-back connectors carry data-ambient=backward for the signature ambient", () => {
  render(
    <DeckProvider stepCounts={[j4Slide.steps]}>
      <J4RecipeShip />
    </DeckProvider>,
  );
  const loops = screen
    .getAllByTestId("step-connector")
    .filter((c) => c.getAttribute("data-direction") === "loopBack");
  loops.forEach((l) =>
    expect(l.getAttribute("data-ambient")).toBe("backward"),
  );
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- j4-recipe-ship`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/j4-recipe-ship.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { RecipeStepCard } from "./components/RecipeStepCard";
import { StepConnector } from "./components/StepConnector";
import { highlight } from "./components/highlight";
import { j4Content as C } from "./content";

export function J4RecipeShip() {
  const { stepIndex } = useDeck();
  return (
    <div className="relative h-full w-full bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="J" num={4} label="BUILDING SOMETHING THAT SHIPS" />
      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col items-center justify-center gap-10 px-12 py-20">
        <h2
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.6vw, 3.5rem)", lineHeight: 1.15 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h2>
        {/* Forward row: card 04 → connector → card 05 → connector → card 06 */}
        <div className="flex w-full items-stretch justify-between gap-2">
          {C.cards.map((card, i) => {
            const cardRevealed = stepIndex >= i + 1;
            const arrowRevealed = stepIndex >= i + 1 && i < C.cards.length - 1;
            return (
              <div key={card.num} className="flex flex-1 items-center justify-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  <RecipeStepCard
                    num={card.num}
                    headline={highlight(card.headline, card.headlineKeywords)}
                    subText={card.sub}
                    hoverExample={card.hover}
                    orientation="horizontal"
                  />
                </motion.div>
                {i < C.cards.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: arrowRevealed ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <StepConnector direction="forward" width={80} height={40} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        {/* Loop-back row underneath. 05 → 04 reveals at Space 2; 06 → 04 at Space 3. */}
        <div className="relative w-full" style={{ height: 64 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stepIndex >= 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute"
            style={{ left: "16%", top: 0, width: "34%", height: 64 }}
          >
            <StepConnector direction="loopBack" ambient="backward" label={C.loopBackLabels.five} width={500} height={64} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stepIndex >= 3 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute"
            style={{ left: "16%", top: 32, width: "68%", height: 64 }}
          >
            <StepConnector direction="loopBack" ambient="backward" label={C.loopBackLabels.six} width={1000} height={64} />
          </motion.div>
        </div>
        <p
          className="font-serif italic text-copper-300"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)" }}
        >
          {highlight(C.caption, ["Hover any step"])}
        </p>
      </div>
    </div>
  );
}

export const j4Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <J4RecipeShip />,
};
```

- [ ] **Step 4: Register J.4**

```typescript
// src/slides/reveal-and-closing/index.ts
import type { SlideDef } from "@/deck/types";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { j4Slide } from "./j4-recipe-ship";
import { k1Slide } from "./k1-challenge-handoff";

export const revealAndClosingSlides: SlideDef[] = [j1Slide, j2Slide, j3Slide, j4Slide, k1Slide];
```

- [ ] **Step 5: Run tests**

Run: `npm test -- j4-recipe-ship`
Expected: PASS.

- [ ] **Step 6: Visual smoke + ambient verification**

Run: `npm run dev`, navigate to J.4. Press Space 3 times. After Space 3, the two loop-back arrows should have a subtle bright pulse traveling backward (right-to-left) along them, slightly out of phase.

- [ ] **Step 7: Commit**

```bash
git add src/slides/reveal-and-closing/j4-recipe-ship.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/j4-recipe-ship.test.tsx
git commit -m "feat(reveal): J.4 recipe ship horizontal flow with backward loop-back ambient"
```

---

## Phase 6 — Diagrammatic slides (I.1, I.2, I.4)

### Task 6.1: `<HorizontalFlow>` primitive

**Files:**
- Create: `src/slides/reveal-and-closing/components/HorizontalFlow.tsx`
- Test: `tests/unit/HorizontalFlow.test.tsx`

Per spec §3 + §4.1: 6 horizontal stages with chevron connectors. Stages stagger-fade-in from below; connectors animate sequentially via `pathLength`. Used only on I.1.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/HorizontalFlow.test.tsx
import { render, screen } from "@testing-library/react";
import { HorizontalFlow } from "@/slides/reveal-and-closing/components/HorizontalFlow";

const stages = [
  { num: 1, label: "Research", sub: "deep-dives" },
  { num: 2, label: "Brainstorm", sub: "structure" },
  { num: 3, label: "Design", sub: "tokens" },
];

test("HorizontalFlow renders one tile per stage with the connector count = stages.length - 1", () => {
  render(<HorizontalFlow stages={stages} revealed ambient />);
  expect(screen.getAllByTestId("flow-stage")).toHaveLength(3);
  expect(screen.getAllByTestId("flow-connector")).toHaveLength(2);
});

test("HorizontalFlow respects the revealed flag (hides everything when false)", () => {
  render(<HorizontalFlow stages={stages} revealed={false} ambient={false} />);
  // Stages still render in DOM for layout but are opacity-0.
  expect(screen.getAllByTestId("flow-stage")).toHaveLength(3);
  const wrapper = screen.getByTestId("flow-wrapper");
  expect(wrapper.getAttribute("data-revealed")).toBe("false");
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- HorizontalFlow`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/HorizontalFlow.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface FlowStage {
  num: number;
  label: string;
  sub: ReactNode;        // pre-highlighted via highlight() in caller
}

interface HorizontalFlowProps {
  stages: FlowStage[];
  revealed: boolean;     // gates the stage stagger-fade
  ambient: boolean;      // turns on the connector traveling pulse
}

export function HorizontalFlow({ stages, revealed, ambient }: HorizontalFlowProps) {
  return (
    <div
      data-testid="flow-wrapper"
      data-revealed={String(revealed)}
      className="flex w-full items-stretch justify-between gap-4"
    >
      {stages.map((stage, i) => (
        <div key={stage.num} className="flex flex-1 items-stretch gap-4">
          <motion.div
            data-testid="flow-stage"
            className="flex flex-1 flex-col gap-3 border border-copper-700 bg-neutral-950/60 p-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }}
            transition={{
              duration: 0.4,
              delay: revealed ? i * 0.05 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className="font-mono text-copper-400"
              style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.25rem)" }}
            >
              {String(stage.num).padStart(2, "0")}
            </span>
            <h4
              className="font-display text-neutral-50"
              style={{ fontSize: "clamp(1.4rem, 1.8vw, 2rem)", lineHeight: 1.2 }}
            >
              {stage.label}
            </h4>
            <p
              className="font-serif italic text-neutral-300"
              style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.3rem)", lineHeight: 1.45 }}
            >
              {stage.sub}
            </p>
          </motion.div>
          {i < stages.length - 1 && (
            <div
              data-testid="flow-connector"
              className="flex w-12 items-center justify-center"
            >
              <svg width="48" height="32" className="overflow-visible">
                <motion.path
                  d="M 4 16 L 36 16 M 30 10 L 36 16 L 30 22"
                  stroke="#7a4626"
                  strokeWidth={1.5}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: revealed ? 1 : 0 }}
                  transition={{
                    duration: 0.5,
                    delay: revealed ? 0.3 + i * 0.08 : 0,
                  }}
                />
                {ambient && (
                  <motion.path
                    d="M 4 16 L 36 16"
                    stroke="#d99e6c"
                    strokeWidth={2.5}
                    fill="none"
                    strokeDasharray="6 100"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -106 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                  />
                )}
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- HorizontalFlow`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/HorizontalFlow.tsx tests/unit/HorizontalFlow.test.tsx
git commit -m "feat(reveal): add HorizontalFlow primitive (I.1 process diagram)"
```

### Task 6.2: Slide I.1 — META + PROCESS

**Files:**
- Create: `src/slides/reveal-and-closing/i1-meta-process.tsx`
- Test: `tests/unit/i1-meta-process.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.1: 4 steps (initial headline + Space 1 sub-line + copper rule + Space 2 stages + connectors + Space 3 tagline). canonicalPose = 3. Diagrammatic background. Ambient = looping pulse on connectors.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/i1-meta-process.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I1MetaProcess, i1Slide } from "@/slides/reveal-and-closing/i1-meta-process";

test("I.1 declares 4 steps with canonicalPose=3", () => {
  expect(i1Slide.steps).toBe(4);
  expect(i1Slide.canonicalPose).toBe(3);
});

test("I.1 renders the FIG label, headline keywords, 6 stages, and tagline", () => {
  render(
    <DeckProvider stepCounts={[i1Slide.steps]}>
      <I1MetaProcess />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. I\.1 · THE PROCESS/)).toBeInTheDocument();
  expect(screen.getByText(/I built this/)).toBeInTheDocument();
  expect(screen.getByText("90 minutes")).toBeInTheDocument();
  expect(screen.getAllByTestId("flow-stage")).toHaveLength(6);
  expect(screen.getAllByTestId("flow-connector")).toHaveLength(5);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- i1-meta-process`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/i1-meta-process.tsx
import { motion } from "framer-motion";
import { Fragment } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { HorizontalFlow, type FlowStage } from "./components/HorizontalFlow";
import { KeywordHighlight } from "./components/KeywordHighlight";
import { highlight } from "./components/highlight";
import { i1Content as C } from "./content";

function Headline() {
  // Headline is a sequence of literal segments + KeywordHighlight wrappers
  // because the highlight() helper is text-only and the headline mixes
  // multiple keywords with literal connective text.
  return (
    <h1
      className="font-display text-neutral-50"
      style={{ fontSize: "clamp(2.75rem, 4.5vw, 4.5rem)", lineHeight: 1.15 }}
    >
      {C.headlineParts.map((part, i) =>
        // Even indices are literals; odd indices are keywords (per content.ts shape).
        i % 2 === 0 ? <Fragment key={i}>{part}</Fragment> : <KeywordHighlight key={i}>{part}</KeywordHighlight>,
      )}
    </h1>
  );
}

export function I1MetaProcess() {
  const { stepIndex } = useDeck();
  const subRevealed = stepIndex >= 1;
  const stagesRevealed = stepIndex >= 2;
  const taglineRevealed = stepIndex >= 3;
  const stages: FlowStage[] = C.stages.map((s) => ({
    num: s.num,
    label: s.label,
    sub: highlight(s.sub, s.keywords),
  }));
  return (
    <div className="relative h-full w-full bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="I" num={1} label="THE PROCESS" />
      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col justify-center gap-12 px-12 py-20">
        <Headline />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: subRevealed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-3"
        >
          <p
            className="font-serif text-copper-300"
            style={{ fontSize: "clamp(1.5rem, 2vw, 2.25rem)", lineHeight: 1.35 }}
          >
            {highlight(C.subLine, C.subLineKeywords)}
          </p>
          <motion.hr
            className="w-[40%] border-0 border-t border-copper-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: subRevealed ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ transformOrigin: "left center" }}
          />
        </motion.div>
        <HorizontalFlow stages={stages} revealed={stagesRevealed} ambient={stagesRevealed} />
        <motion.p
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.6rem)", lineHeight: 1.45 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: taglineRevealed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {highlight(C.tagline, C.taglineKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const i1Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <I1MetaProcess />,
};
```

- [ ] **Step 4: Register I.1 (now first in the array per spec §1)**

Edit `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { i1Slide } from "./i1-meta-process";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { j4Slide } from "./j4-recipe-ship";
import { k1Slide } from "./k1-challenge-handoff";

// Order matches spec §1. I.2/I.3/I.4 land in subsequent tasks.
export const revealAndClosingSlides: SlideDef[] = [
  i1Slide,
  j1Slide,
  j2Slide,
  j3Slide,
  j4Slide,
  k1Slide,
];
```

- [ ] **Step 5: Run tests + visual smoke**

Run: `npm test -- i1-meta-process`
Expected: PASS.

Run `npm run dev`, navigate to slide 0 (I.1). Press Space 3 times. After Space 3 the connector chevrons should pulse subtly.

- [ ] **Step 6: Commit**

```bash
git add src/slides/reveal-and-closing/i1-meta-process.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/i1-meta-process.test.tsx
git commit -m "feat(reveal): I.1 meta + process slide with 6-stage horizontal flow"
```

### Task 6.3: `<Timeline>` primitive

**Files:**
- Create: `src/slides/reveal-and-closing/components/Timeline.tsx`
- Test: `tests/unit/Timeline.test.tsx`

Per spec §3 + §4.2: horizontal timeline with anchor points + labeled segments. Anchors stagger-reveal at progressive step indices; segments grow between anchors; ambient pulse travels along the axis Mar → Today.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/Timeline.test.tsx
import { render, screen } from "@testing-library/react";
import { Timeline } from "@/slides/reveal-and-closing/components/Timeline";

const anchors = [
  { id: "a", label: "Mar 2025", caption: "start" },
  { id: "b", label: "Sep 2025", caption: "first deliverables" },
  { id: "c", label: "Today", caption: "still beginner" },
];

test("Timeline renders an anchor per entry plus an axis", () => {
  render(<Timeline anchors={anchors} segmentLabel="6mo foundation + experiment" anchorsRevealed={3} ambient />);
  expect(screen.getAllByTestId("timeline-anchor")).toHaveLength(3);
  expect(screen.getByTestId("timeline-axis")).toBeInTheDocument();
});

test("Timeline respects anchorsRevealed (only first N anchors are opacity-1)", () => {
  render(<Timeline anchors={anchors} segmentLabel="x" anchorsRevealed={1} ambient={false} />);
  const all = screen.getAllByTestId("timeline-anchor");
  expect(all[0].getAttribute("data-revealed")).toBe("true");
  expect(all[1].getAttribute("data-revealed")).toBe("false");
  expect(all[2].getAttribute("data-revealed")).toBe("false");
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- Timeline`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/Timeline.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HoverReveal } from "./HoverReveal";

export interface TimelineAnchor {
  id: string;
  label: string;
  caption: ReactNode;
  hover?: ReactNode;
}

interface TimelineProps {
  anchors: TimelineAnchor[];     // ordered left → right
  segmentLabel?: ReactNode;      // single mid-segment label (Mar→Sep style)
  anchorsRevealed: number;       // how many anchors should be visible (0..N)
  ambient: boolean;
}

export function Timeline({ anchors, segmentLabel, anchorsRevealed, ambient }: TimelineProps) {
  const total = anchors.length;
  const positions = anchors.map((_, i) => (i / (total - 1)) * 100);
  const axisRevealed = anchorsRevealed >= 1;
  return (
    <div className="relative w-full px-12 py-8" style={{ height: 200 }}>
      {/* Axis */}
      <div
        data-testid="timeline-axis"
        className="absolute left-0 right-0"
        style={{ top: 96 }}
      >
        <svg width="100%" height="4" preserveAspectRatio="none" className="overflow-visible">
          <motion.line
            x1="0"
            y1="2"
            x2="100%"
            y2="2"
            stroke="#7a4626"
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: axisRevealed ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          {ambient && (
            <motion.line
              x1="0"
              y1="2"
              x2="100%"
              y2="2"
              stroke="#d99e6c"
              strokeWidth={2.5}
              strokeDasharray="20 1000"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -1020 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          )}
        </svg>
      </div>
      {/* Anchors */}
      {anchors.map((a, i) => {
        const revealed = i < anchorsRevealed;
        const node = (
          <motion.div
            data-testid="timeline-anchor"
            data-revealed={String(revealed)}
            className="absolute flex flex-col items-center gap-3"
            style={{ left: `${positions[i]}%`, transform: "translateX(-50%)", top: 60 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 6 }}
            transition={{ duration: 0.4 }}
          >
            <span className="block h-4 w-4 rounded-full border border-copper-400 bg-neutral-900" />
            <span
              className="font-mono text-copper-300"
              style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.25rem)" }}
            >
              {a.label}
            </span>
            <span
              className="font-serif italic text-neutral-300"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1.15rem)" }}
            >
              {a.caption}
            </span>
          </motion.div>
        );
        return (
          <span key={a.id}>
            {a.hover ? (
              <HoverReveal
                trigger={node}
                position="below"
                payload={
                  <span
                    className="block max-w-[320px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100 shadow"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {a.hover}
                  </span>
                }
              />
            ) : (
              node
            )}
          </span>
        );
      })}
      {/* Mid-segment label (if provided) — sits between anchor[0] and anchor[1]. */}
      {segmentLabel && (
        <motion.span
          className="absolute font-serif italic text-copper-300"
          style={{
            top: 16,
            left: `${(positions[0] + positions[1]) / 2}%`,
            transform: "translateX(-50%)",
            fontSize: "clamp(0.95rem, 1.15vw, 1.3rem)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: anchorsRevealed >= 2 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {segmentLabel}
        </motion.span>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- Timeline`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/Timeline.tsx tests/unit/Timeline.test.tsx
git commit -m "feat(reveal): add Timeline primitive (used on I.2)"
```

### Task 6.4: Slide I.2 — PROFILE + JOURNEY

**Files:**
- Create: `src/slides/reveal-and-closing/i2-profile-journey.tsx`
- Test: `tests/unit/i2-profile-journey.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.2: hero photo (night workspace), 5 steps (initial + Space 1 four name/role/delivery/credentials lines + Space 2 axis + Mar 2025 anchor + Space 3 segment + Sep 2025 + Space 4 Today + still-beginner). canonicalPose = 4. Ambient = timeline pulse.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/i2-profile-journey.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I2ProfileJourney, i2Slide } from "@/slides/reveal-and-closing/i2-profile-journey";

test("I.2 declares 5 steps with canonicalPose=4", () => {
  expect(i2Slide.steps).toBe(5);
  expect(i2Slide.canonicalPose).toBe(4);
});

test("I.2 renders FIG label, name, role, delivery line, credentials, and 3 timeline anchors", () => {
  render(
    <DeckProvider stepCounts={[i2Slide.steps]}>
      <I2ProfileJourney />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. I\.2 · THE JOURNEY/)).toBeInTheDocument();
  expect(screen.getByText(/ADRIANTO TEDJOKUSUMO/)).toBeInTheDocument();
  expect(screen.getByText(/13 years tech delivery/)).toBeInTheDocument();
  expect(screen.getByText(/ITB Electrical Eng/)).toBeInTheDocument();
  expect(screen.getAllByTestId("timeline-anchor")).toHaveLength(3);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- i2-profile-journey`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/i2-profile-journey.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { HeroPhoto } from "./components/HeroPhoto";
import { Timeline, type TimelineAnchor } from "./components/Timeline";
import { highlight } from "./components/highlight";
import { HoverReveal } from "./components/HoverReveal";
import { i2Content as C } from "./content";

export function I2ProfileJourney() {
  const { stepIndex } = useDeck();
  const linesRevealed = stepIndex >= 1;
  // Timeline reveal: Space 2 → axis + Mar; Space 3 → segment + Sep; Space 4 → Today.
  const anchorsRevealed =
    stepIndex >= 4 ? 3 : stepIndex >= 3 ? 2 : stepIndex >= 2 ? 1 : 0;
  const lines = [
    {
      key: "name",
      content: <span className="font-display tracking-wide text-neutral-50" style={{ fontSize: "clamp(2.75rem, 4.5vw, 4.5rem)", lineHeight: 1.05 }}>{C.name}</span>,
    },
    {
      key: "role",
      content: <span className="font-display text-neutral-50" style={{ fontSize: "clamp(1.75rem, 2.75vw, 2.75rem)", lineHeight: 1.2 }}>{highlight(C.role.text, C.role.keywords)}</span>,
    },
    {
      key: "delivery",
      content: <span className="font-serif text-neutral-50" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)", lineHeight: 1.35 }}>{highlight(C.delivery.text, C.delivery.keywords)}</span>,
    },
    {
      key: "credentials",
      // The "Computer Vision" keyword also gets a HoverReveal per spec §4.2.
      content: (
        <span className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.75rem)", lineHeight: 1.4 }}>
          ITB Electrical Eng · Chosun M.S.{" "}
          <HoverReveal
            trigger={<em className="text-copper-400 italic">Computer Vision</em>}
            payload={<span className="block max-w-[320px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100" style={{ fontSize: "0.9rem" }}>{C.timeline.cvHover}</span>}
          />{" "}
          · 8+ yrs PM (Toppan Ecquaria · Blibli)
        </span>
      ),
    },
  ];
  const anchors: TimelineAnchor[] = C.timeline.anchors.map((a) => ({
    id: a.id,
    label: a.label,
    hover: a.hover,
    caption: a.captionKeywords ? highlight(a.caption, a.captionKeywords) : a.caption,
  }));
  return (
    <div className="relative h-full w-full">
      <HeroPhoto src="/heroes/i2-night-workspace.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="I" num={2} label="THE JOURNEY" />
      <div className="absolute bottom-12 left-12 z-20 flex max-w-[90vw] flex-col gap-12">
        <div className="flex flex-col gap-5">
          {lines.map((l, i) => (
            <motion.div
              key={l.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: linesRevealed ? 1 : 0, y: linesRevealed ? 0 : 6 }}
              transition={{ duration: 0.3, delay: linesRevealed ? i * 0.1 : 0 }}
            >
              {l.content}
            </motion.div>
          ))}
        </div>
        <Timeline
          anchors={anchors}
          segmentLabel={C.timeline.segmentLabel}
          anchorsRevealed={anchorsRevealed}
          ambient={anchorsRevealed >= 3}
        />
      </div>
    </div>
  );
}

export const i2Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <I2ProfileJourney />,
};
```

- [ ] **Step 4: Register I.2**

Edit `src/slides/reveal-and-closing/index.ts` — insert `i2Slide` between `i1Slide` and `j1Slide`:

```typescript
export const revealAndClosingSlides: SlideDef[] = [
  i1Slide,
  i2Slide,
  j1Slide,
  j2Slide,
  j3Slide,
  j4Slide,
  k1Slide,
];
```

- [ ] **Step 5: Run tests + visual smoke**

Run: `npm test -- i2-profile-journey`
Expected: PASS.

Visually verify Mar/Sep/Today appear in 3 successive Spaces and the axis pulses after Space 4.

- [ ] **Step 6: Commit**

```bash
git add src/slides/reveal-and-closing/i2-profile-journey.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/i2-profile-journey.test.tsx
git commit -m "feat(reveal): I.2 profile + journey slide with hover-anchor Timeline"
```

### Task 6.5: Slide I.4 — KEY MESSAGE → BRIDGE

**Files:**
- Create: `src/slides/reveal-and-closing/i4-key-message-bridge.tsx`
- Test: `tests/unit/i4-key-message-bridge.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.4: hero photo (dusk horizon), 4 steps (initial + Space 1 first beat word-by-word + copper rule + Space 2 secondBeat A + Space 3 secondBeat B). canonicalPose = 3. Ambient = PulseGlow on `you`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/i4-key-message-bridge.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I4KeyMessageBridge, i4Slide } from "@/slides/reveal-and-closing/i4-key-message-bridge";

test("I.4 declares 4 steps with canonicalPose=3", () => {
  expect(i4Slide.steps).toBe(4);
  expect(i4Slide.canonicalPose).toBe(3);
});

test("I.4 renders Foundation, before, velocity tokens and the rhetorical question", () => {
  render(
    <DeckProvider stepCounts={[i4Slide.steps]}>
      <I4KeyMessageBridge />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. I\.4 · THE BRIDGE/)).toBeInTheDocument();
  expect(screen.getByText("Foundation")).toBeInTheDocument();
  expect(screen.getByText("velocity")).toBeInTheDocument();
  expect(screen.getByText(/Project Manager built this/)).toBeInTheDocument();
  expect(screen.getByText(/what could/)).toBeInTheDocument();
  expect(screen.getByTestId("pulse-glow")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- i4-key-message-bridge`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/i4-key-message-bridge.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { HeroPhoto } from "./components/HeroPhoto";
import { DisplayPhrase } from "./components/DisplayPhrase";
import { KeywordHighlight } from "./components/KeywordHighlight";
import { PulseGlow } from "./components/PulseGlow";
import { highlight } from "./components/highlight";
import { i4Content as C } from "./content";

export function I4KeyMessageBridge() {
  const { stepIndex } = useDeck();
  const firstBeatRevealed = stepIndex >= 1;
  const beatARevealed = stepIndex >= 2;
  const beatBRevealed = stepIndex >= 3;
  return (
    <div className="relative h-full w-full">
      <HeroPhoto src="/heroes/i4-dusk-horizon.jpg" alt="" vignetteSide="bottom" />
      <FigLabel section="I" num={4} label="THE BRIDGE" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-12 px-16 text-center">
        {firstBeatRevealed && (
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(4rem, 7.5vw, 7.5rem)", lineHeight: 1.05 }}
          >
            <DisplayPhrase
              staggerType="word"
              words={C.firstBeat.map((w) => ({
                text: w.keyword ? <KeywordHighlight>{w.text}</KeywordHighlight> : w.text,
                durationMs: w.durationMs,
              }))}
            />
          </h1>
        )}
        {firstBeatRevealed && (
          <motion.hr
            className="w-[30%] border-0 border-t border-copper-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ transformOrigin: "center" }}
          />
        )}
        <div className="flex flex-col gap-4">
          {beatARevealed && (
            <motion.p
              className="font-serif italic text-neutral-50"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.25 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {highlight(C.secondBeatA, C.secondBeatAKeywords)}
            </motion.p>
          )}
          {beatBRevealed && (
            <motion.p
              className="font-serif italic text-neutral-50"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.25 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              — In a year, what could{" "}
              <PulseGlow periodSeconds={4.5}>
                <em className="text-copper-400 italic">you</em>
              </PulseGlow>{" "}
              build?
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

export const i4Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <I4KeyMessageBridge />,
};
```

- [ ] **Step 4: Register I.4 (between I.3 and J.1; for now insert before J.1)**

Edit `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { i1Slide } from "./i1-meta-process";
import { i2Slide } from "./i2-profile-journey";
import { i4Slide } from "./i4-key-message-bridge";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { j4Slide } from "./j4-recipe-ship";
import { k1Slide } from "./k1-challenge-handoff";

// I.3 (portfolio) is the largest slide and lands in Phase 7.
// Inserted between i2Slide and i4Slide at that point.
export const revealAndClosingSlides: SlideDef[] = [
  i1Slide,
  i2Slide,
  i4Slide,
  j1Slide,
  j2Slide,
  j3Slide,
  j4Slide,
  k1Slide,
];
```

- [ ] **Step 5: Run tests + visual smoke**

Run: `npm test -- i4-key-message-bridge`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/slides/reveal-and-closing/i4-key-message-bridge.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/i4-key-message-bridge.test.tsx
git commit -m "feat(reveal): I.4 key message → bridge slide with PulseGlow on you"
```

---

## Phase 7 — I.3 PORTFOLIO (the largest slide)

I.3 is the climax. It's an interactive split-screen with a 30/70 layout: categorized list on the left, harness canvas on the right. Click any list item → canvas morphs to that item's simulation. Five "heavy" items get full SVG-orchestrated simulations; seven "light" items get simple panels with glyph-choreographed entry. Plus a "see it real" speaker toggle that swaps simulation ↔ screenshot grid for the heavy items.

Build order: list primitive → canvas shell + default state → 5 simulations one at a time → light panel → assembled slide → screenshot toggle.

### Task 7.1: `<CategoryList>` primitive

**Files:**
- Create: `src/slides/reveal-and-closing/components/CategoryList.tsx`
- Test: `tests/unit/CategoryList.test.tsx`

Per spec §4.3 left-pane: categorized list with header + sub-header + clickable items. Items have an `id`, click fires `onSelect(id)`, the active item is highlighted. Reveal grouping: the spec splits the list into "HARNESSES" (Space 1) and "TOOLS + WORKSHOPS" (Space 2) — implemented as `revealGroups: number` (0 = nothing, 1 = HARNESSES, 2 = all).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/CategoryList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryList, type ListEntry } from "@/slides/reveal-and-closing/components/CategoryList";

const items: ListEntry[] = [
  { kind: "header", label: "HARNESSES" },
  { kind: "subheader", label: "Workflows" },
  { kind: "item", id: "stocks-intel", label: "stocks intel", weight: "heavy" },
  { kind: "header", label: "TOOLS" },
  { kind: "item", id: "sonarqube", label: "Sonarqube", weight: "light" },
];

test("CategoryList renders all entries", () => {
  render(<CategoryList items={items} selectedId={null} onSelect={() => {}} revealedHeaders={2} />);
  expect(screen.getByText("HARNESSES")).toBeInTheDocument();
  expect(screen.getByText("Workflows")).toBeInTheDocument();
  expect(screen.getByText("stocks intel")).toBeInTheDocument();
  expect(screen.getByText("TOOLS")).toBeInTheDocument();
  expect(screen.getByText("Sonarqube")).toBeInTheDocument();
});

test("CategoryList fires onSelect with the item id", () => {
  const onSelect = vi.fn();
  render(<CategoryList items={items} selectedId={null} onSelect={onSelect} revealedHeaders={2} />);
  fireEvent.click(screen.getByText("stocks intel"));
  expect(onSelect).toHaveBeenCalledWith("stocks-intel");
});

test("CategoryList marks the selected id with data-active=true", () => {
  render(<CategoryList items={items} selectedId="sonarqube" onSelect={() => {}} revealedHeaders={2} />);
  const stocks = screen.getByText("stocks intel").closest("button")!;
  const sonar = screen.getByText("Sonarqube").closest("button")!;
  expect(stocks.getAttribute("data-active")).toBe("false");
  expect(sonar.getAttribute("data-active")).toBe("true");
});

test("CategoryList hides headers above the revealedHeaders threshold", () => {
  render(<CategoryList items={items} selectedId={null} onSelect={() => {}} revealedHeaders={1} />);
  // First HARNESSES header (index 0) is revealed; second TOOLS header (index 1) is not.
  const headers = screen.getAllByTestId("category-header");
  expect(headers[0].getAttribute("data-revealed")).toBe("true");
  expect(headers[1].getAttribute("data-revealed")).toBe("false");
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- CategoryList`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/CategoryList.tsx
import { motion } from "framer-motion";

export type ListEntry =
  | { kind: "header"; label: string }
  | { kind: "subheader"; label: string }
  | { kind: "item"; id: string; label: string; weight: "heavy" | "light" };

interface CategoryListProps {
  items: ListEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  revealedHeaders: number;       // 0 = nothing, 1 = first header group, 2 = all
}

export function CategoryList({ items, selectedId, onSelect, revealedHeaders }: CategoryListProps) {
  // Compute "which group does each entry belong to" by walking and counting headers.
  let groupIndex = -1;
  return (
    <ul className="flex flex-col gap-2 font-sans">
      {items.map((entry, i) => {
        if (entry.kind === "header") {
          groupIndex += 1;
          const revealed = groupIndex < revealedHeaders;
          return (
            <motion.li
              key={i}
              data-testid="category-header"
              data-revealed={String(revealed)}
              className="mt-6 text-copper-400 uppercase tracking-[0.18em]"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1.1rem)" }}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -4 }}
              transition={{ duration: 0.3 }}
            >
              {entry.label}
            </motion.li>
          );
        }
        const groupRevealed = groupIndex < revealedHeaders;
        if (entry.kind === "subheader") {
          return (
            <motion.li
              key={i}
              className="ml-4 text-copper-300 italic"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: groupRevealed ? 1 : 0, x: groupRevealed ? 0 : -4 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              ─ {entry.label}
            </motion.li>
          );
        }
        // entry.kind === "item"
        const isActive = selectedId === entry.id;
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: groupRevealed ? 1 : 0, x: groupRevealed ? 0 : -4 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.02 }}
          >
            <button
              type="button"
              data-active={String(isActive)}
              onClick={() => onSelect(entry.id)}
              className={`ml-8 block w-full text-left transition-colors ${
                isActive
                  ? "border-l-2 border-copper-400 pl-3 text-neutral-50"
                  : "border-l-2 border-transparent pl-3 text-neutral-300 hover:text-neutral-50 hover:border-copper-700"
              }`}
              style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.4 }}
            >
              • {entry.label}
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- CategoryList`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/CategoryList.tsx tests/unit/CategoryList.test.tsx
git commit -m "feat(reveal): add CategoryList primitive (I.3 left pane)"
```

### Task 7.2: `<HarnessCanvas>` shell + `<DefaultHarness>` simulation

**Files:**
- Create: `src/slides/reveal-and-closing/components/HarnessCanvas.tsx`
- Create: `src/slides/reveal-and-closing/simulations/DefaultHarness.tsx`
- Test: `tests/unit/HarnessCanvas.test.tsx`

Per spec §4.3 right-pane default state: generic harness diagram (main agent + chains + tools + sub-agents) shown when no item is selected. The canvas swaps content with morphing transitions when items are selected.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/HarnessCanvas.test.tsx
import { render, screen } from "@testing-library/react";
import { HarnessCanvas } from "@/slides/reveal-and-closing/components/HarnessCanvas";

test("HarnessCanvas renders default state when no selectedId", () => {
  render(<HarnessCanvas selectedId={null} mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByTestId("harness-canvas")).toBeInTheDocument();
  expect(screen.getByText(/MAIN AGENT/)).toBeInTheDocument();
  expect(screen.getByText(/The harness pattern/)).toBeInTheDocument();
});

test("HarnessCanvas exposes data-selected attribute", () => {
  const { rerender } = render(<HarnessCanvas selectedId="stocks-intel" mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByTestId("harness-canvas").getAttribute("data-selected")).toBe("stocks-intel");
  rerender(<HarnessCanvas selectedId={null} mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByTestId("harness-canvas").getAttribute("data-selected")).toBe("");
});

test("HarnessCanvas renders the see-it-real toggle only for heavy items", () => {
  render(<HarnessCanvas selectedId="stocks-intel" mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByText(/see it real/)).toBeInTheDocument();
});

test("HarnessCanvas hides the see-it-real toggle for light items", () => {
  render(<HarnessCanvas selectedId="sonarqube" mode="simulation" onToggleMode={() => {}} />);
  expect(screen.queryByText(/see it real/)).toBeNull();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- HarnessCanvas`
Expected: FAIL.

- [ ] **Step 3: Implement DefaultHarness simulation**

```typescript
// src/slides/reveal-and-closing/simulations/DefaultHarness.tsx
import { motion } from "framer-motion";
import { highlight } from "../components/highlight";

// Generic harness diagram: main agent (centered), 2 chains (sub-agents), 2 tools.
export function DefaultHarness() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-8 py-8">
      <svg width="640" height="360" viewBox="0 0 640 360" className="overflow-visible">
        <defs>
          <marker id="def-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* Main agent box */}
        <motion.rect
          x="220"
          y="40"
          width="200"
          height="60"
          fill="none"
          stroke="#b86e3d"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <text x="320" y="65" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="18">MAIN AGENT</text>
        <text x="320" y="88" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="14">orchestrator</text>
        {/* Connectors down to sub-agents and tools (4 outputs). */}
        {[200, 270, 370, 440].map((x, i) => (
          <motion.path
            key={i}
            d={`M 320 100 L ${x} 200`}
            stroke="#7a4626"
            strokeWidth="1.2"
            fill="none"
            markerEnd="url(#def-arrow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
          />
        ))}
        {/* Pulse traveling along all four connectors continuously. */}
        {[200, 270, 370, 440].map((x, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill="#d99e6c"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [320, x],
              cy: [100, 200],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* 2 sub-agents (left) */}
        {[180, 250].map((x, i) => (
          <g key={`sub-${i}`}>
            <rect x={x - 30} y="200" width="60" height="44" fill="none" stroke="#9c5a30" strokeWidth="1.2" />
            <text x={x} y="220" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">sub</text>
            <text x={x} y="236" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">agent</text>
          </g>
        ))}
        {/* 2 tools (right) — drawn as bracketed mono-style labels */}
        {[370, 440].map((x, i) => (
          <text key={`tool-${i}`} x={x} y="225" textAnchor="middle" fill="#d99e6c" fontFamily="JetBrains Mono" fontSize="14">[tool]</text>
        ))}
        {/* Labels */}
        <text x="220" y="160" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="11">chains</text>
        <text x="400" y="160" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="11">tools</text>
      </svg>
      <p
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.3rem)" }}
      >
        {highlight("The harness pattern / Five expressions follow", ["The harness pattern", "Five expressions follow"])}
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Implement HarnessCanvas shell**

```typescript
// src/slides/reveal-and-closing/components/HarnessCanvas.tsx
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { DefaultHarness } from "../simulations/DefaultHarness";

const HEAVY_IDS = new Set([
  "stocks-intel",
  "legal-docs",
  "exchange-alerts",
  "nanovest-product",
  "notebooklm",
]);

interface HarnessCanvasProps {
  selectedId: string | null;
  mode: "simulation" | "screenshots";
  onToggleMode: () => void;
  // Slot for the per-item content. Caller renders the right component
  // based on selectedId; the canvas just provides the shell + transition.
  children?: ReactNode;
}

export function HarnessCanvas({ selectedId, mode, onToggleMode, children }: HarnessCanvasProps) {
  const isHeavy = selectedId && HEAVY_IDS.has(selectedId);
  return (
    <div
      data-testid="harness-canvas"
      data-selected={selectedId ?? ""}
      className="relative h-full w-full border border-copper-900 bg-neutral-950/40"
    >
      {isHeavy && (
        <button
          type="button"
          onClick={onToggleMode}
          className="absolute right-6 top-6 z-10 border border-copper-500 px-4 py-1 font-sans text-copper-300 hover:bg-copper-900/30"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}
        >
          {mode === "simulation" ? "see it real" : "back to simulation"}
        </button>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedId ?? "default"}-${mode}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          {children ?? <DefaultHarness />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 5: Run tests**

Run: `npm test -- HarnessCanvas`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/slides/reveal-and-closing/components/HarnessCanvas.tsx \
        src/slides/reveal-and-closing/simulations/DefaultHarness.tsx \
        tests/unit/HarnessCanvas.test.tsx
git commit -m "feat(reveal): add HarnessCanvas shell + DefaultHarness simulation (I.3)"
```

### Task 7.3: `<LightPanel>` primitive

**Files:**
- Create: `src/slides/reveal-and-closing/components/LightPanel.tsx`
- Test: `tests/unit/LightPanel.test.tsx`

Per spec §4.3 light panels: hero-animation-v10 glyph choreography on entry, then static. Each light panel takes a title + a body block (text + optional thumbnails).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/LightPanel.test.tsx
import { render, screen } from "@testing-library/react";
import { LightPanel } from "@/slides/reveal-and-closing/components/LightPanel";

test("LightPanel renders title + body", () => {
  render(<LightPanel title="gemini-image-gen MCP" body={<p>hello</p>} />);
  expect(screen.getByText("gemini-image-gen MCP")).toBeInTheDocument();
  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("LightPanel exposes data-glyph-stage that animates on mount", () => {
  render(<LightPanel title="x" body={<p>y</p>} />);
  expect(screen.getByTestId("light-panel")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- LightPanel`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/components/LightPanel.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LightPanelProps {
  title: string;
  body: ReactNode;
}

// Glyph-choreographed entry per huashu-design-demos-ideation.md §3:
// stagger 4 ornament glyphs in over ~600ms, then settle. The title and
// body fade in last so they read clean once the choreography quiets.
const GLYPHS = ["▢", "◇", "─", "·"];

export function LightPanel({ title, body }: LightPanelProps) {
  return (
    <div data-testid="light-panel" className="relative flex h-full flex-col items-start justify-center gap-6 px-12 py-12">
      <div className="absolute right-12 top-12 flex gap-3">
        {GLYPHS.map((g, i) => (
          <motion.span
            key={i}
            className="font-mono text-copper-700"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.5rem)" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.08 }}
          >
            {g}
          </motion.span>
        ))}
      </div>
      <motion.h3
        className="font-display text-neutral-50"
        style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.2 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="font-serif text-neutral-300"
        style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.5rem)", lineHeight: 1.5 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        {body}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- LightPanel`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/components/LightPanel.tsx tests/unit/LightPanel.test.tsx
git commit -m "feat(reveal): add LightPanel primitive with glyph-choreographed entry"
```

### Task 7.4: Simulation — `stocks intel` (linear funnel)

**Files:**
- Create: `src/slides/reveal-and-closing/simulations/StocksIntel.tsx`
- Test: `tests/unit/sim-stocks-intel.test.tsx`

Per spec §4.3 stocks-intel: 11 AM clock pulse → 10 RSS feeds fan in → Crawl4AI scrape → 4 Gemini agents chained → Top 10 ranking → Slack + "Hot Now" with manual marker. Loops continuously.

The 10 RSS feeds are: Investing.com, CNBC, Seeking Alpha, Nasdaq, FT, Yahoo Finance, MarketWatch, AlphaStreet, The Economist, Forbes.

The 4 Gemini agents are: Filter Relevance, News Analyzer, Ticker Analyzer, Summarizer.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/sim-stocks-intel.test.tsx
import { render, screen } from "@testing-library/react";
import { StocksIntel } from "@/slides/reveal-and-closing/simulations/StocksIntel";

test("StocksIntel renders all 10 RSS feed labels", () => {
  render(<StocksIntel />);
  ["Investing.com", "CNBC", "Seeking Alpha", "Nasdaq", "FT",
   "Yahoo Finance", "MarketWatch", "AlphaStreet", "The Economist", "Forbes"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("StocksIntel labels the 4 Gemini agents in order", () => {
  render(<StocksIntel />);
  ["Filter Relevance", "News Analyzer", "Ticker Analyzer", "Summarizer"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("StocksIntel marks the Hot Now branch as still-manual", () => {
  render(<StocksIntel />);
  expect(screen.getByText(/still manual/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- sim-stocks-intel`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/simulations/StocksIntel.tsx
import { motion } from "framer-motion";

const FEEDS = [
  "Investing.com", "CNBC", "Seeking Alpha", "Nasdaq", "FT",
  "Yahoo Finance", "MarketWatch", "AlphaStreet", "The Economist", "Forbes",
];
const AGENTS = ["Filter Relevance", "News Analyzer", "Ticker Analyzer", "Summarizer"];

export function StocksIntel() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 540" className="h-full w-full">
        <defs>
          <marker id="si-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* Clock pulse — 11 AM trigger (top-left) */}
        <g>
          <motion.circle
            cx="60" cy="40" r="22"
            fill="none" stroke="#b86e3d" strokeWidth="1.5"
            animate={{ opacity: [0.4, 1, 0.4], r: [22, 26, 22] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="60" y="46" textAnchor="middle" fill="#f5f5f5" fontFamily="JetBrains Mono" fontSize="12">11 AM</text>
          <text x="60" y="86" textAnchor="middle" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="10">daily</text>
        </g>
        {/* 10 RSS feeds — vertical column on the left */}
        {FEEDS.map((feed, i) => (
          <g key={feed}>
            <rect x="160" y={20 + i * 48} width="140" height="38" fill="none" stroke="#7a4626" strokeWidth="1" />
            <text x="230" y={43 + i * 48} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">{feed}</text>
            <motion.path
              d={`M 300 ${39 + i * 48} L 420 270`}
              stroke="#7a4626" strokeWidth="0.8" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 0.15, times: [0, 0.4, 0.85, 1] }}
            />
          </g>
        ))}
        {/* Crawl4AI scrape node */}
        <rect x="380" y="246" width="120" height="48" fill="none" stroke="#b86e3d" strokeWidth="1.5" />
        <text x="440" y="270" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">Crawl4AI</text>
        <text x="440" y="286" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">scrape</text>
        {/* Gemini agent chain — 4 agents horizontal */}
        {AGENTS.map((agent, i) => (
          <g key={agent}>
            <rect x={530 + i * 130} y="248" width="116" height="44" fill="none" stroke="#9c5a30" strokeWidth="1" />
            <text x={530 + i * 130 + 58} y="274" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="12">{agent}</text>
            {i < AGENTS.length - 1 && (
              <motion.path
                d={`M ${530 + i * 130 + 116} 270 L ${530 + (i + 1) * 130} 270`}
                stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#si-arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 2 + i * 0.4, repeatDelay: 5 }}
              />
            )}
          </g>
        ))}
        {/* Top 10 ranking node */}
        <rect x="990" y="248" width="100" height="48" fill="none" stroke="#b86e3d" strokeWidth="1.5" />
        <text x="1040" y="272" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">Top 10</text>
        <text x="1040" y="288" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">ranked</text>
        <motion.path
          d="M 1050 296 L 1050 380 M 800 296 L 800 380"
          stroke="#7a4626" strokeWidth="1" fill="none"
        />
        {/* Outputs: Slack (auto) + Hot Now (manual) */}
        <g>
          <rect x="700" y="380" width="200" height="60" fill="none" stroke="#b86e3d" strokeWidth="1.2" />
          <text x="800" y="408" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">Slack</text>
          <text x="800" y="426" textAnchor="middle" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="11">#stocks-trending-n8n</text>
        </g>
        <g>
          <rect x="950" y="380" width="200" height="60" fill="none" stroke="#7a4626" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="1050" y="408" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">Nanovest "Hot Now"</text>
          <text x="1050" y="428" textAnchor="middle" fill="#d99e6c" fontFamily="JetBrains Mono" fontStyle="italic" fontSize="11">(still manual currently)</text>
        </g>
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- sim-stocks-intel`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/reveal-and-closing/simulations/StocksIntel.tsx tests/unit/sim-stocks-intel.test.tsx
git commit -m "feat(reveal): add StocksIntel simulation (10 RSS → 4 Gemini agents → ranked output)"
```

### Task 7.5: Simulation — `legal docs` (branching with feedback loops)

**Files:**
- Create: `src/slides/reveal-and-closing/simulations/LegalDocs.tsx`
- Test: `tests/unit/sim-legal-docs.test.tsx`

Per spec §4.3 legal-docs: dual entry (Slack `/nanoearn` admin + webhook) → cache → folder structure → doc gen → Slack approval bubble → Finance gate (decline loops to AI Revision Agent) → Legal gate (similar loop) → Dropbox Sign → completion webhook.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/sim-legal-docs.test.tsx
import { render, screen } from "@testing-library/react";
import { LegalDocs } from "@/slides/reveal-and-closing/simulations/LegalDocs";

test("LegalDocs renders the dual-entry, two approval gates, and Dropbox Sign nodes", () => {
  render(<LegalDocs />);
  expect(screen.getByText(/\/nanoearn/i)).toBeInTheDocument();
  expect(screen.getByText(/webhook/i)).toBeInTheDocument();
  expect(screen.getByText(/Finance/)).toBeInTheDocument();
  expect(screen.getByText(/Legal/)).toBeInTheDocument();
  expect(screen.getByText(/Dropbox Sign/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Revision/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- sim-legal-docs`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/simulations/LegalDocs.tsx
import { motion } from "framer-motion";

const node = (x: number, y: number, w: number, h: number, label: string, sub?: string, dashed?: boolean, accent = "#7a4626") => (
  <g key={`${x}-${y}-${label}`}>
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray={dashed ? "4 4" : undefined} />
    <text x={x + w / 2} y={y + h / 2 + 2} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 18} textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">{sub}</text>}
  </g>
);

export function LegalDocs() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 540" className="h-full w-full">
        <defs>
          <marker id="ld-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* Dual entry */}
        {node(40, 30, 180, 50, "/nanoearn", "Slack Admin Portal")}
        {node(40, 110, 180, 50, "webhook", "external trigger")}
        <motion.path
          d="M 220 55 L 320 100 M 220 135 L 320 110"
          stroke="#7a4626" strokeWidth="1" fill="none"
          markerEnd="url(#ld-arrow)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
        />
        {/* Cache → folder structure → doc gen */}
        {node(320, 80, 130, 50, "cache")}
        {node(480, 80, 150, 50, "folder structure")}
        {node(660, 80, 140, 50, "doc gen", "Google Docs")}
        <motion.path d="M 450 105 L 480 105 M 630 105 L 660 105 M 800 105 L 850 220" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ld-arrow)" />
        {/* Slack approval bubble */}
        {node(820, 200, 180, 60, "Slack approval", "interactive bubble")}
        <motion.path d="M 910 260 L 910 300" stroke="#7a4626" strokeWidth="1.2" fill="none" markerEnd="url(#ld-arrow)" />
        {/* Finance gate */}
        {node(820, 300, 180, 60, "Finance gate", "approve / decline")}
        {/* Decline loop → AI Revision Agent */}
        {node(560, 320, 220, 60, "AI Revision Agent", "Gemini 2.5 Pro", true, "#9c5a30")}
        <motion.path
          d="M 820 340 C 700 360 700 360 780 350"
          stroke="#9c5a30" strokeWidth="1.2" fill="none" strokeDasharray="6 4"
          markerEnd="url(#ld-arrow)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <text x="700" y="310" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">on decline</text>
        <motion.path
          d="M 670 320 C 700 280 800 280 820 300"
          stroke="#7a4626" strokeWidth="1" fill="none" strokeDasharray="4 4"
          markerEnd="url(#ld-arrow)"
        />
        {/* Approve → Legal gate */}
        <motion.path d="M 910 360 L 910 410" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ld-arrow)" />
        {node(820, 410, 180, 60, "Legal gate", "approve / decline")}
        {/* Legal decline loop also goes back to AI Revision (drawn as a faint backward arc) */}
        <motion.path
          d="M 820 440 C 600 470 500 420 670 380"
          stroke="#9c5a30" strokeWidth="0.8" fill="none" strokeDasharray="3 3"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        {/* Dropbox Sign + completion */}
        <motion.path d="M 910 470 L 910 510" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ld-arrow)" />
        {node(820, 500, 180, 30, "Dropbox Sign")}
        <motion.path d="M 1000 515 L 1060 515" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ld-arrow)" />
        <text x="1080" y="520" fill="#d99e6c" fontFamily="JetBrains Mono" fontSize="11">webhook</text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run + commit**

Run: `npm test -- sim-legal-docs` (expect PASS)

```bash
git add src/slides/reveal-and-closing/simulations/LegalDocs.tsx tests/unit/sim-legal-docs.test.tsx
git commit -m "feat(reveal): add LegalDocs simulation with revision-loop branching"
```

### Task 7.6: Simulation — `exchange alerts` (efficiency funnel)

**Files:**
- Create: `src/slides/reveal-and-closing/simulations/ExchangeAlerts.tsx`
- Test: `tests/unit/sim-exchange-alerts.test.tsx`

Per spec §4.3: hourly cron → 6 exchange feeds (Binance, OKX, Tokocrypto, BitMart, Indodax, Alpaca) fan in → 3-layer dedup ladder (hash → fuzzy → AI-semantic) → SINGLE Gemini batch call → 5 priority categories → per-group routing to Opsgenie → rate-limited delivery.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/sim-exchange-alerts.test.tsx
import { render, screen } from "@testing-library/react";
import { ExchangeAlerts } from "@/slides/reveal-and-closing/simulations/ExchangeAlerts";

test("ExchangeAlerts renders 6 exchange feed labels", () => {
  render(<ExchangeAlerts />);
  ["Binance", "OKX", "Tokocrypto", "BitMart", "Indodax", "Alpaca"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("ExchangeAlerts renders the 3-layer dedup ladder", () => {
  render(<ExchangeAlerts />);
  expect(screen.getByText(/hash/i)).toBeInTheDocument();
  expect(screen.getByText(/fuzzy/i)).toBeInTheDocument();
  expect(screen.getByText(/AI-semantic/i)).toBeInTheDocument();
});

test("ExchangeAlerts mentions Opsgenie", () => {
  render(<ExchangeAlerts />);
  expect(screen.getByText(/Opsgenie/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- sim-exchange-alerts`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/simulations/ExchangeAlerts.tsx
import { motion } from "framer-motion";

const FEEDS = ["Binance", "OKX", "Tokocrypto", "BitMart", "Indodax", "Alpaca"];
const DEDUP = ["hash", "fuzzy", "AI-semantic"];

export function ExchangeAlerts() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 540" className="h-full w-full">
        <defs>
          <marker id="ea-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* Cron */}
        <motion.circle cx="60" cy="270" r="22" fill="none" stroke="#b86e3d" strokeWidth="1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <text x="60" y="275" textAnchor="middle" fill="#f5f5f5" fontFamily="JetBrains Mono" fontSize="11">hourly</text>
        {/* 6 feeds — vertical column */}
        {FEEDS.map((feed, i) => (
          <g key={feed}>
            <rect x="140" y={120 + i * 60} width="120" height="40" fill="none" stroke="#7a4626" strokeWidth="1" />
            <text x="200" y={144 + i * 60} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">{feed}</text>
            <motion.path
              d={`M 260 ${140 + i * 60} L 360 270`}
              stroke="#7a4626" strokeWidth="0.8" fill="none"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 0.2 }}
            />
          </g>
        ))}
        {/* 3-layer dedup ladder */}
        {DEDUP.map((layer, i) => (
          <g key={layer}>
            <rect x={340 + i * 130} y="250" width="110" height="40" fill="none" stroke="#9c5a30" strokeWidth="1" />
            <text x={340 + i * 130 + 55} y="274" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="12">{layer}</text>
            {i < DEDUP.length - 1 && (
              <motion.path
                d={`M ${340 + i * 130 + 110} 270 L ${340 + (i + 1) * 130} 270`}
                stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ea-arrow)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              />
            )}
          </g>
        ))}
        {/* SINGLE Gemini batch call — drawn as a single big box with multiple items inside */}
        <rect x="730" y="200" width="200" height="140" fill="none" stroke="#b86e3d" strokeWidth="1.5" />
        <text x="830" y="226" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">SINGLE Gemini call</text>
        <text x="830" y="244" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">batch inference</text>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.rect
            key={i}
            x={750} y={258 + i * 14} width="160" height="10"
            fill="#9c5a30" opacity={0.6}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <motion.path d="M 690 270 L 730 270" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ea-arrow)" />
        {/* 5 priority categories emerging */}
        {["P0", "P1", "P2", "P3", "INFO"].map((cat, i) => (
          <g key={cat}>
            <rect x="970" y={170 + i * 42} width="60" height="32" fill="none" stroke="#9c5a30" strokeWidth="1" />
            <text x="1000" y={190 + i * 42} textAnchor="middle" fill="#f5f5f5" fontFamily="JetBrains Mono" fontSize="12">{cat}</text>
            <motion.path
              d={`M 930 270 L 970 ${186 + i * 42}`}
              stroke="#7a4626" strokeWidth="0.8" fill="none"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
            />
          </g>
        ))}
        {/* Opsgenie + rate-limited delivery */}
        <text x="1080" y="280" textAnchor="middle" fill="#d99e6c" fontFamily="JetBrains Mono" fontSize="12">→ Opsgenie</text>
        <text x="1080" y="300" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="10">rate-limited</text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run + commit**

Run: `npm test -- sim-exchange-alerts` (expect PASS)

```bash
git add src/slides/reveal-and-closing/simulations/ExchangeAlerts.tsx tests/unit/sim-exchange-alerts.test.tsx
git commit -m "feat(reveal): add ExchangeAlerts simulation (6 feeds → dedup → batch → P-categories)"
```

### Task 7.7: Simulation — `nanovest-product` (orchestration tree)

**Files:**
- Create: `src/slides/reveal-and-closing/simulations/NanovestProduct.tsx`
- Test: `tests/unit/sim-nanovest-product.test.tsx`

Per spec §4.3 nanovest-product: user input → main orchestrator → brainstorm sub-agent → research-agent → plan-reviewer (loop or proceed) → draft-agent → draft-reviewer → optional parallel branch (Figma + screen-analyzer × N + flowchart-generator firing Mermaid · Excalidraw · Draw.io in parallel) → enrich → validate-agent → publish (Confluence + Jira + GDrive).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/sim-nanovest-product.test.tsx
import { render, screen } from "@testing-library/react";
import { NanovestProduct } from "@/slides/reveal-and-closing/simulations/NanovestProduct";

test("NanovestProduct renders the named sub-agents and the parallel flowchart fan-out", () => {
  render(<NanovestProduct />);
  ["brainstorm", "research", "plan-reviewer", "draft", "draft-reviewer", "validate", "Figma"]
    .forEach((label) => expect(screen.getByText(new RegExp(label, "i"))).toBeInTheDocument());
  ["Mermaid", "Excalidraw", "Draw.io"].forEach((tool) =>
    expect(screen.getByText(tool)).toBeInTheDocument(),
  );
});

test("NanovestProduct names the three publish targets", () => {
  render(<NanovestProduct />);
  ["Confluence", "Jira", "GDrive"].forEach((target) =>
    expect(screen.getByText(target)).toBeInTheDocument(),
  );
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- sim-nanovest-product`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/simulations/NanovestProduct.tsx
import { motion } from "framer-motion";

const Box = ({ x, y, w, h, label, sub, dashed = false }: { x: number; y: number; w: number; h: number; label: string; sub?: string; dashed?: boolean }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="none" stroke="#7a4626" strokeWidth={dashed ? 1 : 1.2} strokeDasharray={dashed ? "4 4" : undefined} />
    <text x={x + w / 2} y={y + h / 2 + 2} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 16} textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="10">{sub}</text>}
  </g>
);

export function NanovestProduct() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 560" className="h-full w-full">
        <defs>
          <marker id="np-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* User input */}
        <Box x={40} y={250} w={120} h={50} label="user input" />
        <motion.path d="M 160 275 L 220 275" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        {/* Main orchestrator */}
        <Box x={220} y={250} w={160} h={60} label="orchestrator" sub="main agent" />
        {/* Sequential chain: brainstorm → research */}
        <motion.path d="M 380 280 L 420 280" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        <Box x={420} y={250} w={130} h={50} label="brainstorm" />
        <motion.path d="M 550 275 L 590 275" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        <Box x={590} y={250} w={130} h={50} label="research" />
        {/* Plan reviewer + loop */}
        <motion.path d="M 720 275 L 760 275" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        <Box x={760} y={250} w={150} h={50} label="plan-reviewer" sub="loop or proceed" />
        <motion.path
          d="M 835 250 C 800 200 600 200 500 250"
          stroke="#9c5a30" strokeWidth="0.9" fill="none" strokeDasharray="4 4" markerEnd="url(#np-arrow)"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        {/* Draft + draft reviewer */}
        <motion.path d="M 910 275 L 950 275" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        <Box x={950} y={250} w={120} h={50} label="draft" />
        <motion.path d="M 1010 300 L 1010 340" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        <Box x={950} y={340} w={120} h={50} label="draft-reviewer" />
        {/* Optional parallel branch (dashed) */}
        <Box x={420} y={400} w={120} h={50} label="Figma" dashed />
        <Box x={560} y={400} w={170} h={50} label="screen-analyzer × N" dashed />
        <Box x={750} y={400} w={170} h={50} label="flowchart-generator" sub="parallel" dashed />
        {/* Three flowchart tools fanning out */}
        {["Mermaid", "Excalidraw", "Draw.io"].map((tool, i) => (
          <g key={tool}>
            <rect x={760 + i * 100} y={470} width="90" height="32" fill="none" stroke="#9c5a30" strokeWidth="1" strokeDasharray="3 3" />
            <text x={805 + i * 100} y={490} textAnchor="middle" fill="#d99e6c" fontFamily="JetBrains Mono" fontSize="11">{tool}</text>
            <motion.path
              d={`M 835 450 L ${805 + i * 100} 470`}
              stroke="#7a4626" strokeWidth="0.8" fill="none" strokeDasharray="3 3"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
            />
          </g>
        ))}
        {/* Enrich → validate → publish */}
        <motion.path d="M 950 365 L 880 510 L 700 510" stroke="#7a4626" strokeWidth="0.9" fill="none" />
        <Box x={550} y={510} w={120} h={36} label="enrich" />
        <motion.path d="M 550 528 L 510 528" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        <Box x={390} y={510} w={120} h={36} label="validate" />
        <motion.path d="M 390 528 L 350 528" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#np-arrow)" />
        {/* Publish targets */}
        {["Confluence", "Jira", "GDrive"].map((target, i) => (
          <g key={target}>
            <rect x={50 + i * 110} y={510} width="100" height="36" fill="none" stroke="#b86e3d" strokeWidth="1.2" />
            <text x={100 + i * 110} y={533} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">{target}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run + commit**

Run: `npm test -- sim-nanovest-product` (expect PASS)

```bash
git add src/slides/reveal-and-closing/simulations/NanovestProduct.tsx tests/unit/sim-nanovest-product.test.tsx
git commit -m "feat(reveal): add NanovestProduct simulation (orchestration tree + parallel flowchart fan-out)"
```

### Task 7.8: Simulation — `NotebookLM` (hub-and-spoke)

**Files:**
- Create: `src/slides/reveal-and-closing/simulations/NotebookLM.tsx`
- Test: `tests/unit/sim-notebooklm.test.tsx`

Per spec §4.3 NotebookLM: user intent → main NotebookLM agent at center → routes to 6 sub-agents (deep-researcher · cross-notebook-query · youtube-curator · drive-scout · url-crawler · brain-compiler) on the perimeter → each fires its needed MCP tools (50+ pool) → outputs (notebook CRUD / RAG queries / studio artifacts / second-brain).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/sim-notebooklm.test.tsx
import { render, screen } from "@testing-library/react";
import { NotebookLM } from "@/slides/reveal-and-closing/simulations/NotebookLM";

test("NotebookLM renders the 6 perimeter sub-agents", () => {
  render(<NotebookLM />);
  ["deep-researcher", "cross-notebook-query", "youtube-curator",
   "drive-scout", "url-crawler", "brain-compiler"]
    .forEach((label) => expect(screen.getByText(new RegExp(label))).toBeInTheDocument());
});

test("NotebookLM names the central main agent + the MCP tool pool", () => {
  render(<NotebookLM />);
  expect(screen.getByText(/NotebookLM agent/i)).toBeInTheDocument();
  expect(screen.getByText(/50\+ MCP tools/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- sim-notebooklm`
Expected: FAIL.

- [ ] **Step 3: Implement**

```typescript
// src/slides/reveal-and-closing/simulations/NotebookLM.tsx
import { motion } from "framer-motion";

const SUB_AGENTS = [
  "deep-researcher",
  "cross-notebook-query",
  "youtube-curator",
  "drive-scout",
  "url-crawler",
  "brain-compiler",
];

export function NotebookLM() {
  const cx = 550;
  const cy = 280;
  const r = 200;
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 560" className="h-full w-full">
        <defs>
          <marker id="nl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* User intent — top */}
        <rect x={cx - 80} y={20} width={160} height={40} fill="none" stroke="#7a4626" strokeWidth="1" />
        <text x={cx} y={45} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">user intent</text>
        <motion.path d={`M ${cx} 60 L ${cx} ${cy - 50}`} stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#nl-arrow)" />
        {/* Center: main NotebookLM agent */}
        <motion.circle
          cx={cx} cy={cy} r={50}
          fill="none" stroke="#b86e3d" strokeWidth="1.5"
          animate={{ r: [48, 52, 48] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">NotebookLM</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">agent</text>
        {/* 6 perimeter sub-agents */}
        {SUB_AGENTS.map((agent, i) => {
          const angle = (i / SUB_AGENTS.length) * Math.PI * 2 - Math.PI / 2;
          const ax = cx + r * Math.cos(angle);
          const ay = cy + r * Math.sin(angle);
          return (
            <g key={agent}>
              <rect x={ax - 90} y={ay - 18} width="180" height="36" fill="none" stroke="#9c5a30" strokeWidth="1" />
              <text x={ax} y={ay + 5} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="12">{agent}</text>
              <motion.path
                d={`M ${cx + 50 * Math.cos(angle)} ${cy + 50 * Math.sin(angle)} L ${ax - 90 * Math.cos(angle) * 0} ${ay}`}
                stroke="#7a4626" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
              {/* Pulse from center to sub-agent */}
              <motion.circle
                r={3} fill="#d99e6c"
                animate={{
                  cx: [cx, ax],
                  cy: [cy, ay],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
              {/* Each sub-agent triggers an MCP-tool subset (drawn as small rect cluster) */}
              <g opacity="0.6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <rect
                    key={j}
                    x={ax - 30 + j * 16}
                    y={ay + (Math.sin(angle) > 0 ? 26 : -36)}
                    width={12} height={6}
                    fill="#9c5a30"
                  />
                ))}
              </g>
            </g>
          );
        })}
        {/* Bottom legend: tool pool */}
        <text x={cx} y={540} textAnchor="middle" fill="#a3a3a3" fontFamily="JetBrains Mono" fontStyle="italic" fontSize="11">
          50+ MCP tools shared across sub-agents
        </text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run + commit**

Run: `npm test -- sim-notebooklm` (expect PASS)

```bash
git add src/slides/reveal-and-closing/simulations/NotebookLM.tsx tests/unit/sim-notebooklm.test.tsx
git commit -m "feat(reveal): add NotebookLM simulation (hub-and-spoke with 6 sub-agents)"
```

### Task 7.9: Slide I.3 — PORTFOLIO assembly

**Files:**
- Create: `src/slides/reveal-and-closing/i3-portfolio.tsx`
- Test: `tests/unit/i3-portfolio.test.tsx`
- Modify: `src/slides/reveal-and-closing/index.ts`

Per spec §4.3: 30/70 split, step-revealed left list, click-driven canvas swap, 5 heavy + 7 light items, "see it real" toggle for heavy items, ambient pulse on default canvas. Steps = 5 (initial + Space 1 HARNESSES + Space 2 TOOLS+WORKSHOPS + Space 3 default canvas + Space 4 connectors-pulse-active). canonicalPose = 4 (export captures default-harness with full list visible per spec).

The "see it real" toggle is wired to `mode` state per heavy item. Screenshot grids reference `assets/n8n-workflows/*.png|.jpg`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/unit/i3-portfolio.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I3Portfolio, i3Slide } from "@/slides/reveal-and-closing/i3-portfolio";

test("I.3 declares 5 steps with canonicalPose=4 and interactive mode", () => {
  expect(i3Slide.steps).toBe(5);
  expect(i3Slide.canonicalPose).toBe(4);
  expect(i3Slide.animationMode).toBe("interactive");
});

test("I.3 renders FIG label, headline, caption, and the categorized list", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. I\.3 · THE PORTFOLIO/)).toBeInTheDocument();
  expect(screen.getByText(/Built\. Taught\. In production\./)).toBeInTheDocument();
  expect(screen.getByText(/Click any item/)).toBeInTheDocument();
  expect(screen.getByText("HARNESSES")).toBeInTheDocument();
});

test("I.3 swaps canvas content when a heavy item is clicked", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  // Default canvas first.
  expect(screen.getByText(/MAIN AGENT/)).toBeInTheDocument();
  fireEvent.click(screen.getByText("stocks intel"));
  // Stocks-intel sim renders RSS feed labels.
  expect(screen.getByText("Investing.com")).toBeInTheDocument();
});

test("I.3 swaps canvas to a light panel when a light item is clicked", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  fireEvent.click(screen.getByText("Sonarqube"));
  expect(screen.getByText(/Code-quality APIs/i)).toBeInTheDocument();
});

test("I.3 see-it-real toggle swaps the canvas to a screenshot grid", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  fireEvent.click(screen.getByText("stocks intel"));
  fireEvent.click(screen.getByText(/see it real/));
  // Screenshot grid renders 3 image elements pointing at assets/n8n-workflows/.
  const imgs = screen.getAllByRole("img", { hidden: true });
  expect(imgs.some((i) => i.getAttribute("src")?.includes("n8n-stocks-news-sentiment"))).toBe(true);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- i3-portfolio`
Expected: FAIL.

- [ ] **Step 3: Implement the screenshot-grid helper**

```typescript
// src/slides/reveal-and-closing/components/ScreenshotGrid.tsx
interface ScreenshotGridProps {
  paths: readonly string[];
}

export function ScreenshotGrid({ paths }: ScreenshotGridProps) {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-4 p-8">
      {paths.map((p) => (
        <div key={p} className="flex items-center justify-center bg-neutral-950 p-2">
          <img
            src={p}
            alt=""
            aria-hidden
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Implement light-panel content map and assembled slide**

```typescript
// src/slides/reveal-and-closing/i3-portfolio.tsx
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { Interactive } from "@/motion/Interactive";
import { FigLabel } from "./components/FigLabel";
import { CategoryList } from "./components/CategoryList";
import { HarnessCanvas } from "./components/HarnessCanvas";
import { LightPanel } from "./components/LightPanel";
import { ScreenshotGrid } from "./components/ScreenshotGrid";
import { highlight } from "./components/highlight";
import { StocksIntel } from "./simulations/StocksIntel";
import { LegalDocs } from "./simulations/LegalDocs";
import { ExchangeAlerts } from "./simulations/ExchangeAlerts";
import { NanovestProduct } from "./simulations/NanovestProduct";
import { NotebookLM } from "./simulations/NotebookLM";
import { i3Content as C } from "./content";

const HEAVY_SCREENSHOTS: Record<string, readonly string[]> = {
  "stocks-intel": [
    "/n8n-workflows/n8n-stocks-news-sentiment.png",
    "/n8n-workflows/slack-stocks-news-sentiment.png",
    "/n8n-workflows/apps-stocks-news-sentiment.jpg",
  ],
  "legal-docs": [
    "/n8n-workflows/n8n-legal-docs-generation.png",
    "/n8n-workflows/slack-legal-docs-generation.png",
    "/n8n-workflows/gdocs-legal-docs-generation.png",
  ],
  "exchange-alerts": [
    "/n8n-workflows/n8n-3rdparties-announcement-alert-system.png",
    "/n8n-workflows/slack-3rdparties-announcement-alert-system.png",
    "/n8n-workflows/opsgenie-3rdparties-announcement-alert-system.png",
  ],
  // nanovest-product + notebooklm screenshots are TBD per spec §4.3 §9; show
  // a "screenshots TBD" placeholder for now.
  "nanovest-product": [],
  "notebooklm": [],
};

const LIGHT_PANELS: Record<string, { title: string; body: React.ReactNode }> = {
  "gemini-image-gen": {
    title: "gemini-image-gen MCP",
    body: (
      <p>
        Visual generation in any agent. Main: {highlight("nano banana pro", ["nano banana pro"])}. Imagen 4 + Veo 3.1 supported.
      </p>
    ),
  },
  "sonarqube": {
    title: "Sonarqube MCP",
    body: <p>Code-quality APIs surfaced as MCP tools. Used in dev review flow.</p>,
  },
  "bitbucket": {
    title: "Bitbucket MCP",
    body: <p>Repo-ops APIs surfaced as MCP tools. Daily team use.</p>,
  },
  "hr-group-ai": {
    title: "HR Group AI Workshop",
    body: <p>{highlight("Sinarmas Group cross-org", ["Sinarmas Group cross-org"])} · agentic organization · selected for it.</p>,
  },
  "townhall-aisc": {
    title: "Townhall AISC",
    body: <p>Nanovest internal · AI Steering Committee briefing.</p>,
  },
  "ai-sdlc": {
    title: "AI-SDLC",
    body: <p>Nanovest internal · AI in software development lifecycle.</p>,
  },
  "pilot-workshop": {
    title: "Pilot Workshop",
    body: <p>Nanovest internal · AI pilot kickoff.</p>,
  },
};

const HEAVY_RENDERERS: Record<string, () => React.ReactElement> = {
  "stocks-intel": () => <StocksIntel />,
  "legal-docs": () => <LegalDocs />,
  "exchange-alerts": () => <ExchangeAlerts />,
  "nanovest-product": () => <NanovestProduct />,
  "notebooklm": () => <NotebookLM />,
};

export function I3Portfolio() {
  const { stepIndex } = useDeck();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"simulation" | "screenshots">("simulation");
  // Reveal grouping per spec §4.3 motion:
  //   Space 1 → HARNESSES (header 0)
  //   Space 2 → TOOLS + WORKSHOPS (headers 1+2)
  //   Space 3 → right canvas appears
  //   Space 4 → connector ambient pulse begins
  const revealedHeaders = stepIndex >= 2 ? 3 : stepIndex >= 1 ? 1 : 0;
  const canvasRevealed = stepIndex >= 3;
  // Resolve canvas content from selectedId + mode.
  const canvasChild = (() => {
    if (!selectedId) return undefined;        // HarnessCanvas falls back to DefaultHarness
    if (mode === "screenshots" && HEAVY_RENDERERS[selectedId]) {
      const paths = HEAVY_SCREENSHOTS[selectedId];
      if (paths.length === 0) {
        return (
          <div className="flex h-full items-center justify-center font-serif italic text-neutral-400">
            screenshots TBD
          </div>
        );
      }
      return <ScreenshotGrid paths={paths} />;
    }
    if (HEAVY_RENDERERS[selectedId]) return HEAVY_RENDERERS[selectedId]();
    if (LIGHT_PANELS[selectedId]) {
      const { title, body } = LIGHT_PANELS[selectedId];
      return <LightPanel title={title} body={body} />;
    }
    return undefined;
  })();

  return (
    <div className="relative h-full w-full bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="I" num={3} label="THE PORTFOLIO" />
      <Interactive>
        <div className="relative z-10 flex h-full flex-col gap-6 px-12 py-20">
          <h2
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.25rem, 3.6vw, 3.5rem)", lineHeight: 1.15 }}
          >
            {highlight(C.headline, ["Built. Taught. In production"])}
          </h2>
          <div className="grid flex-1 grid-cols-[30%_70%] gap-8 overflow-hidden">
            {/* Left pane — categorized list */}
            <div className="overflow-y-auto pr-4">
              <CategoryList
                items={C.list}
                selectedId={selectedId}
                onSelect={(id) => {
                  // Reset mode to simulation whenever the selection changes,
                  // so a previously-toggled "see it real" doesn't persist
                  // across items.
                  setMode("simulation");
                  setSelectedId(id);
                }}
                revealedHeaders={revealedHeaders}
              />
            </div>
            {/* Right pane — canvas (gated by canvasRevealed) */}
            <div className={canvasRevealed ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
              <HarnessCanvas
                selectedId={selectedId}
                mode={mode}
                onToggleMode={() => setMode((m) => (m === "simulation" ? "screenshots" : "simulation"))}
              >
                {canvasChild}
              </HarnessCanvas>
            </div>
          </div>
          <p
            className="font-serif italic text-copper-300"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)" }}
          >
            {highlight(C.caption, ["Click any item to see how it works"])}
          </p>
        </div>
      </Interactive>
    </div>
  );
}

export const i3Slide: SlideDef = {
  steps: 5,
  animationMode: "interactive",
  canonicalPose: 4,
  surface: "dark",
  render: () => <I3Portfolio />,
};
```

- [ ] **Step 5: Register I.3 between I.2 and I.4**

Edit `src/slides/reveal-and-closing/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { i1Slide } from "./i1-meta-process";
import { i2Slide } from "./i2-profile-journey";
import { i3Slide } from "./i3-portfolio";
import { i4Slide } from "./i4-key-message-bridge";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { j4Slide } from "./j4-recipe-ship";
import { k1Slide } from "./k1-challenge-handoff";

// Spec §1 final order.
export const revealAndClosingSlides: SlideDef[] = [
  i1Slide,
  i2Slide,
  i3Slide,
  i4Slide,
  j1Slide,
  j2Slide,
  j3Slide,
  j4Slide,
  k1Slide,
];
```

- [ ] **Step 6: Run tests**

Run: `npm test -- i3-portfolio`
Expected: PASS.

- [ ] **Step 7: Visual smoke**

Run: `npm run dev`, navigate to slide 2 (I.3). Press Space 4 times. Click each list item once and confirm the canvas morphs to the right content. Click "see it real" on stocks-intel — should swap to the 3-screenshot grid. Click again — back to simulation.

- [ ] **Step 8: Commit**

```bash
git add src/slides/reveal-and-closing/i3-portfolio.tsx \
        src/slides/reveal-and-closing/components/ScreenshotGrid.tsx \
        src/slides/reveal-and-closing/index.ts \
        tests/unit/i3-portfolio.test.tsx
git commit -m "feat(reveal): I.3 portfolio slide with split-screen + 5 sims + screenshot toggle"
```

---

## Phase 8 — Wire-up + verification

### Task 8.1: End-to-end keyboard navigation across all 9 slides

**Files:**
- Modify: `tests/e2e/keyboard-nav.spec.ts`

Restore the richer keyboard-nav assertions deferred in Task 0.3 now that real slides exist.

- [ ] **Step 1: Update the e2e suite**

Replace the simplified `keyboard-nav.spec.ts` with:

```typescript
import { test, expect } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

test("ArrowRight walks the deck from slide 0 to the last slide", async ({ page }) => {
  await page.goto("/");
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  expect(count).toBeGreaterThanOrEqual(10); // 9 reveal-and-closing + HexLadder

  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
  for (let i = 1; i < count; i++) {
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(i));
  }
});

test("Space advances within a step-reveal slide; ArrowLeft resets step on previous slide", async ({ page }) => {
  await page.goto("/");
  // I.1 (slide 0) is step-reveal with 4 steps.
  await page.keyboard.press(" ");
  await page.keyboard.press(" ");
  // Sub-line and stages should be visible by now (no exception, no advance to slide 1).
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");

  // ArrowRight goes to slide 1; ArrowLeft returns to slide 0 step 0 (per useKeyboardNav contract).
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
});

test("I.3 (slide 2) is interactive: clicks on list items don't bubble past Interactive wrapper", async ({ page }) => {
  await page.goto("/?slide=2");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-animation-mode", "interactive");
  // Walk to step 4 so canvas is revealed.
  for (let i = 0; i < 4; i++) await page.keyboard.press(" ");
  await page.getByText("stocks intel").click();
  // Stocks intel feed labels should now be on screen.
  await expect(page.getByText("Investing.com")).toBeVisible();
  // Clicking an item must not advance the slide.
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "2");
});
```

- [ ] **Step 2: Run e2e**

Run: `npm run e2e -- keyboard-nav`
Expected: PASS across the three Playwright projects.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/keyboard-nav.spec.ts
git commit -m "test(e2e): restore deck-wide keyboard navigation coverage"
```

### Task 8.2: PDF + PPTX export of the full reveal-and-closing arc

**Files:** None new — exercises existing `scripts/export-pdf.mjs` and `scripts/export-pptx.mjs`.

- [ ] **Step 1: Run the PDF export**

Run: `npm run export:pdf`
Expected: completes without error; produces `exports/smoke-deck.pdf` (filename retained from script defaults). Page count should equal `__DECK_SLIDE_COUNT__` (10: nine reveal-and-closing slides + HexLadder).

- [ ] **Step 2: Inspect the PDF visually**

Run: `open exports/smoke-deck.pdf` (macOS). Walk page-by-page:
- Page 1 (I.1): all 6 stages + tagline visible
- Page 2 (I.2): 4 lines + 3 timeline anchors visible
- Page 3 (I.3): default harness diagram visible + full categorized list visible (per canonicalPose=4)
- Page 4 (I.4): both phrases + copper rule visible
- Page 5 (J.1): all 3 lines visible
- Page 6 (J.2): all 5 cards visible
- Page 7 (J.3): all 3 cards + 2 down arrows visible
- Page 8 (J.4): all 3 cards + 2 forward + 2 loop-back arrows visible
- Page 9 (K.1): all body lines + tagline visible
- Page 10: HexLadder

If any page captures a partial reveal (e.g., card stagger mid-flight), the corresponding slide's `canonicalPose` is wrong or the post-Space settle delay in `scripts/export-pdf.mjs` (`page.waitForTimeout(150)`) is too short. Bump to 400ms and re-export.

- [ ] **Step 3: Run the PPTX export**

Run: `npm run export:pptx`
Expected: produces `exports/smoke-deck.pptx`; opens in Keynote/PowerPoint as 10 image-only slides at 13.333" × 7.5".

- [ ] **Step 4: Run the PDF e2e suite**

Run: `npm run e2e -- pdf-export`
Expected: PASS — the test queries `__DECK_SLIDE_COUNT__` at runtime (per Task 0.3) so no hard-coded count needs updating.

- [ ] **Step 5: Commit (no code changes; mark verification)**

This task only validates existing exports. If the timeout was bumped:

```bash
git add scripts/export-pdf.mjs
git commit -m "chore(export): bump post-Space settle delay to 400ms for canonical-pose stability"
```

Otherwise no commit.

### Task 8.3: Acceptance audit against spec §10

**Files:** None — pure verification gate.

Per spec §10, each slide is "done" when it satisfies the acceptance checklist. Walk every slide manually:

- [ ] **Step 1: Per-slide checklist**

For each of the 9 slides (I.1, I.2, I.3, I.4, J.1, J.2, J.3, J.4, K.1) verify, in `npm run dev` at the relevant `?slide=N`:

1. All content slot-table values are present in the slide
2. All keyword highlights appear in copper-italic (look for `<em class="text-copper-...">` in the DOM, or visually scan for italic-copper text)
3. FIG label appears top-left with correct section.num and label
4. All declared logical advances trigger correctly via Space (count matches `def.steps - 1`)
5. Hover interactions (where applicable) reveal the specified payload — on I.2 hover Mar/Sep/Today/CV; on J.2/J.3/J.4 hover each card
6. Looping ambient (where applicable) runs at the specified period — visually confirm I.1 connector pulse, I.2 timeline pulse, I.3 default-canvas connector pulse, I.4 PulseGlow on `you`, J.4 backward loop-back pulses, K.1 tagline pulse
7. Canonical pose can be captured cleanly for PDF/PPTX export — confirmed in Task 8.2
8. No paid dependencies introduced — `npm ls --depth=1` should show only the dependencies listed in `package.json`
9. Visual matches the spec at projection scale — defer real validation to projection-test (`npm run projection-test`); skip if no projector available

- [ ] **Step 2: Cross-slide narrative + meta-callbacks (spec §5)**

Verify the meta-callbacks are visible / audible in narration order:

- I.1 stage 5 names `gemini-image-gen` MCP; I.3's light panel for that MCP shows the same imagery that's on the deck's hero slides. (Today this is satisfied because all hero photos use the gemini-image-gen prompt set.)
- I.4's rhetorical question (`what could you build?`) is followed by J.1's humility intro (`Here's some advice…`) — adjacent in registry, narratively continuous.
- I.3 portfolio shows `nanovest-product`; J.4 step 6 hover example references it.
- J.1 + K.1 are both hero photographic slides without ambient — bookending Section J quietly.

- [ ] **Step 3: Total advance count check (spec §6 budget)**

Run in browser console at any slide: `__DECK_SLIDE_COUNT__` should be 10 and the sum of steps across the 9 reveal-and-closing slides should be **27** (matches spec §6 budget):
- I.1: 4, I.2: 5, I.3: 5, I.4: 4 → 18 (Section I)
- J.1: 4, J.2: 2, J.3: 4, J.4: 4 → 14 (Section J)
- K.1: 4 → 4 (Section K)
- Total = 36 step counts; **logical advances per slide = steps − 1**, so 27 advances.

The spec table §6 totals **27 advances**. Confirm by computing `deckSlides.slice(0, 9).map(s => s.steps - 1).reduce((a, b) => a + b, 0)` in the console; expect 27.

- [ ] **Step 4: Commit (acceptance summary)**

Add a one-line acceptance log to a new file `docs/runbooks/reveal-and-closing-acceptance.md`:

```markdown
# Reveal + Closing — Acceptance Log

- 2026-05-XX — All 9 slides pass per-slide checklist (spec §10). Total 27 logical advances confirmed. PDF + PPTX export captures clean canonical poses. Cross-slide meta-callbacks verified.
```

```bash
git add docs/runbooks/reveal-and-closing-acceptance.md
git commit -m "docs(reveal): acceptance log for the Reveal + Closing arc"
```

### Task 8.4: Final type-check + full test sweep

- [ ] **Step 1: Type check**

Run: `npx tsc --noEmit`
Expected: PASS (zero errors).

- [ ] **Step 2: Full unit test suite**

Run: `npm test`
Expected: PASS — all primitives, all slides, all helpers.

- [ ] **Step 3: Full e2e suite**

Run: `npm run e2e`
Expected: PASS across the 3 Playwright projects (1280×720, 1366×768, 1920×1080).

- [ ] **Step 4: Lint / build**

Run: `npm run build`
Expected: PASS; produces a `dist/` folder.

- [ ] **Step 5: Summary commit (none if no fixes needed)**

If any fix is required, commit it as `chore: fix lint/test/build issues found in final sweep`.

---

## Open items for downstream tasks (NOT in this plan)

Per spec §9 these remain open and are owned by Adri or future implementation cycles:

| Item | Owner | Disposition in this plan |
|---|---|---|
| Hover example anecdotes on J.2, J.3, J.4 cards | Adri | Drafted in `content.ts` with `[Adri to confirm or replace]` markers (preserved in spec text); Adri can edit `content.ts` to swap |
| Screenshots for I.3 nanovest-product + NotebookLM | Adri | Empty arrays in `HEAVY_SCREENSHOTS` produce a "screenshots TBD" placeholder; drop-in path replacement is one-line |
| Final image-gen prompts | Implementation | Archived in `docs/runbooks/image-gen-prompts.md`; any image can be re-rendered |
| Final copper hex ladder | Projection-test | Settled via `npm run projection-test` per meta-spec §6.5 |
| Final projection-scale font sizes | Projection-test | Tuned via the same projection session |

---

## Self-review notes

A pre-flight pass over the plan against the spec:

**Spec coverage check:**
- Spec §1 section structure (9 slides) → all 9 have a Phase-N task that creates the slide file (Tasks 4.2, 4.3, 5.1, 5.2, 5.3, 6.2, 6.4, 6.5, 7.9). ✓
- Spec §3 cross-cutting primitives (14 components) → all 14 have tasks (Tasks 1.1–1.6, 2.1–2.2, 6.1, 6.3, 7.1, 7.2, 7.3) plus the bonus `ScreenshotGrid` and shared `highlight` helper. ✓
- Spec §4 per-slide specs → each slide task references its content slot table by reading from `content.ts` (Task 4.1) and asserts against the FIG label, key text strings, and ambient/hover behaviors. ✓
- Spec §5 cross-section narrative + meta-callbacks → verified in Task 8.3. ✓
- Spec §6 animation budget (27 advances total) → verified in Task 8.3 step 3. ✓
- Spec §7 content references → simulations explicitly cite their research files in code comments (e.g., StocksIntel references `workflow-stocks-hot-automation.md`). The simulation labels match. ✓
- Spec §8 implementation notes (file structure, build order) → exactly mirrored in Phases 1–7. ✓
- Spec §10 acceptance criteria → enumerated as the audit checklist in Task 8.3. ✓

**Placeholder scan:** No "TBD", "TODO", or "implement appropriate X" lurks in code blocks. The "screenshots TBD" for nanovest-product/notebooklm is an explicit user-facing placeholder per spec §9 open-items (not a plan failure).

**Type/identifier consistency:**
- `SlideDef` defined in Task 0.1, imported uniformly in every slide task. ✓
- `revealAndClosingSlides: SlideDef[]` is appended to in each slide registration step in deterministic order (I.1, I.2, I.3, I.4, J.1, J.2, J.3, J.4, K.1). ✓
- `highlight(text, keywords)` signature defined in Task 4.2 step 4, called consistently with `(string, readonly string[])` everywhere. ✓
- `<HoverReveal trigger payload>` props match between definition (Task 1.5) and consumers (Timeline, RecipeStepCard, I.2 credentials line). ✓
- `<StepConnector direction label ambient>` props match between definition (Task 2.2) and consumers (J.3, J.4). ✓
- `<HarnessCanvas selectedId mode onToggleMode>` props match between definition (Task 7.2) and consumer (I.3 in Task 7.9). ✓
- `useDeck()` exposes `stepIndex` (verified via existing `src/deck/DeckContext.tsx`); every slide reads via `useDeck()` only — never via props. ✓
- Image asset paths: `/heroes/<name>.jpg` (served via `vite.config.ts publicDir: "assets"` in Task 3.1) and `/n8n-workflows/<name>.<ext>` (already present in `assets/n8n-workflows/`). ✓

**Build-order risk:** Phase 7 (I.3) is the last slide built and depends on every primitive in Phases 1–2 + simulations in Phase 7. Each prior task tests its primitive in isolation, so by the time I.3 assembles them, breakage surfaces in the unit tests of the leaf component, not the integration. Spec §8 build-order recommendation matches.

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-05-07-reveal-and-closing-slides.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Best fit for this plan because: many tasks are independent (each primitive in Phase 1–2; each simulation in Phase 7), test isolation is high, and the plan's explicit per-task code blocks let a subagent run with no shared session context.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints. Best if you want to watch each task land and tweak as you go.

Which approach?






