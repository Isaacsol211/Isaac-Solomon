<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content';
</script>

<svelte:head>
	<title>{page.status} — {site.name}</title>
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center">
	<img src="/story/cat.webp" alt="" aria-hidden="true" width="535" height="639" class="story-art w-36 sm:w-44" />
	<p class="mt-8 font-serif text-lg text-dim italic">
		{page.status} · {page.status === 404 ? 'this page wandered off' : 'something went wrong'}
	</p>
	<h1 class="article-title mt-2 flex flex-col items-center text-5xl font-medium tracking-tight lowercase after:mx-auto md:text-7xl">
		<span>lost in <em class="font-serif font-normal text-dim italic">the frame.</em></span>
	</h1>
	<a
		href="/"
		class="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-story-paper transition-colors hover:bg-accent-text"
	>
		<span class="inline-block transition-transform group-hover:-translate-x-0.5" aria-hidden="true">←</span>
		back to the folio
	</a>
</main>
