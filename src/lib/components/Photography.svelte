<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { photographyIntro, photos } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';

	let active = $state(0);

	function step(dir: number) {
		active = (active + dir + photos.length) % photos.length;
	}
</script>

<section id="photography" class="border-t border-line bg-paper md:h-svh md:overflow-hidden">
	<!-- Desktop: fixed viewport height. Mobile: natural flow -->
	<div use:reveal class="flex flex-col md:h-full md:flex-row md:pt-[4.5rem]">
		<!-- Left panel — info -->
		<div class="flex shrink-0 flex-col justify-between px-5 pt-10 pb-8 sm:px-8 md:w-[38%] md:overflow-y-auto md:px-10 md:pt-16 md:pb-10">
			<!-- Top: eyebrow + counter -->
			<div>
				<Eyebrow index="04" title="Photography" />
				<div class="mt-4 flex items-center justify-between">
					<p class="text-[10px] font-medium tracking-[0.25em] uppercase text-dim">
						Discover {active + 1} / {photos.length}
					</p>
					<p class="text-[10px] font-medium tracking-[0.2em] uppercase text-dim">
						{photos[active].location}
					</p>
				</div>
				<div class="mt-1 flex items-center justify-between">
					<span class="h-px flex-1 bg-line"></span>
					<span class="ml-4 font-mono text-2xl font-medium tabular-nums text-dim/30">
						{String(active + 1).padStart(2, '0')}
					</span>
				</div>
			</div>

			<!-- Center: photo details -->
			<div class="my-8 md:my-0">
				<h2
					class="font-medium leading-[0.95] tracking-tight"
					style="font-size: clamp(2rem, 4vw, 3.5rem)"
				>
					{photos[active].place}
				</h2>
				<div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-[10px] font-medium tracking-[0.2em] uppercase text-dim">
					<span>{photos[active].location}</span>
				</div>
				<p class="mt-5 max-w-sm text-sm leading-relaxed text-dim">
					{photos[active].description}
				</p>
			</div>

			<!-- Bottom: navigation + handle -->
			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={() => step(-1)}
					aria-label="Previous photo"
					class="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:bg-accent hover:text-cream"
				>
					<ArrowUpRight class="size-4 -rotate-[135deg]" />
				</button>
				<button
					type="button"
					onclick={() => step(1)}
					aria-label="Next photo"
					class="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:bg-accent hover:text-cream"
				>
					<ArrowUpRight class="size-4 rotate-45" />
				</button>
				<span class="ml-auto text-[10px] font-medium tracking-[0.2em] uppercase text-dim/50">
					@isaac_sol_211
				</span>
			</div>
		</div>

		<!-- Right panel — photo -->
		<div class="relative min-h-[50vh] flex-1 overflow-hidden bg-paper md:min-h-0">
			{#each photos as photo, i (photo.src)}
				{#if i === active}
					<img
						src={photo.src}
						alt={photo.alt}
						width={photo.w}
						height={photo.h}
						class="absolute inset-0 h-full w-full object-contain"
					/>
				{/if}
			{/each}
		</div>
	</div>
</section>
