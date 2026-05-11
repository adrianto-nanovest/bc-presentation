# Section H — Pitfalls + Discipline · Spec (H.1 – H.3)

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Draft 2026-05-12
**Parent meta-spec:** `docs/specs/2026-05-06-process-and-design-meta.md`
**Dependent on:** `2026-05-12-slides-application-G1-G6-catalogue.md` (shared conventions, components)

## 0. Scope

This spec covers **Section H (3 slides)** — the practical-close arc:
- H.1 The Trap
- H.2 The Discipline
- H.3 Bridge to I (Showcase + Hook 2)

Conventions (entry animation, hover, click, palette, typography, shared components) are defined in **Spec A §2** and referenced here without restatement.

## 1. New shared components introduced in this spec

### `<TrapWall>` (H.1)
Composition-level animation loop wrapping the 8 pitfall cards. Renders the wall layout + the irregular "warning pulse" loop.

```tsx
<TrapWall pitfalls={Pitfall[]} />
```

- File: `src/slides/application-section-h/components/TrapWall.tsx`
- 4×2 grid of pitfall cards
- Composition loop: irregular timing, 1–2 cards at a time briefly flare copper-200 (200ms in, 600ms out), then fade. Average ~1 flare every 2-3s. Feels "things going wrong."
- Loops continuously regardless of step

### `<DisciplineWall>` (H.2)
Composition-level animation loop wrapping the 8 practice cards. Renders the wall layout + the calm "discipline rhythm" loop, plus the cross-highlight binding to the H.1 pitfall pills.

```tsx
<DisciplineWall
  practices={Practice[]}
  pitfallPills={PitfallPill[]}    // shrunk H.1 references
  pillsVisible={boolean}           // step 2 trigger
/>
```

- File: `src/slides/application-section-h/components/DisciplineWall.tsx`
- 4×2 grid of practice cards
- Composition loop: cards light up in a calm sequence (left-to-right, top-to-bottom), each card glowing copper-300 for 400ms, then settling. Cycle takes ~10s. Feels "ordered, in control."
- Cross-highlight: hovering a practice card → its `resolves` array glows the matching pitfall pills (copper-200) when `pillsVisible` is true

### `<PitfallGlyph>` and `<PracticeGlyph>` (per-card animated motifs)
Per-card glyphs in the `<AnimatedGlyph>` system (defined in Spec A §2.7). 8 of each. Each is a small SVG/CSS animation:
- Pitfall glyphs: subtle "anti-pattern" motifs (e.g., vibe-coding = scribble fading, hallucination = wave-distortion, context-rot = noise)
- Practice glyphs: subtle "discipline" motifs (e.g., sharpen-axe = grindstone spark, goal-driven = arrow-trace, eval-driven = check-tick)
- File: `src/components/AnimatedGlyph/{pitfall,practice}/<kind>.tsx`

## 2. Per-slide deep dives

### H.1 — The Trap

**FigLabel:** `FIG. H.1 · THE TRAP`
**Headline:** "What untrained use looks like."
**Headline kw:** `["untrained use"]`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Below (top:156, bottom:80): 4×2 grid of 8 pitfall cards, gap 18px
  - Each card: ~290px wide × ~250px tall
  - Container wrapped in `<div data-no-advance>`
- Below grid (when revealed at step 1): closing line strip

**8 pitfall cards:**

| # | Pitfall | Symptom (1-line, mono 11px) | Cost (1-line, serif italic 13px) | Glyph kind | Pill label (for H.2) |
|---|---|---|---|---|---|
| A | Vibe coding | No spec, no review, no plan | Burns trust, breaks deploys | `vibe-coding` | "vibe coding" |
| B | Prompt-and-pray | Asks once, ships output | Generic results, blamed the tool | `prompt-pray` | "prompt-and-pray" |
| C | Sensitive-data leaks | Pasted credentials into prompt | One paste = full breach | `data-leak` | "sensitive data" |
| D | Tool overload | Twenty tools, no strategy | AI picks wrong one under stress | `tool-overload` | "tool overload" |
| E | Confidently-wrong | "AI said it; must be right" | Decisions on hallucinated facts | `hallucination` | "hallucination" |
| F | Stale data as truth | Knowledge cutoff hidden | Yesterday's answer to today's question | `stale-data` | "stale data" |
| G | Over-engineering | AI for what scripts handle | Cost + maintenance for nothing | `over-engineering` | "over-engineering" |
| H | Context rot | One session lived too long | Performance degrades silently | `context-rot` | "context rot" |

**Card structure:**
```
┌── A ── (mono 11px copper-300) ─────────┐
│  [glyph 48×48 — animated]                │
│  VIBE CODING (display 18px)              │
│                                          │
│  No spec, no review, no plan             │
│  (mono 11px copper-100)                  │
│                                          │
│  Burns trust, breaks deploys             │
│  (serif italic 13px, neutral-300)        │
└──────────────────────────────────────────┘
```
- Border: copper-700 default; hover → copper-200 + copper-glow; momentary copper-200 flare via composition loop (200ms in, 600ms out, irregular timing)
- Padding: 16px

**Composition-level animation loop:**
- See `<TrapWall>` spec above
- Irregular timing — feels chaotic / "things going wrong"
- 1–2 cards flare at a time; average 1 flare per 2–3s
- Never blocks step-reveal; always additive

**Step structure:**
- Step 0 (entry):
  - 8 pitfall cards stagger in: `delay={120 + i * 80}` (row-major, A through H)
  - Glyphs start their per-card loops on mount
  - `<TrapWall>` composition loop starts after all cards mounted (~800ms post-entry)
  - Subhead beneath headline (mono 11px copper-400): "Eight ways teams burn time, money, and trust. Same tool. Different operator."
- Step 1: Closing line reveals beneath grid (italic display 22px, copper-200): "Same tool. Same access. Different operator."

**Hover:** Universal copper-200 + copper-glow (consistent with G.3 etc.). Hovered card overrides any composition-loop flare.

**Click + advance:** Wrap the 4×2 grid in `<div data-no-advance>`.

---

### H.2 — The Discipline

**FigLabel:** `FIG. H.2 · THE DISCIPLINE`
**Headline:** "What discipline looks like."
**Headline kw:** `["discipline"]`
**Steps:** 3 · **Canonical pose:** 2 · **Animation mode:** `step-reveal`

**Layout:**
- Top: FigLabel + headline (always)
- Center upper region (top:156, mid: ~440px tall): 4×2 grid of 8 practice cards, gap 18px (each ~290px × 200px)
- Center lower region (mid+18px to bottom:80, ~140px tall when shown): copper rule + mono header "Resolves what?" + 8 shrunk pitfall pills
- Container (whole interactive region) wrapped in `<div data-no-advance>`

**8 practice cards:**

| # | Practice | Move (1-line, serif 14px) | Resolves (pitfall ids) | Glyph kind |
|---|---|---|---|---|
| 1 | Sharpen the axe | Spec first; tools aligned to outcome | A, B, G | `sharpen-axe` |
| 2 | Goal-driven | Start from outcome; work backward | B, D, G | `goal-arrow` |
| 3 | Build skills, not one-off prompts | Reusable Claude Skills, MCP, Plugins | D, H | `skill-block` |
| 4 | Human-in-the-loop | Approval gates; review before commit | A, E | `human-loop` |
| 5 | Context discipline | Compact, fresh sessions, just-in-time | H, F | `context-window` |
| 6 | Don't reinvent the wheel | Reuse community Skills, MCPs, Gems | D, B | `wheel-reuse` |
| 7 | Eval-driven iteration | Grader tests + regression checks | E, A | `eval-tick` |
| 8 | Foundation first | Mental model before tools | B, D, G | `foundation-stack` |

**Practice card structure:**
```
┌── 1 ── (mono 11px copper-300) ─────────┐
│  [glyph 48×48 — animated]                │
│  SHARPEN THE AXE (display 18px)          │
│                                          │
│  Spec first; tools aligned to outcome    │
│  (serif 14px, neutral-100)               │
│                                          │
│  ⊙ Resolves: A · B · G                   │
│  (mono 10px copper-400, hidden until     │
│   step 2)                                │
└──────────────────────────────────────────┘
```
- Border: copper-300 default (brighter than H.1's copper-700 — practices are the "active partner")
- Hover: copper-200 + copper-glow
- Background: `rgba(10,10,10,0.5)` default; hover → `rgba(184,110,61,0.06)`
- Padding: 16px

**Pitfall pills (step 2):**
- 8 small pills laid out in a horizontal flex row beneath the copper rule
- Each pill: mono 11px label (e.g., "vibe coding"), padding 4px 10px, border 1px copper-700, background rgba(10,10,10,0.55)
- Width-content sized; gap 8px; wraps if needed

**Composition-level animation loop:**
- See `<DisciplineWall>` spec above
- Calm, ordered rhythm — cards light up sequentially (left-to-right, top-to-bottom), each glow ~400ms, then settle
- Cycle: ~10s for all 8 cards
- Never blocks step-reveal; always additive
- Contrast with H.1's chaos IS the message

**Step structure:**
- Step 0 (entry):
  - 8 practice cards stagger in: `delay={120 + i * 80}`
  - Glyphs start per-card loops on mount
  - `<DisciplineWall>` composition loop starts after all cards mounted (~800ms post-entry)
  - Subhead beneath headline (mono 11px copper-400): "Eight moves the craftsman uses. Same tool. New discipline."
- Step 1: All practice cards stay visible; no new content (gives presenter time to walk through practices). Optional: a subtle copper-200 flare across all 8 cards in unison (one-time, 200ms in / 800ms out) signaling "this is the catalogue — the next step shows what they fix." [Implementer can defer if too subtle.]
- Step 2: Pitfall section reveals beneath the practice grid:
  - Copper rule animates width 0→100% (delay 200ms)
  - Mono header "RESOLVES WHAT?" (copper-300, 11px) appears
  - 8 pitfall pills stagger in horizontally: `delay={400 + i * 60}`
  - Each practice card's "⊙ Resolves: A · B · G" caption appears beneath its move-line
  - Hover convention activates: hovering a practice card → its `resolves` pills glow copper-200 (200ms transition)
  - Reverse hover (pill → matching practice) is optional — implementer's call

**Hover behavior in detail:**
- Hover practice card N → card gets copper-200 + copper-glow; pills with id ∈ N.resolves glow copper-200
- Mouseleave practice card → restore default
- Optional: hover pitfall pill → all practices that resolve it glow copper-200 (reverse direction)

**Click + advance:** Wrap the entire interactive region (cards + rule + pills) in `<div data-no-advance>`.

---

### H.3 — Bridge to I (Showcase + Hook 2)

**FigLabel:** `FIG. H.3 · BRIDGE · DISCIPLINE`
**Steps:** 2 · **Canonical pose:** 1 · **Animation mode:** `step-reveal` · **Surface:** dark
**Pattern lineage:** Follows D.5 / E.11 / G.11 bridge convention.

**Hero photo:**
- File: `/heroes/h3-bridge.jpg` (NEW nanobanana generation)
- Subject: a craftsman / workshop / forge motif — bladesmith's anvil at dawn, jeweler's loupe + tools, or a master craftsman's bench at rest
- Tone: copper-warm, dignified, never AI-cyber cliché
- The image should evoke "the gap between amateur and craftsman is closeable through discipline"
- Size: full-bleed; `background-size: cover; background-position: center`

**Layered overlays (matches E.11 pattern):**
- Bottom-left vignette: `linear-gradient(to top right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 35%, rgba(10,10,10,0.0) 70%)`
- Top-left ellipse: `radial-gradient(ellipse 520px 280px at top left, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0) 100%)`
- Top-edge gloom: `linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)`

**Bottom-left anchored beats:**
- Position: `left: 48; bottom: 110; max-width: 760; gap: 24; z-index: 20`

**Beat 1** (display, 56px, neutral-50, line-height 1.05, letter-spacing -0.01em):
> "The competition is not AI."
- kw: `["not AI"]`

**Copper rule:** width 30%, delay 400ms

**Beat 2** (display italic, 40px, copper-200, line-height 1.1):
> "It's the colleague who learned the discipline first."
- kw: `["the discipline"]`

**Mono attribution** (10px, copper-400, letter-spacing 0.18em, uppercase):
> "— Section I · Showcase"

**Step structure:**
- Step 0 (entry): Hero photo + overlays + FigLabel mount instantly. Beat 1 reveals (`<Reveal on={true}>`); copper rule animates width 0→30% (delay 400ms).
- Step 1: Beat 2 reveals (`<Reveal on={showBeat2} delay={150}>`).

**Hover:** None.

**Click + advance:** Standard. No interactive zones.

**Hook 2 seeding:**
- This slide does NOT name Adri or hint at his role
- The phrase "the colleague who learned the discipline first" sets up the audience to ask "who is this guy?" — a question Section I answers
- The bridge is a question, not a name

**Implementation:** Mirror the structure of `e11-bridge-to-f.tsx` exactly — only swap the hero file, beat text, attribution, and FIG label. Component file: `src/slides/application-section-h/h3-bridge-to-i.tsx`.

---

## 3. Editorial through-line — the reframe

The "fear-of-replacement reframe" is **structural** to Section H, not a dedicated slide:

- **H.1 frames pitfalls as "amateur mistakes"**, not "AI failures." Subhead: "What untrained use looks like." The audience is implicitly past the amateur stage — they're being shown what they used to be / what they could be.
- **H.2 frames practices as "the craft"**, not "defenses against AI." Subhead: "What discipline looks like." Practices are an active capability, not a defensive shield.
- **H.3 names the reframe directly:** "The competition is not AI. It's the colleague who learned the discipline first." This dissolves replacement fear by reframing the threat — it's not the tool; it's other humans who out-disciplined them. And discipline is closeable.

This through-line means Section H NEVER says "fear" or "replacement" explicitly. The reframe lives in framing choices and the closing line — not in a labeled "fear-reframe slide" that would feel preachy.

## 4. Open questions / assumptions

1. **H.3 hero photo:** nanobanana prompt to be drafted at implementation time. Suggested motif: "bladesmith's anvil at first light, copper-warm tones, photographic, dignified, no AI/tech imagery." Alternatives: jeweler's loupe with hand tools; goldsmith's bench with works in progress; master craftsman's organized tool wall.
2. **H.2 step 1 subtle flare:** Optional one-time unison flare across all 8 practice cards as a "signal next step" cue. May be too subtle to read at projection scale. Implementer can defer or omit.
3. **H.2 reverse-direction hover (pill → practice):** Should hovering a pitfall pill highlight the practices that resolve it? Useful for audience members who think "I have THIS problem — what fixes it?" But may add visual noise. Recommendation: implement and toggle off if testing reveals it's distracting.
4. **Pitfall pill ordering on H.2:** Probably alphabetical by id (A-H) for predictability. Alternative: ordered by frequency-of-resolution (the pitfalls resolved by the most practices first). Implementer choice; recommend A-H for stability.
5. **Composition-loop timing on H.1 vs H.2:** H.1's chaos vs H.2's discipline is the contrast. If projection testing shows H.1 feels "panicky," extend the irregular timing intervals (3-5s between flares instead of 2-3s).

## 5. Acceptance

When implemented, this spec is satisfied if:
- All 3 slides render at 1280×720 without overflow
- H.1 wall: 8 pitfall cards visible at step 0; closing line at step 1; composition loop runs irregularly
- H.2 wall: 8 practice cards visible at step 0; cards present at step 1; pitfall pills appear at step 2; cross-highlight hover works
- H.3 bridge: matches D.5/E.11/G.11 visual pattern with new hero
- All hover states use universal copper-200 + copper-glow
- All clickable card containers wrapped in `data-no-advance`
- All slides registered in `src/deck/registry.tsx` after G.11 and before Section I
- Bridge slide (H.3) uses same components as `e11-bridge-to-f.tsx`
- Per-card glyphs (8 pitfall + 8 practice = 16 glyphs) all loop continuously
- The reframe NEVER explicitly names "fear" or "replacement" — it lives in framing and the H.3 closing line only

## 6. Self-review notes

- **Placeholder scan:** No TBDs in slide content. Hero-photo prompt + reverse-hover decision flagged as implementer-time, not deferred design.
- **Internal consistency:** H.1 and H.2 use mirrored grids (4×2) and mirrored card structures. Composition loops contrast in feel (chaos vs discipline) but use the same animation primitive infrastructure.
- **Scope check:** 3 slides + 2 new shared composition components + 16 new glyph kinds = focused. No further infrastructure beyond what Spec A introduced.
- **Ambiguity check:** Step structures explicit; pitfall ↔ practice resolution map fully specified; hero-photo motif described in concrete terms.
- **Reframe check:** Verified that no slide content uses "fear" or "replacement" explicitly. The H.3 closing line carries the reframe via metaphor, not explicit naming.
