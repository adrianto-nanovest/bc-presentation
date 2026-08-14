// WHERE THE DATA GOES, AND WHO ANSWERS FOR IT — the FOURTH and LAST slide of the WHY INVEST
// run, and the one slide in this deck that was two.
//
// ═══════════════════════════════════════════════════════════════════════════════════════
// ═══ THE MERGE. READ THIS BEFORE EDITING ANYTHING UNDER THIS SLIDE.
// ═══════════════════════════════════════════════════════════════════════════════════════
//
// THIS SLIDE REPLACES TWO. `invest-security` ("the screen is the same, the contract is not" —
// three destinations, two benchmark figures, three exposures, four governance chips) and
// `invest-subscription` ("individual subscriptions become a managed line item" — four
// procurement gaps, four capabilities, a seat formula and three priced tiers) are both gone,
// and so are their geometry modules, their figure components and their unit tests. What
// survived of each is in `./content.ts`'s D.4 block, which records the sourcing decision for
// every string it kept and every string it dropped.
//
// WHY THEY MERGE RATHER THAN SHRINK. They were one argument told from two desks. The old D.4's
// exposure was "nobody administers it" and the old D.5's first gap was "no admin"; the old
// D.4's second exposure was "you cannot revoke it when the person leaves" and the old D.5's
// third gap was "nothing revoked on exit". Two slides described ONE defect — a personal account
// with nobody's name against it — and then offered the same fix twice, once as a risk control
// and once as a procurement line. A room reading them back to back was being asked to hold the
// same deficit in mind through two different layouts and notice that they matched.
//
// WHY THEY WERE UNREADABLE, WHICH IS THE OTHER HALF OF THE BRIEF. Between them the two stages
// set forty-one strings, of which nine were full sentences and four were citations. The owner's
// note on the rendered frames was that the largest object on either slide was a paragraph, and
// that the audience — a division board — would have to READ each slide to find out what it
// claimed. Nothing on either stage was drawn.
//
// ═══ WHAT IS ON THE STAGE NOW: ONE FIGURE IN TWO ACTS, three sentences, and eleven boxes.
// `./components/GovernanceBeats.tsx` carries the full argument; in outline:
//
//   ACT 1 · ONE SCREEN, THREE DOORS (pose 0). The prompt box everybody in the room has already
//   used, a bus out of it, and three destinations drawn as three objects: a door ajar with
//   something leaving through it, the same door shut with a badge on it, and a rack that never
//   opens. The lane to the open door is the only one whose dashes travel. The room learns what
//   an account IS before it is told what is wrong with one.
//
//   ACT 2 · FOUR SWITCHES (poses 1…2). The bus and the other two glyphs leave; the OPEN DOOR
//   travels to the left margin and becomes the token everything under it hangs off. Four rows
//   arrive — a thing nobody can do, a switch that is off, an empty slot — and then the switches
//   flip in sequence, the four leads draw themselves to the four controls that close the gaps,
//   and the door SHUTS behind them. The account that leaks is the account nobody owns, and one
//   managed seat closes both. That is the whole slide, and a room reads it without reading.
//
// ═══ 4 POSES, AND THE LAST ONE IS THE FLOOR ALONE.
//
//   0 — THE THREE DOORS, and the verdict on own hardware. Rests on a comparison.
//   1 — WHAT NOBODY CAN DO. Rests on a deficit, deliberately: the room has to recognise its own
//       position before it is offered anything.
//   2 — WHAT A MANAGED SEAT GIVES. The switches, the completed circuit, the shut door, and the
//       sentence that names what changed. The fullest pose.
//   3 — THE FLOOR. The rule, and the thesis alone under it.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING, which is the property the pose map is
// checked against rather than the pose count. Pose 0's last arrival is the verdict; pose 1 is a
// deficit that recommends nothing and asks for nothing, which is safe to leave on a screen;
// pose 2's last arrival is the answer, and pose 3's is the closer.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports print. Any
// lower is indefensible for this slide in particular. A canonical pose of 1 would export a page
// whose last word is an exposure with nothing that answers it — a page that alarms a
// compliance-obligated reader and then stops — and 2 would export the whole argument with the
// line that asks for a decision missing. An exported PDF has no presenter attached to it, so the
// exported frame has to be the one that is safe to read alone.
//
// ═══ NO BRAND AXIS, AND THAT IS A DECISION. Both parent slides forked on brand — one on whether
// the room already runs private on-prem GPU servers, the other on whether it has a local price
// anchor — and both forks needed a source line on the stage to say how the claim was known.
// This slide is a standalone deliverable: it names no date, no internal document and no
// organisation, so there is nothing for a fork to resolve and no `*For(brand)` call at module
// scope. One story, byte-identical in both leader decks — the same call `./invest-chicken-egg.tsx`
// makes, and a claim a browser check can settle by diffing the two decks' rendered boxes.
//
// ═══ NO VENDOR'S TERMS ARE ASSERTED ANYWHERE ON THIS STAGE. The three contracts describe
// CATEGORIES of account and name nobody. That was the old D.4's own gate branch and it is the
// only one that survives a vendor changing its terms the week before a session — which, for a
// deck with no date on it, is every week.
//
// ═══ THE LETTER IS NOT AUTHORED HERE. This slide composes as **D.4**, fourth in the `invest`
// run behind `invest-base-rates`, `invest-own-proof` and `invest-chicken-egg`, and the run is
// four long since the merge. A letter and a number are derived from what the deck actually
// holds, `FigLabel` takes a label only, and no rendered string under
// `src/slides/leader-invest/` may name either. Do not pin the figure.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { GovernanceBeats } from "./components/GovernanceBeats";
import { investGovernanceContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestGovernance() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason all three
          siblings record: the figure starts at y=156, which is `.slide-content`'s own top, and
          46px would end the headline row at 128.3 instead of 122.

          THE HEADLINE IS THE CLAIM AND THE FIGURE IS ITS EVIDENCE, in that order. "The tool is
          not the risk. The account is." is on the stage before the three doors that show what an
          account is — which is what stops pose 0 from reading as a diagram in search of a
          caption, and what makes the four dead switches of pose 1 read as the same subject rather
          than as a second topic. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <GovernanceBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const investGovernanceSlide: SlideDef = {
  id: "invest-governance",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestGovernance />,
};
