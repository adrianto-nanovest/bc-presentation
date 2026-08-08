// Three dated failures on a ledger, and the one line that owns them.
//
// THE FIGURE IS A RECORD KEPT IN ORDER. A vertical hairline runs the height of the three
// entries; each entry's period label is right-aligned to its LEFT, a small filled mark
// sits ON the spine at the entry's title shelf, and the title, what we did and what it
// cost stack to its RIGHT. That image belongs to this slide alone in this run: the two
// figures in front of it are horizontal — `./HardestPartBeats.tsx` draws a split bar cut
// from a quoted statistic, `./NoSopBeats.tsx` a lopsided diptych with four empty rules —
// and a third horizontal figure in three consecutive slides is how a run starts reading
// as one long slide. `../three-failures-geometry.ts` carries the arithmetic and the
// reason the spine is drawn full height from the first pose.
//
// IT READS NO VARIANT AND NO BRAND, like `./NoSopBeats.tsx` and `./HardestPartBeats.tsx`
// next door and unlike `./CapabilityLadder.tsx`: this slide has no brand axis at all, so
// there is no `…For(brand)` prop to look for. `../content.ts` argues it; the short form
// is that these failures are Nanovest's own, and they are the same three admissions in a
// Berau room and in a GEMS room because the organisation that made them is the one
// presenting.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the two graphic tiers, the
// spine and the three marks.
//
// RANK IS A COLOUR TIER BETWEEN ROLES — see {@link TIER} — and opacity means "not
// revealed yet", i.e. TIME, never rank. The case worth stating here is the SPINE AND THE
// MARKS: the marks are drawn a full tier brighter than the spine they sit on, because
// what was recorded outranks the frame that holds it, and neither is ever faded to say
// so. Every entry is drawn at exactly the tiers of every other entry — a ledger that
// ranked its own entries would be arguing that one of the three matters less, which is a
// claim this slide does not make and the slide behind it (§6.4) does not need.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION exactly as `./NoSopBeats.tsx`, `./HardestPartBeats.tsx`,
// `leader-invest/components/SubscriptionBeats.tsx` and
// `leader-mandate/components/EnablementModel.tsx` close it: THIS FIGURE MOUNTS NO `<svg>`
// AT ALL, so there is no `<animate>`, `<animateTransform>`, `<animateMotion>` or `<set>`
// to gate at mount and the reduced-motion census is 0 with nothing to inspect. The spine
// and the three marks are plain boxes for exactly that reason — an SVG `<line>` would
// have bought nothing and would have re-opened a question the deck answers with a
// `matchMedia` gate three times elsewhere (`E12LoopAnatomy`, `E12MindsetDiptych`,
// `E9DistractionMotion`). The entire motion budget here is `.fade`'s transition pair plus
// `.copper-rule`'s `scaleX`, and the global `prefers-reduced-motion: reduce` rule in
// `src/styles/globals.css` squashes both to 0.01ms — so every pose rests on its finished
// frame under either preference. NO NEW KEYFRAME, NO NEW CLASS, NO NEW FONT.
import type { CSSProperties } from "react";
// Section E's copy, the tree's de facto shared reveal primitive. The census of its
// importers is kept by `leader-mandate/components/EnablementModel.tsx` and
// `leader-invest/components/SubscriptionBeats.tsx`; this file moves that count again and
// so does not re-quote it. `CopperRule` comes from the same file for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  COST_HEIGHT,
  DID_HEIGHT,
  ENTRY_LEFT,
  ENTRY_WIDTH,
  LEDGER_EYEBROW_TOP,
  MARK_HEIGHT,
  MARK_LEFT,
  MARK_WIDTH,
  MONO_ROW_HEIGHT,
  RAIL_LEFT,
  RAIL_WIDTH,
  RULE_TOP,
  SIDE_MARGIN,
  SPINE_HEIGHT,
  SPINE_LEFT,
  SPINE_TOP,
  SPINE_WIDTH,
  costTop,
  didTop,
  entryTop,
  markTop,
} from "../three-failures-geometry";
import { gapThreeFailuresContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. Hand-derived WCAG relative luminances over
 * `src/styles/globals.css`'s hexes, brightest first, under the headline's `--neutral-50`
 * (0.9131):
 *
 *   role        token           luminance   register
 *   verdict     --neutral-100    0.7835     22px serif — the closer
 *   did         --neutral-200    0.6584     15px serif — what we did
 *   cost        --neutral-300    0.3663     15px serif — what it cost
 *   label       --copper-400     0.2967     11px mono caps — eyebrow, periods, titles
 *   mark        --copper-500     0.2168     the filled mark on the spine
 *   spine       --copper-700     0.0865     the ledger's vertical hairline
 *
 * NO COPPER TEXT ON THIS STAGE AT ALL, and that is the epistemics drawn in colour — the
 * rule `leader-invest/components/SubscriptionBeats.tsx` records and both sibling gap
 * figures inherit: copper text means A THING QUOTED FROM SOMEWHERE ELSE, and the neutral
 * tiers are the deck's own voice. THIS SLIDE QUOTES NOTHING AND CITES NOBODY — it is the
 * only stage in the section whose entire content is the presenter's own record — so every
 * word here is neutral, and the only copper is the mono labels and the two graphic tiers.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO LABELS is the shipped precedent all
 * three sibling leader figures cite — exactly this token in exactly this register, 11px
 * mono caps — and it is precedent, not a documented exemption. THE THREE PERIODS AND THE
 * THREE TITLES SHARE IT with the eyebrow: they are one register in three measures, and
 * ranking a title over its own date would be a claim the ledger already makes by
 * position.
 *
 * `did` OVER `cost`, WHICH IS THE ONE RANK INSIDE AN ENTRY AND IS DELIBERATE. The
 * admission is what the room has to accept; the consequence follows from it. A brighter
 * cost would put the weight on the damage, which is the register of a post-mortem — this
 * stage is a confession, and what it confesses is the decision. Both are far above the
 * mono labels, so the two prose lines still read as the entry and the labels as its
 * index.
 *
 * THE TWO GRAPHIC TIERS ARE NOT HELD TO THE TEXT FLOOR, for the reason
 * `./NoSopBeats.tsx`'s marks and blanks are not: a mark and a hairline are compared, not
 * read. `--copper-700` is `.copper-rule`'s own token — the hairline the whole deck
 * already draws at this weight on this surface — so the spine is legible at projection
 * distance without inventing a tint, and `--copper-500` above it makes each mark
 * unmistakably the brighter of the two. THAT ORDER IS THE IMAGE: what was recorded is
 * drawn brighter than the frame that holds it.
 */
const TIER = {
  /** Every mono caps row: the ledger's eyebrow, the three periods, the three titles. */
  label: "var(--copper-400)",
  /** The filled mark on the spine at each entry's shelf. The brand copper. */
  mark: "var(--copper-500)",
  /** The ledger's vertical hairline — the deck's own rule token. */
  spine: "var(--copper-700)",
  /** What we did — the admission. */
  did: "var(--neutral-200)",
  /** What it cost — the consequence, one tier down. */
  cost: "var(--neutral-300)",
  /** The closer. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono LABEL register. Uppercase, because every mono label on this stage is either
 *  a heading or an entry name — this slide quotes nothing, so it needs none of the
 *  two-case helper its siblings ship for citations. */
function mono(color: string): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    lineHeight: 1.3,
    color,
  };
}

/** The prose register — the two lines of every entry and the closer. Upright serif; the
 *  only italics on this stage are the keywords `highlight()` places, and the eight label
 *  strings get none of those (`../content.ts`'s keyword rule). */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    margin: 0,
  };
}

/** The size both entry rows take: 15px. One register for the pair — they are one record
 *  entry read top to bottom, and the tier between them is the only rank they carry. */
const ENTRY_FONT_SIZE = 15;

// ───────────────────── the stagger ─────────────────────

/**
 * 120ms of lead-in, 90ms between boxes — the leader tree's two numbers, taken from
 * `leader-mandate/type-registers.ts` and used unchanged by every leader figure that has a
 * stagger at all. 120 keeps the first box off the same frame as the click.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * ONE ENTRY'S ARRIVAL ORDER, and every entry uses it — the shelf, then what we did, then
 * what it cost.
 *
 * THE SHELF IS ONE STEP, NOT THREE. The period, the mark on the spine and the title are
 * the same beat: a date with no name is a stray label, a name with no date is not a
 * record, and a mark on a hairline with nothing beside it is a smudge. Staggering them
 * would put three fragments of one line on the stage in sequence.
 *
 * AND THE POSE ENDS ON THE COST, ALWAYS. A pose resting on "what we did" with no
 * consequence beside it is a boast — "we put five tools in front of the team" and "we
 * were proud of how fast we delivered" are sentences a room can hear as competence right
 * up until the next line lands. Nothing on this stage lets a presenter stop there.
 */
const ENTRY_STEP = {
  shelf: 0,
  did: 1,
  cost: 2,
} as const;

/** POSE 3's arrival order — the rule closes the record, then the line that owns it. */
const CLOSE_STEP = {
  rule: 0,
  closer: 1,
} as const;

// ───────────────────── the figure ─────────────────────

export interface ThreeFailuresBeatsProps {
  /** 0…3. See `../gap-three-failures.tsx` for what each pose argues. */
  pose: number;
}

export function ThreeFailuresBeats({ pose }: ThreeFailuresBeatsProps) {
  // ONE GATE PER ENTRY, and they are `>=` and not `===` for the reason every step-reveal
  // slide in the deck is: a pose is everything argued so far. Entry 0 needs no gate —
  // `pose >= 0` is a check that cannot fail, and this tree deletes those on sight.
  const shown = (index: number) => index === 0 || pose >= index;
  const showClose = pose >= 3;

  return (
    <>
      {/* ───── BAND 1 · THE LEDGER'S FRAME ─────
          The heading and the spine arrive on the opening step together with the first
          entry's shelf: they are one gesture — the record, its margin, and its first
          date. */}
      <Reveal
        on
        delay={delay(0)}
        data-testid="three-failures-ledger-eyebrow"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: LEDGER_EYEBROW_TOP,
          width: CONTENT_WIDTH,
          height: MONO_ROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.ledgerEyebrow}
      </Reveal>

      {/* THE SPINE — a plain box, full height, from pose 0. NOT `CopperRule`: that
          primitive animates `scaleX` from the left, which on a 1px vertical box would
          read as a line being ruled downwards, i.e. as a record still being written.
          This one fades in whole and holds. It is drawn beside ONE entry at pose 0 on
          purpose — see `../three-failures-geometry.ts`: a spine that grew with the
          entries would be a progress bar, and a room counting how many admissions are
          left has stopped listening to the one on the stage. */}
      <Reveal
        on
        delay={delay(ENTRY_STEP.shelf)}
        data-testid="three-failures-spine"
        style={{
          position: "absolute",
          left: SPINE_LEFT,
          top: SPINE_TOP,
          width: SPINE_WIDTH,
          height: SPINE_HEIGHT,
          background: TIER.spine,
        }}
      />

      {/* ───── BAND 1 · THE THREE ENTRIES ─────
          Five boxes each, three steps, one pose per entry. Mapped over the tuple rather
          than written out, so the ledger cannot fall out of order with `../content.ts`. */}
      {C.failures.map((failure, i) => (
        <Reveal
          key={`${failure.id}-period`}
          on={shown(i)}
          delay={delay(ENTRY_STEP.shelf)}
          data-testid={`three-failures-period-${failure.id}`}
          style={{
            position: "absolute",
            left: RAIL_LEFT,
            top: entryTop(i),
            width: RAIL_WIDTH,
            height: MONO_ROW_HEIGHT,
            ...mono(TIER.label),
            textAlign: "right",
            whiteSpace: "nowrap",
          }}
        >
          {failure.period}
        </Reveal>
      ))}

      {C.failures.map((failure, i) => (
        <Reveal
          key={`${failure.id}-mark`}
          on={shown(i)}
          delay={delay(ENTRY_STEP.shelf)}
          data-testid={`three-failures-mark-${failure.id}`}
          style={{
            position: "absolute",
            left: MARK_LEFT,
            top: markTop(i),
            width: MARK_WIDTH,
            height: MARK_HEIGHT,
            background: TIER.mark,
          }}
        />
      ))}

      {C.failures.map((failure, i) => (
        <Reveal
          key={`${failure.id}-title`}
          on={shown(i)}
          delay={delay(ENTRY_STEP.shelf)}
          data-testid={`three-failures-title-${failure.id}`}
          style={{
            position: "absolute",
            left: ENTRY_LEFT,
            top: entryTop(i),
            width: ENTRY_WIDTH,
            height: MONO_ROW_HEIGHT,
            ...mono(TIER.label),
            whiteSpace: "nowrap",
          }}
        >
          {failure.title}
        </Reveal>
      ))}

      {C.failures.map((failure, i) => (
        <Reveal
          key={`${failure.id}-did`}
          as="p"
          on={shown(i)}
          delay={delay(ENTRY_STEP.did)}
          data-testid={`three-failures-did-${failure.id}`}
          style={{
            position: "absolute",
            left: ENTRY_LEFT,
            top: didTop(i),
            width: ENTRY_WIDTH,
            height: DID_HEIGHT,
            ...prose(ENTRY_FONT_SIZE, TIER.did),
          }}
        >
          {highlight(failure.did, failure.didKw)}
        </Reveal>
      ))}

      {C.failures.map((failure, i) => (
        <Reveal
          key={`${failure.id}-cost`}
          as="p"
          on={shown(i)}
          delay={delay(ENTRY_STEP.cost)}
          data-testid={`three-failures-cost-${failure.id}`}
          style={{
            position: "absolute",
            left: ENTRY_LEFT,
            top: costTop(i),
            width: ENTRY_WIDTH,
            height: COST_HEIGHT,
            ...prose(ENTRY_FONT_SIZE, TIER.cost),
          }}
        >
          {highlight(failure.cost, failure.costKw)}
        </Reveal>
      ))}

      {/* THE RULE THAT CLOSES THE RECORD — full width, because it divides the SLIDE:
          above it three entries, below it the one sentence that owns them. A `div` with
          the deck's own `.copper-rule` `scaleX`; a `<line>` would be the first `<svg>` on
          the slide. The testid sits on a positioned WRAPPER because `CopperRule` spreads
          no `data-*` props. */}
      <div
        data-testid="three-failures-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showClose} delay={delay(CLOSE_STEP.rule)} width="100%" />
      </div>

      {/* ───── BAND 2 · THE CLOSER — THE SLIDE'S LAST ARRIVAL ─────
          Full width, alone in its band, and the only line here addressed to the room
          rather than to the record. It is also the only first-person-singular sentence on
          the stage: three admissions with nobody's name behind them is a page that
          travels badly, which is why `../gap-three-failures.tsx` exports this pose. */}
      <Reveal
        on={showClose}
        as="p"
        delay={delay(CLOSE_STEP.closer)}
        data-testid="three-failures-closer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CLOSER_TOP,
          width: CONTENT_WIDTH,
          height: CLOSER_HEIGHT,
          ...prose(22, TIER.verdict),
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
