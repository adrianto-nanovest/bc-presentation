// MIDDLE-OUT — §4.3's last `shape` slide, and the one that hands the deck over.
//
// Issue #68, Phase 7. No #16 prototype covers it, so nothing is productionized from
// one; the visual contract is settled here the way `leader-gap/gap-no-sop.tsx` settled
// its own — one figure component (`./components/MiddleOutBands.tsx`), one geometry
// module (`./middle-out-geometry.ts`), one walk (`./middle-out-walk.ts`), and every
// string in `./content.ts`.
//
// WHY THE SLIDE EXISTS. Section C has already said what an agentic organisation IS
// (C.1's ring) and what one looks like in this company (C.2). Neither says how it
// arrives. The room in front of this deck is division heads, and the sentence they are
// waiting for — the one that decides whether anything in the previous forty slides
// happens — is whose job the rollout is. This slide answers it with an org chart: the
// top holds the mandate and cannot see an ordinary Tuesday, the bottom holds the work
// and cannot authorise a change to it, and the middle holds both plus the one thing
// neither holds — people who copy what it does, because they watched it.
//
// WHY THE SLIDE IS SHAPED THIS WAY. THREE IDENTICAL STRIPS, AND THE MIDDLE ONE ENDS UP
// BRIGHTEST. Every equality in the figure is deliberate — one height, one width, one
// left edge, one placement function — so that the only difference between the three
// rows is what each one says, and so that the ranking, when it lands, is unmistakably
// the ARGUMENT rather than a decoration. An org chart whose brightest row is the top
// row is the picture the room already has; this one inverts it, and the inversion is
// the takeaway. `./components/MiddleOutBands.tsx` holds the tier table that draws it and
// `./middle-out-geometry.ts` holds the equalities that stop it becoming a ladder — §6.6
// refuses a third ladder beside L1–L5 and P0–P3 in as many words, and three stacked
// bands are one careless number away from being one.
//
// FIVE POSES, one argument each. `./middle-out-walk.ts` owns WHEN each lands and names
// the two that are not counted; this is what each one SAYS:
//   0 — THE ORGANISATION. Three bands, their row names, and the standing kicker that
//       says the middle is this room. Nothing is ranked and nothing is claimed yet; the
//       room's only job is to find itself in one of the three rows.
//   1 — THE TOP. What the board and the C-suite hold, and the one thing they cannot do.
//   2 — THE BOTTOM. The same two rows for the teams — the symmetry is the point: two
//       structural facts, neither of them anybody's fault.
//   3 — THE MIDDLE, and the pose the figure changes colour on. Its two rows arrive AND
//       it lights, because the light and the claim are one event: the band gets brighter
//       BECAUSE of what has just been said about it.
//   4 — THE TWO TRANSLATIONS AND THE CLOSER. One rule running down and one running up,
//       simultaneous and offset in x so they can never read as one scale, the label they
//       share at the origin, the two lines they carry, and the sentence the whole chart
//       exists to earn.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING. Poses 1 and 2 each finish a
// WHOLE band — what it holds and what it cannot do — rather than laying three `holds`
// rows and then three limits, which would leave pose 1 resting on a stage that says only
// that everybody has something. Pose 3 is the conclusion those two were evidence for.
// Pose 4's last arrival is the closer, which frames every band above it.
//
// `canonicalPose: TRANSLATION_POSE` — the fullest pose, and the only one the PDF and
// PPTX exports print. IMPORTED AND NOT TYPED, for the same reason `steps` is: it is "one
// past the last band", so a fourth band moves it, and a literal 4 would silently pin the
// export to a page where the last band's claims are still arriving. Any lower pose is a
// half-made argument on a page that cannot explain itself — pose 3 exports a chart with
// a brightly ranked middle row and no statement of what that row DOES, which is the one
// way this slide could travel badly: a page that appears to rank a layer of management
// above the board, with the translations that justify it missing.
//
// NO BRAND AXIS, AND ISSUE #68 SAYS SO IN AS MANY WORDS: identical copy under both
// brands. So this file imports no `VARIANT` and there is no `…For(brand)` resolver to
// look for — the fourth leader slide to make that call, after `gap-hardest-part`,
// `gap-no-sop` and `mandate-enablement`. §4.4's seven brand × deckSet slots do not list
// this slide, and an ORG CHART is not an organisation's own evidence: every organisation
// in this group has a board, division heads and teams, and naming one of them would be
// inventing a fact to fill a fork. What it buys is a test that mounts the same component
// under both leader brands and compares byte for byte.
//
// THE LETTER IS NOT AUTHORED HERE. This slide composes as the THIRD of the `shape` run
// today and becomes the fourth once `shape-tam-kotter` inserts ahead of it (§4.3), so
// neither figure is written down in any file under `src/slides/leader-shape/`:
// `FigLabel` takes a LABEL only and the composer derives the rest (§3.5).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { MiddleOutBands } from "./components/MiddleOutBands";
import { shapeMiddleOutContent as C } from "./content";
import { STEP_COUNT, TRANSLATION_POSE } from "./middle-out-walk";

// ───────────────────── slide ─────────────────────

export function ShapeMiddleOut() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason every
          recent leader slide records: the chart starts at y=156, `.slide-content`'s own
          top, and 46px would end the headline row at 128.3 instead of 122, leaving the
          kicker at `KICKER_TOP` = 134 with 6px of air instead of 12.

          THE HEADLINE REFUSES ONE MODEL AND NAMES THE OTHER, in that order, and it is
          measured to ONE line under BOTH faces — see `HEADLINE_BUDGET_CHARS` in
          `./middle-out-geometry.ts`, which exists because the drafted line wrapped on the
          Georgia fallback and painted straight through the kicker's shelf. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <MiddleOutBands pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision —
// see the header.
export const shapeMiddleOutSlide: SlideDef = {
  // The file's basename, frozen at the moment the file was named, and not a section
  // reference: this slide prints C.3 in today's leader decks and C.4 the day
  // `shape-tam-kotter` lands, under an id that never changes.
  id: "shape-middle-out",
  // FIVE, IMPORTED AND NOT TYPED. `STEP_COUNT` is `chart + one beat per band +
  // translations`, counted off `shapeMiddleOutContent.bands` — so a fourth band makes
  // this six on its own. A literal `5` is how that fourth band's claims become a pose
  // the deck can never reach (`DeckContext` clamps at `steps - 1`): no error, no blank
  // slide, no failing test, just one band whose claims are never made and a set of
  // translations that arrive while a band is still unargued.
  steps: STEP_COUNT,
  // The last pose, and imported for the same reason — see the header on why the export
  // may not pause anywhere earlier.
  canonicalPose: TRANSLATION_POSE,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "shape",
  render: () => <ShapeMiddleOut />,
};
