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
//   · LECTERN — the lectern stands and one figure walks up to it, over and over. The lectern
//     never moves: the session happens whether or not anybody senior is at the front of it, and
//     the only variable in the picture is whether the person arrives. That is the lever.
//
//     IT REPLACED `week` ON 2026-08-16, WITH THE LEVER IT DRAWS. That mark was a week that
//     churned around one block that never moved — a good drawing of PROTECTED TIME, which is
//     what the lever used to ask for. The owner's ruling retired the premise: the AI sessions
//     are already work hours, so the ask is presence and speech instead, and a calendar mark
//     beside a presence sentence would have been the one glyph on the stage illustrating a
//     claim the slide had stopped making. `kl-churn` and its four delays went with it.
//   · CHAMPION — two figures stand clear of the row and one guard breathes around both. The
//     other two are drawn, present and unlit. Backing somebody is not promoting them; it is
//     putting a boundary round their hours, and a boundary that keeps moving is a boundary
//     somebody is maintaining. Every figure is a HEAD AND SHOULDERS and not a circle: the
//     2026-08-16 redraw is the whole of what was wrong with the retired mark, which drew six
//     bare circles and resolved as a face at 260px and as noise at 30px.
//   · GATE — a barrier lifts, one mark passes under it, and the barrier comes back down. The
//     posts and the ground never move: the request is what opens, not the wall.
//   · FUNDING — a stack of coins that does not shrink, one more coin that keeps arriving, and
//     a review that lands beside it. Three parts, and the stack is the one that proves the
//     point: the money comes off a line that is already there. Also redrawn 2026-08-16, from a
//     rectangle and a dashed arc that said nothing about money at either size.
//
// A room that reads nothing off this stage but the movement still gets the slide.
//
// ═══ WHY THIS FILE IS LOCAL AND NOT `src/components/AnimatedGlyph`. That component owns 50
// glyph kinds for sections G and H. None of the fifty is a lectern somebody walks up to, a
// protected person, a gate that lifts or a coin stack that holds, and adding four to a shared
// union would put
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
// in `./levers.css` because THREE of the four animate out of their own bounds: `champion`'s
// guard scales past its arc, `gate`'s barrier lifts above its posts, and `funding`'s arriving
// coin starts above the top of the box. `lectern`'s walk is the one that does NOT — it is
// authored to travel to x 2.1 and no further, which is inside the drawn area on purpose.
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
export const LEVER_GLYPH_IDS = ["lectern", "champion", "gate", "funding"] as const;

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
    // ── LECTERN · the lectern stands, and one figure walks up to it ──────────
    // THE LECTERN IS THE PART THAT DOES NOT MOVE, and it is the quiet tier for that reason: the
    // session runs whether or not anybody senior is at the front of it. The FIGURE is the only
    // variable in the picture and it is the only filled thing, so ink carries the argument and
    // motion only says how it arrives.
    //
    // IT IS THE ONE MARK ON THIS STAGE WITH A LECTERN IN IT, which is the whole reason the
    // shape was chosen over a second row of people. `champion` next door is four head-and-
    // shoulders figures; a presence lever drawn as more figures would have blurred the two
    // marks into one idea at 30px. A slanted board on a stem is unmistakable at both sizes and
    // reads as "the front of the room" with nothing to decode.
    //
    // THE FIGURE IS DRAWN AT ITS ARRIVED POSITION, not at its starting one, so the resting
    // frame of `kl-walk` is the composed picture — the leader AT the lectern. See `./levers.css`
    // for why that matters to a reduced-motion reader and how the loop closes without the
    // figure ever walking backwards.
    case "lectern":
      return (
        <>
          <line className="kl-quiet" x1="2.4" y1="17.2" x2="17.6" y2="17.2" />
          {/* The lectern — a slanted board on a stem that runs to the ground. Quiet, and
              identical on every frame of every cycle.

              NO SEPARATE FOOT, and that is a 30px decision rather than a drawing one. A
              base bar has to sit clear of the ground line to read as a base, and 0.6
              units of clearance is under a pixel on the recap card: the two strokes
              merge into one thick smudge. The stem meeting the ground says the same
              thing at both sizes.

              THE BOARD IS BELOW THE FIGURE'S HEAD ON PURPOSE. A lectern that stands
              taller than the person at it reads as a screen or a sign, and the mark
              stops being about somebody speaking. */}
          <polygon className="kl-quiet" points="11 14.4, 16.4 12.5, 16.4 13.9, 11 15.8" />
          <line className="kl-quiet" x1="13.7" y1="14.85" x2="13.7" y2="17.2" />
          {/* The one who turns up. Head and shoulders, filled, and grouped so the two
              shapes can never drift apart under the walk.

              THE NECK GAP IS 0.7 UNITS and it is measured, not eyeballed: the head's
              lower edge is at 14.1 and the shoulders' upper edge at 14.8. `champion`
              next door holds 0.9 at a slightly bigger figure. Much more and the two
              shapes read as two blobs — which is what the first draft of this mark did
              at 1.6 units of gap. Much less and they fuse into one lump. */}
          <g className="kl-anim-walk">
            <circle className="kl-solid" cx="7.8" cy="12.6" r="1.5" />
            <path className="kl-solid" d="M 5.4 17.2 A 2.4 2.4 0 0 1 10.2 17.2 Z" />
          </g>
        </>
      );

    // ── CHAMPION · two figures clear of the row, and one guard around both ───
    // THE GUARD IS WHAT THE LEVER ACTUALLY BUYS. Naming somebody is free; the hours are not, so
    // the moving part is the boundary and not the people. The other four are drawn at the same
    // tier as the ground they stand on — nobody is dimmed to promote an ambassador, which is
    // §7.1 applied inside a mark.
    //
    // WHICH IS WHY THE MARK NEEDED NO EDIT ON 2026-08-15, when the lever beside it was retermed
    // and its verb changed from NAME to BACK. The mark never drew the naming; it drew the
    // protection, and the protection is now the whole act. The `champion` id below is the glyph's
    // own key and is deliberately left alone — it is not rendered anywhere, and renaming it would
    // touch `LEVER_GLYPH_IDS`, `./levers.css` and two selectors to change nothing a room sees.
    //
    // TWO AND NOT ONE, AS OF 2026-08-15 (owner's call), BECAUSE THE SENTENCE BESIDE IT IS PLURAL.
    // `../content.ts`'s `person` lever reads "Give your AI Ambassadors hours every week" — the
    // Culture department's framework targets 2 Champions and 12 Agents at Berau Coal — and a mark
    // raising a single figure would contradict the line it illustrates at 260px. The two rise
    // from the INNER pair of the row (x 7.2 and 12.8), so the mark reads as two people coming out
    // of this team rather than as two arriving from somewhere else.
    //
    // ONE GUARD OVER BOTH, AND THAT IS THE CLAIM. Two arcs would draw two protected individuals;
    // one arc says the PROTECTION is a single act of authority covering everybody named under
    // it — which is what an hours-and-targets decision actually is. It is wider than the retired
    // one (r 5.8 against 4.6) because it now has to clear two figures, and `./levers.css` scales
    // it about the same centre it always did.
    case "champion":
      return (
        <>
          <line className="kl-quiet" x1="2.5" y1="17.4" x2="17.5" y2="17.4" />
          {/* THE TWO WHO ARE NOT BACKED — on the ground, at the outer edges. Head AND
              shoulders, because a circle on its own is a dot and four of them are a
              pattern. Stroked, so they are present and unlit. */}
          <circle className="kl-quiet" cx="4.6" cy="13.2" r="1.35" />
          <path className="kl-quiet" d="M 2.5 17.4 A 2.1 2.1 0 0 1 6.7 17.4" />
          <circle className="kl-quiet" cx="15.4" cy="13.2" r="1.35" />
          <path className="kl-quiet" d="M 13.3 17.4 A 2.1 2.1 0 0 1 17.5 17.4" />
          {/* THE TWO WHO ARE — the same drawing, filled, standing clear of the row.
              Symmetric about x=10, which is what lets the guard below scale about one
              pair of coordinates. The shoulder arcs close on `Z` because `.kl-solid`
              fills and strokes nothing: an open arc would fill to its own chord anyway
              and the explicit close says so. */}
          <circle className="kl-solid" cx="7.4" cy="9.8" r="1.5" />
          <path className="kl-solid" d="M 5.2 14.4 A 2.2 2.2 0 0 1 9.6 14.4 Z" />
          <circle className="kl-solid" cx="12.6" cy="9.8" r="1.5" />
          <path className="kl-solid" d="M 10.4 14.4 A 2.2 2.2 0 0 1 14.8 14.4 Z" />
          {/* THE GUARD, over the two who are backed and over nobody else. Centred on
              10, 12.2 and 4.6 wide, so it closes just inside the lifted pair's own
              width — the protection is visibly around THEM, not around the row. */}
          <path className="kl-anim-guard" d="M 5.4 12.2 A 4.6 4.6 0 0 1 14.6 12.2" />
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

    // ── FUNDING · a stack that holds, a coin that keeps arriving, a review that lands ─
    // REDRAWN 2026-08-16 (owner's call), AND THE OLD MARK SAID NOTHING ABOUT MONEY. It was a
    // filled rectangle, a dashed arc and a ticked ring: at 260px the arc read as two loose
    // strokes floating over a block, and at 30px the whole thing was three unrelated marks. The
    // ARGUMENT was right and only the vocabulary was missing, so the argument is unchanged and
    // the shapes are money-shaped now.
    //
    // THE STACK IS THE WHOLE ARGUMENT AND IT NEVER CHANGES. "From the budget you already hold"
    // is the difference between this lever and a budget request, so three coins are drawn
    // solid, sit on the ground, and are byte for byte identical on every frame. Ellipses and
    // not circles, because a stack is seen from the side; three and not two, because two reads
    // as one coin with a shadow.
    //
    // ONE COIN ARRIVES, ON A LOOP, AND LANDS ON TOP OF THE STACK. That is the funding that
    // keeps coming rather than the grant that came once, and it replaces a dashed flow that
    // had to be decoded. It rests ON the stack — the loop's 0% and 100% frames are the same
    // landed frame — so a reduced-motion reader gets a four-coin stack rather than a coin
    // stopped in mid-air.
    //
    // AND THE RING IS THE QUARTERLY LOOK, KEPT EXACTLY. It SCALES rather than fades: a review
    // that is not happening is this lever's failure, and a mark with no resting frame cannot
    // say it. NO CURRENCY SYMBOL AND NO DIGIT — this slide rejects both, and a coin with
    // nothing written on it is still unmistakably a coin.
    case "funding":
      return (
        <>
          <line className="kl-quiet" x1="2.4" y1="17.2" x2="17.6" y2="17.2" />
          <ellipse className="kl-solid" cx="7" cy="16" rx="4.2" ry="1.2" />
          <ellipse className="kl-solid" cx="7" cy="13.4" rx="4.2" ry="1.2" />
          <ellipse className="kl-solid" cx="7" cy="10.8" rx="4.2" ry="1.2" />
          <ellipse className="kl-solid kl-anim-drop" cx="7" cy="8.2" rx="4.2" ry="1.2" />
          <circle className="kl-anim-review" cx="15.2" cy="12.4" r="2.9" />
          <polyline className="kl-quiet" points="13.9 12.4, 14.9 13.5, 16.5 11.2" />
        </>
      );
  }
}
