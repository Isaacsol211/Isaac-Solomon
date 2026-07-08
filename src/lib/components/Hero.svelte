<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { site } from '$lib/content';

	const year = new Date().getFullYear();

	let sectionEl = $state<HTMLElement>();

	// Scroll-out scrub — headline, tagline row and signature leave at different speeds.
	// Desktop pointer devices only; matchMedia reverts on change.
	onMount(() => {
		let mm: any;
		let cancelled = false;

		(async () => {
			const { gsap } = await initMotion();
			if (cancelled || !sectionEl) return;

			mm = gsap.matchMedia();
			mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
				const signature = sectionEl!.querySelector('[data-hero-signature]');
				const meta = sectionEl!.querySelector('[data-hero-meta]');
				const scrub = {
					trigger: sectionEl,
					start: 'top top',
					end: 'bottom top',
					scrub: true
				};
				const headline = sectionEl!.querySelector('[data-hero-headline]');
				const tagline = sectionEl!.querySelector('[data-hero-tagline]');

				if (headline) {
					gsap.to(headline, { yPercent: 18, scale: 0.94, opacity: 0.3, ease: 'none', scrollTrigger: { ...scrub } });
				}
				if (tagline) {
					gsap.to(tagline, { yPercent: 32, opacity: 0.2, ease: 'none', scrollTrigger: { ...scrub } });
				}
				if (meta) {
					gsap.to(meta, { yPercent: -20, opacity: 0.35, ease: 'none', scrollTrigger: { ...scrub } });
				}
				if (signature) {
					gsap.to(signature, { xPercent: 10, yPercent: -16, scale: 1.2, opacity: 0.25, ease: 'none', scrollTrigger: { ...scrub } });
				}
			});
		})();

		return () => {
			cancelled = true;
			mm?.revert();
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="top"
	class="relative overflow-hidden px-5 pt-32 pb-8 sm:px-8 md:min-h-screen md:pt-36 md:pb-10"
>
	<!-- signature mark — outlined ✱ that turns as the page scrolls -->
	<span
		data-hero-signature
		aria-hidden="true"
		class="text-outline spin-on-scroll pointer-events-none absolute -top-10 -right-14 font-medium select-none text-[14rem] leading-none md:-top-4 md:right-8 md:text-[22rem]"
	>
		✱
	</span>

	<div class="relative mx-auto flex min-h-[calc(100svh-10.5rem)] max-w-6xl flex-col">
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

		<h1
			data-hero-headline
			class="mask-line my-auto py-12 text-[clamp(4.2rem,15vw,13.5rem)] leading-[0.9] font-medium tracking-[-0.045em] lowercase md:py-16"
		>
			<span style="--rise-delay: 120ms">{site.role}<span class="text-accent">.</span></span>
		</h1>

		<div
			data-hero-tagline
			class="grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:items-end"
		>
			<div
				use:reveal={{ delay: 180 }}
				class="grid gap-3 text-[10px] font-medium tracking-[0.2em] lowercase text-dim sm:grid-cols-3 md:col-span-7"
			>
				<div class="border-l border-line pl-3">
					<span class="block text-ink">8 years</span>
					<span>shipping client products</span>
				</div>
				<div class="border-l border-line pl-3">
					<span class="block text-ink">cms / commerce</span>
					<span>systems that teams can run</span>
				</div>
				<div class="border-l border-line pl-3">
					<span class="block text-accent">scroll craft</span>
					<span>motion with a performance budget</span>
				</div>
			</div>

			<div use:reveal={{ delay: 260 }} class="max-w-sm md:col-span-5 md:ml-auto md:text-right">
				<p class="text-base leading-relaxed text-dim">
					Hi, I'm <span class="font-medium text-ink">{site.name}</span>.
					{site.heroIntro}
				</p>
				<a
					href="#services"
					class="group mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] lowercase text-dim transition-colors hover:text-accent"
				>
					what i do
					<span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1"
						>→</span
					>
				</a>
			</div>
		</div>
	</div>
</section>
