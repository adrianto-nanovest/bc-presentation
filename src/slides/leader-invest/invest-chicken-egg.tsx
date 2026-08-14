// THE DEADLOCK, AND WHO CAN SKIP IT — the THIRD slide of the WHY INVEST run since gh#70
// put `invest-base-rates` at its head, and the only one in the deck that admits to
// breaking somebody's rules.
//
// Spec §6.7 (D.3's four beats, and "beat 3 is load-bearing") · §6.2 (the shadow-AI
// escalation: B.2 as CONDITION, D.4 beat 2 as EXPOSURE, this slide as RATIONAL
// BEHAVIOUR, and no image or statistic shared between any two of them) · §4.5 (the
// thesis shelf, which this slide gained in the 2026-08-14 redraw) · §11's Phase 6 row,
// by the owner call of 2026-08-04 that put this slide in a phase at all. No #16
// prototype covers it, so nothing is productionized from one; the visual contract is
// settled here the way its four siblings' were — one figure component, one geometry
// module, one stylesheet, all copy in `./content.ts`.
//
// ═══ THE 2026-08-14 REDRAW. A reader who knows the shipped slide will not recognise
// this one, so what changed is recorded before anything else.
//
// WHAT IT WAS. Two columns of type — the story on the left (two mono clauses, the
// workaround, an eyebrow, four cost rows, a copper rule, the verdict at 26px over two
// lines) and the offer on the right (the turn, a bordered card with four terms). NO
// DRAWN OBJECT ANYWHERE. Every argument on the stage was carried by a sentence, and the
// owner's note was that the result was unreadable at the back of a room: the largest
// thing on it was a paragraph, and a division head had to READ the slide to find out
// what it claimed.
//
// WHAT IT IS. ONE FIGURE IN TWO ACTS, with the sentences reduced to captions on it:
//
//   ACT 1 · THE LOCK. BUDGET and PROOF as the two poles of a closed cycle, one clause
//   on each arc, arrowheads at the apexes, a padlock at the centre and the dashes
//   circulating for as long as the pose is up. A deadlock is a loop, and a loop is a
//   shape — this is the first thing on this stage a room understands without reading.
//   Each pole carries a GLYPH beside its word since 2026-08-14 — a banknote and a signed
//   sheet, leaning towards each other in antiphase and never arriving, which is the same
//   claim the loop makes in the shape a room reads before it reads type.
//
//   ACT 2 · TWO ROADS TO ONE DESTINATION. The ring contracts; the padlock TRAVELS to
//   the left margin and shrinks into a token; the PROOF pole travels to the right edge
//   and grows into the plate both roads end on. Under it: the long road we took —
//   dashed, with a ban seal on it and four costs hanging off it — and above it the
//   short road the room can authorise, solid, drawn in half a second, with four limits
//   hanging off it on the SAME COLUMN GRID. Four costs against four limits, same start,
//   same end, one of them short. That is §6.7's trade, drawn.
//
// TWO COPY EDITS CAME WITH IT, both in `./content.ts` and both argued at length there:
//   · BEAT 3 NO LONGER SAYS "MANAGEMENT WAS CONVINCED". This deck is presented TO top
//     management, and a beat that reports their own decision in the third person puts
//     the room off its own stage. It now reads "It worked. The proof did the convincing,
//     and the full investment was released" — the same event, with the party replaced by
//     the thing that actually moves a budget.
//   · THE SLIDE GAINED A THESIS. Beat 3 used to be the loudest object on the stage (26px,
//     two lines, mid-stage). It is 17px on one line now, ranked with the other beats, and
//     the floor belongs to a one-line closer at §4.5's shelf — 19px, full width, 16px off
//     the NavBar band, exactly where D.1 and D.2 put theirs. It is the LAST arrival on the
//     slide.
//
// ═══ WHY THE SLIDE IS SHAPED THIS WAY. §6.7's argument is a TRADE, not a warning: a
// division that has no budget without proof and no proof without budget will produce the
// workaround by itself, so the useful thing to put in front of a division head is what
// the workaround actually cost and what it bought. That is why the four costs are on the
// stage as four boxes rather than in the presenter's mouth, and why the sentence that
// ended the story legitimately is still on the stage in the same pose as the bill.
// Without it the lower road is advice to breach terms of service.
//
// ═══ NO BRAND AXIS, and that is a decision. §4.4's table of seven brand × deckSet slots
// does not list this slide: the deadlock, the shared accounts and the ban are NANOVEST'S
// OWN, and a resolver here would have to invent a version of this history for a division
// that never lived it. So there is no `*For(brand)` call at module scope, unlike
// `./invest-own-proof.tsx` — one story, byte-identical in both leader decks, which is a
// claim a browser check can settle by diffing the two decks' rendered boxes.
//
// ═══ 4 POSES FOR 4 BEATS — AND NOT ONE BEAT PER POSE. The split is the ticket's sharpest
// constraint and `./components/ChickenEggBeats.tsx` carries the full argument; in one
// line: a pose is a RESTING STATE, #57 forbids any pose that ends on beat 2, so beat 2
// and beat 3 share pose 1, beat 4 takes the whole of pose 2, and the pose that frees is
// the deck's own floor.
//
//   0 — THE LOCK. The headline says every division starts in it; the ring says what "it"
//       is, and the two mono clauses are the loop's two directions.
//   1 — THE LONG ROAD. What we did on shared accounts, the ban, the bill itemised as four
//       boxes on the road, and — LAST — the fact that it worked and the investment was
//       released. Beat 3 arrives after beat 2 in the reveal order and below it in the
//       reading order, so §6.7's beat order is kept and no resting state ends on the
//       confession.
//   2 — THE TURN, AND WHAT BOUNDS IT. The one sentence addressed to the room — the person
//       in the chair can skip the deadlock entirely — the key, the short road drawing
//       itself to the same destination, and the four limits with their clock: 30 days, a
//       handful of seats, one named use case each, a kill criterion, a spend cap.
//   3 — THE FLOOR. The rule, and the thesis alone under it.
//
// THE OFFER AND ITS TERMS WERE TWO POSES UNTIL 2026-08-14, which is the other half of that
// day's owner review. A pose is a RESTING STATE, and the state between them offered a
// division head a pilot with no terms on it — nothing a room can question until the
// presenter presses a key, on a slide whose whole claim is that the short road is short. So
// they are one pose now, and the pose that frees belongs to the closer.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports print.
// Any lower is indefensible for this slide in particular: a canonical pose of 1 would
// export a page whose last word is the ban, and 2 would export the whole trade with the
// sentence that asks for a decision missing. An exported PDF has no presenter attached to
// it, so the exported frame has to be the one that is safe to read alone — and since the
// redraw it is also the only pose that prints the thesis.
//
// ═══ THE LETTER IS NOT AUTHORED HERE, and the number CAUGHT UP with §6.7's. This slide
// composes as **D.3** today — third in the `invest` run, behind `invest-base-rates` and
// `invest-own-proof` — which is §6.7's own number for it. It printed **D.2** from #57
// until 2026-08-08, one behind the spec, because §6.7 describes the FINISHED section and
// `invest-base-rates` (§6.7's D.1) was unbuilt; gh#70 built it at the head of the run that
// day and this slide stepped one number WITH NO EDIT TO ANY RENDERED STRING OR ANY
// `SlideDef` FIELD IN THIS FILE. That is §3.5 working exactly as designed: a letter and a
// number are derived from what the deck actually holds, `FigLabel` takes a label only, and
// no rendered string under `src/slides/leader-invest/` may name either. Do not pin the
// figure.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { ChickenEggBeats } from "./components/ChickenEggBeats";
import { investChickenEggContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestChickenEgg() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason all four
          siblings record: the figure starts at y=156, which is `.slide-content`'s own top,
          and 46px would end the headline row at 128.3 instead of 122. The string fits on one
          line at either size (564.94px and 649.69px against a 1184px measure, measured as a
          nowrap clone in Chromium), so the constraint is the shelf and not the wrap.

          THE HEADLINE IS THE CLAIM AND THE FIGURE IS ITS EVIDENCE, in that order. "Every
          division starts in the same deadlock" is on the stage before the ring that shows what
          a deadlock is — which is what stops pose 0 from reading as a diagram in search of a
          caption. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <ChickenEggBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const investChickenEggSlide: SlideDef = {
  id: "invest-chicken-egg",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestChickenEgg />,
};
