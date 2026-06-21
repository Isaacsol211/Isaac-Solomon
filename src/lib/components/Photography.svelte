<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { horizontalGallery } from '$lib/actions/horizontal-gallery';
	import { photos, photographyIntro } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	const strip = photos.slice(0, 10);
	let isMobile = $state(true);
	let activePhoto = $state(-1);

	onMount(() => {
		isMobile = window.innerWidth < 768;
	});
</script>

<section
	id="photography"
	use:horizontalGallery
	class="border-t border-line"
>
	<!-- Header -->
	<div class="px-5 pt-20 sm:px-8 md:pt-32 {isMobile ? '' : 'pb-10'}">
		<div class="mx-auto max-w-6xl">
			<div use:reveal class="max-w-2xl">
				<Eyebrow index="04" title="Photography" />
				<h2 class="mt-6 text-4xl font-medium tracking-tight md:text-6xl">
					{photographyIntro.plain}
					<span class="text-dim">{photographyIntro.accent}</span>
				</h2>
				<p class="mt-4 text-sm leading-relaxed text-dim">
					{photographyIntro.note}
				</p>
			</div>
		</div>
	</div>

	<!-- Gallery track -->
	<div
		data-gallery-track
		class="mt-8 flex items-end gap-4 md:gap-6 {isMobile
			? 'overflow-x-auto px-5 pb-6 sm:px-8'
			: 'px-16'}"
		style={isMobile ? '-webkit-overflow-scrolling: touch; scrollbar-width: none;' : ''}
	>
		{#each strip as photo, i (photo.src)}
			{@const isOdd = i % 2 !== 0}
			<figure
				data-gallery-item
				class="group shrink-0 {isOdd ? 'mb-8 md:mb-16' : ''}"
				onmouseenter={() => (activePhoto = i)}
				onmouseleave={() => (activePhoto = -1)}
			>
				<div class="overflow-hidden rounded-sm">
					<img
						src={photo.src}
						alt={photo.alt}
						width={photo.w}
						height={photo.h}
						loading="lazy"
						class="h-56 w-auto object-cover transition-transform duration-700 ease-out sm:h-64 md:h-[420px] group-hover:scale-105"
					/>
				</div>
				<figcaption class="mt-3 flex items-baseline justify-between gap-4">
					<span class="text-[10px] font-medium tracking-[0.2em] uppercase text-dim transition-colors duration-300 group-hover:text-accent">
						{photo.place}
					</span>
					<span class="text-[10px] tracking-[0.15em] uppercase text-dim opacity-50">
						{photo.location}
					</span>
				</figcaption>
			</figure>
		{/each}
	</div>

	<!-- Bottom spacing for pinned section -->
	{#if !isMobile}
		<div class="h-16"></div>
	{/if}
</section>
