// PROTOTYPE — throwaway (gh#16). See ./index.tsx for the questions being answered.
//
// The FIXED half of the brief: the message, not the form. Every variant renders
// exactly this copy. Anything a variant invents about layout, grouping,
// ordering or emphasis is the variant's own opinion; anything in this file is
// the control.
//
// Two brands, because both slides sit in the brand-varying slots of #8:
//   gems  → tech function "DigiTech", GEMVIS asserted at ~L3
//   berau → tech function "MineTech", no tech-function marker at all

export type Brand = "gems" | "berau";

// ───────────────────────── slide 1 — Agentic Organization ─────────────────────────

export interface Pillar {
  id: string;
  /** Lucide icon name — resolved by each variant. */
  icon: string;
  /** The pillar as the HR original names it. */
  label: string;
  /** THE POINT: the leader's decision in that pillar, not its description. */
  decision: string;
  /** Words the variant may emphasise inside `decision`. */
  decisionKw: readonly string[];
  /** Where Act III picks this pillar back up. */
  actIII: string;
}

export const pillarBrief = {
  fig: { section: "II", num: 1, label: "THE AGENTIC ORGANIZATION" },

  headline: "Six pillars move together, or none of them move.",
  headlineKw: ["move together"],

  kicker: "AN OPERATING MODEL — NOT A DEPARTMENT, NOT A COMMITTEE",

  hub: {
    // Deliberately generic: the brand line sits underneath.
    label: "THE ENABLER",
    // brand → what the enabler is actually called here
    brandLine: { gems: "DigiTech", berau: "MineTech" } as Record<Brand, string>,
  },

  // Focus-walk order is the teaching order, not the HR original's order:
  // the two pillars Act III opens with come first.
  pillars: [
    {
      id: "governance",
      icon: "Shield",
      label: "Governance & Policies",
      decision: "You decide what may leave the building — before someone asks.",
      decisionKw: ["what may leave the building"],
      actIII: "Security · no SOP",
    },
    {
      id: "tools",
      icon: "Boxes",
      label: "Tools & Platform",
      decision: "You decide who gets a seat, and you pay for it centrally.",
      decisionKw: ["who gets a seat"],
      actIII: "Subscriptions",
    },
    {
      id: "people",
      icon: "Users",
      label: "People & Mindset",
      decision: "You decide that not using it is the deviation.",
      decisionKw: ["not using it is the deviation"],
      actIII: "Leading AI Culture",
    },
    {
      id: "strategy",
      icon: "Compass",
      label: "Strategy & Leadership",
      decision: "You decide which problem gets the pilot — and name its owner.",
      decisionKw: ["which problem gets the pilot"],
      actIII: "Leading AI Culture",
    },
    {
      id: "process",
      icon: "Workflow",
      label: "Process & Methodology",
      decision: "You decide where the human signs, and everywhere they no longer do.",
      decisionKw: ["where the human signs"],
      actIII: "Specify · Generate · Verify",
    },
    {
      id: "companions",
      icon: "Bot",
      label: "AI Companions",
      decision: "You decide when a tool is allowed to become an agent.",
      decisionKw: ["allowed to become an agent"],
      actIII: "The capability ladder",
    },
  ] as const satisfies readonly Pillar[],

  closer: "Every one of these is a decision on your desk. None of them is a tool purchase.",
  closerKw: ["a decision on your desk"],
} as const;

// ───────────────────────── slide 2 — the Capability Ladder ─────────────────────────

export interface Rung {
  id: string;
  level: string;
  title: string;
  sub: string;
}

/**
 * Two epistemic statuses, and the visual has to separate them WITHOUT a legend:
 *   asserted — a placement we are willing to defend, and we cite it
 *   open     — a question thrown to the room; the position is the question
 */
export type MarkerKind = "asserted" | "open" | "aside";

export interface Marker {
  id: string;
  kind: MarkerKind;
  /** Rung index (0-based) the marker attaches to; may be fractional to sit between rungs. */
  at: number;
  label: string;
  /** Asserted markers only — the sourcing, printed on the slide. */
  citation?: string;
  /** Open markers only — the question put to the room. */
  question?: string;
  /** Open markers only — the evidence that makes the question fair. */
  evidence?: string;
}

export const ladderBrief = {
  fig: { section: "I", num: 6, label: "THE CAPABILITY LADDER" },

  headline: "Five levels. L5 is declared only when earned.",
  headlineKw: ["only when earned"],

  provenance:
    "Adapted from SAE J3016 automation levels and Anthropic's workflow-vs-agent boundary.",

  rungs: [
    { id: "l1", level: "L1", title: "Assisted", sub: "Ad-hoc individual use" },
    { id: "l2", level: "L2", title: "Copilot at scale", sub: "Org-wide, humans drive every task" },
    { id: "l3", level: "L3", title: "Agentic, bounded", sub: "Decision contract · 70/30 split" },
    { id: "l4", level: "L4", title: "Multi-agent mesh", sub: "Coordinated agents, escalation paths" },
    { id: "l5", level: "L5", title: "Full agentic org", sub: "Declared only when earned" },
  ] as const satisfies readonly Rung[],

  // The mandate block re-uses the ladder later; phases map onto rungs.
  phases: [
    { id: "p01", label: "P0–P1", target: "solid L2", at: 1 },
    { id: "p2", label: "P2", target: "bounded L3", at: 2 },
    { id: "p3", label: "P3", target: "governed L4", at: 3 },
  ],

  // Berau has no tech-function marker on purpose. Silence would read as an
  // unfinished slide, so the absence is stated instead of left blank.
  absence: {
    gems: null,
    berau:
      "MineTech — nothing comparable to place on this ladder yet. That is the finding, not an omission.",
  } as Record<Brand, string | null>,

  markers: {
    gems: [
      {
        id: "digitech",
        kind: "asserted",
        at: 2,
        label: "DigiTech · ~L3",
        citation:
          "Google Cloud on GEMVIS: hierarchical multi-agent, dispatcher → specialists, 50 applications, 4,000+ users",
      },
      {
        id: "rest",
        kind: "open",
        at: 0.4,
        label: "Everyone else",
        question: "So where does that put the other 90%?",
        evidence: "“Outside DigiTech, adoption is not really adopted well.”",
      },
      {
        id: "nano",
        kind: "aside",
        at: 0.5,
        label: "Nanovest · L1–L2",
        citation: "Us. Included so the ladder is not a scoreboard.",
      },
    ],
    berau: [
      // Deliberately no tech-function marker — MineTech has nothing comparable
      // to GEMVIS, and inventing one would be the worst thing this slide could do.
      {
        id: "org",
        kind: "open",
        at: 0.4,
        label: "Berau Coal",
        question: "Did it become daily use, or did it stop at the certificate?",
        evidence: "382 leaders trained · competition complete · Ambassadors named",
      },
      {
        id: "nano",
        kind: "aside",
        at: 0.5,
        label: "Nanovest · L1–L2",
        citation: "Us. Included so the ladder is not a scoreboard.",
      },
    ],
  } as Record<Brand, readonly Marker[]>,

  closer: "One of these is a claim we will defend. The other is a question for this room.",
  closerKw: ["a claim we will defend", "a question for this room"],
} as const;
