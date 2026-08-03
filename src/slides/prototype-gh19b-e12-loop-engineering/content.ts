// PROTOTYPE gh#19b — throwaway. Content module for E.12 · LOOP ENGINEERING.
//
// A clean-sheet rebuild of the E.12 slide, sourced entirely from the
// Panaversity "Loop Engineering: A Crash Course" doc — NOT from the gh#17/18/19
// lineage. Every string on the slide lives here with its `kw` sibling array.
//
// Convention (../opening-section-a/content.ts):
//   - plain strings only, no inline <em>
//   - a sibling `*Kw` / `kw` array carries substrings rendered through
//     KeywordHighlight (copper-400) at the render site
//   - 1–3 keywords per chunk (feedback_keyword_highlighting.md)
//   - mono strings NEVER carry keywords: row titles, phase labels, tool
//     strips and axis labels are all mono, so all are kw-free.
//   - no qualifier line on this build (owner call on #19b).

export const content = {
  fig: { section: "E", num: 12, label: "LOOP ENGINEERING" },

  // The mindset shift IS the headline — Cherny and Steinberger's shared verb.
  headline: "Stop writing prompts. Start writing loops.",
  headlineKw: ["writing loops"],

  // ───────────────────── step 0 — the mindset shift ─────────────────────
  step0: {
    left: {
      title: "PROMPTING — TURN BY TURN",
      rows: [
        { who: "you", text: "you type a prompt" },
        { who: "agent", text: "the agent replies" },
        { who: "you", text: "you read the reply" },
        { who: "you", text: "you type again" },
      ],
      returnLabel: "you, again",
      verdictTitle: "You are holding the tool the whole time.",
      verdict:
        "You are the heartbeat, the checker, and the memory. Stop paying attention, and the work stops.",
      verdictKw: ["the work stops"],
    },
    bridge: ["THE", "LEVERAGE", "MOVES"],
    right: {
      title: "LOOPING — A SYSTEM YOU DESIGN ONCE",
      heartbeat: "HEARTBEAT — A SCHEDULE OR AN EVENT",
      stations: [
        { label: "DISCOVER", sub: "find the work" },
        { label: "IMPLEMENT", sub: "the maker" },
        { label: "VERIFY", sub: "the checker — a second agent" },
        { label: "COMMIT", sub: "opens the PR" },
      ],
      spine: { label: "SPINE", file: "progress.md", sub: "read first, written last" },
      gate: {
        label: "YOU — THE HUMAN GATE",
        sub: "only the risky calls come to you. You do not type each turn.",
        subKw: ["only the risky calls"],
      },
      risky: "risky",
      approved: "approved",
      pass: "pass",
      verdictTitle: "The loop holds the steps in the middle.",
      verdict: "You keep intent and accountability.",
      verdictKw: ["intent", "accountability"],
    },
    quotes: [
      {
        text: "I don't prompt Claude anymore. I have loops running that prompt Claude — my job is to write loops.",
        kw: ["write loops"],
        attr: "BORIS CHERNY · CREATOR OF CLAUDE CODE",
      },
      {
        text: "You should be designing loops that prompt your agents.",
        kw: ["designing loops"],
        attr: "PETER STEINBERGER",
      },
    ],
  },

  // ───────────────────── steps 1–2 — the left rail ──────────────────────
  leftHeading: "THE BIG LOOP · FOUR PARTS",
  hint: "Hover a part to magnify it on the right. Click to pin.",
  returnArc: "tomorrow's beat starts by reading the spine",

  parts: [
    {
      id: "heartbeat",
      num: "01",
      title: "HEARTBEAT",
      desc: "a schedule or an event starts a beat",
      descKw: ["starts a beat"],
    },
    {
      id: "beat",
      num: "02",
      title: "ONE BEAT",
      desc: "one full, self-contained run of the work",
      descKw: ["self-contained"],
    },
    {
      id: "checker",
      num: "03",
      title: "CHECKER",
      desc: "a separate agent grades the result",
      descKw: ["separate"],
    },
    {
      id: "spine",
      num: "04",
      title: "SPINE",
      desc: "progress.md — the memory between runs",
      descKw: ["memory between runs"],
    },
  ],

  // Step 2's payoff, bottom-left, display weight. The whole course in one
  // sentence: the three verbs are the three parts you design; the two nouns
  // are the two things a loop cannot do for you.
  footnote:
    "Design the loop once — it starts the work, checks the work, remembers the work. You keep intent and accountability.",
  footnoteKw: ["intent", "accountability"],

  // ───────────────────── the four right-canvas panels ───────────────────
  panels: {
    heartbeat: {
      title: "01 · THE FOUR HEARTBEATS",
      kicker: "Every loop starts with one of these. Most real loops use kind 3 or kind 4.",
      kickerKw: ["kind 3 or kind 4"],
      kinds: [
        {
          num: "1",
          name: "IN-SESSION",
          alt: "",
          desc: "repeats on a timer while you watch",
          descKw: ["while you watch"],
          stop: "stops when the session closes",
          tools: ["Claude Code · /loop"],
          analogy: "a kitchen timer: it only rings while you are in the kitchen",
        },
        {
          num: "2",
          name: "CONDITIONAL",
          alt: "also called run-until-done",
          desc: "repeats until a checked condition is true",
          descKw: ["a checked condition"],
          stop: "stops when the check passes",
          tools: ["Claude Code · /goal", "Codex · exec + tests"],
          analogy: "keep cooking until the taster says it is ready",
        },
        {
          num: "3",
          name: "SCHEDULED",
          alt: "",
          desc: "runs on a clock, even with the laptop closed",
          descKw: ["laptop closed"],
          stop: "runs while you sleep",
          tools: ["Claude Code · Routines", "ChatGPT · Tasks / cron"],
          analogy: "an alarm clock: it rings whether or not you are home",
        },
        {
          num: "4",
          name: "EVENT-DRIVEN",
          alt: "",
          desc: "reacts the moment something happens",
          descKw: ["the moment"],
          stop: "a PR opens; a message lands",
          tools: ["Claude Code · Channels, GitHub", "Codex · @codex on a PR"],
          analogy: "a doorbell: nothing happens until someone presses it",
        },
      ],
      axis: { left: "YOU HOLD IT", mid: "more and more unattended", right: "IT RUNS WITHOUT YOU" },
      foot: "Learn one word: each single firing of the loop is called a beat.",
      footKw: ["beat"],
    },

    beat: {
      title: "02 · INSIDE ONE BEAT — THE AGENT RUNTIME",
      kicker: "Two loops, one name: the small loop lives inside one beat of the big loop.",
      kickerKw: ["inside one beat"],
      stations: [
        { num: "1", name: "BUILD THE CONTEXT", sub: "prompt + files + results so far" },
        { num: "2", name: "THE MODEL DECIDES", sub: "answer now, or ask for tools" },
        { num: "3", name: "RUN THE TOOLS", sub: "do what the model asked for" },
        { num: "4", name: "ADD THE RESULTS", sub: "put the outputs into the context" },
      ],
      center: "repeat while the model keeps asking for tools",
      centerKw: ["keeps asking"],
      exitTitle: "the model stops asking — the beat ends",
      exitTitleKw: ["the beat ends"],
      exitSub: "back to the big loop: the checker, then the spine",
      exitSubKw: ["the checker, then the spine"],
      foot: "The small loop has no heartbeat and no spine. When the beat ends, it remembers nothing.",
      footKw: ["remembers nothing"],
    },

    checker: {
      title: "03 · THE CHECKER LADDER",
      kicker: "Three kinds of “done”, from proof to claim — the gate grows as the checker weakens.",
      kickerKw: ["proof to claim"],
      axisL: "STRONGEST CHECKER",
      axisR: "WEAKEST",
      rungs: [
        {
          num: "1",
          name: "A PASSING TEST",
          desc: "Code. The test runner and the linter decide — a command cannot convince itself the work is fine.",
          descKw: ["cannot convince itself"],
          badge: "proof",
          claim: false,
          gate: "narrow",
          gateDesc: "spot-checks",
          gateWidth: 0.38,
        },
        {
          num: "2",
          name: "MECHANICAL CHECKS",
          desc: "Prose. Broken links, missing figures, banned words. Commands prove the mechanical part, and only that part.",
          descKw: ["only that part"],
          badge: "partial proof",
          claim: false,
          gate: "wider",
          gateDesc: "you judge the content",
          gateWidth: 0.68,
        },
        {
          num: "3",
          name: "A RUBRIC WITH A BAR",
          desc: "A reviewer agent grades the draft: “do not stop below 95.” The loop can act on the score — but a model's score is still an opinion.",
          descKw: ["still an opinion"],
          badge: "a claim, not a proof",
          claim: true,
          gate: "widest",
          gateDesc: "a person reads it",
          gateWidth: 1,
        },
      ],
      gateLabel: "THE HUMAN GATE",
      foot: "The weaker the checker, the more work passes through the human gate — the method telling you where your judgment lives.",
      footKw: ["where your judgment lives"],
    },

    spine: {
      title: "04 · THE SPINE — MEMORY BETWEEN RUNS",
      kicker: "The model forgets everything between runs. The repo does not.",
      kickerKw: ["The repo does not"],
      runs: [
        {
          name: "RUN 1 — MONDAY, 9:00",
          steps: ["read the spine first", "do the work", "update the spine last"],
        },
        {
          name: "RUN 2 — TUESDAY, 9:00",
          steps: ["read the spine first", "do the work — building on Monday's", "update the spine last"],
        },
      ],
      wipe: "the session ends — the model's memory is wiped",
      wipeKw: ["memory is wiped"],
      lesson: "a repeated mistake? the lesson goes to the front of the diary",
      repoTitle: "THE REPO — CONTINUOUS ACROSS EVERY RUN",
      files: [
        {
          name: "CLAUDE.md / AGENTS.md",
          role: "the front of the diary",
          desc: "durable lessons and habits — read at the start of every run",
        },
        {
          name: "progress.md",
          role: "the back of the diary",
          desc: "what was tried, what passed, what is open — updated at the end of every run",
        },
      ],
      read: "read",
      write: "write",
      foot: "No spine, no loop. An intern without the diary redoes yesterday's work forever — so does a loop.",
      footKw: ["No spine, no loop"],
    },
  },

  // ───────────────────── step 2 — the worked example ────────────────────
  triage: {
    title: "THE MORNING-TRIAGE LOOP — ONE BEAT",
    kicker: "Designed once. It runs every weekday at 9:00, whether or not you are there.",
    kickerKw: ["Designed once"],
    hb: "THE HEARTBEAT · EVERY WEEKDAY AT 9:00",
    nodes: {
      read: { num: "1", text: "Read progress.md — the spine", kw: ["the spine"] },
      find: {
        num: "2",
        text: "Find the work (at most 5 items)",
        kw: ["at most 5"],
        sub: "overnight CI failures · open issues · new audit advisories",
      },
      draft: { num: "3", text: "Draft a fix in its own worktree — the maker", kw: ["the maker"] },
      review: { num: "4", text: "A separate reviewer grades it — the checker", kw: ["the checker"] },
      verdict: "THE VERDICT?",
      failLabel: "FAIL, OR RISKY",
      fail: { num: "5b", text: "Write it to “needs a human”", kw: ["needs a human"], sub: "no PR — a person decides later" },
      passLabel: "PASS, AND LOW RISK",
      pass: { num: "5a", text: "Open a pull request", kw: [], sub: "a human reviews it there — the gate" },
      update: { num: "6", text: "Update progress.md — tomorrow reads it", kw: ["tomorrow reads it"] },
    },
    ret: "the next candidate — and again tomorrow at 9:00",
    closer: "You wake up to two PRs and one flagged decision. You typed nothing.",
    closerKw: ["You typed nothing"],
    // Which flow pieces each rail part lights. The rail is the anatomy; the
    // flow is the anatomy wearing a name badge.
    lights: {
      heartbeat: ["hb", "ret"],
      beat: ["find", "draft"],
      checker: ["review", "verdict", "fail", "pass"],
      spine: ["read", "update"],
    } as Record<string, string[]>,
  },
} as const;

export type Part = (typeof content.parts)[number];
export type PartId = Part["id"];
