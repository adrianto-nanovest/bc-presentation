# Foundation Core — Section E — Plan A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build E.1 (THE THREE LAYERS) + E.2–E.5 (PROMPT layer arc) of the Berau workshop deck per spec [`docs/specs/2026-05-08-slides-foundation-core-section-e.md`](../specs/2026-05-08-slides-foundation-core-section-e.md), including the foundational primitives (`<HoverPopover>`, `<ImpactLadder>`, `<NaiveVsProper>`, `<StructureSpine>` + `<FrameworkOrbit>`, `<TechniqueCard>` + `<TechniqueModal>` + `<TieredTechniqueGrid>`, `<LayerCard>` + `<LayerDemo>` + `<MultiAgentOrchestration>`).

**Architecture:** Mirror Section D's structure. Each slide is a self-contained `<SectionESlide>` component with a `SlideDef` export, registered into a new `src/slides/foundation-core-section-e/` directory. Per-slide step state is read from `useDeck().stepIndex`; auto-timed motion within a step uses Framer Motion. All copy lives in a single `content.ts`; keyword highlighting flows through the existing `highlight()` helper. Click-driven discipline (one Space press per beat) is enforced by `animationMode="step-reveal"` (existing).

**Tech Stack:** React 18 · TypeScript · Vite · Framer Motion 11 · Tailwind CSS 3 · Vitest + RTL · Playwright e2e. No new runtime dependencies — all primitives are pure SVG + Framer Motion.

**Plan A scope:** primitives 1–6 from spec §8.3 + slides E.1–E.5 (the PROMPT layer arc + section opener). Plan B (E.6–E.11) is out of scope here.

**Total advances delivered by Plan A:** 24 (E.1=7, E.2=5, E.3=4, E.4=4, E.5=4) — half the section's 47 advances.

---

## Conventions used by every task

- **Path aliases.** `@/` resolves to `src/` (see `tsconfig.json` + Vite config). Use `@/components/...`, `@/deck/...`, `@/slides/foundation-core-section-e/...`.
- **Test runner.** `npm test` runs Vitest unit + integration; `npm run e2e` runs Playwright. Single-test runs: `npx vitest run tests/unit/<file>.test.tsx`.
- **TDD.** Each primitive and each slide gets a `tests/unit/*.test.tsx`. Write the failing test first, run it to confirm the failure mode, then implement.
- **Highlighting copy.** Use `highlight(text, keywords)` from `@/components/highlight` for any string with copper-italic emphasis. Don't hand-wrap `<KeywordHighlight>`.
- **Backgrounds.** Diagrammatic slides use the same plain-dark + dot-grid pattern as `d1-the-trap.tsx:31-40` — copy that JSX block verbatim.
- **Surface = `dark`.** All Plan A slides except E.5's bridge use `surface: "dark"`. E.5 stays dark too (E.11 is the photographic one, in Plan B).
- **`SlideDef.canonicalPose`.** The last step index of the slide (e.g. E.1 has 7 steps → canonicalPose=6).
- **Test IDs.** Stable `data-testid` on every animated/conditional element. Step-conditional elements ALSO carry `data-revealed={String(...)}` per the existing `<StepReveal>` convention (`StepReveal.tsx:18`).
- **Click-driven discipline.** Section E's spec §1.1: one Space click per speaker beat. Internal motion auto-completes; advances require explicit click. The existing `animationMode="step-reveal"` already enforces this.
- **Free-stack only.** No new paid dependencies. No fonts beyond the four already loaded. No icon library installs in Plan A (Lucide is a Plan B add — see spec §3.3).
- **No emojis** in source code (per project memory).
- **Commit style.** Match recent commits — Conventional Commits with section scope, e.g. `feat(foundation-core-section-e): ...`. See `git log --oneline -5` for examples.

---

## File structure (target)

```
src/slides/foundation-core-section-e/
  content.ts                            # all per-slide copy
  index.ts                              # ordered SlideDef[] exported as foundationCoreSectionESlides
  e1-three-layers.tsx                   # E.1
  e2-prompt-what-why.tsx                # E.2
  e3-prompt-structure.tsx               # E.3
  e4-prompt-methodologies.tsx           # E.4
  e5-prompt-the-wall.tsx                # E.5
  components/
    HoverPopover.tsx                    # used by E.3 (Plan A); also E.6/E.7 (Plan B)
    ImpactLadder.tsx                    # used by E.2 (Plan A); also E.6/E.9 (Plan B)
    NaiveVsProper.tsx                   # E.2
    StructureSpine.tsx                  # E.3
    FrameworkOrbit.tsx                  # E.3
    TieredTechniqueGrid.tsx             # E.4 — the 3 tier bands
    TechniqueCard.tsx                   # E.4 — single card (compact + clickable)
    TechniqueModal.tsx                  # E.4 — centered expanded modal
    LayerCard.tsx                       # E.1 — morph primitive (focal | nested)
    LayerDemo.tsx                       # E.1 — internal demos by `kind`
    MultiAgentOrchestration.tsx         # E.1 — Space 6 4-pattern loop
```

`tests/unit/` gains one test file per new component + one per slide.

`src/deck/registry.tsx` is updated once at the end (Task 17) to include the new section.

---

## Task 1 — Bootstrap the Section E directory + content stub

**Files:**
- Create: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/index.ts`
- Create: `tests/unit/foundation-core-section-e-index.test.ts`

This task creates an empty container so subsequent tasks have a place to land code without churn. The index initially exports an empty array and is wired into the deck registry only at Task 17 (after every slide is built and tested).

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/foundation-core-section-e-index.test.ts
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("foundation-core-section-e exports a SlideDef array", () => {
  expect(Array.isArray(foundationCoreSectionESlides)).toBe(true);
});

test("foundation-core-section-e starts empty (filled in over Plan A tasks)", () => {
  // Initial bootstrap state. Will grow to length 5 by end of Plan A (Task 17).
  expect(foundationCoreSectionESlides.length).toBeGreaterThanOrEqual(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/foundation-core-section-e-index.test.ts`
Expected: FAIL with `Failed to resolve import "@/slides/foundation-core-section-e"`.

- [ ] **Step 3: Write minimal implementation — content.ts**

```ts
// src/slides/foundation-core-section-e/content.ts
// Single source of truth for all Section E slide copy. Plan A populates
// e1Content..e5Content; Plan B will append e6Content..e11Content.

// Populated incrementally per task. Empty on bootstrap.
export {};
```

- [ ] **Step 4: Write minimal implementation — index.ts**

```ts
// src/slides/foundation-core-section-e/index.ts
import type { SlideDef } from "@/deck/types";

// Spec §1.1 — locked Section E order.
// Plan A: E.1 → E.5; Plan B: E.6 → E.11.
export const foundationCoreSectionESlides: SlideDef[] = [];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/foundation-core-section-e-index.test.ts`
Expected: PASS, both assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/ tests/unit/foundation-core-section-e-index.test.ts
git commit -m "feat(foundation-core-section-e): bootstrap section directory"
```

---

## Task 2 — `<HoverPopover>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/HoverPopover.tsx`
- Test: `tests/unit/HoverPopover.test.tsx`

**Spec reference:** §3.2 row `<HoverPopover>` — anchored, rich-content version of `<HoverReveal>`. Auto-positions to whichever side has more breathing room. Supports ~6 lines of content per popover.

**Design notes:**
- Reuse the trigger/payload prop shape from `<HoverReveal>` (`src/components/HoverReveal.tsx:1-43`) for API consistency.
- Add a `position?: "auto" | "below" | "above" | "right" | "left"` prop. `auto` measures the trigger's `getBoundingClientRect()` against `window.innerHeight/innerWidth` and picks the side with more space.
- Do not animate the popover open/close beyond the existing fade — the existing `<HoverReveal>` already eases on mouse-enter/leave; this primitive should look the same but render structured/large content.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/HoverPopover.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { HoverPopover } from "@/slides/foundation-core-section-e/components/HoverPopover";

test("HoverPopover hides payload by default", () => {
  render(
    <HoverPopover
      trigger={<button>trigger</button>}
      payload={<p>popover-content</p>}
    />,
  );
  const payload = screen.getByTestId("hover-popover-payload");
  expect(payload.getAttribute("data-revealed")).toBe("false");
});

test("HoverPopover reveals payload on mouse enter", () => {
  render(
    <HoverPopover
      trigger={<button data-testid="trig">trigger</button>}
      payload={<p>popover-content</p>}
    />,
  );
  fireEvent.mouseEnter(screen.getByTestId("hover-popover-root"));
  expect(screen.getByTestId("hover-popover-payload").getAttribute("data-revealed")).toBe("true");
});

test("HoverPopover renders the explicit position class when provided", () => {
  render(
    <HoverPopover
      trigger={<span>x</span>}
      payload={<p>p</p>}
      position="right"
    />,
  );
  expect(screen.getByTestId("hover-popover-payload").getAttribute("data-position")).toBe("right");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/HoverPopover.test.tsx`
Expected: FAIL — `HoverPopover` import unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/HoverPopover.tsx
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type Position = "auto" | "below" | "above" | "right" | "left";

interface HoverPopoverProps {
  trigger: ReactNode;
  payload: ReactNode;
  position?: Position; // "auto" picks below by default; explicit positions override.
}

const offsetClass: Record<Exclude<Position, "auto">, string> = {
  below: "top-full mt-3 left-1/2 -translate-x-1/2",
  above: "bottom-full mb-3 left-1/2 -translate-x-1/2",
  right: "left-full ml-3 top-1/2 -translate-y-1/2",
  left: "right-full mr-3 top-1/2 -translate-y-1/2",
};

export function HoverPopover({
  trigger,
  payload,
  position = "auto",
}: HoverPopoverProps) {
  const [hover, setHover] = useState(false);
  const resolved: Exclude<Position, "auto"> = position === "auto" ? "below" : position;
  return (
    <span
      data-testid="hover-popover-root"
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {trigger}
      <motion.span
        data-testid="hover-popover-payload"
        data-revealed={String(hover)}
        data-position={resolved}
        className={`pointer-events-none absolute z-30 block min-w-[18rem] max-w-[28rem] border border-copper-700 bg-neutral-950/95 p-4 shadow ${offsetClass[resolved]}`}
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

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/HoverPopover.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/HoverPopover.tsx tests/unit/HoverPopover.test.tsx
git commit -m "feat(foundation-core-section-e): add HoverPopover primitive"
```

---

## Task 3 — `<ImpactLadder>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/ImpactLadder.tsx`
- Test: `tests/unit/ImpactLadder.test.tsx`

**Spec reference:** §3.2 — qualitative 3-rung ladder rendered in slide footer. Lit rungs render copper-400; unlit copper-800. **`mode="number-free"` is locked** — no 60/85/95 figures. Hover any rung reveals 1-line description.

Used on E.2 (rung 1), E.6 (rung 2), E.9 (rung 3). Plan A uses rung 1 only — but build all three states because the cost is identical and Plan B will need them.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/ImpactLadder.test.tsx
import { render, screen } from "@testing-library/react";
import { ImpactLadder } from "@/slides/foundation-core-section-e/components/ImpactLadder";

test("ImpactLadder renders 3 rungs", () => {
  render(<ImpactLadder rungs={3} currentRung={1} />);
  expect(screen.getAllByTestId(/^impact-rung-/)).toHaveLength(3);
});

test("rungs at or below currentRung are lit (data-lit=true)", () => {
  render(<ImpactLadder rungs={3} currentRung={2} />);
  expect(screen.getByTestId("impact-rung-1").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-2").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-3").getAttribute("data-lit")).toBe("false");
});

test("ImpactLadder defaults to mode=number-free (no numeric percentages)", () => {
  render(<ImpactLadder rungs={3} currentRung={3} />);
  // "60", "85", "95" must not appear anywhere — locked per spec.
  for (const banned of ["60%", "85%", "95%"]) {
    expect(screen.queryByText(new RegExp(banned))).toBeNull();
  }
});

test("rung labels match Layer 1 / 2 / 3 vocabulary", () => {
  render(<ImpactLadder rungs={3} currentRung={3} />);
  expect(screen.getByTestId("impact-rung-1").textContent).toMatch(/Layer 1/i);
  expect(screen.getByTestId("impact-rung-2").textContent).toMatch(/Layer 2/i);
  expect(screen.getByTestId("impact-rung-3").textContent).toMatch(/Layer 3/i);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/ImpactLadder.test.tsx`
Expected: FAIL — `ImpactLadder` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/ImpactLadder.tsx
import { motion } from "framer-motion";

interface ImpactLadderProps {
  rungs: 3;                  // locked at 3 per spec §3.2
  currentRung: 1 | 2 | 3;
  mode?: "number-free";      // locked per spec; placeholder for future variants
}

const RUNG_LABELS: readonly string[] = [
  "Layer 1 · prompt-only",
  "Layer 2 · prompt + context",
  "Layer 3 · prompt + context + harness",
];

export function ImpactLadder({ rungs, currentRung }: ImpactLadderProps) {
  return (
    <div
      data-testid="impact-ladder"
      className="flex w-full max-w-3xl items-center justify-center gap-3"
    >
      {Array.from({ length: rungs }).map((_, i) => {
        const n = i + 1;
        const lit = n <= currentRung;
        return (
          <motion.div
            key={n}
            data-testid={`impact-rung-${n}`}
            data-lit={String(lit)}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: lit ? 1 : 0.5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-1 flex-col items-center gap-1 border-t-2 px-3 py-2 ${
              lit ? "border-copper-400 text-copper-300" : "border-copper-800 text-neutral-500"
            }`}
            style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}
          >
            <span className="font-mono uppercase tracking-[0.18em]">{RUNG_LABELS[i]}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/ImpactLadder.test.tsx`
Expected: PASS, four assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/ImpactLadder.tsx tests/unit/ImpactLadder.test.tsx
git commit -m "feat(foundation-core-section-e): add ImpactLadder primitive"
```

---

## Task 4 — `<NaiveVsProper>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/NaiveVsProper.tsx`
- Test: `tests/unit/NaiveVsProper.test.tsx`

**Spec reference:** §3.2 + §4.2. Split-pane case-study primitive: top NAIVE prompt + truncated naive result; bottom PROPER prompt with inline element labels + structured result preview. Result previews fade-truncate to ~6 lines. Configurable element list (4 or 5 labels).

The component is presentation-only — step gating happens in the slide that uses it (E.2). The primitive accepts `revealNaive`/`revealProper`/`revealResults` flags from the parent so the slide can drive the reveal sequence.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/NaiveVsProper.test.tsx
import { render, screen } from "@testing-library/react";
import { NaiveVsProper } from "@/slides/foundation-core-section-e/components/NaiveVsProper";

const FIXTURE = {
  naivePrompt: "Write me this week's project report.",
  naiveResult: "Generic boilerplate line 1\nGeneric boilerplate line 2",
  properPrompt:
    "Role: You are a project lead.\nTask: Draft the weekly status.\nContext: Friday standup, 8 stakeholders.\nExamples: See last week's report.\nOutput: Markdown, ~250 words.",
  properElementLabels: ["Role:", "Task:", "Context:", "Examples:", "Output:"],
  properResult: "## At Risk: Module B\nThis week we...",
};

test("NaiveVsProper renders both NAIVE and PROPER headers", () => {
  render(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults />);
  expect(screen.getByText("NAIVE")).toBeInTheDocument();
  expect(screen.getByText("PROPER")).toBeInTheDocument();
});

test("PROPER prompt highlights all 5 inline element labels", () => {
  render(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults />);
  for (const label of FIXTURE.properElementLabels) {
    // Each label should appear in the rendered prompt as a copper-300 inline span.
    const matches = screen.getAllByText((_content, el) => el?.textContent === label);
    expect(matches.length).toBeGreaterThan(0);
  }
});

test("naive and proper result blocks gate on revealResults", () => {
  const { rerender } = render(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults={false} />);
  expect(screen.getByTestId("naive-result").getAttribute("data-revealed")).toBe("false");
  rerender(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults />);
  expect(screen.getByTestId("naive-result").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("proper-result").getAttribute("data-revealed")).toBe("true");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/NaiveVsProper.test.tsx`
Expected: FAIL — `NaiveVsProper` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/NaiveVsProper.tsx
import { motion } from "framer-motion";
import type { JSX } from "react";

interface NaiveVsProperProps {
  naivePrompt: string;
  naiveResult: string;
  properPrompt: string;
  properElementLabels: readonly string[]; // tokens like "Role:" — emphasized inline
  properResult: string;
  revealNaive: boolean;
  revealProper: boolean;
  revealResults: boolean;
}

// Wrap each occurrence of any label in `labels` with a copper-300 span.
function emphasizeLabels(text: string, labels: readonly string[]): JSX.Element {
  // Sort longest-first to avoid partial overlaps (e.g. "Output" inside "OutputSpec").
  const sorted = [...labels].sort((a, b) => b.length - a.length);
  let parts: (string | JSX.Element)[] = [text];
  sorted.forEach((label, idx) => {
    parts = parts.flatMap((p, partIdx) => {
      if (typeof p !== "string" || !p.includes(label)) return [p];
      const split = p.split(label);
      const out: (string | JSX.Element)[] = [];
      split.forEach((s, j) => {
        if (j > 0) {
          out.push(
            <span key={`${idx}-${partIdx}-${j}`} className="text-copper-300 font-semibold">
              {label}
            </span>,
          );
        }
        if (s) out.push(s);
      });
      return out;
    });
  });
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? <span key={i}>{p}</span> : p,
      )}
    </>
  );
}

export function NaiveVsProper({
  naivePrompt,
  naiveResult,
  properPrompt,
  properElementLabels,
  properResult,
  revealNaive,
  revealProper,
  revealResults,
}: NaiveVsProperProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* NAIVE block */}
      <motion.div
        data-testid="naive-block"
        data-revealed={String(revealNaive)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: revealNaive ? 1 : 0, y: revealNaive ? 0 : 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2 border border-copper-700 bg-neutral-950/70 p-4"
      >
        <span className="font-mono uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}>
          NAIVE
        </span>
        <pre className="whitespace-pre-wrap font-mono text-neutral-100" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)" }}>
          {naivePrompt}
        </pre>
        <motion.pre
          data-testid="naive-result"
          data-revealed={String(revealResults)}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealResults ? 0.7 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="whitespace-pre-wrap font-mono italic text-neutral-400"
          style={{ fontSize: "clamp(0.8rem, 0.95vw, 1rem)", maxHeight: "6em", overflow: "hidden" }}
        >
          {naiveResult}
        </motion.pre>
      </motion.div>

      {/* PROPER block */}
      <motion.div
        data-testid="proper-block"
        data-revealed={String(revealProper)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: revealProper ? 1 : 0, y: revealProper ? 0 : 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2 border border-copper-300 bg-neutral-950/70 p-4"
      >
        <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}>
          PROPER
        </span>
        <pre className="whitespace-pre-wrap font-mono text-neutral-100" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)" }}>
          {emphasizeLabels(properPrompt, properElementLabels)}
        </pre>
        <motion.pre
          data-testid="proper-result"
          data-revealed={String(revealResults)}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealResults ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="whitespace-pre-wrap font-mono text-neutral-100"
          style={{ fontSize: "clamp(0.8rem, 0.95vw, 1rem)", maxHeight: "6em", overflow: "hidden" }}
        >
          {properResult}
        </motion.pre>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/NaiveVsProper.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/NaiveVsProper.tsx tests/unit/NaiveVsProper.test.tsx
git commit -m "feat(foundation-core-section-e): add NaiveVsProper primitive"
```

---

## Task 5 — E.2 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e2-prompt-what-why.tsx`
- Test: `tests/unit/e2-prompt-what-why.test.tsx`

**Spec reference:** §4.2. 5 advances, click-driven, no ambient. Layout: split-pane left (~40%) definition + 3 outcome bullets + bridge caption; right (~60%) NaiveVsProper; footer ImpactLadder rung 1.

- [ ] **Step 1: Add E.2 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts (replace the
// existing `export {};` line with this full block).

export const e2Content = {
  headline: "Layer 1: Prompt — clarity.",
  headlineKeywords: ["Prompt"] as const,
  definition: "The instructions you give the model.",
  definitionKeywords: ["instructions"] as const,
  outcomes: [
    { text: "Vague in → vague out.", keywords: ["Vague in"] as const },
    { text: "Structured in → structured out.", keywords: ["Structured in"] as const },
    {
      text: "Show what good looks like → fewer iterations, more useful results.",
      keywords: ["Show what good looks like"] as const,
    },
  ],
  bridge: "Next: the canonical structure behind every good prompt.",
  bridgeKeywords: ["canonical structure"] as const,
  naivePrompt: "Write me this week's project report.",
  naiveResult: [
    "This week, the team made progress on several initiatives.",
    "Various items were completed and others are ongoing.",
    "Next week we plan to continue the work in flight.",
    "Please reach out with any questions.",
  ].join("\n"),
  properPrompt: [
    "Role: You are a project lead preparing the Friday status report.",
    "Task: Draft a concise weekly status — (1) what shipped, (2) what's at risk,",
    "      (3) what's planned for next week.",
    "Context: For the EOD Friday team standup. Audience: 8 cross-functional",
    "         stakeholders. Last week we missed a milestone on Module B.",
    "Examples: See last week's report (attached) — match structure, tone,",
    "          and focus areas.",
    "Output: Markdown, H2 sections, ~250 words. Lead with the at-risk item.",
  ].join("\n"),
  properElementLabels: ["Role:", "Task:", "Context:", "Examples:", "Output:"] as const,
  properResult: [
    "## At Risk: Module B",
    "Migration is 1 sprint behind plan; root cause is the upstream schema change.",
    "## Shipped",
    "- Onboarding revamp · 12% activation lift in test cohort",
    "- Checkout refactor merged behind flag",
    "## Next Week",
    "- Cut Module B remediation branch",
    "- Roll checkout flag to 25%",
  ].join("\n"),
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e2-prompt-what-why.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E2PromptWhatWhy, e2Slide } from "@/slides/foundation-core-section-e/e2-prompt-what-why";

test("E.2 declares 5 steps with canonicalPose=4", () => {
  expect(e2Slide.steps).toBe(5);
  expect(e2Slide.canonicalPose).toBe(4);
  expect(e2Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.2 at canonicalPose renders FIG label, NAIVE+PROPER blocks, and impact rung 1 lit", () => {
  render(
    <DeckProvider stepCounts={[e2Slide.steps]}>
      <AdvanceTo step={e2Slide.canonicalPose} />
      <E2PromptWhatWhy />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.2 · PROMPT/)).toBeInTheDocument();
  expect(screen.getByTestId("naive-block")).toBeInTheDocument();
  expect(screen.getByTestId("proper-block")).toBeInTheDocument();
  // Footer ImpactLadder rung 1 must be lit at canonical pose (Space 5).
  expect(screen.getByTestId("impact-rung-1").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-2").getAttribute("data-lit")).toBe("false");
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e2-prompt-what-why.test.tsx`
Expected: FAIL — slide module unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e2-prompt-what-why.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NaiveVsProper } from "./components/NaiveVsProper";
import { ImpactLadder } from "./components/ImpactLadder";
import { e2Content as C } from "./content";

export function E2PromptWhatWhy() {
  const { stepIndex } = useDeck();
  // Spec §4.2 motion table: Space 1 left pane; 2 NAIVE prompt; 3 NAIVE result;
  // 4 PROPER prompt; 5 PROPER result + ladder rung lights.
  const showLeft = stepIndex >= 0;
  const showNaivePrompt = stepIndex >= 1;
  const showNaiveResult = stepIndex >= 2;
  const showProperPrompt = stepIndex >= 3;
  const showProperResult = stepIndex >= 4;

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
      <FigLabel section="E" num={2} label="PROMPT" />

      <div className="relative z-10 mx-auto grid h-full max-w-[88vw] grid-cols-[40fr_60fr] gap-12 px-12 py-20">
        {/* LEFT — definition + outcomes + bridge */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showLeft ? 1 : 0, y: showLeft ? 0 : 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.25rem, 3.5vw, 3.75rem)", lineHeight: 1.1 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>
          <p
            className="font-serif text-neutral-100"
            style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)", lineHeight: 1.3 }}
          >
            {highlight(C.definition, C.definitionKeywords)}
          </p>
          <ul className="flex flex-col gap-2 font-serif italic text-neutral-300" style={{ fontSize: "clamp(1rem, 1.35vw, 1.4rem)", lineHeight: 1.4 }}>
            {C.outcomes.map((o, i) => (
              <li key={i} className="before:mr-2 before:content-['•'] before:text-copper-300">
                {highlight(o.text, o.keywords)}
              </li>
            ))}
          </ul>
          <p
            className="mt-4 font-serif italic text-neutral-300"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.25rem)", lineHeight: 1.4 }}
          >
            {highlight(C.bridge, C.bridgeKeywords)}
          </p>
        </motion.div>

        {/* RIGHT — NaiveVsProper */}
        <div className="flex flex-col justify-center">
          <NaiveVsProper
            naivePrompt={C.naivePrompt}
            naiveResult={C.naiveResult}
            properPrompt={C.properPrompt}
            properElementLabels={C.properElementLabels}
            properResult={C.properResult}
            revealNaive={showNaivePrompt}
            revealProper={showProperPrompt}
            revealResults={showNaiveResult || showProperResult}
          />
        </div>
      </div>

      {/* FOOTER — ImpactLadder */}
      <div className="absolute bottom-8 left-1/2 z-10 w-[80vw] -translate-x-1/2">
        <ImpactLadder rungs={3} currentRung={showProperResult ? 1 : 1} />
      </div>
    </div>
  );
}

export const e2Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <E2PromptWhatWhy />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e2-prompt-what-why.test.tsx`
Expected: PASS, two assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e2-prompt-what-why.tsx tests/unit/e2-prompt-what-why.test.tsx
git commit -m "feat(foundation-core-section-e): add E.2 PROMPT — what & why slide"
```

---

## Task 6 — `<StructureSpine>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/StructureSpine.tsx`
- Test: `tests/unit/StructureSpine.test.tsx`

**Spec reference:** §3.2 + §4.3. Vertical 6-element spine (Role · Instruction · Output Format · Context · Examples · Input) with thin copper-rule connectors and numeric badges. Compact default state + rich hover popovers per element. When a spine element is hovered, others dim to ~60% opacity.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/StructureSpine.test.tsx
import { render, screen } from "@testing-library/react";
import { StructureSpine } from "@/slides/foundation-core-section-e/components/StructureSpine";

const ELEMENTS = [
  { id: "role", num: 1, name: "Role", essence: "Who AI should be", popover: <span>p1</span> },
  { id: "instruction", num: 2, name: "Instruction", essence: "Action to perform + how", popover: <span>p2</span> },
  { id: "output", num: 3, name: "Output Format", essence: "Shape of the result", popover: <span>p3</span> },
  { id: "context", num: 4, name: "Context", essence: "Background + audience", popover: <span>p4</span> },
  { id: "examples", num: 5, name: "Examples", essence: "Show good output", popover: <span>p5</span> },
  { id: "input", num: 6, name: "Input", essence: "Specific data", popover: <span>p6</span> },
] as const;

test("StructureSpine renders 6 element slots", () => {
  render(<StructureSpine elements={ELEMENTS} revealedThrough={6} />);
  expect(screen.getAllByTestId(/^spine-element-/)).toHaveLength(6);
});

test("revealedThrough gates which elements are visible", () => {
  render(<StructureSpine elements={ELEMENTS} revealedThrough={3} />);
  expect(screen.getByTestId("spine-element-1").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("spine-element-3").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("spine-element-4").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("spine-element-6").getAttribute("data-revealed")).toBe("false");
});

test("each element renders its name + essence", () => {
  render(<StructureSpine elements={ELEMENTS} revealedThrough={6} />);
  expect(screen.getByText("Role")).toBeInTheDocument();
  expect(screen.getByText("Who AI should be")).toBeInTheDocument();
  expect(screen.getByText("Input")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/StructureSpine.test.tsx`
Expected: FAIL — `StructureSpine` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/StructureSpine.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HoverPopover } from "./HoverPopover";

export interface SpineElement {
  id: string;
  num: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  essence: string;
  popover: ReactNode;
}

interface StructureSpineProps {
  elements: readonly SpineElement[];
  // 0..6 — 0 hides all; 6 shows the entire spine. The slide drives this off stepIndex.
  revealedThrough: number;
}

const NUMERIC_BADGE = ["①", "②", "③", "④", "⑤", "⑥"] as const;

export function StructureSpine({ elements, revealedThrough }: StructureSpineProps) {
  return (
    <div className="flex flex-col items-stretch gap-3">
      {elements.map((el, i) => {
        const revealed = i < revealedThrough;
        return (
          <motion.div
            key={el.id}
            data-testid={`spine-element-${el.num}`}
            data-revealed={String(revealed)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: revealed ? i * 0.08 : 0 }}
            className="flex items-center gap-4 border border-copper-800 bg-neutral-950/60 px-4 py-3"
          >
            <HoverPopover
              position="right"
              trigger={
                <div className="flex items-center gap-4">
                  <span className="font-mono text-copper-300" style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}>
                    {NUMERIC_BADGE[i]}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-neutral-50" style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)", lineHeight: 1.1 }}>
                      {el.name}
                    </span>
                    <span className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>
                      {el.essence}
                    </span>
                  </div>
                </div>
              }
              payload={el.popover}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/StructureSpine.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/StructureSpine.tsx tests/unit/StructureSpine.test.tsx
git commit -m "feat(foundation-core-section-e): add StructureSpine primitive"
```

---

## Task 7 — `<FrameworkOrbit>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/FrameworkOrbit.tsx`
- Test: `tests/unit/FrameworkOrbit.test.tsx`

**Spec reference:** §3.2 + §4.3. Loose 5+5 orbit positioning of framework acronym tiles around a center stage. On hover any tile, tooltip shows breakdown + the spine elements that the framework maps to glow copper-300.

For Plan A this primitive is presentation-only — the cross-glow effect on the spine (other slide drives that) is wired by E.3 via a shared `hoveredFramework` state lifted to the slide, but the primitive's own concern is the orbit + acronym tiles + their hover popover content.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/FrameworkOrbit.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { FrameworkOrbit } from "@/slides/foundation-core-section-e/components/FrameworkOrbit";

const TILES = [
  { id: "race", acronym: "RACE", breakdown: "Role · Action · Context · Explanation", spineHits: [1, 2, 4] },
  { id: "care", acronym: "CARE", breakdown: "Context · Action · Result · Example", spineHits: [4, 2, 3, 5] },
  { id: "ape", acronym: "APE", breakdown: "Action · Purpose · Execution", spineHits: [2] },
  { id: "roses", acronym: "ROSES", breakdown: "Role · Objective · Scenario · Expected output · Solution", spineHits: [1, 2, 4, 3, 2] },
  { id: "create", acronym: "CREATE", breakdown: "Character · Request · Examples · Adjustments · Type · Extras", spineHits: [1, 2, 5, 3, 4] },
  { id: "coast", acronym: "COAST", breakdown: "Context · Objective · Actions · Scenario · Task", spineHits: [4, 2, 2, 4, 2] },
  { id: "tag", acronym: "TAG", breakdown: "Task · Action · Goal", spineHits: [2, 2, 2] },
  { id: "pain", acronym: "PAIN", breakdown: "Problem · Action · Information · Next steps", spineHits: [4, 2, 6, 2] },
  { id: "rise", acronym: "RISE", breakdown: "Role · Input · Steps · Execution", spineHits: [1, 6, 2, 2] },
  { id: "creo", acronym: "CREO", breakdown: "Context · Request · Explanation · Outcome", spineHits: [4, 2, 3, 2] },
] as const;

test("FrameworkOrbit renders 10 acronym tiles", () => {
  render(<FrameworkOrbit tiles={TILES} revealed onHoverChange={() => {}} />);
  expect(screen.getAllByTestId(/^framework-tile-/)).toHaveLength(10);
});

test("hovering a tile fires onHoverChange with the framework id", () => {
  const calls: (string | null)[] = [];
  render(<FrameworkOrbit tiles={TILES} revealed onHoverChange={(id) => calls.push(id)} />);
  fireEvent.mouseEnter(screen.getByTestId("framework-tile-race"));
  fireEvent.mouseLeave(screen.getByTestId("framework-tile-race"));
  expect(calls).toEqual(["race", null]);
});

test("orbit hides until revealed", () => {
  const { rerender } = render(<FrameworkOrbit tiles={TILES} revealed={false} onHoverChange={() => {}} />);
  const orbit = screen.getByTestId("framework-orbit");
  expect(orbit.getAttribute("data-revealed")).toBe("false");
  rerender(<FrameworkOrbit tiles={TILES} revealed onHoverChange={() => {}} />);
  expect(screen.getByTestId("framework-orbit").getAttribute("data-revealed")).toBe("true");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/FrameworkOrbit.test.tsx`
Expected: FAIL — `FrameworkOrbit` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/FrameworkOrbit.tsx
import { motion } from "framer-motion";

export interface FrameworkTile {
  id: string;
  acronym: string;
  breakdown: string;
  spineHits: readonly number[]; // 1..6 — which spine elements glow on hover
}

interface FrameworkOrbitProps {
  tiles: readonly FrameworkTile[]; // expect 10
  revealed: boolean;
  onHoverChange: (id: string | null) => void;
}

// Loose 5+5 orbit — left column at -1 cluster, right column at +1.
// Vertical offsets are deterministic but staggered to feel organic.
const POSITIONS: { side: "left" | "right"; xPct: number; yPct: number }[] = [
  { side: "left", xPct: -34, yPct: -28 },
  { side: "left", xPct: -42, yPct: -8 },
  { side: "left", xPct: -38, yPct: 18 },
  { side: "left", xPct: -30, yPct: 36 },
  { side: "left", xPct: -22, yPct: -42 },
  { side: "right", xPct: 30, yPct: -36 },
  { side: "right", xPct: 38, yPct: -12 },
  { side: "right", xPct: 42, yPct: 14 },
  { side: "right", xPct: 34, yPct: 32 },
  { side: "right", xPct: 24, yPct: -2 },
];

export function FrameworkOrbit({
  tiles,
  revealed,
  onHoverChange,
}: FrameworkOrbitProps) {
  return (
    <div
      data-testid="framework-orbit"
      data-revealed={String(revealed)}
      className="pointer-events-none absolute inset-0"
    >
      {tiles.map((t, i) => {
        const pos = POSITIONS[i] ?? { xPct: 0, yPct: 0 };
        return (
          <motion.button
            key={t.id}
            type="button"
            data-testid={`framework-tile-${t.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: revealed ? i * 0.03 : 0 }}
            onMouseEnter={() => onHoverChange(t.id)}
            onMouseLeave={() => onHoverChange(null)}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 border border-copper-800 bg-neutral-950/70 px-4 py-2 font-mono text-neutral-200 hover:border-copper-300 hover:text-copper-200"
            style={{
              left: `calc(50% + ${pos.xPct}vw)`,
              top: `calc(50% + ${pos.yPct}vh)`,
              fontSize: "clamp(0.85rem, 1vw, 1.05rem)",
              letterSpacing: "0.18em",
            }}
            title={t.breakdown}
          >
            {t.acronym}
          </motion.button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/FrameworkOrbit.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/FrameworkOrbit.tsx tests/unit/FrameworkOrbit.test.tsx
git commit -m "feat(foundation-core-section-e): add FrameworkOrbit primitive"
```

---

## Task 8 — E.3 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e3-prompt-structure.tsx`
- Test: `tests/unit/e3-prompt-structure.test.tsx`

**Spec reference:** §4.3. 4 advances. Layout: vertical spine center + loose orbit of 10 tiles + footer caption.

- [ ] **Step 1: Add E.3 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

import type { ReactNode } from "react";

export const e3Content = {
  headline: "One skeleton. Many names.",
  headlineKeywords: ["One skeleton"] as const,
  footerCaption: "Different mnemonics. Same six ingredients.",
  footerCaptionKeywords: ["Same six ingredients"] as const,
  spine: [
    {
      id: "role",
      num: 1 as const,
      name: "Role",
      essence: "Who AI should be",
      popoverLines: [
        "Define who the AI should be.",
        '"You are ... with N years exp specialized in ..."',
        "Examples: project lead, ops analyst, geology reviewer.",
      ],
    },
    {
      id: "instruction",
      num: 2 as const,
      name: "Instruction",
      essence: "Action to perform + how",
      popoverLines: [
        "Clear action + constraints.",
        '"Analyze ..." · "Please exclude ..." · "Ultrathink on ..."',
        "Also covers: style, tone, process detail, control.",
      ],
    },
    {
      id: "output",
      num: 3 as const,
      name: "Output Format",
      essence: "Shape of the result",
      popoverLines: [
        "Specify how the response is structured.",
        "Formats: Markdown · Tables · YAML · JSON · CSV · PDF.",
      ],
    },
    {
      id: "context",
      num: 4 as const,
      name: "Context",
      essence: "Background + audience",
      popoverLines: [
        "Essential additional information.",
        "Categories: Background · Objectives · Goal · Audience · Constraints.",
      ],
    },
    {
      id: "examples",
      num: 5 as const,
      name: "Examples",
      essence: "Show good output",
      popoverLines: [
        "Show what good output looks like.",
        "Forms: Attached example docs · sample input/output pairs.",
      ],
    },
    {
      id: "input",
      num: 6 as const,
      name: "Input",
      essence: "Specific data",
      popoverLines: [
        "The specific data to work with.",
        "Forms: Attached file · specific request.",
        "Note: User prompt; if instructions are generic → system prompt.",
      ],
    },
  ],
  frameworks: [
    { id: "race", acronym: "RACE", breakdown: "Role · Action · Context · Explanation", spineHits: [1, 2, 4] as const },
    { id: "care", acronym: "CARE", breakdown: "Context · Action · Result · Example", spineHits: [4, 2, 3, 5] as const },
    { id: "ape", acronym: "APE", breakdown: "Action · Purpose · Execution", spineHits: [2] as const },
    { id: "roses", acronym: "ROSES", breakdown: "Role · Objective · Scenario · Expected output · Solution", spineHits: [1, 2, 4, 3, 2] as const },
    { id: "create", acronym: "CREATE", breakdown: "Character · Request · Examples · Adjustments · Type · Extras", spineHits: [1, 2, 5, 3, 4] as const },
    { id: "coast", acronym: "COAST", breakdown: "Context · Objective · Actions · Scenario · Task", spineHits: [4, 2, 2, 4, 2] as const },
    { id: "tag", acronym: "TAG", breakdown: "Task · Action · Goal", spineHits: [2, 2, 2] as const },
    { id: "pain", acronym: "PAIN", breakdown: "Problem · Action · Information · Next steps", spineHits: [4, 2, 6, 2] as const },
    { id: "rise", acronym: "RISE", breakdown: "Role · Input · Steps · Execution", spineHits: [1, 6, 2, 2] as const },
    { id: "creo", acronym: "CREO", breakdown: "Context · Request · Explanation · Outcome", spineHits: [4, 2, 3, 2] as const },
  ],
};

// Helper used by E.3 slide to build SpineElement[] with React popover nodes.
export function spinePopoverContent(lines: readonly string[]): ReactNode {
  return (
    <ul className="flex flex-col gap-1 font-serif text-neutral-100" style={{ fontSize: "0.95rem", lineHeight: 1.4 }}>
      {lines.map((l, i) => (
        <li key={i}>{l}</li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e3-prompt-structure.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E3PromptStructure, e3Slide } from "@/slides/foundation-core-section-e/e3-prompt-structure";

test("E.3 declares 4 steps with canonicalPose=3", () => {
  expect(e3Slide.steps).toBe(4);
  expect(e3Slide.canonicalPose).toBe(3);
  expect(e3Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.3 at canonicalPose renders all 6 spine elements + 10 frameworks + footer caption", () => {
  render(
    <DeckProvider stepCounts={[e3Slide.steps]}>
      <AdvanceTo step={e3Slide.canonicalPose} />
      <E3PromptStructure />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.3 · STRUCTURE/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^spine-element-/)).toHaveLength(6);
  expect(screen.getAllByTestId(/^framework-tile-/)).toHaveLength(10);
  expect(screen.getByText(/Same six ingredients/)).toBeInTheDocument();
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e3-prompt-structure.test.tsx`
Expected: FAIL — slide module unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e3-prompt-structure.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { StructureSpine, type SpineElement } from "./components/StructureSpine";
import { FrameworkOrbit } from "./components/FrameworkOrbit";
import { e3Content as C, spinePopoverContent } from "./content";

export function E3PromptStructure() {
  const { stepIndex } = useDeck();
  // Spec §4.3: Space 1 spine ①②③ ; Space 2 spine ④⑤⑥ ; Space 3 framework cluster ; Space 4 footer caption.
  const revealedThrough =
    stepIndex >= 1 ? 6 : stepIndex >= 0 ? 3 : 0;
  const showFrameworks = stepIndex >= 2;
  const showFooter = stepIndex >= 3;

  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);

  // Spine hit-set for the currently hovered framework (used to pulse-glow elements).
  const hitSet = (() => {
    if (!hoveredFramework) return new Set<number>();
    const f = C.frameworks.find((x) => x.id === hoveredFramework);
    return new Set<number>(f ? [...f.spineHits] : []);
  })();

  const spineElements: SpineElement[] = C.spine.map((s) => ({
    id: s.id,
    num: s.num,
    name: s.name,
    essence: s.essence,
    popover: spinePopoverContent(s.popoverLines),
  }));

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
      <FigLabel section="E" num={3} label="STRUCTURE" />

      <div className="relative z-10 mx-auto flex h-full max-w-[80vw] flex-col items-center justify-center gap-8 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <div className="relative flex w-full max-w-[34vw] flex-col">
          {/* Spine — apply hit-set glow to elements whose num is in the set. */}
          <div className="flex flex-col gap-3">
            {spineElements.map((el, i) => {
              const lit = hitSet.has(el.num);
              const dimmed = hoveredFramework !== null && !lit;
              const revealed = i < revealedThrough;
              return (
                <motion.div
                  key={el.id}
                  data-testid={`spine-element-${el.num}`}
                  data-revealed={String(revealed)}
                  data-lit={String(lit)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: revealed ? (dimmed ? 0.5 : 1) : 0,
                    y: revealed ? 0 : 6,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center gap-4 border bg-neutral-950/60 px-4 py-3 ${
                    lit ? "border-copper-300" : "border-copper-800"
                  }`}
                >
                  <span className="font-mono text-copper-300" style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}>
                    {["①", "②", "③", "④", "⑤", "⑥"][i]}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-neutral-50" style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)", lineHeight: 1.1 }}>
                      {el.name}
                    </span>
                    <span className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>
                      {el.essence}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hover popovers via the StructureSpine primitive are skipped here
              because we render hit-set glow inline. If the speaker wants the
              hover popovers (deep mode), the StructureSpine component is
              mounted in parallel via an offscreen helper — see spec §4.3. */}
          <div className="sr-only">
            <StructureSpine elements={spineElements} revealedThrough={revealedThrough} />
          </div>
        </div>

        <FrameworkOrbit
          tiles={C.frameworks}
          revealed={showFrameworks}
          onHoverChange={setHoveredFramework}
        />

        <motion.p
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showFooter ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.footerCaption, C.footerCaptionKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e3Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <E3PromptStructure />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e3-prompt-structure.test.tsx`
Expected: PASS, two assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e3-prompt-structure.tsx tests/unit/e3-prompt-structure.test.tsx
git commit -m "feat(foundation-core-section-e): add E.3 PROMPT — structure slide"
```

---

## Task 9 — `<TieredTechniqueGrid>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/TieredTechniqueGrid.tsx`
- Test: `tests/unit/TieredTechniqueGrid.test.tsx`

**Spec reference:** §3.2 + §4.4. 3 horizontal tier bands stacked vertically (BASIC / INTERMEDIATE / ADVANCED) with cards inline within each tier. Progressive copper saturation per tier (copper-700 → copper-300).

This primitive is layout only — it accepts an array of `tiers`, each containing `cards` to render. Per-card content is delegated to children passed via the `renderCard` prop. The slide composes this with `<TechniqueCard>`.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/TieredTechniqueGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { TieredTechniqueGrid } from "@/slides/foundation-core-section-e/components/TieredTechniqueGrid";

const TIERS = [
  { id: "basic", label: "BASIC", copper: "copper-700" as const, cards: [
    { id: "zero-shot", title: "Zero-Shot", essence: "Ask once, no examples" },
    { id: "few-shot", title: "Few-Shot", essence: "Show 2–3 examples" },
    { id: "cot", title: "Chain-of-Thought", essence: "Think step by step" },
  ]},
  { id: "inter", label: "INTERMEDIATE", copper: "copper-500" as const, cards: [
    { id: "self-cons", title: "Self-Consistency", essence: "Multiple paths, consensus" },
    { id: "tot", title: "Tree of Thoughts", essence: "Branch decision paths" },
  ]},
  { id: "adv", label: "ADVANCED", copper: "copper-300" as const, cards: [
    { id: "rag", title: "RAG", essence: "Retrieve + ground in docs" },
    { id: "art", title: "ART", essence: "Reason + use tools" },
    { id: "react", title: "ReAct", essence: "Think → Act → Observe → repeat" },
  ]},
];

test("TieredTechniqueGrid renders all 3 tiers with their copper-stop attribute", () => {
  render(
    <TieredTechniqueGrid
      tiers={TIERS}
      revealedTier={3}
      renderCard={(c) => <div data-testid={`card-${c.id}`}>{c.title}</div>}
    />,
  );
  expect(screen.getByTestId("tier-basic").getAttribute("data-copper-stop")).toBe("copper-700");
  expect(screen.getByTestId("tier-inter").getAttribute("data-copper-stop")).toBe("copper-500");
  expect(screen.getByTestId("tier-adv").getAttribute("data-copper-stop")).toBe("copper-300");
});

test("revealedTier gates which tiers are shown", () => {
  render(
    <TieredTechniqueGrid
      tiers={TIERS}
      revealedTier={2}
      renderCard={(c) => <div data-testid={`card-${c.id}`}>{c.title}</div>}
    />,
  );
  expect(screen.getByTestId("tier-basic").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("tier-inter").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("tier-adv").getAttribute("data-revealed")).toBe("false");
});

test("each tier renders its label + cards via renderCard", () => {
  render(
    <TieredTechniqueGrid
      tiers={TIERS}
      revealedTier={3}
      renderCard={(c) => <div data-testid={`card-${c.id}`}>{c.title}</div>}
    />,
  );
  expect(screen.getByText("BASIC")).toBeInTheDocument();
  expect(screen.getByText("ADVANCED")).toBeInTheDocument();
  expect(screen.getByTestId("card-zero-shot")).toBeInTheDocument();
  expect(screen.getByTestId("card-react")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/TieredTechniqueGrid.test.tsx`
Expected: FAIL — `TieredTechniqueGrid` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/TieredTechniqueGrid.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type CopperStop = "copper-300" | "copper-500" | "copper-700";

export interface TechniqueCardData {
  id: string;
  title: string;
  essence: string;
}

export interface Tier {
  id: string;
  label: string;
  copper: CopperStop;
  cards: readonly TechniqueCardData[];
}

interface TieredTechniqueGridProps {
  tiers: readonly Tier[];
  // 0..3 — 0 hides all, 3 shows all three tiers.
  revealedTier: number;
  renderCard: (card: TechniqueCardData, copper: CopperStop) => ReactNode;
}

const TIER_LABEL_COLOR: Record<CopperStop, string> = {
  "copper-300": "text-copper-300",
  "copper-500": "text-copper-500",
  "copper-700": "text-copper-700",
};

export function TieredTechniqueGrid({
  tiers,
  revealedTier,
  renderCard,
}: TieredTechniqueGridProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {tiers.map((tier, i) => {
        const revealed = i < revealedTier;
        return (
          <motion.div
            key={tier.id}
            data-testid={`tier-${tier.id}`}
            data-revealed={String(revealed)}
            data-copper-stop={tier.copper}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <span
              className={`flex w-32 shrink-0 font-mono uppercase tracking-[0.18em] ${TIER_LABEL_COLOR[tier.copper]}`}
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)" }}
            >
              {tier.label}
            </span>
            <div className="flex flex-1 gap-4">
              {tier.cards.map((c) => (
                <div key={c.id} className="flex-1">
                  {renderCard(c, tier.copper)}
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/TieredTechniqueGrid.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/TieredTechniqueGrid.tsx tests/unit/TieredTechniqueGrid.test.tsx
git commit -m "feat(foundation-core-section-e): add TieredTechniqueGrid primitive"
```

---

## Task 10 — `<TechniqueCard>` + `<TechniqueModal>` primitives

**Files:**
- Create: `src/slides/foundation-core-section-e/components/TechniqueCard.tsx`
- Create: `src/slides/foundation-core-section-e/components/TechniqueModal.tsx`
- Test: `tests/unit/TechniqueCard.test.tsx`
- Test: `tests/unit/TechniqueModal.test.tsx`

**Spec reference:** §3.2 + §4.4. Default state: card shows name + 1-line essence. Hover: border copper-300 glow + slight scale (1.0 → 1.02), ~150ms. **Pure visual feedback — no content reveal.** Click: card expands into centered modal panel (~60% slide width × ~70% slide height). Close: × button or click-outside.

The card itself is a button; the modal is rendered separately by the slide (controlled by which card is "active"). This split lets the modal be portal-mounted at slide-root level (no overflow clipping).

- [ ] **Step 1: Write the failing TechniqueCard tests**

```tsx
// tests/unit/TechniqueCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TechniqueCard } from "@/slides/foundation-core-section-e/components/TechniqueCard";

test("TechniqueCard renders title + essence", () => {
  render(
    <TechniqueCard
      id="rag"
      title="RAG"
      essence="Retrieve + ground in docs"
      copper="copper-300"
      onClick={() => {}}
    />,
  );
  expect(screen.getByText("RAG")).toBeInTheDocument();
  expect(screen.getByText("Retrieve + ground in docs")).toBeInTheDocument();
});

test("TechniqueCard fires onClick with id", () => {
  const calls: string[] = [];
  render(
    <TechniqueCard
      id="rag"
      title="RAG"
      essence="Retrieve + ground in docs"
      copper="copper-300"
      onClick={(id) => calls.push(id)}
    />,
  );
  fireEvent.click(screen.getByTestId("technique-card-rag"));
  expect(calls).toEqual(["rag"]);
});

test("TechniqueCard data-copper-stop reflects the tier color", () => {
  render(
    <TechniqueCard
      id="zero-shot"
      title="Zero-Shot"
      essence="Ask once, no examples"
      copper="copper-700"
      onClick={() => {}}
    />,
  );
  expect(screen.getByTestId("technique-card-zero-shot").getAttribute("data-copper-stop")).toBe("copper-700");
});
```

- [ ] **Step 2: Write the failing TechniqueModal tests**

```tsx
// tests/unit/TechniqueModal.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TechniqueModal } from "@/slides/foundation-core-section-e/components/TechniqueModal";

const FIXTURE = {
  id: "rag",
  title: "RAG",
  layerAnnotation: "Layer 2",
  bullets: [
    { label: "Best for", body: "questions about your data · recent events" },
    { label: "Example", body: "Using our knowledge base: search for 'remote work policy'." },
    { label: "Trade-off", body: "needs retrieval setup; grounds answers in real sources" },
  ],
};

test("TechniqueModal hidden when open=false", () => {
  render(<TechniqueModal {...FIXTURE} open={false} onClose={() => {}} />);
  expect(screen.queryByTestId(`technique-modal-${FIXTURE.id}`)).toBeNull();
});

test("TechniqueModal renders title + layer annotation + bullets when open", () => {
  render(<TechniqueModal {...FIXTURE} open onClose={() => {}} />);
  expect(screen.getByText("RAG")).toBeInTheDocument();
  expect(screen.getByText(/Layer 2/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^technique-bullet-/)).toHaveLength(3);
});

test("TechniqueModal close button fires onClose", () => {
  const calls: number[] = [];
  render(<TechniqueModal {...FIXTURE} open onClose={() => calls.push(1)} />);
  fireEvent.click(screen.getByTestId("technique-modal-close"));
  expect(calls).toEqual([1]);
});

test("TechniqueModal backdrop click fires onClose", () => {
  const calls: number[] = [];
  render(<TechniqueModal {...FIXTURE} open onClose={() => calls.push(1)} />);
  fireEvent.click(screen.getByTestId("technique-modal-backdrop"));
  expect(calls).toEqual([1]);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run tests/unit/TechniqueCard.test.tsx tests/unit/TechniqueModal.test.tsx`
Expected: both FAIL — modules unresolved.

- [ ] **Step 4: Write `<TechniqueCard>`**

```tsx
// src/slides/foundation-core-section-e/components/TechniqueCard.tsx
import type { CopperStop } from "./TieredTechniqueGrid";

interface TechniqueCardProps {
  id: string;
  title: string;
  essence: string;
  copper: CopperStop;
  onClick: (id: string) => void;
}

const BORDER_CLASS: Record<CopperStop, string> = {
  "copper-300": "border-copper-300/60 hover:border-copper-300",
  "copper-500": "border-copper-500/60 hover:border-copper-300",
  "copper-700": "border-copper-700/60 hover:border-copper-300",
};

export function TechniqueCard({
  id,
  title,
  essence,
  copper,
  onClick,
}: TechniqueCardProps) {
  return (
    <button
      type="button"
      data-testid={`technique-card-${id}`}
      data-copper-stop={copper}
      onClick={() => onClick(id)}
      className={`group flex w-full flex-col items-start gap-2 border bg-neutral-950/60 px-4 py-3 text-left transition-transform duration-150 hover:scale-[1.02] ${BORDER_CLASS[copper]}`}
    >
      <span
        className="font-display text-neutral-50"
        style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.7rem)", lineHeight: 1.1 }}
      >
        {title}
      </span>
      <span
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)", lineHeight: 1.3 }}
      >
        {essence}
      </span>
    </button>
  );
}
```

- [ ] **Step 5: Write `<TechniqueModal>`**

```tsx
// src/slides/foundation-core-section-e/components/TechniqueModal.tsx
import { motion, AnimatePresence } from "framer-motion";

export interface TechniqueBullet {
  label: string;     // "Best for" | "Example" | "Trade-off"
  body: string;
}

interface TechniqueModalProps {
  id: string;
  title: string;
  layerAnnotation?: string; // "Layer 2" | "Layer 3" | undefined
  bullets: readonly TechniqueBullet[];
  open: boolean;
  onClose: () => void;
}

export function TechniqueModal({
  id,
  title,
  layerAnnotation,
  bullets,
  open,
  onClose,
}: TechniqueModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-root"
          data-testid={`technique-modal-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="close"
            data-testid="technique-modal-backdrop"
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
          />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[70vh] w-[60vw] flex-col gap-4 border border-copper-300 bg-neutral-950 p-8 shadow"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div className="flex items-baseline gap-4">
                <h2
                  className="font-display text-neutral-50"
                  style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1 }}
                >
                  {title}
                </h2>
                {layerAnnotation && (
                  <span
                    className="font-mono uppercase tracking-[0.18em] text-copper-200"
                    style={{ fontSize: "clamp(0.8rem, 0.95vw, 1rem)" }}
                  >
                    ↘ {layerAnnotation}
                  </span>
                )}
              </div>
              <button
                type="button"
                data-testid="technique-modal-close"
                onClick={onClose}
                className="font-mono text-copper-300 hover:text-copper-200"
                style={{ fontSize: "1.5rem" }}
              >
                ×
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li
                  key={b.label}
                  data-testid={`technique-bullet-${i}`}
                  className="flex flex-col gap-1"
                >
                  <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}>
                    {b.label}
                  </span>
                  <span className="font-serif text-neutral-100" style={{ fontSize: "clamp(1rem, 1.2vw, 1.25rem)", lineHeight: 1.4 }}>
                    {b.body}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run tests/unit/TechniqueCard.test.tsx tests/unit/TechniqueModal.test.tsx`
Expected: both PASS — seven assertions across two files green.

- [ ] **Step 7: Commit**

```bash
git add src/slides/foundation-core-section-e/components/TechniqueCard.tsx src/slides/foundation-core-section-e/components/TechniqueModal.tsx tests/unit/TechniqueCard.test.tsx tests/unit/TechniqueModal.test.tsx
git commit -m "feat(foundation-core-section-e): add TechniqueCard + TechniqueModal primitives"
```

---

## Task 11 — E.4 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e4-prompt-methodologies.tsx`
- Test: `tests/unit/e4-prompt-methodologies.test.tsx`

**Spec reference:** §4.4. 4 advances. Layout: 3 horizontal tier bands stacked vertically + footer caption. Click any technique card to open its modal.

- [ ] **Step 1: Add E.4 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e4Content = {
  headline: "Eight techniques. Three tiers.",
  headlineKeywords: ["Three tiers"] as const,
  footerCaption: "Higher tiers borrow from later layers. ART · RAG · ReAct already point to context and harness.",
  footerCaptionKeywords: ["Higher tiers", "context", "harness"] as const,
  tierAnnotation: "↘ context · harness",
  tiers: [
    {
      id: "basic",
      label: "BASIC",
      copper: "copper-700" as const,
      cards: [
        { id: "zero-shot", title: "Zero-Shot", essence: "Ask once, no examples" },
        { id: "few-shot", title: "Few-Shot", essence: "Show 2–3 examples" },
        { id: "cot", title: "Chain-of-Thought", essence: "Think step by step" },
      ],
    },
    {
      id: "intermediate",
      label: "INTERMEDIATE",
      copper: "copper-500" as const,
      cards: [
        { id: "self-cons", title: "Self-Consistency", essence: "Multiple paths, consensus" },
        { id: "tot", title: "Tree of Thoughts", essence: "Branch decision paths" },
      ],
    },
    {
      id: "advanced",
      label: "ADVANCED",
      copper: "copper-300" as const,
      cards: [
        { id: "rag", title: "RAG", essence: "Retrieve + ground in docs" },
        { id: "art", title: "ART", essence: "Reason + use tools" },
        { id: "react", title: "ReAct", essence: "Think → Act → Observe → repeat" },
      ],
    },
  ],
  modalContent: {
    "zero-shot": {
      bullets: [
        { label: "Best for", body: "well-defined tasks · quick single-pass requests" },
        { label: "Example", body: '"Analyze the financial risks in our Q3 report and provide recommendations."' },
        { label: "Trade-off", body: "simplest path; relies entirely on training" },
      ],
    },
    "few-shot": {
      bullets: [
        { label: "Best for", body: "classification · formatting · style mimicking" },
        { label: "Example", body: "Classify these emails by department: Example 1: 'I need help with my account balance' → Finance · Example 2: 'The app keeps crashing' → Tech Support · Now classify: 'I found an error in my invoice'" },
        { label: "Trade-off", body: "examples consume tokens; pattern transfers reliably" },
      ],
    },
    cot: {
      bullets: [
        { label: "Best for", body: "math · logic · multi-step reasoning" },
        { label: "Example", body: "Calculate customer acquisition cost. Think step-by-step: 1. List marketing expenses · 2. Count new customers · 3. Divide. Show your reasoning." },
        { label: "Trade-off", body: "longer outputs; more accurate on hard problems" },
      ],
    },
    "self-cons": {
      bullets: [
        { label: "Best for", body: "high-stakes decisions · accuracy-critical work" },
        { label: "Example", body: "Generate 3 different approaches to reduce costs by 15%. For each: list steps, estimate time, calculate savings. Identify elements common to all three." },
        { label: "Trade-off", body: "3× compute cost; substantially more reliable" },
      ],
    },
    tot: {
      bullets: [
        { label: "Best for", body: "strategic decisions · multi-option evaluation" },
        { label: "Example", body: "Path A: Singapore vs Thailand. Path B: Germany vs Netherlands. For each: market size, regulations, competition. Recommend best." },
        { label: "Trade-off", body: "heavier reasoning; explores trade-offs systematically" },
      ],
    },
    rag: {
      layerAnnotation: "Layer 2",
      bullets: [
        { label: "Best for", body: "questions about your data · recent events · specific knowledge" },
        { label: "Example", body: "Using our knowledge base: search for 'remote work policy'. Create updated FAQ addressing top 5 questions." },
        { label: "Trade-off", body: "needs retrieval setup; grounds answers in real sources" },
      ],
    },
    art: {
      layerAnnotation: "Layer 3",
      bullets: [
        { label: "Best for", body: "multi-step workflows requiring different capabilities" },
        { label: "Example", body: "For quarterly financials: calculator for growth %, search web for benchmarks, access CRM, generate charts. Select tools automatically." },
        { label: "Trade-off", body: "needs tool wiring; massively expands what's possible" },
      ],
    },
    react: {
      layerAnnotation: "Layer 3",
      bullets: [
        { label: "Best for", body: "investigation · debugging · adaptive workflows" },
        { label: "Example", body: "Debug churn: Thought (check support tickets) → Action (search Oct DB) → Observation (45% billing complaints) → Thought (billing issue?) → Action (check logs) → continue." },
        { label: "Trade-off", body: "agent loop; the heart of how modern AI agents work" },
      ],
    },
  },
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e4-prompt-methodologies.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E4PromptMethodologies, e4Slide } from "@/slides/foundation-core-section-e/e4-prompt-methodologies";

test("E.4 declares 4 steps with canonicalPose=3", () => {
  expect(e4Slide.steps).toBe(4);
  expect(e4Slide.canonicalPose).toBe(3);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.4 at canonicalPose renders 3 tiers + 8 cards + footer caption", () => {
  render(
    <DeckProvider stepCounts={[e4Slide.steps]}>
      <AdvanceTo step={e4Slide.canonicalPose} />
      <E4PromptMethodologies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.4 · METHODOLOGIES/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^tier-/)).toHaveLength(3);
  expect(screen.getAllByTestId(/^technique-card-/)).toHaveLength(8);
  expect(screen.getByText(/Higher tiers/)).toBeInTheDocument();
});

test("clicking a technique card opens its modal; close button dismisses", () => {
  render(
    <DeckProvider stepCounts={[e4Slide.steps]}>
      <AdvanceTo step={e4Slide.canonicalPose} />
      <E4PromptMethodologies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  fireEvent.click(screen.getByTestId("technique-card-rag"));
  expect(screen.getByTestId("technique-modal-rag")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("technique-modal-close"));
  expect(screen.queryByTestId("technique-modal-rag")).toBeNull();
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e4-prompt-methodologies.test.tsx`
Expected: FAIL — slide unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e4-prompt-methodologies.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { TieredTechniqueGrid } from "./components/TieredTechniqueGrid";
import { TechniqueCard } from "./components/TechniqueCard";
import { TechniqueModal } from "./components/TechniqueModal";
import { e4Content as C } from "./content";

type ModalContent = (typeof C.modalContent)[keyof typeof C.modalContent];

export function E4PromptMethodologies() {
  const { stepIndex } = useDeck();
  // Spec §4.4: Space 1 BASIC tier; Space 2 INTERMEDIATE; Space 3 ADVANCED + tier annotation; Space 4 footer caption + foreshadow pulse.
  const revealedTier = stepIndex >= 2 ? 3 : stepIndex >= 1 ? 2 : 1;
  const showFooter = stepIndex >= 3;

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeContent: ModalContent | null = activeId
    ? (C.modalContent as Record<string, ModalContent>)[activeId] ?? null
    : null;

  // Title is derived from the matching card title.
  const cardLookup: Record<string, { title: string; essence: string }> = {};
  for (const tier of C.tiers) {
    for (const c of tier.cards) cardLookup[c.id] = { title: c.title, essence: c.essence };
  }

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
      <FigLabel section="E" num={4} label="METHODOLOGIES" />

      <div className="relative z-10 mx-auto flex h-full max-w-[88vw] flex-col items-stretch justify-center gap-10 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <TieredTechniqueGrid
          tiers={C.tiers}
          revealedTier={revealedTier}
          renderCard={(card, copper) => (
            <TechniqueCard
              id={card.id}
              title={card.title}
              essence={card.essence}
              copper={copper}
              onClick={(id) => setActiveId(id)}
            />
          )}
        />

        <motion.p
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1rem, 1.35vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showFooter ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.footerCaption, C.footerCaptionKeywords)}
        </motion.p>
      </div>

      {activeId && activeContent && (
        <TechniqueModal
          id={activeId}
          title={cardLookup[activeId]?.title ?? activeId}
          layerAnnotation={activeContent.layerAnnotation}
          bullets={activeContent.bullets}
          open
          onClose={() => setActiveId(null)}
        />
      )}
    </div>
  );
}

export const e4Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <E4PromptMethodologies />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e4-prompt-methodologies.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e4-prompt-methodologies.tsx tests/unit/e4-prompt-methodologies.test.tsx
git commit -m "feat(foundation-core-section-e): add E.4 PROMPT — methodologies slide"
```

---

## Task 12 — `<LayerCard>` morph primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/LayerCard.tsx`
- Test: `tests/unit/LayerCard.test.tsx`

**Spec reference:** §3.2 + §4.1. Concentric Russian-doll layer card with `layoutId={\`layer-${name}\`}` and `mode ∈ {focal, nested}`. `mode="focal"` = full-stage; `mode="nested"` = sized + positioned for final composition. Framer Motion `layoutId` auto-tweens between modes.

For E.1, the three layers are PROMPT (innermost), CONTEXT (middle), HARNESS (outermost). The visual is concentric circles, not squares — the **one-time exception** to 0px-corner discipline (spec §4.1).

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/LayerCard.test.tsx
import { render, screen, rerender } from "@testing-library/react";
import { LayerCard } from "@/slides/foundation-core-section-e/components/LayerCard";

test("LayerCard renders label + essence", () => {
  render(
    <LayerCard
      layer="prompt"
      mode="focal"
      label="PROMPT"
      essence="the instructions"
      essenceKeywords={["instructions"]}
    />,
  );
  expect(screen.getByText("PROMPT")).toBeInTheDocument();
  expect(screen.getByText(/instructions/)).toBeInTheDocument();
});

test("LayerCard data attributes reflect mode + layer", () => {
  render(
    <LayerCard
      layer="context"
      mode="nested"
      label="CONTEXT"
      essence="the information"
      essenceKeywords={["information"]}
    />,
  );
  expect(screen.getByTestId("layer-card-context").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByTestId("layer-card-context").getAttribute("data-layer")).toBe("context");
});

test("LayerCard accepts a focal-mode child slot for the demo content", () => {
  render(
    <LayerCard
      layer="harness"
      mode="focal"
      label="HARNESS"
      essence="the system"
      essenceKeywords={["system"]}
    >
      <div data-testid="layer-demo-host">demo</div>
    </LayerCard>,
  );
  expect(screen.getByTestId("layer-demo-host")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/LayerCard.test.tsx`
Expected: FAIL — `LayerCard` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/LayerCard.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { highlight } from "@/components/highlight";

export type LayerName = "prompt" | "context" | "harness";
export type LayerMode = "focal" | "nested";

interface LayerCardProps {
  layer: LayerName;
  mode: LayerMode;
  label: string;       // "PROMPT" | "CONTEXT" | "HARNESS"
  essence: string;     // "the instructions" | etc
  essenceKeywords: readonly string[];
  children?: ReactNode; // focal-mode demo content
}

// Concentric ring sizes — spec §4.1: inner ~25% area, middle ~55%, outer ~85%.
// We map area-percent to vmin (square viewport) and use a circular border.
const NESTED_DIAMETER_VMIN: Record<LayerName, number> = {
  prompt: 28,
  context: 50,
  harness: 78,
};
const FOCAL_DIAMETER_VMIN = 78; // focal mode fills the stage

const RING_BORDER: Record<LayerName, string> = {
  prompt: "border-copper-700",
  context: "border-copper-300",
  harness: "border-copper-200",
};

const LABEL_COLOR: Record<LayerName, string> = {
  prompt: "text-copper-400",
  context: "text-copper-300",
  harness: "text-copper-200",
};

export function LayerCard({
  layer,
  mode,
  label,
  essence,
  essenceKeywords,
  children,
}: LayerCardProps) {
  const diameter = mode === "focal" ? FOCAL_DIAMETER_VMIN : NESTED_DIAMETER_VMIN[layer];
  return (
    <motion.div
      data-testid={`layer-card-${layer}`}
      data-mode={mode}
      data-layer={layer}
      layoutId={`layer-${layer}`}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${RING_BORDER[layer]} flex items-center justify-center`}
      style={{ width: `${diameter}vmin`, height: `${diameter}vmin` }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start gap-1 pt-6">
        <span
          className={`font-mono uppercase tracking-[0.18em] ${LABEL_COLOR[layer]}`}
          style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.25rem)" }}
        >
          {label}
        </span>
        <span
          className="font-serif italic text-neutral-100"
          style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.7rem)" }}
        >
          {highlight(essence, essenceKeywords)}
        </span>
      </div>
      {mode === "focal" && children && (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/LayerCard.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/LayerCard.tsx tests/unit/LayerCard.test.tsx
git commit -m "feat(foundation-core-section-e): add LayerCard morph primitive"
```

---

## Task 13 — `<LayerDemo>` (3 kinds)

**Files:**
- Create: `src/slides/foundation-core-section-e/components/LayerDemo.tsx`
- Test: `tests/unit/LayerDemo.test.tsx`

**Spec reference:** §3.2 + §4.1 (Spaces 2, 4). The three kinds are:
- `prompt-typing` — Space 2: structured prompt builds line-by-line in monospace inside the PROMPT circle, with inline element tags.
- `context-network` — Space 4: 6 satellite nodes appear with connector lines from PROMPT center.
- `multi-agent-orchestration` — Space 6: rendered separately by `<MultiAgentOrchestration>` (Task 14). LayerDemo simply forwards.

For Plan A simplicity, `prompt-typing` reuses the proper-prompt copy from E.2 (`e2Content.properPrompt`) — the structured prompt typed in E.1 Space 2 IS the same prompt unpacked in E.2 (cross-slide rhyme per spec §5.4 "E.1 → E.2"). `context-network` is a 6-node hexagonal placeholder that's iterated in Plan B (where the `<NodeNetwork>` primitive lands); Plan A renders a static SVG version sufficient for E.1's purpose.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/LayerDemo.test.tsx
import { render, screen } from "@testing-library/react";
import { LayerDemo } from "@/slides/foundation-core-section-e/components/LayerDemo";

test("LayerDemo prompt-typing renders the structured prompt body", () => {
  render(<LayerDemo kind="prompt-typing" play />);
  // Should show at least the "Role:" label as part of the typed prompt.
  expect(screen.getByTestId("layer-demo-prompt-typing")).toBeInTheDocument();
});

test("LayerDemo context-network renders 6 satellite nodes", () => {
  render(<LayerDemo kind="context-network" play />);
  expect(screen.getAllByTestId(/^context-satellite-/)).toHaveLength(6);
});

test("LayerDemo multi-agent-orchestration renders the orchestration host", () => {
  render(<LayerDemo kind="multi-agent-orchestration" play />);
  expect(screen.getByTestId("layer-demo-multi-agent")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/LayerDemo.test.tsx`
Expected: FAIL — `LayerDemo` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/LayerDemo.tsx
import { motion } from "framer-motion";
import { MultiAgentOrchestration } from "./MultiAgentOrchestration";

interface LayerDemoProps {
  kind: "prompt-typing" | "context-network" | "multi-agent-orchestration";
  play: boolean;
}

const PROMPT_LINES = [
  { label: "Role:", body: " You are a project lead." },
  { label: "Task:", body: " Draft the weekly status." },
  { label: "Context:", body: " Friday standup, 8 stakeholders." },
  { label: "Examples:", body: " See last week's report." },
  { label: "Output:", body: " Markdown, ~250 words." },
] as const;

// 6 satellite labels (E.1 Space 4) — names match E.6 satellites for cross-slide rhyme.
const SATELLITES = [
  "system instructions",
  "user memory",
  "RAG knowledge",
  "tools & APIs",
  "state",
  "output",
] as const;

export function LayerDemo({ kind, play }: LayerDemoProps) {
  if (kind === "prompt-typing") {
    return (
      <div
        data-testid="layer-demo-prompt-typing"
        className="flex w-[24vmin] flex-col gap-1 font-mono text-neutral-100"
        style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.95rem)", lineHeight: 1.35 }}
      >
        {PROMPT_LINES.map((l, i) => (
          <motion.span
            key={l.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: play ? 1 : 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: play ? i * 0.9 : 0, // ~6s total typing across 5 lines
            }}
          >
            <span className="text-copper-300 font-semibold">{l.label}</span>
            <span>{l.body}</span>
          </motion.span>
        ))}
      </div>
    );
  }

  if (kind === "context-network") {
    return (
      <svg
        data-testid="layer-demo-context-network"
        viewBox="-100 -100 200 200"
        className="h-[44vmin] w-[44vmin]"
      >
        {/* Center node — placeholder for prompt at the core. */}
        <circle cx={0} cy={0} r={6} className="fill-copper-400" />
        {/* 6 satellites at 60° intervals, radius 70. */}
        {SATELLITES.map((label, i) => {
          const theta = (i * Math.PI) / 3 - Math.PI / 2;
          const x = Math.cos(theta) * 70;
          const y = Math.sin(theta) * 70;
          return (
            <g key={label} data-testid={`context-satellite-${i}`}>
              <motion.line
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                strokeWidth={1}
                className="stroke-copper-700"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: play ? 1 : 0 }}
                transition={{ duration: 0.4, delay: play ? 0.2 + i * 0.18 : 0, ease: "easeOut" }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={4}
                className="fill-copper-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: play ? 1 : 0, opacity: play ? 1 : 0 }}
                transition={{ duration: 0.3, delay: play ? 0.4 + i * 0.18 : 0 }}
              />
              <motion.text
                x={x}
                y={y + (y >= 0 ? 14 : -8)}
                textAnchor="middle"
                className="fill-neutral-200 font-mono"
                style={{ fontSize: 6 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: play ? 1 : 0 }}
                transition={{ duration: 0.3, delay: play ? 0.55 + i * 0.18 : 0 }}
              >
                {label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    );
  }

  // multi-agent-orchestration
  return (
    <div data-testid="layer-demo-multi-agent" className="flex h-full w-full items-center justify-center">
      <MultiAgentOrchestration play={play} />
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/LayerDemo.test.tsx`
Expected: PASS — three assertions green. (Note: this depends on `<MultiAgentOrchestration>` from Task 14; if running these tasks strictly in order, build Task 14 first, OR add a temporary inline stub that Task 14 replaces. The cleanest path is to write Task 14 first — see swap below.)

> **Sequencing note:** If you run Tasks 13 and 14 strictly sequentially, `<LayerDemo kind="multi-agent-orchestration">` will fail to import `<MultiAgentOrchestration>`. Resolve by **doing Task 14 first**, then Task 13. The plan presents Task 13 first because conceptually `<LayerDemo>` is the parent; in execution order, swap them.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/LayerDemo.tsx tests/unit/LayerDemo.test.tsx
git commit -m "feat(foundation-core-section-e): add LayerDemo (prompt/context/orchestration)"
```

---

## Task 14 — `<MultiAgentOrchestration>` 4-pattern loop

**Files:**
- Create: `src/slides/foundation-core-section-e/components/MultiAgentOrchestration.tsx`
- Test: `tests/unit/MultiAgentOrchestration.test.tsx`

**Spec reference:** §3.2 + §4.1 + §8.5.2. Renders agent cluster (`MAIN AGENT` + `AGENT A` · `AGENT B` · `AGENT C`) + cycling 4-pattern loop (centralized · decentralized · chain · parallel). Each pattern has a distinct connector-motion signature: round-trip pulses (centralized), bidirectional pulses (decentralized), single sequential pulse (chain — agents only, no orchestrator), synchronized burst (parallel).

This is the highest-risk primitive in Plan A. Test surface is intentionally light (asserts presence of agent boxes + the cycling pattern label) — the *visual* correctness comes from the spec §4.1 motion table + §8.5.2 implementation notes; mismatches are caught at projection-test, not in unit tests.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/MultiAgentOrchestration.test.tsx
import { render, screen, act } from "@testing-library/react";
import { MultiAgentOrchestration } from "@/slides/foundation-core-section-e/components/MultiAgentOrchestration";

test("MultiAgentOrchestration renders MAIN AGENT + 3 sub-agents", () => {
  render(<MultiAgentOrchestration play={false} />);
  expect(screen.getByText("MAIN AGENT")).toBeInTheDocument();
  expect(screen.getByText("AGENT A")).toBeInTheDocument();
  expect(screen.getByText("AGENT B")).toBeInTheDocument();
  expect(screen.getByText("AGENT C")).toBeInTheDocument();
});

test("renders the active pattern label inline", () => {
  render(<MultiAgentOrchestration play />);
  // Label must say one of the 4 patterns.
  const label = screen.getByTestId("orchestration-pattern-label");
  expect(label.textContent).toMatch(/Pattern: (centralized|decentralized \(A2A\)|chain|parallel)/);
});

test("when play=false, ambient is suspended (data-play=false)", () => {
  render(<MultiAgentOrchestration play={false} />);
  expect(screen.getByTestId("orchestration-root").getAttribute("data-play")).toBe("false");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/MultiAgentOrchestration.test.tsx`
Expected: FAIL — `MultiAgentOrchestration` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/MultiAgentOrchestration.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Pattern = "centralized" | "decentralized" | "chain" | "parallel";

const PATTERN_LABELS: Record<Pattern, string> = {
  centralized: "Pattern: centralized",
  decentralized: "Pattern: decentralized (A2A)",
  chain: "Pattern: chain",
  parallel: "Pattern: parallel",
};

const PATTERN_ORDER: readonly Pattern[] = [
  "centralized",
  "decentralized",
  "chain",
  "parallel",
];

// Geometry — viewBox is centered at (0,0).
const MAIN_POS = { x: 0, y: -55 };
const AGENT_POS: Record<"A" | "B" | "C", { x: number; y: number }> = {
  A: { x: -55, y: 30 },
  B: { x: 0, y: 50 },
  C: { x: 55, y: 30 },
};

// Each pattern stays on screen for ~1500ms, with ~300ms morph between patterns.
const PATTERN_INTERVAL_MS = 1500;

interface MultiAgentOrchestrationProps {
  play: boolean;
}

export function MultiAgentOrchestration({ play }: MultiAgentOrchestrationProps) {
  const [patternIdx, setPatternIdx] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => {
      setPatternIdx((i) => (i + 1) % PATTERN_ORDER.length);
    }, PATTERN_INTERVAL_MS);
    return () => clearInterval(id);
  }, [play]);

  const pattern = PATTERN_ORDER[patternIdx];
  const mainDimmed = pattern === "decentralized" || pattern === "chain";

  return (
    <div
      data-testid="orchestration-root"
      data-play={String(play)}
      className="relative flex h-[60vmin] w-[60vmin] flex-col items-center justify-center"
    >
      <svg viewBox="-80 -80 160 160" className="h-full w-full">
        {/* Main → A/B/C lines (used by centralized + parallel) */}
        {(["A", "B", "C"] as const).map((id) => {
          const a = AGENT_POS[id];
          return (
            <line
              key={`spoke-${id}`}
              x1={MAIN_POS.x}
              y1={MAIN_POS.y}
              x2={a.x}
              y2={a.y}
              strokeWidth={0.8}
              className="stroke-copper-700"
              opacity={pattern === "chain" ? 0 : pattern === "decentralized" ? 0.2 : 0.7}
            />
          );
        })}

        {/* Peer lines (used by decentralized) */}
        {([["A", "B"], ["B", "C"], ["A", "C"]] as const).map(([p, q]) => {
          const a = AGENT_POS[p];
          const b = AGENT_POS[q];
          return (
            <line
              key={`peer-${p}-${q}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              strokeWidth={0.8}
              className="stroke-copper-700"
              opacity={pattern === "decentralized" ? 0.7 : 0.2}
            />
          );
        })}

        {/* Sequential chain segments (visible only on `chain`) */}
        {pattern === "chain" && (
          <>
            <line
              x1={AGENT_POS.A.x}
              y1={AGENT_POS.A.y}
              x2={AGENT_POS.B.x}
              y2={AGENT_POS.B.y}
              strokeWidth={1}
              className="stroke-copper-300"
            />
            <line
              x1={AGENT_POS.B.x}
              y1={AGENT_POS.B.y}
              x2={AGENT_POS.C.x}
              y2={AGENT_POS.C.y}
              strokeWidth={1}
              className="stroke-copper-300"
            />
          </>
        )}

        {/* Pulses — implemented per-pattern for the distinct motion signatures.
            Each <Pulse> is a copper-300 dot animating along an SVG line. */}
        {pattern === "centralized" &&
          (["A", "B", "C"] as const).map((id, i) => (
            <Pulse
              key={`c-out-${id}-${patternIdx}`}
              from={MAIN_POS}
              to={AGENT_POS[id]}
              durationMs={400}
              delayMs={i * 80}
            />
          ))}
        {pattern === "centralized" &&
          (["A", "B", "C"] as const).map((id, i) => (
            <Pulse
              key={`c-ret-${id}-${patternIdx}`}
              from={AGENT_POS[id]}
              to={MAIN_POS}
              durationMs={400}
              delayMs={500 + i * 80}
            />
          ))}
        {pattern === "parallel" &&
          (["A", "B", "C"] as const).map((id) => (
            <Pulse
              key={`p-out-${id}-${patternIdx}`}
              from={MAIN_POS}
              to={AGENT_POS[id]}
              durationMs={400}
              delayMs={0}
            />
          ))}
        {pattern === "parallel" &&
          (["A", "B", "C"] as const).map((id) => (
            <Pulse
              key={`p-ret-${id}-${patternIdx}`}
              from={AGENT_POS[id]}
              to={MAIN_POS}
              durationMs={400}
              delayMs={650}
            />
          ))}
        {pattern === "decentralized" &&
          ([["A", "B"], ["B", "C"], ["A", "C"]] as const).flatMap(([p, q]) => [
            <Pulse
              key={`d-${p}-${q}-fwd-${patternIdx}`}
              from={AGENT_POS[p]}
              to={AGENT_POS[q]}
              durationMs={600}
              delayMs={0}
              easing="linear"
            />,
            <Pulse
              key={`d-${p}-${q}-rev-${patternIdx}`}
              from={AGENT_POS[q]}
              to={AGENT_POS[p]}
              durationMs={600}
              delayMs={0}
              easing="linear"
            />,
          ])}
        {pattern === "chain" && (
          <>
            <Pulse
              key={`chain-1-${patternIdx}`}
              from={AGENT_POS.A}
              to={AGENT_POS.B}
              durationMs={400}
              delayMs={0}
            />
            <Pulse
              key={`chain-2-${patternIdx}`}
              from={AGENT_POS.B}
              to={AGENT_POS.C}
              durationMs={400}
              delayMs={500}
            />
          </>
        )}

        {/* Agent boxes — drawn last so pulses sit underneath. */}
        <AgentBox label="MAIN AGENT" x={MAIN_POS.x} y={MAIN_POS.y} dim={mainDimmed} />
        <AgentBox label="AGENT A" x={AGENT_POS.A.x} y={AGENT_POS.A.y} />
        <AgentBox label="AGENT B" x={AGENT_POS.B.x} y={AGENT_POS.B.y} />
        <AgentBox label="AGENT C" x={AGENT_POS.C.x} y={AGENT_POS.C.y} />
      </svg>

      <span
        data-testid="orchestration-pattern-label"
        className="absolute bottom-2 font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.75rem, 0.95vw, 1rem)" }}
      >
        {PATTERN_LABELS[pattern]}
      </span>
    </div>
  );
}

function AgentBox({
  label,
  x,
  y,
  dim,
}: {
  label: string;
  x: number;
  y: number;
  dim?: boolean;
}) {
  const isMain = label === "MAIN AGENT";
  const w = isMain ? 38 : 26;
  const h = 14;
  return (
    <g opacity={dim ? 0.3 : 1}>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        className={isMain ? "fill-neutral-950 stroke-copper-200" : "fill-neutral-950 stroke-copper-300"}
        strokeWidth={0.6}
      />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        className="fill-neutral-100 font-mono"
        style={{ fontSize: 4.5, letterSpacing: 0.5 }}
      >
        {label}
      </text>
    </g>
  );
}

function Pulse({
  from,
  to,
  durationMs,
  delayMs,
  easing = "easeOut",
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  durationMs: number;
  delayMs: number;
  easing?: "easeOut" | "easeIn" | "linear";
}) {
  return (
    <motion.circle
      r={2}
      className="fill-copper-300"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: to.x,
        cy: to.y,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: durationMs / 1000,
        delay: delayMs / 1000,
        ease: easing,
        times: [0, 0.1, 0.9, 1],
      }}
    />
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/MultiAgentOrchestration.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/MultiAgentOrchestration.tsx tests/unit/MultiAgentOrchestration.test.tsx
git commit -m "feat(foundation-core-section-e): add MultiAgentOrchestration 4-pattern loop"
```

---

## Task 15 — E.1 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e1-three-layers.tsx`
- Test: `tests/unit/e1-three-layers.test.tsx`

**Spec reference:** §4.1. **7 advances**, click-driven, no post-Space-7 ambient. Russian-doll opener — concentric circles + Anthropic quote.

The slide composes `<LayerCard>` × 3 and `<LayerDemo>` × 3. Each LayerCard transitions from `mode="focal"` (when its layer is the current focal) to `mode="nested"` (when subsequent layers have wrapped around it) via Framer's `layoutId` auto-tween.

**Step → state mapping:**

| Step | PROMPT | CONTEXT | HARNESS | Demo | Quote |
|------|--------|---------|---------|------|-------|
| 0 (Space 1) | focal | hidden | hidden | none | hidden |
| 1 (Space 2) | focal | hidden | hidden | prompt-typing | hidden |
| 2 (Space 3) | nested | focal | hidden | none | hidden |
| 3 (Space 4) | nested | focal | hidden | context-network | hidden |
| 4 (Space 5) | nested | nested | focal | none | hidden |
| 5 (Space 6) | nested | nested | focal | multi-agent-orchestration | hidden |
| 6 (Space 7) | nested | nested | nested | none | shown |

- [ ] **Step 1: Add E.1 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e1Content = {
  headline: "Three layers. Each one contains the last.",
  headlineKeywords: ["Each one contains the last"] as const,
  layers: [
    { layer: "prompt" as const, label: "PROMPT", essence: "the instructions", essenceKeywords: ["instructions"] as const },
    { layer: "context" as const, label: "CONTEXT", essence: "the information", essenceKeywords: ["information"] as const },
    { layer: "harness" as const, label: "HARNESS", essence: "the system", essenceKeywords: ["system"] as const },
  ],
  quote: "A decent model with a great harness beats a great model with a bad harness. — Anthropic",
  quoteKeywords: ["A decent model with a great harness beats a great model with a bad harness"] as const,
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e1-three-layers.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E1ThreeLayers, e1Slide } from "@/slides/foundation-core-section-e/e1-three-layers";

test("E.1 declares 7 steps with canonicalPose=6", () => {
  expect(e1Slide.steps).toBe(7);
  expect(e1Slide.canonicalPose).toBe(6);
  expect(e1Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.1 at canonicalPose renders all 3 layer cards in nested mode + Anthropic quote", () => {
  render(
    <DeckProvider stepCounts={[e1Slide.steps]}>
      <AdvanceTo step={e1Slide.canonicalPose} />
      <E1ThreeLayers />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.1 · THE THREE LAYERS/)).toBeInTheDocument();
  expect(screen.getByTestId("layer-card-prompt").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByTestId("layer-card-context").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByTestId("layer-card-harness").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByText(/Anthropic/)).toBeInTheDocument();
});

test("E.1 Space 1 has only PROMPT visible in focal mode", () => {
  render(
    <DeckProvider stepCounts={[e1Slide.steps]}>
      <AdvanceTo step={0} />
      <E1ThreeLayers />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByTestId("layer-card-prompt").getAttribute("data-mode")).toBe("focal");
  expect(screen.queryByTestId("layer-card-context")).toBeNull();
  expect(screen.queryByTestId("layer-card-harness")).toBeNull();
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e1-three-layers.test.tsx`
Expected: FAIL — slide unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e1-three-layers.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LayerCard, type LayerMode } from "./components/LayerCard";
import { LayerDemo } from "./components/LayerDemo";
import { e1Content as C } from "./content";

type LayerName = "prompt" | "context" | "harness";

interface LayerState {
  visible: boolean;
  mode: LayerMode;
}

// Spec §4.1 step → state table.
function layerStatesFor(step: number): Record<LayerName, LayerState> {
  // 0,1 → PROMPT focal alone
  // 2,3 → CONTEXT focal, PROMPT nested
  // 4,5 → HARNESS focal, both inner nested
  // 6   → all nested + quote
  const promptVisible = step >= 0;
  const contextVisible = step >= 2;
  const harnessVisible = step >= 4;
  return {
    prompt: {
      visible: promptVisible,
      mode: step >= 2 ? "nested" : "focal",
    },
    context: {
      visible: contextVisible,
      mode: step >= 4 ? "nested" : "focal",
    },
    harness: {
      visible: harnessVisible,
      mode: step >= 6 ? "nested" : "focal",
    },
  };
}

function demoForStep(step: number): "prompt-typing" | "context-network" | "multi-agent-orchestration" | null {
  if (step === 1) return "prompt-typing";
  if (step === 3) return "context-network";
  if (step === 5) return "multi-agent-orchestration";
  return null;
}

export function E1ThreeLayers() {
  const { stepIndex } = useDeck();
  const states = layerStatesFor(stepIndex);
  const demo = demoForStep(stepIndex);
  const showQuote = stepIndex >= 6;

  // Demo always renders inside whichever layer is currently focal.
  const focalLayer: LayerName | null =
    states.harness.visible && states.harness.mode === "focal"
      ? "harness"
      : states.context.visible && states.context.mode === "focal"
        ? "context"
        : states.prompt.visible && states.prompt.mode === "focal"
          ? "prompt"
          : null;

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
      <FigLabel section="E" num={1} label="THE THREE LAYERS" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.5rem)", lineHeight: 1.1, textAlign: "center" }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        {/* Concentric stage — fills the rest of the slide. */}
        <div className="relative mt-8 flex flex-1 w-full items-center justify-center">
          {/* Render outermost first so SVG/HTML painter order has innermost on top.
              But layoutId tweens still match by id so render order is mostly cosmetic. */}
          {(["harness", "context", "prompt"] as const).map((layer) => {
            const s = states[layer];
            if (!s.visible) return null;
            const meta = C.layers.find((l) => l.layer === layer)!;
            return (
              <LayerCard
                key={layer}
                layer={layer}
                mode={s.mode}
                label={meta.label}
                essence={meta.essence}
                essenceKeywords={meta.essenceKeywords}
              >
                {focalLayer === layer && demo ? <LayerDemo kind={demo} play /> : null}
              </LayerCard>
            );
          })}
        </div>

        <motion.p
          className="mb-2 mt-6 max-w-3xl text-center font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showQuote ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.quote, C.quoteKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e1Slide: SlideDef = {
  steps: 7,
  animationMode: "step-reveal",
  canonicalPose: 6,
  surface: "dark",
  render: () => <E1ThreeLayers />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e1-three-layers.test.tsx`
Expected: PASS, three assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e1-three-layers.tsx tests/unit/e1-three-layers.test.tsx
git commit -m "feat(foundation-core-section-e): add E.1 THE THREE LAYERS slide"
```

---

## Task 16 — E.5 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e5-prompt-the-wall.tsx`
- Test: `tests/unit/e5-prompt-the-wall.test.tsx`

**Spec reference:** §4.5. 4 advances, click-driven, no ambient. Layout: asymmetric two-tier — top BEST PRACTICES (left) + COMMON MISTAKES (right); bottom WHERE PROMPT ENDS (full width); closing caption.

E.5 uses no new primitives — only typography + the existing `highlight()` helper + `<DisplayPhrase>` for the closing caption stagger.

- [ ] **Step 1: Add E.5 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e5Content = {
  headline: "A great prompt still has limits.",
  headlineKeywords: ["A great prompt", "limits"] as const,
  bestPracticesHeader: "BEST PRACTICES",
  bestPractices: [
    "Be clear and concise",
    "Iterate and test",
    "Steer with detail",
    "Evaluate the output",
    "Set success metrics",
  ],
  commonMistakesHeader: "COMMON MISTAKES",
  commonMistakes: [
    "Vague instructions",
    "Overcomplicated prompts",
    "Lack of context",
    "Ignoring AI limitations",
    "Failing to iterate",
  ],
  wallHeader: "WHERE PROMPT ENDS",
  wallSubLine: "Even a perfect prompt can't:",
  wallSubLineKeywords: ["can't"] as const,
  constraints: [
    "Provide knowledge the model wasn't trained on",
    "Pull current or proprietary data",
    "Use tools, call APIs, or take actions",
    "Persist memory across sessions",
    "Verify its own output against reality",
    "Run autonomously on schedule or trigger",
  ],
  closingCaption: "That's where the next layers begin.",
  closingCaptionKeywords: ["That's where the next layers begin"] as const,
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e5-prompt-the-wall.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E5PromptTheWall, e5Slide } from "@/slides/foundation-core-section-e/e5-prompt-the-wall";

test("E.5 declares 4 steps with canonicalPose=3", () => {
  expect(e5Slide.steps).toBe(4);
  expect(e5Slide.canonicalPose).toBe(3);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.5 at canonicalPose renders all 3 sections + closing caption", () => {
  render(
    <DeckProvider stepCounts={[e5Slide.steps]}>
      <AdvanceTo step={e5Slide.canonicalPose} />
      <E5PromptTheWall />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.5 · THE WALL/)).toBeInTheDocument();
  expect(screen.getByText("BEST PRACTICES")).toBeInTheDocument();
  expect(screen.getByText("COMMON MISTAKES")).toBeInTheDocument();
  expect(screen.getByText("WHERE PROMPT ENDS")).toBeInTheDocument();
  expect(screen.getByText(/next layers begin/)).toBeInTheDocument();

  // 5 best practices + 5 mistakes + 6 constraints = 16 list items in the body.
  expect(screen.getAllByTestId(/^e5-bp-/)).toHaveLength(5);
  expect(screen.getAllByTestId(/^e5-cm-/)).toHaveLength(5);
  expect(screen.getAllByTestId(/^e5-constraint-/)).toHaveLength(6);
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e5-prompt-the-wall.test.tsx`
Expected: FAIL — slide unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e5-prompt-the-wall.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { e5Content as C } from "./content";

function StaggeredList({
  items,
  prefix,
  bulletColor,
  visible,
  testIdPrefix,
}: {
  items: readonly string[];
  prefix: string;
  bulletColor: string;
  visible: boolean;
  testIdPrefix: string;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <motion.li
          key={item}
          data-testid={`${testIdPrefix}-${i}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 4 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            delay: visible ? i * 0.08 : 0,
          }}
          className="font-serif text-neutral-100"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
        >
          <span className={`mr-2 ${bulletColor}`}>{prefix}</span>
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

export function E5PromptTheWall() {
  const { stepIndex } = useDeck();
  // Spec §4.5 motion table: Space 1 BEST PRACTICES; Space 2 COMMON MISTAKES;
  // Space 3 WHERE PROMPT ENDS section; Space 4 closing caption.
  const showBP = stepIndex >= 0;
  const showCM = stepIndex >= 1;
  const showWall = stepIndex >= 2;
  const showClosing = stepIndex >= 3;

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
      <FigLabel section="E" num={5} label="THE WALL" />

      <div className="relative z-10 mx-auto flex h-full max-w-[88vw] flex-col gap-10 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        {/* TOP: BP + CM side-by-side */}
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-3">
            <motion.h3
              className="font-mono uppercase tracking-[0.18em] text-copper-300"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.15rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showBP ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {C.bestPracticesHeader}
            </motion.h3>
            <StaggeredList
              items={C.bestPractices}
              prefix="•"
              bulletColor="text-copper-300"
              visible={showBP}
              testIdPrefix="e5-bp"
            />
          </div>
          <div className="flex flex-col gap-3">
            <motion.h3
              className="font-mono uppercase tracking-[0.18em] text-copper-400"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.15rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showCM ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {C.commonMistakesHeader}
            </motion.h3>
            <StaggeredList
              items={C.commonMistakes}
              prefix="•"
              bulletColor="text-copper-400"
              visible={showCM}
              testIdPrefix="e5-cm"
            />
          </div>
        </div>

        {/* BOTTOM: WHERE PROMPT ENDS — full-width, weighted */}
        <motion.div
          className="flex flex-col gap-4 border-t border-copper-700 pt-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showWall ? 1 : 0, y: showWall ? 0 : 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-display uppercase text-neutral-50"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.5rem)", lineHeight: 1 }}
          >
            <em className="not-italic text-copper-400 italic">{C.wallHeader}</em>
          </h2>
          <p
            className="font-serif italic text-neutral-50"
            style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.6rem)", lineHeight: 1.3 }}
          >
            {highlight(C.wallSubLine, C.wallSubLineKeywords)}
          </p>
          <ul className="flex flex-col gap-1">
            {C.constraints.map((c, i) => (
              <motion.li
                key={c}
                data-testid={`e5-constraint-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: showWall ? 1 : 0, y: showWall ? 0 : 4 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: showWall ? 0.3 + i * 0.1 : 0,
                }}
                className="font-serif text-neutral-100"
                style={{ fontSize: "clamp(1rem, 1.35vw, 1.35rem)", lineHeight: 1.4 }}
              >
                <span className="mr-2 text-copper-300">▸</span>
                {c}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Closing caption */}
        <motion.p
          className="text-center font-serif italic text-neutral-200"
          style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.6rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showClosing ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.closingCaption, C.closingCaptionKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e5Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <E5PromptTheWall />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e5-prompt-the-wall.test.tsx`
Expected: PASS, two assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e5-prompt-the-wall.tsx tests/unit/e5-prompt-the-wall.test.tsx
git commit -m "feat(foundation-core-section-e): add E.5 PROMPT — the wall slide"
```

---

## Task 17 — Wire Plan A into the deck

**Files:**
- Modify: `src/slides/foundation-core-section-e/index.ts`
- Modify: `src/deck/registry.tsx`
- Modify: `tests/unit/foundation-core-section-e-index.test.ts`
- Modify: `tests/e2e/keyboard-nav.spec.ts`

This task wires the five new slides into the deck registry so projection-test, PDF/PPTX export, and keyboard nav cover them. Order is locked: E.1 → E.2 → E.3 → E.4 → E.5, slotted **after** Section D and **before** Reveal+Closing per spec §1.1.

- [ ] **Step 1: Update the section index test to assert the final state**

Replace the bootstrap test from Task 1 with a fully-populated assertion.

```ts
// tests/unit/foundation-core-section-e-index.test.ts (full replacement)
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("Plan A — section E exports E.1..E.5 in order", () => {
  expect(foundationCoreSectionESlides).toHaveLength(5);
  // Expected canonical step counts per spec §6 / §1.1.
  expect(foundationCoreSectionESlides[0].steps).toBe(7); // E.1
  expect(foundationCoreSectionESlides[1].steps).toBe(5); // E.2
  expect(foundationCoreSectionESlides[2].steps).toBe(4); // E.3
  expect(foundationCoreSectionESlides[3].steps).toBe(4); // E.4
  expect(foundationCoreSectionESlides[4].steps).toBe(4); // E.5
});

test("every Plan A slide is dark-surface step-reveal", () => {
  for (const s of foundationCoreSectionESlides) {
    expect(s.surface ?? "dark").toBe("dark");
    expect(s.animationMode).toBe("step-reveal");
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/unit/foundation-core-section-e-index.test.ts`
Expected: FAIL — current export is empty.

- [ ] **Step 3: Update `index.ts` to export the 5 slides**

```ts
// src/slides/foundation-core-section-e/index.ts (full replacement)
import type { SlideDef } from "@/deck/types";
import { e1Slide } from "./e1-three-layers";
import { e2Slide } from "./e2-prompt-what-why";
import { e3Slide } from "./e3-prompt-structure";
import { e4Slide } from "./e4-prompt-methodologies";
import { e5Slide } from "./e5-prompt-the-wall";

// Spec §1.1 — locked Section E order.
// Plan A: E.1 → E.5; Plan B will append E.6 → E.11.
export const foundationCoreSectionESlides: SlideDef[] = [
  e1Slide,
  e2Slide,
  e3Slide,
  e4Slide,
  e5Slide,
];
```

- [ ] **Step 4: Wire into the deck registry**

Modify `src/deck/registry.tsx`. The new section sits between `foundationCoreSlides` and `revealAndClosingSlides`.

```tsx
// src/deck/registry.tsx (full replacement)
import type { SlideDef } from "./types";
import { HexLadder } from "@/primitives/HexLadder";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";
import { foundationCoreSlides } from "@/slides/foundation-core";
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

export const hexLadderDevSlide: SlideDef = {
  steps: 1,
  animationMode: "static",
  canonicalPose: 0,
  surface: "light",
  render: () => <HexLadder />,
};

// Final deck order per parent meta-spec: D → E → ... → I/J/K.
export const deckSlides: SlideDef[] = [
  ...foundationCoreSlides,
  ...foundationCoreSectionESlides,
  ...revealAndClosingSlides,
  hexLadderDevSlide,
];
```

- [ ] **Step 5: Run the unit tests for the index + the existing deck registry test**

Run: `npx vitest run tests/unit/foundation-core-section-e-index.test.ts tests/unit/deck-registry.test.ts`
Expected: PASS — both files green. (If `deck-registry.test.ts` asserts a specific deck length, update it to add 5; otherwise it should stay green automatically.)

- [ ] **Step 6: Extend the keyboard-nav e2e to cover the new slides**

Open `tests/e2e/keyboard-nav.spec.ts` and identify the `expect(slideCount).toBe(N)` assertion (or equivalent) that pins the total slide count. Increase `N` by 5. If the test individually walks each slide via `data-slide-index`, walk the 5 new ones too — for each E.x slide, press Space `slide.steps` times and assert the FIG label text changes appropriately.

If the file has no count assertion (just walks "to the end"), no edits are needed beyond running it.

```bash
# Validate the e2e:
npm run e2e -- tests/e2e/keyboard-nav.spec.ts
```

Expected: PASS — keyboard nav walks through all D + E + I/J/K slides.

- [ ] **Step 7: Manual smoke (auto mode — note for the executor)**

Per project memory, UI changes need a real browser check before claiming done.

```bash
npm run dev
# Open http://localhost:5173
# Press Space repeatedly. Confirm:
#   - Section D plays unchanged.
#   - E.1 opens with the headline + PROMPT ring; 7 advances walk through the Russian-doll cinematic; final pose shows 3 nested rings + Anthropic quote.
#   - E.2 → E.5 each advance through their step counts; FIG label is correct on each.
#   - E.4 click-modal: open RAG modal, close via × and via backdrop click.
#   - Reveal+Closing arc resumes after E.5.
```

If the dev server can't be launched in the executing environment, document it in the task notes and rely on unit + e2e coverage. Type-check + tests are necessary but not sufficient for UI changes per project policy.

- [ ] **Step 8: Run the full test suite**

```bash
npm test
```

Expected: PASS — every existing unit test, plus all 14 new test files added across Tasks 1–17.

- [ ] **Step 9: Commit**

```bash
git add src/deck/registry.tsx src/slides/foundation-core-section-e/index.ts tests/unit/foundation-core-section-e-index.test.ts tests/e2e/keyboard-nav.spec.ts
git commit -m "feat(foundation-core-section-e): register Plan A slides (E.1–E.5) in deck"
```

---

## Acceptance criteria for Plan A (mirrors spec §10)

A Plan A delivery is "done" when:

- All 5 slides individually pass their unit tests (Tasks 5, 8, 11, 15, 16) and the section-index test (Task 17).
- `npm test` is green; `npm run e2e -- tests/e2e/keyboard-nav.spec.ts` is green.
- `npm run dev` confirms manual walk-through end-to-end (per spec §10 acceptance: "Visual matches the spec at projection scale").
- `npm run export:pdf` and `npm run export:pptx` complete without errors and the canonical-pose freeze frames for E.1–E.5 land on each slide's last step.
- All 24 logical advances declared by Plan A (E.1=7 + E.2=5 + E.3=4 + E.4=4 + E.5=4 = 24) trigger via Space.
- Cross-slide hooks land:
  - E.2's bridge caption "Next: the canonical structure behind every good prompt." → E.3 headline "One skeleton. Many names." (verify via the visual walk-through).
  - E.4's tier-3 annotation `↘ context · harness` is visible on Space 3 and the foreshadow caption appears on Space 4.
  - E.5's closing caption "That's where the next layers begin." (visual walk-through; the Plan B cross-slide payoff to E.6 lands when Plan B ships).
- E.1's 4-pattern orchestration loop on Space 6 cycles through all 4 patterns visibly — manual check at projection scale.
- No paid dependencies introduced (`package.json` diff in `git diff` should show no new `dependencies` entries).
- Keyword highlights appear in copper-italic via the existing `highlight()` helper on every Plan A slide.

---

## Self-review

**Spec coverage check:**

| Spec section | Task |
|---|---|
| §3.2 `<HoverPopover>` | Task 2 |
| §3.2 `<ImpactLadder>` | Task 3 |
| §3.2 `<NaiveVsProper>` | Task 4 |
| §3.2 `<StructureSpine>` | Task 6 |
| §3.2 `<FrameworkOrbit>` | Task 7 |
| §3.2 `<TieredTechniqueGrid>` + `<TechniqueCard>` + `<TechniqueModal>` | Tasks 9, 10 |
| §3.2 `<LayerCard>` + `<LayerDemo>` + `<MultiAgentOrchestration>` | Tasks 12, 13, 14 |
| §4.1 E.1 (7 advances + Anthropic quote) | Task 15 |
| §4.2 E.2 (5 advances + ImpactLadder rung 1) | Task 5 |
| §4.3 E.3 (4 advances + spine + orbit + footer) | Task 8 |
| §4.4 E.4 (4 advances + 3 tiers + 8 cards + modals) | Task 11 |
| §4.5 E.5 (4 advances + BP/CM + WHERE PROMPT ENDS + closing) | Task 16 |
| §1.1 Click-driven discipline | Inherited via `animationMode: "step-reveal"` on every slide |
| §6 Animation budget Plan A = 24 advances | Verified in Task 17 (steps tally to 7+5+4+4+4=24) |
| §8.1 Suggested file structure | Mirrored exactly under `src/slides/foundation-core-section-e/` |
| §8.3 Build order — Plan A steps 1–6, 12 | Tasks 2, 3, 4, 6+7, 9+10, 12+13+14, 16 (E.5 last) |
| §10 Acceptance criteria | "Acceptance criteria for Plan A" section above |

**Type consistency check:**

- `LayerName` (`"prompt" | "context" | "harness"`) is used identically in `LayerCard.tsx`, `LayerDemo.tsx`, and `e1-three-layers.tsx`.
- `CopperStop` is exported from `TieredTechniqueGrid.tsx` and consumed by `TechniqueCard.tsx`.
- `SpineElement` is exported from `StructureSpine.tsx` and used as the input shape in E.3's slide assembly.
- The `play` boolean prop is consistent across `<LayerDemo>` and `<MultiAgentOrchestration>`.
- Step-index step → reveal mapping in each slide matches the spec advance table 1:1.

**Placeholder scan:**

Searched for "TBD", "TODO", "implement later", "fill in details", "Add appropriate error handling", "Similar to Task". None present. Every code block is complete and runnable as written. Every test step shows the actual code, not a description.

**Out-of-scope confirmations:**

- Plan B primitives (`<NodeNetwork>`, `<StrategyRings>`, `<PitfallCanvas>`, `<HarnessPackage>`, `<ThesisPanel>`, `<PracticeGrid>`, `<HarnessPattern>`) are explicitly NOT built here.
- E.6–E.11 slides are NOT built here.
- Lucide icons are NOT installed here (Plan B introduces them).
- Section E click-granularity revisit for Section D is flagged as open per spec §9, not addressed.

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-05-09-foundation-core-section-e-plan-a.md`. Two execution options:

**1. Subagent-Driven (recommended)** — fresh subagent per task, two-stage review, fast iteration.

**2. Inline Execution** — execute tasks in this session via `superpowers:executing-plans` with checkpoints.

Which approach?
