/* global window, React, E9, E10, E11, FigLabel, Headline, KW, Reveal, CopperRule, LucideIcon, NodeNetwork */
const { useState: useStateC } = React;

// ────────────────────── SLIDE E9 ──────────────────────
function SlideE9({ step }) {
  const showLeft = step >= 0;
  const showIncludes = step >= 1;
  const showEq = step >= 2;
  const showStanza = step >= 3;
  const showTagline = step >= 4;
  return (
    <>
      <FigLabel num="9" kind="LAYER 3 · HARNESS" />
      <Headline className="small">
        <KW text={E9.headline} keywords={E9.headlineKw} />
      </Headline>

      {/* LEFT — What & Why (mirrors E6) */}
      <div style={{ position: 'absolute', left: 48, top: 170, width: 500, bottom: 80, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Reveal on={showLeft}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>{E9.sub}</span>
        </Reveal>
        <CopperRule on={showLeft} width="40%" delay={120} />
        <Reveal on={showLeft} delay={220}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.45 }}>
            <KW text={E9.definition} keywords={E9.definitionKw} />
          </p>
        </Reveal>
        <div style={{ height: 4 }} />
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {E9.whyPoints.map((b, i) => (
            <Reveal key={i} on={showLeft} delay={350 + i * 130}>
              <li style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--neutral-300)', lineHeight: 1.4 }}>
                <span style={{ width: 6, height: 6, background: 'var(--copper-400)', flexShrink: 0, transform: 'translateY(-1px)' }} />
                <span><KW text={b.text} keywords={b.kw} /></span>
              </li>
            </Reveal>
          ))}
        </ul>

        <div style={{ flex: 1 }} />

        {/* HARNESS package — 8 components */}
        <Reveal on={showIncludes} delay={150}>
          <div style={{ border: '1px solid var(--copper-700)', padding: '14px 16px', background: 'rgba(184,110,61,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-200)', textTransform: 'uppercase' }}>{E9.includesKicker}</span>
              <span style={{ flex: 1, height: 1, background: 'var(--copper-800)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
              {E9.includes.map((item, i) => (
                <Reveal key={item} on={showIncludes} delay={250 + i * 60}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--copper-300)', padding: '5px 10px', border: '1px solid var(--copper-800)', display: 'inline-block', width: '100%' }}>{item}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* RIGHT — equation + quote + stanza + tagline */}
      <div style={{ position: 'absolute', right: 48, top: 170, width: 540, bottom: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Reveal on={showEq}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, fontFamily: 'var(--display)', fontSize: 56, color: 'var(--neutral-50)', lineHeight: 1 }}>
            <span style={{ color: 'var(--copper-300)', fontStyle: 'italic' }}>Agent</span>
            <span>=</span>
            <span>Model</span>
            <span>+</span>
            <span style={{ color: 'var(--copper-300)', fontStyle: 'italic' }}>Harness</span>
          </div>
        </Reveal>
        <CopperRule on={showEq} width="60%" delay={400} />
        <Reveal on={showEq} delay={650}>
          <div>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--neutral-200)', margin: 0, lineHeight: 1.45 }}>
              "<KW text={E9.quote} keywords={E9.quoteKw} />"
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--neutral-500)', textTransform: 'uppercase', textAlign: 'right', margin: '6px 0 0 0' }}>— Cursor engineering</p>
          </div>
        </Reveal>
        <CopperRule on={showStanza} width="40%" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {E9.stanza.map((line, i) => (
            <Reveal key={line} on={showStanza} delay={i * 200}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.4 }}>{line}</p>
            </Reveal>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Reveal on={showTagline}>
          <p style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 32, color: 'var(--copper-200)', margin: 0, lineHeight: 1.1 }}>
            Build once. Use forever.
          </p>
        </Reveal>
      </div>
    </>
  );
}

// ────────────────────── SLIDE E10 ──────────────────────
// Step 0 — all 8 practice cards reveal one-by-one (auto-stagger on mount).
// Step 1 — footer line.
function SlideE10({ step }) {
  const [mounted, setMounted] = useStateC(false);
  React.useEffect(() => {
    if (step >= 0) {
      setMounted(false);
      const t = requestAnimationFrame(() => {
        // double-rAF guarantees the browser paints the off-state first,
        // so the transition can play when we flip to on.
        requestAnimationFrame(() => setMounted(true));
      });
      return () => cancelAnimationFrame(t);
    }
    setMounted(false);
  }, [step >= 0]);
  const showCards = mounted && step >= 0;
  const showFooter = step >= 1;
  return (
    <>
      <FigLabel num="10" kind="HARNESS · PRACTICES" />
      <Headline className="small">
        <KW text={E10.headline} keywords={E10.headlineKw} />
      </Headline>

      <div style={{ position: 'absolute', left: 48, right: 48, top: 158, bottom: 60, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: '1fr 1fr', gap: 10, minHeight: 0 }}>
          {E10.practices.map((p, i) => (
            <Reveal key={p.id} on={showCards} delay={120 + i * 180} style={{ display: 'flex', minHeight: 0, minWidth: 0 }}>
              <div className="pcard" style={{ flex: 1, gap: 8, padding: '12px 14px', minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <LucideIcon name={p.icon} size={18} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.16em', color: 'var(--neutral-50)', textTransform: 'uppercase' }}>{p.name}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', color: 'var(--copper-700)', textTransform: 'uppercase' }}>0{i + 1} / 08</span>
                </div>
                <div style={{ height: 1, background: 'var(--copper-800)', width: '100%' }} />
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 12.5, color: 'var(--neutral-200)', lineHeight: 1.3 }}>{p.essence}</span>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--copper-200)', padding: '6px 9px', border: '1px solid var(--copper-800)', background: 'rgba(0,0,0,0.45)', lineHeight: 1.3, letterSpacing: '0.02em' }}>
                  {p.pattern}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {p.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontFamily: 'var(--serif)', fontSize: 12, color: 'var(--neutral-300)', lineHeight: 1.3 }}>
                      <span style={{ width: 4, height: 4, background: 'var(--copper-500)', flexShrink: 0, transform: 'translateY(-2px)' }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ minHeight: 20, display: 'flex', alignItems: 'flex-end' }}>
          <Reveal on={showFooter}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13.5, color: 'var(--neutral-400)', margin: 0 }}>
              <KW text={E10.footer} keywords={E10.footerKw} />
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}

// ────────────────────── SLIDE E11 ──────────────────────
function SlideE11({ step }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Hero photo */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/e11-bridge.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      {/* Vignette: bottom-left (anchors the headline) */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 35%, rgba(10,10,10,0.0) 70%)' }} />
      {/* Vignette: top-left (protects FigLabel readability against bright sky) */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 520px 280px at top left, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0) 100%)', pointerEvents: 'none' }} />
      {/* Soft top edge gloom — keeps the FigLabel band legible across the full top */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)', pointerEvents: 'none' }} />
      <FigLabel num="11" kind="BRIDGE · BUILT" />

      {/* Right-anchored beats */}
      <div style={{ position: 'absolute', left: 48, bottom: 110, maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Reveal on={step >= 0}>
          <p style={{ fontFamily: 'var(--display)', fontSize: 56, color: 'var(--neutral-50)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            <KW text={E11.beat1.text} keywords={E11.beat1.kw} />
          </p>
        </Reveal>
        <CopperRule on={step >= 0} width="30%" delay={400} />
        <Reveal on={step >= 1} delay={150}>
          <p style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 40, color: 'var(--copper-200)', margin: 0, lineHeight: 1.1 }}>
            <KW text={E11.beat2.text} keywords={E11.beat2.kw} />
          </p>
        </Reveal>
      </div>
    </div>
  );
}

Object.assign(window, { SlideE9, SlideE10, SlideE11 });
