// Ten animated marks — one per block, pillar and track, and each one is its own card's verb
// drawn small.
//
// WHY THIS FILE IS LOCAL AND NOT `src/components/AnimatedGlyph`. That component owns 50 glyph
// kinds for sections G and H and is the right thing to reach for when a slide needs a mark the
// deck already has. Not one of the fifty is a slow approval, a literacy ceiling or a steward, and
// adding ten to a shared union would put this slide's iconography — and this slide's stroke
// weight, and this slide's viewBox — into a module four other sections import.
// `../../leader-shape/components/TamKotterGlyphs.tsx` made the identical call for the identical
// reason; the marks here are drawn in the same idiom (`viewBox`, classed children, keyframes in a
// sibling stylesheet) so a reader who has read that file has read this one. What they are not is
// shared.
//
// ═══ TEN MARKS, ONE STROKE, ONE TIER, AND THREE SIZES — AND THE SIZES ARE THE SCENE'S, NEVER THE
// MARK'S. Every glyph is authored in the same 20-unit viewBox at the same 1.6 stroke in the same
// `--copper-300`; the caller picks 88 (a card), 44 (a track row) or 26 (a recap chip), and every
// mark in one scene gets the same one. A mark drawn larger or heavier than the ones beside it
// would rank its card, and ranking a card is the one thing this stage may not do
// (`../enablement-geometry.ts` holds the same line in space, `./enablement.css` in colour).
//
// ═══ THE THREE SCENES EACH HAVE THEIR OWN GRAMMAR OF MOTION, and it is the reason this file
// exists rather than a set of static icons. `./enablement.css` carries the whole argument; the
// short form is that the three BLOCKS all perform a failure — nothing they start completes — the
// four PILLARS all perform a structure working and repeating, and the three TRACKS all perform
// reach. A reader who takes nothing off the stage but the movement still learns which of the
// three scenes they are looking at.
//
// ═══ EVERY MARK IS DRAWN INSIDE 2…18 OF A 0…20 BOX, and the two units of margin are not slack.
// `overflow: visible` is set on the `<svg>` in `./enablement.css` because two of the ten animate
// OUT of their own bounds — `support`'s ring scales to 1.35 and `access`'s key sweeps 90° — so a
// mark authored flush to its viewBox would clip on the one frame it is moving. `practice` SPENDS
// THAT MARGIN WITHOUT LEAVING THE BOX: its saw is authored at the far end of its stroke, so the
// grip travels to x≈2.1 on the pull and nothing it paints ever reaches the viewBox edge.
//
// ═══ NO NUMERAL AND NO LETTER IN ANY OF THE TEN. The slide prints no digit at any pose, and a
// glyph is the one place a digit could arrive as a drawn shape rather than as a character. There
// is no numeral, no countable set that could be read as one, and nothing enumerable: `everyone`'s
// eight dots are people, `builders`' three bars are parts of one thing, and neither set is a
// figure the room could quote back.
//
// ═══ NO `<animate>` ANYWHERE — the zero-SMIL rule this deck keeps everywhere. Every one of the
// ten is animated from `./enablement.css`, which is also the only place any of them can be
// retimed. This file is SHAPE AND NOTHING ELSE: no duration, no easing, no colour, and ONE
// `style` attribute in the whole module — the eight `animationDelay`s `everyone` needs, which are
// `i × pitch` over a list and are therefore arithmetic a stylesheet cannot do. That exception is
// argued on its own case below and nothing else may take it.
//
// Presentational and total. Every id the stage can render has a case; see {@link EnablementGlyph}
// for what an unknown one gets and why it is not an exception.
import "./enablement.css";

/**
 * The ten ids that HAVE a mark — the other end of the pin between this file and `../content.ts`.
 *
 * DECLARED HERE AND NOT IMPORTED, deliberately. `../content.ts` types every `id` as `string`, so
 * a union taken from it would be `string` and would check nothing; this is the set of ids a mark
 * has been drawn for, which is a different fact and belongs to this file. {@link glyphFor}'s
 * switch is exhaustive over it, so a mark this file forgets to draw is a compile error here.
 *
 * A RUNTIME TUPLE AND NOT ONLY A TYPE, because the type alone cannot close the hole at the OTHER
 * end. The content module types every `id` as `string`, so `./EnablementModel.tsx` has to cast at
 * the call site; a cast is a promise, and the promise this one makes is checked at module load by
 * that file's own guard, which needs a value to check against. Without it, writing a block called
 * `budget` would compile, pass every type check, and render an 88px hole in the middle of a card
 * that no bounding check reports.
 */
export const GLYPH_IDS = [
  "tools",
  "literacy",
  "resistance",
  "access",
  "curriculum",
  "practice",
  "support",
  "everyone",
  "builders",
  "stewards",
] as const;

export type GlyphId = (typeof GLYPH_IDS)[number];

/** The eight dots of `everyone`, as coordinates — a 4×2 field, and the one mark on the slide with
 *  more than four moving parts.
 *
 *  A DATA ARRAY AND NOT EIGHT HAND-WRITTEN CIRCLES, because the eight need eight DELAYS as well
 *  as eight positions and the delay has to be `i × pitch` for the wave to rank nobody. Written
 *  out, one dot would eventually get a delay somebody typed. */
const MANY_DOTS: readonly { cx: number; cy: number }[] = [
  { cx: 4.4, cy: 7.4 },
  { cx: 8.4, cy: 7.4 },
  { cx: 12.4, cy: 7.4 },
  { cx: 16.4, cy: 7.4 },
  { cx: 4.4, cy: 13 },
  { cx: 8.4, cy: 13 },
  { cx: 12.4, cy: 13 },
  { cx: 16.4, cy: 13 },
];

/** How far apart in the wave two of {@link MANY_DOTS} sit, as a fraction of the loop. The one
 *  timing number in this file, and it is here rather than in the stylesheet because it is
 *  MULTIPLIED BY AN INDEX — a stylesheet cannot do arithmetic over a list. */
const MANY_STAGGER_MS = 110;

/**
 * One mark, sized by its caller.
 *
 * THE SIZE IS A PROP AND NOT A CONSTANT, because the one number that decides it is a COORDINATE —
 * `GLYPH_SIZE`, `LANE_GLYPH_SIZE` or `CHIP_GLYPH_SIZE` in `../enablement-geometry.ts` — and a
 * geometry module is where this deck keeps those. A default here would be a second opinion about
 * how big a mark is.
 *
 * `aria-hidden` ON ALL TEN. Each mark restates its own card's label and line, both of which are
 * real text a few millimetres away; a screen reader that announced the mark as well would read
 * every card twice. `role="presentation"` is implied by the empty `aria-hidden` subtree and is not
 * written.
 */
export function EnablementGlyph({
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
      className={`en-glyph en-glyph-${id}`}
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
 * EXHAUSTIVE AND WITH NO `default`, which is the point of the union above: a `default` branch
 * would let an unmarked id compile and render as nothing, and "nothing" on this stage is an 88px
 * hole in the middle of a card that no test and no bounding check reports.
 * TypeScript's exhaustiveness check is the whole guard, so there is deliberately nothing to fall
 * through to.
 *
 * THE `en-anim-*` CLASSES ARE THE SEAM. Every animated element carries one, `./enablement.css`
 * carries the keyframe, and nothing in this file knows how long anything takes. A reader changing
 * a rhythm never opens this file; a reader changing a shape never opens that one.
 *
 * NO `pathLength` ON ANY OF THE TEN, as of the 2026-08-14 redraw. It was on exactly one element —
 * `literacy`'s unfinished square, to normalise the outline a `stroke-dasharray: 1` walked — and
 * that square is gone. Nothing here is dash-drawn any more; the figure's only dashed paths are the
 * recap's four connectors in `./EnablementModel.tsx`, which carry their own. On an element that is
 * not dashed the attribute is inert, and on a filled one it is a lie.
 */
function glyphFor(id: GlyphId) {
  switch (id) {
    // ── TOOLS · a dot waiting at a gate ─────────────────────────────────────
    // THE BLOCK IS A QUEUE AND THE MARK IS THE VIEW FROM THE BACK OF IT. The barrier is the
    // subject and is stroked at full tier; the ground it stands on is `en-quiet`. The dot goes
    // most of the way and comes back, forever — see `en-waiting` in `./enablement.css`.
    //
    // NO PADLOCK, WHICH WAS THE FIRST DRAWING. A lock says "forbidden"; the block says "slow",
    // and those are two different problems with two different answers. A gate that opens for
    // somebody eventually is the honest shape.
    case "tools":
      return (
        <>
          <line className="en-quiet" x1="2.4" y1="16.4" x2="17.6" y2="16.4" />
          <line x1="13.4" y1="4.6" x2="13.4" y2="16.4" />
          <line className="en-quiet" x1="13.4" y1="6.2" x2="17.6" y2="6.2" />
          <circle className="en-solid en-anim-waiting" cx="5.4" cy="11.6" r="2" />
        </>
      );

    // ── LITERACY · a bubble talking over a site nothing lands on ────────────
    // REDRAWN 2026-08-14 (owner: "the animation glyphs are not good enough for literacy"). IT WAS
    // A BUBBLE BESIDE A SQUARE THAT DREW TO THREE-FIFTHS, and the owner is right: at 88px this
    // deck's 1.6 stroke is SEVEN PIXELS wide, so a 5.8-unit square parked at three-fifths is
    // three thick brackets sitting a stroke away from the bubble's tail — the two shapes touched
    // and read as one accidental object, and a part-drawn box reads as a rendering fault rather
    // than as an unfinished thing. THE LESSON THAT PRICES EVERY MARK ON THIS SLIDE: at seven
    // pixels of stroke a glyph holds ONE object plus a ground line, and two objects competing for
    // 88px is what produced the blob.
    //
    // SO THE BUBBLE IS NOW THE WHOLE MARK, and the failure is what LEAVES it. Three round dots
    // keep blinking inside — chatting with the tool already works, daily, which is the clause
    // that makes this block a ceiling rather than a training gap. Under the tail, a square block
    // drops out, falls, and dissolves in mid-air short of the ground. ROUND FOR WHAT IS SAID AND
    // SQUARE FOR WHAT WOULD BE BUILT, which is the recap's own vocabulary — every block and
    // pillar on this slide is drawn as a box — so the shape that never lands is the shape the
    // rest of the figure is made of.
    //
    // THE GROUND LINE IS LOAD-BEARING AND IS NOT DECORATION. It is the only thing that makes the
    // block's fall a fall: without a floor to fail to reach, a square fading at mid-height is a
    // square fading. It is also what the rest frame says — a talking bubble over a bare site.
    case "literacy":
      return (
        <>
          <path
            className="en-quiet"
            d="M 3.8 1.8 H 16.2 A 1.6 1.6 0 0 1 17.8 3.4 V 6.6 A 1.6 1.6 0 0 1 16.2 8.2 H 10.6 L 8 10.6 V 8.2 H 3.8 A 1.6 1.6 0 0 1 2.2 6.6 V 3.4 A 1.6 1.6 0 0 1 3.8 1.8 Z"
          />
          <circle className="en-solid en-anim-say-1" cx="7" cy="5" r="1.05" />
          <circle className="en-solid en-anim-say-2" cx="10" cy="5" r="1.05" />
          <circle className="en-solid en-anim-say-3" cx="13" cy="5" r="1.05" />
          <rect className="en-solid en-anim-drop" x="6.9" y="11.4" width="2.2" height="2.2" />
          <line className="en-quiet" x1="3" y1="17.4" x2="17" y2="17.4" />
        </>
      );

    // ── RESISTANCE · an arrow that hits the wall and comes back ─────────────
    // THE ARROWHEAD IS PART OF THE MOVING GROUP, because a head that stayed put while its shaft
    // recoiled would read as two objects. The wall is `en-quiet`: it is what the motion is about,
    // not what the card is about — the card is about the three fears, and the fears are the
    // thing pushing.
    case "resistance":
      return (
        <>
          <line className="en-quiet" x1="16" y1="3.6" x2="16" y2="16.4" />
          <g className="en-anim-recoil">
            <line x1="3.2" y1="10" x2="12.4" y2="10" />
            <polyline points="9.4 6.8, 12.6 10, 9.4 13.2" />
          </g>
        </>
      );

    // ── ACCESS · a key that turns ───────────────────────────────────────────
    // THE PILLAR IS "CLEARED BEFORE THE FIRST SESSION" and a key in a lock that turns is the
    // plainest drawing of a thing already arranged. The ring is the pivot and stays put; the
    // shaft and its two teeth sweep a quarter turn and come back.
    case "access":
      return (
        <>
          <g className="en-anim-turn">
            <circle cx="7" cy="10" r="3.4" />
            <line x1="10.4" y1="10" x2="17.6" y2="10" />
            <line x1="14.2" y1="10" x2="14.2" y2="13" />
            <line x1="16.6" y1="10" x2="16.6" y2="12.2" />
          </g>
          <circle className="en-solid" cx="7" cy="10" r="1.1" />
        </>
      );

    // ── CURRICULUM · one page, kept current ─────────────────────────────────
    // FOUR RULES AND THE TOP ONE IS REWRITTEN FOREVER. "One body of material" is the page;
    // "kept current" is the only claim on the card that a static icon cannot make, so it is the
    // one the motion spends itself on.
    case "curriculum":
      return (
        <>
          <path className="en-quiet" d="M 3.4 2.8 H 16.6 V 17.2 H 3.4 Z" />
          <line className="en-anim-rewrite" x1="5" y1="7.4" x2="15" y2="7.4" />
          <line className="en-quiet" x1="5" y1="10.4" x2="15" y2="10.4" />
          <line className="en-quiet" x1="5" y1="13.4" x2="12" y2="13.4" />
        </>
      );

    // ── PRACTICE · a saw already in the cut ─────────────────────────────────
    // THIRD DRAWING, AND THE FIRST TWO FAILED FOR ONE REASON. It was a spanner on a bolt (owner:
    // "it doesn't represent anything") and then a hammer over a peg (owner: "not good enough"),
    // and both died the same death: at 88px the 1.6 stroke is SEVEN PIXELS, so a stroked tool built
    // out of a head, a shaft and a workpiece is three fat bars whose silhouette is a lamp. A
    // STROKE CANNOT HOLD A TOOL'S SHAPE AT THIS SIZE. A FILL CAN, and that is the whole change
    // here: the blade is `en-solid`, so its six teeth are 4px of painted edge rather than 4px of
    // line trying to survive a 7px pen — the one channel on this slide that renders detail.
    //
    // THE TEETH ARE THE ARGUMENT. They are what makes this a saw rather than a bar, and a saw is
    // what makes the pillar's claim: real material, real progress, and the same stroke again. The
    // blade CROSSES the plank's top edge and stops inside it — the buried inch IS the cut, so
    // nothing extra is drawn for one — and the plank keeps going to the right, which is the work
    // still to do on a piece that is already theirs.
    //
    // TWO NESTED GROUPS, AND THE OUTER ONE IS SHAPE. `transform` on the outer `<g>` is a static
    // SVG ATTRIBUTE — the saw's 24° attitude, which belongs to this file — and the inner `<g>`
    // carries the class `./enablement.css` animates. They cannot be one element: a CSS `transform`
    // outranks the presentation attribute and would flatten the tool onto its back on the first
    // frame. Nesting also buys the keyframe its simplest possible form — the stroke is a local
    // `translateX`, so a rhythm is one number in one axis rather than a pair of rotated ones.
    //
    // IT RESTS AT THE FAR END OF THE STROKE, tip deepest in the cut, which is the frame a
    // reduced-motion reader gets and the frame that says the cut got made.
    case "practice":
      return (
        <>
          <path className="en-quiet" d="M 2.2 12.6 H 17.8 V 16.8 H 2.2 Z" />
          <g transform="rotate(24 12 12.6)">
            <g className="en-anim-saw">
              <path
                className="en-solid"
                d="M 5.4 10.1 H 13.6 V 12.6 L 12.9 11.6 L 12.2 12.6 L 11.5 11.6 L 10.8 12.6 L 10.1 11.6 L 9.4 12.6 L 8.7 11.6 L 8 12.6 L 7.3 11.6 L 6.6 12.6 L 5.9 11.6 H 5.4 Z"
              />
              <line x1="5.4" y1="11.3" x2="3.2" y2="13.9" />
            </g>
          </g>
        </>
      );

    // ── SUPPORT · one person, still reachable ───────────────────────────────
    // THE PILLAR IS A NAMED PERSON WHO ANSWERS AFTER THE ROOM EMPTIES, so the mark is a person
    // with a signal going out. ONE person and not a group: "one person named" is the whole point,
    // and two figures here would read as a helpdesk.
    case "support":
      return (
        <>
          <circle className="en-anim-reach" cx="10" cy="10" r="6.4" />
          <circle cx="10" cy="7.6" r="2.4" />
          <path d="M 5.4 16.2 A 4.6 4.6 0 0 1 14.6 16.2" />
        </>
      );

    // ── EVERYONE · eight marks, one soft wave ───────────────────────────────
    // THE WIDEST TRACK, AND THE ONLY MARK ON THE SLIDE THAT IS ABOUT NUMBER. Eight dots on one
    // keyframe with eight `i × pitch` delays, so over a cycle every dot gets a byte-identical
    // turn and the mark ranks none of them. The delay is set INLINE here rather than in the
    // stylesheet because it is arithmetic over a list, which is the one thing CSS cannot do —
    // and it is the only `style` attribute in this file, which its header otherwise forbids.
    case "everyone":
      return (
        <>
          {MANY_DOTS.map((dot, i) => (
            <circle
              key={`${dot.cx}-${dot.cy}`}
              className="en-solid en-anim-many"
              cx={dot.cx}
              cy={dot.cy}
              r="1.4"
              style={{ animationDelay: `${i * MANY_STAGGER_MS}ms` }}
            />
          ))}
        </>
      );

    // ── BUILDERS · three parts, in order ────────────────────────────────────
    // THE TRACK BUILDS SOMETHING ITS OWN TEAM RUNS, and a build has an order. Three bars on one
    // ground, drawn at FULL height and dipped by the keyframe's middle frame — so the shape in
    // this file is the shape a reduced-motion reader is parked on.
    case "builders":
      return (
        <>
          <line className="en-quiet" x1="3" y1="16.6" x2="17" y2="16.6" />
          <rect
            className="en-solid en-anim-rise en-anim-rise-1"
            x="4.2"
            y="10.6"
            width="3"
            height="6"
          />
          <rect
            className="en-solid en-anim-rise en-anim-rise-2"
            x="8.5"
            y="7.6"
            width="3"
            height="9"
          />
          <rect
            className="en-solid en-anim-rise en-anim-rise-3"
            x="12.8"
            y="4.6"
            width="3"
            height="12"
          />
        </>
      );

    // ── STEWARDS · one mark keeping something running ───────────────────────
    // THE NARROWEST TRACK AND THE ONLY MARK THAT NEVER RESTS. A steward's whole job is that the
    // thing does not stop, so the dot goes round at one speed forever. The ring is `en-quiet` —
    // the loop is the surface the work happens on, and the dot is the person.
    case "stewards":
      return (
        <>
          <circle className="en-quiet" cx="10" cy="10" r="6.2" />
          <g className="en-anim-orbit">
            <circle className="en-solid" cx="10" cy="3.8" r="1.9" />
          </g>
        </>
      );
  }
}
