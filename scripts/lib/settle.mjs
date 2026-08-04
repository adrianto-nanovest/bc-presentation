// Wait for a pose's ENTRY CHOREOGRAPHY to finish before capturing it.
//
// WHY THIS EXISTS (found on gh#50, while verifying the §12.1 export counts). Both
// export scripts waited a flat 150ms after walking to the canonical pose, with the
// comment "give framer-motion a beat to settle". 150ms is mid-reveal for most of
// the deck: every slide built out of `StepReveal` / `Reveal` staggers its rows by
// 80–1150ms, and a row still at opacity 0 PRINTS AS NOTHING. The exported pages
// were real pages with most of their content missing — E.12 printed one rail card
// of four and an empty canvas, E.10 printed one stanza line of four — and the page
// COUNT was right the whole time, which is why it went unnoticed.
//
// The fix is to wait for the animations themselves rather than for a guessed
// number: `document.getAnimations()` reports every running CSS animation and
// transition on the page.
//
// AMBIENT LOOPS ARE EXCLUDED, and they are the reason a flat timeout cannot be
// replaced with "wait until nothing is animating": several slides carry deliberate
// infinite motion (E.12's EKG sweep and day tokens, I.1's particles, the comet in
// F.5). Those never finish, so only FINITE animations are waited on.
//
// SMIL (`<animateMotion>`) is invisible to `getAnimations()`. That is fine here:
// SMIL on this deck is only ever ambient, so it is exactly what we would exclude.

/**
 * Resolve once every finite CSS animation and transition on the page has ended.
 *
 * @param {import("@playwright/test").Page} page
 * @param {number} cap  Give up after this many ms and capture anyway — a stuck
 *                      animation must not turn an export into a hang. The cap
 *                      being hit is reported by the caller's own output, not
 *                      thrown: a slightly-early page beats no file at all.
 */
export async function settlePose(page, cap = 3000) {
  const quiet = () =>
    page
      .waitForFunction(
        () =>
          document.getAnimations().every((a) => {
            if (a.playState === "finished" || a.playState === "idle") return true;
            const iterations = a.effect?.getComputedTiming?.().iterations ?? 1;
            return iterations === Infinity;
          }),
        null,
        { timeout: cap, polling: 100 },
      )
      .then(() => true)
      .catch(() => false);

  // TWO PASSES, because `getAnimations()` can only report animations that EXIST.
  // A row whose element mounts on a JS timer has no animation to find at the
  // moment of the first check, so the page can look quiet and then move again.
  // The second pass, after a gap, is what catches that — and it costs nothing on
  // a page that really is done.
  const first = await quiet();
  await page.waitForTimeout(250);
  const second = await quiet();

  // One more frame, so the last commit is painted before the capture.
  await page.waitForTimeout(120);
  return first && second;
}
