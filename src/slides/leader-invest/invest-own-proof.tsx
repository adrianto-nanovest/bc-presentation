// THEIR OWN PROOF — the first slide of the WHY INVEST run, and the one a Div Head
// cannot argue with.
//
// Spec §6.7 (content) · §4.4 slot 3 (the brand axis) · §4.5 (the thesis) · §12.3
// item 2 (the GEMVIS figures' standing). No #16 prototype covers this slide, so
// nothing is productionized from one — the visual contract is settled here, and
// it is settled the same way its two siblings' were: one figure component, one
// geometry module, brand variance through a typed resolver.
//
// WHY THE SLIDE IS SHAPED THIS WAY. §6.7's whole argument is that an outsider's
// case study is discountable and a leader's own company's numbers are not. So the
// slide is a LEDGER of that company's own figures — and each line carries how the
// number is known, because both columns are claims by an interested party in front
// of an audience with compliance obligations. A figure presented as audited that
// is not is the failure this slide can cause; the mark is therefore copy on every
// row, and the source line under the column is on the slide rather than in a
// footnote (§6.7 "cite attributed").
//
// 3 POSES, one argument each:
//   0 — THE PREMISE. The headline says an outsider's case study is easy to
//       discount; the mono eyebrow names whose proof the room is about to see.
//       The headline is shared and the eyebrow is not, which is what keeps the
//       shared line true under a deck that names no organisation.
//   1 — THE FIGURES. The brand's own numbers, each with what it measures and its
//       epistemic mark, plus the attribution naming who reported them and that
//       they are not independently audited.
//   2 — THE THESIS. `LEADER_THESIS_LINE`, byte-identical to the leader cover's
//       opener and to A.1's tagline (§4.5), imported rather than re-worded.
//
// `canonicalPose: 2` — the fullest pose, and the only one the PDF and PPTX exports
// print. A canonical pose of 1 would export a company's own figures with the
// sentence they are evidence FOR missing, which is the one thing a leader is
// meant to take away from the slide.
//
// THE LETTER IS NOT AUTHORED HERE. This slide composes as D.2 today — behind
// `invest-base-rates` (#57's D.1) once that lands, and behind `opening`, `gap` and
// `shape` in both leader decks. The letter is derived per deck (§3.5): `FigLabel`
// takes a label only, and what §3.4 R2 renumbers is everything BEHIND this run. No
// rendered string under `src/slides/leader-invest/` may name a letter or a number —
// the D.2 in these comments describes where the deck currently puts the slide,
// which is the one place it is safe to say so.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { ProofLedger } from "./components/ProofLedger";
import {
  investOwnProofContent as C,
  ownProofFor,
  type OwnProofBlock,
} from "./content";

// ───────────────────── slide ─────────────────────

export function InvestOwnProof({ content }: { content: OwnProofBlock }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <ProofLedger content={content} pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// Resolved ONCE, at module scope, exactly as `gap-capability-ladder.tsx`,
// `shape-agentic-org.tsx` and `title.tsx` resolve theirs and for the same reason:
// `VARIANT` resolves at module scope, so one module epoch holds one brand and the
// URL that decided it cannot change without a reload. The component below it takes
// the resolved block as a PROP and reads no variant of its own — which is what
// lets one test mount both brands' ledgers in the same epoch and prove neither
// carries a byte of the other's evidence (§4.4 slot 3).
const BRAND_CONTENT = ownProofFor(VARIANT.brand);

export const investOwnProofSlide: SlideDef = {
  id: "invest-own-proof",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestOwnProof content={BRAND_CONTENT} />,
};
