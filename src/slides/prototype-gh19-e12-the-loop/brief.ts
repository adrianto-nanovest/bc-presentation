// PROTOTYPE gh#19 — throwaway. Content module for E.12 · THE LOOP.
//
// Every string on the slide lives here, with its `kw` sibling array. The
// grilling session on #19 recorded "there is no kw on the title, the cards or
// the footnote" as a defect — so keyword arrays are part of the content
// contract in this prototype, not an afterthought at the render site.
//
// Convention (../opening-section-a/content.ts):
//   - plain strings only, no inline <em>
//   - a sibling `*Kw` / `kw` array carries substrings rendered through
//     KeywordHighlight (copper-400) at the render site
//   - 1–3 keywords per chunk (feedback_keyword_highlighting.md)
//   - mono strings NEVER carry keywords: the qualifier, the row titles, the
//     phase labels and the build strip are all mono, so all are kw-free.

export const brief = {
  fig: { section: "E", num: 12, label: "THE LOOP" },

  headline: "The loop: stop doing the turns.",
  // "the loop" vs "the turns" is the headline's real structure. Colouring the
  // whole predicate (as gh#18 A did) is a colour split, not an emphasis.
  headlineKw: ["the turns"],

  // Mono, appears exactly once. Names the term, dates it, deflates it.
  qualifier: "LOOP ENGINEERING · NAMED JUNE 2026 · NEW NAME, OLD PRACTICE",

  // Mono. The worked example's implementation strip — on from step 1.
  buildStrip: "BUILT WITH  /loop  +  Routines",

  tagline: "Done is a check, not an opinion.",
  taglineKw: ["a check"],

  // Step 2's resting caption under the ring. The spiral merge performs this
  // sentence; the caption names it about 200 ms later.
  closer: "You were in every cycle. Now you're at both ends.",
  closerKw: ["both ends"],

  // Caption well, per step. Steps 0 and 1 rhyme on purpose — the keyword is
  // exactly the part that differs.
  captions: {
    // {laps} and {turns} are substituted so the line stays true when the
    // switcher changes the lap count.
    hero: "{laps} laps. {turns} turns. Every lap starts with you.",
    heroKw: ["starts with you"],
    ring: "Same work. One lap, and it starts itself.",
    ringKw: ["starts itself"],
  },

  // Step-0 figure labels (mono, kw-free).
  hero: {
    youSpoke: ["TASK 1", "TASK 2", "TASK 3", "TASK 4"],
    aiSpoke: "AI RUNS",
    startStamp: "FRI 16:00",
  },

  // Ring phases, clockwise from the west. Mono, kw-free.
  phases: ["START", "RUN", "CHECK", "SHIP"],

  // Teaching order: capability, capability, control, control, risk.
  decisions: [
    {
      id: "trigger",
      num: "01",
      icon: "Calendar",
      title: "TRIGGER",
      desc: "A schedule or an event starts it. Never you.",
      descKw: ["Never you"],
      caption: "Every Friday, 4 PM. Nobody presses start.",
      captionKw: ["Nobody presses start"],
      chips: ["schedule", "event", "queue"],
    },
    {
      id: "memory",
      num: "02",
      icon: "Database",
      title: "MEMORY",
      desc: "A file outside the chat holds what it already did.",
      descKw: ["outside the chat"],
      caption: "The chat forgets. The file doesn't.",
      captionKw: ["The file doesn't"],
      chips: ["state", "anti-repetition", "profile"],
    },
    {
      id: "condition",
      num: "03",
      icon: "ListChecks",
      title: "CONDITION",
      desc: "Done is counted off a file, not judged by taste.",
      descKw: ["counted off a file"],
      caption:
        "“Every client got an update” — checkable. “Is it good” — not.",
      captionKw: ["checkable"],
      chips: [],
    },
    {
      id: "budget",
      num: "04",
      icon: "Scale",
      title: "BUDGET",
      desc: "Capped runs, capped spend, and a schedule that expires.",
      descKw: ["a schedule that expires"],
      caption:
        "A closed loop with an unsatisfiable condition is an open loop, on a schedule, unattended.",
      captionKw: ["an open loop", "unattended"],
      chips: [],
    },
    {
      id: "gate",
      num: "05",
      icon: "Shield",
      title: "GATE",
      desc: "One named place where work stops and waits for a person.",
      descKw: ["One named place"],
      caption: "Output goes to a person → a person signs.",
      captionKw: ["a person signs"],
      chips: [],
    },
  ],

  // The worked example is not a card. It is the apparatus' labels — the
  // Friday 4 PM run, written onto the figure (#19 Q10, option ii).
  apparatusLabels: {
    you: "YOU",
    youSet: "set",
    clock: "FRI 16:00",
    stateFile: "review/state.json",
    writeAfter: "write after",
    readBefore: "read before",
    check: "DONE?",
    yes: "YES",
    no: "NO",
    stop: "STOP",
    stopCondition: "every active client has one",
    gateHuman: "YOU",
    gateSigns: "signs the folder",
    spend: "SPEND",
    cap: "CAP",
    uncapped: "no cap · no stop",
  },

  leftHeading: "FIVE DECISIONS",
  hint: "Hover a decision to light what it controls. Click to pin.",
} as const;

export type Decision = (typeof brief.decisions)[number];
export type DecisionId = Decision["id"];

const LAP_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
];

export function heroCaption(laps: number): string {
  return brief.captions.hero
    .replace("{laps}", LAP_WORDS[laps] ?? String(laps))
    .replace("{turns}", LAP_WORDS[laps * 2] ?? String(laps * 2));
}
