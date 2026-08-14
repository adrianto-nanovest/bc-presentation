// ⚠ SUPERSEDED, 2026-08-13, AND KEPT AS THE RECORD OF WHAT gh#55 SHIPPED.
//
// The nine-pose focus walk this file checks no longer exists. C.1 was reworked to two
// poses: the six decision beats became hover and pin (`resolveFocus` in
// `src/slides/leader-shape/walk.ts`), the closer became a recap that lights all six
// pillars at once, and `steps` went from 9 to 2. This harness WILL FAIL against the
// current slide — that is the harness being out of date, not the slide being broken.
//
// The live harness is `scripts/c1-figure-verify.mjs`, which carries #55's two
// load-bearing claims forward in their stronger form: the no-dim comparison now runs
// against a pointer rather than a pose, and the focused-floor measurement is taken at
// the recap, where all six pillars grow at once and which is `canonicalPose` — so the
// grown figure is what the PDF prints rather than only what a live walk reaches.
//
// Nothing below has been edited: the point of leaving it is that #55's acceptance
// criteria and the numbers they were met with stay readable.
//
// gh#55's browser evidence — THE FOCUS WALK, both leader decks, all nine poses.
//
// `tests/unit/shape-agentic-org.test.tsx` owns everything jsdom can see, and
// `src/slides/leader-shape/walk.ts` is a pure function of the pose, so a node test
// can prove the whole pose → pillar map without rendering anything. What jsdom
// CANNOT do is resolve a `var()`, place a rect, or paint a `box-shadow` — and every
// claim below turns on one of those three. This script owns them, and they are the
// two the issue's acceptance criteria name as "measured on the rendered slide":
//
//   1. THE FOCUSED FLOOR — the ticket's headline risk (§7.1: "the lowest satellite
//      sits at y ≈ 620 … close to the NavBar hover zone, AND IT GROWS ON FOCUS.
//      Re-check clearance when rebuilt."). gh#54 measured the RESTING pose and left
//      8px of `FOCUS_GROWTH_RESERVE` for this ticket to spend. This measures the
//      pose that spends it.
//
//      AND IT ADDS THE HALO BY HAND, because `getBoundingClientRect` cannot see a
//      `box-shadow` — a spread is outside the box model entirely, so the rendered
//      figure cannot tell anyone where its own outer edge is (`FOCUS_HALO_WIDTH` in
//      `../src/slides/leader-shape/geometry.ts` records exactly this). A harness
//      that measured the rect and stopped would report a clearance 4px larger than
//      the projector shows, which is precisely how a halo lands inside the NavBar's
//      band with a passing measurement. So the halo is READ OFF THE PAINTED
//      `box-shadow` — the computed string is parsed for its spread, and the offsets
//      and blur are asserted to be 0 — rather than assumed to be the constant's 4.
//      The one number in this file that a browser genuinely cannot produce is
//      therefore produced from what the browser DID paint, and the constant is then
//      held against it.
//
//   2. NO-DIM, AS THE CASCADE RESOLVES IT (§7.1 — attention is bought with added
//      light, never subtracted; the AC: "no inactive pillar loses border, label or
//      luminance at any beat"). The unit test can only compare the inline
//      `var(--copper-600)` the component wrote, which proves nothing about what a
//      room sees. This compares nine COMPUTED values per inactive pillar — border
//      colour, background, halo, opacity, label colour, icon colour, spoke stroke,
//      spoke width, spoke opacity — at every one of the six beats against the same
//      values measured at pose 1, string for string. Five of six pillars must be
//      unchanged BYTE FOR BYTE by a beat that is about the sixth.
//
//      AND THE OTHER HALF, which is the half that makes the rule a rule rather than
//      a freeze: the ACTIVE pillar must gain LIGHT, computed as relative luminance
//      off the parsed rgb. A slide could pass the no-dim check by changing nothing
//      at all.
//
//   3. THE CLOSER IN THE RIGHT COLUMN (the AC, verbatim). §7.1 forced it out of the
//      bottom strip because the strip is occupied by a pillar that grows on focus,
//      and "renders in the right column" is a claim about two rects and a margin.
//
//   4. THE COLUMN NEVER BLINKS. `showsWalkColumn` in `walk.ts` exists because the
//      prototype drew the beats in one bordered panel and the closer in a SECOND
//      one at the same left edge, so its left hairline faded out and back in at the
//      closer's pose. ONE element across poses 2…8 is a DOM fact a node test can
//      assert; that its rect and its hairline never move is not.
//
//   5. `8 → 0` IN A REAL ENGINE (the AC: "no beat leaves a pillar stuck in its
//      focused state"). `focusedPillarIndex` is a function of the pose alone, so the
//      unit test proves the ARITHMETIC cannot get stuck. What it cannot prove is
//      that the ENGINE does not: a `transition` on a property React stops declaring
//      keeps painting the old value, and the walk's release is exactly that shape.
//      So the walk is stepped up with the deck's own key and back down with the
//      deck's own reverse key, and every pose on the way down is measured again —
//      including a second, independent reading of the focused floor at the beat that
//      is at risk, arrived at from ABOVE rather than from below.
//
//   6. REDUCED MOTION, ALL NINE POSES. Zero SMIL nodes is checkable in jsdom; that
//      every pose then RESTS ON ITS FINISHED FRAME is not, because the global rule
//      in `globals.css` squashes a duration the browser has to actually run. The
//      positive control gh#54 established is kept and pointed at the focus change
//      instead of the arrival: that rule squashes `transition-duration` and says
//      NOTHING about `transition-delay`, the focus properties in `PillarOrbit.tsx`
//      deliberately carry no delay, so a focus change under `reduce` must be
//      INSTANT — and under normal motion the same sampler must catch it in flight,
//      or the reduced run's "no intermediate frame" means nothing at all.
//
// WHAT THIS SCRIPT DOES NOT RE-PROVE. gh#54's own claims — the resting ring's
// clearance, the six boxes against `pillarBox(i)`, the hub's two lines, F.8's leader
// closer — are `scripts/gh54-verify.mjs`'s and still pass there. Poses 0 and 1 are
// asserted here only as far as this ticket could have broken them (the column must
// be closed at both, the ring must be unlit at both, and pose 1 is the baseline
// every no-dim comparison is made against).
//
// ONE CLAIM IS MADE TWICE, AND THAT IS DELIBERATE: the C.1 → C.2 handover. gh#54
// proved it by pressing the forward key ONCE FROM POSE 1, which was one step past
// the last pose only while the slide had `steps: 2`; nine steps made that press land
// on the first beat instead, and it failed. THE FIX WENT INTO THAT SCRIPT, in the
// same change as this file — it now presses until the slide index changes, so it
// holds for any step budget (`scripts/gh54-verify.mjs`, the `SPILL_LIMIT` loop) and
// passes again. This file re-makes the handover anyway, from the pose it can name as
// last and with the RETREAT back into the closer that gh#54 has no reason to walk.
// Two harnesses, two routes to one keypress: the duplication is what would have
// caught the stale assumption a ticket earlier.
//
// THE STAGE'S SCALE, handled exactly as gh#54 handles it: `useViewportScale`
// CSS-transforms `.stage-wrap` by `min(w/1280, h/720)`, so this reads that matrix,
// ASSERTS it is 1:1 at 1280×720, and converts every rect through the stage's own
// origin and scale anyway. Every number printed below is a STAGE coordinate.
//
// AND THE FLOOR IS MEASURED, NOT READ — gh#54's rule, kept, because it is the only
// rule that makes any of this evidence. The floor is `.nav-zone`'s own bounding box,
// not `NAV_ZONE_TOP`. The side margins are `.fig-label`'s rect, not `SIDE_MARGIN`.
// The column's left edge is `shape-walk-column`'s rect, not `WALK_COLUMN.left`. The
// eye level is the column's own padding-box centre, not `HUB.y`. The lowest pillar
// is SCANNED off the rendered ring, not read from `LOWEST_PILLAR_INDEX`. Every
// constant this file imports is then held against the measurement, in that
// direction only — a harness that reads the number it is checking proves only that
// the number equals itself.
//
// `walk.ts` IS NOT IMPORTED, and that is a deliberate deviation from the
// cross-check pattern above. Two reasons, one practical and one methodological:
// bare Node cannot resolve it (its `import … from "./content"` is extensionless, so
// type stripping fails on the specifier — vitest resolves it, `node` does not), and
// the pose numbers are the one thing the ISSUE states in full ("steps: 9", six
// beats, the closer last). So `FIRST_DECISION_POSE` and the pillar table below are
// transcribed from the AC as second copies — with `CLOSER_POSE` and `STEP_COUNT`
// derived from them here, exactly as the module derives its own — on gh#53's rule: a
// harness that imports the map it asserts proves only that the module equals itself.
//
// Modelled on `scripts/gh54-verify.mjs` and failing the same way: every assertion
// prints `ok` / `FAIL` and a failure exits 1, so this is runnable from a gate and
// not only readable by a human.
//
// Usage:
//   node scripts/gh55-verify.mjs                        # berau-leader first
//   node scripts/gh55-verify.mjs --variant=gems-leader
//   node scripts/gh55-verify.mjs --reduced
//
// `--variant` PICKS THE ORDER, NOT THE SET — gh#54's semantics, unchanged. The
// figure ships to BOTH leader decks, so both are always walked; the flag decides
// which one goes first and which one the one-off structural checks (the stage's
// scale, the mid-flight motion sample) run against. Default `berau-leader`. A
// standard variant is not silently skipped: it exits 1 saying the deck composes no
// `shape` run.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";
// The brand and deck-set table — plain data with no imports, so bare Node's type
// stripping resolves it standalone, and WHICH variants are leader decks stays its
// answer.
import { VARIANTS } from "../src/deck-variants.ts";
// The module under test. Imported for CROSS-CHECKS ONLY: every claim below is
// asserted against a measured rect first, and these constants are then held against
// that measurement. Nothing here is used as the floor, the margin, the column edge,
// the eye level or the halo.
import {
  FOCUSED_LOWEST_PILLAR_BOTTOM,
  FOCUSED_MARGIN_INTRUSION,
  FOCUSED_NAV_ZONE_CLEARANCE,
  FOCUSED_OUTERMOST_LEFT,
  FOCUSED_OUTERMOST_RIGHT,
  FOCUSED_WALK_COLUMN_GAP,
  FOCUS_GROWTH_RESERVE,
  FOCUS_GROWTH_SPENT,
  FOCUS_HALO_WIDTH,
  FOCUS_SCALE,
  HUB,
  LOWEST_PILLAR_INDEX,
  NAV_ZONE_TOP,
  SIDE_MARGIN,
  WALK_COLUMN,
} from "../src/slides/leader-shape/geometry.ts";

const USAGE = [
  "Usage: node scripts/gh55-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>]",
  "",
  `  --variant=<id>   Leader deck to walk FIRST. Default: berau-leader. Ids: ${VARIANT_IDS.join(", ")}`,
  "                   Both leader decks are always walked; a standard deck exits 1.",
  "  --reduced        Run under `prefers-reduced-motion: reduce`.",
  "  --out=<dir>      Where to write the shots. Default: /tmp/gh55",
  "",
  "  DECK_URL         Base url to render. Default: http://localhost:5173",
].join("\n");

const { variant: parsedVariant, flags, values } = parseVariantArgOrExit(
  process.argv.slice(2),
  USAGE,
  { booleans: ["reduced"], values: ["out"] },
);

// The shared parser defaults to `general`, which composes no `shape` run. An
// explicit `--variant` always wins.
const PRIMARY = process.argv.slice(2).some((a) => a.startsWith("--variant"))
  ? parsedVariant
  : "berau-leader";
const REDUCED = flags.reduced;
const OUT = values.out ?? (REDUCED ? "/tmp/gh55-reduced" : "/tmp/gh55");
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
mkdirSync(OUT, { recursive: true });

/** Every leader variant, PRIMARY first — derived from the shared table, so a third
 *  leader brand is walked without an edit here. */
const LEADER_VARIANTS = [
  ...(VARIANTS[PRIMARY]?.deckSet === "leader" ? [PRIMARY] : []),
  ...Object.values(VARIANTS)
    .filter((v) => v.deckSet === "leader" && v.id !== PRIMARY)
    .map((v) => v.id),
];

const url = (variant, params = {}) => deckUrl(BASE, variant, params);

// ───────────────────── the walk, transcribed ─────────────────────
//
// SECOND COPIES ON PURPOSE (see the header). These are transcribed from #55's AC,
// spec §6.6 and §7.1 — the sources the content and walk modules were written from —
// so a silent edit to either side fails here.

/**
 * The six pillars in the RING ORDER `content.ts` teaches them in, each with the
 * decision its beat prints and the ANCHOR WORD §6.6 requires that decision to carry.
 *
 * THE PAIRING IS THE CLAIM — the AC asks that the walk INDEX section D: "security
 * and no-SOP land on *Governance & Policies*, subscriptions on *Tools & Platform*,
 * 'Leading AI Culture' on *People & Mindset* + *Strategy & Leadership*". A
 * relabelled box, a reordered ring and a polished decision all fail here. The
 * anchors are spec §6.7's own words: D.4 beat 1 is "where your data actually goes",
 * §6.2/B.2's condition is that people improvise, D.5 says "company-managed seats",
 * §6.6 lands "Leading AI Culture" on people AND strategy, and D.3's turn is the
 * 30-day proof pilot.
 */
const PILLARS = [
  {
    id: "governance",
    label: "Governance & Policies",
    decision: "You decide where the data may go — and you write it down before someone improvises.",
    anchors: ["data", "improvis"],
  },
  {
    id: "tools",
    label: "Tools & Platform",
    decision: "You decide who gets a company-managed seat, and that the company pays for it.",
    anchors: ["company-managed seat"],
  },
  {
    id: "people",
    label: "People & Mindset",
    decision: "You decide whether the culture rewards the person who tries it or the person who waits.",
    anchors: ["culture"],
  },
  {
    id: "strategy",
    label: "Strategy & Leadership",
    decision: "You decide which problem gets the pilot, and that leading the culture is part of the job.",
    anchors: ["pilot", "culture"],
  },
  {
    id: "process",
    label: "Process & Methodology",
    decision: "You decide where a human still signs, and everywhere they no longer do.",
    anchors: ["signs"],
  },
  {
    id: "companions",
    label: "AI Companions",
    decision: "You decide when a tool is allowed to become an agent.",
    anchors: ["agent"],
  },
];

/**
 * Pose 2, the first beat: "hub · pillars · six decision beats · closer".
 *
 * THE ONE POSE NUMBER TYPED IN THIS FILE, and `PILLARS` above is the other. The two
 * below are DERIVED from them, on the same rule the deck's own `./walk.ts` follows —
 * a harness free to type all three is a harness free to disagree with itself about
 * how many beats there are, which is the one thing it exists to check.
 *
 * AND THE BUDGET IS SQUEEZED FROM BOTH SIDES rather than trusted: the walk asserts
 * that all `STEP_COUNT` poses stay on this slide (so the slide has at LEAST nine), and
 * the C.1 → C.2 check asserts that one press past `CLOSER_POSE` leaves it (so it has
 * at MOST nine). Neither reads `steps` off the deck.
 */
const FIRST_DECISION_POSE = 2;
/** Pose 8 — one past the last beat, derived exactly as `walk.ts` derives it. */
const CLOSER_POSE = FIRST_DECISION_POSE + PILLARS.length;
/** Nine. A count, where the closer's pose is the last index. */
const STEP_COUNT = CLOSER_POSE + 1;

const IDS = PILLARS.map((p) => p.id);

/** The column's eyebrow, as the room reads it — zero-padded, 1-based, and the total
 *  is the pillar count. "07 / 06" is the failure this shape catches. */
const counterFor = (i) =>
  `THE DECISION · ${String(i + 1).padStart(2, "0")} / ${String(PILLARS.length).padStart(2, "0")}`;

/** §6.6's closer — the claim the six beats are evidence for. */
const CLOSER = "Every one of these is a decision on your desk. None of them is a tool purchase.";

/** The standing kicker, present at all nine poses — which is what makes it standing. */
const KICKER = "AN OPERATING MODEL — NOT A DEPARTMENT, NOT A COMMITTEE";
/** The hub's first line, in the title case §6.6 and the AC quote it in. */
const HUB_LABEL = "The Enabler";
/** The hub's second line per brand (§4.4 slot 5). */
const BRAND_LINE = { berau: "MineTech", gems: "DigiTech" };
/** The figure this slide composes as today. */
const FIG_C1 = "— FIG. C.1·THE AGENTIC ORGANIZATION";
/** And the figure one step past its closer — F.8, which #54 moved to `shape`'s
 *  second slot. Asserted for the reason given at the handover check below. The LABEL
 *  is the leader deck's own as of 2026-08-14 (owner call, `f8HeaderFor`); the standard
 *  decks still print `YOUR AGENTIC OS` there. */
const FIG_C2 = "— FIG. C.2·SIX PILLARS, ONE DESK";

/** The deck's own keys (`src/deck/useKeyboardNav.ts`): Space advances a step,
 *  Backspace retreats one. The AC's `8 → 0` is a claim about what a presenter's
 *  clicker does, so it is walked with the keys the clicker sends. */
const KEY_FORWARD = "Space";
const KEY_BACK = "Backspace";

// ───────────────────── timing ─────────────────────

/** Mount, before the first measurement — the app booting and the font landing. */
const MOUNT_MS = 600;
/**
 * After a pose change, before anything is measured as "at rest".
 *
 * gh#54's two numbers, kept, because the transitions are the same ones. 1700 normal:
 * the ring's last pillar starts at 630ms (`180 + 5 × 90`) and runs 500ms, and the
 * closer's own fade is 450ms with no delay. 900 under `reduce`: the duration is
 * squashed to 0.01ms but THE DELAY IS NOT, so the ring's last pillar still lands at
 * ≈630ms. Neither number is slack — both are the measured finish plus a margin, and
 * the reduced one is deliberately too short to hide a transition that was never
 * squashed.
 */
const POSE_MS = REDUCED ? 900 : 1700;
/** The focus-flight sampler's poll and window. 400ms covers the beats' own
 *  `0.35s`/`0.4s` transitions with room for the round trip. */
const FLIGHT_POLL_MS = 8;
const FLIGHT_WINDOW_MS = 400;
/**
 * How close a rendered edge can be asked to sit to a geometric one: 1/64px —
 * gh#54's tolerance and its reasoning, because it is the same engine. Chromium lays
 * out in `LayoutUnit`s of 1/64px, so a box the module puts at 49.5129 renders at
 * 49.5 and can render nowhere else. It is also what the focus SCALE needs: 72 × 1.07
 * is 77.04 and the engine returns 77.03997802734375.
 */
const SUBPIXEL = 1 / 64;
/** A transform scale is not a layout number and is not quantised to LayoutUnits;
 *  this is the window inside which a sampled scale counts as "arrived". */
const SCALE_EPSILON = 0.002;

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

const n2 = (v) => Math.round(v * 100) / 100;
const n4 = (v) => Math.round(v * 10000) / 10000;
const near = (a, b, tol = SUBPIXEL) => Math.abs(a - b) <= tol;

/**
 * The px lengths of a computed `box-shadow`, and whether there is one at all.
 *
 * THE HALO THE BROWSER ACTUALLY PAINTED, which is the only honest source for the
 * one number no rect can carry. Chromium computes the property as
 * `rgb(90, 52, 28) 0px 0px 0px 4px` — colour, offset-x, offset-y, blur, spread —
 * and omits a zero spread, so the lengths are read positionally and default to 0.
 * The colour's own channels are unitless, so a `px`-anchored match cannot pick them
 * up.
 *
 * A BLUR WOULD MAKE THE OUTER EDGE UNMEASURABLE, which is why the offsets and the
 * blur are asserted to be 0 rather than ignored: `0 0 0 4px` paints a hard ring
 * exactly 4px outside the box on every side, while a blurred shadow fades out over
 * a distance nobody can put a number on.
 */
function halo(shadow) {
  if (!shadow || shadow === "none") return { present: false, x: 0, y: 0, blur: 0, spread: 0 };
  const [x = 0, y = 0, blur = 0, spread = 0] = (shadow.match(/-?[\d.]+px/g) ?? []).map(
    parseFloat,
  );
  return { present: true, x, y, blur, spread };
}

/** `rgb(r, g, b)` / `rgba(r, g, b, a)` as numbers. Computed colours are always one
 *  of those two on this deck — no `color(display-p3 …)`, no named colours. */
function rgb(value) {
  const parts = (value?.match(/-?[\d.]+/g) ?? []).map(Number);
  if (parts.length < 3) return null;
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
}

/**
 * WCAG relative luminance, 0…1 — "does the room see MORE light here?" as a number.
 *
 * THE AC IS ABOUT LUMINANCE AND NOT ABOUT HUE ("no inactive pillar loses border,
 * label or luminance at any beat"; "the active one *gains* copper fill"), and a
 * copper ramp moves through hue as it moves through lightness — `#3d2413` against
 * `#0a0a0a` is more light AND more colour. Comparing the tokens' names would prove
 * nothing about either; comparing luminance is the comparison the rule states.
 */
function luminance(colour) {
  const c = rgb(colour);
  if (!c) return null;
  const f = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}

/** A slide's index is DISCOVERED, never hardcoded: §3 derives every position, and
 *  #56 is inserting a run into this very deck — a literal index would check
 *  whatever slide 3 has become. gh#54's scan, unchanged. */
async function findSlide(page, variant, slideCount, testid) {
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
    if (await page.locator(`[data-testid="${testid}"]`).count()) return i;
  }
  return null;
}

/**
 * The whole slide at one pose, in STAGE COORDINATES.
 *
 * ONE `evaluate`, because every rect and every computed style has to come from the
 * same layout and the same frame: measuring the focused box in one round trip and
 * the nav zone in the next is how a harness reports a clearance no single frame ever
 * had.
 */
function measure(page, ids) {
  return page.evaluate((pillarIds) => {
    const stage = document.querySelector('[data-testid="slide"]');
    const wrap = document.querySelector(".stage-wrap");
    const t = getComputedStyle(wrap).transform;
    // `min(w/1280, h/720)` as the browser actually applied it. `undefined` and not
    // `""` for the identity case: `new DOMMatrixReadOnly("")` is not identity.
    const m = new DOMMatrixReadOnly(t === "none" ? undefined : t);
    const scale = m.a;
    const origin = stage.getBoundingClientRect();
    /** A client rect, divided out of the stage's scale and offset. */
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: (r.left - origin.left) / scale,
        right: (r.right - origin.left) / scale,
        top: (r.top - origin.top) / scale,
        bottom: (r.bottom - origin.top) / scale,
        width: r.width / scale,
        height: r.height / scale,
      };
    };
    const at = (sel) => document.querySelector(sel);
    const testid = (id) => at(`[data-testid="${id}"]`);
    const css = (el, prop) => (el ? getComputedStyle(el)[prop] : null);
    const opacity = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : null);
    /** The `a` of a transform matrix — the focus scale rides on the same transform
     *  that centres the box, so this is the beat's own progress. */
    const scaleOf = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el).transform;
      return s === "none" ? 1 : new DOMMatrixReadOnly(s).a;
    };
    const text = (el) => el?.textContent ?? null;

    const pillars = {};
    for (const id of pillarIds) {
      const box = testid(`shape-pillar-${id}`);
      const label = testid(`shape-pillar-${id}-label`);
      const icon = testid(`shape-pillar-${id}-icon`);
      const spoke = testid(`shape-spoke-${id}`);
      pillars[id] = {
        mounted: Boolean(box && label && icon && spoke),
        active: box?.dataset.active ?? null,
        box: rect(box),
        label: rect(label),
        labelText: text(label),
        // The nine COMPUTED values the no-dim rule is about. All of them resolved
        // through the cascade — no inline string is read anywhere in this file.
        borderColor: css(box, "borderTopColor"),
        borderWidth: css(box, "borderTopWidth"),
        background: css(box, "backgroundColor"),
        boxShadow: css(box, "boxShadow"),
        opacity: opacity(box),
        labelColor: css(label, "color"),
        iconColor: css(icon, "color"),
        iconSvgs: box ? box.querySelectorAll("svg").length : 0,
        spokeStroke: css(spoke, "stroke"),
        spokeWidth: css(spoke, "strokeWidth"),
        spokeOpacity: opacity(spoke),
        boxScale: scaleOf(box),
      };
    }

    const decisions = {};
    for (const id of pillarIds) {
      const block = testid(`shape-decision-${id}`);
      const body = testid(`shape-decision-${id}-text`);
      decisions[id] = {
        mounted: Boolean(block),
        rect: rect(block),
        opacity: opacity(block),
        eyebrow: text(testid(`shape-decision-${id}-eyebrow`)),
        label: text(testid(`shape-decision-${id}-label`)),
        text: body?.innerText.replace(/\s+/g, " ").trim() ?? null,
        textRect: rect(body),
        // OVERFLOW AS THE ELEMENT ITSELF REPORTS IT. A rect stops at the box; a
        // `scrollWidth` past the `clientWidth` is type the box is hiding.
        scrollWidth: body?.scrollWidth ?? null,
        clientWidth: body?.clientWidth ?? null,
      };
    }

    const column = testid("shape-walk-column");
    const columnRect = rect(column);
    const columnCss = column ? getComputedStyle(column) : null;
    const px = (v) => (v ? parseFloat(v) : 0);
    // The column's CONTENT box, in stage coordinates: the converted rect plus the
    // unscaled CSS lengths the cascade reports. This is what the decisions and the
    // closer are laid out inside, so it is what "inside the column" means.
    const columnContent = columnRect && {
      left:
        columnRect.left + px(columnCss.borderLeftWidth) + px(columnCss.paddingLeft),
      right:
        columnRect.right - px(columnCss.borderRightWidth) - px(columnCss.paddingRight),
      top: columnRect.top + px(columnCss.borderTopWidth) + px(columnCss.paddingTop),
      bottom:
        columnRect.bottom - px(columnCss.borderBottomWidth) - px(columnCss.paddingBottom),
    };

    const closer = testid("shape-closer");

    return {
      // THE PAGE THIS FRAME BELONGS TO — see `collectWalk`. A dev-server reload
      // clears it, which is the only way a harness can tell "the pose I measured" from
      // "the pose I thought I was on".
      epoch: window.__GH55_EPOCH__ ?? null,
      scale,
      stage: { width: origin.width / scale, height: origin.height / scale },
      slideIndex: stage.dataset.slideIndex,
      // MEASURED, not read from the geometry module — this is the floor.
      navZone: rect(at(".nav-zone")),
      navZoneCount: document.querySelectorAll(".nav-zone").length,
      // The deck's own side margins, as the chrome draws them.
      marginBand: rect(at(".fig-label")),
      figLabel: at(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
      hubLabel: text(testid("shape-hub-label")),
      hubLabelOpacity: opacity(testid("shape-hub-label")),
      brandLine: text(testid("shape-hub-brand-line")),
      kicker: text(testid("shape-kicker")),
      kickerOpacity: opacity(testid("shape-kicker")),
      pillars,
      pillarCount: document.querySelectorAll('[data-testid^="shape-pillar-"]:not([data-testid$="-icon"]):not([data-testid$="-label"])').length,
      activeIds: pillarIds.filter(
        (id) => testid(`shape-pillar-${id}`)?.dataset.active === "true",
      ),
      decisions,
      column: {
        mounted: Boolean(column),
        count: document.querySelectorAll('[data-testid="shape-walk-column"]').length,
        rect: columnRect,
        content: columnContent,
        opacity: opacity(column),
        borderLeftColor: css(column, "borderLeftColor"),
        borderLeftWidth: css(column, "borderLeftWidth"),
      },
      closer: {
        mounted: Boolean(closer),
        rect: rect(closer),
        opacity: opacity(closer),
        text: closer?.innerText.replace(/\s+/g, " ").trim() ?? null,
        scrollWidth: closer?.scrollWidth ?? null,
        clientWidth: closer?.clientWidth ?? null,
        // "IN THE RIGHT COLUMN" IS ALSO A TREE CLAIM. A closer that merely landed on
        // the same coordinates would blink with the prototype's second panel; this
        // is what says it is the same element's child.
        inColumn: Boolean(closer && column && column.contains(closer)),
      },
      // WHOLE DOCUMENT, not the figure's subtree: the claim is that this slide
      // introduces no SMIL anywhere, chrome included.
      smil: document.querySelectorAll(
        "animate, animateTransform, animateMotion, set, animateColor",
      ).length,
    };
  }, ids);
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
/** The poses worth a picture: the hub, the ring, the first beat, the beat that is at
 *  risk against the floor, the beat that reaches farthest into the side margin, and
 *  the closer. */
const SHOT_POSES = new Set([0, 1, 2, 5, 7, 8]);
const SHOT_NAMES = {
  0: "the-enabler",
  1: "six-pillars",
  2: "beat1-governance",
  5: "beat4-strategy-the-floor",
  7: "beat6-companions-the-margin",
  8: "closer",
};

/**
 * Poll one pillar's box through a focus change and return every frame that was
 * sampled.
 *
 * A CHEAP `evaluate` PER POLL on purpose — one scale and one border colour, not the
 * whole payload — so the round trip stays short enough that the frames it returns
 * are the transition's and not its aftermath.
 */
async function sampleFocusFlight(id) {
  const started = Date.now();
  const samples = [];
  while (Date.now() - started < FLIGHT_WINDOW_MS) {
    const frame = await page.evaluate((pillarId) => {
      const el = document.querySelector(`[data-testid="shape-pillar-${pillarId}"]`);
      const cs = el ? getComputedStyle(el) : null;
      return {
        scale: cs ? (cs.transform === "none" ? 1 : new DOMMatrixReadOnly(cs.transform).a) : null,
        border: cs?.borderTopColor ?? null,
        active: el?.dataset.active ?? null,
      };
    }, id);
    samples.push({ t: Date.now() - started, ...frame });
    await page.waitForTimeout(FLIGHT_POLL_MS);
  }
  return samples;
}

// ───────────────── is this deck even holding the slide? ─────────────────

await page.goto(url(PRIMARY), { waitUntil: "domcontentloaded" });
const slideCount = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
const primaryIndex = await findSlide(page, PRIMARY, slideCount, "shape-hub");
if (primaryIndex == null) {
  console.error(
    `\`shape-agentic-org\` is not in ${PRIMARY} (${slideCount} slides): this deck ` +
      `composes no \`shape\` run. The slide is leader-only (§4.3) and reaches the ` +
      `two leader deck sets alone — run --variant=${LEADER_VARIANTS[0] ?? "berau-leader"}.`,
  );
  await browser.close();
  process.exit(1);
}
console.log(
  `${PRIMARY} · ${slideCount} slides · the shape figure at index ${primaryIndex}` +
    `${REDUCED ? " · reduced motion" : ""}\n` +
    `walking both leader decks, ${STEP_COUNT} poses each, up and back down: ` +
    `${LEADER_VARIANTS.join(", ")}\n`,
);

// ───────────────── per-beat assertions, shared by both directions ─────────────────
//
// ONE FUNCTION FOR BOTH DIRECTIONS, because the AC's `8 → 0` claim is that the poses
// on the way down ARE the poses on the way up. Two copies of these checks would be
// two chances to check the descent less carefully than the ascent, which is the
// direction the bug lives in.

/** The nine computed values the no-dim rule is about, as one comparable tuple. */
const tierOf = (p) => [
  p.borderColor,
  p.borderWidth,
  p.background,
  p.boxShadow,
  n4(p.opacity),
  p.labelColor,
  p.iconColor,
  p.spokeStroke,
  p.spokeWidth,
  n4(p.spokeOpacity),
];

/**
 * One beat, measured — poses 2…7.
 *
 * @param tag       brand column
 * @param dir       "up" / "down", printed so a failure names the direction
 * @param m         the measurement at this pose
 * @param pose      2…7
 * @param baseline  pose 1's pillars, the resting tier every comparison is made against
 * @param margin    the measured side margins
 * @returns the focused pillar's OUTER box (rect + the painted halo), for the
 *          horizontal budget's scan.
 */
function beatChecks(tag, dir, m, pose, baseline, margin) {
  const i = pose - FIRST_DECISION_POSE;
  const { id, label, decision, anchors } = PILLARS[i];
  const at = `${tag} · ${dir} · pose ${pose}`;
  const p = m.pillars[id];

  // ── WHICH pillar, and only that one ──
  check(`${at} · beat ${i + 1} lights ${id} and nothing else`, m.activeIds, [id]);
  check(
    `${at} · the ring is whole — six boxes, six spokes, six labels, all at full opacity`,
    IDS.filter((x) => !m.pillars[x].mounted || m.pillars[x].opacity < 0.999 || m.pillars[x].spokeOpacity < 0.999),
    [],
  );

  // ── NO-DIM, COMPUTED (§7.1 / the AC) ──
  // Five of six pillars must be BYTE FOR BYTE what they were at pose 1.
  const dimmed = IDS.filter((x) => x !== id).flatMap((x) => {
    const now = tierOf(m.pillars[x]);
    const rest = tierOf(baseline[x]);
    return now.every((v, k) => v === rest[k])
      ? []
      : [`${x}: ${now.filter((v, k) => v !== rest[k]).join(" / ")} was ${rest.filter((v, k) => v !== now[k]).join(" / ")}`];
  });
  check(`${at} · the five inactive pillars are unchanged from the resting tier, computed`, dimmed, []);

  // ── THE ACTIVE PILLAR GAINS LIGHT (§7.1: added, never subtracted) ──
  const rest = baseline[id];
  const brighter = (prop) => {
    const now = luminance(p[prop]);
    const was = luminance(rest[prop]);
    return now != null && was != null && now > was;
  };
  check(
    `${at} · ${id} gains light — border, label, icon and spoke all resolve brighter than at rest`,
    ["borderColor", "labelColor", "iconColor", "spokeStroke"].filter((prop) => !brighter(prop)),
    [],
  );
  const bg = rgb(p.background);
  const restBg = rgb(rest.background);
  check(
    `${at} · ${id} is filled with a COPPER, not the stage's neutral — ${p.background} over ${rest.background}`,
    [
      p.background !== rest.background,
      luminance(p.background) > luminance(rest.background),
      // Warm, and not a grey: `r > b` with a real spread is what makes it copper
      // rather than a lighter neutral, which would also pass a luminance test.
      bg.r > bg.b + 8,
      restBg.r === restBg.b,
    ],
    [true, true, true, true],
  );
  const h = halo(p.boxShadow);
  check(
    `${at} · ${id} carries a halo where the resting box has none — ${p.boxShadow}`,
    [h.present, halo(rest.boxShadow).present],
    [true, false],
  );
  check(
    `${at} · ${id}'s spoke thickens — ${p.spokeWidth} over ${rest.spokeWidth}`,
    parseFloat(p.spokeWidth) > parseFloat(rest.spokeWidth),
    true,
  );

  // ── THE BOX GREW, AND ABOUT ITS OWN CENTRE ──
  const restBox = rest.box;
  check(
    `${at} · ${id}'s box is ${FOCUS_SCALE}× its resting rect, to 1/64px — ${n2(p.box.width)}×${n2(p.box.height)}`,
    [
      near(p.box.width, restBox.width * FOCUS_SCALE),
      near(p.box.height, restBox.height * FOCUS_SCALE),
      near((p.box.left + p.box.right) / 2, (restBox.left + restBox.right) / 2),
      near((p.box.top + p.box.bottom) / 2, (restBox.top + restBox.bottom) / 2),
    ],
    [true, true, true, true],
  );

  // ── THE COLUMN HOLDS THIS BEAT'S DECISION, COMPLETE ──
  const d = m.decisions[id];
  check(`${at} · the column prints "${counterFor(i)}"`, d.eyebrow, counterFor(i));
  check(`${at} · under the pillar's own name`, d.label, label);
  check(`${at} · and the decision, verbatim`, d.text, decision);
  check(
    `${at} · which still carries §6.6's anchor words — ${anchors.join(", ")}`,
    anchors.filter((w) => !d.text?.includes(w)),
    [],
  );
  check(`${at} · this beat's block is the only one revealed`, IDS.filter((x) => m.decisions[x].opacity > 0.01), [id]);
  check(`${at} · the block is fully revealed, not mid-fade`, d.opacity, 1);
  check(`${at} · the closer is not on the stage yet`, m.closer.opacity, 0);

  // ── NO GLYPH LEAVES THE MARGIN (the deviation `FOCUSED_OUTERMOST_LEFT` records) ──
  check(
    `${at} · ${id}'s label stays inside the measured ${n2(margin.left)}…${n2(margin.right)} margins — ${n2(p.label.left)}…${n2(p.label.right)}`,
    p.label.left >= margin.left - SUBPIXEL && p.label.right <= margin.right + SUBPIXEL,
    true,
  );
  // ── AND NOTHING IN THE COLUMN OVERFLOWS IT ──
  check(
    `${at} · the decision text stays inside the column's content box and does not scroll`,
    [d.textRect.right <= m.column.content.right + SUBPIXEL, d.scrollWidth <= d.clientWidth],
    [true, true],
  );
  check(`${at} · zero SMIL nodes in the document`, m.smil, 0);

  // The focused OUTER box — the rect plus the halo the browser painted. Returned
  // rather than asserted here: the horizontal and vertical budgets are about the
  // EXTREMES across all six beats, and an extreme read off a hand-picked beat is a
  // number nobody scanned for.
  return {
    id,
    pose,
    spread: h.spread,
    left: p.box.left - h.spread,
    right: p.box.right + h.spread,
    top: p.box.top - h.spread,
    bottom: p.box.bottom + h.spread,
    labelRect: p.label,
  };
}

/** Pose 0 and pose 1 — asserted only as far as THIS ticket could have broken them.
 *  gh#54 owns the rest of them, and still runs. */
function ringPoseChecks(tag, dir, m, pose, brand) {
  const at = `${tag} · ${dir} · pose ${pose}`;
  check(`${at} · nothing is lit — no pillar carries data-active`, m.activeIds, []);
  check(
    `${at} · the walk's column is closed, and its seven blocks with it`,
    [m.column.opacity, ...IDS.map((id) => m.decisions[id].opacity), m.closer.opacity],
    [0, 0, 0, 0, 0, 0, 0, 0],
  );
  // CLOSED, NOT ABSENT — and that is the claim, because `showsWalkColumn` in
  // `walk.ts` exists to keep the column ONE element across every pose it is on the
  // stage for. Seven blocks mounted at a pose that shows none of them is what makes
  // the beats a cross-fade instead of a re-layout.
  check(
    `${at} · the column and all seven of its blocks are mounted, merely closed`,
    [m.column.mounted, ...IDS.map((id) => m.decisions[id].mounted), m.closer.mounted],
    [true, true, true, true, true, true, true, true],
  );
  // A SEVENTH BOX WOULD NOT BE IN `IDS`, so it would be invisible to every other
  // check in this file. This is the one that counts what the stage actually holds.
  check(`${at} · six pillar boxes on the stage, and no seventh`, m.pillarCount, IDS.length);
  check(
    `${at} · every pillar carries the resting tier — no halo, no fill, no thickened spoke`,
    IDS.filter((id) => halo(m.pillars[id].boxShadow).present || m.pillars[id].boxScale > 1 + SCALE_EPSILON),
    [],
  );
  // "Every pose renders complete" — the standing copy, which is on the stage at all
  // nine poses and is what pose 0 IS.
  check(
    `${at} · the standing copy is complete and opaque`,
    [m.figLabel, m.hubLabel, m.brandLine, m.kicker, m.hubLabelOpacity, m.kickerOpacity],
    [FIG_C1, HUB_LABEL, BRAND_LINE[brand], KICKER, 1, 1],
  );
  if (pose === 0) {
    check(
      `${at} · pose 0 is the hub alone — no pillar and no spoke has arrived`,
      IDS.filter((id) => m.pillars[id].opacity > 0.02 || m.pillars[id].spokeOpacity > 0.02),
      [],
    );
  } else {
    check(
      `${at} · pose 1 is complete — six pillars and six spokes at full opacity, none still scaling in`,
      IDS.filter(
        (id) =>
          m.pillars[id].opacity < 0.999 ||
          m.pillars[id].spokeOpacity < 0.999 ||
          !near(m.pillars[id].boxScale, 1, SCALE_EPSILON) ||
          m.pillars[id].iconSvgs !== 1,
      ),
      [],
    );
    check(
      `${at} · all six labels, by text, in the ring order the walk teaches`,
      IDS.map((id) => [id, m.pillars[id].labelText]),
      PILLARS.map((p) => [p.id, p.label]),
    );
  }
  check(`${at} · zero SMIL nodes in the document`, m.smil, 0);
}

/** Pose 8 — the closer, in the right column. */
function closerChecks(tag, dir, m, floor, margin) {
  const at = `${tag} · ${dir} · pose ${CLOSER_POSE}`;
  const c = m.closer;
  check(`${at} · the closer prints, revealed, complete`, [c.text, c.opacity], [CLOSER, 1]);
  // THE AC, verbatim: "the closer renders in the right column".
  check(
    `${at} · IN THE RIGHT COLUMN — a child of shape-walk-column, left ${n2(c.rect.left)} at or right of the measured column edge ${n2(m.column.rect.left)}`,
    [c.inColumn, c.rect.left >= m.column.rect.left - SUBPIXEL],
    [true, true],
  );
  check(
    `${at} · its right edge ${n2(c.rect.right)} is inside the measured margin ${n2(margin.right)}`,
    c.rect.right <= margin.right + SUBPIXEL,
    true,
  );
  check(
    `${at} · its bottom ${n2(c.rect.bottom)} is above the measured .nav-zone top ${n2(floor)} — ${n2(floor - c.rect.bottom)}px`,
    c.rect.bottom < floor,
    true,
  );
  check(
    `${at} · it does not overflow the column's measure`,
    [c.rect.right <= m.column.content.right + SUBPIXEL, c.scrollWidth <= c.clientWidth],
    [true, true],
  );
  // THE RING IS BACK AT REST — "no beat leaves a pillar stuck in its focused state",
  // measured at the pose the walk hands over on.
  check(`${at} · no pillar is lit`, m.activeIds, []);
  check(
    `${at} · and none of them kept a halo or its focus scale`,
    IDS.filter((id) => halo(m.pillars[id].boxShadow).present || m.pillars[id].boxScale > 1 + SCALE_EPSILON),
    [],
  );
  check(
    `${at} · all six decision blocks are gone, at computed opacity 0`,
    IDS.filter((id) => m.decisions[id].opacity !== 0),
    [],
  );
  check(`${at} · the column is still open behind the closer`, m.column.opacity, 1);
  check(`${at} · zero SMIL nodes in the document`, m.smil, 0);
}

// ───────────────── every brand, all nine poses, both directions ─────────────────

/** Per-brand deliverables, collected so the summary prints numbers and not booleans. */
const summary = [];

/**
 * Mount the slide and STAMP THE PAGE, then walk it up, over into C.2, back, and all
 * the way down — measuring every pose. Returns `null` if the page was reloaded
 * anywhere in the middle of that.
 *
 * THE STAMP EXISTS BECAUSE THIS RUNS AGAINST A DEV SERVER, and it was added after a
 * false failure it is worth recording. A walk of nine poses plus nine back takes ~30
 * seconds per brand; if anyone saves a file under `src/` inside that window, Vite's
 * HMR reloads the page, and a reload restores the SLIDE from `?slide=` while resetting
 * the STEP to 0. The deck is then several poses behind where the harness thinks it is,
 * and every subsequent assertion reports the wrong pose's state as this pose's — which
 * is a failure that looks exactly like a stuck focus state and is not one. (Observed:
 * a parallel session editing `src/slides/opening-section-a/` mid-run, which produced
 * "the box never grew" on a slide whose box grows.)
 *
 * `window.__GH55_EPOCH__` is set once after mount and carried out in every
 * measurement. A reload wipes it, so ONE comparison per frame turns an unreproducible
 * cascade of failures into a retry and a printed reason.
 */
async function collectWalk(variant, index) {
  const epoch = `${variant}·${Date.now()}`;
  // WALKED, NOT DEEP-LINKED, and this is the deliberate deviation from gh#54's
  // `atPose` (which re-mounts for every pose). The AC is "no beat leaves a pillar
  // stuck in its focused state", and a fresh mount per pose cannot see stuck state
  // BY CONSTRUCTION — it is the one bug this walk exists to catch, and a transition
  // on a property React has stopped declaring is exactly its shape. The
  // path-independence a fresh mount would prove is covered better by the walk back
  // down, which reaches every pose from the opposite side.
  // The goto is retried on the same rule `findSlide` retries its own: `networkidle`
  // on a dev server that is rebuilding — or serving another harness at the same time
  // — can exceed its timeout, and a harness that dies of that reports nothing about
  // the deck. A second failure returns `null` into the retry loop below rather than
  // throwing, so the reason is printed with the other walk failures.
  for (const attempt of [1, 2]) {
    try {
      await page.goto(url(variant, { slide: index }), { waitUntil: "networkidle" });
      break;
    } catch (err) {
      if (attempt === 2) {
        console.log(`      the dev server did not settle: ${err.message.split("\n")[0]}`);
        return null;
      }
      await page.waitForTimeout(800);
    }
  }
  await stage.waitFor();
  await page.waitForTimeout(MOUNT_MS);
  await page.evaluate((e) => {
    window.__GH55_EPOCH__ = e;
  }, epoch);

  const up = [];
  for (let pose = 0; pose < STEP_COUNT; pose++) {
    if (pose > 0) {
      await page.keyboard.press(KEY_FORWARD);
      await page.waitForTimeout(POSE_MS);
    }
    up[pose] = await measure(page, IDS);
    if (SHOT_POSES.has(pose)) await shot(`${variant}-pose${pose}-${SHOT_NAMES[pose]}`);
  }

  // One step past the closer, and one step back — see the C.2 block below for why
  // this claim is made here at all.
  await page.keyboard.press(KEY_FORWARD);
  await page.waitForTimeout(POSE_MS);
  const handover = await page.evaluate(() => ({
    epoch: window.__GH55_EPOCH__ ?? null,
    slideIndex: document.querySelector('[data-testid="slide"]').dataset.slideIndex,
    figLabel: document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
    isF8: Boolean(document.querySelector('[data-testid="f8-headline"]')),
    shape: Boolean(document.querySelector('[data-testid="shape-hub"]')),
  }));
  await page.keyboard.press(KEY_BACK);
  await page.waitForTimeout(POSE_MS);
  const backOnCloser = await measure(page, IDS);

  // Straight back down with the deck's own reverse key, measuring every pose again.
  const down = [];
  for (let pose = CLOSER_POSE - 1; pose >= 0; pose--) {
    await page.keyboard.press(KEY_BACK);
    await page.waitForTimeout(POSE_MS);
    down[pose] = await measure(page, IDS);
  }

  const frames = [...up, backOnCloser, ...down, handover];
  const lost = frames.filter((f) => f.epoch !== epoch).length;
  if (lost > 0) {
    console.log(
      `      the dev server reloaded the page mid-walk — ${lost} of ${frames.length} frames ` +
        `belong to another page epoch, so the walk is void and will be re-walked`,
    );
    return null;
  }
  return { up, down, handover, backOnCloser };
}

for (const variant of LEADER_VARIANTS) {
  const brand = VARIANTS[variant].brand;
  const tag = variant.padEnd(12);
  console.log(`\n══ ${variant} ═══════════════════════════════════════════`);

  const index =
    variant === PRIMARY ? primaryIndex : await findSlide(page, variant, slideCount, "shape-hub");
  check(`${tag} · the figure composes into this deck`, index != null, true);
  if (index == null) continue;

  let walked = null;
  for (const attempt of [1, 2, 3]) {
    walked = await collectWalk(variant, index);
    if (walked) break;
    console.log(`      re-walking ${variant} — attempt ${attempt + 1} of 3`);
  }
  check(
    `${tag} · the whole walk was measured inside ONE page epoch — no dev-server reload`,
    walked != null,
    true,
  );
  if (!walked) continue;
  const { up, down, handover, backOnCloser } = walked;

  // ── the stage, and the edges it draws ──
  const base = up[1];
  if (variant === PRIMARY) {
    check(
      "the 1280×720 viewport renders the stage 1:1",
      [base.scale, base.stage.width, base.stage.height],
      [1, 1280, 720],
    );
    check("exactly one .nav-zone on the stage", base.navZoneCount, 1);
    check("exactly one shape-walk-column on the stage", base.column.count, 1);
  }
  /** THE FLOOR, and the only one this script uses. Measured off `.nav-zone`. */
  const FLOOR = base.navZone.top;
  /** THE MARGINS, measured off the chrome that draws them. */
  const MARGIN = { left: base.marginBand.left, right: base.marginBand.right };
  /** THE COLUMN'S OWN EDGE, measured off the column. */
  const COLUMN_LEFT = base.column.rect.left;

  check(
    `${tag} · the walk never leaves the slide — all ${STEP_COUNT} poses are slide ${index}`,
    [...new Set(up.map((m) => m.slideIndex))],
    [String(index)],
  );

  // ── poses 0 and 1 ──
  ringPoseChecks(tag, "up  ", up[0], 0, brand);
  ringPoseChecks(tag, "up  ", up[1], 1, brand);

  // ── the six beats ──
  const focusedUp = [];
  for (let pose = FIRST_DECISION_POSE; pose < CLOSER_POSE; pose++) {
    focusedUp.push(beatChecks(tag, "up  ", up[pose], pose, base.pillars, MARGIN));
  }
  check(
    `${tag} · six beats, one per pillar, in the ring order — and no pillar shares a beat`,
    focusedUp.map((f) => f.id),
    IDS,
  );

  // ── the closer ──
  closerChecks(tag, "up  ", up[CLOSER_POSE], FLOOR, MARGIN);

  // ═════════ THE FOCUSED FLOOR — the ticket's headline risk ═════════
  //
  // The pillar at risk is SCANNED off the rendered ring, so a re-cut ellipse moves
  // this measurement with it instead of leaving it pointed at the wrong box.
  const restBoxes = IDS.map((id) => ({ id, ...base.pillars[id].box }));
  const lowest = restBoxes.reduce((a, b) => (b.bottom > a.bottom ? b : a));
  const lowestIndex = IDS.indexOf(lowest.id);
  const floorBeat = FIRST_DECISION_POSE + lowestIndex;
  check(
    `${tag} · FLOOR · the lowest box on the rendered ring is ${lowest.id}, so the beat at risk is pose ${floorBeat}`,
    [lowest.id, floorBeat],
    ["strategy", 5],
  );
  check(
    `${tag} · FLOOR · cross-check · geometry LOWEST_PILLAR_INDEX ${LOWEST_PILLAR_INDEX} names the same box`,
    LOWEST_PILLAR_INDEX,
    lowestIndex,
  );

  const focused = up[floorBeat].pillars[lowest.id];
  const h = halo(focused.boxShadow);
  // The halo is READ, not assumed — and it has to be a hard ring for its spread to
  // be the outer edge at all.
  check(
    `${tag} · FLOOR · the painted halo is a hard ring: no offset, no blur, ${h.spread}px of spread — ${focused.boxShadow}`,
    [h.present, h.x, h.y, h.blur],
    [true, 0, 0, 0],
  );
  check(
    `${tag} · FLOOR · cross-check · geometry FOCUS_HALO_WIDTH ${FOCUS_HALO_WIDTH} is the spread the browser painted`,
    h.spread,
    FOCUS_HALO_WIDTH,
  );
  const outerBottom = focused.box.bottom + h.spread;
  const clearance = FLOOR - outerBottom;
  // THE ASSERTION §7.1 ASKED FOR, at the pose that is actually at risk.
  check(
    `${tag} · FLOOR · the FOCUSED ${lowest.id} — rect bottom ${n2(focused.box.bottom)} + ${h.spread}px halo = ${n2(outerBottom)} — clears the measured .nav-zone top ${n2(FLOOR)} by ${n2(clearance)}px`,
    outerBottom < FLOOR,
    true,
  );
  check(
    `${tag} · FLOOR · and it spent no more than gh#54's FOCUS_GROWTH_RESERVE of ${FOCUS_GROWTH_RESERVE}px — ${n2(outerBottom - lowest.bottom)}px`,
    outerBottom - lowest.bottom <= FOCUS_GROWTH_RESERVE,
    true,
  );
  check(
    `${tag} · FLOOR · cross-check · geometry FOCUSED_LOWEST_PILLAR_BOTTOM ${n2(FOCUSED_LOWEST_PILLAR_BOTTOM)} / FOCUSED_NAV_ZONE_CLEARANCE ${n2(FOCUSED_NAV_ZONE_CLEARANCE)} / FOCUS_GROWTH_SPENT ${n2(FOCUS_GROWTH_SPENT)} match the measurement`,
    [
      near(FOCUSED_LOWEST_PILLAR_BOTTOM, outerBottom),
      near(FOCUSED_NAV_ZONE_CLEARANCE, clearance),
      near(FOCUS_GROWTH_SPENT, outerBottom - lowest.bottom),
    ],
    [true, true, true],
  );
  check(
    `${tag} · FLOOR · cross-check · NAV_ZONE_TOP ${NAV_ZONE_TOP} is the measured .nav-zone top, and SIDE_MARGIN ${SIDE_MARGIN} the measured margin band`,
    [NAV_ZONE_TOP, SIDE_MARGIN, 1280 - SIDE_MARGIN],
    [n2(FLOOR), n2(MARGIN.left), n2(MARGIN.right)],
  );
  // The label rides inside the box, so the floor is ONE number — the layout decision
  // `geometry.ts` records. This is the half of it a browser can check.
  check(
    `${tag} · FLOOR · the focused label is still inside its own grown box, so the box bottom governs the floor`,
    focused.label.bottom <= focused.box.bottom,
    true,
  );

  // ═════════ THE HORIZONTAL BUDGET, scanned across all six beats ═════════
  const leftmost = focusedUp.reduce((a, b) => (b.left < a.left ? b : a));
  const rightmost = focusedUp.reduce((a, b) => (b.right > a.right ? b : a));
  const intrusion = MARGIN.left - leftmost.left;
  const columnGap = COLUMN_LEFT - rightmost.right;
  check(
    `${tag} · MARGIN · nothing is clipped — the leftmost painted pixel of the whole walk is ${leftmost.id} at ${n2(leftmost.left)} (pose ${leftmost.pose}), on the stage`,
    leftmost.left > 0,
    true,
  );
  check(
    `${tag} · MARGIN · the halo enters the measured ${n2(MARGIN.left)}px margin by ${n2(intrusion)}px — deliberately, and no glyph follows it`,
    [intrusion > 0, leftmost.labelRect.left >= MARGIN.left - SUBPIXEL],
    [true, true],
  );
  check(
    `${tag} · MARGIN · the two beats that reach farthest left are the outermost pillars`,
    focusedUp.filter((f) => near(f.left, leftmost.left, 0.01)).map((f) => `${f.id}@${f.pose}`),
    ["process@6", "companions@7"],
  );
  check(
    `${tag} · MARGIN · cross-check · geometry FOCUSED_OUTERMOST_LEFT ${n2(FOCUSED_OUTERMOST_LEFT)} / FOCUSED_MARGIN_INTRUSION ${n2(FOCUSED_MARGIN_INTRUSION)} match the measurement`,
    [near(FOCUSED_OUTERMOST_LEFT, leftmost.left), near(FOCUSED_MARGIN_INTRUSION, intrusion)],
    [true, true],
  );
  check(
    `${tag} · COLUMN GAP · the rightmost painted pixel of the walk is ${rightmost.id} at ${n2(rightmost.right)} (pose ${rightmost.pose}), still ${n2(columnGap)}px short of the measured column edge ${n2(COLUMN_LEFT)}`,
    columnGap > 0,
    true,
  );
  check(
    `${tag} · COLUMN GAP · cross-check · geometry FOCUSED_OUTERMOST_RIGHT ${n2(FOCUSED_OUTERMOST_RIGHT)} / FOCUSED_WALK_COLUMN_GAP ${n2(FOCUSED_WALK_COLUMN_GAP)} match the measurement`,
    [near(FOCUSED_OUTERMOST_RIGHT, rightmost.right), near(FOCUSED_WALK_COLUMN_GAP, columnGap)],
    [true, true],
  );

  // ═════════ THE COLUMN NEVER BLINKS ═════════
  const columnAt = (pose) => [
    n4(up[pose].column.rect.left),
    n4(up[pose].column.rect.top),
    n4(up[pose].column.rect.right),
    n4(up[pose].column.rect.bottom),
    up[pose].column.borderLeftColor,
    up[pose].column.borderLeftWidth,
    n4(up[pose].column.opacity),
  ];
  const openPoses = [];
  for (let pose = FIRST_DECISION_POSE; pose <= CLOSER_POSE; pose++) openPoses.push(pose);
  check(
    `${tag} · COLUMN · one element, one rect, one hairline across poses ${FIRST_DECISION_POSE}…${CLOSER_POSE} — ${JSON.stringify(columnAt(FIRST_DECISION_POSE))}`,
    openPoses.map((pose) => columnAt(pose)),
    openPoses.map(() => columnAt(FIRST_DECISION_POSE)),
  );
  check(
    `${tag} · COLUMN · it is one element at every pose, never a second panel`,
    [...new Set(up.map((m) => m.column.count))],
    [1],
  );
  check(
    `${tag} · COLUMN · and it never opens over the ring's own reveal — closed at poses 0 and 1`,
    [up[0].column.opacity, up[1].column.opacity],
    [0, 0],
  );

  // ═════════ THE SIX BEATS READ AT ONE EYE LEVEL ═════════
  //
  // The eye level is the COLUMN'S OWN centre, measured — `HUB.y` is then held
  // against it. All seven blocks are mounted at every pose from 2 on, so they are
  // measured together at the closer's pose where nothing is mid-fade.
  const eye = (up[CLOSER_POSE].column.content.top + up[CLOSER_POSE].column.content.bottom) / 2;
  const centres = IDS.map((id) => ({
    id,
    y: (up[CLOSER_POSE].decisions[id].rect.top + up[CLOSER_POSE].decisions[id].rect.bottom) / 2,
  }));
  const closerCentre =
    (up[CLOSER_POSE].closer.rect.top + up[CLOSER_POSE].closer.rect.bottom) / 2;
  check(
    `${tag} · EYE LEVEL · all six decision blocks and the closer are centred on the column's own centre ${n2(eye)}, to 1/64px`,
    [...centres.filter((c) => !near(c.y, eye)).map((c) => `${c.id} ${n2(c.y)}`), ...(near(closerCentre, eye) ? [] : [`closer ${n2(closerCentre)}`])],
    [],
  );
  check(
    `${tag} · EYE LEVEL · cross-check · that centre IS the hub's own line, geometry HUB.y ${HUB.y}`,
    near(eye, HUB.y),
    true,
  );
  check(
    `${tag} · EYE LEVEL · no decision text overflows the column's ${n2(up[CLOSER_POSE].column.content.right - up[CLOSER_POSE].column.content.left)}px measure`,
    IDS.filter((id) => {
      const d = up[CLOSER_POSE].decisions[id];
      return d.textRect.right > up[CLOSER_POSE].column.content.right + SUBPIXEL || d.scrollWidth > d.clientWidth;
    }),
    [],
  );
  check(
    `${tag} · EYE LEVEL · cross-check · geometry WALK_COLUMN ${WALK_COLUMN.left}…${1280 - WALK_COLUMN.right} × ${WALK_COLUMN.top}…${WALK_COLUMN.bottom} with a ${WALK_COLUMN.rulePad}px gutter is the rendered column`,
    [
      near(WALK_COLUMN.left, up[CLOSER_POSE].column.rect.left),
      near(1280 - WALK_COLUMN.right, up[CLOSER_POSE].column.rect.right),
      near(WALK_COLUMN.top, up[CLOSER_POSE].column.rect.top),
      near(WALK_COLUMN.bottom, up[CLOSER_POSE].column.rect.bottom),
      near(WALK_COLUMN.rulePad, up[CLOSER_POSE].column.content.left - up[CLOSER_POSE].column.rect.left - 1),
    ],
    [true, true, true, true, true],
  );

  // ═════════ C.1 → C.2, FROM THE POSE THAT IS NOW LAST ═════════
  //
  // NOT THIS TICKET'S CLAIM, AND HERE AS AN INDEPENDENT SECOND ROUTE TO IT.
  // `scripts/gh54-verify.mjs` owns the handover and pressed the forward key ONCE from
  // pose 1 to prove it — correct while the slide had `steps: 2`, stale the moment #55
  // made it nine, and FIXED in the same change as this file: it now presses until the
  // slide index changes, which holds for any step budget. This is the same keypress
  // reached the other way, from the pose this script can name as last.
  //
  // AND THE RETREAT BACK IS PART OF THE SAME EVIDENCE: `useKeyboardNav` spills a
  // retreat onto the PREVIOUS slide's last step, so one press back must land on this
  // slide's closer — which is also how the walk down gets its starting pose.
  check(
    `${tag} · C.2 · one step past the closer leaves the slide for f8-your-agentic-os, printing ${FIG_C2}`,
    [handover.slideIndex, handover.shape, handover.isF8, handover.figLabel],
    [String(index + 1), false, true, FIG_C2],
  );
  check(
    `${tag} · C.2 · and one step back returns to this slide's LAST pose, closer and all`,
    [backOnCloser.slideIndex, backOnCloser.closer.opacity, backOnCloser.activeIds],
    [String(index), 1, []],
  );

  // ═════════ `8 → 0` IN A REAL ENGINE ═════════
  //
  // The walk down, measured pose by pose. The claim is not "it renders" — it is that
  // the pose on the way down IS the pose on the way up, so every beat is re-asserted
  // rather than glanced at.
  check(
    `${tag} · 8→0 · the retreat never leaves the slide either`,
    [...new Set(down.filter(Boolean).map((m) => m.slideIndex))],
    [String(index)],
  );
  const focusedDown = [];
  for (let pose = CLOSER_POSE - 1; pose >= FIRST_DECISION_POSE; pose--) {
    focusedDown.push(beatChecks(tag, "down", down[pose], pose, base.pillars, MARGIN));
  }
  ringPoseChecks(tag, "down", down[1], 1, brand);
  ringPoseChecks(tag, "down", down[0], 0, brand);
  check(
    `${tag} · 8→0 · every pose lights exactly what it lit on the way up`,
    down.map((m, pose) => `${pose}:${m.activeIds.join("+") || "—"}`),
    up.slice(0, CLOSER_POSE).map((m, pose) => `${pose}:${m.activeIds.join("+") || "—"}`),
  );
  check(
    `${tag} · 8→0 · nothing is stuck lit at poses 1 and 0 — no halo, no fill, no thickened spoke, no open column`,
    [
      ...IDS.filter((id) => tierOf(down[1].pillars[id]).join("|") !== tierOf(base.pillars[id]).join("|")),
      ...IDS.filter((id) => tierOf(down[0].pillars[id]).join("|") !== tierOf(base.pillars[id]).join("|") && down[0].pillars[id].opacity > 0.02),
      ...(down[1].column.opacity === 0 && down[0].column.opacity === 0 ? [] : ["column still open"]),
    ],
    [],
  );
  // THE FLOOR, READ A SECOND TIME AND FROM THE OTHER SIDE. Pose 5 arrived at from
  // pose 6 is a different path through the same transitions, and it is the reading
  // a stuck transform would disagree with.
  const downFocused = down[floorBeat].pillars[lowest.id];
  const downOuter = downFocused.box.bottom + halo(downFocused.boxShadow).spread;
  check(
    `${tag} · FLOOR · reached from ABOVE, pose ${floorBeat} measures the same outer bottom — ${n2(downOuter)}`,
    near(downOuter, outerBottom),
    true,
  );

  summary.push({
    variant,
    floor: FLOOR,
    lowest: lowest.id,
    restBottom: lowest.bottom,
    outerBottom,
    clearance,
    spread: h.spread,
    intrusion,
    leftmost,
    columnGap,
    rightmost,
    eye,
    closerRect: up[CLOSER_POSE].closer.rect,
    columnRect: up[CLOSER_POSE].column.rect,
  });
}

// ═════════ THE MOTION CONTRACT — the focus change, sampled mid-flight ═════════
//
// ONE BRAND, and stated rather than assumed: the beats' durations are constants in
// `PillarOrbit.tsx` and no brand axis reaches them, so sampling both would measure
// the same two numbers twice.
//
// THE CLAIM: the global `prefers-reduced-motion: reduce` rule squashes
// `transition-duration` and says NOTHING about `transition-delay` (gh#54 measured
// exactly that), and the focus properties carry no delay at any pose — so a focus
// change under `reduce` is genuinely INSTANT and not merely late. Under normal
// motion the same sampler must catch the box between 1 and 1.07, or the reduced
// run's empty list would mean nothing at all.
console.log(`\n══ the focus change, sampled ${REDUCED ? "under reduce" : "under normal motion"} ══`);

/** The beat this samples INTO — pillar 3, the one whose box the floor budget is spent
 *  on, so the sampled transition is the one that matters most. */
const FLIGHT_INDEX = 3;
const flightTarget = PILLARS[FLIGHT_INDEX].id;
/**
 * Walk to the beat BEFORE the sampled one and CHECK WE GOT THERE, retrying if not.
 *
 * THE PRE-ROLL IS VERIFIED FOR THE REASON `collectWalk` CARRIES AN EPOCH: a
 * dev-server reload mid-pre-roll leaves the deck several poses behind, and the
 * sampler would then watch a box that this keypress never focuses hold still for
 * 400ms and report "the focus change never landed" — a false failure that looks like
 * a broken transition. The pose is a fact the DOM can state (`data-active`), so it is
 * asserted rather than counted.
 */
let preRolled = false;
for (const attempt of [1, 2, 3]) {
  try {
    await page.goto(url(PRIMARY, { slide: primaryIndex }), { waitUntil: "networkidle" });
  } catch (err) {
    // Same rule as `collectWalk`'s goto: a dev server that will not settle is not a
    // claim about the deck, so it costs an attempt rather than the run.
    console.log(`      the dev server did not settle: ${err.message.split("\n")[0]}`);
    continue;
  }
  await stage.waitFor();
  await page.waitForTimeout(MOUNT_MS);
  for (let i = 0; i < FIRST_DECISION_POSE + FLIGHT_INDEX - 1; i++) {
    await page.keyboard.press(KEY_FORWARD);
    await page.waitForTimeout(POSE_MS);
  }
  const active = await page.evaluate((ids) =>
    ids.filter((id) => document.querySelector(`[data-testid="shape-pillar-${id}"]`)?.dataset.active === "true"),
    IDS,
  );
  if (active.length === 1 && active[0] === PILLARS[FLIGHT_INDEX - 1].id) {
    preRolled = true;
    break;
  }
  console.log(
    `      the pre-roll landed on [${active.join(", ") || "nothing"}] instead of ` +
      `${PILLARS[FLIGHT_INDEX - 1].id} — the page was reloaded under it; ` +
      `attempt ${attempt} of 3`,
  );
}
check(
  `the sampler starts on the beat before ${flightTarget}'s, so the frame it catches is a beat-to-beat transition and not the ring's arrival`,
  preRolled,
  true,
);
await page.keyboard.press(KEY_FORWARD);
const flight = await sampleFocusFlight(flightTarget);
const arrived = flight.filter((f) => near(f.scale, FOCUS_SCALE, SCALE_EPSILON));
const inFlight = flight.filter(
  (f) => f.scale > 1 + SCALE_EPSILON && f.scale < FOCUS_SCALE - SCALE_EPSILON,
);
check(
  `the sampler saw the beat land at all — ${flight.length} frames over ${FLIGHT_WINDOW_MS}ms`,
  arrived.length > 0,
  true,
);
console.log(
  `      ${flightTarget} reached ${FOCUS_SCALE}× at ${arrived[0]?.t ?? "never"}ms; ` +
    `frames: ${flight.slice(0, 12).map((f) => n4(f.scale)).join(" ")}${flight.length > 12 ? " …" : ""}`,
);
if (REDUCED) {
  check(
    "under reduce the focus change is INSTANT — no frame catches the box between 1 and 1.07",
    inFlight.map((f) => `${f.t}ms ${n4(f.scale)}`),
    [],
  );
  check(
    `under reduce it is instant and not merely late — arrived within ${FLIGHT_POLL_MS * 4}ms of the keypress, so no transition-delay is hiding in the focus properties`,
    (arrived[0]?.t ?? Infinity) <= FLIGHT_POLL_MS * 4,
    true,
  );
} else {
  check(
    `under normal motion the same sampler catches the box in flight — ${inFlight.length} frames between 1 and ${FOCUS_SCALE}`,
    inFlight.length > 0,
    true,
  );
}

// ───────────────── the console ─────────────────

check("console clean across both brands, all nine poses, both directions", noise, []);

// ───────────────── the deliverable ─────────────────

console.log(`\n      THE MEASURED WALK${REDUCED ? " (reduced motion)" : ""}`);
console.log(
  `      .nav-zone top and the side margins are measured off the elements, not read from geometry.ts`,
);
for (const s of summary) {
  console.log(
    `\n      ${s.variant}\n` +
      `        FOCUSED FLOOR   ${s.lowest} rests at ${n2(s.restBottom)}, focuses to ${n2(s.outerBottom)} (rect + ${s.spread}px painted halo)\n` +
      `                        under a measured .nav-zone top of ${n2(s.floor)} — CLEARANCE ${n2(s.clearance)}px\n` +
      `        MARGIN          leftmost painted pixel ${n2(s.leftmost.left)} (${s.leftmost.id}, pose ${s.leftmost.pose}) — INTRUSION ${n2(s.intrusion)}px, no glyph past ${n2(s.leftmost.labelRect.left)}\n` +
      `        COLUMN GAP      rightmost painted pixel ${n2(s.rightmost.right)} (${s.rightmost.id}, pose ${s.rightmost.pose}) — GAP ${n2(s.columnGap)}px to the column at ${n2(s.columnRect.left)}\n` +
      `        EYE LEVEL       every beat and the closer centred on y ${n2(s.eye)}\n` +
      `        CLOSER          x ${n2(s.closerRect.left)}…${n2(s.closerRect.right)}  y ${n2(s.closerRect.top)}…${n2(s.closerRect.bottom)}  inside the column ${n2(s.columnRect.left)}…${n2(s.columnRect.right)}`,
  );
}

console.log(`\n${failures ? `${failures} FAILURE(S)` : "all checks passed"} · shots: ${OUT}`);
await browser.close();
process.exit(failures ? 1 : 0);
