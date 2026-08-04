// Section THE SHAPE — every string C.1 prints, and the one axis it varies on.
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
// THE KEYWORD RULE. `kw` goes on PROSE ONLY, and this slide now has THREE prose
// registers: the headline, the six pillar DECISIONS, and the closer. Each of them
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
