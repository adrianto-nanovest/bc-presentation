# PROTOTYPE gh#19 — E.12 · THE LOOP

Throwaway. Deleted by Phase 5, along with `prototype-gh17-e12-loop-canvas/` and
`prototype-gh18-e12-open-form/`.

```
npm run dev  →  http://localhost:5173/?dev=proto19
```

`Space` / click step forward · `Backspace` / `↑` back · `1`–`5` pin a row ·
`0` clear and return to step 0 · `\` replay the current step's entry.
State is in the URL, so any frame is shareable and reload-stable.

## What #19 resolved

This is **not** a variant bracket. The form was settled in the grilling session on
2026-08-03 and this is the single candidate.

| | |
|---|---|
| **Form** | **gh#17 C's skeleton** — left five-row list + right persistent canvas — improved |
| **gh#18 A · THE DIAL** | **dropped.** The owner reversed the "mostly 18A" lean on the record |
| **Steps** | **3**, not 2. `canonicalPose: 2` |

18A's deletion of the list *was* 18A, and this build needs the list — so the two are
not reconcilable and the reversal is real, not a rewording. What survives from 18A is
its one load-bearing finding: **notched segments, never a hoop.**

## The three steps

**step 0 — full-stage hero.** An Archimedean spiral draws lap by lap, each lap slower
*and heavier* than the last. Every human turn fires on **one radial spoke**, so your
turns are collinear — one per lap — and a dashed hairline makes that a drawn fact
rather than an inference. `FRI 16:00` stamps the hollow, tied by a hairline to the
point where lap one actually begins. The outer end **stops mid-air**: no node, no
arrowhead, no closure.

**step 1 — the merge, then the dock.** Every point's radius is interpolated toward one
constant: exactly a spiral at `q = 0`, exactly a circle at `q = 1`. The stacked human
turns merge into **two** — the entry and the gate — and the ones between dissolve.
*"You were in every cycle. Now you're at both ends."* is **performed**, not captioned.
Then the figure docks right and the five rows write in behind it.

The merge happens **at full size, at centre stage**, before the dock. Meaning first,
logistics second — blending them made the most important motion on the slide happen
while it was smallest.

**step 2 — the whole apparatus at once.** Every group mounts, labelled with the Friday
4 PM run. Hover now **promotes** a group instead of revealing it.

### The insertion mechanic, on both ends of one axis

```
step 1   YOU set ─────────▶ START ○ ring ○ CHECK ─────────▶ YOU signs
step 2   YOU set ▶ [16:00] ▶ START ○ ring ○ CHECK ▶ ◇ ▶ STOP ▶ YOU signs
```

The clock and the condition do not appear *beside* the humans. They **push into the
arrows and take the middle.** That draws *"nobody presses start"* and *"where work
stops and waits for a person"* without captioning either. And because a human
terminates each end of one horizontal line, *"now you're at both ends"* becomes a fact
about the composition.

## Rules this build obeys

- **Nothing unrevealed is drawn.** No ghosts, ever. An element is absent from the SVG,
  or it is at full strength. Opacity appears only as an entry cross-fade. This is the
  direct fix for the screenshot on #19 — the old canvas was not hiding the apparatus,
  it was *dimming* it, and half-present elements read as broken.
- **Rank is stroke weight and colour tier.** Never opacity. A projector crushes 0.14
  opacity to nothing; it cannot crush a 1 px copper-700 line to nothing.
- **The ring is drawn once and only ever re-lit.** Both prior prototypes agreed on
  this and nothing here reintroduces node-by-node assembly. `1 → 2 → 1` never replays
  the merge.
- **Hover is live from step 1, and it mounts that row's apparatus** — one group at a
  time, on an otherwise clean canvas. At step 2 every group is already mounted, so
  hover promotes instead of reveals. **Un-hover releases. Click pins.** This closes
  #19's last open item.
- **`kw` everywhere** — headline, all five row descriptions, all five captions,
  tagline, closer, and both step captions. Mono strings never carry keywords, which
  covers the qualifier, the row titles, the phase labels and the build strip.
- **Labels carry a surface-coloured backing plate.** On a spiral, every direction out
  of a node crosses another lap, so moving labels clear of the strokes is impossible.
  Occlusion is the only solution that scales.
- CSS vars only, no hex literals, no new fonts, no new libraries.

## Decisions taken in the session, recorded here so they are not re-argued

1. **The worked example is not a card.** It is the apparatus' labels — `FRI 16:00`,
   `review/state.json`, the `STOP` condition, `signs the folder`. A card beside a
   diagram makes the audience read the same loop twice. Cost: the scenario labels
   arrive at step 2, which softens §8.3's *"always visible, not a step."* Only the
   `/loop + Routines` strip is on from step 1.
2. **The closer is the caption well's idle line at step 2.** Bottom-left stays
   tagline-only. Every time the pointer is released, the figure re-states its own
   thesis — the best available resting state for a canvas that sits up for minutes.
3. **`BUDGET`'s "second ring with no stop" is recovered as motion, not a twin.**
   gh#17 A's ghost ring and gh#18 B's `CAPPED`/`OPEN` meters are both **cut** — they
   said the same thing twice and were the densest objects on the canvas. On hover the
   gauge fill runs at the cap tick and is **chopped** by it, and a dashed overrun shows
   where an uncapped loop would have gone. #19's item 1 is therefore answered
   *"drawn"*, not *"given up in words."*
4. **Rule (b) is dead, and partly recovered.** #10 required pacing by hover with no
   Space press. Three steps need two. But everything from step 1 on is hover-reachable,
   so it is **one** press before the slide is complete, not two.

## Deviations from what the session locked, and why

- **The gauge sits OUTSIDE the ring, not inside.** Inside was tried first and collided
  with the phase labels at `RUN`. The north band is the only quadrant with no
  apparatus, so the gauge went there.
- **The spiral's outer end does not point off-frame.** A spiral curves, so no tail
  exits the stage quickly — a 0.45-lap tail bends back toward the left. It stops
  mid-air instead. "Unterminated" is delivered; "off-frame" was geometrically wrong.
- **The condition diamond hangs well off the ring at `CHECK`**, with a real edge from
  the node into it. Sitting on the node it covered the `CHECK` phase label and had no
  edge at all.
- **The ring centre sits at x = 834, well left of the right region's centre.** The east
  chain needs room for the diamond, its edges and the gate; the left margin closes up
  against the card column to pay for it.

### One deviation that is a semantic correction, not a fit problem

**The `GATE` human sits AFTER `STOP`, not off the `SHIP` edge.**

§8.3 inherited *"gate human off the ship edge below-right"* from gh#17's ring anatomy.
That is wrong, and it contradicts this slide's own argument: **a gate that fires on
every lap is not a loop — it is turn-by-turn with extra steps.** `GATE`'s own fixed copy
says *"One named place where work stops and waits for a person"*, and the place work
**stops** is `STOP`. The worked example agrees: the person signs **the folder**, once,
not each update as it lands.

So the loop runs unattended until the condition is met, and only then does a person
sign. This needs an explicit owner call, because the old anatomy is on §8.3's page.

## What was observed in the browser

Checked at 1280×720 inside the real `<Slide>` stage, via `scripts/p19-shots.mjs`
and `scripts/p19-extra.mjs`.

- `data-phase` walks `hero → merge → dock → ring → full`.
- All five rows light their own apparatus group; all five report `data-active=true`.
- At step 1, hovering a row mounts **exactly one** group — measured per group, and the
  other three are absent from the DOM every time. Idle at step 1 mounts **none**.
- Un-hover leaves **nothing** active. Pin holds after the pointer leaves.
- `2 → 1` reports `ring` on the first frame after the press — the merge does not replay.
- **Zero** elements in the figure rest at partial opacity.
- `prefers-reduced-motion: reduce` jumps to each step's end pose (`hero`, `ring`,
  `full`) with no animation.
- `laps=2` and `laps=4` both hold: the caption counts stay true, and exactly two human
  glyphs survive the merge at any lap count.
- Console clean, no page errors.
- `vite build` succeeds and `dist/` contains none of eight prototype markers.

## Still open — only answerable at the projector

- **Lap tiering.** The innermost lap is 1.4 px at `--copper-700`. That is deliberate
  (cost accumulates outward) but it is the first thing a washed-out projector will
  lose. If it vanishes, raise the floor tier rather than the weight.
- **The four scalars.** `lap` 620 ms, `merge` 1100 ms, `hold` 250 ms, `dock` 700 ms are
  defaults, not answers. #19 killed gh#17's fold-duration scalar along with C's chain;
  the merge revives it as two numbers. All four are switcher sliders for exactly this.
- **Step-0 pacing.** The full entry runs ~2.3 s at `laps: 3`. A facilitator who talks
  over it will be behind the animation.

## Not done

No tests, no error handling, no export-pipeline wiring, inline styles throughout.
Prototype rules. **Rewrite, do not lift.**
