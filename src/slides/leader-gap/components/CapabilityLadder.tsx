// The staircase, its five rungs, and the marks on it.
//
// ONE COMPONENT AND NOT TWO, deliberately. Each marker's epistemic status is
// carried by FOUR encodings at once (§7.2) and two of them are SVG (the leader
// line, the dot) while two are HTML (the chip's border, its type). Splitting the
// SVG layer from the chip layer would put half of each encoding pair in a
// different file, and the failure mode this slide has — three of the four
// encodings agreeing and the fourth quietly not — is exactly what that split
// would hide. So `FORM` below is the whole contract, in one table, read by both
// layers.
//
// It reads NO variant and NO brand: the resolved block arrives as a prop. That is
// what lets one test render both brands' ladders side by side in a single module
// epoch, which is the only way to compare them.
//
// CSS vars only, no hex literals. No new fonts, no new libraries. Rank is a
// COLOUR TIER and never opacity — opacity here means "not revealed yet", which is
// time, not rank.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive — 27
// modules reach for it, A.1 among them, against 6 for the section F duplicate. A
// fourth copy under this directory would be the wrong answer to three existing
// ones; centralising them is a cleanup this ticket is not.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ASIDE_SLOT,
  CHIP_SHELF,
  CLOSER_SLOT,
  LEADER_GAP,
  OPEN_SLOT,
  STAIR_PATH,
  TECH_SLOT,
  TREADS,
  anchorPoint,
} from "../geometry";
import { gapLadderContent as C, type LadderBrandBlock } from "../content";

// ───────────────────── the contract, in one table ─────────────────────

/**
 * §7.2's four encodings, both sides of each.
 *
 * NO LEGEND ANYWHERE ON THE SLIDE, so these four are the only thing that tells a
 * room which mark is a claim and which is a question. They are written as one
 * object rather than as branches inside the markup for one reason: a reader — and
 * a reviewer — has to be able to check that all four actually differ, and that is
 * a four-line diff here instead of a hunt through two components.
 *
 *   1. the chip     — solid hairline vs HAIRLINE DASHED (and filled vs unfilled)
 *   2. the leader    — solid 2px vs DASHED 1px
 *   3. the mark      — filled dot vs OPEN RING
 *   4. the type      — mono uppercase + source vs SERIF ITALIC ending in "?"
 *
 * Encoding 4 lives in the two chip bodies below, because it is a whole type
 * register and not a property; the three that ARE properties are here.
 */
const FORM = {
  asserted: {
    chipBorder: "1px solid var(--copper-300)",
    chipBackground: "var(--copper-950)",
    leaderStroke: "var(--copper-300)",
    leaderWidth: 2,
    /** No dash — a solid tether. `undefined` rather than `"none"` so the
     *  attribute is absent from the DOM and the test can tell the two apart by
     *  presence, not by parsing a keyword. */
    leaderDash: undefined as string | undefined,
    dotFill: "var(--copper-300)",
    dotStroke: undefined as string | undefined,
  },
  open: {
    chipBorder: "1px dashed var(--copper-600)",
    /** UNFILLED, and the same reason the dot is a ring: nothing has been placed
     *  here yet, so nothing is coloured in. */
    chipBackground: "transparent",
    leaderStroke: "var(--copper-600)",
    leaderWidth: 1,
    leaderDash: "3 5",
    dotFill: "none",
    dotStroke: "var(--copper-600)",
  },
} as const;

const DOT_R = 6;
/** The aside's dot is smaller and a tier darker than either marker's — it is a
 *  footnote, and rank is carried by size and colour tier, never by opacity. */
const ASIDE_DOT_R = 4;

// ───────────────────── type registers ─────────────────────
// TWO HELPERS, for the two registers the MARKERS use: mono for anything the room
// reads as a label, serif for anything they read as a sentence. The rung block is
// the deliberate third case and is styled inline below — `--display` for the rung
// name, because a rung name is a title and the deck sets titles in the display
// serif everywhere, and `--sans` for its definition. Four families on the slide,
// then, and each one earns its place; the helpers exist for the two that repeat.
//
// Both floors are gh#50's — 9.5px for a mono label, 10.5px for prose — and nothing
// here rests below `--neutral-300`. Neither is enforced from this file: the sizes
// and tiers are audited on the rendered tree by `scripts/gh53-verify.mjs`, because
// a computed font size is not something jsdom has.

/**
 * The mono register. `upper` is the default because every mono LABEL in this deck
 * is uppercase — but the asserted chip's SOURCE is a sentence-length citation, and
 * 120 characters of uppercase mono is a wall nobody in the back row reads. It stays
 * in this register (that is encoding 4) and drops the transform.
 */
function mono(size: number, color: string, ls = 0.16, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

function prose(size: number, color: string, italic = false): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontStyle: italic ? "italic" : "normal",
    fontSize: size,
    lineHeight: 1.4,
    color,
    margin: 0,
  };
}

// ───────────────────── the figure ─────────────────────

export interface CapabilityLadderProps {
  /** The brand's resolved block — `capabilityLadderFor(VARIANT.brand)`. */
  content: LadderBrandBlock;
  /** 0…4. See the slide file for what each pose argues. */
  pose: number;
}

export function CapabilityLadder({ content, pose }: CapabilityLadderProps) {
  const showTech = pose >= 1;
  const showOpen = pose >= 2;
  const showAside = pose >= 3;
  const showCloser = pose >= 4;

  const { techFunction, open } = content;
  const assertedAt =
    techFunction.kind === "asserted"
      ? anchorPoint({ on: "tread", rung: techFunction.marker.rung })
      : null;
  const openAt = anchorPoint({ on: "tread", rung: open.rung });
  const asideAt = anchorPoint({ on: "riser", below: 0 });

  return (
    <>
      <div
        data-testid="gap-ladder-provenance"
        style={{ position: "absolute", left: 48, top: 134, ...mono(10, "var(--neutral-300)") }}
      >
        {C.provenance}
      </div>

      {/* THE SVG LAYER — the staircase and the two SVG halves of each encoding.
          Marks MOUNT with their pose rather than fading: `.fade`'s translateY is
          in user units inside an <svg>, so a fading dot would also slide 8px, and
          a dot that arrives beside its tread and then walks onto it is a worse
          lie than no transition at all. The chips fade; the marks appear with
          them. */}
      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720">
        <path
          data-testid="gap-ladder-path"
          className="gap-ladder-draw"
          d={STAIR_PATH}
          pathLength={1}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--copper-500)"
          strokeWidth={2.5}
        />

        {showTech && assertedAt && (
          <g data-testid="gap-mark-asserted">
            <line
              data-testid="gap-leader-asserted"
              x1={assertedAt.x}
              y1={CHIP_SHELF}
              x2={assertedAt.x}
              y2={assertedAt.y - LEADER_GAP}
              stroke={FORM.asserted.leaderStroke}
              strokeWidth={FORM.asserted.leaderWidth}
              strokeDasharray={FORM.asserted.leaderDash}
            />
            <circle
              data-testid="gap-dot-asserted"
              cx={assertedAt.x}
              cy={assertedAt.y}
              r={DOT_R}
              fill={FORM.asserted.dotFill}
              stroke={FORM.asserted.dotStroke}
            />
          </g>
        )}

        {showOpen && (
          <g data-testid="gap-mark-open">
            <line
              data-testid="gap-leader-open"
              x1={openAt.x}
              y1={CHIP_SHELF}
              x2={openAt.x}
              y2={openAt.y - LEADER_GAP}
              stroke={FORM.open.leaderStroke}
              strokeWidth={FORM.open.leaderWidth}
              strokeDasharray={FORM.open.leaderDash}
            />
            <circle
              data-testid="gap-dot-open"
              cx={openAt.x}
              cy={openAt.y}
              r={DOT_R}
              fill={FORM.open.dotFill}
              stroke={FORM.open.dotStroke}
              strokeWidth={1.4}
            />
          </g>
        )}

        {/* The aside gets a dot and NO leader. A third leader style would be a
            fifth encoding arguing with the four that carry the slide. */}
        {showAside && (
          <circle
            data-testid="gap-dot-aside"
            cx={asideAt.x}
            cy={asideAt.y}
            r={ASIDE_DOT_R}
            fill="var(--copper-600)"
          />
        )}
      </svg>

      {/* THE RUNGS — the ladder's own vocabulary, hung under each tread. Every
          string here is a label: no keywords, by the rule in `../content.ts`. */}
      {C.rungs.map((rung, i) => {
        const tread = TREADS[i];
        return (
          <div
            key={rung.id}
            data-testid={`gap-rung-${rung.id}`}
            style={{
              position: "absolute",
              left: tread.x1 + 10,
              top: tread.y + 10,
              width: tread.x2 - tread.x1 - 20,
              zIndex: 2,
            }}
          >
            <div
              data-testid={`gap-rung-${rung.id}-name`}
              style={{
                fontFamily: "var(--display)",
                fontSize: 19,
                lineHeight: 1.15,
                color: "var(--neutral-50)",
              }}
            >
              <span style={{ color: "var(--copper-300)" }}>{rung.level}</span> · {rung.title}
            </div>
            <div
              data-testid={`gap-rung-${rung.id}-sub`}
              style={{
                fontFamily: "var(--sans)",
                fontSize: 11.5,
                lineHeight: 1.3,
                marginTop: 4,
                color: "var(--neutral-300)",
              }}
            >
              {rung.sub}
            </div>
          </div>
        );
      })}

      {/* THE TECH-FUNCTION SLOT — one slot, two possible fills, never empty.
          Bottom-aligned to the shelf both chips hang from, so the asserted chip
          and the absence line occupy the same rectangle and a leader walking this
          deck under either brand looks at the same place.

          THE WRAPPER CARRIES THE SLOT AND THE FILL CARRIES THE FORM, which is why
          this one reveal is a box around a box while the open marker below is a
          single box: the slot's geometry belongs to neither fill, and putting the
          chip's border on the wrapper would draw one around the absence line too —
          turning "we looked and found nothing" into a bordered claim. */}
      <Reveal
        on={showTech}
        data-testid="gap-tech-slot"
        style={{
          position: "absolute",
          left: TECH_SLOT.left,
          width: TECH_SLOT.width,
          bottom: 720 - CHIP_SHELF,
          zIndex: 3,
        }}
      >
        {techFunction.kind === "asserted" ? (
          <div
            data-testid="gap-marker-asserted"
            style={{
              padding: "12px 16px",
              boxSizing: "border-box",
              border: FORM.asserted.chipBorder,
              background: FORM.asserted.chipBackground,
            }}
          >
            <div data-testid="gap-asserted-label" style={mono(13, "var(--neutral-0)")}>
              {techFunction.marker.label}
            </div>
            {/* MONO, not serif — §7.2's encoding 4 is a whole type register, and
                a serif citation would put the asserted chip's body in the SAME
                register as the open chip's question. Then three encodings carry
                the distinction and the fourth only looks like it does. Sentence
                case, at 10.5px on 1.55 line-height: mono is wide, so this is the
                pair that fits three lines in the slot and clears gh#50's floor. */}
            <div
              data-testid="gap-asserted-source"
              style={{
                marginTop: 8,
                lineHeight: 1.55,
                ...mono(10.5, "var(--copper-100)", 0.02, false),
              }}
            >
              {techFunction.marker.source}
            </div>
          </div>
        ) : (
          // NO chip, NO leader, NO dot — the three things that would make this
          // look like a placement. It is a statement ABOUT the ladder, and it
          // names no rung on purpose: a bordered box here would read as
          // "MineTech is somewhere around L3", which is the one claim this slide
          // exists to refuse. A tier below the chips, because it is not a mark.
          <p data-testid="gap-tech-absence" style={prose(15, "var(--neutral-300)")}>
            {highlight(techFunction.line, techFunction.lineKw)}
          </p>
        )}
      </Reveal>

      {/* THE OPEN MARKER. Encoding 4 lives here: a mono eyebrow, then a
          serif-italic sentence that ends in "?", then the evidence that makes it
          fair to ask. The asserted chip's body is a label and a source; this one
          is a question. The two never share a body. */}
      <Reveal
        on={showOpen}
        data-testid="gap-marker-open"
        style={{
          position: "absolute",
          left: OPEN_SLOT.left,
          width: OPEN_SLOT.width,
          bottom: 720 - CHIP_SHELF,
          padding: "12px 16px",
          boxSizing: "border-box",
          border: FORM.open.chipBorder,
          background: FORM.open.chipBackground,
          zIndex: 3,
        }}
      >
        <div data-testid="gap-open-label" style={mono(10, "var(--neutral-300)", 0.2)}>
          {open.label}
        </div>
        <p
          data-testid="gap-open-question"
          style={{ marginTop: 8, ...prose(22, "var(--neutral-50)", true) }}
        >
          {highlight(open.question, open.questionKw)}
        </p>
        <div
          data-testid="gap-open-evidence"
          style={{ marginTop: 8, ...prose(11, "var(--neutral-300)") }}
        >
          {highlight(open.evidence, open.evidenceKw)}
        </div>
      </Reveal>

      {/* THE ASIDE — right-aligned so it reads INTO the riser its dot sits on. */}
      <Reveal
        on={showAside}
        data-testid="gap-aside"
        style={{
          position: "absolute",
          right: ASIDE_SLOT.right,
          top: ASIDE_SLOT.top,
          width: ASIDE_SLOT.width,
          textAlign: "right",
          zIndex: 3,
        }}
      >
        <div data-testid="gap-aside-label" style={mono(10, "var(--neutral-300)", 0.14)}>
          {C.aside.label}
        </div>
        <p style={{ marginTop: 6, ...prose(11, "var(--neutral-300)", true) }}>
          {highlight(C.aside.note, C.aside.noteKw)}
        </p>
      </Reveal>

      {/* THE CLOSER — in the floor the top of the staircase leaves empty. */}
      <Reveal
        on={showCloser}
        as="p"
        data-testid="gap-closer"
        style={{
          position: "absolute",
          left: CLOSER_SLOT.left,
          right: CLOSER_SLOT.right,
          top: CLOSER_SLOT.top,
          textAlign: "right",
          zIndex: 3,
          ...prose(20, "var(--neutral-200)", true),
        }}
      >
        {highlight(content.closer, content.closerKw)}
      </Reveal>
    </>
  );
}
