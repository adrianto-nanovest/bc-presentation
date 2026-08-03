# gh#18 — verdict

**Question:** is left-list + right-canvas the best form for teaching a cycle?
This prototype was the open-form control for the gh#17 fixed skeleton.

**Answer: A — THE DIAL.**

Picked by @adrianto-nanovest, 2026-08-03, after flipping all three variants at
1280x720.

## What A commits to

- **No list.** The five decisions are stations *on* the ring. Nothing about the
  slide is a column of cards, which is what makes it a real alternative to the
  sibling rather than a restyle of it.
- **The ring is open.** A 320 degree arc with a 40 degree gap on the left. One
  `YOU` block sits in the gap and terminates both ends of the arc. "You were in
  every cycle. Now you're at both ends." is read off the geometry.
- **No chain-to-ring fold.** The turn-by-turn "before" is a static struck-through
  inset, top-left. The contrast is spatial, not temporal — nothing has to be
  watched, so a facilitator who arrives mid-slide loses nothing.
- **The ring never re-draws.** Hover lights one arc segment and swaps the caption
  in the ring's hollow. The figure is drawn once and only ever re-lit.
- **The worked example is always on**, bottom-left, so the abstraction never
  floats free of Friday 4 PM.

## Against the gh#10 decision rule

- **(a) reads at projector distance** — yes, after one fix. The first build drew a
  continuous 10px base arc under the segments; it read as a single thick hoop and
  buried the "five". Removing the base arc and splitting the ring into five
  notched segments (5px unlit / 9px lit) is what made the count legible. Carry
  this into the real slide.
- **(b) paced by hover, no Space press** — yes. Every one of the five decisions is
  reachable at step 0. Step 1 adds only the tagline and the closer.
- **(c) holds at `steps: 2`** — yes. Step 0 is the whole figure and the example;
  step 1 lands the tagline and the closer.

## Carry-overs for the real implementation

1. Segments, not a base arc. See above.
2. Do **not** wash all five labels at step 1. The first build did, and five washed
   boxes turned the labels back into a card grid — the exact thing the variant
   argues against. Wash on real selection only.
3. Station labels need an outer div for the anchor transform. `.fade.on` runs a
   `fadeReveal` keyframe that animates `transform`, and a running CSS animation
   beats an inline style, so an anchor transform on the `Reveal` itself is wiped
   and the label lands in the wrong place.

## Not chosen, and why they are still worth reading

- **B — THE SCORE** (time axis) is the only variant where `BUDGET` and `GATE` are
  positions rather than overlays. gh#10 P1 lists the `BUDGET`-on-the-ring overlay
  as a known risk. If the ring cannot carry `BUDGET`, B's stop-bar is the answer.
- **C — THE SPEC** is the most copyable artifact — an audience can photograph it
  and fill it in on Monday. If E.12 ever needs a handout, C is the handout.
