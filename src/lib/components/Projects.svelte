<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { projects, projectsIntro } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import ProjectVisual from './ProjectVisual.svelte';

	// Mivi gets the hero position, rest go in a uniform 2-col grid
	const hero = projects[0];
	const heroHref = hero.caseStudy ?? hero.href;
	const heroExternal = !hero.caseStudy;
	const grid = projects.slice(1);
</script>

<section id="projects" class="border-t border-line px-5 py-20 sm:px-8 md:py-32">
	<div class="mx-auto max-w-6xl">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div use:reveal>
				<Eyebrow index="02" title="Recent Projects" />
				<h2 class="mt-6 text-4xl font-medium tracking-tight md:text-6xl">
					Selected <em class="font-serif font-normal text-dim italic">work.</em>
				</h2>
			</div>
			<p use:reveal={{ delay: 120 }} class="max-w-md leading-relaxed text-dim md:text-right">
				{projectsIntro}
			</p>
		</div>

		<!-- ── Hero card — first project, full-width dark split ─────────── -->
		<div use:reveal={{ delay: 60 }} class="mt-12 md:mt-16">
			<a
				href={heroHref}
				target={heroExternal ? '_blank' : undefined}
				rel={heroExternal ? 'noopener noreferrer' : undefined}
				class="group relative block overflow-hidden rounded-2xl border border-transparent bg-coal text-cream transition-all duration-300 hover:-translate-y-1 dark:border-cream/10"
			>
				<div class="grid gap-6 p-7 md:grid-cols-12 md:items-center md:gap-0 md:p-0">
					<div class="md:col-span-5 md:px-12 md:py-10">
						<div class="text-xs font-medium tracking-[0.25em] uppercase text-cream/50">
							<span>{hero.year}</span>
							<span class="mx-2 text-cream/20">·</span>
							<span>{hero.category}</span>
						</div>

						<h3 class="mt-5 text-4xl font-medium tracking-tight md:text-5xl">
							{hero.title}
						</h3>

						<p class="mt-4 max-w-md leading-relaxed text-cream/60">
							{hero.description}
						</p>

						<ul class="mt-6 flex flex-wrap gap-2">
							{#each hero.tags as tag (tag)}
								<li
									class="rounded-full border border-cream/20 px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase text-cream/70"
								>
									{tag}
								</li>
							{/each}
						</ul>

						{#if hero.caseStudy}
							<p
								class="mt-6 flex items-center gap-2 text-sm font-medium text-accent"
							>
								Read case study
								<span
									class="transition-transform duration-200 group-hover:translate-x-1"
									aria-hidden="true">→</span
								>
							</p>
						{/if}
					</div>

					<div class="md:col-span-7 md:py-6 md:pr-6">
						<ProjectVisual
							kind={hero.visual}
							label={hero.frameLabel}
							dark
							image={hero.image}
						/>
					</div>
				</div>
			</a>
		</div>

		<!-- ── Grid — 2 columns, uniform cards ─────────────────────────── -->
		<ul class="mt-5 grid gap-5 sm:grid-cols-2">
			{#each grid as project, i (project.title)}
				{@const dark = project.theme === 'dark'}
				{@const cardHref = project.caseStudy ?? project.href}
				{@const cardExternal = !project.caseStudy}
				<li use:reveal={{ delay: i * 60 }}>
					<a
						href={cardHref}
						target={cardExternal ? '_blank' : undefined}
						rel={cardExternal ? 'noopener noreferrer' : undefined}
						class="group relative block overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 {dark
							? 'border-transparent bg-coal text-cream dark:border-cream/10'
							: 'border-line bg-paper-2/50 hover:bg-paper-2'}"
					>
						<!-- screenshot -->
						<div class="aspect-[16/10] overflow-hidden {dark ? 'bg-coal' : 'bg-paper-2'}">
							{#if project.image}
								<img
									src={project.image}
									alt="Screenshot of {project.frameLabel}"
									loading="lazy"
									class="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
								/>
							{:else}
								<div class="flex h-full w-full items-center justify-center">
									<span class="font-mono text-xs {dark ? 'text-cream/40' : 'text-dim'}"
										>{project.frameLabel}</span
									>
								</div>
							{/if}
						</div>

						<!-- info -->
						<div class="p-6">
							<p
								class="text-[10px] font-medium tracking-[0.2em] uppercase {dark
									? 'text-cream/50'
									: 'text-dim'}"
							>
								{project.year} — {project.category}
							</p>

							<div class="mt-2 flex items-center justify-between gap-4">
								<h3 class="text-2xl font-medium tracking-tight">
									{project.title}
								</h3>
								<span
									class="grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-cream {dark
										? 'border-cream/20'
										: 'border-ink/15'}"
								>
									<ArrowUpRight
										class="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								</span>
							</div>

							<p
								class="mt-3 line-clamp-3 text-sm leading-relaxed {dark
									? 'text-cream/60'
									: 'text-dim'}"
							>
								{project.description}
							</p>

							<ul class="mt-4 flex flex-wrap gap-1.5">
								{#each project.tags as tag (tag)}
									<li
										class="rounded-full border px-3 py-1 text-[10px] font-medium tracking-wider uppercase {dark
											? 'border-cream/20 text-cream/60'
											: 'border-line text-dim'}"
									>
										{tag}
									</li>
								{/each}
							</ul>

							{#if project.caseStudy}
								<p
									class="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent"
								>
									Read case study
									<span
										class="transition-transform duration-200 group-hover:translate-x-1"
										aria-hidden="true">→</span
									>
								</p>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
