<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { photographyIntro, photos } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';

	let dialog = $state<HTMLDialogElement>();
	let active = $state(0);
	let sectionEl = $state<HTMLElement>();
	let progress = $state(0);
	let isDesktop = $state(false);

	/* Distribute photos across 3 columns (round-robin) */
	const cols: { photo: (typeof photos)[0]; idx: number }[][] = [[], [], []];
	photos.forEach((photo, i) => cols[i % 3].push({ photo, idx: i }));

	/* Forced aspect ratios — tuned so each column's total height is roughly equal */
	const colAspects = [
		['aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/5]'], // col 0: 1.25+1+1.25 = 3.5
		['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]'], // col 1: 1.33+1.25+1.33 = 3.91
		['aspect-[9/16]', 'aspect-[9/16]'] // col 2 (2 images): 1.78+1.78 = 3.56
	];

	function show(i: number) {
		active = i;
		dialog?.showModal();
	}
	function step(dir: number) {
		active = (active + dir + photos.length) % photos.length;
	}
	function onDialogKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
	function onDialogClick(e: MouseEvent) {
		if (e.target === dialog) dialog?.close();
	}

	$effect(() => {
		if (!sectionEl) return;

		/* Track viewport width for responsive horizontal scroll */
		const mq = window.matchMedia('(min-width: 768px)');
		isDesktop = mq.matches;
		const onMq = (e: MediaQueryListEvent) => {
			isDesktop = e.matches;
		};
		mq.addEventListener('change', onMq);

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			progress = 0.5;
			return () => mq.removeEventListener('change', onMq);
		}

		function onScroll() {
			const rect = sectionEl!.getBoundingClientRect();
			const scrollable = rect.height - window.innerHeight;
			if (scrollable <= 0) return;
			progress = Math.max(0, Math.min(1, -rect.top / scrollable));
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			mq.removeEventListener('change', onMq);
		};
	});
</script>

<section
	id="photography"
	bind:this={sectionEl}
	class="photo-section relative h-[200vh] md:h-[300vh]"
>
	<div class="photo-frame sticky top-0 flex h-screen flex-col overflow-hidden border-t border-line bg-paper">
		<!-- Mobile heading (hidden on md+) -->
		<div use:reveal class="shrink-0 px-5 pt-10 pb-6 sm:px-8 md:hidden">
			<Eyebrow index="04" title="Photography" />
			<h2 class="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
				{photographyIntro.plain}
				<em class="font-serif font-normal italic text-dim"> {photographyIntro.accent}</em>
			</h2>
		</div>

		<!-- Horizontal track — wider than viewport on desktop, slides left on scroll -->
		<div
			class="photo-track flex min-h-0 flex-1 gap-[5vw] will-change-transform"
			style="transform: translateX({isDesktop ? progress * -110 : 0}vw)"
		>
			<!-- Left typography panel (desktop only) -->
			<div
				class="photo-panel-left hidden shrink-0 flex-col justify-center px-[5vw] md:flex"
			>
				<div use:reveal>
					<Eyebrow index="04" title="Photography" />
					<h2
						class="mt-8 font-medium leading-[0.95] tracking-tight"
						style="font-size: clamp(3rem, 7vw, 7.5rem)"
					>
						{photographyIntro.plain}
						<em class="mt-2 block font-serif font-normal italic text-dim">
							{photographyIntro.accent}
						</em>
					</h2>
				</div>
				<p class="mt-8 max-w-[18rem] text-sm leading-relaxed text-dim">
					{photographyIntro.note}
				</p>
			</div>

			<!-- 3-column photo mosaic -->
			<div class="photo-mosaic flex shrink-0 gap-1.5 overflow-hidden bg-coal p-1.5 md:gap-2 md:p-2">
				{#each cols as col, c}
					<div
						class="flex w-1/3 flex-col gap-1.5 will-change-transform md:gap-2"
						style="transform: translateY({c % 2 === 0 ? progress * -25 : -25 + progress * 25}%)"
					>
						{#each col as { photo, idx }, i (photo.src)}
							<button
								type="button"
								onclick={() => show(idx)}
								class="group shrink-0 cursor-zoom-in overflow-hidden rounded-sm"
								aria-label="View photo: {photo.caption}"
							>
								<img
									src={photo.src}
									alt={photo.alt}
									width={photo.w}
									height={photo.h}
									loading="lazy"
									class="{colAspects[c][i] ?? 'aspect-[3/4]'} w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
								/>
							</button>
						{/each}
					</div>
				{/each}
			</div>

			<!-- Right panel: magazine spread (desktop only) -->
			<div class="photo-panel-right hidden shrink-0 md:flex">
				<!-- 70% — editorial spread: top text / center image / bottom text -->
				<div class="magazine-spread w-[70%]">
					<!-- Top text row -->
					<div class="flex items-end justify-between px-8 lg:px-12">
						<p
							class="font-medium leading-none tracking-tight"
							style="font-size: clamp(3rem, 8vw, 8rem)"
						>
							Capture
						</p>
						<div class="mb-2 text-right">
							<p class="text-[10px] tracking-[0.25em] uppercase text-dim/50">
								Isaac Solomon
							</p>
							<p class="mt-1 text-[10px] tracking-[0.25em] uppercase text-dim/40">
								photography
							</p>
						</div>
					</div>

					<!-- Center featured image -->
					<div class="min-h-0 px-8 lg:px-12">
						<button
							type="button"
							onclick={() => show(0)}
							class="group h-full w-full cursor-zoom-in overflow-hidden"
							aria-label="View featured photo: {photos[0].caption}"
						>
							<img
								src={photos[0].src}
								alt={photos[0].alt}
								width={photos[0].w}
								height={photos[0].h}
								class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							/>
						</button>
					</div>

					<!-- Bottom text row -->
					<div class="flex items-start justify-between px-8 lg:px-12">
						<p
							class="font-serif italic leading-none"
							style="font-size: clamp(3rem, 8vw, 8rem)"
						>
							the moment.
						</p>
						<p class="mt-3 text-sm tracking-[0.15em] text-dim/50">/35mm</p>
					</div>
				</div>

				<!-- 30% — full-height second image -->
				<button
					type="button"
					onclick={() => show(1)}
					class="group w-[30%] cursor-zoom-in overflow-hidden"
					aria-label="View featured photo: {photos[1].caption}"
				>
					<img
						src={photos[1].src}
						alt={photos[1].alt}
						width={photos[1].w}
						height={photos[1].h}
						class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					/>
				</button>
			</div>
		</div>
	</div>
</section>

<!-- lightbox — native dialog: free focus trap, Escape, return-focus -->
<dialog
	bind:this={dialog}
	onclick={onDialogClick}
	onkeydown={onDialogKeydown}
	aria-label="Photo viewer"
	class="lightbox m-auto w-[min(94vw,68rem)] bg-transparent p-0 backdrop:bg-coal/90 backdrop:backdrop-blur-md"
>
	<figure class="flex flex-col items-center gap-4 p-2 sm:p-4">
		<img
			src={photos[active].src}
			alt={photos[active].alt}
			width={photos[active].w}
			height={photos[active].h}
			class="max-h-[76vh] w-auto rounded-lg"
		/>
		<figcaption
			class="flex w-full items-baseline justify-between gap-4 font-mono text-[11px] tracking-[0.2em] uppercase text-cream/70"
		>
			<span>{photos[active].caption}</span>
			<span class="text-cream/40 tabular-nums">{active + 1} / {photos.length}</span>
		</figcaption>
	</figure>

	<div
		class="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between sm:-inset-x-2"
	>
		<button
			type="button"
			onclick={() => step(-1)}
			aria-label="Previous photo"
			class="pointer-events-auto grid size-11 place-items-center rounded-full border border-cream/25 bg-coal/60 text-cream backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent"
		>
			<ArrowUpRight class="size-4 -rotate-[135deg]" />
		</button>
		<button
			type="button"
			onclick={() => step(1)}
			aria-label="Next photo"
			class="pointer-events-auto grid size-11 place-items-center rounded-full border border-cream/25 bg-coal/60 text-cream backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent"
		>
			<ArrowUpRight class="size-4 rotate-45" />
		</button>
	</div>

	<button
		type="button"
		onclick={() => dialog?.close()}
		aria-label="Close photo viewer"
		class="absolute top-2 right-2 grid size-11 place-items-center rounded-full border border-cream/25 bg-coal/60 text-xl leading-none text-cream backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent sm:top-4 sm:right-4"
	>
		×
	</button>
</dialog>

<style>
	/* ── Track & panel sizing ────────────────────────────── */
	.photo-track {
		width: 100%; /* mobile: no horizontal overflow */
	}
	.photo-mosaic {
		width: 100%; /* mobile: photos fill viewport */
	}

	@media (min-width: 768px) {
		.photo-track {
			width: 210vw; /* left (30) + gap (5) + photos (70) + gap (5) + right (100) */
		}
		.photo-panel-left {
			width: 30vw;
		}
		.photo-mosaic {
			width: 70vw;
		}
		.photo-panel-right {
			width: 100vw; /* fills viewport at end: 70% text + 30% image */
		}
		/* Grid ensures text rows get guaranteed height, image fills the middle */
		.magazine-spread {
			display: grid;
			grid-template-rows: minmax(18vh, auto) 1fr minmax(18vh, auto);
			padding-top: 5rem; /* clear the fixed nav */
			padding-bottom: 2rem;
			gap: 0.5rem;
		}
	}

	/* ── Reduced-motion fallback ─────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.photo-section {
			height: auto !important;
		}
		.photo-frame {
			position: relative;
			height: auto;
			min-height: 80vh;
		}
	}

	/* ── Lightbox ────────────────────────────────────────── */
	.lightbox[open] {
		animation: lightbox-in 0.25s ease-out;
	}
	@media (prefers-reduced-motion: reduce) {
		.lightbox[open] {
			animation: none;
		}
	}
	@keyframes lightbox-in {
		from {
			opacity: 0;
			transform: scale(0.97);
		}
	}
</style>
