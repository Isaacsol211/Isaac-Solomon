# Design review and photography revision — 17 September 2026

Final implementation: the actionable findings are now resolved; see the implementation follow-up in the [independent consultant review](./design-consultant-review-2026-09-17.md) reassesses the settled implementation. It identifies a selected-gallery/viewer sequence mismatch, excessive mobile Services height, the mobile Mivi crop and remaining repetition in Godrej/Tomorrow Makers copy. The copy cleanup below improved order and length but did not fully resolve repetition. Services can also gain stronger proof by linking existing case studies, without requiring new testimonials or screenshots.

Reviewed the six commits after `2546559` through `03954de`, the existing uncommitted photography/lightbox work, and the rendered local site. This review covers the homepage, Services, writing index, photography sequence and viewer. Ratings are subjective design judgments, not conversion measurements. The case-study articles were not all re-audited line by line.

## Verdict

| Area | Rating | Assessment |
| --- | --- | --- |
| Overall portfolio | 7.5/10 | Credible and recognisable. Stronger ownership and recent work; too much repeated explanation remains. |
| Homepage composition | 8/10 | The large occupation heading and single Mivi stage are a coherent opening. Keep them. |
| Project storytelling | 7.5/10 | Role and decision are useful additions. The featured copy now repeats less and reads with more confidence. |
| Services | 7.5/10 | The two-column rows and clearer illustration are improvements. The wording is more concrete, but this section still depends on the case studies for proof. |
| Writing index | 8/10 | Strong hierarchy and useful subject cues. It earns its restraint. |
| Photography before this pass | 6/10 | Easier browsing, but little distinction between one passage and the next. |
| Photography after this pass | 7.5/10 | Better scale, sequencing and atmosphere. A more deliberate photographic publication; still room for tighter editing. |

## What the earlier changes got right

Moving Tomorrow Makers directly after Mivi gives recent work a prominent place. Separating role, decision and outcome makes a technical contribution easier for clients and hiring managers to understand. Keeping design credits visible makes the ownership claims more credible.

The shorter About section is an improvement. The Services summary now has usable line length and the active illustration reads more clearly. Writing subjects such as framework migration and product ownership help visitors choose an article. The contact routes distinguish projects and roles without implying that Isaac is leaving his current employment.

The photography archive is much more reachable than the old long pinned mountain sequence. Preserve that usability. The compact closing footer is appropriate here.

## What still needs editing

### Resolved — Featured project copy repeated the same evidence

`src/lib/components/Projects.svelte:370`, `:445`, `:555`, `:629` render the old description after the new role, decision and outcome. The Mivi description repeats the storefront, components, live cart and mailers already named above. Godrej repeats the rebrand/content-model result in multiple consecutive paragraphs.

Follow-up edit completed in `src/lib/content.ts` and `src/lib/components/Projects.svelte`: each featured description is now a short context sentence, and the template presents the story as context, role, decision, outcome, then credits. The visible copy now lands at 63 words for Mivi, 66 for Tomorrow Makers, 70 for SAUT and 74 for Godrej Foundation, excluding credits. The detailed implementation history stays in the article pages.

### P2 — Photography is better composed, but still a long visit

The new desktop page is about 8,575px tall at 1440 × 900. It contains the mountain opening, eight selected photographs, the ocean feature and the complete twenty-frame archive. The repetition is intentional selection versus index, but remains a tradeoff. Direct series links are essential and remain available near the opening.

If the page needs to become shorter, cut a selected spread before shrinking every photograph. The forest-road image is deliberately a supporting image beside the fog photograph; it should not become so small that it reads as a navigation thumbnail. On phones it retains 83% of the content width.

### P3 — Copy still does not fully sound like Isaac

The factual captions are safer and more precise than the earlier generic travel sentiments. Most still describe what is visible. Genuine short observations from Isaac would add authorship; invented memories or camera settings would weaken the page. No new material is required to use this revision.

### Remaining — Services still needs lived proof to become stronger

The Services language is now sharper where the existing site already proves the claim: launch-day commerce systems, rebrand-resilient CMS work and roadmap/release planning. It still reads as a capabilities list rather than a sales section because it has no client quotes, screenshots of process or before/after service outcomes. That is acceptable for this version because the proof sits in the project blocks and case studies.

## Implemented in this pass

- Enlarged the photography title in upright Instrument Serif over the existing mountain frame. A CSS image settle and masked title entrance create one opening moment.
- Composed the daylight edit with different image scales and offset positions. Kept full image proportions and reduced captions to title and location.
- Grouped the star panorama, camp lights and station photograph on a blue-black surface, giving the night work a distinct passage.
- Created a deep-blue spread around the ocean portrait, with its title and description beside the full photograph on desktop.
- Retained direct archive links, all twenty photographs and the compact footer. Added explicit accessible names to photo-opening buttons and an opening control for the hero photograph.
- Removed the photography route's GSAP scroll transformations and repeated clipping entrances. The opening uses CSS; the other photographs hold still for inspection. No new dependencies or image assets were added.
- Removed obsolete selected-grid metadata and the unused ocean note from shared content.
- Tightened the four featured project summaries so description, role, decision and outcome no longer repeat the same evidence, then reordered the rendered fields so context comes before proof.
- Reworded the Services summaries and a few deliverable labels to use claims already proven elsewhere on the site.

## Functional defects found and fixed

### P1 — Tablet navigation hid its contact control

At 768px the “let's talk” link extended to x=846px. The page still reported zero horizontal overflow because overflow was clipped. The old test therefore missed an offscreen control.

`src/lib/components/Nav.svelte:53`: the menu now stays available below 1024px. The secondary chapter label appears at 1280px. CSS and the menu's resize cleanup use matching breakpoints. At both 768px and 1024px the inspected header controls fit. Opening the menu at 768px and resizing to 1024px closes it and removes background inertness.

### P2 — Anchor spacing was applied twice

The installed Lenis implementation already reads `scroll-margin-top`. The layout added an extra -88px offset. The After Dark heading landed around 184px from the top despite a 77px header.

`src/routes/+layout.svelte:40`: use `anchors: true` and let CSS define clearance. The measured landing is now about 97px. The earlier uncommitted global scroll-padding addition was also removed.

### P2 — Zoom conflicted with image navigation

`src/lib/components/Lightbox.svelte:73`: a horizontal touch gesture could advance the collection while the person was trying to inspect a zoomed frame. Zoom now suppresses swipe navigation; multi-touch gestures are excluded. The zoomed image cannot shrink back to fit its flex container, and its scroll area bypasses Lenis. Next/Previous buttons remain available and changing photos resets zoom.

## Validation and limits

- `npm run check`: zero errors and zero warnings after the follow-up copy and template edits.
- `npm run build`: passed after the follow-up copy and template edits, including Cloudflare adaptation and markdown generation.
- `git diff --check`: passed after the follow-up copy and template edits.
- Browser inspection after the follow-up edits: homepage and photography checked at 1440 × 900 and 390 × 844, with zero horizontal overflow and no captured console errors. Featured project copy renders in the intended order: context, role, decision, outcome and credit.
- Photography layout inspected at 360, 390, 768, 1024 and 1440px widths; zero document overflow in the recorded checks. Header control geometry was checked separately after the tablet defect was discovered.
- Light and dark gallery views inspected. Desktop and mobile opening/selection, archive and viewer checked visually.
- Ocean viewer opened the correct frame; Zoom enlarged it to 1200px on desktop. Next reset zoom; Escape closed it; focus returned to the opening photograph. Keyboard traversal wrapped from the last viewer control to Zoom, inside the dialog.
- Direct After Dark anchor checked before and after the spacing fix.
- No captured browser console errors in the final inspected session.
- Reduced-motion CSS disables both opening animations and the hover transition. All image markup is server-rendered and the gallery has no JS-dependent hidden states. These paths were reviewed in source; OS-level reduced motion and disabled-JavaScript browser sessions were not run in this pass.
- The multi-touch guard was reviewed in source; physical touch/pinch behaviour still needs a real-device check.
- The earlier 72-case matrix and five-run performance harness were not rerun. No new LCP or transfer-size claim is made.

Interface checks were informed by the [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md); the visual judgments above are specific to this portfolio.

Changes remain local and uncommitted. No push or deployment was performed.
