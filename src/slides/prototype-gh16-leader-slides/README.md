# PROTOTYPE — gh#16 · leader deck, two new layout genres

**Throwaway.** Nothing in this directory ships. When a variant wins, it gets
**rewritten** into a real slide (this code was written under prototype rules —
no tests, no error handling, no abstraction) and the directory is deleted.

## The questions

Two slides in the leader deck (#8) invent layout genres with no precedent in
this codebase. Three radically different variants of each, so the answer is
picked in a browser instead of in someone's head.

**1 · Agentic Organization** — Act II centrepiece.
> Does hub-and-spokes read at projection distance, or does a ladder / grid carry
> six pillars better? How does the focus walk dim the other five without the
> slide going dark?

**2 · The Capability Ladder** — Act I closer.
> How does an *asserted* marker look different from an *open question* without a
> legend? Does the hr-group `web/` path-draw port cleanly into copper, or is a
> rebuilt geometry cheaper?

Both slides are brand-varying (slots 2 and 5 of #8), so every variant renders
under both brands.

## Run it

```bash
npm run dev     # then open:
open "http://localhost:5173/?dev=proto16"
```

| key | does |
|---|---|
| `←` `→` | cycle variant (wraps) |
| `1` / `2` | pillars / ladder |
| `b` | toggle GEMS ↔ Berau |
| `Space` / click | next step |
| `Backspace` | previous step |
| `0` | reset to step 0 |

State lives in the URL (`?dev=proto16&p=…&v=…&brand=…`) so any frame is
shareable and reload-stable. The switcher bar is gated on `import.meta.env.DEV`.

The route needs a two-line hatch in `src/deck/Deck.tsx` (**not committed on this
branch** — that file also carries the gh#17/#18 hatches from parallel work):

```tsx
import { Proto16Route } from "@/slides/prototype-gh16-leader-slides";
// …inside Deck(), before the hexladder branch:
if (import.meta.env.DEV && params.get("dev") === "proto16") return <Proto16Route />;
```

Screenshots of every variant × brand × key step:
`node src/slides/prototype-gh16-leader-slides/shoot.mjs` → `/tmp/proto16/`.

## The variants

`brief.ts` is the **control** — every variant renders exactly that copy. Anything
a variant invents about layout, grouping, ordering or emphasis is the variant's
own opinion.

### Slide 1 — Agentic Organization (9 steps)

| | genre | what it proposes about the dimming problem |
|---|---|---|
| **A** | Orbit — hub & spokes | Nothing dims. Inactive pillars keep full border and label; the active one *gains* copper fill, a thickened spoke and a halo. Attention bought with added light, not subtracted light. |
| **B** | Stack — decision ledger | Six rows of a ledger; the enabler is a header band, not a centre. The focus walk **expands** the active row — the decision text only exists inside an open row. Attention moves by height. |
| **C** | Spine — two columns | The other five never carry body text to begin with, so there is nothing to dim. One tile grows, one connector is drawn, total luminance barely moves. |

### Slide 2 — Capability Ladder (5 steps)

| | genre | legend-free encoding of asserted vs open |
|---|---|---|
| **A** | Staircase — port of `web/index.html` | asserted = solid chip, solid leader, filled dot, source in mono. open = hairline **dashed** chip, dashed leader, **open ring**, serif-italic sentence ending in "?". |
| **B** | Axis — above / below | Encoded by **which side of the band** a marker sits on. L1–L5 live *inside* the band so above/below stays free for meaning. |
| **C** | Bands — stacked, L5 on top | asserted lives **inside** its band (it belongs to the level); open floats **outside** in the right gutter on a dashed tether (it has not been placed, it is being pointed at). |

## Findings so far (before the owner has picked)

These came out of building it, not out of judging it — the verdict is still the
owner's.

1. **The pillar slide cannot be "~4 steps."** Six pillars × one leader-decision
   each is six beats, minimum, plus hub + reveal + closer = **nine**. The issue
   budgeted ~4. Either the step budget moves, or the focus walk groups pillars
   into pairs (governance+tools / people+strategy / process+companions), which
   costs the one-decision-per-pillar clarity that makes the slide an index for
   Act III. Recommend the budget moves.
2. **Copper has no second hue to spend.** The `web/` original separates its two
   markers with cyan vs violet. A single-hue system cannot do that, so
   asserted-vs-open has to be carried by *form* — solid/dashed, inside/outside,
   mono/serif-italic, dot/ring. All three ladder variants pick a different form
   answer; that is the actual thing to judge.
3. **The port is cheap; the port's colour coding is not.** Answering the second
   open question directly: variant A *is* the `web/` geometry, re-cut for
   1280×720. One `<path>` plus text nodes — the geometry was never the cost.
4. **Berau's missing marker needs to be stated, not left blank.** Silence reads
   as an unfinished slide. `brief.ts` carries an explicit `absence` line for
   Berau; ladder C handles it best (an empty gutter beside a full band stack
   reads as "we looked and there is nothing").
5. **Variant B (axis) has a lot of dead space** in its lower half and no
   metaphor for "climbing" — the phase strip carries direction alone.

## Verdict — 2026-08-03

**A wins on both slides.** Owner's call, on a browser walkthrough of all six.
Rationale was not stated beyond the preference; recorded as-is rather than
invented.

What that settles, question by question:

| open question (gh#16) | answer |
|---|---|
| Does hub-and-spokes read at projection distance, or does a ladder / grid carry six pillars better? | **Hub-and-spokes.** The radial arrangement holds. B and C are dead. |
| How does the focus walk dim the other five without the slide going dark? | **It does not dim them.** Inactive pillars keep full border and label; the active one *gains* copper fill, a thickened spoke and a halo. Attention is bought with added light, never subtracted. |
| How does an asserted marker differ from an open question without a legend? | **By form, four ways at once:** solid chip vs hairline dashed chip; solid leader vs dashed leader; filled dot vs open ring; mono-uppercase-with-source vs serif-italic-ending-in-"?". |
| Does the `web/` path-draw port cleanly into copper, or is a rebuilt geometry cheaper? | **The port wins.** One `<path>` plus text nodes, re-cut for 1280×720. The geometry was never the cost — only the cyan/violet colour coding had to be replaced, and form replaces it. |

Constraints that survive into implementation:

1. **Nine steps, not ~4**, for the pillar slide (finding 1 above). Variant A uses
   the full six-beat walk, so the budget in #16 has to move.
2. **Berau's `absence` line is required copy**, not a placeholder — the ladder
   must state that MineTech has nothing comparable rather than leave the space
   blank.
3. **Watch the bottom pillar.** In A the lowest satellite sits at y≈620 (bottom
   edge ≈658), close to the NavBar hover zone, and it grows on focus. The closer
   had to be moved off the bottom strip into the right column because of it.
   Re-check this when the slide is rebuilt for real.
4. **Rewrite, do not lift.** This code was written under prototype rules — no
   tests, no error handling, inline styles throughout.
