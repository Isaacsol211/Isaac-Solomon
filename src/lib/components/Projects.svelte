<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { projects, projectsIntro } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';

	/* Featured → magazine spread; rest → mosaic grid */
	const featured = projects.filter((p) => p.featured);
	const grid = projects.filter((p) => !p.featured);

	/* Distribute grid projects across 3 columns (round-robin) */
	const cols: { project: (typeof projects)[0]; idx: number }[][] = [[], [], []];
	grid.forEach((project, i) => cols[i % 3].push({ project, idx: i }));

	/* Forced aspect ratios — tuned so column heights are roughly equal */
	const colAspects = [
		['aspect-[4/5]', 'aspect-[1/1]'],   // col 0
		['aspect-[3/4]', 'aspect-[4/5]'],   // col 1
		['aspect-[9/16]']                     // col 2
	];

	/* ── Horizontal-scroll state ───────────────────────── */
	let sectionEl = $state<HTMLElement>();
	let progress = $state(0);
	let isDesktop = $state(false);

	$effect(() => {
		if (!sectionEl) return;

		const mq = window.matchMedia('(min-width: 768px)');
		isDesktop = mq.matches;
		const onMq = (e: MediaQueryListEvent) => { isDesktop = e.matches; };
		mq.addEventListener('change', onMq);

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			progress = 0.5;
			return () => mq.removeEventListener('change', onMq);
		}

		function onScroll() {
			const rect = sectionEl!.getBoundingClientRect();
			const scrollable = rect.height - window.innerHeight;
			if (scrollable <= 0) return;
			progress = Math.max(0, Math.min(1, -rect.top / scrollable));
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			mq.removeEventListener('change', onMq);
		};
	});
</script>

<section
	id="projects"
	bind:this={sectionEl}
	class="projects-section relative h-[200vh] md:h-[300vh]"
>
	<div class="projects-frame sticky top-0 flex h-svh flex-col overflow-hidden border-t border-line bg-paper pt-[4.5rem]">
		<!-- Mobile heading (hidden on md+) -->
		<div use:reveal class="shrink-0 px-5 pt-10 pb-6 sm:px-8 md:hidden">
			<Eyebrow index="02" title="Recent Projects" />
			<h2 class="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
				My
				<em class="font-serif font-normal italic text-dim"> work.</em>
			</h2>
		</div>

		<!-- Horizontal track — slides left on scroll -->
		<div
			class="projects-track flex min-h-0 flex-1 gap-[5vw] will-change-transform"
			style="transform: translateX({isDesktop ? progress * -110 : 0}vw)"
		>
			<!-- Left typography panel (desktop only) -->
			<div class="projects-panel-left hidden shrink-0 flex-col justify-center px-[5vw] md:flex">
				<div use:reveal>
					<Eyebrow index="02" title="Recent Projects" />
					<h2
						class="mt-8 font-medium leading-[0.95] tracking-tight"
						style="font-size: clamp(3rem, 7vw, 7.5rem)"
					>
						My
						<em class="mt-2 block font-serif font-normal italic text-dim">
							work.
						</em>
					</h2>
				</div>
				<p class="mt-8 max-w-[18rem] text-sm leading-relaxed text-dim">
					{projectsIntro}
				</p>
			</div>

			<!-- 3-column project mosaic -->
			<div class="projects-mosaic flex shrink-0 gap-1.5 overflow-hidden bg-paper p-1.5 md:gap-3 md:p-3">
				{#each cols as col, c}
					<div
						class="flex w-1/3 flex-col gap-1.5 will-change-transform md:gap-3"
						style="transform: translateY({c % 2 === 0 ? progress * -20 : -20 + progress * 20}%)"
					>
						{#each col as { project, idx }, i (project.title)}
							{@const href = project.caseStudy ?? project.href}
							{@const external = !project.caseStudy}
							<a
								{href}
								target={external ? '_blank' : undefined}
								rel={external ? 'noopener noreferrer' : undefined}
								class="group relative shrink-0 overflow-hidden rounded-sm"
								aria-label="View project: {project.title}"
							>
								<img
									src={project.image}
									alt="Screenshot of {project.frameLabel}"
									loading="lazy"
									class="{colAspects[c][i] ?? 'aspect-[3/4]'} w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
								/>
								<!-- Gradient overlay with project info -->
								<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coal/90 via-coal/50 to-transparent p-3 pt-10 md:p-4 md:pt-14">
									<p class="text-[9px] font-medium tracking-[0.2em] uppercase text-cream/50">
										{project.year} — {project.category}
									</p>
									<h3 class="mt-1 text-sm font-medium tracking-tight text-cream md:text-base">
										{project.title}
									</h3>
									<div class="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-accent">
										<span>{project.caseStudy ? 'Case study' : 'Visit site'}</span>
										<ArrowUpRight class="size-2.5" />
									</div>
								</div>
							</a>
						{/each}
					</div>
				{/each}
			</div>

			<!-- Right panel: magazine spread — featured projects (desktop only) -->
			<div class="projects-panel-right hidden shrink-0 md:flex">
				<!-- 70% — editorial spread: top text / center image / bottom text -->
				<div class="magazine-spread w-[70%]">
					<!-- Top text row -->
					<div class="flex items-end justify-between px-8 lg:px-12">
						<p
							class="font-medium leading-none tracking-tight"
							style="font-size: clamp(3rem, 8vw, 8rem)"
						>
							Selected
						</p>
						<div class="mb-2 text-right">
							<p class="text-[10px] tracking-[0.25em] uppercase text-dim/50">
								Isaac Solomon
							</p>
							<p class="mt-1 text-[10px] tracking-[0.25em] uppercase text-dim/40">
								developer
							</p>
						</div>
					</div>

					<!-- Center featured image -->
					<div class="min-h-0 px-8 lg:px-12">
						{#if featured[0]}
							{@const fp = featured[0]}
							{@const fpHref = fp.caseStudy ?? fp.href}
							{@const fpExternal = !fp.caseStudy}
							<a
								href={fpHref}
								target={fpExternal ? '_blank' : undefined}
								rel={fpExternal ? 'noopener noreferrer' : undefined}
								class="group relative block h-full w-full overflow-hidden"
								aria-label="View featured project: {fp.title}"
							>
								<img
									src={fp.desktopImage ?? fp.image}
									alt="Screenshot of {fp.frameLabel}"
									loading="lazy"
									class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								/>
								<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coal/80 to-transparent p-6 pt-20">
									<p class="text-[10px] font-medium tracking-[0.2em] uppercase text-cream/60">
										{fp.year} — {fp.category}
									</p>
									<h3 class="mt-1 text-xl font-medium tracking-tight text-cream">
										{fp.title}
									</h3>
									<div class="mt-3 flex items-center gap-2 text-xs font-medium text-accent">
										<span>{fp.caseStudy ? 'Read case study' : 'Visit site'}</span>
										<ArrowUpRight class="size-3" />
									</div>
								</div>
							</a>
						{/if}
					</div>

					<!-- Bottom text row -->
					<div class="flex items-start justify-between px-8 lg:px-12">
						<p
							class="font-serif italic leading-none"
							style="font-size: clamp(3rem, 8vw, 8rem)"
						>
							work.
						</p>
						<p class="mt-3 text-sm tracking-[0.15em] text-dim/50">/{projects.length} projects</p>
					</div>
				</div>

				<!-- 30% — full-height second featured project -->
				{#if featured[1]}
					{@const sp = featured[1]}
					{@const spHref = sp.caseStudy ?? sp.href}
					{@const spExternal = !sp.caseStudy}
					<a
						href={spHref}
						target={spExternal ? '_blank' : undefined}
						rel={spExternal ? 'noopener noreferrer' : undefined}
						class="group relative w-[30%] overflow-hidden"
						aria-label="View featured project: {sp.title}"
					>
						<img
							src={sp.image}
							alt="Screenshot of {sp.frameLabel}"
							loading="lazy"
							class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
						/>
						<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coal/80 to-transparent p-4 pt-14">
							<p class="text-[10px] font-medium tracking-[0.2em] uppercase text-cream/60">
								{sp.year} — {sp.category}
							</p>
							<h3 class="mt-1 text-base font-medium tracking-tight text-cream">
								{sp.title}
							</h3>
							<div class="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-accent">
								<span>{sp.caseStudy ? 'Case study' : 'Visit site'}</span>
								<ArrowUpRight class="size-2.5" />
							</div>
						</div>
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.projects-track {
		width: 100%;
	}
	.projects-mosaic {
		width: 100%;
	}

	@media (min-width: 768px) {
		.projects-track {
			width: 210vw;
		}
		.projects-panel-left {
			width: 30vw;
		}
		.projects-mosaic {
			width: 70vw;
		}
		.projects-panel-right {
			width: 100vw;
		}
		.magazine-spread {
			display: grid;
			grid-template-rows: minmax(18vh, auto) 1fr minmax(18vh, auto);
			padding-top: 5rem;
			padding-bottom: 2rem;
			gap: 0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.projects-section {
			height: auto !important;
		}
		.projects-frame {
			position: relative;
			height: auto;
			min-height: 80vh;
		}
	}
</style>
