# Process & Design-System Meta — Spec

**Project:** Berau Coal Energy AI Workshop (Vol 2, Session 2)
**Author:** Adri (Nanovest BU, Sinarmas Mining Group)
**Status:** Approved 2026-05-06
**Source:** in-context brainstorm 2026-05-06; research outputs in `docs/researches/`

## 0. Scope

This spec covers ONLY the **meta-layer decisions** governing the entire workshop-deck project:

- Process discipline (multi-spec, multi-brainstorm cadence)
- Skill stack (which Claude Code skills drive implementation)
- Interaction model (keyboard, mouse, animation modes)
- Aesthetic direction (design-system base, accent palette)
- Typography
- Component substrate (libraries, frameworks)
- Foundational section structure (deck skeleton)
- Content principles (tone, framing rules)

Explicitly NOT in scope (each gets its own brainstorm + spec downstream):

- Slide-level content + narrative arc
- Practice-lab curriculum
- Per-slide animation timing + canonical-pose specifications
- Final accent-stop hex ladder (settled at implementation, refined via projection testing)
- Bahasa Indonesia coverage decision (see §12)

## 1. Project context

Adri (Nanovest BU, Sinarmas Mining Group) is the primary facilitator for an AI workshop delivered to ~400 Berau Coal Energy (BCE) members. Format: **120-min presentation + Q&A**, plus **120-min practice lab**. Delivered in-person.

He was selected after an earlier HR Group "agentic organization" presentation that the BCE PIC liked. He brings Vol-2 / Session-2 — Vol-1 was a separate facilitator; Vol-2 / Session-1 features Vol-1 winners (whose materials BCE PIC will provide later for use in Hook 1).

Audience: mining-industry professionals (engineers using AutoCAD/Surpac/Minescape + general office staff on Google Workspace). NOT AI-native. BCE management's stated demand: tangible prototype outputs from attendees, not mindset content alone.

Practice will primarily focus on **Claude** (committee provides accounts), with brief mention of OpenAI. Google Workspace AI also covered (BCE's daily reality).

## 2. Private context — NEVER in any deliverable

Load-bearing for every design decision; **must NEVER appear** on slides, in speaker notes, in distributed materials, or be spoken aloud during delivery:

> BCE is in rough times and may be sunset (coal-pollution pressure on the industry). Sinarmas Group owner plans to redeploy BCE talent — to other BUs in the group or to a new renewables venture. Adri's actual responsibility for this workshop is to ensure attendees are **READY TO MOVE** with AI-fluency as the universal adaptability multiplier. Wherever they land, AI is their portable capability.

This shapes:

- **Tone:** dignity + forward motion; empowering; never patronizing
- **Content frame:** GENERIC + TRANSFERABLE in body; mining-specific only in concentrated hook moments
- **Practice-lab outputs:** portable artifacts (prompt templates, Claude Skills, NotebookLM workbooks, Cowork routines) — things attendees take anywhere
- **Adoption section:** INDIVIDUAL track first, never org track
- **Mindset throughline:** *"AI is the bridge from where you are to wherever you need to be"*

The audience must never be told they are being prepared for transition. The deck radiates this purpose without naming it.

## 3. Process discipline

### 3.1 Multi-spec cadence

The project decomposes into four loosely-coupled sub-projects, each with its own brainstorm → spec → implementation-plan cycle:

1. **Research** — complete (14 agent outputs in `docs/researches/`)
2. **Process & design-system meta** — this spec
3. **Slide structure + content** — future
4. **Practice-lab curriculum** — future

Each sub-project's spec consumes the prior sub-project's outputs without re-litigating. This spec locks the *substrate*; downstream brainstorms decide *what to put inside it*.

### 3.2 Research-first principle (recursively applied)

Before any design or content decision, dispatch parallel research agents (Haiku, write-to-file) to gather inputs. Already applied to BCE-topic research, internal-deck extraction, and design-system meta. Will apply again before slide-content brainstorm and lab-curriculum brainstorm.

### 3.3 Workspace conventions

| Artifact | Location |
|----------|----------|
| Specs | `docs/specs/YYYY-MM-DD-<topic>.md` |
| Plans | `docs/plans/YYYY-MM-DD-<topic>.md` |
| Research outputs | `docs/researches/<slug>.md` |
| Brainstorm artifacts | in-context only (not transcribed unless requested) |
| Cross-session memory | `~/.claude/projects/.../memory/` |

## 4. Skill stack

| Role | Skill | Why |
|------|-------|-----|
| Primary deck | `frontend-slides` | Purpose-built for HTML presentations; built-in PDF export pipeline; anti-AI-slop curated presets; viewport safety for projection |
| Lab demos + complex in-slide interactive components | `huashu-design` | Native interactive prototype kit; tweaks system for live A/B parameter switching; ships with Source Serif 4 default (matches our typography) |
| Final polish + QA pass before rehearsal | `impeccable` | Frontend critique + iteration; runs as the last gate |
| Image generation | nanobanana MCP | High-quality image gen including text-in-image; used for hero photography, section dividers, illustrative infographics |

Excluded:
- `frontend-design` (Claude Official) — too generic, not presentation-purposed
- Pre-styled component frameworks (Material UI, Chakra UI) — fight bespoke design

### 4.1 Export pipeline

- **Primary delivery:** interactive HTML, live, in-browser
- **Secondary:** PDF — Playwright print pipeline (frontend-slides built-in)
- **Tertiary:** PPTX — **screenshot-stitched** via Playwright capture + image-to-PPTX assembly (pattern from `codex-exploration/`). Static, not editable. Adoption rationale: trades PPTX-fidelity for animation-fidelity in the primary mode

Each animated slide MUST declare a **canonical screenshot pose** — the moment in its animation timeline that gets captured for PDF/PPTX rendering. This is part of the slide-level spec, not this meta-spec.

## 5. Interaction model

### 5.1 Navigation contract (keyboard, every slide)

- `←` previous slide
- `→` next slide
- `Space` next animation step within the current slide

### 5.2 In-slide interaction contract (mouse, opt-in per slide)

Mouse interaction is reserved for **showcase-modern slides** that benefit from manipulation:

- Sliders that drive visualization changes
- Buttons that trigger popups / detail-overlays
- Comparators (e.g., "prompt only" vs. "prompt + context" toggles)
- Embedded mini-demos (interactive fragments of the practice lab)

Slides without mouse interaction MUST NOT consume click events on stage (avoids accidental advances when the speaker gestures).

### 5.3 Animation modes (each slide declares one or a combination)

| Mode | Description | Typical use |
|------|-------------|-------------|
| Interactive | Click/drag-driven content manipulation | Showcase slides; in-slide demos |
| Looping ambient | Runs continuously, no trigger | Hero slides; section dividers; timeline-chart |
| Step-reveal | `Space`-driven progressive build | Diagrams; layered concepts (e.g., prompt/context/harness Russian doll) |
| Static | No animation | Image-led slides; hook moments |

Most slides will be step-reveal or static. Interactive is reserved for moments where in-slide manipulation IS the content.

### 5.4 Logical advances vs. slide count

Because `Space` advances animation steps within a slide, total timing planning uses **logical advances**, not slide count. A 60-slide deck with 3-step reveals each is ~180 logical advances. With Q&A excluded, plan ~30–35 seconds per advance for the 90–100 minutes of pure delivery (≈170–200 advances). This is a planning constant for downstream slide-content brainstorm.

## 6. Aesthetic direction — D-hybrid

### 6.1 Philosophy

**Primitives + restraint** over framework + opinion. The deck is composed from atomic primitives we own; we never adopt a framework's defaults wholesale.

### 6.2 Structural skeleton (from IBM Carbon)

- Single accent color (no multi-hue palettes)
- 4px spacing grid
- 0px corner radius (flat minimalism)
- Typographic restraint (3 weights max)
- Single shadow recipe used consistently (never variety)

### 6.3 Hero discipline (from Apple)

Photography-anchored hero treatment for:

- Title slide
- Section dividers (between A↔B, B↔C, etc.)
- Hook 1 (BCE Vol-1 Winner)
- Section I (Showcase + Hook 2)

Generated via nanobanana MCP; no stock photography.

### 6.4 Dark-primary inversion

Default surface: **dark** (matte near-black, not pure `#000`). Light surfaces only on content-dense informational slides. Inverts Carbon's light-default to address auditorium projection wash-out risk.

### 6.5 Color palette

- **Primary accent:** deep copper `#b86e3d`
- **Accent stops:** ~9–11 stops on the same hue family (Tailwind-style: `copper-50` through `copper-950`)
- **Neutrals:** pure grayscale (white through black)
- **Semantic uses** (state / emphasis / interactive affordance / category coding): all derived from copper-hue stops + saturation; never new hues
- No gradients; no decorative color

Final hex ladder is settled at implementation and refined via real-slide projection testing.

### 6.6 Tone

Dignity + forward motion + editorial seriousness. Empowering. Never playful, never patronizing, never consumer-luxury, never tech-bro.

## 7. Typography

All free / open-source. No commercial licenses.

| Role | Font | Source |
|------|------|--------|
| Display / headline | **Instrument Serif** (alt: Newsreader Display) | Google Fonts |
| Body | **Source Serif 4**, Georgia fallback | Google Fonts; matches `huashu-design` `--serif-en` default |
| Sans companion (UI labels, captions, code, state indicators) | **Inter** or **IBM Plex Sans** | Google Fonts |
| Mono (code blocks, inline code) | **JetBrains Mono** or **IBM Plex Mono** | Google Fonts |

### 7.1 CSS token contract (declared up-front)

```css
--serif-en: "Source Serif 4", Georgia, serif;
--serif-id: "Source Serif 4", Georgia, serif;  /* may diverge for Bahasa diacritics */
--serif-display: "Instrument Serif", Georgia, serif;
--sans: "Inter", system-ui, sans-serif;
--mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
```

### 7.2 Projection-scale calibration

Serif body type at projection scale needs LARGER sizes and MORE generous line-height than typical web design:

- Body: 36–44px+ at projected scale
- Line-height: 1.5–1.7
- Forces editorial restraint: fewer words per slide, more deliberate composition

## 8. Component substrate

### 8.1 Base stack (committed)

- **shadcn UI** — copy-paste pattern of Radix Primitives + Tailwind classes; each component file lives in our repo
- **Tailwind CSS** — design tokens (colors, spacing, type scale)
- **Framer Motion** — all motion (page transitions, in-slide reveals, interactive comparators, looping ambient animations)

All MIT-licensed / free / no commercial dependencies.

### 8.2 Optional add-ons (declared, deferred until content demands them — all free)

| Add-on | Trigger to introduce |
|--------|---------------------|
| Recharts or Visx | A data-viz slide is specified |
| Lenis | A long-format / smooth-scroll slide is specified |
| TipTap | An in-place editable text demo is specified |
| Motion One | If Framer Motion proves too heavy (unlikely) |

### 8.3 Hard constraint

NO paid components, libraries, or fonts ever. Free-first matches `huashu-design`'s ecosystem. If a need arises that no free option covers, surface it as a constraint — never quietly escalate to paid.

## 9. Section structure

Foundational. Slide-level content is a downstream spec.

| # | Section | Purpose | Notes |
|---|---------|---------|-------|
| Title | Title slide | Workshop name, date, audience; **small bottom-corner attribution `Adri • Nanovest`** | No dedicated speaker-intro slide. Verbal intro during Hook 1 setup. |
| **A** | **Hook 1: BCE Vol-1 Winner** | Celebrate the winner; raise the ceiling: *"They achieved A — imagine combining what they did with the foundation we'll build today"* | Content TBD; BCE PIC delivers winner materials. **Slot designed**: 4–6 slides, before/after framing, optional interactive comparator, photography-anchored. Never "they were naive, here's how to do it right." |
| B | AI evolution + landscape | The "B" Hook 1 gestures toward — what's possible right now | Use Indonesia 92%-adoption stat as relevance anchor; "79% say adopted, 11% in production, 40% risk cancellation by 2027" as inverse hook |
| C | Mindset | AI as bridge / multiplier / portable adaptability | Throughline: *"AI is the bridge from where you are to wherever you need to be"* — never named as transition |
| D | Process improvement | BPM / RPA / IPA / agentic | Use *"73% of automation projects fail because broken processes get automated unchanged"* as fix-the-spec hook |
| E | Engineering fundamentals | Prompt / context / harness (Russian doll) | Step-reveal animation builds the layers piece by piece |
| F | Techniques | MCP / RAG / skills / agent orchestration | Plain-language framing; each technique gets a non-engineer-graspable example |
| G | Tools ecosystem | Claude (deep) / Google (deep) / OpenAI (brief) | Capability matrix slide; decision-tree slide; NotebookLM emphasized |
| H | Pitfalls + best practices | Catalog + answers; fear-of-replacement reframe | Pair pitfalls with practices that solve them |
| **I** | **Showcase + Hook 2: Adri's solo-with-AI work** | The reveal: *"I'm a TPM, not an engineer. No formal AI training. 1 year, autodidact. Here's what I built."* | Content TBD; Adri assembles portfolio. **Slot designed**: 4–8 slides, gallery-style with 1–2 demo deep-dives. Frame: celebrate-the-work, not humblebrag. |
| J | How to start adopting | INDIVIDUAL track first; "wherever you go, you carry this" | Concrete first-week / first-month / first-quarter actions |
| K | Practice-lab teaser / handoff | Bridges to lab; sets expectations for tangible-prototype output | |

### 9.1 Hook architecture (locked)

- **Hook 1 — early** (Section A, immediately after title): celebrates BCE Vol-1 winner; earns relevance before speaker credibility is established.
- **Hook 2 — late** (Section I, near end): reveals Adri's TPM-not-engineer profile + portfolio. **Mystery → reveal arc.** The deck's quality has been the credibility proof for ~90 minutes; the reveal weaponizes that proof against attendee excuses.
- **Title-slide attribution only** (small footer): name + Nanovest. Verbal self-intro during Hook 1 setup. No dedicated intro slide.
- **Foundation contingency:** late Hook 2 only works if Sections B–H are self-evidently strong. The downstream content brainstorm commits to a high quality bar accordingly.

## 10. Content principles

1. **Generic body, concentrated hooks.** Body content (B–H, J) uses broadly-relatable knowledge-work examples (document review, scheduling, drafting, decision support) — NOT mining-specific. Hook 1 and Hook 2 are the only mining + Adri-specific moments.
2. **Empowering tone.** Audience is talented professionals (private context: in transition). Tone radiates dignity + forward motion. Patronizing or playful framing is off the table.
3. **Deck answers itself.** Every micro-design choice — animation richness, generated imagery, interactive demos — is *content* that proves AI capability. The deck *is* the credential.
4. **Free-first stack.** No paid libraries, components, or fonts. If a need surfaces that free options can't cover, flag it — don't silently escalate.
5. **Hidden context never surfaces.** BCE transition mission is load-bearing internally and invisible externally. Never on slide / speaker notes / spoken aloud.
6. **TBD slots are designed, not deferred.** Hook 1 and Hook 2 have their slot SHAPES locked here — number of slides, animation mode, narrative beats — even though content fills in later.

## 11. Risks + mitigations

| Risk | Mitigation |
|------|-----------|
| Audience disengages during foundation chapters before Hook 2 reveal | Foundation chapters held to high quality bar; Hook 1 establishes relevance early; interactive showcase slides interspersed in B–H to maintain attention |
| Auditorium projection washes out the design | Dark-primary inversion adopted; final hex ladder validated via real-slide projection testing during implementation |
| Generated images via nanobanana feel inconsistent across slides | Codify a prompt-template + style-token convention during slide-content spec (NOT in this meta-spec) |
| pptxgenjs continuity expectation from prior Adri decks | Acknowledge upfront: this deck is intentionally a step-up in design sophistication, breaking visual continuity with HR Group / Townhall AISC / SDLC decks |
| Showcase content for Hook 2 is sparse when assembly time comes | Adri begins assembling portfolio inventory in parallel with downstream specs (action item, not in spec body) |

## 12. Open questions - ANSWERED

1. **Bahasa coverage.** Fully English / fully Bahasa / bilingual (English deck with Bahasa key terms + quotes)? Affects type tokens (`--serif-id` may diverge), pacing (reading-time differs), and hook framing. Answer : FULLY ENGLISH
2. **Sinarmas Group brand reference.** No constraint enforced (per Q4-i), but: any single corporate-identity gesture worth honoring (e.g., a quiet nod on title slide) should be raised now rather than retrofit. Answer : NO CONSTRAINT, NO NEED FOR BRAND REFERENCE
3. **Workshop date.** Not yet known — sets the calendar for downstream specs and implementation plans. Answer: 18-21 May (Berau Site), 26 May (JKT), 2-5 June (Berau Site), and one more day in JKT

## 13. Acceptance — locked decisions

Approved by Adri (locked 2026-05-06). Downstream brainstorms must consume this spec without re-litigating:

- Skill stack (frontend-slides + huashu-design + impeccable; PPTX screenshot-stitched; nanobanana for image gen)
- Interaction model (keyboard nav, mouse opt-in, four animation modes)
- Aesthetic direction (D-hybrid: Carbon structure + Apple hero + dark-primary)
- Accent palette (deep copper `#b86e3d`, single-hue derived stops + grayscale)
- Typography (free Anthropic-adjacent: Source Serif 4 + Instrument Serif + Inter)
- Component substrate (shadcn + Tailwind + Framer Motion; free-only constraint)
- Section structure (Title + A through K; Hook 1 early, Hook 2 + Showcase late)
- Content principles (generic body + concentrated hooks; empowering tone; deck-answers-itself)

Next step: invoke `writing-plans` skill to produce the implementation plan for whichever sub-project Adri wants to tackle first (likely: design-system implementation — porting the design tokens, building the slide-template architecture, validating the export pipeline).
