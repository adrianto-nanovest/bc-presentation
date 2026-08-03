# PROTOTYPE gh#17 — E.12 loop canvas

Throwaway. Right column only; the slide skeleton is fixed by #10.

```
npm run dev  →  http://localhost:5173/?dev=proto17
```

`← →` cycle variant · `Space` / `Backspace` step · `1`–`5` force a row · `0` clear ·
`\` replay entry · `h` toggle un-hover behaviour. State is in the URL.

## The fork

Only one thing is genuinely open on the canvas, and it is the issue's open
question 2: **BUDGET is the only row that needs a comparison rather than a
highlight.** So that is the only axis the three variants disagree on.

| | BUDGET | Apparatus at rest | Ring |
|---|---|---|---|
| **A — Overlay** | concentric dashed ghost twin, always faintly present | all of it, dim | never moves |
| **B — Twin** | a second figure: ring shrinks + slides left, uncapped twin beside it, meters between | all of it, dim | moves, for BUDGET only |
| **C — Gauge** | nothing duplicated — spend is an arc gauge on the ring with a cap tick | hidden until hovered | never moves |

A vs C therefore also settles *"must the canvas show everything at once"*.

Open questions 1 and 3 are **scalars, not structures**, so they are switcher
controls rather than variants — each can then be judged against all three
figures instead of being baked one-per-variant:

- **Q1 fold timing** → entry-duration slider, 1000–4000 ms, plus replay.
- **Q3 un-hover** → `release` (back to the idle ring) / `hold last`.

Changing variant or fold duration replays the entry, so the three are always
seen from the same cold start.

## Ring anatomy (shared by all three, on purpose)

The brief fixes it, so three different anatomies would answer a question nobody
asked.

```
        RUN
         ○
START ○     ◇ CHECK ──YES──▶ [STOP]
         ○
        SHIP
   ↙            ↘
[file]         [human]
```

Clockwise `START → RUN → CHECK → SHIP`. Clock + entry arrow on the left, state
file below-left (write-after from SHIP, dashed read-before into START), the
condition diamond at CHECK with both exits, the gate human hanging off the ship
edge below-right.

The fold is a per-node lerp plus a per-segment control-point lerp — exactly a
straight line at `q=0`, exactly a circle at `q=1`. The closing segment
`SHIP → START` has no chain counterpart and fades in during the fold: the moment
it appears is the moment the chain stops being a chain. Four humans pulse in the
chain; the two `YOU` nodes travel outward to the trigger end and the gate end,
the other two fade — *"you were in every cycle, now you're at both ends."*

## What was observed in the browser

Everything below was checked at 1280×720 inside the real `<Slide>` stage.

- Entry plays unattended, no Space press. `data-phase` goes `chain → fold → ring`.
- All five hover states light pre-drawn parts; nothing is re-drawn or assembled
  node-by-node.
- GATE freezes the travelling pulse at SHIP — *"ring holds"* is a real behaviour,
  not a caption.
- Step 1 lights all five, runs exactly one lap with a trail, then holds; tagline
  lands bottom-left.
- `hold=1` keeps the last row after the pointer leaves; `hold=0` returns to idle.
- Console clean. `prefers-reduced-motion` jumps to the end pose.
- Production bundle contains none of it (`vite build`, then grepped `dist/` for
  six markers — all absent).

### Open, and only answerable at the projector

- **A**'s ghost ring is visible at rest (0.14 opacity). It is dashed against the
  solid ring, which separates them on a monitor. Whether that survives a washed-out
  projector is the thing to check.
- **B** scales the ring to 0.72, which takes the station labels from 11px to
  ~8px. That is the cost of the layout move.
- **C** is the most legible of the three and the least faithful to the brief —
  it drops the "second ring with no stop" image entirely.

## Fold timing (Q1)

Default 2400 ms — 30% chain draw, hold, 42–84% fold, settle. The slider is the
answer mechanism, not this number.

## Not done

No tests, no error handling, no export-pipeline wiring. Prototype rules.

## Verdict — 2026-08-03

**C — GAUGE wins.** Owner's call, on a browser walkthrough of all three. No
rationale was stated beyond the preference; recorded as-is rather than invented.

What that settles:

| open question (gh#17) | answer |
|---|---|
| Q2 · How does `BUDGET` show a comparison rather than a highlight? | **An arc gauge on the ring itself, with a cap tick.** Nothing is duplicated — no ghost twin (A), no second figure (B). The ring never moves and never re-draws. |
| Must the canvas show everything at once? | **No.** The apparatus stays hidden until hovered. A and C were the two sides of this question; the reveal-on-hover side wins. |

Q1 (fold duration) and Q3 (un-hover behaviour) were built as switcher scalars,
not as variants, so **this pick does not settle them.** Both still need an owner
call at the projector; 2400 ms and `release` are only the defaults they were
flipped from.

Carry-overs for the real implementation:

1. **The "second ring with no stop" image is gone.** This is the known cost of C
   (finding above) and it is a deliberate trade of fidelity for legibility. The
   real slide either says that in words or gives it up — decide explicitly, do
   not let it vanish by omission.
2. **The gauge is now load-bearing.** With no twin figure, the cap tick is the
   only thing carrying "there is a limit". It has to survive a washed-out
   projector; the sibling prototype (gh#18) lists ring-borne `BUDGET` as a known
   risk and keeps B's stop-bar in reserve if the arc cannot hold it.
3. **Keep the shared ring anatomy.** The fold, the clockwise `START → RUN →
   CHECK → SHIP`, the closing segment that fades in — the brief fixes these and
   all three variants agreed on them.
4. **Rewrite, do not lift.** Prototype rules applied — no tests, no error
   handling, inline styles throughout.
