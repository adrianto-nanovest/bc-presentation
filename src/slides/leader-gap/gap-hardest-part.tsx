// THE HARDEST PART IS NOT THE TOOLS — the FIRST slide of THE GAP, and the first
// argument a leader deck makes after the agenda.
//
// Spec §6.1 (content) · §6.2 (the shadow-AI escalation constraint this slide must not
// spend) · §4.3's leader deck table · §11's Phase 7 row. No #16 prototype covers it,
// so nothing is productionized from one; the visual contract is settled here the way
// the five leader slides before it settled theirs — one figure component
// (`./components/HardestPartBeats.tsx`), one geometry module
// (`./hardest-part-geometry.ts`), all copy in `./content.ts`.
//
// THE STATISTIC IS REUSED VERBATIM AND CARRIES ITS SOURCE ON-SLIDE. §6.1 is one line
// — "The hardest part is not the tools (70%). Opens the gap between tool access and
// organizational capability." — and the research verdict behind it is explicit
// (`docs/researches/internal-hr-group.md` §1.1, §3.1, and the slide-by-slide table:
// "Reuse quote verbatim"). So the slide prints BCG/McKinsey's sentence unedited, with
// the attribution under it rather than in a footnote, and `./content.ts` records what
// that attribution may and may not claim: no read date and no study title, because we
// hold neither.
//
// AND IT HAS NO BRAND AXIS — the one thing about this file that will surprise a reader
// arriving from any of its five predecessors. `gap-capability-ladder` (next door),
// `shape-agentic-org`, `invest-own-proof`, `invest-security` and `invest-subscription`
// each resolve a brand block at module scope, because each puts an organisation's own
// evidence in front of that organisation. THIS FILE IMPORTS NO `VARIANT` AT ALL:
// §4.4's seven brand × deckSet slots do not list this slide, the statistic is a third
// party's and the gap between procurement and capability is nobody's local fact, so a
// `Record<Brand, …>` here would be one honest entry and two written by inventing
// evidence. `mandate-enablement` made the same call for the same shape of reason and
// is the precedent, not an outlier — the axis exists where the EVIDENCE varies.
// `./content.ts` argues it at length; the consequence worth knowing before you read
// the component is that there is no `…For(brand)` resolver to look for.
//
// WHY THE SLIDE IS SHAPED THIS WAY. The claim is the headline; everything under it is
// the claim made unarguable in one more form each time. The statistic is quoted, then
// DRAWN as one split bar in the ratio the statistic states, then each half of that bar
// is FILLED with what it contains — and only then is the gap named. A room that hears
// "70%" as rhetoric stops hearing it that way once the 70% is a rectangle with five
// structural things inside it and the 30% is a smaller rectangle holding three things
// a purchase order buys.
//
// 4 POSES, one argument each:
//   0 — THE STATISTIC. The quotation verbatim, its attribution 8px under it, and the
//       same number drawn as two masses with their own percentages. The room reads
//       the evidence and the picture of the evidence before it is asked anything.
//   1 — WHAT EACH HALF IS. Five structural things in the 70% — decision rights,
//       workflow redesign, skills, incentives, measurement — against the three things
//       money already buys. Both columns fill in PARALLEL, and the narrow one finishes
//       first, which is the claim happening inside the reveal.
//   2 — THE GAP. One copper rule closes the split, and the two halves of §6.1's own
//       sentence land side by side: tool access is procured and instant, organizational
//       capability is earned and slow. This is the AC's sentence and the frame the rest
//       of this run pays into.
//   3 — THE FRAME. The closer, full width, last: the tools are the 30%, and everything
//       after this is the 70%.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING — the property the pose map is
// checked against rather than the pose count. Pose 0 rests on a quoted claim WITH its
// attribution, never on an unsourced number. Pose 1's last arrival is the fifth
// structural row, so the pose rests on the full contents of the half it is about
// rather than on a partial list. Pose 2's last arrival is the CAPABILITY line, not the
// access line — a pose that rested on "access is procured" would rest on the easy
// half. Pose 3's last arrival is the closer, which frames every band above it.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports
// print. Anything lower would export a stage whose largest object is a third party's
// statistic with no sentence saying what this deck concludes from it, which for this
// slide in particular is the one way it could travel badly: an exported page that
// quotes a number and asks for nothing is a slide somebody else can re-caption.
//
// WHAT THIS SLIDE DELIBERATELY DOES NOT SAY, and the first item is a constraint the
// SPEC states rather than a judgement made here. §6.2 owns "there is no guidance, so
// people improvise" and owns SHADOW AI as `condition`, and it says in the spec's own
// voice that the deck's three shadow-AI passes must share no image and no statistic
// because "the escalation degenerates into repetition the moment two of the three
// passes share an image or a statistic". So nothing on this stage mentions shadow AI,
// SOPs, missing guidance or improvisation: a first mention here would spend §6.2's
// beat before that slide exists to make it. §6.3's first-person Nanovest failures,
// §6.4's pattern across them and §6.5's L1–L5 rungs are likewise absent, and
// `./content.ts` records each boundary beside the copy it constrains.
//
// THE LETTER IS NOT AUTHORED HERE. This slide composes as the FIRST of the `gap` run,
// which today means B.1 — the figure `gap-capability-ladder` printed while it was the
// run's only slide, and which the ladder gives up the day this one lands in front of
// it (§3.4 R2). Neither number is written down in either file: `FigLabel` takes a
// LABEL only, the letter and number come from the composed deck (§3.5), and no
// rendered string under `src/slides/leader-gap/` may name either.
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
          every recent leader slide records: the content grid starts at y=156,
          `.slide-content`'s own top, and 46px would end the headline row at 128.3
          instead of 122.

          THE HEADLINE IS §6.1'S CLAIM AS A SENTENCE, and it lands BEFORE the
          statistic on purpose — the number is the evidence for the claim, not the
          other way round, and a stage that opened on "70%" would make the room work
          out what it was evidence for. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <HardestPartBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the
// decision — see the header. This is the second leader-only slide in the tree that
// imports no `VARIANT` at all (`mandate-enablement` is the first), which is also what
// lets its test mount the same component under both leader brands and prove the two
// rooms read identical bytes.
export const gapHardestPartSlide: SlideDef = {
  id: "gap-hardest-part",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapHardestPart />,
};
