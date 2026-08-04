// Projection calibration — opens a target fullscreen for a walk to the back row,
// and (with `--audit`) measures the target's smallest type first, so the walk has
// numbers to argue with instead of only an opinion.
//
// Two targets:
//   hexladder  the copper hex ladder swatch (spec §6.5, §11) — the original use:
//              run it with a projector connected and confirm every copper-* /
//              neutral-* stop is distinguishable from its neighbours.
//   e12        E.12 · LOOP ENGINEERING (spec §10.2, §12.1 call 3) — dense mono
//              strips on a dark surface, which is what a washed-out projector
//              attacks first. They WERE the smallest type in the deck at 8.5px;
//              gh#50 put a floor under them, and this mode holds it.
//
// Usage:
//   node scripts/projection-test.mjs [hexladder|e12] [--pose=N] [--variant=<id>]
//   node scripts/projection-test.mjs e12 --audit
//
// `--audit` is HEADLESS and needs no projector: it reports every text run on the
// target, its computed size and colour, and whether it overflows its own box.
// That is the mechanical half of call 3. The projector walk is the other half and
// no script can do it — it needs the room, the hardware and the back row.
import { spawn } from "node:child_process";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";

// ARGUMENTS FAIL LOUDLY, through the same parser every other script here uses: a
// misspelt `--varient=` treated as "no variant given" is how a script silently
// checks the wrong deck (gh#50, and `./lib/variant-arg.mjs`'s own header).
const USAGE = [
  "Usage: node scripts/projection-test.mjs [hexladder|e12] [--audit] [--pose=N] [--variant=<id>]",
  "",
  "  hexladder       The copper hex-ladder swatch (default).",
  "  e12             E.12 · LOOP ENGINEERING.",
  "  --audit         Headless type audit; no projector needed.",
  "  --pose=N        Pose to open for the walk.",
  `  --variant=<id>  ${VARIANT_IDS.join(", ")}`,
].join("\n");

const { variant: parsedVariant, positionals, flags, values } = parseVariantArgOrExit(
  process.argv.slice(2),
  USAGE,
  { booleans: ["audit"], values: ["pose"] },
);

const die = (message) => {
  console.error(`error: ${message}\n`);
  console.error(USAGE);
  process.exit(1);
};

if (positionals.length > 1) die(`expected one target, got ${positionals.length}`);
const TARGET = positionals[0] ?? "hexladder";
if (!["hexladder", "e12"].includes(TARGET)) die(`unknown target "${TARGET}" — use hexladder or e12`);

const AUDIT = flags.audit;
// The shared parser defaults to `general`; a projector check defaults to the deck
// the sessions run. An explicit `--variant` always wins.
const VARIANT = process.argv.slice(2).some((a) => a.startsWith("--variant"))
  ? parsedVariant
  : "berau-middle-mgmt";
const POSE = Number(values.pose ?? (TARGET === "e12" ? 1 : 0));
if (!Number.isInteger(POSE) || POSE < 0) die("--pose must be a whole number");
const BASE = process.env.DECK_URL ?? "http://localhost:5173";

/**
 * THE TWO PLACES `neutral-400` IS LEGAL on E.12, both of them named rather than
 * waved through:
 *   · a DEMOTED box on pose 2 — the dimming is the meaning (§8.3), detected live
 *     off `data-lit="dim"`.
 *   · `e12-thesis`, pose 2's recap — gh#49 correction 8 asks for it in E.11's
 *     FOOTER STYLE, and `e11-harness-practices.tsx:229` is serif italic 13.5px on
 *     `--neutral-400`. It is a 13.5px line, not a small label, and matching the
 *     footer the room has already seen eight times is the point of the
 *     correction. Raising it here would break that match on this slide alone.
 */
const GREY_EXEMPT = ['[data-lit="dim"]', '[data-testid="e12-thesis"]'];

/**
 * THE FLOORS THIS SCRIPT CHECKS, and why they are numbers rather than opinions.
 *
 * gh#49 correction 7 set a COLOUR floor for E.12 (`TEXT_FLOOR` in
 * `src/slides/foundation-core-section-e/components/E12Primitives.tsx`) after
 * `more and more unattended →` proved illegible on a washed-out projector
 * profile. gh#50 call 3 adds the SIZE floor the same finding implies: 9.5px for a
 * mono label, 10.5px for a prose sentence — the tier the rest of the slide's
 * labels already use. Anything below either floor is reported.
 *
 * The colour floor is `TEXT_FLOOR`, with the two exemptions named above.
 * THE VALUE IS THIS DECK'S, NOT TAILWIND'S — `globals.css` sets
 * `--neutral-300: #a3a3a3` and `--neutral-400: #737373`, one stop darker than the
 * framework's names suggest, so the floor is `#a3a3a3` and the reportable grey is
 * `#737373`.
 */
const FLOOR = { mono: 9.5, prose: 10.5, greys: ["rgb(115, 115, 115)"] };

/** Reuse a dev server if one is already up; only start one if it is not. */
async function ensureServer() {
  try {
    const res = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      console.log("Using the dev server already on :5173.");
      return null;
    }
  } catch {
    /* not up — start one below */
  }
  const server = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });
  await new Promise((r) => setTimeout(r, 3500));
  return server;
}

/** E.12's index is DISCOVERED, never hardcoded — §3 derives its position. */
async function findE12(page) {
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i++) {
    await page.goto(deckUrl(BASE, VARIANT, { slide: i }), { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(90);
    if (await page.locator('[data-testid="e12-mindset"]').count()) return i;
  }
  return null;
}

// ───────────────────── the mechanical half ─────────────────────

async function audit() {
  // The audit needs the same server the walk does; it used to assume :5173 was
  // already up, so the documented invocation failed on a clean machine.
  const server = await ensureServer();
  const { chromium } = await import("@playwright/test");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 920 } });
  await page.goto(deckUrl(BASE, VARIANT), { waitUntil: "networkidle" });

  let url = `${BASE}/?dev=hexladder`;
  if (TARGET === "e12") {
    const index = await findE12(page);
    if (index == null) {
      console.error("E.12 not found — has the deck set changed?");
      await browser.close();
      server?.kill();
      process.exit(1);
    }
    url = deckUrl(BASE, VARIANT, { slide: index });
  }
  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator('[data-testid="slide"]').waitFor();

  const poses = TARGET === "e12" ? [0, 1, 2] : [0];
  let below = 0;
  let overflowing = 0;
  let greys = 0;

  for (const pose of poses) {
    if (pose > 0) {
      await page.keyboard.press("Space");
      await page.waitForTimeout(700);
    }
    // On pose 1 the canvas is blank until a rail card is hovered, so each panel
    // is audited in turn — its type is only on the stage while that panel is up.
    // Pose 1 hovers to bring each panel up; POSE 2 hovers to bring each RANK
    // TIER up, because a demoted stage is the one place `neutral-400` is legal
    // and the only way to check that it is confined there is to trigger it.
    const views =
      TARGET === "e12" && (pose === 1 || pose === 2)
        ? [...(pose === 2 ? [null] : []), "heartbeat", "beat", "checker", "spine"]
        : [null];

    for (const view of views) {
      if (view) {
        await page.locator(`[data-testid="e12-card-${view}"]`).hover();
        await page.waitForTimeout(650);
      }
      const runs = await page.evaluate((exempt) => {
        const out = [];
        const stage = document.querySelector('[data-testid="slide"]');
        if (!stage) return out;
        const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const text = n.textContent.trim();
          if (!text) continue;
          const el = n.parentElement;
          if (!el) continue;
          // The NavBar is deck chrome, not slide content: same on all 65 slides,
          // not projected copy, and it would otherwise report its own `Step` /
          // `Slide` labels once per pose.
          //
          // `.nav-zone`, NOT `[data-no-advance]`: that attribute means "a click
          // here must not advance the deck", and E.12's whole RAIL carries it
          // (`E12LoopAnatomy.tsx`). Excluding the attribute excluded the rail —
          // four cards, the return label and the new guardrail — from the audit.
          if (el.closest(".nav-zone")) continue;
          const cs = getComputedStyle(el);
          // THE TEXT'S OWN BOX, not its element's. A `nowrap` block element is as
          // wide as its column and stays that width while the text inside spills
          // past it, so measuring the element would report every overflow as a
          // fit — which is exactly the failure a raised type size causes.
          const range = document.createRange();
          range.selectNodeContents(n);
          const box = range.getBoundingClientRect();
          if (!box.width) continue;
          // The nearest ancestor that draws a border is the box this run has to
          // fit inside — a kind card, the heartbeat pill, a flow node.
          let container = el.parentElement;
          while (container && getComputedStyle(container).borderTopStyle === "none") {
            container = container.parentElement;
          }
          const cbox = container?.getBoundingClientRect();
          // The limit is the container's CONTENT edge, not its border: type that
          // eats its own padding and stops 0px from a border has already failed,
          // and that is exactly what a raised size does first.
          const pad = container ? parseFloat(getComputedStyle(container).paddingRight) || 0 : 0;
          out.push({
            greyOk: exempt.some((sel) => el.closest(sel) != null),
            text: text.length > 46 ? `${text.slice(0, 43)}…` : text,
            size: Math.round(parseFloat(cs.fontSize) * 100) / 100,
            colour: cs.color,
            mono: cs.fontFamily.toLowerCase().includes("mono"),
            left: Math.round(box.left),
            right: Math.round(box.right),
            // Only an INLINE or `nowrap` run can be measured for spill: a block
            // element is as wide as its column whether its text fills it or not,
            // so its right edge says nothing about the text inside it.
            // A wrapping run is allowed to reach its column's edge — that is what
            // wrapping is for. Only `nowrap` and inline runs are held to the box.
            limit:
              cbox && (cs.display.startsWith("inline") || cs.whiteSpace === "nowrap")
                ? Math.round(cbox.right - pad)
                : null,
          });
        }
        return out;
      }, GREY_EXEMPT);

      const label = `pose ${pose}${view ? ` · ${view}` : ""}`;
      for (const r of runs) {
        const floor = r.mono ? FLOOR.mono : FLOOR.prose;
        const tooSmall = r.size < floor;
        // Grey is legal only inside `GREY_EXEMPT`. Anywhere else it is a floor
        // break and fails the run.
        const tooGrey = FLOOR.greys.includes(r.colour) && !r.greyOk;
        // A run whose right edge is past its box's right edge is spilling out of
        // it — the failure mode raising a type size causes.
        const spills = r.limit != null && r.right > r.limit + 1;
        if (tooSmall) below += 1;
        if (spills) overflowing += 1;
        if (tooGrey) greys += 1;
        if (tooSmall || tooGrey || spills) {
          const flags = [
            tooSmall ? `SIZE ${r.size} < ${floor}` : null,
            tooGrey ? "GREY neutral-400" : null,
            spills ? `OVERFLOW +${r.right - r.limit}px` : null,
          ]
            .filter(Boolean)
            .join(" · ");
          console.log(`${label.padEnd(22)} ${flags.padEnd(30)} ${r.mono ? "mono " : "prose"} "${r.text}"`);
        }
      }
      if (view) {
        await page.mouse.move(660, 900);
        await page.waitForTimeout(250);
      }
    }
  }

  console.log(
    `\n${below} run(s) below the size floor · ${overflowing} run(s) overflowing its box · ` +
      `${greys} run(s) under the colour floor outside a named exemption.`,
  );
  await browser.close();
  server?.kill();
  process.exit(below || overflowing || greys ? 1 : 0);
}

// ───────────────────── the human half ─────────────────────

async function walk() {
  const server = await ensureServer();
  let url = `${BASE}/?dev=hexladder&fullscreen=1`;
  let steps = [
    "  1. Connect projector and mirror display.",
    "  2. Press F11 (or Cmd+Ctrl+F on macOS) for browser fullscreen.",
    "  3. Walk to the back row and confirm: every copper-* and neutral-* swatch is distinguishable from its neighbors.",
    "  4. Note any stops that wash out — those are the ones to retune in src/design-system/colors.ts.",
    "  5. Ctrl+C this script when done.",
  ];

  if (TARGET === "e12") {
    const { chromium } = await import("@playwright/test");
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(deckUrl(BASE, VARIANT), { waitUntil: "networkidle" });
    const index = await findE12(page);
    await browser.close();
    if (index == null) {
      console.error("E.12 not found — has the deck set changed?");
      process.exit(1);
    }
    url = deckUrl(BASE, VARIANT, { slide: index, fullscreen: 1 });
    steps = [
      "  1. Connect projector and mirror display.",
      "  2. Press F11 (or Cmd+Ctrl+F on macOS) for browser fullscreen.",
      `  3. Press Space ${POSE} time(s) for pose ${POSE}. On pose 1 the right canvas is blank until a rail card is hovered.`,
      "  4. Walk to the back row and read out loud, in this order: a heartbeat card's TOOL STRIP (`Claude Code · /goal`), its callback line, the axis label `more and more unattended`, then on pose 2 the heartbeat pill and both fork labels.",
      "  5. Anything unreadable from the back row is a SIZE, not a colour — raise it and re-run with --audit.",
      "  6. Ctrl+C this script when done.",
    ];
  }

  console.log("\nProjection test ready. Opening:", url);
  console.log("Steps:\n" + steps.join("\n"));
  spawn(process.platform === "darwin" ? "open" : "xdg-open", [url], {
    stdio: "ignore",
    detached: true,
  });

  process.on("SIGINT", () => {
    server?.kill();
    process.exit(0);
  });
}

if (AUDIT) await audit();
else await walk();
