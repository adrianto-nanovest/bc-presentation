// THE LOCK AND THE TWO ROADS, IN A REAL ENGINE — the browser evidence for D.3 after the
// 2026-08-14 redraw.
//
// IT REPLACES `scripts/gh57-verify.mjs` FOR THIS SLIDE. That harness is the record of what #57
// shipped — a two-column stage of type, a bordered card, a 26px two-line verdict at y=533 — and
// none of that contract exists any more. It is left in the tree as history; do not run it
// against this slide.
//
// `tests/unit/invest-chicken-egg.test.tsx` owns everything jsdom can see, and it says in its own
// first paragraph what it cannot: jsdom has no layout engine, so it computes no text width, no
// line count, no colour, no transform and no animation. Every claim below turns on one of those
// five, and each one is a way this particular figure can be wrong on a projector while every
// unit test passes:
//
//   1. ZERO SMIL, AT EVERY POSE, UNDER EITHER MOTION PREFERENCE — and it costs more to keep than
//      it used to. Until the redraw this slide mounted NO `<svg>` at all, so the rule was closed
//      by construction. It now mounts one, with eleven animated marks in it. A single
//      `<animate>` element would be invisible to the reduced-motion squash in `globals.css` and
//      would have to be gated behind a `matchMedia` at mount.
//
//   2. THE SHORT ROAD IS VISIBLE UNDER `prefers-reduced-motion: reduce` — the one failure mode
//      `chicken-egg.css` had to write an extra declaration for, and therefore the one most
//      worth measuring. The road is drawn with `stroke-dasharray: <its own length>` and an
//      initial `stroke-dashoffset` of the same length; the `ce-draw` keyframe walks that offset
//      to zero. `animation: none` alone would leave the offset at full length and the road
//      INVISIBLE — a motion preference silently deleting an argument. The stylesheet zeroes it
//      by hand and this reads the computed value back.
//
//   3. THE LOCK ACTUALLY TRAVELS. The claim the whole act change rests on is that the padlock in
//      act 1's ring and the glyph at the long road's head are ONE element. jsdom can only see
//      the class name; a browser can read the computed matrix, and the assertion is that it
//      changes between pose 0 and pose 1 and that the element's own box lands inside the token
//      circle it is supposed to park in.
//
//   4. EVERY STRING THAT COULD SILENTLY WRAP — TWO CHANNELS, EACH BLIND TO THE OTHER'S FAILURE,
//      which is the asymmetry `scripts/gh56-verify.mjs` established and this file inherits:
//        · `scrollWidth` vs `clientWidth` catches an over-long `nowrap` LABEL (the clauses, both
//          road labels, both token labels), and is VACUOUS on every wrapping box.
//        · The rendered LINE COUNT — one `Range` per text node, its client rects grouped by
//          line-box top — catches the wrap and is the only channel that can. It is the only way
//          to check the four cost boxes, whose constraint is "at most two lines inside a 62px
//          box" and whose longest string (§6.7's 57-character fourth cost) is the string the
//          grid was cut for.
//      The four prose lines are ONE line each by budget, and the owner's instruction for the
//      thesis was "make it one line" — so that one is asserted by name.
//
//   5. THE TOKEN LABELS DO NOT RUN UNDER THE GRID. "THE DEADLOCK" at the tier every other mono
//      label on this stage takes measured ≈88px against the 84px it has, and crossed the first
//      cost box in the first render of this figure. It is 9.5px now. This is the check that
//      found it and the check that keeps it found.
//
//   6. NOTHING CROSSES THE NAVBAR'S HOVER BAND OR THE STAGE'S MARGINS, measured off the ELEMENTS
//      rather than off the constants the renderer read — which is the only version of that check
//      that can fail.
//
//   7. BOTH LEADER DECKS RENDER THE SAME BYTES. §4.4 gives this slide no brand axis, and the
//      claim "one story, byte-identical in both leader decks" is a diff a browser can run and a
//      unit test can only approximate.
//
// USAGE
//   node scripts/d3-figure-verify.mjs [--out=<dir>]
//     --out=<dir>   Where the frames land. Default: /tmp/d3-figure
//     DECK_URL      Base url to render. Default: http://localhost:5173
//
// Exits 0 with a report, or 1 with a numbered list of failures.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT =
  process.argv.slice(2).find((a) => a.startsWith("--out="))?.slice(6) ?? "/tmp/d3-figure";
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
mkdirSync(OUT, { recursive: true });

/** The two leader decks. D.3 composes into these and into no standard deck. */
const VARIANTS = ["berau-leader", "gems-leader"];

/**
 * The content ids, TRANSCRIBED and not imported.
 *
 * This is a bare-node script and `src/slides/leader-invest/content.ts` is a `.ts` module written
 * without file extensions, which `node --experimental-strip-types` answers `ERR_MODULE_NOT_FOUND`
 * for. The trade is a second copy of eight ids in exchange for a harness that runs with no build
 * step — and a second copy is the right side of that trade, because a silent reorder of either
 * list should fail this file rather than be followed by it.
 */
const COST_IDS = ["work-lost", "no-audit-trail", "data-outside-boundary", "usage-invisible"];
const TERM_IDS = ["seats", "use-case", "kill-criterion", "spend-cap"];

/** Transcribed from `src/slides/leader-invest/chicken-egg-geometry.ts`, for the same reason. */
const NAV_ZONE_TOP = 632;
const SIDE_MARGIN = 48;
const CONTENT_RIGHT = 1232;
const BAND_TOP = 156;
const LANE_LEFT = 132;
const TOKEN_CX = 90;
const TOKEN_R = 32;
const LONG_LANE_Y = 396;
const COST_BOX_MAX_LINES = 2;

/** Every stage-relative box, and what its measure has to survive. */
const NOWRAP_LABELS = [
  "chicken-egg-clause-0",
  "chicken-egg-clause-1",
  "chicken-egg-pilot-eyebrow",
  "chicken-egg-costs-eyebrow",
  "chicken-egg-key-label",
  "chicken-egg-lock-label",
];

/** The five prose lines, every one of which is cut for exactly one line. */
const ONE_LINERS = [
  "chicken-egg-turn",
  "chicken-egg-workaround",
  "chicken-egg-verdict",
  "chicken-egg-thesis",
];

/** Boxes whose left/top are STAGE-relative. The plate's two children are excluded: they are
 *  positioned inside it, so a margin rule over them compares 16 against 48. */
const STAGE_BOXES = [
  "chicken-egg-turn",
  "chicken-egg-pilot-eyebrow",
  "chicken-egg-key-label",
  ...TERM_IDS.map((id) => `chicken-egg-term-${id}`),
  "chicken-egg-workaround",
  "chicken-egg-costs-eyebrow",
  "chicken-egg-lock-label",
  ...COST_IDS.map((id) => `chicken-egg-cost-${id}`),
  "chicken-egg-verdict",
  "chicken-egg-rule",
  "chicken-egg-thesis",
  "chicken-egg-proof-plate",
];

const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]|Download the React DevTools/;

const failures = [];
const notes = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

/** The slide's index in the composed deck — found by looking for the figure rather than
 *  transcribed, because §3.4 R2 renumbers everything behind this run and a literal index is a
 *  bet on a composition. */
async function findSlide(page, variant) {
  await page.goto(`${BASE}?variant=${variant}`, { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i += 1) {
    await page.goto(`${BASE}?variant=${variant}&slide=${i}`, { waitUntil: "networkidle" });
    if (await page.locator('[data-testid="chicken-egg-svg"]').count()) return i;
  }
  throw new Error(`${variant}: no slide renders a chicken-egg-svg`);
}

/**
 * How many line boxes a testid's text actually occupies.
 *
 * ONE `Range` PER TEXT NODE, its client rects grouped by rounded `top`. `getClientRects()` on a
 * Range returns one rect per line box, which is the only reading of "how many lines" that
 * survives a font fallback — `scrollHeight / lineHeight` rounds, and `scrollWidth` says nothing
 * at all about a box that is allowed to wrap.
 */
function lineCounts(page, ids) {
  return page.evaluate((testIds) => {
    const out = {};
    for (const id of testIds) {
      const el = document.querySelector(`[data-testid="${id}"]`);
      if (!el) {
        out[id] = null;
        continue;
      }
      const tops = new Set();
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (rect.width > 0.5) tops.add(Math.round(rect.top));
        }
      }
      out[id] = tops.size;
    }
    return out;
  }, ids);
}

/** `scrollWidth > clientWidth` on a `nowrap` box is an overflowing label — the channel the line
 *  count is blind to, because a `nowrap` box never gains a second line. */
function overflows(page, ids) {
  return page.evaluate((testIds) => {
    const out = {};
    for (const id of testIds) {
      const el = document.querySelector(`[data-testid="${id}"]`);
      out[id] = el ? { scroll: el.scrollWidth, client: el.clientWidth } : null;
    }
    return out;
  }, ids);
}

/** Every stage box's own rect, in stage coordinates — read off the ELEMENT, which is the half a
 *  unit test cannot do. */
function boxes(page, ids) {
  return page.evaluate((testIds) => {
    const stage = document
      .querySelector(".slide, .stage, #root > div")
      .getBoundingClientRect();
    const out = {};
    for (const id of testIds) {
      const el = document.querySelector(`[data-testid="${id}"]`);
      if (!el) {
        out[id] = null;
        continue;
      }
      const r = el.getBoundingClientRect();
      out[id] = {
        left: r.left - stage.left,
        top: r.top - stage.top,
        right: r.right - stage.left,
        bottom: r.bottom - stage.top,
      };
    }
    return out;
  }, ids);
}

async function gotoPose(page, pose) {
  for (let i = 0; i < pose; i += 1) {
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(180);
  }
  // Longer than the slowest arrival on any pose (the verdict at 930ms) plus its 450ms
  // transition, so what is measured is the resting frame and not a frame of the build.
  await page.waitForTimeout(1600);
}

async function run(browser, variant, reduced) {
  const tag = `${variant}${reduced ? "-reduced" : ""}`;
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !DEV_SERVER_NOISE.test(m.text())) errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  const slide = await findSlide(page, variant);
  const open = () =>
    page.goto(`${BASE}?variant=${variant}&slide=${slide}`, { waitUntil: "networkidle" });

  // ── 1 · zero SMIL, every pose ───────────────────────────────────────────────
  await open();
  await page.waitForSelector('[data-testid="chicken-egg-svg"]');
  await page.waitForTimeout(1200);
  for (const pose of [0, 1, 2, 3]) {
    if (pose > 0) {
      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(1400);
    }
    const census = await page.evaluate(() => ({
      smil: document.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
        .length,
      svg: document.querySelectorAll(".slide-stage svg, #root svg").length,
    }));
    check(census.smil === 0, `${tag} pose ${pose}: ${census.smil} SMIL nodes (must be 0)`);
    await page.screenshot({ path: `${OUT}/${tag}-pose${pose}.png` });
  }

  // ── 2 · the short road is painted, whatever the motion preference ───────────
  // Measured at pose 3, where the road has been on the stage for two poses. Under `reduce` the
  // `ce-draw` animation is removed outright, so the ONLY thing keeping the line visible is the
  // hand-written `stroke-dashoffset: 0` in the media block.
  const road = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="chicken-egg-short-road"] line');
    if (!el) return null;
    const cs = getComputedStyle(el);
    const box = el.getBoundingClientRect();
    return {
      offset: cs.strokeDashoffset,
      dash: cs.strokeDasharray,
      animation: cs.animationName,
      width: box.width,
      opacity: getComputedStyle(el.closest("g")).opacity,
    };
  });
  check(road !== null, `${tag}: the short road is not on the stage at pose 3`);
  if (road) {
    check(
      parseFloat(road.offset) === 0,
      `${tag}: the short road rests at stroke-dashoffset ${road.offset} — it must be 0 or the ` +
        "road is invisible (this is the failure the reduced-motion block exists for)",
    );
    check(
      Number(road.opacity) === 1,
      `${tag}: the short road's group rests at opacity ${road.opacity} (must be 1)`,
    );
    check(road.width > 800, `${tag}: the short road measures ${road.width}px (expected > 800)`);
    notes.push(
      `${tag} · short road: dash ${road.dash}, offset ${road.offset}, animation "${road.animation}"`,
    );
  }

  // ── 3 · the two loops, and what `reduce` does to them ──────────────────────
  const flows = await page.evaluate(() => {
    const arc = document.querySelector('[data-testid="chicken-egg-arcs"] path');
    const long = document.querySelector('[data-testid="chicken-egg-long-road"] line');
    const echo = document.querySelector(".ce-ban-echo");
    return {
      arc: arc ? getComputedStyle(arc).animationName : null,
      long: long ? getComputedStyle(long).animationName : null,
      echo: echo ? getComputedStyle(echo).display : null,
    };
  });
  if (reduced) {
    check(flows.arc === "none", `${tag}: the ring still runs "${flows.arc}" under reduce`);
    check(flows.long === "none", `${tag}: the long road still runs "${flows.long}" under reduce`);
    check(flows.echo === "none", `${tag}: the ban echo is still displayed under reduce`);
  } else {
    check(flows.arc === "ce-loop-flow", `${tag}: the ring runs "${flows.arc}", not ce-loop-flow`);
    check(
      flows.long === "ce-road-flow",
      `${tag}: the long road runs "${flows.long}", not ce-road-flow`,
    );
    check(flows.echo !== "none", `${tag}: the ban echo is not displayed`);
  }

  // ── 4 · every wrap channel, at the fullest pose ─────────────────────────────
  const lines = await lineCounts(page, [
    ...ONE_LINERS,
    ...COST_IDS.map((id) => `chicken-egg-cost-${id}`),
    ...TERM_IDS.map((id) => `chicken-egg-term-${id}`),
    "chicken-egg-destination-eyebrow",
  ]);
  for (const id of ONE_LINERS) {
    check(lines[id] === 1, `${tag}: "${id}" sets ${lines[id]} lines — it is cut for 1`);
  }
  for (const id of COST_IDS) {
    const key = `chicken-egg-cost-${id}`;
    check(
      lines[key] <= COST_BOX_MAX_LINES,
      `${tag}: cost "${id}" sets ${lines[key]} lines — the box holds ${COST_BOX_MAX_LINES}`,
    );
  }
  for (const id of TERM_IDS) {
    const key = `chicken-egg-term-${id}`;
    check(lines[key] === 1, `${tag}: term "${id}" sets ${lines[key]} lines — the box holds 1`);
  }
  notes.push(`${tag} · line counts: ${JSON.stringify(lines)}`);

  const overflow = await overflows(page, NOWRAP_LABELS);
  for (const id of NOWRAP_LABELS) {
    const box = overflow[id];
    check(box !== null, `${tag}: "${id}" is not on the stage`);
    if (box) {
      check(
        box.scroll <= box.client,
        `${tag}: "${id}" overflows its measure (${box.scroll} > ${box.client})`,
      );
    }
  }

  // NO BOX MAY CLIP ITS OWN CONTENT VERTICALLY either — the failure a line count misses when a
  // box is cut for two lines and the type inside it needs three.
  const clipped = await page.evaluate((ids) =>
    ids
      .map((id) => {
        const el = document.querySelector(`[data-testid="${id}"]`);
        return el && el.scrollHeight > el.clientHeight + 1
          ? `${id} (${el.scrollHeight} > ${el.clientHeight})`
          : null;
      })
      .filter(Boolean),
  [...STAGE_BOXES, "chicken-egg-destination-eyebrow"]);
  check(clipped.length === 0, `${tag}: boxes clip their own type — ${clipped.join(", ")}`);

  // ── 5 · the token labels stop short of the grid ────────────────────────────
  const stage = await boxes(page, STAGE_BOXES);
  for (const id of ["chicken-egg-key-label", "chicken-egg-lock-label"]) {
    const box = stage[id];
    if (!box) continue;
    check(
      box.right <= LANE_LEFT,
      `${tag}: "${id}" ends at x=${box.right.toFixed(1)} and runs under the item grid at ` +
        `x=${LANE_LEFT}`,
    );
  }

  // ── 6 · the margins and the hover band, off the elements ───────────────────
  let lowest = { id: "", bottom: 0 };
  for (const [id, box] of Object.entries(stage)) {
    check(box !== null, `${tag}: "${id}" is missing from the stage`);
    if (!box) continue;
    check(box.left >= SIDE_MARGIN - 0.5, `${tag}: "${id}" starts at x=${box.left.toFixed(1)}`);
    check(box.right <= CONTENT_RIGHT + 0.5, `${tag}: "${id}" ends at x=${box.right.toFixed(1)}`);
    check(box.top >= BAND_TOP - 0.5, `${tag}: "${id}" starts at y=${box.top.toFixed(1)}`);
    check(
      box.bottom <= NAV_ZONE_TOP + 0.5,
      `${tag}: "${id}" ends at y=${box.bottom.toFixed(1)}, inside the NavBar band`,
    );
    if (box.bottom > lowest.bottom) lowest = { id, bottom: box.bottom };
  }
  check(
    lowest.id === "chicken-egg-thesis",
    `${tag}: the lowest box is "${lowest.id}", not the thesis`,
  );
  notes.push(
    `${tag} · floor: ${lowest.id} bottom ${lowest.bottom.toFixed(1)}, clearance ` +
      `${(NAV_ZONE_TOP - lowest.bottom).toFixed(1)}px`,
  );

  // ── 7 · the lock travels, and lands in its token ───────────────────────────
  const parked = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="chicken-egg-lock"]');
    const r = el.getBoundingClientRect();
    const stageBox = document
      .querySelector(".slide, .stage, #root > div")
      .getBoundingClientRect();
    return {
      transform: getComputedStyle(el).transform,
      cx: (r.left + r.right) / 2 - stageBox.left,
      cy: (r.top + r.bottom) / 2 - stageBox.top,
      w: r.width,
      h: r.height,
    };
  });
  await open();
  await page.waitForTimeout(1400);
  const atRing = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="chicken-egg-lock"]');
    return { transform: getComputedStyle(el).transform, w: el.getBoundingClientRect().width };
  });
  check(
    atRing.transform !== parked.transform,
    `${tag}: the lock's transform is identical at pose 0 and pose 3 ("${parked.transform}") — ` +
      "it is not travelling",
  );
  check(
    parked.w < atRing.w,
    `${tag}: the parked lock is ${parked.w.toFixed(1)}px wide against ${atRing.w.toFixed(1)} at ` +
      "the ring — it must shrink into its token",
  );
  check(
    Math.hypot(parked.cx - TOKEN_CX, parked.cy - LONG_LANE_Y) <= TOKEN_R,
    `${tag}: the parked lock centres on (${parked.cx.toFixed(1)}, ${parked.cy.toFixed(1)}), ` +
      `outside the token at (${TOKEN_CX}, ${LONG_LANE_Y}) r=${TOKEN_R}`,
  );
  notes.push(
    `${tag} · lock: ${atRing.w.toFixed(1)}px at the ring → ${parked.w.toFixed(1)}px in its ` +
      `token at (${parked.cx.toFixed(1)}, ${parked.cy.toFixed(1)})`,
  );

  check(errors.length === 0, `${tag}: console errors — ${errors.join(" | ")}`);
  await context.close();
  return { slide, stage };
}

const browser = await chromium.launch();
const rendered = {};
for (const variant of VARIANTS) {
  rendered[variant] = (await run(browser, variant, false)).stage;
  await run(browser, variant, true);
}
await browser.close();

// ── 8 · one story, byte-identical in both leader decks ───────────────────────
// §4.4's table of seven brand × deckSet slots does not list this slide, so the two leader decks
// must render the same figure in the same place. Compared as JSON over every stage box, which is
// the strongest form of that claim a harness can make.
const a = JSON.stringify(rendered[VARIANTS[0]]);
const b = JSON.stringify(rendered[VARIANTS[1]]);
check(a === b, "the two leader decks render different boxes — this slide has no brand axis");

console.log("── D.3 · THE LOCK AND THE TWO ROADS ──────────────────────────────");
for (const note of notes) console.log(`  ${note}`);
console.log(`  frames → ${OUT}`);
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  failures.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  process.exit(1);
}
console.log("\nall checks passed.");
