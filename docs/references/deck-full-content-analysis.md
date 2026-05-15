# Deck Full Content Analysis

> Reference document for practice-lab brainstorming. Captures the full content of the BCE AI Catalyst Vol-2 Session-2 deck (`src/slides/`), section by section, with quoted headlines and slide-by-slide breakdowns. Each section ends with a **Practice-lab extraction surface** flagging concepts that map cleanly to hands-on exercises.

**Audience context:** ~400 mining-industry attendees, BCE AI workshop, facilitated by Adri (Nanovest). Body slides (B–H, J) use universal knowledge-work examples. Mining-specific framing lives only in the hooks (A, I).

**Deck arc:**
- **A** Opening — what you've already seen / capabilities-in-the-room → questions to answer
- **B** Landscape — AI history, taxonomy, mechanics, model landscape, adoption paradox
- **C** Mindset — five shifts (Tool→Bridge, Fear→Leverage, Executor→Orchestrator, V-shape work, Role→Trajectory) → Bridge to D
- **D** Foundation Core — automation trap, BPM/RPA/AI/IPA/Agentic convergence, decision ladder → Bridge to E
- **E** Foundation Core (engineering) — three layers (Prompt / Context / Harness), techniques, walls, practices → Bridge to F
- **F** Foundation Techniques — RAG + Plugins/Skills/MCP/Hooks/Sub-agents → Agentic OS → Bridge to G
- **G** Application — vendor ecosystem (Claude / Google / OpenAI), platforms, capabilities, head-to-head, decision matrix, end-to-end workflow, beyond the Big Three → Bridge to H
- **H** Application (discipline) — 8 pitfalls + 8 disciplines with cross-highlight → Bridge to I
- **I / J / K** Reveal & Closing — meta-reveal (deck built by AI), Adri's journey, portfolio, recipe (5 principles + habits + ship moves), practice-lab handoff

---

# SECTION A — Opening (`opening-section-a/`)

**Role in deck:** The opener. Title establishes workshop identity; A.1 bridges from what the Vol-2 Session-1 winners already demonstrated into the questions that Sections C–H will answer. Does NOT re-narrate anyone's specific project — celebrates capability *classes* and pivots to curiosity.

### Title Slide (`title.tsx`)

- **Headline:** "From AI Curiosity to AI Capability"
- **Tagline (italic serif):** "A working session on the AI stack, the *mindset shift*, and the new *operator role* — for everyone, not just engineers."
- **Workshop chip:** BCE AI Catalyst · Vol 2, Session 2
- **Speaker chip:** Adrianto Tedjokusumo · Nanovest
- **Hero photo:** Abstract copper threads converging in deep space

### A.1 — "What You've Already Seen" (`a1-what-youve-seen.tsx`)

**FIG Label:** `A · 1 — WHAT YOU'VE ALREADY SEEN`
**Headline:** "The *capabilities* you brought to the room."
**Tagline:** "What you saw is real. And it opens some *questions*."

**Five capability cards (left column):**
| Label | Description |
|---|---|
| AI CHATBOT | "Conversational interfaces that answer, *ask back*, and follow up." |
| SUMMARIZATION | "Distilling long content into the parts that *actually matter*." |
| DOCUMENT ANALYSIS | "Reading, parsing, and *reasoning* over files and forms." |
| PROMPT ENGINEERING | "*Shaping the question* so the model gives back what you need." |
| GEOSPATIAL AI | "*Layering intelligence* over maps, locations, and physical sites." |

**Five "questions we'll answer" cards (right column):**
| Question | Section pointer |
|---|---|
| "What if the *upstream process* was audited before automation?" | → SECTION D |
| "What if context wasn't a one-shot prompt but a *standing memory*?" | → SECTION E |
| "What if these tools could *talk to each other*?" | → SECTION F |
| "What if a real workflow — not a demo — ran *end-to-end*?" | → SECTION G |
| "What if every solution became a *skill others could fork*?" | → SECTION H |

**Footer:** "*Already* five capabilities in the room. Five questions still *ahead*."

### Practice-lab extraction surface — Section A

- **Prompt engineering** (named here, deepened later): natural lab — write a prompt for a real task using a structured framework.
- **Summarization + Document Analysis** pairs well: give a long-form doc, ask for both treatments.
- **"What if…" questions exercise:** "for your role, write three 'What if…' questions that would transform your daily work."
- **Standing memory / context window** (→ Section E): lab around multi-turn prompting + system prompts.

---

# SECTION B — Landscape (`landscape-section-b/`)

**Role in deck:** Technical and market orientation. Moves from historical context (B.1) → conceptual taxonomy (B.2) → LLM mechanics (B.3) → competitive model landscape (B.4) → adoption paradox (B.5).

### B.1 — The AI Evolution Journey (`b1-evolution-journey.tsx`)

**FIG Label:** `B · 1 — FROM RULES TO REASONING`
**Headline:** "Seventy-five years of AI, in *one glance*."

**Six eras (timeline, "WE ARE HERE" marker on era 5):**
| Era | Years | Caption | Real-world equivalent |
|---|---|---|---|
| RULE-BASED | 1970s–80s | "Follows hand-written *if-then rules*. No learning." | "Your spam folder when it ran on hand-written rules." |
| STATISTICAL LEARNING | 1990s–2010s | "Finds *patterns in data* instead of being told the rules." | "Netflix or Spotify quietly learning what you'll click next." |
| DEEP LEARNING | 2012–2022 | "Learns to *see and hear* from raw pixels and audio." | "Face unlock on your phone; Siri finally understanding you." |
| LARGE LANGUAGE MODELS | 2022–2024 | "*Holds a conversation* and drafts in plain language." | "The chatbot you reach for to draft emails and summarise docs." |
| AGENTIC REASONING *(WE ARE HERE)* | 2024–2026 | "Thinks, *plans, uses tools*, and works for minutes on a task." | "An assistant that opens your tools and finishes the task itself." |
| AGI (emerging, dimmed) | 2026–27+ | "Reasons at *expert level* across most knowledge-work domains." | "A teammate who could lead research or strategy on day one." |

**Footer:** "Every stage is still alive in some part of your workflow — the *frontier just moved*."

### B.2 — AI Fields & Terminology (`b2-fields-terminology.tsx`)

**FIG Label:** `B · 2 — NESTED, NOT EQUAL`
**Headline:** "Five rings, one *nested* family."

**Five concentric tiers (AI → ML → DL → Gen AI → LLMs):**
- **AI** — "Any system that mimics human intelligence." Examples: Chess Engines, Calendars, Routing
- **Machine Learning** — "AI that learns from examples instead of rules." Examples: Netflix Recs, Spam Filters, Auto-tag
- **Deep Learning** — "ML using neural networks with many layers." Examples: Face ID, Siri, AlexNet
- **Generative AI** — "Deep Learning that *creates* — text, images, video, audio." Examples: DALL-E, Sora, Suno
- **LLMs** — "GenAI for text and language. Claude, GPT, Gemini, Llama." Examples: ChatGPT, Claude, Gemini

**Footer:** "AI is the *envelope*; LLMs are the *letter* inside."

### B.3 — How LLMs Work (`b3-mechanics-landscape.tsx`)

**FIG Label:** `B · 3 — MECHANICS & CONTROLS`
**Headline:** "How LLMs work — the *pipeline* and its *dials*."

**Left — NEXT-WORD PREDICTION pipeline:** TOKENIZE → EMBED → ATTEND → PREDICT & SAMPLE. Input: `"The report needs to be ___"`. Candidates cycled: *completed, reviewed, submitted, finished*.

**Right — MODEL PARAMETERS (6 dials):**
| Tile | Bullets |
|---|---|
| EFFORT | "Controls how long it *thinks*" · "*Deeper* reasoning costs more" · "*Cost* grows with effort" |
| MAX TOKENS | "Hard *ceiling* on output" · "*Cuts off* mid-sentence if hit" · "Smaller cap = *lower cost*" |
| CONTEXT WINDOW | "Total *memory* per turn" · "Input + output *share* it" · "Bigger = pricier, *less sharp*" |
| TEMPERATURE | "The *creativity* knob" · "Low = *predictable*, safe" · "High = *inventive*, wild" |
| TOP-P | "Keeps the *likely* candidates" · "*Trims* the long tail" · "*Tames* wildness, not voice" |
| SYSTEM PROMPT | "Standing *rules* for the model" · "Sets *role*, tone, language" · "*Persists* across every turn" |

**Footer:** "The *mechanics* are universal. *Which model* — and how you tune it — is yours to choose."

### B.4 — Models by Category (`b4-tiers-deployment.tsx`)

**FIG Label:** `B · 4 — FRONTIER vs OPEN-WEIGHT`
**Headline:** "Six categories, one map of what *wins where*."

**Six categories with benchmarks (May 2026, Artificial Analysis):**
| Category | Benchmark | Essence |
|---|---|---|
| WRITE & REASON | AA Intelligence Index | "Drafting, summarising, and *chain-of-thought* reasoning." |
| CODE | SWE-bench Verified | "Writing, refactoring, and debugging across *whole repos*." |
| AGENTIC | Tau-bench / Agentic | "Planning multi-step work, *calling tools*, finishing tasks." |
| MULTIMODAL | MMMU | "Reading *images, video, and speech* alongside text." |
| CREATIVE TOOLS | Different model class | "Generating images, video, and voice — *different model class*." |
| COST × INTELLIGENCE | Open-weight punchline | "How much capability you get *per dollar* spent." |

**Cost × Intelligence scatter (selected):**
- GPT-5.5 — 60 / $15.00 (frontier)
- Claude Opus 4.7 — 57 / $12.08 (frontier)
- Gemini 3.1 Pro — 57 / $4.50 (frontier)
- Kimi K2.6 — 54 / $2.32 (open-weight) → "90% the intelligence, ⅕ the cost"

**Footer:** "*Frontier* wins on average. *Fine-tuned open-weight* wins on *your work*."

### B.5 — The Adoption Paradox (`b5-todays-landscape.tsx`)

**FIG Label:** `B · 5 — AI LANDSCAPE PARADOX`

**Stat sequence:**
- **88%** of organizations have adopted AI. *(McKinsey 2025)*
- *"And yet…"*
- **88%** have launched AI initiatives
- **25%** have scaled AI to production
- **5.5%** have realized measurable ROI

**Cliffhanger:** "What separates them? Not the model — the *mental model*."

### Practice-lab extraction surface — Section B

- **B.1 timeline lab:** "Draw your own 'WE ARE HERE' for your specific domain."
- **B.2 nested-rings lab:** "Given a specific task, identify which tier you're operating in."
- **B.3 dials — six potential micro-labs** (highest lab density in Section B):
  - Temperature: compare temp 0.1 vs 1.0 on the same creative prompt
  - System prompt: write one for a real work persona
  - Context window: file-size estimation exercise
  - Top-P + Temperature together
- **B.3 next-word prediction:** "The report needs to be ___" — give attendees a work sentence with a blank, predict, verify.
- **B.4 model selection:** Match 3 real tasks → category → tier.
- **B.4 Cost × Intelligence:** Estimate cost of running an AI task 1000× with frontier vs open-weight.
- **B.5 paradox discussion:** "Which rung is your organization on? What's blocking the next?"

---

# SECTION C — Mindset (`mindset-section-c/`)

**Role in deck:** Five mindset shifts (explicitly labeled "MINDSET 1/5" through "5/5") + a Kofi Annan bridge slide. The shifts form a cumulative argument: Tool→Bridge (what it is) → Fear→Leverage (how to feel) → Executor→Orchestrator (what you do) → V-shape work (how you spend time) → Role→Trajectory (who you are).

### C.1 — Tool → Bridge (`c1-tool-to-bridge.tsx`)

**FIG Label:** `C · 1 — MINDSET 1 / 5`
**Headline:** "From *Tool* to *Bridge*."
**Big declaration:** "AI is not a ~~tool~~. It's a *bridge*."
**From/To:**
- **From:** occasional use, narrow tasks, single sessions
- **To:** daily fluency, broad reach, *standing capability*

### C.2 — Fear → Leverage (`c2-replacement-multiplier.tsx`)

**FIG Label:** `C · 2 — MINDSET 2 / 5`
**Headline:** "From *Fear* to *Leverage*."
**Opening (compassionate):** "Most of us start with AI the way we started with Google — type, read, move on. *That's a reasonable place to start.*"
**Turn:** ~~"AI will replace me."~~ → "Someone using AI will. *So I learn to use it.*"

**Four leverage cards:**
| Card | Key bullets |
|---|---|
| MULTIPLIER | *10×* existing output · On work you *already do well* · *Compound* over time |
| VELOCITY | *5 drafts* in the time of 1 · *Cheaper* to try · More shots, more learning |
| JUDGMENT | Your *taste scales* when typing doesn't · *Verify* is the new bottleneck · *Domain expertise* wins |
| REACH | Beyond your team's *headcount* · *Cross-domain* in one head · Output that *travels* with you |

**Footer:** "Move from *fear* to *fluency*. The cost of trying is now *nearly zero*."

### C.3 — Executor → Orchestrator (`c3-executor-orchestrator.tsx`)

**FIG Label:** `C · 3 — MINDSET 3 / 5`
**Headline:** "From *Executor* to *Orchestrator*."

| EXECUTOR (DO. DEBUG. REPEAT.) | ORCHESTRATOR (Direct. Verify. Decide.) |
|---|---|
| Write the work line by line | Design and architect |
| Debug manually | Specify intent |
| Document everything | Verify and review |
| Repetitive sub-tasks | Set the guardrails |
| Manual handoffs | Decide and own it |
| Time → *typing* | Time → *thinking* |

**Punchline:** "AI handles the typing. **You handle the** *thinking*."

### C.4 — The Shape of the New Work (`c4-v-bounce-workflow.tsx`)

**FIG Label:** `C · 4 — MINDSET 4 / 5`
**Headline:** "The *Shape* of the *New Work*."

**V-workflow nodes:**
1. **SPECIFY** — "what to build, why it's right" *(human)*
2. **GENERATE** — "bulk work — AI does this" *(AI, V-bottom)*
3. **VERIFY** — "review, validate, judge" *(human)*
4. **SHIP IT**

**Time redistribution:**
| | SPECIFY | GENERATE | VERIFY |
|---|---|---|---|
| BEFORE | 10% | 80% | 10% |
| AFTER | 30% | 20% | 50% |

**Anchor statement:** "*Verification is the new core skill.*"
**Footer:** "More time on *what to build* and *why it's right*. Less time on *how to type*."

### C.5 — Role → Trajectory (`c5-role-trajectory.tsx`)

**FIG Label:** `C · 5 — MINDSET 5 / 5`
**Headline:** "From *Role* to *Trajectory*."

**Four WHY NOW beats:**
- COMPETITIVE — "Roles without AI fluency stop being *economical*."
- CAPACITY — "AI fluency multiplies what one person can do."
- CULTURAL — "Modern teams default to AI-augmented work."
- PERSONAL — "From writing the answer to *choosing the question*."

**Declaration:** "It's not a ~~role~~ you take. It's a *trajectory* you build. The bridge from *where you are* to wherever you need to be."

### C.6 — Bridge to D (`c6-bridge-to-d.tsx`)

**FIG Label:** `C · 6 — BRIDGE · FROM MINDSET TO MECHANICS`
**Quote (typewriter):** "Knowledge is *power*. Information is *liberating*. Education is the premise of progress, in every society, in every *family*." — Kofi Annan
**Handoff:** "From here, the *how*."

### Practice-lab extraction surface — Section C

- **C.2 four-quadrant labs** — each card is its own exercise (Multiplier / Velocity / Judgment / Reach).
- **C.3 Executor → Orchestrator** — strongest single lab concept in the deck. "Take a task you currently execute manually — walk it through the Orchestrator pattern."
- **C.4 V-shape mapping** — "Map one real current task onto the 4-node V-shape. What's SPECIFY (human)? GENERATE (AI)? VERIFY (human)?"
- **C.4 BEFORE/AFTER time bars** — self-assessment for top 3 recurring tasks.
- **C.4 "Verification is the new core skill"** — densest lab seed: "Here's an AI-generated summary; find 3 things you'd verify and explain why your domain knowledge enables it."

---

# SECTION D — Foundation Core (`foundation-core/`)

**Role in deck:** Conceptual bedrock. Why process improvement must precede automation, the BPM→RPA→AI→IPA→Agentic landscape, and the decision framework. The "before you touch a tool" section.

### D.1 — The Trap (`d1-the-trap.tsx`)

**FIG Label:** `D · 1 — THE TRAP`
**Stat:** **73%** of automation projects *fail*.
**Mechanism:** "Automation *amplifies* what's already there. *Broken* or *excellent*."
- manual pace = 1× vs machine pace = 1,000×
- "A bad process automated runs *1,000×* faster — at being bad."
**Prescription:** "Fix the *spec* first. Then automate. *Process improvement* is a prerequisite, not a phase."

### D.2 — The Convergence (`d2-the-convergence.tsx`)

**FIG Label:** `D · 2 — THE CONVERGENCE`
**Headline:** "Three disciplines *converge*. One *evolves*."

| Key | Name | Tagline | Bullets |
|---|---|---|---|
| BPM | Business Process Management | "The *GPS* for operations" | Holistic workflow / Identifies bottlenecks / Redesigns end-to-end |
| RPA | Robotic Process Automation | "*Deterministic* digital workers" | Rule-based / Fast, reliable, no intelligence / Scales repetitive ops |
| AI | Artificial Intelligence | "*Core strengths*" | Summarization & analysis / Generation & NLU / Multimodal & adaptive |
| IPA | Intelligent Process Automation | "End-to-end *intelligent* workflow" | Combines process + automation + AI / Context-aware / End-to-end orchestration |
| AGENTIC | Autonomous Agents | "*Goals*, not just steps" | Self-directed toward outcomes / Multi-agent / Continuous learning |

**Summary:** "*BPM + RPA + AI fuse into IPA.* Given a goal, it *becomes Agentic.*"

### D.3 — One Process · Four Levels (`d3-one-process-four-levels.tsx`)

**FIG Label:** `D · 3 — ONE PROCESS · FOUR LEVELS`
**Subline:** "Monthly operations report — same task, *four lenses.*"

| Level | Ask | Outcome |
|---|---|---|
| BPM | "Where's the *waste*?" | "Fewer reports; *clearer signal.*" |
| RPA | "What *repeats*?" | "*Hours reclaimed;* zero copy-paste." |
| IPA | "Which steps need *AI*?" | "*Insight,* not just data." |
| AGENTIC | "Can this *run itself*?" | "Earlier signals; *ambient* reporting." |

**Capstone:** "≈*80%* time saved · *risks* surfaced earlier."

### D.4 — Decision Pattern (`d4-decision-pattern.tsx`)

**FIG Label:** `D · 4 — WHICH LEVEL · WHEN`
**Headline:** "Each level *builds on the previous.* You *can't skip.*"

**Decision ladder:**
1. Does the process work today? **NO → STOP**
2. Have you removed waste + bottlenecks? **NO → BPM first**
3. Are there repetitive, rule-based steps? **YES → RPA**
4. Do steps need AI's core strengths? **YES → IPA**
5. Should it pursue a goal autonomously? **YES → AGENTIC / NO → stay at IPA**

**Footer:** "*Skip a level, and the level above fails harder.*"

### D.5 — Bridge to E (`d5-bridge-to-e.tsx`)

"Process is the *spec.* Engineering is the *system* around it. — *how the system gets built*"

### Practice-lab extraction surface — Section D

- **Spec-First lab:** Give attendees a broken fictional process — identify the spec problem BEFORE introducing AI.
- **Discipline classification:** 10 automation scenarios → BPM / RPA / AI / IPA / AGENTIC.
- **Four-lenses drill:** Take one concrete process (e.g., "monthly reporting") → apply each of the four asks in sequence.
- **Decision-tree walkthroughs:** 5 short process descriptions → walk through the 5-question ladder.
- **"Skip a level" failure analysis:** Diagnose which level was skipped and what failed.

---

# SECTION E — Foundation Core (Engineering) (`foundation-core-section-e/`)

**Role in deck:** The three-layer engineering framework (Prompt / Context / Harness). The mental model section that makes Section F's specific techniques land.

### E.1 — Three Layers (`e1-three-layers.tsx`)

**FIG Label:** `E · 1 — THE THREE LAYERS`
**Headline:** "Three layers. *Each one contains the last.*"

| Layer | Essence | Summary | Key terms |
|---|---|---|---|
| Prompt Engineering | the *instructions* | "How to interact with AI properly." | Role / Task / Output / Examples / Structure |
| Context Engineering | the *information* | "How to weaponize AI with the right understanding." | Memory / RAG / Tools / System / Persistence |
| Harness Engineering | the *system* | "How to leverage AI at its optimal capability." | Orchestration / Observability / Subagents / Triggers / Memory |

**Footer quote:** "*A decent model with a great harness beats a great model with a bad harness.*" — Anthropic

### E.2 — Prompt: What & Why (`e2-prompt-what-why.tsx`)

**FIG Label:** `E · 2 — LAYER 1 · PROMPT`
**Outcomes:**
- "*Vague in* → vague out."
- "*Structured in* → structured out."
- "*Show what good looks like* → fewer iterations, more useful results."

**Naive prompt:** `"Write me this week's project report."`
**Naive output:** `"This week, the team made progress on several initiatives. Various items were completed and others are ongoing. Next week we plan to continue the work in flight."`

**Proper prompt structure:**
```
Role: You are a project lead preparing the Friday status report.
Task: Draft a concise weekly status — (1) what shipped, (2) what's at risk, (3) next week.
Context: For EOD Friday team standup. Audience: 8 cross-functional stakeholders.
Examples: See last week's report (attached) — match structure and tone.
Output: Markdown, H2 sections, ~250 words. Lead with the at-risk item.
```

### E.3 — Prompt Structure (`e3-prompt-structure.tsx`)

**FIG Label:** `E · 3 — LAYER 1 · STRUCTURE`
**Headline:** "One *skeleton.* Many names."

**The Spine (6 elements):**
| # | Name | Essence |
|---|---|---|
| 1 | Role | "Who AI should be" |
| 2 | Instruction | "Action + how" |
| 3 | Output Format | "Shape of result" |
| 4 | Context | "Background + audience" |
| 5 | Examples | "Show good output" |
| 6 | Input | "Specific data" |

**10 framework mnemonics:** RACE, CARE, APE, COAST, CREATE, ROSES, TAG, PAIN, RISE, CREO. *"Same six ingredients."*

### E.4 — Prompt Methodologies (`e4-prompt-methodologies.tsx`)

**FIG Label:** `E · 4 — LAYER 1 · METHODOLOGIES`
**Headline:** "Eight techniques. *Three tiers.*"

**Tier 1 — BASIC:**
- **Zero-Shot** — "Ask once, no examples." `"Analyze the financial risks in our Q3 report..."`
- **Few-Shot** — "Show 2–3 examples." `"Classify these emails: 'Help with balance' → Finance..."`
- **Chain-of-Thought** — "Think step by step." `"Calculate CAC: 1. Identify marketing expenses / 2. Count new customers / 3. Divide..."`

**Tier 2 — INTERMEDIATE:**
- **Self-Consistency** — "Multiple paths, consensus." `"Generate 3 approaches to cut costs 15%..."`
- **Tree of Thoughts** — "Branch decision paths." `"Expand to new market — Path A: Singapore vs Thailand / Path B: Germany vs Netherlands..."`

**Tier 3 — ADVANCED:**
- **RAG** — "Retrieve + ground in docs." `"From our knowledge base: search 'remote work policy'..."`
- **ART** — "Reason + use tools." `"Prepare quarterly financials: Calculator → growth %, Web search → benchmarks, CRM → metrics..."`
- **ReAct** — "Think → Act → Observe → repeat." `"Debug churn spike: Thought → check support tickets / Action → search Oct complaints / Observation → 45% billing issues..."`

### E.5 — Prompt: The Wall (`e5-prompt-the-wall.tsx`)

**FIG Label:** `E · 5 — LIMITS OF PROMPTING`
**Headline:** "A *great prompt* still has *limits.*"

**Even a perfect prompt can't:**
1. Provide knowledge the model wasn't trained on
2. Pull current or proprietary data
3. Use tools, call APIs, or take actions
4. Persist memory across sessions
5. Verify its own output against reality
6. Run autonomously on schedule or trigger

### E.6 — Context: What & Why (`e6-context-what-why.tsx`)

**FIG Label:** `E · 6 — LAYER 2 · CONTEXT`
**Headline:** "Layer 2: *Context* — relevance."
**Definition:** "Context = filling the model's window with just the *right information* — for each step."
**Hook:** "AI without context is like hiring an expert with *amnesia.*"

**Six context components:**
| Component | Role |
|---|---|
| User Prompt | The instructions you just spent four slides on |
| Conversation Memory | What was said earlier in this session |
| RAG Knowledge | Documents pulled in for this specific question |
| Tools & APIs | Actions in the world |
| Persistent Memory | What the model remembers across sessions |
| System Instructions | Who the model is, the tone to use |

### E.7 — Context Strategies (`e7-context-strategies.tsx`)

**FIG Label:** `E · 7 — CONTEXT STRATEGIES`
**Four strategies:**
- **WRITE** — Store data (long-term memory, scratchpad, session state)
- **SELECT** — Choose data needed (retrieve tools/scratchpad/memory/knowledge)
- **COMPRESS** — Summarize past events (trim irrelevant tokens)
- **ISOLATE** — Separate tasks (partition state, sandbox, multi-agent)

### E.8 — Context: The Wall (`e8-context-the-wall.tsx`)

**FIG Label:** `E · 8 — CONTEXT · PITFALLS`
**Four pitfalls:**
- **CONTEXT CONFLICT** — "Sources contradict → cognitive gridlock"
- **CONTEXT CONFUSION** — "Tools + noise + cognitive overload"
- **CONTEXT POISONING** — "Wrong info spreads silently"
- **CONTEXT DISTRACTION** — "Token overload → the 'dumb zone'"

### E.9 — Harness: What & Why (`e9-harness-what-why.tsx`)

**FIG Label:** `E · 9 — LAYER 3 · HARNESS`
**Definition:** "Harness = the *software around the model* — orchestration loops, tools, memory, context management, hooks, observability."

**Stats:**
- Same model, better harness: **52.8% → 66.5%** task completion (+13.7 pts)
- Multi-agent harness: **+90.2%** over single-agent

**Equation:** ***Agent = Model + Harness***
**Tagline:** "*Build once. Use forever.*"

### E.10 — Harness Practices (`e10-harness-practices.tsx`)

**FIG Label:** `E · 10 — HARNESS · PRACTICES`

**Eight practices:**
| # | Name | Essence |
|---|---|---|
| 01 | Orchestration | "The agentic loop that makes the model act." (ReAct) |
| 02 | Plugins | "Skills · MCP · Subagents · Hooks" |
| 03 | Memory | "Spec · PROGRESS.md · AGENTS.md · Git" |
| 04 | Observability | "Log · trace · checkpoint" |
| 05 | Triggers | "Manual · Schedule · Event" |
| 06 | Spec-driven | "Spec → code → verify → repeat" |
| 07 | HITL | "NEVER · TERMINATE · ALWAYS" (human approves) |
| 08 | Ralph Wiggum | "Autonomous loop persists until spec is met" |

### E.11 — Bridge to F (`e11-bridge-to-f.tsx`)

"Three layers. The *fundamentals* are built. — techniques that matter most"

### Practice-lab extraction surface — Section E

- **E.2 Naive-to-Proper rewrite (highest ROI lab in the deck):** 5 naive prompts → rewrite using Role/Task/Context/Examples/Output.
- **E.3 Framework exploration:** Use one acronym (e.g., RACE) for a real weekly task; identify which spine elements it covers.
- **E.4 Technique matching:** 8 task descriptions → match to Zero-Shot / Few-Shot / CoT / Self-Consistency / ToT / RAG / ART / ReAct.
- **E.4 CoT practice:** Pick a real calc/analysis task → Zero-Shot version → rewrite as CoT with explicit steps → compare.
- **E.5 "Where Does Prompting End?":** 6 tasks; sort into solvable-by-prompt vs needs-Context-or-Harness.
- **E.6 Context audit:** Describe current AI usage → label which of 6 context components you're using and missing.
- **E.7 Strategy selection:** 4 scenarios → pick WRITE/SELECT/COMPRESS/ISOLATE.
- **E.9 Harness equation reflection:** "In what you've built so far, what is your harness?"
- **E.10 Harness practice prioritization:** Rank the 8 practices for your team — which 3 first?

---

# SECTION F — Foundation Techniques (`foundation-techniques-section-f/`)

**Role in deck:** The most lab-extractable section. The seven techniques in the "agentic stack": RAG (knowledge pillar) + Plugins/Skills/MCP/Hooks/Sub-agents (capability pillar), capped with F.8's full Agentic OS vision. Each slide (F.2–F.7) uses an identical 5-facet interactive structure.

### F.1 — Two Pillars (`f1-two-pillars.tsx`)

**FIG Label:** `F · 1 — TWO PILLARS`
**Subtitle:** "What AI *knows.* What AI *does.*"
- KNOWLEDGE — "AI gets to *facts*" — F.2 · grounding
- CAPABILITY — "AI gets to *act*" — F.3 – F.7 · the package

### F.2 — RAG: Ground Truth (`f2-rag-ground-truth.tsx`)

**FIG Label:** `F · 2 — GROUND TRUTH`
**Headline:** "RAG · *Grounding* in your *facts*"

**Five facets:**
- WHAT IT IS — "a *fact-checker* reading the *actual manual*"
- HOW IT WORKS — "*retrieve* · *augment* · *generate*"
- THE TYPES — "*vector* · *graph* · *file* · *hybrid*"
- WHEN TO REACH — "*fact-sensitive,* *fresh*"
- EXAMPLE — "answer from the *company handbook*"

**Example workflow:**
- Question: `"what's our policy on remote work?"`
- Retrieved [1]: handbook §2 — "Up to 3 remote days per week with manager approval."
- Retrieved [2]: handbook §4 — "Core hours 10:00–15:00 local time."
- Grounded answer: cites [1] and [2]

### F.3 — Plugins: The Package (`f3-plugins-the-package.tsx`)

**FIG Label:** `F · 3 — THE PACKAGE`
**Headline:** "Plugins · The *expertise package*"

- WHAT IT IS — "your expertise, in a *folder* anyone can *install*"
- WHAT'S INSIDE — "*Skills* · *Hooks* · *MCP* · *Sub-agents*"
- WHY PACKAGE — "*install once,* distribute, version, update *everywhere*"
- HOW IT LOADS — "*discover* → *load* → *context-budget*"
- EXAMPLE — `a "weekly-report" plugin shipped to the team`

**Footer:** "*expertise,* packaged"

### F.4 — Skills: Write Once (`f4-skills-write-once.tsx`)

**FIG Label:** `F · 4 — (SKILLS)`
**Headline:** "Skills · *Write expertise once*"

**Example SKILL.md (streamed in slide):**
```yaml
---
name: weekly-report-author
description: Drafts weekly status reports from project notes.
---

# Weekly Report Author

You are a senior project manager preparing the Friday status report.

## Sections
1. What shipped this week
2. What's at risk
3. Next week's priorities

## Tone
Factual, audience: 8 cross-functional stakeholders.
```

**Progressive disclosure:**
- L1 METADATA (~100 tokens, always loaded) — YAML frontmatter
- L2 INSTRUCTIONS (<5K tokens, when triggered) — SKILL.md content
- L3 RESOURCES (unlimited, as needed) — reference files, scripts, examples

**Footer:** "*write once.* update once. *everyone gets the new standard.*"

### F.5 — MCP: The Adapter (`f5-mcp-the-adapter.tsx`)

**FIG Label:** `F · 5 — (MCP)`
**Headline:** "MCP · The *universal adapter*"

- WHAT IT IS — "*USB for AI*"
- DUAL ROLE — "*data side* · *tool side* · *same protocol*"
- API vs MCP vs CLI — "*three ways* AI talks to your systems"
- WHAT MCP EXPOSES — "*resources* · *tools* · *prompts*"
- EXAMPLE — `"summarize my inbox at 5pm daily"`

### F.6 — Hooks: Unsexy Work (`f6-hooks-unsexy-work.tsx`)

**FIG Label:** `F · 6 — (HOOKS)`
**Headline:** "Hooks · Doing the *unsexy work*"

- WHAT IT IS — "*reflexes* on *events*"
- LIFECYCLE EVENTS — "*SessionStart* · *PreToolUse* · *PostToolUse* · *Stop*"
- THREE HOOKS DOING THE UNSEXY WORK:
  - SessionStart — "auto-convert what Claude can't read" (PDF/DOCX/XLSX → .md)
  - PostToolUse (Edit | Write) — "every action recorded" (audit log)
  - Stop — "human gate at session end"
- EXAMPLE — "auto-audit on every *weekly-report save*"

**Footer:** "*reflexes on events.* AI quietly doing its homework."

### F.7 — Sub-agents: Specialists (`f7-subagents-specialists.tsx`)

**FIG Label:** `F · 7 — (AGENTS)`
**Headline:** "Sub-agents · *Specialist departments*"

**Five facets:**
- WHAT IT IS — "*specialists,* not *generalists*"
- HOW THEY WORK — "*isolated context* · *specific role* · *own permissions*"
- ORCHESTRATION PATTERNS:
  - CENTRALIZED — planner top, hub-and-spoke
  - DECENTRALIZED — peer mesh, flat network
  - CHAIN — sequential handoff
  - PARALLEL — fan-out / merge
- WHEN TO USE WHICH — tradeoff matrix
- EXAMPLE — `"monthly board pack"`: Planner → Finance/Research/QA (parallel) → Reviewer → Output

**Footer:** "the *planner picks the pattern*"

### F.8 — Your Agentic OS (`f8-your-agentic-os.tsx`)

**FIG Label:** `F · 8 — YOUR AGENTIC OS`
**Headline:** "The *command center* you *carry.*"
**Tagline:** "*this is yours* — wherever you go, you *carry it.*"

**Interactive monitor mockup with 8 panels:**

| Panel | Content |
|---|---|
| Dashboard | Digest · Brief · Calendar · Activity sparkline |
| Skills | 14 chips: `/vault-cleanup`, `/morning-brief`, `/inbox-triage`, `/deep-research`, `/yt-titles`, `/outline`, `/kb-query`, `/carousel`, `/short-form`, `/lightrag-upload`, `/reply-drafter`, `/meeting-notes`, `/calendar-optimizer`, `/prd-drafter` |
| Agents | Finn (Finance), Sched (Scheduler), Draft (Drafter), Rex (Researcher), QA (Reviewer), Reply (Customer Reply) |
| Vault | Notes (142) / Reports (38) / Drafts (22) / Archive (511) / Inbox Snapshots / Meeting Transcripts / Research Library / Workshops |
| Memory | WHO YOU ARE · HOW YOU WORK · WHAT YOU'RE WORKING ON · RECENT LEARNINGS |
| Connectors | Gmail ✓ Calendar ✓ Drive ✓ Slack ✓ Notion ✓ GitHub ✓ Stripe ✓ (read-only) / Linear ✗ |
| People | A. Lead · M. Design · J. QA · S. Peer · R. Exec |
| Settings | (model selector: claude-opus-4-7 / claude-haiku-4.5 / gemini-3.1-pro / gpt-5.5) |

### F.9 — Bridge to G (`f9-bridge-to-g.tsx`)

"Seven *techniques.* The *toolkit* is open. — Next: the *platforms* that bring them to *life.*"

### Practice-lab extraction surface — Section F

**Highest-density lab section in the deck.**

- **F.2 RAG labs:**
  - "Build a policy Q&A" — handbook excerpt → write a RAG-style prompt with citations
  - "When does RAG apply?" — 6 tasks → RAG vs long-context vs neither
- **F.3 Plugin packaging:** "Package your expertise" — write a minimal SKILL.md for one recurring task
- **F.4 Progressive disclosure design:** Categorize components of your skill into L1/L2/L3
- **F.5 MCP conceptual mapping:** 5 integration scenarios → API / MCP / CLI
- **F.6 Hooks design:** Pick 3 lifecycle events → write what each hook would do
- **F.7 Orchestration pattern selection:** 4 multi-task scenarios → Centralized/Decentralized/Chain/Parallel
- **F.8 Agentic OS vision:** Draft your own 3 Skills + 1–2 Agents + top 3 Connectors + Memory profile
- **F.4 + F.3 combined — "Write a Skill, Ship It":** Most complete single lab; produce a SKILL.md inside a plugin folder
- **Cross-section capstone — "Full stack for one task":**
  1. D.3: spec check
  2. E.2: write the proper prompt
  3. E.4: pick the right technique
  4. E.7: pick the context strategy
  5. F.4: package as a Skill

---

# SECTION G — Application: The Ecosystem (`application-section-g/`)

**Role in deck:** Vendor map (Claude / Google / OpenAI), platform breakdown, capability surface, head-to-head, decision matrix, end-to-end workflow, beyond-the-Big-Three. The "what tools exist and how they relate" chapter.

### G.1 — Ecosystem Overview (`g1-ecosystem-overview.tsx`)

**Headline:** "Three vendors. *Specialization*, not *single winners*."

| Vendor | Tagline | Highlights |
|---|---|---|
| Claude | "Deep *reasoning* + *agentic* workflows" | Coding lead (CursorBench), Agentic Cowork, Design extraction |
| Google | "*Integration* + *research*" | Workspace native, NotebookLM, generous free tier |
| OpenAI | "*Accessibility* + *ecosystem*" | Web search, Workspace Agents, Codex IDE |

**Closing:** "Pick the *right tool* for each task — never the *right vendor* for every task."

### G.2 — Claude Platforms (`g2-claude-platforms.tsx`)

**Headline:** "Four *platforms*. One *Claude*."

| Platform | Tagline |
|---|---|
| WEB — Claude Web | "*Browser-native*. *Zero install*." Projects, Skills, Connectors, Artifacts |
| DESKTOP — Claude Desktop | "*Native client*. *Full power*." Plugins, Live Artifacts, Scheduled, Dispatch |
| CLI — Claude Code CLI | "*Terminal-first*. *Scriptable*." Universal, plugins, pairs with Routines |
| API — API / SDK | "*Programmatic*. *Everywhere else*." Prompt caching, Extended Thinking, Computer Use |

### G.3 — Claude Capabilities (`g3-claude-capabilities.tsx`)

**Headline:** "*Eight surfaces*. Pick the ones you'll use."

| Card | Description |
|---|---|
| Connectors | "External system *handshake*." |
| Plugins | "Bundled *capability folders*." |
| Projects | "Persistent *workspace memory*." |
| Dispatch | "Hand off work to *agents*." |
| Schedules | "*Autonomous*, *recurring* cloud tasks." |
| Web Artifacts | "Interactive *visualization dashboard*." |
| Diagrams | "Interactive *node-graph* rendering." |
| Design | "*Design-system extraction → handoff*." |

**Schedules vs Routines vs /loop (compare overlay):**
| | Cowork Schedules | Code Routines | /loop |
|---|---|---|---|
| Where | Anthropic cloud | Your machine | Active session |
| Needs machine on | No | Yes | Yes |
| Min interval | 1 hour | 1 minute | 1 minute |
| Permissions | None (fully autonomous) | Configurable | Inherits session |

### G.4 — Built-In Tools & Commands (`g4-builtin-tools.tsx`)

**Four quadrants (2×2):**
- **AGENTS:** Explore, Plan, Task, general-purpose, claude-code-guide
- **HOOKS:** SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PreCompact, Stop
- **BUILT-IN TOOLS:** Read, Write, Edit, Bash, Grep, Glob, WebFetch, WebSearch
- **SLASH COMMANDS:** /clear, /rewind, /compact, /loop, /init, /agents, /resume, /help

**Footer:** "*Skills* are *recipes*. MCP is the *kitchen*. Plugins are the *meal kits*."

### G.5 — Google (`g5-google.tsx`)

**Headline:** "Seven surfaces. *NotebookLM* is the *standout*."

| Tool | Description |
|---|---|
| NotebookLM (hero) | "*Source-grounded* research over your own documents — answers *cited*, sources visible." |
| Workspace Studio | "Gemini *stitched* into Docs, Sheets, Slides, Gmail." |
| AI Studio | "Build + ship: *prompt playground*, model picker, deploy." |
| Canvas | "Documents that *morph into apps* in-place." |
| Flow | "*Frame-by-frame* video generation." |
| Stitch | "Visual app design — *sketch in, layout out*." |
| Gems | "*Persona-pinned* Gemini for repeated jobs." |

### G.6 — OpenAI (`g6-openai.tsx`)

**Headline:** "Three surfaces. *Brief by design*."

- **ChatGPT** (Consumer reach) — Web search + ecosystem
- **Codex App** (Coding GUI) — Parallel git worktrees, macOS GA
- **Workspace Agents** (Cloud autonomous) — Scheduled triggers, Slack/Salesforce integration

### G.7 — Head-to-Head (`g7-head-to-head.tsx`)

**Headline:** "Easily confused. Pick by *shape*, not *vendor*."

**Five comparison shapes:**
1. **Persistent AI config** — Gems (persona) vs Projects (container) vs Workspace Agents (autonomous task)
2. **Design-to-code** — Stitch (visual) vs Claude Design (codebase-aware)
3. **Interactive output** — Canvas (doc-mode) vs Live Artifacts (app-mode, connector-backed)
4. **Developer IDE** — Claude Desktop (chat-canvas, mobile) vs Codex App (VS Code base, worktrees)
5. **CLI** — Claude Code (MCP-rich), Codex (worktrees), Gemini (long context, generous free)

**Recap grid ("Pick when"):**
- Named expert for repeat tasks → Gems
- Shared workspace for a project → Projects
- Runs without you 24/7 → Workspace Agents
- Visual designers → Stitch
- Codebase-aware → Claude Design
- Collaborative draft → Canvas
- Live KPI dashboard → Live Artifacts
- Mobile-first + tool-calling → Claude Desktop
- Desktop-heavy IDE → Codex App
- Tool-calling depth, MCP-rich → Claude Code
- Parallel worktrees, GPT-5 → Codex
- Generous free, long context → Gemini

**Footer:** "*Vendors rebrand*. The *five shapes* won't."

### G.8 — Capability Matrix (`g8-capability-matrix.tsx`)

**Headline:** "Vendor × use case. The *decoder*."

| Use case | Claude | Google | OpenAI | Best fit | Start here? |
|---|---|---|---|---|---|
| Chat Q&A | ●●● | ●●● | ●●● | Ecosystem | On Workspace? → Gemini / else → Claude.ai |
| Grounded Research | Projects ●●● | NLM+Gems ●●●● | — | NotebookLM | Private docs? → NLM / else → Projects |
| Code generation | Code ●●●● | Antigravity ●● | Codex ●●● | Claude Code | Solo build? → Claude Code / async? → Codex |
| Prototype/Design | Design ●●●● | Stitch+AI Studio ●●● | — | Claude Design | Visual-first? → Stitch / Codebase-aware? → Design |
| Agentic workflow | Cowork ●●●● | Works. Studio ●●● | Works. Agents ●●● | Workspace Agents | Knowledge work? → Cowork / Schedule? → Agents |
| Real-time dashboards | Artifacts ●●●● | Sheets+Gemini ●● | ChatGPT ●● | Live Artifacts | Connector-backed? → Live Artifacts |

### G.9 — The Workflow (`g9-workflow.tsx`)

**Headline:** "Building a production-grade website, *end to end*."

**Seven stages:**
| # | Stage | Purpose | Tools |
|---|---|---|---|
| 01 | RESEARCH | Understand the problem | NotebookLM, Drive MCP, web |
| 02 | BRAINSTORM | Explore approaches | Claude chat, trade-offs |
| 03 | PLAN | Design the solution | Claude chat, Architect subagent, spec doc |
| 04 | PROTOTYPE | Sketch + design system | Stitch OR Claude Design, image gen |
| 05 | IMPLEMENT | Build with AI | Claude Code, Plugins, Skills, MCP |
| 06 | TEST | Verify quality | Claude evals, subagent tests |
| 07 | SHIP | Deploy with confidence | Codex review, Routines, PR auto-merge |

**Maxim:** "KEEP ORCHESTRATOR LEAN — Claude *conducts*; specialists *do the work* in their stage."

### G.10 — Beyond the Big Three (`g10-beyond-big-three.tsx`)

**Headline:** "Three more worth knowing — for when *the giants don't fit*."

- **OpenClaw** (~350K stars, MIT) — Open-source AI agent, self-host friendly, privacy moat
- **Hermes Agent** (~64K stars) — Self-improving, persistent memory across sessions
- **n8n** (~80K stars) — LLM-native workflow automation (MCP integration, 2026)

**Footer:** "*Privacy moats*, *memory moats*, *integration moats* — the three things the Big Three are still figuring out."

### G.11 — Bridge to H (`g11-bridge-to-h.tsx`)

"You have *the tools*. *The toolkit* is built. — Next: how to *wield them with discipline*."

### Practice-lab extraction surface — Section G

- **G.5 NotebookLM (best zero-setup lab):** Upload 3–5 real documents, test cited Q&A, generate audio overview, run cross-source contradiction check.
- **G.3 Web Artifacts:** Paste a small dataset → generate an interactive HTML dashboard → iterate ("add a filter, make it a bar chart").
- **G.7 Persistent AI config classification:** Bring-your-own-scenario → Gem vs Project vs Workspace Agent.
- **G.9 End-to-end tracing:** Take one workplace task → fill in a 7-stage table (Research → Ship). Reveals invisible coordination AI absorbs.
- **G.3 Schedules vs Routines vs /loop:** 4–5 automation scenarios → pick the pattern.
- **G.8 Capability matrix populate:** Given 5–6 hypothetical knowledge-work scenarios, populate a mini-matrix.

---

# SECTION H — Application: The Discipline (`application-section-h/`)

**Role in deck:** Short, sharp counterweight to G. 8 failure modes + 8 discipline moves with cross-highlight mapping.

### H.1 — The Trap (`h1-pitfall-wall.tsx`)

**Headline:** "What *untrained use* looks like."

| ID | Name | Symptom | Cost |
|---|---|---|---|
| A | Vibe coding | No spec, no review, no plan | Burns trust, breaks deploys |
| B | Prompt-and-pray | Asks once, ships output | Generic results, blamed the tool |
| C | Sensitive-data leaks | Pasted credentials into prompt | One paste = full breach |
| D | Tool overload | Twenty tools, no strategy | AI picks wrong one under stress |
| E | Confidently-wrong | "AI said it; must be right" | Decisions on hallucinated facts |
| F | Stale data as truth | Knowledge cutoff hidden | Yesterday's answer to today's question |
| G | Over-engineering | AI for what scripts handle | Cost + maintenance for nothing |
| H | Context rot | One session lived too long | Performance degrades silently |

**Closing:** "Same tool. Same access. *Different operator*."

### H.2 — The Discipline (`h2-discipline-wall.tsx`)

**Headline:** "What *discipline* looks like."

| # | Name | Move | Resolves |
|---|---|---|---|
| 1 | Sharpen the axe | Spec first; tools aligned to outcome | A, B, G |
| 2 | Goal-driven | Start from outcome; work backward | B, D, G |
| 3 | Build skills, not prompts | Reusable Skills, MCP, Plugins | D, H |
| 4 | Human-in-the-loop | Approval gates; review before commit | A, E |
| 5 | Context discipline | Compact, fresh sessions, just-in-time | H, F |
| 6 | Don't reinvent the wheel | Reuse community Skills, MCPs, Gems | D, B |
| 7 | Eval-driven iteration | Grader tests + regression checks | E, A |
| 8 | Foundation first | Mental model before tools | B, D, G |

**Note:** Pitfall C (sensitive data) has no direct resolution — intentional. No move fully resolves a data leak; framing emphasizes prevention.

### H.3 — Bridge to I (`h3-bridge-to-i.tsx`)

"The competition is *not AI*. It's someone learning *the discipline* first. — Next: *the discipline*, *in practice*."

### Practice-lab extraction surface — Section H

- **H.1 Pitfall spotting:** 5–8 short case vignettes → assign A–H. Debrief: "Have you seen this?" Psychological safety for group confession.
- **H.2 Discipline mapping (paired with H.1):** For each pitfall identified, look up resolving discipline(s) → write one concrete action for this week.
- **H.2 Practice prioritization:** Rank the 8 disciplines for your role; defend the top 3.
- **H.2 Discipline 5 + G.4 /compact demo:** Show a long degraded session → run /compact → reseed with /clear. Teaches "just-in-time context."

---

# SECTION I — The Reveal (`reveal-and-closing/`)

**Role in deck:** Pivot of the entire deck. Meta-reveal that the deck itself was built by AI → credential (who and how) → portfolio (what else) → bridge (you can do this).

### I.1 — The Process (`i1-meta-process.tsx`)

**FIG Label:** `I·1 — THE PROCESS`

**Reveal sequence:**
- "What you've been *watching* so far."
- "It was *built* entirely by *AI*."
- "And here's the *process* that made it possible."

**Four-card AI-assisted build process:**

| Card | Phase | TO DO highlights | Results |
|---|---|---|---|
| 01 Research & Preparation | context · web · ground truth | Pull context (memory + Drive MCP) · Web research (WebSearch + WebFetch) · NotebookLM RAG plugin · parallel sub-agents | 30+ research markdown docs |
| 02 Brainstorm & Plan | objective · structure · system | Deck objective · Section outline · Design meta · Per-slide deep-dive · Technical specs · brainstorming + writing-plans skills | Deck plan · Design system specs · Project structure |
| 03 Prototype | design system · low-fi mockup | Motion · type · color · components · Layouts · Background imagery · Claude Design + gemini-image-gen MCP | Design system HTML · Low-fi MVP deck |
| 04 Implementation | agentic dev + human review | Development (Claude agents) · Review (spec compliance, code review) · Human-in-the-loop · Claude Tasks + sub-agent dev | THIS PRESENTATION |

**Footer:** "Built with *harnesses* · *production-grade* result."

### I.2 — The Journey (`i2-profile-journey.tsx`)

**FIG Label:** `I·2 — THE JOURNEY`
**Headline:** "Introduction. Who am I."

**Profile:**
- ADRIANTO TEDJOKUSUMO
- "AI Steering Committee Lead · Head of TPM @ Nanovest"
- "13 years tech delivery. Zero formal AI training."
- Education: Electrical Eng. — ITB / Computer Vision — Chosun Univ.
- Work: Project Manager — Blibli / Technical Manager — Toppan Ecquaria

**Evolution Journey (5 nodes):**
| Date | Phase | Bullets |
|---|---|---|
| Mar 2025 | foundational & experiment | Articles + YouTube · Daily Claude + Gemini · No goals — just experiment |
| Jun 2025 | build & fail | Built 9 MCPs · Scrapped 2–3 (vibe-code fails) |
| Sep 2025 | evaluate & correct mental model | AI Steering Committee formed · Appointed lead · Drive AI culture company-wide |
| Dec 2025 | build with harnesses | Built 3 agentic systems · Legal, Product, Research |
| Mar 2026 | build with harnesses | Built 2 Nanovest plugins · Product + NotebookLM |

### I.3 — The Portfolio (`i3-portfolio.tsx`)

**FIG Label:** `I·3 — THE PORTFOLIO`
**Headline:** "Built. Taught. In production."

**Monitor with 4 tabs:**

**WORKFLOWS (3 sub-tabs, real screenshots):**
- stocks-intel — "AI-powered US stocks news pipeline: RSS, web scrapping, sentiment, daily brief"
- legal-docs — "End-to-end legal document automation with AI revision capability"
- exchange-alerts — "Automated monitoring with AI classification and Opsgenie alerting"

**PLUGINS (2 sub-tabs):**
- nanovest-product — "End-to-end reusable plugin for PM — ideation to requirements"
- notebooklm — "Exploit max capability of NotebookLM with portability across platforms"

**CONNECTORS (3×3 grid):**
- IN USE: gemini-image-gen, Sonarqube, Bitbucket
- RETIRED (replaced by official Anthropic MCPs): Sentry, Atlassian, Datadog, Google Workspace, n8n, Figma

**WORKSHOPS (2×2 grid):**
- AGENTIC ORGANIZATION · SINARMAS HR — 70% is people and process, six pillars, middle-out champions
- TOWNHALL AISC · NANOVEST — AISC year one, flagship builds, department journey, enabler not delivery
- AI-SDLC FOUNDATION · NANOVEST — productivity paradox, dumb zone, plugin stack, six-step loop, V-bounce
- AI PILOT WORKSHOP · NANOVEST — AI mastery journey, 8 prompt techniques, RACE, context engineering, agent ladder

### I.4 — Bridge: Recipe (`i4-key-message-bridge.tsx`)

"Foundation before *velocity*. A *Project Manager* built this in a year. — Next — *the recipe* that made it possible."

---

## I.3 Simulation Deep-Dives

### StocksIntel.tsx → n8n Stocks News Pipeline

**Real tool:** n8n + LLM API (Gemini)
**4-agent pipeline (daily 11 AM cron):**
1. **Source Aggregator** — 10 RSS feeds (Investing.com, CNBC, Seeking Alpha, Yahoo, MarketWatch, Forbes, Nasdaq, FT, AlphaStreet, Economist) → LLM filter → "valid metadata"
2. **Batch Processing** — WebScraper + LLM → enriched articles
3. **Ticker Generator** — extracts entities, cross-references ground truth → Top 10 ranked
4. **Summary Generator** — LLM template → Slack + Google Sheets

### LegalDocs.tsx → n8n Legal Document Automation

**Real tool:** n8n + Slack + Google Docs + Dropbox Sign + Drive
**4-agent pipeline (triggered by `/nanoearn` Slack command):**
1. **Docs Generation** — Slack form (counterparty, amount, doc_type, term) → template → DocWrite
2. **Approval Workflow** — Slack approval → Finance gate → Legal gate
3. **AI Revision** — LLM processes decline feedback as JSON delta → patches Google Doc (loops back if needed)
4. **E-Sign Automation** — Render PDF → Dropbox Sign → webhook confirmation → archive

### ExchangeAlerts.tsx → n8n Monitoring + AI Classification

**Real tool:** n8n + LLM classifier (Gemini Flash) + Opsgenie + Slack
**4-agent pipeline (hourly cron):**
1. **Feeds Aggregation** — 6 exchanges (Binance, Tokocrypto, Indodax, OKX, Bitmart, Alpaca) via API/Web/RSS/Telegram (no AI · pure fetch)
2. **Filter & Dedup** — hash → fuzzy (92%+) → source canonical (no AI · pure logic)
3. **Batch Classification** — Gemini Flash classifies CATEGORY (maintenance/api/security) × PRIORITY (P1–P5) × RELEVANCE (0.0–1.0)
4. **Alert Generator** — 5 priority buckets → filter to P1/P2/P3 → batch push via Opsgenie → Slack

### NanovestProduct.tsx → Claude Plugin for PM PRD Generation

**Real tool:** Claude Code Skills/Plugin
**4-stage PRD generation (triggered by PM input):**
1. **Discovery** — `prd-brainstorm` 4-phase Q&A (OPEN · PATTERN · DEEP · WRAP) + `research-agent` (WebSearch + MCP)
2. **Draft PRD** — `plan-reviewer` (with loop-back) + `drafter` + `draft-reviewer`
3. **Enrich PRD** — parallel `figma` + `flow` → `enricher`
4. **Publish PRD** — `validate` + `convert` parallel → `publish` to Confluence + Jira + Drive

### NotebookLM.tsx → Claude Plugin Wrapping NotebookLM API

**Real tool:** Claude Code Plugin
**Intent router → 6 specialist agents:**

Ingest tier:
- `youtube-curator` — captions + bulk add
- `drive-scout` — search + batch import (cap 20, circuit-break × 3)
- `url-crawler` — robots.txt-respecting + chunks of 10

Knowledge tier:
- `deep-researcher` — decompose → parallel RAG (notebook + local + web) → cite by source-type (~12s)
- `cross-notebook-query` — rank + parallel + detect contradictions (emits `## Contradictions`)
- `brain-compiler` — second-order, reads `.nlm-brain/sessions` → wiki draft + diff

---

# SECTION J — The Recipe (`reveal-and-closing/`)

**Role in deck:** Personal-lessons handoff. Adri explicitly positions as a beginner sharing hard-earned lessons. Card anatomy across J2–J4 is consistent: "In practice" (what to do) + "Earned from" (the lesson that taught it).

### J.1 — Humility Intro (`j1-humility-intro.tsx`)

"*Still a beginner*. A lot left to learn. — Hard-earned lessons. So you skip my mistakes."

### J.2 — Five Principles (`j2-five-principles.tsx`)

**Headline:** "Mindset before tools."

| # | Principle | In practice | Earned from |
|---|---|---|---|
| 01 | Foundation precedes velocity | Read the concept · Feel if it fits · Then experiment | "Skip foundation = vibe-coding without progress." |
| 02 | Repetition before sophistication | Use AI daily for any task · Drafting · summarizing · deciding · Reps build instinct first | "Months of reps before my first build worked." |
| 03 | Stay on current track, don't chase | New AI ships constantly · Filter: does this serve me? · Skip model-of-the-week | "Most flashy launches don't land in real work." |
| 04 | Build the smallest thing that matters | Start with a prompt template · Or a Skill / workflow snippet · Reuse tomorrow | "First build = prompt template. 30 minutes." |
| 05 | Failure is the next iteration's blueprint | Ship rough, evaluate fast · Each break informs · Iterate · don't perfect | "Most first builds didn't work. Each rebuilt the next." |

**Footer:** "Each one earned. Each one *yours to skip past*."

### J.3 — Building Yourself Up (`j3-recipe-buildup.tsx`)

**Headline:** "Habits before output."

| # | Habit | In practice | Earned from |
|---|---|---|---|
| 01 | Read one thing a week about how AI works | One article/paper/thread · Conceptual reads beat tutorials · Absorption matters | "First months are about absorbing, not outputting." |
| 02 | Use AI daily for anything | Drafting · summarizing · deciding · Small tasks count · Instinct grows | "Months of daily reps before my first build worked." |
| 03 | Pick ONE tool, go deep before adding others | Push one tool across every workflow · Add second only when first limits you | "Went deep on Claude. Skipped the parade." |

**Footer:** "*Quiet habits* now. *Loud output* later."

### J.4 — Building Something That Ships (`j4-recipe-ship.tsx`)

**Headline:** "Build before broadcast."

| # | Move | In practice | Earned from |
|---|---|---|---|
| 01 | Find one recurring annoyance | Weekly pain point · Prompt/skill/snippet · Reuse tomorrow | "First build: status-update template. 30 min. Used daily after." |
| 02 | Evaluate ruthlessly | Compare before vs after · Each break is signal · Iterate · don't polish | "First MCP took 2 weeks of evenings. Each break informed the next." |
| 03 | Share with the same pain | Hand it to others with same problem · Their friction is your spec · Genericize · don't gatekeep | "Shared nanovest-product plugin. PM feedback turned it reusable." |

**Footer:** "Build for *one*. Sharpen by *use*. Share with *many*."

---

# SECTION K — The Handoff

### K.1 — Practice · Lab (`k1-challenge-handoff.tsx`)

"From *watching* to *building*. The recipe is *yours now*. — Next — *Practice Lab*. I'll be with you."

---

# CONSOLIDATED PRACTICE-LAB CATALOG

Drawn from every section's extraction surface, organized by effort and prerequisite. Use this as the brainstorm starting point.

## Tier 1 — Zero Setup, Universal (best for opening labs)

| # | Lab | Source | Time | Notes |
|---|---|---|---|---|
| L1 | **NotebookLM ingest + cross-source Q&A** | G.5, I3-NotebookLM sim | 20–30 min | Free, browser-only. Every attendee can start immediately. |
| L2 | **Naive-to-Proper prompt rewrite** | E.2 | 25 min | Highest-ROI lab in the deck. 5 naive prompts → rewrite with Role/Task/Context/Examples/Output. |
| L3 | **Personal recurring annoyance → reusable prompt** | J.4 card 1 | 20 min | Bring-your-own pain point. Most personal close. |
| L4 | **Pitfall spotting (H.1)** | H.1 | 15 min | 5–8 case vignettes → assign A–H. |
| L5 | **Discipline mapping (H.2)** | H.2 | 15 min | Paired with L4. Each identified pitfall → resolving discipline → concrete action. |
| L6 | **Chain-of-thought rewrite (E.4)** | E.4 | 20 min | Pick a real calc/analysis task → Zero-Shot → rewrite as CoT. |
| L7 | **System prompt for a real persona (B.3)** | B.3 | 15 min | Write a system prompt for a work persona you actually use. |
| L8 | **"Temperature 0.1 vs 1.0" comparison** | B.3 | 10 min | Run the same creative prompt at two temperatures. Compare. |

## Tier 2 — Light Setup (Claude.ai / Gemini account)

| # | Lab | Source | Time | Notes |
|---|---|---|---|---|
| L9 | **Structured classification prompt (ExchangeAlerts)** | F.4, I3-ExchangeAlerts sim | 25 min | 10 sample announcements → JSON output (category × priority × relevance). |
| L10 | **4-phase PRD brainstorm (NanovestProduct)** | I3-NanovestProduct sim | 35 min | Claude Project with system prompt enforcing OPEN·PATTERN·DEEP·WRAP. |
| L11 | **Write a SKILL.md** | F.4 | 30 min | Minimal SKILL.md for one recurring task with L1/L2/L3 disclosure. |
| L12 | **Web Artifacts interactive dashboard** | G.3 | 25 min | Paste a small dataset → ask for an interactive HTML dashboard → iterate. |
| L13 | **Build a Claude Project or a Gem** | G.7 | 30 min | Pick a recurring task → write 3-sentence persona instruction + upload supporting docs. |
| L14 | **Policy Q&A with RAG framing** | F.2 | 25 min | 1-page handbook excerpt → write a RAG-style prompt with simulated citations. |

## Tier 3 — Group / Discussion Labs (no individual tool work)

| # | Lab | Source | Time | Notes |
|---|---|---|---|---|
| L15 | **D.3 four-lenses drill** | D.3 | 30 min | One process → BPM/RPA/IPA/Agentic asks in sequence. |
| L16 | **D.4 decision-tree walkthroughs** | D.4 | 20 min | 5 short scenarios → walk the 5-question ladder. |
| L17 | **D.2 discipline classification (10 scenarios)** | D.2 | 20 min | Each scenario → BPM/RPA/AI/IPA/AGENTIC. |
| L18 | **C.4 V-shape mapping** | C.4 | 25 min | Map one real task onto SPECIFY/GENERATE/VERIFY/SHIP. |
| L19 | **G.9 7-stage workflow planning** | G.9 | 30 min | Given a workplace project → fill in 7 stages with tool assignments. |
| L20 | **G.8 capability matrix populate** | G.8 | 25 min | 5–6 scenarios → pick vendor + tool + "Start here?" logic. |
| L21 | **G.7 shape vs vendor classification** | G.7 | 20 min | Bring-your-own-recurring-task → Gem/Project/Workspace Agent. |
| L22 | **F.7 orchestration pattern selection** | F.7 | 20 min | 4 multi-task scenarios → Centralized/Decentralized/Chain/Parallel. |

## Tier 4 — Power-User / Technical Setup (smaller breakouts)

| # | Lab | Source | Time | Notes |
|---|---|---|---|---|
| L23 | **n8n RSS → LLM filter → Slack** | I3-StocksIntel sim | 60–90 min | Requires n8n instance + API key. |
| L24 | **n8n Slack form → Claude API → Google Doc** | I3-LegalDocs sim | 60–120 min | Requires n8n + Slack Bolt + Google API. |
| L25 | **n8n hourly monitor + LLM classifier** | I3-ExchangeAlerts sim | 60 min | Higher-fidelity version of L9. |
| L26 | **/compact + /clear context discipline demo** | H.2-5, G.4 | 30 min | Live demo + attendee practice on a long degraded session. |
| L27 | **Full-stack capstone (D→E→F)** | Cross-section | 45 min | One task → spec check → proper prompt → technique pick → context strategy → SKILL.md. |
| L28 | **Agentic OS draft (F.8 scaffold)** | F.8 | 40 min | Draft your own 3 Skills + 1–2 Agents + top 3 Connectors + Memory profile. |

## Recommended Sequencing for ~400 Mining Attendees

**Recommended opening:** L1 (NotebookLM — zero setup, universally accessible, immediately practical).

**Core foundation set (in order):**
1. L2 (Naive-to-Proper rewrite) — universally transferable skill
2. L9 (Structured classification) — most useful single LLM pattern in operations
3. L4 + L5 (Pitfall → Discipline) — psychological safety + concrete next steps

**Personalization close:** L3 (Recurring annoyance → reusable prompt) — every attendee leaves with something for their actual desk.

**Optional power-user breakout track:** L23–L25 (n8n labs) for attendees who already have automation tooling. L27 (full-stack capstone) for the most engaged.

**Discussion-only fallback (when tools unavailable):** L15–L22 — all work without individual devices.

---

# Notes on Use

- **Adri-1-indexed step terminology applies:** "Step N" in scripts = code stepIndex (N-1).
- **Body slides are generic by design** — when prepping labs, keep examples universal (knowledge work, reporting, classification). Mining-specific framings live only in hooks (A, I).
- **Keyword highlighting convention** — italic + copper-accent on 1–3 keywords per chunk. Preserve this when quoting slide content in lab handouts.
- **Workshop session format** — Vol-2 has two sessions. Winners present own work in Session 1 → Adri runs Session 2. Section A celebrates capability *classes*, never individual projects.
