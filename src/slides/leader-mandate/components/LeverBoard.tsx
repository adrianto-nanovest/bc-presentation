// Four levers — one hero each, then all four over the one desk they arrive at.
//
// ═══ RE-CUT 2026-08-15 (owner's call). What this file drew was ONE STAGE HOLDING
// EVERYTHING: four lever rows of 13.5px prose down the left, a four-column SIGN-OFF FORM
// down the right with sixteen boxes in it, a bordered citation band under both, and the ask
// under that — assembled over five poses that only ever added. `../levers-geometry.ts`'s
// header records the four complaints that retired it. The shape of the answer is K.1's and
// K.2's, and deliberately so: HEROES, A RECAP, A THESIS.
//
//   0…3 — ONE LEVER EACH. A 260px animated mark on the text margin, the act beside it in
//         34px display serif, one line of why under that, and the lever's own consequence
//         on the shelf at the foot of the stage. Four poses, four figures, one composition.
//     4 — ALL FOUR, AND WHERE THEY END. The four levers as cards on one shelf, each with its
//         own mark at chip scale, and four curves leaving them for a single box that says
//         `YOU`. The one frame that says the four acts have ONE signature between them — no
//         hero pose can, because a hero shows one lever and the claim is about the set.
//     5 — THE THESIS, UNDER THE RECAP THAT EARNS IT. A copper rule and one line of 19px
//         serif, and POSE 4 DOES NOT MOVE.
//
// ═══ WHY THE FORM WENT, IN ONE PARAGRAPH, BECAUSE IT IS THE DECISION A READER WILL QUESTION
// FIRST. The retired figure drew a column for every authority a lever COULD have waited on
// — `YOU`, `THE COMMITTEE`, `GROUP HR`, `A BUDGET CYCLE` — and filled four boxes of sixteen,
// all in the first column. As arithmetic it was sound and as an image it was a COUNT OF
// ABSENCES: three of its four columns existed only to be empty, and only one of the four
// named anybody the room could identify. A leader who stops to ask who "the committee" is has
// stopped reading the levers, and the slide has no answer to give. The convergence makes the
// identical claim out of things that are all on the stage for a reason: four curves, one box.
//
// ═══ THE FOUR HEROES ARE MUTUALLY EXCLUSIVE AND THE LAST TWO ACCUMULATE, which is K.1's and
// K.2's split and is made the same way — by conditional MOUNT rather than by a gated `Reveal`.
// Two gated scenes would cross-fade into each other in the same region of stage, and a gated
// scene plays its stagger once at slide mount, so walking backwards would find the scene
// already assembled. Mounting makes React drop the leaving figure in the same frame and
// restarts every `Reveal` in the arriving one.
//
// ═══ ONE SCENE COMPONENT FOR ALL FOUR HEROES, and it is the decision the run of four rests
// on. Same margin, same mark size, same two shelves, same bottom line. Given four scenes the
// click would re-layout and the room would read four figures; given one, only the mark and
// the words change, and the comparison is the click itself.
//
// ═══ IT READS NO VARIANT AND NO BRAND, and like `./EnablementModel.tsx` it takes no resolved
// brand block either: this slide has no brand axis at all. `../content.ts` carries the
// argument and it is NOT K.1's argument — the short form is that the subject of this stage is
// the person in the room, and that person is the same person in both rooms.
//
// ═══ CSS VARS ONLY, no hex and no rgba() literal. Rank is a COLOUR TIER — between a lever's
// name and what it says, and between the four cards and the box they arrive at — and NEVER
// opacity, which on a step-reveal deck means "not revealed yet", i.e. time.
//
// ═══ THERE IS AN `<svg>` ON THIS SLIDE NOW, AND THE RULE THAT WENT WITH IT IS GONE. This file
// used to argue that keeping the whole of `src/slides/leader-mandate/` free of `<svg>` closed
// the SMIL question by construction. K.1's recap draws four connectors in one and K.2's ladder
// is a path, so the property was already lost twice over — and lost for the right reason: a
// curve between two boxes is not a rectangle. THE RULE THAT SURVIVES IS THE ONE THAT WAS
// LOAD-BEARING: ZERO SMIL NODES, at every pose, under any motion preference. Every mark here
// is a CSS animation, which the global `prefers-reduced-motion: reduce` rule can reach and an
// `<animate>` element cannot.
import type { CSSProperties } from "react";
// Section E's copy, the tree's de facto shared reveal primitive. The census of its importers
// is kept by `./EnablementModel.tsx`; a fourth copy under this directory would be the wrong
// answer to three existing ones, and centralising them is a cleanup this ticket is not.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  CONTENT_WIDTH,
  EYEBROW_TOP,
  HERO_ACT_HEIGHT,
  HERO_ACT_LEADING,
  HERO_ACT_SIZE,
  HERO_GLYPH_LEFT,
  HERO_GLYPH_SIZE,
  HERO_GLYPH_STROKE,
  HERO_GLYPH_TOP,
  HERO_NOTE_HEIGHT,
  HERO_NOTE_LEADING,
  HERO_NOTE_SIZE,
  HERO_NOTE_TOP,
  HERO_NOTE_WIDTH,
  HERO_TEXT_LEFT,
  HERO_TEXT_TOP,
  HERO_TEXT_WIDTH,
  LABEL_HEIGHT,
  LABEL_SIZE,
  LABEL_TRACKING,
  LEVER_COUNT,
  RECAP_CARD_HEIGHT,
  RECAP_CARD_TOP,
  RECAP_CARD_WIDTH,
  RECAP_GLYPH_GAP,
  RECAP_GLYPH_SIZE,
  RECAP_GLYPH_STROKE,
  RECAP_HAIRLINE_HEIGHT,
  RECAP_HAIRLINE_TOP,
  RECAP_LABEL_SIZE,
  RECAP_LINE_HEIGHT,
  RECAP_LINE_LEADING,
  RECAP_LINE_SIZE,
  RECAP_LINE_TOP,
  RECAP_PAD_X,
  RECAP_PAD_Y,
  RECAP_POSE,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  SIGN_BOX_HEIGHT,
  SIGN_BOX_LEFT,
  SIGN_BOX_TOP,
  SIGN_BOX_WIDTH,
  SIGN_LABEL_SIZE,
  SIGN_NOTE_HEIGHT,
  SIGN_NOTE_TOP,
  STAGE,
  THESIS_HEIGHT,
  THESIS_POSE,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  connectorPath,
  glyphStroke,
  recapCardLeft,
} from "../levers-geometry";
// The two things all three slides in THE MANDATE still print identically — the mono register
// and the reveal's lead-in. See that module for what stays local here and why.
import { REVEAL_LEAD_MS, SHARED_TIER, mono } from "../type-registers";
import { mandateLeversContent as C } from "../content";
import { LEVER_GLYPH_IDS, LeverGlyph, type LeverGlyphId } from "./LeverGlyphs";
import "./levers.css";

// ───────────────────── the pin between the copy and the marks ─────────────────────

/**
 * Every glyph the copy names has actually been drawn — checked ONCE, AT MODULE LOAD.
 *
 * `../content.ts` types `Lever.glyph` as `string`, because a content module may not import a
 * component; `./LeverGlyphs.tsx` owns the union of ids a mark exists for. The cast at the call
 * sites below is a promise, and this is where the promise is kept. Without it, a lever whose
 * `glyph` is `"budget"` would compile, pass every type check, and print a 260px hole in the
 * middle of a hero pose that no bounding check reports.
 *
 * AT LOAD AND NOT IN A `useEffect`, so the failure lands in every deck that composes this
 * slide and in every test that imports it — not only in the ones that happen to render pose 2.
 * K.1's and K.2's figures hold the identical guard over their own marks.
 */
const DRAWN: ReadonlySet<string> = new Set(LEVER_GLYPH_IDS);
for (const lever of C.levers) {
  if (!DRAWN.has(lever.glyph)) {
    throw new Error(
      `LeverBoard: lever "${lever.id}" names the mark "${lever.glyph}", which nothing draws — ` +
        `\`./LeverGlyphs.tsx\` has ${LEVER_GLYPH_IDS.join(", ")}.`,
    );
  }
}

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and the same tier for every lever.
 *
 * THE FOUR LEVERS ARE DELIBERATELY UNRANKED, at both scales. All four acts are
 * `--neutral-50`, all four notes `--neutral-300`, all four names `--copper-100`, all four
 * marks one size per scene — reading the four poses in order nothing changes, because a lever
 * nobody pulls takes the other three down with it and a brighter one would be a claim nobody
 * authored. `./EnablementModel.tsx` makes the identical call about its pillars, and this stage
 * inherits it rather than re-arguing it.
 *
 * THE ONE RANK ON THIS STAGE IS BETWEEN THE FOUR CARDS AND THE BOX THEY ARRIVE AT, and it is
 * two stops of copper on the border plus the size of the word inside it. That is the recap's
 * whole argument, so it is the one place a difference is allowed to mean something.
 *
 * IT NAMES THE TWO ENTRIES IT SHARES RATHER THAN SPREADING {@link SHARED_TIER}, which is the
 * call K.1's and K.2's tables both make. The version of this file that spread the whole object
 * in was also the version that printed a band; with the band gone a spread would quietly
 * re-adopt colours this stage no longer has an object for.
 */
const TIER = {
  /** The mono line under the headline — one per scene, and the copper label tier every sibling
   *  leader slide gives the same line. */
  eyebrow: SHARED_TIER.heading,
  /** The ask. One tier over the scene lines and one under the headline. */
  thesis: SHARED_TIER.closer,
  /** A scene's own bottom line — one tier under the ask, same size, same shelf. Rank on this
   *  stage is a colour tier and never a size. */
  sceneThesis: "var(--neutral-200)",

  /** THE ACT, at hero size. The brightest type under the headline, because on four of the six
   *  poses it is the only thing the slide is saying. */
  act: "var(--neutral-50)",
  /** Why the act is the act. gh#50's floor for text on this stage, which is where a reason
   *  belongs: quietest, and still legible from the back row. */
  note: "var(--neutral-300)",

  /** A box: a hairline frame and a ground, and nothing else, so `.box-hover`'s overlay can
   *  reach the border. */
  frame: "var(--copper-700)",
  ground: "var(--neutral-900)",

  /** A recap card's own name — the lever, in the label register. The loud token, because it is
   *  what ties the card to the hero pose the room has already seen. */
  cardLabel: "var(--copper-100)",
  /** What the card says. Same tier as a hero's note: it is the same sentence, compressed. */
  line: "var(--neutral-300)",

  /** A connector — a curve from one lever to the one place it ends. Quieter than the boxes at
   *  either end, because it is the relation and they are the things. */
  connector: "var(--copper-600)",
  /** WHAT TRAVELS ALONG IT. Brighter than the curve it rides, because the curve is the route
   *  and this is the traffic: a room reading the recap has to be able to see which END the
   *  four are moving toward, and a current at the route's own tier would read as texture. */
  current: "var(--copper-300)",

  /** THE SIGN BOX. Two stops up the ramp from every other frame on the stage, which is the one
   *  rank the recap draws: four cards of equal standing, and the box they all arrive at. */
  signFrame: "var(--copper-500)",
  signLabel: "var(--copper-100)",
  /** The mono line under it. The label tier, because it is a caption on the figure rather than
   *  a sentence the deck is arguing. */
  signNote: "var(--copper-400)",
} as const;

// ───────────────────── type registers ─────────────────────
// THREE FAMILIES, each earning its place: mono for anything the room reads as a LABEL,
// `--display` for the ACT (an act is a title, and the display face is what this deck sets a
// title in), and `--serif` for the six bottom lines, which are the deck's argument register.
// The sans face carries the two explanations — a hero's note and a recap card's line — and
// nothing else.
//
// The MONO half is `../type-registers.ts`'s, shared with K.1 and K.2 because the three rooms
// see the same labels one click apart; every size below is this file's, because they are cut
// against this slide's own two column widths.
//
// Both floors are gh#50's: 9.5px for a mono label, 10.5px for prose, and nothing here rests
// below `--neutral-300`. Neither is enforced from this file — a computed font size is not
// something jsdom has — so the sizes are stated once, in `../levers-geometry.ts`, where a
// reviewer can check them against the floor in one place. The smallest type on this stage is
// the 11px mono labels, one and a half pixels clear of the mono floor.

/** THE ACT — the largest type on the stage after the headline. */
const act: CSSProperties = {
  fontFamily: "var(--display)",
  fontSize: HERO_ACT_SIZE,
  lineHeight: HERO_ACT_LEADING,
  color: TIER.act,
};

/** THE NOTE under it. Not mono and not display: a reason set in either register would read as
 *  part of the act rather than as an argument about it. */
const note: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: HERO_NOTE_SIZE,
  lineHeight: HERO_NOTE_LEADING,
  color: TIER.note,
};

/** The same sans register, cut smaller for the recap's narrower card. */
const cardLine: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: RECAP_LINE_SIZE,
  lineHeight: RECAP_LINE_LEADING,
  color: TIER.line,
};

/** Geometry, a border and a ground — and NOTHING ELSE, which is what lets `.box-hover`'s
 *  overlay reach the border. An inline `borderColor` would win against every stylesheet rule
 *  at any specificity, so the hover is painted by a pseudo-element instead and this helper
 *  stays the only place a box's own chrome is written. */
function shell(
  left: number,
  top: number,
  width: number,
  height: number,
  frame: string = TIER.frame,
): CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
    boxSizing: "border-box",
    border: `1px solid ${frame}`,
    background: TIER.ground,
  };
}

// ───────────────────── the timetable ─────────────────────

/**
 * How far behind the one before it each element of a scene arrives.
 *
 * ONE LEAD-IN AND ONE STAGGER FOR THE WHOLE SLIDE, unlike the figure this replaced, which had
 * three: one for the levers, one for the form's columns and one for its marks. Six poses that
 * each revealed at their own speed would read as six slides rather than as one argument
 * walked, and the room has no way to name what changed. The lead-in is `REVEAL_LEAD_MS`,
 * shared with K.1 and K.2 (`../type-registers.ts`), because the click is shared; 90ms is
 * `leader-invest`'s own step and both siblings'.
 */
const STAGGER_MS = 90;

/** How many steps into a scene an element arrives, as milliseconds of delay. */
const delay = (step: number) => REVEAL_LEAD_MS + step * STAGGER_MS;

/** Where each scene's first element sits in its own reveal order. */
const SCENE_STEP = { eyebrow: 0, first: 1 } as const;

/**
 * A hero's own beats — the act, then its reason, then what follows from it.
 *
 * THE BOTTOM LINE ARRIVES LAST ON EVERY HERO, and it is last rather than first because the
 * sentence is a CONSEQUENCE of the act above it: read before the act it is an assertion the
 * room has nothing to check against; read after it, it is a conclusion.
 */
const HERO_STEP = { act: SCENE_STEP.first, note: SCENE_STEP.first + 1, thesis: SCENE_STEP.first + 2 } as const;

/**
 * The recap's beats: the four cards, then the four curves, then the box they arrive at.
 *
 * THE CURVES CANNOT LEAD THE CARDS AND THE BOX CANNOT LEAD THE CURVES, which is the whole
 * reason these are derived from `LEVER_COUNT` rather than typed. A curve that arrived before
 * the card at its far end would be a line pointing at nothing, and a box that arrived before
 * the curves would be an answer to a question nobody had drawn yet.
 */
const RECAP_STEP = {
  card: (i: number) => SCENE_STEP.first + i,
  connector: (i: number) => SCENE_STEP.first + LEVER_COUNT + i,
  sign: SCENE_STEP.first + 2 * LEVER_COUNT,
  signNote: SCENE_STEP.first + 2 * LEVER_COUNT + 1,
  thesis: SCENE_STEP.first + 2 * LEVER_COUNT + 2,
} as const;

const THESIS_STEP = { rule: 0, thesis: 1 } as const;

/** How long a connector takes to draw — `kl-draw`'s own duration, restated here because the
 *  sign box must not arrive before the last curve that points at it has finished. */
const CONNECTOR_DRAW_MS = 620;

// ───────────────────── the bottom line ─────────────────────

/**
 * The bottom line of the slide — a hero's own consequence, the recap's, or the ask.
 *
 * ONE COMPONENT AND ONE SHELF FOR ALL SIX, which is the whole point of it: the room learns
 * after one click that the sentence at the foot of the stage is the takeaway, and it is in the
 * same place, at the same size, in the same register every time. What differs is the TIER —
 * one step down for a scene, brightest for the ask — and whether a copper rule stands over it,
 * which only the ask gets because only the ask is about the whole set rather than about the
 * frame above it.
 */
function BottomLine({
  text,
  kw,
  step,
  tier,
  testId,
}: {
  text: string;
  kw: readonly string[];
  step: number;
  tier: string;
  testId: string;
}) {
  return (
    <Reveal
      on
      as="p"
      delay={delay(step)}
      data-testid={testId}
      style={{
        position: "absolute",
        left: SIDE_MARGIN,
        top: THESIS_TOP,
        width: CONTENT_WIDTH,
        height: THESIS_HEIGHT,
        margin: 0,
        fontFamily: "var(--serif)",
        fontSize: THESIS_TEXT_SIZE,
        lineHeight: 1.3,
        color: tier,
        // A SENTENCE MAY NOT TAKE A POINTER. It spans the full width on a shelf under a figure;
        // nothing here is hoverable and a wide invisible line would eat a hover the day a
        // scene's floor moved.
        pointerEvents: "none",
      }}
    >
      {highlight(text, kw)}
    </Reveal>
  );
}

// ───────────────────── the figure ─────────────────────

export interface LeverBoardProps {
  /** 0…5. See the slide file for what each pose argues. */
  pose: number;
}

export function LeverBoard({ pose }: LeverBoardProps) {
  // FOUR `===` TESTS AND ONE `>=`, and the split between them is the argument — see the file
  // header. The four HEROES are exclusive: each replaces the one before it, because each is a
  // different figure in the same region of stage. THE RECAP AND THE THESIS ARE NOT: the thesis
  // is what the recap is FOR, so it lands under a frame that stays put.
  const hero = pose < RECAP_POSE ? C.levers[pose] : null;
  const recap = pose >= RECAP_POSE;
  const thesis = pose === THESIS_POSE;

  // THE RECAP'S OWN BOTTOM LINE IS THE ONE THING THE LAST POSE TAKES AWAY, and it is the only
  // subtraction on the whole slide. Every scene line and the ask stand on the SAME shelf — that
  // is what makes the sentence at the foot of the stage read as one object the room learns to
  // look at — so the recap keeping its line while the ask arrived would print two sentences on
  // top of one another at the one moment the deck cannot afford it. The frame above does not
  // move (see the pose walk in `../../tests/unit/mandate-levers.test.tsx`); only the sentence
  // it was arguing is replaced by the sentence the whole section was for.
  const recapThesis = pose === RECAP_POSE;

  /** The eyebrow shelf, shared by all five scenes and empty on the sixth. One box, five
   *  strings, never two at once — and the shelf is y=156, which is `.slide-content`'s own top
   *  and the 2026-08-15 fix for the complaint that a mono line at 134 read as the headline's
   *  second line. */
  const eyebrow = (text: string, testId: string) => (
    <Reveal
      on
      delay={delay(SCENE_STEP.eyebrow)}
      data-testid={testId}
      style={{
        position: "absolute",
        left: SIDE_MARGIN,
        top: EYEBROW_TOP,
        width: CONTENT_WIDTH,
        height: LABEL_HEIGHT,
        ...mono(LABEL_SIZE, TIER.eyebrow, LABEL_TRACKING),
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        // AN EYEBROW MAY NOT TAKE A POINTER. It spans the full width on a shelf 26px above the
        // scene; a wide invisible line over it would eat the hover of whatever it overlapped
        // the day a shelf moved. `.box-hover` is on the boxes, and this is not one.
        pointerEvents: "none",
      }}
    >
      {text}
    </Reveal>
  );

  return (
    <>
      {/* ═══════════════ SCENES 0…3 · ONE LEVER, BIG ═══════════════
          ONE MARK, ONE ACT, ONE REASON, ONE CONSEQUENCE — and the mark is the size of the
          claim. Every string here is read at three times the size it will be read at on the
          recap, which is what makes the recap a reminder rather than a second reading. The
          lever's own name is the scene's EYEBROW and appears nowhere else on the pose: a name
          printed twice in one frame is a name the room reads as two things. */}
      {hero && (
        <>
          {eyebrow(hero.label, `levers-hero-eyebrow-${hero.id}`)}

          {/* THE MARK. Not inside a box and not bordered: a hero pose has nothing to
              distinguish it FROM, so a frame around the only figure on the stage would be
              chrome. It takes no pointer for the same reason — there is no hover state on a
              pose with one object. */}
          <Reveal
            on
            delay={delay(SCENE_STEP.eyebrow)}
            data-testid={`levers-hero-mark-${hero.id}`}
            style={{
              position: "absolute",
              left: HERO_GLYPH_LEFT,
              top: HERO_GLYPH_TOP,
              pointerEvents: "none",
            }}
          >
            <LeverGlyph
              id={hero.glyph as LeverGlyphId}
              size={HERO_GLYPH_SIZE}
              stroke={glyphStroke(HERO_GLYPH_SIZE, HERO_GLYPH_STROKE)}
              testId={`levers-hero-glyph-${hero.id}`}
            />
          </Reveal>

          <Reveal
            on
            delay={delay(HERO_STEP.act)}
            data-testid={`levers-hero-act-${hero.id}`}
            style={{
              position: "absolute",
              left: HERO_TEXT_LEFT,
              top: HERO_TEXT_TOP,
              width: HERO_TEXT_WIDTH,
              height: HERO_ACT_HEIGHT,
              ...act,
              pointerEvents: "none",
            }}
          >
            {highlight(hero.act, hero.actKw)}
          </Reveal>

          <Reveal
            on
            delay={delay(HERO_STEP.note)}
            data-testid={`levers-hero-note-${hero.id}`}
            style={{
              position: "absolute",
              left: HERO_TEXT_LEFT,
              top: HERO_NOTE_TOP,
              width: HERO_NOTE_WIDTH,
              height: HERO_NOTE_HEIGHT,
              ...note,
              pointerEvents: "none",
            }}
          >
            {highlight(hero.note, hero.noteKw)}
          </Reveal>

          <BottomLine
            text={hero.thesis}
            kw={hero.thesisKw}
            step={HERO_STEP.thesis}
            tier={TIER.sceneThesis}
            testId={`levers-hero-thesis-${hero.id}`}
          />
        </>
      )}

      {/* ═══════════════ SCENE 4 · ALL FOUR, AND WHERE THEY END ═══════════════
          THE ONE FRAME THAT SAYS THE FOUR ACTS HAVE ONE SIGNATURE BETWEEN THEM. Four cards
          carrying the four marks the room has just seen at hero size, four curves, and one
          box. No hero pose can make this claim — a hero shows one lever, and the claim is
          about the set — and no sentence has to make it either, because a room can count four
          curves arriving at one place from the back row. */}
      {recap && (
        <>
          {eyebrow(C.recapEyebrow, "levers-recap-eyebrow")}

          {/* THE CONNECTOR LAYER, FIRST IN MARKUP so the boxes paint over it. `.svg-layer`
              carries `pointer-events: none`, which is what keeps a full-stage `<svg>` from
              swallowing the hover of the five boxes on top of it. */}
          <svg
            className="svg-layer"
            data-testid="levers-connectors"
            viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
            aria-hidden="true"
          >
            {C.levers.map((lever, i) => {
              const d = connectorPath(i);
              return (
                <g key={lever.id}>
                  {/* THE ROUTE. It sweeps itself in from the LEVER end, because
                      `connectorPath` starts at the card, so all four draw downward toward the
                      box — the direction the claim runs. */}
                  <path
                    className="kl-draw"
                    data-testid={`levers-connector-${lever.id}`}
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke={TIER.connector}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    style={{ animationDelay: `${delay(RECAP_STEP.connector(i))}ms` }}
                  />
                  {/* THE TRAFFIC, ON TOP OF IT AND ONLY ONCE THE ROUTE IS DRAWN. Four curves
                      that merely MEET at a point say the four levers are related; four curves
                      with something running down them say which way the relation goes, and on
                      a slide whose whole claim is "all four end at your desk" that direction
                      is the argument. It arrives after `kl-draw` has finished — a current on a
                      line that is still drawing would run off the end of its own road.

                      A `<g>` CARRIES THE ARRIVAL AND THE `<path>` CARRIES THE LOOP, because
                      they are two animations on one element otherwise and the second would
                      replace the first. K.1's recap connectors are built the same way. */}
                  <g
                    className="kl-arrive"
                    data-testid={`levers-current-${lever.id}`}
                    style={{
                      animationDelay: `${delay(RECAP_STEP.connector(i)) + CONNECTOR_DRAW_MS}ms`,
                    }}
                  >
                    <path
                      className="kl-current"
                      d={d}
                      fill="none"
                      stroke={TIER.current}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* THE FOUR CARDS. A mark, the lever's name, a hairline, and the act in the past
              tense of a decision already taken — which is what makes the box under them read
              as a signature and not as a fifth ask. */}
          {C.levers.map((lever, i) => {
            const inner = RECAP_CARD_WIDTH - 2 * RECAP_PAD_X;
            return (
              <Reveal
                key={lever.id}
                on
                delay={delay(RECAP_STEP.card(i))}
                className="box-hover kl-card"
                data-testid={`levers-recap-card-${lever.id}`}
                style={shell(
                  recapCardLeft(i),
                  RECAP_CARD_TOP,
                  RECAP_CARD_WIDTH,
                  RECAP_CARD_HEIGHT,
                )}
              >
                <div
                  style={{
                    position: "absolute",
                    left: RECAP_PAD_X,
                    top: RECAP_PAD_Y,
                    width: inner,
                    height: RECAP_GLYPH_SIZE,
                    display: "flex",
                    alignItems: "center",
                    gap: RECAP_GLYPH_GAP,
                  }}
                >
                  <LeverGlyph
                    id={lever.glyph as LeverGlyphId}
                    size={RECAP_GLYPH_SIZE}
                    stroke={glyphStroke(RECAP_GLYPH_SIZE, RECAP_GLYPH_STROKE)}
                    testId={`levers-recap-glyph-${lever.id}`}
                  />
                  {/* NO `highlight()` ON A LABEL, HERE OR ANYWHERE ON THIS STAGE. Every label
                      is a name and carries no `*Kw` sibling by construction (`../content.ts`'s
                      keyword rule); a copper italic inside an 11px uppercase name would
                      emphasise a fragment of it and read as a rendering fault. */}
                  <span
                    data-testid={`levers-recap-label-${lever.id}`}
                    style={{
                      ...mono(RECAP_LABEL_SIZE, TIER.cardLabel, LABEL_TRACKING),
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lever.label}
                  </span>
                </div>
                {/* THE HAIRLINE — what the lever is CALLED, above; what it IS, below. Its
                    colour lives in `./levers.css` and not here, because it has two states: it
                    brightens with the border under the pointer, and a colour with two states
                    belongs where both can be written. */}
                <div
                  className="kl-hairline"
                  data-testid={`levers-recap-hairline-${lever.id}`}
                  style={{
                    position: "absolute",
                    left: RECAP_PAD_X,
                    top: RECAP_HAIRLINE_TOP,
                    width: inner,
                    height: RECAP_HAIRLINE_HEIGHT,
                  }}
                />
                <div
                  data-testid={`levers-recap-line-${lever.id}`}
                  style={{
                    position: "absolute",
                    left: RECAP_PAD_X,
                    top: RECAP_LINE_TOP,
                    width: inner,
                    height: RECAP_LINE_HEIGHT,
                    ...cardLine,
                  }}
                >
                  {highlight(lever.short, lever.shortKw)}
                </div>
              </Reveal>
            );
          })}

          {/* THE SIGN BOX — one word, and the object that replaced a four-column form. It
              arrives after the last curve has finished drawing, so the room watches four lines
              converge on a place and then sees whose place it is. */}
          <Reveal
            on
            delay={delay(RECAP_STEP.connector(LEVER_COUNT - 1)) + CONNECTOR_DRAW_MS}
            className="box-hover kl-card"
            data-testid="levers-sign-box"
            style={{
              ...shell(
                SIGN_BOX_LEFT,
                SIGN_BOX_TOP,
                SIGN_BOX_WIDTH,
                SIGN_BOX_HEIGHT,
                TIER.signFrame,
              ),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              data-testid="levers-sign-label"
              style={{ ...mono(SIGN_LABEL_SIZE, TIER.signLabel, LABEL_TRACKING) }}
            >
              {C.signLabel}
            </span>
          </Reveal>

          <Reveal
            on
            delay={delay(RECAP_STEP.signNote)}
            data-testid="levers-sign-note"
            style={{
              position: "absolute",
              left: SIDE_MARGIN,
              top: SIGN_NOTE_TOP,
              width: CONTENT_WIDTH,
              height: SIGN_NOTE_HEIGHT,
              textAlign: "center",
              ...mono(LABEL_SIZE, TIER.signNote, LABEL_TRACKING),
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              // CENTRED ON THE STAGE AND FULL WIDTH, so it centres on the BOX above it without
              // reading the box's own left edge — and inert, because a full-width invisible
              // line 18px under a hoverable box is exactly the shape that eats a hover.
              pointerEvents: "none",
            }}
          >
            {C.signNote}
          </Reveal>

          {recapThesis && (
            <BottomLine
              text={C.recapThesis}
              kw={C.recapThesisKw}
              step={RECAP_STEP.thesis}
              tier={TIER.sceneThesis}
              testId="levers-recap-thesis"
            />
          )}
        </>
      )}

      {/* ═══════════════ POSE 5 · THE THESIS, UNDER THE RECAP ═══════════════
          IT ARRIVES ON TOP OF THE RECAP AND NOTHING ABOVE IT MOVES. The rule divides the SLIDE
          — above it the four acts and the one desk, below it the line the deck asks the room
          to leave with — and it arrives BEFORE the sentence, because a rule that followed its
          own sentence would be underlining it.

          THE SHELF IS 590 AND THE SIZE IS 19px UPRIGHT SERIF, which is K.1's and K.2's
          register and not the 20px italic at 572 this slide used to close on.
          `../levers-geometry.ts` carries the whole argument. */}
      {thesis && (
        <>
          <div
            data-testid="levers-rule"
            style={{
              position: "absolute",
              left: SIDE_MARGIN,
              top: RULE_TOP,
              width: CONTENT_WIDTH,
              height: RULE_HEIGHT,
            }}
          >
            <CopperRule on delay={delay(THESIS_STEP.rule)} width="100%" />
          </div>
          <BottomLine
            text={C.closer}
            kw={C.closerKw}
            step={THESIS_STEP.thesis}
            tier={TIER.thesis}
            testId="levers-thesis"
          />
        </>
      )}
    </>
  );
}
