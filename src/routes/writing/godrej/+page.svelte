<script lang="ts">
	import ArticleChrome from '$lib/components/ArticleChrome.svelte';
	import NextArticle from '$lib/components/NextArticle.svelte';
	import CaseSummary from '$lib/components/CaseSummary.svelte';
	import EvidenceTable from '$lib/components/EvidenceTable.svelte';

	const title = 'Building (and Rebuilding) for Godrej Foundation — Isaac Solomon';
	const description =
		'How I built the website and CMS for Godrej Foundation, the philanthropic trust of the Godrej Group, founded in 1897 — then rebuilt the frontend on the same CMS when Godrej\'s entire brand identity changed.';
</script>

<ArticleChrome {title} {description} path="/writing/godrej" image="/writing/godrej/og.png" />

<main id="main" class="px-5 pb-24 sm:px-8">

	<!-- ── Hero ──────────────────────────────────────────────────────── -->
	<div class="mx-auto max-w-3xl pt-14 md:pt-20">

		<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent-text">
			Case Study · Godrej Foundation
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight lowercase md:text-6xl">
			Built Twice, Shipped<br />
			<em class="font-serif font-normal italic text-dim">Better.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How I built the website and CMS for Godrej Foundation, the philanthropic trust of the Godrej Group, founded in 1897 —
			then rebuilt the frontend on the same CMS when Godrej's entire brand identity changed.
		</p>

		<CaseSummary href="/writing/godrej" />

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
				src="/writing/godrej/hero.webp"
				alt="Godrej Foundation homepage — Crafting a Prosperous Tomorrow, with hands reaching toward the sky in the hero"
				width="1440"
				height="900"
				style="view-transition-name: project-godrej"
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
				India. It holds a 15 percent shareholding in the Godrej Industries Group, and its philanthropy
				goes back to the Godrej family trusts of the 1970s; the group itself was founded in 1897,
				one of India's oldest. The foundation works on strengthening economic growth, advancing
				inclusion, and backing bold ideas through its Tomorrow Grants programme.
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
				— a design studio with a strong editorial portfolio, and a design system that set the bar
				for the build.
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
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent-text">The CMS</p>
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
				The 2024 restructuring had split the conglomerate into the Godrej Industries Group and the
				Godrej Enterprises Group, and on 22 April 2026 Godrej Industries unveiled a new corporate
				identity to match — a geometric "GI" identifier used alongside the Godrej signature, a
				custom typeface, GI Sans, and new guidelines, built by its in-house design team. Not a
				colour tweak. The group's corporate surfaces had to change, and the foundation website was
				one of them. The design I'd spent months building was suddenly out of date.
			</p>

		</div>

		<!-- Before / After comparison -->
		<div class="not-prose my-10 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100vw-3rem)] lg:max-w-[100rem]">
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
							src="/writing/godrej/v1-desktop.webp"
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
							src="/writing/godrej/v2-desktop.webp"
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
				I rebuilt the frontend from new designs — new component library, new layout system,
				new visual patterns. But here's where the architecture paid off: the CMS didn't have to change.
			</p>

		</div>

		<!-- Migration comparison -->
		<EvidenceTable
			eyebrow="The Rebuild"
			title="What changed between v1 and v2."
			rows={[
					{ label: 'Logo & identity', before: 'Old Godrej wordmark', after: 'New Godrej mark + wordmark' },
					{ label: 'Hero approach', before: 'Banyan tree, editorial', after: 'Hands/sky, aspirational' },
					{ label: 'Typography', before: 'Previous brand type stack', after: 'New Godrej type system' },
					{ label: 'Colour palette', before: 'Warm, earthy tones', after: 'Lighter, more modern palette' },
					{ label: 'Layout system', before: 'Text-forward, classic grid', after: 'Visual-forward, modern grid' },
					{ label: 'CMS & data model', before: 'Custom, built for Godrej', after: 'Unchanged — same content model, new presentation' },
					{ label: 'Content & copy', before: 'Managed by foundation team', after: 'Unchanged — zero migration needed' },
			]}
		/>

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
				Content lives in Apex, Able.do's own CMS platform; the site fetches it at build time and
				renders pages on the server from that snapshot, so publishing means a rebuild and a redeploy.
				Tailwind handles the design system — spacing, typography, colour tokens — making it
				possible to rebuild the visual layer quickly when the rebrand landed.
			</p>

			<p>
				The content model in Apex is shaped around how the foundation operates — their content
				types, their publishing patterns, their organisational structure — rather than around
				any one page design. Editors get a preview of pages and posts before they publish.
				That is what let the redesign change the presentation without touching the content.
			</p>

			<h2>What I learned</h2>

			<ul>
				<li>Separate content from presentation as early as possible. When you build a CMS around the content model instead of the visual design, you can survive a rebrand without migrating data.</li>
				<li>Building something twice teaches you what actually mattered the first time. The second iteration was faster and cleaner because the hard decisions were already made.</li>
				<li>A rebrand isn't a disaster if the architecture is right. It's a frontend rebuild, not a platform rebuild. The difference is weeks vs. months.</li>
				<li>Non-technical teams will actually use a CMS if it matches their mental model. Generic tools get abandoned; personalised tools get adopted.</li>
			</ul>

			<h2>What I'd improve next</h2>

			<ul>
				<li>A responsive image pipeline. Images are served straight from the CMS's asset host at one size; resized variants with <code>srcset</code> would cut most of the page weight on phones.</li>
				<li>Structured data. The foundation's programmes, grants and posts carry no JSON-LD today.</li>
				<li>A title and description on every route, enforced at build time rather than checked by hand.</li>
				<li>Move the content security policy from report-only to enforced.</li>
			</ul>

		</div>

		<!-- footer -->
		<NextArticle href="/writing/tomorrow-makers" />

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

	.prose strong {
		font-weight: 600;
	}
</style>
