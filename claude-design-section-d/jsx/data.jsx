/* global window */
// Section D content. Single source of truth.

const D1 = {
  beat1: {
    statValue: 73, statSuffix: "%",
    subLine: "of automation projects fail.",
    subLineKw: ["fail"],
    caption: "— widely cited across automation industry research, 2024–2026",
  },
  beat2: {
    mechanism: "Automation amplifies what's already there. Broken or excellent.",
    mechanismKw: ["amplifies", "Broken", "excellent"],
    manualLabel: "manual pace",
    manualValue: "1×",
    machineLabel: "machine pace",
    machineValue: "1,000×",
    caption: "A bad process automated runs 1,000× faster — at being bad.",
    captionKw: ["1,000×"],
  },
  beat3: {
    prescription: "Fix the spec first. Then automate.",
    prescriptionKw: ["spec"],
    sub: "Process improvement is a prerequisite, not a phase.",
    subKw: ["prerequisite"],
  },
};

const D2 = {
  headline: "Three disciplines converge. One evolves.",
  headlineKw: ["converge", "evolves"],
  cards: [
    {
      key: "bpm", title: "BPM", subName: "Business Process Management",
      icon: "workflow",
      tagline: "The GPS for operations", taglineKw: ["GPS"],
      bullets: ["Holistic workflow optimization","Identifies bottlenecks and waste","Redesigns end-to-end flow"],
      copper: "copper-700",
      analogy: "Like asking 'where's the waste?' before 'how do we go faster?'",
    },
    {
      key: "rpa", title: "RPA", subName: "Robotic Process Automation",
      icon: "bot",
      tagline: "Deterministic digital workers", taglineKw: ["Deterministic"],
      bullets: ["Rule-based task execution","Fast, reliable, no intelligence needed","Scales repetitive operations"],
      copper: "copper-500",
      analogy: "A digital worker following a checklist exactly — fast, never tired, never improvises.",
    },
    {
      key: "ai", title: "AI", subName: "Artificial Intelligence",
      icon: "sparkles",
      tagline: "Core strengths", taglineKw: ["Core strengths"],
      bullets: ["Summarization & analysis","Generation & NLU","Multimodal & adaptive learning"],
      copper: "copper-400",
      analogy: "What AI does well — quickly, at scale, on text/image/audio simultaneously.",
    },
    {
      key: "ipa", title: "IPA", subName: "Intelligent Process Automation",
      icon: "layers",
      tagline: "End-to-end intelligent workflow", taglineKw: ["intelligent"],
      bullets: ["Combines process, automation & AI","Context-aware and adaptive","End-to-end orchestration"],
      copper: "copper-300",
      analogy: "Process discipline + deterministic automation + AI strengths, in one workflow.",
    },
    {
      key: "agentic", title: "AGENTIC", subName: "Autonomous Agents",
      icon: "target",
      tagline: "Goals, not just steps", taglineKw: ["Goals"],
      bullets: ["Self-directed orchestration toward outcomes","Multi-agent collaboration","Continuous learning and adaptation"],
      copper: "copper-200",
      analogy: "An agent that pursues a goal — 'ensure zero unplanned downtime' — and adapts as conditions change.",
    },
  ],
  summary: "BPM + RPA + AI fuse into IPA. Given a goal, it becomes Agentic.",
  summaryKw: ["fuse into IPA", "becomes Agentic"],
};

const D3 = {
  headline: "One process. Four levels.",
  headlineKw: ["Four levels"],
  sub: "Monthly operations report — same task, four lenses.",
  subKw: ["four lenses"],
  levels: [
    {
      key: "bpm", label: "BPM", copper: "copper-700",
      ask: "Where's the waste?", askKw: ["waste"],
      bullets: [
        { text: "Redesign report scope",            kw: ["Redesign"] },
        { text: "Consolidate duplicate reports",    kw: ["Consolidate"] },
        { text: "Integrate data end-to-end",        kw: ["Integrate"] },
        { text: "Standardize the spec",             kw: ["Standardize"] },
      ],
      outcome: "Fewer reports; clearer signal.",
      outcomeKw: ["clearer signal"],
    },
    {
      key: "rpa", label: "RPA", copper: "copper-500",
      ask: "What repeats?", askKw: ["repeats"],
      bullets: [
        { text: "Bot pulls KPIs every Monday",      kw: ["Bot"] },
        { text: "Populates the template",           kw: ["Populates"] },
        { text: "Distributes to stakeholders",      kw: ["Distributes"] },
        { text: "Validates against rules",          kw: ["Validates"] },
      ],
      outcome: "Hours reclaimed; zero copy-paste.",
      outcomeKw: ["Hours reclaimed"],
    },
    {
      key: "ipa", label: "IPA", copper: "copper-300",
      ask: "Which steps need AI?", askKw: ["AI"],
      bullets: [
        { text: "Summarize raw data",               kw: ["Summarize"] },
        { text: "Analyze for anomalies",            kw: ["Analyze"] },
        { text: "Generate the narrative",           kw: ["Generate"] },
        { text: "Interpret comments via NLU",       kw: ["NLU"] },
      ],
      outcome: "Insight, not just data.",
      outcomeKw: ["Insight"],
    },
    {
      key: "agentic", label: "AGENTIC", copper: "copper-200",
      ask: "Can this run itself?", askKw: ["run itself"],
      bullets: [
        { text: "Monitors continuously",            kw: ["Monitors"] },
        { text: "Generates report on demand",       kw: ["Generates"] },
        { text: "Escalates without prompting",      kw: ["Escalates"] },
        { text: "Adapts to new patterns",           kw: ["Adapts"] },
      ],
      outcome: "Earlier signals; ambient reporting.",
      outcomeKw: ["ambient"],
    },
  ],
  capstone: "≈80% time saved · risks surfaced earlier.",
  capstoneKw: ["80%", "risks"],
};

const D4 = {
  headline: "Each level builds on the previous. You can't skip.",
  headlineKw: ["builds on the previous", "can't skip"],
  questions: [
    { num: 1, q: "Does the process work today?",            kw: ["work today"],         yes: "continue",         no: "STOP ↻",         noTerminal: "STOP" },
    { num: 2, q: "Have you removed waste + bottlenecks?",   kw: ["waste"],              yes: "continue",         no: "apply BPM first", noTerminal: "BPM" },
    { num: 3, q: "Are there repetitive, rule-based steps?", kw: ["repetitive"],         yes: "RPA",              no: "continue",        yesTerminal: "RPA" },
    { num: 4, q: "Do steps need AI's core strengths?",      kw: ["AI's core strengths"], yes: "IPA",              no: "continue",        yesTerminal: "IPA" },
    { num: 5, q: "Should it pursue a goal autonomously?",   kw: ["goal autonomously"],  yes: "AGENTIC",          no: "stay at IPA",     yesTerminal: "AGENTIC" },
  ],
  terminals: {
    STOP:    { sub: "If the process is broken, automation just breaks faster.",        copper: "copper-700" },
    BPM:     { sub: "Redesign + integrate. The foundation everything else stands on.", copper: "copper-700" },
    RPA:     { sub: "Automate the rule-based parts. Reclaim hours.",                   copper: "copper-500" },
    IPA:     { sub: "Layer AI's core strengths. Insight, not just data.",              copper: "copper-300" },
    AGENTIC: { sub: "Autonomous orchestration. The process pursues the goal.",         copper: "copper-200" },
  },
  footer: "Skip a level, and the level above fails harder.",
  footerKw: ["fails harder"],
};

const D5 = {
  beat1: { text: "Process is the spec.",                kw: ["spec"] },
  beat2: { text: "Engineering is the system around it.", kw: ["system"] },
  bridge: { text: "Next: how that system gets built.",   kw: ["how that system gets built"] },
  attr: "— Section E · Foundation Core",
};

Object.assign(window, { D1, D2, D3, D4, D5 });
