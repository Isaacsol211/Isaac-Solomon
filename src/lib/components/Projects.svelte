<script lang="ts">
	import { onMount } from 'svelte';
	import { portalToBody } from '$lib/actions/portal-to-body';
	import { initMotion, MOTION_OK, REDUCED_MOTION, MD, FINE_POINTER } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { projects, projectsIntro } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';

	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);
	const INITIAL_COUNT = 3;

	let sectionEl = $state<HTMLElement>();
	let listEl = $state<HTMLOListElement>();
	let showAll = $state(false);
	let visibleRest = $derived(showAll ? rest : rest.slice(0, INITIAL_COUNT));
	const hasMore = rest.length > INITIAL_COUNT;

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

				/* ── Featured cards — clip reveal + scrubbed image/text drift ───── */
				const blocks = sectionEl!.querySelectorAll('[data-bleed-block]');

				if (reducedMotion) {
					gsap.set(blocks, { opacity: 1 });
				} else {
					blocks.forEach((block, i) => {
						const img = block.querySelector('[data-bleed-img]');
						const frame = block.querySelector('[data-bleed-frame]');
						const text = block.querySelector('[data-bleed-text]');
						const tags = block.querySelectorAll('[data-bleed-tag]');
						const innerImg = block.querySelector('[data-bleed-img] img');
						const number = block.querySelector('[data-bleed-number]');
						const meta = block.querySelector('[data-bleed-meta]');
						/*
						 * Horizontal drift is a two-column device: the text block slides in
						 * from the side the image is not on. Below md the columns stack and the
						 * block is full width, so a 56px offset has nowhere to go — it just
						 * pushes the page 36px wider than the viewport until the trigger fires.
						 */
						const driftX = twoColumn ? (i % 2 === 0 ? 56 : -56) : 0;

						if (img) {
							/* crop opens */
							gsap.fromTo(
								img,
								{ clipPath: 'inset(100% 0 0 0)' },
								{
									clipPath: 'inset(0% 0 0 0)',
									duration: 0.7,
									ease: 'expo.out',
									scrollTrigger: { trigger: block, start: 'top 75%', once: true }
								}
							);
						}
						if (frame) {
							/* image settles, a beat after the crop starts */
							gsap.fromTo(
								frame,
								{ scale: 1.04 },
								{
									scale: 1,
									duration: 1.1,
									delay: 0.1,
									ease: 'expo.out',
									scrollTrigger: { trigger: block, start: 'top 75%', once: true }
								}
							);
						}

						/* Vertical drift on the img itself as the block moves through view — a
						   different element from the settle above, so one transform each. */
						if (innerImg && !isTouch) {
							gsap.fromTo(
								innerImg,
								{ yPercent: -4 },
								{
									yPercent: 4,
									ease: 'none',
									scrollTrigger: {
										trigger: block,
										start: 'top bottom',
										end: 'bottom top',
										scrub: true
									}
								}
							);
						}

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

							if (!isTouch) {
								gsap.to(text, {
									x: driftX * -0.14,
									ease: 'none',
									scrollTrigger: {
										trigger: block,
										start: 'top bottom',
										end: 'bottom top',
										scrub: true
									}
								});
							}
						}
						if (number) {
							gsap.fromTo(
								number,
								{ scale: 1.24, opacity: 0.08 },
								{
									scale: 0.98,
									opacity: 0.24,
									ease: 'none',
									scrollTrigger: {
										trigger: block,
										start: 'top bottom',
										end: 'bottom top',
										scrub: true
									}
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
				if (listEl) {
					const items = listEl.querySelectorAll('[data-project-row]');
					if (reducedMotion) {
						gsap.set(items, { opacity: 1, yPercent: 0 });
					} else {
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

<section
	bind:this={sectionEl}
	id="projects"
	class="section-transition border-t border-line"
>
	<!-- Section header -->
	<div class="px-5 py-14 sm:px-8 md:py-16">
		<div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-12 md:items-end">
			<div use:reveal class="md:col-span-7">
				<Eyebrow title="Selected Work" />
				<h2 class="mt-5 text-4xl font-medium tracking-tight lowercase md:text-6xl">
					selected <span class="text-dim">work.</span>
				</h2>
			</div>
			<p use:reveal={{ delay: 120 }} class="max-w-md text-sm leading-relaxed text-dim md:col-span-5 md:justify-self-end">
				{projectsIntro}
			</p>
		</div>
	</div>

	<!-- Featured projects — full-bleed alternating sections -->
	{#each featured as project, i (project.title)}
		{@const isDark = project.theme === 'dark'}
		{@const isEven = i % 2 === 0}
		{@const img = project.desktopImage ?? project.image}
		{@const vtName = project.caseStudy ? `project-${project.caseStudy.split('/').pop()}` : undefined}
		<!-- clip, not hidden: contains the text block's entrance drift without
		     creating a scroll container that would break sticky descendants -->
		<div
			data-bleed-block
			class="relative border-t transition-colors [overflow-x:clip] {isDark
				? 'border-cream/10 bg-coal text-cream'
				: 'border-line bg-paper-2 text-ink'}"
		>
			<svelte:element
				this={project.caseStudy ?? project.href ? 'a' : 'div'}
				href={project.caseStudy ?? project.href}
				target={!project.caseStudy && project.href ? '_blank' : undefined}
				rel={!project.caseStudy && project.href ? 'noopener noreferrer' : undefined}
				class="group block"
				aria-label={project.caseStudy ?? project.href ? `View project: ${project.title}` : undefined}
			>
				{#if project.featuredLayout === 'stage'}
					<!--
						Stage layout: the image is the whole width and the name is set at
						display size beneath it. The product's own colour supplies the
						energy, so the chrome around it stays quiet — no coloured rule on
						the outcome, which is set in the serif instead.
					-->
					<div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
						<div class="mb-8 flex items-baseline justify-between gap-4 md:mb-12">
							<span data-bleed-number class="text-7xl font-medium tabular-nums text-cream/20 md:text-9xl">
								{String(i + 1).padStart(2, '0')}
							</span>
							<span data-bleed-meta class="text-right text-[10px] font-medium tracking-[0.25em] uppercase text-cream/40">
								{project.year} — {project.category}
							</span>
						</div>

						<div data-bleed-img class="overflow-hidden rounded-lg">
							{#if img}
								<!-- 21/9 against a 2.4:1 source: a sliver off each side, not a crop into the UI -->
								<div data-bleed-frame class="aspect-[16/10] overflow-hidden sm:aspect-[21/9]">
									<img
										src={img}
										srcset={project.previewSmall && project.previewWidth
											? `${project.previewSmall} 800w, ${img} ${project.previewWidth}w`
											: undefined}
										sizes={project.previewSmall && project.previewWidth ? '(min-width: 1280px) 1216px, 100vw' : undefined}
										alt="{project.title} screenshot"
										loading="lazy"
										decoding="async"
										style={vtName ? `view-transition-name: ${vtName}` : undefined}
										class="h-full w-full object-cover object-top"
									/>
								</div>
							{/if}
						</div>

						<div class="mt-8 grid gap-6 md:mt-10 md:grid-cols-12 md:items-end md:gap-10">
							<h3 class="text-6xl font-medium tracking-[-0.03em] lowercase md:col-span-6 md:text-[7.5rem] md:leading-[0.9]">
								{project.title}
							</h3>
							<div data-bleed-text class="md:col-span-6">
								{#if project.outcome}
									<p class="font-serif text-2xl leading-tight text-cream/90 italic md:text-[1.75rem]">
										{project.outcome}
									</p>
								{/if}
								<p class="mt-4 max-w-lg text-sm leading-relaxed text-cream/60">{project.description}</p>
								{#if project.credits}
									<p class="mt-3 text-xs leading-relaxed text-cream/55">{project.credits}</p>
								{/if}
								<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
									<span class="inline-flex items-center gap-2 text-xs font-medium text-accent">
										{project.caseStudy ? 'Case study' : 'Visit'}
										<ArrowUpRight class="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
									</span>
									<span class="flex flex-wrap gap-2">
										{#each project.tags as tag}
											<span data-bleed-tag class="rounded-full border border-cream/15 px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-cream/50 uppercase">{tag}</span>
										{/each}
									</span>
								</div>
							</div>
						</div>
					</div>
				{:else}
				<div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
					<!-- Top row: number + category -->
					<div class="mb-10 flex items-baseline justify-between gap-4 md:mb-16">
						<span
							data-bleed-number
							class="text-7xl font-medium tabular-nums md:text-9xl {isDark
								? 'text-cream/20'
								: 'text-ink/10'}"
						>
							{String(i + 1).padStart(2, '0')}
						</span>
						<span
							data-bleed-meta
							class="text-right text-[10px] font-medium tracking-[0.25em] uppercase {isDark
								? 'text-cream/40'
								: 'text-dim'}"
						>
							{project.year} — {project.category}
						</span>
					</div>

					<!-- Content grid -->
					<div class="grid items-end gap-8 md:grid-cols-12 md:gap-12">
						<!-- Image -->
						<div class="md:col-span-8 {isEven ? '' : 'md:order-2'}">
							<div data-bleed-img class="overflow-hidden rounded-lg">
								{#if img}
									<div data-bleed-frame class="aspect-[16/10] overflow-hidden">
										<!--
											sizes mirrors the layout: md:col-span-8 of a max-w-6xl grid is
											roughly two thirds of the viewport, full width once it stacks.
											Without it the browser assumes 100vw and picks the 1600w file
											for a 730px slot.
										-->
										<img
											src={img}
											srcset={project.previewSmall && project.previewWidth
												? `${project.previewSmall} 800w, ${img} ${project.previewWidth}w`
												: undefined}
											sizes={project.previewSmall && project.previewWidth
												? '(min-width: 768px) 66vw, 100vw'
												: undefined}
											alt="{project.title} screenshot"
											loading="lazy"
											decoding="async"
											style={vtName ? `view-transition-name: ${vtName}` : undefined}
											class="h-full w-full object-cover object-top"
										/>
									</div>
								{/if}
							</div>
						</div>

						<!-- Text -->
						<div
							data-bleed-text
							class="md:col-span-4 {isEven ? '' : 'md:order-1'}"
						>
							<h3 class="text-3xl font-medium tracking-tight md:text-4xl">
								{project.title}
							</h3>
							<!-- No line-clamp: card summaries are written to fit. Truncating here
							     cut them mid-sentence, before they finished making the case. -->
							<p class="mt-4 text-sm leading-relaxed {isDark ? 'text-cream/60' : 'text-dim'}">
								{project.description}
							</p>
							{#if project.outcome}
								<!-- The result, stated once, sourced from the case study. -->
								<p
									class="mt-5 border-l-2 pl-4 text-sm leading-relaxed {isDark
										? 'border-accent/60 text-cream/80'
										: 'border-accent/70 text-ink/80'}"
								>
									{project.outcome}
								</p>
							{/if}
							{#if project.credits}
								<p class="mt-3 text-xs leading-relaxed {isDark ? 'text-cream/55' : 'text-dim'}">
									{project.credits}
								</p>
							{/if}

							<div class="mt-6 flex flex-wrap gap-2">
								{#each project.tags as tag}
									<span
										data-bleed-tag
										class="rounded-full border px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase {isDark
											? 'border-cream/15 text-cream/50'
											: 'border-line text-dim'}"
									>
										{tag}
									</span>
								{/each}
							</div>
							<!-- 12px label: the bright accent is 3.12:1 on paper-2, so light cards use accent-text.
							     Dark cards keep it — #e8490f is 4.77:1 on coal and accent-text would drop to 3.03:1. -->
							<span class="mt-8 inline-flex items-center gap-2 text-xs font-medium {isDark ? 'text-accent' : 'text-accent-text'}">
								{project.caseStudy ? 'Case study' : 'Visit'}
								<ArrowUpRight
									class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</span>
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
				class="hidden pb-4 text-[10px] font-medium tracking-[0.2em] lowercase text-dim md:grid md:grid-cols-[5rem_1fr_10rem_auto] md:gap-x-6"
				aria-hidden="true"
			>
				<span>year</span>
				<span>brand</span>
				<span>industry</span>
				<span>link</span>
			</div>
			<ol bind:this={listEl} class="border-b border-line">
				{#each visibleRest as project, i (project.title)}
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
								<span class="hidden sm:inline"
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

			<!-- View more button -->
			{#if hasMore && !showAll}
				<div class="mt-10 text-center">
					<button
						onclick={() => (showAll = true)}
						class="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase text-dim transition-colors duration-300 hover:border-accent hover:text-accent"
					>
						View more projects
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5" aria-hidden="true">
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
				</div>
			{/if}
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
			{#each visibleRest as project, i (project.title)}
				{@const img = project.desktopImage ?? project.image}
				{#if img}
					<img
						src={seen.includes(i) ? img : undefined}
						alt=""
						decoding="async"
						class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300"
						style="opacity: {activeIndex === i ? 1 : 0}"
					/>
				{/if}
			{/each}
		</div>
	{/if}
</section>
