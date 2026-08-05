// Where the data goes, what your exposure actually is, and where the SOP starts — three
// beats over a three-column grid, split by one copper rule.
//
// THE GRID IS THE FIRST BEAT, WHICH IS WHY THERE IS ONE. §6.7's beat 1 is three
// DESTINATIONS, and three side-by-side columns is what a room reads as a comparison; the
// same three facts stacked as a list would read as an escalation, which is a claim about
// which destination is worst that nobody authored. `../security-geometry.ts` owns the grid
// and every coordinate below, and it welds the column count to the destination count
// (`DESTINATION_COUNT`) so the two cannot drift.
//
// ABOVE THE RULE IS A COMPARISON AND BELOW IT IS AN ARGUMENT, and the rule is the only
// thing on the stage saying so. Beat 1 answers a question the room asked ("where does our
// data go?") and ends in a decision; beats 2 and 3 answer the question the room did not ask
// ("and what is already exposed?") and end in an ask. The rule spans all three columns for
// that reason — the opposite call from `./ChickenEggBeats.tsx`, whose rule is a bill's total
// and must stop at the gutter.
//
// IT READS NO VARIANT AND NO BRAND: the resolved callback arrives as a prop, exactly as
// `./ProofLedger.tsx` takes its block. That is what lets one test render both brands'
// callbacks in a single module epoch, which is the only way to check that neither carries a
// byte of the other's — and on this slide that is the sharpest version of the check in the
// deck, because the failure would be telling a room it runs private GPU servers it does not
// have (§4.4 slot 4).
//
// CSS vars only, NO HEX AND NO rgba() LITERALS. Rank is a COLOUR TIER between ROLES — see
// {@link TIER}, where every ordering claim carries the luminance it was derived at — and
// opacity means "not revealed yet", i.e. TIME, not rank. Nothing on this stage is ranked by
// being dimmer than its neighbour.
//
// ZERO SMIL NODES, at every pose, under any motion preference, and closed BY CONSTRUCTION
// rather than by discipline: THIS FIGURE MOUNTS NO `<svg>` AT ALL. Stated that way and not
// as "no `<svg>` on this slide", because the STAGE has some — the NavBar's chevrons inside
// `.nav-zone`, which are on every slide of every deck and none of them this figure's.
// Outside that band the count is 0, so a SMIL node cannot appear here without an author
// adding a whole element class that is not currently on the stage. The copper rule is the
// deck's own `.copper-rule` — a 1px `div` with a background and a `scaleX` transform — and
// not a `<line>`, and the four domain chips are bordered `span`s and not `<rect>`s. That is
// what keeps the AC a fact about the markup rather than a promise about future edits.
//
// The whole motion budget is the shared `.fade` pair in `src/styles/globals.css` (an
// opacity-and-translate TRANSITION plus the `fadeReveal` KEYFRAME that `.fade.on` adds) and
// `.copper-rule`'s transform; the global `prefers-reduced-motion: reduce` rule squashes
// `animation-duration` AND `transition-duration` to 0.01ms, so every pose rests on its
// finished frame under either preference and there is nothing to gate at mount. NO NEW
// KEYFRAME AND NO NEW CLASS: gh#53 needed one because a `stroke-dashoffset` sweep has no
// resting pair of values to transition between, and nothing here has a stroke.
//
// ONE BOX ON THIS STAGE IS LAID OUT IN FLOW, AND IT IS THE CHIP ROW. Every other box is
// placed against the stage with a declared width, which is the rule
// `../security-geometry.ts`'s `CARD_MEASURE`-shaped argument exists for: an
// absolutely-positioned box with no declared width shrink-wraps against the stage's 1280 and
// lets an over-long reword run past its column with `scrollWidth === clientWidth` the whole
// way. The four chips cannot be placed that way, because their widths are glyph widths and
// no module here knows them. So they sit in a `nowrap` flex row inside a placed box, which
// makes a fifth chip's failure a horizontal OVERFLOW of that box — visible to a browser
// check — instead of a second row of chips inside a box cut for one. The geometry module's
// `DOMAIN_COUNT` records that this is the one list on the slide with no shelf function to
// throw from.
//
// WHAT IS ARITHMETIC HERE AND WHAT IS MEASURED, said once so no number below has to say it
// again. The tier table's luminances are HAND-DERIVED from `src/styles/globals.css`'s own
// hexes by the WCAG relative-luminance formula — a deterministic function of a hex, so
// correct arithmetic cannot be beaten — and they agree to 4 dp with the browser probes
// `./ChickenEggBeats.tsx` and `./ProofLedger.tsx` record for the overlapping tokens. The BOX
// HEIGHTS and every shelf come from `../security-geometry.ts`, which states its own line-box
// arithmetic. THE POSES' DECLARED ENDS ARE `delay + duration` SUMS AND NOT MEASUREMENTS,
// which is why they are not quoted anywhere in this file: `var(--ease)` is a hard ease-out,
// so a box crosses opacity 0.9995 well before its declared end, and a number presented as an
// arrival would be a claim about the easing curve. What each pose's LAST arrival is, and why
// it has to be last, is below.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive. `./ProofLedger.tsx`
// and `./ChickenEggBeats.tsx` both carry a census of its importers; this file is a third
// importer under this directory and moves that count, so the two of them are not re-quoted
// here — a number in three places is a number two of them can be wrong about. A FOURTH copy
// of the primitive under this directory would still be the wrong answer to three existing
// ones. `CopperRule` comes from the same file for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  CALLBACK_HEIGHT,
  CALLBACK_SOURCE_TOP,
  CALLBACK_TOP,
  CITATION_HEIGHT,
  CITATION_HEIGHT_WRAPPED,
  COL_W,
  CONTENT_TOP,
  CONTENT_WIDTH,
  CONTRACT_TOP,
  DOMAINS_HEIGHT,
  DOMAINS_TOP,
  DOMAIN_COUNT,
  EXPOSURE_LINE_HEIGHT,
  EXPOSURE_LINE_TOP,
  EYEBROW_HEIGHT,
  FIGURE_COUNT,
  FIGURE_HEIGHT,
  LABEL_HEIGHT,
  LIST_ROW_HEIGHT,
  LOWER_TOP,
  METRIC_TOP,
  PRICE_SOURCE_TOP,
  PRICE_TOP,
  PROVENANCE_TOP,
  RETROFIT_HEIGHT,
  RETROFIT_TOP,
  RULE_TOP,
  SIDE_MARGIN,
  VERDICT_HEIGHT,
  VERDICT_TOP,
  WIDE_W,
  colLeft,
  exposureRowTop,
} from "../security-geometry";
import { investSecurityContent as C, type OnPremCallback } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and NOT one per box — nine roles, six text tiers, and the ladder
 * descends in the order the argument does.
 *
 * EVERY ORDERING CLAIM BELOW CARRIES A NUMBER, and the number is hand-derived from
 * `src/styles/globals.css`'s hexes by the WCAG relative-luminance formula (see the header
 * for why that is the better of the two available derivations, and for the browser probes it
 * agrees with). The ladder, brightest first:
 *
 *   role         token             luminance   register
 *   (headline)   --neutral-50       0.9131     40px display · `.slide-headline.small`
 *   verdict      --neutral-100      0.7835     22px serif   · BEAT 1's DECISION and BEAT 3's
 *   exposure     --neutral-200      0.6584     22px serif   · BEAT 2
 *   callback     --neutral-200      0.6584     18px serif   · §4.4 slot 4
 *   quotation    --copper-200       0.5917     13px / 22px / 11px mono
 *   listRow      --neutral-300      0.3663     15px sans
 *   citation     --neutral-300      0.3663     10.5px mono
 *   eyebrow      --copper-400       0.2966     11px mono caps
 *   chipBorder   --copper-800       0.0471     1px hairline (not text)
 *   (rule)       --copper-700       0.0866     1px, `.copper-rule`'s own background
 *   (stage)      --neutral-900      0.0030     what all of it is painted on
 *
 * THE HEADLINE IS IN THE TABLE AND NOT IN THIS FILE, for `./ChickenEggBeats.tsx`'s reason:
 * `.slide-headline` prints `--neutral-50` at every pose and outshines everything here, so a
 * table that did not name it could not say what this stage's brightest role is UNDER it.
 *
 * ONE TIER CARRIES TWO ROLES TWICE, AND BOTH ARE DELIBERATE.
 *
 *   · `verdict` IS ONE ROLE USED TWICE, not two roles that happen to agree. This slide
 *     states two conclusions — self-host the sensitive workloads and nothing else (beat 1),
 *     start from the four domains now (beat 3) — one above the rule and one below it, and
 *     ranking either over the other by colour would be an argument neither §6.7 nor the copy
 *     makes. They are separated by the rule, by the pose that reveals them and by their
 *     measure, and not by tier. This is the same call `./ChickenEggBeats.tsx` makes when it
 *     puts the turn level with the workaround.
 *   · `exposure` AND `callback` SHARE `--neutral-200` AND ARE SEPARATED BY SIZE (22 against
 *     18). Both are descriptions of the room rather than decisions for it, which is exactly
 *     one step under a verdict; what makes the exposure the louder of the two is that it is
 *     the beat, and the callback is one column's footnote to beat 1.
 *
 * WHY `quotation` IS ONE ROLE AND NOT THREE. The destination labels, the two figures and the
 * four domain chips are all copper, and the rule that puts them there is the only one on
 * this stage that is about EPISTEMIC STANDING rather than about rank: copper here means A
 * THING QUOTED FROM SOMEWHERE ELSE, and the neutral tiers are the slide's own voice. A
 * destination name is a category out of somebody's terms of service, a figure is a number
 * out of a published index, and a domain is a heading out of a proposal — none of them is
 * this deck's sentence, and all three carry a citation somewhere on the stage. The
 * consequence worth stating: nothing the SLIDE asserts is ever copper, and nothing it quotes
 * ever is not.
 *
 * EVERY TIER CLEARS gh#50's FLOORS EXCEPT ONE, AND THAT ONE HAS PRECEDENT RATHER THAN A
 * RULE. `--neutral-400` (0.1714) and everything under it is out of bounds for text on this
 * stage and no role takes it; `--neutral-300` is the quietest legal text tier and the list
 * rows and the citations rest ON it rather than under it. `--copper-400` (0.2966) is under
 * `--neutral-300` by luminance and the two eyebrows take it anyway.
 *
 * PRECEDENT, NOT A DOCUMENTED EXEMPTION — say it that way round, because nothing in the tree
 * writes a copper exemption down. The floor the deck ENFORCES is the grey list in
 * `scripts/projection-test.mjs`, and it names `--neutral-400` (`rgb(115, 115, 115)`) alone;
 * `--copper-400` is not on it and is not named as an exception anywhere either. What exists
 * is shipped precedent at exactly this token in exactly this register, 11px mono caps:
 * `./ProofLedger.tsx`'s eyebrow, `./ChickenEggBeats.tsx`'s two, and the kicker in
 * `../../leader-shape/components/PillarOrbit.tsx`. The two eyebrows here are the same call,
 * which is a claim about consistency and not about permission.
 *
 * THE KEYWORD TIER ARRIVES THROUGH `KeywordHighlight`, NOT THROUGH `em.kw`.
 * `src/components/KeywordHighlight.tsx` renders `<em className="text-copper-400 …">`, so
 * every copper italic on this stage (five prose boxes' worth, all placed by `highlight()`)
 * is Tailwind's `text-copper-400`. `globals.css`'s `em.kw` rule is NOT that mechanism: it
 * resolves a different token (`--copper-300`, 0.4029) and it is dead CSS — no module under
 * `src/` emits `class="kw"`.
 */
const TIER = {
  /**
   * BEAT 1's three destination labels. Copper, because a destination is a CATEGORY OUT OF
   * SOMEBODY ELSE'S TERMS and not a name this deck coined — see the quotation rule above.
   *
   * `--copper-200` 0.5917, i.e. DARKER than every prose tier on the stage (0.6584 and
   * 0.7835), so beat 1 opens without competing with the sentences that close it. It is the
   * same token `./ProofLedger.tsx` gives its figures and two tiers OVER the keyword italic
   * (`--copper-400` 0.2966), using "over" the way
   * `../../leader-shape/components/PillarOrbit.tsx` does: the lower token number is the
   * brighter one.
   */
  quotation: "var(--copper-200)",
  /**
   * BOTH 15px SANS LISTS — the three contract lines and the three exposure rows.
   * `--neutral-300` 0.3663, which is gh#50's floor for text on this stage, ON it and not
   * under it.
   *
   * ENUMERATIONS ARE SCANNED, PROSE IS READ, and that is the step this tier buys: two tiers
   * under the prose above them so the rows read as evidence rather than as more sentences.
   * ONE TIER FOR BOTH LISTS, because ranking a contract over an exposure — or the other way
   * — would be a claim nobody authored: they are the two halves of one description, what the
   * paper says and what is actually true today.
   */
  listRow: "var(--neutral-300)",
  /**
   * BOTH CITATIONS AND THE PROVENANCE LINE — three strings, one tier. `--neutral-300`
   * 0.3663, the same floor the lists rest on.
   *
   * IT DOES NOT GO BELOW THE FLOOR, and this is the one place on the slide somebody would be
   * tempted to push it: three citations at 10.5px are the quietest thing on the stage
   * already, and dimming them further would make the strings that keep the slide honest the
   * least readable thing in the room. `./ProofLedger.tsx` records the same refusal for the
   * same reason.
   */
  citation: "var(--neutral-300)",
  /**
   * BEAT 1's DECISION AND BEAT 3's — one role, two boxes. `--neutral-100` 0.7835, the
   * brightest tier any text on this stage takes UNDER THE HEADLINE ROW.
   *
   * "ANY TEXT", NOT "ANY BOX". The rule's wrapper, the chip row's container and the two
   * spacer-shaped boxes are textless, so `getComputedStyle` reports the `color` they INHERIT
   * from `body` — `--neutral-50` — while what they paint is a background, a border, or
   * nothing. A colour audit that read `color` off every box would report the headline's tier
   * several times over; the claim here is over the text runs the stage renders below the
   * headline row.
   *
   * WHY THE TWO VERDICTS ARE NOT RANKED AGAINST EACH OTHER is in the table above. What they
   * are ranked against is everything else: one tier over beat 2's description of the room
   * (0.6584) and two over the lists that are evidence for them (0.3663). They are one tier
   * under the headline, which stays the brightest type on the stage on purpose — the
   * headline is the premise the whole slide turns on ("the screen is the same, the contract
   * is not") and these two are what follows from it.
   */
  verdict: "var(--neutral-100)",
  /**
   * BEAT 2's sentence. `--neutral-200` 0.6584 — one tier UNDER the two verdicts,
   * deliberately, and it is the only tier decision on this slide that could be read as
   * demoting the beat §6.7 calls the room's real problem.
   *
   * It is not a demotion, it is a register: beat 2 DESCRIBES and the verdicts DECIDE, and a
   * description printed brighter than the decision it motivates would make the slide a
   * warning. What makes beat 2 unmissable instead is that it owns a pose of its own, that it
   * is the widest prose measure on the stage, and that the three rows under it are the only
   * three-item list below the rule.
   */
  exposure: "var(--neutral-200)",
  /**
   * §4.4 SLOT 4's sentence — what this room already runs, or that it runs none.
   * `--neutral-200` 0.6584, LEVEL WITH BEAT 2 AND UNDER THE VERDICTS, at 18px rather than
   * 22.
   *
   * SIZE IS WHAT SEPARATES IT FROM BEAT 2, not tier: both are statements about the room
   * rather than asks of it, and the callback is one column's answer to beat 1 where beat 2 is
   * a whole beat. It is still prose and still serif, because it is the one sentence on this
   * stage that names the organisation in the chair — a 15px sans line here would file the
   * room's own infrastructure with the category lines it is an exception to.
   */
  callback: "var(--neutral-200)",
  /**
   * Both eyebrows — `YOUR REAL EXPOSURE TODAY` and `WHERE THE SOP STARTS`. `--copper-400`
   * 0.2966, the deck-wide mono LABEL tier.
   *
   * QUIETEST TEXT ON THE STAGE, WHICH IS WHAT AN EYEBROW IS: it names the beat under it and
   * is not part of the argument. Under `--neutral-300` by luminance, and defensible there
   * only because it is EXACTLY this token in exactly this register — see the table above for
   * the precedents, and for why that is precedent and not a rule.
   */
  eyebrow: "var(--copper-400)",
  /**
   * The four domain chips' hairline. `--copper-800` 0.0471 — the token
   * `./ProofLedger.tsx` gives its epistemic chips, and the same reason applies: at chip
   * scale a hairline reads, and these four boxes are about 75–100px wide.
   *
   * NOT `--copper-700` (0.0866), which `./ChickenEggBeats.tsx` gives its 400×228 pilot card
   * and which `.copper-rule` paints. A 1px border that has to read at 400px wide is a
   * different problem from one that has to read at 90px, and this stage has both — the rule
   * above these chips is the brighter of the two on purpose.
   *
   * NOT A TEXT TIER, so gh#50's colour floor does not reach it: no glyph on this stage is
   * set in it.
   */
  chipBorder: "1px solid var(--copper-800)",
} as const;

/**
 * The mono LABEL register — the destination labels, the two figures, the four chips and both
 * eyebrows.
 *
 * `upper` IS A PARAMETER HERE, unlike `./ChickenEggBeats.tsx`'s version of this helper,
 * because this slide has exactly two deliberate exceptions and they are the same two
 * `./ProofLedger.tsx` has: a FIGURE is already typeset as it should read, and the three
 * CITATIONS are sentence-length, which at 90+ characters of uppercase mono is something
 * nobody in the back row reads. Both stay in this register — that is what keeps them reading
 * as labels rather than as prose — and drop the transform.
 *
 * `../content.ts` stores the three destination labels already shouted and the four domain
 * names in title case, and the difference is recorded there: the labels are never quoted in
 * prose and the domains are quoted by §6.7, by the issue's AC and by the research record. So
 * the transform is a no-op on one list and load-bearing on the other, and it is declared
 * either way, because a register with two spellings is how a label ends up title-cased.
 */
function mono(size: number, color: string, ls: number, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/**
 * The sans LABEL register — the three contract lines and the three exposure rows.
 *
 * NOT MONO, for `./ProofLedger.tsx`'s reason: this is where every label-shaped statement in
 * the deck sits, and mono here would make the two lists look like code. NOT `nowrap` either:
 * both boxes are cut for ONE line and the failure mode is a wrap, which a rendered LINE
 * COUNT catches. `nowrap` would convert that into an overflow, and an overflow is the wrong
 * shape of failure for a box whose neighbour below it is 8px away — the line count is what a
 * browser check has to assert here.
 */
const listRowStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 15,
  lineHeight: 1.3,
  color: TIER.listRow,
};

/**
 * The citation register — the price source, the callback's source and beat 3's provenance
 * line.
 *
 * 10.5px, WHICH IS A LIMIT RESPECTED AND NOT A TARGET AIMED AT. gh#50's mono floor is 9.5px
 * and these three strings are the ones that keep the slide honest — where the numbers came
 * from, who published the on-prem claim, and who actually authored the four domains — so
 * they sit above the floor rather than on it, at the size `./ProofLedger.tsx` sets its own
 * attribution at.
 *
 * `lineHeight` 1.3, MATCHED TO THE GEOMETRY. `../security-geometry.ts` cuts
 * `CITATION_HEIGHT` for one 13.65px line box and `CITATION_HEIGHT_WRAPPED` for two, both at
 * this ratio; a different number here would make both boxes wrong at once.
 */
const citationStyle: CSSProperties = {
  ...mono(10.5, TIER.citation, 0.02, false),
  lineHeight: 1.3,
};

/**
 * The prose register — the verdict, beat 2's line, beat 3's line and the brand callback.
 *
 * UPRIGHT SERIF, AND THE ONLY ITALICS ON THE STAGE ARE THE KEYWORDS. Four boxes take this
 * register and every one of them carries a copper italic placed by `highlight()`; nothing
 * else on the stage is italic at all.
 *
 * NOT BECAUSE ITALIC PROSE WOULD HIDE ITS OWN KEYWORD — `./ProofLedger.tsx`'s closer is
 * italic and carries two, which read as keywords on COLOUR alone. The reason is arithmetic,
 * and it is the same one `./ChickenEggBeats.tsx` gives: four of the things this room reads
 * are in this register, so italic here would be the REGISTER rather than the mark, and the
 * copper would be doing all of the work with none of the help.
 *
 * The size and the tier arrive per call, because they are what ranks the four (see
 * {@link TIER}). The line-height does not: every prose box height in
 * `../security-geometry.ts` is cut for a 1.3 line box.
 */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    // `as="p"` for all four — they are sentences, not labels — and the browser's own
    // paragraph margin would push every one of them off the shelf the geometry module cut.
    margin: 0,
  };
}

// ───────────────────── the stagger ─────────────────────

/**
 * How long the first box of a pose waits, and how far behind it the next one lands.
 *
 * THE SAME TWO NUMBERS `./ProofLedger.tsx` AND `./ChickenEggBeats.tsx` USE, and for their
 * reasons: 120ms of lead-in keeps the first arrival off the same frame as the click, and
 * 90ms between boxes makes a list land as something being read rather than as one flash. A
 * section's three slides reveal at the same speed or the section has three speeds.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 0's ARRIVAL ORDER — column by column, label then contract.
 *
 * A DESTINATION ARRIVES WHOLE, which is the only order that reads as a comparison being
 * built. Three labels landing first and three contracts filling in behind them would make
 * the room read a heading row, then a data row — two passes over the same three columns —
 * and the point of beat 1 is that each column is one answer.
 */
const destinationStep = (index: number) => 2 * index;

/**
 * POSE 1's ARRIVAL ORDER, as step numbers — and the verdict's is DERIVED so that it cannot
 * stop being last.
 *
 * The order is the argument: what self-hosting costs, then what it is priced against, then
 * what this room already runs and who says so, and THEN the decision. `source`, `callback`,
 * `callbackSource` and `verdict` are expressions over {@link FIGURE_COUNT} rather than the
 * literals 2…5, so a third figure would push all four DOWN the stagger instead of being
 * overtaken by them — a figure landing after the verdict would put the pose's last arrival
 * back on the evidence. (`../content.ts`'s tuple refuses a third figure and
 * `../security-geometry.ts` pins the count; this is the third refusal, and the only one that
 * is about the reveal rather than about the copy.)
 *
 * WHY THE VERDICT IS IN THIS POSE AND NOT ONE OF ITS OWN. Beat 1 is a comparison whose whole
 * output is one decision, and a pose that ended on the two figures would leave a room
 * looking at two benchmark numbers with no instruction attached — which is the reading §6.7
 * is explicit about avoiding ("self-hosting is right for sensitive workloads and wrong for
 * everything else" is the beat, not the gaps).
 */
const PRICE_STEP = {
  firstFigure: 0,
  source: FIGURE_COUNT,
  callback: 1 + FIGURE_COUNT,
  callbackSource: 2 + FIGURE_COUNT,
  verdict: 3 + FIGURE_COUNT,
} as const;

/**
 * POSE 2's arrival order: the label, the sentence, then the three things nobody can do.
 *
 * The eyebrow arrives FIRST and the rows LAST, so the pose ends on the exposure itself
 * rather than on the claim about it — this is the beat the room is meant to sit with, and its
 * last arrival is the row an auditor would ask about.
 */
const EXPOSURE_STEP = {
  eyebrow: 0,
  line: 1,
  firstRow: 2,
} as const;

/**
 * POSE 3's arrival order: the label, the four domains one at a time, then the failure mode,
 * then who wrote the four.
 *
 * THE FOUR CHIPS ARRIVE SEPARATELY, and that is the one place on this slide where the
 * stagger is doing argumentative work rather than pacing: four chips landing together read
 * as a graphic, and four landing 90ms apart read as a list being written down — which is
 * what the beat is asking the room to do. `retrofit` and `provenance` are expressions over
 * {@link DOMAIN_COUNT} for {@link PRICE_STEP}'s reason: a fifth domain could not overtake
 * the sentence that prices them.
 */
const SOP_STEP = {
  eyebrow: 0,
  firstDomain: 1,
  retrofit: 1 + DOMAIN_COUNT,
  provenance: 2 + DOMAIN_COUNT,
} as const;

// ───────────────────── the figure ─────────────────────

export interface SecurityBeatsProps {
  /** The brand's resolved on-prem callback — `onPremCallbackFor(VARIANT.brand)`. */
  callback: OnPremCallback;
  /** 0…3. See `../invest-security.tsx` for what each pose argues. */
  pose: number;
}

export function SecurityBeats({ callback, pose }: SecurityBeatsProps) {
  // BEAT 1's TABLE needs no gate: it stands from pose 0 and never leaves. The three below
  // are `>=` and not `===` for the reason every step-reveal slide in the deck is — a pose is
  // everything argued so far, so pose 3 still shows the three destinations.
  const showPrice = pose >= 1;
  const showExposure = pose >= 2;
  const showSop = pose >= 3;

  return (
    <>
      {/* ───── BEAT 1 · THE THREE DESTINATIONS ─────
          One column each, and the columns ARE the destinations
          (`../security-geometry.ts`'s `DESTINATION_COUNT` welds the two counts). NO DRAWN
          BOXES AND NO ARROWS BETWEEN THEM: the comparison is in the grid, and drawing it
          would spend an `<svg>` — and with it this slide's zero-SMIL-by-construction
          argument — on saying what three columns already say.

          THEY ARRIVE AT MOUNT, staggered, with `on` hardcoded true rather than gated on
          `pose >= 0`. That comparison is a check that cannot fail, and this tree deletes
          those on sight; what the `Reveal`s are still here for is the entrance, which is
          what keeps the six boxes from being painted in the same frame as the headline. */}
      {C.destinations.map((destination, i) => (
        <div key={destination.id}>
          <Reveal
            on
            delay={delay(destinationStep(i))}
            data-testid={`security-destination-${destination.id}`}
            style={{
              position: "absolute",
              left: colLeft(i),
              top: CONTENT_TOP,
              width: COL_W,
              height: LABEL_HEIGHT,
              ...mono(13, TIER.quotation, 0.16),
              lineHeight: 1.3,
              // A LABEL MAY NOT WRAP, and this is the half of that rule the renderer owns.
              // The box is cut for exactly one line, so a second line would land in the 8px
              // that binds the label to its own contract line. `nowrap` makes the failure an
              // OVERFLOW instead of a wrap, which is what puts it in reach of a
              // `scrollWidth` vs `clientWidth` check; the sans lines below wrap on purpose
              // and are caught by a rendered line count instead. gh#56's defect injection is
              // why both channels exist: each one is blind to the other's failure.
              whiteSpace: "nowrap",
            }}
          >
            {destination.label}
          </Reveal>
          <Reveal
            on
            delay={delay(destinationStep(i) + 1)}
            data-testid={`security-contract-${destination.id}`}
            style={{
              position: "absolute",
              left: colLeft(i),
              top: CONTRACT_TOP,
              width: COL_W,
              height: LIST_ROW_HEIGHT,
              ...listRowStyle,
            }}
          >
            {destination.contract}
          </Reveal>
        </div>
      ))}

      {/* ───── BEAT 1 · WHAT THE THIRD DESTINATION COSTS ─────
          B.4's two gaps, re-quoted rather than re-derived (`../content.ts`), one per column
          in the two columns beat 1's own third destination does not occupy. The figure sits
          OVER its metric rather than beside it, which is the one place this slide
          deliberately does not look like `./ProofLedger.tsx`: that slide's rows are a ledger
          of unrelated quantities and want a shared baseline down a column, and these two are
          one comparison read across the stage. */}
      {C.priceFigures.map((figure, i) => (
        <div key={figure.id}>
          <Reveal
            on={showPrice}
            delay={delay(PRICE_STEP.firstFigure + i)}
            data-testid={`security-figure-${figure.id}`}
            style={{
              position: "absolute",
              left: colLeft(i),
              top: PRICE_TOP,
              width: COL_W,
              height: FIGURE_HEIGHT,
              // Tracking at 0.01em, not the label register's 0.16: this is a quantity, and
              // tracked-out digits read as a serial number. `upper` is off because a figure
              // is already typeset as it should read.
              ...mono(22, TIER.quotation, 0.01, false),
              lineHeight: 1.1,
              whiteSpace: "nowrap",
            }}
          >
            {figure.figure}
          </Reveal>
          <Reveal
            on={showPrice}
            delay={delay(PRICE_STEP.firstFigure + i)}
            data-testid={`security-metric-${figure.id}`}
            style={{
              position: "absolute",
              left: colLeft(i),
              top: METRIC_TOP,
              width: COL_W,
              height: LIST_ROW_HEIGHT,
              ...listRowStyle,
            }}
          >
            {figure.metric}
          </Reveal>
        </div>
      ))}

      {/* THE FIGURES' PROVENANCE, and it carries the LICENCE TIER as well as the source and
          the date — see `../content.ts` for why all four facts are in one string and why
          this slide may not mix tiers with B.4. It spans two columns because a 376px measure
          would wrap it to three lines inside a box cut for one. */}
      <Reveal
        on={showPrice}
        delay={delay(PRICE_STEP.source)}
        data-testid="security-price-source"
        style={{
          position: "absolute",
          left: colLeft(0),
          top: PRICE_SOURCE_TOP,
          width: WIDE_W,
          height: CITATION_HEIGHT,
          ...citationStyle,
        }}
      >
        {C.priceSource}
      </Reveal>

      {/* ───── BEAT 1 · §4.4 SLOT 4 · WHAT THIS ROOM ALREADY RUNS ─────
          In the SELF-HOSTED column, on the figures' own shelf, because that is the
          destination it is about. The box is cut for two lines under every brand
          (`../security-geometry.ts`'s `CALLBACK_HEIGHT` says why that matters): one brand
          runs it, one runs none of it, and the space is the same either way, so the verdict
          below lands on one shelf in both rooms.

          THE ABSENCE IS COPY. `../content.ts`'s `runs-none` arm carries a real sentence, per
          #16's finding 4 — a blank column here would read on a projector as a slide that
          failed to load, and the absence is itself what a division head needs to know. */}
      <Reveal
        on={showPrice}
        as="p"
        delay={delay(PRICE_STEP.callback)}
        data-testid="security-callback"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: CALLBACK_TOP,
          width: COL_W,
          height: CALLBACK_HEIGHT,
          ...prose(18, TIER.callback),
        }}
      >
        {highlight(callback.line, callback.lineKw)}
      </Reveal>

      {/* THE CITATION, AND ONLY WHERE THERE IS SOMETHING TO CITE. The `runs-none` arm has no
          `source` field to render, so a deck that states an absence prints no element here
          rather than an empty one — the same decision `./ProofLedger.tsx` makes for its
          eyebrow, and the reason `OnPremCallback` is a union instead of one interface with an
          optional field. */}
      {callback.kind === "runs-it" && (
        <Reveal
          on={showPrice}
          delay={delay(PRICE_STEP.callbackSource)}
          data-testid="security-callback-source"
          style={{
            position: "absolute",
            left: colLeft(2),
            top: CALLBACK_SOURCE_TOP,
            width: COL_W,
            height: CITATION_HEIGHT_WRAPPED,
            ...citationStyle,
          }}
        >
          {callback.source}
        </Reveal>
      )}

      {/* ───── BEAT 1 · THE DECISION ─────
          Full width, alone in its band, and the LAST thing to arrive in its pose — which is
          the half of "the conclusion is stated" that lives in the reveal order rather than
          in the copy. Both halves of the trade carry a keyword, because a verdict that
          emphasised only "right for the sensitive workloads" would send a division head off
          to price hardware for everything (`../content.ts`). */}
      <Reveal
        on={showPrice}
        as="p"
        delay={delay(PRICE_STEP.verdict)}
        data-testid="security-verdict"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: VERDICT_TOP,
          width: CONTENT_WIDTH,
          height: VERDICT_HEIGHT,
          ...prose(22, TIER.verdict),
        }}
      >
        {highlight(C.verdict, C.verdictKw)}
      </Reveal>

      {/* THE RULE THAT CLOSES BEAT 1 — and it spans all three columns, which is the opposite
          call from `./ChickenEggBeats.tsx`'s. That one is a bill's total rule and has to stop
          at its own column's gutter; this one divides the SLIDE, because everything under it
          is what beat 1's answer does not cover.

          A `div` with a background and a `scaleX` transform, from the deck's own
          `.copper-rule`. A `<line>` here would be the first `<svg>` on the slide and would
          turn the zero-SMIL property from a construction into a promise.

          THE TESTID IS ON A WRAPPER, and that is deliberate rather than lazy: `CopperRule`
          spreads no `data-*` props, and widening a primitive this many modules reference to
          give one slide a hook is a change with a blast radius this ticket has no business
          having. The wrapper is the geometric box the geometry module places; the reveal
          itself is the transform on the `.copper-rule` inside it, which is where a check has
          to read it from. */}
      <div
        data-testid="security-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showPrice} delay={delay(PRICE_STEP.verdict)} width="100%" />
      </div>

      {/* ───── BEAT 2 · THE EXPOSURE THE ROOM ALREADY HAS ─────
          Two columns of the grid, because it is the widest prose measure below the rule and
          because beat 3 needs the third. Present tense, second person, and NOT ONE DIGIT in
          any of the four strings — which is how §6.2's "no shared statistic" is held as an
          ABSENCE rather than as a list of forbidden values (`../content.ts`). */}
      <Reveal
        on={showExposure}
        delay={delay(EXPOSURE_STEP.eyebrow)}
        data-testid="security-exposure-eyebrow"
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
        {C.exposureEyebrow}
      </Reveal>

      <Reveal
        on={showExposure}
        as="p"
        delay={delay(EXPOSURE_STEP.line)}
        data-testid="security-exposure-line"
        style={{
          position: "absolute",
          left: colLeft(0),
          top: EXPOSURE_LINE_TOP,
          width: WIDE_W,
          height: EXPOSURE_LINE_HEIGHT,
          ...prose(22, TIER.exposure),
        }}
      >
        {highlight(C.exposureLine, C.exposureLineKw)}
      </Reveal>

      {/* THE THREE THINGS NOBODY CAN DO — §6.7's order (audit, revoke, produce), which is an
          escalation of who is asking: you, then HR on the day somebody leaves, then an
          outside party entitled to an answer. Keyed on the content `id` so a reorder of the
          copy moves the hooks with it and a test naming `security-exposure-cannot-revoke`
          cannot silently start measuring a different row. `exposureRowTop` throws on a
          fourth. */}
      {C.exposures.map((exposure, i) => (
        <Reveal
          key={exposure.id}
          on={showExposure}
          delay={delay(EXPOSURE_STEP.firstRow + i)}
          data-testid={`security-exposure-${exposure.id}`}
          style={{
            position: "absolute",
            left: colLeft(0),
            top: exposureRowTop(i),
            width: WIDE_W,
            height: LIST_ROW_HEIGHT,
            ...listRowStyle,
          }}
        >
          {exposure.label}
        </Reveal>
      ))}

      {/* ───── BEAT 3 · WHERE THE SOP STARTS ─────
          The third column, and the only part of the stage that is an ASK. */}
      <Reveal
        on={showSop}
        delay={delay(SOP_STEP.eyebrow)}
        data-testid="security-sop-eyebrow"
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
        {C.sopEyebrow}
      </Reveal>

      {/* THE FOUR DOMAINS, AS FOUR CHIPS — the one box on this stage laid out in FLOW, and
          the header says why that is unavoidable and what it costs. Four bordered spans and
          not four `<rect>`s, which is what keeps the zero-SMIL property a construction.

          FOUR CHIPS AND NOT ONE MIDDOT-SEPARATED LINE, which was the cheaper layout. A
          single line puts the four domains at the mercy of one wrap point — and a set of
          four governance headings that breaks after "GOVERNANCE ·" reads as three headings
          and an orphan. Four boxes wrap or overflow individually and visibly.

          THE CONTAINER IS NOT A `Reveal`: the chips are, one each, so the four land 90ms
          apart. An always-mounted container that paints nothing is what lets that happen
          without a wrapper per chip. */}
      <div
        data-testid="security-domains"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: DOMAINS_TOP,
          width: COL_W,
          height: DOMAINS_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {C.domains.map((domain, i) => (
          <Reveal
            key={domain.id}
            on={showSop}
            as="span"
            delay={delay(SOP_STEP.firstDomain + i)}
            data-testid={`security-domain-${domain.id}`}
            style={{
              border: TIER.chipBorder,
              padding: "4px 8px",
              // The chip never wraps, and this is the only channel available: the row is a
              // flex line, so a wrapped chip would grow the row's height rather than
              // overflow its width. `nowrap` on the chip plus a fixed row height turns a
              // fifth chip — or a longer domain name — into a horizontal overflow of the
              // container, which is what a browser check can see.
              whiteSpace: "nowrap",
              ...mono(11, TIER.quotation, 0.14),
              lineHeight: 1.3,
            }}
          >
            {domain.name}
          </Reveal>
        ))}
      </div>

      {/* THE FAILURE MODE, NAMED — "governance retrofit" verbatim, and it is the keyword,
          because the ask is cheap and the alternative is what a room remembers
          (`../content.ts`). Cut for two lines in a 376px column. */}
      <Reveal
        on={showSop}
        as="p"
        delay={delay(SOP_STEP.retrofit)}
        data-testid="security-retrofit"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: RETROFIT_TOP,
          width: COL_W,
          height: RETROFIT_HEIGHT,
          ...prose(22, TIER.verdict),
        }}
      >
        {highlight(C.retrofitLine, C.retrofitLineKw)}
      </Reveal>

      {/* WHO ACTUALLY WROTE THE FOUR DOMAINS — framing 2 of the research record's §10.2,
          negation included, identical in both leader decks (`../content.ts`). Its shelf is
          DERIVED from beat 2's last row rather than from the sentence above it, so the two
          lower columns end on one line; the 16px above it is the residue of that derivation
          and has no slack in it (`../security-geometry.ts`'s `RETROFIT_TO_PROVENANCE`). */}
      <Reveal
        on={showSop}
        delay={delay(SOP_STEP.provenance)}
        data-testid="security-provenance"
        style={{
          position: "absolute",
          left: colLeft(2),
          top: PROVENANCE_TOP,
          width: COL_W,
          height: CITATION_HEIGHT_WRAPPED,
          ...citationStyle,
        }}
      >
        {C.domainsProvenance}
      </Reveal>
    </>
  );
}
