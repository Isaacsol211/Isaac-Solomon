<script lang="ts">
	import { onMount } from 'svelte';
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
	let isTouch = $state(true);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let ctxPromise: Promise<any> | undefined;

		const gsapInit = async () => {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			if (!sectionEl) return;

			const ctx = gsap.context(() => {
				/* ── Featured cards — entrance + clip reveal ───── */
				const blocks = sectionEl!.querySelectorAll('[data-bleed-block]');

				if (reducedMotion) {
					gsap.set(blocks, { opacity: 1 });
				} else {
					blocks.forEach((block) => {
						const img = block.querySelector('[data-bleed-img]');
						const text = block.querySelector('[data-bleed-text]');
						const tags = block.querySelectorAll('[data-bleed-tag]');
						const innerImg = block.querySelector('[data-bleed-img] img');

						if (img) {
							gsap.fromTo(
								img,
								{ clipPath: 'inset(100% 0 0 0)' },
								{
									clipPath: 'inset(0% 0 0 0)',
									duration: 1.8,
									ease: 'power3.inOut',
									scrollTrigger: { trigger: block, start: 'top 75%', once: true }
								}
							);
						}

						/* Parallax on the inner image — subtle vertical drift */
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
								{ opacity: 0, y: 40 },
								{
									opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.4,
									scrollTrigger: { trigger: block, start: 'top 75%', once: true }
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

				/* ── List items — staggered entrance ──────────── */
				if (listEl) {
					const items = listEl.querySelectorAll('li');
					if (reducedMotion) {
						gsap.set(items, { opacity: 1, y: 0 });
					} else {
						gsap.set(items, { opacity: 0, y: 40 });
						ScrollTrigger.batch(items, {
							onEnter: (batch) => {
								gsap.to(batch, {
									opacity: 1, y: 0, duration: 0.8,
									ease: 'power3.out', stagger: 0.1
								});
							},
							start: 'top 90%',
							once: true
						});
					}
				}
			}, sectionEl);

			return ctx;
		};

		ctxPromise = gsapInit();

		/* ── Lerp loop for cursor image ───────────────────── */
		let rafId = 0;
		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

		if (!isTouch && !reducedMotion) {
			const tick = () => {
				lerpX = lerp(lerpX, mouseX, 0.1);
				lerpY = lerp(lerpY, mouseY, 0.1);
				rafId = requestAnimationFrame(tick);
			};
			rafId = requestAnimationFrame(tick);
		}

		return () => {
			cancelAnimationFrame(rafId);
			ctxPromise?.then((ctx) => ctx?.revert());
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="projects"
	class="border-t border-line"
>
	<!-- Section header -->
	<div class="px-5 py-20 sm:px-8 md:py-32">
		<div class="mx-auto max-w-6xl">
			<div use:reveal class="max-w-2xl">
				<Eyebrow index="02" title="Selected Work" />
				<h2 class="mt-6 text-4xl font-medium tracking-tight md:text-6xl">
					Selected<br />
					<span class="text-dim">work.</span>
				</h2>
				<p class="mt-6 max-w-md text-sm leading-relaxed text-dim">
					{projectsIntro}
				</p>
			</div>
		</div>
	</div>

	<!-- Featured projects — full-bleed alternating sections -->
	{#each featured as project, i (project.title)}
		{@const isDark = project.theme === 'dark'}
		{@const isEven = i % 2 === 0}
		{@const img = project.desktopImage ?? project.image}
		{@const vtName = project.caseStudy ? `project-${project.caseStudy.split('/').pop()}` : undefined}
		<div
			data-bleed-block
			class="border-t transition-colors {isDark
				? 'border-cream/10 bg-coal text-cream'
				: 'border-line bg-paper-2 text-ink'}"
		>
			<a
				href={project.caseStudy ?? project.href}
				target={project.caseStudy ? undefined : '_blank'}
				rel={project.caseStudy ? undefined : 'noopener noreferrer'}
				class="group block"
				aria-label="View project: {project.title}"
			>
				<div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
					<!-- Top row: number + category -->
					<div class="mb-10 flex items-baseline justify-between gap-4 md:mb-16">
						<span
							class="text-7xl font-medium tabular-nums md:text-9xl {isDark
								? 'text-cream/20'
								: 'text-ink/10'}"
						>
							{String(i + 1).padStart(2, '0')}
						</span>
						<span
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
									<div class="aspect-[16/10] overflow-hidden">
										<img
											src={img}
											alt="{project.title} screenshot"
											loading="lazy"
											style={vtName ? `view-transition-name: ${vtName}` : undefined}
											class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
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
							<p class="mt-4 line-clamp-3 text-sm leading-relaxed {isDark ? 'text-cream/60' : 'text-dim'}">
								{project.description}
							</p>
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
							<span class="mt-8 inline-flex items-center gap-2 text-xs font-medium text-accent">
								{project.caseStudy ? 'Case study' : 'Visit'}
								<ArrowUpRight
									class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</span>
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}

	<!-- Remaining projects — editorial list with hover image -->
	<div class="border-t border-line px-5 py-16 sm:px-8 md:py-24">
		<div class="mx-auto max-w-6xl">
			<ol bind:this={listEl} class="border-b border-line">
				{#each visibleRest as project, i (project.title)}
					{@const href = project.caseStudy ?? project.href}
					{@const external = !project.caseStudy}
					<li
						onmouseenter={(e) => {
							// Snap the lerp position on entry so the preview doesn't fly in from stale coords
							if (activeIndex === -1) {
								mouseX = lerpX = e.clientX;
								mouseY = lerpY = e.clientY;
							}
							activeIndex = i;
						}}
						onmouseleave={() => (activeIndex = -1)}
						onmousemove={(e) => {
							mouseX = e.clientX;
							mouseY = e.clientY;
						}}
					>
						<a
							{href}
							target={external ? '_blank' : undefined}
							rel={external ? 'noopener noreferrer' : undefined}
							class="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 border-t border-line py-6 transition-colors duration-300 before:absolute before:-inset-x-4 before:inset-y-1 before:-z-10 before:rounded-xl before:bg-paper-2 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-60 md:grid-cols-[5rem_1fr_10rem_auto] md:gap-x-6 md:py-8"
							aria-label="View project: {project.title}"
						>
							<span class="text-lg font-medium tabular-nums text-dim transition-colors duration-300 group-hover:text-accent md:text-2xl">
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
								<span class="hidden sm:inline">{project.caseStudy ? 'Case study' : 'Visit'}</span>
								<ArrowUpRight
									class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</span>
						</a>
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
	{#if mounted && !isTouch}
		<div
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
						src={img}
						alt=""
						loading="lazy"
						class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300"
						style="opacity: {activeIndex === i ? 1 : 0}"
					/>
				{/if}
			{/each}
		</div>
	{/if}
</section>
