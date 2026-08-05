// THE AGENTIC ORGANIZATION — section C's centrepiece, and the deck's shape.
//
// Spec §6.6 (content) · §7.1 (the visual contract) · §4.4 slot 5 (the brand axis).
// Productionized from the #16 orbit prototype — variant A, which the owner
// picked on a browser walkthrough of all six #16 variants; §7.1 records the
// verdict — and REWRITTEN, not lifted: the prototype is inline-styled end to end,
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
// NINE POSES, one argument each. `./walk.ts` owns WHEN each one lands and names the
// three that are not counted; this is what each one SAYS:
//   0 — THE ENABLER. The hub, its brand line, and the standing kicker that says an
//       operating model is not a department and not a committee.
//   1 — THE SIX PILLARS, with their spokes and labels. ALL SIX AT FULL STRENGTH:
//       nothing is dimmed and nothing is waiting to be undimmed (§7.1 — attention
//       is bought with added light, never subtracted).
//   2 — GOVERNANCE & POLICIES. Where the data may go, written down before someone
//       improvises. The walk opens here because section D opens here.
//   3 — TOOLS & PLATFORM. Who gets a company-managed seat, and that the company
//       pays for it.
//   4 — PEOPLE & MINDSET. Whether the culture rewards the person who tries it or
//       the person who waits.
//   5 — STRATEGY & LEADERSHIP. Which problem gets the pilot, and that leading the
//       culture is part of the job.
//   6 — PROCESS & METHODOLOGY. Where a human still signs, and everywhere they no
//       longer do.
//   7 — AI COMPANIONS. When a tool is allowed to become an agent.
//   8 — THE CLOSER. The ring back at rest — nothing lit, nothing dimmed — and the
//       claim the six beats were evidence for: none of them is a tool purchase.
//
// SIX BEATS AND NO GROUPING, which is where the step budget went. #16 budgeted ~4
// steps; §7.1 spends nine. Pairing the pillars (governance+tools /
// people+strategy / process+companions) would fit the old budget and would cost the
// one-decision-per-pillar clarity that is the only reason this slide can be an
// INDEX for the section behind it — a leader who hears two decisions in one breath
// remembers neither pillar. The count is not typed here either: `STEP_COUNT` is
// derived from the number of pillars that have a decision (see `./walk.ts`), so a
// seventh pillar grows the budget instead of silently losing a beat.
//
// `canonicalPose: 1` — AND IT IS NO LONGER `steps - 1`, so it needs its argument
// written down. The exports print `canonicalPose` and nothing else, and pose 1 is
// the fullest pose in which no ONE of six pillars is singled out. A canonical pose
// INSIDE the walk would print a PDF whose centrepiece emphasises whichever pillar
// the export happened to stop on — six pillars that "move together, or none of them
// move", with one of them lit for a reason the page cannot explain. A canonical
// pose of 0 would export a hub with no organisation around it.
//
// POSE 8 IS THE ONE REAL ALTERNATIVE and was considered: the ring is back at rest
// there, so it singles out nothing, and it adds the closer — arguably the strongest
// single frame this slide has. It is not shipped because #55's acceptance criteria
// pin `canonicalPose` at 1 "unless a different pose is argued for in a comment on
// this issue first", and that argument has not been made on the issue. So 1 ships,
// and the six decisions are SPOKEN rather than printed.
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
import { STEP_COUNT } from "./walk";

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
  // NINE, IMPORTED AND NOT TYPED. `STEP_COUNT` is `hub + ring + one beat per pillar
  // + closer`, counted off `shapeOrgContent.pillars` — so a seventh pillar makes
  // this ten on its own. A literal `9` here is how the seventh pillar's decision
  // becomes a pose the deck can never reach (`DeckContext` clamps at `steps - 1`):
  // no error, no blank slide, no failing test, just one pillar whose decision is
  // never spoken and a closer that arrives while a pillar is still lit.
  steps: STEP_COUNT,
  // Deliberately NOT `STEP_COUNT - 1`, and no longer equal to it — see the argument
  // for pose 1 in the header comment.
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "shape",
  render: () => <ShapeAgenticOrg brandLine={BRAND_LINE} />,
};
