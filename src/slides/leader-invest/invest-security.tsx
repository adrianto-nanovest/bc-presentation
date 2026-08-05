// WHERE THE DATA GOES, AND WHAT ANSWERS IT — the third slide of the WHY INVEST run, and
// the one §12.2 calls the highest-consequence place in the deck to be wrong.
//
// Spec §6.7 (D.4's three beats) · §4.4 slot 4 (the on-prem brand axis) · §8.1 / §6.4 (B.4's
// numbers, which beat 1 re-quotes) · §12.2 (the vendor-claim gate) · §6.2 (the shadow-AI
// escalation: B.2 as CONDITION, D.3 as RATIONAL BEHAVIOUR, this slide's beat 2 as EXPOSURE,
// and no image or statistic shared between any two of them) · §11's Phase 6 row. No #16
// prototype covers it, so nothing is productionized from one; the visual contract is settled
// here the way its siblings' were — one figure component, one geometry module, brand
// variance through a typed resolver.
//
// §12.2's GATE, AND THE BRANCH THAT SHIPPED: **the CATEGORY branch. No vendor's current
// policy is asserted anywhere on this slide.** §12.2 offers exactly two options — every
// vendor-specific claim traces to the #52 verification record, or the beat describes the
// CATEGORY and asserts no named vendor's policy — and it is explicit that there is no third
// option where an unverified claim ships because the slide looked thin without it. The
// record exists and most of it is usable
// (`docs/researches/2026-08-04-vendor-pricing-and-data-handling.md`), so this is a choice:
//
//   · BEAT 2's THESIS IS "YOUR EXPOSURE IS SHADOW AI, NOT THE VENDOR". A slide that spent
//     beat 1 quoting one named vendor's retention window would spend beat 2 arguing against
//     the frame it had just built.
//   · §6's EIGHT CROSS-VENDOR PATTERNS ARE THE ONLY CLAIMS NO SINGLE VENDOR'S POLICY CHANGE
//     CAN BREAK, and the record's §11 says re-check every load-bearing URL after 2026-09-04.
//     The deck is presented 18–19 August. A category claim survives one of the three vendors
//     changing its terms the week before the session; a quoted window does not, and nobody
//     in the room would notice it had stopped being true.
//   · THE RECORD'S §2 FORBIDS ANY VENDOR-LENIENCY OR ENFORCEMENT-POSTURE CLAIM on any slide
//     and §7's F12 gives it no replacement, so nothing here characterises what any vendor
//     does in practice beyond what a published term states.
//
// `./content.ts`'s D.4 block carries the sentence-by-sentence sourcing and the one carve-out:
// the GEMS callback cites Google Cloud's published GEMVIS customer story, which is a claim
// about the room's own company's ARCHITECTURE and not about any vendor's terms — the same
// citation `invest-own-proof` prints two slides earlier, in the same words.
//
// WHY THE SLIDE IS SHAPED THIS WAY. §6.7's beat 1 is three DESTINATIONS, so the stage is a
// three-column grid and each column is one of them; `./components/SecurityBeats.tsx` carries
// the argument for that and `./security-geometry.ts` welds the column count to the
// destination count. One copper rule across all three columns divides the slide in half: above
// it a comparison that ends in a decision, below it the exposure that decision does not
// reach and the four domains that answer it.
//
// 4 POSES FOR 3 BEATS — AND BEAT 1 IS THE ONE THAT TAKES TWO.
//
//   0 — WHERE IT GOES. The three destinations, each with what its contract says. The
//       headline is the diagonal itself ("The screen is the same. The contract is not."), so
//       the three columns are evidence for a claim the room has already read.
//   1 — WHAT THE THIRD ONE COSTS, AND WHAT WE DECIDE. B.4's two gaps, the licence tier they
//       were measured at, what this room already runs on its own hardware (§4.4 slot 4) —
//       and LAST, the decision: self-hosting is right for the sensitive workloads and wrong
//       for everything else. Then the rule closes beat 1.
//   2 — THE EXPOSURE. Your real exposure today is not the vendor; it is shadow AI, and
//       nobody administers it. Three things nobody can do about it: audit, revoke, produce.
//   3 — WHERE THE SOP STARTS. Culture · Risk · Governance · Ethics as four chips, the
//       failure mode named ("a governance retrofit"), and who actually proposed the four.
//
// WHY BEAT 1 GETS TWO POSES AND THE OTHER TWO GET ONE EACH. The split is the only decision on
// this slide that §6.7 does not make for it, so the reason is recorded rather than left to be
// re-derived. Beat 1 makes two claims that are read in different registers — WHERE the data
// goes (a comparison, three columns, no verdict available yet) and WHAT the third destination
// costs (two quantities and a decision) — and the second one is meaningless before the first
// has landed. A single pose carrying both would put "4 pts" and "5.2 pts" on the stage in the
// same breath as three destination names, and a room reading a three-column table with
// numbers under two of the columns will attach the numbers to those two columns. The pose
// boundary is the only thing a renderer has that says the numbers are the price of the THIRD
// column. Beats 2 and 3 have no such internal seam: each is one claim plus what it costs or
// what it asks, and splitting either would produce a resting state on half an argument.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING, which is the property the pose map
// is checked against rather than the pose count. Pose 0 rests on a comparison that makes no
// recommendation — which is safe, because it recommends nothing. Pose 1's LAST arrival is the
// verdict, derived in `./components/SecurityBeats.tsx` from the figure count so a third
// figure could not overtake it. Pose 2's last arrival is the exposure row an auditor would
// ask about, and pose 3's is the provenance of the four domains — the string that keeps beat
// 3 from overclaiming.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports print. Any
// lower is indefensible for this slide in particular. A canonical pose of 1 would export a
// page whose last word is an infrastructure recommendation with no governance answer
// attached; 2 would export the exposure with nothing that answers it, which is a page that
// alarms a compliance-obligated reader and then stops. An exported PDF has no presenter
// attached to it, so the exported frame has to be the one that is safe to read alone.
//
// THE BRAND AXIS IS §4.4 SLOT 4 AND IT IS EXACTLY ONE BOX. GEMS: DigiTech already runs
// private on-prem GPU servers for sensitive-data RAG, vendor-reported and cited on the stage.
// Berau: MineTech runs none of it, STATED as copy rather than left blank — #16's finding 4,
// the same rule `leader-gap`'s Capability Ladder follows for its missing marker. Beat 3's
// provenance line is deliberately NOT on the axis: who proposed the four governance domains
// is the same fact in both rooms, and a second brand slot there would be a provenance
// invented to fill a fork.
//
// THE LETTER IS NOT AUTHORED HERE, and the number is one behind §6.7's. This slide composes
// as **D.3** today — third in the `invest` run, behind `invest-own-proof` and
// `invest-chicken-egg` — while §6.7 numbers it **D.4**, because §6.7 describes the FINISHED
// section and `invest-base-rates` (§6.7's D.1) is unbuilt. That gap is §3.5 working as
// designed: a letter and a number are derived from what the deck actually holds, `FigLabel`
// takes a label only, and no rendered string under `src/slides/leader-invest/` may name
// either. Do not "fix" the figure to D.4 — `invest-base-rates` holds no ticket at all (§11's
// Phase 7 row has it), and the day it lands all three slides in this directory move one
// number and no file here is opened.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { SecurityBeats } from "./components/SecurityBeats";
import { investSecurityContent as C, onPremCallbackFor, type OnPremCallback } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestSecurity({ callback }: { callback: OnPremCallback }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46. The reason is the shelf and not
          the wrap: the grid starts at y=156, which is `.slide-content`'s own top, and 46px
          would end the headline row at 128.3 instead of 122. Both sibling leader slides in
          this directory make the same call for the same reason.

          THE HEADLINE IS BEAT 1's DIAGONAL, NOT AN INTRODUCTION TO IT — the research
          record's §1 names it as the one thing a Div Head is most likely to get wrong, and
          putting it here instead of in a fourth box under the table is what buys the stage
          the band beat 1's verdict stands alone in. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <SecurityBeats callback={callback} pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// Resolved ONCE, at module scope, exactly as `./invest-own-proof.tsx`,
// `gap-capability-ladder.tsx`, `shape-agentic-org.tsx` and `title.tsx` resolve theirs, and
// for the same reason: `VARIANT` resolves at module scope, so one module epoch holds one
// brand and the URL that decided it cannot change without a reload. The component below it
// takes the resolved callback as a PROP and reads no variant of its own — which is what lets
// one test mount both brands' callbacks in the same epoch and prove neither carries a byte of
// the other's (§4.4 slot 4).
const BRAND_CALLBACK = onPremCallbackFor(VARIANT.brand);

export const investSecuritySlide: SlideDef = {
  id: "invest-security",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestSecurity callback={BRAND_CALLBACK} />,
};
