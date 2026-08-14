// 88% USE IT, 6% EARN FROM IT — the FIRST slide of WHY INVEST, and the argument that makes the
// rest of the run worth hearing.
//
// Spec §6.7 (content — one line: "`invest-base-rates` — D.1. 78% → 6%.") · §4.3's leader deck
// table · §11's Phase 7 row. gh#70 built it; the 2026-08-14 rework re-cut every part of it
// except the closer. No #16 prototype covers it, so nothing is productionized from one; the
// visual contract is settled here the way the four `invest` slides before it settled theirs —
// one figure component (`./components/BaseRatesBeats.tsx`), one geometry module
// (`./base-rates-geometry.ts`), all copy in `./content.ts`.
//
// ═══ WHY THE SECTION OPENS HERE. WHY INVEST asks a Div Head for money and authority, and the
// first question a room asks back is "why is this a decision at all — we already use AI". This
// slide prices the answer before D.2 offers any evidence: almost every organization now uses
// AI, the share of them EARNING from it is six in a hundred, and doing what everyone does buys
// what everyone gets. Everything the run says afterwards is worth hearing only if that gap is
// real, so it lands first and it lands with its source on the stage.
//
// ═══ THE 2026-08-14 REWORK, AND THE OWNER CUT THAT FOLLOWED IT THE SAME DAY. A reader who
// knows either older slide will not recognise this one, so both moves are recorded.
//
// THE REWORK (morning): (1) THE FIGURES CHANGED — "78% adopted / 6% properly implemented" was
// a cross-wave mashup that no single study states, and the stage now quotes ONE McKinsey
// report. `./content.ts` carries the full trace, the definition of the 6%, and the list of
// figures this slide still may not print. (2) THE FIGURE CHANGED — two fields sized to their
// own counts became TWO HUNDREDS OF SQUARES, each drawing all hundred so a rate reads as a
// fraction of a visible denominator.
//
// THE OWNER CUT (afternoon), which is what the slide is today:
//   · THE YEAR-AGO 78% IS GONE. The report's own comparison was sourced and correctly dated,
//     and it was still a SECOND ARGUMENT: two poses spent on a rise this slide concludes
//     nothing from. One rate, one fill, one pose.
//   · NO POSE SHOWS AN EMPTY HUNDRED. The two plates used to stand from pose 0 as empty
//     frames. A plate now ARRIVES ALREADY FILLED, square by square in reading order, at the
//     pose that argues it — see `./components/BaseRatesBeats.tsx` on why the squares reveal
//     themselves and the plate around them does not.
//   · THE TITLE AND THE CITATION LOST HALF THEIR LENGTH EACH, and the left plate's label lost
//     the survey grammar it was carried onto the stage in. `./content.ts` argues each.
//   · THE TWO READINGS ARE BOXED, in the dashed travelling-border box B.4's open marker
//     stands in (`.gap-box-live`). They are the only place this stage argues FROM its own
//     evidence, and now the only place drawn as a held thought.
//
// ═══ 3 POSES, one argument each:
//   0 — WHERE EVERYONE IS. The unit, the citation, then the left hundred building to 88 with
//       its figure, its label, its source and what holding that position proves. The room is
//       shown the common position whole, and the right half of the stage is still empty.
//   1 — WHAT IT EARNED. The right hundred builds to 6 — same survey, same respondents, same
//       square, same frame — with its own figure, label, note and reading. This is the slide,
//       and it is one pose and six squares long.
//   2 — WHAT THE DEFAULT COSTS. The rule, then the closer on the floor of the stage.
//
// ═══ POSE 0 DOES NOT ARGUE THE OPPOSITE OF THIS SLIDE, which is the objection any map that
// puts an adoption rate on the stage alone has to answer. A stage resting on "88% USE AI"
// with nothing beside it reads as good news. It does not read that way here, and the reason is
// no longer geometric — the second frame is not on the stage yet — it is VERBAL and it is
// twofold: the headline is up from the first frame and says what the slide concludes, and the
// left plate's own reading, inside its box, says holding that position PROVES NOTHING. A room
// at pose 0 has been told the common position is worth nothing before it is shown what the
// rare one is worth.
//
// ═══ NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING — the property the pose map is
// checked against rather than the pose count. Every pose's LAST arrival is a sentence rather
// than a number: pose 0 ends on the left reading, pose 1 on the right one, pose 2 on the
// closer that prices both.
//
// `canonicalPose: 2` — the fullest pose, and the only one the PDF and PPTX exports print.
// Anything lower would export a stage whose largest objects are two of somebody else's
// percentages with no sentence saying what this deck concludes from them, which for this slide
// in particular is the one way it could travel badly: an exported page that shows a base rate
// and asks for nothing is a slide somebody else can re-caption.
//
// ═══ WHAT THIS SLIDE DELIBERATELY DOES NOT SAY. It never defines what "properly" would require
// — and it no longer uses the word, because no source did. It names no organisation (the
// survey's publisher is a citation, not a subject), tells no story in the first person, and
// prints no price: those are D.2, D.3 and D.5. It carries none of §6.2's shadow-AI vocabulary,
// because it is not one of the three passes. And it prints neither 70 nor 30 nor the phrase
// "70/30" — `./content.ts` records the four unrelated 70/30s in this deck's sources.
//
// ═══ AND IT HAS NO BRAND AXIS. `invest-own-proof` (next door), `invest-security` and
// `invest-subscription` each resolve a brand block at module scope, because each puts an
// organisation's own evidence in front of that organisation. THIS FILE IMPORTS NO `VARIANT` AT
// ALL: §4.4's seven brand × deckSet slots do not list this slide, the figures are one
// publisher's survey of organizations in general, and NOT ONE ORGANISATION IS NAMED ON THIS
// STAGE — so a `Record<Brand, …>` here would be one honest entry and two written by inventing
// evidence. Do not invent variance: the brand-varying proof is D.2's job, one slide later.
// `./content.ts` argues it at length; the consequence worth knowing before you read the
// component is that there is no `…For(brand)` resolver to look for.
//
// ═══ AND IT IS THE NINTH SUCH FILE, NOT THE THIRD — a correction to a count two headers in this
// tree have carried since gh#65. `gap-hardest-part.tsx` says it is "the second leader-only slide
// in the tree that imports no `VARIANT` at all (`mandate-enablement` is the first)", and
// `./components/HardestPartBeats.tsx` echoes it. That was already wrong the day it was written:
// `invest-chicken-egg` (#57) imports none either, and had not for eight weeks. Measured rather
// than remembered, on 2026-08-09, AFTER gh#68 AND gh#69 landed:
//
//   $ for f in src/slides/leader-*/[a-z]*.tsx; do \
//       grep -qE '^import .*from "@/variant"' "$f" || echo "$f"; done
//
// returns NINE of the tree's fifteen leader-only files — in the order they were built,
// `invest-chicken-egg` (#57), `mandate-enablement` (gh#60), `gap-hardest-part` (gh#65),
// `gap-no-sop` (gh#66), `gap-three-failures` and `gap-the-pattern` (gh#67), `shape-middle-out`
// (gh#68), `mandate-levers` (gh#69) and this one (gh#70).
//
// THE `^import` ANCHOR IS THE POINT, AND EVERY UNANCHORED FORM GETS THIS FILE WRONG.
// `grep -q '@/variant'` and `grep -qE 'from "@/variant"'` both match any line holding the string
// — including the command printed above and this paragraph, which quote it — so either one
// returns EIGHT and silently omits the one file the census is written in. That is measured, not
// feared: run unanchored here today, both forms drop `invest-base-rates.tsx` and leave the other
// eight.
//
// ═══ THE SIX THAT DO IMPORT IT ARE §4.4's SLOTS 2–7, and slot 1 is not a leader-only file at
// all: §4.4's table opens with A.1, which lives in `src/slides/opening-section-a/`. The six are
// `gap-capability-ladder` (ladder markers), `shape-agentic-org` (hub name), `invest-own-proof`
// (metrics), `invest-security` (on-prem beat), `invest-subscription` (price anchor) and
// `mandate-phases-gates` (calendar) — 6 + 9 = the fifteen files. So "no brand axis" is the
// tree's ORDINARY answer, holding for nine files against six.
//
// ═══ THE LETTER AND THE NUMBER ARE NOT AUTHORED HERE. This slide composes as the FIRST of the
// `invest` run, which today means D.1 — §6.7's own number for it. None of it is written down:
// `FigLabel` takes a LABEL only, the letter and number come from the composed deck (§3.5), and
// no rendered string under `src/slides/leader-invest/` may name either.
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
          siblings record: the content grid starts at y=156, `.slide-content`'s own top, and
          46px would end the headline row at 128.3 instead of 122.

          THE HEADLINE IS THE CLAIM AND THE HUNDREDS ARE ITS EVIDENCE, in that order and not
          the other one — the rule `gap-hardest-part` states, and the reason this slide does
          NOT open on a naked figure the way E.5 does. A stage that opened on "88%" would make
          the room work out what the number was evidence for, and the first reading it would
          try is that adoption is going well. It is also what keeps pose 0 honest: the claim is
          on the stage before the rate under it is. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <BaseRatesBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision — see
// the header, including the corrected census (this is the NINTH leader-only slide in the tree
// to import no `VARIANT`, not the third). That absence is also what lets its test mount the
// same component under both leader brands and prove the two rooms read identical bytes.
export const investBaseRatesSlide: SlideDef = {
  id: "invest-base-rates",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestBaseRates />,
};
