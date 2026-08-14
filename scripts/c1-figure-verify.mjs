// THE AGENTIC ORGANIZATION, IN A REAL ENGINE — the browser evidence for C.1 after the
// 2026-08-13 rework (two poses, a pointer-driven walk, animated connectors, a recap).
//
// IT REPLACES `scripts/gh54-verify.mjs` AND `scripts/gh55-verify.mjs`, which are the
// harnesses for the nine-pose figure and are left in the tree as the record of what
// #54 and #55 shipped. Both carry a banner saying so. Do not run them against this
// slide: the contract they check — poses 2…7 lighting one pillar each, a closer at
// pose 8, a `steps: 9` budget — no longer exists.
//
// `tests/unit/shape-agentic-org.test.tsx` owns everything jsdom can see, and
// `src/slides/leader-shape/walk.ts` is a pure function of its arguments, so a node
// test can prove the whole interaction rule without rendering anything. What jsdom
// CANNOT do is resolve a `var()`, place a rect, paint a `box-shadow`, run a keyframe
// or dispatch a real pointer. Every claim below turns on one of those five:
//
//   1. ZERO SMIL, AT BOTH POSES, UNDER EITHER MOTION PREFERENCE. The rule this slide
//      has carried since it shipped, and it costs more to keep now than it did: the
//      figure gained six drawn spokes, six infinite bead loops and four one-shot
//      arrivals, and every one of them is a CSS animation. A single `<animate>`
//      element would be invisible to the reduced-motion squash in `globals.css` and
//      would have to be gated behind a `matchMedia` at mount.
//
//   2. THE CONNECTORS ACTUALLY MOVE, AND THEY MOVE DIFFERENTLY UNDER THE POINTER.
//      The whole point of the flow overlay is that a resting spoke drifts inward and
//      an OPEN one fires back out, and jsdom cannot tell those apart — it has no
//      `animationName` to read. This reads the computed animation name and the
//      dasharray on the same element before and during a hover, and requires both to
//      change: same speed with a different name would be a rename, and the same
//      dasharray at a different speed would be "faster dots", not a second mark.
//
//   3. NO-DIM, AS THE CASCADE RESOLVES IT (§7.1 — attention is bought with added
//      light, never subtracted). The unit test can only compare the inline
//      `var(--copper-600)` the component wrote, which proves nothing about what a
//      room sees. This opens each of the six pillars in turn and compares ELEVEN
//      computed values per pillar — border, background, halo, transform, label
//      colour, icon colour, spoke stroke, spoke width, bead stroke, bead width,
//      `data-active` — against the same values measured with nothing open, string
//      for string. Five of six must be unchanged BYTE FOR BYTE by a hover that is
//      about the sixth, and the sixth must have changed.
//
//   4. THE KEYBOARD DOES NOT ADVANCE THE DECK. `useKeyboardNav` listens on `window`
//      and steps the slide on Space; a `<button>` fires its own click on Space. Both
//      are real event plumbing, and the fix (`e.stopPropagation()` in the pillar's
//      `onKeyDown`) is exactly the kind that a jsdom test can assert into existence
//      and a browser can still get wrong. So the pillar is focused for real, Space is
//      pressed for real, and the recap block is checked to still be closed.
//
//   5. A MOUSE CLICK LEAVES NO FOCUS RING. `:focus-visible` does not match after a
//      pointer click — until the browser re-evaluates it on the next keypress, and on
//      this deck the next keypress is always Space or an arrow. That interaction
//      between two heuristics exists only in a browser. The pillar is clicked, the
//      deck is stepped, and the computed `outline-style` is required to be `none`.
//
//   6. THE FLOOR AND THE COLUMN, MEASURED AT THE RECAP. §7.1's one recorded layout
//      risk was that the lowest satellite sits near the NavBar's hover band "and it
//      grows on focus". It now grows on focus AND at the recap, where all six grow at
//      once — and the recap is `canonicalPose`, so the grown figure is what the PDF
//      prints. The halo is ADDED BY HAND because `getBoundingClientRect` cannot see a
//      `box-shadow` spread; the computed shadow is parsed first to prove it is a hard
//      4px ring with no offset and no blur, so the number added is the number
//      painted.
//
// Both leader decks, both motion preferences. Screenshots to `--out` for the eye.
//
// Usage: node scripts/c1-figure-verify.mjs [--out=<dir>]
//        DECK_URL   Base url to render. Default: http://localhost:5173
//
// Exits 1 on the first failing claim, with every failure printed.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT =
  process.argv.slice(2).find((a) => a.startsWith("--out="))?.slice(6) ?? "/tmp/c1-figure";
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
mkdirSync(OUT, { recursive: true });

/** The two leader decks. C.1 composes into these and into no standard deck. */
const VARIANTS = ["berau-leader", "gems-leader"];

/**
 * The six pillars in RING ORDER — TRANSCRIBED, not imported.
 *
 * This is a bare-node script and `src/slides/leader-shape/content.ts` is a `.ts`
 * module written without file extensions, which `node --experimental-strip-types`
 * answers `ERR_MODULE_NOT_FOUND` for. The trade is a second copy of six ids in
 * exchange for a harness that runs with no build step — and a second copy is the
 * right side of that trade here, because a silent reorder of the ring should fail
 * this file rather than be followed by it.
 */
const PILLARS = ["governance", "tools", "people", "strategy", "process", "companions"];

/** Transcribed from `src/slides/leader-shape/geometry.ts` for the same reason. */
const NAV_ZONE_TOP = 632;
const PANEL_LEFT = 764;
const HALO = 4;

/** Copy this slide REFUSES. §6.6 drops Specify → Generate → Verify outright, and the
 *  standing kicker was cut on 2026-08-13 — both are absences a grep can hold. */
const REFUSED = [
  "OPERATING MODEL",
  "NOT A DEPARTMENT",
  "NOT A COMMITTEE",
  "Specify",
  "Generate",
  "Verify",
];

const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]|Download the React DevTools/;

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

/** The slide's index in the composed deck — found by looking for the hub rather than
 *  transcribed, because §3.4 R2 renumbers everything behind this run and a literal
 *  index is a bet on a composition. */
async function findSlide(page, variant) {
  await page.goto(`${BASE}?variant=${variant}`, { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i += 1) {
    await page.goto(`${BASE}?variant=${variant}&slide=${i}`, { waitUntil: "networkidle" });
    if (await page.locator('[data-testid="shape-hub"]').count()) return i;
  }
  throw new Error(`${variant}: no slide renders a shape-hub`);
}

/** Eleven computed values per pillar — the whole visual tier, as the cascade resolves
 *  it. Compared string for string, so a change of any kind is a change. */
function pillarSignatures(page, ids) {
  return page.evaluate(
    (pillarIds) =>
    Object.fromEntries(
      pillarIds.map((id) => {
        const box = document.querySelector(`[data-testid="shape-pillar-${id}"]`);
        const label = document.querySelector(`[data-testid="shape-pillar-${id}-label"]`);
        const icon = document.querySelector(`[data-testid="shape-pillar-${id}-icon"]`);
        const spoke = document.querySelector(`[data-testid="shape-spoke-${id}"]`);
        const flow = document.querySelector(`[data-testid="shape-flow-${id}"]`);
        const cb = getComputedStyle(box);
        const cs = getComputedStyle(spoke);
        const cf = getComputedStyle(flow);
        return [
          id,
          JSON.stringify({
            border: cb.borderColor,
            background: cb.backgroundColor,
            halo: cb.boxShadow,
            transform: cb.transform,
            label: getComputedStyle(label).color,
            icon: getComputedStyle(icon).color,
            spokeStroke: cs.stroke,
            spokeWidth: cs.strokeWidth,
            flowStroke: cf.stroke,
            flowWidth: cf.strokeWidth,
            active: box.dataset.active,
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
  await page.waitForSelector('[data-testid="shape-hub"]');
  // Longer than `BUILD`'s last frame (1.42s), so every one-shot arrival has landed and
  // what is measured below is the resting figure rather than a frame of the build.
  await page.waitForTimeout(2000);

  // ── 1 · zero SMIL, both poses ────────────────────────────────────────────────
  for (const pose of [0, 1]) {
    if (pose > 0) await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(800);
    const smil = await page.evaluate(
      () => document.querySelectorAll("animate, animateTransform, animateMotion, set").length,
    );
    check(smil === 0, `${tag} pose ${pose}: ${smil} SMIL nodes (must be 0)`);
    await page.screenshot({ path: `${OUT}/${tag}-pose${pose}.png` });
  }
  await page.keyboard.press("ArrowUp");
  await page.waitForTimeout(700);

  // ── the refusals, on the rendered stage ─────────────────────────────────────
  const stageText = await page.evaluate(() => document.body.innerText);
  for (const word of REFUSED) {
    check(!stageText.includes(word), `${tag}: refused copy on the stage — "${word}"`);
  }

  if (!reduced) {
    // ── 2 · the connectors move, and differently under the pointer ────────────
    const flowAt = (state) =>
      page.evaluate(() => {
        const el = document.querySelector('[data-testid="shape-flow-governance"]');
        const cs = getComputedStyle(el);
        return { name: cs.animationName, dash: cs.strokeDasharray, duration: cs.animationDuration };
      }, state);
    const atRest = await flowAt("rest");
    check(
      atRest.name === "shape-spoke-flow",
      `${tag}: resting flow animation is "${atRest.name}", expected shape-spoke-flow`,
    );
    await page.locator('[data-testid="shape-pillar-governance"]').hover();
    await page.waitForTimeout(600);
    const open = await flowAt("open");
    check(
      open.name === "shape-spoke-surge",
      `${tag}: open flow animation is "${open.name}", expected shape-spoke-surge`,
    );
    check(
      open.dash !== atRest.dash,
      `${tag}: the open spoke wears the resting dash pattern (${open.dash}) — a different ` +
        `speed alone is not a different mark`,
    );
    check(
      open.duration !== atRest.duration,
      `${tag}: the open spoke runs at the resting speed (${open.duration})`,
    );

    // ── 3 · no-dim, per pillar, against the resting figure ───────────────────
    await page.mouse.move(1000, 690);
    await page.waitForTimeout(700);
    const resting = await pillarSignatures(page, PILLARS);
    for (const id of PILLARS) {
      await page.locator(`[data-testid="shape-pillar-${id}"]`).hover();
      await page.waitForTimeout(700);
      const now = await pillarSignatures(page, PILLARS);
      for (const other of PILLARS) {
        if (other === id) {
          check(now[other] !== resting[other], `${tag}: opening ${id} changed nothing about it`);
        } else {
          check(
            now[other] === resting[other],
            `${tag}: ${other} changed while ${id} was open — §7.1 forbids it`,
          );
        }
      }
      const panelOpen = await page.getAttribute(`[data-testid="shape-decision-${id}"]`, "data-open");
      check(panelOpen === "true", `${tag}: hovering ${id} did not open its decision`);
    }
    await page.mouse.move(1000, 690);
    await page.waitForTimeout(700);

    // ── 4 · the keyboard pins without advancing the deck ─────────────────────
    await page.evaluate(() =>
      document.querySelector('[data-testid="shape-pillar-tools"]').focus(),
    );
    await page.waitForTimeout(500);
    check(
      (await page.getAttribute('[data-testid="shape-decision-tools"]', "data-open")) === "true",
      `${tag}: keyboard focus did not open the pillar`,
    );
    await page.keyboard.press(" ");
    await page.waitForTimeout(500);
    check(
      (await page.getAttribute('[data-testid="shape-pillar-tools"]', "data-pinned")) === "true",
      `${tag}: Space did not pin the focused pillar`,
    );
    check(
      (await page.getAttribute('[data-testid="shape-recap"]', "data-open")) === "false",
      `${tag}: Space pinned AND advanced the deck`,
    );
    await page.keyboard.press(" ");
    await page.waitForTimeout(400);
    check(
      (await page.getAttribute('[data-testid="shape-pillar-tools"]', "data-pinned")) === "false",
      `${tag}: a second Space did not release the pin`,
    );
    await page.evaluate(() => document.activeElement.blur());
    await page.waitForTimeout(400);

    // ── 5 · a mouse click leaves no focus ring, and the pin survives a step ──
    await page.locator('[data-testid="shape-pillar-people"]').click();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(800);
    const outline = await page.evaluate(
      () => getComputedStyle(document.querySelector('[data-testid="shape-pillar-people"]')).outlineStyle,
    );
    check(outline === "none", `${tag}: a focus ring was painted after a mouse click (${outline})`);

    // ── 6 · the floor and the column, at the recap, with all six grown ───────
    const halo = await page.evaluate(
      () => getComputedStyle(document.querySelector('[data-testid="shape-pillar-governance"]')).boxShadow,
    );
    check(
      /0px 0px 0px 4px/.test(halo),
      `${tag}: the halo is not a hard ${HALO}px spread — "${halo}" — so adding ${HALO} by hand ` +
        `below would be measuring something that is not painted`,
    );
    const geometry = await page.evaluate((ids) => {
      const stage = document.querySelector('[data-testid="slide"]').getBoundingClientRect();
      const scale = stage.width / 1280;
      const toStage = (r) => ({
        left: (r.left - stage.left) / scale,
        right: (r.right - stage.left) / scale,
        bottom: (r.bottom - stage.top) / scale,
      });
      return {
        boxes: ids.map((id) =>
          toStage(document.querySelector(`[data-testid="shape-pillar-${id}"]`).getBoundingClientRect()),
        ),
        column: toStage(
          document.querySelector('[data-testid="shape-walk-column"]').getBoundingClientRect(),
        ),
        allLit: ids.every(
          (id) => document.querySelector(`[data-testid="shape-pillar-${id}"]`).dataset.active === "true",
        ),
      };
    }, PILLARS);
    check(geometry.allLit, `${tag}: the recap does not light all six pillars`);
    const lowest = Math.max(...geometry.boxes.map((b) => b.bottom)) + HALO;
    const rightmost = Math.max(...geometry.boxes.map((b) => b.right)) + HALO;
    const leftmost = Math.min(...geometry.boxes.map((b) => b.left)) - HALO;
    console.log(
      `  ${tag} · recap: lowest painted ${lowest.toFixed(2)} (band at ${NAV_ZONE_TOP}) · ` +
        `rightmost ${rightmost.toFixed(2)} (column at ${PANEL_LEFT}) · leftmost ${leftmost.toFixed(2)}`,
    );
    check(lowest < NAV_ZONE_TOP, `${tag}: recap floor ${lowest.toFixed(2)} is inside the NavBar band`);
    check(rightmost < PANEL_LEFT, `${tag}: recap figure ${rightmost.toFixed(2)} touches the column`);
    check(leftmost > 0, `${tag}: recap figure clipped at the stage edge (${leftmost.toFixed(2)})`);
    check(
      Math.abs(geometry.column.left - PANEL_LEFT) < 1,
      `${tag}: the column starts at ${geometry.column.left}, expected ${PANEL_LEFT}`,
    );

    await page.keyboard.press("ArrowUp");
    await page.waitForTimeout(700);
    check(
      (await page.getAttribute('[data-testid="shape-pillar-people"]', "data-pinned")) === "true",
      `${tag}: the pin was lost on a 0 → 1 → 0 round trip`,
    );
  }

  const real = errors.filter((e) => !DEV_SERVER_NOISE.test(e));
  check(real.length === 0, `${tag}: console errors ${JSON.stringify(real)}`);
  await context.close();
}

const browser = await chromium.launch();
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
