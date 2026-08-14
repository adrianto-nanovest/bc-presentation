// The staircase, its five rungs, and the marks on it.
//
// ONE COMPONENT AND NOT TWO, deliberately. Each marker's epistemic status is
// carried by FOUR encodings at once (§7.2) and two of them are SVG (the leader
// line, the dot) while two are HTML (the chip's border, its type). Splitting the
// SVG layer from the chip layer would put half of each encoding pair in a
// different file, and the failure mode this slide has — three of the four
// encodings agreeing and the fourth quietly not — is exactly what that split
// would hide. So `FORM` below is the whole contract, in one table, read by both
// layers.
//
// It reads NO variant and NO brand: the resolved block arrives as a prop. That is
// what lets one test render both brands' ladders side by side in a single module
// epoch, which is the only way to compare them.
//
// CSS vars only, no hex literals. No new fonts, no new libraries. Rank is a
// COLOUR TIER and never opacity — opacity here means "not revealed yet", which is
// time, not rank.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive — 27
// modules reach for it, A.1 among them, against 6 for the section F duplicate. A
// fourth copy under this directory would be the wrong answer to three existing
// ones; centralising them is a cleanup this ticket is not.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ASIDE_LEADER,
  ASIDE_SLOT,
  CHIP_SHELF,
  CLOSER_SLOT,
  GAP_TAG_SLOT,
  LEADER_GAP,
  OPEN_SLOT,
  RUNG_COUNT,
  STAIR_PATH_EARNED,
  STAIR_PATH_UNEARNED,
  TECH_SLOT,
  TREADS,
  anchorPoint,
  stairPathBetween,
} from "../geometry";
import { gapLadderContent as C, type LadderBrandBlock } from "../content";

// ───────────────────── the contract, in one table ─────────────────────

/**
 * §7.2's four encodings, both sides of each.
 *
 * NO LEGEND ANYWHERE ON THE SLIDE, so these four are the only thing that tells a
 * room which mark is a claim and which is a question. They are written as one
 * object rather than as branches inside the markup for one reason: a reader — and
 * a reviewer — has to be able to check that all four actually differ, and that is
 * a four-line diff here instead of a hunt through two components.
 *
 *   1. the chip     — solid hairline vs HAIRLINE DASHED (and filled vs unfilled)
 *   2. the leader    — solid 2px vs DASHED 1px
 *   3. the mark      — filled dot vs OPEN RING
 *   4. the type      — mono uppercase + source vs SERIF ITALIC ending in "?"
 *
 * Encoding 4 lives in the two chip bodies below, because it is a whole type
 * register and not a property; the three that ARE properties are here.
 *
 * HOVER TOUCHES NONE OF THEM. All three boxes carry `globals.css`'s `.box-hover`,
 * which lays a brighter hairline and a copper wash over a hovered box — and that
 * overlay takes the box's own border STYLE by `inherit`, so solid stays solid,
 * dashed stays dashed and dotted stays dotted. Encoding 1 is the style and a
 * colour cannot flatten it; the same promise `.gap-box-live`'s travelling dashes
 * already make on this stage. The leader, the mark and the type are outside the box
 * the pointer is on and never move at all.
 */
const FORM = {
  asserted: {
    chipBorder: "1px solid var(--copper-300)",
    chipBackground: "var(--copper-950)",
    leaderStroke: "var(--copper-300)",
    leaderWidth: 2,
    /** No dash — a solid tether. `undefined` rather than `"none"` so the
     *  attribute is absent from the DOM and the test can tell the two apart by
     *  presence, not by parsing a keyword. */
    leaderDash: undefined as string | undefined,
    dotFill: "var(--copper-300)",
    dotStroke: undefined as string | undefined,
  },
  open: {
    chipBorder: "1px dashed var(--copper-600)",
    /** UNFILLED, and the same reason the dot is a ring: nothing has been placed
     *  here yet, so nothing is coloured in. */
    chipBackground: "transparent",
    leaderStroke: "var(--copper-600)",
    leaderWidth: 1,
    leaderDash: "3 5",
    dotFill: "none",
    dotStroke: "var(--copper-600)",
  },
  /**
   * THE THIRD FORM — ours, and it is deliberately neither of the two above.
   *
   * IT IS A BOX NOW, on the owner's call of 2026-08-13, and the note this file
   * carried against exactly that ("a third leader style would be a fifth encoding")
   * is answered rather than ignored: the box does not COMPETE with the two chips,
   * it opts out of their vocabulary. DOTTED, where they are solid and dashed;
   * unfilled; a hairline in a dimmer copper; and its leader ends in an ARROWHEAD,
   * which neither chip's does. A room reading the stage sees two chips making
   * claims about the organisation in front of it and one box, drawn differently,
   * saying where the speaker stands.
   *
   * WHAT IT STILL DOES NOT DO: it names no source, because there is none — L3–L4 is
   * our own account of our own work. The register is the epistemic status, and this
   * register is the lightest on the stage.
   */
  aside: {
    chipBorder: "1px dotted var(--copper-500)",
    chipBackground: "transparent",
    leaderStroke: "var(--copper-400)",
    leaderWidth: 1.25,
    leaderDash: "4 4",
  },
} as const;

const DOT_R = 6;
/** The arrowhead's `<marker>` id, referenced once and defined once. */
const ARROW_ID = "gap-aside-arrow";

/**
 * The pose-0 build, in milliseconds, as one table.
 *
 * ONE KEYPRESS AND ONE ARGUMENT, but not one instant: pose 0 now carries the
 * ladder AND both marks the deck can name (the owner's step plan, 2026-08-13), and
 * five things arriving together is a slide the room has to re-scan. So the pose
 * SEQUENCES itself — the staircase climbs, each rung label lands as the line
 * passes it, the top step dashes itself in, and the two marks arrive last. Nothing
 * here is a step: a presenter presses once and the pose plays.
 *
 * The rung offsets are read off the draw itself. The earned path is 1048 user
 * units long and sweeps at a constant rate, so a tread's END is at
 * (its length so far / 1048) of the way through — 21%, 46%, 71%, 96%. The labels
 * follow that, which is what makes the line look like it is delivering them.
 *
 * EVERY BOX THAT READS A NUMBER FROM HERE CARRIES `.gap-beat`, and the SVG marks
 * carry `.gap-mark-in`. Those two class names are what `prefers-reduced-motion`
 * hooks to give the delays back (globals.css): reduced motion means no motion, not
 * a 1.9-second silent wait. A new delayed box without one of those classes is a box
 * a reader who asked for no animation will sit and wait for.
 */
const BEAT = {
  earnedDraw: 1050,
  unearnedIn: 1080,
  /** L1…L5, landing just behind the drawing line. */
  rung: (i: number) => 170 + i * 215,
  techChip: 1180,
  techMark: 1260,
  aside: 1380,
  asideMark: 1440,
  openChip: 0,
  openMark: 140,
  gapDraw: 900,
  gapTag: 560,
  closer: 720,
} as const;

/** A mark's own fade-in, since SVG marks cannot use `Reveal` — see the note in the
 *  SVG layer below. */
function markIn(delay: number): CSSProperties {
  return { animationDelay: `${delay}ms` };
}

// ───────────────────── type registers ─────────────────────
// TWO HELPERS, for the two registers the MARKERS use: mono for anything the room
// reads as a label, serif for anything they read as a sentence. The rung block is
// the deliberate third case and is styled inline below — `--display` for the rung
// name, because a rung name is a title and the deck sets titles in the display
// serif everywhere, and `--sans` for its definition. Four families on the slide,
// then, and each one earns its place; the helpers exist for the two that repeat.
//
// Both floors are gh#50's — 9.5px for a mono label, 10.5px for prose — and nothing
// here rests below `--neutral-300`. Neither is enforced from this file: the sizes
// and tiers are audited on the rendered tree by `scripts/gh53-verify.mjs`, because
// a computed font size is not something jsdom has.

/**
 * The mono register. `upper` is the default because every mono LABEL in this deck
 * is uppercase — but the asserted chip's SOURCE is a sentence-length citation, and
 * 120 characters of uppercase mono is a wall nobody in the back row reads. It stays
 * in this register (that is encoding 4) and drops the transform.
 */
function mono(size: number, color: string, ls = 0.16, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

function prose(size: number, color: string, italic = false): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontStyle: italic ? "italic" : "normal",
    fontSize: size,
    lineHeight: 1.4,
    color,
    margin: 0,
  };
}

// ───────────────────── the figure ─────────────────────

export interface CapabilityLadderProps {
  /** The brand's resolved block — `capabilityLadderFor(VARIANT.brand)`. */
  content: LadderBrandBlock;
  /** 0…2. See the slide file for what each pose argues. */
  pose: number;
}

export function CapabilityLadder({ content, pose }: CapabilityLadderProps) {
  // POSE 0 CARRIES THE LADDER AND EVERYTHING THE DECK CAN NAME ON IT — the two
  // marks that come with their own evidence, cited and self-reported. Pose 1 asks
  // about everybody else. Pose 2 lights the distance between them. So the two
  // marks are not gated at all; what gates them is `BEAT`, inside pose 0.
  const showOpen = pose >= 1;
  const showGap = pose >= 2;

  const { techFunction, open } = content;
  // `t` AND NOT JUST THE RUNG, because the chip does not move and the tread does:
  // the tech slot is fixed so both brands' rooms look at the same rectangle, and a
  // mark on a rung whose midpoint falls outside it would start its leader in mid-air
  // beside the chip. The content module carries the number (see `AssertedMarker.t`)
  // — `anchorPoint` defaults it to the midpoint, which is what L3 wants.
  const assertedAt =
    techFunction.kind === "asserted"
      ? anchorPoint({
          on: "tread",
          rung: techFunction.marker.rung,
          t: techFunction.marker.t,
        })
      : null;
  const openAt = anchorPoint({ on: "tread", rung: open.rung });
  // The riser this mark sits on IS what "L3–L4" means on a staircase. `below: 2`
  // is the riser rising out of L3, so the bead lands between the two rungs the
  // label names and on the figure rather than beside it.
  const asideAt = anchorPoint({ on: "riser", below: 2 });
  // THE LIT STRETCH, from the question to the claim — and only where there IS a
  // claim. A brand with nothing to place has no distance to measure, and a lit
  // line to nowhere would be the invented placement this slide exists to refuse.
  const gapPath = assertedAt ? stairPathBetween(openAt, assertedAt) : null;

  return (
    <>
      {/* THE SVG LAYER — the staircase and the two SVG halves of each encoding.
          Marks fade by OPACITY ONLY, through `.gap-mark-in`, and never through
          `Reveal`: `.fade`'s translateY is in user units inside an <svg>, so a
          fading dot would also slide 8px, and a dot that arrives beside its tread
          and then walks onto it is a worse lie than no transition at all. */}
      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720">
        <defs>
          {/* THE CLIMB, AS COLOUR. One hue, three tiers of it, mapped left to
              right across the figure: L1 sits in the dimmest copper the deck has
              and L5 in the brightest. Rank as a colour tier is this slide's own
              rule; the gradient just applies it to the line instead of to the
              type, so the staircase reads as a climb even before a word of it is
              read. `userSpaceOnUse`, so the ramp is pinned to the stage's own
              coordinates and every tread lands on the same tier under both
              brands. */}
          <linearGradient
            id="gap-ladder-climb"
            gradientUnits="userSpaceOnUse"
            x1={TREADS[0].x1}
            y1={0}
            x2={TREADS[RUNG_COUNT - 1].x2}
            y2={0}
          >
            <stop offset="0" stopColor="var(--copper-700)" />
            <stop offset="0.5" stopColor="var(--copper-500)" />
            <stop offset="1" stopColor="var(--copper-200)" />
          </linearGradient>

          {/* THE ONE ARROWHEAD ON THE STAGE, and it belongs to the aside. Neither
              chip's leader has one: a chip TETHERS to the rung it names and the
              tether's meaning is that the two objects are the same claim, while
              this one POINTS — it says "that height, there", from a box that is
              not making a claim about the room at all.

              `userSpaceOnUse`, so the head is 9 stage units wide whatever the
              stroke does, and `orient="auto"` so it turns with the segment it
              ends. `refX` at the tip, so the point of the triangle is where the
              path stops rather than 9 units past it. */}
          <marker
            id={ARROW_ID}
            viewBox="0 0 9 9"
            refX={9}
            refY={4.5}
            markerWidth={9}
            markerHeight={9}
            markerUnits="userSpaceOnUse"
            orient="auto"
          >
            <path d="M 0 0.5 L 9 4.5 L 0 8.5 Z" fill={FORM.aside.leaderStroke} />
          </marker>
        </defs>

        <path
          data-testid="gap-ladder-path"
          className="gap-ladder-draw"
          style={{ animationDuration: `${BEAT.earnedDraw}ms` }}
          d={STAIR_PATH_EARNED}
          pathLength={1}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="url(#gap-ladder-climb)"
          strokeWidth={2.5}
        />

        {/* THE STEP NOBODY HAS BUILT. L5 is declared only when earned and nothing
            on this ladder is placed near it, so its riser and tread are drawn in
            the same dash the open marker uses — the deck's existing mark for "not
            claimed", spent on a step instead of on a chip.

            IT FADES IN AND DOES NOT DRAW ITSELF, and that is forced rather than
            chosen: the draw-in IS a `stroke-dasharray`, and a CSS class setting
            that property beats a `stroke-dasharray` attribute on the same element
            — so a path cannot both sweep and look dashed. Given the two, the dash
            is the one carrying meaning. It still ARRIVES after the solid climb
            finishes, which is the sequence the sentence has too. */}
        <path
          data-testid="gap-ladder-path-unearned"
          className="gap-mark-in"
          style={{ animationDelay: `${BEAT.unearnedIn}ms` }}
          d={STAIR_PATH_UNEARNED}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--copper-700)"
          strokeWidth={2}
          strokeDasharray="9 8"
        />

        {/* THE GAP — the last pose, and the only drawing on this slide that is an
            argument rather than a fact. It re-draws the stretch of staircase the
            room has already read, brighter and thicker, from the ring to the
            claim. Same corners, from `stairPathBetween`, so the highlight cannot
            drift off the line it is highlighting. */}
        {showGap && gapPath && (
          <path
            data-testid="gap-ladder-path-gap"
            className="gap-ladder-draw"
            style={{ animationDuration: `${BEAT.gapDraw}ms` }}
            d={gapPath}
            pathLength={1}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="var(--copper-200)"
            strokeWidth={4.5}
          />
        )}

        {assertedAt && (
          <g data-testid="gap-mark-asserted">
            <line
              data-testid="gap-leader-asserted"
              className="gap-mark-in"
              style={markIn(BEAT.techMark)}
              x1={assertedAt.x}
              y1={CHIP_SHELF}
              x2={assertedAt.x}
              y2={assertedAt.y - LEADER_GAP}
              stroke={FORM.asserted.leaderStroke}
              strokeWidth={FORM.asserted.leaderWidth}
              strokeDasharray={FORM.asserted.leaderDash}
            />
            <circle
              data-testid="gap-dot-asserted"
              className="gap-mark-in"
              style={markIn(BEAT.techMark)}
              cx={assertedAt.x}
              cy={assertedAt.y}
              r={DOT_R}
              fill={FORM.asserted.dotFill}
              stroke={FORM.asserted.dotStroke}
            />
          </g>
        )}

        {/* THE ASIDE'S ARROW — out of the box's underside, one turn, and a head on
            the L3–L4 riser.

            IT TURNS BECAUSE IT HAS TO. The box stands on L4's step and the riser it
            names is below and left of it, behind that step: every straight run
            between the two crosses either L4's tread or L4's rung label. Left of the
            riser the band between the treads is empty, so the leader drops into it
            first and comes at the riser level, which is also the direction that says
            "this height" rather than "this step".

            The retired shape was a short level TICK with no leader at all, and the
            reason it went is the reason this file argued for it: with no tether, the
            only thing holding the note to the figure was that it stood above it. */}
        <path
          data-testid="gap-mark-aside"
          className="gap-mark-in"
          style={markIn(BEAT.asideMark)}
          d={`M ${ASIDE_LEADER.x} ${ASIDE_SLOT.bottom} L ${ASIDE_LEADER.x} ${asideAt.y} ` +
            `L ${asideAt.x - ASIDE_LEADER.tipGap} ${asideAt.y}`}
          fill="none"
          stroke={FORM.aside.leaderStroke}
          strokeWidth={FORM.aside.leaderWidth}
          strokeDasharray={FORM.aside.leaderDash}
          markerEnd={`url(#${ARROW_ID})`}
        />

        {showOpen && (
          <g data-testid="gap-mark-open">
            <line
              data-testid="gap-leader-open"
              className="gap-mark-in"
              style={markIn(BEAT.openMark)}
              x1={openAt.x}
              y1={CHIP_SHELF}
              x2={openAt.x}
              y2={openAt.y - LEADER_GAP}
              stroke={FORM.open.leaderStroke}
              strokeWidth={FORM.open.leaderWidth}
              strokeDasharray={FORM.open.leaderDash}
            />
            <circle
              data-testid="gap-dot-open"
              className="gap-mark-in"
              style={markIn(BEAT.openMark)}
              cx={openAt.x}
              cy={openAt.y}
              r={DOT_R}
              fill={FORM.open.dotFill}
              stroke={FORM.open.dotStroke}
              strokeWidth={1.4}
            />
          </g>
        )}
      </svg>

      {/* THE RUNGS — the ladder's own vocabulary, hung under each tread. Every
          string here is a label: no keywords, by the rule in `../content.ts`. */}
      {C.rungs.map((rung, i) => {
        const tread = TREADS[i];
        return (
          <Reveal
            on
            delay={BEAT.rung(i)}
            className="gap-beat"
            key={rung.id}
            data-testid={`gap-rung-${rung.id}`}
            style={{
              position: "absolute",
              left: tread.x1 + 10,
              top: tread.y + 10,
              width: tread.x2 - tread.x1 - 20,
              zIndex: 2,
            }}
          >
            <div
              data-testid={`gap-rung-${rung.id}-name`}
              style={{
                fontFamily: "var(--display)",
                fontSize: 19,
                lineHeight: 1.15,
                color: "var(--neutral-50)",
              }}
            >
              <span style={{ color: "var(--copper-300)" }}>{rung.level}</span> · {rung.title}
            </div>
            <div
              data-testid={`gap-rung-${rung.id}-sub`}
              style={{
                fontFamily: "var(--sans)",
                fontSize: 11.5,
                lineHeight: 1.3,
                marginTop: 4,
                color: "var(--neutral-300)",
              }}
            >
              {rung.sub}
            </div>
          </Reveal>
        );
      })}

      {/* THE TECH-FUNCTION SLOT — one slot, two possible fills, never empty.
          Bottom-aligned to the shelf both chips hang from, so the asserted chip
          and the absence line occupy the same rectangle and a leader walking this
          deck under either brand looks at the same place.

          THE WRAPPER CARRIES THE SLOT AND THE FILL CARRIES THE FORM, which is why
          this one reveal is a box around a box while the open marker below is a
          single box: the slot's geometry belongs to neither fill, and putting the
          chip's border on the wrapper would draw one around the absence line too —
          turning "we looked and found nothing" into a bordered claim. */}
      <Reveal
        on
        delay={BEAT.techChip}
        className="gap-beat"
        data-testid="gap-tech-slot"
        style={{
          position: "absolute",
          left: TECH_SLOT.left,
          width: TECH_SLOT.width,
          bottom: 720 - CHIP_SHELF,
          zIndex: 3,
        }}
      >
        {techFunction.kind === "asserted" ? (
          <div
            data-testid="gap-marker-asserted"
            className="gap-box-live box-hover"
            style={{
              position: "relative",
              padding: "12px 16px",
              boxSizing: "border-box",
              border: FORM.asserted.chipBorder,
              background: FORM.asserted.chipBackground,
            }}
          >
            <div data-testid="gap-asserted-label" style={mono(13, "var(--neutral-0)")}>
              {techFunction.marker.label}
            </div>
            {/* WHY THE RUNG, IN POINTS — one per clause of L3's own definition, in
                its order (see `../content.ts`). A list and not a paragraph because
                the claim under it is `≈ L3`: a room that has to parse three facts
                out of a sentence parses them AFTER it has already decided whether
                it agrees with the placement.

                MONO, not serif — §7.2's encoding 4 is a whole type register, and a
                serif body would put the asserted chip in the SAME register as the
                open chip's question. Then three encodings carry the distinction and
                the fourth only looks like it does. Sentence case at 10.5px: mono is
                wide, and this is the size that fits a point on one line in a 284px
                slot and still clears gh#50's floor.

                THE BULLET IS A COPPER RULE AND NOT A "·" OR A "—", because the two
                other boxes on this stage already spend the middle dot in their
                labels. A 6px rule reads as a list marker at the back of a room and
                as nothing else. */}
            <ul
              data-testid="gap-asserted-points"
              style={{ margin: "10px 0 0", padding: 0, listStyle: "none" }}
            >
              {techFunction.marker.points.map((point) => (
                <li
                  key={point}
                  style={{
                    // CENTRED AND NOT BASELINE-ALIGNED, which is only correct
                    // because a point is one line: on a baseline the rule sits ON
                    // the text's baseline and reads as an underscore in front of
                    // the first word. A point that wrapped would want the other
                    // alignment, and `../content.ts` cuts them so none does.
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    marginTop: 5,
                    lineHeight: 1.45,
                    ...mono(10.5, "var(--copper-100)", 0.02, false),
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flex: "none",
                      width: 7,
                      height: 1,
                      background: "var(--copper-300)",
                    }}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {/* THE CITATION, and it is now the shortest line in the box: the points
                carry the facts, so this only has to say who published them. §6.5
                still requires it ON the slide rather than footnoted. A tier dimmer
                than the points, because it licenses them rather than arguing. */}
            <div
              data-testid="gap-asserted-source"
              style={{
                marginTop: 10,
                ...mono(9.5, "var(--neutral-300)", 0.12),
              }}
            >
              {techFunction.marker.source}
            </div>
          </div>
        ) : (
          // NO chip, NO leader, NO dot — the three things that would make this
          // look like a placement. It is a statement ABOUT the ladder, and it
          // names no rung on purpose: a bordered box here would read as
          // "MineTech is somewhere around L3", which is the one claim this slide
          // exists to refuse. A tier below the chips, because it is not a mark.
          <p data-testid="gap-tech-absence" style={prose(15, "var(--neutral-300)")}>
            {highlight(techFunction.line, techFunction.lineKw)}
          </p>
        )}
      </Reveal>

      {/* THE OPEN MARKER. Encoding 4 lives here: a mono eyebrow, then a
          serif-italic sentence that ends in "?", then the evidence that makes it
          fair to ask. The asserted chip's body is a label and a source; this one
          is a question. The two never share a body. */}
      <Reveal
        on={showOpen}
        delay={BEAT.openChip}
        className="gap-beat gap-box-live box-hover"
        data-testid="gap-marker-open"
        style={{
          position: "absolute",
          left: OPEN_SLOT.left,
          width: OPEN_SLOT.width,
          bottom: 720 - CHIP_SHELF,
          padding: "12px 16px",
          boxSizing: "border-box",
          border: FORM.open.chipBorder,
          background: FORM.open.chipBackground,
          zIndex: 3,
        }}
      >
        <div data-testid="gap-open-label" style={mono(10, "var(--neutral-300)", 0.2)}>
          {open.label}
        </div>
        <p
          data-testid="gap-open-question"
          style={{ marginTop: 8, ...prose(22, "var(--neutral-50)", true) }}
        >
          {highlight(open.question, open.questionKw)}
        </p>
        <div
          data-testid="gap-open-evidence"
          style={{ marginTop: 8, ...prose(11, "var(--neutral-300)") }}
        >
          {highlight(open.evidence, open.evidenceKw)}
        </div>
      </Reveal>

      {/* THE ASIDE — standing on L4's step, in the third form: a DOTTED box, and
          the only mark on the stage whose leader ends in an arrowhead. See `FORM`
          above for why it is a box at all, and `../geometry.ts`'s ASIDE_SLOT for
          why it reaches left past the riser its arrow points at. */}
      <Reveal
        on
        delay={BEAT.aside}
        className="gap-beat gap-box-live box-hover"
        data-testid="gap-aside"
        style={{
          position: "absolute",
          left: ASIDE_SLOT.left,
          bottom: 720 - ASIDE_SLOT.bottom,
          width: ASIDE_SLOT.width,
          padding: "8px 12px",
          boxSizing: "border-box",
          border: FORM.aside.chipBorder,
          background: FORM.aside.chipBackground,
          zIndex: 3,
        }}
      >
        <div data-testid="gap-aside-label" style={mono(10, "var(--neutral-300)", 0.14)}>
          {C.aside.label}
        </div>
        <p style={{ marginTop: 6, ...prose(11, "var(--neutral-300)", true) }}>
          {highlight(C.aside.note, C.aside.noteKw)}
        </p>
      </Reveal>

      {/* THE GAP'S NAME — two mono words in the crook of the stretch they name,
          and only where a stretch was lit. Mono and not serif: it labels a
          drawing, and the sentence about what the distance MEANS is the closer's
          job. */}
      {showGap && gapPath && (
        <Reveal
          on={showGap}
          delay={BEAT.gapTag}
          className="gap-beat"
          data-testid="gap-tag"
          style={{
            position: "absolute",
            left: GAP_TAG_SLOT.left,
            top: GAP_TAG_SLOT.top,
            width: GAP_TAG_SLOT.width,
            zIndex: 3,
            ...mono(11, "var(--copper-200)", 0.2),
          }}
        >
          {C.gapLabel}
        </Reveal>
      )}

      {/* THE CLOSER — one line, on L1's own baseline, in the floor the top of the
          staircase leaves empty. `whiteSpace: nowrap` because the sentence is the
          slide's reframe and a reframe that breaks mid-clause is read twice: the
          column is 892px and the longest brand's closer needs ≈700 at this size
          (`../geometry.ts`'s CLOSER_SLOT), so nothing is being forced. */}
      <Reveal
        on={showGap}
        delay={BEAT.closer}
        className="gap-beat"
        as="p"
        data-testid="gap-closer"
        style={{
          position: "absolute",
          left: CLOSER_SLOT.left,
          right: CLOSER_SLOT.right,
          bottom: 720 - CLOSER_SLOT.bottom,
          textAlign: "right",
          whiteSpace: "nowrap",
          zIndex: 3,
          ...prose(20, "var(--neutral-200)", true),
        }}
      >
        {highlight(content.closer, content.closerKw)}
      </Reveal>
    </>
  );
}
