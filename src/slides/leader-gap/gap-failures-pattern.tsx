// THREE FAILURES, ONE SHAPE — §6.3 and §6.4 on ONE stage, the THIRD slide of this
// section's run.
//
// WHY ONE SLIDE AND NOT TWO. §6.3 and §6.4 shipped on one ticket (gh#67) because §6.4 has
// no content of its own — it is the SHAPE of §6.3. Played as two slides the pair spent two
// stages saying one thing, and the second stage re-read the first from memory. This slide
// puts the evidence and its shape in one field of view: three phase cards carrying the
// record, then the three lessons and the shift those lessons license as the slide's second
// and final step. gh#67 originally landed the pair; the merge replaced both after a
// side-by-side review of three visual candidates, and the two parents
// (`gap-three-failures`, `gap-the-pattern`) retired with the two losing candidates.
//
// WHAT THE FIGURE IS. `./components/FailuresPatternTriptych.tsx` owns it and documents it
// at length: three cards side by side, each crowned by a small animated plate that draws
// its failure without words, each printing the phase in full at pose 0 — and all three
// CONTRACTING at pose 1 to the one lesson they reduce to, which frees the bottom half of
// the stage for the shift. Sameness is an argument made side by side, and sameness is the
// whole claim.
//
// 2 POSES, one argument each:
//   0 — THE RECORD. Headline and all three phases, complete: a pattern cannot be argued
//       from a partial list.
//   1 — THE LESSONS, AND THE SHIFT. Each card reduces to `PHASE n / X OVER Y / the quote`;
//       the two columns of the shift and the closing question arrive underneath.
//
// `canonicalPose: 1` — the fullest pose; the exports print the shift, never a record with
// nothing owning it.
//
// NO BRAND AXIS — imports no `VARIANT`, like every other file in this directory that
// confesses: these failures are OURS in every room. THE LETTER IS NOT AUTHORED HERE.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FailuresPatternTriptych } from "./components/FailuresPatternTriptych";
import { gapFailuresPatternContent as C } from "./content";

export function GapFailuresPattern() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px, the leader-tree shelf rule. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <FailuresPatternTriptych pose={stepIndex} />
    </>
  );
}

export const gapFailuresPatternSlide: SlideDef = {
  id: "gap-failures-pattern",
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapFailuresPattern />,
};
