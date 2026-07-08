<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { experience, experienceHeading } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';
</script>

<section id="experience" class="border-t border-line px-5 py-16 sm:px-8 md:py-24">
	<div class="mx-auto max-w-6xl">
		<div use:reveal>
			<Eyebrow index="04" title="Experience" />
		</div>
		<h2
			use:reveal={{ delay: 100 }}
			class="mt-6 max-w-3xl text-4xl font-medium tracking-tight lowercase md:text-6xl"
		>
			{experienceHeading.plain}
			<span class="text-dim">{experienceHeading.accent}</span>
		</h2>

		<ol class="mt-10 border-b border-line md:mt-14">
			{#each experience as job (job.from + job.role)}
				<li
					use:reveal
					class="group relative grid gap-2 border-t border-line py-6 transition-colors duration-300 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8"
				>
					<p
						class="text-xl font-medium tracking-tight tabular-nums transition-colors duration-300 group-hover:text-accent md:col-span-3 md:text-2xl"
					>
						{job.from} — {job.to}
					</p>
					<div class="md:col-span-5">
						<h3 class="text-base font-medium md:text-lg">{job.role}</h3>
						<p class="mt-1 text-dim">@ {job.company}</p>
					</div>
					<p class="mt-2 text-sm leading-relaxed text-dim md:col-span-4 md:mt-0">
						{job.description}
					</p>
				</li>
			{/each}
		</ol>
	</div>
</section>
