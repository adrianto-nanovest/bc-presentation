import type { JSX } from "react";
import type { AnimationMode } from "./Slide";
import type { SectionKey } from "./sections";

// Shared shape for any slide registered in the deck. Each section's
// sub-spec contributes an array of these and the deck composes them
// into a single ordered registry (see src/deck/registry.ts).
//
// No longer reaches the screen: as of gh#36 no runtime chrome or navigation code
// reads it. The remaining readers are ~30 unit tests and the numbering harvest,
// which assert the field against the letter it used to print. gh#38 deletes those
// readers along with the field and this type.
export type SlideSection = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";

export interface SlideDef {
  /**
   * Stable, opaque, unique. The deck-set lists reference slides by this.
   *
   * NOT A SECTION REFERENCE. Letters inside an id are historical — the id is
   * the file's basename, frozen at the moment the file was named, and
   * `f8-your-agentic-os` renders as C.2 in the leader deck. NEVER derive
   * display text from an id: letters and numbers come from the composer
   * (./compose.ts) and from nowhere else.
   */
  id: string;
  steps: number;                       // step count fed to DeckProvider
  animationMode: AnimationMode;        // controls click bubbling per Slide.tsx
  canonicalPose: number;               // step index the export pipeline pauses at
  surface?: "dark" | "light";
  /**
   * LEGACY hardcoded display letter. The NavBar was its last RUNTIME reader and
   * as of gh#36 takes the derived letter instead, so nothing this field says can
   * reach the screen — only tests still read it. Use `sectionKey`; this field
   * cannot survive a section being reordered. gh#38 deletes it.
   */
  section: SlideSection;
  /** What narrative block this slide belongs to. The display letter is DERIVED
   *  from where the block sits in the composed deck (§3.3). */
  sectionKey: SectionKey;
  /** Default true. `false` means the slide claims no number and prints no
   *  FigLabel — the cover. */
  numbered?: boolean;
  render: () => JSX.Element;
}
