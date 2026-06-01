Fix slideD4, currently as attached, on claude-design-section-d folder
1. The left section should have section title "DECISION TREE", and ensure we follow slideD2 "Five Disciplines" style along with the bottom separator line as attached. Make right section title "Outcomes" to follow the style also
2. Left section "timeline" lines is overflowing on top on number 1, fix it, and also the lines inside the circle is visible (it should not, make it behind the circle).
3. Make the "circles with number" highlighted when hovered.
4. Make left and right section start and end position vertically the same, currently right section is "shorter"
5. And for bottom summary, make it left-aligned below left section, not right section

create Tasks for all items above (your TaskCreate tool), dispatch and delegate to your general-purpose agent to fix it.
For better understanding, you can dispatch your Explore agent.

-----------------

Implement section F based on docs/specs/2026-05-11-slides-foundation-techniques-section-f.md 
create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/), you can dispatch your Explore agent.
FYI, if need some reference on styles, components, animations, layouts, refer to section D and E, since section I,J,K not properly done yet

_________________

Implement title slide and section A,B,C based on docs/specs/2026-05-11-slides-opening-title-A-B-C.md 
create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/), you can dispatch your Explore agent.
FYI, if need some reference on styles, components, animations, layouts, refer to section D,E, and F, since section I,J,K not properly done yet

________________

Implement slide G7-G11 from section G based on docs/specs/2026-05-12-slides-application-G7-G11-synthesis.md (G1-G6 is done)
create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/), you can dispatch your Explore agents (Sonnet model)
FYI, if need some reference on styles, components, animations, layouts, refer to section D,E

------------------
Implement section H based on docs/specs/2026-05-12-slides-application-H-discipline.md (section G is done)
create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/), you can dispatch your Explore agents (Sonnet 4.6 model)
FYI, if need some reference on styles, components, animations, layouts, refer to section D,E

-------------------
Fix and improve opening sections (title, section A,B,C), based on docs/specs/2026-05-11-slides-opening-title-A-B-C.md
For slide 1 (see current in docs/examples/section-A-B-C-current/title-slide.png)
1. There is no background generated image yet, build the prompt (futuristic-modern but still keep the deck tone), and use the MCP to generate it
2. "BCE AI Catalyst..." on the bottom right side, and my fullname (Adrianto Tedjokusumo) and company in the bottom left side with microphone icon/glyph and make it in 1 line. But, ensure it is not covering the navigation button
3. We need the proper subtitle to accompany the main title
4. Consider the title subtitle position carefully, align it properly with the image generated. Left-aligned is also ok.

For the rest of slides, I prefer to have a consistent header layout, where we can have the slide title below the Fig Label, also follow the styling properly like the section D (font size, weight, color, and spacing), unless the bridge slide (slide 13) (last slide). It is ok to change the fig label, so it rhymed properly with the title. 

For slide 2 (see current in docs/examples/section-A-B-C-current/A1.png)
Supporting doc: docs/researches/section-a-vol1-winner-analysis.md
1. For step 1, I prefer to only show the main tagline in the middle (center horizontally-vertically), with the capability chips in box (highlighted when hovered) underneath it (similar to slideE1 - Key Terms)
2. Step 2, the capabilities goes bigger and vertically stacked as cards on the left side like slideD2 step 1. the cards have icon and also description for it. We need the section title, like slideD2 also
3. Step 3, it shows the question on the right side, reveal with animation one by one, no need to have trigger steps. Order the questions properly based on the "deep dive" section (i.e. E. Engineering Fundamentals), and we need 1 more question related to section G. The section should appear directly inside questions box. It also has section title like step 2 left section
4. Step 4, footer caption, please suggest, we can put it on bottom left side, similar to D3

For slide 3 (see current in docs/examples/section-A-B-C-current/B1.png)
Supporting doc: docs/researches/2026-05-11-ai-evolution-stages-refresh.md
1. The current journey illustration can be improved (move it a bit to the top), please make it similar with docs/examples/B2-timeline-illustration.png (top and bottom position). We can make it all shown in the beginning (reveal with animation), but the rest are "dimmed out". When we go to next step, the next line and circle is "dimmed in", and so on. For the wall text, make it inside a box. For "Agentic Reasoning" (wall text above the line), "WE ARE HERE" with pulse-glow animation is appear also on the bottom of the circle (with arrow pointing to circle and has motion animation moving top and bottom a bit). For stage 6 "AGI", we can make the lines still in "dashed" style, but on step 6 it will "dimmed in"
2. When we hover the circle or the wall text box, it will show the bottom stage details as hover popover (basically full width from left to right, similar to slideE4 bottom section). Make the circle and wall text box highlighted when hovered.
3. So total is 7 steps, 6 for the "stage reveal", and one more step for footer caption reveal, please suggest the content. bottom left side.

For slide 4 (see current in docs/examples/section-A-B-C-current/B2.png)
1. Illustration is bad, using rectangle, it is better if we can have it either in circular russian doll style like slideE1, but proper illustration is like in docs/examples/B2-reference.png (it is ok if we simplified it). And we will do the reverse way, explain from outside and goes deeper to inside circle for the step reveal.
2. We can do the step reveal similar to slide E1, so left side is illustration, the right side is the details of it (including examples so audience can relate better)
3. The last step is the footer section reveal, please improve the text content
4. For the details content, you can dispatch explore agent to do web research about it (store the research in docs/researches/). Use haiku model.


---------------

Fix and improve slide 5 & 6 which already implemented based on docs/specs/2026-05-11-slides-opening-title-A-B-C.md 
See current state in docs/examples/section-A-B-C-current/B3.png & docs/examples/section-A-B-C-current/B4.png
Supporting doc: docs/researches/2026-05-11-foundation-model-landscape.md
Use your explore agents (haiku model) to read the current codebases and the given docs above.
1. I think we should re-phase slide 5, properly, where i think it should be more on "How LLM works, the core keywords / parameters and concepts related to it". we can also include "effort" where currently GPT and Claude have it setup in the model, beside max tokens, context window, temperature, system prompt, top-p, top-k. we can dispatch explore agent (Haiku model) to do web research further about it. For "How LLM works" we can illustration reference: docs/examples/B3-how-llm-works.png. And for some LLM parameters, we can also have animation loop also to explain about it easier.
2. And for slide 6, it is about the model options, similar with the current, but include the current slide 5 right side content. And it would be great if we have graph chart of top 3 models benchmark data based on https://artificialanalysis.ai/, we can dispatch an explore agent (haiku model) to do web research on the LLM benchmark, and maybe can adopt on the category based. We dont need Asia frontier at all. So maybe left side vertical stack is about the category, and the right side is either the explanations or the charts itself. We can focus on several models like GPT-5.5, Opus 4.7, Gemini 3.1 Pro, Kimi-K2.5, Deepseek V4, Grok 4.3. Qwen, GLM. Open weighted models framing which could "outperform frontier" is still can be used (with proper fine-tuning)
Store all research results in docs/researches, and use it as input for discussion

create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/) or do web researches, you can dispatch your Explore agents (Haiku model)

Implement slide B3-B4 (slide 5 & 6) from section B based on docs/specs/2026-05-12-slides-B3-B4-mechanics-and-models.md (B1-B2 is done)
create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/), you can dispatch your Explore agents (Haiku model)
FYI, if need some reference on styles, components, animations, layouts, refer to section D,E

--------------

Fix and improve slide 7-13 section (B5 until C), based on docs/specs/2026-05-11-slides-opening-title-A-B-C.md
For all the content inside, dispatch explore agent (Haiku model) to do web research further about it, store it in docs/researches, and use it as your input.

For the all slides, make a consistent header layout like in slide 1-6, where we can have the slide title below the Fig Label, also follow the styling properly like the section D (font size, weight, color, and spacing), unless the bridge slide (slide 13) (last slide). It is ok to change the fig label, so it rhymed properly with the title. 

Fix and improve slide 7 (see current in docs/examples/section-A-B-C-current/B5.png)
Supporting Doc: docs/researches/topic-ai-evolution.md
1. For step 1, use the similar approach with slideD1, also on the percentage color style and the text style. And it should animated / stagger directly with the main text, also the sources. DO NOT show the horizontal bar chart yet. Also fig label, I think it is better to put "AI Landscape Paradox". 
2. Step 2, just show "And yet" in the middle, move the main text in step 1 into the header title (but we can rephrase it in brief / shorter). Make a consistent header layout like in B1 & B2 once moved
3. Step 3, remove the and yet word, just show the horizontal bar chart in the middle (vertically and horizontally), with entry animation stagger one by one chart, also direct animation of "bar-filling" percentage (along with percentage number animation goes up), and no need for the "right side subtitle", 
4. Step 4 reveal "What's the difference?" below the charts. For this slide, no footer caption is ok

create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/) or do web researches, you can dispatch your Explore agents (Haiku model)

---------------

Fix and improve slide 6 (B4) based on reference doc in docs/researches/2026-05-12-llm-benchmarks-may-2026.md and current state in docs/examples/section-A-B-current/B4.png
1. Fig label is repetitive, and Respect slide B2 and B3, where both have fig label and header title, please make a proper ones for both, and follow it consistently for the styling. We also need to have left and right section title, similar styling with B3.
2. Do not use ladder card on the left section, Please follow slide A1 step 2 or E8 step 1, left box structure, with icon and description. The current description especially on "Cost x Intelligence" is not quite right, also on "Multimodal", but you can review it for all
3. Step 1, should have "entry animation", stagger left box input from top to bottom
4. Right section should have section box
5. For step 1 to 5, right section details can be improved, we have too much space inside, we can put more models information inside
6. Footer caption caption position is too bottom, we need to ensure both footer to be above the navigation content
7. The current summary is not good, we can just make the content "good", "average", "bad", "best", etc, basically qualitatively but based on quantitative data
8. I think we can reduce the steps, and we can follow approach E8, using hover popover approach, but if we "click" on the left card, we can pin unpin it on the right side. So step 1 already cover step 1 to 6, then step 2 is the current step 7, so total only 2 steps. No default showing on step 1 right section, leave it blank.

create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/) or do web researches, you can dispatch your Explore agents (Haiku model)


---------------

Let's discuss on section C (slide 8-13) which already implemented based on docs/specs/2026-05-11-slides-opening-title-A-B-C.md
See current state in docs/examples/section-C-current and image references used in docs/examples/section-C-reference
For all the content inside, dispatch explore agent (Haiku model) to do web research further about "AI mindset / mental model", store it in docs/researches, and use it as your input.

Problem to address:
1. Header consistency: for the all slides, make a consistent header layout like in slide 2-6, where we can have the slide title below the Fig Label, also follow the styling properly like the section D (font size, weight, color, and spacing), unless the bridge slide (slide 13) (last slide). It is ok to change the fig label, so it rhymed properly with the title. 
2. Some illustration is not properly done, especially C3 and C4, it is not good.
3. Awkward and not-consistent step reveals
4. C5 and last bridge slide, do we need image gen to fill the background? and do we need separate slides for both?

For better understanding on current codebase (src/ folder) and research content (docs/researches/), you can dispatch your Explore agents (Haiku model)


---------------

Implement slide 8 to 13 from section C based on docs/specs/2026-05-13-slides-section-c-rework.md
create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/), you can dispatch your Explore agents (Haiku model)
FYI, if need some reference on styles, components, animations, layouts, refer to section A,B,D,E

-----------------

Fix and improve:
1. Slide A1, make all cards can have hover animation highlight. And on step 2 until 4, for the left section and right section cards basically can have bigger height, since we have quite gap with the footer section.
2. Slide E11, make "The fundamentals are built" as second line, and make first and second line have stagger animation.
3. Slide D5, follow exactly the same styling, darken overlay, total steps, entry stagger as the updated E11 in number 2. It should have separator and same "Step 2" style, no need to mention the section, just "Next: how the system gets built."
   
create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
For better understanding on current codebase (src/ folder) and research content (docs/researches/) or do web researches, you can dispatch your Explore agents (Haiku model)

---------------

fix slide F2 until F7:
  1. Remove section box on the right side, along with the section title and subtitle in hover popover details
  2. Then make the rest of hover popover details to be vertically center aligned with the left cards
  3. Hover popover details top position should be not "ABOVE" the "first left card - top box border", and also not "BELOW" the "last card - bottom box border" once we did number 
  2. If it happens, means we need to reduce the height of it.
  
  Now on the hover popover details on the given slide and left section card number:
  4. F2, first card: [Image #7], zone titles should be close enough with small gap with the illustration.
  5. F2, third card: on "Hybrid" part, ensure in second zone "Storage" illustration, it includes "keyword search" illustration (BM25) along with the "graph" RAG. It is ok to be
  small, and we can reduce "markdown" files inside so we can have more room for others.
  6. F2, fourth card: the table should have no animation, remove animation, it is confusing
  7. F3, second card: it is mostly the same with first illustration, we can make it in 5 illustration per each (it is ok in 5 columns, with the column title (Skills, Hooks, etc)
  and subtitle - please suggest the subtitles for each, but make it concise in 1 word that represent it like ("brain", "worker", etc). No need to mention which slide will deep 
  dive each. Ensure the illustration nas animation loop
  8. F3, fourth card: [Image #8], we have many many spaces per column, we can illustrate it with text-streaming content, or really animation loop illustration
  9. F3, fifth card: the structure is wrong, follow this official ones [Image #9], but remove commands/ and make 2 skills folder examples inside with each SKILL.md, along with 2
  agents examples inside agents/. Ensure the nesting is proper
  10. F4, first card: remove the "Expand" button and section box, but make the text streaming continues to until the end, and loop back to the beginning, since we have absolute 
  "chat" window
  11. F4, third card: make the "Claude's Match Engine" using "horizontal bar chart" between the card title-description and the number. Make motion animation for the bar from 0 to 
  the expected number, and make the number also follow it. Ensure the chart left position all are the same between those 3 cards.
  12. F4, fourth card: make the bar chart and description using stagger reveal and motion animation. show "skill metadata" bar from 0 to 0.5, along with the description, then 
  reveal the "Active skill content" bar from 0.5 to 4.5 (represent 4% width), along with the description, and so on.
  13. F5, first card: make illustration better, make 3 MCPs is vertically stacks, with each have "connector with pulse animation" fan-in to claude box, and fan-out to other 3 MCPs
  with connectors also. basically 3 columns / zones. Change MCP "..." with "3rd Party Tools"
  14. F5, second card: make 3 additional cards for each columns and change "MCP Protocol" to "CLAUDE" and just make it written horizontally, not vertically.
  15. F5, 3rd card: since we are using "hover", we cannot "click for details", so remove it from each card. But, i prefer to have Pros and Cons for each card, and listed in bullet
  points for each. And if we have more spaces, we can have more points inside.
  16. F5, fourth card: We can have illustration for each card, we can have in text-stream animation, or code block with function, whatever suitable
  17. F7, third card: this is the most overflowing illustration, reduce each illustration size, and for the "parallel" one, do not make "P" node again in the bottom, just ensure
  the pulse go back to the top "P" node
  18. F7, fourth card: no need for animation for table, and fix overflow issue on "Accountability", see current [Image #10]
  19. Generic for all hover details cards: if there is animation for cards, please MAKE "left to right" or "top to bottom" card animation, and the animation style is the same like
  when we hover the left section cards

Create Tasks for all items to do (your TaskCreate tool), dispatch and delegate to your general-purpose agents to implement.
Dispatch your Explore agents (Haiku model) for better codebase understanding.

------------

Fix and improve slide F8 C based on docs/specs/2026-05-14-f8-agentic-os-monitor.md
create Tasks for all items to do, delegate to your general-purpose agents to implement (do it sequencially if there are tight dependencies, otherwise do it in parallel)
Dispatch your Explore agents (Haiku model) for better codebase understanding.


-------------
fix slide I1, current step 1 [Image #1], step 2 [Image #2], step 3 [Image #3], and step 4 footer caption reveal

Per Steps Details
1. For step 1, follow C1 step 1, Where it shows in 2 lines in animation stagger. First line is "What you've been watching so far." (kw: watching), second line is "It was built entirely by AI" (kw: built, AI)
2.  For step 2, Move second line to be the slide title in header, follow the motion like in F1. it should move from the "middle" slide to the "header title" position below Fig label. Then it is also reveal "And here is the process that made it possible" (without underline style, and make the style is the same with the first line of step 1, (kw: process)).
3. For step 3, similar motion like step 2, "And here is ...." move from the middle to the section title like this [Image #4] in G7 ("Five Categories"). And then reveal all the cards in stagger. And the card style could follow slide G9. where we use icon, title, subtitle, bullet points inside. But inside it, we have 2 section vertically stack, "TO DO" and "RESULTS"
4. For step 4, as per current, reveal footer caption

RULES: ALL CARDS inside CAN BE HOVERED with "animation highlight" like slide G10

Now for each card content (make it brief, but still bring the complete details):
1. Card 1 - Research & Preparation (please suggest subtitle) 
   1. To Do:
      1. Gathering context reference (BCE Workshop Plan, Discussion with BCE PIC, Previous workshop materials) - by pulling persistent memory, Google Drive MCP, 
      2. Do web research (content ideation, topic deep-dives, design references, tech stack options) - by Claude buit-in WebSearch and WebFetch tool. 
      3. Get ground truth information from official docs (Claude, Gemini, OpenAI, Trusted Youtube content) - by using RAG -> notebookLM plugin 
      All using paralel sub-agents invocation in Claude
   2. Results: 30+ research docs in markdown file
2. Card 2 - Brainstorm & Plan (please suggest subtitle) - all of this using brainstorming skill
   1. To Do:
      1. Deck Objective Discussion
      2. Outline Section Structure Discussion
      3. Design Meta Discussion
      4. Per-Slide Content Deep-dive Discussion
      5. Tecnical specs discussion
   2. Results:
      1. Deck full plan
      2. Design System specs
      3. Development project structure
3. Card 3 - Prototype (please suggest subtitle) - all of this using Claude Design + Gemini-image-gen MCP
   1. To Do:
      1. Build design system (motions, components, icons, typography, color)
      2. Prototype some slides layout with design system
      3. Create image background
   2. Results: 
      1. Design system reference in HTML
      2. Deck MVP in low fidelity
4. Card 4 - Implementation (please suggest subtitle) - using Claude Tasks and sub-agent driven development
   1. To Do: 
      1. Development (Unit test, main code) - by Claude agents
      2. Review process (specs compliant, code review) - by Claude agents
      3. Human in the loop (manual testing, feedback for umprovements)
   2. Results: THIS DECK

Create Tasks for all items to do, delegate to your general-purpose agents to implement (do it sequencially if there are tight dependencies, otherwise do it in parallel)
Dispatch your Explore agents (Sonnet model) for better codebase / other slides understanding.

----------------
For the box content, make it based on this data:
1. Mar 2025 - Started learning AI through web articles, youtube contents. Use Claude and Gemini Chat on daily use, no goals, just experiment
2. June 2025 - Build 9 MCPs for engineering team, but scrap 2-3 projects (vibe code failure)
3. Sep 2025 - AISC was formed, appointed as lead, to bring AI culture to the whole company
4. Dec 2025 - Build 3 AI agentic systems for Legal, Product, and Research Team
5. Mar 2026 - Build 2 nanovest plugins for reusability (product and notebookLM plugin)                                                                                             
3 months for foundational knowledge, 3 months build and fail, 3 months evaluate+correct mental model, 3 months build with harnesses and discipline

----------------

fix the current messy slide in I3 as per current [Image #3]
It has a lot of content, 3 illustration + images (in varied aspect ratio) from workflows, and 2 illustration from plugins, and some wall text content from Tools and Workshops.
I want to fix the structure first, where i think we can refer to F8 implementation (like making website inside the slide itself, containing my portfolio)
1. Before we go there, we must fix all the illustration well [Image #4] [Image #5] [Image #6] [Image #7] [Image #8]. Overlap, overflowing, no connectors (or connectors not connect properly). I think we can simplify the diagram and make animation better. You can check other illustration built like in F7 card 5, F6 card 4, F2 card 1 & 3, E6 step 2, D2 step 2, D1 step 2.
2. And for images, we need to find out the best way to display it in screen, for the workflows, how to make them can be reveal in a good way, either stack it, resize some so have same height, crop it, etc.
3. Then as F8, I think we can have left menu, containing "Workflows", "Plugins", "Connectors", "Workshops", so 4 menu only, and we will not have right section like the current F8, so just left menu and content. We should have the click and hover interaction following also
4. In connectors, we can have 9 MCPs: sentry, atlassian, datadog, google-workspace, n8n, figma, and the rest mention in this slide. Those unmentioned one, can be labeled as "unused" since official one already have it, therefore only 3 still in use. in F8, it has connectors tab, so we can have similar ones (but instead of "connected", we have "IN USE" and "NOT USED"
5. Workshops we can have it like the "memory tab" just show in cards for the details with bullet points
6. for workflows, we can use "agents" tab but it should have top tab of the workflows selection, and below it is the illustration which have toggle to change it to the "real output". so basically change the layout completely. and plugins will have the same manner, but without the switch of "real output"

Create Tasks for all items to do, delegate to your general-purpose agents to implement (do it sequencially if there are tight dependencies, otherwise do it in parallel)
Dispatch your Explore agents (Sonnet model) for better codebase / other slides understanding


-----------------
From the current slide code (from section B to H, and J), i need to create 10 questions with 4 multiple choice answers (and provide the answer too)
So event organizer of my presentation event, wants to ensure the whole audience is really understand on the material given by me.
Ensure the quiz cover all the sections above, and make it in order.
Please create it in docs/quiz (new folder), make it in markdown format. 
Dispatch your Explore agents (Haiku model) for the codebase understanding.

-----------------

lets fix @src/slides/reveal-and-closing/simulations/StocksIntel.tsx, which currently [Image #1]
  1. The current illustration, each diagram is currently too small, we must make it bigger for better visibility.
  2. Here is the proper reference [Image #2]. We have daily schedule trigger, goes to first AI agent - Source Aggregator (consist of RSS Feeds (getting all raw news metadata),
  then go to LLM to filter news based on relevance to stocks, output in valid news metadata). then goes to second AI agent - Batch Processing News (consist WebScraper, and LLM to
  analyze each news, and resulting in news-ticker connection). then goes to 3rd AI Agent - Tickers generator agent (consist of Ticker extraction - cross check with Valid tickers
  ground truth, LLM to analyze ticker (scoring importance, outlook determination), and get top 10 tickers). Then goes to 4th AI agent - Summary Generator (consist of LLM 
  generating brief content details based on template, push the final structure to Slack and Google Sheets). So i Think we can show 4 big boxes of AI agent with llustration process
  inside). We can have sources mentioned outside the main diagram. We can do fanout from AI agent 1 to AI agent 2 and fan in again in AI agent 3 (but still use 1 box for Ai Agent
  2)
  3. I think we can create Animation SVG loop for some boxes like "WHY PACKAGE state - 50 user laptops" in F3 [Image #3] or static ones like "FilePile, IndexBlock, QueryBlock" in
  F2 [Image #4].

-----------------
let's fix @src/slides/reveal-and-closing/simulations/LegalDocs.tsx to mimic similarly on how @src/slides/reveal-and-closing/simulations/StocksIntel.tsx is build
  1. The current illustration, each diagram is currently too small, we must make it bigger for better visibility
  2. Animation loop, illustration of agents (inside the box illustration), should be improved. We can create several SVGs if needed
  3. The flow: Slack Chat Trigger (with commands) -> filling slack built-in form & Submit -> Docs Generation Agent (no LLM / AI, just full process workflow; Folder creation in 
  GDrive, extract payload from slack and create get docs template in GDrive -> write a new doc and store in GDrive -> inform in slack, update docs tracker in GSheet). Then goes to
  Approval Workflow Agent (no AI/LLM also, Human in the loop decision, approval in Slack by Finance first then legal. If rejected by either of them goes to AI revision agent (get
  the rejection reason -> LLM parse decline reason into structured JSON updated field -> update existing doc in GDrive -> restart approval workflow. If both finance and legal
  approve, goes to E-Sign Automation Agent (no AI/LLM;create PDF from the doc, upload to Dropbox, send email to signer, wait for signature events, download signed docs from
  dropbox, upload signed PDF to GDrive -> update project tracker in GSheets and inform done status in Slack). Simplify diagram example is in [Image #1]


------------------
 fix & improve @src/slides/reveal-and-closing/simulations/ExchangeAlerts.tsx  to mimic @src/slides/reveal-and-closing/simulations/StocksIntel.tsx, as currently [Image #18]
  Reference simplified process as in [Image #17]
  1. The current illustration, each diagram is currently too small, we must make it bigger for better visibility
  2. Animation loop, illustration of agents (inside the box illustration), should be improved. We can create several SVGs if needed
  3. The flow: Hourly cron -> Feeds Aggregation Agent (no LLM / AI, RSS Feeds of 6 providers  batch loop (getting all raw announcements metadata, including source from official
  APIs, web scrapper, RSS, Telegram Channel) -> Announcement Filtering Agent (no LLM/AI, remove deduplication from all sources) -> AI Batch Classification Agent (clasify the
  categories, alert priorities, feed relevance) -> Alert Generator agent (push Opsgenie alert in batch for the relevant alerts)

  Create Tasks for all items to do, delegate to your general-purpose agents to implement (do it sequencially if there are tight dependencies, otherwise do it in parallel)
  Dispatch your Explore agents (Sonnet model) for better codebase understanding
  ENSURE WE CAN HAVE SIMILAR WIDTH AND HEIGHT for the whole illustration like the stocks one, we must fill corner to corner

------------------

/superpowers:brainstorming let's discuss on the practice labs use cases to be done during the workshop based on docs/references/deck-full-content-analysis.md
  Some important notes:
  1. We will not focus on concept, it is more on practical use cases using TOOLS
  2. Total time for practice labs is 2 hours
  3. The audience per session is around 40 people, and they will be separated in 8 groups. Per group, will have only 1 laptop in access for the hands-on. The group itself will be 
  the team for competition later
  4. There is uncertainty; the laptop used, most likely doesnt have admin access, so there is possibility the audience laptop cannot use Claude Desktop, so use case maybe limited 
  on Claude Web
  5. It would be great if we can use one long use cases, stitch between each others 


------------------

I want to add 1 slide inside section E, after slide E4 (and we need to re-number all slides afterwards it in section E (the file title also
  the figLabel)
  The new slide E5 should be Layer 1 - Examples. We want to give more examples of it.
  Background: get feedback from the Berau management, the audiences need more examples on prompting, since this is the key area focus for
  them, especially for audiences >50 years old, understand other slides is difficult, so at least they are "good enough" on prompt
  engineering related.
  For the layout, we can follow E3 stepIndex 0, where on the left slide is the list of use cases we want to cover, with icons, title, and 
  subtitle, and when we hover it (support pin/unpin also), we show on the right side is the goal, the full prompt, also structures and 
  techniques used in tags/pills like this [Image #2]. For the full prompt, use text-streaming animation. And if we hover on the prompt area, 
  it will have highlight animation on tags/pills which basically explain "this sentence represents structure A". If it is using more than 1 
  techniques, do the similar ways.
  For structures, refer to E3 left side content, for techniques, refer to E4 content.
  Total step is 2 only, the last step is only showing the footer part. please suggest for the footer, make it meaningful, not redudant with
  the title (suggest also for the header title)
  For prompt examples and use cases, use your explore agents (Sonnet model) to understand the gemini reference from
  docs/references/prompting-guide-gemini.pdf. in the reference, structures used is Persona, Task, Context, and Format, use my structures
  instead. it is from gemini, but make it model-agnostic for this slide. Again, this is just reference, make it MORE GENERIC for the use
  cases, DO NOT MAKE IT COMPLEX, remember the background and audience target.
  
  Now your task: 
  1. Use explore agents to understand the codebases also the references given (Sonnet model)
  2. Make the plan for the changes, use Plan mode
  3. While executing, use TaskCreate and TaskList, dispatch implementer agents for each task to do in fresh session.
  
  DO NOT USE SUPERPOWERS skill 