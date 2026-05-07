# Foundation Core (Section D) — Acceptance Log

Audit run: 2026-05-08
Auditor: Adri (controller-driven; visual checks pending live presenter rehearsal)

Audit method: programmatic evidence captured via grep + the existing
unit-test suite. Items requiring eyes-on (copper-italic rendering,
ambient pulse cadence felt at projection scale, etc.) are marked
`pending live audit` and will be ticked during the presenter rehearsal.

## Per-slide results

| Slide | Slot table ✓ | Keywords ✓ | FIG label ✓ | Advances ✓ | Hover ✓ | Ambient ✓ | Canonical pose ✓ | Notes |
|---|---|---|---|---|---|---|---|---|
| D.1 | ✓ (automatable) — `d1Content` defined `src/slides/foundation-core/content.ts:3`; imported `d1-the-trap.tsx:8` | pending live audit (copper-italic render) | ✓ (automatable) — `<FigLabel section="D" num={1} label="THE TRAP" />` `d1-the-trap.tsx:41` | ✓ (automatable) — `steps: 4` `d1-the-trap.tsx:136`; covered by `tests/unit/foundation-core-index.test.ts` | n/a — D.1 has no hover-reveal payloads per spec §5.1 | n/a — no ambient on D.1 | ✓ (automatable) — `canonicalPose: 3` `d1-the-trap.tsx:138` | trap callback re-pulses on D.4 (see section-wide) |
| D.2 | ✓ (automatable) — `d2Content` defined `content.ts:25`; imported `d2-the-convergence.tsx:8` | pending live audit | ✓ (automatable) — `<FigLabel section="D" num={2} label="THE CONVERGENCE" />` `d2-the-convergence.tsx:42` | ✓ (automatable) — `steps: 5` `d2-the-convergence.tsx:149`; covered by `foundation-core-index.test.ts` | ✓ (automatable) — `<HoverReveal>` wrapping each card at `d2-the-convergence.tsx:63` | n/a — no ambient on D.2 | ✓ (automatable) — `canonicalPose: 4` `d2-the-convergence.tsx:151` | SLOT_STYLE positions feed D.3 geometry rhyme |
| D.3 | ✓ (automatable) — `d3Content` defined `content.ts:112`; imported `d3-one-process-four-levels.tsx:15` (also reads `d2Content` for converged cards `:14`) | pending live audit | ✓ (automatable) — `<FigLabel section="D" num={3} label="ONE PROCESS · FOUR LEVELS" />` `d3-one-process-four-levels.tsx:85` | ✓ (automatable) — `steps: 5` `d3-one-process-four-levels.tsx:201`; covered by `foundation-core-index.test.ts` | ✓ (automatable) — `<HoverReveal>` on converged level cards `d3-one-process-four-levels.tsx:125` and on AI feeder card `:151` | n/a — no ambient on D.3 | ✓ (automatable) — `canonicalPose: 4` `d3-one-process-four-levels.tsx:203` | Geometry rhyme: SLOT_STYLE keys mirror D.2 (see section-wide) |
| D.4 | ✓ (automatable) — `d4Content` defined `content.ts:182`; imported `d4-decision-pattern.tsx:7` | pending live audit | ✓ (automatable) — `<FigLabel section="D" num={4} label="WHICH LEVEL, WHEN" />` `d4-decision-pattern.tsx:24` | ✓ (automatable) — `steps: 5` `d4-decision-pattern.tsx:48`; covered by `foundation-core-index.test.ts` | ✓ (automatable) — terminal cards wrap `<HoverReveal>` via `LadderTerminal.tsx:34` (used by `LadderRise`) | ✓ (automatable) — `<PulseGlow periodSeconds={4} intensity="subtle">` only inside `LadderLoopBack.tsx:10`, used by `LadderRise.tsx:80` (D.4 only) | ✓ (automatable) — `canonicalPose: 4` `d4-decision-pattern.tsx:50` | STOP↻ ambient pulse delivers D.1 → D.4 trap callback |
| D.5 | ✓ (automatable) — `d5Content` defined `content.ts:232`; imported `d5-bridge-to-e.tsx:6` | pending live audit | ✓ (automatable) — `<FigLabel section="D" num={5} label="THE NEXT QUESTION" />` `d5-bridge-to-e.tsx:12` | ✓ (automatable) — `steps: 3` `d5-bridge-to-e.tsx:40`; covered by `foundation-core-index.test.ts` | n/a — D.5 has no hover-reveal payloads per spec §5.5 | n/a — no ambient on D.5 | ✓ (automatable) — `canonicalPose: 2` `d5-bridge-to-e.tsx:42` | Bridge to Section E |

## Section-wide

- [x] D.1 → D.4 trap callback visible — `<PulseGlow>` is exclusive to `components/LadderLoopBack.tsx:10`; rendered in `LadderRise.tsx:80` (D.4 only). D.1 establishes the STOP↻ trap (spec §5.1); D.4 re-surfaces it as ambient. Visual cadence (4s subtle pulse) pending live audit.
- [x] D.2 → D.3 geometry rhyme lands — both slides declare a `SLOT_STYLE` map keyed on `bpm-tl`, `rpa-tr`, `ai-bc`, `ipa-c`, `agentic-r` (`d2-the-convergence.tsx:12`, `d3-one-process-four-levels.tsx:18`). Code comment at `d3:17` explicitly notes the reuse intent ("Re-use D.2's 5 slot positions for converged cards (geometry rhyme — spec §5.3)"). Percent values are tuned within ~2% per slide for visual hierarchy; the rhyme is positional, not pixel-identical. Eye-test landing pending live audit.
- [x] Total advances = 22 — proven by `tests/unit/foundation-core-index.test.ts` ("total advances per spec §6 = 22"), passing 2026-05-08.
- [x] No paid dependencies introduced — `grep -rn "@stripe\|figma" src/` returns nothing; `package.json` declares only `framer-motion ^11.18.2` and `tailwindcss ^3.4.19` (the agreed free deps) for Section D's needs.

## Open follow-ups

The following spec §9 items were deferred from implementation and are flagged for live-audit / post-rehearsal tuning:

- **73% citation lock** — D.1 stat call-out needs final source citation locked into the slot once Adri confirms the canonical study reference.
- **Copper hex ladder tuning** — the copper accent ramp on the D.4 terminal-tier altitudes may need a hex-level recalibration once seen at projection scale.
- **Projection-scale font tuning** — body copy + FIG label sizes are currently `clamp()`-driven; final pass at venue projection resolution may require a per-slide bump.
- **Q2 inversion legibility** — the Q2 NO-branch (loopback to BPM) terminal label needs a legibility pass on the projector — current contrast may read low against the copper rail.
- **D.4 connector arrows** (caught by final review, not in plan's reference impl) — spec §4.4 calls for the bottom-rail Q1→Q2 connector and upward YES-branch arrows from each Q gate to its terminal-tier card. `LadderRise` currently renders Qs + terminals + loopback as floating elements without connectors, so the staircase metaphor reads weaker than spec'd. Terminal `leftPct = 14 + fromQ * 14` (42/56/70/84%) also doesn't align with the flex rail's actual Q positions. Fix path: switch the rail to absolute-positioned Qs at known percents matching the terminal column, then add SVG connectors with `viewBox="0 0 100 100"` (same approach used to fix D.2's arrows in commit 50ab07a).
