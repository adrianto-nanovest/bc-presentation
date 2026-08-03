// PROTOTYPE — throwaway. See ./index.tsx for the question being answered.
//
// The FIXED half of the gh#18 brief: the message, not the form. Every variant
// renders exactly this copy. Anything a variant invents about layout,
// grouping, ordering or emphasis is the variant's own opinion; anything in
// this file is the control.
export const brief = {
  fig: { section: "E", num: 12, label: "THE LOOP" },

  headline: "The loop: stop doing the turns.",
  headlineKw: ["stop doing the turns"],

  // Appears exactly once per variant. Names the term, dates it, deflates it.
  qualifier: "LOOP ENGINEERING · NAMED JUNE 2026 · NEW NAME, OLD PRACTICE",

  tagline: "Done is a check, not an opinion.",
  taglineKw: ["a check"],

  closer: "You were in every cycle. Now you're at both ends.",
  closerKw: ["both ends"],

  // The shift — turn-by-turn puts the human in every cycle; a loop puts them
  // at the two ends only.
  shift: {
    beforeLabel: "TURN-BY-TURN",
    beforeChain: ["you", "AI", "you", "AI"],
    beforeNote: "You are in every cycle.",
    afterLabel: "THE LOOP",
    afterNote: "You are at the two ends only.",
    typographic: "you → AI → you → AI",
  },

  // Teaching order: capability, capability, control, control, risk.
  decisions: [
    {
      id: "trigger",
      num: "01",
      icon: "Calendar",
      title: "TRIGGER",
      essence: "What starts it — not you.",
      long: "A schedule or an event fires the loop. If the thing that starts it is you opening a chat, you do not have a loop.",
      value: "Friday 16:00 · weekly",
      kind: "capability",
    },
    {
      id: "memory",
      num: "02",
      icon: "Database",
      title: "MEMORY",
      essence: "State outside the chat.",
      long: "State, anti-repetition, profile. The loop must know what it already did, or it will do it again.",
      value: "review/state.json",
      kind: "capability",
    },
    {
      id: "condition",
      num: "03",
      icon: "ListChecks",
      title: "CONDITION",
      essence: "A countable check on a file, not taste.",
      long: "Done is something a machine can read off a file and count. Not something you look at and feel good about.",
      value: "every active client has one",
      kind: "control",
    },
    {
      id: "budget",
      num: "04",
      icon: "Scale",
      title: "BUDGET",
      essence: "A closed loop, capped.",
      long: "Cap the iterations and the spend, and expire the schedule.",
      warning:
        "A closed loop with an unsatisfiable condition is an open loop, on a schedule, unattended.",
      value: "7-day expiry · capped",
      kind: "control",
    },
    {
      id: "gate",
      num: "05",
      icon: "Shield",
      title: "GATE",
      essence: "Where a person signs.",
      long: "One place, named in advance, where the work stops and waits for a human.",
      value: "a person signs the folder",
      kind: "risk",
    },
  ],

  // Walkthrough §7.
  example: {
    kicker: "ONE LOOP, IN FULL",
    when: "Friday 4 PM",
    what: "one status update per active client, into a review folder",
    conditionLabel: "CONDITION",
    condition: "did every active client get one this week?",
    implLabel: "BUILT WITH",
    impl: "/loop  +  Routines",
    specName: "friday-status-update",
  },
} as const;

export type Decision = (typeof brief.decisions)[number];
export type DecisionId = Decision["id"];
