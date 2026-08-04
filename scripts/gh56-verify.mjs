// gh#56's browser evidence — THEIR OWN PROOF, both leader decks, three poses, walked
// forward and back.
//
// `tests/unit/invest-own-proof.test.tsx` owns everything jsdom can see, and it is
// explicit about the half it cannot: jsdom places nothing, computes no text and runs
// no transition, so every geometric claim there is "both sides read the same number
// out of `src/slides/leader-invest/geometry.ts`". That module is ARITHMETIC OVER
// CONSTANTS — `ROW_CAPACITY`, `SLOT_HEIGHT`, `NAV_ZONE_CLEARANCE` and the three
// column widths are all derived from a dozen literals — so a unit test over it can
// only prove that both sides of the same sum agree. This script owns the claims that
// need an engine, and they are the ones the slide is actually at risk of:
//
//   1. THE TWO STRINGS THAT COULD NOT FIT. `geometry.ts` sizes two cells from a
//      character count and an assumed advance width, and says so in both doc
//      comments: `FIGURE_COL_W` is 380 because "2 days → under 1 hour" is "21
//      characters of 26px mono at ≈0.6em advance ≈ 333px", and `MARK_COL_W` is 168
//      because "PARTICIPANT-CLAIMED" is "19 characters of 10px mono at 0.14em
//      tracking ≈ 141px, plus 16px of the chip's own padding". Both estimates are
//      guesses about a font this repo does not measure anywhere else, and BOTH CELLS
//      ARE FIXED-WIDTH, so being wrong does not throw — the figure silently wraps to
//      two lines and the chip breaks inside its own hairline border. The chip is the
//      ugly one: `ProofLedger` calls a wrapped chip "damage rather than a caveat",
//      and it is the one string on the slide the AC is written about.
//
//      MEASURED THREE WAYS, because one of them is blind to each failure.
//      `scrollWidth` vs `clientWidth` catches the chip (its `nowrap` span is a flex
//      item, so it is blockified and reports both) and is VACUOUS on the figure,
//      whose fixed 380px box stays 380px wide while the text inside it wraps. The
//      rendered LINE COUNT — one `Range` per text node, one client rect per line box
//      — catches the figure and is the only channel that does. And the text's own
//      range box against its cell's content edge is what turns a pass into a NUMBER,
//      which is what the ticket asks for.
//
//   2. THE CLEARANCE, against a floor that is MEASURED AND NOT READ. `.nav-zone` in
//      `src/styles/globals.css` is `position: absolute; bottom: 0; height: 88px`, so
//      its top edge is y = 632 — and 632 is exactly what `NAV_ZONE_TOP` in
//      `geometry.ts` claims, which is why this script does not use that constant as
//      the floor. It measures the ELEMENT'S OWN bounding box and asserts against
//      that, then cross-checks the module's number against the measurement. A
//      harness that reads the number it is checking proves only that the number
//      equals itself. The same rule sends the side margins through `.fig-label`'s own
//      rect rather than through a literal 48.
//
//      THE FLOOR IS NOT gh#53'S. `scripts/gh53-verify.mjs` stops content at y = 660,
//      the number `E12Primitives` measured for the NavBar CLUSTER plus its padding.
//      This slide's floor is the HOVER BAND, which starts 28px higher and is a band
//      the presenter's own pointer arms — `geometry.ts` is written against it and
//      gh#54 made the same choice. 660 would pass a closer at 640 that the chrome
//      fades up over.
//
//   3. THREE POSES, FORWARD AND BACK, IN ONE MOUNT. The AC's wording is "every
//      declared pose renders and re-renders in both directions", and the unit test
//      answers it over `innerHTML`. That is the right test in jsdom and it cannot see
//      the thing that actually breaks: `.fade` is an opacity TRANSITION plus a
//      `fadeReveal` animation, so a pose can be structurally identical and visually
//      stuck — a row left at 0.4 on the way back, or a closer that never returns to
//      0. So this walks 0 → 1 → 2 → 1 → 0 in one mount and compares each pose's
//      COMPUTED state against its forward counterpart, with the number of declared
//      poses read off the NavBar's own step counter rather than hardcoded.
//
//   4. REDUCED MOTION, both halves. Zero SMIL nodes at every pose is checkable in
//      jsdom (and this slide has no `<svg>` at all, so it is closed by construction);
//      that each pose then rests on its FINISHED frame is not, because the global
//      rule in globals.css squashes a transition and an animation the browser has to
//      actually run. And the sharper half needs a mid-flight sample: under `reduce`
//      there is no IN-BETWEEN frame at all, while under normal motion there is — the
//      second half is the first half's positive control, because a sampler that can
//      never see an intermediate opacity would report a squashed transition on a deck
//      that never squashed one. gh#54 documents this and it is repeated here because
//      the first version of THAT script passed the claim vacuously.
//
//      THE DECK-WIDE FACT gh#54 RECORDED APPLIES HERE UNCHANGED: the global rule
//      squashes `animation-duration` and `transition-duration`, NOT the delay.
//      `ProofLedger`'s stagger is `120 + i × 90`ms of DELAY and the attribution is
//      `120 + count × 90`, so GEMS' source line still arrives 480ms after the pose
//      change under `reduce` — instantly, but late. The reduced settle budget below
//      is therefore governed by the stagger and not by the duration.
//
//   5. THE THESIS, ON THREE DIFFERENT SLIDES. §4.5's claim is that the leader cover,
//      A.1 and this slide carry ONE sentence. The unit test compares the three
//      constants, which is the strongest thing available in jsdom and still only
//      proves the constants equal each other. This reads the rendered text off the
//      composed deck's cover, off its A.1 and off this closer — three separate
//      slides, one page load each — and compares those. It is the one AC that only a
//      rendered comparison can settle. The cover's OPENER is derived from the cover's
//      own rendered tagline (its first sentence) and not transcribed, so this cannot
//      pass by agreeing with a constant nobody rendered.
//
//   6. THE COMPOSED LETTERS. The letter is DERIVED (§3.5), so the only place `D.1`,
//      `C.2`, `H.12`, `M.3` and A.1's `SECTION D · WHY INVEST` row exist as rendered
//      text is a browser. Harvested from a walk of the WHOLE deck, once per brand, so
//      "exactly one slide prints this" is part of the claim rather than "the first
//      slide that matched".
//
// THE STAGE'S SCALE, handled explicitly for gh#54's reason. `useViewportScale`
// CSS-transforms `.stage-wrap` by `min(w/1280, h/720)`, and gh53-verify reads raw
// `boundingBox()` values at a 1280×720 viewport where that factor happens to be
// exactly 1. This script reads the `.stage-wrap` matrix, ASSERTS it is 1:1, and
// converts every rect through the stage's own origin and scale anyway — so every
// number it prints is a stage coordinate whatever viewport it is handed.
//
// Modelled on `scripts/gh54-verify.mjs` and failing the same way: every assertion
// prints `ok` / `FAIL` and a failure exits 1, so this is runnable from a gate and not
// only readable by a human.
//
// Usage:
//   node scripts/gh56-verify.mjs                        # gems-leader first
//   node scripts/gh56-verify.mjs --variant=berau-leader
//   node scripts/gh56-verify.mjs --reduced
//   DECK_URL=http://localhost:5183 node scripts/gh56-verify.mjs
//
// The variant is explicit for the same reason the export scripts take one (gh#27): a
// bare localhost resolves to `general`, which composes no `invest` run at all.
//
// `--variant` PICKS THE ORDER, NOT THE SET. The slide's whole argument is that the
// figures belong to the organisation in the room (§4.4 slot 3), so both leader decks
// are always measured; the flag decides which one goes first and which one the
// one-off structural checks (the stage scale, the motion sample) run against.
// Default `gems-leader` — the brand at its maximum on both cells this script exists
// to measure: four rows against Berau's three, and the 333px figure. A standard
// variant is not silently skipped: it exits 1 saying the deck composes no `invest`
// run.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";
// The brand and deck-set table, imported for the same reason `./lib/variant-arg.mjs`
// imports it: it is plain data with no imports, so bare Node's type stripping
// resolves it standalone, and WHICH variants are leader decks stays its answer.
import { VARIANTS } from "../src/deck-variants.ts";
// The module under test. Imported for CROSS-CHECKS ONLY — every claim below is
// asserted against a measured rect first, and these constants are then held against
// that measurement. Nothing here is used as the floor, the margin or the ceiling.
// Also plain data: no imports, no DOM, no module-scope work beyond the arithmetic.
//
// `./content.ts` is deliberately NOT imported, and for two reasons rather than one:
// bare Node cannot resolve its `@/`-aliased imports, and a harness that asserts the
// strings it imports proves only that the content module equals itself. Every string
// below is transcribed from the issue's AC and spec §6.7.
import {
  ATTRIBUTION_HEIGHT,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  COL_GAP,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  FIGURE_COL_W,
  MARK_COL_W,
  METRIC_COL_W,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  ROW_CAPACITY,
  ROW_HEIGHT,
  SIDE_MARGIN,
  SLOT_HEIGHT,
  SLOT_TOP,
  attributionOffset,
  rowOffset,
} from "../src/slides/leader-invest/geometry.ts";

const USAGE = [
  "Usage: node scripts/gh56-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>]",
  "",
  `  --variant=<id>   Leader deck to measure FIRST. Default: gems-leader. Ids: ${VARIANT_IDS.join(", ")}`,
  "                   Both leader decks are always measured; a standard deck exits 1.",
  "  --reduced        Run under `prefers-reduced-motion: reduce`.",
  "  --out=<dir>      Where to write the shots. Default: /tmp/gh56",
  "",
  "  DECK_URL         Base url to render. Default: http://localhost:5173",
].join("\n");

const { variant: parsedVariant, flags, values } = parseVariantArgOrExit(
  process.argv.slice(2),
  USAGE,
  { booleans: ["reduced"], values: ["out"] },
);

// The shared parser defaults to `general`, which composes no `invest` run. An
// explicit `--variant` always wins.
const PRIMARY = process.argv.slice(2).some((a) => a.startsWith("--variant"))
  ? parsedVariant
  : "gems-leader";
const REDUCED = flags.reduced;
const OUT = values.out ?? (REDUCED ? "/tmp/gh56-reduced" : "/tmp/gh56");
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

// ───────────────────── what the slide must SAY ─────────────────────
//
// SECOND COPIES ON PURPOSE, gh#53's and gh#54's rule: a harness that imports the
// strings it asserts proves only that the content module equals itself. These are
// transcribed from the issue's AC and spec §6.7 — the sources the content module was
// written from — so a silent edit to either side fails here.

/**
 * All seven figures — GEMS' four and Berau's three — per brand, and the epistemic
 * mark each one must carry.
 *
 * THE PAIRING IS THE CLAIM. A figure is quoted from an outside record and a mark says
 * how it is known; a row that renders the number and drops the chip is the failure
 * the whole slide exists to prevent, and it renders perfectly. The ORDER is asserted
 * too — §6.7 gives GEMS' four in this order and the column reads top to bottom.
 *
 * The metric names are NOT transcribed. `tests/unit/invest-own-proof.test.tsx` pins
 * all seven as literals, so repeating them here would be a third copy of one string
 * with no new claim attached; what this script asserts instead is that every row
 * renders a NON-EMPTY metric, because a figure without what it measures is a number
 * a leader cannot use and that is the part a layout can break.
 */
const ROWS = {
  gems: [
    ["decision-speed", "+90%", "vendor-reported"],
    ["retrieval", "2 days → under 1 hour", "vendor-reported"],
    ["portfolios", "50+", "vendor-reported"],
    ["users", "4,000+", "vendor-reported"],
  ],
  berau: [
    ["production-status", "IDR 135–155M", "participant-claimed"],
    ["document-automation", "IDR 35–38M", "participant-claimed"],
    ["geospatial-safety", "IDR 200–700M", "participant-claimed"],
  ],
};

/**
 * What the on-slide attribution has to name, per brand (§6.7 "cite attributed").
 *
 * SUBSTRINGS AND NOT THE WHOLE LINE, deliberately. The AC is about the CLAIMS the
 * citation makes — who published the figures, that it is a customer story, that the
 * vendor reported them, and that nobody audited them — not about its punctuation. A
 * whole-line comparison here would fail on a comma and pass on a dropped negation.
 */
const ATTRIBUTION_MUST_NAME = {
  gems: ["Google Cloud", "customer story", "vendor-reported"],
  berau: ["Vol-1 winners", "annual", "participant-claimed"],
};

/** The mono eyebrow, per brand (§6.7) — the string that says WHOSE proof the room is
 *  looking at, which is the half of pose 0's argument the shared headline cannot
 *  make. */
const EYEBROW = {
  gems: "GEMVIS · GEMS' OWN PLATFORM",
  berau: "VOL-1 WINNERS · BERAU COAL'S OWN TEAMS",
};

/** The shared headline — the premise, and only the premise. */
const HEADLINE = "An outsider's case study is easy to discount.";

/**
 * The ONE construction in which the forbidden vocabulary may appear on this slide.
 *
 * TRANSCRIBED FROM THE AC, not read off `NOT_AUDITED`. The unit test reads the
 * constant on purpose — it wants a reword that drops the "not" to change the strip —
 * and this script wants the opposite: the AC names the phrase, so a rename of the
 * constant that also rewords the copy must fail HERE.
 */
const NEGATION = "not independently audited";

/**
 * The words no figure on this slide may be described with.
 *
 * Same list as the unit test's, and a second copy for the same reason as everything
 * else in this block. `\b`-anchored, so "auditing" is caught.
 */
const AUDIT_WORDS =
  /\b(audit|audits|audited|auditing|auditor|independent|independently|verified|verify|verifiable|validated|certified|assured)\b/i;

/**
 * The five figures a composed leader deck must derive (§3.5), as rendered text.
 *
 * ASSERTED AS LITERALS, and that is a decision with a known expiry. #57's
 * `invest-base-rates` is §6.7's D.1 and lands IN FRONT of this slide, which will make
 * this slide D.2 and move nothing else. When that happens this line must fail and be
 * updated — which is the point: a harness that accepted any letter would not notice a
 * run that landed in the wrong section, and the AC for this ticket names the letters.
 */
const FIGURES = {
  invest: "— FIG. D.1·PROOF FROM INSIDE THE COMPANY",
  f8: "— FIG. C.2·YOUR AGENTIC OS",
  e12: "— FIG. H.12·LOOP ENGINEERING",
  closer: "— FIG. M.3·THANK YOU",
};

/** A.1's third agenda row, which exists only because `invest` started owning a slide
 *  — it read `WHY INVEST`, letterless, until this ticket. The arrow is part of the
 *  rendered string. */
const A1_INVEST_ROW = "→ SECTION D · WHY INVEST";

/**
 * Which slide is which, by a testid that is on the stage AT POSE 0.
 *
 * Pose 0 matters: `e12-loop-engineering` unmounts one pose's figure when it leaves,
 * so `e12-anatomy` does not exist until pose 1 and a harvest keyed on it would report
 * that H.12 is not in the deck. `e12-mindset` is pose 0's, which is what
 * `scripts/projection-test.mjs` keys its own search on.
 */
const SLIDE_MARKERS = {
  cover: "slide-title",
  a1: "a1-tagline",
  f8: "f8-headline",
  invest: "invest-proof-slot",
  e12: "e12-mindset",
  closer: "k3-root",
};

// ───────────────────── the floors (gh#50) ─────────────────────

/**
 * gh#50 call 3's projector floors, restated here rather than imported: the constants
 * live in `E12Primitives` and are section E's, and a shared typography module is a
 * cleanup this ticket is not. Two copies on purpose — a harness that reads the number
 * it is checking proves only that the number equals itself.
 *
 * `scripts/projection-test.mjs` is where these were set and it is the reference for
 * both halves: 9.5px for a mono LABEL, 10.5px for prose.
 */
const MONO_FLOOR = 9.5;
const PROSE_FLOOR = 10.5;

/**
 * The COLOUR floor, and it is two gates rather than one because the deck's own
 * ladders disagree about which is the honest question.
 *
 *   · THE TIER GATE. `--neutral-400` and everything under it is out of bounds for
 *     text on this stage — that is exactly the reportable grey
 *     `scripts/projection-test.mjs` enforces after `more and more unattended →`
 *     proved illegible on a washed-out projector profile, and exactly the
 *     `BELOW_FLOOR` list `invest-own-proof.test.tsx` holds over the inline styles.
 *     RESOLVED THROUGH `getComputedStyle` at run time, not transcribed: the tier
 *     names are read off a probe element in the page, so `globals.css` retuning
 *     `--neutral-400` moves this gate with it. NO EXEMPTIONS.
 *
 *   · THE LUMINANCE GATE, which is the stricter reading of "not below the
 *     `--neutral-300` tier" and the one gh53-verify uses. It has to be stated with
 *     its exception, because the deck HAS a text colour dimmer than `--neutral-300`
 *     by luminance and uses it everywhere: `--copper-400` (0.314 against
 *     `--neutral-300`'s 0.366). It is the deck-wide keyword tier every `em.kw` in all
 *     five decks renders in, and it is the mono LABEL tier the sibling leader slide
 *     puts its kicker in (`PillarOrbit.tsx:288`, `monoLabel(11, "var(--copper-400)")`
 *     — this slide's eyebrow is the same 11px call). So the gate is: anything under
 *     the measured `--neutral-300` luminance must be EXACTLY `--copper-400`, and the
 *     elements it covers are printed by name. A third colour sneaking under the
 *     floor fails; a fourth element joining the copper label tier is reported.
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
 * Deck CHROME, excluded from the floor audit by name and with the reason.
 *
 * gh#53's finding, and the exclusions are the same two:
 *   · `.nav-zone` — the NavBar's `Step` / `Slide` counters are 9px mono on
 *     `--copper-700`, they are on all 60 slides of every deck, and they are not
 *     projected copy.
 *   · `.fig-label .dot` — the `·` between the figure reference and the label, also
 *     `--copper-700`, also on every numbered slide in the deck.
 * Everything else inside the stage is audited, this slide's headline and its derived
 * figure reference included.
 */
const CHROME = [".nav-zone", ".fig-label .dot"];

// ───────────────────── timing ─────────────────────

/** Mount, before the first measurement. Pose 0 has no reveal to wait for; this is the
 *  app booting and the fonts landing. */
const MOUNT_MS = 700;
/**
 * After a pose change, before anything is measured as "at rest".
 *
 * 1500 normal: the last GEMS row's reveal starts at `120 + 3 × 90` = 390ms and the
 * attribution's at `120 + 4 × 90` = 480ms, each running a 450ms transition and a
 * 500ms `fadeReveal`, so the column finishes at ≈980ms; the fade OUT on the way back
 * has no delay and runs 450ms. 900 under `reduce`: both durations are squashed to
 * 0.01ms but THE DELAY IS NOT (see the header), so the attribution still lands at
 * ≈480ms. Neither number is slack — both are the measured finish plus a margin, and
 * the reduced one is deliberately too short to hide a transition that was never
 * squashed.
 */
const POSE_MS = REDUCED ? 900 : 1500;
/**
 * The mid-reveal sample is taken AT AN EVENT, not at a wall-clock offset, for the
 * reason gh#54 records against itself: its first version sampled 350ms after the
 * keypress, and under `--reduced` that frame came back all zeros — the reveal had not
 * begun, and "no element is ever mid-transition" passed by measuring a figure that
 * had not started moving. So the sampler POLLS until the first row leaves opacity 0
 * and samples THAT frame; `sampled == null` is a failure rather than a pass.
 */
const ARRIVAL_POLL_MS = 16;
const ARRIVAL_DEADLINE_MS = 2500;

/**
 * How close a rendered edge can be asked to sit to a geometric one: 1/64px.
 *
 * Chromium lays out in `LayoutUnit`s of 1/64px and truncates toward zero on the way
 * in, so a box the module puts at a fractional coordinate can render nowhere else.
 * A tolerance any wider than one LayoutUnit would start hiding real drift.
 */
const SUBPIXEL = 1 / 64;

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

/**
 * Walk the WHOLE deck once and record, per index, the derived figure caption and
 * which of `SLIDE_MARKERS` is on the stage.
 *
 * A FULL WALK AND NOT A SEARCH, which is the difference that makes assertion 6 mean
 * something: "exactly one slide in this deck prints D.1" needs every slide looked at,
 * and a loop that stopped at the first match would pass a deck holding two. It is
 * also how the five indices are DISCOVERED — §3 derives every position and the rest
 * of Phase 6 inserts four more `invest` slides, so a literal index would check
 * whatever slide 5 has become.
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
      await page.evaluate((markers) => {
        const at = (id) => document.querySelector(`[data-testid="${id}"]`);
        return {
          fig: document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
          found: Object.entries(markers)
            .filter(([, id]) => at(id))
            .map(([name]) => name),
        };
      }, SLIDE_MARKERS),
    );
  }
  return rows.map((r, i) => ({ index: i, ...r }));
}

function overlaps(a, b) {
  return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
}

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

/**
 * Everything this slide is, at the pose it is currently on, in STAGE COORDINATES.
 *
 * ONE `evaluate`, because every rect and every computed style has to come from the
 * same layout: measuring the boxes in one round trip and the nav zone in the next is
 * how a harness reports a clearance that no single frame ever had.
 */
function measure(page, ids, probeTiers) {
  return page.evaluate(
    ({ ids, probeTiers, chrome }) => {
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
        };
      };
      /**
       * The box a text run has to fit inside: the nearest ancestor that is not an
       * inline box, content edge.
       *
       * AN INLINE BOX IS AS WIDE AS ITS OWN TEXT, so measuring one against itself is
       * the vacuous comparison this walks past. The closer's two `em.kw` spans and the
       * headline's are inline; the box that actually constrains them is the `<p>` and
       * the `<h1>`. Every fixed-width cell on this slide is a block or a flex item, so
       * this returns the cell itself for the two the ticket names.
       */
      const cellOf = (el) => {
        let a = el;
        while (a && a !== stage && getComputedStyle(a).display.startsWith("inline")) {
          a = a.parentElement;
        }
        return contentRect(a ?? el);
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
      const box = (id) => {
        const el = at(id);
        if (!el) return { mounted: false };
        const cs = getComputedStyle(el);
        return {
          mounted: true,
          on: el.classList.contains("on"),
          fade: el.classList.contains("fade"),
          opacity: parseFloat(cs.opacity),
          text: el.textContent,
          rect: rect(el),
          content: contentRect(el),
          // The row's `.fade` translates 8px on the way in; the settled frame is the
          // identity, and a pose left mid-transition shows up here as well as in the
          // opacity.
          translateY: cs.transform === "none" ? 0 : new DOMMatrixReadOnly(cs.transform).f,
          color: cs.color,
          fontSize: parseFloat(cs.fontSize),
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
        };
      };
      const boxes = {};
      for (const id of ids) boxes[id] = box(id);

      /**
       * Every text RUN on the stage, at text-node granularity.
       *
       * TEXT NODES AND NOT ELEMENTS, which is `projection-test.mjs`'s decision and
       * the right one: the closer is one `<p>` holding four runs in two colours, and
       * an element-level walk would read the `<p>`'s own inherited colour and miss
       * both `em.kw` spans. A `Range` over the node gives the TEXT's own box and one
       * client rect per line box, which is the only exact line count available.
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
        const lineRects = [...range.getClientRects()];
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
          lines: lineRects.length,
          textBox: conv(tbox),
          // An INLINE box reports 0 for both, by definition, so the comparison is
          // vacuous there and is skipped rather than passed. Every fixed-width cell
          // on this slide is a block or a flex item, so the two the ticket names are
          // both covered.
          blockish: el.clientWidth > 0,
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          // The cell this run has to fit inside.
          cell: cellOf(el),
          // Whether the room can see it at all, at this pose.
          effOpacity: effectiveOpacity(el),
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
        figLabel:
          document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
        slideIndex: stage.dataset.slideIndex,
        // The DECLARED pose count, read off the NavBar's own step counter — the first
        // `.nav-group-count` is `NN / TT` for the step group. Discovered rather than
        // hardcoded, so a fourth pose added to the slide def is walked.
        stepCounter: document.querySelector(".nav-group-count")?.textContent ?? null,
        tiers,
        boxes,
        runs,
        // The whole DOCUMENT, not the slide's subtree: the claim is that this slide
        // introduces no SMIL anywhere, chrome included.
        smil: document.querySelectorAll(
          "animate, animateTransform, animateMotion, set, animateColor",
        ).length,
        // AND NO `<svg>` UNDER THIS SLIDE'S OWN BOXES. This is the construction that
        // closes the SMIL question by design rather than by discipline (`ProofLedger`
        // says so); the NavBar's own chevrons are SVG and are not this slide's.
        slideSvg: [...document.querySelectorAll('[data-testid^="invest-"]')].reduce(
          (sum, b) => sum + b.querySelectorAll("svg").length,
          0,
        ),
        // Everything the stage says, minus the chrome — the input to the audit
        // vocabulary rule.
        stageText: (() => {
          const clone = stage.cloneNode(true);
          for (const el of clone.querySelectorAll(".nav-zone")) el.remove();
          return clone.textContent ?? "";
        })(),
      };
    },
    { ids, probeTiers, chrome: CHROME },
  );
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  ...(REDUCED ? { reducedMotion: "reduce" } : null),
});
const page = await context.newPage();

const noise = [];
/** Vite's HMR socket, which drops when this harness navigates the deck looking for
 *  the slide, and React's devtools nudge. Both are the dev SERVER talking, not the
 *  deck, and neither exists on a deployment. Nothing else is filtered. */
const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]|Download the React DevTools/;
page.on("console", (m) => {
  if ((m.type() === "error" || m.type() === "warning") && !DEV_SERVER_NOISE.test(m.text())) {
    noise.push(`${m.type()}: ${m.text()}`);
  }
});
page.on("pageerror", (e) => noise.push(`pageerror: ${e.message}`));

const stage = page.locator('[data-testid="slide"]');
const shot = (name) => stage.screenshot({ path: `${OUT}/${name}.png` });

/**
 * Land on one slide, wait for the stage AND for the fonts, and SAY SO when the slide
 * cannot be reached.
 *
 * THE FONTS, not `networkidle`. Every width this script asserts is a text
 * measurement, so measuring before the webfont lands would measure the fallback —
 * `document.fonts.ready` is the exact signal for that and `networkidle` is a proxy
 * that also waits for things this harness does not care about.
 *
 * THE RETRY is the one `scripts/gh53-verify.mjs` and gh#54's search already carry,
 * for the reason they give: this harness navigates the deck 60 times in a row and
 * Vite's dev server does not always keep up. What is new is the DIAGNOSTIC — a bare
 * `waitFor` timeout says only "not visible", and the two facts worth having (what the
 * page threw, and what it rendered instead) are gone by the time the stack prints.
 */
async function gotoSlide(variant, index, settle = 0) {
  for (const attempt of [1, 2, 3]) {
    try {
      await page.goto(url(variant, { slide: index }), { waitUntil: "domcontentloaded" });
      await stage.waitFor({ timeout: 15000 });
      await page.evaluate(() => document.fonts.ready);
      if (settle) await page.waitForTimeout(settle);
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

// ───────────────── is this deck even holding the slide? ─────────────────

await page.goto(url(PRIMARY), { waitUntil: "domcontentloaded" });
const slideCount = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
const primaryHarvest = await harvestDeck(page, PRIMARY, slideCount);
const investRow = primaryHarvest.find((r) => r.found.includes("invest"));
if (investRow == null) {
  console.error(
    `\`invest-own-proof\` is not in ${PRIMARY} (${slideCount} slides): this deck ` +
      `composes no \`invest\` run. The slide is leader-only (§4.3) and reaches the ` +
      `two leader deck sets alone — run --variant=${LEADER_VARIANTS[0] ?? "gems-leader"}.`,
  );
  await browser.close();
  process.exit(1);
}
console.log(
  `${PRIMARY} · ${slideCount} slides · the ledger at index ${investRow.index}` +
    `${REDUCED ? " · reduced motion" : ""}\n` +
    `measuring both leader decks: ${LEADER_VARIANTS.join(", ")}\n`,
);

// ───────────────── the stage, and the floor it draws ─────────────────

await gotoSlide(PRIMARY, investRow.index, MOUNT_MS);
const base = await measure(page, [], [...BELOW_FLOOR_TIERS, FLOOR_TIER, LUMINANCE_EXEMPT_TIER]);

// Every number below is a stage coordinate BECAUSE the conversion divides the scale
// out. This asserts the conversion had nothing to do, which is the only way to know
// the raw rects and the converted ones are the same numbers at this viewport.
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
/** THE CEILING. The ledger must start under the headline row the deck rendered. */
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
  `geometry NAV_ZONE_TOP ${NAV_ZONE_TOP} equals the measured .nav-zone top`,
  NAV_ZONE_TOP,
  n2(NAV_TOP),
);
check(
  `geometry SIDE_MARGIN ${SIDE_MARGIN} / CONTENT_WIDTH ${CONTENT_WIDTH} equal the measured margin band`,
  [SIDE_MARGIN, SIDE_MARGIN + CONTENT_WIDTH],
  [n2(MARGIN.left), n2(MARGIN.right)],
);
check(
  `geometry EYEBROW_TOP ${EYEBROW_TOP} is under the rendered headline row (${n2(HEADLINE_BOTTOM)})`,
  EYEBROW_TOP > HEADLINE_BOTTOM,
  true,
);
// The three columns tiling the content width is what stops a longer metric name from
// pushing the chip past the right margin — but it is NOT checkable here. `METRIC_COL_W`
// is defined as `CONTENT_WIDTH - FIGURE_COL_W - MARK_COL_W - 2 * COL_GAP`, so adding
// the five numbers back up equals `CONTENT_WIDTH` whatever any of them is. The claim is
// asserted against the MEASURED row instead, per brand, further down — see "the three
// cells tile the measured row".

// ───────────────── the motion contract, sampled mid-reveal ─────────────────
//
// ONE BRAND, and stated rather than assumed: `REVEAL_LEAD_MS` and
// `REVEAL_STAGGER_MS` are constants in `ProofLedger` and no brand axis reaches them,
// so sampling both would measure the same two numbers twice.

const primaryIds = ROWS[VARIANTS[PRIMARY].brand].map(([id]) => `invest-row-${id}`);
await gotoSlide(PRIMARY, investRow.index, MOUNT_MS);
await page.keyboard.press("Space");
const arrival = await (async () => {
  const started = Date.now();
  while (Date.now() - started < ARRIVAL_DEADLINE_MS) {
    const frame = await page.evaluate(
      (rowIds) =>
        rowIds.map((id) => {
          const el = document.querySelector(`[data-testid="${id}"]`);
          const cs = el ? getComputedStyle(el) : null;
          return { id, opacity: cs ? parseFloat(cs.opacity) : null };
        }),
      primaryIds,
    );
    if (frame.some((r) => r.opacity > 0.02)) return { sample: frame, elapsed: Date.now() - started };
    await page.waitForTimeout(ARRIVAL_POLL_MS);
  }
  return { sample: null, elapsed: Date.now() - started };
})();
check(
  `the reveal begins within ${ARRIVAL_DEADLINE_MS}ms of the keypress, so there is a frame to sample`,
  arrival.sample != null,
  true,
);
if (arrival.sample) {
  /** A row caught BETWEEN its two frames — a partial opacity. */
  const inFlight = arrival.sample
    .filter((r) => r.opacity > 0.02 && r.opacity < 0.98)
    .map((r) => r.id.replace("invest-row-", ""));
  console.log(
    `      first row arrived ${arrival.elapsed}ms after the keypress — that frame reads ` +
      `opacity ${arrival.sample.map((r) => n2(r.opacity)).join(" ")}`,
  );
  // THE SWEEP, and it is the same claim in both motion modes: the column reveals top
  // to bottom, so the FIRST row to leave 0 is row 0 and no other. Four rows arriving
  // together would read as one flash of four rather than as a list being read, and it
  // is the stagger that says otherwise.
  check(
    "the reveal sweeps down the column — one row has left 0, and it is the first",
    arrival.sample.filter((r) => r.opacity > 0.02).map((r) => r.id),
    [primaryIds[0]],
  );
  if (REDUCED) {
    // THE CLAIM: `reduce` squashes the durations, so no row is ever caught between
    // its two frames — each is either not yet arrived or fully arrived. The stagger
    // DELAY still runs (see the header), which is why the frame below shows arrived
    // and not-yet-arrived rows side by side and nothing in between.
    check("under reduce no row is ever caught mid-transition", inFlight, []);
  } else {
    // THE POSITIVE CONTROL for the line above. If this sampler cannot catch a row in
    // flight when the transitions ARE running, the reduced run's empty list means
    // nothing at all.
    check(
      `under normal motion the same sampler catches a row in flight — ${inFlight.join(", ") || "none"}`,
      inFlight.length > 0,
      true,
    );
  }
}

// ───────────────── every brand, every pose, forward and back ─────────────────

/** Collected for the summary — the ticket asks for NUMBERS, so the numbers are the
 *  deliverable and not the booleans beside them. */
const summary = [];

for (const variant of LEADER_VARIANTS) {
  const brand = VARIANTS[variant].brand;
  const tag = variant.padEnd(12);
  console.log(`\n── ${variant} ─────────────────────────────────────────`);

  // A leader brand this script has no transcribed figures for is a FAILURE, not a
  // skip: `ROWS` is transcribed from §6.7, so a third leader brand reaching the deck
  // means somebody shipped a company's own numbers that nobody wrote down here.
  check(`${tag} · this script holds §6.7's figures for brand "${brand}"`, ROWS[brand] != null, true);
  if (ROWS[brand] == null) continue;
  const rows = ROWS[brand];
  const rowIds = rows.map(([id]) => id);
  /** Every element this slide must mount, whichever pose it is on. REQUIRED, not
   *  discovered: a gate that measures what it finds passes a missing box by
   *  measuring one fewer. */
  const REQUIRED = [
    "invest-eyebrow",
    "invest-proof-slot",
    ...rowIds.flatMap((id) => [
      `invest-row-${id}`,
      `invest-figure-${id}`,
      `invest-metric-${id}`,
      `invest-mark-${id}`,
    ]),
    "invest-attribution",
    "invest-closer",
  ];
  /** The `.fade` boxes each pose must have REVEALED, and by omission the ones it must
   *  still be holding back. The eyebrow is not here on purpose: it carries no `.fade`
   *  and stands from pose 0, which is what makes it standing. */
  const REVEALED_BY_POSE = [
    [],
    [...rowIds.map((id) => `invest-row-${id}`), "invest-attribution"],
    [...rowIds.map((id) => `invest-row-${id}`), "invest-attribution", "invest-closer"],
  ];
  const FADED = [...rowIds.map((id) => `invest-row-${id}`), "invest-attribution", "invest-closer"];

  const harvest =
    variant === PRIMARY ? primaryHarvest : await harvestDeck(page, variant, slideCount);
  const at = (name) => harvest.filter((r) => r.found.includes(name));
  check(`${tag} · the ledger composes into this deck, exactly once`, at("invest").length, 1);
  if (at("invest").length !== 1) continue;
  const index = at("invest")[0].index;

  // ── THE COMPOSED LETTERS, off a full-deck walk (§3.5) ──
  check(
    `${tag} · letters · this slide prints ${FIGURES.invest}`,
    at("invest").map((r) => r.fig),
    [FIGURES.invest],
  );
  check(
    `${tag} · letters · f8-your-agentic-os prints ${FIGURES.f8}`,
    at("f8").map((r) => r.fig),
    [FIGURES.f8],
  );
  check(
    `${tag} · letters · e12-loop-engineering prints ${FIGURES.e12}`,
    at("e12").map((r) => r.fig),
    [FIGURES.e12],
  );
  check(
    `${tag} · letters · the closer prints ${FIGURES.closer}`,
    at("closer").map((r) => r.fig),
    [FIGURES.closer],
  );
  // The cover claims no number and prints no FigLabel — the one slide in the deck
  // that must have no figure caption at all (`FigLabel` throws rather than printing
  // `FIG. A.null`).
  check(
    `${tag} · letters · the cover claims no figure, and A.1 is the deck's first`,
    [at("cover").map((r) => r.fig), at("a1").map((r) => r.fig?.startsWith("— FIG. A.1·"))],
    [[null], [true]],
  );
  // AND NOTHING ELSE IN THE DECK CLAIMS THIS SLIDE'S REFERENCE. The half a search
  // cannot make: two slides deriving D.1 would both look right on their own.
  check(
    `${tag} · letters · exactly one slide in ${slideCount} prints "D.1"`,
    harvest.filter((r) => r.fig?.startsWith("— FIG. D.1·")).map((r) => r.index),
    [index],
  );

  // ── THE WALK — 0 → 1 → 2 → 1 → 0, in ONE mount ──
  //
  // ONE MOUNT, which is the whole point: a fresh `?slide=` per pose would prove that
  // each pose renders from scratch and say nothing about what a presenter's own
  // keypresses do. `Space` advances a step, `ArrowUp` retreats one
  // (`useKeyboardNav.ts`), and `retreat` clamps into the previous SLIDE at step 0 —
  // so the backward walk stops at pose 0 and is not pressed again.
  await gotoSlide(variant, index, MOUNT_MS);

  const forward = [];
  const backward = [];
  const poseNotes = [];

  /** The signature compared across directions. COMPUTED state, not markup: the unit
   *  test already compares `innerHTML` and the failure this looks for is a pose that
   *  is structurally identical and visually stuck. */
  const signature = (state) =>
    Object.fromEntries(
      REQUIRED.map((id) => {
        const b = state.boxes[id];
        return [
          id,
          b.mounted
            ? {
                on: b.on,
                opacity: n2(b.opacity),
                translateY: n2(b.translateY),
                text: b.text,
                rect: [n2(b.rect.left), n2(b.rect.top), n2(b.rect.right), n2(b.rect.bottom)],
              }
            : { mounted: false },
        ];
      }),
    );

  async function auditPose(pose, direction) {
    const state = await measure(page, REQUIRED, [
      ...BELOW_FLOOR_TIERS,
      FLOOR_TIER,
      LUMINANCE_EXEMPT_TIER,
    ]);
    if (direction === "forward") await shot(`${variant}-pose${pose}`);

    const missing = REQUIRED.filter((id) => !state.boxes[id].mounted);
    const revealed = REVEALED_BY_POSE[pose] ?? [];
    // Every box this pose has reached resolves to a full opacity…
    const unrevealed = revealed.filter((id) => (state.boxes[id].opacity ?? 0) < 0.999);
    // …and is on its settled frame, not 8px below it.
    const unsettled = revealed.filter((id) => Math.abs(state.boxes[id].translateY ?? 0) > 0.02);
    // …and every `.fade` box it has NOT reached is still held back.
    const leaked = FADED.filter((id) => !revealed.includes(id)).filter(
      (id) => (state.boxes[id].opacity ?? 0) > 0.02,
    );
    poseNotes.push({ pose, direction, missing, unrevealed, unsettled, leaked, state });
    return state;
  }

  for (const pose of [0, 1, 2]) {
    if (pose > 0) {
      await page.keyboard.press("Space");
      await page.waitForTimeout(POSE_MS);
    }
    forward[pose] = await auditPose(pose, "forward");
  }
  for (const pose of [1, 0]) {
    await page.keyboard.press("ArrowUp");
    await page.waitForTimeout(POSE_MS);
    backward[pose] = await auditPose(pose, "backward");
  }
  backward[2] = forward[2];

  // THE DECLARED POSE COUNT, read off the NavBar's own step counter rather than
  // hardcoded — so a fourth pose added to the slide def is walked and not skipped.
  check(
    `${tag} · walk · the deck declares 3 poses for this slide, and the walk reached the last`,
    [forward[0].stepCounter, forward[2].stepCounter, backward[0].stepCounter],
    ["01 / 03", "03 / 03", "01 / 03"],
  );
  // FIVE MEASUREMENTS, one per keypress plus the mount: forward 0, 1, 2 then backward
  // 1, 0. `retreat` clamps into the PREVIOUS slide at step 0, so a third `ArrowUp`
  // would leave this slide — which is why the backward walk is two presses and this
  // asserts the walk stayed put.
  check(
    `${tag} · walk · the walk never left the slide`,
    poseNotes.map((n) => n.state.slideIndex),
    Array(5).fill(String(index)),
  );
  check(
    `${tag} · walk · every pose mounts every box it should, none missing`,
    poseNotes.filter((n) => n.missing.length).map((n) => `${n.direction} pose ${n.pose}: ${n.missing}`),
    [],
  );
  check(
    `${tag} · walk · every box a pose has reached rests at full opacity`,
    poseNotes.filter((n) => n.unrevealed.length).map((n) => `${n.direction} pose ${n.pose}: ${n.unrevealed}`),
    [],
  );
  check(
    `${tag} · walk · and on its settled frame, not the 8px below it reveals from`,
    poseNotes.filter((n) => n.unsettled.length).map((n) => `${n.direction} pose ${n.pose}: ${n.unsettled}`),
    [],
  );
  check(
    `${tag} · walk · no box arrives before its pose`,
    poseNotes.filter((n) => n.leaked.length).map((n) => `${n.direction} pose ${n.pose}: ${n.leaked}`),
    [],
  );
  // THE RE-RENDER, as a comparison rather than a spot check.
  for (const pose of [1, 0]) {
    check(
      `${tag} · walk · pose ${pose} reached backwards is the pose ${pose} reached forwards`,
      signature(backward[pose]),
      signature(forward[pose]),
    );
  }
  // And the three poses are actually three — a slide where nothing changed would
  // pass the comparison above trivially.
  check(
    `${tag} · walk · the three poses are three different frames`,
    new Set(forward.map((s) => JSON.stringify(signature(s)))).size,
    3,
  );
  // NOTHING STUCK AT POSE 0 AFTER THE WALK BACK, stated as its own assertion because
  // it is the AC's own wording and the failure a presenter actually meets.
  check(
    `${tag} · walk · back at pose 0 nothing is stuck revealed`,
    FADED.filter((id) => (backward[0].boxes[id].opacity ?? 0) > 0.02),
    [],
  );
  check(
    `${tag} · walk · back at pose 0 the standing eyebrow is still standing`,
    [backward[0].boxes["invest-eyebrow"].opacity, backward[0].boxes["invest-eyebrow"].text],
    [1, EYEBROW[brand]],
  );

  // ── ZERO SMIL, at every pose, in both directions ──
  check(
    `${tag} · motion · zero SMIL nodes in the document at every pose`,
    poseNotes.map((n) => n.state.smil),
    Array(poseNotes.length).fill(0),
  );
  check(
    `${tag} · motion · and no <svg> under this slide's own boxes, which is what closes the question`,
    poseNotes.map((n) => n.state.slideSvg),
    Array(poseNotes.length).fill(0),
  );

  // ── THE COPY (§6.7, AC) ──
  const p2 = forward[2];
  check(`${tag} · copy · the headline states the premise`, p2.headline, HEADLINE);
  check(`${tag} · copy · the eyebrow names whose proof this is`, p2.boxes["invest-eyebrow"].text, EYEBROW[brand]);
  check(
    `${tag} · copy · all ${rows.length} figures render verbatim, in order`,
    rowIds.map((id) => p2.boxes[`invest-figure-${id}`].text),
    rows.map(([, figure]) => figure),
  );
  check(
    `${tag} · copy · every figure carries its epistemic mark, on the row`,
    rowIds.map((id) => p2.boxes[`invest-mark-${id}`].text),
    rows.map(([, , mark]) => mark),
  );
  check(
    `${tag} · copy · every row also names what it measures`,
    rowIds.filter((id) => (p2.boxes[`invest-metric-${id}`].text ?? "").trim() === ""),
    [],
  );
  const attribution = p2.boxes["invest-attribution"].text ?? "";
  check(
    `${tag} · copy · the attribution names ${ATTRIBUTION_MUST_NAME[brand].join(" · ")} and ends in the negation`,
    [
      ATTRIBUTION_MUST_NAME[brand].filter((s) => !attribution.includes(s)),
      attribution.includes(NEGATION),
    ],
    [[], true],
  );
  // THE NEGATIVE, over everything the stage says, at every pose and in both
  // directions. POSITIVE CONTROL FIRST — before the strip the vocabulary IS there,
  // inside the negation — so a slide that said nothing about provenance at all could
  // not pass this by being silent.
  check(
    `${tag} · copy · the negation "${NEGATION}" is on the stage at the poses that argue the figures`,
    poseNotes.filter((n) => n.pose > 0).map((n) => AUDIT_WORDS.test(n.state.stageText)),
    poseNotes.filter((n) => n.pose > 0).map(() => true),
  );
  check(
    `${tag} · copy · and with that one phrase removed, no rendered string claims audited / independent / verified status`,
    poseNotes
      .map((n) => ({ n, hit: n.state.stageText.split(NEGATION).join(" · ").match(AUDIT_WORDS) }))
      .filter((x) => x.hit)
      .map((x) => `${x.n.direction} pose ${x.n.pose}: ${x.hit[0]}`),
    [],
  );

  // ── THE TEXT, MEASURED — no run wraps or spills its cell ──
  //
  // Every pose, both directions, because a run only exists to be measured once its
  // box is on the stage and the two cells this exists for are only filled from pose 1.
  const wrapped = [];
  const spilling = [];
  const overflowing = [];
  const pastMargin = [];
  const sizeFloor = [];
  const tierFloor = [];
  const underLuminance = [];
  const auditedByPose = [];
  for (const note of poseNotes) {
    // ON THE STAGE, by the effective opacity the room sees — not by a list of which
    // box belongs to which pose. A run inside a `.fade` that has not been switched on
    // is invisible, so its geometry is not what a projector shows and the assertions
    // that own it are the reveal ones above. Deriving this from the measurement rather
    // than from `REVEALED_BY_POSE` also means the audit cannot be fooled by a pose map
    // that has drifted from the component.
    const visible = note.state.runs.filter((r) => r.effOpacity > 0.5);
    auditedByPose.push(visible.length);
    const where = `${note.direction} pose ${note.pose}`;
    for (const r of visible) {
      const label = `${where} · ${r.owner ?? r.tag} "${r.text}"`;
      // ONE LINE. Every string this slide prints is a one-liner by design, and the
      // 380px figure cell is the one place a wrap is invisible to every other channel.
      if (r.lines !== 1) wrapped.push(`${label} — ${r.lines} lines`);
      // The element's own horizontal overflow. Vacuous on an inline box (both are 0
      // by definition), so it is skipped there rather than passed.
      if (r.blockish && r.scrollW > r.clientW) {
        overflowing.push(`${label} — scrollWidth ${r.scrollW} > clientWidth ${r.clientW}`);
      }
      // The TEXT's own box against its cell's CONTENT edge. This is what catches type
      // that has eaten its own padding and stopped 0px from a border.
      if (r.cell && r.textBox.right > r.cell.right + 1) {
        spilling.push(`${label} — +${n2(r.textBox.right - r.cell.right)}px past its cell`);
      }
      if (r.textBox.right > MARGIN.right + 1 || r.textBox.left < MARGIN.left - 1) {
        pastMargin.push(`${label} — ${n2(r.textBox.left)}…${n2(r.textBox.right)}`);
      }
      // gh#50's floors.
      const floor = r.mono ? MONO_FLOOR : PROSE_FLOOR;
      if (r.size < floor) sizeFloor.push(`${label} — ${r.size}px ${r.mono ? "mono" : "prose"} < ${floor}`);
      if (BELOW_FLOOR_COLORS.includes(r.color)) {
        tierFloor.push(`${label} — ${r.color} is ${BELOW_FLOOR_TIERS[BELOW_FLOOR_COLORS.indexOf(r.color)]}`);
      }
      if (r.luminance < FLOOR_LUMINANCE - 0.001) {
        underLuminance.push({ label, color: r.color, owner: r.owner, keyword: r.keyword });
      }
    }
  }

  check(`${tag} · text · no run wraps — every string on this slide is one line`, wrapped, []);
  check(`${tag} · text · no element overflows its own box (scrollWidth vs clientWidth)`, overflowing, []);
  check(`${tag} · text · no run spills past its cell's content edge`, spilling, []);
  check(`${tag} · text · no run crosses the measured ${n2(MARGIN.left)}…${n2(MARGIN.right)} margins`, pastMargin, []);
  check(`${tag} · floors · no run below ${MONO_FLOOR}px mono / ${PROSE_FLOOR}px prose`, sizeFloor, []);
  check(`${tag} · floors · no run resolves to a tier below ${FLOOR_TIER}`, tierFloor, []);
  // The luminance gate, and its one named exception (see BELOW_FLOOR_TIERS' comment).
  check(
    `${tag} · floors · everything under ${FLOOR_TIER}'s luminance is exactly ${LUMINANCE_EXEMPT_TIER}`,
    [...new Set(underLuminance.map((v) => v.color))].filter(
      (c) => c !== TIERS[LUMINANCE_EXEMPT_TIER],
    ),
    [],
  );
  console.log(
    `      runs audited per pose (fwd 0,1,2 · back 1,0): ${auditedByPose.join(", ")}\n` +
      `      under the luminance floor, all ${LUMINANCE_EXEMPT_TIER}: ` +
      `${[...new Set(underLuminance.map((v) => v.owner ?? (v.keyword ? "em.kw" : v.label)))].join(", ") || "none"}`,
  );
  // The audit's own positive control: every check above it is a "found nothing", so a
  // walk that visited no runs would report a clean slide.
  check(
    `${tag} · floors · the audit measured text at every pose`,
    auditedByPose.every((n) => n > 6),
    true,
  );

  // ── THE LAYOUT, at every pose ──
  const painted = [];
  for (const note of poseNotes) {
    for (const id of REQUIRED) {
      const b = note.state.boxes[id];
      // A box still held back is invisible, so its geometry is not what the room
      // sees; the poses that show it are where it is measured.
      if (FADED.includes(id) && !(REVEALED_BY_POSE[note.pose] ?? []).includes(id)) continue;
      painted.push({ id, pose: note.pose, direction: note.direction, ...b.rect });
    }
  }
  const lowest = painted.reduce((a, b) => (b.bottom > a.bottom ? b : a));
  const clearance = NAV_TOP - lowest.bottom;
  check(
    `${tag} · CLEARANCE · the lowest painted box (${lowest.id}) bottom ${n2(lowest.bottom)} is above the measured .nav-zone top ${n2(NAV_TOP)} — ${n2(clearance)}px`,
    lowest.bottom < NAV_TOP,
    true,
  );
  check(
    `${tag} · layout · every painted box, at every pose, is above the hover band`,
    painted.filter((b) => b.bottom >= NAV_TOP).map((b) => `${b.direction} pose ${b.pose} ${b.id} bottom ${n2(b.bottom)}`),
    [],
  );
  check(
    `${tag} · layout · every painted box is inside the measured ${n2(MARGIN.left)}…${n2(MARGIN.right)} margins`,
    painted
      .filter((b) => b.left < MARGIN.left - SUBPIXEL || b.right > MARGIN.right + SUBPIXEL)
      .map((b) => `${b.direction} pose ${b.pose} ${b.id} ${n2(b.left)}…${n2(b.right)}`),
    [],
  );
  check(
    `${tag} · layout · every painted box starts below the rendered headline row (${n2(HEADLINE_BOTTOM)})`,
    painted.filter((b) => b.top < HEADLINE_BOTTOM).map((b) => `${b.direction} pose ${b.pose} ${b.id} top ${n2(b.top)}`),
    [],
  );
  // NO TWO ROWS TOUCH, and the closer does not touch the slot. Checked at pose 2,
  // where everything is on the stage at once.
  const rowBoxes = rowIds.map((id) => ({ id, ...p2.boxes[`invest-row-${id}`].rect }));
  const collisions = [];
  for (let i = 0; i < rowBoxes.length; i++) {
    for (let j = i + 1; j < rowBoxes.length; j++) {
      if (overlaps(rowBoxes[i], rowBoxes[j])) collisions.push(`${rowBoxes[i].id} × ${rowBoxes[j].id}`);
    }
  }
  check(`${tag} · layout · no two rows overlap`, collisions, []);
  // AND NO TWO CELLS INSIDE A ROW, which is the failure a chip too wide for its cell
  // actually produces: the chip is right-aligned to the margin, so it overflows
  // LEFTWARD into the metric column and stays inside the stage's margins the whole
  // way. Verified by injecting exactly that defect — a 120px `MARK_COL_W` — which the
  // margin check and the spill check both pass and this one does not.
  const cellCollisions = [];
  for (const id of rowIds) {
    const cells = ["figure", "metric", "mark"].map((role) => ({
      id: `${role} ${id}`,
      ...p2.boxes[`invest-${role}-${id}`].rect,
    }));
    for (let i = 0; i < cells.length; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        if (overlaps(cells[i], cells[j])) cellCollisions.push(`${cells[i].id} × ${cells[j].id}`);
      }
    }
  }
  check(`${tag} · layout · no two cells inside a row overlap`, cellCollisions, []);
  // THE TILING, AS THE BROWSER DREW IT. This is the falsifiable form of the claim
  // `geometry.ts` makes by deriving `METRIC_COL_W` from the other two cells: the figure
  // cell starts on the row's own left edge, the metric cell starts one `COL_GAP` past
  // the figure's right edge, and what is left between the metric's right edge and the
  // row's is `MARK_COL_W`. Cells are flex items, so declared widths that overflowed the
  // row would be SHRUNK to fit and would still add up — only a measurement can say the
  // browser had nothing to shrink.
  const tiling = rowIds
    .map((id) => {
      const row = p2.boxes[`invest-row-${id}`].rect;
      const fig = p2.boxes[`invest-figure-${id}`].rect;
      const met = p2.boxes[`invest-metric-${id}`].rect;
      const off = (a, b) => Math.abs(a - b) > SUBPIXEL;
      if (off(fig.width, FIGURE_COL_W)) {
        return `${id}: figure cell is ${n2(fig.width)}px wide, FIGURE_COL_W is ${FIGURE_COL_W}`;
      }
      if (off(met.width, METRIC_COL_W)) {
        return `${id}: metric cell is ${n2(met.width)}px wide, METRIC_COL_W is ${METRIC_COL_W}`;
      }
      if (off(fig.left, row.left)) {
        return `${id}: figure cell starts at ${n2(fig.left)}, the row at ${n2(row.left)}`;
      }
      if (off(met.left, fig.right + COL_GAP)) {
        return `${id}: metric cell starts at ${n2(met.left)}, one gap past the figure is ${n2(fig.right + COL_GAP)}`;
      }
      if (off(row.right - (met.right + COL_GAP), MARK_COL_W)) {
        return `${id}: ${n2(row.right - (met.right + COL_GAP))}px left for the chip cell, MARK_COL_W is ${MARK_COL_W}`;
      }
      return null;
    })
    .filter(Boolean);
  check(
    `${tag} · layout · the three cells tile the measured row — ${FIGURE_COL_W} + ${COL_GAP} + ${METRIC_COL_W} + ${COL_GAP} + ${MARK_COL_W} = ${CONTENT_WIDTH}`,
    tiling,
    [],
  );
  check(
    `${tag} · layout · the closer sits clear of the slot the rows fill`,
    overlaps(p2.boxes["invest-proof-slot"].rect, p2.boxes["invest-closer"].rect),
    false,
  );
  check(
    `${tag} · layout · the attribution is inside the slot it hangs off`,
    [
      p2.boxes["invest-attribution"].rect.bottom <= p2.boxes["invest-proof-slot"].rect.bottom + SUBPIXEL,
      p2.boxes["invest-attribution"].rect.top >
        p2.boxes[`invest-row-${rowIds[rowIds.length - 1]}`].rect.bottom,
    ],
    [true, true],
  );

  // ── THE TWO CELLS THIS SCRIPT EXISTS FOR ──
  const figureRuns = p2.runs.filter((r) => r.owner?.startsWith("invest-figure-"));
  const chipRuns = p2.runs.filter((r) => r.owner?.startsWith("invest-mark-"));
  const widestFigure = figureRuns.reduce((a, b) => (b.textBox.width > a.textBox.width ? b : a));
  const widestChip = chipRuns.reduce((a, b) => (b.textBox.width > a.textBox.width ? b : a));
  const chipBox = p2.boxes[`invest-mark-${widestChip.owner.replace("invest-mark-", "")}`];
  // THE CHIP'S CELL, from the measured row rather than from the module: the cell is an
  // anonymous flex box with no testid, and its right edge is the row's (the chip is
  // right-aligned to the margin so the marks form a column of their own). Its LEFT
  // edge matters as much — an over-wide chip keeps its right edge on the margin and
  // grows leftward, which is the one direction the margin check cannot see.
  const chipRow = p2.boxes[`invest-row-${widestChip.owner.replace("invest-mark-", "")}`].rect;
  const chipCellRight = chipRow.right;
  const chipCellLeft = chipRow.right - MARK_COL_W;
  check(
    `${tag} · CELLS · the widest figure "${widestFigure.text}" is ${n2(widestFigure.textBox.width)}px in the ${FIGURE_COL_W}px cell — ${n2(FIGURE_COL_W - widestFigure.textBox.width)}px spare, one line`,
    [widestFigure.textBox.width <= FIGURE_COL_W, widestFigure.lines],
    [true, 1],
  );
  check(
    `${tag} · CELLS · the chip "${widestChip.text}" is ${n2(chipBox.rect.width)}px including its border and padding, inside the ${MARK_COL_W}px cell — ${n2(MARK_COL_W - chipBox.rect.width)}px spare, one line`,
    [
      chipBox.rect.width <= MARK_COL_W,
      widestChip.lines,
      chipBox.rect.right <= chipCellRight + SUBPIXEL,
      chipBox.rect.left >= chipCellLeft - SUBPIXEL,
    ],
    [true, 1, true, true],
  );

  // ── THE MODULE'S NUMBERS, HELD AGAINST THE STAGE ──
  const drift = [
    ...rowIds.map((id, i) => {
      const r = p2.boxes[`invest-row-${id}`].rect;
      const claimedTop = SLOT_TOP + rowOffset(i);
      return Math.abs(r.top - claimedTop) > SUBPIXEL || Math.abs(r.height - ROW_HEIGHT) > SUBPIXEL
        ? `row ${id} at ${n2(r.top)}×${n2(r.height)}, geometry says ${claimedTop}×${ROW_HEIGHT}`
        : null;
    }),
    (() => {
      const r = p2.boxes["invest-attribution"].rect;
      const claimedTop = SLOT_TOP + attributionOffset(rows.length);
      return Math.abs(r.top - claimedTop) > SUBPIXEL ||
        Math.abs(r.height - ATTRIBUTION_HEIGHT) > SUBPIXEL
        ? `attribution at ${n2(r.top)}×${n2(r.height)}, geometry says ${claimedTop}×${ATTRIBUTION_HEIGHT}`
        : null;
    })(),
    (() => {
      const r = p2.boxes["invest-proof-slot"].rect;
      return Math.abs(r.top - SLOT_TOP) > SUBPIXEL || Math.abs(r.height - SLOT_HEIGHT) > SUBPIXEL
        ? `slot at ${n2(r.top)}×${n2(r.height)}, geometry says ${SLOT_TOP}×${SLOT_HEIGHT}`
        : null;
    })(),
    Math.abs(p2.boxes["invest-closer"].rect.top - CLOSER_TOP) > SUBPIXEL
      ? `closer at ${n2(p2.boxes["invest-closer"].rect.top)}, geometry says ${CLOSER_TOP}`
      : null,
    Math.abs(p2.boxes["invest-eyebrow"].rect.top - EYEBROW_TOP) > SUBPIXEL
      ? `eyebrow at ${n2(p2.boxes["invest-eyebrow"].rect.top)}, geometry says ${EYEBROW_TOP}`
      : null,
  ].filter(Boolean);
  check(`${tag} · cross-check · every box lands where geometry.ts puts it, to 1/64px`, drift, []);
  check(
    `${tag} · cross-check · this brand's ${rows.length} rows are inside ROW_CAPACITY ${ROW_CAPACITY}`,
    rows.length <= ROW_CAPACITY,
    true,
  );
  // NAV_ZONE_CLEARANCE is derived from `CLOSER_TOP + CLOSER_HEIGHT`, and
  // `CLOSER_HEIGHT` is 34 — the integer above 26px × 1.3 = 33.8. So the module's
  // number is 0.2px CONSERVATIVE against the measurement, which is the direction it
  // has to be wrong in: a module that promised more clearance than the stage draws is
  // the failure, and a module that promises slightly less is a rounded line height.
  check(
    `${tag} · cross-check · geometry NAV_ZONE_CLEARANCE ${NAV_ZONE_CLEARANCE} does not over-promise the measured ${n2(clearance)}px`,
    [NAV_ZONE_CLEARANCE <= clearance + SUBPIXEL, clearance - NAV_ZONE_CLEARANCE < 1],
    [true, true],
  );
  check(
    `${tag} · cross-check · the rendered closer is no taller than CLOSER_HEIGHT ${CLOSER_HEIGHT}`,
    p2.boxes["invest-closer"].rect.height <= CLOSER_HEIGHT + SUBPIXEL,
    true,
  );

  // ── THE THESIS, ACROSS THREE SLIDES OF THIS COMPOSED DECK (§4.5) ──
  //
  // Read off the three RENDERED slides and compared to each other. The unit test
  // compares the three constants, which cannot see a carrier that renders something
  // else; this cannot see a constant at all.
  const closerText = p2.boxes["invest-closer"].text;

  const a1Index = at("a1")[0]?.index;
  check(`${tag} · thesis · A.1 is in this deck`, a1Index != null, true);
  // A.1's tagline is on a mount timer at 220ms.
  await gotoSlide(variant, a1Index, MOUNT_MS + 600);
  const a1Pose0 = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="a1-tagline"]');
    return el ? { text: el.textContent, opacity: parseFloat(getComputedStyle(el).opacity) } : null;
  });
  // Then A.1's own pose 2, where the agenda column is up and the `invest` row prints
  // its letter. Walked forward from pose 0 for the same reason the pose walk is: this
  // is what the presenter's keypresses do.
  //
  // WAITED FOR, NOT BUDGETED. A.1's right column is gated behind `RIGHT_REVEAL_DELAY`
  // (650ms after the pose change) plus its own 400ms transition, and — unlike this
  // slide's reveal — that chain is A.1's business and can be re-timed by the ticket
  // that owns it. A fixed budget here made this assertion FLAKY: one run in four came
  // back with the column at opacity 0 and the row already in the DOM, which reads as
  // "the agenda does not print its letter" and is actually "this harness measured
  // early". So it polls for the reveal and fails with what it last saw, the same shape
  // as the arrival sampler above.
  for (const press of [1, 2]) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(press === 1 ? 400 : POSE_MS);
  }
  await page
    .waitForFunction(
      () => {
        const col = document.querySelector('[data-testid="a1-questions-column"]');
        return col != null && parseFloat(getComputedStyle(col).opacity) > 0.999;
      },
      { timeout: 6000 },
    )
    .catch(() => {});
  await shot(`${variant}-a1-agenda`);
  const a1Pose2 = await page.evaluate(() => ({
    pointers: [...document.querySelectorAll('[data-testid="a1-question-pointer"]')].map(
      (e) => e.textContent,
    ),
    columnOpacity: parseFloat(
      getComputedStyle(document.querySelector('[data-testid="a1-questions-column"]')).opacity,
    ),
    // Printed with the failure so a flake and a defect cannot be confused: "02 / 03"
    // with the column dark is a reveal this harness measured early, "01 / 03" is a
    // keypress that never landed.
    step: document.querySelector(".nav-group-count")?.textContent ?? null,
  }));

  const coverIndex = at("cover")[0]?.index;
  check(`${tag} · thesis · the cover is in this deck`, coverIndex != null, true);
  // The cover's tagline lands at 1100ms on its own mount timer.
  await gotoSlide(variant, coverIndex, MOUNT_MS + 1200);
  const cover = await page.evaluate(() => {
    const root = document.querySelector('[data-testid="slide-title"]');
    const ps = [...root.querySelectorAll("p")];
    return {
      count: ps.length,
      text: ps[0]?.textContent ?? null,
      opacity: ps[0] ? parseFloat(getComputedStyle(ps[0]).opacity) : null,
    };
  });
  // ONE `<p>` on the cover, asserted so "the tagline" is not a guess about which
  // paragraph was meant. The headline is an `<h1>` (`DisplayTitle`) and the two
  // chips are `<div>`s, so the cover's only paragraph is its tagline.
  check(`${tag} · thesis · the cover renders exactly one paragraph, revealed`, [cover.count, cover.opacity], [1, 1]);

  /** THE OPENER, DERIVED FROM THE COVER'S OWN RENDERED TEXT — its first sentence.
   *  Not transcribed and not imported: §4.5's claim is that the cover AUTHORED the
   *  sentence and the other two quote it, so the cover's own rendering is the thing
   *  to compare against. */
  const opener = (cover.text ?? "").match(/^.*?\.(?=\s|$)/)?.[0] ?? null;
  check(
    `${tag} · thesis · the cover's tagline opens on a whole sentence — "${opener}"`,
    [opener != null, (opener ?? "").length > 12, (opener ?? "").includes(" ")],
    [true, true, true],
  );
  check(
    `${tag} · thesis · this slide's closer is A.1's tagline, byte for byte — "${closerText}"`,
    closerText,
    a1Pose0?.text,
  );
  check(`${tag} · thesis · and A.1 prints it revealed, not merely mounted`, a1Pose0?.opacity, 1);
  check(
    `${tag} · thesis · both begin with the sentence the cover begins with`,
    [closerText?.startsWith(opener), a1Pose0?.text?.startsWith(opener)],
    [true, true],
  );
  // AND THE THREE ARE NOT ONE STRING. §4.5 has the cover elaborate past the opener,
  // so a run where all three were byte-identical would mean the cover had lost its
  // own second clause — which the assertion above would happily pass.
  check(
    `${tag} · thesis · the cover elaborates past the opener rather than repeating the closer`,
    [cover.text !== closerText, (cover.text ?? "").length > (closerText ?? "").length],
    [true, true],
  );
  // A.1'S THIRD AGENDA ROW, which exists only because `invest` started owning a
  // slide (this ticket authored no A.1 copy at all).
  check(
    `${tag} · letters · A.1's agenda prints "${A1_INVEST_ROW}", revealed (A.1 at step ${a1Pose2.step})`,
    [a1Pose2.pointers.filter((p) => p.includes("WHY INVEST")), a1Pose2.columnOpacity],
    [[A1_INVEST_ROW], 1],
  );

  summary.push({
    variant,
    rows: rows.length,
    lowest,
    clearance,
    attributionBottom: p2.boxes["invest-attribution"].rect.bottom,
    widestFigure: { text: widestFigure.text, width: widestFigure.textBox.width },
    widestChip: { text: widestChip.text, textWidth: widestChip.textBox.width, boxWidth: chipBox.rect.width },
    smil: poseNotes.map((n) => n.state.smil),
    audited: auditedByPose,
  });

  console.log(`\n      ${variant} — the ledger, measured in stage coordinates (pose 2)`);
  for (const id of REQUIRED) {
    const r = p2.boxes[id].rect;
    console.log(
      `      ${id.padEnd(34)} x ${String(n2(r.left)).padStart(7)}…${String(n2(r.right)).padStart(7)}  y ${String(n2(r.top)).padStart(6)}…${String(n2(r.bottom)).padStart(6)}`,
    );
  }
}

// ───────────────── the console ─────────────────

if (noise.length) for (const n of noise) console.log(`      console · ${n}`);
check("console clean across every brand, every pose and both directions", noise, []);

// ───────────────── the deliverable ─────────────────

console.log(`\n      THE MEASURED NUMBERS${REDUCED ? " (reduced motion)" : ""}`);
console.log(
  `      .nav-zone top ${n2(NAV_TOP)} — measured off the element, not read from geometry.ts`,
);
for (const s of summary) {
  console.log(
    `      ${s.variant.padEnd(12)} ${s.rows} rows · lowest painted box ${s.lowest.id} bottom ` +
      `${n2(s.lowest.bottom)} → CLEARANCE ${n2(s.clearance)}px · attribution bottom ${n2(s.attributionBottom)}\n` +
      `                   widest figure "${s.widestFigure.text}" ${n2(s.widestFigure.width)}px / ${FIGURE_COL_W}px cell · ` +
      `chip "${s.widestChip.text}" text ${n2(s.widestChip.textWidth)}px, box ${n2(s.widestChip.boxWidth)}px / ${MARK_COL_W}px cell\n` +
      `                   SMIL per pose (fwd 0,1,2 · back 1,0) ${s.smil.join(",")} · runs audited ${s.audited.join(",")}`,
  );
}

console.log(`\n${failures ? `${failures} FAILURE(S)` : "all checks passed"} · shots: ${OUT}`);
await browser.close();
process.exit(failures ? 1 : 0);
