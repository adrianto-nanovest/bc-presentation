# Design System Research for Berau Coal Energy AI Workshop Deck
**Mining-Industrial Corporate Presentation Context**  
Research Date: May 2026  
Speaker: Adri (Nanovest, Sinarmas Mining Group)

---

## 1. Executive Summary

### Top 3 Candidates

1. **IBM Carbon (via IBM design.md)**
   - Enterprise gravity, 0px modernism, pure IBM Blue single-accent. Signals institutional confidence. Adaptable to PDF/PPTX.
   
2. **Apple design.md**
   - Premium minimalism with cinematic white space. Single blue accent. Professional polish. Animation-friendly (transitions on buttons/tiles). Strong for luxury mining conference vibe.
   
3. **Vercel design.md**
   - Minimalism as engineering principle. Black/white precision, aggressive typography negative-spacing. Trusted by infrastructure/fintech. PDF-export friendly. Less animation-rich but ultra-clean.

**Honorable mentions:** Stripe (finance-grade elegance; purple gradients may feel startup-y for mining), Notion (editorial warmth; pastel accents less mining-appropriate), Framer (dark-forward but not enterprise-focused).

---

## 2. Design.md Format Primer

### What Is design.md?

**design.md** is a machine-readable design system specification created by [Google Labs](https://github.com/google-labs-code/design.md) and standardized by [Google Stitch](https://stitch.withgoogle.com/docs/design-md/specification). It encodes visual identity in a single plain-text markdown file that AI coding agents (Claude, Cursor, v0, Lovable) can parse to generate consistent UI.

### Core Structure

A design.md file uses two layers:

```
---
# YAML Front Matter (Machine-Readable Tokens)
colors:
  primary: "#0f62fe"
  surface: "#f4f4f4"
  
typography:
  display:
    fontFamily: "IBM Plex Sans"
    fontSize: "42px"
    fontWeight: 300
    
spacing:
  xs: "8px"
  md: "16px"
  
roundedCorners:
  button: "0px"
  card: "8px"
  
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    padding: "12px 16px"
---

## Design Guidance (Human-Readable Markdown)

Color Philosophy: IBM Blue signals trust and institutional gravitas...

Button Behavior: All buttons use 0px corners to express engineering precision...
```

### What It Captures

| Layer | Purpose |
|-------|---------|
| **Color tokens** | Brand palette hex values, surface layers, semantic colors (error/success) |
| **Typography tokens** | Font families, sizes, weights, line-heights, letter-spacing at each scale |
| **Spacing scale** | Base unit (e.g., 8px) and derived increments (4px to 96px) for margins/padding |
| **Rounded corners** | Border-radius values for buttons, cards, pills—signals design philosophy |
| **Component definitions** | Buttons, cards, inputs, navigation with exact padding, colors, shadows |
| **Design prose** | Rationale, philosophy, use-case guidance (not machine-parsed but essential for context) |

### Why It Matters for Your Deck

1. **Consistency at scale:** Drop one design.md file into Claude Code / Cursor and every generated HTML slide follows the system automatically.
2. **Adaptability to export:** Tokens export cleanly to Tailwind CSS, W3C Design Tokens, or manual CSS—enabling PDF/PPTX export without rework.
3. **Animation-friendly:** The spec includes spacing and component definitions; motion/transitions can be specified in the markdown prose or added via CSS extensions.
4. **Version control:** Track design regressions by diffing design.md versions.

### Current Status

The spec is in **alpha** with a [toolkit CLI](https://github.com/google-labs-code/design.md) for linting, exporting to Tailwind/W3C, and validation.

---

## 3. Pre-Made Design.md Candidates Inventory

### Scope
The [awesome-design-md repository](https://github.com/VoltAgent/awesome-design-md) catalogs **71 ready-to-use design systems** across 11 categories. The [getdesign.md marketplace](https://getdesign.md/) offers visual previews and one-click installation.

### Shortlisted Candidates (Fit for Corporate Mining Workshop)

| **Design System** | **Source** | **Vibe** | **Corporate-Mining Fit** | **Key Strengths** | **Caveats** |
|---|---|---|---|---|---|
| **IBM Carbon** | [getdesign.md/ibm](https://getdesign.md/ibm/design-md) | Enterprise minimalism, charcoal + IBM Blue | **5/5** | Institutional gravitas; 0px corners signal engineering rigor; pure single-accent; Carbon open-source pedigree; PDF-friendly | Heavy on charcoal (may feel dark for 2-hr deck); limited personality; no animation philosophy |
| **Apple** | [getdesign.md/apple/design-md](https://getdesign.md/apple/design-md) | Premium white-space, cinematic photography | **4.5/5** | Luxury positioning (mining as premium commodity); single-blue accent; button-scale transitions smooth; 44px touch targets; PPTX-adaptable | Relies on hero photography (mining imagery must be curated); light theme may not suit dark auditorium |
| **Vercel** | [getdesign.md/vercel/design-md](https://getdesign.md/vercel/design-md) | Minimalism as engineering, black/white precision | **4/5** | Ultra-clean sans-serif; single-color accent (Ship Red or Blue); no shadows (ink + border only); trusted by fintech/infra teams | Heavy negative letter-spacing (56px display = -2.88px) can feel austere; minimal animation support; monochrome may feel corporate-sterile |
| **Stripe** | [getdesign.md/stripe/design-md](https://getdesign.md/stripe/design-md) | Finance elegance, signature purple + navy | **3/5** | Multi-layer shadows (premium elevation); weight-300 display feel; dense spacing; strong fintech associations | Purple gradients + magenta accents read startup-y for mining; sohne-var typeface uncommon (font-stack risk); animation not core |
| **Notion** | [getdesign.md/notion/design-md](https://getdesign.md/notion/design-md) | Editorial warmth, pastel cards + deep navy | **3/5** | Centered, dignified layout; pastel feature cards feel approachable; real product mockups embed well; rectangular buttons (not trendy pills) | Pastel accents (peach, rose, mint) feel consumer-friendly, not mining-industrial; illustration-heavy |
| **Framer** | [getdesign.md/framer/design-md](https://getdesign.md/framer/design-md) | Dark-canvas with gradient spotlights | **2.5/5** | Bold black background; blue accents; gradient "spotlight" cards atmospheric; comprehensive component set | No explicit motion philosophy (despite Framer's brand = motion); dark-on-dark may reduce readability for 400-person auditorium |
| **Linear** | [github.com VoltAgent/awesome-design-md/linear](https://github.com/VoltAgent/awesome-design-md) | Ultra-minimal, purple accent, precision type | **3/5** | Tight, developer-forward grid; single-accent (purple); no serif fonts (tech-forward) | More product-UI focused than marketing; limited color variety; purple may feel startup-ish for mining |
| **Mastercard** | [getdesign.md/mastercard](https://getdesign.md/) | Warm cream canvas, orbital red accent, shapes | **2/5** | Geometric shapes signal modernity; warm neutrals; red accent draws attention | Overly playful for mining context; brand-heavy messaging (not suitable for 3rd-party deck) |

---

## 4. Recommended Shortlist: Deep Dives

### Candidate #1: IBM Carbon (Recommended for Adoption)

**Fit Score: 5/5 for Corporate-Mining Workshop**

**Why:**
- **Institutional Authority**: Pure IBM Blue (`#0f62fe`) as sole accent communicates engineering rigor and enterprise trust—exactly what mining C-suite expects from AI/tech.
- **Geometric Restraint**: 0px border-radius on buttons and cards; flat geometry reflects industrial precision, not consumer playfulness.
- **Single-Color Discipline**: No gradients, no decorative colors—all visual hierarchy comes from surface change (white → light gray → charcoal footer), sizing, and weight. Mining operations value clarity.
- **Proven at Scale**: Carbon is open-source and used by enterprise infrastructure products (IBM Cloud, HashiCorp partnerships). Signals production-grade robustness.
- **Export-Friendly**: Flat structure, no gradients, 0px corners = clean Tailwind → CSS → PDF export path.

**Token Summary:**
```yaml
colors:
  primary: "#0f62fe" (IBM Blue—links, buttons, focus)
  canvas: "#ffffff" (surfaces)
  surface-1: "#f4f4f4" (secondary layers)
  inverse-canvas: "#161616" (footer only)
  text-ink: "#161616"
  text-muted: "#525252"

typography:
  display: IBM Plex Sans 300 (light, 76px–42px)
  body: IBM Plex Sans 400 (16px, 0.16px letter-spacing)

spacing: 4px base (Carbon standard)
rounded-corners: 0px (all buttons/cards)
```

**Animation Support:**
- The spec doesn't explicitly define animations, BUT the flat structure makes CSS transitions effortless.
- Recommended: Add fade-in/slide-in on card reveals, underline expand on buttons, opacity-based transitions (no GPU-heavy 3D).
- Timing: 200–300ms aligns with Material Design best practices for institutional UI.

**Caveats:**
- Light-heavy (white + light gray dominates). For a 2-hour deck in an auditorium, consider dark mode variant or conditional lighting.
- Limited personality. Mitigate with strong photography (Berau coal landscapes) and clear typography hierarchy.
- Carbon brand (IBM logo, blue strictly) shouldn't appear; extract tokens only.

**Adaptation Path:**
1. Adopt IBM design.md wholesale.
2. Add mine-specific color overlay if needed (e.g., earthy accent: charcoal + cream + deep blue, no IBM Blue).
3. Extend component library with slide-specific atoms (hero title blocks, stat callouts, image captions).

---

### Candidate #2: Apple (Strong Alternative for Premium Feel)

**Fit Score: 4.5/5 for Corporate-Mining Workshop**

**Why:**
- **Premium Positioning**: Mining (especially coal) is positioned as a premium, essential commodity. Apple's white-space luxury aligns.
- **Single-Accent Discipline**: Action Blue (`#0066cc`) + Focus Blue (`#0071e3`). NO decorative colors. Signals sophistication.
- **Photography-First Philosophy**: "The artifact, not the UI" = hero slide with mine/operation imagery dominates, UI recedes. Ideal for executive storytelling.
- **Touch Target Confidence**: 44×44px minimum targets (generous). Mining audience may include non-tech execs; comfortable interaction = trust.
- **Animation-Friendly**: Button states include `transform: scale(0.95)` on interaction. Pill shapes (`border-radius: 9999px`) create micro-animation potential.

**Token Summary:**
```yaml
colors:
  action-blue: "#0066cc" (sole interactive color)
  pure-white: "#ffffff"
  parchment: "#f5f5f7" (signature off-white)
  near-black: "#272729", "#2a2a2c" (tiles)
  divider: "#f0f0f0" (soft), "#e0e0e0" (standard)

typography:
  hero-display: SF Pro Display 56px, 600 weight, -0.28px letter-spacing
  display-lg: SF Pro Display 40px, 600 weight
  body: SF Pro Text 17px, 400 weight (NOT 16px—signature detail)
  
spacing: 8px base (xxs=4px to section=80px)
rounded-corners: xs=5px, sm=8px, md=11px, pill=9999px
```

**Animation Support:**
- Button scale: `transform: scale(0.95)` on active state (200ms).
- Fade-in on tile reveals (300–400ms, `opacity: 0 → 1`).
- Subtle shadow expansion on hover (`box-shadow` increases depth).

**Caveats:**
- **Typography Risk**: Relies on SF Pro Display/Text (Apple's proprietary family). Fallback to Inter or system fonts may lose tightness. Mining deck likely distributed pre-recorded (PDF/MP4), so fonts ship embedded—mitigated.
- **Light Theme**: White + parchment dominates. For a dark auditorium, consider inverting background tone or conditional CSS (dark mode).
- **Photography Dependency**: Requires high-quality mining/coal/operation imagery. Low-res or generic photos undermine the "artifact-centric" vibe.

**Adaptation Path:**
1. Adopt Apple design.md color + spacing tokens.
2. Replace SF Pro with a substitute (Inter, Geist Sans, or system sans-serif—test font-weight: 600 for hero legibility).
3. Add custom slide components for mining data visualization (charts, timelines, process flows).
4. Implement photography-first hero layout: image (60% height) + caption overlay (bottom 20px, white text on semi-transparent black).

---

### Candidate #3: Vercel (Minimalist Fintech-Trusted Alternative)

**Fit Score: 4/5 for Corporate-Mining Workshop**

**Why:**
- **Minimalism as Engineering**: "Design by subtraction" resonates with mining's no-nonsense ethos.
- **Trusted by Fintech/Infra**: Vercel is used for payment platforms, CI/CD, infrastructure automation. Mining is infrastructure (energy commodity). Brand association = technical credibility.
- **Precision Typography**: Geist Sans with aggressive negative letter-spacing (-2.4px to -2.88px at display sizes) creates distinctive, tight headline feel—confidence without decoration.
- **PDF Export Simplicity**: Pure black/white + single accent (Ship Red or blue). NO shadows (only `box-shadow: 0 0 0 1px rgba(0,0,0,0.08)` as border). Exports cleanly to PDF without rasterization.

**Token Summary:**
```yaml
colors:
  background: "#ffffff" (pure white)
  text-primary: "#171717" (near-black)
  accent-red: "#ff5b4f" (Ship Red) [alternative: blue]
  neutral-grays: "#171717" to "#fafafa"
  border: "rgba(0,0,0,0.08)" (shadow-as-border technique)

typography:
  display: Geist Sans 600, -2.4px to -2.88px letter-spacing
  body: Geist Sans 400
  monospace: Geist Mono (code snippets)

spacing: 8px base, massive vertical whitespace (80–120px between sections)
rounded-corners: 4px–8px (conservative, no pills)
```

**Animation Support:**
- Minimal emphasis on motion. Transitions are subdued: opacity changes, subtle `transform: translateY(2px)` on hover.
- Timing: 150–200ms (snappy, not luxurious).
- Signature look: "Glowing" depth from multi-layer box-shadow stacks (border + elevation + ambient + inner highlight).

**Caveats:**
- **Austere**: Negative letter-spacing at large sizes can feel harsh or hard-to-read on projectors. Test on auditorium screens.
- **No Color Variety**: Red accent or blue only. Limited expressive range (mitigated by strong typography hierarchy).
- **Animation-Light**: Doesn't position motion as a strength. If your deck requires smooth transitions/reveals, consider Apple or Framer instead.
- **Geist Font Risk**: Proprietary family (though openly available). Mining deck may need fallback to open-source (Inter, Roboto).

**Adaptation Path:**
1. Adopt Vercel color + spacing tokens wholesale.
2. Substitute Geist Sans → Inter (open-source, similar metrics).
3. Add custom reveal animations (fade-in, slide-in) via CSS keyframes or Framer Motion (if exported to React).
4. Extend color palette with mining-relevant earth tones (charcoal, cream, bronze) if single accent feels limiting.

---

### Candidate #4: Stripe (Premium Fintech, Lower Priority)

**Fit Score: 3/5 for Corporate-Mining Workshop**

**Why to Consider:**
- Finance-grade polish and multi-layer shadow technique (blue-tinted depth).
- Weight-300 display headlines ("light, confident, anti-convention") feel premium.
- Dense spacing and measured whitespace balance.

**Why Not Primary Choice:**
- **Purple + Magenta gradients** read startup-y and trendy. Mining conference calls for gravitas, not Silicon Valley vibes.
- **Proprietary sohne-var typeface** (OpenType `ss01` stylistic set). Fallback risk; uncommon outside fintech.
- **Animation philosophy is absent** from the design.md spec. Motion is secondary.
- **Brand association**: Stripe = consumer payments, startups. Less relevant for mining energy company.

**Token Summary (if adapted):**
```yaml
colors:
  stripe-purple: "#533afd" (primary)
  deep-navy: "#061b31" (headings, not black)
  ruby: "#ea2261" (accent)
  magenta: "#f96bee" (decorative gradient)

typography:
  display: sohne-var, weight 300, -1.4px letter-spacing (56px)
  body: sohne-var, weight 400, 16px

spacing: 8px base (dense)
rounded-corners: 4px–8px (conservative)
```

**Recommendation**: Use if you want fintech-credibility + polish. Swap purple → deep blue or charcoal for mining context. Test multi-layer shadows in PDF export (may rasterize poorly).

---

### Candidate #5: Notion (Editorial Warmth, Lower Priority)

**Fit Score: 3/5 for Corporate-Mining Workshop**

**Why to Consider:**
- Centered, editorial layout (dignified, not left-aligned SaaS norm).
- Real product mockups embed naturally.
- Rectangular buttons (not trendy pills) signal maturity.

**Why Not Primary Choice:**
- **Pastel accents** (peach, rose, mint, lavender) feel consumer-friendly and craft-focused. Mining = industrial, not playful.
- **Illustration-heavy brand** (Notion's website is illustration-rich). Mining deck should favor photography + data viz, not decorative illustrations.
- **Deep navy hero band** is strong, but pastel feature cards undermine seriousness.
- **Limited color discipline**: 5+ accent colors spread across cards. Feels diluted vs. IBM's single-accent focus.

**Adaptation Path if Used**: Strip all pastels. Keep navy + cream base. Replace illustrations with photography.

---

## 5. Pattern Extraction Notes (If Going Custom)

If none of the above candidates fit perfectly, here are design philosophies and pattern sets worth mining from the catalog:

### Philosophy 1: **Pentagram-Style Information Architecture**
- Extreme typography hierarchy (20:1 headline-to-body size ratio).
- Centered composition with asymmetric negative space.
- Single, brutal accent color (red, blue, or black).
- Applied by: Notion, Apple, Vercel.
- **For mining deck**: Use massive hero headlines (80px+), tight body text (14px), centered composition with hero image flanked by white space.

### Philosophy 2: **Data-Driven Color Restraint** (IBM Carbon / HashiCorp)
- Primary brand color + neutrals + semantic colors (error red, success green, warning yellow) only.
- No gradients. Hierarchy via surface change (contrast steps).
- Applied by: IBM, HashiCorp, Linear.
- **For mining deck**: Use charcoal + cream + mining-relevant accent (e.g., copper/bronze `#b86e3d`, coal-black `#1a1a1a`). Reserve color for data callouts and CTAs.

### Philosophy 3: **Shadow as Depth Language** (Apple, Stripe)
- Precise shadow specifications to communicate elevation (not decoration).
- Single, controlled shadow family (not variety).
- Example: Apple uses `rgba(0, 0, 0, 0.22) 3px 5px 30px` for product imagery only.
- Example: Stripe uses multi-layer shadows (3 layers) for card elevation.
- **For mining deck**: Pick ONE shadow recipe (e.g., `0 8px 24px rgba(0, 0, 0, 0.12)`). Apply consistently to cards, image frames, callout boxes.

### Philosophy 4: **Motion for Micro-Interactions Only** (Framer, Apple, Vercel)
- Large animations (slide, fade, scale) reserved for key reveals or section transitions (200–400ms).
- Button states use 100–200ms interactions (scale, underline, color shift).
- No decorative motion; every animation has functional purpose.
- Applied by: Framer (dark theme, spotlight effects), Apple (scale on buttons), Vercel (subtle opacity + translateY).
- **For mining deck**: 
  - Section transitions: Fade-in + slide-up (300ms, easeInOutQuad).
  - Button/CTA hover: Scale(1.05) + shadow expand (150ms).
  - Data reveals: Staggered fade-in for chart bars, timeline points (200ms stagger).

### Philosophy 5: **Typographic Weight Discipline** (Vercel, IBM, Apple)
- Single typeface family (no serif/sans mixing).
- Hierarchy by weight (300 → 400 → 600 → 700) and size only, NOT multiple families.
- Applied by: Vercel (Geist Sans only), IBM (IBM Plex Sans only), Apple (SF Pro Display + SF Pro Text, but same family).
- **For mining deck**: Choose ONE sans-serif (Inter, Roboto, or IBM Plex Sans). Use 3 weights: 300 (display), 400 (body), 600 (headings). No mixing serif.

### Philosophy 6: **Spacing Grid Discipline**
- All design systems use a base unit (4px or 8px) and derive all spacing from it.
- IBM = 4px base. Apple, Vercel, Stripe = 8px base.
- Never arbitrary spacing; all margins/padding are multiples of base.
- **For mining deck**: Adopt 8px base (more generous, better for large auditorium projection). Tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96 (px). Use these ONLY for margins, padding, gaps.

---

## 6. Animation & Export Considerations

### Animation Support in design.md

The [current design.md specification](https://stitch.withgoogle.com/docs/design-md/specification) does **not** have a dedicated motion/animation token layer (as of May 2026). However:

1. **CSS Transitions Can Extend Tokens**: Use design.md tokens for timing functions and durations (not standardized yet, but reasonable additions):
   ```yaml
   motion:
     duration-quick: "150ms"
     duration-standard: "300ms"
     easing-ease-out: "cubic-bezier(0.4, 0, 0.2, 1)"
   ```

2. **Component Animation via Markdown Prose**: The human-readable section can document animation behaviors:
   ```markdown
   ## Buttons
   
   On hover, scale to 1.05 over 150ms with easing ease-out.
   On active, reduce scale to 0.95 immediately.
   Focus ring expands with 200ms fade-in.
   ```

3. **Export to HTML/CSS**: If exporting to React or vanilla HTML, implement animations via CSS keyframes or Framer Motion (external to design.md, but guided by its principles).

### PDF/PPTX Export Strategy

**PDF Export:**
- **Avoid**: Gradients, complex shadows, custom fonts (embed or systemize).
- **Ideal**: Flat colors, 0px–8px borders, system fonts (Arial, Helvetica) or licensed web fonts embedded.
- **Recommend**: Vercel or IBM systems (flat, minimal shadows, simple typography).

**PPTX Export:**
- Design.md → Tailwind → HTML canvas → HTML-to-PPTX library (e.g., `pptxjs`, `officegen`).
- Requires: Solid color backgrounds, simple layout grid (slides are rectangular), standard fonts.
- **Recommend**: Any of the shortlist (all are PPTX-adaptable). Apple requires hero image curation.

**MP4 Video Export** (if deck is animated and recorded):
- Use design tokens to generate HTML with CSS animations.
- Render via Headless Chrome (Puppeteer) → MP4 via FFmpeg.
- Timing: 24–60fps. Animation durations should match video frame rate (e.g., 300ms = 8–18 frames).

---

## 7. Citations & Resources

### Official Design.md Documentation
- [google-labs-code/design.md GitHub Repository](https://github.com/google-labs-code/design.md)
- [Google Stitch design-md Specification](https://stitch.withgoogle.com/docs/design-md/specification)

### Pre-Made Catalog & Marketplace
- [awesome-design-md GitHub Collection (71 systems)](https://github.com/VoltAgent/awesome-design-md)
- [getdesign.md Marketplace (Visual Previews)](https://getdesign.md/)

### Specific Design System Files Referenced
- [IBM Carbon design.md](https://getdesign.md/ibm/design-md) / [GitHub](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/ibm/DESIGN.md)
- [Apple design.md](https://getdesign.md/apple/design-md) / [GitHub](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/apple/DESIGN.md)
- [Vercel design.md](https://getdesign.md/vercel/design-md) / [GitHub](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/vercel/DESIGN.md)
- [Stripe design.md](https://getdesign.md/stripe/design-md) / [GitHub](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/stripe/DESIGN.md)
- [Notion design.md](https://getdesign.md/notion/design-md) / [GitHub](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/notion/DESIGN.md)
- [Framer design.md](https://getdesign.md/framer/design-md) / [GitHub](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/framer/DESIGN.md)

### Motion & Animation References
- [MDN Web Docs: CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- [Material Design Motion System](https://m3.material.io/styles/motion/overview/how-it-works)
- [Tailwind CSS Animation Utilities](https://tailwindcss.com/docs/animation)

### Indonesia Mining Context
- [Mining Industry Indonesia (MIND ID)](https://mind.id/en)
- [Indonesia Mining Sector Overview](https://www.trade.gov/country-commercial-guides/indonesia-mining)

---

## 8. Recommendation Summary for Berau Coal Energy

### Go-Forward Plan

1. **Primary Recommendation: Adopt IBM Carbon**
   - Reason: Enterprise institutional authority, single-accent discipline, 0px minimalism mirrors mining engineering rigor.
   - Action: Use [IBM design.md tokens](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/ibm/DESIGN.md) as base. Strip IBM Blue if branding is restrictive; substitute with mining-relevant accent (charcoal, deep blue, copper).
   - Effort: Low. Direct token adoption into Claude Code for slide generation.
   - Risk: Light-heavy (white + light gray). Mitigate with dark mode variant or high-contrast auditorium testing.

2. **Alternative if "Premium Luxury" Positioning Dominates: Adopt Apple**
   - Reason: White-space premium positioning, photography-first philosophy, animation-friendly button interactions.
   - Action: Use [Apple design.md](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/apple/DESIGN.md) tokens. Font-substitute SF Pro → Inter (risk mitigation). Curate high-quality Berau/mining imagery.
   - Effort: Medium. Requires photography sourcing + custom slide templates for image-centric layouts.
   - Risk: Dependent on image quality. Light theme may need auditorium testing.

3. **Consider Custom Hybrid if Neither Fits**
   - **Base**: IBM Carbon's color discipline + spacing grid (4px).
   - **Overlay**: Apple's button micro-animations (scale + shadow) and photography philosophy.
   - **Accent**: Add mining-specific color (e.g., copper `#b86e3d`, coal-black `#1a1a1a`, or deep earth-brown `#6b4423`).
   - **Effort**: Medium. Requires extracting patterns from both systems and blending in custom design.md file.

4. **Animation Strategy**
   - Use CSS transitions (150–300ms) for button states and card reveals.
   - Avoid heavy 3D transforms or GPU-intensive animations (export to MP4/PDF may fail).
   - Timing: 300ms fade-in for section reveals, 150ms for micro-interactions.

5. **Export Path**
   - **PDF**: Use Vercel or IBM tokens (flat, no gradients). Test multi-layer shadows in PDF export.
   - **PPTX**: Any system works. Ensure solid backgrounds, standard fonts (embedded).
   - **MP4**: Render HTML via Puppeteer → video via FFmpeg at 60fps.

---

## Next Steps

1. **Validate Choice with Mockup**: Generate 3–5 sample slides using IBM design.md tokens via Claude Code. Review in Berau context (mining audience, auditorium projection).
2. **Test Export Path**: Export one mockup to PDF and PPTX. Confirm fonts embed, shadows render, animation translates.
3. **Extend Component Library**: Add mining-specific components (data viz, timeline, process flow) to design.md.
4. **Photography Sourcing**: If adopting Apple philosophy, source 20–30 Berau coal operations images for hero slides.
5. **Finalize Accent Color**: Confirm mining-relevant accent color (if not using IBM Blue directly). Test contrast ratios for WCAG compliance.

---

**Research Completed**: May 6, 2026  
**For**: Berau Coal Energy AI Workshop Deck (400 attendees, 120-min animated HTML deck)  
**Prepared By**: Nanovest Research Team
