/* global window, React, D1, D2, D3, D4, D5,
   FigLabel, Headline, KW, Reveal, CopperRule, useDeck,
   LucideIcon, CountUp, insetLine */
const { useState, useEffect, useRef, useMemo } = React;

// ──────────────────────────────────────────────────────────
// SLIDE D1 — THE TRAP
// 3 steps:
//   0  the stat (73% animated)
//   1  stat shrinks to header style; left = mechanism + bars + caption,
//      right = looping automation animation
//   2  the prescription
// ──────────────────────────────────────────────────────────

function AmpBar({ label, value, widthPct, on, delay = 0, accent = 'copper-500', tall = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: `var(--${accent})`, textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: 'var(--display)', fontSize: tall ? 32 : 22, color: `var(--${accent})`, lineHeight: 1 }}>{value}</span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: tall ? 14 : 10, background: 'rgba(184,110,61,0.10)', border: '1px solid var(--copper-800)' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: on ? `${Math.min(100, widthPct)}%` : '0%',
          background: `var(--${accent})`,
          transition: `width 1.2s var(--ease) ${delay}ms`,
        }} />
        {widthPct > 100 && (
          <div style={{
            position: 'absolute', right: -2, top: -4, bottom: -4,
            width: 4, background: `var(--${accent})`,
            opacity: on ? 1 : 0,
            transition: `opacity 0.3s var(--ease) ${delay + 1100}ms`,
            boxShadow: `0 0 12px var(--${accent})`,
          }} />
        )}
      </div>
    </div>
  );
}

// Looping automation illustration: a continuous conveyor that flows
// through a central processing block. Tokens enter slow on the top
// rail, accelerate through "automation", multiply, and stream fast
// along the bottom rail before looping back. Loops forever.
function AutomationLoop({ on }) {
  // viewBox 400x400. Rounded-rect "racetrack" path, clockwise from top-left.
  // Top rail (60→340 at y=80) is the "manual" side; bottom rail (340→60 at y=320)
  // is the "machine" side after the EXEC block.
  const trackD = "M 80 80 L 320 80 Q 360 80 360 120 L 360 280 Q 360 320 320 320 L 80 320 Q 40 320 40 280 L 40 120 Q 40 80 80 80 Z";

  // Slow tokens — only on the top rail (input side). 4 tokens, evenly spaced.
  const slowTokens = [0, 0.25, 0.5, 0.75];
  // Fast tokens — only on the bottom rail (output side). Many, tightly packed.
  const fastCount = 14;
  const fastTokens = Array.from({ length: fastCount }, (_, i) => i / fastCount);

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.7s var(--ease) 400ms, transform 0.7s var(--ease) 400ms',
    }}>
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', maxWidth: 480, maxHeight: 480, overflow: 'visible' }}>
        <defs>
          {/* Top rail = slow (1×) */}
          <path id="d1-rail-slow" d="M 60 80 L 340 80" />
          {/* Bottom rail = fast (1000×), runs right-to-left to form a continuous loop */}
          <path id="d1-rail-fast" d="M 340 320 L 60 320" />
          <linearGradient id="d1-fast-glow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--copper-300)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--copper-200)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--copper-300)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer track (dashed, subtle) */}
        <path d={trackD} fill="none" stroke="var(--copper-800)" strokeWidth="1" strokeDasharray="3,5" />

        {/* Top rail label — MANUAL */}
        <text x="200" y="56" textAnchor="middle" fill="var(--copper-500)" fontFamily="var(--mono, ui-monospace)" fontSize="10" letterSpacing="3">MANUAL · 1×</text>
        {/* Bottom rail label — MACHINE */}
        <text x="200" y="356" textAnchor="middle" fill="var(--copper-300)" fontFamily="var(--mono, ui-monospace)" fontSize="10" letterSpacing="3">MACHINE · 1,000×</text>

        {/* Subtle bottom-rail glow underline — the speed line */}
        <line x1="60" y1="320" x2="340" y2="320" stroke="url(#d1-fast-glow)" strokeWidth="6" />

        {/* Slow tokens (top rail) — square markers, 12s loop */}
        {slowTokens.map((p, i) => (
          <rect key={`s${i}`} x="-4" y="-4" width="8" height="8" fill="var(--copper-700)" stroke="var(--copper-500)" strokeWidth="1">
            <animateMotion dur="12s" repeatCount="indefinite" begin={`-${p * 12}s`}>
              <mpath href="#d1-rail-slow" />
            </animateMotion>
          </rect>
        ))}

        {/* EXEC block — right side, where manual meets machine */}
        <g>
          <rect x="332" y="148" width="56" height="104" fill="rgba(184,110,61,0.12)" stroke="var(--copper-300)" strokeWidth="1" />
          <text x="360" y="180" textAnchor="middle" fill="var(--copper-200)" fontFamily="var(--mono, ui-monospace)" fontSize="9" letterSpacing="2">EXEC</text>
          {/* internal "gear" tick marks */}
          <line x1="340" y1="200" x2="380" y2="200" stroke="var(--copper-500)" strokeWidth="0.5" />
          <line x1="340" y1="212" x2="380" y2="212" stroke="var(--copper-500)" strokeWidth="0.5" />
          <line x1="340" y1="224" x2="380" y2="224" stroke="var(--copper-500)" strokeWidth="0.5" />
          {/* pulsing core */}
          <circle cx="360" cy="232" r="4" fill="var(--copper-200)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* INPUT label */}
        <g>
          <circle cx="40" cy="200" r="3" fill="var(--copper-500)" />
          <text x="22" y="204" textAnchor="end" fill="var(--copper-400)" fontFamily="var(--mono, ui-monospace)" fontSize="9" letterSpacing="2">IN</text>
        </g>

        {/* Fast tokens (bottom rail) — thin streaks, 1.6s loop = ~7.5× visual speed */}
        {fastTokens.map((p, i) => (
          <rect key={`f${i}`} x="-6" y="-1.5" width="12" height="3" fill="var(--copper-200)">
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`-${p * 1.6}s`}>
              <mpath href="#d1-rail-fast" />
            </animateMotion>
          </rect>
        ))}

        {/* Connector arrows showing the loop direction */}
        {/* Top: left→right (manual feed) */}
        <path d="M 196 76 L 204 80 L 196 84 Z" fill="var(--copper-500)" />
        {/* Right: top→bottom into EXEC */}
        <path d="M 356 144 L 360 152 L 364 144 Z" fill="var(--copper-300)" />
        {/* Bottom: right→left (machine return) */}
        <path d="M 204 316 L 196 320 L 204 324 Z" fill="var(--copper-200)" />
        {/* Left: bottom→top (return to input) */}
        <path d="M 36 204 L 40 196 L 44 204 Z" fill="var(--copper-500)" />
      </svg>
    </div>
  );
}

function SlideD1({ step }) {
  const showStat = step >= 0;
  const showBody = step >= 1;
  const showRx   = step >= 2;
  return (
    <>
      <FigLabel num="1" kind="THE TRAP" />

      {/* The big stat — full-bleed at step 0; shrinks into header style at step 1+ */}
      <div style={{
        position: 'absolute',
        left: 48, right: 48,
        top: showBody ? 76 : 130,
        transition: 'top 0.7s var(--ease)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: showBody ? 16 : 24,
          justifyContent: showBody ? 'flex-start' : 'center',
          flexWrap: 'wrap',
        }}>
          <h1 style={{
            margin: 0,
            fontFamily: 'var(--display)',
            fontWeight: 400,
            lineHeight: showBody ? 1.05 : 0.9,
            letterSpacing: showBody ? '-0.01em' : 'normal',
            fontSize: showBody ? 40 : 200,
            transition: 'font-size 0.7s var(--ease), line-height 0.7s var(--ease), letter-spacing 0.7s var(--ease)',
            display: 'inline-flex',
            alignItems: 'baseline',
            color: 'var(--copper-700)',
          }}>
            <CountUp from={0} to={D1.beat1.statValue} durationMs={1500} on={showStat} />
            <span style={{
              fontSize: showBody ? '1em' : '0.55em',
              marginLeft: showBody ? '0.02em' : '0.05em',
              color: 'var(--copper-300)',
              transition: 'font-size 0.7s var(--ease)',
            }}>{D1.beat1.statSuffix}</span>
          </h1>
          <p style={{
            margin: 0,
            fontFamily: showBody ? 'var(--display)' : 'var(--serif)',
            fontWeight: 400,
            color: showBody ? 'var(--neutral-50)' : 'var(--neutral-100)',
            fontSize: showBody ? 40 : 32,
            lineHeight: showBody ? 1.05 : 1.25,
            letterSpacing: showBody ? '-0.01em' : 'normal',
            transition: 'font-size 0.7s var(--ease), line-height 0.7s var(--ease), color 0.7s var(--ease), font-family 0s 0.35s',
            maxWidth: showBody ? 720 : 720,
          }}>
            <KW text={D1.beat1.subLine} keywords={D1.beat1.subLineKw} />
          </p>
        </div>
        {!showBody && (
          <Reveal on={showStat} delay={1700} style={{ textAlign: 'center', marginTop: 28 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', color: 'var(--neutral-500)', textTransform: 'uppercase', margin: 0 }}>
              {D1.beat1.caption}
            </p>
          </Reveal>
        )}
      </div>

      {/* Body — 50:50 split. Left = text/bars/caption + prescription. Right = looping automation. */}
      <div style={{
        position: 'absolute', left: 48, right: 48, top: 156, bottom: 80,
        display: 'flex', gap: 48,
        opacity: showBody ? 1 : 0,
        transition: 'opacity 0.5s var(--ease) 0.4s',
        pointerEvents: showBody ? 'auto' : 'none',
      }}>
        {/* LEFT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Reveal on={showBody}>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 36, color: 'var(--neutral-50)', margin: 0, lineHeight: 1.15 }}>
              <KW text={D1.beat2.mechanism} keywords={D1.beat2.mechanismKw} />
            </h2>
          </Reveal>
          <div style={{ height: 14 }} />
          <CopperRule on={showBody} delay={250} width="32%" />
          <div style={{ height: 22 }} />

          {/* Bars */}
          <Reveal on={showBody} delay={400} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AmpBar label={D1.beat2.manualLabel} value={D1.beat2.manualValue}  widthPct={1.5} on={showBody} delay={500} accent="copper-700" />
            <AmpBar label={D1.beat2.machineLabel} value={D1.beat2.machineValue} widthPct={140} on={showBody} delay={1100} accent="copper-300" tall />
          </Reveal>

          <Reveal on={showBody} delay={1300} style={{ marginTop: 18 }}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--neutral-400)', margin: 0 }}>
              <KW text={D1.beat2.caption} keywords={D1.beat2.captionKw} />
            </p>
          </Reveal>

          {/* Prescription */}
          <Reveal on={showRx} delay={150} style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--copper-800)' }}>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 32, color: 'var(--copper-200)', margin: 0, lineHeight: 1.1 }}>
              <KW text={D1.beat3.prescription} keywords={D1.beat3.prescriptionKw} />
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--neutral-300)', margin: '6px 0 0 0' }}>
              <KW text={D1.beat3.sub} keywords={D1.beat3.subKw} />
            </p>
          </Reveal>
        </div>

        {/* RIGHT — looping automation animation */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
          <AutomationLoop on={showBody} />
        </div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────
// SLIDE D2 — THE CONVERGENCE
// 3 steps:
//   0  cards revealed on left as a vertical list — hover any card
//      and its details (tagline + bullets + analogy) appear on the right.
//   1  right side switches to the network illustration (name + icon).
//      Reveal sequence (timed within the step): BPM, RPA, AI fade in;
//      then IPA fades in with the three connector lines pulsing into it;
//      then AGENTIC fades in with its connector pulsing from IPA → AGENTIC.
//   2  bottom summary line.
// ──────────────────────────────────────────────────────────

// Compact card used in the LEFT vertical list.
// Hovering drives the right-side detail panel (step 0) AND highlights the
// matching node in the network illustration (step 1+).
function D2ListCard({ data, hovered, onHover, delay }) {
  const isHover = hovered === data.key;
  const accent = `var(--${data.copper})`;
  return (
    <div
      onMouseEnter={() => onHover(data.key)}
      onMouseLeave={() => onHover((h) => h === data.key ? null : h)}
      style={{
        flex: 1, minHeight: 0,
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '10px 14px',
        border: `1px solid ${isHover ? 'var(--copper-200)' : accent}`,
        background: isHover ? 'rgba(184,110,61,0.10)' : 'rgba(10,10,10,0.6)',
        boxShadow: isHover ? `0 0 0 1px ${accent} inset, 0 0 24px -10px ${accent}` : 'none',
        transition: 'all 0.2s var(--ease)',
        cursor: 'default',
        animation: `fadeReveal 0.5s var(--ease) ${delay}ms both`,
      }}
    >
      <div style={{
        flex: '0 0 28px', width: 28, height: 28,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: isHover ? 'var(--copper-100)' : 'var(--copper-300)',
      }}>
        <LucideIcon name={data.icon} size={22} color="currentColor" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--neutral-50)', lineHeight: 1 }}>{data.title}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', color: 'var(--copper-400)', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.subName}</span>
        </div>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--copper-200)', lineHeight: 1.3 }}>
          <KW text={data.tagline} keywords={data.taglineKw} />
        </span>
      </div>
    </div>
  );
}

// Right-side detail panel for the hovered card (step 0).
// Header ladder: small abbreviation chip → dominant full-term headline → italic tagline.
// Returns null when nothing is hovered so the right column reads as blank by default.
function D2DetailPanel({ data }) {
  if (!data) return null;
  const accent = `var(--${data.copper})`;
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      border: `1px solid ${accent}`,
      background: 'rgba(20,12,6,0.72)',
      boxShadow: `0 0 0 1px ${accent} inset, 0 0 40px -16px ${accent}`,
      padding: '24px 28px',
    }}>
      {/* Abbreviation chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.26em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>
          {data.title}
        </span>
        <span style={{ flex: '0 0 auto', width: 22, height: 1, background: 'var(--copper-700)' }} />
      </div>
      <div style={{ height: 8 }} />
      {/* Full term — dominant headline */}
      <h2 style={{ fontFamily: 'var(--display)', fontSize: 36, color: 'var(--neutral-50)', lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0 }}>
        {data.subName}
      </h2>
      <div style={{ height: 8 }} />
      {/* Tagline — italic subtitle below the abbreviation+full-term lockup */}
      <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--copper-200)', lineHeight: 1.4 }}>
        <KW text={data.tagline} keywords={data.taglineKw} />
      </span>
      <div style={{ height: 16 }} />
      <CopperRule on width="30%" />
      <div style={{ height: 18 }} />
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.bullets.map((b) => (
          <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--neutral-100)', lineHeight: 1.45 }}>
            <span style={{ width: 6, height: 6, background: accent, flexShrink: 0, transform: 'translateY(-1px)' }} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div style={{ flex: 1 }} />
      <div style={{ borderTop: '1px solid var(--copper-800)', paddingTop: 14, marginTop: 14 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase', marginBottom: 6 }}>Analogy</div>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--copper-200)', margin: 0, lineHeight: 1.45 }}>
          “{data.analogy}”
        </p>
      </div>
    </div>
  );
}

// Network illustration constants — fixed pixel space so SVG geometry and
// HTML satellite divs share the same coordinate system. Boxes are equal-sized
// so a single d2Seg() works for both endpoints.
const D2_NET_W = 760, D2_NET_H = 320;
const D2_NET = {
  bpm:     { x:  90, y:  60 },
  rpa:     { x:  90, y: 160 },
  ai:      { x:  90, y: 260 },
  ipa:     { x: 380, y: 160 },
  agentic: { x: 660, y: 160 },
};
const D2_SAT_W = 156, D2_SAT_H = 64;

// Connector segment from box-A border to ~3px before box-B border, so the
// arrow tip lands on B's border (not floating in space, not penetrating).
function d2Seg(a, b) {
  const halfW = D2_SAT_W / 2, halfH = D2_SAT_H / 2;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const tBox = Math.min(
    halfW / Math.max(Math.abs(ux), 1e-6),
    halfH / Math.max(Math.abs(uy), 1e-6),
  );
  return {
    x1: a.x + ux * tBox,            y1: a.y + uy * tBox,
    x2: b.x - ux * (tBox + 3),      y2: b.y - uy * (tBox + 3),
  };
}

function D2Satellite({ data, x, y, visible, accentVar, active }) {
  const accent = `var(${accentVar})`;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: D2_SAT_W, height: D2_SAT_H,
      transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.92})`,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s var(--ease), transform 0.5s var(--ease), border-color 0.2s var(--ease), box-shadow 0.2s var(--ease), background 0.2s var(--ease)',
      border: `1px solid ${active ? 'var(--copper-200)' : accent}`,
      background: active ? 'rgba(184,110,61,0.10)' : 'rgba(10,10,10,0.92)',
      boxShadow: active ? `0 0 0 1px ${accent} inset, 0 0 28px -10px ${accent}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: '8px 14px',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: active ? 'var(--copper-100)' : 'var(--copper-300)', transition: 'color 0.2s var(--ease)' }}>
        <LucideIcon name={data.icon} size={22} color="currentColor" />
      </span>
      <span style={{ fontFamily: 'var(--display)', fontSize: 18, color: 'var(--neutral-50)', lineHeight: 1, letterSpacing: '0.04em' }}>{data.title}</span>
    </div>
  );
}

function D2Network({ on, hovered }) {
  // Phase machine: feeders reveal first (one by one), then IPA + 3 feeder arrows
  // arrive together, then AGENTIC + the dashed IPA→AGENTIC arrow.
  // Phase 0=idle · 1=BPM · 2=RPA · 3=AI · 4=IPA + feeder arrows · 5=AGENTIC + dashed arrow.
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!on) { setPhase(0); return; }
    const timers = [
      setTimeout(() => setPhase(1),  200),
      setTimeout(() => setPhase(2),  800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [on]);

  const showBPM           = phase >= 1;
  const showRPA           = phase >= 2;
  const showAI            = phase >= 3;
  const showIPA           = phase >= 4;
  const showFeederArrows  = phase >= 4;
  const showAgentic       = phase >= 5;
  const showAgenticArrow  = phase >= 5;

  const segIPA = (k) => d2Seg(D2_NET[k], D2_NET.ipa);
  const segAgentic = d2Seg(D2_NET.ipa, D2_NET.agentic);

  const cardByKey = useMemo(() => Object.fromEntries(D2.cards.map((c) => [c.key, c])), []);

  // An arrow heats up if either endpoint's discipline is hovered in the left list.
  const feederHot = (k) => hovered === k || hovered === 'ipa';
  const agenticHot = hovered === 'ipa' || hovered === 'agentic';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Illustration title — top y-aligned with the left section's "Five disciplines"
          label (same font/size), but horizontally centered across the right column. */}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase', textAlign: 'center' }}>
        <em style={{ fontStyle: 'italic', color: 'var(--copper-200)' }}>4 Components</em>
        <span style={{ color: 'var(--copper-700)', margin: '0 8px' }}>—</span>
        <span>The Automation Spectrum</span>
      </div>

      {/* Network canvas — centered in remaining vertical space (between title and summary slot) */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        <div style={{ position: 'relative', width: D2_NET_W, height: D2_NET_H, maxWidth: '100%' }}>
          {/* SVG arrows */}
          <svg width="100%" height="100%" viewBox={`0 0 ${D2_NET_W} ${D2_NET_H}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
            <defs>
              {/* Smaller arrow tips — markerWidth/Height 4 (was 6) renders ~5–6px on screen */}
              <marker id="d2net-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse" markerUnits="strokeWidth">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--copper-300)" />
              </marker>
              <marker id="d2net-arrow-hot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse" markerUnits="strokeWidth">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--copper-100)" />
              </marker>
            </defs>

            {/* Feeders → IPA — all three arrows reveal together with the IPA box (phase 4).
                Motion pulses are staggered slightly so they read as a coordinated arrival. */}
            {['bpm','rpa','ai'].map((k, i) => {
              const seg = segIPA(k);
              const hot = feederHot(k);
              return (
                <g key={k}>
                  <line
                    x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                    stroke={hot ? 'var(--copper-200)' : 'var(--copper-500)'}
                    strokeWidth={hot ? 1.6 : 1.2}
                    strokeLinecap="round"
                    markerEnd={`url(#${hot ? 'd2net-arrow-hot' : 'd2net-arrow'})`}
                    style={{
                      opacity: showFeederArrows ? 1 : 0,
                      transition: 'opacity 0.5s var(--ease), stroke 0.2s var(--ease), stroke-width 0.2s var(--ease)',
                    }}
                  />
                  {showFeederArrows && (
                    <circle r="3" fill="var(--copper-100)" style={{ filter: 'drop-shadow(0 0 6px var(--copper-300))' }}>
                      <animateMotion
                        dur={`${1.6 + (i % 2) * 0.2}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                        path={`M ${seg.x1} ${seg.y1} L ${seg.x2} ${seg.y2}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* IPA → AGENTIC — DASHED line (per spec) with continuing motion pulse */}
            <g>
              <line
                x1={segAgentic.x1} y1={segAgentic.y1} x2={segAgentic.x2} y2={segAgentic.y2}
                stroke={agenticHot ? 'var(--copper-200)' : 'var(--copper-300)'}
                strokeWidth={agenticHot ? 1.8 : 1.4}
                strokeLinecap="round"
                strokeDasharray="6 5"
                markerEnd={`url(#${agenticHot ? 'd2net-arrow-hot' : 'd2net-arrow'})`}
                style={{
                  opacity: showAgenticArrow ? 1 : 0,
                  transition: 'opacity 0.5s var(--ease), stroke 0.2s var(--ease), stroke-width 0.2s var(--ease)',
                }}
              />
              {showAgenticArrow && (
                <circle r="3.5" fill="var(--copper-100)" style={{ filter: 'drop-shadow(0 0 8px var(--copper-200))' }}>
                  <animateMotion
                    dur="1.4s"
                    repeatCount="indefinite"
                    path={`M ${segAgentic.x1} ${segAgentic.y1} L ${segAgentic.x2} ${segAgentic.y2}`}
                  />
                </circle>
              )}
            </g>
          </svg>

          {/* Satellites — share the canvas coordinate system */}
          <D2Satellite data={cardByKey.bpm}     x={D2_NET.bpm.x}     y={D2_NET.bpm.y}     visible={showBPM}     active={hovered === 'bpm'}     accentVar={`--${cardByKey.bpm.copper}`} />
          <D2Satellite data={cardByKey.rpa}     x={D2_NET.rpa.x}     y={D2_NET.rpa.y}     visible={showRPA}     active={hovered === 'rpa'}     accentVar={`--${cardByKey.rpa.copper}`} />
          <D2Satellite data={cardByKey.ai}      x={D2_NET.ai.x}      y={D2_NET.ai.y}      visible={showAI}      active={hovered === 'ai'}      accentVar={`--${cardByKey.ai.copper}`} />
          <D2Satellite data={cardByKey.ipa}     x={D2_NET.ipa.x}     y={D2_NET.ipa.y}     visible={showIPA}     active={hovered === 'ipa'}     accentVar={`--${cardByKey.ipa.copper}`} />
          <D2Satellite data={cardByKey.agentic} x={D2_NET.agentic.x} y={D2_NET.agentic.y} visible={showAgentic} active={hovered === 'agentic'} accentVar={`--${cardByKey.agentic.copper}`} />
        </div>
      </div>
    </div>
  );
}

function SlideD2({ step }) {
  const [hovered, setHovered] = useState(null);
  const showNetwork = step >= 1;
  const showSummary = step >= 2;

  const hoverData = hovered ? D2.cards.find((c) => c.key === hovered) : null;

  return (
    <>
      <FigLabel num="2" kind="THE CONVERGENCE" />
      <Headline className="small">
        <KW text={D2.headline} keywords={D2.headlineKw} />
      </Headline>

      {/* Body — fixed height across all steps so left cards never shrink */}
      <div style={{
        position: 'absolute', left: 48, right: 48, top: 156, bottom: 80,
        display: 'flex', gap: 28,
      }}>
        {/* LEFT — vertical card list (always visible, full height) */}
        <div style={{ flex: '0 0 360px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase', marginBottom: 4 }}>
            Five disciplines
          </div>
          <CopperRule on width="40%" />
          <div style={{ height: 6 }} />
          {D2.cards.map((card, i) => (
            <D2ListCard key={card.key} data={card} hovered={hovered} onHover={setHovered} delay={i * 90} />
          ))}
        </div>

        {/* RIGHT — detail panel (step 0, blank-by-default) OR network (step 1+) + summary band (step 2) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
          {/* Detail panel — step 0 only. Returns null when nothing hovered, so right side is blank. */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: showNetwork ? 0 : 1,
            transform: showNetwork ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'opacity 0.4s var(--ease), transform 0.4s var(--ease)',
            display: 'flex',
            pointerEvents: showNetwork ? 'none' : 'auto',
          }}>
            <D2DetailPanel data={hoverData} />
          </div>

          {/* Network + step-2 summary — step 1+ */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: showNetwork ? 1 : 0,
            transition: 'opacity 0.5s var(--ease) 0.15s',
            pointerEvents: showNetwork ? 'auto' : 'none',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <D2Network on={showNetwork} hovered={hovered} />
            </div>
            {/* Summary slot — height ALWAYS reserved so the illustration above stays
                vertically anchored across step 1 and step 2 (no shift on reveal). */}
            <div style={{
              flex: '0 0 80px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              opacity: showSummary ? 1 : 0,
              transform: showSummary ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.5s var(--ease) 0.1s, transform 0.5s var(--ease) 0.1s',
            }}>
              <p style={{ fontFamily: 'var(--display)', fontSize: 22, fontStyle: 'italic', color: 'var(--copper-200)', margin: 0, lineHeight: 1.3 }}>
                <KW text={D2.summary} keywords={D2.summaryKw} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────
// SLIDE D3 — ONE PROCESS · FOUR LEVELS
// Each step focuses on one level (column highlights and slides into focus).
// Step 4 = capstone with all four side-by-side + shared outcome.
// Each card carries an always-looping motion glyph between DO and OUTCOME:
//   BPM     — 20 fine steps compress into 8 (consolidation)
//   RPA     — 6 hr manual fill vs 30 min bot fill (acceleration)
//   IPA     — 4 AI strengths converge into one insight pulse (synthesis)
//   AGENTIC — agent radiates pulse rings + orbital satellites (autonomy)
// ──────────────────────────────────────────────────────────

// All animations share a fixed-height shell (.d3-anim, 86px tall) with a
// 12px top-padding so the first motion element sits at the same y-offset
// across all four cards. The caption auto-anchors to the bottom.

// — BPM: compression motion (20 steps → 8). Pure CSS keyframe loop.
function D3BpmAnim({ copper }) {
  return (
    <div className="d3-anim" style={{ '--accent': `var(--${copper})` }}>
      <div className="d3-bpm-row top">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="d3-bpm-block top" style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
      <div className="d3-bpm-row bottom">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="d3-bpm-block bottom" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
      <div className="d3-anim-caption">20 → 8 STEPS</div>
    </div>
  );
}

// — RPA: 6 hrs manual vs 30 min bot. Two stacked fills on equal-width tracks.
// Time delta lives in the caption so the row layout stays clean.
function D3RpaAnim({ copper }) {
  return (
    <div className="d3-anim" style={{ '--accent': `var(--${copper})` }}>
      <div className="d3-rpa-row">
        <span className="d3-rpa-tag">Manual</span>
        <div className="d3-rpa-track"><div className="d3-rpa-fill manual" /></div>
      </div>
      <div className="d3-rpa-row">
        <span className="d3-rpa-tag">Bot</span>
        <div className="d3-rpa-track"><div className="d3-rpa-fill bot" /></div>
      </div>
      <div className="d3-anim-caption">6 HR → 30 MIN</div>
    </div>
  );
}

// — IPA: 4 source dots (the AI strengths) emit particles that converge into
// a pulsing insight node on the right. SVG SMIL handles the loop natively.
// viewBox 180×60 keeps the SVG visually flush with the BPM/RPA rows above.
function D3IpaAnim({ copper }) {
  const accent = `var(--${copper})`;
  const sources = [
    { y: 6  },
    { y: 22 },
    { y: 38 },
    { y: 54 },
  ];
  const target = { x: 158, y: 30 };
  return (
    <div className="d3-anim">
      <svg width="180" height="60" viewBox="0 0 180 60" style={{ overflow: 'visible' }}>
        <defs>
          {sources.map((s, i) => (
            <path key={i} id={`d3-ipa-path-${i}`} d={`M 22 ${s.y} L ${target.x} ${target.y}`} />
          ))}
          <radialGradient id="d3-ipa-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={accent} stopOpacity="0.7" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint connector lines (always visible) */}
        {sources.map((s, i) => (
          <line key={`l-${i}`} x1="22" y1={s.y} x2={target.x} y2={target.y}
            stroke="var(--copper-800)" strokeWidth="0.8" strokeDasharray="2 3" />
        ))}

        {/* Source dots */}
        {sources.map((s, i) => (
          <circle key={`s-${i}`} cx="22" cy={s.y} r="2.6" fill={accent} opacity="0.85" />
        ))}

        {/* Particles flowing along each path, staggered */}
        {sources.map((_, i) => (
          <circle key={`p-${i}`} r="2.2" fill="var(--copper-100)" style={{ filter: `drop-shadow(0 0 4px ${accent})` }}>
            <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${i * 0.18}s`}>
              <mpath href={`#d3-ipa-path-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* Target glow halo */}
        <circle cx={target.x} cy={target.y} r="13" fill="url(#d3-ipa-glow)">
          <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
        </circle>
        {/* Target core */}
        <circle cx={target.x} cy={target.y} r="4.5" fill={accent}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="d3-anim-caption">4 → 1 INSIGHT</div>
    </div>
  );
}

// — AGENTIC: a center "agent" core radiating pulse rings, with three
// satellites orbiting and a soft scanning ring. Modern, alive, looped.
// viewBox 180×60 matches IPA's footprint.
function D3AgenticAnim({ copper }) {
  const accent = `var(--${copper})`;
  return (
    <div className="d3-anim">
      <svg width="180" height="60" viewBox="0 0 180 60" style={{ overflow: 'visible' }}>
        {/* Staggered double pulse — 'monitoring' feeling */}
        <circle cx="90" cy="30" r="6" fill="none" stroke={accent} strokeWidth="1">
          <animate attributeName="r" values="6;26" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="90" cy="30" r="6" fill="none" stroke={accent} strokeWidth="1">
          <animate attributeName="r" values="6;26" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Static dashed orbit ring */}
        <circle cx="90" cy="30" r="20" fill="none" stroke="var(--copper-700)" strokeWidth="0.8" strokeDasharray="2 4" />

        {/* Three orbital satellites — group rotates around (90, 30) */}
        <g>
          <circle cx="110" cy="30" r="2"   fill="var(--copper-200)" />
          <circle cx="80"  cy="47" r="2"   fill="var(--copper-200)" />
          <circle cx="80"  cy="13" r="2"   fill="var(--copper-200)" />
          <animateTransform attributeName="transform" type="rotate"
            from="0 90 30" to="360 90 30" dur="7s" repeatCount="indefinite" />
        </g>

        {/* Goal ping — small chevron above the core flashing every cycle */}
        <g>
          <path d="M 86 6 L 90 2 L 94 6" fill="none" stroke="var(--copper-300)" strokeWidth="1" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur="2.4s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Central core — pulsing brightness */}
        <circle cx="90" cy="30" r="4.5" fill={accent}>
          <animate attributeName="opacity" values="0.55;1;0.55" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="90" cy="30" r="1.8" fill="var(--neutral-50)">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="d3-anim-caption">GOAL · MONITOR · ACT</div>
    </div>
  );
}

// Map: which animation belongs to which level key.
function D3LevelAnim({ levelKey, copper }) {
  if (levelKey === 'bpm')     return <D3BpmAnim copper={copper} />;
  if (levelKey === 'rpa')     return <D3RpaAnim copper={copper} />;
  if (levelKey === 'ipa')     return <D3IpaAnim copper={copper} />;
  if (levelKey === 'agentic') return <D3AgenticAnim copper={copper} />;
  return null;
}

function SlideD3({ step }) {
  const showCap = step >= 4;
  // Hover only takes over once the auto-focus walk has finished (step >= 4).
  // Until then, the focused card is driven by the step pointer.
  const [hovered, setHovered] = useState(null);
  const canHover = step >= 4;

  return (
    <>
      <FigLabel num="3" kind="ONE PROCESS · FOUR LEVELS" />
      <Headline className="small">
        <KW text={D3.headline} keywords={D3.headlineKw} />
      </Headline>

      <div style={{ position: 'absolute', left: 48, right: 48, top: 152, bottom: 56, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Reveal on style={{ marginTop: 4 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>
            <KW text={D3.sub} keywords={D3.subKw} />
          </span>
        </Reveal>

        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          minHeight: 0,
        }}>
          {D3.levels.map((lv, i) => {
            const focused = step === i;
            const isHovered = canHover && hovered === lv.key;
            const highlight = focused || isHovered;
            const revealed = step >= i;
            const accent = `var(--${lv.copper})`;
            return (
              <div key={lv.key}
                onMouseEnter={canHover ? () => setHovered(lv.key) : undefined}
                onMouseLeave={canHover ? () => setHovered((h) => (h === lv.key ? null : h)) : undefined}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 8,
                  padding: '16px 16px',
                  border: '1px solid',
                  borderColor: highlight ? 'var(--copper-200)' : revealed ? accent : 'var(--copper-800)',
                  background: highlight ? 'rgba(184,110,61,0.10)' : revealed ? 'rgba(10,10,10,0.7)' : 'rgba(10,10,10,0.35)',
                  boxShadow: highlight ? `0 0 0 1px ${accent} inset, 0 0 30px -8px ${accent}` : 'none',
                  opacity: revealed ? 1 : 0.35,
                  transform: highlight ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'opacity 0.5s var(--ease), transform 0.3s var(--ease), background 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease)',
                  cursor: canHover ? 'default' : 'default',
                  position: 'relative',
                  minHeight: 0,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: highlight ? 'var(--copper-200)' : accent, textTransform: 'uppercase' }}>Level {i + 1}</span>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 26, color: 'var(--neutral-50)', lineHeight: 1 }}>{lv.label}</span>
                </div>
                <div style={{ height: 1, background: highlight ? 'var(--copper-200)' : 'var(--copper-800)', transition: 'background 0.3s var(--ease)' }} />

                {/* ASK — single line */}
                <Reveal on={revealed} delay={focused ? 150 : 0}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', color: 'var(--copper-500)', textTransform: 'uppercase', marginBottom: 3 }}>Ask</div>
                  <p style={{ fontFamily: 'var(--display)', fontSize: 19, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.15, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <KW text={lv.ask} keywords={lv.askKw} />
                  </p>
                </Reveal>

                {/* DO — bullet list, one line per bullet */}
                <Reveal on={revealed} delay={focused ? 280 : 0}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', color: 'var(--copper-500)', textTransform: 'uppercase', marginTop: 2, marginBottom: 4 }}>Do</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {lv.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--neutral-200)', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ flex: '0 0 auto', width: 4, height: 4, background: accent, transform: 'translateY(-1px)' }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <KW text={b.text} keywords={b.kw} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* MOTION GLYPH — always looping, identifies the level visually */}
                <Reveal on={revealed} delay={focused ? 360 : 0} style={{ marginTop: 4 }}>
                  <D3LevelAnim levelKey={lv.key} copper={lv.copper} />
                </Reveal>

                {/* OUTCOME — anchored to the bottom of the card */}
                <div style={{ flex: 1 }} />
                <Reveal on={revealed} delay={focused ? 480 : 0}>
                  <div style={{ borderTop: `1px solid ${highlight ? 'var(--copper-300)' : 'var(--copper-800)'}`, paddingTop: 8, marginTop: 2, transition: 'border-color 0.3s var(--ease)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', color: 'var(--copper-500)', textTransform: 'uppercase', marginBottom: 4 }}>Outcome</div>
                    <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: highlight ? 'var(--copper-200)' : 'var(--neutral-200)', margin: 0, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.3s var(--ease)' }}>
                      <KW text={lv.outcome} keywords={lv.outcomeKw} />
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Capstone — left-aligned, D4 footer style: serif italic, copper-200,
            with KW highlighting "80%" and "risks" via the standard em.kw rule. */}
        <div style={{ minHeight: 22 }}>
          <Reveal on={showCap}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--copper-200)', margin: 0, textAlign: 'left', lineHeight: 1.3 }}>
              <KW text={D3.capstone} keywords={D3.capstoneKw} />
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { SlideD1, SlideD2, SlideD3 });

// ──────────────────────────────────────────────────────────
// SLIDE D4 — DECISION PATTERN (the ladder)
// 6 steps: 0..4 progressively reveal rungs 1..5 + spine; step 5 reveals footer.
// Geometry: vertical spine on the left, branch lines to YES/NO terminals.
// Hover any terminal to highlight which path leads there.
// ──────────────────────────────────────────────────────────

function SlideD4({ step }) {
  const revealed = Math.min(step + 1, 5); // 1..5, capped
  const showFooter = step >= 5;
  const [hover, setHover] = useState(null); // terminal abbrev hovered
  const [circleHover, setCircleHover] = useState(null); // 1..5
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <FigLabel num="4" kind="WHICH LEVEL · WHEN" />
      <Headline className="small">
        <KW text={D4.headline} keywords={D4.headlineKw} />
      </Headline>

      <div style={{ position: 'absolute', left: 48, right: 48, top: 156, bottom: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>

        <div style={{ flex: 1, display: 'flex', gap: 24, minHeight: 0 }}>

          {/* LEFT — ladder */}
          <div style={{ flex: '0 0 700px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Reveal on>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase', marginBottom: 4 }}>
                Decision tree
              </div>
              <CopperRule on width="40%" />
              <div style={{ height: 6 }} />
            </Reveal>

            <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
              <div style={{
                position: 'absolute',
                left: 18,
                top: '10%', bottom: '10%',
                width: 2,
                background: 'linear-gradient(180deg, var(--copper-300), var(--copper-700))',
                zIndex: 0,
                transform: `scaleY(${(revealed - 1) / 4})`,
                transformOrigin: 'top',
                transition: 'transform 0.6s var(--ease)',
              }} />

              <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateRows: 'repeat(5, 1fr)' }}>
                {D4.questions.map((q, i) => {
                  const on = mounted && i < revealed;
                  const yesT = q.yesTerminal;
                  const noT  = q.noTerminal;
                  const yesActive = hover && yesT && hover === yesT;
                  const noActive  = hover && noT && hover === noT;
                  const cHover = circleHover === q.num;
                  return (
                    <div key={q.num} style={{
                      position: 'relative',
                      zIndex: 2,
                      opacity: on ? 1 : 0,
                      transform: on ? 'translateY(0)' : 'translateY(10px)',
                      transition: `opacity 0.5s var(--ease) ${i * 110}ms, transform 0.5s var(--ease) ${i * 110}ms`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                    }}>
                      <div
                        onMouseEnter={() => setCircleHover(q.num)}
                        onMouseLeave={() => setCircleHover(null)}
                        style={{
                          flex: '0 0 32px',
                          width: 32, height: 32, borderRadius: '50%',
                          border: `1px solid ${cHover ? 'var(--copper-100)' : 'var(--copper-300)'}`,
                          background: 'var(--neutral-900)',
                          backgroundImage: cHover
                            ? 'linear-gradient(rgba(184,110,61,0.35), rgba(184,110,61,0.35))'
                            : 'linear-gradient(rgba(184,110,61,0.18), rgba(184,110,61,0.18))',
                          boxShadow: cHover ? '0 0 0 1px var(--copper-200) inset' : 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--mono)', fontSize: 13,
                          color: cHover ? 'var(--copper-50)' : 'var(--copper-100)',
                          marginLeft: 2,
                          cursor: 'default',
                          transition: 'border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease), color 0.2s var(--ease)',
                        }}>{q.num}</div>

                      <div style={{ flex: '0 0 360px' }}>
                        <p style={{ fontFamily: 'var(--display)', fontSize: 19, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.2 }}>
                          <KW text={q.q} keywords={q.kw} />
                        </p>
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 12, borderLeft: '1px dashed var(--copper-800)' }}>
                        <div style={{
                          display: 'flex', alignItems: 'baseline', gap: 8,
                          color: yesActive ? 'var(--copper-100)' : (yesT ? 'var(--copper-200)' : 'var(--neutral-400)'),
                          transition: 'color 0.2s var(--ease)',
                        }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', color: yesActive ? 'var(--copper-100)' : 'var(--copper-300)' }}>YES →</span>
                          <span style={{ fontFamily: yesT ? 'var(--display)' : 'var(--serif)', fontStyle: yesT ? 'normal' : 'italic', fontSize: yesT ? 16 : 13 }}>{q.yes}</span>
                        </div>
                        <div style={{
                          display: 'flex', alignItems: 'baseline', gap: 8,
                          color: noActive ? 'var(--copper-100)' : (noT ? 'var(--copper-300)' : 'var(--neutral-500)'),
                          transition: 'color 0.2s var(--ease)',
                        }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', color: noActive ? 'var(--copper-100)' : 'var(--copper-500)' }}>NO  →</span>
                          <span style={{ fontFamily: noT ? 'var(--display)' : 'var(--serif)', fontStyle: noT ? 'normal' : 'italic', fontSize: noT ? 16 : 13 }}>{q.no}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — terminal cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
            <Reveal on>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase', marginBottom: 4 }}>
                Outcomes
              </div>
              <CopperRule on width="40%" />
              <div style={{ height: 6 }} />
            </Reveal>

            <div style={{ flex: 1, display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', minHeight: 0 }}>
              {Object.entries(D4.terminals).map(([abbrev, t], i) => {
                const fromYes = D4.questions.find((q) => q.yesTerminal === abbrev);
                const fromNo  = D4.questions.find((q) => q.noTerminal  === abbrev);
                const fromQ = fromYes || fromNo;
                const branch = fromYes ? 'YES' : 'NO';
                const stepReveal = fromQ ? fromQ.num : 1;
                const on = revealed >= stepReveal;
                const isHover = hover === abbrev;
                return (
                  <div key={abbrev} style={{ display: 'flex', alignItems: 'center', minHeight: 0 }}>
                    <div
                      onMouseEnter={() => setHover(abbrev)}
                      onMouseLeave={() => setHover(null)}
                      style={{
                        display: 'flex', alignItems: 'baseline', gap: 12,
                        width: '100%',
                        padding: '10px 14px',
                        border: `1px solid ${isHover ? 'var(--copper-200)' : `var(--${t.copper})`}`,
                        background: isHover ? 'rgba(184,110,61,0.10)' : 'rgba(10,10,10,0.7)',
                        boxShadow: isHover ? `0 0 0 1px var(--${t.copper}) inset` : 'none',
                        opacity: on ? 1 : 0.25,
                        transition: 'opacity 0.4s var(--ease), border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease)',
                        cursor: 'default',
                      }}>
                      <div style={{ flex: '0 0 112px' }}>
                        <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--neutral-50)', lineHeight: 1 }}>{abbrev}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--copper-500)', textTransform: 'uppercase', marginTop: 3, whiteSpace: 'nowrap' }}>Q{fromQ ? fromQ.num : '–'} · {branch}</div>
                      </div>
                      <p style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--neutral-300)', margin: 0, lineHeight: 1.4 }}>
                        {t.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 700px' }}>
            <Reveal on={showFooter}>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--copper-200)', margin: 0 }}>
                <KW text={D4.footer} keywords={D4.footerKw} />
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────
// SLIDE D5 — BRIDGE TO E
// 3 steps. Two big lines + a bridge cue. Bottom-left aligned.
// Subtle horizon glow rises behind the type as steps reveal.
// ──────────────────────────────────────────────────────────

function SlideD5({ step }) {
  const showA = step >= 0;
  const showB = step >= 1;
  const showC = step >= 2;
  return (
    <>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(assets/d5-bridge.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top right, rgba(10,10,10,0.92), rgba(10,10,10,0.55))',
        zIndex: 0,
      }} />

      <FigLabel num="5" kind="THE NEXT QUESTION" />

      {/* Horizon glow */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%',
        background: 'radial-gradient(ellipse at 30% 110%, rgba(184,110,61,0.45), rgba(10,10,10,0) 60%)',
        opacity: showA ? 1 : 0,
        transition: 'opacity 1.2s var(--ease)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--copper-500), transparent)',
        opacity: showB ? 1 : 0,
        transition: 'opacity 1s var(--ease) 200ms',
      }} />

      {/* Stack */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 130, bottom: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 22 }}>
        <Reveal on={showA}>
          <p style={{ fontFamily: 'var(--display)', fontSize: 72, color: 'var(--neutral-50)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
            <KW text={D5.beat1.text} keywords={D5.beat1.kw} />
          </p>
        </Reveal>
        <Reveal on={showB} delay={150}>
          <p style={{ fontFamily: 'var(--display)', fontSize: 56, color: 'var(--copper-200)', margin: 0, lineHeight: 1.08, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
            <KW text={D5.beat2.text} keywords={D5.beat2.kw} />
          </p>
        </Reveal>

        <Reveal on={showC} delay={150}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 8, paddingLeft: 18, borderLeft: '2px solid var(--copper-500)', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, color: 'var(--neutral-300)', margin: 0, lineHeight: 1.4 }}>
              <KW text={D5.bridge.text} keywords={D5.bridge.kw} />
            </p>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{D5.attr}</span>
          </div>
        </Reveal>
      </div>
    </>
  );
}

Object.assign(window, { SlideD4, SlideD5 });
