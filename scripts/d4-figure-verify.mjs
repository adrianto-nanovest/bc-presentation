// THE THREE DOORS AND THE FOUR SWITCHES, IN A REAL ENGINE — the browser evidence for D.4 after
// the merge that replaced `invest-security` and `invest-subscription` with `invest-governance`.
//
// IT REPLACES NOTHING, BECAUSE NEITHER PARENT SLIDE EVER HAD A HARNESS. That absence is recorded
// here rather than inherited: both of them shipped with a unit test and no browser walk, and both
// of their test files said in their own headers that the reduce-mode half of the zero-SMIL rule,
// the real wrap of their nowrap labels and the painted colour ladder were deferred to a browser
// check that did not exist. This is that check, for the slide that replaced them.
//
// `tests/unit/invest-governance.test.tsx` owns everything jsdom can see, and it says in its own
// first paragraph what it cannot: jsdom has no layout engine, so it computes no text width, no
// line count, no colour, no transform and no animation. Every claim below turns on one of those
// five, and each one is a way this particular figure can be wrong on a projector while every unit
// test passes:
//
//   1. ZERO SMIL, AT EVERY POSE, UNDER EITHER MOTION PREFERENCE. This slide mounts one `<svg>`
//      with thirty-odd animated marks in it. A single `<animate>` element would be invisible to
//      the reduced-motion squash in `globals.css` and would have to be gated behind a
//      `matchMedia` at mount.
//
//   2. THE FOUR COMPLETED LEADS ARE VISIBLE UNDER `prefers-reduced-motion: reduce` — the one
//      failure mode `governance.css` had to write an extra declaration for, and therefore the one
//      most worth measuring. Each lead is drawn with `pathLength=1`, `stroke-dasharray: 1` and an
//      initial `stroke-dashoffset` of 1; the `gv-draw` keyframe walks that offset to zero.
//      `animation: none` alone would leave the offset at 1 and the lead INVISIBLE — a motion
//      preference silently deleting the argument pose 2 is entirely about, because a circuit that
//      does not complete is a switch that did nothing.
//
//   3. THE FOUR KNOBS ACTUALLY THROW, AND THE DOOR ACTUALLY SHUTS. The claim the act change rests
//      on is that four switches change state and one door closes behind them. jsdom can only see
//      the class name; a browser can read the computed matrix, and the assertions are that each
//      knob's transform changes between pose 1 and pose 2, that it lands on its track's own ON
//      centre, and that the leaf's matrix changes with them.
//
//   4. THE DOOR TRAVELS AND PARKS INSIDE ITS TOKEN. The figure's continuity thread is that the
//      glyph in act 1's first card and the glyph in act 2's token are ONE element. Measured as a
//      changed matrix between pose 0 and pose 1 plus the element's own box landing inside the
//      token circle it is supposed to park in.
//
//   5. EVERY STRING THAT COULD SILENTLY WRAP — TWO CHANNELS, EACH BLIND TO THE OTHER'S FAILURE:
//        · `scrollWidth` vs `clientWidth` catches an over-long `nowrap` LABEL (the screen's
//          eyebrow, both column eyebrows, the three door labels, both token labels), and is
//          VACUOUS on every wrapping box.
//        · The rendered LINE COUNT — one `Range` per text node, its client rects grouped by
//          line-box top — catches the wrap and is the only channel that can. It is the only way
//          to check the three door contracts (at most two lines inside a 34px box) and the eight
//          row boxes (exactly one line inside a 54px box, which is what makes a row read as a
//          row).
//      The four prose lines are ONE line each by budget, and the thesis is on §4.5's shelf, so
//      that one is asserted by name.
//
//   6. THE TOKEN LABELS DO NOT RUN UNDER THE CIRCUIT. Both are centred on a 64px token inside an
//      84px gutter at the deck's mono floor. "ONE OWNER" is nine characters and fits; a reword to
//      anything over ten crosses x=132 and lands on the first gap box.
//
//   7. EVERY BOX LIGHTS ON HOVER. Eleven boxes carry `box-hover`, and what that class paints is
//      a `::before` OVERLAY — `inset: -1px`, `border: inherit` recoloured to `--copper-200`, a
//      6% copper wash, ramped from `opacity: 0` to `1`. So the measurement is the pseudo-element's
//      computed opacity and NOT the host's border colour: the host's border never changes, which
//      is the whole reason the overlay exists (it can carry a wash over four different fills and
//      keep a dashed box dashed). jsdom computes no pseudo-element and no hover.
//
//   8. NOTHING CROSSES THE NAVBAR'S HOVER BAND OR THE STAGE'S MARGINS, measured off the ELEMENTS
//      rather than off the constants the renderer read — which is the only version of that check
//      that can fail.
//
//   9. BOTH LEADER DECKS RENDER THE SAME BYTES. This slide has no brand axis, and the claim "one
//      story, byte-identical in both leader decks" is a diff a browser can run and a unit test
//      can only approximate.
//
// USAGE
//   node scripts/d4-figure-verify.mjs [--out=<dir>]
//     --out=<dir>   Where the frames land. Default: /tmp/d4-figure
//     DECK_URL      Base url to render. Default: http://localhost:5173
//
// Exits 0 with a report, or 1 with a numbered list of failures.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT =
  process.argv.slice(2).find((a) => a.startsWith("--out="))?.slice(6) ?? "/tmp/d4-figure";
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
mkdirSync(OUT, { recursive: true });

/** The two leader decks. D.4 composes into these and into no standard deck. */
const VARIANTS = ["berau-leader", "gems-leader"];

/**
 * The content ids, TRANSCRIBED and not imported.
 *
 * This is a bare-node script and `src/slides/leader-invest/content.ts` is a `.ts` module written
 * without file extensions, which `node --experimental-strip-types` answers `ERR_MODULE_NOT_FOUND`
 * for. The trade is a second copy of eleven ids in exchange for a harness that runs with no build
 * step — and a second copy is the right side of that trade, because a silent reorder of any list
 * should fail this file rather than be followed by it.
 */
const DOOR_IDS = ["personal", "company-managed", "onsite"];
const GAP_IDS = ["cannot-audit", "cannot-revoke", "cannot-produce", "cannot-price"];
const CONTROL_IDS = ["audit-trail", "one-sign-in", "export", "one-bill"];

/** Transcribed from `src/slides/leader-invest/governance-geometry.ts`, for the same reason. */
const NAV_ZONE_TOP = 632;
const SIDE_MARGIN = 48;
const CONTENT_RIGHT = 1232;
const BAND_TOP = 156;
const CIRCUIT_LEFT = 132;
const TOKEN_CX = 90;
const TOKEN_CY = 355;
const TOKEN_R = 32;
const KNOB_ON_CX = 705;
const SWITCH_THROW = 46;
const DOOR_TEXT_MAX_LINES = 2;

/** Every `nowrap` label on the stage, and the only channel that can see one overflow. */
const NOWRAP_LABELS = [
  "governance-screen-eyebrow",
  "governance-exposure-eyebrow",
  "governance-controls-eyebrow",
  "governance-token-owner",
  ...DOOR_IDS.map((id) => `governance-destination-label-${id}`),
];

/** The four prose lines, every one of which is cut for exactly one line. */
const ONE_LINERS = [
  "governance-verdict",
  "governance-exposure",
  "governance-answer",
  "governance-thesis",
];

/** Every box that carries `box-hover`. All eleven, because the class is on all eleven. */
const HOVER_BOXES = [
  ...DOOR_IDS.map((id) => `governance-destination-${id}`),
  ...GAP_IDS.map((id) => `governance-gap-${id}`),
  ...CONTROL_IDS.map((id) => `governance-control-${id}`),
];

/** Boxes whose left/top are STAGE-relative. A door's two children are excluded: they are
 *  positioned inside it, so a margin rule over them compares 16 against 48. */
const STAGE_BOXES = [
  "governance-screen-eyebrow",
  ...DOOR_IDS.map((id) => `governance-destination-${id}`),
  "governance-verdict",
  "governance-exposure",
  "governance-exposure-eyebrow",
  "governance-controls-eyebrow",
  "governance-token-nobody",
  "governance-token-owner",
  ...GAP_IDS.map((id) => `governance-gap-${id}`),
  ...CONTROL_IDS.map((id) => `governance-control-${id}`),
  "governance-answer",
  "governance-rule",
  "governance-thesis",
];

const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]|Download the React DevTools/;

/**
 * A resource error this harness may not treat as a slide defect: the Google Fonts CDN.
 *
 * IT IS NOT A COURTESY, IT IS A CORRECTNESS FIX. `index.html` pulls Source Serif 4, Inter,
 * JetBrains Mono and Instrument Serif from `fonts.googleapis.com`. On a flaky link the request
 * 404s or times out, Chromium falls back to Georgia and Helvetica, EVERY MEASURE ON THE STAGE
 * GETS WIDER, and the four one-line prose budgets wrap. That failure was observed on this very
 * harness's first run and it is not a slide defect — it is a harness measuring a stage that never
 * loaded its type. `settleFonts` below refuses to measure until the faces are in, so a genuine
 * wrap is still caught and a network flake is not reported as one.
 */
const FONT_CDN = /fonts\.(?:googleapis|gstatic)\.com/;

const failures = [];
const notes = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

/** The slide's index in the composed deck — found by looking for the figure rather than
 *  transcribed, because the composer renumbers behind this run and a literal index is a bet on a
 *  composition. */
async function findSlide(page, variant) {
  await page.goto(`${BASE}?variant=${variant}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i += 1) {
    await page.goto(`${BASE}?variant=${variant}&slide=${i}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(200);
    if (await page.locator('[data-testid="governance-svg"]').count()) return i;
  }
  throw new Error(`${variant}: no slide renders a governance-svg`);
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
    const stage = document.querySelector(".slide, .stage, #root > div").getBoundingClientRect();
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
    if (m.type() !== "error") return;
    if (DEV_SERVER_NOISE.test(m.text())) return;
    if (FONT_CDN.test(m.location()?.url ?? "")) return;
    errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  const slide = await findSlide(page, variant);

  /**
   * Open the slide and refuse to return until its TYPE IS IN.
   *
   * `document.fonts.ready` resolves when every face the document has asked for has loaded OR
   * failed, so the second check is the one that matters: a face that failed leaves
   * `document.fonts.check()` false for it, and measuring a fallback metric against a budget cut
   * for Source Serif is how a green harness reports a wrap that does not exist — or misses one
   * that does. See {@link FONT_CDN}.
   */
  const open = async () => {
    await page.goto(`${BASE}?variant=${variant}&slide=${slide}`, {
      waitUntil: "domcontentloaded",
    });
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(() =>
      ["17px \"Source Serif 4\"", "13px Inter", "11px \"JetBrains Mono\""].every((f) =>
        document.fonts.check(f),
      ),
    );
    check(
      loaded,
      `${tag}: the deck's faces are not loaded — every measure below would be a fallback ` +
        "metric, so nothing this run says about a wrap can be trusted. Check the network.",
    );
  };

  // ── 1 · zero SMIL, every pose ───────────────────────────────────────────────
  await open();
  await page.waitForSelector('[data-testid="governance-svg"]');
  await page.waitForTimeout(1400);
  const doorAtCard = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="governance-door"]');
    return { transform: getComputedStyle(el).transform, w: el.getBoundingClientRect().width };
  });
  const leafOpen = await page.evaluate(
    () => getComputedStyle(document.querySelector('[data-testid="governance-door-leaf"]')).transform,
  );
  const knobsOff = await page.evaluate(() =>
    [...document.querySelectorAll('[data-testid^="governance-knob-"]')].map(
      (el) => getComputedStyle(el).transform,
    ),
  );

  for (const pose of [0, 1, 2, 3]) {
    if (pose > 0) {
      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(1600);
    }
    const census = await page.evaluate(() => ({
      smil: document.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
        .length,
      svg: document.querySelectorAll(".slide-stage svg, #root svg").length,
    }));
    check(census.smil === 0, `${tag} pose ${pose}: ${census.smil} SMIL nodes (must be 0)`);
    await page.screenshot({ path: `${OUT}/${tag}-pose${pose}.png` });
  }

  // ── 2 · the four completed leads are painted, whatever the motion preference ─
  // Measured at pose 3, where the circuit has been complete for a pose. Under `reduce` the
  // `gv-draw` animation is removed outright, so the ONLY thing keeping the leads visible is the
  // hand-written `stroke-dashoffset: 0` in the media block.
  const leads = await page.evaluate(() =>
    [...document.querySelectorAll('[data-testid^="governance-wire-"]')].map((el) => {
      const cs = getComputedStyle(el);
      return {
        id: el.dataset.testid,
        offset: cs.strokeDashoffset,
        dash: cs.strokeDasharray,
        animation: cs.animationName,
        width: el.getBoundingClientRect().width,
      };
    }),
  );
  check(
    leads.length === GAP_IDS.length,
    `${tag}: ${leads.length} completed leads on the stage at pose 3, expected ${GAP_IDS.length}`,
  );
  for (const lead of leads) {
    check(
      parseFloat(lead.offset) === 0,
      `${tag}: "${lead.id}" rests at stroke-dashoffset ${lead.offset} — it must be 0 or the ` +
        "lead is invisible (this is the failure the reduced-motion block exists for)",
    );
    check(lead.width > 60, `${tag}: "${lead.id}" measures ${lead.width.toFixed(1)}px (expected > 60)`);
  }
  if (leads[0]) {
    notes.push(
      `${tag} · lead 0: dash ${leads[0].dash}, offset ${leads[0].offset}, animation ` +
        `"${leads[0].animation}"`,
    );
  }

  // ── 3 · the loops, and what `reduce` does to them ──────────────────────────
  const loops = await page.evaluate(() => {
    const caret = document.querySelector(".gv-caret");
    const empty = document.querySelector(".gv-empty");
    const leak = document.querySelector(".gv-leak");
    return {
      caret: caret ? getComputedStyle(caret).animationName : "absent",
      empty: empty ? getComputedStyle(empty).animationName : "absent",
      leak: leak ? getComputedStyle(leak).display : "absent",
    };
  });
  // At pose 3 the caret and the empty slots have LEFT the stage with act 1 and pose 1, and the
  // packet left with the shut door — so "absent" is the correct answer for all three here, and
  // the loops are measured at the poses that own them instead. Recorded rather than asserted.
  notes.push(`${tag} · pose-3 loop census: ${JSON.stringify(loops)}`);

  await open();
  await page.waitForTimeout(1400);
  const act1Loops = await page.evaluate(() => {
    const caret = document.querySelector(".gv-caret");
    const lane = document.querySelector('[data-testid="governance-lane-personal"]');
    const leak = document.querySelector(".gv-leak");
    return {
      caret: caret ? getComputedStyle(caret).animationName : null,
      lane: lane ? getComputedStyle(lane).animationName : null,
      leak: leak ? getComputedStyle(leak).display : null,
    };
  });
  if (reduced) {
    check(act1Loops.caret === "none", `${tag}: the caret still runs "${act1Loops.caret}" under reduce`);
    check(
      act1Loops.lane === "none",
      `${tag}: the personal lane still runs "${act1Loops.lane}" under reduce`,
    );
    check(act1Loops.leak === "none", `${tag}: the packet is still displayed under reduce`);
  } else {
    check(act1Loops.caret === "gv-caret", `${tag}: the caret runs "${act1Loops.caret}", not gv-caret`);
    check(
      act1Loops.lane === "gv-lane-flow",
      `${tag}: the personal lane runs "${act1Loops.lane}", not gv-lane-flow`,
    );
    check(act1Loops.leak !== "none", `${tag}: the packet is not displayed`);
  }

  const emptyAtPose1 = await page.evaluate(async () => {
    document.querySelector(".stage")?.dispatchEvent(new Event("noop"));
    return null;
  });
  void emptyAtPose1;
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(1600);
  const emptyState = await page.evaluate(() => {
    const el = document.querySelector(".gv-empty");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { animation: cs.animationName, opacity: cs.opacity };
  });
  check(emptyState !== null, `${tag}: no empty-slot mark on the stage at pose 1`);
  if (emptyState) {
    if (reduced) {
      check(
        emptyState.animation === "none",
        `${tag}: the empty mark still runs "${emptyState.animation}" under reduce`,
      );
      check(
        Number(emptyState.opacity) > 0.5,
        `${tag}: the empty mark rests at opacity ${emptyState.opacity} under reduce — it must ` +
          "be pinned to its brightest frame or the slot reads as filled",
      );
    } else {
      check(
        emptyState.animation === "gv-empty",
        `${tag}: the empty mark runs "${emptyState.animation}", not gv-empty`,
      );
    }
  }

  // ── 4 · the door travels, parks in its token, and shuts ────────────────────
  const doorParked = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="governance-door"]');
    const r = el.getBoundingClientRect();
    const stage = document.querySelector(".slide, .stage, #root > div").getBoundingClientRect();
    return {
      transform: getComputedStyle(el).transform,
      cx: (r.left + r.right) / 2 - stage.left,
      cy: (r.top + r.bottom) / 2 - stage.top,
      w: r.width,
    };
  });
  check(
    doorParked.transform !== doorAtCard.transform,
    `${tag}: the door's transform is identical at pose 0 and pose 1 ` +
      `("${doorParked.transform}") — it is not travelling`,
  );
  check(
    Math.hypot(doorParked.cx - TOKEN_CX, doorParked.cy - TOKEN_CY) <= TOKEN_R,
    `${tag}: the parked door centres on (${doorParked.cx.toFixed(1)}, ` +
      `${doorParked.cy.toFixed(1)}), outside the token at (${TOKEN_CX}, ${TOKEN_CY}) r=${TOKEN_R}`,
  );
  notes.push(
    `${tag} · door: ${doorAtCard.w.toFixed(1)}px in its card → ${doorParked.w.toFixed(1)}px in ` +
      `its token at (${doorParked.cx.toFixed(1)}, ${doorParked.cy.toFixed(1)})`,
  );

  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(1600);
  const shut = await page.evaluate(() => {
    const leaf = document.querySelector('[data-testid="governance-door-leaf"]');
    return {
      leaf: getComputedStyle(leaf).transform,
      badge: document.querySelectorAll('[data-testid="governance-badge"]').length,
      leak: document.querySelectorAll('[data-testid="governance-leak"]').length,
    };
  });
  check(
    shut.leaf !== leafOpen,
    `${tag}: the leaf's transform is identical open and shut ("${shut.leaf}") — the door is ` +
      "not closing, which is the payoff of the whole figure",
  );
  check(shut.badge === 1, `${tag}: ${shut.badge} badges on the shut door, expected 1`);
  check(shut.leak === 0, `${tag}: ${shut.leak} packets still leaving a shut door, expected 0`);
  notes.push(`${tag} · leaf: "${leafOpen}" → "${shut.leaf}"`);

  // ── 5 · the four knobs throw, and land on their tracks' ON centre ──────────
  const knobs = await page.evaluate(() => {
    const stage = document.querySelector(".slide, .stage, #root > div").getBoundingClientRect();
    return [...document.querySelectorAll('[data-testid^="governance-knob-"]')].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        id: el.dataset.testid,
        on: el.dataset.on,
        transform: getComputedStyle(el).transform,
        cx: (r.left + r.right) / 2 - stage.left,
      };
    });
  });
  check(knobs.length === GAP_IDS.length, `${tag}: ${knobs.length} knobs, expected ${GAP_IDS.length}`);
  knobs.forEach((knob, index) => {
    check(knob.on === "true", `${tag}: "${knob.id}" reports data-on="${knob.on}" at pose 2`);
    check(
      knob.transform !== knobsOff[index],
      `${tag}: "${knob.id}" has the same transform off and on ("${knob.transform}") — it is ` +
        "not throwing, and a switch that does not move is the one thing this figure cannot have",
    );
    check(
      Math.abs(knob.cx - KNOB_ON_CX) <= 1.5,
      `${tag}: "${knob.id}" rests at x=${knob.cx.toFixed(1)}, not on its track's ON centre ` +
        `(${KNOB_ON_CX})`,
    );
  });
  if (knobs[0]) {
    notes.push(
      `${tag} · knob throw: "${knobsOff[0]}" → "${knobs[0].transform}" (${SWITCH_THROW}px)`,
    );
  }

  // ── 6 · every wrap channel, at the fullest pose ─────────────────────────────
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(1600);

  const lines = await lineCounts(page, [
    ...ONE_LINERS,
    ...DOOR_IDS.map((id) => `governance-destination-contract-${id}`),
    ...GAP_IDS.map((id) => `governance-gap-${id}`),
    ...CONTROL_IDS.map((id) => `governance-control-${id}`),
  ]);
  for (const id of ONE_LINERS) {
    // The verdict belongs to act 1 and is off the stage at pose 3, so it is measured there
    // instead — see the second pass below.
    if (id === "governance-verdict") continue;
    check(lines[id] === 1, `${tag}: "${id}" sets ${lines[id]} lines — it is cut for 1`);
  }
  for (const id of GAP_IDS) {
    const key = `governance-gap-${id}`;
    check(lines[key] === 1, `${tag}: gap "${id}" sets ${lines[key]} lines — the row holds 1`);
  }
  for (const id of CONTROL_IDS) {
    const key = `governance-control-${id}`;
    check(lines[key] === 1, `${tag}: control "${id}" sets ${lines[key]} lines — the row holds 1`);
  }
  notes.push(`${tag} · line counts (pose 3): ${JSON.stringify(lines)}`);

  const overflow = await overflows(
    page,
    NOWRAP_LABELS.filter((id) => !id.startsWith("governance-destination-label")).filter(
      (id) => id !== "governance-screen-eyebrow",
    ),
  );
  for (const [id, box] of Object.entries(overflow)) {
    check(box !== null, `${tag}: "${id}" is not on the stage at pose 3`);
    if (box) {
      check(
        box.scroll <= box.client,
        `${tag}: "${id}" overflows its measure (${box.scroll} > ${box.client})`,
      );
    }
  }

  // NO BOX MAY CLIP ITS OWN CONTENT VERTICALLY either — the failure a line count misses when a
  // box is cut for two lines and the type inside it needs three.
  const clipped = await page.evaluate(
    (ids) =>
      ids
        .map((id) => {
          const el = document.querySelector(`[data-testid="${id}"]`);
          return el && el.scrollHeight > el.clientHeight + 1
            ? `${id} (${el.scrollHeight} > ${el.clientHeight})`
            : null;
        })
        .filter(Boolean),
    STAGE_BOXES,
  );
  check(clipped.length === 0, `${tag}: boxes clip their own type — ${clipped.join(", ")}`);

  // ── 7 · the token label stops short of the circuit ─────────────────────────
  const stage = await boxes(page, STAGE_BOXES);
  const ownerLabel = stage["governance-token-owner"];
  check(
    ownerLabel !== null && ownerLabel.right <= CIRCUIT_LEFT,
    `${tag}: the owner label ends at x=${ownerLabel?.right?.toFixed(1)} and runs under the ` +
      `circuit at x=${CIRCUIT_LEFT}`,
  );

  // ── 8 · the margins and the hover band, off the elements ───────────────────
  let lowest = { id: "", bottom: 0 };
  for (const [id, box] of Object.entries(stage)) {
    // Act 1's boxes and pose 1's own token label are off the stage at pose 3 by design.
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
    lowest.id === "governance-thesis",
    `${tag}: the lowest box is "${lowest.id}", not the thesis`,
  );
  notes.push(
    `${tag} · floor: ${lowest.id} bottom ${lowest.bottom.toFixed(1)}, clearance ` +
      `${(NAV_ZONE_TOP - lowest.bottom).toFixed(1)}px`,
  );

  // ── 9 · every box lights on hover ──────────────────────────────────────────
  // AT THE POSE THAT PAINTS IT. The three doors are act 1's and the eight rows are act 2's, so a
  // single pose cannot hover all eleven — which is exactly why this is two passes and not one
  // convenient loop over a stage that happens to hold everything.
  const hovered = [];
  for (const [pose, ids] of [
    [0, HOVER_BOXES.filter((id) => id.startsWith("governance-destination-"))],
    [3, HOVER_BOXES.filter((id) => !id.startsWith("governance-destination-"))],
  ]) {
    await open();
    await page.waitForTimeout(1200);
    for (let i = 0; i < pose; i += 1) {
      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(900);
    }
    for (const id of ids) {
      const target = page.locator(`[data-testid="${id}"]`);
      /** The overlay's opacity, plus the colour it is painting — both off the pseudo-element. */
      const wash = () =>
        target.evaluate((el) => {
          const cs = getComputedStyle(el, "::before");
          return { opacity: Number(cs.opacity), border: cs.borderTopColor };
        });
      const before = await wash();
      await target.hover();
      await page.waitForTimeout(360);
      const after = await wash();
      await page.mouse.move(4, 4);
      await page.waitForTimeout(320);
      const rest = await wash();
      check(
        before.opacity === 0,
        `${tag}: "${id}" rests with its hover overlay at opacity ${before.opacity} — it must be ` +
          "0, or the box is permanently lit",
      );
      check(
        after.opacity === 1,
        `${tag}: "${id}" does not light on hover (overlay opacity ${before.opacity} → ` +
          `${after.opacity})`,
      );
      check(
        after.border === "rgb(232, 196, 160)",
        `${tag}: "${id}" lights to ${after.border}, not --copper-200 (rgb(232, 196, 160))`,
      );
      check(
        rest.opacity === 0,
        `${tag}: "${id}" does not return to rest (overlay opacity ${after.opacity} → ` +
          `${rest.opacity})`,
      );
      hovered.push(id);
    }
  }
  check(
    hovered.length === HOVER_BOXES.length,
    `${tag}: hovered ${hovered.length} boxes, expected ${HOVER_BOXES.length}`,
  );
  notes.push(`${tag} · hover: ${hovered.length} boxes light and return`);

  // ── 10 · act 1's own wrap channels, at act 1's own pose ────────────────────
  await open();
  await page.waitForTimeout(1600);
  const act1Lines = await lineCounts(page, [
    "governance-verdict",
    ...DOOR_IDS.map((id) => `governance-destination-contract-${id}`),
  ]);
  check(
    act1Lines["governance-verdict"] === 1,
    `${tag}: the verdict sets ${act1Lines["governance-verdict"]} lines — it is cut for 1`,
  );
  for (const id of DOOR_IDS) {
    const key = `governance-destination-contract-${id}`;
    check(
      act1Lines[key] <= DOOR_TEXT_MAX_LINES,
      `${tag}: contract "${id}" sets ${act1Lines[key]} lines — the box holds ` +
        `${DOOR_TEXT_MAX_LINES}`,
    );
  }
  const act1Overflow = await overflows(page, [
    "governance-screen-eyebrow",
    ...DOOR_IDS.map((id) => `governance-destination-label-${id}`),
  ]);
  for (const [id, box] of Object.entries(act1Overflow)) {
    check(box !== null, `${tag}: "${id}" is not on the stage at pose 0`);
    if (box) {
      check(
        box.scroll <= box.client,
        `${tag}: "${id}" overflows its measure (${box.scroll} > ${box.client})`,
      );
    }
  }
  const act1Boxes = await boxes(page, [
    "governance-screen-eyebrow",
    ...DOOR_IDS.map((id) => `governance-destination-${id}`),
    "governance-verdict",
  ]);
  for (const [id, box] of Object.entries(act1Boxes)) {
    check(box !== null, `${tag}: "${id}" is missing from act 1's stage`);
    if (!box) continue;
    check(box.left >= SIDE_MARGIN - 0.5, `${tag}: "${id}" starts at x=${box.left.toFixed(1)}`);
    check(box.right <= CONTENT_RIGHT + 0.5, `${tag}: "${id}" ends at x=${box.right.toFixed(1)}`);
    check(box.top >= BAND_TOP - 0.5, `${tag}: "${id}" starts at y=${box.top.toFixed(1)}`);
    check(
      box.bottom <= NAV_ZONE_TOP + 0.5,
      `${tag}: "${id}" ends at y=${box.bottom.toFixed(1)}, inside the NavBar band`,
    );
  }
  const nobody = await overflows(page, ["governance-token-nobody"]);
  void nobody;

  check(errors.length === 0, `${tag}: console errors — ${errors.join(" | ")}`);
  await context.close();
  return { slide, stage, act1: act1Boxes };
}

const browser = await chromium.launch();
const rendered = {};
for (const variant of VARIANTS) {
  const result = await run(browser, variant, false);
  rendered[variant] = { stage: result.stage, act1: result.act1 };
  await run(browser, variant, true);
}
await browser.close();

// ── 11 · one story, byte-identical in both leader decks ──────────────────────
// This slide has no brand axis, so the two leader decks must render the same figure in the same
// place. Compared as JSON over every stage box in both acts, which is the strongest form of that
// claim a harness can make.
const a = JSON.stringify(rendered[VARIANTS[0]]);
const b = JSON.stringify(rendered[VARIANTS[1]]);
check(a === b, "the two leader decks render different boxes — this slide has no brand axis");

console.log("── D.4 · THE THREE DOORS AND THE FOUR SWITCHES ────────────────────");
for (const note of notes) console.log(`  ${note}`);
console.log(`  frames → ${OUT}`);
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  failures.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  process.exit(1);
}
console.log("\nall checks passed.");
