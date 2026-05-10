/* global window, React, E5, E6, E7, E8, FigLabel, Headline, KW, Reveal, CopperRule, LucideIcon, insetLine */
const { useState: useStateB, useEffect: useEffectB, useMemo: useMemoB } = React;

// ────────────────────── SLIDE E5 ──────────────────────
function SlideE5({ step }) {
  const showBP = step >= 0;
  const showCM = step >= 1;
  const showWall = step >= 2;
  const showClosing = step >= 3;
  return (
    <>
      <FigLabel num="5" kind="LIMITS OF PROMPTING" />
      <Headline className="small">
        <KW text={E5.headline} keywords={E5.headlineKw} />
      </Headline>

      <div style={{ position: 'absolute', left: 48, right: 48, top: 170, bottom: 80, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Reveal on={showBP}>
            <div className="card e5-card" style={{ borderColor: 'var(--copper-300)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase', marginBottom: 10 }}>Best Practices</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {E5.bp.map((b, i) => (
                  <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--neutral-100)' }}>
                    <span style={{ width: 8, height: 8, background: 'var(--copper-300)', flexShrink: 0, transform: 'translateY(-1px)' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal on={showCM} delay={120}>
            <div className="card e5-card" style={{ borderColor: 'var(--copper-700)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-500)', textTransform: 'uppercase', marginBottom: 10 }}>Common Mistakes</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {E5.cm.map((b) => (
                  <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--neutral-300)' }}>
                    <span style={{ width: 8, height: 8, background: 'var(--copper-700)', flexShrink: 0, transform: 'translateY(-1px)' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal on={showWall} delay={150} style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <div style={{ borderTop: '1px solid var(--copper-700)', paddingTop: 18, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.22em', color: 'var(--copper-200)', textTransform: 'uppercase' }}>Where prompt ends</span>
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--neutral-300)' }}>
                <KW text={E5.wallSub} keywords={E5.wallSubKw} />
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, flex: 1, minHeight: 0 }}>
              {E5.constraints.map((c, i) => (
                <div key={c} className="e5-constraint" style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--neutral-200)', padding: '14px 16px', border: '1px solid var(--copper-800)', background: 'rgba(10,10,10,0.5)', lineHeight: 1.35 }}>
                  <span className="e5-constraint-num" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--copper-500)', minWidth: 18 }}>0{i + 1}</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal on={showClosing}>
          <p style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22, color: 'var(--copper-200)', margin: 0 }}>
            <KW text={E5.closing} keywords={E5.closingKw} />
          </p>
        </Reveal>
      </div>
    </>
  );
}

// ────────── shared NodeNetwork (used in E6, E8, E9) ──────────
// Hub + satellites with connectors that ALWAYS terminate at box edges (no overlap).
const SAT_W = 120, SAT_H = 50, HUB_R = 45;
function NodeNetwork({ satellites, hubLabel = 'CONTEXT', hubX, hubY, radius = 170, revealedCount = 6, compressed = false, activeSatId = null }) {
  // Compute satellite positions on circle around hub
  const N = satellites.length;
  const positions = satellites.map((s, i) => {
    const theta = (i * 2 * Math.PI) / N - Math.PI / 2;
    return { ...s, x: hubX + Math.cos(theta) * radius, y: hubY + Math.sin(theta) * radius };
  });
  const lineEnd = (p) => {
    // Stop the line at the edge of the satellite box (rectangle).
    const seg = insetLine(hubX, hubY, p.x, p.y, HUB_R + 4, 0);
    // Then trim end by half-min of box dims along direction
    const dx = p.x - hubX, dy = p.y - hubY;
    const angle = Math.atan2(dy, dx);
    const halfW = SAT_W / 2, halfH = SAT_H / 2;
    // box edge from satellite center toward hub
    const cosA = Math.cos(angle + Math.PI), sinA = Math.sin(angle + Math.PI);
    const tx = halfW / Math.abs(cosA || 0.0001);
    const ty = halfH / Math.abs(sinA || 0.0001);
    const t = Math.min(tx, ty);
    const ex = p.x + cosA * t;
    const ey = p.y + sinA * t;
    return { x1: seg.x1, y1: seg.y1, x2: ex, y2: ey };
  };
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Connector layer (rendered first, BENEATH boxes) */}
      <svg className="svg-layer" style={{ pointerEvents: 'none' }}>
        {positions.map((p, i) => {
          const visible = i < revealedCount;
          const seg = lineEnd(p);
          const isActive = activeSatId === p.id;
          return (
            <line key={p.id}
              x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
              stroke={isActive ? 'var(--copper-300)' : 'var(--copper-700)'}
              strokeWidth={isActive ? 1.5 : 1}
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s var(--ease) ${i * 0.08}s, stroke 0.25s var(--ease)`,
              }}
            />
          );
        })}
      </svg>

      {/* Hub */}
      <div className="hub" style={{ left: hubX, top: hubY }}>{hubLabel}</div>

      {/* Satellites — paint OVER lines */}
      {positions.map((p, i) => {
        const visible = i < revealedCount;
        const isActive = activeSatId === p.id;
        return (
          <div key={p.id}
            className={`satellite ${isActive ? 'active' : ''}`}
            style={{
              left: p.x, top: p.y, width: SAT_W, height: SAT_H,
              opacity: visible ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.85})`,
              transition: `opacity 0.4s var(--ease) ${i * 0.1}s, transform 0.4s var(--ease) ${i * 0.1}s, border-color 0.25s var(--ease), background 0.25s var(--ease)`,
            }}
          >
            <LucideIcon name={p.icon} size={18} />
            <span className="label">{p.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ────────── ContextNetwork — E6-specific (hover + flow animation) ──────────
// Wider/shorter ellipse; bigger boxes; consistent icon size; arrows point INTO
// the hub from each satellite; pulse circles travel inward along each arrow.
const E6_SAT_W = 184, E6_SAT_H = 88, E6_HUB_R = 60;
const E6_REVEAL_DELAY_MS = 200;          // gap between satellite reveals
const E6_REVEAL_START_MS = 280;          // wait after hub before first sat
function ContextNetwork({ satellites, hubX, hubY, rx, ry, isOn, onHover, hoverId }) {
  const [phase, setPhase] = useStateB('idle'); // 'idle' | 'hub' | 'reveal' | 'flow'
  useEffectB(() => {
    if (!isOn) { setPhase('idle'); return; }
    const t1 = setTimeout(() => setPhase('hub'), 50);
    const t2 = setTimeout(() => setPhase('reveal'), 50 + 320);
    const flowAt = 50 + 320 + E6_REVEAL_START_MS + satellites.length * E6_REVEAL_DELAY_MS + 350;
    const t3 = setTimeout(() => setPhase('flow'), flowAt);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isOn, satellites.length]);

  const N = satellites.length;
  // Elliptical positions — wider than tall.
  const positions = satellites.map((s, i) => {
    const theta = (i * 2 * Math.PI) / N - Math.PI / 2;
    return { ...s, x: hubX + Math.cos(theta) * rx, y: hubY + Math.sin(theta) * ry, theta };
  });
  // Arrow geometry: x1,y1 = satellite edge (toward hub); x2,y2 = hub edge (toward sat).
  const arrowSeg = (p) => {
    const dx = hubX - p.x, dy = hubY - p.y;
    const angle = Math.atan2(dy, dx);
    // Start: satellite box edge along the angle FROM sat TO hub.
    const halfW = E6_SAT_W / 2, halfH = E6_SAT_H / 2;
    const cosA = Math.cos(angle), sinA = Math.sin(angle);
    const tx = halfW / Math.abs(cosA || 0.0001);
    const ty = halfH / Math.abs(sinA || 0.0001);
    const tBox = Math.min(tx, ty) + 4;
    const x1 = p.x + cosA * tBox;
    const y1 = p.y + sinA * tBox;
    // End: hub circle edge along the angle FROM hub TO sat (subtract for inward arrow tip).
    const tHub = E6_HUB_R + 4;
    const x2 = hubX - cosA * tHub;
    const y2 = hubY - sinA * tHub;
    return { x1, y1, x2, y2 };
  };

  const hubVisible = phase !== 'idle';
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg className="svg-layer">
        <defs>
          <marker id="e6-arrow-base" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#c98a64" />
          </marker>
          <marker id="e6-arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#e8b893" />
          </marker>
        </defs>
        {positions.map((p, i) => {
          const seg = arrowSeg(p);
          const visible = phase === 'reveal' || phase === 'flow';
          const isActive = hoverId === p.id;
          const flowing = phase === 'flow';
          const delay = E6_REVEAL_START_MS + i * E6_REVEAL_DELAY_MS;
          return (
            <g key={p.id}>
              {/* Static arrow from satellite → hub */}
              <line
                x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                stroke={isActive ? '#e8b893' : '#c98a64'}
                strokeWidth={isActive ? 2.4 : 1.8}
                strokeLinecap="round"
                markerEnd={`url(#${isActive ? 'e6-arrow-active' : 'e6-arrow-base'})`}
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.55s var(--ease) ${delay}ms, stroke 0.25s var(--ease), stroke-width 0.25s var(--ease)`,
                }}
              />
              {/* Pulse traveling along the arrow from sat → hub during flow */}
              {flowing && (
                <circle r={isActive ? 4.5 : 3.6} fill={isActive ? '#fff1e3' : '#e8b893'}
                  style={{ filter: 'drop-shadow(0 0 6px #c98a64)' }}>
                  <animateMotion
                    dur={`${1.6 + (i % 2) * 0.2}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.18}s`}
                    path={`M ${seg.x1} ${seg.y1} L ${seg.x2} ${seg.y2}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Hub */}
      <div className="hub e6-hub" style={{
        left: hubX, top: hubY, width: E6_HUB_R * 2, height: E6_HUB_R * 2,
        opacity: hubVisible ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${hubVisible ? 1 : 0.7})`,
        transition: 'opacity 0.45s var(--ease), transform 0.45s var(--ease)',
      }}>CONTEXT</div>

      {/* Satellites */}
      {positions.map((p, i) => {
        const visible = phase === 'reveal' || phase === 'flow';
        const isActive = hoverId === p.id;
        const delay = E6_REVEAL_START_MS + i * E6_REVEAL_DELAY_MS;
        return (
          <div key={p.id}
            className={`satellite e6-sat ${isActive ? 'active' : ''}`}
            onMouseEnter={() => onHover && onHover(p.id)}
            onMouseLeave={() => onHover && onHover(null)}
            style={{
              left: p.x, top: p.y, width: E6_SAT_W, height: E6_SAT_H,
              opacity: visible ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.85})`,
              transition: `opacity 0.45s var(--ease) ${delay}ms, transform 0.45s var(--ease) ${delay}ms, border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease)`,
              cursor: 'pointer',
            }}
          >
            <span className="e6-sat-icon-wrap"><LucideIcon name={p.icon} size={28} /></span>
            <span className="label">{p.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ────────────────────── SLIDE E6 ──────────────────────
// Step 0 — left panel (What & Why) reveals.
// Step 1 — right illustration reveals: hub first, then 6 satellites + lines
//          clockwise from User Prompt, then continuous flow on the lines.
// Step 2 — bottom: "next slide" pointer to the 4 strategies.
// Hover any satellite → its details replace the blank space below the WHY copy
//                       on the left, and that satellite highlights.
function SlideE6({ step }) {
  const showLeft = step >= 0;
  const showNetwork = step >= 1;
  const showNext = step >= 2;
  const [hoverId, setHoverId] = useStateB(null);
  const hovered = hoverId ? E6.satellites.find((s) => s.id === hoverId) : null;

  return (
    <>
      <FigLabel num="6" kind="LAYER 2 · CONTEXT" />
      <Headline className="small">
        <KW text={E6.headline} keywords={E6.headlineKw} />
      </Headline>

      {/* LEFT panel — What & Why + hover details surface + next-slide pointer */}
      <div style={{ position: 'absolute', left: 48, top: 170, width: 410, bottom: 80, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Reveal on={showLeft}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>{E6.sub}</span>
        </Reveal>
        <CopperRule on={showLeft} width="40%" delay={120} />
        <Reveal on={showLeft} delay={220}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.45 }}>
            <KW text={E6.definition} keywords={E6.definitionKw} />
          </p>
        </Reveal>
        <div style={{ height: 4 }} />
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {E6.whyPoints.map((b, i) => (
            <Reveal key={i} on={showLeft} delay={350 + i * 130}>
              <li style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--neutral-300)', lineHeight: 1.4 }}>
                <span style={{ width: 6, height: 6, background: 'var(--copper-400)', flexShrink: 0, transform: 'translateY(-1px)' }} />
                <span><KW text={b.text} keywords={b.kw} /></span>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* Hover details surface — BLANK unless hovering a satellite. No placeholder. */}
        <div style={{ flex: 1, position: 'relative', minHeight: 140, marginTop: 8 }}>
          <div style={{
            position: 'absolute', inset: 0,
            border: '1px solid',
            borderColor: hovered ? 'var(--copper-500)' : 'transparent',
            background: hovered ? 'rgba(184,110,61,0.06)' : 'transparent',
            padding: hovered ? '16px 18px' : 0,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.22s var(--ease), transform 0.22s var(--ease), border-color 0.22s var(--ease), background 0.22s var(--ease)',
            pointerEvents: 'none',
          }}>
            {hovered && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <LucideIcon name={hovered.icon} size={18} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.2em', color: 'var(--copper-200)', textTransform: 'uppercase' }}>{hovered.label}</span>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', color: 'var(--copper-400)', textTransform: 'uppercase' }}>{hovered.hover.kicker}</span>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.4 }}>{hovered.hover.body}</p>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--copper-200)', margin: 0, lineHeight: 1.4 }}>
                  <KW text={hovered.hover.tag} keywords={hovered.hover.tagKw} />
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Next-slide pointer — simple, like E2's bridge */}
        <Reveal on={showNext} delay={150}>
          <div style={{ borderLeft: '2px solid var(--copper-500)', paddingLeft: 14 }}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--copper-200)', margin: 0, lineHeight: 1.4 }}><KW text={E6.next} keywords={E6.nextKw} /></p>
          </div>
        </Reveal>
      </div>

      {/* RIGHT — node network with reveal + flow animation */}
      <div style={{ position: 'absolute', left: 480, right: 36, top: 168, bottom: 76, display: 'flex', flexDirection: 'column' }}>
        {/* Sub-label sits ABOVE the illustration with breathing room */}
        <Reveal on={showNetwork} style={{ flex: '0 0 auto', marginBottom: 18, textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>
            <KW text={E6.reveal} keywords={E6.revealKw} />
          </span>
        </Reveal>
        {/* Illustration: shorter height, wider — ellipse layout. */}
        <div style={{ position: 'relative', flex: '1 1 auto', minHeight: 0 }}>
          <ContextNetwork
            satellites={E6.satellites}
            hubX={382} hubY={222}
            rx={300} ry={170}
            isOn={showNetwork}
            hoverId={hoverId}
            onHover={setHoverId}
          />
        </div>
      </div>
    </>
  );
}

// ────────────────────── SLIDE E7 ──────────────────────
// 4 strategy cards in 4×1 grid below a particle-funnel animation.
// Hovering card N highlights the card AND glows ring N in the animation.
function SlideE7({ step }) {
  const [hover, setHover] = useStateB(null);
  const showFooter = step >= 5;
  return (
    <>
      <FigLabel num="7" kind="CONTEXT STRATEGIES" />
      <Headline className="small">
        <KW text={E7.headline} keywords={E7.headlineKw} />
      </Headline>

      {/* Animation band — full content width, ~230px tall */}
      <div style={{ position: 'absolute', left: 48, right: 48, top: 156, height: 230, pointerEvents: 'none' }}>
        <window.FunnelAnimation hoveredIndex={hover} />
      </div>

      {/* Card row — 4×1 grid, padded to 10% so card centers align with ring centers (0.20/0.40/0.60/0.80) */}
      <div style={{ position: 'absolute', left: 48, right: 48, top: 400, bottom: 80, padding: '0 10%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
        {E7.rings.map((r, i) => {
          const revealed = step >= i + 1;
          const isHover = hover === i;
          return (
            <Reveal key={r.id} on={revealed} delay={i * 100} style={{ display: 'flex' }}>
              <div
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover((h) => (h === i ? null : h))}
                className="e7-card"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  padding: '14px 16px',
                  background: isHover ? 'rgba(20,12,6,0.95)' : 'rgba(10,10,10,0.7)',
                  border: '1px solid',
                  borderColor: isHover ? 'var(--copper-300)' : (revealed ? `var(--${r.copper})` : 'var(--copper-800)'),
                  boxShadow: isHover ? '0 0 0 1px var(--copper-300) inset' : 'none',
                  transition: 'background 0.2s var(--ease), border-color 0.2s var(--ease), box-shadow 0.2s var(--ease)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--copper-500)' }}>0{i + 1}</span>
                  <span style={{ flex: 1, height: 1, background: isHover ? 'var(--copper-300)' : 'var(--copper-800)', transition: 'background 0.2s var(--ease)' }} />
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 14, letterSpacing: '0.22em', color: `var(--${r.copper})`, textTransform: 'uppercase' }}>{r.label}</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--neutral-200)', lineHeight: 1.35 }}>{r.sub}</span>
                <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0 0', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {r.list.map((li) => (
                    <li key={li} style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: isHover ? 'var(--copper-200)' : 'var(--copper-300)', transition: 'color 0.2s var(--ease)' }}>· {li}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal on={showFooter} style={{ position: 'absolute', left: 48, right: 48, bottom: 30 }}>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--neutral-400)', margin: 0 }}>
          <KW text={E7.footer} keywords={E7.footerKw} />
        </p>
      </Reveal>
    </>
  );
}

// ────────────────────── SLIDE E8 ──────────────────────
// 2 steps: (0) all four pitfalls + default illustration; (1) bottom summary appears.
// Right side mirrors hovered pitfall — no constant satellite network.
const PIT_DETAIL = {
  conflict:    { text: "Sources contradict. Model commits early — and can't recover.", kw: ["commits early"], mit: "Context Isolation · Versioned Context", example: "Pasting Q3 and Q4 figures into the same chat — model averages them, picks neither cleanly." },
  confusion:   { text: "Most of the context isn't what you wanted.",                   kw: ["isn't what you wanted"], mit: "Tool Loadout · Context Pruning", example: "Pasting a 50-page report 'just in case' — model misses the 3 things that mattered." },
  poisoning:   { text: "Wrong or vague info compounds silently.",                      kw: ["compounds"], mit: "Subagent Verification · Context Quarantine", example: "Pasted last quarter's budget by mistake — AI keeps using it through edits; final memo ships off by 30%." },
  distraction: { text: "Tokens compound. Performance degrades into the dumb zone.",   kw: ["dumb zone"], mit: "Summarization · Context Offloading", example: "After ~20 rounds of edits in one chat — answers start repeating, recent corrections get missed." },
};

function SlideE8({ step }) {
  const [hover, setHover] = useStateB(null);
  const showCards = step >= 0;
  const showFooter = step >= 1;
  const activeKind = hover;
  return (
    <>
      <FigLabel num="8" kind="CONTEXT · PITFALLS" />
      <Headline className="small">
        <KW text={E8.headline} keywords={E8.headlineKw} />
      </Headline>

      {/* LEFT — pitfall cards + footer */}
      <div style={{ position: 'absolute', left: 48, top: 200, width: 480, bottom: 80, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>Four pitfalls</span>
        <div style={{ marginTop: 12 }}><CopperRule on width="40%" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {E8.pitfalls.map((p, i) => (
            <Reveal key={p.id} on={showCards} delay={120 + i * 90}>
              <div onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 12px', border: `1px solid ${hover === p.id ? 'var(--copper-200)' : 'var(--copper-800)'}`, background: hover === p.id ? 'rgba(184,110,61,0.06)' : 'transparent', transition: 'all 0.2s var(--ease)' }}>
                <div style={{ marginTop: 2 }}><LucideIcon name={p.icon} size={20} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', color: 'var(--copper-100)', textTransform: 'uppercase' }}>{p.title}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--neutral-300)', marginTop: 3 }}>{p.essence}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Reveal on={showFooter}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--copper-200)', margin: 0 }}>
            <KW text={E8.footer} keywords={E8.footerKw} />
          </p>
        </Reveal>
      </div>

      {/* RIGHT — pitfall illustration + caption (matches LEFT vertical span) */}
      <div style={{ position: 'absolute', right: 48, top: 200, width: 660, bottom: 80, display: 'flex', flexDirection: 'column' }}>
        <PitfallCanvas activeKind={activeKind} />
      </div>
    </>
  );
}

function PitfallCanvas({ activeKind }) {
  if (!activeKind) return null;
  return (
    <div key={activeKind} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
        {activeKind === 'conflict'    && <ConflictAnim />}
        {activeKind === 'confusion'   && <ConfusionAnim />}
        {activeKind === 'poisoning'   && <PoisoningAnim />}
        {activeKind === 'distraction' && <DistractionAnim />}
      </div>
      <PitCaption {...PIT_DETAIL[activeKind]} />
    </div>
  );
}

const PIT_SVG_STYLE = { width: 460, height: 280 };

function ConflictAnim() {
  // Source A sits to the LEFT of the left circle (outside). Source B to the RIGHT of right circle (outside).
  // Final cx ±10, r=22 → left circle outer edge -32, right circle outer edge 32.
  // Smooth ease-out via SMIL `values` form (avoids the from/to + spline auto-start bug).
  return (
    <svg viewBox="-60 -40 120 80" style={PIT_SVG_STYLE}>
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
      <text x="40"  y="2" textAnchor="start" fill="rgb(212,153,102)" fontSize="3.6" fontFamily="var(--mono)" opacity="0">
        Source B
        <animate attributeName="opacity" values="0;1" keyTimes="0;1" begin="0.5s" dur="0.4s" fill="freeze" />
      </text>
    </svg>
  );
}

function ConfusionAnim() {
  // "Signal" above triangle. Dashed waterline separator at the apex/trapezoid join (y=-8).
  return (
    <svg viewBox="-60 -40 120 80" style={PIT_SVG_STYLE}>
      <text x="0" y="-26" textAnchor="middle" fill="rgb(229,199,159)" fontSize="3.5" fontFamily="var(--mono)" letterSpacing="0.4">Signal</text>
      <line x1="-58" y1="-8" x2="58" y2="-8" stroke="rgba(212,153,102,0.55)" strokeWidth="0.4" strokeDasharray="2 2" />
      <polygon points="-7,-8 7,-8 0,-22" fill="rgba(212,153,102,0.75)" stroke="rgb(212,153,102)" strokeWidth="0.4" />
      <polygon points="-26,-8 26,-8 14,18 -14,18" fill="rgba(124,84,56,0.5)" stroke="rgb(124,84,56)" strokeWidth="0.4">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,2.5; 0,-2.5; 0,0" keyTimes="0;0.33;0.66;1" dur="2s" repeatCount="indefinite" />
      </polygon>
      <text x="0" y="0"  textAnchor="middle" fill="rgb(180,128,86)" fontSize="3" fontFamily="var(--mono)">Irrelevant Information</text>
      <text x="0" y="6"  textAnchor="middle" fill="rgb(180,128,86)" fontSize="3" fontFamily="var(--mono)">Tool Overload</text>
      <text x="0" y="12" textAnchor="middle" fill="rgb(180,128,86)" fontSize="3" fontFamily="var(--mono)">Cognitive Overload</text>
    </svg>
  );
}

function PoisoningAnim() {
  // "Corrupted" placed UNDER the bottom box (outside, y > box bottom).
  // Bottom box: y=8, height=22 → bottom edge at y=30. Label at y=36.
  return (
    <svg viewBox="-60 -40 120 80" style={PIT_SVG_STYLE}>
      <rect x="-40" y="-30" width="80" height="22" fill="rgba(212,153,102,0.18)" stroke="rgb(212,153,102)" strokeWidth="0.4" />
      <rect x="-40" y="8"   width="80" height="22" fill="rgba(124,84,56,0.32)"  stroke="rgb(124,84,56)"   strokeWidth="0.4" />
      <text x="0" y="-32" textAnchor="middle" fill="rgb(229,199,159)" fontSize="3.4" fontFamily="var(--mono)" letterSpacing="0.4">Clean</text>
      <text x="0" y="36"  textAnchor="middle" fill="rgb(180,128,86)"  fontSize="3.4" fontFamily="var(--mono)" letterSpacing="0.4">Corrupted</text>
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} r="1.2" cx={-28 + i * 8} cy="-15" fill="rgb(229,199,159)">
          <animate attributeName="cy"   values="-15;15;15" keyTimes="0;0.7;1" dur="2.6s" begin={`${i * 0.22}s`} repeatCount="indefinite" />
          <animate attributeName="fill" values="rgb(229,199,159);rgb(168,90,60);rgb(168,90,60)" keyTimes="0;0.7;1" dur="2.6s" begin={`${i * 0.22}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function DistractionAnim() {
  // No loop. Progress bar and curved line both finish at the same time.
  // "Degraded" label appears (top-right) after they reach the end. Positioned away from the curve's end-point.
  const DUR = 2.2;
  return (
    <svg viewBox="-60 -40 120 80" style={PIT_SVG_STYLE}>
      {/* progress bar track + fill */}
      <rect x="-50" y="22" width="100" height="6" fill="rgba(212,153,102,0.15)" stroke="rgba(212,153,102,0.5)" strokeWidth="0.3" />
      <rect x="-50" y="22" height="6" fill="rgba(212,153,102,0.65)" width="0">
        <animate attributeName="width" from="0" to="100" dur={`${DUR}s`} begin="0.1s" fill="freeze" />
      </rect>
      {/* curved performance line — drawn left→right, ending at (50, 18) */}
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
      {/* DEGRADED — top-right corner so it does not overlap the curve's bottom-right end-point. */}
      <g opacity="0">
        <rect x="22" y="-30" width="32" height="9" fill="rgba(168,90,60,0.4)" stroke="rgb(168,90,60)" strokeWidth="0.3" />
        <text x="38" y="-23.5" textAnchor="middle" fill="rgb(229,199,159)" fontSize="3.6" fontFamily="var(--mono)" letterSpacing="0.5">DEGRADED</text>
        <animate attributeName="opacity" from="0" to="1" begin={`${DUR + 0.2}s`} dur="0.4s" fill="freeze" />
      </g>
    </svg>
  );
}

function PitCaption({ text, mit, kw, example }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', maxWidth: 580 }}>
      <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.4 }}>
        <KW text={text} keywords={kw} />
      </p>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--copper-300)', textTransform: 'uppercase', margin: 0 }}>Mitigated by → {mit}</p>
      {example && (
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--neutral-400)', margin: '4px 0 0', lineHeight: 1.4 }}>
          <span style={{ fontFamily: 'var(--mono)', fontStyle: 'normal', fontSize: 10, letterSpacing: '0.18em', color: 'var(--copper-500)', textTransform: 'uppercase', marginRight: 8 }}>Example</span>
          {example}
        </p>
      )}
    </div>
  );
}

Object.assign(window, { SlideE5, SlideE6, SlideE7, SlideE8, NodeNetwork });
