<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import NextArticle from '$lib/components/NextArticle.svelte';

	const title = 'The Scroll Problem — Isaac Solomon';
	const description =
		'How we built a scroll-driven animation site for India\'s fastest-growing smart home brand — and why we threw away the first approach at 3 AM.';
	const canonical = `${site.url}/writing/keus`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<!-- markdown twin for agents — see /llms.txt -->
	<link rel="alternate" type="text/markdown" href="{canonical}.md" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/writing/keus/hero.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}/writing/keus/hero.png" />
</svelte:head>

<!-- back nav -->
<header class="border-b border-line px-5 py-4 sm:px-8">
	<div class="mx-auto flex max-w-3xl items-center justify-between">
		<a
			href="/"
			class="group flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-dim transition-colors hover:text-ink"
		>
			<span class="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
			Isaac Solomon
		</a>
		<div class="flex items-center gap-3">
			<span class="text-xs font-medium tracking-[0.2em] uppercase text-dim">Writing</span>
			<ThemeToggle />
		</div>
	</div>
</header>

<main id="main" class="px-5 pb-24 sm:px-8">

	<!-- ── Hero ──────────────────────────────────────────────────────── -->
	<div class="mx-auto max-w-3xl pt-14 md:pt-20">

		<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">
			Case Study · Keus
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			The Scroll<br />
			<em class="font-serif font-normal italic text-dim">Problem.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How we built a scroll-driven animation site for India's fastest-growing smart home brand —
			and why we threw away the first approach at 3 AM.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>2024</span>
			<span class="h-3 w-px bg-line"></span>
			<span>Smart Home · Premium</span>
			<span class="h-3 w-px bg-line"></span>
			<span>11ty · GSAP</span>
			<span class="h-3 w-px bg-line"></span>
			<a href="https://www.keus.in" target="_blank" rel="noopener noreferrer"
				class="text-accent transition-opacity hover:opacity-70">
				keus.in ↗
			</a>
		</div>

		<!-- payoff teaser -->
		<div class="mt-10 rounded-xl border border-line bg-paper-2/60 px-6 py-5">
			<p class="text-sm leading-relaxed text-dim">
				<strong class="font-medium text-ink">The result:</strong> a scroll-driven product showcase
				for a premium smart home brand deployed in 1,500+ luxury residences — built on 11ty and GSAP,
				after pivoting from image-sequence scrubbing to a video pause-and-play system that cut
				page weight from gigabytes of frames down to manageable video files.
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
				The problem: you can't dictate how someone opens their browser. Half your visitors
				are on a laptop with a toolbar, a bookmarks bar, and DevTools docked to the side.
				A third are on a phone. The fullscreen fantasy doesn't survive contact with real viewports.
			</p>

			<p>
				So we went back. The team at
				<a href="https://www.able.do" target="_blank" rel="noopener noreferrer">Able.do</a>
				brought years of design expertise to the table and worked directly with Keus's in-house
				design team to rethink the approach. Not to water down the vision, but to make it work
				in a browser — at any size, on any device. That collaboration meant late-night calls,
				sometimes running past 3 AM, iterating on layouts and scroll sequences until
				they felt right at every breakpoint.
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
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Math</p>
				<p class="mt-1 font-medium tracking-tight">Why image scrubbing didn't scale.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: 'Each video produced 300–500 individual frames' },
					{ n: '02', q: 'Each page had ~10 scroll-driven video sections' },
					{ n: '03', q: 'That\'s 3,000–5,000 images per page — gigabytes of assets' },
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
				300 to 500 images. And each page had around ten of these scroll-driven sections.
			</p>

			<p>
				Do the maths: 5,000 images on a single page. Even aggressively compressed, that's
				a page weight measured in gigabytes. No lazy-loading strategy in the world makes that
				work on a mid-range phone. The POC looked great on a developer's MacBook Pro.
				It would have melted any real user's device.
			</p>

			<p>
				The approach had to change.
			</p>

			<h2>Back to the board: video pause and play</h2>

			<p>
				We went back to the drawing board and rethought the interaction model from scratch.
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
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">The Pivot</p>
				<p class="mt-1 font-medium tracking-tight">Image scrubbing vs. video pause-and-play.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ metric: 'Assets per section', before: '300–500 images', after: '1 compressed video' },
					{ metric: 'Total assets per page', before: '~5,000 frames', after: '~10 video files' },
					{ metric: 'Page weight', before: 'Gigabytes', after: 'Tens of megabytes' },
					{ metric: 'Memory pressure', before: 'Thousands of images in DOM', after: 'Single video element per section' },
					{ metric: 'Decoding', before: 'CPU (canvas/image swap)', after: 'Hardware video decoder' },
					{ metric: 'Device compatibility', before: 'High-end only', after: 'Works on most devices' },
				] as row}
					<div class="grid grid-cols-3 gap-2 px-6 py-3.5 text-sm">
						<span class="text-xs font-medium tracking-wide text-cream/50">{row.metric}</span>
						<span class="font-mono text-xs text-cream/35 line-through">{row.before}</span>
						<span class="font-mono text-xs text-[#86d993]">{row.after}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="prose">

			<p>
				The trade-off was smoothness. Image scrubbing gives you frame-perfect control —
				the animation is locked to the scroll position at every pixel. Video pause-and-play
				is slightly less precise — there's a brief play duration after each scroll, and the
				video's framerate is the video's framerate, not your scroll speed.
			</p>

			<p>
				But the trade-off was worth it. The site actually loads. It runs on real devices.
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

			<h2>The stack: 11ty and GSAP</h2>

			<p>
				We built the site on <strong>11ty</strong> (Eleventy) for static generation and
				<strong>GSAP</strong> (GreenSock) for the scroll-driven animation layer.
			</p>

			<p>
				11ty was the right choice for this kind of site — mostly static content, no client-side
				routing needed, just fast-loading pages with heavy animation work on top. GSAP's
				ScrollTrigger plugin handled the scroll-to-video binding: detecting scroll position,
				triggering video play/pause, coordinating transitions between sections, and managing
				the timeline of each page's choreography.
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
				{ label: 'Performance', value: '97', context: 'Video-heavy site, lean code' },
				{ label: 'SEO', value: '92', context: 'Static pages, structured markup' },
				{ label: 'FCP', value: '2.6 s', context: 'Static shell loads fast' },
				{ label: 'LCP', value: '3.2 s', context: 'Hero video / image' },
				{ label: 'TBT', value: '0 ms', context: 'GSAP doesn\'t block main thread' },
				{ label: 'CLS', value: '0.012', context: 'Near-zero layout shift' },
				{ label: 'Total page weight', value: '11.2 MB', context: 'Driven by video assets' },
				{ label: 'DOM size', value: '423', context: 'Lean markup despite visual density' },
				{ label: 'JS execution', value: '0.4 s', context: 'Lightweight runtime' },
			] as row}
				<div class="grid grid-cols-5 items-center border-b border-line/60 px-5 py-3 text-sm last:border-0">
					<span class="col-span-2 text-xs font-medium text-dim">{row.label}</span>
					<span class="text-center font-mono text-xs">{row.value}</span>
					<span class="col-span-2 text-right text-[11px] text-dim/70">{row.context}</span>
				</div>
			{/each}
			<div class="border-t border-line bg-paper-2/60 px-5 py-2.5 text-[10px] leading-relaxed text-dim">
				Lighthouse desktop audit — keus.in homepage.
			</div>
		</div>

		<div class="prose">

			<p>
				A 97 on Performance for a video-heavy, scroll-animated site is not where most projects
				like this land. Look at the breakdown: FCP at 2.6 seconds, LCP at 3.2 — both
				reasonable for a page that loads multiple video assets. Total Blocking Time is zero.
				CLS is 0.012 — near-perfect layout stability. The JavaScript execution clocks in at
				just 0.4 seconds, and the DOM is only 423 elements despite the visual density of the page.
			</p>

			<p>
				The site isn't heavy because of bad code — it's heavy because of video assets.
				That's a fundamentally different problem than a bloated SPA. The application layer is
				lean: small DOM, fast JS, zero main-thread blocking. GSAP does its work without
				getting in the browser's way. The weight is intentional — it's the cost of the
				cinematic experience the brief demanded — and the video pause-and-play approach is
				what keeps it manageable instead of catastrophic.
			</p>

			<h2>Working at 3 AM</h2>

			<p>
				The Keus project wasn't just a technical challenge — it was a collaboration challenge.
				The client had an in-house design team with strong opinions. We had years of web
				design experience and strong opinions of our own. Making those two sets of opinions
				work together meant long sessions, deep reviews, and the kind of honest back-and-forth
				that only happens when both sides actually care about the outcome.
			</p>

			<p>
				Some of the best decisions came out of the late-night calls. When you're on a call
				at 3 AM, nobody's performing. There's no posturing. You're just trying to solve the
				problem — does this transition feel right? Is this scroll section too long? Does the
				video need to be trimmed, or does the trigger point need to move?
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
				<li>Video codec upgrade — AV1 could cut video file sizes by 30-50% without visible quality loss, if browser support allows.</li>
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
		color: var(--color-accent);
		font-weight: 500;
	}

	.prose a {
		color: var(--color-accent);
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--color-accent) 35%, transparent);
		text-underline-offset: 3px;
		transition: text-decoration-color 0.2s;
	}

	.prose a:hover {
		text-decoration-color: var(--color-accent);
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
