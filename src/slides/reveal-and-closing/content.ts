// src/slides/reveal-and-closing/content.ts
// Single source of truth for all reveal+closing slide copy.
// Editing copy here does not require touching slide components.

export const i1Content = {
  // Step 1 — two-line stagger (C1 pattern)
  line1: { text: "What you've been watching so far.", keywords: ["watching"] as const },
  line2: { text: "It was built entirely by AI.", keywords: ["built", "AI"] as const },
  // Step 2 — mid-slide reveal that later morphs to section title in step 3
  midLine: {
    text: "And here's the process that made it possible.",
    keywords: ["process"] as const,
  },
  // Step 4 — footer caption
  footer: "Built with harnesses · production-grade result.",
  footerKw: ["harnesses", "production-grade"] as const,
  // Step 3 — four process cards (G9-style anatomy, G10-style hover)
  cards: [
    {
      num: 1,
      title: "Research & Preparation",
      subtitle: "context · web · ground truth",
      icon: "BookOpen",
      todo: [
        { text: "Pull context — BCE Plan, PIC chats, prior workshops (memory + Drive MCP)", keywords: ["Pull context", "memory", "MCP"] as const },
        { text: "Web research — ideation, deep-dives, design refs (WebSearch + WebFetch Claude Tools)", keywords: ["Web research", "WebSearch", "WebFetch"] as const },
        { text: "Ground truth — Claude · Gemini · OpenAI docs, trusted YT (NotebookLM RAG plugin)", keywords: ["Ground truth", "NotebookLM", "plugin"] as const },
        { text: "All via parallel sub-agents", keywords: ["parallel sub-agents"] as const },
      ],
      results: [
        { text: "30+ research markdown docs", keywords: ["30+"] as const },
      ],
    },
    {
      num: 2,
      title: "Brainstorm & Plan",
      subtitle: "objective · structure · system",
      icon: "Brain",
      todo: [
        { text: "Deck objective discussion", keywords: ["objective"] as const },
        { text: "Section outline structure", keywords: ["outline"] as const },
        { text: "Design meta discussion", keywords: ["Design meta"] as const },
        { text: "Per-slide content deep-dive", keywords: ["deep-dive"] as const },
        { text: "Technical specs discussion", keywords: ["Technical specs"] as const },
        { text: "All via brainstorming + writting-plans skills", keywords: ["skills"] as const },
      ],
      results: [
        { text: "Full deck plan", keywords: ["deck plan"] as const },
        { text: "Design system specs", keywords: ["Design system"] as const },
        { text: "Dev project structure", keywords: ["project structure"] as const },
      ],
    },
    {
      num: 3,
      title: "Prototype",
      subtitle: "design system · low-fi mockup",
      icon: "Layers",
      todo: [
        { text: "Build design system — motion · type · color · components", keywords: ["design system"] as const },
        { text: "Prototype slide layouts on the system", keywords: ["layouts"] as const },
        { text: "Generate background imagery", keywords: ["background imagery"] as const },
        { text: "Via Claude Design + gemini-image-gen MCP", keywords: ["Claude Design","gemini-image-gen"] as const },
      ],
      results: [
        { text: "Design system HTML reference", keywords: ["Design system"] as const },
        { text: "Low-fi MVP deck", keywords: ["MVP deck"] as const },
      ],
    },
    {
      num: 4,
      title: "Implementation",
      subtitle: "agentic dev + human review",
      icon: "Hammer",
      todo: [
        { text: "Development — unit tests, main code (Claude agents)", keywords: ["Development"] as const },
        { text: "Review — spec compliance, code review (Claude agents)", keywords: ["Review"] as const },
        { text: "Human-in-the-loop — manual test + feedback", keywords: ["Human-in-the-loop"] as const },
        { text: "Via Claude Tasks + sub-agent driven dev", keywords: ["Claude Tasks", "sub-agent"] as const },
      ],
      results: [
        { text: "This PRESENTATION SLIDES", keywords: ["PRESENTATION SLIDES"] as const },
      ],
    },
  ],
};

export const i2Content = {
  name: "ADRIANTO TEDJOKUSUMO",
  role: { text: "AI Steering Committee Lead · Head of TPM @ Nanovest", keywords: ["AI Steering Committee", "TPM", "Nanovest"] as const },
  delivery: { text: "13 years tech delivery. Zero formal AI training.", keywords: ["13 years", "Zero"] as const },
  education: {
    icon: "BookOpen",
    title: "Education",
    items: ["Electrical Eng. - ITB", "Computer Vision - Chosun Univ."] as const,
  },
  experience: {
    icon: "Hammer",
    title: "Work Experience",
    items: ["Project Manager - Blibli", "Technical Manager - Toppan Ecquaria"] as const,
  },
  timeline: {
    title: "My Evolution Journey",
    anchors: [
      {
        id: "mar2025",
        label: "Mar 2025",
        icon: "BookOpen",
        bullets: [
          { text: "Learned via articles + YouTube", keywords: ["Learned"] as const },
          { text: "Daily Claude + Gemini use", keywords: ["Daily"] as const },
          { text: "No goals — just experiment", keywords: ["experiment"] as const },
        ] as const,
      },
      {
        id: "jun2025",
        label: "June 2025",
        icon: "Hammer",
        bullets: [
          { text: "Built 9 MCPs for engineering", keywords: ["9 MCPs"] as const },
          { text: "Scrapped 2-3 (vibe-code fails)", keywords: ["Scrapped"] as const },
        ] as const,
      },
      {
        id: "sep2025",
        label: "Sep 2025",
        icon: "Users",
        bullets: [
          { text: "AI Steering Committee formed", keywords: ["AI Steering Committee"] as const },
          { text: "Appointed lead", keywords: ["lead"] as const },
          { text: "Drive AI culture company-wide", keywords: ["AI culture"] as const },
        ] as const,
      },
      {
        id: "dec2025",
        label: "Dec 2025",
        icon: "Bot",
        bullets: [
          { text: "Built 3 agentic systems", keywords: ["3 agentic systems"] as const },
          { text: "Legal, Product, Research teams", keywords: [] as const },
        ] as const,
      },
      {
        id: "mar2026",
        label: "Mar 2026",
        icon: "Package",
        bullets: [
          { text: "Built 2 Nanovest plugins", keywords: ["2 Nanovest plugins"] as const },
          { text: "Product + NotebookLM", keywords: [] as const },
        ] as const,
      },
    ] as const,
    segments: [
      "foundational & experiment",
      "build & fail",
      "evaluate & correct mental model",
      "build with harnesses",
    ] as const,
  },
};

export const i3Content = {
  headline: "Built. Taught. In production.",
  caption: "Click any item to see how it works",
  defaultCaption: "The harness pattern / Five expressions follow",
  list: [
    { kind: "header" as const, label: "HARNESSES" },
    { kind: "subheader" as const, label: "Workflows (n8n)" },
    { kind: "item" as const, id: "stocks-intel", label: "stocks intel", weight: "heavy" as const },
    { kind: "item" as const, id: "legal-docs", label: "legal docs", weight: "heavy" as const },
    { kind: "item" as const, id: "exchange-alerts", label: "exchange alerts", weight: "heavy" as const },
    { kind: "subheader" as const, label: "Plugins (Claude)" },
    { kind: "item" as const, id: "nanovest-product", label: "nanovest-product", weight: "heavy" as const },
    { kind: "item" as const, id: "notebooklm", label: "NotebookLM", weight: "heavy" as const },
    { kind: "header" as const, label: "TOOLS" },
    { kind: "item" as const, id: "gemini-image-gen", label: "gemini-image-gen", weight: "light" as const },
    { kind: "item" as const, id: "sonarqube", label: "Sonarqube", weight: "light" as const },
    { kind: "item" as const, id: "bitbucket", label: "Bitbucket", weight: "light" as const },
    { kind: "header" as const, label: "WORKSHOPS facilitated" },
    { kind: "item" as const, id: "hr-group-ai", label: "HR Group AI · Sinarmas Group", weight: "light" as const },
    { kind: "item" as const, id: "townhall-aisc", label: "Townhall AISC · Nanovest", weight: "light" as const },
    { kind: "item" as const, id: "ai-sdlc", label: "AI-SDLC · Nanovest", weight: "light" as const },
    { kind: "item" as const, id: "pilot-workshop", label: "Pilot Workshop · Nanovest", weight: "light" as const },
  ],
  // ── Workflows panel: 3 n8n harnesses (Indonesian-market intel). ──
  workflows: [
    {
      id: "stocks-intel",
      label: "stocks intel",
      description: "Stocks News Sentiment Intelligence — AI-powered US stocks news pipeline: RSS aggregation, web scrapping, sentiment analysis, daily intelligence brief.",
      kw: ["Stocks News Sentiment Intelligence", "RSS", "scrapping", "sentiment ", "intelligence"] as const,
    },
    {
      id: "legal-docs",
      label: "legal docs",
      description: "Legal Docs Generation System - End-to-end legal document automation and approval workflow with AI-powered revision capability.",
      kw: ["Legal Docs Generation System", "approval workflow", "AI-powered revision"] as const,
    },
    {
      id: "exchange-alerts",
      label: "exchange alerts",
      description: "3rd Parties Announcement Alert System — Automated monitoring with AI-powered classification and Opsgenie alerting.",
      kw: ["3rd Parties Announcement Alert System", "AI-powered classification", "Opsgenie"] as const,
    },
  ] as const,
  // ── Plugins panel: 2 Claude plugins shipped for internal use. ──
  plugins: [
    {
      id: "nanovest-product",
      label: "nanovest-product",
      description: "End-to-end reusable plugin for Product Manager — Empowering product teams from ideation to requirements generation.",
      kw: ["reusable plugin", "Product Manager", "ideation to requirements"] as const,
    },
    {
      id: "notebooklm",
      label: "NotebookLM",
      description: "Exploit the maximum capability of NotebookLM with portability over all AI platforms.",
      kw: ["maximum capability", "portability"] as const,
    },
  ] as const,
  // ── Connectors panel: 9 tiles. 3 in-use custom MCPs + 6 retired (now covered
  // by Anthropic's official MCPs). Mirrors F8's connectors shape but uses
  // `inUse: boolean` instead of `connected`. `footer` is the italic line
  // beneath the sublabel; `kw` highlights words inside `footer`. ──
  connectors: [
    { id: "gemini-image-gen", name: "gemini-image-gen", sublabel: "Image Gen",     footer: "Generate image & video using state-of-the-art gemini models.",   inUse: true,  kw: ["image & video", "gemini models"] as const },
    { id: "sonarqube",        name: "Sonarqube",        sublabel: "Code Quality",  footer: "Get analysis & statistics from code quality tools.",            inUse: true,  kw: ["analysis & statistics", "code quality"] as const },
    { id: "bitbucket",        name: "Bitbucket",        sublabel: "Development",   footer: "Interact with our code repositories.",                          inUse: true,  kw: ["code repositories"] as const },
    { id: "sentry",           name: "Sentry",           sublabel: "Observability", footer: "Replaced by Anthropic's official MCP.",                         inUse: false, kw: ["Replaced", "official MCP"] as const },
    { id: "atlassian",        name: "Atlassian",        sublabel: "Productivity",  footer: "Replaced by Anthropic's official MCP.",                         inUse: false, kw: ["Replaced", "official MCP"] as const },
    { id: "datadog",          name: "Datadog",          sublabel: "Observability", footer: "Replaced by Anthropic's official MCP.",                         inUse: false, kw: ["Replaced", "official MCP"] as const },
    { id: "google-workspace", name: "Google Workspace", sublabel: "Productivity",  footer: "Replaced by Anthropic's official MCP.",                         inUse: false, kw: ["Replaced", "official MCP"] as const },
    { id: "n8n",              name: "n8n",              sublabel: "Automation",    footer: "Replaced by Anthropic's official MCP.",                         inUse: false, kw: ["Replaced", "official MCP"] as const },
    { id: "figma",            name: "Figma",            sublabel: "Design",        footer: "Replaced by Anthropic's official MCP.",                         inUse: false, kw: ["Replaced", "official MCP"] as const },
  ] as const,
  // ── Workshops panel: 2×2 grid of facilitated sessions. Workshop names are
  // real artifacts so the audience can recognize them; bullets stay
  // matter-of-fact and universal in tone. ──
  workshops: [
    {
      id: "hr-group-ai",
      heading: "AGENTIC ORGANIZATION · SINARMAS HR GROUP",
      bullets: [
        "'hardest part isn't the tools' — 70% is people and process",
        "the agentic org — AISC plus six pillars around it",
        "three honest failures — methodology, strategy, empowerment",
        "four-pillar playbook — middle-out champions, problems-first",
        "mindset flip — 'how to build?' → 'how to enable?'",
      ] as const,
      kw: ["people and process", "six pillars", "middle-out champions"] as const,
    },
    {
      id: "townhall-aisc",
      heading: "TOWNHALL AISC · NANOVEST",
      bullets: [
        "year one of the AI Steering Committee, recapped",
        "flagship builds — Naura, alerts, sentiment, cinematic ads",
        "every project framed — problem, solution, how, outcome",
        "department journey — learn, experiment, build, integrate, own",
        "AISC stance — enabler, not delivery team",
      ] as const,
      kw: ["AI Steering Committee", "department journey", "enabler, not delivery team"] as const,
    },
    {
      id: "ai-sdlc",
      heading: "AI-SDLC FOUNDATION · NANOVEST",
      bullets: [
        "productivity paradox — feels faster, measured 19% slower",
        "the dumb zone — context past 60% degrades quality",
        "plugin stack — commands, agents, skills, hooks, MCP",
        "six-step loop — research, plan, implement, test, ship",
        "V-bounce — engineer specifies + verifies, AI generates",
      ] as const,
      kw: ["dumb zone", "plugin stack", "V-bounce"] as const,
    },
    {
      id: "pilot-workshop",
      heading: "AI PILOT WORKSHOP · NANOVEST",
      bullets: [
        "reality check — basic prompting, scattered tools, fear",
        "the AI mastery journey — foundation → agents in five stops",
        "eight prompt techniques + the RACE structure",
        "context engineering — write, select, compress, isolate",
        "agent ladder — reactive → single → agentic systems",
      ] as const,
      kw: ["AI mastery journey", "context engineering", "agent ladder"] as const,
    },
  ] as const,
};

export const i4Content = {
  heroSrc: "/heroes/i4-dusk-horizon.jpg",
  beat1: {
    lineA: { text: "Foundation before velocity.", kw: ["Foundation", "velocity"] as const },
    lineB: { text: "A Project Manager built this in a year.", kw: ["Project Manager"] as const },
  },
  beat2: {
    text: "Next — the recipe that made it possible.",
    kw: ["the recipe"] as const,
  },
  figLabel: "BRIDGE · RECIPE",
} as const;

export const j1Content = {
  line1: { text: "Still a beginner. A lot left to learn.", keywords: ["Still a beginner"] as const },
  line2: { text: "— Hard-earned lessons. So you skip my mistakes.", keywords: ["skip my mistakes"] as const },
};

export const j2Content = {
  headline: "Mindset before tools.",
  headlineKeywords: ["Mindset"] as const,
  subtitle: "Five mindsets — earned the hard way.",
  subtitleKeywords: ["earned the hard way"] as const,
  footer: "Each one earned. Each one yours to skip past.",
  footerKw: ["yours to skip past"] as const,
  cards: [
    {
      num: 1,
      title: "Foundation precedes velocity",
      titleKw: ["Foundation"] as const,
      subtitle: "understand before you output",
      icon: "Triangle",
      practice: [
        { text: "Read the concept first", keywords: ["Read"] as const },
        { text: "Feel if it fits your work", keywords: ["fits"] as const },
        { text: "Then experiment and iterate", keywords: ["iterate"] as const },
      ],
      lesson: [
        { text: "Skip foundation = vibe-coding without progress.", keywords: ["vibe-coding"] as const },
      ],
    },
    {
      num: 2,
      title: "Repetition before sophistication",
      titleKw: ["Repetition"] as const,
      subtitle: "daily use beats clever prompts",
      icon: "Repeat",
      practice: [
        { text: "Use AI daily for any task", keywords: ["daily"] as const },
        { text: "Drafting · summarizing · deciding", keywords: ["any task"] as const },
        { text: "Reps build instinct first", keywords: ["instinct"] as const },
      ],
      lesson: [
        { text: "Months of reps before my first build worked.", keywords: ["Months"] as const },
      ],
    },
    {
      num: 3,
      title: "Stay on current track, don't chase",
      titleKw: ["current track"] as const,
      subtitle: "filter: does this serve my work?",
      icon: "Compass",
      practice: [
        { text: "New AI features ship constantly", keywords: ["constantly"] as const },
        { text: "Filter: does this serve me?", keywords: ["Filter"] as const },
        { text: "Skip the model-of-the-week race", keywords: ["Skip"] as const },
      ],
      lesson: [
        { text: "Most flashy launches don't land in real work.", keywords: ["Most"] as const },
      ],
    },
    {
      num: 4,
      title: "Build the smallest thing that matters",
      titleKw: ["smallest thing"] as const,
      subtitle: "a prompt, a Skill, a snippet",
      icon: "Sparkles",
      practice: [
        { text: "Start with a prompt template", keywords: ["template"] as const },
        { text: "Or a Skill / workflow snippet", keywords: ["Skill"] as const },
        { text: "Something you'd reuse tomorrow", keywords: ["reuse"] as const },
      ],
      lesson: [
        { text: "First build = prompt template. 30 minutes.", keywords: ["30 minutes"] as const },
      ],
    },
    {
      num: 5,
      title: "Failure is the next iteration's blueprint",
      titleKw: ["Failure"] as const,
      subtitle: "improve before you ship",
      icon: "Workflow",
      practice: [
        { text: "Ship rough, evaluate fast", keywords: ["evaluate"] as const },
        { text: "Each break informs the next try", keywords: ["informs"] as const },
        { text: "Iterate · don't perfect", keywords: ["Iterate"] as const },
      ],
      lesson: [
        { text: "Most first builds didn't work. Each rebuilt the next.", keywords: ["rebuilt"] as const },
      ],
    },
  ],
};

export const j3Content = {
  headline: "Habits before output.",
  headlineKeywords: ["Habits", "output"] as const,
  subtitle: "Three habits — the reps that make the rest possible.",
  subtitleKeywords: ["reps"] as const,
  footer: "Quiet habits now. Loud output later.",
  footerKw: ["Quiet habits", "Loud output"] as const,
  cards: [
    {
      num: 1,
      title: "Read one thing a week about how AI works",
      titleKw: ["one thing a week"] as const,
      subtitle: "absorb concepts, not how-tos",
      icon: "BookOpen",
      practice: [
        { text: "One article, paper, or thread per week", keywords: ["One"] as const },
        { text: "Conceptual reads beat tutorials", keywords: ["Conceptual"] as const },
        { text: "Notes optional — absorption matters", keywords: ["absorption"] as const },
      ],
      lesson: [
        { text: "First months are about absorbing, not outputting.", keywords: ["absorbing"] as const },
      ],
    },
    {
      num: 2,
      title: "Use AI daily for anything",
      titleKw: ["daily"] as const,
      subtitle: "any task, any role",
      icon: "CalendarCheck",
      practice: [
        { text: "Drafting · summarizing · deciding", keywords: ["any task"] as const },
        { text: "Even small tasks count as reps", keywords: ["small tasks"] as const },
        { text: "Instinct grows before sophistication", keywords: ["Instinct"] as const },
      ],
      lesson: [
        { text: "Months of daily reps before my first build worked.", keywords: ["Months"] as const },
      ],
    },
    {
      num: 3,
      title: "Pick ONE tool, go deep before adding others",
      titleKw: ["ONE tool"] as const,
      subtitle: "mastery beats sampling",
      icon: "Target",
      practice: [
        { text: "Push one tool across every workflow", keywords: ["one tool"] as const },
        { text: "Add a second only when the first limits you", keywords: ["limits you"] as const },
        { text: "Skip the LLM-of-the-week race", keywords: ["Skip"] as const },
      ],
      lesson: [
        { text: "Went deep on Claude. Skipped the parade.", keywords: ["deep"] as const },
      ],
    },
  ],
};

export const j4Content = {
  headline: "Build before broadcast.",
  headlineKeywords: ["Build", "broadcast"] as const,
  subtitle: "Three moves — that turn a private build into shared leverage.",
  subtitleKeywords: ["private build", "shared leverage"] as const,
  footer: "Build for one. Sharpen by use. Share with many.",
  footerKw: ["one", "use", "many"] as const,
  cards: [
    {
      num: 1,
      title: "Find one recurring annoyance",
      titleKw: ["recurring annoyance"] as const,
      subtitle: "your first build · 20% better",
      icon: "Wrench",
      practice: [
        { text: "Pick a weekly pain point", keywords: ["weekly"] as const },
        { text: "Prompt · skill · workflow snippet", keywords: ["snippet"] as const },
        { text: "Reuse it tomorrow", keywords: ["tomorrow"] as const },
      ],
      lesson: [
        { text: "First build: status-update template. 30 min. Used daily after.", keywords: ["30 min"] as const },
      ],
    },
    {
      num: 2,
      title: "Evaluate ruthlessly",
      titleKw: ["ruthlessly"] as const,
      subtitle: "what's better? what still breaks?",
      icon: "Search",
      practice: [
        { text: "Compare before vs. after", keywords: ["Compare"] as const },
        { text: "Each break is signal", keywords: ["signal"] as const },
        { text: "Iterate · don't polish", keywords: ["Iterate"] as const },
      ],
      lesson: [
        { text: "First MCP took 2 weeks of evenings. Each break informed the next.", keywords: ["2 weeks"] as const },
      ],
    },
    {
      num: 3,
      title: "Share with the same pain",
      titleKw: ["same pain"] as const,
      subtitle: "feedback makes it reusable",
      icon: "Share2",
      practice: [
        { text: "Hand it to others with the same problem", keywords: ["Hand it"] as const },
        { text: "Their friction is your spec", keywords: ["friction"] as const },
        { text: "Genericize · don't gatekeep", keywords: ["Genericize"] as const },
      ],
      lesson: [
        { text: "Shared nanovest-product plugin. PM feedback turned it reusable.", keywords: ["reusable"] as const },
      ],
    },
  ],
};

export const k1Content = {
  heroSrc: "/heroes/k1-morning-workspace.jpg",
  beat1: {
    lineA: { text: "From watching to building.", kw: ["building"] as const },
    lineB: { text: "The recipe is yours now.", kw: ["yours now"] as const },
  },
  beat2: {
    text: "Next — Practice Lab. I'll be with you.",
    kw: ["Practice Lab"] as const,
  },
  figLabel: "PRACTICE · LAB",
} as const;

export const k2Content = {
  figLabel: "THE PRACTICE LAB",
  headline: "The Practice Lab, end to end.",
  headlineKw: ["end to end"] as const,
  leftHeader: "The Lab · 4 parts",
  footer: "Same recipe, real data — and a method that travels.",
  footerKw: ["a method that travels"] as const,
  spine: [
    {
      id: "case",
      num: 1,
      name: "The Case",
      essence: "One month, one 12% miss",
      pop: {
        desc: "May 2026 closed 12% under target — and the whole miss hides in a single week. Trace the causal chain, then turn it into a decision-ready recommendation for June.",
        descKw: ["a single week", "causal chain", "decision-ready recommendation"],
        rows: [
          { label: "The miss", items: ["87,870 / 100,000 units", "−12%", "all in Week 3 (May 14–20)"] },
          { label: "The chain", items: ["Apr 28 — batch accepted, no QA hold", "May 14 — 200 of 500 delivered", "May 15–17 — three Critical incidents"] },
          { label: "Vendor", items: ["Delta Pratama"] },
        ],
      },
    },
    {
      id: "tracks",
      num: 2,
      name: "Two Tracks",
      essence: "Same data, two disciplines",
      pop: {
        desc: "Everyone works the same dataset through one of two personas. Each runs a provided Skill built to cite its sources and refuse to fabricate.",
        descKw: ["two personas", "cite its sources", "refuse to fabricate"],
        rows: [
          {
            label: "Section Head · Analyst",
            items: ['"Why did this happen?"', "root-cause-investigator", "evidence-tracing"],
            links: [
              { label: "Runbook", href: "https://docs.google.com/document/d/1tLBJMYK-Sj7Cl-yhLH0Sk7Z2mPTp9LRn/edit?usp=drive_link&ouid=111800124012810515564&rtpof=true&sd=true" },
              { label: "Main folder", href: "https://drive.google.com/drive/folders/1n2vi3_kG-3wISHv9EhdwwCZz_G4vhR0n?usp=drive_link" },
              { label: "Starter pack", href: "https://drive.google.com/drive/folders/1hECVKmwLLl84e1dOaworgkhU5cGzI8ns?usp=drive_link" },
            ],
          },
          {
            label: "Team Leader · Comms Booster",
            items: ['"What do we communicate now?"', "ops-comms-drafter", "template-fidelity"],
            links: [
              { label: "Runbook", href: "https://docs.google.com/document/d/1tmKDFOEHiq789xXohxYMxBkngl94APL-/edit?usp=drive_link&ouid=111800124012810515564&rtpof=true&sd=true" },
              { label: "Main folder", href: "https://drive.google.com/drive/folders/18Uwk89jClcWa7XrhPp9sQfvnYvmWJyPM?usp=drive_link" },
              { label: "Starter pack", href: "https://drive.google.com/drive/folders/1CV5BB8rrkjd7uhW9RQaAsd--kEhhDRqT?usp=drive_link" },
            ],
          },
        ],
      },
    },
    {
      id: "stages",
      num: 3,
      name: "Four Stages",
      essence: "Ground → Reason → Visualize → Author",
      pop: {
        desc: "Ninety minutes, four tools, one chain — from raw data to a method you can reuse.",
        descKw: ["four tools", "one chain", "a method you can reuse"],
        rows: [
          { label: "1 · Ground — NotebookLM", items: ["sources → cited field-guide report"] },
          { label: "2 · Reason — Claude Project", items: ["persona system prompt + provided Skill"] },
          { label: "3 · Visualize — Claude Design + Artifacts", items: ["diagram → design system → dashboard"] },
          { label: "4 · Author — skill-creator", items: ["package the build as a reusable Skill"] },
        ],
      },
    },
    {
      id: "outputs",
      num: 4,
      name: "The Outputs",
      essence: "Eight artifacts, one dataset",
      pop: {
        desc: "One month of operational data becomes a stack of AI-augmented deliverables.",
        descKw: ["AI-augmented deliverables"],
        rows: [
          { label: "Slide deck", items: ["8-slide briefing — to decide or to execute"] },
          { label: "Report", items: ["5-section field guide, fully cited"] },
          { label: "Web dashboard", items: ["interactive HTML Artifact, shareable URL"] },
          { label: "Design system", items: ["reusable HTML style guide"] },
          { label: "Reusable skill", items: ["authored SKILL.md — 30 min → 10 min"] },
        ],
      },
    },
  ],
} as const;

export const k3Content = {
  heroSrc: "/heroes/k3-open-horizon.jpg",
  figLabel: "THANK YOU",
  beat1: {
    lineA: { text: "Thank you.", kw: [] as const },
    lineB: { text: "The recipe travels with you.", kw: ["travels with you"] as const },
  },
  beat2: {
    text: "Wherever the work goes next.",
    kw: ["the work goes next"] as const,
  },
} as const;
