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
// of this file's two blocks — has FOUR prose registers: the headline, the six pillar
// DECISIONS, the panel's idle lead, and the closer. (MIDDLE-OUT states its own census
// in its own header.) Each of them carries a `*Kw` sibling. Everything else is the
// mono LABEL register — the hub's two lines, the six pillar labels, the six point
// lists, the six recap fragments, `decisionEyebrow`, `recapEyebrow`, `idleEyebrow`,
// `hint`, and the beat counter {@link decisionCounter} builds out of it — where a
// copper italic reads as a rendering fault, so none of them has a `*Kw` sibling and
// none of them may gain one. The counter is the sharpest case, because it is
// GENERATED rather than authored: a highlight inside "THE DECISION · 03 / 06" would
// be an emphasis on arithmetic. `tests/unit/shape-agentic-org.test.tsx` holds the two
// registers apart as lists, so a new string has to pick a side.
//
// THE SIX RECAP FRAGMENTS ARE IN THE LABEL REGISTER AND THEY ARE SERIF — the one
// place on this slide where those two come apart, so it is worth saying why. They are
// set in the reading face because they are sentence fragments and a mono fragment
// reads as a filename; they carry no keyword because a fragment IS the emphasis —
// six of them stacked under one stem, each one already the object of its own
// decision, and an italic inside one would be emphasis on emphasis.
//
// WHAT SHIPPED HERE, AND WHAT IS STILL REFUSED. The previous ticket listed three
// items as deferred; two of them are now written. The list is kept — with the
// previous ticket's own numbering, so the two can be read against each other —
// rather than deleted, because a list that only ever loses rows tells the next
// author nothing about why the remaining ones are missing.
//
//   1. THE SIX LEADER DECISIONS — SHIPPED, one per pillar, on `Pillar.decision`
//      with its `decisionKw` sibling, in the ring order the array below holds.
//      §6.6 spends the space the HR original's panel used on exactly this: copy that
//      names the leader's DECISION in each pillar, which is what turns the
//      centrepiece into the index for the section behind it. Each one now arrives
//      with `Pillar.points` — HR p4's own sub-bullets — and `Pillar.recap`, the
//      fragment the last pose prints.
//   2. THE CLOSER — SHIPPED (`closer` / `closerKw`), now the last line of the recap
//      rather than a pose of its own. It sits in the right column and not the bottom
//      strip; §7.1 forced that and `WALK_COLUMN` in `./geometry.ts` records why in
//      numbers.
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
  /**
   * WHAT IS ACTUALLY UNDER THE PILLAR — HR p4's own sub-bullets, and the reason this
   * slide can be opened rather than only read.
   *
   * THE DECISION IS THE ARGUMENT; THIS IS THE EVIDENCE FOR IT. "You decide where the
   * data may go" is a claim about the leader's desk, and a Div Head's next question
   * is always the same one — *what does that actually cover?* Four nouns answer it in
   * the time it takes to read them, and they are the difference between a diagram the
   * room agrees with and a diagram the room can act on. They were not authored for
   * this deck: HR p4 lists them under each pillar, and printing anything else here
   * would be inventing a scope for a pillar that already has one.
   *
   * THREE OR FOUR, NEVER MORE. HR p4 gives Governance four and the other five three,
   * and the asymmetry is kept rather than padded — a fourth line invented for Tools
   * so the six lists match would be a scope nobody wrote. The panel is measured for
   * four ({@link WALK_COLUMN} in `./geometry.ts`), so four is the ceiling and a fifth
   * would run the list into the figure's own floor.
   *
   * MONO LABEL REGISTER, so keyword-free: these are names of things, not sentences
   * about them, and a copper italic inside "Data privacy" would emphasise a word in a
   * two-word noun phrase.
   *
   * NO VENDOR IS NAMED, and that is a deviation from HR p4 rather than a
   * transcription slip. HR p4's Tools list opens "Claude + Gemini ecosystem"; §6.7's
   * security block refuses every vendor token by name for a Sinar Mas audience — none
   * of `Claude`, `Anthropic`, `Gemini`, `Google`, `Copilot`, `Microsoft` — and a
   * centrepiece that printed two of them four slides ahead of that refusal would make
   * the refusal look like an oversight. The scope survives without the brands; see
   * the Tools pillar below.
   */
  points: readonly string[];
  /**
   * THE DECISION IN ONE FRAGMENT — what the recap pose prints, six of them under one
   * shared stem.
   *
   * IT IS THE OBJECT OF THE DECISION AND NOT A SUMMARY OF IT. The recap sets "YOU
   * DECIDE" once, as the panel's eyebrow, and lists six answers under it: *where the
   * data may go · who gets a company-managed seat · whether the culture rewards or
   * waits · …*. That is the drumbeat the six decisions build, collapsed into the one
   * frame the room leaves with — and it only works if every fragment completes the
   * same stem, so each one starts with an interrogative or a preposition and none of
   * them is a sentence.
   *
   * IT MUST CARRY ITS DECISION'S ANCHOR WORD (§6.6). `data`, `company-managed seat`,
   * `culture`, `pilot`, `signs`, `agent` — these are the words a leader hears again
   * in section D and in the ladder, and the recap is the LAST place they are said. A
   * fragment polished free of its anchor would leave the slide indexing nothing at
   * exactly the moment the index is being handed over; the test holds each fragment
   * to the anchor its decision already carries.
   *
   * NOT DERIVED FROM `decisionKw`, though four of the six would survive the
   * derivation. The keyword is chosen for what should go copper INSIDE a full
   * sentence, and the fragment is chosen for what reads alone in a list — "the culture
   * rewards" is the right emphasis in context and an unfinished thought out of it. Two
   * jobs, two fields, and the test holds them to the same anchors rather than to each
   * other.
   */
  recap: string;
}

/**
 * HR p4's six pillars, in RING ORDER — which is the READING order, not the order HR
 * p4 prints them in.
 *
 * HR p4 reads: People & Mindset · AI Companions · Process & Methodology · Tools &
 * Platform · Strategy & Leadership · Governance & Policies. This array reads
 * Governance · Tools · People · Strategy · Process · Companions, and the
 * difference is a teaching decision the owner approved along with variant A on a
 * browser walkthrough of all six #16 prototypes: the two pillars section D opens on
 * (§6.6 — security and no-SOP land on *Governance & Policies*, subscriptions on
 * *Tools & Platform*) take twelve and two o'clock, so the centrepiece hands straight
 * over to the section after it.
 *
 * THE ORDER STILL MATTERS WITH THE WALK GONE, and it is worth saying which half
 * survives. It no longer decides what is said FIRST — the pointer does that, and a
 * room that asks about seats gets seats. It still decides what is READ first: index 0
 * is twelve o'clock, index 1 is the top right, and a ring is scanned clockwise from
 * the top by everyone. It also still decides the RECAP's order, which is the one
 * place on this slide where all six are stated in sequence.
 *
 * ONE ORDER ARRAY, NOT TWO. A second array holding "HR p4's printed order" would
 * exist only to be out of step with this one, and nothing on the slide renders
 * it — the ring, the labels, the panel and the recap all index THIS array.
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
    //
    // AND SINCE B.2'S 2026-08-11 FRAY REDESIGN, THIS IS THE DECK'S ONLY RENDERED
    // SPELLING OF THE VERB: B.2 draws the improvisation (a stopped rollout line
    // fraying into private hairlines) rather than spelling it, so the sibling tests
    // that reserve `improvis` to a rendered corpus fire the pattern against THIS
    // line now — `shape-middle-out.test.tsx` records the move.
    decision: "You decide where the data may go — and you write it down before someone improvises.",
    decisionKw: ["where the data may go"],
    // HR p4's four, verbatim, and the only pillar that gets four. "Cost control" is
    // the one a governance list is usually missing and the one a Div Head recognises
    // fastest — it is also what makes D.5's subscription argument a governance
    // question rather than a procurement one.
    points: ["Risk management", "Data privacy", "Responsible AI use", "Cost control"],
    recap: "where the data may go",
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
    // HR p4's three, with its first line DE-BRANDED. The original reads "Claude +
    // Gemini ecosystem"; §6.7's security block refuses every vendor token by name for
    // this audience, so the two brands are dropped and the claim they were carrying —
    // that there is ONE approved set of models rather than whatever each person
    // signed up for — is what is kept. "One approved model ecosystem" is also the
    // stronger line for a leader: the decision is the approving, not the vendor.
    points: [
      "One approved model ecosystem",
      "Automation & connectors",
      "Infrastructure & access",
    ],
    recap: "who gets a company-managed seat",
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
    // HR p4's three, verbatim. "AI Champions per dept" is the one that names a
    // structure rather than a mood, and it is the pillar's whole answer to *what does
    // culture cost me?* — a named person per division, which is a headcount decision
    // and therefore this room's.
    points: ["AI Champions per dept", "Growth mindset culture", "Knowledge & learning"],
    // "or waits" AND NOT "the person who tries it": the contrast is the decision. A
    // fragment that named only the rewarded half would read as a policy the room
    // already has, and lose the point that rewarding the person who waits is also a
    // decision, made by default.
    recap: "whether the culture rewards or waits",
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
    // HR p4's three, verbatim, and all three are things only this room can supply.
    // They are also the three D.3's 30-day proof asks for by another name: a sponsor,
    // a budget line, and a stated reason.
    points: ["Executive sponsorship", "Investment commitment", "Clear AI vision"],
    recap: "which problem gets the pilot",
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
    // HR p4's three, verbatim — and note what is NOT here. The original's process
    // pillar is the one #16's pointer line pointed at Specify · Generate · Verify;
    // those three words are refused on this stage by §6.6 and by a test (item 3 at
    // the top of this file), and HR p4's own three sub-bullets say the process thing
    // without them.
    points: ["Adoption framework", "Change management", "Structured pilots"],
    recap: "where a human still signs",
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
    // HR p4's three, verbatim, and the third one is the crossing the decision above
    // names: "Tool → Companion → Agent" is B.5's ladder in three words, and it is the
    // only place on this slide where a sequence is printed as a sequence. It is NOT
    // the refused panel — that one is Specify → Generate → Verify, a method, and this
    // is a threshold. The arrows are the same and nothing else is.
    points: [
      "Human–AI collaboration",
      "Agents in every workflow",
      "Tool → Companion → Agent",
    ],
    // "becomes" AND NOT the decision's "is allowed to become": the permission is
    // carried by the stem ("YOU DECIDE …") once the fragment is standing under it, and
    // repeating it would make this the only recap line with two verbs in it.
    recap: "when a tool becomes an agent",
  },
];

// ───────────────────── shared copy ─────────────────────

export const shapeOrgContent = {
  figLabel: "THE AGENTIC ORGANIZATION",

  headline: "Six pillars move together, or none of them move.",
  /** The headline's highlight — the first of the slide's four prose registers,
   *  and the only one that is on the stage at both poses. */
  headlineKw: ["move together"],

  // THERE IS NO `kicker`, AND ITS ABSENCE IS AUTHORED. The nine-pose version of this
  // slide printed a standing mono line under the headline — "AN OPERATING MODEL — NOT
  // A DEPARTMENT, NOT A COMMITTEE" — at every pose, in the band at y = 134. It is cut,
  // owner call (2026-08-13), and cut rather than moved: the same words re-set in the
  // panel would be the same slot spent in a quieter place, and the panel's own idle
  // lead below already says what shape this is. What the deletion buys is the top of
  // the stage: the headline now stands alone over the figure, which is the one thing a
  // room reads before the diagram resolves.
  //
  // `KICKER_TOP` WENT WITH IT (`./geometry.ts`), so nothing is left pointing at an
  // empty band, and `tests/unit/shape-agentic-org.test.tsx` asserts the string is
  // absent from the stage rather than merely unrendered — a field left here "for
  // later" is how deleted copy comes back.

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
   * The panel's eyebrow while a pillar is open — the mono label standing over every
   * decision.
   *
   * SINGULAR, and it stays singular however the pillar was opened. "THE DECISIONS"
   * would make the panel a list, and the panel holds exactly one at a time — which is
   * what the counter beside it then quantifies.
   *
   * IT SURVIVED THE WALK IT WAS WRITTEN FOR, and the counter with it. Under nine
   * poses "03 / 06" told the presenter where they were in a fixed sequence; under the
   * pointer there is no sequence, and it now tells the room something better — that
   * the thing they are reading is one of exactly six, so a pillar opened out of order
   * still arrives with its denominator. That is the half of the retired walk worth
   * keeping.
   *
   * STORED UPPERCASE, unlike `hubLabel`: it is never quoted in prose —
   * {@link decisionCounter} composes the printed line out of it and the tests read
   * that line, not this field — so the register's `textTransform` is a no-op on it and
   * the data reads as the stage does. Mono label, so keyword-free.
   */
  decisionEyebrow: "THE DECISION",

  /**
   * The panel's eyebrow with nothing open — what the six boxes ARE, before any one of
   * them is read.
   *
   * IT NAMES THE FIGURE RATHER THAN THE INTERACTION. "SIX PILLARS · ONE ENABLER" is
   * the diagram said in four words, so a room that never touches the slide still
   * leaves with the shape; the line that explains the pointer is {@link hint} below,
   * and it is separate because it is the only string here that stops being true once
   * it has been obeyed. Mono label, so keyword-free.
   */
  idleEyebrow: "SIX PILLARS · ONE ENABLER",

  /**
   * The panel's idle lead — the prose that stands in the panel until a pillar is
   * opened.
   *
   * IT IS THE HEADLINE'S PROOF, NOT ITS ECHO. "Six pillars move together, or none of
   * them move" is a claim; this is the mechanism under it — one enabling function,
   * six pillars that only work in company. A leader who reads only these two lines
   * has the argument.
   *
   * IT DOES NOT SPEND THE CLOSER. "None of them is a tool purchase" is the recap's
   * last line and the sentence the whole figure exists to earn; an idle lead that
   * previewed it would make the recap a repeat. So this one describes the SHAPE and
   * the closer keeps the REFUSAL.
   *
   * AND IT IS NOT THE DELETED KICKER RE-SET IN A QUIETER PLACE. See the note where
   * `kicker` used to be: that line was cut, not moved, and reusing its words here
   * would be the move it was refused.
   */
  idleLead: "One enabling function at the centre. Six pillars that only work together.",
  /** Prose, so one keyword — on the dependency, which is the claim the ring makes and
   *  the only part of the sentence the diagram cannot draw on its own. */
  idleLeadKw: ["only work together"],

  /**
   * The one line on this stage that explains the pointer.
   *
   * IT EXISTS BECAUSE THE STEPS WENT AWAY. Under nine poses the six decisions arrived
   * whether or not anyone touched the slide; under two, they are reached by hovering
   * a box, and a figure that hides its content behind an ungestured interaction is a
   * figure that shows a room six labels and nothing else. One line, once.
   *
   * IT IS DROPPED THE INSTANT IT IS OBEYED — the component stops rendering it after
   * the first pillar is touched, rather than fading it or leaving it dim. An
   * instruction that is still on the stage after the reader has followed it is
   * chrome, and this deck spends no chrome.
   *
   * BOTH HALVES ARE NAMED, and the second one is the one nobody guesses: hover is
   * discoverable by accident, pin is not. Mono label at the panel's quietest tier, so
   * keyword-free.
   */
  hint: "HOVER A PILLAR TO OPEN IT · CLICK TO PIN",

  /**
   * The recap's eyebrow — and the STEM the six fragments under it complete.
   *
   * "YOU DECIDE" IS SAID ONCE HERE AND SIX TIMES NOWHERE. Every decision opens with
   * those two words (see `Pillar.decision`), and the drumbeat is the argument — but
   * six full sentences stacked in one column is a paragraph, and a room reads a
   * paragraph by skimming it. Lifting the stem into the eyebrow leaves six OBJECTS
   * under it, which is the same claim compressed into the one frame the room leaves
   * with: what you decide, six times, in a single glance.
   *
   * STORED UPPERCASE. Mono label, so keyword-free — and the `·` is the deck's own
   * separator, not a bullet.
   */
  recapEyebrow: "THE RECAP · YOU DECIDE",

  /**
   * The closer — the last line of the recap, and the sentence the whole figure exists
   * to earn.
   *
   * TWO SENTENCES, AND THE SECOND IS THE LOAD-BEARING ONE. "None of them is a tool
   * purchase" is the refusal §6.6's centrepiece is built to state: the six decisions
   * the room has just read are all things a leader signs, none of them is a line item
   * a vendor can deliver, and a division head who leaves this slide planning a
   * procurement has misread it. The first sentence alone would be a summary; the pair
   * is a claim.
   *
   * IT IS NO LONGER THE WHOLE OF THE LAST POSE, and that is this rewrite's one change
   * to it. The nine-pose version gave pose 8 to this sentence alone, standing in an
   * empty column — a thesis with its evidence already off the stage. It now stands
   * UNDER the six recap fragments, in the same panel, separated by a hairline: the
   * claim and the six things it is a claim about, in one frame. The words are
   * untouched.
   *
   * IT PRINTS IN THE RIGHT COLUMN, NOT THE BOTTOM STRIP — §7.1's recorded layout
   * risk, and `WALK_COLUMN` in `./geometry.ts` holds the arithmetic: the lowest
   * pillar's box already reaches y = 610 of a 632 floor and it GROWS when it is lit,
   * so there is no bottom strip to print a line of type into.
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
 * "THE DECISION · 03 / 06" — the counter, zero-padded, 1-based for the room.
 *
 * IT IS A DENOMINATOR NOW, NOT A POSITION. Under the retired nine-pose walk this told
 * the presenter where they were in a fixed sequence; the pointer has no sequence, and
 * what it says instead is better — that the thing being read is one of exactly six —
 * so a pillar opened out of order still arrives with its denominator. That is the half
 * of the walk worth keeping, and the reason this function was not deleted with it.
 *
 * ONE-BASED HERE AND ZERO-BASED EVERYWHERE ELSE, on purpose: the audience is
 * counting and the code is indexing, so the third pillar reads "03 / 06" on the stage
 * and is index 2 in `./walk.ts`. The conversion happens in this one function
 * rather than at the call site, because a `+ 1` in a renderer is a `+ 1` that gets
 * forgotten the second time the counter is printed.
 *
 * ZERO-PADDED so the string is the same width for all six. Unpadded, "3 / 6"
 * and "10 / 12" are different widths and the eyebrow above a left-aligned column
 * would be stable while the counter shifted — a 1px twitch at projection scale that
 * reads as the panel re-laying out on every hover, which is worse here than it was
 * under a walk: a hover happens far more often than a click.
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
 *         prototype's `Math.max(focus, 0) + 1` prints "01 / 06" with nothing open —
 *         a number for a pillar nobody asked about, under the idle copy. `./walk.ts`
 *         answers "which pillar, if any" and returns `NO_FOCUS` when the answer is
 *         none; a caller that passes that value straight in here has skipped the
 *         check, and a throw is how it finds out in a test instead of in a room.
 *         The renderer never can: all six blocks are mounted and each asks about its
 *         OWN index, so the argument is always a pillar that exists.
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
// ═══ REWORKED 2026-08-14. WHAT CHANGED AND WHY, because the block below no longer
// matches the one the paragraphs after it were written for. The shipped figure was
// three full-width text bands walked over FIVE poses with a reserved right-hand
// column that stood empty for four of them, and its faults were the ones a room sees
// first: it read as a wall of prose, the headline sat 12px off the figure's own mono
// title, and the five-pose walk spent four clicks laying out evidence nobody could
// take in as a picture. THE ARGUMENT IS UNCHANGED. What changed is that it is now
// DRAWN — three tier plates on the left, two arrowed acts leaving the middle plate in
// opposite directions, and three APPROACH cards on the right that name what each tier
// can and cannot do about adoption (top-down, middle-out, bottom-up) — and it arrives
// in ONE pose, with the thesis on a second. Six things follow from that:
//
//   · THE STANDING MONO KICKER IS GONE. "THE MIDDLE IS THIS ROOM" was a title under a
//     title. The addressing it carried is now a bright tag ON the middle plate, where
//     the room reads it against the row it is about instead of above the whole chart.
//   · THE TIERS ARE NAMED IN THE ROOM'S OWN WORDS: Top Management, Middle Management
//     (and the AI champions inside it), The Teams. The drafted "THE BOARD AND THE
//     C-SUITE" / "BU AND DIVISION HEADS" were org-chart formalities; these are what
//     the people in the chairs call each other.
//   · THE THREE APPROACHES ARE ON THE STAGE. The headline refuses top-down; the cards
//     say what is wrong with it AND with its opposite, which is the half the shipped
//     slide left the presenter to say out loud. Bottom-up is named and refused for the
//     right reason — deep knowledge, no authority — so the middle's claim lands as the
//     only remaining option rather than as a compliment.
//   · THE TWO TRANSLATIONS SURVIVE AS THE TWO ACTS, one mono label plus one prose line
//     each, beside the arrow that draws them. Same argument, a third of the words.
//   · THE THESIS IS REWRITTEN AND IT IS THE ONE CONTENT FIX THAT WAS OWED. See
//     {@link shapeMiddleOutContent.thesis}.
//   · THE MIDDLE PLATE IS TALLER THAN THE OTHER TWO, which the shipped geometry
//     forbade in as many words. It is taller because it carries one row the others do
//     not (the four things a champion has), and a chart whose MIDDLE row is the big one
//     is not a scale — a scale is monotonic. Guardrail 3 below is rewritten around
//     that, not quietly dropped.
//
// §6.6 gives this slide one line — "Middle-out adoption" — and one hard constraint,
// stated two paragraphs later against a different candidate: "Learn → Experiment →
// Build → Integrate → Own is OUT: it would be a THIRD ladder alongside L1–L5 and
// P0–P3." That refusal is about a maturity scale, not about this slide, and it is
// exactly what this slide is at risk of becoming. Everything below is written so
// that three organisational bands read as an ORG CHART and never as a scale.
//
// ═══ WHO IS BEING ARGUED WITH, CORRECTED 2026-08-14: THE ROOM IS MOSTLY TOP
// MANAGEMENT. The copy on this slide was written as if the audience were the middle —
// a standing kicker that read "THE MIDDLE IS THIS ROOM", a second-person "you" inside
// the middle plate's own claim, and an upward act that travelled to "the next decision
// made above you". Every one of those addresses the wrong chair, and in front of the
// people who actually sit in this room the middle plate's flattery reads as a slide
// about somebody else.
//
// SO THE ADDRESSING SITS ON THE TOP PLATE ({@link shapeMiddleOutContent.roomTag}) and
// the second person means the ROOM everywhere it appears: `your teams`, `your people`,
// `your mandate`, `your AI champions`. The middle plate is described in the third person,
// because that is where the room's own managers are — and the slide's ask follows from
// the geometry rather than from a compliment: you hold the mandate and cannot see the
// work or say how AI should change it, so the layer that can is the one this has to run
// through, and backing it is a decision only this room can take.
//
// THE ARGUMENT, IN ORDER. The top — this room — holds authority and no visibility. The
// bottom holds the work and no authority. The middle holds both, plus one thing neither
// of them holds: people who copy what it does. The two acts are what that middle
// performs, in both directions at once — a mandate downward into actual work, and
// actual work upward into the next decision this room makes.
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
//   3. NO ASCENT AND NO MONOTONIC PROGRESSION. `./middle-out-geometry.ts` gives all
//      three plates ONE left edge, ONE width and ONE placement rule, so no plate can be
//      indented, inset or narrowed to rank it, and there is no staircase and no arrow
//      BETWEEN plates. The one dimension that is not equal is the MIDDLE plate's height,
//      and it is unequal in the direction a scale cannot use: a scale grows in one
//      direction, so top < middle > bottom is the shape of an emphasis and not the shape
//      of a ladder. The extra height is spent on ONE extra row of copy that only the
//      middle tier has ({@link shapeMiddleOutContent.middleChips}) — earned by content,
//      not handed out as prominence — and the two outer plates are identical to the
//      pixel.
//   4. THE TWO ACTS ARE SIMULTANEOUS AND BIDIRECTIONAL. One arrow down, one arrow up,
//      arriving on the same pose, drawn the same length, leaving from ONE origin bar on
//      the middle plate's own centre line and offset in x so they can never read as one
//      axis with a stop in it. That is TRANSLATION, in the one channel a still frame can
//      carry it: the arrowheads point AWAY from the room, in both directions at once.
//   5. THE MIDDLE IS RANKED BY COLOUR AND BY ONE ROW OF COPY, NEVER BY OPACITY. Its
//      plate and its approach card light to a brighter tier on the copper/neutral ramp;
//      opacity on this stage means "has not arrived yet", i.e. TIME, and every plate
//      arrives on the same pose. Ranking the middle ABOVE the top is the argument
//      rendered as colour, and the two outer plates lose nothing for it (§7.1 —
//      attention is bought with added light, never subtracted).
//   6. THE VOCABULARY IS REFUSED BY WORD. None of `level`, `levels`, `maturity`,
//      `stage`, `stages`, `rung`, `tier`, `tiers`, `ladder`, `step`, `L1`–`L5`,
//      `P0`–`P3` or `phase` appears in any rendered string in any form. That list is
//      not decoration: `gap-capability-ladder` owns L1–L5 and `mandate-phases-gates`
//      owns P0–P3, and a single borrowed noun here would make the room start counting.
//
//      NOTE THE WORD `tier` IS FORBIDDEN IN RENDERED COPY AND USED FREELY IN THE CODE
//      — the plates are `tiers` in every module under this directory. That is the same
//      split `shape-tam-kotter` keeps for `step`: what the room reads is the rule, and
//      an identifier is not read out loud.
//
//      THE ONE CASUALTY IS WORTH NAMING, AND IT IS OLDER THAN THE 2026-08-14 REWORK.
//      The top tier was first drafted as "THE BOARD AND THE C-LEVEL", which is the
//      ordinary business term and which rule 6 forbids — `C-LEVEL` matches `\blevel\b`,
//      the hyphen being a word boundary. It shipped as "THE BOARD AND THE C-SUITE" and
//      is now "TOP MANAGEMENT", which is what this room says; the note survives so the
//      next author does not "restore" the original.
//
// ═══ THE HEADLINE IS A MEASURED FIT AND SURVIVED THE REWORK UNCHANGED. It was drafted
// as "Adoption does not come down from the top. It spreads out from the middle." and
// that line DOES NOT FIT: measured as a `white-space: nowrap` clone under the real
// cascade in Chromium it is over 1300px with the Georgia fallback against
// `.slide-headline-row`'s 1184px measure, so it wraps the moment the Google Fonts CDN
// is absent — which is not a hypothetical for an auditorium.
//
// The shipped line re-measures at **801.16px with Instrument Serif and 1027.72px with
// the Georgia fallback** (2026-08-14, both faces warmed and confirmed loaded before
// measuring), which is 87% of the measure on the WIDE face and one line under both. It
// keeps the claim exactly: the model being refused is named ("top-down"), the model
// being asserted is the one `figLabel` already announces, and the mandated keyword is
// untouched. See `HEADLINE_BUDGET_CHARS` in `./middle-out-geometry.ts` for the same
// arithmetic as a number a test can hold.
//
// THE SHELF IT USED TO THREATEN IS GONE. A wrapped headline used to paint through the
// standing kicker at y = 134; there is no kicker now and the figure starts at y = 160,
// so the failure mode is milder than it was — which is exactly why the budget stays
// written down rather than being relaxed.
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
//     file and in the same run. Nothing below opens on that stem or echoes that closer,
//     and the word `decision` is not spent below AT ALL. It was, once — the upward act
//     ended on "the next decision this room makes" — and the 2026-08-14 rewrite put both
//     acts in the middle's own hands, which returned the noun to C.1 outright.
//   · `NAME A CHAMPION` → `leader-mandate`'s K.3 lever, AND THIS ONE OVERLAP SHIPS
//     DELIBERATELY. {@link shapeMiddleOutContent.middleSubname} calls the middle tier
//     "YOUR AI CHAMPIONS" because that is the term the room already uses and the term
//     the reference figure this slide was reworked against uses. C.4 names the PEOPLE;
//     K.3, six sections later, asks the room to name ONE of them and protect their
//     hours. A term the room has already met is what makes that ask land, so the order
//     is the argument: this is a setup, not an echo. It is the only shared noun with any
//     slide in the deck and it is recorded here so a future reader does not "fix" it.
//   · "The hardest part is not the tools." AND THE 70/30 → `gap-hardest-part`'s. The
//     word `tools` appears nowhere below, and no percentage does either.
//   · "Nobody wrote the rule. So everybody wrote their own." → `gap-no-sop`'s, and
//     `improvises` → §6.2's beat, rendered only by C.1's governance decision at the
//     top of this file since B.2's 2026-08-11 fray redesign. Nothing below uses
//     either. Note also that B.2's `issuedEyebrow` is "WHAT THE ORGANISATION HANDED
//     OUT", which is why the headline below does NOT read "Adoption is not handed
//     down" — a good line, cut for that collision alone.
//   · "on the Tuesday after the room empties" → `leader-mandate/content.ts`'s, AND THE
//     OVERLAP IS GONE. This slide used to spend the weekday motif three times — "on a
//     Tuesday" on the top plate and "on Monday" in both translations — and all three
//     were rewritten on 2026-08-14 for being a riddle rather than a measurement (see
//     {@link shapeMiddleOutContent.upGloss}). The ordinary working day is still this
//     slide's unit; it is now named "each day" and "at work", which no other slide in
//     the deck owns. Section K keeps its named day to itself.
//
// ═══ THE KEYWORD RULE, with THREE registers now and no exception made: `kw` on PROSE
// ONLY.
//
//   · PROSE, each with a `*Kw` sibling — TEN strings: `headline`, the three tiers'
//     `holds`, the three tiers' `limit`, `upGloss`, `downGloss` and `thesis`.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — the mono caps
//     register: `figLabel`, the three tier `name`s, `middleSubname`, `middleTag`,
//     `middleChips`, the tiers' two eyebrows (three distinct values: HOLDS, CANNOT,
//     ONLY), the three `approach` names and the two act labels.
//     THE TIER NAMES ARE THE CASE WORTH STATING, because they are the only mono
//     strings on this stage a reader might mistake for prose: they are the chart's
//     row names, they are what rule 1 above puts in place of an index, and a copper
//     italic inside one would emphasise a fragment of somebody's job title.
//   · CAPTIONS, a third register that also carries no `*Kw` — the three
//     `approachVerdict`s. They are two-clause verdicts of one line, and an italic
//     fragment inside a five-word verdict emphasises nothing while making the stage
//     look like it is trying to. The same call `shape-tam-kotter` makes for its own
//     captions, two blocks down this file.
//
// NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). As a derived and
// non-authoritative observation: this slide composes LAST in the `shape` run and prints
// C.4 today — which is precisely why neither value is written down anywhere, in this
// file or in the modules beside it. `FigLabel` takes a LABEL only.

// ───────────────────── the three tiers ─────────────────────

/** Exactly three, held by the TYPE — the fixed-length tuple idiom
 *  `leader-invest/content.ts` argues at length: a fourth entry's error lands ON the
 *  fourth entry, at the definition site, with no cast anywhere. Three is also the
 *  count `./middle-out-geometry.ts` derives `MIDDLE_TIER_INDEX` from, and an even
 *  count would leave that derivation without a whole number to land on. */
type Three<T> = readonly [T, T, T];

/**
 * The mono LABEL over a tier's FIRST claim row — what the tier has.
 *
 * ONE CONSTANT, THREE USES. All three tiers open on the same word, and that repetition
 * is the chart's spine: the room reads three answers to one question before it reads
 * anything else. Written once so the three cannot come to disagree.
 */
const HOLDS_EYEBROW = "HOLDS";

/**
 * The mono LABEL over the SECOND claim row on the two OUTER tiers — what the tier
 * cannot do.
 *
 * IT APPEARS TWICE AND THE MIDDLE TIER HAS NONE, which is the argument drawn in chrome
 * rather than said in a sentence: by the time the room reaches the middle plate it has
 * learned that every tier has a CANNOT, and the middle's never arrives.
 */
const CANNOT_EYEBROW = "CANNOT";

/**
 * The mono LABEL over the MIDDLE tier's second claim row — the row neither other tier
 * has.
 *
 * FIVE CHARACTERS, AND THE LENGTH IS LOAD-BEARING. The eyebrow gutter in
 * `./middle-out-geometry.ts` is `EYEBROW_WIDTH` = 72px, which is seven characters of
 * 11px mono at 0.22em tracking; "AND ALONE" measures 81.19px and does not fit, so the
 * conjunction was cut rather than the gutter widened — widening it costs the six claim
 * rows the measure that keeps every one of them on one line.
 *
 * IT SAYS "ONLY THIS TIER" AND NOT "AND ALSO". Against CANNOT it is an opposition
 * rather than a continuation, which is what the middle tier's second row is: the two
 * outer tiers are missing something, and this one has something they are.
 */
const ALONE_EYEBROW = "ALONE";

/** One row of the org chart, and one row of the approach panel beside it — the two are
 *  ONE object because the whole point of the rework is that they are the same fact seen
 *  twice: where you sit, and what that makes you able to do about adoption. */
export interface Tier {
  id: string;
  /**
   * WHO THIS TIER IS. A mono LABEL, keyword-free by the rule above.
   *
   * THIS IS WHAT STANDS IN PLACE OF AN INDEX. Guardrail 1 in the header forbids a
   * number, an ordinal or a letter on any tier, so the name is the tier's whole
   * identity — which is also why it is the plainest possible naming of each group and
   * carries no adjective. A reader who cannot place themselves in one of these three
   * rows within a second has been given a diagram instead of a chart.
   */
  name: string;
  /** {@link HOLDS_EYEBROW}, on every tier. Carried per tier rather than once on the
   *  block so the interface is uniform and the renderer needs no special case. */
  holdsEyebrow: string;
  /**
   * WHAT THIS TIER HAS. PROSE, so it carries a `*Kw` sibling.
   *
   * READS AS THE CONTINUATION OF ITS EYEBROW — "HOLDS · The mandate, the budget and the
   * air cover." — which is what lets the rows be phrases rather than sentences. The
   * shipped version of this slide opened all three rows on the word "Holds" UNDER an
   * eyebrow that already said HOLDS; deleting the repeated verb is most of why the new
   * plates fit one line each with slack to spare.
   */
  holds: string;
  holdsKw: readonly string[];
  /**
   * The mono LABEL over the second claim row — {@link CANNOT_EYEBROW} on the two outer
   * tiers, {@link ALONE_EYEBROW} on the middle.
   *
   * PER TIER, AND THAT IS THE POINT. It is the only field whose VALUE says which kind
   * of tier this is, and it is why {@link qualifier} below can be one field rather than
   * two optional ones.
   */
  qualifierEyebrow: string;
  /**
   * THE SECOND CLAIM ABOUT THIS TIER — a LIMIT on the two outer tiers, and on the
   * middle tier the thing neither of them has. PROSE.
   *
   * ONE FIELD AND NOT TWO OPTIONAL ONES (`limit?` / `surplus?`), because the SHAPE of
   * the argument is identical in all three tiers — a name, what it holds, and the one
   * further thing that is true of it — and only {@link qualifierEyebrow} says which
   * kind of second claim it is. Two optional fields would let a tier ship with neither
   * and render as a row that did not finish drawing, which on a projector is
   * indistinguishable from a slide that failed to load.
   */
  qualifier: string;
  qualifierKw: readonly string[];
  /**
   * THE ADOPTION APPROACH THIS TIER CAN RUN, as a mono LABEL: TOP-DOWN, MIDDLE-OUT,
   * BOTTOM-UP.
   *
   * THE TRIO IS THIS SLIDE'S OWN VOCABULARY and no other slide in the deck uses any of
   * the three. It is carried PER TIER rather than as a separate panel of three because
   * the mapping is the insight: an approach is not a strategy somebody picks off a
   * list, it is a consequence of where the person running it sits. A free-standing
   * table of three would let the room read them as three options of equal standing,
   * which is exactly the reading the headline refuses.
   *
   * AND IT IS WHY THE HEADLINE CAN BE SHORT. "Adoption is not top-down" names the
   * refused model; the card under the top plate says what is wrong with it, in four
   * words, where the room can check it against the plate beside it.
   */
  approach: string;
  /**
   * WHAT THAT APPROACH GETS YOU — a CAPTION, so no `*Kw` (see the keyword rule).
   *
   * TWO CLAUSES, NO VERB, ONE LINE. "Generic support. No depth." is the whole finding
   * about top-down adoption, and the two outer verdicts are deliberately the same
   * SHAPE as each other — one thing it has, one thing it lacks — so the middle's, which
   * lacks nothing, is the only one that breaks the pattern.
   */
  approachVerdict: string;
}

/**
 * The three tiers, in SPATIAL order — top of the stage first.
 *
 * THIS ARRAY IS THE CHART. Index 0 is drawn at the top, index 1 in the middle, index 2
 * at the bottom, and `./middle-out-geometry.ts` derives `MIDDLE_TIER_INDEX` from the
 * length rather than typing a 1 — so the row the whole slide is about is found by
 * arithmetic and cannot end up pointing at the wrong plate.
 *
 * THERE IS NO `claimBeat` FIELD ANY MORE, and its removal is the 2026-08-14 rework in
 * one line. The shipped slide argued the three tiers over three separate poses in a
 * teaching order that was NOT the spatial order (top, bottom, then the middle), which
 * is a good way to build an argument in speech and a bad way to draw one: for two of
 * the five poses the chart on the wall was a picture with holes in it. The whole figure
 * now arrives on one pose and the presenter — not the deck — chooses the order to speak
 * the three plates in.
 */
const TIERS: Three<Tier> = [
  {
    id: "top",
    // "TOP MANAGEMENT" AND NOT "THE BOARD AND THE C-SUITE". Same referent, and this is
    // the one the room says out loud; the formal version was an org-chart formality
    // that also cost 145px of a 604px row.
    name: "TOP MANAGEMENT",
    holdsEyebrow: HOLDS_EYEBROW,
    // "the air cover" IS THE THIRD ITEM ON PURPOSE. The mandate and the budget are
    // what a leader expects to see credited to the top and are therefore agreed with
    // before they are read; air cover is the one a division head has actually needed
    // and been grateful for, and it is what makes the row a fair account of the top
    // rather than a setup for the limit underneath it. The plate has to be RIGHT about
    // the top, or the room discounts everything under it.
    holds: "The mandate, the budget and the air cover.",
    // The keyword goes on the first item and not the last: the mandate is the object the
    // downward act later picks up by name ("Your mandate becomes …"), so the italic here is
    // the thing the room is asked to remember.
    //
    // CAPITALISED, BECAUSE `highlight()` MATCHES BYTES. This row lost its verb in the
    // rework — it used to read "Holds the mandate, …" and now opens on the noun — so a
    // lower-case "the mandate" matches nothing in the string and renders no italic at all,
    // silently. The unit test that caught it asserts every keyword is a real substring of
    // its own sentence, which is the only way this class of fault is visible without eyes
    // on the stage.
    holdsKw: ["The mandate"],
    qualifierEyebrow: CANNOT_EYEBROW,
    // TWO CANNOTS IN ONE LINE, AND THE SECOND ONE IS THE 2026-08-14 CORRECTION. The row
    // shipped as "See what your people actually do on a Tuesday." and was reported from the
    // stage as not straightforward: it named the visibility gap in a riddle (an ordinary
    // day, stood for by a weekday) and said nothing at all about the gap this room actually
    // has on this programme.
    //
    // WHAT THE ROOM CANNOT DO, PLAINLY. It cannot see the work — that is the old claim, said
    // without the riddle. And it cannot say HOW: this room can ask for AI, fast, and fund
    // it, and that is the whole of what a mandate carries. The method — which work, in what
    // order, changed how — is not knowable from here. It is known by the people in the work
    // and by the champions beside them, which is the plate underneath and the plate under
    // that.
    //
    // IT IS STILL NOT A COMPLAINT. Both halves are structural facts about where people sit,
    // not a criticism of anybody: a board that could see what every team does on an ordinary
    // day, and could specify the method as well, would be doing somebody else's job. The
    // moment this line becomes a grievance the slide stops being an org chart and the room
    // stops being the subject of it.
    //
    // "See" SURVIVES THE REWRITE ON PURPOSE. The middle plate answers the two outer limits
    // in the order the plates state them — near enough to SEE, senior enough to CHANGE — and
    // "change it" now appears on both this row and the middle's, which is the answer landing
    // on the objection in the same words.
    qualifier: "See your teams at work — or say how AI should change it.",
    // THE KEYWORD IS THE NEW HALF. The visibility gap is one this room already concedes; the
    // method gap is the one it has not been asked to concede, and it is what the rest of the
    // figure is about.
    qualifierKw: ["how AI should change it"],
    approach: "TOP-DOWN",
    approachVerdict: "Generic support. No depth.",
  },
  {
    id: "middle",
    // "MIDDLE MANAGEMENT" — the room, named in the room's own words. The champions
    // ({@link shapeMiddleOutContent.middleSubname}) print beside it rather than in it,
    // because not every middle manager is a champion and the plate has to stay a
    // description of a LAYER.
    name: "MIDDLE MANAGEMENT",
    holdsEyebrow: HOLDS_EYEBROW,
    // "Both" IS THE HINGE OF THE WHOLE SLIDE, and it works because the two plates it
    // refers to are on the stage at the same moment it is. The two clauses after the
    // dash are the two things the outer tiers are each missing, in the order the plates
    // say them: near enough to SEE (the top's limit), senior enough to CHANGE (the
    // teams'). Reading order is top → bottom → middle whatever the presenter does,
    // because the middle plate is the one the eye lands on last on a stage this size.
    holds: "Both — near enough to the work, senior enough to change it.",
    // TWO KEYWORDS AND NOT ONE, which is the only line on this stage that takes two.
    // The claim is a conjunction — either half alone is a tier that already exists —
    // so an italic on one half would emphasise exactly the wrong thing.
    holdsKw: ["near enough", "senior enough"],
    qualifierEyebrow: ALONE_EYEBROW,
    // THE ONE CLAIM NEITHER OTHER TIER CAN MAKE, and the reason this slide is not just
    // a nicer org chart: authority and proximity are both POSITIONS, and either could
    // in principle be delegated or reorganised. Being copied cannot be. "they watch it
    // work" is the mechanism stated plainly — it is not influence, it is observation.
    //
    // THIRD PERSON, AND THAT IS THE 2026-08-14 CORRECTION. This row read "they watched
    // YOU do it" while the room was assumed to be the middle; the room is top
    // management, so the "you" in `your people` is the room and the copying is
    // something the room's MANAGERS get and the room does not. That asymmetry is the
    // whole ask: the one lever this slide asks for is backing a layer whose authority
    // over Monday is already real.
    qualifier: "The one layer your people copy, because they watch it work.",
    qualifierKw: ["they watch it work"],
    approach: "MIDDLE-OUT",
    // THE ONLY VERDICT WITH A VERB IN IT, and the only one that names no absence. The
    // two outer cards are "one thing it has, one thing it lacks"; this one is the whole
    // argument in five words, and the shape of the sentence is what marks it out.
    approachVerdict: "Depth and authority. It moves both ways.",
  },
  {
    id: "teams",
    name: "THE TEAMS",
    holdsEyebrow: HOLDS_EYEBROW,
    // "every workaround already in use" IS THE KEYWORD AND THE ROW'S REASON FOR
    // EXISTING. Work and exceptions are what a leader expects the teams to hold; the
    // workarounds are the ones nobody upstairs has an inventory of, and `already` is
    // the load-bearing word — they are not a risk to be prevented, they are a fact
    // that predates the meeting.
    holds: "The work, the exceptions and every workaround already in use.",
    holdsKw: ["every workaround already in use"],
    qualifierEyebrow: CANNOT_EYEBROW,
    // "Authorise" AND NOT "is not allowed to" — British spelling, matching the leader
    // tree's own rendered prose. AND IT IS A CANNOT, NOT A WON'T: the teams are not
    // reluctant, they are unauthorised, which is the exact symmetry with the top's
    // CANNOT — two structural facts, neither of them anybody's fault. It is also the
    // whole of what is wrong with bottom-up adoption, which is what the card beside
    // this plate says.
    qualifier: "Authorise a change to how any of it is done.",
    qualifierKw: ["how any of it is done"],
    approach: "BOTTOM-UP",
    approachVerdict: "Deep knowledge. No authority.",
  },
];

// ───────────────────── shared copy ─────────────────────

export const shapeMiddleOutContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from the
   *  composed deck (§3.5) and are authored nowhere. It is the shortest `figLabel` in
   *  the leader tree because it is a NAME rather than a description — the room hears
   *  "middle-out" and the three plates under it are the definition. */
  figLabel: "MIDDLE-OUT",

  /**
   * The claim, refused half first.
   *
   * MEASURED, and the header records the arithmetic: 801.16px with Instrument Serif and
   * 1027.72px with the Georgia fallback against a 1184px row — one line under either
   * face, which is what keeps it off the figure below it.
   *
   * "top-down" IS THE TERM OF ART FOR THE THING BEING REFUSED, and pairing it with
   * `figLabel` is what makes the two halves a matched pair rather than a sentence and
   * a slogan. It is also this slide's word to spend: the trio top-down / bottom-up /
   * middle-out is the middle-out argument's own vocabulary, no other slide in the deck
   * uses any of the three, and all three now print on this stage as {@link
   * Tier.approach} — so the headline names the refused model and the figure convicts
   * it.
   */
  headline: "Adoption is not top-down. It spreads out from the middle.",
  /** The mandated highlight, on the asserted half rather than the refused one — the
   *  room already agrees that top-down does not work, and the italic is the last thing
   *  it takes away. */
  headlineKw: ["spreads out from the middle"],

  tiers: TIERS,

  /**
   * WHO THE MIDDLE TIER IS TO THIS PROGRAMME, printed beside its name: "YOUR AI
   * CHAMPIONS".
   *
   * BESIDE THE NAME AND NOT INSTEAD OF IT, because they are not the same set. The plate
   * is about a LAYER of the organisation; the champions are the people in that layer
   * who take the work on, and the possessive is doing the work — they are the room's
   * own people, named by the room, not a role the deck is inventing.
   *
   * IT IS ALSO THE ONE NOUN THIS SLIDE SHARES WITH ANY OTHER, and the collision census
   * in the header explains why that ships: K.3 asks the room to NAME a champion six
   * sections later, and an ask lands better on a word the room has already met.
   */
  middleSubname: "YOUR AI CHAMPIONS",

  /**
   * The addressing, as a bright tag at the right-hand end of the TOP plate's name row:
   * "THIS ROOM".
   *
   * ON THE TOP PLATE, AND THAT IS THE 2026-08-14 CORRECTION. The shipped slide carried a
   * standing mono kicker reading "THE MIDDLE IS THIS ROOM" — which was a title under a
   * title AND was addressing the wrong chairs. This deck's room is mostly TOP
   * MANAGEMENT, so the tag sits where the room sits, and the argument runs the honest
   * way round: you are the plate with the mandate and without the method, and the plate
   * that has both is the one under you.
   *
   * IT IS WHAT MAKES THE SLIDE AN ASK RATHER THAN A COMPLIMENT. A middle-out figure shown
   * to top management with no "you are here" on it is a diagram about somebody else, and
   * the room's honest response is to agree with it and do nothing.
   *
   * TWO WORDS AND NO VERB, deliberately: the tag's own placement asserts the relation the
   * old kicker spelled out, and a tag that argued would read as a caption.
   */
  roomTag: "THIS ROOM",

  /**
   * The four things the middle tier holds that no org chart shows — the row that makes
   * the middle plate the tallest of the three.
   *
   * FOUR NOUNS, MIDDOT-SEPARATED, NO VERB AND NO NUMERAL. They are the answer to the one
   * fair objection this room will make out loud: "why would this work through them rather
   * than through my announcement?" Mindset because they have to believe it; peer influence
   * because the people beside them are watching; authority because a change to Monday
   * needs signing for; credibility because they have done the work themselves.
   *
   * IT IS THE ONE ROW THE OUTER PLATES DO NOT HAVE, which is why the middle plate is
   * 28px taller than they are — the height is EARNED by copy rather than handed out as
   * emphasis (guardrail 3). Delete this string and the geometry re-cuts all three
   * plates to one height; that is the test to run before calling the middle plate's
   * extra height decorative.
   */
  middleChips: "MINDSET · PEER INFLUENCE · AUTHORITY · CREDIBILITY",

  /**
   * The UPWARD act's mono LABEL: "INFLUENCE UP".
   *
   * A VERB PHRASE AND NOT A DIRECTION. "UPWARD" as a heading would be a scale's axis
   * label (guardrail 6's spirit); "INFLUENCE UP" is something a person does at work on an
   * ordinary day, and the arrow beside it is what says which way that is.
   */
  upLabel: "INFLUENCE UP",
  /**
   * What travelling up actually consists of. PROSE.
   *
   * REWRITTEN 2026-08-14, WITH ITS PAIR, AND THE FAULT WAS SHARED. The two glosses read
   * "Their Monday becomes the next decision this room makes." and "Your mandate becomes
   * what someone does on Monday." — one metaphor, two nouns swapped around a copula, and
   * reported from the stage as not readable. A room gets about two seconds on a caption
   * beside an arrow, and "X becomes Y" spends both of them on working out what X is.
   *
   * BOTH GLOSSES NOW OPEN ON "They", WHICH IS THE FIGURE'S OWN CLAIM AS A SENTENCE. The
   * middle is the SUBJECT of both acts, in both directions, at once — which is what the two
   * arrowheads draw and what the old passive constructions hid. The arrow beside each line
   * says which way; the line says what the act consists of and nothing else.
   *
   * "what works, and what blocks it" AND NOT "feedback" OR "insight". What travels up is an
   * obstruction somebody ran into, not a report somebody filed, and the difference is the
   * reason the trip upward is worth making at all. It is also the half this room never
   * hears: the successes arrive on their own.
   *
   * IT ENDS AT "this room" AND NOT "above you", which is what it said while the audience was
   * assumed to be the middle — and it ECHOES {@link shapeMiddleOutContent.roomTag} on
   * purpose. "This room" appears twice on the stage, once as the tag on the top plate and
   * once as the destination of the upward arrow, and the two together are the whole reason
   * a top-management room is being shown a diagram whose bright row is not theirs.
   */
  upGloss: "They tell this room what works, and what blocks it.",
  upGlossKw: ["what blocks it"],

  /**
   * The DOWNWARD act's mono LABEL: "DRIVE DOWN". Same construction as the label above
   * it — a verb the room can be held to, not a compass bearing.
   */
  downLabel: "DRIVE DOWN",
  /**
   * What travelling down actually consists of. PROSE, and the mirror of the line above —
   * same subject, same shape, opposite direction. See the gloss above for why both were
   * rewritten on 2026-08-14.
   *
   * IT PICKS THE TOP PLATE'S KEYWORD BACK UP BY NAME, AND IN THE SECOND PERSON: the top
   * tier is this room and it holds "the mandate", so this line is what happens to YOUR
   * mandate. The room has already been told the mandate exists and that it owns it, so the
   * only new information here is the verb — and the verb is somebody else's job, which is
   * the ask.
   *
   * "daily work for the teams" AND NOT "execution" OR "implementation". The abstraction is
   * what every leader already agrees to; the ordinary day is what they have to change. IT
   * NAMES THE BOTTOM PLATE BY ITS OWN NAME, so the downward arrow visibly ends somewhere the
   * room can see on the same stage.
   *
   * AND IT IS MEASURED TO TWO LINES, which is why it does not read "…into what the teams do
   * each day": that draft wraps at exactly 172px of {@link ACT_TEXT_WIDTH} and leaves "day."
   * alone on a third line, beside a two-line gloss that does not. Both acts are two lines
   * now, opening on the same word, which is what makes the pair read as one claim.
   *
   * THE WEEKDAY MOTIF IS GONE FROM ALL THREE PLACES IT USED TO STAND — this line, the line
   * above it and the top plate's CANNOT. It was one image spent three times, and the room
   * had to decode it before it could read any of them.
   */
  downGloss: "They turn your mandate into daily work for the teams.",
  downGlossKw: ["daily work for the teams"],

  /**
   * THE THESIS — the sentence the whole figure exists to earn, and the one string on
   * this slide that was rewritten for what it SAID rather than for how it fitted.
   *
   * WHAT WAS WRONG WITH THE SHIPPED LINE. It read "Nothing in this room reaches your
   * teams through me. It reaches them through you." — and the first half is not true.
   * The person at the front of this room runs an AI catalyst workshop: knowledge,
   * technique and working habits DO reach the teams through them, and claiming
   * otherwise trades a real handover for a rhetorical one. The room can hear the
   * exaggeration, and a thesis the room can argue with is a thesis it does not carry
   * out of the door.
   *
   * WHAT THE NEW LINE CLAIMS INSTEAD, and it is the honest division of labour: the
   * facilitator can ARM the teams — that part is his and he will do it — and he cannot
   * make anybody USE it, because using it is a change to how Monday is done and the teams
   * cannot authorise one (which is the teams' plate, verbatim).
   *
   * AND IT ENDS ON THE MANAGERS RATHER THAN ON "YOU", WHICH IS THE 2026-08-14 CORRECTION
   * AND A LOGICAL FIX RATHER THAN A STYLISTIC ONE. The draft ended "adoption reaches them
   * through you" — written when the room was assumed to BE the middle. Said to a room of
   * top management, that sentence contradicts the headline directly over it: if adoption
   * reached the teams through the people holding the mandate, adoption would be top-down.
   * So the handover the brief asks for is kept and pointed at the act this room can
   * actually perform — backing the layer that has both halves. The route stays through the
   * room's decision; it does not run through the room's announcement.
   *
   * AND IT IS THREE CLAUSES NOW, NOT TWO SENTENCES — the second 2026-08-14 pass, and this
   * one was for LENGTH. The line ran 111 characters and 19 words, most of them spent on the
   * presenter: an "I can" and an "I cannot" in front of the only clause the room is in. A
   * thesis is the last thing on the stage and it is read, not studied.
   *
   * SO IT IS ONE CLAUSE PER PARTY, IN THE ORDER THEY ACT, AND EACH ONE IS A PLATE ON THE
   * FIGURE ABOVE IT: I build the foundation (nothing on the chart — the presenter is not in
   * this organisation), you empower them (the top plate, and the only act asked of it), they
   * drive the adoption (the middle plate, doing the one thing the teams cannot authorise).
   * The sentence walks the same three rows the figure draws, downward, and stops on the
   * result. "drive" IS THE RAIL'S OWN VERB — {@link shapeMiddleOutContent.downLabel} is
   * DRIVE DOWN — so the last clause is the figure's downward arrow said in words.
   *
   * "the foundation" CARRIES THE WHOLE OF THE OLD REFUSAL. "I cannot make them use it" was
   * an honest limit stated at length; "I build the foundation" is the same limit as a noun —
   * a foundation is what somebody else builds ON — and it leaves the two clauses that follow
   * to say who does the rest. Nothing is conceded and forty-odd characters are returned. It
   * is also the deck's own word for what the presenter actually delivers: §§E–F are the
   * FOUNDATION run, so the clause names a thing the room has already sat through.
   *
   * "You empower them" IS THE KEYWORD FOR THAT REASON — it is the only clause addressed to
   * the people in the chairs, the only act this slide asks them for, and the sentence K.3's
   * "NAME A CHAMPION" lever is later going to collect. "them" is the middle plate, and the
   * clause after it takes the same party as its subject, so the pronoun is resolved on the
   * stage rather than left hanging. The clause in front of it needs no emphasis; it is what
   * the presenter says about himself.
   *
   * IT NAMES NO SLIDE, NO SECTION AND NOTHING AFTER IT: the run is composed per deck set
   * (§3.4 R2) and a thesis that counted its own successors would go stale the first time
   * one was inserted or cut.
   */
  thesis: "I build the foundation. You empower them. They drive the adoption.",
  thesisKw: ["You empower them"],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// TAM AND KOTTER — §6.6's adoption/change-management frame, and the only slide in
// the leader deck that argues from published work rather than from this company.
// ═════════════════════════════════════════════════════════════════════════════
//
// §6.6 gives this slide one line — "Adoption/change-management frame" — and one
// sentence of context two paragraphs later: HR p15's four principles are NOT
// authored as a slide, and each backing is delivered natively instead, with
// "Kotter/TAM in C.3". So this block is one of those four backings, and its job is
// to hand the room a NAMED, CITABLE frame for the claim the slide behind it makes
// on its own authority. THE ATTRIBUTIONS ARE THE POINT AND NOT THE FOOTNOTE: every
// other slide in this run argues from what this group does, and a division head can
// discount all of it as one consultant's opinion. Two models with an author and a
// year on them cannot be discounted that way, which is the entire reason the year
// is on the stage rather than in a comment.
//
// WHO IS BEING ARGUED WITH, AND WHAT THE TWO HALVES DO. The leader deck's room is
// BU and Division Heads. The left frame explains why a PERSON starts — belief in
// usefulness, belief in ease, and the external conditions a leader actually sets.
// The right frame explains why an ORGANISATION stops — a sequence, run out of
// order, stalling. Neither is sufficient alone, and the line under both of them is
// the whole slide in one sentence.
//
// ═══ THE NO-THIRD-LADDER GUARDRAIL, AND THE SIX THINGS THAT HOLD IT. §6.6 refuses
// a third ordered vocabulary beside `gap-capability-ladder`'s L1–L5 and
// `mandate-phases-gates`'s P0–P3 in as many words, and the reference this slide was
// drawn from prints its five change steps as `01`…`05` badges on a rising
// staircase, which is exactly the object that refusal names. So the sequence ships
// and the SCALE does not, and each of these is checkable rather than asserted:
//
//   1. NO NUMERAL ON ANY LINK, and no ordinal FIELD for one to be printed from.
//      {@link ChainNode} carries an id, a label and a caption and nothing else;
//      there is no `step`, `order`, `index` or `badge` anywhere in this block for a
//      renderer to reach for, and adding one would be visible in a diff of five
//      lines.
//   2. NO RANK ACROSS THE FIVE. One colour tier for all five labels and one for all
//      five captions — `./components/TamKotterFrames.tsx` states that in its tier
//      table, and it is the same call `mandate-levers` makes about its four levers
//      for the same reason: a brighter first link, or five links fading out down
//      the frame, is a ladder drawn without a single digit.
//   3. NO ASCENT AND NO PROGRESSION IN THE GEOMETRY.
//      `./tam-kotter-geometry.ts` gives all five links the same height, the same
//      width and the same left edge, and places them at `i × pitch` — so no ONE
//      link can be indented, raised or grown relative to its neighbours. The five
//      are inset from the spine by a single shared constant, which is a property of
//      the chain and not of any link in it. Equal geometry is the anti-ladder
//      guarantee, and it lives in a geometry module precisely so a copy edit cannot
//      undo it.
//   4. ORDER IS CARRIED BY POSITION AND CONNECTORS ONLY: top-to-bottom placement,
//      4px rules and arrowheads, on both sides of the stage. The LEFT frame is a
//      causal chain and carries its own order that way; if that is enough to say
//      "external factors shape belief", it is enough to say "urgency comes before
//      coalition". The two halves differ in SHAPE — the left forks and merges, the
//      right runs one unbroken spine — and that difference is the two models', not
//      a ranking of the things inside either one.
//   5. THE VOCABULARY IS REFUSED BY WORD, with ONE stated exception. None of
//      `level`, `levels`, `maturity`, `rung`, `tier`, `tiers`, `ladder`, `L1`–`L5`,
//      `P0`–`P3` or `phase` appears in any rendered string below. `step` DOES —
//      twice, and both are load-bearing: the change model's own title is an
//      eight-step model, and the closer's claim is that leaders skip steps. Both
//      sit in the FRAME's chrome and in its verdict; neither is attached to a link,
//      and no link's label or caption contains the word. That is the difference
//      between naming somebody else's model and building a new one.
//   6. THE ORDER CLAIM IS COPY, NOT A SCALE. "The order matters" is a sentence in
//      {@link KOTTER_CLOSER}, said once, where the room can agree or disagree with
//      it. A numbered staircase would make the same claim structurally, everywhere,
//      permanently, and without saying it.
//
// ═══ THIS BLOCK PRINTS DIGITS, AND THE BLOCK ABOVE IT FORBIDS THEM. MIDDLE-OUT's
// guardrail 2 is "NO DIGIT IN ANY RENDERED STRING AT ALL", and this block breaks it
// three times: `1989`, `1996` and the `8` in the change model's title. The two rules
// are not in conflict, because they are protecting different things. Middle-out's
// stage is three stacked bands one careless number away from being a maturity scale,
// so it bans the character outright — an absence is testable in a way a list of
// forbidden values is not. This stage's numerals are all inside ATTRIBUTIONS: they
// are years and a published model's own name, they sit in the frame header where
// nothing is ordered, and not one of them is attached to a link, a node or a factor.
// A reader who finds a digit under this directory should check WHICH block it is in
// before deleting it, and this paragraph is why.
//
// ═══ NO BRAND AXIS, AND ISSUE #71 SAYS SO IN AS MANY WORDS: no brand slot,
// identical copy under both brands, do not invent variance. So this block exports no
// `…For(brand)` resolver and the slide file imports no `VARIANT` at all — the same
// call `shapeMiddleOutContent` makes at the top of this file's second block, and the
// same reasoning taken one step further: §4.4's seven brand × deckSet slots do not
// list this slide, and a PUBLISHED MODEL is nobody's local evidence at all. Davis
// (1989) says the same thing in both rooms, and a `Record<Brand, …>` here would be
// three byte-identical blocks — which is what a deck looks like on the day somebody
// edits one of them. What that buys is a test that mounts the stage under both
// leader brands and compares byte for byte.
//
// ═══ WHAT THIS SLIDE MAY NOT SAY, checked against RENDERED COPY on every side:
//
//   · "You decide …" ×6 AND "Every one of these is a decision on your desk." → THE
//     AGENTIC ORGANIZATION's, at the top of this same file and two slides ahead in
//     the same run. Nothing below opens on that stem, and the word `decision`
//     appears nowhere in this block. The nearest approach is the intention node's
//     "Decide to use", which is the model's own construct rendered in the model's
//     own two words, and reads as a label rather than as an ask.
//   · "Adoption is not top-down. It spreads out from the middle." AND the trio
//     top-down / bottom-up / middle-out → MIDDLE-OUT's, one slide behind this one.
//     None of the three words appears below, and the headline here deliberately
//     does NOT use the noun `adoption` in its claim — the two slides are adjacent,
//     and two headlines opening on the same noun would read as one slide that
//     re-rendered. `adoption` appears once, in the change model's attribution,
//     where it is describing what the model was condensed FOR.
//   · "The hardest part is not the tools." AND THE 70/30 → `gap-hardest-part`'s. The
//     word `tools` appears nowhere below and no percentage does either.
//   · "Nobody wrote the rule. So everybody wrote their own." → `gap-no-sop`'s.
//     Nothing below borrows it. `Training & support` is the nearest miss and is a
//     named factor of the acceptance model rather than a claim about this company.
//   · `mandate-levers`' four acts — Convene · Champion · Unblock access · Sustain
//     the rhythm — ARE what a leader pulls to move the external factors this slide
//     names, AND THAT OVERLAP SHIPS RATHER THAN BEING AN OVERSIGHT. It is the point:
//     §6.6 wants this frame to be the thing K.3's levers are pushing ON. So the
//     vocabulary is deliberately NOT shared — no `convene`, no `champion`, no
//     `unblock`, no `rhythm` below — and the connection is made by the room, in the
//     section behind this one, which is the only place it can be made honestly.
//
// ═══ THE KEYWORD RULE, applied with one register added and no exception made: `kw`
// on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — FOUR strings: `headline`, the two frames'
//     `closer`s, and `unifier`. Those four are the only sentences on this stage that
//     make a claim, and each takes one emphasis (the unifier takes two, because its
//     claim is a conjunction — the same call `shapeMiddleOutContent`'s middle band
//     records).
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — `figLabel`, the two
//     `frameLabel`s, and the nine {@link ChainNode} `label`s. Mono uppercase, where a
//     copper italic reads as a rendering fault.
//   · CAPTIONS, a THIRD register this block adds and which also carries no `*Kw` —
//     the nine node `caption`s and the four `factors`. They are 12px sans glosses of
//     one line, and an italic fragment inside a nine-word gloss emphasises nothing
//     while making the stage look like it is trying to. They are also the strings a
//     reader is most likely to mistake for prose, which is why they are named here.
//
//   NO `*Kw` ARRAY IN THIS BLOCK MAY NAME A MODEL, AN AUTHOR OR A FIGURE. Not `TAM`,
//   not `Kotter`, not `Davis`, and no letter or number of any kind: a highlight is an
//   emphasis inside a sentence the room is reading, and emphasising a proper name
//   would turn a citation into a slogan. The two attributions carry no `*Kw` at all,
//   which is how that rule is kept rather than merely stated.
//
// NO LETTER AND NO FIGURE NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). As a
// derived and non-authoritative observation: this slide inserts ahead of MIDDLE-OUT
// in §4.3's `shape` run and steps that slide one figure along without its file being
// opened — which is precisely why neither value is written down anywhere, here or in
// the three modules beside this one. `FigLabel` takes a LABEL only and the composer
// supplies the rest.

// ───────────────────── the two chains ─────────────────────

/** Exactly four, held by the TYPE — the fixed-length tuple idiom
 *  `leader-invest/content.ts` argues at length: a fifth entry's error lands ON the
 *  fifth entry, at the definition site, with no cast anywhere.
 *  `./tam-kotter-geometry.ts` reads `FACTOR_COUNT` off this length and lays the four
 *  out as a 2×2 block, so a fifth would have nowhere to go. */
type Four<T> = readonly [T, T, T, T];

/** Exactly five — the change model, condensed. The tuple is also the other end of
 *  `KOTTER_LINK_COUNT` in `./tam-kotter-geometry.ts`, which divides the frame's
 *  height by it: a sixth link would push both chains through the frame's own floor,
 *  and the type refuses it before the arithmetic has to. */
type Five<T> = readonly [T, T, T, T, T];

/** Exactly two — the two beliefs, which the acceptance model treats as a pair and
 *  never as a sequence. `./tam-kotter-geometry.ts` splits one tier into exactly two
 *  columns, so a third belief would have no column and a single belief would leave
 *  one standing at half the frame's width. */
type Two<T> = readonly [T, T];

/**
 * One box in either chain — and it is deliberately the SAME interface on both sides
 * of the stage.
 *
 * ONE NODE TYPE FOR NINE BOXES, and that is the structural half of the
 * no-third-ladder guardrail. The four constructs of the acceptance model and the
 * five links of the change model are the same KIND of object — a named thing with a
 * one-line gloss — so they are one type, they render through one component and they
 * are placed by two functions that differ only in the shape of the chain. The moment
 * the right-hand five needed a field the left-hand four did not have, they would
 * have become a different kind of thing, and the first field they would need is an
 * ordinal.
 *
 * THERE IS NO `order`, `step`, `index` OR `badge` FIELD, AND THERE MUST NOT BE ONE.
 * Order is the ARRAY's, and the array's order is turned into a position by
 * `./tam-kotter-geometry.ts` and into nothing else. A field here would be a number
 * with a name, one line of JSX away from being printed.
 */
export interface ChainNode {
  id: string;
  /**
   * WHAT THIS NODE IS. A mono LABEL, keyword-free by the rule above.
   *
   * THE ACCEPTANCE MODEL'S FOUR ARE DAVIS'S OWN CONSTRUCT NAMES and are not the
   * deck's to reword — "Perceived Usefulness" is a term with a literature behind it
   * and "How useful people think it is" is a paraphrase of one. The change model's
   * five are the condensed form the AI-adoption literature prints, which is what the
   * attribution says out loud.
   */
  label: string;
  /**
   * WHAT IT MEANS, IN ONE LINE. The CAPTION register — 12px sans, keyword-free.
   *
   * EVERY ONE IS SHORT ENOUGH TO BE READ WHILE THE PRESENTER IS STILL TALKING, which
   * is the whole reason the register exists: nine boxes each carrying a sentence
   * would be a page, and a room reads a page instead of listening to it. The two
   * belief captions are QUESTIONS because that is how the constructs are actually
   * elicited — a person deciding whether to use something is asking themselves
   * exactly those two things — and a question is the one form of caption a leader
   * cannot skim past as a definition.
   */
  caption: string;
}

/**
 * The top of the causal chain — what shapes belief, and the four things that shape
 * it.
 *
 * THE ONLY NODE ON THE STAGE THAT CARRIES A LIST, and the reason it is a separate
 * type rather than an optional field on {@link ChainNode} is the reason
 * `shapeMiddleOutContent`'s `Band` refuses optional claim rows: an optional field
 * lets a node ship with neither a list nor a reason for having none, and a box that
 * renders half its own layout is indistinguishable on a projector from a slide that
 * failed to load. Here the split is stronger still — exactly one node in nine has
 * factors, the geometry gives that one node its own height, and a type that admitted
 * a second would be describing a stage that cannot be drawn.
 */
export interface FactorNode extends ChainNode {
  /**
   * THE FOUR CONDITIONS A LEADER ACTUALLY SETS, and the half of the acceptance model
   * this room can act on.
   *
   * A SET, NOT A SEQUENCE. Nothing in the model orders these four, they are drawn as
   * a 2×2 block for exactly that reason, and each carries a square mark rather than
   * a number. The array order is the READING order of that block and nothing else —
   * re-sorting it moves four strings and changes no claim, which is the test of
   * whether an order is a rank.
   *
   * THEY ARE THE POINT OF THE LEFT FRAME IN THIS ROOM. Perceived usefulness and
   * perceived ease of use are things that happen inside somebody else's head, and a
   * leader who left this slide believing adoption is a matter of persuasion would
   * have taken the wrong half. These four are the inputs, they are all inside a
   * division head's authority, and the frame's closer says so in a sentence.
   */
  factors: Four<string>;
}

// ───────────────────── the acceptance model ─────────────────────

/**
 * The four external factors, in reading order.
 *
 * SET IN THE MODEL'S OWN VOCABULARY, WHICH IS ALSO THE MODEL'S OWN SPELLING.
 * `modeling` is American and the leader tree's rendered prose is British —
 * `organisation` and `authorise` appear across the four leader content modules — and
 * that is not an oversight here. The whole left frame is quoted vocabulary: the four
 * construct labels are Davis's names and include `Behavioral Intention`, so
 * anglicising one word of the factor list while leaving the constructs alone would
 * produce a frame written in two spellings. The deck's own sentences on this stage —
 * the headline, both closers and the unifying line — are the deck's, and none of
 * them carries an American form.
 *
 * `Infrastructure readiness` IS THE ONE A ROOM FORGETS, and it is last because it is
 * the one a division head is most likely to discover the hard way: the other three
 * are things a leader does, and this one is a thing that either is or is not true
 * before any of them work.
 */
const EXTERNAL_FACTORS: Four<string> = [
  "Training & support",
  "Leadership modeling",
  "Peer influence",
  "Infrastructure readiness",
];

/**
 * The top of the causal chain.
 *
 * "what shapes belief" IS LOWER CASE AND IT IS NOT A MISTAKE. It is the only caption
 * on the stage that is a gloss on the node's own name rather than a statement about
 * the world, and sentence case would make it look like a claim that had lost its
 * verb. It also names the word the whole left frame turns on — `belief` — one line
 * before the two nodes that hold it, and one frame before the unifying line spends
 * it.
 */
const EXTERNAL_FACTORS_NODE: FactorNode = {
  id: "external-factors",
  label: "EXTERNAL FACTORS",
  caption: "what shapes belief",
  factors: EXTERNAL_FACTORS,
};

/**
 * The two beliefs, as a PAIR and never as a sequence.
 *
 * THE MODEL DOES NOT RANK THEM AND NEITHER DOES THE STAGE: two nodes of one width on
 * one line, arriving on one pose at one delay. Usefulness first in the array only
 * because it is first in the model's own name for itself, and because the room reads
 * left to right — not because a person weighs it more.
 *
 * BOTH CAPTIONS ARE FIRST-PERSON QUESTIONS, and the second one is deliberately the
 * unflattering form. "Is this hard to learn and use?" is what a person actually asks;
 * "Is this easy to use?" is what a slide asks on their behalf, and the difference is
 * whether the room hears an objection or a feature list.
 */
const BELIEFS: Two<ChainNode> = [
  {
    id: "usefulness",
    label: "PERCEIVED USEFULNESS",
    caption: "Will this help me do my job better?",
  },
  {
    id: "ease-of-use",
    label: "PERCEIVED EASE OF USE",
    caption: "Is this hard to learn and use?",
  },
];

/** Where the two beliefs meet. The model's own construct name, and a two-word gloss:
 *  what a person has done by this point is decide, and nothing more. */
const BEHAVIORAL_INTENTION: ChainNode = {
  id: "intention",
  label: "BEHAVIORAL INTENTION",
  caption: "Decide to use",
};

/** The end of the chain, and the only thing on it anybody can measure. "Real
 *  adoption" is two words because the node is the punchline and a longer gloss would
 *  explain it: everything above this box is why, and this box is whether. */
const ACTUAL_USE: ChainNode = {
  id: "actual-use",
  label: "ACTUAL USE",
  caption: "Real adoption",
};

/**
 * The acceptance model's verdict, and the sentence that turns the left frame from a
 * diagram into an instruction.
 *
 * IT POINTS AT THE ONLY TIER A LEADER CAN TOUCH. Two of the four tiers are beliefs
 * held by other people and the third is their decision; the frame would be a
 * fatalistic picture if it stopped there. "Shape the external factors" is the one
 * verb in the frame that is addressed to the room, and "belief follows" is the
 * model's actual claim — not that belief can be argued into somebody, but that it is
 * downstream of conditions somebody else sets.
 */
const TAM_CLOSER = "Shape the external factors — and belief follows.";

// ───────────────────── the change model ─────────────────────

/**
 * The five links, in the order the model runs them.
 *
 * THE ARRAY IS THE ORDER AND IT IS THE ONLY PLACE THE ORDER LIVES. There is no
 * ordinal field, no numeral in any string, and nothing in
 * `./tam-kotter-geometry.ts` that turns an index into a printed character — the
 * chain's order reaches the stage as five positions and four connecting rules, which
 * is exactly how the acceptance model's causal order reaches it on the other side of
 * the stage. See guardrails 1–6 in this block's header.
 *
 * WHY THESE FIVE AND NOT THE SOURCE MODEL'S EIGHT. The condensation is the
 * AI-adoption literature's rather than this deck's, which is what the attribution
 * says; eight links would not fit the frame at a legible register, and — more to the
 * point — a room that is given eight steps hears a project plan, while a room given
 * five hears a shape it can check its own last initiative against.
 *
 * EVERY CAPTION IS A QUESTION OR AN IMPERATIVE, AND NONE IS A DESCRIPTION. "Why must
 * we change now?" is answerable in the room; "Establish a sense of urgency" is a
 * thing to nod at. The two halves of the stage share that discipline: the acceptance
 * model's beliefs are questions a person asks themselves, and the change model's
 * links are questions a leader has to answer out loud.
 */
const KOTTER_LINKS: Five<ChainNode> = [
  {
    id: "urgency",
    label: "CREATE URGENCY",
    // "now" IS THE LOAD-BEARING WORD. Every leader in the room already agrees that
    // this matters; the question that stalls an initiative is why it matters this
    // quarter rather than next, and a link that asked "why must we change?" would be
    // the version everybody passes.
    caption: "Why must we change now?",
  },
  {
    id: "coalition",
    label: "BUILD COALITION",
    // "together" AND NOT "who owns this?". An owner is a person a room can appoint
    // and then leave alone, which is precisely the failure this link exists to
    // prevent — and naming a single champion is `mandate-levers`' own lever, printed
    // there in its own words.
    caption: "Who will lead this together?",
  },
  {
    id: "enable",
    label: "ENABLE ACTION",
    // "Remove the barriers" AND NOT "empower" OR "enable teams". A barrier is a
    // specific thing somebody can name on a Monday — an approval, a licence, a
    // blocked domain — and removing one is an act. Empowerment is a value.
    caption: "Remove the barriers",
  },
  {
    id: "wins",
    label: "GENERATE WINS",
    // "early, tangible" IS THE WHOLE CONDITION. A win that arrives late is a report
    // and a win nobody can point at is a claim; the model's requirement is that the
    // organisation SEES something work before its patience runs out.
    caption: "Show early, tangible results",
  },
  {
    id: "anchor",
    label: "ANCHOR IN CULTURE",
    // "not a project" IS THE SENTENCE THE WHOLE RIGHT FRAME IS FOR, and it is the
    // one line on this stage that names the failure mode by its real name: an
    // initiative that ends is an initiative that was a project, and the last link is
    // the one every stalled rollout skipped.
    caption: "Make it how we work, not a project",
  },
];

/**
 * The change model's verdict, and the one sentence on this stage that makes a claim
 * about what happens in this industry.
 *
 * "Most" AND NOT "AI initiatives stall …". The hedge is the honest form — this block
 * carries no measured figure and prints no percentage, so an unhedged universal
 * would be a statistic the deck cannot source. §12.2 is the standing rule about
 * reported claims, and the cheapest way to honour it here is to say `Most` and mean
 * it.
 *
 * "skip steps" IS THE ONE PLACE THE WORD `step` TOUCHES THE FIVE LINKS, and it is a
 * verdict rather than a label — see guardrail 5 in this block's header. "The order
 * matters" is the claim the numbered staircase in the reference makes structurally
 * and this stage refuses to make structurally: it is said, once, in a sentence the
 * room can disagree with.
 */
const KOTTER_CLOSER = "Most AI initiatives stall when leaders skip steps. The order matters.";

// ───────────────────── shared copy ─────────────────────

export const shapeTamKotterContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from
   *  the composed deck (§3.5) and are authored nowhere. It names the two frames'
   *  shared subject rather than either model, because the caption sits above BOTH of
   *  them and a label naming one would rank it. */
  figLabel: "ADOPTION FRAMEWORKS",

  /**
   * The claim, and the shape of the stage under it: two models, two halves, two
   * questions.
   *
   * "Two models explain …" AND NOT "Two models EXIST". The verb is the whole point —
   * this is not a literature review, it is the assertion that the thing the room has
   * been treating as a mystery has a published answer, and that the answer has two
   * parts because the failure has two parts.
   *
   * IT DOES NOT OPEN ON THE NOUN `adoption`, deliberately. MIDDLE-OUT's headline is
   * "Adoption is not top-down. It spreads out from the middle." and stands one click
   * behind this one; two adjacent headlines opening on the same noun read as one
   * slide that re-rendered. `people adopt` is the verb form and the person doing it,
   * which is also what the left frame is about.
   *
   * MEASURED TO ONE LINE UNDER BOTH FACES: 799.08px with Instrument Serif and
   * 980.42px with the Georgia fallback, against `.slide-headline-row`'s 1184px
   * measure — 83% on the wide face. `HEADLINE_BUDGET_CHARS` in
   * `./tam-kotter-geometry.ts` holds the same arithmetic as a number a test can
   * check, and it exists because the sibling slide's drafted headline wrapped on the
   * fallback face and painted straight through the shelf under it.
   */
  headline: "Two models explain why people adopt, and why it sticks.",
  /** One keyword, on the SECOND half. The room already believes people adopt things
   *  they find useful; what it has not been given is any account of why a rollout
   *  survives the quarter, and the italic is the last thing the room takes away
   *  before the two frames start arguing it. It also sets up the unifying line at the
   *  foot of the stage, which is the sentence that answers it. */
  headlineKw: ["why it sticks"],

  /**
   * THE LEFT FRAME — the acceptance model.
   *
   * `frameLabel` IS THE ACRONYM AND `attribution` IS WHAT IT STANDS FOR, in that
   * order, which is the order a room needs them in: the acronym is what the
   * presenter will say out loud and what a leader may already have heard, and the
   * expansion under it is what makes it citable. Both are on the stage from the first
   * pose, because a frame that named itself later would be a diagram the room had to
   * hold unlabelled.
   *
   * THE YEAR IS ON THE STAGE AND NOT IN THIS COMMENT. §12.2's rule about reported
   * claims is usually a cost; here it is the slide's entire value — see this block's
   * header on why a division head can discount an opinion and cannot discount a
   * citation.
   */
  tam: {
    frameLabel: "TAM FRAMEWORK",
    /** A CITATION, and therefore keyword-free: an italic inside an attribution would
     *  turn a source line into a slogan. The em dash is the deck's own. */
    attribution: "Technology Acceptance Model — Davis (1989)",
    source: EXTERNAL_FACTORS_NODE,
    beliefs: BELIEFS,
    intention: BEHAVIORAL_INTENTION,
    use: ACTUAL_USE,
    closer: TAM_CLOSER,
    /** The emphasis lands on the CONSEQUENCE and not on the instruction. "Shape the
     *  external factors" is the ask and the room will hear it as one either way;
     *  "belief follows" is the part that is counter-intuitive to a leader who has
     *  been trying to persuade people, and it is the half worth carrying out of the
     *  room. */
    closerKw: ["belief follows"],
  },

  /**
   * THE RIGHT FRAME — the change model, condensed.
   *
   * THE ATTRIBUTION DOES THREE JOBS IN ONE LINE and every one of them is load-bearing:
   * it names the model, it says out loud that what is on the stage is a CONDENSED
   * form rather than the model itself, and it cites the author and the year. The
   * middle job is the one a lazier line would drop — five links under a title that
   * said "8-Step Model" without the word `condensed` would be the deck quietly
   * mis-citing a published model, which is exactly the failure §12.2 exists to
   * prevent.
   */
  kotter: {
    frameLabel: "CHANGE MANAGEMENT FRAMEWORK",
    /** A CITATION, keyword-free for the same reason as the one above it. The `8` is
     *  one of this block's three rendered digits and is part of the model's published
     *  name — see the header on why this block prints digits and the one above it
     *  bans them. */
    attribution: "Kotter's 8-Step Model — condensed for AI adoption (Kotter, 1996)",
    links: KOTTER_LINKS,
    closer: KOTTER_CLOSER,
    /** The emphasis lands on the ORDER claim, which is the half of the sentence this
     *  frame's whole geometry refuses to make on its own — see guardrail 6. The
     *  diagnosis ("Most AI initiatives stall") is the setup; the italic is the
     *  finding. */
    closerKw: ["The order matters"],
  },

  /**
   * The line under both frames, and the sentence the whole stage exists to earn.
   *
   * VERBATIM FROM THE SOURCE DECK. `docs/researches/internal-hr-group.md` records
   * this line on the original's own frameworks page in exactly these words, capitals
   * included, and it is the one string on this stage that is quoted rather than
   * written. Rewriting an owner-facing line to prove the port was not a copy would be
   * the worst reason to change copy.
   *
   * THE CAPITALS ARE THE SOURCE'S EMPHASIS AND THEY ARE KEPT. They also do work the
   * highlight cannot: `STICK` is the third capital and carries NO keyword, so the
   * sentence has three stressed words and two copper italics — the two conditions are
   * marked as a pair, and the outcome is left as the thing they produce.
   *
   * IT IS THE ONLY PLACE ON THE STAGE WHERE THE TWO FRAMES TOUCH. Neither closer
   * mentions the other model, the two chains are drawn in two boxes that never
   * connect, and this line is the connection — which is why it lands on its own pose,
   * last, with both frames complete above it.
   */
  unifier: "Without BELIEF people don't start; without SEQUENCE change doesn't STICK.",
  /**
   * TWO KEYWORDS AND NOT ONE, because the claim is a conjunction — the same call
   * `shapeMiddleOutContent`'s middle band records about its own two-part line. An
   * italic on one condition would say the other is the lesser of the two, and the
   * slide's entire structure is two equal frames.
   *
   * `BELIEF` is the left frame's word and `SEQUENCE` is the right frame's, so the two
   * emphases are also the two halves of the stage, named in the order the room read
   * them.
   */
  unifierKw: ["BELIEF", "SEQUENCE"],
} as const;
