<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
>
	Skip to content
</a>

<!-- Reading-progress hairline (CSS scroll-driven; hidden where unsupported) -->
<div class="scroll-progress" aria-hidden="true"></div>

<div class="grain">
	{@render children()}
</div>
