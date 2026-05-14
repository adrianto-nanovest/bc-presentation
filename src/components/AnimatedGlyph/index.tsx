import "./glyphs.css";

export type GlyphKind =
  | "connectors" | "plugins" | "projects" | "dispatch"
  | "schedules" | "artifacts" | "diagrams" | "design"
  | "explore" | "clear" | "rewind" | "compact"
  | "loop" | "init" | "agents" | "pretool" | "dash-pulse"
  | "notebooklm" | "workspace-studio" | "ai-studio" | "canvas"
  | "flow" | "stitch" | "gems"
  | "chatgpt" | "codex" | "workspace-agents"
  // ─── G.9 stage glyphs ───
  | "magnifier-scan" | "lightbulb-pulse" | "map-fold" | "pencil-grid"
  | "hammer-strike" | "flask-bubble" | "rocket-launch"
  // ─── G.10 brand glyphs ───
  | "openclaw" | "hermes" | "n8n"
  // ─── Pitfall glyphs (Section H) ───
  | "vibe-coding" | "prompt-pray" | "data-leak" | "tool-overload"
  | "hallucination" | "stale-data" | "over-engineering" | "context-rot"
  // ─── Practice glyphs (Section H) ───
  | "sharpen-axe" | "goal-arrow" | "skill-block" | "human-loop"
  | "context-window" | "wheel-reuse" | "eval-tick" | "foundation-stack";

interface AnimatedGlyphProps {
  kind: GlyphKind;
  size?: number; // default 48
  /** When true, uses a tighter viewBox so the glyph fills more of its size box —
   *  match the visual weight of stroke-based icons like lucide-react. */
  tight?: boolean;
}

export function AnimatedGlyph({ kind, size = 48, tight = false }: AnimatedGlyphProps) {
  const glyph = getGlyph(kind, tight);

  return (
    <div className={`glyph glyph-${kind}`} style={{ width: size, height: size }}>
      {glyph}
    </div>
  );
}

function getGlyph(kind: GlyphKind, tight = false): JSX.Element {
  const viewBox = tight ? "8 8 24 24" : "0 0 40 40";

  switch (kind) {
    // ─── G.3 Capabilities ─────────────────────────────────────

    case "connectors":
      return (
        <svg viewBox={viewBox}>
          <path className="arc-left" d="M 8 20 Q 8 12, 16 12" />
          <path className="arc-right" d="M 32 20 Q 32 12, 24 12" />
        </svg>
      );

    case "plugins":
      return (
        <svg viewBox={viewBox}>
          <rect className="slot" x="18" y="18" width="14" height="14" rx="2" />
          <path className="piece" d="M 12 12 h 6 v 6 h -6 z M 15 12 v -4 h 2 v 4 z" />
        </svg>
      );

    case "projects":
      return (
        <svg viewBox={viewBox}>
          <rect className="folder folder-1" x="10" y="12" width="20" height="4" rx="1" />
          <rect className="folder folder-2" x="10" y="18" width="20" height="4" rx="1" />
          <rect className="folder folder-3" x="10" y="24" width="20" height="4" rx="1" />
        </svg>
      );

    case "dispatch":
      return (
        <svg viewBox={viewBox}>
          <circle className="center" cx="20" cy="20" r="3" />
          <circle className="ring ring-1" cx="20" cy="20" r="6" />
          <circle className="ring ring-2" cx="20" cy="20" r="6" />
          <circle className="ring ring-3" cx="20" cy="20" r="6" />
        </svg>
      );

    case "schedules":
      return (
        <svg viewBox={viewBox}>
          <circle className="face" cx="20" cy="20" r="12" />
          <g className="arc" style={{ transformOrigin: "20px 20px" }}>
            <path d="M 20 8 A 12 12 0 0 1 32 20" fill="none" />
          </g>
        </svg>
      );

    case "artifacts":
      return (
        <svg viewBox={viewBox}>
          <rect className="canvas" x="10" y="12" width="20" height="16" rx="2" />
        </svg>
      );

    case "diagrams":
      return (
        <svg viewBox={viewBox}>
          <circle className="node node-1" cx="12" cy="12" r="3" />
          <circle className="node node-2" cx="28" cy="12" r="3" />
          <circle className="node node-3" cx="12" cy="28" r="3" />
          <circle className="node node-4" cx="28" cy="28" r="3" />
          <line className="line line-1" x1="12" y1="12" x2="28" y2="12" />
          <line className="line line-2" x1="12" y1="12" x2="12" y2="28" />
          <line className="line line-3" x1="28" y1="12" x2="28" y2="28" />
        </svg>
      );

    case "design":
      return (
        <svg viewBox={viewBox}>
          <rect className="dash dash-1" x="10" y="10" width="4" height="4" rx="0.5" />
          <rect className="dash dash-2" x="18" y="10" width="4" height="4" rx="0.5" />
          <rect className="dash dash-3" x="26" y="10" width="4" height="4" rx="0.5" />
          <rect className="dash dash-4" x="10" y="18" width="4" height="4" rx="0.5" />
          <rect className="dash dash-5" x="18" y="18" width="4" height="4" rx="0.5" />
          <rect className="dash dash-6" x="26" y="18" width="4" height="4" rx="0.5" />
          <rect className="dash dash-7" x="10" y="26" width="4" height="4" rx="0.5" />
          <rect className="dash dash-8" x="18" y="26" width="4" height="4" rx="0.5" />
          <rect className="dash dash-9" x="26" y="26" width="4" height="4" rx="0.5" />
        </svg>
      );

    // ─── G.4 Built-in Tools & Commands (small 20px) ──────────

    case "explore":
      return (
        <svg viewBox={viewBox}>
          <rect className="box" x="8" y="12" width="24" height="16" rx="2" />
          <line className="sweep" x1="20" y1="12" x2="20" y2="28" />
        </svg>
      );

    case "clear":
      return (
        <svg viewBox={viewBox}>
          <rect className="line line-1" x="12" y="10" width="16" height="2" rx="1" />
          <rect className="line line-2" x="12" y="16" width="16" height="2" rx="1" />
          <rect className="line line-3" x="12" y="22" width="16" height="2" rx="1" />
          <rect className="line line-4" x="12" y="28" width="16" height="2" rx="1" />
        </svg>
      );

    case "rewind":
      return (
        <svg viewBox={viewBox}>
          <path className="arrow" d="M 28 20 A 8 8 0 1 0 20 12 M 20 12 L 17 9 M 20 12 L 17 15" fill="none" />
        </svg>
      );

    case "compact":
      return (
        <svg viewBox={viewBox}>
          <rect className="bar bar-1" x="10" y="10" width="2" height="20" rx="1" />
          <rect className="bar bar-2" x="14" y="14" width="2" height="12" rx="1" />
          <rect className="bar bar-3" x="18" y="12" width="2" height="16" rx="1" />
          <rect className="bar bar-4" x="22" y="15" width="2" height="10" rx="1" />
          <rect className="bar bar-5" x="26" y="13" width="2" height="14" rx="1" />
        </svg>
      );

    case "loop":
      return (
        <svg viewBox={viewBox}>
          <g className="circle-arrow" style={{ transformOrigin: "20px 20px" }}>
            <circle cx="20" cy="20" r="10" fill="none" />
            <path d="M 20 10 L 17 13 M 20 10 L 23 13" fill="none" />
          </g>
        </svg>
      );

    case "init":
      return (
        <svg viewBox={viewBox}>
          <rect className="square square-1" x="10" y="10" width="6" height="6" rx="1" />
          <rect className="square square-2" x="10" y="18" width="6" height="6" rx="1" />
          <rect className="square square-3" x="10" y="26" width="6" height="6" rx="1" />
          <rect className="square square-4" x="18" y="26" width="6" height="6" rx="1" />
        </svg>
      );

    case "agents":
      return (
        <svg viewBox={viewBox}>
          <circle className="center" cx="20" cy="20" r="3" />
          <circle className="satellite satellite-1" cx="12" cy="12" r="2" />
          <circle className="satellite satellite-2" cx="28" cy="12" r="2" />
          <circle className="satellite satellite-3" cx="20" cy="30" r="2" />
        </svg>
      );

    case "pretool":
      return (
        <svg viewBox={viewBox}>
          <path className="check" d="M 12 20 L 18 26 L 28 14" fill="none" />
        </svg>
      );

    case "dash-pulse":
      return (
        <svg viewBox={viewBox}>
          <rect className="dash" x="10" y="19" width="20" height="2" rx="1" />
        </svg>
      );

    // ─── G.5 Google ───────────────────────────────────────────

    case "notebooklm":
      return (
        <svg viewBox={viewBox}>
          <rect className="doc" x="10" y="8" width="20" height="24" rx="2" />
          <line className="citation" x1="14" y1="16" x2="26" y2="16" />
        </svg>
      );

    case "workspace-studio":
      return (
        <svg viewBox={viewBox}>
          <rect className="tile" x="10" y="10" width="6" height="6" rx="1" />
          <rect className="tile" x="22" y="10" width="6" height="6" rx="1" />
          <rect className="tile" x="16" y="22" width="6" height="6" rx="1" />
          <line className="link link-1" x1="16" y1="13" x2="22" y2="13" />
          <line className="link link-2" x1="19" y1="16" x2="19" y2="22" />
        </svg>
      );

    case "ai-studio":
      return (
        <svg viewBox={viewBox}>
          <line className="track" x1="10" y1="20" x2="30" y2="20" />
          <circle className="thumb" cx="20" cy="20" r="3" />
        </svg>
      );

    case "canvas":
      return (
        <svg viewBox={viewBox}>
          <rect className="shape" x="8" y="5" width="24" height="30" rx="2" />
        </svg>
      );

    case "flow":
      return (
        <svg viewBox={viewBox}>
          <rect className="frame frame-1" x="6" y="12" width="6" height="16" rx="1" />
          <rect className="frame frame-2" x="10" y="12" width="6" height="16" rx="1" />
          <rect className="frame frame-3" x="14" y="12" width="6" height="16" rx="1" />
          <rect className="frame frame-4" x="18" y="12" width="6" height="16" rx="1" />
          <rect className="frame frame-5" x="22" y="12" width="6" height="16" rx="1" />
        </svg>
      );

    case "stitch":
      return (
        <svg viewBox={viewBox}>
          <rect className="brick brick-1" x="8" y="8" width="8" height="4" rx="0.5" />
          <rect className="brick brick-2" x="18" y="8" width="8" height="4" rx="0.5" />
          <rect className="brick brick-3" x="28" y="8" width="4" height="4" rx="0.5" />
          <rect className="brick brick-4" x="8" y="14" width="4" height="8" rx="0.5" />
          <rect className="brick brick-5" x="14" y="14" width="12" height="8" rx="0.5" />
          <rect className="brick brick-6" x="28" y="14" width="4" height="8" rx="0.5" />
        </svg>
      );

    case "gems":
      return (
        <svg viewBox={viewBox}>
          <g className="diamond" style={{ transformOrigin: "20px 20px" }}>
            <path d="M 20 10 L 28 20 L 20 30 L 12 20 Z M 20 10 L 20 30 M 12 20 L 28 20" />
          </g>
        </svg>
      );

    // ─── G.6 OpenAI ───────────────────────────────────────────

    case "chatgpt":
      return (
        <svg viewBox={viewBox}>
          <path className="bubble" d="M 10 14 Q 10 10, 14 10 L 26 10 Q 30 10, 30 14 L 30 22 Q 30 26, 26 26 L 18 26 L 14 30 L 14 26 Q 10 26, 10 22 Z" />
        </svg>
      );

    case "codex":
      return (
        <svg viewBox={viewBox}>
          <rect className="cursor" x="10" y="18" width="2" height="8" />
          <line className="code-line" x1="14" y1="22" x2="30" y2="22" />
        </svg>
      );

    case "workspace-agents":
      return (
        <svg viewBox={viewBox}>
          <circle className="orbit" cx="20" cy="20" r="12" />
          <g className="dot" style={{ transformOrigin: "20px 20px" }}>
            <circle cx="20" cy="8" r="2" />
          </g>
        </svg>
      );

    // ─── G.9 Workflow Stages (7 glyphs) ───────────────────────

    case "magnifier-scan":
      return (
        <svg viewBox={viewBox}>
          <circle className="lens" cx="17" cy="17" r="8" />
          <line className="handle" x1="23" y1="23" x2="30" y2="30" />
          <line className="scan" x1="11" y1="17" x2="23" y2="17" />
        </svg>
      );

    case "lightbulb-pulse":
      return (
        <svg viewBox={viewBox}>
          <path className="bulb" d="M 14 14 Q 14 8, 20 8 Q 26 8, 26 14 Q 26 18, 23 21 L 23 25 L 17 25 L 17 21 Q 14 18, 14 14 Z" />
          <line className="filament" x1="18" y1="28" x2="22" y2="28" />
          <circle className="ray ray-1" cx="20" cy="14" r="10" />
          <circle className="ray ray-2" cx="20" cy="14" r="10" />
        </svg>
      );

    case "map-fold":
      return (
        <svg viewBox={viewBox}>
          <path className="map" d="M 8 12 L 16 10 L 24 12 L 32 10 L 32 28 L 24 30 L 16 28 L 8 30 Z" />
          <line className="crease crease-1" x1="16" y1="10" x2="16" y2="28" />
          <line className="crease crease-2" x1="24" y1="12" x2="24" y2="30" />
          <path className="route" d="M 11 26 Q 16 20, 20 20 Q 26 20, 29 14" />
        </svg>
      );

    case "pencil-grid":
      return (
        <svg viewBox={viewBox}>
          <line className="grid grid-h-1" x1="8" y1="14" x2="32" y2="14" />
          <line className="grid grid-h-2" x1="8" y1="20" x2="32" y2="20" />
          <line className="grid grid-h-3" x1="8" y1="26" x2="32" y2="26" />
          <line className="grid grid-v-1" x1="14" y1="8" x2="14" y2="32" />
          <line className="grid grid-v-2" x1="20" y1="8" x2="20" y2="32" />
          <line className="grid grid-v-3" x1="26" y1="8" x2="26" y2="32" />
          <path className="pencil" d="M 10 30 L 26 14 L 30 18 L 14 34 Z" />
          <path className="tip" d="M 10 30 L 8 32 L 12 32 Z" />
        </svg>
      );

    case "hammer-strike":
      return (
        <svg viewBox={viewBox}>
          <g className="hammer" style={{ transformOrigin: "20px 28px" }}>
            <rect className="head" x="10" y="8" width="20" height="8" rx="1" />
            <rect className="handle" x="18" y="14" width="4" height="16" rx="1" />
          </g>
          <line className="anvil" x1="10" y1="32" x2="30" y2="32" />
        </svg>
      );

    case "flask-bubble":
      return (
        <svg viewBox={viewBox}>
          <path className="flask" d="M 16 8 L 16 16 L 10 30 Q 10 32, 12 32 L 28 32 Q 30 32, 30 30 L 24 16 L 24 8 Z" />
          <line className="neck" x1="14" y1="8" x2="26" y2="8" />
          <circle className="bubble bubble-1" cx="17" cy="26" r="1.5" />
          <circle className="bubble bubble-2" cx="22" cy="24" r="1.5" />
          <circle className="bubble bubble-3" cx="20" cy="22" r="1.5" />
        </svg>
      );

    case "rocket-launch":
      return (
        <svg viewBox={viewBox}>
          <g className="rocket">
            <path className="body" d="M 20 8 Q 24 12, 24 22 L 24 26 L 16 26 L 16 22 Q 16 12, 20 8 Z" />
            <path className="fin fin-left" d="M 16 22 L 12 28 L 16 26 Z" />
            <path className="fin fin-right" d="M 24 22 L 28 28 L 24 26 Z" />
            <circle className="window" cx="20" cy="16" r="2" />
          </g>
          <path className="flame flame-1" d="M 18 26 L 20 32 L 22 26 Z" />
          <path className="flame flame-2" d="M 19 26 L 20 30 L 21 26 Z" />
        </svg>
      );

    // ─── G.10 Brand Alternatives (3 glyphs) ──────────────────

    case "openclaw":
      return (
        <svg viewBox={viewBox}>
          <path className="bubble-out" d="M 8 14 Q 8 10, 12 10 L 24 10 Q 28 10, 28 14 L 28 20 Q 28 24, 24 24 L 16 24 L 12 28 L 12 24 Q 8 24, 8 20 Z" />
          <path className="claw claw-1" d="M 30 12 L 34 14 L 30 16" />
          <path className="claw claw-2" d="M 30 20 L 34 22 L 30 24" />
          <circle className="dot dot-1" cx="14" cy="17" r="1.2" />
          <circle className="dot dot-2" cx="18" cy="17" r="1.2" />
          <circle className="dot dot-3" cx="22" cy="17" r="1.2" />
        </svg>
      );

    case "hermes":
      return (
        <svg viewBox={viewBox}>
          <path className="spiral" d="M 20 20 m -2 0 a 2 2 0 1 1 4 0 a 4 4 0 1 1 -8 0 a 6 6 0 1 1 12 0 a 8 8 0 1 1 -16 0 a 10 10 0 1 1 20 0" />
          <circle className="core" cx="20" cy="20" r="1.5" />
        </svg>
      );

    case "n8n":
      return (
        <svg viewBox={viewBox}>
          <line className="edge edge-1" x1="12" y1="14" x2="20" y2="20" />
          <line className="edge edge-2" x1="20" y1="20" x2="28" y2="14" />
          <line className="edge edge-3" x1="20" y1="20" x2="28" y2="26" />
          <circle className="node node-1" cx="12" cy="14" r="3" />
          <circle className="node node-2" cx="20" cy="20" r="3" />
          <circle className="node node-3" cx="28" cy="14" r="3" />
          <circle className="node node-4" cx="28" cy="26" r="3" />
        </svg>
      );

    // ─── Section H · Pitfall glyphs (8 — chaotic / off-rhythm) ───

    case "vibe-coding":
      return (
        <svg viewBox={viewBox}>
          <path
            className="scribble"
            d="M 8 22 Q 11 14, 14 22 T 20 22 T 26 22 T 32 22"
            fill="none"
          />
        </svg>
      );

    case "prompt-pray":
      return (
        <svg viewBox={viewBox}>
          <path
            className="mark"
            d="M 16 14 Q 16 10, 20 10 Q 24 10, 24 14 Q 24 17, 20 19 L 20 22"
            fill="none"
          />
          <circle className="dot" cx="20" cy="27" r="1.4" />
        </svg>
      );

    case "data-leak":
      return (
        <svg viewBox={viewBox}>
          <path className="vessel" d="M 12 10 L 28 10 L 26 22 L 14 22 Z" fill="none" />
          <path className="drop drop-1" d="M 20 24 Q 22 28, 20 32 Q 18 28, 20 24 Z" />
          <path className="drop drop-2" d="M 20 24 Q 22 28, 20 32 Q 18 28, 20 24 Z" />
        </svg>
      );

    case "tool-overload":
      return (
        <svg viewBox={viewBox}>
          <rect className="cell cell-1" x="9" y="9" width="5" height="5" rx="1" />
          <rect className="cell cell-2" x="17" y="9" width="5" height="5" rx="1" />
          <rect className="cell cell-3" x="25" y="9" width="5" height="5" rx="1" />
          <rect className="cell cell-4" x="9" y="17" width="5" height="5" rx="1" />
          <rect className="cell cell-5" x="17" y="17" width="5" height="5" rx="1" />
          <rect className="cell cell-6" x="25" y="17" width="5" height="5" rx="1" />
          <rect className="cell cell-7" x="13" y="25" width="5" height="5" rx="1" />
          <rect className="cell cell-8" x="21" y="25" width="5" height="5" rx="1" />
        </svg>
      );

    case "hallucination":
      return (
        <svg viewBox={viewBox}>
          <path
            className="wave"
            d="M 6 20 Q 9 14, 12 20 T 18 20 T 24 20 T 30 20 T 34 20"
            fill="none"
          />
        </svg>
      );

    case "stale-data":
      return (
        <svg viewBox={viewBox}>
          <circle className="face" cx="20" cy="20" r="11" />
          <line className="hand-stuck" x1="20" y1="20" x2="20" y2="13" />
          <g className="hand-spin" style={{ transformOrigin: "20px 20px" }}>
            <line x1="20" y1="20" x2="26" y2="20" />
          </g>
        </svg>
      );

    case "over-engineering":
      return (
        <svg viewBox={viewBox}>
          <g className="gear gear-a" style={{ transformOrigin: "13px 14px" }}>
            <circle cx="13" cy="14" r="5" fill="none" />
            <circle cx="13" cy="14" r="1.5" />
          </g>
          <g className="gear gear-b" style={{ transformOrigin: "26px 18px" }}>
            <circle cx="26" cy="18" r="6" fill="none" />
            <circle cx="26" cy="18" r="1.5" />
          </g>
          <g className="gear gear-c" style={{ transformOrigin: "18px 28px" }}>
            <circle cx="18" cy="28" r="4" fill="none" />
            <circle cx="18" cy="28" r="1.5" />
          </g>
        </svg>
      );

    case "context-rot":
      return (
        <svg viewBox={viewBox}>
          <rect className="block" x="10" y="10" width="20" height="20" rx="1" fill="none" />
          <circle className="noise noise-1" cx="14" cy="14" r="0.9" />
          <circle className="noise noise-2" cx="22" cy="13" r="0.9" />
          <circle className="noise noise-3" cx="28" cy="17" r="0.9" />
          <circle className="noise noise-4" cx="13" cy="22" r="0.9" />
          <circle className="noise noise-5" cx="20" cy="24" r="0.9" />
          <circle className="noise noise-6" cx="27" cy="27" r="0.9" />
        </svg>
      );

    // ─── Section H · Practice glyphs (8 — calm / rhythmic) ───────

    case "sharpen-axe":
      return (
        <svg viewBox={viewBox}>
          <line className="blade" x1="10" y1="26" x2="30" y2="14" />
          <circle className="spark" cx="10" cy="26" r="1.4" />
        </svg>
      );

    case "goal-arrow":
      return (
        <svg viewBox={viewBox}>
          <circle className="bullseye-outer" cx="29" cy="20" r="4" fill="none" />
          <circle className="bullseye-inner" cx="29" cy="20" r="1.4" />
          <path className="arrow" d="M 8 20 L 26 20 M 22 16 L 26 20 L 22 24" fill="none" />
        </svg>
      );

    case "skill-block":
      return (
        <svg viewBox={viewBox}>
          <rect className="block block-1" x="12" y="26" width="16" height="4" rx="0.5" />
          <rect className="block block-2" x="14" y="20" width="12" height="4" rx="0.5" />
          <rect className="block block-3" x="16" y="14" width="8" height="4" rx="0.5" />
        </svg>
      );

    case "human-loop":
      return (
        <svg viewBox={viewBox}>
          <circle className="track" cx="20" cy="20" r="11" fill="none" />
          <g className="check-orbit" style={{ transformOrigin: "20px 20px" }}>
            <path className="check" d="M 17 9 L 19 11 L 23 7" fill="none" />
          </g>
        </svg>
      );

    case "context-window":
      return (
        <svg viewBox={viewBox}>
          <rect className="window" x="9" y="12" width="22" height="16" rx="1" fill="none" />
          <rect className="wipe" x="9" y="12" width="6" height="16" />
        </svg>
      );

    case "wheel-reuse":
      return (
        <svg viewBox={viewBox}>
          <g className="wheel" style={{ transformOrigin: "20px 20px" }}>
            <circle cx="20" cy="20" r="10" fill="none" />
            <circle className="notch" cx="20" cy="10" r="1.6" />
          </g>
          <line className="marker" x1="20" y1="6" x2="20" y2="9" />
        </svg>
      );

    case "eval-tick":
      return (
        <svg viewBox={viewBox}>
          <path className="tick" d="M 11 21 L 17 27 L 29 13" fill="none" />
        </svg>
      );

    case "foundation-stack":
      return (
        <svg viewBox={viewBox}>
          <rect className="bar bar-1" x="9" y="26" width="22" height="4" rx="0.5" />
          <rect className="bar bar-2" x="11" y="20" width="18" height="4" rx="0.5" />
          <rect className="bar bar-3" x="13" y="14" width="14" height="4" rx="0.5" />
        </svg>
      );

    // ─── Fallback ─────────────────────────────────────────────

    default:
      return (
        <svg viewBox={viewBox}>
          <rect
            x="4"
            y="4"
            width="32"
            height="32"
            rx="2"
            fill="none"
            stroke="var(--copper-400)"
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}
