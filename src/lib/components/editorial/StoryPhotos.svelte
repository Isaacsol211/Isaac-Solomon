<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { photos, photographyPage, photographyTeaser } from '$lib/content';
	import StoryHead from './StoryHead.svelte';

	const frames = photographyTeaser.places.map((place) => photos.find((p) => p.place === place)!);
</script>

<section id="photography-teaser" class="story bg-story-paper px-5 py-20 sm:px-8 md:py-28">
	<div class="mx-auto grid max-w-5xl gap-y-10 md:grid-cols-12 md:gap-x-16">
		<div use:reveal class="md:col-span-4">
			<StoryHead n="05" label="chapter five" title="Photographs" />
			<p class="mt-8 max-w-xs text-[15px] leading-relaxed text-dim">{photographyPage.lead}</p>
			<a
				href="/photography"
				class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent-text"
			>
				<span class="underline decoration-line underline-offset-4 group-hover:decoration-accent-text">{photographyTeaser.linkLabel} ({photos.length})</span>
				<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
			</a>
		</div>

		<!-- three frames, each in the storybook border -->
		<div class="grid grid-cols-3 gap-3 md:col-span-8 md:gap-4">
			{#each frames as photo, i (photo.src)}
				<a use:reveal={{ delay: 80 * i }} href="/photography" class="group block">
					<div class="overflow-hidden rounded-xl border-2 border-ink">
						<img
							src={photo.src.replace('.jpg', '-800.jpg')}
							alt={photo.alt}
							width={photo.w}
							height={photo.h}
							loading="lazy"
							decoding="async"
							class="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
						/>
					</div>
					<p class="mt-2 text-xs text-dim transition-colors group-hover:text-ink">{photo.place}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
