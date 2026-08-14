// The two-beat bridge stage — ONE component, three slides (gh#72).
//
// A bridge is the last slide of a section: a full-bleed photo, three layered
// gradients over it, a `FigLabel` top-left, and two beats bottom-left that arrive
// on two steps. The deck has had five of them since Phase 2 — `c6`, `d5`, `e13`,
// `f9`, `g11`, `h3` — and every one is its own copy of the same ~100 lines of
// absolutely-positioned markup. gh#72 adds THREE MORE, all leader-only, and three
// more copies is where a duplicated layout stops being cheaper than a parameter.
//
// SO THIS IS THE STAGE, AND THE THREE NEW SLIDES ARE THE DATA. What varies between
// them is a photo path, a label, four strings and their keywords — nothing
// structural, which is why none of it is a slot or a `children`.
//
// THE FIVE EXISTING BRIDGES ARE DELIBERATELY NOT PORTED. Their markup is
// byte-identical to what shipped and their tests assert their own `data-testid`s
// (`e13-hero`, `h3-beat2`, …); porting them would be a behaviour-preserving
// refactor of five slides riding into a ticket about three new ones, and a
// regression in any of them lands on a projector on Aug 18. `h3-bridge-to-i` is
// the one to port FIRST if that ticket is ever written — it MOVES in this one
// (leader K.4, §4.3) and is the only bridge whose copy is already deck-set-scoped.
//
// WHY IT LIVES IN `src/components/` and takes `Reveal` from a SLIDE directory:
// `src/slides/foundation-core-section-e/components/Reveal.tsx` calls itself "the
// single reveal primitive" and `h3-bridge-to-i.tsx` — a section-H slide — already
// imports it across directories, so this is the established direction and not a
// new one. Inverting it (Reveal → `src/components/`) would touch every section-E
// slide, which is a different ticket with a different blast radius.
//
// TYPE SCALE IS E.13'S, NOT H.3'S, and that is a decision §4.3 does not make for
// us: 56px display over a 40px italic, against H.3's 44/32. The leader bridges
// carry SHORTER lines than H.3's, and the front-block ones are the argument's
// hinges — they get the larger figure. `measure` is the one geometric knob,
// because the only real risk on this stage is a line wrapping in a browser that
// jsdom cannot see, and the fix for that is a wider column or fewer words.
import type { CSSProperties } from "react";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "@/slides/foundation-core-section-e/components/Reveal";

/** One reveal: the string, plus the substrings rendered as keywords. Structurally
 *  `E13Beat`, and deliberately a separate declaration — a shared bridge stage that
 *  imported its beat type from ONE section's content module would make that
 *  section the owner of every other section's bridge copy. */
export interface BridgeBeat {
  text: string;
  kw: readonly string[];
}

/** The four strings a bridge prints, keyed the way every bridge content block in
 *  the tree already keys them (`h3Content`, `e13Content`, `g11Content`). */
export interface BridgeCopy {
  heroSrc: string;
  figLabel: string;
  beat1: { lineA: BridgeBeat; lineB: BridgeBeat };
  beat2: BridgeBeat;
}

export interface BridgeHeroProps {
  /** Prefix for every `data-testid` on the stage — `"gap-bridge"` yields
   *  `gap-bridge-hero`, `gap-bridge-beat1-lineA`, and so on. Required, because two
   *  bridges rendered in one test file would otherwise collide on every query. */
  testId: string;
  copy: BridgeCopy;
  /** Step 0 reveals beat 1; step 1 reveals beat 2. Passed in rather than read from
   *  `useDeck()` here, so the stage holds no step policy and a slide can decide
   *  its own pose count. */
  showBeat1: boolean;
  showBeat2: boolean;
  /** Max width of the beat column, in px. E.13 ships 760 for lines of ~27
   *  characters; the leader bridges run longer and default to H.3's 1120. */
  measure?: number;
}

// The three gradients, lifted from `e13-bridge-to-f.tsx` unchanged — the vignette
// that puts a dark mass under the beats, the ellipse that protects the FigLabel
// from a bright sky, and the top-edge gloom that carries the label band across.
// `rgba(10,10,10,…)` is what those slides ship; it is the near-black the deck's
// photos sit on and not a token, so it is not written as one here either.
const OVERLAY_BOTTOM_LEFT =
  "linear-gradient(to top right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 35%, rgba(10,10,10,0.0) 70%)";
const OVERLAY_TOP_LEFT =
  "radial-gradient(ellipse 520px 280px at top left, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0) 100%)";
const OVERLAY_TOP_GLOOM =
  "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)";

const FILL: CSSProperties = { position: "absolute", inset: 0, pointerEvents: "none" };

/** The display line both beat-1 rows print. One object, so line A and line B
 *  cannot drift apart in size or colour — which is the only way two lines of one
 *  sentence can look like two sentences. */
const BEAT1_LINE: CSSProperties = {
  fontFamily: "var(--display)",
  fontSize: 56,
  color: "var(--neutral-50)",
  margin: 0,
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
};

const BEAT2_LINE: CSSProperties = {
  fontFamily: "var(--display)",
  fontStyle: "italic",
  fontSize: 40,
  color: "var(--copper-200)",
  margin: 0,
  lineHeight: 1.1,
};

export function BridgeHero({
  testId,
  copy,
  showBeat1,
  showBeat2,
  measure = 1120,
}: BridgeHeroProps) {
  return (
    <div
      data-testid={`${testId}-root`}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Hero photo — full-bleed. */}
      <div
        data-testid={`${testId}-hero`}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${copy.heroSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Vignette: bottom-left — anchors the beats against a dark mass. */}
      <div
        data-testid={`${testId}-overlay-bottom-left`}
        aria-hidden
        style={{ ...FILL, background: OVERLAY_BOTTOM_LEFT }}
      />

      {/* Vignette: top-left ellipse — protects FigLabel readability. */}
      <div
        data-testid={`${testId}-overlay-top-left`}
        aria-hidden
        style={{ ...FILL, background: OVERLAY_TOP_LEFT }}
      />

      {/* Soft top edge gloom — keeps the FigLabel band legible across the top. */}
      <div
        data-testid={`${testId}-overlay-top-gloom`}
        aria-hidden
        style={{ ...FILL, background: OVERLAY_TOP_GLOOM }}
      />

      <FigLabel label={copy.figLabel} />

      {/* Bottom-left anchored beats. */}
      <div
        data-testid={`${testId}-beats`}
        style={{
          position: "absolute",
          left: 48,
          bottom: 110,
          maxWidth: measure,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 20,
        }}
      >
        <div
          data-testid={`${testId}-beat1`}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Reveal on={showBeat1} delay={0} data-testid={`${testId}-beat1-lineA`}>
            <p style={BEAT1_LINE}>
              {highlight(copy.beat1.lineA.text, copy.beat1.lineA.kw)}
            </p>
          </Reveal>
          <Reveal on={showBeat1} delay={250} data-testid={`${testId}-beat1-lineB`}>
            <p style={BEAT1_LINE}>
              {highlight(copy.beat1.lineB.text, copy.beat1.lineB.kw)}
            </p>
          </Reveal>
        </div>

        <CopperRule on={showBeat1} width="30%" delay={400} />

        <Reveal on={showBeat2} delay={150} data-testid={`${testId}-beat2`}>
          <p style={BEAT2_LINE}>{highlight(copy.beat2.text, copy.beat2.kw)}</p>
        </Reveal>
      </div>
    </div>
  );
}
