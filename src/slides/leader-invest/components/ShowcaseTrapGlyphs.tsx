// THE THREE MARKS — D.2's recap glyphs, one per question.
//
// ═══ ONE OBJECT PLUS A GROUND LINE, WHICH IS THE CEILING K.1 SET. At 88px a glyph holds
// one idea; two objects competing for the same square is what produces a blob a room reads
// as decoration. Each mark below draws the SHAPE OF ITS OWN QUESTION and nothing else:
//
//   chart     three bars that are already up, and collapse and re-snap in a blink.
//             The question is "how long did the data take?" and the mark's answer about
//             the CHART is "no time at all", said by how briefly it is ever unbuilt.
//   source    four rules that re-draw one after another, slowly, left to right. The
//             question is "where did each number come from?" and the mark is the four
//             passes that answer it, at the pace they actually run.
//   decision  two identical squares and one tick that cannot settle between them. The
//             question is "who checked it, and against what?" and the mark is the moment
//             before somebody signs.
//
// ═══ THE TEMPO IS THE ARGUMENT, HERE AS ON THE ACTS. `st-snap` spends 8% of its cycle
// unbuilt; `st-lay` spends 46% of its cycle drawing. The two marks sit 408px apart on one
// shelf and a room reads the difference without being told there is one. See
// `./showcase-trap.css` for both keyframes and for why neither claims to be the ratio.
//
// ═══ NO COLOUR, NO DURATION AND NO SMIL IN THIS FILE. Stroke tiers and every keyframe live
// in `./showcase-trap.css`; `<animate>` and its family appear nowhere in this deck. The two
// `style` attributes below are the two things a stylesheet cannot hold: a computed
// `animationDelay`, which is an index times a pitch, and the tick's travel, which is a
// measurement of where its two targets are.

/** The three marks this file draws, as a runtime tuple so the guard below can check the
 *  copy's `string` ids against something. */
export const TRAP_GLYPH_IDS = ["chart", "source", "decision"] as const;

export type TrapGlyphId = (typeof TRAP_GLYPH_IDS)[number];

/** The four rules of the `source` mark, and the pitch they re-draw on.
 *
 *  260ms IS THE ROW'S PACE AND NOT A GUESS — it is the same pitch the four rows of act 2
 *  arrive on (`LAYER_STAGGER_MS` in `./ShowcaseTrapBeats.tsx`), so the mark in the recap
 *  runs at the speed of the scene it recaps. */
const LAY_STAGGER_MS = 260;

const LAY_ROWS = [5.2, 8.4, 11.6, 14.8] as const;

/** The pitch the tick travels, in viewBox units — the two squares' own spacing, so the
 *  mark cannot drift off its targets if a square moves. */
const WEIGH_TRAVEL = 8.4;

function glyphFor(id: TrapGlyphId) {
  switch (id) {
    case "chart":
      return (
        <>
          {/* Three bars, ALREADY UP. The keyframe takes them down for a moment rather than
              building them, so the mark's rest state is a finished chart — which is what
              the question is about. */}
          <rect className="st-solid st-anim-snap st-anim-snap-1" x="4.4" y="9.6" width="3.2" height="6.8" />
          <rect className="st-solid st-anim-snap st-anim-snap-2" x="8.4" y="6.2" width="3.2" height="10.2" />
          <rect className="st-solid st-anim-snap st-anim-snap-3" x="12.4" y="3.6" width="3.2" height="12.8" />
          <line className="st-quiet" x1="2.6" y1="16.4" x2="17.4" y2="16.4" />
        </>
      );

    case "source":
      return (
        <>
          {/* PAIR WITH pathLength={1}: `st-lay` moves `stroke-dashoffset` from 1 to 0, so
              the keyframe holds no coordinate and a re-cut row length retimes nothing. */}
          {LAY_ROWS.map((y, i) => (
            <line
              key={y}
              className="st-quiet st-anim-lay"
              x1="3.4"
              y1={y}
              x2="16.6"
              y2={y}
              pathLength={1}
              style={{ animationDelay: `${i * LAY_STAGGER_MS}ms` }}
            />
          ))}
          <line className="st-quiet" x1="3.4" y1="17.6" x2="16.6" y2="17.6" />
        </>
      );

    case "decision":
      return (
        <>
          <rect className="st-quiet" x="3" y="5.2" width="5.6" height="5.6" />
          <rect className="st-quiet" x="11.4" y="5.2" width="5.6" height="5.6" />
          {/* The tick is a STROKE and not a fill, so the hover rule that brightens
              `:is(path, …)` reaches it — a filled tick would need `.st-solid` and would
              then be brightened by the other half of the same pair. One is enough. */}
          <path
            className="st-anim-weigh"
            d="M 4.2 14.4 L 5.7 15.9 L 8.4 12.7"
            style={{ ["--st-weigh-travel" as string]: `${WEIGH_TRAVEL}px` }}
          />
        </>
      );
  }
}

/**
 * One 88px mark.
 *
 * SIZE IS A PROP AND NEVER A CONSTANT — a default here would be a second opinion about how
 * big a mark is, and `../showcase-trap-geometry.ts` already holds the only one.
 */
export function TrapGlyph({
  id,
  size,
  testId,
}: {
  id: TrapGlyphId;
  size: number;
  testId: string;
}) {
  return (
    <div
      className={`st-glyph st-glyph-${id}`}
      style={{ width: size, height: size }}
      data-testid={testId}
      aria-hidden="true"
    >
      {/* Art lives inside 2…18 of a 0…20 box. The two units of margin are spent by the
          `decision` tick, which travels past its own right edge. `overflow: visible` in the
          stylesheet is the other half. */}
      <svg viewBox="0 0 20 20">{glyphFor(id)}</svg>
    </div>
  );
}

/**
 * The copy types `glyph` as a union of three string literals, and this checks that the
 * union and this file's tuple are the same three — at module load, in the module that draws
 * them, rather than as a box with no mark in it.
 */
export function assertTrapGlyphId(id: string): TrapGlyphId {
  const found = TRAP_GLYPH_IDS.find((candidate) => candidate === id);
  if (found === undefined) {
    throw new Error(
      `ShowcaseTrapGlyphs: no mark is drawn for "${id}". This file draws ` +
        `${TRAP_GLYPH_IDS.join(", ")} — add the mark, or fix the id in ../content.ts.`,
    );
  }
  return found;
}
