// Ten animated marks — one per node, and each one is its node's verb drawn small.
//
// WHY THIS FILE IS LOCAL AND NOT `src/components/AnimatedGlyph`. That component owns 50
// glyph kinds for sections G and H and is the right thing to reach for when a slide needs a
// mark the deck already has. Not one of the fifty is a construct of the technology
// acceptance model or a link of a condensed change model, and adding ten to a shared union
// would put this slide's iconography — and this slide's stroke weight, and this slide's
// viewBox — into a module four other sections import. The marks here are drawn in the same
// idiom (`viewBox`, classed children, keyframes in a sibling stylesheet) so a reader who has
// read `glyphs.css` has read `./tam-kotter.css`; what they are not is shared.
//
// ═══ TEN MARKS, ONE SIZE, ONE STROKE, ONE TIER. Every glyph is authored in the same
// 20-unit viewBox at the same 1.6 stroke in the same `--copper-300`, because a mark drawn
// larger or heavier than the nine beside it would rank its node — and ranking a node is the
// one thing this stage may not do (`../tam-kotter-geometry.ts` holds the same line in space
// with {@link GLYPH_SIZE}, and `./TamKotterFrames.tsx` holds it in colour with one tier).
// The mark that is DIFFERENT is different in one channel only: `anchor` is the only one that
// does not perform its verb, which is an argument and is written down on its case below.
//
// ═══ EVERY MARK IS DRAWN INSIDE 2…18 OF A 0…20 BOX, and the two units of margin are not
// slack. `overflow: visible` is set on the `<svg>` in `./tam-kotter.css` because two of the
// ten animate OUT of their own bounds — the pulse ring on `actual-use` scales to 1.45 and the
// barrier arm on `enable` sweeps 62° — so a mark authored flush to its viewBox would clip on
// the one frame it is moving. Anything drawn outside those bounds is also 8px from a node's
// own border, where it reads as a printing fault rather than as a mark.
//
// ═══ NO NUMERAL IN ANY OF THE TEN, AND THAT IS THE GUARDRAIL AT ITS TIGHTEST. §6.6 refuses a
// third ordered vocabulary, `../content.ts` refuses an ordinal field, `../tam-kotter-geometry.ts`
// refuses a badge coordinate — and a glyph is the one place left where a `01` could arrive
// without touching any of the three, as a drawn shape rather than as a character. There is no
// digit, no dot count that could be read as one, and no mark whose parts are enumerable: the
// three bars of `usefulness` are a chart, the three dots of `coalition` are people, and
// neither set is five. A future eleventh mark must clear the same bar.
//
// ═══ NO `<animate>` ANYWHERE — the zero-SMIL rule this figure has carried since it shipped.
// Every one of the ten is animated from `./tam-kotter.css`, which is also the only place any
// of them can be retimed. This file is shape and nothing else: no `style` attribute, no
// duration, no delay, no colour.
//
// Presentational and total. Every node id this stage can render has a case; see
// {@link TamKotterGlyph} for what an unknown one gets and why it is not an exception.
import "./tam-kotter.css";

/**
 * The ten node ids, as a type — the other end of the pin between this file and
 * `../content.ts`.
 *
 * DECLARED HERE AND NOT IMPORTED, deliberately. `../content.ts` types its nodes' `id` as
 * `string`, so a union taken from it would be `string` and would check nothing; this is the
 * set of ids that HAVE a mark, which is a different fact and belongs to this file.
 * {@link glyphFor}'s switch is exhaustive over it, so an id added to the copy without a mark
 * drawn for it is a type error at the call site in `./TamKotterFrames.tsx` rather than a
 * silently empty 20px box on a projector.
 */
export type GlyphId =
  | "external-factors"
  | "usefulness"
  | "ease-of-use"
  | "intention"
  | "actual-use"
  | "urgency"
  | "coalition"
  | "enable"
  | "wins"
  | "anchor";

/**
 * One mark, sized by its caller.
 *
 * THE SIZE IS A PROP AND NOT A CONSTANT, because the one number that decides it is a
 * COORDINATE — `GLYPH_SIZE` in `../tam-kotter-geometry.ts` — and a geometry module is where
 * this deck keeps those. A default here would be a second opinion about how big a mark is.
 *
 * `aria-hidden` ON ALL TEN. Each mark restates its node's own label and caption, both of
 * which are real text two millimetres to its left; a screen reader that announced the mark
 * as well would read every node twice. `role="presentation"` is implied by the empty
 * `aria-hidden` subtree and is not written.
 */
export function TamKotterGlyph({
  id,
  size,
  testId,
}: {
  id: GlyphId;
  size: number;
  testId: string;
}) {
  return (
    <div
      className={`tk-glyph tk-glyph-${id}`}
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
 * branch would let an unmarked id compile and render as nothing, and "nothing" on this stage
 * is a 20px hole in a node's right-hand padding that no test and no bounding check reports.
 * TypeScript's exhaustiveness check is the whole guard, so there is deliberately nothing to
 * fall through to.
 *
 * THE `tk-anim-*` CLASSES ARE THE SEAM. Every animated element carries one, `./tam-kotter.css`
 * carries the keyframe, and nothing in this file knows how long anything takes. A reader
 * changing a rhythm never opens this file; a reader changing a shape never opens that one.
 *
 * `pathLength={1}` APPEARS ON EXACTLY THE ELEMENTS THAT ARE DRAWN — the check on `intention`
 * and the three links on `coalition`. It normalises the path so `stroke-dasharray: 1` covers
 * it whatever its real length, which is what lets three links of three different lengths draw
 * at one speed. On any other element it would be inert, and on a filled one it would be a
 * lie.
 */
function glyphFor(id: GlyphId) {
  switch (id) {
    // ── EXTERNAL FACTORS · three sliders being set ──────────────────────────
    // THE ONLY CONTROL IN THE SET, because the node is the only tier of the acceptance
    // model a leader can reach. Three tracks and not four: the node lists four factors
    // and a fourth track would invite the room to pair them off, which would make the
    // mark a legend for the list beside it rather than a mark for the node.
    case "external-factors":
      return (
        <>
          <line className="tk-quiet" x1="3" y1="5" x2="17" y2="5" />
          <line className="tk-quiet" x1="3" y1="10" x2="17" y2="10" />
          <line className="tk-quiet" x1="3" y1="15" x2="17" y2="15" />
          <circle className="tk-solid tk-anim-knob-a" cx="7" cy="5" r="1.9" />
          <circle className="tk-solid tk-anim-knob-b" cx="12" cy="10" r="1.9" />
          <circle className="tk-solid tk-anim-knob-c" cx="9" cy="15" r="1.9" />
        </>
      );

    // ── PERCEIVED USEFULNESS · three bars rising ────────────────────────────
    // "Will this help me do my job better?" is a question about a measurable, so this is
    // the one chart on the stage. The bars are drawn at FULL height and scaled DOWN by the
    // keyframe's first frame, so the shape in this file is the shape a reduced-motion
    // reader gets parked on.
    case "usefulness":
      return (
        <>
          <line className="tk-quiet" x1="3" y1="16.6" x2="17" y2="16.6" />
          <rect
            className="tk-solid tk-anim-bar tk-anim-bar-1"
            x="4.2"
            y="10.6"
            width="3"
            height="6"
            rx="0.6"
          />
          <rect
            className="tk-solid tk-anim-bar tk-anim-bar-2"
            x="8.5"
            y="7.6"
            width="3"
            height="9"
            rx="0.6"
          />
          <rect
            className="tk-solid tk-anim-bar tk-anim-bar-3"
            x="12.8"
            y="4.6"
            width="3"
            height="12"
            rx="0.6"
          />
        </>
      );

    // ── PERCEIVED EASE OF USE · a dot running down a ramp ───────────────────
    // THE RAMP IS STRAIGHT AND THAT IS A CONSTRAINT, NOT A STYLE. The dot is moved by a
    // linear `translate` in `./tam-kotter.css` — the deck does not use `offset-path`,
    // which is the only robust way to send a shape along a curve — so a curved ramp would
    // leave the dot visibly off the line for most of its journey.
    case "ease-of-use":
      return (
        <>
          <line className="tk-quiet" x1="2.6" y1="17.4" x2="17.4" y2="17.4" />
          <line x1="3.5" y1="4.6" x2="16.5" y2="14.6" />
          <circle className="tk-solid tk-anim-glider" cx="3.5" cy="4.6" r="1.9" />
        </>
      );

    // ── BEHAVIORAL INTENTION · a check drawn inside a thought ───────────────
    // The construct is a DECISION that has not happened yet, so the check is drawn over and
    // over rather than simply being there. The two tails are what keep this from reading as
    // the same mark as `actual-use`: one is a thought, the other is a thing running.
    case "intention":
      return (
        <>
          <path d="M 2.6 8.4 Q 2.6 3.6 7.4 3.6 L 12.8 3.6 Q 17.6 3.6 17.6 8.4 Q 17.6 13.2 12.8 13.2 L 7.4 13.2 Q 2.6 13.2 2.6 8.4 Z" />
          <path className="tk-anim-check" pathLength={1} d="M 6.4 8.4 L 9 11 L 13.8 5.8" />
          <circle className="tk-solid tk-anim-tail-1" cx="5.4" cy="15.6" r="1.3" />
          <circle className="tk-solid tk-anim-tail-2" cx="3" cy="17.9" r="0.9" />
        </>
      );

    // ── ACTUAL USE · something running, with a ring around it ───────────────
    // The end of the chain and the only construct in the model anybody can measure, so it
    // is the one mark that shows a thing IN OPERATION. The ring is a second copy of the
    // frame at the same coordinates — the keyframe scales and fades it, so the resting
    // shape is two identical rectangles and there is nothing to keep in agreement.
    case "actual-use":
      return (
        <>
          <rect className="tk-anim-pulse" x="3.6" y="4.6" width="12.8" height="11.4" rx="2" />
          <rect x="3.6" y="4.6" width="12.8" height="11.4" rx="2" />
          <path className="tk-solid tk-anim-play" d="M 8.4 7.6 L 12.9 10.3 L 8.4 13 Z" />
        </>
      );

    // ── CREATE URGENCY · a clock, running ──────────────────────────────────
    // "Why must we change NOW?" is a question about a clock that is already running, so
    // this is the only mark in the set that never pauses and never reverses. The hand is
    // wrapped in a `<g>` because it rotates about the FACE's centre rather than its own.
    case "urgency":
      return (
        <>
          <line className="tk-quiet tk-anim-bell" x1="4.6" y1="4.4" x2="6.3" y2="6.1" />
          <line className="tk-quiet tk-anim-bell" x1="15.4" y1="4.4" x2="13.7" y2="6.1" />
          <circle cx="10" cy="11" r="6.4" />
          <g className="tk-anim-hand">
            <line x1="10" y1="11" x2="10" y2="6.2" />
          </g>
        </>
      );

    // ── BUILD COALITION · three links drawing between three people ─────────
    // Three dots that are always there and three links that are not: a coalition is not
    // who is in the room, it is what is joined. The links are declared BEFORE the dots so
    // the dots paint over their ends — SVG has no z-index and paint order is document
    // order.
    case "coalition":
      return (
        <>
          <line className="tk-anim-link tk-anim-link-1" pathLength={1} x1="4" y1="16" x2="16" y2="16" />
          <line className="tk-anim-link tk-anim-link-2" pathLength={1} x1="4" y1="16" x2="10" y2="3.6" />
          <line className="tk-anim-link tk-anim-link-3" pathLength={1} x1="10" y1="3.6" x2="16" y2="16" />
          <circle className="tk-solid" cx="10" cy="3.6" r="1.7" />
          <circle className="tk-solid" cx="4" cy="16" r="1.7" />
          <circle className="tk-solid" cx="16" cy="16" r="1.7" />
        </>
      );

    // ── ENABLE ACTION · a barrier lifting ──────────────────────────────────
    // "Remove the barriers" is an ACT, and the mark is the act rather than its result: the
    // arm goes up, holds long enough to be read, and comes back down so it can go up
    // again. A permanently-raised barrier would be a state, and the caption is an
    // imperative. The arm is drawn DOWN, which is its resting frame under reduced motion.
    case "enable":
      return (
        <>
          <line className="tk-quiet" x1="2" y1="17.6" x2="18" y2="17.6" />
          <line x1="4.6" y1="6.2" x2="4.6" y2="17.6" />
          <g className="tk-anim-arm">
            <rect className="tk-solid" x="4.6" y="8" width="13.2" height="2.2" rx="1.1" />
          </g>
        </>
      );

    // ── GENERATE WINS · a cup, catching light ──────────────────────────────
    // The most literal mark in the set, on purpose: the caption's requirement is that the
    // organisation SEES something work, and a cup is what "a visible result" looks like
    // when it has to survive being 20px wide. Two sparks out of phase, so it reads as
    // catching light rather than blinking. THE SPARKS SIT ABOVE THE RIM AND NOT BESIDE IT:
    // at handle height a 1.1-unit filled circle on the cup's right reads as a full stop
    // somebody left in the node, which is what the first cut of this mark actually shipped.
    case "wins":
      return (
        <>
          <path className="tk-quiet" d="M 6.4 16.6 H 13.6" />
          <path className="tk-quiet" d="M 8.2 14.2 H 11.8" />
          <path d="M 7 4.2 H 13 V 8.4 Q 13 11.4 10 11.4 Q 7 11.4 7 8.4 Z" />
          <path d="M 7 5.4 H 5.2 Q 4.1 5.4 4.1 7 Q 4.1 8.9 6.3 9.4" />
          <path d="M 13 5.4 H 14.8 Q 15.9 5.4 15.9 7 Q 15.9 8.9 13.7 9.4" />
          <line x1="10" y1="11.4" x2="10" y2="14.2" />
          <circle className="tk-solid tk-anim-spark tk-anim-spark-1" cx="16.8" cy="2.6" r="1.2" />
          <circle className="tk-solid tk-anim-spark tk-anim-spark-2" cx="3.2" cy="3.4" r="0.9" />
        </>
      );

    // ── ANCHOR IN CULTURE · an anchor, holding ─────────────────────────────
    // THE ONLY MARK IN THE SET THAT DOES NOT PERFORM ITS VERB, and that is the argument
    // rather than a shortfall. Every other glyph moves because its node is something
    // somebody DOES; the last link of the change model is the one that says the doing is
    // over — "make it how we work, NOT a project". So the anchor only breathes, by less
    // than a pixel, and a room that has watched nine marks work reads the tenth as at rest.
    case "anchor":
      return (
        <g className="tk-anim-body">
          <circle cx="10" cy="4.4" r="1.9" />
          <line x1="10" y1="6.3" x2="10" y2="15.6" />
          <line x1="6.2" y1="8.2" x2="13.8" y2="8.2" />
          <path d="M 4.4 12.4 Q 4.8 16.9 10 16.9 Q 15.2 16.9 15.6 12.4" />
        </g>
      );
  }
}
