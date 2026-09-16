# Senior design review — 16 September 2026

## Scope and verdict

Reviewed commit `2546559` and the published site at https://isaacsolomon.dev, including the homepage, writing index, photography's full desktop sequence, its mobile layout, and lightbox opening, next and close. Desktop was 1440 × 900; mobile layout was 390 × 844. These are design-consultant judgments, not conversion data or a comprehensive accessibility certification. No production source was changed for this review.

Overall portfolio: **7/10**. Photography page: **6/10**.

The portfolio communicates experience and care. Its strongest qualities are the clear occupation, real projects, distinctive type pairing and substantial technical stories. The remaining weakness is editorial judgment: how much space, text and motion each piece of evidence deserves. Photography makes this especially visible. The material has more personality than the framework presenting it.

## Previous review: status

The new commit addresses all five previous code findings in source: screenshot drift is removed, Hero and Projects check whether the loading fallback already revealed the page, button hover/focus colors use the stronger accent token, the Impeccable hook checks an actual executable, and featured gallery images regain unique view-transition names. The hook guard is specifically for the installed Darwin ARM64 executable; portability to other platforms is a separate setup concern.

The published hero has its two actions on one row at desktop width. SAUT now has a dominant image and a feature crop. The interlude has the revised statement and named project captions. This review did not rerun the earlier 72-case matrix, performance harness or network-delay simulation.

## Portfolio: what still needs design work

### Keep the hero

The title has enough scale. Its relationship to the introduction is now composed, and the Mivi image supplies visual interest without the old floating collage. Further headline enlargement is unlikely to help. Keep the clear role, the single stage and the paper-to-coal transition.

The 2018–2022 opening project emphasizes established experience. Give the recent 2026 work an unmistakable place in the selection too, so the first impression does not leave current capability to inference. This does not require throwing away the Mivi opening.

### Make contribution easier to skim

Clients need to understand scope, ownership and handover. Hiring managers need to understand decisions, collaboration and complexity. The site contains that information, but too much lives inside paragraphs.

Give each featured project a brief, factual role line and a clear decision/outcome pair. Reuse existing verified material. Keep design credits visible. Do not manufacture numerical improvements or imply sole authorship of a team result.

### Shorten About

At the inspected desktop size, About occupies approximately 1,436px. It repeats the hero's nine years and maintainability positioning, then adds substantial project history and recent work. The portrait and small camping frame work; the reading burden does not.

Aim for 120–160 words: current role, specific engineering strengths, what working with Isaac is like, and one personal sentence. Move detailed project histories into the existing articles. Replace unsupported-sounding absolutes such as animation that “doesn't cost a Lighthouse score” with a concrete engineering practice or an evidenced result.

### Simplify Services internally

The sticky illustration is a useful interaction. The service rows divide the remaining width into title, description and deliverable columns, producing narrow text measures. The pale diagram also looks closer to a wireframe than finished artwork.

Use two columns inside each row: title, then a wider summary with deliverables underneath. Give the diagram's active path and primary objects enough contrast to read. Keep incidental geometry quiet. Delete the explanation “illustration — how the work behaves, not a screenshot”; the illustration should communicate without discussing its implementation.

### Keep the writing direction

The featured essay and compact index rows are coherent. The writing is one of the strongest potential hiring signals because it explains decisions. Improve discovery with plain subject cues where titles are literary: performance, architecture, product ownership, multilingual interfaces. Avoid another visual redesign here.

### Clarify the two professional routes

Keep a common contact destination, with a clear distinction between discussing a project and discussing a role. Put the actual deliverable and engagement information near Services; keep employment history and a resume link, if an approved resume exists, easy to find. “Open to new projects” principally signals freelance availability. Do not announce immediate full-time availability unless that is accurate.

## Photography: detailed critique

### 1. The mountain gallery takes too much of the visit

At 1440 × 900, the page measured approximately 12,083px tall. The mountain gallery's pinned wrapper measured approximately 5,943px, and After Dark began around y=6,843. Eleven mountain images therefore dominate the route through the collection. The desktop gallery has no local shortcut to the later series.

Recommendation: lead with a six-to-eight-image selection spanning the collection. Provide direct links to Mountains, After Dark and Places, plus an all-frames view. Keep all twenty images available. If a pinned horizontal passage stays, limit it to three or four deliberately sequenced images. Preserve the native swipeable mobile row, which is less demanding than the desktop pin.

### 2. The motion interferes with looking

The horizontal gallery rotates, scales and vertically shifts photographs inside stationary clipped frames. Mountain horizons tilt as the user scrolls. The effect calls attention to the interface and temporarily changes the photograph's composition.

Keep movement of the gallery as a whole if desired. Remove individual image rotation and vertical drift. A photograph should settle once and remain available to study. Retain a short lightbox transition as feedback to an explicit action.

### 3. The Places grid has a real image-edge defect

The homepage's fixed-frame drift problem still exists in photography. In the live Places grid, Tea Country exposed about 8px of its frame below the image; another image exposed about 14px. The animation reaches scale 1 while retaining nonzero vertical translation.

Source: `src/routes/photography/+page.svelte`, lines 138–156. Remove that translation or guarantee adequate overscan throughout its range. For the overview grid, stationary full photographs are the better treatment.

### 4. Headings compete with the work

The opening is strong, but later headings carry more visual weight than necessary. “Cities, summits, gardens, green hills” takes a substantial column beside relatively small photographs. The large “disconnect” headline and heavy overlay make the ocean section behave like an advertising banner.

Use compact series titles: Mountains, After Dark, Places. Keep one expressive opening title. Show the ocean frame with more of its natural color and a modest caption, optionally outside the image. Keep its generous scale: the quiet photograph itself can provide the pause.

### 5. Curate for differences between photographs

The strongest candidates for the opening selection include Into the Fog, Forest Road, Base Camp, After Hours or Platform 2, a single mountain panorama, and the architectural geometry of Qutub Minar. They show different ways of seeing: atmosphere, leading lines, warm/cool contrast, artificial light and pattern.

The conventional Taj Mahal view contributes less distinctiveness than these images. Keep it in the archive, but do not give every image equal promotional weight. Several mountain views can work as a series; they do not all need equal time in the introductory route.

These are judgments about the displayed web images. They are not assessments of the original files' print quality or capture technique.

### 6. Captions need a more personal, precise voice

“The sky doing its thing,” “a different planet,” and “the city pauses here” are familiar phrases that add little to the frame. Prefer title, specific place and a date when known. Add one actual observation only when it helps. Never invent weather, camera settings or memories to make captions sound more authored.

The Mountains introduction mentions stars and camp, while those photographs appear under After Dark. Align the descriptions with their actual series. The hero image is also the first mountain image; avoid making the opening selection immediately repeat the same frame.

### 7. Treat the lightbox as a photographic viewer

Opening, advancing and closing worked on the inspected mobile layout, and focus returned to the opener. The fit preserves the whole landscape frame, which is correct; do not fill the phone by cropping it into portrait.

Improve it with mobile swipe navigation, optional zoom and a clear position indicator tied to the selected series or all-frames collection. Keep real buttons and keyboard controls. The ocean feature should open its own photograph directly; currently it is a plain image even though it exists in the lightbox's ordered collection.

### 8. Close the archive more quietly

The shared contact/footer occupies approximately 1,175px on desktop—more than a viewport. That is too large a closing interruption for this page. Keep a compact route back to Work, email and Instagram, with the same branding. A visitor who has just studied photographs does not need the entire portfolio sales close repeated at full scale.

## Recommended photography composition

1. Existing atmospheric opening, with shorter supporting copy and direct series links.
2. Six to eight selected frames, varied in scale and ordered by visual contrast.
3. A short After Dark sequence; one panoramic image can span the content width.
4. Ocean photograph as a quiet pause with a small caption and direct lightbox access.
5. Clearly labeled access to all twenty frames in a browsable grid.
6. Compact footer.

Keep the current typography and brand palette. Put expressive motion in the opening and in direct interactions. Do not introduce scroll effects independently on every photograph.

## Execution order and acceptance criteria

1. Fix Places image edges. No uncovered frame during entry, midpoint or exit, in either theme.
2. Reduce the mountain pin or replace it with ordinary browsing. Every series is directly reachable without traversing the entire preceding series.
3. Reorder existing images into a selected edit and archive. No new user-supplied images are required.
4. Reduce photography headings and revise captions. The images should be the dominant visual elements below the opening.
5. Shorten About and widen service descriptions.
6. Improve the viewer and compact photography's closing footer.

Validate at 390 × 844, 1440 × 900 and a 1280 × 720 laptop viewport. Check ordinary motion, reduced motion, keyboard access, focus restoration and direct links. Verify that full photographic compositions remain available. A no-JavaScript or failed-animation path must leave the entire archive reachable; CSS must not make a wide track depend exclusively on GSAP for access.

The next pass succeeds when a visitor can identify Isaac's role, see a meaningful example of his contribution, reach any photo series, and study a full frame without fighting the page's choreography.
