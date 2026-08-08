// Section THE SHAPE — every string this section's AUTHORED slides print, and the one
// axis they vary on.
//
// TWO SLIDES LIVE IN THIS FILE AND THEY DISAGREE ABOUT WHETHER THIS SECTION HAS A
// BRAND AXIS. THE AGENTIC ORGANIZATION exports one, because §4.4 slot 5 puts the
// enabler's own name inside the hub and DigiTech is not MineTech. MIDDLE-OUT — the
// second block, at the bottom of this file — exports NONE: issue #68 refuses a brand
// slot in as many words, and an org chart is nobody's local evidence. Look for a
// `…For(brand)` resolver there and there is not one. Neither answer is the house
// style; the axis exists where the EVIDENCE varies and nowhere else, which is the
// argument `src/slides/leader-gap/content.ts` makes at greater length about its own
// two blocks.
//
// Spec §6.6 (content) · §7.1 (the visual contract #16 settled) · §4.4 slot 5 (the
// brand axis). Named by SECTION KEY and not by letter. `shape` happens to be C in
// both this ticket's composed leader deck and §4.3's finished one — the remaining
// `gap` slides lengthen B without displacing it, C.3 and C.4 extend this run, and
// `invest` lands behind it — so the letter is STABLE, and that is exactly why it is
// still not written down. What moves is everything behind this run (§3.4 R2), the
// letter is derived per deck (§3.5), and a directory that hardcoded the C it is
// currently entitled to would be a file betting on a composition rather than
// reading one. No file under `src/slides/leader-shape/` may hold a letter.
//
// Markup convention, as everywhere else in the deck: data carries plain strings
// plus a sibling `*Kw` array of substrings to highlight at render time. No inline
// `<em>` in data.
//
// THE KEYWORD RULE. `kw` goes on PROSE ONLY, and THE AGENTIC ORGANIZATION — the first
// of this file's two blocks — has THREE prose registers: the headline, the six pillar
// DECISIONS, and the closer. (MIDDLE-OUT states its own census in its own header.)
// Each of them
// carries a `*Kw` sibling. Everything else is the mono LABEL register — the
// kicker, the hub's two lines, the six pillar labels, `decisionEyebrow`, and the
// beat counter {@link decisionCounter} builds out of it — where a copper italic
// reads as a rendering fault, so none of them has a `*Kw` sibling and none of them
// may gain one. The counter is the sharpest case, because it is GENERATED rather
// than authored: a highlight inside "THE DECISION · 03 / 06" would be an emphasis
// on arithmetic. `tests/unit/shape-agentic-org.test.tsx` holds the two registers
// apart as lists, so a new string has to pick a side.
//
// WHAT SHIPPED HERE, AND WHAT IS STILL REFUSED. The previous ticket listed three
// items as deferred; two of them are now written. The list is kept — with the
// previous ticket's own numbering, so the two can be read against each other —
// rather than deleted, because a list that only ever loses rows tells the next
// author nothing about why the remaining ones are missing.
//
//   1. THE SIX LEADER DECISIONS — SHIPPED, one per pillar, on `Pillar.decision`
//      with its `decisionKw` sibling, in the ring order the array below holds.
//      §6.6 spends the space the HR original's panel used on exactly this: a walk
//      that names the leader's DECISION in each pillar, which is what turns the
//      centrepiece into the index for the section behind it. Written now and not
//      earlier because the pose that speaks them now exists — dead copy that reads
//      as finished is how unreviewed copy ships (see `GENERAL_BLOCK` in
//      `src/slides/leader-gap/content.ts` for the same reasoning).
//   2. THE CLOSER — SHIPPED (`closer` / `closerKw`), on the ninth pose. It sits in
//      the right column and not the bottom strip; §7.1 forced that and
//      `WALK_COLUMN` in `./geometry.ts` records why in numbers.
//   3. SPECIFY → GENERATE → VERIFY — STILL REFUSED, unchanged. §6.6 DROPS the HR
//      original's panel outright — C.4 (leader F.4) already does it better — and
//      the freed space is what the walk above is spent on. It is not missing from
//      this file; it is refused. Do not re-add it here or anywhere on this slide,
//      and note that a test asserts those three WORDS appear nowhere on the stage
//      at any pose, so even a paraphrase that borrows one of them fails.
//   4. THE PROTOTYPE'S `→ ACT III · …` POINTER LINE — DELIBERATELY NOT PORTED, and
//      this is the one deviation from the owner-approved variant A that has to be
//      stated out loud rather than discovered by diffing.
//
//      TWO THINGS BLOCK IT, and only one of them is a wording problem. (a) One of
//      the prototype's six pointers IS `Specify · Generate · Verify` — the exact
//      panel item 3 refuses and the three words the test forbids on this stage — so
//      the process pillar has no pointer it is allowed to print. (b) The prefix
//      itself, `→ ACT III ·`, is #16's own vocabulary for a movement THIS deck does
//      not name anywhere, so all six lines would announce a structure the audience
//      is never told exists. Fixing (a) leaves (b), and dropping (b) leaves five
//      mono lines naming a later section by paraphrase — which §3.4 R2 forbids
//      doing by letter and which nothing here should do by nickname either.
//
//      §6.6's actual requirement is that the walk INDEXES the later section, and
//      THE WORDS ARE THE INDEX: `data` and `improvise` (the no-SOP condition and
//      where your data goes), `company-managed seat` (subscriptions), `culture`
//      (Leading AI Culture, twice), `pilot` (the 30-day proof). A leader hears
//      those words again in the section behind this one, which is the whole
//      mechanism — a sixth line of mono chrome under each decision would announce
//      the cross-reference instead of making it, and would spend the only line of
//      the column the closer needs.
//
// Type-only import, so this module pulls in nothing at runtime and stays plain
// data — importable from a node test.
import type { Brand } from "@/deck-variants";

// ───────────────────── the six pillars ─────────────────────

/**
 * The lucide icon names this slide uses, as a closed union.
 *
 * A BARE `string` WOULD FAIL SILENTLY. The shared `LucideIcon` shim resolves a
 * name through a map and renders NOTHING for a miss (`if (!Comp) return null`),
 * so a typo costs one pillar its icon and no error anywhere — on a six-icon ring
 * that reads as a pillar that did not finish loading. The union makes the typo a
 * compile error; the test additionally asserts all six render an `<svg>`, which
 * is the half the union cannot prove (a name can be spelled right and still be
 * absent from the shim's map).
 */
export type PillarIcon = "Users" | "Bot" | "Workflow" | "Boxes" | "Compass" | "Shield";

export interface Pillar {
  id: string;
  /** Resolved through the section-E `LucideIcon` shim — see
   *  `./components/PillarOrbit.tsx` for why that one and not a fourth copy. */
  icon: PillarIcon;
  /**
   * The pillar as HR p4 names it, VERBATIM.
   *
   * A LABEL, and keyword-free by the rule above: these six strings are the
   * vocabulary the rest of section C and all of section D refer back to, and a
   * highlight inside one of them would emphasise a fragment of a name.
   */
  label: string;
  /**
   * THE POINT: the leader's DECISION in that pillar, not a description of it.
   *
   * "Governance & Policies" is a box on an org chart and every leader in the room
   * already agrees with it. "You decide where the data may go" is something a
   * division head either does on Monday or does not. Six descriptions would make
   * this slide a taxonomy nobody argues with, which is precisely the failure §6.6
   * spends the freed panel space to avoid.
   *
   * ALL SIX OPEN "You decide", AND THAT REPETITION IS THE ARGUMENT. The walk is one
   * sentence stem answered six ways, so by the fourth beat the room is hearing the
   * stem rather than reading a new sentence — and the stem is the claim: none of
   * these six is a purchase, a vendor's job or somebody else's. Six varied openings
   * would read better on a page and lose the drumbeat in a room.
   *
   * IT ALSO HAS TO INDEX THE SECTION BEHIND THIS ONE (§6.6). Each decision carries
   * anchor words a leader hears again in section D or in the ladder — they are
   * named in a comment above the decision that owns them, and they are NOT free to
   * be polished away: if the wording drifts, this slide stops indexing anything and
   * becomes six nice sentences.
   */
  decision: string;
  /**
   * Prose, so it carries a `*Kw` sibling — see the keyword rule at the top of this
   * file.
   *
   * ONE PHRASE EACH. The decision is one line in a column that already holds the
   * pillar's name and the beat counter, and two copper italics inside one line
   * emphasise nothing. The phrase chosen is the DECISION's object — what is being
   * decided — not the verb, because "You decide" is the same in all six and an
   * italic on it would highlight the boilerplate.
   *
   * Every entry must be a SUBSTRING of `decision`, which the test holds: a keyword
   * that does not occur is a highlight that silently does nothing — the copy still
   * reads, so nothing on the stage says the emphasis was lost.
   */
  decisionKw: readonly string[];
}

/**
 * HR p4's six pillars, in RING ORDER — which is the FOCUS WALK's order, not the
 * order HR p4 prints them in.
 *
 * HR p4 reads: People & Mindset · AI Companions · Process & Methodology · Tools &
 * Platform · Strategy & Leadership · Governance & Policies. This array reads
 * Governance · Tools · People · Strategy · Process · Companions, and the
 * difference is a teaching decision the owner approved along with variant A on a
 * browser walkthrough of all six #16 prototypes: the walk opens on the two
 * pillars section D opens on (§6.6 — security and no-SOP land on *Governance &
 * Policies*, subscriptions on *Tools & Platform*) so the centrepiece hands
 * straight over to the section after it.
 *
 * ONE ORDER ARRAY, NOT TWO. A second array holding "HR p4's printed order" would
 * exist only to be out of step with this one, and nothing on the slide renders
 * it — the ring, the labels and the walk's six beats all index THIS array.
 * `./geometry.ts` computes six centres in the same order, so pillar `i`'s box is
 * `PILLAR_CENTRES[i]` and there is no rung→tread table to drift.
 */
const PILLARS: readonly Pillar[] = [
  {
    id: "governance",
    icon: "Shield",
    label: "Governance & Policies",
    // ANCHORS TWO PASSES AT ONCE, which is why this pillar opens the walk: §6.7
    // D.4 beat 1 is "where your data actually goes", and §6.2/B.2's condition is
    // "there is no guidance, so people improvise". So the line has to carry `data`
    // AND a form of `improvis`, and both anchors are load-bearing rather than
    // decorative.
    //
    // THE PROTOTYPE'S "what may leave the building" IS A BETTER SENTENCE AND WAS
    // CUT. It indexes neither pass — a leader who hears "leave the building" here
    // and "where your data actually goes" two sections later has to do the matching
    // themselves, which is exactly the drift §6.6 warns about.
    //
    // "before someone improvises" NAMES B.2'S CONDITION AND NOTHING MORE. Shadow AI
    // escalates three times in this deck (B.2 condition · D.4 beat 2 exposure · D.3
    // rational behaviour) and §6.2 puts that escalation in the spec rather than in
    // the implementer's judgement, so this line spends no statistic and no image
    // that a later pass needs.
    decision: "You decide where the data may go — and you write it down before someone improvises.",
    decisionKw: ["where the data may go"],
  },
  {
    id: "tools",
    icon: "Boxes",
    label: "Tools & Platform",
    // §6.7 D.5's OWN WORDS, KEPT EXACTLY: "company-managed seats", and central
    // billing as the thing the company takes over. The prototype's "who gets a
    // seat … and you pay for it centrally" says the same thing in words D.5 does
    // not use, and an index whose vocabulary is a paraphrase indexes nothing.
    //
    // "the company pays for it" AND NOT "central billing": the mechanism is D.5's
    // to explain in three beats, and a leader's decision is the commitment, not the
    // billing arrangement. What the leader is deciding is that the seat stops being
    // a personal expense — which is what makes admin control, SSO and usage
    // analytics possible at all.
    decision: "You decide who gets a company-managed seat, and that the company pays for it.",
    decisionKw: ["a company-managed seat"],
  },
  {
    id: "people",
    icon: "Users",
    label: "People & Mindset",
    // §6.6 lands "Leading AI Culture" on People & Mindset (and on Strategy &
    // Leadership, two beats on), so `culture` is the anchor word and it is not
    // optional here.
    //
    // THE PROTOTYPE'S "not using it is the deviation" IS SHARPER AND WAS CUT
    // ANYWAY, for three reasons that compound: it is a compliance framing on the
    // one pillar that is not about compliance, it lands on the Governance pillar's
    // territory two beats after the Governance beat, and it asks a division head to
    // MANDATE a behaviour on a slide whose whole claim is that culture is led. A
    // mandate is also the one lever that produces certificate-shaped adoption,
    // which is the exact outcome B.5's Berau marker puts as an open question.
    //
    // THE TWO-PERSON CONTRAST keeps the decision on what the organisation REWARDS,
    // which is the lever a leader actually holds — and it makes the cost visible:
    // rewarding the person who waits is also a decision, made by default.
    decision: "You decide whether the culture rewards the person who tries it or the person who waits.",
    decisionKw: ["the culture rewards"],
  },
  {
    id: "strategy",
    icon: "Compass",
    label: "Strategy & Leadership",
    // TWO ANCHORS AGAIN: §6.7 D.3's turn — "you are the person who can skip beats
    // 1–3", i.e. the 30-day proof pilot with a handful of seats, one named use case
    // and a kill criterion — and §6.6's second half of "Leading AI Culture". So
    // `pilot`, a form of `lead`, and `culture`.
    //
    // NOT THE PROTOTYPE'S "and name its owner". Naming and protecting a champion is
    // K.3's own lever, printed there in those words; repeating it here spends a beat
    // of section K on the centrepiece and lets the leader hand the pillar to the
    // person they just named. "leading the culture is part of the job" is the half
    // of D.3's turn that CANNOT be delegated, which is why it is the half that
    // belongs on a slide addressed to the room.
    decision: "You decide which problem gets the pilot, and that leading the culture is part of the job.",
    decisionKw: ["which problem gets the pilot"],
  },
  {
    id: "process",
    icon: "Workflow",
    label: "Process & Methodology",
    // "a human", NOT the prototype's "the human". The definite article implies a
    // named signatory already exists, and on the process pillar the decision is
    // whether ANY human signs a given step at all — which is the same decision
    // B.5's L3 rung calls a decision contract, one beat before the companions
    // pillar names the crossing itself.
    //
    // THE SECOND CLAUSE IS THE ONE THAT COSTS SOMETHING. "everywhere they no longer
    // do" is the sentence a division head has to be willing to say out loud, and
    // dropping it would leave a decision nobody can disagree with — every process
    // already has a signature somewhere.
    //
    // AND NO POINTER TO A SEQUENCE. The prototype pointed this pillar at
    // Specify · Generate · Verify, which §6.6 refuses and a test forbids by word —
    // see items 3 and 4 at the top of this file.
    decision: "You decide where a human still signs, and everywhere they no longer do.",
    decisionKw: ["where a human still signs"],
  },
  {
    id: "companions",
    icon: "Bot",
    label: "AI Companions",
    // B.5's LADDER, RUNG L3 — "Agentic, bounded · decision contract, 70/30 split".
    // The word the ladder turns on is `agent`, and this is the one decision that
    // names a THRESHOLD rather than an allocation: a tool that is allowed to act on
    // its own is a different risk class, and the ladder exists so that crossing is
    // sayable instead of accidental. "allowed to" carries the whole point — the
    // crossing is granted, by someone, on a date.
    //
    // VERBATIM FROM THE PROTOTYPE, and the only one of the six that is. It already
    // indexes the ladder in the ladder's own vocabulary, and nothing about the
    // rebuilt slide moved what it points at.
    decision: "You decide when a tool is allowed to become an agent.",
    decisionKw: ["allowed to become an agent"],
  },
];

// ───────────────────── shared copy ─────────────────────

export const shapeOrgContent = {
  figLabel: "THE AGENTIC ORGANIZATION",

  headline: "Six pillars move together, or none of them move.",
  /** The headline's highlight — the first of the slide's three prose registers,
   *  and the only one that is on the stage at every pose. */
  headlineKw: ["move together"],

  /**
   * The standing kicker — the claim the figure is an argument for.
   *
   * STANDS AT ALL NINE POSES, unlike the prototype's, which sat inside the ring's
   * space and had to fade out as the pillars faded in — and which then hid itself
   * from pose 1 onward, spending a slot on a claim that is true throughout. It reads as the headline's
   * eyebrow and it is the sentence that makes the diagram a proposal rather than
   * an org chart: an operating model is something a division adopts, a department
   * is something it funds and forgets, a committee is something it schedules.
   *
   * Mono uppercase, so keyword-free. The em dash is the deck's own; the commas
   * are what keep the two refusals reading as one breath.
   *
   * STORED UPPERCASE, unlike `hubLabel` below, and the difference is not an
   * oversight: this string is the prototype's verbatim and is never quoted in
   * prose, so the register's `textTransform` is a no-op on it and the data reads
   * as the stage does. `hubLabel` IS quoted — in the issue's AC, in §6.6 and in
   * the test — so it stays in title case and lets the CSS do the shouting.
   */
  kicker: "AN OPERATING MODEL — NOT A DEPARTMENT, NOT A COMMITTEE",

  /**
   * The hub's first line — §6.6's generic hub.
   *
   * STORED IN TITLE CASE AND RENDERED UPPERCASE. The deck's mono LABEL register
   * uppercases through CSS `textTransform`, so the glyphs on the stage read
   * "THE ENABLER" while `textContent` — and every quotation of this slide in the
   * issue, the spec and the test — stays "The Enabler". Shouting it in the data
   * would put the presentation layer in the content module and make the string
   * unquotable in prose.
   *
   * GENERIC ON PURPOSE (§6.6): the brand line underneath says who the enabler
   * actually is here, and the hub above it says what the job is. A leader whose
   * own function is not named in the hub can still see the shape.
   */
  hubLabel: "The Enabler",

  /**
   * The walk column's eyebrow — the mono label standing over every decision.
   *
   * SINGULAR, and it stays singular at all six beats. "THE DECISIONS" would make
   * the column a list the room can read ahead in, and reading ahead is what a
   * six-beat walk exists to prevent: the leader should be on the beat the presenter
   * is on. "THE DECISION" says the column holds exactly one at a time, which is
   * what the counter beside it then quantifies.
   *
   * STORED UPPERCASE, like `kicker` and unlike `hubLabel`: it is never quoted in
   * prose — {@link decisionCounter} composes the printed line out of it and the
   * tests read that line, not this field — so the register's `textTransform` is a
   * no-op on it and the data reads as the stage does. Mono label, so keyword-free.
   */
  decisionEyebrow: "THE DECISION",

  /**
   * The closer — the ninth pose, and the sentence the whole figure exists to earn.
   *
   * TWO SENTENCES, AND THE SECOND IS THE LOAD-BEARING ONE. "None of them is a tool
   * purchase" is the refusal §6.6's centrepiece is built to state: the six decisions
   * the room has just walked through are all things a leader signs, none of them is
   * a line item a vendor can deliver, and a division head who leaves this slide
   * planning a procurement has misread it. The first sentence alone would be a
   * summary; the pair is a claim.
   *
   * IT PRINTS IN THE RIGHT COLUMN, NOT THE BOTTOM STRIP — §7.1's recorded layout
   * risk, and `WALK_COLUMN` in `./geometry.ts` holds the arithmetic: the lowest
   * pillar's box already reaches y = 610 of a 632 floor and it GROWS on focus, so
   * there is no bottom strip to print a second line of type in. The column the walk
   * has just finished with is empty at exactly the pose the closer needs it.
   *
   * VERBATIM FROM THE PROTOTYPE. The owner approved variant A with this line in it
   * on a browser walkthrough, it names no letter and no figure, and rewriting an
   * approved closer to prove the port was not a copy would be the worst reason to
   * change copy.
   */
  closer: "Every one of these is a decision on your desk. None of them is a tool purchase.",
  /**
   * Prose, so one keyword — and it goes on the claim, not on the refusal.
   *
   * "a decision on your desk" and NOT "a tool purchase": the italic is the last
   * emphasis the room takes away, and emphasising the refusal would leave the
   * closing image a purchase. The highlighted phrase is also the only part of the
   * sentence that is addressed to the person in the chair.
   */
  closerKw: ["a decision on your desk"],

  pillars: PILLARS,
} as const;

/**
 * "THE DECISION · 03 / 06" — the beat counter, zero-padded, 1-based for the room.
 *
 * ONE-BASED HERE AND ZERO-BASED EVERYWHERE ELSE, on purpose: the audience is
 * counting and the code is indexing, so beat three of six is "03 / 06" on the stage
 * and pillar index 2 in `./walk.ts`. The conversion happens in this one function
 * rather than at the call site, because a `+ 1` in a renderer is a `+ 1` that gets
 * forgotten the second time the counter is printed.
 *
 * ZERO-PADDED so the string is the same width at all six beats. Unpadded, "3 / 6"
 * and "10 / 12" are different widths and the eyebrow above a left-aligned column
 * would be stable while the counter shifted — a 1px twitch at projection scale that
 * reads as the slide re-laying out on every beat.
 *
 * `/ 06` IS DERIVED FROM `PILLARS.length`, never typed. A seventh pillar counts to
 * 07 on its own; a hardcoded total would print "07 / 06" and tell the room the
 * presenter has lost count.
 *
 * COMPOSED FROM `decisionEyebrow` rather than repeating the words, so the label and
 * the counter cannot disagree about what the column is called.
 *
 * @throws on an index the ring does not have, exactly as `pillarCentre` in
 *         `./geometry.ts` does and through the same array lookup, so the two behave
 *         identically on a fractional or negative index. NOT CLAMPED: the
 *         prototype's `Math.max(focus, 0) + 1` prints "01 / 06" at the closer pose,
 *         where no pillar is focused — a beat number for a beat that is not running,
 *         under the closer's own copy. `./walk.ts` answers "which pillar, if any" and
 *         returns `NO_FOCUS` for the poses that focus none; a caller that passes that
 *         value straight in here has skipped the check, and a throw is how it finds
 *         out in a test instead of in a room.
 */
export function decisionCounter(index: number): string {
  const pillar = PILLARS[index];
  if (!pillar) {
    throw new Error(
      `decisionCounter: no pillar ${index} — the ring has ${PILLARS.length} ` +
        `(0…${PILLARS.length - 1}).`,
    );
  }
  const beat = String(index + 1).padStart(2, "0");
  const total = String(PILLARS.length).padStart(2, "0");
  return `${shapeOrgContent.decisionEyebrow} · ${beat} / ${total}`;
}

// ───────────────────── the brand axis (§4.4 slot 5) ─────────────────────

/**
 * The hub's second line, brand by brand — the ONE thing on this slide that varies
 * with the organisation in front of it (§4.4 slot 5).
 *
 * `null` MEANS THERE IS NO ORGANISATION TO NAME, and the hub prints its label
 * alone. It is not "not written yet" and it is not an empty string: an empty
 * string renders a blank line inside the disc, which on a projector reads as a
 * slide that did not finish, and a placeholder name would be an invented
 * organisation printed at the centre of the deck's centrepiece. So the absence is
 * carried by the TYPE, the renderer has to handle it, and no author can turn it
 * into copy by editing one field.
 *
 * A `Record` keyed by `Brand` and not a `brand === "gems"` ternary, for the same
 * reason `capabilityLadderFor`'s table is one: a fourth brand must FAIL TO
 * COMPILE here rather than silently show one organisation another's name. This is
 * §4.4's "a content block per brand, not a brand × deckSet matrix" — the deck-set
 * axis does not reach this slide, because a slide only the leader decks compose
 * has nothing to vary against.
 *
 * `general` IS UNREACHABLE TODAY, and kept to the thinnest honest thing. No
 * `general-leader` variant is registered (`VARIANTS` in `@/deck-variants`), so no
 * composed deck asks for it. It exists because registering that variant should
 * serve a hub that names NOBODY rather than crash at first paint or — far worse —
 * fall through to another organisation's tech function. `general` names no
 * organisation, so it has nothing to put on the second line, and `null` says
 * exactly that and nothing more.
 */
const HUB_BRAND_LINE_BY_BRAND: Record<Brand, string | null> = {
  berau: "MineTech",
  gems: "DigiTech",
  general: null,
};

/**
 * The hub's brand line for one brand. Pass `VARIANT.brand`.
 *
 * THE ONLY WAY IN. The table above is deliberately not exported: a caller that
 * could read it could also enumerate keys the brand table does not have, and the
 * tests that hold a rule over "every brand" would then prove it over this file's
 * own key set instead of over `BRANDS`. They walk `Object.keys(BRANDS)` and come
 * through here, so a brand registered without a line fails at the type and a line
 * written for a brand that does not exist fails at the same place.
 *
 * The slide file calls this ONCE at module scope and passes the result down as a
 * prop — which is what lets one test render both brands' hubs in a single module
 * epoch (§4.4 slot 5, and see `./shape-agentic-org.tsx`).
 */
export function hubBrandLineFor(brand: Brand): string | null {
  return HUB_BRAND_LINE_BY_BRAND[brand];
}

// ═════════════════════════════════════════════════════════════════════════════
// MIDDLE-OUT — §6.6's "middle-out adoption", and the one slide in this deck that
// argues its claim AT the people the claim is about.
// ═════════════════════════════════════════════════════════════════════════════
//
// §6.6 gives this slide one line — "Middle-out adoption" — and one hard constraint,
// stated two paragraphs later against a different candidate: "Learn → Experiment →
// Build → Integrate → Own is OUT: it would be a THIRD ladder alongside L1–L5 and
// P0–P3." That refusal is about a maturity scale, not about this slide, and it is
// exactly what this slide is at risk of becoming. Everything below is written so
// that three organisational bands read as an ORG CHART and never as a scale.
//
// WHO IS BEING ARGUED WITH. The leader deck's room is BU and Division Heads — the
// middle. So the slide casts the audience as the people adoption spreads FROM, and
// never as the target of somebody else's rollout. That framing is the whole reason
// the claim can be made here at all: in a practitioner deck the same three bands
// would be a diagram flattering an absent party, and in this room it is a job
// description the people holding it can act on the same afternoon.
//
// THE ARGUMENT, IN ORDER. The top holds authority and no visibility. The bottom
// holds the work and no authority. The middle holds both, plus one thing neither of
// them holds — people who copy what it does. The close is the two TRANSLATIONS the
// middle performs: a mandate downward into actual work, and actual work upward into
// the next decision. Two directions, at once, from one place.
//
// ═══ THE NO-NEW-LADDER GUARDRAIL, AND THE SIX THINGS THAT HOLD IT. Three stacked
// bands are one keystroke away from being a maturity scale, and a reviewer cannot
// tell the difference by reading the copy alone. So it is held structurally, and
// each of these is checkable rather than asserted:
//
//   1. NO INDEX ON ANY BAND. No band carries a number, an ordinal or a letter. The
//      bands are identified by WHO THEY ARE ({@link Band.label}) and by nothing else.
//   2. NO DIGIT IN ANY RENDERED STRING AT ALL — the precedent `gapNoSopContent` set,
//      and taken for a second reason here: a stage with no numeral on it cannot be
//      read as a scale, and an absence is testable in a way that a list of forbidden
//      values is not. It also keeps this slide from re-spending `gap-hardest-part`'s
//      70/30, which is the one split the leader deck has already quantified.
//   3. NO ASCENT AND NO PROGRESSION. `./middle-out-geometry.ts` gives all three bands
//      the SAME height, the same internal structure and the same left edge — there is
//      no staircase, no inset, no arrow between bands and nothing that reads "first
//      this, then that". Equal geometry is the anti-ladder guarantee, and it is a
//      geometry decision precisely so a copy edit cannot undo it.
//   4. THE TWO DIRECTION LINES ARE SIMULTANEOUS AND BIDIRECTIONAL. One down, one up,
//      arriving on the same pose, drawn the same length, meeting at one origin bar on
//      the middle band's own centre line. That is TRANSLATION. A single line with
//      three stops on it would be a scale, and the geometry refuses to draw one.
//   5. THE MIDDLE IS RANKED BY COLOUR, NEVER BY SIZE AND NEVER BY OPACITY. The middle
//      band lights to a brighter tier on the copper/neutral ramp; it does not grow, and
//      opacity on this stage means "not revealed yet", i.e. TIME. Ranking the middle
//      ABOVE the top is the argument rendered as colour — and a band that were also
//      taller would be rendering it as magnitude, which is what a scale does.
//   6. THE VOCABULARY IS REFUSED BY WORD. None of `level`, `levels`, `maturity`,
//      `stage`, `stages`, `rung`, `tier`, `tiers`, `ladder`, `step`, `L1`–`L5`,
//      `P0`–`P3` or `phase` appears in any rendered string in any form. That list is
//      not decoration: `gap-capability-ladder` owns L1–L5 and `mandate-phases-gates`
//      owns P0–P3, and a single borrowed noun here would make the room start counting.
//
//      THE ONE CASUALTY IS WORTH NAMING. The top band was drafted as "THE BOARD AND
//      THE C-LEVEL", which is the ordinary business term and which rule 6 forbids —
//      `C-LEVEL` matches `\blevel\b`, the hyphen being a word boundary. "THE BOARD AND
//      THE C-SUITE" is the same referent in the same register at the same measured
//      width (225.5px of 11px mono either way), so the rule costs this slide nothing
//      but is recorded here so the next author does not "restore" the original.
//
// ═══ THE ONE MEASURED-FIT CHANGE, STATED OUT LOUD. The headline was drafted as
// "Adoption does not come down from the top. It spreads out from the middle." and it
// DOES NOT FIT. Measured as a `white-space: nowrap` clone under the real cascade in
// Chromium — the method `leader-invest/chicken-egg-geometry.ts` records, and this
// harness reproduces that module's own recorded figures to within 0.14% on the
// fallback face — it is 1004.06px with Instrument Serif and **1311.22px with the
// Georgia fallback**, against `.slide-headline-row`'s 1184px measure. So it wraps to
// two lines the moment the webfont is absent, and a second headline line lands at
// y = 122…164, straight through the kicker's shelf at y = 134. An auditorium without
// the Google Fonts CDN is not a hypothetical for this deck.
//
// The shipped line is 778.33px / 1004.92px — 85% of the measure on the WIDE face,
// one line under both — and it keeps the claim exactly: the model being refused is
// named ("top-down"), the model being asserted is the one `figLabel` already
// announces, and the mandated keyword is untouched. See `HEADLINE_BUDGET_CHARS`
// in `./middle-out-geometry.ts` for the same arithmetic as a number a test can hold.
//
// ═══ NO BRAND AXIS, AND ISSUE #68 SAYS SO IN AS MANY WORDS: no brand slot, identical
// copy under both brands, do not invent variance. So this block exports no
// `…For(brand)` resolver and the slide file imports no `VARIANT` at all — the same
// call `gapNoSopContent`, `gapHardestPartContent` and `mandate-enablement` make, and
// the same reasoning: §4.4's seven brand × deckSet slots do not list this slide, and
// an ORG CHART is not an organisation's own evidence. Every organisation in this
// group has a board, division heads and teams; naming one of them would be inventing
// a fact to fill a fork. What that buys is a test that mounts the slide under both
// leader brands and compares byte for byte.
//
// ═══ THE REPORTED "3.5× ADOPTION" FIGURE IS DELIBERATELY NOT CARRIED, and this is the
// paragraph that exists so nobody adds it back as an improvement.
// `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` records the HR
// original's middle-out page as carrying "Reported statistic: 3.5× higher adoption
// when employees influence technology selection" — and that is the ONLY trace of it
// in this repo. There is no primary source, no study title, no author, no date and no
// URL anywhere in `docs/`, so the deck cannot write the source line it would have to
// print beside it. §12.2 is the standing rule about reported claims, and the two
// shipped precedents show what honouring it costs: `gapHardestPartContent` prints
// "Reported by BCG / McKinsey — the adoption benchmark this deck quotes rather than
// measures" ON the slide, and `invest-own-proof` prints a `vendor-reported` chip on
// every row plus an exported `NOT_AUDITED` negation. Neither is writable here.
//
// AND IT WOULD BREAK TWO OTHER RULES ON ITS WAY IN: it is a digit (rule 2 above), and
// the claim it makes — that letting employees pick the tool raises adoption — is a
// BOTTOM-UP argument, which is the one this slide is not making. The slide is
// complete without it; the figure is the evidence.
//
// ═══ WHAT THIS SLIDE MAY NOT SAY, checked against RENDERED COPY on all three sides:
//
//   · "You decide …" ×6 AND "Every one of these is a decision on your desk. None of
//     them is a tool purchase." → THE AGENTIC ORGANIZATION's, at the top of this same
//     file and in the same run. Nothing below opens on that stem or echoes that
//     closer. The two translations DO open on a second-person stem — "You turn …",
//     twice — and that is a deliberate near-miss rather than an oversight: a different
//     verb, twice rather than six times, and it names the one act the other slide's
//     six decisions all presuppose. The word `decision` also appears once below, in
//     "the next decision made above you", where the referent is INVERTED — a decision
//     taken above this room, not one on its desk — and that inversion is the line's
//     whole point.
//   · "The hardest part is not the tools." AND THE 70/30 → `gap-hardest-part`'s. The
//     word `tools` appears nowhere below, and no percentage does either.
//   · "Nobody wrote the rule. So everybody wrote their own." AND `improvises` →
//     `gap-no-sop`'s. Nothing below uses either. Note also that its
//     `issuedEyebrow` is "WHAT THE ORGANISATION HANDED OUT", which is why the headline
//     below does NOT read "Adoption is not handed down" — a good line, cut for that
//     collision alone.
//   · "on the Tuesday after the room empties" → `leader-mandate/content.ts`'s, and
//     THIS IS AN OVERLAP THAT SHIPS RATHER THAN AN OVERSIGHT. The band below says
//     "on a Tuesday" and the two translations say "on Monday" twice. The ordinary
//     working day is this slide's unit of measurement — it is what the top cannot see
//     and what the middle translates into and out of — and section K's line reads as
//     an echo of it rather than the other way round, because `shape` composes ahead of
//     `mandate` in both leader decks. Indefinite article here, definite there; an
//     ordinary day here, one named day there.
//
// ═══ THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — NINE strings: `headline`, the three bands'
//     `holds`, the three bands' `qualifier`, `downward`, `upward` and `closer`. (Ten
//     with the closer counted; the three bands contribute six.)
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — NINE strings:
//     `figLabel`, `kicker`, the three band `label`s, the three bands' two eyebrows
//     (three distinct values: HOLDS, CANNOT, ALONE) and `translationEyebrow`.
//     THE BAND LABELS ARE THE CASE WORTH STATING, because they are the only mono
//     strings on this stage a reader might mistake for prose: they are the chart's
//     row names, they are what rule 1 above puts in place of an index, and a copper
//     italic inside one would emphasise a fragment of somebody's job title.
//
// NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). As a derived and
// non-authoritative observation: this slide composes as the THIRD `shape` slide in
// the deck built today and becomes the fourth once `shape-tam-kotter` inserts ahead
// of it — which is precisely why neither value is written down anywhere, in this file
// or in the two modules beside it. `FigLabel` takes a LABEL only.

// ───────────────────── the three bands ─────────────────────

/** Exactly three, held by the TYPE — the fixed-length tuple idiom
 *  `leader-invest/content.ts` argues at length: a fourth entry's error lands ON the
 *  fourth entry, at the definition site, with no cast anywhere. Three is also the
 *  count `./middle-out-geometry.ts` derives `MIDDLE_BAND_INDEX` from, and an
 *  even count would leave that derivation without a whole number to land on. */
type Three<T> = readonly [T, T, T];

/**
 * The mono LABEL over a band's FIRST claim row — what the band has.
 *
 * ONE CONSTANT, THREE USES. All three bands open on the same word, and that repetition
 * is the chart's spine: the room reads three answers to one question before it reads
 * anything else. Written once so the three cannot come to disagree.
 */
const HOLDS_EYEBROW = "HOLDS";

/**
 * The mono LABEL over the SECOND claim row on the two OUTER bands — what the band
 * cannot do.
 *
 * IT APPEARS TWICE AND THE MIDDLE BAND HAS NONE, which is the argument drawn in chrome
 * rather than said in a sentence: by the time the room reaches the middle band it has
 * learned that every band has a CANNOT, and the middle's never arrives.
 */
const CANNOT_EYEBROW = "CANNOT";

/**
 * The mono LABEL over the MIDDLE band's second claim row — the row neither other band
 * has.
 *
 * FIVE CHARACTERS, AND THE LENGTH IS LOAD-BEARING. The eyebrow gutter in
 * `./middle-out-geometry.ts` is `EYEBROW_WIDTH` = 72px, which is 7 characters of
 * 11px mono at 0.22em tracking; "AND ALONE" measures 81.19px and does not fit, so the
 * conjunction was cut rather than the gutter widened — widening it costs the six claim
 * rows the measure that keeps every one of them on one line.
 *
 * IT SAYS "ONLY THIS BAND" AND NOT "AND ALSO". Against CANNOT it is an opposition
 * rather than a continuation, which is what the middle band's second row is: the two
 * outer bands are missing something, and this one has something the others are.
 */
const ALONE_EYEBROW = "ALONE";

/** One row of the org chart. */
export interface Band {
  id: string;
  /**
   * WHO THIS BAND IS. A mono LABEL, keyword-free by the rule above.
   *
   * THIS IS WHAT STANDS IN PLACE OF AN INDEX. Guardrail 1 in the header forbids a
   * number, an ordinal or a letter on any band, so the label is the band's whole
   * identity — which is also why it is the plainest possible naming of each group and
   * carries no adjective. A reader who cannot place themselves in one of these three
   * rows within a second has been given a diagram instead of a chart.
   */
  label: string;
  /** {@link HOLDS_EYEBROW}, on every band. Carried per band rather than once on the
   *  block so the interface is uniform and the renderer needs no special case. */
  holdsEyebrow: string;
  /**
   * WHAT THIS BAND HAS. PROSE, so it carries a `*Kw` sibling.
   *
   * ALL THREE OPEN ON "Holds", under an eyebrow that says HOLDS, and the repetition is
   * deliberate for the reason the sibling block's six "You decide" openings are: by the
   * third the room is hearing the STEM and reading only the difference. The difference
   * is the argument.
   */
  holds: string;
  holdsKw: readonly string[];
  /**
   * The mono LABEL over the second claim row — {@link CANNOT_EYEBROW} on the two outer
   * bands, {@link ALONE_EYEBROW} on the middle.
   *
   * PER BAND, AND THAT IS THE POINT. It is the only field whose VALUE says which kind
   * of band this is, and it is why {@link qualifier} below can be one field rather than
   * two optional ones.
   */
  qualifierEyebrow: string;
  /**
   * THE SECOND CLAIM ABOUT THIS BAND — a LIMIT on the two outer bands, and on the
   * middle band the thing neither of them has. PROSE.
   *
   * ONE FIELD AND NOT TWO OPTIONAL ONES (`limit?` / `surplus?`), because the SHAPE of
   * the argument is identical in all three bands — a label, what it holds, and the one
   * further thing that is true of it — and only {@link qualifierEyebrow} says which
   * kind of second claim it is. Two optional fields would let a band ship with neither
   * and render as a row that did not finish drawing, which on a projector is
   * indistinguishable from a slide that failed to load.
   */
  qualifier: string;
  qualifierKw: readonly string[];
  /**
   * WHICH BEAT OF THE WALK ARGUES THIS BAND: 0-based, and a permutation of
   * `0…bands.length - 1`.
   *
   * ORDER, NOT TIME. `./middle-out-walk.ts` turns a beat into a pose and owns every
   * `>=` on the way; this field owns only the TEACHING ORDER, which is a content
   * decision the same way the sibling block's ring order is one.
   *
   * AND THE ORDER IS THE ARGUMENT: top (0), then bottom (1), then MIDDLE (2). The two
   * bands that are missing something are established first, so the middle's claim
   * lands as a conclusion the room has already assembled rather than as a compliment
   * paid to it. The middle arriving LAST is also what lets it arrive BRIGHT — see
   * `isMiddleLit` in `./middle-out-walk.ts`, which reads the last claim pose and would
   * light the wrong band if this permutation were re-sorted.
   *
   * THE ARRAY ORDER IS SPATIAL AND THIS FIELD IS NOT. Unlike the sibling block, which
   * carries ONE order array, this slide genuinely has two: the array below is the CHART
   * — top, middle, bottom, the order the bands are drawn in and the order
   * `./middle-out-geometry.ts` places them in — and the walk argues them in a different
   * one. Encoding the teaching order in the array order instead would put the middle
   * band at the bottom of the chart.
   */
  claimBeat: number;
}

/**
 * The three bands, in SPATIAL order — top of the stage first.
 *
 * THIS ARRAY IS THE CHART. Index 0 is drawn at the top, index 1 in the middle, index 2
 * at the bottom, and `./middle-out-geometry.ts` derives `MIDDLE_BAND_INDEX` from
 * the length rather than typing a 1 — so the band the whole slide is about is found by
 * arithmetic and cannot end up pointing at the wrong row.
 */
const BANDS: Three<Band> = [
  {
    id: "board",
    label: "THE BOARD AND THE C-SUITE",
    holdsEyebrow: HOLDS_EYEBROW,
    // "the air cover" IS THE THIRD ITEM ON PURPOSE. The mandate and the budget are
    // what a leader expects to see credited to the top and are therefore agreed with
    // before they are read; air cover is the one a division head has actually needed
    // and been grateful for, and it is what makes the row a fair account of the top
    // rather than a setup for the limit underneath it. The band has to be RIGHT about
    // the top, or the room discounts everything under it.
    holds: "Holds the mandate, the budget and the air cover.",
    // The keyword goes on the first item and not the last: `the mandate` is the object
    // the downward translation later picks up by name ("You turn a mandate into …"),
    // so the italic here is the thing the room is asked to remember.
    holdsKw: ["the mandate"],
    qualifierEyebrow: CANNOT_EYEBROW,
    // "Cannot see" AND NOT "does not know" OR "is out of touch". This is a structural
    // fact about where people sit, not a criticism of anybody — a board that could see
    // what every team does on an ordinary day would be doing somebody else's job. The
    // moment this line becomes a complaint the slide stops being an org chart and
    // becomes a grievance, and the room stops being the subject of it.
    qualifier: "Cannot see what your people actually do on a Tuesday.",
    qualifierKw: ["Cannot see"],
    claimBeat: 0,
  },
  {
    id: "middle",
    label: "BU AND DIVISION HEADS",
    holdsEyebrow: HOLDS_EYEBROW,
    // "Holds both" IS THE HINGE OF THE WHOLE SLIDE, and it only works because the two
    // bands it refers to have already been argued — which is what `claimBeat: 2` buys.
    // The two clauses after the dash are the two things the outer bands were each
    // missing, in the order they were missed: near enough to SEE (the top's limit),
    // senior enough to CHANGE (the bottom's limit).
    holds: "Holds both — near enough to the work to know it, senior enough to change it.",
    // TWO KEYWORDS AND NOT ONE, which is the only line on this stage that takes two.
    // The claim is a conjunction — either half alone is a band that already exists —
    // so an italic on one half would emphasise exactly the wrong thing.
    holdsKw: ["near enough", "senior enough"],
    qualifierEyebrow: ALONE_EYEBROW,
    // THE ONE CLAIM NEITHER OTHER BAND CAN MAKE, and the reason this slide is not just
    // a nicer org chart: authority and proximity are both POSITIONS, and either could
    // in principle be delegated or reorganised. Being copied cannot be. "because they
    // watched you do it" is the mechanism stated plainly — it is not influence, it is
    // observation — and it is what turns the rest of the deck's asks into things the
    // room can only do by doing them first.
    qualifier: "And the only one your people will copy, because they watched you do it.",
    qualifierKw: ["will copy"],
    claimBeat: 2,
  },
  {
    id: "teams",
    label: "THE TEAMS",
    holdsEyebrow: HOLDS_EYEBROW,
    // "every workaround already in use" IS THE KEYWORD AND THE ROW'S REASON FOR
    // EXISTING. Work and exceptions are what a leader expects the teams to hold; the
    // workarounds are the ones nobody upstairs has an inventory of, and `already`
    // is the load-bearing word — they are not a risk to be prevented, they are a fact
    // that predates the meeting.
    holds: "Holds the work, the exceptions and every workaround already in use.",
    holdsKw: ["every workaround already in use"],
    qualifierEyebrow: CANNOT_EYEBROW,
    // "Cannot authorise" AND NOT "is not allowed to" — British spelling, matching the
    // leader tree's own rendered prose (`organisation` appears ten times across the
    // four leader content modules; the only American forms in rendered leader copy are
    // inside quoted programme titles). AND IT IS A CANNOT, NOT A WON'T: the teams are
    // not reluctant, they are unauthorised, which is the exact symmetry with the top's
    // "Cannot see" — two structural facts, neither of them anybody's fault.
    qualifier: "Cannot authorise a change to how any of it is done.",
    qualifierKw: ["Cannot authorise"],
    claimBeat: 1,
  },
];

// ───────────────────── shared copy ─────────────────────

export const shapeMiddleOutContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from the
   *  composed deck (§3.5) and are authored nowhere. It is the shortest `figLabel` in
   *  the leader tree because it is a NAME rather than a description — the room hears
   *  "middle-out" and the three bands under it are the definition. */
  figLabel: "MIDDLE-OUT",

  /**
   * The standing kicker — on the stage at every pose, and the sentence that stops the
   * chart being about somebody else.
   *
   * IT IS THE SLIDE'S ONE PIECE OF ADDRESSING and it stands from the first pose, before
   * any claim lands, so that the room reads all three bands already knowing which one
   * it is in. A kicker that arrived with the middle band's claim would let the room
   * spend two beats deciding whether this is a diagram about them or about a layer of
   * management they are being asked to manage.
   *
   * MONO UPPERCASE, so keyword-free — the register's `textTransform` makes storing it
   * uppercase a no-op on the stage, and it is never quoted in prose, so the data reads
   * as the stage does (the same call `kicker` in the block above makes, and the
   * opposite of that block's `hubLabel`, which IS quoted).
   */
  kicker: "THE MIDDLE IS THIS ROOM",

  /**
   * The claim, refused half first.
   *
   * SHORTENED FOR MEASURED FIT, and the header records the arithmetic in full: the
   * drafted line ("Adoption does not come down from the top. It spreads out from the
   * middle.") measures 1311.22px against a 1184px row with the Georgia fallback, and a
   * wrapped headline lands on the kicker's shelf. This one is 1004.92px on the same
   * face and 778.33px with Instrument Serif — one line under either.
   *
   * "top-down" IS THE TERM OF ART FOR THE THING BEING REFUSED, and pairing it with
   * `figLabel` is what makes the two halves a matched pair rather than a sentence and
   * a slogan. It is also this slide's word to spend: the trio top-down / bottom-up /
   * middle-out is the middle-out argument's own vocabulary, and no other slide in the
   * deck uses any of the three.
   */
  headline: "Adoption is not top-down. It spreads out from the middle.",
  /** The mandated highlight, on the asserted half rather than the refused one — the
   *  room already agrees that top-down does not work, and the italic is the last thing
   *  it takes away. */
  headlineKw: ["spreads out from the middle"],

  bands: BANDS,

  /**
   * The mono LABEL over the two translations, and it sits level with the MIDDLE band —
   * between the two direction lines rather than above either of them.
   *
   * ONE EYEBROW FOR BOTH, AND ITS POSITION IS THE ARGUMENT. `./middle-out-geometry.ts`
   * places it on the middle band's own centre line, with one translation set high
   * beside the top band and one set low beside the bottom band, so the label is at the
   * ORIGIN of both. Two eyebrows — one over each — would have had to name the two
   * directions, and "UPWARD" / "DOWNWARD" printed as headings is the closest this
   * stage could come to drawing a scale by accident (guardrail 6).
   *
   * "TWO" IS SPELLED, not a digit — nothing on this stage carries a numeral (guardrail
   * 2), and the sibling block's "Six pillars move together" is the shipped precedent
   * for a counted word in leader copy.
   */
  translationEyebrow: "THE TWO TRANSLATIONS",

  /**
   * The downward translation — a mandate into work. PROSE.
   *
   * IT PICKS THE TOP BAND'S KEYWORD BACK UP BY NAME. The board "Holds the mandate";
   * this line is what happens to it. The room has therefore already been told that the
   * mandate exists and where it comes from, so the only new information here is the
   * verb — and the verb is the job.
   *
   * "what someone actually does on Monday" AND NOT "execution" OR "implementation".
   * The abstraction is what every leader already agrees to; the ordinary day is what
   * they have to change. `on Monday` is also the pair to the top band's `on a Tuesday`
   * — the same unit, seen from the two ends of it.
   */
  downward: "You turn a mandate into what someone actually does on Monday.",
  downwardKw: ["what someone actually does"],

  /**
   * The upward translation — work into the next decision. PROSE, and the mirror of the
   * line above it.
   *
   * "what they hit" AND NOT "feedback" OR "insight". What travels up is an obstruction
   * somebody ran into, not a report somebody wrote, and the difference is the reason
   * the trip upward is worth making at all.
   *
   * "the next decision made above you" IS THE KEYWORD AND IT IS DELIBERATELY NOT "your
   * decision". The block at the top of this file spends six beats on decisions that
   * are ON this room's desk; this line is about the ones that are not, and the room's
   * hold over those is exactly this translation. Same noun, inverted referent — see the
   * collision census in the header.
   */
  upward: "You turn what they hit on Monday into the next decision made above you.",
  upwardKw: ["the next decision"],

  /**
   * The closer, and the sentence the whole chart exists to earn. PROSE.
   *
   * IT IS THE ONLY FIRST-PERSON WORD ON THE STAGE, and it is a refusal. "through me"
   * is the presenter, standing at the front of a room full of division heads, saying
   * that the presentation is not the delivery mechanism — which is the one thing a
   * deck cannot say by argument and can only say by disclaiming itself. Every slide
   * before this one asks the room for something; this line says who it will actually
   * reach if the room does nothing.
   *
   * IT NAMES NO SLIDE, NO SECTION AND NOTHING AFTER IT. "Nothing in this room" and
   * never "nothing in this deck" or "the next four slides": the run is composed per
   * deck set (§3.4 R2) and a closer that counted its own successors would go stale the
   * first time one was inserted or cut.
   */
  closer: "Nothing in this room reaches your teams through me. It reaches them through you.",
  /** One keyword, on the second sentence — the sentence that hands the job over. The
   *  first sentence is the refusal and needs no emphasis; "through you" is the only
   *  phrase here addressed to the person in the chair. */
  closerKw: ["through you"],
} as const;
