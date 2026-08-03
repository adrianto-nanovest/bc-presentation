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
    // "…and it starts itself" was true only while the clock was drawn, and
    // the clock is now hover-only. The idle picture shows a person setting a
    // loop and standing off it, so that is what the line says. "It starts
    // itself" is delivered on TRIGGER hover, where the clock actually mounts.
    ring: "Same work. One lap, and you set it once.",
    ringKw: ["set it once"],
  },

  // Step-0 figure labels (mono, kw-free).
  hero: {
    youSpoke: ["TASK 1", "TASK 2", "TASK 3", "TASK 4"],
    // Mirrors `aiSpoke` at the other end of the other spoke. With the human
    // glyph on every turn, the slide says WHO twice: once as a drawing, once
    // as a word.
    youSpokeLabel: "YOUR TURN",
    aiSpoke: "AI RUNS",
    // NOT "FRI 16:00". Step 0 is the manual before-state — you, opening a
    // chat, doing the turns. Stamping it with a schedule labelled
    // turn-by-turn work as a scheduled run, which is what step 0 is not.
    // (No clock time is written at steps 1–2 either; see apparatusLabels.)
    startStamp: "SESSION START",
  },

  // Ring phases, clockwise from the west: the four phases of ONE LAP OF WORK.
  // Three of the four are now the sources' own verbs (Article A and Article B
  // both ring Discover · Plan · Execute · Verify · Iterate; ref 3 rings Plan ·
  // Execute · Verify · Learn). `RUN` and `CHECK` were ours; `EXECUTE` and
  // `VERIFY` are theirs.
  //
  // Why not five, and why no DISCOVER:
  //   - The composition rests on ONE HORIZONTAL AXIS — a human at each end,
  //     entry due west, exit due east. Five stations cannot put two of
  //     themselves 180° apart, so a fifth costs the closer its geometric
  //     proof, and the closer is fixed by #19.
  //   - Five labels do not fit. They sit INSIDE the hollow, which is 196 px
  //     across at R_PHASE_LABEL; `DISCOVER` and `REMEMBER` are ~70 px each and
  //     collide with their neighbours before the ring is even drawn. Outside
  //     is not free — the whole outer band is apparatus.
  //   - Of the canonical five, DISCOVER is the OPEN loop's station. The
  //     practitioner doc §3 scores discovery as the open loop's one advantage
  //     ("finds work you would not think of") and the closed loop's accepted
  //     cost ("limited to the bounded goal"). This slide teaches closed loops.
  //   - ITERATE is not a place. In Article B's own cover ring it is the box
  //     that closes the circle — the return arc, drawn as a station. Here the
  //     return arc is drawn as an arc, and the station on it is where the
  //     ledger is written.
  //
  // REMEMBER, not RECORD: it is a plain verb like the other three, it is what
  // the row beside it is called, and the audience needs "the loop writes down
  // what it did", not a filing term.
  phases: ["PLAN", "EXECUTE", "VERIFY", "REMEMBER"],

  // ORDER IS LOAD-BEARING, and the order is ONE LAP, in the order it happens.
  // Each row lights an apparatus group, so hovering down the column walks the
  // figure — clockwise round the ring, then out at the exit:
  //
  //   1 TRIGGER    the entry          west       x 560
  //   2 BUDGET     EXECUTE, spend     north      x 834
  //   3 CONDITION  VERIFY, the fork   east       x 1016
  //   4 MEMORY     REMEMBER, the      south      x 654
  //                ledger, → PLAN again
  //   5 GATE       past STOP          far east   x 1168
  //
  // MEMORY is fourth, not second. It is the ledger written at the END of a lap
  // and read at the start of the next, so it belongs after the check, not
  // before the work — "checker, then the spine", and "tomorrow's beat starts by
  // reading the spine" (ref 8). Ref 9 orders its own anatomy the same way:
  // every part, then State/Memory, then the human gate last.
  //
  // CONDITION before MEMORY and GATE last is the fork drawn honestly: NO goes
  // to the ledger and round again; YES goes to STOP and to a person. The loop
  // continuing is row 4; the loop ending is row 5.
  //
  // #19 lists the five as TRIGGER · MEMORY · CONDITION · BUDGET · GATE. Only
  // the order moves; the set, the titles and the descriptions are untouched.
  decisions: [
    // The `desc` is what the thing IS. The `caption` is what happens when you
    // skip it. Three of the five captions used to restate their own row, which
    // made the hover well a second glossary; the two that carried a failure
    // (CONDITION, BUDGET) were the only two rows that taught anything. Now all
    // five are failure modes, and every one is sourced.
    {
      id: "trigger",
      num: "01",
      icon: "Calendar",
      title: "TRIGGER",
      desc: "A schedule or an event starts it. Never you.",
      descKw: ["Never you"],
      // Article A: "If you still start every action yourself, the loop is not
      // doing enough."
      caption: "Start it yourself every time and the loop is doing nothing.",
      captionKw: ["doing nothing"],
      chips: ["schedule", "event", "queue"],
    },
    {
      id: "budget",
      num: "02",
      icon: "Scale",
      title: "BUDGET",
      desc: "Capped runs, capped spend, and a schedule that expires.",
      descKw: ["a schedule that expires"],
      // Practitioner doc §9, "highest-risk omission". Unchanged: it was
      // already the best sentence on the slide.
      caption:
        "A closed loop with an unsatisfiable condition is an open loop, on a schedule, unattended.",
      captionKw: ["an open loop", "unattended"],
      chips: [],
    },
    {
      id: "condition",
      num: "03",
      icon: "ListChecks",
      title: "CONDITION",
      desc: "Done is counted off a file, not judged by taste.",
      descKw: ["counted off a file"],
      // Practitioner doc §4: a loop condition is a countable statement about
      // state on disk. Loops fail to terminate when the condition needs taste.
      caption:
        "“Every client got an update” — checkable. “Is it good” — not.",
      captionKw: ["checkable"],
      chips: [],
    },
    {
      id: "memory",
      num: "04",
      icon: "Database",
      title: "MEMORY",
      desc: "A file outside the chat holds what it already did.",
      descKw: ["outside the chat"],
      // Practitioner doc §5 [I], the sharpest line in either research doc and
      // previously unused: without anti-repetition memory a weekly loop
      // converges on identical output and the condition still reports success.
      caption:
        "Without it, week three writes what week one wrote — and the check still passes.",
      captionKw: ["the check still passes"],
      chips: ["state", "anti-repetition", "profile"],
    },
    {
      id: "gate",
      num: "05",
      icon: "Shield",
      title: "GATE",
      desc: "One named place where work stops and waits for a person.",
      descKw: ["One named place"],
      // Anthropic on approval fatigue (2026-07-31 §Human-in-the-loop cadence):
      // frequent permission prompts destroy the supervision they are meant to
      // provide. One gate, at a meaningful decision point.
      caption: "Approve every step and you approve nothing.",
      captionKw: ["approve nothing"],
      chips: [],
    },
  ],

  // The worked example is not a card. It is the apparatus' labels — the
  // Friday 4 PM run, written onto the figure (#19 Q10, option ii).
  apparatusLabels: {
    you: "YOU",
    youSet: "set",
    // No clock TEXT. `FRI 16:00` stamped a wall clock with one specific
    // Friday, and on a canvas with no other times on it that reads as a
    // riddle rather than a schedule. The glyph says "a schedule"; the row's
    // chips say schedule · event · queue. That is enough.
    //
    // NOT `review/state.json`. A file path is the one label on this canvas
    // that needs the audience to already be an engineer. It is a ledger —
    // the word the loop's own row uses.
    stateFile: "THE LEDGER",
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

  // Not "FIVE DECISIONS". Nobody in the sources calls these decisions — the
  // field's word is a loop SPECIFICATION (Macedo) or building blocks (both
  // articles). The audience question is "what must I write down before I
  // schedule this?", which turns a taxonomy into a checklist.
  leftHeading: "THE SPEC · WRITE THESE FIVE",
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
