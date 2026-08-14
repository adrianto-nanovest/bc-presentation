// MIDDLE-OUT, IN A REAL ENGINE — the browser evidence for C.4 after the 2026-08-14 rework
// (two poses, a built figure, a double-headed arrow with two looping pulses, and a hover
// that pairs each plate with its approach card).
//
// `tests/unit/shape-middle-out.test.tsx` owns everything jsdom can see, and both the
// geometry and the walk are pure functions, so a node test proves every coordinate and
// every gate without rendering anything. What jsdom CANNOT do is resolve a `var()`, place a
// box, run a keyframe or dispatch a real pointer. Every claim below turns on one of those
// four:
//
//   1. THE BUILD ACTUALLY MOVES. The figure is complete at pose 0, so its whole entrance is
//      a set of one-shot keyframes on mount. jsdom reports the CLASS and the DELAY and can
//      say nothing about whether a frame was ever painted — which is exactly the failure
//      this slide shipped with once already (a `.fade` box whose animation had finished
//      before the slide was visible). So the opacity and transform of five boxes are
//      sampled per animation frame and the FIRST CHANGE is reported for each.
//   2. THE TWO PULSES LOOP FOR EVER, AND OUTWARD. `mo-flow-up` / `mo-flow-down` are the only
//      infinite animations on the stage; their `iterations` is read off the running
//      animation rather than off the stylesheet.
//   3. THE HOVER PAIRS A PLATE WITH ITS CARD, AND SUBTRACTS NOTHING. Hovering either box
//      must change the seven elements of that tier and NOTHING else — §7.1's no-dim rule
//      stated as a byte-for-byte comparison of every other box's computed border,
//      background and colour, before and during the hover.
//   4. REDUCED MOTION LANDS ON THE FINISHED FRAME. `globals.css` squashes durations and
//      `middle-out.css` removes the loop outright; what has to be true is that after the
//      build nothing is still running and nothing is left invisible.
//
// USAGE
//   $ npm run dev
//   $ node scripts/c4-figure-verify.mjs            # berau-leader, slide auto-located
//   $ DECK_URL=http://localhost:4173 node scripts/c4-figure-verify.mjs
//
// THE SLIDE INDEX IS FOUND, NOT TYPED. C.4's position moves whenever a `shape` row is
// inserted ahead of it (it printed C.3 until gh#71), so this walks the deck until it finds
// the figure's own testid prefix rather than hard-coding an index that goes stale silently.
import { chromium } from "@playwright/test";

const BASE = process.env.DECK_URL ?? "http://localhost:5173";
const VARIANT = process.env.DECK_VARIANT ?? "berau-leader";
const ANY_BOX = "[data-testid^='middle-out-']";

let failures = 0;
const check = (ok, label, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "  ok  " : " FAIL "} ${label}${detail ? ` — ${detail}` : ""}`);
};

const browser = await chromium.launch();

/** Open the deck and walk to the slide this figure is on. */
async function openFigure(page) {
  await page.goto(`${BASE}?variant=${VARIANT}`, { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i++) {
    await page.goto(`${BASE}?variant=${VARIANT}&slide=${i}`, { waitUntil: "networkidle" });
    if (await page.locator(ANY_BOX).first().count()) return i;
  }
  throw new Error(`no slide in ${VARIANT} mounts ${ANY_BOX}`);
}

// ── 1 · the build ────────────────────────────────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const slide = await openFigure(page);
  console.log(`\nC.4 · ${VARIANT} · slide ${slide}\n\n== the build, sampled per frame ==`);

  const samples = await page.evaluate(async () => {
    const read = (id) => {
      const el = document.querySelector(`[data-testid="${id}"]`);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { o: +(+cs.opacity).toFixed(2), t: cs.transform };
    };
    const out = [];
    const t0 = performance.now();
    while (performance.now() - t0 < 2000) {
      await new Promise((r) => requestAnimationFrame(r));
      out.push({
        ms: Math.round(performance.now() - t0),
        plate: read("middle-out-plate-top"),
        card: read("middle-out-card-middle"),
        shaft: read("middle-out-shaft-up"),
        dot: read("middle-out-origin-dot"),
        head: read("middle-out-head-up"),
      });
    }
    return out;
  });
  for (const key of ["plate", "card", "shaft", "dot", "head"]) {
    const opacity = samples.map((s) => s[key]?.o);
    const transform = samples.map((s) => s[key]?.t);
    const moved =
      new Set(opacity).size > 1 || new Set(transform).size > 1
        ? `opacity ${Math.min(...opacity)}→${Math.max(...opacity)}, ` +
          `${new Set(transform).size} transform frames`
        : "";
    check(!!moved, `${key} animates on mount`, moved || "never changed in 2s");
  }

  // ── 2 · the two pulses
  console.log("\n== the flow ==");
  const flow = await page.evaluate(() =>
    ["middle-out-flow-up", "middle-out-flow-down"].map((id) => {
      const el = document.querySelector(`[data-testid="${id}"]`);
      const anim = el.getAnimations()[0];
      const timing = anim?.effect.getComputedTiming();
      return {
        id,
        name: getComputedStyle(el).animationName,
        infinite: timing?.iterations === Infinity,
        duration: timing?.duration,
        gradient: getComputedStyle(el).backgroundImage.slice(0, 24),
      };
    }),
  );
  for (const f of flow) {
    check(f.infinite, `${f.id} loops for ever`, `${f.name} ${f.duration}ms`);
    check(f.gradient.startsWith("linear-gradient"), `${f.id} is a gradient pulse`, f.gradient);
  }
  check(
    flow[0].duration === flow[1].duration,
    "both pulses share one duration — the two acts are simultaneous",
  );

  // ── 3 · the hover
  console.log("\n== the hover, one tier at a time ==");
  const capture = () =>
    page.evaluate(() =>
      Object.fromEntries(
        [...document.querySelectorAll("[data-testid^='middle-out-']")].map((el) => {
          const cs = getComputedStyle(el);
          return [
            el.dataset.testid,
            `${cs.borderColor}|${cs.backgroundColor}|${cs.color}|${el.dataset.hover ?? "-"}`,
          ];
        }),
      ),
    );
  const resting = await capture();
  for (const tier of ["top", "middle", "teams"]) {
    for (const target of [`middle-out-plate-${tier}`, `middle-out-card-${tier}`]) {
      await page.hover(`[data-testid="${target}"]`);
      await page.waitForTimeout(320);
      const now = await capture();
      const moved = Object.keys(resting).filter((k) => resting[k] !== now[k]);
      const mine = moved.filter((k) => k.includes(tier));
      check(
        moved.length > 0 && moved.length === mine.length,
        `hover ${target} moves only its own tier`,
        `${moved.length} boxes: ${moved.join(", ")}`,
      );
      check(
        now[`middle-out-plate-${tier}`].endsWith("true") &&
          now[`middle-out-card-${tier}`].endsWith("true"),
        `hover ${target} lights the plate AND the card`,
      );
      // THE RANKING SURVIVES THE POINTER: whatever is hovered, the middle plate is still
      // the warmest ground on the stage unless it is the one under the pointer.
      if (tier !== "middle") {
        const hovered = now[`middle-out-plate-${tier}`].split("|")[1];
        const lit = now["middle-out-plate-middle"].split("|")[1];
        check(hovered !== lit, `hovered ${tier} plate is not the lit plate's ground`, `${hovered} vs ${lit}`);
      }
      await page.mouse.move(4, 4);
      await page.waitForTimeout(320);
    }
  }
  const released = await capture();
  check(
    JSON.stringify(released) === JSON.stringify(resting),
    "every tier returns to rest when the pointer leaves",
  );

  // ── 4 · the thesis, and the floor
  console.log("\n== the thesis ==");
  await page.keyboard.press("ArrowDown"); // next STEP; ArrowRight is the next SLIDE
  await page.waitForTimeout(900);
  const thesis = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="middle-out-thesis"]');
    const r = el.getBoundingClientRect();
    const stage = document.querySelector(".stage").getBoundingClientRect();
    const scale = stage.width / 1280;
    return {
      opacity: +getComputedStyle(el).opacity,
      lines: Math.round(r.height / (18 * 1.3 * scale)),
      bottomOnStage: Math.round((r.bottom - stage.top) / scale),
    };
  });
  check(thesis.opacity === 1, "the thesis is revealed at pose 1");
  check(thesis.lines === 1, "the thesis is ONE line at 1280×720", `${thesis.lines}`);
  check(
    thesis.bottomOnStage <= 632,
    "the thesis clears the NavBar hover band at y=632",
    `bottom y=${thesis.bottomOnStage}`,
  );
  await page.screenshot({ path: "exports/c4-pose1.png" });
}

// ── 5 · reduced motion ───────────────────────────────────────────────────────
{
  console.log("\n== prefers-reduced-motion: reduce ==");
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    reducedMotion: "reduce",
  });
  const slide = await openFigure(page);
  await page.waitForTimeout(1800);
  const state = await page.evaluate(() => ({
    running: document.getAnimations().filter((a) => a.playState === "running").length,
    invisible: [...document.querySelectorAll("[data-testid^='middle-out-']")]
      .filter((el) => +getComputedStyle(el).opacity === 0)
      .map((el) => el.dataset.testid),
    smil: document.querySelectorAll("animate, animateTransform, animateMotion, set").length,
    figureSvg: document.querySelectorAll("[data-testid^='middle-out-'] svg").length,
  }));
  check(state.running === 0, "nothing is still animating", `${state.running} running`);
  check(
    state.invisible.length === 1 && state.invisible[0] === "middle-out-thesis",
    "every box rests on its finished frame (the thesis is pose 1's)",
    state.invisible.join(", ") || "none invisible",
  );
  check(state.smil === 0, "zero SMIL nodes");
  check(state.figureSvg === 0, "the figure mounts no <svg> at all");
  console.log(`  (slide ${slide} under reduce)`);
  await page.screenshot({ path: "exports/c4-reduce.png" });
}

await browser.close();
console.log(
  failures === 0
    ? "\nALL CHECKS PASSED · screenshots in exports/c4-pose1.png and exports/c4-reduce.png\n"
    : `\n${failures} CHECK(S) FAILED\n`,
);
process.exit(failures === 0 ? 0 : 1);
