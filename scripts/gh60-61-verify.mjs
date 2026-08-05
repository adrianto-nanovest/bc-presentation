// gh#60 + gh#61's browser evidence — THE MANDATE, both slides, both leader decks,
// every pose walked forward and back.
//
// ONE SCRIPT FOR TWO TICKETS, and that is the shape of the section rather than a
// convenience. `mandate-enablement` (K.1) and `mandate-phases-gates` (K.2) are
// ADJACENT SLIDES in the only two decks that compose them, they live in ONE section
// module (`src/slides/leader-mandate/`), and — the half that decides it — they SHARE
// GEOMETRY: `phases-gates-geometry.ts` imports `BAND_PADDING_X`, `BAND_PADDING_Y`,
// `CLOSER_TOP` and `CLOSER_HEIGHT` from `geometry.ts` precisely so a room cannot tell
// the two slides apart by their gutters or watch the deck's own ask jump between two
// consecutive clicks. That claim is not checkable on either slide alone: it needs both
// bands and both closers measured off the same stage in the same run, which is what
// this file does and what two scripts could not.
//
// `tests/unit/mandate-enablement.test.tsx` and
// `tests/unit/mandate-phases-gates.test.tsx` own everything jsdom can see, and both
// are explicit about the half they cannot: jsdom places nothing, computes no text,
// resolves no CSS variable and runs no transition. So every geometric claim there is
// "both sides read the same number out of a geometry module", and every TEXT claim is
// a CHARACTER COUNT held against a budget nobody has ever measured. This script owns
// the claims that need an engine, and they are the ones these two slides are actually
// at risk of:
//
//   1. FOUR UNMEASURED CHARACTER BUDGETS, TURNED INTO PIXELS. `ONE_LINE_BUDGET_CHARS`
//      (geometry.ts), and `GATE_BUDGET_CHARS`, `CALENDAR_ROW_BUDGET_CHARS`,
//      `RUNG_LABEL_BUDGET_CHARS` (phases-gates-geometry.ts) are each a box width
//      divided by AN ASSUMED PX-PER-CHARACTER ADVANCE for a font this repo does not
//      measure anywhere else — 7.2, 6.5, 7.2 and 5.9 px/char, each stated in its own
//      doc comment and each admitted there to be an estimate. Both modules say the
//      same thing about why: "jsdom computes no text, so nothing measures this at
//      render time". BEING WRONG DOES NOT THROW. Every slot on both stages is a FIXED
//      BOX inside a stack derived from the floor upward, so an under-estimated advance
//      does not overflow anything visibly — a body line wraps and lands on the pillar
//      beneath it, a calendar row wraps and pushes the gate into the band, a rung name
//      wraps into its neighbour's column. On a projector all four read as a font that
//      failed to load.
//
//      MEASURED THREE WAYS, because each channel is blind to one of the failures, and
//      it is `scripts/gh56-verify.mjs:13-23`'s technique reused for the same reason:
//        · `scrollWidth` vs `clientWidth` — catches a `nowrap` run overflowing its own
//          box, and is VACUOUS on every wrapping box here (a 278px column stays 278px
//          wide while the text inside it wraps), so it is reported and not relied on.
//        · THE RENDERED LINE COUNT, one `Range` over the element's contents and the
//          number of DISTINCT line-box tops in `getClientRects()`. This is the only
//          channel that sees a wrap, and it is counted per ELEMENT rather than per
//          text node because `highlight()` splits every prose line into three or four
//          nodes — a wrap that falls on a node boundary leaves every individual node
//          reporting one line.
//        · THE TEXT'S OWN BOX against its cell's CONTENT edge, and the cell's ink
//          against the SLOT the geometry budgets for it. That last one is what turns
//          the check into a number: a pillar row is 38px tall and its second line
//          currently ends 1px inside it.
//
//      AND EACH BUDGET PRODUCES A NUMBER, which is what the ticket asks for: the
//      advance is MEASURED off the stage (an off-screen probe carrying the element's
//      own resolved font, `white-space: pre`, so the string is laid out unwrapped),
//      printed against the advance the module assumed, and then the BUDGET ITSELF is
//      re-priced — `BUDGET_CHARS × measured advance` against the measured width of the
//      box it has to fit in. A budget that is arithmetically unsound fails here even
//      if today's copy happens to be short enough to fit.
//
//   2. NAV-BAR CLEARANCE, MEASURED AND NOT READ. `.nav-zone` in
//      `src/styles/globals.css` is `position: absolute; bottom: 0; height: 88px`, so
//      its top edge is y = 632 — and 632 is exactly what `NAV_ZONE_TOP` in
//      `geometry.ts` claims, which is why this script does not use that constant as
//      the floor. It measures the ELEMENT'S OWN bounding box and asserts against that,
//      then cross-checks the module's number against the measurement. A harness that
//      reads the number it is checking proves only that the number equals itself
//      (gh#56 argues this at `:34-49`). The same rule sends the side margins through
//      `.fig-label`'s own rect rather than through a literal 48, and the headline floor
//      through `.slide-headline-row`'s rect rather than through K.2's `HEADLINE_BOTTOM`.
//
//      NO FOOTER EXCLUSION IS NEEDED HERE, AND THAT IS MEASURED TOO. Several slides in
//      `reveal-and-closing` print "Built with harnesses · production-grade result." on
//      a low shelf; NEITHER MANDATE SLIDE DOES — `src/slides/leader-mandate/` renders
//      no footer at all. Rather than exclude a string that is not on the stage, this
//      asserts the stronger thing: below the measured `.nav-zone` top there is NOTHING
//      but `.nav-zone` itself. An exclusion list would have hidden exactly the defect
//      the clearance check exists to find.
//
//   3. EVERY POSE, FORWARD AND BACK, IN ONE MOUNT. K.1 declares 4 poses and K.2
//      declares 5, and both unit tests answer "every declared pose renders and
//      re-renders in both directions" over `innerHTML`. That is the right test in
//      jsdom and it cannot see the thing that actually breaks: `.fade` is an opacity
//      TRANSITION plus a `fadeReveal` animation, so a pose can be structurally
//      identical and visually stuck — a lane left at 0.4 on the way back, a gate that
//      never returns, a closer that arrives and stays. So this walks 0 → last → 0 in
//      ONE mount per slide and compares each pose's COMPUTED state against its forward
//      counterpart, with the POSE COUNT READ OFF THE NAVBAR'S OWN STEP COUNTER rather
//      than hardcoded.
//
//      THE NAVIGATION GOTCHA, LEARNED THE HARD WAY AND WRITTEN DOWN SO IT IS NOT
//      RE-LEARNED. `ArrowRight` / `ArrowLeft` change SLIDE, not pose
//      (`src/deck/useKeyboardNav.ts`). Space / Enter / ArrowDown advance a STEP and
//      SPILL INTO THE NEXT SLIDE on the last step — so one press too many on K.2
//      lands silently on L.1 and every number after it belongs to another slide.
//      `ArrowUp` retreats and spills backward the same way. Two guards, both cheap and
//      both necessary: the walk presses exactly `poses − 1` times in each direction,
//      and EVERY measurement re-reads the fig label and the stage's own
//      `data-slide-index` and fails if either moved. And because a keypress that never
//      reached `window` looks exactly like a pose that renders nothing, each pose also
//      counts the REVEALED `.fade.on` boxes the slide owns and asserts the count
//      strictly rises on the way out and strictly falls on the way back.
//
//   4. REDUCED MOTION, BOTH HALVES. Zero SMIL is true BY CONSTRUCTION in this section
//      — neither figure mounts an `<svg>` at all, which both components state at their
//      heads as the reason they draw the staircase, the lanes and the pillar marks in
//      plain boxes — so it is checked cheaply (nodes in the document, `<svg>` under the
//      slide's own boxes) at every pose and in both directions, and nothing more is
//      spent on it. The half that needs an engine is that each pose still rests on its
//      FINISHED frame under `reduce`.
//
//      THE SETTLE BUDGET IS GOVERNED BY THE STAGGER AND NOT BY THE DURATION, which is
//      the deck-wide fact gh#54 found and gh#56 repeated. The global rule at
//      `globals.css:68-76` squashes `animation-duration` and `transition-duration` to
//      0.01ms; IT DOES NOT TOUCH `animation-delay` OR `transition-delay`, and `Reveal`
//      puts the whole stagger in the delay. The longest chain in this section is K.2's
//      calendar at `REVEAL_LEAD_MS + 3 × PHASE_STAGGER_MS + 60` = 450ms, which still
//      elapses in real time under `reduce`. A budget cut to the squashed duration
//      would report a false "incomplete" on a deck that squashed everything correctly.
//
//      WITH gh#56'S POSITIVE CONTROL, once per slide. Under `reduce` there is no
//      IN-BETWEEN frame at all; under normal motion there is. The second is the first's
//      control, because a sampler that could never catch an intermediate opacity would
//      report a squashed transition on a deck that never squashed one — which is how
//      gh#54's first version passed the claim vacuously.
//
//   5. THE SHARED BAND AND THE SHARED CLOSER SHELF — the one claim that needs both
//      slides on one stage. `phases-gates-geometry.ts:28-34` records that these two
//      numbers WERE re-typed and HAD already drifted (13 against 14) under a comment
//      claiming they matched "to the pixel". The import fixed the cause; this measures
//      the effect, on screen, in both decks: both bands span the same x, carry the same
//      resolved inner padding and start their eyebrow at the same inset; both closers
//      start on the same shelf at the same left edge and the same width. THE BAND
//      HEIGHTS ARE DELIBERATELY NOT COMPARED — K.1 budgets a 28px statement line and
//      K.2 a 27px one, so the two bands are legitimately 118px and 116px tall, and a
//      check that demanded otherwise would be a check demanding the wrong thing.
//
//   6. THE LADDER IS THE SAME OBJECT. `mandatePhasesGatesContent.rungs` IS
//      `gapLadderContent.rungs` — the same array, by import — and the unit test asserts
//      that identity with `toBe`. What a unit test cannot do is show that the ROOM sees
//      the same five names in the same order: that needs two slides in one composed
//      deck, rendered. So this navigates to `gap-capability-ladder`, READS ITS FIVE
//      RUNG NAMES OFF THE STAGE, and holds K.2's staircase against them. Nothing is
//      transcribed — the rung ids this script then builds K.2's required-box list from
//      are the ones the OTHER SLIDE printed, so a rung renamed in `leader-gap` moves
//      both sides of this comparison and a rung renamed in only one of them fails it.
//      The same applies to K.2's ladder heading, which is composed from
//      `gapLadderContent.figLabel`: it is checked against the label that slide actually
//      rendered.
//
// NO SECTION LETTER IS HARDCODED ANYWHERE IN THIS FILE (§3.4 R2, §3.5). The three
// slides it needs are resolved by a full walk of the composed deck, keyed on a testid
// each one mounts at POSE 0 and on the FIG LABEL text each one prints; the letters and
// numbers are then DERIVED from what was rendered and only their RELATIONSHIPS are
// asserted — K.1 and K.2 share a letter, carry consecutive numbers and sit at adjacent
// indices, and exactly one slide in the whole deck prints each reference. #58 and #59
// will move these letters, and nothing here has to be edited when they do. That is the
// opposite of the call gh#56 made for its own five figures, and deliberately: this
// section's tickets moved no letter at all (`src/slides/leader-mandate/index.ts`), so
// there is no letter claim to pin — the claim is the ADJACENCY, which is what the
// shared closer shelf is an argument about.
//
// THE STAGE'S SCALE, handled explicitly for gh#54's reason. `useViewportScale`
// CSS-transforms `.stage-wrap` by `min(w/1280, h/720)`, and a raw `boundingBox()` at a
// 1280×720 viewport happens to need no conversion. This script reads the `.stage-wrap`
// matrix, ASSERTS it is 1:1, and converts every rect and every probe width through the
// stage's own origin and scale anyway — so every number it prints is a stage
// coordinate whatever viewport it is handed.
//
// Modelled on `scripts/gh56-verify.mjs` and failing the same way: every assertion
// prints `ok` / `FAIL` with both numbers, and a failure exits 1, so this is runnable
// from a gate and not only readable by a human.
//
// Usage:
//   node scripts/gh60-61-verify.mjs                        # gems-leader first
//   node scripts/gh60-61-verify.mjs --variant=berau-leader
//   node scripts/gh60-61-verify.mjs --reduced
//   DECK_URL=http://localhost:5183 node scripts/gh60-61-verify.mjs
//
// The variant is explicit for the same reason the export scripts take one (gh#27): a
// bare localhost resolves to `general`, which composes no `mandate` run at all.
//
// `--variant` PICKS THE ORDER, NOT THE SET. K.2's calendars, band and closer are the
// section's only brand axis (§4.4 slot 6), so both leader decks are always measured;
// the flag decides which one goes first and which one the one-off structural checks
// (the stage scale, the motion samples, the budget re-pricing) run against. Default
// `gems-leader` — the brand at its maximum on three of the four budgets: the longest
// calendar row, the longest band provenance and an 87-character closer against Berau's
// 50. A standard variant is not silently skipped: it exits 1 saying the deck composes
// no `mandate` run.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";
// gh#50's shared settle helper — every finite CSS animation and transition on the page
// has ended. REUSED AND NOT REIMPLEMENTED, and it is the right instrument for the
// reduced-motion half specifically: it waits for the ANIMATIONS rather than for a
// guessed number of milliseconds, so the delay-not-duration problem in the header
// cannot produce a false "settled" (a transition still inside its delay phase is
// `running`, and this waits for it).
import { settlePose } from "./lib/settle.mjs";
// The brand and deck-set table, imported for the same reason `./lib/variant-arg.mjs`
// imports it: it is plain data with no imports, so bare Node's type stripping resolves
// it standalone, and WHICH variants are leader decks stays its answer.
import { VARIANTS } from "../src/deck-variants.ts";
// K.1's geometry. Imported for CROSS-CHECKS ONLY — every claim below is asserted
// against a measured rect first, and these constants are then held against that
// measurement. Nothing here is used as the floor, the margin or the ceiling.
//
// `./content.ts` is deliberately NOT imported, and for two reasons rather than one:
// it reaches `leader-gap` through the `@/` bundler alias that bare Node does not
// resolve, and a harness that asserts the strings it imports proves only that the
// content module equals itself. Every string this script needs is read off a rendered
// stage instead — the rung names off `gap-capability-ladder`, everything else off the
// two slides under test.
//
// `./phases-gates-geometry.ts` IS NOT IMPORTED HERE EITHER, and cannot be: it imports
// `./geometry` without a file extension, which bare Node ESM will not resolve
// (`allowImportingTsExtensions` is off, so the specifier cannot carry one). Its own
// header prices that and names the way out — "a verification script that needs numbers
// off this stage should import `./geometry.ts` for the shared eight and read the rest
// through Vite". That is exactly what happens below: the module is `import()`ed INSIDE
// THE PAGE, through the same dev server that built the slide, so the numbers this
// script cross-checks are the numbers the running figure was laid out from and not a
// second transcription of them.
import {
  BAND_PADDING_X,
  BAND_PADDING_Y,
  BODY_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  COLUMN_WIDTH,
  CONTENT_WIDTH,
  DIVIDER_X,
  HEADING_TOP,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  ONE_LINE_BUDGET_CHARS,
  PILLAR_ROW_HEIGHT,
  PILLAR_TEXT_WIDTH,
  SIDE_MARGIN,
  TRACK_ROW_HEIGHT,
} from "../src/slides/leader-mandate/geometry.ts";

const USAGE = [
  "Usage: node scripts/gh60-61-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>]",
  "",
  `  --variant=<id>   Leader deck to measure FIRST. Default: gems-leader. Ids: ${VARIANT_IDS.join(", ")}`,
  "                   Both leader decks are always measured; a standard deck exits 1.",
  "  --reduced        Run under `prefers-reduced-motion: reduce`.",
  "  --out=<dir>      Where to write the shots. Default: /tmp/gh60-61",
  "",
  "  DECK_URL         Base url to render. Default: http://localhost:5173",
].join("\n");

const { variant: parsedVariant, flags, values } = parseVariantArgOrExit(
  process.argv.slice(2),
  USAGE,
  { booleans: ["reduced"], values: ["out"] },
);

// The shared parser defaults to `general`, which composes no `mandate` run. An explicit
// `--variant` always wins.
const PRIMARY = process.argv.slice(2).some((a) => a.startsWith("--variant"))
  ? parsedVariant
  : "gems-leader";
const REDUCED = flags.reduced;
const OUT = values.out ?? (REDUCED ? "/tmp/gh60-61-reduced" : "/tmp/gh60-61");
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
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

// ───────────────────── who is who, without a letter ─────────────────────

/**
 * Which slide is which, by a testid that is on the stage AT POSE 0 and by the label
 * its `FigLabel` prints.
 *
 * POSE 0 MATTERS. Both mandate figures mount every box from pose 0 (only the `.fade`
 * switches move), so any of their testids would do; `gap-capability-ladder`'s rung
 * names are the same. Keyed on pose 0 anyway, because a harvest that had to walk each
 * slide's poses would take four minutes per deck.
 *
 * THE LABEL IS TRANSCRIBED AND THE LETTER IS NOT. `figLabel` is authored copy — a
 * label is what the room reads and it is a fixed decision of the ticket — while the
 * letter and number are DERIVED per composed deck (§3.5) and will move on #58/#59.
 * So the labels are pinned here and the references are only ever compared to each
 * other.
 */
const SLIDES = {
  enablement: { marker: "mandate-pillars-heading", label: "THE ENABLEMENT MODEL" },
  phasesGates: { marker: "mandate-phases-ladder-heading", label: "PHASES AND GATES" },
  ladder: { marker: "gap-rung-l1-name", label: "THE CAPABILITY LADDER" },
};

/**
 * K.1's four pillars and three tracks, and K.2's four phases, by id and in order.
 *
 * TRANSCRIBED FROM §6.8, which is where the counts and the order are decided, and
 * REQUIRED rather than discovered for gh#56's reason: a gate that measures whatever it
 * finds passes a missing pillar by measuring one fewer. The rung ids are the
 * deliberate exception — they belong to `gap-capability-ladder` and are READ OFF THAT
 * SLIDE'S RENDERED STAGE, which is assertion 6.
 */
const PILLAR_IDS = ["access", "curriculum", "practice", "support"];
const TRACK_IDS = ["everyone", "builders", "stewards"];
const PHASE_IDS = ["p0", "p1", "p2", "p3"];

/**
 * The declared pose counts, held against the NavBar's own step counter.
 *
 * THE WALK IS DRIVEN BY THE COUNTER AND NOT BY THESE, so a fifth pose added to either
 * slide def is WALKED. These exist so that the same edit also fails a check here
 * rather than quietly extending a reveal map this script would then read past the end
 * of — which is the failure mode of "just discover it".
 */
const DECLARED_POSES = { enablement: 4, phasesGates: 5 };

// ───────────────────── the floors (gh#50) ─────────────────────

/**
 * gh#50 call 3's projector floors, restated here rather than imported: the constants
 * live in `E12Primitives` and are section E's, and a shared typography module is a
 * cleanup this ticket is not. Two copies on purpose — a harness that reads the number
 * it is checking proves only that the number equals itself.
 *
 * BOTH FIGURES ASK FOR THIS EXPLICITLY. `EnablementModel.tsx` and `PhaseLadder.tsx`
 * each say, in the same words, that their sizes are "stated once, at the call sites,
 * where a reviewer can check them" because "a computed font size is not something
 * jsdom has". A reviewer is not a gate; this is. K.2's 10px phase chips and 10px
 * calendar rows are the two nearest the mono floor.
 */
const MONO_FLOOR = 9.5;
const PROSE_FLOOR = 10.5;

/**
 * The COLOUR floor, and it is two gates rather than one because the deck's own ladders
 * disagree about which is the honest question. Both components declare "CSS VARS ONLY"
 * and "nothing here rests below `--neutral-300`"; jsdom can compare the inline strings
 * and cannot resolve one of them.
 *
 *   · THE TIER GATE. `--neutral-400` and everything under it is out of bounds for text
 *     on this stage — `scripts/projection-test.mjs`'s reportable grey. RESOLVED
 *     THROUGH `getComputedStyle` at run time, not transcribed: the tier names are read
 *     off a probe element in the page, so `globals.css` retuning `--neutral-400` moves
 *     this gate with it. NO EXEMPTIONS.
 *
 *   · THE LUMINANCE GATE, the stricter reading of "not below the `--neutral-300`
 *     tier". It has to be stated with its exception, because the deck HAS a text
 *     colour dimmer than `--neutral-300` by luminance and uses it everywhere:
 *     `--copper-400` (0.297 against `--neutral-300`'s 0.366). It is the deck-wide
 *     keyword tier every `em.kw` renders in and the mono LABEL tier `SHARED_TIER.heading`
 *     puts both slides' headings and both band eyebrows in. So the gate is: anything
 *     under the measured `--neutral-300` luminance must be EXACTLY `--copper-400`, and
 *     the elements it covers are printed by name.
 *
 * A slide-level gate that failed on a deck-wide decision would be a gate everyone
 * learns to ignore — gh#53 recorded that finding after its first run flagged the
 * NavBar's counters, `FigLabel`'s separator and every keyword in the deck.
 */
const BELOW_FLOOR_TIERS = [
  "--neutral-400",
  "--neutral-500",
  "--neutral-700",
  "--neutral-800",
  "--neutral-950",
];
/** The one tier allowed under the luminance floor, and it must be this one. */
const LUMINANCE_EXEMPT_TIER = "--copper-400";
/** The tier the floor itself is. */
const FLOOR_TIER = "--neutral-300";

/**
 * Deck CHROME, excluded from the text audit by name and with the reason. gh#53's
 * finding, and the exclusions are the same two:
 *   · `.nav-zone` — the NavBar's `Step` / `Slide` counters are 9px mono on
 *     `--copper-700`, they are on all 62 slides of every deck, and they are not
 *     projected copy. (They are also where the only `<svg>` on either of these stages
 *     lives — the chevrons — which is why the SMIL assertion scopes its `<svg>` count
 *     to the slide's own boxes and its SMIL count to the whole document.)
 *   · `.fig-label .dot` — the `·` between the figure reference and the label, also
 *     `--copper-700`, also on every numbered slide in the deck.
 * Everything else inside the stage is audited, both headlines and both derived figure
 * references included.
 */
const CHROME = [".nav-zone", ".fig-label .dot"];

// ───────────────────── timing ─────────────────────

/** Mount, before the first measurement. Pose 0 has a reveal on both slides — K.1's
 *  four pillars and K.2's five rungs are `on` from mount — so this covers the app
 *  booting, the fonts landing and that first stagger. */
const MOUNT_MS = 900;

/**
 * The floor wait after a pose change, before `settlePose` is asked whether the page is
 * quiet. GOVERNED BY THE STAGGER, NOT BY THE DURATION — see the header.
 *
 * The longest chain in this section is K.2's calendar: `REVEAL_LEAD_MS` (120) + 3 ×
 * `PHASE_STAGGER_MS` (90) + the calendar's own 60 = 450ms of DELAY, which the global
 * `reduce` rule does not squash. Under normal motion that delay is followed by a 450ms
 * transition and a 500ms `fadeReveal`, finishing at ≈950ms.
 *
 * 1400 normal / 700 under `reduce`. Neither number is slack: the reduced one is
 * DELIBERATELY TOO SHORT to hide a transition that was never squashed (450 + 450 + 500
 * = 1400ms), so a deck that lost the `reduce` rule fails the settle assertion below
 * rather than passing it late.
 */
const POSE_MS = REDUCED ? 700 : 1400;

/** What `settlePose` may spend before it reports the page never went quiet. Generous
 *  against the 950ms worst case above, because a cap that is hit is a REPORTED
 *  failure and not a thrown one — a stuck animation must not turn this into a hang. */
const SETTLE_CAP = 4000;

/**
 * The mid-reveal sample is taken AT AN EVENT, not at a wall-clock offset, for the
 * reason gh#54 records against itself: its first version sampled 350ms after the
 * keypress, and under `--reduced` that frame came back all zeros — the reveal had not
 * begun, and "no element is ever mid-transition" passed by measuring a figure that had
 * not started moving. So the sampler POLLS until the first box leaves opacity 0 and
 * samples THAT frame; `sampled == null` is a failure rather than a pass.
 */
const ARRIVAL_POLL_MS = 16;
const ARRIVAL_DEADLINE_MS = 2500;

/**
 * How close a rendered edge can be asked to sit to a geometric one: 1/64px.
 *
 * Chromium lays out in `LayoutUnit`s of 1/64px and truncates toward zero on the way
 * in, so a box the module puts at a fractional coordinate can render nowhere else. A
 * tolerance any wider than one LayoutUnit would start hiding real drift.
 */
const SUBPIXEL = 1 / 64;

/** The slack a TEXT box gets against the cell edge it must not cross. One pixel, and
 *  it is here because a glyph's ink box and its advance box are not the same rectangle
 *  — an italic serif closer overhangs its own advance by a fraction. Anything past 1px
 *  is a layout fault and not a side bearing. */
const TEXT_SLACK = 1;

// ───────────────────── the harness ─────────────────────

let failures = 0;
function check(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  if (!pass) failures += 1;
  console.log(
    `${pass ? "ok  " : "FAIL"}  ${label}${
      pass
        ? ""
        : `\n        expected ${JSON.stringify(expected)}\n        actual   ${JSON.stringify(actual)}`
    }`,
  );
}

const n2 = (v) => (v == null ? null : Math.round(v * 100) / 100);

/** WCAG relative luminance, so the colour floor is one number rather than a list of
 *  allowed strings. Duplicated inside the page below — an `evaluate` callback cannot
 *  close over this one. */
function relativeLuminance(r, g, b) {
  const lin = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function overlaps(a, b) {
  return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
}

/** `"02 / 05"` → 5. The DECLARED pose count, straight off the NavBar's own step
 *  counter — the deck's answer rather than this file's. */
function poseTotal(counter) {
  const m = /(\d+)\s*\/\s*(\d+)/.exec(counter ?? "");
  return m ? Number(m[2]) : null;
}

/** `"— FIG. K.2·PHASES AND GATES"` → `{ letter: "K", num: 2, label: "PHASES AND GATES" }`.
 *  Parsed rather than matched, so the relationships between the three references can be
 *  asserted without any of them being written down. */
function parseFig(fig) {
  const m = /^— FIG\. ([A-Z])\.(\d+)·(.+)$/.exec(fig ?? "");
  return m ? { letter: m[1], num: Number(m[2]), label: m[3] } : null;
}

/**
 * Walk the WHOLE deck once and record, per index, the derived figure caption and which
 * of `SLIDES` is on the stage.
 *
 * A FULL WALK AND NOT A SEARCH, which is the difference that makes the "exactly one
 * slide prints this" assertions mean anything: a loop that stopped at the first match
 * would pass a deck holding two. It is also how the three indices are DISCOVERED — §3
 * derives every position and Phase 7 inserts K.3 behind these two — so a literal index
 * would check whatever slide 49 had become.
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
    // A FIXED SETTLE, AND NOT A `waitForSelector` — WHICH WAS TRIED AND IS WRONG.
    // There is no one element every slide mounts: the cover carries no
    // `[data-testid="slide"]`, so waiting on that hangs the harvest at row 0, and
    // waiting on each slide's OWN marker would beg the question this loop exists
    // to answer. 90ms after `domcontentloaded` is a guess, but an affordable one:
    // a lost race surfaces as "this deck composes no `mandate` run", and the
    // slide count printed beside that message contradicts it loudly enough to
    // catch — see the `DECK_URL` note there for the failure that actually bites.
    await page.waitForTimeout(90);
    rows.push(
      await page.evaluate((markers) => {
        const at = (id) => document.querySelector(`[data-testid="${id}"]`);
        return {
          fig:
            document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
          found: Object.entries(markers)
            .filter(([, id]) => at(id))
            .map(([name]) => name),
        };
      }, Object.fromEntries(Object.entries(SLIDES).map(([k, v]) => [k, v.marker]))),
    );
  }
  return rows.map((r, i) => ({ index: i, ...r }));
}

/**
 * Everything the slide currently on the stage is, in STAGE COORDINATES.
 *
 * ONE `evaluate`, because every rect, every computed style, every line count and every
 * advance probe has to come from the SAME LAYOUT: measuring the boxes in one round
 * trip and the nav zone in the next is how a harness reports a clearance that no
 * single frame ever had.
 *
 * @param boxIds        Every testid to box. Missing is reported, never skipped.
 * @param containerIds  Boxes whose DIRECT CHILDREN are also measured — K.2's calendar
 *                      slots, whose rows carry no testid of their own and are exactly
 *                      what `CALENDAR_ROW_BUDGET_CHARS` is a budget for.
 * @param ownerPrefix   The testid prefix this slide owns, for the `<svg>` count.
 */
function measure(page, { boxIds = [], containerIds = [], ownerPrefix = "mandate-" } = {}) {
  return page.evaluate(
    ({ boxIds, containerIds, ownerPrefix, probeTiers, chrome }) => {
      const stage = document.querySelector('[data-testid="slide"]');
      const wrap = document.querySelector(".stage-wrap");
      const t = getComputedStyle(wrap).transform;
      // `min(w/1280, h/720)` as the browser actually applied it. `undefined` and not
      // `""` for the identity case: `new DOMMatrixReadOnly("")` is not identity.
      const m = new DOMMatrixReadOnly(t === "none" ? undefined : t);
      const scale = m.a;
      const origin = stage.getBoundingClientRect();

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

      /** An element's CONTENT box — the edge a run has to fit inside. Type that eats
       *  its own padding and stops 0px from a border has already failed. */
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
          padLeft: px("paddingLeft"),
          padTop: px("paddingTop"),
          padRight: px("paddingRight"),
          padBottom: px("paddingBottom"),
          border: px("borderLeftWidth"),
        };
      };

      /**
       * THE RENDERED LINE COUNT, and the TEXT'S OWN BOX, for one element.
       *
       * One `Range` over the element's whole contents, one client rect per line box —
       * counted as DISTINCT ROUNDED TOPS rather than as `rects.length`, because
       * `highlight()` splits every prose line into three or four inline boxes and
       * `getClientRects()` returns one rect per box per line. Distinct tops is the
       * true number of lines the room sees; `rects.length` would report a one-line
       * closer as four.
       */
      const textMetrics = (el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((r) => r.width > 0);
        if (rects.length === 0) return null;
        const box = range.getBoundingClientRect();
        return {
          lines: new Set(rects.map((r) => Math.round(r.top * 4) / 4)).size,
          box: conv(box),
        };
      };

      /**
       * THE MEASURED ADVANCE — the element's own text, laid out UNWRAPPED, in the
       * element's own resolved font.
       *
       * `white-space: pre` and a copy of every metric-bearing property the cascade
       * resolved, so this is the width the string WOULD occupy on one line. That is
       * exactly the quantity the four character budgets divide a box width by, and the
       * only way to price a budget without waiting for a copy edit long enough to
       * break it.
       *
       * Appended to the STAGE (absolutely positioned, hidden) rather than to the body,
       * so it inherits the same font scaling context the real box has and the same
       * `.stage-wrap` transform the conversion then divides out.
       *
       * `letterSpacing` in Chromium adds a trailing advance after the last glyph, so
       * this OVER-estimates by up to one letter-space. That is the direction a budget
       * check has to be wrong in.
       */
      const advanceOf = (el) => {
        const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
        if (!text) return null;
        const cs = getComputedStyle(el);
        const probe = document.createElement("span");
        for (const p of [
          "fontFamily",
          "fontSize",
          "fontStyle",
          "fontWeight",
          "fontStretch",
          "fontVariant",
          "fontKerning",
          "letterSpacing",
          "wordSpacing",
          "textTransform",
        ]) {
          probe.style[p] = cs[p];
        }
        probe.style.whiteSpace = "pre";
        probe.style.position = "absolute";
        probe.style.left = "-99999px";
        probe.style.top = "0px";
        probe.style.visibility = "hidden";
        probe.textContent = text;
        stage.appendChild(probe);
        const width = probe.getBoundingClientRect().width / scale;
        probe.remove();
        return { text, chars: text.length, width, perChar: width / text.length };
      };

      /** The opacity a room actually sees: every ancestor's, multiplied. A run inside
       *  a `.fade` that has not been switched on is not on the stage, whatever its
       *  geometry says. */
      const effectiveOpacity = (el) => {
        let o = 1;
        for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
          o *= parseFloat(getComputedStyle(a).opacity);
        }
        return o;
      };

      const at = (id) => document.querySelector(`[data-testid="${id}"]`);
      const lum = (color) => {
        const c = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!c) return 1;
        const lin = c.slice(1, 4).map((v) => {
          const s = Number(v) / 255;
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
      };

      /** The deck's own colour ladder, resolved through the cascade rather than
       *  transcribed — so a retuned `globals.css` moves the floor with it. */
      const probe = document.createElement("div");
      stage.appendChild(probe);
      const tiers = {};
      for (const name of probeTiers) {
        probe.style.color = `var(${name})`;
        tiers[name] = getComputedStyle(probe).color;
      }
      probe.remove();

      /** One entry per element this slide owns, keyed by testid. */
      const describe = (el) => {
        const cs = getComputedStyle(el);
        const tm = textMetrics(el);
        return {
          mounted: true,
          on: el.classList.contains("on"),
          fade: el.classList.contains("fade"),
          opacity: parseFloat(cs.opacity),
          effOpacity: effectiveOpacity(el),
          text: (el.textContent ?? "").replace(/\s+/g, " ").trim(),
          rect: rect(el),
          content: contentRect(el),
          // The `.fade` translates 8px on the way in; the settled frame is the
          // identity, and a pose left mid-transition shows up here as well as in the
          // opacity.
          translateY: cs.transform === "none" ? 0 : new DOMMatrixReadOnly(cs.transform).f,
          color: cs.color,
          fontSize: parseFloat(cs.fontSize),
          mono: /mono/i.test(cs.fontFamily),
          lineHeight: parseFloat(cs.lineHeight),
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          lines: tm?.lines ?? 0,
          textBox: tm?.box ?? null,
          advance: advanceOf(el),
        };
      };

      const boxes = {};
      for (const id of boxIds) {
        const el = at(id);
        boxes[id] = el ? describe(el) : { mounted: false };
      }
      /** Containers whose ROWS are the thing a budget is written about. */
      const containers = {};
      for (const id of containerIds) {
        const el = at(id);
        containers[id] = el
          ? { mounted: true, rows: [...el.children].map((c) => describe(c)) }
          : { mounted: false, rows: [] };
      }

      /**
       * Every text RUN on the stage, at text-node granularity — the input to the
       * gh#50 floors and the margin audit.
       *
       * TEXT NODES AND NOT ELEMENTS, which is `projection-test.mjs`'s decision and the
       * right one: both closers are one `<p>` holding four runs in two colours, and an
       * element-level walk would read the `<p>`'s own inherited colour and miss both
       * `em.kw` spans.
       */
      const runs = [];
      const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent.trim();
        if (!text) continue;
        const el = n.parentElement;
        if (!el) continue;
        if (chrome.some((sel) => el.closest(sel))) continue;
        const cs = getComputedStyle(el);
        const range = document.createRange();
        range.selectNodeContents(n);
        const tbox = range.getBoundingClientRect();
        if (!tbox.width) continue;
        const owner = el.closest("[data-testid]");
        runs.push({
          owner: owner?.dataset.testid ?? null,
          tag: el.tagName,
          keyword: el.matches("em"),
          text: text.length > 46 ? `${text.slice(0, 43)}…` : text,
          size: Math.round(parseFloat(cs.fontSize) * 100) / 100,
          mono: /mono/i.test(cs.fontFamily),
          color: cs.color,
          luminance: lum(cs.color),
          textBox: conv(tbox),
          effOpacity: effectiveOpacity(el),
        });
      }

      /** Everything painted BELOW a given y, chrome and all — the input to the
       *  clearance check's second half. Elements only, leaf-ish, with ink. */
      const belowFloor = (floorY) => {
        const out = [];
        for (const el of stage.querySelectorAll("*")) {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          const c = conv(r);
          if (c.bottom <= floorY + 0.01) continue;
          // A full-stage wrapper is not "painted below the floor"; it contains the
          // floor. Only boxes that START at or under it are reported.
          if (c.top < floorY - 0.01) continue;
          out.push({
            tag: el.tagName,
            testid: el.dataset?.testid ?? null,
            nav: !!el.closest(".nav-zone"),
            text: (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 40),
            top: c.top,
            bottom: c.bottom,
          });
        }
        return out;
      };

      const navRect = rect(document.querySelector(".nav-zone"));

      return {
        scale,
        stage: { width: origin.width / scale, height: origin.height / scale },
        // MEASURED, not read from either geometry module — this is the floor.
        navZone: navRect,
        navZoneCount: document.querySelectorAll(".nav-zone").length,
        below: belowFloor(navRect.top),
        // The deck's own side margins, as the chrome draws them.
        marginBand: rect(document.querySelector(".fig-label")),
        headlineRow: rect(document.querySelector(".slide-headline-row")),
        headline: document.querySelector("h1.slide-headline")?.textContent ?? null,
        figLabel:
          document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
        slideIndex: stage.dataset.slideIndex,
        // The DECLARED pose count, read off the NavBar's own step counter — the first
        // `.nav-group-count` is `NN / TT` for the step group.
        stepCounter: document.querySelector(".nav-group-count")?.textContent ?? null,
        // HOW MANY OF THIS SLIDE'S OWN BOXES ARE SWITCHED ON. The cheapest proof that
        // a keypress actually reached `window`: a press that did not land leaves this
        // number where it was.
        revealedCount: document.querySelectorAll(
          `[data-testid^="${ownerPrefix}"].fade.on`,
        ).length,
        tiers,
        boxes,
        containers,
        runs,
        // The whole DOCUMENT, not the slide's subtree: the claim is that this section
        // introduces no SMIL anywhere, chrome included.
        smil: document.querySelectorAll(
          "animate, animateTransform, animateMotion, set, animateColor",
        ).length,
        // AND NO `<svg>` UNDER THIS SLIDE'S OWN BOXES. This is the construction that
        // closes the SMIL question by design rather than by discipline (both figure
        // headers say so); the NavBar's own chevrons are SVG and are not this slide's.
        slideSvg: [...document.querySelectorAll(`[data-testid^="${ownerPrefix}"]`)].reduce(
          (sum, b) => sum + b.querySelectorAll("svg").length,
          0,
        ),
      };
    },
    {
      boxIds,
      containerIds,
      ownerPrefix,
      probeTiers: [...BELOW_FLOOR_TIERS, FLOOR_TIER, LUMINANCE_EXEMPT_TIER],
      chrome: CHROME,
    },
  );
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  ...(REDUCED ? { reducedMotion: "reduce" } : null),
});
const page = await context.newPage();

const noise = [];
/** Vite's HMR socket, which drops when this harness navigates the deck looking for the
 *  slides, and React's devtools nudge. Both are the dev SERVER talking, not the deck,
 *  and neither exists on a deployment. Nothing else is filtered. */
const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]|Download the React DevTools/;
page.on("console", (m) => {
  if ((m.type() === "error" || m.type() === "warning") && !DEV_SERVER_NOISE.test(m.text())) {
    noise.push(`${m.type()}: ${m.text()}`);
  }
});
page.on("pageerror", (e) => noise.push(`pageerror: ${e.message}`));

const stageLocator = page.locator('[data-testid="slide"]');
const shot = (name) => stageLocator.screenshot({ path: `${OUT}/${name}.png` });

/**
 * Land on one slide, wait for the stage AND for the fonts, and SAY SO when the slide
 * cannot be reached.
 *
 * THE FONTS, not `networkidle`. Every width this script asserts is a text measurement,
 * so measuring before the webfont lands would measure the fallback —
 * `document.fonts.ready` is the exact signal for that.
 *
 * THE RETRY is the one `scripts/gh53-verify.mjs` and gh#56 already carry, for the
 * reason they give: this harness navigates the deck 124 times in a row and Vite's dev
 * server does not always keep up. What is new is the DIAGNOSTIC — a bare `waitFor`
 * timeout says only "not visible", and the two facts worth having (what the page threw,
 * and what it rendered instead) are gone by the time the stack prints.
 */
async function gotoSlide(variant, index, settleMs = 0) {
  for (const attempt of [1, 2, 3]) {
    try {
      await page.goto(url(variant, { slide: index }), { waitUntil: "domcontentloaded" });
      await stageLocator.waitFor({ timeout: 15000 });
      await page.evaluate(() => document.fonts.ready);
      if (settleMs) await page.waitForTimeout(settleMs);
      return;
    } catch (err) {
      if (attempt === 3) {
        const dump = await page
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
      await page.waitForTimeout(600);
    }
  }
}

/** Collected across the whole run — every pose on every slide in every deck that
 *  `settlePose` said was still moving when it was measured. */
const stillMoving = [];
async function settleAt(where) {
  await page.waitForTimeout(POSE_MS);
  const quiet = await settlePose(page, SETTLE_CAP);
  if (!quiet) stillMoving.push(where);
}

// ───────────── is this deck even holding the two slides? ─────────────

await page.goto(url(PRIMARY), { waitUntil: "domcontentloaded" });
// The count is published by the app, so it does not exist until the app has run.
// Read one tick too early and this is `undefined`, and every check below is then
// skipped rather than failed. Wait for the value itself.
await page.waitForFunction(() => typeof window.__DECK_SLIDE_COUNT__ === "number", {
  timeout: 10_000,
});
const slideCount = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
const primaryHarvest = await harvestDeck(page, PRIMARY, slideCount);
if (!primaryHarvest.some((r) => r.found.includes("enablement"))) {
  console.error(
    `\`mandate-enablement\` is not in ${PRIMARY} (${slideCount} slides) at ${BASE}: ` +
      `this deck composes no \`mandate\` run. Both slides are leader-only (§4.3, ` +
      `§5.3's programme-framing exclusion is reversed only where they compose) and ` +
      `reach the two leader deck sets alone — run ` +
      `--variant=${LEADER_VARIANTS[0] ?? "gems-leader"}.\n` +
      // THE URL IS IN THIS MESSAGE FOR A REASON. `DECK_URL` defaults to :5173, and a
      // checkout of this repo that is NOT the one you are verifying will happily
      // answer there — another worktree's dev server, mid-ticket, composing a deck
      // that legitimately has no `mandate` run. The failure then reads as "the
      // slides are missing" when what is missing is the right server. Check the
      // count above against the fixture before believing this message.
      `  DECK_URL=${BASE} — is that the tree you meant? \`tests/fixtures/deck-numbering.json\` ` +
      `records what this branch's ${PRIMARY} should hold.`,
  );
  await browser.close();
  process.exit(1);
}
console.log(
  `${PRIMARY} · ${slideCount} slides${REDUCED ? " · reduced motion" : ""}\n` +
    `measuring both leader decks: ${LEADER_VARIANTS.join(", ")}\n`,
);

// ───────────── the stage, and the floor it draws ─────────────

const enablementIndex = primaryHarvest.find((r) => r.found.includes("enablement")).index;
await gotoSlide(PRIMARY, enablementIndex, MOUNT_MS);
const base = await measure(page);

// Every number below is a stage coordinate BECAUSE the conversion divides the scale
// out. This asserts the conversion had nothing to do, which is the only way to know the
// raw rects, the converted ones and the advance probes are the same numbers at this
// viewport.
check(
  "the 1280×720 viewport renders the stage 1:1",
  [base.scale, base.stage.width, base.stage.height],
  [1, 1280, 720],
);
check("exactly one .nav-zone on the stage", base.navZoneCount, 1);

/** THE FLOOR, and the only one this script uses. Measured off `.nav-zone` itself. */
const NAV_TOP = base.navZone.top;
/** THE MARGINS, measured off the chrome that draws them. */
const MARGIN = { left: base.marginBand.left, right: base.marginBand.right };
/** THE CEILING. Both figures must start under the headline row the deck rendered. */
const HEADLINE_BOTTOM = base.headlineRow.bottom;
/** The colour ladder, as the cascade resolves it in this page. */
const TIERS = base.tiers;
const FLOOR_LUMINANCE = (() => {
  const c = TIERS[FLOOR_TIER].match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return relativeLuminance(Number(c[1]), Number(c[2]), Number(c[3]));
})();
/** Every rgb string that is out of bounds for text, resolved not transcribed. */
const BELOW_FLOOR_COLORS = BELOW_FLOOR_TIERS.map((t) => TIERS[t]);

console.log(
  `      .nav-zone measured  top ${n2(NAV_TOP)}  height ${n2(base.navZone.height)}\n` +
    `      margin band         ${n2(MARGIN.left)}…${n2(MARGIN.right)}\n` +
    `      headline row bottom ${n2(HEADLINE_BOTTOM)}\n` +
    `      ${FLOOR_TIER} ${TIERS[FLOOR_TIER]} → luminance ${FLOOR_LUMINANCE.toFixed(4)}\n` +
    `      ${LUMINANCE_EXEMPT_TIER} ${TIERS[LUMINANCE_EXEMPT_TIER]} (the deck's keyword and mono-label tier)\n` +
    `      out of bounds       ${BELOW_FLOOR_TIERS.map((t, i) => `${t} ${BELOW_FLOOR_COLORS[i]}`).join("  ")}`,
);

// The cross-checks the import is allowed to make: the module's restatements of the
// deck's CSS have to equal what the deck actually drew.
check(
  `geometry NAV_ZONE_TOP ${NAV_ZONE_TOP} equals the measured .nav-zone top ${n2(NAV_TOP)}`,
  NAV_ZONE_TOP,
  n2(NAV_TOP),
);
check(
  `geometry SIDE_MARGIN ${SIDE_MARGIN} / CONTENT_WIDTH ${CONTENT_WIDTH} equal the measured margin band ${n2(MARGIN.left)}…${n2(MARGIN.right)}`,
  [SIDE_MARGIN, SIDE_MARGIN + CONTENT_WIDTH],
  [n2(MARGIN.left), n2(MARGIN.right)],
);

// ───────────── K.2's geometry, read through Vite ─────────────
//
// `phases-gates-geometry.ts` is not bare-Node importable (see the import block at the
// head of this file), so the numbers K.2 is cross-checked against are pulled from the
// DEV SERVER'S OWN MODULE GRAPH — the same transform, the same alias resolution and
// the same module instance the running figure was laid out from. This is what that
// file's header asks a verification script to do, and it is strictly stronger than a
// second transcription: there is no second copy to drift.
const PG = await page.evaluate(async () => {
  const mod = await import("/src/slides/leader-mandate/phases-gates-geometry.ts");
  const out = {};
  for (const [k, v] of Object.entries(mod)) if (typeof v === "number") out[k] = v;
  out.RUNG_COLUMN_WIDTH_5 = mod.rungColumnWidth(5);
  return out;
});
check(
  "K.2's geometry loads through the dev server and re-exports K.1's shared eight unchanged",
  [PG.CLOSER_TOP, PG.CLOSER_HEIGHT, PG.BAND_PADDING_X, PG.BAND_PADDING_Y, PG.SIDE_MARGIN, PG.CONTENT_WIDTH, PG.NAV_ZONE_TOP],
  [CLOSER_TOP, CLOSER_HEIGHT, BAND_PADDING_X, BAND_PADDING_Y, SIDE_MARGIN, CONTENT_WIDTH, NAV_ZONE_TOP],
);
check(
  `K.2 HEADLINE_BOTTOM ${PG.HEADLINE_BOTTOM} does not over-promise the measured headline row bottom ${n2(HEADLINE_BOTTOM)}`,
  [PG.HEADLINE_BOTTOM >= HEADLINE_BOTTOM - SUBPIXEL, PG.HEADLINE_BOTTOM - HEADLINE_BOTTOM < 2],
  [true, true],
);
check(
  `K.1 HEADING_TOP ${HEADING_TOP} and BODY_TOP ${BODY_TOP} are under the rendered headline row (${n2(HEADLINE_BOTTOM)})`,
  [HEADING_TOP > HEADLINE_BOTTOM, BODY_TOP > HEADLINE_BOTTOM],
  [true, true],
);

// ───────────── THE FOUR BUDGETS, PRICED IN PIXELS ─────────────
//
// Declared here and filled from the measurements below, one row per budget. `assumed`
// is the advance the module's own doc comment divides by — transcribed from the
// comment, because the whole point is to hold the ESTIMATE against a measurement.
// `lines` is how many lines of `width` the budget is allowed to spend.
const BUDGETS = [
  {
    key: "one-line",
    name: "ONE_LINE_BUDGET_CHARS",
    chars: ONE_LINE_BUDGET_CHARS,
    assumed: 7.2,
    lines: 1,
    module: "geometry.ts",
    what: "K.1's pillar and track body lines",
    declaredWidth: PILLAR_TEXT_WIDTH,
  },
  {
    key: "gate",
    name: "GATE_BUDGET_CHARS",
    chars: PG.GATE_BUDGET_CHARS,
    assumed: 6.5,
    lines: 2,
    module: "phases-gates-geometry.ts",
    what: "K.2's gate lines and its beyond-the-roadmap line",
    declaredWidth: PG.PHASE_COL_WIDTH,
  },
  {
    key: "calendar",
    name: "CALENDAR_ROW_BUDGET_CHARS",
    chars: PG.CALENDAR_ROW_BUDGET_CHARS,
    assumed: 7.2,
    lines: 1,
    module: "phases-gates-geometry.ts",
    what: "K.2's calendar rows",
    declaredWidth: PG.PHASE_COL_WIDTH,
  },
  {
    key: "rung",
    name: "RUNG_LABEL_BUDGET_CHARS",
    chars: PG.RUNG_LABEL_BUDGET_CHARS,
    assumed: 5.9,
    lines: 1,
    module: "phases-gates-geometry.ts",
    what: "the rung names K.2 borrows from gap-capability-ladder",
    declaredWidth: PG.RUNG_COLUMN_WIDTH_5 - PG.RUNG_LABEL_INSET - PG.RUNG_LABEL_GUTTER,
  },
];
/** Filled per budget with `{ text, chars, width, perChar, boxWidth, boxId }` for the
 *  WIDEST-PER-CHARACTER string the budget governs, measured on the PRIMARY deck. */
const priced = {};

// ───────────── the ladder, read off gap-capability-ladder ─────────────

const ladderRow = primaryHarvest.find((r) => r.found.includes("ladder"));
check("gap-capability-ladder is in this deck", ladderRow != null, true);
/** The five rung ids and the five rung NAMES, as that slide printed them. Nothing here
 *  is transcribed — this is the left-hand side of assertion 6, and it is also where
 *  K.2's required-box list comes from. */
let LADDER = { ids: [], names: [], figLabel: null };
if (ladderRow) {
  await gotoSlide(PRIMARY, ladderRow.index, MOUNT_MS);
  LADDER = await page.evaluate(() => ({
    ids: [...document.querySelectorAll('[data-testid^="gap-rung-"][data-testid$="-name"]')].map(
      (el) => el.dataset.testid.replace(/^gap-rung-|-name$/g, ""),
    ),
    names: [...document.querySelectorAll('[data-testid^="gap-rung-"][data-testid$="-name"]')].map(
      (el) => (el.textContent ?? "").replace(/\s+/g, " ").trim(),
    ),
    figLabel:
      document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
  }));
  await shot(`${PRIMARY}-ladder-source`);
}
check(
  `the Capability Ladder prints five rungs, in order — ${LADDER.names.join(" / ")}`,
  [LADDER.ids.length, LADDER.names.length, LADDER.names.every((n) => n.length > 0)],
  [5, 5, true],
);
check(
  `and it prints them under "${SLIDES.ladder.label}"`,
  parseFig(LADDER.figLabel)?.label ?? null,
  SLIDES.ladder.label,
);
const RUNG_IDS = LADDER.ids;

// ───────────── the motion contract, sampled mid-reveal ─────────────
//
// ONE DECK, and stated rather than assumed: `REVEAL_LEAD_MS` is shared
// (`type-registers.ts`) and every stagger is a component constant, so no brand axis
// reaches any of them and sampling both decks would measure the same numbers twice.
// ONE SAMPLE PER SLIDE, though — the two figures declare different staggers (90/110 on
// K.1, 70/90 on K.2) and a control that only ever exercised one of them would say
// nothing about the other.

async function sampleArrival(variant, index, presses, targets, label) {
  await gotoSlide(variant, index, MOUNT_MS);
  for (let i = 0; i < presses; i++) {
    if (i > 0) await settleAt(`${label} warm-up ${i}`);
    await page.keyboard.press("Space");
  }
  const started = Date.now();
  let sample = null;
  let elapsed = 0;
  while (Date.now() - started < ARRIVAL_DEADLINE_MS) {
    const frame = await page.evaluate(
      (ids) =>
        ids.map((id) => {
          const el = document.querySelector(`[data-testid="${id}"]`);
          const cs = el ? getComputedStyle(el) : null;
          return { id, opacity: cs ? parseFloat(cs.opacity) : null };
        }),
      targets,
    );
    if (frame.some((r) => r.opacity > 0.02)) {
      sample = frame;
      elapsed = Date.now() - started;
      break;
    }
    await page.waitForTimeout(ARRIVAL_POLL_MS);
  }
  check(
    `${label} · the reveal begins within ${ARRIVAL_DEADLINE_MS}ms of the keypress, so there is a frame to sample`,
    sample != null,
    true,
  );
  if (!sample) return;
  const inFlight = sample.filter((r) => r.opacity > 0.02 && r.opacity < 0.98).map((r) => r.id);
  console.log(
    `      ${label} · first box arrived ${elapsed}ms after the keypress — that frame reads ` +
      `opacity ${sample.map((r) => n2(r.opacity)).join(" ")}`,
  );
  // THE SWEEP, and it is the same claim in both motion modes: each column reveals in
  // reading order, so the FIRST box to leave 0 is the first one and no other. Boxes
  // arriving together would read as one flash rather than as a list being read, and it
  // is the stagger that says otherwise.
  check(
    `${label} · the reveal sweeps in reading order — one box has left 0, and it is the first`,
    sample.filter((r) => r.opacity > 0.02).map((r) => r.id),
    [targets[0]],
  );
  if (REDUCED) {
    // THE CLAIM: `reduce` squashes the durations, so no box is ever caught between its
    // two frames — each is either not yet arrived or fully arrived. The stagger DELAY
    // still runs (see the header), which is why the frame shows arrived and
    // not-yet-arrived boxes side by side and nothing in between.
    check(`${label} · under reduce no box is ever caught mid-transition`, inFlight, []);
  } else {
    // THE POSITIVE CONTROL for the line above. If this sampler cannot catch a box in
    // flight when the transitions ARE running, the reduced run's empty list means
    // nothing at all.
    check(
      `${label} · under normal motion the same sampler catches a box in flight — ${inFlight.join(", ") || "none"}`,
      inFlight.length > 0,
      true,
    );
  }
}

const phasesGatesIndexPrimary = primaryHarvest.find((r) => r.found.includes("phasesGates"))?.index;
await sampleArrival(
  PRIMARY,
  enablementIndex,
  1,
  TRACK_IDS.map((id) => `mandate-track-${id}`),
  "K.1 motion",
);
if (phasesGatesIndexPrimary != null) {
  await sampleArrival(
    PRIMARY,
    phasesGatesIndexPrimary,
    1,
    PHASE_IDS.map((id) => `mandate-phases-target-${id}`),
    "K.2 motion",
  );
}

// ───────────── both decks, both slides, every pose, forward and back ─────────────

/** Collected for the summary — the ticket asks for NUMBERS, so the numbers are the
 *  deliverable and not the booleans beside them. */
const summary = [];

for (const variant of LEADER_VARIANTS) {
  const tag = variant.padEnd(12);
  console.log(`\n── ${variant} ─────────────────────────────────────────`);

  const harvest =
    variant === PRIMARY ? primaryHarvest : await harvestDeck(page, variant, slideCount);
  const at = (name) => harvest.filter((r) => r.found.includes(name));

  // ── WHERE THE TWO SLIDES ARE, AND WHAT THEY PRINT (§3.5, no letter written down) ──
  check(
    `${tag} · deck · both mandate slides compose into this deck, exactly once each`,
    [at("enablement").length, at("phasesGates").length, at("ladder").length],
    [1, 1, 1],
  );
  if (at("enablement").length !== 1 || at("phasesGates").length !== 1) continue;
  const idx = { enablement: at("enablement")[0].index, phasesGates: at("phasesGates")[0].index };
  const fig = {
    enablement: parseFig(at("enablement")[0].fig),
    phasesGates: parseFig(at("phasesGates")[0].fig),
    ladder: parseFig(at("ladder")[0]?.fig),
  };
  check(
    `${tag} · deck · both print a parseable derived reference — ${at("enablement")[0].fig} / ${at("phasesGates")[0].fig}`,
    [fig.enablement != null, fig.phasesGates != null],
    [true, true],
  );
  check(
    `${tag} · deck · the two labels are the ones the tickets authored`,
    [fig.enablement?.label, fig.phasesGates?.label],
    [SLIDES.enablement.label, SLIDES.phasesGates.label],
  );
  // AND THE LADDER SLIDE IS IN THIS DECK TOO, under the same label. Checked per deck
  // rather than once on the primary, because the rung names read off it are then held
  // against K.2's staircase IN EVERY DECK — a leader deck that composed `mandate`
  // without `gap` would turn assertion 6 into a comparison against another deck's stage.
  check(
    `${tag} · deck · gap-capability-ladder composes here as well, at ${at("ladder")[0]?.fig}`,
    [at("ladder").length, fig.ladder?.label],
    [1, SLIDES.ladder.label],
  );
  // THE ADJACENCY, which is the premise of the shared closer shelf and the only
  // structural claim about position this script makes. Same section letter, consecutive
  // numbers, consecutive indices — all DERIVED from what rendered.
  check(
    `${tag} · deck · the two slides are one click apart — same letter "${fig.enablement?.letter}", ${fig.enablement?.num} then ${fig.phasesGates?.num}, indices ${idx.enablement} then ${idx.phasesGates}`,
    [
      fig.enablement?.letter === fig.phasesGates?.letter,
      fig.phasesGates?.num - fig.enablement?.num,
      idx.phasesGates - idx.enablement,
    ],
    [true, 1, 1],
  );
  // AND NOTHING ELSE IN THE DECK CLAIMS EITHER REFERENCE. The half a search cannot
  // make: two slides deriving K.1 would both look right on their own.
  for (const which of ["enablement", "phasesGates"]) {
    const ref = `— FIG. ${fig[which].letter}.${fig[which].num}·`;
    check(
      `${tag} · deck · exactly one slide in ${slideCount} prints "${fig[which].letter}.${fig[which].num}"`,
      harvest.filter((r) => r.fig?.startsWith(ref)).map((r) => r.index),
      [idx[which]],
    );
  }

  // ── THE TWO WALKS ──
  //
  // The per-slide spec: which boxes must exist, which `.fade` boxes each pose must
  // have REVEALED (and, by omission, which it must still be holding back), and which
  // containers' ROWS carry a budget.
  const CHIP_GROUP_IDS = RUNG_IDS.map((id) => `mandate-phases-chips-${id}`);
  const SPEC = {
    enablement: {
      index: idx.enablement,
      poses: DECLARED_POSES.enablement,
      prefix: "mandate-",
      required: [
        "mandate-pillars-heading",
        "mandate-tracks-heading",
        "mandate-divider",
        ...PILLAR_IDS.flatMap((id) => [
          `mandate-pillar-${id}`,
          `mandate-pillar-mark-${id}`,
          `mandate-pillar-label-${id}`,
          `mandate-pillar-line-${id}`,
        ]),
        ...TRACK_IDS.flatMap((id) => [
          `mandate-track-${id}`,
          `mandate-track-name-${id}`,
          `mandate-lane-${id}`,
          `mandate-track-line-${id}`,
        ]),
        "mandate-bottleneck",
        "mandate-bottleneck-eyebrow",
        "mandate-bottleneck-statement",
        "mandate-bottleneck-source",
        "mandate-closer",
      ],
      optional: [],
      containers: [],
      // Pillars carry `on` unconditionally — they are the pose-0 argument — so they are
      // revealed from the first frame. The two headings and the divider carry no
      // `.fade` at all and stand from pose 0, which is what makes them standing.
      revealedByPose: [
        PILLAR_IDS.map((id) => `mandate-pillar-${id}`),
        [...PILLAR_IDS.map((id) => `mandate-pillar-${id}`), ...TRACK_IDS.map((id) => `mandate-track-${id}`)],
        [
          ...PILLAR_IDS.map((id) => `mandate-pillar-${id}`),
          ...TRACK_IDS.map((id) => `mandate-track-${id}`),
          "mandate-bottleneck",
        ],
        [
          ...PILLAR_IDS.map((id) => `mandate-pillar-${id}`),
          ...TRACK_IDS.map((id) => `mandate-track-${id}`),
          "mandate-bottleneck",
          "mandate-closer",
        ],
      ],
      faded: [
        ...PILLAR_IDS.map((id) => `mandate-pillar-${id}`),
        ...TRACK_IDS.map((id) => `mandate-track-${id}`),
        "mandate-bottleneck",
        "mandate-closer",
      ],
      band: "mandate-bottleneck",
      bandEyebrow: "mandate-bottleneck-eyebrow",
      closer: "mandate-closer",
    },
    phasesGates: {
      index: idx.phasesGates,
      poses: DECLARED_POSES.phasesGates,
      prefix: "mandate-phases-",
      required: [
        "mandate-phases-ladder-heading",
        "mandate-phases-heading",
        ...RUNG_IDS.flatMap((id) => [
          `mandate-phases-rung-${id}`,
          `mandate-phases-tread-${id}`,
          `mandate-phases-rung-name-${id}`,
        ]),
        // A riser rises OUT OF a rung, so the top rung has none — which is what stops
        // the figure drawing a step out of L5 that no plan on this stage takes.
        ...RUNG_IDS.slice(0, -1).map((id) => `mandate-phases-riser-${id}`),
        ...PHASE_IDS.map((id) => `mandate-phases-chip-${id}`),
        ...PHASE_IDS.flatMap((id) => [
          `mandate-phases-col-${id}`,
          `mandate-phases-target-${id}`,
          `mandate-phases-calendar-${id}`,
          `mandate-phases-gate-${id}`,
        ]),
        "mandate-phases-band",
        "mandate-phases-band-eyebrow",
        "mandate-phases-band-statement",
        "mandate-phases-band-provenance",
        "mandate-phases-closer",
      ],
      // WHICH rungs carry chips is content (`phasesOnRung`), so all five are boxed and
      // the count is asserted rather than assumed.
      optional: CHIP_GROUP_IDS,
      containers: PHASE_IDS.map((id) => `mandate-phases-calendar-${id}`),
      revealedByPose: [
        RUNG_IDS.map((id) => `mandate-phases-rung-${id}`),
        [
          ...RUNG_IDS.map((id) => `mandate-phases-rung-${id}`),
          ...PHASE_IDS.flatMap((id) => [
            `mandate-phases-target-${id}`,
            `mandate-phases-calendar-${id}`,
          ]),
        ],
        [
          ...RUNG_IDS.map((id) => `mandate-phases-rung-${id}`),
          ...PHASE_IDS.flatMap((id) => [
            `mandate-phases-target-${id}`,
            `mandate-phases-calendar-${id}`,
            `mandate-phases-gate-${id}`,
          ]),
        ],
        [
          ...RUNG_IDS.map((id) => `mandate-phases-rung-${id}`),
          ...PHASE_IDS.flatMap((id) => [
            `mandate-phases-target-${id}`,
            `mandate-phases-calendar-${id}`,
            `mandate-phases-gate-${id}`,
          ]),
          "mandate-phases-band",
        ],
        [
          ...RUNG_IDS.map((id) => `mandate-phases-rung-${id}`),
          ...PHASE_IDS.flatMap((id) => [
            `mandate-phases-target-${id}`,
            `mandate-phases-calendar-${id}`,
            `mandate-phases-gate-${id}`,
          ]),
          "mandate-phases-band",
          "mandate-phases-closer",
        ],
      ],
      faded: [
        ...RUNG_IDS.map((id) => `mandate-phases-rung-${id}`),
        ...PHASE_IDS.flatMap((id) => [
          `mandate-phases-target-${id}`,
          `mandate-phases-calendar-${id}`,
          `mandate-phases-gate-${id}`,
        ]),
        "mandate-phases-band",
        "mandate-phases-closer",
      ],
      band: "mandate-phases-band",
      bandEyebrow: "mandate-phases-band-eyebrow",
      closer: "mandate-phases-closer",
    },
  };

  /** The fullest-pose state of each slide, kept so the shared band and shelf can be
   *  compared ACROSS the two after both walks. */
  const fullest = {};

  for (const which of ["enablement", "phasesGates"]) {
    const spec = SPEC[which];
    const label = `${tag} · ${which === "enablement" ? "K.1" : "K.2"}`;
    const expectedFig = at(which)[0].fig;

    // ONE MOUNT, which is the whole point: a fresh `?slide=` per pose would prove that
    // each pose renders from scratch and say nothing about what a presenter's own
    // keypresses do.
    await gotoSlide(variant, spec.index, MOUNT_MS);
    const first = await measure(page, {
      boxIds: [...spec.required, ...spec.optional],
      containerIds: spec.containers,
      ownerPrefix: spec.prefix,
    });
    const declared = poseTotal(first.stepCounter);
    check(
      `${label} · walk · the deck declares ${spec.poses} poses for this slide (NavBar reads "${first.stepCounter}")`,
      declared,
      spec.poses,
    );
    // The walk is driven by the DECK's number; the reveal map is this file's, so a
    // mismatch has to fail rather than run off the end of it.
    const poses = declared ?? spec.poses;
    check(
      `${label} · walk · this harness declares a reveal set for every pose the deck has`,
      spec.revealedByPose.length,
      poses,
    );

    const forward = [];
    const backward = [];
    const poseNotes = [];

    /** The signature compared across directions. COMPUTED state, not markup: the unit
     *  tests already compare rendered structure, and the failure this looks for is a
     *  pose that is structurally identical and visually stuck. */
    const signature = (state) =>
      Object.fromEntries(
        spec.required.map((id) => {
          const b = state.boxes[id];
          return [
            id,
            b.mounted
              ? {
                  on: b.on,
                  opacity: n2(b.opacity),
                  translateY: n2(b.translateY),
                  text: b.text,
                  lines: b.lines,
                  rect: [n2(b.rect.left), n2(b.rect.top), n2(b.rect.right), n2(b.rect.bottom)],
                }
              : { mounted: false },
          ];
        }),
      );

    async function auditPose(pose, direction, state) {
      const s =
        state ??
        (await measure(page, {
          boxIds: [...spec.required, ...spec.optional],
          containerIds: spec.containers,
          ownerPrefix: spec.prefix,
        }));
      if (direction === "forward") await shot(`${variant}-${which}-pose${pose}`);
      const revealed = spec.revealedByPose[pose] ?? [];
      poseNotes.push({
        pose,
        direction,
        state: s,
        missing: spec.required.filter((id) => !s.boxes[id].mounted),
        // Every box this pose has reached resolves to a full opacity…
        unrevealed: revealed.filter((id) => (s.boxes[id].opacity ?? 0) < 0.999),
        // …and is on its settled frame, not 8px below it.
        unsettled: revealed.filter((id) => Math.abs(s.boxes[id].translateY ?? 0) > 0.02),
        // …and every `.fade` box it has NOT reached is still held back.
        leaked: spec.faded
          .filter((id) => !revealed.includes(id))
          .filter((id) => (s.boxes[id].opacity ?? 0) > 0.02),
        // The FIG LABEL AND THE SLIDE INDEX, re-read at every single measurement. This
        // is the guard against a keypress that spilled into the next slide.
        fig: s.figLabel,
        slideIndex: s.slideIndex,
        revealedCount: s.revealedCount,
      });
      return s;
    }

    forward[0] = await auditPose(0, "forward", first);
    for (let pose = 1; pose < poses; pose++) {
      await page.keyboard.press("Space");
      await settleAt(`${label} forward pose ${pose}`);
      forward[pose] = await auditPose(pose, "forward");
    }
    for (let pose = poses - 2; pose >= 0; pose--) {
      await page.keyboard.press("ArrowUp");
      await settleAt(`${label} backward pose ${pose}`);
      backward[pose] = await auditPose(pose, "backward");
    }
    backward[poses - 1] = forward[poses - 1];

    // THE GUARD, stated as its own assertion because the failure it catches is silent:
    // exactly `poses - 1` presses in each direction, and the walk never left the slide.
    check(
      `${label} · walk · every one of the ${poseNotes.length} measurements is still on this slide`,
      [
        [...new Set(poseNotes.map((n) => n.slideIndex))],
        [...new Set(poseNotes.map((n) => n.fig))],
      ],
      [[String(spec.index)], [expectedFig]],
    );
    // AND EVERY KEYPRESS ACTUALLY LANDED. A press that never reached `window` leaves
    // the revealed count where it was, which every opacity check below would happily
    // accept as "this pose reveals nothing new".
    const fwdCounts = forward.map((s) => s.revealedCount);
    const backCounts = backward.map((s) => s.revealedCount);
    check(
      `${label} · walk · each press revealed more boxes on the way out and fewer on the way back — ${fwdCounts.join(" → ")} / ${[...backCounts].reverse().join(" → ")}`,
      [
        fwdCounts.every((c, i) => i === 0 || c > fwdCounts[i - 1]),
        backCounts.every((c, i) => i === 0 || c > backCounts[i - 1]),
        fwdCounts,
      ],
      [true, true, backCounts],
    );
    check(
      `${label} · walk · every pose mounts every box it should, none missing`,
      poseNotes.filter((n) => n.missing.length).map((n) => `${n.direction} pose ${n.pose}: ${n.missing}`),
      [],
    );
    check(
      `${label} · walk · every box a pose has reached rests at full opacity`,
      poseNotes.filter((n) => n.unrevealed.length).map((n) => `${n.direction} pose ${n.pose}: ${n.unrevealed}`),
      [],
    );
    check(
      `${label} · walk · and on its settled frame, not the 8px below it reveals from`,
      poseNotes.filter((n) => n.unsettled.length).map((n) => `${n.direction} pose ${n.pose}: ${n.unsettled}`),
      [],
    );
    check(
      `${label} · walk · no box arrives before its pose`,
      poseNotes.filter((n) => n.leaked.length).map((n) => `${n.direction} pose ${n.pose}: ${n.leaked}`),
      [],
    );
    // THE RE-RENDER, as a comparison rather than a spot check.
    for (let pose = poses - 2; pose >= 0; pose--) {
      check(
        `${label} · walk · pose ${pose} reached backwards is the pose ${pose} reached forwards`,
        signature(backward[pose]),
        signature(forward[pose]),
      );
    }
    // And the poses are actually distinct — a slide where nothing changed would pass
    // the comparison above trivially.
    check(
      `${label} · walk · the ${poses} poses are ${poses} different frames`,
      new Set(forward.map((s) => JSON.stringify(signature(s)))).size,
      poses,
    );
    // NOTHING STUCK AT POSE 0 AFTER THE WALK BACK — the AC's own wording, and the
    // failure a presenter actually meets.
    check(
      `${label} · walk · back at pose 0 nothing is stuck revealed`,
      spec.faded
        .filter((id) => !(spec.revealedByPose[0] ?? []).includes(id))
        .filter((id) => (backward[0].boxes[id].opacity ?? 0) > 0.02),
      [],
    );

    // ── ZERO SMIL, at every pose, in both directions ──
    check(
      `${label} · motion · zero SMIL nodes in the document at every pose`,
      poseNotes.map((n) => n.state.smil),
      Array(poseNotes.length).fill(0),
    );
    check(
      `${label} · motion · and no <svg> under this slide's own boxes, which is what closes the question by construction`,
      poseNotes.map((n) => n.state.slideSvg),
      Array(poseNotes.length).fill(0),
    );
    // `settlePose` reported the page quiet at every measurement. Under `--reduced` this
    // is the assertion that each pose rests on its FINISHED frame; under normal motion
    // it is what makes the geometry below a measurement of a settled stage.
    check(
      `${label} · motion · every pose went quiet inside ${SETTLE_CAP}ms`,
      stillMoving.filter((w) => w.startsWith(label)),
      [],
    );

    const last = forward[poses - 1];
    fullest[which] = last;

    // ── THE TEXT, MEASURED (gh#50's floors, and the margins) ──
    const pastMargin = [];
    const sizeFloor = [];
    const tierFloor = [];
    const underLuminance = [];
    const auditedByPose = [];
    for (const note of poseNotes) {
      // ON THE STAGE, by the effective opacity the room sees — not by a list of which
      // box belongs to which pose. A run inside a `.fade` that has not been switched
      // on is invisible, so its geometry is not what a projector shows.
      const visible = note.state.runs.filter((r) => r.effOpacity > 0.5);
      auditedByPose.push(visible.length);
      const where = `${note.direction} pose ${note.pose}`;
      for (const r of visible) {
        const name = `${where} · ${r.owner ?? r.tag} "${r.text}"`;
        if (r.textBox.right > MARGIN.right + TEXT_SLACK || r.textBox.left < MARGIN.left - TEXT_SLACK) {
          pastMargin.push(`${name} — ${n2(r.textBox.left)}…${n2(r.textBox.right)}`);
        }
        const floor = r.mono ? MONO_FLOOR : PROSE_FLOOR;
        if (r.size < floor) sizeFloor.push(`${name} — ${r.size}px ${r.mono ? "mono" : "prose"} < ${floor}`);
        if (BELOW_FLOOR_COLORS.includes(r.color)) {
          tierFloor.push(`${name} — ${r.color} is ${BELOW_FLOOR_TIERS[BELOW_FLOOR_COLORS.indexOf(r.color)]}`);
        }
        if (r.luminance < FLOOR_LUMINANCE - 0.001) {
          underLuminance.push({ name, color: r.color, owner: r.owner, keyword: r.keyword });
        }
      }
    }
    check(
      `${label} · text · no run crosses the measured ${n2(MARGIN.left)}…${n2(MARGIN.right)} margins`,
      pastMargin,
      [],
    );
    check(`${label} · floors · no run below ${MONO_FLOOR}px mono / ${PROSE_FLOOR}px prose`, sizeFloor, []);
    check(`${label} · floors · no run resolves to a tier below ${FLOOR_TIER}`, tierFloor, []);
    check(
      `${label} · floors · everything under ${FLOOR_TIER}'s luminance is exactly ${LUMINANCE_EXEMPT_TIER}`,
      [...new Set(underLuminance.map((v) => v.color))].filter(
        (c) => c !== TIERS[LUMINANCE_EXEMPT_TIER],
      ),
      [],
    );
    console.log(
      `      runs audited per pose: ${auditedByPose.join(", ")}\n` +
        `      under the luminance floor, all ${LUMINANCE_EXEMPT_TIER}: ` +
        `${[...new Set(underLuminance.map((v) => v.owner ?? (v.keyword ? "em.kw" : v.name)))].join(", ") || "none"}`,
    );
    // The audit's own positive control: every check above it is a "found nothing", so a
    // walk that visited no runs would report a clean slide.
    check(
      `${label} · floors · the audit measured text at every pose`,
      auditedByPose.every((n) => n > 6),
      true,
    );

    // ── THE CLEARANCE, against the measured floor ──
    const painted = [];
    for (const note of poseNotes) {
      for (const id of spec.required) {
        const b = note.state.boxes[id];
        if (!b.mounted) continue;
        // A box still held back is invisible, so its geometry is not what the room
        // sees; the poses that show it are where it is measured.
        if (b.fade && (b.effOpacity ?? 0) < 0.5) continue;
        painted.push({ id, pose: note.pose, direction: note.direction, ...b.rect });
      }
    }
    const lowest = painted.reduce((a, b) => (b.bottom > a.bottom ? b : a));
    const clearance = NAV_TOP - lowest.bottom;
    check(
      `${label} · CLEARANCE · the lowest painted box (${lowest.id}) bottom ${n2(lowest.bottom)} is above the measured .nav-zone top ${n2(NAV_TOP)} — ${n2(clearance)}px`,
      lowest.bottom < NAV_TOP,
      true,
    );
    check(
      `${label} · layout · every painted box, at every pose, is above the hover band`,
      painted.filter((b) => b.bottom >= NAV_TOP).map((b) => `${b.direction} pose ${b.pose} ${b.id} bottom ${n2(b.bottom)}`),
      [],
    );
    check(
      `${label} · layout · every painted box is inside the measured ${n2(MARGIN.left)}…${n2(MARGIN.right)} margins`,
      painted
        .filter((b) => b.left < MARGIN.left - SUBPIXEL || b.right > MARGIN.right + SUBPIXEL)
        .map((b) => `${b.direction} pose ${b.pose} ${b.id} ${n2(b.left)}…${n2(b.right)}`),
      [],
    );
    check(
      `${label} · layout · every painted box starts below the rendered headline row (${n2(HEADLINE_BOTTOM)})`,
      painted.filter((b) => b.top < HEADLINE_BOTTOM).map((b) => `${b.direction} pose ${b.pose} ${b.id} top ${n2(b.top)}`),
      [],
    );
    // AND NOTHING BUT THE NAVBAR IS DOWN THERE. The exclusion this ticket was warned
    // about would have gone here; instead the stronger claim is asserted, because
    // neither mandate figure renders a footer at all.
    check(
      `${label} · CLEARANCE · below the measured floor there is nothing but .nav-zone chrome`,
      [
        ...new Set(
          poseNotes.flatMap((n) =>
            n.state.below
              .filter((b) => !b.nav)
              .map((b) => `${b.tag}${b.testid ? `[${b.testid}]` : ""} "${b.text}" ${n2(b.top)}…${n2(b.bottom)}`),
          ),
        ),
      ],
      [],
    );

    // ── THE BUDGETS, PRICED — the reason this script exists ──
    //
    // Each budget's governed strings are measured at the FULLEST pose, where every one
    // of them is on the stage. Three channels per string (see the header), and the
    // budget itself is then re-priced against the measured advance.
    const priceOne = (key, entries) => {
      // Entries: { id, label, box: <measured box>, boxWidth, maxLines, slotBottom }
      // `budget` and not `spec`: the enclosing `spec` is the SLIDE's, and two things
      // called the same name inside one closure is how a harness measures the wrong
      // one.
      const budget = BUDGETS.find((b) => b.key === key);
      const wrapped = entries.filter((e) => e.box.lines > e.maxLines);
      const overflowing = entries.filter((e) => e.box.scrollW > e.box.clientW);
      const spilling = entries.filter(
        (e) => e.box.textBox && e.box.textBox.right > e.box.content.right + TEXT_SLACK,
      );
      // THE SLOT. Every one of these boxes sits inside a FIXED height the geometry
      // budgeted for it — a pillar row, a phase column, a calendar slot, a rung's own
      // box — and the whole reason a wrap is dangerous here is that it does not
      // overflow anything visible, it eats the slot the NEXT thing is placed against.
      // Reported as its own assertion, not folded into the line count, because the two
      // failures have different causes and different severities: a wrap is a budget
      // that was too generous, and ink past the slot WITH the line count still correct
      // is a slot whose own arithmetic was rounded down. The second is what this split
      // was written for — the first run of this script found `PILLAR_ROW_HEIGHT = 38`
      // budgeting "one 13.5px sans line (18)" for a line the browser draws 18.225px
      // tall (13.5 × 1.35), so every pillar row's ink ends 0.22px below its own
      // declared box while wrapping nothing and colliding with nothing. Folded into
      // the line-count check, that would have read as a wrap.
      const spilledSlot = entries.filter(
        (e) => e.slotBottom != null && e.box.rect.bottom > e.slotBottom + SUBPIXEL,
      );
      // THE WIDEST ADVANCE WINS. A budget is only as good as its worst string, and
      // "worst" is per-character and not per-string: a short label in a wide face is
      // what re-prices a budget a long label in a narrow one would pass.
      const worst = entries.reduce((a, b) => (b.box.advance.perChar > a.box.advance.perChar ? b : a));
      const longest = entries.reduce((a, b) => (b.box.advance.chars > a.box.advance.chars ? b : a));
      const measuredAdvance = worst.box.advance.perChar;
      const boxWidth = Math.min(...entries.map((e) => e.boxWidth));
      const budgetedPx = budget.chars * budget.assumed;
      const measuredPx = budget.chars * measuredAdvance;
      const availablePx = boxWidth * budget.lines;
      if (!priced[key]) {
        priced[key] = {
          worst: { label: worst.label, text: worst.box.advance.text, perChar: measuredAdvance },
          longest: {
            label: longest.label,
            text: longest.box.advance.text,
            chars: longest.box.advance.chars,
            width: longest.box.advance.width,
          },
          boxWidth,
          budgetedPx,
          measuredPx,
          availablePx,
        };
      }
      // FIRST, THAT THE BUDGET WAS DIVIDED OUT OF THE BOX THE BROWSER DREW. Every one
      // of these four numbers is `<a width> / <an advance>`, and the width half is as
      // capable of being wrong as the advance half — a budget priced against a 278px
      // column that renders 260px is a budget that is 7% optimistic before a single
      // glyph is measured.
      check(
        `${label} · BUDGET · ${budget.name} is divided out of ${n2(budget.declaredWidth)}px, and the browser drew ${n2(boxWidth)}px`,
        Math.abs(boxWidth - budget.declaredWidth) <= SUBPIXEL,
        true,
      );
      check(
        `${label} · BUDGET · ${budget.name} ${budget.chars} (${budget.module}) · widest advance measured ${n2(measuredAdvance)}px/char on "${worst.box.advance.text.slice(0, 40)}" against the module's assumed ${budget.assumed} · ${budget.chars} chars at the measured advance is ${n2(measuredPx)}px into ${budget.lines} × ${n2(boxWidth)}px = ${n2(availablePx)}px — ${n2(availablePx - measuredPx)}px spare`,
        measuredPx <= availablePx,
        true,
      );
      check(
        `${label} · BUDGET · ${budget.name} · longest authored string is "${longest.box.advance.text.slice(0, 40)}" at ${longest.box.advance.chars} chars → ${n2(longest.box.advance.width)}px unwrapped, and ${budget.what} render at most ${budget.lines} line(s)`,
        [
          longest.box.advance.chars <= budget.chars,
          wrapped.map((e) => `${e.label} — ${e.box.lines} lines`),
          overflowing.map((e) => `${e.label} — scrollWidth ${e.box.scrollW} > clientWidth ${e.box.clientW}`),
          spilling.map((e) => `${e.label} — +${n2(e.box.textBox.right - e.box.content.right)}px past its content edge`),
        ],
        [true, [], [], []],
      );
      check(
        `${label} · BUDGET · ${budget.name} · and every one of them stays inside the fixed slot the geometry budgeted for it`,
        spilledSlot.map(
          (e) =>
            `${e.label} — ink ends ${n2(e.box.rect.bottom)}, the slot ends ${n2(e.slotBottom)} (+${n2(e.box.rect.bottom - e.slotBottom)}px)`,
        ),
        [],
      );
    };

    if (which === "enablement") {
      // K.1's body lines. THE SLOT IS THE ROW: `PILLAR_ROW_HEIGHT` and
      // `TRACK_ROW_HEIGHT` each budget exactly one line of definition, so a wrap does
      // not overflow a box — it lands on the row beneath. The row's own measured
      // bottom is the slot edge, and it is currently 1px clear.
      priceOne("one-line", [
        ...PILLAR_IDS.map((id) => ({
          id: `mandate-pillar-line-${id}`,
          label: `pillar ${id}`,
          box: last.boxes[`mandate-pillar-line-${id}`],
          boxWidth: last.boxes[`mandate-pillar-line-${id}`].rect.width,
          maxLines: 1,
          slotBottom: last.boxes[`mandate-pillar-${id}`].rect.bottom,
        })),
        ...TRACK_IDS.map((id) => ({
          id: `mandate-track-line-${id}`,
          label: `track ${id}`,
          box: last.boxes[`mandate-track-line-${id}`],
          boxWidth: last.boxes[`mandate-track-line-${id}`].rect.width,
          maxLines: 1,
          slotBottom: last.boxes[`mandate-track-${id}`].rect.bottom,
        })),
      ]);
      // AND THE FAILURE THAT WOULD ACTUALLY BE VISIBLE, stated separately from the
      // slot check above because the two are not the same claim. `geometry.ts` says a
      // wrapped body line "overlaps the row beneath it, which renders as two sentences
      // printed on top of one another"; that is about the NEXT ROW'S TOP, and the row
      // pitch leaves 26px of air a single line does not use. So: how far each row's
      // ink actually is from the next row's, and — for the last row of each column —
      // from the band under it. A slot overrun of a fraction of a pixel and a genuine
      // collision are two different findings and must not be reported as one.
      const neighbourGaps = [];
      const collided = [];
      for (const [ids, prefix] of [[PILLAR_IDS, "pillar"], [TRACK_IDS, "track"]]) {
        ids.forEach((id, i) => {
          const ink = last.boxes[`mandate-${prefix}-line-${id}`].rect.bottom;
          const nextTop =
            i + 1 < ids.length
              ? last.boxes[`mandate-${prefix}-${ids[i + 1]}`].rect.top
              : last.boxes["mandate-bottleneck"].rect.top;
          neighbourGaps.push(nextTop - ink);
          if (ink > nextTop - SUBPIXEL) {
            collided.push(`${prefix} ${id} ink ends ${n2(ink)}, the next box starts ${n2(nextTop)}`);
          }
        });
      }
      check(
        `${label} · layout · every body line clears the box under it — tightest gap ${n2(Math.min(...neighbourGaps))}px`,
        collided,
        [],
      );
      // The declared text width against the drawn one — the box the budget was
      // divided out of has to be the box the browser drew.
      check(
        `${label} · cross-check · geometry PILLAR_TEXT_WIDTH ${PILLAR_TEXT_WIDTH} / COLUMN_WIDTH ${COLUMN_WIDTH} equal the drawn pillar and track line boxes`,
        [
          n2(last.boxes[`mandate-pillar-line-${PILLAR_IDS[0]}`].rect.width),
          n2(last.boxes[`mandate-track-line-${TRACK_IDS[0]}`].rect.width),
        ],
        [n2(PILLAR_TEXT_WIDTH), n2(COLUMN_WIDTH)],
      );
      // THE ROWS BOTTOM OUT TOGETHER, which is the reason `geometry.ts` exists at all
      // — four pillar rows and three track rows share one body height, and the band
      // under them spans both columns, so a column that ended short would leave a
      // visible ledge under one half of a full-width border. Derived in the module;
      // MEASURED here.
      const lastPillar = last.boxes[`mandate-pillar-${PILLAR_IDS[PILLAR_IDS.length - 1]}`].rect;
      const lastTrack = last.boxes[`mandate-track-${TRACK_IDS[TRACK_IDS.length - 1]}`].rect;
      check(
        `${label} · layout · the two columns bottom out on the same drawn line — pillars ${n2(lastPillar.bottom)}, tracks ${n2(lastTrack.bottom)}`,
        Math.abs(lastPillar.bottom - lastTrack.bottom) <= SUBPIXEL,
        true,
      );
      // WITHIN SUBPIXEL, NOT EQUAL, and the difference is the whole point of the
      // check. Both row heights are PRODUCTS now — `12 * 1.25 + 5 + 13.5 * 1.35`
      // — because rounding them by hand to 38 and 62 is the defect this script
      // caught on its first run. A product does not land on a value the layout
      // engine can draw: it rounds to its own device grid, so the browser reports
      // 38.22 for 38.225 and 61.81 for 61.825. Asserting equality would only be
      // satisfiable by putting the hand-rounded integers back, which is the bug.
      // The divider stays exact — it is an integer the engine can hit.
      const drawnPillar = last.boxes[`mandate-pillar-${PILLAR_IDS[0]}`].rect.height;
      const drawnTrack = last.boxes[`mandate-track-${TRACK_IDS[0]}`].rect.height;
      check(
        `${label} · cross-check · the drawn rows are ${PILLAR_ROW_HEIGHT}px and ${TRACK_ROW_HEIGHT}px to within ${SUBPIXEL}px — drawn ${n2(drawnPillar)} / ${n2(drawnTrack)} — and the divider falls on the stage's centre (${DIVIDER_X})`,
        [
          Math.abs(drawnPillar - PILLAR_ROW_HEIGHT) <= SUBPIXEL,
          Math.abs(drawnTrack - TRACK_ROW_HEIGHT) <= SUBPIXEL,
          n2(last.boxes["mandate-divider"].rect.left),
        ],
        [true, true, DIVIDER_X],
      );
      // NO TWO ROWS TOUCH, in either column, at the fullest pose.
      const rowBoxes = [
        ...PILLAR_IDS.map((id) => ({ id: `pillar ${id}`, ...last.boxes[`mandate-pillar-${id}`].rect })),
        ...TRACK_IDS.map((id) => ({ id: `track ${id}`, ...last.boxes[`mandate-track-${id}`].rect })),
      ];
      const collisions = [];
      for (let i = 0; i < rowBoxes.length; i++) {
        for (let j = i + 1; j < rowBoxes.length; j++) {
          if (overlaps(rowBoxes[i], rowBoxes[j])) collisions.push(`${rowBoxes[i].id} × ${rowBoxes[j].id}`);
        }
      }
      check(`${label} · layout · no two rows overlap, in either column`, collisions, []);
      // THE LANES ARE ORDINAL AND THE FIGURE SAYS SO IN SHAPE. Strictly narrowing, and
      // the four pillar marks strictly identical — the geometric half of this slide's
      // argument, which no string on the stage makes.
      const laneWidths = TRACK_IDS.map((id) => last.boxes[`mandate-lane-${id}`].rect.width);
      check(
        `${label} · figure · the three lanes narrow strictly — ${laneWidths.map(n2).join(" → ")}px`,
        laneWidths.every((w, i) => i === 0 || w < laneWidths[i - 1] - 1),
        true,
      );
      const markSizes = PILLAR_IDS.map((id) => {
        const r = last.boxes[`mandate-pillar-mark-${id}`].rect;
        return `${n2(r.width)}×${n2(r.height)}`;
      });
      check(
        `${label} · figure · the four pillar marks are drawn identically — ${markSizes[0]}`,
        [...new Set(markSizes)],
        [markSizes[0]],
      );
    } else {
      // K.2's gates and its beyond-the-roadmap line. THE SLOT IS THE COLUMN: a gate
      // that wraps past its budget does not overflow a box, it runs into the band.
      const colBottom = (id) =>
        last.boxes[`mandate-phases-col-${id}`].rect.top + PG.PHASE_COL_HEIGHT;
      priceOne(
        "gate",
        PHASE_IDS.map((id) => ({
          id: `mandate-phases-gate-${id}`,
          label: `gate ${id}`,
          box: last.boxes[`mandate-phases-gate-${id}`],
          boxWidth: last.boxes[`mandate-phases-gate-${id}`].rect.width,
          maxLines: PG.GATE_LINES,
          slotBottom: colBottom(id),
        })),
      );
      // The calendar. TWO ARMS, and they are told apart by the register the content
      // module argues for — mono rows are the organisation's own published calendar,
      // a single sans sentence is the deck's statement about the absence of one. The
      // `theirs` rows carry `CALENDAR_ROW_BUDGET_CHARS`; the `ours` sentence is prose
      // and carries the gate budget, which is why it is priced with the gates above.
      const calendarRows = [];
      const oursArms = [];
      for (const id of PHASE_IDS) {
        const container = last.containers[`mandate-phases-calendar-${id}`];
        const gateTop = last.boxes[`mandate-phases-gate-${id}`].rect.top;
        const arm = container.rows.length > 0 && container.rows.every((r) => r.mono) ? "theirs" : "ours";
        for (const [i, row] of container.rows.entries()) {
          (arm === "theirs" ? calendarRows : oursArms).push({
            id: `mandate-phases-calendar-${id}`,
            label: `calendar ${id} row ${i}`,
            box: row,
            boxWidth: row.rect.width,
            maxLines: 1,
            slotBottom: gateTop,
          });
        }
      }
      check(
        `${label} · figure · every phase column fills its calendar slot — ${PHASE_IDS.length} columns, ${calendarRows.length} published rows and ${oursArms.length} deck sentence(s)`,
        [calendarRows.length > 0, oursArms.length > 0, calendarRows.length + oursArms.length >= PHASE_IDS.length],
        [true, true, true],
      );
      if (calendarRows.length) priceOne("calendar", calendarRows);
      // The calendar block, whichever arm it is, must stop before the gate under it.
      // This is the failure `CALENDAR_ROWS` exists to prevent, measured.
      check(
        `${label} · layout · every calendar block stops above its own gate`,
        PHASE_IDS.filter((id) => {
          const c = last.boxes[`mandate-phases-calendar-${id}`];
          return c.rect.bottom > last.boxes[`mandate-phases-gate-${id}`].rect.top + SUBPIXEL;
        }),
        [],
      );
      // The rung names, borrowed from another slide and budgeted here.
      priceOne(
        "rung",
        RUNG_IDS.map((id, i) => ({
          id: `mandate-phases-rung-name-${id}`,
          label: `rung ${id}`,
          box: last.boxes[`mandate-phases-rung-name-${id}`],
          boxWidth: last.boxes[`mandate-phases-rung-name-${id}`].rect.width,
          maxLines: 1,
          // A rung's name must not run into the NEXT rung's column, which is the exact
          // failure `RUNG_LABEL_GUTTER` is sized against. Vertical slot: the rung's own
          // drawn box.
          slotBottom: last.boxes[`mandate-phases-rung-${id}`].rect.bottom,
        })),
      );
      check(
        `${label} · cross-check · the drawn rung name box is rungColumnWidth(5) ${n2(PG.RUNG_COLUMN_WIDTH_5)} less the ${PG.RUNG_LABEL_INSET}px inset and the ${PG.RUNG_LABEL_GUTTER}px gutter`,
        n2(last.boxes[`mandate-phases-rung-name-${RUNG_IDS[0]}`].rect.width),
        n2(PG.RUNG_COLUMN_WIDTH_5 - PG.RUNG_LABEL_INSET - PG.RUNG_LABEL_GUTTER),
      );
      // ── ASSERTION 6: THE SAME OBJECT, SEEN TWICE ──
      check(
        `${label} · LADDER · the staircase prints gap-capability-ladder's five rung names, in order — ${LADDER.names.join(" / ")}`,
        RUNG_IDS.map((id) => last.boxes[`mandate-phases-rung-name-${id}`].text),
        LADDER.names,
      );
      check(
        `${label} · LADDER · and hangs them under that slide's own fig label — "${last.boxes["mandate-phases-ladder-heading"].text}"`,
        last.boxes["mandate-phases-ladder-heading"].text.startsWith(SLIDES.ladder.label),
        true,
      );
      // FIVE RUNGS DRAWN, THREE LIT — the geometric argument no string on the stage
      // makes. Which rungs carry chips is content, so this asserts the SHAPE: three
      // chip groups holding four chips, and neither end of the ladder claimed.
      const chipped = RUNG_IDS.filter((id) => last.boxes[`mandate-phases-chips-${id}`]?.mounted);
      check(
        `${label} · LADDER · the plan lands on 3 of the 5 rungs (${chipped.join(", ")}), claiming neither the bottom rung nor the top`,
        [
          chipped.length,
          chipped.includes(RUNG_IDS[0]),
          chipped.includes(RUNG_IDS[RUNG_IDS.length - 1]),
          PHASE_IDS.filter((p) => last.boxes[`mandate-phases-chip-${p}`].mounted).length,
        ],
        [3, false, false, PHASE_IDS.length],
      );
      // THE STAIRCASE CLIMBS. Left to right, one rung per column, strictly.
      const treads = RUNG_IDS.map((id) => last.boxes[`mandate-phases-tread-${id}`].rect);
      // THE RIGHT EDGE IS COMPARED ON THE RAW NUMBERS AND WITH A LayoutUnit TOLERANCE,
      // and that is not slack — it is the only correct comparison here. `rungColumnWidth(5)`
      // is 1184 / 5 = 236.8, which is NOT representable in Chromium's 1/64px LayoutUnits:
      // the last tread's left offset (995.2) and its width (236.8) are each truncated
      // toward zero on the way in, so the drawn right edge lands at 1231.984375 — exactly
      // one LayoutUnit short of the 1232 margin. Rounding both sides to 2dp before
      // comparing (as the checks over integral geometry above do) turns that 1/64px into
      // a reported 0.02px failure, which is the harness being wrong and not the stage.
      check(
        `${label} · figure · the staircase climbs strictly left to right, margin to margin — treads at ${treads.map((t) => n2(t.top)).join(", ")}, right edge ${treads[treads.length - 1].right}`,
        [
          treads.every((t, i) => i === 0 || t.top < treads[i - 1].top - 1),
          treads.every((t, i) => i === 0 || t.left > treads[i - 1].left),
          Math.abs(treads[0].left - MARGIN.left) <= SUBPIXEL,
          Math.abs(treads[treads.length - 1].right - MARGIN.right) <= SUBPIXEL,
        ],
        [true, true, true, true],
      );
      // THE FOUR COLUMNS TILE THE CONTENT WIDTH, as the browser drew them — the
      // falsifiable form of `PHASE_COL_WIDTH`'s derivation. Columns are absolutely
      // positioned, so a declared width that overflowed would still add up.
      const cols = PHASE_IDS.map((id) => last.boxes[`mandate-phases-col-${id}`].rect);
      const tiling = cols
        .map((c, i) => {
          if (Math.abs(c.width - PG.PHASE_COL_WIDTH) > SUBPIXEL) {
            return `${PHASE_IDS[i]}: drawn ${n2(c.width)}px, PHASE_COL_WIDTH is ${PG.PHASE_COL_WIDTH}`;
          }
          if (i === 0 && Math.abs(c.left - MARGIN.left) > SUBPIXEL) {
            return `${PHASE_IDS[i]}: starts at ${n2(c.left)}, the margin is ${n2(MARGIN.left)}`;
          }
          if (i > 0 && Math.abs(c.left - (cols[i - 1].right + PG.PHASE_GAP_X)) > SUBPIXEL) {
            return `${PHASE_IDS[i]}: starts at ${n2(c.left)}, one gap past the previous is ${n2(cols[i - 1].right + PG.PHASE_GAP_X)}`;
          }
          return null;
        })
        .filter(Boolean);
      check(
        `${label} · layout · the four phase columns tile the measured content width — 4 × ${PG.PHASE_COL_WIDTH} + 3 × ${PG.PHASE_GAP_X} = ${CONTENT_WIDTH}`,
        [tiling, n2(cols[cols.length - 1].right)],
        [[], n2(MARGIN.right)],
      );
    }

    // ── THE BAND AND THE CLOSER, ON THIS SLIDE ──
    const band = last.boxes[spec.band];
    const eyebrow = last.boxes[spec.bandEyebrow];
    const closer = last.boxes[spec.closer];
    check(
      `${label} · cross-check · the band spans the measured margins and the closer sits on the ${CLOSER_TOP} shelf`,
      [n2(band.rect.left), n2(band.rect.right), n2(closer.rect.left), n2(closer.rect.top)],
      [n2(MARGIN.left), n2(MARGIN.right), n2(MARGIN.left), CLOSER_TOP],
    );
    check(
      `${label} · cross-check · the rendered closer is no taller than CLOSER_HEIGHT ${CLOSER_HEIGHT} — drawn ${n2(closer.rect.height)}px, one line`,
      [closer.rect.height <= CLOSER_HEIGHT + SUBPIXEL, closer.lines],
      [true, 1],
    );
    check(
      `${label} · layout · the band clears the closer under it`,
      overlaps(band.rect, closer.rect),
      false,
    );
    check(
      `${label} · cross-check · the band's resolved inner padding is BAND_PADDING_X ${BAND_PADDING_X} / BAND_PADDING_Y ${BAND_PADDING_Y}, and its eyebrow starts on that inset`,
      [
        [n2(band.content.padLeft), n2(band.content.padRight), n2(band.content.padTop), n2(band.content.padBottom)],
        [n2(eyebrow.rect.left - band.rect.left - band.content.border), n2(eyebrow.rect.top - band.rect.top - band.content.border)],
      ],
      [
        [BAND_PADDING_X, BAND_PADDING_X, BAND_PADDING_Y, BAND_PADDING_Y],
        [BAND_PADDING_X, BAND_PADDING_Y],
      ],
    );
    // THE CITATION IS THE ONE STRING ON EITHER STAGE ALLOWED TO BE LONG, and both
    // geometry modules budget it TWO lines' worth for a fallback face. Measured: how
    // many it actually spends, and that it stays inside the band's own border.
    const citation = last.boxes[
      which === "enablement" ? "mandate-bottleneck-source" : "mandate-phases-band-provenance"
    ];
    check(
      `${label} · band · the citation is ${citation.advance.chars} chars → ${n2(citation.advance.width)}px unwrapped in a ${n2(citation.rect.width)}px band, rendering ${citation.lines} line(s) inside its border`,
      [citation.lines <= 2, citation.rect.bottom <= band.content.bottom + SUBPIXEL],
      [true, true],
    );

    const navClearance = NAV_TOP - closer.rect.bottom;
    summary.push({
      variant,
      which,
      index: spec.index,
      fig: expectedFig,
      poses,
      lowest,
      clearance,
      navClearance,
      closerBottom: closer.rect.bottom,
      smil: poseNotes.map((n) => n.state.smil),
      revealed: fwdCounts,
    });

    console.log(`\n      ${variant} · ${which} — measured in stage coordinates (pose ${poses - 1})`);
    for (const id of spec.required) {
      const b = last.boxes[id];
      if (!b.mounted) continue;
      console.log(
        `      ${id.padEnd(34)} x ${String(n2(b.rect.left)).padStart(7)}…${String(n2(b.rect.right)).padStart(7)}  y ${String(n2(b.rect.top)).padStart(6)}…${String(n2(b.rect.bottom)).padStart(6)}  ${b.lines}L`,
      );
    }
  }

  // ── ASSERTION 5: THE SHARED BAND AND THE SHARED SHELF, ACROSS THE TWO SLIDES ──
  //
  // The claim `phases-gates-geometry.ts` makes by IMPORT rather than by comment: a
  // reader cannot tell the two slides apart by their gutters, and the deck's own ask
  // does not move between two consecutive clicks. Both sides measured off the two
  // stages, one click apart, in this deck.
  const k1 = fullest.enablement;
  const k2 = fullest.phasesGates;
  if (k1 && k2) {
    const b1 = k1.boxes["mandate-bottleneck"];
    const b2 = k2.boxes["mandate-phases-band"];
    const e1 = k1.boxes["mandate-bottleneck-eyebrow"];
    const e2 = k2.boxes["mandate-phases-band-eyebrow"];
    const c1 = k1.boxes["mandate-closer"];
    const c2 = k2.boxes["mandate-phases-closer"];
    check(
      `${tag} · SHARED · the two bands span the same x and carry the same gutters — ${n2(b1.rect.left)}…${n2(b1.rect.right)}, padding ${n2(b1.content.padLeft)}×${n2(b1.content.padTop)}`,
      [
        n2(b2.rect.left),
        n2(b2.rect.right),
        n2(b2.content.padLeft),
        n2(b2.content.padRight),
        n2(b2.content.padTop),
        n2(b2.content.padBottom),
        n2(b2.content.border),
      ],
      [
        n2(b1.rect.left),
        n2(b1.rect.right),
        n2(b1.content.padLeft),
        n2(b1.content.padRight),
        n2(b1.content.padTop),
        n2(b1.content.padBottom),
        n2(b1.content.border),
      ],
    );
    check(
      `${tag} · SHARED · and both eyebrows start at the same inset inside their band`,
      [n2(e2.rect.left - b2.rect.left), n2(e2.rect.top - b2.rect.top)],
      [n2(e1.rect.left - b1.rect.left), n2(e1.rect.top - b1.rect.top)],
    );
    // THE HEIGHTS ARE NOT COMPARED, ON PURPOSE. K.1 budgets a 28px statement line and
    // K.2 a 27px one, so the two bands are legitimately 118px and 116px tall — the
    // shared claim is the GUTTERS, and demanding equal heights would be demanding the
    // wrong thing. Printed rather than asserted, so a reader sees the difference is
    // known.
    console.log(
      `      band heights, deliberately different: K.1 ${n2(b1.rect.height)}px (28px statement line) · K.2 ${n2(b2.rect.height)}px (27px)`,
    );
    check(
      `${tag} · SHARED · the deck's ask does not move between two consecutive clicks — both closers at top ${n2(c1.rect.top)}, left ${n2(c1.rect.left)}, width ${n2(c1.rect.width)}`,
      [n2(c2.rect.top), n2(c2.rect.left), n2(c2.rect.width)],
      [n2(c1.rect.top), n2(c1.rect.left), n2(c1.rect.width)],
    );
    check(
      `${tag} · SHARED · geometry CLOSER_TOP ${CLOSER_TOP} is where both decks actually drew both closers`,
      [n2(c1.rect.top), n2(c2.rect.top)],
      [CLOSER_TOP, CLOSER_TOP],
    );
    // NAV_ZONE_CLEARANCE is derived from `CLOSER_TOP + CLOSER_HEIGHT`, and
    // `CLOSER_HEIGHT` is 28 — the integer above 20px × 1.35 = 27. So the module's
    // number is conservative against the measurement, which is the direction it has to
    // be wrong in: a module that promised more clearance than the stage draws is the
    // failure, and one that promises slightly less is a rounded line height.
    for (const [name, closer] of [["K.1", c1], ["K.2", c2]]) {
      const measured = NAV_TOP - closer.rect.bottom;
      check(
        `${tag} · SHARED · ${name} · geometry NAV_ZONE_CLEARANCE ${NAV_ZONE_CLEARANCE} does not over-promise the measured ${n2(measured)}px`,
        [NAV_ZONE_CLEARANCE <= measured + SUBPIXEL, measured - NAV_ZONE_CLEARANCE < 2],
        [true, true],
      );
    }
    check(
      `${tag} · SHARED · K.2 re-derives the same clearance from the same two shared constants`,
      PG.NAV_ZONE_CLEARANCE,
      NAV_ZONE_CLEARANCE,
    );
  }
}

// ───────────────── the console ─────────────────

if (noise.length) for (const n of noise) console.log(`      console · ${n}`);
check("console clean across both decks, both slides, every pose and both directions", noise, []);
check(
  `every pose on every slide went quiet inside ${SETTLE_CAP}ms${REDUCED ? " under reduce" : ""}`,
  stillMoving,
  [],
);

// ───────────────── the deliverable ─────────────────

console.log(`\n      THE MEASURED NUMBERS${REDUCED ? " (reduced motion)" : ""}`);
console.log(
  `      .nav-zone top ${n2(NAV_TOP)} — measured off the element, not read from either geometry module`,
);
console.log(`\n      THE FOUR BUDGETS, PRICED IN PIXELS`);
for (const spec of BUDGETS) {
  const p = priced[spec.key];
  if (!p) {
    console.log(`      ${spec.name.padEnd(26)} not priced — no governed string reached the stage`);
    continue;
  }
  console.log(
    `      ${spec.name.padEnd(26)} ${String(spec.chars).padStart(3)} chars · ${spec.module}\n` +
      `                                 assumed ${String(spec.assumed).padStart(4)}px/char → budgeted ${String(n2(p.budgetedPx)).padStart(7)}px\n` +
      `                                 MEASURED ${String(n2(p.worst.perChar)).padStart(4)}px/char → priced   ${String(n2(p.measuredPx)).padStart(7)}px  (worst: ${p.worst.label} "${p.worst.text.slice(0, 34)}")\n` +
      `                                 available ${n2(p.boxWidth)}px × ${spec.lines} line(s) = ${n2(p.availablePx)}px → ${n2(p.availablePx - p.measuredPx)}px spare\n` +
      `                                 longest authored: ${p.longest.label} ${p.longest.chars} chars → ${n2(p.longest.width)}px unwrapped`,
  );
}
console.log(`\n      THE TWO SLIDES, PER DECK`);
for (const s of summary) {
  console.log(
    `      ${s.variant.padEnd(12)} ${s.which.padEnd(11)} slide ${String(s.index).padStart(2)} · ${s.fig}\n` +
      `                   ${s.poses} poses · revealed per pose ${s.revealed.join(",")} · SMIL per measurement ${s.smil.join(",")}\n` +
      `                   lowest painted box ${s.lowest.id} bottom ${n2(s.lowest.bottom)} → CLEARANCE ${n2(s.clearance)}px · closer bottom ${n2(s.closerBottom)} → ${n2(s.navClearance)}px`,
  );
}

console.log(`\n${failures ? `${failures} FAILURE(S)` : "all checks passed"} · shots: ${OUT}`);
await browser.close();
process.exit(failures ? 1 : 0);
