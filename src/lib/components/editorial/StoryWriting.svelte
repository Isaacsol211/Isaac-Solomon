<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { writing, writingHomeNote } from '$lib/content';
	import StoryHead from './StoryHead.svelte';
	import StoryDoodle from './StoryDoodle.svelte';

	const essays = writing.filter((a) => !a.tag.startsWith('Case Study')).slice(0, 2);
</script>

<section id="writing" class="story relative overflow-hidden bg-story-paper px-5 py-20 sm:px-8 md:py-28">
	<StoryDoodle kind="pen" class="pointer-events-none absolute top-24 right-10 hidden w-16 -rotate-6 md:block" />
	<div class="mx-auto grid max-w-5xl gap-y-10 md:grid-cols-12 md:gap-x-16">
		<div use:reveal class="md:col-span-4">
			<StoryHead n="04" label="chapter four" title="Notes" />
			<p class="mt-8 max-w-xs text-[15px] leading-relaxed text-dim">{writingHomeNote}</p>
			<a
				href="/writing"
				class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent-text"
			>
				<span class="underline decoration-line underline-offset-4 group-hover:decoration-accent-text">all writing ({writing.length})</span>
				<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
			</a>
		</div>

		<div class="md:col-span-8">
			<ol class="border-b border-line">
				{#each essays as article, i (article.href)}
					<li use:reveal={{ delay: 80 * i }} class="border-t border-line">
						<a href={article.href} class="group block py-8 md:py-10">
							<p class="font-serif text-lg text-dim italic">{article.tag} · {article.readingTime}</p>
							<h3 class="mt-3 font-serif text-3xl leading-[1.1] italic transition-colors group-hover:text-accent-text sm:text-4xl md:text-5xl">
								{article.title}
								<span aria-hidden="true" class="ml-1 inline-block text-2xl text-dim not-italic transition-transform group-hover:translate-x-1">→</span>
							</h3>
							<p class="mt-4 max-w-xl text-[15px] leading-relaxed text-dim">{article.description}</p>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
