<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import NextArticle from '$lib/components/NextArticle.svelte';

	const title = 'Every Child Carries a Spark — Isaac Solomon';
	const description =
		'Building the national talent platform that helps Godrej Foundation find and support India\'s highest-potential students from underserved communities.';
	const canonical = `${site.url}/writing/tomorrow-makers`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/writing/tomorrow-makers/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}/writing/tomorrow-makers/og.png" />
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
			Case Study · Tomorrow Makers
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			Every Child Carries<br />
			a <em class="font-serif font-normal italic text-dim">Spark.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			Building the national platform that helps Godrej Foundation find and support
			India's highest-potential students from the most underserved communities.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>2026</span>
			<span class="h-3 w-px bg-line"></span>
			<span>Philanthropy · EdTech</span>
			<span class="h-3 w-px bg-line"></span>
			<span>SvelteKit · Tailwind · Cloudflare</span>
			<span class="h-3 w-px bg-line"></span>
			<a href="https://www.tomorrow-makers.in" target="_blank" rel="noopener noreferrer"
				class="text-accent transition-opacity hover:opacity-70">
				tomorrow-makers.in ↗
			</a>
		</div>

		<!-- payoff teaser -->
		<div class="mt-10 rounded-xl border border-line bg-paper-2/60 px-6 py-5">
			<p class="text-sm leading-relaxed text-dim">
				<strong class="font-medium text-ink">The result:</strong> a multi-pathway assessment
				and matching platform — live across India, with WhatsApp onboarding, support for
				11 languages, and four distinct student pathways. Built on SvelteKit and Cloudflare Pages,
				extending the same foundation as the Godrej Foundation site I built the year before.
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
					tomorrow-makers.in
				</span>
			</div>
			<img
				src="/writing/tomorrow-makers/hero.webp"
				alt="Tomorrow Makers homepage — Everyone can be great at something, with video hero of students in school"
				width="1440"
				height="900"
				style="view-transition-name: project-tomorrow-makers"
				class="w-full object-cover object-top"
				loading="eager"
			/>
		</div>
		<p class="mt-3 text-center text-xs text-dim">The homepage hero — bold, direct, built to reach students not investors.</p>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				Tomorrow Makers is Godrej Foundation's national platform for finding India's
				highest-potential students in its most underserved communities. Not a scholarship portal.
				Not a brochure. A working system that assesses aptitude across four disciplines, matches
				students to partner organisations, and connects them to mentors, coaching and peer communities
				that can change the trajectory of their lives.
			</p>

			<p>
				The premise is simple and urgent: talent is everywhere, opportunity is not. Across India —
				from dense urban neighbourhoods to remote villages, from coastal towns to tribal hamlets —
				there are students with extraordinary potential who will never encounter the right programme,
				the right mentor, the right competition. Tomorrow Makers exists to find them.
			</p>

			<p>
				This is the second project I've built for the Godrej ecosystem. The
				<a href="/writing/godrej">Godrej Foundation website</a> was the first — and that
				relationship is what led here. When you build something well for a client, they come
				back with something harder. Tomorrow Makers was harder.
			</p>

			<h2>The design</h2>

			<p>
				<a href="https://3sided.co.in" target="_blank" rel="noopener noreferrer">3 Sided Coin</a>
				designed the platform — the same award-winning studio (Webby Honoree 2022, iPad App of the
				Year 2018) that designed the Godrej Foundation site. But where the Foundation site is
				corporate and restrained, Tomorrow Makers is loud, bold, and unapologetically youthful.
			</p>

			<p>
				The visual language is built around saturated colour — cyan, magenta, yellow, black — with
				oversized typography that fills the viewport. The hero doesn't whisper. "EVERYONE CAN BE
				GREAT AT SOMETHING" takes up the entire screen, layered over video of real students. The
				tone is editorial, direct, built to reach a 14-year-old on a phone, not a corporate board
				in a conference room.
			</p>

			<p>
				Each of the four pathways gets its own colour identity: Science in teal, Arts in magenta,
				Invention in yellow-green, Service in dark. That gives each pathway a distinct visual
				personality while keeping everything under one design system.
			</p>

		</div>

		<!-- stats + pathways screenshots -->
		<div class="not-prose my-10 grid gap-6 md:grid-cols-2 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100vw-3rem)] lg:max-w-[100rem]">
			<div>
				<div class="overflow-hidden rounded-xl border border-line shadow-[0_8px_24px_-8px_rgba(20,19,17,0.12)]">
					<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
						<span class="size-2 rounded-full bg-[#ff5f57]"></span>
						<span class="size-2 rounded-full bg-[#febc2e]"></span>
						<span class="size-2 rounded-full bg-[#28c840]"></span>
						<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
							tomorrow-makers.in
						</span>
					</div>
					<img
						src="/writing/tomorrow-makers/stats.webp"
						alt="India has never lacked talent — what we have lacked is equal access to opportunity"
						width="1440"
						height="800"
						class="h-[24rem] w-full object-cover object-top lg:h-[28rem]"
						loading="lazy"
					/>
				</div>
				<p class="mt-3 text-xs text-dim">
					The core message — bold type, green dot-grid, designed to stop you scrolling.
				</p>
			</div>
			<div>
				<div class="overflow-hidden rounded-xl border border-line shadow-[0_8px_24px_-8px_rgba(20,19,17,0.12)]">
					<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
						<span class="size-2 rounded-full bg-[#ff5f57]"></span>
						<span class="size-2 rounded-full bg-[#febc2e]"></span>
						<span class="size-2 rounded-full bg-[#28c840]"></span>
						<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
							tomorrow-makers.in
						</span>
					</div>
					<img
						src="/writing/tomorrow-makers/pathways.webp"
						alt="Four pathways section — Science in teal, Arts in magenta, Invention in yellow, Service in dark"
						width="1440"
						height="3000"
						class="h-[24rem] w-full object-cover object-top lg:h-[28rem]"
						loading="lazy"
					/>
				</div>
				<p class="mt-3 text-xs text-dim">
					Each pathway — its own colour, its own audience, its own partner organisations.
				</p>
			</div>
		</div>

		<div class="prose">

			<h2>Four pathways, one platform</h2>

			<p>
				The core of Tomorrow Makers is its four-pathway model. Each pathway targets a different
				aptitude, a different age group, and connects to different partner organisations — but
				they all flow through the same assessment and onboarding system.
			</p>

		</div>

		<!-- pathways callout -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Pathways</p>
				<p class="mt-1 font-medium tracking-tight">Four routes, eight partner organisations.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', label: 'Science', detail: 'Classes 10–12 → JEE/NEET coaching via Dakshana, Avanti Fellows, Genwise' },
					{ n: '02', label: 'Arts', detail: 'Classes 6–8 + Graduates → Performing arts mentorship via Slam Out Loud, Drama School Mumbai' },
					{ n: '03', label: 'Invention', detail: 'Classes 6–7 → Robotics, computing and maker spaces via MakerGhat' },
					{ n: '04', label: 'Service', detail: 'Graduates → Armed forces preparation via Delta Squad Foundation, Yuvatejas' },
				] as item}
					<div class="flex items-baseline gap-5 py-4">
						<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">{item.n}</span>
						<div>
							<span class="text-sm font-medium">{item.label}</span>
							<p class="mt-1 text-xs leading-relaxed text-dim">{item.detail}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="prose">

			<p>
				The challenge was building a single platform that serves all four audiences without
				collapsing into a generic portal. A 12-year-old exploring robotics and a graduate
				preparing for the Indian Armed Forces have fundamentally different needs, different
				reading levels, different motivations for being on the site. The information architecture
				had to be simple enough for the youngest users while substantive enough for the oldest.
			</p>

			<h2>The assessment flow</h2>

			<p>
				Students can register through the website or via WhatsApp — text "Hi" to a number and
				the bot walks them through onboarding. This isn't a nice-to-have. In the communities
				Tomorrow Makers targets, a WhatsApp number is often more accessible than a web browser.
				Meeting students where they already are was a core design decision.
			</p>

			<p>
				The assessment itself is available in 11 languages for the younger cohorts (Classes 6–7),
				because aptitude shouldn't be gated by English fluency. The process is three steps:
				assess aptitude in the sciences, arts, defence or invention; select high-potential
				candidates through a structured scoring process; and connect them to the right partner
				organisation for their pathway.
			</p>

			<p>
				Need-based scholarships cover the cost for students who qualify — the platform isn't
				just identifying talent, it's removing every barrier between a student and the programme
				that can develop that talent.
			</p>

		</div>

		<!-- mission screenshot -->
		<div class="not-prose my-10 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(64rem,100vw-4rem)]">
			<div class="overflow-hidden rounded-xl border border-line shadow-[0_8px_24px_-8px_rgba(20,19,17,0.12)]">
				<div class="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2">
					<span class="size-2 rounded-full bg-[#ff5f57]"></span>
					<span class="size-2 rounded-full bg-[#febc2e]"></span>
					<span class="size-2 rounded-full bg-[#28c840]"></span>
					<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
						tomorrow-makers.in
					</span>
				</div>
				<img
					src="/writing/tomorrow-makers/mission.webp"
					alt="We're trying to change that — mission statement with editorial photography of classrooms"
					width="1440"
					height="1350"
					class="w-full object-cover object-top"
					loading="lazy"
				/>
			</div>
			<p class="mt-3 text-xs text-dim">
				"We're trying to change that." — the platform's mission, told through bold type and editorial photography.
			</p>
		</div>

		<div class="prose">

			<h2>The stack</h2>

			<p>
				SvelteKit on Cloudflare Pages — the same foundation I built the
				<a href="/writing/godrej">Godrej Foundation site</a> on. Tailwind for styling.
				The architectural DNA is shared: component-driven, statically rendered where possible,
				deployed on Cloudflare's edge network for fast global delivery.
			</p>

			<p>
				But Tomorrow Makers pushes further than a corporate brochure site. There's a dynamic
				assessment flow, a WhatsApp bot integration for onboarding, multi-language support
				across 11 languages, and partner-specific routing that directs qualified students to
				the right organisation. The platform had to be both a marketing site that sells the
				vision and a working tool that processes real applications.
			</p>

		</div>

		<!-- tech comparison table -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">Platform at a Glance</p>
				<p class="mt-1 font-medium tracking-tight">What the build required.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ metric: 'Framework', value: 'SvelteKit (SSR + static)' },
					{ metric: 'Styling', value: 'Tailwind CSS' },
					{ metric: 'Deployment', value: 'Cloudflare Pages' },
					{ metric: 'Assessment languages', value: '11 (Classes 6–7)' },
					{ metric: 'Student pathways', value: '4 (Science, Arts, Invention, Service)' },
					{ metric: 'Partner organisations', value: '8 across all pathways' },
					{ metric: 'Onboarding channels', value: 'Web + WhatsApp bot' },
					{ metric: 'Design', value: '3 Sided Coin' },
				] as row}
					<div class="grid grid-cols-2 gap-2 px-6 py-3.5 text-sm">
						<span class="text-xs font-medium tracking-wide text-cream/50">{row.metric}</span>
						<span class="font-mono text-xs text-[#86d993]">{row.value}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- full-page tour -->
		<div class="not-prose my-12 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100vw-3rem)] lg:max-w-[100rem]">
			<div class="page-tour group overflow-hidden rounded-xl border border-line shadow-[0_16px_32px_-16px_rgba(20,19,17,0.15)]">
				<div class="flex items-center justify-between border-b border-line bg-paper-2 px-3 py-2">
					<div class="flex items-center gap-1.5">
						<span class="size-2 rounded-full bg-[#ff5f57]"></span>
						<span class="size-2 rounded-full bg-[#febc2e]"></span>
						<span class="size-2 rounded-full bg-[#28c840]"></span>
						<span class="ml-2 rounded bg-paper px-2 py-0.5 font-mono text-[9px] tracking-wider text-dim border border-line">
							tomorrow-makers.in — homepage
						</span>
					</div>
					<span class="hidden text-[9px] font-medium tracking-[0.2em] uppercase text-dim sm:block">
						Hover to tour ↓
					</span>
				</div>
				<div class="tour-viewport">
					<img
						src="/projects/godrej-tm-page.webp"
						alt="Full Tomorrow Makers homepage — Everyone Can Be Great At Something hero, four pathways, pathway grade cards, partner logos, FAQs and closing call to action"
						width="536"
						height="4096"
						loading="lazy"
					/>
				</div>
			</div>
			<p class="mt-3 text-center text-xs text-dim">
				The full homepage in one pass — hover (or scroll) to walk it top to bottom.
			</p>
		</div>

		<div class="prose">

			<h2>The Godrej thread</h2>

			<p>
				Tomorrow Makers launched as a Godrej Foundation initiative — the same trust whose
				<a href="/writing/godrej">website and CMS I built the year before</a>. That earlier
				project went through two complete iterations (pre-rebrand and post-rebrand), and the
				quality of that work is what opened the door to this one.
			</p>

			<p>
				There's a pattern in client work that matters more than any portfolio piece: when a
				client comes back with a harder brief, it means the first one landed. Tomorrow Makers
				was a bigger scope, a different audience, and a more complex system — but it came from
				the same trust, born out of a relationship built by doing the work right the first time.
			</p>

			<p>
				The two sites share architectural foundations — SvelteKit, Tailwind, Cloudflare — but
				they speak to completely different audiences. The Foundation site addresses donors,
				partners and corporate stakeholders. Tomorrow Makers talks to students. The tone,
				the typography, the colour palette, the interaction patterns — all different. Same
				engineering principles, entirely different product.
			</p>

			<h2>What I learned</h2>

			<ul>
				<li>Building for impact is different from building for conversion. There's no add-to-cart here — the goal is getting a 14-year-old from a village in Maharashtra to take an aptitude test that could change their life. Every design decision filters through that lens.</li>
				<li>WhatsApp-first onboarding isn't optional when your users are in underserved communities. A website is one channel; the channel your audience already lives on is the one that matters.</li>
				<li>Multi-language support at the assessment level (not just the UI) is a fundamentally different problem. You're not just translating labels — you're ensuring that aptitude questions work across linguistic and cultural contexts.</li>
				<li>Design systems that serve multiple audiences within one product need colour as architecture, not just decoration. The pathway colours aren't aesthetic — they're wayfinding.</li>
				<li>The best briefs come from clients you've already proven yourself to. The Godrej Foundation site led directly to Tomorrow Makers — earned through quality, not pitched.</li>
			</ul>

		</div>

		<!-- footer -->
		<NextArticle href="/writing/novarock" />

		<div class="mt-16 flex items-center justify-between border-t border-line pt-8">
			<a
				href="/"
				class="group flex items-center gap-2 text-sm font-medium text-dim transition-colors hover:text-ink"
			>
				<span class="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
				Back to portfolio
			</a>
			<a
				href="https://www.tomorrow-makers.in"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-accent transition-opacity hover:opacity-70"
			>
				Visit tomorrow-makers.in ↗
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
