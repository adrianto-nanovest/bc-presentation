// What individual subscriptions withhold, what managed seats add, and the arithmetic a
// Div Head runs for their own division — three beats over a three-column grid, split by
// one copper rule.
//
// THE UPPER GRID IS BEATS 1 AND 2 SIDE BY SIDE, which is why there is one: four gaps
// against four capabilities is a COMPARISON, and the same eight facts stacked would
// read as one list with a mood swing in the middle. `../subscription-geometry.ts` owns
// the grid and every coordinate below, and it welds the two counts to one constant
// (`GAP_COUNT`) so the ledger cannot grow a hole. The third column is beat 2's payoff —
// the November post-assessment tie — because a capability list ends on a feature and
// the beat has to end on what the feature buys.
//
// ABOVE THE RULE IS WHAT THE SEATS ARE, BELOW IT IS WHAT THEY COST — and the lower
// stage is the one §12.2 audits: every price string arrives from `../content.ts` with
// its currency, billing period and date-read already in it, and this file NEVER
// composes, splits or reformats one. A component that assembled "USD" + "20" + a date
// would be the component that drops the date for space.
//
// IT READS NO VARIANT AND NO BRAND: the resolved anchor arrives as a prop, exactly as
// `./SecurityBeats.tsx` takes its callback — which is what lets one test render both
// brands' anchors in a single module epoch and prove the Berau prize never reaches a
// GEMS room (§4.4 slot 7), the sharpest failure this slide has.
//
// CSS vars only, NO HEX AND NO rgba() LITERALS. Rank is a COLOUR TIER between ROLES —
// see {@link TIER} — and opacity means "not revealed yet", i.e. TIME, not rank.
// Nothing on this stage is ranked by being dimmer than its neighbour.
//
// ZERO SMIL NODES, at every pose, under any motion preference, and closed BY
// CONSTRUCTION exactly as `./SecurityBeats.tsx` closes it: THIS FIGURE MOUNTS NO
// `<svg>` AT ALL (the NavBar's chevrons inside `.nav-zone` are the stage's, not this
// figure's). The whole motion budget is the shared `.fade` transition pair and
// `.copper-rule`'s `scaleX` transform, and the global `prefers-reduced-motion: reduce`
// rule squashes both durations to 0.01ms — so every pose rests on its finished frame
// under either preference and there is nothing to gate at mount. NO NEW KEYFRAME AND
// NO NEW CLASS.
//
// THE TIER ROWS ARE THE ONE FLEX LAYOUT ON THIS STAGE, and what flexes is the GAP, not
// the strings: each row is a placed 780px box with the tier label left and the price
// right, both `nowrap`, `space-between`. The widths are glyph widths no module here
// knows, so — like `./SecurityBeats.tsx`'s chip row — the failure mode of an over-long
// reword is a horizontal OVERFLOW of a placed box, which a browser check can see,
// rather than a wrap inside a box cut for one line.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive.
// `./ProofLedger.tsx` and `./ChickenEggBeats.tsx` carry a census of its importers and
// `./SecurityBeats.tsx` already declines to re-quote it; this file is the FOURTH
// importer under this directory and moves that count again, so the numbers are not
// re-quoted here either. A FIFTH copy of the primitive would still be the wrong answer
// to three existing ones. `CopperRule` comes from the same file for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ANALYTICS_HEIGHT,
  ANALYTICS_TOP,
  ANCHOR_LINE_HEIGHT,
  ANCHOR_LINE_TOP,
  ANCHOR_SOURCE_HEIGHT,
  ANCHOR_SOURCE_TOP,
  CAPABILITY_COUNT,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  COL_W,
  CONTENT_TOP,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  FORMULA_HEIGHT,
  FORMULA_TOP,
  LEVER_TOP,
  LIST_ROW_HEIGHT,
  LOWER_TOP,
  RULE_TOP,
  SIDE_MARGIN,
  TIER_COUNT,
  WIDE_W,
  colLeft,
  tierRowTop,
  upperRowTop,
} from "../subscription-geometry";
import { investSubscriptionContent as C, type PriceAnchor } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and NOT one per box. The ladder is `./SecurityBeats.tsx`'s, with
 * the same hand-derived luminances (WCAG relative luminance over
 * `src/styles/globals.css`'s hexes), so the section's slides rank at one scale.
 * Brightest first, under the headline's `--neutral-50` (0.9131):
 *
 *   role         token             luminance   register
 *   verdict      --neutral-100      0.7835     22px serif closer · 22px mono formula
 *   payoff       --neutral-200      0.6584     18px serif — the November tie, the anchor
 *   quotation    --copper-200       0.5917     13px mono — the three price strings
 *   listRow      --neutral-300      0.3663     15px sans — gaps, capabilities, tier
 *                                              labels, the lever line
 *   citation     --neutral-300      0.3663     10.5px mono — the anchor's attribution
 *   eyebrow      --copper-400       0.2966     11px mono caps, five of them
 *
 * THE FORMULA TAKES THE VERDICT TIER AND THE PRICES TAKE COPPER, and the split is this
 * slide's whole epistemics drawn in colour: copper on this stage means A THING QUOTED
 * FROM SOMEWHERE ELSE (three list prices off a vendor's page, dated), and the neutral
 * tiers are the slide's own voice — the formula is the deck's construction, the closer
 * is the deck's ask. Nothing the slide asserts is copper; nothing it quotes is not.
 * The same rule `./SecurityBeats.tsx` records, applied to one register fewer.
 *
 * THE FORMULA AND THE CLOSER SHARE ONE TIER AND ARE SEPARATED BY REGISTER (mono
 * against serif) and by the rule of a whole band between them. They are the two
 * things the room leaves with — the arithmetic and its boundary — and ranking either
 * over the other by colour would be a claim the copy does not make. Same call as
 * D.4's two verdicts.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE EYEBROWS is the same shipped precedent
 * `./SecurityBeats.tsx` cites — exactly this token in exactly this register, 11px
 * mono caps — and it is precedent, not a documented exemption.
 */
const TIER = {
  /** The three price strings — quoted from the vendor's pricing page, dated, and
   *  copper for exactly that reason. `--copper-200` 0.5917, the section's quotation
   *  tier. */
  quotation: "var(--copper-200)",
  /** The four gaps, the four capabilities, the tier labels and the lever line —
   *  every 15px sans row on the stage. `--neutral-300` 0.3663, gh#50's floor, ON it
   *  and not under it. ONE TIER FOR BOTH UPPER LISTS: ranking a gap over the
   *  capability that answers it would be a claim nobody authored. */
  listRow: "var(--neutral-300)",
  /** The anchor's attribution. `--neutral-300` 0.3663 — the quietest legal text
   *  tier, and it does not go below the floor: this string is the one that keeps
   *  the anchor honest. */
  citation: "var(--neutral-300)",
  /** The formula and the closer — the slide's own two takeaways. `--neutral-100`
   *  0.7835, the brightest text under the headline row. */
  verdict: "var(--neutral-100)",
  /** The November tie and the brand anchor's line — 18px serif descriptions, one
   *  tier under the takeaways for `./SecurityBeats.tsx`'s callback reason: they
   *  describe, the verdict tier decides. */
  payoff: "var(--neutral-200)",
  /** All five eyebrows. `--copper-400` 0.2966, the deck-wide mono LABEL tier. */
  eyebrow: "var(--copper-400)",
} as const;

/** The mono LABEL register — same helper, same two exceptions as
 *  `./SecurityBeats.tsx`: a quantity (the formula, the prices) is already typeset as
 *  it should read, and a sentence-length citation in caps is unreadable; both drop
 *  the transform and keep the register. */
function mono(size: number, color: string, ls: number, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/** The sans LABEL register — every 15px row. Cut for one line each; the failure mode
 *  is a wrap, which a rendered line count catches (the tier rows convert theirs to an
 *  overflow instead — see the header). */
const listRowStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 15,
  lineHeight: 1.3,
  color: TIER.listRow,
};

/** The citation register — 10.5px mono at 1.3, matched to the geometry's line-box
 *  arithmetic, above gh#50's 9.5px floor. */
const citationStyle: CSSProperties = {
  ...mono(10.5, TIER.citation, 0.02, false),
  lineHeight: 1.3,
};

/** The prose register — the November tie, the anchor line, the closer. Upright serif;
 *  the only italics on the stage are the keywords `highlight()` places. */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    margin: 0,
  };
}

// ───────────────────── the stagger ─────────────────────

/** The section's two numbers — 120ms of lead-in, 90ms between boxes. A section's
 *  slides reveal at one speed or the section has four. */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 1's ARRIVAL ORDER, as step numbers — the managed column, then the payoff, and
 * the November sentence LAST, derived over {@link CAPABILITY_COUNT} so a fifth
 * capability could not overtake it. A pose that ended on "usage analytics" would end
 * beat 2 on a feature; the last arrival is what the feature buys.
 */
const MANAGED_STEP = {
  eyebrow: 0,
  firstRow: 1,
  analyticsEyebrow: 1 + CAPABILITY_COUNT,
  analyticsLine: 2 + CAPABILITY_COUNT,
} as const;

/**
 * POSE 2's ARRIVAL ORDER — the rule and the eyebrow, the formula, the three priced
 * tiers, and the lever LAST, derived over {@link TIER_COUNT}. The formula lands
 * BEFORE its prices so the table arrives as the formula's input rather than as a
 * price list with a caption; the lever lands last because it is the one action on
 * the band that costs nothing.
 */
const FORMULA_STEP = {
  rule: 0,
  eyebrow: 0,
  formula: 1,
  firstTier: 2,
  lever: 2 + TIER_COUNT,
} as const;

/**
 * POSE 3's ARRIVAL ORDER — the anchor whole (eyebrow, line, attribution), then the
 * closer LAST. The closer is the pose's — and the slide's — last arrival because it
 * is the boundary on everything above it: a reveal that ended on the anchor would
 * end the slide on a price.
 */
const ANCHOR_STEP = {
  eyebrow: 0,
  line: 1,
  source: 2,
  closer: 3,
} as const;

// ───────────────────── the figure ─────────────────────

export interface SubscriptionBeatsProps {
  /** The brand's resolved price anchor — `priceAnchorFor(VARIANT.brand)`. */
  anchor: PriceAnchor;
  /** 0…3. See `../invest-subscription.tsx` for what each pose argues. */
  pose: number;
}

export function SubscriptionBeats({ anchor, pose }: SubscriptionBeatsProps) {
  // Beat 1 needs no gate: it stands from pose 0 and never leaves. The three below are
  // `>=` and not `===` for the reason every step-reveal slide in the deck is — a pose
  // is everything argued so far.
  const showManaged = pose >= 1;
  const showFormula = pose >= 2;
  const showAnchor = pose >= 3;

  return (
    <>
      {/* ───── BEAT 1 · TODAY — INDIVIDUAL SUBSCRIPTIONS ─────
          The eyebrow and four short absences down column 0. They arrive at mount,
          staggered, with `on` hardcoded true — `pose >= 0` is a check that cannot
          fail, and this tree deletes those on sight. */}
      <Reveal
        on
        delay={delay(0)}
        data-testid="subscription-gaps-eyebrow"
        style={{
          position: "absolute",
          left: colLeft(0),
          top: CONTENT_TOP,
          width: COL_W,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.eyebrow, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.gapsEyebrow}
      </Reveal>

      {C.gaps.map((gap, i) => (
        <Reveal
          key={gap.id}
          on
          delay={delay(1 + i)}
          data-testid={`subscription-gap-${gap.id}`}
          style={{
            position: "absolute",
            left: colLeft(0),
            top: upperRowTop(i),
            width: COL_W,
            height: LIST_ROW_HEIGHT,
            ...listRowStyle,
          }}
        >
          {gap.label}
        </Reveal>
      ))}

      {/* ───── BEAT 2 · COMPANY-MANAGED SEATS, AND WHAT THE FOURTH ROW BUYS ─────
          Column 1 answers column 0 row for row in COUNT (the geometry welds the two),
          though §6.7's orders differ on purpose — the spec's own sequence is kept in
          both lists rather than re-sorted into pairs nobody authored. */}
      <Reveal
        on={showManaged}
        delay={delay(MANAGED_STEP.eyebrow)}
        data-testid="subscription-seats-eyebrow"
        style={{
          position: "absolute",
          left: colLeft(1),
          top: CONTENT_TOP,
          width: COL_W,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.eyebrow, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.seatsEyebrow}
      </Reveal>

      {C.capabilities.map((capability, i) => (
        <Reveal
          key={capability.id}
          on={showManaged}
          delay={delay(MANAGED_STEP.firstRow + i)}
          data-testid={`subscription-capability-${capability.id}`}
          style={{
            position: "absolute",
            left: colLeft(1),
            top: upperRowTop(i),
            width: COL_W,
            height: LIST_ROW_HEIGHT,
            ...listRowStyle,
          }}
        >
          {capability.label}
        </Reveal>
      ))}

      {/* THE NOVEMBER TIE — beat 2's payoff and pose 1's last arrival. In the third
          column, on the rows' own shelf: read ACROSS from "usage analytics", not
          under it. */}
      <Reveal
        on={showManaged}
        delay={delay(MANAGED_STEP.analyticsEyebrow)}
        data-testid="subscription-analytics-eyebrow"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: CONTENT_TOP,
          width: COL_W,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.eyebrow, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.analyticsEyebrow}
      </Reveal>

      <Reveal
        on={showManaged}
        as="p"
        delay={delay(MANAGED_STEP.analyticsLine)}
        data-testid="subscription-analytics-line"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: ANALYTICS_TOP,
          width: COL_W,
          height: ANALYTICS_HEIGHT,
          ...prose(18, TIER.payoff),
        }}
      >
        {highlight(C.analyticsLine, C.analyticsLineKw)}
      </Reveal>

      {/* THE RULE THAT CLOSES THE COMPARISON — all three columns, because it divides
          the SLIDE: above it what the seats are, below it what they cost. A `div`
          with a `scaleX` transform from the deck's own `.copper-rule`; a `<line>`
          would be the first `<svg>` on the slide. Testid on a wrapper, for
          `./SecurityBeats.tsx`'s recorded reason: `CopperRule` spreads no `data-*`. */}
      <div
        data-testid="subscription-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showFormula} delay={delay(FORMULA_STEP.rule)} width="100%" />
      </div>

      {/* ───── BEAT 3 · THE ARITHMETIC, RUNNABLE AND NOT ANSWERED ─────
          The formula, then its price input, then the lever. NO BOX ON THIS BAND HOLDS
          A TOTAL — the absence is the AC, and it is `../content.ts`'s to keep and this
          file's not to break. */}
      <Reveal
        on={showFormula}
        delay={delay(FORMULA_STEP.eyebrow)}
        data-testid="subscription-formula-eyebrow"
        style={{
          position: "absolute",
          left: colLeft(0),
          top: LOWER_TOP,
          width: WIDE_W,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.eyebrow, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.formulaEyebrow}
      </Reveal>

      <Reveal
        on={showFormula}
        delay={delay(FORMULA_STEP.formula)}
        data-testid="subscription-formula"
        style={{
          position: "absolute",
          left: colLeft(0),
          top: FORMULA_TOP,
          width: WIDE_W,
          height: FORMULA_HEIGHT,
          // A quantity's tracking, not a label's, and no transform: arithmetic is
          // already typeset as it should read. The VERDICT tier, not copper — the
          // formula is the slide's own construction, and copper here would file the
          // deck's ask with the vendor's quoted prices (see TIER).
          ...mono(22, TIER.verdict, 0.01, false),
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        {C.formula}
      </Reveal>

      {/* THE TIER TABLE — three placed rows, label left and dated price right, the
          gap flexing and the strings never (see the header). The PRICE STRING RENDERS
          WHOLE from `../content.ts`: this file never splits a price from its date. */}
      {C.tiers.map((tier, i) => (
        <Reveal
          key={tier.id}
          on={showFormula}
          delay={delay(FORMULA_STEP.firstTier + i)}
          data-testid={`subscription-tier-${tier.id}`}
          style={{
            position: "absolute",
            left: colLeft(0),
            top: tierRowTop(i),
            width: WIDE_W,
            height: LIST_ROW_HEIGHT,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span style={{ ...listRowStyle, whiteSpace: "nowrap" }}>{tier.tier}</span>
          <span
            data-testid={`subscription-price-${tier.id}`}
            style={{
              ...mono(13, TIER.quotation, 0.01, false),
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            {tier.price}
          </span>
        </Reveal>
      ))}

      {/* THE CHEAPEST LEVER ON THE SLIDE — pose 2's last arrival: the table's own
          footnote, and the one action here that needs no negotiation. */}
      <Reveal
        on={showFormula}
        delay={delay(FORMULA_STEP.lever)}
        data-testid="subscription-lever"
        style={{
          position: "absolute",
          left: colLeft(0),
          top: LEVER_TOP,
          width: WIDE_W,
          height: LIST_ROW_HEIGHT,
          ...listRowStyle,
          whiteSpace: "nowrap",
        }}
      >
        {C.leverLine}
      </Reveal>

      {/* ───── §4.4 SLOT 7 · THE LOCAL ANCHOR, OR ITS STATED ABSENCE ─────
          Column 2, on the formula's own shelf. The `no-organisation` arm prints the
          line and nothing else; the two arms with something to attribute print their
          citation 8px under it — never derived down to the table's floor, for the
          geometry header's reason. */}
      <Reveal
        on={showAnchor}
        delay={delay(ANCHOR_STEP.eyebrow)}
        data-testid="subscription-anchor-eyebrow"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: LOWER_TOP,
          width: COL_W,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.eyebrow, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {anchor.kind === "no-organisation" ? null : anchor.eyebrow}
      </Reveal>

      <Reveal
        on={showAnchor}
        as="p"
        delay={delay(ANCHOR_STEP.line)}
        data-testid="subscription-anchor-line"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: ANCHOR_LINE_TOP,
          width: COL_W,
          height: ANCHOR_LINE_HEIGHT,
          ...prose(18, TIER.payoff),
        }}
      >
        {highlight(anchor.line, anchor.lineKw)}
      </Reveal>

      {anchor.kind !== "no-organisation" && (
        <Reveal
          on={showAnchor}
          delay={delay(ANCHOR_STEP.source)}
          data-testid="subscription-anchor-source"
          style={{
            position: "absolute",
            left: colLeft(2),
            top: ANCHOR_SOURCE_TOP,
            width: COL_W,
            height: ANCHOR_SOURCE_HEIGHT,
            ...citationStyle,
          }}
        >
          {anchor.source}
        </Reveal>
      )}

      {/* ───── THE CLOSER — THE SLIDE'S LAST ARRIVAL ─────
          Full width, alone in its band: the boundary on everything above it, and the
          AC's own required sentence. A canonical pose without it would export a
          procurement page. */}
      <Reveal
        on={showAnchor}
        as="p"
        delay={delay(ANCHOR_STEP.closer)}
        data-testid="subscription-closer"
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
