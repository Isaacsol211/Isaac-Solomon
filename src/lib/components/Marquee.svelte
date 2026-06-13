<script lang="ts">
	import { marquee } from '$lib/content';
</script>

<!-- Decorative scrolling skill strip; static list provided for screen readers -->
<div class="overflow-hidden border-y border-line py-4 select-none">
	<p class="sr-only">Skills: {marquee.join(', ')}</p>
	<div
		class="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
		aria-hidden="true"
	>
		{#each [0, 1] as half (half)}
			<ul class="flex shrink-0 items-center gap-10 pr-10">
				{#each marquee as item (item)}
					<li
						class="flex items-center gap-10 text-sm font-medium tracking-[0.3em] uppercase whitespace-nowrap text-dim"
					>
						{item}
						<span class="text-accent">✱</span>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>
