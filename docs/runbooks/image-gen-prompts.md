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

## D.5 — Bridge to E (`assets/heroes/d5-bridge.jpg`)

> Editorial photograph at first light or dawn. An industrial workspace inside a high-ceilinged room with tall windows. Warm copper-amber morning light streaming through, casting deep shadows. In middle distance: a wooden desk scattered with technical diagrams, hand-sketched flowcharts, and a closed laptop. The room feels like a war room mid-thinking — the strategic work is done, but the engineering work hasn't begun. No people visible. Mood: threshold, momentum, transition between planning and building. Copper-amber accent palette throughout. 16:9 widescreen. Suitable for slide background — bottom-left region intentionally darker for text overlay.

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
