<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { experience, experienceHeading } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';
</script>

<section id="experience" class="border-t border-line px-5 py-20 sm:px-8 md:py-32">
	<div class="mx-auto max-w-6xl">
		<div use:reveal>
			<Eyebrow index="03" title="Experience" />
		</div>
		<h2
			use:reveal={{ delay: 100 }}
			class="mt-6 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl"
		>
			{experienceHeading.plain}
			<em class="font-serif font-normal text-dim italic">{experienceHeading.accent}</em>
		</h2>

		<ol class="mt-12 border-b border-line md:mt-16">
			{#each experience as job (job.from + job.role)}
				<li
					use:reveal
					class="group relative grid gap-2 border-t border-line py-8 transition-colors duration-300 before:absolute before:-inset-x-5 before:inset-y-2 before:-z-10 before:rounded-2xl before:bg-paper-2 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-60 md:grid-cols-12 md:items-baseline md:gap-6 md:py-10"
				>
					<p
						class="text-2xl font-medium tracking-tight tabular-nums transition-colors duration-300 group-hover:text-accent md:col-span-3 md:text-3xl"
					>
						{job.from} — {job.to}
					</p>
					<div class="md:col-span-5">
						<h3 class="text-lg font-medium md:text-xl">{job.role}</h3>
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
