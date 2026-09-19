<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { photos, photographyPage, photographyTeaser } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	/* Three frames from the archive — the only sign of the photography on the homepage besides the nav. */
	const frames = photographyTeaser.places.map((place) => photos.find((p) => p.place === place)!);
</script>

<section id="photography-teaser" class="border-t border-line px-5 py-20 sm:px-8 md:py-28">
	<div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
		<div use:reveal class="md:col-span-4">
			<Eyebrow title="Photography" as="h2" />
			<p class="mt-6 max-w-xs text-sm leading-relaxed text-dim">{photographyPage.lead}</p>
			<a
				href="/photography"
				class="group mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent-text"
			>
				{photographyTeaser.linkLabel} ({photos.length})
				<span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
			</a>
		</div>
		<div class="grid grid-cols-3 gap-3 md:col-span-8 md:gap-4">
			{#each frames as photo, i (photo.src)}
				<a use:reveal={{ delay: 80 * i }} href="/photography" class="group block">
					<img
						src={photo.src.replace('.jpg', '-800.jpg')}
						alt={photo.alt}
						width={photo.w}
						height={photo.h}
						loading="lazy"
						decoding="async"
						class="aspect-[4/3] w-full rounded-lg object-cover"
					/>
					<p class="mt-2 text-xs text-dim transition-colors group-hover:text-ink">{photo.place} — {photo.location}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
