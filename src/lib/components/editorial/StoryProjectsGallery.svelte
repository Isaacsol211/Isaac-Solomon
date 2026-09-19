<script lang="ts">
	import { projects } from '$lib/content';
	import { prefersReducedMotion } from '$lib/motion';
	import ArrowUpRight from '../ArrowUpRight.svelte';

	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);
	const blocks = ['bg-cobalt', 'bg-grass', 'bg-mustard', 'bg-accent'];

	let track = $state<HTMLElement>();
	let active = $state(0);

	function toCard(i: number) {
		if (!track) return;
		const card = track.children[i] as HTMLElement | undefined;
		card?.scrollIntoView({
			behavior: prefersReducedMotion() ? 'auto' : 'smooth',
			inline: 'center',
			block: 'nearest'
		});
	}

	function onScroll() {
		if (!track) return;
		const mid = track.scrollLeft + track.clientWidth / 2;
		let nearest = 0;
		let best = Infinity;
		[...track.children].forEach((c, i) => {
			const el = c as HTMLElement;
			const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - mid);
			if (d < best) {
				best = d;
				nearest = i;
			}
		});
		active = nearest;
	}

	const step = (dir: number) => toCard(Math.min(featured.length - 1, Math.max(0, active + dir)));
</script>

<section id="projects" class="story bg-story-paper py-10">
	<!-- filmstrip: one project fills the frame, swipe / arrow through them -->
	<div
		bind:this={track}
		onscroll={onScroll}
		class="story-strip flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-8"
		tabindex="-1"
	>
		{#each featured as project, i (project.title)}
			{@const href = project.caseStudy ?? project.href}
			{@const external = !project.caseStudy}
			<article
				class="flex w-[min(90vw,64rem)] shrink-0 snap-center flex-col justify-center rounded-3xl border-2 border-ink bg-story-paper p-6 sm:p-10"
			>
				<div class="grid items-center gap-y-8 md:grid-cols-2 md:gap-x-12">
					<div class="relative order-1">
						<span class="absolute -bottom-3 -left-3 block size-24 sm:size-32 {blocks[i % blocks.length]}" aria-hidden="true"></span>
						<a
							{href}
							target={external ? '_blank' : undefined}
							rel={external ? 'noopener noreferrer' : undefined}
							class="group relative block overflow-hidden rounded-xl border-2 border-ink bg-paper-2"
							aria-label="View project: {project.title}"
						>
							<div class="aspect-[16/10] overflow-hidden">
								<img
									src={project.desktopImage}
									srcset={project.previewSmall && project.previewWidth
										? `${project.previewSmall} 800w, ${project.desktopImage} ${project.previewWidth}w`
										: undefined}
									sizes="(min-width: 768px) 40vw, 82vw"
									alt="{project.title} screenshot"
									loading="lazy"
									decoding="async"
									class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
								/>
							</div>
						</a>
					</div>
					<div class="order-2">
						<p class="font-serif text-lg text-dim italic">{project.year} · {project.category}</p>
						<h3 class="mt-1 text-4xl font-medium tracking-tight lowercase sm:text-5xl">{project.title}</h3>
						<p class="mt-4 max-w-md text-[15px] leading-relaxed text-ink">{project.description}</p>
						{#if project.outcome}
							<p class="mt-4 max-w-md border-l-2 border-accent pl-4 font-serif text-lg leading-snug text-ink/90 italic">
								{project.outcome}
							</p>
						{/if}
						<a
							{href}
							target={external ? '_blank' : undefined}
							rel={external ? 'noopener noreferrer' : undefined}
							class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-text"
						>
							<span class="underline decoration-accent-text/40 underline-offset-4 group-hover:decoration-accent-text">
								{project.caseStudy ? 'read the case study' : 'visit the site'}
							</span>
							<ArrowUpRight class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<!-- controls: dots + arrows, a page-turn feel -->
	<div class="mx-auto mt-6 flex max-w-5xl items-center justify-between px-5 sm:px-8">
		<div class="flex items-center gap-2">
			{#each featured as project, i (project.title)}
				<button
					type="button"
					onclick={() => toCard(i)}
					aria-label="Go to {project.title}"
					aria-current={active === i ? 'true' : undefined}
					class="h-2 rounded-full transition-all {active === i ? 'w-6 bg-ink' : 'w-2 bg-line'}"
				></button>
			{/each}
			<span class="ml-3 font-serif text-lg text-dim italic">
				{String(active + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
			</span>
		</div>
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => step(-1)}
				disabled={active === 0}
				class="grid size-11 place-items-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-story-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
				aria-label="Previous project"
			>
				←
			</button>
			<button
				type="button"
				onclick={() => step(1)}
				disabled={active === featured.length - 1}
				class="grid size-11 place-items-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-story-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
				aria-label="Next project"
			>
				→
			</button>
		</div>
	</div>

	<!-- the rest, as a plain index -->
	<div class="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
		<p class="font-serif text-xl text-dim italic">and a few more —</p>
		<ol class="mt-4 border-b border-line">
			{#each rest as project (project.title)}
				{@const href = project.caseStudy ?? project.href}
				{@const external = !project.caseStudy}
				<li>
					<svelte:element
						this={href ? 'a' : 'div'}
						{href}
						target={external && href ? '_blank' : undefined}
						rel={external && href ? 'noopener noreferrer' : undefined}
						class="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 border-t border-line py-5 md:grid-cols-[4rem_1fr_10rem_auto] md:gap-x-6"
					>
						<span class="text-sm font-medium tabular-nums text-dim">{project.year}</span>
						<span class="text-lg font-medium tracking-tight lowercase group-hover:text-accent-text md:text-xl">{project.title}</span>
						<span class="hidden text-sm text-dim md:block">{project.category}</span>
						<span class="text-sm text-dim">{project.caseStudy ? 'case study' : (project.status ?? 'visit')} →</span>
					</svelte:element>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	/* thin, unobtrusive scrollbar for the filmstrip */
	.story-strip {
		scrollbar-width: thin;
		scrollbar-color: var(--color-line) transparent;
	}
	.story-strip::-webkit-scrollbar {
		height: 6px;
	}
	.story-strip::-webkit-scrollbar-thumb {
		background: var(--color-line);
		border-radius: 999px;
	}
</style>
