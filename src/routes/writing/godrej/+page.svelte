<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const title = 'Building (and Rebuilding) for Godrej Foundation — Isaac Solomon';
	const description =
		'How I built the website and CMS for India\'s oldest philanthropic trust — then rebuilt it when Godrej\'s entire brand identity changed overnight.';
	const canonical = `${site.url}/writing/godrej`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/writing/godrej/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}/writing/godrej/og.png" />
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
			Case Study · Godrej Foundation
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			Built Twice, Shipped<br />
			<em class="font-serif font-normal italic text-dim">Better.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How I built the website and CMS for India's oldest philanthropic trust —
			then rebuilt it when Godrej's entire brand identity changed overnight.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>2024</span>
			<span class="h-3 w-px bg-line"></span>
			<span>Philanthropy · Non-profit</span>
			<span class="h-3 w-px bg-line"></span>
			<span>SvelteKit · Tailwind · Custom CMS</span>
			<span class="h-3 w-px bg-line"></span>
			<a href="https://www.godrejfoundation.com" target="_blank" rel="noopener noreferrer"
				class="text-accent transition-opacity hover:opacity-70">
				godrejfoundation.com ↗
			</a>
		</div>

		<!-- payoff teaser -->
		<div class="mt-10 rounded-xl border border-line bg-paper-2/60 px-6 py-5">
			<p class="text-sm leading-relaxed text-dim">
				<strong class="font-medium text-ink">The result:</strong> a fully CMS-driven website for Godrej Foundation
				that survived a complete corporate rebrand — rebuilt from new designs in weeks, not months,
				because the CMS architecture was built to flex. The foundation team manages all content independently,
				from grant updates to impact reports, without touching code.
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
					godrejfoundation.com
				</span>
			</div>
			<img
				src="/writing/godrej/hero.png"
				alt="Godrej Foundation homepage — Crafting a Prosperous Tomorrow, with hero image of hands reaching toward the sky"
				width="1440"
				height="900"
				class="w-full object-cover object-top"
				loading="eager"
			/>
		</div>
		<p class="mt-3 text-center text-xs text-dim">The current homepage — post-rebrand, with the new Godrej identity.</p>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				Godrej Foundation is an independent philanthropic trust that works on crafting a more prosperous
				India. With a 15 percent shareholding in the Godrej Industries Group, it's one of the oldest
				and most respected foundations in the country — dedicated to strengthening economic growth,
				advancing inclusion, and backing bold ideas through their Tomorrow Grants programme.
			</p>

			<p>
				The brief was to build a website and a content management system that the foundation team
				could run themselves. Not a marketing site — a living platform for reporting impact,
				publishing grant updates, managing partner profiles, and telling the foundation's story
				in a way that matched the weight of the work.
			</p>

			<h2>v1 — The first build</h2>

			<p>
				The first iteration was designed by
				<a href="https://3sided.co.in/" target="_blank" rel="noopener noreferrer">3 Sided Coin</a>
				— an award-winning design studio whose work includes a Webby Honoree for FiftyTwo magazine
				and the iPad App of the Year for Froggipedia. They've designed for Flipkart, Microsoft, and
				Urban Company. When 3 Sided Coin hands you a design system, you pay attention.
			</p>

			<p>
				Their design for Godrej Foundation was clean, editorial, and built around the old Godrej identity.
				Warm tones, full-width imagery, and a layout that let the foundation's work speak for itself.
				A large banyan tree dominated the hero — grounded, enduring, a visual metaphor for the kind of
				institution Godrej Foundation is.
			</p>

			<p>
				I built the entire frontend from their designs and wired it up to a custom CMS personalised for
				the foundation's workflow. Every page, every section, every content block — editable by
				the team without a developer in the loop.
			</p>

		</div>

		<!-- CMS features callout -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The CMS</p>
				<p class="mt-1 font-medium tracking-tight">What the foundation team can manage on their own.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: 'Grant updates and Tomorrow Grants programme content' },
					{ n: '02', q: 'Partner profiles with logos, descriptions, and links' },
					{ n: '03', q: 'Impact reports and measuring-impact data' },
					{ n: '04', q: 'Blog posts and latest stories' },
					{ n: '05', q: 'Team profiles and organisational pages' },
					{ n: '06', q: 'Areas of work — dynamically structured sections' },
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
				The CMS wasn't an off-the-shelf tool with a Godrej skin on top. It was built from scratch
				to match how the foundation actually works — their content types, their publishing flow,
				their approval structure. When the comms team needs to add a new partner or publish
				a grant update, they log in and do it. No tickets, no staging environments, no waiting.
			</p>

			<h2>The rebrand</h2>

			<p>
				Then Godrej rebranded.
			</p>

			<p>
				Not a colour tweak — a full corporate identity overhaul. New logo, new typography, new visual
				language, new guidelines. Everything the Godrej group touches had to change, and the foundation
				website was no exception. The design I'd spent months building was suddenly out of date.
			</p>

		</div>

		<!-- Before / After comparison -->
		<div class="not-prose my-10">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">Before & after — the same site, two identities</p>
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<div class="overflow-hidden rounded-xl border border-line">
						<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
							<span class="size-2 rounded-full bg-[#ff5f57]"></span>
							<span class="size-2 rounded-full bg-[#febc2e]"></span>
							<span class="size-2 rounded-full bg-[#28c840]"></span>
							<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
								v1 — old identity
							</span>
						</div>
						<img
							src="/writing/godrej/v1-desktop.png"
							alt="Godrej Foundation v1 — old Godrej branding with banyan tree hero"
							width="1440"
							height="900"
							class="w-full object-cover object-top"
							loading="lazy"
						/>
					</div>
					<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim/60">v1 — designed by 3 Sided Coin, old Godrej identity</p>
				</div>
				<div>
					<div class="overflow-hidden rounded-xl border border-line">
						<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
							<span class="size-2 rounded-full bg-[#ff5f57]"></span>
							<span class="size-2 rounded-full bg-[#febc2e]"></span>
							<span class="size-2 rounded-full bg-[#28c840]"></span>
							<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
								v2 — new identity
							</span>
						</div>
						<img
							src="/writing/godrej/v2-desktop.png"
							alt="Godrej Foundation v2 — new Godrej branding with Crafting a Prosperous Tomorrow hero"
							width="1440"
							height="900"
							class="w-full object-cover object-top"
							loading="lazy"
						/>
					</div>
					<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim/60">v2 — post-rebrand, new Godrej identity</p>
				</div>
			</div>
		</div>

		<div class="prose">

			<p>
				Look at the two side by side. The old version is warm, editorial, text-forward — the banyan tree
				anchoring the page with its roots. The new version is lighter, more modern, with the hands reaching
				toward the sky as the hero motif. Different mood entirely. Same underlying mission, completely
				different visual language.
			</p>

			<h2>v2 — The rebuild</h2>

			<p>
				The second iteration wasn't a reskin. A rebrand at this scale changes the hierarchy of
				information, the rhythm of layouts, the way photography is used. The new Godrej identity
				has a different logo, different type hierarchy, different colour sensibilities. You can't
				just swap the palette and call it done.
			</p>

			<p>
				We rebuilt the frontend from new designs — new component library, new layout system,
				new visual patterns. But here's where the architecture paid off: the CMS didn't have to change.
			</p>

		</div>

		<!-- Migration comparison -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">The Rebuild</p>
				<p class="mt-1 font-medium tracking-tight">What changed between v1 and v2.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ metric: 'Logo & identity', before: 'Old Godrej wordmark', after: 'New Godrej mark + wordmark' },
					{ metric: 'Hero approach', before: 'Banyan tree, editorial', after: 'Hands/sky, aspirational' },
					{ metric: 'Typography', before: 'Previous brand type stack', after: 'New Godrej type system' },
					{ metric: 'Colour palette', before: 'Warm, earthy tones', after: 'Lighter, more modern palette' },
					{ metric: 'Layout system', before: 'Text-forward, classic grid', after: 'Visual-forward, modern grid' },
					{ metric: 'CMS & data model', before: 'Custom, built for Godrej', after: 'Unchanged — same system, new skin' },
					{ metric: 'Content & copy', before: 'Managed by foundation team', after: 'Unchanged — zero migration needed' },
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
				The CMS survived the rebrand untouched. Every piece of content the foundation team had
				created — every partner profile, every grant update, every impact report — carried straight
				over. They didn't have to re-enter a single thing. That's the advantage of separating
				content from presentation early: when the presentation layer has to change, the content
				doesn't care.
			</p>

			<h2>The stack</h2>

			<p>
				Both iterations run on <strong>SvelteKit</strong> with <strong>Tailwind CSS</strong>.
				SvelteKit handles the routing, server-side rendering, and static prerendering.
				Tailwind handles the design system — spacing, typography, colour tokens — making it
				possible to rebuild the visual layer quickly when the rebrand landed.
			</p>

			<p>
				The CMS is a custom build, personalised for how the Godrej Foundation operates.
				It's not WordPress with custom fields, and it's not a headless CMS with a generic
				content model. It's a tool built specifically for this team — their content types,
				their publishing patterns, their organisational structure. That specificity is what
				made the rebrand migration so clean: the content model was designed around the foundation's
				work, not the visual design.
			</p>

			<h2>What I learned</h2>

			<ul>
				<li>Separate content from presentation as early as possible. When you build a CMS around the content model instead of the visual design, you can survive a rebrand without migrating data.</li>
				<li>Working from a strong design — like 3 Sided Coin's v1 — sets the bar. It forces you to build well because the design demands it.</li>
				<li>Building something twice teaches you what actually mattered the first time. The second iteration was faster and cleaner because the hard decisions were already made.</li>
				<li>A rebrand isn't a disaster if the architecture is right. It's a frontend rebuild, not a platform rebuild. The difference is weeks vs. months.</li>
				<li>Non-technical teams will actually use a CMS if it matches their mental model. Generic tools get abandoned; personalised tools get adopted.</li>
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
				href="https://www.godrejfoundation.com"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-accent transition-opacity hover:opacity-70"
			>
				Visit godrejfoundation.com ↗
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

	.prose code {
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace;
		font-size: 0.875em;
		background: var(--color-paper-2);
		border: 1px solid var(--color-line);
		border-radius: 4px;
		padding: 0.15em 0.4em;
	}
</style>
