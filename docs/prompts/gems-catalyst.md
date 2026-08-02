# GEMS (Golden Energy Mines) AI Catalyst Workshop

Program Brief: `docs/references/202607-ai-catalyst-gems-brief.pdf`
Final Event Data: Aug 2026 - 6-7, 12-13 (Middle Management); 19-20 (Leader)

## Current Conditions

GEMS have dedicated "tech" team with name DigiTech, which already implement some AI / automation solutions:
1. Databricks -> data aggregation layer, collect all company data/docs inside here - hyperlocalized, with embedded AI chatbot
Source: https://www.databricks.com/
2. GEMVIS -> AI Platform (Omni channel to whatsapp, slack, etc), currently embedded to some internal applications as AI chatbot, with goal later for agentic AI (on the future plan). Connect also to Databricks.
Source: https://www.goldenenergymines.org/2025/07/22/digitech-article4/, https://cloud.google.com/customers/gems 
3. MirraX -> Computer vision based system (mining field monitoring and analysis tools)
4. SiCantik -> computer vision based system to detect mining vehicle operational violation also measuring Weighing in Motion (WIM) to automate coal truck weighing to reduce queues, emissions, and accident risks.
Source: https://tambang.co.id/golden-energy-mines-gems-akselerasi-digitalisasi-untuk-tambang-yang-lebih-efisien/
5. Fleet management system (FAMOUS) -> computer vision & IoT based system to monitor mining vehicles & driver behaviors (safety / violation / fatique awareness)
6. Usign - document approver system, with AI chatbot embedded to ask on the docs related content

Other sources:
https://www.goldenenergymines.com/id/beranda/home-digitech-id/
https://www.goldenenergymines.com/id/digitech-id/

Digitech also already have Claude subscription plan (but not all) for their members.
But, the problem is, outside Digitech (other Depts), AI adoption is not really adopted well (big gap), even some Digitech member also still falling behind.

## Goal of AI Catalyst Workshop

The goal of AI Catalyst workshop (me as the solo facilitator) is to bridge and minimize the gap also as preparation for all members to join an internal competition. The selected ones will be participated into AI Forge (which will be conducted by Digitech)
From Digitech, several suggestions given to me for my material:
1. Building AI Culture - not only focusing on "How to use AI"
2. AI Usage Focus: improve productivity - automate repetitive tasks
3. Ensure participants understand "how to use AI PROPERLY" - not only for chat purpose
4. They can build AI solution by themselves, resolve their biggest problem in work, and Digitech will become "stewardess" for them. May also give "catalog" on what already build and can be integrated to their own solution (no need to reinvent the wheel)

## HTML slides material adjustment
1. We have 2 domains now hosted on vercel, bc-presentation.vercel.app (for Berau) and ai-catalyst-workshop.vercel.app (for general). We may change some existing content based on GEMS, but almost retain for all
2. For GEMS, later we will have 2 additional domains (gems-middle-mgmt-ai-workshop.vercel.app and gems-leader-ai-workshop.vercel.app), also adjust for the local variants (it is ok as parameters)
3. For middle management, will almost the same with bc-presentation, the main differences on: login page (berau to gems), faveicon (assets/gems-logo.svg), slide a1, slide k2 (point 2 need to be changed, since only 1 track - 1 practice lab for all; main folder on https://drive.google.com/drive/folders/1AIUJsU8usuj8TEIYN8yObN0iQDJ-v4FY?usp=drive_link, runbook on https://docs.google.com/document/d/1piHjL5Vm25mj3Nvv-_bN5u3cG3vPX1z3/edit?usp=drive_link&ouid=116244859207376267810&rtpof=true&sd=true, starter-pack on https://drive.google.com/drive/folders/11aqVeWEXWqdwLu6FI3DYu2U6zv0apNeR?usp=drive_link)
4. For leader, we may need to adjust a lot, beside number 3 changes, we should reduce on technical contents (or leave it first), but we must add section about "Agentic Organization" - how they can drive the org properly on AI implementation, based on `docs/references/hr-group-presentation.pdf` (my previous presentation to the parent group Human Resources members). More research on it has been done on separate repo: `/Users/macbook/Projects/_web_presentation/hr-group-agentic-org`. Define where to add it (as separate section or not), how many slides (and steps).
5. And for all (including bc-presentation and ai-catalyst-workshop): slide B4 (already obsolete), need to update the model & scoring based on `docs/references/artificialanalysis/` data (for cost details, we can use playwright-cli CLI to get the raw point data - use hover / inspect element value from https://artificialanalysis.ai/?intelligence=agentic-index&cost=intelligence-vs-cost-per-task&total-cost=intelligence-vs-total-cost#total-cost-tabs)
6. Consider to add "Loop Engineering" above "Harness Engineering" in section E, research first thoroughly before deciding (for all also).
7. For all also, slide E9 (context distraction), improve the motion-animation which contains both of multi-turn token exponential growth (prompt1 -> response1 -> both included along prompt2 -> response2 -> and so on), while on the right side showing the the performance degradation chart "in-sync" with the compounding.
8. For all also, slide I1 is step 0 and 1 is too blank, use similar particle motion animation as in /Users/macbook/Projects/_web_presentation/hr-group-agentic-org/web but follow the current color tone / design system.

## Feedback from Event Committee for the Leadership Deck

1. Clear objective & shape first of Agentic Organization; what it is, how is the ideal agentic org, how they can reach it?
2. Must answer most of leadership concerns: investment perspective (ROI) and security perspective. WHy it is worth to invest in AI?
3. Current conditions: no clear guidance & SOP (not limited to Culture, Risk, Governance, Ethics)
4. Specifically on AI Tools subscription mechanism, mostly still individual (not company-managed) -> for claude better use team plan.
5. Explain what are the best way to use AI tools (i.e. combine Claude - as orchestrator and chatGPT - as worker).
6. Tips to keep it efficient (use sharing account - with risk of getting banned especially on claude, while in chatGPT seems to be not strict)
