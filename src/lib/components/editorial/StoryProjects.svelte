<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/content';
	import ArrowUpRight from '../ArrowUpRight.svelte';
	import StoryDoodle from './StoryDoodle.svelte';

	const featured = projects.filter((p) => p.featured);
	const [lead, ...others] = featured;
	const rest = projects.filter((p) => !p.featured);

	/* Each screenshot sits on one flat plate; the set cycles the palette. */
	const plates = ['bg-cobalt', 'bg-grass', 'bg-mustard', 'bg-accent'];

	const linkOf = (p: (typeof projects)[number]) => ({
		href: p.caseStudy ?? p.href,
		external: !p.caseStudy
	});
</script>

{#snippet shot(project: (typeof projects)[number], i: number, sizes: string)}
	{@const { href, external } = linkOf(project)}
	<div class="relative">
		<span
			class="absolute -bottom-2.5 block h-2/3 w-1/3 {plates[i % plates.length]} {i % 2 ? '-left-2.5' : '-right-2.5'}"
			aria-hidden="true"
		></span>
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
					{sizes}
					alt="{project.title} screenshot"
					loading="lazy"
					decoding="async"
					class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
				/>
			</div>
		</a>
	</div>
{/snippet}

{#snippet more(project: (typeof projects)[number])}
	{@const { href, external } = linkOf(project)}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		class="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-text"
	>
		<span class="underline decoration-accent-text/40 underline-offset-4 group-hover:decoration-accent-text">
			{project.caseStudy ? 'read the case study' : 'visit the site'}
		</span>
		<ArrowUpRight class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
	</a>
{/snippet}

<section id="projects" class="story bg-story-paper px-5 pb-8 sm:px-8">
	<div class="mx-auto max-w-5xl">
		<!-- the lead project: one wide card, the whole story -->
		<article use:reveal class="grid items-center gap-x-10 gap-y-7 rounded-3xl border-2 border-ink p-5 sm:p-8 md:grid-cols-[1.3fr_1fr]">
			{@render shot(lead, 0, '(min-width: 768px) 34rem, 92vw')}
			<div>
				<p class="font-serif text-lg text-dim italic">01 · {lead.year} · {lead.category}</p>
				<h3 class="mt-1 text-4xl font-medium tracking-tight lowercase sm:text-5xl">{lead.title}</h3>
				<p class="mt-3 text-[15px] leading-relaxed text-ink">{lead.description}</p>
				{#if lead.role}<p class="mt-3 text-sm leading-relaxed font-medium text-ink/85">{lead.role}</p>{/if}
				{#if lead.outcome}
					<p class="mt-4 border-l-2 border-accent pl-4 font-serif text-lg leading-snug text-ink/90 italic">{lead.outcome}</p>
				{/if}
				<p class="mt-3 text-sm text-dim">{lead.tags.join(' · ')}</p>
				{@render more(lead)}
			</div>
		</article>

		<!-- the next three side by side; a swipeable row on phones -->
		<ol
			class="story-row -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
		>
			{#each others as project, k (project.title)}
				<li use:reveal={{ delay: 80 * k }} class="w-[82vw] shrink-0 snap-center sm:w-[60vw] md:w-auto">
					<article class="flex h-full flex-col rounded-3xl border-2 border-ink p-4 sm:p-5">
						{@render shot(project, k + 1, '(min-width: 768px) 20rem, 80vw')}
						<p class="mt-6 font-serif text-base text-dim italic">
							{String(k + 2).padStart(2, '0')} · {project.year} · {project.category}
						</p>
						<h3 class="mt-0.5 text-3xl font-medium tracking-tight lowercase">{project.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-ink">{project.description}</p>
						{#if project.outcome}
							<p class="mt-3 font-serif text-base leading-snug text-ink/90 italic">{project.outcome}</p>
						{/if}
						{#if project.role}<p class="mt-3 text-[13px] leading-relaxed text-dim">{project.role}</p>{/if}
						<div class="mt-auto">{@render more(project)}</div>
					</article>
				</li>
			{/each}
		</ol>

		<!-- the rest, as a plain index -->
		<div use:reveal class="mt-16">
			<p class="flex items-center gap-3 font-serif text-xl text-dim italic">
				<StoryDoodle kind="arrow" class="w-10 shrink-0" />
				and a few more —
			</p>
			<ol class="mt-4 border-b border-line">
				{#each rest as project (project.title)}
					{@const { href, external } = linkOf(project)}
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
	</div>
</section>

<style>
	.story-row {
		scrollbar-width: none;
	}
	.story-row::-webkit-scrollbar {
		display: none;
	}
</style>
