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
// says that; a list of six bullets says the leader may fund three of them.
//
// ────────────────────────────────────────────────────────────────────────────
// TWO POSES, AND THE SIX DECISIONS ARE REACHED WITH THE POINTER. This replaces the
// nine-pose focus walk #55 shipped (hub · ring · six beats · closer), owner call,
// 2026-08-13. The argument, because #55 spent one getting the budget UP to nine:
//
//   1. THE FIGURE IS ONE THING, SO IT ARRIVES AS ONE THING. Poses 0 and 1 used to
//      split it — a disc alone on a black stage, then the six pillars — and the
//      first of those is a frame the room can do nothing with. They are joined
//      here into a single staged BUILD that runs on mount: the disc settles, six
//      spokes grow out of it, six boxes land at their ends, the beads start, the
//      panel opens. Same choreography, no click. `./components/agentic-org.css`
//      owns it and `BUILD` in `./components/PillarOrbit.tsx` owns the timetable.
//   2. SIX BEATS PUT THE ORDER IN THE DECK'S HANDS, and §6.6 asks this slide to be
//      an INDEX for section D. An index is something you look things up in. A Div
//      Head who asks about the seats during the governance beat had to be walked
//      through three decisions they did not ask for; now the pointer answers, in
//      whatever order the room asks. Hover opens a pillar; click PINS it, and a pin
//      HOLDS THE PANEL — hovering another box still lights that box, but the words on
//      the right stay on the pinned decision until a second click releases it.
//      `resolveFocus`, `isLit` and `togglePin` in `./walk.ts` own those three rules.
//   3. THE DECISIONS GOT DEEPER, WHICH IS WHERE THE FREED BUDGET WENT. Each pillar
//      now carries HR p4's own sub-bullets under its decision (`Pillar.points`),
//      which is the answer to the question a decision always provokes — *what does
//      that actually cover?* — and which there was no room for in a beat that had
//      to be read in one breath.
//   4. THE LAST POSE IS A RECAP, NOT A THESIS. It used to be the closer standing
//      alone in an empty column, with its evidence already off the stage. It now
//      prints all six decisions compressed to their objects under one shared stem,
//      with the closer under a hairline beneath them, while the ring behind it
//      lights ALL SIX pillars at once — the panel and the figure making the
//      headline's claim in two registers at the same moment.
//
// WHAT THE OLD SHAPE COST, stated plainly so this is reversible: the walk
// guaranteed the room heard all six decisions, and the pointer does not. That is
// the trade. The recap is what pays for it — every decision is stated there,
// unconditionally, whether or not anyone touched the figure — and the panel's idle
// block means a presenter who never touches the slide still delivers the argument.
// ────────────────────────────────────────────────────────────────────────────
//
// TWO POSES, one argument each:
//   0 — THE FIGURE. The enabler, its brand line, six spokes, six pillars, and the
//       panel beside them. Every one of the six decisions is reachable from here
//       without leaving the pose. NOTHING IS DIMMED and nothing is waiting to be
//       undimmed (§7.1 — attention is bought with added light, never subtracted);
//       the pillar under the pointer GAINS fill, a thickened spoke, a halo and a
//       reversed bead flow, and the other five are unchanged byte for byte.
//   1 — THE RECAP. All six pillars lit at once, the six decisions as six
//       fragments under one stem, and the claim they are evidence for: none of
//       them is a tool purchase.
//
// THERE IS NO SUBTITLE. A standing mono kicker — "AN OPERATING MODEL — NOT A
// DEPARTMENT, NOT A COMMITTEE" — printed under the headline at every pose; it is cut
// (owner call, 2026-08-13) along with `KICKER_TOP` in `./geometry.ts` and the
// `kicker` field in `./content.ts`, which both record the deletion where they used to
// live. The headline stands alone over the figure.
//
// `canonicalPose: 1` — unchanged from #55, and it now needs a different argument
// than the one #55 gave it. The exports print `canonicalPose` and nothing else, and
// pose 1 is the pose in which no ONE of six pillars is singled out AND every
// decision is on the page: six recap fragments, the closer, and a ring with all six
// lit equally. #55's acceptance criterion pins this at 1 "unless a different pose is
// argued for in a comment on this issue first" — the number does not move, and what
// it prints is strictly more than it printed before. Pose 0 would export a figure
// whose panel is showing an idle prompt, because a PDF has no pointer.
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

      {/* TWO ELEMENTS IN THE HEADER AND NOT THREE. The `.slide-headline-row` used to
          be followed by a mono kicker in the band beneath it; that line is cut, and
          nothing replaced it — the space is the point. */}
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
  // TWO, IMPORTED AND NOT TYPED — and the import now buys something different than
  // it used to. Under nine poses `STEP_COUNT` was derived from the pillar count, so
  // a seventh pillar grew the budget instead of losing a beat. There are no beats
  // left to lose: a seventh pillar costs zero steps, because the pointer reaches it
  // for free. What the import still buys is ONE place where the figure's pose budget
  // is written down, next to the `POSE` names the component branches on.
  steps: STEP_COUNT,
  // The recap, and see the argument in the header comment. Deliberately equal to
  // `STEP_COUNT - 1` here, where it used to be deliberately not.
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "shape",
  render: () => <ShapeAgenticOrg brandLine={BRAND_LINE} />,
};
