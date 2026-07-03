<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const title = 'Four Years, Two Frameworks, One Mission — Isaac Solomon';
	const description =
		'How I built a Learning Management System for special educators teaching children with Down syndrome — from Vue.js to SvelteKit, bilingual RTL/LTR, and a 5-month complete rewrite of a live product.';
	const canonical = `${site.url}/writing/saut`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/projects/saut/landing-hero-devices-right-to-left.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}/projects/saut/landing-hero-devices-right-to-left.png" />
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
			Case Study · SAUT
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			Four Years, Two<br />Frameworks,
			<em class="font-serif font-normal italic text-dim">One Mission.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			How I built a Learning Management System for special educators teaching children
			with Down syndrome — then rewrote it from scratch when the architecture couldn't keep up.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>2019 – 2023</span>
			<span class="h-3 w-px bg-line"></span>
			<span>EdTech · LMS</span>
			<span class="h-3 w-px bg-line"></span>
			<span>Vue.js → SvelteKit · Rails · PostgreSQL</span>
		</div>

		<!-- payoff teaser -->
		<div class="mt-10 rounded-xl border border-line bg-paper-2/60 px-6 py-5">
			<p class="text-sm leading-relaxed text-dim">
				<strong class="font-medium text-ink">The result:</strong> a bilingual Arabic/English platform
				with offline-first assessments, a drag-and-drop worksheet builder, and a 65-feature release roadmap
				that shipped in full — built by a three-person dev team with no QA. The project grew my role from
				pure frontend developer into product manager and emergency UI designer.
			</p>
		</div>
	</div>

	<!-- ── Hero screenshot ─────────────────────────────────────────── -->
	<div class="mx-auto mt-12 max-w-5xl">
		<img
			src="/projects/saut/landing-hero-devices-right-to-left.png"
			alt="SAUT LMS shown across tablet and mobile devices — bilingual Arabic interface with student profiles and skill modules"
			width="1440"
			height="900"
			style="view-transition-name: project-saut"
			class="w-full rounded-xl object-cover"
			loading="eager"
		/>
		<p class="mt-3 text-center text-xs text-dim">SAUT across devices — bilingual, RTL-first, designed for classrooms.</p>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				SAUT is a school in Riyadh for children with Down syndrome, backed by the Princess of Riyadh.
				The platform I built — also called SAUT — is a Learning Management System designed for
				their teachers: a tool for planning individualised curricula, running daily assessments,
				printing personalised learning materials, and tracking each child's progress across years
				of education.
			</p>

			<p>
				The students never touch the software. Everything is in-person — flash cards on the table,
				worksheets on paper, assessments done face to face. The platform exists to help teachers do
				that work better: to know what each child has mastered, what they've forgotten, what to teach
				next. The technology serves the pedagogy, not the other way around.
			</p>

			<p>
				I was on this project from day one to handoff — four-plus years. I built both versions of the
				frontend, managed the product roadmap, designed screens when the design team couldn't keep up,
				and helped ship all six release phases. It's the longest I've worked on any single product,
				and the one that taught me the most about what it means to build something that actually matters.
			</p>

			<h2>The complexity</h2>

			<p>
				This wasn't a simple CRUD app with a few forms. The data model alone would give you pause.
				A curriculum in SAUT has five levels of nesting: Curriculum → Domain → Category → Goal → Subgoal.
				Each subgoal carries its own assessment criteria, flashcards, lesson plans, and learning materials.
				Multiply that across every student, every classroom, every academic year.
			</p>

			<p>
				Then there's assessment. Four different criteria types — a linear 5-point scale for most domains,
				binary pass/fail for others, an 8-point Makaton scale for sign language communication, and
				percentile-based scoring for early childhood. A subgoal is "complete" when a student hits a
				success threshold: say, three successful assessments out of five total attempts, non-consecutive.
				The system tracks all of this automatically.
			</p>

		</div>

		<!-- complexity callout -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Scale</p>
				<p class="mt-1 font-medium tracking-tight">What the system had to handle.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: '9 user roles — from super admin to speech therapist, each with granular permissions' },
					{ n: '02', q: '5-level curriculum hierarchy with linked references across schools' },
					{ n: '03', q: '4 assessment criteria types — Linear, Binary, Makaton, Percentile' },
					{ n: '04', q: 'Offline-first daily assessments — syncs when connectivity returns' },
					{ n: '05', q: 'Bilingual Arabic/English with a live RTL ↔ LTR toggle' },
					{ n: '06', q: '65+ features shipped across 6 phased releases' },
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
				Nine user roles, each with a different slice of the system. A teacher creates IEPs and runs daily
				assessments. A supervisor reviews and approves them before they're finalised. A speech therapist
				only sees communication-related goals. The school admin manages staff but can't create IEPs. The
				super admin controls the curriculum across multiple schools. Every action in the system passes through
				an approval workflow — teacher creates, supervisor reviews, teacher finalises. The permission matrix
				had 66 rows.
			</p>

			<h2>V1 — the first build</h2>

			<p>
				V1 was built with Vue.js on the frontend and Ruby on Rails on the backend. I joined at
				<a href="https://www.able.do" target="_blank" rel="noopener noreferrer">Able.do</a>
				(then called Uncommon) and this was one of my first major projects. For V1, I was 100% frontend
				— writing Vue components, building the assessment interfaces, the student profiles, the IEP
				creation flows. My colleague Surajith handled the functional plumbing; I took on the complex UI,
				the page animations, and the RTL work.
			</p>

			<p>
				V1 worked. Teachers used it daily. Students were assessed, IEPs were created, reports were generated.
				But there was a fundamental architectural problem hiding under the surface, and it was getting worse
				with every school that adopted the system.
			</p>

			<h2>The duplication problem</h2>

			<p>
				In V1, when a teacher created an IEP for a student, the system <em>copied</em> goals and subgoals
				from the curriculum into the student's record. Every student got their own duplicate of every goal
				they were working on. If someone found a typo in the master curriculum, or restructured a category,
				or updated assessment criteria — none of those changes reached existing IEPs. You'd have to manually
				update every student's copy.
			</p>

			<p>
				At one school, that was manageable. When the plan was to scale to multiple schools sharing the same
				curriculum, it was a time bomb. Imagine correcting a subgoal description and having to propagate that
				change across hundreds of student records across multiple institutions. It couldn't work.
			</p>

			<p>
				The decision was made: complete rewrite. Not a refactor, not an incremental migration — a clean rebuild
				of the frontend and a restructuring of the backend data model. Central curriculum database with
				linked references instead of copies. Updates propagate automatically. No duplication.
			</p>

			<h2>V2 — the rewrite</h2>

			<p>
				We migrated the frontend from Vue.js to SvelteKit and restructured the Rails backend
				to support the new linked-reference architecture. The timeline was aggressive: kickoff in March 2023,
				beta by July 15, final release by August 1. Five months for a complete rewrite of a production system
				that teachers depended on daily.
			</p>

		</div>

		<!-- migration comparison -->
		<div class="not-prose my-10 overflow-hidden rounded-2xl border border-coal bg-coal text-cream">
			<div class="border-b border-cream/10 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">The Migration</p>
				<p class="mt-1 font-medium tracking-tight">What changed between V1 and V2.</p>
			</div>
			<div class="divide-y divide-cream/10">
				{#each [
					{ metric: 'Frontend framework', before: 'Vue.js', after: 'SvelteKit + Tailwind' },
					{ metric: 'Data architecture', before: 'Copied goals per student', after: 'Linked references — single source of truth' },
					{ metric: 'Curriculum updates', before: 'Manual propagation', after: 'Automatic — edit once, propagates everywhere' },
					{ metric: 'School support', before: 'Single-school', after: 'Multi-school with centralised permissions' },
					{ metric: 'Assessment criteria', before: 'Fixed per domain', after: 'Flexible — overridable per student' },
					{ metric: 'IEP editing', before: 'Locked after approval', after: 'Versioned — case studies create new IEP versions' },
					{ metric: 'Offline support', before: 'None', after: 'Service worker — attendance and assessments sync on reconnection' },
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
				The team was small: two frontend developers, one backend developer. No dedicated QA — we tested
				everything ourselves. I handled the complex UI work: the assessment interfaces, the curriculum
				browser, the student onboarding flows, all the page animations, and the entire RTL/LTR system.
				Surajith focused on the functional side — data fetching, state management, form handling.
			</p>

			<p>
				We migrated all active student data, all curriculum content, all historical assessments and IEPs.
				Teachers had to log in to a new interface in August and keep working without missing a beat.
				The school year waits for no one.
			</p>

		</div>

		<!-- video: onboarding -->
		<div class="not-prose my-10">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">Product demo — Student onboarding & IEP creation</p>
			<div class="overflow-hidden rounded-xl border border-line">
				<video
					controls
					playsinline
					preload="metadata"
					class="w-full"
				>
					<source src="/projects/saut/1.mp4" type="video/mp4" />
				</video>
			</div>
			<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim opacity-60">Initial assessment → competency check → semester curriculum creation</p>
		</div>

		<div class="prose">

			<h2>The RTL challenge</h2>

			<p>
				SAUT is a bilingual application. The interface runs in both Arabic (right-to-left) and English
				(left-to-right), with a toggle that switches the entire UI live. This isn't just flipping
				<code>direction: rtl</code> on the body — it's every layout, every animation, every interaction.
			</p>

			<p>
				Scroll animations that slide content in from the left? They need to slide from the right in RTL.
				A sidebar that opens from the left edge? It opens from the right. Progress bars that fill
				left-to-right? Reversed. Tab navigation, breadcrumbs, icon positions, text truncation,
				number formatting — everything mirrors. The CSS logical properties help (<code>margin-inline-start</code>
				instead of <code>margin-left</code>), but the edge cases are endless.
			</p>

			<p>
				The curriculum content itself is in Arabic — domain names, goal descriptions, subgoal titles,
				flashcard labels. But the UI chrome, navigation, and structural elements needed to work in both
				directions. Teachers could switch languages without reloading, and the layout had to respond
				instantly.
			</p>

		</div>

		<!-- video: daily assessment -->
		<div class="not-prose my-10">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">Product demo — Daily classroom assessment</p>
			<div class="overflow-hidden rounded-xl border border-line">
				<video
					controls
					playsinline
					preload="metadata"
					class="w-full"
				>
					<source src="/projects/saut/2.mp4" type="video/mp4" />
				</video>
			</div>
			<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim opacity-60">Teacher marks each student's progress on their assigned subgoals — all done in person</p>
		</div>

		<div class="prose">

			<h2>The roadmap</h2>

			<p>
				V2 wasn't a single release — it was a 65-feature roadmap phased across six versions. Phase 2.0
				was the core: student onboarding, IEP creation, daily assessment, login. Each subsequent phase
				added a layer: materials library, case studies, worksheets, classgroups, reports at three levels
				(student, classroom, school), and finally a digital curriculum module for parents to subscribe
				to individually.
			</p>

			<p>
				All six phases shipped. Every feature on the roadmap made it to production. For a three-person
				dev team working with daily client calls and no dedicated QA, that's the thing I keep coming
				back to. Not any single feature, but the fact that we planned sixty-five of them and delivered
				all sixty-five.
			</p>

			<h2>The team and the client</h2>

			<p>
				The design came from Tropics, an external design studio led by Zubin. They created the visual
				language and the Figma files. Our team at Able.do built the product: two frontend devs, one
				backend dev. The client team at SAUT — led by Haifa Alshaik — handled UAT and provided daily
				feedback.
			</p>

			<p>
				We had daily calls. Not weekly check-ins — daily. The SAUT team would test new features, report
				issues, discuss improvements, and we'd plan the next steps together. That rhythm is what made
				the aggressive timeline possible. There was never a gap longer than a day between a question
				and an answer.
			</p>

			<h2>The stack</h2>

			<ul>
				<li><strong>Frontend:</strong> SvelteKit + Tailwind CSS (V2), Vue.js (V1)</li>
				<li><strong>Backend:</strong> Ruby on Rails + PostgreSQL</li>
				<li><strong>Hosting:</strong> AWS Middle East region — $200-300/month operational cost</li>
				<li><strong>Security:</strong> Cloudflare — WAF, SSL/TLS, rate limiting, DDoS protection</li>
				<li><strong>Offline:</strong> Service worker with sync-on-reconnect for attendance and assessments</li>
				<li><strong>Testing:</strong> Rails unit tests + rspec (backend), vitest + Playwright (frontend)</li>
				<li><strong>Design:</strong> Figma — three files maintained by Tropics</li>
			</ul>

			<h2>The handoff</h2>

			<p>
				After four-plus years, the contract moved to a larger company based in the Middle East. SAUT is
				backed by the Princess of Riyadh, and as the project grew, the stakeholders wanted a regional team
				with a bigger name for investor visibility. It wasn't a performance decision — every phase had
				shipped, the product was stable, and the teachers were using it daily.
			</p>

			<p>
				We handed off a fully documented, fully tested system with a complete product wiki, permission
				matrices, data migration guides, and operational runbooks. The kind of handoff where the receiving
				team can actually pick it up and keep going.
			</p>

			<h2>What I learned</h2>

			<ul>
				<li>A three-person team can ship a complex product if the communication loop is tight enough. Daily calls with the client removed ambiguity faster than any specification document.</li>
				<li>Data architecture decisions made in year one define what's possible in year four. V1's copy-based model worked until it didn't — and "until it didn't" cost us a five-month rewrite.</li>
				<li>RTL support isn't a feature you bolt on at the end. It's an architectural decision that shapes every component, every animation, every layout decision from day one.</li>
				<li>Building the same product twice — first in Vue, then in Svelte — teaches you what the framework gave you and what was always just your code. Most of the hard problems were domain problems, not framework problems.</li>
				<li>The best product knowledge comes from building every screen yourself. By V2, I could answer product questions faster than checking the spec because I'd already built the flows that the spec described.</li>
			</ul>

		</div>

		<!-- related articles -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">More on SAUT</p>
				<p class="mt-1 font-medium tracking-tight">Deep dives into specific aspects of the project.</p>
			</div>
			<div class="divide-y divide-accent/10">
				<a href="/writing/saut/worksheet-builder" class="group flex items-baseline gap-5 px-6 py-4 transition-colors hover:bg-accent/5">
					<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">01</span>
					<span>
						<span class="text-sm font-medium group-hover:text-accent transition-colors">The Worksheet Builder</span>
						<span class="mt-0.5 block text-xs text-dim">Building a drag-and-drop design tool inside an LMS — pixel-perfect A4 printing from a browser canvas.</span>
					</span>
				</a>
				<a href="/writing/saut/three-hats" class="group flex items-baseline gap-5 px-6 py-4 transition-colors hover:bg-accent/5">
					<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">02</span>
					<span>
						<span class="text-sm font-medium group-hover:text-accent transition-colors">Wearing Three Hats</span>
						<span class="mt-0.5 block text-xs text-dim">How four years on one product turned a frontend developer into a product manager and emergency designer.</span>
					</span>
				</a>
			</div>
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
				href="https://saut-website-demo.able.do"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-accent transition-opacity hover:opacity-70"
			>
				Visit SAUT ↗
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
