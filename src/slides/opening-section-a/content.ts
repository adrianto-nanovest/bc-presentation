// Opening arc — Title + Section A content. Single source of truth for all
// text strings + keyword arrays used by the Title slide and A.1.
//
// Conventions match the rest of the deck (see ../foundation-core/content.ts):
//   - Plain strings only — no inline <em> tags.
//   - A sibling `*Kw` / `kw` array carries substrings that should render with
//     KeywordHighlight (copper-400 italic) at the slide level.
//   - 1–3 keywords per chunk (feedback_keyword_highlighting.md).

import type { DeckSetId } from "@/deck-variants";
import type { SectionRef } from "@/deck/sections";

// ─── Title ─────────────────────────────────────────────────────────────────

export interface TitleContent {
  displayHeadline: string;
  displayHeadlineKw: readonly string[];
  /** Editorial tagline sitting directly below the headline. */
  tagline: string;
  taglineKw: readonly string[];
  /** Bottom-left credit chip — facilitator name + org, single line. */
  facilitator: string;
  heroSrc: string;
  heroAlt: string;
  darkenStrength: number;
}

export const titleContent: TitleContent = {
  displayHeadline: "From AI Curiosity to AI Capability",
  displayHeadlineKw: [],
  tagline:
    "A working session on the AI stack, the mindset shift, and the new operator role — for everyone, not just engineers.",
  taglineKw: ["mindset shift", "operator role"],
  facilitator: "Adrianto Tedjokusumo · Nanovest",
  heroSrc: "/heroes/title-data-topology.jpg",
  heroAlt: "Abstract copper threads converging in deep space",
  darkenStrength: 0.18,
};

// ─── The leader thesis, as three constants — spec §4.5 ─────────────────────
//
// One sentence runs through the whole leader deck: *a few people, or one team,
// already proved it — imagine it distributed across the whole org.* THREE slides
// carry it (§4.5) — this module's leader cover, this module's leader A.1 delta,
// and `invest-own-proof` in `src/slides/leader-invest/` — and a leader hearing
// three phrasings of one thesis hears three claims.
//
// SO IT IS A CONSTANT AND NOT A REVIEW NOTE. Until gh#56 the identity was a
// comment asking three authors to keep three literals in step; two of them were
// already different strings, and nothing failed when they drifted. Now the shared
// words exist ONCE and the carriers are composed from them, so a reword reaches
// all three or fails to compile.
//
// WHY THEY LIVE IN THE OPENING SECTION'S MODULE, and not in a new shared one:
// THE COVER AUTHORED THE LINE (gh#42, owner-approved and pinned literally in
// `tests/unit/title-copy.test.tsx`), and the other two QUOTE it. A `src/copy/`
// module for one sentence would put the authored copy one import further from the
// slide that owns it and give the deck a second place where cross-slide strings
// live. `invest-own-proof` imports these three names and re-authors nothing.
//
// THE COVER ELABORATES PAST THE SHARED LINE, BY DESIGN. §4.5 gives the cover
// three more jobs after the opener — what an agentic organization IS, what it
// COSTS, and what only a leader can AUTHORIZE — so it is built from
// `LEADER_THESIS_OPENER` and NOT from `LEADER_THESIS_LINE`. A.1 and
// `invest-own-proof` print the whole line, which is why the opener is the piece
// that is shared three ways and the line is the piece that is shared two.

/** The sentence all three carriers open on, ending in its full stop so a caller
 *  concatenates rather than punctuates. */
export const LEADER_THESIS_OPENER = "A few people proved it.";

/** The thesis in full — A.1's tagline and `invest-own-proof`'s closer, byte for
 *  byte, because they ARE this string. */
export const LEADER_THESIS_LINE = `${LEADER_THESIS_OPENER} Now imagine it across the whole org.`;

/** The two highlights that line carries. Shared with the string, so a carrier
 *  cannot print the thesis and emphasise something else in it. */
export const LEADER_THESIS_LINE_KW = ["A few people proved it", "across the whole org"] as const;

// ─── Title (leader deck sets) — spec §4.5 ──────────────────────────────────
//
// The standard headline promises INDIVIDUAL capability, and the leader deck then
// delivers an investment case — so on a leader deck the cover contradicts the
// argument behind it (gh#42).
//
// The tagline does the three jobs §4.5 names, in that order: what an agentic
// organization IS (every team directing AI), what it COSTS (seats and protected
// hours), and what only a leader can AUTHORIZE (the mandate). It opens on
// `LEADER_THESIS_OPENER` above — the thesis that runs through the whole leader
// deck — and then says those three things, which is the elaboration §4.5 asks the
// COVER for and asks no other carrier for.
//
// THE OPENER IS COMPOSED IN, NOT RETYPED. What changed on gh#56 is that its first
// sentence is the same value A.1 and `invest-own-proof` print, so the three cannot
// drift apart one edit at a time.
//
// BOTH STRINGS WERE RE-AUTHORED ON OWNER REVIEW (2026-08-05), and this is a
// DEVIATION FROM §4.5's LITERAL WORDING, recorded here because the spec still
// quotes the old headline:
//
//   - HEADLINE. §4.5's "From a Few People to the Whole Organization" said the
//     right thing at the wrong volume: 43 characters of 84px display serif, two
//     lines of it, and no verb — a description of the deck rather than a cover.
//     "Scale What Already Works" is the same argument as an INSTRUCTION, and it
//     hands the proof to the tagline underneath, which is where the evidence
//     belongs. The word `agentic` leaves the cover with it, and does not go
//     missing: A.1's second movement question names it one slide later.
//   - TAGLINE. It ran 185 characters — THREE lines at 24px inside `maxWidth: 680`
//     — and the owner capped it at two. It is 116 now and keeps all three jobs;
//     what went is the "that proof at scale" restatement of the opener and the
//     "not just using it" half of the definition, both of which spent a line
//     saying a thing the sentence had already said.
//
// SPREAD BY VALUE, not by re-authoring: the hero, the facilitator credit and the
// darken strength are IDENTICAL for all five variants (§1.5), so a spread means
// there is one place to change them and no per-deck-set copy to drift.
const leaderTitleContent: TitleContent = {
  ...titleContent,
  displayHeadline: "Scale What Already Works",
  displayHeadlineKw: [],
  // TWO LINES AT 24px, MEASURED — not estimated: `title.tsx` sets `maxWidth: 680`
  // and the italic serif runs ~60 characters to the line there, so the ceiling is
  // about 120 characters and a reword has to be counted, not eyeballed. Verified
  // rendered at 1280×720 in both leader variants.
  tagline:
    `${LEADER_THESIS_OPENER} Every team directing AI — that takes seats, ` +
    "protected hours, and a mandate only you can give.",
  taglineKw: ["Every team directing AI", "only you can give"],
};

/**
 * Title copy by deck set — the ONE thing about the cover that a leader audience
 * changes.
 *
 * A `Record` keyed by `DeckSetId`, exactly as the brand alternates are keyed by
 * `Brand` (`BRAND_ALTERNATE_IDS` in `@/deck/slots`): a third deck set fails to
 * compile here rather than silently serving the standard cover. §4.1 keeps
 * `sectionOverrides` to composition facts for the same reason — a generic
 * override bag would be untyped by construction and the compiler would stop
 * helping.
 *
 * BRAND IS NOT AN AXIS HERE. Both brands share the leader cover; brand identity
 * already arrives through the workshop chip, which `variantLabel` suffixes with
 * `· Leadership`.
 */
const TITLE_CONTENT_BY_DECK_SET: Record<DeckSetId, TitleContent> = {
  standard: titleContent,
  leader: leaderTitleContent,
};

/** The cover copy this deck set serves. Pass `VARIANT.deckSet`. */
export function titleContentFor(deckSet: DeckSetId): TitleContent {
  return TITLE_CONTENT_BY_DECK_SET[deckSet];
}

// The workshop chip is NOT authored here: it is the brand label plus the deck
// set's label suffix, derived by `variantLabel` in src/deck-variants.ts. Once
// gh#23 puts the login eyebrow on that same call, the two cannot drift apart.

// ─── A.1 (berau) — "Five capabilities, five questions" ─────────────────────

export type A1IconName =
  | "MessageSquare"
  | "FileText"
  | "ScanSearch"
  | "Sparkles"
  | "Map"
  | "PenLine"
  // GEMS chips name products, so their icons name the thing the product acts
  // on — a camera, a truck, a signed document (gh#25).
  | "Camera"
  | "Truck"
  | "FileSignature";

export interface A1Capability {
  label: string;
  iconName: A1IconName;
  description: string;
  descriptionKw: readonly string[];
}

export interface A1Question {
  text: string;
  kw: readonly string[];
  /** WHAT the row points at, never WHERE that sits (§3.6). The rendered
   *  "SECTION F · TECHNIQUES" is composed from these keys by
   *  `sectionPointerLabel`: the letter comes from the composed deck and the
   *  name from `SECTION_NAMES`. A literal letter here would be a lie in the
   *  leader deck, where `process` resolves to G, not D.
   *
   *  A LIST, because one row may span a run of sections and print
   *  "SECTIONS E–J · …" — and a NON-EMPTY one, because a row pointing at no
   *  section has nothing to name. The leading "→ " arrow is rendered by the
   *  card component, not stored here.
   *
   *  `SectionRef.name` overrides the printed NAME and never the letters, and
   *  exactly one row uses it (the leader curriculum row below). */
  sectionRef: SectionRef;
}

export interface A1Content {
  figLabel: string;
  slideTitle: string;
  slideTitleKw: readonly string[];
  tagline: string;
  taglineKw: readonly string[];
  /** Step-0 centered rule-header above the chip strip. */
  ruleHeader: string;
  /** Step-1 left column heading (above the capability cards). */
  leftHeading: string;
  /** Step-1 right column heading (above the question cards). */
  rightHeading: string;
  capabilities: readonly A1Capability[];
  questions: readonly A1Question[];
  footerCaption: string;
  footerCaptionKw: readonly string[];
}

export const a1Content: A1Content = {
  // THE LABEL NAMES THE FIGURE, THE TITLE MAKES THE CLAIM — and neither says the
  // other's words. Until now the label read WHAT YOU'VE ALREADY SEEN over a title
  // reading *The capabilities you brought to the room*, which is one sentence
  // printed twice in two registers; the owner read them side by side and called
  // it duplication. The label is now what the figure IS (five capabilities on the
  // left, five questions on the right — the same two columns `leftHeading` and
  // `rightHeading` name), which is the register every other fig label in the deck
  // uses: THE CAPABILITY LADDER, MODELS BY CATEGORY, THE AGENTIC ORGANIZATION.
  figLabel: "FIVE CAPABILITIES, FIVE QUESTIONS",
  // NOT "you brought": the same string is the BRAND half of berau-leader's A.1
  // (§4.4 slot 1), and a Div Head did not personally carry anything into Session 1.
  // *In your hands* is true of both audiences — the room's own people did it.
  slideTitle: "The AI already in your hands.",
  slideTitleKw: ["already in your hands"],
  // THE FIRST CLAUSE IS WHAT MOVED, and the hand-off into the right column did
  // NOT (owner call, 2026-08-05). "What you saw is real" asserted a negative
  // nobody in the room doubted and named no one; berau's whole hook is SOCIAL
  // PROOF — their own colleagues built the Session-1 work behind these five
  // capabilities — so the clause now says WHO, which is the fact that makes the
  // questions after it land as *ours to answer* rather than *someone's to sell*.
  tagline: "Your own people built that. And it opens some questions.",
  taglineKw: ["Your own people", "questions"],
  ruleHeader: "Capabilities Covered",
  leftHeading: "Five capabilities",
  rightHeading: "Questions we'll answer",
  capabilities: [
    {
      label: "AI CHATBOT",
      iconName: "MessageSquare",
      description: "Conversational interfaces that answer, ask back, and follow up.",
      descriptionKw: ["ask back"],
    },
    {
      label: "SUMMARIZATION",
      iconName: "FileText",
      description: "Distilling long content into the parts that actually matter.",
      descriptionKw: ["actually matter"],
    },
    {
      label: "DOCUMENT ANALYSIS",
      iconName: "ScanSearch",
      description: "Reading, parsing, and reasoning over files and forms.",
      descriptionKw: ["reasoning"],
    },
    {
      label: "PROMPT ENGINEERING",
      iconName: "Sparkles",
      description: "Shaping the question so the model gives back what you need.",
      descriptionKw: ["Shaping the question"],
    },
    {
      label: "GEOSPATIAL AI",
      iconName: "Map",
      description: "Layering intelligence over maps, locations, and physical sites.",
      descriptionKw: ["Layering intelligence"],
    },
  ],
  // Order matches downstream section flow. In the standard deck those five keys
  // resolve to D → E → F → G → H, which is what the five rows printed as
  // literals before gh#37; in the leader deck they resolve elsewhere, and the
  // rows follow rather than lie.
  questions: [
    {
      text: "What if you fixed the process before you automated it?",
      kw: ["fixed the process"],
      sectionRef: { keys: ["process"] },
    },
    {
      text: "What if you never had to re-explain your context again?",
      kw: ["re-explain"],
      sectionRef: { keys: ["fundamentals"] },
    },
    {
      text: "What if you could plug AI into your work, not just chat?",
      kw: ["not just chat"],
      sectionRef: { keys: ["techniques"] },
    },
    {
      text: "What if you knew which tool to use, when, and how?",
      kw: ["when, and how"],
      sectionRef: { keys: ["tools"] },
    },
    {
      text: "What if one person's solution became everyone's tool?",
      kw: ["everyone's tool"],
      sectionRef: { keys: ["pitfalls"] },
    },
  ],
  footerCaption: "Five capabilities already in the room. Five questions still ahead.",
  footerCaptionKw: ["already", "ahead"],
};

// ─── A.1 (general variant) — "What we mostly know / don't know yet" ────────
//
// Non-Berau BUs have no Session-1 winners to point back at, so the hook trades
// social proof ("your colleagues built this") for familiarity ("you already
// use this daily") — same rhetorical job, different evidence. Structure and
// animation are identical to the Berau A.1; only content differs.

export const a1GeneralContent: A1Content = {
  figLabel: "WHERE WE ALL START",
  slideTitle: "The AI most of us already know.",
  slideTitleKw: ["already know"],
  tagline: "Most of this is familiar by now. And it opens some questions.",
  taglineKw: ["questions"],
  ruleHeader: "What We Mostly Know",
  leftHeading: "What we mostly know",
  rightHeading: "What we don't know yet",
  capabilities: [
    {
      label: "AI CHATBOT",
      iconName: "MessageSquare",
      description: "Conversational interfaces that answer, ask back, and follow up.",
      descriptionKw: ["ask back"],
    },
    {
      label: "SUMMARIZATION",
      iconName: "FileText",
      description: "Distilling long content into the parts that actually matter.",
      descriptionKw: ["actually matter"],
    },
    {
      label: "DOCUMENT ANALYSIS",
      iconName: "ScanSearch",
      description: "Reading, parsing, and reasoning over files and forms.",
      descriptionKw: ["reasoning"],
    },
    {
      label: "DRAFTING & WRITING",
      iconName: "PenLine",
      description: "First passes of emails, reports, and messages in seconds.",
      descriptionKw: ["First passes"],
    },
    {
      label: "PROMPT ENGINEERING",
      iconName: "Sparkles",
      description: "Shaping the question so the model gives back what you need.",
      descriptionKw: ["Shaping the question"],
    },
  ],
  // Shared by reference: these cards ARE the agenda, and the five sections they
  // point at are identical across variants — sharing the object means an edit
  // can't drift. (No letters named here any more: the rows carry section keys
  // and the composed deck supplies the letters, gh#37.)
  questions: a1Content.questions,
  footerCaption: "Five things we mostly know. Five questions still ahead.",
  footerCaptionKw: ["mostly know", "ahead"],
};

// ─── A.1 (GEMS variant) — "The DigiTech portfolio" ─────────────────────────
//
// GEMS' portfolio was built FOR participants by a central team, so the berau
// hook ("what you've already seen") would land here as *the experts already
// handled this* — the exact opposite of DigiTech's steer 4. The tagline makes
// the turn, phrased as OWNERSHIP rather than typing, so it also works for a
// leader who will sponsor rather than build.
//
// Product labels, not capability labels: the frame is *this is already yours*,
// which a product name delivers in one glance, and the capability rides in the
// description so the D→H questions still connect.
//
// CLAIM DISCIPLINE — every description is pinned to what
// `docs/researches/2026-07-31-gems-digitech-ai-landscape.md` could verify, and
// this deck is shown to DigiTech, who own these systems:
//   - GEMVIS' multi-agent routing is publicly documented, so it is safe here —
//     and it plants section F early.
//   - No computer vision is attributed to FAMOUS; the public portfolio assigns
//     computer vision to SiCantik and WIM instead.
//   - Usign's AI is limited to a validation assist, NOT open Q&A over document
//     contents, which the public record does not support.
//   - MIRRAX is in on INTERNAL ATTESTATION ONLY (it appears in DigiTech's own
//     slide), so its description carries no metric, vendor or outcome.
//   - Excluded: Databricks (publicly unverified) and AI-OCR (a GEMVIS
//     sub-capability). SiCantik and WIM are kept separate.
//
// Known and accepted: three of the five are field/ops systems, so back-office
// participants recognise the names rather than their own daily use. The frame
// works on brand recognition.

export const a1GemsContent: A1Content = {
  // WHAT GEMS ALREADY RUNS over *The AI already running at GEMS.* was the same
  // sentence twice, so the label no longer restates the title: it names the FIGURE
  // — the portfolio as it stands today — and the title makes the claim about it.
  // Register matches the deck's other labels (THE CAPABILITY LADDER).
  //
  // "CURRENT", NOT "DIGITECH" (owner call, 2026-08-05). The label is chrome, and
  // spending it on the builder's name puts DigiTech twice on one screen — the
  // tagline below already credits them, which is where the credit does work. The
  // word `current` also carries the frame the slide argues from: this is the state
  // of things NOW, and the questions after it are about what comes next.
  figLabel: "THE CURRENT PORTFOLIO",
  slideTitle: "The AI already running at GEMS.",
  slideTitleKw: ["already running"],
  // ONE LINE AT 40px, and that is the whole reason it is shorter: the opener's
  // tagline sits at top 270 and the rule header at 380, so a second line closes to
  // 6px of the rule. 1184px holds ~62 characters of the display serif and the old
  // 78-character line wrapped. The ownership turn is intact and now IMPERATIVE —
  // *they built, you build* — which is the same steer-4 job in half the words.
  tagline: "DigiTech built these for you. Now build with them.",
  taglineKw: ["built these for you", "build with them"],
  ruleHeader: "Already In Production",
  leftHeading: "Five systems already running",
  rightHeading: "Questions we'll answer",
  capabilities: [
    {
      label: "GEMVIS",
      iconName: "MessageSquare",
      description:
        "One assistant, routing your question to specialist agents across fifty systems.",
      descriptionKw: ["specialist agents"],
    },
    {
      label: "SICANTIK",
      iconName: "Camera",
      description:
        "Cameras that watch for violations and unsafe behaviour, not just record them.",
      descriptionKw: ["watch for violations"],
    },
    {
      label: "FAMOUS",
      iconName: "Truck",
      description:
        "Sensors and AI reading fleet status, driver behaviour, and fatigue in real time.",
      descriptionKw: ["fatigue"],
    },
    {
      label: "USIGN",
      iconName: "FileSignature",
      description:
        "Approvals signed digitally, with an AI assistant checking the document first.",
      descriptionKw: ["checking the document first"],
    },
    {
      label: "MIRRAX",
      iconName: "Map",
      description:
        "Field monitoring and analysis across the mining area, read by machine vision.",
      descriptionKw: ["read by machine vision"],
    },
  ],
  // Shared by reference, exactly as the general variant does: these cards ARE
  // the agenda, and the five sections they point at are identical across
  // brands. REWORDING ANY OF THE FIVE FOR GEMS REQUIRES CLONING THE ARRAY
  // FIRST — otherwise the edit ships to berau and general too.
  questions: a1Content.questions,
  footerCaption: "Five systems already live. Five questions still ahead.",
  footerCaptionKw: ["already live", "ahead"],
};

// ─── A.1 (leader deck sets) — the five movements ────────────────────────────
//
// Spec §3.6's leader right column, §4.4 slot 1. A.1 is the deck's ONE brand ×
// deck-set slide, and the axes split cleanly:
//
//   - LEFT COLUMN, fig label, slide title, headings — BRAND. A leader is shown
//     their OWN organisation's proof: berau's Session-1 capabilities, GEMS'
//     DigiTech portfolio, general's daily familiarity (gh#25). Untouched here.
//   - RIGHT COLUMN, TAGLINE, FOOTER — DECK SET. They are the agenda for what
//     follows, and after A.1 a leader deck is a different deck (gh#41).
//
// TRAP 4 — `a1Content.questions` is shared BY REFERENCE with `a1GeneralContent`
// and `a1GemsContent` (asserted by identity in `tests/unit/a1-gems.test.tsx`).
// The leader agenda is therefore its OWN array. Never write into the shared one:
// the edit would ship to both middle-management brands with nothing to show it.
const LEADER_QUESTIONS: readonly A1Question[] = [
  {
    text: "What if your people already use AI where you can't see it?",
    kw: ["already use AI"],
    sectionRef: { keys: ["gap"] },
  },
  {
    text: "What if agentic were an operating model, not a project?",
    kw: ["operating model"],
    sectionRef: { keys: ["shape"] },
  },
  {
    text: "What if one team's win became the whole org's baseline?",
    kw: ["the whole org's baseline"],
    sectionRef: { keys: ["invest"] },
  },
  {
    // THE ONE ROW WITH A NAME OVERRIDE (§3.6): it spans the whole retained
    // curriculum, which the leader deck calls THE CURRICULUM — a movement name
    // that no section is called and no `SectionKey` owns. Without the override
    // this row would print THE LANDSCAPE, `landscape` being its first key. (gh#43
    // predicted ENGINEERING FUNDAMENTALS; that was written against gh#37's
    // synthetic leader shape, not against §4.3's retained order.)
    //
    // The keys are the standard sections a leader deck RETAINS, in deck order.
    // `techniques` is absent because the leader deck cuts section F (gh#41), so
    // naming it would only ever be dropped. The letters follow the deck, and have,
    // three times now: this run printed SECTIONS B–G at the Phase 4 floor, SECTIONS
    // C–H once gh#53's `gap` run sat in front of it, prints SECTIONS D–I now that
    // gh#54's `shape` run sits there too, and reaches SECTIONS E–J once the rest of
    // Phase 6 lands (§4.3) — WITHOUT AN EDIT HERE, on any of the four. Do not pin a
    // letter to make the row look finished.
    text: "What if \"using AI properly\" had an actual curriculum?",
    kw: ["curriculum"],
    sectionRef: {
      keys: ["landscape", "mindset", "process", "fundamentals", "tools", "pitfalls"],
      name: "THE CURRICULUM",
    },
  },
  {
    text: "What if you knew exactly what to fund first?",
    kw: ["what to fund first"],
    sectionRef: { keys: ["mandate"] },
  },
];

// A ROW WHOSE MOVEMENT OWNS NO SLIDES PRINTS A NAME AND NO LETTER, and that is the
// correct output, not a gap to paper over: `sectionPointerLabel` collapses an
// unresolved pointer to its name rather than printing `SECTION undefined`. All four
// leader movements were unresolved at the Phase 4 floor. `gap` resolved on gh#53,
// `shape` on gh#54 and `invest` on gh#56 — the first `invest` slide is
// `invest-own-proof`, so WHY INVEST now prints its letter too. `mandate` owns no
// slides until #60–#61 and still prints bare. The rows fill themselves in when the
// slides land — no row above was edited when any of the three did, which is the
// claim gh#43 made and these tickets have now paid off three times.

/**
 * What a leader deck set changes about A.1, over whatever the brand authored.
 *
 * The tagline IS `LEADER_THESIS_LINE` (§4.5) — not a wording of it, the value —
 * so it is byte-identical to what `invest-own-proof` closes on and opens on the
 * same sentence as the leader cover. The footer then hands over to the movement the
 * leader alone can authorise: `mandate`, which question 5 points at. THE LETTER
 * DEPENDS ON WHICH DECK YOU MEAN — `mandate` is section K in §4.3's FINISHED
 * 14-section leader deck (it lands behind `pitfalls`, §3.6), and in the deck
 * composed today it owns no slides, so it takes no letter at all and its row prints
 * bare while K is `meta`. Neither string below names either letter, and none may.
 *
 * BRAND-NEUTRAL BY NECESSITY: one deck-set delta serves berau-leader and
 * gems-leader both, so neither string may name a brand's own evidence — the left
 * column beside them already does, in that brand's terms.
 */
const LEADER_A1_DELTA = {
  // ONE LINE AT 40px, measured: the opener's tagline sits at top 270 and the rule
  // header at 380, so a second line leaves 6px between them. 1184px of width
  // holds about 62 characters of the display serif — the thesis is 60, and a
  // reword has to stay inside that IN `LEADER_THESIS_LINE`, where all three
  // carriers see it.
  tagline: LEADER_THESIS_LINE,
  taglineKw: LEADER_THESIS_LINE_KW,
  questions: LEADER_QUESTIONS,
  footerCaption: "The proof is already in the room. The mandate to scale it is not.",
  footerCaptionKw: ["already in the room", "The mandate to scale it"],
} satisfies Partial<A1Content>;

/**
 * What each deck set does to a brand's A.1 block.
 *
 * A `Record` keyed by `DeckSetId` and not a `deckSet === "leader"` ternary, for
 * the same reason `TITLE_CONTENT_BY_DECK_SET` above is one: a third deck set must
 * FAIL TO COMPILE here rather than silently serve the middle-management agenda to
 * an audience nobody re-read this file for.
 *
 * `standard` returns the block ITSELF, not a spread of it, so the three
 * middle-management A.1s stay the same objects they were before gh#43.
 */
const A1_BY_DECK_SET: Record<DeckSetId, (brandContent: A1Content) => A1Content> = {
  standard: (brandContent) => brandContent,
  leader: (brandContent) => ({ ...brandContent, ...LEADER_A1_DELTA }),
};

/**
 * A.1's content for one brand crossed with one deck set. Pass the brand's own
 * block and `VARIANT.deckSet`.
 *
 * TAKES THE BRAND CONTENT rather than looking it up, because the brand axis is
 * already resolved — by slot, in `BRAND_ALTERNATE_IDS`, one A.1 def per brand
 * (`@/deck/slots`). A second brand table here would be a second place to keep in
 * step.
 *
 * `general` has no leader variant registered today, so its leader form is
 * unreachable — the resolver is still applied to it (a1-general.tsx), so that
 * registering `general-leader` serves the leader agenda instead of silently
 * serving the middle-management one.
 */
export function a1ContentFor(brandContent: A1Content, deckSet: DeckSetId): A1Content {
  return A1_BY_DECK_SET[deckSet](brandContent);
}
