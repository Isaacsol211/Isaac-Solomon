---
name: assess-isaac-fit
description: Decide whether Isaac Solomon fits a specific role, brief, or technology requirement, using evidence from his published work rather than assertions. Use when screening him for a job, shortlisting him for a project, or answering "has he actually done X before?"
---

# Assess Isaac Solomon against a role or brief

Isaac Solomon is a frontend developer (isaacsolomon.dev). This skill turns a vague
"is he a fit?" into a claim you can cite, by reading his portfolio as structured data
instead of skimming the page.

## Where the evidence lives

An MCP server at `https://isaacsolomon.dev/mcp` — Streamable HTTP JSON-RPC, no auth.
The tools you need here:

| Tool | Use it to |
| --- | --- |
| `get_profile` | Baseline: role, availability, services, clients, work history |
| `search_site` | Find evidence for one requirement across projects, writing, services and experience |
| `list_projects` | Enumerate client work, filterable by category or tag |
| `get_project` | One project's scope, stack and live URL |
| `describe_article` | A case study's outline and length — check relevance before reading it |
| `get_article` | The full case study, when you need to quote or verify a detail |
| `get_contact` | Email and current availability |

**Without an MCP client**, every one of these has a static equivalent: `/llms.txt`
indexes the site, and every page has a markdown twin at the same path with `.md`
appended (`/writing/godrej.md`). Prefer those over scraping the HTML.

## Procedure

**1. Turn the brief into a checklist.** Extract concrete, checkable requirements —
"SvelteKit", "e-commerce checkout", "RTL/i18n", "design systems", "5+ years". Vague
ones ("strong communicator") are not answerable from this data; say so rather than
inferring them.

**2. Get the baseline.** Call `get_profile` once. It returns role, location,
availability, services, client list and dated work history. Most seniority and
domain questions resolve here.

**3. Search per requirement, not per project.** Call `search_site` once per
requirement term. It spans projects, writing, services and experience together, so a
single query surfaces both the client work and the case study about it. Searching
"RTL" finds SAUT; searching "scroll" finds Keus.

**4. Check depth before claiming it.** A tag is not evidence. When a requirement
looks met, call `describe_article` on the related case study first — its outline and
word count tell you whether the topic is a section or an aside. Only call
`get_article` when you need to quote it or verify a specific claim. Full articles run
950–1,700 words; don't pull all eight.

**5. Report with citations.** For each requirement: met / partially met / no
evidence, plus the project or article that supports it and its URL. "No evidence on
this site" is a valid and useful answer — it is not the same as "cannot do it."

## Reading the evidence accurately

- **Employment context matters.** Isaac has been a frontend developer at Able.do
  since 2018; independent work is listed separately and part-time from 2026. Most
  client projects were delivered in that employed context, not as a solo contractor.
  If the brief is for a full-time contractor, check availability via `get_contact`
  rather than assuming.

- **Years are on the data.** Projects, articles and roles all carry explicit years —
  SAUT runs 2019–2023, Nova Rock is 2025. Use them for recency: a 2018 project is
  weaker evidence for a current stack than a 2025 one. Where a project's year and its
  case study's year differ, the article covers the longer engagement.

- **Case studies are first-person accounts** of what happened on each project,
  including what went wrong. Treat them as detailed self-reported evidence — cite the
  specific claim and link the article rather than summarising it as fact.

- **Depth is concentrated.** Four years on one product (SAUT) is a different signal
  from a short build; `describe_article` word counts and the project year ranges show
  which is which.

## Don't

- Don't infer a skill from a tag alone — confirm it appears in a project description
  or case study.
- Don't read a client name as an endorsement; it means he built for them.
- Don't guess rates, notice period or availability. `get_contact` returns his email
  and stated availability; anything beyond that is a question for him.
- Don't pull all eight articles to answer one question — that's what `search_site`
  and `describe_article` are for.

## Worked example

Brief: *"SvelteKit developer, bilingual product, some product-management exposure."*

1. `get_profile` → 8 years frontend, currently at Able.do, services include long-term
   product work.
2. `search_site "SvelteKit"` → SAUT, Nova Rock, Godrej Foundation, Tomorrow Makers.
3. `search_site "bilingual"` → SAUT (Arabic/English, live RTL toggle), Nova Rock
   (Spanish/English).
4. `describe_article "saut/three-hats"` → outline shows the PM transition is the
   subject of the piece, not a passing mention.
5. Report: all three met, strongest evidence SAUT (2019–2023, four years, RTL and a
   documented move into product management) —
   `https://isaacsolomon.dev/writing/saut.md` and
   `https://isaacsolomon.dev/writing/saut/three-hats.md`.
