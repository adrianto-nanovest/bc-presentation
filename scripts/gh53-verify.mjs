// gh#53's browser evidence — THE CAPABILITY LADDER, both leader decks, five poses.
//
// The unit tests own everything jsdom can see. This owns the three things it
// cannot, and they are the three the slide is actually at risk of (spec §10.2):
//
//   1. LAYOUT. jsdom places nothing, so every geometric claim in the unit test is
//      "both sides read the same number". Whether those numbers put a 380px chip
//      inside the margins, clear of the NavBar band, and clear of every other box
//      is a question only a real engine answers — and it is the question a
//      re-cut-for-1280×720 ticket has to answer (§7.2).
//   2. THE FOUR ENCODINGS, ON A STAGE. The unit test proves the attributes differ.
//      This proves the computed styles differ, which is what a room sees.
//   3. REDUCED MOTION, both halves. Zero SMIL nodes at every pose is checkable in
//      jsdom; that the staircase then rests on its FINISHED frame is not, because
//      the global rule in globals.css squashes a CSS animation the browser has to
//      actually run.
//
// Modelled on `phase5-verify.mjs` and failing the same way: every assertion prints
// `ok` / `FAIL` and a failure exits 1, so this is runnable from a gate and not only
// readable by a human.
//
// Usage:
//   node scripts/gh53-verify.mjs                      # gems-leader
//   node scripts/gh53-verify.mjs --variant=berau-leader
//   node scripts/gh53-verify.mjs --reduced
//
// The variant is explicit for the same reason the export scripts take one (gh#27):
// a bare localhost resolves to `general`, which does not compose this slide at all.
// Default here is `gems-leader` — the brand with BOTH markers, so the default run
// is the one that can fail the four-encoding check.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";

const USAGE = [
  "Usage: node scripts/gh53-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>]",
  "",
  `  --variant=<id>   Deck to verify. Default: gems-leader. Ids: ${VARIANT_IDS.join(", ")}`,
  "  --reduced        Run under `prefers-reduced-motion: reduce`.",
  "  --out=<dir>      Where to write the shots. Default: /tmp/gh53",
  "",
  "  DECK_URL         Base url to render. Default: http://localhost:5173",
].join("\n");

const { variant: parsedVariant, flags, values } = parseVariantArgOrExit(
  process.argv.slice(2),
  USAGE,
  { booleans: ["reduced"], values: ["out"] },
);

// The shared parser defaults to `general`, which composes no `gap` run. An
// explicit `--variant` always wins.
const VARIANT = process.argv.slice(2).some((a) => a.startsWith("--variant"))
  ? parsedVariant
  : "gems-leader";
const REDUCED = flags.reduced;
const OUT = values.out ?? (REDUCED ? "/tmp/gh53-reduced" : "/tmp/gh53");
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
mkdirSync(OUT, { recursive: true });

const url = (params = {}) => deckUrl(BASE, VARIANT, params);

/** The stage's own safe floor. `E12Primitives` measured the NavBar cluster at
 *  ≈56px including its padding and stops slide content above y≈660; the same
 *  number binds here, because it is the same NavBar. */
const NAVBAR_TOP = 660;
/** The deck's standard side margins. */
const MARGIN = { left: 48, right: 1280 - 48 };

/** gh#50's projector floors, restated here rather than imported: those constants
 *  are section E's, and a shared typography module is a cleanup this ticket is not.
 *  Two copies on purpose — a harness that reads the number it is checking proves
 *  only that the number equals itself. */
const MONO_FLOOR = 9.5;
const PROSE_FLOOR = 10.5;
/** `--neutral-300` (#a3a3a3). Nothing on this slide rests dimmer than this, so the
 *  gate is a relative-luminance floor rather than a list of allowed hexes. */
const TIER_FLOOR_LUMINANCE = relativeLuminance(163, 163, 163);

function relativeLuminance(r, g, b) {
  const lin = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** Every box the ladder always draws, whichever brand is in front of it. */
const ALWAYS = [
  "gap-ladder-path",
  "gap-ladder-provenance",
  "gap-tech-slot",
  "gap-marker-open",
  "gap-aside",
  "gap-closer",
  ...["l1", "l2", "l3", "l4", "l5"].map((r) => `gap-rung-${r}`),
];

/**
 * What each pose must have REVEALED, and the boxes it must still be holding back.
 *
 * REQUIRED AND FORBIDDEN, both named. A gate that only measures the boxes it finds
 * passes when a box goes missing — it just measures fewer of them — which is the
 * failure a five-pose build is most likely to ship.
 */
const REVEALED_BY_POSE = [
  [],
  ["gap-tech-slot"],
  ["gap-tech-slot", "gap-marker-open"],
  ["gap-tech-slot", "gap-marker-open", "gap-aside"],
  ["gap-tech-slot", "gap-marker-open", "gap-aside", "gap-closer"],
];
/** The SVG marks each pose must have mounted. The asserted mark is brand-dependent
 *  and is folded in at run time. */
const MARKS_BY_POSE = [
  [],
  ["gap-mark-asserted"],
  ["gap-mark-asserted", "gap-mark-open"],
  ["gap-mark-asserted", "gap-mark-open", "gap-dot-aside"],
  ["gap-mark-asserted", "gap-mark-open", "gap-dot-aside"],
];

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

/** A slide's index is DISCOVERED, never hardcoded: §3 derives every position and
 *  the rest of Phase 6 inserts four more `gap` slides in front of this one, so a
 *  literal index would check whatever slide 2 has become. */
async function findSlide(page, slideCount, testid) {
  for (let i = 0; i < slideCount; i++) {
    for (const attempt of [1, 2]) {
      try {
        await page.goto(url({ slide: i }), { waitUntil: "domcontentloaded" });
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
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
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

await page.goto(url(), { waitUntil: "domcontentloaded" });
const slideCount = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
const index = await findSlide(page, slideCount, "gap-ladder-path");
if (index == null) {
  console.error(
    `the capability ladder is not in ${VARIANT} (${slideCount} slides). It composes ` +
      `into the two leader deck sets only.`,
  );
  process.exit(1);
}
console.log(
  `variant ${VARIANT} · ${slideCount} slides · the ladder at index ${index}` +
    `${REDUCED ? " · reduced motion" : ""}\n`,
);

const stage = page.locator('[data-testid="slide"]');
const shot = (name) => stage.screenshot({ path: `${OUT}/${name}.png` });
const smil = () => page.$$eval("animate, animateMotion, animateTransform, set", (e) => e.length);

/** Walk to a pose from a fresh mount of the slide, so no pose inherits another's
 *  state. `settle` is generous on pose 0: the staircase draws for 1400ms. */
async function atPose(pose) {
  await page.goto(url({ slide: index }), { waitUntil: "networkidle" });
  await stage.waitFor();
  await page.waitForTimeout(REDUCED ? 200 : 1700);
  for (let i = 0; i < pose; i++) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(REDUCED ? 120 : 650);
  }
}

// ───────────────── the figure the deck derives ─────────────────

await atPose(0);
const fig = (await page.locator(".fig-label").first().innerText()).replace(/\s+/g, " ").trim();
// The LETTER is not asserted: this run's deck decides it (§3.4 R2), and the rest of
// Phase 6 moves it. What must hold is that a letter and a number were derived at
// all — `FIG. B.null` or a bare label is the failure.
check("figure is derived, letter and number both", /^— FIG\. [A-N]\.\d+·THE CAPABILITY LADDER$/.test(fig), true);
console.log(`      ${fig}`);
await shot("pose0-the-ladder");

// ───────────────── every pose, walked and audited ─────────────────
//
// ONE LOOP, five poses, and every per-pose claim asserted inside it. Checking the
// last pose only is how a build ships four broken ones: the closer is on the stage
// at pose 4 whatever poses 0–3 did.

/** Whether this brand renders an asserted marker — decided by the deck, not here. */
const hasAsserted = (await page.locator('[data-testid="gap-marker-asserted"]').count()) > 0;

const smilByPose = [];
const missingByPose = [];
const unrevealedByPose = [];
const leakedByPose = [];
const dashByPose = [];
const floorViolations = [];
/** How many text runs the floor audit actually measured, per pose. Printed and
 *  asserted non-zero: an audit that walks nothing passes everything. */
const auditedByPose = [];

for (const pose of [0, 1, 2, 3, 4]) {
  await atPose(pose);
  await shot(`pose${pose}`);

  smilByPose.push(await smil());

  const expectMarks = MARKS_BY_POSE[pose].filter(
    (id) => hasAsserted || !id.includes("asserted"),
  );
  const state = await page.evaluate(
    ({ always, marks, revealed, MONO_FLOOR, PROSE_FLOOR, TIER_FLOOR_LUMINANCE }) => {
      const at = (id) => document.querySelector(`[data-testid="${id}"]`);
      const opacityOf = (id) => {
        const el = at(id);
        return el ? parseFloat(getComputedStyle(el).opacity) : null;
      };

      // The staircase's draw must have landed on its finished frame — the half of
      // "renders complete" that only a browser can answer.
      const path = at("gap-ladder-path");
      const dash = path ? Math.round(parseFloat(getComputedStyle(path).strokeDashoffset)) : null;

      const missing = [...always, ...marks].filter((id) => !at(id));
      // Every box this pose has reached is fully opaque…
      const unrevealed = revealed.filter((id) => {
        const o = opacityOf(id);
        return o === null || o < 0.99;
      });
      // …and every box it has NOT reached is still held back.
      const leaked = always
        .filter((id) => id.startsWith("gap-marker") || id === "gap-tech-slot" || id === "gap-aside" || id === "gap-closer")
        .filter((id) => !revealed.includes(id))
        .filter((id) => (opacityOf(id) ?? 0) > 0.05);

      // THE PROJECTOR FLOORS, on the rendered tree (gh#50). Every text run this
      // SLIDE owns: mono against the label floor, everything else against the prose
      // floor, and nothing resting dimmer than `--neutral-300`.
      //
      // SCOPED TO THIS SLIDE'S OWN BOXES, and the scope is the load-bearing part.
      // The first run of this audit flagged three things that are not this slide's
      // and that it must not police:
      //   · the NavBar's `Step` / `Slide` counters — 9px mono on `--copper-700`,
      //     deck chrome, on every slide in the deck;
      //   · `FigLabel`'s `·` separator, also `--copper-700`;
      //   · `em.kw`, the deck-wide keyword tier (`--copper-400` in globals.css),
      //     which is dimmer than `--neutral-300` by luminance and is what EVERY
      //     highlighted phrase in all five decks is set in.
      // All three are global decisions with global blast radius. A slide-level gate
      // that fails on them is a gate everyone learns to ignore, so the walk starts
      // from the `gap-` boxes and skips keyword spans by name.
      const lum = (color) => {
        const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return 1;
        const lin = m.slice(1, 4).map((c) => {
          const s = Number(c) / 255;
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
      };
      const owned = [...document.querySelectorAll('[data-testid^="gap-"]')].flatMap((box) => [
        box,
        ...box.querySelectorAll("*"),
      ]);
      const runs = owned.filter(
        (el) =>
          // `em.kw` is the deck's global keyword tier, not this slide's — see above.
          !el.matches("em") &&
          [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim() !== ""),
      );
      const violations = [];
      const seen = new Set();
      for (const el of runs) {
        const cs = getComputedStyle(el);
        const size = parseFloat(cs.fontSize);
        const isMono = /Mono|monospace/i.test(cs.fontFamily);
        const floor = isMono ? MONO_FLOOR : PROSE_FLOOR;
        const text = el.textContent.trim().slice(0, 34);
        // Deduplicated by the fault, not the element: a wrapper and its child report
        // one violation, not two.
        const note = (msg) => {
          if (!seen.has(msg)) {
            seen.add(msg);
            violations.push(msg);
          }
        };
        if (size < floor) note(`${size}px ${isMono ? "mono" : "prose"} — "${text}"`);
        if (lum(cs.color) < TIER_FLOOR_LUMINANCE - 0.001) {
          note(`${cs.color} below the tier floor — "${text}"`);
        }
      }

      return { dash, missing, unrevealed, leaked, violations, audited: runs.length };
    },
    {
      always: ALWAYS,
      marks: expectMarks,
      revealed: REVEALED_BY_POSE[pose],
      MONO_FLOOR,
      PROSE_FLOOR,
      TIER_FLOOR_LUMINANCE,
    },
  );

  dashByPose.push(state.dash);
  auditedByPose.push(state.audited);
  if (state.missing.length) missingByPose.push(`pose ${pose}: ${state.missing.join(", ")}`);
  if (state.unrevealed.length) unrevealedByPose.push(`pose ${pose}: ${state.unrevealed.join(", ")}`);
  if (state.leaked.length) leakedByPose.push(`pose ${pose}: ${state.leaked.join(", ")}`);
  for (const v of state.violations) floorViolations.push(`pose ${pose}: ${v}`);
}

// ZERO ALWAYS, and by construction: this slide's whole motion budget is the
// staircase's CSS path draw and the chips' `.fade` reveals, both of which the
// global reduced-motion rule already handles. A SMIL node appearing here is a
// regression whether or not motion is reduced, because it would need gating.
check("zero SMIL nodes at every pose", smilByPose, [0, 0, 0, 0, 0]);
check("every pose mounts every box it should, none missing", missingByPose, []);
check("every reached box is fully revealed, at every pose", unrevealedByPose, []);
check("no box arrives before its pose", leakedByPose, []);
check("the staircase rests fully drawn at every pose", dashByPose, [0, 0, 0, 0, 0]);
check(
  `no text run below ${MONO_FLOOR}px mono / ${PROSE_FLOOR}px prose, or dimmer than --neutral-300`,
  floorViolations,
  [],
);
// The audit's own positive control: every check above it is a "found nothing", so a
// walk that visited no elements would report a clean slide.
check("the floor audit measured text at every pose", auditedByPose.every((n) => n > 8), true);
console.log(`      runs audited per pose: ${auditedByPose.join(", ")}`);

// ───────────────── the four encodings, as computed styles ─────────────────

await atPose(2);
const marks = await page.evaluate(() => {
  const at = (id) => document.querySelector(`[data-testid="${id}"]`);
  const style = (id, prop) => {
    const el = at(id);
    return el ? getComputedStyle(el)[prop] : null;
  };
  const open = at("gap-marker-open");
  const asserted = at("gap-marker-asserted");
  return {
    hasAsserted: Boolean(asserted),
    chip: {
      asserted: asserted ? getComputedStyle(asserted).borderTopStyle : null,
      open: open ? getComputedStyle(open).borderTopStyle : null,
    },
    leaderDash: {
      asserted: at("gap-leader-asserted")?.getAttribute("stroke-dasharray") ?? null,
      open: at("gap-leader-open")?.getAttribute("stroke-dasharray") ?? null,
    },
    dotFill: {
      asserted: at("gap-dot-asserted")?.getAttribute("fill") ?? null,
      open: at("gap-dot-open")?.getAttribute("fill") ?? null,
    },
    type: {
      assertedFamily: style("gap-asserted-label", "fontFamily"),
      openStyle: style("gap-open-question", "fontStyle"),
      openEndsInQuestion: (at("gap-open-question")?.textContent ?? "").trimEnd().endsWith("?"),
    },
  };
});

if (marks.hasAsserted) {
  check("1 · chip — solid against dashed", [marks.chip.asserted, marks.chip.open], ["solid", "dashed"]);
  check("2 · leader — no dash against a dash pattern", [marks.leaderDash.asserted, marks.leaderDash.open], [null, "3 5"]);
  check("3 · mark — a filled dot against an unfilled ring", [marks.dotFill.asserted, marks.dotFill.open], ["var(--copper-300)", "none"]);
  check("4 · type — mono label against serif italic", marks.type.assertedFamily.includes("Mono"), true);
} else {
  // Berau, by design (§6.5): no tech-function marker at all, and the absence
  // stated in the slot the chip would have used.
  const absence = (await page.locator('[data-testid="gap-tech-absence"]').innerText()).trim();
  check("no MineTech marker on this brand", marks.hasAsserted, false);
  check("the absence is real copy in the chip's slot", absence.length > 40, true);
  console.log(`      ${absence.replace(/\s+/g, " ")}`);
}
check("the open mark is a ring, not a dot", marks.dotFill.open, "none");
check("the open question is serif italic and ends in “?”", [marks.type.openStyle, marks.type.openEndsInQuestion], ["italic", true]);

// ───────────────── layout, at the fullest pose ─────────────────

await atPose(4);

/** Every box that must be measurable at pose 4, this brand's tech fill included.
 *  REQUIRED, not discovered: a gate that measures what it finds passes a missing
 *  box by measuring one fewer. */
const REQUIRED = [
  ...ALWAYS.filter((id) => id !== "gap-ladder-path" && id !== "gap-tech-slot"),
  hasAsserted ? "gap-marker-asserted" : "gap-tech-absence",
];

const rects = {};
const unmeasurable = [];
for (const id of REQUIRED) {
  const el = page.locator(`[data-testid="${id}"]`);
  if ((await el.count()) !== 1) {
    unmeasurable.push(`${id} (${await el.count()} nodes)`);
    continue;
  }
  const box = await el.boundingBox();
  const opacity = await el.evaluate((n) => parseFloat(getComputedStyle(n).opacity));
  if (!box || opacity < 0.99) {
    unmeasurable.push(`${id} (opacity ${opacity})`);
    continue;
  }
  rects[id] = box;
}
check("every required box is on the stage exactly once, fully revealed", unmeasurable, []);
// And the fill this brand does NOT take is absent, not merely hidden.
check(
  `the ${hasAsserted ? "absence line" : "asserted chip"} is not rendered on this brand`,
  await page.locator(`[data-testid="${hasAsserted ? "gap-tech-absence" : "gap-marker-asserted"}"]`).count(),
  0,
);

// EXACTLY the deck's margins — no slack. A box at x=41 is outside a 48px margin,
// and a gate that allows 8px of it will eventually be shown a box at 41.
const outsideMargins = Object.entries(rects)
  .filter(([, r]) => r.x < MARGIN.left || r.x + r.width > MARGIN.right)
  .map(([id, r]) => `${id} x ${Math.round(r.x)}…${Math.round(r.x + r.width)}`);
check("no box runs outside the margins", outsideMargins, []);

const inNavBar = Object.entries(rects)
  .filter(([, r]) => r.y + r.height > NAVBAR_TOP)
  .map(([id, r]) => `${id} bottom ${Math.round(r.y + r.height)}`);
check(`no box crosses the NavBar band at y=${NAVBAR_TOP}`, inNavBar, []);

const ids = Object.keys(rects);
const collisions = [];
for (let i = 0; i < ids.length; i++) {
  for (let j = i + 1; j < ids.length; j++) {
    if (overlaps(rects[ids[i]], rects[ids[j]])) collisions.push(`${ids[i]} × ${ids[j]}`);
  }
}
check("no two boxes overlap", collisions, []);

console.log(`\n      boxes measured at pose 4 — ${ids.length}`);
for (const [id, r] of Object.entries(rects)) {
  console.log(
    `      ${id.padEnd(24)} x ${String(Math.round(r.x)).padStart(4)}…${String(
      Math.round(r.x + r.width),
    ).padStart(4)}   y ${String(Math.round(r.y)).padStart(3)}…${String(
      Math.round(r.y + r.height),
    ).padStart(3)}`,
  );
}

// ───────────────── the console ─────────────────

check("console clean", noise, []);

console.log(`\n${failures ? `${failures} FAILURE(S)` : "all checks passed"} · shots: ${OUT}`);
await browser.close();
process.exit(failures ? 1 : 0);
