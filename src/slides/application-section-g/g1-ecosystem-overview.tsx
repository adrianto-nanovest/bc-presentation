// G.1 — ECOSYSTEM OVERVIEW
//
// Section G opener · three vendor cards establishing "Specialization,
// not single winners". Each card is logo-led with a tagline, copper rule,
// and three capability bullets.
//
// 2 reveal steps:
//   0 — All 3 cards fade in left→right with stagger
//   1 — Closing line reveals at bottom

import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import {
  ClaudeLogo,
  GoogleLogo,
  OpenAILogo,
} from "./components/VendorLogos";
import { g1Content as C } from "./content";
import "./g1-ecosystem.css";

type Vendor = (typeof C.vendors)[number];

function VendorLogoFor({ id }: { id: Vendor["id"] }) {
  if (id === "claude") return <ClaudeLogo size={56} />;
  if (id === "google") return <GoogleLogo size={56} />;
  return <OpenAILogo size={56} />;
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="g1-card">
      <div className="g1-card-logo">
        <VendorLogoFor id={vendor.id} />
      </div>
      <div className="g1-card-name">{vendor.name}</div>
      <div className="g1-card-tagline">
        {highlight(vendor.tagline, [...vendor.taglineKw])}
      </div>
      <hr className="g1-card-rule" />
      <ul className="g1-card-bullets">
        {vendor.capabilities.map((cap, i) => (
          <li key={i} className="g1-card-bullet">
            {highlight(cap, [...vendor.capabilitiesKw])}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ───────────────────── slide ─────────────────────

export function G1EcosystemOverview() {
  const { stepIndex } = useDeck();

  const showClosing = stepIndex >= 1;

  return (
    <>
      <FigLabel section="G" num={1} label="ECOSYSTEM" />

      {/* ───────────── Headline (always structural, no Reveal) ───────────── */}
      <h1
        className="slide-headline small"
        style={{
          position: "absolute",
          top: 80,
          left: 48,
          right: 48,
          margin: 0,
        }}
      >
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* ───────────── 3 vendor cards (entry step 0, staggered) ──────────── */}
      <div
        data-testid="g1-vendor-cards"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 200,
          bottom: 140,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
        }}
      >
        {C.vendors.map((v, i) => (
          <Reveal
            key={v.id}
            on={true}
            delay={120 + i * 140}
            data-testid={`g1-card-${v.id}`}
            style={{ height: "100%" }}
          >
            <VendorCard vendor={v} />
          </Reveal>
        ))}
      </div>

      {/* ───────────── Closing line (step 1, bottom) ─────────────────────── */}
      <Reveal
        on={showClosing}
        delay={120}
        data-testid="g1-closing"
        style={{
          position: "absolute",
          bottom: 100,
          left: 48,
          right: 48,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--copper-200)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {highlight(C.closingLine, [...C.closingLineKw])}
        </p>
      </Reveal>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const g1Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G1EcosystemOverview />,
};
