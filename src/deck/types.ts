import type { JSX } from "react";
import type { AnimationMode } from "./Slide";
import type { SectionKey } from "./sections";

// Shared shape for any slide registered in the deck. Each section's
// sub-spec contributes an array of these and the deck composes them
// into a single ordered registry (see src/deck/registry.ts).
//
// NO SLIDE STATES WHAT LETTER IT IS. The hardcoded `section` letter and the
// A–K union that typed it lived here until gh#38 and are gone: a display letter
// is DERIVED from where a slide's section sits in the composed deck (§3.4 R2)
// and is authored nowhere. It is still carried to the screen from there — the
// composed row, `<Slide>`, `SlideNumberContext`, `FigLabel` — but every copy
// traces back to that one derivation, so none of them can disagree.
//
// That is what lets the leader deck (gh#41) cut section F and still render
// `f8-your-agentic-os` without the slide being re-authored — and that one slide is
// the standing proof, because it has now printed THREE different figures in that
// deck while its file was never opened for any of them: F.11 when gh#41 carried it
// into the TOOLS run, G.11 once gh#53's `gap` run pushed that run a letter along,
// and C.2 since gh#54 relocated it to §4.3's own slot for it. A field asserting its
// own letter could not have survived one of those moves, let alone three.
export interface SlideDef {
  /**
   * Stable, opaque, unique. The deck-set lists reference slides by this.
   *
   * NOT A SECTION REFERENCE. Letters inside an id are historical — the id is
   * the file's basename, frozen at the moment the file was named, and
   * `f8-your-agentic-os` renders as F.8 in a standard deck and as C.2 in a
   * leader deck (gh#54), where neither the letter nor the number is the one in
   * its name. NEVER derive display text from an id: letters and numbers come
   * from the composer (./compose.ts) and from nowhere else.
   */
  id: string;
  steps: number;                       // step count fed to DeckProvider
  animationMode: AnimationMode;        // controls click bubbling per Slide.tsx
  canonicalPose: number;               // step index the export pipeline pauses at
  surface?: "dark" | "light";
  /** What narrative block this slide belongs to. The display letter is DERIVED
   *  from where the block sits in the composed deck (§3.3). */
  sectionKey: SectionKey;
  /** Default true. `false` means the slide claims no number and prints no
   *  FigLabel — the cover. */
  numbered?: boolean;
  render: () => JSX.Element;
}
