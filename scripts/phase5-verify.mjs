// PHASE 5's browser evidence — E.12 in depth, plus the three slides it moved.
//
// This replaces the two gh#19b prototype shot scripts, which pointed at that
// prototype's dev hatch and therefore proved things about the prototype and not
// about the deck (spec §10.2, gh#50). Both were deleted with the prototype in
// gh#51. Same checks, real slide, and they FAIL LOUDLY:
// every assertion prints `ok` / `FAIL` and a failure exits 1, so this is runnable
// from a gate and not only readable by a human.
//
// What it proves on E.12, per §10.2 and gh#50:
//   · all four hover states swap the canvas and set `data-active`; un-hover
//     releases; click-pin holds after the pointer leaves
//   · pose 2's recap mounts and each of the four hovers lights exactly the stages
//     its part owns (`e12Content.lights`, read off `data-lit`)
//   · `2 → 1 → 0` all re-render
//   · the guardrail (§12.1 call 1) is on poses 1 and 2, and kind 2 calls back to
//     the Ralph card (call 2)
//   · the console stays clean
//   · with `--reduced`, ZERO `<animateMotion>` nodes mount at every pose and every
//     pose still renders complete
//
// And on the three knock-on slides, which is the other half of gh#50's walk:
//   · E.1 runs five poses and pose 4 mounts the orbit and its loop footer
//   · E.11's Ralph card reads run-until-done and its footer hands over to E.12
//   · E.13's beat 1 is "Three layers. One loop." and its beat 2 is the line THIS
//     DECK SET prints — the one string in section E that varies (§4.3)
//
// Usage:
//   node scripts/phase5-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>]
//   node scripts/phase5-verify.mjs --base=https://<deployment> --password=… [...]
//
// THE PREVIEW / DEPLOYMENT WALK (§2.1 rule 1) is the same script with `--base`:
// the per-domain table cannot be run locally, and a deployed host is password
// gated per brand, so `--password` is posted to the Edge gate once before the
// walk starts. Pass it from a shell variable, never inline in a committed script.
//
// The variant is explicit for the same reason the export scripts take one
// (gh#27): a bare localhost resolves to `general`, so an unqualified run would
// quietly verify the wrong deck. Default here is `berau-middle-mgmt` — a
// 65-slide standard deck, the shape Aug 12–13 runs.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { VARIANT_IDS, deckUrl, parseVariantArgOrExit } from "./lib/variant-arg.mjs";

// One argument policy for every script in this directory: an undeclared or
// misspelt option is an error, never a silent default (gh#50).
const USAGE = [
  "Usage: node scripts/phase5-verify.mjs [--variant=<id>] [--reduced] [--out=<dir>]",
  "                                      [--base=<url>] [--password=<pw>]",
  "",
  `  --variant=<id>   Deck to verify. Default: berau-middle-mgmt. Ids: ${VARIANT_IDS.join(", ")}`,
  "  --reduced        Run under `prefers-reduced-motion: reduce`.",
  "  --out=<dir>      Where to write the shots.",
  "  --base=<url>     A deployment to walk instead of localhost:5173 (§2.1).",
  "  --password=<pw>  The brand password, for a gated deployment.",
].join("\n");

const { variant: parsedVariant, flags, values } = parseVariantArgOrExit(process.argv.slice(2), USAGE, {
  booleans: ["reduced"],
  values: ["out", "base", "password"],
});

// The shared parser defaults to `general`; this harness defaults to a 65-slide
// standard deck, the shape Aug 12–13 runs. An explicit `--variant` always wins.
const VARIANT = process.argv.slice(2).some((a) => a.startsWith("--variant"))
  ? parsedVariant
  : "berau-middle-mgmt";
const REDUCED = flags.reduced;
const OUT = values.out ?? (REDUCED ? "/tmp/e12-reduced" : "/tmp/e12");
const BASE = values.base ?? process.env.DECK_URL ?? "http://localhost:5173";
/** Only a deployed host asks for one; localhost has no gate. */
const PASSWORD = values.password ?? process.env.DECK_PASSWORD ?? "";
mkdirSync(OUT, { recursive: true });

/** Every url this harness opens. `deckUrl` is shared with the export scripts, so a
 *  `--base` that already carries a query string cannot stack a second `?`. */
const url = (params = {}) => deckUrl(BASE, VARIANT, params);

/** A slide's index is DISCOVERED, never hardcoded: §3 derives every position, so a
 *  deck-set change must move this harness with it instead of silently checking
 *  whatever slide 29 has become. Returns the first index carrying `testid`. */
async function findSlide(page, slideCount, testid) {
  for (let i = 0; i < slideCount; i++) {
    // A scan that starts while the previous slide is still settling can abort its
    // own navigation (`ERR_ABORTED`), so one retry is part of the walk rather than
    // a failure of it.
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

/**
 * Get past the Edge password gate on a deployed host (§2.1). The gate answers
 * EVERY path with the login page until a brand cookie exists, so this has to run
 * before any slide is asked for — and the `?variant=` override has to survive the
 * POST, or the gate resolves by host and checks the wrong brand's password.
 */
async function login(page) {
  await page.goto(url(), { waitUntil: "domcontentloaded" });
  const form = page.locator('input[name="password"]');
  if (!(await form.count())) return true; // no gate — localhost, or already in
  if (!PASSWORD) {
    console.error(
      `${BASE} is password gated and no --password was given.\n` +
        "Pass the brand's password: --password=\"$DECK_PASSWORD\".",
    );
    return false;
  }
  await form.fill(PASSWORD);
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle" }), page.keyboard.press("Enter")]);
  if (await page.locator('input[name="password"]').count()) {
    console.error("Login rejected — wrong password for this brand.");
    return false;
  }
  return true;
}

const PARTS = ["heartbeat", "beat", "checker", "spine"];
/** `e12Content.lights`, restated as the harness's own expectation. Two copies on
 *  purpose: a test that reads the table it is checking proves only that the table
 *  equals itself. */
const LIGHTS = {
  heartbeat: ["hb", "ret"],
  beat: ["find", "draft"],
  checker: ["review", "verdict", "fail", "pass"],
  spine: ["read", "update"],
};
const STAGES = ["hb", "read", "find", "draft", "review", "verdict", "fail", "pass", "update", "ret"];

let failures = 0;
function check(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  if (!pass) failures += 1;
  console.log(`${pass ? "ok  " : "FAIL"}  ${label}${pass ? "" : `\n        expected ${JSON.stringify(expected)}\n        actual   ${JSON.stringify(actual)}`}`);
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 920 },
  ...(REDUCED ? { reducedMotion: "reduce" } : null),
});
const page = await context.newPage();

const noise = [];
/** Vite's own HMR socket, which drops when this harness navigates 30 times in a
 *  row. It is the dev server talking, not the deck, and it does not exist on a
 *  deployment — the only thing filtered here. */
const DEV_SERVER_NOISE = /ws:\/\/localhost:\d+|\[vite\]/;
page.on("console", (m) => {
  if ((m.type() === "error" || m.type() === "warning") && !DEV_SERVER_NOISE.test(m.text())) {
    noise.push(`${m.type()}: ${m.text()}`);
  }
});
page.on("pageerror", (e) => noise.push(`pageerror: ${e.message}`));

if (!(await login(page))) process.exit(1);
const slideCount = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
const index = await findSlide(page, slideCount, "e12-mindset");
if (index == null) {
  console.error(`E.12 not found in ${VARIANT} (${slideCount} slides).`);
  process.exit(1);
}
console.log(`variant ${VARIANT} · ${slideCount} slides · E.12 at index ${index}${REDUCED ? " · reduced motion" : ""}\n`);

const stage = page.locator('[data-testid="slide"]');
await stage.waitFor();
const shot = (name) => stage.screenshot({ path: `${OUT}/${name}.png` });
const panel = () => page.getAttribute('[data-testid="e12-canvas"]', "data-panel");
const smil = () => page.$$eval("animateMotion", (els) => els.length);
const activeCards = () =>
  page.$$eval('[data-testid^="e12-card-"]', (els) =>
    els.filter((e) => e.getAttribute("data-active") === "true").map((e) => e.dataset.testid.replace("e12-card-", "")),
  );
const litStages = () =>
  page.evaluate(
    (stages) =>
      stages.filter((s) => {
        const el = document.querySelector(`[data-testid="e12-flow-${s}"]`);
        return el?.getAttribute("data-lit") === "on";
      }),
    STAGES,
  );
const away = async () => {
  // Off the rail and off the flow — the release path a presenter's hand takes.
  await page.mouse.move(660, 900);
  await page.waitForTimeout(420);
};

// ───────────────── pose 0 · the mindset diptych ─────────────────

await page.waitForTimeout(1500);
check("pose 0 · both panels and both quotes mount", {
  prompting: await page.locator('[data-testid="e12-panel-prompting"]').count(),
  looping: await page.locator('[data-testid="e12-panel-looping"]').count(),
  quoteLeft: await page.locator('[data-testid="e12-quote-left"]').count(),
  quoteRight: await page.locator('[data-testid="e12-quote-right"]').count(),
}, { prompting: 1, looping: 1, quoteLeft: 1, quoteRight: 1 });
check("pose 0 · animateMotion nodes", await smil(), REDUCED ? 0 : 1);
await shot("00-pose0");

if (!REDUCED) {
  // The left panel visibly cannot run without you; the right one visibly can.
  // Two frames 1.7s apart have to DIFFER, or the argument is a still.
  const a = await stage.screenshot();
  await page.waitForTimeout(1700);
  const b = await stage.screenshot();
  check("pose 0 · the panels are moving (two frames differ)", !a.equals(b), true);
}

// ───────────────── pose 1 · the rail and the four panels ─────────────────

await page.keyboard.press("Space");
await page.waitForTimeout(900);
check("pose 1 · rail mounts", await page.locator('[data-testid="e12-rail"]').count(), 1);
check("pose 1 · canvas opens BLANK (correction 4)", await panel(), "none");
// §12.1 call 1 — the guardrail is under the rail on this pose AND on pose 2.
check(
  "pose 1 · the guardrail is on the stage",
  await page.locator('[data-testid="e12-guardrail"]').innerText().then((t) => t.replace(/\s+/g, " ").trim()),
  "THE GUARDRAIL Cap what runs unattended — items per beat, spend, and an end date. A loop with no cap is a bill with no cap.",
);
{
  const gap = await page.evaluate(() => {
    const box = (id) => document.querySelector(`[data-testid="${id}"]`)?.getBoundingClientRect();
    const guard = box("e12-guardrail");
    const ret = box("e12-rail-return");
    return guard && ret ? Math.round(guard.top - ret.bottom) : null;
  });
  check("pose 1 · the guardrail clears the return label", gap != null && gap >= 4, true);
}
await shot("01-pose1-rail-only");

for (const id of PARTS) {
  await page.locator(`[data-testid="e12-card-${id}"]`).hover();
  await page.waitForTimeout(700);
  check(`pose 1 · hover ${id} swaps the canvas`, await panel(), id);
  check(`pose 1 · hover ${id} sets data-active on its card only`, await activeCards(), [id]);
  check(`pose 1 · hover ${id} mounts its panel`, await page.locator(`[data-testid="e12-panel-${id}"]`).count(), 1);
  if (REDUCED) check(`pose 1 · ${id} panel mounts 0 animateMotion`, await smil(), 0);
  if (id === "heartbeat") {
    // §12.1 call 2 — kind 2, and only kind 2, names the Ralph card.
    const callbacks = await page.$$eval('[data-testid$="-callback-room"]', (els) =>
      els.map((e) => e.textContent.trim()).filter(Boolean),
    );
    check("pose 1 · exactly one kind calls back to the Ralph card", callbacks, [
      "↩ Ralph Wiggum, from the harness",
    ]);
  }
  await shot(`02-pose1-${id}`);
}

await away();
check("pose 1 · un-hover RELEASES the canvas", await panel(), "none");
check("pose 1 · un-hover releases the card", await activeCards(), []);
await shot("03-pose1-released");

await page.locator('[data-testid="e12-card-checker"]').click();
await away();
check("pose 1 · click-pin HOLDS after the pointer leaves", await panel(), "checker");
check("pose 1 · the pinned card reports it", await page.locator('[data-testid="e12-card-checker"] [aria-label="pinned"]').count(), 1);
await shot("04-pose1-pinned-checker");
// Hovering another card still swaps; letting go falls back to the pin.
await page.locator('[data-testid="e12-card-spine"]').hover();
await page.waitForTimeout(500);
check("pose 1 · hover beats a pin", await panel(), "spine");
await away();
check("pose 1 · release falls back to the pin", await panel(), "checker");
await page.locator('[data-testid="e12-card-checker"]').click();
await away();
check("pose 1 · a second click unpins", await panel(), "none");

// ───────────────── pose 2 · the worked example ─────────────────

await page.keyboard.press("Space");
await page.waitForTimeout(1400);
check("pose 2 · the triage flow replaces the panels", await panel(), "triage");
check("pose 2 · the recap mounts", await page.locator('[data-testid="e12-thesis"]').count(), 1);
check("pose 2 · the guardrail is on the pose that PRINTS", await page.locator('[data-testid="e12-guardrail"]').count(), 1);
// THE CLEARANCE, MEASURED. The unit test can only compare the two offsets — jsdom
// has no layout — so the "does not collide with the recap" half is checked here,
// on rendered boxes, at 1280×720.
{
  const gap = await page.evaluate(() => {
    const box = (id) => document.querySelector(`[data-testid="${id}"]`)?.getBoundingClientRect();
    const guard = box("e12-guardrail");
    const recap = box("e12-thesis");
    return guard && recap ? Math.round(recap.top - guard.bottom) : null;
  });
  check("pose 2 · the guardrail clears the recap", gap != null && gap >= 12, true);
  if (gap != null) console.log(`        (${gap}px between the guardrail and the recap)`);
}
check("pose 2 · a pin does not cross the pose boundary", await activeCards(), []);
check("pose 2 · every stage is drawn", await page.evaluate(
  (stages) => stages.filter((s) => document.querySelector(`[data-testid="e12-flow-${s}"]`)).length,
  STAGES.filter((s) => s !== "verdict" && s !== "ret"),
), STAGES.filter((s) => s !== "verdict" && s !== "ret").length);
check("pose 2 · animateMotion nodes", await smil(), REDUCED ? 0 : 2);
await shot("05-pose2-idle");

for (const id of PARTS) {
  await page.locator(`[data-testid="e12-card-${id}"]`).hover();
  await page.waitForTimeout(600);
  check(`pose 2 · hover ${id} lights exactly its stages`, (await litStages()).sort(), [...LIGHTS[id]].sort());
  await shot(`06-pose2-${id}`);
}
await away();
check("pose 2 · un-hover returns every stage to idle", await litStages(), []);

// ───────────────── backwards · 2 → 1 → 0 ─────────────────

await page.keyboard.press("Backspace");
await page.waitForTimeout(800);
check("back to pose 1 · the rail re-renders, canvas blank", { rail: await page.locator('[data-testid="e12-rail"]').count(), panel: await panel() }, { rail: 1, panel: "none" });
await shot("07-back-pose1");

await page.keyboard.press("Backspace");
await page.waitForTimeout(1200);
check("back to pose 0 · the diptych re-renders", await page.locator('[data-testid="e12-mindset"]').count(), 1);
check("back to pose 0 · animateMotion nodes", await smil(), REDUCED ? 0 : 1);
await shot("08-back-pose0");

// ───────────────── the three slides E.12 moved ─────────────────
// gh#50's walk covers the whole phase, not only the new slide: E.1 gained a fifth
// pose, E.11's Ralph card was re-cut, and the bridge became E.13. Each is found by
// its own testid, because §3 derives every position and the leader deck reorders.

const e1 = await findSlide(page, slideCount, "ring-stack");
check("E.1 · found", e1 != null, true);
if (e1 != null) {
  await page.goto(url({ slide: e1 }), { waitUntil: "networkidle" });
  await page.locator('[data-testid="slide"]').waitFor();
  check("E.1 · declares five poses", await page.getAttribute('[data-testid="slide"]', "data-canonical-pose"), "4");
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(450);
  }
  check("E.1 · pose 4 mounts the orbit over the rings", await page.locator('[data-testid="ring-orbit"]').count(), 1);
  check(
    "E.1 · pose 4 says the loop makes it repeat",
    (await page.locator('[data-testid="slide"]').innerText()).includes("The loop makes it repeat"),
    true,
  );
  await page.locator('[data-testid="slide"]').screenshot({ path: `${OUT}/09-e1-pose4.png` });
}

const e11 = await findSlide(page, slideCount, "e11-footer");
check("E.11 · found", e11 != null, true);
if (e11 != null) {
  await page.goto(url({ slide: e11 }), { waitUntil: "networkidle" });
  await page.locator('[data-testid="slide"]').waitFor();
  await page.keyboard.press("Space");
  await page.waitForTimeout(900);
  const text = (await page.locator('[data-testid="slide"]').innerText()).replace(/\s+/g, " ");
  // The re-cut Ralph card is `/goal` — run-until-done — and the footer is what
  // hands the room over to E.12.
  check("E.11 · the Ralph card retries until a check passes", text.includes("it retries until a check passes"), true);
  check("E.11 · the Ralph card names /goal", text.includes("/goal on Claude Code & Codex CLI"), true);
  check("E.11 · the footer hands over to the loop", text.includes("Eight parts. Now — what runs them, without you."), true);
  await page.locator('[data-testid="slide"]').screenshot({ path: `${OUT}/10-e11.png` });
}

const e13 = await findSlide(page, slideCount, "e13-root");
check("E.13 · found", e13 != null, true);
if (e13 != null) {
  await page.goto(url({ slide: e13 }), { waitUntil: "networkidle" });
  await page.locator('[data-testid="slide"]').waitFor();
  await page.waitForTimeout(900);
  const beat1 = (await page.locator('[data-testid="e13-beat1"]').innerText()).replace(/\s+/g, " ").trim();
  check("E.13 · beat 1 is the phase's own line", beat1, "Three layers. One loop.");
  await page.keyboard.press("Space");
  await page.waitForTimeout(900);
  const beat2 = (await page.locator('[data-testid="e13-beat2"]').innerText()).replace(/\s+/g, " ").trim();
  // THE ONE STRING IN SECTION E THAT DEPENDS ON THE DECK SET (§4.3): the standard
  // decks run F · TECHNIQUES next, the leader decks cut F and go to TOOLS.
  const leader = VARIANT.endsWith("leader");
  check(
    `E.13 · beat 2 is the ${leader ? "leader" : "standard"} deck's hand-off`,
    beat2,
    leader ? "Next: the platforms that bring them to life." : "Next: the techniques that matter most.",
  );
  await page.locator('[data-testid="slide"]').screenshot({ path: `${OUT}/11-e13.png` });
}

// ───────────────── the console ─────────────────

check("console clean", noise, []);

console.log(`\n${failures ? `${failures} FAILURE(S)` : "all checks passed"} · shots: ${OUT}`);
await browser.close();
process.exit(failures ? 1 : 0);
