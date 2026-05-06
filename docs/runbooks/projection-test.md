# Projection-Test Runbook

**When to run:** Before locking the copper hex ladder for the workshop. Repeat at each new venue (Berau site mics differ from Jakarta venue mics).

## Steps

1. Connect laptop to projector. Mirror displays at the projector's native resolution.
2. From the project root, run `npm run projection-test`. The script boots the dev server and opens the HexLadder slide.
3. Press `F11` (or `Cmd+Ctrl+F` on macOS) for fullscreen.
4. Walk to the back row of the auditorium. For each row of swatches:
   - Confirm every adjacent pair is **distinguishable** at distance.
   - Note any stop that **washes out** to its neighbor.
5. Edit `src/design-system/colors.ts` for any failing stops — usually the answer is to push the stop one click darker (drop ~10% lightness) so it survives the projector's gamma compression.
6. Re-run and re-verify until every adjacent pair is distinguishable.

## What "good enough" looks like

- copper-300, copper-500, copper-700 must be visibly different at 30+ meters — these are the stops the deck leans on hardest.
- neutral-50 (light surface) and neutral-900 (dark surface) must read as clearly different surfaces, not "washed dark gray on washed light gray."
- copper-200..400 are the danger zone for projector wash-out. If two adjacent stops can't be told apart, drop one and reflow the ladder.
