<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/content';
	import ArrowUpRight from '../ArrowUpRight.svelte';
	import StoryDoodle from './StoryDoodle.svelte';

	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);

	/* Each card's screenshot sits on one flat plate; the set cycles the palette. */
	const plates = ['bg-cobalt', 'bg-grass', 'bg-mustard', 'bg-accent'];
</script>

<section id="projects" class="story bg-story-paper px-5 pb-8 sm:px-8">
	<div class="mx-auto max-w-5xl">
		<ol class="space-y-16 md:space-y-24">
			{#each featured as project, i (project.title)}
				{@const href = project.caseStudy ?? project.href}
				{@const external = !project.caseStudy}
				<li use:reveal>
					<article class="rounded-3xl border-2 border-ink bg-story-paper p-5 sm:p-8">
						<!-- full-width screenshot on an offset colour plate -->
						<div class="relative">
							<span
								class="absolute -bottom-3 block h-2/3 w-1/3 {plates[i % plates.length]} {i % 2 ? '-left-3' : '-right-3'}"
								aria-hidden="true"
							></span>
							<a
								{href}
								target={external ? '_blank' : undefined}
								rel={external ? 'noopener noreferrer' : undefined}
								class="group relative block overflow-hidden rounded-xl border-2 border-ink bg-paper-2"
								aria-label="View project: {project.title}"
							>
								<div class="aspect-[16/9] overflow-hidden">
									<img
										src={project.desktopImage}
										srcset={project.previewSmall && project.previewWidth
											? `${project.previewSmall} 800w, ${project.desktopImage} ${project.previewWidth}w`
											: undefined}
										sizes="(min-width: 1024px) 60rem, 92vw"
										alt="{project.title} screenshot"
										loading="lazy"
										decoding="async"
										class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
									/>
								</div>
							</a>
						</div>

						<!-- the evidence: what it is, what I did, what it's built on, what came of it -->
						<div class="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-[1fr_1.4fr]">
							<div>
								<p class="font-serif text-lg text-dim italic">
									{String(i + 1).padStart(2, '0')} · {project.year} · {project.category}
								</p>
								<h3 class="mt-1 text-4xl font-medium tracking-tight lowercase sm:text-5xl">{project.title}</h3>
								<p class="mt-4 text-[15px] leading-relaxed text-ink">{project.description}</p>
							</div>
							<div>
								{#if project.role}
									<p class="text-[15px] leading-relaxed font-medium text-ink">{project.role}</p>
								{/if}
								{#if project.outcome}
									<p class="mt-4 border-l-2 border-accent pl-4 font-serif text-xl leading-snug text-ink/90 italic">
										{project.outcome}
									</p>
								{/if}
								<p class="mt-4 text-sm text-dim">{project.tags.join(' · ')}</p>
								{#if project.credits}
									<p class="mt-1 text-sm text-dim">{project.credits}</p>
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
				</li>
			{/each}
		</ol>

		<!-- the rest, as a plain index -->
		<div use:reveal class="mt-20">
			<p class="flex items-center gap-3 font-serif text-xl text-dim italic">
				<StoryDoodle kind="arrow" class="w-10 shrink-0" />
				and a few more —
			</p>
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
	</div>
</section>
