// THREE THINGS WE GOT WRONG — §6.3, the THIRD slide of THE GAP, and the deck's first
// slide that is nothing but Nanovest's own record.
//
// Spec §6.3 (content, and the cut it makes) · §4.3's leader deck table · §11's Phase 7
// row. No #16 prototype covers it, so nothing is productionized from one; the visual
// contract is settled here the way `gap-no-sop` settled its own one slide earlier — one
// figure component (`./components/ThreeFailuresBeats.tsx`), one geometry module
// (`./three-failures-geometry.ts`), all copy in `./content.ts`.
//
// THE CONFESSION, AND WHY IT IS ON A LEADER'S STAGE AT ALL. §6.3 is two sentences:
// "Nanovest failures, first person. HR p16–18 outcomes are cut — outcomes brag, failures
// transfer, and the confession pays the credibility debt before L.2/L.3 arrive." Both
// halves are decisions this slide implements rather than opinions it holds. The three
// entries are the organisation's twice-documented record (`./content.ts` cites both
// documents line by line); the outcomes that sat beside them in the source deck — a
// performance multiple, a chatbot's deflection rate, a preparation/implementation split
// — are absent from every rendered string, and the test holds that as a regex list fired
// against the sentences the research actually prints.
//
// THE VOICE IS THE ARGUMENT, AND IT IS TESTABLE. The three failures are FIRST PERSON
// PLURAL — we bought, we built, we owned — and the closer turns to FIRST PERSON
// SINGULAR: "Every one of these calls was mine." There is no second person anywhere on
// this stage: no "you", no "your", no "yours", asserted word-boundary over every rendered
// string. That one property is what separates this slide from the three that are allowed
// to make the turn it may not — D.3 (`invest-chicken-egg`) ends its fourth beat on "You
// are the person who can skip all three", and M.1 and M.2 (`j1-humility-intro`,
// `j2-five-principles`) hand the room "so you skip my mistakes" and "each one yours to
// skip past". B.3 confesses and stops. A confession that arrives already converted into a
// favour for the listener is a sales pitch with a humble first paragraph, and the room
// this deck is aimed at has heard that one.
//
// IT LAYS DOWN THREE ENTRIES AND DOES NOT GENERALISE THEM. The pattern across the three
// is §6.4 (`gap-the-pattern`), the slide directly behind this one; the rungs and the
// decision contract are §6.5's; shadow AI in any of its three passes is §6.2's and
// §6.7's. Nothing here summarises, counts a lesson or names a discipline — and in
// particular nothing here uses the three-word summary L.3 already renders ("three honest
// failures — methodology, strategy, empowerment"), because a paraphrase this deck prints
// somewhere else is not this slide's to spend.
//
// NO BRAND AXIS. The third file in this directory and the fourth in the leader tree to
// import no `VARIANT` at all (`gap-hardest-part`, `gap-no-sop` and `mandate-enablement`
// are the others), and the plainest case of the four: §4.4's seven brand × deckSet slots
// do not list this slide, and these failures are OURS. They are the same three admissions
// in a Berau room and in a GEMS room because the organisation that made them is the one
// presenting, and varying them by audience would mean either inventing a second
// organisation's failures or editing our own to flatter a room. `./content.ts` argues it;
// the consequence worth knowing before reading the component is that there is no
// `…For(brand)` resolver to look for, and that both leader rooms read identical bytes.
//
// WHY THE SLIDE IS SHAPED THIS WAY. The stage is a LEDGER WITH A VERTICAL SPINE: one
// hairline running the height of the three entries, each period label right-aligned to
// its left, a small filled mark on the spine at each entry's shelf, and the title, the
// admission and the consequence stacked to its right. It reads as a record kept in order,
// which is what a confession is. It is also the one image in this run that is not
// horizontal — B.1 draws a split bar, B.2 a lopsided diptych — and three horizontal
// figures in three consecutive slides is how a run starts reading as one long slide.
//
// 4 POSES, one argument each:
//   0 — THE RECORD OPENS, AND THE FIRST ENTRY IS COMPLETE. The heading, the full-height
//       spine, and entry one: its date, its mark, its name, what we did and what it cost.
//       The spine is drawn beside one entry on purpose — it is the ledger's margin, not
//       evidence, and a spine that grew with the entries would be a progress bar.
//   1 — THE SECOND ENTRY, complete on the same shape: three quarters spent building what
//       the market shipped anyway, and six of ten connectors gone.
//   2 — THE THIRD ENTRY, complete: every department's solution built for them, and a
//       queue every change had to pass through.
//   3 — THE RULE AND THE CLOSER. One copper rule closes the record, and one sentence puts
//       a name behind all three.
//
// NO POSE RESTS ON A CONFESSION WHOSE COST HAS NOT LANDED — the property the pose map is
// checked against rather than the pose count. Every entry's five boxes arrive inside ONE
// pose, in three steps: the shelf, then what we did, then what it cost, always in that
// order and always with the cost last. A pose that ended on "we were proud of how fast we
// delivered" would rest on a sentence a room hears as competence, and the admission would
// have been made without the thing that makes it one. The same rule is why the entries
// are not split across pose boundaries: three halves of three confessions is a slide that
// brags three times and pays once.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports print.
// Anything lower would export a page of admissions with no line owning them, which for
// this slide in particular is the one way it could travel badly: three dated failures
// with nobody's name attached is a document somebody else can re-caption as a finding
// against a team, and the sentence that stops it is the last one to arrive.
//
// THE LETTER IS NOT AUTHORED HERE. This slide composes as the THIRD of the `gap` run and
// every figure behind it in the run steps by one the day another lands in front of it
// (§3.4 R2). Neither half of the reference is written down in any file under
// `src/slides/leader-gap/`: `FigLabel` takes a LABEL only and the composer derives the
// rest (§3.5).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { ThreeFailuresBeats } from "./components/ThreeFailuresBeats";
import { gapThreeFailuresContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function GapThreeFailures() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason every
          recent leader slide records: the content grid starts at y=156,
          `.slide-content`'s own top, and 46px would end the headline row at 128.3 instead
          of 122.

          THE HEADLINE IS THE CONFESSION'S FRAME, not an apology: "we got here" is what
          makes three failures a route rather than a disclaimer, and it is the half the
          room already believes — so the emphasis sits on the failing. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <ThreeFailuresBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision —
// see the header. Like `gap-no-sop` and `gap-hardest-part` next door, this file imports
// no `VARIANT` at all, which is what lets a test mount the same component under both
// leader brands and prove the two rooms read identical bytes.
export const gapThreeFailuresSlide: SlideDef = {
  id: "gap-three-failures",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapThreeFailures />,
};
