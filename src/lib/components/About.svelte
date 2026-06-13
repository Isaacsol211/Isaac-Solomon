<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { about, stats } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';
	import Stat from './Stat.svelte';
	import glitch from '$lib/assets/about-glitch.svg';
</script>

<section id="about" class="px-5 py-20 sm:px-8 md:py-32">
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-10 md:grid-cols-12">
			<div class="md:col-span-4">
				<div use:reveal class="md:sticky md:top-28">
					<Eyebrow index="01" title="About Me" />
				</div>
			</div>

			<div class="md:col-span-8">
				<p use:reveal class="text-2xl leading-snug font-medium tracking-tight md:text-4xl">
					{about.lead}
					<em class="font-serif font-normal text-dim italic">{about.leadAccent}</em>
				</p>

				{#each about.paragraphs as paragraph, i (i)}
					<p
						use:reveal={{ delay: 80 * (i + 1) }}
						class="mt-6 max-w-2xl text-base leading-relaxed text-dim md:text-lg"
					>
						{paragraph}
					</p>
				{/each}

				<figure use:reveal class="mt-12">
					<img
						src={glitch}
						alt={about.imageAlt}
						width="1600"
						height="700"
						loading="lazy"
						class="w-full rounded-2xl"
					/>
					<figcaption class="mt-3 text-xs font-medium tracking-[0.25em] uppercase text-dim">
						{about.imageCaption}
					</figcaption>
				</figure>

				<div class="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-3 sm:gap-6">
					{#each stats as stat, i (stat.label)}
						<Stat {...stat} delay={i * 100} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
