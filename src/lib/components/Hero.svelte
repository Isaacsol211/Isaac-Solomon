<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK } from '$lib/motion';
	import { site } from '$lib/content';

	const year = new Date().getFullYear();
	const words = site.heroHeadline.split(' ');

	let sectionEl = $state<HTMLElement>();

	/*
	 * The hero is the top half of one continuous composition: title and
	 * introduction here, the first project stage directly beneath (rendered by
	 * Projects, whose image straddles the seam). Nothing floats; the only
	 * imagery is the stage. Motion is typography — the title's line masks, the
	 * ✱ turning a quarter-step — and the stage's own reveal.
	 */
	onMount(() => {
		let mm: ReturnType<(typeof import('gsap'))['gsap']['matchMedia']> | undefined;
		let cancelled = false;

		(async () => {
			const { gsap } = await initMotion();
			if (cancelled || !sectionEl) return;

			mm = gsap.matchMedia(sectionEl);
			mm.add(MOTION_OK, () => {
				const signature = sectionEl!.querySelector('[data-hero-signature]');
				const meta = sectionEl!.querySelector('[data-hero-meta]');
				const intro = sectionEl!.querySelector('[data-hero-intro]');

				/*
				 * Opening, in order: title rises through its line masks (CSS, 120ms /
				 * 210ms), meta and introduction fade in where they stand, the stage's
				 * crop opens beneath (Projects, first block, from 0.55s), and the ✱ turns
				 * a quarter-step as the image lands. Opacity only on text — every box,
				 * frame and seam is already in its final place before the first frame,
				 * and nothing in the hero moves on scroll either; the ✱'s scroll spin is
				 * the one scroll-linked element, and that is CSS.
				 */
				const opening = gsap.timeline({ defaults: { ease: 'power2.out' } });
				if (meta) opening.fromTo(meta, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.1);
				if (intro) opening.fromTo(intro, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.42);
				if (signature) {
					opening.fromTo(
						signature,
						{ rotate: -90, scale: 0.9 },
						{ rotate: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
						0.95
					);
				}

			});
		})();

		return () => {
			cancelled = true;
			mm?.revert();
		};
	});
</script>

<section bind:this={sectionEl} id="top" class="relative overflow-hidden px-5 pt-32 pb-20 sm:px-8 md:pt-36 md:pb-28">
	<!--
		Signature ✱ — two spans because two systems want its transform: the outer
		carries the CSS scroll-driven rotation, the inner the GSAP entrance.
	-->
	<span
		aria-hidden="true"
		class="spin-on-scroll pointer-events-none absolute -top-10 -right-14 select-none md:-top-4 md:right-8"
	>
		<span data-hero-signature class="text-outline block font-medium text-[14rem] leading-none md:text-[22rem]">✱</span>
	</span>

	<div class="relative mx-auto max-w-6xl">
		<div
			data-hero-meta
			class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-5 text-xs font-medium tracking-[0.25em] lowercase text-dim"
		>
			<span class="flex items-center gap-3">
				<span class="text-accent" aria-hidden="true">✱</span>
				Folio — {year}
			</span>
			<span class="flex items-center gap-2.5">
				<span class="relative flex size-2" aria-hidden="true">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden"
					></span>
					<span class="relative inline-flex size-2 rounded-full bg-accent"></span>
				</span>
				{site.availability}
			</span>
		</div>

		<!--
			Title in the left seven columns, introduction in the right four, one
			empty column between them as the gutter. Both bottom-aligned so the
			lead's last line and the title's baseline share a rule.
		-->
		<div class="grid gap-y-10 pt-12 pb-12 md:grid-cols-12 md:items-end md:gap-x-10 md:pt-16 md:pb-16">
			<h1
				data-hero-headline
				class="text-[clamp(3rem,10.5vw,8.75rem)] leading-[0.9] font-medium tracking-[-0.045em] lowercase md:col-span-7"
			>
				{#each words as word, i (word)}
					<span class="mask-line"
						><span style="--rise-delay: {120 + i * 90}ms"
							>{word}{#if i === words.length - 1}<span class="text-accent">.</span>{/if}</span
						></span
					>
				{/each}
			</h1>

			<div data-hero-intro class="md:col-span-4 md:col-start-9">
				<p class="max-w-md text-[1.0625rem] leading-relaxed text-ink md:text-lg">
					{site.heroLead}
				</p>
				<div class="mt-7 flex flex-wrap items-center gap-3">
					<!-- Responses stay inside the button: an arrow moves 4px, a fill deepens. The hit target is fixed. -->
					<a
						href="#projects"
						class="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent focus-visible:bg-accent"
					>
						View selected work
						<span class="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true">↓</span>
					</a>
					<a
						href="#connect"
						class="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-paper-2 focus-visible:border-ink focus-visible:bg-paper-2"
					>
						Get in touch
						<span class="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>

	</div>
</section>
