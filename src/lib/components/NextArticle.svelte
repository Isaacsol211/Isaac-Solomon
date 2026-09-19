<script lang="ts">
	import { writing } from '$lib/content';
	import StoryDoodle from './editorial/StoryDoodle.svelte';

	let { href }: { href: string } = $props();

	const article = writing.find((a) => a.href === href);
</script>

{#if article}
	<a {href} class="group mt-16 block rounded-3xl border-2 border-ink px-6 py-6 transition-colors hover:bg-paper-2/60 md:px-8 md:py-7">
		<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
			<p class="flex items-center gap-2 font-serif text-lg text-dim italic">
				<StoryDoodle kind="arrow" class="w-8 shrink-0" />
				the next chapter
			</p>
			<p class="text-xs text-dim tabular-nums">{article.readingTime} · {article.year}</p>
		</div>
		<p class="mt-3 flex items-baseline justify-between gap-4 font-serif text-2xl leading-tight italic md:text-3xl">
			<span class="transition-colors group-hover:text-accent-text">{article.title}</span>
			<span aria-hidden="true" class="shrink-0 text-dim not-italic transition-transform group-hover:translate-x-1 group-hover:text-accent-text">→</span>
		</p>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-dim">{article.tag}</p>
	</a>
{/if}
