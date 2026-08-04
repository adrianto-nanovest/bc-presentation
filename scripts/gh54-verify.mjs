// gh#54's browser evidence — THE AGENTIC ORGANIZATION, both leader decks, two poses.
//
// `tests/unit/shape-agentic-org.test.tsx` owns everything jsdom can see, and
// `src/slides/leader-shape/geometry.ts` is ARITHMETIC OVER CONSTANTS: every number
// in it — the ring, the boxes, `LOWEST_PILLAR_BOTTOM`, `NAV_ZONE_CLEARANCE` — is
// derived from four literals, so a unit test over it can only prove that both sides
// of the same sum agree. jsdom places nothing. This script owns the four claims that
// need an engine, and they are the four the slide is actually at risk of:
//
//   1. THE CLEARANCE — the ticket's headline risk (#16 finding 3, spec §7.1: "the
//      lowest satellite sits at y ≈ 620 … close to the NavBar hover zone, and it
//      grows on focus. Re-check clearance when rebuilt."). The prototype's
//      equivalent number is NEGATIVE 26 and nothing in the prototype said so.
//      Whether the re-cut ellipse puts a 196×72 box AND ITS LABEL above the hover
//      band, inside the deck's margins and clear of the hub is a question only a
//      real engine answers.
//
//      THE FLOOR IS MEASURED, NOT READ. `.nav-zone` in `src/styles/globals.css` is
//      `position: absolute; bottom: 0; height: 88px`, so its top edge is y = 632 —
//      and 632 is exactly what `NAV_ZONE_TOP` claims, which is why this script does
//      not use that constant as the floor. It measures the ELEMENT'S OWN bounding
//      box and asserts against that, then cross-checks the module's number against
//      the measurement. A harness that reads the number it is checking proves only
//      that the number equals itself. The same rule sends the side margin through
//      `.fig-label`'s rect rather than through a literal 48.
//
//      NOTE THE FLOOR IS NOT gh#53'S. `scripts/gh53-verify.mjs` stops content at
//      y = 660, the number `E12Primitives` measured for the NavBar CLUSTER plus its
//      padding. This slide's AC names the HOVER ZONE, which starts 28px higher and
//      is a band the presenter's own pointer arms. 660 would pass a box at 640 that
//      the chrome fades up over.
//
//   2. NOTHING IS PRE-DIMMED AT REST (§7.1 — attention is bought with added light,
//      never subtracted). The unit test can compare the inline `style` strings the
//      component wrote; those strings are `var(--copper-600)` and prove nothing
//      about what a room sees. This compares the COMPUTED colours all six borders
//      and all six labels resolve to through the cascade, plus their opacities. It
//      is the claim the NEXT ticket's focus walk is most likely to break, because
//      the cheapest way to make one pillar louder is to make five quieter.
//
//   3. REDUCED MOTION, both halves. Zero SMIL nodes is checkable in jsdom; that the
//      ring then rests on its FINISHED frame is not, because the global rule in
//      globals.css squashes a duration the browser has to actually run. And the
//      sharper half, which needs a mid-flight sample: under `reduce` there is no
//      IN-BETWEEN frame at all, while under normal motion there is — the second
//      half is the first half's positive control, because a sample that can never
//      see an intermediate opacity would report a squashed transition on a deck
//      that never squashed one.
//
//      A DECK-WIDE FACT THIS SCRIPT MEASURED, recorded because the slide's own doc
//      comment does not say it: the global rule squashes `transition-duration`, NOT
//      `transition-delay`. `PillarOrbit`'s stagger is `180 + i × 90`ms of DELAY, so
//      the last pillar still arrives 630ms after the pose change under `reduce` —
//      instantly, but late. Nothing MOVES (that is what assertion 3 proves), and
//      the settle budget below is therefore governed by the stagger and not by the
//      duration. `Reveal` (`src/slides/.../components/Reveal.tsx`) has the same
//      shape, so this is the deck's behaviour and not this slide's defect.
//
//   4. C.1 → C.2, ON A REAL PAGE. The composed-deck tests own the numbering; this
//      owns the two strings a projector prints. The letter is DERIVED (§3.5), so
//      the only place C.1 and C.2 exist as rendered text is a browser — and F.8's
//      leader closer, which #54 made deck-set-scoped, renders on the same page.
//
// THE STAGE'S SCALE, handled explicitly because gh#53 handles it by luck.
// `useViewportScale` CSS-transforms `.stage-wrap` by `min(w/1280, h/720)`, and
// gh53-verify reads raw `boundingBox()` values at a 1280×720 viewport where that
// factor happens to be exactly 1. This script reads the `.stage-wrap` matrix,
// ASSERTS it is 1:1, and converts every rect through the stage's own origin and
// scale anyway — so every number it prints is a stage coordinate whatever viewport
// it is handed, and a future letterboxed run reports 610 rather than 549.
//
// Modelled on `scripts/gh53-verify.mjs` and failing the same way: every assertion
// prints `ok` / `FAIL` and a failure exits 1, so this is runnable from a gate and
// not only readable by a human.
//
// Usage:
//   node scripts/gh54-verify.mjs                        # berau-leader first
//   node scripts/gh54-verify.mjs --variant=gems-leader
//   node scripts/gh54-verify.mjs --reduced
//
// The variant is explicit for the same reason the export scripts take one (gh#27):
// a bare localhost resolves to `general`, which composes no `shape` run at all.
//
// `--variant` PICKS THE ORDER, NOT THE SET. §7.1's clearance risk is recorded
// against the figure, and the figure ships to BOTH leader decks, so both are always
// measured; the flag decides which one goes first and which one the one-off
// structural checks (scale, the derived figure, the motion sample) run against.
// Default `berau-leader` — the brand whose one variable is at its maximum: the only
// thing that varies on this slide is the hub's second line, and `MineTech` renders
// 62.0px wide against `DigiTech`'s 55.8px inside a 132px disc, so a hub that
// overflows overflows there first. A standard variant is not silently skipped: it
// exits 1 saying the deck composes no `shape` run.
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
// Also plain data: no imports, no DOM, no module-scope work beyond deriving the ring.
import {
  FIGURE_CEILING,
  FOCUS_GROWTH_RESERVE,
  LOWEST_PILLAR_BOTTOM,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PILLAR_BOX,
  PILLAR_COUNT,
  SIDE_MARGIN,
  WALK_COLUMN_LEFT,
  pillarBox,
} from "../src/slides/leader-shape/geometry.ts";

const USAGE = [
  "Usage: node scripts/gh54-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>]",
  "",
  `  --variant=<id>   Leader deck to measure FIRST. Default: berau-leader. Ids: ${VARIANT_IDS.join(", ")}`,
  "                   Both leader decks are always measured; a standard deck exits 1.",
  "  --reduced        Run under `prefers-reduced-motion: reduce`.",
  "  --out=<dir>      Where to write the shots. Default: /tmp/gh54",
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
const OUT = values.out ?? (REDUCED ? "/tmp/gh54-reduced" : "/tmp/gh54");
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
// SECOND COPIES ON PURPOSE, gh#53's rule: a harness that imports the strings it
// asserts proves only that the content module equals itself. These are transcribed
// from the issue's AC, spec §6.6 and HR p4 — the sources the content module was
// written from — so a silent edit to either side fails here.

/** HR p4's six pillars, in the RING ORDER `content.ts` teaches them in (§6.6:
 *  governance and tools first, because section D opens on those two). The PAIRING
 *  is the claim — a relabelled box and a reordered ring both fail. */
const PILLARS = [
  ["governance", "Governance & Policies"],
  ["tools", "Tools & Platform"],
  ["people", "People & Mindset"],
  ["strategy", "Strategy & Leadership"],
  ["process", "Process & Methodology"],
  ["companions", "AI Companions"],
];

/** The hub's first line, in the title case §6.6 and the AC quote it in. The stage
 *  shouts it through `text-transform`, which is asserted separately: `textContent`
 *  staying quotable is half the decision recorded in `content.ts`. */
const HUB_LABEL = "The Enabler";

/** The hub's second line per brand (§4.4 slot 5). `general` names no organisation
 *  and registers no leader variant, so it cannot appear in `LEADER_VARIANTS`. */
const BRAND_LINE = { berau: "MineTech", gems: "DigiTech" };

/** The standing kicker — present at BOTH poses, which is what makes it standing. */
const KICKER = "AN OPERATING MODEL — NOT A DEPARTMENT, NOT A COMMITTEE";

/** F.8's leader closer (#54). The standard decks keep "this is yours — wherever you
 *  go, you carry it."; a leader deck printing that line is the failure this asserts
 *  against, and it would be invisible to anyone reading the leader deck's F.8 test. */
const F8_LEADER_CLOSER = "one person carries this — you decide whether a division does.";

/** The two figures the composed leader deck derives for this pair (§4.3: `shape` is
 *  C, and f8 is its second slot). ASSERTED, unlike gh#53's letter-agnostic check:
 *  #54's AC names C.1 → C.2 as the deliverable, so a later run that moves `shape`
 *  off C should trip this and be made to say so. */
const FIG_C1 = "— FIG. C.1·THE AGENTIC ORGANIZATION";
const FIG_C2 = "— FIG. C.2·YOUR AGENTIC OS";

// ───────────────────── timing ─────────────────────

/** Mount, before the first measurement. The hub has no reveal to wait for; this is
 *  the app booting and the font landing. */
const MOUNT_MS = 600;
/**
 * After a pose change, before anything is measured as "at rest".
 *
 * 1700 normal: the last pillar's transition starts at 630ms (`180 + 5 × 90`) and
 * runs 500ms, so the figure finishes at ≈1130ms. 900 under `reduce`: the duration
 * is squashed to 0.01ms but THE DELAY IS NOT (see the header), so the last pillar
 * still lands at ≈630ms. Neither number is slack — both are the measured finish
 * plus a margin, and the reduced one is deliberately too short to hide a transition
 * that was never squashed.
 */
const POSE_MS = REDUCED ? 900 : 1700;
/**
 * The mid-reveal sample is taken AT AN EVENT, not at a wall-clock offset, and the
 * first version of this script got that wrong in a way worth recording.
 *
 * It sampled 350ms after the keypress, reasoning that the six staggered 500ms
 * transitions overlap continuously from 180ms to 1130ms so something is always in
 * flight. Under normal motion that held. Under `--reduced` the sample came back
 * `0 0 0 0 0 0` — the reveal had not begun — and the assertion "no pillar is ever
 * mid-transition" passed by measuring a figure that had not started moving. A
 * vacuous pass on the one claim the flag exists to make.
 *
 * So the sampler POLLS until the first pillar arrives and samples THAT frame. In
 * both motion modes the instant is defined by the reveal itself: under normal motion
 * pillar 0 is caught partway up (the positive control), under `reduce` it is caught
 * already landed with its five siblings still at 0. `sampled == null` is a failure
 * rather than a pass, so a reveal that never happens can no longer report a clean
 * squashed transition.
 */
const ARRIVAL_POLL_MS = 16;
const ARRIVAL_DEADLINE_MS = 2500;

/**
 * How close a rendered edge can be asked to sit to a geometric one: 1/64px.
 *
 * NOT SLACK, AND NOT A ROUND NUMBER. Chromium lays out in `LayoutUnit`s of 1/64px
 * and truncates toward zero on the way in, so a box the module puts at x = 49.5129
 * renders at 49.5 and can render nowhere else. The first run of this script asserted
 * equality to 0.01 and failed on exactly two of six pillars — the two whose centres
 * are irrational (`cos 5π/6 × 280`), which is the engine's quantum showing through
 * and not a figure that drifted. A tolerance any wider than one LayoutUnit would
 * start hiding real drift, so it is this number and nothing rounder.
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

const n2 = (v) => Math.round(v * 100) / 100;

/** A slide's index is DISCOVERED, never hardcoded: §3 derives every position and
 *  the rest of Phase 6 inserts four more `gap` slides plus C.3 and C.4, so a literal
 *  index would check whatever slide 3 has become. */
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

function overlaps(a, b) {
  return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
}

/**
 * Everything the figure is on the stage, in STAGE COORDINATES.
 *
 * ONE `evaluate`, because every rect has to come from the same layout: measuring the
 * boxes in one round trip and the nav zone in the next is how a harness reports a
 * clearance that no single frame ever had.
 */
function measure(page, pillarIds) {
  return page.evaluate((ids) => {
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
    /** The `a` of a transform matrix — the pillars' reveal scales 0.86 → 1 on the
     *  same transform that centres them, so this is the reveal's own progress. */
    const scaleOf = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el).transform;
      return s === "none" ? 1 : new DOMMatrixReadOnly(s).a;
    };

    const pillars = {};
    for (const id of ids) {
      const box = testid(`shape-pillar-${id}`);
      const label = testid(`shape-pillar-${id}-label`);
      const icon = testid(`shape-pillar-${id}-icon`);
      const spoke = testid(`shape-spoke-${id}`);
      pillars[id] = {
        mounted: Boolean(box && label && icon && spoke),
        box: rect(box),
        label: rect(label),
        labelText: label?.textContent ?? null,
        labelTransform: css(label, "textTransform"),
        borderColor: css(box, "borderTopColor"),
        borderWidth: css(box, "borderTopWidth"),
        borderStyle: css(box, "borderTopStyle"),
        labelColor: css(label, "color"),
        iconColor: css(icon, "color"),
        iconSvgs: box ? box.querySelectorAll("svg").length : 0,
        opacity: opacity(box),
        revealScale: scaleOf(box),
        spokeStroke: css(spoke, "stroke"),
        spokeWidth: css(spoke, "strokeWidth"),
        spokeOpacity: opacity(spoke),
      };
    }

    return {
      scale,
      stage: { width: origin.width / scale, height: origin.height / scale },
      // MEASURED, not read from the geometry module — this is the floor.
      navZone: rect(at(".nav-zone")),
      navZoneCount: document.querySelectorAll(".nav-zone").length,
      // The deck's own side margins, as the chrome draws them (`left: 48; right: 48`).
      marginBand: rect(at(".fig-label")),
      headlineRow: rect(at(".slide-headline-row")),
      hub: rect(testid("shape-hub")),
      hubLabel: {
        text: testid("shape-hub-label")?.textContent ?? null,
        transform: css(testid("shape-hub-label"), "textTransform"),
      },
      brandLine: testid("shape-hub-brand-line")?.textContent ?? null,
      kicker: {
        text: testid("shape-kicker")?.textContent ?? null,
        rect: rect(testid("shape-kicker")),
      },
      figLabel: at(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
      slideIndex: stage.dataset.slideIndex,
      pillars,
      spokeCount: document.querySelectorAll('[data-testid^="shape-spoke-"]').length,
      // WHOLE DOCUMENT, not the figure's subtree: the claim is that this slide
      // introduces no SMIL anywhere, chrome included.
      smil: document.querySelectorAll(
        "animate, animateTransform, animateMotion, set, animateColor",
      ).length,
    };
  }, pillarIds);
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
const ids = PILLARS.map(([id]) => id);

/**
 * Poll the six pillars until one of them leaves opacity 0, and return THAT frame.
 *
 * A cheap `evaluate` per poll on purpose — six opacities and six matrices, not the
 * whole `measure` payload — so the round trip stays short enough that the frame it
 * returns is the reveal's first and not its fifth. See `ARRIVAL_DEADLINE_MS` for why
 * this is an event and not a wall-clock offset.
 */
async function sampleAtFirstArrival() {
  const started = Date.now();
  while (Date.now() - started < ARRIVAL_DEADLINE_MS) {
    const frame = await page.evaluate(
      (pillarIds) =>
        pillarIds.map((id) => {
          const el = document.querySelector(`[data-testid="shape-pillar-${id}"]`);
          const cs = el ? getComputedStyle(el) : null;
          return {
            id,
            opacity: cs ? parseFloat(cs.opacity) : null,
            scale: cs ? (cs.transform === "none" ? 1 : new DOMMatrixReadOnly(cs.transform).a) : null,
          };
        }),
      ids,
    );
    if (frame.some((p) => p.opacity > 0.02)) return { sample: frame, elapsed: Date.now() - started };
    await page.waitForTimeout(ARRIVAL_POLL_MS);
  }
  return { sample: null, elapsed: Date.now() - started };
}

/** Walk to a pose from a fresh mount, so no pose inherits another's state. */
async function atPose(variant, index, pose) {
  await page.goto(url(variant, { slide: index }), { waitUntil: "networkidle" });
  await stage.waitFor();
  await page.waitForTimeout(MOUNT_MS);
  for (let i = 0; i < pose; i++) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(POSE_MS);
  }
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
    `measuring both leader decks: ${LEADER_VARIANTS.join(", ")}\n`,
);

// ───────────────── the stage, and the floor it draws ─────────────────

await atPose(PRIMARY, primaryIndex, 1);
const base = await measure(page, ids);

// Every number below is a stage coordinate BECAUSE the conversion divides the scale
// out. This asserts the conversion had nothing to do, which is the only way to know
// the raw rects and the converted ones are the same numbers at this viewport.
check("the 1280×720 viewport renders the stage 1:1", [base.scale, base.stage.width, base.stage.height], [1, 1280, 720]);
check("exactly one .nav-zone on the stage", base.navZoneCount, 1);
console.log(
  `      .nav-zone measured  top ${n2(base.navZone.top)}  height ${n2(base.navZone.height)}\n` +
    `      margin band         ${n2(base.marginBand.left)}…${n2(base.marginBand.right)}\n` +
    `      headline row bottom ${n2(base.headlineRow.bottom)}`,
);

/** THE FLOOR, and the only one this script uses. Measured off `.nav-zone` itself. */
const NAV_TOP = base.navZone.top;
/** THE MARGINS, measured off the chrome that draws them. */
const MARGIN = { left: base.marginBand.left, right: base.marginBand.right };
/** THE CEILING. The figure must start under the headline row the deck rendered. */
const HEADLINE_BOTTOM = base.headlineRow.bottom;

// The cross-checks the import is allowed to make: the module's restatements of the
// deck's CSS have to equal what the deck actually drew. These are the assertions
// that would have caught the prototype — its floor was the same 632 and its box
// bottom was 658, and nothing measured either.
check(`geometry NAV_ZONE_TOP ${NAV_ZONE_TOP} equals the measured .nav-zone top`, NAV_ZONE_TOP, n2(NAV_TOP));
check(`geometry SIDE_MARGIN ${SIDE_MARGIN} equals the measured margin band`, [SIDE_MARGIN, 1280 - SIDE_MARGIN], [n2(MARGIN.left), n2(MARGIN.right)]);
check(`geometry FIGURE_CEILING ${FIGURE_CEILING} is under the rendered headline row`, FIGURE_CEILING > HEADLINE_BOTTOM, true);

// ───────────────── the motion contract, sampled mid-reveal ─────────────────
//
// ONE BRAND, and stated rather than assumed: the reveal's timings are constants in
// `PillarOrbit` and no brand axis reaches them, so sampling both would measure the
// same two numbers twice.

await page.goto(url(PRIMARY, { slide: primaryIndex }), { waitUntil: "networkidle" });
await stage.waitFor();
await page.waitForTimeout(MOUNT_MS);
await page.keyboard.press("Space");
const arrival = await sampleAtFirstArrival();
check(
  `the reveal begins within ${ARRIVAL_DEADLINE_MS}ms of the keypress, so there is a frame to sample`,
  arrival.sample != null,
  true,
);
if (arrival.sample) {
  /** A pillar caught BETWEEN its two frames — a partial opacity, or a scale between
   *  the 0.86 it reveals from and the 1 it rests at. */
  const inFlight = arrival.sample
    .filter((p) => (p.opacity > 0.02 && p.opacity < 0.98) || (p.scale > 0.87 && p.scale < 0.999))
    .map((p) => p.id);
  console.log(
    `      first pillar arrived ${arrival.elapsed}ms after the keypress — that frame reads ` +
      `opacity ${arrival.sample.map((p) => n2(p.opacity)).join(" ")}`,
  );
  // THE SWEEP, and it is the same claim in both motion modes: the ring reveals in ring
  // order from twelve o'clock, so the FIRST pillar to leave 0 is index 0 and no other.
  // Six boxes arriving together would read as one flash of six rather than six of one
  // thing (§6.6), and it is the stagger that says otherwise.
  check(
    "the reveal sweeps from the top of the ring — one pillar has left 0, and it is governance",
    arrival.sample.filter((p) => p.opacity > 0.02).map((p) => p.id),
    ["governance"],
  );
  if (REDUCED) {
    // THE CLAIM: `reduce` squashes the durations, so no pillar is ever caught between
    // its two frames — each is either not yet arrived or fully arrived. The stagger
    // DELAY still runs (see the header), which is why the frame below shows arrived
    // and not-yet-arrived pillars side by side and nothing in between.
    check("under reduce no pillar is ever caught mid-transition", inFlight, []);
  } else {
    // THE POSITIVE CONTROL for the line above. If this sampler cannot catch a pillar
    // in flight when the transitions ARE running, the reduced run's empty list means
    // nothing at all.
    check(
      `under normal motion the same sampler catches a pillar in flight — ${inFlight.join(", ") || "none"}`,
      inFlight.length > 0,
      true,
    );
  }
}

// ───────────────── every brand, both poses ─────────────────

/** The measured clearance per brand, collected for the summary — the issue asks for
 *  a NUMBER, so the number is the deliverable and not the boolean beside it. */
const clearances = [];

for (const variant of LEADER_VARIANTS) {
  const brand = VARIANTS[variant].brand;
  const tag = variant.padEnd(12);
  console.log(`\n── ${variant} ─────────────────────────────────────────`);

  const index =
    variant === PRIMARY ? primaryIndex : await findSlide(page, variant, slideCount, "shape-hub");
  check(`${tag} · the figure composes into this deck`, index != null, true);
  if (index == null) continue;

  // ── POSE 0 — the hub, alone ──
  await atPose(variant, index, 0);
  await shot(`${variant}-pose0-the-enabler`);
  const p0 = await measure(page, ids);

  check(`${tag} · pose 0 · the figure is derived as ${FIG_C1}`, p0.figLabel, FIG_C1);
  check(`${tag} · pose 0 · the hub prints "${HUB_LABEL}"`, p0.hubLabel.text, HUB_LABEL);
  // The register, which is why the data can stay quotable: the room reads
  // THE ENABLER and `textContent` reads The Enabler.
  check(`${tag} · pose 0 · the hub label is uppercased by the register, not by the data`, [p0.hubLabel.transform, p0.hubLabel.text === p0.hubLabel.text.toUpperCase()], ["uppercase", false]);
  check(`${tag} · pose 0 · the brand line names ${BRAND_LINE[brand]}`, p0.brandLine, BRAND_LINE[brand]);
  check(`${tag} · pose 0 · the standing kicker stands`, p0.kicker.text, KICKER);
  // The ceiling, measured: the kicker is the lowest thing above the figure, and
  // `FIGURE_CEILING` is the module's claim about where it ends.
  check(`${tag} · pose 0 · the kicker (bottom ${n2(p0.kicker.rect.bottom)}) ends above FIGURE_CEILING ${FIGURE_CEILING}`, p0.kicker.rect.bottom <= FIGURE_CEILING, true);
  check(`${tag} · pose 0 · all six pillars are mounted`, ids.filter((id) => !p0.pillars[id].mounted), []);
  // …and every one of them is still held back. A pose-0 shot with six visible
  // pillars is a slide that has no pose 0.
  check(`${tag} · pose 0 · no pillar and no spoke has arrived yet`, ids.filter((id) => p0.pillars[id].opacity > 0.02 || p0.pillars[id].spokeOpacity > 0.02), []);
  check(`${tag} · pose 0 · zero SMIL nodes in the document`, p0.smil, 0);

  // ── POSE 1 — the six pillars, at rest ──
  await atPose(variant, index, 1);
  await shot(`${variant}-pose1-six-pillars`);
  const p1 = await measure(page, ids);

  check(`${tag} · pose 1 · the figure is still ${FIG_C1}`, p1.figLabel, FIG_C1);
  check(`${tag} · pose 1 · the hub and the kicker are still there`, [p1.hubLabel.text, p1.brandLine, p1.kicker.text], [HUB_LABEL, BRAND_LINE[brand], KICKER]);
  check(`${tag} · pose 1 · all six pillar labels, by text, in ring order`, ids.map((id) => [id, p1.pillars[id].labelText]), PILLARS);
  check(`${tag} · pose 1 · all six labels are uppercased by the register`, ids.filter((id) => p1.pillars[id].labelTransform !== "uppercase"), []);
  check(`${tag} · pose 1 · six spokes, one per pillar, and nothing else`, [p1.spokeCount, PILLAR_COUNT], [6, 6]);
  check(`${tag} · pose 1 · every spoke is drawn`, ids.filter((id) => p1.pillars[id].spokeOpacity < 0.99), []);
  // A name can be spelled right and still be absent from the icon shim's map, which
  // renders nothing and no error — one pillar that looks like it did not load.
  check(`${tag} · pose 1 · every pillar resolved its icon to an <svg>`, ids.filter((id) => p1.pillars[id].iconSvgs !== 1), []);
  check(`${tag} · pose 1 · zero SMIL nodes in the document`, p1.smil, 0);
  // THE RESTING FRAME, which is the half of "renders complete" only a browser can
  // answer — and under `--reduced` the settle budget above is shorter than the
  // unsquashed transition would need.
  check(`${tag} · pose 1 · every pillar rests at full opacity`, ids.filter((id) => p1.pillars[id].opacity < 0.999), []);
  check(`${tag} · pose 1 · every pillar rests at its settled scale, not the 0.86 it reveals from`, ids.filter((id) => Math.abs(p1.pillars[id].revealScale - 1) > 0.001), []);

  // ── NOTHING IS PRE-DIMMED (§7.1), as computed styles ──
  const borders = [...new Set(ids.map((id) => p1.pillars[id].borderColor))];
  const labels = [...new Set(ids.map((id) => p1.pillars[id].labelColor))];
  const icons = [...new Set(ids.map((id) => p1.pillars[id].iconColor))];
  const strokes = [...new Set(ids.map((id) => `${p1.pillars[id].spokeStroke} ${p1.pillars[id].spokeWidth}`))];
  const opacities = [...new Set(ids.map((id) => n2(p1.pillars[id].opacity)))];
  check(`${tag} · rest · one border colour across all six — ${borders.join(" | ")}`, borders.length, 1);
  check(`${tag} · rest · one label colour across all six — ${labels.join(" | ")}`, labels.length, 1);
  check(`${tag} · rest · one icon colour across all six — ${icons.join(" | ")}`, icons.length, 1);
  // The other half of the figure. A brightened spoke is the same forbidden state as
  // a brightened box, and the walk will reach for it first.
  check(`${tag} · rest · one spoke stroke and width across all six — ${strokes.join(" | ")}`, strokes.length, 1);
  check(`${tag} · rest · no pillar sits at a lower opacity than its siblings`, opacities, [1]);
  check(`${tag} · rest · the border is a real full-strength rule, not a hairline hint`, [p1.pillars.governance.borderStyle, p1.pillars.governance.borderWidth], ["solid", "1px"]);

  // ── THE CLEARANCE, and the rest of the layout ──
  const boxes = ids.map((id) => ({ id, ...p1.pillars[id].box }));
  const labelBoxes = ids.map((id) => ({ id, ...p1.pillars[id].label }));
  const lowestBox = boxes.reduce((a, b) => (b.bottom > a.bottom ? b : a));
  const lowestLabel = labelBoxes.reduce((a, b) => (b.bottom > a.bottom ? b : a));
  const boxClearance = NAV_TOP - lowestBox.bottom;
  const labelClearance = NAV_TOP - lowestLabel.bottom;
  clearances.push({ variant, lowestBox, boxClearance, lowestLabel, labelClearance });

  check(
    `${tag} · CLEARANCE · lowest pillar box (${lowestBox.id}) bottom ${n2(lowestBox.bottom)} is above the measured .nav-zone top ${n2(NAV_TOP)} — ${n2(boxClearance)}px`,
    lowestBox.bottom < NAV_TOP,
    true,
  );
  check(
    `${tag} · CLEARANCE · lowest label (${lowestLabel.id}) bottom ${n2(lowestLabel.bottom)} is above it too — ${n2(labelClearance)}px`,
    lowestLabel.bottom < NAV_TOP,
    true,
  );
  // NOT MERELY POSITIVE. The lowest pillar is one of the six the next ticket's walk
  // focuses, and a focused pillar is bigger than a resting one — `FOCUS_GROWTH_RESERVE`
  // is what the walk is allowed to spend, so a clearance under it passes today and
  // fails one ticket later.
  check(
    `${tag} · CLEARANCE · ${n2(boxClearance)}px leaves the walk its FOCUS_GROWTH_RESERVE of ${FOCUS_GROWTH_RESERVE}px`,
    boxClearance > FOCUS_GROWTH_RESERVE,
    true,
  );

  check(
    `${tag} · layout · every pillar box is inside the measured ${n2(MARGIN.left)}…${n2(MARGIN.right)} margins`,
    boxes.filter((b) => b.left < MARGIN.left || b.right > MARGIN.right).map((b) => `${b.id} ${n2(b.left)}…${n2(b.right)}`),
    [],
  );
  check(
    `${tag} · layout · every pillar box starts below the rendered headline row (${n2(HEADLINE_BOTTOM)})`,
    boxes.filter((b) => b.top < HEADLINE_BOTTOM).map((b) => `${b.id} top ${n2(b.top)}`),
    [],
  );
  // The hub is a DISC and this compares its bounding SQUARE, which is the bigger
  // shape — so a pass here is a pass against the disc with room to spare.
  check(
    `${tag} · layout · no pillar box overlaps the hub`,
    boxes.filter((b) => overlaps(b, p1.hub)).map((b) => b.id),
    [],
  );
  const collisions = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      if (overlaps(boxes[i], boxes[j])) collisions.push(`${boxes[i].id} × ${boxes[j].id}`);
    }
  }
  check(`${tag} · layout · no two pillar boxes overlap`, collisions, []);
  // Every label is INSIDE its own box — the layout decision `geometry.ts` records as
  // the reason the floor is one number and not two that can disagree.
  check(
    `${tag} · layout · every label sits inside its own box`,
    labelBoxes.filter((l, i) => l.left < boxes[i].left || l.right > boxes[i].right || l.top < boxes[i].top || l.bottom > boxes[i].bottom).map((l) => l.id),
    [],
  );

  // The module's numbers, held against the stage. `PILLAR_BOX` is `box-sizing:
  // border-box`, so a 1px border that escaped the box would show up here.
  const drift = boxes
    .map((b, i) => {
      const claimed = pillarBox(i);
      const d = Math.max(
        Math.abs(b.left - claimed.left),
        Math.abs(b.right - claimed.right),
        Math.abs(b.top - claimed.top),
        Math.abs(b.bottom - claimed.bottom),
      );
      return d > SUBPIXEL ? `${b.id} off by ${d.toFixed(4)}` : null;
    })
    .filter(Boolean);
  check(`${tag} · cross-check · every rendered box lands where geometry.ts puts it, to 1/64px`, drift, []);
  check(
    `${tag} · cross-check · the rendered box is ${PILLAR_BOX.w}×${PILLAR_BOX.h}`,
    boxes
      .filter(
        (b) =>
          Math.abs(b.width - PILLAR_BOX.w) > SUBPIXEL || Math.abs(b.height - PILLAR_BOX.h) > SUBPIXEL,
      )
      .map((b) => `${b.id} ${n2(b.width)}×${n2(b.height)}`),
    [],
  );
  // Same 1/64px tolerance, and it matters here for a reason the two integers above
  // hide: today's lowest box bottom is `400 + 174 + 36` and lands on a whole pixel,
  // so an exact comparison passes by luck. A re-cut ellipse would not.
  check(
    `${tag} · cross-check · geometry LOWEST_PILLAR_BOTTOM ${LOWEST_PILLAR_BOTTOM} / NAV_ZONE_CLEARANCE ${NAV_ZONE_CLEARANCE} match the measurement`,
    [
      Math.abs(LOWEST_PILLAR_BOTTOM - lowestBox.bottom) <= SUBPIXEL,
      Math.abs(NAV_ZONE_CLEARANCE - boxClearance) <= SUBPIXEL,
    ],
    [true, true],
  );

  // ── the numbers, printed whether or not they passed ──
  const rightmost = Math.max(...boxes.map((b) => b.right));
  console.log(`\n      ${variant} — the figure, measured in stage coordinates`);
  for (const b of boxes) {
    const l = labelBoxes[ids.indexOf(b.id)];
    console.log(
      `      ${b.id.padEnd(12)} box x ${String(n2(b.left)).padStart(6)}…${String(n2(b.right)).padStart(6)}  y ${String(n2(b.top)).padStart(6)}…${String(n2(b.bottom)).padStart(6)}   label bottom ${String(n2(l.bottom)).padStart(6)}`,
    );
  }
  console.log(
    `      hub          x ${n2(p1.hub.left)}…${n2(p1.hub.right)}  y ${n2(p1.hub.top)}…${n2(p1.hub.bottom)}\n` +
      `      CLEARANCE    box ${n2(boxClearance)}px · label ${n2(labelClearance)}px  under .nav-zone top ${n2(NAV_TOP)}\n` +
      `      reserved column gap — rightmost box edge ${n2(rightmost)} to WALK_COLUMN_LEFT ${WALK_COLUMN_LEFT}: ${n2(WALK_COLUMN_LEFT - rightmost)}px`,
  );

  // ── C.1 → C.2, walked ──
  //
  // FORWARD FROM THE LAST POSE, not by URL: the AC is about what the presenter's
  // next keypress does, and `?slide=` would prove only that the slide after this one
  // exists somewhere in the deck.
  await page.keyboard.press("Space");
  await page.waitForTimeout(POSE_MS);
  const next = await page.evaluate(() => ({
    slideIndex: document.querySelector('[data-testid="slide"]').dataset.slideIndex,
    figLabel: document.querySelector(".fig-label")?.innerText.replace(/\s+/g, " ").trim() ?? null,
    isF8: Boolean(document.querySelector('[data-testid="f8-headline"]')),
    shape: Boolean(document.querySelector('[data-testid="shape-hub"]')),
  }));
  check(`${tag} · C.2 · one step past the last pose lands on the next slide`, [next.slideIndex, next.shape], [String(index + 1), false]);
  check(`${tag} · C.2 · that slide is f8-your-agentic-os`, next.isF8, true);
  check(`${tag} · C.2 · and it prints ${FIG_C2}`, next.figLabel, FIG_C2);

  // F.8's own second pose, where the closer reveals.
  await page.keyboard.press("Space");
  await page.waitForTimeout(POSE_MS);
  await shot(`${variant}-c2-f8-closer`);
  const closer = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="f8-tagline"]');
    return el ? { text: el.textContent, opacity: parseFloat(getComputedStyle(el).opacity) } : null;
  });
  check(`${tag} · C.2 · the leader closer renders, revealed`, [closer?.text, closer?.opacity], [F8_LEADER_CLOSER, 1]);
}

// ───────────────── the console ─────────────────

check("console clean across every brand and both poses", noise, []);

// ───────────────── the deliverable ─────────────────

console.log(`\n      THE MEASURED CLEARANCE${REDUCED ? " (reduced motion)" : ""}`);
console.log(`      .nav-zone top ${n2(NAV_TOP)} — measured off the element, not read from geometry.ts`);
for (const c of clearances) {
  console.log(
    `      ${c.variant.padEnd(12)} lowest box ${c.lowestBox.id} bottom ${n2(c.lowestBox.bottom)} → ${n2(c.boxClearance)}px   ` +
      `lowest label ${c.lowestLabel.id} bottom ${n2(c.lowestLabel.bottom)} → ${n2(c.labelClearance)}px`,
  );
}

console.log(`\n${failures ? `${failures} FAILURE(S)` : "all checks passed"} · shots: ${OUT}`);
await browser.close();
process.exit(failures ? 1 : 0);
