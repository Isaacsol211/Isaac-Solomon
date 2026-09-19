<script lang="ts">
	import { onMount } from 'svelte';
	import { portalToBody } from '$lib/actions/portal-to-body';
	import { entranceDelay, initMotion, MOTION_OK, REDUCED_MOTION, MD, FINE_POINTER, openingAlreadyRevealed } from '$lib/motion';
	import { projects, type Project } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';

	type Frame = NonNullable<Project['gallery']>[number];

	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);

	let sectionEl = $state<HTMLElement>();
	let listEl = $state<HTMLOListElement>();

	/* ── Cursor-following image state ──────────────────── */
	let activeIndex = $state(-1);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let lerpX = $state(0);
	let lerpY = $state(0);
	/** Hover/cursor effects need a fine pointer; mirrors the FINE_POINTER query live. */
	let finePointer = $state(false);
	/*
	 * Rows whose preview image has been requested. The portal used to carry a
	 * src for every row from mount, so a first visit on a mouse device fetched
	 * ~270 KB of images that only appear on hover. Now a row's image gets its
	 * src the first time the pointer enters it; the fade still plays because
	 * the <img> element itself has always been there.
	 */
	let seen = $state<number[]>([]);
	let reduced = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;

		let ctxPromise: Promise<any> | undefined;

		const gsapInit = async () => {
			const { gsap, ScrollTrigger } = await initMotion();

			if (!sectionEl) return;

			/*
			 * One matchMedia block owns every scene in this section. It re-runs
			 * (after reverting) whenever reduced-motion, pointer capability or the
			 * md breakpoint changes, so the answers below are never stale. Both
			 * motion queries are listed so the callback always has a match.
			 */
			const mm = gsap.matchMedia(sectionEl);
			mm.add(
				{ motion: MOTION_OK, reducedQ: REDUCED_MOTION, twoColumn: MD, fine: FINE_POINTER },
				(context) => {
				const c = context.conditions ?? {};
				const reducedMotion = Boolean(c.reducedQ);
				const twoColumn = Boolean(c.twoColumn);
				const isTouch = !c.fine;
				reduced = reducedMotion;
				finePointer = !isTouch;

				/* ── Featured cards — clip reveal + scrubbed text drift ───── */
				const blocks = sectionEl!.querySelectorAll('[data-bleed-block]');

				if (!reducedMotion) {
					blocks.forEach((block, i) => {
						const imgs = [...block.querySelectorAll<HTMLElement>('[data-bleed-img]')];
						/* The hero stage is in the first viewport on load and follows the title
						   rise; it is the only block with either behaviour. */
						const heroStage = block.hasAttribute('data-hero-stage');
						const revealAt = heroStage ? 'top bottom' : 'top 75%';
						const lead = heroStage ? 0.55 + entranceDelay() : 0;
						/* If app.html's fallback has already revealed the page, the stage is
						   visible now; creating its fromTo would clip it and play it back in. */
						if (heroStage && openingAlreadyRevealed()) return;
						const text = block.querySelector('[data-bleed-text]');
						const tags = block.querySelectorAll('[data-bleed-tag]');
						const innerImgs = [...block.querySelectorAll<HTMLElement>('[data-bleed-img] img')];
						const meta = block.querySelector('[data-bleed-meta]');
						/*
						 * Horizontal drift is a two-column device: the text block slides in
						 * from the side the image is not on. Below md the columns stack and the
						 * block is full width, so a 56px offset has nowhere to go — it just
						 * pushes the page 36px wider than the viewport until the trigger fires.
						 */
						const driftX = twoColumn ? (i % 2 === 0 ? 56 : -56) : 0;

						/* crop opens, then the image settles inside its fixed frame; a second
						   frame in the same block follows 120ms behind the first */
						imgs.forEach((el, k) => {
							gsap.fromTo(
								el,
								{ clipPath: 'inset(100% 0 0 0)' },
								{
									clipPath: 'inset(0% 0 0 0)',
									duration: 0.7,
									delay: lead + k * 0.12,
									ease: 'expo.out',
									scrollTrigger: { trigger: block, start: revealAt, once: true }
								}
							);
						});
						innerImgs.forEach((el, k) => {
							gsap.fromTo(
								el,
								{ scale: 1.04 },
								{
									scale: 1,
									duration: 1.1,
									delay: lead + 0.1 + k * 0.12,
									ease: 'expo.out',
									scrollTrigger: { trigger: block, start: revealAt, once: true }
								}
							);
						});

						/* No scroll drift on these images. They are interface screenshots that
						   fit their frames exactly, so a vertical translation exposed the
						   frame behind them — ~16px at the end of the range. Crop and settle
						   are the whole entrance. */

						if (text) {
							gsap.fromTo(
								text,
								{ opacity: 0, x: driftX, y: 24 },
								{
									opacity: 1,
									x: 0,
									y: 0,
									duration: 1.1,
									ease: 'power3.out',
									delay: 0.25,
									scrollTrigger: { trigger: block, start: 'top 75%', once: true }
								}
							);

						}
						if (meta) {
							gsap.fromTo(
								meta,
								{ y: 22, opacity: 0 },
								{
									y: 0,
									opacity: 1,
									duration: 0.9,
									ease: 'power3.out',
									scrollTrigger: { trigger: block, start: 'top 78%', once: true }
								}
							);
						}
						if (tags.length) {
							gsap.fromTo(
								tags,
								{ opacity: 0, y: 16 },
								{
									opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
									stagger: 0.08, delay: 0.7,
									scrollTrigger: { trigger: block, start: 'top 75%', once: true }
								}
							);
						}
					});
				}

				/* ── List items — line-mask entrance ──────────── */
				if (listEl && !reducedMotion) {
					const items = listEl.querySelectorAll('[data-project-row]');
					gsap.set(items, { opacity: 0, yPercent: 115 });
					ScrollTrigger.batch(items, {
						onEnter: (batch) => {
							gsap.to(batch, {
								opacity: 1,
								yPercent: 0,
								duration: 0.95,
								ease: 'power3.out',
								stagger: 0.1,
								overwrite: true
							});
						},
						start: 'top 88%',
						once: true
					});
				}
				}
			);

			return mm;
		};

		ctxPromise = gsapInit();

		return () => {
			ctxPromise?.then((ctx) => ctx?.revert());
		};
	});

	/*
	 * Lerp loop for the cursor-following preview. Scoped to the hover: the
	 * preview is only drawn while activeIndex >= 0, so running the loop from
	 * mount scheduled a frame every 16ms for the whole life of the page to
	 * smooth a position nothing was reading. onmouseenter re-seeds lerpX/lerpY
	 * from the cursor when activeIndex is -1, so freezing between hovers cannot
	 * leave the preview to slide in from a stale position.
	 */
	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	$effect(() => {
		if (!finePointer || reduced || activeIndex < 0) return;

		let rafId = requestAnimationFrame(function tick() {
			lerpX = lerp(lerpX, mouseX, 0.1);
			lerpY = lerp(lerpY, mouseY, 0.1);
			rafId = requestAnimationFrame(tick);
		});

		return () => cancelAnimationFrame(rafId);
	});
</script>

<!--
	Shared pieces of the three light compositions. Each composition arranges
	the same frame, meta row and text differently; the markup is written once.
-->
{#snippet frame(g: Frame, sizes: string, vt?: string)}
	<figure class="min-w-0">
		<div data-bleed-img class="overflow-hidden rounded-lg bg-paper-2">
			<div style="aspect-ratio: {g.ratio ?? `${g.width} / ${g.height}`}" class="overflow-hidden">
				<img
					src={g.src}
					srcset="{g.small} 800w, {g.src} {g.width}w"
					{sizes}
					alt={g.alt}
					width={g.width}
					height={g.height}
					loading="lazy"
					decoding="async"
					style="object-position: {g.position ?? '50% 0%'};{vt ? ` view-transition-name: ${vt};` : ''}"
					class="block h-full w-full object-cover"
				/>
			</div>
		</div>
		<figcaption class="mt-3 text-xs font-medium tracking-[0.18em] lowercase text-dim">{g.caption}</figcaption>
	</figure>
{/snippet}

{#snippet metaRow(project: Project, i: number)}
	<div class="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mb-10">
		<span data-bleed-meta class="text-[11px] font-medium tracking-[0.25em] text-dim uppercase">
			{String(i + 1).padStart(2, '0')} — {project.year} — {project.category}
		</span>
		<span class="text-[11px] font-medium tracking-[0.25em] text-dim uppercase">{project.status ?? ''}</span>
	</div>
{/snippet}

<!--
	Scope first, then the call and what it produced. A client wants scope and
	handover, a hiring manager wants the judgment; neither should go looking.
-->
{#snippet details(project: Project, measure: string)}
	<p class="{measure} text-sm leading-relaxed text-dim">{project.description}</p>
	{#if project.role}
		<p class="mt-3 {measure} text-sm leading-relaxed font-medium text-ink/75">{project.role}</p>
	{/if}
	{#if project.decision || project.outcome}
		<div class="mt-5 {measure} border-t border-line pt-4">
			{#if project.decision}
				<p class="text-sm leading-relaxed text-dim">{project.decision}</p>
			{/if}
			{#if project.outcome}
				<p class="font-serif text-2xl leading-tight text-ink/90 italic md:text-[1.6rem] {project.decision ? 'mt-3' : ''}">
					{project.outcome}
				</p>
			{/if}
		</div>
	{/if}
	{#if project.credits}
		<p class="mt-3 text-xs leading-relaxed text-dim">{project.credits}</p>
	{/if}
	<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
		<span class="inline-flex items-center gap-2 text-xs font-medium text-accent-text">
			{project.caseStudy ? 'Case study' : 'Visit'}
			<ArrowUpRight class="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
		</span>
		<span class="flex flex-wrap gap-2">
			{#each project.tags as tag (tag)}
				<span data-bleed-tag class="rounded-full border border-line px-3 py-1 text-[11px] font-medium tracking-[0.15em] text-dim uppercase">{tag}</span>
			{/each}
		</span>
	</div>
{/snippet}

<!--
	No header band. The section opens on the first project's stage, which is
	the second half of the hero composition; its meta row carries the
	"Selected Work" heading so heading navigation still finds the section.
-->
<section bind:this={sectionEl} id="projects" class="relative">
	{#each featured as project, i (project.title)}
		{@const img = project.desktopImage}
		{@const vtName = project.caseStudy ? `project-${project.caseStudy.split('/').pop()}` : undefined}
		{@const href = project.caseStudy ?? project.href}
		{@const external = !project.caseStudy && Boolean(project.href)}
		<!-- clip, not hidden: contains the text block's entrance drift without
		     creating a scroll container that would break sticky descendants -->
		<div
			data-bleed-block
			data-hero-stage={project.featuredLayout === 'stage' ? '' : undefined}
			class="relative [overflow-x:clip] {project.featuredLayout === 'stage'
				? 'text-cream'
				: 'border-t border-line bg-paper text-ink'}"
		>
			<svelte:element
				this={href ? 'a' : 'div'}
				{href}
				target={external ? '_blank' : undefined}
				rel={external ? 'noopener noreferrer' : undefined}
				class="group block"
				aria-label={href ? `View project: ${project.title}` : undefined}
			>
				{#if project.featuredLayout === 'stage'}
					<!--
						Stage: the second act of the hero. The coal panel begins part-way down
						the image, so the photograph sits across the seam between paper and
						coal and the two sections read as one surface.
					-->
					<div class="relative px-5 sm:px-8">
						<div class="mx-auto -mt-20 max-w-6xl md:-mt-28">
							<div class="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-ink">
								<Eyebrow title="Selected Work" as="h2" />
								<span data-bleed-meta class="text-[11px] font-medium tracking-[0.25em] text-dim uppercase">
									{String(i + 1).padStart(2, '0')} — {project.year} — {project.category}
								</span>
							</div>
							<div class="relative">
								<div aria-hidden="true" class="absolute top-1/3 bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-coal"></div>
								<div data-bleed-img class="overflow-hidden rounded-lg ring-1 ring-cream/15">
									<!-- Whole screenshot on phones; on wider screens a 2:1 crop that keeps the headline and statement and drops the empty strips. -->
									<div class="overflow-hidden sm:aspect-[2/1]">
										<img
											src={img}
											width="2880"
											height="1800"
											srcset={project.previewSmall && project.previewWidth
												? `${project.previewSmall} 800w, ${img} ${project.previewWidth}w`
												: undefined}
											sizes={project.previewSmall && project.previewWidth ? '(min-width: 1280px) 1216px, 100vw' : undefined}
											alt="{project.title} screenshot"
											loading="eager"
											fetchpriority="high"
											decoding="async"
											style="object-position: 50% 26%;{vtName ? ` view-transition-name: ${vtName};` : ''}"
											class="block h-auto w-full object-cover sm:h-full"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Everything under the image is on coal: a full-bleed band with the 6xl column inside. -->
					<div class="relative left-1/2 w-screen -translate-x-1/2 bg-coal dark:border-t dark:border-cream/10">
						<div class="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 md:pt-14 md:pb-24">
							<div class="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
								<h3 class="text-6xl font-medium tracking-[-0.03em] lowercase md:col-span-6 md:text-[5.5rem] md:leading-[0.9]">
									{project.title}
								</h3>
								<div data-bleed-text class="md:col-span-6">
									<!-- Same order as the other layouts, in the cream tones the coal band needs. -->
									<p class="max-w-lg text-sm leading-relaxed text-cream/60">{project.description}</p>
									{#if project.role}
										<p class="mt-3 max-w-lg text-sm leading-relaxed font-medium text-cream/80">{project.role}</p>
									{/if}
									{#if project.decision || project.outcome}
										<div class="mt-5 max-w-lg border-t border-cream/15 pt-4">
											{#if project.decision}
												<p class="text-sm leading-relaxed text-cream/60">{project.decision}</p>
											{/if}
											{#if project.outcome}
												<p class="font-serif text-2xl leading-tight text-cream/90 italic md:text-[1.75rem] {project.decision ? 'mt-3' : ''}">
													{project.outcome}
												</p>
											{/if}
										</div>
									{/if}
									{#if project.credits}
										<p class="mt-3 text-xs leading-relaxed text-cream/55">{project.credits}</p>
									{/if}
									<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
										<span class="inline-flex items-center gap-2 text-xs font-medium text-accent">
											{project.caseStudy ? 'Case study' : 'Visit'}
											<ArrowUpRight class="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
										</span>
										<span class="flex flex-wrap gap-2">
											{#each project.tags as tag (tag)}
												<span data-bleed-tag class="rounded-full border border-cream/15 px-3 py-1 text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">{tag}</span>
											{/each}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				{:else if project.featuredLayout === 'pair' && project.gallery}
					<!-- Every featured project after the stage: the frames lead, then the text. -->
					<div class="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
						{@render metaRow(project, i)}
						<div class="grid gap-6 md:gap-8 {project.gallery.length > 1 ? 'sm:grid-cols-2' : ''}">
							{#each project.gallery as g, k (g.src)}
								{@render frame(g, project.gallery.length > 1 ? '(min-width: 768px) 46vw, 100vw' : '(min-width: 1280px) 1216px, 100vw', k === 0 ? vtName : undefined)}
							{/each}
						</div>
						<div class="mt-12 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10">
							<div class="md:col-span-5">
								<h3 class="text-5xl font-medium tracking-[-0.02em] lowercase lg:text-6xl">{project.title}</h3>
							</div>
							<div data-bleed-text class="md:col-span-7">
								{@render details(project, 'max-w-lg')}
							</div>
						</div>
					</div>
				{/if}
			</svelte:element>
		</div>
	{/each}

	<!-- Remaining projects — editorial list with hover image -->
	<div class="border-t border-line px-5 py-16 sm:px-8 md:py-24">
		<div class="mx-auto max-w-6xl">
			<!-- Column headers — mirrors the row grid, desktop only -->
			<div
				class="hidden pb-4 text-[11px] font-medium tracking-[0.2em] lowercase text-dim md:grid md:grid-cols-[5rem_1fr_10rem_auto] md:gap-x-6"
				aria-hidden="true"
			>
				<span>year</span>
				<span>brand</span>
				<span>industry</span>
				<span>link</span>
			</div>
			<ol bind:this={listEl} class="border-b border-line">
				{#each rest as project, i (project.title)}
					{@const href = project.caseStudy ?? project.href}
					{@const external = !project.caseStudy}
					{@const linked = Boolean(href)}
					<li
						class="overflow-hidden"
						onmouseenter={(e) => {
							// Snap the lerp position on entry so the preview doesn't fly in from stale coords
							if (activeIndex === -1) {
								mouseX = lerpX = e.clientX;
								mouseY = lerpY = e.clientY;
							}
							activeIndex = i;
							if (!seen.includes(i)) seen = [...seen, i];
						}}
						onmouseleave={() => (activeIndex = -1)}
						onmousemove={(e) => {
							mouseX = e.clientX;
							mouseY = e.clientY;
						}}
					>
						<svelte:element
							this={linked ? 'a' : 'div'}
							data-project-row
							{href}
							target={linked && external ? '_blank' : undefined}
							rel={linked && external ? 'noopener noreferrer' : undefined}
							class="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 border-t border-line py-6 transition-colors duration-300 md:grid-cols-[5rem_1fr_10rem_auto] md:gap-x-6 md:py-8"
							aria-label={linked ? `View project: ${project.title}` : undefined}
						>
							<span class="text-lg font-medium tabular-nums text-dim transition-colors duration-300 group-hover:text-ink md:text-2xl">
								{project.year}
							</span>
							<span class="text-lg font-medium tracking-tight md:text-2xl">
								{project.title}
							</span>
							<span class="hidden text-sm text-dim md:block">
								{project.category}
							</span>
							<span
								class="flex items-center gap-1.5 text-xs font-medium {project.caseStudy
									? 'text-accent'
									: 'text-dim'}"
							>
								<span
									>{project.caseStudy ? 'Case study' : (project.status ?? 'Visit')}</span
								>
								{#if linked}
									<ArrowUpRight
										class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								{/if}
							</span>
						</svelte:element>
					</li>
				{/each}
			</ol>

		</div>
	</div>

	<!-- Floating cursor image — desktop only -->
	{#if mounted && finePointer}
		<div
			use:portalToBody
			aria-hidden="true"
			class="pointer-events-none fixed top-0 left-0 z-30 h-[220px] w-[360px] overflow-hidden rounded-lg transition-opacity duration-300 md:h-[260px] md:w-[420px]"
			style="
				transform: translate3d({lerpX + 24}px, {lerpY - 130}px, 0);
				opacity: {activeIndex >= 0 ? 1 : 0};
				will-change: transform;
			"
		>
			{#each rest as project, i (project.title)}
				<img
						src={seen.includes(i) ? project.desktopImage : undefined}
						alt=""
						decoding="async"
						class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300"
						style="opacity: {activeIndex === i ? 1 : 0}"
					/>
							{/each}
		</div>
	{/if}
</section>
