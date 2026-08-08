// THEIR OWN PROOF — the SECOND slide of the WHY INVEST run since gh#70 put
// `invest-base-rates` in front of it, and the one a Div Head cannot argue with.
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
// THE LETTER IS NOT AUTHORED HERE, and the number HAS moved. This slide composes as
// **D.2** today — SECOND of the five slides the `invest` run now owns, behind
// `invest-base-rates` — and D.2 is also §6.7's own number for it, so the two frames this
// comment used to have to distinguish have agreed since 2026-08-08. It printed **D.1**
// from gh#56 until that day, when gh#70 landed `invest-base-rates` (§6.7's D.1) at the
// head of the run and this slide stepped one number WITH NO EDIT TO THIS FILE'S LOGIC —
// the paragraph below is the whole of what gh#70 cost here.
//
// THAT INSERT WAS NOT #57, and this sentence named the wrong ticket until 2026-08-05.
// #57 is D.3 `invest-chicken-egg`, which APPENDED BEHIND this slide (`./index.ts`,
// `src/deck/deck-sets.ts`) and moved neither this slide's letter nor its number;
// the pre-gh#70 `tests/fixtures/deck-numbering.json` recorded D.1 here and D.2 there.
// The sentence then said `invest-base-rates` "holds no ticket at all", which was true
// when it was written — §11's phase table put it in the **Phase 7** row ("Leader new
// slides, second tier"), beside `gap-no-sop`, with no issue behind it — and stopped being
// true when **gh#70** was opened and built it. #58 is D.4 and #59 is D.5, both behind D.3.
//
// A letter and a number are derived from what the deck actually holds (§3.5): `FigLabel`
// takes a label only, and what §3.4 R2 renumbers is everything BEHIND a new run — while a
// head-of-run insert like gh#70's moves no letter at all and renumbers only inside its own
// run (R3). No rendered string under `src/slides/leader-invest/` may name a letter or a
// number — a comment may, and only by saying which frame it is speaking in.
// `scripts/gh56-verify.mjs` reads the letter off the rendered page in both leader
// decks, so this sentence is measured rather than asserted.
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
