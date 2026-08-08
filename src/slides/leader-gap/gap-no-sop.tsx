// THE RULE NOBODY WROTE — §6.2, the SECOND slide of THE GAP, and the deck's FIRST of
// three passes at shadow AI.
//
// Spec §6.2 (content, and the escalation constraint it puts in the spec rather than in
// the implementer's judgement) · §4.3's leader deck table · §11's Phase 7 row. No #16
// prototype covers it, so nothing is productionized from one; the visual contract is
// settled here the way `gap-hardest-part` settled its own one slide earlier — one
// figure component (`./components/NoSopBeats.tsx`), one geometry module
// (`./no-sop-geometry.ts`), all copy in `./content.ts`.
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
// WHY THE SLIDE IS SHAPED THIS WAY. The stage is a LOPSIDED DIPTYCH: on the left, three
// things the organisation handed out, each with a small filled mark; on the right, four
// questions it never answered, each followed by an EMPTY RULE where the answer would
// have been written. The left column is deliberately a list of things done RIGHT — a
// login, a demonstration, encouragement in writing — because a column of failures would
// make the slide an accusation, and §6.2's beat is a condition. The blanks are the
// figure, they are never filled at any pose, and they are an image no other slide in
// this deck draws.
//
// 4 POSES, one argument each:
//   0 — WHAT WAS HANDED OUT. The heading and the three issued rows with their marks.
//       A complete inventory under its own heading: what a competent rollout issues.
//   1 — AND WHAT WAS NEVER WRITTEN DOWN. The second heading and the four questions,
//       each arriving WITH its empty rule on the same step — asked, and nothing
//       written. The escalation down the column is permission → prohibition →
//       arbitration → disclosure.
//   2 — THE CONDITION. One copper rule closes the diptych, and two lines say what an
//       unanswered question becomes: it still gets answered, privately, one desk at a
//       time — and none of those private rules is written where anybody else can read
//       it.
//   3 — THE FRAME. The closer, full width, last: nobody broke a rule, there was no rule
//       to break, and writing one is the leader's job.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING — the property the pose map is
// checked against rather than the pose count. Pose 0 rests on a full inventory under a
// heading that says what it is, not on a fragment of one. Pose 1's last arrival is the
// fourth question WITH its blank, so the pose never rests on a question whose empty
// answer has not landed — the pair is one beat, and a question without its blank is the
// slide's own image half-drawn. Pose 2's last arrival is the CONSEQUENCE line and not
// the condition line: a pose ending on "the question still gets answered" would rest on
// the half a room hears as resourcefulness. Pose 3's last arrival is the closer, which
// frames every band above it.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports
// print. Anything lower would export a page showing four unanswered questions with no
// sentence saying that nobody broke anything, which for this slide in particular is the
// one way it could travel badly: an exported page of unanswered questions with no
// verdict is a slide somebody can re-caption as a list of findings against a team.
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
