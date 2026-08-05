// The Capability Ladder a second time, with the programme's four phases standing
// on it — and, under it, what has to be true to leave each one.
//
// ONE COMPONENT AND NOT TWO, for the reason `CapabilityLadder` is one: the
// staircase and the columns look like two independent figures and are not. The
// chips on the treads and the headers of the columns print THE SAME phase labels,
// four encodings on the staircase are driven by which phases land where
// (`phasesOnRung` in `../content.ts`), and the staircase's baseline is derived
// downward from where the columns start (`../phases-gates-geometry.ts`). Split,
// the one failure this figure is actually at risk of — a bright tread with no
// phase under it, or a phase pointing at a rung the staircase drew as unclaimed —
// would land on the file boundary, where nothing would catch it.
//
// THE ARGUMENT IS IN THE GEOMETRY, and no single string on the stage states it:
// FIVE RUNGS ARE DRAWN AND ONLY THREE ARE LIT. L1 is behind the start line and L5
// is `gap-capability-ladder`'s "declared only when earned", so a leader who reads
// nothing but the shapes still learns that this plan deliberately stops one rung
// short of the top of the ladder it is drawn on. The rung it does reach — L4 — is
// where the fourth column's gate is, which is the same claim said twice in two
// registers.
//
// IT READS NO VARIANT AND NO BRAND. The resolved block arrives as a prop, exactly
// as `CapabilityLadder`'s does, which is what lets one test mount both brands'
// calendars in a single module epoch and compare them (§4.4 slot 6). K.1's figure
// takes no block at all because that slide has no axis; this one does, and
// `../content.ts` argues why the two siblings differ.
//
// CSS VARS ONLY, no hex and no rgba() literals. Rank is a COLOUR TIER — between
// the rungs the plan reaches and the two it does not, and between the three cell
// ROLES in a column — and NEVER opacity, which here means "not revealed yet",
// i.e. time.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and there is no
// `<svg>` on this slide at all, which keeps the whole of
// `src/slides/leader-mandate/` free of one. The staircase is the case worth
// stating: `gap-capability-ladder` draws the identical shape as an SVG `<path>`,
// and it needs to, because its treads draw themselves in under a
// `stroke-dashoffset` sweep. This staircase does not animate and every segment of
// it is axis-aligned, so an
// `<svg>` layer here would hold four straight lines and one open question — the
// `<animate>` somebody adds to a rect next — that the deck has already had to
// answer with a `matchMedia` gate three times elsewhere (`E12LoopAnatomy`,
// `E12MindsetDiptych`, `E9DistractionMotion`). The entire motion budget is
// `.fade`, whose two channels the global `prefers-reduced-motion: reduce` rule at
// the top of `src/styles/globals.css` squashes to 0.01ms, so every pose rests on
// its finished frame under either preference and there is nothing to gate at
// mount.
import type { CSSProperties } from "react";
// Section E's copy, the tree's de facto shared reveal primitive — see
// `./EnablementModel.tsx` for the ledger of who imports which of the three, and
// for why centralising them is a cleanup neither of this section's tickets is.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  BAND_HEIGHT,
  BAND_PADDING_X,
  BAND_PADDING_Y,
  BAND_TOP,
  CALENDAR_ROW_HEIGHT,
  CALENDAR_TOP_IN_COL,
  CHIP_GAP_X,
  CHIP_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  GATE_TOP_IN_COL,
  LADDER_HEADING_TOP,
  PHASES_HEADING_TOP,
  PHASE_COL_HEIGHT,
  PHASE_COL_TOP,
  PHASE_COL_WIDTH,
  RUNG_LABEL_GAP,
  RUNG_LABEL_GUTTER,
  RUNG_LABEL_HEIGHT,
  RUNG_LABEL_INSET,
  SIDE_MARGIN,
  STAIR_THICKNESS,
  chipTop,
  phaseColX,
  riserY,
  rungColumnWidth,
  rungX,
  treadY,
} from "../phases-gates-geometry";
// The three things K.1 and K.2 print identically — the mono register, the band's
// own tiers, and the reveal's lead-in. See that module for what stays local here
// and why.
import { REVEAL_LEAD_MS, SHARED_TIER, mono } from "../type-registers";
import {
  mandatePhasesGatesContent as C,
  phasesOnRung,
  rungOf,
  type PhaseCalendar,
  type PhasesGatesBrandBlock,
} from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and — on the staircase — one pair per role, for the rungs
 * the plan reaches and the two it does not.
 *
 * THE STAIRCASE IS RANKED AND THE COLUMNS ARE NOT, which is the mirror image of
 * K.1 one slide earlier and is the same kind of decision. Four phases are four
 * pieces of work of equal standing — a plan that dimmed P3 would be saying the
 * far end matters less, which is the opposite of what a slide about gates
 * argues — so every column is drawn identically. The RUNGS are ranked, because
 * three of them are on the plan and two are not, and that difference is the only
 * thing the staircase is here to say beyond naming the rungs.
 *
 * TWO TIERS AND NOT AN OPACITY. An unlit rung at 40% would read as a rung the
 * slide had not finished revealing — which on a step-reveal deck is a specific,
 * wrong meaning.
 *
 * SPREAD FROM {@link SHARED_TIER}, WHICH IS THE OTHER HALF OF THE TABLE. The
 * headings, the band and the closer are the same objects K.1 prints one click
 * earlier and are declared once, in `../type-registers.ts`; everything named below
 * belongs to THIS figure and to no other.
 */
const TIER = {
  ...SHARED_TIER,

  /** A tread or riser the plan reaches, and one it does not. */
  stairOn: "var(--copper-400)",
  stairOff: "var(--copper-800)",
  /** A rung name the plan reaches, and one it does not. `--neutral-300` is
   *  gh#50's floor for text on this stage — the unlit rungs sit ON the floor and
   *  never under it, because L1 and L5 are read, not merely present. */
  rungOn: "var(--neutral-50)",
  rungOff: "var(--neutral-300)",
  /** The rung's `L2`, in the copper the ladder itself gives that token — the same
   *  span `CapabilityLadder` wraps `rung.level` in, one section apart. */
  rungLevel: "var(--copper-300)",

  /** A phase chip on its tread: a hairline box, filled, so it reads as standing
   *  ON the step rather than floating over it. */
  chipBorder: "1px solid var(--copper-500)",
  chipBackground: "var(--copper-950)",
  chipLabel: "var(--copper-100)",

  /** The column header's three tokens. The phase label is the loud one — it is
   *  what ties the column to the chip above — and the rung reference beside it is
   *  a pointer, not a claim. */
  phaseLabel: "var(--copper-300)",
  phaseTarget: "var(--neutral-300)",
  /** The organisation's own calendar rows. */
  calendar: "var(--neutral-100)",
  /** The deck's sentence where a roadmap runs out, and every gate line. gh#50's
   *  floor, which is where a definition belongs: quietest, still legible from the
   *  back row. */
  line: "var(--neutral-300)",

  /** The citation inside the band. Same tier as the gates: it is a source, not an
   *  argument. NOT SHARED with K.1's `bandSource` even though the two values
   *  agree — see `../type-registers.ts` on `TIER.line`, which is the same call
   *  about the same colour. */
  bandProvenance: "var(--neutral-300)",
} as const;

// ───────────────────── type registers ─────────────────────
// TWO, for the two things this stage prints: mono for anything the room reads as
// a LABEL, sans for anything it reads as a SENTENCE. The band's statement and the
// closer are the deliberate third case — serif, the deck's argument register —
// and the rung names are the fourth, in `--display`, because a rung name is a
// title and `gap-capability-ladder` sets it in the display serif. Four families,
// each earning its place, and the helpers exist for the two that repeat.
//
// The MONO half is `../type-registers.ts`'s, shared with K.1 because the two rooms
// see the same labels one click apart; the SANS half is this file's, because K.1
// sets its own prose 1px larger in a half-stage column.
//
// Both floors are gh#50's: 9.5px for a mono label, 10.5px for prose, and nothing
// here rests below `--neutral-300`. Neither is enforced from this file — a
// computed font size is not something jsdom has — so the sizes are stated once,
// at the call sites below, where a reviewer can check them against the floor in
// one place.

/** The sans SENTENCE register — the gates, and the line a column prints where a
 *  roadmap runs out. Not mono: a mono sentence under a mono calendar reads as
 *  part of the calendar. */
const sentence: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 12.5,
  lineHeight: 1.35,
  color: TIER.line,
};

/**
 * How far behind the one before it each row arrives.
 *
 * The staircase climbs left to right and the columns read left to right, so both
 * stagger in the SAME direction and by indexes that mean the same thing — a
 * staircase that assembled right-to-left under columns that arrived
 * left-to-right would be two figures disagreeing about which way time runs. The
 * lead-in they are added to is `REVEAL_LEAD_MS`, shared with K.1
 * (`../type-registers.ts`).
 */
const RUNG_STAGGER_MS = 70;
const PHASE_STAGGER_MS = 90;

// ───────────────────── the figure ─────────────────────

export interface PhaseLadderProps {
  /** The brand's resolved block — `phasesGatesFor(VARIANT.brand)`. */
  content: PhasesGatesBrandBlock;
  /** 0…4. See the slide file for what each pose argues. */
  pose: number;
}

export function PhaseLadder({ content, pose }: PhaseLadderProps) {
  const showPhases = pose >= 1;
  const showGates = pose >= 2;
  const showBand = pose >= 3;
  const showCloser = pose >= 4;

  const { rungs, phases } = C;
  const count = rungs.length;
  const columnWidth = rungColumnWidth(count);
  const { band } = content;

  return (
    <>
      <div
        data-testid="mandate-phases-ladder-heading"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: LADDER_HEADING_TOP,
          width: CONTENT_WIDTH,
          ...mono(11, TIER.heading, 0.2),
        }}
      >
        {C.ladderHeading}
      </div>

      {/* THE STAIRCASE. Every rung is drawn from pose 0 — the room reads the
          vocabulary it already knows before anything is placed on it, which is
          the whole reason this band exists and the reason the chips wait for
          pose 1. The RISERS are drawn with the rung they rise out of, so a
          staircase of any length is one map over one array. */}
      {rungs.map((rung, i) => {
        const claimed = phasesOnRung(i).length > 0;
        const tread = treadY(i, count);
        // A riser is part of the CLIMB, so it is lit only when the plan is on
        // BOTH of the rungs it joins. That makes the lit run of the staircase
        // exactly the span the programme covers — L2 up to L4 — and leaves the
        // approach to L2 and the step to L5 as the two dim ends. The top rung
        // has no riser at all, which is what stops the figure from drawing a
        // step out of L5 that no plan on this stage takes.
        const riser = i < count - 1 ? riserY(i, count) : null;
        const riserClaimed = claimed && riser !== null && phasesOnRung(i + 1).length > 0;
        // THE BOX IS THE RUNG'S OWN INK AND NOTHING MORE. A full-height wrapper
        // per rung would be five transparent sheets laid over the stage, and the
        // NavBar's hover band sits under all of them.
        const boxTop = riser ? riser.top : tread;
        const treadInBox = tread - boxTop;
        return (
          <Reveal
            key={rung.id}
            on
            delay={REVEAL_LEAD_MS + i * RUNG_STAGGER_MS}
            data-testid={`mandate-phases-rung-${rung.id}`}
            style={{
              position: "absolute",
              left: rungX(i, count),
              top: boxTop,
              width: columnWidth,
              height: treadInBox + STAIR_THICKNESS + RUNG_LABEL_GAP + RUNG_LABEL_HEIGHT,
            }}
          >
            <div
              data-testid={`mandate-phases-tread-${rung.id}`}
              style={{
                position: "absolute",
                left: 0,
                top: treadInBox,
                width: columnWidth,
                height: STAIR_THICKNESS,
                background: claimed ? TIER.stairOn : TIER.stairOff,
              }}
            />
            {riser && (
              <div
                data-testid={`mandate-phases-riser-${rung.id}`}
                style={{
                  position: "absolute",
                  left: columnWidth - STAIR_THICKNESS,
                  top: 0,
                  width: STAIR_THICKNESS,
                  height: riser.height,
                  background: riserClaimed ? TIER.stairOn : TIER.stairOff,
                }}
              />
            )}
            {/* THE RUNG'S NAME, verbatim from `leader-gap`'s own rung table and
                composed exactly as that slide composes it — a copper `level`, a
                middot, the title. Same string, same shape, one section apart. */}
            <div
              data-testid={`mandate-phases-rung-name-${rung.id}`}
              style={{
                position: "absolute",
                left: RUNG_LABEL_INSET,
                top: treadInBox + STAIR_THICKNESS + RUNG_LABEL_GAP,
                width: columnWidth - RUNG_LABEL_INSET - RUNG_LABEL_GUTTER,
                fontFamily: "var(--display)",
                fontSize: 12.5,
                lineHeight: 1.25,
                color: claimed ? TIER.rungOn : TIER.rungOff,
              }}
            >
              <span style={{ color: TIER.rungLevel }}>{rung.level}</span> · {rung.title}
            </div>
          </Reveal>
        );
      })}

      {/* THE CHIPS — which phases land on which rung. They arrive WITH the
          columns below, at pose 1, because a chip is only meaningful once the
          column it names exists: the label printed here and the label printed at
          the head of a column are the only thing tying the two bands together. */}
      {rungs.map((rung, i) => {
        const landing = phasesOnRung(i);
        if (landing.length === 0) return null;
        return (
          <Reveal
            key={rung.id}
            on={showPhases}
            delay={REVEAL_LEAD_MS + i * RUNG_STAGGER_MS}
            data-testid={`mandate-phases-chips-${rung.id}`}
            style={{
              position: "absolute",
              left: rungX(i, count),
              top: chipTop(i, count),
              width: columnWidth,
              height: CHIP_HEIGHT,
              display: "flex",
              gap: CHIP_GAP_X,
            }}
          >
            {landing.map((phase) => (
              <div
                key={phase.id}
                data-testid={`mandate-phases-chip-${phase.id}`}
                style={{
                  padding: "0 7px",
                  lineHeight: `${CHIP_HEIGHT - 2}px`,
                  border: TIER.chipBorder,
                  background: TIER.chipBackground,
                  ...mono(10, TIER.chipLabel, 0.14),
                }}
              >
                {phase.label}
              </div>
            ))}
          </Reveal>
        );
      })}

      <div
        data-testid="mandate-phases-heading"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: PHASES_HEADING_TOP,
          width: CONTENT_WIDTH,
          ...mono(11, TIER.heading, 0.2),
        }}
      >
        {C.phasesHeading}
      </div>

      {/* THE FOUR COLUMNS. Header and calendar at pose 1, gate at pose 2 — the
          slide's own turn, made in the order a leader makes it: the dates are
          what the room came expecting, and the gate is what actually ends the
          phase. Two poses, not one, because a column that arrived whole would
          land both halves in the same glance and the headline's claim would have
          nothing on the stage to demonstrate it. */}
      {phases.map((phase, i) => {
        const rung = rungOf(phase.rungId);
        const left = phaseColX(i);
        const delay = REVEAL_LEAD_MS + i * PHASE_STAGGER_MS;
        return (
          <div
            key={phase.id}
            data-testid={`mandate-phases-col-${phase.id}`}
            style={{
              position: "absolute",
              left,
              top: PHASE_COL_TOP,
              width: PHASE_COL_WIDTH,
              height: PHASE_COL_HEIGHT,
            }}
          >
            <Reveal
              on={showPhases}
              delay={delay}
              data-testid={`mandate-phases-target-${phase.id}`}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: PHASE_COL_WIDTH,
                ...mono(11, TIER.phaseTarget, 0.18),
                lineHeight: 1.3,
              }}
            >
              {/* THREE TOKENS, ONE SEPARATOR: the phase, the rung it lands on,
                  and what is true of that rung when the phase is over. The middot
                  between all three is deliberate — `P0 · L2 · CLAIMED` reads as
                  three facts, where `P0 · L2 CLAIMED` reads as a rung called "L2
                  CLAIMED", which is precisely the re-labelling this slide must
                  not do. The rung's LEVEL and nothing else: its title is on the
                  staircase, where there is room for it. */}
              <span style={{ color: TIER.phaseLabel }}>{phase.label}</span> · {rung.level} ·{" "}
              {phase.state}
            </Reveal>

            <Reveal
              on={showPhases}
              delay={delay + 60}
              data-testid={`mandate-phases-calendar-${phase.id}`}
              style={{
                position: "absolute",
                left: 0,
                top: CALENDAR_TOP_IN_COL,
                width: PHASE_COL_WIDTH,
              }}
            >
              <Calendar calendar={content.calendars[phase.id]} />
            </Reveal>

            <Reveal
              on={showGates}
              delay={delay}
              data-testid={`mandate-phases-gate-${phase.id}`}
              style={{
                position: "absolute",
                left: 0,
                top: GATE_TOP_IN_COL,
                width: PHASE_COL_WIDTH,
                ...sentence,
              }}
            >
              {highlight(phase.gate, phase.gateKw)}
            </Reveal>
          </div>
        );
      })}

      {/* THE BAND — full width, under all four columns, which is the geometric
          claim: the organisation's own roadmap is a property of the whole plan
          and not of one phase. Three lines, three registers, and the split
          between them is what keeps the band honest (see `../content.ts`): a mono
          eyebrow naming what this is, a serif statement in the DECK's words with
          no quotation marks, and a mono citation in the ORGANISATION's words with
          them. The same three-line band K.1 prints one slide earlier. */}
      <Reveal
        on={showBand}
        delay={REVEAL_LEAD_MS}
        data-testid="mandate-phases-band"
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
          data-testid="mandate-phases-band-eyebrow"
          style={{ ...mono(11, TIER.bandEyebrow, 0.22), lineHeight: 1.35 }}
        >
          {band.eyebrow}
        </div>
        <p
          data-testid="mandate-phases-band-statement"
          style={{
            margin: "6px 0 0",
            fontFamily: "var(--serif)",
            fontSize: 19,
            lineHeight: 1.4,
            color: TIER.bandStatement,
          }}
        >
          {highlight(band.statement, band.statementKw)}
        </p>
        <div
          data-testid="mandate-phases-band-provenance"
          style={{ marginTop: 8, lineHeight: 1.5, ...mono(10.5, TIER.bandProvenance, 0.02, false) }}
        >
          {band.provenance}
        </div>
      </Reveal>

      {/* THE CLOSER — the ask. Serif italic, the deck's argument register, on the
          shelf K.1's closer stands on (`../phases-gates-geometry.ts`): the two
          slides are adjacent and the ask does not move between two clicks. */}
      <Reveal
        on={showCloser}
        as="p"
        data-testid="mandate-phases-closer"
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
        {highlight(content.closer, content.closerKw)}
      </Reveal>
    </>
  );
}

/**
 * One column's calendar slot — the organisation's own rows, or the deck's
 * sentence where the roadmap runs out.
 *
 * THE TWO ARMS RENDER IN DIFFERENT REGISTERS ON PURPOSE (see `PhaseCalendar` in
 * `../content.ts`): mono uppercase for dates and programme names somebody else
 * published, sans prose for the deck's own statement about their absence. A
 * shared register would make the second read as a date that failed to load.
 */
function Calendar({ calendar }: { calendar: PhaseCalendar }) {
  if (calendar.kind === "ours") {
    return <div style={sentence}>{highlight(C.beyondRoadmap, C.beyondRoadmapKw)}</div>;
  }
  return (
    <>
      {calendar.rows.map((row) => (
        <div key={row} style={{ ...mono(10, TIER.calendar, 0.06), lineHeight: `${CALENDAR_ROW_HEIGHT}px` }}>
          {row}
        </div>
      ))}
    </>
  );
}
