# Independent design review — 17 September 2026

## Implementation follow-up — completed 17 September 2026

The findings and ratings below record the pre-fix review. The following changes resolve its actionable recommendations with the existing material:

| Finding | Resolution |
| --- | --- |
| Mobile Services length | Smaller 123px illustrations beside the service titles, three deliverables per service, less introductory spacing. At 390 × 844 the section is approximately 2,706px, down from 3,663px (about 26%). The desktop split starts at 1024px so tablet summaries remain readable. |
| Services evidence | Direct links to Mivi, Godrej, Keus and SAUT. QA links to the existing Able.do experience entry: there is no published QA case study to link, correcting the assumption in the review. |
| Viewer sequence | The eight-photo selected edit plays in display order. Archive entries open their own labeled series; the opening mountain uses Mountains, and the sea feature uses Places. Zoom, keyboard controls and focus restoration are preserved. |
| Mivi mobile crop | Complete screenshot proportions on phones, with intrinsic dimensions reserving its space. The wide desktop stage remains. |
| Photography navigation | Sticky Selected / Night / Sea / Collection links with an active-section marker; archive category links now live in the collection. Section anchors clear both navigation bars. |
| Repeated copy | Godrej's decision describes the content model; the outcome alone states the rebrand result. Tomorrow Makers reserves the precise language/cohort fact for its outcome. Team credits remain. |
| Photography refinement | Seven-column fog / four-column road pairing, smaller responsive offset, compact selected introduction, centered summit photograph without the redundant aside, and a tighter sea spread with a smaller title. All twenty photographs remain available. |

Two further defects found during final checks were corrected: Services' large entrance displacement could leave its first row hidden on a direct anchor visit, so it now uses a 20px rise; the desktop navigation's current-section observer now uses viewport-height-based pixel margins and reconnects on resize. Proof links also force their row visible when reached by keyboard.

Final verification: Svelte checks and production build passed, as did `git diff --check`. Homepage and photography geometry was checked at 360, 390, 768, 1024 and 1440px in both themes: no horizontal document overflow, clipped header controls or remaining Services row overflow in the final inspected layouts. Desktop/mobile screenshots were inspected. The eight-photo sequence, archive sequence, Zoom/Fit reset, Escape, viewer Tab wrapping, restored thumbnail focus, menu focus wrapping and section anchors were exercised. No captured console errors in the final isolated preview. Services' desktop active navigation was verified after its observer fix.

Photography now measures approximately 8,362px at 1440 × 900 and 7,515px at 390 × 844. The emphasis was better composition and navigation, not removing photographs. The reduced-motion/no-JavaScript paths remain supported in source and server-rendered markup; OS-level reduced-motion, disabled-JavaScript browser sessions and physical touch/pinch were not rerun. No new performance-harness or 72-case-matrix claim is made.

Second opinion on the local working tree after the photography redesign and featured-copy edits. Reviewed as a senior design consultant for three audiences: freelance clients, hiring managers and existing colleagues/employers. Scores are subjective judgments of presentation, not measured conversion rates.

## Verdict

Keep the direction. It now looks like a credible senior developer's portfolio, with a stronger photographic identity. The remaining weakness is uneven editing: some passages are carefully composed, while others spend too much screen space on secondary material. More animation alone will not resolve that.

| Area | Rating | Reason |
| --- | --- | --- |
| Overall presentation | 7.5/10 | Confident opening and credible work; inconsistent pacing and proof hierarchy. |
| Homepage opening | 8/10 | Occupation, positioning and first project now form one composition. |
| Featured project storytelling | 7.5/10 | Context and role are clearer, but meeting a word count did not eliminate all repeated ideas. |
| Services | 6.5/10 | Readable on desktop; disproportionately long on phones and disconnected from its strongest evidence. |
| Photography | 7.5/10 | Strong opening, fog and night passages. Navigation and viewer sequencing undermine the curated presentation. |

I would take a project conversation with this developer. As a hiring manager, I would still need the case studies to establish depth and ownership. For existing colleagues, the retained design/team credits and current-role explanation help; keep those explicit.

## Prioritized findings

### P2 — Mobile Services consumes too much of the visit

At 390 × 844, Services measures approximately 3,663px, or 4.3 viewport heights. Each of the five illustrations is 350 × 250px. The illustrations alone account for 1,250px, before spacing and copy. The first service title appears beneath its drawing, so the visual explanation arrives before the visitor knows what it describes.

Source: `src/lib/components/Services.svelte:124–171`, especially the repeated compact diagram at line 127.

Keep the desktop sticky illustration. On phones, put each service title first and reduce its drawing to an approximately 120–140px-high supporting illustration. Retain the service summary, reduce the deliverable list to the most useful two or three items, and add one relevant case-study link. Aim to recover roughly one viewport of space while retaining the drawings' personality. Do not solve this with another pinned sequence.

The previous report says stronger Services proof needs new material. That is too pessimistic: Mivi, Godrej, SAUT and the existing motion/QA writing can already provide direct evidence. Map each service to an existing, relevant case study and use its actual result as the link label. Confirm the motion/QA article destination before wiring it.

### P2 — Photography's viewer does not follow the edit on the page

The selected night sequence is Starlight → Base Camp → Platform 2. Opening Base Camp in that selection and pressing Next displays After Hours, a photograph absent from the selected edit. Opening Into the Fog starts at “9 / 20,” even though it is the edit's first photograph. This is a real interaction mismatch, not a question of taste.

Source: `src/routes/photography/+page.svelte:14–24` and `:153`. Every entry point uses the same archive-ordered collection.

Pass the eight selected photographs, in their displayed order, to the viewer when opening from the edit. Archive entry points should use their archive/series order, clearly identified in the viewer. Decide explicitly how the separate mountain opener and sea feature join those collections. Preserve focus restoration, Zoom/Fit, keyboard navigation and reduced-motion behavior.

### P2 — The first project image has an unfinished crop on phones

At 390px the Mivi preview cuts through the embedded “Immerse In Studio Quality Sound” headline and the product label. The desktop image remains attractive, but this mobile crop looks accidental because the cut passes through interface copy.

Source: `src/lib/components/Projects.svelte:320–335`: a wide desktop screenshot is put in a 16:10 mobile frame with `object-cover`.

With the existing asset, preserve its full screenshot ratio on small screens and let the following Mivi name/proof carry the scale. If that becomes too small, use a deliberate image-only detail crop whose edges avoid partial interface text, accompanied by the complete screenshot in the case study. Do not invent a mobile UI or present a reconstructed interface as a real screenshot.

### P2 — Photography's navigation promises series, but bypasses its best presentation

“After Dark” in the top series navigation lands at the small archive grid, skipping the large night spread. That is defensible for an archive index, but the navigation does not explain the distinction. The visitor has to infer two overlapping systems: the curated edit and three archive categories.

Source: `src/routes/photography/+page.svelte:77–84`, `:106`, `:140–148`.

Separate the choices clearly: a compact navigation for Selected / Night / Sea / Collection, then Mountains / After Dark / Places inside the collection. Give the night and sea sections real anchor targets. If the existing top links are retained, label their group “Browse the archive.” An active section cue can make movement through the page feel intentional without moving the photographs themselves.

### P2 — Project copy is shorter but still repeats the conclusion

The new context → role → decision → outcome order is correct. The Godrej decision still explains that the rebrand became a frontend rebuild without a data migration; the immediately following outcome says essentially the same thing. Tomorrow Makers repeats eleven-language support between its role and outcome. The previous report's “resolved” assessment should therefore be read as partially resolved.

Source: `src/lib/content.ts:291–294` and `:448–451`.

For Godrej, keep the decision about modelling content independently of presentation, then reserve the rebrand/no-migration fact for the outcome. For Tomorrow Makers, keep the role about frontend implementation and integrations, and reserve the precise language/cohort fact for the delivered result. Do not add filler to preserve the 60–85-word band. It is an editing guide, not a quota.

The italic outcome treatment works for short statements but becomes tiring on multi-line sentences. Shorten the result before changing the visual style. Preserve factual scope and team/design credits.

### P3 — Photography has atmosphere, but its hierarchy can be more selective

The mountain opening, large fog image and panoramic night image are the strongest moments. Keep all three. The Forest Road image is only about 296px wide beside an approximately 843px fog image at 1440px: it reads as a small supporting insert. That may be intentional, but it is a substantial demotion of the photograph.

Source: `src/routes/photography/+page.svelte:177–185`.

Try a seven-column fog / four-column road pairing with one column of air, then judge the photographs together. Reduce the road's fixed 180px offset to a responsive 80–120px range if the pairing still feels disconnected. Do not equalize every frame; the scale difference is useful.

“A few things worth stopping for” consumes another large headline immediately after the full-screen opening. A smaller “Selected photographs” introduction would bring the first image forward and give the actual photographs more authority. The summit's aside repeats what the picture already says and is optional; it need not occupy a full narrative column.

The sea spread is a reasonable quiet ending. Its typography currently gives a relatively simple photograph the same importance as the strongest images. Keep the full composition and blue surface, but test reducing the title slightly and pulling the title/image closer together. Do not manufacture motion inside the photograph, fake camera metadata or personal travel anecdotes.

The full collection is useful. Keep all twenty images accessible; there is no evidence here that deleting photographs would improve the experience. First reduce repeated introductory material and improve chapter navigation. A selected edit followed by a small archive is a legitimate editorial structure.

## What is working and should survive

- The homepage no longer needs the floating screenshot collage. The large title and single image spanning the paper/coal transition are stronger.
- Photography has a distinct opening and meaningful changes in atmosphere. The large image sizes do more for it than ornamental graphics would.
- Featured context appears before responsibility and judgment. Team credits remain visible where supplied.
- Services' desktop summary column is about 447px at 1440px; the earlier narrow-column issue is resolved.
- The archive gives access to every photograph. Viewer close restored focus to the opening thumbnail in the inspected session.
- Mobile header controls fit, and inspected pages had no horizontal overflow.

## Recommended execution order

1. Fix viewer collection order and clarify photography navigation.
2. Fix the Mivi mobile crop and reduce the mobile Services illustration footprint.
3. Remove the remaining repeated project facts and link Services to existing evidence.
4. Refine the daylight pairing and selected introduction; keep the mountain/night/sea direction.
5. Only then consider a restrained motion refinement: active chapter navigation, smoother viewer transitions or a single night-section entrance. Use existing CSS/GSAP. Keep photos fully visible without JavaScript and under reduced motion. No continuous image drift, forced horizontal scrolling or decorative particles are needed.

## Evidence and limits

Read the current diff, previous review and relevant components. Visually inspected homepage and photography at 1440 × 900 and 390 × 844, including the settled openings, selected images, night spread, archive, project presentation and Services. Photography measured 8,575px on desktop and 7,708px on the phone viewport. Both inspected pages reported zero horizontal overflow. Confirmed the selected-viewer order mismatch through the UI and checked focus restoration after close. No captured browser console errors; `git diff --check` passed.

This was a design review, not a new complete accessibility/performance certification. The earlier build/check results remain recorded in the implementation review; they were not rerun because this pass changed no application code. No new 72-case matrix, performance median, physical touch test or complete case-study article audit was performed. Prior writing scores are not independently rescored here.

The original review pass left application code unchanged. The implementation follow-up above supersedes that status; the user subsequently authorized committing and pushing the completed changes.
