// E.12 · LOOP ENGINEERING — the primitives every pose draws with.
//
// WHY THIS FILE EXISTS. gh#48 built pose 0 with these defined inline, and its
// owner correction 4 is a rule about ALL of them: every card box on the slide
// reacts to hover, on every pose, by COLOUR TIER and never by opacity (§8.3).
// gh#49 adds twenty-odd more boxes across three poses. A rule that lives in one
// component is checkable — `tests/unit/e12-loop-engineering.test.tsx` counts the
// boxes and asserts each carries the class; a rule copied into four files is a
// thing four files have to remember. So the boxes, the two type registers and the
// two shared figures moved here, unchanged, and pose 0 imports them.
//
// It also holds the TWO-COLUMN GEOMETRY CONTRACT poses 1 and 2 share — see
// `HEAD_H`. It lives here and not in `E12LoopAnatomy` so the rail and the panels
// can both read it without importing each other.
//
// CSS vars only, no hex literals. The hover itself is `.e12-box` in globals.css.
import type { CSSProperties, ReactNode } from "react";
import { HintIcon } from "@/components/HintIcon";
import { CopperRule, Reveal } from "./Reveal";

// ───────────────────── type shorthands ─────────────────────
// The deck's two type registers on this slide: mono for anything the audience
// reads as a label (titles, station names, file names), serif for anything they
// read as a sentence. `e12-mono` / `e12-prose` are the hooks the hover rule in
// globals.css lifts a tier — see `Box`.

export function mono(size: number, color: string, ls = 0.18): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    color,
    textTransform: "uppercase",
  };
}

export function prose(size: number, color: string, italic = false): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontStyle: italic ? "italic" : "normal",
    fontSize: size,
    lineHeight: 1.35,
    color,
  };
}

/** An italic serif note drawn inside an SVG — pose 0's `pass` / `risky` /
 *  `approved` edge labels, and the panels' read / write annotations. */
export function edgeLabel(size = 10.5, fill = "var(--copper-300)"): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: size,
    fill,
  };
}

/**
 * THE TEXT FLOOR (gh#49 correction 7). `more and more unattended →` shipped in
 * the prototype at `--neutral-400` on a dark panel and was illegible on a
 * washed-out projector profile. The fix is a rule and not one edit: NO text on
 * this slide rests below this tier, with TWO named exemptions:
 *   · a DEMOTED box on pose 2, where the dimming is the meaning (§8.3: demotion
 *     moves borders to copper-900 and text to neutral-400).
 *   · pose 2's recap, which gh#49 correction 8 asks for in E.11's FOOTER STYLE —
 *     serif italic 13.5px on `--neutral-400`, matching
 *     `../e11-harness-practices.tsx` exactly. It is a 13.5px line rather than a
 *     small label, and matching the footer the room has seen eight times is the
 *     whole point of that correction.
 * `scripts/projection-test.mjs --audit` holds the rule and lists both exemptions
 * by selector, so a third one has to be argued for rather than added quietly.
 */
export const TEXT_FLOOR = "var(--neutral-300)";
/** The tier a demoted box's prose drops to, and the floor's only exception. */
export const DEMOTED_TEXT = "var(--neutral-400)";

/**
 * THE SIZE FLOORS (§12.1 call 3, closed on gh#50). The colour floor above was
 * gh#49's answer to one illegible label; this is the same finding's other half.
 *
 * §12.1 flagged the 8.5px mono tool strips as the smallest type in the deck and
 * projector-unverified. gh#49 raised the strips to 9px and left the rest; the
 * audit in `scripts/projection-test.mjs --audit` then found 34 runs under these
 * two numbers across the three poses — including the pose-2 heartbeat pill and
 * both fork labels, which PRINT, because pose 2 is `canonicalPose` and the export
 * scripts render exactly that pose.
 *
 * So the floor is a number and not a habit: 9.5px for a mono LABEL, 10.5px for a
 * prose SENTENCE. Both are tiers this slide already used everywhere else (the
 * station names, the gate label, the run names, every panel foot), so applying
 * them changed no type SCALE — it removed five smaller odd ones out.
 *
 * The audit fails on anything below either number, so the next 8.5px is caught
 * before a projector finds it. Physical confirmation at projection distance is
 * still an owner walk: `node scripts/projection-test.mjs e12`.
 */
export const MONO_FLOOR = 9.5;
export const PROSE_FLOOR = 10.5;

// ───────────────────── the two-column geometry ─────────────────────
// Stage coordinates for poses 1 and 2: a 356px rail at x=48 and a 798px canvas
// at x=434, both starting at y=156 and ending 72px off the stage floor.

export const AREA = { top: 156, bottom: 72 };
export const RAIL = { left: 48, width: 356 };
export const CANVAS = { left: 434, right: 48 };
export const CANVAS_W = 1280 - CANVAS.left - CANVAS.right;
export const CANVAS_H = 720 - AREA.top - AREA.bottom;

/**
 * THE HEADING BLOCK, and the reason it is one number rather than two layouts.
 *
 * A heading is a mono label, the gap under it, the copper rule, and the gap under
 * that. Both columns build their heading from these four, so both columns' content
 * starts at exactly `HEAD_H` — which is gh#49 correction 6: a panel's illustration
 * and the HEARTBEAT card's top border are level BY CONSTRUCTION, not by two
 * numbers that happen to agree, and switching panels cannot make the canvas jump.
 */
const HEAD = { labelH: 16, ruleGap: 10, ruleH: 1, contentGap: 14 };
export const HEAD_H = HEAD.labelH + HEAD.ruleGap + HEAD.ruleH + HEAD.contentGap;

/**
 * THE FOOT ROW, NOW EMPTY — and kept as air, not reclaimed.
 *
 * gh#49 correction 6 sized it: the prototype ran its canvas to `bottom: 34` and
 * every panel's foot line collided with the NavBar at 1280×720, so the row was
 * placed to end at y=648. The owner deleted the foot COPY on 2026-08-04 — all
 * four panel foots and pose 2's closer — and this height stays in the arithmetic
 * on purpose: `ILLUS_H` is the number four illustrations are tuned against
 * (`ORBIT.cy` in `./E12PartPanels.tsx` is literally derived from it), so
 * reclaiming the 42px would move every figure on the slide to buy blank space
 * under it. The row is now the canvas's bottom margin, and pose 2's recap is what
 * sits in it.
 */
const FOOT = { height: 30, gap: 12 };
/** Every panel's illustration area — one height, so no panel can outgrow the
 *  space the next panel gets and make the canvas jump. */
export const ILLUS_H = CANVAS_H - HEAD_H - FOOT.height - FOOT.gap;

/**
 * G.7's rule-to-text header (gh#49 correction 1). The rule is `100%` of a
 * `fit-content` wrapper, so it stops at the label's last character; anything that
 * must sit BESIDE the label — the HintIcon — is a sibling of that wrapper and
 * therefore outside the measurement.
 *
 * Reference implementation: the row-1 headers in
 * `src/slides/application-section-g/g7-head-to-head.tsx`.
 */
export function E12Heading({
  text,
  testid,
  hint = false,
}: {
  text: string;
  testid?: string;
  hint?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        position: "relative",
        zIndex: 50,
      }}
    >
      <div data-testid={testid} style={{ width: "fit-content" }}>
        <div
          style={{
            ...mono(11, "var(--copper-300)", 0.22),
            height: HEAD.labelH,
            lineHeight: `${HEAD.labelH}px`,
          }}
        >
          {text}
        </div>
        <div style={{ marginTop: HEAD.ruleGap }}>
          <CopperRule on width="100%" />
        </div>
      </div>
      {/* THE ICON CENTERS ON THE LABEL LINE, not on the label+rule stack, and the
          two numbers here are both measured against E9's heading — the one this
          slide is asked to match, where a Chromium `Range` box puts the glyph's mid
          and the label text's mid on the same y to the pixel.

          Two corrections, in order. FLEX-START alone puts the icon's own 26px box
          top at y=0, and that box carries 7px of pad above a 14px glyph, so the
          glyph fell 6px under the label — into the gap above the rule. E9 never
          shows it because its label has no fixed height, so the block strut is
          already as tall as the icon box; this heading pins `labelH`, so it has to
          say it. Then `HintIcon`'s pad is ASYMMETRIC (7 top, 5 bottom): centering
          its box leaves the glyph 1px low, which is what `marginBottom: 2` pays
          back — it makes the centered box symmetric around the glyph. */}
      {hint && (
        <div style={{ height: HEAD.labelH, display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline-flex", marginBottom: 2 }}>
            <HintIcon />
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * EVERY RIGHT-CANVAS PANEL: title, then illustration. Two fixed bands.
 *
 * NO SUBTITLE (gh#49 correction 2). The prototype gave each panel an italic
 * kicker under its title; all five are deleted, title then illustration — which
 * is also why the illustration band can start at a fixed `HEAD_H` for all four.
 *
 * NO FOOT LINE either, since 2026-08-04 (owner call). Every panel carried one
 * italic sentence on a ruled row at the bottom of the canvas — "…called a beat",
 * "remembers nothing", "done is a check, not an opinion", "No spine, no loop",
 * and pose 2's "You typed nothing" — and all five are deleted, copy and band
 * together. The illustration above each one already makes the point, and the row
 * they occupied is where pose 2's recap now runs.
 */
export function PanelShell({
  testid,
  title,
  children,
}: {
  testid: string;
  title: string;
  children: ReactNode;
}) {
  return (
    // `Reveal` and not a hand-written `fade on`: it is Section E's single reveal
    // primitive (`./Reveal.tsx`), and it is what carries the delay on both bands.
    <Reveal on data-testid={testid} style={{ position: "absolute", inset: 0 }}>
      <E12Heading text={title} />

      <div
        data-testid={`${testid}-illustration`}
        style={{ position: "absolute", left: 0, top: HEAD_H, width: "100%", height: ILLUS_H }}
      >
        {children}
      </div>
    </Reveal>
  );
}

// ───────────────────── the one card box ─────────────────────

/**
 * EVERY CARD BOX ON THIS SLIDE, and the reason there is a component for it.
 *
 * Owner correction 4 (gh#48) and 9 (gh#49): every box reacts to hover, on every
 * pose — a hover affordance on some boxes and not others reads as broken
 * interactivity in front of a room. Routing every box through one component is
 * what makes that checkable instead of a rule N call sites have to remember.
 *
 * The hover itself is `.e12-box` in globals.css, and it moves a COLOUR TIER and
 * never opacity (§8.3): border and text step up, nothing fades.
 */
export function Box({
  testid,
  border,
  background,
  dashed = false,
  className = "",
  style,
  active,
  lit,
  interactive = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
}: {
  testid: string;
  /** The box's rest border tier. Hover lifts it; nothing here fades. */
  border: string;
  background?: string;
  /** A box the loop has not committed to — an exit, a run that gets wiped. */
  dashed?: boolean;
  className?: string;
  /** Where the box sits. Placement stays with the panel that owns the box —
   *  what is shared here is the border, the background and the hover. */
  style: CSSProperties;
  /** Publishes `data-active`, for the boxes whose state a pointer drives. */
  active?: boolean;
  /** Publishes `data-lit` — pose 2's rank tier (`on` / `dim` / `idle`), so which
   *  stages a rail part owns is readable off the DOM and not only off the pixels. */
  lit?: string;
  /** A box a click does something to gets the pointer cursor. */
  interactive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={testid}
      data-active={active === undefined ? undefined : String(active)}
      data-lit={lit}
      className={`e12-box ${className}`.trim()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        border: `1px ${dashed ? "dashed" : "solid"} ${border}`,
        background,
        boxSizing: "border-box",
        ...(interactive ? { cursor: "pointer" } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ───────────────────── shared figures ─────────────────────

/** Square number chip — copper block, dark numeral. The deck is radius-0. */
export function NumChip({ n, size = 17, on = true }: { n: string; size?: number; on?: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        background: on ? "var(--copper-500)" : "var(--copper-800)",
        color: on ? "var(--neutral-950)" : "var(--copper-200)",
        fontFamily: "var(--mono)",
        // A chip's numeral scales with the chip — but never below the mono floor.
        // The spine panel's 14px step chips were rendering 8.12px numerals, the
        // smallest type on the slide after gh#49 raised the strips (§12.1 call 3).
        fontSize: Math.max(size * 0.58, MONO_FLOOR),
        fontWeight: 700,
        transition: "background 200ms var(--ease), color 200ms var(--ease)",
      }}
    >
      {n}
    </span>
  );
}

/**
 * A heartbeat's live trace. A dim base line with a bright dash segment cycling
 * along it; `pathLength={1}` makes the dash period 1, so the sweep loops
 * seamlessly. CSS animation, so the global reduced-motion rule squashes it to a
 * still frame with no gate here.
 */
export function Ekg({
  w = 46,
  h = 14,
  color = "var(--copper-200)",
}: {
  w?: number;
  h?: number;
  color?: string;
}) {
  const mid = h * 0.62;
  const pts = `0,${mid} ${w * 0.18},${mid} ${w * 0.26},${h * 0.2} ${w * 0.34},${h * 0.95} ${
    w * 0.42
  },${mid} ${w * 0.62},${mid} ${w * 0.7},${h * 0.42} ${w * 0.78},${mid} ${w},${mid}`;
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }} aria-hidden>
      <polyline points={pts} fill="none" stroke="var(--copper-800)" strokeWidth={1} />
      <polyline
        className="e12-ekg-sweep"
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        pathLength={1}
        strokeDasharray="0.28 0.72"
      />
    </svg>
  );
}

/**
 * The arrowheads a figure's connectors draw with. Two tiers, because a dimmed
 * connector needs a dimmed head — a bright head on a copper-600 line reads as an
 * error.
 *
 * SCOPED PER SVG, and that is the whole reason this takes a `scope`. A marker id
 * is document-global, so two figures declaring `e12-arrow` would be two elements
 * holding one id. Each SVG declares its own pair instead of sharing one `<defs>`:
 * same markup, no cross-SVG reference, no duplicate id.
 */
export function arrowIds(scope: string) {
  return { arrow: `e12-${scope}-arrow`, dim: `e12-${scope}-arrow-dim` };
}

export function ArrowMarkers({
  scope,
  bright = "var(--copper-500)",
  dim = "var(--copper-600)",
}: {
  scope: string;
  bright?: string;
  dim?: string;
}) {
  const id = arrowIds(scope);
  return (
    <defs>
      {[
        { name: id.arrow, stroke: bright },
        { name: id.dim, stroke: dim },
      ].map((m) => (
        <marker
          key={m.name}
          id={m.name}
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke={m.stroke} strokeWidth="1.4" />
        </marker>
      ))}
    </defs>
  );
}

/**
 * A connector that REVEALS WITH THE BOX IT ATTACHES TO (gh#49 correction 5).
 *
 * The prototype's panels 2 and 4 mounted their connectors fully drawn — and the
 * arrow TIP especially was visible from the first frame, which reads as a
 * rendering bug. A `<path className="e12-draw">` alone does not fix it: SVG
 * markers are not affected by the dash offset the draw animates, so the head
 * still appears at frame 0. The group is what fixes it — `e12-connector` holds
 * the whole connector, tip included, at opacity 0 until its box's own delay.
 *
 * Both classes read `--conn-delay`, so one number places the line, the tip and
 * the box on the same frame.
 */
export function Connector({
  delay,
  children,
}: {
  /** ms — the same delay the box this connector attaches to reveals on. */
  delay: number;
  children: ReactNode;
}) {
  return (
    <g className="e12-connector" style={{ "--conn-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </g>
  );
}
