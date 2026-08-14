// Eight animated marks — TWO PER PHASE, and the pair is the slide's argument.
//
// ═══ WHY EIGHT AND NOT FOUR. Scenes 1 and 2 print the same four columns on the same
// shelf at the same size, and only the body changes: the organisation's own dates, then
// the deck's gate. Four marks reused would make that click read as a caption swap. Eight
// make it read as what it is, because the two SETS move in two different grammars:
//
//   · THE STATE MARKS (scene 1) all perform A CALENDAR ADVANCING. A flag flies over a
//     step drawn dashed. A load presses a stack that does not move. A dot crosses its
//     box and turns back. Three agents light in turn, forever. Every one of them repeats
//     and arrives nowhere it has not already been — which is exactly what a published
//     date does.
//   · THE GATE MARKS (scene 2) all perform A MEASUREMENT THAT LANDS. A needle sweeps up
//     the dial and HOLDS there. A hand lets go and the wheel keeps turning. A line is
//     written and a seal presses it. A signal travels the escalation path and the person
//     at the end answers. Every one of them completes.
//
// That pair is the headline — a date arrives on its own, a gate does not — said in the
// one channel a printed plan does not have. A room that reads nothing off this stage but
// the movement still gets the slide.
//
// ═══ WHY THIS FILE IS LOCAL AND NOT `src/components/AnimatedGlyph`. That component owns
// 50 glyph kinds for sections G and H. Not one of the fifty is a claimed rung, a
// decision contract or an escalation path that ends at somebody, and adding eight to a
// shared union would put this slide's iconography — and its stroke weight, and its
// viewBox — into a module four other sections import. `./EnablementGlyphs.tsx` and
// `../../leader-shape/components/TamKotterGlyphs.tsx` made the identical call for the
// identical reason, and the marks here are drawn in their idiom so a reader who has read
// either file has read this one.
//
// ═══ ONE STROKE, ONE TIER, THREE SIZES — AND THE SIZE IS THE SCENE'S, NEVER THE MARK'S.
// Every glyph is authored in the same 20-unit viewBox at the same 1.6 stroke in the same
// `--copper-300`; the caller picks 88 (a hero card) or 26 (a recap column), from
// `../phases-gates-geometry.ts`, and every mark in one scene gets the same one. A mark
// drawn larger or heavier than the ones beside it would rank its phase, and no phase on
// this slide outranks another — P0 is months and P3 may be years, and the plan is not a
// Gantt chart.
//
// ═══ EVERY MARK IS DRAWN INSIDE 2…18 OF A 0…20 BOX. `overflow: visible` is set on the
// `<svg>` in `./phases.css` because three of the eight animate OUT of their own bounds:
// `measure`'s needle sweeps a 104° arc, `contract`'s seal scales to 1.55, and
// `unpushed`'s pusher retreats past its own left edge.
//
// ═══ NO `<animate>` ANYWHERE — the zero-SMIL rule this deck keeps everywhere. Every one
// of the eight is animated from `./phases.css`, which is also the only place any of them
// can be retimed. THIS FILE IS SHAPE AND NOTHING ELSE: no duration, no easing, no colour,
// and not one `style` attribute in the module.
//
// Presentational and total. Every id the stage can render has a case; see {@link
// PhaseGlyph} for what an unknown one gets and why it is not an exception.
import "./phases.css";

/**
 * The eight ids that HAVE a mark — the other end of the pin between this file and
 * `../content.ts`.
 *
 * DECLARED HERE AND NOT IMPORTED, deliberately. `../content.ts` types `Phase.stateGlyph`
 * and `Phase.gateGlyph` as `string`, so a union taken from it would be `string` and would
 * check nothing; this is the set of ids a mark has been DRAWN for, which is a different
 * fact and belongs to this file. {@link glyphFor}'s switch is exhaustive over it, so a
 * mark this file forgets to draw is a compile error here.
 *
 * A RUNTIME TUPLE AND NOT ONLY A TYPE, because the type alone cannot close the hole at
 * the other end. `./PhaseLadder.tsx` has to cast at its call site; a cast is a promise,
 * and the promise this one makes is checked at module load by that file's own guard,
 * which needs a value to check against. Without it, writing a phase whose `gateGlyph` is
 * `"budget"` would compile, pass every type check, and render an 88px hole in the middle
 * of a card that no bounding check reports.
 */
export const PHASE_GLYPH_IDS = [
  // the four STATES — scene 1
  "claimed",
  "solid",
  "bounded",
  "governed",
  // the four GATES — scene 2
  "measure",
  "unpushed",
  "contract",
  "answered",
] as const;

export type PhaseGlyphId = (typeof PHASE_GLYPH_IDS)[number];

/**
 * One mark, sized by its caller.
 *
 * THE SIZE IS A PROP AND NOT A CONSTANT, because the one number that decides it is a
 * COORDINATE — `GLYPH_SIZE` or `RECAP_GLYPH_SIZE` in `../phases-gates-geometry.ts` — and
 * a geometry module is where this deck keeps those. A default here would be a second
 * opinion about how big a mark is.
 *
 * `aria-hidden` ON ALL EIGHT. Each mark restates its own card's label and body, both of
 * which are real text a few millimetres away; a screen reader that announced the mark as
 * well would read every card twice.
 */
export function PhaseGlyph({
  id,
  size,
  testId,
}: {
  id: PhaseGlyphId;
  size: number;
  testId: string;
}) {
  return (
    <div
      className={`pg-glyph pg-glyph-${id}`}
      style={{ width: size, height: size }}
      data-testid={testId}
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 20">{glyphFor(id)}</svg>
    </div>
  );
}

/**
 * The shapes, one case per id.
 *
 * EXHAUSTIVE AND WITH NO `default`, which is the point of the union above: a `default`
 * branch would let an unmarked id compile and render as nothing, and "nothing" on this
 * stage is an 88px hole in the middle of a card that no test and no bounding check
 * reports. TypeScript's exhaustiveness check is the whole guard, so there is deliberately
 * nothing to fall through to.
 *
 * THE `pg-anim-*` CLASSES ARE THE SEAM. Every animated element carries one, `./phases.css`
 * carries the keyframe, and nothing in this file knows how long anything takes. A reader
 * changing a rhythm never opens this file; a reader changing a shape never opens that one.
 *
 * `en-quiet` AND `en-solid` ARE NOT USED HERE — the two modifier classes are `pg-quiet`
 * and `pg-solid`, declared in this slide's own stylesheet. The names look borrowed and are
 * not: every slide family in this tree owns its own selectors, so restyling K.1's marks
 * can never restyle K.2's.
 */
function glyphFor(id: PhaseGlyphId) {
  switch (id) {
    // ══════════════ THE FOUR STATES ══════════════

    // ── CLAIMED · a flag on a step drawn dashed ─────────────────────────────
    // THE STATE'S WHOLE MEANING IS IN THE GROUND UNDER IT. A flag says somebody got
    // here; a dashed tread says the step is not built. "Claimed" is the only one of the
    // four states that can be true while nothing is, and this is the only mark on the
    // slide whose argument is made by the part that does not move.
    case "claimed":
      return (
        <>
          <line className="pg-quiet" x1="3" y1="16.6" x2="17" y2="16.6" strokeDasharray="2.6 2.2" />
          <line x1="6" y1="3.6" x2="6" y2="16.6" />
          <path className="pg-anim-flutter" d="M 6 4.2 L 14.8 6.9 L 6 9.6 Z" />
        </>
      );

    // ── SOLID · a load presses, and the stack does not move ─────────────────
    // PROVED BY AN ABSENCE, which is the hard thing to draw. So the moving part is the
    // LOAD and the subject is what refuses to move under it: three bars that are byte
    // for byte identical on every frame of the loop.
    case "solid":
      return (
        <>
          <g className="pg-anim-press">
            <line x1="10" y1="1.8" x2="10" y2="4.2" />
            <polyline points="8 2.6, 10 4.6, 12 2.6" />
          </g>
          <rect x="5.4" y="6.2" width="9.2" height="3" />
          <rect x="5.4" y="10" width="9.2" height="3" />
          <rect x="5.4" y="13.8" width="9.2" height="3" />
        </>
      );

    // ── BOUNDED · a dot crosses its box and turns back ──────────────────────
    // THE WALL IS DRAWN AND THE AGENT IS WHAT MOVES INSIDE IT. L3's own definition is
    // "one agent does the task, a decision contract sets its limits", so the box is the
    // contract: quiet, because it is the surface rather than the subject, and closed,
    // because a bound with a gap in it is not one.
    case "bounded":
      return (
        <>
          <rect className="pg-quiet" x="2.8" y="4.8" width="14.4" height="10.4" />
          <circle className="pg-solid pg-anim-cross" cx="6.4" cy="10" r="1.9" />
        </>
      );

    // ── GOVERNED · three agents under one person ────────────────────────────
    // THE SHAPE IS THE CLAIM AND THE MOTION IS THE TRAFFIC. L4 is "agents split one job,
    // with escalation paths back to people", so the drawing is a trunk, a bus and three
    // drops — an org chart, which is a shape every leader reads without a legend — and
    // the three agents take turns being the one that is working. The person at the top
    // is solid and never moves: the whole point of the state is that they are always
    // there.
    case "governed":
      return (
        <>
          <circle className="pg-solid" cx="10" cy="3.8" r="1.9" />
          <line className="pg-quiet" x1="10" y1="5.7" x2="10" y2="9.6" />
          <line className="pg-quiet" x1="4.6" y1="9.6" x2="15.4" y2="9.6" />
          <line className="pg-quiet" x1="4.6" y1="9.6" x2="4.6" y2="13.4" />
          <line className="pg-quiet" x1="10" y1="9.6" x2="10" y2="13.4" />
          <line className="pg-quiet" x1="15.4" y1="9.6" x2="15.4" y2="13.4" />
          <circle className="pg-solid pg-anim-agent-1" cx="4.6" cy="15" r="1.6" />
          <circle className="pg-solid pg-anim-agent-2" cx="10" cy="15" r="1.6" />
          <circle className="pg-solid pg-anim-agent-3" cx="15.4" cy="15" r="1.6" />
        </>
      );

    // ══════════════ THE FOUR GATES ══════════════

    // ── MEASURE · a needle sweeps the dial and holds ────────────────────────
    // THE GATE IS "THE POST-ASSESSMENT SCORE MOVES", and a dial is the plainest drawing
    // of a thing that is either measured or not. THE HOLD IS THE GATE: the needle spends
    // most of the loop at the top, which is what makes this a measurement that landed
    // rather than a meter twitching. It returns because a loop must, not because the
    // score does.
    case "measure":
      return (
        <>
          <path className="pg-quiet" d="M 3.4 14.4 A 6.6 6.6 0 0 1 16.6 14.4" />
          <line className="pg-quiet" x1="3.4" y1="14.4" x2="16.6" y2="14.4" />
          <line className="pg-anim-sweep" x1="10" y1="14.4" x2="10" y2="6.6" />
          <circle className="pg-solid" cx="10" cy="14.4" r="1.3" />
        </>
      );

    // ── UNPUSHED · the hand lets go and the wheel keeps turning ─────────────
    // THE ONE MARK ON THE SLIDE WHOSE SUBJECT IS WHAT LEAVES. P1's gate is "daily use
    // holds when the programme stops pushing it", so the pusher retreats and dissolves,
    // and the wheel behind it does not change speed by one frame. `linear` and `infinite`
    // on the wheel is the whole of the gate: a wheel that eased would be responding to
    // the hand.
    case "unpushed":
      return (
        <>
          <circle cx="11.6" cy="10" r="5.2" />
          <g className="pg-anim-spin">
            <line x1="11.6" y1="4.8" x2="11.6" y2="15.2" />
            <line x1="6.4" y1="10" x2="16.8" y2="10" />
          </g>
          <g className="pg-anim-letgo">
            <line x1="2.8" y1="10" x2="5.4" y2="10" />
            <polyline points="4.2 8.5, 5.8 10, 4.2 11.5" />
          </g>
        </>
      );

    // ── CONTRACT · a line is written, then a seal presses it ────────────────
    // TWO EVENTS IN ONE CYCLE AND IN THIS ORDER, which is the gate's own order: the
    // decision contract is WRITTEN DOWN before the first agent runs. The seal's frames
    // sit in the last third of the same 3600ms loop as the line's, so the two cannot
    // drift out of sequence — a seal on its own timer would eventually stamp a blank page.
    case "contract":
      return (
        <>
          <path className="pg-quiet" d="M 4 2.8 H 16 V 17.2 H 4 Z" />
          <line className="pg-quiet" x1="6.2" y1="6.2" x2="13.8" y2="6.2" />
          <line className="pg-anim-write" x1="6.2" y1="9.2" x2="13.8" y2="9.2" />
          <circle className="pg-anim-seal" cx="12.8" cy="13.4" r="2.4" />
        </>
      );

    // ── ANSWERED · the signal travels the path and a person answers ─────────
    // THE GATE IS THE PERSON AND NOT THE PATH — "every escalation path ends at a person
    // who answers it" — so the path is quiet, the travelling signal is what makes it a
    // path rather than a diagram, and the only thing at full tier is the mark at the end
    // of it. The pulse is a SCALE and not a fading ring: the mark has to rest visible,
    // because a person who is not there is this gate's failure.
    case "answered":
      return (
        <>
          <polyline className="pg-quiet" points="2.8 16.6, 8 16.6, 8 11.6, 13 11.6, 13 7.4" />
          <polyline className="pg-anim-travel" points="2.8 16.6, 8 16.6, 8 11.6, 13 11.6, 13 7.4" />
          <circle className="pg-solid pg-anim-answer" cx="13" cy="4.8" r="2.2" />
        </>
      );
  }
}
