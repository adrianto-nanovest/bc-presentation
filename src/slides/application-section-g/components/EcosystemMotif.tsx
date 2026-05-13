// EcosystemMotif — 3-vendor convergence motif for G.1.
//
// Three orbs arranged horizontally, each with a vendor-specific ambient
// particle/trail animation looping continuously. Subtle bridges between
// adjacent orbs suggest MCP interoperability.
//
// Motion vocabulary:
//   Claude (left)   → 6 reasoning trails (Bezier curves outward/return)
//   Google (center) → hub-and-spoke network (8 satellites, particles flow inward)
//   OpenAI (right)  → concentric ripples expanding outward
//
// All loops are CSS keyframes, infinite, no step dependency.

export function EcosystemMotif() {
  // Orb geometry: centered at x=240, x=640, x=1040; y center ~380
  const orbRadius = 120;
  const orbY = 250;
  const orbs = [
    { x: 240, ring: "var(--copper-200)", label: "CLAUDE" },
    { x: 640, ring: "var(--copper-300)", label: "GOOGLE" },
    { x: 1040, ring: "var(--copper-400)", label: "OPENAI" },
  ];

  return (
    <svg
      width={1184}
      height={500}
      viewBox="0 0 1184 500"
      style={{
        position: "absolute",
        left: 48,
        top: 140,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <defs>
        {/* Gradient for ripples */}
        <radialGradient id="g1-ripple-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--copper-400)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--copper-400)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Bridge paths between adjacent orbs — subtle, low-opacity */}
      <BridgeConnector x1={240} x2={640} y={orbY} />
      <BridgeConnector x1={640} x2={1040} y={orbY} />

      {/* Claude orb (left) — reasoning trails */}
      <g data-orb="claude">
        <circle
          cx={orbs[0].x}
          cy={orbY}
          r={orbRadius}
          fill="rgba(184,110,61,0.04)"
          stroke={orbs[0].ring}
          strokeWidth="1.5"
        />
        <text
          x={orbs[0].x}
          y={orbY + 5}
          fontFamily="var(--mono)"
          fontSize="11"
          fill="var(--copper-100)"
          textAnchor="middle"
          opacity="0.6"
        >
          CLAUDE
        </text>
        <ReasoningTrails cx={orbs[0].x} cy={orbY} />
      </g>

      {/* Google orb (center) — hub-and-spoke */}
      <g data-orb="google">
        <circle
          cx={orbs[1].x}
          cy={orbY}
          r={orbRadius}
          fill="rgba(184,110,61,0.04)"
          stroke={orbs[1].ring}
          strokeWidth="1.5"
        />
        <text
          x={orbs[1].x}
          y={orbY + 5}
          fontFamily="var(--mono)"
          fontSize="11"
          fill="var(--copper-100)"
          textAnchor="middle"
          opacity="0.6"
        >
          GOOGLE
        </text>
        <HubAndSpoke cx={orbs[1].x} cy={orbY} />
      </g>

      {/* OpenAI orb (right) — concentric ripples */}
      <g data-orb="openai">
        <circle
          cx={orbs[2].x}
          cy={orbY}
          r={orbRadius}
          fill="rgba(184,110,61,0.04)"
          stroke={orbs[2].ring}
          strokeWidth="1.5"
        />
        <text
          x={orbs[2].x}
          y={orbY + 5}
          fontFamily="var(--mono)"
          fontSize="11"
          fill="var(--copper-100)"
          textAnchor="middle"
          opacity="0.6"
        >
          OPENAI
        </text>
        <ConcentricRipples cx={orbs[2].x} cy={orbY} />
      </g>

      <style>{`
        @keyframes g1-trail {
          0%, 100% { stroke-dashoffset: 0; opacity: 0.5; }
          50% { stroke-dashoffset: -120; opacity: 0.8; }
        }
        @keyframes g1-particle-inward {
          0% { opacity: 0; }
          10% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        @keyframes g1-ripple-1 {
          0% { r: 20; opacity: 0.4; }
          100% { r: 120; opacity: 0; }
        }
        @keyframes g1-ripple-2 {
          0% { r: 20; opacity: 0.4; }
          100% { r: 120; opacity: 0; }
        }
        @keyframes g1-ripple-3 {
          0% { r: 20; opacity: 0.4; }
          100% { r: 120; opacity: 0; }
        }
        @keyframes g1-bridge-particle {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}

// ─────────────────── Reasoning Trails (Claude) ───────────────────

function ReasoningTrails({ cx, cy }: { cx: number; cy: number }) {
  // 6 curved Bezier paths emanating outward, then returning. Each trail is a
  // stroke-dasharray animated curve.
  const trails = [
    { angle: 0, len: 140 },
    { angle: 60, len: 135 },
    { angle: 120, len: 130 },
    { angle: 180, len: 140 },
    { angle: 240, len: 135 },
    { angle: 300, len: 130 },
  ];

  return (
    <g className="g1-reasoning-trails">
      {trails.map((t, i) => {
        const rad = (t.angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * 40;
        const y1 = cy + Math.sin(rad) * 40;
        const x2 = cx + Math.cos(rad) * t.len;
        const y2 = cy + Math.sin(rad) * t.len;
        const cpX = cx + Math.cos(rad) * ((40 + t.len) / 2) + Math.sin(rad) * 20;
        const cpY = cy + Math.sin(rad) * ((40 + t.len) / 2) - Math.cos(rad) * 20;
        const d = `M ${x1} ${y1} Q ${cpX} ${cpY}, ${x2} ${y2}`;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--copper-200)"
            strokeWidth="1.2"
            strokeDasharray="8 4"
            opacity="0.5"
            style={{
              animation: `g1-trail 6s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        );
      })}
    </g>
  );
}

// ─────────────────── Hub-and-Spoke (Google) ───────────────────

function HubAndSpoke({ cx, cy }: { cx: number; cy: number }) {
  // 8 satellite dots at radius ~80, lines from each to center, particles
  // flowing inward along each spoke.
  const satellites = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8;
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * 80,
      y: cy + Math.sin(rad) * 80,
      angle,
    };
  });

  return (
    <g className="g1-hub-spoke">
      {satellites.map((sat, i) => (
        <g key={i}>
          {/* Spoke line */}
          <line
            x1={cx}
            y1={cy}
            x2={sat.x}
            y2={sat.y}
            stroke="var(--copper-300)"
            strokeWidth="0.8"
            opacity="0.3"
          />
          {/* Satellite dot */}
          <circle cx={sat.x} cy={sat.y} r="3" fill="var(--copper-300)" opacity="0.6" />
          {/* Particle flowing inward */}
          <circle
            cx={sat.x}
            cy={sat.y}
            r="2"
            fill="var(--copper-200)"
            style={{
              animation: `g1-particle-inward 8s linear ${i * 0.4}s infinite`,
              transformOrigin: `${cx}px ${cy}px`,
              transformBox: "fill-box",
            }}
          >
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              begin={`${i * 0.4}s`}
              path={`M ${sat.x} ${sat.y} L ${cx} ${cy}`}
            />
          </circle>
        </g>
      ))}
    </g>
  );
}

// ─────────────────── Concentric Ripples (OpenAI) ───────────────────

function ConcentricRipples({ cx, cy }: { cx: number; cy: number }) {
  // 3 circles expanding outward from center (r=20→r=120, opacity 1→0), 5s
  // loop each, staggered by 1.6s.
  return (
    <g className="g1-ripples">
      <circle
        cx={cx}
        cy={cy}
        r="20"
        fill="none"
        stroke="var(--copper-400)"
        strokeWidth="1.5"
        style={{
          animation: `g1-ripple-1 5s ease-out infinite`,
        }}
      />
      <circle
        cx={cx}
        cy={cy}
        r="20"
        fill="none"
        stroke="var(--copper-400)"
        strokeWidth="1.5"
        style={{
          animation: `g1-ripple-2 5s ease-out 1.6s infinite`,
        }}
      />
      <circle
        cx={cx}
        cy={cy}
        r="20"
        fill="none"
        stroke="var(--copper-400)"
        strokeWidth="1.5"
        style={{
          animation: `g1-ripple-3 5s ease-out 3.2s infinite`,
        }}
      />
    </g>
  );
}

// ─────────────────── Bridge Connector ───────────────────

function BridgeConnector({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  // Thin curved path between two orbs, with optional small particles.
  const midX = (x1 + x2) / 2;
  const cpY = y + 40; // curve downward slightly
  const d = `M ${x1 + 120} ${y} Q ${midX} ${cpY}, ${x2 - 120} ${y}`;

  return (
    <g className="g1-bridge">
      <path
        d={d}
        fill="none"
        stroke="var(--copper-700)"
        strokeWidth="0.5"
        opacity="0.15"
      />
      {/* Optional: small particle traveling along bridge */}
      <circle r="1.2" fill="var(--copper-700)" opacity="0.2">
        <animateMotion dur="10s" repeatCount="indefinite" path={d} />
      </circle>
    </g>
  );
}
