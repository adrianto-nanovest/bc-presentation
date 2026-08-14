// D.2 — THE SURFACE AND THE SOURCE.
//
// ═══ WHY THIS SLIDE EXISTS, AND WHY IT SITS HERE. D.1 leaves the room holding a gap it has
// not explained: almost everyone adopted, almost nobody profits. This slide is the
// mechanism. Making the picture became free; making the thing under the picture did not, so
// the common position is a stage full of finished-looking results with nothing behind them.
//
// IT ALSO ARMS THE SLIDE AFTER IT. D.3 prints the room's own figures with an epistemic mark
// on every card, and without this stage in front of it those marks read as pedantry. After
// it, they read as the discipline the room was just asked to want. The deck has been
// PRACTISING this argument — attribution on every statistic, a mark on every claim, no
// citation that fakes a precision it does not have — and never once stating it.
//
// ═══ THE HEADLINE IS THE CLAIM AND THE FIGURE IS ITS EVIDENCE, in that order. "You are
// buying the work, not the picture." is on the stage before the picture, which is what stops
// pose 0 from reading as a specimen in search of a point — and what makes the four rows of
// pose 1 read as the same subject rather than as a second topic.
//
// THE TITLE CARRIES NO MEASUREMENT, and that is the 2026-08-15 correction. It used to print
// this slide's two figures, which made the largest type on the stage a stopwatch reading and
// left the room to work out the claim for itself. The figures now sit beside the column that
// measures them; `./content.ts`'s note on `headline` carries the whole argument.
//
// ═══ FIVE STEPS, AND THE FULLEST IS THE LAST. `canonicalPose` is 4 because that is the pose
// PDF and PPTX export: the three questions AND the sentence under them. Any earlier pose
// exports an argument with its conclusion missing.

import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { ShowcaseTrapBeats } from "./components/ShowcaseTrapBeats";
import { investShowcaseTrapContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestShowcaseTrap() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason all five
          siblings record: the figure starts at y=156, which is `.slide-content`'s own top,
          and 46px would end the headline row at 128.3 instead of 122. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <ShowcaseTrapBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const investShowcaseTrapSlide: SlideDef = {
  id: "invest-showcase-trap",
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestShowcaseTrap />,
};
