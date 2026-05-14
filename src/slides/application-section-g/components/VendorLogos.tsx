// VendorLogos — simplified SVG renditions of the three vendor brand marks
// used on G.1. Pure SVG, no animation, no dependencies. Designed to read
// clearly at ~56px on a dark surface.

import type { CSSProperties } from "react";

interface LogoProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

// ───────────────── Claude — 8-petal radial burst ─────────────────
// Eight rounded "leaf" petals at 45° intervals around a small empty center.
// Each petal is an oval (rx ~ 6% of viewBox, ry ~ 22% of viewBox) translated
// outward so its inner end sits just outside the center.
export function ClaudeLogo({ size = 56, className, style }: LogoProps) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-label="Claude"
      role="img"
    >
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx={50}
          cy={22}
          rx={6}
          ry={22}
          fill="#D97757"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

// ───────────────── Google — segmented "G" ─────────────────
// Four ~80° colored arcs (gaps between them give the segmented look) plus
// a horizontal blue stub forming the inward crossbar on the right side.
// Stroke widths and arc radii are tuned so the mark reads as a "G" at 56px.
export function GoogleLogo({ size = 56, className, style }: LogoProps) {
  const cx = 50;
  const cy = 50;
  const r = 32;
  const stroke = 11;

  // Helper: arc path from start angle to end angle (degrees, clockwise from
  // 12 o'clock). Uses standard polar→cartesian conversion.
  const polar = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const arc = (start: number, end: number) => {
    const s = polar(start);
    const e = polar(end);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-label="Google"
      role="img"
    >
      {/* Red — top-left quadrant (approx 270°→0°, drawn 270→360) */}
      <path d={arc(265, 355)} stroke="#EA4335" strokeWidth={stroke} fill="none" strokeLinecap="butt" />
      {/* Yellow — bottom-left (180°→270°) */}
      <path d={arc(175, 265)} stroke="#FBBC05" strokeWidth={stroke} fill="none" strokeLinecap="butt" />
      {/* Green — bottom-right (90°→180°) */}
      <path d={arc(85, 175)} stroke="#34A853" strokeWidth={stroke} fill="none" strokeLinecap="butt" />
      {/* Blue — top-right (0°→90°) but cut short to leave a notch for the bar */}
      <path d={arc(5, 75)} stroke="#4285F4" strokeWidth={stroke} fill="none" strokeLinecap="butt" />
      {/* Blue crossbar — horizontal stub pointing left from the right edge */}
      <rect x={50} y={45} width={32} height={stroke} fill="#4285F4" />
    </svg>
  );
}

// ───────────────── OpenAI — three interlocking pills ─────────────────
// Three stadium (rounded-rectangle) outlines rotated at 0°, 60°, 120° around
// the center. Strokes only — no fill — so they overlap as an interlocking
// flower. White stroke for visibility on the dark slide background.
export function OpenAILogo({ size = 56, className, style }: LogoProps) {
  const rotations = [0, 60, 120];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-label="OpenAI"
      role="img"
    >
      {rotations.map((deg) => (
        <rect
          key={deg}
          x={22}
          y={40}
          width={56}
          height={20}
          rx={10}
          ry={10}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={6}
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}
