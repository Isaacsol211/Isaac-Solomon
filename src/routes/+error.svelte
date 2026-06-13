<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content';
</script>

<svelte:head>
	<title>{page.status} — {site.name}</title>
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-center px-5 text-center">
	<p class="flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-dim">
		<span class="text-accent" aria-hidden="true">✱</span>
		{page.status} — {page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</p>
	<h1 class="mt-6 text-6xl font-medium tracking-tight md:text-8xl">
		Lost in <em class="font-serif font-normal text-dim italic">the frame.</em>
	</h1>
	<a
		href="/"
		class="mt-10 rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-accent"
	>
		← Back home
	</a>
</main>
