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