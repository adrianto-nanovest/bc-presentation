// PROTOTYPE — throwaway (gh#16). Delete from main once a variant wins.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE QUESTIONS
//
// Two slides in the leader deck invent layout genres with no precedent in this
// codebase. Three radically different variants of each, on one throwaway dev
// route, so the answer is picked in a browser instead of in someone's head.
//
//   Slide 1 · Agentic Organization (Act II centrepiece)
//     Does hub-and-spokes read at projection distance, or does a ladder / grid
//     carry six pillars better? How does the focus walk dim the other five
//     without the slide going dark?
//
//   Slide 2 · The Capability Ladder (Act I closer)
//     How does an ASSERTED marker look different from an OPEN QUESTION without
//     a legend? Does the hr-group `web/` path-draw port cleanly into copper, or
//     is a rebuilt geometry cheaper?
//
// Both slides are brand-varying (slots 2 and 5 of #8), so every variant renders
// under both brands — toggle with `b`.
//
// ─────────────────────────────────────────────────────────────────────────────
// RUN IT
//
//   npm run dev  →  http://localhost:5173/?dev=proto16
//
//   ← →          cycle variant          Space / click   next step
//   1 / 2        pillars / ladder       Backspace       previous step
//   b            toggle brand           0               reset to step 0
//
// State is in the URL (`?dev=proto16&p=…&v=…&brand=…`) so any frame is
// shareable and reload-stable.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useState, type JSX, type ReactNode } from "react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { Slide } from "@/deck/Slide";
import { ladderBrief, pillarBrief, type Brand } from "./brief";

import { PillarsOrbit } from "./pillars-a-orbit";
import { PillarsStack } from "./pillars-b-stack";
import { PillarsSpine } from "./pillars-c-spine";
import { LadderStaircase } from "./ladder-a-staircase";
import { LadderAxis } from "./ladder-b-axis";
import { LadderBands } from "./ladder-c-bands";

// ───────────────────────── variant registry ─────────────────────────

export type SlideKey = "pillars" | "ladder";
export type VariantKey = "a" | "b" | "c";

interface ProtoVariant {
  name: string;
  render: (brand: Brand) => JSX.Element;
}

// Step counts are uniform across the variants of a slide, so flipping A→B→C
// holds the step and the three are actually comparable at the same beat.
//
// FINDING (see README): the pillar slide cannot be the "~4 steps" the issue
// budgeted. Six pillars × one leader-decision each is six beats, minimum.
const PILLAR_STEPS = 9; // 0 hub · 1 pillars · 2–7 focus walk · 8 closer
const LADDER_STEPS = 5; // 0 rungs · 1 asserted · 2 open · 3 aside+closer · 4 phases

const SLIDES: Record<
  SlideKey,
  {
    steps: number;
    label: string;
    // The prototype's own hardcoded figure, lifted from its brief. Published
    // through the number context (§3.5) so the variants' FigLabel can read it;
    // these are leader-deck roman numerals, not production letters.
    fig: { section: string; num: number; label: string };
    variants: Record<VariantKey, ProtoVariant>;
  }
> = {
  pillars: {
    steps: PILLAR_STEPS,
    label: "Agentic Org",
    fig: pillarBrief.fig,
    variants: {
      a: { name: "Orbit — hub & spokes", render: (b) => <PillarsOrbit brand={b} /> },
      b: { name: "Stack — decision ledger", render: (b) => <PillarsStack brand={b} /> },
      c: { name: "Spine — two columns", render: (b) => <PillarsSpine brand={b} /> },
    },
  },
  ladder: {
    steps: LADDER_STEPS,
    label: "Capability Ladder",
    fig: ladderBrief.fig,
    variants: {
      a: { name: "Staircase — port", render: (b) => <LadderStaircase brand={b} /> },
      b: { name: "Axis — above/below", render: (b) => <LadderAxis brand={b} /> },
      c: { name: "Bands — stacked", render: (b) => <LadderBands brand={b} /> },
    },
  },
};

const VARIANT_KEYS: VariantKey[] = ["a", "b", "c"];

// ───────────────────────── URL state ─────────────────────────

interface ProtoState {
  slide: SlideKey;
  variant: VariantKey;
  brand: Brand;
}

function readUrl(): ProtoState {
  const p = new URLSearchParams(window.location.search);
  const slide = p.get("p") === "ladder" ? "ladder" : "pillars";
  const v = p.get("v");
  const variant = VARIANT_KEYS.includes(v as VariantKey) ? (v as VariantKey) : "a";
  const brand = p.get("brand") === "berau" ? "berau" : "gems";
  return { slide, variant, brand };
}

function writeUrl(s: ProtoState) {
  const p = new URLSearchParams(window.location.search);
  p.set("dev", "proto16");
  p.set("p", s.slide);
  p.set("v", s.variant);
  p.set("brand", s.brand);
  window.history.replaceState(null, "", `?${p.toString()}`);
}

// ───────────────────────── route ─────────────────────────

export function Proto16Route() {
  const [state, setState] = useState<ProtoState>(readUrl);
  const { slide, variant, brand } = state;
  const def = SLIDES[slide];

  useEffect(() => writeUrl(state), [state]);

  const patch = useCallback(
    (next: Partial<ProtoState>) => setState((s) => ({ ...s, ...next })),
    [],
  );

  const cycleVariant = useCallback(
    (dir: 1 | -1) =>
      setState((s) => {
        const i = VARIANT_KEYS.indexOf(s.variant);
        const n = (i + dir + VARIANT_KEYS.length) % VARIANT_KEYS.length;
        return { ...s, variant: VARIANT_KEYS[n] };
      }),
    [],
  );

  return (
    // DeckProvider stays mounted across variant switches on purpose — the step
    // survives the flip, so A/B/C are compared at the same beat of the walk.
    <DeckProvider stepCounts={[def.steps]}>
      {/* Scoped here rather than in globals.css — nothing shared should have to
          be reverted when this directory is deleted. */}
      <style>{`@keyframes protoDraw { from { stroke-dashoffset: 1800; } to { stroke-dashoffset: 0; } }`}</style>
      <ProtoKeys state={state} onVariant={cycleVariant} onPatch={patch} />
      <Slide
        index={0}
        animationMode="step-reveal"
        canonicalPose={def.steps - 1}
        surface="dark"
        letter={def.fig.section}
        num={def.fig.num}
        sectionKey="opening"
      >
        {def.variants[variant].render(brand)}
      </Slide>
      <ProtoSwitcher state={state} onVariant={cycleVariant} onPatch={patch} />
    </DeckProvider>
  );
}

// Keyboard shell. useKeyboardNav is deliberately NOT mounted here — it owns
// ←/→ for slide navigation, and on this route those belong to the switcher.
function ProtoKeys({
  state,
  onVariant,
  onPatch,
}: {
  state: ProtoState;
  onVariant: (dir: 1 | -1) => void;
  onPatch: (p: Partial<ProtoState>) => void;
}) {
  // Reaching into the provider for step control the same way NavBar does.
  const { nextStep, prevStep, resetStep } = useDeck();

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.isContentEditable || t?.tagName === "INPUT" || t?.tagName === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "ArrowRight": e.preventDefault(); onVariant(1); break;
        case "ArrowLeft":  e.preventDefault(); onVariant(-1); break;
        case " ":
        case "Enter":
        case "ArrowDown":  e.preventDefault(); nextStep(); break;
        case "Backspace":
        case "ArrowUp":    e.preventDefault(); prevStep(); break;
        case "0":          e.preventDefault(); resetStep(); break;
        case "1":          e.preventDefault(); onPatch({ slide: "pillars" }); break;
        case "2":          e.preventDefault(); onPatch({ slide: "ladder" }); break;
        case "b":
        case "B":
          e.preventDefault();
          onPatch({ brand: state.brand === "gems" ? "berau" : "gems" });
          break;
        default: return;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [state.brand, onVariant, onPatch, nextStep, prevStep, resetStep]);

  return null;
}

// ───────────────────────── floating switcher ─────────────────────────

function ProtoSwitcher({
  state,
  onVariant,
  onPatch,
}: {
  state: ProtoState;
  onVariant: (dir: 1 | -1) => void;
  onPatch: (p: Partial<ProtoState>) => void;
}) {
  const { stepIndex } = useDeck();
  const def = SLIDES[state.slide];

  // A stray merge must never ship this bar to a room full of leaders.
  if (!import.meta.env.DEV) return null;

  return (
    <div
      data-no-advance
      style={{
        position: "fixed",
        left: "50%",
        bottom: 18,
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "stretch",
        gap: 1,
        padding: 1,
        background: "#00e0b8",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        userSelect: "none",
      }}
    >
      <Seg>
        <Btn on={state.slide === "pillars"} onClick={() => onPatch({ slide: "pillars" })}>
          1 · PILLARS
        </Btn>
        <Btn on={state.slide === "ladder"} onClick={() => onPatch({ slide: "ladder" })}>
          2 · LADDER
        </Btn>
      </Seg>

      <Seg>
        <Btn onClick={() => onVariant(-1)}>◀</Btn>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            background: "#062b26",
            color: "#00e0b8",
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          {state.variant.toUpperCase()} — {def.variants[state.variant].name}
        </div>
        <Btn onClick={() => onVariant(1)}>▶</Btn>
      </Seg>

      <Seg>
        <Btn on={state.brand === "gems"} onClick={() => onPatch({ brand: "gems" })}>
          GEMS
        </Btn>
        <Btn on={state.brand === "berau"} onClick={() => onPatch({ brand: "berau" })}>
          BERAU
        </Btn>
      </Seg>

      <Seg>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            background: "#062b26",
            color: "#6ee7d5",
            whiteSpace: "nowrap",
          }}
        >
          STEP {stepIndex + 1}/{def.steps}
        </div>
      </Seg>
    </div>
  );
}

function Seg({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", gap: 1 }}>{children}</div>;
}

function Btn({
  children,
  onClick,
  on = false,
}: {
  children: ReactNode;
  onClick: () => void;
  on?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        cursor: "pointer",
        padding: "8px 12px",
        background: on ? "#00e0b8" : "#062b26",
        color: on ? "#04211d" : "#6ee7d5",
        fontFamily: "inherit",
        fontSize: "inherit",
        letterSpacing: "inherit",
        fontWeight: on ? 600 : 400,
      }}
    >
      {children}
    </button>
  );
}
