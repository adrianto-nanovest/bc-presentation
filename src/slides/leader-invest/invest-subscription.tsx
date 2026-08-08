// INDIVIDUAL SEATS BECOME A MANAGED LINE ITEM — still the LAST slide of the WHY INVEST
// run, which is now complete at §6.7's five, and the one whose beat 3 is arithmetic the
// room runs itself.
//
// Spec §6.7 (D.5's three beats) · §4.4 slot 7 (the price-anchor brand axis) · §12.2
// (the vendor-claim gate) · §11's Phase 6 row. No #16 prototype covers it, so nothing
// is productionized from one; the visual contract is settled here the way its three
// siblings' were — one figure component (`./components/SubscriptionBeats.tsx`), one
// geometry module (`./subscription-geometry.ts`), brand variance through a typed
// resolver (`priceAnchorFor`).
//
// §12.2's GATE, AND THE BRANCH THAT SHIPPED: **the RECORD branch — the opposite call
// from `./invest-security.tsx`'s, for the opposite reason.** D.4's beat 2 argues the
// exposure is not the vendor, so it describes categories and names nobody; this
// slide's beat 3 asks a Div Head to compute a price, and a price with no plan and no
// vendor attached is not one. So every figure traces to the #52 verification record
// (`docs/researches/2026-08-04-vendor-pricing-and-data-handling.md` §8.1–§8.3, read
// 2026-08-04), every price string carries its currency, billing period and date-read
// in the SAME string, and `./content.ts`'s D.5 block carries the figure-by-figure
// sourcing — including what is deliberately NOT printed (the geolocation-unverified
// consumer prices, the period-unverified Gemini Enterprise rows, and any GEMS
// internal figure, because §8.2 proved none exists).
//
// WHY THE SLIDE IS SHAPED THIS WAY. Beats 1 and 2 are a comparison — four gaps
// against the four capabilities that close them — so the upper stage is two columns
// of one grid, with the third column carrying beat 2's payoff (the November
// post-assessment tie). One copper rule closes the comparison; below it, beat 3: the
// formula and its tier table on the left, §4.4 slot 7's brand anchor on the right,
// and the closer — "Measure value, not activity" — full width, last.
//
// 4 POSES FOR 3 BEATS — AND BEAT 3 IS THE ONE THAT TAKES TWO.
//
//   0 — TODAY. The four gaps of an individual subscription, under the headline's
//       claim. A deficit column, resting alone on purpose: the room recognises its
//       own procurement before it is offered anything.
//   1 — MANAGED. The four capabilities, then the payoff LAST: usage analytics are
//       what make the November post-assessment mean anything.
//   2 — THE ARITHMETIC. The rule closes the comparison; the formula, its three
//       priced tiers, and the annual-vs-monthly lever. Runnable, not answered.
//   3 — THE ANCHOR AND THE BOUNDARY. What this room's own local figure is (or that
//       none exists, stated), and the closer: measure value, not activity.
//
// WHY BEAT 3 GETS TWO POSES AND THE OTHER TWO GET ONE EACH. The split is the one
// decision §6.7 does not make for this slide, so the reason is recorded rather than
// left to be re-derived. Beat 3 makes two claims in different registers — the
// ARITHMETIC (a formula, three quoted prices, one lever: what to compute) and the
// EPISTEMICS of the result (what the room's local anchor is, and what the computed
// number may and may not be taken to mean) — and a single pose would land eleven
// boxes in one reveal and let the slide REST on a stage whose last-arrived band is a
// price table with the "measure value, not activity" boundary attached as one more
// row of it. Beats 1 and 2 have no such seam: each is one claim and its four-row
// evidence, and splitting either would rest a pose on half a comparison.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING — the property the pose map
// is checked against rather than the pose count. Pose 0 rests on a deficit that
// recommends nothing. Pose 1's LAST arrival is the November sentence, so the beat
// never rests on "usage analytics" as a feature. Pose 2 rests on arithmetic whose
// output is deliberately absent — the formula's conclusion belongs to the room, and
// that absence IS the AC ("runnable, not answered"), not a missing verdict. Pose 3's
// last arrival is the closer, which bounds every number above it.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports
// print. Any lower is indefensible for this slide in particular: a canonical pose of
// 2 would export a page of vendor prices with no "measure value, not activity"
// boundary and no anchor attribution — a procurement page, in an investment case, in
// front of a compliance-obligated reader. The exported frame has to be the one that
// is safe to read alone.
//
// THE BRAND AXIS IS §4.4 SLOT 7 AND IT IS EXACTLY ONE COLUMN. Berau: the organizer's
// published Vol-2 prize value — USD 204/year, attributed to the ORGANIZER with the
// vendor's actual USD 200/year charge printed beside it, and no competition-window
// date anywhere (record §8.1's three corrections, all honoured in `./content.ts`).
// GEMS: vendor list price only, and the stated fact that no internal figure was
// official as of 2026-08-03 (record §8.2) — stated as copy, not left blank, the same
// rule every absence in this section follows. The formula, the tier table and the
// closer are brand-invariant: list prices are the vendor's, and the boundary is the
// deck's.
//
// THE LETTER IS NOT AUTHORED HERE, and the number CAUGHT UP with §6.7's. This slide
// composes as **D.5** today — fifth and LAST in the `invest` run, behind
// `invest-base-rates`, `invest-own-proof`, `invest-chicken-egg` and `invest-security` —
// which is §6.7's own number for it, and the LAST figure this slide will hold: the run is
// COMPLETE at §6.7's five, so nothing more inserts in front of it. It printed **D.4** from
// #59 until 2026-08-08, one behind the spec, because `invest-base-rates` (§6.7's D.1) was
// unbuilt and — as this comment then correctly said — held no ticket; **gh#70** is the
// ticket that did not exist when that was written, and the day it landed all four slides
// here moved one number with no file in this directory opened for a rendered string or a
// `SlideDef` field. That is §3.5 working as designed: `FigLabel` takes a label only, and no
// rendered string under `src/slides/leader-invest/` may name a letter or a number. Do not
// pin the figure.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { SubscriptionBeats } from "./components/SubscriptionBeats";
import { investSubscriptionContent as C, priceAnchorFor, type PriceAnchor } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestSubscription({ anchor }: { anchor: PriceAnchor }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason all
          three siblings record: the grid starts at y=156, `.slide-content`'s own top,
          and 46px would end the headline row at 128.3 instead of 122.

          THE HEADLINE IS THE SLIDE'S TITLE PHRASE AS A CLAIM — §6.7's own words. The
          three beats under it are what "individual", "managed" and "line item" each
          mean, so the room reads the destination before the evidence for it. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <SubscriptionBeats anchor={anchor} pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// Resolved ONCE, at module scope, exactly as `./invest-own-proof.tsx` and
// `./invest-security.tsx` resolve theirs, and for the same reason: `VARIANT` resolves
// at module scope, so one module epoch holds one brand and the URL that decided it
// cannot change without a reload. The component above takes the resolved anchor as a
// PROP and reads no variant of its own — which is what lets one test mount both
// brands' anchors in the same epoch and prove neither carries a byte of the other's
// (§4.4 slot 7).
const BRAND_ANCHOR = priceAnchorFor(VARIANT.brand);

export const investSubscriptionSlide: SlideDef = {
  id: "invest-subscription",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestSubscription anchor={BRAND_ANCHOR} />,
};
