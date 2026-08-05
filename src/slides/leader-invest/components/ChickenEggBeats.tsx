// The deadlock, the trade, and the offer — four beats over two columns.
//
// THE STORY ON THE LEFT AND THE OFFER ON THE RIGHT, which is the whole layout
// argument. Beats 1–3 are first person past (what we did, what it cost us, how it
// ended) and beat 4 is second person present (what you do not have to repeat) —
// `../content.ts` calls that the one turn the slide makes. Two things follow: the
// turn cannot be a fifth item under the bill, because a list is read as one
// register, and the two columns must start on ONE shelf, because a stage where the
// deadlock started 20px above the offer would rank them. `../chicken-egg-geometry.ts`
// owns both facts (`COLUMN_TOP`) and every other coordinate below.
//
// WHY BEATS 2 AND 3 SHARE POSE 1. This is the ticket's sharpest constraint and it is
// the reason this figure has four poses for four beats and still does not put one
// beat on each. #57's AC reads "Beat 3 is present and unmissable; no pose of the
// slide ends on beat 2", and the issue body reads "The slide must never rest on beat
// 2." A POSE IS A RESTING STATE — the presenter stops on it and talks over it, for as
// long as they like — so a pose whose last arrival is the workaround plus its bill
// would leave a room looking at an account of breaching somebody's terms of service
// with the sentence that licenses it not yet on the stage. That is exactly the
// failure §6.7 calls load-bearing, and a pose boundary is the one place a renderer
// can create it out of copy that reads correctly on paper.
//
// So beat 3 lands in the SAME pose as beat 2, after it in the reveal order and after
// it in the reading order. §6.7's beat ORDER is kept — the bill arrives before the
// verdict, and the copper rule between them does the work of a paragraph break — and
// there is no resting state that ends on beat 2. Beat 4 then gets the two poses this
// frees, which is better stagecraft than the one it would otherwise have had: the
// offer lands as a SENTENCE (pose 2) before it lands as a LIST OF LIMITS (pose 3),
// and a division head hears the offer before being handed its terms.
//
// IT READS NO VARIANT AND NO BRAND, and unlike `./ProofLedger.tsx` it takes no
// resolved content block either: §4.4's table of seven brand × deckSet slots does not
// list this slide, because the deadlock, the shared accounts and the ban are
// NANOVEST'S OWN history and there is nothing true to put in a per-division version
// of them (`../content.ts` states the decision and forbids a resolver). One story,
// byte-identical in both leader decks — which is a claim a browser check can make by
// diffing the two decks' rendered boxes rather than by reading this comment.
//
// CSS vars only, NO HEX AND NO rgba() LITERALS. Rank is a COLOUR TIER between ROLES —
// see {@link TIER}, where every ordering claim carries the luminance it was measured
// at — and opacity means "not revealed yet", i.e. TIME, not rank. Nothing on this
// stage is ranked by being dimmer than its neighbour.
//
// ZERO SMIL NODES, at every pose, under any motion preference, and closed BY
// CONSTRUCTION rather than by discipline: THIS FIGURE MOUNTS NO `<svg>` AT ALL. Stated
// that way and not as "no `<svg>` on this slide", because the stage HAS six — measured
// on 2026-08-05, and all six are the NavBar's chevrons inside `.nav-zone`, on every
// slide of every deck and none of them this figure's. (Not "all 61 slides": 61 is the
// LEADER decks' length, and the chevrons are on the standard decks' 65 and `general`'s
// 63 as well — a count that belongs to one deck cannot describe a piece of shared
// chrome.) Outside that band the count is 0, so a SMIL node cannot appear here without
// an author adding a whole element class that is not currently on the stage. The copper
// rule over the verdict is the deck's own `.copper-rule` — a 1px `div` with a background
// and a `scaleX` transform — and not a `<line>`, which is what keeps AC 8 a fact about
// the markup rather than a promise about future edits.
//
// The whole motion budget is the shared `.fade` pair in `src/styles/globals.css` (an
// opacity-and-translate TRANSITION plus the `fadeReveal` KEYFRAME that `.fade.on`
// adds) and `.copper-rule`'s transform; the global `prefers-reduced-motion: reduce`
// rule squashes `animation-duration` AND `transition-duration` to 0.01ms, so every
// pose rests on its finished frame under either preference and there is nothing to
// gate at mount. NO NEW KEYFRAME AND NO NEW CLASS: gh#53 needed one because a
// `stroke-dashoffset` sweep has no resting pair of values to transition between, and
// nothing here has a stroke.
//
// MEASURED IN CHROMIUM AT 1280×720 ON 2026-08-05, both leader decks, normal and
// reduced motion — the numbers a later edit can be held against, and the ones this
// file's prose is written from rather than the reverse:
//
//   · THE LOWEST PAINTED BOX is the verdict at y=605, against a `.nav-zone` top of
//     632 read off the ELEMENT and not off the constant being checked. 27px of
//     clearance, which is what `../chicken-egg-geometry.ts`'s `NAV_ZONE_CLEARANCE`
//     says from the other end.
//   · TWO DIFFERENT "TIGHTEST FITS", and confusing them is how a wrap check reports
//     the wrong box. By GROWTH HEADROOM the workaround is the tightest thing on the
//     slide (641.00px of type in a 728px column — 13.6% before it wraps, and its box
//     holds one line); by ABSOLUTE SPARE the pilot eyebrow is (270.61 in 336, 65.39px,
//     24.2% of headroom); and the single line that comes CLOSEST to its own column
//     edge is the turn's FIRST line at 393.92 of 400 — 6.08px — which is not tight at
//     all, because that box is cut for two lines and a run filling its measure is what
//     wrapping looks like when it works. (Its SECOND line is 60.34px: "three." The
//     verdict's first line is the runner-up at 721.31 of 728, 6.69px.) The constraint
//     on a wrapping box is its LINE COUNT, never its right edge.
//   · BOTH TWO-LINE BOXES BREAK THEIR COPPER KEYWORD ACROSS THE TWO LINES, and that is
//     MEASURED AND ACCEPTED rather than unnoticed — do not "fix" the turn alone. The
//     turn splits `skip all three` into "skip all" (74.77px, ending x=1225.92) and
//     "three." (53.09px, from x=832); the verdict splits `Full investment was released`
//     into "Full investment was" (226.97px, ending x=769.31) and "released" (90.39px,
//     from x=48) — 721px apart against the turn's 393px, on the beat §6.7 calls
//     load-bearing. Three measurements decided it (`scripts/gh57-verify.mjs`, five
//     faces, 2026-08-05):
//       — Narrowing only the turn leaves the slide with one whole copper emphasis and
//         one split one, and the split one is beat 3.
//       — The band where the turn's keyword stays whole AND the box still renders two
//         lines is face-dependent: 242…360 in Source Serif 4, 239…342 in Georgia, but
//         only 218…310 in Times New Roman and in Chromium's generic `serif` — the faces
//         a projector without Georgia falls to. The intersection over all five is
//         242…310, and the one principled derivation available, the card's own
//         `CARD_MEASURE` of 336, is OUTSIDE it.
//       — Any measure in that intersection puts the turn's widest line at 266…294 under
//         a 400px card, so the card's hairline would overhang its own sentence by
//         106…133px instead of today's 6.08 — weakening the one structural relation
//         beat 4 has, which is the alignment `CARD_TOP` is derived to buy.
//     Nothing is at risk today: both faces render two lines in a box cut for two, with
//     `scrollHeight` 66 = `clientHeight` 66 and no clipping.
//   · EVERY BOX LANDS ON THE GEOMETRY MODULE'S SHELF to the pixel, and the bill's last
//     row and the card's bottom border both land on y=482 — the alignment
//     `CARD_TOP`'s derivation buys.
//   · THE POSES' DECLARED ENDS — the one bullet in this block that is ARITHMETIC AND
//     NOT A MEASUREMENT, and labelled so because the harness reports the OTHER
//     quantity. Each pose's last box finishes `delay + duration` after its own trigger:
//     710ms (pose 0), 1260ms (pose 1 — the rule's 660ms delay plus its 600ms `scaleX`,
//     which lands after the verdict's 750 + 500), 620ms (pose 2), 1070ms (pose 3), out
//     of `.fade.on`'s 0.5s `fadeReveal` and `.copper-rule`'s 0.6s transform in
//     `src/styles/globals.css`. Pose 1 is the long one BECAUSE it carries two beats;
//     anything sampling this slide "at rest" has to wait out that number. THE MEASURED
//     ARRIVALS ARE EARLIER, AND ARE NOT THESE NUMBERS: `var(--ease)` is a hard
//     ease-out, so a box crosses opacity 0.9995 well before its declared end.
//     `scripts/gh57-verify.mjs` prints the four measured crossings on every run and
//     says the same thing beside them, which is where that quantity belongs — quoted
//     here it would rot into a claim about the easing curve.
//   · ZERO SMIL NODES at all four poses in both motion modes, with the positive
//     control that makes it non-vacuous: the same sampler catches the workaround IN
//     FLIGHT under normal motion — 121…153ms after the keypress across runs, reading a
//     partial opacity of 0.04…0.15 — and under `reduce` the same poll at the same
//     moment reads exactly 1, never a value between the two frames. A sampler that
//     could not catch one would make the reduced result mean nothing.
//   · THE TWO LEADER DECKS RENDER BYTE-IDENTICAL BOXES at every pose — the no-brand-
//     axis claim above, checked rather than assumed.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive — 28 modules
// outside section E import this `Reveal`, THIS FILE INCLUDED, where section F's
// duplicate has 5 and section G's third copy has none outside its own directory.
// Two further modules take only `CopperRule`, so 30 modules reference the path
// (measured 2026-08-05, per import specifier: 13 take `Reveal` alone, 15 take both,
// 2 take `CopperRule` alone). THIS FILE IS WHY THE COUNT MOVED: `./ProofLedger.tsx`
// recorded 27 and 29 and was right the day it was written — adding a second importer
// under this directory is what made it 28 and 30, and that file's numbers were
// corrected in the same edit rather than left to disagree with these.
// A FOURTH copy under this directory would still be the wrong answer to three
// existing ones. `CopperRule` comes from the same file for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  CARD_EYEBROW_TOP,
  CARD_HEIGHT,
  // The card's own type measure, 336 — DECLARED and not left to shrink-to-fit, because the
  // card's eyebrow and its four terms are the card's SIBLINGS and not its children (every box
  // on this slide is placed against the stage). See the constant's own doc for what an
  // undeclared width would let an over-long reword do.
  CARD_MEASURE,
  CARD_PAD,
  CARD_TOP,
  CLAUSE_HEIGHT,
  COLUMN_TOP,
  COST_COUNT,
  COSTS_EYEBROW_TOP,
  EYEBROW_HEIGHT,
  LIST_ROW_HEIGHT,
  OFFER_COL_LEFT,
  OFFER_COL_W,
  RULE_TOP,
  STORY_COL_LEFT,
  STORY_COL_W,
  TURN_HEIGHT,
  VERDICT_HEIGHT,
  VERDICT_TOP,
  WORKAROUND_HEIGHT,
  WORKAROUND_TOP,
  clauseTop,
  constraintRowTop,
  costRowTop,
} from "../chicken-egg-geometry";
import { investChickenEggContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and NOT one per box — six roles, five tiers, and the ladder
 * descends in the order the argument does.
 *
 * EVERY ORDERING CLAIM BELOW IS A MEASURED NUMBER. gh#56 shipped this table's sibling
 * with four brightness claims in it and three were wrong by measurement, so every
 * "brighter than" here carries the WCAG relative luminance of the token as
 * `getComputedStyle` resolved it in Chromium at 1280×720 on 2026-08-05 — one probe
 * element per token, appended to the live stage.
 *
 * TWO INDEPENDENT DERIVATIONS, AND THEY AGREE TO 4 dp: that browser probe, and the WCAG
 * formula applied by hand to `src/styles/globals.css`'s own hexes. The browser is not the
 * BETTER source — relative luminance is a deterministic function of a hex, so correct
 * arithmetic cannot be beaten — it is the source that reads what the CASCADE actually
 * resolves, so a token that is overridden, misspelled or (like `em.kw` below) simply not
 * the one the stage uses shows up as a wrong number rather than as a right one.
 * `./ProofLedger.tsx`'s six overlapping luminances agree with these too. The ladder,
 * brightest first:
 *
 *   role        token             luminance   register
 *   (headline)  --neutral-50       0.9131     40px display · `.slide-headline.small`
 *   verdict     --neutral-100      0.7835     26px serif   · BEAT 3
 *   workaround  --neutral-200      0.6584     22px serif
 *   turn        --neutral-200      0.6584     24px serif
 *   clause      --copper-200       0.5917     20px mono caps
 *   listRow     --neutral-300      0.3663     15px sans
 *   eyebrow     --copper-400       0.2966     11px mono caps
 *   cardBorder  --copper-700       0.0866     1px hairline (not text)
 *   (stage)     --neutral-900      0.0030     what all of it is painted on
 *
 * THE HEADLINE IS IN THE TABLE AND NOT IN THIS FILE. `.slide-headline` prints
 * `--neutral-50` at every pose and outshines everything here, which is the reason
 * the row is quoted: the claim beat 3 has to satisfy is "brightest UNDER THE HEADLINE
 * ROW", and a table that did not name the headline could not say what it is under.
 * MEASURED THAT WAY TOO — over every text run on the stage below the rendered headline
 * row's bottom edge (y=122), the deck's chrome excluded: 23 runs, brightest 0.7835,
 * and the verdict is the only owner at it.
 *
 * WHY SIX ROLES AND NOT FIFTEEN BOXES. The two lists take ONE tier between them
 * because `../content.ts` says so in the `LineItem` doc — the bill and the terms are
 * "the same object twice … at the same size in the same tier", and what differs is
 * the budget each has, not the standing of a row. Same for the two eyebrows, which
 * `../chicken-egg-geometry.ts` gives one `EYEBROW_HEIGHT` for the same reason.
 * Ranking the offer's terms over the bill's costs would be a claim nobody authored:
 * they are the two halves of one trade — what it cost us, what it costs you.
 *
 * EVERY TIER CLEARS gh#50's FLOORS EXCEPT ONE, AND THAT ONE HAS PRECEDENT RATHER THAN A
 * RULE. `--neutral-400` (0.1714) and everything under it is out of bounds for text on
 * this stage and no role takes it; `--neutral-300` is the quietest legal text tier and
 * the two lists rest ON it rather than under it. `--copper-400` (0.2966) is under
 * `--neutral-300` by luminance and the two eyebrows take it anyway.
 *
 * PRECEDENT, NOT A DOCUMENTED EXEMPTION — say it that way round, because nothing in the
 * tree writes a copper exemption down. The floor the deck ENFORCES is the grey list in
 * `scripts/projection-test.mjs`, and it names `--neutral-400` (`rgb(115, 115, 115)`)
 * alone; `--copper-400` is not on it and is not named as an exception anywhere either.
 * What exists is two shipped precedents at exactly this token in exactly this register,
 * both 11px mono caps: `./ProofLedger.tsx`'s eyebrow and the kicker in
 * `../../leader-shape/components/PillarOrbit.tsx`. The two eyebrows here are the same
 * call, which is a claim about consistency and not about permission.
 *
 * IT IS ALSO THE DECK'S KEYWORD TIER — THROUGH `KeywordHighlight`, NOT THROUGH `em.kw`.
 * `src/components/KeywordHighlight.tsx` renders `<em className="text-copper-400 …">`, so
 * every copper italic in every deck (the four on this stage included, all placed by
 * `highlight()`) is Tailwind's `text-copper-400` — which is how `./ProofLedger.tsx` names
 * it, and this file named it wrong until 2026-08-05. `globals.css`'s `em.kw` rule is NOT
 * that mechanism: it resolves a different token (`--copper-300`, 0.4029, which is ABOVE
 * `--neutral-300` and so not under the floor at all), and it is dead CSS — no module under
 * `src/` emits `class="kw"`.
 */
const TIER = {
  /**
   * BEAT 1's two clauses. Copper, because they are a RULE QUOTED and not a sentence
   * spoken — 20px mono in caps reads as something written down elsewhere, which is
   * what a deadlock is.
   *
   * `--copper-200` 0.5917, i.e. DARKER than the two prose lines (0.6584) and darker
   * than the verdict (0.7835), so beat 1 opens the slide without competing with the
   * beat that closes it. It is the same token `./ProofLedger.tsx` gives its figures
   * and two tiers OVER the keyword italic (`--copper-400` 0.2966), using "over" the
   * way `../../leader-shape/components/PillarOrbit.tsx` does: the lower token number
   * is the brighter one.
   */
  clause: "var(--copper-200)",
  /** BEAT 2's confession. `--neutral-200` 0.6584 — one tier under the verdict's
   *  0.7835 and 4px smaller, so the sentence that licenses the workaround outranks
   *  the workaround on both channels. */
  workaround: "var(--neutral-200)",
  /**
   * BEAT 3. `--neutral-100` 0.7835 — the brightest tier ANY TEXT ON THIS STAGE TAKES
   * UNDER THE HEADLINE ROW, and the only role anywhere on the stage at it.
   *
   * "ANY TEXT", NOT "ANY BOX", and the distinction was found by measuring rather than
   * by reading. The rule's wrapper and the card are textless, so `getComputedStyle`
   * reports the `color` they INHERIT from `body` — `--neutral-50`, 0.9131 — while what
   * they paint is a `--copper-700` background and a `--copper-700` border. A colour
   * audit that read `color` off every box would therefore report the headline's tier
   * twice and this claim would fail vacuously; the claim is over the 23 text runs the
   * stage renders below y=122.
   *
   * THAT IS THE AC, NOT A PREFERENCE. #57 requires beat 3 to be unmissable, so it is
   * the brightest tier (0.7835 against the workaround's and the turn's 0.6584), the
   * biggest prose on the slide (26px against 24 and 22), alone below the copper rule
   * in the wider of the two columns, and the LAST thing to arrive in its pose. Four
   * channels, no reliance on any one of them. It is one tier under the headline
   * itself, which stays the brightest type on the stage on purpose: the headline is
   * the premise ("Every division starts in the same deadlock") and beat 3 is what
   * came of it.
   */
  verdict: "var(--neutral-100)",
  /**
   * BEAT 4's sentence. `--neutral-200` 0.6584 — LEVEL WITH THE WORKAROUND AND UNDER
   * THE VERDICT, deliberately.
   *
   * The turn is the only sentence addressed to the room and it is still not the
   * brightest thing on the stage, because the offer is only sayable if beat 3
   * happened. What separates it from the workaround is size (24px against 22) and
   * column, not tier: they are the two ends of the trade, and ranking one over the
   * other by colour would be an argument neither the spec nor the copy makes.
   */
  turn: "var(--neutral-200)",
  /**
   * BOTH LISTS — the four costs and the four terms. `--neutral-300` 0.3663, which is
   * gh#50's floor for text on this stage, ON it and not under it.
   *
   * ENUMERATIONS ARE SCANNED, PROSE IS READ, and that is the step this tier buys:
   * one tier under the prose above it (0.6584) so the four rows read as a bill and a
   * set of terms rather than as four more sentences. It is the same step
   * `./ProofLedger.tsx` takes from its 15px metric name to its 10px chip, and these
   * rows are 15px sans — half again the size of the sibling's quietest string at the
   * same tier, which is the one string #56's AC was written about. Nothing here may
   * go below this: `--neutral-400` is 0.1714 and out of bounds.
   */
  listRow: "var(--neutral-300)",
  /**
   * Both eyebrows — `WHAT IT COST` over the bill and `INSTEAD — A 30-DAY PROOF PILOT`
   * inside the card. `--copper-400` 0.2966, the deck-wide mono LABEL tier.
   *
   * QUIETEST ON THE STAGE, WHICH IS WHAT AN EYEBROW IS: it names the list under it
   * and is not part of the argument. Under `--neutral-300` by luminance, and defensible
   * there only because it is EXACTLY this token in exactly this register — see the
   * table above for the two precedents, and for why that is precedent and not a rule.
   */
  eyebrow: "var(--copper-400)",
  /**
   * The pilot card's hairline. `--copper-700` 0.0866 — the SAME token `.copper-rule`
   * paints in `src/styles/globals.css`, which is the point: the two lines on this
   * stage are the bill's total rule and the offer's box, and they agree.
   *
   * NOT `--copper-800` (0.0471), which `./ProofLedger.tsx` uses for its chips. A
   * hairline that reads at 60×20px disappears at 400×228 against `--neutral-900`
   * (0.0030), and the card is the one box on this slide that has to read as an OBJECT
   * — the thing a division head writes down. NOT A TEXT TIER, so gh#50's colour floor
   * does not reach it: no glyph on this stage is set in it.
   */
  cardBorder: "1px solid var(--copper-700)",
} as const;

/**
 * The mono LABEL register — both clauses and both eyebrows.
 *
 * `upper` is not a parameter here, unlike `./ProofLedger.tsx`'s version of this
 * helper: that slide has two deliberate exceptions (a typeset figure and a
 * sentence-length citation), and this one has none — all four strings this register
 * covers are shouted labels. `../content.ts` already stores the two clauses in caps,
 * so the transform is a no-op on them and the data reads as the stage does; it is
 * still declared, because the register is what makes the eyebrows uppercase and one
 * register with two spellings is how a label ends up title-cased.
 */
function mono(size: number, color: string, ls: number): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    textTransform: "uppercase",
    color,
    // A LABEL MAY NOT WRAP, and this is the half of that rule the renderer owns.
    // Every box in this register is cut for exactly one line (`CLAUSE_HEIGHT` 28,
    // `EYEBROW_HEIGHT` 16), so a second line does not overflow into air — the card's
    // eyebrow would land in the 12px that binds it to its terms. `nowrap` makes the
    // failure an OVERFLOW instead of a wrap, which is what puts it in reach of a
    // `scrollWidth` vs `clientWidth` check; the prose below wraps on purpose and is
    // caught by a rendered line count instead. gh#56's defect injection is why both
    // channels exist: each one is blind to the other's failure.
    whiteSpace: "nowrap",
  };
}

/**
 * The sans LABEL register — the four costs and the four terms.
 *
 * NOT MONO, for `./ProofLedger.tsx`'s reason: this is where every label-shaped NAME
 * in the deck sits (the ladder's rung definitions, the pillars' captions), and mono
 * here would make the two lists look like code. NOT `nowrap` either, unlike the
 * register above: the longest cost measures 405.23px in a 728px column and the
 * longest term 188.41px in a 336px card, so both lists carry more than 2× headroom
 * (`../chicken-egg-geometry.ts`'s type table), and at that much slack a reword that
 * needs a second line is better REPORTED by a line count than silently run past the
 * column edge.
 */
const listRowStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 15,
  lineHeight: 1.3,
  color: TIER.listRow,
};

/**
 * The prose register — the workaround, the verdict and the turn.
 *
 * UPRIGHT SERIF, AND THE ONLY ITALICS ON THE STAGE ARE THE KEYWORDS — four runs,
 * measured, all of them `--copper-400` italic Source Serif 4 across these three boxes
 * and nowhere else.
 *
 * NOT BECAUSE ITALIC PROSE WOULD HIDE ITS OWN KEYWORD. It would not, and the sibling
 * is the proof: `./ProofLedger.tsx`'s closer is italic AND carries two keywords, which
 * read as keywords on COLOUR alone. The reason is arithmetic. That slide has ONE prose
 * line and can spend italic on it; this one has THREE out of the four things the room
 * reads, so italic there would be the register rather than the mark, and the copper
 * would be doing all of the work with none of the help.
 *
 * The size and the tier arrive per call, because they are what ranks the three (see
 * {@link TIER}). The line-height does not: every box height in
 * `../chicken-egg-geometry.ts` is cut for a 1.3 line box, measured face by face.
 */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    // `as="p"` for all three — they are sentences, not labels — and the browser's
    // own paragraph margin would push every one of them off the shelf the geometry
    // module measured.
    margin: 0,
  };
}

// ───────────────────── the stagger ─────────────────────

/**
 * How long the first box of a pose waits, and how far behind it the next one lands.
 *
 * THE SAME TWO NUMBERS `./ProofLedger.tsx` USES, and for its reasons: 120ms of
 * lead-in keeps the first arrival off the same frame as the click, and 90ms between
 * boxes makes a list land as something being read rather than as one flash of four.
 * A slide's two figures reveal at the same speed or the deck has two speeds.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 1's ARRIVAL ORDER, as step numbers — and the verdict's is DERIVED so that it
 * cannot stop being last.
 *
 * This is the pose that carries two beats (see the header), so its order is the
 * argument: the confession, the label over its bill, the bill itself, the rule that
 * closes it, and then beat 3. `rule` and `verdict` are expressions over
 * {@link COST_COUNT} rather than the literals 6 and 7, so a bill that ever grew
 * would push both DOWN the stagger instead of overtaking them — a fifth cost row
 * landing after the verdict would put the pose's last arrival back on beat 2, which
 * is the one thing the AC forbids. (`../content.ts`'s tuple refuses a fifth cost and
 * `../chicken-egg-geometry.ts` pins the count; this is the third refusal, and it is
 * the only one that is about the reveal rather than about the copy.)
 */
const TRADE_STEP = {
  workaround: 0,
  costsEyebrow: 1,
  firstCost: 2,
  rule: 2 + COST_COUNT,
  verdict: 3 + COST_COUNT,
} as const;

/** POSE 3's arrival order: the box, then its label, then the terms. The card's
 *  border arrives FIRST — an offer's terms appearing before the box they are the
 *  terms of would read as a fifth list. */
const TERMS_STEP = {
  card: 0,
  pilotEyebrow: 1,
  firstTerm: 2,
} as const;

// ───────────────────── the figure ─────────────────────

export interface ChickenEggBeatsProps {
  /** 0…3. See `../invest-chicken-egg.tsx` for what each pose argues. */
  pose: number;
}

export function ChickenEggBeats({ pose }: ChickenEggBeatsProps) {
  // BEAT 1 needs no gate: it stands from pose 0 and never leaves. The three below
  // are `>=` and not `===` for the reason every step-reveal slide in the deck is —
  // a pose is everything argued so far, so pose 3 still shows the deadlock.
  const showTrade = pose >= 1;
  const showTurn = pose >= 2;
  const showTerms = pose >= 3;

  return (
    <>
      {/* ───── BEAT 1 · THE DEADLOCK ─────
          Two clauses, each the other with its two nouns swapped, which is what a
          room reads as a cycle. NO DRAWN RING AND NO ARROW: the loop is in the
          words, and drawing it would spend an `<svg>` — and with it this slide's
          zero-SMIL-by-construction argument — on saying what the two strings
          already say to anyone who reads them in order (`../content.ts`).

          THEY ARRIVE AT MOUNT, staggered, with `on` hardcoded true rather than
          gated on `pose >= 0`. That comparison is a check that cannot fail, and
          this tree deletes those on sight; what the two `Reveal`s are still here
          for is the 120/210ms entrance, which is what keeps the pair from being
          painted in the same frame as the headline. */}
      {C.deadlockClauses.map((clause, i) => (
        <Reveal
          key={clause}
          on
          delay={delay(i)}
          data-testid={`chicken-egg-clause-${i}`}
          style={{
            position: "absolute",
            left: STORY_COL_LEFT,
            top: clauseTop(i),
            width: STORY_COL_W,
            height: CLAUSE_HEIGHT,
            ...mono(20, TIER.clause, 0.14),
            lineHeight: 1.2,
          }}
        >
          {clause}
        </Reveal>
      ))}

      {/* ───── BEAT 2 · WHAT WE ACTUALLY DID, AND WHAT IT COST ─────
          The confession first, then its bill. Both are pose 1's, and pose 1 does
          not end here — see the header for why that is the AC and not a taste
          call. */}
      <Reveal
        on={showTrade}
        as="p"
        delay={delay(TRADE_STEP.workaround)}
        data-testid="chicken-egg-workaround"
        style={{
          position: "absolute",
          left: STORY_COL_LEFT,
          top: WORKAROUND_TOP,
          width: STORY_COL_W,
          height: WORKAROUND_HEIGHT,
          ...prose(22, TIER.workaround),
        }}
      >
        {highlight(C.workaround, C.workaroundKw)}
      </Reveal>

      {/* THE TIGHTEST TEXT ON THE SLIDE IS THE LINE ABOVE, not this label: 641.00px
          of type in a 728px column, 87px of spare, and the webfont is the worse
          case (Georgia sets the same sentence 4.97px narrower). Its box holds one
          line and a second would land in the 24px of air above this eyebrow, so the
          rendered LINE COUNT there is a browser assertion and not an assumption
          (`../chicken-egg-geometry.ts`'s type table). */}
      <Reveal
        on={showTrade}
        delay={delay(TRADE_STEP.costsEyebrow)}
        data-testid="chicken-egg-costs-eyebrow"
        style={{
          position: "absolute",
          left: STORY_COL_LEFT,
          top: COSTS_EYEBROW_TOP,
          width: STORY_COL_W,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.eyebrow, 0.22),
          lineHeight: 1.25,
        }}
      >
        {C.costsEyebrow}
      </Reveal>

      {/* THE BILL — §6.7's four costs in §6.7's order, which is an escalation of
          WHOSE problem each one is (the person doing the work → the company's
          records → the company's risk → the desk this slide is addressed to). Keyed
          on the content `id` so a reorder of the copy moves the hooks with it and a
          test naming `chicken-egg-cost-no-audit-trail` cannot silently start
          measuring a different row. `costRowTop` throws on a fifth. */}
      {C.costs.map((cost, i) => (
        <Reveal
          key={cost.id}
          on={showTrade}
          delay={delay(TRADE_STEP.firstCost + i)}
          data-testid={`chicken-egg-cost-${cost.id}`}
          style={{
            position: "absolute",
            left: STORY_COL_LEFT,
            top: costRowTop(i),
            width: STORY_COL_W,
            height: LIST_ROW_HEIGHT,
            ...listRowStyle,
          }}
        >
          {cost.label}
        </Reveal>
      ))}

      {/* ───── BEAT 3 · IT WORKED ─────
          THE RULE IS THE BILL'S TOTAL RULE AND NOT A DIVIDER FOR THE SLIDE, which
          is why it spans the story column and stops at the gutter: carried across
          both columns it would tie the offer to the bill's arithmetic, and the
          offer is what the bill is an argument for.

          IT DOES THE WORK OF A PARAGRAPH BREAK — the AC asks for beat 3 to be
          unmissable, and a 20px gap alone would leave the verdict reading as a
          fifth cost. A `div` with a background and a `scaleX` transform, from the
          deck's own `.copper-rule`; a `<line>` here would be the first `<svg>` on
          the slide and would turn AC 8 from a construction into a promise.

          THE TESTID IS ON A WRAPPER, and that is deliberate rather than lazy:
          `CopperRule` spreads no `data-*` props, and widening a primitive 30 modules
          reference to give one slide a hook is a change with a blast radius this
          ticket has no business having. The wrapper is the geometric box the
          geometry module places (`RULE_TOP`, `STORY_COL_W`); the reveal itself is
          the transform on the `.copper-rule` inside it, which is where a check
          has to read it from. */}
      <div
        data-testid="chicken-egg-rule"
        style={{ position: "absolute", left: STORY_COL_LEFT, top: RULE_TOP, width: STORY_COL_W }}
      >
        <CopperRule on={showTrade} delay={delay(TRADE_STEP.rule)} width="100%" />
      </div>

      {/* BEAT 3 ITSELF, and the LAST thing to arrive in this pose — which is the
          half of "no pose ends on beat 2" that lives in the reveal order rather
          than in the pose split. Three sentences, in the order they happened, and
          the keyword is on the release of the investment rather than on "It worked":
          that is the clause a Div Head repeats upward (`../content.ts`). */}
      <Reveal
        on={showTrade}
        as="p"
        delay={delay(TRADE_STEP.verdict)}
        data-testid="chicken-egg-verdict"
        style={{
          position: "absolute",
          left: STORY_COL_LEFT,
          top: VERDICT_TOP,
          width: STORY_COL_W,
          height: VERDICT_HEIGHT,
          ...prose(26, TIER.verdict),
        }}
      >
        {highlight(C.verdict, C.verdictKw)}
      </Reveal>

      {/* ───── BEAT 4 · THE TURN, THEN ITS TERMS ─────
          Pose 2 is the sentence and pose 3 is the card. Two poses for one beat is
          what the shared pose above frees up, and it is the better order anyway: a
          division head hears the offer before being handed its limits. The box is
          cut for TWO lines on purpose — 459.70px of type in a 400px column
          (`TURN_HEIGHT`). */}
      <Reveal
        on={showTurn}
        as="p"
        delay={delay(0)}
        data-testid="chicken-egg-turn"
        style={{
          position: "absolute",
          left: OFFER_COL_LEFT,
          // THE SHELF ITSELF, not `clauseTop(0)`, which returns the same 156 today.
          // `COLUMN_TOP` is what the geometry module says both columns start on; the
          // clause helper is beat 1's, and reading the turn's shelf out of it would
          // make the offer's position depend on the deadlock's list.
          top: COLUMN_TOP,
          width: OFFER_COL_W,
          height: TURN_HEIGHT,
          ...prose(24, TIER.turn),
        }}
      >
        {highlight(C.turn, C.turnKw)}
      </Reveal>

      {/* THE ONLY BORDERED BOX ON THE STAGE, and the reason the offer reads as
          something a division head can write down: the story is prose and lists,
          the offer is a box with terms in it. Its bottom border lands on the bill's
          last row at y=482 by construction — `CARD_TOP` is derived UPWARD from
          `COST_ROWS_BOTTOM` — so the two lists read as the two halves of one trade,
          and below that line only beat 3 speaks.

          NO BACKGROUND, ONLY A HAIRLINE. A filled panel would make the offer a
          different SURFACE from the story, and this stage has one surface.

          `boxSizing: "border-box"` is load-bearing and not boilerplate: this repo
          deliberately does not ship a global `* { box-sizing: border-box }` rule
          (`src/styles/globals.css` says so at the top of the section-E block), so a
          content-box card would render 402×230 and put its right edge at x=1234 —
          2px past the deck's own 1232 margin. */}
      <Reveal
        on={showTerms}
        delay={delay(TERMS_STEP.card)}
        data-testid="chicken-egg-card"
        style={{
          position: "absolute",
          left: OFFER_COL_LEFT,
          top: CARD_TOP,
          width: OFFER_COL_W,
          height: CARD_HEIGHT,
          boxSizing: "border-box",
          border: TIER.cardBorder,
        }}
      />

      {/* THE WIDEST STRING IN THE OFFER COLUMN, and the string that column was cut
          for: 270.61px against the card's 336px measure, 65.39px spare. `nowrap`
          plus a declared width is what makes an over-long reword an overflow a
          check can see rather than a second line inside a 16px box. */}
      <Reveal
        on={showTerms}
        delay={delay(TERMS_STEP.pilotEyebrow)}
        data-testid="chicken-egg-pilot-eyebrow"
        style={{
          position: "absolute",
          left: OFFER_COL_LEFT + CARD_PAD,
          top: CARD_EYEBROW_TOP,
          width: CARD_MEASURE,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.eyebrow, 0.22),
          lineHeight: 1.25,
        }}
      >
        {C.pilotEyebrow}
      </Reveal>

      {/* THE TERMS — four limits and, with the eyebrow's 30 days, a clock: seats
          bound the headcount, one named use case each bounds the scope, a kill
          criterion says in advance what stopping looks like, a spend cap bounds the
          exposure. Same register, same tier and same row height as the bill's four
          costs, because they are the same object twice. `constraintRowTop` throws on
          a fifth, and it throws against the TURN LINE rather than the NavBar's
          band: the card's bottom is pinned, so it grows upward. */}
      {C.pilotConstraints.map((term, i) => (
        <Reveal
          key={term.id}
          on={showTerms}
          delay={delay(TERMS_STEP.firstTerm + i)}
          data-testid={`chicken-egg-term-${term.id}`}
          style={{
            position: "absolute",
            left: OFFER_COL_LEFT + CARD_PAD,
            top: constraintRowTop(i),
            width: CARD_MEASURE,
            height: LIST_ROW_HEIGHT,
            ...listRowStyle,
          }}
        >
          {term.label}
        </Reveal>
      ))}
    </>
  );
}
