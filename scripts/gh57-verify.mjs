// gh#57's browser evidence — THE DEADLOCK, AND WHO CAN SKIP IT. Both leader decks,
// four poses, walked forward and back, in both motion preferences.
//
// `tests/unit/invest-chicken-egg.test.tsx` says in its own first paragraph which half
// of #57's AC it cannot reach: jsdom has no layout engine, so it computes no text
// width, no line count, no colour and no transition. Every geometric claim there is
// either "both sides read the same number out of
// `src/slides/leader-invest/chicken-egg-geometry.ts`" or an ORDER over those numbers.
// This script owns the other half, and it is the half the slide is actually at risk
// of:
//
//   1. THE FOUR BEATS IN §6.7's ORDER — WHICH IS TWO FACTS IN A BROWSER, NOT ONE.
//      READING ORDER is where the beats are (the story column's three beats descending
//      in y, the offer column to the right of it with no overlap) and ARRIVAL ORDER is
//      when they get there. The unit test owns arrival order as a comparison of
//      `transitionDelay` STRINGS, which is the strongest thing available in jsdom and
//      is blind to the two ways that ordering can be wrong on a stage: a delay the
//      browser never applies (a box outside `.fade`), and an easing that reorders the
//      crossings. So arrival is SAMPLED HERE, per animation frame, off the computed
//      opacity — and the assertion is over when each box STARTS moving, because that
//      is the unambiguous event. Where the reveal FINISHES is reported and not
//      asserted: the rule's 600ms `scaleX` and the verdict's 450ms opacity are eased,
//      so their 0.98 crossings arrive in the opposite order to their declared ends
//      (measured: rule 992ms, verdict 1034ms, against declared ends of 1260 and 1250).
//      An assertion over an eased crossing would be an assertion about `var(--ease)`.
//
//   2. "NO POSE ENDS ON BEAT 2" — THE RENDERED HALF, AND THE SHARPER CLAIM UNDER IT.
//      The unit test holds the resting states: at every pose, if a cost is revealed the
//      verdict is revealed too. What it cannot hold is the WINDOW — a pose is a resting
//      state, but the walk INTO the resting state passes through frames where the bill
//      is complete and the verdict has not arrived, and the length of that window is a
//      number only an engine has. Measured in both preferences, because
//      `prefers-reduced-motion: reduce` does NOT shorten it:
//
//        THE DECK-WIDE FACT gh#54 AND gh#56 BOTH RECORDED, AND IT GOVERNS THIS SLIDE.
//        The global rule in `src/styles/globals.css` squashes `animation-duration` and
//        `transition-duration` to 0.01ms. IT DOES NOT TOUCH THE DELAY. `ChickenEggBeats`
//        staggers pose 1 as `120 + step × 90`ms, and the verdict is step `3 + COST_COUNT`
//        = 7, so the verdict still lands ≈750ms after the keypress under `reduce` —
//        instantly, but late, and later than any other arrival on this slide (pose 0's
//        last clause is 210ms, pose 2's turn 120ms, pose 3's last term 570ms). That is
//        reported as a FINDING below with its number rather than accepted quietly.
//
//   3. BEAT 3 IS UNMISSABLE — AS A LUMINANCE, AND OVER RUNS RATHER THAN BOXES.
//      `ChickenEggBeats.tsx`'s `TIER` table claims `--neutral-100` (0.7835) is the
//      brightest tier any text on this stage takes UNDER THE HEADLINE ROW and that the
//      verdict is its only owner. gh#56 shipped that table's sibling with four
//      brightness claims in it and three were wrong by measurement, so this recomputes
//      the ladder from the cascade instead of reading the comment.
//
//      THE VACUOUS VERSION OF THIS CHECK IS THE OBVIOUS ONE. `getComputedStyle(el).color`
//      on a TEXTLESS box reports the colour it INHERITS — the card and the rule wrapper
//      paint a `--copper-700` border and a `--copper-700` background and both inherit
//      `--neutral-50` from `body`, which is the HEADLINE's tier. An element-level audit
//      therefore finds the headline's luminance twice, below the headline row, on boxes
//      that paint no glyph, and "the verdict is the sole owner of the brightest tier"
//      fails for a reason that is not about the verdict. So the audit walks TEXT NODES,
//      and the element-level walk is kept as a POSITIVE CONTROL: it must find those
//      textless boxes at the inherited tier, which is what proves the run-level walk is
//      the non-vacuous one and not merely the one that passed.
//
//   4. EVERY STRING THAT COULD SILENTLY WRAP — TWO CHANNELS, EACH BLIND TO THE OTHER'S
//      FAILURE. gh#56's header states the asymmetry and its defect injection is why
//      both exist:
//        · `scrollWidth` vs `clientWidth` catches an over-long `nowrap` LABEL (the two
//          clauses and the two eyebrows are `white-space: nowrap`, so growth becomes
//          overflow) and is VACUOUS on every prose box on this slide, whose declared
//          width stays declared while the text inside it wraps.
//        · The rendered LINE COUNT — one `Range` per text node, its client rects grouped
//          by line-box top — catches the wrap and is the only channel that does. It is
//          also the only channel that can check the TWO-LINE boxes, whose constraint is
//          the line count and not the right edge: the verdict is 825.44px of type in a
//          728px measure and the turn 459.70 in 400, so BOTH are meant to wrap, and a
//          run filling its measure is what wrapping looks like when it works.
//      The five candidates are named in `chicken-egg-geometry.ts`'s type table: the
//      workaround (the tightest growth headroom on the slide — 641.00 in 728), the pilot
//      eyebrow (the widest string in the offer column — 270.61 in the card's 336), the
//      longest cost label, all four pilot terms, and the two-line pair. `--inject` fires
//      each channel on demand — see the flag's help, and the report at the bottom of
//      this comment.
//
//   5. ZERO SMIL UNDER `reduce`, NON-VACUOUSLY. The census is checkable in jsdom and the
//      unit test does it. What jsdom cannot supply is the POSITIVE CONTROL that makes a
//      count of zero mean anything: under normal motion this same sampler must catch a
//      box mid-flight at an intermediate opacity, and under `reduce` it must never. A
//      sampler that could not catch one would report a squashed transition on a deck
//      that never squashed one — gh#54 records that its first version did exactly that.
//      The `<svg>` census is reported the way `ChickenEggBeats.tsx` states it and not as
//      "no `<svg>` on this slide": the stage HAS six, they are the NavBar's chevrons,
//      and what this slide claims is that the count OUTSIDE `.nav-zone` is 0.
//
//   6. THE COMPOSED LETTER, AND THE DECK THAT MUST NOT HOLD THE SLIDE. The letter is
//      DERIVED (§3.5), so `D.2` exists as rendered text nowhere but a browser. Harvested
//      from a walk of the WHOLE deck, once per brand, so "exactly one slide prints this"
//      is part of the claim rather than "the first slide that matched". A standard
//      variant is not skipped: it walks all 65 slides and exits 1 saying the deck
//      composes no `invest` run.
//
//   7. BOTH LEADER DECKS, BYTE-IDENTICAL. The slide has no brand axis (§4.4's table of
//      seven brand × deckSet slots does not list it) and `invest-chicken-egg.tsx` says
//      that a browser check can settle it "by diffing the two decks' rendered boxes".
//      This is that diff — every box's rect and the stage's whole text, at all four
//      poses — rather than an assumption that no resolver means no difference.
//
// A TRAP THIS SCRIPT FELL INTO AND NOW GUARDS, recorded because it is deck-wide and not
// this slide's. Resolving the colour ladder through a PROBE ELEMENT — one probe re-coloured
// in a loop, which is the idiom `scripts/gh56-verify.mjs` used until gh#64 ported this fix
// into it (it had the bug on all three counts this paragraph names) — IS WRONG UNDER
// `prefers-reduced-motion: reduce`, and it fails by passing. The global rule in `globals.css` sets `transition-duration: 0.01ms !important`
// on `*` and `transition-property` defaults to `all`, so under `reduce` every element has a
// live transition on `color` and `getComputedStyle` right after an assignment returns the
// value the element is transitioning FROM. Measured 2026-08-05: under `reduce` a probe
// re-coloured through four tokens reports the FIRST token's colour four times. A luminance
// gate built on that does not fail — its floor silently moves. So this script uses a FRESH
// probe per token with transitions killed inline, and asserts that the nine tokens resolve
// to nine different colours before it uses any of them.
//
// THE FLOOR AND THE MARGINS ARE MEASURED, NEVER READ. `.nav-zone` is
// `position: absolute; bottom: 0; height: 88px` in `src/styles/globals.css`, so its top
// edge is y = 632 — and 632 is exactly what `NAV_ZONE_TOP` in the geometry module
// re-derives, which is why this script does not use that constant as the floor. It
// measures the ELEMENT'S OWN box and asserts against that, then cross-checks the
// module's number against the measurement. Same rule for the side margins, which come
// through `.fig-label`'s own rect and not through a literal 48, and for the gutter,
// which is measured as the distance between the two columns' own rendered edges and
// then held against `COLUMN_GAP`. A harness that reads the number it is checking proves
// only that the number equals itself.
//
// THE STAGE'S SCALE, handled explicitly for gh#54's reason. `useViewportScale`
// CSS-transforms `.stage-wrap` by `min(w/1280, h/720)`. This reads the matrix, ASSERTS
// it is 1:1 at 1280×720, and converts every rect through the stage's own origin and
// scale anyway, so every number printed is a stage coordinate whatever viewport it is
// handed.
//
// DEFECT INJECTIONS RUN BEFORE THE CHECKS WERE TRUSTED (`--inject`, 2026-08-05). Each line
// records what fired AND what passed, because the second half is the argument for keeping
// two channels:
//
//   · `workaround-560` — the tightest prose box narrowed from 728 to 560. FIRES the LINE
//     COUNT check at all five poses that show it (2 lines where the box holds 1, and the
//     second line lands in the 24px above the eyebrow under it). PASSES `scrollWidth` vs
//     `clientWidth`, and passes the spill, margin and gutter checks, because a wrapped box
//     shrinks vertically and never grows horizontally. Channel 2 catches what channel 1
//     cannot.
//   · `pilot-eyebrow-120` — the card's `nowrap` label narrowed from 336 to 120. FIRES the
//     OVERFLOW check (`scrollWidth` 271 > `clientWidth` 120), the spill check (+150.61px
//     past its content edge), the fit and the card-measure cross-check. PASSES the LINE
//     COUNT at 1, because `nowrap` turns growth into overflow instead of a wrap. Channel 1
//     catches what channel 2 cannot — which is why both are here.
//   · `verdict-830` — the two-line box widened past its own single-line width. FIRES the
//     LINE COUNT in the other direction (1 line where the box is cut for 2), the two-line
//     assertion, and the BOX-level column check (`READING · beat 4 is the OTHER column`,
//     gutter −46px). PASSES the RUN-level gutter check, and that is not a gap: the run-level
//     check measures each run against the story column's OWN rendered right edge, which
//     moved with the injection. A column that grows is the box check's failure; a run that
//     overruns a column that did not move is the run check's, which is what the next
//     injection proves.
//   · `verdict-nowrap` — the same box given `white-space: nowrap`, so its 825.44px of type
//     sits on one line inside a 728px box that did not move. FIRES the RUN-level GUTTER
//     check (873.44 past the story column's 776), the OVERFLOW check, the spill check and
//     the line count. This is the injection that makes the gutter assertion falsifiable.
//   · `verdict-18` — beat 3's own type dropped from 26px to 18, which is the AC failing
//     rather than the layout failing. FIRES the BIGGEST-PROSE check ("the verdict at 18px …
//     over all 20 other runs"), and with it the line count, the two-line fit and the
//     keyword-split decision. It exists because that check DID NOT fire on it: until
//     2026-08-05 the predicate was `id === "chicken-egg-verdict" || s < 26`, which excluded
//     the verdict from its own comparison, and this same run reported `ok` while printing
//     "verdict 18px". PASSES the whole colour ladder — a size defect is invisible to a
//     luminance audit, which is why "unmissable" is asserted on four channels.
//
// Usage:
//   node scripts/gh57-verify.mjs                          # berau-leader first
//   node scripts/gh57-verify.mjs --variant=gems-leader
//   node scripts/gh57-verify.mjs --reduced
//   node scripts/gh57-verify.mjs --inject=workaround-560   # expect failures; that is the point
//   DECK_URL=http://localhost:5183 node scripts/gh57-verify.mjs
//
// THE DEV SERVER IS NOT BOOTED BY THIS SCRIPT. Run `npm run dev` (or point `DECK_URL`
// at a preview build) and then run this; a harness that starts and stops a server it
// does not own is a harness that kills somebody's session.
//
// The variant is explicit for the same reason the export scripts take one (gh#27): a
// bare localhost resolves to `general`, which composes no `invest` run at all.
//
// `--variant` PICKS THE ORDER, NOT THE SET. This slide has NO BRAND AXIS, which is the
// point of assertion 7 — so both leader decks are always measured and the flag decides
// only which one goes first and which one the one-off structural checks (the stage
// scale, the stagger sample, the cross-preference comparison) run against. Default
// `berau-leader`, in a deliberate disagreement with gh#56's `gems-leader`: that script
// defaults to the brand whose ledger is at its maximum, and here there is no maximum to
// pick, so the default is the first leader deck in the shared table and the two scripts
// between them start on both.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";
// The brand and deck-set table, imported for the same reason `./lib/variant-arg.mjs`
// imports it: it is plain data with no imports, so bare Node's type stripping resolves
// it standalone, and WHICH variants are leader decks stays its answer.
import { VARIANTS } from "../src/deck-variants.ts";
// The module under test. Imported for CROSS-CHECKS ONLY — every claim below is asserted
// against a measured rect first, and these constants are then held against that
// measurement. Nothing here is used as the floor, the margin, the gutter or the ceiling.
//
// IT IS IMPORTABLE ON PURPOSE. `chicken-egg-geometry.ts` documents the three-way
// measurement that forced it (no `./geometry` import, the stage facts pinned through a
// type-only `import()` instead) and gives bare-Node importability as the reason: "a
// geometry module a harness cannot import is a geometry module nothing measures". This
// is the harness that claim was made for.
//
// `./content.ts` is deliberately NOT imported, for gh#56's two reasons: bare Node cannot
// resolve its `@/`-aliased imports, and a harness that asserts the strings it imports
// proves only that the content module equals itself. Every string below is transcribed
// from issue #57's AC and spec §6.7.
import {
  CARD_EYEBROW_TOP,
  CARD_HEIGHT,
  CARD_MEASURE,
  CARD_PAD,
  CARD_TOP,
  CLAUSE_HEIGHT,
  COLUMN_GAP,
  COLUMN_TOP,
  CONSTRAINT_COUNT,
  CONSTRAINT_ROW_CAPACITY,
  CONTENT_WIDTH,
  COST_COUNT,
  COSTS_EYEBROW_TOP,
  COST_ROWS_BOTTOM,
  COST_ROWS_TOP,
  COST_ROW_CAPACITY,
  DEADLOCK_CLAUSE_COUNT,
  EYEBROW_HEIGHT,
  LIST_ROW_HEIGHT,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  OFFER_COL_LEFT,
  OFFER_COL_W,
  RULE_TOP,
  SIDE_MARGIN,
  STAGE,
  STORY_COL_LEFT,
  STORY_COL_W,
  TURN_HEIGHT,
  TURN_TO_CARD,
  VERDICT_HEIGHT,
  VERDICT_TOP,
  WORKAROUND_HEIGHT,
  WORKAROUND_TOP,
  clauseTop,
  constraintRowTop,
  costRowTop,
} from "../src/slides/leader-invest/chicken-egg-geometry.ts";

// ───────────────────── the injections ─────────────────────

/**
 * Named style overrides, applied in the PAGE immediately before a pose is measured.
 *
 * IN THE PAGE AND NOT IN THE MODULE, and the difference is worth stating. gh#56 injected
 * its defect by editing `geometry.ts` and reverting; this sets the same properties the
 * renderer sets on the box the geometry module sized, which is exactly what a narrower
 * `STORY_COL_W` or `CARD_PAD` — or a `prose()` register that grew a `nowrap` — produces for
 * that box, and it needs no edit to a tracked file to reproduce. It is applied per pose
 * because React rewrites the style attribute on every re-render.
 *
 * Each one exists to fire ONE channel and to be PASSED by another — see the report in this
 * file's header for what each one caught and what it did not.
 */
const INJECTIONS = {
  "workaround-560": { id: "chicken-egg-workaround", style: { width: "560px" } },
  "pilot-eyebrow-120": { id: "chicken-egg-pilot-eyebrow", style: { width: "120px" } },
  "verdict-830": { id: "chicken-egg-verdict", style: { width: "830px" } },
  "verdict-nowrap": { id: "chicken-egg-verdict", style: { whiteSpace: "nowrap" } },
  // NOT A LAYOUT DEFECT — this one breaks the AC directly, by making beat 3 no longer the
  // biggest prose on the slide. It is here because the check that claims to hold that
  // excluded the verdict from its own comparison until 2026-08-05 and passed on it.
  "verdict-18": { id: "chicken-egg-verdict", style: { fontSize: "18px" } },
};

const USAGE = [
  "Usage: node scripts/gh57-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>] [--inject=<name>]",
  "",
  `  --variant=<id>   Leader deck to measure FIRST. Default: berau-leader. Ids: ${VARIANT_IDS.join(", ")}`,
  "                   Both leader decks are always measured; a standard deck walks the",
  "                   whole deck and exits 1.",
  "  --reduced        Run under `prefers-reduced-motion: reduce`.",
  "  --out=<dir>      Where to write the shots. Default: /tmp/gh57",
  `  --inject=<name>  Break one box on purpose and prove a check bites. Names: ${Object.keys(INJECTIONS).join(", ")}`,
  "                   An injection run is EXPECTED to exit 1.",
  "",
  "  DECK_URL         Base url to render. Default: http://localhost:5173",
  "",
  "  This script does not boot a dev server. `npm run dev` first.",
].join("\n");

const { variant: parsedVariant, flags, values } = parseVariantArgOrExit(
  process.argv.slice(2),
  USAGE,
  { booleans: ["reduced"], values: ["out", "inject"] },
);

// The shared parser defaults to `general`, which composes no `invest` run. An explicit
// `--variant` always wins.
const PRIMARY = process.argv.slice(2).some((a) => a.startsWith("--variant"))
  ? parsedVariant
  : "berau-leader";
const REDUCED = flags.reduced;
const OUT = values.out ?? (REDUCED ? "/tmp/gh57-reduced" : "/tmp/gh57");
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
const INJECT_NAME = values.inject ?? null;
if (INJECT_NAME != null && INJECTIONS[INJECT_NAME] == null) {
  console.error(`error: unknown --inject \`${INJECT_NAME}\`.\n`);
  console.error(USAGE);
  process.exit(1);
}
const INJECT = INJECT_NAME ? INJECTIONS[INJECT_NAME] : null;
mkdirSync(OUT, { recursive: true });

/** Every leader variant, PRIMARY first — derived from the shared table, so a third
 *  leader brand is measured without an edit here. */
const LEADER_VARIANTS = [
  ...(VARIANTS[PRIMARY]?.deckSet === "leader" ? [PRIMARY] : []),
  ...Object.values(VARIANTS)
    .filter((v) => v.deckSet === "leader" && v.id !== PRIMARY)
    .map((v) => v.id),
];

const url = (variant, params = {}) => deckUrl(BASE, variant, params);

// ───────────────────── what the slide must SAY ─────────────────────
//
// SECOND COPIES ON PURPOSE, gh#53's, gh#54's and gh#56's rule: a harness that imports
// the strings it asserts proves only that the content module equals itself. These are
// transcribed from issue #57's own AC and body — the source the copy module was written
// from — so a silent edit to either side fails here.

/**
 * BEAT 1 — the two clauses of the deadlock, from the issue's beat list ("no budget
 * without proof, no proof without budget").
 *
 * COMPARED CASE-INSENSITIVELY, and that is a deliberate loosening of exactly one thing.
 * The issue writes the deadlock in running prose and the SHOUTED spelling is the mono
 * label register's decision (`ChickenEggBeats.tsx`'s `mono()` sets
 * `textTransform: uppercase`), so a comparison against the issue's words may not also
 * be a comparison against a register the issue never chose. `invest-chicken-egg.test.tsx`
 * pins the literal caps; what is asserted here is that the RENDERED clauses are the
 * issue's two, in the issue's order.
 */
const CLAUSES = ["no budget without proof", "no proof without budget"];

/**
 * BEAT 2's four costs — the issue's own list, in the issue's order.
 *
 * "work lost mid-stream · no audit trail · data outside the boundary · usage invisible
 * to the people who later have to approve it". Case-insensitive for the reason above:
 * sentence case is the copy module's (`LineItem`'s doc says so) and the unit test pins
 * the initial capital. THE ORDER IS PART OF THE CLAIM — §6.7's order is an escalation of
 * whose problem each cost is, and a bill sorted by length stops landing on the room.
 */
const COSTS = [
  "work lost mid-stream",
  "no audit trail",
  "data outside the boundary",
  "usage invisible to the people who later have to approve it",
];

/**
 * BEAT 3, VERBATIM — the one string the issue gives as a finished sentence, and the one
 * the whole slide exists to end on: "It worked. Management was convinced. Full
 * investment was released."
 *
 * ASSERTED EXACTLY, unlike the two lists above, because the issue prints it as copy
 * rather than as a description of copy.
 */
const VERDICT = "It worked. Management was convinced. Full investment was released.";

/**
 * BEAT 4 — what the turn and the card have to name, as substrings.
 *
 * NOT A VERBATIM COMPARISON, and the reason is that the issue and the stage disagree on
 * purpose. §6.7 phrases the turn as "you are the person who can skip beats 1–3" — the
 * spec's own numbering of this slide's beats, which the room is never shown — and the
 * copy prints "skip all three" instead. So the assertions are: the turn is addressed to
 * the room ("you are"), it offers to skip, and it does NOT leak the spec's numbering.
 * The card's four terms and its clock are the AC's own words and are checked as such.
 */
const TURN_MUST_NAME = [/\byou are\b/i, /\bskip\b/i];
const TURN_MUST_NOT_NAME = [/\bbeats?\s*1/i, /\bbeats 1–3\b/i];
const PILOT_MUST_NAME = [/\b30-day\b/i, /\bproof pilot\b/i];
const TERMS_MUST_NAME = [
  /\bseats\b/i,
  /\bone named use case each\b/i,
  /\bkill criterion\b/i,
  /\bspend cap\b/i,
];

/**
 * The claim this slide may never make (AC 5), as one rule over everything the stage
 * says.
 *
 * The vendor list and the enforcement vocabulary are the issue's own. `\b`-anchored, so
 * `strict` cannot fire on "restrict" and the rule is safe to hold over every rendered
 * string rather than over a chosen few. HELD ON THE COMPOSED DECK, which is the claim
 * the unit test cannot make: it renders the slide directly, and a deck could in
 * principle wrap it in chrome or a resolver that named a vendor.
 */
const FORBIDDEN =
  /\b(chatgpt|openai|anthropic|claude|gemini|google|copilot|microsoft|lenient|leniency|not strict|less strict|strict|unenforced|enforcement|blind eye|looks the other way|tolerated|got away)\b/i;

/** The positive control for the rule above — a string it MUST match, so a rule that had
 *  been loosened into catching nothing cannot pass by finding nothing. */
const FORBIDDEN_CONTROL = "ChatGPT seems not strict about enforcement";

/**
 * The label the figure carries, transcribed.
 *
 * A SECOND COPY of authored copy, which the issue does not give — so this is the one
 * string here whose only other home is `content.ts`. It is transcribed rather than
 * imported anyway, for the same reason as everything else in this block, and it is worth
 * having because the composed FIGURE and the LABEL are printed by two different
 * mechanisms: the letter and the number are derived (§3.5) and the label is authored, so
 * a harness that checked only "the fig-label starts with D.2" would pass a slide that
 * printed the sibling's label beside this slide's number.
 */
const FIG_LABEL = "— FIG. D.2·THE DEADLOCK, AND WHO CAN SKIP IT";

/**
 * The composed position, and it is a harness INPUT rather than a claim the slide makes.
 *
 * §3.5 derives both the letter and the index from what the deck holds, and no rendered
 * string under `src/slides/leader-invest/` may name either. Both leader decks run
 * `title · a1 · gap-capability-ladder · shape-agentic-org · f8-your-agentic-os ·
 * invest-own-proof · invest-chicken-egg`, so this slide is index 6 and D.2 — one number
 * behind §6.7's D.3, because §6.7 describes the finished section and `invest-base-rates`
 * is unbuilt. ASSERTED AS LITERALS WITH A KNOWN EXPIRY, which is the point: the day D.1
 * lands in front of this run, these two lines must fail and be updated, and a harness
 * that accepted any index and any letter would not notice a run that composed into the
 * wrong section.
 */
const DECK_INDEX = 6;
const FIGURE_PREFIX = "— FIG. D.2·";

/** Which slide is which, by a testid that is on the stage AT POSE 0. Every box on this
 *  slide is mounted at every pose (`Reveal` renders unconditionally and gates only its
 *  `on`), so the first clause is a safe marker — but it is pose 0's on purpose, the same
 *  choice `scripts/gh56-verify.mjs` documents for `e12`. */
const MARKER = "chicken-egg-clause-0";

// ───────────────────── the tiers ─────────────────────

/**
 * The colour ladder `ChickenEggBeats.tsx`'s `TIER` table claims, RESOLVED THROUGH THE
 * CASCADE and recomputed here rather than transcribed as luminances.
 *
 * The token NAMES are the transcription; the numbers are measured off a probe element
 * appended to the live stage, so a retuned `globals.css` moves this audit with it. That
 * is the direction the previous ticket got wrong: gh#56's sibling table stated four
 * brightness claims computed by hand and three were wrong.
 */
const TIER_TOKENS = [
  "--neutral-50",
  "--neutral-100",
  "--neutral-200",
  "--neutral-300",
  "--neutral-400",
  "--neutral-900",
  "--copper-200",
  "--copper-400",
  "--copper-700",
];

/** The tier beat 3 must own alone under the headline row, and the tier the headline
 *  itself takes. Names only — the luminances are measured. */
const VERDICT_TIER = "--neutral-100";
const HEADLINE_TIER = "--neutral-50";
/**
 * The tier both of this slide's eyebrows take, and the one tier on the stage that sits UNDER
 * `--neutral-300` — so this is expected to be the QUIETEST text tier here.
 *
 * NAMED FOR THE ROLE AND NOT "EXEMPT", because the tree documents no copper exemption. The
 * floor the deck ENFORCES is the grey list in `scripts/projection-test.mjs`, and it names
 * `--neutral-400` (`rgb(115, 115, 115)`) alone. What justifies `--copper-400` here is
 * PRECEDENT: it is the tier `src/components/KeywordHighlight.tsx` renders every copper italic
 * in every deck at (`text-copper-400`), and the mono LABEL tier of `ProofLedger.tsx`'s
 * eyebrow and `PillarOrbit.tsx`'s kicker — both 11px mono caps, same call as these two.
 * NOT `globals.css`'s `em.kw`: that rule resolves a different token (`--copper-300`, which is
 * ABOVE `--neutral-300`) and nothing under `src/` emits `class="kw"`, so it paints nothing.
 */
const EYEBROW_TIER = "--copper-400";
/** gh#50's out-of-bounds tier for text on this stage. No role may take it. */
const OUT_OF_BOUNDS_TIER = "--neutral-400";

/** Deck CHROME, excluded from the run audit by name and with the reason — gh#53's
 *  finding. `.nav-zone` holds the NavBar's 9px counters on every slide of every deck (61 in
 *  a leader deck, 65 and 63 in the standard ones) and `.fig-label .dot` is the `·` between a
 *  figure reference and its label; neither is projected copy and both are `--copper-700`.
 *  Everything else inside the stage is audited, this slide's headline and its derived figure
 *  reference included. */
const CHROME = [".nav-zone", ".fig-label .dot"];

// ───────────────────── timing ─────────────────────

/** Mount, before the first measurement — the app booting and the fonts landing. Pose 0
 *  has a 120/210ms stagger of its own and nothing else to wait for. */
const MOUNT_MS = 800;

/**
 * After a pose change, before anything is measured as "at rest".
 *
 * 1700 normal, and it is the measured finish plus a margin rather than a round number.
 * Pose 1 is the long one BECAUSE it carries two beats: the rule's reveal starts at
 * `120 + 6 × 90` = 660ms and runs a 600ms `scaleX` (ends 1260), and the verdict's starts
 * at `120 + 7 × 90` = 750ms and runs a 450ms transition plus a 500ms `fadeReveal` (ends
 * 1250). 1000 under `reduce`: both durations are squashed to 0.01ms but THE DELAY IS NOT
 * (see the header), so the verdict still lands at ≈754ms — measured. The reduced budget
 * is deliberately too short to hide a transition that was never squashed.
 */
const POSE_MS = REDUCED ? 1000 : 1700;

/** The per-frame sampler's ceiling, and the deadline it fails on rather than passing. A
 *  pose that has not begun in 2600ms has not begun. */
const SAMPLE_MS = 2600;

/**
 * How close a rendered edge can be asked to sit to a geometric one: 1/64px. Chromium
 * lays out in `LayoutUnit`s of 1/64px and truncates toward zero on the way in, so a box
 * the module puts at a fractional coordinate can render nowhere else. Any wider a
 * tolerance would start hiding real drift.
 */
const SUBPIXEL = 1 / 64;

/** Text is allowed to sit 1px from an edge it must not cross. A `Range` box includes the
 *  glyph's own side bearings, so sub-pixel equality here would be a claim about the
 *  face's hinting and not about the layout. */
const TEXT_SLACK = 1;

// ───────────────────── the harness ─────────────────────

let failures = 0;
let checks = 0;
const failed = [];
function check(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  checks += 1;
  if (!pass) {
    failures += 1;
    failed.push(label);
  }
  console.log(
    `${pass ? "ok  " : "FAIL"}  ${label}${
      pass
        ? ""
        : `\n        expected ${JSON.stringify(expected)}\n        actual   ${JSON.stringify(actual)}`
    }`,
  );
}

const n2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const lower = (s) => (s ?? "").replace(/\s+/g, " ").trim().toLowerCase();

/** WCAG relative luminance, so the colour claim is one number rather than a list of
 *  allowed strings. Duplicated inside the page below — an `evaluate` callback cannot
 *  close over this one. */
function relativeLuminance(color) {
  const c = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!c) return null;
  const lin = c.slice(1, 4).map((v) => {
    const s = Number(v) / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function overlaps(a, b) {
  return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
}

/**
 * Walk the WHOLE deck once and record, per index, the derived figure caption and whether
 * this slide's marker is on the stage.
 *
 * A FULL WALK AND NOT A SEARCH, which is the difference that makes "exactly one slide in
 * this deck prints D.2" mean something: a loop that stopped at the first match would pass
 * a deck holding two. It is also how the index is DISCOVERED — §3 derives every position
 * and the rest of Phase 6 inserts three more `invest` slides — so the literal 6 above is
 * checked against a walk rather than used to find the slide.
 */
async function harvestDeck(page, variant, slideCount) {
  const rows = [];
  for (let i = 0; i < slideCount; i++) {
    for (const attempt of [1, 2]) {
      try {
        await page.goto(url(variant, { slide: i }), { waitUntil: "domcontentloaded" });
        break;
      } catch (err) {
        if (attempt === 2) throw err;
        await page.waitForTimeout(400);
      }
    }
    await page.waitForTimeout(90);
    rows.push(
      await page.evaluate((marker) => ({
        fig: document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
        here: document.querySelector(`[data-testid="${marker}"]`) != null,
      }), MARKER),
    );
  }
  return rows.map((r, i) => ({ index: i, ...r }));
}

/**
 * Everything this slide is, at the pose it is currently on, in STAGE COORDINATES.
 *
 * ONE `evaluate`, because every rect and every computed style has to come from the same
 * layout: measuring the boxes in one round trip and the nav zone in the next is how a
 * harness reports a clearance that no single frame ever had.
 */
function measure(page, ids, tokens, inject) {
  return page.evaluate(
    ({ ids, tokens, chrome, inject }) => {
      const stage = document.querySelector('[data-testid="slide"]');
      const wrap = document.querySelector(".stage-wrap");
      const t = getComputedStyle(wrap).transform;
      // `min(w/1280, h/720)` as the browser actually applied it. `undefined` and not `""`
      // for the identity case: `new DOMMatrixReadOnly("")` is not identity.
      const m = new DOMMatrixReadOnly(t === "none" ? undefined : t);
      const scale = m.a;
      const origin = stage.getBoundingClientRect();
      const at = (id) => document.querySelector(`[data-testid="${id}"]`);

      // THE INJECTION, applied here so it is inside the same layout everything else is
      // measured in, and re-applied every pose because React rewrites `style` on each
      // render.
      if (inject) {
        const victim = at(inject.id);
        if (victim) Object.assign(victim.style, inject.style);
        void stage.offsetHeight;
      }

      /** A client rect, divided out of the stage's scale and offset. */
      const conv = (r) =>
        r == null
          ? null
          : {
              left: (r.left - origin.left) / scale,
              right: (r.right - origin.left) / scale,
              top: (r.top - origin.top) / scale,
              bottom: (r.bottom - origin.top) / scale,
              width: r.width / scale,
              height: r.height / scale,
            };
      const rect = (el) => (el ? conv(el.getBoundingClientRect()) : null);
      /** An element's CONTENT box — the edge a run has to fit inside. */
      const contentRect = (el) => {
        if (!el) return null;
        const r = rect(el);
        const cs = getComputedStyle(el);
        const px = (p) => parseFloat(cs[p]) || 0;
        return {
          left: r.left + px("borderLeftWidth") + px("paddingLeft"),
          right: r.right - px("borderRightWidth") - px("paddingRight"),
          top: r.top + px("borderTopWidth") + px("paddingTop"),
          bottom: r.bottom - px("borderBottomWidth") - px("paddingBottom"),
        };
      };
      const lum = (color) => {
        const c = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!c) return null;
        const lin = c.slice(1, 4).map((v) => {
          const s = Number(v) / 255;
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
      };
      /** The opacity a room actually sees: every ancestor's, multiplied. */
      const effectiveOpacity = (el) => {
        let o = 1;
        for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
          o *= parseFloat(getComputedStyle(a).opacity);
        }
        return o;
      };
      /** Every text node under `el`, with its own `Range` geometry. */
      const textNodesOf = (el) => {
        const out = [];
        const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = w.nextNode(); n; n = w.nextNode()) {
          if (!n.textContent.trim()) continue;
          out.push(n);
        }
        return out;
      };
      /**
       * A box's rendered LINE COUNT, and the extent of its type.
       *
       * GROUPED BY LINE-BOX TOP, which is the part a naive count gets wrong: the
       * workaround is one `<p>` holding five text nodes in two colours, so counting
       * `getClientRects()` over the whole box returns 5 for a box that renders ONE line.
       * The line count is the number of distinct tops, and the extent is the union.
       */
      const typeOf = (el) => {
        const nodes = textNodesOf(el);
        if (!nodes.length) return null;
        const rects = [];
        for (const n of nodes) {
          const r = document.createRange();
          r.selectNodeContents(n);
          for (const q of r.getClientRects()) if (q.width > 0) rects.push(q);
        }
        if (!rects.length) return null;
        const tops = [...new Set(rects.map((q) => Math.round(q.top * 4) / 4))].sort((a, b) => a - b);
        const byLine = tops.map((top) => {
          const on = rects.filter((q) => Math.round(q.top * 4) / 4 === top);
          return {
            top: (top - origin.top) / scale,
            left: (Math.min(...on.map((q) => q.left)) - origin.left) / scale,
            right: (Math.max(...on.map((q) => q.right)) - origin.left) / scale,
          };
        });
        return {
          lines: tops.length,
          left: Math.min(...byLine.map((l) => l.left)),
          right: Math.max(...byLine.map((l) => l.right)),
          widestLine: Math.max(...byLine.map((l) => l.right - l.left)),
          byLine,
        };
      };

      /**
       * The deck's own colour ladder, resolved through the cascade rather than transcribed
       * — so a retuned `globals.css` moves the audit with it.
       *
       * A FRESH PROBE PER TOKEN, AND TRANSITIONS KILLED ON IT, AND BOTH ARE LOAD-BEARING
       * UNDER `reduce`. The obvious shape — one probe, re-coloured in a loop — is WRONG the
       * moment `prefers-reduced-motion: reduce` is on, and it fails silently in the worst
       * possible direction. `globals.css`'s global rule sets `transition-duration: 0.01ms
       * !important` on `*`, and `transition-property` defaults to `all`, so under `reduce`
       * every element on the page has a live transition on `color`. `getComputedStyle`
       * immediately after an assignment then returns the value the element is transitioning
       * FROM. Measured on 2026-08-05:
       *
       *   normal   a bare div has transition-property `all`, duration `0s`
       *            one probe re-coloured → 245,245,245 · 229,229,229 · 163,163,163 · 201,133,72
       *   reduce   a bare div has transition-property `all`, duration `1e-05s`
       *            one probe re-coloured → 245,245,245 · 245,245,245 · 245,245,245 · 245,245,245
       *
       * i.e. under `reduce` every token after the first reports the PREVIOUS token's colour,
       * so the whole ladder collapses onto whatever was read first. A luminance gate built on
       * that probe does not fail — it passes, with its floor moved. This is not hypothetical:
       * it is what this script did on its first `--reduced` run, and the ladder assertion
       * above is what caught it.
       */
      const tiers = {};
      for (const name of tokens) {
        const probe = document.createElement("div");
        // Belt and braces: an inline `!important` outranks the author `!important` in the
        // media query, so this probe has no transition even if it is ever reused.
        probe.style.setProperty("transition", "none", "important");
        probe.style.color = `var(${name})`;
        stage.appendChild(probe);
        tiers[name] = getComputedStyle(probe).color;
        probe.remove();
      }

      /**
       * One entry per box this slide owns.
       *
       * THE RULE IS THE ODD ONE AND IT IS HANDLED BY NAME, not by luck: its testid is on
       * a plain positioned wrapper because `CopperRule` spreads no `data-*` props
       * (`ChickenEggBeats.tsx` records why widening a primitive 29 modules import was out
       * of the ticket's blast radius). So the reveal is on the `.copper-rule` CHILD, and
       * it is a `scaleX` transform rather than an opacity. A harness that read the
       * wrapper's own class and opacity would report beat 3's rule as revealed at every
       * pose including pose 0.
       */
      const box = (id) => {
        const el = at(id);
        if (!el) return { mounted: false };
        const inner = el.classList.contains("fade") ? el : el.querySelector(".copper-rule");
        const cs = getComputedStyle(el);
        const ics = inner ? getComputedStyle(inner) : null;
        const isRule = inner != null && inner !== el;
        return {
          mounted: true,
          revealTarget: isRule ? "copper-rule" : "self",
          on: inner ? inner.classList.contains("on") : false,
          // WHAT "REVEALED" MEANS for this box: an opacity for a `.fade`, a horizontal
          // scale for the rule. One number either way, so the completeness assertions
          // read the same for all 17 boxes.
          reveal: isRule ? new DOMMatrixReadOnly(ics.transform).a : parseFloat(ics?.opacity ?? cs.opacity),
          opacity: parseFloat(cs.opacity),
          effOpacity: effectiveOpacity(el),
          // The `.fade` translates 8px on the way in; the settled frame is the identity,
          // and a pose left mid-transition shows up here as well as in the opacity.
          translateY: isRule
            ? 0
            : cs.transform === "none"
              ? 0
              : new DOMMatrixReadOnly(cs.transform).f,
          text: el.textContent,
          rect: rect(el),
          content: contentRect(el),
          type: typeOf(el),
          color: cs.color,
          fontSize: parseFloat(cs.fontSize),
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          scrollH: el.scrollHeight,
          clientH: el.clientHeight,
          declaredWidth: el.style.width,
        };
      };
      const boxes = {};
      for (const id of ids) boxes[id] = box(id);

      /**
       * Every text RUN on the stage, at text-node granularity.
       *
       * TEXT NODES AND NOT ELEMENTS, which is `projection-test.mjs`'s decision and the
       * right one twice over here: the workaround is one `<p>` holding five runs in two
       * colours, so an element-level walk would read the `<p>`'s own colour and miss both
       * `em.kw` spans — and the CARD and the RULE WRAPPER carry no glyph at all, so an
       * element-level walk reads the `--neutral-50` they inherit from `body` and reports
       * the headline's tier twice, below the headline row. See `elements` below, which is
       * that walk, kept as this one's positive control.
       */
      const runs = [];
      const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent.trim();
        if (!text) continue;
        const el = n.parentElement;
        if (!el) continue;
        const isChrome = chrome.some((sel) => el.closest(sel));
        const cs = getComputedStyle(el);
        const range = document.createRange();
        range.selectNodeContents(n);
        const lineRects = [...range.getClientRects()].filter((q) => q.width > 0);
        const tbox = range.getBoundingClientRect();
        if (!tbox.width) continue;
        const owner = el.closest("[data-testid]");
        runs.push({
          chrome: isChrome,
          owner: owner?.dataset.testid ?? null,
          tag: el.tagName,
          keyword: el.matches("em"),
          text: text.length > 46 ? `${text.slice(0, 43)}…` : text,
          fullText: text,
          size: Math.round(parseFloat(cs.fontSize) * 100) / 100,
          mono: /mono/i.test(cs.fontFamily),
          color: cs.color,
          luminance: lum(cs.color),
          fragments: lineRects.length,
          rects: lineRects.map(conv),
          textBox: conv(tbox),
          // An INLINE box reports 0 for both, by definition, so the comparison is vacuous
          // there and is skipped rather than passed.
          blockish: el.clientWidth > 0,
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          effOpacity: effectiveOpacity(el),
        });
      }

      /**
       * THE ELEMENT-LEVEL COLOUR WALK, which exists to FAIL the claim the run walk makes
       * — and is kept for exactly that reason.
       *
       * Every element inside the stage with a computed `color`, and whether it paints any
       * glyph of its own. The textless ones report an INHERITED colour, and on this slide
       * two of them (the card and the rule's wrapper) inherit the headline's tier while
       * painting a `--copper-700` border and background. This is the vacuous version of
       * assertion 3, measured, so the audit can prove it walked the right granularity
       * rather than merely passing.
       */
      const elements = [];
      for (const el of stage.querySelectorAll("*")) {
        if (chrome.some((sel) => el.closest(sel))) continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const cs = getComputedStyle(el);
        const ownText = [...el.childNodes].some(
          (n) => n.nodeType === 3 && n.textContent.trim().length > 0,
        );
        elements.push({
          testid: el.dataset?.testid ?? null,
          tag: el.tagName,
          ownText,
          color: cs.color,
          luminance: lum(cs.color),
          rect: conv(r),
        });
      }

      return {
        scale,
        stage: { width: origin.width / scale, height: origin.height / scale },
        // MEASURED, not read from the geometry module — this is the floor.
        navZone: rect(document.querySelector(".nav-zone")),
        navZoneCount: document.querySelectorAll(".nav-zone").length,
        // The deck's own side margins, as the chrome draws them.
        marginBand: rect(document.querySelector(".fig-label")),
        headlineRow: rect(document.querySelector(".slide-headline-row")),
        headline: document.querySelector("h1.slide-headline")?.textContent ?? null,
        headlineColor: (() => {
          const h = document.querySelector("h1.slide-headline");
          return h ? getComputedStyle(h).color : null;
        })(),
        figLabel:
          document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
        slideIndex: stage.dataset.slideIndex,
        // The DECLARED pose count, read off the NavBar's own step counter — the first
        // `.nav-group-count` is `NN / TT` for the step group. Discovered rather than
        // hardcoded, so a fifth pose added to the slide def is walked.
        stepCounter: document.querySelector(".nav-group-count")?.textContent ?? null,
        // Every testid this slide put on the stage, so REQUIRED can be checked as a SET
        // rather than only looked up.
        present: [...stage.querySelectorAll('[data-testid^="chicken-egg-"]')].map(
          (e) => e.dataset.testid,
        ),
        tiers,
        boxes,
        runs,
        elements,
        // The whole DOCUMENT, not the slide's subtree: the claim is that this slide
        // introduces no SMIL anywhere, chrome included.
        smil: document.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
          .length,
        // AND THE `<svg>` CENSUS, STATED THE WAY THE COMPONENT STATES IT: the stage has
        // six and they are the NavBar's chevrons. What this slide claims is the count
        // OUTSIDE `.nav-zone`.
        svgTotal: document.querySelectorAll("svg").length,
        svgInNav: document.querySelectorAll(".nav-zone svg").length,
        svgOutsideNav: [...document.querySelectorAll("svg")].filter((s) => !s.closest(".nav-zone"))
          .length,
        // Everything the stage says, minus the chrome — the input to the copy rules and
        // to the cross-preference comparison.
        stageText: (() => {
          const clone = stage.cloneNode(true);
          for (const el of clone.querySelectorAll(".nav-zone")) el.remove();
          return (clone.textContent ?? "").replace(/\s+/g, " ").trim();
        })(),
      };
    },
    { ids, tokens, chrome: CHROME, inject: INJECT },
  );
}

/**
 * Install a per-FRAME sampler, press one key, and return every box's arrival timeline.
 *
 * PER FRAME AND INSIDE THE PAGE, not a poll from Node. gh#56 polls `page.evaluate` every
 * 16ms, which costs a round trip per sample and can only report "the first frame this
 * harness happened to see"; the sharper claim this ticket needs — that the verdict STARTS
 * after the last cost, and how long the bill stands alone — needs the frames themselves.
 * `requestAnimationFrame` inside the page gives them, and t=0 is the keydown the page
 * itself saw rather than a wall-clock guess from outside.
 *
 * `t0 == null` after the press is a FAILURE and not a pass: a sampler that never started
 * would report an empty timeline, and every claim below it is a "found nothing".
 */
async function sampleArrivals(page, ids, key) {
  await page.evaluate(
    ({ ids, limit }) => {
      window.__gh57 = { samples: [], t0: null };
      const S = window.__gh57;
      window.addEventListener(
        "keydown",
        () => {
          if (S.t0 == null) S.t0 = performance.now();
        },
        { capture: true, once: true },
      );
      const tick = () => {
        if (S.t0 != null) {
          const t = performance.now() - S.t0;
          const row = { t: Math.round(t * 10) / 10 };
          for (const id of ids) {
            const el = document.querySelector(`[data-testid="${id}"]`);
            if (!el) {
              row[id] = null;
              continue;
            }
            const inner = el.classList.contains("fade") ? el : el.querySelector(".copper-rule");
            if (!inner) {
              row[id] = null;
              continue;
            }
            const cs = getComputedStyle(inner);
            row[id] =
              inner === el
                ? Math.round(parseFloat(cs.opacity) * 1000) / 1000
                : Math.round(new DOMMatrixReadOnly(cs.transform).a * 1000) / 1000;
          }
          S.samples.push(row);
          if (t > limit) return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    { ids, limit: SAMPLE_MS },
  );
  await page.keyboard.press(key);
  await page.waitForTimeout(SAMPLE_MS + 300);
  return page.evaluate(() => window.__gh57);
}

/** The first sampled time at which `id` is past `threshold`, or null. */
const firstAt = (samples, id, threshold) => samples.find((s) => s[id] > threshold)?.t ?? null;

// ───────────────────── the browser ─────────────────────

const browser = await chromium.launch();

/**
 * BEAT 1's OWN t=0, captured before the app boots.
 *
 * Pose 0 is the one pose no keypress triggers: its two clauses carry `on` hardcoded true,
 * so they are inserted already wearing `.fade.on`, and what reveals them is `fadeReveal`'s
 * `both` fill through a 120/210ms `animationDelay`. There is no event outside the page to
 * time that from, so this records the frame the first clause ENTERS THE DOM. Installed as
 * an init script because it has to be running before React's first commit; it disconnects
 * on the first match and gives up after 5s, so the 61-slide harvest pays nothing for it.
 *
 * A HARNESS THAT TIMED POSE 0 FROM A SETTLED PAGE would report the round-trip latency of
 * its own `evaluate` call — ≈8ms — and print it as a settle time. That is what the first
 * version of this script did.
 */
const MOUNT_MARKER = async (ctx, marker) =>
  ctx.addInitScript((id) => {
    window.__gh57mount = null;
    // `document`, NOT `document.documentElement`: an init script runs before the parser has
    // built anything, so `documentElement` can be null and observing it throws — which the
    // first version of this did, leaving `__gh57mount` null forever and hanging the poll
    // that waits for it. The poll now has its own deadline as well, so a marker that never
    // fires FAILS instead of never returning.
    const observer = new MutationObserver(() => {
      if (window.__gh57mount == null && document.querySelector(`[data-testid="${id}"]`)) {
        window.__gh57mount = performance.now();
        observer.disconnect();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }, marker);

/** The context this script measures in — the motion preference `--reduced` picks. */
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  ...(REDUCED ? { reducedMotion: "reduce" } : null),
});
await MOUNT_MARKER(context, MARKER);
const page = await context.newPage();

const noise = [];
/** Vite's HMR socket, which drops when this harness navigates the deck looking for the
 *  slide, and React's devtools nudge. Both are the dev SERVER talking, not the deck, and
 *  neither exists on a deployment. Nothing else is filtered. */
const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]|Download the React DevTools/;
const watchConsole = (p, tag) => {
  p.on("console", (m) => {
    if ((m.type() === "error" || m.type() === "warning") && !DEV_SERVER_NOISE.test(m.text())) {
      noise.push(`${tag}${m.type()}: ${m.text()}`);
    }
  });
  p.on("pageerror", (e) => noise.push(`${tag}pageerror: ${e.message}`));
};
watchConsole(page, "");

const stage = page.locator('[data-testid="slide"]');
const shot = (name) => stage.screenshot({ path: `${OUT}/${name}.png` });

/**
 * Land on one slide, wait for the stage AND for the fonts, and SAY SO when the slide
 * cannot be reached.
 *
 * THE FONTS, not `networkidle`. Every width this script asserts is a text measurement,
 * so measuring before the webfont lands would measure the fallback — and the fallback is
 * a DIFFERENT layout here, not merely a narrower one: `chicken-egg-geometry.ts` measured
 * both faces, and the turn's keyword breaks in a different place in each. This asserts
 * which face it measured further down rather than assuming.
 *
 * THE RETRY is the one gh#53, gh#54 and gh#56 all carry, for the reason they give: this
 * harness navigates the deck 61 times in a row and Vite's dev server does not always keep
 * up. The DIAGNOSTIC is theirs too — a bare `waitFor` timeout says only "not visible".
 */
async function gotoSlide(p, variant, index, settle = 0) {
  for (const attempt of [1, 2, 3]) {
    try {
      await p.goto(url(variant, { slide: index }), { waitUntil: "domcontentloaded" });
      await p.locator('[data-testid="slide"]').waitFor({ timeout: 15000 });
      await p.evaluate(() => document.fonts.ready);
      if (settle) await p.waitForTimeout(settle);
      return;
    } catch (err) {
      if (attempt === 3) {
        const dump = await p
          .evaluate(() => ({
            url: location.href,
            stages: document.querySelectorAll('[data-testid="slide"]').length,
            root: document.getElementById("root")?.innerHTML.slice(0, 300) ?? null,
          }))
          .catch(() => null);
        console.error(`\ncould not reach ${variant} slide ${index}: ${err.message.split("\n")[0]}`);
        console.error(`  page: ${JSON.stringify(dump)}`);
        for (const n of noise) console.error(`  console · ${n}`);
        throw err;
      }
      await p.waitForTimeout(600);
    }
  }
}

if (INJECT) {
  console.log(
    `!!  DEFECT INJECTION \`${INJECT_NAME}\` — ${INJECT.id} forced to ${JSON.stringify(INJECT.style)}.\n` +
      `!!  This run is EXPECTED to fail. The failures below are the proof that the\n` +
      `!!  checks bite; the list at the bottom names which ones fired.\n`,
  );
}

// ───────────────── is this deck even holding the slide? ─────────────────

await page.goto(url(PRIMARY), { waitUntil: "domcontentloaded" });
const slideCount = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
const primaryHarvest = await harvestDeck(page, PRIMARY, slideCount);
const primaryRow = primaryHarvest.find((r) => r.here);
if (primaryRow == null) {
  console.error(
    `\`invest-chicken-egg\` is not in ${PRIMARY} (${slideCount} slides walked): this deck ` +
      `composes no \`invest\` run. The slide is leader-only (§4.3) and reaches the two ` +
      `leader deck sets alone — run --variant=${LEADER_VARIANTS[0] ?? "berau-leader"}.`,
  );
  await browser.close();
  process.exit(1);
}
console.log(
  `${PRIMARY} · ${slideCount} slides · the deadlock at index ${primaryRow.index}` +
    `${REDUCED ? " · prefers-reduced-motion: reduce" : " · normal motion"}\n` +
    `measuring both leader decks: ${LEADER_VARIANTS.join(", ")}\n`,
);

// ───────────────── the stage, the floor and the ladder ─────────────────

await gotoSlide(page, PRIMARY, primaryRow.index, MOUNT_MS);
const base = await measure(page, [], TIER_TOKENS, null);

// Every number below is a stage coordinate BECAUSE the conversion divides the scale out.
// This asserts the conversion had nothing to do, which is the only way to know the raw
// rects and the converted ones are the same numbers at this viewport.
check(
  "the 1280×720 viewport renders the stage 1:1",
  [base.scale, base.stage.width, base.stage.height],
  [1, 1280, 720],
);
check("exactly one .nav-zone on the stage", base.navZoneCount, 1);

// WHICH FACE THIS RUN MEASURED. `chicken-egg-geometry.ts`'s type table has two width
// columns — the webfont's and the fallback's — and they are not the same layout: the
// turn's copper keyword breaks in a different place in each. So every width this script
// prints is labelled with the face that produced it rather than left ambiguous.
const faces = await page.evaluate(() => ({
  loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family),
  serifOk: document.fonts.check('24px "Source Serif 4"'),
}));
check(
  `the deck's serif webfont is loaded, so these are the webfont widths — ${[...new Set(faces.loaded)].join(", ")}`,
  [faces.loaded.includes("Source Serif 4"), faces.serifOk],
  [true, true],
);

/** THE FLOOR, and the only one this script uses. Measured off `.nav-zone` itself. */
const NAV_TOP = base.navZone.top;
/** THE MARGINS, measured off the chrome that draws them. */
const MARGIN = { left: base.marginBand.left, right: base.marginBand.right };
/** THE CEILING. Both columns must start under the headline row the deck rendered. */
const HEADLINE_BOTTOM = base.headlineRow.bottom;
/** The colour ladder, as the cascade resolves it in this page. */
const TIERS = base.tiers;
const LUM = Object.fromEntries(
  Object.entries(TIERS).map(([name, rgb]) => [name, relativeLuminance(rgb)]),
);

console.log(
  `      .nav-zone measured  top ${n2(NAV_TOP)}  height ${n2(base.navZone.height)}\n` +
    `      margin band         ${n2(MARGIN.left)}…${n2(MARGIN.right)}  (.fig-label's own rect)\n` +
    `      headline row        ${n2(base.headlineRow.top)}…${n2(HEADLINE_BOTTOM)}\n` +
    `      the ladder, resolved through the cascade:\n` +
    TIER_TOKENS.map(
      (t) => `        ${t.padEnd(14)} ${TIERS[t].padEnd(20)} luminance ${LUM[t].toFixed(4)}`,
    ).join("\n"),
);

// The cross-checks the import is allowed to make: the module's restatements of the deck's
// CSS have to equal what the deck actually drew.
check(
  `geometry NAV_ZONE_TOP ${NAV_ZONE_TOP} equals the measured .nav-zone top`,
  NAV_ZONE_TOP,
  n2(NAV_TOP),
);
check(
  `geometry STAGE ${STAGE.width}×${STAGE.height} equals the measured stage`,
  [STAGE.width, STAGE.height],
  [n2(base.stage.width), n2(base.stage.height)],
);
check(
  `geometry SIDE_MARGIN ${SIDE_MARGIN} / CONTENT_WIDTH ${CONTENT_WIDTH} equal the measured margin band`,
  [SIDE_MARGIN, SIDE_MARGIN + CONTENT_WIDTH],
  [n2(MARGIN.left), n2(MARGIN.right)],
);
check(
  `geometry COLUMN_TOP ${COLUMN_TOP} is under the rendered headline row (${n2(HEADLINE_BOTTOM)})`,
  COLUMN_TOP >= HEADLINE_BOTTOM,
  true,
);
// THE PROBE'S OWN POSITIVE CONTROL, and it exists because the first `--reduced` run of
// this script failed here. Nine distinct tokens must resolve to nine distinct colours; a
// ladder where they collapse onto one is a probe reading a transition rather than a
// cascade (see `measure`'s `tiers` block for the measurement and the mechanism). Every
// colour claim below is built on this, so it is checked before any of them.
check(
  `tiers · the ${TIER_TOKENS.length} tokens resolve to ${TIER_TOKENS.length} DIFFERENT colours, so the probe read the cascade and not a transition`,
  new Set(TIER_TOKENS.map((t) => TIERS[t])).size,
  TIER_TOKENS.length,
);
// THE LADDER'S ORDER, MEASURED — the half `ChickenEggBeats.tsx`'s TIER table states as
// prose and gh#56's sibling got wrong three times out of four. Beat 3's tier is brighter
// than the two prose tiers, which are brighter than the clause tier, which is brighter
// than the list tier, which is brighter than the eyebrows' copper tier; and the headline
// outshines all of them.
check(
  `tiers · the ladder descends ${HEADLINE_TIER} ${LUM[HEADLINE_TIER].toFixed(4)} > ${VERDICT_TIER} ${LUM[VERDICT_TIER].toFixed(4)} > --neutral-200 ${LUM["--neutral-200"].toFixed(4)} > --copper-200 ${LUM["--copper-200"].toFixed(4)} > --neutral-300 ${LUM["--neutral-300"].toFixed(4)} > ${EYEBROW_TIER} ${LUM[EYEBROW_TIER].toFixed(4)}`,
  [
    LUM[HEADLINE_TIER] > LUM[VERDICT_TIER],
    LUM[VERDICT_TIER] > LUM["--neutral-200"],
    LUM["--neutral-200"] > LUM["--copper-200"],
    LUM["--copper-200"] > LUM["--neutral-300"],
    LUM["--neutral-300"] > LUM[EYEBROW_TIER],
    LUM[EYEBROW_TIER] > LUM[OUT_OF_BOUNDS_TIER],
  ],
  [true, true, true, true, true, true],
);

// ───────────────── the boxes this slide must mount ─────────────────
//
// DISCOVERED AND THEN PINNED AS A SET. A gate that measures what it finds passes a
// missing box by measuring one fewer; a gate that only looks up a transcribed list passes
// an EXTRA box nobody authored. So the ids are read off the stage, the two lists' counts
// are asserted against the AC's own four-and-four, and the whole set is then compared to
// the transcribed one.

const present = base.present;
const COST_IDS = present.filter((id) => id.startsWith("chicken-egg-cost-"));
const TERM_IDS = present.filter((id) => id.startsWith("chicken-egg-term-"));
const CLAUSE_IDS = present.filter((id) => /^chicken-egg-clause-\d+$/.test(id));

/** §6.7's four beats, as the boxes that carry them — the spine of every order assertion
 *  below. WRITTEN PER BEAT AND NOT PER POSE on purpose: there are four beats and four
 *  poses and they do NOT line up one to one, which is the whole subject of AC 3. */
const BEAT_1 = CLAUSE_IDS;
const BEAT_2 = ["chicken-egg-workaround", "chicken-egg-costs-eyebrow", ...COST_IDS];
const BEAT_3 = ["chicken-egg-rule", "chicken-egg-verdict"];
const BEAT_4 = ["chicken-egg-turn", "chicken-egg-card", "chicken-egg-pilot-eyebrow", ...TERM_IDS];
const BEATS = [BEAT_1, BEAT_2, BEAT_3, BEAT_4];
const REQUIRED = BEATS.flat();

check(
  `boxes · beat 1 is ${DEADLOCK_CLAUSE_COUNT} clauses, beat 2's bill is ${COST_COUNT} costs, beat 4's card is ${CONSTRAINT_COUNT} terms`,
  [CLAUSE_IDS.length, COST_IDS.length, TERM_IDS.length],
  [2, 4, 4],
);
check(
  "boxes · the stage holds exactly the 17 boxes the four beats need, and nothing else",
  [...present].sort(),
  [...REQUIRED].sort(),
);
check(
  "boxes · the bill's four rows are §6.7's four, in §6.7's order",
  COST_IDS,
  [
    "chicken-egg-cost-work-lost",
    "chicken-egg-cost-no-audit-trail",
    "chicken-egg-cost-data-outside-boundary",
    "chicken-egg-cost-usage-invisible",
  ],
);
check(
  "boxes · the card's four terms are the AC's four, in the AC's order",
  TERM_IDS,
  [
    "chicken-egg-term-seats",
    "chicken-egg-term-use-case",
    "chicken-egg-term-kill-criterion",
    "chicken-egg-term-spend-cap",
  ],
);

/** The `.fade` boxes each pose must have REVEALED, and by omission the ones it must still
 *  be holding back. The two clauses are in pose 0's list because they carry `on`
 *  hardcoded true — they arrive at mount, staggered, and never leave. */
const REVEALED_BY_POSE = [
  [...BEAT_1],
  [...BEAT_1, ...BEAT_2, ...BEAT_3],
  [...BEAT_1, ...BEAT_2, ...BEAT_3, "chicken-egg-turn"],
  [...REQUIRED],
];
/** Everything gated behind a pose — i.e. everything but beat 1. */
const GATED = REQUIRED.filter((id) => !BEAT_1.includes(id));

// ───────────────── the stagger, sampled per frame ─────────────────
//
// ONE BRAND, and stated rather than assumed: `LEAD_MS` and `STAGGER_MS` are constants in
// `ChickenEggBeats` and no brand axis reaches them, so sampling both would measure the
// same two numbers twice. The slide's no-brand-axis claim is settled separately, by
// diffing the two decks' rendered boxes.

const POSE_1_ORDER = [...BEAT_2, ...BEAT_3];
await gotoSlide(page, PRIMARY, primaryRow.index, MOUNT_MS);
const stagger = await sampleArrivals(page, POSE_1_ORDER, "Space");
check(
  `stagger · the per-frame sampler started and collected frames (${stagger.samples.length})`,
  [stagger.t0 != null, stagger.samples.length > 30],
  [true, true],
);

/**
 * THREE THRESHOLDS, because a reveal has three interesting moments and only one of them is
 * unambiguous.
 *
 *   · `begins` — the first frame past 0.02. THE ONLY ONE ORDER IS ASSERTED ON: it is the
 *     delay, plus one frame, and the easing has not touched it yet.
 *   · `completes` — the first frame past 0.979, i.e. "up, as far as a room can tell".
 *   · `settles` — the first frame past 0.9995, the closest this sampler can get to the
 *     declared end of the motion.
 *
 * `var(--ease)` is `cubic-bezier(0.16, 1, 0.3, 1)`, a hard ease-out, so `completes` lands a
 * long way before the declared end and the gap between `completes` and `settles` is the
 * tail of that curve rather than drift. This is also why the FINISH order is reported and
 * never asserted: the rule's 600ms `scaleX` and the verdict's 450ms opacity cross 0.979 in
 * the opposite order to their declared ends, and an assertion there would be an assertion
 * about the easing curve.
 */
const begins = Object.fromEntries(POSE_1_ORDER.map((id) => [id, firstAt(stagger.samples, id, 0.02)]));
const completes = Object.fromEntries(
  POSE_1_ORDER.map((id) => [id, firstAt(stagger.samples, id, 0.979)]),
);
const settles = Object.fromEntries(
  POSE_1_ORDER.map((id) => [id, firstAt(stagger.samples, id, 0.9995)]),
);
check(
  "stagger · every box in pose 1 began, completed and settled inside the sample window",
  POSE_1_ORDER.filter((id) => begins[id] == null || completes[id] == null || settles[id] == null),
  [],
);

// ── ARRIVAL ORDER · §6.7's beats, as the frames the browser drew ──
//
// STRICTLY ASCENDING FIRST-MOVEMENT TIMES, which is the falsifiable form of "the bill
// arrives before the verdict". The unit test compares `transitionDelay` strings; this
// compares the frames, so a delay the browser never applies — a box moved outside
// `.fade`, an `animationDelay` that lost its `transitionDelay` sibling — fails here and
// passes there.
const outOfOrder = [];
for (let i = 1; i < POSE_1_ORDER.length; i++) {
  const prev = POSE_1_ORDER[i - 1];
  const here = POSE_1_ORDER[i];
  if (!(begins[here] > begins[prev])) {
    outOfOrder.push(`${here} began at ${begins[here]}ms, ${prev} at ${begins[prev]}ms`);
  }
}
check(
  "ARRIVAL · pose 1 reveals in §6.7's order — confession, its label, the bill top to bottom, the rule, then beat 3",
  outOfOrder,
  [],
);
const lastCost = COST_IDS[COST_IDS.length - 1];
check(
  `ARRIVAL · beat 3's verdict starts ${n2(begins["chicken-egg-verdict"] - begins[lastCost])}ms AFTER the last cost, and is the last thing to move in its pose`,
  [
    begins["chicken-egg-verdict"] > begins[lastCost],
    POSE_1_ORDER.filter((id) => begins[id] > begins["chicken-egg-verdict"]),
  ],
  [true, []],
);

// ── THE WINDOW · how long pose 1 stands with the bill up and no verdict ──
//
// TWO WINDOWS, because "the bill is up" has two honest readings and they answer different
// questions. WINDOW A is the arrival order's own gap — the first cost starts moving until
// the verdict does — and it is the one the stagger sets. WINDOW B is the strict one: the
// bill is COMPLETE and the verdict has not finished arriving.
//
// WINDOW B IS DELIBERATELY MEASURED THE WAY THAT MAKES IT LARGEST: the bill counts as
// complete at the EARLY threshold (0.979) and the verdict only at the LATE one (0.9995).
// A claim of the form "this window is short" has to be measured against itself at its
// worst, or the threshold is doing the arguing.
//
// AND `reduce` DOES NOT SHORTEN IT. Both numbers are governed by the DELAY, which the
// global rule does not touch — under `reduce` the two collapse onto the stagger's own
// 2 × 90ms and under normal motion the eased transitions overlap to about the same gap.
const billComplete = Math.max(...COST_IDS.map((id) => completes[id]));
const windowA = begins["chicken-egg-verdict"] - Math.min(...COST_IDS.map((id) => begins[id]));
const windowB = settles["chicken-egg-verdict"] - billComplete;
console.log(
  `\n      POSE 1's TIMELINE, sampled per frame (${REDUCED ? "reduce" : "normal"}), ms after the keypress\n` +
    POSE_1_ORDER.map(
      (id) =>
        `        ${id.padEnd(40)} begins ${String(begins[id]).padStart(7)}  past 0.98 ${String(completes[id]).padStart(7)}  past 0.9995 ${String(settles[id]).padStart(7)}`,
    ).join("\n") +
    `\n        window A · first cost begins  → verdict begins  ${n2(windowA)}ms` +
    `\n        window B · bill past 0.98     → verdict settled ${n2(windowB)}ms  (measured at its widest)` +
    `\n        the verdict's own settle time                   ${n2(settles["chicken-egg-verdict"])}ms after the keypress`,
);
// THE WINDOW IS A TRANSIENT, AND THE ASSERTION IS THAT IT IS SHORT. Under `reduce` the
// verdict's transition is squashed to 0.01ms, so window B collapses onto the stagger's own
// 90ms×2 gap between the last cost and the verdict; under normal motion the two eased
// transitions overlap and it is the same gap again. Either way it is well under half a
// second, and a presenter cannot stop inside it — which is the difference between a
// transient and the resting state the AC forbids.
check(
  `WINDOW · pose 1 stands with a complete bill and no verdict for ${n2(windowB)}ms — a transient, not a resting state (< 500ms)`,
  windowB < 500,
  true,
);

// ── THE MID-FLIGHT SAMPLE, which is the reduced-motion claim's positive control ──
const midFlight = POSE_1_ORDER.flatMap((id) =>
  stagger.samples
    .filter((s) => s[id] > 0.02 && s[id] < 0.98)
    .map((s) => `${id.replace("chicken-egg-", "")}@${s.t}ms=${s[id]}`),
);
if (REDUCED) {
  // THE CLAIM: `reduce` squashes the durations, so no box is ever caught between its two
  // frames — each is either not yet arrived or fully arrived. The stagger DELAY still
  // runs, which is why the timeline above shows arrived and not-yet-arrived boxes side by
  // side and nothing in between.
  check(
    "MOTION · under reduce no box is ever caught mid-flight, across every sampled frame",
    midFlight,
    [],
  );
  check(
    `MOTION · and every box's begin and complete are the SAME frame, i.e. the transition was squashed and not merely fast`,
    POSE_1_ORDER.filter((id) => begins[id] !== completes[id]),
    [],
  );
} else {
  // THE POSITIVE CONTROL for the two lines above. If this sampler cannot catch a box in
  // flight when the transitions ARE running, the reduced run's empty list means nothing at
  // all — gh#54 records that its first version passed that claim vacuously.
  check(
    `MOTION · under normal motion the same sampler catches boxes in flight — ${midFlight.length} partial-opacity frames, first ${midFlight[0] ?? "none"}`,
    midFlight.length > 0,
    true,
  );
  check(
    "MOTION · and every box in pose 1 is caught in flight, not just one",
    POSE_1_ORDER.filter(
      (id) => !stagger.samples.some((s) => s[id] > 0.02 && s[id] < 0.98),
    ),
    [],
  );
}

// ── THE OTHER THREE POSES' TIMELINES, for the finding the ticket asks for ──
//
// The verdict's 750ms of DELAY is the longest arrival on this slide and the reduced run
// cannot shorten it. Measured against the other three poses rather than asserted from the
// constants, because that is the comparison the finding is about.
//
// POSE 0 IS MEASURED FROM ITS OWN TRIGGER, WHICH IS NOT A KEYPRESS. Its two clauses carry
// `on` hardcoded true, so they are inserted already wearing `.fade.on` and there is no
// off-state to transition FROM: what animates them is `fadeReveal`'s `both` fill, which
// holds opacity 0 through the 120/210ms `animationDelay` and then runs 500ms. So t=0 for
// pose 0 is the frame the first clause ENTERS THE DOM, captured by a `MutationObserver`
// installed through `addInitScript` before the app boots. Timing it from a settled page
// instead — which is what a naive version of this block did — reports the round-trip
// latency of the `evaluate` call (≈8ms) and calls it a settle time.
//
// AND THE SAMPLE HAS TO CATCH IT IN FLIGHT, or the number is only an upper bound: if the
// first frame this sampler sees is already at full opacity, the reveal finished before the
// harness looked and `firstSeen` says so rather than passing quietly.
const poseSettle = { 1: settles["chicken-egg-verdict"] };
{
  // Navigate with NO settle, so the poll starts before `fadeReveal`'s 500ms has run out.
  await gotoSlide(page, PRIMARY, primaryRow.index, 0);
  const p0 = await page.evaluate(
    ({ ids, limit }) =>
      new Promise((resolve) => {
        const started = performance.now();
        const out = {};
        const firstSeen = {};
        const tick = () => {
          const wall = performance.now() - started;
          const t0 = window.__gh57mount;
          // A DEADLINE ON THE MARKER ITSELF, so a marker that never fires reports
          // `marker: false` and fails the assertion below rather than hanging this poll —
          // which is exactly what happened when the init script threw.
          if (t0 == null) {
            if (wall > limit) return resolve({ out, firstSeen, marker: false });
            return requestAnimationFrame(tick);
          }
          const t = performance.now() - t0;
          for (const id of ids) {
            const el = document.querySelector(`[data-testid="${id}"]`);
            if (!el) continue;
            const o = parseFloat(getComputedStyle(el).opacity);
            if (firstSeen[id] === undefined) firstSeen[id] = Math.round(o * 1000) / 1000;
            if (out[id] == null && o > 0.9995) out[id] = Math.round(t * 10) / 10;
          }
          if (ids.every((id) => out[id] != null) || wall > limit) {
            return resolve({ out, firstSeen, marker: true });
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { ids: BEAT_1, limit: SAMPLE_MS },
  );
  check(
    `stagger · pose 0's mount marker fired and its reveal was caught in flight, so its settle time is a measurement and not an upper bound — first frame seen at opacity ${JSON.stringify(p0.firstSeen)}`,
    [p0.marker, BEAT_1.every((id) => p0.firstSeen[id] != null && p0.firstSeen[id] < 0.9995)],
    [true, true],
  );
  poseSettle[0] = Math.max(...Object.values(p0.out), 0);
  for (const pose of [2, 3]) {
    // Walk to the pose BEFORE the one being sampled, then sample the press into it.
    await gotoSlide(page, PRIMARY, primaryRow.index, MOUNT_MS);
    for (let i = 1; i < pose; i++) {
      await page.keyboard.press("Space");
      await page.waitForTimeout(POSE_MS);
    }
    const ids = pose === 2 ? ["chicken-egg-turn"] : [...BEAT_4];
    const s = await sampleArrivals(page, ids, "Space");
    poseSettle[pose] = Math.max(...ids.map((id) => firstAt(s.samples, id, 0.9995) ?? 0));
  }
}
console.log(
  `      LAST ARRIVAL PER POSE (${REDUCED ? "reduce" : "normal"}), ms after that pose's own trigger — ` +
    `the keypress for 1–3, the first clause entering the DOM for 0:\n        ` +
    [0, 1, 2, 3].map((p) => `pose ${p} ${n2(poseSettle[p])}`).join(" · ") +
    `\n        NOTE these are the frames at which the last box crossed opacity 0.9995, which is` +
    `\n        EARLIER than the declared end of the motion: \`var(--ease)\` is` +
    `\n        cubic-bezier(0.16, 1, 0.3, 1), a hard ease-out, so a 500ms reveal is visually` +
    `\n        over well before 500ms. \`ChickenEggBeats.tsx\`'s ≈710/1260/620/1070ms are the` +
    `\n        DECLARED delay-plus-duration sums and are a different quantity, not a` +
    `\n        contradiction of these.`,
);
check(
  `FINDING · beat 3 is the slowest arrival on the slide — pose 1 lands at ${n2(poseSettle[1])}ms against poses 0/2/3 at ${n2(poseSettle[0])}/${n2(poseSettle[2])}/${n2(poseSettle[3])}ms, and under reduce that is DELAY the global rule does not squash`,
  [0, 2, 3].every((p) => poseSettle[p] < poseSettle[1]),
  true,
);

// ───────────────── every brand, every pose, forward and back ─────────────────

/** Collected for the summary — the ticket asks for NUMBERS, so the numbers are the
 *  deliverable and not the booleans beside them. */
const summary = [];
/** Per brand: the signature the two leader decks must agree on. */
const brandSignature = {};

for (const variant of LEADER_VARIANTS) {
  const brand = VARIANTS[variant].brand;
  const tag = variant.padEnd(12);
  const checksBefore = checks;
  console.log(`\n── ${variant} (brand ${brand}) ─────────────────────────────────`);

  const harvest = variant === PRIMARY ? primaryHarvest : await harvestDeck(page, variant, slideCount);
  const here = harvest.filter((r) => r.here);
  check(`${tag} · composition · the slide composes into this deck, exactly once`, here.length, 1);
  if (here.length !== 1) continue;
  const index = here[0].index;

  // ── COMPOSITION, READ OFF THE PAGE (§3.5) ──
  check(
    `${tag} · composition · it sits at deck index ${DECK_INDEX} of ${slideCount}`,
    index,
    DECK_INDEX,
  );
  check(
    `${tag} · composition · the figure prints "${FIG_LABEL}" — the derived letter AND the slide's own label`,
    here[0].fig,
    FIG_LABEL,
  );
  // AND NOTHING ELSE IN THE DECK CLAIMS THIS REFERENCE. The half a search cannot make:
  // two slides deriving D.2 would both look right on their own.
  check(
    `${tag} · composition · exactly one slide in ${slideCount} prints "${FIGURE_PREFIX}"`,
    harvest.filter((r) => r.fig?.startsWith(FIGURE_PREFIX)).map((r) => r.index),
    [index],
  );

  // ── THE WALK — 0 → 1 → 2 → 3 → 2 → 1 → 0, in ONE mount ──
  //
  // ONE MOUNT, which is the whole point: a fresh `?slide=` per pose would prove that each
  // pose renders from scratch and say nothing about what a presenter's own keypresses do.
  // `Space` advances a step, `ArrowUp` retreats one (`useKeyboardNav.ts`), and `retreat`
  // clamps into the previous SLIDE at step 0 — so the backward walk stops at pose 0 and is
  // not pressed again.
  await gotoSlide(page, variant, index, MOUNT_MS);

  const forward = [];
  const backward = [];
  const poseNotes = [];

  /** The signature compared across directions, across brands and across motion
   *  preferences. COMPUTED state, not markup: the unit test already compares the DOM and
   *  the failure this looks for is a pose that is structurally identical and visually
   *  stuck. */
  const signature = (state) => ({
    text: state.stageText,
    fig: state.figLabel,
    boxes: Object.fromEntries(
      REQUIRED.map((id) => {
        const b = state.boxes[id];
        return [
          id,
          b.mounted
            ? {
                on: b.on,
                reveal: n2(b.reveal),
                translateY: n2(b.translateY),
                text: b.text,
                lines: b.type?.lines ?? 0,
                rect: [n2(b.rect.left), n2(b.rect.top), n2(b.rect.right), n2(b.rect.bottom)],
              }
            : { mounted: false },
        ];
      }),
    ),
  });

  async function auditPose(p, pose, direction) {
    const state = await measure(p, REQUIRED, TIER_TOKENS, INJECT);
    if (direction === "forward" && p === page) await shot(`${variant}-pose${pose}`);

    const missing = REQUIRED.filter((id) => !state.boxes[id].mounted);
    const revealed = REVEALED_BY_POSE[pose] ?? [];
    // Every box this pose has reached resolves to a full reveal…
    const unrevealed = revealed.filter((id) => (state.boxes[id].reveal ?? 0) < 0.999);
    // …and is on its settled frame, not the 8px below it that `.fade` reveals from…
    const unsettled = revealed.filter((id) => Math.abs(state.boxes[id].translateY ?? 0) > 0.02);
    // …and carries its own copy, not merely its class (a reduced-motion path that dropped
    // children "to avoid animating them" would pass a class check).
    const empty = revealed.filter(
      (id) => id !== "chicken-egg-card" && id !== "chicken-egg-rule" && !(state.boxes[id].text ?? "").trim(),
    );
    // …and every gated box it has NOT reached is still held back.
    const leaked = GATED.filter((id) => !revealed.includes(id)).filter(
      (id) => (state.boxes[id].reveal ?? 0) > 0.02,
    );
    poseNotes.push({ pose, direction, missing, unrevealed, unsettled, empty, leaked, state });
    return state;
  }

  for (const pose of [0, 1, 2, 3]) {
    if (pose > 0) {
      await page.keyboard.press("Space");
      await page.waitForTimeout(POSE_MS);
    }
    forward[pose] = await auditPose(page, pose, "forward");
  }
  for (const pose of [2, 1, 0]) {
    await page.keyboard.press("ArrowUp");
    await page.waitForTimeout(POSE_MS);
    backward[pose] = await auditPose(page, pose, "backward");
  }
  backward[3] = forward[3];

  // THE DECLARED POSE COUNT, read off the NavBar's own step counter rather than hardcoded
  // — so a fifth pose added to the slide def is walked and not skipped.
  check(
    `${tag} · walk · the deck declares 4 poses and the walk reached the last`,
    [forward[0].stepCounter, forward[3].stepCounter, backward[0].stepCounter],
    ["01 / 04", "04 / 04", "01 / 04"],
  );
  check(
    `${tag} · walk · the walk never left the slide`,
    poseNotes.map((n) => n.state.slideIndex),
    Array(7).fill(String(index)),
  );
  check(
    `${tag} · walk · every pose mounts all 17 boxes, none missing`,
    poseNotes.filter((n) => n.missing.length).map((n) => `${n.direction} pose ${n.pose}: ${n.missing}`),
    [],
  );
  check(
    `${tag} · walk · every box a pose has reached rests at a FULL reveal (opacity 1, or scaleX 1 for the rule)`,
    poseNotes.filter((n) => n.unrevealed.length).map((n) => `${n.direction} pose ${n.pose}: ${n.unrevealed}`),
    [],
  );
  check(
    `${tag} · walk · and on its settled frame, not the 8px below it reveals from`,
    poseNotes.filter((n) => n.unsettled.length).map((n) => `${n.direction} pose ${n.pose}: ${n.unsettled}`),
    [],
  );
  check(
    `${tag} · walk · and carrying its own copy, not merely its class`,
    poseNotes.filter((n) => n.empty.length).map((n) => `${n.direction} pose ${n.pose}: ${n.empty}`),
    [],
  );
  check(
    `${tag} · walk · no box arrives before its pose`,
    poseNotes.filter((n) => n.leaked.length).map((n) => `${n.direction} pose ${n.pose}: ${n.leaked}`),
    [],
  );
  // THE RE-RENDER, as a comparison rather than a spot check.
  for (const pose of [2, 1, 0]) {
    check(
      `${tag} · walk · pose ${pose} reached backwards is the pose ${pose} reached forwards`,
      signature(backward[pose]),
      signature(forward[pose]),
    );
  }
  // And the four poses are actually four — a slide where nothing changed would pass the
  // comparison above trivially.
  check(
    `${tag} · walk · the four poses are four different frames`,
    new Set(forward.map((s) => JSON.stringify(signature(s)))).size,
    4,
  );
  check(
    `${tag} · walk · back at pose 0 nothing is stuck revealed`,
    GATED.filter((id) => (backward[0].boxes[id].reveal ?? 0) > 0.02),
    [],
  );
  check(
    `${tag} · walk · back at pose 0 beat 1 is still standing, both clauses at full opacity`,
    BEAT_1.map((id) => n2(backward[0].boxes[id].reveal)),
    BEAT_1.map(() => 1),
  );

  // ── NO POSE ENDS ON BEAT 2 — the rendered half ──
  //
  // THE AC's OWN WORDING, held over every pose in both directions: if any cost is
  // revealed then beat 3 is revealed too. A pose whose last arrival is the bill would
  // leave a room looking at an account of breaching somebody's terms of service with the
  // sentence that licenses it not yet on the stage.
  const restingOnBeat2 = poseNotes
    .filter((n) => BEAT_2.some((id) => (n.state.boxes[id].reveal ?? 0) > 0.02))
    .filter((n) => BEAT_3.some((id) => (n.state.boxes[id].reveal ?? 0) < 0.999))
    .map((n) => `${n.direction} pose ${n.pose}`);
  check(`${tag} · BEAT 2 · no pose rests with the bill up and beat 3 not up`, restingOnBeat2, []);
  // AND THE POSITIVE CONTROL: pose 0 must NOT have beat 2 up, or the rule above would
  // hold trivially on a slide that revealed everything at once.
  check(
    `${tag} · BEAT 2 · and pose 0 holds beat 2 back, so the rule above is not trivially true`,
    poseNotes
      .filter((n) => n.pose === 0)
      .map((n) => BEAT_2.concat(BEAT_3).filter((id) => (n.state.boxes[id].reveal ?? 0) > 0.02)),
    poseNotes.filter((n) => n.pose === 0).map(() => []),
  );

  // ── ZERO SMIL, at every pose, in both directions ──
  check(
    `${tag} · motion · zero SMIL nodes in the document at every pose (animate, animateTransform, animateMotion, set, animateColor)`,
    poseNotes.map((n) => n.state.smil),
    Array(poseNotes.length).fill(0),
  );
  // THE `<svg>` CENSUS, STATED THE WAY THE COMPONENT STATES IT. The stage HAS six and all
  // six are the NavBar's chevrons, which are on every slide of every deck; what this slide
  // claims is that the count OUTSIDE `.nav-zone` is 0, and that is what closes the SMIL
  // question by construction rather than by discipline.
  //
  // ONE SLOT, AND IT USED TO BE THREE. `svgTotal` against `svgTotal` cannot fail, and
  // `svgInNav === svgTotal` is the SAME condition as `svgOutsideNav === 0` — the three
  // counters are `svg`, `.nav-zone svg` and `svg:not(.nav-zone *)` off one document, so
  // asserting two of them twice bought nothing. The count is REPORTED in the label, where a
  // number belongs, and the positive control below is what stops a count of zero from
  // meaning "the stage is empty".
  check(
    `${tag} · motion · every <svg> on the stage is inside .nav-zone — ${forward[3].svgTotal} total, ${forward[3].svgInNav} in the NavBar, ${forward[3].svgOutsideNav} outside it`,
    poseNotes.map((n) => n.state.svgOutsideNav),
    poseNotes.map(() => 0),
  );
  check(
    `${tag} · motion · and the NavBar's chevrons are actually there, so the census is not counting an empty stage`,
    forward[3].svgTotal > 0,
    true,
  );

  // ── THE READING ORDER · where the beats ARE ──
  const p3 = forward[3];
  const boxRect = (id) => p3.boxes[id].rect;
  /** Which column a box is in, classified by its own measured left edge against the
   *  stage's midpoint — a fact about the layout, not one of the constants under test. */
  const inStory = (id) => boxRect(id).left < p3.stage.width / 2;
  const storyBoxes = REQUIRED.filter(inStory);
  const offerBoxes = REQUIRED.filter((id) => !inStory(id));
  const spanOf = (ids) => ({
    top: Math.min(...ids.map((id) => boxRect(id).top)),
    bottom: Math.max(...ids.map((id) => boxRect(id).bottom)),
    left: Math.min(...ids.map((id) => boxRect(id).left)),
    right: Math.max(...ids.map((id) => boxRect(id).right)),
  });
  const storySpan = spanOf(storyBoxes);
  const offerSpan = spanOf(offerBoxes);
  // THE STORY COLUMN'S THREE BEATS DESCEND, with no overlap between consecutive beats.
  const beatSpans = [spanOf(BEAT_1), spanOf(BEAT_2), spanOf(BEAT_3)];
  check(
    `${tag} · READING · the story column's three beats descend without overlap — beat 1 ${n2(beatSpans[0].top)}…${n2(beatSpans[0].bottom)}, beat 2 ${n2(beatSpans[1].top)}…${n2(beatSpans[1].bottom)}, beat 3 ${n2(beatSpans[2].top)}…${n2(beatSpans[2].bottom)}`,
    [beatSpans[0].bottom < beatSpans[1].top, beatSpans[1].bottom < beatSpans[2].top],
    [true, true],
  );
  check(
    `${tag} · READING · beat 4 is the OTHER column — story ${n2(storySpan.left)}…${n2(storySpan.right)}, offer ${n2(offerSpan.left)}…${n2(offerSpan.right)}, gutter ${n2(offerSpan.left - storySpan.right)}px`,
    [
      offerSpan.left > storySpan.right,
      BEAT_4.every((id) => !inStory(id)),
      [...BEAT_1, ...BEAT_2, ...BEAT_3].every(inStory),
    ],
    [true, true, true],
  );
  // AND NO BOX OF EITHER COLUMN OVERLAPS A BOX OF THE OTHER, which the spans above cannot
  // say on their own: two columns whose spans are disjoint horizontally cannot overlap,
  // but this is asserted per pair so a box that took the wrong column's left edge is named.
  const crossOverlaps = [];
  for (const s of storyBoxes) {
    for (const o of offerBoxes) {
      if (overlaps(boxRect(s), boxRect(o))) crossOverlaps.push(`${s} × ${o}`);
    }
  }
  check(`${tag} · READING · no story box overlaps an offer box`, crossOverlaps, []);
  // AND NO TWO BOXES INSIDE A COLUMN COLLIDE. The card is the exception and it is one by
  // construction: its eyebrow and its four terms are its SIBLINGS, positioned inside it,
  // so they overlap it on purpose (`ChickenEggBeats.tsx` records why — every box on this
  // slide is placed against the stage, not against a slot).
  const insideCard = ["chicken-egg-pilot-eyebrow", ...TERM_IDS];
  const sameColumn = [];
  for (const ids of [storyBoxes, offerBoxes]) {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const pair = [ids[i], ids[j]];
        const cardPair =
          (pair[0] === "chicken-egg-card" && insideCard.includes(pair[1])) ||
          (pair[1] === "chicken-egg-card" && insideCard.includes(pair[0]));
        if (!cardPair && overlaps(boxRect(pair[0]), boxRect(pair[1]))) {
          sameColumn.push(`${pair[0]} × ${pair[1]}`);
        }
      }
    }
  }
  check(`${tag} · READING · no two boxes in a column overlap (the card's own contents excepted)`, sameColumn, []);
  // THE CARD'S CONTENTS ARE ACTUALLY INSIDE IT, which is the other half of that exception.
  const outsideCard = insideCard.filter((id) => {
    const r = boxRect(id);
    const c = p3.boxes["chicken-egg-card"].content;
    return r.left < c.left - SUBPIXEL || r.right > c.right + SUBPIXEL || r.top < c.top - SUBPIXEL || r.bottom > c.bottom + SUBPIXEL;
  });
  check(`${tag} · READING · the card's label and its four terms are inside the card's content box`, outsideCard, []);
  // THE ALIGNMENT `CARD_TOP`'s DERIVATION BUYS: the bill's last row and the card's bottom
  // border land on ONE line, so the two lists read as the two halves of one trade and
  // below that line only beat 3 speaks.
  check(
    `${tag} · READING · the bill's last row and the card's bottom border land on one line — ${n2(boxRect(lastCost).bottom)} and ${n2(boxRect("chicken-egg-card").bottom)}`,
    Math.abs(boxRect(lastCost).bottom - boxRect("chicken-egg-card").bottom) < SUBPIXEL,
    true,
  );
  check(
    `${tag} · READING · and below that line only beat 3 is painted`,
    REQUIRED.filter(
      (id) => !BEAT_3.includes(id) && boxRect(id).bottom > boxRect("chicken-egg-card").bottom + SUBPIXEL,
    ),
    [],
  );

  // ── BEAT 3 IS UNMISSABLE · the luminance audit, over RUNS ──
  //
  // Every text run painted BELOW the rendered headline row, the deck's chrome excluded.
  // The verdict must be the sole owner of the brightest tier there, and the headline —
  // which is above the row's bottom edge and therefore not in this set — must outshine it.
  const belowHeadline = p3.runs.filter(
    (r) => !r.chrome && r.textBox.top >= HEADLINE_BOTTOM - SUBPIXEL && r.effOpacity > 0.5,
  );
  const brightest = Math.max(...belowHeadline.map((r) => r.luminance));
  const brightestOwners = [
    ...new Set(belowHeadline.filter((r) => r.luminance >= brightest - 1e-6).map((r) => r.owner)),
  ];
  const ladder = [...new Set(belowHeadline.map((r) => r.luminance))].sort((a, b) => b - a);
  console.log(
    `\n      LUMINANCE, ${belowHeadline.length} text runs below the headline row (y ≥ ${n2(HEADLINE_BOTTOM)}), chrome excluded\n` +
      ladder
        .map((l) => {
          const owners = [
            ...new Set(belowHeadline.filter((r) => Math.abs(r.luminance - l) < 1e-6).map((r) => r.owner ?? r.tag)),
          ];
          const sizes = [
            ...new Set(belowHeadline.filter((r) => Math.abs(r.luminance - l) < 1e-6).map((r) => r.size)),
          ];
          return `        ${l.toFixed(4)}  ${sizes.map((s) => `${s}px`).join("/").padEnd(12)} ${owners.join(", ")}`;
        })
        .join("\n") +
      `\n        headline (ABOVE the row's bottom, so not in the set): ${relativeLuminance(p3.headlineColor).toFixed(4)}`,
  );
  check(
    `${tag} · BEAT 3 · the brightest text run under the headline row is ${brightest.toFixed(4)} and the verdict is its only owner`,
    [brightestOwners, n2(brightest * 10000) / 10000],
    [["chicken-egg-verdict"], n2(LUM[VERDICT_TIER] * 10000) / 10000],
  );
  check(
    `${tag} · BEAT 3 · the headline outshines it (${relativeLuminance(p3.headlineColor).toFixed(4)} vs ${brightest.toFixed(4)}), which is what "brightest UNDER the headline" means`,
    [
      relativeLuminance(p3.headlineColor) > brightest,
      p3.headlineColor === TIERS[HEADLINE_TIER],
    ],
    [true, true],
  );
  // AND THE OTHER THREE CHANNELS, so the claim does not rest on colour alone: beat 3 is
  // the biggest prose on the slide, it is alone below the copper rule, and it is the last
  // thing to arrive in its pose (asserted in the ARRIVAL block above).
  //
  // "BIGGEST" IS A COMPARISON, NOT A THRESHOLD. This check held the other two boxes under a
  // hardcoded `26` and EXCLUDED the verdict from its own predicate
  // (`id === "chicken-egg-verdict" || s < 26`) until 2026-08-05, so the verdict could have
  // dropped to 18px with the label still claiming it was the biggest. What is asserted now
  // is the relation the label states: the verdict's OWN measured size against every other
  // text run below the headline row, chrome excluded — the two prose siblings, both lists,
  // both eyebrows and both clauses included, so a 27px cost label fails here too. With the
  // positive control that the comparison set is not just the verdict.
  const proseSizes = ["chicken-egg-workaround", "chicken-egg-turn", "chicken-egg-verdict"].map(
    (id) => [id, Math.max(...p3.runs.filter((r) => r.owner === id).map((r) => r.size))],
  );
  const verdictSize = Math.max(
    ...belowHeadline.filter((r) => r.owner === "chicken-egg-verdict").map((r) => r.size),
  );
  const others = belowHeadline.filter((r) => r.owner !== "chicken-egg-verdict");
  const notSmaller = [
    ...new Set(others.filter((r) => r.size >= verdictSize).map((r) => `${r.owner ?? r.tag} ${r.size}px`)),
  ];
  check(
    `${tag} · BEAT 3 · it is also the biggest prose on the slide — the verdict at ${verdictSize}px, over ${proseSizes.filter(([id]) => id !== "chicken-egg-verdict").map(([id, s]) => `${id.replace("chicken-egg-", "")} ${s}px`).join(" and ")}, and over all ${others.length} other runs under the headline row`,
    [notSmaller, others.length > 0],
    [[], true],
  );
  check(
    `${tag} · BEAT 3 · and alone below the copper rule at y=${n2(boxRect("chicken-egg-rule").bottom)}`,
    REQUIRED.filter((id) => boxRect(id).top >= boxRect("chicken-egg-rule").bottom),
    ["chicken-egg-verdict"],
  );
  // THE POSITIVE CONTROL FOR THE AUDIT'S GRANULARITY, and it is the reason the audit walks
  // runs. The same region, walked ELEMENT by element, reports textless boxes at the colour
  // they INHERIT — the card and the rule's wrapper paint a `--copper-700` border and
  // background and inherit `--neutral-50`, the headline's tier. If this ever came back
  // empty, the element-level audit would be the safe one and this comment would be wrong.
  const vacuous = p3.elements.filter(
    (e) =>
      !e.ownText &&
      e.rect.top >= HEADLINE_BOTTOM - SUBPIXEL &&
      Math.abs(e.luminance - LUM[HEADLINE_TIER]) < 1e-6,
  );
  check(
    `${tag} · BEAT 3 · an element-level audit of the same region WOULD report ${vacuous.length} textless box(es) at the headline's tier — ${[...new Set(vacuous.map((e) => e.testid ?? e.tag))].join(", ")} — which is why this one walks text runs`,
    vacuous.length > 0,
    true,
  );

  // ── THE TEXT, MEASURED · two channels, every pose, both directions ──
  const wrapped = [];
  const overflowing = [];
  const spilling = [];
  const pastMargin = [];
  const acrossGutter = [];
  const auditedByPose = [];
  /** The line count each box that CARRIES TYPE is cut for — the geometry module's own claim,
   *  restated per box because it is the whole point of this channel. Everything on this slide
   *  is a one-liner except the verdict and the turn, whose boxes are cut for two. The card
   *  and the rule's wrapper are absent because they carry no glyph: a "line count" for them
   *  would be a number with nothing behind it. */
  const TEXT_BOXES = REQUIRED.filter(
    (id) => id !== "chicken-egg-card" && id !== "chicken-egg-rule",
  );
  const LINES_EXPECTED = Object.fromEntries([
    ...TEXT_BOXES.map((id) => [id, 1]),
    ["chicken-egg-verdict", 2],
    ["chicken-egg-turn", 2],
  ]);
  for (const note of poseNotes) {
    const where = `${note.direction} pose ${note.pose}`;
    // ON THE STAGE, by the effective opacity the room sees — not by a list of which box
    // belongs to which pose. A run inside a `.fade` that has not been switched on is
    // invisible, so its geometry is not what a projector shows.
    const visibleBoxes = REQUIRED.filter(
      (id) => (note.state.boxes[id].effOpacity ?? 0) > 0.5 && note.state.boxes[id].type != null,
    );
    auditedByPose.push(visibleBoxes.length);
    for (const id of visibleBoxes) {
      const b = note.state.boxes[id];
      // CHANNEL 2 · the rendered LINE COUNT, grouped by line-box top. The only channel
      // that can see a wrap inside a declared-width box, and the only one that can check
      // the two boxes whose constraint IS the line count.
      if (b.type.lines !== LINES_EXPECTED[id]) {
        wrapped.push(`${where} · ${id} — ${b.type.lines} lines, cut for ${LINES_EXPECTED[id]}`);
      }
      // CHANNEL 1 · the element's own horizontal overflow. Vacuous on the prose boxes,
      // whose declared width stays declared while the text wraps; it is the `nowrap`
      // labels this catches, and it catches them where channel 2 cannot.
      if (b.scrollW > b.clientW) {
        overflowing.push(`${where} · ${id} — scrollWidth ${b.scrollW} > clientWidth ${b.clientW}`);
      }
      // THE TYPE'S OWN BOX against its box's CONTENT edge — what turns a pass into a
      // number, and what catches type that has eaten its own padding.
      if (b.type.right > b.content.right + TEXT_SLACK) {
        spilling.push(`${where} · ${id} — +${n2(b.type.right - b.content.right)}px past its own content edge`);
      }
      if (b.type.right > MARGIN.right + TEXT_SLACK || b.type.left < MARGIN.left - TEXT_SLACK) {
        pastMargin.push(`${where} · ${id} — ${n2(b.type.left)}…${n2(b.type.right)}`);
      }
      // AND NO STORY-COLUMN RUN CROSSES THE GUTTER. The gutter is measured off the two
      // columns' own rendered edges above; a story run that reached into it would collide
      // with the offer column at projection scale before any margin check noticed.
      if (inStory(id) && b.type.right > storySpan.right + TEXT_SLACK) {
        acrossGutter.push(`${where} · ${id} — ${n2(b.type.right)} past the story column's ${n2(storySpan.right)}`);
      }
    }
  }
  check(`${tag} · TEXT · every box renders the line count its box is cut for`, wrapped, []);
  check(`${tag} · TEXT · no box overflows its own width (scrollWidth vs clientWidth)`, overflowing, []);
  check(`${tag} · TEXT · no type spills past its own box's content edge`, spilling, []);
  check(`${tag} · TEXT · no type crosses the measured ${n2(MARGIN.left)}…${n2(MARGIN.right)} margins`, pastMargin, []);
  check(`${tag} · TEXT · no story-column type crosses the gutter at x=${n2(storySpan.right)}`, acrossGutter, []);
  // The audit's own positive control: every check above it is a "found nothing", so a walk
  // that visited no boxes would report a clean slide. 15 AND NOT 17 at the closing pose,
  // and the two missing ones are the point of the granularity argument above: the card and
  // the rule's wrapper carry no glyph, so they have no type to measure and are skipped
  // here rather than counted as clean.
  check(
    `${tag} · TEXT · the audit measured type at every pose — boxes per pose (fwd 0,1,2,3 · back 2,1,0): ${auditedByPose.join(", ")}`,
    [
      auditedByPose.length,
      auditedByPose.every((n) => n >= 2),
      Math.max(...auditedByPose),
      REQUIRED.filter((id) => p3.boxes[id].type == null),
    ],
    [7, true, REQUIRED.length - 2, ["chicken-egg-rule", "chicken-egg-card"]],
  );

  // ── THE FIVE FITS THE TICKET NAMES, AS NUMBERS ──
  const fit = (id, measureWidth, label) => {
    const b = p3.boxes[id];
    return {
      id,
      label,
      lines: b.type.lines,
      width: b.type.widestLine,
      measure: measureWidth,
      slack: measureWidth - b.type.widestLine,
      headroom: (measureWidth - b.type.widestLine) / b.type.widestLine,
    };
  };
  // THE MEASURE EACH BOX ACTUALLY HAS, taken from its own rendered content box rather
  // than from the constant that sized it.
  const measureOf = (id) => p3.boxes[id].content.right - p3.boxes[id].content.left;
  const longestCost = COST_IDS.reduce((a, b) =>
    p3.boxes[b].type.widestLine > p3.boxes[a].type.widestLine ? b : a,
  );
  const longestTerm = TERM_IDS.reduce((a, b) =>
    p3.boxes[b].type.widestLine > p3.boxes[a].type.widestLine ? b : a,
  );
  const FITS = [
    fit("chicken-egg-workaround", measureOf("chicken-egg-workaround"), "the confession — tightest growth headroom on the slide"),
    fit("chicken-egg-pilot-eyebrow", measureOf("chicken-egg-pilot-eyebrow"), "the card's label — widest string in the offer column"),
    fit(longestCost, measureOf(longestCost), "the longest cost label"),
    fit(longestTerm, measureOf(longestTerm), "the longest pilot term"),
    fit("chicken-egg-costs-eyebrow", measureOf("chicken-egg-costs-eyebrow"), "the bill's label"),
    ...CLAUSE_IDS.map((id) => fit(id, measureOf(id), "a deadlock clause")),
    fit("chicken-egg-verdict", measureOf("chicken-egg-verdict"), "beat 3 — cut for TWO lines"),
    fit("chicken-egg-turn", measureOf("chicken-egg-turn"), "beat 4's sentence — cut for TWO lines"),
  ];
  console.log(
    `\n      THE FITS (pose 3, webfont), widest rendered line against the box's own measure\n` +
      FITS.map(
        (f) =>
          `        ${f.id.replace("chicken-egg-", "").padEnd(22)} ${String(n2(f.width)).padStart(7)} / ${String(n2(f.measure)).padStart(4)}  slack ${String(n2(f.slack)).padStart(7)}  ${f.lines} line${f.lines > 1 ? "s" : ""}  ${f.label}`,
      ).join("\n"),
  );
  const tightest = FITS.filter((f) => LINES_EXPECTED[f.id] === 1).reduce((a, b) =>
    b.headroom < a.headroom ? b : a,
  );
  check(
    `${tag} · FITS · every one-line box fits its own measure, and the tightest by growth headroom is ${tightest.id.replace("chicken-egg-", "")} — ${n2(tightest.width)} in ${n2(tightest.measure)}, ${n2(tightest.slack)}px spare (${(tightest.headroom * 100).toFixed(1)}% of growth)`,
    FITS.filter((f) => LINES_EXPECTED[f.id] === 1).filter((f) => f.slack < 0).map((f) => f.id),
    [],
  );
  check(
    `${tag} · FITS · the two boxes cut for two lines render two, and both fill their measure — verdict ${n2(p3.boxes["chicken-egg-verdict"].type.widestLine)}/${n2(measureOf("chicken-egg-verdict"))}, turn ${n2(p3.boxes["chicken-egg-turn"].type.widestLine)}/${n2(measureOf("chicken-egg-turn"))}`,
    [
      p3.boxes["chicken-egg-verdict"].type.lines,
      p3.boxes["chicken-egg-turn"].type.lines,
      // A two-line box whose widest line used less than half its measure would be a box
      // wrapping for the wrong reason.
      p3.boxes["chicken-egg-verdict"].type.widestLine > measureOf("chicken-egg-verdict") / 2,
      p3.boxes["chicken-egg-turn"].type.widestLine > measureOf("chicken-egg-turn") / 2,
    ],
    [2, 2, true, true],
  );
  // AND NEITHER TWO-LINE BOX CLIPS ITS SECOND LINE. `scrollHeight` vs the box's own
  // height is the channel for that, and it is the one a line count cannot see: a box cut
  // 1px short renders both lines and hides the descenders of the second.
  check(
    `${tag} · FITS · neither two-line box clips — verdict scrollHeight ${p3.boxes["chicken-egg-verdict"].scrollH}/${n2(boxRect("chicken-egg-verdict").height)}, turn ${p3.boxes["chicken-egg-turn"].scrollH}/${n2(boxRect("chicken-egg-turn").height)}`,
    ["chicken-egg-verdict", "chicken-egg-turn"].filter(
      (id) => p3.boxes[id].scrollH > p3.boxes[id].clientH,
    ),
    [],
  );
  // ── THE COSMETIC DECISION, PINNED SO IT IS FALSIFIABLE RATHER THAN A COMMENT ──
  //
  // Both two-line boxes break their copper keyword across the line, and
  // `ChickenEggBeats.tsx` records the measurements behind ACCEPTING that: the verdict's
  // split is the wider one (fragments 721px apart against the turn's 393px) and it is on
  // the beat §6.7 calls load-bearing, the band where the turn's keyword would stay whole
  // is face-dependent (242…360 in Source Serif 4, 218…310 in Times New Roman and in
  // Chromium's generic `serif`, intersection 242…310, and the card's own 336px measure is
  // outside it), and any measure in that band costs the card's alignment with its own
  // sentence. THIS IS WHAT MAKES THE DECISION REVIEWABLE: a later edit that narrows the
  // turn — or one that reflows the verdict — fails here and has to re-read that note
  // rather than discovering the same three measurements again.
  // [how many `em.kw` SPANS the box has, how many LINE FRAGMENTS those spans paint]. Both
  // halves are needed: the workaround carries TWO keywords of one fragment each and the
  // two-line boxes carry ONE keyword of two fragments each, and a single summed number
  // cannot tell those apart.
  const kwShape = (id) => {
    const spans = p3.runs.filter((r) => r.owner === id && r.keyword);
    return [spans.length, spans.reduce((n, r) => n + r.fragments, 0)];
  };
  check(
    `${tag} · DECISION · the two-line boxes each break ONE copper keyword across the line and the one-line prose keeps BOTH of its whole — verdict ${JSON.stringify(kwShape("chicken-egg-verdict"))}, turn ${JSON.stringify(kwShape("chicken-egg-turn"))}, workaround ${JSON.stringify(kwShape("chicken-egg-workaround"))} as [spans, line fragments]`,
    [
      kwShape("chicken-egg-verdict"),
      kwShape("chicken-egg-turn"),
      kwShape("chicken-egg-workaround"),
    ],
    [
      [1, 2],
      [1, 2],
      [2, 2],
    ],
  );

  // ── THE CLEARANCE AND THE MARGINS ──
  const painted = [];
  for (const note of poseNotes) {
    for (const id of REQUIRED) {
      // A box still held back is invisible, so its geometry is not what the room sees.
      if (!(REVEALED_BY_POSE[note.pose] ?? []).includes(id)) continue;
      painted.push({ id, pose: note.pose, direction: note.direction, ...note.state.boxes[id].rect });
    }
  }
  const lowest = painted.reduce((a, b) => (b.bottom > a.bottom ? b : a));
  const clearance = NAV_TOP - lowest.bottom;
  check(
    `${tag} · CLEARANCE · the lowest painted box is ${lowest.id} at ${n2(lowest.bottom)}, against the measured .nav-zone top ${n2(NAV_TOP)} — ${n2(clearance)}px`,
    lowest.bottom < NAV_TOP,
    true,
  );
  check(
    `${tag} · CLEARANCE · every painted box, at every pose, is above the hover band`,
    painted.filter((b) => b.bottom >= NAV_TOP).map((b) => `${b.direction} pose ${b.pose} ${b.id} bottom ${n2(b.bottom)}`),
    [],
  );
  // NAV_ZONE_CLEARANCE is derived from `VERDICT_TOP + VERDICT_HEIGHT`, so it must not
  // promise more room than the stage draws; promising slightly LESS is a rounded line
  // height and is the direction it is allowed to be wrong in.
  check(
    `${tag} · CLEARANCE · geometry NAV_ZONE_CLEARANCE ${NAV_ZONE_CLEARANCE} does not over-promise the measured ${n2(clearance)}px`,
    [NAV_ZONE_CLEARANCE <= clearance + SUBPIXEL, clearance - NAV_ZONE_CLEARANCE < 1],
    [true, true],
  );
  check(
    `${tag} · MARGINS · every painted box is inside the measured ${n2(MARGIN.left)}…${n2(MARGIN.right)} margins`,
    painted
      .filter((b) => b.left < MARGIN.left - SUBPIXEL || b.right > MARGIN.right + SUBPIXEL)
      .map((b) => `${b.direction} pose ${b.pose} ${b.id} ${n2(b.left)}…${n2(b.right)}`),
    [],
  );
  // THE RIGHT MARGIN, AND IT IS TOUCHED ON PURPOSE. The turn and the card are full-bleed
  // in the offer column, so their right edges ARE the margin at x=1232 — which is exactly
  // why the claim is "nothing crosses it" and not "everything clears it", and why
  // `boxSizing: "border-box"` on the card is load-bearing rather than boilerplate: a
  // content-box card would render 402 wide and put this number at 1234.
  check(
    `${tag} · MARGINS · nothing crosses the right margin — the rightmost painted edge is ${n2(Math.max(...painted.map((b) => b.right)))} against the measured margin at ${n2(MARGIN.right)}`,
    Math.max(...painted.map((b) => b.right)) <= MARGIN.right + SUBPIXEL,
    true,
  );
  check(
    `${tag} · MARGINS · every painted box starts below the rendered headline row (${n2(HEADLINE_BOTTOM)})`,
    painted.filter((b) => b.top < HEADLINE_BOTTOM).map((b) => `${b.direction} pose ${b.pose} ${b.id} top ${n2(b.top)}`),
    [],
  );

  // ── THE MODULE'S NUMBERS, HELD AGAINST THE STAGE ──
  const shelves = [
    ...CLAUSE_IDS.map((id, i) => [id, clauseTop(i), CLAUSE_HEIGHT]),
    ["chicken-egg-workaround", WORKAROUND_TOP, WORKAROUND_HEIGHT],
    ["chicken-egg-costs-eyebrow", COSTS_EYEBROW_TOP, EYEBROW_HEIGHT],
    ...COST_IDS.map((id, i) => [id, costRowTop(i), LIST_ROW_HEIGHT]),
    ["chicken-egg-verdict", VERDICT_TOP, VERDICT_HEIGHT],
    ["chicken-egg-turn", COLUMN_TOP, TURN_HEIGHT],
    ["chicken-egg-card", CARD_TOP, CARD_HEIGHT],
    ["chicken-egg-pilot-eyebrow", CARD_EYEBROW_TOP, EYEBROW_HEIGHT],
    ...TERM_IDS.map((id, i) => [id, constraintRowTop(i), LIST_ROW_HEIGHT]),
  ];
  const drift = shelves
    .map(([id, top, height]) => {
      const r = boxRect(id);
      return Math.abs(r.top - top) > SUBPIXEL || Math.abs(r.height - height) > SUBPIXEL
        ? `${id} at ${n2(r.top)}×${n2(r.height)}, geometry says ${top}×${height}`
        : null;
    })
    .concat([
      Math.abs(boxRect("chicken-egg-rule").top - RULE_TOP) > SUBPIXEL
        ? `rule at ${n2(boxRect("chicken-egg-rule").top)}, geometry says ${RULE_TOP}`
        : null,
      Math.abs(boxRect(lastCost).bottom - COST_ROWS_BOTTOM) > SUBPIXEL
        ? `the bill ends at ${n2(boxRect(lastCost).bottom)}, geometry says ${COST_ROWS_BOTTOM}`
        : null,
      Math.abs(boxRect(COST_IDS[0]).top - COST_ROWS_TOP) > SUBPIXEL
        ? `the bill starts at ${n2(boxRect(COST_IDS[0]).top)}, geometry says ${COST_ROWS_TOP}`
        : null,
    ])
    .filter(Boolean);
  check(`${tag} · cross-check · every box lands where chicken-egg-geometry.ts puts it, to 1/64px`, drift, []);
  check(
    `${tag} · cross-check · the measured columns are geometry's — story ${n2(storySpan.right - storySpan.left)}px at ${n2(storySpan.left)}, offer ${n2(offerSpan.right - offerSpan.left)}px at ${n2(offerSpan.left)}, gutter ${n2(offerSpan.left - storySpan.right)}px`,
    [
      n2(storySpan.left),
      n2(storySpan.right - storySpan.left),
      n2(offerSpan.left),
      n2(offerSpan.right - offerSpan.left),
      n2(offerSpan.left - storySpan.right),
    ],
    [STORY_COL_LEFT, STORY_COL_W, OFFER_COL_LEFT, OFFER_COL_W, COLUMN_GAP],
  );
  // READ FROM THE GEOMETRY MODULE, NOT RECOMPUTED HERE. This script, the renderer and the
  // unit test each derived `OFFER_COL_W − 2 × CARD_PAD` for themselves until 2026-08-05,
  // which is three places one subtraction could come to disagree about; the module exports
  // `CARD_MEASURE` now and all three read it. (Comparing that subtraction against the export
  // would be an identity — the export IS that subtraction — so what is asserted is the
  // RENDERED measure against it.)
  check(
    `${tag} · cross-check · the card's own type measure is CARD_MEASURE ${CARD_MEASURE}, one CARD_PAD ${CARD_PAD} inside the ${OFFER_COL_W}px column on each side`,
    n2(measureOf("chicken-egg-pilot-eyebrow")),
    CARD_MEASURE,
  );
  check(
    `${tag} · cross-check · the air between the turn's box and the card's top border is TURN_TO_CARD ${TURN_TO_CARD}`,
    n2(boxRect("chicken-egg-card").top - boxRect("chicken-egg-turn").bottom),
    TURN_TO_CARD,
  );
  check(
    `${tag} · cross-check · both lists are inside their capacities — ${COST_COUNT}/${COST_ROW_CAPACITY} costs, ${CONSTRAINT_COUNT}/${CONSTRAINT_ROW_CAPACITY} terms`,
    [COST_COUNT <= COST_ROW_CAPACITY, CONSTRAINT_COUNT <= CONSTRAINT_ROW_CAPACITY],
    [true, true],
  );

  // ── THE COPY (§6.7, the AC) ──
  const textOf = (id) => lower(p3.boxes[id].text);
  check(
    `${tag} · copy · beat 1 is the issue's two clauses, in the issue's order`,
    CLAUSE_IDS.map(textOf),
    CLAUSES,
  );
  check(
    `${tag} · copy · beat 2's bill names the issue's four costs, verbatim and in the issue's order`,
    COST_IDS.map(textOf),
    COSTS,
  );
  check(
    `${tag} · copy · beat 2's confession names the workaround AND the ban, so the slide does not emphasise the act and mute the consequence`,
    [/\bshared accounts\b/i.test(p3.boxes["chicken-egg-workaround"].text), /\bbanned\b/i.test(p3.boxes["chicken-egg-workaround"].text)],
    [true, true],
  );
  check(`${tag} · copy · beat 3 is §6.7's sentence, verbatim`, p3.boxes["chicken-egg-verdict"].text, VERDICT);
  check(
    `${tag} · copy · beat 4's turn is addressed to the room and does not leak the spec's own beat numbering`,
    [
      TURN_MUST_NAME.filter((re) => !re.test(p3.boxes["chicken-egg-turn"].text)).length,
      TURN_MUST_NOT_NAME.filter((re) => re.test(p3.boxes["chicken-egg-turn"].text)).length,
    ],
    [0, 0],
  );
  check(
    `${tag} · copy · beat 4's card names the 30-day clock and the AC's four limits`,
    [
      PILOT_MUST_NAME.filter((re) => !re.test(p3.boxes["chicken-egg-pilot-eyebrow"].text)).length,
      TERMS_MUST_NAME.filter((re, i) => !re.test(p3.boxes[TERM_IDS[i]].text)).length,
    ],
    [0, 0],
  );
  // AC 5, ON THE COMPOSED DECK. The unit test holds this over the copy module and over a
  // directly-rendered slide; what only a composed deck can say is that no chrome and no
  // resolver put a vendor on this stage. POSITIVE CONTROL FIRST, so a rule loosened into
  // catching nothing cannot pass by finding nothing.
  check(
    `${tag} · copy · the forbidden-vocabulary rule still matches its own control string`,
    FORBIDDEN.test(FORBIDDEN_CONTROL),
    true,
  );
  check(
    `${tag} · copy · and no vendor and no enforcement-weakness claim is on the stage, at any pose`,
    poseNotes.map((n) => n.state.stageText.match(FORBIDDEN)?.[0] ?? null).filter(Boolean),
    [],
  );

  brandSignature[variant] = {
    poses: poseNotes
      .filter((n) => n.direction === "forward")
      .map((n) => signature(n.state)),
  };

  summary.push({
    variant,
    lowest,
    clearance,
    tightest,
    verdictLines: p3.boxes["chicken-egg-verdict"].type.lines,
    turnLines: p3.boxes["chicken-egg-turn"].type.lines,
    brightest,
    runsBelow: belowHeadline.length,
    smil: poseNotes.map((n) => n.state.smil),
    svg: [forward[3].svgTotal, forward[3].svgInNav, forward[3].svgOutsideNav],
    checks: checks - checksBefore,
  });

  console.log(
    `\n      ${variant} — the four beats, measured in stage coordinates (pose 3)\n` +
      REQUIRED.map((id) => {
        const r = boxRect(id);
        return `        ${id.padEnd(40)} x ${String(n2(r.left)).padStart(7)}…${String(n2(r.right)).padStart(7)}  y ${String(n2(r.top)).padStart(6)}…${String(n2(r.bottom)).padStart(6)}`;
      }).join("\n") +
      `\n      ${checks - checksBefore} assertions for ${variant}`,
  );
}

// ───────────────── both leader decks, byte-identical ─────────────────
//
// THE NO-BRAND-AXIS CLAIM, CHECKED RATHER THAN ASSUMED. §4.4's table of seven brand ×
// deckSet slots does not list this slide and `content.ts` forbids a resolver, so the two
// leader decks must render the same stage. Compared as the whole signature — every box's
// rect, its reveal state, its text, its line count, and the stage's own text — at all
// four poses. A missing `*For(brand)` call is invisible in a diff of one deck.
if (LEADER_VARIANTS.length >= 2) {
  const [a, b] = LEADER_VARIANTS;
  check(
    `BRANDS · ${a} and ${b} render byte-identical stages at all four poses`,
    brandSignature[b]?.poses ?? null,
    brandSignature[a]?.poses ?? null,
  );
  // And the signature is not empty, which is what would make the comparison above pass
  // on two decks that rendered nothing.
  check(
    "BRANDS · and the signature compared is the whole stage, not an empty object",
    [
      brandSignature[a]?.poses.length,
      Object.keys(brandSignature[a]?.poses[3]?.boxes ?? {}).length,
      (brandSignature[a]?.poses[3]?.text ?? "").length > 200,
    ],
    [4, REQUIRED.length, true],
  );
}

// ───────────────── the other motion preference, same poses ─────────────────
//
// EVERY POSE STILL COMPLETE UNDER `reduce`, AND COMPLETE MEANS THE SAME TEXT. The
// preference this run was launched with owns the completeness assertions above; this opens
// a SECOND context with the opposite preference and compares each pose's rendered text and
// every box's rect against it. Neither run alone can make that comparison, and the two
// halves are what AC 8 asks for: zero SMIL, and every pose still complete.
//
// ONE BRAND, and it is enough BECAUSE the two decks were just proved identical: brand ×
// preference is a square, and this fills the second axis on one row of it.
{
  const otherReduced = !REDUCED;
  const other = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    ...(otherReduced ? { reducedMotion: "reduce" } : null),
  });
  const otherPage = await other.newPage();
  watchConsole(otherPage, `${otherReduced ? "reduce" : "normal"} · `);
  const otherPoseMs = otherReduced ? 1000 : 1700;
  await gotoSlide(otherPage, PRIMARY, primaryRow.index, MOUNT_MS);
  const otherPoses = [];
  for (const pose of [0, 1, 2, 3]) {
    if (pose > 0) {
      await otherPage.keyboard.press("Space");
      await otherPage.waitForTimeout(otherPoseMs);
    }
    otherPoses.push(await measure(otherPage, REQUIRED, TIER_TOKENS, INJECT));
  }
  const mine = brandSignature[PRIMARY]?.poses ?? [];
  check(
    `PREFERENCE · under ${otherReduced ? "reduce" : "normal motion"} every pose renders the SAME text as under ${REDUCED ? "reduce" : "normal motion"}`,
    otherPoses.map((s) => s.stageText),
    mine.map((s) => s.text),
  );
  check(
    `PREFERENCE · and the same boxes in the same places, at a full reveal`,
    otherPoses.map((s, pose) =>
      (REVEALED_BY_POSE[pose] ?? []).filter(
        (id) =>
          (s.boxes[id].reveal ?? 0) < 0.999 ||
          Math.abs(s.boxes[id].rect.top - (mine[pose]?.boxes[id]?.rect?.[1] ?? -1)) > SUBPIXEL,
      ),
    ),
    otherPoses.map(() => []),
  );
  check(
    `PREFERENCE · zero SMIL nodes under ${otherReduced ? "reduce" : "normal motion"} too, at all four poses`,
    otherPoses.map((s) => s.smil),
    [0, 0, 0, 0],
  );
  await other.close();
}

// ───────────────── the console ─────────────────

if (noise.length) for (const n of noise) console.log(`      console · ${n}`);
check("console clean across every brand, every pose, both directions and both preferences", noise, []);

// ───────────────── the deliverable ─────────────────

console.log(`\n      THE MEASURED NUMBERS${REDUCED ? " (prefers-reduced-motion: reduce)" : ""}`);
console.log(
  `      .nav-zone top ${n2(NAV_TOP)} and margins ${n2(MARGIN.left)}…${n2(MARGIN.right)} — measured off the elements, not read from the geometry module`,
);
console.log(
  `      pose 1's window with a complete bill and no verdict: ${n2(windowB)}ms · the verdict settles ${n2(completes["chicken-egg-verdict"])}ms after the keypress`,
);
for (const s of summary) {
  console.log(
    `      ${s.variant.padEnd(12)} lowest painted box ${s.lowest.id.replace("chicken-egg-", "")} bottom ${n2(s.lowest.bottom)} → CLEARANCE ${n2(s.clearance)}px\n` +
      `                   tightest one-line fit ${s.tightest.id.replace("chicken-egg-", "")} ${n2(s.tightest.width)} / ${n2(s.tightest.measure)} → ${n2(s.tightest.slack)}px spare (${(s.tightest.headroom * 100).toFixed(1)}% growth)\n` +
      `                   verdict ${s.verdictLines} lines · turn ${s.turnLines} lines · brightest run under the headline ${s.brightest.toFixed(4)} over ${s.runsBelow} runs\n` +
      `                   SMIL per pose (fwd 0,1,2,3 · back 2,1,0) ${s.smil.join(",")} · <svg> total/nav/outside ${s.svg.join("/")} · ${s.checks} assertions`,
  );
}

if (failed.length) {
  console.log(`\n      WHAT FAILED${INJECT ? ` UNDER \`${INJECT_NAME}\`` : ""}`);
  for (const f of failed) console.log(`        · ${f}`);
}

console.log(
  `\n${checks} assertions · ${failures ? `${failures} FAILURE(S)` : "all passed"} · shots: ${OUT}`,
);
await browser.close();
process.exit(failures ? 1 : 0);
