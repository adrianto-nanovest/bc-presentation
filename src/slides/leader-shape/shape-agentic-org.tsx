// THE AGENTIC ORGANIZATION — section C's centrepiece, and the deck's shape.
//
// Spec §6.6 (content) · §7.1 (the visual contract) · §4.4 slot 5 (the brand axis).
// Productionized from `src/slides/prototype-gh16-leader-slides/pillars-a-orbit.tsx`
// — variant A, which the owner picked on a browser walkthrough of all six #16
// variants — and REWRITTEN, not lifted: the prototype is inline-styled end to end,
// untested, fills two elements with hand-written rgba, and puts its lowest pillar
// 26px inside the NavBar's hover band (§7.1's one recorded layout risk; see
// `./geometry.ts`, which exists to fix it).
//
// WHY THE SLIDE IS SHAPED THIS WAY. §6.6 calls this the centrepiece, and what it
// has to establish is that an agentic organisation is a SHAPE and not a purchase:
// one enabling function at the centre, six pillars that only work together. A ring
// says that; a list of six bullets says the leader may fund three of them. The hub
// arrives first and alone, so the room reads "who" before "what", and the six
// arrive as a sweep rather than a flash, so they read as six of one thing.
//
// 2 POSES THIS TICKET, one argument each:
//   0 — THE ENABLER. The hub, its brand line, and the standing kicker that says an
//       operating model is not a department and not a committee.
//   1 — THE SIX PILLARS, with their spokes and labels. ALL SIX AT FULL STRENGTH:
//       nothing is dimmed and nothing is waiting to be undimmed (§7.1 — attention
//       is bought with added light, never subtracted).
//
// `canonicalPose: 1` — the fullest pose this slide has, and the only one the PDF
// and PPTX exports print. A canonical pose of 0 would export a hub with no
// organisation around it.
//
// THE STEP BUDGET GROWS TO 9 IN THE NEXT TICKET, not here. §7.1 settled nine
// steps: hub + reveal + six focus beats + closer, one leader decision per pillar,
// which is what turns the centrepiece into the index for section D. This ticket
// ships the RESTING POSE ONLY, and — deliberately — authors none of that copy: see
// the list at the top of `./content.ts` for why writing it early is a hazard rather
// than a head start.
//
// THE LETTER IS NOT AUTHORED HERE. This slide composes as C.1 today, and the
// `shape` run keeps C as the rest of Phase 6 lands — §4.3 gives the run four
// slides, and C.3/C.4 extend it rather than move it. The letter is derived anyway
// (§3.5): `FigLabel` takes a label only, and what §3.4 R2 renumbers is everything
// BEHIND this run. No rendered string under `src/slides/leader-shape/` may name a
// letter or a number — the C.1 and C.2 in these comments describe where the deck
// currently puts the slide, which is the one place it is safe to say so.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { PillarOrbit } from "./components/PillarOrbit";
import { hubBrandLineFor, shapeOrgContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function ShapeAgenticOrg({ brandLine }: { brandLine: string | null }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <PillarOrbit brandLine={brandLine} pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// Resolved ONCE, at module scope, exactly as `gap-capability-ladder.tsx` and
// `title.tsx` resolve theirs and for the same reason: `VARIANT` resolves at module
// scope, so one module epoch holds one brand and the URL that decided it cannot
// change without a reload. The component below it takes the resolved line as a
// PROP and reads no variant of its own — which is what lets one test mount both
// brands' hubs in the same epoch and compare them (§4.4 slot 5).
const BRAND_LINE = hubBrandLineFor(VARIANT.brand);

export const shapeAgenticOrgSlide: SlideDef = {
  id: "shape-agentic-org",
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "shape",
  render: () => <ShapeAgenticOrg brandLine={BRAND_LINE} />,
};
