# Berau Coal Energy Workshop and Training

## Background

I (Adri) from Nanovest (one of Sinarmas Mining Group's BU) is expected to be the primary facilitator for around 400 BCE (Berau Coal Energy) members (another BU), including presentation with Q&A (120mins) also practice lab (120 mins)
The reason why they want me, is because i did presentation to the whole HR Group as in docs/references/hr-group-presentation.pdf, and they like it
Currently, Nanovest is the early adopters / most advancing BU on the AI related understanding and implementations.
BCE wants to close the gap, therefore conducting the sessions.
The plan details is on docs/references/berau-presentation-plan.pdf (proposed by Berau PICs)
They already conducted vol 1 session (different facilitators), and I will bring sessions for vol 2 (session 2, as session 1 is from the vol 1 competition winners)
What they are expecting is in my session is on **SLIDE 3** from the plan details.

## Goal

Create animated / motion HTML page which can be exported to PDF or PPTX for the workshop, which in general containing:
1. AI evolution & landscapes
2. AI mindset (transformation from the common people thinking about AI, perceiveness on new technology, fear on replacement, etc to acceptance with a lot of confidence on embracing personal and team adoption where human can benefit a lot with AI usefulness)
3. Process improvements framework (BPA, RPA, IPA)
4. AI Engineering fundamentals (prompt - context - harness engineering)
5. AI Techniques / Frameworks (MCP, RAG, plugins / skills, agent orchestration, etc)
6. AI Tools Ecosystem (Anthropic - Claude, Google, OpenAI -> focusing more on the Claude capabilities, Google AI Ecosystem & capabilities, short about openAI)
7. Common pitfalls when working with AI (AI slop, hallucination / bias, token inefficiency, massive correction loops, tools without direction, building without preparation / strategy, etc)
8. Best practices on how to work with AI (answering common pitfalls, sharpen the axe principles, spec-driven, long-running agents, plugins / skills for reusability, context and session management, etc)
9. How to start adopting AI (focus on individual track first)

And for practice lab, the idea is I can produce step by steps to the audience along with "predefined" prompt or setup so they can use it instantly.
We need to have a standout but rather simple implementations which they can really feel the power of AI but with proper techniques
What i have in mind to be part of the demo:
1. Dynamic HTML generation (leverage Claude Live Artifacts with connectors)
2. Prototype generation (leverage Claude Design - from Design System to useful prototype, also using Google Stitch)
3. Superpowers skills (one of the best skills, from preparation to implementation)
4. Google workspace studio, NotebookLM (primary), Google Gems, Gemini (how we can demonstrate Google ecosystem properly)
5. Claude Chat usecase with MCP, Claude Cowork usecase, Routines use case, Claude Code Desktop / CLI usecase (ensure complexity is low, just to ensure people can grab it)
6. For Claude we can show also pre-defined skills like financial tracker (have some dummy sheets with all data, generate financial report from it, along with HTML dashboard), one scenario, touching may tools / capabilities, in short time / one prompt but using certain skill

Again, since i only create 1 materials for all participants, we need to make it as generic as possible for the use cases, so they can relate a lot and can feel the usefulness.

## References

You can dispatch multiple explore / general-purpose agents (use Haiku model) to research further on things i already presented in Nanovest. You can extract materials from it and also the design system / components from provided repo
1. AI Pilot workshop - docs/references/nanovest-pilot-workshop.pdf
2. AI SDLC Foundation - docs/references/nanovest-ai-sdlc-foundation.pdf and repo in /Users/macbook/Projects/_web_presentation/nanovest-ai-foundation-presentation
3. Townhall Presentation (showcase from AI steering committee) - docs/references/nanovest-townhall-aisc.pdf and repo in /Users/macbook/Projects/_web_presentation/nanovest-townhall-presentation
4. HR Group presentation - docs/references/hr-group-presentation.pdf, and repo in /Users/macbook/Projects/_web_presentation/hr-group-agentic-org
5. Claude vs Codex - docs/references/claude-vs-codex.pdf, and repo in /Users/macbook/Projects/_web_presentation/codex-exploration
6. Claude Design Personal Learnings - docs/references/claude-design-learnings.pdf
7. Discussion Summary with Berau PICs in Whatsapp - docs/references/berau-pic-discussion.md
8. Adri's portfolio (the repo is actually for pitching, but my profile mostly there along with projects i did, the projects also some are mentioned in number 3 - townhall presentation) - repo in /Users/macbook/Projects/_web_presentation/toppan-presentation
9. NotebookLM plugin I developed - /Users/macbook/Projects/_nanovest_bitbucket/mcp-notebooklm/plugin/notebooklm
10. nanovest-product plugin I developed - /Users/macbook/Projects/_nanovest_bitbucket/nanovest-confluence/plugin
11. gemini-image-gen MCP I developed - /Users/macbook/Projects/_nanovest_bitbucket/mcp-gemini-multimedia-gen 

I think you can also dispatch agents also to do web research on the topics i raised above, to strengthen the content information.

And for the design itself, you can refer to docs/references/design-references.md (please use your agents also to research on those)

We should define the design system properly first, before building the HTML deck. 
When we build it, we need to discuss the structure first, we will brainstorm further on each sections, where basically we discuss each slide content.
Implementation plans can be more than 1, we can plan either per sections or area of topic.

All the researches you did, please store it all in docs/researches