<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const title = 'Shipping at Launch Speed — Isaac Solomon';
	const description =
		'How I built and evolved the frontend for India\'s biggest audio brand — 3-4 product launches a day, a platform migration mid-flight, and a design system that emerged from the pressure.';
	const canonical = `${site.url}/writing/mivi`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/projects/mivi-desktop.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}/projects/mivi-desktop.png" />
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
			Case Study · Mivi
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			Shipping at<br />Launch
			<em class="font-serif font-normal italic text-dim">Speed.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How I built and evolved the frontend for India's biggest audio brand —
			where 3-4 products launched in a single day, and I had two days to keep the pages ready.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>2018 – Present</span>
			<span class="h-3 w-px bg-line"></span>
			<span>E-Commerce · Audio</span>
			<span class="h-3 w-px bg-line"></span>
			<span>Custom CMS · Apex Platform</span>
			<span class="h-3 w-px bg-line"></span>
			<a href="https://www.mivi.in" target="_blank" rel="noopener noreferrer"
				class="text-accent transition-opacity hover:opacity-70">
				mivi.in ↗
			</a>
		</div>

		<!-- payoff teaser -->
		<div class="mt-10 rounded-xl border border-line bg-paper-2/60 px-6 py-5">
			<p class="text-sm leading-relaxed text-dim">
				<strong class="font-medium text-ink">The result:</strong> a fully componentised e-commerce storefront
				serving 100,000+ customers, migrated mid-flight from an open-source platform to a proprietary one,
				with a design system that evolved through dozens of product launches
				because the pace left no room for anything that didn't scale.
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
					mivi.in
				</span>
			</div>
			<img
				src="/projects/mivi-desktop.png"
				alt="Mivi storefront hero — Immerse in Studio Quality Sound, with a model wearing true wireless earbuds"
				width="1440"
				height="600"
				style="view-transition-name: project-mivi"
				class="w-full object-cover object-top"
				loading="eager"
			/>
		</div>
		<p class="mt-3 text-center text-xs text-dim">The Mivi storefront — every section CMS-driven, every page componentised.</p>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				I've been the frontend developer on Mivi since the beginning. Not "since the redesign"
				or "since the migration" — since the first product page went live.
			</p>

			<p>
				Mivi is India's first audio manufacturing tech brand. Bluetooth speakers, earbuds, neckbands,
				mobile accessories — all designed, manufactured and sold out of India. They're not a reseller
				with a logo. They make the product. And when I joined the project at
				<a href="https://www.able.do" target="_blank" rel="noopener noreferrer">Able.do</a>,
				they were growing faster than any storefront could comfortably keep up with.
			</p>

			<h2>The pace</h2>

			<p>
				There were days when Mivi would launch three or four products in a single day. Not variants —
				entirely new products, each with its own specs, its own photography, its own story
				to tell. And the turnaround? Two days. Sometimes less.
			</p>

			<p>
				That's the rhythm I built inside for years. A product brief lands, you get the assets,
				you build the page, you test it, it ships. Then the next one lands. There's no sprint planning
				for this — there's just a pipeline that either keeps up or doesn't.
			</p>

			<p>
				Being the frontend developer at that pace means you stop thinking in pages and start thinking
				in systems. You can't hand-craft every product page when four of them need to exist by Thursday.
				The system has to do the work, or you drown.
			</p>

		</div>

		<!-- pace callout -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Rhythm</p>
				<p class="mt-1 font-medium tracking-tight">What "launch speed" actually looked like.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: '3–4 new products launched in a single day' },
					{ n: '02', q: '2-day turnaround from brief to live page' },
					{ n: '03', q: 'Every product page custom — not a template with swapped images' },
				] as item}
					<div class="flex items-baseline gap-5 py-4">
						<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">{item.n}</span>
						<span class="text-sm font-medium">{item.q}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="prose">

			<h2>Open source to Apex</h2>

			<p>
				The site started on an open-source e-commerce platform. It worked — until it didn't.
				When you're processing thousands of orders, managing shipping flows, running influencer campaigns,
				and trying to give each product its own personality on the frontend, the limits of a
				general-purpose platform start showing up fast.
			</p>

			<p>
				The team at Able.do had been building a proprietary platform called Apex. Purpose-built for
				the kind of creative flexibility Mivi's product pages demanded — and the kind of operational
				scale their backend needed. The migration wasn't a rewrite from scratch. It was more like
				lifting the entire storefront off one set of rails and setting it down on another, while the
				store stayed open.
			</p>

			<p>
				My job was the frontend side of that lift. Rebuilding the component layer, the product page
				templates, the cart, the checkout flow — all on the new platform — while making sure customers
				never noticed the switch. The design didn't change. The architecture underneath it did.
			</p>

		</div>

		<!-- platform comparison -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">The Migration</p>
				<p class="mt-1 font-medium tracking-tight">What changed under the hood.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ metric: 'Product pages', before: 'Template-driven', after: 'Fully custom per product' },
					{ metric: 'CMS flexibility', before: 'Plugin-dependent', after: 'Built for the content team' },
					{ metric: 'Frontend architecture', before: 'Theme layer', after: 'Componentised from scratch' },
					{ metric: 'Analytics & campaigns', before: 'Third-party bolted on', after: 'Native tracking + attribution' },
					{ metric: 'Customer base', before: 'Outgrowing the platform', after: '100,000+ managed natively' },
					{ metric: 'Order processing', before: 'Bottlenecked at scale', after: '10,000+ orders (and growing)' },
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

			<h2>The design evolutions</h2>

			<p>
				I'd call them evolutions, not redesigns. A redesign implies you throw things away.
				What happened with Mivi was more organic — each iteration grew out of the last one
				because the pace demanded it.
			</p>

			<p>
				The first product pages were bespoke. Custom layouts, hand-placed elements, one-off animations.
				They looked good, but they took too long to build. When you're shipping three pages a day,
				"bespoke" is a luxury you can't afford.
			</p>

			<p>
				So the system evolved. Layouts got componentised. Typography became systematic.
				Animations turned into reusable patterns instead of one-off flourishes. The design didn't get
				simpler — it got more disciplined. Every product page still felt distinct, but the bones
				underneath were shared.
			</p>

			<p>
				That's the thing about building under pressure: you don't plan a design system, you
				<em>discover</em> one. Each sprint, each late-night product page, each "we need this live
				by morning" — they all carved the system into shape. The constraints did the design work
				that a committee never could.
			</p>

		</div>

		<!-- evolution milestones -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Evolutions</p>
				<p class="mt-1 font-medium tracking-tight">How the frontend matured — not by plan, but by pressure.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: 'Bespoke pages — beautiful, but too slow to ship at volume' },
					{ n: '02', q: 'Shared layout primitives — same grid, different personality per product' },
					{ n: '03', q: 'Componentised animations — reusable motion patterns, not one-off flourishes' },
					{ n: '04', q: 'CMS-driven content — the team could launch pages without touching code' },
				] as item}
					<div class="flex items-baseline gap-5 py-4">
						<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">{item.n}</span>
						<span class="text-sm font-medium">{item.q}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- full-page tour -->
		<div class="not-prose my-12">
			<div class="page-tour group overflow-hidden rounded-xl border border-line shadow-[0_16px_32px_-16px_rgba(20,19,17,0.15)]">
				<div class="flex items-center justify-between border-b border-line bg-paper-2 px-3 py-2">
					<div class="flex items-center gap-1.5">
						<span class="size-2 rounded-full bg-[#ff5f57]"></span>
						<span class="size-2 rounded-full bg-[#febc2e]"></span>
						<span class="size-2 rounded-full bg-[#28c840]"></span>
						<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
							mivi.in — homepage
						</span>
					</div>
					<span class="hidden text-[9px] font-medium tracking-[0.2em] uppercase text-dim sm:block">
						Hover to tour ↓
					</span>
				</div>
				<div class="tour-viewport">
					<img
						src="/projects/mivi-page.png"
						alt="Full Mivi homepage — hero banner, true wireless earbuds, deal of the day, wireless speakers, new launches, smart phone chargers and customer reviews"
						width="843"
						height="4096"
						loading="lazy"
					/>
				</div>
			</div>
			<p class="mt-3 text-center text-xs text-dim">
				The whole homepage, one component system — hover (or scroll) to walk the full page.
			</p>
		</div>

		<div class="prose">

			<h2>The frontend stack</h2>

			<p>
				The final system — what Mivi runs on today — is a fully custom frontend on the Apex platform.
				Every piece was built to solve a real problem that showed up at scale:
			</p>

			<ul>
				<li>A componentised UI library that let each product page feel unique while sharing structure underneath.</li>
				<li>Dynamic product pages the content team could manage without a developer — specs, images, copy, all CMS-driven.</li>
				<li>A live cart and checkout flow that handled flash sale traffic without falling over.</li>
				<li>Transactional mailers — order confirmations, shipping updates, return flows — all templated and branded.</li>
				<li>Mobile-first from day one, because Mivi's customers are largely on mid-range Android devices. If it didn't work on a ₹12,000 phone, it didn't work.</li>
			</ul>

			<p>
				The site serves two languages worth of product content across dozens of SKUs, handles
				campaigns, discount codes, and influencer attribution — and the content team runs it
				day-to-day without engineering support. That's the real measure of whether a system works:
				can the people who aren't developers use it without calling one?
			</p>

			<h2>What I learned</h2>

			<p>
				Eight years on one product teaches you things that project-hopping doesn't.
				You see the consequences of your early decisions. You live with the shortcuts.
				You learn that the component you built in a hurry at 2am is the one you'll be
				maintaining for the next three years.
			</p>

			<p>
				The biggest lesson: speed and quality aren't opposites. They're the same discipline.
				When you have two days to ship a product page, you can't afford to be sloppy —
				sloppy means rework, and rework means you miss the next launch. The pace forced
				the code to be clean, the components to be reusable, the system to be predictable.
				Not because anyone mandated it. Because the alternative was drowning.
			</p>

			<h2>What I'd improve next</h2>

			<ul>
				<li>Performance audit on the heaviest product pages — image optimisation, lazy loading, bundle analysis.</li>
				<li>Structured data (JSON-LD) for every product — Mivi's search presence could be stronger.</li>
				<li>A shared animation library with reduced-motion support baked in.</li>
				<li>Better preview tooling for the content team — let them see exactly what a page looks like before it goes live.</li>
				<li>Accessibility pass across the full checkout flow — screen readers, keyboard nav, focus management.</li>
			</ul>

		</div>

		<!-- footer -->
		<div class="mt-16 flex items-center justify-between border-t border-line pt-8">
			<a
				href="/"
				class="group flex items-center gap-2 text-sm font-medium text-dim transition-colors hover:text-ink"
			>
				<span class="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
				Back to portfolio
			</a>
			<a
				href="https://www.mivi.in"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-accent transition-opacity hover:opacity-70"
			>
				Visit mivi.in ↗
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

	/* Full-page tour — tall screenshot pans on hover, scrolls natively on touch */
	.tour-viewport {
		height: 32rem;
		overflow: hidden;
	}
	.tour-viewport img {
		display: block;
		width: 100%;
		height: auto;
	}
	@media (hover: hover) {
		.tour-viewport img {
			transition: transform 16s linear;
		}
		.page-tour:hover .tour-viewport img {
			transform: translateY(calc(32rem - 100%));
		}
	}
	@media (hover: none) {
		.tour-viewport {
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.tour-viewport {
			overflow-y: auto;
		}
		.tour-viewport img,
		.page-tour:hover .tour-viewport img {
			transition: none;
			transform: none;
		}
	}
</style>
