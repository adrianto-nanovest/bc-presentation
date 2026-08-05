// The deadlock and the offer, as numbers — stage coordinates for a 1280×720 stage.
//
// TWO COLUMNS, ONE STAGE, AND NOTHING SHARED WITH THE LEDGER BUT THE STAGE. `./geometry.ts`
// says in its own first line why it exists — the ledger's column is not the same height in
// both decks — and none of that is true here: §6.7's D.3 has no brand axis (§4.4's table of
// seven slots does not list it) and both of its lists are fixed-length tuples in
// `./content.ts`. So this slide's numbers are a second module rather than a second half of
// that one: a file whose whole subject is "how tall is a column of `n` figures" has no room
// for a budget whose subject is "which of two columns hits the floor first".
//
// THE FOUR STAGE FACTS ARE RESTATED HERE, NOT IMPORTED, AND THAT IS A CHOICE UNDER THE
// COMPILER OPTIONS THIS REPO SETS TODAY — not a law. Importing `STAGE`, `SIDE_MARGIN`,
// `CONTENT_WIDTH` and `NAV_ZONE_TOP` from `./geometry` would be the better shape, and no
// specifier satisfies tsc and bare Node at once as `tsconfig.json` stands. Measured three
// ways on 2026-08-05, on Node v23.9.0:
//
//   · `import { STAGE } from "./geometry"` — tsc accepts it; bare Node does NOT.
//     `ERR_MODULE_NOT_FOUND … Cannot find module '…/geometry'`: ESM does no extension
//     search.
//   · `… from "./geometry.js"` — tsc accepts it (`moduleResolution: "bundler"` maps it onto
//     the `.ts` file); bare Node does NOT, for the same reason — it looks for a `.js` that
//     is not there.
//   · `… from "./geometry.ts"` — bare Node accepts it; tsc does NOT:
//     `error TS5097: An import path can only end with a '.ts' extension when
//     'allowImportingTsExtensions' is enabled`, and that flag is explicitly `false` in
//     `tsconfig.json`.
//
// THE THIRD ROW IS THE ONE THAT COULD BE UNLOCKED, AND IT WAS NOT TRIED. `tsconfig.json`
// already sets `noEmit: true`, which is the precondition `allowImportingTsExtensions`
// needs, so flipping that flag to `true` is legal today and `./geometry.ts` would then
// satisfy both tools. It is out of this ticket's scope for a reason that is about blast
// radius and not about difficulty: the flag is repo-wide, it is set to `false`
// deliberately, and every one of the extensionless relative imports under `src` and
// `tests` is written to that convention. So read this section as "the seam is here because
// of a flag one line of `tsconfig.json` controls", not as "the import is impossible".
//
// BARE-NODE IMPORTABILITY WINS, because this ticket's browser harness is to read these
// constants the way `scripts/gh56-verify.mjs` reads the ledger's — bare Node, no bundler —
// and cross-check them against boxes measured off a real page. A geometry module a harness
// cannot import is a geometry module nothing measures. So the two facts the ledger types
// LITERALLY are PINNED to it instead, through a type-only `import()` that is erased before
// either tool runs, and the two it widens to `number` are re-derived from those pins by the
// same one-line arithmetic with the CSS rule quoted beside them. See {@link STAGE} and
// {@link NAV_ZONE_TOP} for what that does and does not guarantee.
//
// PROVED IMPORTABLE, not assumed — the claim `./content.ts` explicitly cannot make:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/chicken-egg-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//   39 exports
//
// (Plus Node's own ExperimentalWarning on stderr.) The two type-only `import()`s below —
// `./geometry` for the stage pins, `./content` for the three counts — cost nothing at run
// time: they live in type positions, both tsc and Node's type stripper erase them, and the run
// above is the proof that nothing resolves `./content.ts`, which bare Node cannot load at all
// (its `@/` runtime import is documented at the top of that file).
//
// THE TYPE BUDGET, MEASURED IN A REAL ENGINE. Every box height below is cut for a line count
// this table settles; jsdom computes no text, so these were measured in Chromium at 1:1 with
// the deck's own webfonts loaded from `index.html`'s Google Fonts URL (`document.fonts.load`
// awaited, `status === "loaded"` asserted), and then measured again with the webfonts absent
// so a projector with no network is inside the budget too. The fallback FACE is the one
// Chromium actually chose, read back through `CSS.getPlatformFontsForNode` rather than
// assumed from the stack. Widths include the copper keyword italic wherever `highlight()`
// puts one, because an italic run is not the same width as its upright. Measured 2026-08-05.
//
// EVERY WIDTH BELOW IS A LAYOUT MEASUREMENT, AND THE METHOD MATTERS. Each one is a
// `white-space: nowrap` CLONE of the rendered box, appended to that box's own parent so it
// inherits the same cascade, read back through `getBoundingClientRect()` — cross-checked
// against the sum of the box's own run rects, which agrees. NOT `canvas.measureText` with the
// element's computed font: that method drops `.slide-headline`'s `letter-spacing: -0.01em`
// (`src/styles/globals.css`) and sets the copper `<em>` UPRIGHT, so it disagrees with the
// layout by 1.3% on the headline row (572.08 against 564.94 at 40px, 751.09 against 736.86
// with the webfonts absent) and it cannot honour the italic rule this table states. The
// headline row was RE-MEASURED that way on 2026-08-05 after shipping with the canvas figures.
//
//   box            type                       line box   width: webfont / no webfont   measure  lines
//   headline       40px display                  42.00    564.94 / 736.86  (Georgia)     1184     1
//   clause         20px mono ·0.14em ·upper      24.00    340.41 / 340.45  (Courier)      728     1
//   workaround     22px serif + kw italic        28.60    641.00 / 636.03  (Georgia)      728     1
//   costsEyebrow   11px mono ·0.22em ·upper      13.75    108.25 / 108.27  (Courier)      728     1
//   cost label     15px sans (longest of 4)      19.50    405.23 / 390.41  (.SF NS)       728     1
//   verdict        26px serif + kw italic        33.80    825.44 / 805.91  (Georgia)      728     2
//   turn           24px serif + kw italic        31.19    459.70 / 443.09  (Georgia)      400     2
//   pilotEyebrow   11px mono ·0.22em ·upper      13.75    270.61 / 270.64  (Courier)      320     1
//   constraint     15px sans (longest of 4)      19.50    188.41 / 180.58  (.SF NS)       320     1
//
// The last two rows were measured against 320 — 16px STRICTER than the 336 the card actually
// gives them ({@link CARD_MEASURE}) — so their one-line verdicts have that much more room
// than the table claims. The LINE BOX column is face-independent: every line-height here is a
// multiple, so the fallback measures the same height, which is why no box below needs a
// second number for it.
//
// EVERY BOX BELOW IS ITS TYPE'S PAINTED EXTENT PLUS ≈2px, AND THE LINE BOX IS NOT THAT
// EXTENT. Each of these line-heights is TIGHTER than the face's own content area — measured at
// `line-height: normal`: JetBrains Mono 1.3em, Source Serif 4 1.364/1.375/1.385em at 22/24/26,
// Inter 1.267em, Instrument Serif 1.3em — so glyphs paint slightly outside their line box, and
// only the first line's overflow at the top and the last line's at the bottom escape the block
// (interior overflow falls inside the next line box). So painted extent is
// `n · lineBox + (contentArea − lineBox)`:
//
//   clause      24.00 + 2.00  = 26.00  → box 28  (2.00 spare)
//   eyebrow     13.75 + 0.25  = 14.00  → box 16  (2.00)
//   workaround  28.60 + 1.40  = 30.00  → box 32  (2.00)
//   list row    19.50 + 0     = 19.50  → box 22  (2.50 — Inter's content area is SMALLER here)
//   turn        62.38 + 1.81  = 64.19  → box 66  (1.81)
//   verdict     67.59 + 2.20  = 69.79  → box 72  (2.21)
//
// THE VERDICT'S BOX WAS 70 UNTIL THAT ARITHMETIC WAS DONE, which left 0.21px — a box that
// passes every check and clips its own second line the first time a face rounds differently.
// 72 is the number that makes the ≈2px rule true of all six.
//
// Every size clears gh#50's projector floors (mono ≥ 9.5px, prose ≥ 10.5px) with room to
// spare, and the quietest colour tier any of them may take is `--neutral-300` — the floor
// `./components/ProofLedger.tsx` records for text on this stage, with `--neutral-400` under
// it. THE ONE ROW THAT IS NOT COMFORTABLE is the workaround: 641.00 in a 728 measure is 87px
// of spare, so the string may grow 13.6% before it wraps. THE WEBFONT IS THE WORSE CASE
// THERE, which is the opposite of what a fallback argument usually finds — Georgia sets the
// same sentence 4.97px narrower. It is the one string on this slide whose rendered LINE COUNT
// a browser check has to assert, because a second line does not overflow into air: it lands
// in the 24px above the eyebrow under it.
//
// THE VERTICAL BUDGET, top to bottom, both columns, and why these numbers and not rounder
// ones. `.fig-label` is at y=36 and `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` is 40px on 1.05, so the headline ends at y=122 (measured at the base
// 46px too, where the same string is 649.69px on one line and the row ends at y=128.3 — the
// budget holds at either headline size). Both columns then start on ONE shelf,
// {@link COLUMN_TOP} = 156, which is
// `.slide-content`'s own `top` in `src/styles/globals.css` — the shelf the deck declares for
// content under a headline row, and this slide has no eyebrow band to cross first.
//
//   STORY (left, x=48, w=728)                    OFFER (right, x=832, w=400)
//   156  clause 0            → 184              156  turn                     → 222
//   194  clause 1            → 222              254  card                     → 482
//   262  workaround          → 294                286    card eyebrow         → 302
//   318  WHAT IT COST        → 334                314    term 0               → 336
//   346  cost 0              → 368                352    term 1               → 374
//   384  cost 1              → 406                390    term 2               → 412
//   422  cost 2              → 444                428    term 3               → 450
//   460  cost 3              → 482                       (450 + 32 pad = 482)
//   512  copper rule         → 513
//   533  verdict             → 605
//   ───────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 605 · {@link NAV_ZONE_CLEARANCE} = 27
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM. This slide takes that
// class's `top` and refuses its `bottom`: `bottom: 80px` puts a floor at y=640, which is 8px
// INSIDE `.nav-zone` (`bottom: 0; height: 88px`), and a box there is a box the presenter's
// own pointer makes the chrome fade up over. Nothing on this stage may cross y=632.
//
// THE TWO LISTS END ON THE SAME LINE, BY DERIVATION. The bill's last row and the pilot
// card's bottom border both land on y=482 because {@link CARD_TOP} is
// `COST_ROWS_BOTTOM − CARD_HEIGHT` — the card hangs UP from the bill's floor rather than
// down from the turn. Two things follow, and both are the point: below y=482 only the
// verdict speaks, alone, in the wider column; and the gap between the turn and the card is
// the RESIDUE of that derivation ({@link TURN_TO_CARD}, 32px today) rather than a number
// chosen beside it. A near-miss here — a card ending at 460 against a bill ending at 482 —
// would read as a mistake at projection scale, which is the reason the alignment is
// structural instead of eyeballed.
//
// THE RIGHT COLUMN IS SHORTER, AND THE BAND UNDER IT IS DELIBERATE. 150px of stage between
// the card and the floor holds nothing. The offer is one sentence and four terms; padding it
// out to the story's height would be air pretending to be content, and the empty band is
// what lets the only bordered box on the stage read as an object rather than as a panel. Do
// not fill it.
//
// TWO CAPACITIES, TWO DIFFERENT NEIGHBOURS, EACH ONE MEASURED. A fifth cost row and a fifth
// pilot term fail in opposite directions, and the throw messages say which — gh#56 shipped a
// row cap that blamed the NavBar band 80px away when the real collision was a fixed shelf,
// and the cost of that was two comments, two messages and two tests all pointing a later
// author at the wrong number.
//
//   · A FIFTH COST ROW hits THE FLOOR. Everything under the rows hangs off the row count, so
//     the copper rule and the verdict TRAVEL with a fifth row rather than being hit by it:
//     the rule would move to y=550 and the verdict's box would end at y=643, 11px inside the
//     band. (It also drags the pilot card down 38px, through the alignment above.)
//   · A FIFTH PILOT TERM hits THE TURN LINE. The card's bottom is pinned, so the card grows
//     UPWARD: its top border would land at y=216 — inside the turn's box (156…222) and
//     2.38px inside its second line box (187.19…218.38), i.e. in the leading under the
//     sentence the card is the terms for. The band takes no part in it; the card's bottom
//     edge is 150px above y=632.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond the
// arithmetic below.

// ───────────────────── the stage, restated and pinned ─────────────────────

/**
 * The ledger module, as a TYPE only — the pin's other end.
 *
 * `typeof import(…)` is a type-space construct: tsc resolves it, Node's type stripper
 * deletes it, and no runtime import exists to resolve. That is what lets this module hold
 * the ledger's numbers to account without borrowing its resolution problem (see the header).
 */
type Ledger = typeof import("./geometry");

/**
 * This slide's copy, as a TYPE only — the other end of the three count pins
 * ({@link DEADLOCK_CLAUSE_COUNT}, {@link COST_COUNT}, {@link CONSTRAINT_COUNT}).
 *
 * ONE ALIAS FOR THREE PINS, so each of them reads as a field lookup rather than as a
 * 120-character type path, and so `./content.ts` is named once. Type-space again: bare Node
 * cannot load that module at all (its `@/` runtime import is the point of it), and this
 * reference does not ask it to.
 */
type ChickenEggCopy = (typeof import("./content"))["investChickenEggContent"];

/**
 * The stage. 1280×720, PINNED to `./geometry.ts`'s own `STAGE`.
 *
 * The annotation is the lock: `./geometry.ts` declares `STAGE` with `as const`, so its type
 * is `{ readonly width: 1280; readonly height: 720 }`, and a stage resized there stops this
 * file compiling. BOTH PINS WERE DEFECT-INJECTED BEFORE THEY WERE TRUSTED: writing 40 into
 * `SIDE_MARGIN` below fails with `error TS2322: Type '40' is not assignable to type '48'`,
 * and a third entry in `./content.ts`'s clause tuple fails with `Type '2' is not assignable
 * to type '3'` on {@link DEADLOCK_CLAUSE_COUNT}. Neither passes quietly.
 *
 * WHAT THE PIN DOES NOT DO: it is exactly as strong as the ledger's literal type. If a later
 * edit there widens the declaration (`export const STAGE: { width: number … }`), this
 * annotation goes vacuous and says nothing — silently. The browser harness is the other
 * half: it measures the stage element rather than reading either module's copy.
 */
export const STAGE: Ledger["STAGE"] = { width: 1280, height: 720 };

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content` all sit
 *  at `left: 48px` in `src/styles/globals.css`. PINNED, like {@link STAGE}. */
export const SIDE_MARGIN: Ledger["SIDE_MARGIN"] = 48;

/**
 * The width every full-bleed box on this stage gets: 1184.
 *
 * RE-DERIVED, NOT PINNED, and the difference is worth stating. `./geometry.ts` computes this
 * one, so its declared type is the widened `number` — and an annotation of `number` accepts
 * any number at all, which is a check that cannot fail. So this is the ledger's own
 * expression over the two pinned facts above: agreeing requires no coincidence, only that
 * nobody edits the arithmetic. Same for {@link NAV_ZONE_TOP}.
 */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor for slide
 *  content (see the header). Re-derived, not pinned, for the reason
 *  {@link CONTENT_WIDTH} gives. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── the two columns ─────────────────────

/**
 * The gutter between the story and the offer: 56.
 *
 * WIDER THAN EVERY GAP INSIDE EITHER COLUMN, which is the whole job. The largest of those is
 * 40 ({@link BEAT_GAP}), so 56 is what makes the room group the stage vertically first — two
 * arguments side by side — rather than reading eight loose blocks. At 24 (the ledger's
 * within-a-row gutter) the two columns would read as one wide table.
 */
export const COLUMN_GAP = 56;

/**
 * The offer column: 400 wide.
 *
 * CUT FOR THE WIDEST THING IN IT, which is not a constraint label but the card's mono
 * eyebrow: "INSTEAD — A 30-DAY PROOF PILOT" measures 270.61px, and inside
 * {@link CARD_PAD} that leaves 65.39px of the card's 336px measure spare. A wrapped eyebrow
 * inside a bordered box reads as damage rather than as a label, so this is the number the
 * browser check watches. The four terms are far shorter — 188.41px at their longest.
 */
export const OFFER_COL_W = 400;

/**
 * The story column: 728 — WHATEVER IS LEFT, and deliberately the wider of the two.
 *
 * It carries three prose lines and four long labels; the offer carries one sentence and four
 * short ones. The residue goes here for the same reason `METRIC_COL_W` in `./geometry.ts`
 * takes it: this is the column whose strings are longest and most likely to be reworded. Its
 * two tightest fits are measured in the header's table — the workaround at 641.00 of 728, and
 * the verdict, which is MEANT to take two lines (825.44 of 728).
 *
 * That the three numbers tile {@link CONTENT_WIDTH} is an identity, not a check: this one is
 * defined as the remainder. What a browser check can prove is that the rendered columns land
 * on these edges and that neither one's type crosses the gutter.
 */
export const STORY_COL_W = CONTENT_WIDTH - COLUMN_GAP - OFFER_COL_W;

/** The story column's left edge — the deck's own margin. */
export const STORY_COL_LEFT = SIDE_MARGIN;

/** The offer column's left edge: 832. Derived, so widening the gutter cannot leave the two
 *  columns overlapping or the right one hanging past the margin — `832 + 400 = 1232`, which
 *  is `1280 − 48`. */
export const OFFER_COL_LEFT = STORY_COL_LEFT + STORY_COL_W + COLUMN_GAP;

/**
 * The one shelf both columns start on: 156.
 *
 * `.slide-content`'s own `top` in `src/styles/globals.css` — the shelf the deck declares for
 * content under a headline row. It clears the headline by 34px (40px display on 1.05 from
 * y=80 ends at 122), and this slide has no mono eyebrow under the headline to cross, which is
 * what the sibling leader slides spend their y=134 shelf on.
 *
 * BOTH COLUMNS, ONE NUMBER. The deadlock and the turn are the two things the room reads
 * first, and a stage where one of them started 20px lower would rank them.
 */
export const COLUMN_TOP = 156;

// ───────────────────── the story column · beat 1, the deadlock ─────────────────────

/**
 * How many clauses the loop has: 2, PINNED to `./content.ts`'s tuple.
 *
 * The type is that file's `deadlockClauses["length"]`, read through a type-only `import()`,
 * so the count cannot be 2 in the copy and 3 in the arithmetic — a third clause there stops
 * THIS file compiling. Which is the honest direction for the lock: the count is a fact about
 * the argument (a two-clause cycle is what a deadlock IS), not about the layout, and geometry
 * is the borrower.
 */
export const DEADLOCK_CLAUSE_COUNT: ChickenEggCopy["deadlockClauses"]["length"] = 2;

/**
 * One clause's box: 28.
 *
 * 20px mono on 1.2 is a 24.00 line box, and the face's content area is 26.00 — so the type
 * paints 26 and the box carries 2 more, which is the ≈2px rule the header's table holds all six
 * boxes to. THE SLACK IS NOT DESCENDER ROOM: both clauses are set in caps and have none.
 */
export const CLAUSE_HEIGHT = 28;

/** The air between the two clause BOXES — not between two lines of type: what the room sees
 *  between them is `CLAUSE_PITCH − 26.00 = 12px` of painted air, not 10.
 *
 *  SMALL ON PURPOSE either way. They are one locked pair, not two statements, and this keeps
 *  them reading as a single block against the 40px that separates the block from beat 2. Not
 *  exported — it exists to derive the pitch. */
const CLAUSE_GAP = 10;

/** How far apart the two clauses sit. Derived, so the pair's air is one number to change. */
const CLAUSE_PITCH = CLAUSE_HEIGHT + CLAUSE_GAP;

/** The whole deadlock block's height: 66. Derived from the count, so the block is as tall as
 *  the loop is long.
 *
 *  NOT EXPORTED — it exists to derive {@link WORKAROUND_TOP}, and nothing outside this file
 *  reads it. Same rule as {@link BELOW_ROWS_HEIGHT} below and as `./geometry.ts`'s
 *  `CLOSER_GAP`: an exported constant with no outside reader is a number two places could
 *  come to disagree about for no gain. The renderer places beat 1 with {@link clauseTop} and
 *  {@link CLAUSE_HEIGHT}; the block's total is this file's own arithmetic. */
const DEADLOCK_HEIGHT = (DEADLOCK_CLAUSE_COUNT - 1) * CLAUSE_PITCH + CLAUSE_HEIGHT;

// ───────────────────── the story column · beat 2, what we did and what it cost ────────────

/**
 * The gap that separates beat 1 from beat 2: 40 — the largest in either column.
 *
 * IT IS THE BEAT CHANGE, and it is 4× the air inside the deadlock block, because that is the
 * only thing on the stage saying the confession is not a third clause. Not exported.
 */
const BEAT_GAP = 40;

/** The workaround line's shelf: 262. Derived from the block above it. */
export const WORKAROUND_TOP = COLUMN_TOP + DEADLOCK_HEIGHT + BEAT_GAP;

/**
 * One line of 22px serif on 1.3 is a 28.60 line box that paints 30.00, and this box is cut for
 * ONE line: 32.
 *
 * 1.3 IS THE RENDERER'S NUMBER, READ BACK OFF THE ELEMENT — `prose()` in
 * `./components/ChickenEggBeats.tsx` sets `lineHeight: 1.3` for all three prose boxes, and
 * `getComputedStyle` on the rendered box reports `line-height: 28.6px` at `font-size: 22px`
 * (Chromium, 1280×720, 2026-08-05). The line box is SMALLER than the painted extent, not
 * larger: Source Serif 4's content area at 22px measures 30.00 (ratio 1.3636), which is the
 * ≈2px rule in the header's second table.
 *
 * ONE LINE IS A MEASURED CLAIM, NOT AN ASSUMPTION — 641.00px of type in a 728px measure with
 * the copper italics in place, and 636.03 with the webfonts absent. It is also the tightest
 * fit on the slide (87px, so 13.6% of growth headroom), and the failure is not cosmetic: a
 * second line lands in the 24px of air above the eyebrow under it. A browser check has to
 * assert the rendered line count here; the box does not have room to hide a wrap.
 */
export const WORKAROUND_HEIGHT = 32;

/** The air between the confession and the label over its bill: 24. Bigger than the 12 that
 *  binds an eyebrow to its own list, smaller than the 40 of a beat change — the bill is part
 *  of beat 2, not a new beat. Not exported. */
const WORKAROUND_TO_EYEBROW = 24;

/** `WHAT IT COST`'s shelf: 318. */
export const COSTS_EYEBROW_TOP = WORKAROUND_TOP + WORKAROUND_HEIGHT + WORKAROUND_TO_EYEBROW;

/** A mono eyebrow's box: 16. 11px on 1.25 is a 13.75 line box that paints 14.00, so 2 spare.
 *  ONE CONSTANT FOR BOTH eyebrows — the bill's and the card's — because they are the same
 *  string register at the same size, and two numbers here would only ever drift. */
export const EYEBROW_HEIGHT = 16;

/** The air between an eyebrow and the list it labels: 12. Deliberately the smallest gap in
 *  the column — the eyebrow belongs TO its list, and a larger gap would let it read as a
 *  heading over the whole beat. Used by both lists. Not exported. */
const EYEBROW_TO_LIST = 12;

/** The bill's first row: 346. */
export const COST_ROWS_TOP = COSTS_EYEBROW_TOP + EYEBROW_HEIGHT + EYEBROW_TO_LIST;

/** A list row's box: 22. 15px sans on 1.3 is a 19.50 line box, and this is the one row on the
 *  slide whose face asks for LESS than its line box (Inter's content area is 19.00), so 19.50
 *  is the painted extent and 2.5 is spare.
 *  ONE HEIGHT FOR BOTH LISTS: the bill and the terms are the same register at the same size,
 *  and what differs between them is the budget each has, not the shape of a row. */
export const LIST_ROW_HEIGHT = 22;

/** The air between two list rows: 16, which puts 18.5px between two rendered 19.50px lines.
 *  A LIST, NOT FOUR STATEMENTS — the four costs are one bill and the four terms are one
 *  offer, so they are set to be read as blocks. (`./geometry.ts` spends 53.4px between its
 *  figures for the opposite reason: those are four separate claims.) Not exported. */
const LIST_ROW_GAP = 16;

/** How far apart two list rows sit: 38. Derived, so both capacities move with it. */
const LIST_ROW_PITCH = LIST_ROW_HEIGHT + LIST_ROW_GAP;

/** How tall a block of `count` list rows is. Private: it exists to derive the two capacities
 *  and to keep their throw messages measured rather than typed. */
function listBlockHeight(count: number): number {
  return (count - 1) * LIST_ROW_PITCH + LIST_ROW_HEIGHT;
}

/**
 * How many costs the bill names: 4, PINNED to `./content.ts`'s tuple, exactly as
 * {@link DEADLOCK_CLAUSE_COUNT} is.
 *
 * A SECOND LOCK AND NOT THE FIRST ONE. `./content.ts` already refuses a fifth cost at its own
 * `Four<LineItem>` annotation; this pin is what makes the geometry notice if that tuple is
 * ever widened, because every shelf under the bill is derived from this number. The relation
 * it CANNOT express is `COST_COUNT <= COST_ROW_CAPACITY` — the capacity is a computed
 * `number`, so that one belongs to `tests/unit/invest-chicken-egg.test.tsx`.
 */
export const COST_COUNT: ChickenEggCopy["costs"]["length"] = 4;

/** Where the bill ends: 482. Derived from the count, and the line the pilot card's bottom
 *  border is pinned to (see {@link CARD_TOP}) — which is why it is exported: a browser check
 *  measures both lists' last rows against it. */
export const COST_ROWS_BOTTOM = COST_ROWS_TOP + listBlockHeight(COST_COUNT);

// ───────────────────── the story column · beat 3, the verdict ─────────────────────

/** The air between the bill and the rule that closes it: 30. Not exported. */
const ROWS_TO_RULE_GAP = 30;

/**
 * The copper rule's shelf: 512.
 *
 * IT IS THE BILL'S TOTAL RULE, not a divider for the slide — which is why it spans
 * {@link STORY_COL_W} and stops at the gutter. A rule carried across both columns would tie
 * the offer to the bill's arithmetic, and the offer is the thing the bill is an argument for.
 */
export const RULE_TOP = COST_ROWS_BOTTOM + ROWS_TO_RULE_GAP;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css`. Its `scaleX` reveal is a
 *  transform, so it takes no layout space beyond this pixel and adds no SMIL node. */
export const RULE_HEIGHT = 1;

/** The air between the rule and the verdict: 20. Close, so the rule reads as the verdict's
 *  own rule rather than as a floating divider halfway down the column. Not exported. */
const RULE_TO_VERDICT_GAP = 20;

/** Beat 3's shelf: 533. */
export const VERDICT_TOP = RULE_TOP + RULE_HEIGHT + RULE_TO_VERDICT_GAP;

/**
 * Two lines of 26px serif on 1.3 are 67.59 of line box that paint 69.79, and this box is cut
 * for both with the same ≈2px every other box gets: 72.
 *
 * TWO LINES BY DESIGN, NOT BY ACCIDENT — 825.44px of type in a 728px measure, and 805.91 with
 * the webfonts absent. Beat 3 is the biggest prose on the slide on purpose (26 over the
 * turn's 24 over the confession's 22): §6.7 makes it load-bearing, and it is the one sentence
 * a Div Head repeats upward. A third line would take roughly twice the string it has.
 */
export const VERDICT_HEIGHT = 72;

/** Everything that hangs under the bill, as one number: 123. Private — it is the input to
 *  the capacity below, and an exported constant with no outside reader is a number two
 *  places could come to disagree about for no gain (`./geometry.ts` deletes one for exactly
 *  that reason). */
const BELOW_ROWS_HEIGHT =
  ROWS_TO_RULE_GAP + RULE_HEIGHT + RULE_TO_VERDICT_GAP + VERDICT_HEIGHT;

/** What the bill may spend between its first row and the floor, once the rule and the
 *  verdict under it are paid for: 163. Private, for the reason above. */
const COST_ROWS_BUDGET = NAV_ZONE_TOP - COST_ROWS_TOP - BELOW_ROWS_HEIGHT;

/**
 * How many cost rows this column can hold — DERIVED, so lowering the verdict or growing the
 * rule's gaps lowers the capacity in the same edit.
 *
 * `n` rows occupy `(n − 1) · pitch + height`, so the budget allows
 * `floor((budget − height) / pitch) + 1`. It comes out at 4, which is §6.7's count, with 27px
 * of the budget unspent — and that leftover IS {@link NAV_ZONE_CLEARANCE}, read from the
 * other end. The two are one piece of arithmetic, so a test that compares them proves
 * nothing; what a test can prove is that four rows fit and five do not.
 */
export const COST_ROW_CAPACITY =
  Math.floor((COST_ROWS_BUDGET - LIST_ROW_HEIGHT) / LIST_ROW_PITCH) + 1;

/** What is left between the lowest box on the stage — the verdict — and the NavBar's hover
 *  band: 27px. Derived from both ends, so an edit anywhere in the story column moves it and a
 *  browser check fails on it. The verdict's own type stops 2.21px above its box's bottom edge
 *  (see {@link VERDICT_HEIGHT}), so the painted clearance is 29.21. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - (VERDICT_TOP + VERDICT_HEIGHT);

// ───────────────────── the offer column · beat 4, the turn and its terms ─────────────────────

/**
 * Two lines of 24px serif on 1.3 are 62.38 of line box that paint 64.19, and this box is cut
 * for both: 66.
 *
 * TWO LINES BY DESIGN: 459.70px of type in a 400px measure (443.09 with the webfonts absent,
 * still two lines). 24px and not 26 — the verdict is the load-bearing beat and stays the
 * biggest prose on the stage — and not 22 either, because this is the only sentence on the
 * slide addressed to the person in the chair.
 *
 * ITS BOX ENDS AT 222, WHICH IS ALSO WHERE THE DEADLOCK BLOCK ENDS, and that is arithmetic
 * coincidence: `66 = DEADLOCK_HEIGHT` today, by two unrelated derivations. Nothing derives
 * one from the other and no test should assert it — a 3-line turn or a taller clause box
 * breaks the coincidence and breaks nothing else.
 */
export const TURN_HEIGHT = 66;

/** The card's own padding: 32 — which leaves its type the {@link CARD_MEASURE} below, and the
 *  eyebrow 65.39 of that spare. It is also the number the alignment below was bought with: the
 *  card's height is what lands its bottom edge on the bill's, and the padding is the only input
 *  to that height with slack in it (the rows' pitch and the eyebrow's box are shared with the
 *  story column). */
export const CARD_PAD = 32;

/**
 * The card's own type measure: 336 — what its eyebrow and its four terms are set in.
 *
 * EXPORTED BECAUSE THREE FILES NEED IT, which is the test this module applies to every
 * constant in it (see {@link BELOW_ROWS_HEIGHT} for the other side of it). The renderer
 * declares it as the width of the card's inner boxes, the unit test asserts that declared
 * width, and the browser harness measures it off the rendered eyebrow. All three computed
 * `OFFER_COL_W − 2 * CARD_PAD` for themselves until 2026-08-05, which is three places one
 * subtraction could come to disagree about.
 *
 * THE INNER BOXES ARE THE CARD'S SIBLINGS, NOT ITS CHILDREN — every box on this slide is
 * placed against the STAGE (see {@link clauseTop}) — so an absolutely-positioned term with no
 * declared width would shrink-wrap against the stage's 1280 and let an over-long reword run
 * past the card's own border with `scrollWidth === clientWidth` the whole way. A declared
 * measure is what gives an overflow check something true to compare.
 */
export const CARD_MEASURE = OFFER_COL_W - 2 * CARD_PAD;

/**
 * How many terms the pilot names: 4, PINNED to `./content.ts`'s tuple — see
 * {@link COST_COUNT}.
 */
export const CONSTRAINT_COUNT: ChickenEggCopy["pilotConstraints"]["length"] = 4;

/**
 * The bordered card's height: 228. Derived from what is inside it — two paddings, the
 * eyebrow, the gap that binds the eyebrow to its list, and the terms.
 *
 * THE ONLY BORDERED BOX ON THE STAGE, and the reason the offer reads as something a division
 * head can write down: the story is prose and lists, the offer is a box with terms in it.
 */
export const CARD_HEIGHT =
  2 * CARD_PAD + EYEBROW_HEIGHT + EYEBROW_TO_LIST + listBlockHeight(CONSTRAINT_COUNT);

/**
 * The card's top edge: 254 — DERIVED UPWARD FROM THE BILL'S FLOOR.
 *
 * `COST_ROWS_BOTTOM − CARD_HEIGHT`, so the card's bottom border and the bill's last row land
 * on the same line (y=482) by construction rather than by eye. The last cost label itself
 * paints to y=479.5 — the 2.5px of spare in its own row box — so the border aligns with the
 * ROW and sits clear of the type.
 *
 * WHY THIS DIRECTION. The alignment is what makes the two lists read as the two halves of
 * one trade — what it cost us, what it costs you — and below it only the verdict speaks. Cut
 * the other way (a chosen gap under the turn, the card growing downward) the alignment would
 * be a coincidence of {@link CARD_PAD}, and a card ending 20px off the bill reads as a
 * mistake rather than as a decision. The price is that a fifth term grows the card upward
 * into the turn line — see {@link constraintRowTop} — and that the story column's row pitch
 * moves the card.
 */
export const CARD_TOP = COST_ROWS_BOTTOM - CARD_HEIGHT;

/**
 * The air between the turn and the card: 32px today, and A RESIDUE rather than a choice —
 * everything else in this column is derived, so this gap is what is left.
 *
 * {@link TURN_TO_CARD_MIN} is the floor it may not fall through, and the capacity below is
 * what holds it there. Exported because it is the one number in this column that a browser
 * check should watch: it is where an edit anywhere else in either column shows up first.
 */
export const TURN_TO_CARD = CARD_TOP - (COLUMN_TOP + TURN_HEIGHT);

/** The least air the card's top border may have under the turn: 16, measured from the turn's
 *  BOX bottom — which is itself 1.81px below where its second line stops painting. Under 16 a
 *  1px border 400px wide stops reading as the top of a box and starts reading as an underline
 *  of the sentence above it. Private — it is an input to the capacity. */
const TURN_TO_CARD_MIN = 16;

/** The card's eyebrow: 286. */
export const CARD_EYEBROW_TOP = CARD_TOP + CARD_PAD;

/** The first pilot term: 314. */
export const CONSTRAINT_ROWS_TOP = CARD_EYEBROW_TOP + EYEBROW_HEIGHT + EYEBROW_TO_LIST;

/** What the terms may spend inside a card that must keep its bottom on the bill's floor and
 *  its top clear of the turn: 152. Private — it derives the capacity. */
const CONSTRAINT_ROWS_BUDGET =
  COST_ROWS_BOTTOM -
  (COLUMN_TOP + TURN_HEIGHT) -
  TURN_TO_CARD_MIN -
  (2 * CARD_PAD + EYEBROW_HEIGHT + EYEBROW_TO_LIST);

/**
 * How many terms the card can hold — DERIVED, by the same arithmetic as
 * {@link COST_ROW_CAPACITY} and against a different neighbour: the turn line above, not the
 * floor below. It comes out at 4, which is the issue's own count, with 16px of the budget
 * unspent — which is the 16 that turns {@link TURN_TO_CARD_MIN} into today's 32px of air.
 */
export const CONSTRAINT_ROW_CAPACITY =
  Math.floor((CONSTRAINT_ROWS_BUDGET - LIST_ROW_HEIGHT) / LIST_ROW_PITCH) + 1;

// ───────────────────── the derivations ─────────────────────

/**
 * Clause `index`'s top edge, in stage coordinates.
 *
 * ABSOLUTE AND NOT SLOT-RELATIVE, unlike `rowOffset` in `./geometry.ts`: there is no slot
 * here with two possible fills, every box on this slide is placed against the stage, and a
 * renderer that has to add an origin is a renderer that can forget to.
 *
 * @throws on a third clause. Refused in two places on purpose — the content's tuple is the
 *         first — because the count is an argument and not a length.
 */
export function clauseTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= DEADLOCK_CLAUSE_COUNT) {
    const nextTop = COLUMN_TOP + DEADLOCK_CLAUSE_COUNT * CLAUSE_PITCH;
    throw new Error(
      `clauseTop: no clause ${index} — the loop is a ${DEADLOCK_CLAUSE_COUNT}-clause cycle ` +
        `(0…${DEADLOCK_CLAUSE_COUNT - 1}), and a third clause is not a deadlock. It would ` +
        `land at y=${nextTop}…${nextTop + CLAUSE_HEIGHT}, spending the ${BEAT_GAP}px that ` +
        `separates beat 1 from the workaround line at y=${WORKAROUND_TOP} and leaving ` +
        `${WORKAROUND_TOP - (nextTop + CLAUSE_HEIGHT)}px between them.`,
    );
  }
  return COLUMN_TOP + index * CLAUSE_PITCH;
}

/**
 * Cost row `index`'s top edge, in stage coordinates.
 *
 * @throws on a row the column cannot hold. THE FLOOR IS WHAT REFUSES IT, and the message says
 *         so rather than naming the rule or the verdict: both of those hang off the row count
 *         and travel with a fifth row instead of being hit by it.
 */
export function costRowTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= COST_ROW_CAPACITY) {
    const overflow = listBlockHeight(COST_ROW_CAPACITY + 1) - COST_ROWS_BUDGET;
    throw new Error(
      `costRowTop: no cost row ${index} — the bill holds ${COST_ROW_CAPACITY} rows ` +
        `(0…${COST_ROW_CAPACITY - 1}). Row ${COST_ROW_CAPACITY} needs ` +
        `${listBlockHeight(COST_ROW_CAPACITY + 1)}px of the ${COST_ROWS_BUDGET}px this column ` +
        `has between y=${COST_ROWS_TOP} and the NavBar's hover band at y=${NAV_ZONE_TOP}, ` +
        `once the ${BELOW_ROWS_HEIGHT}px of rule and verdict under it are paid for — ` +
        `${overflow}px more than there is. The rule and the verdict are not what it collides ` +
        `with: they hang off the row count and move down with it, which is how the verdict's ` +
        `box ends up ${overflow}px inside the band.`,
    );
  }
  return COST_ROWS_TOP + index * LIST_ROW_PITCH;
}

/**
 * Pilot term `index`'s top edge, in stage coordinates.
 *
 * @throws on a term the card cannot hold. THE TURN LINE IS WHAT REFUSES IT — the card's
 *         bottom is pinned to the bill's floor, so it grows upward, away from the band and
 *         into the sentence above it.
 */
export function constraintRowTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= CONSTRAINT_ROW_CAPACITY) {
    throw new Error(
      `constraintRowTop: no pilot term ${index} — the card holds ` +
        `${CONSTRAINT_ROW_CAPACITY} terms (0…${CONSTRAINT_ROW_CAPACITY - 1}). Its bottom edge ` +
        `is pinned to the bill's last row at y=${COST_ROWS_BOTTOM}, so term ` +
        `${CONSTRAINT_ROW_CAPACITY} grows the card UPWARD: its top border would land at ` +
        `y=${CARD_TOP - LIST_ROW_PITCH}, inside the turn line's box ` +
        `(${COLUMN_TOP}…${COLUMN_TOP + TURN_HEIGHT}) instead of ${TURN_TO_CARD_MIN}px or more ` +
        `below it. The NavBar's band is not the constraint here — the card's bottom edge is ` +
        `${NAV_ZONE_TOP - COST_ROWS_BOTTOM}px above it.`,
    );
  }
  return CONSTRAINT_ROWS_TOP + index * LIST_ROW_PITCH;
}
