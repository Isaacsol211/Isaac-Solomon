<script lang="ts">
	import ArticleChrome from '$lib/components/ArticleChrome.svelte';
	import NextArticle from '$lib/components/NextArticle.svelte';
	import CaseSummary from '$lib/components/CaseSummary.svelte';
	import EvidenceTable from '$lib/components/EvidenceTable.svelte';

	const title = 'The Scroll Problem — Isaac Solomon';
	const description =
		'How we built a scroll-driven animation site for India\'s fastest-growing premium smart home brand — and why we threw away the first approach.';
</script>

<ArticleChrome {title} {description} path="/writing/keus" image="/writing/keus/hero.png" />

<main id="main" class="px-5 pb-24 sm:px-8">

	<!-- ── Hero ──────────────────────────────────────────────────────── -->
	<div class="mx-auto max-w-3xl pt-14 md:pt-20">

		<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent-text">
			Case Study · Keus
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight lowercase md:text-6xl">
			The Scroll<br />
			<em class="font-serif font-normal italic text-dim">Problem.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How we built a scroll-driven animation site for India's fastest-growing premium smart home brand —
			and why we threw away the first approach after the proof of concept.
		</p>

		<CaseSummary href="/writing/keus" />

		<!-- payoff teaser -->
		<div class="mt-10 rounded-xl border border-line bg-paper-2/60 px-6 py-5">
			<p class="text-sm leading-relaxed text-dim">
				<strong class="font-medium text-ink">The result:</strong> a scroll-driven product showcase
				for a premium smart home brand deployed in 1,500+ luxury residences — built on SvelteKit and GSAP,
				after pivoting from image-sequence scrubbing to a video pause-and-play system that cut
				page weight from hundreds of megabytes of frames down to about 12 MB, most of it video.
			</p>
		</div>
	</div>

	<!-- ── Hero screenshot ─────────────────────────────────────────── -->
	<div class="mx-auto mt-12 max-w-5xl">
		<div class="overflow-hidden rounded-xl border border-accent/30 shadow-[0_16px_32px_-16px_rgba(20,19,17,0.15)]">
			<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
				<span class="size-2 rounded-full bg-[#ff5f57]"></span>
				<span class="size-2 rounded-full bg-[#febc2e]"></span>
				<span class="size-2 rounded-full bg-[#28c840]"></span>
				<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
					keus.in
				</span>
			</div>
			<img
				src="/writing/keus/hero.webp"
				alt="Keus homepage — Smart is the new home, scroll-driven hero with luxury residence backdrop"
				width="1440"
				height="900"
				class="w-full object-cover object-top"
				loading="eager"
			/>
		</div>
		<p class="mt-3 text-center text-xs text-dim">The homepage hero — every section below unfolds through scroll-driven video sequences.</p>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				Keus makes smart home systems. Not the hobbyist kind — the kind that goes into
				luxury residences, where a single console controls every light, curtain, climate zone
				and media device in the house. Founded in 2017 by the team behind Beam Fiber
				(India's 4th largest broadband company), they've deployed in over 1,500 premium homes
				across India and position themselves as the country's fastest-growing smart home company
				in the premium residential segment.
			</p>

			<p>
				The brief was to build a site that showcased Keus's product ecosystem through
				scroll-driven animations — the kind of experience where you scroll and the product
				comes alive in front of you. Video sequences, smooth transitions, layered reveals.
				Every section a choreographed moment.
			</p>

			<p>
				It sounded straightforward. It wasn't.
			</p>

			<h2>The design that didn't fit</h2>

			<p>
				The initial designs came from a designer who was thinking in fullscreen. Every comp
				assumed a big display — a TV-sized viewport, edge to edge, no browser chrome.
				The animations were cinematic. The layouts were immersive. On a 27-inch monitor
				in a presentation deck, they looked incredible.
			</p>

			<p>
				The problem: you can't dictate how someone opens their browser. Most of your visitors
				are on a laptop with a toolbar, a bookmarks bar, and DevTools docked to the side.
				Plenty are on a phone. The fullscreen fantasy doesn't survive contact with real viewports.
			</p>

			<p>
				So we went back. The team at
				<a href="https://www.able.do" target="_blank" rel="noopener noreferrer">Able.do</a>
				worked directly with Keus's in-house
				design team to rethink the approach. Not to water down the vision, but to make it work
				in a browser — at any size, on any device. That meant working through layouts and scroll
				sequences together, breakpoint by breakpoint, rather than trading files and waiting a
				day for each answer.
			</p>

		</div>

		<!-- product pages grid -->
		<div class="not-prose my-10 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100vw-3rem)] lg:max-w-[100rem]">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">The product ecosystem — each page its own scroll story</p>
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<div class="overflow-hidden rounded-xl border border-line">
						<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
							<span class="size-2 rounded-full bg-[#ff5f57]"></span>
							<span class="size-2 rounded-full bg-[#febc2e]"></span>
							<span class="size-2 rounded-full bg-[#28c840]"></span>
							<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
								keus.in/smart-console
							</span>
						</div>
						<img
							src="/writing/keus/console.webp"
							alt="Smart Console page — Beautiful meets beautiful, with warm interior photography"
							width="1440"
							height="900"
							class="w-full object-cover object-top"
							loading="lazy"
						/>
					</div>
					<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim/60">Smart Console — fully integrated switch system</p>
				</div>
				<div>
					<div class="overflow-hidden rounded-xl border border-line">
						<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
							<span class="size-2 rounded-full bg-[#ff5f57]"></span>
							<span class="size-2 rounded-full bg-[#febc2e]"></span>
							<span class="size-2 rounded-full bg-[#28c840]"></span>
							<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
								keus.in/scene-wizard
							</span>
						</div>
						<img
							src="/writing/keus/wizard.webp"
							alt="Scene Wizard page — True mobility, portable room controller floating above a hand"
							width="1440"
							height="900"
							class="w-full object-cover object-top"
							loading="lazy"
						/>
					</div>
					<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim/60">Scene Wizard — portable room controller</p>
				</div>
			</div>
		</div>

		<div class="prose">

			<h2>The first approach: image scrubbing</h2>

			<p>
				The plan was clean on paper. Take each product video, extract it into individual frames,
				and scrub through them on scroll. As the user scrolls down, the images advance frame by
				frame — like a flipbook tied to the scroll position. It's a technique you see on
				high-end product sites. Apple uses it. It feels premium. We built a proof of concept
				and it worked beautifully.
			</p>

			<p>
				Then we looked at the numbers.
			</p>

		</div>

		<!-- the numbers callout -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent-text">The Math</p>
				<p class="mt-1 font-medium tracking-tight">Why image scrubbing didn't scale.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: 'Each video produced hundreds of frames — the longest, 1,440' },
					{ n: '02', q: 'Each page had ~10 scroll-driven video sections' },
					{ n: '03', q: 'That\'s thousands of images per page' },
				] as item}
					<div class="flex items-baseline gap-5 py-4">
						<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">{item.n}</span>
						<span class="text-sm font-medium">{item.q}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="prose">

			<p>
				The videos Keus provided were high quality — product animations showing consoles
				transforming, lights shifting, curtains drawing. Beautiful footage. But when you
				extract those to individual frames for scroll scrubbing, each video produces
				hundreds of images — the longest clip we were given ran a minute, which at 24 fps is
				1,440 frames on its own. And each page had around ten of these scroll-driven sections.
			</p>

			<p>
				Do the maths: thousands of images on a single page. Even aggressively compressed, that's
				a page weight in the hundreds of megabytes — over a gigabyte at retina sizes. Loading frames per
				section helps, but nothing makes that work on a mid-range phone. The POC looked great on a developer's MacBook Pro.
				It would have melted any real user's device.
			</p>

			<p>
				The approach had to change.
			</p>

			<h2>Back to the board: video pause and play</h2>

			<p>
				We rethought the interaction model.
				Instead of scrubbing through thousands of static frames, we'd use the actual videos —
				but controlled by scroll position.
			</p>

			<p>
				Here's how it works: you scroll, the video plays for a couple of seconds, then pauses.
				You scroll again, it continues. When that section's video finishes, the next section
				begins. The scroll controls the pacing, but the browser plays real video — hardware-decoded,
				compressed, streamed. No thousands of images sitting in memory.
			</p>

		</div>

		<!-- approach comparison -->
		<EvidenceTable
			eyebrow="The Pivot"
			title="Image scrubbing vs. video pause-and-play."
			rows={[
					{ label: 'Assets per section', before: 'Hundreds of images, up to 1,440', after: '1 compressed video' },
					{ label: 'Total assets per page', before: 'Thousands of frames', after: '~10 video files' },
					{ label: 'Page weight', before: 'Hundreds of MB to over a GB', after: '~12 MB' },
					{ label: 'Memory pressure', before: 'Thousands of decoded frames in memory', after: 'Single video element per section' },
					{ label: 'Decoding', before: 'Per-frame image decode + canvas draw', after: 'Hardware video decoder' },
					{ label: 'Device compatibility', before: 'High-end only', after: 'Works on most devices' },
			]}
		/>

		<div class="prose">

			<p>
				The trade-off was smoothness. Image scrubbing gives you frame-perfect control —
				the animation is locked to the scroll position at every pixel. Video pause-and-play
				is slightly less precise — there's a brief play duration after each scroll, and the
				video's framerate is the video's framerate, not your scroll speed.
			</p>

			<p>
				But it was worth it. The site actually loads. It runs on real devices.
				And honestly, the slight momentum of the video playback gives the scroll a more
				cinematic feel than frame-perfect scrubbing does. Sometimes the compromise turns
				out to be the better design decision.
			</p>

		</div>

		<!-- Ardeo lighting screenshot -->
		<div class="not-prose my-10 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(64rem,100vw-4rem)]">
			<div class="overflow-hidden rounded-xl border border-line shadow-[0_8px_24px_-8px_rgba(20,19,17,0.12)]">
				<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
					<span class="size-2 rounded-full bg-[#ff5f57]"></span>
					<span class="size-2 rounded-full bg-[#febc2e]"></span>
					<span class="size-2 rounded-full bg-[#28c840]"></span>
					<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
						keus.in/lighting
					</span>
				</div>
				<img
					src="/writing/keus/lighting.webp"
					alt="Ardeo by Keus — bleeding edge technical lights, dark hero with product render"
					width="1440"
					height="900"
					class="w-full object-cover object-top"
					loading="lazy"
				/>
			</div>
			<p class="mt-3 text-xs text-dim">
				Ardeo by Keus — each product line gets its own page with a bespoke scroll sequence.
				The lighting page alone has multiple video-driven reveals.
			</p>
		</div>

		<div class="prose">

			<h2>The stack: SvelteKit and GSAP</h2>

			<p>
				We built the site on <strong>SvelteKit</strong>, deployed on Cloudflare, with
				<strong>GSAP</strong> (GreenSock) and ScrollTrigger for the scroll-driven animation layer
				and Lenis for smooth scrolling.
			</p>

			<p>
				Each section has its own GSAP timeline. When a section's tween completes, it plays the
				video and pauses it again after the remaining length of the clip; scrolling back into a
				section rewinds its video to the start. The videos are muted H.264 MP4s. Desktop sources
				are only attached on screens 768px and wider, and phones get their own cuts, so a phone
				never downloads the desktop footage.
			</p>

			<p>
				Every product page on the Keus site tells a different story — the Smart Console, the
				Scene Wizard, the Hub, the lighting system — and each one has its own scroll sequence,
				its own videos, its own rhythm. The animation system had to be flexible enough to
				support wildly different page structures while keeping the interaction model consistent:
				scroll, play, pause, scroll, continue.
			</p>

			<h2>The weight of beauty</h2>

			<p>
				A scroll-driven video site is never going to score 100 on Lighthouse. That's a
				trade-off you accept when the brief is "make the product feel cinematic." But
				understanding <em>where</em> the weight comes from — and which parts are intentional
				vs. which are solvable — matters.
			</p>

		</div>

		<!-- Lighthouse audit -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-line">
			<div class="grid grid-cols-5 border-b border-line bg-paper-2 px-5 py-2.5 text-[10px] font-medium tracking-[0.2em] uppercase text-dim">
				<span class="col-span-2">Metric</span>
				<span class="text-center">Value</span>
				<span class="col-span-2 text-right">Context</span>
			</div>
			{#each [
				{ label: 'Performance', value: '96', context: 'Median of three runs (80–97)' },
				{ label: 'SEO', value: '92', context: 'Static pages, structured markup' },
				{ label: 'FCP', value: '0.8 s', context: 'Static shell loads fast' },
				{ label: 'LCP', value: '1.1 s', context: 'Hero video poster' },
				{ label: 'TBT', value: '20 ms', context: 'Little main-thread work during load' },
				{ label: 'CLS', value: '0.003', context: 'Near-zero layout shift' },
				{ label: 'Total page weight', value: '11.9 MB', context: '5.8 MB video, 4.3 MB images, 1.8 MB script' },
				{ label: 'DOM size', value: '447', context: 'Lean markup despite visual density' },
				{ label: 'JS execution', value: '0.4 s', context: 'Lightweight runtime' },
			] as row}
				<div class="grid grid-cols-5 items-center border-b border-line/60 px-5 py-3 text-sm last:border-0">
					<span class="col-span-2 text-xs font-medium text-dim">{row.label}</span>
					<span class="text-center font-mono text-xs">{row.value}</span>
					<span class="col-span-2 text-right text-[11px] text-dim/70">{row.context}</span>
				</div>
			{/each}
			<div class="border-t border-line bg-paper-2/60 px-5 py-2.5 text-[10px] leading-relaxed text-dim">
				Lighthouse 12.8, desktop preset — keus.in homepage, 19 September 2026. Median of three runs.
			</div>
		</div>

		<div class="prose">

			<p>
				A 96 on Performance for a video-heavy, scroll-animated site is not where most projects
				like this land. FCP is 0.8 seconds and LCP 1.1, because the hero paints a poster frame
				before any video arrives. Total Blocking Time is 20 ms and CLS is 0.003. JavaScript
				execution takes 0.4 seconds, and the DOM is 447 elements despite the visual density of
				the page. A cold first run scored 80, so the number depends on what is already cached.
			</p>

			<p>
				Most of the weight is media: 5.8 MB of video and 4.3 MB of images out of 11.9 MB.
				Of the 1.8 MB of script, only 67 KB is the site's own; the rest is tag manager, a chat
				widget and ad pixels. That is the part I would cut next. The application layer itself stays light: small DOM, short JS
				execution, almost no main-thread blocking. GSAP does its work without
				getting in the browser's way. The weight is intentional — it's the cost of the
				cinematic experience the brief demanded — and the video pause-and-play approach is
				what keeps it manageable instead of catastrophic.
			</p>

			<h2>One conversation, not a handoff</h2>

			<p>
				The Keus project wasn't just a technical challenge — it was a collaboration challenge.
				The client had an in-house design team with strong opinions. We had years of web
				design experience and strong opinions of our own. Making those two sets of opinions
				work together meant long sessions, deep reviews, and the kind of honest back-and-forth
				that only happens when both sides actually care about the outcome.
			</p>

			<p>
				The best decisions came out of working through the detail together instead of trading
				files. Does this transition feel right? Is this scroll section too long? Does the video
				need trimming, or does the trigger point need to move? Those are quick questions to
				settle in a shared review and expensive ones to settle over a week of comments.
			</p>

			<p>
				That kind of collaboration — where the designer, the client, and the developer are
				all in the same conversation — produces better work than any handoff ever could.
			</p>

			<h2>What I'd improve next</h2>

			<ul>
				<li>Lazy video streaming — only buffer the section the user is approaching, not the entire page's video set. The single biggest performance win available.</li>
				<li>Modern image formats — 2.3 MB of savings sitting on the table by converting to WebP/AVIF.</li>
				<li>Reduced-motion alternative — a static version for users who prefer less animation, with key frames shown as images instead.</li>
				<li>Better mobile scroll handling — touch scroll on phones has different momentum curves than trackpad/mouse wheel; the pause timing could adapt.</li>
				<li>Video codec upgrade — AV1 behind an H.264 fallback (multiple <code>&lt;source&gt;</code> elements) could cut file sizes by 30–50% at the same visual quality; Safari's AV1 support is hardware-gated, so the fallback is not optional.</li>
				<li>Accessibility pass — contrast ratios, keyboard navigation through scroll sections, and screen reader support for the video-driven content.</li>
			</ul>

		</div>

		<!-- footer -->
		<NextArticle href="/writing/godrej" />

		<div class="mt-16 flex items-center justify-between border-t border-line pt-8">
			<a
				href="/"
				class="group flex items-center gap-2 text-sm font-medium text-dim transition-colors hover:text-ink"
			>
				<span class="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
				Back to portfolio
			</a>
			<a
				href="https://www.keus.in"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-accent transition-opacity hover:opacity-70"
			>
				Visit keus.in ↗
			</a>
		</div>
	</article>
</main>

<style>
	.prose {
		color: var(--color-ink);
		line-height: 1.78;
		font-size: 1.0625rem;
	}

	.prose p {
		margin-top: 1.5em;
	}

	.prose p:first-child {
		margin-top: 0;
	}

	.prose h2 {
		margin-top: 2.75em;
		margin-bottom: 0.6em;
		font-size: 1.375rem;
		font-weight: 500;
		letter-spacing: -0.01em;
	}

	.prose ul {
		margin-top: 1.25em;
		margin-bottom: 1.25em;
		padding-left: 1.5em;
		list-style: none;
	}

	.prose ul li {
		position: relative;
		margin-top: 0.6em;
		color: var(--color-dim);
	}

	.prose ul li::before {
		content: '—';
		position: absolute;
		left: -1.5em;
		color: var(--color-accent-text);
		font-weight: 500;
	}

	.prose a {
		color: var(--color-accent-text);
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--color-accent-text) 35%, transparent);
		text-underline-offset: 3px;
		transition: text-decoration-color 0.2s;
	}

	.prose a:hover {
		text-decoration-color: var(--color-accent-text);
	}

	.prose em {
		font-family: var(--font-serif);
		font-style: italic;
		color: var(--color-dim);
	}

	.prose strong {
		font-weight: 600;
	}
</style>
