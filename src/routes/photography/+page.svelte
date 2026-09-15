<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/content';
	import { photos } from '$lib/content';
	import { horizontalGallery } from '$lib/actions/horizontal-gallery';
	import { reveal } from '$lib/actions/reveal';
	import { initMotion, MOTION_OK } from '$lib/motion';
	import Nav from '$lib/components/Nav.svelte';
	import Connect from '$lib/components/Connect.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';

	/*
	 * Sections are series, not positions in the array. The old slices put Qutub
	 * Minar in a strip headed "mountain weather" and labelled the sections
	 * "act 01 / pinned strip" — the implementation showing through the design.
	 */
	const bySeries = (name: string) => photos.filter((photo) => photo.series === name);

	const mountains = bySeries('Mountains');
	const afterDark = bySeries('After Dark');
	const places = bySeries('Places');

	const heroPhoto = photos[0];
	/** The full-bleed breaker, pulled out of Places so it is not shown twice. */
	const breaker = places.find((photo) => photo.place === 'Deep Blue') ?? places[0];
	const placesGrid = places.filter((photo) => photo !== breaker);

	/* One flat order so the lightbox's previous/next walks the whole archive. */
	const ordered = [...mountains, ...afterDark, ...places];

	let pageEl = $state<HTMLElement>();
	let lightboxIndex = $state(-1);
	let lastOpener: HTMLElement | null = null;

	function openPhoto(photo: (typeof photos)[number], event: MouseEvent) {
		lastOpener = event.currentTarget as HTMLElement;
		lightboxIndex = ordered.indexOf(photo);
	}

	/** Focus goes back to the thumbnail that opened the dialog, not to the body. */
	function restoreFocus() {
		lastOpener?.focus();
		lastOpener = null;
	}

	function imageSrc(photo: (typeof photos)[number], size = 800) {
		return photo.src.replace('.jpg', `-${size}.jpg`);
	}

	onMount(() => {
		let ctxPromise: Promise<any> | undefined;

		const init = async () => {
			const { gsap } = await initMotion();
			if (!pageEl) return;

			// Every scene here is motion-only, so one matchMedia block owns the lot
			// and reverts it if the preference changes while the page is open.
			const mm = gsap.matchMedia(pageEl);
			mm.add(MOTION_OK, () => {
				const heroImage = pageEl!.querySelector('[data-photo-hero-image]');
				const heroTitle = pageEl!.querySelector('[data-photo-hero-title]');

				if (heroImage) {
					gsap.fromTo(
						heroImage,
						{ yPercent: 0, scale: 1.08 },
						{
							yPercent: 18,
							scale: 1,
							ease: 'none',
							scrollTrigger: {
								trigger: '[data-photo-hero]',
								start: 'top top',
								end: 'bottom top',
								scrub: true
							}
						}
					);
				}

				if (heroTitle) {
					gsap.to(heroTitle, {
						yPercent: -18,
						opacity: 0.25,
						ease: 'none',
						scrollTrigger: {
							trigger: '[data-photo-hero]',
							start: 'top top',
							end: 'bottom top',
							scrub: true
						}
					});
				}

				pageEl!.querySelectorAll('[data-clip-reveal]').forEach((card, i) => {
					gsap.fromTo(
						card,
						{
							clipPath: i % 2 === 0 ? 'inset(18% 8% 18% 0%)' : 'inset(18% 0% 18% 8%)',
							scale: 0.96,
							opacity: 0.72
						},
						{
							clipPath: 'inset(0% 0% 0% 0%)',
							scale: 1,
							opacity: 1,
							ease: 'none',
							scrollTrigger: {
								trigger: card,
								start: 'top 82%',
								end: 'center 42%',
								scrub: true
							}
						}
					);
				});

				const oceanImage = pageEl!.querySelector('[data-ocean-image]');
				if (oceanImage) {
					gsap.fromTo(
						oceanImage,
						{ yPercent: -8, scale: 1.1 },
						{
							yPercent: 8,
							scale: 1,
							ease: 'none',
							scrollTrigger: {
								trigger: '[data-ocean-breaker]',
								start: 'top bottom',
								end: 'bottom top',
								scrub: true
							}
						}
					);
				}

				pageEl!.querySelectorAll('[data-mosaic-card]').forEach((card, i) => {
					const img = card.querySelector('img');
					if (!img) return;

					gsap.fromTo(
						img,
						{ yPercent: i % 2 === 0 ? -10 : 10, scale: 1.06 },
						{
							yPercent: i % 2 === 0 ? 8 : -8,
							scale: 1,
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
			});

			return mm;
		};

		ctxPromise = init();

		return () => {
			ctxPromise?.then((ctx) => ctx?.revert());
		};
	});
</script>

<svelte:head>
	<title>Photography — {site.name}</title>
	<!-- markdown twin for agents — see /llms.txt -->
	<link rel="alternate" type="text/markdown" href="{site.url}/photography.md" />
	<meta
		name="description"
		content="A growing archive of 35mm and digital photography by Isaac Solomon — mountains, cities, light, and quiet moments."
	/>
	<link rel="canonical" href="{site.url}/photography" />
</svelte:head>

<Nav onDark />

<main bind:this={pageEl} id="main" class="relative z-10 bg-paper">
	<section data-photo-hero id="top" class="relative isolate min-h-screen overflow-hidden bg-coal text-cream">
		<img
			data-photo-hero-image
			src={heroPhoto.src}
			srcset="{imageSrc(heroPhoto)} 800w, {heroPhoto.src} 1600w"
			sizes="100vw"
			alt={heroPhoto.alt}
			width={heroPhoto.w}
			height={heroPhoto.h}
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<!--
			The overlay exists to keep text legible, not to tint the picture. It was
			dimming the image to 70% and then laying a 0.52-0.78 gradient over that,
			which is most of the photograph. Now it is a scrim weighted to the bottom,
			under the type, and the top two thirds stay at full contrast.
		-->
		<div
			class="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,12,0.34)_0%,rgba(14,13,12,0.06)_28%,rgba(14,13,12,0.10)_52%,rgba(14,13,12,0.72)_100%)]"
		></div>
		<div class="absolute inset-x-5 top-28 z-10 flex items-center justify-between gap-4 text-[10px] font-medium tracking-[0.24em] lowercase text-cream/70 sm:inset-x-8 md:top-32">
			<span>visual archive / 20 frames</span>
			<span>{heroPhoto.location}</span>
		</div>
		<div class="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-5 pt-32 pb-12 sm:px-8 md:pb-16">
			<div data-photo-hero-title use:reveal>
				<!--
					The title was clamped up to 13rem, which left the photograph as a
					backdrop for a word. At a third of that it still opens the page and
					the image is the thing you see first.
				-->
				<h1 class="max-w-3xl text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.04em] lowercase">
					photography<span class="text-accent">.</span>
				</h1>
				<div class="mt-6 grid gap-6 border-t border-cream/20 pt-5 md:grid-cols-12">
					<p class="max-w-xl text-base leading-relaxed text-cream/75 md:col-span-7">
						A separate archive for the part of the work that is not shipped in a browser:
						mountains, stations, roads, low light, and the odd quiet frame worth keeping.
					</p>
					<p class="text-xs font-medium tracking-[0.22em] lowercase text-cream/55 md:col-span-5 md:text-right">
						{heroPhoto.caption}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!--
		The pinned strip is motion-only. Under reduced motion the gallery must stay a
		plain scrollable row, so the full-height stage is gated on motion-safe too —
		otherwise the section collapses to one screen with no animation to move it.
	-->
	<section use:horizontalGallery class="relative overflow-hidden border-y border-line bg-paper py-20 motion-safe:md:h-screen motion-safe:md:py-0">
		<div class="mx-auto flex h-full max-w-6xl flex-col justify-center px-5 sm:px-8">
			<div class="mb-8 flex flex-wrap items-end justify-between gap-5 md:mb-12">
				<div use:reveal>
					<p class="text-xs font-medium tracking-[0.24em] lowercase text-dim">
						series / mountains — {mountains.length} frames
					</p>
					<h2 class="mt-3 text-4xl font-medium tracking-tight lowercase md:text-6xl">
						mountain weather, frame by frame<span class="text-accent">.</span>
					</h2>
				</div>
				<p class="max-w-sm text-sm leading-relaxed text-dim">
					The first pass stays wide and slow: peaks, ridgelines, stars, and the blue-black quiet of camp.
				</p>
			</div>

			<!--
				overflow-visible hands the horizontal movement to GSAP. Gated on motion-safe
				so reduced motion keeps the native scroller: without it the w-max track sits
				inside a clipped section with nothing to scroll it, and the later frames are
				unreachable. Expressed as motion-safe rather than a motion-reduce override so
				the two rules never compete on specificity.
			-->
			<div class="-mx-5 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 motion-safe:md:overflow-visible motion-safe:md:pb-0">
				<div data-gallery-track class="flex w-max items-stretch gap-4 pr-[18vw] md:gap-6">
					{#each mountains as photo, i (photo.src)}
						<figure data-gallery-item class="group w-[76vw] shrink-0 sm:w-[25rem] md:w-[34rem]">
							<!--
								Every mountain frame is 4:3, so the strip's own ratio crops none of
								them while still giving the row a single height to align on.
							-->
							<button
								type="button"
								onclick={(event) => openPhoto(photo, event)}
								class="block w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper-2"
							>
								<img
									src={imageSrc(photo)}
									srcset="{imageSrc(photo)} 800w, {photo.src} 1600w"
									sizes="(min-width: 768px) 34rem, 76vw"
									alt={photo.alt}
									width={photo.w}
									height={photo.h}
									loading={i < 2 ? 'eager' : 'lazy'}
									class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							</button>
							<figcaption class="mt-4 flex items-baseline justify-between gap-4">
								<span class="text-[10px] font-medium tracking-[0.22em] lowercase text-dim transition-colors group-hover:text-accent">
									{String(i + 1).padStart(2, '0')} / {photo.place}
								</span>
								<span class="text-[10px] tracking-[0.16em] lowercase text-dim/60">{photo.location}</span>
							</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="relative px-5 py-24 sm:px-8 md:py-36">
		<div class="mx-auto max-w-6xl">
			<div use:reveal class="max-w-3xl">
				<p class="text-xs font-medium tracking-[0.24em] lowercase text-dim">
					series / after dark — {afterDark.length} frames
				</p>
				<h2 class="mt-3 text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.04em] lowercase">
					what is left once the light goes<span class="text-accent">.</span>
				</h2>
			</div>

			<div class="mt-16 space-y-20 md:mt-24 md:space-y-28">
				{#each afterDark as photo, i (photo.src)}
					<article
						class="grid items-end gap-6 md:grid-cols-12 {i % 2 === 1 ? 'md:[&>*:first-child]:col-start-7' : ''}"
					>
						<figure data-clip-reveal class="group md:col-span-6">
							<!--
								h-auto, not a fixed 28-38rem box: this series holds the one
								panoramic frame in the archive, and object-cover was cutting it
								to the same portrait shape as everything else.
							-->
							<button
								type="button"
								onclick={(event) => openPhoto(photo, event)}
								class="block w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper-2"
							>
								<img
									src={imageSrc(photo)}
									srcset="{imageSrc(photo)} 800w, {photo.src} 1600w"
									sizes="(min-width: 768px) 50vw, 100vw"
									alt={photo.alt}
									width={photo.w}
									height={photo.h}
									loading="lazy"
									class="h-auto w-full transition-transform duration-700 group-hover:scale-105"
								/>
							</button>
						</figure>
						<div class="max-w-md md:col-span-4 {i % 2 === 1 ? 'md:col-start-2 md:row-start-1' : ''}">
							<p class="text-[10px] font-medium tracking-[0.24em] lowercase text-accent">
								{String(i + 1).padStart(2, '0')} / {photo.location}
							</p>
							<h3 class="mt-3 font-serif text-4xl leading-none italic text-ink/80 md:text-5xl">{photo.place}</h3>
							<p class="mt-5 text-sm leading-relaxed text-dim">{photo.description}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section data-ocean-breaker class="relative min-h-screen overflow-hidden bg-coal text-cream">
		<img
			data-ocean-image
			src={breaker.src}
			srcset="{imageSrc(breaker)} 800w, {breaker.src} 1600w"
			sizes="100vw"
			alt={breaker.alt}
			width={breaker.w}
			height={breaker.h}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover opacity-85"
		/>
		<div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,13,12,0.72),rgba(14,13,12,0.18)_55%,rgba(14,13,12,0.58))]"></div>
		<div class="relative z-10 mx-auto flex min-h-screen max-w-6xl items-end px-5 py-16 sm:px-8 md:py-24">
			<div use:reveal class="max-w-2xl">
				<p class="text-xs font-medium tracking-[0.24em] lowercase text-cream/60">
					{breaker.place} — {breaker.location}
				</p>
				<h2 class="mt-4 text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] font-medium tracking-[-0.05em] lowercase">
					disconnect<span class="text-accent">.</span>
				</h2>
				<p class="mt-6 max-w-lg text-base leading-relaxed text-cream/72">{breaker.description}</p>
			</div>
		</div>
	</section>

	<section class="relative overflow-hidden px-5 py-24 sm:px-8 md:py-36">
		<div class="mx-auto max-w-6xl">
			<div class="grid gap-10 md:grid-cols-12 md:items-start">
				<div use:reveal class="md:sticky md:top-32 md:col-span-4">
					<p class="text-xs font-medium tracking-[0.24em] lowercase text-dim">
						series / places — {places.length} frames
					</p>
					<h2 class="mt-4 text-5xl leading-[0.95] font-medium tracking-tight lowercase md:text-7xl">
						cities, summits, gardens, green hills<span class="text-accent">.</span>
					</h2>
					<p class="mt-6 text-sm leading-relaxed text-dim">
						The archive keeps widening: railway platforms, monuments, people at altitude, tea estates after rain.
					</p>
				</div>

				<div class="grid gap-5 md:col-span-8 md:grid-cols-2 md:gap-6">
					{#each placesGrid as photo, i (photo.src)}
						<figure data-mosaic-card class="group {i % 2 === 0 ? 'md:translate-y-16' : ''}">
							<!-- Natural proportions: this is the overview grid, so nothing is cropped. -->
							<button
								type="button"
								onclick={(event) => openPhoto(photo, event)}
								class="block w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper-2"
							>
								<img
									src={imageSrc(photo)}
									srcset="{imageSrc(photo)} 800w, {photo.src} 1600w"
									sizes="(min-width: 768px) 34vw, 100vw"
									alt={photo.alt}
									width={photo.w}
									height={photo.h}
									loading="lazy"
									class="h-auto w-full transition-transform duration-700 group-hover:scale-105"
								/>
							</button>
							<figcaption class="mt-4 flex items-baseline justify-between gap-4">
								<span class="text-[10px] font-medium tracking-[0.22em] lowercase text-dim transition-colors group-hover:text-accent">
									{photo.place}
								</span>
								<span class="text-[10px] tracking-[0.16em] lowercase text-dim/60">{photo.location}</span>
							</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>

<Lightbox items={ordered} bind:index={lightboxIndex} onclose={restoreFocus} />

<Connect />
