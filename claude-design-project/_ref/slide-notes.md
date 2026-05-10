SECTION E SLIDE STRUCTURE NOTES (extracted from source)

E1 - THE THREE LAYERS  (steps: 7, canonicalPose: 6)
  Layout: centered, layered concentric LayerCards (prompt→context→harness)
  Steps: 0-1 PROMPT focal alone (step 1 plays prompt-typing demo)
         2-3 CONTEXT focal, PROMPT nested (step 3 plays context-network demo)
         4-5 HARNESS focal, both inner nested (step 5 plays multi-agent demo)
         6   all nested + quote fades in
  ISSUES TO FIX: demo overlaps with concentric cards; multi-agent connectors overlap boxes

E2 - PROMPT WHAT/WHY  (steps: 5, canonicalPose: 4)
  Layout: 40/60 grid, left=def+outcomes+bridge, right=NaiveVsProper, ImpactLadder footer
  Steps: 0 left pane; 1 naive prompt; 2 naive result; 3 proper prompt; 4 proper result
  ISSUES TO FIX: ensure prompt/result columns reveal in clear order; ladder footer overlap

E3 - PROMPT STRUCTURE  (steps: 4, canonicalPose: 3)
  Layout: centered, headline + spine list (6 elements) + FrameworkOrbit + footer
  Steps: 0 spine 1-3; 1 spine 4-6; 2 frameworks; 3 footer
  Hover framework lights spine elements via spineHits
  ISSUES TO FIX: framework orbit may overlap spine; spine reveal staggers wrong

E4 - METHODOLOGIES  (steps: 4, canonicalPose: 3)
  Layout: centered, headline + 3-tier grid (BASIC/INTERMEDIATE/ADVANCED), footer
  Steps: 0 BASIC tier; 1 INTERMEDIATE; 2 ADVANCED+annotation; 3 footer
  Click card opens TechniqueModal

E5 - THE WALL  (steps: 4, canonicalPose: 3)
  Layout: 2-col BP/CM, full-width WHERE PROMPT ENDS, closing caption
  Steps: 0 BP; 1 CM; 2 wall section; 3 closing
  ISSUES TO FIX: wall section overlap with closing? need clear separator

E6 - CONTEXT WHAT/WHY  (steps: 4, canonicalPose: 3)
  Layout: 25/75 grid, left=headline+def+analogy, right=NodeNetwork hub+6 satellites
  Steps: 0 hub+1 sat; 1 all 6 sats; 2 left gutter; 3 ambient + ladder rung 2
  ISSUES TO FIX: connectors from hub to satellites overlap with satellite boxes

E7 - STRATEGIES  (steps: 5, canonicalPose: 4)
  Layout: centered, headline + StrategyRings (4 rings: WRITE/SELECT/COMPRESS/ISOLATE) + footer
  Steps: 0 WRITE; 1 SELECT; 2 COMPRESS; 3 ISOLATE; 4 footer + ambient

E8 - STILL MANUAL (CONTEXT WALL)  (steps: 4, canonicalPose: 3)
  Layout: 30/70 grid, left=headline+4 pitfall items, right=PitfallCanvas with NodeNetwork
  Steps: 0 canvas+ambient; 1 pitfalls 1-2; 2 pitfalls 3-4; 3 footer
  Hover pitfall item shows illustration on canvas

E9 - HARNESS WHAT/WHY  (steps: 5, canonicalPose: 4)
  Layout: 55/45 grid, left=headline+NodeNetwork+HarnessPackage, right=ThesisPanel; ImpactLadder footer
  Steps: 0 stamped network; 1 compressed+harness package; 2 includes+arrows; 3 equation+stanza; 4 tagline+rung 3
  ISSUES TO FIX: stamped→compressed network transition overlap; harness package box+includes lines overlap

E10 - PRACTICES  (steps: 3, canonicalPose: 2)
  Layout: centered, headline + 2x4 PracticeGrid (8 cards)
  Steps: 0 headline; 1 top 4 cards; 2 bottom 4 cards
  ISSUES TO FIX: card content reveal order; ensure essence/bullets stagger

E11 - BRIDGE TO F  (steps: 2, canonicalPose: 1)
  Layout: hero photo right vignette, FigLabel "BUILT", right-anchored 2-beat headline
  Steps: 0 beat1; 1 beat2

UNIVERSAL FIXES NEEDED:
- 6 nav buttons at bottom of each slide (small, visible): prev step, next step, prev slide, next slide, reset step (within slide), reset to first slide
- Keyboard: space=next step, backspace/delete=prev step, →=next slide, ←=prev slide, r=reset deck, u=reset step
- Consistent FigLabel→headline gap across all slides (currently inconsistent: top-12 + py-20 + various gap-* values)
