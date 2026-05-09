# Foundation Core — Section D — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all 5 slides of Section D — the Foundation Core "process improvement" arc (D.1 THE TRAP → D.2 THE CONVERGENCE → D.3 ONE PROCESS, FOUR LEVELS → D.4 DECISION PATTERN → D.5 BRIDGE TO E) of the Berau Coal Energy AI workshop deck, plus the 5 new cross-cutting primitives and 4 motion-design glyphs specified in `docs/specs/2026-05-08-slides-foundation-core.md` §1–§10.

**Architecture:** The substrate (Deck/Slide/DeckContext runtime, four animation modes, design-system tokens, Tailwind theme, PDF/PPTX export pipelines) is already in place from the design-system implementation; the Reveal+Closing arc has shipped. Section D layers a self-contained `src/slides/foundation-core/` folder holding 5 slide files + a `components/` sub-folder for new primitives + a `glyphs/` sub-folder for the 4 motion-design vignettes. **Six primitives previously private to Reveal+Closing are promoted to a new shared `src/components/` location** before Section D consumes them — the second-consumer trigger that the Reveal+Closing plan explicitly anticipated. `<LevelCard>` is the most novel piece: a single component morphing between three visual modes (focal · filed · converged) via Framer Motion `layoutId`.

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion (already installed). Tests: Vitest + Testing Library (unit), Playwright (e2e + export pipelines). No new runtime dependencies. The D.5 hero photograph uses the `gemini-image-gen` MCP if registered (falls back to free Unsplash with the documented prompt).

**Spec reference:** `docs/specs/2026-05-08-slides-foundation-core.md` (cited as `spec §N`). Parent meta-spec: `docs/specs/2026-05-06-process-and-design-meta.md` (cited as `meta §N`). Sibling sub-spec already shipped: `docs/specs/2026-05-07-slides-reveal-and-closing.md`.

---

## File Structure

```
src/
  components/                              # NEW — shared UI primitives (promoted from reveal-and-closing)
    FigLabel.tsx                           # MOVED from src/slides/reveal-and-closing/components/
    KeywordHighlight.tsx                   # MOVED
    highlight.tsx                          # MOVED
    HeroPhoto.tsx                          # MOVED
    HoverReveal.tsx                        # MOVED
    PulseGlow.tsx                          # MOVED
    DisplayPhrase.tsx                      # MOVED
  slides/
    reveal-and-closing/                    # UNCHANGED except imports updated to @/components/*
      ...
    foundation-core/                       # NEW
      index.ts                             # exports foundationCoreSlides: SlideDef[]
      d1-the-trap.tsx
      d2-the-convergence.tsx
      d3-one-process-four-levels.tsx
      d4-decision-pattern.tsx
      d5-bridge-to-e.tsx
      content.ts                           # frozen content blocks for D.1–D.5
      components/
        CountUp.tsx
        AmplificationBar.tsx
        ConvergenceCard.tsx
        LevelCard.tsx
        LadderQuestion.tsx
        LadderTerminal.tsx
        LadderLoopBack.tsx
        LadderRise.tsx
      glyphs/
        BpmCompressionGlyph.tsx
        RpaAccelerationGlyph.tsx
        IpaSynthesisGlyph.tsx
        AgenticInversionGlyph.tsx
  deck/
    registry.tsx                           # MODIFIED — append foundationCoreSlides
assets/
  heroes/
    d5-bridge.jpg                          # NEW — D.5 hero photograph
docs/
  runbooks/
    image-gen-prompts.md                   # MODIFIED — append D.5 prompt
```

Existing `src/primitives/` (Hero, SectionDivider, ContentSlide, QuoteSlide, HexLadder) is **untouched**. Existing `src/motion/` is **untouched**. Existing `src/design-system/` is **untouched**. Reveal+Closing slide files are **untouched** except for an import-path sweep in Phase 0.

---

## Phase 0 — Promote shared primitives

**Why:** Six primitives (FigLabel, KeywordHighlight + the `highlight` helper, HoverReveal, PulseGlow, DisplayPhrase, HeroPhoto) are reused unchanged on Section D per spec §3.1. Section D is the second consumer; promotion is the right move now.

### Task 0.1: Create `src/components/` with the seven shared primitives

**Files:**
- Create: `src/components/FigLabel.tsx`
- Create: `src/components/KeywordHighlight.tsx`
- Create: `src/components/highlight.tsx`
- Create: `src/components/HoverReveal.tsx`
- Create: `src/components/PulseGlow.tsx`
- Create: `src/components/DisplayPhrase.tsx`
- Create: `src/components/HeroPhoto.tsx`

- [ ] **Step 1: Move the files**

```bash
git mv src/slides/reveal-and-closing/components/FigLabel.tsx src/components/FigLabel.tsx
git mv src/slides/reveal-and-closing/components/KeywordHighlight.tsx src/components/KeywordHighlight.tsx
git mv src/slides/reveal-and-closing/components/highlight.tsx src/components/highlight.tsx
git mv src/slides/reveal-and-closing/components/HoverReveal.tsx src/components/HoverReveal.tsx
git mv src/slides/reveal-and-closing/components/PulseGlow.tsx src/components/PulseGlow.tsx
git mv src/slides/reveal-and-closing/components/DisplayPhrase.tsx src/components/DisplayPhrase.tsx
git mv src/slides/reveal-and-closing/components/HeroPhoto.tsx src/components/HeroPhoto.tsx
```

- [ ] **Step 2: Update the import in `highlight.tsx` (file content references its sibling)**

The moved `src/components/highlight.tsx` references `./KeywordHighlight` — that path is still correct (both are in `src/components/`), so **no edit needed**. Verify by reading the file.

- [ ] **Step 3: Run the moved-component tests**

Run: `npx vitest run tests/unit/FigLabel.test.tsx tests/unit/KeywordHighlight.test.tsx tests/unit/HoverReveal.test.tsx tests/unit/PulseGlow.test.tsx tests/unit/DisplayPhrase.test.tsx tests/unit/HeroPhoto.test.tsx tests/unit/highlight.test.tsx`

Expected: FAIL — tests still import from `@/slides/reveal-and-closing/components/*`.

- [ ] **Step 4: Update the seven test files to import from the new location**

In each of the following test files, replace `from "@/slides/reveal-and-closing/components/<Name>"` with `from "@/components/<Name>"`:

- `tests/unit/FigLabel.test.tsx`
- `tests/unit/KeywordHighlight.test.tsx`
- `tests/unit/HoverReveal.test.tsx`
- `tests/unit/PulseGlow.test.tsx`
- `tests/unit/DisplayPhrase.test.tsx`
- `tests/unit/HeroPhoto.test.tsx`
- `tests/unit/highlight.test.tsx`

- [ ] **Step 5: Run the moved-component tests again**

Run: `npx vitest run tests/unit/FigLabel.test.tsx tests/unit/KeywordHighlight.test.tsx tests/unit/HoverReveal.test.tsx tests/unit/PulseGlow.test.tsx tests/unit/DisplayPhrase.test.tsx tests/unit/HeroPhoto.test.tsx tests/unit/highlight.test.tsx`

Expected: PASS — all seven test files green.

- [ ] **Step 6: Commit the move**

```bash
git add src/components/ tests/unit/FigLabel.test.tsx tests/unit/KeywordHighlight.test.tsx tests/unit/HoverReveal.test.tsx tests/unit/PulseGlow.test.tsx tests/unit/DisplayPhrase.test.tsx tests/unit/HeroPhoto.test.tsx tests/unit/highlight.test.tsx
git commit -m "refactor(components): promote 7 shared primitives to src/components/"
```

### Task 0.2: Update Reveal+Closing slide imports to the new location

**Files:**
- Modify: every Reveal+Closing slide file and component that still imports from the old path

- [ ] **Step 1: Discover the remaining import sites**

Run: `grep -rn "from \"@/slides/reveal-and-closing/components/\(FigLabel\|KeywordHighlight\|highlight\|HoverReveal\|PulseGlow\|DisplayPhrase\|HeroPhoto\)\"" src/ tests/`

Expected: a list of files. Each line shows a `from "@/slides/reveal-and-closing/components/<Name>"` that must be rewritten.

- [ ] **Step 2: Sweep-replace the seven import paths in `src/slides/reveal-and-closing/**/*.tsx`**

For each name in the set `{FigLabel, KeywordHighlight, highlight, HoverReveal, PulseGlow, DisplayPhrase, HeroPhoto}`, replace `@/slides/reveal-and-closing/components/<Name>` with `@/components/<Name>` across the file tree. Quickest mechanical approach (run once per name):

```bash
for n in FigLabel KeywordHighlight highlight HoverReveal PulseGlow DisplayPhrase HeroPhoto; do
  grep -rl "@/slides/reveal-and-closing/components/$n" src/ tests/ | \
    xargs sed -i '' "s|@/slides/reveal-and-closing/components/$n|@/components/$n|g"
done
```

- [ ] **Step 3: Replace bare relative imports inside the moved-from folder**

The Reveal+Closing components that stayed (`CategoryList`, `RecipeStepCard`, etc.) may still use `./FigLabel`, `./KeywordHighlight`, `./HoverReveal`, etc. with relative paths. Sweep them:

```bash
for n in FigLabel KeywordHighlight highlight HoverReveal PulseGlow DisplayPhrase HeroPhoto; do
  grep -rl "from \"./$n\"" src/slides/reveal-and-closing/components/ | \
    xargs sed -i '' "s|from \"./$n\"|from \"@/components/$n\"|g"
done
```

- [ ] **Step 4: Run the full test suite**

Run: `npm test`

Expected: PASS — all unit tests green. If anything fails, it's almost certainly a missed import path; rerun the discovery grep from Step 1.

- [ ] **Step 5: Run a typecheck**

Run: `npx tsc -b`

Expected: PASS — no missing-module errors.

- [ ] **Step 6: Run the dev server smoke check**

Run: `npm run build`

Expected: PASS — Vite build succeeds. Confirms the registry imports resolve in production mode too.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(reveal-closing): re-point shared primitive imports at @/components/*"
```

---

## Phase 1 — New cross-cutting primitives (no slide context)

Per spec §3.2 and §8.3 build order. These five primitives are the building blocks every Section D slide consumes.

### Task 1.1: `<CountUp>` — animated integer counter

**Files:**
- Create: `src/slides/foundation-core/components/CountUp.tsx`
- Test: `tests/unit/CountUp.test.tsx`

Per spec §3.2: integer counter using Framer Motion `useMotionValue` + `useTransform`; rounds to nearest integer for display. Used by `<AmplificationBar>` and standalone (D.1 73% number, D.3 BPM glyph counter).

- [ ] **Step 1: Write the failing test**

Create `tests/unit/CountUp.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { CountUp } from "@/slides/foundation-core/components/CountUp";

test("CountUp renders the target integer at end-state and exposes data attrs for export pipelines", () => {
  render(<CountUp from={0} to={73} durationMs={1500} testId="trap-stat" />);
  const el = screen.getByTestId("trap-stat");
  // jsdom does not run framer-motion's RAF; the rendered text holds the
  // immediate value. We assert at the data-attribute boundary so the export
  // pipeline (which freezes at canonicalPose) and visual-regression tools
  // can both observe the target.
  expect(el.getAttribute("data-count-from")).toBe("0");
  expect(el.getAttribute("data-count-to")).toBe("73");
  expect(el.getAttribute("data-duration-ms")).toBe("1500");
});

test("CountUp accepts a from value > to value (counter rolls down)", () => {
  render(<CountUp from={20} to={8} durationMs={1200} testId="bpm-counter" />);
  const el = screen.getByTestId("bpm-counter");
  expect(el.getAttribute("data-count-from")).toBe("20");
  expect(el.getAttribute("data-count-to")).toBe("8");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/CountUp.test.tsx`
Expected: FAIL — `Cannot find module '@/slides/foundation-core/components/CountUp'`.

- [ ] **Step 3: Implement `<CountUp>`**

Create `src/slides/foundation-core/components/CountUp.tsx`:

```tsx
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CountUpProps {
  from: number;
  to: number;
  durationMs?: number;
  // Cubic-bezier control points (Framer accepts a 4-tuple).
  ease?: [number, number, number, number];
  testId?: string;
  className?: string;
}

export function CountUp({
  from,
  to,
  durationMs = 1500,
  ease = [0.16, 1, 0.3, 1],
  testId,
  className,
}: CountUpProps) {
  const value = useMotionValue(from);
  const rounded = useTransform(value, (n) => Math.round(n).toString());

  useEffect(() => {
    const controls = animate(value, to, {
      duration: durationMs / 1000,
      ease,
    });
    return () => controls.stop();
  }, [to, durationMs, ease, value]);

  return (
    <motion.span
      data-testid={testId}
      data-count-from={from}
      data-count-to={to}
      data-duration-ms={durationMs}
      className={className}
    >
      {rounded}
    </motion.span>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/CountUp.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/components/CountUp.tsx tests/unit/CountUp.test.tsx
git commit -m "feat(foundation-core): add CountUp primitive (animated integer counter)"
```

### Task 1.2: `<AmplificationBar>` — from-zero horizontal bar with optional integer counter

**Files:**
- Create: `src/slides/foundation-core/components/AmplificationBar.tsx`
- Test: `tests/unit/AmplificationBar.test.tsx`

Per spec §3.2 and §4.1. Used twice on D.1: manual bar (`from=0% to=18% counterTo=1 offFrame=false`) and machine bar (`from=0% to=140% counterTo=1000 offFrame=true`).

- [ ] **Step 1: Write the failing test**

Create `tests/unit/AmplificationBar.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { AmplificationBar } from "@/slides/foundation-core/components/AmplificationBar";

test("AmplificationBar renders the label, counter, and bar element", () => {
  render(
    <AmplificationBar
      fromPct={0}
      toPct={18}
      counterTo={1}
      offFrame={false}
      label="manual pace"
    />,
  );
  expect(screen.getByText(/manual pace/)).toBeInTheDocument();
  expect(screen.getByTestId("amplification-bar-fill")).toBeInTheDocument();
  expect(screen.getByTestId("amplification-bar-counter")).toBeInTheDocument();
});

test("AmplificationBar marks the off-frame glow region only when offFrame=true", () => {
  const { rerender } = render(
    <AmplificationBar fromPct={0} toPct={18} counterTo={1} offFrame={false} label="manual pace" />,
  );
  expect(screen.queryByTestId("amplification-offframe-glow")).toBeNull();

  rerender(
    <AmplificationBar fromPct={0} toPct={140} counterTo={1000} offFrame label="machine pace" />,
  );
  expect(screen.getByTestId("amplification-offframe-glow")).toBeInTheDocument();
});

test("AmplificationBar exposes target widths via data attributes", () => {
  render(<AmplificationBar fromPct={0} toPct={140} counterTo={1000} offFrame label="machine pace" />);
  const fill = screen.getByTestId("amplification-bar-fill");
  expect(fill.getAttribute("data-from-pct")).toBe("0");
  expect(fill.getAttribute("data-to-pct")).toBe("140");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/AmplificationBar.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<AmplificationBar>`**

Create `src/slides/foundation-core/components/AmplificationBar.tsx`:

```tsx
import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

interface AmplificationBarProps {
  fromPct: number;          // starting width as percent of slot
  toPct: number;            // target width (>100% intentional for "machine")
  counterTo: number;        // integer endpoint for the inline counter (e.g. 1, 1000)
  offFrame: boolean;        // copper-glow gradient at right edge during final 300ms
  label: string;            // e.g. "manual pace", "machine pace"
  durationMs?: number;
  delayMs?: number;
}

export function AmplificationBar({
  fromPct,
  toPct,
  counterTo,
  offFrame,
  label,
  durationMs = 1200,
  delayMs = 0,
}: AmplificationBarProps) {
  // The "machine" bar visually exceeds the slot; we render it inside an
  // overflow-visible track so the off-frame glow can extend past the edge.
  return (
    <div
      data-testid="amplification-bar"
      className="relative flex w-full flex-col gap-2"
    >
      <div className="flex items-baseline justify-between font-mono text-copper-300" style={{ fontSize: "clamp(1rem, 1.25vw, 1.4rem)" }}>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "clamp(0.75rem, 0.9vw, 1rem)" }}>{label}</span>
        <span data-testid="amplification-bar-counter">
          <CountUp from={0} to={counterTo} durationMs={durationMs} />
          <span className="ml-0.5">×</span>
        </span>
      </div>
      <div className="relative h-2 w-full overflow-visible bg-neutral-800">
        <motion.div
          data-testid="amplification-bar-fill"
          data-from-pct={fromPct}
          data-to-pct={toPct}
          className={offFrame ? "h-full bg-copper-500" : "h-full bg-copper-700"}
          initial={{ width: `${fromPct}%` }}
          animate={{ width: `${toPct}%` }}
          transition={{
            duration: durationMs / 1000,
            delay: delayMs / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "left center" }}
        />
        {offFrame && (
          <motion.div
            data-testid="amplification-offframe-glow"
            className="pointer-events-none absolute right-0 top-1/2 h-8 w-32 -translate-y-1/2"
            style={{
              background:
                "linear-gradient(90deg, rgba(217,158,108,0) 0%, rgba(217,158,108,0.55) 60%, rgba(217,158,108,0.95) 100%)",
              filter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: (delayMs + durationMs - 300) / 1000,
              ease: "easeOut",
            }}
          />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/AmplificationBar.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/components/AmplificationBar.tsx tests/unit/AmplificationBar.test.tsx
git commit -m "feat(foundation-core): add AmplificationBar primitive"
```

### Task 1.3: `<ConvergenceCard>` — synthesis-diagram node

**Files:**
- Create: `src/slides/foundation-core/components/ConvergenceCard.tsx`
- Test: `tests/unit/ConvergenceCard.test.tsx`

Per spec §3.2 and §4.2. Five fixed positions: `bpm-tl`, `rpa-tr`, `ai-bc`, `ipa-c`, `agentic-r`. Tagline + 3 bullets per card.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/ConvergenceCard.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { ConvergenceCard } from "@/slides/foundation-core/components/ConvergenceCard";

test("ConvergenceCard renders title, sub-name, tagline, and bullet list", () => {
  render(
    <ConvergenceCard
      title="BPM"
      subName="Business Process Management"
      tagline="The GPS for operations"
      taglineKeywords={["GPS"]}
      bullets={["Holistic workflow optimization", "Identifies bottlenecks", "Redesigns end-to-end flow"]}
      copperStop="copper-700"
      position="bpm-tl"
    />,
  );
  expect(screen.getByText("BPM")).toBeInTheDocument();
  expect(screen.getByText(/Business Process Management/)).toBeInTheDocument();
  expect(screen.getByText(/GPS/)).toBeInTheDocument();
  expect(screen.getByText("Holistic workflow optimization")).toBeInTheDocument();
});

test("ConvergenceCard exposes its position and stop via data attributes", () => {
  render(
    <ConvergenceCard
      title="IPA"
      subName="Intelligent Process Automation"
      tagline="End-to-end intelligent workflow"
      taglineKeywords={["intelligent"]}
      bullets={["a", "b", "c"]}
      copperStop="copper-300"
      position="ipa-c"
    />,
  );
  const root = screen.getByTestId("convergence-card");
  expect(root.getAttribute("data-position")).toBe("ipa-c");
  expect(root.getAttribute("data-copper-stop")).toBe("copper-300");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/ConvergenceCard.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<ConvergenceCard>`**

Create `src/slides/foundation-core/components/ConvergenceCard.tsx`:

```tsx
import type { ReactNode } from "react";
import { highlight } from "@/components/highlight";

export type ConvergenceSlot =
  | "bpm-tl"
  | "rpa-tr"
  | "ai-bc"
  | "ipa-c"
  | "agentic-r";

export type CopperStop =
  | "copper-200"
  | "copper-300"
  | "copper-400"
  | "copper-500"
  | "copper-700";

interface ConvergenceCardProps {
  title: string;                   // e.g. "BPM"
  subName: string;                 // e.g. "Business Process Management"
  tagline: string;                 // e.g. "The GPS for operations"
  taglineKeywords: readonly string[];
  bullets: readonly string[];      // exactly 3 entries
  copperStop: CopperStop;          // left-rule color
  position: ConvergenceSlot;
  children?: ReactNode;            // optional trailing slot (e.g. HoverReveal payload host)
}

const stopBorderClass: Record<CopperStop, string> = {
  "copper-200": "border-l-copper-200",
  "copper-300": "border-l-copper-300",
  "copper-400": "border-l-copper-400",
  "copper-500": "border-l-copper-500",
  "copper-700": "border-l-copper-700",
};

export function ConvergenceCard({
  title,
  subName,
  tagline,
  taglineKeywords,
  bullets,
  copperStop,
  position,
  children,
}: ConvergenceCardProps) {
  return (
    <div
      data-testid="convergence-card"
      data-position={position}
      data-copper-stop={copperStop}
      className={`relative flex flex-col gap-3 border-l-2 ${stopBorderClass[copperStop]} bg-neutral-950/60 p-6 shadow`}
      style={{ width: "clamp(220px, 22vw, 320px)" }}
    >
      <h3 className="font-display text-neutral-50" style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", lineHeight: 1.15 }}>
        {title}
      </h3>
      <p className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(1rem, 1.3vw, 1.4rem)", lineHeight: 1.3 }}>
        {subName}
      </p>
      <p className="font-serif text-neutral-50" style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.5rem)", lineHeight: 1.35 }}>
        <em className="italic">{highlight(tagline, taglineKeywords)}</em>
      </p>
      <ul className="flex flex-col gap-1 font-sans text-neutral-200" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)", lineHeight: 1.45 }}>
        {bullets.map((b, i) => (
          <li key={i} className="before:mr-2 before:content-['·']">{b}</li>
        ))}
      </ul>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/ConvergenceCard.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/components/ConvergenceCard.tsx tests/unit/ConvergenceCard.test.tsx
git commit -m "feat(foundation-core): add ConvergenceCard primitive"
```

### Task 1.4: `<LevelCard>` — focal/filed/converged morphing card

**Files:**
- Create: `src/slides/foundation-core/components/LevelCard.tsx`
- Test: `tests/unit/LevelCard.test.tsx`

Per spec §3.2 and §8.5. Most novel primitive in this plan — three modes that auto-tween via Framer's `layoutId={level-${abbrev}}`. `mode="focal"` shows full content + glyph; `mode="filed"` shows compact summary; `mode="converged"` renders identically to `<ConvergenceCard>` with the same `position` slots.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/LevelCard.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { LevelCard } from "@/slides/foundation-core/components/LevelCard";

const baseProps = {
  level: "bpm" as const,
  ask: "Where's the waste?",
  askKeywords: ["waste"],
  doText: "Redesign report scope",
  doKeywords: [],
  outcome: "Fewer reports; clearer signal.",
  glyph: <div data-testid="bpm-glyph-stub" />,
  convergedTagline: "The GPS for operations",
  convergedTaglineKeywords: ["GPS"],
  convergedBullets: ["a", "b", "c"],
  convergedCopperStop: "copper-700" as const,
  convergedTitle: "BPM",
  convergedSubName: "Business Process Management",
};

test("LevelCard mode=focal renders full content + glyph", () => {
  render(<LevelCard {...baseProps} mode="focal" position="center" />);
  const root = screen.getByTestId("level-card");
  expect(root.getAttribute("data-mode")).toBe("focal");
  expect(root.getAttribute("data-level")).toBe("bpm");
  expect(screen.getByText(/Where's the/)).toBeInTheDocument();
  expect(screen.getByText(/Redesign report scope/)).toBeInTheDocument();
  expect(screen.getByText(/Fewer reports/)).toBeInTheDocument();
  expect(screen.getByTestId("bpm-glyph-stub")).toBeInTheDocument();
});

test("LevelCard mode=filed renders compact summary only (number + abbrev + outcome)", () => {
  render(<LevelCard {...baseProps} mode="filed" position="bpm-tl" />);
  const root = screen.getByTestId("level-card");
  expect(root.getAttribute("data-mode")).toBe("filed");
  // Abbreviation + outcome stay; full Ask/Do prose is hidden.
  expect(screen.getByText("BPM")).toBeInTheDocument();
  expect(screen.getByText(/Fewer reports/)).toBeInTheDocument();
  expect(screen.queryByText(/Redesign report scope/)).toBeNull();
});

test("LevelCard mode=converged renders same shape as ConvergenceCard via internal composition", () => {
  render(<LevelCard {...baseProps} mode="converged" position="bpm-tl" />);
  const root = screen.getByTestId("level-card");
  expect(root.getAttribute("data-mode")).toBe("converged");
  expect(root.getAttribute("data-position")).toBe("bpm-tl");
  // Tagline + bullets visible (the ConvergenceCard shape).
  expect(screen.getByText(/GPS/)).toBeInTheDocument();
  expect(screen.getByText("a")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/LevelCard.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<LevelCard>`**

Create `src/slides/foundation-core/components/LevelCard.tsx`:

```tsx
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { highlight } from "@/components/highlight";
import {
  ConvergenceCard,
  type ConvergenceSlot,
  type CopperStop,
} from "./ConvergenceCard";

export type LevelAbbrev = "bpm" | "rpa" | "ipa" | "agentic";
export type LevelMode = "focal" | "filed" | "converged";
export type LevelPosition = "center" | ConvergenceSlot;

const LEVEL_NUM: Record<LevelAbbrev, string> = {
  bpm: "01",
  rpa: "02",
  ipa: "03",
  agentic: "04",
};

interface LevelCardProps {
  level: LevelAbbrev;
  mode: LevelMode;
  position: LevelPosition;
  // Focal-mode content:
  ask: string;
  askKeywords: readonly string[];
  doText: string;
  doKeywords: readonly string[];
  outcome: string;
  glyph: ReactNode;            // accepts a glyph component pre-bound to its play state
  // Converged-mode content (matches ConvergenceCard shape):
  convergedTitle: string;       // e.g. "BPM"
  convergedSubName: string;     // e.g. "Business Process Management"
  convergedTagline: string;
  convergedTaglineKeywords: readonly string[];
  convergedBullets: readonly string[];
  convergedCopperStop: CopperStop;
  children?: ReactNode;         // for HoverReveal hookup in converged mode
}

export function LevelCard(props: LevelCardProps) {
  const { level, mode, position } = props;
  const layoutId = `level-${level}`;

  if (mode === "converged") {
    return (
      <motion.div
        layoutId={layoutId}
        data-testid="level-card"
        data-level={level}
        data-mode={mode}
        data-position={position}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <ConvergenceCard
          title={props.convergedTitle}
          subName={props.convergedSubName}
          tagline={props.convergedTagline}
          taglineKeywords={props.convergedTaglineKeywords}
          bullets={props.convergedBullets}
          copperStop={props.convergedCopperStop}
          position={position as ConvergenceSlot}
        >
          {props.children}
        </ConvergenceCard>
      </motion.div>
    );
  }

  if (mode === "filed") {
    return (
      <motion.div
        layoutId={layoutId}
        data-testid="level-card"
        data-level={level}
        data-mode={mode}
        data-position={position}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-[clamp(180px,18vw,260px)] flex-col gap-2 border-l-2 border-l-copper-700 bg-neutral-950/60 p-4 shadow"
      >
        <span className="font-mono text-copper-400" style={{ fontSize: "clamp(0.85rem, 1vw, 1.1rem)" }}>
          {LEVEL_NUM[level]}
        </span>
        <h4 className="font-display text-neutral-50" style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.6rem)", lineHeight: 1.15 }}>
          {props.convergedTitle}
        </h4>
        <p className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1.1rem)", lineHeight: 1.4 }}>
          {props.outcome}
        </p>
      </motion.div>
    );
  }

  // mode === "focal"
  return (
    <motion.div
      layoutId={layoutId}
      data-testid="level-card"
      data-level={level}
      data-mode={mode}
      data-position={position}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-[clamp(560px,70vw,960px)] flex-col gap-6 border-l-4 border-l-copper-500 bg-neutral-950/60 p-10 shadow"
    >
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-copper-400" style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)" }}>
          {LEVEL_NUM[level]}
        </span>
        <h2 className="font-display text-neutral-50" style={{ fontSize: "clamp(2.5rem, 3.5vw, 4rem)", lineHeight: 1.1 }}>
          {props.convergedTitle}
        </h2>
        <span className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.75rem)", lineHeight: 1.3 }}>
          {props.convergedSubName}
        </span>
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-3 font-serif text-neutral-50" style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.5rem)", lineHeight: 1.45 }}>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>Ask</span>
        <span><em className="italic">{highlight(props.ask, props.askKeywords)}</em></span>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>Do</span>
        <span>{highlight(props.doText, props.doKeywords)}</span>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>Outcome</span>
        <span><em className="italic">{props.outcome}</em></span>
      </div>
      <div className="self-center">{props.glyph}</div>
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/LevelCard.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/components/LevelCard.tsx tests/unit/LevelCard.test.tsx
git commit -m "feat(foundation-core): add LevelCard primitive (focal/filed/converged via layoutId)"
```

---

## Phase 2 — Motion-design glyphs (D.3 vignettes)

Per spec §4.3.1 and §8.3 step 4, build all four glyphs as standalone components first. Each takes `play: boolean` and one-shots its entry sequence; renders end-state when `play=false`. Phase tables in §4.3.1 are authoritative — implement the timings exactly.

### Task 2.1: `<BpmCompressionGlyph>` — 20 squares merge into 8

**Files:**
- Create: `src/slides/foundation-core/glyphs/BpmCompressionGlyph.tsx`
- Test: `tests/unit/BpmCompressionGlyph.test.tsx`

Per spec §4.3.1 (BPM glyph). 4 phases over ~2.4s. ~280×140px.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/BpmCompressionGlyph.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { BpmCompressionGlyph } from "@/slides/foundation-core/glyphs/BpmCompressionGlyph";

test("BpmCompressionGlyph renders 20 top squares, 8 bottom squares, and the counter", () => {
  render(<BpmCompressionGlyph play={false} />);
  expect(screen.getAllByTestId("bpm-top-square")).toHaveLength(20);
  expect(screen.getAllByTestId("bpm-bottom-square")).toHaveLength(8);
  expect(screen.getByTestId("bpm-counter")).toBeInTheDocument();
});

test("BpmCompressionGlyph exposes play state via data attribute", () => {
  const { rerender } = render(<BpmCompressionGlyph play={false} />);
  expect(screen.getByTestId("bpm-glyph").getAttribute("data-play")).toBe("false");
  rerender(<BpmCompressionGlyph play={true} />);
  expect(screen.getByTestId("bpm-glyph").getAttribute("data-play")).toBe("true");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/BpmCompressionGlyph.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<BpmCompressionGlyph>`**

Create `src/slides/foundation-core/glyphs/BpmCompressionGlyph.tsx`:

```tsx
import { motion } from "framer-motion";
import { CountUp } from "../components/CountUp";

interface BpmCompressionGlyphProps {
  play: boolean;
}

const TOP_COUNT = 20;
const BOTTOM_COUNT = 8;
const TOP_SIZE = 10;
const TOP_GAP = 4;
const BOTTOM_SIZE = 14;
const BOTTOM_GAP = 6;

export function BpmCompressionGlyph({ play }: BpmCompressionGlyphProps) {
  // Each top square aligns to a bottom merger point. We assign each top
  // square to a bottom slot by integer division.
  const totalTopWidth = TOP_COUNT * TOP_SIZE + (TOP_COUNT - 1) * TOP_GAP;
  const totalBottomWidth = BOTTOM_COUNT * BOTTOM_SIZE + (BOTTOM_COUNT - 1) * BOTTOM_GAP;

  return (
    <div
      data-testid="bpm-glyph"
      data-play={String(play)}
      className="relative flex flex-col items-center gap-6"
      style={{ width: 280, height: 140 }}
    >
      <div className="relative flex" style={{ gap: TOP_GAP, width: totalTopWidth }}>
        {Array.from({ length: TOP_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            data-testid="bpm-top-square"
            className="bg-copper-700"
            style={{ width: TOP_SIZE, height: TOP_SIZE }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              play
                ? {
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0.6],
                    y: [0, 0, 0, 60],
                  }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: play ? 2.0 : 0,
              times: play ? [0, 0.3, 0.4, 1] : undefined,
              delay: play ? i * 0.03 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
      <div className="relative flex" style={{ gap: BOTTOM_GAP, width: totalBottomWidth }}>
        {Array.from({ length: BOTTOM_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            data-testid="bpm-bottom-square"
            className="bg-copper-400"
            style={{ width: BOTTOM_SIZE, height: BOTTOM_SIZE }}
            initial={{ opacity: 0, scale: 0 }}
            animate={play ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: play ? 0.8 + i * 0.05 : 0,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
      <span
        data-testid="bpm-counter"
        className="font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
      >
        STEPS · {play ? <CountUp from={20} to={8} durationMs={1200} /> : "8"}
      </span>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/BpmCompressionGlyph.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/glyphs/BpmCompressionGlyph.tsx tests/unit/BpmCompressionGlyph.test.tsx
git commit -m "feat(foundation-core): add BpmCompressionGlyph (20→8 squares vignette)"
```

### Task 2.2: `<RpaAccelerationGlyph>` — week of manual hours collapses into a bolt strike

**Files:**
- Create: `src/slides/foundation-core/glyphs/RpaAccelerationGlyph.tsx`
- Test: `tests/unit/RpaAccelerationGlyph.test.tsx`

Per spec §4.3.1 (RPA glyph). 5 phases over ~2.6s. ~280×140px.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/RpaAccelerationGlyph.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { RpaAccelerationGlyph } from "@/slides/foundation-core/glyphs/RpaAccelerationGlyph";

test("RpaAccelerationGlyph renders 6 weekday tick-dots and a copper bolt path", () => {
  render(<RpaAccelerationGlyph play={false} />);
  expect(screen.getAllByTestId("rpa-tick")).toHaveLength(6);
  expect(screen.getByTestId("rpa-bolt")).toBeInTheDocument();
});

test("RpaAccelerationGlyph shows manual + bot counter labels", () => {
  render(<RpaAccelerationGlyph play={false} />);
  expect(screen.getByText(/MANUAL/)).toBeInTheDocument();
  expect(screen.getByText(/BOT/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/RpaAccelerationGlyph.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<RpaAccelerationGlyph>`**

Create `src/slides/foundation-core/glyphs/RpaAccelerationGlyph.tsx`:

```tsx
import { motion } from "framer-motion";

interface Props {
  play: boolean;
}

const DAYS = ["M", "T", "W", "T", "F", "S"];

export function RpaAccelerationGlyph({ play }: Props) {
  // Tick-dot positions across the time-bar: evenly spaced over the 260px width.
  const tickXs = DAYS.map((_, i) => 12 + i * (236 / (DAYS.length - 1)));

  return (
    <div
      data-testid="rpa-glyph"
      data-play={String(play)}
      className="flex flex-col items-center gap-4"
      style={{ width: 280, height: 140 }}
    >
      <div className="relative" style={{ width: 260, height: 32 }}>
        <motion.svg width={260} height={32} className="overflow-visible">
          <motion.line
            data-testid="rpa-timebar"
            x1={4}
            y1={16}
            x2={256}
            y2={16}
            stroke="#7a4626"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={play ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: play ? 0.3 : 0, ease: "easeOut" }}
          />
          {tickXs.map((x, i) => (
            <motion.circle
              key={i}
              data-testid="rpa-tick"
              cx={x}
              cy={16}
              r={4}
              fill="#c98548"
              initial={{ opacity: 0 }}
              animate={
                play
                  ? { opacity: [0, 1, 1, 0], cx: [x, x, x, 130] }
                  : { opacity: 1 }
              }
              transition={{
                duration: play ? 2.0 : 0,
                times: play ? [0, 0.3, 0.6, 1] : undefined,
                delay: play ? 0.3 + i * 0.08 : 0,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.svg>
      </div>
      <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}>
        MANUAL · 6 hours / week
      </span>
      <motion.svg
        data-testid="rpa-bolt"
        width={48}
        height={64}
        className="overflow-visible"
        initial={{ opacity: 0, scale: 0 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: play ? 2.0 : 0, ease: [0.7, 0, 0.3, 1] }}
      >
        <motion.path
          d="M 24 4 L 12 32 L 22 32 L 16 60 L 36 28 L 26 28 Z"
          fill="#c98548"
          stroke="#d99e6c"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ duration: 0.2, delay: play ? 2.0 : 0 }}
        />
      </motion.svg>
      <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}>
        BOT · instant
      </span>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/RpaAccelerationGlyph.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/glyphs/RpaAccelerationGlyph.tsx tests/unit/RpaAccelerationGlyph.test.tsx
git commit -m "feat(foundation-core): add RpaAccelerationGlyph (time-bar→bolt vignette)"
```

### Task 2.3: `<IpaSynthesisGlyph>` — raw data converges through AI core strengths into an insight pulse

**Files:**
- Create: `src/slides/foundation-core/glyphs/IpaSynthesisGlyph.tsx`
- Test: `tests/unit/IpaSynthesisGlyph.test.tsx`

Per spec §4.3.1 (IPA glyph). 4 phases over ~2.8s. ~320×160px.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/IpaSynthesisGlyph.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { IpaSynthesisGlyph } from "@/slides/foundation-core/glyphs/IpaSynthesisGlyph";

test("IpaSynthesisGlyph renders 8 raw data bars, 4 core-strength labels, and the insight glyph", () => {
  render(<IpaSynthesisGlyph play={false} />);
  expect(screen.getAllByTestId("ipa-bar")).toHaveLength(8);
  expect(screen.getByText(/summarization/)).toBeInTheDocument();
  expect(screen.getByText(/analysis/)).toBeInTheDocument();
  expect(screen.getByText(/generation/)).toBeInTheDocument();
  expect(screen.getByText(/NLU/)).toBeInTheDocument();
  expect(screen.getByTestId("ipa-insight")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/IpaSynthesisGlyph.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<IpaSynthesisGlyph>`**

Create `src/slides/foundation-core/glyphs/IpaSynthesisGlyph.tsx`:

```tsx
import { motion } from "framer-motion";

interface Props {
  play: boolean;
}

// Bar widths chosen for visual heterogeneity per spec §4.3.1.
const BAR_WIDTHS = [40, 96, 56, 120, 72, 48, 104, 64];
const STRENGTHS = ["summarization", "analysis", "generation", "NLU"];

export function IpaSynthesisGlyph({ play }: Props) {
  return (
    <div
      data-testid="ipa-glyph"
      data-play={String(play)}
      className="flex items-center gap-6"
      style={{ width: 320, height: 160 }}
    >
      {/* Left: 8 raw bars */}
      <div className="flex flex-col gap-1.5">
        {BAR_WIDTHS.map((w, i) => (
          <motion.div
            key={i}
            data-testid="ipa-bar"
            className="h-1 bg-copper-700"
            initial={{ width: 0 }}
            animate={
              play
                ? { width: [0, w, w, 0] }
                : { width: w }
            }
            transition={{
              duration: play ? 2.4 : 0,
              times: play ? [0, 0.16, 0.6, 1] : undefined,
              delay: play ? i * 0.06 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "left center" }}
          />
        ))}
      </div>
      {/* Middle: 2x2 grid of core strengths */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-copper-300" style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}>
        {STRENGTHS.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: play ? 0.8 + i * 0.12 : 0, ease: "easeOut" }}
          >
            {s}
          </motion.span>
        ))}
      </div>
      {/* Right: insight pulse */}
      <motion.svg
        data-testid="ipa-insight"
        width={56}
        height={56}
        className="overflow-visible"
        initial={{ opacity: 0, scale: 0 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: play ? 2.4 : 0, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <filter id="ipa-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <circle cx={28} cy={28} r={14} fill="#c98548" filter="url(#ipa-glow)" opacity={0.7} />
        <circle cx={28} cy={28} r={14} fill="#c98548" />
      </motion.svg>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/IpaSynthesisGlyph.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/glyphs/IpaSynthesisGlyph.tsx tests/unit/IpaSynthesisGlyph.test.tsx
git commit -m "feat(foundation-core): add IpaSynthesisGlyph (raw data→insight vignette)"
```

### Task 2.4: `<AgenticInversionGlyph>` — arrow flips 180°; YOU↔REPORT swap; ↻ loopback

**Files:**
- Create: `src/slides/foundation-core/glyphs/AgenticInversionGlyph.tsx`
- Test: `tests/unit/AgenticInversionGlyph.test.tsx`

Per spec §4.3.1 (AGENTIC glyph). 5 phases over ~2.4s. ~280×120px.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/AgenticInversionGlyph.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { AgenticInversionGlyph } from "@/slides/foundation-core/glyphs/AgenticInversionGlyph";

test("AgenticInversionGlyph renders YOU + REPORT labels, arrow path, and ↻ loopback", () => {
  render(<AgenticInversionGlyph play={false} />);
  expect(screen.getByText("YOU")).toBeInTheDocument();
  expect(screen.getByText("REPORT")).toBeInTheDocument();
  expect(screen.getByTestId("agentic-arrow")).toBeInTheDocument();
  expect(screen.getByTestId("agentic-loopback")).toBeInTheDocument();
});

test("AgenticInversionGlyph caption reads reactive → proactive", () => {
  render(<AgenticInversionGlyph play={false} />);
  expect(screen.getByText(/reactive/)).toBeInTheDocument();
  expect(screen.getByText(/proactive/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/AgenticInversionGlyph.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<AgenticInversionGlyph>`**

Create `src/slides/foundation-core/glyphs/AgenticInversionGlyph.tsx`:

```tsx
import { motion } from "framer-motion";

interface Props {
  play: boolean;
}

export function AgenticInversionGlyph({ play }: Props) {
  return (
    <div
      data-testid="agentic-glyph"
      data-play={String(play)}
      className="flex flex-col items-center gap-3"
      style={{ width: 280, height: 120 }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="font-mono text-neutral-50"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: [0, 1, 1, 1, 1] } : { opacity: 1 }}
          transition={{ duration: 2.4, times: [0, 0.25, 0.5, 0.7, 1], delay: 0 }}
        >
          YOU
        </motion.span>
        <motion.svg
          data-testid="agentic-arrow"
          width={120}
          height={24}
          className="overflow-visible"
          animate={play ? { rotate: [0, 0, 180, 180, 180] } : { rotate: 180 }}
          transition={{ duration: 2.4, times: [0, 0.4, 0.7, 0.9, 1], ease: "easeInOut" }}
          style={{ transformOrigin: "60px 12px" }}
        >
          <motion.path
            d="M 4 12 L 108 12 M 100 6 L 108 12 L 100 18"
            stroke="#c98548"
            strokeWidth={1.5}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={play ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 0.4, delay: play ? 0.2 : 0 }}
          />
        </motion.svg>
        <motion.span
          className="font-mono text-neutral-50"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.4, delay: play ? 0.6 : 0 }}
        >
          REPORT
        </motion.span>
      </div>
      <motion.span
        data-testid="agentic-loopback"
        className="font-mono text-copper-400"
        style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: play ? 2.1 : 0 }}
      >
        ↻
      </motion.span>
      <motion.span
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)" }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: play ? 2.1 : 0 }}
      >
        <em className="text-copper-400 italic">reactive</em>
        {" → "}
        <em className="text-copper-400 italic">proactive</em>
      </motion.span>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/AgenticInversionGlyph.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/glyphs/AgenticInversionGlyph.tsx tests/unit/AgenticInversionGlyph.test.tsx
git commit -m "feat(foundation-core): add AgenticInversionGlyph (YOU↔REPORT inversion)"
```

---

## Phase 3 — Ladder family primitives (D.4)

Per spec §3.2 and §4.4. `<LadderRise>` is the parent composing five `<LadderQuestion>` gates + four `<LadderTerminal>` cards + one `<LadderLoopBack>` (with `<PulseGlow>` ambient).

### Task 3.1: `<LadderQuestion>` — Q gate along the bottom rail

**Files:**
- Create: `src/slides/foundation-core/components/LadderQuestion.tsx`
- Test: `tests/unit/LadderQuestion.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/LadderQuestion.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { LadderQuestion } from "@/slides/foundation-core/components/LadderQuestion";

test("LadderQuestion renders the Q# label, question text with keyword highlight, and YES/NO branch labels", () => {
  render(
    <LadderQuestion
      number={2}
      question="Have you removed waste + bottlenecks?"
      keywords={["waste"]}
      yesLabel="continue"
      noLabel="apply BPM first"
    />,
  );
  expect(screen.getByText(/Q2/)).toBeInTheDocument();
  expect(screen.getByText(/Have you removed/)).toBeInTheDocument();
  expect(screen.getByText("waste")).toBeInTheDocument();
  expect(screen.getByText(/continue/)).toBeInTheDocument();
  expect(screen.getByText(/apply BPM first/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/LadderQuestion.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<LadderQuestion>`**

Create `src/slides/foundation-core/components/LadderQuestion.tsx`:

```tsx
import { highlight } from "@/components/highlight";

interface LadderQuestionProps {
  number: number;
  question: string;
  keywords: readonly string[];
  yesLabel?: string;
  noLabel?: string;
}

export function LadderQuestion({
  number,
  question,
  keywords,
  yesLabel,
  noLabel,
}: LadderQuestionProps) {
  return (
    <div
      data-testid="ladder-question"
      data-q-number={number}
      className="flex flex-col items-center gap-2 border border-copper-700 bg-neutral-950/60 p-3 text-center"
      style={{ width: "clamp(140px, 14vw, 200px)" }}
    >
      <span className="font-mono text-copper-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}>
        Q{number}
      </span>
      <p className="font-serif text-neutral-50" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.3 }}>
        <em className="italic">{highlight(question, keywords)}</em>
      </p>
      <div className="mt-1 flex w-full justify-between font-mono text-copper-200" style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}>
        {yesLabel && <span>YES → {yesLabel}</span>}
        {noLabel && <span>NO ↓ {noLabel}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/LadderQuestion.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/components/LadderQuestion.tsx tests/unit/LadderQuestion.test.tsx
git commit -m "feat(foundation-core): add LadderQuestion primitive"
```

### Task 3.2: `<LadderTerminal>` — terminal-level card on the staircase

**Files:**
- Create: `src/slides/foundation-core/components/LadderTerminal.tsx`
- Test: `tests/unit/LadderTerminal.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/LadderTerminal.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { LadderTerminal } from "@/slides/foundation-core/components/LadderTerminal";

test("LadderTerminal renders abbreviation + sub-line and exposes its altitude tier", () => {
  render(
    <LadderTerminal
      abbrev="BPM"
      subLine="Redesign + integrate. The foundation everything else stands on."
      altitudeTier={1}
      hoverExample="Example: cut a 20-step approval flow to 8 steps before automating any of it."
    />,
  );
  expect(screen.getByText("BPM")).toBeInTheDocument();
  expect(screen.getByText(/Redesign \+ integrate/)).toBeInTheDocument();
  const root = screen.getByTestId("ladder-terminal");
  expect(root.getAttribute("data-altitude-tier")).toBe("1");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/LadderTerminal.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<LadderTerminal>`**

Create `src/slides/foundation-core/components/LadderTerminal.tsx`:

```tsx
import type { ReactNode } from "react";
import { HoverReveal } from "@/components/HoverReveal";

interface LadderTerminalProps {
  abbrev: string;            // "BPM" | "RPA" | "IPA" | "AGENTIC"
  subLine: string;
  altitudeTier: 1 | 2 | 3 | 4; // 1 = lowest (BPM), 4 = highest (AGENTIC)
  hoverExample?: ReactNode;
}

export function LadderTerminal({
  abbrev,
  subLine,
  altitudeTier,
  hoverExample,
}: LadderTerminalProps) {
  const card = (
    <div
      data-testid="ladder-terminal"
      data-altitude-tier={altitudeTier}
      className="flex flex-col gap-2 border border-copper-500 bg-neutral-950/60 p-4"
      style={{ width: "clamp(180px, 18vw, 240px)" }}
    >
      <h3 className="font-display text-neutral-50" style={{ fontSize: "clamp(1.6rem, 2vw, 2.25rem)", lineHeight: 1.1 }}>
        {abbrev}
      </h3>
      <p className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.35 }}>
        {subLine}
      </p>
    </div>
  );
  if (!hoverExample) return card;
  return (
    <HoverReveal
      position="below"
      trigger={card}
      payload={
        <span className="block max-w-[420px] border border-copper-500 bg-neutral-900 p-5 font-serif italic text-neutral-100 shadow" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.45 }}>
          {hoverExample}
        </span>
      }
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/LadderTerminal.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/components/LadderTerminal.tsx tests/unit/LadderTerminal.test.tsx
git commit -m "feat(foundation-core): add LadderTerminal primitive"
```

### Task 3.3: `<LadderLoopBack>` — STOP↻ card with ambient glow

**Files:**
- Create: `src/slides/foundation-core/components/LadderLoopBack.tsx`
- Test: `tests/unit/LadderLoopBack.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/LadderLoopBack.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { LadderLoopBack } from "@/slides/foundation-core/components/LadderLoopBack";

test("LadderLoopBack renders STOP, the ↻ glyph, and the redesign-first sub-line", () => {
  render(<LadderLoopBack />);
  expect(screen.getByText(/STOP/)).toBeInTheDocument();
  expect(screen.getByText(/↻/)).toBeInTheDocument();
  expect(screen.getByText(/redesign first/i)).toBeInTheDocument();
});

test("LadderLoopBack wraps its glyph in a PulseGlow with the spec'd 4s period", () => {
  render(<LadderLoopBack />);
  const pulse = screen.getByTestId("pulse-glow");
  expect(pulse.getAttribute("data-period")).toBe("4");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/LadderLoopBack.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `<LadderLoopBack>`**

Create `src/slides/foundation-core/components/LadderLoopBack.tsx`:

```tsx
import { PulseGlow } from "@/components/PulseGlow";

export function LadderLoopBack() {
  return (
    <div
      data-testid="ladder-loopback"
      className="flex flex-col items-center gap-2 border border-copper-500 bg-neutral-950/80 p-4 text-center"
      style={{ width: "clamp(160px, 16vw, 220px)" }}
    >
      <PulseGlow periodSeconds={4} intensity="subtle">
        <span className="font-mono text-copper-400" style={{ fontSize: "clamp(1.4rem, 1.8vw, 2rem)" }}>
          STOP ↻
        </span>
      </PulseGlow>
      <p className="font-serif italic text-copper-300" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.35 }}>
        redesign first
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/LadderLoopBack.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/components/LadderLoopBack.tsx tests/unit/LadderLoopBack.test.tsx
git commit -m "feat(foundation-core): add LadderLoopBack primitive (STOP↻ with ambient pulse)"
```

### Task 3.4: `<LadderRise>` — parent composing the full D.4 diagram

**Files:**
- Create: `src/slides/foundation-core/components/LadderRise.tsx`
- Test: `tests/unit/LadderRise.test.tsx`

This component lays out the bottom rail (5 questions + start node) and the staircase (4 terminal cards on rising altitudes) plus the STOP↻ loopback below Q1, with progressive reveal driven by `revealedSteps` (0–5).

- [ ] **Step 1: Write the failing test**

Create `tests/unit/LadderRise.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { LadderRise } from "@/slides/foundation-core/components/LadderRise";
import { d4Content } from "@/slides/foundation-core/content";

test("LadderRise renders 5 questions, 4 terminals, 1 loopback, and the start node", () => {
  render(<LadderRise content={d4Content.ladder} revealedSteps={5} />);
  expect(screen.getAllByTestId("ladder-question")).toHaveLength(5);
  expect(screen.getAllByTestId("ladder-terminal")).toHaveLength(4);
  expect(screen.getByTestId("ladder-loopback")).toBeInTheDocument();
  expect(screen.getByTestId("ladder-start")).toBeInTheDocument();
});

test("LadderRise reveals progressively: at revealedSteps=1, only Q1 + STOP↻ are visible", () => {
  render(<LadderRise content={d4Content.ladder} revealedSteps={1} />);
  const root = screen.getByTestId("ladder-rise");
  expect(root.getAttribute("data-revealed-steps")).toBe("1");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/LadderRise.test.tsx`
Expected: FAIL — both `LadderRise` and `d4Content` are absent. The `d4Content` import is created in Task 5.1; this test passes once both exist.

> Note: Implement Task 5.1 (content module) **before** completing this task's Step 4. The order in the plan keeps test-first discipline; the run-to-pass step waits for Task 5.1.

- [ ] **Step 3: Implement `<LadderRise>`**

Create `src/slides/foundation-core/components/LadderRise.tsx`:

```tsx
import { motion } from "framer-motion";
import { LadderQuestion } from "./LadderQuestion";
import { LadderTerminal } from "./LadderTerminal";
import { LadderLoopBack } from "./LadderLoopBack";

export interface LadderQuestionSpec {
  number: number;
  question: string;
  keywords: readonly string[];
  yesLabel?: string;
  noLabel?: string;
}

export interface LadderTerminalSpec {
  abbrev: string;
  subLine: string;
  altitudeTier: 1 | 2 | 3 | 4;
  hoverExample?: string;
  // q-number this terminal rises from
  fromQ: number;
  // which branch — "yes" rises, "no" goes to BPM (Q2's NO)
  branch: "yes" | "no";
}

export interface LadderRiseContent {
  questions: readonly LadderQuestionSpec[];        // 5 entries
  terminals: readonly LadderTerminalSpec[];        // 4 entries (BPM, RPA, IPA, AGENTIC)
}

interface LadderRiseProps {
  content: LadderRiseContent;
  // 0..5: at 1 only Q1 + loopback are visible; at 5 the full diagram is.
  revealedSteps: number;
}

export function LadderRise({ content, revealedSteps }: LadderRiseProps) {
  return (
    <div
      data-testid="ladder-rise"
      data-revealed-steps={revealedSteps}
      className="relative w-full"
      style={{ minHeight: "60vh" }}
    >
      {/* Bottom rail: start + 5 questions */}
      <div className="absolute bottom-[20%] left-0 right-0 flex items-center justify-between gap-4 px-12">
        <motion.div
          data-testid="ladder-start"
          className="border border-copper-700 bg-neutral-950/60 px-4 py-3 font-mono text-copper-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealedSteps >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
        >
          Start
        </motion.div>
        {content.questions.map((q, i) => (
          <motion.div
            key={q.number}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: revealedSteps >= i + 1 ? 1 : 0,
              y: revealedSteps >= i + 1 ? 0 : 8,
            }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <LadderQuestion {...q} />
          </motion.div>
        ))}
      </div>
      {/* STOP↻ loopback under Q1 */}
      <motion.div
        className="absolute left-[14%] top-[calc(80%+12px)]"
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: revealedSteps >= 1 ? 1 : 0,
          y: revealedSteps >= 1 ? 0 : -8,
        }}
        transition={{ duration: 0.5 }}
      >
        <LadderLoopBack />
      </motion.div>
      {/* Staircase of 4 terminal-level cards rising at increasing altitudes */}
      {content.terminals.map((t) => {
        // Altitude tier 1 → ~50% from top; 4 → ~10%; equal spacing.
        const topPct = 60 - t.altitudeTier * 12;
        // Horizontal x: align under each terminal's source Q number.
        const leftPct = 14 + t.fromQ * 14;
        // The terminal becomes visible when revealedSteps >= the space that introduced it.
        // BPM rises at Space 2; RPA at Space 3; IPA at Space 4; AGENTIC at Space 5.
        const introducedAtSpace = t.altitudeTier + 1;
        return (
          <motion.div
            key={t.abbrev}
            className="absolute"
            style={{ top: `${topPct}%`, left: `${leftPct}%` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: revealedSteps >= introducedAtSpace ? 1 : 0,
              y: revealedSteps >= introducedAtSpace ? 0 : 16,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <LadderTerminal
              abbrev={t.abbrev}
              subLine={t.subLine}
              altitudeTier={t.altitudeTier}
              hoverExample={t.hoverExample}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Defer the test run** — see Step 2 note. Resume after Task 5.1.

After Task 5.1 ships:

Run: `npx vitest run tests/unit/LadderRise.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit (defer until tests pass)**

```bash
git add src/slides/foundation-core/components/LadderRise.tsx tests/unit/LadderRise.test.tsx
git commit -m "feat(foundation-core): add LadderRise parent (composes Q + Terminal + LoopBack)"
```

---

## Phase 4 — Hero photograph (D.5)

### Task 4.1: Generate the D.5 hero photograph

**Files:**
- Create: `assets/heroes/d5-bridge.jpg`
- Modify: `docs/runbooks/image-gen-prompts.md` (append D.5 entry)

- [ ] **Step 1: Append the D.5 prompt to the runbook**

Edit `docs/runbooks/image-gen-prompts.md` — add a new section after the K.1 entry, before the `## Re-render workflow` section:

```markdown
## D.5 — Bridge to E (`assets/heroes/d5-bridge.jpg`)

> Editorial photograph at first light or dawn. An industrial workspace inside a high-ceilinged room with tall windows. Warm copper-amber morning light streaming through, casting deep shadows. In middle distance: a wooden desk scattered with technical diagrams, hand-sketched flowcharts, and a closed laptop. The room feels like a war room mid-thinking — the strategic work is done, but the engineering work hasn't begun. No people visible. Mood: threshold, momentum, transition between planning and building. Copper-amber accent palette throughout. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

```

- [ ] **Step 2: Render the image**

Two paths (per the runbook's existing workflow):

1. **If `gemini-image-gen` MCP is registered** (`claude mcp list | grep gemini`):
   - Use the MCP's image-gen tool with the prompt above.
   - Output: 16:9 (1920×1080 minimum), JPG, < 800 KB after optimization.
   - Save to `assets/heroes/d5-bridge.jpg`.
2. **If MCP is not registered:**
   - Curate from Unsplash using search terms `dawn workspace warm light desk diagrams`.
   - Verify the bottom-left region is dim or smooth-toned (vignette-friendly).
   - Save to `assets/heroes/d5-bridge.jpg`.

- [ ] **Step 3: Verify the asset exists and is web-ready**

Run: `ls -la assets/heroes/d5-bridge.jpg && file assets/heroes/d5-bridge.jpg`
Expected: file present, size < 800 KB, format JPEG.

- [ ] **Step 4: Commit**

```bash
git add assets/heroes/d5-bridge.jpg docs/runbooks/image-gen-prompts.md
git commit -m "asset(foundation-core): add D.5 bridge hero photo + archive prompt"
```

---

## Phase 5 — Content module + slide implementations

### Task 5.1: Create the frozen content module for Section D

**Files:**
- Create: `src/slides/foundation-core/content.ts`
- Test: (none — content modules are exercised through the slide tests)

Per spec §4.1–§4.5. Single source of truth so editing copy doesn't require touching slide components. This unblocks Task 3.4's deferred test run.

- [ ] **Step 1: Implement `content.ts`**

Create `src/slides/foundation-core/content.ts`:

```typescript
// Single source of truth for all Section D slide copy.

export const d1Content = {
  beat1: {
    statValue: 73,                       // animated 0 → 73
    statSuffix: "%",
    subLine: "of automation projects fail.",
    subLineKeywords: ["fail"] as const,
    caption: "— widely cited across automation industry research, 2024–2026",
  },
  beat2: {
    mechanism: "Automation amplifies what's already there. Broken or excellent.",
    mechanismKeywords: ["Automation", "Broken", "excellent"] as const,
    manualBar: { fromPct: 0, toPct: 18, counterTo: 1, label: "manual pace" },
    machineBar: { fromPct: 0, toPct: 140, counterTo: 1000, label: "machine pace" },
  },
  beat3: {
    prescription: "Fix the spec first. Then automate.",
    prescriptionKeywords: ["spec"] as const,
    subPrescription: "Process improvement is a prerequisite, not a phase.",
    subPrescriptionKeywords: ["prerequisite"] as const,
  },
};

export const d2Content = {
  headline: "Three disciplines converge. One evolves.",
  headlineKeywords: ["converge", "evolves"] as const,
  cards: [
    {
      key: "bpm" as const,
      title: "BPM",
      subName: "Business Process Management",
      tagline: "The GPS for operations",
      taglineKeywords: ["GPS"] as const,
      bullets: [
        "Holistic workflow optimization",
        "Identifies bottlenecks and waste",
        "Redesigns end-to-end flow",
      ],
      copperStop: "copper-700" as const,
      position: "bpm-tl" as const,
      hoverAnalogy:
        "Like asking 'where's the waste?' before you ask 'how do we go faster?'.",
    },
    {
      key: "rpa" as const,
      title: "RPA",
      subName: "Robotic Process Automation",
      tagline: "Deterministic digital workers",
      taglineKeywords: ["Deterministic"] as const,
      bullets: [
        "Rule-based task execution",
        "Fast, reliable, no intelligence needed",
        "Scales repetitive operations",
      ],
      copperStop: "copper-500" as const,
      position: "rpa-tr" as const,
      hoverAnalogy:
        "Like a digital worker following a checklist exactly — fast, never tired, never improvises.",
    },
    {
      key: "ai" as const,
      title: "AI",
      subName: "Artificial Intelligence",
      tagline: "Core strengths",
      taglineKeywords: ["Core strengths"] as const,
      bullets: [
        "Summarization & analysis",
        "Generation & NLU",
        "Multimodal & adaptive learning",
      ],
      copperStop: "copper-400" as const,
      position: "ai-bc" as const,
      hoverAnalogy:
        "What AI does well — quickly, at scale, on text/image/audio simultaneously.",
    },
    {
      key: "ipa" as const,
      title: "IPA",
      subName: "Intelligent Process Automation",
      tagline: "End-to-end intelligent workflow",
      taglineKeywords: ["intelligent"] as const,
      bullets: [
        "Combines process, automation, and AI",
        "Context-aware and adaptive",
        "End-to-end orchestration",
      ],
      copperStop: "copper-300" as const,
      position: "ipa-c" as const,
      hoverAnalogy:
        "Process discipline + deterministic automation + AI strengths, in one workflow.",
    },
    {
      key: "agentic" as const,
      title: "AGENTIC AUTOMATION",
      subName: "Autonomous Agents",
      tagline: "Goals, not just steps",
      taglineKeywords: ["Goals"] as const,
      bullets: [
        "Self-directed orchestration toward outcomes",
        "Multi-agent collaboration",
        "Continuous learning and adaptation",
      ],
      copperStop: "copper-200" as const,
      position: "agentic-r" as const,
      hoverAnalogy:
        "An agent that pursues a goal — 'ensure zero unplanned downtime' — and adapts as conditions change.",
    },
  ],
};

export const d3Content = {
  headline: "Monthly operations report — the same process at every level.",
  headlineKeywords: ["every level"] as const,
  levels: [
    {
      key: "bpm" as const,
      ask: "Where's the waste?",
      askKeywords: ["waste"] as const,
      doText:
        "Redesign report scope; consolidate three duplicate reports into one; integrate data sources end-to-end.",
      doKeywords: [] as const,
      outcome: "Fewer reports; clearer signal.",
      convergedBullets: [
        "Redesigned report scope",
        "3 reports → 1",
        "Sources integrated end-to-end",
      ],
    },
    {
      key: "rpa" as const,
      ask: "What repeats?",
      askKeywords: ["repeats"] as const,
      doText:
        "Bot pulls KPIs each Monday; populates the template; distributes to stakeholders.",
      doKeywords: [] as const,
      outcome: "Hours reclaimed; zero copy-paste.",
      convergedBullets: [
        "Bot pulls KPIs Monday",
        "Auto-fills template",
        "Auto-distributes",
      ],
    },
    {
      key: "ipa" as const,
      ask: "Which steps need AI's core strengths?",
      askKeywords: ["core strengths"] as const,
      doText:
        "Layer AI's core strengths: summarization (compress raw data), analysis (spot anomalies), generation (draft narrative), NLU (interpret stakeholder comments).",
      doKeywords: ["summarization", "analysis", "generation", "NLU"] as const,
      outcome: "Insight, not just data.",
      convergedBullets: [
        "Bot reads sources → summarizes anomalies",
        "Drafts narrative",
        "Flags risks",
      ],
    },
    {
      key: "agentic" as const,
      ask: "Can this run itself?",
      askKeywords: ["run itself"] as const,
      doText:
        "Agent monitors continuously; generates report on demand; escalates to leadership without being asked.",
      doKeywords: [] as const,
      outcome: "Earlier risk detection; report becomes ambient.",
      convergedBullets: [
        "Agent monitors continuously",
        "Generates on demand",
        "Escalates without being asked",
      ],
    },
  ],
  aiFeederBullets: [
    "Summarization · generation",
    "Analysis · NLU",
    "On the source data",
  ],
  resultCapstone: "~80% time saved · risks surfaced earlier",
  resultCapstoneKeywords: ["~80% time saved", "risks surfaced earlier"] as const,
};

export const d4Content = {
  headline: "Each level builds on the previous. You can't skip.",
  headlineKeywords: ["previous"] as const,
  footerCaption: "Skip a level, and the level above fails harder.",
  footerCaptionKeywords: ["fails harder"] as const,
  ladder: {
    questions: [
      { number: 1, question: "Does the process work today?", keywords: ["work today"] as const, yesLabel: "continue", noLabel: "STOP ↻" },
      { number: 2, question: "Have you removed waste + bottlenecks?", keywords: ["waste"] as const, yesLabel: "continue", noLabel: "apply BPM first" },
      { number: 3, question: "Are there repetitive, rule-based steps?", keywords: ["repetitive"] as const, yesLabel: "RPA", noLabel: "continue" },
      { number: 4, question: "Do steps need AI's core strengths?", keywords: ["AI's core strengths"] as const, yesLabel: "IPA", noLabel: "continue" },
      { number: 5, question: "Should it pursue a goal autonomously?", keywords: ["goal autonomously"] as const, yesLabel: "AGENTIC", noLabel: "stay at IPA" },
    ],
    terminals: [
      {
        abbrev: "BPM",
        subLine: "Redesign + integrate. The foundation everything else stands on.",
        altitudeTier: 1 as const,
        hoverExample: "Example: cut a 20-step approval flow to 8 steps before automating any of it.",
        fromQ: 2,
        branch: "no" as const,
      },
      {
        abbrev: "RPA",
        subLine: "Automate the rule-based parts. Reclaim hours.",
        altitudeTier: 2 as const,
        hoverExample: "Example: bot pulls 6 reports each Monday, fills the template, distributes.",
        fromQ: 3,
        branch: "yes" as const,
      },
      {
        abbrev: "IPA",
        subLine: "Layer AI's core strengths. Insight, not just data.",
        altitudeTier: 3 as const,
        hoverExample: "Example: bot reads source data, summarizes anomalies, flags risks for human review.",
        fromQ: 4,
        branch: "yes" as const,
      },
      {
        abbrev: "AGENTIC",
        subLine: "Autonomous orchestration. The process pursues the goal.",
        altitudeTier: 4 as const,
        hoverExample: "Example: agent monitors operations continuously, generates report on demand, escalates without being asked.",
        fromQ: 5,
        branch: "yes" as const,
      },
    ],
  },
};

export const d5Content = {
  beat1: { text: "Process is the spec.", keywords: ["spec"] as const },
  beat2: { text: "Engineering is the system around it.", keywords: ["system"] as const },
  bridge: { text: "Next: how that system gets built.", keywords: ["Next"] as const },
};
```

- [ ] **Step 2: Run typecheck**

Run: `npx tsc -b`
Expected: PASS — `content.ts` typechecks cleanly.

- [ ] **Step 3: Resume Task 3.4 — run the LadderRise test**

Run: `npx vitest run tests/unit/LadderRise.test.tsx`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/slides/foundation-core/content.ts
git commit -m "feat(foundation-core): add content module (D.1–D.5 frozen copy)"
```

If Task 3.4's commit was deferred, commit it now too:

```bash
git add src/slides/foundation-core/components/LadderRise.tsx tests/unit/LadderRise.test.tsx
git commit -m "feat(foundation-core): add LadderRise parent (composes Q + Terminal + LoopBack)"
```

---

## Phase 6 — Per-slide implementations

### Task 6.1: D.1 — THE TRAP

**Files:**
- Create: `src/slides/foundation-core/d1-the-trap.tsx`
- Test: `tests/unit/d1-the-trap.test.tsx`

Per spec §4.1. 4 advances; canonicalPose = 3. Three rhetorical movements stacked, separated by thin copper-rule dividers.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/d1-the-trap.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D1TheTrap, d1Slide } from "@/slides/foundation-core/d1-the-trap";

test("D.1 declares 4 steps with canonicalPose=3", () => {
  expect(d1Slide.steps).toBe(4);
  expect(d1Slide.canonicalPose).toBe(3);
  expect(d1Slide.animationMode).toBe("step-reveal");
});

test("D.1 renders the FIG label, the 73% counter, and both amplification bars", () => {
  render(
    <DeckProvider stepCounts={[d1Slide.steps]}>
      <D1TheTrap />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.1 · THE TRAP/)).toBeInTheDocument();
  expect(screen.getAllByTestId("amplification-bar")).toHaveLength(2);
  // The 73 counter has data-count-to=73.
  const counter = screen.getByTestId("d1-stat-counter");
  expect(counter.getAttribute("data-count-to")).toBe("73");
});

test("D.1 renders the prescription text with copper-italic 'spec' keyword", () => {
  render(
    <DeckProvider stepCounts={[d1Slide.steps]}>
      <D1TheTrap />
    </DeckProvider>,
  );
  expect(screen.getByText(/Fix the/)).toBeInTheDocument();
  expect(screen.getByText("spec")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/d1-the-trap.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `D1TheTrap` and `d1Slide`**

Create `src/slides/foundation-core/d1-the-trap.tsx`:

```tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { CountUp } from "./components/CountUp";
import { AmplificationBar } from "./components/AmplificationBar";
import { d1Content as C } from "./content";

function Divider({ shown }: { shown: boolean }) {
  return (
    <motion.hr
      className="w-[30%] self-center border-0 border-t border-copper-700"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: shown ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "left center" }}
    />
  );
}

export function D1TheTrap() {
  const { stepIndex } = useDeck();
  // Beats 1/2/3 reveal at stepIndex 0/1/2; everything settles by stepIndex 3.
  const showStat = stepIndex >= 0;
  const showMechanism = stepIndex >= 1;
  const showBars = stepIndex >= 2;
  const showPrescription = stepIndex >= 3;

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="D" num={1} label="THE TRAP" />
      <div className="relative z-10 mx-auto flex h-full max-w-[80vw] flex-col items-center justify-center gap-10 px-12 py-20 text-center">
        {/* Beat 1 — number */}
        {showStat && (
          <div className="flex flex-col items-center gap-4">
            <h1
              className="font-display text-copper-400"
              style={{ fontSize: "clamp(7rem, 16vw, 17.5rem)", lineHeight: 1 }}
            >
              〔
              <CountUp from={0} to={C.beat1.statValue} durationMs={1500} testId="d1-stat-counter" />
              〕{C.beat1.statSuffix}
            </h1>
            <motion.hr
              className="border-0 border-t border-copper-700"
              initial={{ scaleX: 0, width: "30%" }}
              animate={{ scaleX: showStat ? 1 : 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left center" }}
            />
            <motion.p
              className="font-serif text-neutral-50"
              style={{ fontSize: "clamp(2rem, 2.75vw, 2.75rem)", lineHeight: 1.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showStat ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            >
              {highlight(C.beat1.subLine, C.beat1.subLineKeywords)}
            </motion.p>
            <motion.p
              className="font-sans text-neutral-400"
              style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showStat ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 2.0 }}
            >
              {C.beat1.caption}
            </motion.p>
          </div>
        )}

        <Divider shown={showMechanism} />

        {/* Beat 2 — mechanism + bars */}
        {showMechanism && (
          <div className="flex flex-col items-center gap-8">
            <motion.h2
              className="font-display text-neutral-50"
              style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {highlight(C.beat2.mechanism, C.beat2.mechanismKeywords)}
            </motion.h2>
            {showBars && (
              <div className="flex w-full max-w-3xl flex-col gap-4">
                <AmplificationBar {...C.beat2.manualBar} offFrame={false} durationMs={500} />
                <AmplificationBar {...C.beat2.machineBar} offFrame durationMs={1200} delayMs={700} />
              </div>
            )}
          </div>
        )}

        <Divider shown={showPrescription} />

        {/* Beat 3 — prescription */}
        {showPrescription && (
          <div className="flex flex-col items-center gap-4">
            <motion.h2
              className="font-display text-neutral-50"
              style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {highlight(C.beat3.prescription, C.beat3.prescriptionKeywords)}
            </motion.h2>
            <motion.p
              className="font-serif italic text-neutral-300"
              style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", lineHeight: 1.35 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {highlight(C.beat3.subPrescription, C.beat3.subPrescriptionKeywords)}
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}

export const d1Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <D1TheTrap />,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/d1-the-trap.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/d1-the-trap.tsx tests/unit/d1-the-trap.test.tsx
git commit -m "feat(foundation-core): add D.1 — THE TRAP slide"
```

### Task 6.2: D.2 — THE CONVERGENCE

**Files:**
- Create: `src/slides/foundation-core/d2-the-convergence.tsx`
- Test: `tests/unit/d2-the-convergence.test.tsx`

Per spec §4.2. 5 advances; canonicalPose = 4. 5-card convergence diagram with 3 inward arrows + 1 evolution arrow.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/d2-the-convergence.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D2TheConvergence, d2Slide } from "@/slides/foundation-core/d2-the-convergence";

test("D.2 declares 5 steps with canonicalPose=4", () => {
  expect(d2Slide.steps).toBe(5);
  expect(d2Slide.canonicalPose).toBe(4);
  expect(d2Slide.animationMode).toBe("step-reveal");
});

test("D.2 renders the FIG label, headline, and 5 convergence cards", () => {
  render(
    <DeckProvider stepCounts={[d2Slide.steps]}>
      <D2TheConvergence />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.2 · THE CONVERGENCE/)).toBeInTheDocument();
  expect(screen.getByText(/Three disciplines/)).toBeInTheDocument();
  expect(screen.getAllByTestId("convergence-card")).toHaveLength(5);
});

test("D.2 cards span all 5 expected positions", () => {
  render(
    <DeckProvider stepCounts={[d2Slide.steps]}>
      <D2TheConvergence />
    </DeckProvider>,
  );
  const positions = screen
    .getAllByTestId("convergence-card")
    .map((c) => c.getAttribute("data-position"))
    .sort();
  expect(positions).toEqual(["agentic-r", "ai-bc", "bpm-tl", "ipa-c", "rpa-tr"]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/d2-the-convergence.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement D.2**

Create `src/slides/foundation-core/d2-the-convergence.tsx`:

```tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HoverReveal } from "@/components/HoverReveal";
import { highlight } from "@/components/highlight";
import { ConvergenceCard, type ConvergenceSlot } from "./components/ConvergenceCard";
import { d2Content as C } from "./content";

// Pixel-level geometry of the 5-card layout. Positions are percent-based so
// the layout scales with the slide.
const SLOT_STYLE: Record<ConvergenceSlot, React.CSSProperties> = {
  "bpm-tl":      { top: "20%", left: "10%" },
  "rpa-tr":      { top: "20%", right: "10%" },
  "ai-bc":       { bottom: "12%", left: "50%", transform: "translateX(-50%)" },
  "ipa-c":       { top: "45%", left: "50%", transform: "translate(-50%, -50%)" },
  "agentic-r":   { top: "45%", right: "8%", transform: "translateY(-50%)" },
};

// Which step each card reveals at: BPM=0, RPA=1, AI=2, IPA=3, AGENTIC=4.
const REVEAL_STEP: Record<string, number> = {
  bpm: 0,
  rpa: 1,
  ai: 2,
  ipa: 3,
  agentic: 4,
};

export function D2TheConvergence() {
  const { stepIndex } = useDeck();
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="D" num={2} label="THE CONVERGENCE" />
      <h1
        className="absolute left-12 right-12 top-12 z-10 font-display text-neutral-50"
        style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.2 }}
      >
        {highlight(C.headline, C.headlineKeywords)}
      </h1>

      {/* Convergence cards */}
      {C.cards.map((card) => (
        <motion.div
          key={card.key}
          className="absolute"
          style={SLOT_STYLE[card.position]}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: stepIndex >= REVEAL_STEP[card.key] ? 1 : 0,
            y: stepIndex >= REVEAL_STEP[card.key] ? 0 : 8,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <HoverReveal
            position="below"
            trigger={
              <ConvergenceCard
                title={card.title}
                subName={card.subName}
                tagline={card.tagline}
                taglineKeywords={card.taglineKeywords}
                bullets={card.bullets}
                copperStop={card.copperStop}
                position={card.position}
              />
            }
            payload={
              <span className="block max-w-[420px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100 shadow" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.45 }}>
                {card.hoverAnalogy}
              </span>
            }
          />
        </motion.div>
      ))}

      {/* Connector arrows — drawn over the cards. SVG occupies the full slide. */}
      <svg className="pointer-events-none absolute inset-0 z-0" data-testid="d2-arrows">
        {/* BPM → IPA */}
        <motion.path
          d="M 20% 25% L 45% 45%"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 3 ? 1 : 0 }}
          transition={{ duration: 0.2, delay: stepIndex >= 3 ? 0 : 0 }}
        />
        {/* RPA → IPA */}
        <motion.path
          d="M 80% 25% L 55% 45%"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 3 ? 1 : 0 }}
          transition={{ duration: 0.2, delay: stepIndex >= 3 ? 0.2 : 0 }}
        />
        {/* AI → IPA */}
        <motion.path
          d="M 50% 80% L 50% 55%"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 3 ? 1 : 0 }}
          transition={{ duration: 0.2, delay: stepIndex >= 3 ? 0.4 : 0 }}
        />
        {/* IPA → AGENTIC */}
        <motion.path
          d="M 55% 45% L 80% 45%"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 4 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <defs>
          <marker id="d2-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#7a4626" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export const d2Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <D2TheConvergence />,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/d2-the-convergence.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/d2-the-convergence.tsx tests/unit/d2-the-convergence.test.tsx
git commit -m "feat(foundation-core): add D.2 — THE CONVERGENCE slide"
```

### Task 6.3: D.3 — ONE PROCESS, FOUR LEVELS

**Files:**
- Create: `src/slides/foundation-core/d3-one-process-four-levels.tsx`
- Test: `tests/unit/d3-one-process-four-levels.test.tsx`

Per spec §4.3. 5 advances; canonicalPose = 4. The most complex slide — `<LevelCard>` morphing across focal/filed/converged via Framer's `layoutId`, with glyphs playing only on focal entry.

The mode-progression table:

| Step | BPM | RPA | IPA | AGENTIC | AI feeder |
|---|---|---|---|---|---|
| 0 | focal | hidden | hidden | hidden | hidden |
| 1 | filed (bpm-tl) | focal | hidden | hidden | hidden |
| 2 | filed (bpm-tl) | filed (rpa-tr) | focal | hidden | converged (ai-bc) |
| 3 | filed (bpm-tl) | filed (rpa-tr) | converged (ipa-c) | focal | converged (ai-bc) |
| 4 | converged (bpm-tl) | converged (rpa-tr) | converged (ipa-c) | converged (agentic-r) | converged (ai-bc) |

- [ ] **Step 1: Write the failing test**

Create `tests/unit/d3-one-process-four-levels.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D3OneProcessFourLevels, d3Slide } from "@/slides/foundation-core/d3-one-process-four-levels";

test("D.3 declares 5 steps with canonicalPose=4", () => {
  expect(d3Slide.steps).toBe(5);
  expect(d3Slide.canonicalPose).toBe(4);
});

test("D.3 at step 0 shows BPM in focal mode and the other 3 levels are absent", () => {
  render(
    <DeckProvider stepCounts={[d3Slide.steps]}>
      <D3OneProcessFourLevels />
    </DeckProvider>,
  );
  const cards = screen.getAllByTestId("level-card");
  expect(cards).toHaveLength(1);
  expect(cards[0].getAttribute("data-level")).toBe("bpm");
  expect(cards[0].getAttribute("data-mode")).toBe("focal");
});

test("D.3 renders the FIG label and headline", () => {
  render(
    <DeckProvider stepCounts={[d3Slide.steps]}>
      <D3OneProcessFourLevels />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.3 · ONE PROCESS · FOUR LEVELS/)).toBeInTheDocument();
  expect(screen.getByText(/Monthly operations report/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/d3-one-process-four-levels.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement D.3**

Create `src/slides/foundation-core/d3-one-process-four-levels.tsx`:

```tsx
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LevelCard, type LevelMode, type LevelPosition } from "./components/LevelCard";
import { ConvergenceCard } from "./components/ConvergenceCard";
import { BpmCompressionGlyph } from "./glyphs/BpmCompressionGlyph";
import { RpaAccelerationGlyph } from "./glyphs/RpaAccelerationGlyph";
import { IpaSynthesisGlyph } from "./glyphs/IpaSynthesisGlyph";
import { AgenticInversionGlyph } from "./glyphs/AgenticInversionGlyph";
import { d2Content } from "./content";
import { d3Content as C } from "./content";

// Re-use D.2's 5 slot positions for converged cards (geometry rhyme — spec §5.3).
const SLOT_STYLE: Record<string, CSSProperties> = {
  "bpm-tl":    { top: "18%", left: "8%", position: "absolute" },
  "rpa-tr":    { top: "18%", right: "8%", position: "absolute" },
  "ai-bc":     { bottom: "10%", left: "50%", transform: "translateX(-50%)", position: "absolute" },
  "ipa-c":     { top: "45%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" },
  "agentic-r": { top: "45%", right: "8%", transform: "translateY(-50%)", position: "absolute" },
  "center":    { top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" },
};

type LevelKey = "bpm" | "rpa" | "ipa" | "agentic";

interface LevelLayout {
  mode: LevelMode | "hidden";
  position: LevelPosition;
}

// Mode-progression matrix per spec §4.3 motion table.
function levelLayoutAtStep(level: LevelKey, step: number): LevelLayout {
  if (level === "bpm") {
    if (step === 0) return { mode: "focal", position: "center" };
    if (step <= 3) return { mode: "filed", position: "bpm-tl" };
    return { mode: "converged", position: "bpm-tl" };
  }
  if (level === "rpa") {
    if (step <= 0) return { mode: "hidden", position: "center" };
    if (step === 1) return { mode: "focal", position: "center" };
    if (step <= 3) return { mode: "filed", position: "rpa-tr" };
    return { mode: "converged", position: "rpa-tr" };
  }
  if (level === "ipa") {
    if (step <= 1) return { mode: "hidden", position: "center" };
    if (step === 2) return { mode: "focal", position: "center" };
    return { mode: "converged", position: "ipa-c" };
  }
  // agentic
  if (step <= 2) return { mode: "hidden", position: "center" };
  if (step === 3) return { mode: "focal", position: "center" };
  return { mode: "converged", position: "agentic-r" };
}

const GLYPHS = {
  bpm: BpmCompressionGlyph,
  rpa: RpaAccelerationGlyph,
  ipa: IpaSynthesisGlyph,
  agentic: AgenticInversionGlyph,
} as const;

export function D3OneProcessFourLevels() {
  const { stepIndex } = useDeck();
  // AI feeder card appears at Space 3 (stepIndex >= 2) directly at ai-bc.
  const showAiFeeder = stepIndex >= 2;
  // Result capstone appears at Space 5 (stepIndex >= 4).
  const showCapstone = stepIndex >= 4;

  // The D.2 source-of-truth for AI card content.
  const aiCard = d2Content.cards.find((c) => c.key === "ai")!;

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="D" num={3} label="ONE PROCESS · FOUR LEVELS" />
      <h1
        className="absolute left-12 right-12 top-12 z-10 font-display text-neutral-50"
        style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)", lineHeight: 1.2 }}
      >
        {highlight(C.headline, C.headlineKeywords)}
      </h1>

      {/* The four morphing level cards */}
      {C.levels.map((level) => {
        const layout = levelLayoutAtStep(level.key, stepIndex);
        if (layout.mode === "hidden") return null;
        const Glyph = GLYPHS[level.key];
        const cardD2 = d2Content.cards.find((c) => c.key === level.key)!;
        return (
          <div key={level.key} style={SLOT_STYLE[layout.position]}>
            <LevelCard
              level={level.key}
              mode={layout.mode}
              position={layout.position}
              ask={level.ask}
              askKeywords={level.askKeywords}
              doText={level.doText}
              doKeywords={level.doKeywords}
              outcome={level.outcome}
              glyph={<Glyph play={layout.mode === "focal"} />}
              convergedTitle={cardD2.title}
              convergedSubName={cardD2.subName}
              convergedTagline={cardD2.tagline}
              convergedTaglineKeywords={cardD2.taglineKeywords}
              convergedBullets={level.convergedBullets}
              convergedCopperStop={cardD2.copperStop}
            />
          </div>
        );
      })}

      {/* AI feeder card — never has a focal scene */}
      {showAiFeeder && (
        <motion.div
          style={SLOT_STYLE["ai-bc"]}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ConvergenceCard
            title={aiCard.title}
            subName={aiCard.subName}
            tagline={aiCard.tagline}
            taglineKeywords={aiCard.taglineKeywords}
            bullets={C.aiFeederBullets}
            copperStop={aiCard.copperStop}
            position="ai-bc"
          />
        </motion.div>
      )}

      {/* Result capstone footer */}
      {showCapstone && (
        <motion.p
          className="absolute bottom-6 left-12 right-12 z-10 text-center font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.75rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {highlight(C.resultCapstone, C.resultCapstoneKeywords)}
        </motion.p>
      )}
    </div>
  );
}

export const d3Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <D3OneProcessFourLevels />,
};
```

- [ ] **Step 4: Wire converged-mode hover (spec §4.3 acceptance criterion)**

Per spec §4.3: *"Hover (post-Space 5, on the reassembled converged cards): each card hover reveals the Ask-to-Outcome expanded view from its focal pose."*

In `src/slides/foundation-core/d3-one-process-four-levels.tsx`, replace the four-level rendering block with this version that wraps each converged `<LevelCard>` (and the AI feeder `<ConvergenceCard>`) in `<HoverReveal>` post-canonical-pose:

```tsx
import { HoverReveal } from "@/components/HoverReveal";

// (keep the existing imports + helpers; only the JSX render changes below)

{C.levels.map((level) => {
  const layout = levelLayoutAtStep(level.key, stepIndex);
  if (layout.mode === "hidden") return null;
  const Glyph = GLYPHS[level.key];
  const cardD2 = d2Content.cards.find((c) => c.key === level.key)!;

  const card = (
    <LevelCard
      level={level.key}
      mode={layout.mode}
      position={layout.position}
      ask={level.ask}
      askKeywords={level.askKeywords}
      doText={level.doText}
      doKeywords={level.doKeywords}
      outcome={level.outcome}
      glyph={<Glyph play={layout.mode === "focal"} />}
      convergedTitle={cardD2.title}
      convergedSubName={cardD2.subName}
      convergedTagline={cardD2.tagline}
      convergedTaglineKeywords={cardD2.taglineKeywords}
      convergedBullets={level.convergedBullets}
      convergedCopperStop={cardD2.copperStop}
    />
  );

  // Hover only attaches at canonical pose, on converged cards (§4.3).
  const wrapHover = layout.mode === "converged" && stepIndex >= 4;
  return (
    <div key={level.key} style={SLOT_STYLE[layout.position]}>
      {wrapHover ? (
        <HoverReveal
          position="below"
          trigger={card}
          payload={
            <span className="block max-w-[420px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100 shadow" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.45 }}>
              <strong className="not-italic text-copper-300">Ask:</strong> {level.ask}<br />
              <strong className="not-italic text-copper-300">Outcome:</strong> {level.outcome}
            </span>
          }
        />
      ) : (
        card
      )}
    </div>
  );
})}
```

The AI feeder card already uses `<ConvergenceCard>` directly; wrap *that* in `<HoverReveal>` too at canonical pose (its analogy line lives in `d2Content.cards` under the `ai` key as `hoverAnalogy`).

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/d3-one-process-four-levels.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core/d3-one-process-four-levels.tsx tests/unit/d3-one-process-four-levels.test.tsx
git commit -m "feat(foundation-core): add D.3 — ONE PROCESS, FOUR LEVELS slide"
```

### Task 6.4: D.4 — DECISION PATTERN

**Files:**
- Create: `src/slides/foundation-core/d4-decision-pattern.tsx`
- Test: `tests/unit/d4-decision-pattern.test.tsx`

Per spec §4.4. 5 advances; canonicalPose = 4. Composes `<LadderRise>` driven by `revealedSteps`.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/d4-decision-pattern.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D4DecisionPattern, d4Slide } from "@/slides/foundation-core/d4-decision-pattern";

test("D.4 declares 5 steps with canonicalPose=4", () => {
  expect(d4Slide.steps).toBe(5);
  expect(d4Slide.canonicalPose).toBe(4);
});

test("D.4 renders the FIG label, headline, the LadderRise diagram, and the footer caption", () => {
  render(
    <DeckProvider stepCounts={[d4Slide.steps]}>
      <D4DecisionPattern />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.4 · WHICH LEVEL, WHEN/)).toBeInTheDocument();
  expect(screen.getByText(/Each level builds/)).toBeInTheDocument();
  expect(screen.getByTestId("ladder-rise")).toBeInTheDocument();
  expect(screen.getByText(/fails harder/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/d4-decision-pattern.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement D.4**

Create `src/slides/foundation-core/d4-decision-pattern.tsx`:

```tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LadderRise } from "./components/LadderRise";
import { d4Content as C } from "./content";

export function D4DecisionPattern() {
  const { stepIndex } = useDeck();
  // stepIndex 0..4 maps directly to revealedSteps 1..5.
  const revealedSteps = stepIndex + 1;
  const showFooter = stepIndex >= 4;
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="D" num={4} label="WHICH LEVEL, WHEN" />
      <h1
        className="absolute left-12 right-12 top-12 z-10 font-display text-neutral-50"
        style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.2 }}
      >
        {highlight(C.headline, C.headlineKeywords)}
      </h1>
      <div className="relative h-full w-full pt-32">
        <LadderRise content={C.ladder} revealedSteps={revealedSteps} />
      </div>
      <motion.p
        className="absolute bottom-8 right-12 z-10 font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.75rem)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showFooter ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {highlight(C.footerCaption, C.footerCaptionKeywords)}
      </motion.p>
    </div>
  );
}

export const d4Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <D4DecisionPattern />,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/d4-decision-pattern.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/d4-decision-pattern.tsx tests/unit/d4-decision-pattern.test.tsx
git commit -m "feat(foundation-core): add D.4 — DECISION PATTERN slide"
```

### Task 6.5: D.5 — BRIDGE TO E

**Files:**
- Create: `src/slides/foundation-core/d5-bridge-to-e.tsx`
- Test: `tests/unit/d5-bridge-to-e.test.tsx`

Per spec §4.5. 3 advances; canonicalPose = 2. Photo full-bleed + 3 stagger-fade lines. Reuses `<HeroPhoto>`, `<DisplayPhrase>`. Per spec §4.5: stillness IS the design — no ambient.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/d5-bridge-to-e.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D5BridgeToE, d5Slide } from "@/slides/foundation-core/d5-bridge-to-e";

test("D.5 declares 3 steps with canonicalPose=2", () => {
  expect(d5Slide.steps).toBe(3);
  expect(d5Slide.canonicalPose).toBe(2);
});

test("D.5 renders the FIG label, the hero vignette, and all three editorial lines", () => {
  render(
    <DeckProvider stepCounts={[d5Slide.steps]}>
      <D5BridgeToE />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.5 · THE NEXT QUESTION/)).toBeInTheDocument();
  expect(screen.getByTestId("hero-vignette")).toBeInTheDocument();
  expect(screen.getByText(/Process is the/)).toBeInTheDocument();
  expect(screen.getByText("spec")).toBeInTheDocument();
  expect(screen.getByText(/Engineering is the/)).toBeInTheDocument();
  expect(screen.getByText(/how that system gets built/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/d5-bridge-to-e.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement D.5**

Create `src/slides/foundation-core/d5-bridge-to-e.tsx`:

```tsx
import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { highlight } from "@/components/highlight";
import { d5Content as C } from "./content";

export function D5BridgeToE() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/d5-bridge.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="D" num={5} label="THE NEXT QUESTION" />
      <div className="absolute bottom-24 left-24 z-20 flex max-w-[60vw] flex-col gap-8">
        <StepReveal>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat1.text, C.beat1.keywords)}
          </p>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.75rem, 4.5vw, 4.5rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat2.text, C.beat2.keywords)}
          </p>
          <p
            className="font-serif italic text-neutral-200"
            style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)", lineHeight: 1.4 }}
          >
            {highlight(C.bridge.text, C.bridge.keywords)}
          </p>
        </StepReveal>
      </div>
    </div>
  );
}

export const d5Slide: SlideDef = {
  steps: 3,
  animationMode: "step-reveal",
  canonicalPose: 2,
  surface: "dark",
  render: () => <D5BridgeToE />,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/d5-bridge-to-e.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core/d5-bridge-to-e.tsx tests/unit/d5-bridge-to-e.test.tsx
git commit -m "feat(foundation-core): add D.5 — BRIDGE TO E slide"
```

---

## Phase 7 — Wire-up + verification

### Task 7.1: Register Section D slides into the deck

**Files:**
- Create: `src/slides/foundation-core/index.ts`
- Modify: `src/deck/registry.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/foundation-core-index.test.ts`:

```typescript
import { describe, expect, test } from "vitest";
import { foundationCoreSlides } from "@/slides/foundation-core";

describe("foundationCoreSlides", () => {
  test("exports the 5 Section D slides in the spec'd order", () => {
    expect(foundationCoreSlides).toHaveLength(5);
    expect(foundationCoreSlides[0].steps).toBe(4);   // D.1
    expect(foundationCoreSlides[1].steps).toBe(5);   // D.2
    expect(foundationCoreSlides[2].steps).toBe(5);   // D.3
    expect(foundationCoreSlides[3].steps).toBe(5);   // D.4
    expect(foundationCoreSlides[4].steps).toBe(3);   // D.5
  });

  test("total advances per spec §6 = 22", () => {
    const total = foundationCoreSlides.reduce((s, x) => s + x.steps, 0);
    expect(total).toBe(22);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/foundation-core-index.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the index**

Create `src/slides/foundation-core/index.ts`:

```typescript
import type { SlideDef } from "@/deck/types";
import { d1Slide } from "./d1-the-trap";
import { d2Slide } from "./d2-the-convergence";
import { d3Slide } from "./d3-one-process-four-levels";
import { d4Slide } from "./d4-decision-pattern";
import { d5Slide } from "./d5-bridge-to-e";

// Spec §1.1 — locked Section D order.
export const foundationCoreSlides: SlideDef[] = [
  d1Slide,
  d2Slide,
  d3Slide,
  d4Slide,
  d5Slide,
];
```

- [ ] **Step 4: Update the deck registry to append Section D**

Modify `src/deck/registry.tsx` — replace its current contents with:

```tsx
import type { SlideDef } from "./types";
import { HexLadder } from "@/primitives/HexLadder";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";
import { foundationCoreSlides } from "@/slides/foundation-core";

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

// Section D (foundation-core) precedes the Reveal+Closing arc in the final
// deck order per the parent meta-spec; for now we register both so dev/
// projection-test can navigate the full sequence.
export const deckSlides: SlideDef[] = [
  ...foundationCoreSlides,
  ...revealAndClosingSlides,
  hexLadderDevSlide,
];
```

- [ ] **Step 5: Run the index test**

Run: `npx vitest run tests/unit/foundation-core-index.test.ts`
Expected: PASS.

- [ ] **Step 6: Run the full unit test suite**

Run: `npm test`
Expected: PASS — all unit tests green.

- [ ] **Step 7: Run the dev server smoke check**

Run: `npm run build`
Expected: PASS — Vite production build succeeds.

- [ ] **Step 8: Commit**

```bash
git add src/slides/foundation-core/index.ts src/deck/registry.tsx tests/unit/foundation-core-index.test.ts
git commit -m "feat(foundation-core): register Section D slides into the deck registry"
```

### Task 7.2: Update the keyboard-nav e2e to cover the expanded deck

**Files:**
- Modify: `tests/e2e/keyboard-nav.spec.ts`

- [ ] **Step 1: Update the slide-count assertion**

Edit `tests/e2e/keyboard-nav.spec.ts`. Find the assertion `expect(count).toBeGreaterThanOrEqual(10);` (in the first test, "ArrowRight walks the deck from slide 0 to the last slide") and replace it with:

```typescript
  expect(count).toBeGreaterThanOrEqual(15); // 5 foundation-core + 9 reveal-and-closing + HexLadder
```

Also find the test "I.3 (slide 2) is interactive: clicks on list items don't bubble past Interactive wrapper" and update its `await page.goto("/?slide=2")` to `await page.goto("/?slide=7")` — Section D occupies slides 0–4, so I.3 is now at index 7.

- [ ] **Step 2: Run the e2e test**

Run: `npx playwright test tests/e2e/keyboard-nav.spec.ts --reporter=line`
Expected: PASS — both tests green.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/keyboard-nav.spec.ts
git commit -m "test(e2e): expand keyboard-nav coverage for foundation-core arc"
```

### Task 7.3: Verify PDF + PPTX export of the full deck

**Files:**
- Modify (if necessary): `tests/e2e/pdf-export.spec.ts`, `tests/e2e/pptx-export.spec.ts`

- [ ] **Step 1: Inspect the export specs for slide-count or per-slide assertions**

Run: `grep -n "toHaveLength\|toBe\|toBeGreaterThanOrEqual" tests/e2e/pdf-export.spec.ts tests/e2e/pptx-export.spec.ts`

If the assertions reference a fixed slide count from the previous arc, bump them to reflect the new deck size (5 foundation-core + 9 reveal-and-closing + 1 HexLadder = 15).

- [ ] **Step 2: Run the PDF export script**

Run: `npm run export:pdf`
Expected: PASS — `exports/smoke-deck.pdf` is generated. Inspect it visually (open the file) to confirm all 5 Section D canonical poses are captured cleanly.

- [ ] **Step 3: Run the PPTX export script**

Run: `npm run export:pptx`
Expected: PASS — `exports/smoke-deck.pptx` is generated.

- [ ] **Step 4: Run the export e2e tests**

Run: `npx playwright test tests/e2e/pdf-export.spec.ts tests/e2e/pptx-export.spec.ts --reporter=line`
Expected: PASS.

- [ ] **Step 5: Commit any test bumps (skip if Step 1 made no changes)**

```bash
git add tests/e2e/pdf-export.spec.ts tests/e2e/pptx-export.spec.ts
git commit -m "test(e2e): bump export-pipeline slide-count expectations for foundation-core"
```

### Task 7.4: Acceptance audit against spec §10

**Files:**
- Create: `docs/runbooks/foundation-core-acceptance.md`

The spec §10 lists per-slide and section-wide acceptance criteria. Verify each one against the live deck before declaring Section D done.

- [ ] **Step 1: Boot the dev server**

Run: `npm run dev` (in a background terminal).

- [ ] **Step 2: Walk each slide and tick each criterion**

Open `http://localhost:5173/?slide=0` and step through D.1 → D.5 with Space. For each slide, verify against §10 line items:

- [ ] All content slot-table values are present (per §4.1–§4.5)
- [ ] All keyword highlights appear in copper-italic (verify visually — copper-400 italic)
- [ ] FIG label appears top-left with correct `section.num` and label
- [ ] All declared logical advances trigger correctly via Space (D.1=4, D.2=5, D.3=5, D.4=5, D.5=3)
- [ ] Hover interactions reveal payloads (D.2 cards, D.3 converged cards, D.4 terminal cards)
- [ ] Targeted ambient runs (D.4 STOP↻ pulse only — no other ambient anywhere on D)
- [ ] Canonical pose is reachable (advance to last step on each slide; visual matches spec)

Section-wide:

- [ ] D.1 → D.4 trap callback (STOP↻ ambient) is visible
- [ ] D.2 → D.3 geometry rhyme — D.3 reassembles into D.2's exact 5-slot shape
- [ ] Total logical advances = 22 (confirm via `foundationCoreSlides.reduce((s,x)=>s+x.steps,0)`)
- [ ] No paid dependencies introduced (`grep -r "from \"@stripe\"\|from \"figma\"" src/` returns nothing; review `package.json` diff)

- [ ] **Step 3: Capture the audit log**

Create `docs/runbooks/foundation-core-acceptance.md`:

```markdown
# Foundation Core (Section D) — Acceptance Log

Audit run: <YYYY-MM-DD>
Auditor: <name>

## Per-slide results

| Slide | Slot table ✓ | Keywords ✓ | FIG label ✓ | Advances ✓ | Hover ✓ | Ambient ✓ | Canonical pose ✓ | Notes |
|---|---|---|---|---|---|---|---|---|
| D.1 |   |   |   |   |   |   |   |   |
| D.2 |   |   |   |   |   |   |   |   |
| D.3 |   |   |   |   |   |   |   |   |
| D.4 |   |   |   |   |   |   |   |   |
| D.5 |   |   |   |   |   |   |   |   |

## Section-wide

- [ ] D.1 → D.4 trap callback visible
- [ ] D.2 → D.3 geometry rhyme lands
- [ ] Total advances = 22
- [ ] No paid dependencies introduced

## Open follow-ups

(spec §9 items deferred to implementation: 73% citation lock, copper hex ladder, projection-scale font tuning, Q2 inversion legibility)
```

Fill in checkmarks per the live audit.

- [ ] **Step 4: Commit the log**

```bash
git add docs/runbooks/foundation-core-acceptance.md
git commit -m "docs(foundation-core): add acceptance log template + initial audit"
```

### Task 7.5: Final type-check + full test sweep

**Files:**
- (none — verification only)

- [ ] **Step 1: Run typecheck**

Run: `npx tsc -b`
Expected: PASS — zero TS errors across the project.

- [ ] **Step 2: Run unit tests**

Run: `npm test`
Expected: PASS — every unit test green.

- [ ] **Step 3: Run e2e tests**

Run: `npx playwright test --reporter=line`
Expected: PASS — every e2e test green (including the bumped slide count + export pipelines).

- [ ] **Step 4: Run lint / check (if configured)**

Run: `npm run lint 2>/dev/null || echo "(no lint script)"`
If a lint script exists, expect PASS; if not, the echo confirms the absence.

- [ ] **Step 5: Run a Vite production build**

Run: `npm run build`
Expected: PASS — bundle size sane, no missing imports.

- [ ] **Step 6: Final verification — confirm acceptance**

The Section D acceptance criteria from spec §10 are all met. Report ready for review.

---

## Spec coverage map (self-review)

| Spec section | Implementation |
|---|---|
| §1.1 — Section D locked, 5 slides, 22 advances | Phase 5–7 (slides + index + registry) |
| §3.1 — Reused primitives | Phase 0 promotes them; consumed by D.1–D.5 |
| §3.2 — `<AmplificationBar>` | Task 1.2 |
| §3.2 — `<ConvergenceCard>` | Task 1.3 |
| §3.2 — `<LevelCard>` | Task 1.4 |
| §3.2 — `<LadderRise>` family | Tasks 3.1–3.4 |
| §3.2 — `<CountUp>` | Task 1.1 |
| §4.1 — D.1 THE TRAP | Task 6.1 |
| §4.2 — D.2 THE CONVERGENCE | Task 6.2 |
| §4.3 — D.3 ONE PROCESS, FOUR LEVELS | Task 6.3 |
| §4.3.1 — 4 motion-design glyphs | Tasks 2.1–2.4 |
| §4.4 — D.4 DECISION PATTERN | Task 6.4 |
| §4.5 — D.5 BRIDGE TO E | Task 6.5 + Task 4.1 hero photo |
| §5.1 — Within-section narrative | Reviewed in Task 7.4 audit |
| §5.3 — Meta-callbacks (D.1↔D.4 STOP↻; D.2↔D.3 geometry rhyme) | Task 7.4 audit checklist |
| §6 — Animation budget (22 advances) | Task 7.1 index test asserts total |
| §8.1 — File structure | Phase 0 + every file path in this plan |
| §8.3 — Build order (CountUp → AmplificationBar → ConvergenceCard → glyphs → LevelCard → LadderRise → D.5) | Task ordering matches |
| §8.4 — Glyph implementation notes (pure SVG + Framer, one-shot orchestration, end-state previewable) | Tasks 2.1–2.4 |
| §8.5 — `<LevelCard>` mode-transition design | Task 1.4 |
| §10 — Acceptance criteria | Task 7.4 |

Open items (spec §9) are deferred to implementation per the spec — none of them block Section D from shipping; they are tunings (citation lock, hex ladder, font sizes, Q2 legibility) that surface during projection-test rehearsal.

---

## Out of scope (per spec §0 and §1.2)

- Section A (Hook 1 — BCE Vol-1 Winner)
- Sections B, C (Opening sub-spec)
- Sections E, F (separate brainstorm session — spec §1.2 explicitly defers)
- Sections G, H (Application sub-spec)
- Sections I, J, K (already shipped in Reveal+Closing)
- Practice-lab curriculum
- Final copper hex ladder calibration (settled at projection-test time per meta §6.5)
- Projection-scale font calibration (refined at implementation per meta §7.2)
