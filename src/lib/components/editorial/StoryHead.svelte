<script lang="ts">
	import StoryDeco from './StoryDeco.svelte';
	/* Shared chapter header: a big numeral, a serif whimsy line, the title. */
	let { n, label, title }: { n: string; label: string; title: string } = $props();

	const sq = $derived(['bg-cobalt', 'bg-grass', 'bg-mustard', 'bg-accent'][(parseInt(n) - 1) % 4]);
</script>

<div class="relative flex items-center gap-5">
	<!-- a rotated page marker, like a printed folio -->
	<span class="absolute -top-6 -left-1 font-serif text-sm text-dim italic" aria-hidden="true">pg. {n}</span>
	<span class="text-[clamp(3.5rem,8vw,6rem)] font-medium leading-none tracking-tight">{n}</span>
	<div>
		<p class="flex items-center gap-2 font-serif text-xl text-dim italic sm:text-2xl">
			<span class="block size-2.5 {sq}" aria-hidden="true"></span>
			{label}
		</p>
		<h2 class="text-2xl font-medium tracking-[0.02em] uppercase sm:text-3xl">{title}</h2>
		<StoryDeco kind="squiggle" class="mt-1.5 block h-2 w-24" />
	</div>
</div>
