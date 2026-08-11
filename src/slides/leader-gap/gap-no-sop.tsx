// THE RULE NOBODY WROTE — §6.2, the SECOND slide of THE GAP, and the deck's FIRST of
// three passes at shadow AI.
//
// Spec §6.2 (content, and the escalation constraint it puts in the spec rather than in
// the implementer's judgement) · §4.3's leader deck table · §11's Phase 7 row. The
// visual contract: one figure component (`./components/NoSopBeats.tsx`, with its mount
// keyframes in `./components/no-sop.css`), one geometry module (`./no-sop-geometry.ts`),
// all copy in `./content.ts`.
//
// REDESIGNED 2026-08-11 BY OWNER CALL, productionized from the B.2 prototype's
// variant D ("BOXES × FRAY"; the prototype directory left the tree in the same
// change). The first cut printed §6.2 as a static diptych and ACCUMULATED three text
// bands into one dense final screen — a wall of text in front of top management. The
// redesign is B.1's grammar one slide later: ONE PERSISTENT SCENE, the figure carrying
// the argument while the presenter carries the connective prose (the two condition
// sentences left the stage with it), and every beat drawn rather than said — a step
// diagram that stops where the writing stopped, and a fray where the rules went.
//
// SHADOW AI AS A CONDITION, WHICH IS A CLAIM ABOUT THE ORGANISATION AND NOT ABOUT THE
// PEOPLE IN THE ROOM. §6.2 assigns this slide `condition`, D.3 (`invest-chicken-egg`)
// `rational behaviour` and D.4 beat 2 (`invest-security`) `exposure`, and says the
// escalation "degenerates into repetition the moment two of the three passes share an
// image or a statistic". So this stage argues one thing: the organisation handed people
// tools and never wrote the rules, and what the vacuum produces is what the next two
// passes are about. It does not say what anybody did with the tools — that is D.3's
// story — and it does not say what nobody can do about it afterwards — that is D.4's.
// `./content.ts` holds the token-by-token comparison against both, which is now a check
// against RENDERED COPY on both sides rather than against spec text: D.3 and D.4 both
// shipped before this slide, and their own blocks record the same check from the other
// direction while B.2 was still unbuilt.
//
// AND IT CARRIES NO STATISTIC AND NO DIGIT AT ALL. That is the cheapest way to hold
// "no shared statistic" and the only way to hold it as an ABSENCE that a test can
// assert — D.3's one quantity is its 30-day window, D.4's are its two index gaps, and a
// stage with no numeral on it cannot collide with either. It also keeps this pass the
// quietest of the three, which is what the escalation needs: a condition that arrived
// with a number would be making the exposure argument two slides early. Its neighbour
// `gap-hardest-part` opens the run on a quoted 70/30 figure; nothing here re-spends it,
// and none of that slide's vocabulary — procured, earned, invoice, tool access — is
// reused either.
//
// NO BRAND AXIS. The second file in this directory and the third in the leader tree to
// import no `VARIANT` at all (`gap-hardest-part` and `mandate-enablement` are the
// others). §4.4's seven brand × deckSet slots do not list this slide, and an absence of
// written guidance is nobody's local evidence: we hold no SOP inventory for either
// brand, so a `Record<Brand, …>` here would be three blocks written by inventing two of
// them. `./content.ts` argues it; the consequence worth knowing before reading the
// component is that there is no `…For(brand)` resolver to look for, and that both
// leader rooms read identical bytes.
//
// WHY THE SLIDE IS SHAPED THIS WAY. The stage is a STEP DIAGRAM UNDER TWO BANDS OF
// BOXES: three issued boxes (things done RIGHT — a login, a demonstration,
// encouragement in writing, because a row of failures would make the slide an
// accusation and §6.2's beat is a condition), four question boxes each holding the
// EMPTY RULE where its answer was never written, and below them a rollout spine that
// draws to a dot where delivery happened, stops dead at a second dot where the writing
// should have happened, and FRAYS into two dozen swaying private hairlines when the
// stage compacts. The stopped-and-frayed line plus the unfilled blanks are the figure,
// and an image no other slide in this deck draws.
//
// 4 POSES, one argument each — elements KEEP IDENTITY and morph between them:
//   0 — WHAT WAS HANDED OUT. Three hero boxes across the top; the spine draws its
//       first segment and lands one labelled dot: HANDED OUT. A complete inventory
//       under its own heading — what a competent rollout issues.
//   1 — AND WHAT WAS NEVER WRITTEN DOWN. The issued row holds; the four questions land
//       directly below it, each arriving WITH its empty rule (asked, and nothing
//       written — the pair is one face). The spine extends to a second labelled dot —
//       NEVER WRITTEN — and pings there: guidance stops here. The escalation down the
//       grid is permission → prohibition → arbitration → disclosure.
//   2 — WHAT THE SILENCE LEAVES BEHIND. Both bands compact into chip receipts, the
//       spine rises into the freed space, and the stopped line fans out — one swaying
//       hairline per improvised private rule, each ending somewhere nobody else can
//       read. Drawn, not said: the presenter speaks the condition sentences.
//   3 — THE FRAME. The fan dims to an afterimage; one dashed line marches on from the
//       second dot — the rule only the leader can write — and the closer lands under
//       it: nobody broke a rule, there was no rule to break, and writing one is the
//       leader's job.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING — the property the pose map is
// checked against rather than the pose count. Pose 0 rests on a full inventory under a
// heading that says what it is and a dot that says the delivery happened. Pose 1's
// last arrival is the fourth question WITH its blank (a question without its blank is
// the slide's own image half-drawn), and the pose ends on a line that has visibly
// STOPPED — evidence and verdict in one mark. Pose 2's fan is condition and
// consequence in one image: the question still gets answered (every strand ends
// somewhere) and none of it is readable (the ends agree on nothing). Pose 3's last
// arrival is the closer, which frames every mark above it.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports
// print. Anything lower would export a page showing four unanswered questions and a
// frayed line with no sentence saying that nobody broke anything, which for this slide
// in particular is the one way it could travel badly: an exported page of unanswered
// questions with no verdict is a slide somebody can re-caption as a list of findings
// against a team.
//
// THE LETTER IS NOT AUTHORED HERE. This slide composes as the SECOND of the `gap` run —
// B.2 in today's leader decks — and every figure behind it in the run steps by one the
// day it lands (§3.4 R2). Neither number is written down in any file under
// `src/slides/leader-gap/`: `FigLabel` takes a LABEL only and the composer derives the
// rest (§3.5).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NoSopBeats } from "./components/NoSopBeats";
import { gapNoSopContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function GapNoSop() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason every
          recent leader slide records: the content grid starts at y=156,
          `.slide-content`'s own top, and 46px would end the headline row at 128.3
          instead of 122.

          THE HEADLINE IS THE CONDITION IN ONE SENTENCE, and its second clause is the
          slide: an absence is not an argument until somebody says what filled it. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <NoSopBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision —
// see the header. Like `gap-hardest-part` next door, this file imports no `VARIANT` at
// all, which is what lets a test mount the same component under both leader brands and
// prove the two rooms read identical bytes.
export const gapNoSopSlide: SlideDef = {
  id: "gap-no-sop",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapNoSop />,
};
