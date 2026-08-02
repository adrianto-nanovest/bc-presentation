// ─────────────────────────────────────────────────────────────────────────
// PROTOTYPE — THROWAWAY. gh#18. Not part of the deck. Delete this directory
// once the call is made.
//
// THE QUESTION (gh#18): is left-list + right-canvas actually the best form for
// teaching a CYCLE? The sibling prototype (gh#17) builds the fixed skeleton;
// this one is the control. Same content brief, free rein on layout, animation
// and interaction mechanism. If a variant here wins, the skeleton was wrong.
//
// THE PLAN: three structurally different variants of E.12, switchable via
// `?variant=`, mounted on the deck's existing `?dev=` escape hatch so they
// render inside a real <Slide> — real 1280×720 stage, real scaling, real
// NavBar, real fonts and tokens.
//
//   A · THE DIAL   — no list. Five stations ON one open ring; a single YOU
//                    block sits in the ring's gap holding both of its ends.
//   B · THE SCORE  — no ring. Full-width bands on a time axis; BUDGET and GATE
//                    become positions in time, and the five decisions run
//                    left-to-right under the elements they control.
//   C · THE SPEC   — no diagram. A filled-in loop spec; the abstraction and
//                    the Friday 4 PM example are the same object.
//
// RUN:  npm run dev  →  http://localhost:5173/?dev=proto18&variant=A
//       (sibling: ?dev=proto17 — the fixed-skeleton canvas)
//
// JUDGE AGAINST (shared decision rule, gh#10):
//   (a) does the chain→ring fold — or whatever replaces it — read at
//       projector distance?
//   (b) can the facilitator pace it by hover, with no Space press?
//   (c) does it hold at `steps: 2`?
// ─────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { useKeyboardNav } from "@/deck/useKeyboardNav";
import { Slide } from "@/deck/Slide";
import { PrototypeSwitcher } from "./PrototypeSwitcher";
import { VariantA, variantAName } from "./VariantA";
import { VariantB, variantBName } from "./VariantB";
import { VariantC, variantCName } from "./VariantC";

/** The dev key that reaches this prototype: `?dev=proto18`. */
export const PROTO18_DEV_KEY = "proto18";

const KEYS = ["A", "B", "C"] as const;
const NAMES: Record<string, string> = {
  A: variantAName,
  B: variantBName,
  C: variantCName,
};

// The brief fixes `steps: 2` — decision rule (c). Every variant must hold at
// this count, so the host hard-codes it rather than letting a variant opt out.
const STEPS = 2;

function readVariant(): string {
  if (typeof window === "undefined") return "A";
  const v = (
    new URLSearchParams(window.location.search).get("variant") ?? "A"
  ).toUpperCase();
  return (KEYS as readonly string[]).includes(v) ? v : "A";
}

function PrototypeStage() {
  useKeyboardNav();
  const { stepIndex } = useDeck();
  const [variant, setVariant] = useState(readVariant);

  // Keep the URL in step so a variant is shareable and reload-stable. The deck
  // has no router — `replaceState` is the whole mechanism.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("dev", PROTO18_DEV_KEY);
    url.searchParams.set("variant", variant);
    window.history.replaceState(null, "", url.toString());
  }, [variant]);

  return (
    <>
      <Slide
        index={0}
        animationMode="step-reveal"
        canonicalPose={1}
        surface="dark"
        section="E"
      >
        {variant === "A" && <VariantA />}
        {variant === "B" && <VariantB />}
        {variant === "C" && <VariantC />}
      </Slide>
      <PrototypeSwitcher
        keys={KEYS}
        names={NAMES}
        current={variant}
        onChange={setVariant}
        status={`step ${stepIndex} / ${STEPS - 1}`}
      />
    </>
  );
}

export function Proto18Route() {
  return (
    <DeckProvider stepCounts={[STEPS]}>
      <PrototypeStage />
    </DeckProvider>
  );
}
