// E.12 — LOOP ENGINEERING
//
// The slide the whole of section E has been walking toward: the three layers make
// one run, and the loop makes it repeat (§8.2). NOT A FOURTH LAYER — the rings are
// space and the loop is time, which is why nothing here is drawn as a ring.
//
// 3 steps, and the argument is built once per pose:
//   0 — THE MINDSET SHIFT. A diptych: prompting turn by turn against looping as a
//       system you design once, with the two practitioners who renamed the job
//       beneath it. See `./components/E12MindsetDiptych.tsx`.
//   1 — THE BIG LOOP, FOUR PARTS. A hover rail — HEARTBEAT · ONE BEAT · CHECKER ·
//       SPINE — and a canvas that is BLANK until a part is hovered or pinned, then
//       magnifies that part. See `./components/E12LoopAnatomy.tsx` and
//       `./components/E12PartPanels.tsx`.
//   2 — THE WORKED EXAMPLE. The same rail; the canvas becomes the morning-triage
//       loop, one beat, where hovering a part lights the stages it owns. See
//       `./components/E12TriageFlow.tsx`.
//
// PACING: hover to magnify, click to pin, un-hover to release — E.9's grammar, so
// there is no Space press inside the diagram (§8.3). The prototype's `1`–`4` pin
// keys, `0` and `\` were dev affordances and do not ship.
//
// THE FIGURE IS NOT AUTHORED HERE. `FigLabel` takes a label only — the letter and
// the number derive from this slide's position in the composed deck (§3), and this
// slide has already collected the dividend: it printed E.12 in all five decks when
// gh#48 landed it, and since gh#53 put a `gap` run in front of the leader
// curriculum it prints **F.12** on the two leader decks and E.12 on the three
// standard ones — with no edit here. Phase 6 moves it again, to H.12. Anyone
// verifying this slide on a leader deck reads the composed deck, never the literal
// "E.12". It also pushes the bridge behind it to E.13 / F.13. The LABEL is
// passed at the call site rather than held in `./content.tsx`, as at every other
// FigLabel in the deck: it is the figure's own mono caption, not slide copy, and
// the content module holds what the audience reads as prose.
//
// NO QUALIFIER STRIP. The mono line under the headline is deleted by owner call
// (§8.3): the term "loop engineering" is carried by the FigLabel and by the two
// quotes, and a strip repeating it would be the third copy of one word.
//
// OWNER CORRECTIONS to the prototype's form, decided 2026-08-04. The gh#48 four
// live in the diptych component and its content:
//   1. one-line left verdict, so both verdict dividers sit at the same y
//   2. Steinberger left (with his affiliation), Cherny right and one line
//   3. each quote block's left edge aligns with its panel's left border
//   4. EVERY card box reacts to hover — a hover affordance on some boxes and not
//      others reads as broken interactivity in front of a room. Rank stays a
//      colour tier, never opacity.
// The gh#49 nine live in `./components/E12LoopAnatomy.tsx` (1, 3, 4, 6, 8, 9) and
// `./components/E12PartPanels.tsx` (2, 5, 7), each named at the code that carries
// it. Two are worth stating here because they change the SHAPE of the pose:
//   3. NO connector between the rail and the canvas — the stepped leader line and
//      its arrow tip are both gone. This supersedes a §8.3 contract clause and is
//      read literally; the `NN ·` prefix on each panel title is the tie instead.
//   4. The canvas is BLANK until a rail card is hovered or pinned, so pose 1 opens
//      rail-only. §8.3's idle `ONE BEAT` resting pose is dropped.
//
// THE FIVE §12.1 BUILD-TIME CALLS, ALL CLOSED 2026-08-04 (gh#50). Each decision
// is written beside the code that carries it; this is the index:
//   1. `BUDGET` / runaway guardrail — KEPT, as a foot line under the rail on
//      poses 1 AND 2. `e12Content.guardrail` in `./content.tsx` holds the copy and
//      the reasoning; `./components/E12LoopAnatomy.tsx` places it. Both poses,
//      because `canonicalPose` is 2 and that is the only pose the PDF and PPTX
//      exports print — a pose-1-only guardrail is the same omission, quieter.
//   2. `/goal` taught on both E.11 and E.12 — kind 2 now names the Ralph card in
//      one line (`panels.heartbeat.kinds[1].callback`), landing in the row gh#49
//      reserved for it. It names the CARD, never a letter: §3 derives letters per
//      deck set.
//   3. Projector legibility — `MONO_FLOOR` / `PROSE_FLOOR` in
//      `./components/E12Primitives.tsx`, enforced by
//      `node scripts/projection-test.mjs e12 --audit`, which found 34 runs under
//      the floors and 2 spilling their boxes. The physical back-row walk is the
//      same script without `--audit`, and is an owner job with a projector.
//   4. Pose-0 entry choreography — CONFIRMED AS BUILT: the connectors mount with
//      the panel, no draw-in. Reasoning at the connectors in
//      `./components/E12MindsetDiptych.tsx`.
//   5. Quote wording and attribution — both quotes are now VERBATIM from Addy
//      Osmani's originating essay, Cherny's with an ellipsis where a sentence is
//      elided, and Steinberger is `CREATOR OF OPENCLAW`, not "founder". Sources
//      and the checks at `mindset.quotes` in `./content.tsx`.
//
// Productionized from `src/slides/prototype-gh19b-e12-loop-engineering/`, and
// rewritten rather than lifted: the prototype is inline-styled, untested, and
// carries dev-only key handlers. CSS vars only, no hex literals; no new fonts or
// libraries.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { E12LoopAnatomy } from "./components/E12LoopAnatomy";
import { E12MindsetDiptych } from "./components/E12MindsetDiptych";
import { e12Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E12LoopEngineering() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label="LOOP ENGINEERING" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      {/* One pose on the stage at a time, and each unmounts when it leaves. The
          diptych's relay and the rail's panels are both entry choreography, so a
          hidden-but-mounted pose would play its entry once, off-stage, and be
          still by the time the room sees it. Walking back re-mounts and replays. */}
      {stepIndex === 0 ? <E12MindsetDiptych /> : <E12LoopAnatomy pose={stepIndex} />}
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e12Slide: SlideDef = {
  id: "e12-loop-engineering",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "fundamentals",
  render: () => <E12LoopEngineering />,
};
