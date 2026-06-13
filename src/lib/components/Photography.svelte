<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { photographyIntro, photos } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';

	let dialog = $state<HTMLDialogElement>();
	let active = $state(0);

	/** which frame gets the grease-pencil "select" circle */
	const circled = 5;

	function show(i: number) {
		active = i;
		dialog?.showModal();
	}
	function step(dir: number) {
		active = (active + dir + photos.length) % photos.length;
	}
	function onDialogKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'ArrowLeft') step(-1);
	}
	function onDialogClick(event: MouseEvent) {
		// click on the backdrop (the dialog element itself) closes
		if (event.target === dialog) dialog?.close();
	}
</script>

<section id="photography" class="border-t border-line px-5 py-20 sm:px-8 md:py-32">
	<div class="mx-auto max-w-6xl">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div use:reveal>
				<Eyebrow index="04" title="Photography" />
				<h2 class="mt-6 text-4xl font-medium tracking-tight md:text-6xl">
					{photographyIntro.plain}
					<em class="font-serif font-normal text-dim italic">{photographyIntro.accent}</em>
				</h2>
			</div>
			<p use:reveal={{ delay: 120 }} class="max-w-sm leading-relaxed text-dim md:text-right">
				{photographyIntro.note}
			</p>
		</div>

		<!-- the contact sheet -->
		<div
			use:reveal={{ delay: 100 }}
			class="mt-12 rounded-3xl bg-coal p-5 text-cream sm:p-8 md:mt-16 md:p-10 dark:border dark:border-cream/10"
		>
			<div
				class="flex flex-wrap items-baseline justify-between gap-2 border-b border-cream/15 pb-4 font-mono text-[10px] tracking-[0.25em] uppercase text-cream/40"
			>
				<span>Contact sheet — Isaac Solomon</span>
				<span>35mm · 400TX <span class="text-accent">✱</span> dev &amp; scan</span>
			</div>

			<ul class="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-4 md:gap-y-8">
				{#each photos as photo, i (photo.src)}
					<li use:reveal={{ delay: (i % 4) * 70 }} class="relative">
						<button
							type="button"
							onclick={() => show(i)}
							class="group block w-full cursor-zoom-in text-left {i % 2 === 0
								? 'rotate-[0.4deg]'
								: 'rotate-[-0.4deg]'} transition-transform duration-300 hover:rotate-0"
							aria-label="View photo: {photo.caption}"
						>
							<span class="block overflow-hidden rounded-sm border border-cream/15">
								<img
									src={photo.src}
									alt={photo.alt}
									width={photo.w}
									height={photo.h}
									loading="lazy"
									class="aspect-[3/2] w-full object-cover brightness-90 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
								/>
							</span>
							<span
								class="mt-2 flex items-baseline justify-between font-mono text-[10px] tracking-[0.2em] uppercase"
							>
								<span class="text-cream/40">№ 0{i + 1}A</span>
								<span class="text-cream/0 transition-colors duration-300 group-hover:text-cream/60">
									{photo.caption}
								</span>
							</span>

							{#if i === circled}
								<!-- grease-pencil select mark -->
								<svg
									aria-hidden="true"
									viewBox="0 0 100 70"
									preserveAspectRatio="none"
									class="pointer-events-none absolute -inset-x-1 top-0 h-[calc(100%-1.3rem)] w-[calc(100%+0.5rem)] rotate-[-1.5deg] text-accent"
								>
									<ellipse
										cx="50"
										cy="35"
										rx="46"
										ry="30"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-dasharray="276 14"
										opacity="0.85"
									/>
								</svg>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
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

	<div class="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between sm:-inset-x-2">
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
