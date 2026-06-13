<script lang="ts">
	let {
		index,
		title,
		tone = 'light'
	}: { index: string; title: string; tone?: 'light' | 'dark' } = $props();
</script>

<p
	class="flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase {tone === 'dark'
		? 'text-cream/50'
		: 'text-dim'}"
>
	<span class="text-accent" aria-hidden="true">✱</span>
	<span>( {index} ) — {title}</span>
</p>
