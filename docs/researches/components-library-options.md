# Component Library Decision Matrix for AI Workshop Presentation
## 120-minute animated HTML slide deck + practice-lab demos for ~400 mining-industry employees

**Research Date:** May 2026  
**Project:** Berau Presentation (Nanovest, Sinarmas Mining Group)  
**Research Scope:** Comparative analysis of 5 major React component libraries across use-case scenarios

---

## Executive Summary

This research evaluates **5 major component libraries** (shadcn UI, Tailwind CSS + Headless UI, Radix UI Primitives, Material UI, and Chakra UI) for a demanding use case: **a 120-minute animated HTML presentation with optional interactive practice-lab demos**.

**Key Finding:** There is no single "best" library for this project. Instead, this document presents a **scenario-driven decision matrix** because:

1. **Slide deck only** (minimal interactivity) → lightweight libraries dominate
2. **Slide deck + interactive labs** (forms, charts, dialogs) → different priorities emerge
3. **Heavy motion design** requirements → animation library choice becomes critical
4. **PDF/PPTX export** (unknown until content is finalized) → niche trade-offs apply

**The architecture decision should be made once content is known**, using the scenarios outlined in Section 4.

### Quick Landscape Overview

- **Headless trend dominates 2026**: 70% adoption growth toward unstyled, composable libraries over pre-styled
- **Bundle weight matters for PDF export**: Smaller payloads = faster Puppeteer rendering
- **Animation support varies widely**: Some libraries ship animation-first (Chakra + Framer Motion), others require opt-in (shadcn)
- **Customization freedom ranges from infinite (Tailwind) to constrained (Material UI)**

---

## Per-Library Deep Dive

### 1. shadcn UI

**What it is:** A collection of copy-paste Tailwind CSS + Radix UI components you own and customize directly.

#### Core Characteristics
- **Architecture:** Headless primitives (Radix) + Tailwind CSS styling + copy-paste pattern (zero npm runtime dependencies)
- **Framework:** React only; works with Next.js, Remix, Astro, Vite, Gatsby via installation guides
- **License:** MIT

#### Animation & Motion Support
- **Built-in:** Limited. Ships with basic CSS transitions via Tailwind
- **Framer Motion integration:** Excellent. Community has created [Animate UI](https://ui.aceternity.com/), [Motion Primitives](https://allshadcn.com/tools/motion-primitives/), and other animation-enhanced shadcn variants
- **Pattern:** Users must manually integrate Framer Motion; no opinionated animation layer
- **Use case fit:** Strong for custom, bespoke motion design; requires developer effort to orchestrate animations across many components

#### Customization
- **Depth:** Maximum. You own every component file; infinite customization possible
- **Approach:** Copy code into `components/ui/`, modify as needed, zero lock-in
- **Brand feel:** Excellent for unique brand identities; no pre-styled opinionation

#### Bundle Weight
- **Typical dashboard:** ~50 KB gzipped (Tailwind + component code)
- **Why small:** Zero runtime dependencies; you only ship CSS + JS code you actually use
- **PDF/export friendly:** ✓ Minimal payload for server-side rendering

#### Component Coverage
- **Slide deck:** Typography, Layout, Alerts, Badges, Buttons, Cards, Callouts
- **Practice labs:** Form, Input, Select, Checkbox, Radio, Dialog, Sheet, Popover, Tabs
- **Data viz:** Chart component exists (community-maintained, uses Recharts pattern)
- **Tables:** Data Table component (community pattern, requires manual implementation)
- **Gap:** No out-of-box charts library; you must integrate (Recharts, Chart.js, Victory, etc.)

#### Accessibility
- **Foundation:** Radix UI primitives → WAI-ARIA compliant by default
- **Level:** High; inherits Radix's rigorous accessibility focus
- **Keyboard navigation, screen readers:** Built-in via Radix

#### Maturity & Community
- **Adoption:** De facto standard in 2026 for new React projects; massive community
- **GitHub stars:** 70k+ across component collections
- **Ecosystem:** Extensive third-party integrations and extensions (Shadcn Studio, Shadcn Blocks, Aceternity UI, Motion Primitives, etc.)
- **Support:** Active GitHub discussions, large Discord community
- **Risk:** Maintained by independent creators; no corporate backing (though used by Vercel, Linear, Supabase internally)

#### PDF/PPTX Export Considerations
- **HTML to PDF (Puppeteer):** Excellent. Minimal CSS, no runtime JS surprises
- **PPTX generation:** Use [react-pptx](https://github.com/wyozi/react-pptx) or [PptxGenJS](https://gitbrent.github.io/PptxGenJS/)
- **Animation handling:** Static PDF export requires no animation code; dynamic features must be built separately
- **Quirks:** None major; straightforward React-to-HTML pipeline

#### Recommended Stack for This Project
```
shadcn UI + Tailwind CSS + Framer Motion (optional, for slides) + Recharts or similar (for labs)
```

---

### 2. Tailwind CSS + Headless UI

**What it is:** A utility-first CSS framework paired with unstyled, accessible component primitives.

#### Core Characteristics
- **Architecture:** Utility CSS (Tailwind) + headless components (Headless UI); two separate packages
- **Framework:** Both React and Vue; framework-agnostic styling
- **License:** MIT

#### Animation & Motion Support
- **Built-in:** Tailwind ships with CSS animation utilities (fade, spin, bounce, pulse, ping, slide, custom keyframes)
- **Framer Motion:** Works well alongside Headless UI; no conflicts
- **Limitation:** Tailwind animations are CSS-only; no declarative gesture or interaction library
- **Use case fit:** Good for slide transitions (CSS-based); okay for labs; requires Framer Motion for complex orchestration

#### Customization
- **Depth:** Maximum (Tailwind config) + high (Headless UI components are unstyled)
- **Approach:** Edit `tailwind.config.js` for design tokens; style components via Tailwind classes
- **Brand feel:** Perfect for bespoke design systems; infinite design freedom

#### Bundle Weight
- **Headless UI:** 84 KB JavaScript
- **Tailwind CSS:** <10 KB (after tree-shaking and production build)
- **Total typical:** ~50–80 KB gzipped
- **PDF/export friendly:** ✓ Clean separation of styling concerns

#### Component Coverage
- **Slide deck:** Layout, Typography (via Tailwind utilities), Transitions (via Headless UI)
- **Practice labs:** Dialog, Popover, Menu, Disclosure, Listbox, Combobox, Tab, Switch, Radio, Checkbox
- **Data viz:** Not included; must integrate separately (Recharts, D3, etc.)
- **Tables:** Not included; use `@tanstack/react-table` or build manually
- **Forms:** No form handling; pair with React Hook Form or Formik
- **Gap:** Lighter feature set than Material UI or shadcn; more "building blocks"

#### Accessibility
- **Foundation:** Headless UI components follow WAI-ARIA patterns; focus management and keyboard nav built-in
- **Level:** High (AAA-compliant)
- **Tailwind:** No accessibility guarantees; responsibility on developer

#### Maturity & Community
- **Adoption:** Huge. Tailwind is industry standard; Headless UI is the "official" Tailwind component library
- **GitHub stars:** Tailwind 70k+; Headless UI 9k+
- **Ecosystem:** Vast (integrations, plugins, design systems)
- **Support:** Excellent commercial support from Tailwind Labs
- **Risk:** Low; backed by Tailwind Labs (funded, maintained)

#### PDF/PPTX Export Considerations
- **HTML to PDF:** Excellent. Clean CSS; no runtime surprises
- **PPTX:** Use react-pptx or PptxGenJS; works well with Tailwind
- **Animation handling:** CSS transitions don't animate in static PDF; must design around this
- **Quirks:** Headless UI components require manual styling; exports may be verbose if not optimized

#### Recommended Stack for This Project
```
Tailwind CSS + Headless UI + Framer Motion (for animations) + Recharts (for labs)
```

---

### 3. Radix UI (Primitives + Themes)

**What it is:** A low-level, accessibility-first component library available in two flavors: **Primitives** (headless, ~25 components) and **Themes** (pre-styled, opinionated).

#### Core Characteristics
- **Architecture (Primitives):** Headless, unstyled, built-in accessibility, CSS-agnostic
- **Architecture (Themes):** Pre-styled, locked design, less customizable
- **Framework:** React; Vue support via community (Radix Vue)
- **License:** MIT

#### Animation & Motion Support
- **Built-in (Primitives):** None. Animation via CSS or external library
- **Built-in (Themes):** Limited; Themes include basic transitions
- **Framer Motion:** Works but requires manual integration
- **Animation approach:** Primitives document CSS-based animation with `@keyframes` and `willChange`; suspension during unmount for clean transitions
- **Use case fit:** More suited to Themes if you want animations; Primitives requires careful orchestration

#### Customization
- **Primitives:** Maximum. Fully unstyled; bring your own CSS
- **Themes:** Moderate. Pre-styled with theme tokens; harder to override beyond intended props
- **Approach:** Primitives = low-level control; Themes = faster prototyping (less customization)
- **Brand feel:** Primitives excellent for bespoke brands; Themes good for "good enough"

#### Bundle Weight
- **Primitives (tree-shakeable):** Varies by component; minimal (each package separate)
- **Themes:** Larger; includes pre-built styles (~60–80 KB gzipped estimated)
- **PDF/export friendly:** ✓ Primitives are lightweight; Themes depend on CSS overhead

#### Component Coverage
- **Primitives count:** 25+ components (Accordion, Alert Dialog, Checkbox, Dialog, Dropdown Menu, Form, Popover, Select, Slider, Table, Tabs, etc.)
- **Slide deck:** Accordion, Tabs, basic layout (minimal; must build typography layer)
- **Practice labs:** Dialog, Form, Select, Combobox, Slider, Popover, Checkbox, Radio, Popover, Switch
- **Data viz:** Not included
- **Tables:** Themes includes semantic table element; Primitives doesn't
- **Forms:** Form component included (validation, field management)
- **Gap:** No data viz; no ready-styled table layout

#### Accessibility
- **Foundation:** WAI-ARIA first-class; 130M+ monthly downloads; adopted by Vercel, Linear, Supabase
- **Level:** AAA; screen reader tested, keyboard navigation, focus management
- **Guarantee:** Every Primitive adheres to a specific WAI-ARIA pattern

#### Maturity & Community
- **Adoption:** Extremely mature. 130M+ monthly downloads; 13k+ GitHub stars
- **Backing:** Maintained by WorkOS (company-backed)
- **Ecosystem:** Large (integrations, design tools)
- **Support:** Active GitHub discussions, sizeable Discord (5.5k+ members)
- **Risk:** Very low; institutional backing

#### PDF/PPTX Export Considerations
- **HTML to PDF:** Excellent (Primitives); good (Themes)
- **PPTX:** Works with react-pptx; CSS overhead depends on styling layer
- **Animation handling:** Same as Tailwind—CSS transitions don't export to static PDF
- **Quirks:** Primitives require manual styling every component; Themes lock you into design decisions

#### Recommended Stack for This Project
```
Radix UI Primitives + Tailwind CSS (or CSS-in-JS) + Framer Motion (optional) + custom or Recharts (for labs)
```

---

### 4. Material UI (MUI)

**What it is:** A complete, opinionated, enterprise-grade component library implementing Google's Material Design system.

#### Core Characteristics
- **Architecture:** Styled components library; CSS-in-JS via Emotion by default (can swap)
- **Framework:** React only
- **License:** MIT

#### Animation & Motion Support
- **Built-in:** Material Design transitions (Fade, Grow, Zoom, Slide); managed by `@mui/material/Transition`
- **Framer Motion:** Can integrate via custom components; some friction
- **Pattern:** Uses React Transition Group under the hood; more structured than free-form
- **Limitation:** Opinionated animation approach; extending beyond Material conventions is harder
- **Use case fit:** Good for standard Material Design animations; mediocre for bespoke motion design

#### Customization
- **Depth:** Moderate. You can override via `sx` prop, theme tokens, `styled()`, `makeStyles()`, but can't escape Material Design philosophy
- **Approach:** Theme configuration (colors, spacing, typography) + component-level overrides
- **Brand feel:** Can reskin to some extent, but "looks like Material" persists
- **Lock-in:** Higher than headless; visual identity is strongly opinionated

#### Bundle Weight
- **Typical:** 100+ KB gzipped (includes Emotion + Material Design CSS + all component logic)
- **Optimization available:** Tree-shaking, selective imports, but still heavier than headless
- **PDF/export friendly:** Medium. Larger payload; more CSS to render in Puppeteer
- **Issue:** Emotion dependency adds overhead

#### Component Coverage
- **Scope:** Massive. 100+ pre-built components (Button, Card, Dialog, TextField, Select, Table, DataGrid, etc.)
- **Slide deck:** Excellent coverage (Typography, Card, Container, Grid, Paper, etc.)
- **Practice labs:** Dialog, Form (TextField + validation), Select, Table, Modal, Popover
- **Data viz:** No built-in charts; partner with MUI X (separate, paid license) or external
- **Tables:** Table component included; advanced features in MUI X DataGrid
- **Forms:** TextField component; validation must be added separately
- **Strength:** Out-of-box completeness

#### Accessibility
- **Foundation:** WAI-ARIA compliant; built-in focus management, keyboard nav
- **Level:** High (AA–AAA depending on component)
- **Trade-off:** Less flexible accessibility than Radix; you get what Material Design prescribes

#### Maturity & Community
- **Adoption:** Highest in enterprise. 98k+ GitHub stars; 5.8M weekly npm downloads
- **Backing:** Mui (funded company); longest-standing major library
- **Ecosystem:** Massive. MUI X (advanced components, charts, date pickers), system, icons, etc.
- **Support:** Excellent. Documentation, Discord, GitHub support
- **Risk:** Very low; institutional backing

#### PDF/PPTX Export Considerations
- **HTML to PDF:** Good, but Emotion CSS-in-JS can be verbose in static exports
- **PPTX:** Works with react-pptx; larger bundle impacts server-side rendering performance
- **Animation handling:** Material transitions don't animate in static PDF
- **Quirks:** Emotion styles may have specificity issues in static rendering; test early

#### Recommended Stack for This Project
```
Material UI + Framer Motion (optional, if custom animations needed) + MUI X (if charts required; paid)
```

---

### 5. Chakra UI

**What it is:** A component library emphasizing accessibility, a powerful `useStyle` hooks system for customization, and optional Framer Motion integration.

#### Core Characteristics
- **Architecture:** CSS-in-JS via Emotion; component factory pattern; theming via context
- **Framework:** React only
- **License:** MIT

#### Animation & Motion Support
- **Built-in:** Chakra exports 5 transition components (Fade, ScaleFade, Slide, SlideFade, Collapse); built on Framer Motion
- **Framer Motion integration:** First-class. Uses Framer Motion under the hood; you can pass motion props via `chakra()` factory
- **Pattern:** `const MotionBox = chakra(motion.div)`; seamless animation composition
- **Use case fit:** Excellent for animation-rich presentations; Framer Motion is a core dependency
- **Strength:** Animation is intentional, not an afterthought

#### Customization
- **Depth:** High. Theme tokens (colors, spacing, fonts), component style overrides, `sx` prop
- **Approach:** `ChakraProvider` theme config + style props on components
- **Brand feel:** Can customize substantially, but Chakra's design language persists
- **Limitation:** Not as "white-label" as headless; harder to achieve radically different aesthetics

#### Bundle Weight
- **Core:** ~89 KB gzipped (Emotion + Framer Motion is ~31 KB of that)
- **Note:** Framer Motion is a required dependency (bundled)
- **PDF/export friendly:** Medium. Similar to Material UI; Emotion + Framer Motion add overhead
- **Concern:** Framer Motion dependency increases bundle for static-only projects

#### Component Coverage
- **Scope:** 50+ components (Button, Card, Dialog, Input, Select, Textarea, Table, Tabs, etc.)
- **Slide deck:** Good coverage (Box, Container, Heading, Text, Stack layouts, etc.)
- **Practice labs:** Dialog, Form (Input + validation patterns), Select, CheckBox, Radio, TextArea, Modal
- **Data viz:** Not included; integrate separately (Recharts, Victory, etc.)
- **Tables:** Table component included; basic semantic table
- **Forms:** Input component; form handling via external library (React Hook Form recommended)
- **Strength:** Good balance between completeness and flexibility

#### Accessibility
- **Foundation:** Every component has built-in WAI-ARIA support; keyboard nav, focus management, screen reader friendly
- **Level:** High (AAA-compliant; recognized in ThoughtWorks Tech Radar)
- **Claim:** "Best accessibility work" among component libraries per community surveys

#### Maturity & Community
- **Adoption:** Very high. 40k+ GitHub stars; 3.5k+ releases across packages
- **Backing:** Chakra (sponsored company; community-driven)
- **Ecosystem:** Large. Integrations, design tools, Chakra UI Blocks, theme marketplace
- **Support:** Active Discord, GitHub discussions
- **Recognition:** Open Source Awards, ThoughtWorks Technology Radar
- **Risk:** Low; well-established, well-funded

#### PDF/PPTX Export Considerations
- **HTML to PDF:** Good, but Emotion CSS-in-JS overhead similar to Material UI
- **PPTX:** Works with react-pptx; Framer Motion dependency means animations won't render in static export (design around this)
- **Animation handling:** Animations are client-side only; export workflow must handle static fallbacks
- **Quirks:** Emotion specificity; Framer Motion classes may complicate export flow

#### Recommended Stack for This Project
```
Chakra UI (includes Framer Motion) + React Hook Form (for labs) + Recharts (for charts)
```

---

## Comparison Matrix

### Evaluation Criteria & Scores

| Criterion | shadcn UI | Tailwind + Headless UI | Radix UI (Primitives) | Material UI | Chakra UI |
|-----------|-----------|------------------------|----------------------|-------------|-----------|
| **Animation/Motion Support** | Good* | Good** | Moderate | Good | Excellent |
| **Framer Motion Compatibility** | Excellent | Excellent | Excellent | Moderate | Excellent (built-in) |
| **Customization Freedom** | Excellent | Excellent | Excellent | Moderate | Good |
| **Bundle Weight (gzipped)** | 50 KB | 50–80 KB | 40–60 KB | 100+ KB | 89 KB |
| **Framework Lock-in** | React only | Both React & Vue | React only | React only | React only |
| **PDF Export Friendliness** | Excellent | Excellent | Excellent | Good | Good |
| **PPTX Export Support** | Excellent | Excellent | Excellent | Good | Good |
| **Component: Typography** | ✓ | ✓ (Tailwind) | ⚠ | ✓ | ✓ |
| **Component: Layout** | ✓ | ✓ | ⚠ | ✓ | ✓ |
| **Component: Badges/Callouts** | ✓ | ⚠ | ⚠ | ✓ | ✓ |
| **Component: Code Block** | ✓ | ⚠ | ✗ | ✓ | ✗ |
| **Component: Forms** | ✓ | ✗ (must use React Hook Form) | ✓ (Radix Form) | ✓ | ✓ |
| **Component: Dialog/Modal** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Component: Tables** | ✓ (pattern) | ✗ (must build) | ⚠ (Themes only) | ✓ | ✓ |
| **Component: Charts/Data Viz** | ⚠ (integrate Recharts) | ⚠ (integrate) | ✗ | ⚠ (separate package) | ⚠ (integrate) |
| **Community Size** | Huge (70k+ stars) | Huge (Tailwind 70k+ stars) | Very Large (13k+ stars) | Largest (98k+ stars) | Very Large (40k+ stars) |
| **Maturity** | Established (2023+) | Mature (long-standing) | Very Mature | Most Mature (oldest) | Very Mature |
| **Corporate Backing** | Community-driven | Tailwind Labs | WorkOS | MUI | Chakra (community-driven) |
| **Accessibility (WAI-ARIA)** | High (via Radix) | High | AAA (native) | AAA | AAA (best-in-class) |

**Legend:**
- ✓ = Included, production-ready
- ⚠ = Partial or requires integration
- ✗ = Not included; requires separate library
- \* = Requires Framer Motion integration (easy)
- \*\* = Tailwind animations are CSS-only; Framer Motion integration required for complex choreography

---

## Scenario-Driven Recommendations

### Scenario 1: "Slide Deck Only, Minimal Interactivity"
**Use case:** Linear 120-minute presentation with CSS-based transitions, no interactive demos.

**Top Picks:**
1. **shadcn UI + Tailwind** (recommended)
   - Minimal bundle for fast PDF rendering
   - Excellent control over slide styling
   - Clean HTML export via Puppeteer
   - CSS transitions sufficient for slide effects
   - Framer Motion optional if you want choreography

2. **Tailwind CSS + Headless UI** (alternative)
   - More explicit separation of structure and style
   - Slightly more verbose for pure CSS transitions
   - Good if you want to avoid Radix dependency

**Avoid:** Material UI, Chakra UI (overkill; bring unnecessary overhead)

**Suggested Tech Stack:**
```
shadcn UI + Tailwind CSS + native CSS transitions (no Framer Motion)
→ Static export via Puppeteer to PDF
→ Minimal runtime JS; clean HTML
```

---

### Scenario 2: "Slide Deck + Lab Demos with Forms/Charts"
**Use case:** Presentation with interactive practice exercises (form submissions, data display, simple charts).

**Top Picks:**
1. **shadcn UI + Tailwind + Framer Motion + Recharts** (recommended)
   - Full control over slide styling
   - Form component ready-to-use
   - Dialog/Modal for lab exercises
   - Integrate Recharts for chart demos
   - Powerful animation orchestration
   - Still lightweight for export

2. **Chakra UI + React Hook Form + Recharts** (alternative)
   - Forms and dialog built-in
   - Framer Motion already integrated
   - Faster initial development
   - Higher bundle (not critical if labs are interactive, not exported)
   - Best-in-class accessibility for form interactions

3. **Radix UI Primitives + Tailwind + Framer Motion + Recharts** (advanced)
   - Maximum customization
   - Lower-level control (more boilerplate)
   - Excellent for teams comfortable with CSS

**Avoid:** Material UI (overstylized for custom slide design), Tailwind alone (lacks form/dialog components)

**Suggested Tech Stack:**
```
shadcn UI (or Chakra UI) 
+ Framer Motion (for choreographed animations)
+ Recharts or Victory (for charts)
+ React Hook Form (for form validation)
→ Slides exported to PDF (static; animations become CSS/SVG)
→ Labs remain interactive (HTML or embedded in slides)
```

---

### Scenario 3: "Want Maximum Bespoke Design Control"
**Use case:** Heavy custom brand identity; animations and layouts that don't follow Material Design or Chakra's aesthetic.

**Top Picks:**
1. **shadcn UI + Tailwind CSS** (recommended)
   - Own every component file
   - Infinite Tailwind customization
   - No visual framework lock-in
   - Excellent for mining-industry branding (bold, custom colors)

2. **Radix UI Primitives + custom CSS or CSS-in-JS** (alternative)
   - Lowest-level control
   - Requires most styling effort
   - Maximum flexibility
   - Harder for fast iteration

**Avoid:** Material UI, Chakra UI (visual identity persists despite customization)

**Suggested Tech Stack:**
```
shadcn UI (copy code into project, modify freely)
+ Tailwind CSS (custom config for brand colors, fonts)
+ Framer Motion (choreographed, branded animations)
+ custom CSS or Tailwind for unique layouts
→ Fully owned design system
→ No framework aesthetics to fight against
```

---

### Scenario 4: "Want Fast Iteration (Prototyping Speed)"
**Use case:** Content still TBD; rapid iteration on slide layouts, forms, interactivity.

**Top Picks:**
1. **Chakra UI + Framer Motion + React Hook Form** (recommended)
   - Largest component library out-of-box
   - Fastest to prototype (pre-styled, working)
   - Framer Motion integration already done
   - Form validation patterns ready-to-use
   - Excellent docs and community examples
   - High accessibility means fewer surprises

2. **shadcn UI** (alternative if customization matters)
   - Fast iteration with copy-paste components
   - Can customize on-the-fly as design stabilizes
   - Growing ecosystem of blocks and templates

**Avoid:** Radix UI Primitives (slower; more CSS to write)

**Suggested Tech Stack:**
```
Chakra UI (fast, opinionated, accessible)
+ React Hook Form (form validation patterns)
+ Recharts (charts; or Chakra + custom)
+ Framer Motion (already built-in)
→ Iterate quickly on content
→ Refactor to shadcn if brand customization becomes critical
```

---

## Stacking Notes: Recommended Component Combinations

### Best Combinations for This Use Case

#### 1. **shadcn UI + Tailwind CSS + Framer Motion** (Recommended for Scenarios 1–3)
```
Strengths:
✓ You own all code (copy-paste)
✓ Infinite Tailwind customization for brand
✓ Lightweight bundle (ideal for PDF export)
✓ Excellent animation library via Framer Motion
✓ Radix accessibility baked in (via shadcn)
✓ Large ecosystem (Shadcn Blocks, Aceternity UI, etc.)

Weaknesses:
✗ No opinionated form validation (must use React Hook Form or Formik)
✗ No charts built-in (must integrate Recharts, Victory, etc.)
✗ Slightly more boilerplate than Material UI or Chakra

Trade-off: More control = more work, but pays off for unique designs

Best for: Custom branding, animation-heavy slides, teams comfortable with React
```

#### 2. **Chakra UI + Framer Motion + React Hook Form + Recharts** (Recommended for Scenario 4)
```
Strengths:
✓ Fastest prototyping (pre-styled components)
✓ Framer Motion built-in (no extra setup)
✓ Form validation patterns ready-to-use
✓ Best accessibility out-of-box
✓ Large component library (minimal external deps)

Weaknesses:
✗ Visual design persists even with customization
✗ Larger bundle (Emotion + Framer Motion overhead)
✗ Less control for radical brand overhauls

Trade-off: Speed now = harder to rebrand later if design changes

Best for: Fast iteration, accessibility-first projects, teams prioritizing speed
```

#### 3. **Radix UI Primitives + Tailwind CSS + Framer Motion** (Advanced; Scenarios 2–3)
```
Strengths:
✓ Maximum low-level control
✓ Smallest primitive bundle (tree-shakeable)
✓ Excellent accessibility (AAA native)
✓ Works with any CSS strategy

Weaknesses:
✗ Most boilerplate (must style every component)
✗ Slowest time-to-prototype
✗ Requires CSS/Tailwind expertise

Trade-off: Lowest-level control = highest effort

Best for: Teams comfortable with unstyled components, existing design systems
```

#### ❌ NOT Recommended
- **Material UI alone** (too opinionated; Material Design aesthetic hard to escape; overkill for slides)
- **Tailwind + Headless UI without Framer Motion** (weak animation story)
- **Radix Themes** (pre-styled, less customizable than Primitives; not worth the overhead)

---

## Caveats & Open Questions

### Content-Dependent Decisions

The following questions should be resolved **before finalizing the architecture**:

1. **Animation Complexity**
   - Are there scene-choreographed animations (multiple elements animating in sequence)?
   - Or simple slide transitions (CSS-based, one element at a time)?
   - → **Framer Motion needed?** → Choose Chakra UI or add Framer Motion to shadcn/Tailwind/Radix

2. **Interactive Lab Demos**
   - How many interactive components (forms, charts, tables) do you need?
   - Will they be embedded in slides or separate pages?
   - → **If heavy:** Chakra or shadcn with React Hook Form + Recharts
   - → **If light:** shadcn or Tailwind with minimal additions

3. **Export Requirements (Critical)**
   - Final delivery: PDF only? PDF + PPTX?
   - Will animations be included in PDF (as GIFs/video) or stripped?
   - → **Static PDF:** Bundle weight matters; shadcn/Tailwind win
   - → **PPTX generation:** Use PptxGenJS or react-pptx; test early with your library

4. **Browser/Device Constraints**
   - Will the live presentation run in a browser (Firefox, Chrome, Safari)?
   - PDF for offline viewing?
   - → **If browser-based:** Framer Motion and advanced animations are fine
   - → **If PDF-only:** Animations become static; CSS transitions don't export

5. **Brand Customization**
   - Is there a Nanovest/Sinarmas brand guide (colors, fonts, logo treatment)?
   - Can the mining-industry audience accept Material Design or Chakra aesthetics?
   - → **If bespoke required:** shadcn + Tailwind (you own every pixel)
   - → **If "good enough" suffices:** Chakra or Material UI (faster iteration)

6. **Chart Types**
   - What data visualizations are needed (simple bars, time series, pie, custom)?
   - Existing charting library preference (Recharts, Chart.js, D3, Victory)?
   - → **If Recharts:** All libraries work fine (integrate as needed)
   - → **If custom D3:** Same; no library restriction

7. **Accessibility Audit Required?**
   - Will slides be tested for WCAG 2.1 AA or AAA compliance?
   - → **If yes:** Chakra UI or Radix UI (best-in-class a11y)
   - → **If no:** Any library is fine (all meet baseline)

---

## Architecture Decision Tree

Use this flowchart to pick a library once content is known:

```
START
│
├─ Is animation a core design goal?
│  ├─ YES → Is custom brand identity critical?
│  │        ├─ YES → shadcn UI + Framer Motion
│  │        └─ NO → Chakra UI (Framer Motion built-in)
│  │
│  └─ NO → Is custom brand identity critical?
│           ├─ YES → shadcn UI + Tailwind (minimal animation overhead)
│           └─ NO → Chakra UI (no animation wasted; pre-styled)
│
└─ Are labs heavily interactive?
   ├─ YES (forms, charts, dialogs) → Chakra UI or shadcn UI
   └─ NO (mostly display) → Any library (shadcn simplest)

FINAL CHECK:
├─ PDF export critical? → shadcn (lightest bundle)
├─ PPTX export needed? → Test PptxGenJS early (all libraries work)
├─ Accessibility audit? → Chakra or Radix (AAA native)
└─ Content frozen? → Start building; can refactor later
```

---

## Citations & References

### Component Libraries
- [shadcn/ui](https://ui.shadcn.com/)
- [shadcn/ui GitHub](https://github.com/shadcn-ui/ui)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI GitHub](https://github.com/tailwindlabs/headlessui)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Radix UI Themes](https://www.radix-ui.com/themes)
- [Radix UI GitHub](https://github.com/radix-ui/primitives)
- [Material UI (MUI)](https://mui.com/material-ui/)
- [Material UI GitHub](https://github.com/mui/material-ui)
- [Chakra UI](https://chakra-ui.com/)
- [Chakra UI GitHub](https://github.com/chakra-ui/chakra-ui)

### Bundle Size & Performance
- [shadcn UI Bundle Size Analysis - Bundlephobia](https://bundlephobia.com/package/shadcn-ui)
- [Chakra UI Bundle Size Discussion](https://github.com/chakra-ui/chakra-ui/discussions/5277)
- [Material UI Minimizing Bundle Size Guide](https://mui.com/material-ui/guides/minimizing-bundle-size/)
- [Tailwind CSS Bundle Size Comparison](https://designrevision.com/blog/best-tailwind-component-libraries)
- [FredericHeem/component-library-bundle-size Comparison](https://github.com/FredericHeem/component-library-bundle-size)

### Animation Libraries
- [Framer Motion / Motion Documentation](https://motion.dev/)
- [Framer Motion GitHub](https://github.com/motiondivision/motion)
- [Chakra UI + Framer Motion Integration Guide](https://v2.chakra-ui.com/getting-started/with-framer)
- [shadcn/ui Animation Ecosystems](https://www.shadcn.io/awesome/animations)
- [Motion Primitives for shadcn](https://allshadcn.com/tools/motion-primitives/)
- [Aceternity UI - Tailwind + Framer Motion](https://ui.aceternity.com/)
- [Top React Animation Libraries 2026 - LogRocket](https://blog.logrocket.com/best-react-animation-libraries/)

### PDF & PPTX Export
- [React Puppeteer PDF Generation - DEV Community](https://dev.to/jordykoppen/turning-react-apps-into-pdfs-with-next-js-nodejs-and-puppeteer-mfi)
- [PptxGenJS - PPTX Generation](https://gitbrent.github.io/PptxGenJS/)
- [react-pptx GitHub](https://github.com/wyozi/react-pptx)
- [Puppeteer HTML to PDF - RisingStack Engineering](https://blog.risingstack.com/pdf-from-html-node-js-puppeteer/)

### Slide Deck Frameworks (Reference)
- [reveal.js](https://revealjs.com/)
- [Spectacle GitHub](https://github.com/FormidableLabs/spectacle)
- [MDX Deck GitHub](https://github.com/jxnblk/mdx-deck)
- [Slidev](https://sli.dev/)
- [Slide-CN](https://www.slide-cn.com/)

### Comparative Analysis & Decision Guides
- [DesignRevision: Best React Component Libraries 2026](https://designrevision.com/blog/best-react-component-libraries)
- [Boundev: Best UI Component Libraries 2026](https://www.boundev.ai/blog/best-ui-component-libraries-modern-development)
- [PkgPulse: shadcn/ui vs Base UI vs Radix 2026](https://www.pkgpulse.com/guides/shadcn-ui-vs-base-ui-vs-radix-components-2026)
- [Makers' Den: React UI Libraries 2025 Comparison](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra)
- [LogRocket: Radix UI Adoption Guide](https://blog.logrocket.com/radix-ui-adoption-guide/)
- [Tailwind CSS vs shadcn/UI Comparison](https://www.swhabitation.com/blogs/tailwind-css-vs-shadcn-which-should-you-choose-for-your-next-project)

### Accessibility & Standards
- [Radix UI Primitives: Accessibility Guide](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [Radix UI Primitives: Animation Guide](https://www.radix-ui.com/primitives/docs/guides/animation)
- [Headless UI Accessibility Features](https://headlessui.com/)

---

## Appendix: Next Steps

### Immediate Actions
1. **Finalize presentation content** (Section 4: Caveats — questions 1–7)
2. **Prototype with leading pick** (shadcn UI recommended as safe default)
3. **Build and test 2–3 slide samples** with animations
4. **Test PDF/PPTX export pipeline** early (use Puppeteer + your library choice)
5. **Gather brand guidelines** (Nanovest, Sinarmas Mining colors, fonts, logo)

### Evaluation Phase (After Content Freeze)
1. **Measure bundle size** (gzipped) for your specific slide deck
2. **Test PDF export** with animations (static fallback needed)
3. **Verify form/chart interactivity** in practice labs
4. **Conduct accessibility audit** if required by stakeholders
5. **Get design/content team feedback** on visual aesthetics

### Implementation Phase
1. Set up project with chosen stack (see Recommended Tech Stack sections)
2. Build component library tailored to Nanovest brand
3. Implement speaker notes and slide navigation
4. Integrate Framer Motion (if animation-heavy)
5. Set up export pipeline (Puppeteer for PDF; PptxGenJS for PPTX if needed)

---

**Document Version:** 1.0  
**Last Updated:** May 6, 2026  
**Authored for:** Nanovest AI Workshop (120 minutes, ~400 attendees, Sinarmas Mining Group)
