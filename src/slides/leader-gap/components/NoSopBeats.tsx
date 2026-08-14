// Three things handed out, four questions never answered, and the fray a rollout
// line ends in when nobody writes the next rule — §6.2's condition, carried by one
// persistent scene instead of accumulated prose.
//
// REWRITTEN 2026-08-11 (owner call, productionized from the B.2 prototype's variant D
// "BOXES × FRAY"). RE-CUT 2026-08-14 (owner call) against the two neighbours it ships
// beside, and the three complaints are the map of this file:
//
//   1. THE BOXES DID NOT LOOK LIKE THE SECTION'S. `gap-failures-pattern` next door draws
//      a card as PICTURE / HAIRLINE / MONO TITLE / PROSE inside a `--copper-700` border
//      over a translucent black fill; this file drew a grey `--neutral-800` panel with a
//      single sentence in it. The issued boxes are now cards in that same grammar, down
//      to the hairline that brightens with the border under the pointer, and the chrome
//      lives in ./no-sop.css where the hover ramp can win.
//   2. POSE 0 WAS HALF EMPTY STAGE. The three cards are 330 tall instead of 120 and each
//      one is crowned by a LIVE PLATE — a login form that fills itself, a demonstration
//      that plays to a room, a memo that writes and seals itself. They are the reason
//      pose 0 has something to look at while the presenter says what a competent rollout
//      issues, and they contract away at pose 1 (see below) rather than staying to crowd
//      the questions.
//   3. THE FOUR QUESTIONS READ AS RIDDLES AND THE HAIRLINE UNDER THEM SAID NOTHING.
//      Each question card now carries its DOMAIN in mono caps, the question with its
//      subject spelled (`the AI`, once, on the first card — `../content.ts` argues it),
//      and an ANSWER FIELD: a dashed rule with a CARET BLINKING on it and one dim mono
//      note beside the caret. The blank is still never filled at any pose; what changed
//      is that it now says what it is.
//
// FOUR POSES, one argument each:
//
//   0 — WHAT WAS HANDED OUT. Three plate cards across the stage. The spine draws its
//       first segment low and lands one labelled dot: HANDED OUT.
//   1 — AND WHAT IT NEVER WROTE DOWN. THE ISSUED ROW CONTRACTS TO RECEIPTS on this beat
//       — one beat earlier than the first cut, which is what pays for 130px question
//       cards — and the four questions land under it, each with the empty answer field
//       that belongs to it. The spine extends to a second labelled dot, NEVER WRITTEN,
//       and pings there: guidance stops here.
//   2 — WHAT THE SILENCE LEAVES BEHIND. The question cards compact too; the freed space
//       is where the whole spine RISES, and the stopped line fans out into two dozen
//       swaying private hairlines — one per improvised rule, each ending in a tick
//       somewhere nobody else can read.
//   3 — THE FRAME. The fan dims to an afterimage, one dashed line marches on from the
//       second dot — the rule only the leader can write — and the closer lands under
//       it: nobody broke a rule; writing one is the leader's job.
//
// WHY PERSISTENT AND NOT REMOUNTING POSES — B.1's reason, inherited: the morphs ARE
// the argument's connective tissue (the cards that compact into receipts are the same
// cards that were argued, and the line that frays is the line the room watched stop),
// so elements keep identity and every pose change is a two-way CSS TRANSITION set
// inline. Mount choreography — draws, pops, the plates, the fan opening — is keyframes
// from ./no-sop.css on nodes that mount WITH their beat, so a walk backwards and
// forwards replays the entry. An element that needs both wears a wrapper: the outer node
// owns the pose transition, the inner owns the mount animation, because an animation's
// fill-mode holds its properties hostage against any transition on the same node.
//
// THE PLATES MOUNT ONCE AND REST ON THEIR FINISHED FRAME, which is the one place this
// figure differs from `gap-failures-pattern`'s three: those loop forever because they are
// the card's whole subject at both of that slide's poses, while these are pose 0's
// subject and become invisible receipts at pose 1. So each plate is an ARRIVAL that ends
// on the picture it is supposed to rest on — the form filled, the bar full, the memo
// signed and sealed — with two ambient decorations left running (the caret's blink and
// the two glow rings) because a stage that goes completely still under a presenter who is
// still talking reads as broken.
//
// THE POSE GATE IS INLINE OPACITY — {@link gate} always writes `opacity`, so the unit
// test reads visibility off `el.style.opacity` the way `./HardestPartBeats.tsx`'s
// does. Opacity means TIME on this stage — not argued yet (a gate), or already argued
// past (the fan's dim to 0.16 at the closer) — plus one documented TEXTURE case: the
// strands' own 0.5–0.9 spread, variation inside a single role so two dozen identical
// claims read as a fray and not as a wedge. Rank between ROLES is a colour tier,
// never opacity — the deck's rule, unchanged.
//
// THIS FIGURE MOUNTS `<svg>` AND STILL MOUNTS ZERO SMIL NODES, at every pose, under
// any motion preference. Every vector motion here is a CSS animation or transition
// (`no-sop-draw` is `gap-ladder-draw`'s idiom — pathLength 1, dasharray 1, dashoffset
// animated by keyframe), so the global `prefers-reduced-motion: reduce` squash in
// `src/styles/globals.css` parks every draw and every fill on its finished frame and runs
// the ambient decorations once. No `<animate>`, no `<animateTransform>`, no `<set>`, no
// matchMedia gate, no JS motion source at all.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the box chrome
// (./no-sop.css) and every stroke below. Where `gap-failures-pattern` writes
// `rgba(10,10,10,0.6)` inline, this file writes the same colour as
// `color-mix(in srgb, var(--neutral-900) 60%, transparent)`: the same paint, kept
// expressible in tokens.
import { type CSSProperties, type ReactNode } from "react";
// Section E's copy, the tree's de facto shared reveal primitive — the census of its
// importers is kept by `leader-mandate/components/EnablementModel.tsx`; this file
// keeps its one use (the verdict) from before the redesign, so the count holds.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import "./no-sop.css";
import {
  BAND_RIGHT,
  CARD_HAIRLINE_HEIGHT,
  CARD_HAIRLINE_Y,
  CARD_INNER_WIDTH,
  CARD_PAD_X,
  CHIP_HEIGHT,
  CONDITION_TITLE_TOP,
  DOT_ISSUED_X,
  DOT_LABEL_OFFSET_Y,
  DOT_LABEL_WIDTH,
  DOT_UNWRITTEN_X,
  FAN_ORIGIN,
  FIGURE_HEIGHT,
  FIGURE_LEFT,
  FIGURE_TOP,
  FIGURE_WIDTH,
  FRAY_STRANDS,
  ISSUED_BOX_WIDTH,
  ISSUED_HERO_HEIGHT,
  ISSUED_LINE_HEIGHT,
  ISSUED_LINE_Y,
  ISSUED_TITLE_Y,
  ISSUED_TOP,
  PING_RADIUS,
  PLATE_HEIGHT,
  PLATE_TOP,
  PLATE_WIDTH,
  QUESTION_ASK_Y,
  QUESTION_CARET_HEIGHT,
  QUESTION_CARET_WIDTH,
  QUESTION_CHIP_TOP,
  QUESTION_CHIP_WIDTH,
  QUESTION_DOMAIN_Y,
  QUESTION_FIELD_NOTE_Y,
  QUESTION_FIELD_RULE_HEIGHT,
  QUESTION_FIELD_RULE_Y,
  QUESTION_HERO_HEIGHT,
  QUESTION_HERO_WIDTH,
  QUESTION_INNER_WIDTH,
  QUESTION_PAD_X,
  SPINE_RISE,
  SPINE_X0,
  SPINE_Y,
  UNWRITTEN_TITLE_TOP,
  VERDICT_LEFT,
  VERDICT_TOP,
  VERDICT_WIDTH,
  issuedBoxLeft,
  questionChipLeft,
  questionHeroLeft,
  questionHeroTop,
} from "../no-sop-geometry";
import { gapNoSopContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box — brightest text first, under the headline's
 * `--neutral-50`:
 *
 *   role        token           register
 *   verdict     --neutral-100   24px serif — the closer
 *   ask         --neutral-100   17px serif — the question at the desk
 *   cardTitle   --copper-100    14px mono caps — an issued card's own name
 *   line        --neutral-300   14px serif — the fact under the title
 *   chipText    --neutral-300   10px mono caps — the receipts
 *   label       --copper-400    11px mono caps — the three band titles; 10px — the
 *                               two dot captions
 *   domain      --copper-500    11px mono caps — the clause a question belongs to
 *   note        --copper-600    9.5px mono caps — the empty field's own note
 *   icon/spine  --copper-300/400/500 — the small illustrations and the step diagram,
 *                               brighter than the strands they argue against
 *   blank       --copper-700    the dashed rule nobody wrote on
 *   caret       --copper-400    the cursor parked on it
 *
 * COPPER TEXT IS MONO ONLY, which is the rule `gap-failures-pattern` states as "no
 * copper prose": the card titles, the domains, the band headings and the field notes are
 * copper because they are LABELS, and every sentence on the stage is a neutral tier with
 * the `highlight()` keyword as its only copper. THIS SLIDE STILL QUOTES NOTHING — no
 * statistic, no source (`../content.ts` on why it deliberately carries none).
 *
 * THE FRAY'S FOUR TINTS — copper-500/600/700 and ONE neutral-500 — are the one place a
 * neutral enters the graphics: the strands are two dozen instances of a single role
 * ("a private rule"), spread over four adjacent tints as texture, and none of the four
 * is brighter than the spine that fed them. What was handed out stays the brightest
 * mark; what the vacuum produced is dimmer than the line that stopped. THAT ORDER IS
 * THE IMAGE.
 */
const TIER = {
  label: "var(--copper-400)",
  domain: "var(--copper-500)",
  note: "var(--copper-600)",
  cardTitle: "var(--copper-100)",
  icon: "var(--copper-300)",
  spine: "var(--copper-400)",
  dotIssued: "var(--copper-500)",
  dotUnwritten: "var(--copper-300)",
  ping: "var(--copper-500)",
  ask: "var(--neutral-100)",
  line: "var(--neutral-300)",
  chipText: "var(--neutral-300)",
  blank: "var(--copper-700)",
  caret: "var(--copper-400)",
  leaderLine: "var(--copper-200)",
  verdict: "var(--neutral-100)",
} as const;

/** The plates' own three tiers — dimmest chrome, the marks a plate draws, and the one
 *  bright thing each plate ends on. Kept apart from {@link TIER} because a plate is a
 *  picture and not a type row: nothing in here is ever read. */
const PLATE = {
  chrome: "var(--copper-800)",
  frame: "var(--copper-700)",
  mark: "var(--copper-500)",
  live: "var(--copper-400)",
  hot: "var(--copper-300)",
} as const;

/** The fray's four tints, indexed by each strand's deterministic `tint` — the palette
 *  half of `FRAY_STRANDS`, kept here because the geometry module carries no colour. */
const STRAND_TINTS = [
  "var(--copper-500)",
  "var(--copper-600)",
  "var(--copper-700)",
  "var(--neutral-500)",
] as const;

// ───────────────────── the two motions ─────────────────────

/**
 * The morph every persistent box rides between poses — geometry plus the gate, plus
 * E.4's hover pace for the chrome `./no-sop.css` owns (carried inline because this
 * string overrides any class transition).
 */
const MOVE =
  "left 650ms var(--ease), top 650ms var(--ease), " +
  "width 650ms var(--ease), height 650ms var(--ease), " +
  "opacity 450ms var(--ease), " +
  "border-color 200ms var(--ease), background 200ms var(--ease)";

/**
 * A pose gate: opacity written ALWAYS (the test's visibility hook), transitioned both
 * ways, delayed only on the way IN — leaving must be immediate or a pose walk
 * backwards drags ghosts through the morph.
 */
function gate(on: boolean, delayMs = 0, rise = false): CSSProperties {
  return {
    opacity: on ? 1 : 0,
    ...(rise ? { transform: on ? "translateY(0)" : "translateY(8px)" } : null),
    transition:
      `opacity 450ms var(--ease) ${on ? delayMs : 0}ms` +
      (rise ? `, transform 450ms var(--ease) ${on ? delayMs : 0}ms` : ""),
  };
}

/** A path drawing itself in — `no-sop-draw` over the pathLength=1 idiom. Mount
 *  choreography: lives on nodes that mount WITH their beat. */
const drawStyle = (delay: number, dur = 0.9): CSSProperties => ({
  strokeDasharray: 1,
  strokeDashoffset: 1,
  animation: `no-sop-draw ${dur}s var(--ease) ${delay}ms forwards`,
});

/**
 * A bar filling itself in, left to right — `no-sop-type`, the plates' second idiom and
 * the one that carries the whole rhyme this slide is built on: on plate 1 and plate 3
 * these bars are WORDS BEING WRITTEN, and the four question cards' fields are the same
 * rules with nothing ever written on them.
 *
 * `scaleX` and not `width`, so it composites on the GPU and so the rest frame is the
 * element's own authored width — which is what makes the reduced-motion squash park it
 * full rather than empty.
 */
const typeStyle = (x: number, y: number, delay: number, dur = 0.8): CSSProperties => ({
  transformBox: "view-box",
  transformOrigin: `${x}px ${y}px`,
  animation: `no-sop-type ${dur}s var(--ease) ${delay}ms both`,
});

// ───────────────────── the small illustrations ─────────────────────

/** One stroke set per content id — hairline pictograms in the icon tier, `aria-hidden`
 *  because every one of them sits beside the words it depicts. NO DIGIT and no text is
 *  painted by any of these: they are strokes only, so the no-digit rule
 *  (`../content.ts`) is a copy fact the marks cannot break. */
function Icon({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={TIER.icon}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

/** Keyed by the content tuples' own ids, so a reordered tuple keeps its pictures. */
const ICONS: Record<string, ReactNode> = {
  // a key handed over
  login: (
    <>
      <circle cx="7" cy="12" r="3.2" />
      <path d="M10.2 12H20M17 12v3.4M20 12v2.6" />
    </>
  ),
  // a screen, playing, on a stand
  demonstration: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11" rx="1.5" />
      <path d="M12 15.5v3M8.5 20.5h7" />
      <path d="M10.4 7.6l4.3 2.4-4.3 2.4z" fill={TIER.icon} stroke="none" />
    </>
  ),
  // the memo everyone got
  encouragement: (
    <>
      <rect x="3.5" y="6" width="17" height="12.5" rx="1.5" />
      <path d="M3.5 7.2l8.5 6 8.5-6" />
    </>
  ),
  // work going into a tray
  "may-go-in": (
    <>
      <path d="M12 3.5v6.4M9.2 7.2L12 10l2.8-2.8" />
      <path d="M3.5 13.5h4.6l1.8 2.4h4.2l1.8-2.4h4.6" />
      <path d="M3.5 13.5V19a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-5.5" />
    </>
  ),
  // the prohibition that was never drawn
  "may-never": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M6.6 6.6l10.8 10.8" />
    </>
  ),
  // scales, with nobody holding them
  "who-decides": (
    <>
      <path d="M12 4.5v14M8.5 19.5h7M5 7.5h14" />
      <path d="M5 7.5l-2.3 4.8M5 7.5l2.3 4.8M2.7 12.3a2.4 2.4 0 0 0 4.6 0" />
      <path d="M19 7.5l-2.3 4.8M19 7.5l2.3 4.8M16.7 12.3a2.4 2.4 0 0 0 4.6 0" />
    </>
  ),
  // the disclosure that has no address
  "who-hears": (
    <path d="M5.5 5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4 3.5V16h-1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
  ),
};

// ───────────────────── the three plates ─────────────────────

/**
 * One plate per issued card — the picture pose 0 is built around, keyed by the content
 * tuple's own id so a reordered tuple keeps its drawing (`gap-failures-pattern`'s
 * idiom). An id with no plate draws an empty box rather than throwing: a review URL must
 * never render a blank stage.
 *
 * ALL THREE ARE ONE `<svg>` EACH, 328×200, and every mark inside them is authored at the
 * coordinate it rests on — the animations move it away from there and back, never to it.
 * That is what makes the reduced-motion frame the composed frame.
 */
function Plate({ id }: { id: string }) {
  if (id === "login") return <LoginPlate />;
  if (id === "demonstration") return <DemoPlate />;
  if (id === "encouragement") return <MemoPlate />;
  return <div style={{ width: PLATE_WIDTH, height: PLATE_HEIGHT }} />;
}

function PlateSvg({ id, children }: { id: string; children: ReactNode }) {
  return (
    <svg
      data-testid={`no-sop-plate-${id}`}
      viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
      width={PLATE_WIDTH}
      height={PLATE_HEIGHT}
      fill="none"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      {children}
    </svg>
  );
}

/**
 * PLATE 1 · A LOGIN — a sign-in panel that fills itself in, and a lock that opens.
 *
 * THE RHYME IS THE POINT, and it is the one drawing on this stage that argues with
 * another: the panel's two fields are DASHED RULES, exactly like the four answer fields
 * in the band below, and here they get written on. Same mark, same tier, opposite fate.
 */
function LoginPlate() {
  return (
    <PlateSvg id="login">
      {/* the panel */}
      <rect x={18} y={26} width={216} height={148} rx={2} stroke={PLATE.frame} strokeWidth={1} />
      <rect x={38} y={48} width={58} height={3.5} fill={PLATE.mark} />

      {/* field 1 — a name typed in */}
      <rect x={38} y={76} width={30} height={2} fill={PLATE.chrome} />
      <line x1={38} y1={96} x2={214} y2={96} stroke={PLATE.frame} strokeWidth={1} strokeDasharray="3 4" />
      <rect x={38} y={88} width={124} height={5} fill={PLATE.live} style={typeStyle(38, 88, 500)} />

      {/* field 2 — and a secret, one character at a time */}
      <rect x={38} y={116} width={38} height={2} fill={PLATE.chrome} />
      <line x1={38} y1={136} x2={214} y2={136} stroke={PLATE.frame} strokeWidth={1} strokeDasharray="3 4" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle
          key={i}
          cx={42 + i * 13}
          cy={129}
          r={2.6}
          fill={PLATE.live}
          className="fade on"
          style={{ animationDelay: `${1150 + i * 70}ms` }}
        />
      ))}

      {/* the lock, open — drawn last, because it is what the two filled fields bought.
          Its own centre sits on the panel's, so the two objects read as one sentence. */}
      <rect x={258} y={92} width={48} height={40} rx={3} stroke={PLATE.mark} strokeWidth={1.4} />
      <circle cx={282} cy={106} r={3.4} fill={PLATE.mark} />
      <rect x={281} y={108} width={2} height={9} fill={PLATE.mark} />
      <path
        d="M 270 92 V 80 A 11 11 0 0 1 291 76"
        pathLength={1}
        stroke={PLATE.hot}
        strokeWidth={1.6}
        strokeLinecap="round"
        style={drawStyle(1750, 0.7)}
      />
      {/* still live — the one ambient mark on this plate */}
      <circle
        cx={282}
        cy={112}
        r={30}
        stroke={PLATE.mark}
        strokeWidth={1}
        style={{
          transformBox: "view-box",
          transformOrigin: "282px 112px",
          opacity: 0,
          animation: "no-sop-glow 3.4s ease-out 2300ms infinite",
        }}
      />
    </PlateSvg>
  );
}

/**
 * PLATE 2 · A DEMONSTRATION — a screen playing to a room.
 *
 * The progress bar fills ONCE and stays full: the session happened, it finished, and
 * that is the whole of what the organisation did here. The six figures arrive one at a
 * time and then never do anything, which is the honest picture of a room told to try
 * something.
 */
function DemoPlate() {
  const seats = [
    { x: 246, y: 74 },
    { x: 278, y: 74 },
    { x: 310, y: 74 },
    { x: 246, y: 128 },
    { x: 278, y: 128 },
    { x: 310, y: 128 },
  ];

  return (
    <PlateSvg id="demonstration">
      {/* the screen, on its stand */}
      <rect x={14} y={46} width={150} height={104} rx={2} stroke={PLATE.mark} strokeWidth={1.4} />
      <path d="M 89 150 v 16 M 70 166 h 38" stroke={PLATE.mark} strokeWidth={1.4} strokeLinecap="round" />

      {/* playing */}
      <path
        d="M 76 78 l 32 20 l -32 20 z"
        fill={PLATE.hot}
        style={{
          transformBox: "view-box",
          transformOrigin: "92px 98px",
          animation: "no-sop-beat 2.8s ease-in-out 900ms infinite",
        }}
      />

      {/* and it ran to the end */}
      <rect x={28} y={132} width={122} height={3} fill={PLATE.chrome} />
      <rect x={28} y={132} width={122} height={3} fill={PLATE.live} style={typeStyle(28, 132, 700, 1.8)} />

      {/* out into the room */}
      {[
        { d: "M 176 78 A 26 26 0 0 1 176 122", delay: 0 },
        { d: "M 176 66 A 38 38 0 0 1 176 134", delay: 700 },
        { d: "M 176 54 A 50 50 0 0 1 176 146", delay: 1400 },
      ].map((arc) => (
        <path
          key={arc.delay}
          d={arc.d}
          stroke={PLATE.frame}
          strokeWidth={1.2}
          strokeLinecap="round"
          style={{ opacity: 0, animation: `no-sop-wave 2.9s ease-out ${1000 + arc.delay}ms infinite` }}
        />
      ))}

      {/* the room — six of them, arriving one at a time */}
      {seats.map((seat, i) => (
        <g key={i} className="fade on" style={{ animationDelay: `${900 + i * 130}ms` }}>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: `${seat.x}px ${seat.y}px`,
              animation: `no-sop-nudge ${2.6 + (i % 3) * 0.4}s ease-in-out ${1800 + i * 200}ms infinite`,
            }}
          >
            <circle cx={seat.x} cy={seat.y} r={6.5} stroke={PLATE.mark} strokeWidth={1.3} />
            <path
              d={`M ${seat.x - 10.5} ${seat.y + 20} a 10.5 10.5 0 0 1 21 0`}
              stroke={PLATE.mark}
              strokeWidth={1.3}
            />
          </g>
        </g>
      ))}
    </PlateSvg>
  );
}

/**
 * PLATE 3 · ENCOURAGEMENT — the memo, writing itself, signed and sealed.
 *
 * THE CARD THIS PLATE BELONGS TO IS THE PIVOT OF THE WHOLE SLIDE (`../content.ts`): the
 * encouragement is the one thing anybody sat down and wrote. So this is the only plate
 * whose subject is WRITING, it uses the same `no-sop-type` bars the login form does, and
 * it ends on a signature and a seal — the two marks the four fields below it never get.
 */
function MemoPlate() {
  const lines = [
    { y: 62, w: 170 },
    { y: 78, w: 162 },
    { y: 94, w: 170 },
    { y: 110, w: 146 },
    { y: 126, w: 166 },
  ];

  return (
    <PlateSvg id="encouragement">
      {/* the sheet — on the card's own left rail, like the panel and the screen on the
          two plates beside it, with the outcome standing to its right */}
      <rect x={18} y={14} width={214} height={172} rx={2} stroke={PLATE.frame} strokeWidth={1} />
      <rect x={40} y={38} width={76} height={4.5} fill={PLATE.mark} />

      {/* the words, one line at a time — in the MARK tier and not the chrome tier: this
          is the one thing on the stage that somebody wrote, so it may not be dimmer than
          the login form's two typed values next door */}
      {lines.map((line, i) => (
        <rect
          key={line.y}
          x={40}
          y={line.y}
          width={line.w}
          height={2.5}
          fill={PLATE.mark}
          style={typeStyle(40, line.y, 350 + i * 170, 0.7)}
        />
      ))}

      {/* signed */}
      <path
        d="M 42 162 c 9 -14 18 6 27 -4 s 13 12 24 -2 s 15 10 26 -6"
        pathLength={1}
        stroke={PLATE.hot}
        strokeWidth={1.6}
        strokeLinecap="round"
        style={drawStyle(1300, 1.1)}
      />

      {/* and sealed — outside the sheet, where the lock stands on plate 1 */}
      <g className="fade on" style={{ animationDelay: "2350ms" }}>
        <circle cx={282} cy={100} r={15} stroke={PLATE.mark} strokeWidth={1.3} />
        <path
          d="M 274.5 100 l 5.5 5.5 l 9.5 -11.5"
          stroke={PLATE.mark}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={282}
          cy={100}
          r={26}
          stroke={PLATE.mark}
          strokeWidth={1}
          style={{
            transformBox: "view-box",
            transformOrigin: "282px 100px",
            opacity: 0,
            animation: "no-sop-glow 3.4s ease-out 2900ms infinite",
          }}
        />
      </g>
    </PlateSvg>
  );
}

// ───────────────────── type registers ─────────────────────

const monoLabel: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: TIER.label,
  whiteSpace: "nowrap",
};

const dotLabel: CSSProperties = {
  position: "absolute",
  width: DOT_LABEL_WIDTH,
  textAlign: "center",
  fontFamily: "var(--mono)",
  fontSize: 10,
  lineHeight: 1.3,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: TIER.label,
  whiteSpace: "nowrap",
};

/** An issued card's own name — `gap-failures-pattern`'s `cardTitle`, same size, same
 *  tracking, same tier, so the two slides' cards are read as one kind of object. */
const cardTitle: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 14,
  letterSpacing: "0.1em",
  lineHeight: 1.3,
  textTransform: "uppercase",
  color: TIER.cardTitle,
  whiteSpace: "nowrap",
};

const chipText: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: TIER.chipText,
  whiteSpace: "nowrap",
};

/** Geometry only — border and fill live in `.no-sop-box` (./no-sop.css) so the
 *  E.4-style :hover can override them. */
const boxShell: CSSProperties = {
  position: "absolute",
  boxSizing: "border-box",
  overflow: "hidden",
};

const layer: CSSProperties = { position: "absolute", inset: 0 };

/** Every row inside a card sits on one left rail and one measure — the pattern
 *  `gap-failures-pattern`'s `cardRow` keeps. */
function cardRow(top: number, padX: number, width: number): CSSProperties {
  return { position: "absolute", left: padX, top, width };
}

// ───────────────────── the figure ─────────────────────

export interface NoSopBeatsProps {
  /** 0…3. See `../gap-no-sop.tsx` for what each pose argues. */
  pose: number;
}

export function NoSopBeats({ pose }: NoSopBeatsProps) {
  // `>=` and not `===`, the step-reveal rule: a pose is everything argued so far.
  const showQuestions = pose >= 1;
  const issuedCompact = pose >= 1; // the receipts land as the questions arrive
  const questionsCompact = pose >= 2; // and the second band follows one beat later
  const showFray = pose >= 2;
  const showCloser = pose >= 3;

  const spineTop = questionsCompact ? SPINE_Y - SPINE_RISE : SPINE_Y;

  return (
    <div
      style={{
        position: "absolute",
        left: FIGURE_LEFT,
        top: FIGURE_TOP,
        width: FIGURE_WIDTH,
        height: FIGURE_HEIGHT,
      }}
    >
      {/* ───── the three band titles — each arrives with its beat and STAYS (owner
          call: titles never replace each other). Band 2's shelf is FIXED since the
          2026-08-14 re-cut: the issued row is already compact when this heading lands,
          so there is only one place for it to be.

          ALL THREE ARE INERT, AT EVERY POSE, and that is a bug fix rather than tidiness:
          heading 2 sits at y=76 and heading 3 at y=180, both INSIDE the first issued
          card's 26→356 footprint, and a gated element is invisible but still
          hit-testable. Before this, hovering the first card over either heading's own
          box did nothing. Nothing in this row is ever interactive. ───── */}
      <div
        data-testid="no-sop-issued-eyebrow"
        style={{ position: "absolute", left: 0, top: 0, ...monoLabel, pointerEvents: "none" }}
      >
        {C.issuedEyebrow}
      </div>
      <div
        data-testid="no-sop-unwritten-eyebrow"
        style={{
          position: "absolute",
          left: 0,
          top: UNWRITTEN_TITLE_TOP,
          ...monoLabel,
          pointerEvents: "none",
          ...gate(showQuestions, 100),
        }}
      >
        {C.unwrittenEyebrow}
      </div>
      <div
        data-testid="no-sop-condition-eyebrow"
        style={{
          position: "absolute",
          left: 0,
          top: CONDITION_TITLE_TOP,
          ...monoLabel,
          pointerEvents: "none",
          ...gate(showFray, 300),
        }}
      >
        {C.conditionEyebrow}
      </div>

      {/* ───── the step diagram — the spine, its two dots, the fan, the closer's
          marching line. ONE svg, CSS-animated only: zero SMIL (see the header). ── */}
      <svg
        data-testid="no-sop-diagram"
        viewBox={`0 0 ${FIGURE_WIDTH} ${FIGURE_HEIGHT}`}
        width={FIGURE_WIDTH}
        height={FIGURE_HEIGHT}
        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
        aria-hidden="true"
      >
        {/* the spine — authored LOW, riding up as one group when the questions compact,
            so everything on it moves as one object */}
        <g
          data-testid="no-sop-spine"
          style={{
            transform: questionsCompact ? `translateY(-${SPINE_RISE}px)` : "translateY(0)",
            transition: "transform 650ms var(--ease)",
          }}
        >
          {/* pose 0 — the first segment and its dot: the rollout DELIVERED here */}
          <path
            data-testid="no-sop-spine-issued"
            d={`M ${SPINE_X0} ${SPINE_Y} H ${DOT_ISSUED_X}`}
            pathLength={1}
            fill="none"
            stroke={TIER.spine}
            strokeWidth={2.5}
            style={drawStyle(150, 0.6)}
          />
          <circle
            data-testid="no-sop-dot-issued"
            cx={DOT_ISSUED_X}
            cy={SPINE_Y}
            r={4}
            fill={TIER.dotIssued}
            className="fade on"
            style={{ animationDelay: "650ms" }}
          />

          {/* pose 1 — the line reaches the questions and STOPS. Mounted on arrival so
              the walk back replays the draw. */}
          {showQuestions && (
            <>
              <path
                data-testid="no-sop-spine-unwritten"
                d={`M ${DOT_ISSUED_X} ${SPINE_Y} H ${DOT_UNWRITTEN_X}`}
                pathLength={1}
                fill="none"
                stroke={TIER.spine}
                strokeWidth={2.5}
                style={drawStyle(100, 0.7)}
              />
              <circle
                data-testid="no-sop-dot-unwritten"
                cx={DOT_UNWRITTEN_X}
                cy={SPINE_Y}
                r={4.5}
                fill={TIER.dotUnwritten}
                className="fade on"
                style={{ animationDelay: "700ms" }}
              />
              {/* the terminus waiting for an answer that never comes — two staggered
                  rings, pure decoration, parked invisible under reduced motion */}
              {[0, 1.3].map((d) => (
                <circle
                  key={d}
                  cx={DOT_UNWRITTEN_X}
                  cy={SPINE_Y}
                  r={PING_RADIUS}
                  fill="none"
                  stroke={TIER.ping}
                  strokeWidth={1.3}
                  style={{
                    transformBox: "view-box",
                    transformOrigin: `${DOT_UNWRITTEN_X}px ${SPINE_Y}px`,
                    transform: "scale(0.12)",
                    opacity: 0,
                    animation: `no-sop-ping 2.6s ease-out ${900 + d * 1000}ms infinite`,
                  }}
                />
              ))}
            </>
          )}
        </g>

        {/* pose 2 — the fan, authored at the risen position it appears in. Dims to an
            afterimage when the closer lands: argued past, still true. */}
        {showFray && (
          <g
            data-testid="no-sop-fray"
            className="no-sop-dimmable"
            style={{ opacity: showCloser ? 0.16 : 1 }}
          >
            {FRAY_STRANDS.map((s, i) => (
              <g
                key={i}
                style={{
                  transformBox: "view-box",
                  transformOrigin: `${FAN_ORIGIN.x}px ${FAN_ORIGIN.y}px`,
                  animation: `no-sop-wobble ${s.swayDur}s ease-in-out ${s.swayDelay}s infinite alternate`,
                }}
              >
                <path
                  d={s.d}
                  pathLength={1}
                  fill="none"
                  stroke={STRAND_TINTS[s.tint]}
                  strokeWidth={1.1}
                  opacity={s.opacity}
                  style={drawStyle(s.delay + 350)}
                />
                <rect
                  x={s.tick.x - 1}
                  y={s.tick.y - 6}
                  width={2}
                  height={12}
                  fill={STRAND_TINTS[s.tint]}
                  opacity={s.opacity}
                  className="fade on"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: `${s.tick.x}px ${s.tick.y}px`,
                    rotate: `${s.tick.rot}deg`,
                    animationDelay: `${s.delay + 1100}ms`,
                  }}
                />
              </g>
            ))}
          </g>
        )}

        {/* pose 3 — the one line only the leader can write: dashed because it is not
            written yet, marching because it is waiting on the room */}
        {showCloser && (
          <path
            data-testid="no-sop-leader-line"
            d={`M ${FAN_ORIGIN.x} ${FAN_ORIGIN.y} H ${BAND_RIGHT}`}
            fill="none"
            stroke={TIER.leaderLine}
            strokeWidth={2}
            strokeDasharray="12 9"
            style={{
              animation:
                "fadeReveal 0.5s var(--ease) 250ms both, no-sop-march 1.7s linear 250ms infinite",
            }}
          />
        )}
      </svg>

      {/* ───── the dot captions — the diagram's own titles, riding the spine ───── */}
      <div
        data-testid="no-sop-dot-label-issued"
        className="fade on"
        style={{
          ...dotLabel,
          left: DOT_ISSUED_X - DOT_LABEL_WIDTH / 2,
          top: spineTop + DOT_LABEL_OFFSET_Y,
          transition: "top 650ms var(--ease)",
          animationDelay: "700ms",
        }}
      >
        {C.issuedDotLabel}
      </div>
      {showQuestions && (
        <div
          data-testid="no-sop-dot-label-unwritten"
          className="fade on"
          style={{
            ...dotLabel,
            left: DOT_UNWRITTEN_X - DOT_LABEL_WIDTH / 2,
            top: spineTop + DOT_LABEL_OFFSET_Y,
            transition: "top 650ms var(--ease)",
            animationDelay: "750ms",
          }}
        >
          {C.unwrittenDotLabel}
        </div>
      )}

      {/* ───── the issued band — a plate card at pose 0, a receipt after. The box is
          the persistent node (MOVE); the pop is on an inner layer; the two faces
          crossfade inside it. ───── */}
      {C.issued.map((item, i) => (
        <div
          key={item.id}
          data-testid={`no-sop-issued-${item.id}`}
          className="no-sop-box"
          style={{
            ...boxShell,
            left: issuedBoxLeft(i),
            top: ISSUED_TOP,
            width: ISSUED_BOX_WIDTH,
            height: issuedCompact ? CHIP_HEIGHT : ISSUED_HERO_HEIGHT,
            transition: MOVE,
          }}
        >
          <div style={{ ...layer, animation: `no-sop-pop 0.55s var(--ease) ${350 + i * 220}ms both` }}>
            {/* the card face — plate, hairline, name, fact */}
            <div
              data-testid={`no-sop-issued-hero-${item.id}`}
              style={{ ...layer, ...gate(!issuedCompact) }}
            >
              <div style={{ position: "absolute", left: CARD_PAD_X, top: PLATE_TOP }}>
                <Plate id={item.id} />
              </div>
              <div
                aria-hidden
                className="no-sop-hairline"
                style={{
                  position: "absolute",
                  left: CARD_PAD_X,
                  top: CARD_HAIRLINE_Y,
                  width: CARD_INNER_WIDTH,
                  height: CARD_HAIRLINE_HEIGHT,
                }}
              />
              <div
                data-testid={`no-sop-issued-title-${item.id}`}
                style={{ ...cardRow(ISSUED_TITLE_Y, CARD_PAD_X, CARD_INNER_WIDTH), ...cardTitle }}
              >
                {item.title}
              </div>
              <p
                data-testid={`no-sop-issued-line-${item.id}`}
                style={{
                  ...cardRow(ISSUED_LINE_Y, CARD_PAD_X, CARD_INNER_WIDTH),
                  margin: 0,
                  height: ISSUED_LINE_HEIGHT,
                  overflow: "hidden",
                  fontFamily: "var(--serif)",
                  fontSize: 14,
                  lineHeight: 1.45,
                  color: TIER.line,
                }}
              >
                {highlight(item.line, item.lineKw)}
              </p>
            </div>
            {/* chip face — the card's own name, and nothing it did not already say */}
            <div
              data-testid={`no-sop-issued-chip-${item.id}`}
              style={{
                ...layer,
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                ...gate(issuedCompact, 250),
              }}
            >
              <Icon size={14}>{ICONS[item.id]}</Icon>
              <span style={chipText}>{item.title}</span>
            </div>
          </div>
        </div>
      ))}

      {/* ───── the question band — a 2×2 grid of cards under the receipts, a four-chip
          row after. THREE ROWS PER CARD AND THE THIRD IS THE FIELD: the domain the
          missing clause belongs to, the question as the desk asks it, and a dashed rule
          with a caret parked on it that is never written on at any pose. ───── */}
      {C.questions.map((q, i) => (
        <div
          key={q.id}
          data-testid={`no-sop-question-${q.id}`}
          className="no-sop-box"
          style={{
            ...boxShell,
            left: questionsCompact ? questionChipLeft(i) : questionHeroLeft(i),
            top: questionsCompact ? QUESTION_CHIP_TOP : questionHeroTop(i),
            width: questionsCompact ? QUESTION_CHIP_WIDTH : QUESTION_HERO_WIDTH,
            height: questionsCompact ? CHIP_HEIGHT : QUESTION_HERO_HEIGHT,
            // INERT UNTIL IT IS ARGUED, which is the bug fix `gap-failures-pattern` had
            // to make for the same reason one slide later. At pose 0 these four boxes are
            // invisible and standing over the three issued cards' 26→356 footprint — a
            // gated element still takes a pointer — so hovering an issued card lit it
            // only in the strips no question box covered. The hole opens exactly when the
            // boxes are painted.
            pointerEvents: showQuestions ? "auto" : "none",
            ...gate(showQuestions, 200 + i * 170),
            transition: `${MOVE}, opacity 450ms var(--ease) ${showQuestions ? 200 + i * 170 : 0}ms`,
          }}
        >
          {/* card face */}
          <div
            data-testid={`no-sop-question-hero-${q.id}`}
            style={{ ...layer, ...gate(!questionsCompact) }}
          >
            <div
              style={{
                ...cardRow(QUESTION_DOMAIN_Y, QUESTION_PAD_X, QUESTION_INNER_WIDTH),
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Icon size={16}>{ICONS[q.id]}</Icon>
              <span data-testid={`no-sop-question-domain-${q.id}`} style={{ ...monoLabel, color: TIER.domain }}>
                {q.domain}
              </span>
            </div>
            <p
              data-testid={`no-sop-question-ask-${q.id}`}
              style={{
                ...cardRow(QUESTION_ASK_Y, QUESTION_PAD_X, QUESTION_INNER_WIDTH),
                margin: 0,
                fontFamily: "var(--serif)",
                fontSize: 17,
                lineHeight: 1.3,
                color: TIER.ask,
                whiteSpace: "nowrap",
              }}
            >
              {q.ask}
            </p>

            {/* the answer field. THE CARET IS THE ONLY THING ON THIS STAGE THAT MOVES
                FOREVER AND MEANS SOMETHING: a cursor sitting at the head of a line
                nobody typed on. */}
            <div
              style={{
                ...cardRow(QUESTION_FIELD_NOTE_Y, QUESTION_PAD_X, QUESTION_INNER_WIDTH),
                display: "flex",
                alignItems: "center",
                gap: 9,
              }}
            >
              <span
                aria-hidden
                data-testid={`no-sop-caret-${q.id}`}
                style={{
                  width: QUESTION_CARET_WIDTH,
                  height: QUESTION_CARET_HEIGHT,
                  background: TIER.caret,
                  animation: "no-sop-caret 1.5s var(--ease) infinite",
                }}
              />
              <span
                data-testid={`no-sop-blank-note-${q.id}`}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: TIER.note,
                  whiteSpace: "nowrap",
                }}
              >
                {C.blankNote}
              </span>
            </div>
            {/* …and the rule itself: dashed, because a solid one reads as a border and a
                dashed one reads as a line somebody was supposed to write on. EMPTY AT
                EVERY POSE — the test holds it as an ancestry fact and a content fact. */}
            <div
              data-testid={`no-sop-answer-blank-${q.id}`}
              style={{
                position: "absolute",
                left: QUESTION_PAD_X,
                right: QUESTION_PAD_X,
                top: QUESTION_FIELD_RULE_Y,
                height: QUESTION_FIELD_RULE_HEIGHT,
                borderTop: `${QUESTION_FIELD_RULE_HEIGHT}px dashed ${TIER.blank}`,
              }}
            />
          </div>
          {/* chip face */}
          <div
            data-testid={`no-sop-question-chip-${q.id}`}
            style={{
              ...layer,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              ...gate(questionsCompact, 250),
            }}
          >
            <Icon size={12}>{ICONS[q.id]}</Icon>
            <span style={{ ...chipText, fontSize: 9.5 }}>{q.short}</span>
          </div>
        </div>
      ))}

      {/* ───── pose 3 — the verdict, under the marching line: the one sentence here
          addressed to the room, and what stops four unanswered questions and a frayed
          line reading as an accusation. ───── */}
      {showCloser && (
        <div style={{ position: "absolute", left: VERDICT_LEFT, top: VERDICT_TOP, width: VERDICT_WIDTH }}>
          <Reveal
            on
            as="p"
            delay={650}
            data-testid="no-sop-closer"
            style={{
              margin: 0,
              fontFamily: "var(--serif)",
              fontSize: 24,
              lineHeight: 1.45,
              textAlign: "center",
              color: TIER.verdict,
            }}
          >
            {highlight(C.closer, C.closerKw)}
          </Reveal>
        </div>
      )}
    </div>
  );
}
