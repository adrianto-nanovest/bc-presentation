// TAM AND KOTTER, IN A REAL ENGINE — the browser evidence for C.3 after the 2026-08-14
// rework (two poses, a staged build, two motion loops, ten animated marks, hover cards, and
// `01`…`05` on the ordered chain).
//
// There is no jsdom test for this slide, and that is the gap this file fills rather than
// duplicates. Everything the rework turns on is one of the five things jsdom cannot do:
// resolve a `var()`, place a box, run a keyframe, read an `animationName`, or match `:hover`.
//
//   1. THE VERTICAL BUDGET, MEASURED. Two owner calls moved every horizontal line on this
//      stage — the frames down to `.slide-content`'s own 156, the thesis down onto the
//      NavBar's floor at 596 — and the whole argument for both is a distance in pixels.
//      `tam-kotter-geometry.ts` computes them and a node test can check the arithmetic; only
//      a browser can confirm the browser agrees.
//   2. THE TWO FRAMES ARE ONE SIZE, AS THE CASCADE RESOLVES IT. The slide's claim is a
//      conjunction and its whole visual contract is that neither frame wins. Compared here as
//      four numbers each, not as the two constants they were computed from.
//   3. THE TWO LOOPS RUN, AND THEY ARE DIFFERENT IN KIND. The left chain carries a continuous
//      many-dot current and the right rail carries a single ordered runner; that difference IS
//      the difference between a causal model and an ordered one, and jsdom cannot tell them
//      apart because it has no `animationName` and no `strokeDasharray` to read.
//   4. THE FIVE STATIONS ARE PHASED OFF THE RUNNER'S OWN PERIOD. `kotterStationOffset(i) ×
//      RUNNER_MS` is computed in the component from a geometry function and lands as an inline
//      `animation-delay`; the check is that the five are evenly spaced, which is what stops the
//      motion becoming a scale drawn in time (§6.6).
//   5. NO-DIM UNDER THE POINTER (§7.1 — attention is bought with added light, never
//      subtracted). Ten cards gained a `:hover` state, and the failure mode is invisible in a
//      unit test: this hovers each card in turn and requires the other nine to be byte for byte
//      unchanged. It also catches the bug the first cut actually had — an inline `border` that
//      no `:hover` rule can outrank, which made the whole highlight a no-op.
//   6. THE ORDINALS ARE AN INDEX AND NOT A SCALE. Nine numerals in one register, right-aligned
//      on their own chain's line — `01`…`05` per LINK on the ordered chain, and `01 · 02 · 02 ·
//      03 · 04` per TIER on the causal one. The two belief cards SHARING `02` is the claim
//      with the most in it: the acceptance model treats them as a pair and orders neither, so
//      `02`/`03` there would print a sequence the literature denies.
//   7. THE STILL FIGURE CARRIES THE ARGUMENT, which is what `canonicalPose` rests on. Under
//      `prefers-reduced-motion` both overlays must be gone, every drawn connector must be at
//      `stroke-dashoffset: 0` with a zeroed delay (nothing left mid-build), and all ten marks
//      must be parked on their composed frame — the failure this catches is a glyph whose
//      keyframe ends on its EMPTY frame, which four of the ten originally did.
//   8. ZERO SMIL, at both poses, under either preference. The figure gained an `<svg>` in this
//      rework; the rule did not change.
//
// Both leader decks, both motion preferences. Screenshots to `--out` for the eye.
//
// Usage: node scripts/c3-figure-verify.mjs [--out=<dir>]
//        DECK_URL   Base url to render. Default: http://localhost:5173
//
// Exits 1 on the first failing claim, with every failure printed.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT =
  process.argv.slice(2).find((a) => a.startsWith("--out="))?.slice(6) ?? "/tmp/c3-figure";
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
mkdirSync(OUT, { recursive: true });

/** The two leader decks. C.3 composes into these and into no standard deck. */
const VARIANTS = ["berau-leader", "gems-leader"];

/**
 * The ten node ids, and which chain each belongs to — TRANSCRIBED, not imported.
 *
 * This is a bare-node script and `src/slides/leader-shape/content.ts` is a `.ts` module
 * written without file extensions, which `node --experimental-strip-types` answers
 * `ERR_MODULE_NOT_FOUND` for. The trade is a second copy of ten ids in exchange for a harness
 * that runs with no build step — and a second copy is the right side of that trade here,
 * because a silent reorder of either chain should FAIL this file rather than be followed by
 * it.
 */
const TAM_NODES = ["external-factors", "usefulness", "ease-of-use", "intention", "actual-use"];
const KOTTER_NODES = ["urgency", "coalition", "enable", "wins", "anchor"];

/** Transcribed from `src/slides/leader-shape/tam-kotter-geometry.ts` for the same reason. */
const G = {
  headlineBottom: 122,
  headlineClearance: 34,
  contentTop: 156,
  panelBottom: 576,
  panelWidth: 576,
  panelHeight: 420,
  thesisTop: 596,
  thesisBottom: 620,
  navZoneTop: 632,
  navZoneClearance: 12,
  /** `.tk-runner`'s period in `src/slides/leader-shape/components/tam-kotter.css`, which is
   *  also `RUNNER_MS` in the component. Three copies, and this is the one that proves the
   *  other two agree. */
  runnerMs: 4200,
};

/** Vocabulary this stage still refuses. The owner's numbering decision licensed `01`…`05` on
 *  the ordered chain and nothing else — a NAMED scale is what §6.6 actually forbids, and none
 *  of these may appear on the stage. */
const REFUSED = ["L1", "L5", "P0", "P3", "maturity", "Level 1", "Learn →", "Integrate"];

const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]|Download the React DevTools/;

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const near = (a, b, tol = 1) => Math.abs(a - b) <= tol;

/** The slide's index in the composed deck — found by looking for the figure rather than
 *  transcribed, because §3.4 R2 renumbers everything behind this run and a literal index is a
 *  bet on a composition. */
async function findSlide(page, variant) {
  await page.goto(`${BASE}?variant=${variant}`, { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  if (typeof count !== "number") {
    throw new Error(
      `${variant}: the deck did not boot — window.__DECK_SLIDE_COUNT__ is ${count}. ` +
        `Check the dev server console for a module-scope error in an unrelated slide.`,
    );
  }
  for (let i = 0; i < count; i += 1) {
    await page.goto(`${BASE}?variant=${variant}&slide=${i}`, { waitUntil: "networkidle" });
    if (await page.locator('[data-testid="tam-kotter-wires"]').count()) return i;
  }
  throw new Error(`${variant}: no slide renders tam-kotter-wires`);
}

/** Stage coordinates for one testid, with the viewport scale taken back out. */
function boxOf(page, testid) {
  return page.evaluate((id) => {
    const stage = document.querySelector('[data-testid="slide"]').getBoundingClientRect();
    const scale = stage.width / 1280;
    const el = document.querySelector(`[data-testid="${id}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      left: (r.left - stage.left) / scale,
      right: (r.right - stage.left) / scale,
      top: (r.top - stage.top) / scale,
      bottom: (r.bottom - stage.top) / scale,
      width: r.width / scale,
      height: r.height / scale,
    };
  }, testid);
}

/** Six computed values per card — the whole visual tier, as the cascade resolves it. Compared
 *  string for string, so a change of any kind is a change. */
function cardSignatures(page, ids) {
  return page.evaluate(
    (nodeIds) =>
      Object.fromEntries(
        nodeIds.map((id) => {
          const box = document.querySelector(`[data-testid="tam-kotter-node-${id}"]`);
          const label = document.querySelector(`[data-testid="tam-kotter-node-${id}-label"]`);
          const mark = document.querySelector(`[data-testid="tam-kotter-glyph-${id}"] svg *`);
          const cb = getComputedStyle(box);
          return [
            id,
            JSON.stringify({
              border: cb.borderColor,
              background: cb.backgroundColor,
              halo: cb.boxShadow,
              color: cb.color,
              label: getComputedStyle(label).color,
              mark: mark ? getComputedStyle(mark).stroke : "none",
            }),
          ];
        }),
      ),
    ids,
  );
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
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  const slide = await findSlide(page, variant);
  await page.goto(`${BASE}?variant=${variant}&slide=${slide}`, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-testid="tam-kotter-wires"]');
  await page.waitForFunction(() => document.fonts.status === "loaded");
  // Longer than `BUILD`'s last frame (1.24s + one fade), so every one-shot arrival has landed
  // and what is measured below is the resting figure rather than a frame of the build.
  await page.waitForTimeout(2400);

  // ── 8 · zero SMIL, both poses ───────────────────────────────────────────────
  for (const pose of [0, 1]) {
    if (pose > 0) await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(800);
    const smil = await page.evaluate(
      () =>
        document.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
          .length,
    );
    check(smil === 0, `${tag} pose ${pose}: ${smil} SMIL nodes (must be 0)`);
    await page.screenshot({ path: `${OUT}/${tag}-pose${pose}.png` });
  }

  // The thesis is pose 1 and only pose 1 — the slide's one gate.
  check(
    (await page.locator('[data-testid="tam-kotter-thesis"]').count()) === 1,
    `${tag}: no thesis at the last pose`,
  );

  // ── 1 · the vertical budget, measured ──────────────────────────────────────
  const headline = await page.evaluate(() => {
    const stage = document.querySelector('[data-testid="slide"]').getBoundingClientRect();
    const scale = stage.width / 1280;
    const r = document.querySelector(".slide-headline").getBoundingClientRect();
    return (r.bottom - stage.top) / scale;
  });
  const tam = await boxOf(page, "tam-kotter-frame-tam");
  const kotter = await boxOf(page, "tam-kotter-frame-kotter");
  const thesis = await boxOf(page, "tam-kotter-thesis");

  check(
    near(headline, G.headlineBottom),
    `${tag}: the headline ends at ${headline.toFixed(2)}, expected ${G.headlineBottom} — a ` +
      `wrapped headline is the one thing that moves it`,
  );
  const clearance = tam.top - headline;
  check(
    clearance >= G.headlineClearance - 1,
    `${tag}: only ${clearance.toFixed(2)}px of air under the headline, and the owner set the ` +
      `floor at ${G.headlineClearance} (C.2's) — two full-width copper borders any closer read ` +
      `as an underline on the headline`,
  );
  check(near(tam.top, G.contentTop), `${tag}: frames start at ${tam.top}, expected ${G.contentTop}`);
  check(
    near(tam.bottom, G.panelBottom),
    `${tag}: frames end at ${tam.bottom}, expected ${G.panelBottom}`,
  );
  check(near(thesis.top, G.thesisTop), `${tag}: thesis at ${thesis.top}, expected ${G.thesisTop}`);
  const navClearance = G.navZoneTop - thesis.bottom;
  check(
    navClearance > 0,
    `${tag}: the thesis's last pixel is at ${thesis.bottom.toFixed(2)}, INSIDE the NavBar hover ` +
      `band at ${G.navZoneTop}`,
  );
  check(
    near(navClearance, G.navZoneClearance, 2),
    `${tag}: ${navClearance.toFixed(2)}px between the thesis and the NavBar band, expected ` +
      `${G.navZoneClearance} — the owner asked for the line to sit exactly above the bar, and ` +
      `28 was the number that reading rejected`,
  );
  console.log(
    `  ${tag} · headline ${headline.toFixed(0)} → frames ${tam.top}…${tam.bottom} → thesis ` +
      `${thesis.top}…${thesis.bottom} · band at ${G.navZoneTop} · clearance ${navClearance.toFixed(0)}`,
  );

  // ── 2 · the two frames are one size ────────────────────────────────────────
  for (const [key, expected] of [
    ["top", G.contentTop],
    ["bottom", G.panelBottom],
    ["width", G.panelWidth],
    ["height", G.panelHeight],
  ]) {
    check(
      near(tam[key], kotter[key], 0.5),
      `${tag}: the two frames disagree on ${key} (${tam[key]} vs ${kotter[key]}) — the slide's ` +
        `claim is a conjunction and a frame that is bigger is arguing that it is the answer`,
    );
    check(near(tam[key], expected), `${tag}: frame ${key} is ${tam[key]}, expected ${expected}`);
  }

  // ── 6 · the ordinals are an index and not a scale ──────────────────────────
  //
  // BOTH CHAINS ARE NUMBERED AND THEY ARE NUMBERED DIFFERENTLY, which is the claim with the
  // most in it. The ordered chain runs `01`…`05`, one per LINK. The causal chain runs
  // `01 · 02 · 02 · 03 · 04`, one per TIER — and the two belief cards SHARING `02` is the whole
  // point: the acceptance model treats them as a pair and orders neither, so `02`/`03` there
  // would print a sequence the literature denies. That shared numeral is what this block
  // exists to hold, because it is the one thing about the numbering a well-meaning edit would
  // "fix".
  const EXPECTED_ORDINALS = {
    "external-factors": "01",
    usefulness: "02",
    "ease-of-use": "02",
    intention: "03",
    "actual-use": "04",
    urgency: "01",
    coalition: "02",
    enable: "03",
    wins: "04",
    anchor: "05",
  };
  const ordinals = await page.evaluate(
    (ids) =>
      Object.fromEntries(
        ids.map((id) => {
          const el = document.querySelector(`[data-testid="tam-kotter-index-${id}"]`);
          if (!el) return [id, null];
          const stage = document.querySelector('[data-testid="slide"]').getBoundingClientRect();
          const scale = stage.width / 1280;
          const r = el.getBoundingClientRect();
          const c = getComputedStyle(el);
          return [
            id,
            {
              text: el.textContent,
              right: (r.right - stage.left) / scale,
              color: c.color,
              size: c.fontSize,
            },
          ];
        }),
      ),
    [...TAM_NODES, ...KOTTER_NODES],
  );
  const first = ordinals[KOTTER_NODES[0]];
  for (const [id, expected] of Object.entries(EXPECTED_ORDINALS)) {
    const o = ordinals[id];
    check(o !== null, `${tag}: card ${id} carries no ordinal`);
    if (!o) continue;
    check(o.text === expected, `${tag}: card ${id} prints "${o.text}", expected "${expected}"`);
    check(
      o.color === first.color && o.size === first.size,
      `${tag}: card ${id}'s ordinal is ${o.size}/${o.color} against ${first.size}/${first.color} ` +
        `on the ordered chain — one register for all nine, both frames, or the index has become ` +
        `a scale and the two frames have stopped being a pair`,
    );
  }
  check(
    ordinals.usefulness?.text === ordinals["ease-of-use"]?.text,
    `${tag}: the two belief cards print different ordinals (${ordinals.usefulness?.text} and ` +
      `${ordinals["ease-of-use"]?.text}) — the acceptance model's second tier is a PAIR it does ` +
      `not order, and numbering it 02/03 prints a sequence the literature denies`,
  );
  // Each chain's numerals stand on ONE right edge — five on the ordered chain, and the three
  // full-width cards of the causal one (the belief pair sits on its own two, by construction).
  for (const chain of [KOTTER_NODES, ["external-factors", "intention", "actual-use"]]) {
    for (const id of chain) {
      check(
        near(ordinals[id].right, ordinals[chain[0]].right, 0.5),
        `${tag}: ${id}'s ordinal is at ${ordinals[id].right}, off the ${ordinals[chain[0]].right} ` +
          `line its own chain stands on — numerals on separate lines are labels, not an index`,
      );
    }
  }

  // ── the refusals, on the rendered stage ────────────────────────────────────
  const stageText = await page.evaluate(() => document.body.innerText);
  for (const word of REFUSED) {
    check(!stageText.includes(word), `${tag}: refused vocabulary on the stage — "${word}"`);
  }

  if (!reduced) {
    // ── 3 · the two loops run, and differ in kind ───────────────────────────
    const loops = await page.evaluate(() => {
      const of = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const c = getComputedStyle(el);
        return {
          name: c.animationName,
          dash: c.strokeDasharray,
          duration: c.animationDuration,
          stroke: c.stroke,
          width: c.strokeWidth,
        };
      };
      return {
        current: of('[data-testid="tam-kotter-current"] .tk-current'),
        runner: of(".tk-runner"),
      };
    });
    check(
      loops.current?.name === "tk-current",
      `${tag}: the left chain's current is "${loops.current?.name}", expected tk-current`,
    );
    check(
      loops.runner?.name === "tk-runner",
      `${tag}: the rail's runner is "${loops.runner?.name}", expected tk-runner`,
    );
    check(
      loops.current.dash !== loops.runner.dash,
      `${tag}: the current and the runner wear the same dash pattern (${loops.current.dash}) — ` +
        `a continuous circuit and a single ordered pass are the two models' difference, and the ` +
        `figure has nothing else left to say it with`,
    );
    check(
      loops.current.duration !== loops.runner.duration,
      `${tag}: the current and the runner run at the same speed (${loops.current.duration})`,
    );
    check(
      parseFloat(loops.current.width) < parseFloat(loops.runner.width),
      `${tag}: the current is ${loops.current.width} against the runner's ${loops.runner.width} ` +
        `— the current must be NARROWER than the connector it rides, or both fan bars read as ` +
        `chains of beads (a dashed connector says "weak link")`,
    );
    check(
      near(parseFloat(loops.runner.duration) * 1000, G.runnerMs, 1),
      `${tag}: the runner's period is ${loops.runner.duration}, and the five station delays are ` +
        `computed against ${G.runnerMs}ms — they have drifted apart`,
    );

    // ── 4 · the five stations are evenly phased off that period ─────────────
    const delays = await page.evaluate(
      (ids) =>
        ids.map((id) =>
          parseFloat(
            getComputedStyle(document.querySelector(`[data-testid="tam-kotter-station-${id}"]`))
              .animationDelay,
          ),
        ),
      KOTTER_NODES,
    );
    const gaps = delays.slice(1).map((d, i) => d - delays[i]);
    for (const gap of gaps) {
      check(
        near(gap, gaps[0], 0.01),
        `${tag}: the station flashes are ${gaps.map((g) => g.toFixed(3)).join(", ")}s apart — ` +
          `uneven arrival times are a scale drawn in time, which is the same object §6.6 ` +
          `refuses drawn in space`,
      );
    }
    check(
      delays[delays.length - 1] < G.runnerMs / 1000,
      `${tag}: the last station flashes at ${delays[delays.length - 1]}s, past the runner's own ` +
        `${G.runnerMs / 1000}s period — it would fire before the runner reaches it`,
    );

    // ── 5 · no-dim under the pointer, per card ──────────────────────────────
    //
    // THE CLAIM IS "THERE IS A SETTLED STATE IN WHICH ONLY THE HOVERED CARD DIFFERS", and it
    // is polled for rather than timed. That formulation is the whole reason this check is
    // trustworthy, and it took two wrong ones to get to:
    //
    //   · A FIXED WAIT IS NOT ENOUGH. The cards transition four properties over 200ms, and a
    //     headless renderer with no visible surface throttles `requestAnimationFrame` —
    //     measured here, a 200ms transition was 98% complete after 700ms of wall clock. A
    //     fixed wait reads a card that is ALMOST back at rest and reports it as "changed
    //     while another was hovered": the §7.1 violation this check exists to catch, invented
    //     by the check itself. (The launch flags below remove most of the throttling; they do
    //     not make a timing assumption safe.)
    //   · POLLING FOR STABILITY IS NOT ENOUGH EITHER, and fails in the same direction for a
    //     subtler reason: while the clock is throttled the interpolation does not advance, so
    //     two consecutive reads agree and a mid-transition frame looks stable.
    //
    // Polling until the state MATCHES THE TARGET has neither failure. A real violation — a
    // rule that dimmed the other nine, say — never reaches the target state and times out
    // with the offending card named; a slow clock only makes the loop run longer.
    const ALL = [...TAM_NODES, ...KOTTER_NODES];
    const sigsMatch = (a, b, except) =>
      ALL.every((id) => (id === except ? a[id] !== b[id] : a[id] === b[id]));

    await page.mouse.move(1000, 700);
    let resting = await cardSignatures(page, ALL);
    for (let i = 0; i < 25; i += 1) {
      await page.waitForTimeout(120);
      const now = await cardSignatures(page, ALL);
      if (ALL.every((id) => now[id] === resting[id])) break;
      resting = now;
    }

    for (const id of ALL) {
      await page.locator(`[data-testid="tam-kotter-node-${id}"]`).hover();
      let now = null;
      let reached = false;
      for (let i = 0; i < 30 && !reached; i += 1) {
        now = await cardSignatures(page, ALL);
        reached = sigsMatch(now, resting, id);
        if (!reached) await page.waitForTimeout(120);
      }
      if (!reached) {
        check(
          now[id] !== resting[id],
          `${tag}: hovering ${id} changed nothing about it — an inline border/background is the ` +
            `usual cause, and no :hover rule can outrank one at any specificity`,
        );
        for (const other of ALL) {
          if (other === id) continue;
          check(
            now[other] === resting[other],
            `${tag}: ${other} never returned to its resting state while ${id} was hovered — ` +
              `§7.1 forbids a card changing for a hover that is about another one (attention is ` +
              `bought with added light, never subtracted)`,
          );
        }
      }
      await page.mouse.move(1000, 700);
      for (let i = 0; i < 30; i += 1) {
        const now2 = await cardSignatures(page, ALL);
        if (ALL.every((k) => now2[k] === resting[k])) break;
        await page.waitForTimeout(120);
      }
    }

    await page.locator('[data-testid="tam-kotter-node-enable"]').hover();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${tag}-hover.png` });
    await page.mouse.move(1000, 700);
  } else {
    // ── 7 · the still figure is complete ────────────────────────────────────
    const still = await page.evaluate(
      (ids) => {
        const of = (sel) => {
          const el = document.querySelector(sel);
          return el ? getComputedStyle(el) : null;
        };
        const wires = [...document.querySelectorAll('[data-testid^="tam-kotter-wire-"]')].map(
          (el) => {
            const c = getComputedStyle(el);
            return {
              slot: el.dataset.testid,
              offset: parseFloat(c.strokeDashoffset),
              delay: parseFloat(c.animationDelay),
            };
          },
        );
        return {
          wires,
          currentAnim: of('[data-testid="tam-kotter-current"] .tk-current')?.animationName,
          runnerAnim: of(".tk-runner")?.animationName,
          stationOpacity: of(`[data-testid="tam-kotter-station-${ids[4]}"]`)?.opacity,
          // The four marks whose keyframes originally ENDED on their empty frame.
          bar: of('[data-testid="tam-kotter-glyph-usefulness"] .tk-anim-bar-3')?.transform,
          check: parseFloat(
            of('[data-testid="tam-kotter-glyph-intention"] .tk-anim-check')?.strokeDashoffset,
          ),
          link: parseFloat(
            of('[data-testid="tam-kotter-glyph-coalition"] .tk-anim-link-3')?.strokeDashoffset,
          ),
          glider: parseFloat(
            of('[data-testid="tam-kotter-glyph-ease-of-use"] .tk-anim-glider')?.opacity,
          ),
        };
      },
      KOTTER_NODES,
    );
    check(
      still.currentAnim === "none" && still.runnerAnim === "none",
      `${tag}: a motion overlay is still animating (current "${still.currentAnim}", runner ` +
        `"${still.runnerAnim}") — an infinite animation squashed to 0.01ms parks on its END ` +
        `frame, which for these two is a dash pattern frozen mid-travel over a solid line`,
    );
    check(
      still.stationOpacity === "0",
      `${tag}: a station flash is visible at rest (opacity ${still.stationOpacity})`,
    );
    check(still.wires.length === 11, `${tag}: ${still.wires.length} drawn connectors, expected 11`);
    for (const w of still.wires) {
      check(
        w.offset === 0 && w.delay === 0,
        `${tag}: ${w.slot} rests at dashoffset ${w.offset} with a ${w.delay}s delay — a reader ` +
          `who asked for no animation would watch a blank stage assemble itself in silence`,
      );
    }
    check(
      still.bar === "none",
      `${tag}: the usefulness chart rests at transform "${still.bar}", expected "none" (full ` +
        `height) — a keyframe that GROWS from nothing parks a reduced-motion reader on the ` +
        `collapsed frame`,
    );
    check(still.check === 0, `${tag}: the intention check rests undrawn (${still.check})`);
    check(still.link === 0, `${tag}: the coalition links rest unjoined (${still.link})`);
    check(still.glider === 1, `${tag}: the ease-of-use dot rests invisible (${still.glider})`);
    await page.screenshot({ path: `${OUT}/${tag}-still.png` });
  }

  const real = errors.filter((e) => !DEV_SERVER_NOISE.test(e));
  check(real.length === 0, `${tag}: console errors ${JSON.stringify(real)}`);
  await context.close();
}

// THE THREE FLAGS ARE NOT OPTIONAL FOR A FIGURE THAT MOVES. A headless page has no visible
// surface, so Chromium backgrounds its renderer and throttles `requestAnimationFrame` —
// which stalls every CSS transition and animation on this stage and makes any measurement of
// a mid-flight value meaningless. `c1-figure-verify.mjs` gets away without them because it
// measures resting states after long waits; this file measures a transition settling, and the
// no-dim check above documents what the throttling did to it.
const browser = await chromium.launch({
  args: [
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
  ],
});
for (const variant of VARIANTS) {
  await run(browser, variant, false);
  await run(browser, variant, true);
}
await browser.close();

if (failures.length > 0) {
  console.log(`\n${failures.length} failing claim(s):`);
  for (const f of failures) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\nAll claims hold. Shots in ${OUT}.`);
