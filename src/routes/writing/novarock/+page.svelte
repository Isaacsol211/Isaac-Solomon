<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import NextArticle from '$lib/components/NextArticle.svelte';

	const title = 'Building Without a Brief — Isaac Solomon';
	const description =
		'How I turned a four-word brief into a static, bilingual, WhatsApp-first website for a mining tools company — without a designer, mockups, or a brand guide.';
	const canonical = `${site.url}/writing/novarock`;
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
			Case Study · Nova Rock Tools
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			Building<br />Without a
			<em class="font-serif font-normal italic text-dim">Brief.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How I turned a four-word brief into a static, bilingual, WhatsApp-first website
			for a mining tools company — without a designer, mockups, or a brand guide.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>2025</span>
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

		<!-- payoff teaser — give readers the result before the deep dive -->
		<div class="mt-10 rounded-xl border border-line bg-paper-2/60 px-6 py-5">
			<p class="text-sm leading-relaxed text-dim">
				<strong class="font-medium text-ink">The result:</strong> a static, bilingual, WhatsApp-first product site
				that went from ~4.2 MB per load to under 400 KB, shipped correct Open Graph previews for every product page,
				and looked like it belonged in industrial procurement — not a template marketplace.
			</p>
		</div>
	</div>

	<!-- ── Before / After screenshots ───────────────────────────────── -->
	<div class="mx-auto mt-12 max-w-5xl">
		<div class="grid gap-4 md:grid-cols-2">
			<!-- BEFORE — WordPress concept -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<span class="text-[10px] font-medium tracking-[0.2em] uppercase text-dim">Concept (WordPress)</span>
					<span class="rounded-full bg-paper-2 border border-line px-2.5 py-1 font-mono text-[10px] text-dim">Perf 57</span>
				</div>
				<div class="overflow-hidden rounded-xl border border-line opacity-80">
					<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
						<span class="size-2 rounded-full bg-[#ff5f57]"></span>
						<span class="size-2 rounded-full bg-[#febc2e]"></span>
						<span class="size-2 rounded-full bg-[#28c840]"></span>
						<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
							216.222.198.80/~luxor430/novarocktools
						</span>
					</div>
					<img
						src="/writing/novarock/wp-concept.webp"
						alt="WordPress concept site — navy theme, large text, minimal product content"
						width="1440"
						height="900"
						class="w-full object-cover object-top"
						loading="eager"
					/>
				</div>
			</div>
			<!-- AFTER — SvelteKit production -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<span class="text-[10px] font-medium tracking-[0.2em] uppercase text-accent">Production (SvelteKit)</span>
					<span class="rounded-full bg-accent/10 border border-accent/30 px-2.5 py-1 font-mono text-[10px] text-accent">Perf 100</span>
				</div>
				<div class="overflow-hidden rounded-xl border border-accent/30 shadow-[0_16px_32px_-16px_rgba(20,19,17,0.15)]">
					<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
						<span class="size-2 rounded-full bg-[#ff5f57]"></span>
						<span class="size-2 rounded-full bg-[#febc2e]"></span>
						<span class="size-2 rounded-full bg-[#28c840]"></span>
						<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
							novarocktools.com
						</span>
					</div>
					<img
						src="/writing/novarock/sk-live.webp"
						alt="SvelteKit production site — product-first hero with DTH hammer specs"
						width="1440"
						height="900"
						class="w-full object-cover object-top"
						loading="eager"
					/>
				</div>
			</div>
		</div>

		<!-- Lighthouse comparison strip -->
		<div class="mt-4 overflow-hidden rounded-xl border border-line">
			<div class="grid grid-cols-5 border-b border-line bg-paper-2 px-5 py-2.5 text-[10px] font-medium tracking-[0.2em] uppercase text-dim">
				<span>Metric</span>
				<span class="text-center">Concept</span>
				<span class="text-center">Production</span>
				<span class="col-span-2 text-right">Delta</span>
			</div>
			{#each [
				{ label: 'Performance', before: '57', after: '100', delta: '+43', good: true },
				{ label: 'Best Practices', before: '76', after: '92', delta: '+16', good: true },
				{ label: 'LCP', before: '7.7 s', after: '0.8 s', delta: '−6.9 s', good: true },
				{ label: 'FCP', before: '6.1 s', after: '0.5 s', delta: '−5.6 s', good: true },
				{ label: 'Speed Index', before: '11.0 s', after: '0.6 s', delta: '−10.4 s', good: true },
				{ label: 'Page weight', before: '549 KB', after: '248 KB', delta: '−55%', good: true },
			] as row}
				<div class="grid grid-cols-5 items-center border-b border-line/60 px-5 py-3 text-sm last:border-0">
					<span class="text-xs font-medium text-dim">{row.label}</span>
					<span class="text-center font-mono text-xs text-dim/70">{row.before}</span>
					<span class="text-center font-mono text-xs">{row.after}</span>
					<span class="col-span-2 text-right font-mono text-xs font-semibold text-accent">{row.delta}</span>
				</div>
			{/each}
			<div class="border-t border-line bg-paper-2/60 px-5 py-2.5 text-[10px] leading-relaxed text-dim">
				Lighthouse desktop audit — concept site at IP, production at novarocktools.com. Same test conditions, same categories.
			</div>
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
			</p>

			<p>
				This wasn't a redesign from a Figma file. It was a business translation exercise:
				turn a vague need into a site that felt credible to mining procurement teams.
				That's the most common brief a solo developer gets, and it's the one nobody really talks about.
			</p>

			<h2>The client: B2B, industrial, bilingual</h2>

			<p>
				Nova Rock Tools makes DTH hammers, drill bits and tricones for underground mining operations.
				Their customers are procurement engineers at Peruvian mining companies — people who need to
				<em>trust a supplier</em> before they'll put their number on a quote request.
				There's no impulse buy. There's no "add to cart." There is: <em>does this company look like
				they know what they're doing?</em>
			</p>

		</div>

		<!-- product grid -->
		<div class="not-prose my-10 grid grid-cols-3 gap-3 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100vw-3rem)] lg:max-w-[100rem]">
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

		</div>

		<!-- decision framework callout -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Design Rule</p>
				<p class="mt-1 font-medium tracking-tight">Every decision ran through the same three filters.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: 'Does it increase trust?' },
					{ n: '02', q: 'Does it make the product easier to understand?' },
					{ n: '03', q: 'Does it move the buyer closer to WhatsApp?' },
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
				Those three filters produced most of the design decisions: dark, high-contrast type;
				clean product photography with no noise around it; a floating WhatsApp CTA pre-filled
				with the product name, because that's how deals actually happen in Lima in 2025.
				The goal was not to make it exciting. The goal was to make it credible.
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

		<!-- WhatsApp preview comparison -->
		<div class="not-prose my-10 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100vw-3rem)] lg:max-w-[100rem]">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">Before → After: WhatsApp link preview</p>
			<div class="grid gap-4 sm:grid-cols-2">
				<!-- BEFORE — SPA, no JS, fallback to homepage OG -->
				<div>
					<p class="mb-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim/60">SPA — every page looks like this</p>
					<div class="overflow-hidden rounded-xl border border-line bg-[#111b21]">
						<div class="aspect-[16/9] overflow-hidden bg-[#1a2730]">
							<div class="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
								<div class="size-10 rounded-full bg-white/5"></div>
								<div class="h-2 w-32 rounded bg-white/10"></div>
								<div class="h-2 w-20 rounded bg-white/5"></div>
							</div>
						</div>
						<div class="px-3 py-2.5">
							<p class="text-[11px] font-medium text-white/30 uppercase tracking-wide">novarocktools.com</p>
							<p class="mt-0.5 text-xs font-medium text-white/80">Nova Rock Tools</p>
							<p class="mt-0.5 text-[11px] text-white/40 leading-snug">Herramientas de perforación DTH para minería…</p>
						</div>
					</div>
				</div>
				<!-- AFTER — prerendered, correct product OG per page -->
				<div>
					<p class="mb-2 text-[10px] font-medium tracking-[0.15em] uppercase text-accent/80">Static — correct per page</p>
					<div class="overflow-hidden rounded-xl border border-accent/30 bg-[#111b21]">
						<div class="aspect-[16/9] overflow-hidden">
							<img
								src="/writing/novarock/hammer.webp"
								alt="Correct Open Graph preview showing the DTH hammer product"
								loading="lazy"
								class="h-full w-full object-cover object-center"
							/>
						</div>
						<div class="px-3 py-2.5">
							<p class="text-[11px] font-medium uppercase tracking-wide text-accent/70">novarocktools.com</p>
							<p class="mt-0.5 text-xs font-medium text-white/90">Martillo DTH NRT45DH — Nova Rock Tools</p>
							<p class="mt-0.5 text-[11px] leading-snug text-white/50">Martillo de alta eficiencia para perforación…</p>
						</div>
					</div>
				</div>
			</div>
			<p class="mt-3 text-xs leading-relaxed text-dim">
				The SPA returned a blank image + generic title for every URL — because scrapers never executed the JS that set per-page <code class="rounded border border-line bg-paper-2 px-1 py-0.5 text-[10px]">og:*</code> tags.
				After prerendering, each product page ships its own correct title, description, and product photo in the initial HTML.
			</p>
		</div>

		<!-- image savings callout -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-line">
			<div class="border-b border-line bg-paper-2 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Image Problem</p>
				<p class="mt-1 font-medium tracking-tight">4.2 MB per page load — mostly images no one audited.</p>
			</div>
			<div class="p-6">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-line text-left text-[10px] font-medium tracking-[0.2em] uppercase text-dim">
							<th class="pb-3 font-medium">Asset</th>
							<th class="pb-3 font-medium">Before</th>
							<th class="pb-3 font-medium">After (WebP)</th>
							<th class="pb-3 font-medium text-accent">Reduction</th>
						</tr>
					</thead>
					<tbody class="font-mono text-xs">
						<tr class="border-b border-line/50">
							<td class="py-2.5 text-dim">Hero hammer</td>
							<td class="py-2.5">1.78 MB</td>
							<td class="py-2.5">77 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">96%</td>
						</tr>
						<tr class="border-b border-line/50">
							<td class="py-2.5 text-dim">Drill bits</td>
							<td class="py-2.5">1.39 MB</td>
							<td class="py-2.5">214 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">85%</td>
						</tr>
						<tr class="border-b border-line/50">
							<td class="py-2.5 text-dim">Tricones</td>
							<td class="py-2.5">1.33 MB</td>
							<td class="py-2.5">230 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">83%</td>
						</tr>
						<tr>
							<td class="py-2.5 text-dim">Hammer (small)</td>
							<td class="py-2.5">749 KB</td>
							<td class="py-2.5">92 KB</td>
							<td class="py-2.5 font-sans font-semibold text-accent">88%</td>
						</tr>
					</tbody>
				</table>
				<p class="mt-4 text-xs leading-relaxed text-dim">
					Converted with <code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px]">cwebp -q 82</code> at three widths (480/960/1440 px).
					The hero was hidden on mobile with <code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px]">display:none</code> in the original —
					which doesn't stop the download. Phones were paying 1.78 MB for a picture they never saw.
				</p>
			</div>
		</div>

		<!-- hammer + fix explanation -->
		<div class="not-prose my-10 flex flex-col gap-6 sm:flex-row sm:items-start lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(64rem,100vw-4rem)]">
			<figure class="overflow-hidden rounded-xl border border-line sm:w-1/2">
				<img
					src="/writing/novarock/hammer.webp"
					alt="DTH hammer — the site's LCP element, before and after optimisation"
					loading="lazy"
					class="w-full object-cover"
				/>
				<figcaption class="border-t border-line bg-paper-2 px-4 py-3 text-xs leading-relaxed text-dim">
					The hero. 1.78 MB as a PNG. 77 KB as a responsive WebP. Same hammer, 23× smaller.
				</figcaption>
			</figure>
			<div class="sm:w-1/2">
				<p class="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-accent">The Fix</p>
				<p class="text-sm leading-relaxed text-dim">
					A <code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[11px]">&lt;Picture&gt;</code> component emits a proper
					<code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[11px]">&lt;picture&gt;</code> element
					with <code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[11px]">srcset + sizes</code>,
					explicit dimensions to kill CLS, <code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[11px]">fetchpriority="high"</code> on the LCP image,
					and a <code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[11px]">mobileSkip</code> prop that emits
					an empty source on small screens — so the hero is <em class="font-serif italic">genuinely</em> never
					downloaded on mobile, not just hidden.
				</p>
			</div>
		</div>

		<!-- Picture component code snippet -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-line">
			<div class="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-2.5">
				<span class="font-mono text-[10px] tracking-wider text-dim">Picture.svelte — usage</span>
				<span class="text-[10px] font-medium tracking-[0.15em] uppercase text-dim/60">Svelte 5</span>
			</div>
			<pre class="overflow-x-auto p-5 text-[12px] leading-relaxed"><code><span class="text-dim">&lt;!-- Hero — preloaded, never downloaded on mobile --&gt;</span>
<span class="text-accent">&lt;Picture</span>
  <span class="text-[#86d993]">src</span>=<span class="text-[#e8c57d]">"/img/dth-hammer.png"</span>
  <span class="text-[#86d993]">alt</span>=<span class="text-[#e8c57d]">"DTH hammer NRT45DH"</span>
  <span class="text-[#86d993]">widths</span>=<span class="text-[#e8c57d]">{"{[480, 960, 1440]}"}</span>
  <span class="text-[#86d993]">sizes</span>=<span class="text-[#e8c57d]">"(min-width: 1024px) 50vw, 100vw"</span>
  <span class="text-[#86d993]">mobileSkip</span>
  <span class="text-[#86d993]">fetchpriority</span>=<span class="text-[#e8c57d]">"high"</span>
<span class="text-accent">/&gt;</span>

<span class="text-dim">&lt;!-- Below-fold product — lazy, no mobile skip --&gt;</span>
<span class="text-accent">&lt;Picture</span>
  <span class="text-[#86d993]">src</span>=<span class="text-[#e8c57d]">"/img/triconos.png"</span>
  <span class="text-[#86d993]">alt</span>=<span class="text-[#e8c57d]">"Tricone drill bits"</span>
  <span class="text-[#86d993]">widths</span>=<span class="text-[#e8c57d]">{"{[480, 960]}"}</span>
  <span class="text-[#86d993]">sizes</span>=<span class="text-[#e8c57d]">"(min-width: 768px) 400px, 100vw"</span>
  <span class="text-[#86d993]">loading</span>=<span class="text-[#e8c57d]">"lazy"</span>
<span class="text-accent">/&gt;</span></code></pre>
			<div class="border-t border-line bg-paper-2/50 px-4 py-3 text-xs leading-relaxed text-dim">
				<code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px]">mobileSkip</code> emits
				<code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px]">&lt;source media="(max-width: 639px)" srcset=""&gt;</code>
				as the first source — browsers stop at the first matching source, so mobile never requests the file.
				<code class="rounded border border-line bg-paper-2 px-1.5 py-0.5 text-[10px]">display:none</code> doesn't do this.
			</div>
		</div>

		<div class="prose">

			<h2>Making design decisions without a design education</h2>

			<p>
				This is where most developer-as-designer writing gets dishonest. The honest version: you lean on constraints.
			</p>

			<p>
				When you're building for a Peruvian mining-tools company:
			</p>

			<ul>
				<li>The palette is dark, slate, industrial — because the product is.</li>
				<li>The typography is clean and readable at small sizes — because engineers read specs, not copy.</li>
				<li>The layout puts the product image and CTA first — because the goal is a WhatsApp message, not time-on-site.</li>
				<li>The bilingual toggle is visible and persistent — because switching languages mid-visit is a real behaviour.</li>
			</ul>

			<p>
				None of those are especially creative decisions. They're correct ones.
				Consumer brands need to delight; industrial B2B needs to not scare people off.
				The goal was not to make it exciting. The goal was to make it credible.
			</p>

			<h2>The part AI actually helped with</h2>

			<p>
				The audit that surfaced the image problem, the font-loading issue, the injection-prone contact form, the
				buttons masquerading as links — that was done by pairing with an AI agent that read
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

		<!-- ── What changed — merged outcome + what shipped ─────────── -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">What changed</p>
				<p class="mt-1 font-medium tracking-tight">Before and after, in plain numbers.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ metric: 'Page weight (home)', before: '~4.2 MB', after: '< 400 KB' },
					{ metric: 'Largest asset', before: '1.78 MB', after: '77 KB' },
					{ metric: 'Rendering', before: 'Client-side SPA', after: 'Static HTML' },
					{ metric: 'Crawlable links', before: '0', after: 'All routes' },
					{ metric: 'WhatsApp / social previews', before: 'Homepage only', after: 'Correct per page' },
					{ metric: 'Contact form', before: 'Injection-prone, no validation', after: 'Escaped + bot-filtered' },
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
				The live site at <a href="https://www.novarocktools.com" target="_blank" rel="noopener noreferrer">novarocktools.com</a>
				is a fully static SvelteKit build on Cloudflare Pages — ten prerendered routes, WebP images, self-hosted fonts,
				a Cloudflare Workers contact function wired to Resend with escaping, validation, and a honeypot,
				and a floating WhatsApp CTA on every product page.
			</p>

			<p>
				The final site is not trying to be flashy. It is static, fast, bilingual, crawlable,
				shareable on WhatsApp, and clear about what Nova Rock Tools sells. For this kind of business,
				that is the design win: not delight, but confidence.
			</p>

			<p>
				That was the brief.
			</p>

			<h2>What I'd improve next</h2>

			<ul>
				<li>Add product structured data (JSON-LD) for each tool — drilling equipment queries are specific and long-tail.</li>
				<li>Downloadable PDF spec sheets per product, gated behind the WhatsApp CTA.</li>
				<li>Track WhatsApp CTA clicks by product to understand which tools drive the most inquiries.</li>
				<li>Spanish-first SEO landing pages targeting specific drill types and mining regions.</li>
				<li>A small FAQ section answering "¿Hacen envíos a mina?" and "¿Tiempos de entrega?" — those questions earn rich results.</li>
			</ul>

		</div>

		<!-- footer -->
		<NextArticle href="/writing/saut" />

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
