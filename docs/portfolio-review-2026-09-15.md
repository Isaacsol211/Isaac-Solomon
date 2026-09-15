# Portfolio review — Isaac Solomon

Reviewed 15 September 2026. Audience: freelance clients, future employers, and current colleagues/employer.

## Verdict

**Your work is stronger than the website's presentation of it.** The site shows taste and substantial experience, but it makes visitors work too hard to discover both. It spends too much space announcing craft, then compresses the evidence into small labels and truncated summaries.

My editorial assessment is **6/10 as a portfolio serving all three audiences**. This is a subjective design judgment, not a measured conversion or accessibility score. The visual foundation is around 7/10; the clarity, credibility, and route to hiring need more work.

The highest-value change is to bring the projects forward, tell the truth precisely, and let readers control the pace. Adding more animation will not solve those problems.

## What I reviewed

- Live homepage in light and dark themes at 1280 × 720; homepage, photography, writing index, and SAUT at 390 × 844.
- Desktop services layout, selected-work presentation, photography hero, and Keus case-study opening.
- Mobile menu opening, Escape dismissal, and focus return; writing-index navigation into SAUT.
- Source for the eight articles, content model, shared navigation, motion, services, testimonials, project cards, and photography.
- Representative original image assets: portrait, mountain hero, tents at night, misty forest, valley, Taj Mahal, and ship/ocean.
- `npm run check`: **0 errors, 0 warnings**.
- `npm run build`: **passed**, including Cloudflare adapter output and 11 generated Markdown pages. The first attempt hit a sandbox restriction on the local prerender listener; the permitted rerun succeeded.

This was a visual, content, and source review. It was not a full screen-reader audit, a physical-device browser matrix, or a Lighthouse/real-user performance measurement. Client project metrics are statements on the site, not independently verified results. Reduced-motion findings below are from source inspection.

## 1. Fix credibility first

### Placeholder testimonials are being presented as real quotes — urgent

[content.ts:420](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/content.ts:420) explicitly calls the three testimonials placeholders. Their names are `Full Name`. [Testimonials.svelte:173](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Testimonials.svelte:173) replaces that name with “Collaborator signal,” while preserving the quotation and the named business role. I observed those quotes on the live homepage.

An anonymous label does not make a placeholder testimonial acceptable. A colleague seeing a quote attributed to their role could reasonably ask who said it.

**Fix:** remove these quotations from the published page until they are verified. Either use actual approved wording and attribution, or replace the section with factual project evidence linked to the case studies. Do not turn the same invented praise into anonymous endorsements.

### Reconcile dates, numbers, and attribution

| Issue | Why it matters | Fix |
|---|---|---|
| Hero says 8 years; About and experience say nine | Makes the site look incompletely maintained | Use one source, or “Building for the web since 2017” if that is the intended start date. |
| Three Hats says 40% PM + 30% code + 20% design | Adds to 90%, including in the comparison table | Explain the remaining work or remove the false precision. Do not invent a fourth category. |
| Tomorrow Makers is dated 2026 but refers to Godrej, dated 2024, as “the year before” | Internal chronology conflicts | Use verified years or “the earlier Godrej Foundation project.” |
| Nova Rock compares WordPress concept, Svelte SPA, and SvelteKit production without a sufficiently clear timeline | 549 KB → 248 KB and 4.2 MB → <400 KB look contradictory | Label all three versions, exact route, audit date, device profile, and transferred versus total asset size. |
| “India's biggest,” “largest,” “oldest,” and “fastest-growing” recur | These are strong claims about clients, not evidence of your contribution | Cite a dated source if essential; otherwise use the client's name and category. |

Sources: [Hero.svelte:107](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Hero.svelte:107), [Three Hats:112](/Users/isaac/Documents/Personal.nosync/portfolio/src/routes/writing/saut/three-hats/+page.svelte:112), [Tomorrow Makers:85](/Users/isaac/Documents/Personal.nosync/portfolio/src/routes/writing/tomorrow-makers/+page.svelte:85), [Nova Rock:158](/Users/isaac/Documents/Personal.nosync/portfolio/src/routes/writing/novarock/+page.svelte:158).

For each client project, put **your responsibility, employer/agency, design credit, collaborators, and project status** near the top. Several articles already credit teams later in the text; move that information forward. A live client website may have changed since your involvement. Identify screenshots as the version you worked on.

## 2. The homepage hierarchy needs to change

### The opening wastes its strongest position

“developer.” is visually confident but professionally vague. It could introduce an intern, a backend engineer, or a creative developer. Your useful differentiators—long-term frontend ownership, commerce, CMSs, multilingual products—are relegated to 10px labels and a small paragraph.

At the desktop viewport tested:

| Section | Approximate starting position |
|---|---:|
| Hero | 0 px |
| Manifesto | 736 px |
| About | 2,321 px |
| Services | 3,723 px |
| Selected work | 5,308 px |
| Experience | 9,919 px |
| Writing | 10,866 px |
| Proof/testimonials | 11,750 px |

The homepage is approximately **14,792px tall**. The selected-work section begins more than seven 720px screens down, and its introductory block delays the first project further. These are viewport-specific measurements, not universal page dimensions.

**Fix:** show the first project within the first two screens. Use the hero to establish who you are, what you build, and why the work is relevant. Make “View selected work” the primary action.

### Proposed order

1. **Identity and clear positioning.** Name, frontend focus, short introduction, selected-work CTA, contact link.
2. **Three selected projects.** Strong image, your role, one concrete challenge, one outcome, case-study link.
3. **Experience and collaboration.** Career summary, current role, scope of ownership, résumé and professional links.
4. **Services.** Compact, useful descriptions for freelance clients.
5. **Two writing highlights.** One engineering deep dive and one product/collaboration story.
6. **A small photography selection.** Three images leading to the archive.
7. **Contact.** Separate wording for a project inquiry and a role discussion, both leading to your existing email.

Shorten the manifesto to one sentence inside About, or remove it. There is no need for a 220vh stage to say you value speed, durability, and craft.

### Which projects should lead?

- **SAUT:** strongest proof of sustained ownership, product complexity, RTL work, and engineering judgment.
- **Tomorrow Makers:** recent work and a different audience; make the boundary between your frontend work and the assessment/onboarding systems explicit.
- **Keus or Nova Rock:** Keus demonstrates motion and performance tradeoffs; Nova Rock demonstrates independent delivery and commercial understanding. Nova Rock becomes especially valuable after its evidence and technical explanations are corrected.

Keep Mivi visible as a substantial commerce project, but do not automatically give work ending in 2022 the first position ahead of your most relevant recent work. Four oversized featured blocks also dilute the meaning of “selected.”

### Serve the three audiences through clear paths

| Audience | What they need to see | Best next action |
|---|---|---|
| Freelance client | Relevant project, scope you can own, maintainability, clear communication | Discuss a project |
| Future employer | Technical decisions, individual contribution, collaboration, career progression | Read experience / résumé; discuss a role |
| Current colleagues/employer | Accurate credit, credible numbers, thoughtful account of shared work | Read the case study and see the team represented fairly |

The current footer has GitHub and Instagram, but no résumé or LinkedIn link. Add the real professional profile and a concise résumé once their contents and URLs are confirmed. Do not invent a URL or inflate your title to “Senior” just for positioning.

## 3. Visual design: retain the foundation, improve the hierarchy

### Keep

- The restrained palette, consistent spacing vocabulary, and strong type contrast.
- Space Grotesk and Instrument Serif can remain; a font replacement is not a prerequisite for quality.
- The genuine portrait. It is warm, clear, and appropriate for all three audiences.
- Real work imagery, intentional light/dark themes, and the quieter article layout.
- A small amount of responsive motion where it clarifies an interaction.

### Change

**Too much decorative labeling.** The repeated asterisk, “chapter,” “module,” “act,” index numbers, tracked labels, and enormous ordinals compete with the content. The page feels heavily art-directed but not yet specific enough to Isaac. Keep one recognizable visual signature; remove the redundant systems.

**Too large a jump between headline and evidence.** A 200px generic heading next to 10px proof labels sends the wrong priority. Use approximately 52–80px for a meaningful desktop hero heading, 36–48px on mobile, 17–18px body text, and 12–14px readable metadata. These are proposed starting values, to be adjusted against real content and viewport tests.

**Essential text is too faint.** The orange `#e8490f` on paper `#f1efea` calculates to about **3.39:1**, and on `#e9e6dd` about **3.12:1**. It is used for small links and labels. Normal text requires 4.5:1 under WCAG AA. Keep a vivid decorative accent but create a darker text/link token for light surfaces. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

**Services are overcrowded and overengineered.** At 1280 × 720, a 720px stage contains rows totalling roughly 1,275px. The flex centering and clipping cut off content; the screenshot after using the Services anchor had the first row above the visible section boundary. The duplicate animated card adds another competing reading path. Replace this with a normal flowing list or a compact grid. If one element stays sticky, the rest must remain naturally scrollable.

**Project crops hide the work.** The Mivi preview magnifies a marketing image and cuts off parts of the interface. Cropped screenshots plus image drift can showcase a client's photography more strongly than your implementation. Use one accurate overall screen and one close-up of the interface you built. Preserve navigation, key controls, and useful context. Stop moving screenshots while someone is trying to inspect them.

**Descriptions are truncated before they finish making the case.** [Projects.svelte:299](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Projects.svelte:299) applies `line-clamp-3` to long paragraphs. Write deliberate 25–40 word card summaries with role and result; keep the longer description in the case study.

### A compact design direction

Use the existing paper/ink palette as the base. Keep `#f1efea` for background, `#181613` for main text, `#6e6a60` for secondary text, and `#dcd8cc` for separators. Retain `#e8490f` for non-text accents; test a darker orange such as `#b5320a` for small text on light backgrounds. Treat this as a proposed token, not a shipped change.

Make the work itself the distinctive visual element: large, readable interfaces; precise captions; occasional photography. Keep content left-aligned. Avoid a new elaborate visual system on every section.

```text
Isaac Solomon          Work   Experience   Writing   Photography   Contact

Frontend development for products built to last.
One short paragraph establishing scope and experience.
[View selected work]    [Get in touch]

[SAUT interface]        [Tomorrow Makers interface]
Role / challenge       Role / challenge
Outcome / case study   Outcome / case study

[One further selected project, followed by a compact archive]

Experience → Services → Writing → Three photographs → Contact
```

## 4. Writing: make it sound like an experienced collaborator

Your best material explains a real decision: copied versus linked curriculum data, the tradeoff between frames and video, preserving CMS content through a rebrand, or mapping a worksheet editor to printed output.

The weakest material repeatedly announces that the work was hard. “It worked until it didn't,” 3 AM calls, impossible deadlines, emergency roles, and variants of “not X, not Y” recur across the site. After several articles, the rhythm feels manufactured and the professional story starts to suggest permanent crisis management.

### Specific copy changes

| Current approach | Better direction |
|---|---|
| “Usually that the brief was wrong.” | “The strongest solutions came from testing the brief against real users and technical constraints.” |
| “Code that ships on Tuesday and still works on Friday.” | “I build interfaces that teams can maintain and extend after launch.” |
| “Emergency UI designer” | “Extended the established design system for new product workflows.” |
| “The impossible deadline” / recurring 3 AM stories | Explain prioritization, risk reduction, collaboration, and what changed in the process. |
| “Smoke lanes,” “finding dedupe,” “governed delivery” | Use “automated checks across web, iOS, and Android” in the introduction; explain specialist terminology in the technical article. |
| “Some of the best work ... for an audience of zero” | “Unreleased campaign concept,” followed by screenshots and your contribution. |

Retain a little humor. Remove jokes that weaken reliability or characterize clients and designers as obstacles. The original About line is particularly poorly suited to being read by people who supplied those briefs.

### Suggested homepage copy

**Heading:** Frontend development for products built to last.

**Introduction:** I'm Isaac Solomon, a frontend developer at Able.do. I build commerce sites, content systems, and multilingual products—from complex interfaces to the details that make them reliable in everyday use.

**Primary action:** View selected work

**Secondary action:** Get in touch

**About:** Since 2017, I've worked on client products spanning commerce, education, and publishing. My work includes frontend implementation, reusable component systems, and close collaboration with design and backend teams. Recent projects have also involved product planning and QA automation. Outside work, I photograph mountains, streets, and quiet places.

**Contact:** Have a project in mind, or a role you'd like to discuss? Email me with the scope, team, and timing.

Alternative headings:

- **I build the interfaces teams rely on.** More personal; needs the specific scope directly underneath.
- **Commerce, content, and complex interfaces.** More specific; less expressive, but easy for a client to understand.

Suggested page title: **Isaac Solomon — Frontend Developer**. Keep photography discoverable through the page content and its own page title. Suggested description: **Frontend developer at Able.do building commerce sites, content systems, and multilingual products. Selected projects, technical writing, and photography.**

These drafts use existing site facts. Confirm dates and responsibilities before publishing.

## 5. Article-by-article editorial review

| Article | Keep | Fix next |
|---|---|---|
| **SAUT** | Specific domain model, migration reasoning, clear account of the team | Add a 30-second summary of your role; shorten repetition of the 65-feature claim; move credits upward. Replace speculation about why the contract changed hands with a factual handoff summary. |
| **Three Hats** | Product prioritization examples and using an existing design system | Correct the 90% total; reduce repeated “I built every screen” claims; show one actual prioritization decision and its consequence. Clarify PM responsibilities without implying an official title change. |
| **Worksheet Builder** | Best candidate for a technical deep dive: a tangible problem with real constraints | Add a coordinate-system or print pipeline diagram, a focused code example, and a screen-to-print comparison. Clarify CSS pixels versus device pixels rather than attributing layout directly to device DPI. |
| **Mivi** | Sustained ownership, commerce flows, CMS evolution | Distinguish peak days of 3–4 launches from a sustained daily rate. Separate client/platform scale from your personal contribution. Annotate a real CMS component or cart state. |
| **Keus** | Genuine tradeoff, comparison tables, acknowledging improvements still needed | Cut most of the 3 AM narrative. Link the original dated audit and describe its test profile. A 3.2s LCP is not in the “good” ≤2.5s category; desktop TBT of zero does not prove universally nonblocking runtime behavior. Show a short controlled demo. |
| **Godrej** | Strong before/after story and reusable content architecture | Resolve “CMS rebuilt twice” language elsewhere against this article's claim that the CMS survived unchanged. State which layers you built. Replace unsupported “oldest” claims. |
| **Tomorrow Makers** | Recent work, concrete audience, pathway and language constraints | Much of the article describes the client's mission. Add your specific implementation decisions, responsibility boundaries, integration behavior, and actual result. Correct the year reference. |
| **Nova Rock** | Commercial framing, independent delivery, technical specificity | Label the three site versions clearly, attach measurement evidence, correct the empty-srcset explanation, and remove the outdated FAQ rich-result promise. |

### Two technical corrections in Nova Rock

1. **An empty `<source srcset="">` does not reliably suppress the fallback image.** The article says browsers stop at that matching source. The HTML image selection algorithm skips a source whose parsed source set has zero images, then continues. Correct the explanation and verify the actual implementation's mobile network behavior. [HTML source-set selection](https://html.spec.whatwg.org/multipage/images.html#updating-the-source-set). Location: [Nova Rock:468](/Users/isaac/Documents/Personal.nosync/portfolio/src/routes/writing/novarock/+page.svelte:468).
2. **An FAQ should not be promised Google FAQ rich results.** Google's current changelog says that feature stopped appearing on May 7, 2026. FAQs can still help readers; that is sufficient reason to include them. [Google Search documentation updates](https://developers.google.com/search/updates). Location: [Nova Rock:572](/Users/isaac/Documents/Personal.nosync/portfolio/src/routes/writing/novarock/+page.svelte:572).

### Better case-study structure

Start with **Problem / My role / Team / Decision / Outcome / Dates**. Follow with three decision sections, each containing a relevant image or diagram and the tradeoff. End with a concrete lesson and a contact link.

Add heading anchors and a small contents list for long articles. Keep the readable prose layout. Put the first useful interface image sooner; the current mobile SAUT opening spends almost its entire first screen on introduction and summary. Keep a route to all writing and a clear contact action on article pages.

Record the date, URL, device profile, tooling version, and measurement scope for performance claims. Keep original reports alongside the article when possible. Clearly label historical lab results; do not present them as current field performance.

## 6. Photography and imagery

### The photographs deserve a quieter presentation

The misty forest image has a clear visual rhythm and atmosphere. The orange tents against a cold night scene have a strong color relationship. These are more distinctive than another large statement about being a photographer.

The Taj Mahal frame is competent but more familiar; I would give it a supporting position. The valley photograph has appealing light but a busy foreground. Curate the sequence around what each photograph contributes instead of giving every image equal presentation weight. These are judgments from the inspected sample, not a definitive ranking of all 20 frames.

**Keep the portrait:** the expression and natural background already work. It does not need an AI replacement or stylized treatment to look professional.

### Fix the photography page

- **Clipped title:** at 390px, the heading has roughly 435px of content inside a 350px box. The page clips the final letters. Reduce its minimum font size or use a shorter heading such as “Photographs.” [Photography:172](/Users/isaac/Documents/Personal.nosync/portfolio/src/routes/photography/+page.svelte:172).
- **Unreadable navigation over the hero:** light-theme dark text sits on a dark photo. Give the header a deliberate inverse tone over imagery or an opaque background.
- **Too much of the photograph is darkened and covered:** the hero's overlay and giant title subordinate the image to typography. Use a smaller caption and allow the image to retain its natural contrast.
- **Too many forced crops:** most gallery images are placed into fixed-height `object-cover` containers. Let an overview grid preserve image proportions; use intentional focal points for the few designed crops.
- **No full-image viewing control:** provide a keyboard-accessible lightbox with close, previous, next, and captions. Use real buttons and restore focus to the opening thumbnail.
- **Implementation jargon is visible:** replace “act 01 / pinned strip,” “act 03 / full bleed,” and “act 04 / mosaic” with place, subject, or series names.
- **Organization is inconsistent:** the first mountain-themed strip includes Qutub architecture. Curate actual series: Mountains, Night, Places, for example.
- **Logo navigation:** the shared name link points to `#top`, so on photography it returns to the top of photography rather than the portfolio. Make the name link `/`; keep a separate “Back to top” control. [Nav.svelte:108](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Nav.svelte:108).

[Mobile photography screenshot](/Users/isaac/Documents/Personal.nosync/portfolio/docs/portfolio-review-assets/photography-mobile.png) · [Mobile case-study screenshot](/Users/isaac/Documents/Personal.nosync/portfolio/docs/portfolio-review-assets/case-study-mobile.png)

For project imagery, show evidence of your work: a cart state, CMS editor, RTL/LTR comparison, worksheet output, responsive behavior, or before/after layout. Use real interfaces and captions. Decorative mockups alone do not explain engineering quality.

## 7. Technical and accessibility repair list

These are targeted implementation findings, not a claim of full WCAG conformance testing.

| Priority | Location | Finding and concrete fix |
|---|---|---|
| High | [Services.svelte:99](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Services.svelte:99) | Viewport-height stage is shorter than its content. Remove the pinned whole-list layout; allow natural page flow. |
| High | [Services.svelte:24](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Services.svelte:24) | Reduced-motion branch sets all absolutely stacked cards to opacity 1. They overlap. Use a static list and hide the duplicate decorative stage. Source-confirmed. |
| High | [Photography:205](/Users/isaac/Documents/Personal.nosync/portfolio/src/routes/photography/+page.svelte:205) | Reduced-motion disables the horizontal animation, but desktop CSS still changes the inner scroller to `overflow-visible` under an outer clipped section. Provide a real static grid or horizontal scrolling fallback. Source-confirmed. |
| High | [app.css:27](/Users/isaac/Documents/Personal.nosync/portfolio/src/app.css:27) | Shared orange accent fails normal-text contrast on light surfaces. Split decorative accent and accessible text/link tokens. |
| Medium | [Testimonials.svelte:159](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Testimonials.svelte:159) | Desktop later quotes have CSS opacity 0 and animation returns early for reduced motion. Removing placeholders resolves the immediate need; any future real quotes need a readable static fallback. |
| Medium | [Projects.svelte:193](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Projects.svelte:193) | Cursor-follow animation schedules frames continuously, including when no preview is active. Start it only while needed or replace it with stable thumbnails. |
| Medium | [Projects.svelte:285](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Projects.svelte:285) | Featured previews have no responsive source set. Add appropriately sized assets. Their aspect-ratio wrapper already reserves space, so missing dimensions alone is not proof of observed layout shift. |
| Medium | [content.ts:243](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/content.ts:243) | AAP's “Visit” action resolves to a general GitHub profile. Give the unreleased project a case study/archive with the correct status. |
| Medium | [Nav.svelte:63](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/Nav.svelte:63) | Review the mobile focus model: the theme control is visually present but excluded from the menu trap. Background links remain exposed in the DOM. Use a consistent dialog/menu model and test focus order and screen-reader navigation. Escape and focus return worked in the tested path. |
| Medium | [About.svelte:89](/Users/isaac/Documents/Personal.nosync/portfolio/src/lib/components/About.svelte:89) | About uses paragraph styling for its main statement; Writing also relies on a visual label above h3 entries. Add meaningful section h2 headings so heading navigation matches the visual hierarchy. |

The code already includes useful foundations: skip navigation, visible focus styling, theme-aware colors, image descriptions, reduced-motion handling in several places, self-hosted fonts, and prerendering. Preserve those and complete their edge cases.

## 8. Technology worth adding or improving

The existing Svelte 5/SvelteKit/Tailwind/Cloudflare stack is capable of delivering the proposed design. Keep it. A framework migration would spend time without addressing the review findings.

### Highest value

1. **A shared responsive-image component.** Correct `srcset`/`sizes`, explicit dimensions, focal points, modern formats where they offer measured savings, and sensible loading priorities. Photography already has two source sizes; extend that discipline to work previews.
2. **Real-user performance monitoring.** Measure mobile and desktop separately. Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile. These are targets, not this portfolio's measured scores. [Web Vitals guidance](https://web.dev/articles/vitals).
3. **A few browser regression checks.** Test 390px photography title fit, mobile menu navigation, reduced-motion gallery access, project links, and the two main contact paths. Include keyboard and zoom checks; automated accessibility checks are supplementary.
4. **Structured case-study metadata.** One record for role, dates, collaborators, status, evidence links, and summary. Render it consistently on cards, articles, résumé, and the machine-readable endpoints.
5. **Accessible image viewer and article navigation.** These make the existing content easier to inspect and share.

### Useful after the above

- Keep existing View Transitions brief and optional. Use native CSS scroll animations for simple decorative effects only when supported, with readable fallbacks. They do not justify scroll-gating content. [MDN scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations).
- Use selected project demos to show motion expertise. Prefer user-controlled video with a useful poster and loading strategy. The largest local demo is about 8.5 MiB; that is an asset size, not evidence that all of it loads at initial render. Existing `preload="metadata"` and controls are sensible.
- Add valid Person/ProfilePage and Article metadata where appropriate, based on visible, verified content. Do not promise a particular rich result or ranking.
- An RSS feed would make recurring writing easier to follow. Search is optional for an archive of eight pieces.
- Keep the MCP/Markdown features as evidence of technical curiosity. Explain their architecture in a short engineering note and give them a secondary footer link. They should not compete with the contact action. Google explicitly says `llms.txt` does not affect Google Search visibility/rankings. [Google's June 2026 clarification](https://developers.google.com/search/updates).

I would not prioritize a chatbot, WebGL hero, sound effects, additional scroll pinning, or a new animation dependency for this portfolio. Each feature should earn its place by helping someone assess or contact you.

## 9. Delivery order and acceptance criteria

### Pass 1 — credibility and visible defects

- Remove placeholder endorsements.
- Reconcile dates, figures, and credits.
- Correct the two Nova Rock explanations.
- Fix mobile photography typography and hero navigation contrast.
- Fix services clipping and reduced-motion fallbacks.
- Replace AAP's misleading destination.

**Done when:** no placeholder endorsements appear on public or generated surfaces; all key facts agree; the heading fits at 320, 390, and 768px; services and all photos remain accessible with reduced motion; navigation labels lead to the expected places.

### Pass 2 — structure and copy

- Replace the generic hero with specific positioning.
- Move work above the long biography and services.
- Feature three projects and compress the remainder into a useful archive.
- Shorten About and provide clear project and employment contact wording.
- Add a résumé and professional-profile link using verified information.

**Done when:** a new visitor can identify your role, name two relevant projects, and find contact information without reading the entire page. The first project appears within two ordinary screens.

### Pass 3 — evidence and art direction

- Give each selected project one clear outcome and visible team credit.
- Replace arbitrary crops with purposeful interface imagery.
- Edit SAUT and one complementary case study thoroughly before polishing every article.
- Curate the photography archive, preserve composition, and add full-image viewing.
- Reduce decorative labels and motion competing with text.

**Done when:** each image explains something, each case-study number has context, and every long article supports both scanning and deeper reading.

### Pass 4 — verification

- Repeat build and Svelte checks after implementation.
- Run the focused browser checks above plus light/dark, keyboard, zoom, and reduced-motion checks.
- Establish measured lab baselines and real-user monitoring before claiming speed improvements.

## Installed skills

- [Frontend Design](/Users/isaac/.codex/skills/frontend-design/SKILL.md), from [Anthropic's skills repository](https://github.com/anthropics/skills/tree/main/skills/frontend-design).
- [Web Design Guidelines](/Users/isaac/.codex/skills/web-design-guidelines/SKILL.md), from [Vercel's agent skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines).
- [Copywriting](/Users/isaac/.codex/skills/copywriting/SKILL.md), from [Marketing Skills](https://github.com/coreyhaines31/marketingskills/tree/main/skills/copywriting).

The existing Browser skill handled live inspection. The new skills are installed for automatic availability on the next turn; their guidance was read and used for this review.

**Deliverable status:** this report and two evidence screenshots were added to the workspace. Site implementation and published content were not changed.
