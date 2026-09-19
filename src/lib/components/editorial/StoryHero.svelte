<script lang="ts">
	import { site } from '$lib/content';
	import StoryArt from './StoryArt.svelte';
	import StoryDeco from './StoryDeco.svelte';
</script>

<section
	id="top"
	class="story relative flex min-h-svh flex-col justify-center overflow-hidden bg-story-paper px-5 pt-28 pb-14 sm:px-8 md:pt-24"
>
	<!-- print marginalia -->
	<StoryDeco kind="dots" class="pointer-events-none absolute top-28 right-8 hidden w-14 md:block" />
	<StoryDeco kind="cross" class="pointer-events-none absolute bottom-10 left-8 hidden size-5 md:block" />
	<span class="pointer-events-none absolute top-40 left-[12%] hidden rotate-12 text-sm text-grass select-none md:block" aria-hidden="true">✱</span>
	<span class="pointer-events-none absolute right-[16%] bottom-28 hidden text-xs text-cobalt select-none lg:block" aria-hidden="true">✦</span>
	<span class="pointer-events-none absolute top-[38%] right-[9%] hidden size-3 bg-mustard md:block" aria-hidden="true"></span>

	<!-- rotated edge line, desktop only — the reference's vertical gag, made functional -->
	<p
		class="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 rotate-90 origin-right text-xs font-medium tracking-[0.4em] text-ink/70 uppercase lg:block"
	>
		{site.availability}
	</p>

	<div class="relative mx-auto w-full max-w-5xl">
		<!-- centre column: the chapter label, the portrait, the loud word -->
		<div class="flex flex-col items-center text-center">
			<p class="font-serif text-2xl leading-[1.15] text-ink italic sm:text-3xl">
				a folio,<br />in three chapters.
			</p>

			<StoryArt kind="lookup" class="mt-4 h-auto w-[min(78vw,26rem)]" />
			<p class="-mt-1 font-serif text-sm text-dim italic" aria-hidden="true">fig. 1 — the author, looking up.</p>

			<h1 class="-mt-2 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1">
				<span class="text-[clamp(3.2rem,13vw,9rem)] leading-[0.82] font-medium tracking-[0.04em] uppercase">
					Frontend
				</span>
				<span class="font-serif text-[clamp(1.8rem,6vw,3.4rem)] leading-none italic text-dim">
					developer<span class="text-accent">.</span>
				</span>
			</h1>
		</div>

		<!-- left meta column, laid over the composition on desktop -->
		<div class="mt-10 max-w-sm md:absolute md:top-24 md:left-0 md:mt-0">
			<p class="text-[15px] leading-relaxed text-ink">
				{site.heroLead}
			</p>
		</div>

		<!-- wordmark + monogram, bottom row -->
		<div class="mt-10 flex items-end justify-between md:mt-16">
			<p class="text-lg font-medium tracking-tight">
				{site.name}<span class="text-accent">.</span>
			</p>
			<div class="flex items-center gap-3">
				<span class="spin-on-scroll text-2xl text-accent select-none" aria-hidden="true">✱</span>
				<span class="block size-7 bg-cobalt" aria-hidden="true"></span>
			</div>
		</div>
	</div>
</section>
