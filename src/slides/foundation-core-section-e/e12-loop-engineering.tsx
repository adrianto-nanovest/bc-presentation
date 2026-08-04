// E.12 — LOOP ENGINEERING
//
// The slide the whole of section E has been walking toward: the three layers make
// one run, and the loop makes it repeat (§8.2). NOT A FOURTH LAYER — the rings are
// space and the loop is time, which is why nothing here is drawn as a ring.
//
// 1 step, and that is this slice's whole contract:
//   0 — THE MINDSET SHIFT. A diptych: prompting turn by turn against looping as a
//       system you design once, with the two practitioners who renamed the job
//       beneath it. See `./components/E12MindsetDiptych.tsx`.
//
// gh#49 raises this to the final `steps: 3` / `canonicalPose: 2` as poses 1 (the
// big loop's four parts on a hover rail) and 2 (the morning-triage worked
// example) land. Declaring `steps: 1` now is deliberate: the deck is walkable and
// exportable at every commit, and the export pipeline pauses at a pose that
// exists. Nothing outside this file and the content module has to move when the
// count grows.
//
// THE FIGURE IS NOT AUTHORED HERE. `FigLabel` takes a label only — the letter and
// the number derive from this slide's position in the composed deck (§3), so the
// same file prints E.12 in all five decks today and moves with the deck later
// without an edit. It also pushes the bridge behind it to E.13. The LABEL is
// passed at the call site rather than held in `./content.tsx`, as at every other
// FigLabel in the deck: it is the figure's own mono caption, not slide copy, and
// the content module holds what the audience reads as prose.
//
// NO QUALIFIER STRIP. The mono line under the headline is deleted by owner call
// (§8.3): the term "loop engineering" is carried by the FigLabel and by the two
// quotes, and a strip repeating it would be the third copy of one word.
//
// OWNER CORRECTIONS to the prototype's form, decided 2026-08-04 (gh#48), all four
// of which live in the diptych component and its content:
//   1. one-line left verdict, so both verdict dividers sit at the same y
//   2. Steinberger left (with his affiliation), Cherny right and one line
//   3. each quote block's left edge aligns with its panel's left border
//   4. EVERY card box reacts to hover — a hover affordance on some boxes and not
//      others reads as broken interactivity in front of a room. Rank stays a
//      colour tier, never opacity.
//
// Productionized from `src/slides/prototype-gh19b-e12-loop-engineering/`, and
// rewritten rather than lifted: the prototype is inline-styled, untested, and
// carries dev-only key handlers. CSS vars only, no hex literals; no new fonts or
// libraries.
import type { SlideDef } from "@/deck/types";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { E12MindsetDiptych } from "./components/E12MindsetDiptych";
import { e12Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E12LoopEngineering() {
  return (
    <>
      <FigLabel label="LOOP ENGINEERING" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <E12MindsetDiptych />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e12Slide: SlideDef = {
  id: "e12-loop-engineering",
  steps: 1,
  canonicalPose: 0,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "fundamentals",
  render: () => <E12LoopEngineering />,
};
