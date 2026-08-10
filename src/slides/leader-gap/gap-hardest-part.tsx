// THE HARDEST PART IS NOT THE TOOLS — the FIRST slide of THE GAP, and the first
// argument a leader deck makes after the agenda.
//
// Spec §6.1 (content) · §6.2 (the shadow-AI escalation constraint this slide must not
// spend) · §4.3's leader deck table · §11's Phase 7 row. The visual contract: one
// figure component (`./components/HardestPartBeats.tsx`, with its mount keyframes in
// `./components/hardest-part.css`), one geometry module (`./hardest-part-geometry.ts`),
// all copy in `./content.ts`.
//
// REDESIGNED 2026-08-10 BY OWNER CALL, productionized from the B.1 prototype's
// variant B ("TWO SPEEDS"; the prototype directory left the tree in the same change).
// The first cut printed §6.1 as five bands of prose and ACCUMULATED them — by its
// last pose the stage held a quote, a bar, eight list rows, two paragraphs and a
// closer at once, which is a wall of text in front of top management. The redesign
// makes the gap a difference in SPEED and lets the motion argue it, the E.12 shape:
// one visual argument per pose, the presenter carrying the connective prose verbally.
//
// 3 POSES, one argument each — and they MORPH rather than replace, because the lane
// that races is the lane that gets dissected and then scored:
//   0 — THE RACE. One signature starts two progress lanes. Tool access fills to
//       100% in 850ms and flags DAY 1 · DONE — EVERYONE AT ONCE; organizational
//       capability crawls to a sliver and its day counter keeps ticking. The
//       verdict lands last: only one of these arrives by signature.
//   1 — THE ANATOMY. The access lane thins in place; the capability lane grows and
//       its unrun distance names the five structural things that fill it. None of
//       it can be procured.
//   2 — THE SUMMARY. Both lanes park as a two-line scoreboard, and the evidence
//       lands beneath: the verbatim BCG/McKinsey statistic WITH its attribution,
//       the split bar cut from the statistic's own fraction, and the closer.
//
// THE STATISTIC IS REUSED VERBATIM AND CARRIES ITS SOURCE ON-SLIDE (§6.1's research
// verdict, `docs/researches/internal-hr-group.md` §1.1/§3.1) — now at pose 2, which
// is `canonicalPose`, so the PDF and PPTX exports print the number, its attribution
// and the deck's conclusion on one frame. Anything lower would export a race with no
// number or an anatomy with no source.
//
// AND IT HAS NO BRAND AXIS — unchanged from the first cut and argued at length in
// `./content.ts`: §4.4's seven brand × deckSet slots do not list this slide, the
// statistic is a third party's, and the gap between procurement and capability is
// nobody's local fact. THIS FILE IMPORTS NO `VARIANT` AT ALL; there is no
// `…For(brand)` resolver to look for, and the test mounts the same component under
// both leader brands to prove the two rooms read identical bytes.
//
// WHAT THIS SLIDE DELIBERATELY DOES NOT SAY, and the first item is a constraint the
// SPEC states rather than a judgement made here: §6.2 owns "there is no guidance, so
// people improvise" and owns SHADOW AI as `condition` — the deck's three shadow-AI
// passes must share no image and no statistic, so nothing on this stage mentions
// shadow AI, SOPs, missing guidance or improvisation. §6.3's first-person Nanovest
// failures, §6.4's pattern across them and §6.5's L1–L5 rungs are likewise absent;
// `./content.ts` records each boundary beside the copy it constrains.
//
// THE LETTER IS NOT AUTHORED HERE. This slide composes as the FIRST of the `gap`
// run — B.1 in today's two LEADER decks, and in no standard deck (§3.4 R2, held by
// the composition half of `tests/unit/gap-hardest-part.test.tsx`). `FigLabel` takes
// a LABEL only; no rendered string under `src/slides/leader-gap/` may name either
// the letter or the number.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { HardestPartBeats } from "./components/HardestPartBeats";
import { gapHardestPartContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function GapHardestPart() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason
          every recent leader slide records: the geometry's eyebrow slot assumes a
          headline row that ends at y=122, and 46px would end it at 128.3.

          THE HEADLINE IS §6.1'S CLAIM AS A SENTENCE, and it lands BEFORE the race
          on purpose — the room should know what the two lanes are evidence FOR
          before the fast one finishes. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      {/* ONE PERSISTENT SCENE, not a pose switch: the figure's elements keep
          identity across poses and morph between them — see the component header
          for why the E.12 remount pattern was the wrong tool here. */}
      <HardestPartBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the
// decision — see the header.
export const gapHardestPartSlide: SlideDef = {
  id: "gap-hardest-part",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapHardestPart />,
};
