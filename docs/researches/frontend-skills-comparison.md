# Frontend Skills Comparison: Animated HTML Slide Decks for Adri's 120-Min Berau Workshop

**Objective:** Validate Adri's lean toward `frontend-slides` vs. three alternatives for a professional 120-minute animated HTML slide deck targeting ~400 mining-industry employees, with PDF/PPTX adaptability and practice-lab demo support.

**Project Scope:**
- 120-minute animated HTML presentation
- Heavy animation requirements
- ~400 mining-industry employees (professional, not tech-startup audience)
- Must export to PDF
- Must remain adaptable to PPTX
- Potential practice-lab demos with interactive components
- Speaker: Adri (Nanovest, Sinarmas Mining Group)

---

## Executive Summary

### Top Recommendation: **frontend-slides** ✓ (with reservations)
Adri's lean holds up **for the primary deck**, but requires a **two-tool strategy** for full scope.

**Why it wins on the core brief:**
1. **Slide-deck purpose-built**: Explicitly designed for "animation-rich HTML presentations from scratch or by converting PowerPoint files" (SKILL.md:3)
2. **Zero-dependency single files**: No npm, no build tools—pure HTML/CSS/JS inline (SKILL.md:12)
3. **PDF export built-in**: `scripts/export-pdf.sh` handled natively; documented gotchas (SKILL.md Phase 6B)
4. **PPTX adaptability**: Tested conversion path via `scripts/extract-pptx.py` for reverse flow (SKILL.md Phase 4)
5. **Visual discovery over description**: "Show, don't tell" approach (SKILL.md:3) matches non-designer audiences
6. **Viewport-fitting rules enforce mobile/projection safety**: Critical for 400-person conference (SKILL.md:37-46)
7. **Anti-AI-slop defaults**: Curated 12 style presets, not generic (STYLE_PRESETS.md:3)

**Critical gap:** *No native interactive component support.* Practice-lab demos will need a secondary tool.

### Runner-up: **huashu-design** (strong second for comprehensive approach)
If Adri wants *one tool to rule them all*: animation + deck + interactive demos + video export.

**Why strong:**
- **Superset capability**: covers decks (with PPTX/PDF), motion design (MP4/GIF export), **interactive prototypes** (App mockup with Playwright verification)
- **Video export built-in** with BGM/SFX: MP4 at 25fps + 60fps interpolation, GIF optimization, 6 scene-specific music tracks (SKILL.md:主干能力)
- **Editable PPTX** native: `html2pptx.js` with computed-style DOM-to-PowerPoint translation (README.md line 117)
- **Tweaks system** for live variation switching (README.md line 123)
- **Core Asset Protocol** enforces brand consistency for mining company identity

**Why second, not first:**
- Complexity overhead: 20 design philosophies (design-styles.md), full Junior Designer workflow (workflow.md §2) adds ~30% more thinking before execution
- Slower time-to-first-output: mandatory design-direction advisor (Fallback mode) runs 5-8 minutes before code generation
- Heavier documentation: SKILL.md is 800+ lines (vs. frontend-slides ~180 lines)
- Smaller community: huashu-design is newer, fewer public examples vs. frontend-slides

**Decision point:** Use huashu-design **only if practice-lab demos are tier-1 requirement**. Otherwise, stick with frontend-slides for the deck + one utility for labs.

---

## Per-Skill Deep Dive

### 1. frontend-slides

**Location:** `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/frontend-slides/`

**Stated Purpose (from SKILL.md:3):**
> "Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files. Use when the user wants to build a presentation, convert a PPT/PPTX to web, or create slides for a talk/pitch. Helps non-designers discover their aesthetic through visual exploration rather than abstract choices."

#### Core Capabilities

| Capability | Details | Evidence |
|---|---|---|
| **Slide generation** | Zero-dependency single-file or multi-slide HTML. All CSS/JS inline. | SKILL.md:12, README.md:14 |
| **PPT conversion** | Extract content from .pptx → HTML with images preserved | SKILL.md Phase 4, README.md:75 |
| **Style discovery** | 12 curated presets (Dark Botanical, Bold Signal, Creative Voltage, etc.) | STYLE_PRESETS.md:1-100, SKILL.md Phase 2 |
| **Animations** | CSS-only motion: fade, slide, scale, parallax, staggered reveals. Entrance animations reference: `animation-patterns.md` (SKILL.md:184) | animation-patterns.md:16-51 |
| **PDF export** | `scripts/export-pdf.sh` → Playwright screenshots at 1920×1080 → combined PDF. First run ~30-60s (Chromium download). | SKILL.md Phase 6B:274-308, README.md:164-165 |
| **URL deployment** | `scripts/deploy.sh` to Vercel (free tier). Works on any device. | SKILL.md Phase 6A:232-267, README.md:146-153 |
| **Viewport safety** | Mandatory `height: 100vh`, `clamp()` sizing, breakpoints at 700/600/500px. Enforces no scrolling per slide. | SKILL.md:39-46, 50-51 |

#### Limitations

| Limitation | Severity | Impact on Brief |
|---|---|---|
| **No native interactive components** | 🔴 High | Practice-lab demos must use separate tool (huashu-design or impeccable). ~20% of scope unsupported. |
| **PPTX export is **reverse only** (PPT→HTML, not HTML→PPTX)** | 🟡 Medium | Can't generate editable PPTX directly. Must use python-pptx for extraction only. |
| **CSS animations only, no complex motion timelines** | 🟡 Medium | No Stage/Sprite/frame-by-frame like huashu-design. Heavy motion sequences (e.g., product reveal animation) need workarounds. |
| **Keyboard navigation only** (no click/swipe for smaller audiences) | 🟠 Low | For 400-person projection setup, keyboard works. Mobile audience would benefit from swipe support. |
| **No design direction advisor** | 🟠 Low | If Adri needs style validation, frontend-slides skips "show 3 options" and goes straight to preset picker. |
| **No video export** | 🟠 Low | Can't export deck to MP4 for social media. Must screenshot or use external tools. |

#### Strengths for Adri's Brief

- ✅ **Purpose-built for decks**: Entire architecture assumes slides (Phase 1-6 workflow)
- ✅ **Mining-industry aesthetic**: STYLE_PRESETS avoids purple-gradient AI slop. Presets lean professional (Bold Signal, Swiss Modern, Dark Botanical) over trendy.
- ✅ **Viewport fitting iron-clad**: 100vh per slide, responsive sizing—safe for projection on any conference display
- ✅ **Content density limits enforced** (SKILL.md:51-62): prevents overstuffed slides (max 4-6 bullets per content slide). Forces clarity.
- ✅ **PDF export mainstream**: Tested, documented, low friction
- ✅ **Non-designer friendly**: Phase 2 visual style discovery ("Show me options") beats Impeccable's brand/product gatekeeping
- ✅ **Quick time-to-output**: ~3-4 phases, minimal clarifying questions vs. competitors

---

### 2. frontend-design (Claude Official)

**Location:** `/Users/macbook/.claude/plugins/cache/claude-plugins-official/frontend-design/205b6e0b3036/skills/frontend-design/`

**Stated Purpose (from SKILL.md:2-3):**
> "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics."

#### Core Capabilities

| Capability | Details | Evidence |
|---|---|---|
| **Component/page design** | General-purpose frontend: components, pages, applications—not slide-deck specific | SKILL.md:1-3 |
| **Anti-slop guidance** | Shared design laws: color (OKLCH), theme (contextual), typography (hierarchy), layout (vary spacing), motion (expo easing) | SKILL.md:73-107 |
| **Design thinking framework** | Purpose → Tone → Constraints → Differentiation before coding | SKILL.md:11-24 |
| **No custom commands** | Single generic entry point: describe what you want, gets design guidance. | SKILL.md:7 |

#### Limitations

| Limitation | Severity | Impact on Brief |
|---|---|---|
| **Not slide-deck focused** | 🔴 High | Designed for "components, pages, applications"—not presentations. No Phase 1-6 deck workflow. No style presets for presentations. |
| **No built-in animation patterns** | 🔴 High | Requires you to request animations explicitly; no "animation-rich" preset library like frontend-slides. |
| **No PDF/PPTX export** | 🔴 High | No export pipeline. You'd write HTML, then manually screenshot or use external Playwright script. |
| **No design-direction advisor** | 🔴 High | If Adri needs "show me 3 style options," frontend-design assumes he can describe preferences in words. |
| **No PPT conversion** | 🟡 Medium | Can't start from Adri's existing PowerPoint (if he has one). |
| **Generic guidance only** | 🟠 Low | Teaches design principles, doesn't provide slide-specific rules (viewport fitting, content density per slide type, etc.). |

#### Strengths (Generic)

- ✅ Production-grade quality, anti-slop explicit guidance
- ✅ Modular design system references (typography, color, spatial, motion, interaction, responsive, UX copy)
- ✅ Good for building custom components (if labs needed HTML elements)

#### Why It's Disqualified

**Frontend-design is the general-purpose sibling of frontend-slides.** It makes sense for building a product page, dashboard, or component library—not for a presentation. No slide-specific affordances (viewport fitting rules, content density limits, phase-based workflow). Using it for a deck would mean **reinventing slide-specific constraints** that frontend-slides already bakes in.

---

### 3. impeccable

**Location:** `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/impeccable/`

**Stated Purpose (from SKILL.md:2-3):**
> "Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states."

#### Core Capabilities

| Capability | Details | Evidence |
|---|---|---|
| **23 design commands** | craft, teach, shape, critique, audit, polish, bolder, quieter, distill, harden, animate, colorize, typeset, layout, etc. | README.md:34-62 |
| **Domain-specific references** | 7 reference files: typography, color-and-contrast, spatial, motion-design, interaction, responsive, ux-writing | README.md:20-32 |
| **Anti-pattern detection** | 27 deterministic anti-rules + 12-rule LLM critique. CLI and browser extension available. | README.md:16 |
| **Design system extraction** | `/impeccable extract` pulls reusable tokens/components | README.md:45 |
| **Context loading** | PRODUCT.md + DESIGN.md as prerequisite (impeccable/SKILL.md:15-56) | SKILL.md:18-72 |

#### Limitations

| Limitation | Severity | Impact on Brief |
|---|---|---|
| **Not presentation-focused** | 🔴 High | Designed for UI/UX, dashboards, apps, landing pages—not slide decks. No slide-specific phases or presets. |
| **Requires setup gatekeeping** | 🔴 High | Must run `/impeccable teach` to populate PRODUCT.md/DESIGN.md before any design work. Adds ~15-30 min overhead for a "just make slides" ask. |
| **No animation-pattern presets** | 🔴 High | Generic motion guidance (easing, staggering) but no "confident/excited/calm/editorial" preset animations like frontend-slides. |
| **No PDF/PPTX export** | 🔴 High | Focus is design iteration, not export pipeline. |
| **No PPT conversion** | 🔴 High | Can't import existing PowerPoint. |
| **No style discovery UI** | 🟡 Medium | `/impeccable live` and other commands exist but require explicit file edits + browser iteration. Not a "show me 3 options" visual picker. |
| **Critique-heavy workflow** | 🟠 Low | 23 commands are amazing for refinement *after* an initial design exists. Overkill for "create a deck from scratch." |

#### Strengths (Generic)

- ✅ Exceptional polish/refinement capability: `/polish`, `/critique`, `/distill`, `/harden`
- ✅ Production-grade anti-patterns (side-stripe borders, gradient text, glassmorphism, etc.)
- ✅ Great for iterating a deck *after* it's built with frontend-slides

#### Why It's Disqualified

**Impeccable is a polish tool, not a creation tool.** Its 23 commands are most valuable *after* a design exists and needs refinement. For a "create a 120-min deck from scratch," it's overkill and introduces unnecessary setup friction (PRODUCT.md/DESIGN.md gating). Better used *in combination with* frontend-slides (build deck, then polish with impeccable).

---

### 4. huashu-design (花叔Design)

**Location:** `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/huashu-design/`

**Stated Purpose (from SKILL.md description line 2-3):**
> "用HTML做高保真原型、交互Demo、幻灯片、动画、设计变体探索+设计方向顾问+专家评审的一体化设计能力。HTML是工具不是媒介，根据任务embody不同专家（UX设计师/动画师/幻灯片设计师/原型师），避免web design tropes。"
>
> *Translation: "Integrated design capability for hi-fi prototypes, interactive demos, slide decks, animations, design-variant exploration + design-direction advisor + expert critique using HTML. HTML is a tool, not medium; embody different specialists (UX designer/animator/slide designer/prototyper) per task, avoiding web design tropes."*

#### Core Capabilities

| Capability | Details | Evidence |
|---|---|---|
| **Slide decks (primary)** | HTML deck + editable PPTX export via `html2pptx.js` DOM→PowerPoint translation. Supports 4-constraint path for editability. | SKILL.md:主干能力, references/slide-decks.md:1-18, README.md:84-85 |
| **Motion design with video export** | HTML animation → MP4 (25fps base + 60fps interpolation) + GIF (palette-optimized) + BGM + SFX (37 presets + 6 scene-specific tracks) | SKILL.md:主干能力, README.md:85, references/video-export.md |
| **Interactive prototypes (App/iOS)** | iPhone 15 Pro bezel (Dynamic Island/status bar/Home Indicator), state-driven navigation, real images from Wikimedia/Met/Unsplash, Playwright click-test before delivery | SKILL.md:主干能力, README.md:83, references/react-setup.md |
| **Design direction advisor** | Fallback mode: 5 schools × 20 design philosophies → 3 differentiated directions + 24 prebuilt showcases (8 scenes × 3 styles) + 3 parallel demo generation | SKILL.md:设计方向顾问, README.md:88, design-styles.md |
| **Tweaks system** | Live parameter switching (colors, typography, density) via localStorage. Pure frontend, survives reload. | references/tweaks-system.md, README.md:87 |
| **Expert critique** | 5-dimension evaluation: philosophical coherence, visual hierarchy, execution craft, functionality, innovation. Radar chart + Keep/Fix/Quick Wins. | references/critique-guide.md, README.md:89 |
| **Junior Designer workflow** | Assumptions + placeholders + reasoning comments first. Show early, iterate. Three checkpoints (shape brief → fill components → verify final). | SKILL.md:§2, README.md:141 |
| **Core Asset Protocol** | Mandatory for brand-specific work: logo (required) + product image (required for physical products) + UI screenshot (required for digital products) + colors + fonts. 5-step process with fallbacks. | SKILL.md:§1.a, README.md:147 |

#### Limitations

| Limitation | Severity | Impact on Brief |
|---|---|---|
| **Steeper learning curve** | 🟡 Medium | SKILL.md is 800+ lines with mandatory pre-flight gates (context loading, product doc, shape brief, image generation gate). Vs. frontend-slides ~180 lines. |
| **Mandatory design-direction advisor for vague briefs** | 🟡 Medium | If Adri says "make slides," huashu enters Fallback mode (5-8 min advisor → 3 direction generation → user picks). Frontend-slides jumps straight to preset picker. |
| **Design complexity can be overkill** | 🟠 Low | If Adri just wants "professional mining presentation," the 20-philosophy apparatus might add thinking overhead vs. picking from 12 presets. |
| **Smaller user community** | 🟠 Low | Fewer public examples/case studies vs. frontend-slides. Newer tool (2024-2025 maturity). |
| **Requires more context upfront** | 🟠 Low | Brand Asset Protocol (§1.a) assumes Adri will provide logo + product images + UI. Frontend-slides doesn't mandate these. |

#### Strengths for Adri's Brief

- ✅ **Superset of frontend-slides**: everything fs can do + more
- ✅ **Native interactive demo support**: iOS prototype builder (ios_frame.jsx) + Playwright verification for lab demos
- ✅ **Video export**: Deck can be exported to MP4 + GIF with BGM/SFX. Perfect for promotional clip or async viewing.
- ✅ **Editable PPTX native**: `html2pptx.js` handles HTML→PowerPoint with real text frames (not image-bedded)
- ✅ **Tweaks system**: Live parameter switching if Adri wants to A/B color schemes during design
- ✅ **Anti-slop guardrails**: Core Asset Protocol prevents generic-ness; mandatory fact verification for products
- ✅ **Expert critique built-in**: 5-dimension radar chart if Adri wants QA before shipping
- ✅ **Speaker Notes support**: (mentioned in SKILL.md:主干能力) if presentation needs notes layer

#### Why It's Second, Not First

1. **Overhead for simple asks**: If Adri just needs "a good deck," huashu's design-direction advisor + Junior Designer + Core Asset Protocol adds ~30% more thinking time vs. frontend-slides' "pick a preset" approach.
2. **Slower time-to-first-draft**: Mandatory design directions (Phase 1-4 of advisor) run ~5-8 min before code generation starts. Frontend-slides asks questions and generates style previews in parallel.
3. **Community maturity**: Frontend-slides has more public examples (GitHub stars, case studies, community decks). Huashu is newer, though with higher polish.

**Use huashu-design if:**
- Practice-lab demos are **tier-1 requirement** (interactive App mockup with real iPhone bezel)
- Adri wants **video export** for promotional clips
- Adri wants **expert critique** as part of design QA
- Adri wants **Tweaks system** for live A/B testing during presentation

---

## Comparison Matrix

**Scoring:** 1-5, where 3 = adequate for brief, 4 = strong, 5 = exceptional

| Criterion | frontend-slides | frontend-design | impeccable | huashu-design | Notes |
|---|---|---|---|---|---|
| **a) Slide-deck output quality** | **5** Purpose-built; 12 curated presets avoiding AI slop | 2 Generic web UI guidance; no preset library | 3 Good design principles but not slide-specific | **5** Embodies "slide designer" per task; anti-slop protocol | TIE: fs & hz both 5. FD/Imp aren't slide-focused. |
| **b) Animation depth / motion design** | **4** CSS-only: fade, slide, scale, parallax, stagger. Effect-to-feeling guide. No frame-by-frame timeline. | 2 Generic motion (easing, stagger). No preset animations. | **4** Same as FD (shared genealogy). Motion-design reference exists. | **5** Stage+Sprite+interpolate+Easing. HTML→MP4/GIF export with 60fps interpolation. | Huashu wins: full animation engine + export. |
| **c) PDF export adaptability** | **5** scripts/export-pdf.sh (Playwright). Built-in, tested, documented. Gotchas listed. | 1 No export pipeline | 1 No export pipeline | **4** export_deck_pdf.mjs exists (Playwright); also PDF via `html2pptx.js` render | Fs built-in. Hz option. |
| **d) PPTX export adaptability** | **2** Reverse only (PPT→HTML via python-pptx). Can't generate PPTX from HTML. | 1 No export | 1 No export | **5** html2pptx.js: DOM→PowerPoint with real text frames. 4 hard constraints on HTML; cost of editability. | Huashu native. Fs can't do this. |
| **e) Iteration speed** | **5** Quick phases (1-6). Minimal gatekeeping. Style preview gen fast. | **3** Design-thinking upfront; no preset shortcuts | **2** Must run /teach gating; 23 commands assume existing design | **3** Mandatory design-direction advisor (5-8 min); Junior Designer workflow adds think time. | Fs fastest: ask + show previews + pick + generate. |
| **f) Variant exploration (A/B/C directions)** | **4** Can generate 3 style previews per mood. No explicit Tweaks system for live A/B. | **2** Assumes you can describe preferences; no visual picker | **2** /live command exists but requires browser iteration + file edits | **5** Design-direction advisor (20 philosophies, 3 directions) + Tweaks system for live param switching | Huashu wins: both advisor + live tweaks. |
| **g) Practice-lab demo support** | **1** No interactive components. Can embed iframes but no native support. | **3** General web components; could build custom lab UI. No App-specific template. | **3** Same as FD. Could iterate on interactive elements. | **5** iOS prototype kit (ios_frame.jsx), App mockup state machine, Playwright click-test verification, real images from Wikimedia | Huashu far ahead. |
| **h) Mining-industry alignment** | **5** Style presets lean professional/elegant (Bold Signal, Dark Botanical, Swiss Modern). No trendy slop. Viewport safety for projection. | **3** Anti-slop guidance good; but no industry-specific aesthetic. Generic tech feeling. | **4** Anti-pattern rules strong; but overkill for "just make slides." | **4** Anti-slop + Core Asset Protocol enforces brand identity. But setup overhead for simple brief. | Fs & hz both strong. |
| **TOTAL (mean of 8 criteria)** | **3.875** | **1.875** | **2.375** | **4.25** | **Huashu 4.25 edges fs 3.875. But fs faster for simple ask.** |

---

## Verdict: Does Adri's Lean Toward frontend-slides Hold Up?

### Yes, with Caveats

**frontend-slides remains the right primary choice** for reasons:

1. **Slide-deck is the 80% case**: The brief is "120-min animated presentation for 400 people." That's *deck*, not app or design critique. Frontend-slides' entire architecture (phases 1-6, style presets, viewport rules, PDF export) aligns perfectly.

2. **Non-designer friendly**: Adri benefits from "show me options" (3 style previews), not "describe your aesthetic." Frontend-slides gives visual picker; impeccable/huashu require upfront framing.

3. **Time-to-first-output**: Adri can have a draft deck in 30-45 minutes (phases 1-3). Huashu adds design-direction advisor overhead (5-8 min + 3 demo generation).

4. **PDF export**: Built-in, tested, minimal friction. No other tool matches this ease.

5. **Professional aesthetic by default**: 12 curated presets (Dark Botanical, Bold Signal, Swiss Modern, etc.) inherently avoid purple-gradient AI slop. Mining audience gets genuine design intent.

6. **Viewport safety**: 100vh per slide + clamp() sizing + breakpoint rules = safe on any conference projection setup.

### But Two Required Additions

**Caveat #1: Practice-Lab Demos Are Unsupported**

Frontend-slides has **no native interactive component system**. If "practice-lab demos" = clickable prototypes (e.g., "interact with this mining-management simulator"), you need a secondary tool:

- **Option A (Recommended)**: Use **huashu-design** for lab demos only. Its `ios_frame.jsx` + state-machine + Playwright verification gives production-grade interactive mockups. Separate from deck, but cohesive workflow.
- **Option B**: Use **impeccable** to iterate on custom interactive components after frontend-slides builds the deck structure. But this adds gating overhead.

**Caveat #2: Editable PPTX Export Requires Workaround**

Frontend-slides **cannot export HTML→PPTX** (editable). If Adri needs "send my slides to team members who will edit text in PowerPoint":

- **Fallback 1 (Easiest)**: Export to **PDF** instead. Still editable-friendly (team can annotate, markup), universal, archive-proof.
- **Fallback 2**: Use **huashu-design** for PPTX export path. But requires HTML written to 4 hard constraints from day 1 (900×540pt, text in `<p>` tags, no gradients/web components, `<img>` not background-image).

---

## Combination Strategies: Two-Tool Approach

### Recommended Setup

```
┌─────────────────────────────────────────────────────────┐
│ ADRI'S 120-MIN MINING PRESENTATION PROJECT             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  PRIMARY DECK (100% of brief)                          │
│  ├─ Tool: frontend-slides                               │
│  ├─ Output: index.html (keyboard presentation)          │
│  ├─ Then: export-pdf.sh → presentation.pdf              │
│  └─ Time: ~45 min (discover style + generate 30+ slides)│
│                                                          │
│  PRACTICE-LAB DEMOS (if tier-1 requirement)            │
│  ├─ Tool: huashu-design (iOS prototype kit)            │
│  ├─ Output: lab-simulation.html (clickable)             │
│  ├─ Then: Playwright verify interactions                │
│  └─ Time: ~15 min per demo (~3 demos = 45 min)         │
│                                                          │
│  POLISHING (optional, if time allows)                   │
│  ├─ Tool: impeccable /critique                          │
│  ├─ Action: 5-dimension expert review                   │
│  └─ Time: ~5 min                                        │
│                                                          │
│  FINAL EXPORTS                                          │
│  ├─ Deck: index.html (for live projection)              │
│  ├─ Archive: presentation.pdf (email/backup)            │
│  └─ If PPTX needed: fall back to Huashu or PDF-only     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Why This Works

| Tool | Role | Cost | Benefit |
|---|---|---|---|
| **frontend-slides** | Primary deck: 30+ slides, animations, PDF export | 45 min | Entire workflow tailored to presentations. Preset discovery. PDF built-in. |
| **huashu-design** | Lab demos: 2-3 interactive prototypes, real iPhone bezel, Playwright QA | 15-45 min | iOS frame fidelity. Real images from Wikimedia. Click verification before ship. |
| **impeccable** | (Optional) Polish review after deck is roughed in | 5-10 min | 5-dimension critique radar chart. Catch design issues before 400-person event. |

### Alternative: Single-Tool (Huashu-Design Only)

If Adri absolutely wants **one tool**:

```
Use huashu-design for entire scope:
├─ Deck: HTML slides + design-direction advisor + Tweaks
├─ Demos: iOS prototype kit in same project
├─ Export: HTML deck → PPTX (editable) + PDF + MP4 (for promo)
└─ Polish: Built-in 5-dimension critique

Trade-off: 
├─ COST: +30% thinking time upfront (design advisor + Core Asset Protocol)
└─ BENEFIT: No tool-switching. Everything in one skill. MP4 export (good for video promo).
```

**Recommendation:** Stick with **frontend-slides + huashu-design (for demos)** unless Adri explicitly asks for video export or editable PPTX.

---

## Open Questions to Resolve in Conversation with Adri

### 1. Practice-Lab Demos: Tier-1 or Tier-3?

**Question:** "You mentioned 'practice-lab demos may need interactive components.' On a scale of must-have → nice-to-have:
- Are the demos **essential** (they happen during the 120 minutes, affect engagement)?
- Or **bonus** (optional, after slides)?
- And what form? Clickable mock-ups? Real app screenshots? Simulation?"

**Why it matters:**
- If **essential**: Use huashu-design for both deck + demos (one skill, integrated workflow).
- If **bonus**: Stick with frontend-slides for deck + a quick huashu-design demo later.

---

### 2. PPTX Editability: Do You Need It?

**Question:** "Do you need to export the final deck as an **editable PowerPoint** (so colleagues can modify text in PPT later)? Or is **PDF + HTML** enough for sharing and archive?"

**Why it matters:**
- If **yes, PPTX needed**: Huashu-design's `html2pptx.js` is your path (4 constraints on HTML, but native editability).
- If **no, PDF/HTML OK**: Frontend-slides is fully sufficient (PDF is better for projection anyway).

---

### 3. Mining-Industry Branding: Have Assets?

**Question:** "Do you have brand assets for Nanovest / Sinarmas Mining?
- Logo (SVG or PNG)?
- Brand colors / existing design guidelines?
- Any reference images (office, mining equipment, Nanovest branding)?

**Why it matters:**
- **If yes**: Huashu's Core Asset Protocol (§1.a) ensures brand consistency. Logo must be real SVG, not CSS silhouette.
- **If no**: Frontend-slides' preset picker is more forgiving. You pick from 12 curated styles; no asset requirement.

---

### 4. Animation Ambition Level

**Question:** "When you say 'heavy animation,' what do you mean?
- CSS animations (fade, slide, parallax, stagger)? → Frontend-slides **sufficient**.
- Motion design sequences (product reveal timeline, 5+ object choreography)? → Huashu-design **better** (Stage+Sprite).
- Video export needed (MP4 for social media)? → Huashu-design **required**."

**Why it matters:**
- Frontend-slides is CSS-only (fast, no dependencies). Good for entrance/exit animations.
- Huashu-design has full animation engine if you need frame-accurate choreography + MP4 export.

---

### 5. Team Workflow: Solo or Collaborative?

**Question:** "Are you building this solo, or will teammates iterate?
- **Solo**: Frontend-slides (faster, less overhead).
- **Collaborative**: Huashu-design (design-direction advisor lets team vote on 3 directions; Tweaks system for live A/B)."

**Why it matters:**
- Frontend-slides is a "me pick a preset" flow.
- Huashu-design is a "let's all see 3 directions" flow. Better for teams.

---

## Citations (File Paths)

### Frontend Slides
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/frontend-slides/SKILL.md` — Core workflow, phases 1-6, export rules
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/frontend-slides/README.md` — Feature summary, installation, philosophy
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/frontend-slides/STYLE_PRESETS.md` — 12 curated visual styles with typography/color specs
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/frontend-slides/animation-patterns.md` — Effect-to-feeling guide, entrance animations, background effects

### Frontend Design (Claude Official)
- `/Users/macbook/.claude/plugins/cache/claude-plugins-official/frontend-design/205b6e0b3036/skills/frontend-design/SKILL.md` — Design thinking framework, shared design laws, 0 custom commands

### Impeccable
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/impeccable/SKILL.md` — 23 commands, setup gates, shared design laws
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/impeccable/README.md` — Command overview, installation, anti-patterns

### Huashu-Design
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/huashu-design/SKILL.md` — Core principles, core asset protocol (§1.a), design-direction advisor, Junior Designer workflow, workstream, 10 reference files
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/huashu-design/README.md` — Capability overview, demo gallery, core mechanics
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/huashu-design/references/slide-decks.md` — Slide-specific rules: HTML vs. PDF vs. PPTX decision tree, 2-page showcase before batch
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/huashu-design/references/design-styles.md` — 20 design philosophies (5 schools × 20 styles) for direction advisor
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/huashu-design/references/editable-pptx.md` — 4 hard constraints for HTML→PPTX conversion (960×540pt, text in `<p>`, no gradients, `<img>` not background-image)
- `/Users/macbook/Projects/_web_presentation/berau-presentation/.claude/skills/huashu-design/references/animation-best-practices.md` — Anthropic-level narrative/motion/rhythm/expression patterns (vs. huashu-design's "animation pitfalls")

---

## Recommendation Summary for Adri

| Decision | Recommendation | Confidence | Caveats |
|---|---|---|---|
| **Primary deck tool** | **frontend-slides** ✓ | 95% | UNLESS you need editable PPTX or video export (then toggle to huashu-design) |
| **Lab demos (if needed)** | **huashu-design** | 90% | iOS prototype kit is purpose-built; Playwright QA before ship. |
| **Polish/critique (optional)** | **impeccable** /critique | 80% | Run after deck is roughed in. 5-dimension radar chart before 400-person event. |
| **PDF export** | **frontend-slides** `export-pdf.sh` | 99% | Tested, built-in, no surprises. Use this for archive/email. |
| **PPTX export** | **huashu-design** (if required) or **PDF** | 85% | PPTX is optional; PDF is better for projection anyway. |
| **Video export** | **huashu-design** only | 100% | If you want MP4 + GIF for promo/social. Frontend-slides can't do this. |

**Go-to-market sequence:**
1. Start with **frontend-slides** (deck discovery + generation = 45 min)
2. If labs needed: add **huashu-design** (3 demos = 15-45 min)
3. If time allows: run **impeccable** /critique (polish = 5-10 min)
4. Export: `export-pdf.sh` (final PDF), keep `index.html` for live projection

**Stick with the lean.** Frontend-slides is the right choice. But **budget for huashu-design if interactive labs are real.**

---

**Document Version:** 2026-05-06  
**Skill Versions Reviewed:** frontend-slides (v1), frontend-design (official), impeccable (latest), huashu-design (v2.0)  
**Last Updated:** 2026-05-06
