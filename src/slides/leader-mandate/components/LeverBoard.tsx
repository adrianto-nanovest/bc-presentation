// Four acts, and a form beside them with sixteen boxes in it — twelve of which
// stay empty.
//
// ONE COMPONENT AND NOT TWO, for the reason `./EnablementModel.tsx` and
// `./PhaseLadder.tsx` are each one: the board and the form look like two
// independent figures and are not. Every cell in the form is placed against a
// LEVER ROW (`cellTop` in `../levers-geometry.ts`) and filled from that lever's
// own `needs` field, so the one failure this figure is actually at risk of — a
// filled cell beside a lever that does not claim it, or a row of cells that has
// drifted off the row it belongs to — would land exactly on the file boundary a
// split would create, where nothing would catch it.
//
// THE ARGUMENT IS IN THE GEOMETRY, and no single string on the stage states it:
// SIXTEEN BOXES ARE DRAWN AND FOUR ARE FILLED, all four in the same column. A
// leader who reads nothing but the shapes still learns the slide's whole claim —
// that every one of these four is theirs to authorize and that the three
// signatures a room expects to need are not needed here. The headline says it in
// words; this says it in a count, and a count is the thing a room can check.
//
// WHY THE ROW IS THE SECTION'S IDIOM AND THE FORM IS WHAT MAKES THIS STAGE ITS
// OWN. A mono label over one prose line is how K.1 draws a pillar and how the
// `gap` run draws a ledger entry — it is the deck's standard construction for "a
// named thing and what it means", and re-inventing it here would cost the room a
// new reading habit on the slide it is being asked for something. What this stage
// does NOT reuse is either sibling's IMAGE: K.1 is two text columns under two
// headings with a lane ramp on the right, K.2 is a staircase over four calendar
// columns, and this is a single column of rows ruled off against a four-column
// form. Three slides, three images, one row idiom.
//
// IT READS NO VARIANT AND NO BRAND, and like `./EnablementModel.tsx` it takes no
// resolved brand block either: this slide has no brand axis at all. `../content.ts`
// carries the argument and it is NOT K.1's argument — the short form is that the
// subject of this stage is the person in the room, and that person is the same
// person in both rooms.
//
// CSS VARS ONLY, no hex and no rgba() literals — the two graphic tiers included.
// Rank is a COLOUR TIER — between the label and the line inside a row, and between
// a cell that is filled and a cell that is not — and NEVER opacity, which here
// means "not revealed yet", i.e. time. THE FILLED / EMPTY PAIR IS THE CASE WORTH
// STATING: an empty cell drawn at 30% of the filled one would read as a cell the
// slide had not finished revealing, which on a step-reveal deck is a specific and
// wrong meaning. A hairline frame against a solid fill is a difference in INK, and
// it survives a projector, a PDF export and a colour-blind reader.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION exactly as both siblings close it: THIS FIGURE MOUNTS NO `<svg>` AT
// ALL, which keeps the whole of `src/slides/leader-mandate/` free of one. The
// sixteen cells, the four marks and the form's head rule are plain boxes, and that
// is the whole reason they are boxes — an SVG `<rect>` would have bought nothing
// here and would have re-opened a question the deck has had to answer with a
// `matchMedia` gate three times elsewhere (`E12LoopAnatomy`, `E12MindsetDiptych`,
// `E9DistractionMotion`). The entire motion budget is `.fade` — an
// opacity-and-translate transition plus the `fadeReveal` keyframe `.fade.on` adds
// (`src/styles/globals.css`) — and the global `prefers-reduced-motion: reduce` rule
// at the top of that stylesheet squashes BOTH channels to 0.01ms, so every pose
// rests on its finished frame under either preference and there is nothing to gate
// at mount. NO NEW KEYFRAME, NO NEW CLASS, NO NEW FONT, NO NEW LIBRARY.
import type { CSSProperties } from "react";
// Section E's copy, the tree's de facto shared reveal primitive. The census of its
// importers is kept by `./EnablementModel.tsx`; this file moves that count again
// and so does not re-quote it. A fourth copy under this directory would be the
// wrong answer to three existing ones, and centralising them is a cleanup this
// ticket is not.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  AUTHORITY_HEAD_TOP,
  BAND_HEIGHT,
  BAND_PADDING_X,
  BAND_PADDING_Y,
  BAND_TOP,
  CELL_HEIGHT,
  CELL_WIDTH,
  CLOSER_TOP,
  CONTENT_WIDTH,
  FORM_WIDTH,
  FORM_X,
  HEADING_TOP,
  HEAD_RULE_HEIGHT,
  HEAD_RULE_TOP,
  LEVER_LABEL_GAP,
  LEVER_ROW_HEIGHT,
  LEVER_WIDTH,
  MARK_HEIGHT,
  MARK_WIDTH,
  SIDE_MARGIN,
  authorityColWidth,
  authorityColX,
  cellTop,
  cellX,
  leverRowTop,
  markTop,
  markX,
} from "../levers-geometry";
// The three things all three slides in THE MANDATE print identically — the mono
// register, the band's own tiers, and the reveal's lead-in. See that module for
// what stays local here and why.
import { REVEAL_LEAD_MS, SHARED_TIER, mono } from "../type-registers";
import { mandateLeversContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and the same tier for every row of the board.
 *
 * THE FOUR LEVERS ARE DELIBERATELY UNRANKED. All four labels are
 * `--neutral-100`, all four lines `--neutral-300`, all four marks the same copper
 * — reading top to bottom nothing changes, because a lever nobody pulls takes the
 * other three down with it and a brighter row would be a claim nobody authored.
 * `./EnablementModel.tsx` makes the identical call about its pillars, two slides
 * earlier, and this stage inherits it rather than re-arguing it.
 *
 * THE FOUR AUTHORITY HEADS ARE UNRANKED TOO, AND THAT ONE IS LOAD-BEARING. `YOU`
 * is printed at exactly the tier of `THE COMMITTEE`, `GROUP HR` and `A BUDGET
 * CYCLE`. The head row asks the question; the CELLS answer it. A brighter first
 * head would answer it before the form was drawn, and the slide would be
 * asserting in colour what it is about to demonstrate in a count.
 *
 * THE ONE RANK ON THIS STAGE IS BETWEEN A FILLED CELL AND AN EMPTY ONE, and it is
 * two tiers plus the difference between a solid and a hairline. See the header for
 * why it is not an opacity.
 *
 * SPREAD FROM {@link SHARED_TIER}, WHICH IS THE OTHER HALF OF THE TABLE. The
 * headings, the band and the closer are the same objects K.1 and K.2 print one and
 * two clicks earlier and are declared once, in `../type-registers.ts`; everything
 * named below belongs to THIS figure and to no other.
 */
const TIER = {
  ...SHARED_TIER,

  /** The four lever labels. One tier under the headline's `--neutral-50` on the
   *  ramp this stage declares, and the same tier K.1 gives its seven names. */
  label: "var(--neutral-100)",
  /** What each act actually is. gh#50's floor for text on this stage, which is
   *  where an explanation belongs: quietest, and still legible from the back row. */
  line: "var(--neutral-300)",

  /** The four authority heads. The value is `SHARED_TIER.heading`'s and the ROLE
   *  is not — a heading names a question about the whole stage, a head names one
   *  column of a form — so it is declared here rather than borrowed. Same call,
   *  same reason, as `TIER.line` in `../type-registers.ts`. */
  authority: "var(--copper-400)",
  /** The form's head rule. Dark enough to divide the heads from the cells without
   *  drawing a box around the form. */
  rule: "var(--copper-900)",

  /** A cell nobody has to sign: a hairline FRAME, empty. Bright enough to be
   *  counted from the back row — the twelve empty cells are half the figure's
   *  claim, and a frame the room cannot see is a claim it cannot check. */
  cellFrame: "1px solid var(--copper-800)",
  /** What is put in a cell the lever does need. Solid, and three stops up the
   *  ramp from the frame it sits in. */
  mark: "var(--copper-500)",

  /** The citation inside the band. Same tier as the lever lines: it is a source,
   *  not an argument. NOT SHARED with K.1's `bandSource` or K.2's
   *  `bandProvenance` even though all three values agree — see
   *  `../type-registers.ts` on `TIER.line`, which is the same call about the same
   *  colour. */
  bandProvenance: "var(--neutral-300)",
} as const;

// ───────────────────── type registers ─────────────────────
// TWO, for the two things this stage prints: mono for anything the room reads as
// a LABEL, sans for anything it reads as an INSTRUCTION. The band's statement and
// the closer are the deliberate third case — serif, the deck's argument register —
// and are styled inline below, because there are two of them and they differ.
//
// The MONO half is `../type-registers.ts`'s, shared with K.1 and K.2 because the
// three rooms see the same labels one click apart; the SANS half is this file's,
// at K.1's 13.5px rather than K.2's 12.5px, because this stage sets its prose in a
// 644px column and K.2 sets its gates in a 278px one.
//
// Both floors are gh#50's: 9.5px for a mono label, 10.5px for prose, and nothing
// here rests below `--neutral-300`. Neither is enforced from this file — a
// computed font size is not something jsdom has — so the sizes are stated once, at
// the call sites below, where a reviewer can check them against the floor in one
// place. The smallest type on this stage is the 10px authority heads, half a pixel
// clear of the mono floor and the reason the head budget in
// `../levers-geometry.ts` is cut against 10px and not against 9.5px.

/** The sans INSTRUCTION register — what each lever actually asks the leader to
 *  do. Not mono: a mono instruction under a mono label reads as part of the
 *  label, which is precisely the collapse this slide cannot afford, since the
 *  label is the act's NAME and the line is the act. */
const instruction: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 13.5,
  lineHeight: 1.35,
  color: TIER.line,
};

/**
 * How far behind the one before it each item arrives.
 *
 * THE MARKS REUSE THE LEVERS' OWN STAGGER, which is the only one of the three
 * worth an argument. The four levers land top to bottom so the board reads as a
 * list being read rather than as one flash of four; the four marks land top to
 * bottom at the SAME interval, so the room sees one signature per lever arriving
 * in the order the levers were read. A different interval would make the marks a
 * separate event rather than the answer to the four asks above them.
 *
 * THE EMPTY FORM STAGGERS BY COLUMN, NOT BY ROW, because at that pose the form is
 * a QUESTION and the question is about columns: four slots build left to right,
 * and the room is looking at which of them will get anything. The lead-in all
 * three are added to is `REVEAL_LEAD_MS`, shared with K.1 and K.2
 * (`../type-registers.ts`).
 */
const LEVER_STAGGER_MS = 90;
const AUTHORITY_STAGGER_MS = 80;
const MARK_STAGGER_MS = 90;

// ───────────────────── the figure ─────────────────────

export interface LeverBoardProps {
  /** 0…4. See the slide file for what each pose argues. */
  pose: number;
}

export function LeverBoard({ pose }: LeverBoardProps) {
  const showForm = pose >= 1;
  const showMarks = pose >= 2;
  const showBand = pose >= 3;
  const showCloser = pose >= 4;

  const { levers, authorities, playbook } = C;
  const columns = authorities.length;
  const rows = levers.length;
  const columnWidth = authorityColWidth(columns);

  return (
    <>
      {/* THE TWO HEADINGS AND THE FORM'S HEAD STAND FROM POSE 0, including the
          head of a form that holds nothing yet. The call K.1 makes about its
          empty right-hand column, for the reason it gives: a stage whose right
          half is blank and unlabelled reads as a slide that failed to finish,
          and the same half under its own heading reads as a promise. Here the
          promise is doing more work than it does there — the room reads the
          question "what does each one need before it can happen?" while it is
          still reading the four acts, so by the time the boxes arrive it already
          knows what they are for. */}
      <div
        data-testid="mandate-levers-heading"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: HEADING_TOP,
          width: LEVER_WIDTH,
          ...mono(11, TIER.heading, 0.2),
        }}
      >
        {C.leversHeading}
      </div>
      <div
        data-testid="mandate-levers-authority-heading"
        style={{
          position: "absolute",
          left: FORM_X,
          top: HEADING_TOP,
          width: FORM_WIDTH,
          ...mono(11, TIER.heading, 0.2),
        }}
      >
        {C.authorityHeading}
      </div>

      {/* THE FOUR AUTHORITY HEADS, centred over the columns their cells sit in,
          and all four at one tier — see the tier table. */}
      {authorities.map((authority, a) => (
        <div
          key={authority.id}
          data-testid={`mandate-levers-authority-${authority.id}`}
          style={{
            position: "absolute",
            left: authorityColX(a, columns),
            top: AUTHORITY_HEAD_TOP,
            width: columnWidth,
            textAlign: "center",
            ...mono(10, TIER.authority, 0.12),
            lineHeight: 1.3,
          }}
        >
          {authority.label}
        </div>
      ))}

      {/* THE HEAD RULE. Spans the FORM and not the stage — a rule running under
          both headings would draw one table around the whole slide, and the four
          levers would become rows of the form rather than the thing the form is
          about. */}
      <div
        data-testid="mandate-levers-head-rule"
        style={{
          position: "absolute",
          left: FORM_X,
          top: HEAD_RULE_TOP,
          width: FORM_WIDTH,
          height: HEAD_RULE_HEIGHT,
          background: TIER.rule,
        }}
      />

      {/* THE FOUR LEVERS — a mono label over one line of what the leader does. */}
      {levers.map((lever, i) => (
        <Reveal
          key={lever.id}
          on
          delay={REVEAL_LEAD_MS + i * LEVER_STAGGER_MS}
          data-testid={`mandate-lever-${lever.id}`}
          style={{
            position: "absolute",
            left: SIDE_MARGIN,
            top: leverRowTop(i, rows),
            width: LEVER_WIDTH,
            height: LEVER_ROW_HEIGHT,
          }}
        >
          <div
            data-testid={`mandate-lever-label-${lever.id}`}
            style={{ ...mono(12, TIER.label), lineHeight: 1.25 }}
          >
            {lever.label}
          </div>
          <div
            data-testid={`mandate-lever-line-${lever.id}`}
            style={{ ...instruction, marginTop: LEVER_LABEL_GAP }}
          >
            {highlight(lever.line, lever.lineKw)}
          </div>
        </Reveal>
      ))}

      {/* THE FORM — every cell of it, drawn empty. SIXTEEN BOXES AND NO ANSWER
          YET, which is what this pose is for: the room asks "who has to sign
          these?" one click before the deck answers. A form that arrived already
          filled would land the question and its answer in the same glance, and
          the four marks would be decoration rather than a result. Each cell is
          its own box on the stage — no per-column wrapper, so nothing on this
          stage is a transparent sheet laid over anything else. */}
      {authorities.map((authority, a) =>
        levers.map((lever, i) => (
          <Reveal
            key={`${authority.id}-${lever.id}`}
            on={showForm}
            delay={REVEAL_LEAD_MS + a * AUTHORITY_STAGGER_MS}
            data-testid={`mandate-levers-cell-${lever.id}-${authority.id}`}
            style={{
              position: "absolute",
              left: cellX(a, columns),
              top: cellTop(i, rows),
              width: CELL_WIDTH,
              height: CELL_HEIGHT,
              boxSizing: "border-box",
              border: TIER.cellFrame,
            }}
          />
        )),
      )}

      {/* THE MARKS — one per lever, and every one of them in the same column.
          FILLED FROM `lever.needs` AND FROM NOTHING ELSE (`../content.ts`), so
          the twelve cells that stay empty are DERIVED rather than typed: there is
          no list of empty cells anywhere in this section, and a lever that ever
          claimed a second authority would fail that module at load rather than
          quietly draw a second filled column under a headline that denies one
          exists. */}
      {authorities.map((authority, a) =>
        levers
          .map((lever, i) => ({ lever, i }))
          .filter(({ lever }) => lever.needs.includes(authority.id))
          .map(({ lever, i }) => (
            <Reveal
              key={`${authority.id}-${lever.id}`}
              on={showMarks}
              delay={REVEAL_LEAD_MS + i * MARK_STAGGER_MS}
              data-testid={`mandate-levers-mark-${lever.id}-${authority.id}`}
              style={{
                position: "absolute",
                left: markX(a, columns),
                top: markTop(i, rows),
                width: MARK_WIDTH,
                height: MARK_HEIGHT,
                background: TIER.mark,
              }}
            />
          )),
      )}

      {/* THE BAND — full width, under both the board and the form, which is the
          geometric claim: the playbook these four came from is a property of the
          whole ask and not of one lever. Three lines, three registers, and the
          split between them is what keeps the band honest (see `../content.ts`):
          a mono eyebrow naming what this is, a serif statement in the DECK's
          words with no quotation marks, and a mono citation in the PLAYBOOK's own
          labels with them. The same three-line band K.1 and K.2 print one and two
          clicks earlier — the section's citation apparatus, deliberately constant
          while the three figures above it are deliberately not. */}
      <Reveal
        on={showBand}
        delay={REVEAL_LEAD_MS}
        data-testid="mandate-levers-band"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: BAND_TOP,
          width: CONTENT_WIDTH,
          height: BAND_HEIGHT,
          boxSizing: "border-box",
          padding: `${BAND_PADDING_Y}px ${BAND_PADDING_X}px`,
          border: TIER.bandBorder,
          background: TIER.bandBackground,
        }}
      >
        <div
          data-testid="mandate-levers-band-eyebrow"
          style={{ ...mono(11, TIER.bandEyebrow, 0.22), lineHeight: 1.35 }}
        >
          {playbook.eyebrow}
        </div>
        <p
          data-testid="mandate-levers-band-statement"
          style={{
            margin: "6px 0 0",
            fontFamily: "var(--serif)",
            fontSize: 19,
            lineHeight: 1.4,
            color: TIER.bandStatement,
          }}
        >
          {highlight(playbook.statement, playbook.statementKw)}
        </p>
        <div
          data-testid="mandate-levers-band-provenance"
          style={{ marginTop: 8, lineHeight: 1.5, ...mono(10.5, TIER.bandProvenance, 0.02, false) }}
        >
          {playbook.provenance}
        </div>
      </Reveal>

      {/* THE CLOSER — the ask, and the last thing THE MANDATE says. Serif italic,
          the deck's argument register, on the shelf K.1's and K.2's closers stand
          on (`../levers-geometry.ts` reads it from `../geometry.ts`): three
          adjacent slides, and the deck's own ask does not move between clicks. */}
      <Reveal
        on={showCloser}
        as="p"
        data-testid="mandate-levers-closer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CLOSER_TOP,
          width: CONTENT_WIDTH,
          margin: 0,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 20,
          lineHeight: 1.35,
          color: TIER.closer,
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
