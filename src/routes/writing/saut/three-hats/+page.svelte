<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const title = 'Wearing Three Hats — Frontend Dev, PM, Designer — Isaac Solomon';
	const description =
		'How four years on a single product turned a frontend developer into a product manager and emergency UI designer — and why understanding all three disciplines made me better at each one.';
	const canonical = `${site.url}/writing/saut/three-hats`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<!-- back nav -->
<header class="border-b border-line px-5 py-4 sm:px-8">
	<div class="mx-auto flex max-w-3xl items-center justify-between">
		<a
			href="/writing/saut"
			class="group flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-dim transition-colors hover:text-ink"
		>
			<span class="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
			SAUT Case Study
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
			Case Study · SAUT — Part 3
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			Frontend Dev.<br />Product Manager.
			<em class="font-serif font-normal italic text-dim">Emergency Designer.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How four years on one product turned a frontend developer into a product manager
			and emergency UI designer — and why understanding all three made me better at each.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>SAUT · 2019 – 2023</span>
			<span class="h-3 w-px bg-line"></span>
			<span>Product · Design · Engineering</span>
		</div>
	</div>

	<!-- ── Hero image ──────────────────────────────────────────────── -->
	<div class="mx-auto mt-12 max-w-5xl">
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="overflow-hidden rounded-xl border border-line">
				<img
					src="/projects/saut/sc-feature-2.jpg"
					alt="Child wearing glasses with school logo shirt, using interactive learning materials"
					width="800"
					height="600"
					class="h-full w-full object-cover"
					loading="eager"
				/>
			</div>
			<div class="overflow-hidden rounded-xl border border-line">
				<img
					src="/projects/saut/sc-feature-4.jpg"
					alt="Three children sitting together with books, collaborative learning"
					width="800"
					height="600"
					class="h-full w-full object-cover"
					loading="eager"
				/>
			</div>
		</div>
		<p class="mt-3 text-center text-xs text-dim">Students at SAUT — the people the software was actually built for.</p>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				I didn't plan to become a product manager. Nobody does, really — at least not on a three-person
				dev team where "product manager" isn't a job title anyone holds. You become one because the
				product needs someone to, and you're the person who understands it best.
			</p>

			<p>
				When I started on SAUT, I was a frontend developer. 100% coding, 0% opinions about feature
				prioritisation. Four years later, I was spending 40% of my time on product decisions, 30% coding,
				and 20% designing screens. The shift wasn't a promotion or a role change — it was the natural
				consequence of building every screen in a product for four years straight.
			</p>

			<h2>Phase one: just build</h2>

			<p>
				V1 was straightforward. Tropics — the design studio led by Zubin — handed us Figma files. I
				turned them into Vue.js components. The spec came from the product documentation, the designs
				came from Tropics, and my job was to make them real. Student profiles, IEP creation flows,
				assessment interfaces, the curriculum browser — I built them all, but I didn't decide what
				went into them.
			</p>

			<p>
				V2 was the same, initially. The first half of the rewrite was pure execution: migrate the
				frontend from Vue to SvelteKit, rebuild every component, every layout, every interaction.
				The timeline was five months. There was no room for product thinking — there was barely
				room for lunch. You ship what's specced, you ship it fast, you make it work.
			</p>

			<h2>Phase two: the shift</h2>

			<p>
				After V2 went live, the pressure changed shape. The core system was stable. Teachers were
				using it. The urgent work shifted from "build the thing" to "decide what to build next."
				And that's where the role started to blur.
			</p>

			<p>
				We had a 65-feature roadmap phased across six releases. Someone had to decide what went
				into Phase 2.1 versus 2.2. Someone had to balance what the client wanted, what the teachers
				needed, and what the three-person team could actually deliver. Someone had to get on the
				daily call and say "this is what we're doing this week, and here's why."
			</p>

			<p>
				That someone was me. Not because I had PM experience — I didn't. Because I'd built every
				screen in the system. I knew the data model inside out. I knew which features were technically
				cheap and which ones would take two sprints. I knew what the teachers actually used versus
				what the spec said they'd use, because I'd watched them use it during UAT sessions.
			</p>

		</div>

		<!-- role evolution callout -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">The Evolution</p>
				<p class="mt-1 font-medium tracking-tight">How the role changed over four years.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ phase: 'V1 (2019–2022)', coding: '100%', pm: '0%', design: '0%', note: 'Pure frontend — Vue.js components from Figma specs' },
					{ phase: 'V2 rewrite (early 2023)', coding: '100%', pm: '0%', design: '0%', note: 'Five-month migration sprint — no room for anything else' },
					{ phase: 'V2 stabilised (mid 2023)', coding: '45%', pm: '45%', design: '10%', note: 'Product decisions creep in — feature prioritisation, client calls' },
					{ phase: 'V2 mature (late 2023)', coding: '30%', pm: '40%', design: '20%', note: 'Junior devs take over coding — PM and design become primary' },
				] as row}
					<div class="px-6 py-4">
						<div class="flex items-baseline justify-between gap-4">
							<span class="text-xs font-medium tracking-wide text-cream/50">{row.phase}</span>
							<span class="font-mono text-xs text-[#86d993]">{row.coding} code · {row.pm} PM · {row.design} design</span>
						</div>
						<p class="mt-1.5 text-xs text-cream/40">{row.note}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="prose">

			<h2>Product decisions</h2>

			<p>
				Product management on a small team isn't strategy decks and OKRs. It's daily triage.
				The client wants feature X by September. The teachers are struggling with feature Y that
				shipped last week. The backend engineer says feature Z needs a database migration that'll
				take three days. And you have one sprint to figure out the right order.
			</p>

			<p>
				The advantage I had was that I could evaluate every request through the lens of someone
				who'd build it. "Can we add offline support for case studies?" I didn't need to ask
				engineering — I <em>was</em> engineering. I knew the service worker already handled
				attendance and daily assessments, and extending it to case studies would mean syncing
				more complex state. I could say "yes, but it's a Phase 2.3 item because of the sync
				complexity" in the same call where the request was made.
			</p>

			<p>
				That speed — collapsing the feedback loop between "what should we build" and "what can
				we build" — is what made a three-person team ship sixty-five features. There was no
				handoff delay. No "let me check with the dev team." The dev team was in the call,
				making the decision.
			</p>

			<h2>Emergency design</h2>

			<p>
				Tropics — the design studio — handled the visual design. They set the design language,
				built the component library in Figma, and designed the core screens. But a 65-feature
				roadmap across six releases generates more screens than any external design team can
				keep pace with, especially when the dev team is shipping weekly.
			</p>

			<p>
				So when a new feature needed a screen and Tropics was heads-down on something else,
				I designed it. Not from scratch — from the existing design system. I knew the spacing
				scale, the colour tokens, the component patterns, the interaction conventions. I'd
				been implementing them for years. Designing a new screen meant composing from the
				established vocabulary, not inventing a new one.
			</p>

			<p>
				The classgroups interface, parts of the reporting dashboard, several of the admin
				screens — those came from me, not Tropics. I'd sketch in Figma based on the existing
				patterns, discuss with the team, and then build it. The advantage was zero translation
				loss: the person who designed it was the person who coded it. No misinterpreted padding.
				No "this component doesn't exist yet" surprises.
			</p>

		</div>

		<!-- video: admin panel -->
		<div class="not-prose my-10">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">Product demo — Administration and content management</p>
			<div class="overflow-hidden rounded-xl border border-line">
				<video
					controls
					preload="metadata"
					class="w-full"
				>
					<source src="/projects/saut/6.mp4" type="video/mp4" />
				</video>
			</div>
			<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim opacity-60">The admin panel — where curriculum content is managed and published to schools</p>
		</div>

		<div class="prose">

			<h2>What each hat taught the others</h2>

			<p>
				The thing about wearing three hats isn't that you become three separate practitioners.
				It's that each discipline informs the others in ways you don't expect.
			</p>

			<p>
				<strong>Engineering informed PM:</strong> When you've built every feature yourself, you
				have an intuitive sense of cost. Not in story points or sprint velocity — in real terms.
				"This feature touches three database tables and two service worker sync paths. That's
				a week, minimum." Product decisions grounded in engineering reality ship faster because
				they don't get sent back.
			</p>

			<p>
				<strong>PM informed design:</strong> Understanding what the teachers actually needed —
				from daily calls, from UAT sessions, from watching them struggle with specific flows —
				meant the screens I designed solved real problems. Not "what would look good in a portfolio"
				but "what would make this teacher's 3pm assessment routine take two minutes instead of ten."
			</p>

			<p>
				<strong>Design informed engineering:</strong> Designing a screen before coding it forces
				you to think about the user flow before the data flow. Which state needs to be visible?
				What happens on error? What does "loading" look like when the connection drops? These
				questions surface in design that would otherwise become afterthoughts in code.
			</p>

		</div>

		<!-- video: parent view -->
		<div class="not-prose my-10">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">Product demo — Parent-facing content (LMS 6+)</p>
			<div class="overflow-hidden rounded-xl border border-line">
				<video
					controls
					preload="metadata"
					class="w-full"
				>
					<source src="/projects/saut/5.mp4" type="video/mp4" />
				</video>
			</div>
			<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim opacity-60">Parents can access curriculum content and teach from home — shipped as part of Phase 2.5</p>
		</div>

		<div class="prose">

			<h2>The 65-feature roadmap</h2>

			<p>
				Managing a roadmap sounds abstract until you're the one deciding what ships this month
				and what waits. Phase 2.0 was non-negotiable — the core had to work before anything else.
				But after that, every phase was a negotiation between what the client prioritised, what
				the teachers needed most urgently, and what the team could deliver without burning out.
			</p>

			<p>
				Reports got pushed to Phase 2.4 because the data infrastructure wasn't ready in 2.2.
				Case studies moved up to 2.2 because teachers were filing them on paper and losing track.
				The digital curriculum — individual parent subscriptions — went last because it was a
				new business model, not a fix for an existing pain point. Every phasing decision had a
				reason, and most of those reasons came from watching teachers use the product.
			</p>

			<p>
				All six phases shipped. Every feature made it to production. That's the number I keep
				coming back to. Not the technology, not the framework migration, not the bilingual support.
				Sixty-five features planned, sixty-five features delivered. With three developers and
				no QA team.
			</p>

			<h2>What I'd tell myself</h2>

			<ul>
				<li>Don't wait for someone to give you the PM title. If you understand the product better than anyone else in the room, you're already doing the job — you just haven't named it yet.</li>
				<li>The best design work I did came from constraints, not inspiration. Designing within an existing system — same spacing, same components, same patterns — is harder and more valuable than designing from a blank canvas.</li>
				<li>Small teams win when the feedback loop is tight. Daily calls, same-day decisions, ship-on-Friday culture. The moment you add a handoff step, you lose a day. Multiply that by sixty-five features and you lose months.</li>
				<li>Building the same product for four years teaches you things that jumping between projects never will. You see the consequences of your early decisions. You live with the shortcuts. You learn that the component you built in a hurry is the one you'll be maintaining for the next three years.</li>
			</ul>

		</div>

		<!-- related articles -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">More on SAUT</p>
			</div>
			<div class="divide-y divide-accent/10">
				<a href="/writing/saut" class="group flex items-baseline gap-5 px-6 py-4 transition-colors hover:bg-accent/5">
					<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">←</span>
					<span>
						<span class="text-sm font-medium group-hover:text-accent transition-colors">Building SAUT</span>
						<span class="mt-0.5 block text-xs text-dim">The full story — four years, two frameworks, one mission.</span>
					</span>
				</a>
				<a href="/writing/saut/worksheet-builder" class="group flex items-baseline gap-5 px-6 py-4 transition-colors hover:bg-accent/5">
					<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">←</span>
					<span>
						<span class="text-sm font-medium group-hover:text-accent transition-colors">The Worksheet Builder</span>
						<span class="mt-0.5 block text-xs text-dim">Building a drag-and-drop design tool inside an LMS.</span>
					</span>
				</a>
			</div>
		</div>

		<!-- footer -->
		<div class="mt-16 flex items-center justify-between border-t border-line pt-8">
			<a
				href="/writing/saut"
				class="group flex items-center gap-2 text-sm font-medium text-dim transition-colors hover:text-ink"
			>
				<span class="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
				Back to SAUT
			</a>
			<a
				href="/"
				class="text-sm font-medium text-accent transition-opacity hover:opacity-70"
			>
				Portfolio ↗
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
