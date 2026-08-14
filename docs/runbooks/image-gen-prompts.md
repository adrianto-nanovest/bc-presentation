# Hero photo prompts — Reveal + Closing

Archived so each hero can be re-rendered without scraping the spec. Source: `docs/specs/2026-05-07-slides-reveal-and-closing.md` §4.2, §4.4, §4.5, §4.9.

## I.2 — Night workspace (`assets/heroes/i2-night-workspace.jpg`)

> Editorial photograph, late evening, atmospheric warm-amber lighting from a single brass desk lamp. A walnut-wood desk with an open laptop showing soft-focus code, a leather-bound notebook with a fountain pen, a ceramic coffee cup with steam catching the lamplight. Deep shadows in the background recede into matte near-black. Copper-amber accent palette throughout. No people visible. Mood: quiet craftsmanship, dignified focus, late-night solo work. Suitable for slide background — subject offset to upper-right; bottom-left region intentionally dim for text overlay. 16:9 widescreen.

## I.4 — Dusk horizon (`assets/heroes/i4-dusk-horizon.jpg`)

> Editorial photograph at dusk or first dawn. Long quiet road or open horizon receding into distance, fading into copper-amber atmospheric haze. Deep shadows in foreground; misty depth in middle; warm horizon light at the vanishing point. Minimal subject — no people, no vehicles, no specific architecture. Mood: continuation, possibility, dignified onward motion. Copper-amber accent palette. 16:9 widescreen. Suitable for slide background — bottom region intentionally darker for text overlay.

## J.1 — Notebook study (`assets/heroes/j1-notebook-study.jpg`)

> Editorial photograph, dim warm interior lighting. An open leather-bound notebook with handwritten notes in dark fountain-pen ink, slightly out of focus on the upper portion of the page. A pen rests across the spine. Atmospheric copper-amber accent from an unseen warm light source (lamp out of frame). Deep shadows surround; background fades into matte near-black. Mood: study, learning, deliberate craft, quiet humility. No people. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

## K.1 — Morning workspace (`assets/heroes/k1-morning-workspace.jpg`)

> Editorial photograph at first light / dawn. Industrial-craft style workspace in a high-ceilinged room with tall windows. Warm copper-amber morning light streaming through windows, casting deep shadows. A pulled-out wooden chair beside a walnut desk. On the desk: a closed laptop, an open leather notebook with a clean page, a pen resting across the page. The room feels READY but EMPTY — set up for someone to arrive and begin work. No people visible. Mood: invitation, readiness, the threshold of a new task. Copper-amber accent palette. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

## K.3 — Open horizon / threshold (`assets/heroes/k3-open-horizon.jpg`)

> Editorial photograph, warm golden-hour light. View from inside a high-ceilinged industrial-craft room looking out through a large open doorway onto a bright, expansive horizon at sunrise — distant hills and open sky washed in copper-amber light. In the foreground interior, a simple wooden threshold and the edge of a walnut desk; the space reads as a point of departure, about to be stepped through. Deep interior shadows recede into matte near-black, especially the bottom-left corner. No people visible. Mood: departure, possibility, dignified onward motion — the threshold of what comes next. Copper-amber accent palette, single warm light source from the horizon. 16:9 widescreen, suitable as a slide background — bottom-left region intentionally darker and smooth for text overlay.
>
> Generated via `gemini-multimedia-gen` MCP (`generate_image`, gemini-3-pro-image, 16:9, 2K) → `sips` resample to 1920w JPG q78 (303 KB). Closing slide of the deck; bookends K.1's "ready & empty" workspace with the door thrown open.

## D.5 — Bridge to E (`assets/heroes/d5-bridge.jpg`)

> Editorial photograph at first light or dawn. An industrial workspace inside a high-ceilinged room with tall windows. Warm copper-amber morning light streaming through, casting deep shadows. In middle distance: a wooden desk scattered with technical diagrams, hand-sketched flowcharts, and a closed laptop. The room feels like a war room mid-thinking — the strategic work is done, but the engineering work hasn't begun. No people visible. Mood: threshold, momentum, transition between planning and building. Copper-amber accent palette throughout. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

## Leader-only bridge heroes (gh#72)

Three new bridges close the leader deck's leader-only runs — `gap`, `invest` and `pitfalls`.
`shape` gets none: C.4 already ends on *"I build the foundation. You empower them. They
drive the adoption."*, which is the handoff into WHY INVEST.

**THE FILE NAMES CARRY SECTION KEYS, NEVER LETTERS.** Every name above this line
(`d5-bridge`, `e11-bridge`, `h3-bridge`) records a standard-deck letter, and two of the
three are already stale — `e11-bridge.jpg` is consumed by `e13-bridge-to-f` and prints
**H.13** in a leader deck, and `h3-bridge.jpg` prints **K.4** there. Letters are derived per
composed deck (§3.5), so a letter in an asset name goes wrong on the next insert. The
figures named below are what the deck composes TODAY and are not fixed by anything.

House style, held by all three prompts: editorial photograph · ONE warm light source ·
copper-amber accent palette · deep matte near-black · no people · no text, signage or logos ·
16:9 · **bottom-left AND top-left regions dark and smooth**, because the slide draws the
beats bottom-left and the `FigLabel` top-left over three gradient overlays.

### Bridge · gap → shape (`assets/heroes/gap-to-shape-bridge.jpg`)

> Editorial photograph, first light. Close three-quarter view along a dry-stone wall of
> weathered grey-brown limestone, built about five courses high, receding to the right. In the
> TOP COURSE, near the centre of the frame, ONE STONE IS MISSING — a clean rectangular notch
> exactly one block wide and one block deep, and the pale dawn sky is visible through that gap.
> A taut mason's string line runs level across the top of the wall, passing over the notch. A
> brass spirit level rests flat on the finished stones to the right of the notch. Warm
> copper-amber dawn light rakes in from the right across the stone faces so every chisel mark
> and joint reads; the left third of the frame and the whole bottom-left corner fall into deep,
> smooth near-black shadow. Behind the wall, open ground recedes into matte near-black with
> faint mist. No people, no hands, no text, no signage, no logos, no brickwork — hand-cut stone
> only. Mood: patient craft, a structure part built, one piece missing. Copper-amber accent
> palette, single warm light source. 16:9 widescreen, suitable as a slide background —
> bottom-left and top-left regions intentionally dark and smooth for text overlay.
>
> **THIS IS THE SECOND PROMPT AND THE FIRST ONE FAILED, so do not simplify it back.** The
> first attempt asked for "ONE GAP left in the top course where a stone is not yet set", which
> the model rendered as a continuous top course: a wall with no gap in it, on the one slide
> whose whole subject is a gap. The five clauses that fixed it are the load-bearing ones — the
> notch sized in BLOCKS, the SKY visible through it, the string line PASSING OVER it, the level
> to its RIGHT so the notch is not hidden under brass, and `no brickwork` (the first roll came
> back as orange brick, away from the deck's palette).
>
> Consumed by `gap-bridge-to-shape` (leader decks only; composes as **B.5** today). Beats:
> *"The gap is named. / None of it was a tool problem."* → *"Next: the shape that closes
> it."* The wall is the argument in one frame — the gap is in the structure, not in the tools
> resting on it. NOT a bridge span: `bridge-foundation.jpg` (leader F.6) is already a viaduct
> in fog, and NOT a drawing: `d5-bridge.jpg` (leader G.5) is already blueprints.

### Bridge · invest → curriculum (`assets/heroes/invest-to-curriculum-bridge.jpg`)

> Editorial photograph at first light. An empty teaching room in an industrial-craft building
> with tall windows: three or four rows of plain walnut benches and desks, aligned and
> unoccupied, facing a large dark slate board at the front that has been wiped almost clean —
> only faint chalk dust, NO legible writing. Warm copper-amber morning light enters through
> the tall windows on the right and lies in bands across the desk tops; the room's left side
> and the whole bottom-left corner fall into deep, smooth near-black shadow. High ceiling,
> dust suspended in the light, matte near-black in the far corners. No people, no text, no
> signage, no logos, no projector screen. Mood: prepared and not yet begun — the room where
> the learning still has to happen. Copper-amber accent palette, single warm light source.
> 16:9 widescreen, suitable as a slide background — bottom-left and top-left regions
> intentionally dark and smooth for text overlay.
>
> Consumed by `invest-bridge-to-curriculum` (leader decks only; composes as **D.5** today).
> This one bridge carries BOTH leader-only runs in front of it, because `shape` has no bridge
> of its own. Beats: *"The shape is drawn. The case is made. / Neither one teaches a single
> person."* → *"Next: what your people actually learn."* The empty room is the missing half:
> an operating model and a budget teach nobody, and the ~40 curriculum slides after it are
> what does. Keep the board unreadable — generated lettering is unusable on a projector.

### Bridge · pitfalls → mandate (`assets/heroes/pitfalls-to-mandate-bridge.jpg`)

> Editorial photograph, warm interior lamp light entering from the right. Tight three-quarter
> view of a heavy brass-and-hardwood hand stamp lying ON ITS SIDE on a dark leather desk pad,
> its knurled wooden handle and brass collar catching the warm light; the stamp's face is
> turned away and unreadable. Beside it, the corner of one sheet of paper carrying two or three
> lines of handwriting that are OUT OF FOCUS AND ILLEGIBLE, and a fountain pen with the cap off
> lying across the sheet. A closed ink pad sits at the edge of the pool of light. Everything
> else falls away into deep, smooth matte near-black — the left third of the frame and the whole
> bottom-left corner are unlit. Shallow depth of field, fine dust on the leather, single warm
> light source with no lamp visible in frame. Copper-amber accent palette. No people, no hands,
> no legible text, no numbers, no signage, no logos. Mood: the moment before a decision is
> signed — quiet authority, permission about to be granted. 16:9 widescreen, suitable as a slide
> background — bottom-left and top-left regions intentionally dark and smooth for text overlay.
>
> Consumed by `pitfalls-bridge-to-mandate` (leader decks only; composes as **J.3** today,
> the slot `h3-bridge-to-i` vacates when it moves behind `mandate-levers` to K.4). Beats:
> *"Discipline does not spread by itself. / Someone must make room for it."* → *"Next: what
> only you can authorise."* The stamp is beat 2 as an object: the one act in the frame is a
> permission nobody else in the room can give.
>
> **A GATE SHIPPED FIRST AND WAS REJECTED, and the reason is the rule to apply to the next
> hero.** It asked for a timber-and-iron gate seen from inside a dark stone passage, one leaf
> open, sunrise beyond, a wedge of light on the floor — and it rendered well. It is also
> `k3-open-horizon.jpg`, which is the deck's CLOSER (leader N.3): dark interior · an opening ·
> warm light beyond · a light wedge on the floor. Same composition, same idea, fifteen slides
> apart. THE TEST IS NOT "IS THE OBJECT DIFFERENT" BUT "IS THE MEANING DIFFERENT" — a repeated
> MATERIAL is this house style working (brass here and in `g11-bridge.jpg`, a fountain pen here
> and in `j1-notebook-study.jpg`), while a repeated MEANING is the deck saying one thing twice
> and spending its closer early. The tell was in the writing: the rejected entry needed a
> sentence explaining how it differed from `k3-open-horizon.jpg`. If a prompt needs that
> sentence, re-roll the concept rather than the prompt.
>
> J.3's neighbours are also tight and constrain any replacement: `g11-bridge.jpg` (I.11, brass
> compass on a bench) four slides ahead and `h3-bridge.jpg` (K.4, anvil in a forge) four
> behind. So: no bench, no hand tool at mid-distance, no dark forge interior, no doorway.

### How the three shipped (2026-08-15)

`gemini-multimedia-gen` MCP, `generate_image`, model `gemini-3-pro-image`, `aspect_ratio 16:9`,
`image_size 2K` → 2752×1536 PNG. The model's "16:9" is **1.792, not 1.778**, so each PNG was
centre-cropped to 2731×1536 and only then resampled — a straight `-Z 1920` would have shipped
1920×1072 and a forced `-z 1080 1920` would have stretched it:

```sh
sips -c 1536 2731 <in>.png --out /tmp/crop.png
sips -Z 1920 -s format jpeg -s formatOptions 78 /tmp/crop.png --out assets/heroes/<name>.jpg
```

Result: 1920×1080 each, 411 KB / 350 KB / 224 KB — inside the < 800 KB budget. The 2K PNGs are
intermediates and are not kept.

## Re-render workflow

1. **If `gemini-image-gen` MCP is registered** (`claude mcp list | grep gemini`):
   - Use the MCP's image-gen tool with each prompt above.
   - Output spec: 16:9 (1920×1080 minimum), JPG, < 800 KB after optimization.
   - Save to `assets/heroes/<name>.jpg`.
2. **If MCP is NOT registered:**
   - Curate from Unsplash (free, royalty-free) using search terms drawn from the prompt (`night desk lamp warm`, `dusk horizon copper`, `notebook fountain pen`, `morning workspace empty chair`).
   - Verify the photo meets the vignette-friendly constraint (the region named in the spec for text overlay is dim or smooth-toned).
   - Save to the same path.
3. Re-run `npm test` — `tests/unit/HeroPhoto.test.tsx` is path-agnostic; no test code change needed.
4. Re-run `npm run dev` and inspect each hero slide visually to confirm the vignette mask still produces readable text overlay.
