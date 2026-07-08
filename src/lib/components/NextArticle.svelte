<script lang="ts">
	import { writing } from '$lib/content';

	let { href }: { href: string } = $props();

	const article = writing.find((a) => a.href === href);
</script>

{#if article}
	<a
		{href}
		class="group mt-16 block rounded-2xl border border-line bg-paper-2/60 px-6 py-6 transition-colors duration-300 hover:border-accent/40 md:px-8 md:py-7"
	>
		<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
			<p class="text-xs font-medium tracking-[0.25em] uppercase text-dim">Next up</p>
			<p class="text-xs text-dim tabular-nums">{article.readingTime} · {article.year}</p>
		</div>
		<p class="mt-3 flex items-baseline justify-between gap-4 text-xl font-medium tracking-tight md:text-2xl">
			<span class="transition-colors duration-300 group-hover:text-accent">{article.title}</span>
			<span
				aria-hidden="true"
				class="shrink-0 text-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
				>→</span
			>
		</p>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-dim">{article.tag}</p>
	</a>
{/if}
