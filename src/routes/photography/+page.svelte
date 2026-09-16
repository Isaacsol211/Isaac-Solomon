<script lang="ts">
	import { onMount } from 'svelte';
	import { site, photos, photoSelection, photographyPage, type PhotoSize } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';
	import { initMotion, MOTION_OK } from '$lib/motion';
	import Nav from '$lib/components/Nav.svelte';
	import Connect from '$lib/components/Connect.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';

	/*
	 * The page is an edit and an archive, in that order. It used to be a
	 * five-and-a-half-thousand-pixel pinned strip of eleven mountain frames
	 * followed by everything else, which meant the route to After Dark ran
	 * through the whole of Mountains and the visit was mostly one series. Now:
	 * one opening frame, eight selected frames chosen for how unlike each other
	 * they are, a pause, and the complete twenty grouped by series — each group
	 * with its own id, so the links at the top go straight there.
	 *
	 * Nothing below the opening moves with the scroll. Each frame clips open
	 * once and then holds still, because a photograph that keeps changing shape
	 * cannot be looked at. The rotation, vertical drift and 0.88 scale the old
	 * strip applied to every image are gone — at 0.88 the photograph was
	 * smaller than the frame holding it, so the frame showed around the edges.
	 */
	const bySeries = (name: string) => photos.filter((photo) => photo.series === name);

	const series = [
		{ id: 'mountains', label: 'Mountains', items: bySeries('Mountains') },
		{ id: 'after-dark', label: 'After Dark', items: bySeries('After Dark') },
		{ id: 'places', label: 'Places', items: bySeries('Places') }
	];

	const heroPhoto = photos[0];
	/** The quiet frame between the edit and the archive. */
	const pause = photos.find((photo) => photo.place === 'Deep Blue') ?? photos[0];

	const byPlace = (place: string) => photos.find((photo) => photo.place === place);
	/* The opening edit never repeats the opening frame — that was the old strip's first card. */
	const selected = photoSelection
		.map((entry) => ({ ...entry, photo: byPlace(entry.place) }))
		.filter((entry) => entry.photo && entry.photo !== heroPhoto) as {
		place: string;
		size: PhotoSize;
		photo: (typeof photos)[number];
	}[];

	/* One flat order so the lightbox's previous/next walks the whole archive. */
	const ordered = series.flatMap((group) => group.items);

	const spans: Record<PhotoSize, string> = {
		full: 'md:col-span-12',
		wide: 'md:col-span-7',
		narrow: 'md:col-span-5',
		half: 'md:col-span-6'
	};

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
		let mm: ReturnType<(typeof import('gsap'))['gsap']['matchMedia']> | undefined;
		let cancelled = false;

		(async () => {
			const { gsap } = await initMotion();
			if (cancelled || !pageEl) return;

			mm = gsap.matchMedia(pageEl);
			mm.add(MOTION_OK, () => {
				/*
				 * The opening frame drifts behind its own type. It is the one
				 * scroll-linked image on the page, and it is an inset background
				 * rather than a photograph being studied.
				 */
				const heroImage = pageEl!.querySelector('[data-photo-hero-image]');
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

				/*
				 * One clip each, then still. A frame already on screen when GSAP
				 * finishes loading is left alone: hiding something the visitor is
				 * already looking at so it can be revealed again is the flash this
				 * check exists to avoid.
				 */
				pageEl!.querySelectorAll<HTMLElement>('[data-settle]').forEach((frame) => {
					if (frame.getBoundingClientRect().top < window.innerHeight) return;
					gsap.fromTo(
						frame,
						{ clipPath: 'inset(0 0 100% 0)' },
						{
							clipPath: 'inset(0 0 0% 0)',
							duration: 0.7,
							ease: 'expo.out',
							scrollTrigger: { trigger: frame, start: 'top 88%', once: true }
						}
					);
				});
			});
		})();

		return () => {
			cancelled = true;
			mm?.revert();
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
			srcset="{imageSrc(heroPhoto)} {heroPhoto.w / 2}w, {heroPhoto.src} {heroPhoto.w}w"
			sizes="100vw"
			alt={heroPhoto.alt}
			width={heroPhoto.w}
			height={heroPhoto.h}
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<!--
			The overlay exists to keep text legible, not to tint the picture: a scrim
			weighted to the bottom, under the type, with the top two thirds at full
			contrast.
		-->
		<div
			class="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,12,0.34)_0%,rgba(14,13,12,0.06)_28%,rgba(14,13,12,0.10)_52%,rgba(14,13,12,0.72)_100%)]"
		></div>
		<div class="absolute inset-x-5 top-28 z-10 flex items-center justify-between gap-4 text-[10px] font-medium tracking-[0.24em] lowercase text-cream/70 sm:inset-x-8 md:top-32">
			<span>visual archive / {photos.length} frames</span>
			<span>{heroPhoto.location}</span>
		</div>
		<div class="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-5 pt-32 pb-12 sm:px-8 md:pb-16">
			<div use:reveal>
				<h1 class="max-w-3xl text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.04em] lowercase">
					photography<span class="text-accent">.</span>
				</h1>
				<div class="mt-6 grid gap-6 border-t border-cream/20 pt-5 md:grid-cols-12">
					<p class="max-w-xl text-base leading-relaxed text-cream/75 md:col-span-7">
						{photographyPage.lead}
					</p>
					<!--
						The series are reachable from the first screen. Before this, the only
						route to After Dark was to scroll past all eleven mountain frames.
					-->
					<nav aria-label="Series" class="flex flex-wrap items-start gap-x-5 gap-y-2 text-xs font-medium tracking-[0.18em] lowercase md:col-span-5 md:justify-end">
						{#each series as group (group.id)}
							<a
								href="#{group.id}"
								class="border-b border-cream/30 pb-0.5 text-cream/70 transition-colors hover:border-cream hover:text-cream focus-visible:border-cream focus-visible:text-cream"
							>
								{group.label.toLowerCase()} <span class="text-cream/45 tabular-nums">{group.items.length}</span>
							</a>
						{/each}
						<a
							href="#archive"
							class="border-b border-cream/30 pb-0.5 text-cream/70 transition-colors hover:border-cream hover:text-cream focus-visible:border-cream focus-visible:text-cream"
						>
							all frames
						</a>
					</nav>
				</div>
			</div>
		</div>
	</section>

	<!--
		The edit. Eight frames at four widths; below md every one is full width,
		because a photograph on a phone has no reason to be anything else.
	-->
	<section aria-labelledby="selected-heading" class="relative border-t border-line px-5 py-16 sm:px-8 md:py-24">
		<div class="mx-auto max-w-6xl">
			<h2 id="selected-heading" class="text-xs font-medium tracking-[0.24em] lowercase text-dim">
				selected — {selected.length} frames
			</h2>

			<div class="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:items-end md:gap-x-8 md:gap-y-16">
				{#each selected as entry, i (entry.photo.src)}
					<figure class="group m-0 {spans[entry.size]}">
						<button
							type="button"
							onclick={(event) => openPhoto(entry.photo, event)}
							class="block w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper-2"
						>
							<!-- No crop and no transform: natural proportions, and the image always fills its frame. -->
							<span data-settle class="block">
								<img
									src={imageSrc(entry.photo)}
									srcset="{imageSrc(entry.photo)} {entry.photo.w / 2}w, {entry.photo.src} {entry.photo.w}w"
									sizes={entry.size === 'full'
										? '(min-width: 768px) 72rem, 100vw'
										: '(min-width: 768px) 36rem, 100vw'}
									alt={entry.photo.alt}
									width={entry.photo.w}
									height={entry.photo.h}
									loading={i < 2 ? 'eager' : 'lazy'}
									decoding="async"
									class="block h-auto w-full"
								/>
							</span>
						</button>
						<figcaption class="mt-3 flex items-baseline justify-between gap-4">
							<span class="text-[10px] font-medium tracking-[0.22em] lowercase text-dim transition-colors group-hover:text-accent">
								{entry.photo.place}
							</span>
							<span class="text-[10px] tracking-[0.16em] lowercase text-dim/60">{entry.photo.location}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</section>

	<!--
		The pause. The photograph carries its own colour — no tint, no overlay, no
		headline across it — and the caption sits underneath, on paper. It opens in
		the viewer like every other frame; it used to be the one image on the page
		that could not be opened at all.
	-->
	<section aria-label="Deep Blue" class="relative border-t border-line bg-paper px-5 py-16 sm:px-8 md:py-24">
		<!--
			Deep Blue is the one portrait frame here — 16-ship-ocean.jpg is stored
			landscape with an EXIF rotation, so it arrives 1200x1600. At the full
			content width it would stand over 1,500px tall and stop being a pause.
		-->
		<figure class="mx-auto max-w-6xl md:max-w-[34rem]">
			<button
				type="button"
				onclick={(event) => openPhoto(pause, event)}
				class="block w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper-2"
			>
				<span data-settle class="block">
					<img
						src={imageSrc(pause)}
						srcset="{imageSrc(pause)} {pause.w / 2}w, {pause.src} {pause.w}w"
						sizes="(min-width: 768px) 34rem, 100vw"
						alt={pause.alt}
						width={pause.w}
						height={pause.h}
						loading="lazy"
						decoding="async"
						class="block h-auto w-full"
					/>
				</span>
			</button>
			<figcaption class="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
				<span class="text-sm font-medium lowercase">
					{pause.place} <span class="text-dim">— {pause.location}</span>
				</span>
				<span class="max-w-md text-sm leading-relaxed text-dim">{pause.description}</span>
			</figcaption>
		</figure>
	</section>

	<!--
		The archive: every frame, grouped by series, each group an anchor the
		opening links to. Stationary thumbnails — this is the index, and an index
		that moves is harder to read, not more alive.
	-->
	<section id="archive" class="relative border-t border-line px-5 py-16 sm:px-8 md:py-24">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-xs font-medium tracking-[0.24em] lowercase text-dim">
				archive — all {photos.length} frames
			</h2>

			{#each series as group (group.id)}
				<div class="mt-12 scroll-mt-28 md:mt-16" id={group.id}>
					<h3 class="border-b border-line pb-3 text-2xl font-medium tracking-tight lowercase md:text-3xl">
						{group.label.toLowerCase()}
						<span class="ml-2 align-middle text-[10px] font-medium tracking-[0.22em] text-dim tabular-nums">
							{group.items.length}
						</span>
					</h3>
					<div class="mt-6 grid grid-cols-2 gap-4 md:mt-8 md:grid-cols-4 md:gap-6">
						{#each group.items as photo (photo.src)}
							<figure class="group m-0">
								<button
									type="button"
									onclick={(event) => openPhoto(photo, event)}
									class="block w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper-2"
								>
									<img
										src={imageSrc(photo)}
										srcset="{imageSrc(photo)} {photo.w / 2}w, {photo.src} {photo.w}w"
										sizes="(min-width: 768px) 17rem, 45vw"
										alt={photo.alt}
										width={photo.w}
										height={photo.h}
										loading="lazy"
										decoding="async"
										class="block h-auto w-full"
									/>
								</button>
								<figcaption class="mt-2 flex items-baseline justify-between gap-3">
									<span class="text-[10px] font-medium tracking-[0.2em] lowercase text-dim transition-colors group-hover:text-accent">
										{photo.place}
									</span>
									<span class="hidden text-[10px] tracking-[0.16em] lowercase text-dim/60 sm:inline">
										{photo.location}
									</span>
								</figcaption>
							</figure>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<Lightbox items={ordered} bind:index={lightboxIndex} onclose={restoreFocus} />

<Connect compact />
