# Foundation Core — Section E — Plan B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build E.6–E.11 (CONTEXT + HARNESS + bridge arc) of the Berau workshop deck per spec [`docs/specs/2026-05-08-slides-foundation-core-section-e.md`](../specs/2026-05-08-slides-foundation-core-section-e.md), including the remaining primitives (`<NodeNetwork>`, `<StrategyRings>`, `<PitfallCanvas>` + `<PitfallIllustration>`, `<HarnessPackage>`, `<ThesisPanel>`, `<PracticeGrid>` + `<PracticeCard>`, `<HarnessPattern>`).

**Architecture:** Mirror Plan A. Each slide is a self-contained component with a `SlideDef` export under `src/slides/foundation-core-section-e/`. Per-slide step state is read from `useDeck().stepIndex`; auto-timed motion within a step uses Framer Motion. All copy lives in `content.ts`; keyword highlighting flows through the existing `highlight()` helper. Click-driven discipline (one Space press per beat) is enforced by `animationMode="step-reveal"`. The `<HarnessPattern>` primitive is the only new component placed at `src/components/` (global) — every other new primitive lives under the section's `components/` subdir.

**Tech Stack:** React 18 · TypeScript · Vite · Framer Motion 11 · Tailwind CSS 3 · Vitest + RTL · Playwright e2e. **One new runtime dep:** `lucide-react` (MIT, free) for icon glyphs on E.6 satellites, E.8 pitfalls, and E.10 practices.

**Plan B scope:** primitives 7–11 + 13 from spec §8.3 + slides E.6–E.11. Plan A (E.1–E.5 + primitives 1–6) is assumed complete and merged before Plan B starts. If Plan A is not merged, stop and complete it first.

**Total advances delivered by Plan B:** 23 (E.6=4, E.7=5, E.8=4, E.9=5, E.10=3, E.11=2) — the other half of the section's 47 advances. Section E is complete after Plan B ships.

---

## Conventions used by every task

- **Path aliases.** `@/` resolves to `src/`. Use `@/components/...`, `@/deck/...`, `@/slides/foundation-core-section-e/...`.
- **Test runner.** `npm test` runs Vitest unit + integration; `npm run e2e` runs Playwright. Single-test runs: `npx vitest run tests/unit/<file>.test.tsx`.
- **TDD.** Each primitive and each slide gets a `tests/unit/*.test.tsx`. Write the failing test first, run it to confirm the failure mode, then implement.
- **Highlighting copy.** Use `highlight(text, keywords)` from `@/components/highlight` for any string with copper-italic emphasis. Don't hand-wrap `<KeywordHighlight>`.
- **Backgrounds.** Diagrammatic slides use the same plain-dark + dot-grid pattern Plan A uses (radial-gradient at 5% opacity, 24×24px). E.11 is the only photographic one in Plan B — uses `<HeroPhoto>`.
- **Surface = `dark`.** All Plan B slides use `surface: "dark"`. (E.11 stays dark even though it's photographic — `surface` controls Slide.tsx chrome, not the slide content.)
- **`SlideDef.canonicalPose`.** The last step index of the slide (e.g. E.6 has 4 steps → canonicalPose=3).
- **Test IDs.** Stable `data-testid` on every animated/conditional element. Step-conditional elements ALSO carry `data-revealed={String(...)}`.
- **Click-driven discipline.** Section E spec §1.1: one Space click per speaker beat. Internal motion auto-completes; advances require explicit click. The existing `animationMode: "step-reveal"` already enforces this.
- **Free-stack only.** Only one new dep: `lucide-react` (MIT). No paid fonts, no paid components.
- **No emojis** in source code (per project memory). The 🎯/📦/🧠/etc emojis in spec §4.10 are descriptive shorthand only — render Lucide icons in code.
- **Commit style.** Conventional Commits with section scope, e.g. `feat(foundation-core-section-e): ...`. Match `git log --oneline -5`.

---

## File structure (Plan B additions)

```
src/components/
  HarnessPattern.tsx                    # NEW — cross-spec primitive (Section E + I.3)
src/slides/foundation-core-section-e/
  content.ts                            # extended with e6Content..e11Content
  index.ts                              # extended to register E.6..E.11
  e6-context-what-why.tsx               # E.6
  e7-context-strategies.tsx             # E.7
  e8-context-the-wall.tsx               # E.8
  e9-harness-what-why.tsx               # E.9
  e10-harness-practices.tsx             # E.10
  e11-bridge-to-f.tsx                   # E.11
  components/
    NodeNetwork.tsx                     # SIGNATURE — variant + state (E.6/E.8/E.9)
    StrategyRings.tsx                   # E.7 — 4 rings + particle-flow ambient
    PitfallCanvas.tsx                   # E.8 — 30/70 split with morphing canvas
    PitfallIllustration.tsx             # E.8 — 5 variants (default + 4 pitfalls)
    HarnessPackage.tsx                  # E.9 — packaged box + Includes row + arrows
    ThesisPanel.tsx                     # E.9 — equation + Cursor quote + stanza
    PracticeGrid.tsx                    # E.10 — 2×4 grid → 1+7 reflow
    PracticeCard.tsx                    # E.10 — single card (compact + expanded)
```

`tests/unit/` gains one test file per new component + one per slide.

`src/deck/registry.tsx` is updated once at the end (Task 18) to expand the existing E section to all 11 slides.

---

## Pre-flight check (before Task 1)

Confirm Plan A landed:

```bash
git log --oneline | grep "foundation-core-section-e" | head -20
ls src/slides/foundation-core-section-e/
```

Expected: see commits for E.1–E.5 + Plan A primitives. Directory contains `e1-three-layers.tsx`..`e5-prompt-the-wall.tsx`, `content.ts` with `e1Content`..`e5Content`, and `components/` containing `HoverPopover.tsx`, `ImpactLadder.tsx`, `NaiveVsProper.tsx`, `StructureSpine.tsx`, `FrameworkOrbit.tsx`, `LayerCard.tsx`, `LayerDemo.tsx`, `MultiAgentOrchestration.tsx`, `TieredTechniqueGrid.tsx`, `TechniqueCard.tsx`, `TechniqueModal.tsx`.

If Plan A is not present, **stop and run Plan A first.**

---

## Task 1 — Add `lucide-react` dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (npm-managed)
- Test: `tests/unit/lucide-icons-available.test.tsx`

**Spec reference:** §3.3 — Lucide (MIT-licensed, thin-stroke aesthetic) is the icon library for Section E. All icons are 1.5px stroke, copper-300 color, no fill.

Lucide ships as `lucide-react` (a peer-dep-free React component package). MIT license — free-stack-compatible per memory rule.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/lucide-icons-available.test.tsx
import { render } from "@testing-library/react";
import { MessageSquare, Network, Repeat } from "lucide-react";

test("lucide-react renders the 3 icons we depend on most heavily", () => {
  // Smoke-tests E.6 satellite (MessageSquare), E.10 Orchestration (Network),
  // E.10 Ralph Wiggum (Repeat). If lucide-react is missing, the import fails.
  const { container } = render(
    <div>
      <MessageSquare data-testid="i-message-square" />
      <Network data-testid="i-network" />
      <Repeat data-testid="i-repeat" />
    </div>,
  );
  expect(container.querySelectorAll("svg")).toHaveLength(3);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/unit/lucide-icons-available.test.tsx`
Expected: FAIL — `Failed to resolve import "lucide-react"`.

- [ ] **Step 3: Install the dependency**

```bash
npm install lucide-react@^0.469.0
```

After install, confirm `package.json` shows `"lucide-react": "^0.469.0"` under `dependencies`. If npm picks a newer compatible version, that is fine — pin only if you hit a breaking-change issue.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/unit/lucide-icons-available.test.tsx`
Expected: PASS — all 3 SVGs render.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tests/unit/lucide-icons-available.test.tsx
git commit -m "chore(foundation-core-section-e): add lucide-react for Plan B icons"
```

---

## Task 2 — `<NodeNetwork>` primitive (signature)

**Files:**
- Create: `src/slides/foundation-core-section-e/components/NodeNetwork.tsx`
- Test: `tests/unit/NodeNetwork.test.tsx`

**Spec reference:** §3.2 + §8.4. Hub-and-spoke renderer. `variant="context-hub"`. Three states drive cross-slide transformation: `activated` (E.6: bright + clean inward flow + clockwise highlight), `stamped` (E.8: dimmed + STILL MANUAL stamp + chaos arrows), `compressed` (E.9: nodes fold inward into harness package silhouette). Framer Motion `layoutId` per node tweens satellite positions smoothly between states.

This is the **largest Plan B primitive**. Build it with all 3 states wired from day one — adding states later means re-doing the layout math.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/NodeNetwork.test.tsx
import { render, screen } from "@testing-library/react";
import { NodeNetwork } from "@/slides/foundation-core-section-e/components/NodeNetwork";

const SATS = [
  { id: "user-prompt", label: "User Prompt", icon: "MessageSquare" as const },
  { id: "system", label: "System Instructions", icon: "Shield" as const },
  { id: "conv-mem", label: "Conversation Memory", icon: "History" as const },
  { id: "rag", label: "RAG Knowledge Base", icon: "BookOpen" as const },
  { id: "tools", label: "Tools & APIs", icon: "Wrench" as const },
  { id: "persist", label: "Persistent Memory", icon: "Archive" as const },
];

test("NodeNetwork renders 6 satellites + 1 center hub", () => {
  render(<NodeNetwork variant="context-hub" state="activated" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getAllByTestId(/^node-satellite-/)).toHaveLength(6);
  expect(screen.getByTestId("node-hub")).toBeInTheDocument();
});

test("hub label reflects centerNode prop", () => {
  render(<NodeNetwork variant="context-hub" state="activated" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByTestId("node-hub").textContent).toMatch(/CONTEXT/);
});

test("state=stamped exposes data-state and renders the STILL MANUAL stamp", () => {
  render(<NodeNetwork variant="context-hub" state="stamped" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByTestId("node-network-root").getAttribute("data-state")).toBe("stamped");
  expect(screen.getByTestId("node-still-manual-stamp")).toBeInTheDocument();
});

test("state=compressed hides individual satellites and renders harness silhouette", () => {
  render(<NodeNetwork variant="context-hub" state="compressed" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByTestId("node-network-root").getAttribute("data-state")).toBe("compressed");
  // Compressed state: satellites tween toward the center; their data-compressed flag flips.
  for (const s of SATS) {
    expect(screen.getByTestId(`node-satellite-${s.id}`).getAttribute("data-compressed")).toBe("true");
  }
});

test("each satellite renders its label", () => {
  render(<NodeNetwork variant="context-hub" state="activated" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByText("User Prompt")).toBeInTheDocument();
  expect(screen.getByText("Tools & APIs")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/NodeNetwork.test.tsx`
Expected: FAIL — `NodeNetwork` import unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/NodeNetwork.tsx
import { motion } from "framer-motion";
import {
  MessageSquare,
  Shield,
  History,
  BookOpen,
  Wrench,
  Archive,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  MessageSquare,
  Shield,
  History,
  BookOpen,
  Wrench,
  Archive,
};

export type NodeNetworkVariant = "context-hub";
export type NodeNetworkState = "activated" | "stamped" | "compressed";

export interface SatelliteSpec {
  id: string;
  label: string;
  icon: keyof typeof ICONS;
}

interface NodeNetworkProps {
  variant: NodeNetworkVariant;
  state: NodeNetworkState;
  centerNode: string;
  satellites: readonly SatelliteSpec[]; // expect 6 in clockwise order from 12 o'clock
  play: boolean; // ambient on/off (inward flow + clockwise highlight + chaos arrows)
  hoveredSatelliteId?: string | null; // optional: parent can drive hover state
  onSatelliteHover?: (id: string | null) => void;
}

// Hex layout — clockwise from 12 o'clock at 60° intervals.
// Distances expressed in vmin so the layout scales with the slide.
const HEX_ANGLES_DEG = [-90, -30, 30, 90, 150, -150]; // 12, 2, 4, 6, 8, 10 o'clock
const RADIUS_VMIN = 22;

function satellitePosition(i: number, state: NodeNetworkState) {
  const angleRad = (HEX_ANGLES_DEG[i] * Math.PI) / 180;
  const r = state === "compressed" ? RADIUS_VMIN * 0.15 : RADIUS_VMIN;
  return {
    x: Math.cos(angleRad) * r,
    y: Math.sin(angleRad) * r,
  };
}

export function NodeNetwork({
  variant: _variant,
  state,
  centerNode,
  satellites,
  play,
  hoveredSatelliteId = null,
  onSatelliteHover,
}: NodeNetworkProps) {
  const dimmed = state === "stamped";
  const compressed = state === "compressed";

  return (
    <div
      data-testid="node-network-root"
      data-state={state}
      data-play={String(play)}
      className="relative h-full w-full"
    >
      {/* SVG layer — connector lines + ambient particles */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="-50 -50 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {satellites.map((s, i) => {
          const pos = satellitePosition(i, state);
          return (
            <motion.line
              key={`line-${s.id}`}
              data-testid={`node-line-${s.id}`}
              x1={0}
              y1={0}
              x2={pos.x}
              y2={pos.y}
              stroke={dimmed ? "rgb(124 84 56 / 0.35)" : "rgb(184 110 61 / 0.7)"}
              strokeWidth={0.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: compressed ? 0 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}

        {/* Inward-flow ambient (E.6 activated + play) */}
        {state === "activated" && play && satellites.map((s, i) => {
          const pos = satellitePosition(i, state);
          return (
            <motion.circle
              key={`flow-${s.id}`}
              data-testid={`node-flow-${s.id}`}
              r={0.8}
              fill="rgb(212 153 102)"
              initial={{ cx: pos.x, cy: pos.y, opacity: 0 }}
              animate={{ cx: [pos.x, 0], cy: [pos.y, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 3.5,
                ease: "linear",
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          );
        })}

        {/* Chaos arrows ambient (E.8 stamped + play) */}
        {state === "stamped" && play && Array.from({ length: 6 }).map((_, i) => {
          const start = { x: -45 + Math.random() * 90, y: -45 + Math.random() * 90 };
          const end = { x: -45 + Math.random() * 90, y: -45 + Math.random() * 90 };
          return (
            <motion.line
              key={`chaos-${i}`}
              data-testid={`node-chaos-${i}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="rgb(212 153 102 / 0.5)"
              strokeWidth={0.3}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.5 + Math.random(),
                repeatDelay: 1 + Math.random() * 2,
              }}
            />
          );
        })}
      </svg>

      {/* HTML layer — hub + satellites (HTML so labels stay crisp at projection) */}
      <div className="absolute inset-0">
        {/* Hub */}
        <motion.div
          data-testid="node-hub"
          layoutId="node-network-hub"
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border ${
            compressed
              ? "border-copper-300 bg-copper-200/10"
              : dimmed
                ? "border-copper-700 bg-copper-900/30"
                : "border-copper-100 bg-copper-200/15"
          }`}
          style={{
            width: compressed ? "28vmin" : "14vmin",
            height: compressed ? "10vmin" : "7vmin",
            padding: "1vmin 1.5vmin",
          }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.5rem)", letterSpacing: "0.04em" }}
          >
            {compressed ? "HARNESS" : centerNode}
          </span>
          {compressed && (
            <span
              className="font-serif italic text-neutral-200"
              style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.95rem)" }}
            >
              Automates context engineering
            </span>
          )}
        </motion.div>

        {/* STILL MANUAL stamp on stamped state */}
        {state === "stamped" && (
          <motion.div
            data-testid="node-still-manual-stamp"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-2 border-copper-300 bg-neutral-950/70 px-3 py-1 font-mono uppercase tracking-[0.18em] text-copper-200"
            style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.95rem)" }}
            initial={{ scale: 1.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            STILL MANUAL
          </motion.div>
        )}

        {/* Satellites */}
        {satellites.map((s, i) => {
          const pos = satellitePosition(i, state);
          const Icon = ICONS[s.icon];
          const hovered = hoveredSatelliteId === s.id;
          return (
            <motion.div
              key={s.id}
              data-testid={`node-satellite-${s.id}`}
              data-compressed={String(compressed)}
              layoutId={`node-network-sat-${s.id}`}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 border bg-neutral-950/80 px-3 py-2 ${
                dimmed
                  ? "border-copper-800 opacity-70"
                  : hovered
                    ? "border-copper-300"
                    : "border-copper-700"
              }`}
              style={{
                left: `calc(50% + ${pos.x}vmin)`,
                top: `calc(50% + ${pos.y}vmin)`,
                width: compressed ? "0vmin" : "11vmin",
                opacity: compressed ? 0 : undefined,
              }}
              animate={{ opacity: compressed ? 0 : dimmed ? 0.7 : 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => onSatelliteHover?.(s.id)}
              onMouseLeave={() => onSatelliteHover?.(null)}
            >
              {Icon && (
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className="text-copper-300"
                  aria-hidden
                />
              )}
              <span
                className="text-center font-mono text-neutral-100"
                style={{
                  fontSize: "clamp(0.65rem, 0.85vw, 0.85rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.15,
                }}
              >
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/NodeNetwork.test.tsx`
Expected: PASS — five assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/NodeNetwork.tsx tests/unit/NodeNetwork.test.tsx
git commit -m "feat(foundation-core-section-e): add NodeNetwork signature primitive"
```

---

## Task 3 — E.6 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e6-context-what-why.tsx`
- Test: `tests/unit/e6-context-what-why.test.tsx`

**Spec reference:** §4.6. 4 advances + continuous ambient. Layout: center-stage hub-and-spoke + left gutter (~25%) for definition + analogy + footer ImpactLadder rung 2.

- [ ] **Step 1: Append E.6 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e6Content = {
  headline: "Layer 2: Context — relevance.",
  headlineKeywords: ["Context"] as const,
  subHeadline: "6 components — the full context the model can see.",
  subHeadlineKeywords: ["6 components"] as const,
  definition: "Context = filling the model's window with just the right information — for each step.",
  definitionKeywords: ["right information"] as const,
  analogy: "Like hiring an expert with amnesia — capable, but useless without context.",
  analogyKeywords: ["amnesia"] as const,
  satellites: [
    {
      id: "user-prompt",
      label: "User Prompt",
      icon: "MessageSquare" as const,
      popoverLines: [
        "The instructions you just spent four slides on.",
        "Includes the output format spec — that lives inside the prompt itself.",
        "One of six components — not the only one.",
      ],
    },
    {
      id: "conv-mem",
      label: "Conversation Memory",
      icon: "History" as const,
      popoverLines: [
        "Short-term — what was said earlier in this session.",
        "Episodic memory. Resets when session ends.",
      ],
    },
    {
      id: "rag",
      label: "RAG Knowledge Base",
      icon: "BookOpen" as const,
      popoverLines: [
        "Retrieved documents pulled in for this specific question.",
        "Retrieval-Augmented Generation.",
      ],
    },
    {
      id: "tools",
      label: "Tools & APIs",
      icon: "Wrench" as const,
      popoverLines: [
        "Actions the model can take in the world — call a function, query a database, fetch live data.",
      ],
    },
    {
      id: "persist",
      label: "Persistent Memory",
      icon: "Archive" as const,
      popoverLines: [
        "Long-term — what the model remembers across sessions.",
        "Semantic + Episodic memory. Last week's conversation informs this week's.",
      ],
    },
    {
      id: "system",
      label: "System Instructions",
      icon: "Shield" as const,
      popoverLines: [
        "The persistent rules — who the model is, what it can or can't do, what tone to use.",
        "Procedural memory.",
      ],
    },
  ],
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e6-context-what-why.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E6ContextWhatWhy, e6Slide } from "@/slides/foundation-core-section-e/e6-context-what-why";

test("E.6 declares 4 steps with canonicalPose=3", () => {
  expect(e6Slide.steps).toBe(4);
  expect(e6Slide.canonicalPose).toBe(3);
  expect(e6Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.6 at canonicalPose renders FIG label, hub, 6 satellites, definition, ladder rung 2 lit", () => {
  render(
    <DeckProvider stepCounts={[e6Slide.steps]}>
      <AdvanceTo step={e6Slide.canonicalPose} />
      <E6ContextWhatWhy />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.6 · CONTEXT/)).toBeInTheDocument();
  expect(screen.getByTestId("node-hub")).toBeInTheDocument();
  expect(screen.getAllByTestId(/^node-satellite-/)).toHaveLength(6);
  expect(screen.getByText(/right information/)).toBeInTheDocument();
  expect(screen.getByText(/amnesia/)).toBeInTheDocument();
  expect(screen.getByTestId("impact-rung-1").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-2").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-3").getAttribute("data-lit")).toBe("false");
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e6-context-what-why.test.tsx`
Expected: FAIL — slide module unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e6-context-what-why.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NodeNetwork } from "./components/NodeNetwork";
import { ImpactLadder } from "./components/ImpactLadder";
import { e6Content as C } from "./content";

export function E6ContextWhatWhy() {
  const { stepIndex } = useDeck();
  // Spec §4.6 motion table:
  // Space 1 — hub + first satellite (User Prompt) + connector
  // Space 2 — remaining 5 satellites stagger in
  // Space 3 — left gutter definition + analogy
  // Space 4 — ladder rung 2 lights + ambient begins
  const showHub = stepIndex >= 0;
  const _showFirstSat = stepIndex >= 0;
  const showAllSats = stepIndex >= 1;
  const showGutter = stepIndex >= 2;
  const ambientOn = stepIndex >= 3;
  const rung2Lit = stepIndex >= 3;

  // Reveal one or six satellites depending on step.
  const revealedSats = showAllSats ? C.satellites : C.satellites.slice(0, 1);

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
      <FigLabel section="E" num={6} label="CONTEXT" />

      <div className="relative z-10 mx-auto grid h-full max-w-[92vw] grid-cols-[25fr_75fr] gap-10 px-12 py-20">
        {/* LEFT GUTTER — definition + analogy (Space 3) */}
        <motion.div
          className="flex flex-col justify-center gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showGutter ? 1 : 0, y: showGutter ? 0 : 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", lineHeight: 1.1 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>
          <p
            className="font-serif text-neutral-100"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.3 }}
          >
            {highlight(C.subHeadline, C.subHeadlineKeywords)}
          </p>
          <p
            className="font-serif text-neutral-100"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.25rem)", lineHeight: 1.4 }}
          >
            {highlight(C.definition, C.definitionKeywords)}
          </p>
          <p
            className="font-serif italic text-neutral-300"
            style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.1rem)", lineHeight: 1.4 }}
          >
            {highlight(C.analogy, C.analogyKeywords)}
          </p>
        </motion.div>

        {/* RIGHT — NodeNetwork */}
        <div className="relative">
          {showHub && (
            <NodeNetwork
              variant="context-hub"
              state="activated"
              centerNode="CONTEXT"
              satellites={revealedSats}
              play={ambientOn}
            />
          )}
        </div>
      </div>

      {/* FOOTER — ImpactLadder */}
      <div className="absolute bottom-8 left-1/2 z-10 w-[80vw] -translate-x-1/2">
        <ImpactLadder rungs={3} currentRung={rung2Lit ? 2 : 1} />
      </div>
    </div>
  );
}

export const e6Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <E6ContextWhatWhy />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e6-context-what-why.test.tsx`
Expected: PASS — two assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e6-context-what-why.tsx tests/unit/e6-context-what-why.test.tsx
git commit -m "feat(foundation-core-section-e): add E.6 CONTEXT — what & why slide"
```

---

## Task 4 — `<StrategyRings>` primitive + particle-flow ambient

**Files:**
- Create: `src/slides/foundation-core-section-e/components/StrategyRings.tsx`
- Test: `tests/unit/StrategyRings.test.tsx`

**Spec reference:** §3.2 + §4.7 + §8.6. 4 horizontal flat ring tiles (Write/Select/Compress/Isolate) with progressive copper saturation + arrow connectors. Continuous particle-flow ambient with per-ring kinetic behavior: WRITE pauses, SELECT filters ~30%, COMPRESS merges, ISOLATE splits.

For unit-test scope, the per-ring kinetic behavior is asserted via `data-kinetic` attribute on each ring. The actual particle-merge / particle-split behavior is visual-only and validated at projection time (per spec §8.6 — "All implemented with Framer Motion + SVG; no canvas, no WebGL").

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/StrategyRings.test.tsx
import { render, screen } from "@testing-library/react";
import { StrategyRings } from "@/slides/foundation-core-section-e/components/StrategyRings";

const RINGS = [
  { id: "write", label: "WRITE", subHeadline: "Store data for future use", subList: ["Long-term memory", "Scratchpad", "Session state"], copper: "copper-700" as const, kinetic: "pause" as const },
  { id: "select", label: "SELECT", subHeadline: "Choose data needed for the task", subList: ["Retrieve tools", "Retrieve scratchpad", "Retrieve memory", "Retrieve knowledge"], copper: "copper-600" as const, kinetic: "filter" as const },
  { id: "compress", label: "COMPRESS", subHeadline: "Summarize past events efficiently", subList: ["Summarize", "Trim irrelevant tokens"], copper: "copper-500" as const, kinetic: "merge" as const },
  { id: "isolate", label: "ISOLATE", subHeadline: "Separate tasks to avoid interference", subList: ["Partition state", "Sandbox", "Multi-agent"], copper: "copper-400" as const, kinetic: "split" as const },
];

test("StrategyRings renders 4 rings", () => {
  render(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={false} />);
  expect(screen.getAllByTestId(/^strategy-ring-/)).toHaveLength(4);
});

test("revealedThrough gates which rings are visible", () => {
  render(<StrategyRings rings={RINGS} revealedThrough={2} ambientOn={false} />);
  expect(screen.getByTestId("strategy-ring-write").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-select").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-compress").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("strategy-ring-isolate").getAttribute("data-revealed")).toBe("false");
});

test("each ring exposes its kinetic behavior via data-kinetic", () => {
  render(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={false} />);
  expect(screen.getByTestId("strategy-ring-write").getAttribute("data-kinetic")).toBe("pause");
  expect(screen.getByTestId("strategy-ring-select").getAttribute("data-kinetic")).toBe("filter");
  expect(screen.getByTestId("strategy-ring-compress").getAttribute("data-kinetic")).toBe("merge");
  expect(screen.getByTestId("strategy-ring-isolate").getAttribute("data-kinetic")).toBe("split");
});

test("ambient layer mounts only when ambientOn=true", () => {
  const { rerender } = render(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={false} />);
  expect(screen.queryByTestId("strategy-ambient-layer")).toBeNull();
  rerender(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={true} />);
  expect(screen.getByTestId("strategy-ambient-layer")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/StrategyRings.test.tsx`
Expected: FAIL — `StrategyRings` import unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/StrategyRings.tsx
import { motion } from "framer-motion";

export type StrategyKinetic = "pause" | "filter" | "merge" | "split";
export type StrategyCopper = "copper-400" | "copper-500" | "copper-600" | "copper-700";

export interface StrategyRing {
  id: string;
  label: string;
  subHeadline: string;
  subList: readonly string[];
  copper: StrategyCopper;
  kinetic: StrategyKinetic;
}

interface StrategyRingsProps {
  rings: readonly StrategyRing[]; // expect 4
  revealedThrough: number; // 0..4
  ambientOn: boolean;
}

const LABEL_COLOR: Record<StrategyCopper, string> = {
  "copper-400": "text-copper-400",
  "copper-500": "text-copper-500",
  "copper-600": "text-copper-600",
  "copper-700": "text-copper-700",
};

const ANNULUS_COLOR: Record<StrategyCopper, string> = {
  "copper-400": "stroke-copper-400",
  "copper-500": "stroke-copper-500",
  "copper-600": "stroke-copper-600",
  "copper-700": "stroke-copper-700",
};

export function StrategyRings({ rings, revealedThrough, ambientOn }: StrategyRingsProps) {
  return (
    <div className="relative flex w-full items-stretch gap-2">
      {rings.map((r, i) => {
        const revealed = i < revealedThrough;
        return (
          <div key={r.id} className="flex flex-1 items-center">
            <motion.div
              data-testid={`strategy-ring-${r.id}`}
              data-revealed={String(revealed)}
              data-kinetic={r.kinetic}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.85 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-1 flex-col items-center gap-3 border border-copper-800 bg-neutral-950/60 p-4"
            >
              <span
                className={`font-mono uppercase tracking-[0.2em] ${LABEL_COLOR[r.copper]}`}
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)" }}
              >
                {r.label}
              </span>
              <svg viewBox="-50 -50 100 100" className="h-20 w-20">
                <circle
                  cx={0}
                  cy={0}
                  r={36}
                  fill="none"
                  strokeWidth={6}
                  className={ANNULUS_COLOR[r.copper]}
                />
              </svg>
              <span
                className="text-center font-serif italic text-neutral-300"
                style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.3 }}
              >
                {r.subHeadline}
              </span>
              <ul className="flex flex-col items-center gap-1">
                {r.subList.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-copper-300"
                    style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            {i < rings.length - 1 && (
              <span
                aria-hidden
                className="mx-1 font-mono text-copper-700"
                style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.6rem)" }}
              >
                →
              </span>
            )}
          </div>
        );
      })}

      {ambientOn && <ParticleAmbient rings={rings} />}
    </div>
  );
}

// Per-ring kinetic behavior: WRITE pauses (long delay middle of span),
// SELECT filters (~30% of particles fade out), COMPRESS merges (paired
// particles converge), ISOLATE splits (output expands). For unit-test
// scope, the visual behavior is approximated via per-particle delay +
// scale variation; the visceral effect is tuned at projection time.
function ParticleAmbient({ rings: _rings }: { rings: readonly StrategyRing[] }) {
  const PARTICLES = 10;
  return (
    <div
      data-testid="strategy-ambient-layer"
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        {Array.from({ length: PARTICLES }).map((_, i) => {
          const filtered = i % 3 === 0; // ~33% filtered at SELECT
          return (
            <motion.circle
              key={i}
              r={0.6}
              fill="rgb(212 153 102)"
              cy={50}
              initial={{ cx: 0, opacity: 0 }}
              animate={{
                cx: filtered ? [0, 35, 35] : [0, 25, 50, 75, 100],
                opacity: filtered ? [0, 1, 0] : [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: filtered ? 3 : 6,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/StrategyRings.test.tsx`
Expected: PASS — four assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/StrategyRings.tsx tests/unit/StrategyRings.test.tsx
git commit -m "feat(foundation-core-section-e): add StrategyRings primitive"
```

---

## Task 5 — E.7 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e7-context-strategies.tsx`
- Test: `tests/unit/e7-context-strategies.test.tsx`

**Spec reference:** §4.7. 5 advances + continuous particle-flow ambient (begins at Space 5). Layout: 4 horizontal ring tiles + arrow connectors. Footer caption.

- [ ] **Step 1: Append E.7 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e7Content = {
  headline: "Four strategies. Each one solves a context problem.",
  headlineKeywords: ["Each one solves a context problem"] as const,
  footerCaption: "When context grows, these four keep it useful.",
  footerCaptionKeywords: ["keep it useful"] as const,
  rings: [
    {
      id: "write",
      label: "WRITE",
      subHeadline: "Store data for future use",
      subList: ["Long-term memory", "Scratchpad", "Session state"],
      copper: "copper-700" as const,
      kinetic: "pause" as const,
      popoverLines: [
        "Save what you'll need later.",
        "For your weekly report: this week's draft saves into long-term memory so next week's task can reference it.",
      ],
    },
    {
      id: "select",
      label: "SELECT",
      subHeadline: "Choose data needed for the task",
      subList: ["Retrieve tools", "Retrieve scratchpad", "Retrieve memory", "Retrieve knowledge"],
      copper: "copper-600" as const,
      kinetic: "filter" as const,
      popoverLines: [
        "Pull only what's relevant now.",
        "For 'this Friday's report' fetch the last 7 days of activity, not the last year.",
      ],
    },
    {
      id: "compress",
      label: "COMPRESS",
      subHeadline: "Summarize past events efficiently",
      subList: ["Summarize", "Trim irrelevant tokens"],
      copper: "copper-500" as const,
      kinetic: "merge" as const,
      popoverLines: [
        "Summarize the past so it fits.",
        "Replace 12 prior weekly reports with a single trend-summary that fits the context window.",
      ],
    },
    {
      id: "isolate",
      label: "ISOLATE",
      subHeadline: "Separate tasks to avoid interference",
      subList: ["Partition state", "Sandbox", "Multi-agent"],
      copper: "copper-400" as const,
      kinetic: "split" as const,
      popoverLines: [
        "Keep tasks from polluting each other.",
        "The drafting task and the verification task each get their own context — no cross-contamination.",
      ],
    },
  ],
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e7-context-strategies.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E7ContextStrategies, e7Slide } from "@/slides/foundation-core-section-e/e7-context-strategies";

test("E.7 declares 5 steps with canonicalPose=4", () => {
  expect(e7Slide.steps).toBe(5);
  expect(e7Slide.canonicalPose).toBe(4);
  expect(e7Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.7 at canonicalPose renders 4 rings, footer caption, ambient on", () => {
  render(
    <DeckProvider stepCounts={[e7Slide.steps]}>
      <AdvanceTo step={e7Slide.canonicalPose} />
      <E7ContextStrategies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.7 · STRATEGIES/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^strategy-ring-/)).toHaveLength(4);
  expect(screen.getByText(/keep it useful/)).toBeInTheDocument();
  expect(screen.getByTestId("strategy-ambient-layer")).toBeInTheDocument();
});

test("E.7 reveals rings progressively across Spaces 1-4", () => {
  render(
    <DeckProvider stepCounts={[e7Slide.steps]}>
      <AdvanceTo step={1} />
      <E7ContextStrategies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByTestId("strategy-ring-write").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-select").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-compress").getAttribute("data-revealed")).toBe("false");
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e7-context-strategies.test.tsx`
Expected: FAIL — slide module unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e7-context-strategies.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { StrategyRings } from "./components/StrategyRings";
import { e7Content as C } from "./content";

export function E7ContextStrategies() {
  const { stepIndex } = useDeck();
  // Spec §4.7: Space 1 WRITE; Space 2 SELECT; Space 3 COMPRESS; Space 4 ISOLATE; Space 5 footer caption + ambient ramp-up.
  const revealedThrough =
    stepIndex >= 3 ? 4 : stepIndex >= 2 ? 3 : stepIndex >= 1 ? 2 : 1;
  const showFooter = stepIndex >= 4;
  const ambientOn = stepIndex >= 4;

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
      <FigLabel section="E" num={7} label="STRATEGIES" />

      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col items-stretch justify-center gap-12 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <StrategyRings
          rings={C.rings}
          revealedThrough={revealedThrough}
          ambientOn={ambientOn}
        />

        <motion.p
          className="text-center font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showFooter ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.footerCaption, C.footerCaptionKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e7Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <E7ContextStrategies />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e7-context-strategies.test.tsx`
Expected: PASS — three assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e7-context-strategies.tsx tests/unit/e7-context-strategies.test.tsx
git commit -m "feat(foundation-core-section-e): add E.7 CONTEXT — strategies slide"
```

---

## Task 6 — `<PitfallIllustration>` primitive (5 variants)

**Files:**
- Create: `src/slides/foundation-core-section-e/components/PitfallIllustration.tsx`
- Test: `tests/unit/PitfallIllustration.test.tsx`

**Spec reference:** §3.2 + §4.8. Per-pitfall animated illustration component. Each variant is a self-contained SVG + Framer Motion piece (~340×280px). Variants: `default` (renders the `<NodeNetwork state="stamped">` with chaos arrows), `conflict` (Venn collision), `confusion` (iceberg), `poisoning` (infection spread), `distraction` (dumb zone graph).

For unit-test scope, each variant needs a stable `data-kind` attribute and a recognizable text element. Visual fidelity is validated at projection time per spec §10.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/PitfallIllustration.test.tsx
import { render, screen } from "@testing-library/react";
import { PitfallIllustration } from "@/slides/foundation-core-section-e/components/PitfallIllustration";

test("PitfallIllustration default kind renders the default canvas wrapper", () => {
  render(<PitfallIllustration kind="default" />);
  expect(screen.getByTestId("pitfall-illustration").getAttribute("data-kind")).toBe("default");
});

test("conflict variant exposes the Venn frozen-overlap caption", () => {
  render(<PitfallIllustration kind="conflict" />);
  expect(screen.getByTestId("pitfall-illustration").getAttribute("data-kind")).toBe("conflict");
  expect(screen.getByText(/commits early/)).toBeInTheDocument();
});

test("confusion variant exposes the iceberg caption", () => {
  render(<PitfallIllustration kind="confusion" />);
  expect(screen.getByText(/what you wanted/i)).toBeInTheDocument();
});

test("poisoning variant exposes the compounds caption", () => {
  render(<PitfallIllustration kind="poisoning" />);
  expect(screen.getByText(/compounds/)).toBeInTheDocument();
});

test("distraction variant exposes the dumb-zone caption", () => {
  render(<PitfallIllustration kind="distraction" />);
  expect(screen.getByText(/dumb zone/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/PitfallIllustration.test.tsx`
Expected: FAIL — `PitfallIllustration` import unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/PitfallIllustration.tsx
import { motion } from "framer-motion";
import { highlight } from "@/components/highlight";

export type PitfallKind = "default" | "conflict" | "confusion" | "poisoning" | "distraction";

interface PitfallIllustrationProps {
  kind: PitfallKind;
}

export function PitfallIllustration({ kind }: PitfallIllustrationProps) {
  return (
    <div
      data-testid="pitfall-illustration"
      data-kind={kind}
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-8"
    >
      {kind === "default" && <DefaultCanvas />}
      {kind === "conflict" && <ConflictCanvas />}
      {kind === "confusion" && <ConfusionCanvas />}
      {kind === "poisoning" && <PoisoningCanvas />}
      {kind === "distraction" && <DistractionCanvas />}
    </div>
  );
}

function DefaultCanvas() {
  // The default canvas in E.8 is the NodeNetwork stamped state — but the
  // slide composes that directly. This component is a fallback empty
  // placeholder so the morphing-canvas API still has a "default" branch.
  return (
    <p
      className="font-serif italic text-neutral-400"
      style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.1rem)" }}
    >
      Hover a pitfall →
    </p>
  );
}

function Caption({ text, keywords, mitigatedBy }: {
  text: string;
  keywords: readonly string[];
  mitigatedBy: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p
        className="font-serif italic text-neutral-100"
        style={{ fontSize: "clamp(1rem, 1.3vw, 1.3rem)", lineHeight: 1.4 }}
      >
        {highlight(text, keywords)}
      </p>
      <p
        className="font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.9rem)" }}
      >
        Mitigated by → {mitigatedBy}
      </p>
    </div>
  );
}

function ConflictCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        <motion.circle
          cx={-12} cy={0} r={20}
          fill="rgb(124 84 56 / 0.4)"
          stroke="rgb(124 84 56)"
          strokeWidth={0.6}
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx={12} cy={0} r={20}
          fill="rgb(212 153 102 / 0.4)"
          stroke="rgb(212 153 102)"
          strokeWidth={0.6}
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <text
          x={0} y={0}
          textAnchor="middle"
          fill="rgb(212 153 102)"
          fontSize={5}
          fontFamily="JetBrains Mono"
        >
          ❄ FROZEN
        </text>
        <text x={-25} y={-25} fill="rgb(124 84 56)" fontSize={3.5} fontFamily="JetBrains Mono">Source A</text>
        <text x={20} y={-25} fill="rgb(212 153 102)" fontSize={3.5} fontFamily="JetBrains Mono">Source B</text>
      </svg>
      <Caption
        text="Sources contradict. Model commits early — and can't recover."
        keywords={["commits early"]}
        mitigatedBy="Context Isolation · Versioned Context"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: pasting Q3 and Q4 figures into the same chat — model averages them, picks neither cleanly.
      </p>
    </>
  );
}

function ConfusionCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        {/* Waterline */}
        <line x1={-50} y1={-8} x2={50} y2={-8} stroke="rgb(212 153 102 / 0.5)" strokeWidth={0.4} strokeDasharray="2 2" />
        {/* Tip above water */}
        <polygon points="-6,-8 6,-8 0,-22" fill="rgb(212 153 102 / 0.7)" />
        {/* Mass below water */}
        <motion.polygon
          points="-22,-8 22,-8 12,18 -12,18"
          fill="rgb(124 84 56 / 0.5)"
          initial={{ y: -4 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        />
        <text x={0} y={-18} textAnchor="middle" fill="rgb(229 199 159)" fontSize={3} fontFamily="JetBrains Mono">What you wanted</text>
        <text x={0} y={0} textAnchor="middle" fill="rgb(124 84 56)" fontSize={2.5} fontFamily="JetBrains Mono">Irrelevant Information</text>
        <text x={0} y={6} textAnchor="middle" fill="rgb(124 84 56)" fontSize={2.5} fontFamily="JetBrains Mono">Tool Overload</text>
        <text x={0} y={12} textAnchor="middle" fill="rgb(124 84 56)" fontSize={2.5} fontFamily="JetBrains Mono">Cognitive Overload</text>
      </svg>
      <Caption
        text="Most of the context isn't what you wanted."
        keywords={["what you wanted"]}
        mitigatedBy="Tool Loadout · Context Pruning"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: pasting a 50-page report 'just in case' — model misses the 3 things that mattered.
      </p>
    </>
  );
}

function PoisoningCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        <rect x={-30} y={-25} width={60} height={20} fill="rgb(212 153 102 / 0.18)" stroke="rgb(212 153 102)" strokeWidth={0.4} />
        <rect x={-30} y={5} width={60} height={20} fill="rgb(124 84 56 / 0.3)" stroke="rgb(124 84 56)" strokeWidth={0.4} />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={i}
            r={1.2}
            cy={-15}
            cx={-25 + i * 7}
            fill="rgb(229 199 159)"
            initial={{ cy: -15, fill: "rgb(229 199 159)" }}
            animate={{ cy: [-15, 15], fill: ["rgb(229 199 159)", "rgb(168 90 60)"] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "linear" }}
          />
        ))}
        <text x={0} y={-26} textAnchor="middle" fill="rgb(229 199 159)" fontSize={3} fontFamily="JetBrains Mono">Clean</text>
        <text x={0} y={20} textAnchor="middle" fill="rgb(124 84 56)" fontSize={3} fontFamily="JetBrains Mono">Corrupted</text>
      </svg>
      <Caption
        text="Wrong or vague info compounds silently."
        keywords={["compounds"]}
        mitigatedBy="Subagent Verification · Context Quarantine"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: pasted last quarter's budget by mistake — AI keeps using it through edits; final memo ships off by 30%.
      </p>
    </>
  );
}

function DistractionCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        {/* Token-fill bar */}
        <rect x={-40} y={15} width={80} height={6} fill="rgb(212 153 102 / 0.15)" stroke="rgb(212 153 102 / 0.5)" strokeWidth={0.3} />
        <motion.rect
          x={-40} y={15} height={6}
          fill="rgb(212 153 102 / 0.6)"
          initial={{ width: 10 }}
          animate={{ width: 80 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeIn" }}
        />
        {/* Performance line */}
        <motion.path
          d="M-40,-15 Q-10,-20 0,-10 T40,15"
          fill="none"
          stroke="rgb(229 199 159)"
          strokeWidth={0.6}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Dumb-zone block */}
        <rect x={20} y={5} width={20} height={12} fill="rgb(168 90 60 / 0.35)" />
        <text x={30} y={12} textAnchor="middle" fill="rgb(229 199 159)" fontSize={3} fontFamily="JetBrains Mono">THE DUMB ZONE</text>
      </svg>
      <Caption
        text='Tokens compound. Performance degrades into the dumb zone.'
        keywords={["dumb zone"]}
        mitigatedBy="Summarization · Context Offloading"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: after ~20 rounds of edits in one chat — answers start repeating, recent corrections get missed.
      </p>
    </>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/PitfallIllustration.test.tsx`
Expected: PASS — five assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/PitfallIllustration.tsx tests/unit/PitfallIllustration.test.tsx
git commit -m "feat(foundation-core-section-e): add PitfallIllustration variants"
```

---

## Task 7 — `<PitfallCanvas>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/PitfallCanvas.tsx`
- Test: `tests/unit/PitfallCanvas.test.tsx`

**Spec reference:** §3.2 + §4.8 + §8.7. 30/70 split-screen primitive with morphing right canvas. Hover left item → right canvas morphs to that item's animated illustration via cross-fade. Releasing hover returns to default illustration. Structural rhyme with I.3's `<HarnessCanvas>`.

This primitive renders the **right-side morphing canvas only**. The left-side pitfall list is composed by the slide itself (E.8) — the canvas is decoupled so the slide drives `activeKind` from its own hover state.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/PitfallCanvas.test.tsx
import { render, screen } from "@testing-library/react";
import { PitfallCanvas } from "@/slides/foundation-core-section-e/components/PitfallCanvas";

test("PitfallCanvas defaults to rendering the slide-provided default illustration", () => {
  render(<PitfallCanvas activeKind={null} defaultIllustration={<div data-testid="net-fallback" />} />);
  expect(screen.getByTestId("net-fallback")).toBeInTheDocument();
});

test("PitfallCanvas renders the activeKind illustration when set", () => {
  render(<PitfallCanvas activeKind="conflict" defaultIllustration={<div data-testid="net-fallback" />} />);
  expect(screen.getByTestId("pitfall-illustration").getAttribute("data-kind")).toBe("conflict");
});

test("PitfallCanvas exposes data-active for testing", () => {
  const { rerender } = render(<PitfallCanvas activeKind={null} defaultIllustration={<div />} />);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("default");
  rerender(<PitfallCanvas activeKind="poisoning" defaultIllustration={<div />} />);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("poisoning");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/PitfallCanvas.test.tsx`
Expected: FAIL — `PitfallCanvas` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/PitfallCanvas.tsx
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { PitfallIllustration, type PitfallKind } from "./PitfallIllustration";

interface PitfallCanvasProps {
  activeKind: PitfallKind | null;
  defaultIllustration: ReactNode;
}

export function PitfallCanvas({ activeKind, defaultIllustration }: PitfallCanvasProps) {
  const showDefault = activeKind === null;
  return (
    <div
      data-testid="pitfall-canvas"
      data-active={activeKind ?? "default"}
      className="relative h-full w-full"
    >
      <AnimatePresence mode="wait">
        {showDefault ? (
          <motion.div
            key="default"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            {defaultIllustration}
          </motion.div>
        ) : (
          <motion.div
            key={activeKind}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <PitfallIllustration kind={activeKind} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/PitfallCanvas.test.tsx`
Expected: PASS — three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/PitfallCanvas.tsx tests/unit/PitfallCanvas.test.tsx
git commit -m "feat(foundation-core-section-e): add PitfallCanvas primitive"
```

---

## Task 8 — E.8 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e8-context-the-wall.tsx`
- Test: `tests/unit/e8-context-the-wall.test.tsx`

**Spec reference:** §4.8. 4 advances + chaos-arrows ambient + hover-canvas-morph. Layout: 30/70 split. Left = 4 pitfall items with Lucide icons. Right = `<PitfallCanvas>` (default state shows `<NodeNetwork state="stamped">` from E.6 carry-over).

- [ ] **Step 1: Append E.8 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e8Content = {
  headline: "Context works. But you're orchestrating it every session.",
  headlineKeywords: ["you're orchestrating it"] as const,
  pitfalls: [
    {
      id: "conflict",
      icon: "GitMerge" as const,
      title: "CONTEXT CONFLICT",
      essence: "Sources contradict → cognitive gridlock",
    },
    {
      id: "confusion",
      icon: "Triangle" as const,
      title: "CONTEXT CONFUSION",
      essence: "Tools + noise + cognitive overload",
    },
    {
      id: "poisoning",
      icon: "Droplets" as const,
      title: "CONTEXT POISONING",
      essence: "Wrong info spreads silently",
    },
    {
      id: "distraction",
      icon: "TrendingDown" as const,
      title: "CONTEXT DISTRACTION",
      essence: "Token overload → the 'dumb zone'",
    },
  ],
  // Same satellites as E.6 — used to render the stamped NodeNetwork as default canvas.
  satellites: [
    { id: "user-prompt", label: "User Prompt", icon: "MessageSquare" as const },
    { id: "conv-mem", label: "Conversation Memory", icon: "History" as const },
    { id: "rag", label: "RAG Knowledge Base", icon: "BookOpen" as const },
    { id: "tools", label: "Tools & APIs", icon: "Wrench" as const },
    { id: "persist", label: "Persistent Memory", icon: "Archive" as const },
    { id: "system", label: "System Instructions", icon: "Shield" as const },
  ],
  footerCaption: "Each session, you fight all of this. There's a better way.",
  footerCaptionKeywords: ["you", "better way"] as const,
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e8-context-the-wall.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E8ContextTheWall, e8Slide } from "@/slides/foundation-core-section-e/e8-context-the-wall";

test("E.8 declares 4 steps with canonicalPose=3", () => {
  expect(e8Slide.steps).toBe(4);
  expect(e8Slide.canonicalPose).toBe(3);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.8 at canonicalPose renders 4 pitfalls + stamped network + footer", () => {
  render(
    <DeckProvider stepCounts={[e8Slide.steps]}>
      <AdvanceTo step={e8Slide.canonicalPose} />
      <E8ContextTheWall />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.8 · STILL MANUAL/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^pitfall-item-/)).toHaveLength(4);
  expect(screen.getByTestId("node-network-root").getAttribute("data-state")).toBe("stamped");
  expect(screen.getByText(/better way/)).toBeInTheDocument();
});

test("hover on a pitfall item morphs the canvas to that pitfall's illustration", () => {
  render(
    <DeckProvider stepCounts={[e8Slide.steps]}>
      <AdvanceTo step={e8Slide.canonicalPose} />
      <E8ContextTheWall />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  fireEvent.mouseEnter(screen.getByTestId("pitfall-item-conflict"));
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("conflict");

  fireEvent.mouseLeave(screen.getByTestId("pitfall-item-conflict"));
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("default");
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e8-context-the-wall.test.tsx`
Expected: FAIL — slide unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e8-context-the-wall.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { GitMerge, Triangle, Droplets, TrendingDown, type LucideIcon } from "lucide-react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NodeNetwork } from "./components/NodeNetwork";
import { PitfallCanvas } from "./components/PitfallCanvas";
import { type PitfallKind } from "./components/PitfallIllustration";
import { e8Content as C } from "./content";

const PITFALL_ICONS: Record<string, LucideIcon> = {
  GitMerge,
  Triangle,
  Droplets,
  TrendingDown,
};

export function E8ContextTheWall() {
  const { stepIndex } = useDeck();
  // Spec §4.8 motion table:
  // Space 1 — network returns from E.6 (carry-over), STILL MANUAL stamp lands, chaos arrows ambient begins
  // Space 2 — pitfalls 1–2 reveal (Conflict + Confusion)
  // Space 3 — pitfalls 3–4 reveal (Poisoning + Distraction)
  // Space 4 — footer caption fades in
  const showCanvas = stepIndex >= 0;
  const ambientOn = stepIndex >= 0;
  const pitfallsRevealedThrough = stepIndex >= 2 ? 4 : stepIndex >= 1 ? 2 : 0;
  const showFooter = stepIndex >= 3;

  const [hoveredKind, setHoveredKind] = useState<PitfallKind | null>(null);

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
      <FigLabel section="E" num={8} label="STILL MANUAL" />

      <div className="relative z-10 mx-auto grid h-full max-w-[92vw] grid-cols-[30fr_70fr] gap-10 px-12 py-20">
        {/* LEFT — pitfall list (30%) */}
        <div className="flex flex-col gap-6">
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.4rem)", lineHeight: 1.15 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>

          <ul className="flex flex-col gap-3">
            {C.pitfalls.map((p, i) => {
              const Icon = PITFALL_ICONS[p.icon];
              const revealed = i < pitfallsRevealedThrough;
              return (
                <motion.li
                  key={p.id}
                  data-testid={`pitfall-item-${p.id}`}
                  data-revealed={String(revealed)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 4 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredKind(p.id as PitfallKind)}
                  onMouseLeave={() => setHoveredKind(null)}
                  className="flex items-start gap-3 border border-copper-800 bg-neutral-950/60 px-4 py-3 hover:border-copper-300"
                >
                  {Icon && (
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-copper-300"
                      aria-hidden
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-mono uppercase tracking-[0.18em] text-copper-300"
                      style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.95rem)" }}
                    >
                      {p.title}
                    </span>
                    <span
                      className="font-serif italic text-neutral-300"
                      style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
                    >
                      {p.essence}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <motion.p
            className="font-serif italic text-neutral-200"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.2rem)", lineHeight: 1.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showFooter ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {highlight(C.footerCaption, C.footerCaptionKeywords)}
          </motion.p>
        </div>

        {/* RIGHT — morphing canvas (70%) */}
        <div className="relative">
          {showCanvas && (
            <PitfallCanvas
              activeKind={hoveredKind}
              defaultIllustration={
                <NodeNetwork
                  variant="context-hub"
                  state="stamped"
                  centerNode="CONTEXT"
                  satellites={C.satellites}
                  play={ambientOn}
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const e8Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <E8ContextTheWall />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e8-context-the-wall.test.tsx`
Expected: PASS — three assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e8-context-the-wall.tsx tests/unit/e8-context-the-wall.test.tsx
git commit -m "feat(foundation-core-section-e): add E.8 CONTEXT — the wall slide"
```

---

## Task 9 — `<HarnessPackage>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/HarnessPackage.tsx`
- Test: `tests/unit/HarnessPackage.test.tsx`

**Spec reference:** §3.2 + §4.9. Flat 0px-corner box with thin copper border. Interior: HARNESS label + sub-label `Automates context engineering` + Includes row collecting 6 mitigation names from E.8 + input/output arrows.

The compression sequence (network → harness silhouette) is owned by `<NodeNetwork state="compressed">`. `<HarnessPackage>` is the **post-compression** static state — the box with its Includes row and arrows.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/HarnessPackage.test.tsx
import { render, screen } from "@testing-library/react";
import { HarnessPackage } from "@/slides/foundation-core-section-e/components/HarnessPackage";

const INCLUDES = [
  "Context Isolation",
  "Tool Loadout",
  "Subagent Verification",
  "Pruning",
  "Summarization",
  "Offloading",
];

test("HarnessPackage renders HARNESS label + sub-label", () => {
  render(<HarnessPackage includes={INCLUDES} revealIncludes={false} revealArrows={false} />);
  expect(screen.getByText("HARNESS")).toBeInTheDocument();
  expect(screen.getByText(/Automates context engineering/)).toBeInTheDocument();
});

test("Includes row gates on revealIncludes", () => {
  const { rerender } = render(<HarnessPackage includes={INCLUDES} revealIncludes={false} revealArrows={false} />);
  expect(screen.getByTestId("harness-includes").getAttribute("data-revealed")).toBe("false");
  rerender(<HarnessPackage includes={INCLUDES} revealIncludes={true} revealArrows={false} />);
  expect(screen.getByTestId("harness-includes").getAttribute("data-revealed")).toBe("true");
  expect(screen.getAllByTestId(/^harness-include-/)).toHaveLength(6);
});

test("arrows gate on revealArrows", () => {
  render(<HarnessPackage includes={INCLUDES} revealIncludes={true} revealArrows={true} />);
  expect(screen.getByTestId("harness-arrow-input").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("harness-arrow-output").getAttribute("data-revealed")).toBe("true");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/HarnessPackage.test.tsx`
Expected: FAIL — `HarnessPackage` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/HarnessPackage.tsx
import { motion } from "framer-motion";

interface HarnessPackageProps {
  includes: readonly string[];
  revealIncludes: boolean;
  revealArrows: boolean;
}

export function HarnessPackage({
  includes,
  revealIncludes,
  revealArrows,
}: HarnessPackageProps) {
  return (
    <div
      data-testid="harness-package"
      className="relative flex w-full max-w-[40vw] flex-col items-stretch gap-3 border border-copper-200 bg-neutral-950/70 p-6"
    >
      <span
        className="font-mono uppercase tracking-[0.18em] text-copper-200"
        style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.6rem)" }}
      >
        HARNESS
      </span>
      <span
        className="font-serif italic text-neutral-200"
        style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.2rem)", lineHeight: 1.3 }}
      >
        Automates context engineering
      </span>

      <motion.div
        data-testid="harness-includes"
        data-revealed={String(revealIncludes)}
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-copper-700 pt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealIncludes ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <span
          className="font-mono uppercase tracking-[0.18em] text-neutral-300"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}
        >
          Includes:
        </span>
        {includes.map((name, i) => (
          <motion.span
            key={name}
            data-testid={`harness-include-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: revealIncludes ? 1 : 0 }}
            transition={{
              duration: 0.3,
              delay: revealIncludes ? i * 0.12 : 0,
            }}
            className="font-mono text-copper-300"
            style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.95rem)" }}
          >
            {name}
            {i < includes.length - 1 ? " · " : ""}
          </motion.span>
        ))}
      </motion.div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <motion.span
          data-testid="harness-arrow-input"
          data-revealed={String(revealArrows)}
          className="font-mono text-copper-300"
          style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealArrows ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          request →
        </motion.span>
        <motion.span
          data-testid="harness-arrow-output"
          data-revealed={String(revealArrows)}
          className="font-mono text-copper-300"
          style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealArrows ? 1 : 0 }}
          transition={{ duration: 0.4, delay: revealArrows ? 0.15 : 0 }}
        >
          → result
        </motion.span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/HarnessPackage.test.tsx`
Expected: PASS — three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/HarnessPackage.tsx tests/unit/HarnessPackage.test.tsx
git commit -m "feat(foundation-core-section-e): add HarnessPackage primitive"
```

---

## Task 10 — `<ThesisPanel>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/ThesisPanel.tsx`
- Test: `tests/unit/ThesisPanel.test.tsx`

**Spec reference:** §3.2 + §4.9. Right-side anchor for E.9's thesis. Renders the `Agent = Model + Harness` equation in Instrument Serif large + Cursor quote with attribution + 4-line stanza in 4-beat rhythm. Equation builds word-by-word with deliberate pause before `Harness`.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/ThesisPanel.test.tsx
import { render, screen } from "@testing-library/react";
import { ThesisPanel } from "@/slides/foundation-core-section-e/components/ThesisPanel";

test("ThesisPanel renders equation tokens, Cursor quote, stanza, tagline", () => {
  render(
    <ThesisPanel
      revealEquation={true}
      revealStanza={true}
      revealTagline={true}
    />,
  );
  expect(screen.getByText("Agent")).toBeInTheDocument();
  expect(screen.getByText("Harness")).toBeInTheDocument();
  expect(screen.getByText(/Cursor engineering/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^thesis-stanza-/)).toHaveLength(4);
  expect(screen.getByText(/Build once/)).toBeInTheDocument();
  expect(screen.getByText(/Use forever/)).toBeInTheDocument();
});

test("ThesisPanel gates content on reveal flags", () => {
  render(
    <ThesisPanel
      revealEquation={false}
      revealStanza={false}
      revealTagline={false}
    />,
  );
  expect(screen.getByTestId("thesis-equation").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("thesis-stanza-block").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("thesis-tagline").getAttribute("data-revealed")).toBe("false");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/ThesisPanel.test.tsx`
Expected: FAIL — `ThesisPanel` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/ThesisPanel.tsx
import { motion } from "framer-motion";
import { highlight } from "@/components/highlight";

interface ThesisPanelProps {
  revealEquation: boolean;
  revealStanza: boolean;
  revealTagline: boolean;
}

const STANZA = [
  "It picks what to load.",
  "It cleans up.",
  "It verifies its work.",
  "It remembers.",
] as const;

const QUOTE_TEXT =
  "A decent model with a great harness beats a great model with a bad harness.";
const QUOTE_KEYWORDS = [
  "decent model with a great harness",
  "great model with a bad harness",
] as const;

export function ThesisPanel({
  revealEquation,
  revealStanza,
  revealTagline,
}: ThesisPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Equation — word-by-word build with pause before "Harness" */}
      <div
        data-testid="thesis-equation"
        data-revealed={String(revealEquation)}
        className="flex flex-wrap items-baseline gap-3 font-display text-neutral-50"
        style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)", lineHeight: 1 }}
      >
        {[
          { token: "Agent", italicCopper: true, delay: 0 },
          { token: "=", italicCopper: false, delay: 0.25 },
          { token: "Model", italicCopper: false, delay: 0.4 },
          { token: "+", italicCopper: false, delay: 0.55 },
          // Deliberate 400ms pause: bump delay past the previous baseline.
          { token: "Harness", italicCopper: true, delay: 1.0 },
        ].map((t) => (
          <motion.span
            key={t.token}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: revealEquation ? 1 : 0,
              y: revealEquation ? 0 : 6,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: revealEquation ? t.delay : 0,
            }}
            className={t.italicCopper ? "italic text-copper-300" : ""}
          >
            {t.token}
          </motion.span>
        ))}
      </div>

      <div className="border-t border-copper-700" />

      {/* Cursor quote */}
      <motion.div
        className="flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealEquation ? 1 : 0 }}
        transition={{ duration: 0.5, delay: revealEquation ? 1.6 : 0 }}
      >
        <p
          className="font-serif italic text-neutral-200"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
        >
          “{highlight(QUOTE_TEXT, QUOTE_KEYWORDS)}”
        </p>
        <p
          className="text-right font-mono uppercase tracking-[0.18em] text-neutral-400"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}
        >
          — Cursor engineering
        </p>
      </motion.div>

      <div className="border-t border-copper-700" />

      {/* 4-line stanza — 4-beat rhythm */}
      <div
        data-testid="thesis-stanza-block"
        data-revealed={String(revealStanza)}
        className="flex flex-col gap-1"
      >
        {STANZA.map((line, i) => (
          <motion.p
            key={line}
            data-testid={`thesis-stanza-${i}`}
            className="font-serif text-neutral-50"
            style={{ fontSize: "clamp(1rem, 1.3vw, 1.3rem)", lineHeight: 1.4 }}
            initial={{ opacity: 0, x: -4 }}
            animate={{
              opacity: revealStanza ? 1 : 0,
              x: revealStanza ? 0 : -4,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: revealStanza ? i * 0.25 : 0,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        data-testid="thesis-tagline"
        data-revealed={String(revealTagline)}
        className="font-display italic text-neutral-50"
        style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)", lineHeight: 1.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: revealTagline ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="text-copper-300">Build once</span>.{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: revealTagline ? 1 : 0 }}
          transition={{ duration: 0.4, delay: revealTagline ? 0.4 : 0 }}
          className="text-copper-300"
        >
          Use forever
        </motion.span>
        .
      </motion.p>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/ThesisPanel.test.tsx`
Expected: PASS — two assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/ThesisPanel.tsx tests/unit/ThesisPanel.test.tsx
git commit -m "feat(foundation-core-section-e): add ThesisPanel primitive"
```

---

## Task 11 — E.9 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e9-harness-what-why.tsx`
- Test: `tests/unit/e9-harness-what-why.test.tsx`

**Spec reference:** §4.9. 5 advances, click-driven, no ambient. Layout: 55/45 split. Left = compression visualization → harness package. Right = ThesisPanel. Footer ImpactLadder rung 3 (full ladder lit).

- [ ] **Step 1: Append E.9 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e9Content = {
  headline: "Layer 3: Harness — execution.",
  headlineKeywords: ["Harness"] as const,
  // Same satellite list as E.6/E.8 — used to render the network during the
  // pre-compression brighten beat (Space 1) and during the compression
  // sequence (Space 2).
  satellites: [
    { id: "user-prompt", label: "User Prompt", icon: "MessageSquare" as const },
    { id: "conv-mem", label: "Conversation Memory", icon: "History" as const },
    { id: "rag", label: "RAG Knowledge Base", icon: "BookOpen" as const },
    { id: "tools", label: "Tools & APIs", icon: "Wrench" as const },
    { id: "persist", label: "Persistent Memory", icon: "Archive" as const },
    { id: "system", label: "System Instructions", icon: "Shield" as const },
  ],
  includes: [
    "Context Isolation",
    "Tool Loadout",
    "Subagent Verification",
    "Pruning",
    "Summarization",
    "Offloading",
  ] as const,
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e9-harness-what-why.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E9HarnessWhatWhy, e9Slide } from "@/slides/foundation-core-section-e/e9-harness-what-why";

test("E.9 declares 5 steps with canonicalPose=4", () => {
  expect(e9Slide.steps).toBe(5);
  expect(e9Slide.canonicalPose).toBe(4);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.9 at canonicalPose renders harness package + thesis panel + full ladder", () => {
  render(
    <DeckProvider stepCounts={[e9Slide.steps]}>
      <AdvanceTo step={e9Slide.canonicalPose} />
      <E9HarnessWhatWhy />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.9 · HARNESS/)).toBeInTheDocument();
  expect(screen.getByTestId("harness-package")).toBeInTheDocument();
  expect(screen.getAllByTestId(/^harness-include-/)).toHaveLength(6);
  expect(screen.getByTestId("thesis-equation").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("thesis-tagline").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("impact-rung-3").getAttribute("data-lit")).toBe("true");
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e9-harness-what-why.test.tsx`
Expected: FAIL — slide unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e9-harness-what-why.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NodeNetwork } from "./components/NodeNetwork";
import { HarnessPackage } from "./components/HarnessPackage";
import { ThesisPanel } from "./components/ThesisPanel";
import { ImpactLadder } from "./components/ImpactLadder";
import { e9Content as C } from "./content";

export function E9HarnessWhatWhy() {
  const { stepIndex } = useDeck();
  // Spec §4.9 motion table:
  // Space 1 — network from E.8 returns; STILL MANUAL stamp dissolves; nodes brighten
  // Space 2 — compression sequence; satellites pull inward; harness package box appears
  // Space 3 — Includes row + arrows reveal
  // Space 4 — thesis (equation + Cursor quote + stanza)
  // Space 5 — tagline + ladder rung 3 lights
  const showStampedNetwork = stepIndex >= 0 && stepIndex < 1; // brief brighten state
  const showCompressedNetwork = stepIndex >= 1; // network compresses + becomes silhouette
  const showHarnessPackage = stepIndex >= 1; // package box materializes alongside compression
  const showIncludes = stepIndex >= 2;
  const showArrows = stepIndex >= 2;
  const revealEquation = stepIndex >= 3;
  const revealStanza = stepIndex >= 3;
  const revealTagline = stepIndex >= 4;
  const rung3Lit = stepIndex >= 4;

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
      <FigLabel section="E" num={9} label="HARNESS" />

      <div className="relative z-10 mx-auto grid h-full max-w-[92vw] grid-cols-[55fr_45fr] gap-10 px-12 py-20">
        {/* LEFT — compression → package */}
        <div className="relative flex flex-col items-center justify-center gap-6">
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>

          <div className="relative flex h-[36vh] w-full items-center justify-center">
            {showStampedNetwork && (
              <NodeNetwork
                variant="context-hub"
                state="activated"
                centerNode="CONTEXT"
                satellites={C.satellites}
                play={false}
              />
            )}
            {showCompressedNetwork && (
              <NodeNetwork
                variant="context-hub"
                state="compressed"
                centerNode="CONTEXT"
                satellites={C.satellites}
                play={false}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: showHarnessPackage ? 1 : 0,
              y: showHarnessPackage ? 0 : 12,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: showHarnessPackage ? 0.8 : 0,
            }}
            className="flex w-full justify-center"
          >
            <HarnessPackage
              includes={C.includes}
              revealIncludes={showIncludes}
              revealArrows={showArrows}
            />
          </motion.div>
        </div>

        {/* RIGHT — ThesisPanel */}
        <div className="flex flex-col justify-center">
          <ThesisPanel
            revealEquation={revealEquation}
            revealStanza={revealStanza}
            revealTagline={revealTagline}
          />
        </div>
      </div>

      {/* FOOTER — ImpactLadder rung 3 (full ladder lit) */}
      <div className="absolute bottom-8 left-1/2 z-10 w-[80vw] -translate-x-1/2">
        <ImpactLadder rungs={3} currentRung={rung3Lit ? 3 : 2} />
      </div>
    </div>
  );
}

export const e9Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <E9HarnessWhatWhy />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e9-harness-what-why.test.tsx`
Expected: PASS — two assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e9-harness-what-why.tsx tests/unit/e9-harness-what-why.test.tsx
git commit -m "feat(foundation-core-section-e): add E.9 HARNESS — what & why slide"
```

---

## Task 12 — `<HarnessPattern>` primitive (cross-spec)

**Files:**
- Create: `src/components/HarnessPattern.tsx`
- Test: `tests/unit/HarnessPattern.test.tsx`

**Spec reference:** §3.2 + §4.10 + §5.3 + §8.5. **CRITICAL CROSS-SPEC PRIMITIVE.** The Main Agent + delegate-branch (sub-agents) + tools-branch diagram. Lives at `src/components/` (global), not under the section subdir, because Section I.3 (`<HarnessCanvas>` default state) imports the same component. Single source of truth across both surfaces.

Branch labels: `delegate` (left) and `tools` (right). Agent labels: `MAIN AGENT` (top) + `AGENT A` / `AGENT B` (sub-agents). The `Pattern: centralized` annotation appears below the diagram in E.10's Orchestration card.

Internal animation phases (per spec §4.10):
- Phase A: MAIN AGENT box reveals — fade-in + scale 0.9→1.0 + brief copper-glow halo (~400ms)
- Phase B: Two branches `delegate` / `tools` draw via `pathLength` (~400ms parallel). Two sub-agent boxes reveal (~500ms stagger)
- Phase C: Two direct `[tool]` markers reveal under tools branch (~300ms stagger). Each sub-agent's `[tool]` markers fade in (~300ms parallel)
- Phase D: `Pattern: centralized` annotation fades in. 3 bullets reveal (stagger ~150ms)

Total internal animation: ~2200ms. Plays once on first mount with `play=true`; stays in canonical pose otherwise.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/HarnessPattern.test.tsx
import { render, screen } from "@testing-library/react";
import { HarnessPattern } from "@/components/HarnessPattern";

test("HarnessPattern renders main agent + 2 sub-agents + 2 direct tools", () => {
  render(<HarnessPattern play={false} />);
  expect(screen.getByTestId("harness-main-agent").textContent).toMatch(/MAIN AGENT/);
  expect(screen.getAllByTestId(/^harness-subagent-/)).toHaveLength(2);
  expect(screen.getAllByTestId(/^harness-direct-tool-/)).toHaveLength(2);
  expect(screen.getAllByTestId(/^harness-subagent-tool-/)).toHaveLength(2);
});

test("HarnessPattern renders branch labels delegate + tools", () => {
  render(<HarnessPattern play={false} />);
  expect(screen.getByText("delegate")).toBeInTheDocument();
  expect(screen.getByText("tools")).toBeInTheDocument();
});

test("HarnessPattern renders Pattern: centralized annotation", () => {
  render(<HarnessPattern play={false} />);
  expect(screen.getByText(/Pattern: centralized/)).toBeInTheDocument();
});

test("HarnessPattern data-play reflects play prop", () => {
  const { rerender } = render(<HarnessPattern play={false} />);
  expect(screen.getByTestId("harness-pattern-root").getAttribute("data-play")).toBe("false");
  rerender(<HarnessPattern play={true} />);
  expect(screen.getByTestId("harness-pattern-root").getAttribute("data-play")).toBe("true");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/HarnessPattern.test.tsx`
Expected: FAIL — `HarnessPattern` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/components/HarnessPattern.tsx
import { motion } from "framer-motion";

interface HarnessPatternProps {
  // When true, the internal animation plays from Phase A → D on mount.
  // When false, the canonical pose is rendered immediately.
  play: boolean;
}

const ENTRY_DURATION = 0.4;
const PHASE_A_END = 0.4;
const PHASE_B_END = 0.9;
const PHASE_C_END = 1.4;
const PHASE_D_START = 1.6;

function delaysFor(play: boolean) {
  if (!play) return { mainAgent: 0, branches: 0, subAgents: 0, directTools: 0, subTools: 0, annotation: 0 };
  return {
    mainAgent: 0,
    branches: PHASE_A_END,
    subAgents: PHASE_B_END,
    directTools: PHASE_B_END + 0.1,
    subTools: PHASE_C_END,
    annotation: PHASE_D_START,
  };
}

export function HarnessPattern({ play }: HarnessPatternProps) {
  const d = delaysFor(play);

  return (
    <div
      data-testid="harness-pattern-root"
      data-play={String(play)}
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-4"
    >
      {/* MAIN AGENT */}
      <motion.div
        data-testid="harness-main-agent"
        initial={play ? { opacity: 0, scale: 0.9 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ENTRY_DURATION, ease: [0.16, 1, 0.3, 1], delay: d.mainAgent }}
        className="border border-copper-300 bg-neutral-950/80 px-4 py-2"
      >
        <span
          className="font-mono uppercase tracking-[0.18em] text-neutral-100"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
        >
          MAIN AGENT
        </span>
      </motion.div>

      {/* Branch SVG */}
      <svg viewBox="-50 -10 100 50" className="h-32 w-full">
        {/* Delegate branch (left) */}
        <motion.line
          x1={0} y1={0}
          x2={-25} y2={20}
          stroke="rgb(212 153 102 / 0.7)"
          strokeWidth={0.6}
          initial={play ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: ENTRY_DURATION, delay: d.branches }}
        />
        <text x={-30} y={5} fill="rgb(212 153 102)" fontSize={3} fontFamily="JetBrains Mono">delegate</text>

        {/* Tools branch (right) */}
        <motion.line
          x1={0} y1={0}
          x2={25} y2={20}
          stroke="rgb(212 153 102 / 0.7)"
          strokeWidth={0.6}
          initial={play ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: ENTRY_DURATION, delay: d.branches }}
        />
        <text x={20} y={5} fill="rgb(212 153 102)" fontSize={3} fontFamily="JetBrains Mono">tools</text>
      </svg>

      {/* Sub-agents + tools row */}
      <div className="flex w-full items-start justify-around gap-6">
        <div className="flex flex-col items-center gap-3">
          {(["A", "B"] as const).map((letter, i) => (
            <motion.div
              key={letter}
              data-testid={`harness-subagent-${letter.toLowerCase()}`}
              initial={play ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: d.subAgents + i * 0.15 }}
              className="flex flex-col items-center gap-1 border border-copper-700 bg-neutral-950/70 px-3 py-2"
            >
              <span
                className="font-mono uppercase tracking-[0.18em] text-neutral-100"
                style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)" }}
              >
                AGENT {letter}
              </span>
              <motion.span
                data-testid={`harness-subagent-tool-${letter.toLowerCase()}`}
                initial={play ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: d.subTools + i * 0.1 }}
                className="font-mono text-copper-300"
                style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)" }}
              >
                [tool]
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          {(["search", "fetch"] as const).map((tool, i) => (
            <motion.span
              key={tool}
              data-testid={`harness-direct-tool-${i}`}
              initial={play ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: d.directTools + i * 0.15 }}
              className="border border-copper-700 bg-neutral-950/70 px-3 py-2 font-mono text-copper-300"
              style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}
            >
              [{tool}]
            </motion.span>
          ))}
        </div>
      </div>

      {/* Annotation */}
      <motion.span
        data-testid="harness-annotation"
        initial={play ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: d.annotation }}
        className="font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.9rem)" }}
      >
        Pattern: centralized
      </motion.span>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/HarnessPattern.test.tsx`
Expected: PASS — four assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/components/HarnessPattern.tsx tests/unit/HarnessPattern.test.tsx
git commit -m "feat(components): add HarnessPattern cross-spec primitive"
```

---

## Task 13 — `<PracticeCard>` primitive

**Files:**
- Create: `src/slides/foundation-core-section-e/components/PracticeCard.tsx`
- Test: `tests/unit/PracticeCard.test.tsx`

**Spec reference:** §3.2 + §4.10 + §8.5.1. Single card with compact + expanded states. The grid (Task 14) drives which card is expanded; this primitive renders one card given an `expanded` prop. Click anywhere on a compact card fires `onSelect`. Click the × button on an expanded card fires `onClose`. The expanded `kind="orchestration"` card hosts the embedded `<HarnessPattern>` instead of bullet content.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/PracticeCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { PracticeCard } from "@/slides/foundation-core-section-e/components/PracticeCard";

const FIXTURE = {
  id: "memory",
  icon: "Brain" as const,
  name: "Memory",
  essence: "self-learning — gotchas stay",
  bullets: ["Captures gotchas during work", "Records what broke, what worked"],
};

test("PracticeCard compact renders icon + name + essence + onSelect", () => {
  const calls: string[] = [];
  render(
    <PracticeCard
      {...FIXTURE}
      expanded={false}
      onSelect={(id) => calls.push(id)}
      onClose={() => {}}
    />,
  );
  expect(screen.getByText("Memory")).toBeInTheDocument();
  expect(screen.getByText(/self-learning/)).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(calls).toEqual(["memory"]);
});

test("PracticeCard expanded shows bullets + close button", () => {
  const calls: string[] = [];
  render(
    <PracticeCard
      {...FIXTURE}
      expanded={true}
      onSelect={() => {}}
      onClose={() => calls.push("close")}
    />,
  );
  expect(screen.getAllByTestId(/^practice-bullet-/)).toHaveLength(2);
  fireEvent.click(screen.getByTestId("practice-card-close"));
  expect(calls).toEqual(["close"]);
});

test("PracticeCard kind=orchestration renders HarnessPattern instead of bullets when expanded", () => {
  render(
    <PracticeCard
      id="orchestration"
      icon="Network"
      name="Orchestration"
      essence="pattern + agents + tools"
      bullets={[
        "Main Agent dispatches",
        "Delegate to sub-agents OR call tools direct",
        "Pattern: centralized",
      ]}
      expanded={true}
      onSelect={() => {}}
      onClose={() => {}}
    />,
  );
  expect(screen.getByTestId("harness-pattern-root")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/PracticeCard.test.tsx`
Expected: FAIL — `PracticeCard` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/PracticeCard.tsx
import { motion } from "framer-motion";
import {
  Network,
  Package,
  Brain,
  Activity,
  Zap,
  FileText,
  Users,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { HarnessPattern } from "@/components/HarnessPattern";

const ICONS: Record<string, LucideIcon> = {
  Network,
  Package,
  Brain,
  Activity,
  Zap,
  FileText,
  Users,
  Repeat,
};

export type PracticeIcon = keyof typeof ICONS;

interface PracticeCardProps {
  id: string;
  icon: PracticeIcon;
  name: string;
  essence: string;
  bullets: readonly string[];
  expanded: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function PracticeCard({
  id,
  icon,
  name,
  essence,
  bullets,
  expanded,
  onSelect,
  onClose,
}: PracticeCardProps) {
  const Icon = ICONS[icon];
  const isOrchestration = id === "orchestration";

  return (
    <motion.div
      data-testid={`practice-card-${id}`}
      data-expanded={String(expanded)}
      layoutId={`practice-${id}`}
      className={`relative flex h-full w-full cursor-pointer flex-col gap-2 border bg-neutral-950/70 ${
        expanded ? "border-copper-300 p-6" : "border-copper-700 p-4 hover:border-copper-300"
      }`}
      onClick={(e) => {
        if (expanded) return; // expanded card uses dedicated × close
        e.stopPropagation();
        onSelect(id);
      }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon size={expanded ? 28 : 24} strokeWidth={1.5} className="text-copper-300" aria-hidden />
        )}
        <span
          className="font-mono uppercase tracking-[0.18em] text-neutral-50"
          style={{ fontSize: expanded ? "clamp(1.1rem, 1.4vw, 1.4rem)" : "clamp(0.85rem, 1vw, 1rem)" }}
        >
          {name}
        </span>
        {expanded && (
          <button
            type="button"
            data-testid="practice-card-close"
            aria-label="close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-auto font-mono text-copper-300 hover:text-copper-200"
            style={{ fontSize: "1.4rem" }}
          >
            ×
          </button>
        )}
      </div>

      {!expanded && (
        <span
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)", lineHeight: 1.3 }}
        >
          {essence}
        </span>
      )}

      {expanded && (
        <div className="mt-2 flex flex-1 gap-6">
          {isOrchestration ? (
            <>
              <div className="flex-1">
                <HarnessPattern play />
              </div>
              <ul className="flex w-1/3 flex-col gap-2">
                {bullets.map((b, i) => (
                  <li
                    key={b}
                    data-testid={`practice-bullet-${i}`}
                    className="font-serif text-neutral-100"
                    style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)", lineHeight: 1.4 }}
                  >
                    <span className="mr-2 text-copper-300">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="flex flex-1 flex-col gap-2">
              {bullets.map((b, i) => (
                <li
                  key={b}
                  data-testid={`practice-bullet-${i}`}
                  className="font-serif text-neutral-100"
                  style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.15rem)", lineHeight: 1.4 }}
                >
                  <span className="mr-2 text-copper-300">•</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/PracticeCard.test.tsx`
Expected: PASS — three assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/PracticeCard.tsx tests/unit/PracticeCard.test.tsx
git commit -m "feat(foundation-core-section-e): add PracticeCard primitive"
```

---

## Task 14 — `<PracticeGrid>` primitive (1+7 reflow)

**Files:**
- Create: `src/slides/foundation-core-section-e/components/PracticeGrid.tsx`
- Test: `tests/unit/PracticeGrid.test.tsx`

**Spec reference:** §3.2 + §4.10 + §8.5.1. **2×4 grid → 1+7 reflow** primitive. Default state: 8 equal cards. Click any card → selected expands to ~50% of practices area; others compress into a vertical strip. Three close behaviors: × button (handled inside PracticeCard) · click outside · click selected card again. Framer Motion `layoutId` per card drives smooth grid-to-strip morph.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/PracticeGrid.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { PracticeGrid } from "@/slides/foundation-core-section-e/components/PracticeGrid";

const PRACTICES = [
  { id: "orchestration", icon: "Network" as const, name: "Orchestration", essence: "pattern + agents + tools", bullets: ["a", "b", "c"] },
  { id: "plugins", icon: "Package" as const, name: "Plugins", essence: "packaged: subagents, skills, hooks, MCP", bullets: ["a", "b"] },
  { id: "memory", icon: "Brain" as const, name: "Memory", essence: "self-learning — gotchas stay", bullets: ["a", "b"] },
  { id: "observability", icon: "Activity" as const, name: "Observability", essence: "every decision auditable", bullets: ["a", "b"] },
  { id: "triggers", icon: "Zap" as const, name: "Triggers", essence: "manual, schedule, or event", bullets: ["a", "b"] },
  { id: "spec-driven", icon: "FileText" as const, name: "Spec-driven", essence: "spec = source of truth", bullets: ["a", "b"] },
  { id: "hitl", icon: "Users" as const, name: "HITL", essence: "approval at key steps", bullets: ["a", "b"] },
  { id: "ralph", icon: "Repeat" as const, name: "Ralph Wiggum", essence: "autonomous loop until done", bullets: ["a", "b"] },
];

test("PracticeGrid renders 8 cards in default state", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  expect(screen.getAllByTestId(/^practice-card-/)).toHaveLength(8);
  // None expanded by default.
  for (const p of PRACTICES) {
    expect(screen.getByTestId(`practice-card-${p.id}`).getAttribute("data-expanded")).toBe("false");
  }
});

test("clicking a card expands it; click × restores grid", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("true");

  fireEvent.click(screen.getByTestId("practice-card-close"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("false");
});

test("clicking a different card swaps expansion (single transition)", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("true");
  fireEvent.click(screen.getByTestId("practice-card-triggers"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("false");
  expect(screen.getByTestId("practice-card-triggers").getAttribute("data-expanded")).toBe("true");
});

test("clicking outside the expanded card closes it", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("true");
  fireEvent.click(screen.getByTestId("practice-grid-outside"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("false");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/PracticeGrid.test.tsx`
Expected: FAIL — `PracticeGrid` unresolved.

- [ ] **Step 3: Write the primitive**

```tsx
// src/slides/foundation-core-section-e/components/PracticeGrid.tsx
import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { PracticeCard, type PracticeIcon } from "./PracticeCard";

export interface PracticeSpec {
  id: string;
  icon: PracticeIcon;
  name: string;
  essence: string;
  bullets: readonly string[];
}

interface PracticeGridProps {
  practices: readonly PracticeSpec[]; // expect 8
}

export function PracticeGrid({ practices }: PracticeGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Expand-shrink three close behaviors per spec §4.10:
  //  · × close button — handled inside PracticeCard via onClose
  //  · click outside — handled here via the outside backdrop
  //  · click same card — handled by PracticeCard rejecting onSelect when already expanded
  // Click *different* card — handled here in the same setExpandedId path

  if (expandedId === null) {
    return (
      <div
        data-testid="practice-grid-default"
        className="grid w-full grid-cols-4 grid-rows-2 gap-4"
        style={{ minHeight: "62vh" }}
      >
        <LayoutGroup>
          {practices.map((p) => (
            <PracticeCard
              key={p.id}
              {...p}
              expanded={false}
              onSelect={(id) => setExpandedId(id)}
              onClose={() => {}}
            />
          ))}
        </LayoutGroup>
      </div>
    );
  }

  const expanded = practices.find((p) => p.id === expandedId);
  const others = practices.filter((p) => p.id !== expandedId);

  return (
    <div
      data-testid="practice-grid-expanded"
      className="relative w-full"
      style={{ minHeight: "62vh" }}
    >
      <button
        type="button"
        data-testid="practice-grid-outside"
        aria-label="close"
        onClick={() => setExpandedId(null)}
        className="absolute inset-0 z-0 cursor-default bg-transparent"
      />
      <div className="relative z-10 grid w-full grid-cols-[1fr_24%] gap-4" style={{ minHeight: "62vh" }}>
        <LayoutGroup>
          {expanded && (
            <PracticeCard
              key={expanded.id}
              {...expanded}
              expanded
              onSelect={(id) => setExpandedId(id)}
              onClose={() => setExpandedId(null)}
            />
          )}
          <div className="flex flex-col gap-2">
            {others.map((p) => (
              <PracticeCard
                key={p.id}
                {...p}
                expanded={false}
                onSelect={(id) => setExpandedId(id)}
                onClose={() => {}}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/unit/PracticeGrid.test.tsx`
Expected: PASS — four assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/slides/foundation-core-section-e/components/PracticeGrid.tsx tests/unit/PracticeGrid.test.tsx
git commit -m "feat(foundation-core-section-e): add PracticeGrid 1+7 reflow primitive"
```

---

## Task 15 — E.10 content + slide assembly

**Files:**
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `src/slides/foundation-core-section-e/e10-harness-practices.tsx`
- Test: `tests/unit/e10-harness-practices.test.tsx`

**Spec reference:** §4.10. 3 advances + interactive expand-shrink. Layout: centered 2×4 grid of 8 practice cards. Speaker clicks any card post-Space 3 to demo expand-shrink.

- [ ] **Step 1: Append E.10 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e10Content = {
  headline: "What good harness teams do: eight practices.",
  headlineKeywords: ["eight practices"] as const,
  practices: [
    {
      id: "orchestration",
      icon: "Network" as const,
      name: "Orchestration",
      essence: "pattern + agents + tools",
      bullets: [
        "Main Agent dispatches",
        "Delegate to sub-agents OR call tools direct",
        "Pattern: centralized",
      ],
    },
    {
      id: "plugins",
      icon: "Package" as const,
      name: "Plugins",
      essence: "packaged: subagents, skills, hooks, MCP",
      bullets: [
        "Subagents — specialized workers",
        "Skills — domain modules",
        "Hooks — lifecycle guardrails",
        "MCP — external integrations",
        "One bundle, install everywhere",
      ],
    },
    {
      id: "memory",
      icon: "Brain" as const,
      name: "Memory",
      essence: "self-learning — gotchas stay",
      bullets: [
        "Captures gotchas during work",
        "Records what broke, what worked",
        "Stores decisions + rationale",
        "Next session inherits",
      ],
    },
    {
      id: "observability",
      icon: "Activity" as const,
      name: "Observability",
      essence: "every decision auditable",
      bullets: [
        "Tool calls + results",
        "Context state per step",
        "Permission decisions",
        "Token usage trends",
      ],
    },
    {
      id: "triggers",
      icon: "Zap" as const,
      name: "Triggers",
      essence: "manual, schedule, or event",
      bullets: [
        "Manual — you ask",
        "Schedule — cron, daily, recurring",
        "Event — webhook, file change, message",
      ],
    },
    {
      id: "spec-driven",
      icon: "FileText" as const,
      name: "Spec-driven",
      essence: "spec = source of truth",
      bullets: [
        "Spec is the contract",
        "Progress measured against spec",
        "No work outside the spec",
        "Verification = spec compliance",
      ],
    },
    {
      id: "hitl",
      icon: "Users" as const,
      name: "HITL",
      essence: "approval at key steps",
      bullets: [
        "Approval gates on critical actions",
        "Human pauses on ambiguity",
        "Human signs off on dangerous commands",
        "Human checkpoints on long runs",
      ],
    },
    {
      id: "ralph",
      icon: "Repeat" as const,
      name: "Ralph Wiggum",
      essence: "autonomous loop until done",
      bullets: [
        "Loops until spec is satisfied",
        "Failure feeds back as input",
        "Survives across context limits",
        '"I\'m helping!" persistence',
      ],
    },
  ],
};
```

- [ ] **Step 2: Write the failing slide test**

```tsx
// tests/unit/e10-harness-practices.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E10HarnessPractices, e10Slide } from "@/slides/foundation-core-section-e/e10-harness-practices";

test("E.10 declares 3 steps with canonicalPose=2", () => {
  expect(e10Slide.steps).toBe(3);
  expect(e10Slide.canonicalPose).toBe(2);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.10 at canonicalPose renders 2×4 grid of 8 practices", () => {
  render(
    <DeckProvider stepCounts={[e10Slide.steps]}>
      <AdvanceTo step={e10Slide.canonicalPose} />
      <E10HarnessPractices />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.10 · PRACTICES/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^practice-card-/)).toHaveLength(8);
});

test("clicking Orchestration practice reveals the embedded HarnessPattern", () => {
  render(
    <DeckProvider stepCounts={[e10Slide.steps]}>
      <AdvanceTo step={e10Slide.canonicalPose} />
      <E10HarnessPractices />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  fireEvent.click(screen.getByTestId("practice-card-orchestration"));
  expect(screen.getByTestId("harness-pattern-root")).toBeInTheDocument();
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/unit/e10-harness-practices.test.tsx`
Expected: FAIL — slide unresolved.

- [ ] **Step 4: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e10-harness-practices.tsx
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { PracticeGrid } from "./components/PracticeGrid";
import { e10Content as C } from "./content";

export function E10HarnessPractices() {
  const { stepIndex } = useDeck();
  // Spec §4.10 motion: Space 1 headline; Space 2 top row of 4 cards; Space 3 bottom row.
  // Post-Space 3: speaker clicks any card to demo expand-shrink (state lives in PracticeGrid).
  const showTopRow = stepIndex >= 1;
  const showBottomRow = stepIndex >= 2;

  // The grid renders 8 cards — but per the spec's reveal sequence, we
  // only show the first 4 on Space 2, all 8 on Space 3. We achieve
  // this by slicing the practices array by reveal state.
  const visiblePractices = showBottomRow
    ? C.practices
    : showTopRow
      ? C.practices.slice(0, 4)
      : [];

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
      <FigLabel section="E" num={10} label="PRACTICES" />

      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col gap-8 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <div className="flex-1">
          {visiblePractices.length > 0 && (
            <PracticeGrid practices={visiblePractices} />
          )}
        </div>
      </div>
    </div>
  );
}

export const e10Slide: SlideDef = {
  steps: 3,
  animationMode: "step-reveal",
  canonicalPose: 2,
  surface: "dark",
  render: () => <E10HarnessPractices />,
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/e10-harness-practices.test.tsx`
Expected: PASS — three assertions green.

- [ ] **Step 6: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e10-harness-practices.tsx tests/unit/e10-harness-practices.test.tsx
git commit -m "feat(foundation-core-section-e): add E.10 HARNESS PRACTICES slide"
```

---

## Task 16 — E.11 content + slide assembly + hero photo asset

**Files:**
- Create: `src/slides/foundation-core-section-e/e11-bridge-to-f.tsx`
- Modify: `src/slides/foundation-core-section-e/content.ts`
- Create: `public/heroes/e11-bridge.jpg` (placeholder OK if asset not yet generated)
- Test: `tests/unit/e11-bridge-to-f.test.tsx`

**Spec reference:** §4.11. 2 advances, no ambient. Photographic close (analogue to D.5). Beat 1 + Beat 2. Image-gen prompt is locked in spec §4.11 — three concentric layered piles.

The hero photo is a runtime asset. If `gemini-image-gen` MCP can produce it during this task, do so and save to `public/heroes/e11-bridge.jpg`. Otherwise commit a placeholder (e.g. a copy of `d5-bridge.jpg` from Section D) so the slide renders, and add a TODO note in the commit message that the final photo needs generation.

- [ ] **Step 1: Append E.11 content**

```ts
// Append to src/slides/foundation-core-section-e/content.ts:

export const e11Content = {
  beat1: {
    text: "Three layers. The fundamentals are built.",
    keywords: ["Three layers", "fundamentals"] as const,
  },
  beat2: {
    text: "Next: the techniques that matter most.",
    keywords: ["Next", "that matter most"] as const,
  },
};
```

- [ ] **Step 2: Generate or stage the hero photo**

If `gemini-image-gen` MCP is available:
- Run it with the prompt locked in spec §4.11 (three concentric layered piles).
- Save the result to `public/heroes/e11-bridge.jpg`.

If not available, stage a placeholder so the slide renders:

```bash
cp public/heroes/d5-bridge.jpg public/heroes/e11-bridge.jpg
echo "TODO: regenerate e11-bridge.jpg via gemini-image-gen per spec §4.11" >> docs/plans/asset-todos.md
```

- [ ] **Step 3: Write the failing slide test**

```tsx
// tests/unit/e11-bridge-to-f.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E11BridgeToF, e11Slide } from "@/slides/foundation-core-section-e/e11-bridge-to-f";

test("E.11 declares 2 steps with canonicalPose=1", () => {
  expect(e11Slide.steps).toBe(2);
  expect(e11Slide.canonicalPose).toBe(1);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.11 at canonicalPose renders both beats over hero photo", () => {
  render(
    <DeckProvider stepCounts={[e11Slide.steps]}>
      <AdvanceTo step={e11Slide.canonicalPose} />
      <E11BridgeToF />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.11 · BUILT/)).toBeInTheDocument();
  expect(screen.getByText(/Three layers/)).toBeInTheDocument();
  expect(screen.getByText(/techniques that matter most/)).toBeInTheDocument();
  expect(screen.getByTestId("hero-vignette")).toBeInTheDocument();
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run tests/unit/e11-bridge-to-f.test.tsx`
Expected: FAIL — slide unresolved.

- [ ] **Step 5: Write the slide**

```tsx
// src/slides/foundation-core-section-e/e11-bridge-to-f.tsx
import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { highlight } from "@/components/highlight";
import { e11Content as C } from "./content";

export function E11BridgeToF() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/e11-bridge.jpg" alt="" vignetteSide="right" />
      <FigLabel section="E" num={11} label="BUILT" />
      <div className="absolute right-24 top-24 z-20 flex max-w-[55vw] flex-col items-end gap-8 text-right">
        <StepReveal>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat1.text, C.beat1.keywords)}
          </p>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat2.text, C.beat2.keywords)}
          </p>
        </StepReveal>
      </div>
    </div>
  );
}

export const e11Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  render: () => <E11BridgeToF />,
};
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/unit/e11-bridge-to-f.test.tsx`
Expected: PASS — two assertions green.

- [ ] **Step 7: Commit**

```bash
git add src/slides/foundation-core-section-e/content.ts src/slides/foundation-core-section-e/e11-bridge-to-f.tsx public/heroes/e11-bridge.jpg tests/unit/e11-bridge-to-f.test.tsx
git commit -m "feat(foundation-core-section-e): add E.11 BRIDGE TO F slide"
```

---

## Task 17 — Wire Plan B into the deck

**Files:**
- Modify: `src/slides/foundation-core-section-e/index.ts`
- Modify: `tests/unit/foundation-core-section-e-index.test.ts`
- Modify: `tests/e2e/keyboard-nav.spec.ts`

This task expands the section index to all 11 slides. The deck registry (`src/deck/registry.tsx`) was already updated in Plan A's Task 17 to consume `foundationCoreSectionESlides` — Plan B simply adds the new entries to the array.

- [ ] **Step 1: Update the index test to assert the full state**

Replace the Plan A version of this test with a fully populated assertion.

```ts
// tests/unit/foundation-core-section-e-index.test.ts (full replacement)
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("Plan B — section E exports all 11 slides E.1..E.11 in order", () => {
  expect(foundationCoreSectionESlides).toHaveLength(11);
  const stepCounts = foundationCoreSectionESlides.map((s) => s.steps);
  // Per spec §6 — locked.
  expect(stepCounts).toEqual([7, 5, 4, 4, 4, 4, 5, 4, 5, 3, 2]);
});

test("every Section E slide is dark-surface step-reveal", () => {
  for (const s of foundationCoreSectionESlides) {
    expect(s.surface ?? "dark").toBe("dark");
    expect(s.animationMode).toBe("step-reveal");
  }
});

test("Section E total advances = 47 (per spec §6)", () => {
  const total = foundationCoreSectionESlides.reduce((acc, s) => acc + s.steps, 0);
  expect(total).toBe(47);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/unit/foundation-core-section-e-index.test.ts`
Expected: FAIL — current export has 5 slides (Plan A only).

- [ ] **Step 3: Update `index.ts` to export all 11 slides**

```ts
// src/slides/foundation-core-section-e/index.ts (full replacement)
import type { SlideDef } from "@/deck/types";
import { e1Slide } from "./e1-three-layers";
import { e2Slide } from "./e2-prompt-what-why";
import { e3Slide } from "./e3-prompt-structure";
import { e4Slide } from "./e4-prompt-methodologies";
import { e5Slide } from "./e5-prompt-the-wall";
import { e6Slide } from "./e6-context-what-why";
import { e7Slide } from "./e7-context-strategies";
import { e8Slide } from "./e8-context-the-wall";
import { e9Slide } from "./e9-harness-what-why";
import { e10Slide } from "./e10-harness-practices";
import { e11Slide } from "./e11-bridge-to-f";

// Spec §1.1 — locked Section E order.
export const foundationCoreSectionESlides: SlideDef[] = [
  e1Slide,
  e2Slide,
  e3Slide,
  e4Slide,
  e5Slide,
  e6Slide,
  e7Slide,
  e8Slide,
  e9Slide,
  e10Slide,
  e11Slide,
];
```

- [ ] **Step 4: Run the index test to verify it passes**

Run: `npx vitest run tests/unit/foundation-core-section-e-index.test.ts`
Expected: PASS — all three assertions green.

- [ ] **Step 5: Extend the keyboard-nav e2e to cover the 6 new slides**

Open `tests/e2e/keyboard-nav.spec.ts`. If it has a slide-count assertion, increase the count by 6. If it walks each slide individually via `data-slide-index`, add walks for E.6..E.11. Each new slide needs N Space presses (N=4/5/4/5/3/2 for E.6..E.11) and a FIG label assertion.

```bash
# Validate the e2e:
npm run e2e -- tests/e2e/keyboard-nav.spec.ts
```

Expected: PASS — keyboard nav walks through all D + E + I/J/K slides.

- [ ] **Step 6: Manual smoke (auto-mode note)**

Per project memory, UI changes need a real browser check before claiming done.

```bash
npm run dev
# Open http://localhost:5173
# Press Space repeatedly. Confirm:
#   - Plan A slides (E.1..E.5) play unchanged.
#   - E.6 hub-and-spoke reveals; ambient inward flow runs after Space 4; ladder rung 2 lit.
#   - E.7 four rings reveal; particle-flow ambient begins after Space 5.
#   - E.8 stamped network + chaos arrows; hovering each pitfall morphs the right canvas.
#   - E.9 compression sequence runs; Includes row reveals; equation builds with pause before "Harness"; full ladder lit.
#   - E.10 2×4 grid; click Orchestration → embedded HarnessPattern animation plays; close via × or click-outside.
#   - E.11 photo + 2 beats; calm ending.
#   - Reveal+Closing arc resumes after E.11.
```

If the dev server can't be launched in the executing environment, document it in the task notes. Tests are necessary but not sufficient for UI changes per project policy.

- [ ] **Step 7: Run the full test suite**

```bash
npm test
```

Expected: PASS — every existing unit test, plus all new test files added across Tasks 1–17.

- [ ] **Step 8: Run the e2e suite**

```bash
npm run e2e
```

Expected: PASS — full e2e green (keyboard-nav + any other specs in `tests/e2e/`).

- [ ] **Step 9: Validate canonical-pose export**

```bash
npm run export:pdf
npm run export:pptx
```

Expected: both succeed without errors. Open the resulting `exports/smoke-deck.pdf` and verify the canonical-pose freeze frames for E.6..E.11 land on each slide's last step (network revealed, harness package complete, etc).

- [ ] **Step 10: Commit**

```bash
git add src/slides/foundation-core-section-e/index.ts tests/unit/foundation-core-section-e-index.test.ts tests/e2e/keyboard-nav.spec.ts
git commit -m "feat(foundation-core-section-e): register Plan B slides (E.6–E.11) in deck"
```

---

## Acceptance criteria for Plan B (mirrors spec §10)

A Plan B delivery is "done" when:

- All 6 new slides individually pass their unit tests (Tasks 3, 5, 8, 11, 15, 16) and the section-index test (Task 17).
- All new primitives pass their unit tests (Tasks 2, 4, 6, 7, 9, 10, 12, 13, 14).
- `npm test` is green; `npm run e2e` is green.
- `npm run dev` confirms manual walk-through end-to-end.
- `npm run export:pdf` and `npm run export:pptx` complete without errors and the canonical-pose freeze frames for E.6–E.11 land on each slide's last step.
- All 23 logical advances declared by Plan B (E.6=4 + E.7=5 + E.8=4 + E.9=5 + E.10=3 + E.11=2 = 23) trigger via Space.
- All 47 logical advances of the full section trigger via Space (Plan A + Plan B verified in Task 17).
- Cross-slide hooks land:
  - E.5 → E.6: closing caption *"That's where the next layers begin"* hands off to E.6's `Layer 2: Context — relevance.`
  - E.6 ↔ E.8: same network, two ambient registers (orderly inward flow → chaotic arrows).
  - E.8 → E.9: 6 mitigations from "Mitigated by →" tags appear in E.9's Includes row with per-name copper-glow recognition payoff.
  - E.9 → E.10: harness defined → opened as 8 practices.
  - E.10 → E.11: photographic exhale.
- Cross-spec dependency satisfied:
  - `<HarnessPattern>` (embedded in E.10's Orchestration practice card) visually matches `<HarnessCanvas>` default state on I.3 EXACTLY (single source of truth at `src/components/HarnessPattern.tsx`).
- Meta-callbacks land:
  - E.1 → E.6 (6 satellites recognition — same satellites, now activated)
  - E.1 → E.10 (MAIN AGENT silhouette → full HarnessPattern recognition inside Orchestration practice)
  - E.5 → E.6 (constraint bullets → satellite mapping)
  - E.6 ↔ E.8 (same network, two ambient registers)
  - E.8 → E.9 (mitigations → Includes row with per-name copper-glow)
  - E.9 (Cursor quote) ↔ E.1 (Anthropic quote — same idea, two registers)
- Click-driven motion discipline observed (one click per speaker beat across all 6 new slides).
- Lucide icons render at correct stroke (1.5px) + color (copper-300) on E.6 satellites, E.8 pitfalls, and E.10 practices.
- Free-stack rule observed (`package.json` diff shows only `lucide-react` added — MIT licensed).
- Keyword highlights appear in copper-italic via the existing `highlight()` helper on every Plan B slide.

---

## Self-review

**Spec coverage check:**

| Spec section | Task |
|---|---|
| §3.2 `<NodeNetwork>` (signature primitive — 3 states) | Task 2 |
| §3.2 `<StrategyRings>` + particle-flow ambient | Task 4 |
| §3.2 `<PitfallIllustration>` (5 variants) | Task 6 |
| §3.2 `<PitfallCanvas>` | Task 7 |
| §3.2 `<HarnessPackage>` | Task 9 |
| §3.2 `<ThesisPanel>` | Task 10 |
| §3.2 `<HarnessPattern>` (CRITICAL CROSS-SPEC) | Task 12 |
| §3.2 `<PracticeCard>` | Task 13 |
| §3.2 `<PracticeGrid>` (1+7 reflow) | Task 14 |
| §3.3 Lucide icon library | Task 1 |
| §4.6 E.6 (4 advances + ambient + ladder rung 2) | Task 3 |
| §4.7 E.7 (5 advances + particle-flow ambient) | Task 5 |
| §4.8 E.8 (4 advances + hover-canvas-morph + chaos arrows) | Task 8 |
| §4.9 E.9 (5 advances + thesis + full ladder) | Task 11 |
| §4.10 E.10 (3 advances + interactive expand-shrink) | Task 15 |
| §4.11 E.11 (2 advances + photographic close) | Task 16 |
| §5.3 E ↔ I.3 cross-spec dependency | Task 12 (HarnessPattern at `src/components/`) |
| §6 Animation budget Plan B = 23 advances | Verified in Task 17 (steps tally to 4+5+4+5+3+2=23) |
| §8.1 Suggested file structure | Mirrored exactly |
| §8.3 Build order — Plan B steps 7–11, 13 | Tasks 2 (NodeNetwork), 4 (StrategyRings), 6+7 (Pitfall*), 9+10 (HarnessPackage+ThesisPanel), 12+13+14 (HarnessPattern+PracticeCard+PracticeGrid), 16 (E.11 last) |
| §8.4 NodeNetwork state-transition design | Embedded in Task 2 (all 3 states, layoutId per node) |
| §8.5 HarnessPattern cross-spec sharing | Task 12 — file lives at `src/components/HarnessPattern.tsx` |
| §8.5.1 PracticeGrid 1+7 reflow notes | Tasks 13 + 14 |
| §8.6 Particle-flow ambient (E.7) | Task 4 (per-ring kinetic via data-kinetic + ParticleAmbient layer) |
| §8.7 Hover-canvas-morph (E.8) | Task 7 (PitfallCanvas) + Task 8 (E.8 wires hover state) |
| §10 Acceptance criteria | "Acceptance criteria for Plan B" section above |

**Type consistency check:**

- `NodeNetworkState` (`"activated" | "stamped" | "compressed"`) is used identically in `NodeNetwork.tsx`, E.6, E.8, E.9.
- `SatelliteSpec` shape (`id`, `label`, `icon`) is consistent across `e6Content`, `e8Content`, `e9Content`.
- `PitfallKind` (`"default" | "conflict" | "confusion" | "poisoning" | "distraction"`) is exported from `PitfallIllustration.tsx` and consumed by `PitfallCanvas.tsx` + E.8.
- `PracticeIcon` (lucide icon name union) is exported from `PracticeCard.tsx` and consumed by `PracticeGrid.tsx` + `e10Content`.
- `PracticeSpec` is exported from `PracticeGrid.tsx` and matches the shape of items in `e10Content.practices`.
- `HarnessPattern` exposes `play: boolean` consistently between E.10's Orchestration card (where it's `true` when expanded) and any future I.3 use.

**Placeholder scan:**

Searched plan body for "TBD", "TODO", "implement later", "fill in details", "Add appropriate error handling", "Similar to Task". One TODO is intentional and documented: the E.11 hero photo (`public/heroes/e11-bridge.jpg`) may be staged with a placeholder if `gemini-image-gen` is unavailable, with a follow-up in `docs/plans/asset-todos.md`. No code placeholders in any task.

**Out-of-scope confirmations:**

- Plan A primitives (`<HoverPopover>`, `<ImpactLadder>`, `<NaiveVsProper>`, `<StructureSpine>`, `<FrameworkOrbit>`, `<TieredTechniqueGrid>`, `<TechniqueCard>`, `<TechniqueModal>`, `<LayerCard>`, `<LayerDemo>`, `<MultiAgentOrchestration>`) are CONSUMED here, not rebuilt.
- Section D click-granularity revisit is flagged open per spec §9 — not addressed.
- Final copper hex ladder + projection-scale font sizing are open per spec §9 — calibrated at projection-test time, not in this plan.
- I.3's `<HarnessCanvas>` is OUT OF SCOPE for this plan. The cross-spec contract is satisfied by placing `<HarnessPattern>` at `src/components/` (global). I.3's update to import it ships in the I.3 plan.
- E.4 / E.10 Escape-key close affordance is open per spec §9 — speaker can use × button or click-outside; Escape can be added in a follow-up if the keyboard-accessibility item lands.

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-05-09-foundation-core-section-e-plan-b.md`. Two execution options:

**1. Subagent-Driven (recommended)** — fresh subagent per task, two-stage review, fast iteration.

**2. Inline Execution** — execute tasks in this session via `superpowers:executing-plans` with checkpoints.

Which approach?
