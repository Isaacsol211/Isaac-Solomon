<script lang="ts">
	import { site } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const title = 'The Worksheet Builder — A Design Tool Inside an LMS — Isaac Solomon';
	const description =
		'How I built a drag-and-drop canvas for special educators to create pixel-perfect printable worksheets — flashcards, shapes, multiple A4 artboards, all from a browser.';
	const canonical = `${site.url}/writing/saut/worksheet-builder`;
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
			Case Study · SAUT — Part 2
		</p>

		<h1 class="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			A Design Tool<br />Disguised as
			<em class="font-serif font-normal italic text-dim">a Feature.</em>
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim md:text-xl">
			Building a drag-and-drop canvas inside an LMS so teachers could create
			personalised, printable worksheets — pixel-perfect on A4, from a browser.
		</p>

		<!-- meta -->
		<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-line py-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			<span>SAUT · 2019 – 2023</span>
			<span class="h-3 w-px bg-line"></span>
			<span>Canvas · Drag & Drop · Print</span>
		</div>
	</div>

	<!-- ── Hero screenshot ─────────────────────────────────────────── -->
	<div class="mx-auto mt-12 max-w-5xl">
		<div class="overflow-hidden rounded-xl border border-line">
			<img
				src="/projects/saut/lms-feature-4-right-to-left.jpg"
				alt="SAUT worksheet builder — drag-and-drop canvas with shapes and educational content"
				width="1440"
				height="900"
				class="w-full object-cover"
				loading="eager"
			/>
		</div>
		<p class="mt-3 text-center text-xs text-dim">The worksheet canvas — teachers drag flashcards and shapes onto an A4 artboard.</p>
	</div>

	<!-- ── Article body ─────────────────────────────────────────────── -->
	<article class="mx-auto mt-16 max-w-3xl">
		<div class="prose">

			<p>
				Of everything I built on SAUT, the worksheet builder is the feature I'm proudest of. It's also
				the one that, from the outside, sounds like a checkbox on a feature list: "teachers can create
				worksheets." But what that actually meant was building a design tool — a simplified Figma,
				essentially — inside an education platform.
			</p>

			<h2>Why worksheets matter</h2>

			<p>
				SAUT is a school for children with Down syndrome. The students don't use the software —
				everything happens face to face, with physical materials. Flashcards on the table.
				Worksheets on paper. Assessment done in person.
			</p>

			<p>
				But every child learns differently. One child might be working on colour recognition
				while another is learning animal names. One child responds to large images with minimal
				text; another needs the text labels front and centre. A generic worksheet printed from
				a template doesn't work when every student has a different curriculum, different goals,
				different capabilities.
			</p>

			<p>
				Teachers needed a way to build personalised worksheets — specific to each child's current
				subgoals — using the flashcards from the SAUT library. And those worksheets had to print
				perfectly on A4 paper, because paper is the medium. Not a screen. Paper.
			</p>

			<h2>The canvas</h2>

			<p>
				The worksheet builder is a browser-based canvas. Teachers open it, and they get a blank
				A4-sized artboard. From there, they can:
			</p>

			<ul>
				<li>Drag flashcard images from the SAUT library onto the canvas</li>
				<li>Add geometric shapes — circles, rectangles, lines — as teaching aids</li>
				<li>Add text labels with configurable font size and colour</li>
				<li>Resize, reposition, and layer elements freely</li>
				<li>Print the result, or export it as a PDF</li>
			</ul>

			<p>
				It sounds straightforward until you think about what "print perfectly on A4" actually
				means. The canvas dimensions on screen aren't A4. The browser's print engine has its own
				opinions about margins, scaling, and page breaks. Drag-and-drop coordinates in pixels
				need to map to exact physical positions on a 210mm × 297mm sheet. And it needs to work
				on iPads — teachers used iPads in the classroom.
			</p>

		</div>

		<!-- requirements callout -->
		<div class="not-prose my-10 overflow-hidden rounded-xl border border-accent/20 bg-accent/5">
			<div class="border-b border-accent/15 px-6 py-4">
				<p class="text-xs font-medium tracking-[0.25em] uppercase text-accent">The Requirements</p>
				<p class="mt-1 font-medium tracking-tight">What "create worksheets" actually meant.</p>
			</div>
			<div class="divide-y divide-accent/10 px-6">
				{#each [
					{ n: '01', q: 'Exact A4 dimensions — what you see on screen is what prints on paper' },
					{ n: '02', q: 'Drag-and-drop positioning with pixel-precise placement' },
					{ n: '03', q: 'Flashcards from the SAUT library — searchable by name and tags' },
					{ n: '04', q: 'Three flashcard display modes — image + text, image only, text only' },
					{ n: '05', q: 'Three print sizes — small (16/page), medium (12/page), large (6/page)' },
					{ n: '06', q: 'Multi-page worksheets — multiple A4 artboards, one PDF' },
				] as item}
					<div class="flex items-baseline gap-5 py-4">
						<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">{item.n}</span>
						<span class="text-sm font-medium">{item.q}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="prose">

			<h2>The flashcard system</h2>

			<p>
				Every flashcard in SAUT has a name, an image, and a set of tags. The naming format is
				structured: <code>Monkey - animal, mammals, brown</code>. The name is the display label;
				the tags are for search and categorisation. Teachers browse the library by domain, search
				by tag, and drag what they need onto the canvas.
			</p>

			<p>
				Each flashcard can be displayed three ways: image with text label, image only, or text only.
				This matters because some children respond better to visual cues while others are working
				on word recognition. The teacher chooses the display mode per card, per worksheet, per child.
			</p>

			<p>
				And the sizes: small prints sixteen cards on a single A4 page. Medium gives you twelve.
				Large gives you six. The teacher picks the size based on the child's needs — younger
				children or those with visual processing challenges get larger cards. These aren't
				arbitrary sizes — they're calculated to divide an A4 sheet evenly with consistent margins.
			</p>

		</div>

		<!-- flashcard library image -->
		<div class="not-prose my-10">
			<div class="overflow-hidden rounded-xl border border-line">
				<img
					src="/projects/saut/lms-feature-6-right-to-left.jpg"
					alt="SAUT flashcard content library — categorised visual assets for body parts, vehicles, animals"
					width="1440"
					height="900"
					class="w-full object-cover"
					loading="lazy"
				/>
			</div>
			<p class="mt-2 text-center text-[10px] font-medium tracking-[0.15em] uppercase text-dim opacity-60">The flashcard library — categorised, tagged, searchable</p>
		</div>

		<div class="prose">

			<h2>Multi-page worksheets</h2>

			<p>
				The initial version was one artboard, one page. Then the request came: teachers wanted
				multi-page worksheets. A sequence of exercises that built on each other — page one introduces
				the concept with large flashcards, page two has a matching exercise, page three is a
				fill-in-the-blank with shapes and text.
			</p>

			<p>
				This meant managing state across multiple artboards. Each artboard is its own A4 canvas
				with its own set of elements, its own positioning grid. But they all belong to a single
				worksheet entity. When you export, they compile into a multi-page PDF where each page
				maps exactly to one artboard.
			</p>

			<p>
				The tricky part was the UI. How do you navigate between artboards without losing your
				mental model of the worksheet as a whole? How do you reorder pages? Duplicate a page
				and modify it slightly for a different child? Delete page three without affecting pages
				one and two? It's the kind of feature that sounds simple in a spec and gets complex
				the moment a real teacher starts using it.
			</p>

			<h2>The print problem</h2>

			<p>
				Browser printing is a minefield. Every browser handles <code>@media print</code> slightly
				differently. Safari on iPad — the device teachers actually used — has its own quirks
				around margins, page breaks, and scaling. The goal was simple: what the teacher sees on
				the canvas is exactly what prints on paper. No surprises, no misalignment, no elements
				drifting off the edge.
			</p>

			<p>
				We had to account for the difference between CSS pixels and physical millimetres. An A4
				sheet is 210 × 297mm, but the canvas renders in pixels at whatever DPI the device happens
				to use. The mapping between drag-and-drop coordinates and print positions had to be
				exact — a flashcard placed in the top-right corner of the canvas had to appear in the
				top-right corner of the printed page, not shifted by the browser's default margins.
			</p>

			<p>
				This took more iterations than I'd like to admit. The first version worked on desktop Chrome.
				It broke on Safari. The Safari fix broke the iPad print flow. The iPad fix introduced a
				scaling issue on high-DPI displays. Each fix revealed another edge case. Eventually we
				got it right — consistent, predictable, pixel-perfect printing across every device the
				teachers used.
			</p>

		</div>

		<!-- video: worksheet builder demo -->
		<div class="not-prose my-10">
			<p class="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-dim">Product demo — Worksheet builder in action</p>
			<div class="overflow-hidden rounded-xl border border-line">
				<video
					controls
					playsinline
					preload="metadata"
					class="w-full"
				>
					<source src="/projects/saut/4.mp4" type="video/mp4" />
				</video>
			</div>
			<p class="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-dim opacity-60">Teacher picks flashcards, places them on the canvas with shapes, and prints the worksheet</p>
		</div>

		<div class="prose">

			<h2>Templates and sharing</h2>

			<p>
				Once teachers started building worksheets, two patterns emerged. First, they wanted to
				save worksheet layouts as templates — a matching exercise layout they could reuse with
				different flashcards each time. Second, they wanted to share worksheets with other
				teachers, especially within classgroups where multiple students shared similar goals.
			</p>

			<p>
				We added both. Templates could be created at two levels: admin-level templates available
				to all teachers, and personal templates created by individual teachers for their own use.
				Worksheets could be duplicated, shared within classgroups, and modified without affecting
				the original. A teacher could take a colleague's worksheet, swap out three flashcards
				for ones appropriate to their student, and print a personalised version in under a minute.
			</p>

			<h2>What I learned</h2>

			<ul>
				<li>The hardest features are the ones that sound simple in the brief. "Teachers can create worksheets" is one sentence. The implementation was months of work.</li>
				<li>Print fidelity is a browser compatibility problem disguised as a design problem. You solve it with testing, not with clever CSS.</li>
				<li>A canvas tool in a domain-specific application doesn't need to be Figma. It needs to do ten things perfectly, not a hundred things adequately. Constraining the feature set was as important as building it.</li>
				<li>Watching a teacher build a worksheet for a specific child — picking flashcards that match that child's current subgoals, sizing them for that child's visual processing level — is the moment you understand why custom tooling matters. A PDF generator couldn't do this.</li>
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
				<a href="/writing/saut/three-hats" class="group flex items-baseline gap-5 px-6 py-4 transition-colors hover:bg-accent/5">
					<span class="shrink-0 font-mono text-[10px] tracking-[0.2em] text-accent/60">→</span>
					<span>
						<span class="text-sm font-medium group-hover:text-accent transition-colors">Wearing Three Hats</span>
						<span class="mt-0.5 block text-xs text-dim">How four years on one product turned a frontend dev into a PM and designer.</span>
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

	.prose code {
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace;
		font-size: 0.875em;
		background: var(--color-paper-2);
		border: 1px solid var(--color-line);
		border-radius: 4px;
		padding: 0.15em 0.4em;
	}
</style>
