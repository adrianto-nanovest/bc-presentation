// The ledger: a company's own figures, each with where it came from, and the
// sentence they are evidence for.
//
// A LEDGER AND NOT A CHART, and that is the slide's argument in one word. A bar
// chart of "+90%", "50+" and "4,000+" would put three unrelated quantities on one
// axis and invite the room to compare them; a ledger puts each number beside what
// it measures and beside HOW IT IS KNOWN, which is the column a chart has no room
// for and the column this slide exists for. Seven numbers across the two brands —
// GEMS' four and Berau's three, never in one room — three cells each, one tier per
// cell role.
//
// ONE COMPONENT AND NOT THREE. The eyebrow, the rows, the source line and the
// closer are four bands of one figure, and the fact they share — how far down the
// column has reached — is owned by `../geometry.ts` and read once here. Splitting
// the rows from the attribution would put the count on both sides of a file
// boundary, and the failure this figure is actually at risk of is a source line
// that has stopped sitting under the column it attributes.
//
// IT READS NO VARIANT AND NO BRAND: the resolved block arrives as a prop. That is
// what lets one test render both brands' ledgers in a single module epoch, which
// is the only way to check that neither carries a byte of the other's evidence
// (§4.4 slot 3).
//
// CSS vars only, NO HEX AND NO rgba() LITERALS. Rank is a COLOUR TIER between the
// three cell ROLES — the number, what it measures, how it is known — and never
// between rows: three or four figures of equal standing on any one stage, and any
// visual promotion of one is a claim nobody authored, which is the same failure as
// printing the word "audited". Opacity here means "not revealed yet", i.e. time, not
// rank.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and there is no
// `<svg>` on this slide at all, so the question is closed by construction rather
// than by discipline. The whole motion budget is `.fade`, which is TWO channels and
// not one: an opacity-and-translate TRANSITION on `.fade`, plus the `fadeReveal`
// KEYFRAME animation `.fade.on` adds (`src/styles/globals.css`) —
// `scripts/gh56-verify.mjs` names both and samples the opacity they produce. The
// global `prefers-reduced-motion: reduce` rule at the top of that stylesheet squashes
// both — `transition-duration` AND `animation-duration` to 0.01ms — so every pose
// rests on its finished frame under either preference and there is nothing to gate at
// mount. NO NEW KEYFRAME AND NO NEW CLASS EITHER: gh#53 needed one because a
// `stroke-dashoffset` sweep has no resting pair of values to transition between;
// nothing here needs anything the shared primitive cannot do.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive: 27 modules
// outside section E import this `Reveal`, THIS FILE INCLUDED — A.1 and the Capability
// Ladder among them — where the section F duplicate has 5, and section G's third copy
// has none at all outside its own directory. (Two more modules take only this file's
// `CopperRule`, which is why a grep of `src/` for the path returns 29.) A FOURTH copy
// under this directory would be the wrong answer to three existing ones; centralising
// them is a cleanup this ticket is not.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ATTRIBUTION_HEIGHT,
  CLOSER_TOP,
  COL_GAP,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  FIGURE_COL_W,
  MARK_COL_W,
  METRIC_COL_W,
  ROW_HEIGHT,
  SIDE_MARGIN,
  SLOT_HEIGHT,
  SLOT_TOP,
  attributionOffset,
  rowOffset,
} from "../geometry";
import { investOwnProofContent as C, type OwnProofBlock } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per cell ROLE, and the same tier for every row.
 *
 * THE RANK IS ACROSS A ROW, NEVER DOWN THE COLUMN — and across the row it is SIZE
 * that carries the first step, not colour. The figure is 26px `--copper-200`
 * (luminance 0.5917) beside a 15px `--neutral-200` metric name (0.6584): the number
 * reads first because it is 11px larger, and it is very slightly the DARKER of the
 * two. From the metric to the chip the type does get quieter as well as smaller —
 * `--neutral-300` (0.3663) at 10px — so the third cell is the one this table
 * actually dims. Reading top to bottom nothing changes at all, because these
 * figures are not ranked: they are the same organisation's evidence, and a brighter
 * row would be a claim that one of them counts more.
 *
 * THE CHIP RESTS ON gh#50's FLOOR AND NOT UNDER IT. `--neutral-300` is the floor
 * for text on this stage, and the caveat is the one string somebody would be
 * tempted to push below it to "calm the row down" — which would make the least
 * readable thing in the room the thing that keeps the slide honest. It stays ON
 * the floor: quietest, and still legible from the back row.
 */
const TIER = {
  /** Copper, because the number IS the point of the row. Two tiers OVER the keyword
   *  italic and twice its light — `--copper-200` 0.5917 against
   *  `KeywordHighlight`'s `--copper-400` 0.2966 — using "over" the way
   *  `../../leader-shape/components/PillarOrbit.tsx` uses it: the lower token
   *  number is the brighter one. So a figure is never the same copper as an
   *  emphasised word, and it is upright 26px mono where a keyword is serif italic. */
  figure: "var(--copper-200)",
  /** What the number measures — two tiers under the headline's own, on the ramp
   *  this stage declares (0 · 50 · 100 · 200 · 300): `--neutral-200` 0.6584 against
   *  the headline's `--neutral-50` 0.9131. */
  metric: "var(--neutral-200)",
  /** How it is known. See the note above about the floor. */
  mark: "var(--neutral-300)",
  /** The chip's hairline. Dark enough to read as an attached label rather than a
   *  bordered claim; the copper says it belongs to the figure beside it. */
  markBorder: "1px solid var(--copper-800)",
  /** The source line, same tier as the chips it summarises. */
  attribution: "var(--neutral-300)",
  /** The thesis. The brightest tier this slide sets UNDER the headline row —
   *  `--neutral-100` 0.7835, over the metric's 0.6584 and the chip's 0.3663 — and one
   *  tier under the headline itself, which `.slide-headline` prints in `--neutral-50`
   *  (0.9131) at all three poses. The headline stays the brightest type on the stage
   *  on purpose: it is the premise this sentence answers. What makes pose 2 the
   *  closer's is that it is the only thing that ARRIVES there, not that it out-shines
   *  what is already up. */
  closer: "var(--neutral-100)",
  /** The eyebrow, in the copper label tier the sibling leader slides use for the
   *  line under the headline. */
  eyebrow: "var(--copper-400)",
} as const;

/**
 * The mono LABEL register — the eyebrow, every figure, every chip, the source
 * line.
 *
 * `upper` is the default because every mono label in this deck is uppercase, and
 * the two exceptions are deliberate: a FIGURE is already typeset as it should read
 * ("2 days → under 1 hour" shouted is a wall), and the ATTRIBUTION is a
 * sentence-length citation, which at 100+ characters of uppercase mono is
 * something nobody in the back row reads. Both stay in this register — that is
 * what keeps them reading as labels rather than as prose — and drop the transform.
 */
function mono(size: number, color: string, ls = 0.14, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/**
 * How long each row takes to arrive, and how far behind the one before it.
 *
 * The column reveals top to bottom, 90ms apart, so the rows land as a list being
 * read rather than as one flash of four — and the attribution arrives last,
 * behind the final row, because a source line that appeared before the figures it
 * sources would be answering a question the room had not asked yet. 120ms of
 * lead-in keeps the first row off the same frame as the click.
 */
const REVEAL_LEAD_MS = 120;
const REVEAL_STAGGER_MS = 90;

// ───────────────────── the figure ─────────────────────

export interface ProofLedgerProps {
  /** The brand's resolved block — `ownProofFor(VARIANT.brand)`. */
  content: OwnProofBlock;
  /** 0…2. See the slide file for what each pose argues. */
  pose: number;
}

export function ProofLedger({ content, pose }: ProofLedgerProps) {
  const showFigures = pose >= 1;
  const showCloser = pose >= 2;

  return (
    <>
      {/* THE EYEBROW — whose proof the room is looking at, which is the half of
          pose 0's argument the shared headline deliberately does not make. It
          stands from pose 0 and never leaves: it is true at all three poses, so
          it does not spend one.

          RENDERED ONLY WHERE THERE IS AN OWNER TO NAME. A deck that names no
          organisation prints no element here rather than an empty one — an empty
          mono line reads on a projector as a slide that did not finish. Same
          decision as the hub's brand line in `leader-shape`. */}
      {content.kind === "figures" && (
        <div
          data-testid="invest-eyebrow"
          style={{
            position: "absolute",
            left: SIDE_MARGIN,
            top: EYEBROW_TOP,
            ...mono(11, TIER.eyebrow, 0.22),
          }}
        >
          {content.eyebrow}
        </div>
      )}

      {/* THE SLOT — one rectangle, two possible fills, never blank. The rows and
          their source line under the two brands that have figures; one stated
          line under a deck that names no organisation. Both fills are placed
          against THIS box's origin, so the band is in the same place on the stage
          whichever one renders.

          NO BORDER AND NO BACKGROUND OF ITS OWN: a box drawn here would put a
          frame around the refusal line too, turning "there is nothing to show"
          into a bordered claim. */}
      <div
        data-testid="invest-proof-slot"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: SLOT_TOP,
          width: CONTENT_WIDTH,
          height: SLOT_HEIGHT,
        }}
      >
        {content.kind === "figures" ? (
          <>
            {content.figures.map((figure, i) => (
              <Reveal
                key={figure.id}
                on={showFigures}
                delay={REVEAL_LEAD_MS + i * REVEAL_STAGGER_MS}
                data-testid={`invest-row-${figure.id}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: rowOffset(i),
                  width: CONTENT_WIDTH,
                  height: ROW_HEIGHT,
                  // BASELINE, not centre: the figure is 26px and the metric name
                  // 15px, and a shared baseline is what makes the two read as one
                  // statement instead of as two stacked cells.
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <div
                  data-testid={`invest-figure-${figure.id}`}
                  style={{
                    width: FIGURE_COL_W,
                    // Tracking at 0.01em, not the label register's 0.14: this is
                    // a quantity, and tracked-out digits read as a serial number.
                    ...mono(26, TIER.figure, 0.01, false),
                    lineHeight: 1.1,
                  }}
                >
                  {figure.figure}
                </div>
                <div
                  data-testid={`invest-metric-${figure.id}`}
                  style={{
                    width: METRIC_COL_W,
                    marginLeft: COL_GAP,
                    // The sans register, which is where every other label-shaped
                    // NAME in the deck sits (the ladder's rung definitions, the
                    // pillars' captions). Not mono: three mono cells in one row
                    // would make the metric name look like part of the figure.
                    fontFamily: "var(--sans)",
                    fontSize: 15,
                    lineHeight: 1.3,
                    color: TIER.metric,
                  }}
                >
                  {figure.metric}
                </div>
                {/* THE CHIP CELL, right-aligned to the margin, so the marks form
                    a column of their own. A reader scanning down the right edge
                    reads the provenance of the whole ledger without reading a
                    single number — which is what "the label is part of the copy"
                    has to mean on a slide that carries one mark per row, three or
                    four of them, and no summary chip standing in for the column. */}
                <div
                  style={{
                    width: MARK_COL_W,
                    marginLeft: COL_GAP,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    data-testid={`invest-mark-${figure.id}`}
                    style={{
                      border: TIER.markBorder,
                      padding: "3px 8px",
                      // The chip never wraps. "PARTICIPANT-CLAIMED" broken over
                      // two lines inside a hairline box reads as damage, and the
                      // cell it sits in was measured to hold it (../geometry.ts).
                      whiteSpace: "nowrap",
                      // 10px, NOT gh#50's 9.5px mono floor. The floor is a limit,
                      // not a target, and this is the one string on the slide the
                      // AC is written about — the caveat must not be the least
                      // readable thing in the room.
                      ...mono(10, TIER.mark, 0.14),
                    }}
                  >
                    {figure.mark}
                  </span>
                </div>
              </Reveal>
            ))}

            {/* THE SOURCE LINE — on the slide, not in a footnote (§6.7). It hangs
                off the ROW COUNT, which is the whole reason `../geometry.ts`
                exists: GEMS' column is four rows and Berau's is three. */}
            <Reveal
              on={showFigures}
              delay={REVEAL_LEAD_MS + content.figures.length * REVEAL_STAGGER_MS}
              data-testid="invest-attribution"
              style={{
                position: "absolute",
                left: 0,
                top: attributionOffset(content.figures.length),
                width: CONTENT_WIDTH,
                height: ATTRIBUTION_HEIGHT,
                ...mono(10.5, TIER.attribution, 0.02, false),
                lineHeight: 1.5,
              }}
            >
              {content.attribution}
            </Reveal>
          </>
        ) : (
          // NO ROW, NO CHIP, NO SOURCE LINE — the three things that would make
          // this look like a column with one entry. It is a statement ABOUT the
          // deck, in the prose register, and it names no organisation and no
          // number on purpose (see `../content.ts`).
          <Reveal
            on={showFigures}
            as="p"
            delay={REVEAL_LEAD_MS}
            data-testid="invest-no-proof"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: CONTENT_WIDTH,
              margin: 0,
              fontFamily: "var(--serif)",
              fontSize: 20,
              lineHeight: 1.4,
              color: "var(--neutral-300)",
            }}
          >
            {highlight(content.line, content.lineKw)}
          </Reveal>
        )}
      </div>

      {/* THE CLOSER — the deck's thesis (§4.5), at a FIXED shelf under both
          brands. Serif italic, because it is the one sentence on the slide that
          is an argument rather than a record. */}
      <Reveal
        on={showCloser}
        as="p"
        data-testid="invest-closer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CLOSER_TOP,
          width: CONTENT_WIDTH,
          margin: 0,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 26,
          lineHeight: 1.3,
          color: TIER.closer,
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
