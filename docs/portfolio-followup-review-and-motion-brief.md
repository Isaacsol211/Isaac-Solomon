# Portfolio follow-up review and motion direction

Reviewed 15 September 2026. Code range: `06a5b1b..b1b3322` (ten commits), with targeted checks on isaacsolomon.dev. This is a review and implementation brief; the website has not been changed by this pass.

## Verdict

The revision improves navigation, specificity and credibility. It does not finish the original review, and it has not yet achieved the expressive portfolio Isaac wants. The next pass should make the work itself visually memorable while preserving the improvements in access and reading order.

The audience is prospective freelance clients, future employers, and people who already work with Isaac. A visitor should understand the role quickly, encounter real work early, and see care in the interaction design. New screenshots and testimonials are not prerequisites for this pass.

## 1. What changed the visual character

The diff does **not** show a wholesale removal of animation:

- `src/routes/+page.svelte` stops rendering `Manifesto`. Its component still exists, including the moving panels, guide lines, word fill and pinned sequence. This removes a substantial animated scene from the experience.
- `Hero.svelte` changes the headline from `clamp(4.2rem,15vw,13.5rem)` to `clamp(2.9rem,9.5vw,8.5rem)`. The desktop maximum drops from 216px to 136px. The headline also becomes longer: “frontend developer.”
- Hero scroll choreography, the About portrait effects, project clip reveals and drift, cursor previews, Services animation, photography scroll effects and shared-image page transitions remain.
- The project cursor animation now runs while its preview is active. This is a useful optimization, not a reason to reinstate an idle animation loop.

The visual problem is therefore partly composition: less of the expressive material appears early, while large neutral surfaces and repeated section treatments remain. Adding the same fade-up to more elements would not repair that.

**Revision to the earlier advice:** the old 52–80px headline suggestion should not be treated as a rule. This site can support dramatic typography. Judge the title alongside the artwork, lead and first work preview; a pixel target alone cannot decide its quality.

## 2. What deserves to stay

- Specific frontend positioning and the two clear opening actions.
- Work immediately after the hero. At 1280 × 720, the work section started at approximately 736px in my check. This measures the section boundary, not the first full project image.
- Removal of placeholder testimonials. There is no need to replace them until genuine material exists.
- Complete card descriptions and added outcomes, subject to the factual refinements below.
- Responsive featured-image variants. The four new files total 154,366 bytes, approximately 151 KiB. That is a real asset reduction; actual transfer depends on viewport, pixel density and caching.
- The photography series, clearer presentation and full-image lightbox.
- Native overflow for the reduced-motion gallery, rather than inaccessible offscreen frames.
- The darker accent-text token, heading fixes and most of the mobile menu improvements.

## 3. Remaining code and content findings

### P1 — Services still does not fit its pinned stage

**Location:** `src/lib/components/Services.svelte:47–67`, `:102–104`, `:143–167`.

**Observed on the live site:** at 1280 × 720, the stage is 720px high and the service list is 1,276px high. During the pin, the first row was approximately y=-276 to -26, while the last was y=768 to 998. The section clips overflow. This leaves substantial content outside the visible screen while scrolling advances the left-hand card.

The reduced-motion branch fixes the stacked cards but leaves this ordinary desktop problem intact.

**Fix:** make the full list participate in normal page scrolling. Keep only a compact visual on the left sticky, and update it as the corresponding right-hand row crosses the viewport. Remove snapping and the full-stage pin. On small or short screens, stack the visual and list.

**Acceptance:** all five complete rows are readable with ordinary scrolling at 1280 × 720, 1024 × 768, tablet and mobile sizes, including text zoom. No pin is allowed when the pinned content is taller than the available space below the navigation.

### P2 — Opening the mobile menu and crossing the breakpoint leaves the page locked

**Location:** `src/lib/components/Nav.svelte:39–63`, `:206–241`.

**Reproduction:** open the menu at 390px, then resize to 820px. I observed `display:none` on both the menu and its close button, while the main content remained `inert` and the document retained `overflow:hidden`.

**Fix:** close the menu when entering the desktop media query, allowing the existing effects to restore background interaction and scrolling. Manage focus according to which controls remain visible.

**Related semantic issue:** the close button and theme toggle sit outside the element carrying `role="dialog"`. The focus trap deliberately includes those controls. Put the required controls inside the modal boundary; the dialog's visual and semantic boundaries should agree.

### P2 — The lightbox does not isolate the background

**Location:** `src/lib/components/Lightbox.svelte:35–45`, `:98–104`.

Opening, next-image navigation, Escape and focus restoration worked in the targeted interaction checks. However, while the dialog was open, the header, main and footer had no inert ancestor, and the browser accessibility snapshot still exposed the background content.

**Fix:** use a native modal dialog or a shared modal implementation that makes the background inert, contains focus, owns scroll locking and restores focus after closing. `aria-modal` alone does not implement those behaviors. Test with actual keyboard input and a screen reader; the DOM snapshot is not a substitute for the latter.

Reference: [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### P2 — Small orange text still misses the new contrast treatment

**Locations:** `src/lib/components/Hero.svelte:115`, `src/lib/components/Projects.svelte:360`.

The live hero's 13px “scroll craft” label still uses #e8490f over #f1efea, approximately 3.39:1. The 12px case-study labels on the light project blocks use the same orange over #e9e6dd, approximately 3.12:1. These are below the 4.5:1 requirement for normal text.

**Fix:** apply the already-defined `accent-text` token on light surfaces. Retain the brighter orange for decorative marks, large display accents and suitable dark surfaces. Audit actual foreground/background pairs rather than doing a blanket replacement across both themes.

### P2 — The performance document is not a reproducible cold-load baseline

**Location:** `docs/performance-baseline.md:17–21`, `:25–39`, `:76–80`.

The document calls the cache cold because it navigates to `about:blank` between runs. That does not clear the HTTP cache. Later results omit shared JS/CSS transfer, which is consistent with reuse. With the harness absent from the repository, the documented method cannot establish that all measurements were cold.

**Fix:** commit the harness and raw reports, explicitly disable or clear cache, record Chrome/version/commit/settings, and report medians from several runs. Separate first visits from repeat visits. Measure the deployed site as well as the local build. Chrome documents [disabling cache to emulate a first-time visitor](https://developer.chrome.com/docs/devtools/network/reference#disable-cache).

The document also says the Keus article contains a Lighthouse screenshot. The article renders a hardcoded metrics table; that is not the referenced screenshot/report. A claimed score of 97 does not demonstrate that animation has zero performance cost. Keep a qualified description of the practice, or attach a dated reproducible audit when available.

The portfolio baseline measures `/`, `/photography` and `/writing/saut`; it does not establish a before/after baseline for keus.in.

### P2 — Some “corrected” writing remains contradictory

**Nova Rock:** `src/routes/writing/novarock/+page.svelte:435–448` still says the empty-source technique ensures the hero is never downloaded on mobile. At `:467–470`, the revised footnote correctly says an empty source set is skipped and cannot guarantee this. Correct the main explanation and code comment together.

**About:** `src/lib/content.ts:135` says the CMS was rebuilt twice to survive a rebrand. The Godrej story and new outcome describe retaining the content model and avoiding content migration. Specify which layer changed; do not make preserving the CMS sound like repeatedly rebuilding it.

**Tomorrow Makers:** `src/lib/content.ts:354` says assessments run in eleven languages across four pathways. The article qualifies the eleven-language support to Classes 6–7 (`src/routes/writing/tomorrow-makers/+page.svelte:271`, `:343`). Retain that qualifier in the compact outcome, or explicitly separate the two facts.

**Credits:** the handoff's “only Able.do and Tropics anywhere” claim is incorrect. Godrej and Tomorrow Makers already credit 3 Sided Coin; SAUT names Surajith and Zubin. Existing verified credits can be moved near the project introduction without asking Isaac for new material. Do not infer additional roles or contributors.

### P2 — Motion preferences are cached as if they were permanent

**Location:** `src/lib/motion.ts:23–35`; `src/routes/+layout.svelte:19–51`; consumers including Services and Projects.

**Source finding, not an OS-setting reproduction in this pass:** `initMotion()` caches the first reduced-motion boolean along with the imported libraries. Lenis also decides whether to start only on layout mount. Some other components correctly use `gsap.matchMedia`, so behavior is inconsistent if the preference changes during a session.

**Fix before expanding motion:** cache the libraries, subscribe separately to media-query changes, and rebuild/revert animations and smoothing when preferences change. Use one consistent policy for reduced motion, fine-pointer interaction and breakpoint changes.

## 4. Creative direction: an editorial portfolio with a working studio's energy

### The visual idea

Make Isaac's dual strengths visible: precise interface engineering and an eye for photography. Keep the existing typography and paper/ink palette as the foundation. Bring in real image color, larger compositional contrasts, offset crops and tactile transitions. The asterisk becomes a recurring motion signature.

The memorable moment belongs to the work: a short composition of existing project images assembles beside the opening title, then gives way to a substantial first project. Supporting sections remain easy to scan.

### Palette and type

- Paper: `#f1efea`; secondary paper: `#e9e6dd`.
- Ink: `#161412`; deep image stage: `#141311`.
- Signal orange: `#e8490f` for graphic marks and appropriate dark surfaces.
- Accessible light-surface accent text: `#b5320a`.
- Let individual project images introduce their own color. Avoid adding arbitrary gradients behind every section.
- Keep Space Grotesk for identity, navigation and body; use Instrument Serif for a few complete editorial headings/captions. Do not italicize an arbitrary final word in every heading.
- Try desktop hero type in the 112–152px range as a starting composition, not an acceptance criterion. Keep role and actions visible, and reflow deliberately on phones.
- Body copy should remain comfortably readable. Decorative scale can be dramatic without making supporting text tiny.

### Section-by-section motion specification

#### A. Hero: a short opening composition using real work

Keep the clear frontend role and lead. Put two offset project frames beside or behind the edge of the display title, with a smaller photography frame as a secondary personal detail. Maintain a protected zone around all text and actions.

- On first entrance, the title rises through a line mask over 600–750ms. Use two line groups, not dozens of individually delayed letters.
- Project frames move from a close stack to a composed spread over 700–900ms, with roughly 60ms stagger and 2–4 degrees of final rotation.
- The asterisk makes one small rotational adjustment as the frames settle. Its motion should be recognizable across the site.
- On a fine pointer, the artwork can respond by at most 6–10px. The text and buttons stay still. Stop updates on pointer leave and while offscreen.
- All copy and controls work immediately. The composition does not act as a preloader.
- On mobile, place one substantial image preview below the lead with a second frame peeking behind it. Keep the reading order clear; remove pointer tracking.
- Reduced motion gets the finished arrangement immediately.

#### B. Featured work: art-direct each project rather than repeating one card

Use a common content model with deliberate changes in composition:

- **Mivi:** a dark, broad image stage, large project name and compact outcome. Let the strong product color supply the energy.
- **SAUT:** a quieter, precise composition that highlights the interface and bilingual layout. A small explanatory RTL/LTR interaction can be added later using known content and clearly identified as a demonstration.
- **Godrej / Tomorrow Makers:** lighter editorial compositions with project-specific image proportions. Put role and existing team credits close to the introduction.

For the entrance, animate the image's outer mask and a small inner scale separately: crop opens in 550–700ms; image settles from approximately 1.04 to 1.00. Text remains in normal flow. Give images and captions different timing rather than moving the whole block together.

On hover/focus, reveal a short project-specific detail or move the case-study arrow approximately 4px. The title, role and outcome must already be visible.

Keep a shared-image transition into the case study. The code already has this foundation; refine the crop, duration and landing position rather than adding another transition library. Aim for 350–500ms, with an ordinary navigation fallback.

#### C. Recover the best manifesto effect as a compact craft interlude

After the first two featured projects, place a 280–420px composition using one short statement, a few image fragments and the existing guide-line motif. Example copy: “Built for the people who use it.”

Reuse the old scene's layered assembly and small rotations, with stronger readable type and real work imagery. Complete the motion during natural scrolling. Do not restore the 220svh barrier before the projects or make a long paragraph brighten word by word before it can be read.

This is a useful place for graphic personality because the visitor has already encountered proof.

#### D. Services: an animated working diagram beside a readable list

Keep a compact illustration sticky on the left while the actual service rows scroll on the right. The active row changes a diagram: content fields assembling into a page; product options updating a cart; interface blocks switching direction.

Make the diagram from HTML/SVG using the site's own linework and orange accents. Label conceptual examples as illustrations rather than screenshots or measured client outcomes. The animation should explain a capability.

Use 250–400ms transitions between diagram states. Prefer transform/opacity; use GSAP Flip only where real layout changes justify it. Provide the same state on keyboard focus. Mobile displays the relevant illustration beside or above each row without a pinned screen.

#### E. About and photography: give the person more presence

Use the existing portrait with one offset photo from the archive, a clean caption and a restrained frame. Let a clip reveal show the actual photograph, then leave it alone. Avoid adding so many overlays that the photo becomes background texture.

Keep the curated photography page. Improve the lightbox with a 180–250ms transition, directional previous/next changes and a clear caption. Every image remains fully viewable. The modal fixes above are part of this work.

#### F. Writing: confident reading layouts

Make the writing index feel like a selection of essays, with varied title lengths, a strong first article and compact supporting rows. Introduce each row with a 200–300ms underline or image reveal on hover/focus.

Inside articles, keep body paragraphs still. Spend motion on explanatory diagrams, comparison controls and the opening image. A subtle reading progress indicator is sufficient continuous feedback.

#### G. Small interactions that make the whole site feel considered

- Navigation active marker moves between links over 180–220ms.
- Buttons receive a small fill or arrow response without a moving hit target.
- Copy email gives immediate confirmation and a subtle icon change.
- Theme switching preserves location and focus; a brief color transition is enough.
- The asterisk can rotate a quarter-step on selected deliberate interactions. Do not spin it continuously everywhere.

### Implementation ownership

Use the existing Svelte 5, GSAP, Lenis and View Transitions stack. Newness should come from art direction and interaction quality. Do not introduce React/Framer Motion into this application to follow a tutorial.

- GSAP owns coordinated timelines, image reveals, any carefully bounded scroll scenes, and occasional SVG/Flip work.
- CSS or native Svelte transitions own simple button, menu and disclosure responses.
- View Transitions owns supported route morphs, with instant/faded fallbacks.
- Only one system owns a given element's transform. Put entrance, scroll and hover effects on separate nested wrappers when they must coexist.
- Cache module imports, not environment preferences. Scope animations to component roots, cancel pending asynchronous setup after unmount, and revert contexts/listeners on navigation.
- Use media queries for the actual capability: fine pointer and hover for pointer effects; available width/height for pinning; reduced-motion preference for motion.
- Reserve image geometry. Refresh scroll measurements after relevant layout changes and image/font readiness. Avoid repeated forced measurement on every pointer move.
- Animate transforms and opacity where possible. Profile masks, filters and SVG work on representative hardware before retaining expensive effects.
- Idle/offscreen components should not keep their own perpetual frame loops alive.

Reference: [GSAP's framework lifecycle guidance](https://github.com/greensock/gsap-skills/tree/main/skills/gsap-frameworks).

## 5. Skills for Claude Code

These are recommendations, not a claim that any skill guarantees perfect execution. A clear visual brief and inspection of the running result are essential. Source documentation and directory listings were checked on 15 September 2026; counts are snapshots, not quality guarantees.

### Recommended working set

1. **Impeccable — Paul Bakaus.** Use as the principal design workflow: `init`, `bolder`, `layout`, `animate`, `delight`, then `polish`. The current package is one skill with subcommands, not a collection of separate `/animate` and `/bolder` skills. [Source](https://github.com/pbakaus/impeccable) · [directory listing: approximately 277K installs](https://skills.sh/pbakaus/impeccable/impeccable).
2. **Official GSAP skills.** Select `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-frameworks`, `gsap-plugins`, and `gsap-performance`. They cover implementation and lifecycle details for this stack. Skip the React-specific skill here. [Source: GreenSock, approximately 15K repository stars](https://github.com/greensock/gsap-skills). The skills CLI search returned approximately 56K installs for core, 54K for ScrollTrigger, 52K each for performance and timeline, and 51K for plugins.
3. **Webapp Testing — Anthropic.** Use for browser interaction checks, screenshots and console inspection after implementation. [Source](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) · [approximately 157K installs](https://skills.sh/anthropics/skills/webapp-testing).
4. **Web Design Guidelines — Vercel.** Use as the final accessibility/usability check, with this visual brief taking precedence on aesthetic choices. [Source](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) · [approximately 636K installs](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines).

**Optional alternative:** Anthropic's `frontend-design` is a useful lighter design skill if Impeccable is not wanted. It has approximately 888K installs in the [directory listing](https://skills.sh/anthropics/skills/frontend-design). Avoid asking two broad design skills to independently redesign the same section in opposing directions.

### Installation commands for Claude Code

Run from the portfolio project. These are instructions for Claude's environment; this review has not changed Claude's configuration.

```sh
npx impeccable install --providers=claude --scope=project

npx skills add https://github.com/greensock/gsap-skills --agent claude-code --skill gsap-core gsap-timeline gsap-scrolltrigger gsap-frameworks gsap-plugins gsap-performance

npx skills add https://github.com/anthropics/skills --agent claude-code --skill webapp-testing

npx skills add https://github.com/vercel-labs/agent-skills --agent claude-code --skill web-design-guidelines
```

Impeccable's installer includes a provider-native design hook; inspect its stated setup choices and reload Claude afterward. Installation methods are documented by [Impeccable](https://github.com/pbakaus/impeccable#installation) and [the skills CLI](https://github.com/vercel-labs/skills). The GSAP repository also offers a Claude marketplace installation.

## 6. Ready-to-use brief for Claude

> Read `docs/portfolio-followup-review-and-motion-brief.md` before editing. The goal is an expressive, polished frontend portfolio for freelance clients, prospective employers and current colleagues. Isaac finds the latest revision too plain. Preserve the clearer opening, early work placement, credible copy, responsive images and accessibility improvements. Restore visual personality through real work imagery, dramatic typography, an asterisk motion signature, composed project reveals, a compact craft interlude and useful interactive diagrams. Reuse existing assets; no new customer screenshots or testimonials are being supplied. Do not fabricate them.
>
> Fix the documented Services, modal, contrast and factual defects. Establish consistent motion lifecycle, preference and breakpoint handling before expanding animations. Implement the hero and one featured project first as the visual reference; inspect them at desktop and mobile sizes, then carry the same direction through the remaining sections. Keep changes local for review until deployment is explicitly requested. Follow the acceptance criteria below and report what was actually verified, with reproducible performance evidence rather than impressions.

## 7. Acceptance criteria for the next pass

### Visual and product

- The opening makes the frontend role clear, presents work imagery and has a memorable composition.
- The first actual project preview is reachable in approximately one ordinary viewport of scrolling on desktop; measure the image, not just the Selected Work heading.
- The visual character is recognizable with animation paused. Texture, crop, typography and composition do useful work by themselves.
- Three distinct beats are visible: opening composition, project presentation and human/photographic detail. Supporting sections remain calm enough to read.
- Existing credits are visible near relevant work. Quantitative claims preserve their scope and source.

### Functional

- Check 360, 390, 768, 1024 and 1440px widths, plus a short 1280 × 720 desktop viewport and 200% text zoom.
- Check fresh page loads and resizing across breakpoints. Menus cannot leave a hidden modal, inert page or stale scroll lock behind.
- All service rows and photography frames are reachable with keyboard, pointer and reduced motion.
- Use real Tab/Shift+Tab/Escape keys. Inspect focus, the accessible modal boundary and focus restoration.
- Test both themes and reduced motion from initial load; also change the preference while the page is open.
- Open a case study, go back, change route repeatedly and verify no duplicated animation, stale transforms, scroll jumps or increasing listener/trigger counts.
- No essential text or CTA is concealed behind an entrance animation or hover.

### Performance and evidence

- `npm run check` and `npm run build` pass.
- Commit a repeatable performance harness and dated raw outputs with explicit cache behavior.
- Compare the same pages, build conditions, viewport, CPU/network profile and interaction sequence before and after.
- Record performance traces during the expressive scenes; a static load score cannot establish smooth scrolling.
- New imagery uses responsive variants and declared geometry. Additional animation dependencies need a specific visual purpose.

## Verification completed in this review

- Reviewed the ten-commit source diff and the relevant motion, content and modal implementations.
- Inspected the live desktop homepage and Services pin; checked mobile/tablet overflow at 390px and 768px (zero in those observations).
- Opened the photography lightbox, navigated forward, closed with Escape, and verified mobile focus restoration to its opener.
- Reproduced the mobile-menu resize problem at 390 → 820px.
- Checked the cited live text colors and source factual contradictions.
- `npm run check`: zero errors and zero warnings.
- `npm run build`: passed, including Cloudflare adapter output and markdown generation.

This was a targeted review, not an exhaustive browser/device or assistive-technology certification. No fresh performance score is claimed. The only repository addition from this pass is this review/brief document.
