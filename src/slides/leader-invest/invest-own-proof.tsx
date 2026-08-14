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
// slide is a LEDGER of that company's own figures, drawn as a DOSSIER: the owner on
// the left, a wire from the owner to every figure, and each figure joined by a dotted
// leader to how it is KNOWN. Both brands' figures are claims by an interested party in
// front of an audience with compliance obligations. A figure presented as audited that
// is not is the failure this slide can cause; the mark is therefore copy on every
// card, and the source line under the dossier is on the slide rather than in a
// footnote (§6.7 "cite attributed").
//
// ═══ REWORKED 2026-08-14, ON THE OWNER'S CALL, AND THIS PARAGRAPH IS THE RECORD OF WHAT
// MOVED. Five faults, every one of them visible from the back of a room:
//
//   1. THE STAGE WAS EMPTY. Four lines of type down the left third, a chip at the right
//      margin of each, and 800px of black between them. Every fact was on the slide and
//      the picture made none of the argument. It is a DOSSIER now — a source plate, a
//      wiring harness, and one card per figure — and `./components/ProofLedger.tsx`
//      argues the drawing.
//   2. THE FIRST CLICK SHOWED NOTHING. Pose 0 was a headline and an eyebrow, which meant
//      the room sat in front of a title and an empty stage while the presenter clicked.
//      TWO POSES NOW (`./own-proof-walk.ts`): the whole dossier, then the thesis.
//   3. THE BODY'S OWN TITLE SAT ON THE HEADLINE. The mono eyebrow hung at y=134, 12px
//      under a 40px display line, so the two read as one wrapped line. It is not a
//      free-standing line any more — it is the source plate's subject — and nothing at
//      all is painted between y=122 and y=160.
//   4. THE THESIS WAS THE LOUDEST THING ON THE STAGE. 26px at y=556, over the evidence it
//      prices. It is 19px at y=590 now, which is D.1's own size and shelf to the pixel.
//   5. THE TITLE WAS UNREADABLE COPY. "An outsider's case study is easy to discount."
//      `./content.ts` carries the reword and the argument for it.
//
// ═══ 2 POSES:
//   0 — THE DOSSIER. Whose proof it is, wired to every figure, what each figure measures,
//       how each one is known, and the citation under all of it — built over ≈1.3s inside
//       the one pose. A room reads a set of figures the way it reads a table: all at
//       once, then listens.
//   1 — THE THESIS. `LEADER_THESIS_LINE`, byte-identical to the leader cover's opener and
//       to A.1's tagline (§4.5), imported rather than re-worded. It keeps a pose of its
//       own because it is not part of the evidence: it is what the room is asked to
//       conclude from it.
//
// `canonicalPose: THESIS_POSE` — the fullest pose, and the only one the PDF and PPTX
// exports print. IMPORTED AND NOT TYPED, for the same reason `steps` is: a third pose
// would move it, and a literal would silently pin the export to a page whose last
// sentence is missing. Pose 0 exports a company's own figures with the sentence they are
// evidence FOR missing, which is the one thing a leader is meant to take away.
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
// `scripts/d2-figure-verify.mjs` reads the letter off the rendered page in both leader
// decks, so this sentence is measured rather than asserted. (It was gh#56's harness that
// did until the 2026-08-14 redraw retired it — that script measured a four-row text column
// this slide no longer draws, and the successor carries its letter check over verbatim.)
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
import { STEP_COUNT, THESIS_POSE } from "./own-proof-walk";

// ───────────────────── slide ─────────────────────

export function InvestOwnProof({ content }: { content: OwnProofBlock }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, the call every slide in this
          directory records: a one-line 40px headline ends the row at y=122, and 46 would
          end it at 128.3.

          THE HEADLINE NOW HAS ITS OWN AIR, which is fault 3 above. The shipped stage hung
          a mono eyebrow at y=134 — 12px under the display face — so a headline, a second
          title and the first figure arrived inside 60px of each other. The eyebrow is the
          source plate's own subject now and band 1 starts at 160, which leaves 38px
          between the headline and anything else: the same air `leader-shape`'s C.4 cut
          for the same complaint on the same day. */}
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
  // TWO, IMPORTED AND NOT TYPED. `STEP_COUNT` is `THESIS_POSE + 1` — the dossier, then the
  // sentence — and it was THREE until the 2026-08-14 rework. It stays imported rather than
  // written out now that the number is small: a literal `2` is how a third pose becomes one
  // the deck can never reach (`DeckContext` clamps at `steps - 1`), with no error, no blank
  // slide and no failing test.
  steps: STEP_COUNT,
  // The last pose, imported for the same reason — see the header on why the export may not
  // pause on the evidence alone.
  canonicalPose: THESIS_POSE,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestOwnProof content={BRAND_CONTENT} />,
};
