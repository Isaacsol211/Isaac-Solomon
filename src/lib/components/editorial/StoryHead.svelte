<script lang="ts">
	/* Shared chapter header: a big numeral, a serif whimsy line, the title. */
	let { n, label, title }: { n: string; label: string; title: string } = $props();
</script>

<div class="flex items-center gap-5">
	<span class="text-[clamp(3.5rem,8vw,6rem)] font-medium leading-none tracking-tight">{n}</span>
	<div>
		<p class="font-serif text-xl text-dim italic sm:text-2xl">{label}</p>
		<h2 class="text-2xl font-medium tracking-[0.02em] uppercase sm:text-3xl">{title}</h2>
	</div>
</div>
