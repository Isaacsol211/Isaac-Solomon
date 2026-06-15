<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { projects, projectsIntro } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import ProjectVisual from './ProjectVisual.svelte';

	// First 3 → big featured split cards. Rest → tight secondary grid.
	const featured = projects.slice(0, 3);
	const secondary = projects.slice(3);
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

		<!-- ── Featured projects — full asymmetric split cards ──────────── -->
		<ul class="mt-12 grid gap-5 md:mt-16">
			{#each featured as project, i (project.title)}
				{@const dark = project.theme === 'dark'}
				{@const flip = i % 2 === 1}
				<li use:reveal={{ delay: 60 }}>
					<a
						href={project.href}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative block overflow-hidden rounded-2xl border p-7 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-0.5 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-500 before:ease-out hover:-translate-y-1 hover:before:scale-x-100 md:p-12 {dark
							? 'border-transparent bg-coal text-cream dark:border-cream/10'
							: 'border-line bg-paper-2/50 hover:bg-paper-2'}"
					>
						{#if dark}
							<span
								aria-hidden="true"
								class="pointer-events-none absolute -top-28 -right-16 size-96 rounded-full border border-cream/10 transition-transform duration-700 group-hover:scale-110"
							></span>
							<span
								aria-hidden="true"
								class="pointer-events-none absolute -bottom-44 right-44 size-72 rounded-full border border-cream/10"
							></span>
						{/if}

						<div
							class="relative flex items-baseline justify-between gap-4 text-xs font-medium tracking-[0.25em] uppercase {dark
								? 'text-cream/50'
								: 'text-dim'}"
						>
							<span class="tabular-nums">( 0{i + 1} )</span>
							<span>{project.year} — {project.category}</span>
						</div>

						<div class="relative mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-center md:gap-10">
							<div class="md:col-span-6 {flip ? 'md:order-2' : ''}">
								<h3 class="text-4xl font-medium tracking-tight md:text-5xl">
									{project.title}
								</h3>
								<p class="mt-3 max-w-xl leading-relaxed {dark ? 'text-cream/60' : 'text-dim'}">
									{project.description}
								</p>

								<div class="mt-8 flex items-end justify-between gap-4 md:mt-10">
									<ul class="flex flex-wrap gap-2">
										{#each project.tags as tag (tag)}
											<li
												class="rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase {dark
													? 'border-cream/20 text-cream/70'
													: 'border-line text-dim'}"
											>
												{tag}
											</li>
										{/each}
									</ul>
									<span
										class="grid size-12 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-cream md:size-14 {dark
											? 'border-cream/25'
											: 'border-ink/20'}"
									>
										<ArrowUpRight
											class="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										/>
									</span>
								</div>
							</div>

							<div
								class="md:col-span-6 {flip
									? 'md:order-1 md:rotate-[-0.75deg]'
									: 'md:rotate-[0.75deg]'} transition-transform duration-500 ease-out group-hover:translate-y-[-0.4rem] group-hover:rotate-0"
							>
								<ProjectVisual kind={project.visual} label={project.frameLabel} {dark} image={project.image} />
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<!-- ── Secondary grid — tight image cards ───────────────────────── -->
		{#if secondary.length > 0}
			<div use:reveal class="mt-16 md:mt-20">
				<!-- divider -->
				<div class="flex items-center gap-5">
					<span class="text-xs font-medium tracking-[0.25em] uppercase text-dim">More Work</span>
					<span class="h-px flex-1 bg-line"></span>
				</div>

				<ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each secondary as project, i (project.title)}
						{@const cardHref = project.caseStudy ?? project.href}
						{@const cardExternal = !project.caseStudy}
						<li use:reveal={{ delay: i * 60 }}>
							<a
								href={cardHref}
								target={cardExternal ? '_blank' : undefined}
								rel={cardExternal ? 'noopener noreferrer' : undefined}
								class="group relative block overflow-hidden rounded-xl border border-line bg-paper-2/50 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-paper-2"
							>
								<!-- thumbnail -->
								<div class="aspect-[16/10] overflow-hidden bg-paper-2">
									{#if project.image}
										<img
											src={project.image}
											alt="Screenshot of {project.frameLabel}"
											loading="lazy"
											class="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
										/>
									{:else}
										<div class="flex h-full w-full items-center justify-center">
											<span class="font-mono text-xs text-dim">{project.frameLabel}</span>
										</div>
									{/if}
								</div>

								<!-- meta row -->
								<div class="flex items-end justify-between gap-3 p-4">
									<div class="min-w-0">
										<p class="text-[10px] font-medium tracking-[0.2em] uppercase text-dim">
											{project.year} — {project.category}
										</p>
										<h3 class="mt-0.5 truncate font-medium tracking-tight">
											{project.title}
										</h3>
										{#if project.caseStudy}
											<span class="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.15em] uppercase text-accent">
												Case study
											</span>
										{/if}
									</div>
									<span
										class="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-cream"
									>
										<ArrowUpRight class="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</span>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</section>
