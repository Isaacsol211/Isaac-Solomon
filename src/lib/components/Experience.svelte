<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { experience, experienceNote } from '$lib/content';
</script>

<!-- The work history, rendered inside About: years, then role, company and what it was. -->
<ol class="mt-6 border-b border-line">
	{#each experience as job (job.from + job.role)}
		<li use:reveal class="grid gap-2 border-t border-line py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
			<p class="text-lg font-medium tracking-tight tabular-nums">{job.from} — {job.to}</p>
			<div>
				<h3 class="text-base font-medium md:text-lg">{job.role} <span class="font-normal text-dim">@ {job.company}</span></h3>
				<p class="mt-2 max-w-2xl text-sm leading-relaxed text-dim">{job.description}</p>
			</div>
		</li>
	{/each}
</ol>
<p class="mt-5 text-sm text-dim">{experienceNote}</p>
