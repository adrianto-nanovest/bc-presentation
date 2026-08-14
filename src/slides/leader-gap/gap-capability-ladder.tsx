// THE CAPABILITY LADDER — the slide a leader places themselves on.
//
// Spec §6.5 (content) · §7.2 (the visual contract) · §4.4 slot 2 (the brand axis).
// Productionized from the #16 staircase prototype (variant A), which the owner
// picked on a browser walkthrough of all six #16 variants — the verdict §7.2
// records — and REWRITTEN, not lifted: the prototype is inline-styled end to
// end, untested, and interpolates its markers between tread centres, which puts
// a fractional marker in mid-air (see `./geometry.ts`).
//
// WHY THE SLIDE IS SHAPED THIS WAY. A leader who places themselves on a rung has
// self-diagnosed; a leader who is TOLD where they sit argues with the next slide.
// So the ladder is drawn before anything is on it, and the two marks that land on
// it carry different epistemic status — one is a claim with a citation, one is a
// question with its evidence. §6.5: no AI-adoption assessment data exists for
// either brand (confirmed on #8), and this slide implies none.
//
// 3 poses, one argument each — the owner's step plan of 2026-08-13, which cut five
// to three by putting everything the deck can EVIDENCE on one pose:
//   0 — THE LADDER, AND WHAT WE CAN NAME ON IT. Five rungs; the tech function
//       (GEMS asserts DigiTech at ≈L3 on Google Cloud's citation, Berau asserts
//       MineTech at ≥L2 on its own — one slot, and never blank whatever fills it,
//       #16 finding 4); and our own mark at L3–L4. The two marks share a
//       pose because they share a property: each arrives with its own evidence
//       attached, one cited outside and one self-reported. The pose SEQUENCES
//       itself over about 1.8s (`BEAT` in the figure) so five things do not land
//       at once, but it is one keypress.
//   1 — THE OPEN QUESTION. The rest of the organisation, asked rather than placed.
//   2 — THE GAP. The stretch of staircase between the question and the claim
//       lights up, and the closer names what that distance is. Per brand, because
//       a ladder carrying no claim has no distance to measure and would be
//       inventing one.
//
// WHY THE MARKS ARE NO LONGER ONE PER POSE. The retired shape spent poses 1, 2 and
// 3 on three marks and pose 4 on the closer, which read as a scoreboard filling in
// — three placements, then a sentence. The argument is not three placements; it is
// ONE distance, and a distance needs both of its ends on the stage before the room
// can be asked about the middle.
//
// `canonicalPose: 2` — the fullest pose, and the only one the PDF and PPTX exports
// print. A canonical pose short of the last one would export a ladder whose gap
// nobody outside the room ever sees.
//
// THE LETTER IS NOT AUTHORED HERE, and this slide is the reason that rule earns
// its keep — it has now printed SIX different numbers without this file being opened
// for any of them. It is the LAST slide of the `gap` run (§4.3, §6.5), and it was that
// run's only slide until gh#65 put `gap-hardest-part` (§6.1) in front of it: it printed
// B.1 then, B.2 after gh#65, B.3 after gh#66's `gap-no-sop` (§6.2), B.5 once gh#67
// landed §6.3 and §6.4 as two rows between gh#66's and this one, B.6 for the duration of
// the merge review's third row, and B.4 now that all three of those retired into gh#67's
// one `gap-failures-pattern`. B.4 is the LAST number this slide will hold: the `gap` run
// is COMPLETE at §4.3's five sections, so nothing more inserts in front of it.
// (An earlier revision of this comment
// credited "#55–#58" with those inserts. Those issue numbers were never right:
// #55 is C.1's focus walk and #56–#58 are D.2–D.4; the four second-tier `gap`
// slides landed as gh#65, gh#66 and gh#67.) Its own arrival pushed the loop slide from
// E.12 to F.12 in both leader decks, and gh#54's `shape` run has since pushed it to
// G.12 — one insert each, both in front of the curriculum, both costing no edit to any
// slide behind them (§3.4 R2). gh#65 pushed no letter at all and renumbered only
// inside this run, which is R3 read from the other end. `FigLabel`
// takes a label only; the letter and number come from the composed deck (§3.5).
//
// NO LEGEND, anywhere. See `./components/CapabilityLadder.tsx` for the four
// encodings that replace one.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { CapabilityLadder } from "./components/CapabilityLadder";
import {
  capabilityLadderFor,
  gapLadderContent as C,
  type LadderBrandBlock,
} from "./content";

// ───────────────────── slide ─────────────────────

export function GapCapabilityLadder({ content }: { content: LadderBrandBlock }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <CapabilityLadder content={content} pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// Resolved ONCE, at module scope, exactly as `a1-what-youve-seen.tsx` and
// `title.tsx` resolve theirs and for the same reason: `VARIANT` resolves at module
// scope, so one module epoch holds one brand and the URL that decided it cannot
// change without a reload. The component below it takes the resolved block as a
// PROP and reads no variant of its own — which is what lets one test mount both
// brands' ladders in the same epoch and compare them (§4.4 slot 2).
const BRAND_CONTENT = capabilityLadderFor(VARIANT.brand);

export const gapCapabilityLadderSlide: SlideDef = {
  id: "gap-capability-ladder",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapCapabilityLadder content={BRAND_CONTENT} />,
};
