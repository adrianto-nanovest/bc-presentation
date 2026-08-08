// 78% ADOPT, 6% IMPLEMENT PROPERLY — the FIRST slide of WHY INVEST, and the argument
// that makes the rest of the run worth hearing.
//
// Spec §6.7 (content — one line: "`invest-base-rates` — D.1. 78% → 6%.") · §4.3's leader
// deck table · §11's Phase 7 row, and the 2026-08-05 amendments in §11 that wrote this
// slide's arrival in advance — they record that `invest-own-proof` prints D.1 and
// `invest-chicken-egg` D.2 "until this lands", and that both step one number that day.
// gh#70. No #16 prototype covers it, so nothing is productionized from one; the visual
// contract is settled here the way the four `invest` slides before it settled theirs —
// one figure component (`./components/BaseRatesBeats.tsx`), one geometry module
// (`./base-rates-geometry.ts`), all copy in `./content.ts`.
//
// WHY THE SECTION OPENS HERE. WHY INVEST asks a Div Head for money and authority, and the
// first question a room asks back is "why is this a decision at all — we already use AI".
// This slide prices the answer before D.2 offers any evidence: almost every organization
// has adopted, almost none has implemented properly, and doing what everyone does buys
// what everyone gets. Everything the run says afterwards is worth hearing only if that
// gap is real, so it lands first and it lands with its source on the stage.
//
// THE PAIR IS THE HR DECK'S OWN CONTEXT STATISTIC AND ITS ATTRIBUTION SAYS ONLY THAT.
// "78% adoption versus 6% proper implementation" is the REPORTED CONTEXT block of the
// group HR agentic-organization deck's slide 3, recorded at
// `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` line 106. The research
// names NO upstream owner for it — no publisher, no study, no year, no sample — so the
// on-slide attribution names none either. That is a weaker provenance than B.1's, which
// at least holds "BCG / McKinsey", and `./content.ts` records the difference beside the
// copy: the honest ceiling here is WHERE WE READ IT, and the citation therefore lands
// ABOVE the two figures rather than under them, so no frame of this slide ever shows an
// unattributed percentage.
//
// TWO OF THE SOURCE LINE'S THREE FIGURES ARE ON THE STAGE. The same sentence reports a
// 25–55% productivity improvement; it is a different claim — what adoption was worth to
// those who got it right — and proof of value is D.2's job, made with the room's own
// organisation. gh#70's AC says no other statistic is invented around the pair; a third
// one quoted from the same sentence would invent nothing and would still be a second
// argument, and this slide makes one.
//
// AND IT HAS NO BRAND AXIS. `invest-own-proof` (next door), `invest-security` and
// `invest-subscription` each resolve a brand block at module scope, because each puts an
// organisation's own evidence in front of that organisation. THIS FILE IMPORTS NO
// `VARIANT` AT ALL: §4.4's seven brand × deckSet slots do not list this slide, the pair is
// a third party's reported context about organizations in general, and NOT ONE
// ORGANISATION IS NAMED ON THIS STAGE — so a `Record<Brand, …>` here would be one honest
// entry and two written by inventing evidence. Do not invent variance: the brand-varying
// proof is D.2's job, one slide later. `./content.ts` argues it at length; the consequence
// worth knowing before you read the component is that there is no `…For(brand)` resolver
// to look for.
//
// AND IT IS THE NINTH SUCH FILE, NOT THE THIRD — a correction to a count two headers in
// this tree have carried since gh#65, made here because gh#70's own ticket repeated it.
// `gap-hardest-part.tsx` says it is "the second leader-only slide in the tree that imports
// no `VARIANT` at all (`mandate-enablement` is the first)", and
// `./components/HardestPartBeats.tsx` echoes it. That was already wrong the day it was
// written: `invest-chicken-egg` (#57) imports none either, and had not for eight weeks.
// Measured rather than remembered, on 2026-08-09, AFTER gh#68 AND gh#69 landed:
//
//   $ for f in src/slides/leader-*/[a-z]*.tsx; do \
//       grep -qE '^import .*from "@/variant"' "$f" || echo "$f"; done
//
// returns NINE of the tree's fifteen leader-only files — in the order they were built,
// `invest-chicken-egg` (#57), `mandate-enablement` (gh#60), `gap-hardest-part` (gh#65),
// `gap-no-sop` (gh#66), `gap-three-failures` and `gap-the-pattern` (gh#67),
// `shape-middle-out` (gh#68), `mandate-levers` (gh#69) and this one (gh#70). THE MOST
// RECENT EXAMPLE IS NOT THIS SLIDE BUT gh#69'S, the ticket immediately before it, which
// made the same call for a related reason: four levers a Div Head can pull alone do not
// vary by which Div Head is in the room, and a claim about organisations in general has
// no local fact to vary on either.
//
// THE `^import` ANCHOR IS THE POINT, AND EVERY UNANCHORED FORM GETS THIS FILE WRONG.
// `grep -q '@/variant'` and `grep -qE 'from "@/variant"'` both match any line holding the
// string — including the command printed above and this paragraph, which quote it — so
// either one returns EIGHT and silently omits the one file the census is written in.
// That is measured, not feared: run unanchored here today, both forms drop
// `invest-base-rates.tsx` and leave the other eight. An earlier draft of this block
// printed the unanchored form beside the count NINE, which cannot both be true.
//
// THE SIX THAT DO IMPORT IT ARE §4.4's SLOTS 2–7, and slot 1 is not a leader-only file at
// all: §4.4's table opens with A.1, which lives in `src/slides/opening-section-a/`. The six
// are `gap-capability-ladder` (ladder markers), `shape-agentic-org` (hub name),
// `invest-own-proof` (metrics), `invest-security` (on-prem beat), `invest-subscription`
// (price anchor) and `mandate-phases-gates` (calendar) — 6 + 9 = the fifteen files. So
// "no brand axis" is the tree's ORDINARY answer, holding for nine files against six, and
// not the exception two comments make it sound like. gh#70 does not edit `leader-gap`, so
// both stale sentences are left standing and named here instead.
//
// WHY THE SLIDE IS SHAPED THIS WAY. The claim is the headline; the pair under it is the
// evidence, stated as two numbers and then DRAWN as the number of organizations each one
// counts — one 24px mark per organization in a hundred, the same mark in both rows, so the
// only difference the drawing makes is how many. A room that reads "6%" as a rhetorical
// number stops doing so when the six are a row it can count under a field it cannot.
// `./base-rates-geometry.ts` carries the argument for why the pair is a COUNT and not a
// bar — B.1 already spent the split bar and the 70%, and §6.2's rule that two passes may
// share no image and no statistic is applied across sections here.
//
// 3 POSES, one argument each:
//   0 — THE PAIR, WHOLE. The eyebrow with the unit, the attribution above the numbers,
//       then each rate as a percentage and immediately as its field. The room reads both
//       halves of the statistic and the picture of both before it is asked anything.
//   1 — WHAT EACH RATE BUYS. One copper rule closes the evidence; two equal columns say
//       what the common position is worth and what the rare one is. The rare one lands
//       last, because it is what the rest of this section is for.
//   2 — THE PRICE OF THE DEFAULT. The closer, full width, alone: doing what everyone does
//       buys what everyone gets.
//
// WHY THREE AND NOT FOUR, WHICH IS THE ONE POSE DECISION §6.7 DOES NOT MAKE FOR THIS
// SLIDE. The obvious fourth pose is a split of pose 0 — adoption first, proper
// implementation second — and it is refused, because a pose is a RESTING STATE and a stage
// resting on "78% HAVE ADOPTED AI" with nothing beside it argues the opposite of this
// slide. The pair is one statistic; a room left alone with half of it reads good news.
// Band 3's two readings cannot be split for the mirror reason: a pose ending on "holding
// it proves nothing" would rest on half a comparison, the same objection
// `gap-hardest-part` records about its own parallel band.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING — the property the pose map is
// checked against rather than the pose count. Pose 0 rests on a sourced PAIR, never on an
// unsourced number and never on one rate: its last arrival is the six marks, which is the
// pose's whole argument. Pose 1's last arrival is the rare position, not the common one.
// Pose 2's last arrival is the closer, which prices every band above it.
//
// `canonicalPose: 2` — the fullest pose, and the only one the PDF and PPTX exports print.
// Anything lower would export a stage whose largest objects are two of somebody else's
// percentages with no sentence saying what this deck concludes from them, which for this
// slide in particular is the one way it could travel badly: an exported page that shows a
// base rate and asks for nothing is a slide somebody else can re-caption.
//
// WHAT THIS SLIDE DELIBERATELY DOES NOT SAY. It never defines what "properly" requires —
// that is B.1's people-and-process split, B.5's rungs and section C's six pillars, and a
// definition here would spend three of their beats. It names no organisation, tells no
// story in the first person, and prints no price: those are D.2, D.3 and D.5. It carries
// none of §6.2's shadow-AI vocabulary, because it is not one of the three passes. And it
// prints neither 70 nor 30 nor the phrase "70/30" — `./content.ts` records the three
// unrelated 70/30s in this deck's sources, two of which sit within a page of this pair.
//
// THE LETTER AND THE NUMBER ARE NOT AUTHORED HERE. This slide composes as the FIRST of the
// `invest` run, which today means D.1 — §6.7's own number for it, and the first time this
// directory's composed figures and §6.7's have agreed since gh#56 opened the run. Its
// arrival moved FOUR numbers and no letter: `invest-own-proof` D.1→D.2,
// `invest-chicken-egg` D.2→D.3, `invest-security` D.3→D.4 and `invest-subscription`
// D.4→D.5, all inside this run by §3.4 R3, none of them costing an edit to a rendered
// string in any of those four files. `invest` has held D since gh#56 and a head-of-run
// insert claims no letter. None of it is written down: `FigLabel` takes a LABEL only, the
// letter and number come from the composed deck (§3.5), and no rendered string under
// `src/slides/leader-invest/` may name either.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { BaseRatesBeats } from "./components/BaseRatesBeats";
import { investBaseRatesContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestBaseRates() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason all four
          siblings record: the content grid starts at y=156, `.slide-content`'s own top,
          and 46px would end the headline row at 128.3 instead of 122.

          THE HEADLINE IS THE CLAIM AND THE PAIR IS ITS EVIDENCE, in that order and not the
          other one — the rule `gap-hardest-part` states. A stage that opened on "78%"
          would make the room work out what the number was evidence for, and the first
          reading it would try is that adoption is going well. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <BaseRatesBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision —
// see the header, including the corrected census (this is the NINTH leader-only slide
// in the tree to import no `VARIANT`, not the third). That absence is also what lets its
// test mount the same component under both leader brands and prove the two rooms read
// identical bytes.
export const investBaseRatesSlide: SlideDef = {
  id: "invest-base-rates",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestBaseRates />,
};
