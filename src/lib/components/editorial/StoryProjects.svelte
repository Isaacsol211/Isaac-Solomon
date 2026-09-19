<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/content';
	import ArrowUpRight from '../ArrowUpRight.svelte';

	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);

	/* Each spread's screenshot sits on one flat block; the set cycles the reference palette. */
	const blocks = ['bg-cobalt', 'bg-grass', 'bg-mustard', 'bg-accent'];
</script>

<section id="projects" class="story bg-story-paper px-5 pb-8 sm:px-8">
	<div class="mx-auto max-w-5xl">
		{#each featured as project, i (project.title)}
			{@const href = project.caseStudy ?? project.href}
			{@const external = !project.caseStudy}
			{@const flip = i % 2 === 1}
			<article
				use:reveal
				class="grid items-center gap-y-8 py-14 md:grid-cols-2 md:gap-x-14 md:py-20"
			>
				<!-- framed screenshot on an offset colour block -->
				<div class="relative {flip ? 'md:order-2' : ''}">
					<span
						class="absolute -bottom-4 block size-32 sm:size-40 {blocks[i % blocks.length]} {flip
							? '-right-4'
							: '-left-4'}"
						aria-hidden="true"
					></span>
					<a
						{href}
						target={external ? '_blank' : undefined}
						rel={external ? 'noopener noreferrer' : undefined}
						class="group relative block overflow-hidden rounded-2xl border-2 border-ink bg-paper-2"
						aria-label="View project: {project.title}"
					>
						<div class="aspect-[16/10] overflow-hidden">
							<img
								src={project.desktopImage}
								srcset={project.previewSmall && project.previewWidth
									? `${project.previewSmall} 800w, ${project.desktopImage} ${project.previewWidth}w`
									: undefined}
								sizes="(min-width: 768px) 40vw, 100vw"
								alt="{project.title} screenshot"
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
							/>
						</div>
					</a>
				</div>

				<!-- the story of the project -->
				<div class={flip ? 'md:order-1' : ''}>
					<p class="font-serif text-lg text-dim italic">
						{project.year} · {project.category}
					</p>
					<h3 class="mt-1 text-4xl font-medium tracking-tight lowercase sm:text-5xl">
						{project.title}
					</h3>
					<p class="mt-5 max-w-md text-[15px] leading-relaxed text-ink">{project.description}</p>
					{#if project.outcome}
						<p class="mt-4 max-w-md border-l-2 border-accent pl-4 font-serif text-lg leading-snug text-ink/90 italic">
							{project.outcome}
						</p>
					{/if}
					<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
						<a
							{href}
							target={external ? '_blank' : undefined}
							rel={external ? 'noopener noreferrer' : undefined}
							class="group inline-flex items-center gap-2 text-sm font-medium text-accent-text"
						>
							<span class="underline decoration-accent-text/40 underline-offset-4 group-hover:decoration-accent-text">
								{project.caseStudy ? 'read the case study' : 'visit the site'}
							</span>
							<ArrowUpRight class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
						<span class="flex flex-wrap gap-2">
							{#each project.tags.slice(0, 3) as tag (tag)}
								<span class="rounded-full border border-line px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-dim lowercase">{tag}</span>
							{/each}
						</span>
					</div>
				</div>
			</article>
		{/each}

		<!-- the rest, as a plain index -->
		<div use:reveal class="border-t border-line pt-10">
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
							class="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 border-t border-line py-5 transition-colors md:grid-cols-[4rem_1fr_10rem_auto] md:gap-x-6"
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
