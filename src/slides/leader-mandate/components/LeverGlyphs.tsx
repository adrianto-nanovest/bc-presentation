// Four animated marks — ONE PER LEVER, and each one performs its own lever's verb.
//
// ═══ WHY FOUR AND NOT EIGHT. K.2 draws two marks per phase because it prints the same four
// cards twice and only the mark and the body change; the pair IS that slide's argument. This
// slide prints each lever ONCE, big, and then all four small. So there are four drawings and
// two sizes, and the second size is not a second drawing.
//
// ═══ WHAT THE FOUR MOVEMENTS ARGUE. Every mark is a small mechanical sentence about what the
// leader's signature actually changes, and no string on the stage states it:
//
//   · WEEK — the week churns and one block does not. Everything around the blocked session
//     comes and goes; the session itself never moves, never fades and never dims. That is what
//     "in the calendar as work" means, and it is the one mark whose argument is carried by the
//     part that stays still.
//   · CHAMPION — one figure stands clear of the row and a guard breathes around it. The others
//     are drawn, present and unlit. Naming somebody is not promoting them; it is putting a
//     boundary round their hours, and a boundary that keeps moving is a boundary somebody is
//     maintaining.
//   · GATE — a barrier lifts, one mark passes under it, and the barrier comes back down. The
//     posts and the ground never move: the request is what opens, not the wall.
//   · FUNDING — a block that does not shrink, a flow that keeps arriving, and a review that
//     lands on it. Three parts, and the block is the one that proves the point: the money
//     comes off a line that is already there.
//
// A room that reads nothing off this stage but the movement still gets the slide.
//
// ═══ WHY THIS FILE IS LOCAL AND NOT `src/components/AnimatedGlyph`. That component owns 50
// glyph kinds for sections G and H. None of the fifty is a blocked week, a protected person, a
// gate that lifts or a budget line that holds, and adding four to a shared union would put
// this slide's iconography — and its stroke weight, and its viewBox — into a module four other
// sections import. `./EnablementGlyphs.tsx`, `./PhaseGlyphs.tsx` and
// `../../leader-shape/components/TamKotterGlyphs.tsx` all made the identical call, and the
// marks here are drawn in their idiom so a reader who has read any of those has read this one.
//
// ═══ ONE DRAWING, ONE TIER, TWO SIZES — AND THE LINE WEIGHT IS NOT SCALED WITH THE SIZE. This
// is the one place this file departs from its two siblings, and `../levers-geometry.ts` carries
// the arithmetic. Both of those set `stroke-width: 1.6` in the 20-unit box and let the scale
// decide the rest, which is right at 88px (a 7px line) and at 26px (a 2px one). At 260px the
// same declaration paints a TWENTY-ONE pixel line, and the mark stops being a drawing. So the
// caller passes the width in viewBox units, computed from the optical weight the stage wants,
// and the stylesheet reads it off a custom property. A hero mark is not a chip enlarged.
//
// ═══ EVERY MARK IS DRAWN INSIDE 2…18 OF A 0…20 BOX. `overflow: visible` is set on the `<svg>`
// in `./levers.css` because two of the four animate out of their own bounds: `champion`'s guard
// scales past its arc and `gate`'s barrier lifts above its posts.
//
// ═══ NO `<animate>` ANYWHERE — the zero-SMIL rule this deck keeps everywhere. All four are
// animated from `./levers.css`, which is also the only place any of them can be retimed. THIS
// FILE IS SHAPE AND NOTHING ELSE: no duration, no easing, no colour, and exactly ONE `style`
// attribute in the module — the wrapper's size and line weight, which are coordinates and
// belong to the geometry module that computes them.
//
// Presentational and total. Every id the stage can render has a case; see {@link LeverGlyph}
// for what an unknown one gets and why it is not an exception.
import "./levers.css";

/**
 * The four ids that HAVE a mark — the other end of the pin between this file and
 * `../content.ts`.
 *
 * DECLARED HERE AND NOT IMPORTED, deliberately. `../content.ts` types `Lever.glyph` as
 * `string`, because a content module may not import a component; this is the set of ids a mark
 * has been DRAWN for, which is a different fact and belongs to this file. {@link glyphFor}'s
 * switch is exhaustive over it, so a mark this file forgets to draw is a compile error here.
 *
 * A RUNTIME TUPLE AND NOT ONLY A TYPE, because the type alone cannot close the hole at the
 * other end. `./LeverBoard.tsx` has to cast at its call site; a cast is a promise, and the
 * promise this one makes is checked at module load by that file's own guard, which needs a
 * value to check against. Without it, a lever whose `glyph` is `"budget"` would compile, pass
 * every type check, and render a 260px hole in the middle of a hero pose that no bounding
 * check reports.
 */
export const LEVER_GLYPH_IDS = ["week", "champion", "gate", "funding"] as const;

export type LeverGlyphId = (typeof LEVER_GLYPH_IDS)[number];

/**
 * One mark, sized and weighted by its caller.
 *
 * BOTH NUMBERS ARE PROPS AND NEITHER HAS A DEFAULT, because both are decided by
 * `../levers-geometry.ts` — the size is a coordinate and the width is derived from it through
 * `glyphStroke`. A default here would be a second opinion about how big a mark is and a third
 * about how heavy.
 *
 * `aria-hidden` ON ALL FOUR. Each mark restates its own scene's act and note, both of which are
 * real text a few centimetres away; a screen reader that announced the mark as well would read
 * every lever twice.
 */
export function LeverGlyph({
  id,
  size,
  stroke,
  testId,
}: {
  id: LeverGlyphId;
  size: number;
  /** `stroke-width` IN VIEWBOX UNITS — `glyphStroke(size, …)` in `../levers-geometry.ts`. */
  stroke: number;
  testId: string;
}) {
  return (
    <div
      className={`kl-glyph kl-glyph-${id}`}
      style={{ width: size, height: size, ["--kl-stroke" as string]: stroke }}
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
 * would let an unmarked id compile and render as nothing, and "nothing" on a hero pose is a
 * 260px hole that no test and no bounding check reports. TypeScript's exhaustiveness check is
 * the whole guard, so there is deliberately nothing to fall through to.
 *
 * THE `kl-anim-*` CLASSES ARE THE SEAM. Every animated element carries one, `./levers.css`
 * carries the keyframe, and nothing in this file knows how long anything takes. A reader
 * changing a rhythm never opens this file; a reader changing a shape never opens that one.
 *
 * `kl-quiet` AND `kl-solid` ARE NOT `en-`/`pg-`. The three pairs look borrowed and are not:
 * every slide family in this tree owns its own selectors, so restyling K.1's or K.2's marks can
 * never restyle these.
 */
function glyphFor(id: LeverGlyphId) {
  switch (id) {
    // ── WEEK · the week churns and one block does not ────────────────────────
    // THE SUBJECT IS THE PART THAT DOES NOT MOVE, which is the hard thing to draw and the
    // reason the four cells around it are drawn as OUTLINES while the blocked session is
    // FILLED. Ink, not opacity, carries the difference between the session and the noise; the
    // opacity loop on the four is MOTION and says only that the week keeps turning over.
    case "week":
      return (
        <>
          <rect className="kl-quiet" x="2.4" y="4.2" width="15.2" height="13.4" />
          <line className="kl-quiet" x1="2.4" y1="8" x2="17.6" y2="8" />
          <line className="kl-quiet" x1="7.5" y1="4.2" x2="7.5" y2="17.6" />
          <line className="kl-quiet" x1="12.5" y1="4.2" x2="12.5" y2="17.6" />
          <rect className="kl-quiet kl-anim-churn-1" x="3.3" y="9" width="3.3" height="2.6" />
          <rect className="kl-quiet kl-anim-churn-2" x="13.4" y="9" width="3.3" height="2.6" />
          <rect className="kl-quiet kl-anim-churn-3" x="3.3" y="13.6" width="3.3" height="2.6" />
          <rect className="kl-quiet kl-anim-churn-4" x="13.4" y="13.6" width="3.3" height="2.6" />
          <rect className="kl-solid" x="8.4" y="9" width="3.2" height="7.2" />
        </>
      );

    // ── CHAMPION · two figures clear of the row, and one guard around both ───
    // THE GUARD IS WHAT THE LEVER ACTUALLY BUYS. Naming somebody is free; the hours are not, so
    // the moving part is the boundary and not the people. The other four are drawn at the same
    // tier as the ground they stand on — nobody is dimmed to promote a champion, which is
    // §7.1 applied inside a mark.
    //
    // TWO AND NOT ONE, AS OF 2026-08-15 (owner's call), BECAUSE THE SENTENCE BESIDE IT IS PLURAL.
    // `../content.ts`'s `person` lever reads "Name your champions" — a company runs several, one
    // per department or better — and a mark raising a single figure would contradict the line it
    // illustrates at 260px. The two rise from the INNER pair of the row (x 7.2 and 12.8), so the
    // mark reads as two people coming out of this team rather than as two arriving from
    // somewhere else.
    //
    // ONE GUARD OVER BOTH, AND THAT IS THE CLAIM. Two arcs would draw two protected individuals;
    // one arc says the PROTECTION is a single act of authority covering everybody named under
    // it — which is what an hours-and-targets decision actually is. It is wider than the retired
    // one (r 5.8 against 4.6) because it now has to clear two figures, and `./levers.css` scales
    // it about the same centre it always did.
    case "champion":
      return (
        <>
          <line className="kl-quiet" x1="2.6" y1="15.6" x2="17.4" y2="15.6" />
          <circle className="kl-quiet" cx="4.3" cy="12.9" r="1.5" />
          <circle className="kl-quiet" cx="7.2" cy="12.9" r="1.5" />
          <circle className="kl-quiet" cx="12.8" cy="12.9" r="1.5" />
          <circle className="kl-quiet" cx="15.7" cy="12.9" r="1.5" />
          <circle className="kl-solid" cx="7.6" cy="8.9" r="1.9" />
          <circle className="kl-solid" cx="12.4" cy="8.9" r="1.9" />
          <path className="kl-anim-guard" d="M 4.2 9.4 A 5.8 5.8 0 0 1 15.8 9.4" />
        </>
      );

    // ── GATE · the barrier lifts, one mark passes, the barrier returns ───────
    // WHAT OPENS IS THE REQUEST AND NOT THE WALL, so the two posts and the ground are byte for
    // byte identical on every frame and only the bar moves. The mark that crosses fades OUT at
    // the far side and back IN at its post — the trick `./phases.css` records on `pg-letgo` —
    // because a dot that flew backwards through its own crossing would read as a mechanism
    // resetting rather than as a queue being cleared.
    case "gate":
      return (
        <>
          <line className="kl-quiet" x1="2.6" y1="16.4" x2="17.4" y2="16.4" />
          <line className="kl-quiet" x1="4.8" y1="5.4" x2="4.8" y2="16.4" />
          <line className="kl-quiet" x1="15.2" y1="5.4" x2="15.2" y2="16.4" />
          <line className="kl-anim-lift" x1="4.8" y1="13.2" x2="15.2" y2="13.2" />
          <circle className="kl-solid kl-anim-pass" cx="6.4" cy="14.1" r="1.5" />
        </>
      );

    // ── FUNDING · a line that holds, a flow that arrives, a review that lands ─
    // THE BLOCK IS THE WHOLE ARGUMENT AND IT NEVER CHANGES. "From the line you already hold" is
    // the difference between this lever and a budget request, so the money comes off a block
    // that is drawn solid, sits on the ground, and is the same on every frame. The dashes are
    // the flow — a pattern, not a shape, so its period closes on itself and there is no seam —
    // and the ring is the quarterly look, which SCALES rather than fades: a review that is not
    // happening is this lever's failure, and a mark with no resting frame cannot say it.
    case "funding":
      return (
        <>
          <line className="kl-quiet" x1="2.6" y1="16.8" x2="17.4" y2="16.8" />
          <rect className="kl-solid" x="3.2" y="10.4" width="3.4" height="6.4" />
          <path className="kl-anim-flow" d="M 7.4 9.4 C 10 6.2, 12.6 6.2, 14.8 9.2" />
          <circle className="kl-anim-review" cx="14.8" cy="13" r="2.9" />
          <polyline className="kl-quiet" points="13.5 13, 14.5 14.1, 16.1 11.8" />
        </>
      );
  }
}
