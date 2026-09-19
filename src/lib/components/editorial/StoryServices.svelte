<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { serviceDetails } from '$lib/content';
	import StoryHead from './StoryHead.svelte';
	import ServicesDiagram from '../ServicesDiagram.svelte';
</script>

<section id="services" class="story bg-story-paper px-5 py-20 sm:px-8 md:py-28">
	<div class="mx-auto max-w-5xl">
		<div use:reveal>
			<StoryHead n="03" label="chapter three" title="What I make" />
		</div>

		<ol class="mt-12 border-b border-line">
			{#each serviceDetails as service, i (service.title)}
				<li use:reveal class="grid gap-6 border-t border-line py-9 lg:grid-cols-[13rem_1fr] lg:gap-x-12">
					<!-- the existing hand-drawn diagram fits the storybook line-art -->
					<div class="flex items-start gap-4">
						<span class="font-serif text-2xl text-dim italic">0{i + 1}</span>
						<div class="hidden w-[168px] lg:block" aria-hidden="true">
							<ServicesDiagram index={i} compact />
						</div>
					</div>
					<div>
						<h3 class="text-2xl font-medium tracking-tight lowercase">{service.title}</h3>
						<p class="mt-3 max-w-xl text-[15px] leading-relaxed text-dim">{service.summary}</p>
						<ul class="mt-4 grid max-w-xl gap-x-8 gap-y-2 sm:grid-cols-2">
							{#each service.items as item (item)}
								<li class="text-sm text-dim lowercase"><span aria-hidden="true">—</span> {item}</li>
							{/each}
						</ul>
						{#if service.proof}
							<a
								href={service.proof.href}
								class="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-text"
							>
								<span class="underline decoration-accent-text/40 underline-offset-4 group-hover:decoration-accent-text">{service.proof.label}</span>
								<span aria-hidden="true">↗</span>
							</a>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
