<script lang="ts">
	import { site } from '$lib/content';

	const title = 'Building Without a Brief — Isaac Solomon';
	const description =
		'What it actually means to design a static website when there is no designer in the room. A case study from the Nova Rock Tools project.';
	const canonical = `${site.url}/writing/novarock`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/writing/novarock/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}/writing/novarock/og.png" />
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
		<span class="text-xs font-medium tracking-[0.2em] uppercase text-dim">Writing</span>
	</div>
</header>

<main class="px-5 pb-24 sm:px-8">

	<!-- ── Hero ──────────────────────────────────────────────────────── -->
	<div class="mx-auto max-w-3xl pt-14 md:pt-20">

		<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">
			Case Study · Nova Rock Tools
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			Building<br />Without a
			<em class="font-serif font-normal italic text-dim">Brief.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			What it actually means to ship a static website when there's no designer in the room
			— and why that constraint can make the work better.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>June 2025</span>
			<span class="h-3 w-px bg-line"></span>
			<span>B2B · Industrial</span>
			<span class="h-3 w-px bg-line"></span>
			<span>SvelteKit · Cloudflare</span>
			<span class="h-3 w-px bg-line"></span>
			<a href="https://www.novarocktools.com" target="_blank" rel="noopener noreferrer"
				class="text-accent transition-opacity hover:opacity-70">
				novarocktools.com ↗
			</a>
		</div>
	</div>

	<!-- ── Cover image — full-bleed site screenshot ──────────────────── -->
	<div class="mx-auto mt-12 max-w-5xl">
		<div class="overflow-hidden rounded-2xl border border-line shadow-[0_32px_64px_-24px_rgba(20,19,17,0.2)]">
			<!-- browser chrome -->
			<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-4 py-2.5">
				<span class="size-2.5 rounded-full bg-[#ff5f57]"></span>
				<span class="size-2.5 rounded-full bg-[#febc2e]"></span>
				<span class="size-2.5 rounded-full bg-[#28c840]"></span>
				<span class="ml-3 rounded-md bg-paper px-3 py-1 font-mono text-[10px] tracking-wider text-dim border border-line">
					novarocktools.com
				</span>
			</div>
			<img
				src="/projects/novarock.png"
				alt="Nova Rock Tools homepage — dark hero with DTH hammer product"
				width="1440"
				height="900"
				class="w-full object-cover object-top"
				loading="eager"
			/>
		</div>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				The brief was four words: <em>"We need a website."</em>
			</p>

			<p>
				No designer. No brand guide. No mockups. A logo, a handful of product photos, and a client —
				a Lima-based mining equipment company called <a href="https://www.novarocktools.com" target="_blank" rel="noopener noreferrer">Nova Rock Tools</a> — who knew exactly
				what they needed their customers to feel, but couldn't sketch it for you.
				That's the most common brief a solo developer gets, and it's the one nobody really talks about.
			</p>

			<h2>The client: B2B, industrial, bilingual</h2>

			<p>
				Nova Rock Tools makes DTH hammers, drill bits and tricones for underground mining operations.
				Their customers are procurement engineers at Peruvian mining companies — people who need to
				<em>trust a supplier</em> before they'll put their number on a quote request.
			</p>

		</div>

		<!-- product grid — show what we were building for -->
		<div class="not-prose my-10 grid grid-cols-3 gap-3">
			<figure class="overflow-hidden rounded-xl border border-line bg-paper-2">
				<img
					src="/writing/novarock/hammer.webp"
					alt="DTH hammer — Nova Rock Tools flagship product"
					loading="lazy"
					class="aspect-square w-full object-contain object-center p-4"
				/>
				<figcaption class="border-t border-line px-3 py-2 font-mono text-[10px] tracking-wider text-dim uppercase">
					DTH Hammer
				</figcaption>
			</figure>
			<figure class="overflow-hidden rounded-xl border border-line bg-paper-2">
				<img
					src="/writing/novarock/triconos.webp"
					alt="Tricone drill bits"
					loading="lazy"
					class="aspect-square w-full object-contain object-center p-4"
				/>
				<figcaption class="border-t border-line px-3 py-2 font-mono text-[10px] tracking-wider text-dim uppercase">
					Tricones
				</figcaption>
			</figure>
			<figure class="overflow-hidden rounded-xl border border-line bg-paper-2">
				<img
					src="/writing/novarock/brocas.webp"
					alt="DTH drill bits"
					loading="lazy"
					class="aspect-square w-full object-contain object-center p-4"
				/>
				<figcaption class="border-t border-line px-3 py-2 font-mono text-[10px] tracking-wider text-dim uppercase">
					Drill Bits
				</figcaption>
			</figure>
		</div>

		<div class="prose">

			<p>
				The site also had to speak two languages. Spanish is the language of the business,
				but ISO certifications and export inquiries increasingly come from English-speaking engineers.
				One codebase, two audiences — and no brief for either.
			</p>

			<h2>What "no designer" actually means</h2>

			<p>
				When there's no designer, you don't get a blank canvas — you get a harder constraint.
				You have to derive the design from the content, not the other way around.
			</p>

			<p>
				That means asking different questions at the start:
			</p>

			<ul>
				<li>What does this customer already trust? (Heavy industry, precision — think Bosch, Atlas Copco. Not playful. Not loud.)</li>
				<li>What's the single thing a visitor should believe after 10 seconds? (<em>These people know their product.</em>)</li>
				<li>Where does the customer go when they're convinced? (WhatsApp — not a contact form. WhatsApp.)</li>
			</ul>

			<p>
				Those three questions produced most of the design decisions: dark, high-contrast type;
				clean product photography with no noise around it; a floating WhatsApp CTA pre-filled
				with the product name, because that's how deals actually happen in Lima in 2025.
			</p>

			<h2>Why static — and why it mattered</h2>

			<p>
				The original site was a hand-rolled Svelte SPA — a blank <code>&lt;div id="app"&gt;</code>
				until ~110 KB of JavaScript had downloaded, parsed, and run. For a business that lives on
				WhatsApp link previews and Google, that's not a performance problem. It's a trust problem.
			</p>

			<p>
				WhatsApp scrapers don't execute JavaScript. Share a product page link and your customers see
				the homepage thumbnail, every time, for every product. The fix was migrating to
				<strong>SvelteKit with static prerendering</strong> — all ten routes built to real HTML at
				deploy time, served from Cloudflare's edge. Correct Open Graph tags on every page. A real 404.
				No JavaScript required for first paint.
			</p>

		</div>

		<!-- callout: the image problem -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-line">
			<div class="border-b border-line bg-paper-2 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Image Problem</p>
				<p class="mt-1 font-medium tracking-tight">4.2 MB per page load — mostly images no one audited.</p>
			</div>
			<div class="p-6">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-line text-left text-[10px] font-medium tracking-[0.2em] uppercase text-dim">
							<th class="pb-3 font-medium">Image</th>
							<th class="pb-3 font-medium">Before</th>
							<th class="pb-3 font-medium">After (WebP)</th>
							<th class="pb-3 font-medium text-accent">Saved</th>
						</tr>
					</thead>
					<tbody class="font-mono text-xs">
						<tr class="border-b border-line/50">
							<td class="py-2.5 text-dim">dth-hammer.png</td>
							<td class="py-2.5">1.78 MB</td>
							<td class="py-2.5">77 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">−96%</td>
						</tr>
						<tr class="border-b border-line/50">
							<td class="py-2.5 text-dim">dth-brocas.png</td>
							<td class="py-2.5">1.39 MB</td>
							<td class="py-2.5">214 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">−85%</td>
						</tr>
						<tr class="border-b border-line/50">
							<td class="py-2.5 text-dim">triconos.png</td>
							<td class="py-2.5">1.33 MB</td>
							<td class="py-2.5">230 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">−83%</td>
						</tr>
						<tr>
							<td class="py-2.5 text-dim">martillo.png</td>
							<td class="py-2.5">749 KB</td>
							<td class="py-2.5">92 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">−88%</td>
						</tr>
					</tbody>
				</table>
				<p class="mt-4 text-xs text-dim leading-relaxed">
					Each file was converted with <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[10px] border border-line">cwebp -q 82</code> at three widths (480/960/1440 px).
					The hero image was also hidden on mobile with <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[10px] border border-line">display:none</code> in the original —
					which doesn't stop the download. Phones were paying 1.78 MB for a picture they never saw.
				</p>
			</div>
		</div>

		<!-- hero image half-width with caption -->
		<div class="not-prose my-10 flex flex-col gap-6 sm:flex-row sm:items-start">
			<figure class="overflow-hidden rounded-xl border border-line sm:w-1/2">
				<img
					src="/writing/novarock/hammer.webp"
					alt="DTH hammer — the site's LCP element, before and after optimisation"
					loading="lazy"
					class="w-full object-cover"
				/>
				<figcaption class="border-t border-line bg-paper-2 px-4 py-3 text-xs text-dim leading-relaxed">
					The hero image. 1.78 MB as a PNG. 77 KB as a responsive WebP. The same hammer, 23× smaller.
				</figcaption>
			</figure>
			<div class="sm:w-1/2">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent mb-3">The Fix</p>
				<p class="text-sm leading-relaxed text-dim">
					A <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[11px] border border-line">&lt;Picture&gt;</code> component now emits a proper <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[11px] border border-line">&lt;picture&gt;</code> element
					with <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[11px] border border-line">srcset</code> + <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[11px] border border-line">sizes</code>,
					explicit dimensions, <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[11px] border border-line">fetchpriority="high"</code> on the LCP image,
					and a <code class="rounded bg-paper-2 px-1.5 py-0.5 text-[11px] border border-line">mobileSkip</code> option that emits an empty source
					on small screens — so the heavy hero is <em>genuinely</em> never downloaded on mobile, not just hidden.
				</p>
			</div>
		</div>

		<div class="prose">

			<h2>Making design decisions without a design education</h2>

			<p>
				This is where most developer-as-designer writing gets dishonest. The honest version: you lean on constraints.
			</p>

			<p>
				Constraints are the things that look like limitations but are actually decisions made for you.
				When you're building for a Peruvian mining-tools company:
			</p>

			<ul>
				<li>The palette is dark, slate, industrial — because the product is.</li>
				<li>The typography is clean and readable at small sizes — because engineers read specs, not copy.</li>
				<li>The layout puts the product image and CTA first — because the goal is a WhatsApp message, not time-on-site.</li>
				<li>The bilingual toggle is visible and persistent — because switching languages mid-visit is a real behaviour.</li>
			</ul>

			<p>
				None of those are especially creative decisions. They're <em>correct</em> ones.
				Consumer brands need to delight; industrial B2B needs to not scare people off.
				Lower the bar to the right bar.
			</p>

			<h2>The part AI actually helped with</h2>

			<p>
				The audit that surfaced the image problem, the font-loading issue, the injectable contact form, the
				button-navigations-masquerading-as-links — that was done by pairing with an AI agent that read
				the entire codebase and ran real measurements. Not "you should probably optimise images" but
				<em>"dth-hammer.png is 1.78 MB; at 960w WebP it's 77 KB; here's the cwebp command."</em>
			</p>

			<p>
				What AI can't do: tell you what the site should <em>feel like</em>. It can't know that a floating
				WhatsApp button is the most important UI element on the page. It doesn't know that ISO certification
				badges are a trust signal, not decoration. It can't decide the design should signal
				"precision" rather than "friendly."
			</p>

			<p>
				Those are design decisions, and they come from understanding the client's world. That's still the
				part that requires a human in the room.
			</p>

		</div>

		<!-- outcome table -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">Outcome</p>
				<p class="mt-1 font-medium tracking-tight">What shipped and what changed.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ metric: 'Page weight (home)', before: '~4.2 MB', after: '< 400 KB' },
					{ metric: 'Largest image', before: '1.78 MB', after: '77 KB' },
					{ metric: 'Rendering', before: 'Client-side only', after: 'Static HTML' },
					{ metric: 'Crawlable links', before: '0', after: 'All routes' },
					{ metric: 'WhatsApp previews', before: 'Homepage only', after: 'Correct per page' },
					{ metric: 'Contact form', before: 'Injectable, no validation', after: 'Escaped + bot-filtered' },
				] as row}
					<div class="grid grid-cols-3 px-6 py-3.5 text-sm">
						<span class="text-cream/50 text-xs font-medium tracking-wide">{row.metric}</span>
						<span class="font-mono text-xs text-cream/40 line-through">{row.before}</span>
						<span class="font-mono text-xs text-[#86d993]">{row.after}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="prose">

			<h2>What shipped</h2>

			<p>
				The live site at <a href="https://www.novarocktools.com" target="_blank" rel="noopener noreferrer">novarocktools.com</a>
				is a fully static SvelteKit build on Cloudflare Pages. Ten prerendered routes.
				WebP images with responsive variants. Self-hosted fonts. A contact function on Cloudflare Workers
				wired to Resend, with escaping, validation, and a honeypot. Correct per-page Open Graph tags.
				A floating WhatsApp CTA on every product page.
			</p>

			<p>
				The design is clean, industrial, and boring in exactly the right way. It looks like a company
				that knows what it's doing.
			</p>

			<p>
				That was the brief.
			</p>

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
				href="https://www.novarocktools.com"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-accent transition-opacity hover:opacity-70"
			>
				Visit novarocktools.com ↗
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
