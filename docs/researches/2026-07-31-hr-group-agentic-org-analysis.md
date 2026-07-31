# 1. Repo purpose and structure

This repository contains two related artifacts:

1. The April 2026 HR-leader presentation, **“From Engineers to Everyone — Nanovest AI Adoption.”**
2. A later July 2026 static website, **“Scaffolding the Agentic Organization,”** which extends the presentation into an operating-model and platform concept.

The deck targets non-technical Sinarmas Group HR leaders. It presents Nanovest’s adoption journey, three failures, supporting frameworks, outcomes, and a group-wide enablement playbook.

| Path | What exists |
|---|---|
| `CONTEXT.md` | July 31, 2026 provisional ubiquitous language for a future Nanovest agentic platform. Defines Platform, Chat Surface, Canvas, Harness, Member, Agent, Workflow, Skill, Plugin, Tool, Second Brain, subscription-plan billing, API billing, and LLM-agnostic. This is later platform work, not the original April deck brief. |
| `README.md` | Empty, zero-byte file. |
| `package.json` | Node/PptxGenJS project. Scripts generate the complete deck or Sections 1–5. Dependencies: `pptxgenjs@4`, React/ReactDOM 19, `react-icons`, and `sharp`. React is used server-side to render icons, not to build the `/web` site. |
| `hr-group-agentic-org-final.pptx` | Final presentation artifact, approximately 68 MB. Its actual slide-count discrepancy is documented in Section 2 below. |
| `assets/` | Nanovest title/main/end templates; generated conceptual illustrations; image-generation background references; backup slide images; and `assets/slide-results/slide-1.png` through `slide-20.png` render snapshots. |
| `src/generate.js` | Main 16:9 PptxGenJS orchestrator. Registers icons by section, calls the active slide modules, adds metadata, and writes either `hr-group-agentic-org.pptx` or a section-only PPTX. |
| `src/slides/` | 21 modules: 20 active slide modules plus disabled `slide02-backup-alternatives.js`. |
| `src/tokens.js` | Shared slide dimensions, layout coordinates, template paths, fonts, colors, card values, icon sizes, and asset directories. |
| `src/helpers.js` | Shared PptxGenJS primitives: slide bases, cards, section boxes, accent lines, headers, content rows, footer bars, rich text, and image fitting. |
| `src/icons.js` | Converts `react-icons` components to SVG with ReactDOM server rendering, then to base64 PNG with `sharp`; CairoSVG is a fallback. |
| `docs/specs/` | Eight presentation specifications: overall design plus section and redesign specs. |
| `docs/plans/` | Seven implementation plans for sections and individual slide redesigns. |
| `docs/brainstorms/` | Six decision logs covering the presentation concept and Sections 1–5. |
| `docs/prompts/` | Fourteen source prompts containing Nanovest conditions, journey notes, slide-specific iterations, and brainstorming inputs. |
| `docs/researches/` | Twenty-two Markdown research and evidence documents; inventory in Section 4. |
| `docs/references/` | Twenty-three source artifacts, including workshop PDFs, app-performance benchmarks, Naura screenshots/GIF, a finance workbook/result, UI references, and the July 2026 monthly Agentic Organization PDF. |
| `docs/image-specs/` | Ten YAML specifications for AI-generated slide illustrations. |
| `docs/examples/` | Prompt-schema, image-generation, and MCP multimedia examples. |
| `docs/DESIGN-vercel.md` | Vercel/Geist-derived design-language analysis used for the later `/web` experience. |
| `rules/design-system.md` | Deck templates, typography, palette, highlight rules, card styling, spacing, and footer conventions. |
| `rules/slide-patterns.md` | Header, title slide, footer, content-row, score-card, bullet, and rich-text implementation patterns. |
| `rules/section-boxes.md` | Exact section-box geometry and layout math for content-heavy slides. |
| `rules/image-generation.md` | Image placement, reference-background extraction, generation, placement, and asset-saving workflow. |
| `rules/slide-qa.md` | PPTX generation, per-slide splitting, Quick Look PNG rendering, and visual-inspection workflow. |
| `web/index.html` | Standalone static “Scaffolding the Agentic Organization” page. Contains hero, maturity ladder, principles, four scaffold phases, operating model, metrics, risks, sources, and CTA. |
| `web/styles.css` | Complete dark architectural design system, responsive layout, static hero layers, and CSS motion. |
| `web/app.js` | Dependency-free browser interaction layer: particle network, reveal effects, count-ups, scroll state, cursor spotlights, SVG path drawing, and ladder animation. |
| `web/vercel.json` | Static Vercel configuration with clean URLs and `noindex, nofollow` headers. |
| `tools/remove-bg.py` | `rembg`/Pillow utility for single-image or batch background removal. |

There is no test framework in `package.json`; presentation QA is documented as a generate → split → PNG → inspect process.

# 2. Agentic Organization presentation content

## Source of truth and artifact discrepancy

The intended sequence is defined by:

- `src/generate.js`
- `src/slides/*.js`
- `docs/specs/2026-04-11-presentation-design-overview.md`
- `docs/researches/2026-07-30-nanovest-decks-content-digest.md`

These define a **20-slide, five-section deck** for April 17, 2026.

Direct inspection of `hr-group-agentic-org-final.pptx` shows **21 slides**:

- PPTX slides 2 and 3 both contain “The Hardest Part Isn’t the Tools.”
- Intended source slide 3 therefore appears as PPTX slide 4, and subsequent slides are shifted by one.
- The image-only closing is PPTX slide 21.
- The current generator calls the Hard Truth module only once. The reason for the duplicate in the final artifact is not established.
- `docs/specs/2026-04-11-presentation-design-overview.md` also contains one stale sentence saying “21 slides,” while its metadata, tables, and later change note define the final 20-slide sequence.

The outline below uses the canonical source numbering. Metrics and research claims are reported as presentation content, not independently revalidated here.

## Section 1 — Opening: concept and journey

### Slide 1 — Title

Path: `src/slides/slide01-title.js`

- **Title:** “From Engineers to Everyone”
- **Subtitle:** “Nanovest’s Journey Building an AI-First Organization”
- **Speaker:** Adrianto Tedjokusumo, Head of TPM.
- Core message: Nanovest is moving from engineering-led experimentation toward organization-wide AI adoption.

### Slide 2 — The Hardest Part Isn’t the Tools

Path: `src/slides/slide02-hard-truth.js`  
Image spec: `docs/image-specs/02-the-hard-truth-v2.yaml`

- Tilted balance: a heavy, active **People & Process** side versus a light, idle **Technology** side.
- Reported statistic: “70% of AI adoption failures are people & process, not technology.”
- Core message: access to models and tools is the easy part; mindset, methodology, and human adoption determine success.

Disabled alternatives: `src/slides/slide02-backup-alternatives.js`.

### Slide 3 — The Agentic Organization

Path: `src/slides/slide03-agentic-org.js`  
Image spec: `docs/image-specs/03-agentic-organization.yaml`

- Agentic Organization is presented as an operating model, not a department or committee.
- Central hub: **AISC as Enabler**.
- Six surrounding pillars:
  1. People & Mindset
  2. AI Companions
  3. Process & Methodology
  4. Tools & Platform
  5. Strategy & Leadership
  6. Governance & Policies
- AI companion progression: **Tool → Companion → Agent**.
- Human/AI paradigm: **Specify by humans → Generate by AI → Verify by humans**.
- Contrasts an older 70% execution / 30% planning-and-review split with humans concentrating on specification and verification.
- Reported context: 25–55% productivity improvement; 78% adoption versus 6% proper implementation.
- Core message: becoming agentic requires the six organizational pillars to advance together.

### Slide 4 — Our Journey

Path: `src/slides/slide04-journey.js`  
Image spec: `docs/image-specs/04-journey-timeline.yaml`

Five-quarter timeline:

- **Q1 2025 — Exploring AI:** multiple tools, self-learning prompts and AI concepts, no clear winner.
- **Q2 2025 — Finding Focus:** Claude becomes the coding focus; first AI-assisted workflows and integration research.
- **Q3 2025 — Building Structure:** AISC formed; first organization-wide workshop; other departments engaged.
- **Q4 2025 — Breakthrough:** 6.9× app-performance boost, three cross-department projects, ten AI connectors, marginal results becoming material.
- **Q1 2026 — Scaling Org:** Claude access expands across departments; agentic engineering becomes standard; NIC workshops and AI champions emerge.

Core message: the apparent smooth progression hides three failures that shaped the eventual framework.

## Section 2 — Journey: three failures and the pattern

### Slide 5 — Tools Without Direction

Path: `src/slides/slide05-tools-without-direction.js`  
Image spec: `docs/image-specs/05-tools-without-direction.yaml`

- Phase 1, Q1 2025.
- Problems: 5+ tools without a standard, blind “vibe coding,” complex ambitions without foundations, and knowledge trapped with individuals.
- Lesson: **“Tools Without Methodology Is Just Noise.”**
- Core message: tool access without a working method creates inconsistent, non-scalable output.

### Slide 6 — Building Without Strategy

Path: `src/slides/slide06-building-without-strategy.js`

- Phase 2, Q2–Q4 2025.
- Scrapped or displaced: custom knowledge base, internal document crawler, and six of ten AI connectors.
- Survived: four company-specific connectors and business solutions for stock-news sentiment, third-party announcement monitoring, and legal-document generation.
- Tool strategy: Claude for depth/reasoning; Gemini for research/multimedia.
- Lessons: research before building; avoid recreating generic capabilities; company-specific solutions retained value.
- Core message: the external AI ecosystem moves faster than internal teams can rebuild commodity capabilities.

### Slide 7 — Enabling Without Empowering

Path: `src/slides/slide07-enabling-without-empowering.js`

- Phase 3, mid-2025 through Q1 2026.
- AISC ran pilots with Operations, Data, Product, and Legal and showcased visible successes.
- Departments became consumers rather than owners.
- Representatives acted as product owners but did not receive maintenance or creation ownership.
- AISC became a delivery bottleneck.
- Lessons: **build with people, not for them**; every department needs a genuine champion.
- Core message: central delivery scales demand, not capability.

### Slide 8 — The Pattern Emerges

Path: `src/slides/slide08-the-pattern-emerges.js`

Three lessons:

1. **Methodology over tools**
2. **Research over building**
3. **Champions over labor**

Three resulting shifts:

- **Code → knowledge:** reusable skills and plugins encode departmental expertise.
- **Implementors → enablers:** AISC moves from building solutions to coaching and writing playbooks.
- **Build it → enable it:** departments define, maintain, and create their own solutions.

Core message: experience produced a pattern, but a formal framework is needed to make it repeatable.

## Section 3 — Insights and framework

### Slide 9 — Two Dimensions of AI Adoption

Path: `src/slides/slide09-two-dimensions.js`

Individual maturity:

- Prompt Engineering
- Context Engineering
- Harness Engineering

Organizational scale:

- **Perception:** usefulness, acceptance, and resistance.
- **Change:** how urgency becomes embedded behavior.
- **Focus:** where organizational leverage sits.

Core message: individual capability without organizational support stays siloed; organization-wide pressure without capability produces consumers rather than adopters.

### Slide 10 — AI Adoption Frameworks

Path: `src/slides/slide10-frameworks-tam-kotter.js`  
Image specs: `docs/image-specs/10a-tam-framework.yaml`, `docs/image-specs/10b-kotter-framework.yaml`

- **Technology Acceptance Model, Davis 1989:** external factors shape perceived usefulness and ease of use, which shape behavioral intention and actual use.
- **Kotter’s change model, condensed:** Create Urgency → Build Coalition → Enable Action → Generate Wins → Anchor in Culture.
- Core message: TAM explains the belief needed to begin; Kotter supplies the sequence needed to make change persist.

### Slide 11 — The Middle-Out Insight

Path: `src/slides/slide11-middle-out-insight.js`  
Image spec: `docs/image-specs/11-middle-out-insight.yaml`

- Three tiers: leadership, middle-management champions, and teams.
- Top-down support is presented as generic; bottom-up action has domain depth but insufficient authority.
- Middle managers translate leadership vision downward and operational reality upward.
- Reported statistic: 3.5× higher adoption when employees influence technology selection.
- Core message: the middle layer combines credibility, domain knowledge, peer influence, and authority.

### Slide 12 — Sharpen the Axe

Path: `src/slides/slide12-sharpen-the-axe.js`  
Image spec: `docs/image-specs/12-sharpen-the-axe.yaml`

- Preparation model: roughly 70% research, design, and context; 30% implementation.
- Contrasts a prepared, sharp-axe workflow with a context-free “vibe prompt.”
- Links Covey’s “Sharpen the Saw” with **GIGO — Garbage In, Garbage Out**.
- Core message: AI output quality is constrained by the quality of the problem framing and context supplied by humans.

### Slide 13 — Process First, AI Second

Path: `src/slides/slide13-process-first-ai-second.js`  
Image spec: `docs/image-specs/13-bpm-rpa-ipa-orbital.yaml`

HR onboarding example:

- **BPM:** identify waste and redesign the workflow from 20 steps to 8.
- **RPA:** automate repetitive, deterministic provisioning, approvals, and notifications.
- **IPA:** add AI only where contextual understanding or adaptation is required, such as personalized learning or an FAQ chatbot.
- Presented outcome: 40% faster onboarding.
- Formula: **IPA = BPM + RPA + AI**.
- Core message: process first, deterministic automation second, intelligence last.

### Slide 14 — Nanovest AI Adoption Framework

Path: `src/slides/slide14-nanovest-framework.js`

Four principles:

1. **Mindset First:** AI is a way of working; preparation begins before the prompt.
2. **Foundations for Everyone:** tools, access, and progressive workshops form a common baseline.
3. **Middle-Out Champions:** AISC and departmental champions move information and change in both directions.
4. **Solve Problems Over Capabilities:** begin with what is broken and select the lightest adequate intervention across BPM, RPA, and IPA.

The cards explicitly connect these principles to TAM, Kotter, Covey/GIGO, middle-management research, and the BPM/RPA/IPA spectrum.

Core message: the framework is a synthesis of Nanovest’s failures, applied practice, and external theory.

## Section 4 — Outcomes and capability calibration

### Slide 15 — App Performance Improvement

Path: `src/slides/slide15-app-performance.js`

- Benchmarked homepage, navbar, and asset-page performance against Pluang, Pintu, Tokocrypto, and Indodax.
- H1 2025: 3.49× improvement from a concentrated iOS finding.
- H2 2025: 6.90× distributed, Android-led improvement.
- Reported results: 6.90× overall, about 90% of the competitor gap closed, 10× faster Android homepage, and 4 of 6 metrics matching or beating competitors.
- Core message: the same codebase and team produced different results after adopting more disciplined research and execution practices.

### Slide 16 — Naura, Nanovest AI Chatbot

Path: `src/slides/slide16-naura-chatbot.js`

- Operations identified a support-scaling problem in which 70%+ of questions were repetitive.
- The product uses Nanovest FAQ/domain knowledge, English and Bahasa natural-language conversation, and contextual human handoff.
- Ownership flow: **Operations owner → AISC enabler → Engineering builder**.
- Reported results: 14,000+ conversations, 75.08% deflection in December 2025, and 10% monthly usage growth.
- Core message: Naura demonstrates the middle-out, cross-functional model—business ownership with AISC enablement and engineering delivery.

### Slide 17 — What We Think ≠ Claude Thinks

Path: `src/slides/slide17-capability-verdict.js`

Two capability-calibration cases:

- **Finance tracker—easier than expected:** a single prompt generated an executive dashboard with formulas and finance practices.
- **Building the deck—harder than expected:** one large prompt produced poor slides; the usable deck required research, structured design, templates, skills, image-generation tooling, rules, iteration, and visual QA.
- Deck-production split: approximately three days/70% preparation and one day/30% implementation.
- Core message: task difficulty cannot be judged only by domain prestige; the combination of framework and tooling determines whether an AI-assisted solution ships.

## Section 5 — Forward model and HR role

### Slide 18 — Our Enablement Model

Path: `src/slides/slide18-enablement-model.js`

Current bottlenecks:

- **Access:** desktop installation depends on IT tickets, pushing people toward the less capable web surface.
- **Non-tech gap:** departments can chat with AI but cannot yet build reusable solutions.
- **Resistance:** replacement fear, productivity letdown, and autonomy pride.

Enablement pillars:

- Knowledge Programs
- Tools & Infrastructure
- AI Champions Network
- Technical Consultation

Tracks:

- **Individual:** daily-work proficiency, self-service learning, AI-augmented decisions.
- **Team:** departmental projects, champion-led roadmaps, cross-team solutions.

Journey:

**Learn → Experiment → Build → Integrate → Own**

Core message: enablement connects current barriers to explicit organizational capabilities and department ownership, with adoption dashboards and quarterly reviews tracking movement.

### Slide 19 — Group-Wide Enablement Playbook

Path: `src/slides/slide19-group-playbook.js`

Five stages:

1. Baseline Survey
2. BU-selected Champions
3. Needs Analysis
4. Group AI Foundation Workshop
5. Coaching + Co-design

Four HR Group levers:

- **Convene:** create attendance, visibility, and mandate.
- **Champion:** protect and recognize the champion role through performance criteria.
- **Unblock access:** accelerate IT provisioning.
- **Sustain the rhythm:** preserve calendars, funding, and visibility.

Additional roadmap domains: **Culture, Governance, Risk, Ethics**.

Core message: Group HR supplies institutional leverage; AISC supplies the adoption method, coaching cycle, and reusable skills/plugins/connectors library.

### Slide 20 — Closing

Path: `src/slides/slide20-closing.js`  
Asset: `assets/pptx-end-slide.png`

- Full-bleed branded “Thank You” image.
- Contains Nanovest social channels, careers address, and app-store links.
- No native PowerPoint elements.

Overall narrative:

**People/process problem → Agentic Organization model → honest journey → three failures → repeatable adoption framework → operational outcomes → enablement model → group-wide playbook and HR levers.**

# 3. `/web` particle-motion animation

## Exact files

| Path | Role |
|---|---|
| `web/index.html:39` | Declares `<canvas id="net" aria-hidden="true"></canvas>` as the first hero layer. |
| `web/index.html:40` | Adds the separate CSS grid layer. |
| `web/index.html:41` | Adds the separate CSS glow layer. |
| `web/index.html:847` | Loads `app.js` as a normal non-module script. |
| `web/app.js:27` | Starts the “Hero canvas — agent network simulation” block. |
| `web/styles.css:376` | Defines the full-hero `#net` canvas positioning. |
| `web/styles.css:389` | Defines the static radial-gradient hero glow. |
| `web/styles.css:403` | Defines the static grid-line overlay. |
| `web/vercel.json` | Deployment headers only; no animation behavior. |

## Technology

- **Canvas 2D**, obtained with `canvas.getContext("2d")`.
- Plain browser JavaScript in an IIFE.
- No WebGL.
- No Three.js, PixiJS, D3, GSAP, or particle library.
- No React, Vite, or Tailwind in `/web`.
- CSS supplies positioning, the grid, and ambient glow; the moving nodes, links, pulses, and packets are drawn entirely in Canvas.
- Browser APIs used: `requestAnimationFrame`, `ResizeObserver`, `IntersectionObserver`, `matchMedia`, and `devicePixelRatio`.

## What it renders

- Randomly distributed nodes drift across the hero.
- Nodes within 130 CSS pixels are connected by faint gray edges.
- Every fourteenth node is an “orchestrator” hub.
- Hubs pulse in cyan, blue, violet, or amber.
- Hubs occasionally send colored packets along nearby edges.
- Nodes wrap around all canvas boundaries with a 20-pixel offscreen margin.
- The animation pauses when the hero canvas is outside the viewport.
- The complete particle layer is omitted when `prefers-reduced-motion: reduce` is active.
- No mouse or pointer input affects the particle network. Cursor-following effects elsewhere in `app.js` apply only to `.card` elements.

## Key parameters

| Parameter | Value |
|---|---|
| Colors | `#22d3ee`, `#4c8dff`, `#a78bfa`, `#f5a623` |
| Device-pixel ratio | `min(devicePixelRatio, 2)` |
| Node count | `min(90, floor(width × height / 16000))` |
| Velocity | Random `-0.16` to `0.16` pixels per frame on each axis |
| Ordinary-node radius | Random `1` to `2.2` pixels |
| Hub selection | `index % 14 === 0` |
| Link distance | `130` pixels |
| Link alpha | `(1 - distance / 130) × 0.16` |
| Link color | `rgba(190,196,210,alpha)` |
| Link width | `1` pixel |
| Packet limit | `26` |
| Packet spawn chance | `0.004` per eligible hub edge per frame |
| Packet progress speed | Random `0.006` to `0.014` per frame |
| Packet radius | `1.8` pixels |
| Packet alpha | `0.9 × sin(π × progress)` |
| Hub pulse | `0.5 + 0.5 × sin(time / 900 + phase)` |
| Hub halo radius | `8 + 5 × pulse` |
| Hub halo alpha | `0.22 × pulse` |
| Hub center radius/alpha | `2.6` pixels / `0.95` |
| Ordinary-node color | `rgba(200,205,216,0.5)` |
| Resize trigger | `ResizeObserver`; rebuild occurs after a size change of at least 1 pixel |
| Offscreen pause | `IntersectionObserver`, threshold `0` |
| CSS canvas opacity | `0.9` |
| CSS stacking | Canvas `z-index: -2`; grid/glow `z-index: -1`; hero uses `isolation: isolate` |
| CSS sizing | Absolute `inset: 0`, `width: 100%`, `height: 100%` |

Performance is bounded by the 90-node cap, although proximity checks remain an O(n²) nested loop. Motion is frame-based rather than elapsed-time-normalized.

## Portability into React 18 + Vite + Tailwind

Portability is high at the rendering level because the network code has no package dependencies and interacts with one canvas element. Its coupling surface is:

- DOM lookup by `id="net"`.
- A parent with a measurable, nonzero size.
- The `#net` absolute-positioning rules and hero stacking context.
- Browser-only APIs; it is not server-render safe.
- Global observers, the `load` listener, and the animation-frame handle.
- No teardown implementation in the current vanilla script.

In a React component, the equivalent lifecycle surface is a canvas ref plus mount/unmount management for the animation frame, observers, and event listener. React Strict Mode would expose missing cleanup through repeated effect setup. Vite and Tailwind impose no runtime incompatibility; Tailwind would only replace or coexist with the small set of canvas/hero positioning rules.

The grid and glow are separate CSS decorations. They are visually associated with the particle network but are not required by its drawing algorithm.

# 4. Relevant research documents

The external claims below retain the verification status recorded in each file; they were not independently revalidated for this repo brief.

## Adoption, organization, and framework research

- `docs/researches/2026-07-30-agentic-org-adoption-frameworks.md` — Maturity ladders, phased adoption, CoE-versus-champion models, governance by phase, metrics, ROI pitfalls, and case sequencing for an agentic organization.
- `docs/researches/framework-ai-adoption-research.md` — Gartner, McKinsey, and Microsoft maturity models plus organizational success factors and adoption gaps.
- `docs/researches/framework-change-management-research.md` — Kotter, ADKAR, Lewin, McKinsey 7-S, AI-specific change evidence, and the people/process-versus-technology framing.
- `docs/researches/framework-tam-research.md` — Original TAM and extensions, with perceived usefulness/ease-of-use constructs applied to organizational AI adoption.
- `docs/researches/middle-out-change-research.md` — Academic and AI-specific evidence for middle managers as bidirectional change agents.
- `docs/researches/sharpen-the-axe-gigo-research.md` — Preparation-before-execution, GIGO history, AI workflow application, and the warning that the Lincoln attribution is apocryphal.
- `docs/researches/harness-vs-agentic-engineering.md` — Prompt → Context → Harness progression and the conclusion that agentic engineering is the umbrella discipline, not a fourth sequential stage.
- `docs/researches/workshop-materials-summary.md` — Digest of five Nanovest workshops spanning executive foundations, AI SDLC, everyday AI, and self-service dashboards.

## Nanovest narrative and evidence

- `docs/researches/nanovest-context.md` — First-hand account from Adri covering the three adoption phases, AISC formation, tool evolution, projects, and the central empowerment mistake.
- `docs/researches/presentation-points-extraction.md` — Original Slack-derived presentation brief: audience, journey, frameworks, outcomes, challenges, roadmap, and Group-level takeaways.
- `docs/researches/slack-conversations-summary.md` — Planning history for the HR session, including the proposed Agentic Organization theme, logistics, audience needs, and discussion with HR stakeholders.
- `docs/researches/slack-ai-compendium-summary.md` — Company AI-channel activity, Claude ecosystem usage, skills/plugins, participating departments, and potential champion signals.
- `docs/researches/2026-07-30-nanovest-decks-content-digest.md` — Complete slide-by-slide digest of this deck, the July 2026 monthly deck, their differences, related repository context, and vocabulary.
- `docs/researches/app-performance-data.md` — Source calculations and methodology behind the app-performance case, including H1/H2 and platform-level metrics.
- `docs/researches/claude-capability-calibration.md` — Evidence for Slide 17’s finance-dashboard and presentation-production cases.

## Later Agentic Organization platform research

- `docs/researches/2026-07-30-agentic-platform-technical-landscape.md` — Assistant customization, skills/plugins, orchestration, platform build-versus-buy, enterprise knowledge, MCP, and A2A.
- `docs/researches/2026-07-31-chat-platform-harness-candidates.md` — OSS chat-surface and agent-harness candidates, licensing, shortlist comparisons, and subscription-authentication constraints.
- `docs/researches/2026-07-31-canvas-layer-options.md` — Embeddable graph canvases, licensing and white-label constraints, graph execution patterns, and deterministic-workflow versus agent-loop boundaries.
- `docs/researches/2026-07-31-second-brain-candidates-integration.md` — Enterprise-RAG candidates, permission-aware retrieval, connector coverage, operations burden, and platform-to-brain integration contracts.
- `docs/researches/2026-07-31-subscription-plan-model-access.md` — Technical mechanisms, terms-of-service status, and risk analysis for subscription-seat versus metered-API model access.

## Presentation-production research in the same folder

- `docs/researches/reference-project-analysis.md` — Architecture and design-pattern extraction from the earlier Nanovest town-hall PptxGenJS project.
- `docs/researches/slide-background-analysis.md` — Analysis of the three Nanovest slide templates, safe areas, palette, and content-placement constraints.