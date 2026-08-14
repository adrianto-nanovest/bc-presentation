// THE DOSSIER — one owner, one wire per figure, and every figure wired to how it is known.
//
// ═══ WHAT THIS FIGURE IS, AND WHAT IT REPLACED. D.2 argues that a leader can wave away
// somebody else's numbers and cannot wave away their own, so the one thing the stage has to
// draw is PROVENANCE. It used to draw nothing at all: four lines of type down the left third
// of an empty stage, a chip floating at the right margin of each, and 800px of black between
// the two. Every fact was on the slide and the picture made none of the argument.
//
// It is now a wiring diagram of the claim:
//
//   · THE SOURCE PLATE (left) is the owner — a caption saying what the box is, a hairline,
//     and the organisation's own name at the height the wire leaves on.
//   · THE HARNESS (centre) is the claim. One trunk out of the plate, one spine, one branch
//     per figure, each landing on a node on its card's left edge. Right angles, not curves:
//     nothing is FLOWING here — the figures were not produced by the plate in front of the
//     room, they are ATTRIBUTED to it — and a chain of custody looks like wiring.
//   · THE CARDS (right) are the evidence, one per figure, all the same size. Each is one
//     horizontal chain: the figure, a dotted leader, and the epistemic chip the leader runs
//     to, with what the figure measures set underneath.
//
// ═══ STILL A LEDGER AND STILL NOT A CHART, which is the one property the redraw could most
// easily have lost and the reason this file kept its name. A bar chart of "+90%", "50+" and
// "4,000+" would put three unrelated quantities on one axis and invite the room to compare
// them. Nothing here has an axis: every card is the same width and the same height, the cards
// are ordered as `../content.ts` lists them, and no card is tinted, sized or ranked by what
// its number says. What each card DOES carry is the column a chart has no room for — how the
// figure is known — and this figure now draws that column as a wire instead of leaving it to
// a chip nobody joins up.
//
// ═══ ONE COMPONENT AND NOT THREE. The plate, the harness, the cards and the citation are
// four parts of one figure, and the fact they share — how many figures the brand has — is
// owned by `../geometry.ts` and read once here. Splitting the cards from the plate would put
// that count on both sides of a file boundary, and the failure this figure is actually at
// risk of is a harness whose branches have stopped landing on the cards they name.
//
// ═══ IT READS NO VARIANT AND NO BRAND: the resolved block arrives as a prop. That is what
// lets one test render both brands' dossiers in a single module epoch, which is the only way
// to check that neither carries a byte of the other's evidence (§4.4 slot 3).
//
// ═══ CSS vars only, NO HEX AND NO rgba() LITERALS. Rank is a COLOUR TIER between the cell
// ROLES — the number, what it measures, how it is known — and never between cards: three or
// four figures of equal standing on any one stage, and any visual promotion of one is a claim
// nobody authored, which is the same failure as printing the word "audited".
//
// ═══ OPACITY MEANS TIME, NEVER RANK. Every box on this stage is either arriving (a one-shot
// keyframe from `./own-proof.css`, invisible until its own delay) or arrived (opacity 1).
// Nothing is dimmed to say it matters less.
//
// ═══ ZERO SMIL NODES, at every pose, under any motion preference — and there is no `<svg>` on
// this slide at all, so the question is closed by construction rather than by discipline. The
// harness is four kinds of `div`. `./own-proof.css` owns every keyframe and kills its two
// loops outright under `prefers-reduced-motion: reduce`; the global squash in
// `src/styles/globals.css` lands the arrivals on their finished frames.
//
// ═══ THE ONE `Reveal` ON THIS SLIDE IS THE THESIS, and it is the only box here with a real
// POSE transition — everything else is present at pose 0 and animates on MOUNT. `Deck.tsx`
// renders only the active slide, so mounting is arriving; stepping 0 → 1 → 0 does not
// remount, which is exactly why the sentence that comes and goes with the pose cannot be a
// mount animation.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive — see
// `./ChickenEggBeats.tsx` for the census of its importers. This file takes `Reveal` for the
// thesis and `CopperRule` for the rule above it, and nothing else: the rest of the stage is
// on this directory's own keyframes.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ATTRIBUTION_HEIGHT,
  ATTRIBUTION_TOP,
  BRANCH_LENGTH,
  CARD_HEIGHT,
  CARD_LEFT,
  CARD_PAD_X,
  CARD_WIDTH,
  CHAIN_GAP,
  CHAIN_ROW_WIDTH,
  CHAIN_Y,
  CONTENT_WIDTH,
  FIGURE_BUDGET_W,
  FIGURE_HEIGHT,
  FIGURE_TOP,
  MARK_COL_W,
  MARK_HEIGHT,
  METRIC_HEIGHT,
  METRIC_TOP,
  NODE_DOT_SIZE,
  NO_PROOF_TOP,
  ORIGIN_DOT_SIZE,
  ORIGIN_Y,
  RULE_TOP,
  SIDE_MARGIN,
  SOURCE_CAPTION_HEIGHT,
  SOURCE_CAPTION_TOP,
  SOURCE_LEFT,
  SOURCE_HEIGHT,
  SOURCE_NAME_HEIGHT,
  SOURCE_NAME_TOP,
  SOURCE_PAD,
  SOURCE_RIGHT,
  SOURCE_RULE_TOP,
  SOURCE_TOP,
  SOURCE_WIDTH,
  SPINE_X,
  THESIS_HEIGHT,
  THESIS_TOP,
  TRUNK_LENGTH,
  WIRE_WEIGHT,
  cardTop,
  chainY,
  spineHeight,
  spineTop,
} from "../geometry";
import { showsDossier, showsThesis } from "../own-proof-walk";
import {
  investOwnProofContent as C,
  type ProofFigure,
  type OwnProofBlock,
} from "../content";
import "./own-proof.css";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and the same tier for every card.
 *
 * THE RANK IS ACROSS A CARD, NEVER DOWN THE STACK — and across the card it is SIZE that
 * carries the first step, not colour. The figure is 26px `--copper-200` (luminance 0.5917)
 * beside a 15px `--neutral-200` metric name (0.6584): the number reads first because it is
 * 11px larger, and it is very slightly the DARKER of the two. From the metric to the chip the
 * type does get quieter as well as smaller — `--neutral-300` (0.3663) at 10px — so the third
 * cell is the one this table actually dims. Reading top to bottom nothing changes at all,
 * because these figures are not ranked: they are the same organisation's evidence, and a
 * brighter card would be a claim that one of them counts more.
 *
 * THE CHIP RESTS ON gh#50's FLOOR AND NOT UNDER IT. `--neutral-300` is the floor for text on
 * this stage, and the caveat is the one string somebody would be tempted to push below it to
 * "calm the card down" — which would make the least readable thing in the room the thing that
 * keeps the slide honest. It stays ON the floor: quietest, and still legible from the back.
 *
 * THE OWNER'S NAME MOVED UP A TIER IN THE 2026-08-14 REDRAW, and it is the one tier change
 * the rework made. It was 11px `--copper-400` — the deck-wide mono LABEL tier — when it was a
 * free-standing eyebrow under the headline. It is 13px `--copper-200` now, because it is no
 * longer a label ABOUT the slide: it is the plate's subject, the thing three or four wires
 * leave from, and the same tier as the figures is exactly right for it — the owner and the
 * owner's numbers are one claim. The 11px `--copper-400` register has NOT left this stage:
 * the plate's caption is set in it, which is what `./ChickenEggBeats.tsx` and
 * `./SecurityBeats.tsx` point at when they cite this file for that pairing.
 */
const TIER = {
  /** The plate's caption. The deck-wide 11px mono caps LABEL tier. */
  caption: "var(--copper-400)",
  /** The owner's name — the plate's subject. Same tier as the figures it owns. */
  owner: "var(--copper-200)",
  /** Copper, because the number IS the point of the card. Two tiers OVER the keyword italic
   *  and twice its light — `--copper-200` 0.5917 against `KeywordHighlight`'s `--copper-400`
   *  0.2966 — using "over" the way `../../leader-shape/components/PillarOrbit.tsx` uses it:
   *  the lower token number is the brighter one. So a figure is never the same copper as an
   *  emphasised word, and it is upright 26px mono where a keyword is serif italic. */
  figure: "var(--copper-200)",
  /** What the number measures — two tiers under the headline's own, on the ramp this stage
   *  declares (0 · 50 · 100 · 200 · 300): `--neutral-200` 0.6584 against the headline's
   *  `--neutral-50` 0.9131. */
  metric: "var(--neutral-200)",
  /** How it is known. See the note above about the floor. */
  mark: "var(--neutral-300)",
  /** The chip's hairline. Dark enough to read as an attached label rather than a bordered
   *  claim; the copper says it belongs to the figure the leader runs from. */
  markBorder: "var(--copper-800)",
  /** The source line, same tier as the chips it summarises. */
  attribution: "var(--neutral-300)",
  /** The thesis. The brightest tier this slide sets UNDER the headline row — `--neutral-100`
   *  0.7835, over the metric's 0.6584 and the chip's 0.3663 — and one tier under the headline
   *  itself, which `.slide-headline` prints in `--neutral-50` (0.9131) at both poses. The
   *  headline stays the brightest type on the stage on purpose: it is the premise this
   *  sentence answers. What makes pose 1 the thesis' is that it is the only thing that
   *  ARRIVES there, not that it out-shines what is already up. */
  thesis: "var(--neutral-100)",

  // ── the drawn tiers · not text, and therefore not held to the text floor ──

  /** The plate's own border and ground. One step brighter than a card's border, because the
   *  plate is the subject of the figure and the cards are what it accounts for. */
  plateBorder: "var(--copper-700)",
  plateGround: "var(--copper-950)",
  /** A card's border. The cards carry NO ground at all: four filled boxes would out-weigh the
   *  plate they hang off, and the stage would read as a table with a title. */
  cardBorder: "var(--copper-800)",
  /** Every wire — the trunk, the spine, the branches, and the plate's own header rule.
   *  `--copper-700` sits under the dots it joins and over the card borders it runs to. */
  wire: "var(--copper-700)",
  /** The origin, and the node a branch lands on. The brightest marks on the harness, because
   *  they are its two ENDS: where the evidence comes from and where it arrives. */
  node: "var(--copper-300)",
  /** The ring opening out of the origin. Under the dot it leaves, so the dot stays the mark
   *  and the ring stays its echo. */
  ring: "var(--copper-500)",
  /** The leader's dots — the quietest drawn tier on the stage. A leader is a JOIN, not a
   *  claim, and it may not compete with the figure at either end of it. */
  leader: "var(--copper-700)",
  /** The pulse travelling a leader. The one moving thing on the stage, so it is set at the
   *  figure's own tier: what travels the wire is the figure's provenance. */
  pulse: "var(--copper-200)",
} as const;

// ───────────────────── type registers ─────────────────────

/**
 * The mono LABEL register — the caption, the owner's name, every figure, every chip, the
 * source line.
 *
 * `upper` is the default because every mono label in this deck is uppercase, and the two
 * exceptions are deliberate: a FIGURE is already typeset as it should read ("2 days → under 1
 * hour" shouted is a wall), and the ATTRIBUTION is a sentence-length citation, which at 100+
 * characters of uppercase mono is something nobody in the back row reads. Both stay in this
 * register — that is what keeps them reading as labels rather than as prose — and drop the
 * transform.
 */
function mono(size: number, color: string, ls = 0.14, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/** A box whose one line of copy is centred inside it — the figure, the chip, and the owner's
 *  name, which are the three boxes on this stage cut taller than the type they hold. */
const centred: CSSProperties = { display: "flex", alignItems: "center" };

// ───────────────────── the build ─────────────────────

/**
 * THE BUILD, IN MILLISECONDS — one pose, and the order is the argument.
 *
 * WRITTEN AS EXPLICIT MILLISECONDS AND NOT AS A `120 + step × 90` LADDER, for the reason C.4
 * states: this build is not a list. It is a plate, a harness that has to draw before anything
 * can land on it, and a per-card chain whose marks are timed against each other. A step
 * ladder cannot express "when the wire gets there".
 *
 *   120 → 260   THE PLATE, from the left, then its caption, its rule and the owner's name.
 *               The room is told WHOSE evidence it is before it is shown any of it — which is
 *               what the shipped slide's pose 0 existed to do, bought here for 260ms instead
 *               of for a click.
 *   340 → 500   THE ORIGIN, THE TRUNK, THE SPINE. The harness draws out of the plate before a
 *               single card exists, so the cards arrive ON something.
 *   620 →       ONE BRANCH PER CARD, 90ms apart, top to bottom.
 *   680 →       THE CARD ITSELF, 60ms behind its own branch, so the wire always arrives first
 *               and the card lands on the end of it.
 *   +60         THE FIGURE — the point of the card.
 *   +120        WHAT IT MEASURES, under it.
 *   +150        THE LEADER, drawing from the figure toward the chip.
 *   +260        THE CHIP. It lands while the leader is roughly a quarter of the way across
 *               rather than when the wire touches it ({@link BUILD.leader} +
 *               {@link LEADER_DRAW_MS} = 570), because the alternative was watched on the
 *               stage and reads as a fault: a card sitting complete for a third of a second
 *               with an empty rectangle at its right end looks like a chip that failed to
 *               render. Landing it early is also the honest picture — the figure did not go
 *               and find its provenance, it always had one.
 *   last + 320  THE CITATION, behind every card, because a source line that appeared before
 *               the figures it sources would answer a question the room had not asked yet.
 *
 * 120ms OF LEAD-IN is the leader tree's own number, kept: it keeps the first box off the same
 * frame as the presenter's click. The whole build ends at ≈1270ms under GEMS' four cards.
 */
const BUILD = {
  plate: 120,
  caption: 200,
  owner: 260,
  origin: 340,
  trunk: 400,
  spine: 500,
  branch: 620,
  card: 680,
  /** How far apart two cards — and their two branches — arrive. */
  step: 90,
  /** Each mark's offset from its OWN card's arrival. */
  figure: 60,
  metric: 120,
  leader: 150,
  mark: 260,
  /** How long after the last card the citation lands. */
  attribution: 320,
} as const;

/**
 * How long a leader takes to draw: 420ms — WHICH MUST MATCH `op-draw-x` in `./own-proof.css`,
 * and is the only number in this file duplicated anywhere.
 *
 * IT IS HERE BECAUSE A PULSE IS NOT PART OF THE LEADER'S OWN KEYFRAME. The travelling segment
 * runs on its own infinite animation, so its delay has to be spelled as "when the leader
 * finished" — `BUILD.leader + LEADER_DRAW_MS` — and a CSS animation cannot tell a React prop
 * when it ended. The duplication is stated rather than hidden: retime the keyframe and this
 * constant moves with it, or the first pulse runs down a wire that is still growing.
 */
const LEADER_DRAW_MS = 420;

/** The travelling segment's own length: 44px. Short enough to read as a pulse on a 250px
 *  leader rather than as a second, brighter wire. */
const PULSE_WIDTH = 44;

/**
 * THE ONLY z-index ON THIS STAGE: the two kinds of DOT sit over everything they terminate.
 *
 * A node is where a wire STOPS, and every box on this figure is `position: absolute` with no
 * z-index at all, so paint order is DOM order — which put a 1px copper-700 line across the
 * middle of every copper-300 dot in the room:
 *
 *   · THE ORIGIN was cut by its own trunk. The dot is centred ON `SOURCE_RIGHT` and the trunk
 *     starts there, so the wire crossed the dot's right half; the trunk is painted after it.
 *   · EVERY NODE was cut by its own card. The dot is centred on `CARD_LEFT` and the card's
 *     left border runs down that same x, so the border split each dot vertically; the card is
 *     painted after the node it lands on.
 *
 * Neither is fixable by reordering the JSX — the branch has to draw UNDER its node and the
 * card has to arrive after the wire that reaches it, so the two dots need to be above boxes on
 * both sides of them in the tree. 1 is enough and is deliberately the smallest number that
 * works: every other box here is `auto`, so one positive step lifts the dots over all of them
 * and over nothing else on the slide.
 */
const DOT_Z = 1;

/**
 * One box's entrance — the class that animates it, when, and the box's own style.
 *
 * `shown` IS `showsDossier()`, THREADED THROUGH EVERY BOX IN THE FIGURE, which is what makes
 * that walk function load-bearing rather than decorative. It answers `true` at every pose the
 * deck can reach, so nothing below ever renders the hidden branch today; what it buys is the
 * seam. A figure whose boxes carried a bare `animationDelay` and no gate would have nowhere
 * for a third pose to attach, and the next author would reach for a comparison against `pose`
 * inside this file — which is the one thing every other slide in this tree is built to
 * prevent.
 *
 * IT TAKES THE STYLE AND RETURNS IT, rather than being spread beside one. A caller that
 * spreads an entrance and then writes its own `style` prop silently DROPS the `opacity: 0`
 * this returns when `shown` is false — JSX takes the last `style` it is given — and the
 * hidden branch would then be hidden only by luck. Folding the two together makes that
 * impossible to write.
 *
 * `name` IS A CLASS LIST AND NOT ONE CLASS, WHICH IS WHY THE HOVER RIDES ON IT. The three
 * bordered boxes here — the source plate, each card, each card's caveat chip — pass
 * `"<entrance> box-hover"`, and the class the pointer needs therefore arrives and leaves with
 * the entrance that paints the box. That is the whole guard this figure needs: nothing on this
 * stage is a `.fade`, so `globals.css`'s `:not(.on)` rule cannot speak for it, and a box left
 * at `opacity: 0` with a hover class on it would light an invisible rectangle.
 */
function enter(
  shown: boolean,
  name: string,
  ms: number,
  style: CSSProperties,
): { className: string; style: CSSProperties } {
  return {
    className: shown ? name : "",
    style: shown ? { ...style, animationDelay: `${ms}ms` } : { ...style, opacity: 0 },
  };
}

// ───────────────────── the figure ─────────────────────

export interface ProofLedgerProps {
  /** The brand's resolved block — `ownProofFor(VARIANT.brand)`. */
  content: OwnProofBlock;
  /** 0 or 1. See `../own-proof-walk.ts` for what each pose carries. */
  pose: number;
}

export function ProofLedger({ content, pose }: ProofLedgerProps) {
  // THE POSE, ASKED WHERE IT IS ANSWERED. Both questions go to `../own-proof-walk.ts` and
  // neither is re-derived from a comparison here, so no branch in this tree can form its own
  // opinion about what pose 1 means.
  const dossier = showsDossier();
  const thesis = showsThesis(pose);

  return (
    <>
      {content.kind === "figures" ? (
        <Dossier content={content} shown={dossier} />
      ) : (
        // NO PLATE, NO WIRE, NO CARD — the three things that would make this look like a
        // dossier with one entry. It is a statement ABOUT the deck, in the prose register,
        // and it names no organisation and no number on purpose (see `../content.ts`).
        <p
          data-testid="invest-no-proof"
          {...enter(dossier, "op-in-up", BUILD.plate, {
            position: "absolute",
            left: SIDE_MARGIN,
            top: NO_PROOF_TOP,
            width: CONTENT_WIDTH,
            margin: 0,
            fontFamily: "var(--serif)",
            fontSize: 20,
            lineHeight: 1.4,
            color: "var(--neutral-300)",
          })}
        >
          {highlight(content.line, content.lineKw)}
        </p>
      )}

      {/* THE RULE THAT CLOSES THE EVIDENCE — full width, because it divides the SLIDE: above
          it is what was reported and who reported it, below it is what this deck concludes.
          A `div` with the deck's own `.copper-rule` `scaleX`; a `<line>` would be the first
          `<svg>` on the slide. The testid sits on a positioned WRAPPER because `CopperRule`
          spreads no `data-*` props. */}
      <div
        data-testid="invest-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={thesis} width="100%" />
      </div>

      {/* THE THESIS — the deck's own sentence (§4.5), at a FIXED shelf under both brands and
          on the floor of the stage. Serif italic, because it is the one line here that is an
          argument rather than a record. THE ONE `Reveal` ON THIS SLIDE: see the header. */}
      <Reveal
        on={thesis}
        as="p"
        delay={140}
        data-testid="invest-closer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: THESIS_TOP,
          width: CONTENT_WIDTH,
          height: THESIS_HEIGHT,
          margin: 0,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 19,
          lineHeight: 1.3,
          color: TIER.thesis,
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}

// ───────────────────── the plate, the harness and the cards ─────────────────────

/** The whole of band 1 for a brand that HAS figures. Split out so the `no-organisation` arm
 *  above stays one element, and so this one can read the count once, at the top, and hand it
 *  to every coordinate below it. */
function Dossier({
  content,
  shown,
}: {
  content: Extract<OwnProofBlock, { kind: "figures" }>;
  shown: boolean;
}) {
  const count = content.figures.length;
  const nameWidth = SOURCE_WIDTH - 2 * SOURCE_PAD;
  /** When the last card arrives — what the citation waits behind. */
  const lastCardMs = BUILD.card + (count - 1) * BUILD.step;

  return (
    <>
      {/* ───── THE SOURCE PLATE ─────
          A NODE, not a bracket: caption, rule, name, centred on the line the harness leaves
          on, and the same box in both rooms whether the stack beside it is three cards or
          four. `../geometry.ts` records the taller version this replaced and why. */}
      <div
        data-testid="invest-source-plate"
        {...enter(shown, "op-in-left box-hover", BUILD.plate, {
          position: "absolute",
          left: SOURCE_LEFT,
          top: SOURCE_TOP,
          width: SOURCE_WIDTH,
          height: SOURCE_HEIGHT,
          boxSizing: "border-box",
          border: `${WIRE_WEIGHT}px solid ${TIER.plateBorder}`,
          background: TIER.plateGround,
        })}
      >
        <div
          data-testid="invest-source-caption"
          {...enter(shown, "op-in-up", BUILD.caption, {
            position: "absolute",
            left: SOURCE_PAD,
            top: SOURCE_CAPTION_TOP,
            width: nameWidth,
            height: SOURCE_CAPTION_HEIGHT,
            ...mono(11, TIER.caption, 0.2),
            lineHeight: 1.3,
          })}
        >
          {C.sourceCaption}
        </div>

        {/* The plate's own hairline — a file's header rule. It draws from the left with the
            harness' gesture, because that is what a rule on this stage is. */}
        <div
          data-testid="invest-source-rule"
          {...enter(shown, "op-draw-x", BUILD.caption, {
            position: "absolute",
            left: SOURCE_PAD,
            top: SOURCE_RULE_TOP,
            width: nameWidth,
            height: WIRE_WEIGHT,
            background: TIER.wire,
          })}
        />

        {/* WHOSE PROOF IT IS — the half of the argument the shared headline deliberately does
            not make (`../content.ts`). The `<span>` is load-bearing: a flex box lays
            each of its children out as its own column, and a name that wrapped inside a bare
            flex container would set one word per line. */}
        <div
          data-testid="invest-eyebrow"
          {...enter(shown, "op-in-up", BUILD.owner, {
            position: "absolute",
            left: SOURCE_PAD,
            top: SOURCE_NAME_TOP,
            width: nameWidth,
            height: SOURCE_NAME_HEIGHT,
            ...mono(13, TIER.owner, 0.14),
            lineHeight: 1.6,
            ...centred,
          })}
        >
          <span style={{ display: "block", width: "100%" }}>{content.eyebrow}</span>
        </div>
      </div>

      {/* ───── THE HARNESS ─────
          The origin and its ring, the trunk out of the plate, the spine, and one branch per
          card. Every one of them is a `div`: this slide mounts no `<svg>` at all. */}
      <div
        data-testid="invest-origin-ring"
        {...enter(shown, "op-ring", BUILD.origin, {
          position: "absolute",
          left: SOURCE_RIGHT - (3 * ORIGIN_DOT_SIZE) / 2,
          top: ORIGIN_Y - (3 * ORIGIN_DOT_SIZE) / 2,
          width: 3 * ORIGIN_DOT_SIZE,
          height: 3 * ORIGIN_DOT_SIZE,
          borderRadius: "50%",
          border: `${WIRE_WEIGHT}px solid ${TIER.ring}`,
          boxSizing: "border-box",
          pointerEvents: "none",
        })}
      />
      <div
        data-testid="invest-origin"
        {...enter(shown, "op-dot-in", BUILD.origin, {
          position: "absolute",
          left: SOURCE_RIGHT - ORIGIN_DOT_SIZE / 2,
          top: ORIGIN_Y - ORIGIN_DOT_SIZE / 2,
          width: ORIGIN_DOT_SIZE,
          height: ORIGIN_DOT_SIZE,
          borderRadius: "50%",
          background: TIER.node,
          // Over the trunk that leaves it — see `DOT_Z`.
          zIndex: DOT_Z,
        })}
      />
      <div
        data-testid="invest-trunk"
        {...enter(shown, "op-draw-x", BUILD.trunk, {
          position: "absolute",
          left: SOURCE_RIGHT,
          top: ORIGIN_Y,
          width: TRUNK_LENGTH,
          height: WIRE_WEIGHT,
          background: TIER.wire,
        })}
      />
      {/* THE SPINE, only where there is more than one card to reach: a brand with a single
          figure gets a trunk straight into its branch, and a zero-height box would paint a
          stray mark in the middle of the harness. */}
      {count > 1 && (
        <div
          data-testid="invest-spine"
          {...enter(shown, "op-draw-y", BUILD.spine, {
            position: "absolute",
            left: SPINE_X,
            top: spineTop(count),
            width: WIRE_WEIGHT,
            height: spineHeight(count),
            background: TIER.wire,
          })}
        />
      )}

      {content.figures.map((figure, i) => (
        <ProofCard key={figure.id} figure={figure} index={i} count={count} shown={shown} />
      ))}

      {/* THE SOURCE LINE — on the slide, not in a footnote (§6.7), full width under the whole
          dossier and on a FIXED shelf, so the two decks print it in the same place. */}
      <div
        data-testid="invest-attribution"
        {...enter(shown, "op-in-up", lastCardMs + BUILD.attribution, {
          position: "absolute",
          left: SIDE_MARGIN,
          top: ATTRIBUTION_TOP,
          width: CONTENT_WIDTH,
          height: ATTRIBUTION_HEIGHT,
          ...mono(10.5, TIER.attribution, 0.02, false),
          lineHeight: 1.5,
        })}
      >
        {content.attribution}
      </div>
    </>
  );
}

/**
 * ONE CARD — its branch, the node the branch lands on, one figure, the leader that runs out
 * of it, the mark at the end of that leader, and what the figure measures.
 *
 * THE CHAIN IS THE POINT. Everything on the card's first line sits on one y
 * ({@link CHAIN_Y}), and so does the branch that arrives at its left edge: the wire, the
 * node, the number, the leader, the chip. A reader following that line from the plate reads
 * "this owner · this number · this is how we know it" without reading a word of the metric
 * name — which is what "the label is part of the copy" has to mean on a slide carrying one
 * mark per figure, three or four of them, and no summary chip standing in for the set.
 *
 * THE BRANCH AND THE NODE ARE THE CARD'S OWN, not the harness', because they are what says
 * THIS figure came from that plate. Keeping them here is what makes a card impossible to
 * render without its wire.
 */
function ProofCard({
  figure,
  index,
  count,
  shown,
}: {
  figure: ProofFigure;
  index: number;
  count: number;
  shown: boolean;
}) {
  const y = chainY(index, count);
  const cardMs = BUILD.card + index * BUILD.step;

  return (
    <>
      <div
        data-testid={`invest-branch-${figure.id}`}
        {...enter(shown, "op-draw-x", BUILD.branch + index * BUILD.step, {
          position: "absolute",
          left: SPINE_X,
          top: y,
          width: BRANCH_LENGTH,
          height: WIRE_WEIGHT,
          background: TIER.wire,
        })}
      />
      <div
        data-testid={`invest-node-${figure.id}`}
        {...enter(shown, "op-dot-in", cardMs, {
          position: "absolute",
          left: CARD_LEFT - NODE_DOT_SIZE / 2,
          top: y - NODE_DOT_SIZE / 2,
          width: NODE_DOT_SIZE,
          height: NODE_DOT_SIZE,
          borderRadius: "50%",
          background: TIER.node,
          // Over the card border it lands on, and over the branch it terminates — see `DOT_Z`.
          zIndex: DOT_Z,
        })}
      />

      <div
        data-testid={`invest-row-${figure.id}`}
        {...enter(shown, "op-in-left box-hover", cardMs, {
          position: "absolute",
          left: CARD_LEFT,
          top: cardTop(index, count),
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          boxSizing: "border-box",
          border: `${WIRE_WEIGHT}px solid ${TIER.cardBorder}`,
        })}
      >
        {/* ───── THE CHAIN ROW · figure · leader · chip ─────
            A FLEX ROW AND NOT THREE ABSOLUTE CELLS, which is the one layout decision on the
            card. The leader has to start where the FIGURE stops — that is what a leader is —
            and a fixed figure cell wide enough for GEMS' longest string punches a 150px hole
            into every one of Berau's three cards. Flex gives the figure its own width, the
            chip its fixed field, and the leader everything between them.

            The row is the box that carries the chain's y: `alignItems: center` on a box
            positioned at `FIGURE_TOP` puts all three cells on `CHAIN_Y`, which is also the y
            the branch outside the card arrives on. */}
        <div
          style={{
            position: "absolute",
            left: CARD_PAD_X,
            top: FIGURE_TOP,
            width: CHAIN_ROW_WIDTH,
            height: FIGURE_HEIGHT,
            display: "flex",
            alignItems: "center",
            gap: CHAIN_GAP,
          }}
        >
          {/* THE FIGURE. No `highlight()`: a figure is a LABEL by `../content.ts`'s keyword
              rule, and it is the rule's sharpest case — an `<em>` here would emphasise a
              fragment of a number. Tracking at 0.01em, not the label register's 0.14: this is
              a quantity, and tracked-out digits read as a serial number. */}
          <div
            data-testid={`invest-figure-${figure.id}`}
            {...enter(shown, "op-in-up", cardMs + BUILD.figure, {
              flex: "0 0 auto",
              maxWidth: FIGURE_BUDGET_W,
              ...mono(26, TIER.figure, 0.01, false),
              lineHeight: 1.15,
              whiteSpace: "nowrap",
            })}
          >
            {figure.figure}
          </div>

          {/* THE LEADER — the join between a number and how it is known, drawn as the dotted
              rule a printed index uses for exactly the same job. A `repeating-linear-gradient`
              and not a `border-bottom: dotted`, because a border's dot spacing is the
              browser's own business and this one has to be identical on every card.

              `minWidth: 0` IS LOAD-BEARING: a flex item's default minimum is its content, and
              this one has no content — without it the row would let the figure push the chip
              past the card's own edge instead of shortening the leader. */}
          <div
            data-testid={`invest-leader-${figure.id}`}
            {...enter(shown, "op-draw-x", cardMs + BUILD.leader, {
              position: "relative",
              flex: "1 1 auto",
              minWidth: 0,
              height: 2,
              backgroundImage: `repeating-linear-gradient(to right, ${TIER.leader} 0 2px, transparent 2px 7px)`,
            })}
          >
            {/* THE PULSE — one of the two things on this stage that never stop. Its travel is
                written here as a custom property, in the leader's OWN percentage, so
                `./own-proof.css` never holds a coordinate and no card has to know how long
                its own leader came out. */}
            <div
              data-testid={`invest-pulse-${figure.id}`}
              {...enter(shown, "op-pulse", cardMs + BUILD.leader + LEADER_DRAW_MS, {
                position: "absolute",
                left: 0,
                top: 0,
                width: PULSE_WIDTH,
                height: 2,
                backgroundImage: `linear-gradient(to right, transparent, ${TIER.pulse}, transparent)`,
                ["--op-travel" as string]: `calc(100% - ${PULSE_WIDTH}px)`,
              } as CSSProperties)}
            />
          </div>

          {/* THE CHIP — a FIXED FIELD at the end of every leader, so the marks form a column
              with a straight left edge and every leader stops at one x. 10px, NOT gh#50's
              9.5px mono floor: the floor is a limit, not a target, and this is the one string
              on the slide the AC is written about — the caveat must not be the least readable
              thing in the room. It never wraps; `../geometry.ts` measured the field to hold
              the longer of the two marks. */}
          <div
            data-testid={`invest-mark-${figure.id}`}
            {...enter(shown, "op-stamp box-hover", cardMs + BUILD.mark, {
              flex: "0 0 auto",
              width: MARK_COL_W,
              height: MARK_HEIGHT,
              boxSizing: "border-box",
              border: `${WIRE_WEIGHT}px solid ${TIER.markBorder}`,
              ...mono(10, TIER.mark, 0.14),
              lineHeight: 1,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            {figure.mark}
          </div>
        </div>

        {/* WHAT THE NUMBER MEASURES — under the chain rather than on it, in the SANS register,
            which is where every label-shaped NAME in the deck sits (the ladder's rung
            definitions, the pillars' captions). Not mono: a third mono cell on the card's own
            line would make the metric name look like part of the figure. It gets the card's
            whole measure, so the most reworded string on the slide cannot run out of room. */}
        <div
          data-testid={`invest-metric-${figure.id}`}
          {...enter(shown, "op-in-up", cardMs + BUILD.metric, {
            position: "absolute",
            left: CARD_PAD_X,
            top: METRIC_TOP,
            width: CARD_WIDTH - 2 * CARD_PAD_X,
            height: METRIC_HEIGHT,
            fontFamily: "var(--sans)",
            fontSize: 15,
            lineHeight: 1.3,
            color: TIER.metric,
          })}
        >
          {figure.metric}
        </div>
      </div>
    </>
  );
}
