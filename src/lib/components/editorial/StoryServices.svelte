<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { serviceDetails } from '$lib/content';
	import StoryHead from './StoryHead.svelte';
	import StorySplash from './StorySplash.svelte';
	import ServicesDiagram from '../ServicesDiagram.svelte';

	/* A selector, not a stack: pick a capability, its diagram and detail show. */
	let active = $state(0);
</script>

<section id="services" class="story overflow-x-clip bg-story-paper px-5 py-20 sm:px-8 md:py-28">
	<StorySplash color="cobalt" seed={11} class="top-10 -left-36 hidden w-[26rem] lg:block" />
	<div class="mx-auto max-w-5xl">
		<div use:reveal>
			<StoryHead n="03" label="chapter three" title="What I make" />
		</div>

		{#snippet detail(service: (typeof serviceDetails)[number], i: number)}
			<div class="rounded-2xl border-2 border-ink bg-paper-2/40 p-6 sm:p-8">
				<div class="mx-auto max-w-[220px]">
					<ServicesDiagram index={i} />
				</div>
				<p class="mt-6 text-[15px] leading-relaxed text-ink">{service.summary}</p>
				<ul class="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
					{#each service.items as item (item)}
						<li class="text-sm text-dim lowercase"><span aria-hidden="true">—</span> {item}</li>
					{/each}
				</ul>
				{#if service.proof}
					<a
						href={service.proof.href}
						class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-text"
					>
						<span class="underline decoration-accent-text/40 underline-offset-4 group-hover:decoration-accent-text">{service.proof.label}</span>
						<span aria-hidden="true">↗</span>
					</a>
				{/if}
			</div>
		{/snippet}

		<div use:reveal class="mt-12 grid gap-x-12 gap-y-4 lg:grid-cols-[1fr_26rem] lg:items-start">
			<!-- the five capabilities, as a chooseable list -->
			<ul class="lg:border-t lg:border-line">
				{#each serviceDetails as service, i (service.title)}
					<li class="border-t border-line lg:border-t-0 {i > 0 ? 'lg:border-t lg:border-line' : ''}">
						<button
							type="button"
							onclick={() => (active = i)}
							onmouseenter={() => (active = i)}
							onfocus={() => (active = i)}
							aria-expanded={active === i}
							class="group flex w-full items-center gap-4 py-5 text-left"
						>
							<span class="font-serif text-lg text-dim italic tabular-nums">0{i + 1}</span>
							<span
								class="text-2xl font-medium tracking-tight lowercase transition-colors sm:text-3xl {active === i
									? 'text-accent-text'
									: 'group-hover:text-ink'}"
							>
								{service.title}
							</span>
							<span
								class="ml-auto text-dim transition-transform {active === i ? 'rotate-90 text-accent-text' : ''}"
								aria-hidden="true">→</span
							>
						</button>
						<!-- inline detail on small screens -->
						{#if active === i}
							<div class="pb-6 lg:hidden">{@render detail(service, i)}</div>
						{/if}
					</li>
				{/each}
			</ul>

			<!-- the selected capability, held in a sticky panel on desktop -->
			<div class="hidden lg:sticky lg:top-28 lg:block">
				{@render detail(serviceDetails[active], active)}
			</div>
		</div>
	</div>
</section>
