// THE THREE MARKS — D.2's recap thumbnails, one per question, and each one is the ACT it
// recaps drawn small.
//
// ═══ WHY THESE ARE NOT PICTOGRAMS ANY MORE. This file used to draw three 88px emblems — a
// bar chart, four rules, two squares and a tick — centred in a card with air above and below
// them. Every one of them was an ABSTRACTION of a scene the room had watched ninety seconds
// earlier, so the card asked the room to decode a symbol for something it had just been
// shown directly. A thumbnail of the scene itself does three things the emblem could not: it
// fills the card, it lets the finding be read against the thing the finding is about, and it
// runs the SAME motion the act ran — so a room recognises which act a card belongs to before
// it reads the name on it.
//
//   chart     the plate and its seven bars, snapping together and holding. The question is
//             "how long did the data take?" and the mark's answer about the CHART is "no
//             time at all", said by how briefly it is ever unbuilt.
//   source    the plate with the four rows under it, and each row's rule crawling across,
//             one after another. The question is "where did each number come from?" and the
//             mark is the four passes that answer it, at the pace they actually run.
//   decision  two identical plates, one over four rows and one over an empty frame, with a
//             scan that crosses both and changes neither. The question is "who checked it,
//             and against what?" and the mark is the moment before somebody signs.
//
// ═══ THE TEMPO IS THE ARGUMENT, HERE AS ON THE ACTS. `st-snap` spends 8% of its cycle
// unbuilt; `st-lay` spends 46% of its cycle drawing. The two marks sit 408px apart on one
// shelf and a room reads the difference without being told there is one. See
// `./showcase-trap.css` for every keyframe and for why none of them claims to be the ratio.
//
// ═══ ONE VIEWBOX, ONE SCALE, THREE DRAWINGS. Every mark below is authored in the SAME 164×70
// user space and painted into the card's own 328×140 box, so a bar in the first card and a
// bar in the third are the same bar at the same weight. Three drawings with three viewBoxes
// is how a row of thumbnails ends up with three different line weights on one shelf.
//
// ═══ NO COLOUR, NO DURATION AND NO SMIL IN THIS FILE. Stroke tiers and every keyframe live
// in `./showcase-trap.css`; `<animate>` and its family appear nowhere in this deck. The one
// `style` attribute below is the thing a stylesheet cannot hold: a computed `animationDelay`,
// which is an index times a pitch.

/** The three marks this file draws, as a runtime tuple so the guard below can check the
 *  copy's `string` ids against something. */
export const TRAP_GLYPH_IDS = ["chart", "source", "decision"] as const;

export type TrapGlyphId = (typeof TRAP_GLYPH_IDS)[number];

/** The one user space all three marks are authored in. */
export const THUMB_VIEWBOX = { width: 164, height: 70 } as const;

/**
 * The four rows' pitch inside the `source` and `decision` marks.
 *
 * 260ms IS THE ROW'S PACE AND NOT A GUESS — it is the same pitch the four rows of act 2
 * arrive on (`LAYER_STAGGER_MS` in `./ShowcaseTrapBeats.tsx`), so the mark in the recap runs
 * at the speed of the scene it recaps.
 */
const LAY_STAGGER_MS = 260;

/** The seven bars of a thumbnail plate, as [x, height] in the shared user space. The
 *  fractions are `../showcase-trap-geometry.ts`'s own {@link BAR_FRACTIONS}, re-cut for a
 *  22-unit band — the SHAPE is what has to survive the reduction, not the coordinates. */
const THUMB_BARS = [0.42, 0.68, 0.5, 0.86, 0.61, 1, 0.55] as const;

/** A thumbnail plate: its frame, its title rule and its seven bars, at `x`,`y`, `w` wide. */
function ThumbPlate({
  x,
  y,
  w,
  h,
  snap,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Whether the bars run the collapse-and-re-snap loop. */
  snap: boolean;
}) {
  const pad = 5;
  const bandTop = y + 12;
  const baseline = y + h - pad;
  const band = baseline - bandTop;
  const slot = (w - 2 * pad) / THUMB_BARS.length;
  const barW = slot * 0.56;

  return (
    <>
      <rect className="st-quiet" x={x} y={y} width={w} height={h} />
      <line className="st-faint" x1={x + pad} y1={y + 8} x2={x + w - pad} y2={y + 8} />
      {THUMB_BARS.map((fraction, i) => {
        const barH = band * fraction;
        return (
          <rect
            key={fraction * 1000 + i}
            className={`st-solid${snap ? ` st-anim-snap st-anim-snap-${i}` : ""}`}
            x={x + pad + i * slot + (slot - barW) / 2}
            y={baseline - barH}
            width={barW}
            height={barH}
            style={snap ? { animationDelay: `${i * 40}ms` } : undefined}
          />
        );
      })}
    </>
  );
}

/** The four rows under a thumbnail plate, dashed, each with its own crawling rule. */
function ThumbRows({
  x,
  y,
  w,
  drawing,
}: {
  x: number;
  y: number;
  w: number;
  /** Whether each row's rule re-draws on the four-pass loop. */
  drawing: boolean;
}) {
  const pitch = 6.5;
  const height = 4.6;
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            className="st-dashed"
            x={x}
            y={y + i * pitch}
            width={w}
            height={height}
          />
          {drawing && (
            <line
              className="st-quiet st-anim-lay"
              x1={x}
              y1={y + i * pitch}
              x2={x + w}
              y2={y + i * pitch}
              pathLength={1}
              style={{ animationDelay: `${i * LAY_STAGGER_MS}ms` }}
            />
          )}
        </g>
      ))}
    </>
  );
}

function glyphFor(id: TrapGlyphId) {
  switch (id) {
    case "chart":
      // ACT 1, AND NOTHING UNDER IT. The plate takes the whole box: the card's finding is
      // "fast to make", and a plate with room under it would be answering the second card's
      // question instead of this one's.
      return <ThumbPlate x={8} y={12} w={148} h={46} snap />;

    case "source":
      // ACT 2. The same plate, at the same weight, with the four rows it stands on — and the
      // rows are what moves, because the rows are what the question is about.
      return (
        <>
          <ThumbPlate x={8} y={4} w={148} h={34} snap={false} />
          <ThumbRows x={8} y={42} w={148} drawing />
        </>
      );

    case "decision":
      // ACT 3. Two plates, drawn by the same function at the same size, so the mark cannot
      // show a difference the slide says is not there. What differs is UNDER them, and the
      // scan that crosses both finds neither.
      return (
        <>
          <ThumbPlate x={4} y={4} w={72} h={34} snap={false} />
          <ThumbRows x={4} y={42} w={72} drawing={false} />
          <ThumbPlate x={88} y={4} w={72} h={34} snap={false} />
          <rect className="st-dashed st-anim-empty" x={88} y={42} width={72} height={24} />
          {/* THE HEAD IS A FILLED SHAPE AND CARRIES `.st-solid` FOR THAT REASON. The hover
              ramp puts a stroke on every unfilled shape in a mark; a filled one that did not
              opt out would gain a stroke straddling its own edge and grow under the
              pointer. See `./showcase-trap.css`'s note on the one specificity trap. */}
          <rect className="st-solid st-scan-head st-anim-sweep" x={0} y={2} width={1.4} height={66} />
        </>
      );
  }
}

/**
 * One thumbnail.
 *
 * WIDTH AND HEIGHT ARE PROPS AND NEVER CONSTANTS — a default here would be a second opinion
 * about how big a mark is, and `../showcase-trap-geometry.ts` already holds the only one.
 */
export function TrapGlyph({
  id,
  width,
  height,
  testId,
}: {
  id: TrapGlyphId;
  width: number;
  height: number;
  testId: string;
}) {
  return (
    <div
      className={`st-glyph st-glyph-${id}`}
      style={{ width, height }}
      data-testid={testId}
      aria-hidden="true"
    >
      {/* `preserveAspectRatio` is left at its default: the card's box is 328×140 and the
          user space is 164×70, which is the same ratio, so the drawing is scaled by exactly
          two and no line lands on a half pixel. */}
      <svg viewBox={`0 0 ${THUMB_VIEWBOX.width} ${THUMB_VIEWBOX.height}`}>{glyphFor(id)}</svg>
    </div>
  );
}

/**
 * The copy types `glyph` as a union of three string literals, and this checks that the
 * union and this file's tuple are the same three — at module load, in the module that draws
 * them, rather than as a card with no mark in it.
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
