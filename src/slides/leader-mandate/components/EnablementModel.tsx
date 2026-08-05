// The enablement model: four equal pillars, three unequal tracks, one quoted
// bottleneck under both of them.
//
// ONE COMPONENT AND NOT THREE. The two columns and the band read as three
// independent objects and are not: the columns are laid out against ONE body
// height so they bottom out on the same line, and the band is placed against the
// bottom that produces (`../geometry.ts`). Splitting them would put that shared
// number on both sides of a file boundary, and the failure this figure is
// actually at risk of — a column that has stopped ending where the band starts —
// is exactly the one such a split would hide.
//
// THE ARGUMENT IS IN THE GEOMETRY, and it is worth stating once because no single
// string on the stage says it: the LEFT column is four IDENTICAL marks and one
// colour tier, the RIGHT column is three lanes of falling width and rising tier.
// Equal beside unequal. A leader who reads nothing but the shapes still learns
// that every pillar is mandatory and that the tracks are deliberately not the
// same size — which is the answer to "so we buy everyone a seat?" made before the
// sentence that answers it.
//
// IT READS NO VARIANT AND NO BRAND, and unlike its three sibling leader figures
// it takes no resolved brand block either: this slide has no brand axis at all.
// `../content.ts` carries the argument for that; the short form is that the
// pillars and tracks are generic by construction and the one specific thing on
// the stage is a quotation, attributed to the organisation that said it.
//
// CSS VARS ONLY, no hex and no rgba() literals. Rank is a COLOUR TIER — across
// the three cell ROLES in each row, and down the three LANES — and never opacity,
// which here means "not revealed yet", i.e. time.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and there is no
// `<svg>` on this slide at all, so the question is closed by CONSTRUCTION rather
// than by discipline. The lane bars, the pillar marks and the column divider are
// plain boxes, which is the whole reason they are boxes: an SVG rect would have
// bought nothing and would have re-opened a question the deck has had to answer
// with a `matchMedia` gate three times elsewhere (`E12LoopAnatomy`,
// `E12MindsetDiptych`, `E9DistractionMotion`). The entire motion budget is
// `.fade` — an opacity-and-translate transition plus the `fadeReveal` keyframe
// `.fade.on` adds (`src/styles/globals.css`) — and the global
// `prefers-reduced-motion: reduce` rule at the top of that stylesheet squashes
// BOTH channels to 0.01ms, so every pose rests on its finished frame under either
// preference and there is nothing to gate at mount.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive — 29
// modules outside section E import this `Reveal`, THIS FILE INCLUDED (gh#56's
// ledger counted 27, gh#60 made this file the 28th, and gh#61's `./PhaseLadder.tsx`
// is the 29th), against 5 for the section F duplicate and none at all for section
// G's third copy outside its own directory. Two further modules take only this
// file's `CopperRule`, which is why a grep of `src/` for the path returns 31. A
// FOURTH copy under this directory would be the wrong answer to three existing
// ones; centralising them is a cleanup this ticket is not.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  BAND_HEIGHT,
  BAND_PADDING_X,
  BAND_PADDING_Y,
  BAND_TOP,
  BODY_HEIGHT,
  BODY_TOP,
  CLOSER_TOP,
  COLUMN_WIDTH,
  CONTENT_WIDTH,
  DIVIDER_X,
  HEADING_TOP,
  LANE_HEIGHT,
  PILLAR_COL_X,
  PILLAR_MARK_HEIGHT,
  PILLAR_MARK_WIDTH,
  PILLAR_ROW_HEIGHT,
  PILLAR_TEXT_WIDTH,
  PILLAR_TEXT_X,
  SIDE_MARGIN,
  TRACK_COL_X,
  TRACK_ROW_HEIGHT,
  laneFraction,
  laneWidth,
  rowTop,
} from "../geometry";
// The three things K.1 and K.2 print identically — the mono register, the band's
// own tiers, and the reveal's lead-in. See that module for what stays local here
// and why.
import { REVEAL_LEAD_MS, SHARED_TIER, mono } from "../type-registers";
import { mandateEnablementContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and the same tier for every row of a column.
 *
 * THE LEFT COLUMN IS DELIBERATELY UNRANKED. All four pillar marks are
 * `--copper-500`, all four names `--neutral-100`, all four lines
 * `--neutral-300` — reading top to bottom nothing changes, because a pillar that
 * is missing takes the other three down with it and a brighter row would be a
 * claim nobody authored. `leader-invest`'s ledger makes the same call for the
 * same reason and says so at greater length.
 *
 * THE RIGHT COLUMN IS RANKED, AND ONLY IN THE BAR. The lane's own tier rises as
 * it narrows ({@link laneTier}); its NAME and its LINE stay on the shared tiers
 * above. That split is load-bearing: the ranking on this stage is DEPTH, and if
 * the track names dimmed with the lanes the figure would also be ranking the
 * tracks' importance — which would say the enablement of everyone matters least,
 * a claim the slide is arguing against.
 *
 * SPREAD FROM {@link SHARED_TIER}, WHICH IS THE OTHER HALF OF THE TABLE. The
 * headings, the band and the closer are the same objects K.2 prints one click
 * later and are declared once, in `../type-registers.ts`; everything named below
 * belongs to THIS figure and to no other.
 */
const TIER = {
  ...SHARED_TIER,
  /** The four identical pillar marks. */
  pillarMark: "var(--copper-500)",
  /** The seven names — four pillars, three tracks. One tier under the headline's
   *  `--neutral-50` (0.9131) on the ramp this stage declares. */
  name: "var(--neutral-100)",
  /** What each name means. gh#50's floor for text on this stage, which is where a
   *  definition belongs: quietest, and still legible from the back row. */
  line: "var(--neutral-300)",
  /** The hairline between the two columns. Dark enough to divide without drawing
   *  a box around either half. */
  divider: "var(--copper-900)",
  /** The citation inside the band. Same tier as the definitions: it is a source,
   *  not an argument. NOT SHARED with K.2's `bandProvenance` even though the two
   *  values agree — see `../type-registers.ts` on `TIER.line`, which is the same
   *  call about the same colour. */
  bandSource: "var(--neutral-300)",
} as const;

/**
 * The copper ramp the lanes walk, dimmest first.
 *
 * SIX STOPS FOR THREE LANES, and that is the point: the ramp is INDEXED BY THE
 * SAME FRACTION the lane widths are cut from ({@link laneFraction}), so three
 * tracks land on 800 / 500 / 300 and a fourth would land on four evenly spread
 * stops without anybody re-typing a colour. The rejected shape was an array of
 * three tokens beside an array of three tracks — two lists that agree today and
 * are one edit apart from disagreeing, with the failure showing up as two lanes
 * the same colour, which reads as a rendering fault rather than as a mistake.
 */
const LANE_RAMP = [
  "var(--copper-800)",
  "var(--copper-700)",
  "var(--copper-600)",
  "var(--copper-500)",
  "var(--copper-400)",
  "var(--copper-300)",
] as const;

/**
 * The lane's own tier: dimmest at the widest lane, brightest at the narrowest.
 *
 * BRIGHTNESS IS DEPTH, NOT IMPORTANCE — see {@link TIER}. The narrowest lane is
 * the brightest because the fewest people go the deepest, and the two encodings
 * agree because both are cut from `laneFraction`.
 */
function laneTier(index: number, count: number): string {
  return LANE_RAMP[Math.round(laneFraction(index, count) * (LANE_RAMP.length - 1))];
}

// ───────────────────── type registers ─────────────────────
// TWO, for the two things this stage prints: mono for anything the room reads as
// a LABEL, sans for anything it reads as a DEFINITION. The band's statement and
// the closer are the deliberate third case — serif, the deck's argument register
// — and are styled inline below, because there are two of them and they differ.
//
// The MONO half is `../type-registers.ts`'s, shared with K.2 because the two rooms
// see the same labels one click apart; the SANS half is this file's, because K.2
// sets its own prose 1px smaller in a quarter-stage column.
//
// Both floors are gh#50's: 9.5px for a mono label, 10.5px for prose, and nothing
// here rests below `--neutral-300`. Neither is enforced from this file — a
// computed font size is not something jsdom has — so the sizes are stated once,
// at the call sites below, where a reviewer can check them against the floor in
// one place.

/** The sans DEFINITION register — where every other label-shaped explanation in
 *  the deck sits (the ladder's rung definitions, the ledger's metric names). Not
 *  mono: a mono definition under a mono name reads as part of the name. */
const definition: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 13.5,
  lineHeight: 1.35,
  color: TIER.line,
};

/**
 * How far behind the one before it each row arrives.
 *
 * Each column reveals top to bottom so it lands as a list being read rather than
 * as one flash of four — and the two columns have DIFFERENT staggers because they
 * arrive at different poses and neither is ever racing the other. The lead-in they
 * are added to is `REVEAL_LEAD_MS`, shared with K.2 (`../type-registers.ts`).
 */
const PILLAR_STAGGER_MS = 90;
const TRACK_STAGGER_MS = 110;

// ───────────────────── the figure ─────────────────────

export interface EnablementModelProps {
  /** 0…3. See the slide file for what each pose argues. */
  pose: number;
}

export function EnablementModel({ pose }: EnablementModelProps) {
  const showTracks = pose >= 1;
  const showBottleneck = pose >= 2;
  const showCloser = pose >= 3;

  const { pillars, tracks, bottleneck } = C;

  return (
    <>
      {/* THE TWO HEADINGS AND THE DIVIDER STAND FROM POSE 0, including the
          heading of the column that is still empty. A stage whose right half is
          blank and unlabelled reads as a slide that failed to finish; the same
          half under its own heading reads as a promise, and the room hears the
          two questions before it hears either answer. */}
      <div
        data-testid="mandate-pillars-heading"
        style={{
          position: "absolute",
          left: PILLAR_COL_X,
          top: HEADING_TOP,
          width: COLUMN_WIDTH,
          ...mono(11, TIER.heading, 0.2),
        }}
      >
        {C.pillarsHeading}
      </div>
      <div
        data-testid="mandate-tracks-heading"
        style={{
          position: "absolute",
          left: TRACK_COL_X,
          top: HEADING_TOP,
          width: COLUMN_WIDTH,
          ...mono(11, TIER.heading, 0.2),
        }}
      >
        {C.tracksHeading}
      </div>
      <div
        data-testid="mandate-divider"
        style={{
          position: "absolute",
          left: DIVIDER_X,
          top: BODY_TOP,
          width: 1,
          height: BODY_HEIGHT,
          background: TIER.divider,
        }}
      />

      {/* THE PILLARS — four rows, four identical marks, one tier. */}
      {pillars.map((pillar, i) => (
        <Reveal
          key={pillar.id}
          on
          delay={REVEAL_LEAD_MS + i * PILLAR_STAGGER_MS}
          data-testid={`mandate-pillar-${pillar.id}`}
          style={{
            position: "absolute",
            left: PILLAR_COL_X,
            top: BODY_TOP + rowTop(i, PILLAR_ROW_HEIGHT, pillars.length),
            width: COLUMN_WIDTH,
            height: PILLAR_ROW_HEIGHT,
          }}
        >
          {/* The mark. Identical for all four — see the header. */}
          <div
            data-testid={`mandate-pillar-mark-${pillar.id}`}
            style={{
              position: "absolute",
              left: 0,
              top: (PILLAR_ROW_HEIGHT - PILLAR_MARK_HEIGHT) / 2,
              width: PILLAR_MARK_WIDTH,
              height: PILLAR_MARK_HEIGHT,
              background: TIER.pillarMark,
            }}
          />
          <div style={{ position: "absolute", left: PILLAR_TEXT_X, width: PILLAR_TEXT_WIDTH }}>
            <div
              data-testid={`mandate-pillar-label-${pillar.id}`}
              style={{ ...mono(12, TIER.name), lineHeight: 1.25 }}
            >
              {pillar.label}
            </div>
            <div
              data-testid={`mandate-pillar-line-${pillar.id}`}
              style={{ ...definition, marginTop: 5 }}
            >
              {highlight(pillar.line, pillar.lineKw)}
            </div>
          </div>
        </Reveal>
      ))}

      {/* THE TRACKS — three rows, three lanes, falling width and rising tier. */}
      {tracks.map((track, i) => (
        <Reveal
          key={track.id}
          on={showTracks}
          delay={REVEAL_LEAD_MS + i * TRACK_STAGGER_MS}
          data-testid={`mandate-track-${track.id}`}
          style={{
            position: "absolute",
            left: TRACK_COL_X,
            top: BODY_TOP + rowTop(i, TRACK_ROW_HEIGHT, tracks.length),
            width: COLUMN_WIDTH,
            height: TRACK_ROW_HEIGHT,
          }}
        >
          <div
            data-testid={`mandate-track-name-${track.id}`}
            style={{ ...mono(12, TIER.name), lineHeight: 1.3 }}
          >
            {track.name}
          </div>
          {/* THE LANE. Its width says how many people and its tier says how deep,
              and both are cut from the same fraction (`../geometry.ts`), so the
              narrowest lane is always the brightest. No axis, no scale, no
              printed share — the bar is ORDINAL and nothing on this stage
              invites a number to be read off it. */}
          <div
            data-testid={`mandate-lane-${track.id}`}
            style={{
              marginTop: 8,
              width: laneWidth(i, tracks.length),
              height: LANE_HEIGHT,
              background: laneTier(i, tracks.length),
            }}
          />
          <div
            data-testid={`mandate-track-line-${track.id}`}
            style={{ ...definition, marginTop: 10 }}
          >
            {highlight(track.line, track.lineKw)}
          </div>
        </Reveal>
      ))}

      {/* THE BOTTLENECK — full width, under BOTH columns, which is the whole
          geometric claim: it is not a property of one pillar or one track. Three
          lines, three registers, and the split between them is what keeps the
          band honest (see `../content.ts`): a mono eyebrow naming what this is, a
          serif statement in the DECK's words with no quotation marks around it,
          and a mono citation in the BRIEF's words with them. */}
      <Reveal
        on={showBottleneck}
        delay={REVEAL_LEAD_MS}
        data-testid="mandate-bottleneck"
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
          data-testid="mandate-bottleneck-eyebrow"
          style={{ ...mono(11, TIER.bandEyebrow, 0.22), lineHeight: 1.35 }}
        >
          {bottleneck.eyebrow}
        </div>
        <p
          data-testid="mandate-bottleneck-statement"
          style={{
            margin: "6px 0 0",
            fontFamily: "var(--serif)",
            fontSize: 20,
            lineHeight: 1.4,
            color: TIER.bandStatement,
          }}
        >
          {highlight(bottleneck.statement, bottleneck.statementKw)}
        </p>
        <div
          data-testid="mandate-bottleneck-source"
          style={{
            marginTop: 9,
            lineHeight: 1.5,
            ...mono(10.5, TIER.bandSource, 0.02, false),
          }}
        >
          {bottleneck.source}
        </div>
      </Reveal>

      {/* THE CLOSER — the ask, and the sentence that makes the band above it fair
          in a room the brief did not come from. Serif italic, the deck's argument
          register, at a FIXED shelf: it is the line the room leaves with and it
          does not move with how many pillars were authored. */}
      <Reveal
        on={showCloser}
        as="p"
        data-testid="mandate-closer"
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
