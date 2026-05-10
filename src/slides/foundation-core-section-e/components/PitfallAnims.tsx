// Four self-contained SVG/SMIL animations for the four context pitfalls
// rendered on slide E.8, plus a shared caption component and the metadata
// record (PIT_DETAIL) keyed by pitfall kind.
//
// Ported from `claude-design-project/jsx/slides-b.jsx:521-619`
// (ConflictAnim, ConfusionAnim, PoisoningAnim, DistractionAnim, PitCaption,
// PIT_DETAIL). The SVG shapes, viewBoxes, SMIL `<animate>` / `<animateTransform>`
// timings, and color tokens match the source verbatim.
import { highlight } from "@/components/highlight";

export type PitfallKind = "conflict" | "confusion" | "poisoning" | "distraction";

const PIT_SVG_STYLE: React.CSSProperties = { width: 460, height: 280 };

export interface PitDetail {
  text: string;
  kw: readonly string[];
  mit: string;
  example?: string;
}

export const PIT_DETAIL: Record<PitfallKind, PitDetail> = {
  conflict: {
    text: "Sources contradict. Model commits early — and can't recover.",
    kw: ["commits early"],
    mit: "Context Isolation · Versioned Context",
    example:
      "Pasting Q3 and Q4 figures into the same chat — model averages them, picks neither cleanly.",
  },
  confusion: {
    text: "Most of the context isn't what you wanted.",
    kw: ["isn't what you wanted"],
    mit: "Tool Loadout · Context Pruning",
    example:
      "Pasting a 50-page report 'just in case' — model misses the 3 things that mattered.",
  },
  poisoning: {
    text: "Wrong or vague info compounds silently.",
    kw: ["compounds"],
    mit: "Subagent Verification · Context Quarantine",
    example:
      "Pasted last quarter's budget by mistake — AI keeps using it through edits; final memo ships off by 30%.",
  },
  distraction: {
    text: "Tokens compound. Performance degrades into the dumb zone.",
    kw: ["dumb zone"],
    mit: "Summarization · Context Offloading",
    example:
      "After ~20 rounds of edits in one chat — answers start repeating, recent corrections get missed.",
  },
};

export function ConflictAnim() {
  return (
    <svg
      data-testid="pit-anim-conflict"
      viewBox="-60 -40 120 80"
      style={PIT_SVG_STYLE}
    >
      <circle cy="0" r="22" fill="rgba(124,84,56,0.45)" stroke="rgb(124,84,56)" strokeWidth="0.5" cx="-32">
        <animate attributeName="cx" values="-32;-10" keyTimes="0;1" dur="1.4s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.22 0.61 0.36 1" />
      </circle>
      <circle cy="0" r="22" fill="rgba(212,153,102,0.45)" stroke="rgb(212,153,102)" strokeWidth="0.5" cx="32">
        <animate attributeName="cx" values="32;10" keyTimes="0;1" dur="1.4s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.22 0.61 0.36 1" />
      </circle>
      <text x="0" y="2" textAnchor="middle" fill="rgb(245,222,189)" fontSize="5" fontFamily="var(--mono)" letterSpacing="0.5" opacity="0">
        FROZEN
        <animate attributeName="opacity" values="0;1" keyTimes="0;1" begin="1.3s" dur="0.4s" fill="freeze" />
      </text>
      <text x="-40" y="2" textAnchor="end" fill="rgb(180,128,86)" fontSize="3.6" fontFamily="var(--mono)" opacity="0">
        Source A
        <animate attributeName="opacity" values="0;1" keyTimes="0;1" begin="0.5s" dur="0.4s" fill="freeze" />
      </text>
      <text x="40" y="2" textAnchor="start" fill="rgb(212,153,102)" fontSize="3.6" fontFamily="var(--mono)" opacity="0">
        Source B
        <animate attributeName="opacity" values="0;1" keyTimes="0;1" begin="0.5s" dur="0.4s" fill="freeze" />
      </text>
    </svg>
  );
}

export function ConfusionAnim() {
  return (
    <svg
      data-testid="pit-anim-confusion"
      viewBox="-60 -40 120 80"
      style={PIT_SVG_STYLE}
    >
      <text x="0" y="-26" textAnchor="middle" fill="rgb(229,199,159)" fontSize="3.5" fontFamily="var(--mono)" letterSpacing="0.4">
        Signal
      </text>
      <line x1="-58" y1="-8" x2="58" y2="-8" stroke="rgba(212,153,102,0.55)" strokeWidth="0.4" strokeDasharray="2 2" />
      <polygon points="-7,-8 7,-8 0,-22" fill="rgba(212,153,102,0.75)" stroke="rgb(212,153,102)" strokeWidth="0.4" />
      <polygon points="-26,-8 26,-8 14,18 -14,18" fill="rgba(124,84,56,0.5)" stroke="rgb(124,84,56)" strokeWidth="0.4">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,2.5; 0,-2.5; 0,0" keyTimes="0;0.33;0.66;1" dur="2s" repeatCount="indefinite" />
      </polygon>
      <text x="0" y="0" textAnchor="middle" fill="rgb(180,128,86)" fontSize="3" fontFamily="var(--mono)">Irrelevant Information</text>
      <text x="0" y="6" textAnchor="middle" fill="rgb(180,128,86)" fontSize="3" fontFamily="var(--mono)">Tool Overload</text>
      <text x="0" y="12" textAnchor="middle" fill="rgb(180,128,86)" fontSize="3" fontFamily="var(--mono)">Cognitive Overload</text>
    </svg>
  );
}

export function PoisoningAnim() {
  return (
    <svg
      data-testid="pit-anim-poisoning"
      viewBox="-60 -40 120 80"
      style={PIT_SVG_STYLE}
    >
      <rect x="-40" y="-30" width="80" height="22" fill="rgba(212,153,102,0.18)" stroke="rgb(212,153,102)" strokeWidth="0.4" />
      <rect x="-40" y="8" width="80" height="22" fill="rgba(124,84,56,0.32)" stroke="rgb(124,84,56)" strokeWidth="0.4" />
      <text x="0" y="-32" textAnchor="middle" fill="rgb(229,199,159)" fontSize="3.4" fontFamily="var(--mono)" letterSpacing="0.4">Clean</text>
      <text x="0" y="36" textAnchor="middle" fill="rgb(180,128,86)" fontSize="3.4" fontFamily="var(--mono)" letterSpacing="0.4">Corrupted</text>
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} r="1.2" cx={-28 + i * 8} cy="-15" fill="rgb(229,199,159)">
          <animate attributeName="cy" values="-15;15;15" keyTimes="0;0.7;1" dur="2.6s" begin={`${i * 0.22}s`} repeatCount="indefinite" />
          <animate attributeName="fill" values="rgb(229,199,159);rgb(168,90,60);rgb(168,90,60)" keyTimes="0;0.7;1" dur="2.6s" begin={`${i * 0.22}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export function DistractionAnim() {
  // No loop. Progress bar and curve both finish at the same time; "DEGRADED"
  // appears top-right after they reach their end.
  const DUR = 2.2;
  return (
    <svg
      data-testid="pit-anim-distraction"
      viewBox="-60 -40 120 80"
      style={PIT_SVG_STYLE}
    >
      <rect x="-50" y="22" width="100" height="6" fill="rgba(212,153,102,0.15)" stroke="rgba(212,153,102,0.5)" strokeWidth="0.3" />
      <rect x="-50" y="22" height="6" fill="rgba(212,153,102,0.65)" width="0">
        <animate attributeName="width" from="0" to="100" dur={`${DUR}s`} begin="0.1s" fill="freeze" />
      </rect>
      <path
        d="M-50,-22 Q-20,-26 -2,-12 T50,18"
        fill="none"
        stroke="rgb(229,199,159)"
        strokeWidth="0.7"
        strokeLinecap="round"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset="100"
      >
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur={`${DUR}s`} begin="0.1s" fill="freeze" />
      </path>
      <g opacity="0">
        <rect x="22" y="-30" width="32" height="9" fill="rgba(168,90,60,0.4)" stroke="rgb(168,90,60)" strokeWidth="0.3" />
        <text x="38" y="-23.5" textAnchor="middle" fill="rgb(229,199,159)" fontSize="3.6" fontFamily="var(--mono)" letterSpacing="0.5">DEGRADED</text>
        <animate attributeName="opacity" from="0" to="1" begin={`${DUR + 0.2}s`} dur="0.4s" fill="freeze" />
      </g>
    </svg>
  );
}

interface PitCaptionProps {
  kind: PitfallKind;
}

export function PitCaption({ kind }: PitCaptionProps) {
  const detail = PIT_DETAIL[kind];
  return (
    <div
      data-testid={`pit-caption-${kind}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        textAlign: "center",
        maxWidth: 580,
      }}
    >
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 18,
          color: "var(--neutral-100)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(detail.text, detail.kw)}
      </p>
      <p
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Mitigated by → {detail.mit}
      </p>
      {detail.example && (
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--neutral-400)",
            margin: "4px 0 0",
            lineHeight: 1.4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontStyle: "normal",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--copper-500)",
              textTransform: "uppercase",
              marginRight: 8,
            }}
          >
            Example
          </span>
          {detail.example}
        </p>
      )}
    </div>
  );
}

const ANIMS: Record<PitfallKind, () => React.JSX.Element> = {
  conflict: ConflictAnim,
  confusion: ConfusionAnim,
  poisoning: PoisoningAnim,
  distraction: DistractionAnim,
};

interface PitfallAnimProps {
  kind: PitfallKind;
}

// Convenience wrapper: render the matching anim by kind. Used inside
// PitfallCanvas; tests can also drive it directly.
export function PitfallAnim({ kind }: PitfallAnimProps) {
  const Comp = ANIMS[kind];
  return <Comp />;
}
