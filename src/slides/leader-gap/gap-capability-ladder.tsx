// THE CAPABILITY LADDER — the slide a leader places themselves on.
//
// Spec §6.5 (content) · §7.2 (the visual contract) · §4.4 slot 2 (the brand axis).
// Productionized from the #16 staircase prototype (variant A), which the owner
// picked on a browser walkthrough of all six #16 variants — the verdict §7.2
// records — and REWRITTEN, not lifted: the prototype is inline-styled end to
// end, untested, and interpolates its markers between tread centres, which puts
// a fractional marker in mid-air (see `./geometry.ts`).
//
// WHY THE SLIDE IS SHAPED THIS WAY. A leader who places themselves on a rung has
// self-diagnosed; a leader who is TOLD where they sit argues with the next slide.
// So the ladder is drawn before anything is on it, and the two marks that land on
// it carry different epistemic status — one is a claim with a citation, one is a
// question with its evidence. §6.5: no AI-adoption assessment data exists for
// either brand (confirmed on #8), and this slide implies none.
//
// 5 poses (§7.2), one argument each:
//   0 — THE LADDER. Five rungs and the provenance line. Nothing is placed yet,
//       which is the pose the room reads the vocabulary in.
//   1 — THE TECH FUNCTION. GEMS asserts DigiTech at ≈L3 with its source; Berau
//       states, in the same slot, that MineTech has nothing comparable. One slot,
//       two fills, never blank (#16 finding 4).
//   2 — THE OPEN QUESTION. The organisation, asked rather than placed.
//   3 — US. A small Nanovest mark at L1–L2, so the ladder is not a scoreboard.
//   4 — THE CLOSER, which names what is actually on the ladder — and therefore
//       differs per brand, because Berau's ladder carries no claim to contrast.
//
// `canonicalPose: 4` — the fullest pose, and the only one the PDF and PPTX
// exports print. A canonical pose that stopped at 3 would export a ladder whose
// closer nobody outside the room ever reads.
//
// THE LETTER IS NOT AUTHORED HERE, and this slide is the reason that rule earns
// its keep: it is the first slide of the `gap` run, so it prints B.1 today and will
// print B.5 once #55–#58 put the other four `gap` slides in front of it. Its
// arrival pushed the loop slide from E.12 to F.12 in both leader decks, and gh#54's
// `shape` run has since pushed it to G.12 — one insert each, both in front of the
// curriculum, both costing no edit to any slide behind them (§3.4 R2). `FigLabel`
// takes a label only; the letter and number come from the composed deck (§3.5).
//
// NO LEGEND, anywhere. See `./components/CapabilityLadder.tsx` for the four
// encodings that replace one.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { CapabilityLadder } from "./components/CapabilityLadder";
import {
  capabilityLadderFor,
  gapLadderContent as C,
  type LadderBrandBlock,
} from "./content";

// ───────────────────── slide ─────────────────────

export function GapCapabilityLadder({ content }: { content: LadderBrandBlock }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <CapabilityLadder content={content} pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// Resolved ONCE, at module scope, exactly as `a1-what-youve-seen.tsx` and
// `title.tsx` resolve theirs and for the same reason: `VARIANT` resolves at module
// scope, so one module epoch holds one brand and the URL that decided it cannot
// change without a reload. The component below it takes the resolved block as a
// PROP and reads no variant of its own — which is what lets one test mount both
// brands' ladders in the same epoch and compare them (§4.4 slot 2).
const BRAND_CONTENT = capabilityLadderFor(VARIANT.brand);

export const gapCapabilityLadderSlide: SlideDef = {
  id: "gap-capability-ladder",
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapCapabilityLadder content={BRAND_CONTENT} />,
};
