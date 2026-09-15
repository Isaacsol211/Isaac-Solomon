<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
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
				if (signature) {
					/* one quarter-step as the title lands — the site's motion signature */
					gsap.fromTo(
						signature,
						{ rotate: -90, scale: 0.9 },
						{ rotate: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.55 }
					);
				}

				/* Scroll-out: the three bands leave at different speeds. */
				const scrub = { trigger: sectionEl, start: 'top top', end: 'bottom top', scrub: true };
				const headline = sectionEl!.querySelector('[data-hero-headline]');
				const intro = sectionEl!.querySelector('[data-hero-intro]');
				const meta = sectionEl!.querySelector('[data-hero-meta]');
				if (headline) gsap.to(headline, { yPercent: 14, opacity: 0.35, ease: 'none', scrollTrigger: { ...scrub } });
				if (intro) gsap.to(intro, { yPercent: 26, opacity: 0.25, ease: 'none', scrollTrigger: { ...scrub } });
				if (meta) gsap.to(meta, { yPercent: -20, opacity: 0.35, ease: 'none', scrollTrigger: { ...scrub } });
			});
		})();

		return () => {
			cancelled = true;
			mm?.revert();
		};
	});
</script>

<section bind:this={sectionEl} id="top" class="relative overflow-hidden px-5 pt-32 sm:px-8 md:pt-36">
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
			use:reveal
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
		<div class="grid gap-y-10 pt-12 pb-14 md:grid-cols-12 md:items-end md:gap-x-10 md:pt-16 md:pb-20">
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

			<div data-hero-intro use:reveal={{ delay: 240 }} class="md:col-span-4 md:col-start-9">
				<p class="max-w-md text-[1.0625rem] leading-relaxed text-ink md:text-lg">
					{site.heroLead}
				</p>
				<div class="mt-7 flex flex-wrap items-center gap-3">
					<a
						href="#projects"
						class="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
					>
						View selected work
					</a>
					<a
						href="#connect"
						class="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
					>
						Get in touch
					</a>
				</div>
			</div>
		</div>

		<!-- Three quiet facts along the seam; the stage image below overlaps the space under them. -->
		<div
			use:reveal={{ delay: 180 }}
			class="grid gap-3 border-t border-line pt-5 pb-28 text-[13px] font-medium tracking-[0.06em] lowercase text-dim sm:grid-cols-3 md:pb-36"
		>
			<div>
				<span class="block text-ink">9 years</span>
				<span>shipping client products</span>
			</div>
			<div>
				<span class="block text-ink">cms / commerce</span>
				<span>systems that teams can run</span>
			</div>
			<div>
				<!-- accent-text, not accent: 13px on paper needs 4.5:1, and #e8490f is 3.39:1 -->
				<span class="block text-accent-text">scroll craft</span>
				<span>motion with a performance budget</span>
			</div>
		</div>
	</div>
</section>
