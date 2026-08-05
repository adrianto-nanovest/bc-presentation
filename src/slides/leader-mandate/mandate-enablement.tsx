// THE ENABLEMENT MODEL — the first slide of THE MANDATE, and the last thing a
// leader is asked to authorize.
//
// Spec §6.8 (content) · §4.3's leader deck table · §11 Phase 6. No #16 prototype
// covers this slide, so nothing is productionized from one: the visual contract
// is settled here, and settled the same way its three siblings' were — one figure
// component, one geometry module, copy in the section's own content module.
//
// WHY THE SLIDE IS SHAPED THIS WAY. §6.8's model is "generic pillars and tracks,
// one specific bottleneck", and the slide is that sentence drawn: two columns of
// generic structure, then one bordered band holding the only specific thing on
// the stage. The geometry carries the half no string says — FOUR IDENTICAL MARKS
// beside THREE LANES OF FALLING WIDTH, so a leader who reads only the shapes
// learns that every pillar is mandatory and that the tracks are deliberately not
// the same size.
//
// AND WHY IT HAS NO BRAND AXIS, which is the one thing about this file that will
// surprise a reader of its three siblings. `gap-capability-ladder`,
// `shape-agentic-org` and `invest-own-proof` each resolve a brand block at module
// scope, because each puts an organisation's own evidence in front of that
// organisation. This one resolves nothing: the pillars and tracks are generic by
// construction, and the bottleneck is a QUOTATION — DigiTech's brief to this
// workshop — printed with its attribution in both leader decks. A `Record<Brand,
// …>` here would be a slot with one real entry and two that could only be filled
// by inventing a bottleneck nobody stated. `./content.ts` argues that at length
// and `tests/unit/mandate-enablement.test.tsx` holds it as a rule: exactly one
// rendered string on this slide may name an organisation.
//
// 4 POSES, one argument each:
//   0 — THE PILLARS. The headline refuses the reading a leader arrives with
//       ("this is a training budget"), both column headings declare the two
//       questions, and the left column answers the first: what the programme is
//       made of.
//   1 — THE TRACKS. Who it reaches, and how deep. Three lanes, narrowing.
//   2 — THE BOTTLENECK. The one specific thing, quoted and attributed, spanning
//       the full width because it is a property of the whole model rather than of
//       one pillar or one track.
//   3 — THE CLOSER. The model is generic; naming the bottleneck is the room's own
//       job. This is what makes pose 2 fair in a room the brief did not come from,
//       and it hands over to K.2's phases and gates.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX
// exports print. A canonical pose of 2 would export another organisation's quoted
// bottleneck with the sentence that frames it missing, which is the one way this
// slide could travel badly.
//
// THE LETTER IS NOT AUTHORED HERE, and this slide is the first insert in the deck
// that moves NO curriculum letter. The `mandate` run lands BEHIND `pitfalls`
// (§3.6), so `meta`, `principles` and `lab` each step one along and everything in
// front of them — including the loop slide, which reached H.12 on gh#56 — stays
// exactly where it was. §4.3's A–N is therefore reached by APPENDING N, not by
// pushing H. What this slide prints is derived from the composed deck (§3.5):
// `FigLabel` takes a label only, and no rendered string under
// `src/slides/leader-mandate/` may name a letter or a number.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { EnablementModel } from "./components/EnablementModel";
import { mandateEnablementContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function MandateEnablement() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <EnablementModel pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …fFor(VARIANT.brand)` HERE, and its absence is the
// decision — see the header. This is the only leader-only slide in the tree that
// imports no `VARIANT` at all, which is also what lets its test compare the
// rendered stage across two variant epochs and prove the two leader decks print
// the same bytes.
export const mandateEnablementSlide: SlideDef = {
  id: "mandate-enablement",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "mandate",
  render: () => <MandateEnablement />,
};
