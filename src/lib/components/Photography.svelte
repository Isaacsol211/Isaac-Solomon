<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { photos, photographyIntro, site } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	const strip = photos.slice(0, 7);
	let sectionEl = $state<HTMLElement>();

	onMount(() => {
		let ctxPromise: Promise<any> | undefined;

		const init = async () => {
			const { gsap, reducedMotion } = await initMotion();
			if (!sectionEl || reducedMotion) return;

			const ctx = gsap.context(() => {
				sectionEl!.querySelectorAll('[data-photo-card]').forEach((card, i) => {
					const img = card.querySelector('img');
					if (!img) return;
					gsap.fromTo(
						img,
						{ yPercent: i % 2 === 0 ? 10 : -10, scale: 0.96 },
						{
							yPercent: i % 2 === 0 ? -6 : 6,
							scale: 1.02,
							ease: 'none',
							scrollTrigger: {
								trigger: card,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true
							}
						}
					);
				});
			}, sectionEl);

			return ctx;
		};

		ctxPromise = init();

		return () => {
			ctxPromise?.then((ctx) => ctx?.revert());
		};
	});
</script>

<section bind:this={sectionEl} id="photography" class="relative z-10 isolate border-t border-line bg-paper">
	<div class="px-5 pt-20 sm:px-8 md:pt-32">
		<div class="mx-auto max-w-6xl">
			<div use:reveal class="max-w-2xl">
				<Eyebrow index="07" title="Photography" />
				<p class="mt-8 font-serif text-2xl italic text-dim md:text-3xl">— &amp; {site.tagline}</p>
				<h2 class="mt-6 text-4xl font-medium tracking-tight lowercase md:text-6xl">
					{photographyIntro.plain}
					<span class="text-dim">{photographyIntro.accent}</span>
				</h2>
				<p class="mt-4 text-sm leading-relaxed text-dim">
					{photographyIntro.note}
				</p>
				<p class="mt-8 max-w-md text-base leading-relaxed text-dim">
					A separate archive for the part of the work that isn't shipped in a browser: mountains,
					stations, roads, low light, and the odd quiet frame worth keeping.
				</p>
			</div>
		</div>
	</div>

	<div class="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
			{#each strip as photo, i (photo.src)}
				<figure
					data-photo-card
					class="group {i === 0
						? 'md:col-span-4 md:pt-10'
						: i === 1
							? 'md:col-span-5 md:pt-0'
							: i === 2
								? 'md:col-span-3 md:pt-16'
								: i === 3
									? 'md:col-span-6 md:pt-6'
									: i === 4
										? 'md:col-span-3 md:pt-20'
										: i === 5
											? 'md:col-span-3 md:pt-0'
											: 'sm:col-span-2 md:col-span-5 md:-mt-8'}"
				>
					<div class="overflow-hidden rounded-sm bg-paper-2">
						<img
							src={photo.src}
							srcset="{photo.src.replace('.jpg', '-800.jpg')} 800w, {photo.src} 1600w"
							sizes="(min-width: 768px) 50vw, 100vw"
							alt={photo.alt}
							width={photo.w}
							height={photo.h}
							loading="lazy"
							class="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-80 {i === 1 || i === 6 ? 'object-center' : 'object-top'} md:h-[26rem]"
						/>
					</div>
					{#if i === 0 || i === 3}
						<p class="mt-2 max-w-sm text-sm leading-relaxed text-dim/80">
							{photo.description}
						</p>
					{/if}
					<figcaption class="mt-3 flex items-baseline justify-between gap-4">
						<span class="text-[10px] font-medium tracking-[0.2em] lowercase text-dim transition-colors duration-300 group-hover:text-accent">
							( {photo.place} )
						</span>
						<span class="text-[10px] tracking-[0.15em] lowercase text-dim opacity-50">
							{photo.location}
						</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>

	<div class="h-12 md:h-16"></div>
</section>
