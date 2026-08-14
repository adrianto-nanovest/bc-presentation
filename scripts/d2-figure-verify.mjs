// THE DOSSIER, IN A REAL ENGINE — the browser evidence for D.2 after the 2026-08-14 redraw
// (two poses, a source plate, a wiring harness, one card per figure, and two loops).
//
// `tests/unit/invest-own-proof.test.tsx` owns everything jsdom can see, and both the geometry
// and the walk are pure functions, so a node test proves every coordinate and every gate
// without rendering anything. What jsdom CANNOT do is resolve a `var()`, measure a string,
// place a box or run a keyframe. Every claim below turns on one of those four:
//
//   1. THE CHAIN IS ACTUALLY A CHAIN. The card's first line is a FLEX ROW — the figure takes
//      its own width and the leader takes what is left — so where the dots start is a fact
//      about the rendered text, not about a constant. What has to hold is that the branch,
//      the node, the figure, the leader and the chip all sit on ONE y, that the two gaps are
//      the geometry's `CHAIN_GAP`, and that the leader is still long enough to read as a
//      leader under the longest figure either brand quotes.
//   2. NOTHING WRAPS AND NOTHING LEAVES THE STAGE. The chip is the string the AC is written
//      about ("PARTICIPANT-CLAIMED", 19 characters inside a 160px field), the citation is
//      ≈110 characters of 10.5px mono on one line, and the headline is 47 characters of a
//      display face at 40px. All three are measured here because a wrap is invisible to
//      jsdom and obvious on a projector.
//   3. THE BUILD MOVES, AND THE TWO LOOPS LOOP. The dossier is complete at pose 0, so its
//      whole entrance is a set of one-shot keyframes on mount — the failure mode being an
//      animation that has already finished before the slide is visible. Sampled per frame.
//   4. THE FLOORS ARE COMPUTED, NOT TRANSCRIBED. gh#50's 9.5px mono / 10.5px prose floors and
//      the `--neutral-300` colour floor are read off the resolved cascade, so a retune of
//      `globals.css` moves the gate with it.
//
// IT REPLACES `scripts/gh56-verify.mjs`, WHICH MEASURED THE LEDGER THIS FIGURE REPLACED. That
// harness walked three poses of a four-row text column, asserted a row pitch, a right-aligned
// chip and a source line that slid up under the shorter brand's column — none of which exists
// after the redraw. Its two halves that were not about the ledger's layout are carried over
// here: the rendered FIG label in both leader decks (the letter is DERIVED, §3.5, so it is
// checked on the page rather than in a file) and the floors above. Its deck-wide numbering
// table is not, because `tests/fixtures/deck-numbering.json` harvests exactly that from every
// composed deck in a unit test.
//
// USAGE
//   $ npm run dev
//   $ node scripts/d2-figure-verify.mjs                 # both leader decks
//   $ DECK_URL=http://localhost:4173 node scripts/d2-figure-verify.mjs
//
// THE SLIDE INDEX IS FOUND, NOT TYPED. D.2's position moves whenever an `invest` row is
// inserted ahead of it (it printed D.1 until gh#70), so this walks the deck until it finds the
// figure's own testid rather than hard-coding an index that goes stale silently.
import { chromium } from "@playwright/test";
// The brand and deck-set table — plain data with no imports, so bare Node's type stripping
// resolves it standalone, and WHICH variants are leader decks stays its answer.
import { VARIANTS } from "../src/deck-variants.ts";
// The module under test. Imported for CROSS-CHECKS ONLY — every claim below is asserted
// against a measured rect first, and these constants are then held against that measurement.
// `../src/slides/leader-invest/content.ts` is deliberately NOT imported: bare Node cannot
// resolve its `@/` aliases, and a harness that asserts the strings it imports proves only that
// the content module equals itself. Every string below is transcribed from spec §6.7.
import {
  CARD_HEIGHT,
  CARD_LEFT,
  CARD_PITCH,
  CARD_WIDTH,
  CHAIN_GAP,
  CONTENT_RIGHT,
  MARK_COL_W,
  NAV_ZONE_TOP,
  SIDE_MARGIN,
  SOURCE_HEIGHT,
  SOURCE_TOP,
  THESIS_TOP,
  chainY,
} from "../src/slides/leader-invest/geometry.ts";

const BASE = process.env.DECK_URL ?? "http://localhost:5173";
const PLATE = "[data-testid='invest-source-plate']";
/** Chromium lays out in 1/64px `LayoutUnit`s, so this is one unit of slack and no more. */
const SUBPIXEL = 1 / 64;
/** gh#50 call 3's projector floors, restated rather than imported — a harness that reads the
 *  number it is checking proves only that the number equals itself. */
const MONO_FLOOR = 9.5;
const PROSE_FLOOR = 10.5;

/** Every leader variant — derived from the shared table, so a third leader brand is measured
 *  without an edit here. The standard decks compose no `invest` run. */
const LEADER_VARIANTS = Object.values(VARIANTS)
  .filter((v) => v.deckSet === "leader")
  .map((v) => v.id);

/**
 * What each deck must SAY, transcribed from §6.7 and not read off the content module.
 *
 * The metric names are deliberately not transcribed: they are the most reworded strings on the
 * slide and the unit test pins them. What is here is what a rewrite must never quietly change
 * — the numbers, the marks, and whose proof it is.
 */
const SAYS = {
  gems: {
    eyebrow: "GEMVIS · GEMS' OWN PLATFORM",
    figures: ["+90%", "2 days → under 1 hour", "50+", "4,000+"],
    // Stored lower case, as §6.7 writes it; the mono register shouts it on the stage. So the
    // DOM text is the union's own value and the transform is what the room sees.
    mark: "vendor-reported",
    attribution: ["Google Cloud", "customer story", "vendor-reported", "not independently audited"],
  },
  berau: {
    eyebrow: "VOL-1 WINNERS · BERAU COAL'S OWN TEAMS",
    figures: ["IDR 135–155M", "IDR 35–38M", "IDR 200–700M"],
    mark: "participant-claimed",
    attribution: ["Vol-1", "annual-impact", "participant-claimed", "not independently audited"],
  },
};

const HEADLINE = "The only numbers a leader trusts are their own.";
const CAPTION = "WHOSE PROOF THIS IS";
const THESIS = "A few people proved it. Now imagine it across the whole org.";
// The rendered label, WITH `FigLabel`'s own separator and its spacing: the `·` is a `<span>`
// of its own and the runs either side carry no space, so the page reads `D.2·PROOF`. Checked
// as it renders rather than as it is written down, because the LETTER is derived from the
// composed deck (§3.5) and this is the only place that derivation is visible.
const FIG_LABEL = "FIG. D.2·PROOF FROM INSIDE THE COMPANY";

let failures = 0;
const check = (ok, label, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "  ok  " : " FAIL "} ${label}${detail ? ` — ${detail}` : ""}`);
};
const near = (a, b) => Math.abs(a - b) <= SUBPIXEL;
const flat = (s) => (s ?? "").replace(/\s+/g, " ").trim();

const browser = await chromium.launch();

/** Open a deck and walk to the slide this figure is on. */
async function openFigure(page, variant) {
  await page.goto(`${BASE}?variant=${variant}`, { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i++) {
    await page.goto(`${BASE}?variant=${variant}&slide=${i}`, { waitUntil: "networkidle" });
    if (await page.locator(PLATE).first().count()) return i;
  }
  throw new Error(`no slide in ${variant} mounts ${PLATE} (walked ${count})`);
}

/**
 * Every box the figure owns, in STAGE coordinates.
 *
 * The stage is letterboxed and scaled, so a raw `getBoundingClientRect` is in screen pixels
 * and cannot be compared to a geometry module written for 1280×720. Everything is divided
 * back through the stage's own scale, which is what makes `near(top, chainY(i, n))` a
 * meaningful sentence.
 */
async function measure(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".stage").getBoundingClientRect();
    const scale = stage.width / 1280;
    const toStage = (r) => ({
      left: (r.left - stage.left) / scale,
      right: (r.right - stage.left) / scale,
      top: (r.top - stage.top) / scale,
      bottom: (r.bottom - stage.top) / scale,
      width: r.width / scale,
      height: r.height / scale,
    });
    const read = (el) => {
      const cs = getComputedStyle(el);
      return {
        rect: toStage(el.getBoundingClientRect()),
        text: el.textContent,
        size: parseFloat(cs.fontSize),
        family: cs.fontFamily,
        color: cs.color,
        lineHeight: cs.lineHeight,
        opacity: +cs.opacity,
        display: cs.display,
        animation: cs.animationName,
      };
    };
    const boxes = {};
    for (const el of document.querySelectorAll("[data-testid^='invest-']")) {
      boxes[el.dataset.testid] = read(el);
    }
    const headline = document.querySelector(".slide-headline");
    const figLabel = document.querySelector(".fig-label");
    return {
      scale,
      boxes,
      headline: headline ? read(headline) : null,
      figLabel: figLabel ? figLabel.textContent : null,
      // The colour floor, resolved from the cascade rather than transcribed.
      tiers: (() => {
        const probe = document.createElement("span");
        document.body.appendChild(probe);
        const out = {};
        for (const token of ["--neutral-300", "--copper-400"]) {
          probe.style.color = `var(${token})`;
          out[token] = getComputedStyle(probe).color;
        }
        probe.remove();
        return out;
      })(),
      smil: document.querySelectorAll("animate, animateTransform, animateMotion, set").length,
      svg: document.querySelectorAll("[data-testid^='invest-'] svg").length,
    };
  });
}

/** WCAG relative luminance, so "under the floor" is a number and not an opinion. */
function luminance(rgb) {
  const [r, g, b] = rgb.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

for (const variant of LEADER_VARIANTS) {
  const brand = VARIANTS[variant].brand;
  const says = SAYS[brand];
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const slide = await openFigure(page, variant);
  console.log(`\n══ ${variant} · D.2 is slide ${slide} ══`);

  // ── 1 · the build, sampled per frame ───────────────────────────────────────
  console.log("\n-- the build, sampled per frame --");
  const samples = await page.evaluate(async () => {
    const read = (id) => {
      const el = document.querySelector(`[data-testid="${id}"]`);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return `${(+cs.opacity).toFixed(2)}|${cs.transform}`;
    };
    const first = document.querySelector("[data-testid^='invest-row-']").dataset.testid.slice(11);
    const out = [];
    const t0 = performance.now();
    while (performance.now() - t0 < 2200) {
      await new Promise((r) => requestAnimationFrame(r));
      out.push({
        plate: read("invest-source-plate"),
        origin: read("invest-origin"),
        spine: read("invest-spine"),
        card: read(`invest-row-${first}`),
        leader: read(`invest-leader-${first}`),
      });
    }
    return out;
  });
  for (const key of ["plate", "origin", "spine", "card", "leader"]) {
    const frames = new Set(samples.map((s) => s[key]));
    check(frames.size > 1, `${key} animates on mount`, `${frames.size} frames in 2.2s`);
  }

  // ── 2 · the two loops ──────────────────────────────────────────────────────
  console.log("\n-- the loops --");
  const loops = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid^='invest-']")]
      .flatMap((el) =>
        el.getAnimations().map((a) => ({
          id: el.dataset.testid,
          name: getComputedStyle(el).animationName,
          infinite: a.effect.getComputedTiming().iterations === Infinity,
        })),
      )
      .filter((a) => a.infinite),
  );
  const ring = loops.filter((l) => l.id === "invest-origin-ring");
  const pulses = loops.filter((l) => l.id.startsWith("invest-pulse-"));
  check(ring.length === 1, "the origin ring loops for ever", ring[0]?.name ?? "absent");
  check(
    pulses.length === says.figures.length,
    "one pulse per figure, each looping for ever",
    `${pulses.length} of ${says.figures.length}`,
  );
  check(
    loops.length === ring.length + pulses.length,
    "and nothing else on the stage loops",
    loops.map((l) => l.id).join(", "),
  );

  // ── 3 · what the stage says ────────────────────────────────────────────────
  await page.waitForTimeout(1800);
  const m = await measure(page);
  console.log("\n-- the copy --");
  check(flat(m.figLabel).includes(FIG_LABEL), "the derived figure label reads D.2", flat(m.figLabel));
  check(flat(m.headline?.text) === HEADLINE, "the headline is the reworded premise", flat(m.headline?.text));
  check(flat(m.boxes["invest-source-caption"]?.text) === CAPTION, "the plate is captioned");
  check(
    flat(m.boxes["invest-eyebrow"]?.text) === says.eyebrow,
    "the plate names whose proof it is",
    flat(m.boxes["invest-eyebrow"]?.text),
  );

  const cardIds = Object.keys(m.boxes)
    .filter((k) => k.startsWith("invest-row-"))
    .map((k) => k.slice("invest-row-".length));
  check(
    cardIds.length === says.figures.length,
    `${says.figures.length} cards, one per figure`,
    `${cardIds.length}`,
  );
  const rendered = cardIds.map((id) => flat(m.boxes[`invest-figure-${id}`].text));
  check(
    JSON.stringify(rendered) === JSON.stringify(says.figures),
    "every figure verbatim, in order",
    rendered.join(" · "),
  );
  const marks = new Set(cardIds.map((id) => flat(m.boxes[`invest-mark-${id}`].text)));
  check(
    marks.size === 1 && marks.has(says.mark),
    "every card carries its own epistemic mark",
    [...marks].join(" · "),
  );
  const attribution = flat(m.boxes["invest-attribution"].text);
  for (const part of says.attribution) {
    check(attribution.includes(part), `the citation names "${part}"`);
  }

  // ── 4 · the chain, measured ────────────────────────────────────────────────
  console.log("\n-- the chain --");
  cardIds.forEach((id, i) => {
    const y = chainY(i, cardIds.length);
    const mid = (b) => b.rect.top + b.rect.height / 2;
    const branch = m.boxes[`invest-branch-${id}`];
    const node = m.boxes[`invest-node-${id}`];
    const figure = m.boxes[`invest-figure-${id}`];
    const leader = m.boxes[`invest-leader-${id}`];
    const chip = m.boxes[`invest-mark-${id}`];
    // THE WIRE'S LINE IS ITS TOP EDGE and every other mark's is its middle: a 1px branch
    // placed AT y has its centre at y + 0.5, and asking a hairline to centre on the line it
    // IS would be asking for half a pixel back.
    const onLine = [branch.rect.top, mid(node), mid(figure), mid(leader), mid(chip)];
    check(
      onLine.every((v) => near(v, y)),
      `${id}: branch · node · figure · leader · chip all sit on y=${y}`,
      onLine.map((v) => v.toFixed(2)).join(" / "),
    );
    check(
      near(leader.rect.left - figure.rect.right, CHAIN_GAP) &&
        near(chip.rect.left - leader.rect.right, CHAIN_GAP),
      `${id}: the leader starts and stops one gap from its neighbours`,
      `${(leader.rect.left - figure.rect.right).toFixed(2)} / ${(chip.rect.left - leader.rect.right).toFixed(2)}`,
    );
    check(
      leader.rect.width >= 40,
      `${id}: the leader is still a leader`,
      `${leader.rect.width.toFixed(1)}px of dots`,
    );
    // THE CHIP NEVER WRAPS: a wrapped caveat reads as damage, and the field was measured
    // for the longer of the two marks.
    check(
      near(chip.rect.width, MARK_COL_W) && chip.rect.height <= 21,
      `${id}: the chip fills its field on one line`,
      `${chip.rect.width.toFixed(1)}×${chip.rect.height.toFixed(1)}`,
    );
    // The metric name, under the chain, on one line.
    const metric = m.boxes[`invest-metric-${id}`];
    check(
      metric.rect.height <= metric.size * 1.45,
      `${id}: the metric name sets on one line`,
      `${metric.rect.height.toFixed(1)}px at ${metric.size}px`,
    );
  });

  // ── 5 · the stage, and its floor ───────────────────────────────────────────
  console.log("\n-- the stage --");
  const cards = cardIds.map((id) => m.boxes[`invest-row-${id}`].rect);
  check(
    cards.every((r) => near(r.left, CARD_LEFT) && near(r.width, CARD_WIDTH) && near(r.height, CARD_HEIGHT)),
    "every card is the same box — no card is ranked by size",
  );
  check(
    cards.every((r, i) => i === 0 || near(r.top - cards[i - 1].top, CARD_PITCH)),
    "the cards are evenly pitched",
  );
  check(
    near(m.boxes["invest-source-plate"].rect.top, SOURCE_TOP) &&
      near(m.boxes["invest-source-plate"].rect.height, SOURCE_HEIGHT),
    "the plate is the same box in both rooms",
  );
  check(near(m.boxes["invest-source-plate"].rect.top + SOURCE_HEIGHT / 2, m.boxes["invest-trunk"].rect.top),
    "the harness leaves the plate at its middle");

  const painted = Object.entries(m.boxes).filter(([, b]) => b.rect.width > 0);
  const outside = painted.filter(
    ([, b]) => b.rect.left < SIDE_MARGIN - SUBPIXEL || b.rect.right > CONTENT_RIGHT + SUBPIXEL,
  );
  check(outside.length === 0, "nothing crosses the side margins", outside.map(([k]) => k).join(", "));
  const below = painted.filter(([, b]) => b.rect.bottom > NAV_ZONE_TOP + SUBPIXEL);
  check(below.length === 0, "nothing crosses the NavBar band at y=632", below.map(([k]) => k).join(", "));
  check(
    m.headline.rect.bottom <= 124,
    "the headline row ends where the budget says",
    `y=${m.headline.rect.bottom.toFixed(1)}`,
  );
  check(
    m.headline.rect.height <= m.headline.size * 1.2,
    "the headline sets on ONE line",
    `${m.headline.rect.height.toFixed(1)}px at ${m.headline.size}px`,
  );
  const firstCardTop = Math.min(...cards.map((r) => r.top));
  check(
    Math.min(firstCardTop, m.boxes["invest-source-plate"].rect.top) - m.headline.rect.bottom >= 34,
    "the body keeps its air under the headline",
    `${(Math.min(firstCardTop, m.boxes["invest-source-plate"].rect.top) - m.headline.rect.bottom).toFixed(1)}px`,
  );
  const cite = m.boxes["invest-attribution"];
  check(
    cite.rect.height <= cite.size * 1.6,
    "the citation sets on ONE line",
    `${cite.rect.height.toFixed(1)}px at ${cite.size}px`,
  );

  console.log("\n-- the floors --");
  const floorLum = luminance(m.tiers["--neutral-300"]);
  const exempt = m.tiers["--copper-400"];
  const textBoxes = painted.filter(([, b]) => flat(b.text).length > 0);
  const tooSmall = textBoxes.filter(([, b]) => {
    const floor = b.family.includes("Mono") || b.family.includes("mono") ? MONO_FLOOR : PROSE_FLOOR;
    return b.size < floor;
  });
  check(tooSmall.length === 0, "no run is under gh#50's size floor", tooSmall.map(([k]) => k).join(", "));
  const tooDark = textBoxes.filter(
    ([, b]) => luminance(b.color) < floorLum - 0.001 && b.color !== exempt,
  );
  check(
    tooDark.length === 0,
    "no run is under the --neutral-300 colour floor (bar the copper label tier)",
    tooDark.map(([k, b]) => `${k} ${b.color}`).join(", "),
  );

  console.log("\n-- SMIL --");
  check(m.smil === 0, "zero SMIL nodes", `${m.smil}`);
  check(m.svg === 0, "the figure mounts no <svg> at all", `${m.svg}`);

  // ── 6 · the thesis, and the walk back ──────────────────────────────────────
  console.log("\n-- the thesis --");
  check(m.boxes["invest-closer"].opacity === 0, "pose 0 rests with the thesis still off the stage");
  await page.keyboard.press("ArrowDown"); // next STEP; ArrowRight is the next SLIDE
  // WAITED FOR, NOT SLEPT THROUGH. `.fade`'s transition and its `fadeReveal` keyframe both
  // run behind the `Reveal`'s own 140ms delay, and a fixed sleep that lands mid-fade reads
  // the thesis 8px above its shelf — which is what a translate mid-flight looks like.
  await page.waitForFunction(
    () => +getComputedStyle(document.querySelector('[data-testid="invest-closer"]')).opacity === 1,
    null,
    { timeout: 5000 },
  );
  await page.waitForTimeout(200);
  const t = await measure(page);
  const thesis = t.boxes["invest-closer"];
  check(thesis.opacity === 1, "the thesis is revealed at pose 1");
  check(flat(thesis.text) === THESIS, "and it is the deck's own sentence", flat(thesis.text));
  check(thesis.size === 19, "set at 19px — D.1's size, under the evidence it prices", `${thesis.size}px`);
  check(near(thesis.rect.top, THESIS_TOP), `it lands on y=${THESIS_TOP}`, `y=${thesis.rect.top.toFixed(1)}`);
  check(
    thesis.rect.bottom <= NAV_ZONE_TOP,
    "and clears the NavBar hover band",
    `bottom y=${thesis.rect.bottom.toFixed(1)}`,
  );
  check(
    thesis.rect.height <= thesis.size * 1.4,
    "the thesis sets on ONE line",
    `${thesis.rect.height.toFixed(1)}px`,
  );
  await page.screenshot({ path: `exports/d2-${variant}-pose1.png` });

  await page.keyboard.press("ArrowUp");
  await page.waitForFunction(
    () => +getComputedStyle(document.querySelector('[data-testid="invest-closer"]')).opacity === 0,
    null,
    { timeout: 5000 },
  );
  const back = await measure(page);
  check(back.boxes["invest-closer"].opacity === 0, "stepping back takes the thesis away again");
  check(
    cardIds.every((id) => back.boxes[`invest-row-${id}`].opacity === 1),
    "and leaves every card exactly where it was",
  );
  await page.close();
}

// ── 7 · reduced motion ───────────────────────────────────────────────────────
{
  console.log("\n══ prefers-reduced-motion: reduce ══");
  const variant = LEADER_VARIANTS[0];
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    reducedMotion: "reduce",
  });
  await openFigure(page, variant);
  await page.waitForTimeout(1800);
  const state = await page.evaluate(() => ({
    running: document.getAnimations().filter((a) => a.playState === "running").length,
    invisible: [...document.querySelectorAll("[data-testid^='invest-']")]
      .filter((el) => +getComputedStyle(el).opacity === 0 && getComputedStyle(el).display !== "none")
      .map((el) => el.dataset.testid),
    removed: [...document.querySelectorAll("[data-testid^='invest-']")]
      .filter((el) => getComputedStyle(el).display === "none")
      .map((el) => el.dataset.testid),
  }));
  check(state.running === 0, "nothing is still animating", `${state.running} running`);
  // THE TWO LOOPS ARE REMOVED, NOT PARKED — a pulse has no resting frame, so `./own-proof.css`
  // takes them off the stage rather than letting the global squash flicker them.
  check(
    state.removed.length === 1 + (state.removed.filter((id) => id.startsWith("invest-pulse-")).length),
    "the ring and every pulse are removed outright",
    state.removed.join(", "),
  );
  check(
    state.invisible.length === 1 && state.invisible[0] === "invest-closer",
    "every other box rests on its finished frame (the thesis is pose 1's)",
    state.invisible.join(", ") || "none invisible",
  );
  await page.screenshot({ path: `exports/d2-reduce.png` });
  await page.close();
}

await browser.close();
console.log(
  failures === 0
    ? "\nALL CHECKS PASSED · shots in exports/d2-*.png\n"
    : `\n${failures} CHECK(S) FAILED\n`,
);
process.exit(failures === 0 ? 0 : 1);
