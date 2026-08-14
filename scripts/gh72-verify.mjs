// gh#72's browser evidence — the three leader-only bridges, and the one that moved.
//
// `tests/unit/leader-bridges.test.tsx` says in its own preamble which half of this ticket
// it cannot reach: jsdom has no layout engine, so it computes no text width and no line
// count. Every structural claim lives there — the photo, the three overlays, which beats
// are `on` at which step, the derived FigLabel, the keyword marks. THIS script owns the
// half the slides are actually at risk of, and there is only one of it:
//
//   A BEAT WRAPPING. The stage draws beat 1 at 56px and beat 2 at 40px in a column each
//   slide sizes itself (`measure`), and a wrapped line on a bridge is the one defect that
//   is invisible everywhere except a projector — the words are all present, the DOM is
//   correct, the test suite is green, and the room reads a two-line sentence as two
//   sentences. So every beat is measured against the height of ONE line box, per slide,
//   per leader deck.
//
// WHY LINE BOXES AND NOT PIXEL WIDTHS: a width assertion needs a font to be loaded and a
// measure to be trusted, and both are exactly what a projector changes. `Range`
// `getClientRects()` returns one rect per line box, so "did this wrap" is answered as an
// integer by the engine that laid it out. Instrument Serif and its Georgia fallback
// produce different widths and the same count.
//
// Usage:
//   npm run dev              # in another shell
//   node scripts/gh72-verify.mjs [--variant=<id>] [--out=<dir>]
//
// Both leader decks are walked — the copy is brand-invariant, so a difference between
// them would be a defect and not a variant.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";
import { VARIANTS } from "../src/deck-variants.ts";

const USAGE = [
  "Usage: node scripts/gh72-verify.mjs [--variant=<id>] [--out=<dir>]",
  "",
  `  --variant=<id>   Leader deck to measure FIRST. Default: berau-leader. Ids: ${VARIANT_IDS.join(", ")}`,
  "  --out=<dir>      Screenshot directory. Default: exports/gh72",
  "",
  "  DECK_URL         Base url to render. Default: http://localhost:5173",
].join("\n");

const { variant: parsed, values } = parseVariantArgOrExit(process.argv.slice(2), { usage: USAGE });
const PRIMARY = process.argv.slice(2).some((a) => a.startsWith("--variant")) ? parsed : "berau-leader";
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
const OUT = values.out ?? "exports/gh72";

/** Every leader variant, PRIMARY first — derived from the shared table, so a third leader
 *  brand is inside this walk the day it registers. */
const LEADER_VARIANTS = [
  PRIMARY,
  ...Object.values(VARIANTS)
    .filter((v) => v.deckSet === "leader" && v.id !== PRIMARY)
    .map((v) => v.id),
];

/**
 * The four stages, by deck INDEX and by the figure each prints today.
 *
 * THE INDEX IS AN INPUT AND THE FIGURE IS AN ASSERTION. `?slide=` takes an index, so one
 * has to be written down; what the slide PRINTS is derived (§3.5) and is checked against
 * `tests/fixtures/deck-numbering.json`'s record rather than trusted. If a later insert
 * renumbers the deck, the fixture moves first and this table fails loudly here.
 */
const STAGES = [
  { index: 6, fig: "B.5", label: "BRIDGE · SHAPE", testId: "gap-bridge" },
  { index: 15, fig: "D.5", label: "BRIDGE · CURRICULUM", testId: "invest-bridge" },
  { index: 58, fig: "J.3", label: "BRIDGE · MANDATE", testId: "pitfalls-bridge" },
  { index: 62, fig: "K.4", label: "BRIDGE · DISCIPLINE", testId: "h3" },
];

/**
 * Line boxes the engine laid this element's text out on. One means it did not wrap.
 *
 * DISTINCT `top` VALUES, NOT `getClientRects().length`, and the difference is the whole
 * reason this helper has a comment. `highlight()` splits every beat into one `<span>` per
 * keyword and per run of plain text, so a range over the contents returns one rect per
 * FRAGMENT — the first version of this script counted six for "The gap is named." and
 * reported a wrap on four slides that do not wrap, including the one that shipped in
 * Phase 2. Fragments on one line share a top; a wrapped line introduces a new one.
 * Rounded, because sub-pixel baselines differ between a keyword's italic face and the
 * roman around it.
 */
const LINE_BOXES = (el) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const tops = new Set([...range.getClientRects()].map((r) => Math.round(r.top)));
  return tops.size;
};

const failures = [];
const record = (ok, what) => {
  console.log(`${ok ? "  ok  " : "  FAIL"} ${what}`);
  if (!ok) failures.push(what);
};

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

for (const variant of LEADER_VARIANTS) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  console.log(`\n${variant}`);

  for (const stage of STAGES) {
    await page.goto(deckUrl(BASE, variant, { slide: stage.index }), { waitUntil: "networkidle" });
    // Step 1 is every bridge's canonical pose: both beats up.
    await page.keyboard.press("Space");
    await page.waitForTimeout(1200);

    const beats = [`${stage.testId}-beat1-lineA`, `${stage.testId}-beat1-lineB`, `${stage.testId}-beat2`];
    const measured = await page.evaluate(
      ({ beats, lineBoxes }) => {
        const fn = new Function(`return ${lineBoxes}`)();
        const out = {};
        for (const id of beats) {
          const wrapper = document.querySelector(`[data-testid="${id}"]`);
          const p = wrapper?.querySelector("p") ?? wrapper;
          out[id] = p
            ? { lines: fn(p), text: p.textContent, opacity: getComputedStyle(wrapper).opacity }
            : null;
        }
        out.fig = document.querySelector(".fig-label")?.textContent ?? "";
        out.hero = getComputedStyle(
          document.querySelector(`[data-testid="${beats[0].split("-beat")[0]}-hero"]`),
        ).backgroundImage;
        return out;
      },
      { beats, lineBoxes: LINE_BOXES.toString() },
    );

    console.log(` ${stage.fig} — ${measured.fig.replace(/\s+/g, " ").trim()}`);
    record(measured.fig.includes(`FIG. ${stage.fig}`), `${variant} ${stage.fig}: prints its derived figure`);
    record(measured.fig.includes(stage.label), `${variant} ${stage.fig}: prints ${stage.label}`);
    record(/url\(/.test(measured.hero), `${variant} ${stage.fig}: hero photo painted`);

    for (const id of beats) {
      const m = measured[id];
      record(Boolean(m), `${variant} ${stage.fig}: ${id} exists`);
      if (!m) continue;
      record(m.lines === 1, `${variant} ${stage.fig}: ${id} is ONE line (${m.lines}) — "${m.text}"`);
      record(Number(m.opacity) > 0.95, `${variant} ${stage.fig}: ${id} is fully revealed at step 1`);
    }

    await page.screenshot({ path: `${OUT}/${variant}-${stage.fig}.png` });
  }

  await page.close();
}

await browser.close();

console.log(`\n${failures.length === 0 ? "PASS" : `FAIL — ${failures.length} assertion(s)`}`);
for (const f of failures) console.log(`  · ${f}`);
process.exit(failures.length === 0 ? 0 : 1);
